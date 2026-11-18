# questerslab.github.io

The public website of the **Questers Lab** YouTube channel ([@questerslab](https://www.youtube.com/@questerslab)), served by GitHub Pages at https://questerslab.github.io/.

| Page | What |
|---|---|
| `index.html` | Landing page: what the channel explains, a playable mini quiz, the quest board, how videos are made |
| `brand.html` | Brand kit: logo, watermark, wordmark, banner, colours, fonts, downloads |
| `privacy.html`, `terms.html` | Privacy policy and terms. **Linked from the Google Cloud OAuth consent screen** of the private analytics tool: keep these URLs working |
| `404.html` | Not-found page |
| `assets/` | `style.css`, self-hosted fonts (Inter, Nunito; SIL OFL 1.1), images, and `downloads/` (brand files) and `site.js` (small optional extras: the map animation, the quiz, the quest board) |

Plain HTML and CSS, no build step. Edit, commit to `main`, and Pages republishes in about a minute.

Brand files are copied from the channel's `brand/` folder in the (private) production repo. Update both together.

Keep this repo **public**: GitHub Pages on a free plan only serves public repos, and Google needs the privacy page to stay online.
