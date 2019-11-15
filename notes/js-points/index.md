#this,call,bind,apply
_ _ _
 _this是一个指向函数执行环境的指针，this永远指向最后调用它的对象，执行时才能获取值，定义时无法确认它的值。_  
  _call,apply,bind第一个参数都是this指向的对象，call和apply如果第一个参数指向null或undefined,this指向window对象--*-call和apply改变上下文中的this，并且是立即执行，bind方法可以让对应函数想什么时候调用就什么时候调用。_  
  _call和apply第二个参数格式不同，call逗号隔开，apply数组形式  bind参数和call一样，bind返回值是一个方法，传的参数会预先传给返回的方法，调用的时候不用再传参数。_

#js模块化，Commonjs，Amd异步模块定义，cmd，es6
_ _ _
 _开始js是没有模块化的说法，js代码就一个一个从上到下执行模块化的优点，方便开发维护，解耦，只需要依赖需要的模块，避免全局污染.Commonjs,AMD,CMD,es6 都是js模块化的规范，只不过es6 是js自己的规范_
  _Commonjs 是应用于服务端的javaScript，一个js文件就是一个模块，模块中的变量不对外暴露，不支持异步。nodejs 遵循commonjs规范，同步加载模块_
 _一个作为公共依赖的模块，同步一次加载出来更好，模块的个数往往是有限的，而且Nodejs在require的时候会走动缓存已加载过的模块，访问的是本地文件，产生的IO开销几乎可以忽略_  
   _基本用法_    
   _require 引用模块_  
   _exports 导出模块_  
   _module 模块标识_  
_Amd适用浏览器，第一个参数是要加载的模块数组，即使只加载一个模块，也要使用数组形式。第二个参数是加载成功之后的回调函数。依赖前置，requirejs遵循AMD规范_
_cmd适用浏览器端，一个模块就是一个文件，就近依赖，即用即返,同步模块_
_es6: es6中一个文件默认为一个模块，通过export向外暴露，import输入其他模块提供的功能_
#exports和module.exports
_在node执行一个文件时，会给这个文件内生成一个exports和module对象，而module又有一个exports属性_
_`exports = module.exports = {};`_
_exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。只通过 exports 参数来提供接口，有时无法满足开发者的所有需求。 比如当模块的接口是某个类的实例时，需要通过 module.exports_
#vue生命周期
_beforecreate，创建，初始化实例  
  create：ajax请求，data数据方法，watch/event事件回调  
  beforeMOUNT:执行render  
  mount：el挂载执行，节点获取和操作  
  beforeupdate:数据更新，不进行dom渲染，可进行状态处理  
  update：数据更新 dom重新渲染  
  beforedestory：实例销毁之前调用  
  destory：实例销毁  _
