import { dirname } from "path";
import { fileURLToPath } from "url";

export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));
