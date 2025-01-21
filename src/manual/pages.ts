const rawPages = import.meta.glob<string>("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// pages, in order as found in the original paper manual
export const manualPages = {
  historyOfTheBlacktoothEmpire: rawPages["./historyOfTheBlacktoothEmpire.md"],
  theGame: rawPages["./theGame.md"],
  egyptus: rawPages["./egyptus.md"],
  penitentiary: rawPages["./penitentiary.md"],
  safari: rawPages["./safari.md"],
  bookWorld: rawPages["./bookWorld.md"],
  blacktooth: rawPages["./blacktooth.md"],
  head: rawPages["./head.md"],
  heels: rawPages["./heels.md"],
  reincarnationFish: rawPages["./reincarnationFish.md"],
  cuddlyStuffedWhiteRabbits: rawPages["./cuddlyStuffedWhiteRabbits.md"],
  hooter: rawPages["./hooter.md"],
  doughnuts: rawPages["./doughnuts.md"],
  bag: rawPages["./bag.md"],
  crowns: rawPages["./crowns.md"],
  teleports: rawPages["./teleports.md"],
  springs: rawPages["./springs.md"],
  switches: rawPages["./switches.md"],
  conveyorBelts: rawPages["./conveyorBelts.md"],
  hushPuppies: rawPages["./hushPuppies.md"],
  theEmperorsGuardian: rawPages["./theEmperorsGuardian.md"],
  swopKey: rawPages["./swopKey.md"],
  hintsAndTips: rawPages["./hintsAndTips.md"],
  credits: rawPages["./credits.md"],
};

export const markdownPages = {
  ...manualPages,
  teleportBack: rawPages["./teleportBack.md"],
};

export type MarkdownPageName = keyof typeof markdownPages;

// regex to ge the title from any markdown page
export const titleRegex = /^##\s+(.*)$/m;

export const pageTitle = (pageContent: string): string => {
  const match = pageContent.match(titleRegex);
  if (match === null) {
    return "no title found";
  }
  const [, title] = match;
  return title;
};
