const getElementOffest = (ele: any) => {
  var box = ele.getBoundingClientRect();
  var body = document.body,
    docElem = document.documentElement;
  //获取页面的scrollTop,scrollLeft(兼容性写法)
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
    scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  var clientTop = docElem.clientTop || body.clientTop,
    clientLeft = docElem.clientLeft || body.clientLeft;
  var top = box.top + scrollTop - clientTop,
    left = box.left + scrollLeft - clientLeft;
  return {
    //Math.round 兼容火狐浏览器bug
    top: Math.round(top),
    left: Math.round(left),
  };
};

export default getElementOffest;
