# -*- coding: utf-8 -*-
# @Time: 2020/1/15 17:50
# @Version: 1.0
# @Email: nnlcccc@outlook.com
# 代码千万条，整洁第一条，代码不规范，调试两行泪
import time

import requests
import execjs


class Toutiao:

    def __init__(self):
        self.url = 'https://www.toutiao.com/api/pc/feed/'
        self.exec_js()
        self.session = requests.session()

    def exec_js(self):
        with open('./头条.js','r',encoding='utf-8') as f:
            self.toutiao_js = execjs.compile(f.read())

    def get_cookie(self):
        resp_cookies = self.session.get('https://www.toutiao.com/')
        return resp_cookies.cookies["tt_webid"]

    def runspider(self):
        tt_webid = self.get_cookie()
        AS,CP = self.toutiao_js.call('get_AS_CP')
        _signature = self.toutiao_js.call('get_sign',AS,CP)
        min_behot_time = int(time.time())
        params = {
            'min_behot_time': min_behot_time,
            'category': '__all__',
            'utm_source': 'toutiao',
            'widen': '1',
            'tadrequire': 'true',
            'as': AS,
            'cp': CP,
            '_signature': _signature,
        }
        headers = {
            'authority': 'www.toutiao.com',
            'method': 'GET',
            'path': f'/api/pc/feed/?min_behot_time={min_behot_time}&category=__all__&utm_source=toutiao&widen=1&tadrequire=true&as={AS}&cp={CP}&_signature={_signature}',
            'scheme': 'https',
            'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': f'tt_webid={tt_webid};',
            'referer': 'https://www.toutiao.com/',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
        }
        resp = self.session.get(self.url,params=params,headers=headers)

        print(resp.json())
        print(resp)

if __name__ == '__main__':
    Toutiao().runspider()