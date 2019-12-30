# -*- coding: utf-8 -*-
# @Time: 2019/12/17 10:54
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import re

import requests
import execjs

userName = 'user'
password = 'password'


with open('./openlaw_login.js','r',encoding='utf-8') as f:
    login_js = execjs.compile(f.read())
session = requests.session()

keyEncrypt_password = login_js.call('keyEncrypt',password)
login_url = 'http://openlaw（RSA）.cn/login'

raw_headers = '''Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: keep-alive
Content-Length: 526
Content-Type: application/x-www-form-urlencoded
Host: openlaw（RSA）.cn
Origin: http://openlaw（RSA）.cn
Referer: http://openlaw（RSA）.cn/login.jsp?logout
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36'''
headers = dict([line.split(": ",1) for line in raw_headers.split("\n")])

res = session.get('http://openlaw（RSA）.cn/login.jsp?logout')
csrf = re.compile(r'csrf" value="(.*?)"')

formdata = {
    '_csrf': csrf.search(res.text).group(1),
    'username': userName,
    'password': keyEncrypt_password,
    '_spring_security_remember_me': 'true',
}

_csrf_resp = session.post(login_url,headers=headers,data=formdata,timeout=10,allow_redirects=False)

login_result = session.get('http://openlaw（RSA）.cn/user/profile.jsp')
if userName in login_result.text:
    print('登陆成功!')