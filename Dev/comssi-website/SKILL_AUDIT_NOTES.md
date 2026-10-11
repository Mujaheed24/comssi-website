# ui-ux-pro-max skill: what it found, what changed

I cloned the real repo (github.com/nextlevelbuilder/ui-ux-pro-max-skill) and ran its actual search tool against a local database of UX guidelines, color pairs, and accessibility rules — not a summary of the docs. Commands run:

```
python3 scripts/search.py "nonprofit NGO community trust" --design-system -p "COMSSI"
python3 scripts/search.py "focus ring visible keyboard nav" --domain ux
python3 scripts/search.py "touch target size mobile" --domain ux
python3 scripts/search.py "reduced motion prefers" --domain ux
python3 scripts/search.py "error message form field" --domain ux
python3 scripts/search.py "dropdown menu keyboard accessible" --domain ux
python3 scripts/search.py "skip link screen reader" --domain ux
```

## Real bug it caught: button contrast fails WCAG 4.5:1
The skill's #1-priority rule is "Contrast 4.5:1." I computed the actual ratio for our primary-button text against its gradient and it failed:
- Dark text (`#0f2a05`) on the button gradient: **~3.4:1** — fails.
- White text on the original gradient: **3.0–4.5:1** — still failed at the lighter stop.

**Fix:** darkened the gradient to `#198754 → #157347` and switched button text to white. Verified: **4.53:1 and 5.87:1** at the two gradient stops — passes.

## Other verified fixes applied
1. **Reduced motion gap.** The hero's animated scroll-cue dot wasn't included in the `prefers-reduced-motion: reduce` block — a real oversight from the last session. Fixed.
2. **Touch targets.** The mobile language switch (EN|HA) and dropdown sub-links were under the 44px minimum the skill flags as High severity. Both now have `min-height: 44px`.
3. **Form errors.** The contact form only relied on the browser's default validation popup — the skill flags "top-level error only, no field-specific message" as a High-severity Don't. Rebuilt it with: an inline error under each invalid field, `aria-describedby` linking the field to its error, and a focus-managed error summary at the top (role="alert", jumps focus to it, each item links to its field) — this matches the skill's "Focusable Error Summary" guidance exactly.
4. **Dropdown semantics.** Added `aria-haspopup="true"` to the "What we do" nav trigger.

## Checked, already fine
- Skip-to-content link — already present, matches the guidance exactly.
- Icon-only buttons (lightbox prev/next/close) — already have `aria-label`.
- `:focus-visible` outline — already global and passes contrast (~6.4:1).

## Applied on request: fonts + layout defaults (colors kept as Forest Harmony)
- **Fonts:** switched English pages from Fraunces/Figtree to the skill's suggested pairing, **Outfit + Work Sans**, across all 8 English pages and the shared CSS tokens. Hausa pages keep Noto Serif/Sans, since Hausa's hooked letters (ɓ ɗ ƙ ƴ) need guaranteed coverage that a generic pairing doesn't promise.
- **Layout pattern:** checked the homepage against the skill's "Hero + Features + CTA" structure (Hero → Value prop → Features → CTA → Footer, sticky CTA in hero + one at the bottom). The site already matches this — sticky header keeps "Contact us" always reachable, and the page runs Hero → About → Features (8, kept as-is since that's real programme content, not filler) → Track record → Gallery → Work-with-us CTA → Contact → Footer.
- **Bug found while checking this:** both homepages (`index.html` and `ha/index.html`) had a duplicated `<section class="quote">` — same content rendered twice back to back, left over from an earlier edit. Removed the duplicate on both.
