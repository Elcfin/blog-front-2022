export const drawCircle = (sildeLength: number, fill: string) => {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.arc(sildeLength / 2, sildeLength / 2, sildeLength / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };
};

export const drawMountain = (height: number, width: number, fill: string) => {
  return (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.strokeStyle = fill;
    ctx.moveTo(0, height);
    ctx.bezierCurveTo(
      0.65 * width,
      0.67 * height,
      0.68 * width,
      0.02 * height,
      width,
      0
    );
    /* ctx.lineTo(width, height); */
    ctx.stroke();
    ctx.closePath();
  };
};
