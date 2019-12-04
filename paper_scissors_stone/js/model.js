class Model {
    constructor(){
      this.init();
    }

    init(){
      this.round = 1;
      this.roundWinner = null;
      this.finalWinner = null;

      this.playerWins = 0;
      this.aiWins = 0;

      // 0 = paper, 1 = scissors, 2 = stone
      this.playerOption = null;
      this.aiOption = null;

      this.playerOptionString = null;
      this.playerPreviousOptionString = null;
    }

    onStateChanged(){
      this.onPlayerOptionChange(this.playerOptionString, this.playerPreviousOptionString, this.aiOption);
      this.onRecordChange(this.playerWins, this.aiWins);

      this.playerPreviousOptionString = this.playerOptionString;

      if(this.checkGameover()){
        this.onGameFinished(this.playerWins, this.aiWins);
      }
    }

    getPlayerOption(option, prevOption){
      let playerOption;
      switch (option) {
        case "paper":
        playerOption = 0;
        break;
        case "scissors":
        playerOption = 1;
        break;
        case "stone":
        playerOption = 2;
        break;
      }
      this.playerOption = playerOption;
      this.playerOptionString = option;

    }

    getRandomNumForAi(){
      return Math.floor(Math.random() * 3);
    }

    setAiOption(){
      this.aiOption = this.getRandomNumForAi();
    }

    checkRoundWinner(){
      switch (this.playerOption) {
        case 0:
        if(this.aiOption === 1){
          return false;
        }else if(this.aiOption === 2){
          return true;
        }
        break;

        case 1:
        if(this.aiOption === 0){
          return true;
        }else if(this.aiOption === 2){
          return false;
        }
        break;

        case 2:
        if(this.aiOption === 0){
          return false;
        }else if(this.aiOption === 1){
          return true;
        }
        break;
      }
    }

    setRoundWinner(){
      if(this.checkRoundWinner()){
        this.roundWinner = "player";
        this.playerWins ++;
      }else if(this.checkRoundWinner() === undefined){
        this.roundWinner = "even";
      }else{
        this.roundWinner = "ai";
        this.aiWins ++;
      }
    }

    goNextRound(){
      this.round ++;
    }

    checkGameover(){
      if(this.round > 10){
        return true;
      }
    }

    bindShowPlayerOption(callback){
      this.onPlayerOptionChange = callback;
    }

    bindShowRecord(callback){
      this.onRecordChange = callback;
    }

    bindShowResult(callback){
      this.onGameFinished = callback;
    }

}

export default Model;
