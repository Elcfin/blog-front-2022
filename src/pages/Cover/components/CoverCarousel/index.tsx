import "./index.scss";
import { useRef, useContext } from "react";
import useCanvasImg, { HEIGHT, WIDTH } from "./hooks/useCanvasImg";
import useCarousel, { imgList } from "./hooks/useCarousel";
import { MouseContext } from "../../../../hooks/useMouseOver";

const CoverCarousel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { curImg, setCurImg } = useCarousel();
  const { setOver, setLeave } = useContext(MouseContext);
  useCanvasImg(canvasRef, curImg, imgList);
  return (
    <div className="cover-carousel-x">
      <div className="cover-carousel">
        {Array(50 * 50)
          .fill(0)
          .map((item, index) => (
            <div className="cover-carousel-item" key={index}></div>
          ))}
        <canvas
          id="canvas-img"
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
        ></canvas>
      </div>
      <div className="cover-carousel-index-x">
        {imgList.map((img, index) => {
          const className = ["cover-carousel-index"];
          if (curImg === index) className.push("cover-carousel-index-active");
          return (
            <div
              key={index}
              onMouseOver={() => {
                setCurImg(index);
                setOver();
              }}
              onMouseLeave={() => {
                setLeave();
              }}
            >
              <div className={className.join(" ")}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoverCarousel;
