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

  checkAnswer(id){
    this.goNext = true;
    const correctId = this.questions[this.currentQuestionId].correct;
    this.onBtnStateChanged(this.goNext);
    if(id !== correctId) return;
    this.correct ++;
  }

  answerFinished(){
    this.goNext = false;
    this.currentQuestionId ++;
    this.leftNum --;
    if(this.currentQuestionId > 3){
      console.log("Finished");
      this.isFinished = true;
    }
    this.onBtnStateChanged(this.goNext);
    this.onQuestionsLoaded(this.questions[this.currentQuestionId], this.leftNum, this.isFinished, this.correct);
  }


  bindAddQuestionToDom(callback){
    this.onQuestionsLoaded = callback;
  }

  bindChangeBtnState(callback){
    this.onBtnStateChanged = callback;
  }


}

export default Model;
