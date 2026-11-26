"""Rewrite references to the fourteen renamed skills (X -> arv-X).

Every skill in .claude/skills/ carries the arv- prefix since 26 November
2026, so none can be confused with ECC's. This rewrites what points at them:
the name: in each SKILL.md, .claude/skills/<name> paths, /<name> invocations,
../<name>/ sibling paths and backticked sibling names in the vendored bundle.

Run it after copying a new upstream version of the bundle into the arv-
folders (see .claude/skills/VENDORED.md). It is idempotent: a second run
changes nothing. Folders are renamed by hand with git mv, not here.

Usage: python3 -I _tools/skills/arv_prefix.py <repo-root>
Prints every file it changed with a count per rule.
"""
import re
import sys
from pathlib import Path

ROOT = Path(sys.argv[1])
SK = ROOT / ".claude" / "skills"

NAMES = ["audit", "banner-design", "brand-book", "brand", "design-system",
         "design", "eu-tender-documents", "plan", "profile", "research",
         "slides", "taste-skill", "ui-styling", "ui-ux-pro-max"]
ALT = "|".join(sorted(NAMES, key=len, reverse=True))
END = r"(?![a-z0-9-])"          # whole name: design never matches design-system

TEXT = {".md", ".py", ".js", ".cjs", ".mjs", ".sh", ".json", ".txt"}

# Files where bare backticked names and "(x skill)" mean a sibling skill.
VENDORED_NAME_FILES = [
    "arv-design/SKILL.md",
    "arv-design/references/social-photos-design.md",
    "arv-design/references/slides.md",
    "arv-design/references/slides-create.md",
    "arv-design/references/logo-design.md",
    "arv-slides/references/create.md",
    "arv-brand/references/update.md",
]
# Files where ../x/ is a sibling skill folder.
SIBLING_FILES = [p for p in ("arv-design/references", "arv-slides/references")]

SLASH = ["audit", "plan", "profile", "research", "brand-book", "slides"]
SLASH_ALT = "|".join(sorted(SLASH, key=len, reverse=True))


def rules_for(rel):
    """Return the list of (label, pattern, repl) that apply to a file."""
    r = [("path", re.compile(r"\.claude/skills/(" + ALT + ")" + END), r".claude/skills/arv-\1"),
         ("path", re.compile(r"(?<![\w.])skills/(" + ALT + ")/"), r"skills/arv-\1/"),
         # an invocation: /plan, /brand-book, /slides:create, never /brand/ (a URL)
         ("slash", re.compile(r"(^|[\s`(\"'|])/(" + SLASH_ALT + r")(?=[\s`:.,)]|$)", re.M), r"\1/arv-\2")]
    if any(rel.startswith(p) for p in SIBLING_FILES) or rel == "arv-design/references/design-routing.md":
        r.append(("sibling", re.compile(r"\.\./(" + ALT + r")/"), r"../arv-\1/"))
    if rel in VENDORED_NAME_FILES:
        r.append(("name", re.compile(r"`(" + ALT + r")`"), r"`arv-\1`"))
        r.append(("name", re.compile(r"\((" + ALT + r") skill\)"), r"(arv-\1 skill)"))
    return r


def frontmatter_name(text):
    m = re.match(r"(---\n(?:.*\n)*?)name:\s*([^\n]+)\n", text)
    if not m or m.group(2).strip().startswith("arv-"):
        return text, 0
    start, end = m.span(2)
    return text[:start] + "arv-" + m.group(2).strip() + text[end:], 1


def main():
    targets = [p for p in SK.rglob("*") if p.is_file() and p.suffix in TEXT]
    targets += [ROOT / ".claude/copy/README.md"]
    targets += sorted((ROOT / "_tools/book/clients").glob("*/NOTES.md"))
    for path in targets:
        rel = path.relative_to(SK).as_posix() if SK in path.parents else path.relative_to(ROOT).as_posix()
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        new, counts = text, {}
        if path.name == "SKILL.md" and path.parent.parent == SK:
            new, n = frontmatter_name(new)
            if n:
                counts["frontmatter"] = n
        for label, pat, repl in rules_for(rel):
            new, n = pat.subn(repl, new)
            if n:
                counts[label] = counts.get(label, 0) + n
        if new != text:
            path.write_text(new, encoding="utf-8")
            print(f"{rel}: {counts}")


main()
