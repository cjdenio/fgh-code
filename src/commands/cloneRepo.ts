import {
  commands,
  env,
  ProgressLocation,
  Uri,
  window as vsCodeWindow,
  window,
} from "vscode";

import { exec } from "child_process";
import { getProjectPath } from "../fgh";

export default async () => {
  const text = await vsCodeWindow.showInputBox({
    placeHolder: "Repo to clone, in owner/repo format",
  });

  if (!text) {
    return;
  }

  const err = await vsCodeWindow.withProgress(
    {
      cancellable: true,
      location: ProgressLocation.Notification,
      title: `Cloning ${text}...`,
    },
    (progress, cancellationToken) => {
      return new Promise((resolve, reject) => {
        const childProcess = exec(`fgh clone "${text}"`, (err) => {
          if (err) {
            resolve(err);
          } else {
            resolve(null);
          }
        });

        cancellationToken.onCancellationRequested(() => {
          childProcess.kill();
        });
      });
    }
  );

  if (err) {
    vsCodeWindow.showErrorMessage(`Something went wrong: ${err}`);
    return;
  }

  await commands.executeCommand("fgh-code.refreshSidebar");

  const openResponse = await vsCodeWindow.showInformationMessage(
    `Successfully cloned ${text}!`,
    "Open repository"
  );
  if (openResponse == "Open repository") {
    commands.executeCommand(
      "vscode.openFolder",
      Uri.file(await getProjectPath(text))
    );
  }
};
