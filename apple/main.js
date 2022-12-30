var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = window.innerHeight;

var appleimg= new Image();
var rottenappleimg= new Image();
var basketimg= new Image();
appleimg.src='appleimg.png';
rottenappleimg.src='rottenappleimg.png';
basketimg.src='basketimg.png';

ctx.font ="30pt Fira";
ctx.fillStyle = 'pink';
ctx.strokeStyle = 'black';
ctx.lineWidth=4;
ctx.strokeText(" space 누르면 시작", 185, 500);
ctx.fillText(" space 누르면 시작", 185, 500);

var basket = {
  x:325,
  y:500,
  width:80,
  height:50,
  draw(){
    //ctx.fillStyle = 'green';
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(basketimg, this.x, this.y, this.width, this.height);
  }
}

class Apple{
  constructor(){
    const random = Math.floor(Math.random()*611)+20;
    this.x=Math.floor(Math.random()*611)+20;
    this.y=150;
    this.width=50;
    this.height=60;
    this.level=Math.floor(Math.random()*4)+1;
  }
  draw(){
    //ctx.fillStyle='red';
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(appleimg, this.x, this.y, this.width, this.height);
  }
}

class Rotten{
  constructor(){
    this.x=Math.floor(Math.random()*611)+20;;
    this.y=150;
    this.width=50;
    this.height=60
    this.level=Math.floor(Math.random()*4)+5;
  }
  draw(){
    //ctx.fillStyle='blue';
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(rottenappleimg, this.x, this.y, this.width, this.height);
  }
}

var timer=0;
var apples = [];
var rottens = [];
var animation;
var cnt=0;
var collision=false;
var start=false;


function runFrame(){
  animation=requestAnimationFrame(runFrame);
  if(start==true){
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height);

    ctx.lineWidth=1;
    ctx.font ="40pt Fira";
    ctx.fillStyle = 'powderblue';
    ctx.strokeStyle = 'black';
    ctx.fillText(cnt, 325, 130);
    ctx.strokeText(cnt, 325, 130);

    if(timer % 60===0){
      var apple = new Apple();
      apples.push(apple);
    }
    if(timer % 100===0){
      var rotten = new Rotten();
      rottens.push(rotten);
    }

    apples.forEach((a, i, o) => {
      if(a.y>500){
        o.splice(i, 1)
      }
      a.y+=a.level;
      a.draw();

      colApple(basket, a);
      if(collision == true){
        cnt+=a.level*10;
        o.splice(i,1);
        collision=false;
      }

      ctx.lineWidth=1;
      ctx.strokeText(a.level*10, a.x-5, a.y);
    })

    rottens.forEach((r, i, o) => {
      if(r.y>500){
        o.splice(i, 1)
      }
      r.y+=r.level;

      colRotten(basket, r);
      r.draw();
    })

    if(right == true){
      basket.x+=5;
      right=false;
    }
    if(left == true){
      basket.x-=5;
      left=false;
    }
    basket.draw();
  }
}

runFrame()

function colRotten(basket, Rotten){
  var xgap = (basket.x + basket.width/2) - (Rotten.x + Rotten.width/2);
  var ygap = (basket.y) - (Rotten.y + Rotten.height);
  if(xgap < 40 && xgap > -40 && ygap <= 0){
     ctx.clearRect(0,0, canvas.width, canvas.height);
     cancelAnimationFrame(animation);
     ctx.font ="100pt Fira";
     ctx.fillStyle = 'pink';
     ctx.strokeStyle = 'black';
     ctx.lineWidth = 5;
     ctx.strokeText(cnt, 290, 250);
     ctx.fillText(cnt, 290, 250);
  }
}

function colApple(basket, Apple){
  var xgap = (basket.x + basket.width/2) - (Apple.x + Apple.width/2);
  var ygap = (basket.y) - (Apple.y + Apple.height);
  if(xgap < 40 && xgap > -40 && ygap <= 0){
      collision=true;
  }
}

var right = false;
var left = false;
document.addEventListener('keydown', function(e){
  if (e.code === 'Space'){
    start = true;  }
})
document.addEventListener('keydown', function(e){
  if (e.code === 'ArrowRight'){
    right = true;  }
})
document.addEventListener('keydown', function(e){
  if (e.code === 'ArrowLeft'){
    left = true;  }
})
