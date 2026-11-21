#!/usr/bin/env python3
"""Check a Midjourney brief and its expanded prompt against the skill's rules.

    python3 check.py --brief brief.txt --prompt prompt.txt --kind painting

Either file may be given alone. Exit status is 1 when a rule is broken, so the
counts in a reply are measured rather than estimated.
"""
import argparse
import re
import sys

BRIEF_MAX = 400
WORDS_MIN, WORDS_MAX = 70, 130
QUOTE_MAX_WORDS = 4
NO_MAX_TERMS = 3

FILLER = [
    "8k", "4k", "masterpiece", "ultra detailed", "ultra-detailed", "hyper detailed",
    "highly detailed", "best quality", "trending on artstation", "award winning",
    "award-winning", "stunning", "octane render", "unreal engine", "hdr",
]
CAMERA = [
    r"\b\d+\s?mm\b", r"\bf/\d", r"\blens\b", r"\bphotograph", r"\bphoto\b",
    r"\bfilm grain\b", r"\blong[- ]exposure\b", r"\bbokeh\b", r"\bshot on\b",
    r"\bdepth of field\b", r"\baperture\b", r"\bcamera\b",
]


def read(path):
    if path == "-":
        return sys.stdin.read()
    with open(path, encoding="utf-8") as f:
        return f.read()


def split_prompt(text):
    """Return (description, attach, params) from a full prompt."""
    attach = ""
    m = re.search(r"^ATTACH:.*$", text, flags=re.M)
    if m:
        attach = m.group(0)
        text = text[: m.start()] + text[m.end():]
    m = re.search(r"(^|\s)--[a-z]", text)
    if not m:
        return text.strip(), attach, ""
    return text[: m.start()].strip(), attach, text[m.start():].strip()


def check_brief(text, problems, notes):
    n = len(text.rstrip("\n")) + 1 if text.endswith("\n") else len(text)
    notes.append(f"brief: {n} characters (limit {BRIEF_MAX})")
    if n > BRIEF_MAX:
        problems.append(f"brief is {n - BRIEF_MAX} characters over the limit")
    if not re.search(r"^SUBJECT:\s*\S", text, flags=re.M):
        problems.append("brief has no SUBJECT, and nothing else can stand in for it")


def check_prompt(text, kind, problems, notes):
    desc, attach, params = split_prompt(text)
    words = len(desc.split())
    notes.append(f"description: {words} words (aim {WORDS_MIN} to {WORDS_MAX})")
    if words < WORDS_MIN:
        problems.append(f"description is short by {WORDS_MIN - words} words")
    elif words > WORDS_MAX:
        problems.append(f"description is long by {words - WORDS_MAX} words")

    low = desc.lower()
    for tag in FILLER:
        if re.search(r"\b" + re.escape(tag) + r"\b", low):
            problems.append(f"quality tag '{tag}' describes nothing visible")
    if "::" in text:
        problems.append("'::' weights do not work on V8; say the balance in words, or run on V7")
    for q in re.findall(r'"([^"]+)"', desc):
        if len(q.split()) > QUOTE_MAX_WORDS:
            problems.append(f'quoted text "{q}" is over {QUOTE_MAX_WORDS} words and will break')

    if kind == "painting":
        hits = sorted({m.group(0) for p in CAMERA for m in re.finditer(p, low)})
        if hits:
            problems.append("camera words in a painting pull it toward a photo: " + ", ".join(hits))

    if params:
        if re.search(r"[A-Za-z]{3,}\.(\s|$)", re.sub(r"https?://\S+", "", params)):
            problems.append("a sentence appears after the parameters; parameters go last")
        for ar in re.findall(r"--ar\s+(\S+)", params):
            if not re.fullmatch(r"\d+:\d+", ar):
                problems.append(f"--ar {ar} must be two whole numbers")
        m = re.search(r"--no\s+(.+?)(?=\s--|$)", params)
        if m:
            terms = [t for t in re.split(r",\s*", m.group(1).strip()) if t]
            if len(terms) > NO_MAX_TERMS:
                problems.append(f"--no has {len(terms)} terms; keep it to {NO_MAX_TERMS}")
            notes.append("--no is unconfirmed on V8; say so, or rewrite the terms into the scene")
        for flag in ("--w ", "--weird", "--tile"):
            if flag in params + " ":
                notes.append(f"{flag.strip()} is unconfirmed on V8")
    else:
        problems.append("no parameters found")
    if attach:
        notes.append(attach)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--brief")
    ap.add_argument("--prompt")
    ap.add_argument("--kind", default="")
    a = ap.parse_args()
    if not (a.brief or a.prompt):
        ap.error("give --brief, --prompt, or both")

    problems, notes = [], []
    if a.brief:
        check_brief(read(a.brief), problems, notes)
    if a.prompt:
        check_prompt(read(a.prompt), a.kind.lower(), problems, notes)

    for n in notes:
        print("  " + n)
    if problems:
        print("FIX:")
        for p in problems:
            print("  - " + p)
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
