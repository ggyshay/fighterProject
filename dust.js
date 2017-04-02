var fire = [];

function Dust(pos, vel) {
  fire.push(color(255,201,14));
  fire.push(color(255,242,0));
  fire.push(color(237,28,36));
  fire.push(color(255,127,39));
  fire.push(color(248,80,7));
  fire.push(color(233,54,22));

  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(random(0.5, 1.5)));
  this.transparency = random(200, 255);

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.mult(0.98);
    this.transparency -= 2;
  }

  this.render = function() {
    if (this.transparency > 0) {
      var r = random(0,6);
      r = floor(r);
      stroke(red(fire[r]),green(fire[r]), blue(fire[r]),this.transparency);
      point(this.pos.x, this.pos.y);
    }
  }
}

function addDust(pos, vel, n) {
  for (var i = 0; i < n; i++) {
    dust.push(new Dust(pos, vel));
  }
}
