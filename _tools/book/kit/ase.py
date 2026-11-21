"""A client's palette as an Adobe Swatch Exchange file, which Affinity and Adobe import.

    python3 -I kit/ase.py <code> [outdir]

Two groups: the screen values in RGB, and the print values in CMYK (FOGRA39,
or the client's own where client.json says so). Same names in both, so a
designer picks by name.
"""
import struct, sys, os, json

HERE = os.path.dirname(os.path.abspath(__file__))
if len(sys.argv) < 2: sys.exit('usage: ase.py <code> [outdir]')
CDIR = os.path.join(HERE, '..', 'clients', sys.argv[1])
C = json.load(open(os.path.join(CDIR, 'client.json'), encoding='utf-8'))
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(CDIR, 'out')
os.makedirs(OUT, exist_ok=True)

def name(s):
    s = s + '\0'
    return struct.pack('>H', len(s)) + s.encode('utf-16-be')

def block(kind, body):
    return struct.pack('>HI', kind, len(body)) + body

def colour(n, model, values):
    return block(0x0001, name(n) + model + struct.pack('>%df' % len(values), *values) + struct.pack('>H', 2))  # 2 = normal

blocks = [block(0xC001, name(C['name'] + ' · RGB'))]
for p in C['palette']:
    h = p['hex']
    blocks.append(colour(p['name'], b'RGB ', [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]))
blocks.append(block(0xC002, b''))
blocks.append(block(0xC001, name(C['name'] + ' · CMYK FOGRA39')))
for p in C['palette']:
    blocks.append(colour(p['name'], b'CMYK', [x / 100 for x in p['cmyk']]))
blocks.append(block(0xC002, b''))

data = b'ASEF' + struct.pack('>HHI', 1, 0, len(blocks)) + b''.join(blocks)
path = os.path.join(OUT, C['slug'] + '_colour_palette.ase')
open(path, 'wb').write(data)
print('wrote', path, len(data), 'bytes')
