import MyWorker from './worker/worker.js?worker&inline';

const canvasOutliner = (
  canvas: HTMLCanvasElement,
  targetSrc: string,
  strokeWidth: number,
  strokeColor: string
) => {
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
      const nextAmountOfInts = prevAmoutOfInts + amoutOfInts
      let imageData = data.slice(prevAmoutOfInts, nextAmountOfInts);
      let overlapTopData = data.slice(prevAmoutOfInts - strokeWidth * width * 4, prevAmoutOfInts);
      let overlapBottomData = data.slice(
        nextAmountOfInts,
        nextAmountOfInts + strokeWidth * width * 4
      );

      console.log({overlapTopData}, prevAmoutOfInts)

      w.postMessage({
        index: i,
        imageData,
        overlapTopData,
        overlapBottomData,
        width,
        strokeWidth,
        strokeColor
      });

      w.onmessage = ({ data }) => {
        let imageData = new ImageData(data.clampedArray, width);

        ctx.putImageData(imageData, 0, i * segmentHeight);
        if (i === maxWorkers - 1) {
          console.log(performance.now() - start);
        }
      };
    }
  };
}

export { canvasOutliner }
export default canvasOutliner
