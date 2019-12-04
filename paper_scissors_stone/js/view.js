class View {
    constructor(){
      this.options = this.getElement(".options");

      this.optionAll = document.querySelectorAll(".option");

      this.aiOption = this.getElement(".ai-option");

      this.playerRecord = this.getElement("#playerRecord");
      this.aiRecord = this.getElement("#aiRecord");

      this.resultWrapper = this.getElement(".result-wrapper")
      this.result = this.getElement("p");

      this.reset = this.getElement("#reset");
    }

    getElement(el){
      return document.querySelector(el);
    }

    showPlayerOption(option, prevOption){
      if(prevOption){
        let prevId = `#${prevOption}`;
        const prevSelectedOption = this.getElement(prevId);
        prevSelectedOption.classList.remove("selected");
      }

      if(option){
        const id = `#${option}`;
        const selectedOption = this.getElement(id);
        selectedOption.classList.add("selected");
      }else{
        for(let i = 0; i < this.optionAll.length; i++){
          this.optionAll[i].classList.remove("selected");
        }
      }
    }

    setAiOptionForDisplay(aiOption){
      switch (aiOption) {
        case 0:
        return "asset/paper.png";
        break;
        case 1:
        return "asset/scissors.png";
        break;
        case 2:
        return "asset/stone.png";
        break;
        default:
        return "";
      }
    }

    showAiOption(aiOption){
      const aiSrc = this.setAiOptionForDisplay(aiOption);
      this.aiOption.src = aiSrc;
    }

    showRecord(playerWins, aiWins){
       this.playerRecord.textContent = `${playerWins} `;
       this.aiRecord.textContent = `${aiWins} `;
    }

    showWinner(playerWins, aiWins){
      if(playerWins === aiWins){
        this.result.textContent = "Even!!!";
      }else if(playerWins > aiWins){
        this.result.textContent = "You Win!!!";
      }else{
        this.result.textContent = "You Lose...";
      }
    }

    showResult(){
      this.resultWrapper.style.display = "flex";
    }

    showRestart(){
      this.resultWrapper.style.display = "none";
    }

    bindPlayerOption(handler){
      this.options.addEventListener("click", e => {
        handler(e.target.id);
      });
    }

    bindResetGame(handler){
      this.reset.addEventListener("click", e => {
        handler();
      });
    }

}

export default View;
