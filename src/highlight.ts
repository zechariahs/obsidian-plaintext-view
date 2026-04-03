import { tags } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

export const markdownHighlightStyle = HighlightStyle.define([
  // Heading markers (#)
  { tag: tags.heading, color: "var(--color-accent)" },

  // Heading text h1
  { tag: tags.heading1, color: "var(--color-accent)", fontWeight: "bold" },

  // Heading text h2
  { tag: tags.heading2, color: "var(--color-accent)", fontWeight: "normal" },

  // Heading text h3
  { tag: tags.heading3, color: "var(--color-accent)", fontWeight: "normal" },

  // Heading text h4
  { tag: tags.heading4, color: "var(--color-accent)", fontWeight: "normal" },

  // Heading text h5
  { tag: tags.heading5, color: "var(--color-accent)", fontWeight: "normal" },

  // Heading text h6
  { tag: tags.heading6, color: "var(--color-accent)", fontWeight: "normal" },

  // Bold
  {
    tag: tags.strong,
    color: "var(--bold-color, var(--text-normal))",
    fontWeight: "bold",
  },

  // Italic
  {
    tag: tags.emphasis,
    color: "var(--italic-color, var(--text-muted))",
    fontStyle: "italic",
  },

  // Strikethrough
  { tag: tags.strikethrough, color: "var(--text-faint)" },

  // Inline code / monospace
  { tag: tags.monospace, color: "var(--code-normal)" },

  // Code string content
  { tag: tags.string, color: "var(--code-normal)" },

  // Code fence / processing instruction
  { tag: tags.processingInstruction, color: "var(--color-accent)" },

  // Link text
  { tag: tags.link, color: "var(--link-color)" },

  // URL
  { tag: tags.url, color: "var(--link-color)" },

  // Blockquote marker
  {
    tag: tags.quote,
    color: "var(--blockquote-border-color, var(--color-accent))",
  },

  // List markers
  {
    tag: tags.list,
    color: "var(--list-marker-color, var(--text-muted))",
  },

  // Frontmatter meta
  { tag: tags.meta, color: "var(--text-faint)" },

  // YAML/frontmatter keys
  { tag: tags.keyword, color: "var(--tag-color, var(--color-accent))" },

  // Tag labels
  { tag: tags.labelName, color: "var(--tag-color, var(--color-accent))" },

  // HTML angle brackets + tag names
  { tag: tags.angleBracket, color: "var(--text-faint)" },

  // HTML tag names
  { tag: tags.tagName, color: "var(--text-faint)" },

  // Content separators (hr)
  { tag: tags.contentSeparator, color: "var(--divider-color)" },

  // Comment
  { tag: tags.comment, color: "var(--text-faint)" },
]);

export const markdownHighlightExtension = syntaxHighlighting(
  markdownHighlightStyle
);
