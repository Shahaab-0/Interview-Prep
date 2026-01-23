// ### **Microsoft | Technical Round: The Microtask Priority Riddle**

// **Question:** Predict the exact output. Explain why the `asyncFn` behaves differently than a standard promise chain.

console.log('1 - Sync');

setTimeout(() => {
  console.log('2 - Macrotask');
}, 0);

async function asyncFn() {
  console.log('3 - Inside Async');
  await Promise.resolve();
  console.log('4 - After Await');
}

asyncFn();

Promise.resolve().then(() => {
  console.log('5 - Microtask');
});

console.log('6 - Sync End')


// **Expected Output:**
// 1 - Sync
// 3 - Inside Async
// 6 - Sync End
// 4 - Microtask
// 5 - Microtask
// 2 - Macrotask

// **Explanation:**
// 1. The synchronous logs (`1 - Sync` and `6 - Sync End`) are executed first.
// 2. The `asyncFn` is called, logging `3 - Inside Async`. 
// 3. The promise.resolve moves the task to the microtask queue so after 3 we have 1 execution present in micro task
//     and one execution in macro task so the micro task is picked and 4 prints and the code runs forward
// 4. After that in line number 19 another promise which is moved to micro task queue and is given priority over
//    the macro task so 5 is picked up next.
// 5. Finally, the macrotask from the `setTimeout` is executed last, logging `2 - Macrotask`.