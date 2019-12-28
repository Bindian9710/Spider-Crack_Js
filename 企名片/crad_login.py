# -*- coding: utf-8 -*-
import requests
import execjs

with open('crad.js','r') as f:
    execjs_1 = execjs.compile(f.read())


post_url = 'https://vipapi.qimingpian.com/DataList/productListVip'

form_data = {
    'page': '1',
    'num': '20',
}

resp = requests.post(post_url,data=form_data)
encrypt_data = resp.json()['encrypt_data']
result = execjs_1.call('crad_dectypt',encrypt_data)
print(result)