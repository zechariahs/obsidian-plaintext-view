import { MarkdownView, Plugin } from "obsidian";
import { PlainMarkdownView, PLAIN_VIEW_TYPE } from "./plain-view";

export default class PlainTextViewPlugin extends Plugin {
  private ribbonIconEl!: HTMLElement;
  private actionAddedViews = new WeakSet<MarkdownView>();

  onload(): void {
    this.registerView(
      PLAIN_VIEW_TYPE,
      (leaf) => new PlainMarkdownView(leaf)
    );

    this.ribbonIconEl = this.addRibbonIcon(
      "code-2",
      "Toggle plain text view",
      () => void this.togglePlainTextView()
    );

    this.addCommand({
      id: "toggle-plain-text-view",
      name: "Toggle plain text view",
      checkCallback: (checking: boolean) => {
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile && activeFile.extension === "md") {
          if (!checking) {
            void this.togglePlainTextView();
          }
          return true;
        }
        return false;
      },
    });

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => this.updateRibbonIcon())
    );

    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        this.app.workspace.iterateAllLeaves((leaf) => {
          if (leaf.view instanceof MarkdownView && !this.actionAddedViews.has(leaf.view)) {
            const actionEl = leaf.view.addAction(
              "code-2",
              "Toggle plain text view",
              (_evt: MouseEvent) => {
                this.app.workspace.setActiveLeaf(leaf, { focus: true });
                void this.togglePlainTextView();
              }
            );
            actionEl.addClass("plaintext-view-action");
            this.actionAddedViews.add(leaf.view);
          }
        });
      })
    );
  }

  private async togglePlainTextView(): Promise<void> {
    const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
    const plainView = this.app.workspace.getActiveViewOfType(PlainMarkdownView);
    const leaf = markdownView?.leaf ?? plainView?.leaf;

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
    const isPlainView = !!this.app.workspace.getActiveViewOfType(PlainMarkdownView);

    if (isPlainView) {
      this.ribbonIconEl.addClass("is-active");
    } else {
      this.ribbonIconEl.removeClass("is-active");
    }
  }
}
