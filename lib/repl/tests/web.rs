extern crate repl;

use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
pub fn register_test() {
    assert_eq!(repl(""), "");
    assert_eq!(repl("foo"), "foo");
    assert_eq!(repl("foo goo"), "foo");
}