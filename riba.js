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
var ddState="üleval";
var esimenekord=0;
function dropUp(){
	ddState="üleval";
	setTimeout(function(){
		if(ddState=="üleval"){
	document.getElementById("minig").style.top="0px";
	document.getElementById("disc").style.top="0px";
	document.getElementById("volks").style.top="0px";
	document.getElementById("hoovus").style.top="0px";
	document.getElementById("minig").style.opacity="0";
	document.getElementById("disc").style.opacity="0";
	document.getElementById("volks").style.opacity="0";
	document.getElementById("hoovus").style.opacity="0";
		}
	}, 200);
	setTimeout(function(){
		if(document.getElementById("disc").style.opacity==0){
			document.getElementById("dropdown").style.pointerEvents="none";
		}
	}, 1000);
}
function dropDown(){//seda jura võõõõõib-olla saaks paremaks teha
		if(ddState=="üleval" && esimenekord != 0){
	
	document.getElementById("dropdown").style.display="block";
	document.getElementById("minig").style.top="0px";
	document.getElementById("disc").style.top="0px";
	document.getElementById("volks").style.top="0px";
	document.getElementById("hoovus").style.top="0px";
	document.getElementById("minig").style.opacity="0";
	document.getElementById("disc").style.opacity="0";
	document.getElementById("volks").style.opacity="0";
	document.getElementById("hoovus").style.opacity="0";
	
	document.getElementById("minig").style.top="0px";
	document.getElementById("disc").style.top="40px";
	document.getElementById("volks").style.top="80px";
	document.getElementById("hoovus").style.top="120px";
	document.getElementById("minig").style.opacity="1";
	document.getElementById("disc").style.opacity="1";
	document.getElementById("volks").style.opacity="1";
	document.getElementById("hoovus").style.opacity="1";
	document.getElementById("dropdown").style.pointerEvents="auto";
	}
	if(ddState=="üleval" && esimenekord==0){
	document.getElementById("dropdown").style.display="block";
	document.getElementById("minig").style.top="0px";
	document.getElementById("disc").style.top="0px";
	document.getElementById("volks").style.top="0px";
	document.getElementById("hoovus").style.top="0px";
	document.getElementById("minig").style.opacity="0";
	document.getElementById("disc").style.opacity="0";
	document.getElementById("volks").style.opacity="0";
	document.getElementById("hoovus").style.opacity="0";
	esimenekord=1;
	
	setTimeout(function(){
		document.getElementById("minig").style.top="0px";
		document.getElementById("disc").style.top="40px";
		document.getElementById("volks").style.top="80px";
		document.getElementById("hoovus").style.top="120px";
		document.getElementById("minig").style.opacity="1";
		document.getElementById("disc").style.opacity="1";
		document.getElementById("volks").style.opacity="1";
		document.getElementById("hoovus").style.opacity="1";
		document.getElementById("dropdown").style.pointerEvents="auto";
	},10);
	}	
	ddState="all";
}




