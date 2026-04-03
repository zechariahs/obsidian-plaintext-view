import { MarkdownView, Plugin } from "obsidian";
import { PlainMarkdownView, PLAIN_VIEW_TYPE } from "./plain-view";

export default class PlainTextViewPlugin extends Plugin {
  private ribbonIconEl!: HTMLElement;

  async onload(): Promise<void> {
    this.registerView(
      PLAIN_VIEW_TYPE,
      (leaf) => new PlainMarkdownView(leaf)
    );

    // Ribbon icon
    this.ribbonIconEl = this.addRibbonIcon(
      "code-2",
      "Toggle Plain Text View",
      () => this.togglePlainTextView()
    );

    // Command
    this.addCommand({
      id: "toggle-plain-text-view",
      name: "Toggle Plain Text Markdown View",
      checkCallback: (checking: boolean) => {
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile && activeFile.extension === "md") {
          if (!checking) {
            this.togglePlainTextView();
          }
          return true;
        }
        return false;
      },
    });

    // Update ribbon icon state on active leaf change
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => this.updateRibbonIcon())
    );

    // Per-note action button — add to each MarkdownView pane
    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        this.app.workspace.iterateAllLeaves((leaf) => {
          if (leaf.view instanceof MarkdownView) {
            const view = leaf.view as MarkdownView;
            // Only add if not already added
            if (!(view as any)._plaintextActionAdded) {
              const actionEl = view.addAction(
                "code-2",
                "Toggle Plain Text View",
                (_evt: MouseEvent) => {
                  this.app.workspace.setActiveLeaf(leaf, { focus: true });
                  this.togglePlainTextView();
                }
              );
              actionEl.addClass("plaintext-view-action");
              (view as any)._plaintextActionAdded = true;
            }
          }
        });
      })
    );
  }

  onunload(): void {
    this.app.workspace.detachLeavesOfType(PLAIN_VIEW_TYPE);
  }

  private async togglePlainTextView(): Promise<void> {
    const leaf =
      this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf ??
      this.app.workspace.activeLeaf;

    if (!leaf) return;

    const currentType = leaf.view.getViewType();

    if (currentType === PLAIN_VIEW_TYPE) {
      await leaf.setViewState({
        type: "markdown",
        state: leaf.getViewState().state,
      });
    } else {
      await leaf.setViewState({
        type: PLAIN_VIEW_TYPE,
        state: leaf.getViewState().state,
      });
    }

    this.updateRibbonIcon();
    this.app.workspace.requestSaveLayout();
  }

  private updateRibbonIcon(): void {
    const activeLeaf = this.app.workspace.activeLeaf;
    const viewType = activeLeaf?.view?.getViewType();

    if (viewType === PLAIN_VIEW_TYPE) {
      this.ribbonIconEl.addClass("is-active");
    } else {
      this.ribbonIconEl.removeClass("is-active");
    }
  }
}
