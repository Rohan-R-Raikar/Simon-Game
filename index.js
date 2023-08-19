var buttonColors = ["red","green","blue","yellow"];

var gamePattern =[];
var userClickedPattern =[];
var started = false;
var level = 0;
$("body").keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {    
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        console.log("Wrong");
        playSound("Wrong");
        
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        stratover();
    }
}

function stratover() {
    level =0;
    gamePattern =[];
    started = false;
    userClickedPattern =[];
}