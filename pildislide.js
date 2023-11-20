var document;
var vasakultpilt = document.getElementsByClassName('pilt piltvasakul');
var paremaltpilt = document.getElementsByClassName('pilt piltparemal');
var elementHeight = vasakultpilt.clientHeight;


// ootab scrollimist, kutsub välja "animate" funktsiooni

for (var i = 0; i < vasakultpilt.length; i++) {
  vasakultpilt[i].addEventListener('scroll', animatevasak);
}

for (var i = 0; i < paremaltpilt.length; i++) {
  paremaltpilt[i].addEventListener('scroll', animateparem);
}
// kas elementi on näha?
function inView() {
  var windowHeight = window.innerHeight;
  // kui palju on keritud?
  var scrollY = window.scrollY;
  
  // distants lehe ülaservast ekraani alaservani
  var scrollPosition = scrollY + windowHeight;
  // distants ekraani ülaservast elemendi alaservani
  var elementPosition = vasakultpilt[0].getBoundingClientRect().top + scrollY + elementHeight;
  
  // kumb väärtus on suurem ehk kas elementi on näha?
  if (scrollPosition > elementPosition) {
    return true;
  }
  
  return false;
}

// animeeri, kui elementi on näha
function animatevasak() {
  if (inView()) {
    vasakultpilt[0].classList.add('animatevasak')
  }
}

function animateparem() {
  if (inView()) {
    paremaltpilt[0].classList.add('animateparem')
  }
}

// viited: https://stackoverflow.com/questions/9090750/how-to-slow-down-a-javascript-loop (20.11.2023)
// https://codepen.io/jr-cologne/pen/zdYdmx (20.11.2023)
