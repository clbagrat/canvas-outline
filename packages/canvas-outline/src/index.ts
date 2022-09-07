import init, {greet} from "../../my-crate/pkg/my_crate.js";
init();
const canvasOutliner = (
  canvas: HTMLCanvasElement,
  targetSrc: string,
  strokeWidth: number,
  strokeColor: {r: number, g: number, b: number},
) => {
  const ctx = canvas.getContext('2d')!;
  const img = document.createElement('img');
  img.src = targetSrc;
  img.onload = () => {
    const { width, height } = img;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    const {data: data} = ctx.getImageData(0, 0, width, height);
    let start = performance.now();
    greet(
      data,
      width, height,
      strokeWidth,
      strokeColor.r, strokeColor.g, strokeColor.b,
    );
    let imageData = new ImageData(data, width);
    ctx.putImageData(imageData, 0, 0);
    console.log(performance.now() - start);
  };
}
export { canvasOutliner }
export default canvasOutliner
