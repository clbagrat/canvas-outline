import './style.css'
import memeSrc from './meme.png';
import small from './3x3.png';
import medium from './5x5.png';
import complex from './16x16.png';
import complexBig from './32x32.png';
import { canvasOutliner } from './canvasOutliner';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas>
  </canvas>
  <input type="file" name="upload" accept=".png">
`

const canvasNode = document.querySelector('canvas')!;

const target = document.querySelector<HTMLDivElement>("#target");

document.querySelector('input')!.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target?.files || target.files?.length === 0) return;
  
  const reader = new FileReader();
  reader.readAsDataURL(target.files[0]);
  reader.onload = (e: Event) => {
    //@ts-ignore
    canvasOutliner(canvasNode, e.target?.result, target);
  };
})

