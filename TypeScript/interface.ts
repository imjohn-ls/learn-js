interface Person {
  name:string;
  age:number
}
/*定义的变量比接口少了一些属性是不允许的：多一些属性也是不允许的：*/
let tom:Person={
  name:"john",
  age:23
}


/*可选属性--任意属性--只读属性*/
/*有时我们希望不要完全匹配一个形状，那么可以用可选属性*/
/*使用 [propName: string] 定义了任意属性取 string 类型的值*/
/*有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义,只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候*/
interface Animal {
  readonly id:number;
  name:string;
  age?:number;
  [propName:string]: any;
}