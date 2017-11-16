 $( document ).ready(onDocumentReady);

 function onDocumentReady(){
    controller.init();
    ui.init();
 }

 var model = {
    activeBookmark : {},
    user : {},
    bookmarks : [],

    findBookmarkById : function(id){
        // TODO
        return model.bookmarks[0];
    }
 }

 var ui = {

    init : function(){
        $("#modal-delete-button").click(function(buttonClickedEvent){
            var id = $(this).data('data-id');
            controller.deleteBookmark(id)
        });

        $("#add_bookmark_button").click(function(){
                var title = $("#add_bookmark_text").val();
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
                        ui.addBookmark(bookmark);
                      }
                  });
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
                model.activeBookmark = model.findBookmarkById(bookmarkId);
                ui.refreshModal();
            });
            $("#bookmarks").append(bookmarkButton);
        }
    },

    refreshUser : function(){
        $("#username_id").text(model.user.name);
    },

    refreshModal : function(){
        $("#modal-body-text").val(model.activeBookmark.title);
    }
 }

 var controller = {
    init : function(){
        $.ajaxSetup({
            beforeSend : function(xhr, settings) {
                if (settings.type == 'POST' || settings.type == 'PUT'
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

    deleteBookmark : function(id){
        alert("deleting " + id);

        $.ajax({
                      url: '/bookmarks/' + id, // your api url
                      method: 'DELETE', // method is any HTTP method
                      contentType : "application/json",
                      error: function(message){
                        alert(message.responseText);
                      },
                      success: function(bookmark) {
                        alert(bookmark);
                      }
                  });
    },

    getBookmarks : function(){
        $.get( "/bookmarks", function( response ) {
            model.bookmarks = response._embedded.bookmarks;
            ui.refreshBookmarks();
        });
    },

    getUser : function(user){
        $.get( "/user", function( user ) {
            model.user = user;
            ui.refreshUser();
        });
    }
 }

 function attr(name, value){
    return name + "='" + value + "'";
 }
