let  h2 = document.querySelector('h2');
let  p0 = document.querySelector('#p0');
let  p1 = document.querySelector('#p1');
let  p2 = document.querySelector('#p2');
let  p3 = document.querySelector('#p3');
let  p4 = document.querySelector('#p4');
let  p5 = document.querySelector('#p5');
let  push = document.querySelector('#push');
let  btns = document.querySelector('#title');
let  statP = document.querySelector('#statP');

let newText;

let mode = 0;
let winNum =21;
let yama = [];
let userCards = [];
let cpuCards  = [];
let userNum = 0;
let cpuNum  = 0;
let phase = 1;
let win = 0;
let lose = 0;
let draw = 0;

push.addEventListener('click',()=>{
    if(phase == 1){
        p5.innerText = `カードをシャッフルします！`;
        //初期化を行います
        yama = Object.create(trump());
        userNum = 0;
        cpuNum  = 0;
        userCards.splice(0,userCards.length);
        cpuCards.splice(0,cpuCards.length);
        p0.innerHTML=`<img src='cards_img/card_back.png' width="140" height="200"></img>`;
        p1.innerText=``;
        p2.innerText=``;
        p3.innerText=``;
        p4.innerText=``;
        phase++;
        newText = "";

    }else if(phase == 2){
        if(mode==1){
            winNum = document.querySelector('input').value;
        }
        p1.innerText = `山札残り${yama.length}枚`;
        p5.innerText = `カードを引いてください！`;
        push.innerText = `カードを引く`;
        phase++;
    }else if(phase == 3){
        
        userCards.unshift(yama.shift());
        if(cpuNum<winNum-7){
            cpuCards.unshift(yama.shift());
            if(cpuCards[0][0][1]<10){
            cpuNum += cpuCards[0][0][1];
            }else{
                //10以上は10加算とする
                cpuNum += 10;
            }
        }
        p1.innerText = `山札残り${yama.length}枚`;
        tefuda();
        p4.innerText = `${userCards[0][0][0]}${userCards[0][0][1]}を引きました！`;
        p5.innerText = `引くか勝負か決めてください！`;
        btns.innerHTML = `<button id='push2'>勝負！</button>`
        push2 = document.querySelector('#push2');
        //勝負するときのpush2関数
        push2.addEventListener('click',()=>{
            while(cpuNum<winNum-7){
                cpuCards.unshift(yama.shift());
                cpuNum += cpuCards[0][0][1];
            }
            p1.innerText = `あなた${userNum}、あいて${cpuNum}`;
            p2.innerText=``;
            p3.innerText=``;
            p4.innerText=``;
            
            bout();
            
            p5.innerText=`これで${win}勝${lose}敗、${draw}引き分けです`;
            push.innerText = `OK！`
            btns.innerHTML = ``
            phase = 1;
            
        });
    }
});



/* 
//手札を表示する仕組み
let tefuda = ()=>{
    p2.innerText = `手札${userCards.length}枚、合計で${cardsSum()}。`;
    
    let text;
    for(let i =0; i<userCards.length ;i++){
        if(i==0){
            text = userCards[i][0][0];
            text = text + userCards[i][0][1];
            text = text + `、`
            //最初の一枚を「undefined」と表示させない処理
        }else{
            text = text + userCards[i][0][0];
            text = text + userCards[i][0][1];
            text = text + `、`
        }
    }
    p3.innerText = text;
};
*/


let cardsSum = ()=>{
let numberSum = 0;
    for(let i = 0; i<userCards.length; i++){
        if(userCards[i][0][1]<10){
            numberSum = numberSum + userCards[i][0][1];
        }else{
            //10以上は10加算とする
            numberSum = numberSum + 10;
        }
    }
    userNum = numberSum;
    return numberSum;
};


let trump = ()=>{
    //シャッフル関数
    let cards = [];
    let marks = ['♠','♥','♦','♣'];
    for(let mk of marks){
        for(let i = 1; i<=13; i++){
            cards.push([mk,i]);
        }
    }
    let random_Cards = [];
    for(let i = 0; i < 52; i++){
        let random = Math.random()*(52 - random_Cards.length); 
        random = Math.floor( random );
        console.log( random );
        let push_Card = cards.splice(random,1);
        random_Cards.push(push_Card);
    };
    return random_Cards;
}

let bout =()=>{
    if(userNum>winNum){
        if(cpuNum>winNum){
            p4.innerText =`引き分けです！`;
            draw++;
        }else if(cpuNum<=winNum){
            p4.innerText = `あなたの負けです！`;
            lose++;
        }
    }else if(userNum<=winNum){
        if(userNum==cpuNum){
            p4.innerText =`引き分けです！`;
            draw++;
        }else if(userNum>cpuNum||cpuNum>winNum){
            p4.innerText = `あなたの勝ちです！！`;
            win++;
        }else if(userNum<cpuNum){
            p4.innerText = `あなたの負けです！`;
            lose++;
        }
    }
    
}

//裏モード
statP.addEventListener('click',()=>{
    h2.innerHTML = `<h2>うっひょおおおおおお！（・ω・）ﾉ</h2><p>GAME MODE</p><input type='number' placeholder='21'>`; 
    mode = 1;
});


/**/

//手札の枚数や合計を表示する仕組み
let tefuda = ()=>{
    p2.innerText = `手札${userCards.length}枚、合計で${cardsSum()}。`;
    
    let text;
    

//カードを画像データを呼び出して表示する仕組み
    for(let i =0; i<userCards.length ;i++){
        if(i==0){
            cardMark = userCards[i][0][0];
            cardNum  = userCards[i][0][1];
            text = getImage(cardMark,cardNum);
            //最初の一枚を「undefined」と表示させない処理
        }/*else{
            text = text + userCards[i][0][0];
            text = text + userCards[i][0][1];
            text = text + `、`
        }画像読み込みには必要ないはず*/
    }
    newText += text;
    p0.innerHTML = newText;
};
//カードの画像データを呼び出す仕組み
//card_club_01.png
//<img src="">
//♠♥♦♣１２３４５６７８９１０１１１２１３
let getImage=(cardMark,cardNum)=>{
    switch(cardMark){
        case "♠": cardUrl = 'spade_' ; break;
        case "♥": cardUrl = 'heart_' ; break;
        case "♦": cardUrl = 'diamond_' ; break;
        case "♣": cardUrl = 'club_' ; break;
    }
    switch(cardNum){
        case 1 : cardUrl += '01'; break;
        case 2 : cardUrl += '02'; break;
        case 3 : cardUrl += '03'; break;
        case 4 : cardUrl += '04'; break;
        case 5 : cardUrl += '05'; break;
        case 6 : cardUrl += '06'; break;
        case 7 : cardUrl += '07'; break;
        case 8 : cardUrl += '08'; break;
        case 9 : cardUrl += '09'; break;
        case 10: cardUrl += '10'; break;
        case 11: cardUrl += '11'; break;
        case 12: cardUrl += '12'; break;
        case 13: cardUrl += '13'; break;
    }
    tagText = `<img src='cards_img/card_${cardUrl}.png' width="140" height="200"></img>`;
    return tagText;
}
