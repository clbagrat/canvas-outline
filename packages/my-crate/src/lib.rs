use wasm_bindgen::prelude::*;
use js_sys::Uint8ClampedArray;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// 2d array with special abilities
struct PrefixSum2D {
    data: Vec<i32>,
    width: usize,
    height: usize,
}

impl PrefixSum2D {
    fn new(width: usize, height: usize) -> Self {
        let data = vec![0; width*height];
        return PrefixSum2D {data, width, height}
    }

    // add val to [0..y, 0..x] subarray
    fn add(&mut self, i: usize, j: usize, val: i32) {
        if i >= self.height || j >= self.width {
            return
        }
        self.add_unsafe(i.min(self.height-1), j.min(self.width-1), val);
    }

    fn add_unsafe(&mut self, i: usize, j: usize, val: i32) {
        self.data[i * self.width + j] += val;
    }

    fn fill_prefix_sums(&mut self) {
        for i in 1..self.height {
            self.add_unsafe(i, 0, self.get(i-1, 0));
        }
        for j in 1..self.width {
            self.add_unsafe(0, j, self.get(0, j-1));
        }
        for i in 1..self.height {
            for j in 1..self.width {
                self.add_unsafe(i, j, self.get(i-1, j) + self.get(i, j-1) - self.get(i-1, j-1))
            }
        }
    }

    fn get(&self, i: usize, j: usize) -> i32 {
        self.data[i * self.width + j]
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
        .map(|(i, j)| {
            let top = if i>stroke_width {i-stroke_width} else {0};
            let left = if j>stroke_width {j-stroke_width} else {0};
            let bottom = i+stroke_width+1;
            let right = j+stroke_width+1;
            (top, left, bottom, right)
        })
        .for_each(|(top, left, bottom, right)| {
            pref.add_unsafe(top, left,  1);
            pref.add(top, right, -1);
            pref.add(bottom, left, -1);
            pref.add(bottom, right, 1);
        });
    pref.fill_prefix_sums();
    for i in 0..height {
        for j in 0..width {
            let k = ((i * width + j) * 4) as u32;
            if data.get_index(k + 3) == 255 || pref.get(i, j) == 0 {
                continue;
            }
            data.set_index(k, r);
            data.set_index(k+1, g);
            data.set_index(k+2, b);
            data.set_index(k+3, 255);
        }
    }
}
