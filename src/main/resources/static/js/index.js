 $( document ).ready(onDocumentReady);

 function onDocumentReady(){
    controller.init();
    ui.init();
 }

 var bookmarkRepository = {

    findById : function(id){
        for(var i = 0; i < model.bookmarks.length; i++){
            if(model.bookmarks[i].id == id){
                return model.bookmarks[i];
            }
        }
        return null;
    }
 }

 var model = {
    bookmarks : []
 }

 var ui = {
    activeBookmark : {},

    init : function(){
        $("#modal-delete-button").click(function(buttonClickedEvent){
            controller.deleteBookmark(ui.activeBookmark.id);
        });

        $("#modal-update-button").click(function(){
            ui.activeBookmark.title = $("#modal-body-text").val();
            controller.patchBookmark(ui.activeBookmark);
        }),

        $("#add_bookmark_button").click(function(){
            controller.postBookmark($("#add_bookmark_text").val());
        });
    },

    refreshBookmarks : function(){
        $("#bookmarks").empty();

        for (i = 0; i < model.bookmarks.length; i++) {
            var bookmark = model.bookmarks[i];
            var bookmarkButton = $("<button " + attr("type", "button") + attr("class","btn btn-info btn-lg") + attr("data-toggle", "modal") +  attr("data-target", "#myModal") + ">" + bookmark.title + "</button>");
            bookmarkButton.data("id", bookmark.id);
            bookmarkButton.click(function(buttonClickedEvent){
                var bookmarkId = $(this).data('id');
                var bookmark = bookmarkRepository.findById(bookmarkId);
                ui.setActiveBookmark(bookmark);
            });
            $("#bookmarks").append(bookmarkButton);
        }
    },

    setUser : function(user){
        $("#username_id").text(user.name);
    },

    setActiveBookmark : function(bookmark){
        ui.activeBookmark = bookmark;
        if(ui.activeBookmark != null){
            $("#modal-body-text").val(ui.activeBookmark.title);
        }else{
            $("#modal-body-text").val("");
        }
    }
 }

 var controller = {
    init : function(){
        $.ajaxSetup({
            beforeSend : function(xhr, settings) {
                if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'PATCH'
                  || settings.type == 'DELETE') {
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/
                    .test(settings.url))) {
                    // Only send the token to relative URLs i.e. locally.
                    xhr.setRequestHeader("X-XSRF-TOKEN", Cookies.get('XSRF-TOKEN'));
                }
              }
            }
        });

        controller.getUser();
        controller.getBookmarks();
    },

    postBookmark : function(title){
        var bookmarkString = JSON.stringify({title : title});
        $.ajax({
            url: '/bookmarks/custom', // your api url
            method: 'POST', // method is any HTTP method
            data: bookmarkString, // data as js object
            contentType : "application/json",
            error: function(message){
                alert(message.responseText);
            },
            success: function(bookmark) {
                controller.getBookmarks();
            }
        });
    },

    deleteBookmark : function(id){
        $.ajax({
            url: '/bookmarks/' + id, // your api url
            method: 'DELETE', // method is any HTTP method
            contentType : "application/json",
            error: function(message){
                alert(message.responseText);
            },
            success : function(bookmark) {
                controller.getBookmarks();
            }
        });
    },

    patchBookmark : function(bookmark){
        $.ajax({
                url: '/bookmarks/' + bookmark.id, // your api url
                method: 'PATCH', // method is any HTTP method
                contentType : "application/json",
                data : JSON.stringify(bookmark),
                error: function(message){
                    alert(message.responseText);
                },
                success: function(bookmark) {
                    controller.getBookmarks();
                }
        });
    },

    getBookmarks : function(){
        $.get( "/bookmarks/custom", function( bookmarks ) {
            model.bookmarks = bookmarks;
            ui.refreshBookmarks();
        });
    },

    getUser : function(user){
        $.get( "/user", function( user ) {
            ui.setUser(user);
        });
    }
 }

 function attr(name, value){
    return name + "='" + value + "'";
 }
