"use strict";

class tetriMino {
    constructor(refX, refY, minoType) {
        switch (minoType){
          case 1:
            //Iミノ
            this.minoPos = [[refX+1, refY], [refX, refY], [refX+2, refY], [refX+3, refY]];
            break;
          case 2:
            //Oミノ
            this.minoPos = [[refX, refY], [refX+1, refY], [refX, refY+1], [refX+1, refY+1]];
            break;
          case 3:
            //Tミノ
            this.minoPos = [[refX+1, refY+1], [refX, refY+1], [refX+1, refY], [refX+2, refY+1]];
            break;
          case 4:
            //Jミノ
            this.minoPos = [[refX+1, refY+1], [refX, refY+1], [refX, refY], [refX+2, refY+1]];
            break;
          case 5:
            //Lミノ
            this.minoPos = [[refX+1, refY+1], [refX, refY+1], [refX+2, refY], [refX+2, refY+1]];
            break;
          case 6:
            //Sミノ
            this.minoPos = [[refX+1, refY], [refX+1, refY+1], [refX, refY+1], [refX+2, refY]];
            break;
          case 7:
            //Zミノ
            this.minoPos = [[refX+1, refY], [refX, refY], [refX+1, refY+1], [refX+2, refY+1]];
            break;
        }
    }
    
    //ボックス描画
    drawBox(x,y){
        ctx.fillRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
    }
    
    //データ0→1
    drawData(x,y){
        canvasData[y][x] = 1;
    }
    
    
    //ボックス消去
    clearBox(x,y){
        ctx.clearRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
    }
    
    //データ1→0
    clearData(x,y){
        canvasData[y][x] = 0;
    }
    
    //ミノ描画
    drawMino(){
        for (var i = 1; i <= 4; i++){
            this.drawBox(this.minoPos[i-1][0],this.minoPos[i-1][1]);
        }
    }
    
    //ミノ消去
    clearMino(){
        for (var i = 1; i <= 4; i++){
            this.clearBox(this.minoPos[i-1][0],this.minoPos[i-1][1]);
        }
    }
    
    //移動判定
    judgeMove(x, y){
        var judge = true;
        
        for(var i = 0; i <= 3; i++){
            if (canvasData[this.minoPos[i][1]+y][this.minoPos[i][0]+x] == 1) {
                judge =  false;
            }
        }
        
        return judge;
    }
    
    //ミノ移動
    moveMino(x,y){
        if(this.judgeMove(x,y)){
            this.clearMino();
            for (var i = 1; i <=4; i++){
                this.minoPos[i-1][0] += x;
                this.minoPos[i-1][1] += y;
            }
            this.drawMino();
        }
    }
    
    //列消去 & ずらし
    clearRow(y){
        if(JSON.stringify(canvasData[y]) == JSON.stringify([1,1,1,1,1,1,1,1,1,1,1,1])){
            //列消去
            for(var i = 1; i <= 10; i++){
                this.clearData(i, y);
                this.clearBox(i, y);
            }
            
            //列ずらし
            for(var i = y; i >= 2; i--){
                canvasData[i] = canvasData[i-1];
                for(var j = 1; j <= 10; j++){
                    if(canvasData[i][j] == 1){
                        this.drawBox(j, i);
                    }else{
                        this.clearBox(j, i);
                    }
                }
            }
        }
    }
    
    //ミノ自動落下
    fallMino(){
        if(!this.judgeMove(0,1)){
            clearInterval(timer);
            for (var i = 1; i <= 4; i++){
                this.drawData(this.minoPos[i-1][0],this.minoPos[i-1][1]); //止まったらデータ更新
            }
            
            //データ更新後に列消去処理をするため、ループを分ける
            for (var i = 1; i <= 4; i++){
                this.clearRow(this.minoPos[i-1][1]);
            }
            
            main();
        }else{
            this.moveMino(0,1);
        }
    }
    
    //ミノ回転
    rotateMino(){
        var defBoxPos = [this.minoPos[1].concat(), this.minoPos[2].concat(), this.minoPos[3].concat()]; //デフォルトの絶対位置をキープ
        
        //基準ブロックからの相対位置取得
        var boxRelPos = [[this.minoPos[1][0] - this.minoPos[0][0], this.minoPos[1][1] - this.minoPos[0][1]],
                         [this.minoPos[2][0] - this.minoPos[0][0], this.minoPos[2][1] - this.minoPos[0][1]],
                         [this.minoPos[3][0] - this.minoPos[0][0], this.minoPos[3][1] - this.minoPos[0][1]]];
        var judgeRotate = true; //回転可不可判定値
        
        // functionの中ではthisを参照できない？？
        //相対位置 → 絶対位置に変換 & 移動できるかジャッジ
        function setRelPos(minoPos, i){
            if(canvasData[minoPos[0][1] + boxRelPos[i-1][1]][minoPos[0][0] + boxRelPos[i-1][0]] == 0){
                minoPos[i][0] = (minoPos[0][0] + boxRelPos[i-1][0]); 
                minoPos[i][1] = (minoPos[0][1] + boxRelPos[i-1][1]);
            }else{
                judgeRotate = false;
            }
        }
        
        this.clearMino(); 
        
        //基準ブロックからの相対位置を回転 & 相対　→　絶対変換
        for (var i = 1; i <= 3; i++){
            boxRelPos[i-1] = [-boxRelPos[i-1][1], boxRelPos[i-1][0]]; // 相対位置π/2回転
            setRelPos(this.minoPos, i);
        }
        
        //1ブロックでも回転不可のものがあれば元に戻す
        if(!judgeRotate){
            for(var i = 1; i <= 3; i++){
                this.minoPos[i] = defBoxPos[i-1];
            }
        }

        this.drawMino();
    }
}