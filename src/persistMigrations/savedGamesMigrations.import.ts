import { importOnce } from "../utils/importOnce";

export const importSavedGamesMigrations = importOnce(
  async () => (await import("./savedGamesMigrations.ts")).savedGamesMigrations,
);
