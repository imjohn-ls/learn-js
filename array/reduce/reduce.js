//arr.reduce(callback,[initialValue])
// callback （执行数组中每个值的函数，包含四个参数）
//
//     1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
//     2、currentValue （数组中当前被处理的元素）
//     3、index （当前元素在数组中的索引）
//     4、array （调用 reduce 的数组）
//
// initialValue （作为第一次调用 callback 的第一个参数。）

var arr = [1, 2, 3, 4];
var sum = arr.reduce(function (prev, cur, index, arr) {
  console.log(prev, cur, index);
  return prev + cur;
}, 0);
console.log(arr, sum);

var sum2 = arr.reduce((x,y)=>x+y)
var mul = arr.reduce((x,y)=>x*y)
console.log( sum2 ); //求和，10
console.log( mul ); //求乘积，24

/*计算数组中每个元素出现的次数*/
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let nameNum = names.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1
  }
  return pre
},{})
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}

/*将二维数组转化为一维*/
let arr2 = [[0, 1], [2, 3], [4, 5]]
let newArr = arr2.reduce((pre,cur)=>{
  return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]

/*将多维数组转化为一维*/

let arr3 = [[0, 1], [2, 3], [4,[5,6,7]]]
const newArr = function(arr3){
  return arr3.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}
console.log(newArr(arr3)); //[0, 1, 2, 3, 4, 5, 6, 7]


/*对象里的属性求和*/
var result = [
  {
    subject: 'math',
    score: 10
  },
  {
    subject: 'chinese',
    score: 20
  },
  {
    subject: 'english',
    score: 30
  }
];

var sum3 = result.reduce(function(prev, cur) {
  return cur.score + prev;
}, 0);
console.log(sum3) //60