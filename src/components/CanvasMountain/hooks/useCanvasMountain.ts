import useCanvas from "../../../hooks/useCanvas";

export const WIDTH = 600;
export const HEIGHT = 500;
const FILL_COLOR = "#f5f6fa";

const canvasInfo = {
  width: WIDTH,
  height: HEIGHT,
  fill: FILL_COLOR,
};

const drawMountain = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.strokeStyle = FILL_COLOR;
  ctx.moveTo(0, HEIGHT);
  ctx.bezierCurveTo(
    0.65 * WIDTH,
    0.67 * HEIGHT,
    0.68 * WIDTH,
    0.02 * HEIGHT,
    WIDTH,
    0
  );
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.stroke();
  ctx.closePath();
};

const useCanvasMountain = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useCanvas(canvasRef, drawMountain, canvasInfo);
};

export default useCanvasMountain;
