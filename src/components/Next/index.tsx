import "./index.scss";
import { useRef } from "react";
import useNextOver from "./hooks/useNextOver";
import useCanvasNext, { WIDTH, HEIGHT } from "./hooks/useCanvasNext";

const Next = () => {
  const nextRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasNext(canvasRef);
  useNextOver(nextRef);

  return (
    <div className="next">
      <canvas
        id="canvas-next"
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
      <button className="next-btn" ref={nextRef}>
        {"NEXT"}
      </button>
    </div>
  );
};

export default Next;
