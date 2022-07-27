export function* canvasIterator (data: Uint8ClampedArray, width: number) {
  for (let i = 3; i < data.length; i += 4) {
    let color = [data[i-3], data[i-2], data[i-1], data[i]];
    let rel = (i + 1) / 4;
    let coords = {
      x: rel % width,
      y: Math.floor(rel / width)
    };

    yield {
      color, coords
    };
  }
}
