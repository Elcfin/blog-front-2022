import { useState, useEffect } from "react";
import {
  Particle,
  CanvasInfoType,
  createViceCanvas,
  useOffset,
} from "../../../../../hooks/useCanvas";

export const HEIGHT = 420;
export const WIDTH = 960;
const FILL_COLOR = "#14161a";

const canvasInfo = { width: WIDTH, height: HEIGHT, fill: FILL_COLOR };

const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
  ctx.drawImage(img, 0, 0);
};

const useCanvasImg = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  curImgIndex: number,
  imgList: any[]
) => {
  const [imgState, setImgState] = useState<{
    state: "loading" | "loaded";
    img: HTMLImageElement;
  }>({
    state: "loading",
    img: new Image(),
  });

  const img = new Image();

  useEffect(() => {
    img.src = imgList[curImgIndex];
    setImgState(() => {
      return { state: "loading", img };
    });
    img.onload = () => {
      setImgState(() => {
        return { state: "loaded", img };
      });
    };
  }, [curImgIndex]);

  const [windowSize, setWindowSize] = useState({
    x: document.body.clientWidth,
    y: document.body.clientHeight,
  });

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
    const fn = () => {
      setWindowSize(() => {
        return { x: document.body.clientWidth, y: document.body.clientHeight };
      });
    };
    window.addEventListener("resize", fn);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      canvasRef.current.width = WIDTH;
      canvasRef.current.height = HEIGHT;

      if (imgState.state === "loaded") {
        const points = createViceCanvas(
          (ctx: CanvasRenderingContext2D) => drawImage(ctx, imgState.img),
          canvasInfo
        );

        render(ctx, points, offset, canvasInfo);
      }
      return () => {
        window.cancelAnimationFrame(timer);
        window.removeEventListener("resize", fn);
      };
    }
  }, [imgState.state, canvasRef, windowSize, offset]);
};

export default useCanvasImg;
