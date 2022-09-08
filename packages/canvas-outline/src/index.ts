function canvasOutliner(canvas: HTMLCanvasElement, targetSrc: string, strokeWidth: number, strokeColor: {r: number, g: number, b: number}) {
  const gl = canvas.getContext("webgl");
  const img = document.createElement('img');
  img.src = targetSrc;

  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const image = new Image();
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;

    let start = performance.now();
    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }`;

    const [r, g, b] = [strokeColor.r / 255, strokeColor.g / 255, strokeColor.b / 255];
    const fragmentShaderSource = `
      varying highp vec2 vTextureCoord;
      uniform sampler2D uSampler;
      const int width = ${strokeWidth};
      void paint(void) {
        for (int i = -width; i <= width; i++) {
          for (int j = -width; j <= width; j++) {
            if (distance(vec2(float(i), float(j)), vec2(0, 0)) > float(width)) {
              continue;
            }
            if (texture2D(uSampler, vTextureCoord + vec2(float(i), float(j))/vec2(${image.width}, ${image.height})).w > 0.5) {
              gl_FragColor = vec4(${r}, ${g}, ${b}, 1.0);
              return;
            }
          }
        }
      }
      void main(void) {
        highp vec4 tex = texture2D(uSampler, vTextureCoord);
        if (tex.w > 0.5) {
          gl_FragColor = tex;
          return;
        }
        gl_FragColor = vec4(vec3(1,1,1) - tex.xyz, 1.0);
        paint();
      }`;

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;
    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
      return;
    }

    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aTextureCoord and also
    // look up uniform locations.
    const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    const textureCoord = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    const programInfo = {
      program: shaderProgram,
      attribLocations: {},
      uniformLocations: {
        uSampler: gl.getUniformLocation(shaderProgram, "uSampler")!,
      },
    };

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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]), gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.viewport(0, 0, image.width, image.height);
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

    gl.useProgram(programInfo.program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    console.log(performance.now() - start);
  };
  image.src = targetSrc;

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
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
export { canvasOutliner }
export default canvasOutliner
