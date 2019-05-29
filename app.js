const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context는 canvas안의 픽셀 다루는 것
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; //기본색 지정
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0 , canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR; 
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 굵기


let painting = false; //마우스 클릭 or 떼기
let filling = false;

function stopPainting(){
    painting = false;  //마우스 떼면 false
}

function startPainting(){
   painting = true;  //마우스 클릭하면 true
}


function onMouseMove(event){
   /* console.log(event);*/
    /*clientX,Y값은 윈도우 전체의 범위 내에서의 마우스 위치값을 나타내는것이고
    canvas 안에서 위치값은 offsetX,Y 이다. 즉, 윈도우 x,y좌표와 canvas x,y좌표는 다르다는 것*/
    
    const x = event.offsetX;
    const y = event.offsetY;
    /*console.log(x, y);*/
    if(!painting){ //캔버스 위에서 시작점을 찾는중
        //console.log("creating path in", x, y);
       ctx.beginPath(); //시작점
        ctx.moveTo(x, y);
       }else{ //클릭해서 선을 그리는 중
          // console.log("creating line in", x, y);
           ctx.lineTo(x, y); //점과 점을 직선으로 연결
           ctx.stroke();
       }
}


function handleColorClick(event){ //9가지 색깔 고르기
   /* console.log(event.target.style); backgorundColor 확인*/
    const color = event.target.style.backgroundColor;
   /* console.log(color);*/
    ctx.strokeStyle = color; //선색
    ctx.fillStyle = color; //채우기색
}

function handRangeChange(event){
    /*console.log(event.target.value);*/
    const size = event.target.value;
    ctx.lineWidth = size;
    
}

function handleModeClick(){
    if(filling === true){
       filling = false;
        mode.innerText = "Fill";
       }else{
           filling = true;
           mode.innerText = 'Paint';
           
       }
}

function handleCanvasClick(){
    if(filling){
         ctx.fillRect(0,0 , canvas.width, canvas.height);
       }
  
}

function handleCM(event){
    event.preventDefault(); //defaultPrevented를 true로 하기 우클릭 안 됨
     /*console.log(event);*/
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg"); //괄호안을 비우면 default로 png파일이 저장되며 png가 픽셀이 더 보기좋음 자세한건 MDN참조
   /* console.log(image);*/
    const link = document.createElement("a"); //a태그 만들기
    link.href = image; //href로해서 반드시 image(URL)가 되어야함
    link.download = "PaintJsExercise"; //download는 a의 attribute 임.
    /*console.log(link);*/
    link.click(); //a 태그에 클릭 속성 넣기
}


if(canvas){ //니꼴라스가 이런식으로 객체가 잘 반영됐는지 확인하기 위해서 항상 if문을 사용한다고 함.
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); //캔버스에서 벗어날 때
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
 }

/*console.log(Array.from(colors)); //object로부터 array 만듦. 내가 필요한건 array형태임*/
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handRangeChange);
   }

if(mode){
   mode.addEventListener("click", handleModeClick);
   }

if(saveBtn){
   saveBtn.addEventListener("click", handleSaveClick);
   }