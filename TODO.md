# TODO

## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General

[ ] error catch/reporting + option to refresh

### Big ideas
[2,L] add sound to the game
    * start small:
        1 start game sound
        2 walking sound w/repeat frequency by number of stepsh

[ ] saving/fish
    [ ] save on reload page/app close
        - mostly works but Number.POSITIVE_INFINITY, NEGATIVE_INFINITY etc is breaking it (can't be serialised to JSON)
            - both are used
        - does not restore anything to the store on reload ("planetsLiberated", "scrollsRead")

[x] 8-way sprites

[,XL] a map
    [ ] a mini-map

[,XL] level editor

[x] iphone playable    

[,?] own levels

[3,M] switch to devcontainers
    [ ] might be more complex than needed

[ ] switch to OOP on room state/items etc. 
    Eg polymorphism: .isPushable() etc methods
    Eg, .times() hardcoded to return 1,1,1 for most

[ ] custom serviceworker    

### ui
[x] game ui colours when colourised from real palette (even if not close to original colours)

### graphical
use pixi render groups/layers etc to render outline when switching players in 
front of other items

### mobile
[ ] hitting hte joystick with a tap sometimes moves <1px

### menus
[x] control menus - allow different column width for non-select keys options
    (multiple <MenuItems /> components)

### Controls

[ ] joystick/pads that declare the d-pad as axes - treat like buttons
[x] 8-way mode (make default on touch devices)


### Details and bugs

[ ] check: does variable speed walking anim work in symbio?

[ ] remove event bus from gamestate (use store instead)

[ ] adopt a network-first strategy: 
    https://vite-pwa-org.netlify.app/workbox/inject-manifest#network-first-strategy

[ ] restore known-id typings at src/model/RoomState.ts - `origin/experimental-well-known-ids`

[ ] charles robot no longer needs to use latent movement

[ ] version number/date on main menu dialog

[ ] doughnut white fade can be shown under walls - try firing at left wall in start room for example
    - maybe the doughnut explosion is slightly inside the wall?

[ ] wall over doors not variable height like other walls

[ ] destroy and recreate hud renderer when display settings change (like room renderer is) - this way
    it can not care about colourisation (or anything else) changing when it ticks

[ ] include version number on main menu screen

[ ] bug - need to refresh page after changing input preset
    - sometimes?

[ ] put text in for search engines etc

[ ] hold a button to lock to axes

[ ] add lowres setting (like outline filter) to all filters and use when appropriate - ie anything that
    doesn't need between-pixel rendering

[x] input buffering on start to move

[x] consolidation

input tracker:
    [ ] analogue/digital input as overloading/polymorphism in input tracker
    [ ] treat d-pad-as-axes input correctly for buffering



[x] split campaign patch up per-room

[x] allow stopping on diagonals
    [ ] for keys/buttons
    [ ] for d-pads that report as axes

[ ] write an 'about this remake' page

[ ] special names for some rooms (makes easier to find)

[x] turn around without moving for small presses (round down to zero, not up to one)

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

[ ] replace vignette with a transparent texture etc
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
    [ ] this might be fine


[ ] write test - 
    collect scroll in room
    go to next room with same scroll
    scroll is not in the next room
    !THIS NEEDS STORE TO NOT BE A SINGLETON!

[ ] split store into slices:
    * game
    * menus
    * user settings

[x] bug - in the lab collect bunny, stand on volcano, wait for bunny to expire
    - crash because head doesn't have a renderer

[ ] repeat moving on scrolls etc (hold to keep scrolling) + analogue control    

[ ] handle z of overlapping aabbs - may require some thinking!
    [ ] then use small aabb for collision, medium for rendering - for player 
    [ ] ball needs a bigger render aabb


[ ] bug: main index loads pixi
    [?] (maybe) just for the Color class in the hint colors - let's not do that!    
        - nope, nothing calls the Color constructor on initial load
    look into: https://www.npmjs.com/package/madge https://www.npmjs.com/package/dependency-cruiser
    - we now use the ticker, but could load just @pixi/ticker
[x] bug - if pushed out of a room while player is dying, their entry state contains death
    - fix - make players non-solid while state is death      
[ ] auto-resolution on big rooms    
    - just use whatever scale factor fits the room in?
    - remove blurryness in general - replace css scaling with pixijs resolution setting
[ ] iter-tools brings in `@babel/runtime` = not good!
    - maybe drop it
    
[ ] checkerboard shadows when not colourising    
[ ] (maybe) option to turn shadows off
[ ] compare against original for how far player can edge up on a block
[ ] upgrade to tw 4
[ ] sonic-like shield effect when got shield    
    [?] sunglasses?
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

[ ] re-load and re-render room on HMR: https://vite.dev/guide/api-hmr.html
[ ] room floor edge with attribute clash, hud in original colours

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

# egyptus35
[x] ceiling too low/room too easy (don't need both blocks/players)

# penitentiary2
[ ] this room shouldn't scroll horizontally

# moonbase33triple
[x] doesn't scroll in y
    [ ] does but scrolling is poor
[x] monsters don't wake up
    - see https://www.youtube.com/watch?v=PdRuvdvLbjg&t=3782s
[x] hidden wall shouldn't render
[x] render extra floor edge

# finalroom
    - in space of lives, should say FREEDOM in hud


Audio
=====

musicxml for game music: https://github.com/dougmencken/HeadOverHeels/blob/master/gamedata/music/safari.xml
musicxml player in browser: https://blog.karimratib.me/demos/musicxml/


Level ideas
===========
[ ] have to shoot a switch with donuts
[ ] have to make monster touch joystick




  • Circular Dependencies
  1) src/game/components/dialogs/menuDialog/menus.tsx -> src/game/components/dialogs/menuDialog/menus/inputPresetMenu.tsx -> src/game/components/dialogs/menuDialog/MenuItems.tsx -> src/store/menuSelectors.ts
  2) src/store/store.ts -> src/store/storeFlow/addListeners.ts -> src/game/components/dialogs/menuDialog/menus.tsx -> src/game/components/dialogs/menuDialog/menus/inputPresetMenu.tsx -> src/game/components/dialogs/menuDialog/MenuItems.tsx -> src/game/components/dialogs/useActionInput.ts -> src/game/input/InputStateProvider.tsx -> src/game/input/InputStateTracker.ts
  3) src/store/store.ts -> src/store/storeFlow/addListeners.ts -> src/game/components/dialogs/menuDialog/menus.tsx -> src/game/components/dialogs/menuDialog/menus/inputPresetMenu.tsx -> src/game/components/dialogs/menuDialog/MenuItems.tsx
  4) src/store/store.ts -> src/store/storeFlow/addListeners.ts -> src/game/components/dialogs/menuDialog/menus.tsx -> src/game/components/dialogs/menuDialog/menus/selectKeysMenu.tsx
  5) src/game/physics/moveItem.ts -> src/game/physics/handleTouch/handleItemsTouchingItems.ts -> src/game/physics/handleTouch/handlePlayerTouchingJoystick.ts