function back(){
    window.location.replace("http://127.0.0.1:8080/home");
}
$("#demo").qrcode({
    //render:"table"
    width: 128,
    height: 128,
    text: "http://ourcodeworld.com"
});