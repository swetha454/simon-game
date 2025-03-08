buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
gamePatterns=[];
var started=false;
var level=0;
$("btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});
$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    randomChoseColor=buttonColours[randomNumber];
    gamePatterns.push(randomChoseColor);
    var choose="#"+randomChoseColor;
    $(choose).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColor);
}

function playSound(name){
    var aud=new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass('pressed');
        //....and whatever else you need to do
}, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){

         //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
           nextSequence();
        }, 1000);

      }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text="Game Over, Press Any Key to Restart";
        startOver();
      }
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}