var Ball = require('./ball');

var msg= "0:0";
var targetPos = {x:0, y:0};



function getMousePos(ctx,e){
  var canvasBox = this.canvas.getBoundingClientRect();
  return {x: e.clientX - canvasBox.left, y: e.clientY -canvasBox.top};
}



var Game = function(ctx,canvas){
  this.ctx = ctx;
  this.canvas = canvas;
  this.balls = [];
  this.makeBalls(1000);
  this.canvas.addEventListener('mousemove',
  function(e){this.handleMouseMove(ctx,e);}.bind(this), false);



};


Game.prototype.handleMouseMove = function(ctx, e){
  var mousePos = getMousePos(ctx,e);
  msg = "" + mousePos.x + " : " + mousePos.y;
  targetPos = mousePos;
};



Game.prototype.makeBalls = function(num){
  for(var i = 0; i<num;i++){
    var pos = {x:Math.random()*this.ctx.width, y:Math.random()*this.ctx.height};
    var vel = {x:10, y:10};
    var radius =  10;
    var density = 1;
    var newBall = new Ball(i+1, radius, density, pos, vel);
    this.balls.push(newBall);
  }

};

Game.prototype.cursorPos = function(ctx){

  ctx.save();
  ctx.font = "20px Georgia";
  ctx.fillText(msg,10,20);
  ctx.restore();
};




Game.prototype.render = function(ctx){

  this.balls.forEach(function(ball){ball.render(ctx,this.balls);}.bind(this));

};

Game.prototype.draw = function(ctx){

  this.cursorPos(ctx);
  this.balls.forEach(function(ball){ball.draw(ctx);});
};





Game.prototype.animate = function(){
  this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
  this.render(this.ctx);
  this.draw(this.ctx);
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = Game;
