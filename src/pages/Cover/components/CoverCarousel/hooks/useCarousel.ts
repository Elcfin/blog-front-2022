import { useState, useEffect } from "react";

export const imgList = [
  require("../../../../../assets/imgs/canvasImgChess-title.png"),
  require("../../../../../assets/imgs/canvasImgCat-title.png"),
];
const useCarousel = () => {
  const [curImg, setCurImg] = useState(0);
  const fn = () => {
    setCurImg(() => (curImg === imgList.length - 1 ? 0 : curImg + 1));
  };
  useEffect(() => {}, [curImg]);
  return { curImg, setCurImg };
};

export default useCarousel;
