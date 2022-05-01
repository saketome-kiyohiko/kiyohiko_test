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
let push =document.querySelector('#push');

let field;
let fieldWidth  = 10;
let fieldHeight = 20;

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
widpoint = fieldWidth/2;
heipoint = 1;
let boxNum = Math.floor(Math.random()*43)%7;
let boxStyle = 1;
let boxChg = true;

randomNum =()=>{
    return Math.floor(Math.random()*43)%7;
}
//ゲームを進行するための関数
play = ()=>{
    /*
    for(let y=1; y<=fieldHeight; y++){
        for(let x=1; x<=fieldWidth; x++){
            if((field[y][x]==1&&field[y+1][x]==2)||(((boxNum==1&&(boxStyle==2||boxStyle==4))&&heipoint==20)||(boxNum!=1&&(boxStyle==1||boxStyle==3))&&heipoint==20)||((((boxNum==1)&&(boxStyle==1||boxStyle==3))||(boxNum!=1&&(boxStyle==2||boxStyle==4)))&&heipoint==19)){
                field[heipoint][widpoint] = 2;
                for(let y=1; y<=fieldHeight; y++){
                    for(let x=1; x<=fieldWidth; x++){
                        if(field[y][x] == 1){
                            field[y][x] = 2;
                        }
                    }
                }
                */
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
                //mino();
                widpoint = fieldWidth/2;
                heipoint = 1;
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
        /* 1 1
        　 w 1　　*/ 
    }

    if(boxNum==1&&(boxStyle==1||boxStyle==3)){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        field[heipoint-2][widpoint] = 1 ;//+n;
        /*  1
            1
            w 
            1 */
    }

    if(boxNum==1&&(boxStyle==2||boxStyle==4)){
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint+2] = 1 ;//+n;
        /* 1 w 1 1 */
    }

    if(boxNum==2&&boxStyle==1){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint-1] = 1 ;//+n;
        /*  1
          1 w 1 */
    }

    if(boxNum==2&&boxStyle==2){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
    /*  1
        w 1
        1   */  
    }

    if(boxNum==2&&boxStyle==3){
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
    /* 1 1 1
         w  */  
    }

    if(boxNum==2&&boxStyle==4){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
    /*    1
        1 w
          1   */    
    }

    if(boxNum==3&&(boxStyle==1||boxStyle==3)){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
    /*    1 1
            w 1*/
    }

    if(boxNum==3&&(boxStyle==2||boxStyle==4)){
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
    /*        1
            w 1
            1    */
    }

    if(boxNum==4&&(boxStyle==1||boxStyle==3)){
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        /*    1 1
            1 w 
                 */
    }

    if(boxNum==4&&(boxStyle==2||boxStyle==4)){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint+1][widpoint+1] = 1 ;//+n;
        /*  1
            w 1
              1     */
    }

    if(boxNum==5&&boxStyle==1){
        field[heipoint][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        /*      1
            1 w 1    */
    }

    if(boxNum==5&&boxStyle==2){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint+1] = 1 ;//+n;
/*      1
        w    
        1 1  */
    }

    if(boxNum==5&&boxStyle==3){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint+2] = 1 ;//+n;
/*      1 1 1
        w       */
    }

    if(boxNum==5&&boxStyle==4){
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
/*    1 1
        w
        1       */
    }

    if(boxNum==6&&boxStyle==1){
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint][widpoint+1] = 1 ;//+n;
        field[heipoint][widpoint-1] = 1 ;//+n;
    /*    1  
          1 w 1  */
    }

    if(boxNum==6&&boxStyle==2){
        field[heipoint-1][widpoint+1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
    /*  1 1  
        w
        1    */
    }

    if(boxNum==6&&boxStyle==3){
        field[heipoint-1][widpoint-1] = 1 ;//+n;
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint-1][widpoint-2] = 1 ;//+n;
    /*  1 1 1  
            w   */
    }

    if(boxNum==6&&boxStyle==4){
        field[heipoint-1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint] = 1 ;//+n;
        field[heipoint+1][widpoint-1] = 1 ;//+n;
    /*      1  
            w
          1 1    */
    }
};

let NG = false;

//操作を制御する関数
document.addEventListener('keypress', keypress_ivent);
function keypress_ivent(e) {
	//いずれかのキーが押されている時の処理
	if(e.key === 'a' || e.key === 'A' || e.code === "ArrowLeft"){
		//左キーが押された時の処理
        /*
        if((boxNum==6&&boxStyle==2)||boxNum==5&&boxStyle==3||boxNum==5&&boxStyle==2||boxNum==0||(boxNum==2&&boxStyle==2)||(boxNum==4&&(boxStyle==2||boxStyle==4))||boxNum==3&&(boxStyle==2||boxStyle==4)||boxNum==1&&(boxStyle==1||boxStyle==3)){
            n = 1;//左壁に貼り付けるブロック
        }else if(boxNum==6&&boxStyle==3){
            n = -1;
        }else{
            n=0;//左壁から1マス遠いブロック
        }
        if(widpoint<=2-n||field[heipoint][widpoint-2-n]==2){
            NG = true;
        }
        if(((boxNum==1&&(boxStyle==1||boxStyle==3))||(boxNum!=1&&(boxStyle==2||boxStyle==4)))&&field[heipoint+1][widpoint-1]==2){
            NG = true;
        }
        //NGじゃなかった時の処理
        */
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

    if(e.key === 'd'|| e.key === 'D' || e.code === "ArrowRight"){
		//右キーが押された時の処理
        /*
        if((boxNum==6&&boxStyle==4)||(boxNum==6&&boxStyle==3)||(boxNum==5&&boxStyle==4)||boxNum==1&&(boxStyle==1||boxStyle==3)||(boxNum==2&&boxStyle==4)){
            n = 1;//右壁に貼り付けるブロック
        } else if((boxNum==5&&boxStyle==3)||boxNum==1&&(boxStyle==2||boxStyle==4)){
            n = -1;//右壁から２マス遠いブロック
        }else{
            n=0;//右壁から1マス遠い(デフォ)
        }
        if(widpoint>=9+n||field[heipoint][widpoint+2-n]==2){
                NG = true;
            }
        */
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

    if(e.key === 'w'|| e.key === 'W' || e.key === 'Space'){
		// Wキーが押された時の処理
        /*
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
        if(widpoint>=8&&((boxNum==5&&boxStyle==3)||boxNum==1&&(boxStyle==2||boxStyle==4))){
            widpoint=8;
        }
        if(widpoint>=10&&boxNum!=0){
            widpoint--;
        }
        */
        if(boxNum==0||boxStyle==4){
            boxStyle = 1;
        }else{
            boxStyle++;
        }
        for(let y=1; y<=fieldHeight; y++){
            for(let x=1; x<=fieldWidth; x++){
                if(field[y][x]==1&&(field[y][x]==2||field[y][x]==99)){
                    
                }
            }
        }
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

    if(e.key === 'S'|| e.key === 's' ){
        play();
    }
};

function sleep(waitMsec) {
    var startMsec = new Date();
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
};

let gameON = false;
//ブロックを置いたときに一列が揃ってるかどうかの判定
let minoLine = ()=>{
    sleep(400);
    p1.innerText = "test";
    
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
                    //}
                }
            }
        }
    }
    p1.innerText = "test";
    //gameON = true;
};
//消えたラインから上のミノを下げる関数
let minoDown=(num)=>{
    for(let y=num; y>1; y--){
        for(let x=1; x<=fieldWidth; x++){
            field[y][x] = 0;
            field[y][x] = field[y-1][x];
        }
    }
    
}
//スタートするためのボタン
push.addEventListener('click',()=>{
    gameON = true;
    if(gameON){
        setInterval(play,400);
        setInterval(gameWindow,400);
    }
});

/*
for(let y=heipoint-2; y<=heipoint+1;y++){
    for(let x=widpoint-3; x<=widpoint+3; x++){
        if((field[y][x]==1)&&(field[y+1][x]==99||field[y+1][x]==2)){
            
        }
    }
    
}

*/