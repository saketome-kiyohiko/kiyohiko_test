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

let nullImage = new Image();
nullImage.src = "imgs/null_Image.png";
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
//サガット飛び膝
let sagat_knee = new Image();
sagat_knee.src = "imgs/sagat_knee.png"
//サガットキック画像
let sagat_kick1 = new Image();
sagat_kick1.src = "imgs/sagat_kick1.png";
let sagat_kick2 = new Image();
sagat_kick2.src = "imgs/sagat_kick2.png";
let sagat_kick3 = new Image();
sagat_kick3.src = "imgs/sagat_kick3.png";
let sagat_kick4 = new Image();
sagat_kick4.src = "imgs/sagat_kick4_02.png";
//サガットしゃがみキックモーション
let sagat_squat_kick01 = new Image();
sagat_squat_kick01.src = "imgs/squat_kick01.png"
let sagat_squat_kick02 = new Image();
sagat_squat_kick02.src = "imgs/squat_kick02.png"
//サガットステップイン
let sagat_step_in01 = new Image();
sagat_step_in01.src = "imgs/sagat_step_in01.png";
let sagat_step_in02 = new Image();
sagat_step_in02.src = "imgs/sagat_step_in02.png";
let sagat_step_in03 = new Image();
sagat_step_in03.src = "imgs/sagat_step_in03.png";

//サガットダメージ受けモーション
let sagat_damage1 = new Image();
sagat_damage1.src = "imgs/sagat_damage1.png"
let sagat_damage2 = new Image();
sagat_damage2.src = "imgs/sagat_damage2.png"
//キャラ画像やサガット画像はImg、背景やオブジェクトはImageで統一したい
//サガット画像制御用
let sagatStatImg; 
let sagatImg = new Image();
sagatImg = sagatStatImg;
sagatStatImg = sagat_stand1;    //この画像は随時変わっていく
let sagatWidth = 30;
let sagatHeight = 105;
let sagatX = 2000;
let sagatY = 350;





//背景//////////////////////////////////////////////////////////////
let mapX = 0;
let mapY = 0;
let mapImg;     //マップイメージの中に現在の背景を埋め込む

//宇宙
const utyu = new Image();
utyu.src  = "imgs/utyuu640x437.jpg";
//なんか山みたいな背景
let yama01 = new Image();
yama01.src = "imgs/yama_haikei01.jpg";


//デフォルトのマップ
mapImg = yama01;
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
        ctx.drawImage(mapImg, 0-cameraX/20,0,300,300, 0,0,canvas.width,canvas.height);

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
        p1.innerText = `sagatX=${sagatX}`;
        p2.innerText = `sagatY=${sagatY}`;
        p3.innerText = `sagatActionNum=${sagatActionNum}`;
        p4.innerText = `isSagatJump=${isSagatJump}`;
        p5.innerText = `sagatHP=${sagatHP}`
        p6.innerText = `sagatBreath=${sagatBreath}`
        p7.innerText = `actionCount =${actionCount}`;
        p8.innerText = `sagatActionNum =${sagatActionNum }`;
        p9.innerText = `sagatWorkCount=${sagatWorkCount}`;
        
    }
    //なんかこの書き方でエラーが出なくなった。
    let play =()=> setInterval(draw,25);
    play();
}
window.addEventListener('load', function(){
			
    // フルスクリーン表示
    document.getElementById('button1').addEventListener('click', function(){
        document.body.requestFullscreen();				
    });

    // フルスクリーン解除
    document.getElementById('button2').addEventListener('click', function(){
        document.exitFullscreen();
    });
});

//いろんな情報を加味して最終的にサガットを描画する関数
function drawSagat(){
    //サガット画像反転必要か判定して描画
    if(isSagatReversible){
        ctx.save();
        ctx.scale(-1,1);
        ctx.translate(-canvas.width, 0);
        sagatImg = sagatStatImg ;
        ctx.drawImage(sagatImg,0,0,185,185,canvas.width-sagatX-20-cameraX, sagatY, 185/1.5,185/1.5);
        ctx.restore();
        //画像反転テスト
    }else{
        sagatImg = sagatStatImg ;
        ctx.drawImage(sagatImg,0,0,185,185,sagatX-20+cameraX,sagatY, 185/1.5,185/1.5);
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

//サガットのアクション一覧を制御
//アクション一覧から各アクションメソッドに移行する
let sagatActionNum = 0;   //アクションの優先度によって上げ、他の操作を制御する
let actionCount = 0;    //アクションのモーションを制御する変数
function sagatAction(){
    //ジャンプ
    if(jPressed||sagatActionNum>99){
        sagatJump();
    }
    //しゃがみ
    if(downPressed||sagatActionNum==500){
        sagatSquat();
    }
    if(sagatActionNum==501){
        sagatSquatKick();
    }
    //サガットパンチ
    if(pPressed||sagatActionNum==2){
        sagatPunch();
    }
    //サガットキック
    if(kPressed||sagatActionNum==3){
        sagatKick();
    }
    //飛び膝蹴り
    if(kPressed||sagatActionNum==104){
        sagatJumpKnee();
    }
    sagatFall();//落下状態とか着地の判定
}


//サガットの落下着地移動判定
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
        if(sagatActionNum<100){
            sagatStatImg = sagat_jump1;
            sagatActionNum = 0;
        }else if(sagatActionNum>100&&sagatActionNum<200&&sagatY+30>sagatFieldY){
            //サガットが空中技中でも、地面が近ければ普通落下に戻す
            sagatStatImg = sagat_jump1;
            sagatActionNum = 0;
        }
        sagatFallNum++;
        sagatY = sagatY;
        sagatY += sagatFallNum;
        if(sagatFallNum>6&&sagatActionNum<100){
            sagatStatImg = sagat_jump2;
        }
    }else if(isSagatJump<=2 && sagatY-sagatFieldY>100){
        //落下中、地面が上にあっても、落ち続ける
        
        sagatStatImg = sagat_jump1;    
        sagatFallNum++;
        sagatY = sagatY;
        sagatY += sagatFallNum;
        if(sagatFallNum>6&&sagatActionNum<100){
            sagatStatImg = sagat_jump2;
        }
    }else if(isSagatJump<=2 && sagatY > sagatFieldY){
        //落下中、地面に接した瞬間、ジャンプモードを着地に戻す
        removeDete();//技の判定消す
        sagatStatImg = sagat_squat2;
        sagatY = sagatFieldY;
        sagatActionNum = 0;
        actionCount = 0;
        isSagatJump = 0;
        sagatFallNum = 0;
    }
    //壁との接触判定
    if(field[sagatX+1]+120<sagatY||field[sagatX-1]+120<sagatY){
        
        isSagatJump = 2;//落下状態に
    }else if(field[sagatX+1]-70<sagatY||field[sagatX-1]-70<sagatY){
        //次のフィールドの方が高ければ
        //壁が頭よりは低い
        sagatX = sagatFieldX;//進めない
    }
    
    
    //ダメージゾーン判定
    if(sagatMuteki>=1){
        sagatMuteki--;
        if(sagatMuteki%2==0){
            sagatStatImg = nullImage;
        }
    }else if(sagatActionNum==999){
        //すでにダメージモーションに入っている場合
        sagatDamageAction();
    }else{
        //ダメージ領域の判定
        GetSagatDamage();
    }
    //バグ回避
    if(isSagatJump==2&&sagatActionNum==0&&actionCount==0){
        if(sagatFieldY == sagatY){
            isSagatJump = 0;
        }
    }
}
//うまくいかなくなったら02に保存してある
//サガット無敵時間の変数
let sagatMuteki=0;

//サガットがダメージを受ける判定とかの関数
let sagatHP = 300;
let DamageZone = [];
//             [ 0 ,  1  ,   2  ,    3   ,   4  ,   5    ,    6      ]
//ダメージゾーン[名 , 始点X, 始点Y, 広さX, 下長さY, ダメージ, 与える無敵時間]]
function GetSagatDamage(){
    for(let i=0; i<DamageZone.length;i++){
        if(((sagatY<DamageZone[i][4]&&sagatY>DamageZone[i][2])||(sagatY+sagatHeight<DamageZone[i][4]&&sagatY+sagatHeight>DamageZone[i][2]))||(sagatY<DamageZone[i][2]&&DamageZone[i][2]<sagatY+sagatHeight)||((sagatY<DamageZone[i][4]&&DamageZone[i][4]<sagatY+sagatHeight))){
            //ダメージ範囲がサガットに入ってるか、サガットがダメージ範囲に入ってる
            if((sagatX>DamageZone[i][1]&&sagatX<DamageZone[i][3])||(sagatX+sagatWidth>DamageZone[i][1]&&sagatX+sagatWidth<DamageZone[i][3])){//サガットがダメージ範囲に入ってる
                //if(sagatX<DamageZone[i][1]&&sagatX+Height>DamageZone[i][1]){ いらないかもしれないのでちょっとコメントアウト   
                //ダメージ範囲に入った
                console.log(DamageZone[0]);
                sagatDamageAction(DamageZone[i][5],DamageZone[i][6]);
            }
        }
    }
}

//サガットのダメージを受けるアクション
let setMutekiTime = 0;
function sagatDamageAction(Damage, MutekiTime){
    console.log(actionCount);
    console.log(sagatActionNum);
    if(sagatActionNum!=999){
        //その他アクションの初期化
        actionCount = 0;
        sagatActionNum = 999;
        isSagatJump = 2;
    }
    //無敵状態でノックバックする
    if(actionCount==0){
        sagatStatImg = sagat_damage1;
        actionCount = 3;
        setMutekiTime = MutekiTime;
        sagatHP -= Damage;
    }else if(actionCount<6){
        sagatStatImg = sagat_damage1;
        sagatX -= 8*sr;
        sagatY -= 10;
        actionCount++;
    }else if(actionCount < 9){
        sagatStatImg = sagat_damage2;
        sagatX -= 6*sr;
        sagatY -= 10;
        actionCount++;
    }else if(actionCount < 15){
        sagatStatImg = sagat_damage2;
        sagatX -= 4*sr;
        actionCount++;
        sagatMuteki = setMutekiTime;
        setMutekiTime = 0;
        actionCount = 0;
        sagatActionNum = 0;
    }else{
        actionCount = 0;
        sagatActionNum = 0;
    }
    
}
/////////////////////////////////////////////////////////////////
//サガットのしゃがみアクション
let isSagatSquat = false;
function sagatSquat(){
    if(sagatActionNum>500||isSagatJump != 0){
        return;
    }
    if(downPressed && actionCount < 2 ){
        actionCount++;
        sagatActionNum = 500;
        sagatStatImg = sagat_squat2;
        isSagatSquat = true;
    }else if(downPressed && actionCount < 4){
        sagatActionNum = 500;
        sagatStatImg = sagat_squat1;
        isSagatSquat = true;
        if(kPressed){
            sagatSquatKick();
        }
        if(jPressed){
            sagatDown();
        }
    }
    if(!downPressed&&actionCount>=2){
        sagatActionNum = 500;
        actionCount = 50000;
        sagatStatImg = sagat_squat2;
        if(!downPressed&&actionCount>=49990){
            sagatActionNum = 0;
            actionCount = 0;
        }
    }
    
}
//サガット降りるアクション
function sagatDown(){
    if(sagatFieldY==parseInt(field[sagatFieldX]-105)){
        return;
    }
    sagatFieldY =  parseInt(field[sagatFieldX]-105);
    sagatY += 25;
    sagatActionNum = 0;
    actionCount = 0;
}

//サガットしゃがみキック
function sagatSquatKick(){
    if(sagatActionNum < 500&&actionCount<=49990){
        return;
    }
    sagatActionNum = 501;
    if(sagatActionNum==501&&actionCount==2){
        actionCount = 3;
        sagatStatImg = sagat_squat_kick01;
        actionCount++;
    }else if(sagatActionNum==501&&actionCount<8){
        sagatStatImg = sagat_squat_kick01;
        actionCount++;
    }else if(sagatActionNum==501&&actionCount<16){
        sagatStatImg = sagat_squat_kick02;
        actionCount++;
        for(let i=0; i<attDete.length ;i++){
            if(attDete[i]!=null){
                if(attDete[i][0]=="sagatSquatKick"){
                    attDete.splice(i, 1);//判定を削除
                    i -= 1;
                }
            }
        }
        actionCount++;
        attDete[attDete.length] = ["sagatSquatKick", sagatX+25*sr, sagatY+90, sagatX+60*sr, sagatY+100, 5, 2];
    }else if(sagatActionNum==501&&actionCount<22){
        for(let i=0; i<attDete.length ;i++){
            if(attDete[i]!=null){    
                if(attDete[i][0]=="sagatSquatKick"){
                    attDete.splice(i, 1);//判定を削除
                    i -= 1;
                }
            }
        }
        actionCount++;
        sagatStatImg = sagat_squat_kick01;
    }else{
        sagatActionNum = 500;
        actionCount = 2;
        sagatStatImg = sagat_squat1;
    }
}


//サガットのジャンプモーション
//派生用にアクションナンバーを高めに設定
let isSagatJump = 0;    //ジャンプ中なら1、落下なら2、着地なら0、着地硬直なら3
function sagatJump(){
    if((sagatActionNum>0&&sagatActionNum < 100)||isSagatJump == 2||sagatActionNum > 105){
        return;
    }
    if(sagatActionNum <= 100){
        sagatActionNum = 100;
    }
    
    if(sagatActionNum==100&&actionCount == 0){
        actionCount = 3;
        sagatStatImg = sagat_squat2;
        isSagatJump = 1;
    }else if(sagatActionNum==100&&actionCount < 5){
        sagatStatImg = sagat_squat2;
        actionCount++;
    }else if(sagatActionNum>=100&&actionCount < 10){
        if(actionCount==5){
            sagatY -= 20;
        }
        sagatY -= 12;
        sagatStatImg = sagat_jump2;
        actionCount++;
    }else if(sagatActionNum>=100&&actionCount < 14){
        sagatY -= 7;
        sagatStatImg = sagat_jump1;
        actionCount++;
    }else if(sagatActionNum>=100&&actionCount < 20){
        actionCount = 0;//終了
        sagatActionNum = 0;
        removeDete();//空中技の判定消す
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
    if(sagatActionNum==104){
        sagatJumpKnee();
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
            attDete[attDete.length] = ["sagatPunch", sagatX+22*sr, sagatY+15, sagatX+90*sr, sagatY+20, 9, 7];
        }
        actionCount ++;
        sagatStatImg = sagat_punch3;
    }else if(sagatActionNum==2&&actionCount < 16){
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
    }else if(sagatActionNum==2&&actionCount >= 16){
        actionCount = 0;
        pPressed = false;
        sagatActionNum = 0
    }
}

//サガットのキックアクションk 3
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
        attDete[attDete.length] = ["sagatKick", sagatX+25*sr, sagatY+10, sagatX+93*sr, sagatY+20, 13, 12];
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
    }else if(sagatActionNum==3&&actionCount<18){
        actionCount++;
        sagatStatImg = sagat_kick1;
    }else if(sagatActionNum==3&&actionCount<21){
        actionCount = 0;
        kPressed = false;
        sagatActionNum = 0
    }
}

//飛び膝蹴り104
function sagatJumpKnee(){
    if(sagatActionNum>0&&sagatActionNum < 100||sagatActionNum > 105||sagatY+60>sagatFieldY){
        return;
    }
    sagatActionNum = 104;
    sagatX+=2*sr;
    sagatStatImg = sagat_knee;
        attDete[attDete.length] = ["sagatJumpKee", sagatX+1*sr, sagatY+30, sagatX+10*sr, sagatY+70, 6, 6];
        for(let i=0; i<attDete.length-2 ;i++){
            if(attDete[i][0]=="sagatJumpKee"){
                attDete.splice(i, 1);//判定を削除
                i -= 1;
            }
        }
}

//判定消しの関数。sagatFall()の着地後に行われる。
//飛び道具以外は全て消したい
function removeDete(){
    for(let i=0; i<attDete.length ;i++){
        if(attDete[i][0]!=null){//いまのところ全部消す
            attDete.splice(i, 1);//判定を削除
            i -= 1;
        }
    }
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
                        ctx.drawImage(HIT2,0,0,100,100, cad[c][2]+cameraX, attDete[s][4], 30*sr, 30);
                    }else if(isSagatReversible&&attDete[s][3]<cad[c][0]){
                        ctx.drawImage(HIT2,0,0,100,100, cad[c][0]+cameraX, attDete[s][4], 30*sr, 30);
                    }else{
                        ctx.drawImage(HIT2,0,0,100,100, attDete[s][3]+cameraX, attDete[s][4], 30*sr, 30);
                    }
                        return attDete[s]; //リターン
                }
            }
        }
        
    }

}


//////////////////////////////////////////////////////////////////////////////////////
//フィールドに関する関数//
//フィールド画像
let fieldImg01 = new Image();
fieldImg01.src = "imgs/field275_90_01.jpg"
let fieldImg02 = new Image();
fieldImg02.src = "imgs/field03_276x90.png";
let test711 = new Image();
test711.src = "imgs/test711.png";
////////////////////////////////////////////////////////////////////////////////
let field = [];
let sagatFieldX = 0; //現在のサガットのX座標変数
let sagatFieldY = 0; //現在のサガットのY座標。sagatYに足す用の変数
let z = 0;
//地形作成
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
for(let x=canvas.width+500; x<canvas.width+550; x++){
    field[x] = [900-x*0.1];
}
for(let x=canvas.width+550; x<canvas.width+900; x++){
    field[x] = [400-x*0.1];
}
for(let x=canvas.width+900; x<canvas.width+1500; x++){
    field[x] = [450];
}
for(let x=canvas.width+1500; x<canvas.width+1500; x++){
    field[x] = [450];
}
for(let x=canvas.width+1500; x<canvas.width+2300; x++){
    field[x] = [380];
    z++;
}
z=0;
for(let x=canvas.width+2300; x<canvas.width+4640; x++){
    field[x] = [450];
}
//field[x]=フィールドXの座標。field[x][y]=フィールドXの標高。
let cameraX=0;
function fieldDraw(){
    
    //カメラ判定
    if(sagatX > canvas.width/2){
        //サガットXがもしもキャンバスの中央を超えるほど-1されていく
        cameraX = canvas.width/2 - sagatX;
    }
    
    
    sagatFieldX = parseInt(sagatX);
    sagatFieldY = parseInt(field[sagatFieldX]-105);//サガットがフィールドにいるとしたときの頭の高さ
    
    //オブジェクト配置
    if(sagatX>=1800&&sagatX<4000){
        fieldObjectDraw(test711,1,2500, 270, 2, false);
    }
    

    //最後にフィールド描画/////////
    for(let x=(0+cameraX*-1)/10; x<(canvas.width+cameraX*-1)/10+1; x++){
        ctx.drawImage(fieldImg01, ((x%200)*10)%200,0,10,90,(Math.floor(x)-(cameraX/10)*-1)*10,field[x*10],10,90);
    }
}

//character設定を簡単にする為、変数化して代入する。その変数宣言
let returnDete;
let charaWidth = 0;
let charaHeight= 0;
let charaX = 0;
let charaY = 0;
let charaImg;
let charBeAttDetes = [];
let charaSwich = true;//初期値が決まったらONにして、消えたらOFFに。。？
//配列化してfor文で複数処理しようかなという感じ
function characterDraw(){
    
    //キャラ配置を書いていく
    if(sagatX>=101&&sagatX<1000){//この範囲内ではモンスターがアクションする
        slimeEnemy(1,50, 500);
    }
    if(sagatX>1000&&sagatX<2600){
        slimeEnemy(3, 40, 1600);
    }
    if(sagatX>1200&&sagatX<4000){
        jeryEnemy(1 ,50, 1800,500,3000);
    }
    if(sagatX>1200&&sagatX<4000){
        giaEnemy(1 ,200, 2800, 100, 4000);
    }
    
}

/*
    //マップ描画最高画質版 ※スマホだと重い
    for(let x=0+cameraX*-1; x<canvas.width+cameraX*-1; x++){
        ctx.drawImage(fieldImg01, x%275,0,1,90,Math.floor(x)-cameraX*-1,field[x],1,90);
    }
*/

////フィールドオブジェの生成
//基本敵にキャラと同じような感じで操作できるようにしたい
//フィールドよりも低いフィールドオブジェクトは作ってはいけない(落下判定に干渉するため)
//引数(画像Img, 画面内での管理用番号,描画開始地点, 長さ(個数), 高さ, 衝突判定のtrueかfalse)
let fieldObject = [];
function fieldObjectDraw(img ,num, objX, objY, size, collision){
        for(let f=0; f<=num-1; f++){
            fieldObject[f] = {
                objImg : img,
                objectX: objX,
                objectY: objY,
                objSize: size,
                coll : collision
            };
            for(let s=0; s<fieldObject[f].objSize; s++){    
                ctx.drawImage(fieldObject[f].objImg,0,0,fieldObject[f].objImg.width, fieldObject[f].objImg.height, fieldObject[f].objectX+fieldObject[f].objImg.width*s+cameraX, fieldObject[f].objectY, fieldObject[f].objImg.width, fieldObject[f].objImg.height);
            }
            //フィールドオブジェクトの判定
            if(fieldObject[f].objectX<sagatX&&fieldObject[f].objectX+fieldObject[f].objImg.width*fieldObject[f].objSize>sagatX){
                if(sagatY+80<fieldObject[f].objectY){
                    //フィールドオブジェクトに乗っかる判定
                    sagatFieldY = fieldObject[f].objectY-105;
                    
                }
                if(sagatActionNum>100&&sagatActionNum<200&&sagatY+30>fieldObject[f].objectY&&sagatY+30<fieldObject[f].objectY){
                    //サガットが空中技中でも、フィールドオブジェクトが近ければ普通落下に戻す
                    sagatStatImg = sagat_jump1;
                    sagatActionNum = 0;
                    
                }
            }
            
        }
    }






////キャラクターオブジェクトの生成////////////////////////////////////////////////////////

//テスト用だが、スライムが指定数出てくる関数
//引数(登場数 ,HP, 登場座標X,)
//置換する箇所は「slime01[e]」と「"slime01"+e」で良さそう
let slime01 = [];
function slimeEnemy(num ,hp, chX){
    if(charaSwich){
        for(let e=0; e<=num-1; e++){
            //登場時の初期値
            slime01[e] = {
                charaImg : new Image(),
                charaImg : slimeImg,
                HP : hp,
                charaWidth : 230/2,
                charaHeight : 230/2,
                charaX : chX + e*230/2 + 15,//出現ポイント
                charaY : 0,//出現ポイント
                actionCount:90,
                reverse:1//反転するとマイナスにする用の変数
            };
        }
        
        charaSwich = false;
    }
    
    for(let e = 0; e<=slime01.length-1; e++){
        //多次元配列に複数格納して複数の当たり判定を作成することができる。
        //[[ 判定の横位置x , 判定の高さ位置y, 判定の長さ座標, 判定の高さ座標 ]]
        charBeAttDetes = [[slime01[e].charaX, slime01[e].charaY,slime01[e].charaX+(slime01[e].charaWidth),slime01[e].charaY+(slime01[e].charaHeight)]];
        
        //キャラを描画
        ctx.drawImage(slime01[e].charaImg,0,0,slime01[e].charaWidth*2, slime01[e].charaHeight*2, slime01[e].charaX+cameraX, slime01[e].charaY, slime01[e].charaWidth, slime01[e].charaHeight);
        returnDete = AttackDetection(charBeAttDetes);//当たり判定関数
        //キャラアクション関数
        //前回のフレームの判定を削除
        for(let i=0; i<DamageZone.length; i++){
            if(DamageZone[i][0]=="slime01"+e){
                DamageZone.splice(i, 1);
                i-=1;
            }
        }
        
        if(returnDete==null&&slime01[e].actionCount<90){
            //ノーマル状態のとき
            slime01[e].charaX -= 1*slime01[e].reverse;
            slime01[e].charaImg = slimeImg;
            slime01[e].actionCount--;
            //ダメージゾーン判定(キャラ画像の半分くらいが判定のとき)
            //             [ 0 ,  1  ,   2  ,    3   ,   4  ,   5    ,    6     ]
            //ダメージゾーン[名 , 始点X, 始点Y, 広さX, 下長さY, ダメージ, 与える無敵時間]
            DamageZone[DamageZone.length] = ["slime01"+e, slime01[e].charaX+slime01[e].charaWidth/4, slime01[e].charaY+slime01[e].charaHeight/2, slime01[e].charaX+slime01[e].charaWidth, slime01[e].charaY+slime01[e].charaHeight, 10, 50];
            
        }else{
            slime01[e].actionCount--;
        }
        if(returnDete!=null){//技食らったリアクション
            slime01[e].actionCount = 100;//アクションの長さ
            slime01[e].charaImg = slimeDamageImg;//グラの変更
            slime01[e].HP -= returnDete[5];//ダメージ
            console.log(slime01[e].HP);//デバッグ用
            //ノックバック
            if( field[slime01[e].charaX+Math.floor(slime01[e].charaWidth/2)] < field[slime01[e].charaX-Math.floor(slime01[e].charaWidth/2)*sr]-slime01[e].charaHeight/2){
                //後ろが壁だったらノックバックしない
                ;
                }else{
                    slime01[e].charaX += returnDete[6]*sr*2;
                }
            }
        if(slime01[e].HP<=1){
            //HPが0になったとき
            slime01[e].charaHeight -= 6;
            //死ぬ前に判定を消す
            for(let i=0; i< DamageZone.length; i++){
                if(DamageZone[i][0]=="slime01"+e){
                    DamageZone.splice(i, 1);
                    i -= 1;
                }
            }
        }
        
        //キャラが落下判定
        if(slime01[e].charaY+slime01[e].charaHeight < field[slime01[e].charaX+Math.floor(slime01[e].charaWidth/2)]){
            slime01[e].charaY += 12;
        }else if(slime01[e].charaY > field[slime01[e].charaX+Math.floor(slime01[e].charaWidth/2)]+slime01[e].charaHeight){
            slime01[e].charaY += 12;
        }
        //全部が落下したら配列を消す
        if(slime01[e].charaY > 700){
            let t=0;
            for(let i=0; i<num; i++){
                if(slime01[i]==undefined){
                    //エラー回避
                    slime01.splice(0, num);
                    charaSwich = true;
                }else if(slime01[i].charaY > 700){
                    t++;
                }
                if(t==num){
                    slime01.splice(0, num);
                    charaSwich = true;//無限ループで出すならtrue
                }
            }
        }
    }
}

//ジェリー制御//////////////////////////////////////////
let jerySwich=true;
let jery01 = [];
let charaSize=1;//キャラサイズを元画像の何倍にするかを設定する
//引数(キャラ数, HP, キャラ出現場所, 出現間隔, 追わないポイント)
function jeryEnemy(num ,hp, chX, gap, end){
    if(jerySwich){
        for(let e=0; e<=num-1; e++){
            //登場時の初期値
            charaSize = 1.6;//キャラサイズ。元画像の何倍か設定する。
            jery01[e] = {
                charaImg : new Image(),
                charaImg : jeryImg01,
                HP : hp,
                charaWidth : 30*charaSize,
                charaHeight : 30*charaSize,
                charaX : chX + e*gap*charaSize + 15,//出現ポイント
                charaY : 0,//出現ポイント
                actionCount:90-e*10,//アクションカウントを少しずらして動きをずらしてる
                reverse:1,//反転するとマイナスにする用の変数
                
            }
        }
        //キャラを登場させ終えたらスイッチをオフにする
        jerySwich = false;
    }
    
    for(let e = 0; e<=jery01.length-1; e++){
        //毎フレームごとの画像サイズ調整
        if(jery01[e].HP > 0){
            jery01[e].charaWidth = jery01[e].charaImg.width*charaSize;
            jery01[e].charaHeight = jery01[e].charaImg.height*charaSize;
        }
        //多次元配列に複数格納して複数の当たり判定を作成することができる。
        //攻撃食らい判定[[ 判定の横位置x , 判定の高さ位置y, 判定の長さ座標, 判定の高さ座標 ]]
        charBeAttDetes = [[jery01[e].charaX, jery01[e].charaY+jery01[e].charaHeight-(jery01[e].charaHeight*charaSize), jery01[e].charaX+(jery01[e].charaWidth),jery01[e].charaY+(jery01[e].charaHeight)]];
        
        
        returnDete = AttackDetection(charBeAttDetes);//当たり判定関数
        //キャラアクション関数
        //前回のフレームの判定を削除
        for(let i=0; i<DamageZone.length; i++){
            if(DamageZone[i][0]=="jery01"+e){
                DamageZone.splice(i, 1);
                i-=1;
            }
        }
        
        if(returnDete==null&&jery01[e].actionCount<=90){
            //ノーマル状態のとき
            if(sagatX>jery01[e].charaX&&isSagatJump==0){
                jery01[e].reverse = -1;
            }else if(sagatX<jery01[e].charaX){
                jery01[e].reverse = 1;
            }
            if(jery01[e].actionCount>20){
                jery01[e].charaX -= 2*jery01[e].reverse;//移動速度
            }
            //サガットが進み過ぎたらキャラは追わない
            if(sagatX >= end&&jery01[e].actionCount>20){
                jery01[e].actionCount = 20;
            }
            //移動アニメーション
            if(jery01[e].actionCount>75){
                jery01[e].charaImg = jeryWorkImg01;
            }else if(jery01[e].actionCount>50){
                jery01[e].charaImg = jeryWorkImg02;
            }else if(jery01[e].actionCount>35){
                jery01[e].charaImg = jeryWorkImg03;
            }else if(jery01[e].actionCount>21){
                jery01[e].actionCount = 90;
            }else if(jery01[e].actionCount < 20&& sagatY+sagatHeight >= jery01[e].charaY&&sagatX <= end){
                jery01[e].actionCount = 90;
            }else if(jery01[e].actionCount > 10){
                jery01[e].charaImg = jeryActionImg01;//グラの変更
            } else if(jery01[e].actionCount > 1){
                jery01[e].charaImg = jeryActionImg02;//グラの変更
            }else if(jery01[e].actionCount == 0){
                jery01[e].actionCount = 20;
            }
            jery01[e].actionCount--;
            //ダメージゾーン発生(キャラ画像の半分くらいが判定のとき)
            //             [ 0 ,  1  ,   2  ,    3   ,   4  ,   5    ,    6     ]
            //ダメージゾーン[名 , 始点X, 始点Y, 広さX, 下長さY, ダメージ, 与える無敵時間]
            DamageZone[DamageZone.length] = ["jery01"+e, jery01[e].charaX+jery01[e].charaWidth/4, jery01[e].charaY+jery01[e].charaHeight/2, jery01[e].charaX+jery01[e].charaWidth, jery01[e].charaY+jery01[e].charaHeight, 20, 30];
            
        }else{
            jery01[e].actionCount--;
        }
        if(returnDete!=null){//技食らったリアクション
            jery01[e].actionCount = 110;//アクションの長さ
            jery01[e].charaImg = jeryDamageImg;//グラの変更
            jery01[e].charaY -= 40;
            jery01[e].HP -= returnDete[5];//ダメージ
            console.log(jery01[e].HP);//デバッグ用
            //ノックバック
            if( field[jery01[e].charaX+Math.floor(jery01[e].charaWidth/2)] < field[jery01[e].charaX-Math.floor(jery01[e].charaWidth/2)*sr]-jery01[e].charaHeight/2){
                //後ろが壁だったらノックバックしない
                ;
                }else{
                    jery01[e].charaX += returnDete[6]*sr*2;//ノックバック
                }
            }
            
        if(jery01[e].HP<=1){
            //HPが0になったとき
            jery01[e].charaHeight -= 6;
            //死ぬ前に判定を消す
            for(let i=0; i< DamageZone.length; i++){
                if(DamageZone[i][0]=="jery01"+e){
                    DamageZone.splice(i, 1);
                    i -= 1;
                }
            }
        }
        
        //キャラが落下判定
        if(jery01[e].charaY+jery01[e].charaHeight+charaHeight/4 < field[jery01[e].charaX+Math.floor(jery01[e].charaWidth/2)]){
            jery01[e].charaY += 12;
        }else if(jery01[e].charaY > field[jery01[e].charaX+Math.floor(jery01[e].charaWidth/2)]+jery01[e].charaHeight){
            jery01[e].charaY += 12;
        }else{
            jery01[e].charaY = field[jery01[e].charaX+Math.floor(jery01[e].charaWidth/4)]-jery01[e].charaHeight;
        }
        //壁に突き当たった時のアクション
        if((jery01[e].reverse == 1 && jery01[e].charaY > field[jery01[e].charaX-Math.floor(jery01[e].charaWidth)])||(jery01[e].reverse == -1 && jery01[e].charaY > field[jery01[e].charaX+Math.floor(jery01[e].charaWidth)])){
            if(jery01[e].actionCount > 20){
                jery01[e].actionCount = 20;
            }
        }
        //サガットが高いフィールドにいるときのアクション
        if(jery01[e].charaX<sagatX&&jery01[e].charaX+jery01[e].charaImg.width>sagatX&& sagatY+sagatHeight<jery01[e].charaY && isSagatJump == 0){
            if(jery01[e].actionCount > 20){
                jery01[e].actionCount = 20;
            }
        }




        //全部が落下したら配列を消す
        if(jery01[e].charaY > 700){
            let t=0;
            for(let i=0; i<num; i++){
                if(jery01[i]==undefined){
                    //エラー回避
                    jery01.splice(0, num);
                    jerySwich = true;
                }else if(jery01[i].charaY > 700){
                    t++;
                }
                if(t==num){
                    jery01.splice(0, num);
                    jerySwich = true;//無限ループで出すならtrue
                }
            }
        }
        //キャラを描画
        if(jery01.length!=0){
            if(jery01[e].reverse == 1){
                ctx.drawImage(jery01[e].charaImg,0,0,jery01[e].charaWidth/charaSize, jery01[e].charaHeight/charaSize, jery01[e].charaX+cameraX, jery01[e].charaY, jery01[e].charaWidth, jery01[e].charaHeight);
            }else if(jery01[e].reverse== -1){
                ctx.save();
                ctx.scale(-1,1);
                ctx.translate(-canvas.width, 0);
                ctx.drawImage(jery01[e].charaImg,0,0,jery01[e].charaWidth/charaSize,jery01[e].charaHeight/charaSize, sagatX-jery01[e].charaX+canvas.width/2 - jery01[e].charaWidth/2 , jery01[e].charaY, jery01[e].charaWidth, jery01[e].charaHeight);
                ctx.restore();
            }
        }
    }
}



//ギア制御//////////////////////////////////////////
let giaSwich=true;
let gia = [];
//引数(キャラ数, HP, キャラ出現場所, 出現間隔, 追わないポイント)
function giaEnemy(num ,hp, chX, gap, end){
    if(giaSwich){
        for(let e=0; e<=num-1; e++){
            //登場時の初期値
            
            gia[e] = {
                charaImg : new Image(),
                charaImg : gia_work01,
                HP : hp,
                charaWidth : 80,//判定回りのみ
                charaHeight : 70,//判定回りのみ
                charaX : chX + e*gap + 15,//出現ポイント
                charaY : 0,//出現ポイント
                actionCount:90-e*10,//アクションカウントを少しずらして動きをずらしてる
                reverse:1,//反転するとマイナスにする用の変数
                charaSize : 1.5,//キャラサイズが元画像の何倍か設定する。判定回りは影響しない
                dead : 0,//死んだら加算していく(アニメーションに影響)
                attack : false
            }
        }
        //キャラを登場させ終えたらスイッチをオフにする
        giaSwich = false;
    }
    
    for(let e = 0; e<=gia.length-1; e++){
        //多次元配列に複数格納して複数の当たり判定を作成することができる。
        //攻撃食らい判定[[ 判定の横位置x , 判定の高さ位置y, 判定の長さ座標, 判定の高さ座標 ]]
        charBeAttDetes = [[gia[e].charaX+20, gia[e].charaY, gia[e].charaX+(gia[e].charaImg.width-20),gia[e].charaY+(gia[e].charaHeight)]];
        returnDete = AttackDetection(charBeAttDetes);//当たり判定関数

        //キャラアクション関数
        //前回のフレームの判定を削除
        for(let i=0; i<DamageZone.length; i++){
            if(DamageZone[i][0]=="gia"+e){
                DamageZone.splice(i, 1);
                i-=1;
            }
        }
        
        if(returnDete==null&&gia[e].actionCount<=90){
            //ノーマル状態のとき
            //91以上は攻撃食らいモーションなど
            //90～20は歩きモーション、20から-10は攻撃モーション
            
            if(gia[e].actionCount>20){
                gia[e].charaX -= 1*gia[e].reverse;//移動速度
            }
            //サガットが進み過ぎたらキャラは追わない
            if(sagatX >= end&&gia[e].actionCount>20){
                gia[e].actionCount = 95;
            }
            //移動アニメーション
            if(gia[e].actionCount>75){
                gia[e].charaImg = gia_work01;
            }else if(gia[e].actionCount>60){
                gia[e].charaImg = gia_work02;
            }else if(gia[e].actionCount>45){
                gia[e].charaImg = gia_work03;
            }else if(gia[e].actionCount>30){
                gia[e].charaImg = gia_work02;
            }else if(gia[e].actionCount>21){
                gia[e].actionCount = 90;
            }else if((gia[e].actionCount > 20&& sagatY+sagatHeight >= gia[e].charaY&&sagatX <= end)&&!gia[e].attack){
                //攻撃モーションでないとき
                gia[e].actionCount = 90;

            }else if(gia[e].actionCount > 10){
                //ここから攻撃モーション
                gia[e].charaImg = gia_attack01;//グラの変更
            } else if(gia[e].actionCount > 1){
                gia[e].charaImg = gia_attack03;//グラの変更
                if(gia[e].actionCount>6){
                    gia[e].charaX += -15*gia[e].reverse;//ちょっとだけ前に進む
                    gia[e].charaImg = gia_attack02;
                    if(gia[e].reverse==1){
                        DamageZone[DamageZone.length] = ["gia"+e, gia[e].charaX, gia[e].charaY+gia[e].charaHeight/2, gia[e].charaX+gia[e].charaWidth, gia[e].charaY+gia[e].charaHeight, 60, 30];
                    }else if(gia[e].reverse== -1){
                        DamageZone[DamageZone.length] = ["gia"+e, gia[e].charaX+gia[e].charaWidth/4, gia[e].charaY+gia[e].charaHeight/2, gia[e].charaX+gia[e].charaImg.width, gia[e].charaY+gia[e].charaHeight, 60, 30];
                    }
                }
            }else if(gia[e].actionCount == -10){
                gia[e].actionCount = 90;
                //攻撃モーションが終わったら通常モードに戻る
            }
            //サガットがいる方向に振り返りアクション
            if(sagatX>gia[e].charaX&&isSagatJump==0&&gia[e].actionCount>89){
                gia[e].reverse = -1;
                gia[e].actionCount = 89;
            }else if(sagatX<gia[e].charaX&&gia[e].actionCount>89){
                gia[e].reverse = 1;
                gia[e].actionCount = 89;
            }

            //サガットが近いと殴ってくる
            if(gia[e].charaY<sagatY+sagatHeight&&(gia[e].reverse == 1 && gia[e].charaX - sagatX+sagatWidth < 120)||gia[e].charaY<sagatY+sagatHeight&&(gia[e].reverse == -1 && sagatX - gia[e].charaX  < 120) ){
                if(gia[e].actionCount > 20){
                    gia[e].charaX -= 2*gia[e].reverse;//移動速度
                    if(gia[e].actionCount > 20){
                        gia[e].attack = true;
                        gia[e].actionCount = 20;
                    }
                }
            }else if(gia[e].actionCount>21){
                gia[e].attack = false;
            }

            gia[e].actionCount--;

            //ダメージゾーン発生(キャラ画像の半分くらいが判定のとき)
            //             [ 0 ,  1  ,   2  ,    3   ,   4  ,   5    ,    6     ]
            //ダメージゾーン[名 , 始点X, 始点Y, 広さX, 下長さY, ダメージ, 与える無敵時間]
            DamageZone[DamageZone.length] = ["gia"+e, gia[e].charaX+gia[e].charaWidth/4, gia[e].charaY+gia[e].charaHeight/2, gia[e].charaX+gia[e].charaWidth, gia[e].charaY+gia[e].charaHeight, 20, 30];
            
        }else{
            //アクションカウントが91以上のとき
            gia[e].actionCount--;
        }

        //技食らったリアクション
        if(returnDete!=null){
            gia[e].actionCount = 95;//アクションの長さ
            gia[e].charaImg = gia_damage;//グラの変更
            gia[e].charaY -= 10;
            gia[e].HP -= returnDete[5];//ダメージ
            console.log(gia[e].HP);//デバッグ用
            //ノックバック
            if( field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)] < field[gia[e].charaX-Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)*sr]-(gia[e].charaImg.height*gia[e].charaSize)/2){
                //後ろが壁だったらノックバックしない
                ;
                }else{
                    gia[e].charaX += returnDete[6]*sr*1;//ノックバック
                }
            }
            
        if(gia[e].HP<=1){
            //HPが0になったとき
            gia[e].dead -= 3;
            gia[e].actionCount = 95;//アクションの長さ
            gia[e].charaImg = gia_damage;//グラの変更
            //死ぬ前に判定を消す
            for(let i=0; i< DamageZone.length; i++){
                if(DamageZone[i][0]=="gia"+e){
                    DamageZone.splice(i, 1);
                    i -= 1;
                }
                if( gia[e]!=null&&gia[e].dead <= -60){
                    gia.splice(i, 1);
                    giaSwich = true;
                }
            }
        }
        if(gia[e]==null){//giaが存在しなかったらこの時点で抜ける
            return;
        }
        //(gia[e].charaImg.width*gia[e].charaSize)
        

        //キャラが落下判定
        if((gia[e].charaY+gia[e].charaImg.height*gia[e].charaSize)-(field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]) > -30){
            //下が地面なら地面の位置に立つ
            gia[e].charaY = field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]-(gia[e].charaImg.height*gia[e].charaSize);
        }
        else if(gia[e].reverse==1&&gia[e].charaY+(gia[e].charaImg.height*gia[e].charaSize)+(gia[e].charaImg.height*gia[e].charaSize)/4 < field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]){
            gia[e].charaY += 12;
        }else if(gia[e].reverse==-1&&gia[e].charaY+(gia[e].charaImg.height*gia[e].charaSize)+(gia[e].charaImg.height*gia[e].charaSize)/4 < field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/4)]){
            
            gia[e].charaY += 12;
        }else if(gia[e].charaY > field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]+(gia[e].charaImg.height*gia[e].charaSize)){
            gia[e].charaY += 12;
        }
        
        //壁が高い場合(左向き用)
        if((gia[e].reverse==1&&field[gia[e].charaX-10] - gia[e].charaImg.height/2 < gia[e].charaY)){
            gia[e].charaY = field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]-(gia[e].charaImg.height*gia[e].charaSize);
            gia[e].charaX++;
            if(gia[e].actionCount > 75){
                gia[e].actionCount = 75;
            }else if(gia[e].actionCount<10&&gia[e].actionCount>6){
                gia[e].charaX += +14*gia[e].reverse;
            }
        }
        //壁が高い場合(右向き用)
        if((gia[e].reverse==-1&&field[gia[e].charaX+Math.floor(gia[e].charaImg.width*gia[e].charaSize)] - gia[e].charaImg.height/2 < gia[e].charaY)){
            gia[e].charaY = field[gia[e].charaX]-(gia[e].charaImg.height*gia[e].charaSize);
            gia[e].charaX--;
            if(gia[e].actionCount > 75){
                gia[e].actionCount = 75;
            }else if(gia[e].actionCount<10&&gia[e].actionCount>6){
                gia[e].charaX += +14*gia[e].reverse;
            }
        }
    

        //フィールドオブジェクトでのY座標判定
        if(fieldObject.length!=0){
            for(let f=0; f<=fieldObject.length-1; f++){
                if(fieldObject[f].objectX<gia[e].charaX+gia[e].charaImg.width/2&&fieldObject[f].objectX+fieldObject[f].objImg.width*fieldObject[f].objSize>gia[e].charaX){
                    if(gia[e].charaY+gia[e].charaImg.height*gia[e].charaSize/2<fieldObject[f].objectY){
                        //フィールドオブジェクトに乗っかる判定
                        gia[e].charaY = fieldObject[f].objectY-gia[e].charaImg.height*gia[e].charaSize;
                        
                    }
                }
            }
        }

        //全部が落下したら配列を消す
        if(gia[e].charaY > 700){
            let t=0;
            for(let i=0; i<num; i++){
                if(gia[i]==undefined){
                    //エラー回避
                    gia.splice(0, num);
                    giaSwich = true;
                }else if(gia[i].charaY > 700){
                    t++;
                }
                if(t==num){
                    gia.splice(0, num);
                    giaSwich = true;//無限ループで出すならtrue
                }
            }
        }
        //キャラを描画
        if(gia.length!=0){
            if(gia[e].reverse == 1){
                ctx.drawImage(gia[e].charaImg,0, gia[e].dead , gia[e].charaImg.width, gia[e].charaImg.height, gia[e].charaX+cameraX, gia[e].charaY, (gia[e].charaImg.width*gia[e].charaSize), (gia[e].charaImg.height*gia[e].charaSize));
            }else if(gia[e].reverse== -1){
                ctx.save();
                ctx.scale(-1,1);
                ctx.translate(-canvas.width, 0);
                ctx.drawImage(gia[e].charaImg,0, gia[e].dead ,gia[e].charaImg.width,gia[e].charaImg.height, sagatX-gia[e].charaX+canvas.width/2 - (gia[e].charaImg.width*gia[e].charaSize)/2 , gia[e].charaY, (gia[e].charaImg.width*gia[e].charaSize), (gia[e].charaImg.height*gia[e].charaSize));
                ctx.restore();
            }
        }
    }
}


//キャライメージまとめ////////////////////////////////////////////////

let slimeImg = new Image();
slimeImg.src = "imgs/slimeG235x260.png";
let slimeDamageImg = new Image();
slimeDamageImg.src = "imgs/slimeDamage.png"
//ジェリー/////////////////////////////////
let jeryImg01 = new Image();
jeryImg01.src = "imgs/jery01.png";
let jeryImg02 = new Image();
jeryImg02.src = "imgs/jery02.png"
let jeryImg03 = new Image();
jeryImg03.src = "imgs/jery03.png"
let jeryWorkImg01 = new Image();
jeryWorkImg01.src = "imgs/jeryWork01.png";
let jeryWorkImg02 = new Image();
jeryWorkImg02.src = "imgs/jeryWork02.png";
let jeryWorkImg03 = new Image();
jeryWorkImg03.src = "imgs/jeryWork03.png";
let jerykickImg01 = new Image();
jerykickImg01.src = "imgs/jery_kick01.png";
let jerykickImg02 = new Image();
jerykickImg02.src = "imgs/jery_kick02.png";
let jerykickImg03 = new Image();
jerykickImg03.src = "imgs/jery_kick03.png";
let jeryDamageImg = new Image();
jeryDamageImg.src = "imgs/jeryDamage.png";
let jeryActionImg01 = new Image();
jeryActionImg01.src = "imgs/jery_action01.png";
let jeryActionImg02 = new Image();
jeryActionImg02.src = "imgs/jery_action02.png";
//ギア/////////////////////////////////
let gia_work01 = new Image();
gia_work01.src = "imgs/gia_work01.png";
let gia_work02 = new Image();
gia_work02.src = "imgs/gia_work02.png";
let gia_work03 = new Image();
gia_work03.src = "imgs/gia_work03.png";
let gia_damage = new Image();
gia_damage.src = "imgs/gia_damage.png";
let gia_attack01 = new Image();
gia_attack01.src = "imgs/gia_attack01.png";
let gia_attack02 = new Image();
gia_attack02.src = "imgs/gia_attack02.png";
let gia_attack03 = new Image();
gia_attack03.src = "imgs/gia_attack03.png";
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
        asobi = 50;//フリックの遊び
        if(FstartX+asobi < FmoveX){
            //右ボタン
            rightPressed = true;
        } else if(FstartX > FmoveX+asobi){
            //左ボタン
            leftPressed = true;
        }
        //上下移動
        if(FstartY+asobi < FmoveY){
            //下ボタン
            downPressed = true;
        }else if(FstartY > FmoveY+asobi){
            //上ボタン
            jPressed = true;
        }
    });
    
    // 画面から指が離れたときの処理を定義
    canvas.addEventListener("touchend", function(e) {
        e.preventDefault();// スクロール無効化 
        rightPressed = false;
        leftPressed = false;
        downPressed = false;
        jPressed = false;
    });
