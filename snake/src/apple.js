class Apple {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.qty = 0;
  }

  setApplePosition = (width, height, tile) => {
    this.x = Math.floor(Math.random() * width / tile) * tile;
    this.y = Math.floor(Math.random() * height / tile) * tile;
  }
}

export default Apple;
