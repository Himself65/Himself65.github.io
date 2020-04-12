extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::vec::Vec;

#[wasm_bindgen]
pub struct ReplInstance {
    programs: Vec<JsValue>
}

#[wasm_bindgen]
impl ReplInstance {
    pub fn register(&self, program: JsValue) -> JsValue {
        if !program.is_function() {
            JsValue::from_bool(false)
        } else {
            JsValue::from_bool(true)
        }
    }
}

#[wasm_bindgen]
pub fn repl(line: &str) -> String {
    let v: Vec<&str> = line.split(' ').collect();
    return format!("{}", v[0]);
}
