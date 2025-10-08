# Changelog

## [1.1.1](https://github.com/jimhigson/head-over-heels-online/compare/v1.1.0...v1.1.1) (2025-10-08)


### Bug Fixes

* update editor ui to properly use upper/lower case characters ([#524](https://github.com/jimhigson/head-over-heels-online/issues/524)) ([3ff70a2](https://github.com/jimhigson/head-over-heels-online/commit/3ff70a255efaa03cae5a6d360122f7d44506b8b1))

## [1.1.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.0.0...v1.1.0) (2025-10-07)


### Features

* add lowercase letters to spritesheet/font ([#514](https://github.com/jimhigson/head-over-heels-online/issues/514)) ([ec90d1e](https://github.com/jimhigson/head-over-heels-online/commit/ec90d1e09cdb45b2c4a27d5f98cd9d6d32ff4e74))
* make some menu items always double-height text to clean up the dialogs ([#522](https://github.com/jimhigson/head-over-heels-online/issues/522)) ([33d07f1](https://github.com/jimhigson/head-over-heels-online/commit/33d07f17b4db634226842a59e3f88215c4a5ef0f))
* separate keys and controller inputs on controls binding dialog ([#517](https://github.com/jimhigson/head-over-heels-online/issues/517)) ([3b2dc7a](https://github.com/jimhigson/head-over-heels-online/commit/3b2dc7add2f87ccc48c28eb05a819204cecda3e9))

## 1.0.0 (2025-10-06)


### Features

* add black point manipulation to crt emulation mode ([#497](https://github.com/jimhigson/head-over-heels-online/issues/497)) ([3f201f5](https://github.com/jimhigson/head-over-heels-online/commit/3f201f5bf5e8d7267e7b75025cbe40d8c3317aff))
* disabled hud icons now appear as fully grey, with blue/pink colour highlights as an exception for the character icons (when the character is not selected) ([#498](https://github.com/jimhigson/head-over-heels-online/issues/498)) ([bc9827f](https://github.com/jimhigson/head-over-heels-online/commit/bc9827f419ec658631d6ba1bab556e727f60a6a1))
* helpful sliding (like when walking into doorframes) now works for collisions against an unmoving item - this helps avoid getting snagged on items when walking in rooms, if the player just barely catches on the item. It is not applied while ascending in a jump, or this makes it harder to jump on top of items &lt;video src=gfx/screenshots/slidingmovement.mp4 /&gt; ([#500](https://github.com/jimhigson/head-over-heels-online/issues/500)) ([cf254de](https://github.com/jimhigson/head-over-heels-online/commit/cf254de784dce61a4d9d36758c52e92219fe9359))
* make running and jumping off the edge of platforms a little more lenient by giving ~80ms grace (a few more frames) to make the jump after leaving the platform ([#501](https://github.com/jimhigson/head-over-heels-online/issues/501)) ([c9c2f03](https://github.com/jimhigson/head-over-heels-online/commit/c9c2f03e3061bab058874e6e870a98f958e93021))


### Bug Fixes

* bug where characters could jump off nothing if respawning into a roon they entered by falling from above ([#515](https://github.com/jimhigson/head-over-heels-online/issues/515)) ([149bd05](https://github.com/jimhigson/head-over-heels-online/commit/149bd05c989d008fd41494933aa5f639cf1178ff))


### Miscellaneous Chores

* initial release managed by release-please ([#504](https://github.com/jimhigson/head-over-heels-online/issues/504)) ([992b9c0](https://github.com/jimhigson/head-over-heels-online/commit/992b9c0eab3bff42dc70250b1847001f4f4a1a9a))

## 2025-10-02
* Final room has a door that lets player end the game
* Getting to freedom contributes to final score
* Getting to freedom shown on final score dialog
* Palette swop on scenery players (citizens of Freedom in the final room) to make them look different from players

## 2025-09-30
* update to version 0.3.3 of [the crt shaders](https://github.com/jimhigson/jims_shaders.git)
## 2025-09-28

* slower characters (ie, Head, slow monsters) in game run faster by an extra 20% (separate from the 1.2x default speed-up, so 1.44x total if kept at default)
* fast characters stay the same speed (ie, Heels, fast monsters)

## 2025-09-28
* bookworld22 room - portable sticks item not hidden behind the door on entry; makes it less visually confusing

## 2025-09-27

### Retrospec lives model

The game got pretty weird if one character (Head or Heels) lost all their lives. What is the other one supposed to do?
Adopted the Retrospec remake model:

* If one character loses all lives, and other has >2, other sacrifices 2, to give 1 to the character who lost
* If one character loses all lives, and other has exactly 2, other sacrifices 1, to give 1 to the character who lost (continue with 1 each)
* If other has 1, character goes to zero and is out of the game

### room edits

* Deliberately modified room `blacktooth29` from original game to prevent players from getting into an unwinnable lives-lost loop when jumping from the room above  

## 2025-09-11
* user can choose game speed from the menu (1x, 1.2x, 1.5x, 2x)
* 1.2x is now the default game speed
## 2025-09-03

### Look shift

* allow looking around the room by holding a key/button and pressing direction
* default to l2 on gamepad and C on keyboards
* mobile/touch controls not affected

## 2025-09-02

### Stationary lift bug fix

* stationary lifts (elevators) with top extent of travel equal to bottom no longer move slightly, so they are stable to stand on.
