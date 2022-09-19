let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let image = document.getElementById('source');
let main = {
    width: 132,
    height: 148,
    x: 131,
    y: 157,
    imgX: 0,
    imgY: 0,
    dx: 5,
    moveRight: false,
    moveLeft: false,
    directRight: false,
    directLeft: false,
    isAtack: false,
}
document.addEventListener('keydown', (event)=>{
    if(event.key == 'ArrowRight'){
        main.moveRight= true;
        main.directRight = true;
        main.directLeft = false;
        console.log(main.directRight)
    }else if(event.key == 'ArrowLeft'){
        main.moveLeft= true;
        main.directRight = false;
        main.directLeft = true;
        console.log(main.directRight)
    };
    if(event.key == ' '){
        main.isAtack = true;
        main.dx=0;
    };
    console.log(event)
})
document.addEventListener('keyup', (event)=>{
    if(event.key == 'ArrowRight'){
        main.moveRight= false;
    }else if(event.key == 'ArrowLeft'){
        main.moveLeft= false;
    }
    if(event.key == ' '){
        main.isAtack = false;
        main.dx=5;
    }
})
function mainMoving(){
    if(main.moveRight == true){
        dx = 5;
        main.x += main.dx;
        main.imgY = 324; 
    }if(main.moveLeft == true){
        dx = 5;
        main.imgY = 484; 
        main.x -= main.dx;
    }if(main.moveRight == false && main.moveLeft == false){
        if(main.directRight == true){
            main.imgY = 0;
        }else if(main.directLeft == true){
            main.imgY = 160;
        }
    }
}
function mainAttack(){
    if(main.isAtack == true && main.directRight == true){
        main.imgY = 637 ;
    }else if(main.isAtack == true && main.directLeft == true){
        main.imgY = 796 ;
    }
}
function StatusMain(){
    let j = 0;
    setInterval(()=>{
        main.imgX = main.width*j;
        j++;
        if(j > 8){
            j = 0;
        }
    },60)
}
requestAnimationFrame(StatusMain)
function drawMain(){
    ctx.beginPath();
    ctx.drawImage(image, main.imgX, main.imgY, main.width, main.height, main.x, main.y, main.width, main.height);
    ctx.closePath();
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawMain();
    mainMoving();
    mainAttack();
    requestAnimationFrame(draw);
}
draw()

