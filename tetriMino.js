"use strict";

class tetriMino {
    constructor(refX, refY, minoType, ctx, canvasData) {
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
        this.minoType = minoType;
        this.minoColor = ["#67fecc", "#feff3a", "#d363fd", "#2b63b1", "#ff9804", "#65ff34", "#fe3465"];
    }
    
    
    
    
    //ボックス描画
    drawBox(x,y,color){
        ctx.fillStyle = color;
        ctx.fillRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
    }
    
    //データ0→n
    drawData(x,y){
        canvasData[y][x] = this.minoType;
    }
    
    
    //ボックス消去
    clearBox(x,y){
        ctx.clearRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
    }
    
    //データn→0
    clearData(x,y){
        canvasData[y][x] = 0;
    }
    
    //ミノ描画
    drawMino(){
        for (var i = 1; i <= 4; i++){
            this.drawBox(this.minoPos[i-1][0], this.minoPos[i-1][1], this.minoColor[this.minoType-1]);
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
            if (canvasData[this.minoPos[i][1]+y][this.minoPos[i][0]+x] != 0) {
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
    
    //行データ射影
    projRowData(y){
        var rowData = [1,0,0,0,0,0,0,0,0,0,0,1];        
        for(var i = 1; i <= 10; i++){
            if(canvasData[y][i] != 0){
                rowData[i] = 1;
            }
        }
        return rowData;
    }
    
    //行消去 & ずらし
    clearRow(y){
        if(JSON.stringify(this.projRowData(y)) == JSON.stringify([1,1,1,1,1,1,1,1,1,1,1,1])){
            //行消去
            for(var i = 1; i <= 10; i++){
                this.clearData(i, y);
                this.clearBox(i, y);
            }
            
            //行ずらし
            for(var i = y; i >= 2; i--){
                canvasData[i] = canvasData[i-1];
                for(var j = 1; j <= 10; j++){
                    if(canvasData[i][j] != 0){
                        this.drawBox(j, i, this.minoColor[canvasData[i][j] - 1]);
                    }else{
                        this.clearBox(j, i);
                    }
                }
            }
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