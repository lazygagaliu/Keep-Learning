import Model from "./src/model.js";
import View from "./src/view.js";
import Controller from "./src/controller.js";

const app = new Controller(new Model(), new View());
console.log(app);
