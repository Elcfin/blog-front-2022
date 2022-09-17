import { useRef } from "react";

import useCanvasMain, {
  HEIGHT,
  WIDTH,
  SIDE_LENGTH,
} from "./hooks/useCanvasMain";

import "./index.scss";

const MainBg = () => {
  const canvasCircleRef = useRef(null);
  const canvasMountainRef = useRef(null);
  useCanvasMain(canvasCircleRef, canvasMountainRef);

  return (
    <div>
      <canvas
        id="canvas-circle-main"
        ref={canvasCircleRef}
        height={SIDE_LENGTH}
        width={SIDE_LENGTH}
      ></canvas>
      <canvas
        id="canvas-mountain-main"
        ref={canvasMountainRef}
        height={HEIGHT}
        width={WIDTH}
      ></canvas>
    </div>
  );
};

export default MainBg;
