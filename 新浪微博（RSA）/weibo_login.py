# -*- coding: utf-8 -*-
# @Time: 2020/1/4 11:23
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import json
import re

import requests
import execjs

class WeiboLogin:

    def __init__(self,username,password):
        self.session = requests.session()
        self.username = username
        self.password = password
        self.prelogin_url = 'https://login.sina.com.cn/sso/prelogin.php'
        self.login_url = 'https://login.sina.com.cn/sso/login.php'
        with open('weibo_login.js','r',encoding='utf-8') as f:
            self.login_js = execjs.compile(f.read())

    def getPreloginInfo(self):
        self.su = self.login_js.call('getSu',self.username)
        params = {
            'entry': 'weibo',
            'callback': 'sinaSSOController.preloginCallBack',
            'su': self.su,
            'rsakt': 'mod',
            'checkpin': '1',
            'client': 'ssologin.js(v1.4.19)',
            '_': '1578127327125',
        }
        prelogin_resp = self.session.get(self.prelogin_url,params=params)
        result = re.search(r'sinaSSOController.preloginCallBack\((.*?)\)',prelogin_resp.text).group(1)
        self.result_json = json.loads(result)
        # print(result_json)

    def login(self):
        self.getPreloginInfo()
        data = {
            'entry': 'weibo',
            'gateway': '1',
            'from':'',
            'savestate': '7',
            'qrcode_flag': 'false',
            'useticket': '1',
            'pagerefer': '',
            'vsnf': '1',
            'su': self.su,
            'service': 'miniblog',
            'servertime': self.result_json['servertime'],
            'nonce': self.result_json['nonce'],
            'pwencode': 'rsa2',
            'rsakv': self.result_json['rsakv'],
            'sp': self.login_js.call('getSp',self.result_json,self.password),
            'sr': '1920*1080',
            'encoding': 'UTF-8',
            'prelt': self.login_js.call('getPrelt'),
            'url': 'https://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack',
            'returntype': 'META',
        }
        resp = self.session.post(self.login_url,data=data)
        resp.encoding = resp.apparent_encoding

        location = re.search(r'replace\("(.*?)"\);',resp.text).group(1)
        resp = self.session.get(location)

        location = re.search(r'replace\(\'(.*?)\'\);', resp.text).group(1)
        resp = self.session.get(location)
        resp = self.session.get('https://weibo.com/')
        print(resp.text)
        print(resp)

if __name__ == '__main__':
    w = WeiboLogin(username='123',password='123')
    w.login()