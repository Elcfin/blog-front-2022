import { useState, createContext } from "react";

type MouseContextType = {
  isOver: boolean;
  setOver: () => void;
  setLeave: () => void;
};

export const MouseContext = createContext<MouseContextType>({
  isOver: false,
  setOver: () => {},
  setLeave: () => {},
});

const useMouseOver = () => {
  const [isOver, setIsOver] = useState(false);
  return {
    isOver,
    setOver: () => {
      isOver || setIsOver(true);
    },
    setLeave: () => {
      !isOver || setIsOver(false);
    },
  };
};

export default useMouseOver;
