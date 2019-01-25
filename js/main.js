
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
  

    $('.validate-form').on('submit',function(){
        event.preventDefault();
        var username = $("input#username").val();
        console.log(username)
        var email = $("input#email").val();
        var phone = $("input#phone").val();
        var data ={
            username: username,
            email: email,
            phone: phone
        }
        var check = true;
        console.log("hiiiii")
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        console.log(input[0].val)
        if(username != "" || email !="" || phone !=""){
            insertNewUser(data);
    }
        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function insertNewUser(input){
        console.log(input)
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/newuser',
            crossDomain: true,
            data: JSON.stringify(input),
            contentType: "application/json",
            dataType: "json",
            timeout: 10000,
            success: function(responseData, textStatus, jqXHR) 
            {   
              //var responsedata = JSON.parse(responseData);
              console.log(typeof(responsedata));
              window.location.replace("http://127.0.0.1:8080/home");
              readOutLoud("Welcome to irampup-geekstars" + input['username']);
                for(key in responsedata){
                  console.log(key)
                }
                var response = 'Your Word Count is: ' + responsedata['length'];
                $('span#response').html(response);
                console.log(responseData);
        
            },
            error: function (responseData, textStatus, errorThrown) 
            {
                console.warn(responseData, textStatus, errorThrown);
                alert('failed - ' + textStatus);
            }
        });
    }

    function readOutLoud(message) {
        // window.location.replace("http://127.0.0.1:8080/home");
         window.location.replace("http://127.0.0.1:8080/home");
        var speech = new SpeechSynthesisUtterance();
    
      // Set the text and voice attributes.
        speech.text = message;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
      
        window.speechSynthesis.speak(speech);
    }
    

})(jQuery);


// function submitDetailsForm(){
//     var username = $("input#username").val();
//     console.log(username)
//     var email = $("input#email").val();
//     var phone = $("input#phone").val();
//     var data ={
//         username: username,
//         email: email,
//         phone: phone
//     }
//     if(username != "" || email !="" || phone !=""){
//         insertNewUser(data);
// }
// }