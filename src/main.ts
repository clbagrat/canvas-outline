import './style.css'
import { canvasOutliner } from './canvasOutliner';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas>
  </canvas>
  <input type="file" name="upload" accept=".png">
`

const canvasNode = document.querySelector('canvas')!;

document.querySelector('input')!.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target?.files || target.files?.length === 0) return;
  
  const reader = new FileReader();
  reader.readAsDataURL(target.files[0]);
  reader.onload = (e: Event) => {
    //@ts-ignore
    canvasOutliner(canvasNode, e.target?.result);
  };
})

