# SSH基础知识

## 常用命令

```bash
# 测试连接，如 ssh -v git@github.com
ssh -v example@example.com
# 进入默认的.ssh/目录，此处存储着已添加的SSH Key
cd ~/.ssh/
# 输出生成的公钥，添加到对应的网站SSH Key设置里后可进行测试连接
cat ~/.ssh/id_rsa.pub
# 创建密钥，默认文件路径：~/.ssh/id_rsa
ssh-keygen -t rsa -C "邮箱账号"
```

## 多个邮箱账号多仓库配置

```bash
cd ~/.ssh
vim config

# 输入下述配置

#company
Host code.company.com
HostName code.company.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

#gitlab
Host gitlab.com
HostName gitlab.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/grace_id_rsa
```
