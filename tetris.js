const canvasW = 300; //画面幅
const canvasH = 600; //画面高
const boxWH = 30; //単位要素幅高

let fallInterval = 300; //落下速度(インターバル)

let canvas = document.getElementById("tetrisCanvas");
let ctx = canvas.getContext("2d");

let gameOn = false;
let timer;
let mino;

let canvasData = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,0,0,0,0,0,0,0,0,0,0,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1]];

//ミノ生成
function makeMino(){
    mino = new tetriMino(4, 1, Math.floor( Math.random() * 7 ) + 1, ctx, canvasData);
}

//ミノ落下
function fall(){
    if(!mino.judgeMove(0,1)){
        clearInterval(timer); 
        for (var i = 1; i <= 4; i++){
            mino.drawData(mino.minoPos[i-1][0],mino.minoPos[i-1][1]); //止まったらデータ更新
        }
        
        //下から順に行消去判定。何もない行があればbreak
        for (var i = 20; i >= 1;){
            mino.clearRow(i);
            if(JSON.stringify(canvasData[i]) == JSON.stringify([1,0,0,0,0,0,0,0,0,0,0,1])){
                break;
            }else if(JSON.stringify(mino.projRowData(i)) != JSON.stringify([1,1,1,1,1,1,1,1,1,1,1,1])){
                i--;
            }
        }
        
        main();
    }else{
        mino.moveMino(0,1);
    }
}

//メイン動作
function main(){
    makeMino();
    mino.drawMino();
    if(!mino.judgeMove(0,1)){
        alert("ゲームオーバー");
        resetGame();
    }else{
        timer = setInterval(fall, fallInterval);
    }
}

function startGame(){
    gameOn = true;
    main();
}

function stopGame(){
    gameOn = false;
    clearInterval(timer);
}

function restartGame(){
    gameOn = true;
    timer = setInterval(fall, fallInterval);
}

function resetGame(){
    stopGame();
    ctx.clearRect(0, 0, canvasW, canvasH);
    mino = null;
    
    //なぜかconcatつけてデフォルトキープする事が出来なかった
    for(var i = 1; i <= 20; i++){
        canvasData[i] = [1,0,0,0,0,0,0,0,0,0,0,1];
    }    
}

//キーボード操作
document.addEventListener('keydown', e => {
    if(gameOn){
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
            case 32:
                mino.rotateMino(); //スペースで回転
                break;
            case 17:
                stopGame();
                break;
        }
    }else{
        switch (e.keyCode) {
            case 13:
                startGame();
                break;
            case 17:
                restartGame();
                break;
        }
    }
});

window.onload = function(){
    document.getElementById("tetrisCanvas").width = canvasW;
    document.getElementById("tetrisCanvas").height = canvasH;
}