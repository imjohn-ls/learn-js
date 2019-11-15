/*几种数组去重的方式*/
let originalArray = [1, 2, 3, 4, 5, 4, 3, 2, 1];

/*方案1*/
const result1 = Array.from(new Set(originalArray));
console.log('result1:' + result1);

/*方案2*/
const result2 = [];
const map = new Map();
for (let v of originalArray) {
  if (!map.has(v)) {
    map.set(v, true);
    result2.push(v)
  }
}
console.log('result2:' + result2);

/*方案3*/
const result3 = [];
for (let v of originalArray) {
  if (!result3.includes(v)) {
    result3.push(v);
  }
}
console.log('result3:' + result3);

/*方案4*/
/*let lg = originalArray.length;
for (let i = 0; i < lg; i++) {
  for (let j = i + 1; j < lg; j++) {
    if (originalArray[i] === originalArray[j]) {
      originalArray.splice(j, 1);
      j--;
    }
  }
}*/

/*一维数组去重排序*/
/*var arr =[1,2,2,3,8,3];
var arr2 =[[1,2,2],[1,3,3],[2,2,5],[1,2,2]];

function st(arg1){
    return Array.from(new Set(arg1)).sort();
}
console.log(st(arr));*/


/*对象去重*/
const resposeList = [
  {id: 1, a: 1},
  {id: 2, a: 2},
  {id: 3, a: 3},
  {id: 1, a: 1},
];
const result4 = resposeList.reduce((acc, cur) => {
  debugger
  const ids = acc.map(item => item.id);
  return ids.includes(cur.id) ? acc : [...acc, cur];
}, []);
console.log('result4:' + result4);


/*集合的作用*/
var obj =[
  {
    'id':1,
    'name':'john1'
  },
  {
    'id':2,
    'name':'john2'
  },
  {
    'id':2,
    'name':'john2'
  },
  {
    'id':3,
    'name':'john3'
  },
  {
    'id':4,
    'name':'john4'
  },
  {
    'id':4,
    'name':'john4'
  },
  {
    'name':'john5'
  },

];
var set = new Set();
obj.map(function(item){
  if(!set.has(item.id)){
    set.add(item.id);
  }
  
});
console.log('obj:'+obj);


