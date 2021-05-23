// 防抖函数
// func 要执行的函数  delay 防抖控制时间
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // 定时器必须要更改this指向，可以用apply、bind、或者上面用变量转换等方式来进行更改this指向
      func.apply(this,args);
    }, delay);
  };
}