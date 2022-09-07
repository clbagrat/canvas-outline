use wasm_bindgen::prelude::*;
use js_sys::Uint8ClampedArray;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

fn set_pixel(data: &mut Uint8ClampedArray, width: i32, _height: i32, r: u8, g: u8, b: u8, i: i32, j: i32) {
    let k = ((i * width + j) * 4) as u32;
    data.fill(r, k, k + 1);
    data.fill(g, k + 1, k + 2);
    data.fill(b, k + 2, k + 3);
    data.fill(255, k + 3, k + 4);
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
pub fn outline(mut data: Uint8ClampedArray, width: i32, height: i32, stroke_width: i32, r: u8, g: u8, b: u8) {
    let mut ft = Fenwick2DTree::new(width, height);
    for i in 0..height {
        for j in 0..width {
            let k = ((i * width + j) * 4) as u32;
            if data.get_index(k + 3) < 255 {
                continue;
            }
            let i0 = 0.max(i - stroke_width);
            let i1 = height.min(i + stroke_width + 1);
            let j0 = 0.max(j - stroke_width);
            let j1 = width.min(j + stroke_width + 1);
            ft.add(i0, j0,  1);
            ft.add(i0, j1, -1);
            ft.add(i1, j0, -1);
            ft.add(i1, j1,  1);
        }
    }
    for i in 0..height {
        for j in 0..width {
            let k = (i * width + j) as u32;
            if data.get_index(k * 4 + 3) == 255 || ft.get(i, j) == 0 {
                continue;
            }
            set_pixel(&mut data, width, height, r, g, b, i, j);
        }
    }
}
