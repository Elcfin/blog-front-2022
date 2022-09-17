import "./index.scss";

import { useRef } from "react";
import useCanvasCircle, { SIDE_LENGTH } from "./hooks/useCanvasCircle";

const CanvasCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasCircle(canvasRef);

  return (
    <canvas
      id="canvas-circle"
      ref={canvasRef}
      height={SIDE_LENGTH}
      width={SIDE_LENGTH}
    ></canvas>
  );
};

export default CanvasCircle;
