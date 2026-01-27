function debounce(func, wait, immediate = false) {
  let timeout;

  return function (...args) {
    const context = this;
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

// Usage in UI:
const onSearch = debounce((val) => console.log("Searching for: " + val), 300, true);
// document.getElementById('search').addEventListener('input', onSearch);
onSearch("Debounce Polyfill");
setTimeout(() => {
onSearch("Debounce Polyfill");

}, 3000);