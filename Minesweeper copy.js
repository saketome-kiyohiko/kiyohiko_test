let  p0 = document.querySelector('#p0');
let  p1 = document.querySelector('#p1');
let  p2 = document.querySelector('#p2');
let  p3 = document.querySelector('#p3');
let  p4 = document.querySelector('#p4');
let  push = document.querySelector('#push');
let  flag = document.querySelector('#flag');
let  anBOM = document.querySelector('#anBOM');
let  fieldLength = document.querySelector('#fieldLength');
let  start = document.querySelector('#start');
//一次元目の配列を、x（横軸）とする。field[2][0]
//二次配列の0番を、y（縦軸）とする。field[2][3]

let gameLength = 15;//なぜか5以下の数値だと生成されない・・・
let BOM = 30;       //ボムの数
let clickMode = true;
let BOMcount = BOM;
let clearFlag = 0;
let newText = "";
let field;
p0.innerText = ``;

//フィールド生成がうまく連動しない。。。
start.addEventListener('click',()=>{
    if(anBOM.value>=fieldLength.value*fieldLength.value){
        p0.innerText = `無効です！初期値で始めます！`;
    }else{
        gameLength = Math.floor(fieldLength.value);
        BOM = anBOM.value;
        BOMcount = BOM;
    }
    //x軸、y軸の配列を生成。全ての値の初期値は0。+1はフィールドの端っこ
    field = new Array(gameLength+2);  //一次元目+2は壁
    for(let i=0; i < gameLength+2; i++){
        field[i] = new Array(gameLength+2);//二次元目
    }
    for(let x=0; x<gameLength+2; x++){
        for(let y=0; y<gameLength+2; y++){
            if(x==0||y==0||x==gameLength+1||y==gameLength+1){
                field[x][y] = `99`;
            }else{field[x][y] = 0;
            }
            
        }
    }


    //ボタンのHTMLタグを生成する
    let fieldBtnTag ="";
    //↑このダブルクオーテーションがないと、undefinedという文字列が先頭に表示されてしまう
    for(let i=1; i <= gameLength; i++){
        for(let j=1; j <= gameLength; j++){
            newTag = `<button id='btn${i}-${j}' width='70px' height='70px' onclick='getId(${i},${j});'>　</button>`
            fieldBtnTag = fieldBtnTag+newTag;
            if(j==gameLength){
                fieldBtnTag = fieldBtnTag+`<br>`;
            }
        }
    }
    p3.innerHTML = fieldBtnTag;//ボタン配置

    //爆弾を配置する
    for(let i=0; i<BOM; i++){
        let ran=0;
        let ran2=0;
        do{
        ran  = Math.floor(Math.random()*gameLength+1);
        ran2 = Math.floor(Math.random()*gameLength+1);
        }while(field[ran][ran2] == `BOM`)
        field[ran][ran2] = `BOM`;
    }

    //爆弾の数をカウントする数値を配置する
    for(let x=1; x<=gameLength; x++){
        for(let y=1; y<=gameLength; y++){
            if(field[x][y] == 0){
                let n = 0;
                n = (field[x-1][y-1] ==`BOM` ? n+1 : n );
                n = (field[x][y-1] ==`BOM` ? n+1 : n );
                n = (field[x+1][y-1] ==`BOM` ? n+1 : n );
                n = (field[x-1][y] ==`BOM` ? n+1 : n );
                n = (field[x+1][y] ==`BOM` ? n+1 : n );
                n = (field[x-1][y+1] ==`BOM` ? n+1 : n );
                n = (field[x][y+1] ==`BOM` ? n+1 : n );
                n = (field[x+1][y+1] ==`BOM` ? n+1 : n );
                field[x][y] = n;
            }
        }
    }
    console.log(field);



    //p1にフィールドをテキスト表示してる状態
    let fieldText="";
    for(let x=0; x < gameLength+2; x++){
        for(let y=0; y < gameLength+2; y++){
                switch(field[x][y]){
                case 0  : newfieldText = `　,`; break;
                case `BOM`: newfieldText = ` 〇`; break;
                case  `99`: newfieldText = ` 壁`; break;
                default : newfieldText = `|`　+　field[x][y] +',' ;
            }
            fieldText = fieldText+newfieldText;
            if(y==gameLength+1){
                fieldText = fieldText+`\n`;
            }
        }
    }
    p1.innerText = fieldText;

});

flag.addEventListener('click',()=>{
    clickMode = false;
});
push.addEventListener('click',()=>{
    clickMode = true;
});


//ボタンを押したときのアクション
function getId(x,y){
    
    /*
    x = Math.floor(btnid/gameLength+1);
    y = (btnid-(x-1)*gameLength)+1;
    p2.innerText = field[x][y];//テスト用//////////
    */
    //10以外の数値にも対応出来るようにしたいがうまくいかない/////
    //x = Math.floor(btnid/gameLength)+1;
    //y = ((btnid+gameLength)-gameLength)+1;
    //↓うまくいった
    if(clickMode){

        p4.innerText = x+`-`+y;
        p2.innerText = field[x][y];
        if(document.querySelector(`#btn${x}-${y}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x}-${y}`).innerText = field[x][y];
        if(field[x][y]==`BOM`){
            p0.innerText = `残念！！爆弾でした(；ω；)`;
            alert( `残念！！爆弾でした(；ω；)\nあなたは死にました(；ω；)` )
        }

        if(field[x][y]==0){
            continuous(x, y);
        }

        //左上にも自動で開いていく関数。動くは動くが、エラーが出続ける。。
        if(field[x][y-1]==0){
            continuous(x, y-1, 1);
        }
        
    }else if(BOMcount!=0&&document.querySelector(`#btn${x}-${y}`).innerText != "🚩"){
        document.querySelector(`#btn${x}-${y}`).innerText = "🚩";
        BOMcount--;
        if(field[x][y]==`BOM`){
            clearFlag++;
        }
        if(clearFlag==BOM){
            newText = `【クリア】ボムを全てマークしました！！`;
        }
    }
    p0.innerText = newText+`残り🚩数【${BOMcount}】`;
}


//連続して0をめくり続ける関数
let continuous = (x, y, num) =>{
    let plus = 0;
    do{
        plus++;
        if(field[x][y+plus]==99||field[x][y+plus]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x}-${y+plus}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x}-${y+plus}`).innerText = field[x][y+plus];
        
    }while(field[x][y+plus]==0);
    plus = 0;
    do{
        plus--;
        if(field[x][y+plus]==99||field[x][y+plus]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x}-${y+plus}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x}-${y+plus}`).innerText = field[x][y+plus];
        
    }while(field[x][y+plus]==0);
    plus = 0;
    do{
        plus++;
        if(field[x+plus][y]==99||field[x+plus][y]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x+plus}-${y}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x+plus}-${y}`).innerText = field[x+plus][y];
        
    }while(field[x+plus][y]==0);
    plus = 0;
    do{
        plus--;
        if(field[x+plus][y]==99||field[x+plus][y]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x+plus}-${y}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x+plus}-${y}`).innerText = field[x+plus][y];
        
    }while(field[x+plus][y]==0);
    plus = 0;

    //またループに入る
    if(x!=gameLength && x!=1 && y!=gameLength && y!=1){
        if(field[x][y]==0){
            continuous(x+1,y);
        }
    }

    if(x!=gameLength && x!=1 && y!=gameLength && y!=1 && num==1){
        if(field[x][y]==0){
            continuous(x-1, y, 1);
        }
    }
    
};

/*/* 
//左上方向に広がってくれる自動めくり
let continuous2 = (x, y, num) =>{
    let plus = 0;

    do{
        plus--;
        if(field[x+plus][y]==99||field[x+plus][y]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x+plus}-${y}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x+plus}-${y}`).innerText = field[x+plus][y];
        
    }while(field[x+plus][y]==0);
    plus = 0;

    do{
        plus++;
        if(field[x+plus][y]==99||field[x+plus][y]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x+plus}-${y}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x+plus}-${y}`).innerText = field[x+plus][y];
        
    }while(field[x+plus][y]==0);
    plus = 0;

    do{
        plus--;
        if(field[x][y+plus]==99||field[x][y+plus]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x}-${y+plus}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x}-${y+plus}`).innerText = field[x][y+plus];
        
    }while(field[x][y+plus]==0);
    plus = 0;

    do{
        plus++;
        if(field[x][y+plus]==99||field[x][y+plus]==`BOM`){
            break;
        }
        if(document.querySelector(`#btn${x}-${y+plus}`).innerText == `🚩`){
            BOMcount++;
        }
        document.querySelector(`#btn${x}-${y+plus}`).innerText = field[x][y+plus];
        
    }while(field[x][y+plus]==0);
    plus = 0;

    
    //またループに入る
    if(x!=gameLength && x!=1 && y!=gameLength && y!=1){
        if(field[x][y]==0){
            continuous2(x,y-1);
        }
    }
    
};
*/


//});

//没コード

//↓if文やfor文で囲ってボタンの関数とかを量産出来るかと思ったけど、認識しなかった
//testMode = true;///////////////////
/*
for(let x=0; x<gameLength+1; x++){
    for(let y=0; y<gameLength; y++){
        if(x==gameLength){
            do{
                let me=100+500;
                
            }while(testMode);
        }

        document.querySelector(`'#btn${x}${y}'`).addEventListener('click',()=>{
            btn.innerText = `${x}${y}`;
        });

    }
}
*/
