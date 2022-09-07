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
    width: i32,
    height: i32,
}

impl PrefixSum2D {
    fn new(width: i32, height: i32) -> Self {
        let mut data = Vec::new();
        data.reserve((width * height) as usize);
        for _ in 0..width*height {
            data.push(0);
        }
        return PrefixSum2D {data, width, height}
    }

    // add val to [0..y, 0..x] subarray
    fn add(&mut self, i: i32, j: i32, val: i32) {
        if i >= self.height || j >= self.width {
            return
        }
        self.add_unsafe(i.min(self.height-1), j.min(self.width-1), val);
    }

    fn add_unsafe(&mut self, i: i32, j: i32, val: i32) {
        self.data[(i * self.width + j) as usize] += val;
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

    fn get(&self, i: i32, j: i32) -> i32 {
        self.data[(i * self.width + j) as usize]
    }
}

#[wasm_bindgen]
pub fn outline(data: Uint8ClampedArray, width: i32, height: i32, stroke_width: i32, r: u8, g: u8, b: u8) {
    let mut pref = PrefixSum2D::new(width, height);
    for i in 0..height {
        for j in 0..width {
            let k = ((i * width + j) * 4) as u32;
            if data.get_index(k + 3) < 255 {
                continue;
            }
            let top = 0.max(i-stroke_width);
            let left = 0.max(j-stroke_width);
            let bottom = i+stroke_width+1;
            let right = j+stroke_width+1;
            pref.add(top, left,  1);
            pref.add(top, right, -1);
            pref.add(bottom, left, -1);
            pref.add(bottom, right, 1);
        }
    }
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
