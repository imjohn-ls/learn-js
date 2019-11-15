const name='john';
const age=1;
const say=function(){
    console.log(name);
}

module.exports ={name,age,say};

console.log(module.exports);