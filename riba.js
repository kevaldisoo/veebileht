window.onscroll = function() {
	//võtame erinevate asjade paksused ja kõrgused jne.
	var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var topBar = document.getElementById("topBar");
    const logoribaHeight = document.getElementById("logoriba").offsetHeight;
    const topbarHeight = document.getElementById("topBar").offsetHeight;
    var v6lurida = document.getElementById("v6lurida");
    if (scrollPosition > logoribaHeight) { //oleme piisavalt alla kerinud
        topBar.style.position = "fixed"; //navigatsiooniriba jääb ülesse kinni
        topBar.style.top = "0"; //nav.riba ülaotsa koordinaadi panek
        v6lurida.style.height = topbarHeight + "px"; //et skrollimine oleks mõnus ja sidus, siis meie võlurida paisub selle arvelt, kui meie topBar positsioneerimise osas ära kaob/ülaossa kinni jääb.
        v6lurida.style.backgroundColor = "red"; //pole enam vajalik, aga debuggimisel oli kasulik. Nähtav pole niikuinii. (ei tohiks olla s.t)
    } else { //on ülaosas.
        topBar.style.position = "static";
        v6lurida.style.height = "0px"; //võlurida kaob ära
        v6lurida.style.backgroundColor = "blue"; //debuggimisel oli kasulik. Enam pole nähtav niikuinii.
    }
};

function nupphover(elementID) {//s.t funktsioon, mis kutsutakse, kui hiir mingi nupu kohalt üle käib
    const button = document.getElementById(elementID);
    button.style.backgroundColor = "gray";
    if (elementID == "alter") {//kui tegu on alternatiivide nupuga, peab drop-down menüü alla kukkuma.
        dropDown();
    }
}

function nuppreset(elementID) {//siis, kui hiir läheb nupu pealt ära
    const button = document.getElementById(elementID);
    button.style.backgroundColor = "#333";
    if (elementID == "alter") {//et menüü kokku tagasi tõmbaks.
        dropUp();
    }
}
var ddState = "üleval";
var esimenekord = 0;

function dropUp() {
    ddState = "üleval";
    setTimeout(function() {
        if (ddState == "üleval") {
            document.getElementById("minig").style.top = "0px";//ma olen suhteliselt kindel, et siit saaks kuidagi midagi kokku tõmmata, aga ehh. Sait on väike ja koodi pole palju, nii et vahet ei ole.
            document.getElementById("disc").style.top = "0px";
            document.getElementById("volks").style.top = "0px";
            document.getElementById("hoovus").style.top = "0px";
            document.getElementById("minig").style.opacity = "0";
            document.getElementById("disc").style.opacity = "0";
            document.getElementById("volks").style.opacity = "0";
            document.getElementById("hoovus").style.opacity = "0";
        }
    }, 200);
    setTimeout(function() {
        if (document.getElementById("disc").style.opacity == 0) {
            document.getElementById("dropdown").style.pointerEvents = "none";//selleks, et menüü kohal hover'imine menüüd ei aktiveeriks, kui nupp aktiivne ei ole (menüü paikneb kokkutõmbunud olekus nupust allpool.)
        }
    }, 1000);
}

function dropDown() {
    if (ddState == "üleval" && esimenekord != 0) {

        document.getElementById("dropdown").style.display = "block";//ma olen nagu üsna kindel, et siit saaks midagi kokku tõmmata, aga siis, kui mul seda vaid ühe korra oli, ei tundunud see korralikult töötavat, nii et jäägu pigem mitmekordselt mõttetu kood, mis vähemalt töötab.
        document.getElementById("minig").style.top = "0px";
        document.getElementById("disc").style.top = "0px";
        document.getElementById("volks").style.top = "0px";
        document.getElementById("hoovus").style.top = "0px";
        document.getElementById("minig").style.opacity = "0";
        document.getElementById("disc").style.opacity = "0";
        document.getElementById("volks").style.opacity = "0";
        document.getElementById("hoovus").style.opacity = "0";

        document.getElementById("minig").style.top = "0px";
        document.getElementById("disc").style.top = "40px";
        document.getElementById("volks").style.top = "80px";
        document.getElementById("hoovus").style.top = "120px";
        document.getElementById("minig").style.opacity = "1";
        document.getElementById("disc").style.opacity = "1";
        document.getElementById("volks").style.opacity = "1";
        document.getElementById("hoovus").style.opacity = "1";
		
        document.getElementById("dropdown").style.pointerEvents = "auto";//drop-down menüü peal hiire liigutamine taaskord teeb midagi.
    }
    if (ddState == "üleval" && esimenekord == 0) {
        document.getElementById("dropdown").style.display = "block";
        document.getElementById("minig").style.top = "0px";
        document.getElementById("disc").style.top = "0px";
        document.getElementById("volks").style.top = "0px";
        document.getElementById("hoovus").style.top = "0px";
        document.getElementById("minig").style.opacity = "0";
        document.getElementById("disc").style.opacity = "0";
        document.getElementById("volks").style.opacity = "0";
        document.getElementById("hoovus").style.opacity = "0";
        esimenekord = 1;

        setTimeout(function() {
            document.getElementById("minig").style.top = "0px";//setTimeout oli vajalik, kuna vastasel juhul ei oleks avanemine selline pidev, vaid ta kohe hüppaks avatuks.
            document.getElementById("disc").style.top = "40px";
            document.getElementById("volks").style.top = "80px";
            document.getElementById("hoovus").style.top = "120px";
            document.getElementById("minig").style.opacity = "1";
            document.getElementById("disc").style.opacity = "1";
            document.getElementById("volks").style.opacity = "1";
            document.getElementById("hoovus").style.opacity = "1";
            document.getElementById("dropdown").style.pointerEvents = "auto";
        }, 10);
    }
    ddState = "all";
}

function redirectTo(leht) {
    window.location.href = leht;
}

//chatGPT oli kasulik abimees. Kahjuks pidin ma (tere, siin koodi autor Kristjan-Erik Kahu) enamiku koodist siiski ise kirjutama.