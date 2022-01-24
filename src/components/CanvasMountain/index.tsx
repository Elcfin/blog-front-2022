import "./index.scss";

import { useRef } from "react";
import useCanvasMountain, { HEIGHT, WIDTH } from "./hooks/useCanvasMountain";

const CanvasMountain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useCanvasMountain(canvasRef);

  return (
    <canvas
      id="canvas-mountain"
      ref={canvasRef}
      height={HEIGHT}
      width={WIDTH}
    ></canvas>
  );
};

export default CanvasMountain;
