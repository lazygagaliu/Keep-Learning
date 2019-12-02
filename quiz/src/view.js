class View {
  constructor () {
    this.app = this.getElement("#app");

    this.question = this.createElement("div", {className: "question"}, this.app);

    this.status = this.createElement("div", {className: "status"}, this.app);
    this.btn = this.createElement("button", {disabled: "true", textContent: "Next"}, this.status);
  }

  createElement(element, attributes, parent, sibling){
    const el = document.createElement(element);
    if(attributes){
      this.setAttributes(el, attributes);
    }
    if(sibling){
      parent.insertBefore(el, sibling);
    }else {
      parent.appendChild(el);
    }
    return el;
  };

  setAttributes(el, attributes){
    for(let key in attributes){
      el[key] = attributes[key];
    }
  }

  getElement(element){
    const el = document.querySelector(element);
    return el;
  }

  showQuestion = (question, isFinished, correct) => {
    while (this.question.firstChild)
      this.question.removeChild(this.question.firstChild);


    if(isFinished){
      this.title = this.createElement("h3", {className: "title", textContent: `You've got ${correct} question(s) right!`}, this.question);
    }else{
      this.title = this.createElement("h3", {className: "title", textContent: question.title}, this.question);
      question.answers.forEach(answer => {
        this.createElement("div", {className: "answer", textContent: answer.answer, value: answer.id}, this.question);
      });
    }
  }


  showLeftQuestion = (leftNum) => {
    if(!this.left){
      this.left = this.createElement("div", {className: "left", textContent: `Left Questions: ${leftNum}`}, this.status);
    }else {
      this.left.textContent = `Left Questions: ${leftNum}`;
    }
  }

  changeBtnState(goNext){
    this.btn.disabled = !goNext;
  }

  bindCheckAnswer(handler){
    this.question.addEventListener("click", e => {
      handler(e.target.value);
    });
  }

  bindAnswerFinished(handler){
    this.btn.addEventListener("click", e => {
      handler();
    });
  }

}

export default View;
