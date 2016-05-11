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
