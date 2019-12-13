import Snake from "./snake.js";

class View {
  constructor(){
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = document.querySelector("#score");
    this.highestScore = document.querySelector("#highestScore");

    this.snake = new Snake(this);

    this.render();
  }

  render(){
    this.snake.update();
  }
}

export default View;
