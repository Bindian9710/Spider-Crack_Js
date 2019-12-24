# -*- coding: utf-8 -*-
# @Time: 2019/12/24 9:36
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import json
import re

import requests
import execjs

class ChinahrLogin:

    def __init__(self):
        self.username = 'username'
        self.password = 'password'
        self.index_url = 'https://passport.58.com/'
        self.login_url = 'https://passport.58.com/login/pc/dologin?'
        self.token_path = '/login/init?callback=jQuery111305697932980020528_1577152074902&_=1577152074906'
        self.data_path = '/frontend/data?callback=jQuery111305697932980020528_1577152074902&_=1577152074905'
        self.headers = {
                    'authority': 'passport.58.com',
                    'method': 'GET',
                    'scheme': 'https',
                    'accept': '*/*',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'referer': 'https://www.chinahr.com/home/bj/',
                    'sec-fetch-mode': 'no-cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
                    }

    def extract_result(self,html):
        information = re.search('data":(\{.*}),"msg',html).group(1)
        return json.loads(information)

    def getPwd(self):
        self.headers.update({'path': self.data_path})
        resp_data = requests.get(self.index_url + self.data_path, headers=self.headers)
        data = self.extract_result(resp_data.text)
        rsaModulus = data['rsaModulus']
        rsaExponent = data['rsaExponent']
        with open('./chinahr_login.js','r') as f:
            enc_pwd = execjs.compile(f.read()).call('getPwd',self.password,rsaModulus,rsaExponent)
        return enc_pwd

    def getToken(self):
        self.headers.update({'path':self.token_path})
        resp_token = requests.get(self.index_url+self.token_path,headers=self.headers)
        token = self.extract_result(resp_token.text)
        token = token['token']
        return token

    def run(self):
        enc_pwd = self.getPwd()
        token = self.getToken()
        login_formdata = {
            'password': enc_pwd,
            'isremember': '',
            'callback': 'window.CL.AsyncModules.successFun',
            'fingerprint': 'D44E43B69446C35066274E7EBDB46106BCA8636910C6DF11_010',
            'finger2': 'zh-CN|24|1|4|1920_1080|1920_1040|-480|1|1|1|undefined|1|unknown|Win32|unknown|3|true|false|false|false|false|0_false_false|d41d8cd98f00b204e9800998ecf8427e|f7bc91acfdafdfa98b7636d86db4a2f4',
            'token': token,
            'source': 'chinahrzp-pc',
            'path': 'https://www.chinahr.com/',
            'username': self.username,
            'passwordInputEmpty': '',
            'passwordInput': '',
            'validcode': '',
            'vcodekey': '',
            'btnSubmit': '登录中...',
        }
        login_headers = {
            'authority': 'passport.58.com',
            'method': 'POST',
            'path': '/login/pc/dologin?',
            'scheme': 'https',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'cache-control': 'max-age=0',
            'content-length': '843',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'id58=c5/nn14AhigxeOoisYiwAg==; ppStore_fingerprint=05E460B6111B487630F9712EF9C2CD8E1C69045443D3F578; finger_session=Dma1hHi8fsAznvuWGOXgZISdYYO3pF5M; PPU="UID=34226077324298&UN=%E6%9F%B4er061&TT=207a27e7b141b06f05e4d6bcca89fdc2&PBODY=AhnVDB9shOqYp853wLdecGLfWBnVKvcro7b-OkKZbNsVvXztlS6zgW2VEkH5-PVmC_y9LptBmQ_fdloJ3NZ_wZXgx4vwOG4gb5UCUS_deJ7prv2WW25_PUzIy475NtkRFHZpG4sp-LuYdqbkaH64ZO0rDAR2MDrCaX3DMPnYkUg&VER=1"; www58com="UserID=34226077324298&UserName=%E6%9F%B4er061"; 58cooper="userid=34226077324298&username=%E6%9F%B4er061"; 58uname=%E6%9F%B4er061; cloudpassport="TT=207a27e7b141b06f05e4d6bcca89fdc2&TS=1577155273369&PBODY=fzAhLxkAEs4D5z1lpxeaj6UhC1XyMO0hCbfLoSD67j0kqGCML3je4FGfRIsB1L-4Csn14KDAOLxuqDUcrSPubPKu2l9uX7NsgGozihCaSoGKxdPX9ckGQpqn9Fmy1jMoTfBPjHR-tSKgp6Gn6rnsnE-tSkw6aatSZou-jqVhb2Q&VER=1"; 58tj_uuid=b723c447-26d0-4d3f-9e4b-c0d3307d7c35; new_uv=1; utm_source=; spm=; init_refer=; als=0; new_session=0',
            'origin': 'https://www.chinahr.com',
            'referer': 'https://www.chinahr.com/home/bj/',
            'sec-fetch-mode': 'nested-navigate',
            'sec-fetch-site': 'cross-site',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        }
        resp_login = requests.post(self.login_url,headers=login_headers,data=login_formdata)
        if '"msg":"成功"' in resp_login.text:
            print('登陆成功')

if __name__ == '__main__':
    ChinahrLogin().run()