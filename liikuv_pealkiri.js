// Kui kasutaja scrollib, kutsub välja funktsiooni.
window.onscroll = function() {myFunction()};

// Kaks muutujat saamaks pealkirja ja riba asukoha infot.
var header = document.getElementById("pealkiri");

var keritud = false

// Lisab "sticky" klassi pealkirjale, kui scrollida, võtab selle ära, kui kasutaja vaatab lehe ülaosa.
function myFunction() {
<<<<<<< Updated upstream
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
=======
  if (window.scrollY > 50) {
    if (!keritud) {
      header.classList.add('keritud');
      keritud = true;
    }
>>>>>>> Stashed changes
  } else {
    if (keritud) {
      header.classList.remove("keritud");
      keritud = false
    }
  }
}

// CSS-is vajalikud .sticky, .content ja .sticky + .content klassid. HTML failis panna pealkirjale id="pealkiri"
// tag juurde.

// viide https://www.w3schools.com/howto/howto_js_sticky_header.asp (13.11.2023)