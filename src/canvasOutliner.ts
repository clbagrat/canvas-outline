import MyWorker from './worker/worker.js?worker';

export const canvasOutliner = (canvas: HTMLCanvasElement, targetSrc: string) => {
  const ctx = canvas.getContext('2d')!;

  const img = document.createElement('img');
  img.src = targetSrc;

  const maxWorkers = navigator.hardwareConcurrency;

  img.onload = () => {
    const { width, height } = img;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const { data } = ctx.getImageData(0, 0, width, height);
    let segmentHeight = Math.floor(height / maxWorkers);


    let start = performance.now();
    for (let i = 0; i < maxWorkers; i += 1) {
      let prevAmoutOfInts = (i * segmentHeight) * width * 4;
      let amoutOfInts = segmentHeight * width * 4;
      if (i === maxWorkers - 1) {
        amoutOfInts = data.length - prevAmoutOfInts;
      }

      let w = new MyWorker(); 
      let imageData = data.slice(prevAmoutOfInts, prevAmoutOfInts + amoutOfInts);

      w.postMessage({
        index: i,
        imageData,
        width,
        strokeWidth: 1
      });

      w.onmessage = ({ data }) => {
        let imageData = new ImageData(data.clampedArray, width);

        ctx.putImageData(imageData, 0, i * segmentHeight);
        if (i === maxWorkers - 1) {
          document.body.prepend(
            (performance.now() - start).toString()
          );
        }
      };
    }
  };
}
