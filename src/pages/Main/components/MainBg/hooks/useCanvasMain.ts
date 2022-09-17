import { useEffect } from "react";
import { drawCircle, drawMountain } from "../../../../../utils/canvas";

export const WIDTH = 600;
export const HEIGHT = 500;
export const SIDE_LENGTH = 300;
const FILL_COLOR = "#14161a";

const useCanvasMain = (
  canvasCircleRef: React.RefObject<HTMLCanvasElement>,
  canvasMountainRef: React.RefObject<HTMLCanvasElement>
) => {
  useEffect(() => {
    if (canvasCircleRef.current) {
      const ctx = canvasCircleRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      drawCircle(SIDE_LENGTH, FILL_COLOR)(ctx);
    }
    if (canvasMountainRef.current) {
      const ctx = canvasMountainRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      drawMountain(HEIGHT, WIDTH, FILL_COLOR)(ctx);
    }
  });
};

export default useCanvasMain;
