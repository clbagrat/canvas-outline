use wasm_bindgen::prelude::{wasm_bindgen};
use js_sys::Uint8ClampedArray;

struct PrefixSum2D {
    data: Vec<i32>,
    width: usize,
    height: usize,
}

impl PrefixSum2D {
    fn new(width: usize, height: usize) -> Self {
        return PrefixSum2D {
            data: vec![0; width*height],
            width,
            height,
        }
    }

    fn add(&mut self, i: usize, j: usize, val: i32) {
        self.data[i * self.width + j] += val;
    }

    fn get(&self, i: usize, j: usize) -> i32 {
        self.data[i * self.width + j]
    }

    fn fill_prefix_sums(&mut self) {
        for i in 1..self.height {
            self.add(i, 0, self.get(i-1, 0));
        }
        for j in 1..self.width {
            self.add(0, j, self.get(0, j-1));
        }
        for i in 1..self.height {
            for j in 1..self.width {
                self.add(i, j, self.get(i-1, j) + self.get(i, j-1) - self.get(i-1, j-1))
            }
        }
    }
}

#[wasm_bindgen]
pub fn outline(data: Uint8ClampedArray, width: usize, height: usize, stroke_width: usize, r: u8, g: u8, b: u8) {
    let mut pref = PrefixSum2D::new(width, height);
    (0..height)
        .into_iter()
        .flat_map(|i| (0..width)
            .into_iter()
            .map(move |j| (i, j)))
        .filter(|(i, j)| {
            let k = ((i * width + j) * 4) as u32;
            return data.get_index(k + 3) == 255
        })
        .flat_map(|(i, j)| {
            let top = if i>stroke_width {i-stroke_width} else {0};
            let left = if j>stroke_width {j-stroke_width} else {0};
            let bottom = i+stroke_width+1;
            let right = j+stroke_width+1;
            match (bottom < height, right < width) {
            (true, true) => vec![
                    (top, left, 1),
                    (top, right, -1),
                    (bottom, left, -1),
                    (bottom, right, 1),
                ],
            (false, true) => vec![
                    (top, left, 1),
                    (top, right, -1),
                ],
            (true, false) => vec![
                    (top, left, 1),
                    (bottom, left, -1),
                ],
            (false, false) => vec![
                    (top, left, 1),
                ],
            }
        })
        .for_each(|(i, j, val)| {
            pref.add(i, j, val);
        });
    pref.fill_prefix_sums();
    (0..height)
        .into_iter()
        .flat_map(|i| (0..width)
            .into_iter()
            .map(move |j| (i, j)))
        .filter(|(i, j)| {
            let k = ((i * width + j) * 4) as u32;
            data.get_index(k + 3) != 255 && pref.get(*i, *j) != 0
        })
        .map(|(i, j)| {
            ((i * width + j) * 4) as u32
        })
        .for_each(|k| {
            data.set_index(k, r);
            data.set_index(k+1, g);
            data.set_index(k+2, b);
            data.set_index(k+3, 255);
        })
}
