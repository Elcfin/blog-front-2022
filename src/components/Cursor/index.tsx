import { useContext } from "react";

import "./index.scss";
import useMouseMove from "./hooks/useMouseMove";
import { MouseContext } from "../../hooks/useMouseOver";
import useMouseClick from "./hooks/useMouseClick";

type CursorProps = { color: string; bgColor: string };

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
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          borderColor: `var(${props.color})`,
          backgroundColor: isOver ? `var(${props.bgColor}-l)` : "",
        }}
      ></div>
      <div
        className="cursor-effect"
        style={{
          left: clickPosition.x,
          top: clickPosition.y,
          borderColor: `var(${props.color})`,
        }}
      ></div>
      {/*       <div
        className={"cursor-inner"}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div> */}
    </div>
  );
};

export default Cursor;
