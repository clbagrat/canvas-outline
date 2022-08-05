function* neighbours (data: Uint8ClampedArray, index: number, width: number) {
    function getIndexByCoords(y: number, x: number) {
      if (x < 0 || x > width || y < 0) {
        return null;
      }
      let res = (x + y * width) * 4;

      if (res >= data.length) {
        return null
      }

      return res;
    }

    function getColorFromIndex(index: number, y: number, x: number) {
      return [data[index], data[index + 1], data[index + 2], data[index + 3]];
    }

    let x = index / 4 % width;
    let y = Math.floor(index / 4 / width);

    let neighbours = [
      [y - 1, x - 1],
      [y - 1, x],
      [y - 1, x + 1],

      [y, x - 1],
      [y, x + 1],

      [y + 1, x - 1],
      [y + 1, x],
      [y + 1, x + 1],
    ];

    for (let [y, x] of neighbours) {
      let i = getIndexByCoords(y, x);
      if (i !== null) {
        yield {
          color: getColorFromIndex(i, y, x),
          coords: {
            x,
            y
          },
          i
        }
      }
    }
}

export function* canvasIterator (data: Uint8ClampedArray, width: number) {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] !== 0) {
      let transparent = [...neighbours(data, i, width)].filter(
        ({ color }) => {
          return color[3] === 0;
        }
      );

      for (let n of transparent) {
        yield  {
          pixel: n,
          index: i
        }
      }
    };
  }
}
