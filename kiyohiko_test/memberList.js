// ------------------------------------------------------------
//�L�����o�X�̐���
const ca = document.createElement("canvas");//canvas�G�������g����
document.body.appendChild(ca);          //id="ca"��BODY�̃m�[�h���X�g�ɓo�^����
// CanvasRenderingContext2D �I�u�W�F�N�g���擾����
const ctx = ca.getContext("2d");

let slimeX =0;
let slimeY =0;

//�摜�t�@�C���̒�`
let slimeImg = new Image();
slimeImg.src = "slime545x460.png";

let keshiki = new Image();
keshiki.src = "a5ab38d00c3e1fec6364d59d43aebc7cfb1c10f9.png";

window.onload = function(){
// ------------------------------------------------------------
//�L�����o�X�̃T�C�Y��ݒ肷��
ca.width  = 320;
ca.height = 240;

// ------------------------------------------------------------
// �X�^�C���V�[�g�̃T�C�Y��ύX����
var style = ca.style;
style.width  = (700) + "px";
style.height = (465) + "px";

// ------------------------------------------------------------
// �`��

function draw(){
    /*
    ctx.beginPath();
    ctx.rect(  0 ,  0 , 640 , 480 );
    ctx.fill();
    ctx.stroke();
    //�摜��draw�`��
    slimeImgDraw();
    */
    ctx.drawImage(keshiki,0,0,700,465,0,0,700,465);
    slimeImgDraw();
}


let slimeImgDraw =()=>{
    ctx.drawImage(slimeImg,160,110,225,225,slimeX,slimeY,60,55);
}

document.addEventListener('keypress', keypress_ivent);
function keypress_ivent(e){
    //�����������Ƃ�
    if(e.key==='a' || e.key==='A' || e.key == "ArrowLeft"){
    slimeX-=3;
    }
    //�E���������Ƃ�
    if(e.key==='d' || e.key==='D' || e.key == "ArrowRight"){
        slimeX+=3;
    }
    //�����������Ƃ�
    if(e.key==='s' || e.key==='S' || e.key == "ArrowDown"){
        slimeY+=3;
    }
    //����������Ƃ�
    if(e.key==='w' || e.key==='W' || e.key == "ArrowUp"){
        slimeY-=3;
    }
}

let play = setInterval(draw, 10);
play();


}