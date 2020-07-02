class Player {
  constructor(name){
    this.name = name
    this.points = 0
  }

  play () {
    this.points += 1
  }
}

const scoreBoard = {
  el: document.querySelector('#result'),
  score: {},
  update: function (player) {
    player.play()
    this.score[player.name] = player.points
  },
  show: function () {
    const score = this.score
    let msg = ''
    for(let i in score){
      if(score.hasOwnProperty(i)){
        msg += `${i} : ${score[i]} `
      }
    }
    this.el.textContent = msg
  }
}

const init = () => {
  const home = new Player('home')
  const guest = new Player('guest')
  const callback = e => {
    if(e.keyCode === 49){
      scoreBoard.update(home)
    }else if(e.keyCode === 48){
      scoreBoard.update(guest)
    }
    scoreBoard.show()
  }
  window.addEventListener('keypress', callback)

  setTimeout(() => {
    window.removeEventListener('keypress', callback)
    // alert('over')
  }, 10000)
}

init()