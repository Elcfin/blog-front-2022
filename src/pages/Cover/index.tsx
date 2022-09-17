import "./index.scss";

import { useNavigate } from "react-router-dom";

import CanvasCircle from "./components/CanvasCircle";
import CanvasMountain from "./components/CanvasMountain";
import CoverCarousel from "./components/CoverCarousel";
import Next from "./components/Next";

const Cover = () => {
  const navigate = useNavigate();

  return (
    <div className="cover">
      <CanvasCircle />
      <div className="cover-content">
        <CoverCarousel />
        <Next
          btnClickHandler={() => {
            navigate("/main");
          }}
        />
      </div>
      <CanvasMountain />
    </div>
  );
};

export default Cover;
