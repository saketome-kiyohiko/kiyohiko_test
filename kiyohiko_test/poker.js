let  h2 = document.querySelector('h2');
let  p0 = document.querySelector('#p0');
let  p1 = document.querySelector('#p1');
let  p2 = document.querySelector('#p2');
let  p3 = document.querySelector('#p3');
let  p4 = document.querySelector('#p4');
let  p5 = document.querySelector('#p5');
let  push = document.querySelector('#push');
let  newBtn = document.querySelector('#title');
let  statP = document.querySelector('#statP');
let  input = document.querySelector('input');
let  mny = document.querySelector('#money');


let yama = [];
let userCards = [];
let money = 10000;
let yaku;
let phase = 1;
let changeCards = [false,false,false,false,false];
let bet;



push.addEventListener('click',()=>{
    if(phase == 1){

        h2.innerText=`$${money}`;
        p0.innerHTML=`<img src='cards_img/card_back.png' width="140" height="200"></img>`;
        newText = ``;
        yama = Object.create(getTrump());    
        userCards.splice(0,userCards.length);
        cdfalse();
        push.innerText = `BET`
        p1.innerText = `いくら基本BETしますか？（10～1000）`;
        p2.innerText = ``;
        p3.innerText = ``;
        p4.innerText = ``;
        p5.innerText = ``;
        phase++;
    }else if(phase == 2 && 9<input.value && input.value<1001){
        p1.innerText = "カードを５枚配ります！";
        push.innerText = `ソート`;
        bet = input.value;
        money -= input.value;
        h2.innerText=`$${money}`;

        for(let i=0; i<5; i++){
            userCards.unshift(yama.shift());
        }
        tefuda();
    
        phase++;

    }else if(phase == 3){
        push.innerText = `OK`
        p1.innerText = "チェンジするカードを選んでください！"
        cardSort();
        tefuda();
        chgMath();
        phase++;
        
        //p1.innerText = userCards.length
        
    }
    
    else if(phase == 4){
        push.innerText = `OK`;
        chgCards();
        tefuda();
        cardSort();
        yaku = judge();
        p1.innerText = ``;
        p2.innerText = yaku;
        if(yaku!=`highCard`){
            p3.innerText = `倍率は${haitou(yaku)}倍です！`
            p4.innerText = `$${bet*haitou(yaku)}GET!!`;
            money += bet*haitou(yaku);
        }
            phase = 1;

    }

});
//役の配当設定
let haitou =(yaku)=>{
    switch(yaku){
        case `onePair`: return 0.5;
        break;
        case `twoPair`: return 3;
        break;
        case `threeCard`: return 4;
        break;
        case `straight`: return 8;
        break;
        case `flush`: return 10;
        break;
        case `fullHouse`: return 15;
        break;      
        case `fourCard`: return 50;
        break;
        case `straightFlush`: return 100;
        break;
        default: return 0;
        break;
    }
}




//選択したカードを交換する関数
let chgCards = ()=>{
    for(let i=0; i<5; i++){
        if(changeCards[i]){
            userCards[i] = yama.shift();
        }
    
    }
    for(let i of changeCards){
        i = false;
    }
}

//交換フラグをOFFにする関数
let cdfalse =()=>{
    changeCards[0]=false;
    changeCards[1]=false;
    changeCards[2]=false;
    changeCards[3]=false;
    changeCards[4]=false;
    
}


//ボタンを押したら交換フラグがONになる関数。ごり押しなのでいつか直したい
let chgMath = ()=>{

    let cd1 = document.querySelector('#cd1');
    let cd2 = document.querySelector('#cd2');
    let cd3 = document.querySelector('#cd3');
    let cd4 = document.querySelector('#cd4');
    let cd5 = document.querySelector('#cd5');
    cd1.addEventListener('click',()=>{
        if(changeCards[0]==false){
            changeCards[0] = true;
            cd1.style.backgroundColor = 'red';
        }else{
            changeCards[0] = false;
            cd1.style.backgroundColor = '';
        }
    });
    cd2.addEventListener('click',()=>{
        if(changeCards[1]==false){
            changeCards[1] = true;
            cd2.style.backgroundColor = 'red';
        }else{
            changeCards[1] = false;
            cd2.style.backgroundColor = '';
        }
    });
    cd3.addEventListener('click',()=>{
        if(changeCards[2]==false){
            changeCards[2] = true;
            cd3.style.backgroundColor = 'red';
        }else{
            changeCards[2] = false;
            cd3.style.backgroundColor = '';
        }
    });
    cd4.addEventListener('click',()=>{
        if(changeCards[3]==false){
            changeCards[3] = true;
            cd4.style.backgroundColor = 'red';
        }else{
            changeCards[3] = false;
            cd4.style.backgroundColor = '';
        }
    });
    cd5.addEventListener('click',()=>{
        if(changeCards[4]==false){
            changeCards[4] = true;
            cd5.style.backgroundColor = 'red';
        }else{
            changeCards[4] = false;
            cd5.style.backgroundColor = '';
        }
    });

}



//シャッフル関数
let getTrump = ()=>{
    
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
};


//userCardsを小さい順に並び代える関数
let cardSort = ()=>{
    let n = 0;
    let box = [];
    for(let i=0; i<userCards.length; i++){
        for(let j=0; j<userCards.length; j++){
            if(userCards[i][0][1] > userCards[j][0][1]){
                //数値が大きいなら、ｎが加算されていく
                n++;
            }else if(userCards[i][0][1] == userCards[j][0][1] && i>j){
                //数値が同じなら、元から後ろの側(ｊ)がｎ加算されて、
                //その分後ろにずれてくれる
                n++;
            }
        }
        box[n] = userCards[i];
        n = 0;
    }
    //仮で並べ替えカードを保持してたboxをuserCardsに移す
    userCards.splice(0,userCards.length);
    for(let i=0; i<5; i++){
        userCards.push(box.shift());
    }
    
};


//カードを画像データを呼び出してp0.innerHTMLに表示する仕組み
let tefuda = ()=>{    
    let text;
    p0.innerHTML=``;
    newText =``;
    //更新するたびに初期化
    for(let i =0; i<userCards.length ;i++){
        cardMark = userCards[i][0][0];
        cardNum  = userCards[i][0][1];
        text = getImage(cardMark,cardNum,i+1);
        newText += text;
    }
    p0.innerHTML = newText;
};
//カードの画像データを呼び出す仕組み
//card_club_01.png
//<img src="">
//♠♥♦♣１２３４５６７８９１０１１１２１３
let getImage = (cardMark,cardNum,num)=>{
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
    tagText = `<img id='cd${num}' src='cards_img/card_${cardUrl}.png' width="140" height="200"></img>`;
    return tagText;
}

//役を判定する関数
let judge = ()=>{
    let pair;
    let flush = false;
    let straight = false;
    let n=0;
    //フラッシュチェック関数
    
    for(let i=1; i<userCards.length; i++){
        if(userCards[0][0][0] == userCards[i][0][0]){
            n++;
        }
    }
    if(n==4){
        flush=true;
    }
    //p2.innerText = ``+n+flush+straight///////////////////////////////////
    
    n=0; //初期化
    
    //ペアがあるかチェックして、ないならストレートチェックを呼び出す
    for(let i=0; i<userCards.length; i++){
        for(let j=0; j<userCards.length; j++){
            if( i<j ){
                if(userCards[i][0][1] == userCards[j][0][1]){
                    n++;
                }
            }
        }
    }
    
    switch(n){
        case 0: pair = `noPair`; 
        break;
        case 1: pair =  `onePair`;
        break;
        case 2: pair = `twoPair`;
        break;
        case 3: pair = `threeCard`;
        break;
        case 4: pair = `fullHouse`; 
        break;
        case 6: pair = `fourCard`;
        break;
    }
    
    if(pair==`noPair`){
        straight = (straightCheck());
        //ストレートのチェック
    }
    //役判定ラスト
    if(pair==`noPair`){
        if(flush||straight){
            if(flush&&straight){
                return `straightFlush`;
            }else if(straight){
                return `straight`;
            }else if(flush){
                return `flush`;
            }

        }else{
            return `highCard`;
        }

    }else{
        return pair;
    }
    //p4.innerText = `check4`+pair+flush+straight+n;//////////////

}

//ストレートかどうかをチェックする関数
let straightCheck = ()=>{
    let ace  = false;
    let king = false;
    cardSort();
    for(let i=0; i<userCards.length; i++){
        if(userCards[i][0][1]==1){
            ace = true;
        }
        if(userCards[i][0][1]==13){
            king = true;
        }
        /* ↓これは間違いなので、記録用に残しておく
        king = (userCards[i][0][1]==1 ? true:false );
        ace  = (userCards[i][0][1]==13? true:false );
        */
    }
    //p1.innerText = ``+ace+king///////////////////////////////
    if(ace&&king){
        for(let i=0; i<userCards.length; i++){
            if( userCards[i][0][1] < 5 ){
                //カードが5未満ならカウント用に+13される
                userCards[i][0][1] += 13;
            }
        }
    }

    cardSort();
    /*+13した後のカードソートがうまくいってるかテスト用
    p2.innerText = userCards[1][0][0] + userCards[1][0][1];
    p3.innerText = userCards[2][0][0] + userCards[2][0][1];
    p4.innerText = userCards[3][0][0] + userCards[3][0][1];
    p5.innerText = userCards[4][0][0] + userCards[4][0][1];
    */
    
    let num=0;
    for(let i=0; i<userCards.length-1; i++){
        //p2.innerText = num///////////////////////////////////
        if(userCards[4][0][1] - userCards[i][0][1] + i == 4){
            num++;
            if(num==4){
                //p3.innerText = `check3`+num;/////////////////////
                //加算した14以上のカードを-13して戻す
                if(ace&&king){
                    for(let i=0; i<userCards.length; i++){
                        if( userCards[i][0][1] > 13 ){
                            userCards[i][0][1] -= 13;
                        }
                    }
                }
                return true;  //ストレートならtrue
            }
        }
    }
    //加算した14以上のカードを-13して戻す
    if(ace&&king){
        for(let i=0; i<userCards.length; i++){
            if( userCards[i][0][1] > 13 ){
                userCards[i][0][1] -= 13;
            }
        }
    }
    
}

//デバッグ用ボタン
statP.addEventListener('click',()=>{
    bagStr();
});


//デバック用、ストレートを手札に入れる関数
let bagStr =()=>{
    //♠
    userCards[0][0][0]=`♠`;
    userCards[1][0][0]=`♠`;
    userCards[2][0][0]=`♠`;
    userCards[3][0][0]=`♠`;
    userCards[4][0][0]=`♠`;
    cardSort();
    tefuda();
    
    /*デバック用
    p1.innerText = userCards[0][0][0] + userCards[0][0][1] + userCards[1][0][0] + userCards[1][0][1] + userCards[2][0][0] + userCards[2][0][1] +userCards[3][0][0] + userCards[3][0][1] + userCards[4][0][0] + userCards[4][0][1];
    p2.innerText = userCards[1][0][0] + userCards[1][0][1];
    p3.innerText = userCards[2][0][0] + userCards[2][0][1];
    p4.innerText = userCards[3][0][0] + userCards[3][0][1];
    p5.innerText = userCards[4][0][0] + userCards[4][0][1];
    */
}
