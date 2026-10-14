export const prodGameUrl = "https://blockstack.ing";
export const devGameUrl = "https://blockstack.dev";
/** the game built alongside this editor */
export const localGameUrl = import.meta.env.VITE_GAME_URL;

/** the games a playtest can be opened in, labelled as the ui shows them */
export const playtestGameUrls: ReadonlyArray<{ url: string; label: string }> = [
  ...(localGameUrl !== devGameUrl && localGameUrl !== prodGameUrl ?
    [{ url: localGameUrl, label: "here" }]
  : []),
  { url: prodGameUrl, label: ".ing" },
  { url: devGameUrl, label: ".dev" },
];
