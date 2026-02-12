import React from "react";
import Pagination from "./pagination/Pagination";
import DynamicJsxBuilder from "./dynamicJsxBuilder/DynamicJsxBuilder";
import Autocomplete from "./autocomplete/Autocomplete";
import useFetchData from "./dataFetching/useFetchData";
import { useEffect } from "react";
import Posts from "./dataFetching/Posts";


function App() {
  const { fetchData } = useFetchData();
  useEffect(() => {
    fetchData(`https://jsonplaceholder.typicode.com/posts`);
  },[])

  
  return (
    <div>
      <Posts />
     {/* <Autocomplete /> */}
   </div>
  );
}

export default App;
