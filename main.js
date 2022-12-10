status = "";
objects = [];


function setup()
{
    canvas = createCanvas(480 , 320);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input_box").value;
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results)
    objects = results;
}
function draw()
{
    image(video , 0 , 0 , 480 , 320);
    
    if(status != "")
    {   
        objectDetector.detect(video , gotResults);
        for(i = 0 ; i < objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected ";
            fill("red");

            percent = floor(objects[i].confidence*100);
            text(objects[i].label +percent+"%" , objects[i].x+15 , objects.y+15 );
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            
            if(objects[i].label == object_name )

            {   video.stop();
                document.getElementById("status").innerHTML = "Status : Objects Detected ";
                document.getElementById("object_status").innerHTML = object_name+" Found";
                objectDetector.detect(gotResults);
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterThis);
            
            }
            else
            {
                document.getElementById("object_status").innerHTML = object_name+" Not Found";
            }
        
        }

    }
}
