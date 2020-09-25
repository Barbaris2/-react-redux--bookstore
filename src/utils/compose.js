const compose = (...funcs) => comp => {
  return funcs.reduceRight((wrapped, f) => f(wrapped), comp);
};

export default compose;

/**
  compose принимает набор функций, возвращает новую функцию который принимает компонент ...

  compose(a,b,c)(value) === a(b(c(value)))
 */

/**
 reduceRight
 */

/*
const arr = ['a', 'b', 'c'];
const result = arr.reduceRight((prevResult, value) => {
  console.log(
    `prevResult=${prevResult} value=${value}, will return ${prevResult + value}`

    /**
   вызов 1. предыдущего результата еще нет поэтому функция в качестве prevResult возьмет последний элемент массива, а value будет следующий элемент массива 
   -> prevResult =c value=b will return cb
   вызов 2.
   -> prevResult =cb value=a will return cba

   если второй аргумент будет использоваться в качестве initialValue, т.е. 
   при первос вызове prevResult будет равен второму аргументу

   -> XXcba

  );
  return prevResult + value; // cba
}, 'xx');
*/
