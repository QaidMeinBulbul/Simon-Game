var buttonColors= ["red", "blue", "green", "yellow"]
var gamePattern= []
var userClickedPattern= []
var level= 0
var heading= "Press a key to Start"

function nextSequence()
{
    userClickedPattern= []
    level++;
    $("h1").text("Level "+level)
    var randomNumber= Math.floor(Math.random() * 4)
    var randomChosenColor= buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    var selectedColor= "#"+randomChosenColor
    $(selectedColor).css("visibility", "hidden").delay(200).queue(function() {
        $(this).css("visibility", "visible").dequeue();
    });
    playSound(randomChosenColor)
}

function playSound(name) 
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) 
{
    $("#"+currentColor).addClass("pressed").delay(100).queue(function() {
        $(this).removeClass("pressed").dequeue();
    })    
}

function startOver()
{
    level=0;
    $("h1").text(heading)
    gamePattern= []
    userClickedPattern= []
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
    else
    {
        playSound("wrong")
        $("body").addClass("game-over").delay(200).queue(function() {
            $(this).removeClass("game-over").dequeue()
        })
        startOver()
    }
}

$(".btn").on("click", function() {
    var userChosenColor= $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    // console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length-1)
})

$(document).on("keypress", function () {
    nextSequence()
    $("h1").text("Level 1")
})