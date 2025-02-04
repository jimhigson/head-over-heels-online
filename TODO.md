# TODO

## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General


[ ] bug: can make a character fall off the world if on top of other character while they go through a portal
    [?] or push through door by other char?
    [?] should portals only work for the current char/
    [?] make portals solid?    



[ ] why doesn't work in Safari/iOS?
[ ] bug: pressing return to start a game (or exit crowns screen) shouldn't immediately switch to heels
    - can fix this (I think) by ignoring input while game speed is zero

[ ] replace vignette with a transparent texture etc
[ ] re-org into a mono-repo
    - @hohjs/gameEngine = everything while the game is running
    - @hohjs/main = main site
    - @hohjs/campaign = conversion and export of the main campaign
    - use `vite-plugin-inspect` to check why pixi is being brought into main index (first load)



[ ] bug: main index loads pixi
    [?] (maybe) just for the Color class in the hint colors - let's not do that!    
        - nope, nothing calls the Color constructor on initial load
    look into: https://www.npmjs.com/package/madge https://www.npmjs.com/package/dependency-cruiser
    - we now use the ticker, but could load just @pixi/ticker
[ ] bug - if pushed out of a room while player is dying, their entry state contains death
    - fix - make players non-solid while state is death      
[ ] show FPS counter as an option (lean on pixi to give fps)    
[ ] auto-resolution on big rooms    
    - just use whatever scale factor fits the room in?
    - remove blurryness in general - replace css scaling with pixijs resolution setting
[ ] colourise option should actually work (and switch in first room)
    [x] works in menus (only)
    [x] for hud
    [x] for game (one shade)
    [x] for room edges
[ ] change from `pixi.js` package to `@pixi/*` packages
    Import from **`pixi.js`** for a bundled version.  
        https://chatgpt.com/c/679cecd2-71a0-8007-b3dc-2166e61c75b7
[ ] checkerboard shadows when not colourising    
[ ] (maybe) option to turn shadows off
[ ] allow to click on crowns screen (and others) to move past it (since can get there with the mouse via menus)
[ ] compare against original for how far player can edge up on a block
[ ] upgrade to tw 4
[ ] tailwind - zx class to do dimmed on fg and bg in one
[ ] remove radix form dialogs - isn't really doing much for us!
[ ] show some stats in game over menu - at least
    [ ] score (???)
    [ ] rooms explored 
    [x] planets liberated
[ ] sonic-like shield effect when got shield    
    [?] sunglasses?
[NO] put menus/dialogs through pixijs rendering pipeline (hidden canvas trick)
    - not possible, and initial load is faster without pixi anyway
    [ ] no way to capture pixels from html - will need some experimentation, maybe with a transparent pixi overlay
[ ] shadow masks/cast provided by appearance
    [ ] allow to be dynamic
[ ] option to turn off extra items should work
[ ] ELERI cheat

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

# blacktoothhead1
[ ] colourise on/off switch should work

# blacktooth20
[ ] [MINOR] corner of room not shown in shadow

# blacktooth25
[ ] fall off lift when heading up if not near its centre

# blacktooth29
[ ] when on lift, monster turns around too quickly

# (heels) blacktooth35
[ ] room positioning (scrolling) on screen is poor

# blacktooth45market
[ ] can walk onto and stand on powerup without collecting it
    - remove dissapearing block but fall onto other block
    - walk on top of rabbit

# pen 4/8 egyptus 13/14/19
[ ] seems like the ceiling isn't high enough? - too easy to jump into room above by mistake

# egyptus12    
[x] lift doesn't lift charles up

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