import { useEffect, useState } from "react";
import throttle from "../../../utils/throttle";

const useMouseMove = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    const handler = throttle(fn, 0);

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  return position;
};

export default useMouseMove;
