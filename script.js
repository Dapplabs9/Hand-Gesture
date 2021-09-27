var cam = document.getElementById("camera");
Webcam.set({
    width: 400,
    height: 400,
    img_format: "png",
    img_quality: 90
});
Webcam.attach(cam);
function capture(){
    Webcam.snap(function(weburi){
        document.getElementById("result").innerHTML = "<img id='snapedImage' src='" + weburi + "' >";
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uzftnneW6/model.json", modelLoaded);
function modelLoaded(){
    console.log("Loaded");
}
function check(){
    img = document.getElementById("snapedImage");
    classifier.classify(img, predict);
}
function predict(error, results){
    if (error) {
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence;
        var synth = window.speechSynthesis;
        speech_data = "Prediction is " + results[0].label;
        utterThis = new SpeechSynthesisUtterance(speech_data);
        synth.speak(utterThis);
    }
}