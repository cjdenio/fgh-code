import { commands, env, Uri, window as vsCodeWindow, workspace } from "vscode";

import FghProjectsProvider from "../projectsProvider";

export default (provider: FghProjectsProvider) => {
  return async () => {
    provider.refresh();
  };
};
