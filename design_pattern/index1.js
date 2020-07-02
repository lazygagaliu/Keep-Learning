class Player {
  constructor(name){
    this.name = name
    this.points = 0
  }

  play () {
    this.points += 1
    mediator.played()
  }
}

const scoreBoard = {
  el: document.querySelector('#result'),
  update: function (score) {
    let msg = ''
    for(let i in score){
      if(score.hasOwnProperty(i)){
        msg += `${i} : ${score[i]} `
      }
    }
    this.el.textContent = msg
  }
}

const mediator = {
  players: {},
  setup: function () {
    let players = this.players
    players.home = new Player('home')
    players.guest = new Player('guest')
  },
  played: function () {
    const players = this.players
    const score = {
      home: players.home.points,
      guest: players.guest.points
    }
    scoreBoard.update(score)
  },
  callback: function (e) {
    if(e.keyCode === 49){
      mediator.players.home.play()
    }else if(e.keyCode === 48){
      mediator.players.guest.play()
    }
  }
}

mediator.setup()
window.addEventListener('keypress', mediator.callback)

setTimeout(() => {
  window.removeEventListener('keypress', mediator.callback)
  alert('over')
}, 10000)