﻿const canvasW = 300; //画面幅
const canvasH = 600; //画面高
const boxWH = 30; //単位要素幅高

let fallInterval = 300; //落下速度(インターバル)

let canvas = document.getElementById("tetrisCanvas");
let ctx = canvas.getContext("2d");

var timer;
var canvasData = [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [1,1,1,1,1,1,1,1,1,1]];

// canvasの縦横指定
(() => {
    document.getElementById("tetrisCanvas").width = canvasW;
    document.getElementById("tetrisCanvas").height = canvasH;
})();


function main(){
    mino = new tetriMino(4, 1, Math.floor( Math.random() * 7 ) + 1);
    mino.drawMino();
    function a(){mino.fallMino();}
    timer = setInterval(a, fallInterval);
}

main();