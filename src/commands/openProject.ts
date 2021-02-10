import { commands, env, Uri, window as vsCodeWindow } from "vscode";

import { getProjectList } from "../fgh";

export default async () => {
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
      `Something went wrong: ${err.message}`,
      "Install fgh"
    );
    if (clicked == "Install fgh") {
      env.openExternal(Uri.parse("https://github.com/Matt-Gleich/fgh#readme"));
    }
  }
};
