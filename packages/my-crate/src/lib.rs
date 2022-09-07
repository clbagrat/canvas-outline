use wasm_bindgen::prelude::*;
use js_sys::Uint8ClampedArray;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

struct Fenwick2DTree {
    data: Vec<i32>,
    width: i32,
    height: i32,
}

impl Fenwick2DTree {
    fn new(width: i32, height: i32) -> Self {
        let mut data = Vec::new();
        data.reserve((width * height) as usize);
        for _ in 0..width*height {
            data.push(0);
        }
        return Fenwick2DTree {data, width, height}
    }

    fn add(&mut self, y: i32, x: i32, val: i32) {
        let mut i = y;
        while i < self.height {
            let iw = i * self.width;
            let mut j = x;
            while j < self.width {
                self.data[(iw + j) as usize] += val;
                j |= j + 1;
            }
            i |= i + 1;
        }
    }

    fn get(&self, y: i32, x: i32) -> i32 {
        let mut res = 0;
        let mut i = y;
        while i >= 0 {
            let iw = i * self.width;
            let mut j = x;
            while j >= 0 {
                res += self.data[(iw + j) as usize];
                j = (j&(j+1)) - 1;
            }
            i = (i&(i+1)) - 1;
        }
        res
    }
}

#[wasm_bindgen]
pub fn outline(data: Uint8ClampedArray, width: i32, height: i32, stroke_width: i32, r: u8, g: u8, b: u8) {
    let mut ft = Fenwick2DTree::new(width, height);
    for i in 0..height {
        for j in 0..width {
            let k = ((i * width + j) * 4) as u32;
            if data.get_index(k + 3) < 255 {
                continue;
            }
            let top = 0.max(i - stroke_width);
            let bottom = height.min(i + stroke_width + 1);
            let left = 0.max(j - stroke_width);
            let right = width.min(j + stroke_width + 1);
            ft.add(top, left,  1);
            ft.add(top, right, -1);
            ft.add(bottom, left, -1);
            ft.add(bottom, right,  1);
        }
    }
    for i in 0..height {
        for j in 0..width {
            let k = ((i * width + j) * 4) as u32;
            if data.get_index(k + 3) == 255 || ft.get(i, j) == 0 {
                continue;
            }
            data.set_index(k, r);
            data.set_index(k+1, g);
            data.set_index(k+2, b);
            data.set_index(k+3, 255);
        }
    }
}
