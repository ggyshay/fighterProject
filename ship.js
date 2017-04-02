function Ship(){
  this.pos = createVector(30, width/2);
  this.h = 30;
  this.l = 20;
  this.alive = false;
  this.spd = createVector(-12, 0.5)

  this.render = function(){
    noStroke();
    fill(200, 0, 80);
    triangle(mouseX, mouseY, mouseX - this.h, mouseY + this.l/2, mouseX - this.h, mouseY - this.l/2);
  }

  this.shoot = function(){
    s = new Shot();
    shots.push(s);
  }
}
