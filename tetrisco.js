/*
・ブロックを定義する多次元配列
・フィールド、壁
・キーボード入力を受け付ける機能
～構想～
場所を定義したフィールド配列の中の値によって、
ブロックの有無を定義する。
ブロックが既に置かれたものか、操作可能なものかどうかを判定する値

基本は縦20行×横10列
*/
let fieldTag = document.querySelector('#gameField');
let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');
let p3 = document.querySelector('#p3');
let p4 = document.querySelector('#p4');
let push =document.querySelector('#push');
let btnLeft =document.querySelector('#left');
let btnRight =document.querySelector('#right');
let btnMino =document.querySelector('#mino');
let btnDown =document.querySelector('#down');
let inputWidth = document.querySelector('#inputWidth');
let inputHeight = document.querySelector('#inputHeight');

let field;
let fieldWidth  = 10;
let fieldHeight = 20;
let score = 0;
let hightScore = 0;
let combo = 1;
let speed = 500;

//タイマー、速度調節
let count = 0;
let time = 0;
const countUp = () => {
    console.log(count++);
    time ++;
    if(count==10){
        count = 0;
        speed -= 10;
        gameStop();
    }
    p4.innerText =`TIME ${time}秒`;
    }
    

p3.innerText = `SCORE ${score}点`;
//field[横軸x][縦軸y]
field = new Array(fieldHeight+2);
for(let y=0; y<field.length; y++){
    field[y] = new Array(fieldWidth+2);
}
//フィールドを作成。壁は99、それ以外は0
for(let y=0; y<fieldHeight+2; y++){
    for(let x=0; x<fieldWidth+2; x++){
        if(x==0||y==0||x==fieldWidth+1||y==fieldHeight+1){
            field[y][x] = 99;
        }else{
            field[y][x] = 0;
        }
    }
}

//フィールドを表示させる関数
let gameWindow = ()=>{
    let fieldText = "";
    let newText ="";
    for(let y=0; y<fieldHeight+2; y++){
        for(let x=0; x<fieldWidth+2; x++){
            newText = "";
            if(field[y][x]==0){
                newText = `<a id='html${y}-${x}'>　</a>`;
            }else if(field[y][x]==99){
                newText = `<a id='html${y}-${x}'>□</a>`;
            }else if(field[y][x]==1 || field[y][x]==2){
                newText = `<a id='html${y}-${x}'>■</a>`;
            }
            if(x==fieldWidth+1)
            {
                newText = newText + `<br>`;
            }
            fieldText = fieldText + newText;
        }
    }
    fieldTag.innerHTML = fieldText;
}

let play;
widpoint = Math.floor(fieldWidth/2);
heipoint = 1;
let boxNum = Math.floor(Math.random()*43)%7;
let boxStyle = 1;
let boxChg = true;

let scorePut = ()=>{
    p3.innerText = `SCORE ${score}点`;
}

randomNum =()=>{
    return Math.floor(Math.random()*43)%7;
}
//ゲームを進行するための関数
play = ()=>{
    
    for(let y=1; y<=fieldHeight; y++){
        for(let x=1; x<=fieldWidth; x++){
            if((field[y][x]==1&&(field[y+1][x]==2||y==fieldHeight))){
                for(let y=1; y<=fieldHeight; y++){
                    for(let x=1; x<=fieldWidth; x++){
                        if(field[y][x] == 1){
                            field[y][x] = 2;
                        }
                    }
                }
                minoLine();
                boxChg = true;
                if(boxChg){
                    boxNum = randomNum();
                    boxStyle = 1;
                    boxChg = false;
                }
                if(field[2][Math.floor(fieldWidth/2)]==2){
                    GAMEOVER();
                }
                //mino();
                widpoint = Math.floor(fieldWidth/2);
                heipoint = 1;
                score += 10;
                scorePut();
            }
        }
    }    
    for(let y=1; y<=heipoint+2; y++){
        for(let x=1; x<=fieldWidth; x++){
            if(field[y][x] == 1){
                field[y][x] = 0;
            }
        }
    }
    heipoint++;
    mino(boxNum,boxStyle);
    field[heipoint][widpoint] = 1;
    gameWindow();
};

let leftMoveNG  = false;
let rightMoveNG = false;
//ミノを作成、制御する関数
let mino =(boxNum,boxStyle)=>{
    /*n = 0;
    if(field[heipoint+1][widpoint]==99||field[heipoint+1][widpoint]==2){
        n = 1;
    }*/
    if(boxNum==0&&boxStyle==1){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;

        /*  1 1
            w 1*/ 
    }

    if(boxNum==1&&(boxStyle==1||boxStyle==3)){
        if(field[heipoint-1][widpoint]>1||field[heipoint+1][widpoint]>1||field[heipoint-2][widpoint]>1){
            boxStyle=2;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        field[heipoint-2][widpoint] = 1 ;//+n;
        }
        /*    1
        //    1
            4 w 4 4
              1 */
    }

    if(boxNum==1&&(boxStyle==2||boxStyle==4)){
        if(field[heipoint][widpoint-1]>1||field[heipoint][widpoint+1]>1||field[heipoint][widpoint+2]>1){
                boxStyle--;
                mino(boxNum,boxStyle);
        }else{
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint+2] = 1 ;//+n;
        }
        /*    4
        //    4
            1 w 1 1
              4 */
    }

    if(boxNum==2&&boxStyle==1){
        if(field[heipoint-1][widpoint] >1||field[heipoint][widpoint+1]>1|| field[heipoint][widpoint-1]>1 ){
            
            if(boxStyle==1){
                boxStyle=4;
                
            }else{
                boxStyle--;
            }
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint-1] = 1 ;//+n;
        }
        /*    1
            1 w 1 
              4  */
    }

    if(boxNum==2&&boxStyle==2){
        if(field[heipoint-1][widpoint]>1||field[heipoint][widpoint+1]>1||field[heipoint+1][widpoint]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        }
        /*4 1 4
            w 1
            1   */  
    }

    if(boxNum==2&&boxStyle==3){
        if(field[heipoint-1][widpoint-1]>1||field[heipoint-1][widpoint+1]>1||field[heipoint-1][widpoint]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        }
    /*  1 1 1
        4 w  */  
    }//   4

    if(boxNum==2&&boxStyle==4){
        if(field[heipoint-1][widpoint]>1||field[heipoint][widpoint-1]>1||field[heipoint+1][widpoint]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        }
    /*    1
        1 w 4
          1   */    
    }

    if(boxNum==3&&(boxStyle==1||boxStyle==3)){
        if(field[heipoint-1][widpoint]>1||field[heipoint-1][widpoint-1]>1||field[heipoint][widpoint+1]>1){
            if(boxStyle==1){
                boxStyle=4;
            }else{
                boxStyle--;
            }
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        }
    /*    1 1 4
            w 1*/
        //  4
        }

    if(boxNum==3&&(boxStyle==2||boxStyle==4)){
        if(field[heipoint-1][widpoint+1]>1||field[heipoint][widpoint+1]>1||field[heipoint+1][widpoint]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        }
    /*    4 4 1
            w 1
            1    */
    }

    if(boxNum==4&&(boxStyle==1||boxStyle==3)){
        if(field[heipoint][widpoint-1]>1||field[heipoint-1][widpoint]>1||field[heipoint-1][widpoint+1]>1){
            if(boxStyle==1){
                boxStyle=4;
            }else{
                boxStyle--;
            }
            mino(boxNum,boxStyle);
        }else{
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        }
        /*    1 1
            1 w 4
                4 */
    }

    if(boxNum==4&&(boxStyle==2||boxStyle==4)){
        if(field[heipoint-1][widpoint]>1||field[heipoint][widpoint+1]>1||field[heipoint+1][widpoint+1]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint+1][widpoint+1] = 1 ;//+n;
        }
        /*    1 4
    //      4 w 1
                1     */
    }

    if(boxNum==5&&boxStyle==1){
        if(field[heipoint][widpoint-1]>1||field[heipoint][widpoint+1]>1||field[heipoint-1][widpoint+1]>1){
            boxStyle=4;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        }
        /*    4 1
            1 w 1    */
        //    4 4
    }

    if(boxNum==5&&boxStyle==2){
        if(field[heipoint-1][widpoint]>1||field[heipoint+1][widpoint]>1||field[heipoint+1][widpoint+1]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint+1] = 1 ;//+n;
        }
/*      1 4 4
        w    
        1 1  */
    }

    if(boxNum==5&&boxStyle==3){
        if(field[heipoint-1][widpoint]>1||field[heipoint-1][widpoint+1]>1||field[heipoint-1][widpoint+2]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint+2] = 1 ;//+n;
        }
/*    4 1 1 1
        w       */
    //  4
    }

    if(boxNum==5&&boxStyle==4){
        if(field[heipoint-1][widpoint-1]>1||field[heipoint-1][widpoint]>1||field[heipoint+1][widpoint]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        }
/*    1 1 4
//    4 w 4
        1       */
    }

    if(boxNum==6&&boxStyle==1){
        if(field[heipoint-1][widpoint-1]>1||field[heipoint][widpoint+1]>1||field[heipoint][widpoint-1]>1){
            boxStyle=4;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint-1] = 1 ;//+n;
        }
    /*    1 4 4
          1 w 1  */
        //  4
    }

    if(boxNum==6&&boxStyle==2){
        if(field[heipoint-1][widpoint+1]>1||field[heipoint-1][widpoint]>1||field[heipoint+1][widpoint]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        }
    /*  4 4 1 1  
            w
            1    */
    }

    if(boxNum==6&&boxStyle==3){
        if(field[heipoint-1][widpoint-1]>1||field[heipoint-1][widpoint]>1||field[heipoint-1][widpoint-2]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint-2] = 1 ;//+n;
        }
    /*  1 1 1  
            w   
          4 4        */
    }

    if(boxNum==6&&boxStyle==4){
        if(field[heipoint-1][widpoint]>1||field[heipoint+1][widpoint]>1||field[heipoint+1][widpoint-1]>1){
            boxStyle--;
            mino(boxNum,boxStyle);
        }else{
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint-1] = 1 ;//+n;
        }
    /*    4 1  
    //    4 w 4
          1 1    */
    }
};


//移動を制御する関数
let NG = false;
let moveLeft = ()=>{
    
    for(let y=1; y<=fieldHeight; y++){
        for(let x=1; x<=fieldWidth; x++){
            if(field[y][x]==1&&(field[y][x-1]==2||field[y][x-1]==99)){
                NG = true;
            }
        }
    }
    if(!NG){
        for(let y=1; y<=heipoint+2; y++){
            for(let x=1; x<=fieldWidth+2; x++){
                if(field[y][x] == 1){
                    field[y][x] = 0;
                }
            }
        }
        field[heipoint][widpoint-1]=1;
        widpoint--;
        mino(boxNum,boxStyle);
        gameWindow();
        
    }
    NG = false;
}

let moveRight = ()=>{
    for(let y=1; y<=fieldHeight; y++){
        for(let x=1; x<=fieldWidth; x++){
            if(field[y][x]==1&&(field[y][x+1]==2||field[y][x+1]==99)){
                NG = true;
            }
        }
    }
    //NGじゃなかった時の処理
    if(!NG){
        for(let y=1; y<=fieldHeight; y++){
            for(let x=1; x<=fieldWidth; x++){
                if(field[y][x] == 1){
                    field[y][x] = 0;
                }
            }
        }
        field[heipoint][widpoint+1]=1;
        widpoint++;
        mino(boxNum,boxStyle);
        gameWindow();
    }
    NG = false;
}



let minoRoll = ()=>{
    if(boxNum==0||boxStyle==4){
        boxStyle = 1;
    }else{
        boxStyle++;
    }
    //左壁付近のブロックごとの移動処理
    if(widpoint<=3&&(boxNum==6&&boxStyle==3)){
        widpoint = 3;
    } else if(widpoint<=2&&(boxNum!=0)){
        widpoint=2;
    }

    //右壁付近のブロックごとの移動処理
    if(widpoint>=fieldWidth-2&&((boxNum==5&&boxStyle==3)||boxNum==1&&(boxStyle==2||boxStyle==4))){
        widpoint=fieldWidth-2;
    }

    if(widpoint>=fieldWidth&&boxNum!=0){
        widpoint--;
    }
    /*
    if(boxNum==0||boxStyle==4){
        boxStyle = 1;
    }else{
        boxStyle++;
    }
    */
    //ミノスタイル別の条件のあとの処理

    for(let y=1; y<=fieldHeight; y++){
        for(let x=1; x<=fieldWidth; x++){
            if(field[y][x] == 1){
                field[y][x] = 0;
            }
        }
    }

    field[heipoint][widpoint]=1;
    mino(boxNum,boxStyle);
    gameWindow();
}

let gameON = false;
//ブロックを置いたときに一列が揃ってるかどうかの判定
let minoLine = ()=>{
    combo = 1;
    for(let y=1; y<=fieldHeight; y++){
        for(let x=1; 1<=fieldWidth; x++){
            if(field[y][x]!=2){
                break;
            }else if(field[y][x]==2){
                if(x==fieldWidth){
                    //揃ってると下記処理を行う
                    //for(let i=1; i<=fieldWidth; i++){
                        //field[y][i] = 0;
                        gameWindow();
                        minoDown(y);
                        combo++;
                    //}
                }
            }
        }
    }
    
    //gameON = true;
};
//消えたラインから上のミノを下げる関数
let minoDown=(num)=>{
    for(let y=num; y>1; y--){
        
        for(let x=1; x<=fieldWidth; x++){
            field[y][x] = 0;
            score += 20*combo;
            field[y][x] = field[y-1][x];
        }
    }
    scorePut();
}


//キーボード操作を制御する関数
document.addEventListener('keypress', keypress_ivent);
function keypress_ivent(e) {
	//いずれかのキーが押されている時の処理
	if(e.key === 'a' || e.key === 'A' || e.code === "ArrowLeft"){
        //左キー(A)が押されてるときの操作
        moveLeft();
    }
    
    if(e.key === 'd'|| e.key === 'D' || e.code === "ArrowRight"){
        //右キー(D)が押されてるときの操作
		moveRight();
	}

    if(e.key === 'S'|| e.key === 's' ){
        play();
    }

    if(e.key === 'w'|| e.key === 'W' || e.key === 'Space'){
		// キー(W)が押された時の処理
        minoRoll();
    }
    
};


btnLeft.addEventListener('click',()=>{
    moveLeft();
});
btnRight.addEventListener('click',()=>{
    moveRight();
});
btnDown.addEventListener('click',()=>{
    play();
});
btnMino.addEventListener('click',()=>{
    minoRoll();
});

//開始終了行程の関数
let gamePlay;
let gamewind;
let startCount;
//ゲームスタートするためのボタン
push.addEventListener('click',()=>{
    gameON = gameON == false ? true : false ;
    //fieldWidth  = Math.floor(inputWidth.value);
    //fieldHeight = Math.floor(inputHeight.value);
    if(gameON){
        gamePlay = setInterval(play,speed);
        gamewind = setInterval(gameWindow,speed);
        startCount = setInterval(countUp, 1000);
    }
});
//ゲーム速度を制御するための関数
let gameStop =()=>{
    clearInterval(gamePlay);
    clearInterval(gamewind);
    gamePlay = setInterval(play,speed);
    gamewind = setInterval(gameWindow,speed);
}
//スコア更新やゲームオーバーを制御する関数
let GAMEOVER =()=>{
    clearInterval(gamePlay);
    clearInterval(gamewind);
    clearInterval(startCount);
    p2.innerText = "GAME_OVER"
    if(socore>hightScore){
        p1.innerText = `ハイスコア${hightScore}点`;
    }
};

/*
for(let y=heipoint-2; y<=heipoint+1;y++){
    for(let x=widpoint-3; x<=widpoint+3; x++){
        if((field[y][x]==1)&&(field[y+1][x]==99||field[y+1][x]==2)){
            
        }
    }
    
}

*/