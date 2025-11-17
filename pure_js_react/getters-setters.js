let reactiveObj = {};
let _value = "Hello";


Object.defineProperty(reactiveObj, "value", {
    get() {
        return _value;
    },

    set(newValue) {
    _value = newValue;
    }
})