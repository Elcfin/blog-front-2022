import "./index.scss";

import CanvasCircle from "../../components/CanvasCircle";
import CanvasMountain from "../../components/CanvasMountain";
import Carousel from "../../components/Carousel";
import Next from "../../components/Next";

type MainProps = {};

const Main = (props: MainProps) => {
  return (
    <div>
      <div className="main">
        <CanvasCircle />
        <div className="main-content">
          <Carousel />
          <Next />
        </div>
      </div>
      <CanvasMountain />
    </div>
  );
};

export default Main;
