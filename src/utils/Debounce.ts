export const debounce = (fn: Function, timeout: number) => {
  let timer : ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
};

//Debouncing prevents extra activations or slow functions from triggering too often