/* Two extraordinary executions: dot-chart scenes, war-on-drugs chart, hero runs, names list (with flags), press release, categories tabs, back to top. */
(function () {
'use strict';
var RM = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
function guard(fn) { try { fn(); } catch (e) { if (window.console) console.error(e); } }

/* ---------- data: one entry per person executed, Jan 2024 to 20 Oct 2026 ----------
   [0] offence group D drug, M murder, O other, I al-fahisha alone (Nazrul and Sweety); [1] punishment t ta'zir, q qisas, h hudud, n not stated;
   [2] nationality l Saudi, f foreign, u not stated */
var D = ["Mhl","Mhl","Mqf","Dtf","Dtf","Dtf","Mhl","Dtf","Mqf","Otl","Dtf","Mtl","Mtl","Dtf","Dtf","Dtf","Dtf","Itf","Mtl","Mhl","Mql","Mql","Mqf","Mql","Mql","Onl","Mhf","Mhf","Mhf","Mhf","Mql","Onl","Mhl","Mhl","Mhl","Mql","Mql","Onl","Onl","Mql","Mql","Onu","Onu","Onu","Onu","Onu","Onu","Onu","Mhf","Mhf","Mhf","Mhf","Mhf","Mql","Mql","Mhf","Mhf","Mtf","Mtf","Mhf","Mql","Mql","Mqf","Onl","Mql","Mql","Onl","Mql","Mqf","Mql","Mql","Mql","Mql","Onl","Onl","Mql","Mql","Otl","Mqf","Dtf","Dtf","Mhl","Onl","Mqf","Mql","Onl","Mql","Mql","Mql","Mnl","Mql","Mql","Dtf","Onl","Mql","Mql","Mql","Mql","Mql","Mql","Ohl","Mql","Mql","Otl","Mql","Mqf","Mql","Mhl","Mql","Dtf","Mqu","Mql","Otl","Dtf","Mql","Mql","Dtf","Dtf","Mql","Otl","Dtl","Dtf","Mqf","Dtf","Dtf","Dtf","Mql","Mtl","Dtl","Mql","Dtf","Mql","Dtl","Dtf","Dtf","Mql","Dtf","Mhl","Mhl","Mhl","Mhl","Mhf","Dtf","Mql","Dtl","Mql","Dtf","Mqf","Dtl","Mql","Mqf","Dtf","Mql","Onl","Mqf","Mql","Dtf","Dtf","Mql","Dtf","Mqf","Onl","Dtf","Mql","Dtf","Mql","Mql","Dtl","Mql","Dtl","Onl","Dtf","Mql","Dtl","Dtl","Mql","Mql","Dtl","Dtf","Mql","Dtl","Mqf","Dtf","Onl","Mqf","Dtf","Mql","Dtf","Mql","Onl","Onl","Onl","Dtf","Mql","Dtf","Mql","Dtf","Mql","Dtf","Dtf","Onl","Dtl","Dtl","Mql","Mql","Dtf","Mtl","Dtf","Dtf","Mql","Dtf","Dtf","Mql","Dtf","Dtf","Mql","Mql","Dtf","Mql","Dtf","Mql","Dtf","Mqf","Dtf","Mql","Mql","Mql","Mhf","Dtl","Mql","Mql","Dtf","Dtf","Dtf","Mql","Dtf","Dtf","Mql","Dtf","Mql","Mql","Mnl","Mnl","Dtf","Dtf","Dtf","Dtf","Mql","Dtf","Mql","Dtf","Dtf","Mql","Mql","Dtf","Dtl","Mql","Dtl","Mqf","Dtf","Dtf","Mql","Onl","Onl","Dtf","Dtf","Dtl","Dtl","Dtl","Dtl","Mql","Mql","Dtf","Mql","Dtf","Mqf","Otl","Otl","Otl","Dtf","Mql","Dtl","Dtl","Dtf","Dtf","Mnl","Mnl","Dtf","Mql","Dtf","Dtf","Ohl","Mql","Mtl","Dtl","Dtf","Otl","Otf","Otf","Otl","Mtl","Mql","Mhf","Dtl","Dtf","Mhf","Dtf","Mqf","Onl","Onl","Mql","Dtl","Dtf","Dtf","Dtf","Mql","Dtf","Mqf","Mtl","Dtf","Mtl","Mql","Dtf","Mql","Mql","Mql","Mqf","Dtl","Mql","Dtf","Mql","Dtf","Mql","Dtf","Mhf","Dtf","Dtf","Dtf","Dtf","Onl","Onl","Dtl","Dtf","Ohf","Ohf","Dtl","Onl","Onl","Ohl","Dtl","Mhl","Dtf","Mql","Mhf","Dtl","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Mql","Dtf","Mql","Dtl","Mql","Dtf","Mql","Mql","Mql","Mql","Dtf","Dtf","Mqf","Dtl","Mqf","Otl","Mql","Mql","Mql","Dtf","Mql","Mql","Mhl","Dtl","Dtl","Dtl","Dtl","Dtl","Dtl","Dtl","Mql","Mql","Otl","Mql","Mql","Dtf","Dtf","Dtf","Dtl","Mql","Onl","Onl","Dtf","Dtl","Mhl","Mhf","Dtf","Dtl","Dtf","Dtf","Mql","Dtl","Otl","Dtl","Dtf","Mql","Onl","Onl","Mql","Dtf","Dtf","Dtf","Mql","Otl","Mql","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtl","Dtf","Dtf","Dtl","Dtl","Mqf","Dtf","Otl","Dtl","Dtl","Dtl","Dtl","Mqf","Dtf","Dtf","Mqf","Dtl","Otl","Otl","Dtf","Dtf","Dtl","Otl","Mql","Dtf","Dtl","Dtl","Dtl","Otl","Dtf","Dtf","Dtf","Dtf","Dtf","Mql","Dtf","Dtf","Otf","Dtf","Dtf","Dtf","Mql","Dtf","Otl","Mql","Dtl","Mql","Dtf","Dtf","Dtf","Otl","Mql","Dtf","Dtf","Mhf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtl","Dtf","Dtf","Dtf","Otl","Otl","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Mql","Dtl","Dtf","Dtf","Dtf","Dtf","Otl","Otl","Dtf","Dtf","Dtf","Dtf","Dtf","Mql","Dtf","Dtf","Dtf","Dtf","Dtf","Dtl","Otl","Otl","Dtf","Mhl","Dtf","Dtl","Otl","Mtl","Dtf","Dtf","Dtf","Dtf","Mql","Dtf","Dtf","Dtl","Dtf","Dtf","Dtf","Otl","Dtf","Mtf","Mhf","Dtf","Dtl","Mhf","Dtf","Dtl","Mql","Dtf","Dtf","Dtf","Dtf","Dtf","Mtl","Mtl","Mtl","Dtf","Dtf","Dtf","Dtf","Dtl","Otl","Dtl","Dtf","Ohl","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Mtl","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Otl","Otl","Dtf","Dtf","Dtf","Mql","Mtl","Dtl","Mtl","Dtf","Dtf","Dtl","Dtf","Mql","Dtf","Dtf","Dtf","Dtf","Dtl","Mtl","Dtf","Dtf","Mql","Dtf","Dtf","Dtf","Dtf","Dtf","Mhl","Dtf","Dtf","Mql","Mtl","Dtl","Dtl","Dtl","Dtl","Otl","Dtf","Dtf","Dtf","Dtf","Onu","Mql","Dtf","Otl","Otl","Dtf","Dtf","Mql","Mhl","Dtl","Dtl","Dtf","Dtf","Dtf","Dtf","Dtf","Otl","Dtf","Dtf","Dtf","Dtf","Dtf","Mtl","Dtf","Dtf","Dtf","Dtf","Dtf","Mtl","Dtl","Dtl","Dtf","Dtf","Dtf","Dtf","Dtf","Otl","Otl","Dtf","Dtf","Mql","Dtf","Dtf","Dtf","Dtf","Mql","Dtf","Dtl","Dtl","Dtl","Mql","Dtf","Dtf","Mhl","Mhl","Mhl","Dtf","Dtf","Dtf","Mtf","Dtf","Dtf","Dtf","Mtl","Mtl","Mtl","Dtl","Mql","Dtl","Otl","Otl","Otl","Mtl","Dtf","Dtf","Dtf","Otl","Otl","Otl","Dtf","Dtf","Dtf","Dtf","Ohf","Dtf","Dtf","Dtf","Mqf","Dtl","Otl","Otl","Otl","Mhl","Mql","Dtl","Dtf","Dtf","Mql","Dtl","Dtl","Dtl","Mql","Dtl","Dtf","Dtf","Dtf","Dtf","Mql","Mhl","Dtl","Dtl","Mqf","Dtf","Mhf","Mqf","Dtf","Dtf","Otl","Dtf","Dtf","Dtf","Mhf","Dtf","Dtf","Mtl","Mtl","Mhl","Mhf","Dtl","Dtl","Dtl","Dtl","Dtl","Dtf","Dtf","Mtl","Dtl","Mhl","Dtf","Otf","Dtf","Dtf","Dtf","Dtf","Mql","Dtl","Dtf","Dtf","Dtf","Dtl","Mtl","Dtl","Dtl","Mhf","Mql","Dtl","Dtl","Dtf","Dtf","Mhl","Mql","Dtf","Dtf","Mql","Mqf","Dtl","Dtl","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Mql","Mql","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Mhl","Mql","Dtl","Mql","Dtf","Dtf","Dtl","Mqf","Dtf","Dtf","Dtf","Dtf","Dtf","Dtf","Mhf","Dtf","Ohl","Dtf","Dtf","Dtf","Mql","Dtf","Dtl","Mql","Mql","Dtl","Dtl","Mtl","Dtl","Dtf","Mqf","Dtl","Dtf","Mqf","Dtl","Mhl","Dhl","Dhl","Dtf","Dtf","Dtl","Mql","Dtf","Dtf","Dtf","Dtf","Dtf","Mqf","Mtf","Mql","Mhl","Dtf","Mql","Mql","Mql","Mqf","Mhl","Dtf","Mql","Dtf","Dtf","Dtf","Mhl","Mqf","Dtf","Itf","Otl","Otl","Otl","Otl","Otl","Dtf"];
var N = D.length, SWEETY = 17, NAZRUL = 880;
// S, R: scene 1's al-fahisha or sexual-offence cases and the rape or sexual-assault ones among them (one hue, a subset across groups)
var C = { D: '#e0434b', M: '#3b7ddd', O: '#7f9cbb', I: '#34c38f', S: '#f4b740', R: '#f4b740', t: '#e0434b', q: '#3b7ddd', h: '#7f9cbb', n: '#8a837c' }, G = '#5f5857';
var GN = { D: 'Drug-related', M: 'Murder', O: 'Armed robbery, terrorism, rape, kidnapping, treason', I: 'Al-fahisha (Bangladeshis)', S: 'Al-fahisha or sexual offenses', R: 'Rape or sexual assault', t: 'Ta’zir', q: 'Qisas', h: 'Hudud', n: 'Not stated' };
function cnt(f, k) { var a = {}; D.forEach(function (x) { if (f(x)) a[x[k]] = (a[x[k]] || 0) + 1; }); return a; }
function rank(s, o) { var r = []; for (var i = 0; i < N; i++) if (s(D[i])) r.push(i); return r.sort(function (a, b) { return o.indexOf(D[a][1]) - o.indexOf(D[b][1]) || o.indexOf(D[a][0]) - o.indexOf(D[b][0]) || a - b; }); }
function pc(p) { return p.toFixed(2); }
// counts given: the row shows "n · p%"; without counts it is a colour key only
function legend(title, keys, ak, counts, tot) {
  var rows = keys.filter(function (k) { return !counts || counts[k]; }).map(function (k) {
    return '<span class="r' + (ak && ak.indexOf(k) < 0 ? ' off' : '') + '"><i style="background:' + C[k] + '"></i>' + GN[k] +
      (counts ? '<em>' + counts[k] + ' · ' + pc(counts[k] / tot * 100) + '%</em>' : '') + '</span>';
  }).join('');
  return '<b>' + title + '</b>' + (rows ? '<div class="rs">' + rows + '</div>' : '');
}

/* ---------- canvas dot scenes ----------
   Each scene is a held chart and a column of cards; card n sets state S[n]. The 887 figures are drawn on one canvas
   and tweened in JS, so a state change repaints one bitmap instead of restyling 887 SVG nodes. */
var PERSON = 'M-.26-.88a.26.26 0 1 0 .52 0a.26.26 0 1 0-.52 0zM-.36-.55h.72a.1.1 0 0 1 .1.1v.7h-.2v.75h-.24v-.75h-.04v.75h-.24v-.75h-.2v-.7a.1.1 0 0 1 .1-.1z';
// Sweety's figure: same head and box, narrow shoulders and a flared dress over thinner legs
var WOMAN = 'M-.26-.88a.26.26 0 1 0 .52 0a.26.26 0 1 0-.52 0zM-.2-.55h.4q.1 0 .1.1l-.06.3.22.65h-.26v.5h-.16v-.5h-.08v.5h-.16v-.5h-.26l.22-.65-.06-.3q0-.1.1-.1z';
function bezier(x1, y1, x2, y2) {
  var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  return function (x) {
    if (x <= 0) return 0; if (x >= 1) return 1;
    var t = x;
    for (var i = 0; i < 8; i++) { var d = (3 * ax * t + 2 * bx) * t + cx; if (Math.abs(d) < 1e-6) break; t -= (((ax * t + bx) * t + cx) * t - x) / d; }
    t = Math.min(1, Math.max(0, t));
    return ((ay * t + by) * t + cy) * t;
  };
}
var EASE = bezier(.45, 0, .2, 1), MOVE = 1400, FADE = 1000, TINT = 500;
var RGB = {}, MIX = {};
function rgb(h) { if (!RGB[h]) { var n = parseInt(h.slice(1), 16); RGB[h] = [n >> 16 & 255, n >> 8 & 255, n & 255]; } return RGB[h]; }
// colour changes run in 8 steps, so every in-between shade can be a cached sprite
function mix(a, b, t) {
  var key = a + b + t;
  if (!MIX[key]) { var p = rgb(a), q = rgb(b), h = '#'; for (var i = 0; i < 3; i++) h += (256 | Math.round(p[i] + (q[i] - p[i]) * t)).toString(16).slice(1); RGB[h] = rgb(h); MIX[key] = h; }
  return MIX[key];
}
var SIDE = window.matchMedia ? matchMedia('(min-width: 760px) and (min-aspect-ratio: 11/10)') : { matches: false };

function scene(id, L, S, run) {
  var root = document.getElementById(id); if (!root) return;
  var cv = $('canvas', root), cx = cv.getContext && cv.getContext('2d');
  if (!cx || !window.Path2D || !window.Float32Array) { root.classList.add('nochart'); return; }
  var plot = $('.plot', root), leg = $('.leg', root), sticky = $('.sticky', root), labs = $$('.lab', root), steps = $$('.step', root), cards = steps.map(function (s) { return s.firstElementChild; });
  var path = new Path2D(PERSON), pathW = new Path2D(WOMAN);
  // per figure: from (f*), to (t*), now (c*)
  var A = function () { return new Float32Array(N); };
  var fx = A(), fy = A(), fk = A(), fa = A(), fcol = new Array(N);
  var tx = A(), ty = A(), tk = A(), ta = A(), tcol = new Array(N);
  var cX = A(), cY = A(), cK = A(), cA = A(), ccol = new Array(N);
  var w = 0, h = 0, dpr = 1, pos = {}, cur = -1, on = -1, t0 = 0, raf = 0, drawn = false, lastW = -1, tick = 0, SPR = {};
  // the named figures (L.C) paint last, so no dimmed figure behind them shows over their large icons
  var ord = [];
  for (var o = 0; o < N; o++) if (!L.C || L.C.indexOf(o) < 0) ord.push(o);
  if (L.C) ord = ord.concat(L.C);

  // one small bitmap per colour and size; the frame loop only blits them
  function sprite(col, kd, wf) {
    kd = Math.max(1, Math.round(kd * 4) / 4);
    var key = col + kd + (wf ? 'w' : ''), s = SPR[key];
    if (s) return s;
    var c = document.createElement('canvas'), ox = 1 + .46 * kd, oy = 1 + 1.14 * kd, g;
    c.width = Math.ceil(.92 * kd) + 2; c.height = Math.ceil(2.14 * kd) + 2;
    g = c.getContext('2d'); g.setTransform(kd, 0, 0, kd, ox, oy); g.fillStyle = col; g.fill(wf ? pathW : path);
    return (SPR[key] = { c: c, k: kd, ox: ox, oy: oy, w: c.width, h: c.height });
  }

  function grid(list, gw, gh, run) {
    var n = list.length, ar = 1.5, c0 = Math.max(1, Math.round(Math.sqrt(n * ar * gw / gh))), best = null, fit = null;
    for (var c = Math.max(1, c0 - 3); c <= c0 + 3; c++) {
      var r = Math.ceil(n / c), cw = Math.min(gw / c, gh / r / ar), b = { c: c, r: r, cw: cw };
      if (!best || cw > best.cw) best = b;
      // a run that must read as one group (scene 1's 15) only takes a column count that keeps it on one row
      if (run && run.s % c + run.n <= c && (!fit || cw > fit.cw)) fit = b;
    }
    if (fit) best = fit;
    var ch = best.cw * ar, ox = (gw - best.cw * best.c) / 2, oy = (gh - ch * best.r) / 2, p = { s: ch, x: A().fill(NaN), y: A() };
    list.forEach(function (j, m) { p.x[j] = ox + (m % best.c) * best.cw + best.cw / 2; p.y[j] = oy + Math.floor(m / best.c) * ch + ch / 2; });
    return p;
  }
  function lay() {
    pos = {};
    for (var k in L) {
      if (k === 'C') {
        var p = { s: Math.min(100, h * .46), x: A().fill(NaN), y: A() }, dx = Math.min(130, w * .22);
        L.C.forEach(function (j, n) { p.x[j] = w / 2 + (n ? 1 : -1) * dx; p.y[j] = h * .4; });
        pos.C = p;
      } else pos[k] = grid(L[k], w, h, k === 'A' ? run : null);
    }
  }
  function targets(n) {
    var st = S[n](), P = pos[st.l], Q = pos.A;
    leg.innerHTML = st.leg;
    for (var i = 0; i < N; i++) {
      var own = !isNaN(P.x[i]), f = st.f(D[i], i), k = (own ? P.s : Q.s) * .86 / 2.14 * (f[2] || 1);
      tx[i] = own ? P.x[i] : Q.x[i]; ty[i] = (own ? P.y[i] : Q.y[i]) + .07 * k; tk[i] = k;
      ta[i] = own || st.keep ? f[1] : .03; tcol[i] = f[0];
    }
    labs.forEach(function (e, m) {
      var j = (L.C || [])[m];
      if (st.lab && j != null) {
        var k = pos.C.s * .86 / 2.14;
        e.textContent = j == NAZRUL ? 'Nazrul Islam' : 'Sweety Akhtar';
        e.style.left = pos.C.x[j] + 'px'; e.style.top = (pos.C.y[j] + 1.12 * k + 10) + 'px';
        e.classList.add('on');
      } else e.classList.remove('on');
    });
  }
  function frame(now) {
    raf = 0;
    var el = now - t0, jump = RM || !drawn,
      em = jump ? 1 : EASE(Math.min(1, el / MOVE)), q = jump ? 1 : Math.min(1, el / FADE), ea = q * (2 - q), ec = jump ? 1 : Math.round(Math.min(1, el / TINT) * 8) / 8;
    cx.setTransform(1, 0, 0, 1, 0, 0);
    cx.clearRect(0, 0, cv.width, cv.height);
    for (var m = 0; m < N; m++) {
      var i = ord[m], x = fx[i] + (tx[i] - fx[i]) * em, y = fy[i] + (ty[i] - fy[i]) * em, k = fk[i] + (tk[i] - fk[i]) * em, a = fa[i] + (ta[i] - fa[i]) * ea,
        col = ec >= 1 || fcol[i] === tcol[i] ? tcol[i] : mix(fcol[i], tcol[i], ec);
      cX[i] = x; cY[i] = y; cK[i] = k; cA[i] = a; ccol[i] = col;
      if (a < .004) continue;
      var s = sprite(col, tk[i] * dpr, i === SWEETY), sc = k * dpr / s.k, dx = x * dpr - s.ox * sc, dy = y * dpr - s.oy * sc;
      cx.globalAlpha = a;
      if (Math.abs(sc - 1) < .01) cx.drawImage(s.c, Math.round(dx), Math.round(dy));
      else cx.drawImage(s.c, dx, dy, s.w * sc, s.h * sc);
    }
    drawn = true;
    if (em < 1 || ea < 1 || ec < 1) raf = requestAnimationFrame(frame);
  }
  function show(n, animate) {
    cur = n;
    if (drawn && animate) { fx.set(cX); fy.set(cY); fk.set(cK); fa.set(cA); fcol = ccol.slice(); }
    targets(n);
    if (!drawn || !animate) { fx.set(tx); fy.set(ty); fk.set(tk); fa.set(ta); fcol = tcol.slice(); drawn = false; }
    t0 = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  }
  // room for the tallest legend, and (phones) for the tallest card under the chart; measured once per width
  function measure() {
    var mh = 0, cards_h = 0, lw = leg.parentNode;
    lw.style.minHeight = '';
    S.forEach(function (s) { leg.innerHTML = s().leg; mh = Math.max(mh, leg.offsetHeight); });
    cards.forEach(function (c) { cards_h = Math.max(cards_h, c.offsetHeight); });
    lw.style.minHeight = mh + 'px';
    if (cur >= 0) leg.innerHTML = S[cur]().leg;
    if (!SIDE.matches) {
      var H = sticky.clientHeight || innerHeight;
      root.style.setProperty('--z', Math.min(.55, (cards_h + 40 + Math.max(0, H - innerHeight)) / H).toFixed(4));
    } else root.style.removeProperty('--z');
  }
  function resize() {
    var W = plot.clientWidth, H = plot.clientHeight;
    if (!W || !H) return;
    if (W === w && H === h) return;
    w = W; h = H; dpr = Math.min(2, window.devicePixelRatio || 1); SPR = {};
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    lay();
    show(cur < 0 ? 0 : cur, false);
  }
  function relayout() {
    var W = root.clientWidth;
    if (W !== lastW) { lastW = W; measure(); }
    resize();
  }
  function upd() {
    tick = 0;
    var r = root.getBoundingClientRect(), H = innerHeight;
    if (r.bottom < 0 || r.top > H) return;
    // phones: a card's change starts the moment the card appears; wide screens: once it nears the middle
    var thr = (SIDE.matches ? .72 : .97) * H, n = 0;
    for (var k = 0; k < cards.length; k++) if (cards[k].getBoundingClientRect().top < thr) n = k;
    if (n !== on) {
      on = n;
      steps.forEach(function (s, k) { s.classList.toggle('on', k === n); });
      show(n, true);
    }
  }
  relayout(); upd();
  addEventListener('scroll', function () { if (!tick) tick = requestAnimationFrame(upd); }, { passive: true });
  if (window.ResizeObserver) new ResizeObserver(function () { relayout(); }).observe(root);
  else addEventListener('resize', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { lastW = -1; relayout(); });
}

// Scene 1: offence
guard(function () {
  var cc = cnt(function () { return 1; }, 0), o1 = ['D', 'M', 'O', 'I'];
  // the 15 executed for al-fahisha or sexual offences: offence lists in the names list with rape, sexual assault or
  // "indecency" (13 + Nazrul and Sweety). They sit in one run where the murder block meets the other block: murder ones,
  // then other ones, then Nazrul and Sweety, then the rest of other. Each colour block stays whole on its own card.
  var SX = {};
  [77, 291, 299, 343, 344, 348, 458, 486, 502, 773, 829, 831, 871, SWEETY, NAZRUL].forEach(function (i) { SX[i] = 1; });
  var slot = function (i) { var g = D[i][0]; return g == 'D' ? 0 : g == 'M' ? (SX[i] ? 2 : 1) : g == 'I' ? 4 : SX[i] ? 3 : 5; };
  var A1 = rank(function () { return 1; }, []).sort(function (a, b) { return slot(a) - slot(b) || a - b; }), r0 = 0;
  while (!SX[A1[r0]]) r0++;
  var l1 = function (ak) { return legend('887 people executed, 2024–26', ak == null ? [] : o1, ak); };
  var lx = function (k) { return legend('887 people executed, 2024–26', [k], [k]); };
  var f1 = function (show, hi) { return function (x) { var g = x[0] == 'I' && !hi && show.indexOf('I') < 0 ? 'O' : x[0]; return g == 'I' ? [C.I, 1, 1] : show.indexOf(g) >= 0 && !hi ? [C[g], 1] : [G, .35]; }; };
  void cc;
  scene('s1', { A: A1, C: A1.filter(function (i) { return D[i][0] == 'I'; }) }, [
    function () { return { l: 'A', leg: l1(), f: function () { return [G, .8]; } }; },
    function () { return { l: 'A', leg: l1(['D']), f: f1(['D']) }; },
    function () { return { l: 'A', leg: l1(['M']), f: f1(['M']) }; },
    function () { return { l: 'A', leg: l1(['O', 'I']), f: f1(['O', 'I']) }; },
    // the 15 al-fahisha or sexual-offence cases, then the 13 of them with rape or sexual assault (Nazrul and Sweety drop out)
    function () { return { l: 'A', leg: lx('S'), f: function (x, i) { return SX[i] ? [C.S, 1] : [G, .35]; } }; },
    function () { return { l: 'A', leg: lx('R'), f: function (x, i) { return SX[i] && x[0] != 'I' ? [C.R, 1] : [G, .35]; } }; },
    function () { return { l: 'C', keep: 1, lab: 1, leg: l1(['I']), f: f1(['D', 'M', 'O', 'I'], 1) }; }
  ], { s: r0, n: 15 });
});

// Scene 2: punishment
guard(function () {
  var o2 = ['t', 'q', 'h', 'n'], A2 = rank(function () { return 1; }, o2), B2 = rank(function (x) { return x[2] == 'f'; }, o2),
    pa = cnt(function () { return 1; }, 1), pf = cnt(function (x) { return x[2] == 'f'; }, 1);
  // colour keys only (the cards carry the numbers); a category with nobody in it gets no key
  var ka = o2.filter(function (k) { return pa[k]; }), kf = o2.filter(function (k) { return pf[k]; });
  scene('s2', { A: A2, B: B2 }, [
    function () { return { l: 'A', leg: '<b>887 people executed</b>', f: function () { return [G, .8]; } }; },
    function () { return { l: 'A', leg: legend('887 people executed', ka, ['t']), f: function (x) { return x[1] == 't' ? [C.t, 1] : [G, .35]; } }; },
    function () { return { l: 'A', leg: legend('887 people executed', ka, ['q', 'h']), f: function (x) { return x[1] == 'q' || x[1] == 'h' ? [C[x[1]], 1] : [G, .35]; } }; },
    function () { return { l: 'B', leg: '<b>439 foreign nationals</b>', f: function () { return [G, .8]; } }; },
    function () { return { l: 'B', leg: legend('439 foreign nationals', kf), f: function (x) { return x[1] == 't' ? [C.t, 1] : [C[x[1]], .5]; } }; }
  ]);
});

/* ---------- executions per year, drug-related and other ---------- */
guard(function () {
  var Y = [[2014, 90, 42], [2015, 158, 63], [2016, 154, 23], [2017, 146, 58], [2018, 149, 60], [2019, 184, 85], [2020, 25, 4], [2021, 65, 0], [2022, 148, 21], [2023, 172, 2], [2024, 345, 121], [2025, 356, 240], [2026, 186, 115]];
  var NS = 'http://www.w3.org/2000/svg', box = document.getElementById('exp'), NAVY = '#232838', RED = '#8f2227', lastW = 0;
  if (!box) return;
  function el(n, a, t) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; }
  function draw() {
    var W = Math.max(260, box.clientWidth || 700);
    if (W === lastW) return; lastW = W;
    var sm = W < 560, L = sm ? 30 : 38, R = sm ? 4 : 8, T = 14, sl0 = (W - L - R) / Y.length,
      afs = sm ? 11 : 12,                                   // axis labels
      rot = sl0 < afs * 2.6,                                  // years no longer fit side by side: stand them up
      B = rot ? Math.round(afs * 2.4 + 8) : 26,
      fs = Math.max(10, Math.min(sm ? 11.5 : 13, sl0 * .5)),  // value labels shrink with the bars
      H = Math.round(Math.min(340, Math.max(250, W * .45))) + (rot ? B - 26 : 0),
      ph = H - T - B, pw = W - L - R, sl = pw / Y.length, bw = sl * .8;
    var y = function (v) { return T + ph - v / 400 * ph; }, svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, 'aria-hidden': 'true' });
    var bx = L + sl * 6, bwid = sl * 3;
    svg.appendChild(el('rect', { x: bx, y: T, width: bwid, height: ph, fill: '#c3d6c9' }));
    var tl = el('text', { x: bx + bwid / 2, y: T + 22, 'text-anchor': 'middle', 'font-size': sm ? 11 : 13, 'font-weight': 700, fill: '#1e6b3a' });
    if (bwid > 150) tl.textContent = 'Moratorium in place';
    else { tl.appendChild(el('tspan', { x: bx + bwid / 2, dy: 0 }, 'Moratorium')); tl.appendChild(el('tspan', { x: bx + bwid / 2, dy: sm ? 13 : 16 }, 'in place')); }
    svg.appendChild(tl);
    [0, 100, 200, 300, 400].forEach(function (v) {
      svg.appendChild(el('line', { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: v ? '#d9d4ca' : '#8a857c', 'stroke-width': v ? 1 : 1.2 }));
      svg.appendChild(el('text', { x: L - 6, y: y(v) + 4, 'text-anchor': 'end', 'font-size': afs, fill: '#777' }, v));
    });
    var X = function (i) { return L + sl * i + (sl - bw) / 2; };
    Y.forEach(function (d, i) {
      var t = d[1], dr = d[2], x = X(i), cxm = x + bw / 2;
      if (dr > 0) svg.appendChild(el('rect', { x: x, y: y(dr), width: bw, height: y(0) - y(dr), fill: RED }));
      svg.appendChild(el('rect', { x: x, y: y(t), width: bw, height: y(dr) - y(t), fill: NAVY }));
      if (dr > 0 && dr < t) svg.appendChild(el('line', { x1: x, x2: x + bw, y1: y(dr), y2: y(dr), stroke: '#faf9f6', 'stroke-width': 1.5 }));
      if (rot) svg.appendChild(el('text', { x: cxm + afs * .36, y: T + ph + 6, 'text-anchor': 'end', 'font-size': afs, fill: '#555', transform: 'rotate(-90 ' + (cxm + afs * .36) + ' ' + (T + ph + 6) + ')' }, d[0]));
      else svg.appendChild(el('text', { x: cxm, y: H - 8, 'text-anchor': 'middle', 'font-size': afs, fill: '#555' }, d[0]));
    });
    var pd = 'M' + X(0) + ',' + y(0) + 'V' + y(Y[0][1]);
    Y.forEach(function (d, i) { var x1 = X(i) + bw, gm = i < Y.length - 1 ? (x1 + X(i + 1)) / 2 : x1; pd += 'H' + gm; pd += i < Y.length - 1 ? 'V' + y(Y[i + 1][1]) : 'V' + y(0); });
    svg.appendChild(el('path', { d: pd, fill: 'none', stroke: '#3d3d3d', 'stroke-width': 2.4, 'stroke-linejoin': 'miter' }));
    var lab = function (x, yy, v) { svg.appendChild(el('text', { x: x, y: yy, 'text-anchor': 'middle', 'font-size': fs, 'font-weight': 700, fill: '#fff', stroke: '#1b1b1b', 'stroke-width': 3, 'paint-order': 'stroke', 'stroke-linejoin': 'round' }, v)); };
    Y.forEach(function (d, i) {
      var yr = d[0], t = d[1], dr = d[2], cxm = X(i) + bw / 2, o = t - dr;
      lab(cxm, y(t) + 4, t);
      if (yr != 2020) { if (dr >= 20) lab(cxm, y(dr / 2) + 4, dr); if (o >= 20) lab(cxm, y(dr + o / 2) + 4, o); }
    });
    box.replaceChildren ? box.replaceChildren(svg) : (box.textContent = '', box.appendChild(svg));
  }
  draw();
  if (window.ResizeObserver) new ResizeObserver(draw).observe(box); else addEventListener('resize', draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { lastW = 0; draw(); });
});

/* ---------- names list ---------- */
guard(function () {
  var ct = $('#ctl'), cl = $('#cl'), pg = $('#pg'), nr = $('.nr'), sp = $$('.nl span');
  if (!ct || !cl || !pg || !nr) return;
  var st = { g: '', c: '', p: 1 }, cn = {}, PS = 10, MOB = window.matchMedia ? matchMedia('(max-width: 800px)') : { matches: false };
  sp.forEach(function (x) { if (x.dataset.c) cn[x.dataset.c] = (cn[x.dataset.c] || 0) + 1; });
  var cs = Object.keys(cn).map(function (k) { return [k, cn[k]]; }).sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0]); }), mx = cs[0][1];
  var n = function (g) { return sp.filter(function (x) { return !g || x.dataset.g == g; }).length; };
  var esc = function (s) { return String(s).replace(/"/g, '\\"'); };
  ct.innerHTML = [['', 'All'], ['l', 'Saudi nationals'], ['f', 'Foreign nationals']].map(function (a) { return '<button type="button" data-g="' + a[0] + '" aria-pressed="false">' + a[1] + ' (' + n(a[0]) + ')</button>'; }).join('') + '<p></p>';
  // flags: img/flags.png holds them in this order, 16 px apart (tools/flags.py builds it from flag-icons)
  var FLAGS = ['Afghanistan', 'Bangladesh', 'Benin', 'Chad', 'Egypt', 'Eritrea', 'Ethiopia', 'India', 'Iran', 'Iraq', 'Jordan', 'Kenya', 'Kuwait', 'Myanmar',
    'Nepal', 'Nigeria', 'Oman', 'Pakistan', 'Philippines', 'Somalia', 'Sri Lanka', 'Sudan', 'Syria', 'Uganda', 'Yemen'];
  var flag = function (c) { var i = FLAGS.indexOf(c); return i < 0 ? '' : '<i class="fl' + (c == 'Nepal' ? ' np' : '') + '" style="background-position:0 ' + (-16 * i) + 'px" aria-hidden="true"></i>'; };
  cl.innerHTML = '<h3>Where the foreign nationals came from</h3>' + cs.map(function (a) {
    return '<li><button type="button" data-c="' + a[0] + '" aria-pressed="false" class="' + (a[0] == 'Bangladesh' ? 'bd' : '') + '" style="--w:' + (a[1] / mx * 100) + '%"><span>' + flag(a[0]) + a[0] + '</span><b>' + a[1] + '</b></button></li>';
  }).join('') + '<span class="sm">Countries as stated in the Interior Ministry statements. One person whose nationality was not stated is not assigned to a country. Click a country to filter the names.</span>';
  var note = $('p', ct);
  function pages(np, p) {
    var a = [], h = '', l = 0;
    for (var i = 1; i <= np; i++) if (i == 1 || i == np || Math.abs(i - p) <= 1 || (p <= 3 && i <= 4) || (p >= np - 2 && i >= np - 3)) a.push(i);
    a.forEach(function (i) { if (i - l > 1) h += '<span class="el">…</span>'; h += '<button type="button" data-p="' + i + '" class="' + (i == p ? 'on' : '') + '"' + (i == p ? ' aria-current="page"' : '') + '>' + i + '</button>'; l = i; });
    return '<button type="button" data-p="' + (p - 1) + '" ' + (p == 1 ? 'disabled' : '') + '>‹ Prev</button>' + h + '<button type="button" data-p="' + (p + 1) + '" ' + (p == np ? 'disabled' : '') + '>Next ›</button>';
  }
  function r() {
    var mt = sp.filter(function (x) { return (!st.g || x.dataset.g == st.g) && (!st.c || x.dataset.c == st.c); }), v = mt.length, np = Math.max(1, Math.ceil(v / PS));
    st.p = Math.min(st.p, np);
    var s0 = (st.p - 1) * PS;
    sp.forEach(function (x) { x.hidden = true; });
    mt.slice(s0, s0 + PS).forEach(function (x) { x.hidden = false; });
    pg.innerHTML = np > 1 ? pages(np, st.p) : '';
    $$('button', ct).forEach(function (b) { var o = b.dataset.g == st.g; b.classList.toggle('on', o); b.setAttribute('aria-pressed', o); });
    note.textContent = (v ? '' : 'No one matches. ') + (st.g ? '' : '9 people whose nationality was not stated appear only under “All”.');
    $$('button[data-c]', cl).forEach(function (b) { var o = MOB.matches ? !!$('.nr', b.parentNode) : b.dataset.c == st.c; b.classList.toggle('on', o); b.setAttribute('aria-pressed', o); });
  }
  // phones: a tapped country opens its own panel of names under its row (several can be open). Nothing above the row
  // changes, so the page never has to scroll to make up for it, and the row stays exactly under the finger.
  function fill(box, c, p) {
    var mt = sp.filter(function (x) { return x.dataset.c == c; }), np = Math.max(1, Math.ceil(mt.length / PS)), nl = box.firstChild;
    p = Math.min(p, np);
    nl.innerHTML = '';
    mt.slice((p - 1) * PS, p * PS).forEach(function (x) { var y = x.cloneNode(true); y.hidden = false; nl.appendChild(y); });
    box.lastChild.innerHTML = np > 1 ? pages(np, p) : '';
  }
  function fold(b) {
    var li = b.parentNode, box = $('.nr', li);
    if (box) li.removeChild(box);
    else {
      box = document.createElement('div');
      box.className = 'nr';
      box.innerHTML = '<div class="nl"></div><div class="pg"></div>';
      li.appendChild(box);
      fill(box, b.dataset.c, 1);
    }
    var open = !!box.parentNode;
    b.classList.toggle('on', open);
    b.setAttribute('aria-pressed', open);
  }
  // keep the clicked control where it is when the list above it changes height
  function keep(sel, fn) {
    var b = $(sel), y0 = b && b.getBoundingClientRect().top;
    fn();
    var b2 = $(sel);
    if (b2 && y0 != null) { var d = b2.getBoundingClientRect().top - y0; if (Math.abs(d) > 1) window.scrollBy({ top: d, left: 0, behavior: 'instant' }); }
  }
  function go(d) { if (Math.abs(d) > 1) window.scrollBy({ top: d, left: 0, behavior: RM ? 'instant' : 'smooth' }); }
  ct.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    keep('#ctl button[data-g="' + b.dataset.g + '"]', function () { st.g = b.dataset.g; st.c = ''; st.p = 1; r(); });
  });
  cl.addEventListener('click', function (e) {
    var q = e.target.closest('.nr .pg button');
    if (q) {   // a page of one country's names (phones): show it, and bring its country back if it has scrolled off the top
      if (q.disabled) return;
      var box = q.closest('.nr'), li = box.parentNode;
      fill(box, $('button[data-c]', li).dataset.c, +q.dataset.p);
      var t = li.getBoundingClientRect().top;
      if (t < 0) go(t - 8);
      return;
    }
    var b = e.target.closest('button[data-c]'); if (!b) return;
    if (MOB.matches) { fold(b); return; }
    // wide screens: the country filters the names column; if its top is above the screen (a country low in the
    // list, such as Uganda), scroll up to it
    var c = b.dataset.c;
    keep('#cl button[data-c="' + esc(c) + '"]', function () { st.c = st.c == c ? '' : c; st.g = st.c ? 'f' : st.g; st.p = 1; r(); });
    var n = nr.getBoundingClientRect().top;
    if (n < 0) go(n - 16);
  });
  pg.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) return;
    st.p = +b.dataset.p; r();
    var t = nr.getBoundingClientRect().top;
    if (t < 0) go(t - 16);
  });
  // crossing the phone/wide line: close the phone panels and drop the wide-screen country filter
  function reset() { $$('.nr', cl).forEach(function (x) { x.parentNode.removeChild(x); }); st.c = ''; r(); }
  if (MOB.addEventListener) MOB.addEventListener('change', reset); else if (MOB.addListener) MOB.addListener(reset);
  r();
});

/* ---------- press release ---------- */
guard(function () {
  var d = $('#prm'), o = $('#prOpen'), c = $('#prClose');
  if (!d || !o || !d.showModal) return;
  o.addEventListener('click', function () { d.showModal(); document.body.style.overflow = 'hidden'; });
  c.addEventListener('click', function () { d.close(); });
  d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  d.addEventListener('close', function () { document.body.style.overflow = ''; o.focus(); });
});

/* ---------- back to top: after the hero, never over a chart, a control or the footer ---------- */
guard(function () {
  var b = $('.totop'), hero = $('.hero');
  if (!b || !hero) return;
  var AV = '.scrolly, figure, .stat, #ctl, .pg, .site-footer', on = false, tick = 0;
  function chk() {
    tick = 0;
    var H = innerHeight, show = hero.getBoundingClientRect().bottom < 0;
    if (show) {
      var top = H - 84, avoid = $$(AV);
      for (var i = 0; i < avoid.length; i++) { var r = avoid[i].getBoundingClientRect(); if (r.bottom > top && r.top < H) { show = false; break; } }
    }
    if (show !== on) { on = show; b.classList.toggle('on', on); }
  }
  addEventListener('scroll', function () { if (!tick) tick = requestAnimationFrame(chk); }, { passive: true });
  addEventListener('resize', chk);
  b.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: RM ? 'instant' : 'smooth' });
    var h1 = $('h1'); if (h1 && h1.focus) h1.focus({ preventScroll: true });
  });
  chk();
});

/* ---------- three categories: side-by-side tabs in the "Read more" panel, Hudud first each time it opens ---------- */
guard(function () {
  var box = $('.cats'), list = box && $('.tabs', box);
  if (!list) return;
  var tabs = $$('[role="tab"]', list), panes = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  function pick(i, focus) {
    tabs.forEach(function (t, k) {
      t.setAttribute('aria-selected', k === i ? 'true' : 'false');
      t.tabIndex = k === i ? 0 : -1;
      panes[k].classList.toggle('off', k !== i);
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(i); });
    t.addEventListener('keydown', function (e) {
      var n = tabs.length, k = e.key,
        j = k === 'ArrowRight' ? (i + 1) % n : k === 'ArrowLeft' ? (i + n - 1) % n : k === 'Home' ? 0 : k === 'End' ? n - 1 : -1;
      if (j < 0) return;
      e.preventDefault();
      pick(j, true);
    });
  });
  box.addEventListener('toggle', function () { if (box.open) pick(0); });
  $('.cats__in', box).classList.add('tabbed');
  pick(0);
});

/* ---------- hero paint runs where CSS can't tie animation to scroll (Safari before 26, Firefox) ----------
   The same motion as the scroll-driven CSS: each run starts at var(--from) of its length and reaches full length when
   the foot of the hero is 55% of the way up the screen (animation-range: contain 0% exit 45%). */
guard(function () {
  var hero = $('.hero'), runs = $$('.run i');
  if (!hero || !runs.length || RM || (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()'))) return;
  var from = runs.map(function (r) { var f = parseFloat(getComputedStyle(r.parentNode).getPropertyValue('--from')); return isNaN(f) ? 1 : f; });
  var tick = 0, last = -1;
  function set() {
    tick = 0;
    var r = hero.getBoundingClientRect(), H = r.height, V = innerHeight, y = -r.top;
    var s = Math.min(0, H - V), e0 = Math.max(0, H - V), e = e0 + .45 * (H - e0);
    var p = Math.max(0, Math.min(1, (y - s) / (e - s || 1)));
    if (Math.abs(p - last) < .001) return;
    last = p;
    runs.forEach(function (x, i) { x.style.transform = 'translateY(' + ((from[i] - 1) * (1 - p) * 100).toFixed(2) + '%)'; });
  }
  addEventListener('scroll', function () { if (!tick) tick = requestAnimationFrame(set); }, { passive: true });
  addEventListener('resize', set);
  set();
});

/* ---------- canvas splatters: pinned in px where they first land ----------
   They sit at a share of the page height, so a category or a page of names opening would slide them all down the
   screen. Pin them once the page has settled; place them again only when the screen really changes size. */
guard(function () {
  var spl = $$('.page__canvas .spl'), w = 0, h = 0;
  if (!spl.length || !window.getComputedStyle) return;
  function pin(force) {
    if (!force && innerWidth === w && Math.abs(innerHeight - h) < 150) return;
    w = innerWidth; h = innerHeight;
    spl.forEach(function (s) { s.style.top = ''; });
    var t = spl.map(function (s) { return getComputedStyle(s).top; });
    spl.forEach(function (s, i) { s.style.top = t[i]; });
  }
  pin(true);
  addEventListener('load', function () { pin(true); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { pin(true); });
  addEventListener('resize', function () { pin(false); });
});
})();
