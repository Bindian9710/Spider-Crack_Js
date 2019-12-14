let CryptoJS = require("crypto-JS");

function f(e, t, n) {
    var a = "/api/front/psons/search";
    // var n = {codetype: 3, lang: "cn"};
    // var s = e + a;
    var o = ['lang','page','size']
    var s = e + a;
    for (var r = 0; r < o.length; r++) {
        var l = o[r];
        s += l + n[l]
    }
    return s += t + " " + e,
        CryptoJS.MD5(s).toString()
}

function b(e) {
    return CryptoJS.enc.Base64.parse(e).toString(CryptoJS.enc.Hex)
}

function get_sign_appKey_data(parameters) {
    var e = b(["Hx", "EZK", "9nRSg", "myn8", "WdV", "W4k4", "w=="].join(""));
    var appKey = b(["==wVi", "Lp", "t7E", "a1C", "6AT", "q", "VHE", "GN", "GU"].join("").split("").reverse().join(""));
    // var t = Date.parse(new Date);
    var t = '1572860509000';
    var sign = f(e,t,parameters);
    return [sign,appKey,t]

}
console.log(get_sign_appKey_data({'size': '12',
    'page': '0',
    'lang': 'cn'}))
// console.log(CryptoJS.MD5("1f11192bd9d14a09b29fc59d556e24e3/api/front/psons/searchlangcnpage0size121572859801000 1f11192bd9d14a09b29fc59d556e24e3").toString())