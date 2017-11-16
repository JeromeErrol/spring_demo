 $( document ).ready(onDocumentReady);

 function onDocumentReady(){

    $.get( "/user", function( user ) {
        $("#username_id").text(user.name);
    });
    $.get( "/bookmarks", function( response ) {
           var bookmarks = response._embedded.bookmarks;
           for (i = 0; i < bookmarks.length; i++) {
                ui.addBookmark(bookmarks[i]);
           }
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
 }

 var ui = {
    addBookmark: function(bookmark){

        var bookmarkButton = $("<p>" + bookmark.title + "</p>");
        $("#bookmarks").append(bookmarkButton);
    }
 }
