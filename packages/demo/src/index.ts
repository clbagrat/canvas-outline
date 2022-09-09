import { canvasPureJSOutliner, canvasShaderOutliner } from 'canvas-outline';
import './style.css';

const dragContainer = document.querySelector('.drag-container')!;
const dragInput = document.querySelector('#drag-input')!;
const dragSkip = document.querySelector('.drag-skip')!;

const canvasContainer = document.querySelector('.canvas-outline')!;
let canvasNode = document.querySelector('canvas')!;
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

function reinitCanvas() {
  const parent = canvasNode.parentElement;
  parent?.removeChild(canvasNode);
  canvasNode = document.createElement('canvas');
  parent?.appendChild(canvasNode);
}

let activeBackend = canvasPureJSOutliner;
function getOutlineFunction() {
  let backend = canvasPureJSOutliner;
  if (strokeBackendInput.value == 'webgl') {
    backend = canvasShaderOutliner;
  } else if (strokeBackendInput.value == 'wasm') {

  } else {
    backend = canvasPureJSOutliner;
  }

  if (backend != activeBackend) {
    reinitCanvas();
    activeBackend = backend;
  }
  return activeBackend;
}

function parseHEXColor(color: string): {r: number, g: number, b: number} {
  return {
    r: +('0x' + color[1] + color[2]),
    g: +('0x' + color[3] + color[4]),
    b: +('0x' + color[5] + color[6]),
  }
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
      const strokeColor = parseHEXColor(strokeColorInput.value);
      getOutlineFunction()(canvasNode, file, strokeWidth, strokeColor);
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
  //reinitCanvas();

  const strokeWidth = +strokeWidthInput.value;
  const strokeColor = parseHEXColor(strokeColorInput.value);
  getOutlineFunction()(canvasNode, filePath, strokeWidth, strokeColor);
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
  const strokeColor = parseHEXColor(strokeColorInputInteractive.value);

  getOutlineFunction()(canvasNode, filePath, +strokeWidthInputInteractive.value, strokeColor);
}

strokeWidthInputInteractive.addEventListener('change', handler);
strokeColorInputInteractive.addEventListener('change', handler);
