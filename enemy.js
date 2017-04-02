
function Enemy(){
  this.pos = createVector(width, random(0, height));
  this.spd = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
  this.h = 30;
  this.l = 20;
  this.alive = true;

  this.render = function(){
    noStroke();
    fill(0);
    triangle(this.pos.x, this.pos.y, this.pos.x + this.h, this.pos.y + this.l/2, this.pos.x + this.h, this.pos.y - this.l/2);
  }

  this.seek = function(h, ac){
    if(ac){
      var mg = mag(mouseX - this.pos.x + h , mouseY - this.pos.y);
      if(this.pos.x > mouseX){
        this.spd.x = mouseX - this.pos.x + h;
        this.spd.y = mouseY - this.pos.y;
        mg = mag(mouseX - this.pos.x + h , mouseY - this.pos.y);
      }
      else {this.spd.x = -8; this.spd.y = 0.01*(height/2 - this.pos.y); mg = mag(mouseX - this.pos.x + h , mouseY - this.pos.y);}

      if(this.pos.x > mouseX){
        this.spd.mult(10/mg);
      }
    }
    else if(this.pos.x > 10){
      this.spd.x = - this.pos.x;
      this.spd.y = 0.01*(height/2 - this.pos.y);
      mg = mag(this.spd.x, this.spd.y);
      this.spd.mult(10/mg);
    }
    else{
      this.spd.x = -10;
    }
  }

  this.collide = function(l, h){
    if((this.pos.x < mouseX + h) &&
        (this.pos.y < mouseY + (this.pos.x - mouseX) *(l*0.5/h)) &&
        (this.pos.y > mouseY - (l*0.5/h)* (this.pos.x - mouseX)) ||
        ((mouseX-this.pos.x) * (mouseX-this.pos.x) + (mouseY - this.pos.y) *(mouseY - this.pos.y) < 50)
      )return true;
    else return false;
  }

  this.move = function(){
    this.pos.add(this.spd);
  }
}
