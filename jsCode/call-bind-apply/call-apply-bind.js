/**
 *
 *功能：
 *时间：
 *作者：
 *
 * */
/* window.words ='555';*/
var animal={
	words:'222',
	speak:function(){
	    console.log(this.words);
	}
}


/*call用法*/
/*var Cat= {
	words:'888',
	
}
animal.speak.call(Cat,'kk');*/

/*this是一个指向函数执行环境的指针，this永远指向最后调用它的对象，执行时才能获取值，定义时无法确认它的值*/
/*this指向animal*/
//animal.speak();
/*this指向{words:'gggg}*/
//animal.speak.call({words:'gggg'});
/*this指向window*/
//var fn1 =animal.speak;
//fn1();

/*作为构造函数执行*/
function student(name,age){
    this.name=name;
    this.age=age
}
var s = new student('jj',22);
//console.log(s);
/*作为普通函数执行*/
//function fb(){
    //console.log(this);//window
//}
//fb();
/*作为对象属性执行*/
/*var obj ={
	name:'a',
	printname:function(){
	    console.log(this);//obj
	}
}
obj.printname();*/


/*call,apply,bind*/
/*var name='1',age=14;
var obj ={
	name:'john',
	age:this.age,
	fun:function(like,dislike){
	    console.log(this.name+'今年'+this.age+',喜欢吃'+like+',不喜欢吃'+dislike);
	}
}
var a ={name:'jay',age:23}
obj.fun.call(this,'苹果','香蕉');
obj.fun.apply(a,'苹果','香蕉');
obj.fun.bind(a,'苹果','香蕉')();*/

/*call,apply,bind第一个参数都是this指向的对象，call和apply如果第一个参数指向null或undefined,this指向window对象--*-call和apply改变上下文中的this，并且是立即执行，bind方法可以让对应函数想什么时候调用就什么时候调用*/

/*this是一个指向函数执行环境的指针，this永远指向最后调用它的对象，执行时才能获取值，定义时无法确认它的值
call,apply,bind第一个参数都是this指向的对象，call和apply如果第一个参数指向null或undefined,this指向window对象--*-call和apply改变上下文中的this，并且是立即执行，bind方法可以让对应函数想什么时候调用就什么时候调用
call和apply第二个参数格式不同，call逗号隔开，apply数组形式  bind参数和call一样，bind返回值是一个方法，传的参数会预先传给返回的方法，调用的时候不用再传参数*/



var s1=0;
var arr= [0.2,0.25,0.3,0.35,0.4,0.45];
/*求和*/
var ilen = arr.length;
for(var i=0;i<ilen;i++){
	s1+=arr[i];
}

console.log(s1);



