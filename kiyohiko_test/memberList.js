// ------------------------------------------------------------
//キャンバスの生成
const ca = document.createElement("canvas");//canvasエレメント生成
document.body.appendChild(ca);          //id="ca"でBODYのノードリストに登録する
// CanvasRenderingContext2D オブジェクトを取得する
const ctx = ca.getContext("2d");

let slimeX =0;
let slimeY =0;

//画像ファイルの定義
let slimeImg = new Image();
slimeImg.src = "slime545x460.png";

let keshiki = new Image();
keshiki.src = "a5ab38d00c3e1fec6364d59d43aebc7cfb1c10f9.png";

window.onload = function(){
// ------------------------------------------------------------
//キャンバスのサイズを設定する
ca.width  = 320;
ca.height = 240;

// ------------------------------------------------------------
// スタイルシートのサイズを変更する
var style = ca.style;
style.width  = (700) + "px";
style.height = (465) + "px";

// ------------------------------------------------------------
// 描画

function draw(){
    /*
    ctx.beginPath();
    ctx.rect(  0 ,  0 , 640 , 480 );
    ctx.fill();
    ctx.stroke();
    //画像をdraw描画
    slimeImgDraw();
    */
    ctx.drawImage(keshiki,0,0,700,465,0,0,700,465);
    slimeImgDraw();
}


let slimeImgDraw =()=>{
    ctx.drawImage(slimeImg,160,110,225,225,slimeX,slimeY,60,55);
}

document.addEventListener('keypress', keypress_ivent);
function keypress_ivent(e){
    //左を押したとき
    if(e.key==='a' || e.key==='A' || e.key == "ArrowLeft"){
    slimeX-=3;
    }
    //右を押したとき
    if(e.key==='d' || e.key==='D' || e.key == "ArrowRight"){
        slimeX+=3;
    }
    //下を押したとき
    if(e.key==='s' || e.key==='S' || e.key == "ArrowDown"){
        slimeY+=3;
    }
    //上を押したとき
    if(e.key==='w' || e.key==='W' || e.key == "ArrowUp"){
        slimeY-=3;
    }
}

let play = setInterval(draw, 10);
play();


}