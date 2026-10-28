"""Draw the blood-splatter symbols used in the background: python tools/splatter.py > splatters.svg

Each splatter is one <path> in a -60..60 box: an irregular pool, thin tapered spikes (some ending in a droplet),
satellite drops stretched along the line they flew (tails outward), and a fine mist. Seeded, so the output is stable;
change a seed to redraw that variant. Every subpath winds the same way, so overlaps fill solid under nonzero.
"""
import math, random

LIM = 58  # keep everything inside the viewBox


def f(v):
    s = f'{v:.1f}'.rstrip('0').rstrip('.')
    return s.replace('-0.', '-.') if s.startswith('-0.') else (s[1:] if s.startswith('0.') else s) or '0'


def pt(x, y):
    return f'{f(x)} {f(y)}'


def polar(r, a):
    return r * math.cos(a), r * math.sin(a)


def circle(x, y, r):
    return f'M{pt(x - r, y)}A{f(r)} {f(r)} 0 1 1 {pt(x + r, y)}A{f(r)} {f(r)} 0 1 1 {pt(x - r, y)}Z'


def ellipse(x, y, a, b, ang):
    ux, uy = math.cos(ang), math.sin(ang)
    d = f(math.degrees(ang))
    return (f'M{pt(x - a * ux, y - a * uy)}A{f(a)} {f(b)} {d} 1 1 {pt(x + a * ux, y + a * uy)}'
            f'A{f(a)} {f(b)} {d} 1 1 {pt(x - a * ux, y - a * uy)}Z')


def spike(cx, cy, ang, r0, r1, half):
    """A thorn from radius r0 to r1 along ang, measured from (cx, cy); sides curve in."""
    ax, ay = polar(r0, ang - half)
    bx, by = polar(r0, ang + half)
    tx, ty = polar(r1, ang)
    m = r0 + (r1 - r0) * .38
    c1x, c1y = polar(m, ang - half * .22)
    c2x, c2y = polar(m, ang + half * .22)
    return (f'M{pt(cx + ax, cy + ay)}Q{pt(cx + c1x, cy + c1y)} {pt(cx + tx, cy + ty)}'
            f'Q{pt(cx + c2x, cy + c2y)} {pt(cx + bx, cy + by)}Z')


def splatter(seed, R=17, spikes=18, drops=30, mist=40, bias=None):
    rnd = random.Random(seed)
    harm = [(k, R * rnd.uniform(.04, .13) / (k ** .3), rnd.uniform(0, 6.3)) for k in range(2, 10)]
    stretch, tilt = rnd.uniform(.85, 1.12), rnd.uniform(0, 3.1)

    def body(a):
        r = R + sum(h * math.sin(k * a + p) for k, h, p in harm)
        return r * (1 + (stretch - 1) * math.cos(2 * (a - tilt)))

    def lean(a):  # 1 everywhere, or more towards `bias` for a splatter thrown one way
        return 1 if bias is None else .55 + 1.1 * max(0, math.cos(a - bias)) ** 1.5

    out = []
    # pool: smooth closed curve through the wobbly outline (Catmull-Rom as cubics)
    n = 40
    ps = [polar(body(2 * math.pi * i / n), 2 * math.pi * i / n) for i in range(n)]
    d = f'M{pt(*ps[0])}'
    for i in range(n):
        p0, p1, p2, p3 = ps[i - 1], ps[i], ps[(i + 1) % n], ps[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f'C{pt(*c1)} {pt(*c2)} {pt(*p2)}'
    out.append(d + 'Z')
    # lobes: where the pool ran a little further before it stopped
    for _ in range(rnd.randint(3, 5)):
        a = rnd.uniform(0, 2 * math.pi)
        rr = R * rnd.uniform(.2, .32)
        out.append(circle(*polar(body(a) * .88, a), rr))

    # spikes: a crown of thin thorns, a few long ones ending in a droplet
    for i in range(spikes):
        a = 2 * math.pi * (i + rnd.uniform(-.35, .35)) / spikes
        r0 = body(a) * .82
        L = min(LIM - 6 - r0, R * rnd.lognormvariate(-.55, .55) * lean(a))
        half = rnd.uniform(.05, .12) * (1.25 if L < R * .4 else 1)
        out.append(spike(0, 0, a, r0, r0 + L + R * .18, half))
        if L > R * .5 and rnd.random() < .6:
            gap, rr = rnd.uniform(0, 3.5), rnd.uniform(.9, 2.2)
            out.append(circle(*polar(min(LIM - rr, r0 + L + R * .18 + gap + rr), a), rr))

    # satellite drops: bigger and rounder near the pool, smaller and more stretched further out
    for _ in range(drops):
        a = rnd.uniform(0, 2 * math.pi)
        if bias is not None and rnd.random() < .45:
            a = bias + rnd.gauss(0, .5)
        t = rnd.random()
        dist = body(a) * 1.15 + (LIM - body(a) * 1.15) * t ** 1.35 * min(1, lean(a))
        size = max(.6, 3.6 * (1 - t) ** 1.6 * rnd.uniform(.5, 1.2))
        x, y = polar(dist, a)
        if size > 1.1 and rnd.random() < .55:  # flew out at a slant: an ellipse with a tail pointing away
            el = rnd.uniform(1.35, 2.1)
            a2 = a + rnd.gauss(0, .08)
            out.append(ellipse(x, y, size * el, size, a2))
            if rnd.random() < .6:
                out.append(spike(x, y, a2, size * el * .6, size * el * rnd.uniform(1.7, 2.6), .55))
        else:
            out.append(circle(x, y, size))

    # mist
    for _ in range(mist):
        a = rnd.uniform(0, 2 * math.pi)
        dist = body(a) * 1.3 + (LIM - body(a) * 1.3) * rnd.random() ** .8
        out.append(circle(*polar(dist, a), rnd.uniform(.35, .85)))
    return ''.join(out)


VARIANTS = {
    'spl': dict(seed=17, R=17, spikes=20, drops=28, mist=30),
    'spl2': dict(seed=41, R=15, spikes=16, drops=30, mist=34, bias=-.4),
    'spl3': dict(seed=73, R=19, spikes=22, drops=24, mist=26),
}

if __name__ == '__main__':
    for name, kw in VARIANTS.items():
        print(f'<symbol id="{name}" viewBox="-60 -60 120 120"><path d="{splatter(**kw)}"/></symbol>')
