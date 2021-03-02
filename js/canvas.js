$(document).ready(function(){
    $(".pen_eraser #pencil").addClass("on");
    $(".pen_color #black").addClass("on");
    $(".eraser_width #5").addClass("on");
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
        
    });

    $(".eraser_width li").click(function(){
        var id=$(this).attr("data-role");
        $(".eraser_width li").removeClass("on");
        $(this).addClass("on");
        chooseEraser();
    });

})


var pos={
    drawable:false,
    pen_erase:true,
    opacity:1,
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

/*색 선택*/
function chooseColor(){
    var color=$(".pen_color li.on").attr("id");
    context.strokeStyle=color;
    context.strokeStyle=hexToRgb(context.strokeStyle);
}
 
/*hex값으로 받아온 걸 rgba형으로 받기*/
function hexToRgb( hex_num ){ 

    var hex = hex_num.replace( "#", "" ); 
    var value = hex.match( /[a-f\d]/gi );  
    if ( value.length == 3 ) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2]; 


    value = hex.match( /[a-f\d]{2}/gi ); 

    var r = parseInt( value[0], 16 ); 
    var g = parseInt( value[1], 16 ); 
    var b = parseInt( value[2], 16 ); 

    var rgb = "rgba(" + r + ", " + g + ", " + b +", " + pos.opacity + ")"; 

    return rgb; 
} 

/*현재 그리기 상태(펜, 지우기, 형광펜)*/
function chooseState(){
    var state=$(".pen_eraser li.on").attr("id");
    if(state=="pencil"){
        pos.pen_erase=true;
        pos.opacity=1;
    } 
    else if(state=="eraser") {
        pos.pen_erase=false;
        pos.opacity=1;
    }
    else if(state=="highlighter"){
        pos.pen_erase=true;
        pos.opacity=0.01;
    }
}

/*지우개 두께 선택*/
function chooseEraser(){
    erase_rad=$(".eraser_width li.on").attr("id");
}

var erase_rad=5;
var penWidth=document.getElementById("penWidth");
var thick=10;

/*펜 두께 선택*/
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
    chooseColor();
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
    Circle(context,coors.X,coors.Y,erase_rad);

}


/*저장하기*/
save.onclick=function(){
    var saveCanvas=document.getElementById('canvas');
    var saveCanvasValue=canvas.toDataURL();  //base64로 변환
    console.log(saveCanvasValue);


}

/*뒤로가기*/
