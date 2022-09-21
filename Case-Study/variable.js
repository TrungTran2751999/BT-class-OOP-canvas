let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let image = document.getElementById('source');

let main = {
    width: 132,
    height: 148,
    x: 0,
    y: 0,
    imgX: 0,
    imgY: 0,
    dx: 4,
    dy:2,
    moveRight: false,
    moveLeft: false,
    directRight: true,
    directLeft: false,
    isAtack: false,
    isDeath: false,
    isGround: true,
};
let floor = {
    width: canvas.width/2,
    height: 28.44,
}
let ground = {
    x: 0,
    y: 480,
    width: canvas.width,
    height:20,
};
let distanceFloor = main.height/1.5;
let floorList = [
    [0, distanceFloor, floor.width, floor.height],
    [floor.width, distanceFloor*2 + floor.height  ,floor.width, floor.height],
    [0, distanceFloor*3 + floor.height*2, floor.width, floor.height],
];
export {main, floor, ground, canvas, ctx, image, floorList}