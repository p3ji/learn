# Portrait attribution

All images in this folder are **public domain**. Each was checked individually
against the Wikimedia Commons API before being vendored here — every source page
explicitly carries a "Public domain" license (expired copyright on an old work),
not a Creative Commons or permission-only grant.

Attribution is not legally required for public domain works, but is given here
because the app teaches children to ask where a claim comes from, and it would be
odd to model anything else. The in-app portrait slide shows the same credit.

| Thinker | Work | Source |
|---|---|---|
| Socrates | Roman marble copy after a Greek original, Louvre Museum | [Commons](https://commons.wikimedia.org/wiki/File:Socrates_Louvre.jpg) |
| Hypatia | Engraving, unknown artist, mid-19th century | [Commons](https://commons.wikimedia.org/wiki/Category:Hypatia) |
| Aristotle | Roman marble copy after a Greek original attributed to Lysippos, Palazzo Altemps | [Commons](https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg) |
| Marcus Aurelius | Roman marble bust, 2nd century CE, Metropolitan Museum of Art | [Commons](https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Metropolitan_Museum.png) |
| René Descartes | After Frans Hals, Louvre Museum | [Commons](https://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg) |
| John Stuart Mill | Photograph by John Watkins, 1865 | [Commons](https://commons.wikimedia.org/wiki/File:John_Stuart_Mill_by_John_Watkins,_1865.jpg) |
| Confucius | Traditionally attributed to Wu Daozi, Tang Dynasty (8th c. CE) | [Commons](https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty.jpg) |
| Lao Tzu | Traditional Chinese painting, artist unknown | [Commons](https://commons.wikimedia.org/wiki/File:Laozi.jpg) |
| Immanuel Kant | Artist uncertain (school of Anton Graff), 18th century | [Commons](https://commons.wikimedia.org/wiki/File:Immanuel_Kant_(painted_portrait).jpg) |
| Ada Lovelace | Margaret Sarah Carpenter, 1836, Government Art Collection UK | [Commons](https://commons.wikimedia.org/wiki/File:Carpenter_portrait_of_Ada_Lovelace_-_detailFXD.jpg) |

## Two deliberate omissions

**Karl Popper — no image.** He died in 1994, recently enough that photographs of
him remain under copyright in most jurisdictions. The images findable online are
permission-granted or CC-BY-SA, not public domain. Rather than use one, or leave
a silent gap, his slide explains the situation to the child: not everything true
and well-documented is free to copy. If a rights holder ever releases a photo
into the public domain, add it to `PORTRAIT_PHOTOS` in `js/portraits.js`.

**Hypatia — engraving, not the famous painting.** Charles William Mitchell's 1885
*Hypatia* is also public domain and is the best-known image of her, but it depicts
her nude. Not appropriate for an app aimed at 8–12 year olds.

## Adding or replacing an image

1. Confirm the licence on the Commons file page — it must say *Public domain*.
   `Creative Commons`, `CC-BY-SA`, or "permission granted" are **not** acceptable
   here, because they impose conditions this app does not surface to users.
2. Download the ~500px thumbnail, not the full-resolution original.
3. Add an entry to `PORTRAIT_PHOTOS` in `js/portraits.js` with an honest
   `lifetime` flag and a caption that says whether it was made from life.
4. Add a row to the table above.
5. `npx playwright test story_scenes` — the suite checks the file exists, the
   source link is present, and the caption matches the `lifetime` flag.
