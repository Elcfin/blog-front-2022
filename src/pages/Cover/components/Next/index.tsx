import "./index.scss";
import { useRef } from "react";
import useNextCursor from "./hooks/useNextCursor";
import useCanvasNext, { WIDTH, HEIGHT } from "./hooks/useCanvasNext";

interface NextProps {
  btnClickHandler: () => void;
}

const Next = (props: NextProps) => {
  const nextRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasNext(canvasRef);
  const [setLeave] = useNextCursor(nextRef);

  return (
    <div className="next">
      <canvas
        id="canvas-next"
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
      <button
        className="next-btn"
        ref={nextRef}
        onClick={() => {
          props.btnClickHandler();
          setLeave();
        }}
      >
        {"NEXT"}
      </button>
    </div>
  );
};

export default Next;
