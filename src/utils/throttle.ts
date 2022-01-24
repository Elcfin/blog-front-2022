const throttle = (fn: Function, delay: number) => {
  let pre = Date.now();
  return (e: Event) => {
    const now = Date.now();
    if (now - pre >= delay) {
      fn(e);
      pre = Date.now();
    }
  };
};

export default throttle;
