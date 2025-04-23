type F = (...args: number[]) => void;

function debounce(fn: F, delay: number): F {
  let timer: any;
  return function (...args: number[]): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
