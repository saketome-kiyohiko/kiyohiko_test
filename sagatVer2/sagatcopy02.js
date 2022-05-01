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


//サガットの画像//下記のように一度全部newで読み込んだほうが画像が安定した////////////////////////
//サガット立ち画像
let sagat_stand1 = new Image();
sagat_stand1.src = "imgs/sagat_stand1.png";
let sagat_stand2 = new Image();
sagat_stand2.src = "imgs/sagat_stand2.png";
let sagat_stand3 = new Image();
sagat_stand3.src = "imgs/sagat_stand3.png";
let sagat_punch1 = new Image();
//サガットパンチ画像
sagat_punch1.src = "imgs/sagat_punch.png";
let sagat_punch2 = new Image();
sagat_punch2.src = "imgs/sagat_punch2.png";
let sagat_punch3 = new Image();
sagat_punch3.src = "imgs/sagat_punch3.png";
//サガット歩き画像
let sagat_work1  = new Image();
sagat_work1.src  = "imgs/sagat_work1.png";
let sagat_work2  = new Image();
sagat_work2.src  = "imgs/sagat_work2.png";
//サガットしゃがみ画像
let sagat_squat1  = new Image();
sagat_squat1.src  = "imgs/sagat_squat.png";
let sagat_squat2  = new Image();
sagat_squat2.src  = "imgs/sagat_squat2.png";
//サガットジャンプ
let sagat_jump1 = new Image();
sagat_jump1.src = "imgs/sagat_jump1.png";
let sagat_jump2 = new Image();
sagat_jump2.src = "imgs/sagat_jump2.png";
//サガットキック画像
let sagat_kick1 = new Image();
sagat_kick1.src = "imgs/sagat_kick1.png";
let sagat_kick2 = new Image();
sagat_kick2.src = "imgs/sagat_kick2.png";
let sagat_kick3 = new Image();
sagat_kick3.src = "imgs/sagat_kick3.png";
let sagat_kick4 = new Image();
sagat_kick4.src = "imgs/sagat_kick4_02.png";

//キャラ画像やサガット画像はImg、背景やオブジェクトはImageで統一したい
//サガット画像制御用
let sagatStatImg; 
let sagatImg = new Image();
sagatImg = sagatStatImg;
sagatStatImg = sagat_stand1;    //この画像は随時変わっていく
let sagatWidth = 182;
let sagatHeight = 182;
let sagatX = 100;
let sagatY = 350;





//背景//////////////////////////////////////////////////////////////
let mapX = 0;
let mapY = 0;
let mapImg;     //マップイメージの中に現在の背景を埋め込む

//宇宙
const utyu = new Image();
utyu.src  = "imgs/utyuu640x437.jpg";
mapImg = utyu;  //デフォルトのマップ
//その他マップ用テンプレ
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
        ctx.drawImage(mapImg, 0,0,300,300, 0,0,canvas.width,canvas.height);

        //フィールドを生成
        fieldDraw();


        //キャラとかのオブジェクト描画
        characterDraw();        //キャラのいろんなアクションの後、キャラクターを描画する         
        //サガット描画
        sagatBreathing();       //サガットの立ちモーション判定
        sagatWork();            //サガットの歩きモーション判定
        sagatAction();          //サガット技等の行動に関する制御
        drawSagat();            //サガット描画


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

//いろんな情報を加味して最終的にサガットを描画する関数
function drawSagat(){
    //サガット画像反転必要か判定して描画
    if(isSagatReversible){
        ctx.save();
        ctx.scale(-1,1);
        ctx.translate(-canvas.width, 0);
        sagatImg = sagatStatImg ;
        ctx.drawImage(sagatImg,0,0,sagatWidth,sagatHeight,canvas.width-sagatX-20-cameraX, sagatY, sagatWidth/1.5,sagatHeight/1.5);
        ctx.restore();
        //画像反転テスト
    }else{
        sagatImg = sagatStatImg ;
        ctx.drawImage(sagatImg,0,0,sagatWidth,sagatHeight,sagatX-20+cameraX,sagatY, sagatWidth/1.5,sagatHeight/1.5);
    }
    
}

//サガットの立ちモーションを設定
let sagatBreath = 0;
function sagatBreathing(){
    if(sagatWorkCount != 0){
        return;
    }
    if(sagatBreath<=5){
        sagatBreath++;
        sagatStatImg = sagat_stand1;
    }else if(sagatBreath<=10){
        sagatBreath++;
        sagatStatImg = sagat_stand3;
    }else if(sagatBreath<=15){
        sagatBreath++;
        sagatStatImg = sagat_stand2;
    }else if(sagatBreath<=20){
        sagatBreath = 0;
    }
}


//サガットの移動を制御する

let sagatWorkImg;
//let sagatFieldX;//未使用
//let sagatFieldY;//未使用
let sagatWorkCount = 0;
let sagatWorkfast = 4;
let isSagatReversible = false;   //向きを判定する
let sr = 1;                     //isSagatReversibleがtrueならマイナス1
//それぞれの方向に移動可能か否かの判定を決定する宣言
let cantMoveRight = false;  //右移動判定
let cantMoveLeft  = false;  //左移動判定
let cantMoveDown  = false;  //下移動判定
let cantMoveUp    = false;  //上移動判定
function sagatWork(){
    if(sagatActionNum > 0){    //アクション優先度。基準値ゼロなので完全自由でないとリターン
        return; 
    }
    //サガットの歩きモーション
    if(rightPressed&&!cantMoveRight){
        if(isSagatReversible==true){
            
        }
        isSagatReversible = false;
        sagatX += sagatWorkfast;
        sagatWorkCount++;
    }
    if(leftPressed&&!cantMoveRight){
        if(isSagatReversible==false){
            
        }
        isSagatReversible = true;
        sagatX -= sagatWorkfast;
        sagatWorkCount++;
    }
    if(sagatWorkCount != 0){
        if(sagatWorkCount<5){
            sagatStatImg = sagat_work1;
        }else if(sagatWorkCount<10){
            sagatStatImg = sagat_work2;
        }else if(sagatWorkCount<13){
            sagatStatImg = sagat_stand2;
        }else if(sagatWorkCount>13){
            sagatWorkCount = 0;
        }
    }
    if(isSagatReversible){
        sr = -1;
    }else{
        sr = 1;
    }
}

//サガットのアクションを制御
//アクション一覧から各アクションメソッドに移行する

let sagatActionNum = 0;   //アクションの優先度によって上げ、他の操作を制御する
let actionCount = 0;    //アクションのモーションを制御する変数
function sagatAction(){
    //ジャンプ
    if(jPressed||sagatActionNum>99){
        sagatJump();
    }
    //しゃがみ
    if(downPressed||sagatActionNum==1){
        sagatSquat();
    }
    //サガットパンチ
    if(pPressed||sagatActionNum==2){
        sagatPunch();
    }
    //サガットキック
    if(kPressed||sagatActionNum==3){
        sagatKick();
    }
    sagatFall();//落下状態とか着地の判定
}


//サガットの落下着地判定
let sagatFallNum=0;
function sagatFall(){
    
    //落下着地判定
    if(isSagatJump == 0){
        //着地中、サガットの位置は地面と同じ
        if(sagatY+30 < sagatFieldY){
            isSagatJump = 2;
        }else{
            sagatY = sagatFieldY;
        }
    }else if(isSagatJump==1){
        //ジャンプ中、サガットの位置はジャンプでのsagatYと同じ
        sagatY = sagatY;
    }else if(isSagatJump == 2 && sagatY < sagatFieldY){
        //落下中、サガットの位置は地面に触れるまで落ちていく
        sagatActionNum = 0;
        actionCount = 0;
        sagatStatImg = sagat_jump1;    
        sagatFallNum++;
        sagatY = sagatY;
        sagatY += sagatFallNum;
        if(sagatFallNum>6){
            sagatStatImg = sagat_jump2;
        }
    }else if(isSagatJump<=2 && sagatY > sagatFieldY){
        //落下中、地面に接した瞬間、ジャンプモードを着地に戻す
        sagatStatImg = sagat_squat2;
        sagatY = sagatFieldY;
        isSagatJump = 0;
        sagatFallNum = 0;
    }
    //壁との接触判定
    if(field[sagatX+4]-70<sagatY||field[sagatX-4]-70<sagatY){
        //次のフィールドの方が高ければ
        sagatX = sagatFieldX;//進めない
    }
    
}

//サガットのしゃがみアクション
let isSagatSquat = false;
function sagatSquat(){
    if(sagatActionNum>1||isSagatJump != 0){
        return;
    }
    if(downPressed && actionCount < 2 ){
        actionCount++;
        sagatActionNum = 1;
        sagatStatImg = sagat_squat2;
        isSagatSquat = true;
    }else if(downPressed && actionCount < 4){
        sagatActionNum = 1;
        sagatStatImg = sagat_squat1;
        isSagatSquat = true;
    }
    if(!downPressed&&actionCount>=2){
        sagatActionNum = 1;
        actionCount = 50000;
        sagatStatImg = sagat_squat2;
        if(!downPressed&&actionCount>=49990){
            sagatActionNum = 0;
            actionCount = 0;
        }
    }
    
}

//サガットのジャンプモーション
//派生用にアクションナンバーを高めに設定
let isSagatJump = 0;    //ジャンプ中なら1、落下なら2、着地なら0、着地硬直なら3
function sagatJump(){
    if(sagatActionNum>0&&sagatActionNum < 100||isSagatJump == 2){
        return;
    }
    sagatActionNum = 100;

    if(sagatActionNum==100&&actionCount == 0){
        actionCount = 3;
        sagatStatImg = sagat_squat2;
        isSagatJump = 1;
    }else if(sagatActionNum==100&&actionCount < 5){
        sagatStatImg = sagat_squat2;
        actionCount++;
    }else if(sagatActionNum==100&&actionCount < 10){
        if(actionCount==5){
            sagatY -= 20;
        }
        sagatY -= 10;
        sagatStatImg = sagat_jump2;
        actionCount++;
    }else if(sagatActionNum==100&&actionCount < 14){
        sagatY -= 6;
        sagatStatImg = sagat_jump1;
        actionCount++;
    }else if(sagatActionNum==100&&actionCount < 20){
        actionCount = 0;//終了
        sagatActionNum = 0;
        isSagatJump = 2;//自由落下になる
        sagatStatImg = sagat_jump1;        
    }
    //空中でも左右移動可能にするif文
    if(rightPressed){
        sagatX+=3;
    }
    if(leftPressed){
        sagatX-=3;
    }
}



//サガットのパンチアクションボタンP
function sagatPunch(){
    if(sagatActionNum>2||isSagatJump != 0){
        return;
    }
    sagatActionNum = 2;
    if(sagatActionNum==2&&actionCount == 0){
        actionCount =3;
        sagatStatImg = sagat_punch1;
    }else if(sagatActionNum==2&&actionCount < 5){
        actionCount ++;
        sagatStatImg = sagat_punch1;

    }else if(sagatActionNum==2&&actionCount < 7){
        actionCount ++;
        sagatStatImg = sagat_punch2;
    }else if(sagatActionNum==2&&actionCount < 10){
        if(actionCount == 7){
            attDete[attDete.length] = ["sagatPunch", sagatX+22*sr, sagatY, sagatX+90*sr, sagatY+20, 5, 4];
        }
        actionCount ++;
        sagatStatImg = sagat_punch3;
    }else if(sagatActionNum==2&&actionCount < 13){
        if(actionCount==10){
            for(let i=0; i<attDete.length ;i++){
                if(attDete[i][0]=="sagatPunch"){
                    attDete.splice(i, 1);//判定を削除
                    i -= 1;
                }
            }
            actionCount++;  
        }
        actionCount ++;
        sagatStatImg = sagat_punch2;
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
    if(sagatActionNum>3||isSagatJump != 0){
        return;
    }
    if(sagatActionNum==2&&actionCount>=7||sagatActionNum==2&&actionCount<2){
        return;
    }else if(sagatActionNum==2&&actionCount < 7){
        actionCount -= 2;
    }
    sagatActionNum = 3;
    if(sagatActionNum==3&&actionCount==0){
        actionCount = 3;
        sagatStatImg = sagat_kick1;
    }else if(sagatActionNum==3&&actionCount<4){
        actionCount++;
        sagatStatImg = sagat_kick1;
    }else if(sagatActionNum==3&&actionCount<6){
        actionCount++;
        sagatStatImg = sagat_kick2;
    }else if(sagatActionNum==3&&actionCount<8){
        actionCount++;
        sagatStatImg = sagat_kick3;
    }else if(sagatActionNum==3&&actionCount<10){
        actionCount++;
        sagatStatImg = sagat_kick4;
        //攻撃判定発生
        attDete[attDete.length] = ["sagatKick", sagatX+25*sr, sagatY, sagatX+93*sr, sagatY+20, 8, 8];
    }else if(sagatActionNum==3&&actionCount<12){
        if(actionCount==10){
            for(let i=0; i<attDete.length ;i++){
                if(attDete[i][0]=="sagatKick"){
                    attDete.splice(i, 1);//判定を削除
                    i -= 1;
                }
            }
            actionCount++;  
        }
        actionCount++;
        sagatStatImg = sagat_kick3;
    }else if(sagatActionNum==3&&actionCount<14){
        actionCount++;
        sagatStatImg = sagat_kick2;
    }else if(sagatActionNum==3&&actionCount<16){
        actionCount++;
        sagatStatImg = sagat_kick1;
    }else if(sagatActionNum==3&&actionCount<18){
        actionCount = 0;
        kPressed = false;
        sagatActionNum = 0
    }
}


//////////////////////////////////////////////////////////////////////////////////////
//フィールドに関する関数//
//フィールド画像
let fieldImg01 = new Image();
fieldImg01.src = "imgs/field275_90_01.jpg"
let field = [];
let sagatFieldX = 0; //現在のサガットのX座標変数
let sagatFieldY = 0; //現在のサガットのY座標。sagatYに足す用の変数
for(let x=0; x<150;x++){
    field[x] = [100];
}
for(let x=80; x<canvas.width/4; x++){
        field[x] = [150-x*0.1];
        //試しにY座標350を基準に緩やかな坂を作ってみる
}
for(let x=canvas.width/4; x<canvas.width/2; x++){
    field[x] = [335];
}
for(let x=canvas.width/2; x<canvas.width-canvas.width/4;x++){
    field[x] = [350-x*0.1];
}
for(let x=canvas.width-canvas.width/4; x<canvas.width; x++){
    field[x] = [250-x*0.1];
}
for(let x=canvas.width; x<canvas.width+500; x++){
    field[x] = [400-x*0.1];
}
//field[x]=フィールドXの座標。field[x][y]=フィールドXの標高。
//sagatX + sagatMapX = field[x]ということ。
let cameraX=0;
function fieldDraw(){
    //カメラ判定
    if(sagatX > canvas.width/2){
        //サガットXがもしもキャンバスの中央を超えるほど-1されていく
        cameraX = canvas.width/2 - sagatX;
    }
    
    //マップ描画
    for(let x=0+cameraX*-1; x<canvas.width+cameraX*-1; x++){
    ctx.drawImage(fieldImg01, x%275,0,1,90,Math.floor(x)-cameraX*-1,field[x],1,90);
}

    sagatFieldX = parseInt(sagatX);
    sagatFieldY = field[sagatFieldX]-105;//440はサガット初期Y軸350とサガットの身長約90の合計
}




////攻撃のあたり判定を制御する////
//2次元配列にpushして複数扱えるようにする
//     番号             [   0 ,   1  ,   2  ,  3  ,  4   ,   5   ,    6     ]
//attDete[attDete].push([ 技名, 場所x, 場所y, 長さw, 高さh, 攻撃力, ノックバック])
//attDete[attDete.length].push([ 技名, x, y, w, h, p, b]);
let attDete = [];
//↑これをpushして、判定メソッドではforで回せば良さそう？？
let HIT2 = new Image();
HIT2.src = "imgs/HIT2.png"
let addCorrection = 0;
function AttackDetection(cad){
    //cad[c][ 判定の横位置x , 判定の高さ位置y, 判定の横端, 判定の高さ座標 ]
    if(attDete.length==0){
        return;
    }
    for(let s=0; s<attDete.length; s++){
        for(let c=0; c<charBeAttDetes.length ;c++){
            if((attDete[s][2]>cad[c][1]&&attDete[s][2]<cad[c][3])||(attDete[s][4]>cad[c][1]&&attDete[s][4]<cad[c][3])&&(attDete[s][2]<cad[c][1]&&attDete[s][4]>cad[c][1])){//高さ軸
                if((attDete[s][1]<cad[c][0]&&attDete[s][3]>cad[c][0])||(attDete[s][1]<cad[c][2]&&attDete[s][3]>cad[c][2])||(attDete[s][1]>cad[c][0]&&attDete[s][1]<cad[c][2])||(isSagatReversible&&(attDete[s][3]>cad[c][0]&&attDete[s][3]<cad[c][2]))){//横軸
                    if(!isSagatReversible&&attDete[s][3]>cad[c][2]){
                        ctx.drawImage(HIT2,0,0,100,100, cad[c][2]+cameraX, attDete[s][4], 30, 30);
                    }else if(isSagatReversible&&attDete[s][3]<cad[c][0]){
                        ctx.drawImage(HIT2,0,0,100,100, cad[c][0]+cameraX, attDete[s][4], 30, 30);
                    }else{
                        ctx.drawImage(HIT2,0,0,100,100, attDete[s][3]+cameraX, attDete[s][4], 30, 30);
                    }
                        charaX += attDete[s][6]*sr; //ノックバックテスト
                }
            }
        }
        
    }

}

////キャラクターオブジェクト////////////////////////////////////////////////////////

//character設定を簡単にする為、変数化して代入する。その変数宣言
let charaWidth = 0;
let charaHeight= 0;
let charaX = 0;
let charaY = 0;
let charaImg;
let charBeAttDetes = [];
let charaSwich = false;//初期値が決まったらONにして、消えたらOFFに。。？
//配列化してfor文で複数処理しようかなという感じ
function characterDraw(){
    //衝突判定をリセット
    /*
    cantMoveRight = false;  //右移動判定
    cantMoveLeft  = false;  //左移動判定
    cantMoveDown  = false;  //下移動判定
    cantMoveUp    = false;  //上移動判定
    */
    //キャラ配置を書いていく
    if(mapImg==utyu){
        if(!charaSwich){    
            charaImg = new Image();
            charaImg = slimeImg;
            charaWidth = 235;
            charaHeight = 260;
            charaX = 300;
            charaY = 150;
            charaSwich = true;
        }
        
        //多次元配列に複数格納して複数の当たり判定を作成することができる。
        //[[ 判定の横位置x , 判定の高さ位置y, 判定の長さ座標, 判定の高さ座標 ]]
        charBeAttDetes = [[charaX, charaY,charaX+(charaWidth/1.5),charaY+(charaHeight/1.5)]];
        //キャラを描画
        ctx.drawImage(charaImg,0,0,charaWidth, charaHeight, charaX+cameraX, charaY, charaWidth/1.5, charaHeight/1.5);
        AttackDetection(charBeAttDetes);//当たり判定関数
        
    }
    
}

//キャライメージまとめ////////////////////////////////////////////////

let slimeImg = new Image();
slimeImg.src = "imgs/slimeG235x260.png";

//////////////操作関連/////////////////////////////////////////////////////////////////
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let jPressed = false;
let pPressed = false;
let kPressed = false;

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
    if(e.key == "J" || e.key == "j" ){
        jPressed = true;
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
    if(e.key == "J" || e.key == "j" ){
        jPressed = false;
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
