#!/usr/bin/env -S pnpm tsx

import { Command } from "@commander-js/extra-typings";
import { $ } from "execa";
import { stat } from "node:fs/promises";

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
    const sizeBefore = (await stat(finalPng)).size;
    await run`pngquant -vf --quality 100-100 --ext .png -- ${finalPng}`;
    //await run`magick ${finalPng} -profile gfx/DisplayP3-v2-micro.icc ${finalPng}`;
    await run`magick identify -verbose ${finalPng}`;
    const sizeAfter = (await stat(finalPng)).size;
    const formatKb = (bytes: number) => `${(bytes / 1024).toFixed(2)} KB`;
    const delta = sizeAfter - sizeBefore;
    const pct = ((delta / sizeBefore) * 100).toFixed(2);
    console.log(
      `\n${finalPng}: ${formatKb(sizeBefore)} → ${formatKb(sizeAfter)} (${delta >= 0 ? "+" : ""}${formatKb(delta)}, ${delta >= 0 ? "+" : ""}${pct}%)`,
    );
  });

program.parse();
