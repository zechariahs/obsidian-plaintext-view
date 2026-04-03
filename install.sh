#!/bin/zsh
# Copies the built plugin files to your Obsidian vault.
# Run from the project root after `npm run build`.

VAULT="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Zack's Obsidian Vault 20260131"
PLUGIN_DIR="$VAULT/.obsidian/plugins/obsidian-plaintext-view"

set -e

if [[ ! -f main.js ]]; then
  echo "main.js not found — run 'npm run build' first." >&2
  exit 1
fi

mkdir -p "$PLUGIN_DIR"
cp main.js manifest.json styles.css "$PLUGIN_DIR/"

echo "Installed to: $PLUGIN_DIR"
