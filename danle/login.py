# -*- coding: utf-8 -*-
# @Time: 2019/12/16 11:27
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import requests
import execjs

with open('.danle_login.js','r') as f:
    login_js = execjs.compile(f.read())
url = 'https://oauth.d.cn/auth/login'

userPhone = '13111111111'
password = 'a123123'
pwd = login_js.call('getPwd',password)

params = {
    'display': 'web',
    'name': userPhone,
    'pwd': pwd,
    'to': 'https%3A%2F%2Fwww.d.cn%2F',
    'geetest_challenge': 'e5e95f352f343c0c18a2fdbb9ebbed43',
    'geetest_validate': '6689f63da223ab2004802108716fd0ed',
    'geetest_seccode': '6689f63da223ab2004802108716fd0ed|jordan',
}

resp = requests.get(url,params=params)
print(resp.json())
print(resp.status_code)