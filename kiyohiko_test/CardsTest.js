let  h1 = document.querySelector('h1');
let  p1 = document.querySelector('#p1');
let  p2 = document.querySelector('#p2');
let  p3 = document.querySelector('#p3');
let push = document.querySelector('#push');
let shuffle = document.querySelector('#shuffle');
let  draw = document.querySelector('#draw');
let  drawAll = document.querySelector('#drawAll');
let  tefuda = document.querySelector('#tefuda');
let  test = document.querySelector('#test');
let  title = document.querySelector('#title');


let yama = [];
let userCards = [];




push.addEventListener('click',()=>{
    //push押したときの動作を書く
    h1.innerText = "カードを引いたり混ぜたりします";
    p1.innerText = "やっほー！";
    p2.innerText = "こんにちは！";
    p3.innerText = "";
});


shuffle.addEventListener('click',()=>{
    yama = Object.create(trump());
    p1.innerText = "";
    p2.innerText = "";
    p3.innerText = "カードを混ぜました！";
    userCards.splice(0, 52);
});

draw.addEventListener('click',()=>{
    userCards.unshift(yama.shift());
    p3.innerText =`あなたは${userCards[0][0][0]}${userCards[0][0][1]}を引きました！`;
    p2.innerText = `残り${yama.length}枚`;
});

drawAll.addEventListener('click',()=>{
    p1.innerText = "これが山札に残ってるカード全てです！";
    p2.innerText = `残り${yama.length}枚`;
    let text;
    for(let i =0; i<yama.length ;i++){
        if(i==0){
            text = yama[i][0][0];
            text = text + yama[i][0][1];
            text = text + "、"
            //最初の一枚を「undefined」と表示させない処理
        }else{
            text = text + yama[i][0][0];
            text = text + yama[i][0][1];
            text = text + "、"
        }
    }
    p3.innerText = text;
});

tefuda.addEventListener('click',()=>{
    p1.innerText = "あなたの現在の手札です。";
    p2.innerText = `手札${userCards.length}枚`;
    let text;
    for(let i =0; i<userCards.length ;i++){
        if(i==0){
            text = userCards[i][0][0];
            text = text + userCards[i][0][1];
            text = text + "、"
            //最初の一枚を「undefined」と表示させない処理
        }else{
            text = text + userCards[i][0][0];
            text = text + userCards[i][0][1];
            text = text + "、"
        }
    }
    p3.innerText = text;
});

test.addEventListener('click',()=>{
    p2.innerText = `手札${userCards.length}枚`;
    let numberSum = 0;
    for(let i = 0; i<userCards.length; i++){
        numberSum = numberSum + userCards[i][0][1];
        p3.innerText = `合計で${numberSum}です！`;
    }
    let S = 0;
    let H = 0;
    let D = 0;
    let C = 0;
    for(let i = 0; i<userCards.length; i++)
        if(userCards[i][0][0] == '♠'){
            S += 1;
        }else if(userCards[i][0][0] == '♥'){
            H += 1;
        }else if(userCards[i][0][0] == '♦'){
            D += 1;
        }else if(userCards[i][0][0] == '♣'){
            C += 1;
    };
    p1.innerText = `♠は${S}枚、♥は${H}枚、♦は${D}枚、♣は${C}枚です！`
    /*ここはテスト用。ＨＴＭＬを書き換えるようにやってみた
    title.innerHTML = "<button id='backTitle'>戻る</button><br><br>";
    backTitle = document.querySelector('#backTitle')
    */
});

/*
//戻るボタン→backTitle
backTitle.addEventListener('click',()=>{
    title.innerHTML = "<button id='push'>やっほー</button><br><br><button id='shuffle'>シャッフル</button><br><br><button id='draw'>引く</button><button id='drawAll'>全部めくる</button><button id='tefuda'>手札</button><br><br><button id='test'>tesuto</button><br><br>";
});
*/


let trump = ()=>{
    /*
    let cards = [];
    let marks = ['♠','♥','♦','♣'];
    for(let mark of marks){
        for(let i = 1; i <= 13; i++){
            cards.push( mark + i );
        };
    }
    console.log(cards);
    //綺麗に並べられたトランプカードを作成
    */
    /*
    let cards = [];
    let marks = ['♠','♥','♦','♣'];
    for(let mk of marks){
        for(let i = 1; i<=13; i++){
            cards.push({mark:mk,number:i});
        }
    }
    console.log(cards[1]['mark'],cards[1]['number']);
    */

    let cards = [];
    let marks = ['♠','♥','♦','♣'];
    for(let mk of marks){
        for(let i = 1; i<=13; i++){
            cards.push([mk,i]);
        }
    }
    console.log(cards);


    let random_Cards = [];
    for(let i = 0; i < 52; i++){
        let random = Math.random()*(52 - random_Cards.length); 
        //(乱数1～52) - (残りデッキの枚数)で、指定するインデックスを調整
        random = Math.floor( random );
        //小数を省いた整数にする処理
        console.log( random ); //テストで乱数表示
        let push_Card = cards.splice(random,1);
        //spliceメソッドでデッキから指定したインデックスのカードを引く
        random_Cards.push(push_Card);
        //引いたカードをpushメソッドでランダムデッキに挿入
    }

    console.log(random_Cards); //完成したランダムデッキ
    console.log(cards);        //残り山札。0枚になってるはず！
    return random_Cards;
}

