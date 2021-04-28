let arr = ['1', '2', '3']
let add = []
let app = arr.map((val) => {
    return val = Number(val) +1
})
arr.forEach((ele) => {
    add.push(Number(ele) + 1)
})
console.log(app);
console.log(add);
console.log(arr);