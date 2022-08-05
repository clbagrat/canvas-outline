import MyWorker from './worker.js?worker';

export const canvasOutliner = (canvas: HTMLCanvasElement, targetSrc: string, targetNode: HTMLDivElement) => {
  const ctx = canvas.getContext('2d')!;

  const img = document.createElement('img');
  img.src = targetSrc;

  img.onload = () => {
    const { width, height } = img;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);
    let segmentHeight = Math.floor(height / navigator.hardwareConcurrency);

    console.time();

    for (let i = 0; i < navigator.hardwareConcurrency; i += 1) {
      let prevAmoutOfInts = (i * segmentHeight) * width * 4;
      let amoutOfInts = segmentHeight * width * 4;
      if (i === navigator.hardwareConcurrency - 1) {
        amoutOfInts = data.length - prevAmoutOfInts;
      }

      let w = new MyWorker(); 
      let imageData = data.slice(prevAmoutOfInts, prevAmoutOfInts + amoutOfInts);

      w.postMessage({
        index: i,
        imageData,
        width,
        color: "tomato"
      });

      w.onmessage = ({ data }) => {
        let arr = new Uint8ClampedArray();
        let imageData = new ImageData(data.clampedArray, width);

        ctx.putImageData(imageData, 0, i * segmentHeight);
        if (i === navigator.hardwareConcurrency - 1) {
          console.timeEnd();
        }
      };
    }


  };
}
