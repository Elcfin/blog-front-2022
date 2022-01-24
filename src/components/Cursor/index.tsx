import { useContext } from "react";

import "./index.scss";
import useMouseMove from "./hooks/useMouseMove";
import { MouseContext } from "../../hooks/useMouseOver";
import useMouseClick from "./hooks/useMouseClick";

type CursorProps = {};

const Cursor = (props: CursorProps) => {
  const position = useMouseMove();
  const { isOver } = useContext(MouseContext);
  const { isClick, position: clickPosition } = useMouseClick();

  return (
    <div
      className={[
        isOver ? "cursor-active" : "",
        isClick ? "cursor-click" : "",
      ].join(" ")}
    >
      <div
        className="cursor-outer"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div>
      <div
        className="cursor-effect"
        style={{ left: clickPosition.x, top: clickPosition.y }}
      ></div>
      {/*       <div
        className={"cursor-inner"}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div> */}
    </div>
  );
};

export default Cursor;
