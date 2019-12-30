function getPwd(pwd) {
    t = this;
    e = '';
    i = '';
    t.encryptedString = t.RSAKeyPair = undefined;
    var m = i_217(e, t, i),
        s = i_291(e, t, i),
        y = {};
    y.NoPadding = "NoPadding", y.PKCS1Padding = "PKCS1Padding", y.RawEncoding = "RawEncoding", y.NumericEncoding = "NumericEncoding", t.RSAKeyPair = function o(e, t, i, n) {
        this.e = (0, m.biFromHex)(e), this.d = (0, m.biFromHex)(t), this.m = (0, m.biFromHex)(i), this.chunkSize = "number" != typeof n ? 2 * (0, m.biHighIndex)(this.m) : n / 8, this.radix = 16, this.barrett = new s.BarrettMu(this.m)
    }, t.encryptedString = function b(e, t, i, n) {
        var s, o, a, r, l, c, u, d, p, h = new Array,
            f = t.length,
            g = "";
        for (r = "string" == typeof i ? i == y.NoPadding ? 1 : i == y.PKCS1Padding ? 2 : 0 : 0, l = "string" == typeof n && n == y.RawEncoding ? 1 : 0, 1 == r ? f > e.chunkSize && (f = e.chunkSize) : 2 == r && f > e.chunkSize - 11 && (f = e.chunkSize - 11), s = 0, o = 2 == r ? f - 1 : e.chunkSize - 1; s < f;)
            r ? h[o] = t.charCodeAt(s) : h[s] = t.charCodeAt(s), s++, o--;
        for (1 == r && (s = 0), o = e.chunkSize - f % e.chunkSize; 0 < o;) {
            if (2 == r) {
                for (c = Math.floor(256 * Math.random()); !c;)
                    c = Math.floor(256 * Math.random());
                h[s] = c
            } else h[s] = 0;
            s++, o--
        }
        for (2 == r && (h[f] = 0, h[e.chunkSize - 2] = 2, h[e.chunkSize - 1] = 0), u = h.length, s = 0; s < u; s += e.chunkSize) {
            for (d = new m.BigInt, o = 0, a = s; a < s + e.chunkSize; ++o)
                d.digits[o] = h[a++], d.digits[o] += h[a++] << 8;
            p = e.barrett.powMod(d, e.e), g += 1 == l ? biToBytes(p) : 16 == e.radix ? (0, m.biToHex)(p) : biToString(p, e.radix)
        }
        return g
    };

    function i_217(e, t, i) {
        var n, v, u = 16,
            w = u,
            k = 65536,
            C = k >>> 1,
            $ = k * k,
            x = k - 1;

        function s(e) {
            n = new Array(e);
            for (var t = 0; t < n.length; t++)
                n[t] = 0;
            new _, (v = new _).digits[0] = 1
        }
        s(20);
        o(1e15);

        function _(e) {
            this.digits = "boolean" == typeof e && 1 == e ? null : n.slice(0), this.isNeg = !1
        }

        function S(e) {
            var t = new _(!0);
            return t.digits = e.digits.slice(0), t.isNeg = e.isNeg, t
        }

        function o(e) {
            var t = new _;
            t.isNeg = e < 0, e = Math.abs(e);
            for (var i = 0; 0 < e;)
                t.digits[i++] = e & x, e >>= u;
            return t
        }

        function a(e) {
            for (var t = "", i = e.length - 1; - 1 < i; --i)
                t += e.charAt(i);
            return t
        }
        new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
        var r = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

        function l(e) {
            for (var t = "", i = 0; i < 4; ++i)
                t += r[15 & e], e >>>= 4;
            return a(t)
        }

        function c(e) {
            return 48 <= e && e <= 57 ? e - 48 : 65 <= e && e <= 90 ? 10 + e - 65 : 97 <= e && e <= 122 ? 10 + e - 97 : 0
        }

        function d(e) {
            for (var t = 0, i = Math.min(e.length, 4), n = 0; n < i; ++n)
                t <<= 4, t |= c(e.charCodeAt(n));
            return t
        }

        function j(e, t) {
            var i;
            if (e.isNeg != t.isNeg) t.isNeg = !t.isNeg, i = A(e, t), t.isNeg = !t.isNeg;
            else {
                i = new _;
                for (var n, s = 0, o = 0; o < e.digits.length; ++o)
                    n = e.digits[o] + t.digits[o] + s, i.digits[o] = 65535 & n, s = Number(k <= n);
                i.isNeg = e.isNeg
            }
            return i
        }

        function A(e, t) {
            var i;
            if (e.isNeg != t.isNeg) t.isNeg = !t.isNeg, i = j(e, t), t.isNeg = !t.isNeg;
            else {
                var n, s;
                i = new _;
                for (var o = s = 0; o < e.digits.length; ++o)
                    n = e.digits[o] - t.digits[o] + s, i.digits[o] = 65535 & n, i.digits[o] < 0 && (i.digits[o] += k), s = 0 - Number(n < 0);
                if (-1 == s) {
                    for (o = s = 0; o < e.digits.length; ++o)
                        n = 0 - i.digits[o] + s, i.digits[o] = 65535 & n, i.digits[o] < 0 && (i.digits[o] += k), s = 0 - Number(n < 0);
                    i.isNeg = !e.isNeg
                } else i.isNeg = e.isNeg
            }
            return i
        }

        function T(e) {
            for (var t = e.digits.length - 1; 0 < t && 0 == e.digits[t];)--t;
            return t
        }

        function O(e) {
            var t, i = T(e),
                n = e.digits[i],
                s = (i + 1) * w;
            for (t = s; s - w < t && 0 == (32768 & n); --t)
                n <<= 1;
            return t
        }

        function p(e, t) {
            for (var i, n, s, o = new _, a = T(e), r = T(t), l = 0; l <= r; ++l) {
                s = l;
                for (var c = i = 0; c <= a; ++c, ++s)
                    n = o.digits[s] + e.digits[c] * t.digits[l] + i, o.digits[s] = n & x, i = n >>> u;
                o.digits[l + a + 1] = i
            }
            return o.isNeg = e.isNeg != t.isNeg, o
        }

        function q(e, t) {
            var i, n, s, o = new _;
            i = T(e);
            for (var a = n = 0; a <= i; ++a)
                s = o.digits[a] + e.digits[a] * t + n, o.digits[a] = s & x, n = s >>> u;
            return o.digits[1 + i] = n, o
        }

        function h(e, t, i, n, s) {
            for (var o = Math.min(t + s, e.length), a = t, r = n; a < o; ++a, ++r)
                i[r] = e[a]
        }
        var f = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535);

        function V(e, t) {
            var i = Math.floor(t / w),
                n = new _;
            h(e.digits, 0, n.digits, i, n.digits.length - i);
            for (var s = t % w, o = w - s, a = n.digits.length - 1, r = a - 1; 0 < a; --a, --r)
                n.digits[a] = n.digits[a] << s & x | (n.digits[r] & f[s]) >>> o;
            return n.digits[0] = n.digits[a] << s & x, n.isNeg = e.isNeg, n
        }
        var g = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);

        function I(e, t) {
            var i = Math.floor(t / w),
                n = new _;
            h(e.digits, i, n.digits, 0, e.digits.length - i);
            for (var s = t % w, o = w - s, a = 0, r = a + 1; a < n.digits.length - 1; ++a, ++r)
                n.digits[a] = n.digits[a] >>> s | (n.digits[r] & g[s]) << o;
            return n.digits[n.digits.length - 1] >>>= s, n.isNeg = e.isNeg, n
        }

        function L(e, t) {
            var i = new _;
            return h(e.digits, 0, i.digits, t, i.digits.length - t), i
        }

        function M(e, t) {
            if (e.isNeg != t.isNeg) return 1 - 2 * Number(e.isNeg);
            for (var i = e.digits.length - 1; 0 <= i; --i)
                if (e.digits[i] != t.digits[i]) return e.isNeg ? 1 - 2 * Number(e.digits[i] > t.digits[i]) : 1 - 2 * Number(e.digits[i] < t.digits[i]);
            return 0
        }

        function m(e, t) {
            var i, n, s = O(e),
                o = O(t),
                a = t.isNeg;
            if (s < o) return e.isNeg ? ((i = S(v)).isNeg = !t.isNeg, e.isNeg = !1, t.isNeg = !1, n = A(t, e), e.isNeg = !0, t.isNeg = a) : (i = new _, n = S(e)), new Array(i, n);
            i = new _, n = e;
            for (var r = Math.ceil(o / w) - 1, l = 0; t.digits[r] < C;)
                t = V(t, 1), ++l, ++o, r = Math.ceil(o / w) - 1;
            n = V(n, l), s += l;
            for (var c = Math.ceil(s / w) - 1, u = L(t, c - r); - 1 != M(n, u);)++i.digits[c - r], n = A(n, u);
            for (var d = c; r < d; --d) {
                var p = d >= n.digits.length ? 0 : n.digits[d],
                    h = d - 1 >= n.digits.length ? 0 : n.digits[d - 1],
                    f = d - 2 >= n.digits.length ? 0 : n.digits[d - 2],
                    g = r >= t.digits.length ? 0 : t.digits[r],
                    m = r - 1 >= t.digits.length ? 0 : t.digits[r - 1];
                i.digits[d - r - 1] = p == g ? x : Math.floor((p * k + h) / g);
                for (var y = i.digits[d - r - 1] * (g * k + m), b = p * $ + (h * k + f); b < y;)--i.digits[d - r - 1], y = i.digits[d - r - 1] * (g * k | m), b = p * k * k + (h * k + f);
                (n = A(n, q(u = L(t, d - r - 1), i.digits[d - r - 1]))).isNeg && (n = j(n, u), --i.digits[d - r - 1])
            }
            return n = I(n, l), i.isNeg = e.isNeg != a, e.isNeg && (i = a ? j(i, v) : A(i, v), n = A(t = I(t, l), n)), 0 == n.digits[0] && 0 == T(n) && (n.isNeg = !1), new Array(i, n)
        }
        t.setMaxDigits = s, t.biFromHex = function y(e) {
            for (var t = new _, i = e.length, n = 0; 0 < i; i -= 4, ++n)
                t.digits[n] = d(e.substr(Math.max(i - 4, 0), Math.min(i, 4)));
            return t
        }, t.biHighIndex = T, t.biCopy = S, t.BigInt = _, t.biDivide = function b(e, t) {
            return m(e, t)[0]
        }, t.biMultiply = p, t.biDivideByRadixPower = function F(e, t) {
            var i = new _;
            return h(e.digits, t, i.digits, 0, i.digits.length - t), i
        }, t.biModuloByRadixPower = function P(e, t) {
            var i = new _;
            return h(e.digits, 0, i.digits, 0, t), i
        }, t.biSubtract = A, t.biCompare = M, t.biShiftRight = I, t.biToHex = function N(e) {
            for (var t = "", i = (T(e), T(e)); - 1 < i; --i)
                t += l(e.digits[i]);
            return t
        }
        return t;
    };

    function i_291(e, t, i) {
        t.BarrettMu_powMod = t.BarrettMu_multiplyMod = t.BarrettMu_modulo = t.BarrettMu = undefined;
        var c = i_217(e, t, i);

        function n(e) {
            var t = (0, c.biDivideByRadixPower)(e, this.k - 1),
                i = (0, c.biMultiply)(t, this.mu),
                n = (0, c.biDivideByRadixPower)(i, this.k + 1),
                s = (0, c.biModuloByRadixPower)(e, this.k + 1),
                o = (0, c.biMultiply)(n, this.modulus),
                a = (0, c.biModuloByRadixPower)(o, this.k + 1),
                r = (0, c.biSubtract)(s, a);
            r.isNeg && (r = biAdd(r, this.bkplus1));
            for (var l = 0 <= (0, c.biCompare)(r, this.modulus); l;)
                r = (0, c.biSubtract)(r, this.modulus), l = 0 <= (0, c.biCompare)(r, this.modulus);
            return r
        }

        function s(e, t) {
            var i = (0, c.biMultiply)(e, t);
            return this.modulo(i)
        }

        function o(e, t) {
            var i = new c.BigInt;
            i.digits[0] = 1;
            for (var n = e, s = t; 0 != (1 & s.digits[0]) && (i = this.multiplyMod(i, n)), 0 != (s = (0, c.biShiftRight)(s, 1)).digits[0] || 0 != (0, c.biHighIndex)(s);)
                n = this.multiplyMod(n, n);
            return i
        }
        t.BarrettMu = function a(e) {
            this.modulus = (0, c.biCopy)(e), this.k = (0, c.biHighIndex)(this.modulus) + 1;
            var t = new c.BigInt;
            t.digits[2 * this.k] = 1, this.mu = (0, c.biDivide)(t, this.modulus), this.bkplus1 = new c.BigInt, this.bkplus1.digits[this.k + 1] = 1, this.modulo = n, this.multiplyMod = s, this.powMod = o
        }, t.BarrettMu_modulo = n, t.BarrettMu_multiplyMod = s, t.BarrettMu_powMod = o
        return t
    };
    setMaxDigits(129);
    var n = RSAKeyPair("10001", "", "BC087C7C00848CE8A349C9072C3229E0D595F817EDDE9ABF6FC72B41942A759E97956CE9CB7D1F2E99399EADBACC0531F16EAE8EFCB68553DE0E125B2231ED955ADBF5208E65DC804237C93EB23C83E7ECDA0B586ECF31839038EE6B640E0EEC5FF17D219FDEA33E730F287F0D384C74A53DFE1F91ACC63C7C92039A43AC6E97")
    return encryptedString(t, pwd);
}

console.log(getPwd('a123123'))