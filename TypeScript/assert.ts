/*类型断言的用法如上，在需要断言的变量前加上 <Type> 即可。*/
/*类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：*/
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}