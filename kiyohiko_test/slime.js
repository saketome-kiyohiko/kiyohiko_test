//デバッグ用の数値出力用
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let p4 = document.querySelector("#p4");
let p5 = document.querySelector("#p5");
let p6 = document.querySelector("#p6");
let p7 = document.querySelector("#p7");
let p8 = document.querySelector("#p8");
let p9 = document.querySelector("#p9");


//キャンバス宣言
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

//キャンバスのサイズ
canvas.width  = 800;
canvas.height = 500;

//画像のゲット
//キャラ画像やスライム画像はImg、背景やオブジェクトはImageで統一したい
//スライム
const slimeImg  = new Image(); 
slimeImg.src = "imgs/slimeG235x260.png" ;
let slimeWidth = 50;
let slimeHeight = 45;
//キャラの画像//////////////////////////////////////////////////////////////
const nuuImg = new Array(3);
for(let i=0; i<nuuImg.length;i++){
    nuuImg[i] = new Image();
}
nuuImg[0].src = "imgs/nuu1_64x66.png";
nuuImg[1].src = "imgs/nuu2_59_63.png";
nuuImg[2].src = "imgs/nuu3_64x65.png";




//背景//////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
//メインメソッド
window.onload = function()
{
    function draw(){
        //前のフレームの描画を全部消す
        ctx.clearRect(0,0, canvas.width, canvas.height);
        //背景描画
        //ctx.drawImage(mapImage,mapX,mapY,300,215, 0, 0,canvas.width,canvas.height);
        ctx.drawImage(mapImage,mapX,mapY,canvas.width/2,canvas.height/2, 0, 0,canvas.width,canvas.height);
        //スライム画像を描画
        ctx.drawImage(slimeImg,0,0,235,260,slimeX+slimeBreath/10,slimeY-slimeWork*3,slimeWidth-slimeBreath/5,slimeHeight+slimeWork);
        
        //キャラオブジェを描画
        characterDraw();
        
        slimeBreathing();
        mapAction();
        mapLoad();
        slimeAction();
        
        //デバッグ用数値入力処理
        p1.innerText = `slimeX=${slimeX}`;
        p2.innerText = `slimeY=${slimeY}`;
        p3.innerText = `mapX=${mapX}`;
        p4.innerText = `mapY=${mapY}`;
        p5.innerText = `slimeBreath=${slimeBreath}`
        p6.innerText = `slimeBreathCount=${slimeBreathCount}`
        p7.innerText = `slimeMapX=${slimeMapX}`;
        p8.innerText = `slimeMapY=${slimeMapY}`;
        p9.innerText = `${charaX-mapX*2}`;
        
    }
    //なんかこの書き方でエラーが出なくなった。
    let play =()=> setInterval(draw, 30);
    play();
}

//character設定を簡単にする為、変数化して代入する。その変数宣言
let charaWidth = 0;
let charaHeight= 0;
let charaX = 0;
let charaY = 0;
let charaImg;
function characterDraw(){
    //衝突判定をリセット
    cantMoveRight = false;  //右移動判定
    cantMoveLeft  = false;  //左移動判定
    cantMoveDown  = false;  //下移動判定
    cantMoveUp    = false;  //上移動判定
    //キャラ配置を書いていく
    if(mapImage==utyu){
        charaImg = nuuImg[2];
        charaWidth = 64;
        charaHeight= 66;
        charaX = 1000;
        charaY = 50;
        ctx.drawImage(charaImg,0,0,charaWidth, charaHeight, charaX-mapX*2, charaY-mapY*2, charaWidth, charaHeight);
        collisionDetection()
    }
    if(mapImage==utyu){
        charaImg = nuuImg[1];
        charaWidth = 64;
        charaHeight= 66;
        charaX = 500;
        charaY = 200;
        ctx.drawImage(charaImg,0,0,charaWidth, charaHeight, charaX-mapX*2, charaY-mapY*2, charaWidth, charaHeight);
        collisionDetection()
    }
    if(mapImage==utyu){
        charaImg = nuuImg[0];
        charaWidth = 64;
        charaHeight= 66;
        charaX = 800;
        charaY = 400;
        ctx.drawImage(charaImg,0,0,charaWidth, charaHeight, charaX-mapX*2, charaY-mapY*2, charaWidth, charaHeight);
        collisionDetection()
    }
    
}

//オブジェクトとの衝突判定を行う
function collisionDetection(){
    //もしもスライム座標Y軸が、オブジェクト座標のY軸内なら、X軸の位置判定を行う
    if( charaY-mapY < slimeMapY && slimeMapY+slimeHeight/2 < charaY+charaHeight-mapY ){
        if( charaX-mapX <=slimeMapX+slimeWidth && slimeMapX < charaX-mapX+charaWidth-10 ){
            //スライム座標のX軸が、オブジェクト(+グラフィック幅等)のX軸内なら、移動不可フラグをオン
            cantMoveRight = true;
        }
        if( charaX-mapX <= slimeMapX && slimeMapX <= charaX+charaWidth-mapX ){
            cantMoveLeft = true;
        }
    }
    if( charaX-mapX < slimeMapX+slimeWidth-2 && slimeMapX+2 < charaX-mapX+charaWidth){
        if( charaY-mapY < slimeMapY+slimeHeight && slimeMapY+slimeHeight < charaY+slimeHeight-mapY){
            cantMoveDown = true;
        }
        if( charaY-mapY < slimeMapY && slimeMapY < charaY+charaHeight-mapY){
            cantMoveUp = true;
        }
    }
    //前後位置関係を調べてスライム描画を判定する
    if( slimeMapY+slimeHeight > charaY+charaHeight-mapY){
        //もしスライム座標Y軸がオブジェクト座標のY軸より高ければ、スライム画像を描画
        //これでスライム座標を前にいるように描画出来る
        ctx.drawImage(slimeImg,0,0,235,260,slimeX+slimeBreath/10,slimeY-slimeWork*3,slimeWidth-slimeBreath/5,slimeHeight+slimeWork);        
    }
}

//マップ画像読み込み
const utyu = new Image();
utyu.src  = "imgs/utyuu640x437.jpg";
const chizMap = new Image();
chizMap.src  = "imgs/chizman640x360.png";
//マップデータをやり取りする関数
let mapX=0;
let mapY=0;
let mapImage = utyu;
mapX = mapX;
mapY = mapY;
function mapLoad(){
    if(mapImage==utyu&&slimeX>=canvas.width-slimeWidth-10){
        mapImage = chizMap;
        mapX = 0;
        mapY = 0;
        slimeX =30;
        slimeY=30;
    }
    if(mapImage == chizMap&&slimeX <= 5){
        mapImage = utyu;
        mapX = mapImage.width-canvas.width/2;
        mapY = 0;
        slimeX =canvas.width-slimeWidth-20;
        slimeY=30;
    }
}

//スライムの常に動く画像処理]
let slimeBreath = 0;
let slimeBreathCount = 0;
function slimeBreathing(){
    if(slimeBreathCount<=30){
        slimeBreath++;
        slimeBreathCount++;
    }else if(slimeBreathCount<=60){
        slimeBreathCount++;
    }else if(slimeBreathCount<=90){
        slimeBreath--;
        slimeBreathCount++;
    }else if(slimeBreathCount>=91){
        slimeBreathCount=0;
        slimeBreath=0;
    }
}


//下記windowステータスがtrueの時、スライムが動かなくなり背景が動く。
let windowRight = false;
let windowLeft = false;
let windowUp = false;
let windowDown = false;
function mapAction(){
    if(slimeX >= canvas.width/2 && mapX<=mapImage.width-canvas.width/2){
        windowRight = true;
    }else{
        windowRight = false;
    }
    if(slimeX < canvas.width/2 && mapX >= 0){
        windowLeft = true;
    }else{
        windowLeft = false;
    }
    if(slimeY >= canvas.height/2 && mapY<=mapImage.height-canvas.height/2){
        windowDown = true;
    }else{
        windowDown = false;
    }
    if(slimeY < canvas.height/2 && mapY >= 0 ){
        windowUp =true;
    }else{
        windowUp = false;
    }
    
}

//slimeの位置を調整する
let rightPressed;
let leftPressed;
let upPressed;
let downPressed;
let slimeX = 0;
let slimeY = 0;
let slimeWork = 0;
let slimeWorkCount = 0;
let slimeMapX = slimeX + mapX;
let slimeMapY = slimeY + mapY;
let swc =1;     //スライムの移動ジャンプ幅
let swm =3;     //スライムの移動モーション速度。上げるとジャンプ力が減る
let slimeMoveSpeed = 3;
//それぞれの方向に移動可能か否かの判定を決定する宣言
let cantMoveRight = false;  //右移動判定
let cantMoveLeft  = false;  //左移動判定
let cantMoveDown  = false;  //下移動判定
let cantMoveUp    = false;  //上移動判定
function slimeAction(){
    //スライムの居場所をわかりやすくするために毎回設定
    slimeMapX = slimeX + mapX;
    slimeMapY = slimeY + mapY;
    //移動のグラフィック変化
    if(slimeWorkCount<=14&&(rightPressed||leftPressed||upPressed||downPressed)){
        slimeWork+=swc;
        slimeWorkCount+=swm;
    }else if(slimeWorkCount>=14&&28>=slimeWorkCount&&(rightPressed||leftPressed||upPressed||downPressed)){
        slimeWorkCount+=swm;
        slimeWork-=swc;
    }else{
        slimeWorkCount=0;
        slimeWork = 0;
    }
    
    //座標移動
    

    if(rightPressed&&!cantMoveRight){
        //移動関数
        if(slimeX<canvas.width-slimeWidth && !windowRight){
            slimeX+=slimeMoveSpeed;
        }else if(windowRight){
            mapX+=slimeMoveSpeed/2;
        }
    }
    if(leftPressed&&!cantMoveLeft){
        if(slimeX > 0&&!windowLeft){
            slimeX-=slimeMoveSpeed;
        }else if(windowLeft){
            mapX-=slimeMoveSpeed/2;
        }
    }
    if(upPressed&&!cantMoveUp){
        if(slimeY>0&&!windowUp){
            slimeY-=slimeMoveSpeed;
        }else if(windowUp){
            mapY-=slimeMoveSpeed/2;
        }
    }
    if(downPressed&&!cantMoveDown){
        if(slimeY < canvas.height-slimeHeight&&!windowDown){
            slimeY+=slimeMoveSpeed;
        }if(windowDown){
            mapY+=slimeMoveSpeed/2;
        }
    }
}

//キーボード処理を受つける関数
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight" ||e.key ==='d'||e.key ==='D'){
        rightPressed = true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft" ||e.key ==='a'||e.key ==='A'){
        leftPressed = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp" ||e.key ==='w'||e.key ==='W'){
        upPressed = true;
    }
    if(e.key == "Down" || e.key == "ArrowDown" ||e.key ==='s'||e.key ==='S'){
        downPressed = true;
    }
    
}
//キーボードを離した時の処理
function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight" ||e.key ==='d'||e.key ==='D'){
        rightPressed = false;
    }
    if(e.key == "Left" || e.key == "ArrowLeft" ||e.key ==='a'||e.key ==='A'){
        leftPressed = false;
    }
    if(e.key == "Up" || e.key == "ArrowUp" ||e.key ==='w'||e.key ==='W'){
        upPressed = false;
    }
    if(e.key == "Down" || e.key == "ArrowDown" ||e.key ==='s'||e.key ==='S'){
        downPressed = false;
    }
    slimeWork = 0;
    slimeWorkCount=0;
}

    //フリック操作を受け付ける関数
    let FstartX = 0;
    let FstartY = 0;
    let FmoveX = 0;
    let FmoveY = 0;
    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();// スクロール無効化 
        FstartX = e.touches[0].pageX;
        FstartY = e.touches[0].pageY;
        //指が触れた座標を獲得する
    });
    
    // 画面上で指を移動させているきの処理を定義
    canvas.addEventListener("touchmove", function(e) {
        e.preventDefault();// スクロール無効化 
        FmoveX = e.changedTouches[0].pageX;
        FmoveY = e.changedTouches[0].pageY;
        if(FstartX < FmoveX){
            rightPressed = true;
        } else if(FstartX > FmoveX){
            leftPressed = true;
        }
        if(FstartY < FmoveY){
            downPressed = true;
        }else if(FstartY > FmoveY){
            upPressed = true;
        }
    });
    
    // 画面から指が離れたときの処理を定義
    canvas.addEventListener("touchend", function(e) {
        e.preventDefault();// スクロール無効化 
        rightPressed = false;
        leftPressed = false;
        downPressed = false;
        upPressed = false;
    });
