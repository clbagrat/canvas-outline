import { canvasIterator } from './canvasIterator';

export const canvasOutliner = (canvas: HTMLCanvasElement, targetSrc: string, targetNode: HTMLDivElement) => {
  const ctx = canvas.getContext('2d')!;
  const { width, height } = canvas;

  const img = document.createElement('img');
  img.src = targetSrc;
  ctx.fillStyle = "#a3d8ee";
  ctx.fillRect(0, 0, width, height);

  img.onload = () => {
    ctx.drawImage(img,0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);
    
    const st = performance.now();
    let fragment = document.createDocumentFragment();
    for (let pixel of canvasIterator(data, width)) {
      let { color, coords } = pixel;
      let [r, g, b, a] = color;
      r = 255;

      let div = document.createElement("div");
      div.classList.add("pixel");
      div.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
      let from = `translate(${coords.x}px, ${coords.y}px) scale(1)`;
      let to = `translate(${coords.x + Math.floor(Math.random() * 30)}px, ${
        coords.y + Math.floor(Math.random() * 30)
      }px) scale(1.2)`;
      div.style.transform = from;
      div.style.setProperty("--from", from);
      div.style.setProperty("--to", to);
      div.style.setProperty("--delay", `${Math.random() * 3}s`);
      fragment.appendChild(div);
    }
    targetNode.appendChild(fragment);
    console.log('!!!', performance.now() - st);
  }
}
