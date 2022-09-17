import { Route } from "react-router-dom";
import { Routes } from "react-router";

import Cursor from "./components/Cursor";
import Cover from "./pages/Cover";
import Main from "./pages/Main";
import useMouseOver, { MouseContext } from "./hooks/useMouseOver";

type ThemeType = "base";
const theme: ThemeType = "base";

function App() {
  const { isOver, setOver, setLeave } = useMouseOver();
  const path = window.location.pathname;
  return (
    <div className={`${theme}`}>
      <MouseContext.Provider value={{ isOver, setOver, setLeave }}>
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/main" element={<Main />} />
        </Routes>
        <Cursor
          color={path === "/" ? "--bg" : "--on-bg"}
          bgColor={path === "/" ? "--on-bg" : "--bg"}
        />
      </MouseContext.Provider>
    </div>
  );
}

export default App;
