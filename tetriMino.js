"use strict";

class tetriMino {
    constructor(refX, refY, minoType) {
        switch (minoType){
          case 1:
            //Iミノ
            this.minoPos = [[refX, refY], [refX+1, refY], [refX+2, refY], [refX+3, refY]];
            break;
          case 2:
            //Oミノ
            this.minoPos = [[refX, refY], [refX+1, refY], [refX, refY+1], [refX+1, refY+1]];
            break;
          case 3:
            //Tミノ
            this.minoPos = [[refX+1, refY], [refX, refY+1], [refX+1, refY+1], [refX+2, refY+1]];
            break;
          case 4:
            //Jミノ
            this.minoPos = [[refX, refY], [refX, refY+1], [refX+1, refY+1], [refX+2, refY+1]];
            break;
          case 5:
            //Lミノ
            this.minoPos = [[refX+2, refY], [refX, refY+1], [refX+1, refY+1], [refX+2, refY+1]];
            break;
          case 6:
            //Sミノ
            this.minoPos = [[refX, refY+1], [refX+1, refY+1], [refX+1, refY], [refX+2, refY]];
            break;
          case 7:
            //Zミノ
            this.minoPos = [[refX, refY], [refX+1, refY], [refX+1, refY+1], [refX+2, refY+1]];
            break;
        }
    }
    
    //単位要素描画
    drawBox(x,y){
        ctx.fillRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
    }
    
    //単位要素消去
    clearBox(x,y){
        ctx.clearRect((x-1)*boxWH, (y-1)*boxWH, boxWH, boxWH);
        ctx.beginPath();
    }
    
    //テトリミノ描画
    drawMino(){
        for (var i = 1; i <= 4; i++){
            this.drawBox(this.minoPos[i-1][0],this.minoPos[i-1][1]);
        }
    }
    
    //テトリミノ消去
    clearMino(){
        for (var i = 1; i <= 4; i++){
            this.clearBox(this.minoPos[i-1][0],this.minoPos[i-1][1]);
        }
    }
    
    
    //テトリミノ移動
    moveMino(x,y){
        this.clearMino();
        for (var i = 1; i <=4; i++){
            this.minoPos[i-1][0] += x;
            this.minoPos[i-1][1] += y;
        }
        this.drawMino();
    }
    
    //テトリミノ落下
    fallMino(){
        this.moveMino(0, 1);
    }
}