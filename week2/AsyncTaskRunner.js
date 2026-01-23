// ### **Uber | Machine Coding: Asynchronous Task Runner (Concurrency Limit)**

// **Question:** Imagine Uber is fetching data for 100 nearby drivers. To avoid hitting API rate limits or crashing the browser with too many simultaneous requests, you must implement a "Batch Runner."

// Write a function `promiseAllWithConcurrencyLimit` that takes an array of "task functions" (functions that return a promise) and a limit `limit`. It should execute no more than `limit` tasks at any given time. As soon as one task finishes, the next one in the queue should start.

// **Snippet & Input Data:**

async function promiseAllWithConcurrencyLimit(tasks, limit) {
  let completedTask = 0;
  const queuedTasks = [];
  const n = tasks.length;
  const results = new Array(n);

  return new Promise((resolve, reject) => {
    const runNext = () => {
      if (completedTask === n) {
        return resolve(results);
      }

      while (queuedTasks.length < limit && tasks.length > 0) {
        const currentIndex = completedTask + queuedTasks.length;
        const task = tasks.shift();
        queuedTasks.push(task);
        task()
          .then((result) => {
            results[currentIndex] = result;
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            queuedTasks.splice(queuedTasks.indexOf(task), 1);
            completedTask++;
            runNext();
          });
      }
    };

    runNext();
  });
}

// --- Input Data for Testing ---
const createDriverTask = (id, delay) => () =>
  new Promise((resolve) => {
    console.log(` Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(` Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });
//   const createRejectDriverTask = (id, delay) => () =>
//   new Promise((resolve, reject) => {
//     console.log(` Fetching Driver ${id}...`);
//     setTimeout(() => {
//       console.log(` Driver ${id} loaded`);
//       reject(`Data for Driver ${id}`);
//     }, delay);
//   });

const promise1 = createDriverTask(1, 1000);
const promise2 = createDriverTask(2, 500);
const promise3 = createDriverTask(3, 1500);
const promise4 = createDriverTask(4, 700);
const promise5 = createDriverTask(5, 1200);
const promise6 = createDriverTask(6, 300);
const promise7 = createDriverTask(7, 800);

const tasks = [
  promise1,
  promise2,
  promise3,
  promise4,
  promise5,
  promise6,
  promise7,
];

// If limit is 2, Task 1 and 2 start.
// When Task 2 finishes at 0.5s, Task 3 starts immediately.
promiseAllWithConcurrencyLimit(tasks, 2).then((results) => {
  console.log("All tasks completed:", results);
});
