function Mountain(h, l, x, z){
  this.x = x;
  this.l = l;
  this.h = h;
  this.z = z;
  this.render = function(){
    noStroke();
    fill(z);
    triangle(this.x, height, this.x + this.l/2, height - this.h, this.x + this.l, height);
  }

  this.move = function(f){
    this.x -= f;
  }

  this.check = function(){
    if(this.x + this.l <= 0){
      this.x = width;
    }
  }
}
