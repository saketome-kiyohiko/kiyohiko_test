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
canvas.width  = 900;
canvas.height = 500;

//画像のゲット
//キャラ画像やサガット画像はImg、背景やオブジェクトはImageで統一したい
//サガット
let sagatImg  = new Image(); 
let sagatStatImg = "imgs/sagat_stand1.png"; //この画像は随時変わっていく
sagatImg.src = sagatStatImg ;
let sagatWidth = 182;
let sagatHeight = 182;
let sagatX = 100;
let sagatY = 300;




//サガットの画像//////////////////////////////////////////////////////////////
let sagat_stand1 = new Image();
sagat_stand1.src = "imgs/sagat_stand1.png";


//背景//////////////////////////////////////////////////////////////
let mapX = 0;
let mapY = 0;
let mapImg;     //マップイメージの中に現在の背景を埋め込む

//宇宙
const utyu = new Image();
utyu.src  = "imgs/utyuu640x437.jpg";
mapImg = utyu;  //デフォルトのマップ
//その他マップ
let chizMap = new Image();
chizMap.src = "";





///////////////////////////////////////////////////////////////////////////
//メインメソッド
window.onload = function()
{
    function draw(){
        
        //前のフレームの描画を全部消す
        ctx.clearRect(0,0, canvas.width, canvas.height);
        //背景描画
        ctx.drawImage(mapImg,0,0,300,300, 0,0,canvas.width,canvas.height);
        //ctx.drawImage(mapImage,mapX,mapY,300,215, 0, 0,canvas.width,canvas.height);
        //キャラとかのオブジェクト描画
        characterDraw()
        //サガット描画
        sagatBreathing();
        sagatWork();
        sagatAction();
        sagatImg.src = sagatStatImg ;
        ctx.drawImage(sagatImg,0,0,sagatWidth,sagatHeight,sagatX,sagatY,sagatWidth/1.5,sagatHeight/1.5);
        


        //デバッグ用数値入力処理
        
//        p1.innerText = `sagatX=${sagatX}`;
//        p2.innerText = `sagatY=${sagatY}`;
//        p3.innerText = `mapX=${mapX}`;
//        p4.innerText = `mapY=${mapY}`;
        p5.innerText = `sagatBreath=${sagatBreath}`
        p6.innerText = `sagatBreath=${sagatBreath}`
//        p7.innerText = `sagatMapX=${sagatMapX}`;
//        p8.innerText = `sagatMapY=${sagatMapY}`;
        p7.innerText = `actionCount =${actionCount}`;
        p8.innerText = `sagatActionNum =${sagatActionNum }`;
        p9.innerText = `sagatWorkCount=${sagatWorkCount}`;
        
    }
    //なんかこの書き方でエラーが出なくなった。
    let play =()=> setInterval(draw, 30);
    play();
}


//サガットの立ちモーションを設定
let sagatBreath = 0;
function sagatBreathing(){
    if(sagatWorkCount != 0){
        return;
    }
    if(sagatBreath<=5){
        sagatBreath++;
        sagatStatImg = "imgs/sagat_stand1.png";
    }else if(sagatBreath<=10){
        sagatBreath++;
        sagatStatImg = "imgs/sagat_stand3.png";
    }else if(sagatBreath<=15){
        sagatBreath++;
        sagatStatImg = "imgs/sagat_stand2.png";
    }else if(sagatBreath<=20){
        sagatBreath = 0;
    }
}


//サガットの移動を制御する
let rightPressed;
let leftPressed;
let upPressed;
let downPressed;
let sagatWorkImg;
let sagatFieldX;
let sagatFieldY;
let sagatWorkCount = 0;
let sagatWorkfast = 4;
//それぞれの方向に移動可能か否かの判定を決定する宣言
let cantMoveRight = false;  //右移動判定
let cantMoveLeft  = false;  //左移動判定
let cantMoveDown  = false;  //下移動判定
let cantMoveUp    = false;  //上移動判定
function sagatWork(){
    if(sagatActionNum > 0){    //アクション優先度
        return; 
    }
    //サガットの歩きモーション
    if(rightPressed&&!cantMoveRight){
        sagatX += sagatWorkfast;
        sagatWorkCount++;
    }
    if(leftPressed&&!cantMoveRight){
        sagatX -= sagatWorkfast-1;
        sagatWorkCount++;
    }
    if(sagatWorkCount != 0){
        if(sagatWorkCount<5){
            sagatStatImg = "imgs/sagat_work1.png";
        }else if(sagatWorkCount<10){
            sagatStatImg = "imgs/sagat_work2.png";
        }else if(sagatWorkCount<13){
            sagatStatImg = "imgs/sagat_stand2.png";
        }else if(sagatWorkCount>13){
            sagatWorkCount = 0;
        }
    }
    
}

//サガットのアクションを制御
//アクション一覧から各アクションメソッドに移行する
let pPressed = false;
let kPressed = false;
let sagatActionNum = 0;   //アクションの優先度によって上げ、他の操作を制御する
let actionCount = 0;    //アクションのモーションを制御する変数
function sagatAction(){
    //サガットパンチ
    if(pPressed||sagatActionNum==2){
        sagatPunch();
    }
    //サガットキック
    if(kPressed||sagatActionNum==3){
        sagatKick();
    }
    //しゃがみ
    if(downPressed||sagatActionNum==1){
        sagatSquat();
    }
}
//サガットのしゃがみアクション
let isSagatSquat = false;
function sagatSquat(){
    if(sagatActionNum>1){
        return;
    }
    if(downPressed && actionCount < 2 ){
        actionCount++;
        sagatActionNum = 1;
        sagatStatImg = "imgs/sagat_squat2.png";
        isSagatSquat = true;
    }else if(downPressed && actionCount < 4){
        sagatActionNum = 1;
        sagatStatImg = "imgs/sagat_squat.png";
        isSagatSquat = true;
    }
    if(!downPressed&&actionCount>=2){
        sagatActionNum = 1;
        actionCount = 50000;
        sagatStatImg = "imgs/sagat_squat2.png";
        if(!downPressed&&actionCount>=49990){
            sagatActionNum = 0;
            actionCount = 0;
        }
    }
    
}


//サガットのパンチアクションボタンP
function sagatPunch(){
    if(sagatActionNum>2){
        return;
    }
    sagatActionNum = 2;
    if(sagatActionNum==2&&actionCount == 0){
        actionCount =3;
        sagatStatImg = "imgs/sagat_punch.png";
    }else if(sagatActionNum==2&&actionCount < 5){
        actionCount ++;
        sagatStatImg = "imgs/sagat_punch.png";

    }else if(sagatActionNum==2&&actionCount < 7){
        actionCount ++;
        sagatStatImg = "imgs/sagat_punch2.png";
    }else if(sagatActionNum==2&&actionCount < 10){
        actionCount ++;
        sagatStatImg = "imgs/sagat_punch3.png";
    }else if(sagatActionNum==2&&actionCount < 13){
        actionCount ++;
        sagatStatImg = "imgs/sagat_punch2.png";
    }else if(sagatActionNum==2&&actionCount >= 13){
        actionCount = 0;
        pPressed = false;
        sagatActionNum = 0
    }
}

//サガットのキックアクションk 3
let correctionX = 0;  //技ごとのリーチ、立ち位置補正
let correctionY =0;
function sagatKick(){
    if(sagatActionNum==2&&actionCount>=9){
        return;
    }
    sagatActionNum = 3;
    
    if(sagatActionNum==3&&actionCount==0){
        actionCount = 3;
        sagatStatImg = "imgs/sagat_kick1.png";
        correctionX = sagatX+18;    //位置を調整する値を宣言
    }else if(sagatActionNum==3&&actionCount<4){
        actionCount++;
        sagatStatImg = "imgs/sagat_kick1.png";
    }else if(sagatActionNum==3&&actionCount<6){
        actionCount++;
        sagatStatImg = "imgs/sagat_kick2.png";
    }else if(sagatActionNum==3&&actionCount<8){
        sagatX = correctionX;   //位置調整
        actionCount++;
        sagatStatImg = "imgs/sagat_kick3.png";
    }else if(sagatActionNum==3&&actionCount<10){
        sagatX = correctionX;
        actionCount++;
        sagatStatImg = "imgs/sagat_kick4.png";
    }else if(sagatActionNum==3&&actionCount<12){
        if(actionCount==11){
            sagatX -= 12;       //位置調整
            actionCount++;
        }
        actionCount++;
        sagatStatImg = "imgs/sagat_kick3.png";
    }else if(sagatActionNum==3&&actionCount<14){
        actionCount++;
        sagatStatImg = "imgs/sagat_kick2.png";
    }else if(sagatActionNum==3&&actionCount<16){
        actionCount++;
        sagatStatImg = "imgs/sagat_kick1.png";
    }else if(sagatActionNum==3&&actionCount<18){
        actionCount = 0;
        kPressed = false;
        sagatActionNum = 0
    }
}

////攻撃のあたり判定を制御する////
//引数（ 攻撃力, 場所x, 場所y, 大きさX,大きさY ）
function AttackDetection(attackPower,deteX,deteY,deteSizeX,deteSizeY){
    deteX += sagatX;
    if(deteX + deteSizeX < charaX - 10 ){
        return;
    }
}

////キャラクターオブジェクト////////////////////////////////////////////////////////

//character設定を簡単にする為、変数化して代入する。その変数宣言
let charaWidth = 0;
let charaHeight= 0;
let charaX = 0;
let charaY = 0;
let charaImg;
function characterDraw(){
    //衝突判定をリセット
    /*
    cantMoveRight = false;  //右移動判定
    cantMoveLeft  = false;  //左移動判定
    cantMoveDown  = false;  //下移動判定
    cantMoveUp    = false;  //上移動判定
    */
    //キャラ配置を書いていく
//    if(mapImage==utyu){
        charaImg = new Image();
        charaImg = slimeImg;
        charaWidth = 235;
        charaHeight= 260;
        charaX = 400;
        charaY = 260;
        ctx.drawImage(charaImg,0,0,charaWidth, charaHeight, charaX, charaY, charaWidth/1.5, charaHeight/1.5);
//        当たり判定とかイベント関数に移動
//        collisionDetection()
//    }
    
}

//キャライメージまとめ////////////////////////////////////////////////

let slimeImg = new Image();
slimeImg.src = "imgs/slimeG235x260.png";

//////////////操作関連/////////////////////////////////////////////////////////////////
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
    if(e.key == "P" || e.key == "p" ){
        pPressed = true;
    }
    if(e.key == "K" || e.key == "k" ){
        kPressed = true;
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
    if(e.key == "P" || e.key == "p" ){
        pPressed = false;
    }
    sagatWorkCount = 0;
    if(e.key == "K" || e.key == "k" ){
        kPressed = false;
    }
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
