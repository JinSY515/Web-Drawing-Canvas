$(document).ready(function(){
    $(".pen_eraser #pencil").addClass("on");
    $(".pen_color #black").addClass("on");
    $(".pen_eraser li").click(function(){
        var id=$(this).attr("data-role");
        $(".pen_eraser li").removeClass("on");
        $(this).addClass("on");
        chooseState();
    });

    $(".pen_color li").click(function(){
        var id=$(this).attr("data-role");
        $(".pen_color li").removeClass("on");
        $(this).addClass("on");
        chooseColor();
    });



})


var pos={
    drawable:false,
    pen_erase:true,
    x:-1,
    y:-1
};
var canvas;
var context;
window.onload=function(){
    canvas=document.getElementById("canvas");
    context=canvas.getContext("2d");

    canvas.addEventListener("mousedown",listener);
    canvas.addEventListener("mouseup",listener);
    canvas.addEventListener("mousemove",listener);
    canvas.addEventListener("mouseout",listener);

    
}
function chooseColor(){
    var color=$(".pen_color li.on").attr("id");
    context.strokeStyle=color;
}
function chooseState(){
    var state=$(".pen_eraser li.on").attr("id");
    if(state=="pencil") pos.pen_erase=true;
    else if(state="eraser") pos.pen_erase=false;
}

var penWidth=document.getElementById("penWidth");
var thick=10;

plusBtn.onclick=function(){
    if(thick>=100) penWidth.innerHTML=100;
    else{
        thick++;
        penWidth.innerHTML=thick;
    }
    
}

minusBtn.onclick=function(){
    if(thick<=1) penWidth.innerHTML=1;
    else{
        thick--;
        penWidth.innerHTML=thick;
    }
    
}

function listener(event){
    switch(event.type){
        case "mousedown":
            Initialize(event);
            break;
        case "mousemove":
            if(pos.drawable && pos.pen_erase) draw(event);
            else if(pos.drawable && !pos.pen_erase) Erase(event);
            break;
        case "mouseout":
        case "mouseup":
            Finish();
            break;
    }
}

function Initialize(event){
    context.beginPath();
    context.lineCap="round";
    context.lineWidth=thick;
    pos.drawable=true;
    var coors=getPosition(event);
    pos.x=coors.X;
    pos.y=coors.Y;
    context.moveTo(pos.x,pos.y);
}

function draw(event){
    var coors=getPosition(event);
    context.lineTo(coors.X,coors.Y);
    pos.x=coors.X;
    pos.y=coors.Y;
    context.stroke();
}

function Finish(){
    pos.drawable=false;
    pos.x=-1;
    pos.y=-1;
}



function getPosition(event){
    var x=event.pageX - canvas.offsetLeft;
    var y=event.pageY - canvas.offsetTop;
    return{X: x, Y: y};
}

function EraseAll(){
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
}

function Circle(context,x,y,radius) {
	context.save();
	context.beginPath();
	context.arc(x, y, radius, 0, 2*Math.PI, true);
	context.clip();
	context.clearRect(x-radius,y-radius,radius*2,radius*2);
	context.restore();
}
function Erase(event){
    var coors=getPosition(event);
    Circle(context,coors.X,coors.Y,10);

}