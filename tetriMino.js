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
    
    //テトリミノ描画
    drawMino(){
        for (var i = 1; i <= 4; i++){
            this.drawBox(this.minoPos[i-1][0],this.minoPos[i-1][1]);
        }
    }
}