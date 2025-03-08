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

[x] 8-way sprites

[,XL] a map
    [ ] a mini-map

[,XL] level editor

[1,L] iphone playable
    * on-screen keyboared
    * tap on hud to change character    

[,?] own levels

[3,M] switch to devcontainers

[ ] switch to OOP on room state/items etc. 
    Eg polymorphism: .isPushable() etc methods
    Eg, .times() hardcoded to return 1,1,1 for most

### ui
[ ] game ui colours when not colourised from real palette (even if not close to original colours)

### mobile
[x] "turn to landscape" screen
[x] remove address bar in normal browser
    maybe helpful? https://stackoverflow.com/questions/5206811/hide-iphone-address-bar-with-100-height - although very old!
    - can't but can do as a PQA
[x] allow use as a PWA
[x] hud input controls (only on phone)
[x] back button on menus
[x] menu button while playing
[x] control options - don't show keys etc, or hide behind a collapse and an explanatory banner
[x] text larger in dialogs - probably by increasing the scale size inside dialogs
[ ] hitting hte joystick with a tap sometimes moves <1px

### menus
[ ] control menus - allow different column width for non-select keys options
    (multiple <MenuItems /> components)

### Controls

[ ] joystick/pads that declare the d-pad as axes - treat like buttons
[ ] 8-way mode (make default on touch devices)


### Details and bugs

[ ] doughnut white fade can be shown under walls - try firing at left wall in start room for example
    - maybe the doughnut explosion is slightly inside the wall?

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
    [ ] fix all patches that no longer apply
        [x] blacktooth23 heels
        [x] bookworld28 - needs artificial blocks putting back
        egyptus14
        egyptus20
        pen2
        pen13 - needs a second dissapearing block putting in
    [x] check all rooms with a diff in their patch against deployed version
    [x] conveyors don't load correctly(check #blacktoothheels1) - probably also hush puppies (check blacktooth63) and others
    [x] toaster bbs not correct (check http://localhost:5173/?cheats=1#moonbase1)
    [x] volcano bbs not correct (check http://localhost:5173/?cheats=1#moonbase4)
    [x] #blacktooth74 
        - [x] no multiplied shadows
        - [x] threshold shadow mask is wrong
    [ ] part 2
        [x] remove 'walls' property from json, walls are normal object
        [x] consolidation can consolidate walls with different configs
        [x] walls renderer can do multiple different textures
        floor appearance: 
            [ ] put floor overdraws back in (in floor appearance)
            [ ] fix overdraw for triple/non-rectangular rooms: `floorOverdrawForExtraWalls`
        [x] check rooms:
            [x] blacktooth85 (wall tiles)
            [x] egyptus14 (wall tiles)
            [x] egyptus13 (wall tiles)
            [x] egyptus19 (wall tiles)
            [x] egyptus20 (wall tiles)
            [x] egyptus35 (wall tiles)
            [x] pen13
            [x] pen2
            [x] pen30
            [x] blacktooth11 = no wall shadows for near-walls


input tracker:
    [ ] analogue/digital input as overloading/polymorphism in input tracker
    [ ] treat d-pad-as-axes input correctly for buffering

[ ] version number/date on main menu dialog

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
[ ] monsters don't wake up
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