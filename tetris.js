const canvasW = 300; //画面幅
const canvasH = 600; //画面高
const boxWH = 30; //単位要素幅高

let fallInterval = 300; //落下速度(インターバル)

let canvas = document.getElementById("tetrisCanvas");
let ctx = canvas.getContext("2d");

let timer;
let mino;

let canvasData = [[1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1], [1,1,1,1,1,1,1,1,1,1,1,1]];

// canvasの縦横指定
(() => {
    document.getElementById("tetrisCanvas").width = canvasW;
    document.getElementById("tetrisCanvas").height = canvasH;
})();

//メイン動作
function main(){
    mino = new tetriMino(4, 1, Math.floor( Math.random() * 7 ) + 1);
    mino.drawMino();
    function fall(){mino.fallMino();}
    timer = setInterval(fall, fallInterval);
}

main();

//キーボード操作
document.addEventListener('keydown', e => {
switch (e.keyCode) {
case 39:
  mino.moveMino(1,0); //「→」で右移動
  break;
case 37:
  mino.moveMino(-1,0); //「←」で左移動
  break;
case 40:
  mino.moveMino(0,1); //「↓」で下加速
  break;
}
});