import { useEffect, useRef, useState } from "react";

const useWindowDimension = () => {
  const dimension = useRef({width : window.innerWidth, height : window.innerHeight});
  const [size, setSize] = useState({width : window.innerWidth, height : window.innerHeight});


  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if(newWidth != dimension.current.width || newHeight != dimension.current.height){
          const newSize = { width: newWidth, height: newHeight };

        dimension.current = newSize; // update ref
        setSize(newSize);  
      }
     
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { size };
};
export default useWindowDimension;
