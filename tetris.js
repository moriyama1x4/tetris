﻿const canvasW = 300; //画面幅
const canvasH = 600; //画面高
const boxWH = 30; //単位要素幅高

let fallInterval = 500; //落下速度(インターバル)

let canvas = document.getElementById("tetrisCanvas");
let ctx = canvas.getContext("2d");

var timer;


// canvasの縦横指定
(() => {
    document.getElementById("tetrisCanvas").width = canvasW;
    document.getElementById("tetrisCanvas").height = canvasH;
})();




mino = new tetriMino(4, 1, 1);
mino.drawMino();
timer = setInterval("mino.fallMino()", fallInterval);
