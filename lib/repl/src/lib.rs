extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::vec::Vec;
use js_sys::*;

struct ReplInstance {}

#[wasm_bindgen]
pub fn register(&mut repl_instance: ReplInstance, program: Function) -> Boolean {
    if !program.is_function() {
        false.into()
    } else {
        // fixme
        match program.apply(&repl_instance.context, &Array::from(&JsValue::UNDEFINED)) {
            Ok(obj) => repl_instance.programs.push(obj.into()),
            Err(error) => {}
        }
        true.into()
    }
}

#[wasm_bindgen]
pub fn repl(line: &str) -> String {
    let v: Vec<&str> = line.split(' ').collect();
    return format!("{}", v[0]);
}
