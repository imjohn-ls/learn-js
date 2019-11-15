
define(['module'],()=>{
  "use strict";
  const name='john';
  const say=function(){
      console.log(`hello ${name}`);
  }
  return {name,say}
});



require(['module'],module=>{
  module.say();
})