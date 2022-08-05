import './style.css'
import memeSrc from './meme.png';
import small from './3x3.png';
import medium from './5x5.png';
import complex from './16x16.png';
import complexBig from './32x32.png';
import { canvasOutliner } from './canvasOutliner';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  Я ЗАГРУЗИЛСЯ.
  <canvas>
  </canvas>
`

const canvasNode = document.querySelector('canvas')!;

////@ts-ignore
//const offsreen = canvasNode.transferControlToOffscreen();
//
//new Array(1).fill('worker.js').forEach((name, i) => {
//
//  let w = new Worker(name);
//
//  w.postMessage({ i, canvas: offsreen }, [offsreen]);
//  w.onmessage = () => {
//    console.count();
//  } 
//});


const target = document.querySelector<HTMLDivElement>("#target");
if (target) {
  canvasOutliner(canvasNode, memeSrc, target);
}

