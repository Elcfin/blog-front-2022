import { useEffect, useContext } from "react";
import { MouseContext } from "../../../hooks/useMouseOver";

const useNextOver = (nextRef: React.RefObject<HTMLButtonElement>) => {
  const { setOver, setLeave } = useContext(MouseContext);

  useEffect(() => {
    if (nextRef.current) {
      nextRef.current.addEventListener("mouseover", () => {
        setOver();
      });
      nextRef.current.addEventListener("mouseout", () => {
        setLeave();
      });
    }
  });
};

export default useNextOver;
