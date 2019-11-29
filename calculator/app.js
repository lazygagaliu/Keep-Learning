// Model
const data = {
  result: null,
  show: "0",
  prevOp: null,
  nextOp: null,
  resetAll: () => {
    data.result = null;
    data.show = "0";
    data.prevOp = null;
    data.nextOp = null;
    display();
  },
  reset: () => {
    data.show = "0";
    data.prevOp = null;
    data.nextOp = null;
    display();
  }
};

// Numbers
const elsNum = [
  {el: "#one", num: "1"}, {el: "#two", num: "2"}, {el: "#three", num: "3"},
  {el: "#four", num: "4"}, {el: "#five", num: "5"}, {el: "#six", num: "6"},
  {el: "#seven", num: "7"}, {el: "#eight", num: "8"}, {el: "#nine", num: "9"},
  {el: "#zero", num: "0"}, {el:"#dot", num: "."}
];

// Operators
const elsOp = [
  {el: "#add", op: "+"}, {el: "#subtract", op: "-"}, {el: "#multi", op: "x"}, {el: "#divide", op: "/"},
  {el: "#equal", op: "="}
];

// View
const display = () => {
  document.querySelector(".result").textContent = data.show;
};

// Get computed result
const getResult = (num, op) => {
  const number = Number(num);
  switch (op) {
    case "+":
    data.result += number;
    break;
    case "-":
    data.result -= number;
    break;
    case "x":
    data.result *= number;
    break;
    case "/":
    data.result /= number;
    break;
    case "=":
    data.result = data.result;
    break;
    default:
    data.result = number;
  }
  console.log("result ", data.result);
};

// Add Listeners
const addOpListener = (el, op) => {
  document.querySelector(el).addEventListener("click", e => {
    if(!data.prevOp){
      data.prevOp = op;
    }else {
      data.prevOp = data.nextOp;
    }
    getResult(data.show, data.prevOp);
    data.nextOp = op;
    data.show = data.result;
    display();
    data.show = "";
  });
};

elsOp.forEach( el => addOpListener(el.el, el.op) );

const addNumListener = (el, num) => {
  document.querySelector(el).addEventListener("click", e => {
    if(data.show === "0"){
      data.show = "";
    }
    data.show += num;
    display();
  });
};

elsNum.forEach( el => addNumListener(el.el, el.num) );

document.querySelector("#resetAll").addEventListener("click", e => {
  data.resetAll();
});
document.querySelector("#reset").addEventListener("click", e => {
  data.reset();
});
