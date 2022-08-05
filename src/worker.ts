import { canvasIterator } from './canvasIterator'

onmessage = ({ data }) => {
  const {
    imageData,
    width,
  } = data;

  for (let {index} of canvasIterator(imageData, width)) {
    imageData[index] = 255;
    imageData[index+1] = 0;
    imageData[index+2] = 0;
    imageData[index+3] = 255;
  }

  postMessage({clampedArray: imageData});

};
