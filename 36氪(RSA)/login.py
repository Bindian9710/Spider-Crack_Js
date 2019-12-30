# -*- coding: utf-8 -*-
# @Time: 2019/12/30 16:53
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import json

import requests
import execjs

session = requests.session()

with open('login.js','r',encoding='utf-8') as f:
    login_js = execjs.compile(f.read())

username = 'username'
password = 'password'

username_enc = login_js.call('enc',username)
password_enc = login_js.call('enc',password)

url = 'https://gateway.36kr.com/api/mus/login/byAccount'

headers = {
    'authority': 'gateway.36kr.com',
    'method': 'POST',
    'path': '/api/mus/login/byAccount',
    'scheme': 'https',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'content-type': 'application/json',
    'cookie': 'Hm_lvt_1684191ccae0314c6254306a8333d090=1577691309; Hm_lvt_713123c60a0e86982326bae1a51083e1=1577691309; sajssdk_2015_cross_new_user=1; krnewsfrontss=500e3e5dd57f6b18e920150f7b6b8ff7; M-XSRF-TOKEN=0b7caa50d7266dbf1139b8d59115ab98234e088d05ea8615e92d49532af08dbf; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216f55bae399803-0eb5716e9e0121-2393f61-2073600-16f55bae39a9e2%22%2C%22%24device_id%22%3A%2216f55bae399803-0eb5716e9e0121-2393f61-2073600-16f55bae39a9e2%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22https%3A%2F%2F36kr.com%2F%22%2C%22%24latest_referrer_host%22%3A%2236kr.com%22%2C%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%7D%7D; acw_tc=2760829915776913284846222e79970fa6d9dee7b520362283001fe405af88; Hm_lpvt_713123c60a0e86982326bae1a51083e1=1577691347; Hm_lpvt_1684191ccae0314c6254306a8333d090=1577691347',
    'origin': 'https://36kr.com',
    'referer': 'https://36kr.com/',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
}
fromdata = {"partner_id":"web",
            "param":{
                "account":username_enc,
                "password":password_enc,
                }
            }

resp = requests.post(url,headers=headers,data=json.dumps(fromdata))
print(resp.text)
print(resp)