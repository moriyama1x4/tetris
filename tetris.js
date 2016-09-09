//unko

const canvasW = 300; //画面幅
const canvasH = 600; //画面高
const subCanvasW = 180;
const subCanvasH = 300;
const boxWH = 30; //単位要素幅高

let fallInterval = 300; //落下速度(インターバル)

let ctx = document.getElementById("tetrisCanvas").getContext("2d");
let nextCtx = document.getElementById("nextCanvas").getContext("2d");
let holdCtx = document.getElementById("holdCanvas").getContext("2d");

let gameOn = false;
let timer;
let mino;

//next関係の変数
let nextMino;
let nextType = Math.floor( Math.random() * 7 ) + 1;

//hold関係の変数
let holdMino;
let keepNextType;
let nowType;
let holdType;
let holdFlg = false;
let secondHoldFlg = false;

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
function makeMino(minoType){
    mino = new tetriMino(4, 1, minoType, ctx, canvasData);
}

//ネクストミノ生成
function makeNextMino(minoType){
    nextMino = new tetriMino(2, 5, minoType, nextCtx, canvasData);
}

//ホールドミノ生成
function makeHoldMino(minoType){
    holdMino = new tetriMino(2, 5, minoType, holdCtx, canvasData);
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
            if(JSON.stringify(mino.canvasData[i]) == JSON.stringify([1,0,0,0,0,0,0,0,0,0,0,1])){
                break;
            }else if(JSON.stringify(mino.projRowData(i)) != JSON.stringify([1,1,1,1,1,1,1,1,1,1,1,1])){
                i--;
            }
        }
        holdFlg = false;
        main();
    }else{
        mino.moveMino(0,1);
    }
}

function resetNext(){
    nextType = Math.floor( Math.random() * 7 ) + 1;
    if(nextMino != null){
        nextMino.clearMino();
    }
    makeNextMino(nextType);
    nextMino.drawMino();
}

//メイン動作
function main(){
    makeMino(nextType);
    mino.drawMino();
    nowType = nextType; //holdのために現在のミノタイプをキープ
    
    if(!secondHoldFlg || !holdFlg){
        resetNext();    //2回目以降のホールド時は動作しない
    }else{
        nextType = keepNextType;
    }
    
    
    if(!mino.judgeMove(0,1)){
        alert("ゲームオーバー");
        resetGame();
    }else{
        timer = setInterval(fall, fallInterval);
    }
}

function hold(){
    if(!holdFlg){
        clearInterval(timer);
        mino.clearMino();
        
        //2回目以降のホールド
        if(holdMino != null){
            holdMino.clearMino();
            keepNextType = nextType;
            nextType = holdType;
            secondHoldFlg = true;
        }
        
        holdType = nowType;
        makeHoldMino(nowType);
        holdMino.drawMino();
        holdFlg = true;
        main();
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
    mino = null;
    nextMino = null;
    holdMino = null;
    ctx.clearRect(0, 0, canvasW, canvasH);
    nextCtx.clearRect(0, 0, subCanvasW, subCanvasH);
    holdCtx.clearRect(0, 0, subCanvasW, subCanvasH);
    //なぜかconcatつけてデフォルトキープする事が出来なかった
    for(var i = 1; i <= 20; i++){
        canvasData[i] = [1,0,0,0,0,0,0,0,0,0,0,1];
    }
    holdFlg = false;
    secondHoldFlg = false;
    startGame();
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
            case 38:
                hold(); //「↑」でホールド
                break;
            case 17:
                stopGame();
                break;
        }
    }else{
        switch (e.keyCode) {
            case 13:
                resetGame();
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
    document.getElementById("nextCanvas").width = subCanvasW;
    document.getElementById("nextCanvas").height = subCanvasH;
    document.getElementById("holdCanvas").width = subCanvasW;
    document.getElementById("holdCanvas").height = subCanvasH;
    startGame();
}