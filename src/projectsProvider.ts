import {
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  Uri,
  EventEmitter,
  Event,
} from "vscode";

import { getProjectList } from "./fgh";

class FghProjectsProvider implements TreeDataProvider<TreeItem> {
  getTreeItem(element: TreeItem): TreeItem {
    return element;
  }

  getChildren(element?: TreeItem): Thenable<TreeItem[]> {
    return new Promise(async (resolve, reject) => {
      const projects = await getProjectList();

      resolve(
        Object.entries(projects).map(([project, path]) => {
          const item = new TreeItem(project);

          item.command = {
            command: "fgh-code.openProject",
            title: "Open",
            arguments: [{ name: project, path: Uri.file(path) }],
          };

          item.iconPath = ThemeIcon.Folder;

          return item;
        })
      );
    });
  }

  private _onDidChangeTreeData: EventEmitter<
    TreeItem | undefined | null | void
  > = new EventEmitter<TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: Event<TreeItem | undefined | null | void> = this
    ._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

export default FghProjectsProvider;
