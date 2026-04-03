import { EditorView } from "@codemirror/view";
import { markdown } from "@codemirror/lang-markdown";
import { markdownHighlightExtension } from "./highlight";

export function buildExtensions() {
  return [
    EditorView.editable.of(true),
    EditorView.lineWrapping,
    markdown(),
    markdownHighlightExtension,
  ];
}
