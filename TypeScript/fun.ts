function sum(x:number,y:number):number{
    return x+y;
}

let mySum:(x:number,y:number) =>number=function(x:number,y:number): number{
    return x+y;
}

/*接口定义函数*/
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}

/*可选参数*/
/*需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：*/
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

/*在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数*/
function buildName2(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat2 = buildName2('Tom', 'Cat');
let tom2 = buildName2('Tom');


/*ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：*/
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);