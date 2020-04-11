extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn repl(line: &str) -> String {
    return format!("");
}

#[cfg(test)]
mod tests {
    use crate::repl;

    #[test]
    fn repl_base() {
        assert_eq!(repl(""), "");
    }
}
