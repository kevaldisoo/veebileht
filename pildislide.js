
var element = document.getElementById('liikuvpilt');
var elementHeight = element.clientHeight;

// listen for scroll event and call animate function
document.addEventListener('scroll', animate);

// check if element is in view
function inView() {
  // get window height
  var windowHeight = window.innerHeight;
  // get number of pixels that the document is scrolled
  var scrollY = window.scrollY
  
  // get current scroll position (distance from the top of the page to the bottom of the current viewport)
  var scrollPosition = scrollY + windowHeight;
  // get element position (distance from the top of the page to the bottom of the element)
  var elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;
  
  // is scroll position greater than element position? (is element in view?)
  if (scrollPosition > elementPosition) {
    return true;
  }
  
  return false;
}

// animate element when it is in view
function animate() {
  // is element in view?
  if (inView()) {
    var right = 0
    run = function(){
        element.style.right = right + "px";
        if (right++ < 600) {
            setTimeout(run, 1)
        }
    }
    run()
  }
}



// viide: https://stackoverflow.com/questions/9090750/how-to-slow-down-a-javascript-loop (20.11.2023)
