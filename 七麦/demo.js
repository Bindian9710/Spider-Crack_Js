function w(n, a) {

    n = n['split']('');
    for (var t = n['length'], e = a['length'], r = "charCodeAt", i = 0; i < t; i++)
        n[i] = p(n[i][r](0) ^ a[(i + 10) % e][r](0));
    return n['join']('')
}

function p(a) {
    var t = 'fromCharCode';
    return String[t](a)
}

function C(n) {

    function n_fun(t) {
        var n;
        return n = e_from(t.toString(), "binary"),
            z_fromByteArray(n)
    }

    function e_from(t_str, e) {
        var i = t_str.length;
        t = new Uint8Array(i);
        var r = t_write(t, t_str, e, i);
        return t = t.slice(0, 44) , t
    }

    function t_write(t, e, n, i) {
        return X(G(e), t, 0, i)
    }

    function X(t, e, n, i) {
        for (var r = 0; r < i && !(r + n >= e.length || r >= t.length); ++r)
            e[r + n] = t[r];
        return r
    }

    function G(t) {
        for (var e = [], n = 0; n < t.length; ++n)
            e.push(255 & t.charCodeAt(n));
        return e
    }

    var u = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,+,/";
    u = u.split(',')

    function z_fromByteArray(t) {
        for (var e, n = t.length, i = n % 3, r = "", o = [], a = 16383, l = 0, c = n - i; l < c; l += a)
            o.push(s(t, l, l + a > c ? c : l + a));
        return 1 === i ? (e = t[n - 1],
            r += u[e >> 2],
            r += u[e << 4 & 63],
            r += "==") : 2 === i && (e = (t[n - 2] << 8) + t[n - 1],
            r += u[e >> 10],
            r += u[e >> 4 & 63],
            r += u[e << 2 & 63],
            r += "="),
            o.push(r),
            o.join("")
    }

    function s(t, e, n) {
        for (var i, r = [], o = e; o < n; o += 3)
            i = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]),
                r.push(a(i));
        return r.join("")
    }

    function a(t) {
        return u[t >> 18 & 63] + u[t >> 12 & 63] + u[t >> 6 & 63] + u[63 & t]
    }

    return n_fun(
        encodeURIComponent(n)["replace"](/%([0-9A-F]{2})/g, function(a, n) {
            return p("0x" + n)
        })
    )
}

// 获取加密参数analysis
function get_analysis(){
    var e = new Date - 765 - 1515125653845;
    x = "@#"
    i = "2020-02-2866",
    i = C(i),
    i += x + "/rank/marketRank",
    i += x + e,
    i += x + 1,
    r = C(w(i,"00000008d78d46a"))
    return r
}
console.log(get_analysis())