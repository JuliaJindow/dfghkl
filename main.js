var objects = [];
var video = "";
var status = "";
var objN = "";
var objectD;


function setup() {
    canvas = createCanvas(280,280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function start() {
    objectD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    objN = document.getElementById("obj-name").value;
}

function draw() {
    image(video,0,0,380,380);

    if (status != "" && objectD) {
        objectD.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
        
           document.getElementById("status").innerHTML = "Status = Objects Detected";

           percent = floor(objects[i].confidence *100);
           fill("#FF0000");
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           alert("objN is ----------"+objN);
        if (objects[i] && objects[i].label == objN) {
            
            document.getElementById("found").innerHTML = objN + " found";
            video.stop();
            objectD.detect(gotResult);
            utterThis = SpeechSynthesisUtterance(objN + " found");
            utterThis.speak();
        }
        else {
            document.getElementById("found").innerHTML = objN + " not found";
        }

    }
  }
}

function modelLoaded() {
    console.log("The CocoSSD model is loaded!!");
    status = true;
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}