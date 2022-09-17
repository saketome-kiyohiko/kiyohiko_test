
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
                charaWidth : 60,//判定回りのみ
                charaHeight : 68,//判定回りのみ
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
        charBeAttDetes = [[gia[e].charaX, gia[e].charaY+gia[e].charaHeight-(gia[e].charaHeight*gia[e].charaSize), gia[e].charaX+(gia[e].charaWidth),gia[e].charaY+(gia[e].charaHeight)]];
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
            if(sagatX>gia[e].charaX&&isSagatJump==0&&gia[e].actionCount>20){
                gia[e].reverse = -1;
            }else if(sagatX<gia[e].charaX&&gia[e].actionCount>20){
                gia[e].reverse = 1;
            }
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
            }else if(gia[e].actionCount>50){
                gia[e].charaImg = gia_work02;
            }else if(gia[e].actionCount>35){
                gia[e].charaImg = gia_work03;
            }else if(gia[e].actionCount>21){
                gia[e].actionCount = 90;
            }else if((gia[e].actionCount < 20&& sagatY+sagatHeight >= gia[e].charaY&&sagatX <= end)&&!gia[e].attack){
                //攻撃モーションでないとき
                gia[e].actionCount = 90;
            }else if(gia[e].actionCount > 10){
                gia[e].charaImg = gia_attack01;//グラの変更
            } else if(gia[e].actionCount > 1){
                gia[e].charaImg = gia_attack03;//グラの変更
                if(gia[e].actionCount>4){
                    gia[e].charaX += -10*gia[e].reverse;//ちょっとだけ前に進む
                    gia[e].charaImg = gia_attack02;
                }
            }else if(gia[e].actionCount == -10){
                gia[e].actionCount = 90;
            }
            //サガットが近いと殴ってくる
            if((gia[e].reverse == 1 && gia[e].charaX - sagatX+sagatWidth < 100)||gia[e].reverse == -1 && sagatX - gia[e].charaX  < 100 ){
                if(gia[e].actionCount > 20){
                    gia[e].charaX -= 2*gia[e].reverse;//移動速度
                    if(gia[e].actionCount > 20){
                        gia[e].attack = true;
                        gia[e].actionCount = 20;
                    }
                }
            }else if(gia[e].actionCount<21){
                gia[e].attack = false;
            }

            gia[e].actionCount--;

            //ダメージゾーン発生(キャラ画像の半分くらいが判定のとき)
            //             [ 0 ,  1  ,   2  ,    3   ,   4  ,   5    ,    6     ]
            //ダメージゾーン[名 , 始点X, 始点Y, 広さX, 下長さY, ダメージ, 与える無敵時間]
            DamageZone[DamageZone.length] = ["gia"+e, gia[e].charaX+gia[e].charaWidth/4, gia[e].charaY+gia[e].charaHeight/2, gia[e].charaX+gia[e].charaWidth, gia[e].charaY+gia[e].charaHeight, 20, 30];
            
        }else{
            gia[e].actionCount--;
        }
        if(returnDete!=null){//技食らったリアクション
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
        if(gia[e]==null){
            return;
        }
        //(gia[e].charaImg.width*gia[e].charaSize)
        //キャラが落下判定
        //壁に突き当たった時のアクション
        if((gia[e].reverse == 1 && gia[e].charaY+gia[e].charaImg.height/2 < field[gia[e].charaX-1])||(gia[e].reverse == -1 && gia[e].charaY+gia[e].charaImg.height/2 < field[gia[e].charaX+gia[e].charaImg.width*gia[e].charaSize*2+1])){
            
            gia[e].charaX += 1*gia[e].reverse;//移動速度と同じ分差し引いて動かさない
        }
        if(gia[e].charaY+(gia[e].charaImg.height*gia[e].charaSize)+(gia[e].charaImg.height*gia[e].charaSize)/4 < field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]){
            gia[e].charaY += 12;
        }else if(gia[e].charaY > field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]+(gia[e].charaImg.height*gia[e].charaSize)){
            gia[e].charaY += 12;
        }else{
            //下が地面なら地面の位置に立つ
            gia[e].charaY = field[gia[e].charaX+Math.floor((gia[e].charaImg.width*gia[e].charaSize)/2)]-(gia[e].charaImg.height*gia[e].charaSize);
        }
        
        
        //サガットが高いフィールドにいるときのアクション
        if(gia[e].charaX<sagatX&&gia[e].charaX+gia[e].charaImg.width>sagatX&& sagatY+sagatHeight<gia[e].charaY && isSagatJump == 0){
            if(gia[e].actionCount < 20){
                gia[e].actionCount = 95;
            }
        }
    