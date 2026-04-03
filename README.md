# Plain Text View

An Obsidian plugin that opens Markdown files in a plain-text editor view with syntax-aware color coding — no rendering, no decorations. Raw Markdown characters are always visible.

## What it does

- Opens `.md` files in a CodeMirror 6 editor that shows raw Markdown syntax
- Color-codes tokens (headings, bold, italic, code, links, etc.) using your active Obsidian theme's CSS variables — colors adapt automatically when you switch themes
- Fully editable — changes save normally
- Works on desktop and mobile

## Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release
2. Copy them into your vault at `.obsidian/plugins/obsidian-plaintext-view/`
3. Enable the plugin in **Settings → Community plugins**

### Via BRAT (Beta Reviewers Auto-update Tool)

1. Install the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat)
2. In BRAT settings, click **Add Beta plugin** and enter this repository's URL
3. Enable the plugin in **Settings → Community plugins**

## Usage

Three ways to toggle the plain-text view on the active note:

- **Command palette:** Search for `Toggle Plain Text Markdown View`
- **Ribbon icon:** Click the `</>` icon in the left sidebar (highlighted when active)
- **Note action bar:** Click the `</>` icon in the top-right of the note pane (alongside the Reading View icon)

Activating the toggle again returns you to the standard Obsidian view.

## Mobile support

The plugin is fully supported on iOS and Android. The ribbon icon and note action bar button are the primary entry points on mobile. Tap targets meet the 44×44px minimum size requirement.

> **Theme compatibility note:** Colors are sourced from your theme's CSS custom properties. The Default, Minimal, and Things themes are well-supported. Third-party themes that do not define standard Obsidian CSS variables (e.g., `--color-accent`, `--text-normal`) may display some tokens as `inherit` color rather than a distinct highlight. This is by design — the plugin never hardcodes colors.

## Token color mapping

| Element | CSS variable used |
|---|---|
| Headings | `--color-accent` |
| Bold | `--bold-color` |
| Italic | `--italic-color` |
| Inline code | `--code-normal` |
| Links | `--link-color` |
| Tags | `--tag-color` |
| Blockquotes | `--blockquote-border-color` |
| Strikethrough | `--text-faint` |
| HTML | `--text-faint` |

## Development

```bash
npm install
npm run dev     # watch mode
npm run build   # production build
```
