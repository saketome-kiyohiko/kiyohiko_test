
let touchField = document.getElementById("touchField");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let time = 0;
let score =0;

    let timer = ()=>{
        p1.innerText = `PLAY TIME　${time}秒`;
        time++;
    }
setInterval(timer, 1000);

window.addEventListener( "load", loadFunc, false );
function loadFunc() {
    
    var canvas = document.getElementById( "stage" );
    var ctx = canvas.getContext( "2d" );
    
    //var ctx = document.getElementById( "stage" ).canvas.getContext( "2d" );
    //ボール関連の変数
    var x = canvas.width/2+2;     //ボールの位置座標、横軸
    var y = canvas.height-40;   //ボールの位置座標、縦軸
    var ballRadius = 5;        //ボールのサイズ(半径の大きさ)
    var dx = 2;                 //ボールが横軸に移動していく速さの初期値
    var dy = -2;                //ボールが縦軸に移動していく速さの初期値
    let ballMove = 0;
    
    //パドルの大きさとか開始地点の座標を定義
    let paddleHeight = 10;
    let paddleWidth = 100;
    let paddleX = (canvas.width - paddleWidth)/2;
    //キーボード操作を制御するための変数
    let rightPressed = false;
    let  leftPressed = false;
    //消すブロックの変数を定義する
    
    let brickRowCount = 18;      //ブロックの行数
    let brickColumnCount = 18;   //ブロックの列数
    let brickWidth = 35;        //ブロックひとつあたりの横幅
    let brickHeight = 9;       //ブロックひとつあたりの高さ
    let brickPadding = 4;      //ブロックとブロックのの余白
    let brickOffsetTop = 50;    //ブロックの一番上の高さ
    let brickOffsetleft = 48;   //ブロックとキャンバス左の余白

    
    //ブロック配列を定義
    let bricks = [];
    for(let c=0; c<brickColumnCount; c++){ //横軸の配列から作成 [3]
        bricks[c] = [];                 //横軸の配列の中に縦軸を作成 [3][5]
        for(let r=0; r<brickRowCount; r++){ 
            //配列の中にプロパティと値を作成して,
            //ブロックcrにはブロック番号、[c横列][r縦行]を入れる
            //その中にはそのブロックのcanvasでの座標xyを入れておく
            //表示ステータス1を入れとく！0なら表示されないように管理
            //遊びでランダム変数を代入
            let ram = Math.random()*6;
            ram = Math.floor( ram );
            bricks[c][r] = { x:0 , y:0 , status: ram };
            //
        }
    }
    
    //定義したブロックを描画
    function drawBricks(){
        for(let c=0; c<brickColumnCount; c++){
            for(let r=0; r<brickRowCount; r++){
                //↓上記を加味してブロックの最終的な位置を決定し、描画する式↓
                if(bricks[c][r].status >= 1){                    
                    let brickX = (c*(brickWidth+brickPadding))+brickOffsetleft;
                    let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    //それを配列に代入
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    switch(bricks[c][r].status){
                        case 1 :ctx.fillStyle = "#FF0000";
                        break;
                        case 2 :ctx.fillStyle = "#ee8f00";
                        break;
                        case 3 :ctx.fillStyle = "#FFFF00";
                        break;
                        case 4 :ctx.fillStyle = "#00FF00";
                        break;
                        case 5 :ctx.fillStyle = "#01ffc8"; 
                    }
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }


    function drowBall(){
        ctx.beginPath();                        //描画宣言
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);//玉のサイズや形を描画
        ctx.fillStyle = "#F000FF";              //色を定義
        ctx.fill();                             //描画
        ctx.closePath();                        //描画終了宣言
    }


    //毎秒毎の処理を最終的に実行するメイン関数
    function drow(){
        //前のフレームの描画を全部消す
        ctx.clearRect(0,0, canvas.width, canvas.height);
        //ほんで今(実際は前のフレームの処理時)のボールを描画する
        drowBall();
        drawBricks();
        cllisionDetecrion();
        p2.innerText = `SCORE　${score}点`;
        //玉の動き、画面端を反射する式
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if( y + dy < ballRadius) {
            dy = -dy;
            //高さがパドルまで落ちてきた時、
        }else if(y + dy > canvas.height-ballRadius){
            //ボールとパドルの衝突を判定する式
            if( paddleX-ballRadius-paddleHeight/2 < x && x < paddleX + paddleWidth+ballRadius+paddleHeight/2){
                if(paddleX+paddleX/2-paddleWidth/10 < x && x < paddleX+paddleWidth/2+paddleWidth/10){
                    dx = dx = dx > 0 ? 1 : -1 ;
                    dy = -dy;
                }else if(paddleX < x && x < paddleX+paddleWidth/6){
                    dx = -3;
                    dy = -dy;
                }else if(paddleX+paddleWidth-paddleWidth/6 < x && x <paddleX+paddleWidth){
                    dx = 3;
                    dy = -dy;
                }else{
                    dx = dx > 0 ? 2 : -2 ;
                    dy = -dy;
                }
                score+=20;
            }else{
                alert ("GAME_OVER");
                document.location.reload();
                clearInterval(interval);
            }
        }
        //玉の座標xyに移動変数dxとdyを代入※１フレーム毎
        x += dx;
        y += dy;
        
        if(rightPressed && paddleX < canvas.width - paddleWidth){
            paddleX += 5;
        }else if(leftPressed && paddleX > 0){
            paddleX -= 5;
        }
        drawPaddle();
    }
    //パドルを描画する関数
    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    //キーボード操作を受け付ける関数
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e){
        if(e.key == "Right" || e.key == "ArrowRight" ||e.key ==='d'||e.key ==='D'){
            rightPressed = true;
        }
        if(e.key == "Left" || e.key == "ArrowLeft" ||e.key ==='a'||e.key ==='A'){
            leftPressed = true;
        }
    }
    function keyUpHandler(e){
        
        if(e.key == "Right" || e.key == "ArrowRight" ||e.key ==='d'||e.key ==='D'){
            rightPressed = false;
        }
        if(e.key == "Left" || e.key == "ArrowLeft" ||e.key ==='a'||e.key ==='A'){
            leftPressed = false;
        }
        
    }

    //フリック操作を受け付ける関数
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;
    touchField.addEventListener("touchstart", function(e) {
        e.preventDefault();// スクロール無効化 
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        //指が触れた座標を獲得する
    });
    
    // 画面上で指を移動させているきの処理を定義
    touchField.addEventListener("touchmove", function(e) {
        e.preventDefault();// スクロール無効化 
        moveX = e.changedTouches[0].pageX;
        moveY = e.changedTouches[0].pageY;
        if(startX < moveX){
            rightPressed = true;
        } else if(startX > moveX){
            leftPressed = true;
        }
    });
    
    // 画面から指が離れたときの処理を定義
    touchField.addEventListener("touchend", function(e) {
        e.preventDefault();// スクロール無効化 
        rightPressed = false;
        leftPressed = false;
    });

    
    //ブロックとの衝突を検出する関数
    function cllisionDetecrion(){
        
        for(let c=0; c<brickColumnCount; c++){
            for(var r=0; r<brickRowCount; r++){
                let b = bricks[c][r];
                if(b.status>=1){
                    //当たり判定の計算
                    //ボールの座標xとyがbrickの座標WidthとHeightの範囲内に入ったら、反発する式
                    if( x-b.x-ballRadius<=2 && x-b.x+brickWidth+ballRadius<=2 && y-b.y-ballRadius<=2 && b.y+brickHeight+ballRadius-y<=2 ){
                        dy = -dy;
                        dx = -dx;
                        b.status -= 1;
                        score+=30;
                    }else if( b.x-ballRadius<=x && x<=b.x+brickWidth+ballRadius && b.y-ballRadius<=y && y<=b.y+brickHeight+ballRadius ){
                        //ボールの接触時、ブロックの左端もしくは右端なら横に反発する式
                        if((x+ballRadius-b.x<=1||b.x+brickWidth-x+ballRadius<=1)&&(y<b.y-ballRadius||y<b.y+brickHeight+ballRadius)){
                            dx = -dx;
                            b.status -= 1;
                            score+=30;
                        }else{
                            switch(y){
                                case y-b.y-ballRadius>1: y = b.y-ballRadius-2;
                                break;
                                case (b.y+brickHeight+ballRadius)-y>2: y = b.y+ballRadius+brickHeight+2;
                                break;
                                //ボール接触時、ブロックの右端か左端、
                                //もしくはブロックの高さ(b.y)の範囲外からの接触であれば縦に反発
                            }
                            dy = -dy;
                            b.status -= 1;
                            score+=30;
                        }
                    }
                    
                }
            }
        }
    }

    
    let interval = setInterval(drow, 7);

    

}


