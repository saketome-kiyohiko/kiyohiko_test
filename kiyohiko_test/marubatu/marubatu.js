window.addEventListener( "load", loadFunc, false );
function loadFunc() {  
    
    var canvas = document.getElementById( "stage" );
    var ctx = canvas.getContext( "2d" );
    let x = canvas.width/2;
    let y = canvas.height-200;
    let ballRadius = 50;

    function drowBall(){
        ctx.beginPath();                        //描画宣言
        ctx.arc(0, 0, ballRadius, 0, Math.PI*2);//玉のサイズや形を描画
        ctx.fillStyle = "#F000FF";              //色を定義
        ctx.fill();                             //描画
        ctx.closePath();                        //描画終了宣言
    }
    drowBall();
}
