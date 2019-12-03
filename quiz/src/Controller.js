class Controller {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    this.model.bindAddQuestionToDom(this.onQuestionsLoaded);
    this.model.bindChangeBtnState(this.onBtnStateChanged);
    this.model.bindAnswerChecked(this.onAnsweredChecked);
    this.model.bingChangeBtnText(this.onBtnTextChanged);

    this.view.bindCheckAnswer(this.handleCheckAnswer);
    this.view.bindAnswerFinished(this.handleAnswerFinished, this.handleResetQuestions);
  }

  onQuestionsLoaded = (question, leftNum, isFinished, correct) => {
    this.view.showQuestion(question, isFinished, correct);
    this.view.showLeftQuestion(leftNum);
  }

  onBtnStateChanged = goNext => {
    this.view.changeBtnState(goNext);
  }

  onAnsweredChecked = (el, result) => {
    this.view.showRightorWrong(el, result);
  }

  onBtnTextChanged = () => {
    this.view.changeBtnText();
  }

  handleCheckAnswer = (el, id) => {
    this.model.checkAnswer(el, id);
  }

  handleAnswerFinished = () => {
    this.model.answerFinished();
  }

  handleResetQuestions = () => {
    this.model.resetQuestions();
  }

}

export default Controller;
