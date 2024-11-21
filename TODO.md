# TODO

[x] Dump map data xml
_ [tool to dump map data](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Fdougmencken%2FHeadOverHeels%2Ftree%2Fmaster%2Fgamedata%2Fmap)
_ Game data at: [HOH remake](https://github.com/dougmencken/HeadOverHeels/tree/master/gamedata/map) \* With layout overall at: [map.xml](https://github.com/dougmencken/HeadOverHeels/blob/master/gamedata/map/map.xml)
[ ] Convert original game map data xml to json (and a nicer format)

[x] render a black rectangle "game space" using pixi
[x] render a single floor tile from a sprite in sprites.png
[x] render a single, empty room to a web page
_ blacktooth
_ floor and walls
_ just one wall type
impl:
_ use spritesheets for graphics - https://pixijs.download/release/docs/assets.Spritesheet.html

[x] render all planets
[x] render a door
[x] plus the extra space in the room for it  
[x] render doors on all sides

[x] pixelated blanker sprites for edges of floor

[x] convert basic room xml to Room typescript type:
[x] planet
[x] dimensions
[x] floor type
[x] room colour
[x] wall graphics

[x] add level selector dropdown
[ ] parseInt from xml earlier and remove many parseInt calls!  
 _ nice, but processing is all offline, so it's just ugly, not harmful to play
_ find/write a new xml parser is probably the way
[x] prettier
[x] render supports under doors with z!=0

[x] load items into their pixel locations
[x] render based on pixel locations

[x] base z-index off the top of objects using their bounding boxes

[x] support stacked sprites

[x] investigate rooms:
moonbase12 - puppies seem to go nowhere!

Game engine
[x] init mutable game state based off of room on entering a room

Reading: https://pikuma.com/blog/isometric-projection-in-games#:~:text=A%202%3A1%20ratio%20can,to%20move%201.732%20pixels%20vertically.

[x] first room blacktooth1head:
[x] door-slide walking
[x] pixelated walking
[x] collected bunnies don't poof again when switching character back after collecting them
[x] every item now has an expiry on its state

[x] BUG: head can't get into ladders on the way up (only on way down) - except on high refresh rate screens

## General

[x] standing on is not sticky any more - fix and test
[ ] heels should fall vertically after jump is done  
[ ] jumpEndTime will be wrong after dying - wil think we already finished the jump since game time has spun on

# Rooms

# blacktooth11
[x] currently has 238 front/back relationships when rendering - reduce this!
    * 204 with hexagon-based overlap calcs (- ~15%)
[ ] has the wrong floor - should be dots!    

# blacktooth4 -> 3

[x] lift doesn't correctly take us up

# blacktooth25

[x] lift is too slow when character is on it
[x] shows falling sprite while on the lift
[x] can't jump off the lift

# blacktooth26

[x] leaves room as soon as entered - because we appear _inside_ the lift FFS!

# (heels) balcktooth27fish

[x] fish not collectable
[x] can't push anvil  
[ ] can't use bag for drum

# (heels) blacktooth28

[2] can't move charles
[1] cyclic rendering order while walking around joystick
[ ] no hud for bag

# (head) blacktooth6

[ ] donuts not collectable
[ ] switch doesn't work
[ ] disappearing block doesn't vanish on touch
[ ] also doesn't turn off
[ ] dalek baddie doesn't move

# (head) blacktooth8fish

[ ] legs on far side not rendered correctly
