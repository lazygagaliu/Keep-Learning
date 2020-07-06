interface IObserver {
  update(content: string): void
}

interface IYoutuber {
  registerObservers(o: IObserver): void
  removeObservers(o: IObserver): void
  notifyObservers(): void
}

class Youtuber implements IYoutuber {
  private observers: Array<IObserver>
  public name: string

  constructor(name: string){
    this.name = name
    this.observers = []
  }

  registerObservers(o: IObserver): void {
    this.observers.push(o)
  }
  removeObservers(o: IObserver): void {
    const i = this.observers.indexOf(o)
    this.observers.splice(i, 1)
  }
  // why interface
  notifyObservers(): void {
    this.observers.forEach(observer => observer.update(`${this.name} just uploaded new video!`))
  }

  publishVideo(): void{
    this.notifyObservers()
  }
}

class Observer implements IObserver {
  update(content: string): void {
    console.log(content)
  }
}

const aGa = new Youtuber('aGa')
const gao = new Youtuber('gao')
const observer = new Observer()

aGa.registerObservers(observer)
gao.registerObservers(observer)

aGa.publishVideo()
gao.publishVideo()