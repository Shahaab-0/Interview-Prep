import React, { useEffect, useRef, useState } from "react";

export default function Autocomplete() {
  const cacheRef = useRef({});
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [displayVal, setDisplayVal] = useState('');


  // Fetch + cache
  const fetchData = async (query) => {
    if (!query) {
      setData([]);
      return;
    }

    if (cacheRef.current[query]) {
      setData(cacheRef.current[query]);
      return;
    }

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?q=${query}`
    );
    const json = await res.json();

    cacheRef.current[query] = json;
    setData(json);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(input);
      setIsOpen(true);
      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  // Keyboard handling
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((prev) =>
          Math.min(prev + 1, data.length - 1)
        );
        break;

      case "ArrowUp":
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;

      case "Enter":
        if (activeIndex >= 0) {
        setDisplayVal(data[activeIndex].title)
        setIsOpen(false);
        //   selectItem(data[activeIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  const selectItem = (item) => {
    setInput(item.title);
    setIsOpen(false);
  };

  const handleBlur = () => {
    // Delay to allow click selection
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div style={{ width: 400 }}>
      <input
        ref={inputRef}
        value={displayVal || input}
        onChange={(e) => {
            setInput(e.target.value)
            setDisplayVal('');
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Search posts..."
        style={{ width: "100%", padding: "8px" }}
      />

      {isOpen && data.length > 0 && (
        <ul
          style={{
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {data.map((item, index) => (
            <li
              key={item.id}
              onMouseDown={() => selectItem(item)}
              style={{
                padding: "8px",
                background:
                  index === activeIndex ? "#eee" : "#fff",
                cursor: "pointer",
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}