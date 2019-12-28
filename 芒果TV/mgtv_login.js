function getPwd(pwd) {
    function s(i, t, s) {
        this.e = c(i), this.d = c(t), this.m = c(s), this.chunkSize = 2 * B(this.m), this.radix = 16, this.barrett = new O(this.m)
    }
    encodePassword = function(i) {
        return e(131), time = String(Date.parse(new Date)).substring(0, 10), rd = String(Math.random()), nonce = String(rd + time + time + rd).substring(0, 32), i = time + nonce + i,

        function(i, t) {
            var s = new Array,
                r = t.length,
                e = 0;
            for (; e < r;)
            s[e] = t.charCodeAt(e), e++;
            for (; s.length % i.chunkSize != 0;)
            s[e++] = 0;
            var g, n, d, u = s.length,
                o = "";
            for (e = 0; e < u; e += i.chunkSize) {
                for (d = new k, g = 0, n = e; n < e + i.chunkSize; ++g)
                d.digits[g] = s[n++], d.digits[g] += s[n++] << 8;
                var a = i.barrett.powMod(d, i.e),
                    h = 16 == i.radix ? l(a) : f(a, i.radix);
                o += h + " "
            }
            return o.substring(0, o.length - 1)
        }(new s("10001", "", "A5245A4630DD7CE9D8A967E33A50EB52C2634FD042C4BFBCF5A5C1317A234FD0D1D2C75D083946AF70CE480C399FAD8EEBE9F5A904F30E4D3C91CDD7C27C4D07E27015D46B29A003E9D49834E19041A7BA45A95E6161697975721E88949E8023DA682895086223683593F054E7AAE0E07C40DB33BD80EE5909CE48D17C07D097"), i)
    };
    var r, g, A, o = 16,
        D = o,
        E = 65536,
        b = E >>> 1,
        M = E * E,
        C = E - 1;

    function e(i) {
        r = new Array(i);
        for (var t = 0; t < r.length; t++)
        r[t] = 0;
        g = new k, (A = new k).digits[0] = 1
    }
    e(20);
    n(1e15);

    function k(i) {
        this.digits = "boolean" == typeof i && 1 == i ? null : r.slice(0), this.isNeg = !1
    }

    function y(i) {
        var t = new k(!0);
        return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t
    }

    function n(i) {
        var t = new k;
        t.isNeg = i < 0, i = Math.abs(i);
        for (var s = 0; 0 < i;)
        t.digits[s++] = i & C, i = Math.floor(i / E);
        return t
    }

    function d(i) {
        for (var t = "", s = i.length - 1; - 1 < s; --s)
        t += i.charAt(s);
        return t
    }
    var u = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");

    function f(i, t) {
        var s = new k;
        s.digits[0] = t;
        for (var r = L(i, s), e = u[r[1].digits[0]]; 1 == K(r[0], g);)
        r = L(r[0], s), digit = r[1].digits[0], e += u[r[1].digits[0]];
        return (i.isNeg ? "-" : "") + d(e)
    }
    var a = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

    function h(t) {
        var s = "";
        for (i = 0; i < 4; ++i)
        s += a[15 & t], t >>>= 4;
        return d(s)
    }

    function l(i) {
        for (var t = "", s = (B(i), B(i)); - 1 < s; --s)
        t += h(i.digits[s]);
        return t
    }

    function N(i) {
        return 48 <= i && i <= 57 ? i - 48 : 65 <= i && i <= 90 ? 10 + i - 65 : 97 <= i && i <= 122 ? 10 + i - 97 : 0
    }

    function v(i) {
        for (var t = 0, s = Math.min(i.length, 4), r = 0; r < s; ++r)
        t <<= 4, t |= N(i.charCodeAt(r));
        return t
    }

    function c(i) {
        for (var t = new k, s = i.length, r = 0; 0 < s; s -= 4, ++r)
        t.digits[r] = v(i.substr(Math.max(s - 4, 0), Math.min(s, 4)));
        return t
    }

    function p(i, t) {
        var s;
        if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, s = F(i, t), t.isNeg = !t.isNeg;
        else {
            s = new k;
            for (var r, e = 0, g = 0; g < i.digits.length; ++g)
            r = i.digits[g] + t.digits[g] + e, s.digits[g] = r % E, e = Number(E <= r);
            s.isNeg = i.isNeg
        }
        return s
    }

    function F(i, t) {
        var s;
        if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, s = p(i, t), t.isNeg = !t.isNeg;
        else {
            var r, e;
            s = new k;
            for (var g = e = 0; g < i.digits.length; ++g)
            r = i.digits[g] - t.digits[g] + e, s.digits[g] = r % E, s.digits[g] < 0 && (s.digits[g] += E), e = 0 - Number(r < 0);
            if (-1 == e) {
                for (g = e = 0; g < i.digits.length; ++g)
                r = 0 - s.digits[g] + e, s.digits[g] = r % E, s.digits[g] < 0 && (s.digits[g] += E), e = 0 - Number(r < 0);
                s.isNeg = !i.isNeg
            } else s.isNeg = i.isNeg
        }
        return s
    }

    function B(i) {
        for (var t = i.digits.length - 1; 0 < t && 0 == i.digits[t];)--t;
        return t
    }

    function S(i) {
        var t, s = B(i),
            r = i.digits[s],
            e = (s + 1) * D;
        for (t = e; e - D < t && 0 == (32768 & r); --t)
        r <<= 1;
        return t
    }

    function w(i, t) {
        for (var s, r, e, g = new k, n = B(i), d = B(t), u = 0; u <= d; ++u) {
            for (s = 0, e = u, j = 0; j <= n; ++j, ++e)
            r = g.digits[e] + i.digits[j] * t.digits[u] + s, g.digits[e] = r & C, s = r >>> o;
            g.digits[u + n + 1] = s
        }
        return g.isNeg = i.isNeg != t.isNeg, g
    }

    function x(i, t) {
        var s, r, e;
        result = new k, s = B(i);
        for (var g = r = 0; g <= s; ++g)
        e = result.digits[g] + i.digits[g] * t + r, result.digits[g] = e & C, r = e >>> o;
        return result.digits[1 + s] = r, result
    }

    function m(i, t, s, r, e) {
        for (var g = Math.min(t + e, i.length), n = t, d = r; n < g; ++n, ++d)
        s[d] = i[n]
    }
    var z = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535);

    function q(i, t) {
        var s = Math.floor(t / D),
            r = new k;
        m(i.digits, 0, r.digits, s, r.digits.length - s);
        for (var e = t % D, g = D - e, n = r.digits.length - 1, d = n - 1; 0 < n; --n, --d)
        r.digits[n] = r.digits[n] << e & C | (r.digits[d] & z[e]) >>> g;
        return r.digits[0] = r.digits[n] << e & C, r.isNeg = i.isNeg, r
    }
    var P = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);

    function G(i, t) {
        var s = Math.floor(t / D),
            r = new k;
        m(i.digits, s, r.digits, 0, i.digits.length - s);
        for (var e = t % D, g = D - e, n = 0, d = n + 1; n < r.digits.length - 1; ++n, ++d)
        r.digits[n] = r.digits[n] >>> e | (r.digits[d] & P[e]) << g;
        return r.digits[r.digits.length - 1] >>>= e, r.isNeg = i.isNeg, r
    }

    function H(i, t) {
        var s = new k;
        return m(i.digits, 0, s.digits, t, s.digits.length - t), s
    }

    function I(i, t) {
        var s = new k;
        return m(i.digits, t, s.digits, 0, s.digits.length - t), s
    }

    function J(i, t) {
        var s = new k;
        return m(i.digits, 0, s.digits, 0, t), s
    }

    function K(i, t) {
        if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
        for (var s = i.digits.length - 1; 0 <= s; --s)
        if (i.digits[s] != t.digits[s]) return i.isNeg ? 1 - 2 * Number(i.digits[s] > t.digits[s]) : 1 - 2 * Number(i.digits[s] < t.digits[s]);
        return 0
    }

    function L(i, t) {
        var s, r, e = S(i),
            g = S(t),
            n = t.isNeg;
        if (e < g) return i.isNeg ? ((s = y(A)).isNeg = !t.isNeg, i.isNeg = !1, t.isNeg = !1, r = F(t, i), i.isNeg = !0, t.isNeg = n) : (s = new k, r = y(i)), new Array(s, r);
        s = new k, r = i;
        for (var d = Math.ceil(g / D) - 1, u = 0; t.digits[d] < b;)
        t = q(t, 1), ++u, ++g, d = Math.ceil(g / D) - 1;
        r = q(r, u), e += u;
        for (var o = Math.ceil(e / D) - 1, a = H(t, o - d); - 1 != K(r, a);)++s.digits[o - d], r = F(r, a);
        for (var h = o; d < h; --h) {
            var f = h >= r.digits.length ? 0 : r.digits[h],
                l = h - 1 >= r.digits.length ? 0 : r.digits[h - 1],
                N = h - 2 >= r.digits.length ? 0 : r.digits[h - 2],
                v = d >= t.digits.length ? 0 : t.digits[d],
                c = d - 1 >= t.digits.length ? 0 : t.digits[d - 1];
            s.digits[h - d - 1] = f == v ? C : Math.floor((f * E + l) / v);
            for (var w = s.digits[h - d - 1] * (v * E + c), m = f * M + (l * E + N); m < w;)--s.digits[h - d - 1], w = s.digits[h - d - 1] * (v * E | c), m = f * E * E + (l * E + N);
            (r = F(r, x(a = H(t, h - d - 1), s.digits[h - d - 1]))).isNeg && (r = p(r, a), --s.digits[h - d - 1])
        }
        return r = G(r, u), s.isNeg = i.isNeg != n, i.isNeg && (s = n ? p(s, A) : F(s, A), r = F(t = G(t, u), r)), 0 == r.digits[0] && 0 == B(r) && (r.isNeg = !1), new Array(s, r)
    }

    function O(i) {
        this.modulus = y(i), this.k = B(this.modulus) + 1;
        var t, s, r = new k;
        r.digits[2 * this.k] = 1, this.mu = (t = r, s = this.modulus, L(t, s)[0]), this.bkplus1 = new k, this.bkplus1.digits[this.k + 1] = 1, this.modulo = Q, this.multiplyMod = R, this.powMod = T
    }

    function Q(i) {
        var t = I(w(I(i, this.k - 1), this.mu), this.k + 1),
            s = F(J(i, this.k + 1), J(w(t, this.modulus), this.k + 1));
        s.isNeg && (s = p(s, this.bkplus1));
        for (var r = 0 <= K(s, this.modulus); r;)
        r = 0 <= K(s = F(s, this.modulus), this.modulus);
        return s
    }

    function R(i, t) {
        var s = w(i, t);
        return this.modulo(s)
    }

    function T(i, t) {
        var s = new k;
        s.digits[0] = 1;
        for (var r = i, e = t; 0 != (1 & e.digits[0]) && (s = this.multiplyMod(s, r)), 0 != (e = G(e, 1)).digits[0] || 0 != B(e);)
        r = this.multiplyMod(r, r);
        return s
    }
    return encodePassword(pwd);
}

console.log(getPwd('a123123123'))