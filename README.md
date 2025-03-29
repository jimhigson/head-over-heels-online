# Head over heels remake in js

[see work in progress](https://blockstack.ing/)

Differences from the original
=============================

Colourisation
-------------

I've kept the sprites as true to the original as was practical,
and kept their original resolution. All the black pixels have been
kept from the two-colour graphics, and I've just filled in the
light pixels:

![2tone] ![colourised]
(several examples)

All colourisation is to a 16 colour pallette. I wanted to restrict myself
to graphics that were plausibly creatable for hardware available in the 
game's commercial lifetime.

![pallette]

Unlike the original, the sprites are not mirrored, so that I can
apply lighting from a consistent direction. The sprites come to about 55k in total, as a single 640x512 (Amiga original chipset "Hires") PNG.

All graphics edited on an emulated Amiga 4000 using FS-UAE. Converted from iff to png using ffmpeg.

With that 16 colour graphics, I apply some palette swap tricks (emulated
with pixel shaders since indexed graphics aren't a thing any more) to
hint at the zx spectrum's monocrhome per-room colours.

This room is magenta:
![original magenta]

The same room, with magenta highlights
![room with magenta highlights]

8-way control
-------------
![8-way sprites]

Frame Rate
----------

The original game ran at 12fps, which doesn't work for modern gamers. The remake's frame rate is unbounded, and it runs at 120fps or more on modern hardware (limited only by the monitor refresh rate). However, high frame rates mean a few compromises:

* The game can render sprite *between* the squares on the pixel grid. To make this not too obvious, when items stop moving they get snapped to the grid.

Shadows
-------
[Amiga extra halfbright](https://amiga.lychesis.net/articles/ExtraHalfBright.html)

As well as looking good, they actually make the rooms easier, since you can see where you are.

Room changes
------------

Quite a lot of rooms have been changed while keeping the original gameplay intact.

* This is to remove unfair deaths (death possible when entering room for no fault of the player)

![screenshot](before) ![screenshot](after)

Spikes
------

In the remake, this item is safe to touch from the sides, but not from the top. Consistent with how they look visually, and otherwise there's several items that
differ in appearance while working exactly the same. Gives a bit more vocabulary to
item designers.

![spikes](spikes)

Invincibility
-------------

To avoid infinite death loops (ie, entering a room and dying repeatedly because there's a monster in the doorway), the player gets a few seconds of invincibility after dying. This is shown by a flash in the player sprite.

Credits


- Reference Room data forked from [Doug Mencken's remake](https://github.com/dougmencken/HeadOverHeels/tree/master/gamedata) (I converted xml -> json)
- Some audio files also from the above
- [sprite rips from Spriters Resource](https://www.spriters-resource.com/zx_spectrum/headoverheels/) of original artwork by [the late](https://www.theregister.com/2021/11/17/rip_bernie_drummond/) Bernie Drummand.
- Palette swap effects (this is what puts it back into the original zx-spectrum colour palette when the game starts) ([source][./src/filters]) based on GLSL pixel shader fragments forked from [here](https://github.com/pixijs/filters/blob/main/src/color-replace/ColorReplaceFilter.ts)

Technology used
===============

* Pixijs - all in-game rendering
* React - menus and dialogs
* Audacity - sound editing, cleanup etc

Credits
=======

