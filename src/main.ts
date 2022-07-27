import './style.css'
import memeSrc from './meme.png';
import { canvasOutliner } from './canvasOutliner';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas width="50px" height="50px">
  </canvas>
`

console.log({memeSrc});
const canvasNode = document.querySelector('canvas')!;

const target = document.querySelector<HTMLDivElement>("#target");
if (target) {
  canvasOutliner(canvasNode, memeSrc, target);
}


