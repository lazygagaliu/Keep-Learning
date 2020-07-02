class Player {
  constructor(name, key){
    this.name = name
    this.key = key
    this.points = 0
    this.fire('newPlayer', this)
  }

  play () {
    this.points += 1
    this.fire('play', this)
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

const publisher = {
  subscribers: {
    any: []
  },
  on: function (type, fn, context) {
    type = type || 'any'
    fn = typeof fn === 'function' ? fn : context[fn]
    if(typeof this.subscribers[type] === 'undefined'){
      this.subscribers[type] = []
    }
    this.subscribers[type].push({fn, context: context || this})
  },
  remove: function (type, fn, context) {
    this.visitSubscribers('unsubscribe', type, fn, context)
  },
  fire: function (type, publication) {
    this.visitSubscribers('publish', type, publication)
  },
  visitSubscribers: function (action, type, arg, context) {
    const pubtype = type || 'any'
    const subscribers = this.subscribers[pubtype]
    for(let i = 0; i < subscribers.length; i++){
      if(action === 'publish'){
        subscribers[i].fn.call(subscribers[i].context, arg)
      } else {
        if(subscribers[i].fn === arg && subscribers[i].context === contextf){
          subscribers.splice(i, 1)
        }
      }
    }
  }
}

function makePublisher (o) {
  for(let i in publisher) {
    if(publisher.hasOwnProperty(i) && typeof publisher[i] === 'function'){
      o[i] = publisher[i]
    }
  }
  o.subscribers = {
    any: []
  }
}

const game = {
  keys: {},
  addPlayer: function (player) {
    const key = player.key.toString().charCodeAt(0)
    this.keys[key] = player
  },
  handleKeypress: function (e) {
    if(game.keys[e.keyCode]){
      game.keys[e.keyCode].play()
    }
  },
  handlePlay: function (player) {
    const players = this.keys
    let score = {}
    for(let i in players){
      if(players.hasOwnProperty(i)){
        score[players[i].name] = players[i].points
      }
    }
    this.fire('scorechange', score)
  }
}

makePublisher(Player.prototype)
makePublisher(game)

Player.prototype.on('newPlayer', 'addPlayer', game)
Player.prototype.on('play', 'handlePlay', game)
game.on('scorechange', scoreBoard.update, scoreBoard)
console.log('Player', Player.prototype)
console.log('game', game)
window.addEventListener('keypress', game.handleKeypress)

let playerName, key
while(1){
  playerName = prompt('add player name')
  if(!playerName) break
  while(1){
    key = prompt(`key for ${playerName} ?`)
    if(key) break
  }
  new Player(playerName, key)
}