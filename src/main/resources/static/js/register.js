$( document ).ready(function(){
    $("#register-button").click(function(){

        var account = {};
        var account["username"] = $("#register-email");
        var account["password"] = $("#register-password");

        $.ajax({
                url: '/accounts', // your api url
                method: 'POST', // method is any HTTP method
                data: JSON.stringify(account), // data as js object
                contentType : "application/json",
                error: function(message){
                    alert(message.responseText);
                },
                success: function(bookmark) {
                    alert("yeh");
                }
        });
    });
});