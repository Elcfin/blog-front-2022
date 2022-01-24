import useCanvas from "../../../hooks/useCanvas";

export const SIDE_LENGTH = 300;
const FILL_COLOR = "#f5f6fa";

const canvasInfo = {
  width: SIDE_LENGTH,
  height: SIDE_LENGTH,
  fill: FILL_COLOR,
};

const drawCircle = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.fillStyle = FILL_COLOR;
  ctx.arc(SIDE_LENGTH / 2, SIDE_LENGTH / 2, SIDE_LENGTH / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

const useCanvasCircle = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useCanvas(canvasRef, drawCircle, canvasInfo);
};

export default useCanvasCircle;
