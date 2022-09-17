import { useEffect, useState } from "react";

type pointPosition = [x: number, y: number];
const bezier = (
  t: number,
  startPoint: pointPosition,
  endPoint: pointPosition,
  cp1: pointPosition,
  cp2: pointPosition
) => {
  const [startX, startY] = startPoint;
  const [endX, endY] = endPoint;
  const [cpX1, cpY1] = cp1;
  const [cpX2, cpY2] = cp2;

  const x =
    startX * Math.pow(1 - t, 3) +
    3 * cpX1 * t * Math.pow(1 - t, 2) +
    3 * cpX2 * Math.pow(t, 2) * (1 - t) +
    endX * Math.pow(t, 3);
  const y =
    startY * Math.pow(1 - t, 3) +
    3 * cpY1 * Math.pow(1 - t, 2) * t +
    3 * cpY2 * (1 - t) * Math.pow(t, 2) +
    endY * Math.pow(t, 3);
  return {
    x,
    y,
  };
};

const mousePosition = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  /* 鼠标相对于视口的位置 */
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

export class Particle {
  x;
  y;
  initX;
  initY;
  fill;
  radius = 1;
  item = 0; //贝塞尔曲线系数
  vx = 20;
  vy = 16;

  constructor({
    x,
    y,
    width,
    height,
    fill,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
  }) {
    this.x = x;
    this.y = y;
    this.initX = Math.random() * width;
    this.initY = Math.random() * height;
    this.fill = fill;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    const { x, y } = bezier(
      this.item,
      [this.initX, this.initY],
      [this.x, this.y],
      [this.x, this.y],
      [this.x, this.y]
    );
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.closePath();
    if (this.item < 1) this.item += 0.01;
  }

  update(offset: { top: number; left: number }) {
    if (
      Math.pow(mousePosition.x - this.x - offset.left, 2) +
        Math.pow(mousePosition.y - this.y - offset.top, 2) <
      2500
    ) {
      if (this.item > -1) this.item -= 0.02;
    }
  }
}

export type CanvasInfoType = { width: number; height: number; fill: string };

export const createViceCanvas = (
  draw: (ctx: CanvasRenderingContext2D) => void,
  canvasInfo: CanvasInfoType
) => {
  const viceCanvas = document.createElement("canvas");
  viceCanvas.width = canvasInfo.width;
  viceCanvas.height = canvasInfo.height;
  const viceCtx = viceCanvas.getContext("2d") as CanvasRenderingContext2D;
  draw(viceCtx);

  return getContentInfo(viceCtx, canvasInfo);
};

/* 遍历像素读点 */
const getContentInfo = (
  ctx: CanvasRenderingContext2D,
  { width, height, fill }: CanvasInfoType
) => {
  const imgData = ctx.getImageData(0, 0, width, height).data;
  const particles: Particle[] = [];

  for (let x = 0; x <= width; x += 4)
    for (let y = 0; y <= height; y += 4) {
      const fontIndex = (x + y * width) * 4 + 3;
      if (imgData[fontIndex] > 0) {
        particles.push(new Particle({ x, y, width, height, fill }));
      }
    }
  return particles;
};

export const useOffset = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fn = () => {
      if (canvasRef.current) {
        setOffset(canvasRef.current.getBoundingClientRect());
      }
    };
    fn();
    window.addEventListener("scroll", fn);
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, [canvasRef]);
  return offset;
};

const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  drawFn: (ctx: CanvasRenderingContext2D) => void,
  canvasInfo: CanvasInfoType
) => {
  let timer: number;

  const render = (
    ctx: CanvasRenderingContext2D,
    points: Particle[],
    offset: { top: number; left: number },
    canvasInfo: CanvasInfoType
  ) => {
    ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);
    points.forEach((point) => {
      point.update(offset);
      point.draw(ctx);
    });

    timer = window.requestAnimationFrame(() =>
      render(ctx, points, offset, canvasInfo)
    );
  };

  const offset = useOffset(canvasRef);

  useEffect(() => {
    const points = createViceCanvas(drawFn, canvasInfo);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;

      render(ctx, points, offset, canvasInfo);
    }
    return () => {
      window.cancelAnimationFrame(timer);
    };
  }, [canvasRef, offset, canvasInfo /* , drawFn */]);
};

export default useCanvas;
