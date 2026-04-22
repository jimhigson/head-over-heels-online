#!/usr/bin/env -S pnpm tsx

import { Command } from "@commander-js/extra-typings";
import { $ } from "execa";

const editableGif = "gfx/spritesToppy-ed.gif";
const finalPng = "gfx/spritesToppy.png";
const backgroundColour = "#88ffaa";

const program = new Command();

program
  .name("toppySpritesheet")
  .description("Convert Toppy spritesheets between editable and final formats");

program
  .command("toFinal")
  .description(
    "Convert editable GIF to game-ready PNG by replacing background with transparency",
  )
  .action(async () => {
    await $`magick ${editableGif} -fuzz 0% -fill none -opaque ${backgroundColour} ${finalPng}`;
  });

program
  .command("toEdit")
  .description(
    "Convert final PNG back to editable GIF by filling transparent background with colour",
  )
  .action(async () => {
    await $`magick ${finalPng} -background ${backgroundColour} -alpha remove -alpha off ${editableGif}`;
  });

program
  .command("optimise")
  .description(
    "Optimise the final PNG: reduce palette with pngquant and tag as Display P3",
  )
  .action(async () => {
    const run = $({
      stdio: "inherit",
    });
    await run`pngquant -vf --quality 100-100 --ext .png -- ${finalPng}`;
    //await run`magick ${finalPng} -profile gfx/DisplayP3-v2-micro.icc ${finalPng}`;
    await run`magick identify -verbose ${finalPng}`;
  });

program.parse();
