"""Make the public brand book from the working book.

Every <!--M-->…<!--/M--> block is removed (not hidden), every
<!--P:…:P--> block is uncommented, the body switches to the public
edition, and section and index numbers are renumbered in order so the
public book never skips a number.
"""
import re, sys
src, out = sys.argv[1], sys.argv[2]
s = open(src, encoding="utf-8").read()
s = re.sub(r"<!--M-->.*?<!--/M-->", "", s, flags=re.S)
s = re.sub(r"<!--P:(.*?):P-->", r"\1", s, flags=re.S)
s = s.replace('<body class="master">', '<body class="public">', 1)
for cls in ("nn", "sn"):
    n = iter(range(100))
    s = re.sub(r'(class="%s">)\d\d(<)' % cls, lambda m: "%s%02d%s" % (m.group(1), next(n), m.group(2)), s)
# the cover carries no section number, so section numbers start at 01
s = re.sub(r'(class="sn">)(\d\d)(<)', lambda m: "%s%02d%s" % (m.group(1), int(m.group(2)) + 1, m.group(3)), s)
assert "<!--M" not in s and "<!--P" not in s and "chip" not in s.split("</style>")[1]
open(out, "w", encoding="utf-8").write(s)
print("public:", len(s), "bytes")
