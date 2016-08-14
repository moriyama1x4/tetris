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
        canvasData[y-1][x] = 1;
    }
    
    
    //ボックス消去
    clearBox(x,y){
        ctx.clearRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
    }
    
    //データ1→0
    clearData(x,y){
        canvasData[y-1][x] = 0;
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
        if (canvasData[this.minoPos[0][1]+y-1][this.minoPos[0][0]+x] == 1) {
            return false;
        }else if (canvasData[this.minoPos[1][1]+y-1][this.minoPos[1][0]+x] == 1){
            return false;
        }else if (canvasData[this.minoPos[2][1]+y-1][this.minoPos[2][0]+x] == 1){
            return false;
        }else if (canvasData[this.minoPos[3][1]+y-1][this.minoPos[3][0]+x] == 1){
            return false;
        }else{
            return true;
        }
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
    
    //ミノ自動落下
    fallMino(){
        if(!this.judgeMove(0,1)){
            clearInterval(timer);
            for (var i = 1; i <= 4; i++){
                this.drawData(this.minoPos[i-1][0],this.minoPos[i-1][1]); //止まったらデータ更新
            }
            main();
        }else{
            this.moveMino(0,1);
        }
    }
    
    //ミノ回転
    rotateMino(){
        var boxRelPos = [[this.minoPos[1][0] - this.minoPos[0][0], this.minoPos[1][1] - this.minoPos[0][1]],
                         [this.minoPos[2][0] - this.minoPos[0][0], this.minoPos[2][1] - this.minoPos[0][1]],
                         [this.minoPos[3][0] - this.minoPos[0][0], this.minoPos[3][1] - this.minoPos[0][1]]];
        this.clearMino(); 
        
        for (var i = 1; i <= 3; i++){
            if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([1,0])){
                boxRelPos[i-1] = [0,-1];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]);
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([1,-1])){
                boxRelPos[i-1] = [-1,-1];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([0,-1])){
                boxRelPos[i-1] = [-1,0];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([-1,-1])){
                boxRelPos[i-1] = [-1,1];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([-1,0])){
                boxRelPos[i-1] = [0,1];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([-1,1])){
                boxRelPos[i-1] = [1,1];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            } 
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([0,1])){
                boxRelPos[i-1] = [1,0];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([1,1])){
                boxRelPos[i-1] = [1,-1];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([2,0])){
                boxRelPos[i-1] = [0,-2];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([0,-2])){
                boxRelPos[i-1] = [-2,0];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([-2,0])){
                boxRelPos[i-1] = [0,2];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
            else if (JSON.stringify(boxRelPos[i-1]) == JSON.stringify([0,2])){
                boxRelPos[i-1] = [2,0];
                this.minoPos[i][0] = (this.minoPos[0][0] + boxRelPos[i-1][0]); 
                this.minoPos[i][1] = (this.minoPos[0][1] + boxRelPos[i-1][1]); 
            }
        }
    }
}