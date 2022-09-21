import {ctx, ground} from './variable.js'
function drawGround(){
   ctx.beginPath();
   ctx.rect(ground.x, ground.y, ground.width, ground.height);
   ctx.fill()
   ctx.closePath();
}
export {drawGround}