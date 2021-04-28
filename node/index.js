const fs = require("fs");
let arr = [];
let obj = {};
fs.readdir("./files", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
    files.forEach((ele) => {
      arr.push(ele.substring(ele.lastIndexOf("."), ele.length));
    });
  }
  arr = unique(arr);
  arr.forEach((val) => {
    obj[val] = [];
  });
  for (let i = 0; i <= arr.length; i++) {
    files.forEach((ele) => {
      if (ele.substring(ele.lastIndexOf("."), ele.length) === arr[i]) {
        obj[arr[i]].push(ele);
      }
    });
  }

  console.log(uniobj(obj));
});

function unique(arr) {
  return Array.from(new Set(arr));
}

function uniobj(obj) {
  if (obj) {
    for (let key in obj) {
      obj[key].sort();
    }
  }
  return obj;
}
