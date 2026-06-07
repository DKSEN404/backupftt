const Re = (d) => $(d), Pt = (d, g) => d.before(g), fe = (d, g) => g ? g.find(d) : $(d), _e = (d, g) => d.append(g), Pe = (d, g, w) => d.on(g, w), Dt = (d, g) => d.trigger(g), Ot = (d, g) => d.removeClass(g), Je = (d, g) => d.addClass(g), Ve = (d) => d.remove(), Lt = (d, g, w) => w ? d.attr(g, w) : d.attr(g), Bt = (d, g) => d.removeAttr(g), Nt = (d) => d.focus(), Be = "data", Ae = (d) => {
  var g;
  return ((g = game == null ? void 0 : game.i18n) == null ? void 0 : g.localize(`CI.${d}`)) || "";
}, ht = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), gt = (d = !1) => {
  var e, t, c, a;
  const g = (e = game == null ? void 0 : game.user) == null ? void 0 : e.role, w = (t = game == null ? void 0 : game.permissions) == null ? void 0 : t.FILES_UPLOAD;
  if (!g || !w)
    return d || (c = ui.notifications) == null || c.warn(Ae("uploadPermissions")), !1;
  const i = w.includes(g);
  return !i && !d && ((a = ui.notifications) == null || a.warn(Ae("uploadPermissions"))), i;
}, Qt = () => game == null ? void 0 : game.version, ke = () => Number(Qt()) >= 13, Ne = () => ke() ? foundry.applications.apps.FilePicker.implementation : FilePicker, zt = () => ke() ? foundry.applications.apps.ImagePopout : ImagePopout, $t = () => Re('<div id="ci-chat-upload-area" class="hidden"></div>'), at = (d) => {
  const g = ke() ? ".chat-controls" : "#chat-controls", w = fe(g, d), i = $t();
  Pt(w, i);
};
function Wt(d, g) {
  return g.forEach(function(w) {
    w && typeof w != "string" && !Array.isArray(w) && Object.keys(w).forEach(function(i) {
      if (i !== "default" && !(i in d)) {
        var e = Object.getOwnPropertyDescriptor(w, i);
        Object.defineProperty(d, i, e.get ? e : { enumerable: !0, get: function() {
          return w[i];
        } });
      }
    });
  }), Object.freeze(d);
}
function pt(d, g) {
  return new Promise(function(w, i) {
    let e;
    return qt(d).then(function(t) {
      try {
        return e = t, w(new Blob([g.slice(0, 2), e, g.slice(2)], { type: "image/jpeg" }));
      } catch (c) {
        return i(c);
      }
    }, i);
  });
}
const qt = (d) => new Promise((g, w) => {
  const i = new FileReader();
  i.addEventListener("load", ({ target: { result: e } }) => {
    const t = new DataView(e);
    let c = 0;
    if (t.getUint16(c) !== 65496)
      return w("not a valid JPEG");
    for (c += 2; ; ) {
      const a = t.getUint16(c);
      if (a === 65498)
        break;
      const m = t.getUint16(c + 2);
      if (a === 65505 && t.getUint32(c + 4) === 1165519206) {
        const E = c + 10;
        let r;
        switch (t.getUint16(E)) {
          case 18761:
            r = !0;
            break;
          case 19789:
            r = !1;
            break;
          default:
            return w("TIFF header contains invalid endian");
        }
        if (t.getUint16(E + 2, r) !== 42)
          return w("TIFF header contains invalid version");
        const o = t.getUint32(E + 4, r), n = E + o + 2 + 12 * t.getUint16(E + o, r);
        for (let s = E + o + 2; s < n; s += 12)
          if (t.getUint16(s, r) == 274) {
            if (t.getUint16(s + 2, r) !== 3)
              return w("Orientation data type is invalid");
            if (t.getUint32(s + 4, r) !== 1)
              return w("Orientation data count is invalid");
            t.setUint16(s + 8, 1, r);
            break;
          }
        return g(e.slice(c, c + 2 + m));
      }
      c += 2 + m;
    }
    return g(new Blob());
  }), i.readAsArrayBuffer(d);
});
var We = {}, jt = { get exports() {
  return We;
}, set exports(d) {
  We = d;
} };
(function(d) {
  var g, w, i = {};
  jt.exports = i, i.parse = function(e, t) {
    for (var c = i.bin.readUshort, a = i.bin.readUint, m = 0, E = {}, r = new Uint8Array(e), o = r.length - 4; a(r, o) != 101010256; )
      o--;
    m = o, m += 4;
    var n = c(r, m += 4);
    c(r, m += 2);
    var s = a(r, m += 2), p = a(r, m += 4);
    m += 4, m = p;
    for (var F = 0; F < n; F++) {
      a(r, m), m += 4, m += 4, m += 4, a(r, m += 4), s = a(r, m += 4);
      var T = a(r, m += 4), y = c(r, m += 4), O = c(r, m + 2), H = c(r, m + 4);
      m += 6;
      var M = a(r, m += 8);
      m += 4, m += y + O + H, i._readLocal(r, M, E, s, T, t);
    }
    return E;
  }, i._readLocal = function(e, t, c, a, m, E) {
    var r = i.bin.readUshort, o = i.bin.readUint;
    o(e, t), r(e, t += 4), r(e, t += 2);
    var n = r(e, t += 2);
    o(e, t += 2), o(e, t += 4), t += 4;
    var s = r(e, t += 8), p = r(e, t += 2);
    t += 2;
    var F = i.bin.readUTF8(e, t, s);
    if (t += s, t += p, E)
      c[F] = { size: m, csize: a };
    else {
      var T = new Uint8Array(e.buffer, t);
      if (n == 0)
        c[F] = new Uint8Array(T.buffer.slice(t, t + a));
      else {
        if (n != 8)
          throw "unknown compression method: " + n;
        var y = new Uint8Array(m);
        i.inflateRaw(T, y), c[F] = y;
      }
    }
  }, i.inflateRaw = function(e, t) {
    return i.F.inflate(e, t);
  }, i.inflate = function(e, t) {
    return e[0], e[1], i.inflateRaw(new Uint8Array(e.buffer, e.byteOffset + 2, e.length - 6), t);
  }, i.deflate = function(e, t) {
    t == null && (t = { level: 6 });
    var c = 0, a = new Uint8Array(50 + Math.floor(1.1 * e.length));
    a[c] = 120, a[c + 1] = 156, c += 2, c = i.F.deflateRaw(e, a, c, t.level);
    var m = i.adler(e, 0, e.length);
    return a[c + 0] = m >>> 24 & 255, a[c + 1] = m >>> 16 & 255, a[c + 2] = m >>> 8 & 255, a[c + 3] = m >>> 0 & 255, new Uint8Array(a.buffer, 0, c + 4);
  }, i.deflateRaw = function(e, t) {
    t == null && (t = { level: 6 });
    var c = new Uint8Array(50 + Math.floor(1.1 * e.length)), a = i.F.deflateRaw(e, c, a, t.level);
    return new Uint8Array(c.buffer, 0, a);
  }, i.encode = function(e, t) {
    t == null && (t = !1);
    var c = 0, a = i.bin.writeUint, m = i.bin.writeUshort, E = {};
    for (var r in e) {
      var o = !i._noNeed(r) && !t, n = e[r], s = i.crc.crc(n, 0, n.length);
      E[r] = { cpr: o, usize: n.length, crc: s, file: o ? i.deflateRaw(n) : n };
    }
    for (var r in E)
      c += E[r].file.length + 30 + 46 + 2 * i.bin.sizeUTF8(r);
    c += 22;
    var p = new Uint8Array(c), F = 0, T = [];
    for (var r in E) {
      var y = E[r];
      T.push(F), F = i._writeHeader(p, F, r, y, 0);
    }
    var O = 0, H = F;
    for (var r in E)
      y = E[r], T.push(F), F = i._writeHeader(p, F, r, y, 1, T[O++]);
    var M = F - H;
    return a(p, F, 101010256), F += 4, m(p, F += 4, O), m(p, F += 2, O), a(p, F += 2, M), a(p, F += 4, H), F += 4, F += 2, p.buffer;
  }, i._noNeed = function(e) {
    var t = e.split(".").pop().toLowerCase();
    return "png,jpg,jpeg,zip".indexOf(t) != -1;
  }, i._writeHeader = function(e, t, c, a, m, E) {
    var r = i.bin.writeUint, o = i.bin.writeUshort, n = a.file;
    return r(e, t, m == 0 ? 67324752 : 33639248), t += 4, m == 1 && (t += 2), o(e, t, 20), o(e, t += 2, 0), o(e, t += 2, a.cpr ? 8 : 0), r(e, t += 2, 0), r(e, t += 4, a.crc), r(e, t += 4, n.length), r(e, t += 4, a.usize), o(e, t += 4, i.bin.sizeUTF8(c)), o(e, t += 2, 0), t += 2, m == 1 && (t += 2, t += 2, r(e, t += 6, E), t += 4), t += i.bin.writeUTF8(e, t, c), m == 0 && (e.set(n, t), t += n.length), t;
  }, i.crc = { table: function() {
    for (var e = new Uint32Array(256), t = 0; t < 256; t++) {
      for (var c = t, a = 0; a < 8; a++)
        1 & c ? c = 3988292384 ^ c >>> 1 : c >>>= 1;
      e[t] = c;
    }
    return e;
  }(), update: function(e, t, c, a) {
    for (var m = 0; m < a; m++)
      e = i.crc.table[255 & (e ^ t[c + m])] ^ e >>> 8;
    return e;
  }, crc: function(e, t, c) {
    return 4294967295 ^ i.crc.update(4294967295, e, t, c);
  } }, i.adler = function(e, t, c) {
    for (var a = 1, m = 0, E = t, r = t + c; E < r; ) {
      for (var o = Math.min(E + 5552, r); E < o; )
        m += a += e[E++];
      a %= 65521, m %= 65521;
    }
    return m << 16 | a;
  }, i.bin = { readUshort: function(e, t) {
    return e[t] | e[t + 1] << 8;
  }, writeUshort: function(e, t, c) {
    e[t] = 255 & c, e[t + 1] = c >> 8 & 255;
  }, readUint: function(e, t) {
    return 16777216 * e[t + 3] + (e[t + 2] << 16 | e[t + 1] << 8 | e[t]);
  }, writeUint: function(e, t, c) {
    e[t] = 255 & c, e[t + 1] = c >> 8 & 255, e[t + 2] = c >> 16 & 255, e[t + 3] = c >> 24 & 255;
  }, readASCII: function(e, t, c) {
    for (var a = "", m = 0; m < c; m++)
      a += String.fromCharCode(e[t + m]);
    return a;
  }, writeASCII: function(e, t, c) {
    for (var a = 0; a < c.length; a++)
      e[t + a] = c.charCodeAt(a);
  }, pad: function(e) {
    return e.length < 2 ? "0" + e : e;
  }, readUTF8: function(e, t, c) {
    for (var a, m = "", E = 0; E < c; E++)
      m += "%" + i.bin.pad(e[t + E].toString(16));
    try {
      a = decodeURIComponent(m);
    } catch {
      return i.bin.readASCII(e, t, c);
    }
    return a;
  }, writeUTF8: function(e, t, c) {
    for (var a = c.length, m = 0, E = 0; E < a; E++) {
      var r = c.charCodeAt(E);
      if ((4294967168 & r) == 0)
        e[t + m] = r, m++;
      else if ((4294965248 & r) == 0)
        e[t + m] = 192 | r >> 6, e[t + m + 1] = 128 | r >> 0 & 63, m += 2;
      else if ((4294901760 & r) == 0)
        e[t + m] = 224 | r >> 12, e[t + m + 1] = 128 | r >> 6 & 63, e[t + m + 2] = 128 | r >> 0 & 63, m += 3;
      else {
        if ((4292870144 & r) != 0)
          throw "e";
        e[t + m] = 240 | r >> 18, e[t + m + 1] = 128 | r >> 12 & 63, e[t + m + 2] = 128 | r >> 6 & 63, e[t + m + 3] = 128 | r >> 0 & 63, m += 4;
      }
    }
    return m;
  }, sizeUTF8: function(e) {
    for (var t = e.length, c = 0, a = 0; a < t; a++) {
      var m = e.charCodeAt(a);
      if ((4294967168 & m) == 0)
        c++;
      else if ((4294965248 & m) == 0)
        c += 2;
      else if ((4294901760 & m) == 0)
        c += 3;
      else {
        if ((4292870144 & m) != 0)
          throw "e";
        c += 4;
      }
    }
    return c;
  } }, i.F = {}, i.F.deflateRaw = function(e, t, c, a) {
    var m = [[0, 0, 0, 0, 0], [4, 4, 8, 4, 0], [4, 5, 16, 8, 0], [4, 6, 16, 16, 0], [4, 10, 16, 32, 0], [8, 16, 32, 32, 0], [8, 16, 128, 128, 0], [8, 32, 128, 256, 0], [32, 128, 258, 1024, 1], [32, 258, 258, 4096, 1]][a], E = i.F.U, r = i.F._goodIndex;
    i.F._hash;
    var o = i.F._putsE, n = 0, s = c << 3, p = 0, F = e.length;
    if (a == 0) {
      for (; n < F; )
        o(t, s, n + (C = Math.min(65535, F - n)) == F ? 1 : 0), s = i.F._copyExact(e, n, C, t, s + 8), n += C;
      return s >>> 3;
    }
    var T = E.lits, y = E.strt, O = E.prev, H = 0, M = 0, P = 0, v = 0, k = 0, u = 0;
    for (F > 2 && (y[u = i.F._hash(e, 0)] = 0), n = 0; n < F; n++) {
      if (k = u, n + 1 < F - 2) {
        u = i.F._hash(e, n + 1);
        var l = n + 1 & 32767;
        O[l] = y[u], y[u] = l;
      }
      if (p <= n) {
        (H > 14e3 || M > 26697) && F - n > 100 && (p < n && (T[H] = n - p, H += 2, p = n), s = i.F._writeBlock(n == F - 1 || p == F ? 1 : 0, T, H, v, e, P, n - P, t, s), H = M = v = 0, P = n);
        var b = 0;
        n < F - 2 && (b = i.F._bestMatch(e, n, O, k, Math.min(m[2], F - n), m[3]));
        var C = b >>> 16, U = 65535 & b;
        if (b != 0) {
          U = 65535 & b;
          var I = r(C = b >>> 16, E.of0);
          E.lhst[257 + I]++;
          var A = r(U, E.df0);
          E.dhst[A]++, v += E.exb[I] + E.dxb[A], T[H] = C << 23 | n - p, T[H + 1] = U << 16 | I << 8 | A, H += 2, p = n + C;
        } else
          E.lhst[e[n]]++;
        M++;
      }
    }
    for (P == n && e.length != 0 || (p < n && (T[H] = n - p, H += 2, p = n), s = i.F._writeBlock(1, T, H, v, e, P, n - P, t, s), H = 0, M = 0, H = M = v = 0, P = n); (7 & s) != 0; )
      s++;
    return s >>> 3;
  }, i.F._bestMatch = function(e, t, c, a, m, E) {
    var r = 32767 & t, o = c[r], n = r - o + 32768 & 32767;
    if (o == r || a != i.F._hash(e, t - n))
      return 0;
    for (var s = 0, p = 0, F = Math.min(32767, t); n <= F && --E != 0 && o != r; ) {
      if (s == 0 || e[t + s] == e[t + s - n]) {
        var T = i.F._howLong(e, t, n);
        if (T > s) {
          if (p = n, (s = T) >= m)
            break;
          n + 2 < T && (T = n + 2);
          for (var y = 0, O = 0; O < T - 2; O++) {
            var H = t - n + O + 32768 & 32767, M = H - c[H] + 32768 & 32767;
            M > y && (y = M, o = H);
          }
        }
      }
      n += (r = o) - (o = c[r]) + 32768 & 32767;
    }
    return s << 16 | p;
  }, i.F._howLong = function(e, t, c) {
    if (e[t] != e[t - c] || e[t + 1] != e[t + 1 - c] || e[t + 2] != e[t + 2 - c])
      return 0;
    var a = t, m = Math.min(e.length, t + 258);
    for (t += 3; t < m && e[t] == e[t - c]; )
      t++;
    return t - a;
  }, i.F._hash = function(e, t) {
    return (e[t] << 8 | e[t + 1]) + (e[t + 2] << 4) & 65535;
  }, i.saved = 0, i.F._writeBlock = function(e, t, c, a, m, E, r, o, n) {
    var s, p, F, T, y, O, H, M, P, v = i.F.U, k = i.F._putsF, u = i.F._putsE;
    v.lhst[256]++, p = (s = i.F.getTrees())[0], F = s[1], T = s[2], y = s[3], O = s[4], H = s[5], M = s[6], P = s[7];
    var l = 32 + ((n + 3 & 7) == 0 ? 0 : 8 - (n + 3 & 7)) + (r << 3), b = a + i.F.contSize(v.fltree, v.lhst) + i.F.contSize(v.fdtree, v.dhst), C = a + i.F.contSize(v.ltree, v.lhst) + i.F.contSize(v.dtree, v.dhst);
    C += 14 + 3 * H + i.F.contSize(v.itree, v.ihst) + (2 * v.ihst[16] + 3 * v.ihst[17] + 7 * v.ihst[18]);
    for (var U = 0; U < 286; U++)
      v.lhst[U] = 0;
    for (U = 0; U < 30; U++)
      v.dhst[U] = 0;
    for (U = 0; U < 19; U++)
      v.ihst[U] = 0;
    var I = l < b && l < C ? 0 : b < C ? 1 : 2;
    if (k(o, n, e), k(o, n + 1, I), n += 3, I == 0) {
      for (; (7 & n) != 0; )
        n++;
      n = i.F._copyExact(m, E, r, o, n);
    } else {
      var A, S;
      if (I == 1 && (A = v.fltree, S = v.fdtree), I == 2) {
        i.F.makeCodes(v.ltree, p), i.F.revCodes(v.ltree, p), i.F.makeCodes(v.dtree, F), i.F.revCodes(v.dtree, F), i.F.makeCodes(v.itree, T), i.F.revCodes(v.itree, T), A = v.ltree, S = v.dtree, u(o, n, y - 257), u(o, n += 5, O - 1), u(o, n += 5, H - 4), n += 4;
        for (var h = 0; h < H; h++)
          u(o, n + 3 * h, v.itree[1 + (v.ordr[h] << 1)]);
        n += 3 * H, n = i.F._codeTiny(M, v.itree, o, n), n = i.F._codeTiny(P, v.itree, o, n);
      }
      for (var f = E, D = 0; D < c; D += 2) {
        for (var _ = t[D], x = _ >>> 23, Q = f + (8388607 & _); f < Q; )
          n = i.F._writeLit(m[f++], A, o, n);
        if (x != 0) {
          var B = t[D + 1], N = B >> 16, L = B >> 8 & 255, R = 255 & B;
          u(o, n = i.F._writeLit(257 + L, A, o, n), x - v.of0[L]), n += v.exb[L], k(o, n = i.F._writeLit(R, S, o, n), N - v.df0[R]), n += v.dxb[R], f += x;
        }
      }
      n = i.F._writeLit(256, A, o, n);
    }
    return n;
  }, i.F._copyExact = function(e, t, c, a, m) {
    var E = m >>> 3;
    return a[E] = c, a[E + 1] = c >>> 8, a[E + 2] = 255 - a[E], a[E + 3] = 255 - a[E + 1], E += 4, a.set(new Uint8Array(e.buffer, t, c), E), m + (c + 4 << 3);
  }, i.F.getTrees = function() {
    for (var e = i.F.U, t = i.F._hufTree(e.lhst, e.ltree, 15), c = i.F._hufTree(e.dhst, e.dtree, 15), a = [], m = i.F._lenCodes(e.ltree, a), E = [], r = i.F._lenCodes(e.dtree, E), o = 0; o < a.length; o += 2)
      e.ihst[a[o]]++;
    for (o = 0; o < E.length; o += 2)
      e.ihst[E[o]]++;
    for (var n = i.F._hufTree(e.ihst, e.itree, 7), s = 19; s > 4 && e.itree[1 + (e.ordr[s - 1] << 1)] == 0; )
      s--;
    return [t, c, n, m, r, s, a, E];
  }, i.F.getSecond = function(e) {
    for (var t = [], c = 0; c < e.length; c += 2)
      t.push(e[c + 1]);
    return t;
  }, i.F.nonZero = function(e) {
    for (var t = "", c = 0; c < e.length; c += 2)
      e[c + 1] != 0 && (t += (c >> 1) + ",");
    return t;
  }, i.F.contSize = function(e, t) {
    for (var c = 0, a = 0; a < t.length; a++)
      c += t[a] * e[1 + (a << 1)];
    return c;
  }, i.F._codeTiny = function(e, t, c, a) {
    for (var m = 0; m < e.length; m += 2) {
      var E = e[m], r = e[m + 1];
      a = i.F._writeLit(E, t, c, a);
      var o = E == 16 ? 2 : E == 17 ? 3 : 7;
      E > 15 && (i.F._putsE(c, a, r, o), a += o);
    }
    return a;
  }, i.F._lenCodes = function(e, t) {
    for (var c = e.length; c != 2 && e[c - 1] == 0; )
      c -= 2;
    for (var a = 0; a < c; a += 2) {
      var m = e[a + 1], E = a + 3 < c ? e[a + 3] : -1, r = a + 5 < c ? e[a + 5] : -1, o = a == 0 ? -1 : e[a - 1];
      if (m == 0 && E == m && r == m) {
        for (var n = a + 5; n + 2 < c && e[n + 2] == m; )
          n += 2;
        (s = Math.min(n + 1 - a >>> 1, 138)) < 11 ? t.push(17, s - 3) : t.push(18, s - 11), a += 2 * s - 2;
      } else if (m == o && E == m && r == m) {
        for (n = a + 5; n + 2 < c && e[n + 2] == m; )
          n += 2;
        var s = Math.min(n + 1 - a >>> 1, 6);
        t.push(16, s - 3), a += 2 * s - 2;
      } else
        t.push(m, 0);
    }
    return c >>> 1;
  }, i.F._hufTree = function(e, t, c) {
    var a = [], m = e.length, E = t.length, r = 0;
    for (r = 0; r < E; r += 2)
      t[r] = 0, t[r + 1] = 0;
    for (r = 0; r < m; r++)
      e[r] != 0 && a.push({ lit: r, f: e[r] });
    var o = a.length, n = a.slice(0);
    if (o == 0)
      return 0;
    if (o == 1) {
      var s = a[0].lit;
      return n = s == 0 ? 1 : 0, t[1 + (s << 1)] = 1, t[1 + (n << 1)] = 1, 1;
    }
    a.sort(function(M, P) {
      return M.f - P.f;
    });
    var p = a[0], F = a[1], T = 0, y = 1, O = 2;
    for (a[0] = { lit: -1, f: p.f + F.f, l: p, r: F, d: 0 }; y != o - 1; )
      p = T != y && (O == o || a[T].f < a[O].f) ? a[T++] : a[O++], F = T != y && (O == o || a[T].f < a[O].f) ? a[T++] : a[O++], a[y++] = { lit: -1, f: p.f + F.f, l: p, r: F };
    var H = i.F.setDepth(a[y - 1], 0);
    for (H > c && (i.F.restrictDepth(n, c, H), H = c), r = 0; r < o; r++)
      t[1 + (n[r].lit << 1)] = n[r].d;
    return H;
  }, i.F.setDepth = function(e, t) {
    return e.lit != -1 ? (e.d = t, t) : Math.max(i.F.setDepth(e.l, t + 1), i.F.setDepth(e.r, t + 1));
  }, i.F.restrictDepth = function(e, t, c) {
    var a = 0, m = 1 << c - t, E = 0;
    for (e.sort(function(o, n) {
      return n.d == o.d ? o.f - n.f : n.d - o.d;
    }), a = 0; a < e.length && e[a].d > t; a++) {
      var r = e[a].d;
      e[a].d = t, E += m - (1 << c - r);
    }
    for (E >>>= c - t; E > 0; )
      (r = e[a].d) < t ? (e[a].d++, E -= 1 << t - r - 1) : a++;
    for (; a >= 0; a--)
      e[a].d == t && E < 0 && (e[a].d--, E++);
    E != 0 && console.log("debt left");
  }, i.F._goodIndex = function(e, t) {
    var c = 0;
    return t[16 | c] <= e && (c |= 16), t[8 | c] <= e && (c |= 8), t[4 | c] <= e && (c |= 4), t[2 | c] <= e && (c |= 2), t[1 | c] <= e && (c |= 1), c;
  }, i.F._writeLit = function(e, t, c, a) {
    return i.F._putsF(c, a, t[e << 1]), a + t[1 + (e << 1)];
  }, i.F.inflate = function(e, t) {
    var c = Uint8Array;
    if (e[0] == 3 && e[1] == 0)
      return t || new c(0);
    var a = i.F, m = a._bitsF, E = a._bitsE, r = a._decodeTiny, o = a.makeCodes, n = a.codes2map, s = a._get17, p = a.U, F = t == null;
    F && (t = new c(e.length >>> 2 << 3));
    for (var T, y, O = 0, H = 0, M = 0, P = 0, v = 0, k = 0, u = 0, l = 0, b = 0; O == 0; )
      if (O = m(e, b, 1), H = m(e, b + 1, 2), b += 3, H != 0) {
        if (F && (t = i.F._check(t, l + (1 << 17))), H == 1 && (T = p.flmap, y = p.fdmap, k = 511, u = 31), H == 2) {
          M = E(e, b, 5) + 257, P = E(e, b + 5, 5) + 1, v = E(e, b + 10, 4) + 4, b += 14;
          for (var C = 0; C < 38; C += 2)
            p.itree[C] = 0, p.itree[C + 1] = 0;
          var U = 1;
          for (C = 0; C < v; C++) {
            var I = E(e, b + 3 * C, 3);
            p.itree[1 + (p.ordr[C] << 1)] = I, I > U && (U = I);
          }
          b += 3 * v, o(p.itree, U), n(p.itree, U, p.imap), T = p.lmap, y = p.dmap, b = r(p.imap, (1 << U) - 1, M + P, e, b, p.ttree);
          var A = a._copyOut(p.ttree, 0, M, p.ltree);
          k = (1 << A) - 1;
          var S = a._copyOut(p.ttree, M, P, p.dtree);
          u = (1 << S) - 1, o(p.ltree, A), n(p.ltree, A, T), o(p.dtree, S), n(p.dtree, S, y);
        }
        for (; ; ) {
          var h = T[s(e, b) & k];
          b += 15 & h;
          var f = h >>> 4;
          if (f >>> 8 == 0)
            t[l++] = f;
          else {
            if (f == 256)
              break;
            var D = l + f - 254;
            if (f > 264) {
              var _ = p.ldef[f - 257];
              D = l + (_ >>> 3) + E(e, b, 7 & _), b += 7 & _;
            }
            var x = y[s(e, b) & u];
            b += 15 & x;
            var Q = x >>> 4, B = p.ddef[Q], N = (B >>> 4) + m(e, b, 15 & B);
            for (b += 15 & B, F && (t = i.F._check(t, l + (1 << 17))); l < D; )
              t[l] = t[l++ - N], t[l] = t[l++ - N], t[l] = t[l++ - N], t[l] = t[l++ - N];
            l = D;
          }
        }
      } else {
        (7 & b) != 0 && (b += 8 - (7 & b));
        var L = 4 + (b >>> 3), R = e[L - 4] | e[L - 3] << 8;
        F && (t = i.F._check(t, l + R)), t.set(new c(e.buffer, e.byteOffset + L, R), l), b = L + R << 3, l += R;
      }
    return t.length == l ? t : t.slice(0, l);
  }, i.F._check = function(e, t) {
    var c = e.length;
    if (t <= c)
      return e;
    var a = new Uint8Array(Math.max(c << 1, t));
    return a.set(e, 0), a;
  }, i.F._decodeTiny = function(e, t, c, a, m, E) {
    for (var r = i.F._bitsE, o = i.F._get17, n = 0; n < c; ) {
      var s = e[o(a, m) & t];
      m += 15 & s;
      var p = s >>> 4;
      if (p <= 15)
        E[n] = p, n++;
      else {
        var F = 0, T = 0;
        p == 16 ? (T = 3 + r(a, m, 2), m += 2, F = E[n - 1]) : p == 17 ? (T = 3 + r(a, m, 3), m += 3) : p == 18 && (T = 11 + r(a, m, 7), m += 7);
        for (var y = n + T; n < y; )
          E[n] = F, n++;
      }
    }
    return m;
  }, i.F._copyOut = function(e, t, c, a) {
    for (var m = 0, E = 0, r = a.length >>> 1; E < c; ) {
      var o = e[E + t];
      a[E << 1] = 0, a[1 + (E << 1)] = o, o > m && (m = o), E++;
    }
    for (; E < r; )
      a[E << 1] = 0, a[1 + (E << 1)] = 0, E++;
    return m;
  }, i.F.makeCodes = function(e, t) {
    for (var c, a, m, E, r = i.F.U, o = e.length, n = r.bl_count, s = 0; s <= t; s++)
      n[s] = 0;
    for (s = 1; s < o; s += 2)
      n[e[s]]++;
    var p = r.next_code;
    for (c = 0, n[0] = 0, a = 1; a <= t; a++)
      c = c + n[a - 1] << 1, p[a] = c;
    for (m = 0; m < o; m += 2)
      (E = e[m + 1]) != 0 && (e[m] = p[E], p[E]++);
  }, i.F.codes2map = function(e, t, c) {
    for (var a = e.length, m = i.F.U.rev15, E = 0; E < a; E += 2)
      if (e[E + 1] != 0)
        for (var r = E >> 1, o = e[E + 1], n = r << 4 | o, s = t - o, p = e[E] << s, F = p + (1 << s); p != F; )
          c[m[p] >>> 15 - t] = n, p++;
  }, i.F.revCodes = function(e, t) {
    for (var c = i.F.U.rev15, a = 15 - t, m = 0; m < e.length; m += 2) {
      var E = e[m] << t - e[m + 1];
      e[m] = c[E] >>> a;
    }
  }, i.F._putsE = function(e, t, c) {
    c <<= 7 & t;
    var a = t >>> 3;
    e[a] |= c, e[a + 1] |= c >>> 8;
  }, i.F._putsF = function(e, t, c) {
    c <<= 7 & t;
    var a = t >>> 3;
    e[a] |= c, e[a + 1] |= c >>> 8, e[a + 2] |= c >>> 16;
  }, i.F._bitsE = function(e, t, c) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8) >>> (7 & t) & (1 << c) - 1;
  }, i.F._bitsF = function(e, t, c) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8 | e[2 + (t >>> 3)] << 16) >>> (7 & t) & (1 << c) - 1;
  }, i.F._get17 = function(e, t) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8 | e[2 + (t >>> 3)] << 16) >>> (7 & t);
  }, i.F._get25 = function(e, t) {
    return (e[t >>> 3] | e[1 + (t >>> 3)] << 8 | e[2 + (t >>> 3)] << 16 | e[3 + (t >>> 3)] << 24) >>> (7 & t);
  }, i.F.U = (g = Uint16Array, w = Uint32Array, { next_code: new g(16), bl_count: new g(16), ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], ldef: new g(32), df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], ddef: new w(32), flmap: new g(512), fltree: [], fdmap: new g(32), fdtree: [], lmap: new g(32768), ltree: [], ttree: [], dmap: new g(32768), dtree: [], imap: new g(512), itree: [], rev15: new g(32768), lhst: new w(286), dhst: new w(30), ihst: new w(19), lits: new w(15e3), strt: new g(65536), prev: new g(32768) }), function() {
    for (var e = i.F.U, t = 0; t < 32768; t++) {
      var c = t;
      c = (4278255360 & (c = (4042322160 & (c = (3435973836 & (c = (2863311530 & c) >>> 1 | (1431655765 & c) << 1)) >>> 2 | (858993459 & c) << 2)) >>> 4 | (252645135 & c) << 4)) >>> 8 | (16711935 & c) << 8, e.rev15[t] = (c >>> 16 | c << 16) >>> 17;
    }
    function a(m, E, r) {
      for (; E-- != 0; )
        m.push(0, r);
    }
    for (t = 0; t < 32; t++)
      e.ldef[t] = e.of0[t] << 3 | e.exb[t], e.ddef[t] = e.df0[t] << 4 | e.dxb[t];
    a(e.fltree, 144, 8), a(e.fltree, 112, 9), a(e.fltree, 24, 7), a(e.fltree, 8, 8), i.F.makeCodes(e.fltree, 9), i.F.codes2map(e.fltree, 9, e.flmap), i.F.revCodes(e.fltree, 9), a(e.fdtree, 32, 5), i.F.makeCodes(e.fdtree, 5), i.F.codes2map(e.fdtree, 5, e.fdmap), i.F.revCodes(e.fdtree, 5), a(e.itree, 19, 0), a(e.ltree, 286, 0), a(e.dtree, 30, 0), a(e.ttree, 320, 0);
  }();
})();
var Gt = Wt({ __proto__: null, default: We }, [We]);
const ge = function() {
  var d = { nextZero(r, o) {
    for (; r[o] != 0; )
      o++;
    return o;
  }, readUshort: (r, o) => r[o] << 8 | r[o + 1], writeUshort(r, o, n) {
    r[o] = n >> 8 & 255, r[o + 1] = 255 & n;
  }, readUint: (r, o) => 16777216 * r[o] + (r[o + 1] << 16 | r[o + 2] << 8 | r[o + 3]), writeUint(r, o, n) {
    r[o] = n >> 24 & 255, r[o + 1] = n >> 16 & 255, r[o + 2] = n >> 8 & 255, r[o + 3] = 255 & n;
  }, readASCII(r, o, n) {
    let s = "";
    for (let p = 0; p < n; p++)
      s += String.fromCharCode(r[o + p]);
    return s;
  }, writeASCII(r, o, n) {
    for (let s = 0; s < n.length; s++)
      r[o + s] = n.charCodeAt(s);
  }, readBytes(r, o, n) {
    const s = [];
    for (let p = 0; p < n; p++)
      s.push(r[o + p]);
    return s;
  }, pad: (r) => r.length < 2 ? `0${r}` : r, readUTF8(r, o, n) {
    let s, p = "";
    for (let F = 0; F < n; F++)
      p += `%${d.pad(r[o + F].toString(16))}`;
    try {
      s = decodeURIComponent(p);
    } catch {
      return d.readASCII(r, o, n);
    }
    return s;
  } };
  function g(r, o, n, s) {
    const p = o * n, F = t(s), T = Math.ceil(o * F / 8), y = new Uint8Array(4 * p), O = new Uint32Array(y.buffer), { ctype: H } = s, { depth: M } = s, P = d.readUshort;
    if (H == 6) {
      const _ = p << 2;
      if (M == 8)
        for (var v = 0; v < _; v += 4)
          y[v] = r[v], y[v + 1] = r[v + 1], y[v + 2] = r[v + 2], y[v + 3] = r[v + 3];
      if (M == 16)
        for (v = 0; v < _; v++)
          y[v] = r[v << 1];
    } else if (H == 2) {
      const _ = s.tabs.tRNS;
      if (_ == null) {
        if (M == 8)
          for (v = 0; v < p; v++) {
            var k = 3 * v;
            O[v] = 255 << 24 | r[k + 2] << 16 | r[k + 1] << 8 | r[k];
          }
        if (M == 16)
          for (v = 0; v < p; v++)
            k = 6 * v, O[v] = 255 << 24 | r[k + 4] << 16 | r[k + 2] << 8 | r[k];
      } else {
        var u = _[0];
        const x = _[1], Q = _[2];
        if (M == 8)
          for (v = 0; v < p; v++) {
            var l = v << 2;
            k = 3 * v, O[v] = 255 << 24 | r[k + 2] << 16 | r[k + 1] << 8 | r[k], r[k] == u && r[k + 1] == x && r[k + 2] == Q && (y[l + 3] = 0);
          }
        if (M == 16)
          for (v = 0; v < p; v++)
            l = v << 2, k = 6 * v, O[v] = 255 << 24 | r[k + 4] << 16 | r[k + 2] << 8 | r[k], P(r, k) == u && P(r, k + 2) == x && P(r, k + 4) == Q && (y[l + 3] = 0);
      }
    } else if (H == 3) {
      const _ = s.tabs.PLTE, x = s.tabs.tRNS, Q = x ? x.length : 0;
      if (M == 1)
        for (var b = 0; b < n; b++) {
          var C = b * T, U = b * o;
          for (v = 0; v < o; v++) {
            l = U + v << 2;
            var I = 3 * (A = r[C + (v >> 3)] >> 7 - ((7 & v) << 0) & 1);
            y[l] = _[I], y[l + 1] = _[I + 1], y[l + 2] = _[I + 2], y[l + 3] = A < Q ? x[A] : 255;
          }
        }
      if (M == 2)
        for (b = 0; b < n; b++)
          for (C = b * T, U = b * o, v = 0; v < o; v++)
            l = U + v << 2, I = 3 * (A = r[C + (v >> 2)] >> 6 - ((3 & v) << 1) & 3), y[l] = _[I], y[l + 1] = _[I + 1], y[l + 2] = _[I + 2], y[l + 3] = A < Q ? x[A] : 255;
      if (M == 4)
        for (b = 0; b < n; b++)
          for (C = b * T, U = b * o, v = 0; v < o; v++)
            l = U + v << 2, I = 3 * (A = r[C + (v >> 1)] >> 4 - ((1 & v) << 2) & 15), y[l] = _[I], y[l + 1] = _[I + 1], y[l + 2] = _[I + 2], y[l + 3] = A < Q ? x[A] : 255;
      if (M == 8)
        for (v = 0; v < p; v++) {
          var A;
          l = v << 2, I = 3 * (A = r[v]), y[l] = _[I], y[l + 1] = _[I + 1], y[l + 2] = _[I + 2], y[l + 3] = A < Q ? x[A] : 255;
        }
    } else if (H == 4) {
      if (M == 8)
        for (v = 0; v < p; v++) {
          l = v << 2;
          var S = r[h = v << 1];
          y[l] = S, y[l + 1] = S, y[l + 2] = S, y[l + 3] = r[h + 1];
        }
      if (M == 16)
        for (v = 0; v < p; v++) {
          var h;
          l = v << 2, S = r[h = v << 2], y[l] = S, y[l + 1] = S, y[l + 2] = S, y[l + 3] = r[h + 2];
        }
    } else if (H == 0)
      for (u = s.tabs.tRNS ? s.tabs.tRNS : -1, b = 0; b < n; b++) {
        const _ = b * T, x = b * o;
        if (M == 1)
          for (var f = 0; f < o; f++) {
            var D = (S = 255 * (r[_ + (f >>> 3)] >>> 7 - (7 & f) & 1)) == 255 * u ? 0 : 255;
            O[x + f] = D << 24 | S << 16 | S << 8 | S;
          }
        else if (M == 2)
          for (f = 0; f < o; f++)
            D = (S = 85 * (r[_ + (f >>> 2)] >>> 6 - ((3 & f) << 1) & 3)) == 85 * u ? 0 : 255, O[x + f] = D << 24 | S << 16 | S << 8 | S;
        else if (M == 4)
          for (f = 0; f < o; f++)
            D = (S = 17 * (r[_ + (f >>> 1)] >>> 4 - ((1 & f) << 2) & 15)) == 17 * u ? 0 : 255, O[x + f] = D << 24 | S << 16 | S << 8 | S;
        else if (M == 8)
          for (f = 0; f < o; f++)
            D = (S = r[_ + f]) == u ? 0 : 255, O[x + f] = D << 24 | S << 16 | S << 8 | S;
        else if (M == 16)
          for (f = 0; f < o; f++)
            S = r[_ + (f << 1)], D = P(r, _ + (f << 1)) == u ? 0 : 255, O[x + f] = D << 24 | S << 16 | S << 8 | S;
      }
    return y;
  }
  function w(r, o, n, s) {
    const p = t(r), F = Math.ceil(n * p / 8), T = new Uint8Array((F + 1 + r.interlace) * s);
    return o = r.tabs.CgBI ? e(o, T) : i(o, T), r.interlace == 0 ? o = c(o, r, 0, n, s) : r.interlace == 1 && (o = function(O, H) {
      const M = H.width, P = H.height, v = t(H), k = v >> 3, u = Math.ceil(M * v / 8), l = new Uint8Array(P * u);
      let b = 0;
      const C = [0, 0, 4, 0, 2, 0, 1], U = [0, 4, 0, 2, 0, 1, 0], I = [8, 8, 8, 4, 4, 2, 2], A = [8, 8, 4, 4, 2, 2, 1];
      let S = 0;
      for (; S < 7; ) {
        const f = I[S], D = A[S];
        let _ = 0, x = 0, Q = C[S];
        for (; Q < P; )
          Q += f, x++;
        let B = U[S];
        for (; B < M; )
          B += D, _++;
        const N = Math.ceil(_ * v / 8);
        c(O, H, b, _, x);
        let L = 0, R = C[S];
        for (; R < P; ) {
          let z = U[S], Z = b + L * N << 3;
          for (; z < M; ) {
            var h;
            if (v == 1 && (h = (h = O[Z >> 3]) >> 7 - (7 & Z) & 1, l[R * u + (z >> 3)] |= h << 7 - ((7 & z) << 0)), v == 2 && (h = (h = O[Z >> 3]) >> 6 - (7 & Z) & 3, l[R * u + (z >> 2)] |= h << 6 - ((3 & z) << 1)), v == 4 && (h = (h = O[Z >> 3]) >> 4 - (7 & Z) & 15, l[R * u + (z >> 1)] |= h << 4 - ((1 & z) << 2)), v >= 8) {
              const q = R * u + z * k;
              for (let W = 0; W < k; W++)
                l[q + W] = O[(Z >> 3) + W];
            }
            Z += v, z += D;
          }
          L++, R += f;
        }
        _ * x != 0 && (b += x * (1 + N)), S += 1;
      }
      return l;
    }(o, r)), o;
  }
  function i(r, o) {
    return e(new Uint8Array(r.buffer, 2, r.length - 6), o);
  }
  var e = function() {
    const r = { H: {} };
    return r.H.N = function(o, n) {
      const s = Uint8Array;
      let p, F, T = 0, y = 0, O = 0, H = 0, M = 0, P = 0, v = 0, k = 0, u = 0;
      if (o[0] == 3 && o[1] == 0)
        return n || new s(0);
      const l = r.H, b = l.b, C = l.e, U = l.R, I = l.n, A = l.A, S = l.Z, h = l.m, f = n == null;
      for (f && (n = new s(o.length >>> 2 << 5)); T == 0; )
        if (T = b(o, u, 1), y = b(o, u + 1, 2), u += 3, y != 0) {
          if (f && (n = r.H.W(n, k + (1 << 17))), y == 1 && (p = h.J, F = h.h, P = 511, v = 31), y == 2) {
            O = C(o, u, 5) + 257, H = C(o, u + 5, 5) + 1, M = C(o, u + 10, 4) + 4, u += 14;
            let _ = 1;
            for (var D = 0; D < 38; D += 2)
              h.Q[D] = 0, h.Q[D + 1] = 0;
            for (D = 0; D < M; D++) {
              const B = C(o, u + 3 * D, 3);
              h.Q[1 + (h.X[D] << 1)] = B, B > _ && (_ = B);
            }
            u += 3 * M, I(h.Q, _), A(h.Q, _, h.u), p = h.w, F = h.d, u = U(h.u, (1 << _) - 1, O + H, o, u, h.v);
            const x = l.V(h.v, 0, O, h.C);
            P = (1 << x) - 1;
            const Q = l.V(h.v, O, H, h.D);
            v = (1 << Q) - 1, I(h.C, x), A(h.C, x, p), I(h.D, Q), A(h.D, Q, F);
          }
          for (; ; ) {
            const _ = p[S(o, u) & P];
            u += 15 & _;
            const x = _ >>> 4;
            if (x >>> 8 == 0)
              n[k++] = x;
            else {
              if (x == 256)
                break;
              {
                let Q = k + x - 254;
                if (x > 264) {
                  const z = h.q[x - 257];
                  Q = k + (z >>> 3) + C(o, u, 7 & z), u += 7 & z;
                }
                const B = F[S(o, u) & v];
                u += 15 & B;
                const N = B >>> 4, L = h.c[N], R = (L >>> 4) + b(o, u, 15 & L);
                for (u += 15 & L; k < Q; )
                  n[k] = n[k++ - R], n[k] = n[k++ - R], n[k] = n[k++ - R], n[k] = n[k++ - R];
                k = Q;
              }
            }
          }
        } else {
          (7 & u) != 0 && (u += 8 - (7 & u));
          const _ = 4 + (u >>> 3), x = o[_ - 4] | o[_ - 3] << 8;
          f && (n = r.H.W(n, k + x)), n.set(new s(o.buffer, o.byteOffset + _, x), k), u = _ + x << 3, k += x;
        }
      return n.length == k ? n : n.slice(0, k);
    }, r.H.W = function(o, n) {
      const s = o.length;
      if (n <= s)
        return o;
      const p = new Uint8Array(s << 1);
      return p.set(o, 0), p;
    }, r.H.R = function(o, n, s, p, F, T) {
      const y = r.H.e, O = r.H.Z;
      let H = 0;
      for (; H < s; ) {
        const M = o[O(p, F) & n];
        F += 15 & M;
        const P = M >>> 4;
        if (P <= 15)
          T[H] = P, H++;
        else {
          let v = 0, k = 0;
          P == 16 ? (k = 3 + y(p, F, 2), F += 2, v = T[H - 1]) : P == 17 ? (k = 3 + y(p, F, 3), F += 3) : P == 18 && (k = 11 + y(p, F, 7), F += 7);
          const u = H + k;
          for (; H < u; )
            T[H] = v, H++;
        }
      }
      return F;
    }, r.H.V = function(o, n, s, p) {
      let F = 0, T = 0;
      const y = p.length >>> 1;
      for (; T < s; ) {
        const O = o[T + n];
        p[T << 1] = 0, p[1 + (T << 1)] = O, O > F && (F = O), T++;
      }
      for (; T < y; )
        p[T << 1] = 0, p[1 + (T << 1)] = 0, T++;
      return F;
    }, r.H.n = function(o, n) {
      const s = r.H.m, p = o.length;
      let F, T, y, O;
      const H = s.j;
      for (var M = 0; M <= n; M++)
        H[M] = 0;
      for (M = 1; M < p; M += 2)
        H[o[M]]++;
      const P = s.K;
      for (F = 0, H[0] = 0, T = 1; T <= n; T++)
        F = F + H[T - 1] << 1, P[T] = F;
      for (y = 0; y < p; y += 2)
        O = o[y + 1], O != 0 && (o[y] = P[O], P[O]++);
    }, r.H.A = function(o, n, s) {
      const p = o.length, F = r.H.m.r;
      for (let T = 0; T < p; T += 2)
        if (o[T + 1] != 0) {
          const y = T >> 1, O = o[T + 1], H = y << 4 | O, M = n - O;
          let P = o[T] << M;
          const v = P + (1 << M);
          for (; P != v; )
            s[F[P] >>> 15 - n] = H, P++;
        }
    }, r.H.l = function(o, n) {
      const s = r.H.m.r, p = 15 - n;
      for (let F = 0; F < o.length; F += 2) {
        const T = o[F] << n - o[F + 1];
        o[F] = s[T] >>> p;
      }
    }, r.H.M = function(o, n, s) {
      s <<= 7 & n;
      const p = n >>> 3;
      o[p] |= s, o[p + 1] |= s >>> 8;
    }, r.H.I = function(o, n, s) {
      s <<= 7 & n;
      const p = n >>> 3;
      o[p] |= s, o[p + 1] |= s >>> 8, o[p + 2] |= s >>> 16;
    }, r.H.e = function(o, n, s) {
      return (o[n >>> 3] | o[1 + (n >>> 3)] << 8) >>> (7 & n) & (1 << s) - 1;
    }, r.H.b = function(o, n, s) {
      return (o[n >>> 3] | o[1 + (n >>> 3)] << 8 | o[2 + (n >>> 3)] << 16) >>> (7 & n) & (1 << s) - 1;
    }, r.H.Z = function(o, n) {
      return (o[n >>> 3] | o[1 + (n >>> 3)] << 8 | o[2 + (n >>> 3)] << 16) >>> (7 & n);
    }, r.H.i = function(o, n) {
      return (o[n >>> 3] | o[1 + (n >>> 3)] << 8 | o[2 + (n >>> 3)] << 16 | o[3 + (n >>> 3)] << 24) >>> (7 & n);
    }, r.H.m = function() {
      const o = Uint16Array, n = Uint32Array;
      return { K: new o(16), j: new o(16), X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999], T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0], q: new o(32), p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535], z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0], c: new n(32), J: new o(512), _: [], h: new o(32), $: [], w: new o(32768), C: [], v: [], d: new o(32768), D: [], u: new o(512), Q: [], r: new o(32768), s: new n(286), Y: new n(30), a: new n(19), t: new n(15e3), k: new o(65536), g: new o(32768) };
    }(), function() {
      const o = r.H.m;
      for (var n = 0; n < 32768; n++) {
        let p = n;
        p = (2863311530 & p) >>> 1 | (1431655765 & p) << 1, p = (3435973836 & p) >>> 2 | (858993459 & p) << 2, p = (4042322160 & p) >>> 4 | (252645135 & p) << 4, p = (4278255360 & p) >>> 8 | (16711935 & p) << 8, o.r[n] = (p >>> 16 | p << 16) >>> 17;
      }
      function s(p, F, T) {
        for (; F-- != 0; )
          p.push(0, T);
      }
      for (n = 0; n < 32; n++)
        o.q[n] = o.S[n] << 3 | o.T[n], o.c[n] = o.p[n] << 4 | o.z[n];
      s(o._, 144, 8), s(o._, 112, 9), s(o._, 24, 7), s(o._, 8, 8), r.H.n(o._, 9), r.H.A(o._, 9, o.J), r.H.l(o._, 9), s(o.$, 32, 5), r.H.n(o.$, 5), r.H.A(o.$, 5, o.h), r.H.l(o.$, 5), s(o.Q, 19, 0), s(o.C, 286, 0), s(o.D, 30, 0), s(o.v, 320, 0);
    }(), r.H.N;
  }();
  function t(r) {
    return [1, null, 3, 1, 2, null, 4][r.ctype] * r.depth;
  }
  function c(r, o, n, s, p) {
    let F = t(o);
    const T = Math.ceil(s * F / 8);
    let y, O;
    F = Math.ceil(F / 8);
    let H = r[n], M = 0;
    if (H > 1 && (r[n] = [0, 0, 1][H - 2]), H == 3)
      for (M = F; M < T; M++)
        r[M + 1] = r[M + 1] + (r[M + 1 - F] >>> 1) & 255;
    for (let P = 0; P < p; P++)
      if (y = n + P * T, O = y + P + 1, H = r[O - 1], M = 0, H == 0)
        for (; M < T; M++)
          r[y + M] = r[O + M];
      else if (H == 1) {
        for (; M < F; M++)
          r[y + M] = r[O + M];
        for (; M < T; M++)
          r[y + M] = r[O + M] + r[y + M - F];
      } else if (H == 2)
        for (; M < T; M++)
          r[y + M] = r[O + M] + r[y + M - T];
      else if (H == 3) {
        for (; M < F; M++)
          r[y + M] = r[O + M] + (r[y + M - T] >>> 1);
        for (; M < T; M++)
          r[y + M] = r[O + M] + (r[y + M - T] + r[y + M - F] >>> 1);
      } else {
        for (; M < F; M++)
          r[y + M] = r[O + M] + a(0, r[y + M - T], 0);
        for (; M < T; M++)
          r[y + M] = r[O + M] + a(r[y + M - F], r[y + M - T], r[y + M - F - T]);
      }
    return r;
  }
  function a(r, o, n) {
    const s = r + o - n, p = s - r, F = s - o, T = s - n;
    return p * p <= F * F && p * p <= T * T ? r : F * F <= T * T ? o : n;
  }
  function m(r, o, n) {
    n.width = d.readUint(r, o), o += 4, n.height = d.readUint(r, o), o += 4, n.depth = r[o], o++, n.ctype = r[o], o++, n.compress = r[o], o++, n.filter = r[o], o++, n.interlace = r[o], o++;
  }
  function E(r, o, n, s, p, F, T, y, O) {
    const H = Math.min(o, p), M = Math.min(n, F);
    let P = 0, v = 0;
    for (let S = 0; S < M; S++)
      for (let h = 0; h < H; h++)
        if (T >= 0 && y >= 0 ? (P = S * o + h << 2, v = (y + S) * p + T + h << 2) : (P = (-y + S) * o - T + h << 2, v = S * p + h << 2), O == 0)
          s[v] = r[P], s[v + 1] = r[P + 1], s[v + 2] = r[P + 2], s[v + 3] = r[P + 3];
        else if (O == 1) {
          var k = r[P + 3] * 0.00392156862745098, u = r[P] * k, l = r[P + 1] * k, b = r[P + 2] * k, C = s[v + 3] * (1 / 255), U = s[v] * C, I = s[v + 1] * C, A = s[v + 2] * C;
          const f = 1 - k, D = k + C * f, _ = D == 0 ? 0 : 1 / D;
          s[v + 3] = 255 * D, s[v + 0] = (u + U * f) * _, s[v + 1] = (l + I * f) * _, s[v + 2] = (b + A * f) * _;
        } else if (O == 2)
          k = r[P + 3], u = r[P], l = r[P + 1], b = r[P + 2], C = s[v + 3], U = s[v], I = s[v + 1], A = s[v + 2], k == C && u == U && l == I && b == A ? (s[v] = 0, s[v + 1] = 0, s[v + 2] = 0, s[v + 3] = 0) : (s[v] = u, s[v + 1] = l, s[v + 2] = b, s[v + 3] = k);
        else if (O == 3) {
          if (k = r[P + 3], u = r[P], l = r[P + 1], b = r[P + 2], C = s[v + 3], U = s[v], I = s[v + 1], A = s[v + 2], k == C && u == U && l == I && b == A)
            continue;
          if (k < 220 && C > 20)
            return !1;
        }
    return !0;
  }
  return { decode: function(o) {
    const n = new Uint8Array(o);
    let s = 8;
    const p = d, F = p.readUshort, T = p.readUint, y = { tabs: {}, frames: [] }, O = new Uint8Array(n.length);
    let H, M = 0, P = 0;
    const v = [137, 80, 78, 71, 13, 10, 26, 10];
    for (var k = 0; k < 8; k++)
      if (n[k] != v[k])
        throw "The input is not a PNG file!";
    for (; s < n.length; ) {
      const S = p.readUint(n, s);
      s += 4;
      const h = p.readASCII(n, s, 4);
      if (s += 4, h == "IHDR")
        m(n, s, y);
      else if (h == "iCCP") {
        for (var u = s; n[u] != 0; )
          u++;
        p.readASCII(n, s, u - s), n[u + 1];
        const f = n.slice(u + 2, s + S);
        let D = null;
        try {
          D = i(f);
        } catch {
          D = e(f);
        }
        y.tabs[h] = D;
      } else if (h == "CgBI")
        y.tabs[h] = n.slice(s, s + 4);
      else if (h == "IDAT") {
        for (k = 0; k < S; k++)
          O[M + k] = n[s + k];
        M += S;
      } else if (h == "acTL")
        y.tabs[h] = { num_frames: T(n, s), num_plays: T(n, s + 4) }, H = new Uint8Array(n.length);
      else if (h == "fcTL") {
        P != 0 && ((A = y.frames[y.frames.length - 1]).data = w(y, H.slice(0, P), A.rect.width, A.rect.height), P = 0);
        const f = { x: T(n, s + 12), y: T(n, s + 16), width: T(n, s + 4), height: T(n, s + 8) };
        let D = F(n, s + 22);
        D = F(n, s + 20) / (D == 0 ? 100 : D);
        const _ = { rect: f, delay: Math.round(1e3 * D), dispose: n[s + 24], blend: n[s + 25] };
        y.frames.push(_);
      } else if (h == "fdAT") {
        for (k = 0; k < S - 4; k++)
          H[P + k] = n[s + k + 4];
        P += S - 4;
      } else if (h == "pHYs")
        y.tabs[h] = [p.readUint(n, s), p.readUint(n, s + 4), n[s + 8]];
      else if (h == "cHRM")
        for (y.tabs[h] = [], k = 0; k < 8; k++)
          y.tabs[h].push(p.readUint(n, s + 4 * k));
      else if (h == "tEXt" || h == "zTXt") {
        y.tabs[h] == null && (y.tabs[h] = {});
        var l = p.nextZero(n, s), b = p.readASCII(n, s, l - s), C = s + S - l - 1;
        if (h == "tEXt")
          I = p.readASCII(n, l + 1, C);
        else {
          var U = i(n.slice(l + 2, l + 2 + C));
          I = p.readUTF8(U, 0, U.length);
        }
        y.tabs[h][b] = I;
      } else if (h == "iTXt") {
        y.tabs[h] == null && (y.tabs[h] = {}), l = 0, u = s, l = p.nextZero(n, u), b = p.readASCII(n, u, l - u);
        const f = n[u = l + 1];
        var I;
        n[u + 1], u += 2, l = p.nextZero(n, u), p.readASCII(n, u, l - u), u = l + 1, l = p.nextZero(n, u), p.readUTF8(n, u, l - u), C = S - ((u = l + 1) - s), f == 0 ? I = p.readUTF8(n, u, C) : (U = i(n.slice(u, u + C)), I = p.readUTF8(U, 0, U.length)), y.tabs[h][b] = I;
      } else if (h == "PLTE")
        y.tabs[h] = p.readBytes(n, s, S);
      else if (h == "hIST") {
        const f = y.tabs.PLTE.length / 3;
        for (y.tabs[h] = [], k = 0; k < f; k++)
          y.tabs[h].push(F(n, s + 2 * k));
      } else if (h == "tRNS")
        y.ctype == 3 ? y.tabs[h] = p.readBytes(n, s, S) : y.ctype == 0 ? y.tabs[h] = F(n, s) : y.ctype == 2 && (y.tabs[h] = [F(n, s), F(n, s + 2), F(n, s + 4)]);
      else if (h == "gAMA")
        y.tabs[h] = p.readUint(n, s) / 1e5;
      else if (h == "sRGB")
        y.tabs[h] = n[s];
      else if (h == "bKGD")
        y.ctype == 0 || y.ctype == 4 ? y.tabs[h] = [F(n, s)] : y.ctype == 2 || y.ctype == 6 ? y.tabs[h] = [F(n, s), F(n, s + 2), F(n, s + 4)] : y.ctype == 3 && (y.tabs[h] = n[s]);
      else if (h == "IEND")
        break;
      s += S, p.readUint(n, s), s += 4;
    }
    var A;
    return P != 0 && ((A = y.frames[y.frames.length - 1]).data = w(y, H.slice(0, P), A.rect.width, A.rect.height)), y.data = w(y, O, y.width, y.height), delete y.compress, delete y.interlace, delete y.filter, y;
  }, toRGBA8: function(o) {
    const n = o.width, s = o.height;
    if (o.tabs.acTL == null)
      return [g(o.data, n, s, o).buffer];
    const p = [];
    o.frames[0].data == null && (o.frames[0].data = o.data);
    const F = n * s * 4, T = new Uint8Array(F), y = new Uint8Array(F), O = new Uint8Array(F);
    for (let M = 0; M < o.frames.length; M++) {
      const P = o.frames[M], v = P.rect.x, k = P.rect.y, u = P.rect.width, l = P.rect.height, b = g(P.data, u, l, o);
      if (M != 0)
        for (var H = 0; H < F; H++)
          O[H] = T[H];
      if (P.blend == 0 ? E(b, u, l, T, n, s, v, k, 0) : P.blend == 1 && E(b, u, l, T, n, s, v, k, 1), p.push(T.buffer.slice(0)), P.dispose != 0) {
        if (P.dispose == 1)
          E(y, u, l, T, n, s, v, k, 0);
        else if (P.dispose == 2)
          for (H = 0; H < F; H++)
            T[H] = O[H];
      }
    }
    return p;
  }, _paeth: a, _copyTile: E, _bin: d };
}();
(function() {
  const { _copyTile: d } = ge, { _bin: g } = ge, w = ge._paeth;
  var i = { table: function() {
    const u = new Uint32Array(256);
    for (let l = 0; l < 256; l++) {
      let b = l;
      for (let C = 0; C < 8; C++)
        1 & b ? b = 3988292384 ^ b >>> 1 : b >>>= 1;
      u[l] = b;
    }
    return u;
  }(), update(u, l, b, C) {
    for (let U = 0; U < C; U++)
      u = i.table[255 & (u ^ l[b + U])] ^ u >>> 8;
    return u;
  }, crc: (u, l, b) => 4294967295 ^ i.update(4294967295, u, l, b) };
  function e(u, l, b, C) {
    l[b] += u[0] * C >> 4, l[b + 1] += u[1] * C >> 4, l[b + 2] += u[2] * C >> 4, l[b + 3] += u[3] * C >> 4;
  }
  function t(u) {
    return Math.max(0, Math.min(255, u));
  }
  function c(u, l) {
    const b = u[0] - l[0], C = u[1] - l[1], U = u[2] - l[2], I = u[3] - l[3];
    return b * b + C * C + U * U + I * I;
  }
  function a(u, l, b, C, U, I, A) {
    A == null && (A = 1);
    const S = C.length, h = [];
    for (var f = 0; f < S; f++) {
      const R = C[f];
      h.push([R >>> 0 & 255, R >>> 8 & 255, R >>> 16 & 255, R >>> 24 & 255]);
    }
    for (f = 0; f < S; f++) {
      let R = 4294967295;
      for (var D = 0, _ = 0; _ < S; _++) {
        var x = c(h[f], h[_]);
        _ != f && x < R && (R = x, D = _);
      }
    }
    const Q = new Uint32Array(U.buffer), B = new Int16Array(l * b * 4), N = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (f = 0; f < N.length; f++)
      N[f] = 255 * ((N[f] + 0.5) / 16 - 0.5);
    for (let R = 0; R < b; R++)
      for (let z = 0; z < l; z++) {
        var L;
        f = 4 * (R * l + z), A != 2 ? L = [t(u[f] + B[f]), t(u[f + 1] + B[f + 1]), t(u[f + 2] + B[f + 2]), t(u[f + 3] + B[f + 3])] : (x = N[4 * (3 & R) + (3 & z)], L = [t(u[f] + x), t(u[f + 1] + x), t(u[f + 2] + x), t(u[f + 3] + x)]), D = 0;
        let Z = 16777215;
        for (_ = 0; _ < S; _++) {
          const j = c(L, h[_]);
          j < Z && (Z = j, D = _);
        }
        const q = h[D], W = [L[0] - q[0], L[1] - q[1], L[2] - q[2], L[3] - q[3]];
        A == 1 && (z != l - 1 && e(W, B, f + 4, 7), R != b - 1 && (z != 0 && e(W, B, f + 4 * l - 4, 3), e(W, B, f + 4 * l, 5), z != l - 1 && e(W, B, f + 4 * l + 4, 1))), I[f >> 2] = D, Q[f >> 2] = C[D];
      }
  }
  function m(u, l, b, C, U) {
    U == null && (U = {});
    const { crc: I } = i, A = g.writeUint, S = g.writeUshort, h = g.writeASCII;
    let f = 8;
    const D = u.frames.length > 1;
    let _, x = !1, Q = 33 + (D ? 20 : 0);
    if (U.sRGB != null && (Q += 13), U.pHYs != null && (Q += 21), U.iCCP != null && (_ = pako.deflate(U.iCCP), Q += 21 + _.length + 4), u.ctype == 3) {
      for (var B = u.plte.length, N = 0; N < B; N++)
        u.plte[N] >>> 24 != 255 && (x = !0);
      Q += 8 + 3 * B + 4 + (x ? 8 + 1 * B + 4 : 0);
    }
    for (var L = 0; L < u.frames.length; L++)
      D && (Q += 38), Q += (q = u.frames[L]).cimg.length + 12, L != 0 && (Q += 4);
    Q += 12;
    const R = new Uint8Array(Q), z = [137, 80, 78, 71, 13, 10, 26, 10];
    for (N = 0; N < 8; N++)
      R[N] = z[N];
    if (A(R, f, 13), f += 4, h(R, f, "IHDR"), f += 4, A(R, f, l), f += 4, A(R, f, b), f += 4, R[f] = u.depth, f++, R[f] = u.ctype, f++, R[f] = 0, f++, R[f] = 0, f++, R[f] = 0, f++, A(R, f, I(R, f - 17, 17)), f += 4, U.sRGB != null && (A(R, f, 1), f += 4, h(R, f, "sRGB"), f += 4, R[f] = U.sRGB, f++, A(R, f, I(R, f - 5, 5)), f += 4), U.iCCP != null) {
      const W = 13 + _.length;
      A(R, f, W), f += 4, h(R, f, "iCCP"), f += 4, h(R, f, "ICC profile"), f += 11, f += 2, R.set(_, f), f += _.length, A(R, f, I(R, f - (W + 4), W + 4)), f += 4;
    }
    if (U.pHYs != null && (A(R, f, 9), f += 4, h(R, f, "pHYs"), f += 4, A(R, f, U.pHYs[0]), f += 4, A(R, f, U.pHYs[1]), f += 4, R[f] = U.pHYs[2], f++, A(R, f, I(R, f - 13, 13)), f += 4), D && (A(R, f, 8), f += 4, h(R, f, "acTL"), f += 4, A(R, f, u.frames.length), f += 4, A(R, f, U.loop != null ? U.loop : 0), f += 4, A(R, f, I(R, f - 12, 12)), f += 4), u.ctype == 3) {
      for (A(R, f, 3 * (B = u.plte.length)), f += 4, h(R, f, "PLTE"), f += 4, N = 0; N < B; N++) {
        const W = 3 * N, j = u.plte[N], J = 255 & j, te = j >>> 8 & 255, Ee = j >>> 16 & 255;
        R[f + W + 0] = J, R[f + W + 1] = te, R[f + W + 2] = Ee;
      }
      if (f += 3 * B, A(R, f, I(R, f - 3 * B - 4, 3 * B + 4)), f += 4, x) {
        for (A(R, f, B), f += 4, h(R, f, "tRNS"), f += 4, N = 0; N < B; N++)
          R[f + N] = u.plte[N] >>> 24 & 255;
        f += B, A(R, f, I(R, f - B - 4, B + 4)), f += 4;
      }
    }
    let Z = 0;
    for (L = 0; L < u.frames.length; L++) {
      var q = u.frames[L];
      D && (A(R, f, 26), f += 4, h(R, f, "fcTL"), f += 4, A(R, f, Z++), f += 4, A(R, f, q.rect.width), f += 4, A(R, f, q.rect.height), f += 4, A(R, f, q.rect.x), f += 4, A(R, f, q.rect.y), f += 4, S(R, f, C[L]), f += 2, S(R, f, 1e3), f += 2, R[f] = q.dispose, f++, R[f] = q.blend, f++, A(R, f, I(R, f - 30, 30)), f += 4);
      const W = q.cimg;
      A(R, f, (B = W.length) + (L == 0 ? 0 : 4)), f += 4;
      const j = f;
      h(R, f, L == 0 ? "IDAT" : "fdAT"), f += 4, L != 0 && (A(R, f, Z++), f += 4), R.set(W, f), f += B, A(R, f, I(R, j, f - j)), f += 4;
    }
    return A(R, f, 0), f += 4, h(R, f, "IEND"), f += 4, A(R, f, I(R, f - 4, 4)), f += 4, R.buffer;
  }
  function E(u, l, b) {
    for (let C = 0; C < u.frames.length; C++) {
      const U = u.frames[C];
      U.rect.width;
      const I = U.rect.height, A = new Uint8Array(I * U.bpl + I);
      U.cimg = s(U.img, I, U.bpp, U.bpl, A, l, b);
    }
  }
  function r(u, l, b, C, U) {
    const I = U[0], A = U[1], S = U[2], h = U[3], f = U[4], D = U[5];
    let _ = 6, x = 8, Q = 255;
    for (var B = 0; B < u.length; B++) {
      const re = new Uint8Array(u[B]);
      for (var N = re.length, L = 0; L < N; L += 4)
        Q &= re[L + 3];
    }
    const R = Q != 255, z = function(Y, G, ne, ae, V, le) {
      const ee = [];
      for (var K = 0; K < Y.length; K++) {
        const se = new Uint8Array(Y[K]), he = new Uint32Array(se.buffer);
        var ue;
        let de = 0, be = 0, me = G, Fe = ne, Ze = ae ? 1 : 0;
        if (K != 0) {
          const xt = le || ae || K == 1 || ee[K - 2].dispose != 0 ? 1 : 2;
          let Ye = 0, ot = 1e9;
          for (let De = 0; De < xt; De++) {
            var we = new Uint8Array(Y[K - 1 - De]);
            const Ht = new Uint32Array(Y[K - 1 - De]);
            let ye = G, Ue = ne, xe = -1, Oe = -1;
            for (let Ie = 0; Ie < ne; Ie++)
              for (let Se = 0; Se < G; Se++)
                he[oe = Ie * G + Se] != Ht[oe] && (Se < ye && (ye = Se), Se > xe && (xe = Se), Ie < Ue && (Ue = Ie), Ie > Oe && (Oe = Ie));
            xe == -1 && (ye = Ue = xe = Oe = 0), V && ((1 & ye) == 1 && ye--, (1 & Ue) == 1 && Ue--);
            const it = (xe - ye + 1) * (Oe - Ue + 1);
            it < ot && (ot = it, Ye = De, de = ye, be = Ue, me = xe - ye + 1, Fe = Oe - Ue + 1);
          }
          we = new Uint8Array(Y[K - 1 - Ye]), Ye == 1 && (ee[K - 1].dispose = 2), ue = new Uint8Array(me * Fe * 4), d(we, G, ne, ue, me, Fe, -de, -be, 0), Ze = d(se, G, ne, ue, me, Fe, -de, -be, 3) ? 1 : 0, Ze == 1 ? n(se, G, ne, ue, { x: de, y: be, width: me, height: Fe }) : d(se, G, ne, ue, me, Fe, -de, -be, 0);
        } else
          ue = se.slice(0);
        ee.push({ rect: { x: de, y: be, width: me, height: Fe }, img: ue, blend: Ze, dispose: 0 });
      }
      if (ae)
        for (K = 0; K < ee.length; K++) {
          if ((Ce = ee[K]).blend == 1)
            continue;
          const se = Ce.rect, he = ee[K - 1].rect, de = Math.min(se.x, he.x), be = Math.min(se.y, he.y), me = { x: de, y: be, width: Math.max(se.x + se.width, he.x + he.width) - de, height: Math.max(se.y + se.height, he.y + he.height) - be };
          ee[K - 1].dispose = 1, K - 1 != 0 && o(Y, G, ne, ee, K - 1, me, V), o(Y, G, ne, ee, K, me, V);
        }
      let Le = 0;
      if (Y.length != 1)
        for (var oe = 0; oe < ee.length; oe++) {
          var Ce;
          Le += (Ce = ee[oe]).rect.width * Ce.rect.height;
        }
      return ee;
    }(u, l, b, I, A, S), Z = {}, q = [], W = [];
    if (C != 0) {
      const re = [];
      for (L = 0; L < z.length; L++)
        re.push(z[L].img.buffer);
      const Y = function(V) {
        let le = 0;
        for (var ee = 0; ee < V.length; ee++)
          le += V[ee].byteLength;
        const K = new Uint8Array(le);
        let ue = 0;
        for (ee = 0; ee < V.length; ee++) {
          const we = new Uint8Array(V[ee]), Le = we.length;
          for (let oe = 0; oe < Le; oe += 4) {
            let Ce = we[oe], se = we[oe + 1], he = we[oe + 2];
            const de = we[oe + 3];
            de == 0 && (Ce = se = he = 0), K[ue + oe] = Ce, K[ue + oe + 1] = se, K[ue + oe + 2] = he, K[ue + oe + 3] = de;
          }
          ue += Le;
        }
        return K.buffer;
      }(re), G = F(Y, C);
      for (L = 0; L < G.plte.length; L++)
        q.push(G.plte[L].est.rgba);
      let ne = 0;
      for (L = 0; L < z.length; L++) {
        const ae = (J = z[L]).img.length;
        var j = new Uint8Array(G.inds.buffer, ne >> 2, ae >> 2);
        W.push(j);
        const V = new Uint8Array(G.abuf, ne, ae);
        D && a(J.img, J.rect.width, J.rect.height, q, V, j), J.img.set(V), ne += ae;
      }
    } else
      for (B = 0; B < z.length; B++) {
        var J = z[B];
        const re = new Uint32Array(J.img.buffer);
        var te = J.rect.width;
        for (N = re.length, j = new Uint8Array(N), W.push(j), L = 0; L < N; L++) {
          const Y = re[L];
          if (L != 0 && Y == re[L - 1])
            j[L] = j[L - 1];
          else if (L > te && Y == re[L - te])
            j[L] = j[L - te];
          else {
            let G = Z[Y];
            if (G == null && (Z[Y] = G = q.length, q.push(Y), q.length >= 300))
              break;
            j[L] = G;
          }
        }
      }
    const Ee = q.length;
    for (Ee <= 256 && f == 0 && (x = Ee <= 2 ? 1 : Ee <= 4 ? 2 : Ee <= 16 ? 4 : 8, x = Math.max(x, h)), B = 0; B < z.length; B++) {
      (J = z[B]).rect.x, J.rect.y, te = J.rect.width;
      const re = J.rect.height;
      let Y = J.img;
      new Uint32Array(Y.buffer);
      let G = 4 * te, ne = 4;
      if (Ee <= 256 && f == 0) {
        G = Math.ceil(x * te / 8);
        var pe = new Uint8Array(G * re);
        const ae = W[B];
        for (let V = 0; V < re; V++) {
          L = V * G;
          const le = V * te;
          if (x == 8)
            for (var X = 0; X < te; X++)
              pe[L + X] = ae[le + X];
          else if (x == 4)
            for (X = 0; X < te; X++)
              pe[L + (X >> 1)] |= ae[le + X] << 4 - 4 * (1 & X);
          else if (x == 2)
            for (X = 0; X < te; X++)
              pe[L + (X >> 2)] |= ae[le + X] << 6 - 2 * (3 & X);
          else if (x == 1)
            for (X = 0; X < te; X++)
              pe[L + (X >> 3)] |= ae[le + X] << 7 - 1 * (7 & X);
        }
        Y = pe, _ = 3, ne = 1;
      } else if (R == 0 && z.length == 1) {
        pe = new Uint8Array(te * re * 3);
        const ae = te * re;
        for (L = 0; L < ae; L++) {
          const V = 3 * L, le = 4 * L;
          pe[V] = Y[le], pe[V + 1] = Y[le + 1], pe[V + 2] = Y[le + 2];
        }
        Y = pe, _ = 2, ne = 3, G = 3 * te;
      }
      J.img = Y, J.bpl = G, J.bpp = ne;
    }
    return { ctype: _, depth: x, plte: q, frames: z };
  }
  function o(u, l, b, C, U, I, A) {
    const S = Uint8Array, h = Uint32Array, f = new S(u[U - 1]), D = new h(u[U - 1]), _ = U + 1 < u.length ? new S(u[U + 1]) : null, x = new S(u[U]), Q = new h(x.buffer);
    let B = l, N = b, L = -1, R = -1;
    for (let Z = 0; Z < I.height; Z++)
      for (let q = 0; q < I.width; q++) {
        const W = I.x + q, j = I.y + Z, J = j * l + W, te = Q[J];
        te == 0 || C[U - 1].dispose == 0 && D[J] == te && (_ == null || _[4 * J + 3] != 0) || (W < B && (B = W), W > L && (L = W), j < N && (N = j), j > R && (R = j));
      }
    L == -1 && (B = N = L = R = 0), A && ((1 & B) == 1 && B--, (1 & N) == 1 && N--), I = { x: B, y: N, width: L - B + 1, height: R - N + 1 };
    const z = C[U];
    z.rect = I, z.blend = 1, z.img = new Uint8Array(I.width * I.height * 4), C[U - 1].dispose == 0 ? (d(f, l, b, z.img, I.width, I.height, -I.x, -I.y, 0), n(x, l, b, z.img, I)) : d(x, l, b, z.img, I.width, I.height, -I.x, -I.y, 0);
  }
  function n(u, l, b, C, U) {
    d(u, l, b, C, U.width, U.height, -U.x, -U.y, 2);
  }
  function s(u, l, b, C, U, I, A) {
    const S = [];
    let h, f = [0, 1, 2, 3, 4];
    I != -1 ? f = [I] : (l * C > 5e5 || b == 1) && (f = [0]), A && (h = { level: 0 });
    const D = Gt;
    for (var _ = 0; _ < f.length; _++) {
      for (let B = 0; B < l; B++)
        p(U, u, B, C, b, f[_]);
      S.push(D.deflate(U, h));
    }
    let x, Q = 1e9;
    for (_ = 0; _ < S.length; _++)
      S[_].length < Q && (x = _, Q = S[_].length);
    return S[x];
  }
  function p(u, l, b, C, U, I) {
    const A = b * C;
    let S = A + b;
    if (u[S] = I, S++, I == 0)
      if (C < 500)
        for (var h = 0; h < C; h++)
          u[S + h] = l[A + h];
      else
        u.set(new Uint8Array(l.buffer, A, C), S);
    else if (I == 1) {
      for (h = 0; h < U; h++)
        u[S + h] = l[A + h];
      for (h = U; h < C; h++)
        u[S + h] = l[A + h] - l[A + h - U] + 256 & 255;
    } else if (b == 0) {
      for (h = 0; h < U; h++)
        u[S + h] = l[A + h];
      if (I == 2)
        for (h = U; h < C; h++)
          u[S + h] = l[A + h];
      if (I == 3)
        for (h = U; h < C; h++)
          u[S + h] = l[A + h] - (l[A + h - U] >> 1) + 256 & 255;
      if (I == 4)
        for (h = U; h < C; h++)
          u[S + h] = l[A + h] - w(l[A + h - U], 0, 0) + 256 & 255;
    } else {
      if (I == 2)
        for (h = 0; h < C; h++)
          u[S + h] = l[A + h] + 256 - l[A + h - C] & 255;
      if (I == 3) {
        for (h = 0; h < U; h++)
          u[S + h] = l[A + h] + 256 - (l[A + h - C] >> 1) & 255;
        for (h = U; h < C; h++)
          u[S + h] = l[A + h] + 256 - (l[A + h - C] + l[A + h - U] >> 1) & 255;
      }
      if (I == 4) {
        for (h = 0; h < U; h++)
          u[S + h] = l[A + h] + 256 - w(0, l[A + h - C], 0) & 255;
        for (h = U; h < C; h++)
          u[S + h] = l[A + h] + 256 - w(l[A + h - U], l[A + h - C], l[A + h - U - C]) & 255;
      }
    }
  }
  function F(u, l) {
    const b = new Uint8Array(u), C = b.slice(0), U = new Uint32Array(C.buffer), I = T(C, l), A = I[0], S = I[1], h = b.length, f = new Uint8Array(h >> 2);
    let D;
    if (b.length < 2e7)
      for (var _ = 0; _ < h; _ += 4)
        D = y(A, x = b[_] * (1 / 255), Q = b[_ + 1] * (1 / 255), B = b[_ + 2] * (1 / 255), N = b[_ + 3] * (1 / 255)), f[_ >> 2] = D.ind, U[_ >> 2] = D.est.rgba;
    else
      for (_ = 0; _ < h; _ += 4) {
        var x = b[_] * 0.00392156862745098, Q = b[_ + 1] * (1 / 255), B = b[_ + 2] * (1 / 255), N = b[_ + 3] * (1 / 255);
        for (D = A; D.left; )
          D = O(D.est, x, Q, B, N) <= 0 ? D.left : D.right;
        f[_ >> 2] = D.ind, U[_ >> 2] = D.est.rgba;
      }
    return { abuf: C.buffer, inds: f, plte: S };
  }
  function T(u, l, b) {
    b == null && (b = 1e-4);
    const C = new Uint32Array(u.buffer), U = { i0: 0, i1: u.length, bst: null, est: null, tdst: 0, left: null, right: null };
    U.bst = P(u, U.i0, U.i1), U.est = v(U.bst);
    const I = [U];
    for (; I.length < l; ) {
      let S = 0, h = 0;
      for (var A = 0; A < I.length; A++)
        I[A].est.L > S && (S = I[A].est.L, h = A);
      if (S < b)
        break;
      const f = I[h], D = H(u, C, f.i0, f.i1, f.est.e, f.est.eMq255);
      if (f.i0 >= D || f.i1 <= D) {
        f.est.L = 0;
        continue;
      }
      const _ = { i0: f.i0, i1: D, bst: null, est: null, tdst: 0, left: null, right: null };
      _.bst = P(u, _.i0, _.i1), _.est = v(_.bst);
      const x = { i0: D, i1: f.i1, bst: null, est: null, tdst: 0, left: null, right: null };
      for (x.bst = { R: [], m: [], N: f.bst.N - _.bst.N }, A = 0; A < 16; A++)
        x.bst.R[A] = f.bst.R[A] - _.bst.R[A];
      for (A = 0; A < 4; A++)
        x.bst.m[A] = f.bst.m[A] - _.bst.m[A];
      x.est = v(x.bst), f.left = _, f.right = x, I[h] = _, I.push(x);
    }
    for (I.sort((S, h) => h.bst.N - S.bst.N), A = 0; A < I.length; A++)
      I[A].ind = A;
    return [U, I];
  }
  function y(u, l, b, C, U) {
    if (u.left == null)
      return u.tdst = function(_, x, Q, B, N) {
        const L = x - _[0], R = Q - _[1], z = B - _[2], Z = N - _[3];
        return L * L + R * R + z * z + Z * Z;
      }(u.est.q, l, b, C, U), u;
    const I = O(u.est, l, b, C, U);
    let A = u.left, S = u.right;
    I > 0 && (A = u.right, S = u.left);
    const h = y(A, l, b, C, U);
    if (h.tdst <= I * I)
      return h;
    const f = y(S, l, b, C, U);
    return f.tdst < h.tdst ? f : h;
  }
  function O(u, l, b, C, U) {
    const { e: I } = u;
    return I[0] * l + I[1] * b + I[2] * C + I[3] * U - u.eMq;
  }
  function H(u, l, b, C, U, I) {
    for (C -= 4; b < C; ) {
      for (; M(u, b, U) <= I; )
        b += 4;
      for (; M(u, C, U) > I; )
        C -= 4;
      if (b >= C)
        break;
      const A = l[b >> 2];
      l[b >> 2] = l[C >> 2], l[C >> 2] = A, b += 4, C -= 4;
    }
    for (; M(u, b, U) > I; )
      b -= 4;
    return b + 4;
  }
  function M(u, l, b) {
    return u[l] * b[0] + u[l + 1] * b[1] + u[l + 2] * b[2] + u[l + 3] * b[3];
  }
  function P(u, l, b) {
    const C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], U = [0, 0, 0, 0], I = b - l >> 2;
    for (let A = l; A < b; A += 4) {
      const S = u[A] * 0.00392156862745098, h = u[A + 1] * (1 / 255), f = u[A + 2] * (1 / 255), D = u[A + 3] * (1 / 255);
      U[0] += S, U[1] += h, U[2] += f, U[3] += D, C[0] += S * S, C[1] += S * h, C[2] += S * f, C[3] += S * D, C[5] += h * h, C[6] += h * f, C[7] += h * D, C[10] += f * f, C[11] += f * D, C[15] += D * D;
    }
    return C[4] = C[1], C[8] = C[2], C[9] = C[6], C[12] = C[3], C[13] = C[7], C[14] = C[11], { R: C, m: U, N: I };
  }
  function v(u) {
    const { R: l } = u, { m: b } = u, { N: C } = u, U = b[0], I = b[1], A = b[2], S = b[3], h = C == 0 ? 0 : 1 / C, f = [l[0] - U * U * h, l[1] - U * I * h, l[2] - U * A * h, l[3] - U * S * h, l[4] - I * U * h, l[5] - I * I * h, l[6] - I * A * h, l[7] - I * S * h, l[8] - A * U * h, l[9] - A * I * h, l[10] - A * A * h, l[11] - A * S * h, l[12] - S * U * h, l[13] - S * I * h, l[14] - S * A * h, l[15] - S * S * h], D = f, _ = k;
    let x = [Math.random(), Math.random(), Math.random(), Math.random()], Q = 0, B = 0;
    if (C != 0)
      for (let L = 0; L < 16 && (x = _.multVec(D, x), B = Math.sqrt(_.dot(x, x)), x = _.sml(1 / B, x), !(L != 0 && Math.abs(B - Q) < 1e-9)); L++)
        Q = B;
    const N = [U * h, I * h, A * h, S * h];
    return { Cov: f, q: N, e: x, L: Q, eMq255: _.dot(_.sml(255, N), x), eMq: _.dot(x, N), rgba: (Math.round(255 * N[3]) << 24 | Math.round(255 * N[2]) << 16 | Math.round(255 * N[1]) << 8 | Math.round(255 * N[0]) << 0) >>> 0 };
  }
  var k = { multVec: (u, l) => [u[0] * l[0] + u[1] * l[1] + u[2] * l[2] + u[3] * l[3], u[4] * l[0] + u[5] * l[1] + u[6] * l[2] + u[7] * l[3], u[8] * l[0] + u[9] * l[1] + u[10] * l[2] + u[11] * l[3], u[12] * l[0] + u[13] * l[1] + u[14] * l[2] + u[15] * l[3]], dot: (u, l) => u[0] * l[0] + u[1] * l[1] + u[2] * l[2] + u[3] * l[3], sml: (u, l) => [u * l[0], u * l[1], u * l[2], u * l[3]] };
  ge.encode = function(l, b, C, U, I, A, S) {
    U == null && (U = 0), S == null && (S = !1);
    const h = r(l, b, C, U, [!1, !1, !1, 0, S, !1]);
    return E(h, -1), m(h, b, C, I, A);
  }, ge.encodeLL = function(l, b, C, U, I, A, S, h) {
    const f = { ctype: 0 + (U == 1 ? 0 : 2) + (I == 0 ? 0 : 4), depth: A, frames: [] }, D = (U + I) * A, _ = D * b;
    for (let x = 0; x < l.length; x++)
      f.frames.push({ rect: { x: 0, y: 0, width: b, height: C }, img: new Uint8Array(l[x]), blend: 0, dispose: 1, bpp: Math.ceil(D / 8), bpl: Math.ceil(_ / 8) });
    return E(f, 0, !0), m(f, b, C, S, h);
  }, ge.encode.compress = r, ge.encode.dither = a, ge.quantize = F, ge.quantize.getKDtree = T, ge.quantize.getNearest = y;
})();
const mt = { toArrayBuffer(d, g) {
  const w = d.width, i = d.height, e = w << 2, t = d.getContext("2d").getImageData(0, 0, w, i), c = new Uint32Array(t.data.buffer), a = (32 * w + 31) / 32 << 2, m = a * i, E = 122 + m, r = new ArrayBuffer(E), o = new DataView(r), n = 1 << 20;
  let s, p, F, T, y = n, O = 0, H = 0, M = 0;
  function P(u) {
    o.setUint16(H, u, !0), H += 2;
  }
  function v(u) {
    o.setUint32(H, u, !0), H += 4;
  }
  function k(u) {
    H += u;
  }
  P(19778), v(E), k(4), v(122), v(108), v(w), v(-i >>> 0), P(1), P(32), v(3), v(m), v(2835), v(2835), k(8), v(16711680), v(65280), v(255), v(4278190080), v(1466527264), function u() {
    for (; O < i && y > 0; ) {
      for (T = 122 + O * a, s = 0; s < e; )
        y--, p = c[M++], F = p >>> 24, o.setUint32(T + s, p << 8 | F), s += 4;
      O++;
    }
    M < c.length ? (y = n, setTimeout(u, mt._dly)) : g(r);
  }();
}, toBlob(d, g) {
  this.toArrayBuffer(d, (w) => {
    g(new Blob([w], { type: "image/bmp" }));
  });
}, _dly: 9 };
var ce = { CHROME: "CHROME", FIREFOX: "FIREFOX", DESKTOP_SAFARI: "DESKTOP_SAFARI", IE: "IE", IOS: "IOS", ETC: "ETC" }, Kt = { [ce.CHROME]: 16384, [ce.FIREFOX]: 11180, [ce.DESKTOP_SAFARI]: 16384, [ce.IE]: 8192, [ce.IOS]: 4096, [ce.ETC]: 8192 };
const et = typeof window < "u", vt = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, qe = et && window.cordova && window.cordova.require && window.cordova.require("cordova/modulemapper"), Zt = (et || vt) && (qe && qe.getOriginalSymbol(window, "File") || typeof File < "u" && File), At = (et || vt) && (qe && qe.getOriginalSymbol(window, "FileReader") || typeof FileReader < "u" && FileReader);
function tt(d, g, w = Date.now()) {
  return new Promise((i) => {
    const e = d.split(","), t = e[0].match(/:(.*?);/)[1], c = globalThis.atob(e[1]);
    let a = c.length;
    const m = new Uint8Array(a);
    for (; a--; )
      m[a] = c.charCodeAt(a);
    const E = new Blob([m], { type: t });
    E.name = g, E.lastModified = w, i(E);
  });
}
function bt(d) {
  return new Promise((g, w) => {
    const i = new At();
    i.onload = () => g(i.result), i.onerror = (e) => w(e), i.readAsDataURL(d);
  });
}
function wt(d) {
  return new Promise((g, w) => {
    const i = new Image();
    i.onload = () => g(i), i.onerror = (e) => w(e), i.src = d;
  });
}
function Me() {
  if (Me.cachedResult !== void 0)
    return Me.cachedResult;
  let d = ce.ETC;
  const { userAgent: g } = navigator;
  return /Chrom(e|ium)/i.test(g) ? d = ce.CHROME : /iP(ad|od|hone)/i.test(g) && /WebKit/i.test(g) ? d = ce.IOS : /Safari/i.test(g) ? d = ce.DESKTOP_SAFARI : /Firefox/i.test(g) ? d = ce.FIREFOX : (/MSIE/i.test(g) || !!document.documentMode) && (d = ce.IE), Me.cachedResult = d, Me.cachedResult;
}
function yt(d, g) {
  const w = Me(), i = Kt[w];
  let e = d, t = g, c = e * t;
  const a = e > t ? t / e : e / t;
  for (; c > i * i; ) {
    const m = (i + e) / 2, E = (i + t) / 2;
    m < E ? (t = E, e = E * a) : (t = m * a, e = m), c = e * t;
  }
  return { width: e, height: t };
}
function Ke(d, g) {
  let w, i;
  try {
    if (w = new OffscreenCanvas(d, g), i = w.getContext("2d"), i === null)
      throw new Error("getContext of OffscreenCanvas returns null");
  } catch {
    w = document.createElement("canvas"), i = w.getContext("2d");
  }
  return w.width = d, w.height = g, [w, i];
}
function Ut(d, g) {
  const { width: w, height: i } = yt(d.width, d.height), [e, t] = Ke(w, i);
  return g && /jpe?g/.test(g) && (t.fillStyle = "white", t.fillRect(0, 0, e.width, e.height)), t.drawImage(d, 0, 0, e.width, e.height), e;
}
function Qe() {
  return Qe.cachedResult !== void 0 || (Qe.cachedResult = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && typeof document < "u" && "ontouchend" in document), Qe.cachedResult;
}
function je(d, g = {}) {
  return new Promise(function(w, i) {
    let e, t;
    var c = function() {
      try {
        return t = Ut(e, g.fileType || d.type), w([e, t]);
      } catch (m) {
        return i(m);
      }
    }, a = function(m) {
      try {
        var E = function(r) {
          try {
            throw r;
          } catch (o) {
            return i(o);
          }
        };
        try {
          let r;
          return bt(d).then(function(o) {
            try {
              return r = o, wt(r).then(function(n) {
                try {
                  return e = n, function() {
                    try {
                      return c();
                    } catch (s) {
                      return i(s);
                    }
                  }();
                } catch (s) {
                  return E(s);
                }
              }, E);
            } catch (n) {
              return E(n);
            }
          }, E);
        } catch (r) {
          E(r);
        }
      } catch (r) {
        return i(r);
      }
    };
    try {
      if (Qe() || [ce.DESKTOP_SAFARI, ce.MOBILE_SAFARI].includes(Me()))
        throw new Error("Skip createImageBitmap on IOS and Safari");
      return createImageBitmap(d).then(function(m) {
        try {
          return e = m, c();
        } catch {
          return a();
        }
      }, a);
    } catch {
      a();
    }
  });
}
function Ge(d, g, w, i, e = 1) {
  return new Promise(function(t, c) {
    let a;
    if (g === "image/png") {
      let o, n, s;
      return o = d.getContext("2d"), { data: n } = o.getImageData(0, 0, d.width, d.height), s = ge.encode([n.buffer], d.width, d.height, 4096 * e), a = new Blob([s], { type: g }), a.name = w, a.lastModified = i, m.call(this);
    }
    {
      let o = function() {
        return m.call(this);
      };
      var E = o;
      if (g === "image/bmp")
        return new Promise((n) => mt.toBlob(d, n)).then(function(n) {
          try {
            return a = n, a.name = w, a.lastModified = i, o.call(this);
          } catch (s) {
            return c(s);
          }
        }.bind(this), c);
      {
        let n = function() {
          return o.call(this);
        };
        var r = n;
        if (typeof OffscreenCanvas == "function" && d instanceof OffscreenCanvas)
          return d.convertToBlob({ type: g, quality: e }).then(function(s) {
            try {
              return a = s, a.name = w, a.lastModified = i, n.call(this);
            } catch (p) {
              return c(p);
            }
          }.bind(this), c);
        {
          let s;
          return s = d.toDataURL(g, e), tt(s, w, i).then(function(p) {
            try {
              return a = p, n.call(this);
            } catch (F) {
              return c(F);
            }
          }.bind(this), c);
        }
      }
    }
    function m() {
      return t(a);
    }
  });
}
function ve(d) {
  d.width = 0, d.height = 0;
}
function He() {
  return new Promise(function(d, g) {
    let w, i, e, t;
    return He.cachedResult !== void 0 ? d(He.cachedResult) : tt("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==", "test.jpg", Date.now()).then(function(c) {
      try {
        return w = c, je(w).then(function(a) {
          try {
            return i = a[1], Ge(i, w.type, w.name, w.lastModified).then(function(m) {
              try {
                return e = m, ve(i), je(e).then(function(E) {
                  try {
                    return t = E[0], He.cachedResult = t.width === 1 && t.height === 2, d(He.cachedResult);
                  } catch (r) {
                    return g(r);
                  }
                }, g);
              } catch (E) {
                return g(E);
              }
            }, g);
          } catch (m) {
            return g(m);
          }
        }, g);
      } catch (a) {
        return g(a);
      }
    }, g);
  });
}
function Et(d) {
  return new Promise((g, w) => {
    const i = new At();
    i.onload = (e) => {
      const t = new DataView(e.target.result);
      if (t.getUint16(0, !1) != 65496)
        return g(-2);
      const c = t.byteLength;
      let a = 2;
      for (; a < c; ) {
        if (t.getUint16(a + 2, !1) <= 8)
          return g(-1);
        const m = t.getUint16(a, !1);
        if (a += 2, m == 65505) {
          if (t.getUint32(a += 2, !1) != 1165519206)
            return g(-1);
          const E = t.getUint16(a += 6, !1) == 18761;
          a += t.getUint32(a + 4, E);
          const r = t.getUint16(a, E);
          a += 2;
          for (let o = 0; o < r; o++)
            if (t.getUint16(a + 12 * o, E) == 274)
              return g(t.getUint16(a + 12 * o + 8, E));
        } else {
          if ((65280 & m) != 65280)
            break;
          a += t.getUint16(a, !1);
        }
      }
      return g(-1);
    }, i.onerror = (e) => w(e), i.readAsArrayBuffer(d);
  });
}
function Ct(d, g) {
  const { width: w } = d, { height: i } = d, { maxWidthOrHeight: e } = g;
  let t, c = d;
  return isFinite(e) && (w > e || i > e) && ([c, t] = Ke(w, i), w > i ? (c.width = e, c.height = i / w * e) : (c.width = w / i * e, c.height = e), t.drawImage(d, 0, 0, c.width, c.height), ve(d)), c;
}
function Ft(d, g) {
  const { width: w } = d, { height: i } = d, [e, t] = Ke(w, i);
  switch (g > 4 && g < 9 ? (e.width = i, e.height = w) : (e.width = w, e.height = i), g) {
    case 2:
      t.transform(-1, 0, 0, 1, w, 0);
      break;
    case 3:
      t.transform(-1, 0, 0, -1, w, i);
      break;
    case 4:
      t.transform(1, 0, 0, -1, 0, i);
      break;
    case 5:
      t.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      t.transform(0, 1, -1, 0, i, 0);
      break;
    case 7:
      t.transform(0, -1, -1, 0, i, w);
      break;
    case 8:
      t.transform(0, -1, 1, 0, 0, w);
  }
  return t.drawImage(d, 0, 0, w, i), ve(d), e;
}
function st(d, g, w = 0) {
  return new Promise(function(i, e) {
    let t, c, a, m, E, r, o, n, s, p, F, T, y, O, H, M, P, v, k, u;
    function l(C = 5) {
      if (g.signal && g.signal.aborted)
        throw g.signal.reason;
      t += C, g.onProgress(Math.min(t, 100));
    }
    function b(C) {
      if (g.signal && g.signal.aborted)
        throw g.signal.reason;
      t = Math.min(Math.max(C, t), 100), g.onProgress(t);
    }
    return t = w, c = g.maxIteration || 10, a = 1024 * g.maxSizeMB * 1024, l(), je(d, g).then(function(C) {
      try {
        return [, m] = C, l(), E = Ct(m, g), l(), new Promise(function(U, I) {
          var A;
          if (!(A = g.exifOrientation))
            return Et(d).then(function(h) {
              try {
                return A = h, S.call(this);
              } catch (f) {
                return I(f);
              }
            }.bind(this), I);
          function S() {
            return U(A);
          }
          return S.call(this);
        }).then(function(U) {
          try {
            return r = U, l(), He().then(function(I) {
              try {
                return o = I ? E : Ft(E, r), l(), n = g.initialQuality || 1, s = g.fileType || d.type, Ge(o, s, d.name, d.lastModified, n).then(function(A) {
                  try {
                    {
                      let D = function() {
                        if (c-- && (H > a || H > y)) {
                          let x, Q;
                          return x = u ? 0.95 * k.width : k.width, Q = u ? 0.95 * k.height : k.height, [P, v] = Ke(x, Q), v.drawImage(k, 0, 0, x, Q), n *= s === "image/png" ? 0.85 : 0.95, Ge(P, s, d.name, d.lastModified, n).then(function(B) {
                            try {
                              return M = B, ve(k), k = P, H = M.size, b(Math.min(99, Math.floor((O - H) / (O - a) * 100))), D;
                            } catch (N) {
                              return e(N);
                            }
                          }, e);
                        }
                        return [1];
                      }, _ = function() {
                        return ve(k), ve(P), ve(E), ve(o), ve(m), b(100), i(M);
                      };
                      var h = D, f = _;
                      if (p = A, l(), F = p.size > a, T = p.size > d.size, !F && !T)
                        return b(100), i(p);
                      var S;
                      return y = d.size, O = p.size, H = O, k = o, u = !g.alwaysKeepResolution && F, (S = function(x) {
                        for (; x; ) {
                          if (x.then)
                            return void x.then(S, e);
                          try {
                            if (x.pop) {
                              if (x.length)
                                return x.pop() ? _.call(this) : x;
                              x = D;
                            } else
                              x = x.call(this);
                          } catch (Q) {
                            return e(Q);
                          }
                        }
                      }.bind(this))(D);
                    }
                  } catch (D) {
                    return e(D);
                  }
                }.bind(this), e);
              } catch (A) {
                return e(A);
              }
            }.bind(this), e);
          } catch (I) {
            return e(I);
          }
        }.bind(this), e);
      } catch (U) {
        return e(U);
      }
    }.bind(this), e);
  });
}
const Yt = `
let scriptImported = false
self.addEventListener('message', async (e) => {
  const { file, id, imageCompressionLibUrl, options } = e.data
  options.onProgress = (progress) => self.postMessage({ progress, id })
  try {
    if (!scriptImported) {
      // console.log('[worker] importScripts', imageCompressionLibUrl)
      self.importScripts(imageCompressionLibUrl)
      scriptImported = true
    }
    // console.log('[worker] self', self)
    const compressedFile = await imageCompression(file, options)
    self.postMessage({ file: compressedFile, id })
  } catch (e) {
    // console.error('[worker] error', e)
    self.postMessage({ error: e.message + '\\n' + e.stack, id })
  }
})
`;
let Xe;
function Xt(d, g) {
  return new Promise((w, i) => {
    Xe || (Xe = function(c) {
      const a = [];
      return typeof c == "function" ? a.push(`(${c})()`) : a.push(c), URL.createObjectURL(new Blob(a));
    }(Yt));
    const e = new Worker(Xe);
    e.addEventListener("message", function(c) {
      if (g.signal && g.signal.aborted)
        e.terminate();
      else if (c.data.progress === void 0) {
        if (c.data.error)
          return i(new Error(c.data.error)), void e.terminate();
        w(c.data.file), e.terminate();
      } else
        g.onProgress(c.data.progress);
    }), e.addEventListener("error", i), g.signal && g.signal.addEventListener("abort", () => {
      i(g.signal.reason), e.terminate();
    }), e.postMessage({ file: d, imageCompressionLibUrl: g.libURL, options: { ...g, onProgress: void 0, signal: void 0 } });
  });
}
function ie(d, g) {
  return new Promise(function(w, i) {
    let e, t, c, a, m, E;
    if (e = { ...g }, c = 0, { onProgress: a } = e, e.maxSizeMB = e.maxSizeMB || Number.POSITIVE_INFINITY, m = typeof e.useWebWorker != "boolean" || e.useWebWorker, delete e.useWebWorker, e.onProgress = (s) => {
      c = s, typeof a == "function" && a(c);
    }, !(d instanceof Blob || d instanceof Zt))
      return i(new Error("The file given is not an instance of Blob or File"));
    if (!/^image/.test(d.type))
      return i(new Error("The file given is not an image"));
    if (E = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope, !m || typeof Worker != "function" || E)
      return st(d, e).then(function(s) {
        try {
          return t = s, n.call(this);
        } catch (p) {
          return i(p);
        }
      }.bind(this), i);
    var r = function() {
      try {
        return n.call(this);
      } catch (s) {
        return i(s);
      }
    }.bind(this), o = function(s) {
      try {
        return st(d, e).then(function(p) {
          try {
            return t = p, r();
          } catch (F) {
            return i(F);
          }
        }, i);
      } catch (p) {
        return i(p);
      }
    };
    try {
      return e.libURL = e.libURL || "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js", Xt(d, e).then(function(s) {
        try {
          return t = s, r();
        } catch {
          return o();
        }
      }, o);
    } catch {
      o();
    }
    function n() {
      try {
        t.name = d.name, t.lastModified = d.lastModified;
      } catch {
      }
      try {
        e.preserveExif && d.type === "image/jpeg" && (!e.fileType || e.fileType && e.fileType === d.type) && (t = pt(d, t));
      } catch {
      }
      return w(t);
    }
  });
}
ie.getDataUrlFromFile = bt, ie.getFilefromDataUrl = tt, ie.loadImage = wt, ie.drawImageInCanvas = Ut, ie.drawFileInCanvas = je, ie.canvasToFile = Ge, ie.getExifOrientation = Et, ie.handleMaxWidthOrHeight = Ct, ie.followExifOrientation = Ft, ie.cleanupCanvasMemory = ve, ie.isAutoOrientationInBrowser = He, ie.approximateBelowMaximumCanvasSizeOfBrowser = yt, ie.copyExifWithoutOrientation = pt, ie.getBrowserName = Me, ie.version = "2.0.2";
const ft = (d, g) => {
  if (!g) {
    Lt(d, "disabled", !0);
    return;
  }
  Bt(d, "disabled"), Nt(d);
}, ct = (d, g) => {
  const w = "ci-spinner", i = fe(`#${w}`, d);
  if (!g && i[0]) {
    Ve(i);
    return;
  }
  if (g && !i[0]) {
    const e = Re(`<div id="${w}"></div>`);
    _e(d, e);
  }
}, nt = (d) => {
  const g = ke() ? ".chat-form" : "#chat-form", w = fe(g, d), i = fe("#chat-message", d);
  return {
    on() {
      ft(i, !1), ct(w, !0);
    },
    off() {
      ft(i, !0), ct(w, !1);
    }
  };
}, It = async (d) => {
  const g = d || rt("uploadLocation");
  try {
    (await Ne().browse(Be, g)).target === "." && await Ne().createDirectory(Be, g, {});
  } catch {
    try {
      await Ne().createDirectory(Be, g, {});
    } catch {
    }
  }
}, Jt = (d, g) => game.settings.set("chat-images", d, g), Vt = () => [
  {
    key: "uploadButton",
    options: {
      name: Ae("uploadButton"),
      hint: Ae("uploadButtonHint"),
      type: Boolean,
      default: !0,
      config: !0,
      requiresReload: !0
    }
  },
  {
    key: "uploadLocation",
    options: {
      name: Ae("uploadLocation"),
      hint: Ae("uploadLocationHint"),
      type: String,
      default: "uploaded-chat-images",
      scope: "world",
      config: !0,
      restricted: !0,
      onChange: async (d) => {
        const g = "uploaded-chat-images";
        let w = d.trim(), i = !1;
        w || (w = g, i = !0), w = w.replace(/\s+/g, "-"), d !== w && (i = !0), await It(w), i && await Jt("uploadLocation", w);
      }
    }
  }
], en = (d) => game.settings.register("chat-images", d.key, d.options), rt = (d) => game.settings.get("chat-images", d), tn = ["static.wikia"], nn = new DOMParser();
let Te = [];
const St = (d) => d.type && d.type.startsWith("image/"), rn = ({ imageSrc: d, id: g }) => Re(
  `<div id="${g}" class="ci-upload-area-image">
            <i class="ci-remove-image-icon fa-regular fa-circle-xmark"></i>
            <img class="ci-image-preview" src="${d}" alt="${Ae("unableToLoadImage")}"/>
        </div>`
), on = (d, g, w) => {
  Pe(d, "click", () => {
    const e = fe(`#${g.id}`, w);
    Ve(e), Te = Te.filter((t) => g.id !== t.id), !Te.length && Je(w, "hidden");
  });
}, an = async (d) => {
  const g = (w) => {
    const { type: i, name: e, id: t } = w, c = (e == null ? void 0 : e.substring(e.lastIndexOf("."), e.length)) || (i == null ? void 0 : i.replace("image/", ".")) || ".jpeg";
    return `${t}${c}`;
  };
  try {
    const w = g(d), i = await ie(d.file, { maxSizeMB: 1.5, useWebWorker: !0, alwaysKeepResolution: !0 }), e = new File([i], w, { type: d.type }), t = rt("uploadLocation"), c = await Ne().upload(Be, t, e, {}, { notify: !1 });
    return !c || !(c != null && c.path) ? d.imageSrc : c == null ? void 0 : c.path;
  } catch {
    return d.imageSrc;
  }
}, _t = async (d, g) => {
  const w = nt(g);
  w.on();
  const i = fe("#ci-chat-upload-area", g);
  if (!i || !i[0])
    return;
  if (d.file) {
    if (!gt()) {
      w.off();
      return;
    }
    d.imageSrc = await an(d);
  }
  const e = rn(d);
  if (!e || !e[0])
    return;
  Ot(i, "hidden"), _e(i, e), Te.push(d);
  const t = fe(".ci-remove-image-icon", e);
  on(t, d, i), w.off();
}, sn = (d, g) => async (w) => {
  var t;
  const i = (t = w.target) == null ? void 0 : t.result, e = { type: d.type, name: d.name, imageSrc: i, id: ht(), file: d };
  await _t(e, g);
}, Mt = (d, g) => {
  for (let w = 0; w < d.length; w++) {
    const i = d[w];
    if (!St(i))
      continue;
    const e = new FileReader();
    e.addEventListener("load", sn(i, g)), e.readAsDataURL(i);
  }
}, fn = (d, g) => {
  const w = (a) => {
    const m = a.getData("text/html");
    if (!m)
      return null;
    const E = nn.parseFromString(m, "text/html").querySelectorAll("img");
    if (!E || !E.length)
      return null;
    const r = [...E].map((n) => n.src);
    return r.some((n) => tn.some((s) => n.includes(s))) ? null : r;
  }, i = async (a) => {
    for (let m = 0; m < a.length; m++) {
      const r = { imageSrc: a[m], id: ht() };
      await _t(r, g);
    }
  }, e = w(d);
  if (e && e.length)
    return i(e);
  const c = ((a) => {
    const m = a.items, E = [];
    for (let r = 0; r < m.length; r++) {
      const o = m[r];
      if (!St(o))
        continue;
      const n = o.getAsFile();
      !n || E.push(n);
    }
    return E;
  })(d);
  if (c && c.length)
    return Mt(c, g);
}, Tt = () => Te, Rt = (d) => {
  for (; Te.length; ) {
    const w = Te.pop();
    if (!w)
      continue;
    const i = fe(`#${w.id}`, d);
    Ve(i);
  }
  const g = fe("#ci-chat-upload-area", d);
  Je(g, "hidden");
}, cn = () => Re(`<a id="ci-upload-image" title="${Ae("uploadButtonTitle")}"><i class="fas fa-images"></i></a>`), ln = () => Re('<input type="file" multiple accept="image/*" id="ci-upload-image-hidden-input">'), un = (d, g, w) => {
  const i = (t) => {
    const c = t.currentTarget, a = c.files;
    !a || (Mt(a, w), c.value = "");
  }, e = (t) => {
    t.preventDefault(), Dt(g, "click");
  };
  Pe(g, "change", i), Pe(d, "click", e);
}, dn = (d) => {
  if (!rt("uploadButton"))
    return;
  const g = fe(".control-buttons", d), w = cn(), i = ln();
  if (!!gt(!0)) {
    if (g[0])
      Je(g, "ci-control-buttons-gm"), _e(g, w), _e(g, i);
    else {
      const e = fe("#chat-controls", d), t = Re('<div class="ci-control-buttons-p"></div>');
      _e(t, w), _e(t, i), _e(e, t);
    }
    un(w, i, d);
  }
};
let ze = !1, $e = !1;
const hn = (d) => `<div class="ci-message-image"><img src="${d.imageSrc}" alt="${d.name || Ae("unableToLoadImage")}"></div>`, kt = (d) => `<div class="ci-message">${d.map((w) => hn(w)).join("")}</div>`, gn = (d) => (g, w, i) => {
  if ($e)
    return;
  ze = !0;
  const e = Tt();
  if (!e.length) {
    ze = !1;
    return;
  }
  const t = nt(d);
  t.on();
  const c = `${kt(e)}<div class="ci-notes">${g.content}</div>`;
  g.content = c, g._source.content = c, i.chatBubble = !1, Rt(d), ze = !1, t.off();
}, pn = (d) => async (g) => {
  if (ze || g.code !== "Enter" && g.code !== "NumpadEnter" || g.shiftKey)
    return;
  $e = !0;
  const w = nt(d), i = Tt();
  if (!i.length) {
    $e = !1;
    return;
  }
  w.on();
  const e = ke() ? CONST.CHAT_MESSAGE_STYLES.OOC : CONST.CHAT_MESSAGE_TYPES.OOC, t = {
    content: kt(i),
    type: typeof e < "u" ? e : 1,
    user: game.user
  };
  await ChatMessage.create(t), Rt(d), w.off(), $e = !1;
}, mn = (d) => (g) => {
  const w = g.originalEvent, i = w.clipboardData || w.dataTransfer;
  !i || fn(i, d);
}, vn = (d) => !!fe("#ci-chat-upload-area", d).length, lt = (d) => {
  Hooks.on("preCreateChatMessage", gn(d)), Pe(d, "keyup", pn(d)), Pe(d, "paste drop", mn(d));
}, ut = (d) => {
  const g = fe(".ci-message-image img", d);
  if (!g[0])
    return;
  Pe(g, "click", (i) => {
    const e = i.target.src, t = zt();
    ke() ? new t({ src: e, editable: !1, shareable: !0 }).render(!0) : new t(e, { editable: !1, shareable: !0 }).render(!0);
  });
}, dt = /!\s*ci\s*\|\s*(.+?)\s*!/gi, An = /\w+\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)/gi, bn = (d) => `<div class="ci-message-image"><img src="${d}" alt="${Ae("unableToLoadImage")}"></div>`, wn = (d) => d.match(dt) ? d.replaceAll(dt, (g, w) => w.match(An) ? bn(w) : g) : d, yn = () => {
  Vt().forEach((g) => en(g));
};
Hooks.once("init", async () => {
  CONFIG.debug.hooks = !0, yn(), Un(), await It();
});
const Un = () => {
  if (ke()) {
    Hooks.on("renderChatMessageHTML", (g, w) => {
      const i = Re(w);
      !fe(".ci-message-image", i)[0] || ut(i);
    });
    const d = (g) => {
      vn(g) || (at(g), lt(g));
    };
    Hooks.on("collapseSidebar", (g, w) => {
      if (!g || w)
        return;
      const i = g.element;
      if (!i || !i.querySelector("#chat-message"))
        return;
      const t = $(i);
      d(t);
    }), Hooks.on("activateChatLog", (g) => {
      if (!g)
        return;
      const w = g.element;
      if (!w || !w.querySelector("#chat-message"))
        return;
      const e = $(w);
      d(e);
    });
  } else
    Hooks.on("renderChatMessage", (d, g) => {
      !fe(".ci-message-image", g)[0] || ut(g);
    }), Hooks.on("renderSidebarTab", (d, g) => {
      const w = g[0];
      !w || !w.querySelector("#chat-message") || (at(g), dn(g), lt(g));
    });
  Hooks.on("preCreateChatMessage", (d, g, w) => {
    const i = wn(d.content);
    d.content !== i && (d.content = i, d._source.content = i, w.chatBubble = !1);
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1pbWFnZXMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9zY3JpcHRzL3V0aWxzL0pxdWVyeVdyYXBwZXJzLnRzIiwiLi4vc3JjL3NjcmlwdHMvdXRpbHMvVXRpbHMudHMiLCIuLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1VwbG9hZEFyZWEudHMiLCIuLi9ub2RlX21vZHVsZXMvYnJvd3Nlci1pbWFnZS1jb21wcmVzc2lvbi9kaXN0L2Jyb3dzZXItaW1hZ2UtY29tcHJlc3Npb24ubWpzIiwiLi4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Mb2FkZXIudHMiLCIuLi9zcmMvc2NyaXB0cy91dGlscy9TZXR0aW5ncy50cyIsIi4uL3NyYy9zY3JpcHRzL3Byb2Nlc3NvcnMvRmlsZVByb2Nlc3Nvci50cyIsIi4uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvVXBsb2FkQnV0dG9uLnRzIiwiLi4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9DaGF0U2lkZWJhci50cyIsIi4uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQ2hhdE1lc3NhZ2UudHMiLCIuLi9zcmMvc2NyaXB0cy9wcm9jZXNzb3JzL01lc3NhZ2VQcm9jZXNzb3IudHMiLCIuLi9zcmMvY2hhdC1pbWFnZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxyXG5leHBvcnQgY29uc3QgY3JlYXRlID0gKGh0bWw6IHN0cmluZyB8IEhUTUxFbGVtZW50KTogSlF1ZXJ5ID0+ICQoaHRtbClcclxuZXhwb3J0IGNvbnN0IGJlZm9yZSA9IChyZWZlcmVuY2VOb2RlOiBKUXVlcnksIG5ld05vZGU6IEpRdWVyeSk6IEpRdWVyeSA9PiByZWZlcmVuY2VOb2RlLmJlZm9yZShuZXdOb2RlKVxyXG5leHBvcnQgY29uc3QgYWZ0ZXIgPSAocmVmZXJlbmNlTm9kZTogSlF1ZXJ5LCBuZXdOb2RlOiBKUXVlcnkpOiBKUXVlcnkgPT4gcmVmZXJlbmNlTm9kZS5hZnRlcihuZXdOb2RlKVxyXG5leHBvcnQgY29uc3QgZmluZCA9IChzZWxlY3Rvcjogc3RyaW5nLCBwYXJlbnROb2RlPzogSlF1ZXJ5KTogSlF1ZXJ5ID0+IHBhcmVudE5vZGUgPyBwYXJlbnROb2RlLmZpbmQoc2VsZWN0b3IpIDogJChzZWxlY3RvcilcclxuZXhwb3J0IGNvbnN0IGFwcGVuZCA9IChwYXJlbnROb2RlOiBKUXVlcnksIG5ld05vZGU6IEpRdWVyeSk6IEpRdWVyeSA9PiBwYXJlbnROb2RlLmFwcGVuZChuZXdOb2RlKVxyXG4vLyBAdHMtaWdub3JlXHJcbmV4cG9ydCBjb25zdCBvbiA9IChwYXJlbnROb2RlOiBKUXVlcnksIGV2ZW50VHlwZTogc3RyaW5nLCBldmVudEZ1bmN0aW9uOiBGdW5jdGlvbik6IEpRdWVyeSA9PiBwYXJlbnROb2RlLm9uKGV2ZW50VHlwZSwgZXZlbnRGdW5jdGlvbilcclxuZXhwb3J0IGNvbnN0IHRyaWdnZXIgPSAocGFyZW50Tm9kZTogSlF1ZXJ5LCBldmVudFR5cGU6IHN0cmluZyk6IEpRdWVyeSA9PiBwYXJlbnROb2RlLnRyaWdnZXIoZXZlbnRUeXBlKVxyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSAocGFyZW50Tm9kZTogSlF1ZXJ5LCBjbGFzc1N0cmluZzogc3RyaW5nKTogSlF1ZXJ5ID0+IHBhcmVudE5vZGUucmVtb3ZlQ2xhc3MoY2xhc3NTdHJpbmcpXHJcbmV4cG9ydCBjb25zdCBhZGRDbGFzcyA9IChwYXJlbnROb2RlOiBKUXVlcnksIGNsYXNzU3RyaW5nOiBzdHJpbmcpOiBKUXVlcnkgPT4gcGFyZW50Tm9kZS5hZGRDbGFzcyhjbGFzc1N0cmluZylcclxuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChub2RlOiBKUXVlcnkpOiBKUXVlcnkgPT4gbm9kZS5yZW1vdmUoKVxyXG5leHBvcnQgY29uc3QgYXR0ciA9IChub2RlOiBKUXVlcnksIGF0dHJJZDogc3RyaW5nLCBhdHRyVmFsdWU/OiBhbnkpOiBzdHJpbmcgfCBKUXVlcnkgfCB1bmRlZmluZWQgPT4gYXR0clZhbHVlID8gbm9kZS5hdHRyKGF0dHJJZCwgYXR0clZhbHVlKSA6IG5vZGUuYXR0cihhdHRySWQpXHJcbmV4cG9ydCBjb25zdCByZW1vdmVBdHRyID0gKG5vZGU6IEpRdWVyeSwgYXR0cklkOiBzdHJpbmcpOiBKUXVlcnkgPT4gbm9kZS5yZW1vdmVBdHRyKGF0dHJJZClcclxuZXhwb3J0IGNvbnN0IGZvY3VzID0gKG5vZGU6IEpRdWVyeSk6IEpRdWVyeSA9PiBub2RlLmZvY3VzKClcclxuZXhwb3J0IGNvbnN0IHNjcm9sbEJvdHRvbSA9IChub2RlOiBKUXVlcnkpOiBKUXVlcnkgPT4gbm9kZS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBub2RlLmhlaWdodCgpIH0pXHJcbi8vIEB0cy1pZ25vcmVcclxuZXhwb3J0IGNvbnN0IGVhY2ggPSAobm9kZTogSlF1ZXJ5LCBoYW5kbGVyOiBGdW5jdGlvbik6IEpRdWVyeSA9PiBub2RlLmVhY2goaGFuZGxlcikiLCJleHBvcnQgY29uc3QgT1JJR0lOX0ZPTERFUiA9ICdkYXRhJ1xyXG5leHBvcnQgY29uc3QgdCA9ICh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcgPT4gKGdhbWUgYXMgR2FtZSk/LmkxOG4/LmxvY2FsaXplKGBDSS4ke3RleHR9YCkgfHwgJydcclxuZXhwb3J0IGNvbnN0IHJhbmRvbVN0cmluZyA9ICgpOiBzdHJpbmcgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDE1KSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAxNSlcclxuZXhwb3J0IGNvbnN0IHVzZXJDYW5VcGxvYWQgPSAoc2lsZW50ID0gZmFsc2UpOiBib29sZWFuID0+IHtcclxuICBjb25zdCB1c2VyUm9sZSA9IChnYW1lIGFzIEdhbWUpPy51c2VyPy5yb2xlXHJcbiAgY29uc3QgZmlsZVVwbG9hZFBlcm1pc3Npb25zID0gKGdhbWUgYXMgR2FtZSk/LnBlcm1pc3Npb25zPy5GSUxFU19VUExPQURcclxuXHJcbiAgaWYgKCF1c2VyUm9sZSB8fCAhZmlsZVVwbG9hZFBlcm1pc3Npb25zKSB7XHJcbiAgICBpZiAoIXNpbGVudCkgdWkubm90aWZpY2F0aW9ucz8ud2Fybih0KCd1cGxvYWRQZXJtaXNzaW9ucycpKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBjb25zdCB1cGxvYWRQZXJtaXNzaW9uID0gZmlsZVVwbG9hZFBlcm1pc3Npb25zLmluY2x1ZGVzKHVzZXJSb2xlKVxyXG4gIGlmICghdXBsb2FkUGVybWlzc2lvbiAmJiAhc2lsZW50KSB1aS5ub3RpZmljYXRpb25zPy53YXJuKHQoJ3VwbG9hZFBlcm1pc3Npb25zJykpXHJcblxyXG4gIHJldHVybiB1cGxvYWRQZXJtaXNzaW9uXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGb3VuZHJ5VmVyc2lvbiA9ICgpID0+IChnYW1lIGFzIEdhbWUpPy52ZXJzaW9uXHJcblxyXG5leHBvcnQgY29uc3QgaXNWZXJpb3NuQWZ0ZXIxMyA9ICgpID0+IE51bWJlcihnZXRGb3VuZHJ5VmVyc2lvbigpKSA+PSAxM1xyXG5cclxuZXhwb3J0IGNvbnN0IEZpbGVQaWNrZXJJbXBsZW1lbnRhdGlvbiA9ICgpID0+IGlzVmVyaW9zbkFmdGVyMTMoKVxyXG4gID8gZm91bmRyeS5hcHBsaWNhdGlvbnMuYXBwcy5GaWxlUGlja2VyLmltcGxlbWVudGF0aW9uXHJcbiAgOiBGaWxlUGlja2VyXHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2VQb3BvdXRJbXBsZW1lbnRhdGlvbiA9ICgpID0+IGlzVmVyaW9zbkFmdGVyMTMoKVxyXG4gID8gZm91bmRyeS5hcHBsaWNhdGlvbnMuYXBwcy5JbWFnZVBvcG91dFxyXG4gIDogSW1hZ2VQb3BvdXQiLCJpbXBvcnQgeyBiZWZvcmUsIGNyZWF0ZSwgZmluZCB9IGZyb20gJy4uL3V0aWxzL0pxdWVyeVdyYXBwZXJzJ1xyXG5pbXBvcnQgeyBpc1Zlcmlvc25BZnRlcjEzIH0gZnJvbSAnLi4vdXRpbHMvVXRpbHMnXHJcblxyXG5jb25zdCBjcmVhdGVVcGxvYWRBcmVhID0gKCk6IEpRdWVyeSA9PiBjcmVhdGUoYDxkaXYgaWQ9XCJjaS1jaGF0LXVwbG9hZC1hcmVhXCIgY2xhc3M9XCJoaWRkZW5cIj48L2Rpdj5gKVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRVcGxvYWRBcmVhID0gKHNpZGViYXI6IEpRdWVyeSkgPT4ge1xyXG4gIGNvbnN0IGNoYXRDb250cm9sc1NlbGVjdG9yID0gaXNWZXJpb3NuQWZ0ZXIxMygpID8gJy5jaGF0LWNvbnRyb2xzJyA6ICcjY2hhdC1jb250cm9scydcclxuXHJcbiAgY29uc3QgY2hhdENvbnRyb2xzOiBKUXVlcnkgPSBmaW5kKGNoYXRDb250cm9sc1NlbGVjdG9yLCBzaWRlYmFyKVxyXG4gIGNvbnN0IHVwbG9hZEFyZWE6IEpRdWVyeSA9IGNyZWF0ZVVwbG9hZEFyZWEoKVxyXG4gIGJlZm9yZShjaGF0Q29udHJvbHMsIHVwbG9hZEFyZWEpXHJcbn1cclxuIiwiLyoqXG4gKiBCcm93c2VyIEltYWdlIENvbXByZXNzaW9uXG4gKiB2Mi4wLjJcbiAqIGJ5IERvbmFsZCA8ZG9uYWxkY3dsQGdtYWlsLmNvbT5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9Eb25hbGRjd2wvYnJvd3Nlci1pbWFnZS1jb21wcmVzc2lvblxuICovXG5cbmZ1bmN0aW9uIF9tZXJnZU5hbWVzcGFjZXMoZSx0KXtyZXR1cm4gdC5mb3JFYWNoKChmdW5jdGlvbih0KXt0JiZcInN0cmluZ1wiIT10eXBlb2YgdCYmIUFycmF5LmlzQXJyYXkodCkmJk9iamVjdC5rZXlzKHQpLmZvckVhY2goKGZ1bmN0aW9uKHIpe2lmKFwiZGVmYXVsdFwiIT09ciYmIShyIGluIGUpKXt2YXIgaT1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQscik7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUscixpLmdldD9pOntlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB0W3JdfX0pfX0pKX0pKSxPYmplY3QuZnJlZXplKGUpfWZ1bmN0aW9uIGNvcHlFeGlmV2l0aG91dE9yaWVudGF0aW9uKGUsdCl7cmV0dXJuIG5ldyBQcm9taXNlKChmdW5jdGlvbihyLGkpe2xldCBvO3JldHVybiBnZXRBcHAxU2VnbWVudChlKS50aGVuKChmdW5jdGlvbihlKXt0cnl7cmV0dXJuIG89ZSxyKG5ldyBCbG9iKFt0LnNsaWNlKDAsMiksbyx0LnNsaWNlKDIpXSx7dHlwZTpcImltYWdlL2pwZWdcIn0pKX1jYXRjaChlKXtyZXR1cm4gaShlKX19KSxpKX0pKX1jb25zdCBnZXRBcHAxU2VnbWVudD1lPT5uZXcgUHJvbWlzZSgoKHQscik9Pntjb25zdCBpPW5ldyBGaWxlUmVhZGVyO2kuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoKHt0YXJnZXQ6e3Jlc3VsdDplfX0pPT57Y29uc3QgaT1uZXcgRGF0YVZpZXcoZSk7bGV0IG89MDtpZig2NTQ5NiE9PWkuZ2V0VWludDE2KG8pKXJldHVybiByKFwibm90IGEgdmFsaWQgSlBFR1wiKTtmb3Iobys9Mjs7KXtjb25zdCBhPWkuZ2V0VWludDE2KG8pO2lmKDY1NDk4PT09YSlicmVhaztjb25zdCBzPWkuZ2V0VWludDE2KG8rMik7aWYoNjU1MDU9PT1hJiYxMTY1NTE5MjA2PT09aS5nZXRVaW50MzIobys0KSl7Y29uc3QgYT1vKzEwO2xldCBmO3N3aXRjaChpLmdldFVpbnQxNihhKSl7Y2FzZSAxODc2MTpmPSEwO2JyZWFrO2Nhc2UgMTk3ODk6Zj0hMTticmVhaztkZWZhdWx0OnJldHVybiByKFwiVElGRiBoZWFkZXIgY29udGFpbnMgaW52YWxpZCBlbmRpYW5cIil9aWYoNDIhPT1pLmdldFVpbnQxNihhKzIsZikpcmV0dXJuIHIoXCJUSUZGIGhlYWRlciBjb250YWlucyBpbnZhbGlkIHZlcnNpb25cIik7Y29uc3QgbD1pLmdldFVpbnQzMihhKzQsZiksYz1hK2wrMisxMippLmdldFVpbnQxNihhK2wsZik7Zm9yKGxldCBlPWErbCsyO2U8YztlKz0xMil7aWYoMjc0PT1pLmdldFVpbnQxNihlLGYpKXtpZigzIT09aS5nZXRVaW50MTYoZSsyLGYpKXJldHVybiByKFwiT3JpZW50YXRpb24gZGF0YSB0eXBlIGlzIGludmFsaWRcIik7aWYoMSE9PWkuZ2V0VWludDMyKGUrNCxmKSlyZXR1cm4gcihcIk9yaWVudGF0aW9uIGRhdGEgY291bnQgaXMgaW52YWxpZFwiKTtpLnNldFVpbnQxNihlKzgsMSxmKTticmVha319cmV0dXJuIHQoZS5zbGljZShvLG8rMitzKSl9bys9MitzfXJldHVybiB0KG5ldyBCbG9iKX0pKSxpLnJlYWRBc0FycmF5QnVmZmVyKGUpfSkpO3ZhciBlPXt9LHQ9e2dldCBleHBvcnRzKCl7cmV0dXJuIGV9LHNldCBleHBvcnRzKHQpe2U9dH19OyFmdW5jdGlvbihlKXt2YXIgcixpLFVaSVA9e307dC5leHBvcnRzPVVaSVAsVVpJUC5wYXJzZT1mdW5jdGlvbihlLHQpe2Zvcih2YXIgcj1VWklQLmJpbi5yZWFkVXNob3J0LGk9VVpJUC5iaW4ucmVhZFVpbnQsbz0wLGE9e30scz1uZXcgVWludDhBcnJheShlKSxmPXMubGVuZ3RoLTQ7MTAxMDEwMjU2IT1pKHMsZik7KWYtLTtvPWY7bys9NDt2YXIgbD1yKHMsbys9NCk7cihzLG8rPTIpO3ZhciBjPWkocyxvKz0yKSx1PWkocyxvKz00KTtvKz00LG89dTtmb3IodmFyIGg9MDtoPGw7aCsrKXtpKHMsbyksbys9NCxvKz00LG8rPTQsaShzLG8rPTQpO2M9aShzLG8rPTQpO3ZhciBkPWkocyxvKz00KSxBPXIocyxvKz00KSxnPXIocyxvKzIpLHA9cihzLG8rNCk7bys9Njt2YXIgbT1pKHMsbys9OCk7bys9NCxvKz1BK2crcCxVWklQLl9yZWFkTG9jYWwocyxtLGEsYyxkLHQpfXJldHVybiBhfSxVWklQLl9yZWFkTG9jYWw9ZnVuY3Rpb24oZSx0LHIsaSxvLGEpe3ZhciBzPVVaSVAuYmluLnJlYWRVc2hvcnQsZj1VWklQLmJpbi5yZWFkVWludDtmKGUsdCkscyhlLHQrPTQpLHMoZSx0Kz0yKTt2YXIgbD1zKGUsdCs9Mik7ZihlLHQrPTIpLGYoZSx0Kz00KSx0Kz00O3ZhciBjPXMoZSx0Kz04KSx1PXMoZSx0Kz0yKTt0Kz0yO3ZhciBoPVVaSVAuYmluLnJlYWRVVEY4KGUsdCxjKTtpZih0Kz1jLHQrPXUsYSlyW2hdPXtzaXplOm8sY3NpemU6aX07ZWxzZXt2YXIgZD1uZXcgVWludDhBcnJheShlLmJ1ZmZlcix0KTtpZigwPT1sKXJbaF09bmV3IFVpbnQ4QXJyYXkoZC5idWZmZXIuc2xpY2UodCx0K2kpKTtlbHNle2lmKDghPWwpdGhyb3dcInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kOiBcIitsO3ZhciBBPW5ldyBVaW50OEFycmF5KG8pO1VaSVAuaW5mbGF0ZVJhdyhkLEEpLHJbaF09QX19fSxVWklQLmluZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gVVpJUC5GLmluZmxhdGUoZSx0KX0sVVpJUC5pbmZsYXRlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGVbMF0sZVsxXSxVWklQLmluZmxhdGVSYXcobmV3IFVpbnQ4QXJyYXkoZS5idWZmZXIsZS5ieXRlT2Zmc2V0KzIsZS5sZW5ndGgtNiksdCl9LFVaSVAuZGVmbGF0ZT1mdW5jdGlvbihlLHQpe251bGw9PXQmJih0PXtsZXZlbDo2fSk7dmFyIHI9MCxpPW5ldyBVaW50OEFycmF5KDUwK01hdGguZmxvb3IoMS4xKmUubGVuZ3RoKSk7aVtyXT0xMjAsaVtyKzFdPTE1NixyKz0yLHI9VVpJUC5GLmRlZmxhdGVSYXcoZSxpLHIsdC5sZXZlbCk7dmFyIG89VVpJUC5hZGxlcihlLDAsZS5sZW5ndGgpO3JldHVybiBpW3IrMF09bz4+PjI0JjI1NSxpW3IrMV09bz4+PjE2JjI1NSxpW3IrMl09bz4+PjgmMjU1LGlbciszXT1vPj4+MCYyNTUsbmV3IFVpbnQ4QXJyYXkoaS5idWZmZXIsMCxyKzQpfSxVWklQLmRlZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtudWxsPT10JiYodD17bGV2ZWw6Nn0pO3ZhciByPW5ldyBVaW50OEFycmF5KDUwK01hdGguZmxvb3IoMS4xKmUubGVuZ3RoKSksaT1VWklQLkYuZGVmbGF0ZVJhdyhlLHIsaSx0LmxldmVsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoci5idWZmZXIsMCxpKX0sVVpJUC5lbmNvZGU9ZnVuY3Rpb24oZSx0KXtudWxsPT10JiYodD0hMSk7dmFyIHI9MCxpPVVaSVAuYmluLndyaXRlVWludCxvPVVaSVAuYmluLndyaXRlVXNob3J0LGE9e307Zm9yKHZhciBzIGluIGUpe3ZhciBmPSFVWklQLl9ub05lZWQocykmJiF0LGw9ZVtzXSxjPVVaSVAuY3JjLmNyYyhsLDAsbC5sZW5ndGgpO2Fbc109e2NwcjpmLHVzaXplOmwubGVuZ3RoLGNyYzpjLGZpbGU6Zj9VWklQLmRlZmxhdGVSYXcobCk6bH19Zm9yKHZhciBzIGluIGEpcis9YVtzXS5maWxlLmxlbmd0aCszMCs0NisyKlVaSVAuYmluLnNpemVVVEY4KHMpO3IrPTIyO3ZhciB1PW5ldyBVaW50OEFycmF5KHIpLGg9MCxkPVtdO2Zvcih2YXIgcyBpbiBhKXt2YXIgQT1hW3NdO2QucHVzaChoKSxoPVVaSVAuX3dyaXRlSGVhZGVyKHUsaCxzLEEsMCl9dmFyIGc9MCxwPWg7Zm9yKHZhciBzIGluIGEpe0E9YVtzXTtkLnB1c2goaCksaD1VWklQLl93cml0ZUhlYWRlcih1LGgscyxBLDEsZFtnKytdKX12YXIgbT1oLXA7cmV0dXJuIGkodSxoLDEwMTAxMDI1NiksaCs9NCxvKHUsaCs9NCxnKSxvKHUsaCs9MixnKSxpKHUsaCs9MixtKSxpKHUsaCs9NCxwKSxoKz00LGgrPTIsdS5idWZmZXJ9LFVaSVAuX25vTmVlZD1mdW5jdGlvbihlKXt2YXIgdD1lLnNwbGl0KFwiLlwiKS5wb3AoKS50b0xvd2VyQ2FzZSgpO3JldHVybi0xIT1cInBuZyxqcGcsanBlZyx6aXBcIi5pbmRleE9mKHQpfSxVWklQLl93cml0ZUhlYWRlcj1mdW5jdGlvbihlLHQscixpLG8sYSl7dmFyIHM9VVpJUC5iaW4ud3JpdGVVaW50LGY9VVpJUC5iaW4ud3JpdGVVc2hvcnQsbD1pLmZpbGU7cmV0dXJuIHMoZSx0LDA9PW8/NjczMjQ3NTI6MzM2MzkyNDgpLHQrPTQsMT09byYmKHQrPTIpLGYoZSx0LDIwKSxmKGUsdCs9MiwwKSxmKGUsdCs9MixpLmNwcj84OjApLHMoZSx0Kz0yLDApLHMoZSx0Kz00LGkuY3JjKSxzKGUsdCs9NCxsLmxlbmd0aCkscyhlLHQrPTQsaS51c2l6ZSksZihlLHQrPTQsVVpJUC5iaW4uc2l6ZVVURjgocikpLGYoZSx0Kz0yLDApLHQrPTIsMT09byYmKHQrPTIsdCs9MixzKGUsdCs9NixhKSx0Kz00KSx0Kz1VWklQLmJpbi53cml0ZVVURjgoZSx0LHIpLDA9PW8mJihlLnNldChsLHQpLHQrPWwubGVuZ3RoKSx0fSxVWklQLmNyYz17dGFibGU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9bmV3IFVpbnQzMkFycmF5KDI1NiksdD0wO3Q8MjU2O3QrKyl7Zm9yKHZhciByPXQsaT0wO2k8ODtpKyspMSZyP3I9Mzk4ODI5MjM4NF5yPj4+MTpyPj4+PTE7ZVt0XT1yfXJldHVybiBlfSgpLHVwZGF0ZTpmdW5jdGlvbihlLHQscixpKXtmb3IodmFyIG89MDtvPGk7bysrKWU9VVpJUC5jcmMudGFibGVbMjU1JihlXnRbcitvXSldXmU+Pj44O3JldHVybiBlfSxjcmM6ZnVuY3Rpb24oZSx0LHIpe3JldHVybiA0Mjk0OTY3Mjk1XlVaSVAuY3JjLnVwZGF0ZSg0Mjk0OTY3Mjk1LGUsdCxyKX19LFVaSVAuYWRsZXI9ZnVuY3Rpb24oZSx0LHIpe2Zvcih2YXIgaT0xLG89MCxhPXQscz10K3I7YTxzOyl7Zm9yKHZhciBmPU1hdGgubWluKGErNTU1MixzKTthPGY7KW8rPWkrPWVbYSsrXTtpJT02NTUyMSxvJT02NTUyMX1yZXR1cm4gbzw8MTZ8aX0sVVpJUC5iaW49e3JlYWRVc2hvcnQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZVt0XXxlW3QrMV08PDh9LHdyaXRlVXNob3J0OmZ1bmN0aW9uKGUsdCxyKXtlW3RdPTI1NSZyLGVbdCsxXT1yPj44JjI1NX0scmVhZFVpbnQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gMTY3NzcyMTYqZVt0KzNdKyhlW3QrMl08PDE2fGVbdCsxXTw8OHxlW3RdKX0sd3JpdGVVaW50OmZ1bmN0aW9uKGUsdCxyKXtlW3RdPTI1NSZyLGVbdCsxXT1yPj44JjI1NSxlW3QrMl09cj4+MTYmMjU1LGVbdCszXT1yPj4yNCYyNTV9LHJlYWRBU0NJSTpmdW5jdGlvbihlLHQscil7Zm9yKHZhciBpPVwiXCIsbz0wO288cjtvKyspaSs9U3RyaW5nLmZyb21DaGFyQ29kZShlW3Qrb10pO3JldHVybiBpfSx3cml0ZUFTQ0lJOmZ1bmN0aW9uKGUsdCxyKXtmb3IodmFyIGk9MDtpPHIubGVuZ3RoO2krKyllW3QraV09ci5jaGFyQ29kZUF0KGkpfSxwYWQ6ZnVuY3Rpb24oZSl7cmV0dXJuIGUubGVuZ3RoPDI/XCIwXCIrZTplfSxyZWFkVVRGODpmdW5jdGlvbihlLHQscil7Zm9yKHZhciBpLG89XCJcIixhPTA7YTxyO2ErKylvKz1cIiVcIitVWklQLmJpbi5wYWQoZVt0K2FdLnRvU3RyaW5nKDE2KSk7dHJ5e2k9ZGVjb2RlVVJJQ29tcG9uZW50KG8pfWNhdGNoKGkpe3JldHVybiBVWklQLmJpbi5yZWFkQVNDSUkoZSx0LHIpfXJldHVybiBpfSx3cml0ZVVURjg6ZnVuY3Rpb24oZSx0LHIpe2Zvcih2YXIgaT1yLmxlbmd0aCxvPTAsYT0wO2E8aTthKyspe3ZhciBzPXIuY2hhckNvZGVBdChhKTtpZigwPT0oNDI5NDk2NzE2OCZzKSllW3Qrb109cyxvKys7ZWxzZSBpZigwPT0oNDI5NDk2NTI0OCZzKSllW3Qrb109MTkyfHM+PjYsZVt0K28rMV09MTI4fHM+PjAmNjMsbys9MjtlbHNlIGlmKDA9PSg0Mjk0OTAxNzYwJnMpKWVbdCtvXT0yMjR8cz4+MTIsZVt0K28rMV09MTI4fHM+PjYmNjMsZVt0K28rMl09MTI4fHM+PjAmNjMsbys9MztlbHNle2lmKDAhPSg0MjkyODcwMTQ0JnMpKXRocm93XCJlXCI7ZVt0K29dPTI0MHxzPj4xOCxlW3QrbysxXT0xMjh8cz4+MTImNjMsZVt0K28rMl09MTI4fHM+PjYmNjMsZVt0K28rM109MTI4fHM+PjAmNjMsbys9NH19cmV0dXJuIG99LHNpemVVVEY4OmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLmxlbmd0aCxyPTAsaT0wO2k8dDtpKyspe3ZhciBvPWUuY2hhckNvZGVBdChpKTtpZigwPT0oNDI5NDk2NzE2OCZvKSlyKys7ZWxzZSBpZigwPT0oNDI5NDk2NTI0OCZvKSlyKz0yO2Vsc2UgaWYoMD09KDQyOTQ5MDE3NjAmbykpcis9MztlbHNle2lmKDAhPSg0MjkyODcwMTQ0Jm8pKXRocm93XCJlXCI7cis9NH19cmV0dXJuIHJ9fSxVWklQLkY9e30sVVpJUC5GLmRlZmxhdGVSYXc9ZnVuY3Rpb24oZSx0LHIsaSl7dmFyIG89W1swLDAsMCwwLDBdLFs0LDQsOCw0LDBdLFs0LDUsMTYsOCwwXSxbNCw2LDE2LDE2LDBdLFs0LDEwLDE2LDMyLDBdLFs4LDE2LDMyLDMyLDBdLFs4LDE2LDEyOCwxMjgsMF0sWzgsMzIsMTI4LDI1NiwwXSxbMzIsMTI4LDI1OCwxMDI0LDFdLFszMiwyNTgsMjU4LDQwOTYsMV1dW2ldLGE9VVpJUC5GLlUscz1VWklQLkYuX2dvb2RJbmRleDtVWklQLkYuX2hhc2g7dmFyIGY9VVpJUC5GLl9wdXRzRSxsPTAsYz1yPDwzLHU9MCxoPWUubGVuZ3RoO2lmKDA9PWkpe2Zvcig7bDxoOyl7Zih0LGMsbCsoXz1NYXRoLm1pbig2NTUzNSxoLWwpKT09aD8xOjApLGM9VVpJUC5GLl9jb3B5RXhhY3QoZSxsLF8sdCxjKzgpLGwrPV99cmV0dXJuIGM+Pj4zfXZhciBkPWEubGl0cyxBPWEuc3RydCxnPWEucHJldixwPTAsbT0wLHc9MCx2PTAsYj0wLHk9MDtmb3IoaD4yJiYoQVt5PVVaSVAuRi5faGFzaChlLDApXT0wKSxsPTA7bDxoO2wrKyl7aWYoYj15LGwrMTxoLTIpe3k9VVpJUC5GLl9oYXNoKGUsbCsxKTt2YXIgRT1sKzEmMzI3Njc7Z1tFXT1BW3ldLEFbeV09RX1pZih1PD1sKXsocD4xNGUzfHxtPjI2Njk3KSYmaC1sPjEwMCYmKHU8bCYmKGRbcF09bC11LHArPTIsdT1sKSxjPVVaSVAuRi5fd3JpdGVCbG9jayhsPT1oLTF8fHU9PWg/MTowLGQscCx2LGUsdyxsLXcsdCxjKSxwPW09dj0wLHc9bCk7dmFyIEY9MDtsPGgtMiYmKEY9VVpJUC5GLl9iZXN0TWF0Y2goZSxsLGcsYixNYXRoLm1pbihvWzJdLGgtbCksb1szXSkpO3ZhciBfPUY+Pj4xNixCPTY1NTM1JkY7aWYoMCE9Ril7Qj02NTUzNSZGO3ZhciBVPXMoXz1GPj4+MTYsYS5vZjApO2EubGhzdFsyNTcrVV0rKzt2YXIgQz1zKEIsYS5kZjApO2EuZGhzdFtDXSsrLHYrPWEuZXhiW1VdK2EuZHhiW0NdLGRbcF09Xzw8MjN8bC11LGRbcCsxXT1CPDwxNnxVPDw4fEMscCs9Mix1PWwrX31lbHNlIGEubGhzdFtlW2xdXSsrO20rK319Zm9yKHc9PWwmJjAhPWUubGVuZ3RofHwodTxsJiYoZFtwXT1sLXUscCs9Mix1PWwpLGM9VVpJUC5GLl93cml0ZUJsb2NrKDEsZCxwLHYsZSx3LGwtdyx0LGMpLHA9MCxtPTAscD1tPXY9MCx3PWwpOzAhPSg3JmMpOyljKys7cmV0dXJuIGM+Pj4zfSxVWklQLkYuX2Jlc3RNYXRjaD1mdW5jdGlvbihlLHQscixpLG8sYSl7dmFyIHM9MzI3NjcmdCxmPXJbc10sbD1zLWYrMzI3NjgmMzI3Njc7aWYoZj09c3x8aSE9VVpJUC5GLl9oYXNoKGUsdC1sKSlyZXR1cm4gMDtmb3IodmFyIGM9MCx1PTAsaD1NYXRoLm1pbigzMjc2Nyx0KTtsPD1oJiYwIT0tLWEmJmYhPXM7KXtpZigwPT1jfHxlW3QrY109PWVbdCtjLWxdKXt2YXIgZD1VWklQLkYuX2hvd0xvbmcoZSx0LGwpO2lmKGQ+Yyl7aWYodT1sLChjPWQpPj1vKWJyZWFrO2wrMjxkJiYoZD1sKzIpO2Zvcih2YXIgQT0wLGc9MDtnPGQtMjtnKyspe3ZhciBwPXQtbCtnKzMyNzY4JjMyNzY3LG09cC1yW3BdKzMyNzY4JjMyNzY3O20+QSYmKEE9bSxmPXApfX19bCs9KHM9ZiktKGY9cltzXSkrMzI3NjgmMzI3Njd9cmV0dXJuIGM8PDE2fHV9LFVaSVAuRi5faG93TG9uZz1mdW5jdGlvbihlLHQscil7aWYoZVt0XSE9ZVt0LXJdfHxlW3QrMV0hPWVbdCsxLXJdfHxlW3QrMl0hPWVbdCsyLXJdKXJldHVybiAwO3ZhciBpPXQsbz1NYXRoLm1pbihlLmxlbmd0aCx0KzI1OCk7Zm9yKHQrPTM7dDxvJiZlW3RdPT1lW3Qtcl07KXQrKztyZXR1cm4gdC1pfSxVWklQLkYuX2hhc2g9ZnVuY3Rpb24oZSx0KXtyZXR1cm4oZVt0XTw8OHxlW3QrMV0pKyhlW3QrMl08PDQpJjY1NTM1fSxVWklQLnNhdmVkPTAsVVpJUC5GLl93cml0ZUJsb2NrPWZ1bmN0aW9uKGUsdCxyLGksbyxhLHMsZixsKXt2YXIgYyx1LGgsZCxBLGcscCxtLHcsdj1VWklQLkYuVSxiPVVaSVAuRi5fcHV0c0YseT1VWklQLkYuX3B1dHNFO3YubGhzdFsyNTZdKyssdT0oYz1VWklQLkYuZ2V0VHJlZXMoKSlbMF0saD1jWzFdLGQ9Y1syXSxBPWNbM10sZz1jWzRdLHA9Y1s1XSxtPWNbNl0sdz1jWzddO3ZhciBFPTMyKygwPT0obCszJjcpPzA6OC0obCszJjcpKSsoczw8MyksRj1pK1VaSVAuRi5jb250U2l6ZSh2LmZsdHJlZSx2Lmxoc3QpK1VaSVAuRi5jb250U2l6ZSh2LmZkdHJlZSx2LmRoc3QpLF89aStVWklQLkYuY29udFNpemUodi5sdHJlZSx2Lmxoc3QpK1VaSVAuRi5jb250U2l6ZSh2LmR0cmVlLHYuZGhzdCk7Xys9MTQrMypwK1VaSVAuRi5jb250U2l6ZSh2Lml0cmVlLHYuaWhzdCkrKDIqdi5paHN0WzE2XSszKnYuaWhzdFsxN10rNyp2Lmloc3RbMThdKTtmb3IodmFyIEI9MDtCPDI4NjtCKyspdi5saHN0W0JdPTA7Zm9yKEI9MDtCPDMwO0IrKyl2LmRoc3RbQl09MDtmb3IoQj0wO0I8MTk7QisrKXYuaWhzdFtCXT0wO3ZhciBVPUU8RiYmRTxfPzA6RjxfPzE6MjtpZihiKGYsbCxlKSxiKGYsbCsxLFUpLGwrPTMsMD09VSl7Zm9yKDswIT0oNyZsKTspbCsrO2w9VVpJUC5GLl9jb3B5RXhhY3QobyxhLHMsZixsKX1lbHNle3ZhciBDLEk7aWYoMT09VSYmKEM9di5mbHRyZWUsST12LmZkdHJlZSksMj09VSl7VVpJUC5GLm1ha2VDb2Rlcyh2Lmx0cmVlLHUpLFVaSVAuRi5yZXZDb2Rlcyh2Lmx0cmVlLHUpLFVaSVAuRi5tYWtlQ29kZXModi5kdHJlZSxoKSxVWklQLkYucmV2Q29kZXModi5kdHJlZSxoKSxVWklQLkYubWFrZUNvZGVzKHYuaXRyZWUsZCksVVpJUC5GLnJldkNvZGVzKHYuaXRyZWUsZCksQz12Lmx0cmVlLEk9di5kdHJlZSx5KGYsbCxBLTI1NykseShmLGwrPTUsZy0xKSx5KGYsbCs9NSxwLTQpLGwrPTQ7Zm9yKHZhciBRPTA7UTxwO1ErKyl5KGYsbCszKlEsdi5pdHJlZVsxKyh2Lm9yZHJbUV08PDEpXSk7bCs9MypwLGw9VVpJUC5GLl9jb2RlVGlueShtLHYuaXRyZWUsZixsKSxsPVVaSVAuRi5fY29kZVRpbnkodyx2Lml0cmVlLGYsbCl9Zm9yKHZhciBNPWEseD0wO3g8cjt4Kz0yKXtmb3IodmFyIFM9dFt4XSxSPVM+Pj4yMyxUPU0rKDgzODg2MDcmUyk7TTxUOylsPVVaSVAuRi5fd3JpdGVMaXQob1tNKytdLEMsZixsKTtpZigwIT1SKXt2YXIgTz10W3grMV0sUD1PPj4xNixIPU8+PjgmMjU1LEw9MjU1Jk87eShmLGw9VVpJUC5GLl93cml0ZUxpdCgyNTcrSCxDLGYsbCksUi12Lm9mMFtIXSksbCs9di5leGJbSF0sYihmLGw9VVpJUC5GLl93cml0ZUxpdChMLEksZixsKSxQLXYuZGYwW0xdKSxsKz12LmR4YltMXSxNKz1SfX1sPVVaSVAuRi5fd3JpdGVMaXQoMjU2LEMsZixsKX1yZXR1cm4gbH0sVVpJUC5GLl9jb3B5RXhhY3Q9ZnVuY3Rpb24oZSx0LHIsaSxvKXt2YXIgYT1vPj4+MztyZXR1cm4gaVthXT1yLGlbYSsxXT1yPj4+OCxpW2ErMl09MjU1LWlbYV0saVthKzNdPTI1NS1pW2ErMV0sYSs9NCxpLnNldChuZXcgVWludDhBcnJheShlLmJ1ZmZlcix0LHIpLGEpLG8rKHIrNDw8Myl9LFVaSVAuRi5nZXRUcmVlcz1mdW5jdGlvbigpe2Zvcih2YXIgZT1VWklQLkYuVSx0PVVaSVAuRi5faHVmVHJlZShlLmxoc3QsZS5sdHJlZSwxNSkscj1VWklQLkYuX2h1ZlRyZWUoZS5kaHN0LGUuZHRyZWUsMTUpLGk9W10sbz1VWklQLkYuX2xlbkNvZGVzKGUubHRyZWUsaSksYT1bXSxzPVVaSVAuRi5fbGVuQ29kZXMoZS5kdHJlZSxhKSxmPTA7ZjxpLmxlbmd0aDtmKz0yKWUuaWhzdFtpW2ZdXSsrO2ZvcihmPTA7ZjxhLmxlbmd0aDtmKz0yKWUuaWhzdFthW2ZdXSsrO2Zvcih2YXIgbD1VWklQLkYuX2h1ZlRyZWUoZS5paHN0LGUuaXRyZWUsNyksYz0xOTtjPjQmJjA9PWUuaXRyZWVbMSsoZS5vcmRyW2MtMV08PDEpXTspYy0tO3JldHVyblt0LHIsbCxvLHMsYyxpLGFdfSxVWklQLkYuZ2V0U2Vjb25kPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxyPTA7cjxlLmxlbmd0aDtyKz0yKXQucHVzaChlW3IrMV0pO3JldHVybiB0fSxVWklQLkYubm9uWmVybz1mdW5jdGlvbihlKXtmb3IodmFyIHQ9XCJcIixyPTA7cjxlLmxlbmd0aDtyKz0yKTAhPWVbcisxXSYmKHQrPShyPj4xKStcIixcIik7cmV0dXJuIHR9LFVaSVAuRi5jb250U2l6ZT1mdW5jdGlvbihlLHQpe2Zvcih2YXIgcj0wLGk9MDtpPHQubGVuZ3RoO2krKylyKz10W2ldKmVbMSsoaTw8MSldO3JldHVybiByfSxVWklQLkYuX2NvZGVUaW55PWZ1bmN0aW9uKGUsdCxyLGkpe2Zvcih2YXIgbz0wO288ZS5sZW5ndGg7bys9Mil7dmFyIGE9ZVtvXSxzPWVbbysxXTtpPVVaSVAuRi5fd3JpdGVMaXQoYSx0LHIsaSk7dmFyIGY9MTY9PWE/MjoxNz09YT8zOjc7YT4xNSYmKFVaSVAuRi5fcHV0c0UocixpLHMsZiksaSs9Zil9cmV0dXJuIGl9LFVaSVAuRi5fbGVuQ29kZXM9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9ZS5sZW5ndGg7MiE9ciYmMD09ZVtyLTFdOylyLT0yO2Zvcih2YXIgaT0wO2k8cjtpKz0yKXt2YXIgbz1lW2krMV0sYT1pKzM8cj9lW2krM106LTEscz1pKzU8cj9lW2krNV06LTEsZj0wPT1pPy0xOmVbaS0xXTtpZigwPT1vJiZhPT1vJiZzPT1vKXtmb3IodmFyIGw9aSs1O2wrMjxyJiZlW2wrMl09PW87KWwrPTI7KGM9TWF0aC5taW4obCsxLWk+Pj4xLDEzOCkpPDExP3QucHVzaCgxNyxjLTMpOnQucHVzaCgxOCxjLTExKSxpKz0yKmMtMn1lbHNlIGlmKG89PWYmJmE9PW8mJnM9PW8pe2ZvcihsPWkrNTtsKzI8ciYmZVtsKzJdPT1vOylsKz0yO3ZhciBjPU1hdGgubWluKGwrMS1pPj4+MSw2KTt0LnB1c2goMTYsYy0zKSxpKz0yKmMtMn1lbHNlIHQucHVzaChvLDApfXJldHVybiByPj4+MX0sVVpJUC5GLl9odWZUcmVlPWZ1bmN0aW9uKGUsdCxyKXt2YXIgaT1bXSxvPWUubGVuZ3RoLGE9dC5sZW5ndGgscz0wO2ZvcihzPTA7czxhO3MrPTIpdFtzXT0wLHRbcysxXT0wO2ZvcihzPTA7czxvO3MrKykwIT1lW3NdJiZpLnB1c2goe2xpdDpzLGY6ZVtzXX0pO3ZhciBmPWkubGVuZ3RoLGw9aS5zbGljZSgwKTtpZigwPT1mKXJldHVybiAwO2lmKDE9PWYpe3ZhciBjPWlbMF0ubGl0O2w9MD09Yz8xOjA7cmV0dXJuIHRbMSsoYzw8MSldPTEsdFsxKyhsPDwxKV09MSwxfWkuc29ydCgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5mLXQuZn0pKTt2YXIgdT1pWzBdLGg9aVsxXSxkPTAsQT0xLGc9Mjtmb3IoaVswXT17bGl0Oi0xLGY6dS5mK2guZixsOnUscjpoLGQ6MH07QSE9Zi0xOyl1PWQhPUEmJihnPT1mfHxpW2RdLmY8aVtnXS5mKT9pW2QrK106aVtnKytdLGg9ZCE9QSYmKGc9PWZ8fGlbZF0uZjxpW2ddLmYpP2lbZCsrXTppW2crK10saVtBKytdPXtsaXQ6LTEsZjp1LmYraC5mLGw6dSxyOmh9O3ZhciBwPVVaSVAuRi5zZXREZXB0aChpW0EtMV0sMCk7Zm9yKHA+ciYmKFVaSVAuRi5yZXN0cmljdERlcHRoKGwscixwKSxwPXIpLHM9MDtzPGY7cysrKXRbMSsobFtzXS5saXQ8PDEpXT1sW3NdLmQ7cmV0dXJuIHB9LFVaSVAuRi5zZXREZXB0aD1mdW5jdGlvbihlLHQpe3JldHVybi0xIT1lLmxpdD8oZS5kPXQsdCk6TWF0aC5tYXgoVVpJUC5GLnNldERlcHRoKGUubCx0KzEpLFVaSVAuRi5zZXREZXB0aChlLnIsdCsxKSl9LFVaSVAuRi5yZXN0cmljdERlcHRoPWZ1bmN0aW9uKGUsdCxyKXt2YXIgaT0wLG89MTw8ci10LGE9MDtmb3IoZS5zb3J0KChmdW5jdGlvbihlLHQpe3JldHVybiB0LmQ9PWUuZD9lLmYtdC5mOnQuZC1lLmR9KSksaT0wO2k8ZS5sZW5ndGgmJmVbaV0uZD50O2krKyl7dmFyIHM9ZVtpXS5kO2VbaV0uZD10LGErPW8tKDE8PHItcyl9Zm9yKGE+Pj49ci10O2E+MDspeyhzPWVbaV0uZCk8dD8oZVtpXS5kKyssYS09MTw8dC1zLTEpOmkrK31mb3IoO2k+PTA7aS0tKWVbaV0uZD09dCYmYTwwJiYoZVtpXS5kLS0sYSsrKTswIT1hJiZjb25zb2xlLmxvZyhcImRlYnQgbGVmdFwiKX0sVVpJUC5GLl9nb29kSW5kZXg9ZnVuY3Rpb24oZSx0KXt2YXIgcj0wO3JldHVybiB0WzE2fHJdPD1lJiYocnw9MTYpLHRbOHxyXTw9ZSYmKHJ8PTgpLHRbNHxyXTw9ZSYmKHJ8PTQpLHRbMnxyXTw9ZSYmKHJ8PTIpLHRbMXxyXTw9ZSYmKHJ8PTEpLHJ9LFVaSVAuRi5fd3JpdGVMaXQ9ZnVuY3Rpb24oZSx0LHIsaSl7cmV0dXJuIFVaSVAuRi5fcHV0c0YocixpLHRbZTw8MV0pLGkrdFsxKyhlPDwxKV19LFVaSVAuRi5pbmZsYXRlPWZ1bmN0aW9uKGUsdCl7dmFyIHI9VWludDhBcnJheTtpZigzPT1lWzBdJiYwPT1lWzFdKXJldHVybiB0fHxuZXcgcigwKTt2YXIgaT1VWklQLkYsbz1pLl9iaXRzRixhPWkuX2JpdHNFLHM9aS5fZGVjb2RlVGlueSxmPWkubWFrZUNvZGVzLGw9aS5jb2RlczJtYXAsYz1pLl9nZXQxNyx1PWkuVSxoPW51bGw9PXQ7aCYmKHQ9bmV3IHIoZS5sZW5ndGg+Pj4yPDwzKSk7Zm9yKHZhciBkLEEsZz0wLHA9MCxtPTAsdz0wLHY9MCxiPTAseT0wLEU9MCxGPTA7MD09ZzspaWYoZz1vKGUsRiwxKSxwPW8oZSxGKzEsMiksRis9MywwIT1wKXtpZihoJiYodD1VWklQLkYuX2NoZWNrKHQsRSsoMTw8MTcpKSksMT09cCYmKGQ9dS5mbG1hcCxBPXUuZmRtYXAsYj01MTEseT0zMSksMj09cCl7bT1hKGUsRiw1KSsyNTcsdz1hKGUsRis1LDUpKzEsdj1hKGUsRisxMCw0KSs0LEYrPTE0O2Zvcih2YXIgXz0wO188Mzg7Xys9Mil1Lml0cmVlW19dPTAsdS5pdHJlZVtfKzFdPTA7dmFyIEI9MTtmb3IoXz0wO188djtfKyspe3ZhciBVPWEoZSxGKzMqXywzKTt1Lml0cmVlWzErKHUub3JkcltfXTw8MSldPVUsVT5CJiYoQj1VKX1GKz0zKnYsZih1Lml0cmVlLEIpLGwodS5pdHJlZSxCLHUuaW1hcCksZD11LmxtYXAsQT11LmRtYXAsRj1zKHUuaW1hcCwoMTw8QiktMSxtK3csZSxGLHUudHRyZWUpO3ZhciBDPWkuX2NvcHlPdXQodS50dHJlZSwwLG0sdS5sdHJlZSk7Yj0oMTw8QyktMTt2YXIgST1pLl9jb3B5T3V0KHUudHRyZWUsbSx3LHUuZHRyZWUpO3k9KDE8PEkpLTEsZih1Lmx0cmVlLEMpLGwodS5sdHJlZSxDLGQpLGYodS5kdHJlZSxJKSxsKHUuZHRyZWUsSSxBKX1mb3IoOzspe3ZhciBRPWRbYyhlLEYpJmJdO0YrPTE1JlE7dmFyIE09UT4+PjQ7aWYoTT4+Pjg9PTApdFtFKytdPU07ZWxzZXtpZigyNTY9PU0pYnJlYWs7dmFyIHg9RStNLTI1NDtpZihNPjI2NCl7dmFyIFM9dS5sZGVmW00tMjU3XTt4PUUrKFM+Pj4zKSthKGUsRiw3JlMpLEYrPTcmU312YXIgUj1BW2MoZSxGKSZ5XTtGKz0xNSZSO3ZhciBUPVI+Pj40LE89dS5kZGVmW1RdLFA9KE8+Pj40KStvKGUsRiwxNSZPKTtmb3IoRis9MTUmTyxoJiYodD1VWklQLkYuX2NoZWNrKHQsRSsoMTw8MTcpKSk7RTx4Oyl0W0VdPXRbRSsrLVBdLHRbRV09dFtFKystUF0sdFtFXT10W0UrKy1QXSx0W0VdPXRbRSsrLVBdO0U9eH19fWVsc2V7MCE9KDcmRikmJihGKz04LSg3JkYpKTt2YXIgSD00KyhGPj4+MyksTD1lW0gtNF18ZVtILTNdPDw4O2gmJih0PVVaSVAuRi5fY2hlY2sodCxFK0wpKSx0LnNldChuZXcgcihlLmJ1ZmZlcixlLmJ5dGVPZmZzZXQrSCxMKSxFKSxGPUgrTDw8MyxFKz1MfXJldHVybiB0Lmxlbmd0aD09RT90OnQuc2xpY2UoMCxFKX0sVVpJUC5GLl9jaGVjaz1mdW5jdGlvbihlLHQpe3ZhciByPWUubGVuZ3RoO2lmKHQ8PXIpcmV0dXJuIGU7dmFyIGk9bmV3IFVpbnQ4QXJyYXkoTWF0aC5tYXgocjw8MSx0KSk7cmV0dXJuIGkuc2V0KGUsMCksaX0sVVpJUC5GLl9kZWNvZGVUaW55PWZ1bmN0aW9uKGUsdCxyLGksbyxhKXtmb3IodmFyIHM9VVpJUC5GLl9iaXRzRSxmPVVaSVAuRi5fZ2V0MTcsbD0wO2w8cjspe3ZhciBjPWVbZihpLG8pJnRdO28rPTE1JmM7dmFyIHU9Yz4+PjQ7aWYodTw9MTUpYVtsXT11LGwrKztlbHNle3ZhciBoPTAsZD0wOzE2PT11PyhkPTMrcyhpLG8sMiksbys9MixoPWFbbC0xXSk6MTc9PXU/KGQ9MytzKGksbywzKSxvKz0zKToxOD09dSYmKGQ9MTErcyhpLG8sNyksbys9Nyk7Zm9yKHZhciBBPWwrZDtsPEE7KWFbbF09aCxsKyt9fXJldHVybiBvfSxVWklQLkYuX2NvcHlPdXQ9ZnVuY3Rpb24oZSx0LHIsaSl7Zm9yKHZhciBvPTAsYT0wLHM9aS5sZW5ndGg+Pj4xO2E8cjspe3ZhciBmPWVbYSt0XTtpW2E8PDFdPTAsaVsxKyhhPDwxKV09ZixmPm8mJihvPWYpLGErK31mb3IoO2E8czspaVthPDwxXT0wLGlbMSsoYTw8MSldPTAsYSsrO3JldHVybiBvfSxVWklQLkYubWFrZUNvZGVzPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByLGksbyxhLHM9VVpJUC5GLlUsZj1lLmxlbmd0aCxsPXMuYmxfY291bnQsYz0wO2M8PXQ7YysrKWxbY109MDtmb3IoYz0xO2M8ZjtjKz0yKWxbZVtjXV0rKzt2YXIgdT1zLm5leHRfY29kZTtmb3Iocj0wLGxbMF09MCxpPTE7aTw9dDtpKyspcj1yK2xbaS0xXTw8MSx1W2ldPXI7Zm9yKG89MDtvPGY7bys9MikwIT0oYT1lW28rMV0pJiYoZVtvXT11W2FdLHVbYV0rKyl9LFVaSVAuRi5jb2RlczJtYXA9ZnVuY3Rpb24oZSx0LHIpe2Zvcih2YXIgaT1lLmxlbmd0aCxvPVVaSVAuRi5VLnJldjE1LGE9MDthPGk7YSs9MilpZigwIT1lW2ErMV0pZm9yKHZhciBzPWE+PjEsZj1lW2ErMV0sbD1zPDw0fGYsYz10LWYsdT1lW2FdPDxjLGg9dSsoMTw8Yyk7dSE9aDspe3Jbb1t1XT4+PjE1LXRdPWwsdSsrfX0sVVpJUC5GLnJldkNvZGVzPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByPVVaSVAuRi5VLnJldjE1LGk9MTUtdCxvPTA7bzxlLmxlbmd0aDtvKz0yKXt2YXIgYT1lW29dPDx0LWVbbysxXTtlW29dPXJbYV0+Pj5pfX0sVVpJUC5GLl9wdXRzRT1mdW5jdGlvbihlLHQscil7cjw8PTcmdDt2YXIgaT10Pj4+MztlW2ldfD1yLGVbaSsxXXw9cj4+Pjh9LFVaSVAuRi5fcHV0c0Y9ZnVuY3Rpb24oZSx0LHIpe3I8PD03JnQ7dmFyIGk9dD4+PjM7ZVtpXXw9cixlW2krMV18PXI+Pj44LGVbaSsyXXw9cj4+PjE2fSxVWklQLkYuX2JpdHNFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4oZVt0Pj4+M118ZVsxKyh0Pj4+MyldPDw4KT4+Pig3JnQpJigxPDxyKS0xfSxVWklQLkYuX2JpdHNGPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4oZVt0Pj4+M118ZVsxKyh0Pj4+MyldPDw4fGVbMisodD4+PjMpXTw8MTYpPj4+KDcmdCkmKDE8PHIpLTF9LFVaSVAuRi5fZ2V0MTc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4oZVt0Pj4+M118ZVsxKyh0Pj4+MyldPDw4fGVbMisodD4+PjMpXTw8MTYpPj4+KDcmdCl9LFVaSVAuRi5fZ2V0MjU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4oZVt0Pj4+M118ZVsxKyh0Pj4+MyldPDw4fGVbMisodD4+PjMpXTw8MTZ8ZVszKyh0Pj4+MyldPDwyNCk+Pj4oNyZ0KX0sVVpJUC5GLlU9KHI9VWludDE2QXJyYXksaT1VaW50MzJBcnJheSx7bmV4dF9jb2RlOm5ldyByKDE2KSxibF9jb3VudDpuZXcgcigxNiksb3JkcjpbMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0sb2YwOlszLDQsNSw2LDcsOCw5LDEwLDExLDEzLDE1LDE3LDE5LDIzLDI3LDMxLDM1LDQzLDUxLDU5LDY3LDgzLDk5LDExNSwxMzEsMTYzLDE5NSwyMjcsMjU4LDk5OSw5OTksOTk5XSxleGI6WzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMCwwLDAsMF0sbGRlZjpuZXcgcigzMiksZGYwOlsxLDIsMyw0LDUsNyw5LDEzLDE3LDI1LDMzLDQ5LDY1LDk3LDEyOSwxOTMsMjU3LDM4NSw1MTMsNzY5LDEwMjUsMTUzNywyMDQ5LDMwNzMsNDA5Nyw2MTQ1LDgxOTMsMTIyODksMTYzODUsMjQ1NzcsNjU1MzUsNjU1MzVdLGR4YjpbMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxMywwLDBdLGRkZWY6bmV3IGkoMzIpLGZsbWFwOm5ldyByKDUxMiksZmx0cmVlOltdLGZkbWFwOm5ldyByKDMyKSxmZHRyZWU6W10sbG1hcDpuZXcgcigzMjc2OCksbHRyZWU6W10sdHRyZWU6W10sZG1hcDpuZXcgcigzMjc2OCksZHRyZWU6W10saW1hcDpuZXcgcig1MTIpLGl0cmVlOltdLHJldjE1Om5ldyByKDMyNzY4KSxsaHN0Om5ldyBpKDI4NiksZGhzdDpuZXcgaSgzMCksaWhzdDpuZXcgaSgxOSksbGl0czpuZXcgaSgxNWUzKSxzdHJ0Om5ldyByKDY1NTM2KSxwcmV2Om5ldyByKDMyNzY4KX0pLGZ1bmN0aW9uKCl7Zm9yKHZhciBlPVVaSVAuRi5VLHQ9MDt0PDMyNzY4O3QrKyl7dmFyIHI9dDtyPSg0Mjc4MjU1MzYwJihyPSg0MDQyMzIyMTYwJihyPSgzNDM1OTczODM2JihyPSgyODYzMzExNTMwJnIpPj4+MXwoMTQzMTY1NTc2NSZyKTw8MSkpPj4+MnwoODU4OTkzNDU5JnIpPDwyKSk+Pj40fCgyNTI2NDUxMzUmcik8PDQpKT4+Pjh8KDE2NzExOTM1JnIpPDw4LGUucmV2MTVbdF09KHI+Pj4xNnxyPDwxNik+Pj4xN31mdW5jdGlvbiBwdXNoVihlLHQscil7Zm9yKDswIT10LS07KWUucHVzaCgwLHIpfWZvcih0PTA7dDwzMjt0KyspZS5sZGVmW3RdPWUub2YwW3RdPDwzfGUuZXhiW3RdLGUuZGRlZlt0XT1lLmRmMFt0XTw8NHxlLmR4Ylt0XTtwdXNoVihlLmZsdHJlZSwxNDQsOCkscHVzaFYoZS5mbHRyZWUsMTEyLDkpLHB1c2hWKGUuZmx0cmVlLDI0LDcpLHB1c2hWKGUuZmx0cmVlLDgsOCksVVpJUC5GLm1ha2VDb2RlcyhlLmZsdHJlZSw5KSxVWklQLkYuY29kZXMybWFwKGUuZmx0cmVlLDksZS5mbG1hcCksVVpJUC5GLnJldkNvZGVzKGUuZmx0cmVlLDkpLHB1c2hWKGUuZmR0cmVlLDMyLDUpLFVaSVAuRi5tYWtlQ29kZXMoZS5mZHRyZWUsNSksVVpJUC5GLmNvZGVzMm1hcChlLmZkdHJlZSw1LGUuZmRtYXApLFVaSVAuRi5yZXZDb2RlcyhlLmZkdHJlZSw1KSxwdXNoVihlLml0cmVlLDE5LDApLHB1c2hWKGUubHRyZWUsMjg2LDApLHB1c2hWKGUuZHRyZWUsMzAsMCkscHVzaFYoZS50dHJlZSwzMjAsMCl9KCl9KCk7dmFyIFVaSVA9X21lcmdlTmFtZXNwYWNlcyh7X19wcm90b19fOm51bGwsZGVmYXVsdDplfSxbZV0pO2NvbnN0IFVQTkc9ZnVuY3Rpb24oKXt2YXIgZT17bmV4dFplcm8oZSx0KXtmb3IoOzAhPWVbdF07KXQrKztyZXR1cm4gdH0scmVhZFVzaG9ydDooZSx0KT0+ZVt0XTw8OHxlW3QrMV0sd3JpdGVVc2hvcnQoZSx0LHIpe2VbdF09cj4+OCYyNTUsZVt0KzFdPTI1NSZyfSxyZWFkVWludDooZSx0KT0+MTY3NzcyMTYqZVt0XSsoZVt0KzFdPDwxNnxlW3QrMl08PDh8ZVt0KzNdKSx3cml0ZVVpbnQoZSx0LHIpe2VbdF09cj4+MjQmMjU1LGVbdCsxXT1yPj4xNiYyNTUsZVt0KzJdPXI+PjgmMjU1LGVbdCszXT0yNTUmcn0scmVhZEFTQ0lJKGUsdCxyKXtsZXQgaT1cIlwiO2ZvcihsZXQgbz0wO288cjtvKyspaSs9U3RyaW5nLmZyb21DaGFyQ29kZShlW3Qrb10pO3JldHVybiBpfSx3cml0ZUFTQ0lJKGUsdCxyKXtmb3IobGV0IGk9MDtpPHIubGVuZ3RoO2krKyllW3QraV09ci5jaGFyQ29kZUF0KGkpfSxyZWFkQnl0ZXMoZSx0LHIpe2NvbnN0IGk9W107Zm9yKGxldCBvPTA7bzxyO28rKylpLnB1c2goZVt0K29dKTtyZXR1cm4gaX0scGFkOmU9PmUubGVuZ3RoPDI/YDAke2V9YDplLHJlYWRVVEY4KHQscixpKXtsZXQgbyxhPVwiXCI7Zm9yKGxldCBvPTA7bzxpO28rKylhKz1gJSR7ZS5wYWQodFtyK29dLnRvU3RyaW5nKDE2KSl9YDt0cnl7bz1kZWNvZGVVUklDb21wb25lbnQoYSl9Y2F0Y2gobyl7cmV0dXJuIGUucmVhZEFTQ0lJKHQscixpKX1yZXR1cm4gb319O2Z1bmN0aW9uIGRlY29kZUltYWdlKHQscixpLG8pe2NvbnN0IGE9cippLHM9X2dldEJQUChvKSxmPU1hdGguY2VpbChyKnMvOCksbD1uZXcgVWludDhBcnJheSg0KmEpLGM9bmV3IFVpbnQzMkFycmF5KGwuYnVmZmVyKSx7Y3R5cGU6dX09byx7ZGVwdGg6aH09byxkPWUucmVhZFVzaG9ydDtpZig2PT11KXtjb25zdCBlPWE8PDI7aWYoOD09aClmb3IodmFyIEE9MDtBPGU7QSs9NClsW0FdPXRbQV0sbFtBKzFdPXRbQSsxXSxsW0ErMl09dFtBKzJdLGxbQSszXT10W0ErM107aWYoMTY9PWgpZm9yKEE9MDtBPGU7QSsrKWxbQV09dFtBPDwxXX1lbHNlIGlmKDI9PXUpe2NvbnN0IGU9by50YWJzLnRSTlM7aWYobnVsbD09ZSl7aWYoOD09aClmb3IoQT0wO0E8YTtBKyspe3ZhciBnPTMqQTtjW0FdPTI1NTw8MjR8dFtnKzJdPDwxNnx0W2crMV08PDh8dFtnXX1pZigxNj09aClmb3IoQT0wO0E8YTtBKyspe2c9NipBO2NbQV09MjU1PDwyNHx0W2crNF08PDE2fHRbZysyXTw8OHx0W2ddfX1lbHNle3ZhciBwPWVbMF07Y29uc3Qgcj1lWzFdLGk9ZVsyXTtpZig4PT1oKWZvcihBPTA7QTxhO0ErKyl7dmFyIG09QTw8MjtnPTMqQTtjW0FdPTI1NTw8MjR8dFtnKzJdPDwxNnx0W2crMV08PDh8dFtnXSx0W2ddPT1wJiZ0W2crMV09PXImJnRbZysyXT09aSYmKGxbbSszXT0wKX1pZigxNj09aClmb3IoQT0wO0E8YTtBKyspe209QTw8MixnPTYqQTtjW0FdPTI1NTw8MjR8dFtnKzRdPDwxNnx0W2crMl08PDh8dFtnXSxkKHQsZyk9PXAmJmQodCxnKzIpPT1yJiZkKHQsZys0KT09aSYmKGxbbSszXT0wKX19fWVsc2UgaWYoMz09dSl7Y29uc3QgZT1vLnRhYnMuUExURSxzPW8udGFicy50Uk5TLGM9cz9zLmxlbmd0aDowO2lmKDE9PWgpZm9yKHZhciB3PTA7dzxpO3crKyl7dmFyIHY9dypmLGI9dypyO2ZvcihBPTA7QTxyO0ErKyl7bT1iK0E8PDI7dmFyIHk9MyooRT10W3YrKEE+PjMpXT4+Ny0oKDcmQSk8PDApJjEpO2xbbV09ZVt5XSxsW20rMV09ZVt5KzFdLGxbbSsyXT1lW3krMl0sbFttKzNdPUU8Yz9zW0VdOjI1NX19aWYoMj09aClmb3Iodz0wO3c8aTt3KyspZm9yKHY9dypmLGI9dypyLEE9MDtBPHI7QSsrKXttPWIrQTw8Mix5PTMqKEU9dFt2KyhBPj4yKV0+PjYtKCgzJkEpPDwxKSYzKTtsW21dPWVbeV0sbFttKzFdPWVbeSsxXSxsW20rMl09ZVt5KzJdLGxbbSszXT1FPGM/c1tFXToyNTV9aWYoND09aClmb3Iodz0wO3c8aTt3KyspZm9yKHY9dypmLGI9dypyLEE9MDtBPHI7QSsrKXttPWIrQTw8Mix5PTMqKEU9dFt2KyhBPj4xKV0+PjQtKCgxJkEpPDwyKSYxNSk7bFttXT1lW3ldLGxbbSsxXT1lW3krMV0sbFttKzJdPWVbeSsyXSxsW20rM109RTxjP3NbRV06MjU1fWlmKDg9PWgpZm9yKEE9MDtBPGE7QSsrKXt2YXIgRTttPUE8PDIseT0zKihFPXRbQV0pO2xbbV09ZVt5XSxsW20rMV09ZVt5KzFdLGxbbSsyXT1lW3krMl0sbFttKzNdPUU8Yz9zW0VdOjI1NX19ZWxzZSBpZig0PT11KXtpZig4PT1oKWZvcihBPTA7QTxhO0ErKyl7bT1BPDwyO3ZhciBGPXRbXz1BPDwxXTtsW21dPUYsbFttKzFdPUYsbFttKzJdPUYsbFttKzNdPXRbXysxXX1pZigxNj09aClmb3IoQT0wO0E8YTtBKyspe3ZhciBfO209QTw8MixGPXRbXz1BPDwyXTtsW21dPUYsbFttKzFdPUYsbFttKzJdPUYsbFttKzNdPXRbXysyXX19ZWxzZSBpZigwPT11KWZvcihwPW8udGFicy50Uk5TP28udGFicy50Uk5TOi0xLHc9MDt3PGk7dysrKXtjb25zdCBlPXcqZixpPXcqcjtpZigxPT1oKWZvcih2YXIgQj0wO0I8cjtCKyspe3ZhciBVPShGPTI1NSoodFtlKyhCPj4+MyldPj4+Ny0oNyZCKSYxKSk9PTI1NSpwPzA6MjU1O2NbaStCXT1VPDwyNHxGPDwxNnxGPDw4fEZ9ZWxzZSBpZigyPT1oKWZvcihCPTA7QjxyO0IrKyl7VT0oRj04NSoodFtlKyhCPj4+MildPj4+Ni0oKDMmQik8PDEpJjMpKT09ODUqcD8wOjI1NTtjW2krQl09VTw8MjR8Rjw8MTZ8Rjw8OHxGfWVsc2UgaWYoND09aClmb3IoQj0wO0I8cjtCKyspe1U9KEY9MTcqKHRbZSsoQj4+PjEpXT4+PjQtKCgxJkIpPDwyKSYxNSkpPT0xNypwPzA6MjU1O2NbaStCXT1VPDwyNHxGPDwxNnxGPDw4fEZ9ZWxzZSBpZig4PT1oKWZvcihCPTA7QjxyO0IrKyl7VT0oRj10W2UrQl0pPT1wPzA6MjU1O2NbaStCXT1VPDwyNHxGPDwxNnxGPDw4fEZ9ZWxzZSBpZigxNj09aClmb3IoQj0wO0I8cjtCKyspe0Y9dFtlKyhCPDwxKV0sVT1kKHQsZSsoQjw8MSkpPT1wPzA6MjU1O2NbaStCXT1VPDwyNHxGPDwxNnxGPDw4fEZ9fXJldHVybiBsfWZ1bmN0aW9uIF9kZWNvbXByZXNzKGUscixpLG8pe2NvbnN0IGE9X2dldEJQUChlKSxzPU1hdGguY2VpbChpKmEvOCksZj1uZXcgVWludDhBcnJheSgocysxK2UuaW50ZXJsYWNlKSpvKTtyZXR1cm4gcj1lLnRhYnMuQ2dCST90KHIsZik6X2luZmxhdGUocixmKSwwPT1lLmludGVybGFjZT9yPV9maWx0ZXJaZXJvKHIsZSwwLGksbyk6MT09ZS5pbnRlcmxhY2UmJihyPWZ1bmN0aW9uIF9yZWFkSW50ZXJsYWNlKGUsdCl7Y29uc3Qgcj10LndpZHRoLGk9dC5oZWlnaHQsbz1fZ2V0QlBQKHQpLGE9bz4+MyxzPU1hdGguY2VpbChyKm8vOCksZj1uZXcgVWludDhBcnJheShpKnMpO2xldCBsPTA7Y29uc3QgYz1bMCwwLDQsMCwyLDAsMV0sdT1bMCw0LDAsMiwwLDEsMF0saD1bOCw4LDgsNCw0LDIsMl0sZD1bOCw4LDQsNCwyLDIsMV07bGV0IEE9MDtmb3IoO0E8Nzspe2NvbnN0IHA9aFtBXSxtPWRbQV07bGV0IHc9MCx2PTAsYj1jW0FdO2Zvcig7YjxpOyliKz1wLHYrKztsZXQgeT11W0FdO2Zvcig7eTxyOyl5Kz1tLHcrKztjb25zdCBFPU1hdGguY2VpbCh3Km8vOCk7X2ZpbHRlclplcm8oZSx0LGwsdyx2KTtsZXQgRj0wLF89Y1tBXTtmb3IoO188aTspe2xldCB0PXVbQV0saT1sK0YqRTw8Mztmb3IoO3Q8cjspe3ZhciBnO2lmKDE9PW8pZz0oZz1lW2k+PjNdKT4+Ny0oNyZpKSYxLGZbXypzKyh0Pj4zKV18PWc8PDctKCg3JnQpPDwwKTtpZigyPT1vKWc9KGc9ZVtpPj4zXSk+PjYtKDcmaSkmMyxmW18qcysodD4+MildfD1nPDw2LSgoMyZ0KTw8MSk7aWYoND09bylnPShnPWVbaT4+M10pPj40LSg3JmkpJjE1LGZbXypzKyh0Pj4xKV18PWc8PDQtKCgxJnQpPDwyKTtpZihvPj04KXtjb25zdCByPV8qcyt0KmE7Zm9yKGxldCB0PTA7dDxhO3QrKylmW3IrdF09ZVsoaT4+MykrdF19aSs9byx0Kz1tfUYrKyxfKz1wfXcqdiE9MCYmKGwrPXYqKDErRSkpLEErPTF9cmV0dXJuIGZ9KHIsZSkpLHJ9ZnVuY3Rpb24gX2luZmxhdGUoZSxyKXtyZXR1cm4gdChuZXcgVWludDhBcnJheShlLmJ1ZmZlciwyLGUubGVuZ3RoLTYpLHIpfXZhciB0PWZ1bmN0aW9uKCl7Y29uc3QgZT17SDp7fX07cmV0dXJuIGUuSC5OPWZ1bmN0aW9uKHQscil7Y29uc3QgaT1VaW50OEFycmF5O2xldCBvLGEscz0wLGY9MCxsPTAsYz0wLHU9MCxoPTAsZD0wLEE9MCxnPTA7aWYoMz09dFswXSYmMD09dFsxXSlyZXR1cm4gcnx8bmV3IGkoMCk7Y29uc3QgcD1lLkgsbT1wLmIsdz1wLmUsdj1wLlIsYj1wLm4seT1wLkEsRT1wLlosRj1wLm0sXz1udWxsPT1yO2ZvcihfJiYocj1uZXcgaSh0Lmxlbmd0aD4+PjI8PDUpKTswPT1zOylpZihzPW0odCxnLDEpLGY9bSh0LGcrMSwyKSxnKz0zLDAhPWYpe2lmKF8mJihyPWUuSC5XKHIsQSsoMTw8MTcpKSksMT09ZiYmKG89Ri5KLGE9Ri5oLGg9NTExLGQ9MzEpLDI9PWYpe2w9dyh0LGcsNSkrMjU3LGM9dyh0LGcrNSw1KSsxLHU9dyh0LGcrMTAsNCkrNCxnKz0xNDtsZXQgZT0xO2Zvcih2YXIgQj0wO0I8Mzg7Qis9MilGLlFbQl09MCxGLlFbQisxXT0wO2ZvcihCPTA7Qjx1O0IrKyl7Y29uc3Qgcj13KHQsZyszKkIsMyk7Ri5RWzErKEYuWFtCXTw8MSldPXIscj5lJiYoZT1yKX1nKz0zKnUsYihGLlEsZSkseShGLlEsZSxGLnUpLG89Ri53LGE9Ri5kLGc9dihGLnUsKDE8PGUpLTEsbCtjLHQsZyxGLnYpO2NvbnN0IHI9cC5WKEYudiwwLGwsRi5DKTtoPSgxPDxyKS0xO2NvbnN0IGk9cC5WKEYudixsLGMsRi5EKTtkPSgxPDxpKS0xLGIoRi5DLHIpLHkoRi5DLHIsbyksYihGLkQsaSkseShGLkQsaSxhKX1mb3IoOzspe2NvbnN0IGU9b1tFKHQsZykmaF07Zys9MTUmZTtjb25zdCBpPWU+Pj40O2lmKGk+Pj44PT0wKXJbQSsrXT1pO2Vsc2V7aWYoMjU2PT1pKWJyZWFrO3tsZXQgZT1BK2ktMjU0O2lmKGk+MjY0KXtjb25zdCByPUYucVtpLTI1N107ZT1BKyhyPj4+Mykrdyh0LGcsNyZyKSxnKz03JnJ9Y29uc3Qgbz1hW0UodCxnKSZkXTtnKz0xNSZvO2NvbnN0IHM9bz4+PjQsZj1GLmNbc10sbD0oZj4+PjQpK20odCxnLDE1JmYpO2ZvcihnKz0xNSZmO0E8ZTspcltBXT1yW0ErKy1sXSxyW0FdPXJbQSsrLWxdLHJbQV09cltBKystbF0scltBXT1yW0ErKy1sXTtBPWV9fX19ZWxzZXswIT0oNyZnKSYmKGcrPTgtKDcmZykpO2NvbnN0IG89NCsoZz4+PjMpLGE9dFtvLTRdfHRbby0zXTw8ODtfJiYocj1lLkguVyhyLEErYSkpLHIuc2V0KG5ldyBpKHQuYnVmZmVyLHQuYnl0ZU9mZnNldCtvLGEpLEEpLGc9bythPDwzLEErPWF9cmV0dXJuIHIubGVuZ3RoPT1BP3I6ci5zbGljZSgwLEEpfSxlLkguVz1mdW5jdGlvbihlLHQpe2NvbnN0IHI9ZS5sZW5ndGg7aWYodDw9cilyZXR1cm4gZTtjb25zdCBpPW5ldyBVaW50OEFycmF5KHI8PDEpO3JldHVybiBpLnNldChlLDApLGl9LGUuSC5SPWZ1bmN0aW9uKHQscixpLG8sYSxzKXtjb25zdCBmPWUuSC5lLGw9ZS5ILlo7bGV0IGM9MDtmb3IoO2M8aTspe2NvbnN0IGU9dFtsKG8sYSkmcl07YSs9MTUmZTtjb25zdCBpPWU+Pj40O2lmKGk8PTE1KXNbY109aSxjKys7ZWxzZXtsZXQgZT0wLHQ9MDsxNj09aT8odD0zK2YobyxhLDIpLGErPTIsZT1zW2MtMV0pOjE3PT1pPyh0PTMrZihvLGEsMyksYSs9Myk6MTg9PWkmJih0PTExK2YobyxhLDcpLGErPTcpO2NvbnN0IHI9Yyt0O2Zvcig7YzxyOylzW2NdPWUsYysrfX1yZXR1cm4gYX0sZS5ILlY9ZnVuY3Rpb24oZSx0LHIsaSl7bGV0IG89MCxhPTA7Y29uc3Qgcz1pLmxlbmd0aD4+PjE7Zm9yKDthPHI7KXtjb25zdCByPWVbYSt0XTtpW2E8PDFdPTAsaVsxKyhhPDwxKV09cixyPm8mJihvPXIpLGErK31mb3IoO2E8czspaVthPDwxXT0wLGlbMSsoYTw8MSldPTAsYSsrO3JldHVybiBvfSxlLkgubj1mdW5jdGlvbih0LHIpe2NvbnN0IGk9ZS5ILm0sbz10Lmxlbmd0aDtsZXQgYSxzLGY7bGV0IGw7Y29uc3QgYz1pLmo7Zm9yKHZhciB1PTA7dTw9cjt1KyspY1t1XT0wO2Zvcih1PTE7dTxvO3UrPTIpY1t0W3VdXSsrO2NvbnN0IGg9aS5LO2ZvcihhPTAsY1swXT0wLHM9MTtzPD1yO3MrKylhPWErY1tzLTFdPDwxLGhbc109YTtmb3IoZj0wO2Y8bztmKz0yKWw9dFtmKzFdLDAhPWwmJih0W2ZdPWhbbF0saFtsXSsrKX0sZS5ILkE9ZnVuY3Rpb24odCxyLGkpe2NvbnN0IG89dC5sZW5ndGgsYT1lLkgubS5yO2ZvcihsZXQgZT0wO2U8bztlKz0yKWlmKDAhPXRbZSsxXSl7Y29uc3Qgbz1lPj4xLHM9dFtlKzFdLGY9bzw8NHxzLGw9ci1zO2xldCBjPXRbZV08PGw7Y29uc3QgdT1jKygxPDxsKTtmb3IoO2MhPXU7KXtpW2FbY10+Pj4xNS1yXT1mLGMrK319fSxlLkgubD1mdW5jdGlvbih0LHIpe2NvbnN0IGk9ZS5ILm0ucixvPTE1LXI7Zm9yKGxldCBlPTA7ZTx0Lmxlbmd0aDtlKz0yKXtjb25zdCBhPXRbZV08PHItdFtlKzFdO3RbZV09aVthXT4+Pm99fSxlLkguTT1mdW5jdGlvbihlLHQscil7cjw8PTcmdDtjb25zdCBpPXQ+Pj4zO2VbaV18PXIsZVtpKzFdfD1yPj4+OH0sZS5ILkk9ZnVuY3Rpb24oZSx0LHIpe3I8PD03JnQ7Y29uc3QgaT10Pj4+MztlW2ldfD1yLGVbaSsxXXw9cj4+PjgsZVtpKzJdfD1yPj4+MTZ9LGUuSC5lPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4oZVt0Pj4+M118ZVsxKyh0Pj4+MyldPDw4KT4+Pig3JnQpJigxPDxyKS0xfSxlLkguYj1mdW5jdGlvbihlLHQscil7cmV0dXJuKGVbdD4+PjNdfGVbMSsodD4+PjMpXTw8OHxlWzIrKHQ+Pj4zKV08PDE2KT4+Pig3JnQpJigxPDxyKS0xfSxlLkguWj1mdW5jdGlvbihlLHQpe3JldHVybihlW3Q+Pj4zXXxlWzErKHQ+Pj4zKV08PDh8ZVsyKyh0Pj4+MyldPDwxNik+Pj4oNyZ0KX0sZS5ILmk9ZnVuY3Rpb24oZSx0KXtyZXR1cm4oZVt0Pj4+M118ZVsxKyh0Pj4+MyldPDw4fGVbMisodD4+PjMpXTw8MTZ8ZVszKyh0Pj4+MyldPDwyNCk+Pj4oNyZ0KX0sZS5ILm09ZnVuY3Rpb24oKXtjb25zdCBlPVVpbnQxNkFycmF5LHQ9VWludDMyQXJyYXk7cmV0dXJue0s6bmV3IGUoMTYpLGo6bmV3IGUoMTYpLFg6WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdLFM6WzMsNCw1LDYsNyw4LDksMTAsMTEsMTMsMTUsMTcsMTksMjMsMjcsMzEsMzUsNDMsNTEsNTksNjcsODMsOTksMTE1LDEzMSwxNjMsMTk1LDIyNywyNTgsOTk5LDk5OSw5OTldLFQ6WzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMCwwLDAsMF0scTpuZXcgZSgzMikscDpbMSwyLDMsNCw1LDcsOSwxMywxNywyNSwzMyw0OSw2NSw5NywxMjksMTkzLDI1NywzODUsNTEzLDc2OSwxMDI1LDE1MzcsMjA0OSwzMDczLDQwOTcsNjE0NSw4MTkzLDEyMjg5LDE2Mzg1LDI0NTc3LDY1NTM1LDY1NTM1XSx6OlswLDAsMCwwLDEsMSwyLDIsMywzLDQsNCw1LDUsNiw2LDcsNyw4LDgsOSw5LDEwLDEwLDExLDExLDEyLDEyLDEzLDEzLDAsMF0sYzpuZXcgdCgzMiksSjpuZXcgZSg1MTIpLF86W10saDpuZXcgZSgzMiksJDpbXSx3Om5ldyBlKDMyNzY4KSxDOltdLHY6W10sZDpuZXcgZSgzMjc2OCksRDpbXSx1Om5ldyBlKDUxMiksUTpbXSxyOm5ldyBlKDMyNzY4KSxzOm5ldyB0KDI4NiksWTpuZXcgdCgzMCksYTpuZXcgdCgxOSksdDpuZXcgdCgxNWUzKSxrOm5ldyBlKDY1NTM2KSxnOm5ldyBlKDMyNzY4KX19KCksZnVuY3Rpb24oKXtjb25zdCB0PWUuSC5tO2Zvcih2YXIgcj0wO3I8MzI3Njg7cisrKXtsZXQgZT1yO2U9KDI4NjMzMTE1MzAmZSk+Pj4xfCgxNDMxNjU1NzY1JmUpPDwxLGU9KDM0MzU5NzM4MzYmZSk+Pj4yfCg4NTg5OTM0NTkmZSk8PDIsZT0oNDA0MjMyMjE2MCZlKT4+PjR8KDI1MjY0NTEzNSZlKTw8NCxlPSg0Mjc4MjU1MzYwJmUpPj4+OHwoMTY3MTE5MzUmZSk8PDgsdC5yW3JdPShlPj4+MTZ8ZTw8MTYpPj4+MTd9ZnVuY3Rpb24gbihlLHQscil7Zm9yKDswIT10LS07KWUucHVzaCgwLHIpfWZvcihyPTA7cjwzMjtyKyspdC5xW3JdPXQuU1tyXTw8M3x0LlRbcl0sdC5jW3JdPXQucFtyXTw8NHx0Lnpbcl07bih0Ll8sMTQ0LDgpLG4odC5fLDExMiw5KSxuKHQuXywyNCw3KSxuKHQuXyw4LDgpLGUuSC5uKHQuXyw5KSxlLkguQSh0Ll8sOSx0LkopLGUuSC5sKHQuXyw5KSxuKHQuJCwzMiw1KSxlLkgubih0LiQsNSksZS5ILkEodC4kLDUsdC5oKSxlLkgubCh0LiQsNSksbih0LlEsMTksMCksbih0LkMsMjg2LDApLG4odC5ELDMwLDApLG4odC52LDMyMCwwKX0oKSxlLkguTn0oKTtmdW5jdGlvbiBfZ2V0QlBQKGUpe3JldHVyblsxLG51bGwsMywxLDIsbnVsbCw0XVtlLmN0eXBlXSplLmRlcHRofWZ1bmN0aW9uIF9maWx0ZXJaZXJvKGUsdCxyLGksbyl7bGV0IGE9X2dldEJQUCh0KTtjb25zdCBzPU1hdGguY2VpbChpKmEvOCk7bGV0IGYsbDthPU1hdGguY2VpbChhLzgpO2xldCBjPWVbcl0sdT0wO2lmKGM+MSYmKGVbcl09WzAsMCwxXVtjLTJdKSwzPT1jKWZvcih1PWE7dTxzO3UrKyllW3UrMV09ZVt1KzFdKyhlW3UrMS1hXT4+PjEpJjI1NTtmb3IobGV0IHQ9MDt0PG87dCsrKWlmKGY9cit0KnMsbD1mK3QrMSxjPWVbbC0xXSx1PTAsMD09Yylmb3IoO3U8czt1KyspZVtmK3VdPWVbbCt1XTtlbHNlIGlmKDE9PWMpe2Zvcig7dTxhO3UrKyllW2YrdV09ZVtsK3VdO2Zvcig7dTxzO3UrKyllW2YrdV09ZVtsK3VdK2VbZit1LWFdfWVsc2UgaWYoMj09Yylmb3IoO3U8czt1KyspZVtmK3VdPWVbbCt1XStlW2YrdS1zXTtlbHNlIGlmKDM9PWMpe2Zvcig7dTxhO3UrKyllW2YrdV09ZVtsK3VdKyhlW2YrdS1zXT4+PjEpO2Zvcig7dTxzO3UrKyllW2YrdV09ZVtsK3VdKyhlW2YrdS1zXStlW2YrdS1hXT4+PjEpfWVsc2V7Zm9yKDt1PGE7dSsrKWVbZit1XT1lW2wrdV0rX3BhZXRoKDAsZVtmK3Utc10sMCk7Zm9yKDt1PHM7dSsrKWVbZit1XT1lW2wrdV0rX3BhZXRoKGVbZit1LWFdLGVbZit1LXNdLGVbZit1LWEtc10pfXJldHVybiBlfWZ1bmN0aW9uIF9wYWV0aChlLHQscil7Y29uc3QgaT1lK3QtcixvPWktZSxhPWktdCxzPWktcjtyZXR1cm4gbypvPD1hKmEmJm8qbzw9cypzP2U6YSphPD1zKnM/dDpyfWZ1bmN0aW9uIF9JSERSKHQscixpKXtpLndpZHRoPWUucmVhZFVpbnQodCxyKSxyKz00LGkuaGVpZ2h0PWUucmVhZFVpbnQodCxyKSxyKz00LGkuZGVwdGg9dFtyXSxyKyssaS5jdHlwZT10W3JdLHIrKyxpLmNvbXByZXNzPXRbcl0scisrLGkuZmlsdGVyPXRbcl0scisrLGkuaW50ZXJsYWNlPXRbcl0scisrfWZ1bmN0aW9uIF9jb3B5VGlsZShlLHQscixpLG8sYSxzLGYsbCl7Y29uc3QgYz1NYXRoLm1pbih0LG8pLHU9TWF0aC5taW4ocixhKTtsZXQgaD0wLGQ9MDtmb3IobGV0IHI9MDtyPHU7cisrKWZvcihsZXQgYT0wO2E8YzthKyspaWYocz49MCYmZj49MD8oaD1yKnQrYTw8MixkPShmK3IpKm8rcythPDwyKTooaD0oLWYrcikqdC1zK2E8PDIsZD1yKm8rYTw8MiksMD09bClpW2RdPWVbaF0saVtkKzFdPWVbaCsxXSxpW2QrMl09ZVtoKzJdLGlbZCszXT1lW2grM107ZWxzZSBpZigxPT1sKXt2YXIgQT1lW2grM10qKDEvMjU1KSxnPWVbaF0qQSxwPWVbaCsxXSpBLG09ZVtoKzJdKkEsdz1pW2QrM10qKDEvMjU1KSx2PWlbZF0qdyxiPWlbZCsxXSp3LHk9aVtkKzJdKnc7Y29uc3QgdD0xLUEscj1BK3cqdCxvPTA9PXI/MDoxL3I7aVtkKzNdPTI1NSpyLGlbZCswXT0oZyt2KnQpKm8saVtkKzFdPShwK2IqdCkqbyxpW2QrMl09KG0reSp0KSpvfWVsc2UgaWYoMj09bCl7QT1lW2grM10sZz1lW2hdLHA9ZVtoKzFdLG09ZVtoKzJdLHc9aVtkKzNdLHY9aVtkXSxiPWlbZCsxXSx5PWlbZCsyXTtBPT13JiZnPT12JiZwPT1iJiZtPT15PyhpW2RdPTAsaVtkKzFdPTAsaVtkKzJdPTAsaVtkKzNdPTApOihpW2RdPWcsaVtkKzFdPXAsaVtkKzJdPW0saVtkKzNdPUEpfWVsc2UgaWYoMz09bCl7QT1lW2grM10sZz1lW2hdLHA9ZVtoKzFdLG09ZVtoKzJdLHc9aVtkKzNdLHY9aVtkXSxiPWlbZCsxXSx5PWlbZCsyXTtpZihBPT13JiZnPT12JiZwPT1iJiZtPT15KWNvbnRpbnVlO2lmKEE8MjIwJiZ3PjIwKXJldHVybiExfXJldHVybiEwfXJldHVybntkZWNvZGU6ZnVuY3Rpb24gZGVjb2RlKHIpe2NvbnN0IGk9bmV3IFVpbnQ4QXJyYXkocik7bGV0IG89ODtjb25zdCBhPWUscz1hLnJlYWRVc2hvcnQsZj1hLnJlYWRVaW50LGw9e3RhYnM6e30sZnJhbWVzOltdfSxjPW5ldyBVaW50OEFycmF5KGkubGVuZ3RoKTtsZXQgdSxoPTAsZD0wO2NvbnN0IEE9WzEzNyw4MCw3OCw3MSwxMywxMCwyNiwxMF07Zm9yKHZhciBnPTA7Zzw4O2crKylpZihpW2ddIT1BW2ddKXRocm93XCJUaGUgaW5wdXQgaXMgbm90IGEgUE5HIGZpbGUhXCI7Zm9yKDtvPGkubGVuZ3RoOyl7Y29uc3QgZT1hLnJlYWRVaW50KGksbyk7bys9NDtjb25zdCByPWEucmVhZEFTQ0lJKGksbyw0KTtpZihvKz00LFwiSUhEUlwiPT1yKV9JSERSKGksbyxsKTtlbHNlIGlmKFwiaUNDUFwiPT1yKXtmb3IodmFyIHA9bzswIT1pW3BdOylwKys7YS5yZWFkQVNDSUkoaSxvLHAtbyksaVtwKzFdO2NvbnN0IHM9aS5zbGljZShwKzIsbytlKTtsZXQgZj1udWxsO3RyeXtmPV9pbmZsYXRlKHMpfWNhdGNoKGUpe2Y9dChzKX1sLnRhYnNbcl09Zn1lbHNlIGlmKFwiQ2dCSVwiPT1yKWwudGFic1tyXT1pLnNsaWNlKG8sbys0KTtlbHNlIGlmKFwiSURBVFwiPT1yKXtmb3IoZz0wO2c8ZTtnKyspY1toK2ddPWlbbytnXTtoKz1lfWVsc2UgaWYoXCJhY1RMXCI9PXIpbC50YWJzW3JdPXtudW1fZnJhbWVzOmYoaSxvKSxudW1fcGxheXM6ZihpLG8rNCl9LHU9bmV3IFVpbnQ4QXJyYXkoaS5sZW5ndGgpO2Vsc2UgaWYoXCJmY1RMXCI9PXIpe2lmKDAhPWQpKEU9bC5mcmFtZXNbbC5mcmFtZXMubGVuZ3RoLTFdKS5kYXRhPV9kZWNvbXByZXNzKGwsdS5zbGljZSgwLGQpLEUucmVjdC53aWR0aCxFLnJlY3QuaGVpZ2h0KSxkPTA7Y29uc3QgZT17eDpmKGksbysxMikseTpmKGksbysxNiksd2lkdGg6ZihpLG8rNCksaGVpZ2h0OmYoaSxvKzgpfTtsZXQgdD1zKGksbysyMik7dD1zKGksbysyMCkvKDA9PXQ/MTAwOnQpO2NvbnN0IHI9e3JlY3Q6ZSxkZWxheTpNYXRoLnJvdW5kKDFlMyp0KSxkaXNwb3NlOmlbbysyNF0sYmxlbmQ6aVtvKzI1XX07bC5mcmFtZXMucHVzaChyKX1lbHNlIGlmKFwiZmRBVFwiPT1yKXtmb3IoZz0wO2c8ZS00O2crKyl1W2QrZ109aVtvK2crNF07ZCs9ZS00fWVsc2UgaWYoXCJwSFlzXCI9PXIpbC50YWJzW3JdPVthLnJlYWRVaW50KGksbyksYS5yZWFkVWludChpLG8rNCksaVtvKzhdXTtlbHNlIGlmKFwiY0hSTVwiPT1yKXtsLnRhYnNbcl09W107Zm9yKGc9MDtnPDg7ZysrKWwudGFic1tyXS5wdXNoKGEucmVhZFVpbnQoaSxvKzQqZykpfWVsc2UgaWYoXCJ0RVh0XCI9PXJ8fFwielRYdFwiPT1yKXtudWxsPT1sLnRhYnNbcl0mJihsLnRhYnNbcl09e30pO3ZhciBtPWEubmV4dFplcm8oaSxvKSx3PWEucmVhZEFTQ0lJKGksbyxtLW8pLHY9bytlLW0tMTtpZihcInRFWHRcIj09cil5PWEucmVhZEFTQ0lJKGksbSsxLHYpO2Vsc2V7dmFyIGI9X2luZmxhdGUoaS5zbGljZShtKzIsbSsyK3YpKTt5PWEucmVhZFVURjgoYiwwLGIubGVuZ3RoKX1sLnRhYnNbcl1bd109eX1lbHNlIGlmKFwiaVRYdFwiPT1yKXtudWxsPT1sLnRhYnNbcl0mJihsLnRhYnNbcl09e30pO209MCxwPW87bT1hLm5leHRaZXJvKGkscCk7dz1hLnJlYWRBU0NJSShpLHAsbS1wKTtjb25zdCB0PWlbcD1tKzFdO3ZhciB5O2lbcCsxXSxwKz0yLG09YS5uZXh0WmVybyhpLHApLGEucmVhZEFTQ0lJKGkscCxtLXApLHA9bSsxLG09YS5uZXh0WmVybyhpLHApLGEucmVhZFVURjgoaSxwLG0tcCk7dj1lLSgocD1tKzEpLW8pO2lmKDA9PXQpeT1hLnJlYWRVVEY4KGkscCx2KTtlbHNle2I9X2luZmxhdGUoaS5zbGljZShwLHArdikpO3k9YS5yZWFkVVRGOChiLDAsYi5sZW5ndGgpfWwudGFic1tyXVt3XT15fWVsc2UgaWYoXCJQTFRFXCI9PXIpbC50YWJzW3JdPWEucmVhZEJ5dGVzKGksbyxlKTtlbHNlIGlmKFwiaElTVFwiPT1yKXtjb25zdCBlPWwudGFicy5QTFRFLmxlbmd0aC8zO2wudGFic1tyXT1bXTtmb3IoZz0wO2c8ZTtnKyspbC50YWJzW3JdLnB1c2gocyhpLG8rMipnKSl9ZWxzZSBpZihcInRSTlNcIj09cikzPT1sLmN0eXBlP2wudGFic1tyXT1hLnJlYWRCeXRlcyhpLG8sZSk6MD09bC5jdHlwZT9sLnRhYnNbcl09cyhpLG8pOjI9PWwuY3R5cGUmJihsLnRhYnNbcl09W3MoaSxvKSxzKGksbysyKSxzKGksbys0KV0pO2Vsc2UgaWYoXCJnQU1BXCI9PXIpbC50YWJzW3JdPWEucmVhZFVpbnQoaSxvKS8xZTU7ZWxzZSBpZihcInNSR0JcIj09cilsLnRhYnNbcl09aVtvXTtlbHNlIGlmKFwiYktHRFwiPT1yKTA9PWwuY3R5cGV8fDQ9PWwuY3R5cGU/bC50YWJzW3JdPVtzKGksbyldOjI9PWwuY3R5cGV8fDY9PWwuY3R5cGU/bC50YWJzW3JdPVtzKGksbykscyhpLG8rMikscyhpLG8rNCldOjM9PWwuY3R5cGUmJihsLnRhYnNbcl09aVtvXSk7ZWxzZSBpZihcIklFTkRcIj09cilicmVhaztvKz1lLGEucmVhZFVpbnQoaSxvKSxvKz00fXZhciBFO3JldHVybiAwIT1kJiYoKEU9bC5mcmFtZXNbbC5mcmFtZXMubGVuZ3RoLTFdKS5kYXRhPV9kZWNvbXByZXNzKGwsdS5zbGljZSgwLGQpLEUucmVjdC53aWR0aCxFLnJlY3QuaGVpZ2h0KSksbC5kYXRhPV9kZWNvbXByZXNzKGwsYyxsLndpZHRoLGwuaGVpZ2h0KSxkZWxldGUgbC5jb21wcmVzcyxkZWxldGUgbC5pbnRlcmxhY2UsZGVsZXRlIGwuZmlsdGVyLGx9LHRvUkdCQTg6ZnVuY3Rpb24gdG9SR0JBOChlKXtjb25zdCB0PWUud2lkdGgscj1lLmhlaWdodDtpZihudWxsPT1lLnRhYnMuYWNUTClyZXR1cm5bZGVjb2RlSW1hZ2UoZS5kYXRhLHQscixlKS5idWZmZXJdO2NvbnN0IGk9W107bnVsbD09ZS5mcmFtZXNbMF0uZGF0YSYmKGUuZnJhbWVzWzBdLmRhdGE9ZS5kYXRhKTtjb25zdCBvPXQqcio0LGE9bmV3IFVpbnQ4QXJyYXkobykscz1uZXcgVWludDhBcnJheShvKSxmPW5ldyBVaW50OEFycmF5KG8pO2ZvcihsZXQgYz0wO2M8ZS5mcmFtZXMubGVuZ3RoO2MrKyl7Y29uc3QgdT1lLmZyYW1lc1tjXSxoPXUucmVjdC54LGQ9dS5yZWN0LnksQT11LnJlY3Qud2lkdGgsZz11LnJlY3QuaGVpZ2h0LHA9ZGVjb2RlSW1hZ2UodS5kYXRhLEEsZyxlKTtpZigwIT1jKWZvcih2YXIgbD0wO2w8bztsKyspZltsXT1hW2xdO2lmKDA9PXUuYmxlbmQ/X2NvcHlUaWxlKHAsQSxnLGEsdCxyLGgsZCwwKToxPT11LmJsZW5kJiZfY29weVRpbGUocCxBLGcsYSx0LHIsaCxkLDEpLGkucHVzaChhLmJ1ZmZlci5zbGljZSgwKSksMD09dS5kaXNwb3NlKTtlbHNlIGlmKDE9PXUuZGlzcG9zZSlfY29weVRpbGUocyxBLGcsYSx0LHIsaCxkLDApO2Vsc2UgaWYoMj09dS5kaXNwb3NlKWZvcihsPTA7bDxvO2wrKylhW2xdPWZbbF19cmV0dXJuIGl9LF9wYWV0aDpfcGFldGgsX2NvcHlUaWxlOl9jb3B5VGlsZSxfYmluOmV9fSgpOyFmdW5jdGlvbigpe2NvbnN0e19jb3B5VGlsZTplfT1VUE5HLHtfYmluOnR9PVVQTkcscj1VUE5HLl9wYWV0aDt2YXIgaT17dGFibGU6ZnVuY3Rpb24oKXtjb25zdCBlPW5ldyBVaW50MzJBcnJheSgyNTYpO2ZvcihsZXQgdD0wO3Q8MjU2O3QrKyl7bGV0IHI9dDtmb3IobGV0IGU9MDtlPDg7ZSsrKTEmcj9yPTM5ODgyOTIzODRecj4+PjE6cj4+Pj0xO2VbdF09cn1yZXR1cm4gZX0oKSx1cGRhdGUoZSx0LHIsbyl7Zm9yKGxldCBhPTA7YTxvO2ErKyllPWkudGFibGVbMjU1JihlXnRbcithXSldXmU+Pj44O3JldHVybiBlfSxjcmM6KGUsdCxyKT0+NDI5NDk2NzI5NV5pLnVwZGF0ZSg0Mjk0OTY3Mjk1LGUsdCxyKX07ZnVuY3Rpb24gYWRkRXJyKGUsdCxyLGkpe3Rbcl0rPWVbMF0qaT4+NCx0W3IrMV0rPWVbMV0qaT4+NCx0W3IrMl0rPWVbMl0qaT4+NCx0W3IrM10rPWVbM10qaT4+NH1mdW5jdGlvbiBOKGUpe3JldHVybiBNYXRoLm1heCgwLE1hdGgubWluKDI1NSxlKSl9ZnVuY3Rpb24gRChlLHQpe2NvbnN0IHI9ZVswXS10WzBdLGk9ZVsxXS10WzFdLG89ZVsyXS10WzJdLGE9ZVszXS10WzNdO3JldHVybiByKnIraSppK28qbythKmF9ZnVuY3Rpb24gZGl0aGVyKGUsdCxyLGksbyxhLHMpe251bGw9PXMmJihzPTEpO2NvbnN0IGY9aS5sZW5ndGgsbD1bXTtmb3IodmFyIGM9MDtjPGY7YysrKXtjb25zdCBlPWlbY107bC5wdXNoKFtlPj4+MCYyNTUsZT4+PjgmMjU1LGU+Pj4xNiYyNTUsZT4+PjI0JjI1NV0pfWZvcihjPTA7YzxmO2MrKyl7bGV0IGU9NDI5NDk2NzI5NTtmb3IodmFyIHU9MCxoPTA7aDxmO2grKyl7dmFyIGQ9RChsW2NdLGxbaF0pO2ghPWMmJmQ8ZSYmKGU9ZCx1PWgpfX1jb25zdCBBPW5ldyBVaW50MzJBcnJheShvLmJ1ZmZlciksZz1uZXcgSW50MTZBcnJheSh0KnIqNCkscD1bMCw4LDIsMTAsMTIsNCwxNCw2LDMsMTEsMSw5LDE1LDcsMTMsNV07Zm9yKGM9MDtjPHAubGVuZ3RoO2MrKylwW2NdPTI1NSooKHBbY10rLjUpLzE2LS41KTtmb3IobGV0IG89MDtvPHI7bysrKWZvcihsZXQgdz0wO3c8dDt3Kyspe3ZhciBtO2M9NCoobyp0K3cpO2lmKDIhPXMpbT1bTihlW2NdK2dbY10pLE4oZVtjKzFdK2dbYysxXSksTihlW2MrMl0rZ1tjKzJdKSxOKGVbYyszXStnW2MrM10pXTtlbHNle2Q9cFs0KigzJm8pKygzJncpXTttPVtOKGVbY10rZCksTihlW2MrMV0rZCksTihlW2MrMl0rZCksTihlW2MrM10rZCldfXU9MDtsZXQgdj0xNjc3NzIxNTtmb3IoaD0wO2g8ZjtoKyspe2NvbnN0IGU9RChtLGxbaF0pO2U8diYmKHY9ZSx1PWgpfWNvbnN0IGI9bFt1XSx5PVttWzBdLWJbMF0sbVsxXS1iWzFdLG1bMl0tYlsyXSxtWzNdLWJbM11dOzE9PXMmJih3IT10LTEmJmFkZEVycih5LGcsYys0LDcpLG8hPXItMSYmKDAhPXcmJmFkZEVycih5LGcsYys0KnQtNCwzKSxhZGRFcnIoeSxnLGMrNCp0LDUpLHchPXQtMSYmYWRkRXJyKHksZyxjKzQqdCs0LDEpKSksYVtjPj4yXT11LEFbYz4+Ml09aVt1XX19ZnVuY3Rpb24gX21haW4oZSxyLG8sYSxzKXtudWxsPT1zJiYocz17fSk7Y29uc3R7Y3JjOmZ9PWksbD10LndyaXRlVWludCxjPXQud3JpdGVVc2hvcnQsdT10LndyaXRlQVNDSUk7bGV0IGg9ODtjb25zdCBkPWUuZnJhbWVzLmxlbmd0aD4xO2xldCBBLGc9ITEscD0zMysoZD8yMDowKTtpZihudWxsIT1zLnNSR0ImJihwKz0xMyksbnVsbCE9cy5wSFlzJiYocCs9MjEpLG51bGwhPXMuaUNDUCYmKEE9cGFrby5kZWZsYXRlKHMuaUNDUCkscCs9MjErQS5sZW5ndGgrNCksMz09ZS5jdHlwZSl7Zm9yKHZhciBtPWUucGx0ZS5sZW5ndGgsdz0wO3c8bTt3KyspZS5wbHRlW3ddPj4+MjQhPTI1NSYmKGc9ITApO3ArPTgrMyptKzQrKGc/OCsxKm0rNDowKX1mb3IodmFyIHY9MDt2PGUuZnJhbWVzLmxlbmd0aDt2Kyspe2QmJihwKz0zOCkscCs9KEY9ZS5mcmFtZXNbdl0pLmNpbWcubGVuZ3RoKzEyLDAhPXYmJihwKz00KX1wKz0xMjtjb25zdCBiPW5ldyBVaW50OEFycmF5KHApLHk9WzEzNyw4MCw3OCw3MSwxMywxMCwyNiwxMF07Zm9yKHc9MDt3PDg7dysrKWJbd109eVt3XTtpZihsKGIsaCwxMyksaCs9NCx1KGIsaCxcIklIRFJcIiksaCs9NCxsKGIsaCxyKSxoKz00LGwoYixoLG8pLGgrPTQsYltoXT1lLmRlcHRoLGgrKyxiW2hdPWUuY3R5cGUsaCsrLGJbaF09MCxoKyssYltoXT0wLGgrKyxiW2hdPTAsaCsrLGwoYixoLGYoYixoLTE3LDE3KSksaCs9NCxudWxsIT1zLnNSR0ImJihsKGIsaCwxKSxoKz00LHUoYixoLFwic1JHQlwiKSxoKz00LGJbaF09cy5zUkdCLGgrKyxsKGIsaCxmKGIsaC01LDUpKSxoKz00KSxudWxsIT1zLmlDQ1Ape2NvbnN0IGU9MTMrQS5sZW5ndGg7bChiLGgsZSksaCs9NCx1KGIsaCxcImlDQ1BcIiksaCs9NCx1KGIsaCxcIklDQyBwcm9maWxlXCIpLGgrPTExLGgrPTIsYi5zZXQoQSxoKSxoKz1BLmxlbmd0aCxsKGIsaCxmKGIsaC0oZSs0KSxlKzQpKSxoKz00fWlmKG51bGwhPXMucEhZcyYmKGwoYixoLDkpLGgrPTQsdShiLGgsXCJwSFlzXCIpLGgrPTQsbChiLGgscy5wSFlzWzBdKSxoKz00LGwoYixoLHMucEhZc1sxXSksaCs9NCxiW2hdPXMucEhZc1syXSxoKyssbChiLGgsZihiLGgtMTMsMTMpKSxoKz00KSxkJiYobChiLGgsOCksaCs9NCx1KGIsaCxcImFjVExcIiksaCs9NCxsKGIsaCxlLmZyYW1lcy5sZW5ndGgpLGgrPTQsbChiLGgsbnVsbCE9cy5sb29wP3MubG9vcDowKSxoKz00LGwoYixoLGYoYixoLTEyLDEyKSksaCs9NCksMz09ZS5jdHlwZSl7bChiLGgsMyoobT1lLnBsdGUubGVuZ3RoKSksaCs9NCx1KGIsaCxcIlBMVEVcIiksaCs9NDtmb3Iodz0wO3c8bTt3Kyspe2NvbnN0IHQ9Myp3LHI9ZS5wbHRlW3ddLGk9MjU1JnIsbz1yPj4+OCYyNTUsYT1yPj4+MTYmMjU1O2JbaCt0KzBdPWksYltoK3QrMV09byxiW2grdCsyXT1hfWlmKGgrPTMqbSxsKGIsaCxmKGIsaC0zKm0tNCwzKm0rNCkpLGgrPTQsZyl7bChiLGgsbSksaCs9NCx1KGIsaCxcInRSTlNcIiksaCs9NDtmb3Iodz0wO3c8bTt3KyspYltoK3ddPWUucGx0ZVt3XT4+PjI0JjI1NTtoKz1tLGwoYixoLGYoYixoLW0tNCxtKzQpKSxoKz00fX1sZXQgRT0wO2Zvcih2PTA7djxlLmZyYW1lcy5sZW5ndGg7disrKXt2YXIgRj1lLmZyYW1lc1t2XTtkJiYobChiLGgsMjYpLGgrPTQsdShiLGgsXCJmY1RMXCIpLGgrPTQsbChiLGgsRSsrKSxoKz00LGwoYixoLEYucmVjdC53aWR0aCksaCs9NCxsKGIsaCxGLnJlY3QuaGVpZ2h0KSxoKz00LGwoYixoLEYucmVjdC54KSxoKz00LGwoYixoLEYucmVjdC55KSxoKz00LGMoYixoLGFbdl0pLGgrPTIsYyhiLGgsMWUzKSxoKz0yLGJbaF09Ri5kaXNwb3NlLGgrKyxiW2hdPUYuYmxlbmQsaCsrLGwoYixoLGYoYixoLTMwLDMwKSksaCs9NCk7Y29uc3QgdD1GLmNpbWc7bChiLGgsKG09dC5sZW5ndGgpKygwPT12PzA6NCkpLGgrPTQ7Y29uc3Qgcj1oO3UoYixoLDA9PXY/XCJJREFUXCI6XCJmZEFUXCIpLGgrPTQsMCE9diYmKGwoYixoLEUrKyksaCs9NCksYi5zZXQodCxoKSxoKz1tLGwoYixoLGYoYixyLGgtcikpLGgrPTR9cmV0dXJuIGwoYixoLDApLGgrPTQsdShiLGgsXCJJRU5EXCIpLGgrPTQsbChiLGgsZihiLGgtNCw0KSksaCs9NCxiLmJ1ZmZlcn1mdW5jdGlvbiBjb21wcmVzc1BORyhlLHQscil7Zm9yKGxldCBpPTA7aTxlLmZyYW1lcy5sZW5ndGg7aSsrKXtjb25zdCBvPWUuZnJhbWVzW2ldO28ucmVjdC53aWR0aDtjb25zdCBhPW8ucmVjdC5oZWlnaHQscz1uZXcgVWludDhBcnJheShhKm8uYnBsK2EpO28uY2ltZz1fZmlsdGVyWmVybyhvLmltZyxhLG8uYnBwLG8uYnBsLHMsdCxyKX19ZnVuY3Rpb24gY29tcHJlc3ModCxyLGksbyxhKXtjb25zdCBzPWFbMF0sZj1hWzFdLGw9YVsyXSxjPWFbM10sdT1hWzRdLGg9YVs1XTtsZXQgZD02LEE9OCxnPTI1NTtmb3IodmFyIHA9MDtwPHQubGVuZ3RoO3ArKyl7Y29uc3QgZT1uZXcgVWludDhBcnJheSh0W3BdKTtmb3IodmFyIG09ZS5sZW5ndGgsdz0wO3c8bTt3Kz00KWcmPWVbdyszXX1jb25zdCB2PTI1NSE9ZyxiPWZ1bmN0aW9uIGZyYW1pemUodCxyLGksbyxhLHMpe2NvbnN0IGY9W107Zm9yKHZhciBsPTA7bDx0Lmxlbmd0aDtsKyspe2NvbnN0IGg9bmV3IFVpbnQ4QXJyYXkodFtsXSksQT1uZXcgVWludDMyQXJyYXkoaC5idWZmZXIpO3ZhciBjO2xldCBnPTAscD0wLG09cix3PWksdj1vPzE6MDtpZigwIT1sKXtjb25zdCBiPXN8fG98fDE9PWx8fDAhPWZbbC0yXS5kaXNwb3NlPzE6MjtsZXQgeT0wLEU9MWU5O2ZvcihsZXQgZT0wO2U8YjtlKyspe3ZhciB1PW5ldyBVaW50OEFycmF5KHRbbC0xLWVdKTtjb25zdCBvPW5ldyBVaW50MzJBcnJheSh0W2wtMS1lXSk7bGV0IHM9cixmPWksYz0tMSxoPS0xO2ZvcihsZXQgZT0wO2U8aTtlKyspZm9yKGxldCB0PTA7dDxyO3QrKyl7QVtkPWUqcit0XSE9b1tkXSYmKHQ8cyYmKHM9dCksdD5jJiYoYz10KSxlPGYmJihmPWUpLGU+aCYmKGg9ZSkpfS0xPT1jJiYocz1mPWM9aD0wKSxhJiYoMT09KDEmcykmJnMtLSwxPT0oMSZmKSYmZi0tKTtjb25zdCB2PShjLXMrMSkqKGgtZisxKTt2PEUmJihFPXYseT1lLGc9cyxwPWYsbT1jLXMrMSx3PWgtZisxKX11PW5ldyBVaW50OEFycmF5KHRbbC0xLXldKTsxPT15JiYoZltsLTFdLmRpc3Bvc2U9MiksYz1uZXcgVWludDhBcnJheShtKncqNCksZSh1LHIsaSxjLG0sdywtZywtcCwwKSx2PWUoaCxyLGksYyxtLHcsLWcsLXAsMyk/MTowLDE9PXY/X3ByZXBhcmVEaWZmKGgscixpLGMse3g6Zyx5OnAsd2lkdGg6bSxoZWlnaHQ6d30pOmUoaCxyLGksYyxtLHcsLWcsLXAsMCl9ZWxzZSBjPWguc2xpY2UoMCk7Zi5wdXNoKHtyZWN0Ont4OmcseTpwLHdpZHRoOm0saGVpZ2h0Ond9LGltZzpjLGJsZW5kOnYsZGlzcG9zZTowfSl9aWYobylmb3IobD0wO2w8Zi5sZW5ndGg7bCsrKXtpZigxPT0oQT1mW2xdKS5ibGVuZCljb250aW51ZTtjb25zdCBlPUEucmVjdCxvPWZbbC0xXS5yZWN0LHM9TWF0aC5taW4oZS54LG8ueCksYz1NYXRoLm1pbihlLnksby55KSx1PXt4OnMseTpjLHdpZHRoOk1hdGgubWF4KGUueCtlLndpZHRoLG8ueCtvLndpZHRoKS1zLGhlaWdodDpNYXRoLm1heChlLnkrZS5oZWlnaHQsby55K28uaGVpZ2h0KS1jfTtmW2wtMV0uZGlzcG9zZT0xLGwtMSE9MCYmX3VwZGF0ZUZyYW1lKHQscixpLGYsbC0xLHUsYSksX3VwZGF0ZUZyYW1lKHQscixpLGYsbCx1LGEpfWxldCBoPTA7aWYoMSE9dC5sZW5ndGgpZm9yKHZhciBkPTA7ZDxmLmxlbmd0aDtkKyspe3ZhciBBO2grPShBPWZbZF0pLnJlY3Qud2lkdGgqQS5yZWN0LmhlaWdodH1yZXR1cm4gZn0odCxyLGkscyxmLGwpLHk9e30sRT1bXSxGPVtdO2lmKDAhPW8pe2NvbnN0IGU9W107Zm9yKHc9MDt3PGIubGVuZ3RoO3crKyllLnB1c2goYlt3XS5pbWcuYnVmZmVyKTtjb25zdCB0PWZ1bmN0aW9uIGNvbmNhdFJHQkEoZSl7bGV0IHQ9MDtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyl0Kz1lW3JdLmJ5dGVMZW5ndGg7Y29uc3QgaT1uZXcgVWludDhBcnJheSh0KTtsZXQgbz0wO2ZvcihyPTA7cjxlLmxlbmd0aDtyKyspe2NvbnN0IHQ9bmV3IFVpbnQ4QXJyYXkoZVtyXSksYT10Lmxlbmd0aDtmb3IobGV0IGU9MDtlPGE7ZSs9NCl7bGV0IHI9dFtlXSxhPXRbZSsxXSxzPXRbZSsyXTtjb25zdCBmPXRbZSszXTswPT1mJiYocj1hPXM9MCksaVtvK2VdPXIsaVtvK2UrMV09YSxpW28rZSsyXT1zLGlbbytlKzNdPWZ9bys9YX1yZXR1cm4gaS5idWZmZXJ9KGUpLHI9cXVhbnRpemUodCxvKTtmb3Iodz0wO3c8ci5wbHRlLmxlbmd0aDt3KyspRS5wdXNoKHIucGx0ZVt3XS5lc3QucmdiYSk7bGV0IGk9MDtmb3Iodz0wO3c8Yi5sZW5ndGg7dysrKXtjb25zdCBlPShCPWJbd10pLmltZy5sZW5ndGg7dmFyIF89bmV3IFVpbnQ4QXJyYXkoci5pbmRzLmJ1ZmZlcixpPj4yLGU+PjIpO0YucHVzaChfKTtjb25zdCB0PW5ldyBVaW50OEFycmF5KHIuYWJ1ZixpLGUpO2gmJmRpdGhlcihCLmltZyxCLnJlY3Qud2lkdGgsQi5yZWN0LmhlaWdodCxFLHQsXyksQi5pbWcuc2V0KHQpLGkrPWV9fWVsc2UgZm9yKHA9MDtwPGIubGVuZ3RoO3ArKyl7dmFyIEI9YltwXTtjb25zdCBlPW5ldyBVaW50MzJBcnJheShCLmltZy5idWZmZXIpO3ZhciBVPUIucmVjdC53aWR0aDttPWUubGVuZ3RoLF89bmV3IFVpbnQ4QXJyYXkobSk7Ri5wdXNoKF8pO2Zvcih3PTA7dzxtO3crKyl7Y29uc3QgdD1lW3ddO2lmKDAhPXcmJnQ9PWVbdy0xXSlfW3ddPV9bdy0xXTtlbHNlIGlmKHc+VSYmdD09ZVt3LVVdKV9bd109X1t3LVVdO2Vsc2V7bGV0IGU9eVt0XTtpZihudWxsPT1lJiYoeVt0XT1lPUUubGVuZ3RoLEUucHVzaCh0KSxFLmxlbmd0aD49MzAwKSlicmVhaztfW3ddPWV9fX1jb25zdCBDPUUubGVuZ3RoO0M8PTI1NiYmMD09dSYmKEE9Qzw9Mj8xOkM8PTQ/MjpDPD0xNj80OjgsQT1NYXRoLm1heChBLGMpKTtmb3IocD0wO3A8Yi5sZW5ndGg7cCsrKXsoQj1iW3BdKS5yZWN0LngsQi5yZWN0Lnk7VT1CLnJlY3Qud2lkdGg7Y29uc3QgZT1CLnJlY3QuaGVpZ2h0O2xldCB0PUIuaW1nO25ldyBVaW50MzJBcnJheSh0LmJ1ZmZlcik7bGV0IHI9NCpVLGk9NDtpZihDPD0yNTYmJjA9PXUpe3I9TWF0aC5jZWlsKEEqVS84KTt2YXIgST1uZXcgVWludDhBcnJheShyKmUpO2NvbnN0IG89RltwXTtmb3IobGV0IHQ9MDt0PGU7dCsrKXt3PXQqcjtjb25zdCBlPXQqVTtpZig4PT1BKWZvcih2YXIgUT0wO1E8VTtRKyspSVt3K1FdPW9bZStRXTtlbHNlIGlmKDQ9PUEpZm9yKFE9MDtRPFU7USsrKUlbdysoUT4+MSldfD1vW2UrUV08PDQtNCooMSZRKTtlbHNlIGlmKDI9PUEpZm9yKFE9MDtRPFU7USsrKUlbdysoUT4+MildfD1vW2UrUV08PDYtMiooMyZRKTtlbHNlIGlmKDE9PUEpZm9yKFE9MDtRPFU7USsrKUlbdysoUT4+MyldfD1vW2UrUV08PDctMSooNyZRKX10PUksZD0zLGk9MX1lbHNlIGlmKDA9PXYmJjE9PWIubGVuZ3RoKXtJPW5ldyBVaW50OEFycmF5KFUqZSozKTtjb25zdCBvPVUqZTtmb3Iodz0wO3c8bzt3Kyspe2NvbnN0IGU9Myp3LHI9NCp3O0lbZV09dFtyXSxJW2UrMV09dFtyKzFdLElbZSsyXT10W3IrMl19dD1JLGQ9MixpPTMscj0zKlV9Qi5pbWc9dCxCLmJwbD1yLEIuYnBwPWl9cmV0dXJue2N0eXBlOmQsZGVwdGg6QSxwbHRlOkUsZnJhbWVzOmJ9fWZ1bmN0aW9uIF91cGRhdGVGcmFtZSh0LHIsaSxvLGEscyxmKXtjb25zdCBsPVVpbnQ4QXJyYXksYz1VaW50MzJBcnJheSx1PW5ldyBsKHRbYS0xXSksaD1uZXcgYyh0W2EtMV0pLGQ9YSsxPHQubGVuZ3RoP25ldyBsKHRbYSsxXSk6bnVsbCxBPW5ldyBsKHRbYV0pLGc9bmV3IGMoQS5idWZmZXIpO2xldCBwPXIsbT1pLHc9LTEsdj0tMTtmb3IobGV0IGU9MDtlPHMuaGVpZ2h0O2UrKylmb3IobGV0IHQ9MDt0PHMud2lkdGg7dCsrKXtjb25zdCBpPXMueCt0LGY9cy55K2UsbD1mKnIraSxjPWdbbF07MD09Y3x8MD09b1thLTFdLmRpc3Bvc2UmJmhbbF09PWMmJihudWxsPT1kfHwwIT1kWzQqbCszXSl8fChpPHAmJihwPWkpLGk+dyYmKHc9aSksZjxtJiYobT1mKSxmPnYmJih2PWYpKX0tMT09dyYmKHA9bT13PXY9MCksZiYmKDE9PSgxJnApJiZwLS0sMT09KDEmbSkmJm0tLSkscz17eDpwLHk6bSx3aWR0aDp3LXArMSxoZWlnaHQ6di1tKzF9O2NvbnN0IGI9b1thXTtiLnJlY3Q9cyxiLmJsZW5kPTEsYi5pbWc9bmV3IFVpbnQ4QXJyYXkocy53aWR0aCpzLmhlaWdodCo0KSwwPT1vW2EtMV0uZGlzcG9zZT8oZSh1LHIsaSxiLmltZyxzLndpZHRoLHMuaGVpZ2h0LC1zLngsLXMueSwwKSxfcHJlcGFyZURpZmYoQSxyLGksYi5pbWcscykpOmUoQSxyLGksYi5pbWcscy53aWR0aCxzLmhlaWdodCwtcy54LC1zLnksMCl9ZnVuY3Rpb24gX3ByZXBhcmVEaWZmKHQscixpLG8sYSl7ZSh0LHIsaSxvLGEud2lkdGgsYS5oZWlnaHQsLWEueCwtYS55LDIpfWZ1bmN0aW9uIF9maWx0ZXJaZXJvKGUsdCxyLGksbyxhLHMpe2NvbnN0IGY9W107bGV0IGwsYz1bMCwxLDIsMyw0XTstMSE9YT9jPVthXToodCppPjVlNXx8MT09cikmJihjPVswXSkscyYmKGw9e2xldmVsOjB9KTtjb25zdCB1PVVaSVA7Zm9yKHZhciBoPTA7aDxjLmxlbmd0aDtoKyspe2ZvcihsZXQgYT0wO2E8dDthKyspX2ZpbHRlckxpbmUobyxlLGEsaSxyLGNbaF0pO2YucHVzaCh1LmRlZmxhdGUobyxsKSl9bGV0IGQsQT0xZTk7Zm9yKGg9MDtoPGYubGVuZ3RoO2grKylmW2hdLmxlbmd0aDxBJiYoZD1oLEE9ZltoXS5sZW5ndGgpO3JldHVybiBmW2RdfWZ1bmN0aW9uIF9maWx0ZXJMaW5lKGUsdCxpLG8sYSxzKXtjb25zdCBmPWkqbztsZXQgbD1mK2k7aWYoZVtsXT1zLGwrKywwPT1zKWlmKG88NTAwKWZvcih2YXIgYz0wO2M8bztjKyspZVtsK2NdPXRbZitjXTtlbHNlIGUuc2V0KG5ldyBVaW50OEFycmF5KHQuYnVmZmVyLGYsbyksbCk7ZWxzZSBpZigxPT1zKXtmb3IoYz0wO2M8YTtjKyspZVtsK2NdPXRbZitjXTtmb3IoYz1hO2M8bztjKyspZVtsK2NdPXRbZitjXS10W2YrYy1hXSsyNTYmMjU1fWVsc2UgaWYoMD09aSl7Zm9yKGM9MDtjPGE7YysrKWVbbCtjXT10W2YrY107aWYoMj09cylmb3IoYz1hO2M8bztjKyspZVtsK2NdPXRbZitjXTtpZigzPT1zKWZvcihjPWE7YzxvO2MrKyllW2wrY109dFtmK2NdLSh0W2YrYy1hXT4+MSkrMjU2JjI1NTtpZig0PT1zKWZvcihjPWE7YzxvO2MrKyllW2wrY109dFtmK2NdLXIodFtmK2MtYV0sMCwwKSsyNTYmMjU1fWVsc2V7aWYoMj09cylmb3IoYz0wO2M8bztjKyspZVtsK2NdPXRbZitjXSsyNTYtdFtmK2Mtb10mMjU1O2lmKDM9PXMpe2ZvcihjPTA7YzxhO2MrKyllW2wrY109dFtmK2NdKzI1Ni0odFtmK2Mtb10+PjEpJjI1NTtmb3IoYz1hO2M8bztjKyspZVtsK2NdPXRbZitjXSsyNTYtKHRbZitjLW9dK3RbZitjLWFdPj4xKSYyNTV9aWYoND09cyl7Zm9yKGM9MDtjPGE7YysrKWVbbCtjXT10W2YrY10rMjU2LXIoMCx0W2YrYy1vXSwwKSYyNTU7Zm9yKGM9YTtjPG87YysrKWVbbCtjXT10W2YrY10rMjU2LXIodFtmK2MtYV0sdFtmK2Mtb10sdFtmK2MtYS1vXSkmMjU1fX19ZnVuY3Rpb24gcXVhbnRpemUoZSx0KXtjb25zdCByPW5ldyBVaW50OEFycmF5KGUpLGk9ci5zbGljZSgwKSxvPW5ldyBVaW50MzJBcnJheShpLmJ1ZmZlciksYT1nZXRLRHRyZWUoaSx0KSxzPWFbMF0sZj1hWzFdLGw9ci5sZW5ndGgsYz1uZXcgVWludDhBcnJheShsPj4yKTtsZXQgdTtpZihyLmxlbmd0aDwyZTcpZm9yKHZhciBoPTA7aDxsO2grPTQpe3U9Z2V0TmVhcmVzdChzLGQ9cltoXSooMS8yNTUpLEE9cltoKzFdKigxLzI1NSksZz1yW2grMl0qKDEvMjU1KSxwPXJbaCszXSooMS8yNTUpKSxjW2g+PjJdPXUuaW5kLG9baD4+Ml09dS5lc3QucmdiYX1lbHNlIGZvcihoPTA7aDxsO2grPTQpe3ZhciBkPXJbaF0qKDEvMjU1KSxBPXJbaCsxXSooMS8yNTUpLGc9cltoKzJdKigxLzI1NSkscD1yW2grM10qKDEvMjU1KTtmb3IodT1zO3UubGVmdDspdT1wbGFuZURzdCh1LmVzdCxkLEEsZyxwKTw9MD91LmxlZnQ6dS5yaWdodDtjW2g+PjJdPXUuaW5kLG9baD4+Ml09dS5lc3QucmdiYX1yZXR1cm57YWJ1ZjppLmJ1ZmZlcixpbmRzOmMscGx0ZTpmfX1mdW5jdGlvbiBnZXRLRHRyZWUoZSx0LHIpe251bGw9PXImJihyPTFlLTQpO2NvbnN0IGk9bmV3IFVpbnQzMkFycmF5KGUuYnVmZmVyKSxvPXtpMDowLGkxOmUubGVuZ3RoLGJzdDpudWxsLGVzdDpudWxsLHRkc3Q6MCxsZWZ0Om51bGwscmlnaHQ6bnVsbH07by5ic3Q9c3RhdHMoZSxvLmkwLG8uaTEpLG8uZXN0PWVzdGF0cyhvLmJzdCk7Y29uc3QgYT1bb107Zm9yKDthLmxlbmd0aDx0Oyl7bGV0IHQ9MCxvPTA7Zm9yKHZhciBzPTA7czxhLmxlbmd0aDtzKyspYVtzXS5lc3QuTD50JiYodD1hW3NdLmVzdC5MLG89cyk7aWYodDxyKWJyZWFrO2NvbnN0IGY9YVtvXSxsPXNwbGl0UGl4ZWxzKGUsaSxmLmkwLGYuaTEsZi5lc3QuZSxmLmVzdC5lTXEyNTUpO2lmKGYuaTA+PWx8fGYuaTE8PWwpe2YuZXN0Lkw9MDtjb250aW51ZX1jb25zdCBjPXtpMDpmLmkwLGkxOmwsYnN0Om51bGwsZXN0Om51bGwsdGRzdDowLGxlZnQ6bnVsbCxyaWdodDpudWxsfTtjLmJzdD1zdGF0cyhlLGMuaTAsYy5pMSksYy5lc3Q9ZXN0YXRzKGMuYnN0KTtjb25zdCB1PXtpMDpsLGkxOmYuaTEsYnN0Om51bGwsZXN0Om51bGwsdGRzdDowLGxlZnQ6bnVsbCxyaWdodDpudWxsfTt1LmJzdD17UjpbXSxtOltdLE46Zi5ic3QuTi1jLmJzdC5OfTtmb3Iocz0wO3M8MTY7cysrKXUuYnN0LlJbc109Zi5ic3QuUltzXS1jLmJzdC5SW3NdO2ZvcihzPTA7czw0O3MrKyl1LmJzdC5tW3NdPWYuYnN0Lm1bc10tYy5ic3QubVtzXTt1LmVzdD1lc3RhdHModS5ic3QpLGYubGVmdD1jLGYucmlnaHQ9dSxhW29dPWMsYS5wdXNoKHUpfWEuc29ydCgoKGUsdCk9PnQuYnN0Lk4tZS5ic3QuTikpO2ZvcihzPTA7czxhLmxlbmd0aDtzKyspYVtzXS5pbmQ9cztyZXR1cm5bbyxhXX1mdW5jdGlvbiBnZXROZWFyZXN0KGUsdCxyLGksbyl7aWYobnVsbD09ZS5sZWZ0KXJldHVybiBlLnRkc3Q9ZnVuY3Rpb24gZGlzdChlLHQscixpLG8pe2NvbnN0IGE9dC1lWzBdLHM9ci1lWzFdLGY9aS1lWzJdLGw9by1lWzNdO3JldHVybiBhKmErcypzK2YqZitsKmx9KGUuZXN0LnEsdCxyLGksbyksZTtjb25zdCBhPXBsYW5lRHN0KGUuZXN0LHQscixpLG8pO2xldCBzPWUubGVmdCxmPWUucmlnaHQ7YT4wJiYocz1lLnJpZ2h0LGY9ZS5sZWZ0KTtjb25zdCBsPWdldE5lYXJlc3Qocyx0LHIsaSxvKTtpZihsLnRkc3Q8PWEqYSlyZXR1cm4gbDtjb25zdCBjPWdldE5lYXJlc3QoZix0LHIsaSxvKTtyZXR1cm4gYy50ZHN0PGwudGRzdD9jOmx9ZnVuY3Rpb24gcGxhbmVEc3QoZSx0LHIsaSxvKXtjb25zdHtlOmF9PWU7cmV0dXJuIGFbMF0qdCthWzFdKnIrYVsyXSppK2FbM10qby1lLmVNcX1mdW5jdGlvbiBzcGxpdFBpeGVscyhlLHQscixpLG8sYSl7Zm9yKGktPTQ7cjxpOyl7Zm9yKDt2ZWNEb3QoZSxyLG8pPD1hOylyKz00O2Zvcig7dmVjRG90KGUsaSxvKT5hOylpLT00O2lmKHI+PWkpYnJlYWs7Y29uc3Qgcz10W3I+PjJdO3Rbcj4+Ml09dFtpPj4yXSx0W2k+PjJdPXMscis9NCxpLT00fWZvcig7dmVjRG90KGUscixvKT5hOylyLT00O3JldHVybiByKzR9ZnVuY3Rpb24gdmVjRG90KGUsdCxyKXtyZXR1cm4gZVt0XSpyWzBdK2VbdCsxXSpyWzFdK2VbdCsyXSpyWzJdK2VbdCszXSpyWzNdfWZ1bmN0aW9uIHN0YXRzKGUsdCxyKXtjb25zdCBpPVswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxvPVswLDAsMCwwXSxhPXItdD4+Mjtmb3IobGV0IGE9dDthPHI7YSs9NCl7Y29uc3QgdD1lW2FdKigxLzI1NSkscj1lW2ErMV0qKDEvMjU1KSxzPWVbYSsyXSooMS8yNTUpLGY9ZVthKzNdKigxLzI1NSk7b1swXSs9dCxvWzFdKz1yLG9bMl0rPXMsb1szXSs9ZixpWzBdKz10KnQsaVsxXSs9dCpyLGlbMl0rPXQqcyxpWzNdKz10KmYsaVs1XSs9cipyLGlbNl0rPXIqcyxpWzddKz1yKmYsaVsxMF0rPXMqcyxpWzExXSs9cypmLGlbMTVdKz1mKmZ9cmV0dXJuIGlbNF09aVsxXSxpWzhdPWlbMl0saVs5XT1pWzZdLGlbMTJdPWlbM10saVsxM109aVs3XSxpWzE0XT1pWzExXSx7UjppLG06byxOOmF9fWZ1bmN0aW9uIGVzdGF0cyhlKXtjb25zdHtSOnR9PWUse206cn09ZSx7TjppfT1lLGE9clswXSxzPXJbMV0sZj1yWzJdLGw9clszXSxjPTA9PWk/MDoxL2ksdT1bdFswXS1hKmEqYyx0WzFdLWEqcypjLHRbMl0tYSpmKmMsdFszXS1hKmwqYyx0WzRdLXMqYSpjLHRbNV0tcypzKmMsdFs2XS1zKmYqYyx0WzddLXMqbCpjLHRbOF0tZiphKmMsdFs5XS1mKnMqYyx0WzEwXS1mKmYqYyx0WzExXS1mKmwqYyx0WzEyXS1sKmEqYyx0WzEzXS1sKnMqYyx0WzE0XS1sKmYqYyx0WzE1XS1sKmwqY10saD11LGQ9bztsZXQgQT1bTWF0aC5yYW5kb20oKSxNYXRoLnJhbmRvbSgpLE1hdGgucmFuZG9tKCksTWF0aC5yYW5kb20oKV0sZz0wLHA9MDtpZigwIT1pKWZvcihsZXQgZT0wO2U8MTYmJihBPWQubXVsdFZlYyhoLEEpLHA9TWF0aC5zcXJ0KGQuZG90KEEsQSkpLEE9ZC5zbWwoMS9wLEEpLCEoMCE9ZSYmTWF0aC5hYnMocC1nKTwxZS05KSk7ZSsrKWc9cDtjb25zdCBtPVthKmMscypjLGYqYyxsKmNdO3JldHVybntDb3Y6dSxxOm0sZTpBLEw6ZyxlTXEyNTU6ZC5kb3QoZC5zbWwoMjU1LG0pLEEpLGVNcTpkLmRvdChBLG0pLHJnYmE6KE1hdGgucm91bmQoMjU1Km1bM10pPDwyNHxNYXRoLnJvdW5kKDI1NSptWzJdKTw8MTZ8TWF0aC5yb3VuZCgyNTUqbVsxXSk8PDh8TWF0aC5yb3VuZCgyNTUqbVswXSk8PDApPj4+MH19dmFyIG89e211bHRWZWM6KGUsdCk9PltlWzBdKnRbMF0rZVsxXSp0WzFdK2VbMl0qdFsyXStlWzNdKnRbM10sZVs0XSp0WzBdK2VbNV0qdFsxXStlWzZdKnRbMl0rZVs3XSp0WzNdLGVbOF0qdFswXStlWzldKnRbMV0rZVsxMF0qdFsyXStlWzExXSp0WzNdLGVbMTJdKnRbMF0rZVsxM10qdFsxXStlWzE0XSp0WzJdK2VbMTVdKnRbM11dLGRvdDooZSx0KT0+ZVswXSp0WzBdK2VbMV0qdFsxXStlWzJdKnRbMl0rZVszXSp0WzNdLHNtbDooZSx0KT0+W2UqdFswXSxlKnRbMV0sZSp0WzJdLGUqdFszXV19O1VQTkcuZW5jb2RlPWZ1bmN0aW9uIGVuY29kZShlLHQscixpLG8sYSxzKXtudWxsPT1pJiYoaT0wKSxudWxsPT1zJiYocz0hMSk7Y29uc3QgZj1jb21wcmVzcyhlLHQscixpLFshMSwhMSwhMSwwLHMsITFdKTtyZXR1cm4gY29tcHJlc3NQTkcoZiwtMSksX21haW4oZix0LHIsbyxhKX0sVVBORy5lbmNvZGVMTD1mdW5jdGlvbiBlbmNvZGVMTChlLHQscixpLG8sYSxzLGYpe2NvbnN0IGw9e2N0eXBlOjArKDE9PWk/MDoyKSsoMD09bz8wOjQpLGRlcHRoOmEsZnJhbWVzOltdfSxjPShpK28pKmEsdT1jKnQ7Zm9yKGxldCBpPTA7aTxlLmxlbmd0aDtpKyspbC5mcmFtZXMucHVzaCh7cmVjdDp7eDowLHk6MCx3aWR0aDp0LGhlaWdodDpyfSxpbWc6bmV3IFVpbnQ4QXJyYXkoZVtpXSksYmxlbmQ6MCxkaXNwb3NlOjEsYnBwOk1hdGguY2VpbChjLzgpLGJwbDpNYXRoLmNlaWwodS84KX0pO3JldHVybiBjb21wcmVzc1BORyhsLDAsITApLF9tYWluKGwsdCxyLHMsZil9LFVQTkcuZW5jb2RlLmNvbXByZXNzPWNvbXByZXNzLFVQTkcuZW5jb2RlLmRpdGhlcj1kaXRoZXIsVVBORy5xdWFudGl6ZT1xdWFudGl6ZSxVUE5HLnF1YW50aXplLmdldEtEdHJlZT1nZXRLRHRyZWUsVVBORy5xdWFudGl6ZS5nZXROZWFyZXN0PWdldE5lYXJlc3R9KCk7Y29uc3Qgcj17dG9BcnJheUJ1ZmZlcihlLHQpe2NvbnN0IGk9ZS53aWR0aCxvPWUuaGVpZ2h0LGE9aTw8MixzPWUuZ2V0Q29udGV4dChcIjJkXCIpLmdldEltYWdlRGF0YSgwLDAsaSxvKSxmPW5ldyBVaW50MzJBcnJheShzLmRhdGEuYnVmZmVyKSxsPSgzMippKzMxKS8zMjw8MixjPWwqbyx1PTEyMitjLGg9bmV3IEFycmF5QnVmZmVyKHUpLGQ9bmV3IERhdGFWaWV3KGgpLEE9MTw8MjA7bGV0IGcscCxtLHcsdj1BLGI9MCx5PTAsRT0wO2Z1bmN0aW9uIHNldDE2KGUpe2Quc2V0VWludDE2KHksZSwhMCkseSs9Mn1mdW5jdGlvbiBzZXQzMihlKXtkLnNldFVpbnQzMih5LGUsITApLHkrPTR9ZnVuY3Rpb24gc2VlayhlKXt5Kz1lfXNldDE2KDE5Nzc4KSxzZXQzMih1KSxzZWVrKDQpLHNldDMyKDEyMiksc2V0MzIoMTA4KSxzZXQzMihpKSxzZXQzMigtbz4+PjApLHNldDE2KDEpLHNldDE2KDMyKSxzZXQzMigzKSxzZXQzMihjKSxzZXQzMigyODM1KSxzZXQzMigyODM1KSxzZWVrKDgpLHNldDMyKDE2NzExNjgwKSxzZXQzMig2NTI4MCksc2V0MzIoMjU1KSxzZXQzMig0Mjc4MTkwMDgwKSxzZXQzMigxNDY2NTI3MjY0KSxmdW5jdGlvbiBjb252ZXJ0KCl7Zm9yKDtiPG8mJnY+MDspe2Zvcih3PTEyMitiKmwsZz0wO2c8YTspdi0tLHA9ZltFKytdLG09cD4+PjI0LGQuc2V0VWludDMyKHcrZyxwPDw4fG0pLGcrPTQ7YisrfUU8Zi5sZW5ndGg/KHY9QSxzZXRUaW1lb3V0KGNvbnZlcnQsci5fZGx5KSk6dChoKX0oKX0sdG9CbG9iKGUsdCl7dGhpcy50b0FycmF5QnVmZmVyKGUsKGU9Pnt0KG5ldyBCbG9iKFtlXSx7dHlwZTpcImltYWdlL2JtcFwifSkpfSkpfSxfZGx5Ojl9O3ZhciBpPXtDSFJPTUU6XCJDSFJPTUVcIixGSVJFRk9YOlwiRklSRUZPWFwiLERFU0tUT1BfU0FGQVJJOlwiREVTS1RPUF9TQUZBUklcIixJRTpcIklFXCIsSU9TOlwiSU9TXCIsRVRDOlwiRVRDXCJ9LG89e1tpLkNIUk9NRV06MTYzODQsW2kuRklSRUZPWF06MTExODAsW2kuREVTS1RPUF9TQUZBUkldOjE2Mzg0LFtpLklFXTo4MTkyLFtpLklPU106NDA5NixbaS5FVENdOjgxOTJ9O2NvbnN0IGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSYmc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlLGY9YSYmd2luZG93LmNvcmRvdmEmJndpbmRvdy5jb3Jkb3ZhLnJlcXVpcmUmJndpbmRvdy5jb3Jkb3ZhLnJlcXVpcmUoXCJjb3Jkb3ZhL21vZHVsZW1hcHBlclwiKSxDdXN0b21GaWxlPShhfHxzKSYmKGYmJmYuZ2V0T3JpZ2luYWxTeW1ib2wod2luZG93LFwiRmlsZVwiKXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGUmJkZpbGUpLEN1c3RvbUZpbGVSZWFkZXI9KGF8fHMpJiYoZiYmZi5nZXRPcmlnaW5hbFN5bWJvbCh3aW5kb3csXCJGaWxlUmVhZGVyXCIpfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlciYmRmlsZVJlYWRlcik7ZnVuY3Rpb24gZ2V0RmlsZWZyb21EYXRhVXJsKGUsdCxyPURhdGUubm93KCkpe3JldHVybiBuZXcgUHJvbWlzZSgoaT0+e2NvbnN0IG89ZS5zcGxpdChcIixcIiksYT1vWzBdLm1hdGNoKC86KC4qPyk7LylbMV0scz1nbG9iYWxUaGlzLmF0b2Iob1sxXSk7bGV0IGY9cy5sZW5ndGg7Y29uc3QgbD1uZXcgVWludDhBcnJheShmKTtmb3IoO2YtLTspbFtmXT1zLmNoYXJDb2RlQXQoZik7Y29uc3QgYz1uZXcgQmxvYihbbF0se3R5cGU6YX0pO2MubmFtZT10LGMubGFzdE1vZGlmaWVkPXIsaShjKX0pKX1mdW5jdGlvbiBnZXREYXRhVXJsRnJvbUZpbGUoZSl7cmV0dXJuIG5ldyBQcm9taXNlKCgodCxyKT0+e2NvbnN0IGk9bmV3IEN1c3RvbUZpbGVSZWFkZXI7aS5vbmxvYWQ9KCk9PnQoaS5yZXN1bHQpLGkub25lcnJvcj1lPT5yKGUpLGkucmVhZEFzRGF0YVVSTChlKX0pKX1mdW5jdGlvbiBsb2FkSW1hZ2UoZSl7cmV0dXJuIG5ldyBQcm9taXNlKCgodCxyKT0+e2NvbnN0IGk9bmV3IEltYWdlO2kub25sb2FkPSgpPT50KGkpLGkub25lcnJvcj1lPT5yKGUpLGkuc3JjPWV9KSl9ZnVuY3Rpb24gZ2V0QnJvd3Nlck5hbWUoKXtpZih2b2lkIDAhPT1nZXRCcm93c2VyTmFtZS5jYWNoZWRSZXN1bHQpcmV0dXJuIGdldEJyb3dzZXJOYW1lLmNhY2hlZFJlc3VsdDtsZXQgZT1pLkVUQztjb25zdHt1c2VyQWdlbnQ6dH09bmF2aWdhdG9yO3JldHVybi9DaHJvbShlfGl1bSkvaS50ZXN0KHQpP2U9aS5DSFJPTUU6L2lQKGFkfG9kfGhvbmUpL2kudGVzdCh0KSYmL1dlYktpdC9pLnRlc3QodCk/ZT1pLklPUzovU2FmYXJpL2kudGVzdCh0KT9lPWkuREVTS1RPUF9TQUZBUkk6L0ZpcmVmb3gvaS50ZXN0KHQpP2U9aS5GSVJFRk9YOigvTVNJRS9pLnRlc3QodCl8fCEwPT0hIWRvY3VtZW50LmRvY3VtZW50TW9kZSkmJihlPWkuSUUpLGdldEJyb3dzZXJOYW1lLmNhY2hlZFJlc3VsdD1lLGdldEJyb3dzZXJOYW1lLmNhY2hlZFJlc3VsdH1mdW5jdGlvbiBhcHByb3hpbWF0ZUJlbG93TWF4aW11bUNhbnZhc1NpemVPZkJyb3dzZXIoZSx0KXtjb25zdCByPWdldEJyb3dzZXJOYW1lKCksaT1vW3JdO2xldCBhPWUscz10LGY9YSpzO2NvbnN0IGw9YT5zP3MvYTphL3M7Zm9yKDtmPmkqaTspe2NvbnN0IGU9KGkrYSkvMix0PShpK3MpLzI7ZTx0PyhzPXQsYT10KmwpOihzPWUqbCxhPWUpLGY9YSpzfXJldHVybnt3aWR0aDphLGhlaWdodDpzfX1mdW5jdGlvbiBnZXROZXdDYW52YXNBbmRDdHgoZSx0KXtsZXQgcixpO3RyeXtpZihyPW5ldyBPZmZzY3JlZW5DYW52YXMoZSx0KSxpPXIuZ2V0Q29udGV4dChcIjJkXCIpLG51bGw9PT1pKXRocm93IG5ldyBFcnJvcihcImdldENvbnRleHQgb2YgT2Zmc2NyZWVuQ2FudmFzIHJldHVybnMgbnVsbFwiKX1jYXRjaChlKXtyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksaT1yLmdldENvbnRleHQoXCIyZFwiKX1yZXR1cm4gci53aWR0aD1lLHIuaGVpZ2h0PXQsW3IsaV19ZnVuY3Rpb24gZHJhd0ltYWdlSW5DYW52YXMoZSx0KXtjb25zdHt3aWR0aDpyLGhlaWdodDppfT1hcHByb3hpbWF0ZUJlbG93TWF4aW11bUNhbnZhc1NpemVPZkJyb3dzZXIoZS53aWR0aCxlLmhlaWdodCksW28sYV09Z2V0TmV3Q2FudmFzQW5kQ3R4KHIsaSk7cmV0dXJuIHQmJi9qcGU/Zy8udGVzdCh0KSYmKGEuZmlsbFN0eWxlPVwid2hpdGVcIixhLmZpbGxSZWN0KDAsMCxvLndpZHRoLG8uaGVpZ2h0KSksYS5kcmF3SW1hZ2UoZSwwLDAsby53aWR0aCxvLmhlaWdodCksb31mdW5jdGlvbiBpc0lPUygpe3JldHVybiB2b2lkIDAhPT1pc0lPUy5jYWNoZWRSZXN1bHR8fChpc0lPUy5jYWNoZWRSZXN1bHQ9W1wiaVBhZCBTaW11bGF0b3JcIixcImlQaG9uZSBTaW11bGF0b3JcIixcImlQb2QgU2ltdWxhdG9yXCIsXCJpUGFkXCIsXCJpUGhvbmVcIixcImlQb2RcIl0uaW5jbHVkZXMobmF2aWdhdG9yLnBsYXRmb3JtKXx8bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIk1hY1wiKSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50JiZcIm9udG91Y2hlbmRcImluIGRvY3VtZW50KSxpc0lPUy5jYWNoZWRSZXN1bHR9ZnVuY3Rpb24gZHJhd0ZpbGVJbkNhbnZhcyhlLHQ9e30pe3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24ocixvKXtsZXQgYSxzO3ZhciAkVHJ5XzJfUG9zdD1mdW5jdGlvbigpe3RyeXtyZXR1cm4gcz1kcmF3SW1hZ2VJbkNhbnZhcyhhLHQuZmlsZVR5cGV8fGUudHlwZSkscihbYSxzXSl9Y2F0Y2goZSl7cmV0dXJuIG8oZSl9fSwkVHJ5XzJfQ2F0Y2g9ZnVuY3Rpb24odCl7dHJ5ezA7dmFyICRUcnlfM19DYXRjaD1mdW5jdGlvbihlKXt0cnl7dGhyb3cgZX1jYXRjaChlKXtyZXR1cm4gbyhlKX19O3RyeXtsZXQgdDtyZXR1cm4gZ2V0RGF0YVVybEZyb21GaWxlKGUpLnRoZW4oKGZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gdD1lLGxvYWRJbWFnZSh0KS50aGVuKChmdW5jdGlvbihlKXt0cnl7cmV0dXJuIGE9ZSxmdW5jdGlvbigpe3RyeXtyZXR1cm4gJFRyeV8yX1Bvc3QoKX1jYXRjaChlKXtyZXR1cm4gbyhlKX19KCl9Y2F0Y2goZSl7cmV0dXJuICRUcnlfM19DYXRjaChlKX19KSwkVHJ5XzNfQ2F0Y2gpfWNhdGNoKGUpe3JldHVybiAkVHJ5XzNfQ2F0Y2goZSl9fSksJFRyeV8zX0NhdGNoKX1jYXRjaChlKXskVHJ5XzNfQ2F0Y2goZSl9fWNhdGNoKGUpe3JldHVybiBvKGUpfX07dHJ5e2lmKGlzSU9TKCl8fFtpLkRFU0tUT1BfU0FGQVJJLGkuTU9CSUxFX1NBRkFSSV0uaW5jbHVkZXMoZ2V0QnJvd3Nlck5hbWUoKSkpdGhyb3cgbmV3IEVycm9yKFwiU2tpcCBjcmVhdGVJbWFnZUJpdG1hcCBvbiBJT1MgYW5kIFNhZmFyaVwiKTtyZXR1cm4gY3JlYXRlSW1hZ2VCaXRtYXAoZSkudGhlbigoZnVuY3Rpb24oZSl7dHJ5e3JldHVybiBhPWUsJFRyeV8yX1Bvc3QoKX1jYXRjaChlKXtyZXR1cm4gJFRyeV8yX0NhdGNoKCl9fSksJFRyeV8yX0NhdGNoKX1jYXRjaChlKXskVHJ5XzJfQ2F0Y2goKX19KSl9ZnVuY3Rpb24gY2FudmFzVG9GaWxlKGUsdCxpLG8sYT0xKXtyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKHMsZil7bGV0IGw7aWYoXCJpbWFnZS9wbmdcIj09PXQpe2xldCBjLHUsaDtyZXR1cm4gYz1lLmdldENvbnRleHQoXCIyZFwiKSwoe2RhdGE6dX09Yy5nZXRJbWFnZURhdGEoMCwwLGUud2lkdGgsZS5oZWlnaHQpKSxoPVVQTkcuZW5jb2RlKFt1LmJ1ZmZlcl0sZS53aWR0aCxlLmhlaWdodCw0MDk2KmEpLGw9bmV3IEJsb2IoW2hdLHt0eXBlOnR9KSxsLm5hbWU9aSxsLmxhc3RNb2RpZmllZD1vLCRJZl80LmNhbGwodGhpcyl9e2lmKFwiaW1hZ2UvYm1wXCI9PT10KXJldHVybiBuZXcgUHJvbWlzZSgodD0+ci50b0Jsb2IoZSx0KSkpLnRoZW4oZnVuY3Rpb24oZSl7dHJ5e3JldHVybiBsPWUsbC5uYW1lPWksbC5sYXN0TW9kaWZpZWQ9bywkSWZfNS5jYWxsKHRoaXMpfWNhdGNoKGUpe3JldHVybiBmKGUpfX0uYmluZCh0aGlzKSxmKTt7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgT2Zmc2NyZWVuQ2FudmFzJiZlIGluc3RhbmNlb2YgT2Zmc2NyZWVuQ2FudmFzKXJldHVybiBlLmNvbnZlcnRUb0Jsb2Ioe3R5cGU6dCxxdWFsaXR5OmF9KS50aGVuKGZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gbD1lLGwubmFtZT1pLGwubGFzdE1vZGlmaWVkPW8sJElmXzYuY2FsbCh0aGlzKX1jYXRjaChlKXtyZXR1cm4gZihlKX19LmJpbmQodGhpcyksZik7e2xldCBkO3JldHVybiBkPWUudG9EYXRhVVJMKHQsYSksZ2V0RmlsZWZyb21EYXRhVXJsKGQsaSxvKS50aGVuKGZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gbD1lLCRJZl82LmNhbGwodGhpcyl9Y2F0Y2goZSl7cmV0dXJuIGYoZSl9fS5iaW5kKHRoaXMpLGYpfWZ1bmN0aW9uICRJZl82KCl7cmV0dXJuICRJZl81LmNhbGwodGhpcyl9fWZ1bmN0aW9uICRJZl81KCl7cmV0dXJuICRJZl80LmNhbGwodGhpcyl9fWZ1bmN0aW9uICRJZl80KCl7cmV0dXJuIHMobCl9fSkpfWZ1bmN0aW9uIGNsZWFudXBDYW52YXNNZW1vcnkoZSl7ZS53aWR0aD0wLGUuaGVpZ2h0PTB9ZnVuY3Rpb24gaXNBdXRvT3JpZW50YXRpb25JbkJyb3dzZXIoKXtyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKGUsdCl7bGV0IHIsaSxvLGEscztyZXR1cm4gdm9pZCAwIT09aXNBdXRvT3JpZW50YXRpb25JbkJyb3dzZXIuY2FjaGVkUmVzdWx0P2UoaXNBdXRvT3JpZW50YXRpb25JbkJyb3dzZXIuY2FjaGVkUmVzdWx0KToocj1cImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRRQWlSWGhwWmdBQVRVMEFLZ0FBQUFnQUFRRVNBQU1BQUFBQkFBWUFBQUFBQUFELzJ3Q0VBQUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQWYvQUFCRUlBQUVBQWdNQkVRQUNFUUVERVFIL3hBQktBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUxFQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUUVBQUFBQUFBQUFBQUFBQUFBQUFBQUFFUUVBQUFBQUFBQUFBQUFBQUFBQUFBQUEvOW9BREFNQkFBSVJBeEVBUHdBLzhILy8yUT09XCIsZ2V0RmlsZWZyb21EYXRhVXJsKFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNFFBaVJYaHBaZ0FBVFUwQUtnQUFBQWdBQVFFU0FBTUFBQUFCQUFZQUFBQUFBQUQvMndDRUFBRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBZi9BQUJFSUFBRUFBZ01CRVFBQ0VRRURFUUgveEFCS0FBRUFBQUFBQUFBQUFBQUFBQUFBQUFBTEVBRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVRRUFBQUFBQUFBQUFBQUFBQUFBQUFBQS85b0FEQU1CQUFJUkF4RUFQd0EvOEgvLzJRPT1cIixcInRlc3QuanBnXCIsRGF0ZS5ub3coKSkudGhlbigoZnVuY3Rpb24ocil7dHJ5e3JldHVybiBpPXIsZHJhd0ZpbGVJbkNhbnZhcyhpKS50aGVuKChmdW5jdGlvbihyKXt0cnl7cmV0dXJuIG89clsxXSxjYW52YXNUb0ZpbGUobyxpLnR5cGUsaS5uYW1lLGkubGFzdE1vZGlmaWVkKS50aGVuKChmdW5jdGlvbihyKXt0cnl7cmV0dXJuIGE9cixjbGVhbnVwQ2FudmFzTWVtb3J5KG8pLGRyYXdGaWxlSW5DYW52YXMoYSkudGhlbigoZnVuY3Rpb24ocil7dHJ5e3JldHVybiBzPXJbMF0saXNBdXRvT3JpZW50YXRpb25JbkJyb3dzZXIuY2FjaGVkUmVzdWx0PTE9PT1zLndpZHRoJiYyPT09cy5oZWlnaHQsZShpc0F1dG9PcmllbnRhdGlvbkluQnJvd3Nlci5jYWNoZWRSZXN1bHQpfWNhdGNoKGUpe3JldHVybiB0KGUpfX0pLHQpfWNhdGNoKGUpe3JldHVybiB0KGUpfX0pLHQpfWNhdGNoKGUpe3JldHVybiB0KGUpfX0pLHQpfWNhdGNoKGUpe3JldHVybiB0KGUpfX0pLHQpKX0pKX1mdW5jdGlvbiBnZXRFeGlmT3JpZW50YXRpb24oZSl7cmV0dXJuIG5ldyBQcm9taXNlKCgodCxyKT0+e2NvbnN0IGk9bmV3IEN1c3RvbUZpbGVSZWFkZXI7aS5vbmxvYWQ9ZT0+e2NvbnN0IHI9bmV3IERhdGFWaWV3KGUudGFyZ2V0LnJlc3VsdCk7aWYoNjU0OTYhPXIuZ2V0VWludDE2KDAsITEpKXJldHVybiB0KC0yKTtjb25zdCBpPXIuYnl0ZUxlbmd0aDtsZXQgbz0yO2Zvcig7bzxpOyl7aWYoci5nZXRVaW50MTYobysyLCExKTw9OClyZXR1cm4gdCgtMSk7Y29uc3QgZT1yLmdldFVpbnQxNihvLCExKTtpZihvKz0yLDY1NTA1PT1lKXtpZigxMTY1NTE5MjA2IT1yLmdldFVpbnQzMihvKz0yLCExKSlyZXR1cm4gdCgtMSk7Y29uc3QgZT0xODc2MT09ci5nZXRVaW50MTYobys9NiwhMSk7bys9ci5nZXRVaW50MzIobys0LGUpO2NvbnN0IGk9ci5nZXRVaW50MTYobyxlKTtvKz0yO2ZvcihsZXQgYT0wO2E8aTthKyspaWYoMjc0PT1yLmdldFVpbnQxNihvKzEyKmEsZSkpcmV0dXJuIHQoci5nZXRVaW50MTYobysxMiphKzgsZSkpfWVsc2V7aWYoNjUyODAhPSg2NTI4MCZlKSlicmVhaztvKz1yLmdldFVpbnQxNihvLCExKX19cmV0dXJuIHQoLTEpfSxpLm9uZXJyb3I9ZT0+cihlKSxpLnJlYWRBc0FycmF5QnVmZmVyKGUpfSkpfWZ1bmN0aW9uIGhhbmRsZU1heFdpZHRoT3JIZWlnaHQoZSx0KXtjb25zdHt3aWR0aDpyfT1lLHtoZWlnaHQ6aX09ZSx7bWF4V2lkdGhPckhlaWdodDpvfT10O2xldCBhLHM9ZTtyZXR1cm4gaXNGaW5pdGUobykmJihyPm98fGk+bykmJihbcyxhXT1nZXROZXdDYW52YXNBbmRDdHgocixpKSxyPmk/KHMud2lkdGg9byxzLmhlaWdodD1pL3Iqbyk6KHMud2lkdGg9ci9pKm8scy5oZWlnaHQ9byksYS5kcmF3SW1hZ2UoZSwwLDAscy53aWR0aCxzLmhlaWdodCksY2xlYW51cENhbnZhc01lbW9yeShlKSksc31mdW5jdGlvbiBmb2xsb3dFeGlmT3JpZW50YXRpb24oZSx0KXtjb25zdHt3aWR0aDpyfT1lLHtoZWlnaHQ6aX09ZSxbbyxhXT1nZXROZXdDYW52YXNBbmRDdHgocixpKTtzd2l0Y2godD40JiZ0PDk/KG8ud2lkdGg9aSxvLmhlaWdodD1yKTooby53aWR0aD1yLG8uaGVpZ2h0PWkpLHQpe2Nhc2UgMjphLnRyYW5zZm9ybSgtMSwwLDAsMSxyLDApO2JyZWFrO2Nhc2UgMzphLnRyYW5zZm9ybSgtMSwwLDAsLTEscixpKTticmVhaztjYXNlIDQ6YS50cmFuc2Zvcm0oMSwwLDAsLTEsMCxpKTticmVhaztjYXNlIDU6YS50cmFuc2Zvcm0oMCwxLDEsMCwwLDApO2JyZWFrO2Nhc2UgNjphLnRyYW5zZm9ybSgwLDEsLTEsMCxpLDApO2JyZWFrO2Nhc2UgNzphLnRyYW5zZm9ybSgwLC0xLC0xLDAsaSxyKTticmVhaztjYXNlIDg6YS50cmFuc2Zvcm0oMCwtMSwxLDAsMCxyKX1yZXR1cm4gYS5kcmF3SW1hZ2UoZSwwLDAscixpKSxjbGVhbnVwQ2FudmFzTWVtb3J5KGUpLG99ZnVuY3Rpb24gY29tcHJlc3MoZSx0LHI9MCl7cmV0dXJuIG5ldyBQcm9taXNlKChmdW5jdGlvbihpLG8pe2xldCBhLHMsZixsLGMsdSxoLGQsQSxnLHAsbSx3LHYsYix5LEUsRixfLEI7ZnVuY3Rpb24gaW5jUHJvZ3Jlc3MoZT01KXtpZih0LnNpZ25hbCYmdC5zaWduYWwuYWJvcnRlZCl0aHJvdyB0LnNpZ25hbC5yZWFzb247YSs9ZSx0Lm9uUHJvZ3Jlc3MoTWF0aC5taW4oYSwxMDApKX1mdW5jdGlvbiBzZXRQcm9ncmVzcyhlKXtpZih0LnNpZ25hbCYmdC5zaWduYWwuYWJvcnRlZCl0aHJvdyB0LnNpZ25hbC5yZWFzb247YT1NYXRoLm1pbihNYXRoLm1heChlLGEpLDEwMCksdC5vblByb2dyZXNzKGEpfXJldHVybiBhPXIscz10Lm1heEl0ZXJhdGlvbnx8MTAsZj0xMDI0KnQubWF4U2l6ZU1CKjEwMjQsaW5jUHJvZ3Jlc3MoKSxkcmF3RmlsZUluQ2FudmFzKGUsdCkudGhlbihmdW5jdGlvbihyKXt0cnl7cmV0dXJuWyxsXT1yLGluY1Byb2dyZXNzKCksYz1oYW5kbGVNYXhXaWR0aE9ySGVpZ2h0KGwsdCksaW5jUHJvZ3Jlc3MoKSxuZXcgUHJvbWlzZSgoZnVuY3Rpb24ocixpKXt2YXIgbztpZighKG89dC5leGlmT3JpZW50YXRpb24pKXJldHVybiBnZXRFeGlmT3JpZW50YXRpb24oZSkudGhlbihmdW5jdGlvbihlKXt0cnl7cmV0dXJuIG89ZSwkSWZfMi5jYWxsKHRoaXMpfWNhdGNoKGUpe3JldHVybiBpKGUpfX0uYmluZCh0aGlzKSxpKTtmdW5jdGlvbiAkSWZfMigpe3JldHVybiByKG8pfXJldHVybiAkSWZfMi5jYWxsKHRoaXMpfSkpLnRoZW4oZnVuY3Rpb24ocil7dHJ5e3JldHVybiB1PXIsaW5jUHJvZ3Jlc3MoKSxpc0F1dG9PcmllbnRhdGlvbkluQnJvd3NlcigpLnRoZW4oZnVuY3Rpb24ocil7dHJ5e3JldHVybiBoPXI/Yzpmb2xsb3dFeGlmT3JpZW50YXRpb24oYyx1KSxpbmNQcm9ncmVzcygpLGQ9dC5pbml0aWFsUXVhbGl0eXx8MSxBPXQuZmlsZVR5cGV8fGUudHlwZSxjYW52YXNUb0ZpbGUoaCxBLGUubmFtZSxlLmxhc3RNb2RpZmllZCxkKS50aGVuKGZ1bmN0aW9uKHIpe3RyeXt7aWYoZz1yLGluY1Byb2dyZXNzKCkscD1nLnNpemU+ZixtPWcuc2l6ZT5lLnNpemUsIXAmJiFtKXJldHVybiBzZXRQcm9ncmVzcygxMDApLGkoZyk7dmFyIGE7ZnVuY3Rpb24gJExvb3BfMygpe2lmKHMtLSYmKGI+Znx8Yj53KSl7bGV0IHQscjtyZXR1cm4gdD1CPy45NSpfLndpZHRoOl8ud2lkdGgscj1CPy45NSpfLmhlaWdodDpfLmhlaWdodCxbRSxGXT1nZXROZXdDYW52YXNBbmRDdHgodCxyKSxGLmRyYXdJbWFnZShfLDAsMCx0LHIpLGQqPVwiaW1hZ2UvcG5nXCI9PT1BPy44NTouOTUsY2FudmFzVG9GaWxlKEUsQSxlLm5hbWUsZS5sYXN0TW9kaWZpZWQsZCkudGhlbigoZnVuY3Rpb24oZSl7dHJ5e3JldHVybiB5PWUsY2xlYW51cENhbnZhc01lbW9yeShfKSxfPUUsYj15LnNpemUsc2V0UHJvZ3Jlc3MoTWF0aC5taW4oOTksTWF0aC5mbG9vcigodi1iKS8odi1mKSoxMDApKSksJExvb3BfM31jYXRjaChlKXtyZXR1cm4gbyhlKX19KSxvKX1yZXR1cm5bMV19cmV0dXJuIHc9ZS5zaXplLHY9Zy5zaXplLGI9dixfPWgsQj0hdC5hbHdheXNLZWVwUmVzb2x1dGlvbiYmcCwoYT1mdW5jdGlvbihlKXtmb3IoO2U7KXtpZihlLnRoZW4pcmV0dXJuIHZvaWQgZS50aGVuKGEsbyk7dHJ5e2lmKGUucG9wKXtpZihlLmxlbmd0aClyZXR1cm4gZS5wb3AoKT8kTG9vcF8zX2V4aXQuY2FsbCh0aGlzKTplO2U9JExvb3BfM31lbHNlIGU9ZS5jYWxsKHRoaXMpfWNhdGNoKGUpe3JldHVybiBvKGUpfX19LmJpbmQodGhpcykpKCRMb29wXzMpO2Z1bmN0aW9uICRMb29wXzNfZXhpdCgpe3JldHVybiBjbGVhbnVwQ2FudmFzTWVtb3J5KF8pLGNsZWFudXBDYW52YXNNZW1vcnkoRSksY2xlYW51cENhbnZhc01lbW9yeShjKSxjbGVhbnVwQ2FudmFzTWVtb3J5KGgpLGNsZWFudXBDYW52YXNNZW1vcnkobCksc2V0UHJvZ3Jlc3MoMTAwKSxpKHkpfX19Y2F0Y2godSl7cmV0dXJuIG8odSl9fS5iaW5kKHRoaXMpLG8pfWNhdGNoKGUpe3JldHVybiBvKGUpfX0uYmluZCh0aGlzKSxvKX1jYXRjaChlKXtyZXR1cm4gbyhlKX19LmJpbmQodGhpcyksbyl9Y2F0Y2goZSl7cmV0dXJuIG8oZSl9fS5iaW5kKHRoaXMpLG8pfSkpfWNvbnN0IGw9XCJcXG5sZXQgc2NyaXB0SW1wb3J0ZWQgPSBmYWxzZVxcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGFzeW5jIChlKSA9PiB7XFxuICBjb25zdCB7IGZpbGUsIGlkLCBpbWFnZUNvbXByZXNzaW9uTGliVXJsLCBvcHRpb25zIH0gPSBlLmRhdGFcXG4gIG9wdGlvbnMub25Qcm9ncmVzcyA9IChwcm9ncmVzcykgPT4gc2VsZi5wb3N0TWVzc2FnZSh7IHByb2dyZXNzLCBpZCB9KVxcbiAgdHJ5IHtcXG4gICAgaWYgKCFzY3JpcHRJbXBvcnRlZCkge1xcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdbd29ya2VyXSBpbXBvcnRTY3JpcHRzJywgaW1hZ2VDb21wcmVzc2lvbkxpYlVybClcXG4gICAgICBzZWxmLmltcG9ydFNjcmlwdHMoaW1hZ2VDb21wcmVzc2lvbkxpYlVybClcXG4gICAgICBzY3JpcHRJbXBvcnRlZCA9IHRydWVcXG4gICAgfVxcbiAgICAvLyBjb25zb2xlLmxvZygnW3dvcmtlcl0gc2VsZicsIHNlbGYpXFxuICAgIGNvbnN0IGNvbXByZXNzZWRGaWxlID0gYXdhaXQgaW1hZ2VDb21wcmVzc2lvbihmaWxlLCBvcHRpb25zKVxcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZmlsZTogY29tcHJlc3NlZEZpbGUsIGlkIH0pXFxuICB9IGNhdGNoIChlKSB7XFxuICAgIC8vIGNvbnNvbGUuZXJyb3IoJ1t3b3JrZXJdIGVycm9yJywgZSlcXG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7IGVycm9yOiBlLm1lc3NhZ2UgKyAnXFxcXG4nICsgZS5zdGFjaywgaWQgfSlcXG4gIH1cXG59KVxcblwiO2xldCBjO2Z1bmN0aW9uIGNvbXByZXNzT25XZWJXb3JrZXIoZSx0KXtyZXR1cm4gbmV3IFByb21pc2UoKChyLGkpPT57Y3x8KGM9ZnVuY3Rpb24gY3JlYXRlV29ya2VyU2NyaXB0VVJMKGUpe2NvbnN0IHQ9W107cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZT90LnB1c2goYCgke2V9KSgpYCk6dC5wdXNoKGUpLFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IodCkpfShsKSk7Y29uc3Qgbz1uZXcgV29ya2VyKGMpO28uYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwoZnVuY3Rpb24gaGFuZGxlcihlKXtpZih0LnNpZ25hbCYmdC5zaWduYWwuYWJvcnRlZClvLnRlcm1pbmF0ZSgpO2Vsc2UgaWYodm9pZCAwPT09ZS5kYXRhLnByb2dyZXNzKXtpZihlLmRhdGEuZXJyb3IpcmV0dXJuIGkobmV3IEVycm9yKGUuZGF0YS5lcnJvcikpLHZvaWQgby50ZXJtaW5hdGUoKTtyKGUuZGF0YS5maWxlKSxvLnRlcm1pbmF0ZSgpfWVsc2UgdC5vblByb2dyZXNzKGUuZGF0YS5wcm9ncmVzcyl9KSksby5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixpKSx0LnNpZ25hbCYmdC5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsKCgpPT57aSh0LnNpZ25hbC5yZWFzb24pLG8udGVybWluYXRlKCl9KSksby5wb3N0TWVzc2FnZSh7ZmlsZTplLGltYWdlQ29tcHJlc3Npb25MaWJVcmw6dC5saWJVUkwsb3B0aW9uczp7Li4udCxvblByb2dyZXNzOnZvaWQgMCxzaWduYWw6dm9pZCAwfX0pfSkpfWZ1bmN0aW9uIGltYWdlQ29tcHJlc3Npb24oZSx0KXtyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKHIsaSl7bGV0IG8sYSxzLGYsbCxjO2lmKG89ey4uLnR9LHM9MCwoe29uUHJvZ3Jlc3M6Zn09byksby5tYXhTaXplTUI9by5tYXhTaXplTUJ8fE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxsPVwiYm9vbGVhblwiIT10eXBlb2Ygby51c2VXZWJXb3JrZXJ8fG8udXNlV2ViV29ya2VyLGRlbGV0ZSBvLnVzZVdlYldvcmtlcixvLm9uUHJvZ3Jlc3M9ZT0+e3M9ZSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBmJiZmKHMpfSwhKGUgaW5zdGFuY2VvZiBCbG9ifHxlIGluc3RhbmNlb2YgQ3VzdG9tRmlsZSkpcmV0dXJuIGkobmV3IEVycm9yKFwiVGhlIGZpbGUgZ2l2ZW4gaXMgbm90IGFuIGluc3RhbmNlIG9mIEJsb2Igb3IgRmlsZVwiKSk7aWYoIS9eaW1hZ2UvLnRlc3QoZS50eXBlKSlyZXR1cm4gaShuZXcgRXJyb3IoXCJUaGUgZmlsZSBnaXZlbiBpcyBub3QgYW4gaW1hZ2VcIikpO2lmKGM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlJiZzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUsIWx8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdvcmtlcnx8YylyZXR1cm4gY29tcHJlc3MoZSxvKS50aGVuKGZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gYT1lLCRJZl80LmNhbGwodGhpcyl9Y2F0Y2goZSl7cmV0dXJuIGkoZSl9fS5iaW5kKHRoaXMpLGkpO3ZhciB1PWZ1bmN0aW9uKCl7dHJ5e3JldHVybiAkSWZfNC5jYWxsKHRoaXMpfWNhdGNoKGUpe3JldHVybiBpKGUpfX0uYmluZCh0aGlzKSwkVHJ5XzFfQ2F0Y2g9ZnVuY3Rpb24odCl7dHJ5e3JldHVybiBjb21wcmVzcyhlLG8pLnRoZW4oKGZ1bmN0aW9uKGUpe3RyeXtyZXR1cm4gYT1lLHUoKX1jYXRjaChlKXtyZXR1cm4gaShlKX19KSxpKX1jYXRjaChlKXtyZXR1cm4gaShlKX19O3RyeXtyZXR1cm4gby5saWJVUkw9by5saWJVUkx8fFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9icm93c2VyLWltYWdlLWNvbXByZXNzaW9uQDIuMC4yL2Rpc3QvYnJvd3Nlci1pbWFnZS1jb21wcmVzc2lvbi5qc1wiLGNvbXByZXNzT25XZWJXb3JrZXIoZSxvKS50aGVuKChmdW5jdGlvbihlKXt0cnl7cmV0dXJuIGE9ZSx1KCl9Y2F0Y2goZSl7cmV0dXJuICRUcnlfMV9DYXRjaCgpfX0pLCRUcnlfMV9DYXRjaCl9Y2F0Y2goZSl7JFRyeV8xX0NhdGNoKCl9ZnVuY3Rpb24gJElmXzQoKXt0cnl7YS5uYW1lPWUubmFtZSxhLmxhc3RNb2RpZmllZD1lLmxhc3RNb2RpZmllZH1jYXRjaChlKXt9dHJ5e28ucHJlc2VydmVFeGlmJiZcImltYWdlL2pwZWdcIj09PWUudHlwZSYmKCFvLmZpbGVUeXBlfHxvLmZpbGVUeXBlJiZvLmZpbGVUeXBlPT09ZS50eXBlKSYmKGE9Y29weUV4aWZXaXRob3V0T3JpZW50YXRpb24oZSxhKSl9Y2F0Y2goZSl7fXJldHVybiByKGEpfX0pKX1pbWFnZUNvbXByZXNzaW9uLmdldERhdGFVcmxGcm9tRmlsZT1nZXREYXRhVXJsRnJvbUZpbGUsaW1hZ2VDb21wcmVzc2lvbi5nZXRGaWxlZnJvbURhdGFVcmw9Z2V0RmlsZWZyb21EYXRhVXJsLGltYWdlQ29tcHJlc3Npb24ubG9hZEltYWdlPWxvYWRJbWFnZSxpbWFnZUNvbXByZXNzaW9uLmRyYXdJbWFnZUluQ2FudmFzPWRyYXdJbWFnZUluQ2FudmFzLGltYWdlQ29tcHJlc3Npb24uZHJhd0ZpbGVJbkNhbnZhcz1kcmF3RmlsZUluQ2FudmFzLGltYWdlQ29tcHJlc3Npb24uY2FudmFzVG9GaWxlPWNhbnZhc1RvRmlsZSxpbWFnZUNvbXByZXNzaW9uLmdldEV4aWZPcmllbnRhdGlvbj1nZXRFeGlmT3JpZW50YXRpb24saW1hZ2VDb21wcmVzc2lvbi5oYW5kbGVNYXhXaWR0aE9ySGVpZ2h0PWhhbmRsZU1heFdpZHRoT3JIZWlnaHQsaW1hZ2VDb21wcmVzc2lvbi5mb2xsb3dFeGlmT3JpZW50YXRpb249Zm9sbG93RXhpZk9yaWVudGF0aW9uLGltYWdlQ29tcHJlc3Npb24uY2xlYW51cENhbnZhc01lbW9yeT1jbGVhbnVwQ2FudmFzTWVtb3J5LGltYWdlQ29tcHJlc3Npb24uaXNBdXRvT3JpZW50YXRpb25JbkJyb3dzZXI9aXNBdXRvT3JpZW50YXRpb25JbkJyb3dzZXIsaW1hZ2VDb21wcmVzc2lvbi5hcHByb3hpbWF0ZUJlbG93TWF4aW11bUNhbnZhc1NpemVPZkJyb3dzZXI9YXBwcm94aW1hdGVCZWxvd01heGltdW1DYW52YXNTaXplT2ZCcm93c2VyLGltYWdlQ29tcHJlc3Npb24uY29weUV4aWZXaXRob3V0T3JpZW50YXRpb249Y29weUV4aWZXaXRob3V0T3JpZW50YXRpb24saW1hZ2VDb21wcmVzc2lvbi5nZXRCcm93c2VyTmFtZT1nZXRCcm93c2VyTmFtZSxpbWFnZUNvbXByZXNzaW9uLnZlcnNpb249XCIyLjAuMlwiO2V4cG9ydHtpbWFnZUNvbXByZXNzaW9uIGFzIGRlZmF1bHR9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1pbWFnZS1jb21wcmVzc2lvbi5tanMubWFwXG4iLCJpbXBvcnQgeyBhcHBlbmQsIGF0dHIsIGNyZWF0ZSwgZmluZCwgZm9jdXMsIHJlbW92ZSwgcmVtb3ZlQXR0ciB9IGZyb20gJy4uL3V0aWxzL0pxdWVyeVdyYXBwZXJzJ1xyXG5pbXBvcnQgeyBpc1Zlcmlvc25BZnRlcjEzIH0gZnJvbSAnLi4vdXRpbHMvVXRpbHMnXHJcblxyXG5jb25zdCB0b2dnbGVDaGF0ID0gKGNoYXQ6IEpRdWVyeSwgdG9nZ2xlOiBib29sZWFuKSA9PiB7XHJcbiAgaWYgKCF0b2dnbGUpIHtcclxuICAgIGF0dHIoY2hhdCwgJ2Rpc2FibGVkJywgdHJ1ZSlcclxuICAgIHJldHVyblxyXG4gIH1cclxuICByZW1vdmVBdHRyKGNoYXQsICdkaXNhYmxlZCcpXHJcbiAgZm9jdXMoY2hhdClcclxufVxyXG5cclxuY29uc3QgdG9nZ2xlU3Bpbm5lciA9IChjaGF0Rm9ybTogSlF1ZXJ5LCB0b2dnbGU6IGJvb2xlYW4pID0+IHtcclxuICBjb25zdCBzcGlubmVySWQgPSAnY2ktc3Bpbm5lcidcclxuICBjb25zdCBzcGlubmVyID0gZmluZChgIyR7c3Bpbm5lcklkfWAsIGNoYXRGb3JtKVxyXG5cclxuICBpZiAoIXRvZ2dsZSAmJiBzcGlubmVyWzBdKSB7XHJcbiAgICByZW1vdmUoc3Bpbm5lcilcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgaWYgKHRvZ2dsZSAmJiAhc3Bpbm5lclswXSkge1xyXG4gICAgY29uc3QgbmV3U3Bpbm5lciA9IGNyZWF0ZShgPGRpdiBpZD1cIiR7c3Bpbm5lcklkfVwiPjwvZGl2PmApXHJcbiAgICBhcHBlbmQoY2hhdEZvcm0sIG5ld1NwaW5uZXIpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXBsb2FkaW5nU3RhdGVzID0gKHNpZGViYXI6IEpRdWVyeSkgPT4ge1xyXG4gIGNvbnN0IGNoYXRGb3JtUXVlcnkgPSBpc1Zlcmlvc25BZnRlcjEzKCkgPyAnLmNoYXQtZm9ybScgOiAnI2NoYXQtZm9ybSdcclxuICBjb25zdCBjaGF0Rm9ybSA9IGZpbmQoY2hhdEZvcm1RdWVyeSwgc2lkZWJhcilcclxuICBjb25zdCBjaGF0ID0gZmluZCgnI2NoYXQtbWVzc2FnZScsIHNpZGViYXIpXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBvbigpIHtcclxuICAgICAgdG9nZ2xlQ2hhdChjaGF0LCBmYWxzZSlcclxuICAgICAgdG9nZ2xlU3Bpbm5lcihjaGF0Rm9ybSwgdHJ1ZSlcclxuICAgIH0sXHJcbiAgICBvZmYoKSB7XHJcbiAgICAgIHRvZ2dsZUNoYXQoY2hhdCwgdHJ1ZSlcclxuICAgICAgdG9nZ2xlU3Bpbm5lcihjaGF0Rm9ybSwgZmFsc2UpXHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBPUklHSU5fRk9MREVSLCB0LCBGaWxlUGlja2VySW1wbGVtZW50YXRpb24gfSBmcm9tICcuL1V0aWxzJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVVcGxvYWRGb2xkZXIgPSBhc3luYyAodXBsb2FkTG9jYXRpb24/OiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBsb2NhdGlvbiA9IHVwbG9hZExvY2F0aW9uIHx8IGdldFNldHRpbmcoJ3VwbG9hZExvY2F0aW9uJylcclxuICB0cnkge1xyXG4gICAgY29uc3QgZm9sZGVyTG9jYXRpb24gPSBhd2FpdCBGaWxlUGlja2VySW1wbGVtZW50YXRpb24oKS5icm93c2UoT1JJR0lOX0ZPTERFUiwgbG9jYXRpb24pXHJcbiAgICBpZiAoZm9sZGVyTG9jYXRpb24udGFyZ2V0ID09PSAnLicpIGF3YWl0IEZpbGVQaWNrZXJJbXBsZW1lbnRhdGlvbigpLmNyZWF0ZURpcmVjdG9yeShPUklHSU5fRk9MREVSLCBsb2NhdGlvbiwge30pXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgRmlsZVBpY2tlckltcGxlbWVudGF0aW9uKCkuY3JlYXRlRGlyZWN0b3J5KE9SSUdJTl9GT0xERVIsIGxvY2F0aW9uLCB7fSlcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyBUaGUgRmlsZVBpY2tlciB0aG9yd3MgYW4gZXJyb3Igd2hlbiB5b3UgaGF2ZSBhIHVzZXIgd2l0aG91dCB1cGxvYWQgcGVybWlzc2lvbnNcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRTZXR0aW5nID0gKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB7XHJcbiAgLy8gQHRzLWlnbm9yZVxyXG4gIHJldHVybiAoZ2FtZSBhcyBHYW1lKS5zZXR0aW5ncy5zZXQoJ2NoYXQtaW1hZ2VzJywga2V5LCB2YWx1ZSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNldHRpbmdzID0gKCkgPT4gW1xyXG4gIHtcclxuICAgIGtleTogJ3VwbG9hZEJ1dHRvbicsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIG5hbWU6IHQoJ3VwbG9hZEJ1dHRvbicpLFxyXG4gICAgICBoaW50OiB0KCd1cGxvYWRCdXR0b25IaW50JyksXHJcbiAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgIGNvbmZpZzogdHJ1ZSxcclxuICAgICAgcmVxdWlyZXNSZWxvYWQ6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAge1xyXG4gICAga2V5OiAndXBsb2FkTG9jYXRpb24nLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBuYW1lOiB0KCd1cGxvYWRMb2NhdGlvbicpLFxyXG4gICAgICBoaW50OiB0KCd1cGxvYWRMb2NhdGlvbkhpbnQnKSxcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICBkZWZhdWx0OiAndXBsb2FkZWQtY2hhdC1pbWFnZXMnLFxyXG4gICAgICBzY29wZTogJ3dvcmxkJyxcclxuICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgICByZXN0cmljdGVkOiB0cnVlLFxyXG4gICAgICBvbkNoYW5nZTogYXN5bmMgKG5ld1VwbG9hZExvY2F0aW9uOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0TG9jYXRpb24gPSAndXBsb2FkZWQtY2hhdC1pbWFnZXMnXHJcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gbmV3VXBsb2FkTG9jYXRpb24udHJpbSgpXHJcbiAgICAgICAgbGV0IHNob3VsZENoYW5nZUxvY2F0aW9uID0gZmFsc2VcclxuXHJcbiAgICAgICAgaWYgKCFsb2NhdGlvbikge1xyXG4gICAgICAgICAgbG9jYXRpb24gPSBkZWZhdWx0TG9jYXRpb25cclxuICAgICAgICAgIHNob3VsZENoYW5nZUxvY2F0aW9uID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYXRpb24gPSBsb2NhdGlvbi5yZXBsYWNlKC9cXHMrL2csICctJylcclxuICAgICAgICBpZiAobmV3VXBsb2FkTG9jYXRpb24gIT09IGxvY2F0aW9uKSBzaG91bGRDaGFuZ2VMb2NhdGlvbiA9IHRydWVcclxuXHJcbiAgICAgICAgYXdhaXQgY3JlYXRlVXBsb2FkRm9sZGVyKGxvY2F0aW9uKVxyXG4gICAgICAgIGlmIChzaG91bGRDaGFuZ2VMb2NhdGlvbikgYXdhaXQgc2V0U2V0dGluZygndXBsb2FkTG9jYXRpb24nLCBsb2NhdGlvbilcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2V0dGluZyA9IChzZXR0aW5nOiB7IGtleTogc3RyaW5nLCBvcHRpb25zOiBhbnkgfSkgPT4ge1xyXG4gIC8vIEB0cy1pZ25vcmVcclxuICByZXR1cm4gKGdhbWUgYXMgR2FtZSkuc2V0dGluZ3MucmVnaXN0ZXIoJ2NoYXQtaW1hZ2VzJywgc2V0dGluZy5rZXksIHNldHRpbmcub3B0aW9ucylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNldHRpbmcgPSAoa2V5OiBzdHJpbmcpOiBhbnkgPT4ge1xyXG4gIC8vIEB0cy1pZ25vcmVcclxuICByZXR1cm4gKGdhbWUgYXMgR2FtZSkuc2V0dGluZ3MuZ2V0KCdjaGF0LWltYWdlcycsIGtleSlcclxufVxyXG4iLCJpbXBvcnQgeyBGaWxlUGlja2VySW1wbGVtZW50YXRpb24sIE9SSUdJTl9GT0xERVIsIHJhbmRvbVN0cmluZywgdCwgdXNlckNhblVwbG9hZCB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJ1xyXG5pbXBvcnQgeyBhZGRDbGFzcywgYXBwZW5kLCBjcmVhdGUsIGZpbmQsIG9uLCByZW1vdmUsIHJlbW92ZUNsYXNzIH0gZnJvbSAnLi4vdXRpbHMvSnF1ZXJ5V3JhcHBlcnMnXHJcbmltcG9ydCBpbWFnZUNvbXByZXNzaW9uIGZyb20gJ2Jyb3dzZXItaW1hZ2UtY29tcHJlc3Npb24nXHJcbmltcG9ydCB7IGdldFVwbG9hZGluZ1N0YXRlcyB9IGZyb20gJy4uL2NvbXBvbmVudHMvTG9hZGVyJ1xyXG5pbXBvcnQgeyBnZXRTZXR0aW5nIH0gZnJvbSAnLi4vdXRpbHMvU2V0dGluZ3MnXHJcblxyXG5leHBvcnQgdHlwZSBTYXZlVmFsdWVUeXBlID0ge1xyXG4gIHR5cGU/OiBzdHJpbmcsXHJcbiAgbmFtZT86IHN0cmluZyxcclxuICBmaWxlPzogRmlsZSxcclxuICBpbWFnZVNyYzogc3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBudWxsLFxyXG4gIGlkOiBzdHJpbmcsXHJcbn1cclxuXHJcbmNvbnN0IFJFU1RSSUNURURfRE9NQUlOUyA9IFsnc3RhdGljLndpa2lhJ11cclxuXHJcbmNvbnN0IERPTV9QQVJTRVIgPSBuZXcgRE9NUGFyc2VyKClcclxuXHJcbmxldCBpbWFnZVF1ZXVlOiBTYXZlVmFsdWVUeXBlW10gPSBbXVxyXG5cclxuY29uc3QgaXNGaWxlSW1hZ2UgPSAoZmlsZTogRmlsZSB8IERhdGFUcmFuc2Zlckl0ZW0pID0+IGZpbGUudHlwZSAmJiBmaWxlLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJylcclxuXHJcbmNvbnN0IGNyZWF0ZUltYWdlUHJldmlldyA9ICh7IGltYWdlU3JjLCBpZCB9OiBTYXZlVmFsdWVUeXBlKTogSlF1ZXJ5ID0+IGNyZWF0ZShcclxuICBgPGRpdiBpZD1cIiR7aWR9XCIgY2xhc3M9XCJjaS11cGxvYWQtYXJlYS1pbWFnZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImNpLXJlbW92ZS1pbWFnZS1pY29uIGZhLXJlZ3VsYXIgZmEtY2lyY2xlLXhtYXJrXCI+PC9pPlxyXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2ktaW1hZ2UtcHJldmlld1wiIHNyYz1cIiR7aW1hZ2VTcmN9XCIgYWx0PVwiJHt0KCd1bmFibGVUb0xvYWRJbWFnZScpfVwiLz5cclxuICAgICAgICA8L2Rpdj5gKVxyXG5cclxuY29uc3QgYWRkRXZlbnRUb1JlbW92ZUJ1dHRvbiA9IChyZW1vdmVCdXR0b246IEpRdWVyeSwgc2F2ZVZhbHVlOiBTYXZlVmFsdWVUeXBlLCB1cGxvYWRBcmVhOiBKUXVlcnkpID0+IHtcclxuICBjb25zdCByZW1vdmVFdmVudEhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBpbWFnZSA9IGZpbmQoYCMke3NhdmVWYWx1ZS5pZH1gLCB1cGxvYWRBcmVhKVxyXG5cclxuICAgIHJlbW92ZShpbWFnZSlcclxuICAgIGltYWdlUXVldWUgPSBpbWFnZVF1ZXVlLmZpbHRlcigoaW1nRGF0YTogU2F2ZVZhbHVlVHlwZSkgPT4gc2F2ZVZhbHVlLmlkICE9PSBpbWdEYXRhLmlkKVxyXG5cclxuICAgIGlmIChpbWFnZVF1ZXVlLmxlbmd0aCkgcmV0dXJuXHJcbiAgICBhZGRDbGFzcyh1cGxvYWRBcmVhLCAnaGlkZGVuJylcclxuICB9XHJcbiAgb24ocmVtb3ZlQnV0dG9uLCAnY2xpY2snLCByZW1vdmVFdmVudEhhbmRsZXIpXHJcbn1cclxuXHJcbmNvbnN0IHVwbG9hZEltYWdlID0gYXN5bmMgKHNhdmVWYWx1ZTogU2F2ZVZhbHVlVHlwZSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgY29uc3QgZ2VuZXJhdGVGaWxlTmFtZSA9IChzYXZlVmFsdWU6IFNhdmVWYWx1ZVR5cGUpID0+IHtcclxuICAgIGNvbnN0IHsgdHlwZSwgbmFtZSwgaWQgfSA9IHNhdmVWYWx1ZVxyXG4gICAgY29uc3QgZmlsZUV4dGVuc2lvbjogc3RyaW5nID0gbmFtZT8uc3Vic3RyaW5nKG5hbWUubGFzdEluZGV4T2YoJy4nKSwgbmFtZS5sZW5ndGgpIHx8IHR5cGU/LnJlcGxhY2UoJ2ltYWdlLycsICcuJykgfHwgJy5qcGVnJ1xyXG4gICAgcmV0dXJuIGAke2lkfSR7ZmlsZUV4dGVuc2lvbn1gXHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgbmV3TmFtZSA9IGdlbmVyYXRlRmlsZU5hbWUoc2F2ZVZhbHVlKVxyXG4gICAgY29uc3QgY29tcHJlc3NlZEltYWdlID0gYXdhaXQgaW1hZ2VDb21wcmVzc2lvbihzYXZlVmFsdWUuZmlsZSBhcyBGaWxlLCB7IG1heFNpemVNQjogMS41LCB1c2VXZWJXb3JrZXI6IHRydWUsIGFsd2F5c0tlZXBSZXNvbHV0aW9uOiB0cnVlIH0pXHJcbiAgICBjb25zdCBuZXdJbWFnZSA9IG5ldyBGaWxlKFtjb21wcmVzc2VkSW1hZ2UgYXMgRmlsZV0sIG5ld05hbWUsIHsgdHlwZTogc2F2ZVZhbHVlLnR5cGUgfSlcclxuXHJcbiAgICBjb25zdCB1cGxvYWRMb2NhdGlvbiA9IGdldFNldHRpbmcoJ3VwbG9hZExvY2F0aW9uJylcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGNvbnN0IGltYWdlTG9jYXRpb24gPSBhd2FpdCBGaWxlUGlja2VySW1wbGVtZW50YXRpb24oKS51cGxvYWQoT1JJR0lOX0ZPTERFUiwgdXBsb2FkTG9jYXRpb24sIG5ld0ltYWdlLCB7fSwgeyBub3RpZnk6IGZhbHNlIH0pXHJcblxyXG4gICAgaWYgKCFpbWFnZUxvY2F0aW9uIHx8ICEoaW1hZ2VMb2NhdGlvbiBhcyBGaWxlUGlja2VyLlVwbG9hZFJldHVybik/LnBhdGgpIHJldHVybiBzYXZlVmFsdWUuaW1hZ2VTcmMgYXMgc3RyaW5nXHJcbiAgICByZXR1cm4gKGltYWdlTG9jYXRpb24gYXMgRmlsZVBpY2tlci5VcGxvYWRSZXR1cm4pPy5wYXRoXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIHNhdmVWYWx1ZS5pbWFnZVNyYyBhcyBzdHJpbmdcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGFkZEltYWdlVG9RdWV1ZSA9IGFzeW5jIChzYXZlVmFsdWU6IFNhdmVWYWx1ZVR5cGUsIHNpZGViYXI6IEpRdWVyeSkgPT4ge1xyXG4gIGNvbnN0IHVwbG9hZGluZ1N0YXRlcyA9IGdldFVwbG9hZGluZ1N0YXRlcyhzaWRlYmFyKVxyXG5cclxuICB1cGxvYWRpbmdTdGF0ZXMub24oKVxyXG4gIGNvbnN0IHVwbG9hZEFyZWE6IEpRdWVyeSA9IGZpbmQoJyNjaS1jaGF0LXVwbG9hZC1hcmVhJywgc2lkZWJhcilcclxuICBpZiAoIXVwbG9hZEFyZWEgfHwgIXVwbG9hZEFyZWFbMF0pIHJldHVyblxyXG5cclxuICBpZiAoc2F2ZVZhbHVlLmZpbGUpIHtcclxuICAgIGlmICghdXNlckNhblVwbG9hZCgpKSB7XHJcbiAgICAgIHVwbG9hZGluZ1N0YXRlcy5vZmYoKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHNhdmVWYWx1ZS5pbWFnZVNyYyA9IGF3YWl0IHVwbG9hZEltYWdlKHNhdmVWYWx1ZSlcclxuICB9XHJcblxyXG4gIGNvbnN0IGltYWdlUHJldmlldyA9IGNyZWF0ZUltYWdlUHJldmlldyhzYXZlVmFsdWUpXHJcbiAgaWYgKCFpbWFnZVByZXZpZXcgfHwgIWltYWdlUHJldmlld1swXSkgcmV0dXJuXHJcblxyXG4gIHJlbW92ZUNsYXNzKHVwbG9hZEFyZWEsICdoaWRkZW4nKVxyXG4gIGFwcGVuZCh1cGxvYWRBcmVhLCBpbWFnZVByZXZpZXcpXHJcbiAgaW1hZ2VRdWV1ZS5wdXNoKHNhdmVWYWx1ZSlcclxuXHJcbiAgY29uc3QgcmVtb3ZlQnV0dG9uID0gZmluZCgnLmNpLXJlbW92ZS1pbWFnZS1pY29uJywgaW1hZ2VQcmV2aWV3KVxyXG4gIGFkZEV2ZW50VG9SZW1vdmVCdXR0b24ocmVtb3ZlQnV0dG9uLCBzYXZlVmFsdWUsIHVwbG9hZEFyZWEpXHJcbiAgdXBsb2FkaW5nU3RhdGVzLm9mZigpXHJcbn1cclxuXHJcbmNvbnN0IGltYWdlc0ZpbGVSZWFkZXJIYW5kbGVyID0gKGZpbGU6IEZpbGUsIHNpZGViYXI6IEpRdWVyeSkgPT4gYXN5bmMgKGV2dDogRXZlbnQpID0+IHtcclxuICBjb25zdCBpbWFnZVNyYyA9IChldnQudGFyZ2V0IGFzIEZpbGVSZWFkZXIpPy5yZXN1bHRcclxuICBjb25zdCBzYXZlVmFsdWUgPSB7IHR5cGU6IGZpbGUudHlwZSwgbmFtZTogZmlsZS5uYW1lLCBpbWFnZVNyYywgaWQ6IHJhbmRvbVN0cmluZygpLCBmaWxlIH1cclxuICBhd2FpdCBhZGRJbWFnZVRvUXVldWUoc2F2ZVZhbHVlLCBzaWRlYmFyKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvY2Vzc0ltYWdlRmlsZXMgPSAoZmlsZXM6IEZpbGVMaXN0IHwgRmlsZVtdLCBzaWRlYmFyOiBKUXVlcnkpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBmaWxlOiBGaWxlID0gZmlsZXNbaV1cclxuICAgIGlmICghaXNGaWxlSW1hZ2UoZmlsZSkpIGNvbnRpbnVlXHJcblxyXG4gICAgY29uc3QgcmVhZGVyOiBGaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbWFnZXNGaWxlUmVhZGVySGFuZGxlcihmaWxlLCBzaWRlYmFyKSlcclxuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvY2Vzc0Ryb3BBbmRQYXN0ZUltYWdlcyA9IChldmVudERhdGE6IERhdGFUcmFuc2Zlciwgc2lkZWJhcjogSlF1ZXJ5KSA9PiB7XHJcbiAgY29uc3QgZXh0cmFjdFVybEZyb21FdmVudERhdGEgPSAoZXZlbnREYXRhOiBEYXRhVHJhbnNmZXIpOiBzdHJpbmdbXSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgaHRtbCA9IGV2ZW50RGF0YS5nZXREYXRhKCd0ZXh0L2h0bWwnKVxyXG4gICAgaWYgKCFodG1sKSByZXR1cm4gbnVsbFxyXG5cclxuICAgIGNvbnN0IGltYWdlcyA9IERPTV9QQVJTRVIucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKVxyXG4gICAgaWYgKCFpbWFnZXMgfHwgIWltYWdlcy5sZW5ndGgpIHJldHVybiBudWxsXHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgaW1hZ2VVcmxzID0gWy4uLmltYWdlc10ubWFwKChpbWcpID0+IGltZy5zcmMgYXMgc3RyaW5nKVxyXG4gICAgY29uc3QgaW1hZ2VzQ29udGFpblJlc3RyaWN0ZWREb21haW5zID0gaW1hZ2VVcmxzLnNvbWUoKGl1KSA9PiBSRVNUUklDVEVEX0RPTUFJTlMuc29tZSgocmQpID0+IGl1LmluY2x1ZGVzKHJkKSkpXHJcbiAgICByZXR1cm4gaW1hZ2VzQ29udGFpblJlc3RyaWN0ZWREb21haW5zID8gbnVsbCA6IGltYWdlVXJsc1xyXG4gIH1cclxuICBjb25zdCB1cmxzRnJvbUV2ZW50RGF0YUhhbmRsZXIgPSBhc3luYyAodXJsczogc3RyaW5nW10pID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB1cmwgPSB1cmxzW2ldXHJcbiAgICAgIGNvbnN0IHNhdmVWYWx1ZSA9IHsgaW1hZ2VTcmM6IHVybCwgaWQ6IHJhbmRvbVN0cmluZygpIH1cclxuICAgICAgYXdhaXQgYWRkSW1hZ2VUb1F1ZXVlKHNhdmVWYWx1ZSwgc2lkZWJhcilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHVybHM6IHN0cmluZ1tdIHwgbnVsbCA9IGV4dHJhY3RVcmxGcm9tRXZlbnREYXRhKGV2ZW50RGF0YSlcclxuICBpZiAodXJscyAmJiB1cmxzLmxlbmd0aCkgcmV0dXJuIHVybHNGcm9tRXZlbnREYXRhSGFuZGxlcih1cmxzKVxyXG5cclxuICBjb25zdCBleHRyYWN0RmlsZXNGcm9tRXZlbnREYXRhID0gKGV2ZW50RGF0YTogRGF0YVRyYW5zZmVyKTogRmlsZVtdID0+IHtcclxuICAgIGNvbnN0IGl0ZW1zOiBEYXRhVHJhbnNmZXJJdGVtTGlzdCA9IGV2ZW50RGF0YS5pdGVtc1xyXG4gICAgY29uc3QgZmlsZXMgPSBbXVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpdGVtOiBEYXRhVHJhbnNmZXJJdGVtID0gaXRlbXNbaV1cclxuICAgICAgaWYgKCFpc0ZpbGVJbWFnZShpdGVtKSkgY29udGludWVcclxuXHJcbiAgICAgIGNvbnN0IGZpbGUgPSBpdGVtLmdldEFzRmlsZSgpXHJcbiAgICAgIGlmICghZmlsZSkgY29udGludWVcclxuXHJcbiAgICAgIGZpbGVzLnB1c2goZmlsZSlcclxuICAgIH1cclxuICAgIHJldHVybiBmaWxlc1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZmlsZXM6IEZpbGVbXSA9IGV4dHJhY3RGaWxlc0Zyb21FdmVudERhdGEoZXZlbnREYXRhKVxyXG4gIGlmIChmaWxlcyAmJiBmaWxlcy5sZW5ndGgpIHJldHVybiBwcm9jZXNzSW1hZ2VGaWxlcyhmaWxlcywgc2lkZWJhcilcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldEltYWdlUXVldWUgPSAoKTogU2F2ZVZhbHVlVHlwZVtdID0+IGltYWdlUXVldWVcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVBbGxGcm9tUXVldWUgPSAoc2lkZWJhcjogSlF1ZXJ5KSA9PiB7XHJcbiAgd2hpbGUgKGltYWdlUXVldWUubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBpbWFnZURhdGE6IFNhdmVWYWx1ZVR5cGUgfCB1bmRlZmluZWQgPSBpbWFnZVF1ZXVlLnBvcCgpXHJcbiAgICBpZiAoIWltYWdlRGF0YSkgY29udGludWVcclxuXHJcbiAgICBjb25zdCBpbWFnZUVsZW1lbnQgPSBmaW5kKGAjJHtpbWFnZURhdGEuaWR9YCwgc2lkZWJhcilcclxuICAgIHJlbW92ZShpbWFnZUVsZW1lbnQpXHJcbiAgfVxyXG5cclxuICBjb25zdCB1cGxvYWRBcmVhOiBKUXVlcnkgPSBmaW5kKCcjY2ktY2hhdC11cGxvYWQtYXJlYScsIHNpZGViYXIpXHJcbiAgYWRkQ2xhc3ModXBsb2FkQXJlYSwgJ2hpZGRlbicpXHJcbn1cclxuIiwiaW1wb3J0IHthZGRDbGFzcywgYXBwZW5kLCBjcmVhdGUsIGZpbmQsIG9uLCB0cmlnZ2VyfSBmcm9tICcuLi91dGlscy9KcXVlcnlXcmFwcGVycydcclxuaW1wb3J0IHt0LCB1c2VyQ2FuVXBsb2FkfSBmcm9tICcuLi91dGlscy9VdGlscydcclxuaW1wb3J0IHtwcm9jZXNzSW1hZ2VGaWxlc30gZnJvbSAnLi4vcHJvY2Vzc29ycy9GaWxlUHJvY2Vzc29yJ1xyXG5pbXBvcnQge2dldFNldHRpbmd9IGZyb20gJy4uL3V0aWxzL1NldHRpbmdzJ1xyXG5cclxuY29uc3QgY3JlYXRlVXBsb2FkQnV0dG9uID0gKCk6IEpRdWVyeSA9PiBjcmVhdGUoYDxhIGlkPVwiY2ktdXBsb2FkLWltYWdlXCIgdGl0bGU9XCIke3QoJ3VwbG9hZEJ1dHRvblRpdGxlJyl9XCI+PGkgY2xhc3M9XCJmYXMgZmEtaW1hZ2VzXCI+PC9pPjwvYT5gKVxyXG5cclxuY29uc3QgY3JlYXRlSGlkZGVuVXBsb2FkSW5wdXQgPSAoKTogSlF1ZXJ5ID0+IGNyZWF0ZShgPGlucHV0IHR5cGU9XCJmaWxlXCIgbXVsdGlwbGUgYWNjZXB0PVwiaW1hZ2UvKlwiIGlkPVwiY2ktdXBsb2FkLWltYWdlLWhpZGRlbi1pbnB1dFwiPmApXHJcblxyXG5jb25zdCBzZXR1cEV2ZW50cyA9ICh1cGxvYWRCdXR0b246IEpRdWVyeSwgaGlkZGVuVXBsb2FkSW5wdXQ6IEpRdWVyeSwgc2lkZWJhcjogSlF1ZXJ5KSA9PiB7XHJcbiAgY29uc3QgaGlkZGVuVXBsb2FkSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIgPSAoZXZ0OiBFdmVudCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudFRhcmdldDogSFRNTElucHV0RWxlbWVudCA9IGV2dC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgIGNvbnN0IGZpbGVzOiBGaWxlTGlzdCB8IG51bGwgPSBjdXJyZW50VGFyZ2V0LmZpbGVzXHJcbiAgICBpZiAoIWZpbGVzKSByZXR1cm5cclxuXHJcbiAgICBwcm9jZXNzSW1hZ2VGaWxlcyhmaWxlcywgc2lkZWJhcilcclxuICAgIGN1cnJlbnRUYXJnZXQudmFsdWUgPSAnJ1xyXG4gIH1cclxuICBjb25zdCB1cGxvYWRCdXR0b25DbGlja0V2ZW50SGFuZGxlciA9IChldnQ6IEV2ZW50KSA9PiB7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgdHJpZ2dlcihoaWRkZW5VcGxvYWRJbnB1dCwgJ2NsaWNrJylcclxuICB9XHJcblxyXG4gIG9uKGhpZGRlblVwbG9hZElucHV0LCAnY2hhbmdlJywgaGlkZGVuVXBsb2FkSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIpXHJcbiAgb24odXBsb2FkQnV0dG9uLCAnY2xpY2snLCB1cGxvYWRCdXR0b25DbGlja0V2ZW50SGFuZGxlcilcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRVcGxvYWRCdXR0b24gPSAoc2lkZWJhcjogSlF1ZXJ5KSA9PiB7XHJcbiAgaWYgKCFnZXRTZXR0aW5nKCd1cGxvYWRCdXR0b24nKSkgcmV0dXJuXHJcblxyXG4gIGNvbnN0IGNvbnRyb2xCdXR0b25zOiBKUXVlcnkgPSBmaW5kKCcuY29udHJvbC1idXR0b25zJywgc2lkZWJhcilcclxuICBjb25zdCB1cGxvYWRCdXR0b246IEpRdWVyeSA9IGNyZWF0ZVVwbG9hZEJ1dHRvbigpXHJcbiAgY29uc3QgaGlkZGVuVXBsb2FkSW5wdXQ6IEpRdWVyeSA9IGNyZWF0ZUhpZGRlblVwbG9hZElucHV0KClcclxuXHJcbiAgaWYgKCF1c2VyQ2FuVXBsb2FkKHRydWUpKSByZXR1cm5cclxuXHJcbiAgaWYgKGNvbnRyb2xCdXR0b25zWzBdKSB7XHJcbiAgICBhZGRDbGFzcyhjb250cm9sQnV0dG9ucywgJ2NpLWNvbnRyb2wtYnV0dG9ucy1nbScpXHJcbiAgICBhcHBlbmQoY29udHJvbEJ1dHRvbnMsIHVwbG9hZEJ1dHRvbilcclxuICAgIGFwcGVuZChjb250cm9sQnV0dG9ucywgaGlkZGVuVXBsb2FkSW5wdXQpXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFBsYXllcnMgZG9uJ3QgaGF2ZSBidXR0b25zXHJcbiAgICBjb25zdCBjaGF0Q29udHJvbHM6IEpRdWVyeSA9IGZpbmQoJyNjaGF0LWNvbnRyb2xzJywgc2lkZWJhcilcclxuICAgIGNvbnN0IG5ld0NvbnRyb2xCdXR0b25zID0gY3JlYXRlKCc8ZGl2IGNsYXNzPVwiY2ktY29udHJvbC1idXR0b25zLXBcIj48L2Rpdj4nKVxyXG5cclxuICAgIGFwcGVuZChuZXdDb250cm9sQnV0dG9ucywgdXBsb2FkQnV0dG9uKVxyXG4gICAgYXBwZW5kKG5ld0NvbnRyb2xCdXR0b25zLCBoaWRkZW5VcGxvYWRJbnB1dClcclxuICAgIGFwcGVuZChjaGF0Q29udHJvbHMsIG5ld0NvbnRyb2xCdXR0b25zKVxyXG4gIH1cclxuXHJcbiAgc2V0dXBFdmVudHModXBsb2FkQnV0dG9uLCBoaWRkZW5VcGxvYWRJbnB1dCwgc2lkZWJhcilcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZmluZCwgb24gfSBmcm9tICcuLi91dGlscy9KcXVlcnlXcmFwcGVycydcclxuaW1wb3J0IHsgZ2V0SW1hZ2VRdWV1ZSwgcHJvY2Vzc0Ryb3BBbmRQYXN0ZUltYWdlcywgcmVtb3ZlQWxsRnJvbVF1ZXVlLCBTYXZlVmFsdWVUeXBlIH0gZnJvbSAnLi4vcHJvY2Vzc29ycy9GaWxlUHJvY2Vzc29yJ1xyXG5pbXBvcnQgeyBpc1Zlcmlvc25BZnRlcjEzLCB0IH0gZnJvbSAnLi4vdXRpbHMvVXRpbHMnXHJcbmltcG9ydCB7IGdldFVwbG9hZGluZ1N0YXRlcyB9IGZyb20gJy4vTG9hZGVyJ1xyXG5cclxubGV0IGhvb2tJc0hhbmRsaW5nVGhlTWVzc2FnZSA9IGZhbHNlXHJcbmxldCBldmVudElzSGFuZGxpbmdUaGVNZXNzYWdlID0gZmFsc2VcclxuXHJcbmNvbnN0IGltYWdlVGVtcGxhdGUgPSAoaW1hZ2VQcm9wczogU2F2ZVZhbHVlVHlwZSk6IHN0cmluZyA9PiBgPGRpdiBjbGFzcz1cImNpLW1lc3NhZ2UtaW1hZ2VcIj48aW1nIHNyYz1cIiR7aW1hZ2VQcm9wcy5pbWFnZVNyY31cIiBhbHQ9XCIke2ltYWdlUHJvcHMubmFtZSB8fCB0KCd1bmFibGVUb0xvYWRJbWFnZScpfVwiPjwvZGl2PmBcclxuXHJcbmNvbnN0IG1lc3NhZ2VUZW1wbGF0ZSA9IChpbWFnZVF1ZXVlOiBTYXZlVmFsdWVUeXBlW10pID0+IHtcclxuICBjb25zdCBpbWFnZVRlbXBsYXRlczogc3RyaW5nW10gPSBpbWFnZVF1ZXVlLm1hcCgoaW1hZ2VQcm9wczogU2F2ZVZhbHVlVHlwZSk6IHN0cmluZyA9PiBpbWFnZVRlbXBsYXRlKGltYWdlUHJvcHMpKVxyXG4gIHJldHVybiBgPGRpdiBjbGFzcz1cImNpLW1lc3NhZ2VcIj4ke2ltYWdlVGVtcGxhdGVzLmpvaW4oJycpfTwvZGl2PmBcclxufVxyXG5cclxuY29uc3QgcHJlQ3JlYXRlQ2hhdE1lc3NhZ2VIYW5kbGVyID0gKHNpZGViYXI6IEpRdWVyeSkgPT4gKGNoYXRNZXNzYWdlOiBhbnksIHVzZXJPcHRpb25zOiBuZXZlciwgbWVzc2FnZU9wdGlvbnM6IGFueSkgPT4ge1xyXG4gIGlmIChldmVudElzSGFuZGxpbmdUaGVNZXNzYWdlKSByZXR1cm5cclxuXHJcbiAgaG9va0lzSGFuZGxpbmdUaGVNZXNzYWdlID0gdHJ1ZVxyXG4gIGNvbnN0IGltYWdlUXVldWU6IFNhdmVWYWx1ZVR5cGVbXSA9IGdldEltYWdlUXVldWUoKVxyXG4gIGlmICghaW1hZ2VRdWV1ZS5sZW5ndGgpIHtcclxuICAgIGhvb2tJc0hhbmRsaW5nVGhlTWVzc2FnZSA9IGZhbHNlXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGNvbnN0IHVwbG9hZFN0YXRlID0gZ2V0VXBsb2FkaW5nU3RhdGVzKHNpZGViYXIpXHJcbiAgdXBsb2FkU3RhdGUub24oKVxyXG5cclxuICBjb25zdCBjb250ZW50ID0gYCR7bWVzc2FnZVRlbXBsYXRlKGltYWdlUXVldWUpfTxkaXYgY2xhc3M9XCJjaS1ub3Rlc1wiPiR7Y2hhdE1lc3NhZ2UuY29udGVudH08L2Rpdj5gXHJcblxyXG4gIGNoYXRNZXNzYWdlLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgY2hhdE1lc3NhZ2UuX3NvdXJjZS5jb250ZW50ID0gY29udGVudFxyXG4gIG1lc3NhZ2VPcHRpb25zLmNoYXRCdWJibGUgPSBmYWxzZVxyXG5cclxuICByZW1vdmVBbGxGcm9tUXVldWUoc2lkZWJhcilcclxuICBob29rSXNIYW5kbGluZ1RoZU1lc3NhZ2UgPSBmYWxzZVxyXG4gIHVwbG9hZFN0YXRlLm9mZigpXHJcbn1cclxuXHJcbmNvbnN0IGVtcHR5Q2hhdEV2ZW50SGFuZGxlciA9IChzaWRlYmFyOiBKUXVlcnkpID0+IGFzeW5jIChldnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICBpZiAoaG9va0lzSGFuZGxpbmdUaGVNZXNzYWdlIHx8IChldnQuY29kZSAhPT0gJ0VudGVyJyAmJiBldnQuY29kZSAhPT0gJ051bXBhZEVudGVyJykgfHwgZXZ0LnNoaWZ0S2V5KSByZXR1cm5cclxuICBldmVudElzSGFuZGxpbmdUaGVNZXNzYWdlID0gdHJ1ZVxyXG5cclxuICBjb25zdCB1cGxvYWRTdGF0ZSA9IGdldFVwbG9hZGluZ1N0YXRlcyhzaWRlYmFyKVxyXG4gIGNvbnN0IGltYWdlUXVldWU6IFNhdmVWYWx1ZVR5cGVbXSA9IGdldEltYWdlUXVldWUoKVxyXG4gIGlmICghaW1hZ2VRdWV1ZS5sZW5ndGgpIHtcclxuICAgIGV2ZW50SXNIYW5kbGluZ1RoZU1lc3NhZ2UgPSBmYWxzZVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHVwbG9hZFN0YXRlLm9uKClcclxuXHJcbiAgY29uc3QgY2hhdE1lc3NhZ2VUeXBlID0gaXNWZXJpb3NuQWZ0ZXIxMygpXHJcbiAgICA/IENPTlNULkNIQVRfTUVTU0FHRV9TVFlMRVMuT09DXHJcbiAgICA6IENPTlNULkNIQVRfTUVTU0FHRV9UWVBFUy5PT0NcclxuXHJcbiAgY29uc3QgbWVzc2FnZURhdGEgPSB7XHJcbiAgICBjb250ZW50OiBtZXNzYWdlVGVtcGxhdGUoaW1hZ2VRdWV1ZSksXHJcbiAgICB0eXBlOiB0eXBlb2YgY2hhdE1lc3NhZ2VUeXBlICE9PSAndW5kZWZpbmVkJyA/IGNoYXRNZXNzYWdlVHlwZSA6IDEsXHJcbiAgICB1c2VyOiAoZ2FtZSBhcyBHYW1lKS51c2VyLFxyXG4gIH1cclxuICBhd2FpdCBDaGF0TWVzc2FnZS5jcmVhdGUobWVzc2FnZURhdGEpXHJcbiAgcmVtb3ZlQWxsRnJvbVF1ZXVlKHNpZGViYXIpXHJcbiAgdXBsb2FkU3RhdGUub2ZmKClcclxuICBldmVudElzSGFuZGxpbmdUaGVNZXNzYWdlID0gZmFsc2VcclxufVxyXG5cclxuY29uc3QgcGFzdEFuZERyb3BFdmVudEhhbmRsZXIgPSAoc2lkZWJhcjogSlF1ZXJ5KSA9PiAoZXZ0OiBhbnkpID0+IHtcclxuICBjb25zdCBvcmlnaW5hbEV2ZW50OiBDbGlwYm9hcmRFdmVudCB8IERyYWdFdmVudCA9IGV2dC5vcmlnaW5hbEV2ZW50XHJcbiAgY29uc3QgZXZlbnREYXRhOiBEYXRhVHJhbnNmZXIgfCBudWxsID0gKG9yaWdpbmFsRXZlbnQgYXMgQ2xpcGJvYXJkRXZlbnQpLmNsaXBib2FyZERhdGEgfHwgKG9yaWdpbmFsRXZlbnQgYXMgRHJhZ0V2ZW50KS5kYXRhVHJhbnNmZXJcclxuICBpZiAoIWV2ZW50RGF0YSkgcmV0dXJuXHJcblxyXG4gIHByb2Nlc3NEcm9wQW5kUGFzdGVJbWFnZXMoZXZlbnREYXRhLCBzaWRlYmFyKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNVcGxvYWRBcmVhUmVuZGVyZWQgPSAoc2lkZWJhcjogSlF1ZXJ5KTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgdXBsb2FkQXJlYSA9IGZpbmQoJyNjaS1jaGF0LXVwbG9hZC1hcmVhJywgc2lkZWJhcilcclxuICByZXR1cm4gISF1cGxvYWRBcmVhLmxlbmd0aDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRDaGF0U2lkZWJhciA9IChzaWRlYmFyOiBKUXVlcnkpID0+IHtcclxuICBIb29rcy5vbigncHJlQ3JlYXRlQ2hhdE1lc3NhZ2UnLCBwcmVDcmVhdGVDaGF0TWVzc2FnZUhhbmRsZXIoc2lkZWJhcikpXHJcblxyXG4gIC8vIFRoaXMgc2hvdWxkIG9ubHkgcnVuIHdoZW4gdGhlcmUgaXMgbm90aGluZyBpbiB0aGUgY2hhdFxyXG4gIG9uKHNpZGViYXIsICdrZXl1cCcsIGVtcHR5Q2hhdEV2ZW50SGFuZGxlcihzaWRlYmFyKSlcclxuXHJcbiAgb24oc2lkZWJhciwgJ3Bhc3RlIGRyb3AnLCBwYXN0QW5kRHJvcEV2ZW50SGFuZGxlcihzaWRlYmFyKSlcclxufVxyXG4iLCJpbXBvcnQgeyBmaW5kLCBvbiB9IGZyb20gJy4uL3V0aWxzL0pxdWVyeVdyYXBwZXJzJ1xyXG5pbXBvcnQgeyBJbWFnZVBvcG91dEltcGxlbWVudGF0aW9uLCBpc1Zlcmlvc25BZnRlcjEzIH0gZnJvbSAnLi4vdXRpbHMvVXRpbHMnXHJcblxyXG5leHBvcnQgY29uc3QgaW5pdENoYXRNZXNzYWdlID0gKGNoYXRNZXNzYWdlOiBKUXVlcnkpID0+IHtcclxuICBjb25zdCBpbWFnZXMgPSBmaW5kKCcuY2ktbWVzc2FnZS1pbWFnZSBpbWcnLCBjaGF0TWVzc2FnZSlcclxuICBpZiAoIWltYWdlc1swXSkgcmV0dXJuXHJcblxyXG4gIGNvbnN0IGNsaWNrSW1hZ2VIYW5kbGUgPSAoZXZ0OiBFdmVudCkgPT4ge1xyXG4gICAgY29uc3Qgc3JjID0gKGV2dC50YXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkuc3JjXHJcbiAgICBjb25zdCBpbWFnZVBvcHVwID0gSW1hZ2VQb3BvdXRJbXBsZW1lbnRhdGlvbigpXHJcblxyXG4gICAgaWYgKGlzVmVyaW9zbkFmdGVyMTMoKSkge1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIG5ldyBpbWFnZVBvcHVwKHsgc3JjLCBlZGl0YWJsZTogZmFsc2UsIHNoYXJlYWJsZTogdHJ1ZSB9KS5yZW5kZXIodHJ1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgbmV3IGltYWdlUG9wdXAoc3JjLCB7IGVkaXRhYmxlOiBmYWxzZSwgc2hhcmVhYmxlOiB0cnVlIH0pLnJlbmRlcih0cnVlKVxyXG4gICAgfVxyXG4gIH1cclxuICBvbihpbWFnZXMsICdjbGljaycsIGNsaWNrSW1hZ2VIYW5kbGUpXHJcbn1cclxuIiwiaW1wb3J0IHt0fSBmcm9tICcuLi91dGlscy9VdGlscydcclxuXHJcbmNvbnN0IGltYWdlTWFya2Rvd25SZWcgPSAvIVxccypjaVxccypcXHxcXHMqKC4rPylcXHMqIS9naVxyXG5jb25zdCBpbWFnZVJlZyA9IC9cXHcrXFwuKGdpZnxwbmd8anBnfGpwZWd8d2VicHxzdmd8cHNkfGJtcHx0aWYpL2dpXHJcblxyXG5jb25zdCBpbWFnZVRlbXBsYXRlID0gKHNyYzogc3RyaW5nKTogc3RyaW5nID0+IGA8ZGl2IGNsYXNzPVwiY2ktbWVzc2FnZS1pbWFnZVwiPjxpbWcgc3JjPVwiJHtzcmN9XCIgYWx0PVwiJHt0KCd1bmFibGVUb0xvYWRJbWFnZScpfVwiPjwvZGl2PmBcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9jZXNzTWVzc2FnZSA9IChtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghbWVzc2FnZS5tYXRjaChpbWFnZU1hcmtkb3duUmVnKSkgcmV0dXJuIG1lc3NhZ2VcclxuXHJcbiAgcmV0dXJuIG1lc3NhZ2UucmVwbGFjZUFsbChpbWFnZU1hcmtkb3duUmVnLCAobTogc3RyaW5nLCBzcmM6IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKCFzcmMubWF0Y2goaW1hZ2VSZWcpKSByZXR1cm4gbVxyXG4gICAgcmV0dXJuIGltYWdlVGVtcGxhdGUoc3JjKVxyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0ICcuL3N0eWxlcy9jaGF0LWltYWdlcy5zY3NzJ1xyXG5pbXBvcnQgeyBpbml0VXBsb2FkQXJlYSB9IGZyb20gJy4vc2NyaXB0cy9jb21wb25lbnRzL1VwbG9hZEFyZWEnXHJcbmltcG9ydCB7IGluaXRVcGxvYWRCdXR0b24gfSBmcm9tICcuL3NjcmlwdHMvY29tcG9uZW50cy9VcGxvYWRCdXR0b24nXHJcbmltcG9ydCB7IGluaXRDaGF0U2lkZWJhciwgaXNVcGxvYWRBcmVhUmVuZGVyZWQgfSBmcm9tICcuL3NjcmlwdHMvY29tcG9uZW50cy9DaGF0U2lkZWJhcidcclxuaW1wb3J0IHsgaW5pdENoYXRNZXNzYWdlIH0gZnJvbSAnLi9zY3JpcHRzL2NvbXBvbmVudHMvQ2hhdE1lc3NhZ2UnXHJcbmltcG9ydCB7IGNyZWF0ZSwgZmluZCB9IGZyb20gJy4vc2NyaXB0cy91dGlscy9KcXVlcnlXcmFwcGVycydcclxuaW1wb3J0IHsgcHJvY2Vzc01lc3NhZ2UgfSBmcm9tICcuL3NjcmlwdHMvcHJvY2Vzc29ycy9NZXNzYWdlUHJvY2Vzc29yJ1xyXG5pbXBvcnQgeyBjcmVhdGVVcGxvYWRGb2xkZXIsIGdldFNldHRpbmdzLCByZWdpc3RlclNldHRpbmcgfSBmcm9tICcuL3NjcmlwdHMvdXRpbHMvU2V0dGluZ3MnXHJcbmltcG9ydCB7IGlzVmVyaW9zbkFmdGVyMTMgfSBmcm9tICcuL3NjcmlwdHMvdXRpbHMvVXRpbHMnXHJcblxyXG5jb25zdCByZWdpc3RlclNldHRpbmdzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHNldHRpbmdzID0gZ2V0U2V0dGluZ3MoKVxyXG4gIHNldHRpbmdzLmZvckVhY2goKHNldHRpbmcpID0+IHJlZ2lzdGVyU2V0dGluZyhzZXR0aW5nKSlcclxufVxyXG5cclxuSG9va3Mub25jZSgnaW5pdCcsIGFzeW5jICgpID0+IHtcclxuICBDT05GSUcuZGVidWcuaG9va3MgPSB0cnVlXHJcblxyXG4gIHJlZ2lzdGVyU2V0dGluZ3MoKVxyXG4gIHJlZ2lzdGVySG9va3MoKVxyXG5cclxuICBhd2FpdCBjcmVhdGVVcGxvYWRGb2xkZXIoKVxyXG59KVxyXG5cclxuY29uc3QgcmVnaXN0ZXJIb29rcyA9ICgpID0+IHtcclxuICBpZiAoaXNWZXJpb3NuQWZ0ZXIxMygpKSB7XHJcbiAgICBIb29rcy5vbigncmVuZGVyQ2hhdE1lc3NhZ2VIVE1MJywgKF8wOiBuZXZlciwgY2hhdE1lc3NhZ2VFbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBjaGF0TWVzc2FnZSA9IGNyZWF0ZShjaGF0TWVzc2FnZUVsZW1lbnQpXHJcblxyXG4gICAgICBjb25zdCBjaU1lc3NhZ2UgPSBmaW5kKCcuY2ktbWVzc2FnZS1pbWFnZScsIGNoYXRNZXNzYWdlKVxyXG4gICAgICBpZiAoIWNpTWVzc2FnZVswXSkgcmV0dXJuXHJcblxyXG4gICAgICBpbml0Q2hhdE1lc3NhZ2UoY2hhdE1lc3NhZ2UpXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGluaXRFdmVudHMgPSAoc2lkZWJhcjogSlF1ZXJ5KSA9PiB7XHJcbiAgICAgIC8vIFByZXZlbnQgYWRkaW5nIGV2ZW50cyBtdWx0aXBsZSB0aW1lc1xyXG4gICAgICBpZiAoaXNVcGxvYWRBcmVhUmVuZGVyZWQoc2lkZWJhcikpIHJldHVyblxyXG5cclxuICAgICAgaW5pdFVwbG9hZEFyZWEoc2lkZWJhcilcclxuICAgICAgLy8gUmVtb3ZlZCBpbiB2ZXJzaW9uIDEzIFxyXG4gICAgICAvLyBpbml0VXBsb2FkQnV0dG9uKHNpZGViYXIpXHJcbiAgICAgIGluaXRDaGF0U2lkZWJhcihzaWRlYmFyKVxyXG4gICAgfVxyXG5cclxuICAgIEhvb2tzLm9uKCdjb2xsYXBzZVNpZGViYXInLCAoc2lkZWJhcjogYW55LCBjb2xsYXBzZWQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgaWYgKCFzaWRlYmFyIHx8IGNvbGxhcHNlZCkgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBzaWRlYmFyRWxlbWVudCA9IHNpZGViYXIuZWxlbWVudFxyXG4gICAgICBpZiAoIXNpZGViYXJFbGVtZW50KSByZXR1cm5cclxuXHJcbiAgICAgIGNvbnN0IGhhc0NoYXRFbGVtZW50ID0gc2lkZWJhckVsZW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXQtbWVzc2FnZScpXHJcbiAgICAgIGlmICghaGFzQ2hhdEVsZW1lbnQpIHJldHVyblxyXG5cclxuICAgICAgY29uc3Qgc2lkZWJhckpxID0gJChzaWRlYmFyRWxlbWVudClcclxuICAgICAgaW5pdEV2ZW50cyhzaWRlYmFySnEpXHJcbiAgICB9KVxyXG5cclxuICAgIEhvb2tzLm9uKCdhY3RpdmF0ZUNoYXRMb2cnLCAoY2hhdExvZzogYW55KSA9PiB7XHJcbiAgICAgIGlmICghY2hhdExvZykgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBjaGF0TG9nRWxlbWVudCA9IGNoYXRMb2cuZWxlbWVudFxyXG4gICAgICBpZiAoIWNoYXRMb2dFbGVtZW50KSByZXR1cm5cclxuXHJcbiAgICAgIGNvbnN0IGhhc0NoYXRFbGVtZW50ID0gY2hhdExvZ0VsZW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXQtbWVzc2FnZScpXHJcbiAgICAgIGlmICghaGFzQ2hhdEVsZW1lbnQpIHJldHVyblxyXG5cclxuICAgICAgY29uc3QgY2hhdExvZ0pxID0gJChjaGF0TG9nRWxlbWVudClcclxuICAgICAgaW5pdEV2ZW50cyhjaGF0TG9nSnEpXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBIb29rcy5vbigncmVuZGVyQ2hhdE1lc3NhZ2UnLCAoXzA6IG5ldmVyLCBjaGF0TWVzc2FnZTogSlF1ZXJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNpTWVzc2FnZSA9IGZpbmQoJy5jaS1tZXNzYWdlLWltYWdlJywgY2hhdE1lc3NhZ2UpXHJcbiAgICAgIGlmICghY2lNZXNzYWdlWzBdKSByZXR1cm5cclxuXHJcbiAgICAgIGluaXRDaGF0TWVzc2FnZShjaGF0TWVzc2FnZSlcclxuICAgIH0pXHJcblxyXG4gICAgSG9va3Mub24oJ3JlbmRlclNpZGViYXJUYWInLCAoXzA6IG5ldmVyLCBzaWRlYmFyOiBKUXVlcnkpID0+IHtcclxuICAgICAgY29uc3Qgc2lkZWJhckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHNpZGViYXJbMF1cclxuICAgICAgaWYgKCFzaWRlYmFyRWxlbWVudCkgcmV0dXJuXHJcblxyXG4gICAgICBjb25zdCBoYXNDaGF0RWxlbWVudCA9IHNpZGViYXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGF0LW1lc3NhZ2UnKVxyXG4gICAgICBpZiAoIWhhc0NoYXRFbGVtZW50KSByZXR1cm5cclxuXHJcbiAgICAgIGluaXRVcGxvYWRBcmVhKHNpZGViYXIpXHJcbiAgICAgIGluaXRVcGxvYWRCdXR0b24oc2lkZWJhcilcclxuICAgICAgaW5pdENoYXRTaWRlYmFyKHNpZGViYXIpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgSG9va3Mub24oJ3ByZUNyZWF0ZUNoYXRNZXNzYWdlJywgKGNoYXRNZXNzYWdlOiBhbnksIHVzZXJPcHRpb25zOiBuZXZlciwgbWVzc2FnZU9wdGlvbnM6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgcHJvY2Vzc2VkTWVzc2FnZTogc3RyaW5nID0gcHJvY2Vzc01lc3NhZ2UoY2hhdE1lc3NhZ2UuY29udGVudClcclxuICAgIGlmIChjaGF0TWVzc2FnZS5jb250ZW50ID09PSBwcm9jZXNzZWRNZXNzYWdlKSByZXR1cm5cclxuXHJcbiAgICBjaGF0TWVzc2FnZS5jb250ZW50ID0gcHJvY2Vzc2VkTWVzc2FnZVxyXG4gICAgY2hhdE1lc3NhZ2UuX3NvdXJjZS5jb250ZW50ID0gcHJvY2Vzc2VkTWVzc2FnZVxyXG4gICAgbWVzc2FnZU9wdGlvbnMuY2hhdEJ1YmJsZSA9IGZhbHNlXHJcbiAgfSlcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlIiwiaHRtbCIsImJlZm9yZSIsInJlZmVyZW5jZU5vZGUiLCJuZXdOb2RlIiwiZmluZCIsInNlbGVjdG9yIiwicGFyZW50Tm9kZSIsImFwcGVuZCIsIm9uIiwiZXZlbnRUeXBlIiwiZXZlbnRGdW5jdGlvbiIsInRyaWdnZXIiLCJyZW1vdmVDbGFzcyIsImNsYXNzU3RyaW5nIiwiYWRkQ2xhc3MiLCJyZW1vdmUiLCJub2RlIiwiYXR0ciIsImF0dHJJZCIsImF0dHJWYWx1ZSIsInJlbW92ZUF0dHIiLCJmb2N1cyIsIk9SSUdJTl9GT0xERVIiLCJ0IiwidGV4dCIsIl9hIiwicmFuZG9tU3RyaW5nIiwidXNlckNhblVwbG9hZCIsInNpbGVudCIsInVzZXJSb2xlIiwiZmlsZVVwbG9hZFBlcm1pc3Npb25zIiwiX2IiLCJfYyIsInVwbG9hZFBlcm1pc3Npb24iLCJfZCIsImdldEZvdW5kcnlWZXJzaW9uIiwiaXNWZXJpb3NuQWZ0ZXIxMyIsIkZpbGVQaWNrZXJJbXBsZW1lbnRhdGlvbiIsIkltYWdlUG9wb3V0SW1wbGVtZW50YXRpb24iLCJjcmVhdGVVcGxvYWRBcmVhIiwiaW5pdFVwbG9hZEFyZWEiLCJzaWRlYmFyIiwiY2hhdENvbnRyb2xzU2VsZWN0b3IiLCJjaGF0Q29udHJvbHMiLCJ1cGxvYWRBcmVhIiwiX21lcmdlTmFtZXNwYWNlcyIsImUiLCJyIiwiaSIsImNvcHlFeGlmV2l0aG91dE9yaWVudGF0aW9uIiwibyIsImdldEFwcDFTZWdtZW50IiwicyIsImEiLCJmIiwibCIsImMiLCJVWklQIiwidSIsImgiLCJkIiwiQSIsImciLCJwIiwibSIsIl8iLCJ3IiwiYiIsInkiLCJFIiwiRiIsIkIiLCJVIiwiQyIsIkkiLCJRIiwiTSIsIngiLCJTIiwiUiIsIlQiLCJPIiwiUCIsIkgiLCJMIiwicHVzaFYiLCJVUE5HIiwiZGVjb2RlSW1hZ2UiLCJfZ2V0QlBQIiwidiIsIl9kZWNvbXByZXNzIiwiX2luZmxhdGUiLCJfZmlsdGVyWmVybyIsIm4iLCJfcGFldGgiLCJfSUhEUiIsIl9jb3B5VGlsZSIsImFkZEVyciIsIk4iLCJEIiwiZGl0aGVyIiwiX21haW4iLCJjb21wcmVzc1BORyIsImNvbXByZXNzIiwiX3ByZXBhcmVEaWZmIiwiX3VwZGF0ZUZyYW1lIiwicXVhbnRpemUiLCJfZmlsdGVyTGluZSIsImdldEtEdHJlZSIsImdldE5lYXJlc3QiLCJwbGFuZURzdCIsInN0YXRzIiwiZXN0YXRzIiwic3BsaXRQaXhlbHMiLCJ2ZWNEb3QiLCJzZXQxNiIsInNldDMyIiwic2VlayIsImNvbnZlcnQiLCJDdXN0b21GaWxlIiwiQ3VzdG9tRmlsZVJlYWRlciIsImdldEZpbGVmcm9tRGF0YVVybCIsImdldERhdGFVcmxGcm9tRmlsZSIsImxvYWRJbWFnZSIsImdldEJyb3dzZXJOYW1lIiwiYXBwcm94aW1hdGVCZWxvd01heGltdW1DYW52YXNTaXplT2ZCcm93c2VyIiwiZ2V0TmV3Q2FudmFzQW5kQ3R4IiwiZHJhd0ltYWdlSW5DYW52YXMiLCJpc0lPUyIsImRyYXdGaWxlSW5DYW52YXMiLCIkVHJ5XzJfUG9zdCIsIiRUcnlfMl9DYXRjaCIsIiRUcnlfM19DYXRjaCIsImNhbnZhc1RvRmlsZSIsIiRJZl80IiwiJElmXzUiLCIkSWZfNiIsImNsZWFudXBDYW52YXNNZW1vcnkiLCJpc0F1dG9PcmllbnRhdGlvbkluQnJvd3NlciIsImdldEV4aWZPcmllbnRhdGlvbiIsImhhbmRsZU1heFdpZHRoT3JIZWlnaHQiLCJmb2xsb3dFeGlmT3JpZW50YXRpb24iLCJpbmNQcm9ncmVzcyIsInNldFByb2dyZXNzIiwiJElmXzIiLCIkTG9vcF8zIiwiJExvb3BfM19leGl0IiwiY29tcHJlc3NPbldlYldvcmtlciIsImltYWdlQ29tcHJlc3Npb24iLCIkVHJ5XzFfQ2F0Y2giLCJ0b2dnbGVDaGF0IiwiY2hhdCIsInRvZ2dsZSIsInRvZ2dsZVNwaW5uZXIiLCJjaGF0Rm9ybSIsInNwaW5uZXJJZCIsInNwaW5uZXIiLCJuZXdTcGlubmVyIiwiZ2V0VXBsb2FkaW5nU3RhdGVzIiwiY2hhdEZvcm1RdWVyeSIsImNyZWF0ZVVwbG9hZEZvbGRlciIsInVwbG9hZExvY2F0aW9uIiwibG9jYXRpb24iLCJnZXRTZXR0aW5nIiwic2V0U2V0dGluZyIsImtleSIsInZhbHVlIiwiZ2V0U2V0dGluZ3MiLCJuZXdVcGxvYWRMb2NhdGlvbiIsImRlZmF1bHRMb2NhdGlvbiIsInNob3VsZENoYW5nZUxvY2F0aW9uIiwicmVnaXN0ZXJTZXR0aW5nIiwic2V0dGluZyIsIlJFU1RSSUNURURfRE9NQUlOUyIsIkRPTV9QQVJTRVIiLCJpbWFnZVF1ZXVlIiwiaXNGaWxlSW1hZ2UiLCJmaWxlIiwiY3JlYXRlSW1hZ2VQcmV2aWV3IiwiaW1hZ2VTcmMiLCJpZCIsImFkZEV2ZW50VG9SZW1vdmVCdXR0b24iLCJyZW1vdmVCdXR0b24iLCJzYXZlVmFsdWUiLCJpbWFnZSIsImltZ0RhdGEiLCJ1cGxvYWRJbWFnZSIsImdlbmVyYXRlRmlsZU5hbWUiLCJ0eXBlIiwibmFtZSIsImZpbGVFeHRlbnNpb24iLCJuZXdOYW1lIiwiY29tcHJlc3NlZEltYWdlIiwibmV3SW1hZ2UiLCJpbWFnZUxvY2F0aW9uIiwiYWRkSW1hZ2VUb1F1ZXVlIiwidXBsb2FkaW5nU3RhdGVzIiwiaW1hZ2VQcmV2aWV3IiwiaW1hZ2VzRmlsZVJlYWRlckhhbmRsZXIiLCJldnQiLCJwcm9jZXNzSW1hZ2VGaWxlcyIsImZpbGVzIiwicmVhZGVyIiwicHJvY2Vzc0Ryb3BBbmRQYXN0ZUltYWdlcyIsImV2ZW50RGF0YSIsImV4dHJhY3RVcmxGcm9tRXZlbnREYXRhIiwiaW1hZ2VzIiwiaW1hZ2VVcmxzIiwiaW1nIiwiaXUiLCJyZCIsInVybHNGcm9tRXZlbnREYXRhSGFuZGxlciIsInVybHMiLCJpdGVtcyIsIml0ZW0iLCJnZXRJbWFnZVF1ZXVlIiwicmVtb3ZlQWxsRnJvbVF1ZXVlIiwiaW1hZ2VEYXRhIiwiaW1hZ2VFbGVtZW50IiwiY3JlYXRlVXBsb2FkQnV0dG9uIiwiY3JlYXRlSGlkZGVuVXBsb2FkSW5wdXQiLCJzZXR1cEV2ZW50cyIsInVwbG9hZEJ1dHRvbiIsImhpZGRlblVwbG9hZElucHV0IiwiaGlkZGVuVXBsb2FkSW5wdXRDaGFuZ2VFdmVudEhhbmRsZXIiLCJjdXJyZW50VGFyZ2V0IiwidXBsb2FkQnV0dG9uQ2xpY2tFdmVudEhhbmRsZXIiLCJpbml0VXBsb2FkQnV0dG9uIiwiY29udHJvbEJ1dHRvbnMiLCJuZXdDb250cm9sQnV0dG9ucyIsImhvb2tJc0hhbmRsaW5nVGhlTWVzc2FnZSIsImV2ZW50SXNIYW5kbGluZ1RoZU1lc3NhZ2UiLCJpbWFnZVRlbXBsYXRlIiwiaW1hZ2VQcm9wcyIsIm1lc3NhZ2VUZW1wbGF0ZSIsInByZUNyZWF0ZUNoYXRNZXNzYWdlSGFuZGxlciIsImNoYXRNZXNzYWdlIiwidXNlck9wdGlvbnMiLCJtZXNzYWdlT3B0aW9ucyIsInVwbG9hZFN0YXRlIiwiY29udGVudCIsImVtcHR5Q2hhdEV2ZW50SGFuZGxlciIsImNoYXRNZXNzYWdlVHlwZSIsIm1lc3NhZ2VEYXRhIiwicGFzdEFuZERyb3BFdmVudEhhbmRsZXIiLCJvcmlnaW5hbEV2ZW50IiwiaXNVcGxvYWRBcmVhUmVuZGVyZWQiLCJpbml0Q2hhdFNpZGViYXIiLCJpbml0Q2hhdE1lc3NhZ2UiLCJzcmMiLCJpbWFnZVBvcHVwIiwiaW1hZ2VNYXJrZG93blJlZyIsImltYWdlUmVnIiwicHJvY2Vzc01lc3NhZ2UiLCJtZXNzYWdlIiwicmVnaXN0ZXJTZXR0aW5ncyIsInJlZ2lzdGVySG9va3MiLCJfMCIsImNoYXRNZXNzYWdlRWxlbWVudCIsImluaXRFdmVudHMiLCJjb2xsYXBzZWQiLCJzaWRlYmFyRWxlbWVudCIsInNpZGViYXJKcSIsImNoYXRMb2ciLCJjaGF0TG9nRWxlbWVudCIsImNoYXRMb2dKcSIsInByb2Nlc3NlZE1lc3NhZ2UiXSwibWFwcGluZ3MiOiJBQUNPLE1BQU1BLEtBQVMsQ0FBQ0MsTUFBdUMsRUFBRUEsQ0FBSSxHQUN2REMsS0FBUyxDQUFDQyxHQUF1QkMsTUFBNEJELEVBQWMsT0FBT0MsQ0FBTyxHQUV6RkMsS0FBTyxDQUFDQyxHQUFrQkMsTUFBZ0NBLElBQWFBLEVBQVcsS0FBS0QsQ0FBUSxJQUFJLEVBQUVBLENBQVEsR0FDN0dFLEtBQVMsQ0FBQ0QsR0FBb0JILE1BQTRCRyxFQUFXLE9BQU9ILENBQU8sR0FFbkZLLEtBQUssQ0FBQ0YsR0FBb0JHLEdBQW1CQyxNQUFvQ0osRUFBVyxHQUFHRyxHQUFXQyxDQUFhLEdBQ3ZIQyxLQUFVLENBQUNMLEdBQW9CRyxNQUE4QkgsRUFBVyxRQUFRRyxDQUFTLEdB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Q0FBQyxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLEdBQUUsSUFBRyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsR0FBRSxJQUFHLElBQUcsQ0FBQyxHQUFFLENBQUMsR0FBRSxJQUFHLElBQUcsSUFBRyxDQUFDLEdBQUUsQ0FBQyxHQUFFLElBQUcsSUFBRyxJQUFHLENBQUMsR0FBRSxDQUFDLEdBQUUsSUFBRyxLQUFJLEtBQUksQ0FBQyxHQUFFLENBQUMsR0FBRSxJQUFHLEtBQUksS0FBSSxDQUFDLEdBQUUsQ0FBQyxJQUFHLEtBQUksS0FBSSxNQUFLLENBQUMsR0FBRSxDQUFDLElBQUcsS0FBSSxLQUFJLE1BQUssQ0FBQyxDQUFDLEVBQUVGLElBQUdLLElBQUVJLEVBQUssRUFBRSxHQUFFTCxJQUFFSyxFQUFLLEVBQUU7QUFBVyxJQUFBQSxFQUFLLEVBQUU7QUFBTSxRQUFJSCxJQUFFRyxFQUFLLEVBQUUsUUFBT0YsSUFBRSxHQUFFQyxJQUFFVCxLQUFHLEdBQUVXLElBQUUsR0FBRUMsSUFBRSxFQUFFO0FBQU8sUUFBTVgsS0FBSCxHQUFLO0FBQUMsYUFBS08sSUFBRUk7QUFBSSxRQUFBTCxFQUFFLEdBQUVFLEdBQUVELEtBQUdVLElBQUUsS0FBSyxJQUFJLE9BQU1OLElBQUVKLENBQUMsTUFBSUksSUFBRSxJQUFFLENBQUMsR0FBRUgsSUFBRUMsRUFBSyxFQUFFLFdBQVcsR0FBRUYsR0FBRVUsR0FBRSxHQUFFVCxJQUFFLENBQUMsR0FBRUQsS0FBR1U7QUFBRSxhQUFPVCxNQUFJO0FBQUEsSUFBQztBQUFDLFFBQUlJLElBQUVQLEVBQUUsTUFBS1EsSUFBRVIsRUFBRSxNQUFLUyxJQUFFVCxFQUFFLE1BQUtVLElBQUUsR0FBRUMsSUFBRSxHQUFFRSxJQUFFLEdBQUUsSUFBRSxHQUFFQyxJQUFFLEdBQUVDLElBQUU7QUFBRSxTQUFJVCxJQUFFLE1BQUlFLEVBQUVPLElBQUVYLEVBQUssRUFBRSxNQUFN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QUVBLElBQUVRLEVBQUVQLElBQUUsTUFBSSxHQUFFVSxFQUFFVixLQUFHRDtBQUFFLFNBQUlHLElBQUUsR0FBRUEsSUFBRUksR0FBRUosS0FBRztBQUFFLE9BQUlHLElBQUUsRUFBRUgsSUFBRSxPQUFWLE1BQWdCLEVBQUVBLEtBQUdRLEVBQUVMLElBQUdLLEVBQUVMO0FBQUEsRUFBSyxHQUFFSSxFQUFLLEVBQUUsWUFBVSxTQUFTLEdBQUUsR0FBRVYsR0FBRTtBQUFDLGFBQVFDLElBQUUsRUFBRSxRQUFPRSxJQUFFTyxFQUFLLEVBQUUsRUFBRSxPQUFNSixJQUFFLEdBQUVBLElBQUVMLEdBQUVLLEtBQUc7QUFBRSxVQUFNLEVBQUVBLElBQUUsTUFBUDtBQUFVLGlCQUFRRCxJQUFFQyxLQUFHLEdBQUVDLElBQUUsRUFBRUQsSUFBRSxJQUFHRSxJQUFFSCxLQUFHLElBQUVFLEdBQUVFLElBQUUsSUFBRUYsR0FBRUksSUFBRSxFQUFFTCxNQUFJRyxHQUFFRyxJQUFFRCxLQUFHLEtBQUdGLElBQUdFLEtBQUdDO0FBQUksVUFBQVosRUFBRUcsRUFBRVEsT0FBSyxLQUFHLEtBQUdILEdBQUVHO0FBQUEsRUFBSSxHQUFFRCxFQUFLLEVBQUUsV0FBUyxTQUFTLEdBQUUsR0FBRTtBQUFDLGFBQVFWLElBQUVVLEVBQUssRUFBRSxFQUFFLE9BQU1ULElBQUUsS0FBRyxHQUFFRSxJQUFFLEdBQUVBLElBQUUsRUFBRSxRQUFPQSxLQUFHLEdBQUU7QUFBQyxVQUFJRyxJQUFFLEVBQUVILE1BQUksSUFBRSxFQUFFQSxJQUFFO0FBQUcsUUFBRUEsS0FBR0gsRUFBRU0sT0FBS0w7QUFBQSxJQUFDO0FBQUEsRUFBQyxHQUFFUyxFQUFLLEVBQUUsU0FBTyxTQUFTLEdBQUUsR0FBRVYsR0FBRTtBQUFDLElBQUFBLE1BQUksSUFBRTtBQUFFLFFBQUlDLElBQUUsTUFBSTtBQUFFLE1BQUVBLE1BQUlELEdBQUUsRUFBRUMsSUFBRSxNQUFJRCxNQUFJO0FBQUEsRUFBQyxHQUFFVSxFQUFLLEVBQUUsU0FBTyxTQUFTLEdBQUUsR0FBRVYsR0FBRTtBQUFDLElBQUFBLE1BQUksSUFBRTtBQUFFLFFBQUlDLElBQUUsTUFBSTtBQUFFLE1BQUVBLE1BQUlELEdBQUUsRUFBRUMsSUFBRSxNQUFJRCxNQUFJLEdBQUUsRUFBRUMsSUFBRSxNQUFJRCxNQUFJO0FBQUEsRUFBRSxHQUFFVSxFQUFLLEVBQUUsU0FBTyxTQUFTLEdBQUUsR0FBRVYsR0FBRTtBQUFDLFlBQU8sRUFBRSxNQUFJLEtBQUcsRUFBRSxLQUFHLE1BQUksT0FBSyxRQUFNLElBQUUsTUFBSSxLQUFHQSxLQUFHO0FBQUEsRUFBQyxHQUFFVSxFQUFLLEVBQUUsU0FBTyxTQUFTLEdBQUUsR0FBRVYsR0FBRTtBQUFDLFlBQU8sRUFBRSxNQUFJLEtBQUcsRUFBRSxLQUFHLE1BQUksT0FBSyxJQUFFLEVBQUUsS0FBRyxNQUFJLE9BQUssU0FBTyxJQUFFLE1BQUksS0FBR0EsS0FBRztBQUFBLEVBQUMsR0FBRVUsRUFBSyxFQUFFLFNBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxZQUFPLEVBQUUsTUFBSSxLQUFHLEVBQUUsS0FBRyxNQUFJLE9BQUssSUFBRSxFQUFFLEtBQUcsTUFBSSxPQUFLLFNBQU8sSUFBRTtBQUFBLEVBQUUsR0FBRUEsRUFBSyxFQUFFLFNBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxZQUFPLEVBQUUsTUFBSSxLQUFHLEVBQUUsS0FBRyxNQUFJLE9BQUssSUFBRSxFQUFFLEtBQUcsTUFBSSxPQUFLLEtBQUcsRUFBRSxLQUFHLE1BQUksT0FBSyxTQUFPLElBQUU7QUFBQSxFQUFFLEdBQUVBLEVBQUssRUFBRSxLQUFHVixJQUFFLGFBQVlDLElBQUUsYUFBWSxFQUFDLFdBQVUsSUFBSUQsRUFBRSxFQUFFLEdBQUUsVUFBUyxJQUFJQSxFQUFFLEVBQUUsR0FBRSxNQUFLLENBQUMsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsRUFBRSxHQUFFLEtBQUksQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEdBQUcsR0FBRSxLQUFJLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsTUFBSyxJQUFJQSxFQUFFLEVBQUUsR0FBRSxLQUFJLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssT0FBTSxPQUFNLE9BQU0sT0FBTSxLQUFLLEdBQUUsS0FBSSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEdBQUUsQ0FBQyxHQUFFLE1BQUssSUFBSUMsRUFBRSxFQUFFLEdBQUUsT0FBTSxJQUFJRCxFQUFFLEdBQUcsR0FBRSxRQUFPLENBQUEsR0FBRyxPQUFNLElBQUlBLEVBQUUsRUFBRSxHQUFFLFFBQU8sQ0FBQSxHQUFHLE1BQUssSUFBSUEsRUFBRSxLQUFLLEdBQUUsT0FBTSxDQUFBLEdBQUcsT0FBTSxDQUFBLEdBQUcsTUFBSyxJQUFJQSxFQUFFLEtBQUss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QUVBLE1BQUksS0FBR3dCLEtBQUc7QUFBQSxJQUFDLEdBQUVELEVBQUUsRUFBRSxJQUFFLFNBQVNBLEdBQUV2QixHQUFFd0IsR0FBRTtBQUFDLGNBQU9ELEVBQUV2QixNQUFJLEtBQUd1QixFQUFFLEtBQUd2QixNQUFJLE9BQUssSUFBRXVCLEVBQUUsS0FBR3ZCLE1BQUksT0FBSyxTQUFPLElBQUVBLE1BQUksS0FBR3dCLEtBQUc7QUFBQSxJQUFDLEdBQUVELEVBQUUsRUFBRSxJQUFFLFNBQVNBLEdBQUV2QixHQUFFO0FBQUMsY0FBT3VCLEVBQUV2QixNQUFJLEtBQUd1QixFQUFFLEtBQUd2QixNQUFJLE9BQUssSUFBRXVCLEVBQUUsS0FBR3ZCLE1BQUksT0FBSyxTQUFPLElBQUVBO0FBQUEsSUFBRSxHQUFFdUIsRUFBRSxFQUFFLElBQUUsU0FBU0EsR0FBRXZCLEdBQUU7QUFBQyxjQUFPdUIsRUFBRXZCLE1BQUksS0FBR3VCLEVBQUUsS0FBR3ZCLE1BQUksT0FBSyxJQUFFdUIsRUFBRSxLQUFHdkIsTUFBSSxPQUFLLEtBQUd1QixFQUFFLEtBQUd2QixNQUFJLE9BQUssU0FBTyxJQUFFQTtBQUFBLElBQUUsR0FBRXVCLEVBQUUsRUFBRSxJQUFFLFdBQVU7QUFBQyxZQUFNQSxJQUFFLGFBQVl2QixJQUFFO0FBQVksYUFBTSxFQUFDLEdBQUUsSUFBSXVCLEVBQUUsRUFBRSxHQUFFLEdBQUUsSUFBSUEsRUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDLElBQUcsSUFBRyxJQUFHLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLEVBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxHQUFHLEdBQUUsR0FBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsSUFBSUEsRUFBRSxFQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE9BQU0sT0FBTSxPQUFNLE9BQU0sS0FBSyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFFLENBQUMsR0FBRSxHQUFFLElBQUl2QixFQUFFLEVBQUUsR0FBRSxHQUFFLElBQUl1QixFQUFFLEdBQUcsR0FBRSxHQUFFLENBQUEsR0FBRyxHQUFFLElBQUlBLEVBQUUsRUFBRSxHQUFFLEdBQUUsQ0FBQSxHQUFHLEdBQUUsSUFBSUEsRUFBRSxLQUFLLEdBQUUsR0FBRSxDQUFFLEdBQUMsR0FBRSxDQUFFLEdBQUMsR0FBRSxJQUFJQSxFQUFFLEtBQUssR0FBRSxHQUFFLENBQUUsR0FBQyxHQUFFLElBQUlBLEVBQUUsR0FBRyxHQUFFLEdBQUUsQ0FBQSxHQUFHLEdBQUUsSUFBSUEsRUFBRSxLQUFLLEdBQUUsR0FBRSxJQUFJdkIsRUFBRSxHQUFHLEdBQUUsR0FBRSxJQUFJQSxFQUFFLEVBQUUsR0FBRSxHQUFF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QUFJLFFBQUFnQixJQUFFQztBQUFFLFVBQU1DLElBQUUsQ0FBQ1gsSUFBRUcsR0FBRUosSUFBRUksR0FBRUYsSUFBRUUsR0FBRUQsSUFBRUMsQ0FBQztBQUFFLFdBQU0sRUFBQyxLQUFJRSxHQUFFLEdBQUVNLEdBQUUsR0FBRUgsR0FBRSxHQUFFQyxHQUFFLFFBQU9GLEVBQUUsSUFBSUEsRUFBRSxJQUFJLEtBQUlJLENBQUMsR0FBRUgsQ0FBQyxHQUFFLEtBQUlELEVBQUUsSUFBSUMsR0FBRUcsQ0FBQyxHQUFFLE9BQU0sS0FBSyxNQUFNLE1BQUlBLEVBQUUsRUFBRSxLQUFHLEtBQUcsS0FBSyxNQUFNLE1BQUlBLEVBQUUsRUFBRSxLQUFHLEtBQUcsS0FBSyxNQUFNLE1BQUlBLEVBQUUsRUFBRSxLQUFHLElBQUUsS0FBSyxNQUFNLE1BQUlBLEVBQUUsRUFBRSxLQUFHLE9BQUssRUFBQztBQUFBLEVBQUM7QUFBQyxNQUFJZCxJQUFFLEVBQUMsU0FBUSxDQUFDSixHQUFFdkIsTUFBSSxDQUFDdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxJQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxJQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxLQUFHdkIsRUFBRSxLQUFHdUIsRUFBRSxNQUFJdkIsRUFBRSxLQUFHdUIsRUFBRSxNQUFJdkIsRUFBRSxJQUFHdUIsRUFBRSxNQUFJdkIsRUFBRSxLQUFHdUIsRUFBRSxNQUFJdkIsRUFBRSxLQUFHdUIsRUFBRSxNQUFJdkIsRUFBRSxLQUFHdUIsRUFBRSxNQUFJdkIsRUFBRSxFQUFFLEdBQUUsS0FBSSxDQUFDdUIsR0FBRXZCLE1BQUl1QixFQUFFLEtBQUd2QixFQUFFLEtBQUd1QixFQUFFLEtBQUd2QixFQUFF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
