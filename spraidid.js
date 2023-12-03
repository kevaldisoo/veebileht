class shader{//shader'i haldamisklass.
	constructor(vertex,fragment, gl){
		this.gl=gl;
		this.shaderloc=createProgram(vertex,fragment);
		this.timeLocation=gl.getUniformLocation(this.shaderloc, "time");
		this.resolutionLocation=gl.getUniformLocation(this.shaderloc, "resolution");
	}
	useShader(){
		this.gl.useProgram(this.shaderloc);
	}
	getProgram(){
		return this.shaderloc;
	}
	setTime(time){
		this.gl.uniform1f(this.timeLocation, time);
	}
	setResolution(width, height){
		this.gl.uniform2f(this.resolutionLocation, width, height);
	}
	linkProgram(){
		this.gl.useProgram(this.shaderloc);
		this.gl.linkProgram(this.shaderloc);
		this.timeLocation=gl.getUniformLocation(this.shaderloc, "time");
		this.resolutionLocation=gl.getUniformLocation(this.shaderloc, "resolution");
	}
}
var COUNTER=0;
class sprite{//sprite class.
	constructor(gl, shader, name, x1, y1, x2, y2){//mõni ehk märkab, et name-parameeter jääb lõpuks kasutamata. Jääb tõesti :) :) :)	
		this.la=1025.0;
		this.kõ=1024.0;
		this.gl=gl;
		this.shader=shader;//x1, y1, xtex, ytex jne.
		this.xx1=x1;
		this.xx2=x2;
		this.yy1=y1;
		this.yy2=y2;
		this.sx = (x2 - x1)/2;//ekraaniX
		this.sy = (y2 - y1)/2;//ekraaniY
		var ex=this.sx;
		var ey=this.sy;
		var xpos=0;
		var ypos=0;
		var x1a=x1/this.la;//nagu siin seda koodi saaks 100% asjalikumaks teha, aga milleks parandada lõpptulemust, mis töötab, onju.
		var x2a=x2/this.la;
		var y1a=y1/this.kõ;
		var y2a=y2/this.kõ;
		this.bufdata=new Float32Array([
		xpos-ex,ypos+ey,x1a,y1a,
		xpos+ex,ypos+ey,x2a,y1a,
		xpos+ex,ypos-ey,x2a,y2a,
		xpos-ex,ypos+ey,x1a,y1a,
		xpos-ex,ypos-ey,x1a,y2a,
		xpos+ex,ypos-ey,x2a,y2a]);
		this.buffer=this.gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);//webgl värgendused.
		this.gl.bufferData(gl.ARRAY_BUFFER, this.bufdata, this.gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 16, 0);
		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer(1, 2, this.gl.FLOAT, false, 16, 8);
		this.gl.enableVertexAttribArray(1);
		if(COUNTER==0){
		this.gl.bindAttribLocation(this.shader.getProgram(), 0, "position");
		this.gl.bindAttribLocation(this.shader.getProgram(), 1, "v_texkoord");
		this.shader.linkProgram();}COUNTER=1;
	}
	render(x, y, suurus, x1, y1, x2, y2){
		var xpos=x;
		var ypos=y;
		var ex=(x2-x1)/2*suurus;
		var ey=(y2-y1)/2*suurus;
		this.la=1025.0;
		this.kõ=1024.0;
		var x1a=x1/this.la;
		var x2a=x2/this.la;
		var y1a=y1/this.kõ;
		var y2a=y2/this.kõ;
		//gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		xpos-ex,ypos+ey,x1a,y2a,
		xpos+ex,ypos+ey,x2a,y2a,
		xpos+ex,ypos-ey,x2a,y1a,
		xpos-ex,ypos+ey,x1a,y2a,
		xpos-ex,ypos-ey,x1a,y1a,
		xpos+ex,ypos-ey,x2a,y1a]), this.gl.STATIC_DRAW);		
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
	update(){
		//mmm polümorfism time?
	}
}
class suprite{//lõppversioonis jäi vist kasutamata? Vahepealses etapis sai kasutatud. Ilma tekstuurita renderdusbisnes.
	constructor(shader, gl){//bufdata kui Float32Array palun ja aitäh.
		this.gl=gl;
		this.shader=shader;//x1, y1, xtex, ytex jne.
		this.bufdata=new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]);
		this.buffer=gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, this.bufdata, gl.STATIC_DRAW);
		this.gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    	this.gl.enableVertexAttribArray(0);
		this.gl.bindAttribLocation(this.shader.getProgram(), 0, "position");
		//gl.bindAttribLocation(this.shader.getProgram(), 1, "v_texkoord");
		this.shader.linkProgram();
	}
	render(){
		this.shader.useShader();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, this.bufdata, gl.STATIC_DRAW);		
		this.gl.drawArrays(gl.TRIANGLES, 0, 6);
	}
	update(){
		//lõpuks ei läinud vajagi, aga tühja kah.
	}
}
//allikas: mina ise, (Khronos Group). ChatGPT 3.5 ei oska kahjuks WebGL-i eriti hästi.