import Model from "./model.js";

class Controller {
    constructor(model, view){
      this.model = model;
      this.view = view;

      this.model.bindShowPlayerOption(this.onPlayerOptionChange);
      this.model.bindShowRecord(this.onRecordChange);
      this.model.bindShowResult(this.onGameFinished);

      this.view.bindPlayerOption(this.handlePlayerOption);
      this.view.bindResetGame(this.handleReset);
    }

    onPlayerOptionChange = (option, prevOption, aiOption) => {
      this.view.showPlayerOption(option, prevOption);
      this.view.showAiOption(aiOption);
    }

    onRecordChange = (playerWins, aiWins) => {
      this.view.showRecord(playerWins, aiWins);
    }

    onGameFinished = (playerWins, aiWins) => {
      this.view.showWinner(playerWins, aiWins);
      this.view.showResult();
    }


    handlePlayerOption = (option, prevOption) => {
      this.model.setAiOption();
      this.model.getPlayerOption(option, prevOption);

      this.model.setRoundWinner();

      this.model.goNextRound();

      this.model.onStateChanged();
    }

    handleReset = () => {
      this.model.init();
      this.model.onStateChanged();
      this.view.showRestart();
    }

}

export default Controller;
