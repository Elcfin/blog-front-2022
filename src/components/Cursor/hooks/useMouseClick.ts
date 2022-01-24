import { useEffect, useState } from "react";

const useMouseClick = () => {
  const [isClick, setIsClick] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (isClick === false) {
        setPosition({
          x: e.pageX,
          y: e.pageY,
        });
        setIsClick(true);
        setTimeout(() => {
          setIsClick(false);
        }, 600);
      }
    };

    window.addEventListener("click", fn);
    return () => {
      window.removeEventListener("click", fn);
    };
  }, [isClick]);
  return { isClick, position };
};

export default useMouseClick;
