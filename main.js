status = "";
objects = [];

function preload() {
          video = createVideo('video.mp4');
          
}

function setup() {
          canvas = createCanvas(480, 380);
          canvas.center();
          video.hide();
}

function start() {
          objectDetector = ml5.objectDetector('cocossd', modelLoaded);
          document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
          console.log("Model Loaded!");
          status = true;
          video.loop()
          video.speed(1)
          video.volume()
}

function gotResult(error, Results) {
          if (error) {
                   console.log(error); 
          }
          console.log(Results);
          objects = Results;
}

function draw() {
          image(video, 0, 0, 480, 380);

          if (status != "") {
                    objectDetector.detect(video, gotResult);
                    for (i = 0; i < objects.length; i++) {
                              document.getElementById("status").innerHTML = "Status : Object Detected";
                              document.getElementById("number_of_objects").innerHTML = "Number of objects Detected are " + objects.length;

                              fill(0, 255, 0);
                              percent = floor(objects[i].confidence * 100);
                              text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
                              noFill();
                              stroke(0, 255, 0);
                              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    }
          }
}
