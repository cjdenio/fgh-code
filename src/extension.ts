// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  commands,
  env,
  Uri,
  window as vsCodeWindow,
  ExtensionContext,
} from "vscode";

import { getProjectList, getProjectPath } from "./fgh";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "fgh-code" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = commands.registerCommand(
    "fgh-code.openProject",
    async () => {
      try {
        const projects = await getProjectList();

        const text = await vsCodeWindow.showQuickPick(Object.keys(projects));

        if (!text) {
          return;
        }
        await commands.executeCommand(
          "vscode.openFolder",
          Uri.file(projects[text])
        );
      } catch (err) {
        console.error(err);
        const clicked = await vsCodeWindow.showErrorMessage(
          `error opening project: ${err.message}`,
          "Install fgh"
        );
        if (clicked == "Install fgh") {
          env.openExternal(
            Uri.parse("https://github.com/Matt-Gleich/fgh#readme")
          );
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
