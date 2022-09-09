var H=Object.defineProperty;var V=(t,r,n)=>r in t?H(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var P=(t,r,n)=>(V(t,typeof r!="symbol"?r+"":r,n),n);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerpolicy&&(e.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?e.credentials="include":o.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(o){if(o.ep)return;o.ep=!0;const e=n(o);fetch(o.href,e)}})();const K="KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIHUobyx0LGUsZil7aWYodDwwfHx0PmV8fG88MClyZXR1cm4gbnVsbDtsZXQgbD0odCtvKmUpKjQ7cmV0dXJuIGw+PWY/bnVsbDpsfWZ1bmN0aW9uKmcobyx0LGUsZil7bGV0IGw9dC80JWUscz1NYXRoLmZsb29yKHQvNC9lKSxpPVtdO2ZvcihsZXQgbj0xO248PWY7bis9MSlmb3IobGV0IHI9bC1mO3I8PWwrZjtyKz0xKWkucHVzaChbcy1uLHJdKSxyIT09bCYmaS5wdXNoKFtzLHJdKSxpLnB1c2goW3MrbixyXSk7Zm9yKGxldFtuLHJdb2YgaSl7bGV0IGE9dShuLHIsZSxvLmxlbmd0aCk7YSE9PW51bGwmJm9bYSszXT4wJiYoeWllbGR7aW5kZXg6YX0pfX1mdW5jdGlvbip5KG8sdCxlLGYsbCl7Y29uc3Qgcz10LmNvbmNhdChvLGUpLGk9dC5sZW5ndGgsbj1zLmxlbmd0aC1lLmxlbmd0aDtmb3IobGV0IHI9aTtyPG47cis9NClpZihzW3IrM109PT0wKWZvcihsZXQgYSBvZiBnKHMscixmLGwpKXt5aWVsZHtpbmRleDpyLWl9O2JyZWFrfX1mdW5jdGlvbiBwKG8pe3JldHVybntyOisoIjB4IitvWzFdK29bMl0pLGc6KygiMHgiK29bM10rb1s0XSksYjorKCIweCIrb1s1XStvWzZdKX19b25tZXNzYWdlPSh7ZGF0YTpvfSk9Pntjb25zdHtpbWFnZURhdGE6dCxvdmVybGFwVG9wRGF0YTplLG92ZXJsYXBCb3R0b21EYXRhOmYsd2lkdGg6bCxzdHJva2VXaWR0aDpzLHN0cm9rZUNvbG9yOml9PW8sbj1wKGkpO2xldCByPW5ldyBVaW50OENsYW1wZWRBcnJheShBcnJheS5mcm9tKHQpKTtjb25zdCBhPUFycmF5LmZyb20odCksbT1BcnJheS5mcm9tKGUpLGI9QXJyYXkuZnJvbShmKTtmb3IobGV0e2luZGV4OmN9b2YgeShhLG0sYixsLHMpKXJbY109bi5yLHJbYysxXT1uLmcscltjKzJdPW4uYixyW2MrM109MjU1O3Bvc3RNZXNzYWdlKHtjbGFtcGVkQXJyYXk6cn0pfX0pKCk7Cg==",Y=typeof window<"u"&&window.Blob&&new Blob([atob(K)],{type:"text/javascript;charset=utf-8"});function O(){const t=Y&&(window.URL||window.webkitURL).createObjectURL(Y);try{return t?new Worker(t):new Worker("data:application/javascript;base64,"+K)}finally{t&&(window.URL||window.webkitURL).revokeObjectURL(t)}}const I=(t,r,n,i)=>{const o=t.getContext("2d"),e=document.createElement("img");e.src=r;const c=navigator.hardwareConcurrency;e.onload=()=>{const{width:l,height:u}=e;t.width=l,t.height=u,o.drawImage(e,0,0,l,u);const{data:f}=o.getImageData(0,0,l,u);let m=Math.floor(u/c),L=performance.now();for(let a=0;a<c;a+=1){let d=a*m*l*4,g=m*l*4;a===c-1&&(g=f.length-d);let h=new O;const b=d+g;let S=f.slice(d,b),p=f.slice(d-n*l*4,d),v=f.slice(b,b+n*l*4);console.log({overlapTopData:p},d),h.postMessage({index:a,imageData:S,overlapTopData:p,overlapBottomData:v,width:l,strokeWidth:n,strokeColor:i}),h.onmessage=({data:E})=>{let R=new ImageData(E.clampedArray,l);o.putImageData(R,0,a*m),a===c-1&&console.log(performance.now()-L),h.terminate()}}}};function M(t){return{r:+("0x"+t[1]+t[2]),g:+("0x"+t[3]+t[4]),b:+("0x"+t[5]+t[6])}}function z(t,r,n,i){const o=M(i),e=t.getContext("webgl",{preserveDrawingBuffer:!0});if(!e){alert("Unable to initialize WebGL. Your browser or machine may not support it.");return}const c=new Image;c.onload=function(){t.width=c.width,t.height=c.height;let l=performance.now();const u=`
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }`,f=`
      varying highp vec2 vTextureCoord;
      uniform sampler2D uSampler;
      uniform highp float width;
      uniform highp vec4 strokeColor;
      uniform highp vec2 imageSize;
      
      bool haveNeighborPixel(highp float fx, highp float fy) {
        if (distance(vec2(fx, fy), vec2(0, 0)) > width) {
          return false;
        }
        highp float fi1 = fx / imageSize.x;
        highp float fj1 = fy / imageSize.y;
        highp vec2 cp = vTextureCoord + vec2(fi1, fj1);
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
        for (int i = 1; i != 2; i += 2) {

          highp float fy = -width;
          for (int j = 1; j != 2; j += 2) {

            bool shouldBeOutlined = haveNeighborPixel(fx, fy);
            if (shouldBeOutlined) {
              return strokeColor;
            }

            fy += 1.0;
            if (fy > width)
              break;
          }

          fx += 1.0;
          if (fx > width)
            break;
        }

        return vec4(0.0, 0.0, 0.0, 0.0);
      }
      void main(void) {
        highp vec4 tex = texture2D(uSampler, vTextureCoord);
        if (tex.w > 0.0) {
          gl_FragColor = tex;
          return;
        }
        gl_FragColor = paint();
      }`,m=N(e,e.VERTEX_SHADER,u),L=N(e,e.FRAGMENT_SHADER,f),a=e.createProgram();if(e.attachShader(a,m),e.attachShader(a,L),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){alert("Unable to initialize the shader program: "+e.getProgramInfoLog(a));return}const d=e.getAttribLocation(a,"aVertexPosition"),g=e.getAttribLocation(a,"aTextureCoord"),h=e.getUniformLocation(a,"strokeColor"),b=e.getUniformLocation(a,"imageSize"),S=e.getUniformLocation(a,"width"),p={program:a,attribLocations:{},uniformLocations:{uSampler:e.getUniformLocation(a,"uSampler")}},v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,1]),e.STATIC_DRAW);const E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,1,1,0,1]),e.STATIC_DRAW);const R=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,R),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW);const y=e.createTexture();e.bindTexture(e.TEXTURE_2D,y),e.viewport(0,0,c.width,c.height),e.bindTexture(e.TEXTURE_2D,y),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindBuffer(e.ARRAY_BUFFER,v),e.vertexAttribPointer(d,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(d),e.bindBuffer(e.ARRAY_BUFFER,E),e.vertexAttribPointer(g,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(g),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,R),e.useProgram(p.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,y),e.uniform1i(p.uniformLocations.uSampler,0),e.uniform1f(S,n),e.uniform4f(h,o.r/255,o.g/255,o.b/255,1),e.uniform2f(b,c.width,c.height),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0),console.log(performance.now()-l)},c.src=r,e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0)}let w=null,x=null;function N(t,r,n){if(r==t.VERTEX_SHADER&&w)return w;if(r==t.FRAGMENT_SHADER&&x)return x;const i=t.createShader(r);return t.shaderSource(i,n),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS)?(r==t.VERTEX_SHADER&&(w=i),r==t.FRAGMENT_SHADER&&(x=i),i):(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(i)),t.deleteShader(i),null)}const G=document.querySelector(".drag-container"),j=document.querySelector("#drag-input"),J=document.querySelector(".drag-skip"),q=document.querySelector(".canvas-outline");let s=document.querySelector("canvas");const Q=document.querySelector("#save-image"),$=document.querySelector("#back-home"),T=document.querySelector("#strokeBackend"),k=document.querySelector("#strokeWidth"),U=document.querySelector("#strokeWidthInteractive");U.value=k.value;const W=document.querySelector("#strokeColor"),_=document.querySelector("#strokeColorInteractive");_.value=W.value;let D="./pikachu.png";function B(){G.classList.toggle("hidden"),q.classList.toggle("hidden")}const A={js:s};function ee(){const t=s.parentElement;t==null||t.removeChild(s);let r=null;A[T.value]!==void 0?r=A[T.value]:(r=document.createElement("canvas"),A[T.value]=r),s=r,t==null||t.appendChild(s)}let C=I;function X(){let t=I;return T.value=="webgl"?t=z:t=I,t!=C&&(ee(),C=t),C}class te{constructor(){P(this,"reader");this.reader=new FileReader}open(r){!r||r.length===0||(this.reader.readAsDataURL(r[0]),this.reader.onload=n=>{var e;const i=(e=n.target)==null?void 0:e.result;D=i;const o=+k.value;X()(s,i,o,W.value),B()})}save(){const r=document.createElement("a");r.download=`canvas-outline-${Date.now()}.png`,r.href=s.toDataURL(),r.click(),r.remove()}}const F=new te;j.addEventListener("change",t=>t.target&&t.target.constructor.name=="HTMLInputElement"?(F.open(t.target.files),t.target.value="",t.preventDefault(),!1):null);Q.addEventListener("click",()=>{F.save()});$.addEventListener("click",()=>{B()});J.addEventListener("click",()=>{const t=+k.value;X()(s,D,t,W.value),B()});G.addEventListener("drop",t=>{t.preventDefault();const r=t.dataTransfer,n=r==null?void 0:r.files;r&&n&&F.open(n)});G.addEventListener("dragover",t=>{t.preventDefault()});function Z(){X()(s,D,+U.value,_.value)}U.addEventListener("change",Z);_.addEventListener("change",Z);
