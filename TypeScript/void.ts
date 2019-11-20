/*JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：*/
function alertName(): void{
    alert("john");
}
alertName();

/*undefined 类型的变量，可以赋值给 number 类型的变量：*/
// 这样不会报错
let num: number = undefined;
