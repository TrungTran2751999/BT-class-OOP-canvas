import {ctx, floorList} from './variable.js';
function drawFloor(){
    floorList.map((floor)=>{
        ctx.beginPath();
        ctx.rect(floor[0], floor[1], floor[2], floor[3])
        ctx.fill();
        ctx.closePath();
    })
}
export {drawFloor}