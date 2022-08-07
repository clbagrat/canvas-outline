import { canvasIterator } from './canvasIterator'

onmessage = ({ data }) => {
  const {
    imageData,
    width,
    strokeWidth,
  } = data;

  let clampedArray = new Uint8ClampedArray(Array.from(imageData)); 
  console.log({imageData, clampedArray});

  for (let {index} of canvasIterator(imageData, width, strokeWidth)) {
    clampedArray[index] = 147;
    clampedArray[index + 1] = 0;
    clampedArray[index + 2] = 0;
    clampedArray[index + 3] = 255;
  }

  postMessage({clampedArray: clampedArray});
};
