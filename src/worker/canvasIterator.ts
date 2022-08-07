function getIndexByCoords(y: number, x: number, width: number, maxLength: number) {
  if (x < 0 || x > width || y < 0) {
    return null;
  }
  let res = (x + y * width) * 4;

  if (res >= maxLength) {
    return null;
  }

  return res;
}

function* neighbours (data: Uint8ClampedArray, index: number, width: number, strokeWidth: number) {
    let x = index / 4 % width;
    let y = Math.floor(index / 4 / width);

    let neighbours: [number, number][] = [];

    for (let i = 1; i <= strokeWidth; i += 1) {
      for (let x1 = x - strokeWidth; x1 < x + strokeWidth; x1 += 1) {
        neighbours.push([y - i, x1]);
        if (x1 !== x) {
          neighbours.push([y, x1]);
        }
        neighbours.push([y+i, x1]);
      }
    }

    for (let [y, x] of neighbours) {
      let i = getIndexByCoords(y, x, width, data.length);
      if (i !== null && data[i + 3] === 0) {
        yield {
          index: i
        }
      }
    }
}

export function* canvasIterator (data: Uint8ClampedArray, width: number, strokeWidth: number) {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] > 0) {
      for (let { index } of neighbours(data, i, width, strokeWidth)) {
        yield  {
          index 
        }
      }
    };
  }
}
