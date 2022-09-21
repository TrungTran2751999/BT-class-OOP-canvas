import {main, canvas, ctx, image, ground, floorList, floor} from './variable.js';

console.log(main)
document.addEventListener('keydown', (event)=>{
    if(event.key == 'ArrowRight'){
        main.moveRight= true;
        main.directRight = true;
        main.directLeft = false;
    }else if(event.key == 'ArrowLeft'){
        main.moveLeft= true;
        main.directRight = false;
        main.directLeft = true;
    };
    if(event.key == ' '){
        main.isAtack = true;
    };
    if(event.key == 'a'){
        main.isDeath = true
    }
});
document.addEventListener('keyup', (event)=>{
    if(event.key == 'ArrowRight'){
        main.moveRight= false;
    }else if(event.key == 'ArrowLeft'){
        main.moveLeft= false;
    }
    if(event.key == ' '){
        main.isAtack = false;
    }
})
// kiem tra main co o tren dat ko 
function checkMainOnGround(){
    main.y += main.dy;
    if(main.isDeath == false){
        if(main.y + main.height -50 >= ground.y){
            main.dy = 0;
        }
    }else{
        main.dy=2;
        if(main.y + main.height -60 >= ground.y){
            main.dy = 0;
        }
    }
}
// Cham 2 duong bien
function mainCollisionLimit(){
    if(main.x + main.width - 60 >= canvas.width){
        main.dx = 0;
        if(main.directLeft == true){
            main.dx = 4;
        }
    }else if(main.x+10 <= 0){
        main.dx = 0;
        if(main.directRight == true){
            main.dx = 4;
        }
    }
}
// Kiem tra main va cham voi cac floor
function mainCollisionFloor(){
        if(main.x >= floorList[0][0] && main.x <= floorList[0][0] + floorList[0][2] && Math.floor(floorList[0][1] - main.y) == 98){
            main.dy = 0;
        }else if(main.x>= floorList[0][0] + floorList[0][2] && main.y + main.height -50 <= ground.y){
            main.dy = 2;
        }
        if(main.x >= floorList[2][0] && main.x <= floorList[2][0] + floorList[2][2] && Math.floor(floorList[2][1] - main.y) == 98){
            main.dy = 0;
        }else if(main.x>= floorList[2][0] + floorList[2][2] && main.y + main.height -50 <= ground.y){
            main.dy = 2;
        }
        if(main.x >= floorList[1][0] && main.x <= floorList[1][0] + floorList[1][2] && Math.floor(floorList[1][1] - main.y) == 99){
            main.dy = 0;
        }
        else if(main.x >= floorList[1][0] && main.y + main.height -50 <= ground.y){
            main.dy = 2;
        }
        
}

// kiem tra trang thai chet cua main
function mainDeath(){
    if(main.isDeath == true && main.directRight == true){
        main.imgY = 950;
        main.dx = 0;
    }else if(main.isDeath == true && main.directLeft == true){
        main.imgY = 1100;
        main.dx = 0;
    }
};
// kiem tra trang that tan cong cua main
function mainAttack(){
    if(main.isAtack == true && main.directRight == true){
        main.imgY = 637 ;
    }else if(main.isAtack == true && main.directLeft == true){
        main.imgY = 796 ;
    }
};
// kiem tra trang thai di chuyen cua main
function mainMoving(){
    if(main.moveRight == true && main.isDeath == false && main.isAtack == false){
        main.x += main.dx;
        main.imgY = 324; 
    }if(main.moveLeft == true && main.isDeath == false && main.isAtack == false){
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
// trang thai main
function StatusMain(){
    let v = 60;
    if(main.isDeath == true){
        v = 200;
    }
    let j = 0;
    setInterval(()=>{
        main.imgX = main.width*j;
        j++;
        if(j > 8 && main.isDeath == false){
            j = 0;
        }else if(main.isDeath == true && j > 8){
            j = 8;
        }
    },v)
};
function drawMain(){
    ctx.beginPath();
    ctx.drawImage(image, main.imgX, main.imgY, main.width, main.height, main.x, main.y, main.width/1.5, main.height/1.5);
    ctx.closePath();
}
requestAnimationFrame(StatusMain);
export {main, mainDeath, mainAttack, mainMoving, drawMain, checkMainOnGround,  mainCollisionLimit, mainCollisionFloor}
