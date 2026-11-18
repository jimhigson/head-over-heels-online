import { importOnce } from "../utils/importOnce";

export const importUserSettingsMigrations = importOnce(
  async () =>
    (await import("./userSettingsMigrations.ts")).userSettingsMigrations,
);
