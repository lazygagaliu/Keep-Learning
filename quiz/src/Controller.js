class Controller {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    this.model.bindAddQuestionToDom(this.onQuestionsLoaded);
    this.model.bindChangeBtnState(this.onBtnStateChanged);

    this.view.bindCheckAnswer(this.handleCheckAnswer);
    this.view.bindAnswerFinished(this.handleAnswerFinished);
  }

  onQuestionsLoaded = (question, leftNum, isFinished, correct) => {
    this.view.showQuestion(question, isFinished, correct);
    this.view.showLeftQuestion(leftNum);
  }

  onBtnStateChanged = (goNext) => {
    this.view.changeBtnState(goNext);
  }

  handleCheckAnswer = (id) => {
    this.model.checkAnswer(id);
  }

  handleAnswerFinished = () => {
    this.model.answerFinished();
  }

}

export default Controller;
