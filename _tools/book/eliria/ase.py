"""Eliria's palette as an Adobe Swatch Exchange file, which Affinity and Adobe import.

    python3 -I ase.py <outdir>

Two groups: the screen values in RGB, and the print values in CMYK (FOGRA39,
Camel the client's own). Same names in both, so a designer picks by name.
"""
import struct, sys, os

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
os.makedirs(OUT, exist_ok=True)

RGB = [('Ardósia', '#252F37'), ('Areia', '#D8CCBD'), ('Camel', '#8E7657'), ('Folha madura', '#273121')]
CMYK = [('Ardósia', (66, 36, 20, 90)), ('Areia', (19, 19, 27, 0)), ('Camel', (41, 47, 59, 15)), ('Folha madura', (58, 28, 82, 91))]

def name(s):
    s = s + '\0'
    return struct.pack('>H', len(s)) + s.encode('utf-16-be')

def block(kind, body):
    return struct.pack('>HI', kind, len(body)) + body

def colour(n, model, values):
    return block(0x0001, name(n) + model + struct.pack('>%df' % len(values), *values) + struct.pack('>H', 2))  # 2 = normal

blocks = []
blocks.append(block(0xC001, name('Eliria · RGB')))
for n, h in RGB:
    blocks.append(colour(n, b'RGB ', [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]))
blocks.append(block(0xC002, b''))
blocks.append(block(0xC001, name('Eliria · CMYK FOGRA39')))
for n, v in CMYK:
    blocks.append(colour(n, b'CMYK', [x / 100 for x in v]))
blocks.append(block(0xC002, b''))

data = b'ASEF' + struct.pack('>HHI', 1, 0, len(blocks)) + b''.join(blocks)
path = os.path.join(OUT, 'eliria_colour_palette.ase')
open(path, 'wb').write(data)
print('wrote', path, len(data), 'bytes')
