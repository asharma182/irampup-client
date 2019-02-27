const vid = document.querySelector('video');
navigator.mediaDevices.getUserMedia({video: true}) // request cam
.then(stream => {
  vid.srcObject = stream; // don't use createObjectURL(MediaStream)
  return vid.play(); // returns a Promise
})
.then(()=>{ // enable the button
  // const btn = document.querySelector('button');
  const btn = document.getElementById('snapshot');
  btn.disabled = false;
  btn.onclick = e => {
    takeASnap()
    .then(sendImage);
  };
});

function takeASnap(){
  const canvas = document.createElement('canvas'); // create a canvas
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = vid.videoWidth; // set its size to the one of the video
  canvas.height = vid.videoHeight;
  ctx.drawImage(vid, 0,0); // the video
  return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}
function download(blob){
  // uses the <a download> to download a Blob
  let a = document.createElement('a'); 
  a.href = URL.createObjectURL(blob);
  a.download = 'screenshot.jpg';
  document.body.appendChild(a);
  a.click();
}

function sendImage(blob){

    // var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var url = window.URL.createObjectURL(blob);
    console.log(url);

    var data = new FormData();
    data.append('file', blob);
    console.log(data);
    var base64data;
    var reader = new FileReader();
 reader.readAsDataURL(blob); 
 reader.onloadend = function() {
     base64data = reader.result;                
    //console.log(base64data);
    // $('video').jmspinner();
 console.log("base64data", base64data)
    $.ajax({
        type: 'POST',
        url: 'http://129.213.142.186:5001/posture',
        crossDomain: true,
        processData: false,
        contentType: false,
        data:  base64data,
        timeout: 15000,
        success: function(responseData, textStatus, jqXHR) 
        {   
            console.log(responseData);
            readOutLoud(responseData)
           
          //  $('video').jmspinner(false);

        //   var list = "";
        //   $("span#response").html("");
        //   for(i=0; i<responsedata.length; i++){
        //     list +="<li>"+ "Question: " +responsedata[i][2]+"</li>" + "<br>" + "<a>" + "Answer: " +
        //     responsedata[i][3] + "</a>";
        //        }
                $("span#response").html("");
                $("span#response").append(responseData);
                sendImageToDb();
    
        },
        error: function (responseData, textStatus, errorThrown) 
        {
            console.warn(responseData, textStatus, errorThrown);
            alert('failed - ' + textStatus);
        }
    });


}

function sendImageToDb(){
  $.ajax({
    type: 'GET',
    url: 'http://129.213.14.0:5002/imageInsertion',
    crossDomain: true,
    processData: false,
    contentType: false,
    timeout: 50000,
    success: function(responseData, textStatus, jqXHR) 
    {   
        console.log("done");

    },
    error: function (responseData, textStatus, errorThrown) 
    {
        console.warn(responseData, textStatus, errorThrown);
        alert('failed - ' + textStatus);
    }
});
}
}

function back(){
    window.location.replace("http://129.213.169.78:8080/home");
}


function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}
