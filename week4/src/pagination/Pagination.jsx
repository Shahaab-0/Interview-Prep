import { useEffect, useRef, useState } from "react";

const LIMIT = 10;

export default function Pagination() {
  const containerRef = useRef(null);

    const cacheRef = useRef({});
    const hasNextPage = useRef(true);
    const loadingRef = useRef(false);
    const searchRef = useRef("");
    const productLength = useRef(0);

    const [products, setProducts] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  const fetchProducts = async (skip) => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchRef.current}&limit=${LIMIT}&skip=${skip}`
    );

    if (!res.ok) throw new Error("Failed to fetch");

    return res.json();
  };
  
  const fetchMoreData = async () => {
    if (loadingRef.current || !hasNextPage.current ) return;

    const currentSearch = searchRef.current;

    if (productLength.current == 0 && cacheRef.current[currentSearch]) {
      productLength.current = cacheRef.current[currentSearch].length
      setProducts(cacheRef.current[currentSearch]);
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);

      const skip = productLength.current;

      const data = await fetchProducts(skip);
      setProducts((prev) => {
        const updated = [...prev, ...data.products];
        hasNextPage.current = data.total !== updated.length;
        cacheRef.current[currentSearch] = updated;
        productLength.current = updated.length;
        return updated;
      });
      hasNextPage.current = data.total !== productLength.current;

    } catch (e) {
      setError(e);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };


  useEffect(() => {
    const el = containerRef.current;

    const handleScroll = () => {
      const bottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

      if (bottom) {
        fetchMoreData();
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    fetchMoreData();
  },[searchVal])

  // if(products.length == 0 && !loadingRef.current) return 

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        padding: 16,
      }}
    >
      <input
        placeholder="Search products..."
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
          searchRef.current = e.target.value;
          setProducts([]);
          productLength.current = 0
          hasNextPage.current = true
        }}
        style={{ marginBottom: 16, padding: 8 }}
      />
      {products.length == 0 && !loadingRef.current && <p>No Record Found</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {products.map((item) => (
        <div key={item.id} style={{ marginBottom: 14 }}>
          <b>{item.title} {item.id}</b>
          <p>{item.description}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
}