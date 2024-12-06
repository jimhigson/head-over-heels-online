import { Assets } from "pixi.js";
import headOverHeelsFontSrc from "../../../assets/head-over-heels.ttf";
export const loadFont = async () => {
  /* we need to explicitly give the font family name, or vite will rename the file to include a hash,
    and pixi will name the family after that */

  Assets.addBundle("fonts", {
    "Head over heels": {
      src: headOverHeelsFontSrc,
      data: { family: "Head over heels" },
    },
  });

  await Assets.loadBundle("fonts");
};
