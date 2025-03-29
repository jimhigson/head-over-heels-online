# Head over heels remake in js

[see work in progress](https://blockstack.ing/)

Differences from the original
=============================
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

- Room data forked from [Doug Mencken's remake](https://github.com/dougmencken/HeadOverHeels/tree/master/gamedata) (I converted xml -> json)
- [sprite rips from Spriters Resource](https://www.spriters-resource.com/zx_spectrum/headoverheels/) of original artwork by [the late](https://www.theregister.com/2021/11/17/rip_bernie_drummond/) Bernie Drummand.
- Palette swap effects (this is what puts it back into the original zx-spectrum colour palette when the game starts) ([source][./src/filters]) based on GLSL pixel shader fragments forked from [here](https://github.com/pixijs/filters/blob/main/src/color-replace/ColorReplaceFilter.ts)