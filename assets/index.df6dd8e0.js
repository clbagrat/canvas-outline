var V=Object.defineProperty;var W=(o,t,a)=>t in o?V(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a;var p=(o,t,a)=>(W(o,typeof t!="symbol"?t+"":t,a),a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();const Z="KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGMobyxsLHIsbil7aWYobDwwfHxsPnJ8fG88MClyZXR1cm4gbnVsbDtsZXQgZT0obCtvKnIpKjQ7cmV0dXJuIGU+PW4/bnVsbDplfWZ1bmN0aW9uKmcobyxsLHIsbil7bGV0IGU9bC80JXIsdD1NYXRoLmZsb29yKGwvNC9yKSxzPVtdO2ZvcihsZXQgaT0xO2k8PW47aSs9MSlmb3IobGV0IGY9ZS1uO2Y8ZStuO2YrPTEpcy5wdXNoKFt0LWksZl0pLGYhPT1lJiZzLnB1c2goW3QsZl0pLHMucHVzaChbdCtpLGZdKTtmb3IobGV0W2ksZl1vZiBzKXtsZXQgdT1jKGksZixyLG8ubGVuZ3RoKTt1IT09bnVsbCYmb1t1KzNdPT09MCYmKHlpZWxke2luZGV4OnV9KX19ZnVuY3Rpb24qYShvLGwscil7Zm9yKGxldCBuPTA7bjxvLmxlbmd0aDtuKz00KWlmKG9bbiszXT4wKWZvcihsZXR7aW5kZXg6ZX1vZiBnKG8sbixsLHIpKXlpZWxke2luZGV4OmV9fW9ubWVzc2FnZT0oe2RhdGE6b30pPT57Y29uc3R7aW1hZ2VEYXRhOmwsd2lkdGg6cixzdHJva2VXaWR0aDpufT1vO2xldCBlPW5ldyBVaW50OENsYW1wZWRBcnJheShBcnJheS5mcm9tKGwpKTtjb25zb2xlLmxvZyh7aW1hZ2VEYXRhOmwsY2xhbXBlZEFycmF5OmV9KTtmb3IobGV0e2luZGV4OnR9b2YgYShsLHIsbikpZVt0XT0xNDcsZVt0KzFdPTAsZVt0KzJdPTAsZVt0KzNdPTI1NTtwb3N0TWVzc2FnZSh7Y2xhbXBlZEFycmF5OmV9KX19KSgpOwo=",h=typeof window<"u"&&window.Blob&&new Blob([atob(Z)],{type:"text/javascript;charset=utf-8"});function G(){const o=h&&(window.URL||window.webkitURL).createObjectURL(h);try{return o?new Worker(o):new Worker("data:application/javascript;base64,"+Z)}finally{o&&(window.URL||window.webkitURL).revokeObjectURL(o)}}const w=(o,t)=>{const a=o.getContext("2d"),r=document.createElement("img");r.src=t;const e=navigator.hardwareConcurrency;r.onload=()=>{const{width:n,height:c}=r;o.width=n,o.height=c,a.drawImage(r,0,0,n,c);const{data:m}=a.getImageData(0,0,n,c);let i=Math.floor(c/e),y=performance.now();for(let s=0;s<e;s+=1){let l=s*i*n*4,b=i*n*4;s===e-1&&(b=m.length-l);let g=new G,L=m.slice(l,l+b);g.postMessage({index:s,imageData:L,width:n,strokeWidth:1}),g.onmessage=({data:K})=>{let v=new ImageData(K.clampedArray,n);a.putImageData(v,0,s*i),s===e-1&&console.log(performance.now()-y)}}}};const k=document.querySelector(".drag-container"),I=document.querySelector("#drag-input"),R=document.querySelector(".drag-skip"),x=document.querySelector(".canvas-outline"),d=document.querySelector("canvas"),T=document.querySelector("#save-image"),X=document.querySelector("#back-home");function u(){k.classList.toggle("hidden"),x.classList.toggle("hidden")}class O{constructor(){p(this,"reader");this.reader=new FileReader}open(t){!t||t.length===0||(this.reader.readAsDataURL(t[0]),this.reader.onload=a=>{var e;const r=(e=a.target)==null?void 0:e.result;w(d,r),u()})}save(){const t=document.createElement("a");t.download=`canvas-outline-${Date.now()}.png`,t.href=d.toDataURL(),t.click(),t.remove()}}const f=new O;I.addEventListener("change",o=>{f.open(o.target.files)});T.addEventListener("click",()=>{f.save()});X.addEventListener("click",()=>{u()});R.addEventListener("click",()=>{w(d,"./pikachu.png"),u()});
