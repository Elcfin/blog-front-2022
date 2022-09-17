import useCanvas from "../../../../../hooks/useCanvas";
import { drawMountain } from "../../../../../utils/canvas";

export const WIDTH = 600;
export const HEIGHT = 500;
const FILL_COLOR = "#f5f6fa";

const canvasInfo = {
  width: WIDTH,
  height: HEIGHT,
  fill: FILL_COLOR,
};

const useCanvasMountain = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useCanvas(canvasRef, drawMountain(HEIGHT, WIDTH, FILL_COLOR), canvasInfo);
};

export default useCanvasMountain;
