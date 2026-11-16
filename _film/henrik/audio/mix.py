# The Same Water: score and sound, all offline and free. Instruments: VSCO 2 CE and VCSL (both CC0).
import sys, os; LIB = os.path.expanduser('~/lemo-opuscar-review'); sys.path.insert(0, LIB)
import numpy as np, soundfile as sf
from core.audio import sampler as S
from core.audio.sfx import SR, add, limit, noise, bp, lp, hp, click, clack, whoosh, thump, ding, rumble
OFF = float(os.environ.get('OFF', '5.0')); END = 30.5 + OFF; CUTS = [0, 2.98, 4.95, 6.96, 10.72, 12.77, 14.69, 17.41, 20.67, 21.97, 24.33, 25.98]
ev = []
# the bed: low cellos on D, then the relative major at the turn, and D major at the close
ev += [(0.0, 'cellos', 'D2', 20.9, .32, -.2), (0.0, 'cellos', 'A2', 20.9, .26, .2)]
ev += [(20.67, 'cellos', 'F2', 5.5, .34, -.2), (20.67, 'cellos', 'C3', 5.5, .28, .2), (20.67, 'violins', 'A4', 5.5, .22, .3)]
ev += [(25.98, 'cellos', 'D2', 4.5, .34, -.2), (25.98, 'cellos', 'A2', 4.5, .3, .2), (25.98, 'violins', 'F#4', 4.5, .22, -.3), (25.98, 'violins', 'A4', 4.5, .22, .3)]
# the harp marks every cut, one note per phrase
harp = ['D4', 'A3', 'F4', 'E4', 'D4', 'C4', 'A3', 'F3', 'F4', 'A4', 'C5', 'D4']
for t, p in zip(CUTS, harp): ev.append((t + .02, 'harp', p, 2.5, .5, 0))
ev += [(26.2, 'harp', 'F#4', 2.5, .45, .2), (26.45, 'harp', 'A4', 2.5, .45, -.2), (26.7, 'harp', 'D5', 3, .5, 0)]
ev = [(e[0] + OFF,) + tuple(e[1:]) for e in ev]
# the opening over the model: the cello bed already sounding, two harp notes as the camera settles
ev += [(0.0, 'cellos', 'D2', OFF + .3, .28, -.2), (0.0, 'cellos', 'A2', OFF + .3, .22, .2), (.5, 'harp', 'D3', 3, .42, -.2), (2.6, 'harp', 'A3', 3, .42, .2), (4.3, 'harp', 'D4', 3, .45, 0)]
music = S.render(ev, dur=END, master=False)
music *= .5
L = int(END * SR); fx = np.zeros((L, 2), np.float32)
def A(buf, x, at, gain=1.0, pan=0.0): add(buf, x, at + OFF, gain, pan)
def env(d, a=.15, r=.3): n = int(round(d * SR)); e = np.ones(n); ai, ri = int(a * SR), int(r * SR); e[:ai] = np.linspace(0, 1, ai); e[-ri:] = np.linspace(1, 0, ri); return e
# the opening: the harbour heard from above, water and a little wind
add(fx, (bp(noise(OFF), 150, 700) * env(OFF, 1.0, .3)).astype(np.float32), 0.0, .07); add(fx, (bp(noise(OFF), 400, 1400) * env(OFF, 1.5, .5)).astype(np.float32), 0.0, .03, -.3)
# shot 1: water lapping at the jetty
w = bp(noise(2.98), 180, 900) * (0.6 + 0.4 * np.sin(np.linspace(0, 9, int(2.98 * SR)))) * env(2.98, .3, .4); A(fx, w.astype(np.float32), 0.0, .06)
# rain in the yard, shots 2, 3 and 10; through the office window, softer, shot 4
for a, b, g in [(2.98, 6.96, .05), (6.96, 10.72, .022), (21.97, 24.33, .05)]: r = hp(noise(b - a), 2500) * env(b - a, .1, .2); A(fx, r.astype(np.float32), a, g, .1)
# welding crackle
rng = np.random.default_rng(3)
for t in np.sort(rng.uniform(3.2, 4.8, 40)): A(fx, click(rng.uniform(1.4, 2.4), rng.uniform(.3, .7)), t, .25, .3)
# the zip, rising
z = np.concatenate([bp(noise(.11), f, f * 1.6) for f in np.linspace(900, 3200, 10)]) * env(1.1, .05, .1)[:int(.11 * SR) * 10]; A(fx, z.astype(np.float32), 4.95 + .5, .18)
# paper: the tender opened, then pushed off the pile
A(fx, whoosh(.3, .5), 6.96 + .8, .35); A(fx, whoosh(.5, .7), 10.72 + 2.4, .45)
# four seconds, four scratches, and the strike-through
for k in range(4): A(fx, clack(1.6, .6), 10.72 + .45 + k * .42, .35)
A(fx, whoosh(.18, .4), 10.72 + 2.05, .3)
# the hallmark struck, then the metal shines
A(fx, thump(.9, 60), 12.77 + 1.0, .6); A(fx, clack(.8, .9), 12.77 + 1.0, .5); A(fx, ding(.5), 14.69 + .6, .25)
# under the water, the line drawn
A(fx, rumble(1.3, .5), 20.67, .25)
voice, vsr = sf.read('voice48.wav', dtype='float32'); assert vsr == SR
mixd = music[:L] + fx; vo = np.zeros(L, np.float32); i0 = int((.6 + OFF) * SR); vo[i0:i0 + len(voice)] = voice[:L - i0]
mixd[:, 0] += vo; mixd[:, 1] += vo
fade = int(1.0 * SR); mixd[-fade:] *= np.linspace(1, 0, fade)[:, None]
sf.write('mix.wav', limit(mixd, .9), SR); sf.write('music-only.wav', limit(music[:L] + fx, .9), SR)
print('ok', S.credits(['cellos', 'violins', 'harp']))
