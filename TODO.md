# TODO

TO RELEASE
----------
[x] remove .xml levels from project (location outside repo in env var)
[x] link to editor from home screen
    * with a warning or "in progress" messages
[3] option to load sequel or community-edited (mark as a work in progress)
    [ ] don't show on no network
    [ ] in-game saves are per-campaign, not universal
    [ ] load community campaigns
[ ] multiple savable campaigns in editor    
    - or just one, and it only loads against the campaign it belongs to
[ ] sounds - buy/licence/etc
[ ] final room - something should happen
    - will take people a while to finish
    - could just put a scroll in there
[ ] OSS licence (???)
[ ] death sound/music?

[x] plausible.io - just pay; don't self-host for now
    - or *Umami* has a free tier and is also self-hostable

Nice to have
------------
[ ] Editor autosave
[x] fix circ render bug(s) w/ masking


## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General

[ ] split integration tests up

[x] split hud/world into rendergroups: https://pixijs.com/8.x/guides/concepts/render-groups

[ ] remove size from json/room state

### head push bag, heels pushes doughnuts
[x] check #blacktooth6
    - mojos crashing into blocks should not remove them (even after switching off and back)
[x] check #bookworld2 (conveyors vanish on stand)
[x] check walking onto a disappearing block from a non-dis one (not landing on it)
    [x] #blacktooth4
[x] check (barriers vanish onTouch):
    [x] #blacktooth14 
        [x] also check head can pick up powerups, but heels just pushes them
    [x] #blacktooth77 
[x] integration test
[x] moonbase33 - check multi-item switches still work as before

# scrolling 
[ ] draggable scroll on mobile
[ ] better scrolling in general

### Big ideas

[ ] global high scores

[,XL] level editor

[,?] own levels

[3,M] switch to devcontainers
    [ ] might be more complex than needed. ie, need a container with more modern node than ms/bookworm provides

### level editor
[x] add a door
    [x] trim the walls
[x] scenery changer    
[x] 'selector' tool    
[ ] fails to add walls if not blacktooth due to scenery not existing
[ ] outline of near-facing walls (new sprite)
[ ] change wall tiles
[ ] floor type toggle
    [ ] needs floor as 1st class type
[ ] change facing direction on enemies
[x] drop-down style sub-select buttons
[ ] change room size

### menu
[ ] left-right to move selection sideways

### map
[ ] svg optimal size (fit contents exactly)

### sounds
[ ] general falling sound (for all items)
[ ] allow spot effects to continue after leaving a room
[ ] fanfare on game start
[ ] room enter short music
[NO] detect when phone has sound turned off (?)
    - can't do!
[ ] "sea-shanty" music for some items    
    - not already available in doug's remake

### graphical
use pixi render groups/layers etc to render outline when switching players in 
front of other items

### mobile
[ ] hitting hte joystick with a tap sometimes moves <1px

### dialogs
[ ] write an 'about this remake' page
    * also use as the README on github (can be same file)

### Controls

[ ] joystick/pads that declare the d-pad as axes - treat like buttons

### Details and bugs

[ ] any item landing uses same landing sound as players (by default, over-ridable)

#### floors as first class items in json:
needed:
    [x] shadows on absent 'floors' (eg #blacktooth26 )
    [x] triple rooms, 
        [x] rewrite floor json
            [x] #blacktooth17triple
            [x] #blacktooth58triple
            [x] #moonbase33triple
            [x] #safari6triple
            [x] #safari19triple
        [x] check all 
            * view aabbs in rooms to check floors are simplified now
            [x] #blacktooth17triple
                [x] gap on right
                    - only use natural size to cutoff if block is the size of the room?
                    - use to cutoff the room, not individual floors
            [x] #blacktooth58triple
            [x] #moonbase33triple
            [x] #safari6triple
                [x] gap on right too (between floors, due to mask)
            [x] #safari19triple
    [ ] dead code sweep 
    [x] sweep for all rooms whose size has been changed in a patch, look for floors whose size doesn't match any longer
    [x] extra shadow of door top 'wall'
        - see #blacktooth1head and many others
    [x] falling 'out of room'
        - needs more occlusions: 
            use #blacktooth3 to get shield and add several mojos, watch them fall out
    [x] check patch formatting in github diff
        [x] this is because prettier collapses/doesn't json lines based on if there is a return after the `{`
                - ie, there is no 'correct' formatting
        [x] fixed - patches now all consistent 
                as per branch `consistent-patch-formatting`
    [x] put floor overdraws back in: see `renderFloorOverdraws`
        [x] only for walls that need it - not over-doors
          [x] - maybe need a new item in play type here for an invisible, non-rendering cubiod block
    
    [x] floor render aabbs - track thickness of floor edge, not the whole aabb  
        thickness
         - requires offset renderAabbs
            - other things need this too to work well
    [x] check out strange shadow on floor-edge for :
        #blacktooth58triple 
        safari17fish
            (?) what is casting it?
                [x] this is cast by the doorlegs of the left-side door
                    (?) should door legs ever cast a shadow?
            [x] would be solved by floor edges as their own item
    [x] floor/back wall z-order flipping - see 
        - #moonbase32 (left wall)
        - #egyptus9fish
        - need to somehow make sure walls are rendered on top of floors always
            - except not if the floor is raised (in the editor, not in original game)
        - could be solved by extending the floor a bit at the back end to go under
          the wall (?) - would this create artifacts elsewhere?
    [x] floor edge in uncolourised mode not correct colour      
    [x] floor not always properly extended
        #blacktooth17triple - two left-facing doors
        #egyptus11 - left edge
            - fall out of world if cheat-clicking from #egyptus12
    [x] floor tiles out of phase with original game
        (see map.png to compare)
        #blacktooth1head
        #blacktooth17triple
        - still lines up ok in #moonbase33triple

[ ] css upscale can be 0.5 (less than 1) 
    - this seems wrong any time browser window > emulated resolution.
    - Write tests for all ranges/cases want to cover

[ ] make FS/OSS (again)

[ ] helpful sliding on all blocks, not just doors
    (if can't push and overlap is small)
    probably can be done generically in moveItem ?
    - would get for free with cylindrical BBs

[ ] allow jump-by carry-and-jump

[ ] make a dedicated TextRenderer for the hud that doesn't recreate the container and sprites so much

[ ] check: does variable speed walking anim work in symbio?

[ ] remove event bus from gamestate (use store instead)

[ ] custom serviceworker    
    [ ] adopt a network-first strategy: 
        https://vite-pwa-org.netlify.app/workbox/inject-manifest#network-first-strategy

[ ] restore known-id typings at src/model/RoomState.ts - `origin/experimental-well-known-ids`

[x] charles robot no longer needs to use latent movement

[ ] doughnut white fade can be shown under walls - try firing at left wall in start room for example
    - maybe the doughnut explosion is slightly inside the wall?

[ ] wall over doors not variable height like other walls

[ ] hold a button to lock to axes

[ ] add lowres setting (like outline filter) to all filters and use when appropriate - ie anything that
    doesn't need between-pixel rendering

input tracker:
    [ ] treat d-pad-as-axes input correctly for buffering

[x] allow stopping on diagonals
    [x] for keys/buttons
    [ ] for d-pads that report as axes

[ ] special names for some rooms (makes easier to find)

[?] move more state to the store?
    [ ] is easier to render with react
    [ ] reducers are nice
    [ ] fast enough foreverything except room state
    cons:    
    [ ] in testing, easier for state to leak between tests since the store is universal        
    [ ] tests can't run in parallel if they need the store, unless I come up with something clever to manage that 
        - really, want a new store per-test = store can't be a singleton
        - in react-redux, can just use a new provider
        - would have to change *all* direct use of the store
        - would probably have to put the store instance on GameState or pass both around together
    [ ] move items collected into redux store, and show % on final screen 
    - this is selected from in tests, so would need store to be non-singleton maybe

[ ] several rooms change the default height of 11 - is the defualt just wrong?

[ ] re-org into a mono-repo
    - @hohjs/gameEngine = everything while the game is running
    - @hohjs/main = main site
    - @hohjs/campaign = conversion and export of the main campaign
    - use `vite-plugin-inspect` to check why pixi is being brought into main index (first load)

carrying (maybe( bugs: 
    [ ] carrying rules are slightly wrong/different from original:
        * original: carrying state belongs to the room
        * remake: carrying state belongs to heels and is cleared on leaving room
        * if heels leaves and comes back, item should be back in the bag
        * heel's pickups don't show when not in the room heels is in    
        * only resets on death if the *room* is reloaded
    [fixed] can duplicate items:
        * hoh does while carrying
        * spawns back into room and still carrying
    [ ] can delete items:
        * heels picks up while head in room
        * heels dies
        * item gone forever!
    [x] this might be fine


[ ] write test - 
    collect scroll in room
    go to next room with same scroll
    scroll is not in the next room
    !THIS NEEDS STORE TO NOT BE A SINGLETON!

[ ] repeat moving on scrolls etc (hold to keep scrolling) + analogue control    


[ ] rendering bugs: handle z index of overlapping aabbs - may require some thinking!
    [ ] then use small aabb for collision, medium for rendering - for player 
    [ ] ball needs a bigger render aabb


[ ] bug: main index loads pixi
    [?] (maybe) just for the Color class in the hint colors - let's not do that!    
        - nope, nothing calls the Color constructor on initial load
    look into: https://www.npmjs.com/package/madge https://www.npmjs.com/package/dependency-cruiser
    - we now use the ticker, but could load just @pixi/ticker
[ ] auto-resolution on big rooms    
    - just use whatever scale factor fits the room in?
    - remove blurryness in general - replace css scaling with pixijs resolution setting
[ ] iter-tools brings in `@babel/runtime` = not good!
    - maybe drop it
    
[ ] checkerboard shadows when not colourising    
[ ] (maybe) option to turn shadows off
[ ] upgrade to tw 4

[ ] shadow masks/cast provided by appearance
    [ ] allow to be dynamic

[ ] option to turn off extra items

[ ] ELERI cheat

translate: https://hoh.helmantika.com/jon-ritman/

```
// behavour to 'smooth' without ruining the appearnce to scroll immediately (maybe instant first time)
.scrollTo({
        top: newScrollTop,
        behavior: "instant",
      });
```

[ ] room floor edge with attribute clash (needs a clash pixel shader)

# Rooms
[ ] blacktooth14 - render issues with barriers z-order

# blacktooth20
[ ] [MINOR] corner of room not shown in shadow

# (heels) blacktooth35
[ ] room positioning (scrolling) on screen is poor

# (heels) blacktooth42
push spring in front of head - as it gets pushed it can phase in and out
of existence

# egyptus12, others(?)
[ ] sandwich with SOF on it seems to move him double
    * can't reproduce - seen on rasp pi
        * maybe only at low frame rates?
[ ] SOF can land on joysticks
    * this is good because can skip pushing the sandwich

# egyptus16    
[ ] blocks shown over player when in doorway
    [x] fixed by splitting these blocks manually in json
    [ ] BUT! better solution would probably be to auto-break up multiplied blocks that do this

# egyptus34fish
[ ] ball clips poorly when pushed all the way away

# penitentiary2
[ ] this room shouldn't scroll horizontally

# moonbase33triple
[x] doesn't scroll in y
    [ ] does but scrolling is poor

# finalroom
    [ ] in space of lives, should say FREEDOM in hud


Audio
=====

musicxml for game music: https://github.com/dougmencken/HeadOverHeels/blob/master/gamedata/music/safari.xml
musicxml player in browser: https://blog.karimratib.me/demos/musicxml/

g