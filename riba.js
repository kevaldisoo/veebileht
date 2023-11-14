window.onscroll = function() {
  var topBar = document.getElementById("topBar");
  
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  const logoribaHeight=document.getElementById("logoriba").offsetHeight;
  const topbarHeight=document.getElementById("topBar").offsetHeight;
  var v6lurida=document.getElementById("v6lurida");
  if (scrollPosition > logoribaHeight) {
    topBar.style.position = "fixed";
    topBar.style.top = "0";
	v6lurida.style.height=topbarHeight+"px";//<3 js
	v6lurida.style.backgroundColor="red";
  } else {//on ülaosas.
	topBar.style.position = "static";
	v6lurida.style.height="0px";
	v6lurida.style.backgroundColor="blue";
  }
};
function nupphover(elementID){
	const button=document.getElementById(elementID);
	button.style.backgroundColor="gray";
	if(elementID=="alter"){
		dropDown();
	}
}
function nuppreset(elementID){
	const button=document.getElementById(elementID);
	button.style.backgroundColor="#333";
	if(elementID=="alter"){
		dropUp();
	}
}
function dropDown(){
	document.getElementById("dropdown").style.display="block";
}
function dropUp(){
	document.getElementById("dropdown").style.display="none";
}



