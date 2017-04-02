function Shot(){
  this.pos = createVector(mouseX, mouseY);
  this.spd = createVector(13, 0);

  this.render = function(){
    noFill();
    stroke(255);
    ellipse(this.pos.x, this.pos.y, 3, 3);
  }

  this.move = function(){
    this.pos.add(this.spd);
  }

  this.collide = function(x, y, l, h, e){
    if((this.pos.x < x + h + 3) && (this.pos.y < y + (this.pos.x - x + 3) *(l*0.5/h)) && (this.pos.y > y - (l*0.5/h)* (this.pos.x - x - 3)) && e)return true;
    else return false;
  }
}
