window.onload=function(){
var c;
var canvas = document.querySelector("canvas");
c=document.querySelector("canvas");
c.width=innerWidth;
c.height=innerHeight;
c=c.getContext("2d");
var ballX=innerWidth/2; //x axis start postition
var ballY=innerHeight/2;//y axis start postition
var ballRadius=4;
var dx=1; //x velocity
var dy=1; //y velocity
var paddle1X=1, paddle1Y=innerHeight/2, paddle1WIDTH=5, paddle1HEIGHT=70;
var paddle2X=innerWidth-6, paddle2Y=innerHeight/2, paddle2WIDTH=5, paddle2HEIGHT=70;
var score1=0;
var score2=0;
var AI=0; // AI= 0 for multiplayer
window.addEventListener("mousemove",function(event) {
                        if (dx < 0) {
                          paddle1Y = event.clientY-paddle1HEIGHT/2;
                          event.preventDefault();
                        }
                        else {
                          paddle2Y = event.clientY-paddle2HEIGHT/2;
                          event.preventDefault();
                        }
                        });
canvas.addEventListener('touchmove', function(e){
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var touch = e.changedTouches[0];
        var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop ;
        e.preventDefault();
        if (dx < 0) {
          paddle1Y = touchY - paddle1HEIGHT/2;
        }
        else {
          paddle2Y = touchY - paddle2HEIGHT/2;
        }
});
function dealWithKeyboard(e) {
  if (e.keyCode == "81") { //q
    paddle1Y-=2;
  }
  else if (e.keyCode == "65"){ //a
    paddle1Y+=2;
  }
  if (e.keyCode == "38") { //arrow up
    paddle2Y-=2;
  }
  else if (e.keyCode == "40"){ //arrow down
    paddle2Y+=2;
  }
}
function reset(){ //reset game == center ball
  ballX=innerWidth/2; //center
  ballY=innerHeight/2; //center
  dx = 1; //reset speed
  dy = 1; //reset speed
}
function animate(){
requestAnimationFrame(animate);
c.clearRect(0,0,innerWidth,innerHeight); // x, y, innerWidth, innerHeight //clears canvas
c.beginPath(); //begin
c.arc(ballX, ballY, ballRadius, 0, Math.PI*2, false); //c.arc(x,y,r,startAngle,endAngle, drawCounterClockwise)
c.fill(); //fill inside
c.stroke();//stroke edges
c.beginPath(); //begin
c.fillRect(paddle1X,paddle1Y,paddle1WIDTH,paddle1HEIGHT); //x,y,width,height
c.beginPath(); //begin
c.fillRect(paddle2X,paddle2Y,paddle2WIDTH,paddle2HEIGHT); //x,y,width,height
c.fillText(score1, 100, 20); //score 1
c.fillText(score2, innerWidth-100, 20); //score 2
var gameColors=['red', 'green', 'blue', 'black', 'brown', '#741a1a', '#100F0F'];
var randomColor = gameColors[Math.floor(Math.random() * gameColors.length)]; //index random color
function paddle2Bounce(){
if (ballX+ballRadius > innerWidth){
  if (ballY >= paddle2Y && ballY <= paddle2Y + paddle2HEIGHT) {
      dx = -dx-0.3; //bounce/reverse ball back + make it faster 0.3
    c.fillStyle = randomColor;
   }
   else{
     score1++;
      reset();
   }
}
}
function paddle1Bounce(){
if (ballX-ballRadius < 0){
  if (ballY >= paddle1Y && ballY <= paddle1Y + paddle1HEIGHT) {
    dx = -dx+0.3; //bounce/reverse ball back + make it faster 0.3
    c.fillStyle = randomColor;
  }
  else{
    score2++;
    reset();
  }
}
}
function topBottomBounce(){
if(ballY+ballRadius > innerHeight || ballY-ballRadius < 0){
  dy = -dy; //bounce/reverse ball
}
}
function stayInCanvas(){
  if(paddle1Y+paddle1HEIGHT > innerHeight){
    paddle1Y=innerHeight-paddle1HEIGHT;
  }
  if(paddle1Y < 0){
    paddle1Y=0;
  }
  if(paddle2Y+paddle2HEIGHT > innerHeight){
     paddle2Y=innerHeight-paddle2HEIGHT;
     }
  if(paddle2Y < 0){
     paddle2Y=0;
     }
}
function AIPlayer(){
if(paddle2Y+paddle2HEIGHT/2 < ballY){
  paddle2Y+=AI;
}
else{paddle2Y-=AI;}
}
function moveBallXandYaxis(){
  ballX+=dx; //run ball in x axis
  ballY+=dy; //run ball in y axis
}
moveBallXandYaxis(); //moving ball in x and y axis
paddle1Bounce(); //bounce/reverse ball from paddle1
paddle2Bounce(); //bounce/reverse ball from paddle2
topBottomBounce(); //top and bottom bouncing/reversing ball
stayInCanvas(); //paddle1 Y axis can be only in canvas.height
AIPlayer(); //init AI player
} //end of animate(); function
 animate(); //init animate(); function
}; //end of onload function
