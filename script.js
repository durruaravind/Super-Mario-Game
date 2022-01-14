score = 0;
cross = true;

audio = new Audio('music.mp3');
gameoveraudio = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);
playmusic = setInterval(() => {
    audio.play();
}, 100);

document.onkeydown = function (e)
{
    console.log("Key code is: ", e.key)
    if (e.key == " ") 
    {
        mario = document.querySelector('.mario');
        mario.classList.add('animateMario');
        setTimeout(() => 
        {
            mario.classList.remove('animateMario')
        }, 700);
    }
    if (e.key == 'd' || e.key == 'ArrowRight') 
    {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX + 100) + "px";
    }
    if (e.key == 'a' || e.key == 'ArrowLeft') 
    {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX - 100) + "px";
    }
}
setInterval(() => 
{
    mario = document.querySelector('.mario');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    offsetX = Math.abs(mx - ox);
    offsetY = Math.abs(my - oy);
    
    if(offsetX < 75 && offsetY < 50)
    {
        gameOver.innerHTML = "Game Over"
        obstacle.classList.remove('obstacleAnimation')
        clearInterval(playmusic);
        gameoveraudio.play();
        setTimeout(() => {
            audio.pause();
        }, 100);
    }
    else if (offsetX < 25 && cross == true) 
    {
        score+= 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            animationDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDuration = animationDuration - 0.1;
            if(newDuration > 1.0)
            {
                obstacle.style.animationDuration = newDuration + 's';
            }
        }, 500);
    }
}, 10);

function updateScore(s)
{
    scoreCount.innerHTML = "Your Score: " + score;
}
