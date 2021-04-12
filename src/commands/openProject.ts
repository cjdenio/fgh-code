import { commands, env, Uri, window as vsCodeWindow, workspace } from "vscode";

import { getProjectList } from "../fgh";

export default async (project?: { name: string; path: Uri }) => {
  try {
    if (project) {
      const prompt = workspace.getConfiguration("fgh-code").get("promptOnOpen");

      if (prompt) {
        const response = await vsCodeWindow.showInformationMessage(
          `Open project ${project.name}?`,
          "Open",
          "Open, don't prompt again",
          "Cancel"
        );

        if (response == "Open" || response == "Open, don't prompt again") {
          if (response == "Open, don't prompt again") {
            await workspace
              .getConfiguration("fgh-code")
              .update("promptOnOpen", false, true);
          }

          await commands.executeCommand("vscode.openFolder", project.path);
        }
      } else {
        await commands.executeCommand("vscode.openFolder", project.path);
      }

      return;
    }
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
      `Something went wrong: ${err.message}`,
      "Install fgh"
    );
    if (clicked == "Install fgh") {
      env.openExternal(Uri.parse("https://github.com/Matt-Gleich/fgh#readme"));
    }
  }
};
