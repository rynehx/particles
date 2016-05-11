/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('canvas');
	canvas.width = "1000";
	canvas.height = "700";
	var c = canvas.getContext('2d');
	c.width = 1000;
	c.height = 700;
	var Game = __webpack_require__(1);








	document.addEventListener("DOMContentLoaded", function(){

	  var game = new Game(c,canvas);
	  game.animate();

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Ball = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Util = {
	  checkBounds: function(obj,ctx){

	    var inelasticCoeff = 0.5;

	    if(Math.abs(obj.vel.y)<0.1){
	      obj.vel.y=0;
	    }


	    if((obj.pos.x +obj.radius)>ctx.width){
	      obj.pos.x=ctx.width-obj.radius*1.001;
	      obj.vel.x=-obj.vel.x*inelasticCoeff ;
	    }
	    if((obj.pos.x -obj.radius)<0) {
	      obj.pos.x=0+obj.radius*1.001;
	      obj.vel.x=-obj.vel.x*inelasticCoeff;
	    }
	    if((obj.pos.y +obj.radius)>ctx.height){
	      obj.pos.y=ctx.height-obj.radius*1.001;
	      obj.vel.y=-obj.vel.y*inelasticCoeff;
	    }
	    if((obj.pos.y -obj.radius)<0){
	      obj.pos.y=0+obj.radius*1.001;
	      obj.vel.y=-obj.vel.y*inelasticCoeff;

	    }

	  },

	  checkCollison : function(ball1,ball2){
	    var objDistance = Math.sqrt(Math.pow(ball1.pos.x-ball2.pos.x,2)+Math.pow(ball1.pos.y-ball2.pos.y,2));
	    var check = objDistance  < ball1.radius+ ball2.radius;


	     if( check ){
	       var diff = ball1.radius+ ball2.radius - objDistance;
	       var mag = Math.sqrt(Math.pow(ball1.pos.x-ball2.pos.x,2) + Math.pow(ball1.pos.y-ball2.pos.y,2));
	       var distance = {x: Math.abs(ball1.pos.x - ball2.pos.x)/(mag)*diff, y: Math.abs(ball1.pos.y-ball2.pos.y)/(mag)*diff};


	       var distCoeff = 0.51;

	       if(ball1.pos.x > ball2.pos.x){
	         ball1.pos.x+=distance.x*distCoeff;
	         ball2.pos.x-=distance.x*distCoeff;
	       }else{
	         ball1.pos.x-=distance.x*distCoeff;
	         ball2.pos.x+=distance.x*distCoeff;
	       }

	       if(ball1.pos.y > ball2.pos.y){
	         ball1.pos.y+=distance.y*distCoeff;
	         ball2.pos.y-=distance.y*distCoeff;
	        }else{
	         ball1.pos.y-=distance.y*distCoeff;
	         ball2.pos.y+=distance.y*distCoeff;
	       }

	       this.enforceCollison(ball1,ball2);
	     }



	  },

	  enforceCollison: function(ball1,ball2){
	    var inelasticCoeff = 0.8;
	      var massCoeff1 = (2*ball2.mass)/(ball1.mass+ball2.mass);
	      var massCoeff2 = (2*ball1.mass)/(ball1.mass+ball2.mass);

	      var velvec1 = [(ball1.vel.x - ball2.vel.x), (ball1.vel.y-ball2.vel.y)];
	      var posvec1 = [(ball1.pos.x - ball2.pos.x), (ball1.pos.y - ball2.pos.y)];

	      var velvec2 = [(ball2.vel.x - ball1.vel.x), (ball2.vel.y - ball1.vel.y)];
	      var posvec2 = [(ball2.pos.x - ball1.pos.x), (ball2.pos.y - ball1.pos.y)];

	      var dot1 = this.dotProduct(velvec1, posvec1);
	      var dot2 = this.dotProduct(velvec2, posvec2);
	      var magnitude1 = this.magnitude(ball1.pos,ball2.pos);
	      var magnitude2 = this.magnitude(ball2.pos,ball1.pos);


	      var v1x = ball1.vel.x - (massCoeff1)*(dot1)/(magnitude1)*(ball1.pos.x - ball2.pos.x);
	      var v2x = ball2.vel.x - (massCoeff2)*(dot2)/(magnitude2)*(ball2.pos.x - ball1.pos.x);
	      var v1y = ball1.vel.y - (massCoeff1)*(dot1)/(magnitude1)*(ball1.pos.y - ball2.pos.y);
	      var v2y = ball2.vel.y - (massCoeff2)*(dot2)/(magnitude2)*(ball2.pos.y - ball1.pos.y);

	      // return {v1: {x: v1x, y: v1y}, v2: {x: v2x, y: v2y} };
	      ball1.vel.x = v1x*inelasticCoeff;
	      ball1.vel.y = v1y*inelasticCoeff;
	      ball2.vel.x = v2x*inelasticCoeff;
	      ball2.vel.y = v2y*inelasticCoeff;

	  },

	  dotProduct: function(vec1,vec2){
	    return ((vec1[0] * vec2[0]) + (vec1[1] * vec2[1]));
	  },

	  magnitude: function(pos1,pos2){
	    var final = [(pos1.x-pos2.x), (pos1.y-pos2.y)];
	    return Math.pow(final[0],2) + Math.pow(final[1],2);
	  }


	};

	module.exports = Util;


/***/ }
/******/ ]);