$(document).ready(function() {
    // executes when HTML-Document is loaded and DOM is ready
    $.ajax({
        type: 'GET',
        url: 'http://129.213.189.126:5003/analytics1',
        crossDomain: true,
        timeout: 15000,
        success: function(responseData, textStatus, jqXHR) 
        {   
        //   var responsedata = JSON.parse(responseData);
          console.log(responseData)
          var src = "data:image/jpeg;base64,";
            src += responseData;
            var newImage = document.createElement('img');
            newImage.setAttribute('id', 'imageAnalytics')
            newImage.src = src;
            newImage.width = newImage.height = "80";
            document.querySelector('#imageContainer1').innerHTML = newImage.outerHTML;
            callanylytics2();
        },
        error: function (responseData, textStatus, errorThrown) 
        {
            console.warn(responseData, textStatus, errorThrown);
            alert('failed - ' + textStatus);
        }
    });
function callanylytics2(){
    $.ajax({
        type: 'GET',
        url: 'http://129.213.189.126:5003/analytics2',
        crossDomain: true,
        timeout: 15000,
        success: function(responseData, textStatus, jqXHR) 
        {   
        //   var responsedata = JSON.parse(responseData);
          console.log(responseData)
          var src = "data:image/jpeg;base64,";
            src += responseData;
            var newImage = document.createElement('img');
            newImage.setAttribute('id', 'imageAnalytics')
            newImage.src = src;
            newImage.width = newImage.height = "80";
            document.querySelector('#imageContainer2').innerHTML = newImage.outerHTML;
            callanylytics3()
        },
        error: function (responseData, textStatus, errorThrown) 
        {
            console.warn(responseData, textStatus, errorThrown);
            alert('failed - ' + textStatus);
        }
    });
}
function callanylytics3(){ 
    $.ajax({
        type: 'GET',
        url: 'http://129.213.189.126:5003/analytics3',
        crossDomain: true,
        timeout: 20000,
        success: function(responseData, textStatus, jqXHR) 
        {   
        //   var responsedata = JSON.parse(responseData);
          console.log(responseData)
          var src = "data:image/jpeg;base64,";
            src += responseData;
            var newImage = document.createElement('img');
            newImage.setAttribute('id', 'imageAnalytics')
            newImage.src = src;
            newImage.width = newImage.height = "80";
            document.querySelector('#imageContainer3').innerHTML = newImage.outerHTML;
    
        },
        error: function (responseData, textStatus, errorThrown) 
        {
            console.warn(responseData, textStatus, errorThrown);
            alert('failed - ' + textStatus);
        }
    });
}
});


function back(){
    console.log("back");
    window.location.replace("http://129.213.169.78:8080/home");
}