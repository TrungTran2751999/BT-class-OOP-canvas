let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let ball = {
    x: 20,
    y: 145,
    dx: 5,
    dy: 2,
    radius: 10
}
let paddle = {
    width: 70,
    height: 10,
    x:0,
    y:canvas.height-10,
    speed: 5,
    isMovingLeft: false,
    isMovingRight: false
}

let brickConfig = {
    offsetX: 25, 
    offsetY: 25, 
    margin: 25,
    width: 70,
    height: 15,
    totalRow: 3,
    totalCol: 5
}
let isGameOver = false;
let isGameWin = 'You win';
let userScore = 0;
let maxScore = brickConfig.totalCol*brickConfig.totalRow;
let isReset = false;
let isGameClear = false;

let brickList = []
if(isReset == false){
    for(let i=0; i<brickConfig.totalRow; i++){
        for(let j=0; j < brickConfig.totalCol; j++){
            brickList.push({
                x: brickConfig.offsetX + j*(brickConfig.width + brickConfig.margin),
                y: brickConfig.offsetY + i*(brickConfig.height + brickConfig.margin),
                isBroken: false
            })
        }
    }   
}
document.addEventListener('keyup', function(event){
    if(event.keyCode ==37){
        paddle.isMovingLeft = false;
    }else if(event.keyCode ==39){
        paddle.isMovingRight = false;
    }
})

document.addEventListener('keydown', function(event){
    if(event.keyCode ==37){
        paddle.isMovingLeft = true;
    }else if(event.keyCode ==39){
        paddle.isMovingRight = true;
    }
})
function drawBall(){
    context.beginPath();
    context.arc(ball.x, ball. y, ball.radius ,0 ,Math.PI*2);
    context.fill();
    context.closePath();
}
function drawPaddle(){
    context.beginPath()
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fill();
    context.closePath();
}
function drawBricks(){
    brickList.forEach((b)=>{
        if(b.isBroken == false){
            context.beginPath();
            context.rect(b.x, b.y, brickConfig.width, brickConfig.height)
            context.fill()
            context.closePath();
        }
    })
}
function handleBallCollisPaddle(){
    if(ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && 
       ball.y + ball.radius >= canvas.height-paddle.height){
        ball.dy=-ball.dy
    }
}
function handleBallCollisBricks(){
    brickList.forEach((b)=>{
        if(b.isBroken == false){
            if(ball.x >= b.x && ball.x <= b.x + brickConfig.width && 
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + brickConfig.height){
                ball.dy=-ball.dy;
                b.isBroken = true
                userScore += 1
                document.querySelector('.score').innerHTML = `Score: ${userScore}`
                if(userScore >= maxScore){
                    isGameClear = true;

                    alert(isGameWin)
                }
            }
        }
    })
}
function handleBallCollision(){
    if(ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width){
        ball.dx = -ball.dx
    }
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.dy=-ball.dy
    }
}
function updateBallCollision(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}
function checkGameOver(){
    if(ball.y > canvas.height-ball.radius){
        isGameOver = true
    }
}
function movePaddle(){
    if(paddle.isMovingLeft){
        paddle.x-= paddle.speed
    }else if(paddle.isMovingRight){
        paddle.x+= paddle.speed
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }else if(paddle.x > canvas.width-paddle.width){
        paddle.x = canvas.width-paddle.width;
    }
}
function draw(){
    if(isGameOver == false && isGameClear == false){
        context.clearRect(0,0,canvas.width, canvas.height);

        drawBall();
        drawBricks();
        drawPaddle();

        movePaddle();

        handleBallCollision();
        handleBallCollisPaddle();
        handleBallCollisBricks();

        updateBallCollision();
        checkGameOver()
        requestAnimationFrame(draw);
    }else if(isGameOver == true){
        alert('Game Over');
        let reset = confirm('Reset Game ?')
        if(reset){
            location.reload()
        }
    }else if(isGameClear == true){
        alert('Game Clear');
        let reset = confirm('Reset Game ?')
        if(reset){
            location.reload()
        }
    }
}
function pauseGame(){
    let ballX = ball.dx;
    let ballY = ball.dy;
    ball.dx = 0;
    ball.dy = 0;
    paddle.speed = 0;
    let resume = confirm('Are you resume game ?')
    if(resume || resume == false){
        ballX < 0 ? ball.dx = -5 : ball.dx = 5;
        ballY < 0 ? ball.dy = -2 : ball.dy = 2;
        paddle.speed = 5;
    }
}
draw();
