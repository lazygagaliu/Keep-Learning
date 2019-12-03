class Model {
  constructor () {
    fetch("../asset/questions.json").then(res => res.json()).then(res => {
      this.questions = res.questions;
      this.leftNum = this.questions.length;
      this.onQuestionsLoaded(this.questions[this.currentQuestionId], this.leftNum);
    });

    this.currentQuestionId = 0;
    this.correct = 0;

    this.goNext = false;
    this.isFinished = false;

  }

  checkAnswer(el, id){
    this.goNext = true;
    this.onBtnStateChanged(this.goNext);
    const result = this.getAnsweredResult(id);
    this.onAnsweredChecked(el, result);
  }

  getAnsweredResult(id){
    const correctId = this.questions[this.currentQuestionId].correct;
    if(id !== correctId){
      return "wrong";
    }else{
      this.correct ++;
      return "right";
    }
  }

  answerFinished(){
    this.goNext = false;
    this.currentQuestionId ++;
    this.leftNum --;
    if(this.currentQuestionId > 3){
      this.goNext = true;
      this.isFinished = true;
      this.onBtnTextChanged();
    }
    this.onBtnStateChanged(this.goNext);
    this.onQuestionsLoaded(this.questions[this.currentQuestionId], this.leftNum, this.isFinished, this.correct);
  }

  resetQuestions(){
    this.currentQuestionId = 0;
    this.leftNum = this.questions.length;
    this.correct = 0;
    this.goNext = false;
    this.isFinished = false;
    this.onBtnTextChanged();
    this.onBtnStateChanged(this.goNext);
    this.onQuestionsLoaded(this.questions[this.currentQuestionId], this.leftNum, this.isFinished, this.correct);
  }

  bindAddQuestionToDom(callback){
    this.onQuestionsLoaded = callback;
  }

  bindChangeBtnState(callback){
    this.onBtnStateChanged = callback;
  }

  bindAnswerChecked(callback){
    this.onAnsweredChecked = callback;
  }

  bingChangeBtnText(callback){
    this.onBtnTextChanged = callback;
  }


}

export default Model;
