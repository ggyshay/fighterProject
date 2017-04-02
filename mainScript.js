var mountains = [];
var ship;
var shots = [];
var dust = [];
var enemies = [];
var points = [];
var hiScoreBar;
var newScore = false;

var fat = 100;

var score = 0;
var fscore = 0;

var flash;

var mouseP;

var m;
var mlength = 120;
var degrade = 70;

var it = 0;

function setup(){
  createCanvas(900, 500);
  flash = color(255, 0, 100, 160);
  for(var i = 0; i < mlength; i++){
    m = new Mountain(random(60, height*0.4), random(70, 100), random(0, 3*width), map(i, 0, mlength, 120, 20));//
    mountains.push(m);
  }

  mouseP = createVector(mouseX, mouseY);

  ship = new Ship();
  hiScoreBar = new HiScoreBar();
  //mountain = new Mountain(50, 20, width/2, 60);

}

function draw(){
  background(150);

  if(ship.alive){
    noCursor();
  }
  else{
    cursor();
  }

  for(var i = 0; i<degrade; i++){
    noStroke();
    fill(50,50,50,5);
    rect(0, 0, width, i*height/degrade);
  }

  for(var i = 0; i < mountains.length; i++){
    if(score < 8000){
      mountains[i].move(1+score/1000);
    }
    else{
      mountains[i].move(9);
    }

    mountains[i].render();
    mountains[i].check();
  }
  if(ship.alive){ship.render();}

  for(var i = 0; i < enemies.length; i++){
    if(enemies[i].alive){
      enemies[i].seek(ship.h, ship.alive);
      enemies[i].move();
      enemies[i].render();
      if(ship.alive){
        if(enemies[i].collide(ship.l, ship.h)){
          ship.alive = false;
          newScore = true;
          addDust(mouseP, ship.spd, random(20, 25));
        }
      }
    }
  }


  mouseP.x = mouseX;
  mouseP.y = mouseY;


  for(var i = 0; i<shots.length; i++){
    if(shots[i].pos.x > 0 && shots[i].pos.x < width && shots[i].pos.y > 0 && shots[i].pos.y < height){
    shots[i].render();
    shots[i].move();
    for(var j = 0; j < enemies.length; j++){
      if(shots[i].collide(enemies[j].pos.x, enemies[j].pos.y, enemies[j].l, enemies[j].h, enemies[j].alive)){
        enemies[j].alive = false;
        addDust(enemies[j].pos, enemies[j].spd, random(20, 25));
        fscore = floor(enemies[j].pos.x);
        points.push(new Point(enemies[j].pos.x, enemies[j].pos.y, fscore));
        score += floor(enemies[j].pos.x );
      }
    }

    }
  }

  for(var i = 0; i < points.length; i++){
    points[i].render();
  }

  for(var i = 0; i < dust.length; i++){
    if(dust[i].transparency > 10){
      dust[i].update();
      dust[i].render();
    }
  }

  if(shots.length > 50){
    cleanShots(shots);
  }
  if(dust.length > 50){
    cleanDust(dust);
  }
  if(enemies.length > 25){
    cleanEnemies(enemies);
  }

  fat = 10 + 112500/(score + 1250);
  fat = floor(fat);

  if(it% fat == 0){
    enemies.push(new Enemy());
  }

  noStroke();
  fill(255);
  text(score, width/2-10, 20);

  if(!ship.alive){
    noStroke();
    fill(red(flash), green(flash), blue(flash), alpha(flash));
    rect(width/2 - 44, height/2 - 23, 90, 30, 20,20);

    noStroke();
    fill(255);
    if(newScore){
      hiScoreBar.newValue(score);
    }
    text("START", width/2-20, height/2-4);
  }

  hiScoreBar.render();
  it++;
}

function mouseClicked(){
  if(ship.alive){
    ship.shoot();
  }
  else{
    if(mouseX > width/2 - 44 && mouseX < width/2 + 46 && mouseY > height/2 - 23 && mouseY < height/2 + 7){
      reset();
    }
  }
  flash = color(255, 0, 100, 160);
}

function cleanShots(shots){
  var j = 0;
  for(var i = 0; i < shots.length; i++){
    if(shots[i].pos.x > 0 && shots[i].pos.x < width && shots[i].pos.y > 0 && shots[i].pos.y < height){
      shots[j] = shots[i];
      j++;
    }
  }
  while(shots.length > j){
    shots.pop();
  }
}

function cleanDust(dust){
  var j = 0;
  for(var i = 0; i < dust.length; i++){
    if(dust[i].pos.x > 0 && dust[i].pos.x < width && dust[i].pos.y > 0 && dust[i].pos.y < height && dust[i].transparency > 10){
      dust[j] = dust[i];
      j++;
    }
  }
  while(dust.length > j){
    dust.pop();
  }
}

function cleanEnemies(enemies){
  var j = 0;
  for(var i = 0; i < enemies.length; i++){
    if(enemies[i].pos.x > 0 && enemies[i].pos.x < width && enemies[i].pos.y > 0 && enemies[i].pos.y < height){
      enemies[j] = enemies[i];
      j++;
    }
  }
  while(enemies.length > j){
    enemies.pop();
  }
}

function reset(){
  dust = [];
  enemies = [];
  score = 0;
  it = 0;
  ship.alive = true;
  fat = 100;
  flash = color(160, 160, 160, 160);
  newScore = false;
}

function Point(x, y, n){
  this.transparency = 255;
  this.x = x;
  this.y = y;
  this.n = n;
  this.render = function(){
    noStroke();
    fill(255, 255, 255, this.transparency);
    text("+"+n, this.x, this.y);
    this.transparency-=10;
  }
}

function HiScoreBar(){
  this.scores = [0, 0, 0, 0, 0];

  this.newValue = function(val){
    for(var i = 0; i < 5; i++){
      if(val > this.scores[i]){
        this.slide(i);
        this.scores[i] = val;
        newScore = false;
        break;
      }
    }
  }

  this.slide = function(k){
    for(var i = 4; i > k; i--){
        this.scores[i] = this.scores[i-1];
    }
  }

  this.render = function(){
    for(var i = 0; i < 5; i++){
      if(this.scores[i] != 0){
        fill(255);
        text(i+1 + ".  " + this.scores[i], 12 + 100*(i), height - 7);

        noStroke();
        fill(255, 255, 255, 90);
        rect(5 + 100*(i), height - 18, 70, 15, 20, 20);
      }
    }
  }
}
