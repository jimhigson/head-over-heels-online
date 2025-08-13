import { existsSync } from "fs";
import { resolve } from "path/posix";

const getGamedataMapXmlLocation = (): string => {
  const location =
    process.env.GAMEDATA_MAP_XML_LOCATION || "../HeadOverHeels/gamedata/map";
  const resolvedPath = resolve(location);

  if (!existsSync(resolvedPath)) {
    throw new Error(
      `Cannot find gamedata map XML directory at: ${resolvedPath}\n` +
        `Please either:\n` +
        `1. Clone the HeadOverHeels repository from https://github.com/dougmencken/HeadOverHeels to ../HeadOverHeels\n` +
        `2. Set the GAMEDATA_MAP_XML_LOCATION environment variable to point to the gamedata/map directory\n` +
        `3. If conversion fails with the latest version, try commit 08aee0cb050405dc23d95bf288631452bec28c9f in the meantime and open an issue at https://github.com/jimhigson/head-over-heels-online/issues`,
    );
  }

  return resolvedPath;
};

export const gamedataMapXmlLocation = getGamedataMapXmlLocation();
