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
var clrShdr;
var suurSprait;
var väikeSprait;
var taustaSprait;
var juhiseSprait;
var golfiSprait;
var texturere;
init();
animate();

var välineaeg=0;
var iks;
var igrek;
var synd;
var indeks=0;

function init() {
	iks = new Array(100).fill(0);
	igrek = new Array(109).fill(0);
	synd= new Array(109).fill(0);
	
	canvas = document.querySelector('canvas');//webGL initsialiseerimise keeduplaat
    try {
        gl = canvas.getContext('experimental-webgl', {premultipliedAlpha: false});
    } catch (error) {}
    if (!gl) {
        throw "cannot create webgl context";
    }
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	const alignment = 1;
	gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    buffer = gl.createBuffer();//võiks minna sprite classi sisse.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]), gl.STATIC_DRAW);
    // shader programmiga seotud keeduplaat
    colorfulShader = createProgram(document.getElementById('vs').textContent, document.getElementById('fs').textContent);
	
    clrShdr= new shader(document.getElementById('vs').textContent, document.getElementById('fs').textContent, gl);
	suurSprait= new suprite(clrShdr, gl);
	textureShader = new shader(document.getElementById("texvs").textContent, document.getElementById("texfs").textContent, gl);
	//tekstuuri keeduplaat

	texturere=loadTexture(gl, "salagolfiassetid.png");
	taustaSprait=new sprite(gl, textureShader, "salagolfiassetid.png", 0, 1024-511, 512, 1024-1024);
	//juhiseSprait=new sprite(gl, textureShader, "salagolfiassetid.png", 0, 1024-0, 543, 1024-145);
	//golfiSprait=new sprite(gl, textureShader, "salagolfiassetid.png", 926, 0, 1023, 98)
	//const texture = loadTexture(gl, "cubetexture.png");
	//gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

}

function animate() {
    resizeCanvas();
    render();
    requestAnimationFrame(animate);
}



function handleKeyPress(event) {
    const pressedKey = event.key;
    if(pressedKey==" "){
		indeks++;
		if(indeks==100){indeks=0;}
		synd[indeks]=välineaeg;
		iks[indeks]=256.0;
		igrek[indeks]=100.0;
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
	var aeg=parameters.time/1000;
	var an=aeg;
	taustaSprait.render(256.0,256.0,1.0,0, 1024-511, 512, 1024-1024);
	taustaSprait.render(235+Math.cos(an)*10, 440+Math.sin(an*2)*2, 0.8, 0, 1024-0, 543, 1024-145);
	for(let i=0;i<100;i++){
	var dt=parameters.time-synd[i];
	if(dt<1000){
	taustaSprait.render(iks[i], igrek[i], 1.0-dt/1000.0, 926, 1024-1, 1023, 1024-98);
	}
	igrek[i]+=2;
	//füsiks
	}
	//juhiseSprait.render(256,400,0.8);
}