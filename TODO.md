# TODO

## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General

### Big ideas
[ ] add sound to the game
    * start small:
        1 start game sound
        2 walking sound w/repeat frequency by number of stepsh

[ ] 8-way sprites

[ ] level editor

[ ] own levels

### Details ad bugs

[ ] several rooms change the default height of 11 - is the defualt just wrong?

[ ] bug: can make a character fall off the world if on top of other character while the go through a portal
    [?] or push through door by other char?
    [?] should portals only work for the current char/
    [?] make portals solid?    

[x] firefox bug: manuals (and really any multi-line blocky text) shows poorly in firefox
    * this is because `text-wrap` on words causes FF to not wrap not just the word, but
    also to not wrap between them
    * if words are display: inline-block this seems to somewhat fix it

[ ] replace vignette with a transparent texture etc
[ ] re-org into a mono-repo
    - @hohjs/gameEngine = everything while the game is running
    - @hohjs/main = main site
    - @hohjs/campaign = conversion and export of the main campaign
    - use `vite-plugin-inspect` to check why pixi is being brought into main index (first load)

carrying bugs: 
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

[ ] write test - 
    collect scroll in room
    go to next room with same scroll
    scroll is not in the next room
    !THIS NEEDS STORE TO NOT BE A SINGLETON!

[ ] split store into slices:
    * game
    * menus
    * user settings

[ ] bug - in the lab collect bunny, stand on volcano, wait for bunny to expire
    - crash because head doesn't have a renderer

[ ] repeat moving on scrolls etc (hold to keep scrolling) + analogue control    

[ ] handle z of overlapping aabbs - may require some thinking!
    [ ] then use small aabb for collision, medium for rendering - for player 
    [ ] ball needs a bigger render aabb

[ ] bug? - both chars in room, heels picks up portable block; heels leaves - what should happen to the block?
    - check against original
[ ] bug: main index loads pixi
    [?] (maybe) just for the Color class in the hint colors - let's not do that!    
        - nope, nothing calls the Color constructor on initial load
    look into: https://www.npmjs.com/package/madge https://www.npmjs.com/package/dependency-cruiser
    - we now use the ticker, but could load just @pixi/ticker
[ ] bug - if pushed out of a room while player is dying, their entry state contains death
    - fix - make players non-solid while state is death      
[ ] auto-resolution on big rooms    
    - just use whatever scale factor fits the room in?
    - remove blurryness in general - replace css scaling with pixijs resolution setting
[ ] iter-tools brings in `@babel/runtime` = not good!
    - maybe drop it
    
[ ] change from `pixi.js` package to `@pixi/*` packages
    Import from **`pixi.js`** for a bundled version.  
        https://chatgpt.com/c/679cecd2-71a0-8007-b3dc-2166e61c75b7
[ ] checkerboard shadows when not colourising    
[ ] (maybe) option to turn shadows off
[ ] compare against original for how far player can edge up on a block
[ ] upgrade to tw 4
[ ] original game had a score - how to calculate/reproduce this?
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

# Menus
[ ] css grid layout or similar for menu items
    - should allow multi-line, eg when a loy of keys mapped

# Rooms

# blacktooth20
[ ] [MINOR] corner of room not shown in shadow

# (heels) blacktooth35
[ ] room positioning (scrolling) on screen is poor

# egyptus34fish
[ ] ball clips poorly when pushed all the way away

# safari35
[ ] [MINOR] sandwich should fall in the gap between blocks

# penitentiary2
[ ] this room shouldn't scroll horizontally

# moonbase33triple
[x] doesn't scroll in y
    [ ] does but scrolling is poor
[ ] monsters don't wake up
[x] hidden wall shouldn't render
[ ] render extra floor edge

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