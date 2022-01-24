import "./index.scss";
import { useRef } from "react";
import useNextOver from "./hooks/useNextOver";

const Next = () => {
  const nextRef = useRef<HTMLButtonElement>(null);
  useNextOver(nextRef);

  return (
    <div className="next">
      <button className="next-btn" ref={nextRef}>
        {"NEXT"}
      </button>
    </div>
  );
};

export default Next;
