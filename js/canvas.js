let drawArea = {};
let board, context, step = 50;

function docLoad() {

    board = document.getElementById('board');
    context = board.getContext('2d');


    drawArea = context.getDrowArea(step);

    context.drawGrid(drawArea.step);

    drawArea.x = Math.floor(drawArea.width * 0.5);
    drawArea.y = Math.floor(drawArea.height * 0.5);

    context.drawRect();

    var randX=getRndInt(0,Math.floor(drawArea.width/drawArea.step))*step,
    randY=getRndInt(0,Math.floor(drawArea.height/drawArea.step))*step;
    context.drawStar(randX+25,randY+25,5,16,8);


    // for (let index = 1; index < rectLength-1; index++) {
    //     drawArea.x+=step;
    //     drawArea.y+=step;
    //     context.rect(drawArea.x,drawArea.y,step,step);
    //     context.fillStyle = 'yellow';
    //     context.fill();
    // }
    // console.log(drawArea);
    // context.beginPath();



    //   context.beginPath();
    //   context.moveTo(100, 150);
    //   context.lineTo(450, 50);


    //   context.moveTo(100, 150);
    //   context.lineTo(450, 150);
    //   context.stroke();




    document.onkeydown = function (e) {
        context.clearRect(0, 0, drawArea.width, drawArea.height);
        context.drawGrid(drawArea.step);
        switch (e.which) {
            case 37:
                drawArea.x -= drawArea.step;
                //sol
                break;
            case 38:
                drawArea.y -= drawArea.step;
                //yuxari
                break;
            case 39:
                drawArea.x += drawArea.step;
                //sag
                break;
            case 40:
                drawArea.y += drawArea.step;
                //asagi
                break;

            default:
                break;
        }
        if (drawArea.x < 0) {
            drawArea.x = drawArea.width-drawArea.step;
        }
        else  if (drawArea.x >= drawArea.width) {
            drawArea.x = 0;
        }

        
        if (drawArea.y < 0) {
            drawArea.y = drawArea.height-drawArea.step;
        }
        else  if (drawArea.y >= drawArea.height) {
            drawArea.y = 0;
        }
        context.drawRect();
    }
}
CanvasRenderingContext2D.prototype.drawStar=function(cx,cy,spikes,outerRadius,innerRadius)
{
        var rot=Math.PI/2*3;
        var x=cx;
        var y=cy;
        var step=Math.PI/spikes;
  
        this.beginPath();
        this.moveTo(cx,cy-outerRadius)
        for(i=0;i<spikes;i++){
          x=cx+Math.cos(rot)*outerRadius;
          y=cy+Math.sin(rot)*outerRadius;
          this.lineTo(x,y)
          rot+=step
  
          x=cx+Math.cos(rot)*innerRadius;
          y=cy+Math.sin(rot)*innerRadius;
          this.lineTo(x,y)
          rot+=step
        }
        this.lineTo(cx,cy-outerRadius);
        this.closePath();
        this.lineWidth=5;
        this.strokeStyle='#e67e22';
        this.stroke();
        this.fillStyle='#f1c40f';
        this.fill();

      return this;


}
CanvasRenderingContext2D.prototype.getDrowArea = function (step, x = 0, y = 0) {

    var style = window.getComputedStyle(board);

    return {
        width: style['width'].replace('px', ''),
        height: style['height'].replace('px', ''),
        x: x,
        y: y,
        step: step
    };
}
CanvasRenderingContext2D.prototype.drawRect = function () {

    this.rect(drawArea.x, drawArea.y, drawArea.step, drawArea.step);
    this.fillStyle = 'yellow';
    this.fill();
    return this;
}
CanvasRenderingContext2D.prototype.drawGrid = function (cellStep) {
    this.beginPath();
    let y = 0, x = 0;
    while (y <= drawArea.height) {
        this.moveTo(x, y);
        this.lineTo(drawArea.width, y);

        // drawArea.y=drawArea.y+step;
        y += cellStep;
    }

    y = x = 0;
    while (x <= drawArea.width) {
        y = 0;
        this.moveTo(x, y);
        this.lineTo(x, drawArea.height);

        x += cellStep;
    }
    this.stroke();
    return this;
}


function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }