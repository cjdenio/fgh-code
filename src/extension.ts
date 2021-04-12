// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, window as vsCodeWindow } from "vscode";

import openProject from "./commands/openProject";
import cloneRepo from "./commands/cloneRepo";

import FghProjectsProvider from "./projectsProvider";
import refreshSidebar from "./commands/refreshSidebar";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "fgh-code" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const projectsProvider = new FghProjectsProvider();

  context.subscriptions.push(
    commands.registerCommand("fgh-code.openProject", openProject)
  );

  context.subscriptions.push(
    commands.registerCommand("fgh-code.cloneRepo", cloneRepo)
  );

  context.subscriptions.push(
    commands.registerCommand(
      "fgh-code.refreshSidebar",
      refreshSidebar(projectsProvider)
    )
  );

  const projectsTreeView = vsCodeWindow.createTreeView("fgh-projects", {
    treeDataProvider: projectsProvider,
  });

  context.subscriptions.push(projectsTreeView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
