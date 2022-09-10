<<<<<<< HEAD
import {initOutliner} from 'canvas-outline';
=======
import { canvasJSOutliner, canvasShaderOutliner } from 'canvas-outline';
>>>>>>> d2990f00ed501357679534df9b6c1452b7e0303d
import './style.css';

const dragContainer = document.querySelector('.drag-container')!;
const dragInput = document.querySelector('#drag-input')!;
const dragSkip = document.querySelector('.drag-skip')!;

const canvasContainer = document.querySelector('.canvas-outline')!;
<<<<<<< HEAD
const canvasNode = document.querySelector('canvas')!;
const canvasOutliner = initOutliner(canvasNode);
=======
let canvasNode = document.querySelector('canvas')!;
>>>>>>> d2990f00ed501357679534df9b6c1452b7e0303d
const saveImageButton = document.querySelector('#save-image')!;
const backHomeButton = document.querySelector('#back-home')!;

const strokeBackendInput: HTMLInputElement = document.querySelector('#strokeBackend')!;

const strokeWidthInput: HTMLInputElement = document.querySelector('#strokeWidth')!;
const strokeWidthInputInteractive: HTMLInputElement = document.querySelector('#strokeWidthInteractive')!;
strokeWidthInputInteractive.value = strokeWidthInput.value;

const strokeColorInput: HTMLInputElement = document.querySelector('#strokeColor')!;
const strokeColorInputInteractive: HTMLInputElement = document.querySelector('#strokeColorInteractive')!;
strokeColorInputInteractive.value = strokeColorInput.value;

let filePath: string = './pikachu.png';

function toggleContainer() {
  dragContainer.classList.toggle('hidden');
  canvasContainer.classList.toggle('hidden');
}

const canvasStore: Record<string, HTMLCanvasElement> = {
  'js': canvasNode
};

function reinitCanvas() {
  const parent = canvasNode.parentElement;
  parent?.removeChild(canvasNode);

  let canvasElem = null;
  if (canvasStore[strokeBackendInput.value] !== undefined) {
    canvasElem = canvasStore[strokeBackendInput.value];
  } else {
    canvasElem = document.createElement('canvas');
    canvasStore[strokeBackendInput.value] = canvasElem;
  }
  canvasNode = canvasElem;
  parent?.appendChild(canvasNode);
}

let activeBackend = canvasJSOutliner;
function getOutlineFunction() {
  let backend = canvasJSOutliner;
  if (strokeBackendInput.value == 'webgl') {
    backend = canvasShaderOutliner;
  } else {
    backend = canvasJSOutliner;
  }

  if (backend != activeBackend) {
    reinitCanvas();
    activeBackend = backend;
  }
  return activeBackend;
}

class ImageReader {
  private reader: FileReader;

  constructor() {
    this.reader = new FileReader();
  }

  open(files: FileList | null): void {
    if (!files || files.length === 0) return;

    this.reader.readAsDataURL(files[0]);
    this.reader.onload = (event) => {
      const file = event.target?.result as string;
      filePath = file;
      const strokeWidth = +strokeWidthInput.value;
<<<<<<< HEAD
      const strokeColor = parseHEXColor(strokeColorInput.value);
      canvasOutliner(file, strokeWidth, strokeColor);
=======
      getOutlineFunction()(canvasNode, file, strokeWidth, strokeColorInput.value);
>>>>>>> d2990f00ed501357679534df9b6c1452b7e0303d
      toggleContainer();
    };
  }

  save(): void {
    const link = document.createElement('a');
    link.download = `canvas-outline-${Date.now()}.png`;
    link.href = canvasNode.toDataURL();
    link.click();
    link.remove();
  }
}

const imageReader = new ImageReader();

dragInput.addEventListener('change', (event) => {
  if (event.target && event.target.constructor.name == 'HTMLInputElement') {
    imageReader.open((event.target as HTMLInputElement).files);
    (event.target as HTMLInputElement).value = '';
    event.preventDefault();
    return false;
  }
  return null;
});

saveImageButton.addEventListener('click', () => {
  imageReader.save();
});

backHomeButton.addEventListener('click', () => {
  toggleContainer();
});

dragSkip.addEventListener('click', () => {
  const strokeWidth = +strokeWidthInput.value;
<<<<<<< HEAD
  const strokeColor = parseHEXColor(strokeColorInput.value);
  canvasOutliner(filePath, strokeWidth, strokeColor);
=======
  getOutlineFunction()(canvasNode, filePath, strokeWidth, strokeColorInput.value);
>>>>>>> d2990f00ed501357679534df9b6c1452b7e0303d
  toggleContainer();
});

dragContainer.addEventListener('drop', (event) => {
  event.preventDefault();
  const dt = (event as DragEvent).dataTransfer;
  const files = dt?.files;

  if (dt && files) {
    imageReader.open(files);
  }
});

dragContainer.addEventListener('dragover', (event) => {
  event.preventDefault();
});

function handler() {
<<<<<<< HEAD
  const context = canvasNode.getContext('2d');
  context?.clearRect(0, 0, canvasNode.width, canvasNode.height);
  const strokeColor = parseHEXColor(strokeColorInputInteractive.value);
  canvasOutliner(filePath, +strokeWidthInputInteractive.value, strokeColor);
=======
  getOutlineFunction()(canvasNode, filePath, +strokeWidthInputInteractive.value, strokeColorInputInteractive.value);
>>>>>>> d2990f00ed501357679534df9b6c1452b7e0303d
}

strokeWidthInputInteractive.addEventListener('change', handler);
strokeColorInputInteractive.addEventListener('change', handler);
