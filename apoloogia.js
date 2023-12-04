window.requestAnimationFrame = window.requestAnimationFrame || (function() {
    return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
var canvas;
var gl;
var buffer;
var colorfulShader, textureShader;
var vertex_position;
var timelocation;
var resolutionlocation, texShaResLoc;
var parameters = {
    start_time: new Date().getTime(),
    time: 0,
    screenWidth: 0,
    screenHeight: 0
};
var taustaSprait;
var texturere;
init();
animate();

var välineaeg=0;
var iks;
var iksvel;
var igrek;
var igrvel;
var synd;
var indeks=0;

function init() {
	iks = new Array(100).fill(0);
	igrek = new Array(100).fill(0);
	iksvel= new Array(100).fill(0);
	igrvel= new Array(100).fill(0);
	synd= new Array(100).fill(0);
	
	canvas = document.querySelector('canvas');//webGL initsialiseerimise keeduplaat
    try {
        gl = canvas.getContext('webgl', {premultipliedAlpha: false});
    } catch (error) {}
    if (!gl) {
        throw "cannot create webgl context";
    }
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	const alignment = 1;
	gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
	gl.enable(gl.BLEND);//et oleks võimalik läbipaistvus.
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);//et spraidid (eeskätt golfipallid) saaksid läbi paista ilusti.

    textureShader = new shader(document.getElementById("texvs").textContent, document.getElementById("texfs").textContent, gl);
	//tekstuuri keeduplaat

	texturere=loadTexture(gl, "https://i.imgur.com/wl48Zut.png");
	taustaSprait=new sprite(gl, textureShader, "salagolfiassetid.png", 0, 1024-511, 512, 1024-1024);//mitte tausta, vaid kõige sprait. Nimi on jäänud eksitav.
}

function animate() {
    resizeCanvas();
    render();
    requestAnimationFrame(animate);
}


var viimaneaeg=0;
function handleKeyPress(event) {
    const pressedKey = event.key;
    if(pressedKey==" " && (välineaeg-viimaneaeg>80)){//golfipallivärgeldus
		viimaneaeg=välineaeg;
		indeks++;
		if(indeks==100){indeks=0;}
		synd[indeks]=välineaeg;
		iks[indeks]=256.0;
		igrek[indeks]=100.0;
		iksvel[indeks]=(Math.random()*2.0-1.0)*6;
		igrvel[indeks]=12+Math.random()*5;
	}
}
document.addEventListener('keydown', handleKeyPress);
 
function render() {
    parameters.time = new Date().getTime() - parameters.start_time;
	välineaeg=parameters.time;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	textureShader.useShader();
	//gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texturere);
	gl.uniform1i(gl.getUniformLocation(textureShader.getProgram(), "u_texture"),0);

	textureShader.setResolution(parameters.screenWidth, parameters.screenHeight);
	var aeg=parameters.time/2000;
	var an=aeg;
	taustaSprait.render(256.0,256.0,1.0,0, 1024-511, 512, 1024-1024);//taust
	taustaSprait.render(235+Math.cos(an)*10, 440+Math.sin(an*2)*2, 0.8, 0, 1024-0, 543, 1024-145);//juhiseplaat ülal
	for(let i=0;i<100;i++){
	var dt=parameters.time-synd[i];
	if(dt<2000){
		var nms=dt/2000.0;//0 ~ 1
		var sur=(1/(1+nms*3)-0.25)/0.75;//kordaja usutavama näiva perspektiivi tekitamiseks (sest milleks teha 3D-d, kui saab jätta vaid küsitava 3D-mulje.)
	taustaSprait.render(iks[i], igrek[i], sur, 926, 1024-1, 1023, 1024-98);//golfipallid.
	}
	igrek[i]+=igrvel[i]*(sur);
	iks[i]+=iksvel[i]*(sur);
	igrvel[i]-=0.4;
	//füsiks
	}
	//juhiseSprait.render(256,400,0.8);
}
//https://github.com/paulirish/webgl-boilerplate/blob/master/index.html oli suureks abiks. Erinevalt chatGPTst (ta paraku oskab siiski ainult seda, mida on ohtralt tehtud ja mida internetis leidub mägede kaupa. Muu on raske tema jaoks.)