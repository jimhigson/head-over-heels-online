[![check-all CI](https://github.com/jimhigson/head-over-heels-online/actions/workflows/check.yml/badge.svg)](https://github.com/jimhigson/head-over-heels-online/actions/workflows/check.yml)

Head over heels web-based game remake and level editor.

Features mobile and desktop support, support for gamepads, keyboard, and touch interfaces.

<div align="center">
  <h2><a href="https://blockstack.ing/">🎮 Play the game at Blockstack.ing</a></h2>
</div>

## Shaders

- CRT shaders made for this project spun out into their own repo here: [jims_shaders](https://github.com/jimhigson/jims_shaders).

## Discord/social

If you'd like, you can discuss the project on [Discord](https://discord.gg/Se5Jznc2jm)

## Developing

This project uses Playwright for visual regression testing, so the repo history can get large with screenshots. It is recommended to clone shallowly, since historic screenshots will inflate the size of the local repo:

```sh
# Clone with only the latest commit
git clone --depth 1 https://github.com/jimhigson/hohjs.git
```

Then, run the game with:

```sh
pnpm i # install deps
pnpm dev:game
```

For more info on developing, pls ask in [the Discord server](https://discord.gg/Se5Jznc2jm)

## Credits

- [Jon Ritman](http://ritman.co.uk/) and Bernie Drummond for making the original game.
- Reference Room data was originally converted to json, from the [xml in Doug Mencken's remake](https://github.com/dougmencken/HeadOverHeels/tree/master/gamedata). Now that I have the json, the room data is forked and I'm updating the json in the the level editor.
- Some HoH audio also forked and re-encoded from [Doug Mencken's remake](https://github.com/dougmencken/HeadOverHeels) under the terms of the GPL v3
- I built [snarkdown-in-react](https://www.npmjs.com/package/snarkdown-in-react) for this project, forked from the original [snarkdown](https://github.com/developit/snarkdown)
- This repo has a [fork](src/game/render/sortZ/toposort/toposort.ts) built from [toposort](https://github.com/marcelklehr/toposort), adjusted ot be a bit more tolerant of cyclic paths in the graph
- Recoulourised 16 colour sprites are built from rips [by Tippy on Spriters Resource](https://www.spriters-resource.com/zx_spectrum/headoverheels/) based on original artwork by Bernie Drummand (sadly [no longer with us](https://www.theregister.com/2021/11/17/rip_bernie_drummond/)).
* Playtesting, ideas, map design, and general support by my brother, Tom Higson
* Playtesting, moral support, and constant comms by [Jon Albaugh](https://x.com/fextwolf?s=21&t=PEqxJblCn3JB_NH8AOR6Zg)
* Head over heels [font](https://fontstruct.com/fontstructions/show/996776/head_over_heels) recreated by [Patrick H. Lauke](http://splintered.co.uk/) is used in save dialogs for the level editor
* [PyDPainter](https://pydpainter.org/) used in this project for period-correct pixel art editing

## License
This project is licensed under the GNU Affero General Public License v3.0 (only) - see the [LICENSE](LICENSE) file for details. All code is original except where indicated otherwise.

©2025 Jim Higson