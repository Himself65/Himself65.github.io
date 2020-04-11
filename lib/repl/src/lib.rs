extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use std::vec::Vec;

#[wasm_bindgen]
struct ReplInstance {
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

#[cfg(test)]
mod tests {
    use crate::*;

    #[test]
    fn repl_base() {
        assert_eq!(repl(""), "");
        assert_eq!(repl("foo"), "foo");
        assert_eq!(repl("foo goo"), "foo");
    }
}
