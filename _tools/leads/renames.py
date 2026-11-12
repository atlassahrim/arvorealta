#!/usr/bin/env python3
"""Norwegian companies that changed their registered name.

Reads Brønnøysund's open update feed (no key), keeps limited companies with
staff, and adds what the register holds about each: industry, town, website,
email, phone and the managing director. Usage:

    python3 renames.py 2026-10-29 2026-11-12 > out.json
"""
import json, sys, urllib.request, concurrent.futures as cf

API = "https://data.brreg.no/enhetsregisteret/api"
MIN_STAFF = 5
SKIP = ("64.", "68.", "66.", "70.1")   # holding, property, fund admin, head offices

def get(url):
    return json.load(urllib.request.urlopen(url, timeout=60))

def name_changes(start, end):
    # The feed refuses deep pages, so each request starts after the last id seen.
    base = f"{API}/oppdateringer/enheter?includeChanges=true&size=10000"
    url = base + f"&dato={start}T00:00:00.000Z"
    seen = {}
    while True:
        items = get(url).get("_embedded", {}).get("oppdaterteEnheter", [])
        if not items: return seen
        for it in items:
            if it["dato"][:10] >= end: return seen
            for c in it.get("endringer") or []:
                if c.get("path") == "/navn" and c.get("value"):
                    seen[it["organisasjonsnummer"]] = (c["value"], it["dato"][:10])
        url = base + f"&oppdateringsid={items[-1]['oppdateringsid'] + 1}"

def enrich(item):
    org, (name, date) = item
    try: e = get(f"{API}/enheter/{org}")
    except Exception: return None
    form = e.get("organisasjonsform", {}).get("kode")
    staff = e.get("antallAnsatte") or 0
    nace = e.get("naeringskode1", {})
    if form not in ("AS", "ASA") or staff < MIN_STAFF: return None
    if (nace.get("kode") or "").startswith(SKIP) or e.get("konkurs") or e.get("underAvvikling"): return None
    boss = ""
    try:
        for g in get(f"{API}/enheter/{org}/roller").get("rollegrupper", []):
            if g.get("type", {}).get("kode") == "DAGL":
                p = g["roller"][0].get("person", {}).get("navn", {})
                boss = " ".join(x for x in (p.get("fornavn"), p.get("mellomnavn"), p.get("etternavn")) if x)
    except Exception: pass
    adr = e.get("forretningsadresse", {})
    return dict(org=org, name=name, changed=date, staff=staff, industry=nace.get("beskrivelse"),
                town=adr.get("poststed"), web=e.get("hjemmeside"), email=e.get("epostadresse"),
                phone=e.get("mobil") or e.get("telefon"), md=boss, founded=e.get("stiftelsesdato"))

if __name__ == "__main__":
    ch = name_changes(sys.argv[1], sys.argv[2])
    print(len(ch), "name changes", file=sys.stderr)
    with cf.ThreadPoolExecutor(6) as ex:
        rows = [r for r in ex.map(enrich, ch.items()) if r]
    rows.sort(key=lambda r: -r["staff"])
    print(len(rows), "limited companies with staff", file=sys.stderr)
    json.dump(rows, sys.stdout, ensure_ascii=False, indent=1)
