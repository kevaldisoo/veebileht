
var pilt = Array.from(document.getElementsByClassName('pilt'));
var elementHeight = pilt[0].clientHeight;


// animeeri
function animate(i) {
  if (i % 2 === 1) {
    pilt[i].classList.add('animatevasak');
  } else if (i % 2 === 0) {
    pilt[i].classList.add('animateparem');
  }
}
// ootab scrollimist, kutsub välja "animate" funktsiooni
document.addEventListener('scroll', animate);
// kas elementi on näha?
function inView() {
  var windowHeight = window.innerHeight;
  // kui palju on keritud?
  var scrollY = window.scrollY;
  // distants lehe ülaservast ekraani alaservani
  var scrollPosition = scrollY + windowHeight;
  // distants ekraani ülaservast elemendi alaservani
  var kaugused = [];
  for (let i = 0; i < pilt.length; i++) {
    var elementPosition = pilt[i].getBoundingClientRect().top + scrollY + elementHeight + 100;
    kaugused.push(elementPosition);
  }

  for (let i = 0; i < kaugused.length; i++) {
    // kumb väärtus on suurem ehk kas elementi on näha?
    if (scrollPosition > kaugused[i]) {
      var s = i;
      animate(s)
    }
  }
}

window.onscroll = () => {
  inView()
}








// viited: https://stackoverflow.com/questions/9090750/how-to-slow-down-a-javascript-loop (20.11.2023)
// https://codepen.io/jr-cologne/pen/zdYdmx (20.11.2023)
// https://www.w3schools.com/js/js_if_else.asp (25.11.2023)
// https://www.youtube.com/watch?v=ABlaMXkUwzY (25.11.2023)
