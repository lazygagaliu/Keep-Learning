import View from "./src/View.js";

class App {
  constructor(view){
    this.view = view;
  }
}

const app = new App(new View());
