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

## Questions
[ ] do we really need to track stoodOn?
    * used in original for: 
        1: if a deadly block is below the player, for standing on a block safetly next to a deadly overlapping it
            - could reduce height of deadlies by 1px            
                - but then would impact Charles riding on volcanos            
            [ ] could make bbs more accurately follow the volcano shape
            - also a problem if standing on a block to escape a baddie - the block should protect
                - even if it wasn't first in the sort order!
                    ❓ collide (and slide with) all blocks first?
                        - then with baddies etc?
        2: which conveyor moves the player:
            - could make conveyors act in proportion to how much overlap
            - one conveyor at at time, but work out which is 'first' isn't too hard
        3: which teleporter the user uses
            - could just flash >1 when stood on two, they always go to the same place
        4: (maybe) getting preference in sliding order when order otherwise equal
            - could go off amount of overlap
        5: what heels picks up
            - more overlap
                - 👍 more intuitive
    * standingOn could also be an array
        - sorted in order of amount of overlap
        - this would only be an optimisation - would also be possible to find on-demand functionally

        
## General

[x] playables not rendering until first move

# Rooms

# (heels room 4) blacktooth26

[x] leaves room as soon as entered - because we appear _inside_ the lift FFS!
[x] conveyor motion does not work well

# (head room 5) blacktooth6

[x] dalek baddie doesn't move
[x] switch doesn't work
[x] disappearing block doesn't vanish on touch
[x] can't jump on disappearing block for a frame while it vanishes
[x] donuts don't do anything when collected - no hud

# (head) blacktooth8fish
[ ] legs on far side not rendered correctly
[ ] fish solid after connected
[ ] baddie can kill player when player on spring

# blacktooth10
[ ] overdraw on far door not showing - renders floor behind the door

# blacktooth11
[x] currently has 238 front/back relationships when rendering - reduce this!
    * 204 with hexagon-based overlap calcs (- ~15%)
[x] has the wrong floor - should be dots!    

# blacktooth18
[ ] block doesn't push on top of american football head - it slides him(!)

# blacktooth19
[ ] pushing bottom block doesn't move the whole stack

# blacktooth4 -> 3

[x] lift doesn't correctly take us up

# blacktooth25

[x] lift is too slow when character is on it
[x] shows falling sprite while on the lift
[x] can't jump off the lift

# (heels) balcktooth27fish

[x] legs on right render issue
[x] fish not collectable
[x] can't push anvil  
[x] can't use bag for drum
[ ] fish collected when shouldn't be (standing under it)
[ ] dum doesn't move when anvil pushed

# (heels) blacktooth28

[x] can't move charles
[x] cyclic rendering order while walking around joystick
[x] no hud for bag

# (heels) blacktooth29
[ ] cyberman moves like a dalek

# (heels) balcktooth35
[ ] level overlaps hud

# (heels) balcktooth37
[ ] football heads don't move right

# blacktooth61
[ ] hush pupplies not vanishing on head enter

# moonbase8
[ ] charging cyberman not still
    - rename 'charging' in config to 'activated' and copy direct from config to state

# egyptus12    
[x] lift doesn't lift charles up

# egyptus13
[ ] lift is weirdly slow - maybe becuse it doesn't start at zero?


Problems with force/accel based model:
* players feel slippery/not true to original, or they feel just the same as before
* jumping in a small gap is tricky - when you jump, you lose all upwards velocity on hitting the ceiling - fails to reproduce the original games' weird physics.
    - doesn't 'store' the upwards jump to release when out of the gap
* very hard to make sliding collision get player into gaps since their x/y velocity sliding up on the barrier is very low, so they're hardy overlapping the barrier in x/y
* (probably) could store walking velocity in same way as did x/y just for slow startup (but this would also mean
no getting into gaps) - unless the startup didn't care about bumping into things and was based purely on when the user
input started (basically, sensitivity)

Pros:
* jumping, gravity etc are trivial now
* easy to 'edge up' by single pixels
* was already tracking zVelocity (for jumping), but not x/y/z - jumping set (redudantly) the zVel and gave a state delta - could have given either/or - is more consistent. Could probably store velocity just for walkin