# Free stock media for the COMSSI site

Researched 25 Sep 2026. Use these only for non-people atmosphere shots (see the rule below). Do not use any of these for photos that claim to show COMSSI's own programmes or beneficiaries.

**Rule:** if a photo or clip shows identifiable people, don't caption it as "COMSSI" or "our community" — either use it only as a blurred/muted background, or don't use it at all.

## Recommended free sites (checked licences, 25 Sep 2026)
| Site | License | Notes |
|---|---|---|
| **pexels.com** | Free for commercial use, no attribution required | Best general-purpose library; has real Kano/Nigeria photos |
| **pixabay.com** | CC0 (public-domain-style) | Good for nature/texture backgrounds |
| **coverr.co** | CC0, no attribution, no watermark | Best dedicated *loop video* library; has a "loop" category |
| **mixkit.co** | Free licence, but check each clip — some restrict monetised/ad use | Good curated quality; verify before commercial use |

## Real, confirmed Kano/Nigeria photos (Pexels)
- Street scene, Kano: https://www.pexels.com/photo/vibrant-street-scene-in-kano-nigeria-31684013/
- Street market stall, Kano: https://www.pexels.com/photo/street-food-cart-in-kano-nigeria-market-30583702/
- Browse more: https://www.pexels.com/search/kano/  and  https://www.pexels.com/search/nigeria/

## Category searches to browse yourself (stable search-result pages, not single photos that may get taken down)
**Photos (Pexels):**
- African community meeting: https://www.pexels.com/search/community%20meeting%20africa/
- Adult classroom / literacy: https://www.pexels.com/search/adult%20literacy%20class/
- Farmland / agribusiness: https://www.pexels.com/search/african%20farmland/
- Hands together (unity, diverse hands): https://www.pexels.com/search/hands%20together/
- Books and documents (for Resources/Publications page): https://www.pexels.com/search/open%20book%20desk/
- Savanna / green Northern Nigeria landscape: https://www.pexels.com/search/savanna%20green/

**Loop videos (Coverr, CC0):**
- Loop-category browse: https://coverr.co/stock-video-footage/loop
- Nature/green background loops: https://coverr.co/stock-video-footage/nature
- (Mixkit alternative, verify licence per clip): https://mixkit.co/free-stock-video/nature/

## What I'd actually use, given the new Forest Harmony palette
1. **Hero background (optional, muted, 8–15 sec loop):** a slow aerial or ground-level shot of green farmland/savanna from Coverr's loop or nature category. Fits `#198754`/`#0F5132` directly.
2. **Section dividers / empty-state backgrounds:** a soft blurred green-leaf or field texture from Pixabay, used as a low-opacity background, never as a "this is our work" photo.
3. **Do not use** generic "African village" or "African children" stock photos as if they were COMSSI's beneficiaries — that's the misrepresentation risk flagged earlier. Real archive photos stay the primary visual language until new COMSSI photos arrive.

## How to add a hero video once you download one
1. Export it as **muted, .mp4, under 3 MB, 1280×720 or smaller** (use a free compressor like Handbrake or CloudConvert).
2. Save it as `assets/videos/hero-loop.mp4`.
3. Tell me, and I'll wire it into the homepage hero as a `<video autoplay muted loop playsinline>` with your current photo kept as the poster/fallback image — it already degrades gracefully if the file isn't there.
