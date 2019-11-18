# **查看git基础配置信息**
- 查看用户名和邮箱地址  
   ` git config user.name`  
   `git config user.email`

- 修改用户名和邮箱地址  
　
`git config --global user.name"username"`  
`git config --global user.email "email"`

# 常用文件夹对应的操作命令
git init   
git remote -v 查看服务地址  
pwd  显示当前目录
mkdir file 创建目录  
git log 查看提交历史  
git log -author 查找指定用户的提交日志  
cat test.txt 查看文件  
rm test.txt 删除文件  

# 分支管理  
git branch name 创建分支  
git checkout name 切换分支  
git branch -d name 删除分支  
git branch -r -d origin/test 删除远程分支  
git branch 查看分支
git branch -a 查看全部分支  
git branch -l 查看本地分支  
git branch -vv 查看本地分支对应的远程分支

# 将git项目clone到本地  
git clone -b dev_test 获取指定分支到本地  

# 将本地变更代码提交到git仓库  
git status 查看有变更的文件  
git add . & git add -A 添加所有更改过的文件  
git commit  -m "descript" 提交文件添加注释  
git push 提交到远程仓库  
git push origin 将当前分支推送到origin主机的对应分支  
git reset 回退版本  
git reset HEAD^ || HEAD^^ 上个版本 上上个版本  
# 更新最新代码及冲突解决  
git stash 保存本地修改  
git stash list 查看保存信息  
git stash pop stash@{0} 还原暂存内容  
git pull 从远程拉取最新版本 到本地 自动合并  
git fetch 从远程获取最新版本 到本地 不会自动合并  
git diff 合并后产生冲突,可输入指令查看冲突  
# 强制更新  
git fetch -all  
git reset --hard origin/master git fetch 只是下载远程的库的内容，不做任何的合并git reset 把HEAD指向刚刚下载的最新的版本

# 开发分支（dev）上的代码达到上线的标准后，要合并到 master 分支  
git checkout dev  
git pull  
git checkout master  
get merge dev  
git push -u origin master  
# 当master代码改动了，需要更新开发分支（dev）上的代码  
git checkout master  
git pull  
git checkout dev  
git merge master  
git push -u origin dev