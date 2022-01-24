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
  mousePosition.x = e.pageX;
  mousePosition.y = e.pageY;
});

class Particle {
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

type CanvasInfoType = { width: number; height: number; fill: string };

const createViceCanvas = (draw: Function, canvasInfo: CanvasInfoType) => {
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

  /*   let raf: number[] = [];
  const fn = () => {
    raf = raf.concat(render(ctx, points, offset, canvasInfo));
  };
  raf.push(window.requestAnimationFrame(fn));
  return raf; */
  /*   const raf = window.requestAnimationFrame(() => render(ctx, points));
  if (points[0].item >= 1) {
    window.cancelAnimationFrame(raf);
  } */
};

const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  drawFn: Function,
  canvasInfo: CanvasInfoType
) => {
  const [windowSize, setWindowSize] = useState({
    x: document.body.clientWidth,
    y: document.body.clientHeight,
  });

  useEffect(() => {
    const fn = () => {
      setWindowSize(() => {
        return { x: document.body.clientWidth, y: document.body.clientHeight };
      });
    };
    window.addEventListener("resize", fn);
    /* let raf: number[] = []; */

    let timer: number;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      const points = createViceCanvas(drawFn, canvasInfo);

      timer = window.setInterval(() => {
        render(
          ctx,
          points,
          {
            top: canvasRef.current!.offsetTop,
            left: canvasRef.current!.offsetLeft,
          },
          canvasInfo
        );
      }, 16.7);
      /*       raf = raf.concat(
        render(
          ctx,
          points,
          {
            top: canvasRef.current.offsetTop,
            left: canvasRef.current.offsetLeft,
          },
          canvasInfo
        )
      ); */
    }
    return () => {
      /*       raf.forEach((item) => {
        window.cancelAnimationFrame(item);
      }); */
      window.clearInterval(timer);
      window.removeEventListener("resize", fn);
    };
  }, [canvasRef, windowSize, drawFn, canvasInfo]);
};

export default useCanvas;