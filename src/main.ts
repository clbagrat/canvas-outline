import { canvasOutliner } from './canvasOutliner';
import './style.css';

const overlayOpenFile = document.querySelector('.overlay-open-image')!;
const overlayCanvas = document.querySelector('.overlay-canvas')!;

const canvasNode = document.querySelector('canvas')!;
const imageUpload = document.querySelector('.image-upload')!;
const defaultImage = document.querySelector('.open-default-image')!;
const saveImage = document.querySelector('.save-image')!;
const backToHome = document.querySelector('.back-to-home')!;

function toggleOverlay() {
  overlayOpenFile.classList.toggle('hidden');
  overlayCanvas.classList.toggle('hidden');
}

class ImageReader {
  private reader: FileReader;
  public fileName: string | undefined;

  constructor() {
    this.reader = new FileReader();
  }

  open(files: FileList | null): void {
    if (!files || files.length === 0) return;

    this.reader.readAsDataURL(files[0]);
    this.reader.onload = (event) => {
      this.fileName = files[0].name;
      const file = event.target?.result as string;
      canvasOutliner(canvasNode, file);
      toggleOverlay();
    }
  }

  save(): void {
    const link = document.createElement('a');
    link.download = this.fileName ?
      `${this.fileName}-outline` :
      'canvas-outline.png';
    link.href = canvasNode.toDataURL();
    link.click();
    link.remove();
  }
}

const imageReader = new ImageReader();

imageUpload.addEventListener('change', (event) => {
  imageReader.open((event.target as HTMLInputElement).files);
})

defaultImage.addEventListener('click', () => {
  canvasOutliner(canvasNode, './pikachu.png');
  toggleOverlay();
})

saveImage.addEventListener('click', () => {
  imageReader.save();
})

backToHome.addEventListener('click', () => {
  toggleOverlay();
})
