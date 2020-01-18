import View from "./src/view.js";

class App {
  constructor(view){
    this.view = view;
  }
}

const app = new App(new View());
