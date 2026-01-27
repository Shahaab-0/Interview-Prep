
function deepClone(value,seen = new WeakMap()) {
    if( value == null || typeof value != 'object') return value;
    let result = Array.isArray(value) ? [] : {};
    if (seen.has(value)) {
        return seen.get(value);
    }
    seen.set(value, result);
    for(let key in value){
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            result[key] = deepClone(value[key], seen);
        }
    }
    return result;
}

const original = {
  a: 1,
  b: { c: 2 },
  d: [11, 7],
};
original.self = original; // Circular reference!

const copy = deepClone(original);
console.log(copy!== original); // true
console.log(copy.b!== original.b); // true
console.log(copy.self === copy); // true (circularity preserved)
console.log(copy, original, 'afwfew');
