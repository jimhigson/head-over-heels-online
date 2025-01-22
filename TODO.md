# TODO

## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General


[ ] bug: can make a character fall off the world if on top of other character while they go through a portal
    [?] or push through door by other char?
    [?] should portals only work for the current char/
    [?] make portals solid?    
[ ] actually use joystick/control pad input
[x] persist settings
[ ] quit game option in menu (if playing)
[ ] lives option
[x] collecting crowns (and screen)
[ ] bug: pressing return to start a game shouldn't immediately switch to heels
[ ] replace vignette with a transparent texture etc
[x] load game initially shows menu, with game not started
    [ ] load campaign lazily
[ ] colourise option should actually work (and switch in first room)
[ ] why doesn't work in Safari/iOS?
[ ] sonic-like shield effect when got shield    
    [?] sunglasses?
[ ] put menus/dialogs through pixijs rendering pipeline (hidden canvas trick)
    [ ] no way to capture pixels from html - will need some experimentation, maybe with a transparent pixi overlay
[ ] shadow masks/cast provided by appearance
    [ ] allow to be dynamic
[ ] option to turn off extra items should work
[ ] ELERI cheat

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

Audio
=====

musicxml for game music: https://github.com/dougmencken/HeadOverHeels/blob/master/gamedata/music/safari.xml
musicxml player in browser: https://blog.karimratib.me/demos/musicxml/


Level ideas
===========
[ ] have to shoot a switch with donuts
[ ] have to make monster touch joystick
