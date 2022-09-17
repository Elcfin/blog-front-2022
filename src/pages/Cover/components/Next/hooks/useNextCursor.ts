import { useEffect, useContext } from "react";
import { MouseContext } from "../../../../../hooks/useMouseOver";

const useNextCursor = (nextRef: React.RefObject<HTMLButtonElement>) => {
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

  return [setLeave];
};

export default useNextCursor;
