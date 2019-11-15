/**
 *
 *功能：操作文件
 *时间：
 *作者：
 *
 * */
var fs=require('fs');
/*创建文件夹*/
/*fs.mkdir('./data/folderA',function(err){
    fs.mkdir('./data/folderA/folderB',function(err){
        fs.mkdir('./data/folderA/folderB/folderD',function(err){
            console.log('err');
        });
    })
})*/

/*删除文件*/
/*fs.unlink('./file/1.txt',function(err){
    console.log('yet');
})*/



/*更改文件名字*/
/*fs.rename('./data/folderA','./data/folderE',function(err){
    console.log('err');
})*/

/*监听文件变化*/
/*
fs.watchFile('./data/folderE/folderB/folderD/1.txt',{persistent:true,interval:1000},function(success){
        console.log('yes');
})*/

/*截断文件*/
/*
fs.truncate('./files/1.txt',function(err){
    console.log('yet');
})*/
var a =' 55';
console.log(a.isNumber);
console.log(isNaN(a));