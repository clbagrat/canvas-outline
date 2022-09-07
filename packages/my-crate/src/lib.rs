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

#[wasm_bindgen]
pub fn greet(mut data: Uint8ClampedArray, width: i32, height: i32, stroke_width: i32, r: u8, g: u8, b: u8) {
    let mut stroke = Vec::new();
    stroke.reserve((data.byte_length() / 4) as usize);
    for _ in 0..data.byte_length()/4 {
        stroke.push(false);
    }
    for i in 0..height {
        for j in 0..width {
            let k = ((i * width + j) * 4) as u32;
            if data.get_index(k + 3) < 255 {
                continue;
            }
            for si in 0.max(i - stroke_width)..height.min(i + stroke_width + 1) {
                for sj in 0.max(j - stroke_width)..width.min(j + stroke_width + 1) {
                    stroke[(si * width + sj) as usize] = true;
                }
            }
        }
    }
    for i in 0..height {
        for j in 0..width {
            let k = (i * width + j) as u32;
            if data.get_index(k * 4 + 3) == 255 || !stroke[k as usize] {
                continue;
            }
            set_pixel(&mut data, width, height, r, g, b, i, j);
        }
    }
}
