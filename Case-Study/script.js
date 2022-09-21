import * as ground from './ground.js';
import * as main from './main.js';
import * as floor from './floor.js';
import {canvas, ctx} from './variable.js'
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    main.drawMain();
    main.mainMoving();
    main.mainAttack();
    main.mainDeath();
    main.mainCollisionFloor();
    main.mainCollisionLimit();
    main.checkMainOnGround();

    floor.drawFloor();
    ground.drawGround();
    
    requestAnimationFrame(draw);
}
draw()

