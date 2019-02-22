function back(){
    window.location.replace("http://129.213.192.34:8080/home");
}
$("#demo").qrcode({
    //render:"table"
    width: 128,
    height: 128,
    text: "https://cdn.instavr.co/html/rnPKiMxWMUGkeFrNpIoY_app.html"
});


function getAudio(){
    $.ajax({
        type: 'GET',
        url: 'http://129.213.78.137:5000/getAudio',
        crossDomain: true,
        processData: false,
        contentType: false,
        timeout: 10000,
        success: function(responseData, textStatus, jqXHR) 
        {   
          // var responsedata = JSON.parse(responseData);
          console.log(responseData);
            // for(key in responsedata){
            //   console.log(key)
            // }
          //  var response = 'Your Word Count is: ' + responsedata[''];
          var snd = new Audio("data:audio/wav;base64," + responseData);
            snd.play();
          var list = "";
          $("span#response").html("");
          for(i=0; i<responsedata.length; i++){
            list +="<li>"+ "Question: " +responsedata[i][2]+"</li>" + "<br>" + "<a>" + "Answer: " +
            responsedata[i][3] + "</a>";
               }
               $("span#response").append(list);
        //   $.each(responsedata, function(){
        //       console.log(this,this[1],this[2]);
        //       var list = "";
                
        //     // $('span#responsequestion').append(`Question: ` + d[0][2]);
        //     // $('span#responseanswer').append(`Question: ` + d[0][3]);
        //   })
            //console.log(typeof(JSON.parse(responseData)));
    
        },
        error: function (responseData, textStatus, errorThrown) 
        {
            console.warn(responseData, textStatus, errorThrown);
            alert('failed - ' + textStatus);
        }
    });
}