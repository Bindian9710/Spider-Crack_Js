# -*- coding: utf-8 -*-
# @Time: 2019/12/18 15:46
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import requests
import execjs
import time
with open('./steam_pwd.js','r') as f:
    login_js = execjs.compile(f.read())


username = 'username'
password = 'password'

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'}

getrsakey_url = 'https://store.steampowered.com/login/getrsakey/'
getrsakey_formdata = {'donotcache': int(time.time()*1000),'username': username}

rsakey_resp = requests.post(getrsakey_url,headers=headers,data=getrsakey_formdata)
rsakey_json = rsakey_resp.json()

encPassword = login_js.call('getPwd',password,rsakey_json)

login_url = 'https://store.steampowered.com/login/dologin/'
login_formdata = {
    'donotcache': int(time.time()*1000),
    'password': encPassword,
    'username': username,
    'twofactorcode': '',
    'emailauth': '',
    'loginfriendlyname': '',
    'captchagid': '-1',
    'captcha_text': '',
    'emailsteamid': '',
    'rsatimestamp': rsakey_json['timestamp'],
    'remember_login': 'false',
}
login_resp = requests.post(login_url,headers=headers,data=login_formdata)

print(login_resp.text)
print(login_resp)