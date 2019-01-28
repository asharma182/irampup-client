

$(window).ready(function(){
    // alert("module page");
});

function back(){
    window.location.replace("http://129.213.192.34:8080/home");
}
var type="";
function generalQuery(){
    type = 'GQ';
    getDataFromAjaxCall(type);
}

function companySpecific(){
    type = 'CS';
    getDataFromAjaxCall(type);
}

function industryQuestion(){
    type = 'IQ';
    getDataFromAjaxCall(type);
}

function whatNotToDo(){
    type = 'SK';
    getDataFromAjaxCall(type);
}

function getDataFromAjaxCall(type){
    let req = type;

    $.ajax({
        type: 'GET',
        url: 'http://129.213.197.247:5000/module/' + req,
        crossDomain: true,
        dataType: 'text',
        timeout: 10000,
        success: function(responseData, textStatus, jqXHR) 
        {   
           var responsedata = JSON.parse(responseData);
          console.log(responsedata[0][2]);
            // for(key in responsedata){
            //   console.log(key)
            // }
          //  var response = 'Your Word Count is: ' + responsedata[''];
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