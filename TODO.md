# TODO

## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General


[ ] bug: can make a character fall off the world if on top of other character while they go through a portal
    [?] or push through door by other char?
    [?] should portals only work for the current char/
    [?] make portals solid?    
[ ] limit maximum scale factor (maximum resolution to render to) to 4x or so, and scale in css past that
    - the game stops running as smoothly past a certain size with crt filter on    
    - on unscaled 4k , get: `changing upscale to 11x for 3840 x 2160`
[ ] colourise option should actually work (and switch in first room)
[ ] load game initially shows menu, with game not started
[ ] custom key assignments
[ ] actually use joystick/control pad input
[ ] why doesn't work in Safari/iOS?
[ ] sonic-like shield effect when got shield    
    [?] sunglasses?
[ ] collecting crowns (and screen)
[ ] put menus/dialogs through pixijs rendering pipeline (hidden canvas trick)
[ ] shadow masks/cast provided by appearance
    [ ] allow to be dynamic
[ ] option to turn off extra items should work
[ ] ELERI cheat

[ ] tailwind plugin for blocky text (scrolls/menus/etc)
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
