import { TextFileView, WorkspaceLeaf } from "obsidian";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { buildExtensions } from "./cm-extensions";

export const PLAIN_VIEW_TYPE = "plain-markdown-view";

export class PlainMarkdownView extends TextFileView {
  editor!: EditorView;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return PLAIN_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Plain Text View";
  }

  async onOpen(): Promise<void> {
    this.editor = new EditorView({
      state: EditorState.create({ doc: "", extensions: buildExtensions() }),
      parent: this.contentEl,
    });
  }

  getViewData(): string {
    return this.editor.state.doc.toString();
  }

  setViewData(data: string, clear: boolean): void {
    if (clear) {
      this.editor.setState(
        EditorState.create({ doc: data, extensions: buildExtensions() })
      );
    } else {
      this.editor.dispatch({
        changes: { from: 0, to: this.editor.state.doc.length, insert: data },
      });
    }
  }

  clear(): void {
    this.editor.dispatch({
      changes: { from: 0, to: this.editor.state.doc.length, insert: "" },
    });
  }

  async onClose(): Promise<void> {
    this.editor.destroy();
    return Promise.resolve();
  }
}
