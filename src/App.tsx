import { Route } from "react-router-dom";
import { Routes } from "react-router";

import Main from "./pages/Main";
import Cursor from "./components/Cursor";
import useMouseOver, { MouseContext } from "./hooks/useMouseOver";

type ThemeType = "base";
const theme: ThemeType = "base";

function App() {
  const { isOver, setOver, setLeave } = useMouseOver();

  return (
    <div className={`main-x ${theme}`}>
      <MouseContext.Provider value={{ isOver, setOver, setLeave }}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Cursor />
      </MouseContext.Provider>
    </div>
  );
}

export default App;
