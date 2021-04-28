let str = "bbbbaaac";
function unip(str) {
  let obj = {};
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (obj[str[i]]) {
        obj[str[i]]++;
      } else {
        obj[str[i]] = 1;
      }
    }
      console.log(obj);
      let arr = Object.keys(obj)
      console.log(arr);
  }
}
unip(str)