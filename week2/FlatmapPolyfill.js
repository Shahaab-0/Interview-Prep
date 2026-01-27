const nestedData = [2, [7, 8, [9, 10, 11]], 3, [[12]]];

/**
 * @param {Array} arr
 * @param {number} depth
 */

const flattenArr = (arr, depth) => {
    if(!Array.isArray(arr)) return [];
    if(depth === 0) return arr;
    let result = [];
    for(const element of arr){
      if(Array.isArray(element)){
        result = result.concat(flattenArr(element, depth - 1));
      }else{
        result.push(element);
      }
    }
    return result
  }
function customFlat(arr, depth = 1) {
  // Your recursive implementation here
    return flattenArr(arr, depth);
}

console.log(customFlat(nestedData, 1));
console.log(customFlat(nestedData, 2));
console.log(customFlat(nestedData, Infinity)); // [9, 10, 11, 7, 8, 12]