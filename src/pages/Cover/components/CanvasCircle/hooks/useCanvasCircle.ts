import useCanvas from "../../../../../hooks/useCanvas";
import { drawCircle } from "../../../../../utils/canvas";

export const SIDE_LENGTH = 300;
const FILL_COLOR = "#f5f6fa";

const canvasInfo = {
  width: SIDE_LENGTH,
  height: SIDE_LENGTH,
  fill: FILL_COLOR,
};

const useCanvasCircle = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useCanvas(canvasRef, drawCircle(SIDE_LENGTH, FILL_COLOR), canvasInfo);
};

export default useCanvasCircle;
