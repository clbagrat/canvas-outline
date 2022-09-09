const vertexShaderSource = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTextureCoord;
  varying highp vec2 vTextureCoord;
  void main(void) {
    gl_Position = aVertexPosition;
    vTextureCoord = aTextureCoord;
  }`;

const fragmentShaderSource = `
  varying highp vec2 vTextureCoord;
  uniform sampler2D uSampler;
  uniform highp float width;
  uniform highp vec4 strokeColor;
  uniform highp vec2 imageSize;

  bool haveNeighborPixel(highp vec2 f) {
    if (length(f) > width) {
      return false;
    }
    highp vec2 cp = vTextureCoord + f / imageSize;
    if (cp.x < 0.0 || cp.y < 0.0 || cp.x >= 1.0 || cp.y >= 1.0) {
      return false;
    }
    if (texture2D(uSampler, cp).w > 0.0) {
      return true;
    }
    return false;
  }

  mediump vec4 paint(void) {
    highp float fx = -width;
    for (int i = 0; i != 1; i += 0) {
      highp float fy = -width;
      for (int j = 0; j != 1; j += 0) {
        if (haveNeighborPixel(vec2(fx, fy))) {
          return strokeColor;
        }

        fy += 1.0;
        if (fy > width) {
          break;
        }
      }

      fx += 1.0;
      if (fx > width) {
        break;
      }
    }

    return vec4(0.0);
  }
  void main(void) {
    highp vec4 tex = texture2D(uSampler, vTextureCoord);
    if (tex.w > 0.0) {
      gl_FragColor = tex;
      return;
    }
    gl_FragColor = paint();
  }`;

function initOutliner(canvas: HTMLCanvasElement): ((targetSrc: string, strokeWidth: number, strokeColor: {r: number, g: number, b: number}) => void) | null {
  const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return null;
  }

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;
  const shaderProgram = gl.createProgram()!;
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  const textureCoord = gl.getAttribLocation(shaderProgram, "aTextureCoord");
  const strokeColorUniform = gl.getUniformLocation(shaderProgram, "strokeColor");
  const imageSizeUniform = gl.getUniformLocation(shaderProgram, "imageSize");
  const widthUniform = gl.getUniformLocation(shaderProgram, "width");
  const uSampler = gl.getUniformLocation(shaderProgram, "uSampler")!;

  const positionBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    1.0,  1.0,
    -1.0,  1.0,
  ]), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
  ]), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([
    0, 1, 2,
    0, 2, 3,
  ]), gl.STATIC_DRAW);

  return function(targetSrc: string, strokeWidth: number, strokeColor: {r: number, g: number, b: number}) {
    const image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;

      let start = performance.now();

      gl.viewport(0, 0, image.width, image.height);

      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexPosition);

      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
      gl.vertexAttribPointer(textureCoord, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(textureCoord);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

      gl.useProgram(shaderProgram);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uSampler, 0);
      gl.uniform1f(widthUniform, strokeWidth);
      gl.uniform4f(strokeColorUniform, strokeColor.r / 255, strokeColor.g / 255, strokeColor.b / 255, 1.0);
      gl.uniform2f(imageSizeUniform, image.width, image.height);

      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

      console.log(performance.now() - start);
    };
    image.src = targetSrc;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  }
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
export {initOutliner}
export default initOutliner
