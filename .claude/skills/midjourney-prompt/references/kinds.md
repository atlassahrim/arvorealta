# The six kinds

Each module changes sentences 4 to 8 of the expansion and moves the parameter
defaults. Where a module and the general rules in `SKILL.md` disagree, the
module wins. Each one ends with a worked example: the brief, version A
(counted by `scripts/check.py`), and the B and C lines.

- [Background](#background)
- [Mood](#mood)
- [Person](#person)
- [Architecture](#architecture)
- [Interface](#interface)
- [Painting](#painting)

---

## Background

**What it is for.** A stage for type, not a subject.

- **Name the zone where text will sit** and make it the calmest part of the
  frame: no highlights, low detail, low contrast. A headline over a bright
  highlight fails however good the picture is.
- **One soft focal point, or none.**
- **Two colours and one accent.**
- **`--s` 50–150, plus `--raw`**, so Midjourney does not add drama where the
  type needs quiet.
- **For a website, make a 16:9 and a 9:16 from the same prompt**, so the
  phone gets its own composition rather than a squeezed crop.

**Brief (320 characters)**
```
KIND: background
SUBJECT: slow ripples on dark water
USE: hero behind white headline, left half
FEEL: deep, calm
PLACE: lake at dusk, no shore visible
LIGHT: last copper glow from far right
LOOK: long exposure photo, teal and near-black
FRAME: 16:9, top-down tilt, quiet left half
REF:
NOT: boats, horizon
STAGE: direct
```

**Version A (118 words)**
```
Slow, wide ripples moving across a dark lake at dusk, the water close to black and almost still. No shore and no horizon, only water filling the frame. Seen from above at a slight tilt with a 50mm lens, the ripples running diagonally in from the lower right, while the left half of the frame is the smoothest, darkest part of the surface, free of highlights. A last copper glow from beyond the right edge lays a thin band of warm light across the far ripples. Long-exposure photograph, the water softened to satin, very fine grain. Deep teal and near-black with one thin thread of copper, almost all dark. Deep and calm: one slow swell, nothing else moving. --ar 16:9 --s 100 --c 10 --exp 5 --raw
```

- **B (pushed light):** the copper band widens and catches the crest of
  every ripple on the right. `--c 20`.
- **C (lateral medium):** sentence 8 becomes "a cyanotype print, deep
  Prussian blue on white cotton paper". `--c 40 --s 300`, without `--raw`.
- **NOT:** "boats" and "horizon" are absorbed by "only water filling the
  frame".

---

## Mood

**What it is for.** Finding a direction, not producing a final image. So the
brief is loose and the parameters are wide.

- **Objects, materials and light in detail; composition loose.**
- **Run it in Draft mode**, with `--c` 40–60, `--s` 300–500 and `--exp`
  10–15.
- **`--sref random` when stuck.** When a code works, write it down and reuse
  it.
- **Keep the winners in a Moodboard.** It becomes a house look that the
  other kinds can then use.

**Brief (300 characters)**
```
KIND: mood
SUBJECT: a workshop after hours
USE: moodboard for a furniture brand
FEEL: warm, honest, unhurried
PLACE: timber workshop, sawdust, winter
LIGHT: one bare bulb, blue dusk in windows
LOOK: 35mm film, oak, wool, rust, cream
FRAME: 3:2, loose, found not staged
REF:
NOT: faces
STAGE: explore
```

**Version A (116 words)**
```
A timber workshop after hours in winter, sawdust on the floor and on a half-finished oak chair clamped to the bench. Hand tools hang on a pegboard wall, a wool blanket lies over a stool, a rusted stove stands in the corner, and the room is empty of people. One bare bulb hangs over the bench and pools warm light on the wood, while the windows behind hold a deep blue dusk. Loose, wide framing at 35mm, as if found rather than staged. Warm oak, rust, cream and dusk blue, mostly warm wood. 35mm colour film, visible grain, slight halation around the bulb. Warm, honest and unhurried: a mug of tea going cold on the bench. --ar 3:2 --c 50 --s 400 --exp 15
```

- **B:** the bulb is the only light, and the dusk has gone to black.
  `--c 60`.
- **C:** sentence 8 becomes "a gouache painting on toned paper, flat shapes,
  visible brushwork". `--c 80`.
- **NOT:** "faces" is absorbed by "the room is empty of people".

---

## Person

- **Always a fictional person.** Never use a real person's name. A likeness
  belongs to the person, and a generated photograph of a real face is a
  fabrication that cannot be recalled once it is out.
- **Describe in this order:** age and role, pose, expression, wardrobe,
  hands, skin.
- **Hands and skin need their own words.** Write "bare hands resting on…" and
  "natural skin texture with visible pores", or the result has waxy skin and
  hands that float.
- **Lens:** 85mm at f/2 for a portrait, 35mm for a person in a place.
- **`--raw`, with `--s` 100–150.**
- **To keep the same face across a series**, put two to four photographs in
  the Edit slot (front, three-quarter, profile), then describe only the new
  scene. A front view alone does not tell the model the jaw and ears from
  the side.

**Brief (337 characters)**
```
KIND: person
SUBJECT: woman, 40s, architect, calm stare
USE: about page portrait, crop to square
FEEL: sure, warm, unposed
PLACE: her studio, card models on shelves
LIGHT: north window, soft, from left
LOOK: medium format, charcoal, linen, oak
FRAME: 4:5, waist up, eye level
REF: same face: 2 photos
NOT: smile, jewellery
STAGE: direct
```

**Version A (127 words)**
```
A woman in her forties, an architect, sitting at her studio worktable and looking straight into the lens with a calm, steady expression, her mouth relaxed and closed. Shelves of white card models stand behind her, out of focus. Soft north light from a tall window on the left falls away into shadow on the right side of her face. Waist-up, 85mm at f/2, eye level, the subject a little left of centre so a square crop still holds her. Charcoal wool sweater with the sleeves pushed up, bare hands and bare ears, hands resting on a sheet of tracing paper, natural skin texture with visible pores. Charcoal, linen white and pale oak. Medium-format photograph, natural and unretouched. Sure of herself and unposed, caught between two thoughts.
ATTACH: both face photos in the Edit slot
--ar 4:5 --s 120 --c 5 --raw
```

- **B:** a hard side light from the window, half the face in deep shadow.
  `--c 15`.
- **C:** sentence 8 becomes "black-and-white documentary film, Tri-X grain,
  pushed one stop". `--c 35`.
- **NOT:** "smile" became "mouth relaxed and closed"; "jewellery" became
  "bare hands and bare ears".

---

## Architecture

- **Perspective is the craft.** Write "24mm tilt-shift, verticals perfectly
  straight" for an exterior and "one-point perspective from the doorway" for
  an interior. Keep the camera at eye level unless the brief says otherwise.
- **Name every material with its finish:** "board-marked concrete", "oiled
  oak", "honed limestone".
- **Weather and time of day carry the mood.** Overcast reads as calm, low
  sun as warm, blue hour as precious.
- **Style by period or movement** ("Nordic modernism", "brutalist"), never
  by a living architect's name.
- **A human figure only for scale**: small and unfocused.
- **`--raw`, `--s` 100–200, `--c` 0–10 in direct.**
- **Midjourney invents buildings.** Never present one as a real project.

**Brief (343 characters)**
```
KIND: architecture
SUBJECT: small concrete chapel in a pine wood
USE: project page hero
FEEL: silent, heavy, sheltering
PLACE: Nordic forest, late autumn, wet
LIGHT: overcast, one warm window glowing
LOOK: architectural photo, board-marked concrete
FRAME: 3:2, 3/4 view, eye level, verticals straight
REF:
NOT: people, cars, sun
STAGE: direct
```

**Version A (116 words)**
```
A small concrete chapel standing alone in a pine wood in late autumn, its walls dark and wet from rain. One narrow window glows with warm light from inside. Pine trunks rise close around it, the ground thick with brown needles and damp moss. Three-quarter view from eye level, 24mm tilt-shift lens, verticals perfectly straight, the chapel slightly right of centre with forest on both sides. A flat overcast sky gives soft, shadowless light, so the window is the only warm point in the frame. Board-marked concrete with visible timber grain, streaked by rain. Grey concrete, black-green pine and one point of amber. Architectural photograph, natural and unretouched. Silent and heavy, a place to shelter in. --ar 3:2 --s 150 --c 5 --raw
```

- **B:** blue hour, every window glowing. `--c 15`.
- **C:** sentence 8 becomes "a graphite and ink architectural drawing on
  tracing paper, light wash". `--c 35 --s 300`, without `--raw`.
- **NOT:** "standing alone" covers people and cars; "overcast" covers sun.

---

## Interface

**What it is for.** Art direction for an interface, not the interface:
mood, palette, type character and density. There is no path from the image
to a design file; the screen is rebuilt in Figma or in code. Say so.

- **Design words, not art words:** "mobile interface", "8-point grid",
  "cards", "hierarchy", "generous margins".
- **Choose the view.** A real device in a real setting reads as finished. A
  flat screen alone is easier to rebuild from.
- **Text is the trap.** At most one or two real labels, in quotation marks,
  four words each. Describe the rest as "soft grey lines rather than words",
  or the screen fills with invented lettering.
- **`--s` 100–200, `--c` 20–40** for exploring layouts. `--raw` for the flat
  screen.
- **Ratios are whole numbers:** `--ar 9:16` for a phone, `--ar 16:10` for a
  desktop.
- **Lock the palette** with a brand image in the Style reference slot.

**Brief (374 characters)**
```
KIND: interface
SUBJECT: booking app for a mountain lodge
USE: art direction for the app screens
FEEL: calm, premium, outdoorsy
PLACE: phone in hand over a wool blanket
LIGHT: soft daylight, cool shadows
LOOK: large serif titles, forest green, cream cards
FRAME: 9:16, screen straight on, one screen
REF: style: our brand ground photo
NOT: lorem ipsum, logos
STAGE: explore
```

**Version A (118 words)**
```
A smartphone held in one hand above a grey wool blanket, its screen showing a booking app for a mountain lodge. The screen faces the camera straight on and fills most of the frame: a full-width photograph of a snowy pine valley at the top, a large serif title, three cream cards with rounded corners listing room types, and one forest-green button reading "Book a room". Clean mobile interface on an 8-point grid, generous margins, a clear hierarchy, small labels drawn as soft grey lines rather than words. Soft daylight, cool shadows on the blanket. Forest green, cream and slate grey. Product photograph of a real device, sharp screen, the blanket in shallow focus. Calm, premium and outdoorsy.
ATTACH: the brand ground photo in the Style reference slot
--ar 9:16 --s 150 --c 35 --exp 10 --sw 150
```

- **B:** a dark screen, cream type on forest green. `--c 45`.
- **C:** the flat screen alone, no hand and no blanket, "flat vector
  interface, orthographic". `--c 65 --raw`.
- **NOT:** "lorem ipsum" became "soft grey lines rather than words"; nothing
  asks for a logo.

---

## Painting

- **No camera words at all.** "85mm", "f/2", "film grain", "long exposure"
  and "photograph" pull the result back toward a photo. Describe
  composition the way a painter would: where the figure stands, what is in
  front, what the edge cuts.
- **One painter per prompt.** Two names average into neither. A blend
  belongs in version C, as a sentence ("Cézanne's structure with Renoir's
  palette").
- **The name is not enough.** A name alone gives a sweetened pastiche.
  Sentence 8 names the painter and then the technique, which is what carries
  the look. The table below has the vocabulary for two painters; for
  another, write the same six rows before writing the prompt.
- **Only painters long dead.** Their work is in the public domain. A living
  painter is described by process and period, never by name.
- **`--raw --s 150` to start**, so the style comes from the words rather than
  from Midjourney's own gloss. B drops `--raw` and goes to `--s 300`. Use
  canvas ratios, 4:5 and 3:4.
- **References.** A photograph never goes in the Style reference slot: it
  carries its film look onto the painting. For composition, use the Image
  prompt slot at `--iw 0.5`. For a series, once one painting is right, put
  that painting in the Style reference slot for all the others; that is what
  makes several images read as one series.
- **Choosing the painter from references.** Match the references' temper,
  not their subject. Warmth, touch, dappled light and figures in contact
  suit Renoir. Stillness, weight, landscape built in planes and still-life
  objects suit Cézanne.

| | Renoir | Cézanne |
|---|---|---|
| Brushwork | feathery broken strokes, soft edges | short parallel "constructive" strokes, planes of colour |
| Space | air and haze, depth melting into light | flattened, built in overlapping planes |
| Light | dappled sun, glowing skin, blue shadows | colour models form, little cast shadow |
| Palette | peach, rose, pearl, sage, cobalt shadows | ochre, viridian, Prussian blue, earth red |
| Figures | soft, warm, touching or moving | solid, still, monumental |
| Surface | thin, luminous paint | bare canvas left at the edges |

**Renoir brief (379 characters)**
```
KIND: painting
SUBJECT: mother carrying her small child, seen from behind
USE: series on everyday tenderness
FEEL: tender, warm, unhurried
PLACE: hillside meadow of wild carrot, late summer
LIGHT: low sun behind them, rim light in their hair
LOOK: Renoir oil, feathery strokes, peach, rose, sage
FRAME: 4:5, figures left of centre, flowers in front
REF:
NOT: faces
STAGE: direct
```

**Version A (130 words)**
```
A young mother carrying her small child on her hip, both seen from behind as she walks into a hillside meadow, the child's arm around her neck. Late summer, tall stems of wild carrot and dry seed heads all around them, a valley of soft blue hills beyond. The figures stand left of centre, half veiled by flower heads painted loosely in the foreground. The low sun behind them sets a warm rim of light in their hair and along her shoulder, the air hazy and golden. Linen dress, bare arms, glowing skin. Peach, rose and sage green, with blue shadows. Oil on canvas in the manner of Pierre-Auguste Renoir, feathery broken brushstrokes, soft edges, dappled light, thin luminous paint. Tender and unhurried, her cheek resting against the child's head. --ar 4:5 --s 150 --c 10 --raw
```

**Cézanne brief (369 characters)**
```
KIND: painting
SUBJECT: woman with a fruit basket looking over a valley
USE: series on everyday tenderness
FEEL: still, grave, rooted
PLACE: Provence hills, cypresses, a farmhouse
LIGHT: high cloud, warm late light from the left
LOOK: Cezanne oil, parallel strokes, ochre, viridian, blue
FRAME: 3:4, figure on right third, hills in planes
REF:
NOT: faces
STAGE: direct
```

**Version A (129 words)**
```
A woman in a plain linen dress on a rise, holding a basket of fruit, seen from behind looking out over a valley. Below her the hills of Provence fold away in broad ochre fields, dark cypresses upright on the slopes and a farmhouse among the trees. She stands on the right third, solid and still, the land built behind her in flat overlapping planes up to a distant blue ridge. High cloud fills the upper sky, the late light warm from the left. The apples in the basket are round, heavy forms. Ochre, viridian and cool Prussian blue. Oil on canvas in the manner of Paul Cézanne, short parallel constructive brushstrokes, colour modelling form instead of shadow, flattened space, bare canvas at the edges. Still, grave and rooted. --ar 3:4 --s 150 --c 10 --raw
```

- **B (Renoir):** drop `--raw`, `--s 300`, the sun lower and flaring through
  the seed heads.
- **C (Cézanne):** "Cézanne's planes with Renoir's warm palette and soft
  edges". `--c 40`.
- **NOT:** "faces" is absorbed by "seen from behind".
