function createProgram(vertex, fragment) {
    var program = gl.createProgram();
    var vs = createShader(vertex, gl.VERTEX_SHADER);
    var fs = createShader('#ifdef GL_ES\nprecision highp float;\n#endif\n\n' + fragment, gl.FRAGMENT_SHADER);
    if (vs == null || fs == null) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("ERROR:\n" +
            "VALIDATE_STATUS: " + gl.getProgramParameter(program, gl.VALIDATE_STATUS) + "\n" +
            "ERROR: " + gl.getError() + "\n\n" +
            "- Vertex Shader -\n" + vertex + "\n\n" +
            "- Fragment Shader -\n" + fragment);
        return null;
    }
    return program;
}

function createShader(src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert((type == gl.VERTEX_SHADER ? "VERTEX" : "FRAGMENT") + " SHADER:\n" + gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function resizeCanvas(event) {
    if (canvas.width != canvas.clientWidth ||
        canvas.height != canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        parameters.screenWidth = canvas.width;
        parameters.screenHeight = canvas.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
}
var PILDILAIUS;
var PILDIKÕRGUS;
function loadTexture(gl, url) {//https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel,
  );

  const imaje = new Image();
  imaje.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      imaje,
    );

    // WebGL1 has different requirements for power of 2 images
    // vs. non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(imaje.width) && isPowerOf2(imaje.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn off mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      PILDILAIUS=imaje.width;
	  PILDIKÕRGUS=imaje.height;
	}
  };
  imaje.crossOrigin= "anonymous";
  imaje.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

