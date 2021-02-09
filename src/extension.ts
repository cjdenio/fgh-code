// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import { exec } from "child_process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "fgh-code" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "fgh-code.openProject",
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      const text = await vscode.window.showInputBox({
        placeHolder: "Project name",
      });

      if (text) {
        exec(`fgh ls "${text}"`, async (err, stdout, stderr) => {
          if (err) {
            vscode.window.showErrorMessage("error :(");
            return;
          }

          await vscode.commands.executeCommand(
            "vscode.openFolder",
            vscode.Uri.file(stdout.trim())
          );
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
