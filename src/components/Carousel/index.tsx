import "./index.scss";
import { useRef, useContext } from "react";
import useCanvasImg, { HEIGHT, WIDTH } from "./hooks/useCanvasImg";
import useCarousel, { imgList } from "./hooks/useCarousel";
import { MouseContext } from "../../hooks/useMouseOver";

const Carousel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { curImg, setCurImg } = useCarousel();
  const { setOver, setLeave } = useContext(MouseContext);
  useCanvasImg(canvasRef, curImg, imgList);
  return (
    <div className="carousel-x">
      <div className="carousel">
        {Array(50 * 50)
          .fill(0)
          .map((item, index) => (
            <div className="carousel-item" key={index}></div>
          ))}
        <canvas
          id="canvas-img"
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
        ></canvas>
      </div>
      <div className="carousel-index-x">
        {imgList.map((img, index) => {
          const className = ["carousel-index"];
          if (curImg === index) className.push("carousel-index-active");
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

export default Carousel;
