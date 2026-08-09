import { importOnce } from "../../utils/importOnce";

/**
 * @blockstacking/jims-shaders is only needed once a player turns the CRT
 * filter on, which is off by default - loading it dynamically keeps it out
 * of the bundle for everyone who never does
 */
export const loadCrtFilterLibrary = importOnce(
  () => import("@blockstacking/jims-shaders"),
);
