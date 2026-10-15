/** how the editor opens the campaign in the game to playtest it */
export type PlaytestOptions = {
  /** the game to open the campaign in */
  baseUrl: string;
  /** start at the campaign's start, not the editor's current room */
  fromStart: boolean;
  playAsHeels: boolean;
};
