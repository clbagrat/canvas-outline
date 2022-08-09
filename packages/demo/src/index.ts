import { canvasOutliner } from 'canvas-outline';
import './style.css';

const dragContainer = document.querySelector('.drag-container')!;
const dragInput = document.querySelector('#drag-input')!;
const dragSkip = document.querySelector('.drag-skip')!;

// dragContainer.addEventListener('drop', (event) => {
//     event.preventDefault()
//     console.log(event)
// })

const canvasContainer = document.querySelector('.canvas-outline')!;
const canvasNode = document.querySelector('canvas')!;
const saveImageButton = document.querySelector('#save-image')!;
const backHomeButton = document.querySelector('#back-home')!;

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
      canvasOutliner(canvasNode, file);
      toggleContainer();
    }
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
  imageReader.open((event.target as HTMLInputElement).files);
})

saveImageButton.addEventListener('click', () => {
  imageReader.save();
})

backHomeButton.addEventListener('click', () => {
  toggleContainer();
})

dragSkip.addEventListener('click', () => {
  canvasOutliner(canvasNode, './pikachu.png');
  toggleContainer();
})
