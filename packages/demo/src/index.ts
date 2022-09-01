import { canvasOutliner } from 'canvas-outline';
import './style.css';

const dragContainer = document.querySelector('.drag-container')!;
const dragInput = document.querySelector('#drag-input')!;
const dragSkip = document.querySelector('.drag-skip')!;

const canvasContainer = document.querySelector('.canvas-outline')!;
const canvasNode = document.querySelector('canvas')!;
const saveImageButton = document.querySelector('#save-image')!;
const backHomeButton = document.querySelector('#back-home')!;

const strokeWidthInput: HTMLInputElement = document.querySelector('#strokeWidth')!;
const strokeWidthInputInteractive: HTMLInputElement = document.querySelector('#strokeWidthInteractive')!;
strokeWidthInputInteractive.value = strokeWidthInput.value;

const strokeColorInput: HTMLInputElement = document.querySelector('#strokeColor')!;
const strokeColorInputInteractive: HTMLInputElement = document.querySelector('#strokeColorInteractive')!;
strokeColorInputInteractive.value = strokeColorInput.value;

function toggleContainer() {
  dragContainer.classList.toggle('hidden');
  canvasContainer.classList.toggle('hidden');
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
      const strokeWidth = +strokeWidthInput.value;
      const strokeColor = strokeColorInput.value;
      canvasOutliner(canvasNode, file, strokeWidth, strokeColor);
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
});

saveImageButton.addEventListener('click', () => {
  imageReader.save();
});

backHomeButton.addEventListener('click', () => {
  toggleContainer();
});

dragSkip.addEventListener('click', () => {
  const strokeWidth = +strokeWidthInput.value;
  const strokeColor = strokeColorInput.value;
  canvasOutliner(canvasNode, './pikachu.png', strokeWidth, strokeColor);
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

strokeWidthInputInteractive.addEventListener('change', () => {
  if (strokeWidthInputInteractive) {
    const context = canvasNode.getContext('2d');
    context?.clearRect(0, 0, canvasNode.width, canvasNode.height);
    canvasOutliner(canvasNode, './pikachu.png', +strokeWidthInputInteractive.value, strokeColorInputInteractive.value);
  }
});

strokeColorInputInteractive.addEventListener('change', () => {
  if (strokeWidthInputInteractive) {
    const context = canvasNode.getContext('2d');
    context?.clearRect(0, 0, canvasNode.width, canvasNode.height);
    canvasOutliner(canvasNode, './pikachu.png', +strokeWidthInputInteractive.value, strokeColorInputInteractive.value);
  }
});
