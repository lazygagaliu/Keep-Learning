import Apple from "./apple.js";

class Snake {
  constructor(view){
    this.highestScore = this.getScore() || 0;
    this.score = 0;
    this.view = view;
    this.count = 0;

    this.tile = 16;

    this.x = this.tile * 5;
    this.y = this.tile * 5;

    this.vx = this.tile;
    this.vy = 0;

    this.body = [];
    this.maxBody = 4;

    this.showHighestScore();
    this.addListeners();

    this.apple = new Apple();

    this.gameover = false;
  }

  update = () => {
    requestAnimationFrame(this.update);

    if(++this.count < 4 || this.gameover) return;
    this.count = 0;

    this.clearCanvas();
    this.createBody();
    this.drawBody("#fff");

    this.addApple();

    this.move();
    this.addTail();

    this.showScore();
    this.checkGameover();
    if(this.gameover){
      this.restart();
    }

  }

  clearCanvas(){
    this.view.ctx.clearRect(0, 0, this.view.canvas.width, this.view.canvas.height);
  }

  draw(color, x, y){
    this.view.ctx.fillStyle = color;
    this.view.ctx.fillRect(x, y, this.tile - 1, this.tile - 1);
  }

  createBody(){
    this.body.unshift({x: this.x, y: this.y});
    if(this.body.length > this.maxBody){
      this.body.pop();
    }
  }

  drawBody(color){
    this.body.forEach( body => this.draw(color, body.x, body.y));
  }

  checkHitBody(){
    const tails = this.body.slice(1);
    return tails.some( body => body.x === this.body[0].x && body.y === this.body[0].y );
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;
  }

  addTail(){
    if(this.apple.x === this.body[0].x && this.apple.y === this.body[0].y){
      this.maxBody ++;
      this.apple.qty = 0;
    }
  }

  addApple(){
    switch (this.apple.qty) {
      case 0:
      this.apple.setApplePosition(this.view.canvas.width, this.view.canvas.height, this.tile);
      this.apple.qty = 1;
      break;
    }
    this.draw("firebrick", this.apple.x, this.apple.y);
  }

  showScore(){
    this.score = this.body.length > 3 ? this.body.length - 4 : 0;
    this.view.score.textContent = this.score;
  }

  showHighestScore(){
    this.view.highestScore.textContent = this.highestScore;
  }

  checkGameover(){
    const x = this.body[0].x;
    const y = this.body[0].y;
    const hit = this.checkHitBody();

    if(x < 0 || y < 0 || x > this.view.canvas.width || y > this.view.canvas.height || hit){
      this.gameover = true;
    }
  }

  restart(){
    this.saveScore();
    location.reload();
  }

  keydown(e){
    switch (e.keyCode) {
      case 37:
      if(this.vy === 0) return;
      this.vx = - this.tile;
      this.vy = 0;
      break;
      case 38:
      if(this.vx === 0) return;
      this.vx = 0;
      this.vy = - this.tile;
      break;
      case 39:
      if(this.vy === 0) return;
      this.vx = this.tile;
      this.vy = 0;
      break;
      case 40:
      if(this.vx === 0) return;
      this.vx = 0;
      this.vy = this.tile;
      break;
    }
  }

  addListeners(){
    window.addEventListener("keydown", e => {
      this.keydown(e);
    })
  }

  getScore(){
    return localStorage.getItem("snakeScore");
  }

  saveScore(){
    if(this.score > this.highestScore){
      localStorage.setItem("snakeScore", this.score);
    }
  }

}

export default Snake;
