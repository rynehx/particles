var Util = require('./util');

var Ball = function(id, radius, density, pos, vel){
  this.id = id;
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.mass = Math.PI*(radius*radius)*density;
};


Ball.prototype.render = function(ctx,balls){

  this.pos.x+=this.vel.x;
  this.pos.y+=this.vel.y;
  this.vel.y+=1;


  balls.forEach(function(ball){
    if(ball.id!==this.id){
    Util.checkCollison(this, ball);
    }
  }.bind(this));
  Util.checkBounds(this,ctx);
};




Ball.prototype.draw = function(ctx){
  ctx.save();
  ctx.beginPath();

  ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
  ctx.fill();
    // ctx.fillStyle = "white";
    // ctx.font = "20px serif";
  // ctx.fillText(this.id,this.pos.x,this.pos.y);

  ctx.restore();
};

module.exports = Ball;
