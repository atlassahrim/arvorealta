"""Make docx-js output with embedded fonts open cleanly in Word.

    python3 -I _tools/annex/docx_fix.py annex/_word/*.docx

Two traps, both recorded in CLAUDE.md from the Word templates of 18 November:
- Word's schema wants the fontKey GUID in upper-case hex; docx-js writes lower.
- <w:embedTrueTypeFonts/> is added when docx-js leaves it out (9.7 does), so
  Word keeps the faces on save, and it has to come after <w:displayBackgroundShape/> in
  settings.xml (schema order), or the file fails validation.
The ZIP's folder entries are dropped as well: Word has refused files that
carry them when opened through a co-editing service.
"""
import re, sys, zipfile, shutil, os, tempfile

ORDER = ["w:writeProtection", "w:view", "w:zoom", "w:removePersonalInformation", "w:removeDateAndTime",
         "w:doNotDisplayPageBoundaries", "w:displayBackgroundShape", "w:printPostScriptOverText",
         "w:printFractionalCharacterWidth", "w:printFormsData", "w:embedTrueTypeFonts", "w:embedSystemFonts",
         "w:saveSubsetFonts"]


def fix_settings(xml):
    m = re.search(r"<w:embedTrueTypeFonts[^>]*/>", xml)
    tag = m.group(0) if m else "<w:embedTrueTypeFonts/>"
    if m:
        xml = xml.replace(tag, "", 1)
    # insert after the last present element that must precede it, else first child
    after = None
    for name in ORDER[:ORDER.index("w:embedTrueTypeFonts")]:
        for mm in re.finditer(r"<%s\b[^>]*?(/>|>.*?</%s>)" % (name, name), xml, re.S):
            after = mm
    if after:
        i = after.end()
    else:
        i = xml.index(">", xml.index("<w:settings")) + 1
    return xml[:i] + tag + xml[i:]


for path in sys.argv[1:]:
    tmp = tempfile.mktemp(suffix=".docx")
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename.endswith("/"):
                continue
            data = zin.read(item.filename)
            if item.filename == "word/fontTable.xml":
                data = re.sub(rb'w:fontKey="\{[0-9a-fA-F-]+\}"', lambda m: m.group(0).upper().replace(b"W:FONTKEY", b"w:fontKey"), data)
            if item.filename == "word/settings.xml":
                data = fix_settings(data.decode("utf-8")).encode("utf-8")
            zout.writestr(item, data)
    shutil.move(tmp, path)
    print("fixed", path)
