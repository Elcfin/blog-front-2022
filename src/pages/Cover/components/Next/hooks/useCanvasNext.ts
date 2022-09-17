import useCanvas from "../../../../../hooks/useCanvas";

export const WIDTH = 124;
export const HEIGHT = 54;
const FILL_COLOR = "#f5f6fa";

const canvasInfo = {
  width: WIDTH,
  height: HEIGHT,
  fill: FILL_COLOR,
};

const drawSquare = (ctx: CanvasRenderingContext2D) => {
  const radius = 4;
  ctx.beginPath();
  ctx.strokeStyle = FILL_COLOR;
  ctx.lineWidth = 6;
  ctx.moveTo(radius, 0);
  ctx.lineTo(WIDTH - radius, 0);
  ctx.lineTo(WIDTH, radius);
  ctx.lineTo(WIDTH, HEIGHT - radius);
  ctx.lineTo(WIDTH - radius, HEIGHT);
  ctx.lineTo(radius, HEIGHT);
  ctx.lineTo(0, HEIGHT - radius);
  ctx.lineTo(0, radius);
  ctx.lineTo(radius, 0);
  ctx.stroke();
  ctx.closePath();
};

const useCanvasNext = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useCanvas(canvasRef, drawSquare, canvasInfo);
};

export default useCanvasNext;
