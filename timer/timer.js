const time = {
  s: 0,
  m: 0,
  h: 0,
  init: () => {
    time.s = 0;
    time.m = 0;
    time.h = 0;
    display();
  }
};

let goingTimer;

const checkDigit = (time) => {
  if(time < 10){
    return `0${time}`;
  }else {
    return time;
  }
};

const display = () => {
  const timer = document.querySelector(".timer");
  const s = checkDigit(time.s);
  const m = checkDigit(time.m);
  const h = checkDigit(time.h);
  timer.textContent = `${h}:${m}:${s}`;
};

const handleTimer = () => {
  time.s ++;

  if(time.s > 59){
    time.s = 0;
    time.m ++;
  }

  if(time.m > 59){
    time.m = 0;
    time.h ++;
  }

  display();

};

document.querySelector("#start").addEventListener("click", e => {
  goingTimer = setInterval(handleTimer, 1000);
});
document.querySelector("#pause").addEventListener("click", e => {
  clearInterval(goingTimer);
});
document.querySelector("#reset").addEventListener("click", e => {
  time.init();
});
