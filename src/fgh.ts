import { exec } from "child_process";

export function getProjectPath(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`fgh ls "${name}"`, (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stdout.trim());
    });
  });
}

export function getProjectList(): Promise<{ [key: string]: string }> {
  return new Promise((resolve, reject) => {
    exec("fgh visualize --ownerName", (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = stdout.trim().split("\n");

      const projects: { [key: string]: string } = {};

      for (let i = 0; i < lines.length / 2; i++) {
        projects[lines[i * 2]] = lines[i * 2 + 1];
      }

      resolve(projects);
    });
  });
}

export function cloneRepo(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`fgh clone "${name}"`, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
