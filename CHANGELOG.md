# Changelog

## [1.16.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.15.0...v1.16.0) (2026-01-19)


### Features

* slight Heels redraw when side-on to the camera ([#674](https://github.com/jimhigson/head-over-heels-online/issues/674)) ([8de1b6b](https://github.com/jimhigson/head-over-heels-online/commit/8de1b6beeb33f64ae203945dc665df6743f00f9a))
* slightly change look of confirm quit dialog ([#673](https://github.com/jimhigson/head-over-heels-online/issues/673)) ([37c9675](https://github.com/jimhigson/head-over-heels-online/commit/37c9675a2fecad11351711237319b9b72fa9cfbd))


### Bug Fixes

* regression where carry button always visible, now only when got the bag ([#672](https://github.com/jimhigson/head-over-heels-online/issues/672)) ([e1c742c](https://github.com/jimhigson/head-over-heels-online/commit/e1c742c74370f7d1253059ff6031d7201e01ed97))

## [1.15.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.14.1...v1.15.0) (2026-01-14)


### Features

* animate toaster sprites ([#663](https://github.com/jimhigson/head-over-heels-online/issues/663)) ([8832955](https://github.com/jimhigson/head-over-heels-online/commit/88329553a33b52fff7a8c90e1210666fb3c94e18))
* disabled and doughnutted sprites also use an updated spritesheet, not filters applied per-frame ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* doorframes cast shadows on items in doorway ([#666](https://github.com/jimhigson/head-over-heels-online/issues/666)) ([5cedd02](https://github.com/jimhigson/head-over-heels-online/commit/5cedd028c7ca20456d4354b924e4d87cad0bfc55))
* heels sprites get more red pixels (less brown/grey) so they look more colourful ([b8b4552](https://github.com/jimhigson/head-over-heels-online/commit/b8b4552b12d1c878041a5d33390f47effd23e555))
* improved texture monitoring (call textureInspector() on browser console) ([#661](https://github.com/jimhigson/head-over-heels-online/issues/661)) ([ce963ee](https://github.com/jimhigson/head-over-heels-online/commit/ce963ee05fcb42b9112c2dd41ab20e54e0491de9))
* moonbase: floor re-colourisation, more consistent lighting on walls ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* more colourful Heels sprites ([#662](https://github.com/jimhigson/head-over-heels-online/issues/662)) ([fbafad8](https://github.com/jimhigson/head-over-heels-online/commit/fbafad8729d01a7060ebfbbb52519199f7aca768))
* playable characters always rotate clockwise when turning 180º ([#660](https://github.com/jimhigson/head-over-heels-online/issues/660)) ([a43bc9f](https://github.com/jimhigson/head-over-heels-online/commit/a43bc9f6ce1b72499037dea7cce0d72b5c849d27))
* redraw Head when facing fully towards the camera to be more in fitting with original game sprites ([fbafad8](https://github.com/jimhigson/head-over-heels-online/commit/fbafad8729d01a7060ebfbbb52519199f7aca768))
* rendering refactor and general game-wide visual uplift ([#655](https://github.com/jimhigson/head-over-heels-online/issues/655)) ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* room-specific sprites are now generated from an updated spritesheet, not filters applied per-frame ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* shadows are darker; shadows appear on 'black' parts of floors, since they are now near-black (not pure black) ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* smoother animation on conveyors ([#657](https://github.com/jimhigson/head-over-heels-online/issues/657)) ([b05f672](https://github.com/jimhigson/head-over-heels-online/commit/b05f672b1024162e5b86ab1c8c98153dcb20ac70))
* teleporter sprites re-colourised ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* throttle frame rate when paused to reduce CPU/GPU load ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* use p3 colour space for more vibrant colours in game, menu, and map ([#659](https://github.com/jimhigson/head-over-heels-online/issues/659)) ([1319e5a](https://github.com/jimhigson/head-over-heels-online/commit/1319e5a5950d26eb5a20a50fdec0dcd6317847e7))


### Bug Fixes

* fix bug where on-screen buttons don't appear pressed while actions are being handled ([bb2e74a](https://github.com/jimhigson/head-over-heels-online/commit/bb2e74a76e770700a30bd811d3c27db089e458fb))
* heads sprites stray pixels while blinking ([#658](https://github.com/jimhigson/head-over-heels-online/issues/658)) ([b8b4552](https://github.com/jimhigson/head-over-heels-online/commit/b8b4552b12d1c878041a5d33390f47effd23e555))

## [1.14.1](https://github.com/jimhigson/head-over-heels-online/compare/v1.14.0...v1.14.1) (2025-12-30)


### Bug Fixes

* playable characters face wrong way coming in/out of symbiosis ([#653](https://github.com/jimhigson/head-over-heels-online/issues/653)) ([740b418](https://github.com/jimhigson/head-over-heels-online/commit/740b418ffa2b1f4a11fae27200d16d2013309687))

## [1.14.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.13.0...v1.14.0) (2025-12-24)


### Features

* add grace to allow player to continue running at previous speed after very short (250ms) interuption in walk inputs ([#651](https://github.com/jimhigson/head-over-heels-online/issues/651)) ([90e0008](https://github.com/jimhigson/head-over-heels-online/commit/90e00085e07f0216a2a130deb8bfadaa02b0a6e3))
* advertise the map from pause screen ([#639](https://github.com/jimhigson/head-over-heels-online/issues/639)) ([9c2746e](https://github.com/jimhigson/head-over-heels-online/commit/9c2746eecbaf51dab07542e9c46a486c7a1c0aa6))
* blacktooth6 room layout changed from original, but is truer to the puzzle of the original in the physics of the new engine ([#647](https://github.com/jimhigson/head-over-heels-online/issues/647)) ([c82af01](https://github.com/jimhigson/head-over-heels-online/commit/c82af01ea9a4c7efcc0226e114f92b5215d5a6f6))
* optimise - render door legs as a single texture ([#638](https://github.com/jimhigson/head-over-heels-online/issues/638)) ([471654e](https://github.com/jimhigson/head-over-heels-online/commit/471654e22c509801f793623da1680c341cb337e7))
* refactor room blacktooth73 to be easier to visually parse ([#649](https://github.com/jimhigson/head-over-heels-online/issues/649)) ([dfcc270](https://github.com/jimhigson/head-over-heels-online/commit/dfcc270df4e512760a379c89bbc12ca96b45350c))
* visually player rotates towards new facing direction if turning &lt; 180º ([#650](https://github.com/jimhigson/head-over-heels-online/issues/650)) ([30d2d30](https://github.com/jimhigson/head-over-heels-online/commit/30d2d3061bc3e5749eb25496e66da39b5f6b27e1))


### Bug Fixes

* bug where short hits on movement keys would sometimes not cause any movement ([#652](https://github.com/jimhigson/head-over-heels-online/issues/652)) ([b6b663a](https://github.com/jimhigson/head-over-heels-online/commit/b6b663ae96f3120b1b833bf1b696f52400a4aa42))

## [1.13.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.12.0...v1.13.0) (2025-12-02)


### Features

* helicopter lifts cast animated shadows ([#637](https://github.com/jimhigson/head-over-heels-online/issues/637)) ([191f31d](https://github.com/jimhigson/head-over-heels-online/commit/191f31d69c453fb0a4a902bddafa9862a16dc3a5))
* smoother Heels sprite walking animation (modified sprites from original) ([#636](https://github.com/jimhigson/head-over-heels-online/issues/636)) ([92e6778](https://github.com/jimhigson/head-over-heels-online/commit/92e6778423f506b32452553862a904e95e1330ef))


### Bug Fixes

* crt emulation off by default ([#634](https://github.com/jimhigson/head-over-heels-online/issues/634)) ([3c35808](https://github.com/jimhigson/head-over-heels-online/commit/3c3580834d864b3aa37ac250f26d82e664cf3354))
* dynamically only load umami script when tracking is enabled ([#632](https://github.com/jimhigson/head-over-heels-online/issues/632)) ([e14f83e](https://github.com/jimhigson/head-over-heels-online/commit/e14f83e90af3a9ada5f1bde3615f4ae0e51d6d68))
* fps counter is more reliable ([#630](https://github.com/jimhigson/head-over-heels-online/issues/630)) ([dd37996](https://github.com/jimhigson/head-over-heels-online/commit/dd37996f1b6ba0af2633ade19abfb12884b4c7ce))
* improved lighting on Head sprite ([#633](https://github.com/jimhigson/head-over-heels-online/issues/633)) ([517a974](https://github.com/jimhigson/head-over-heels-online/commit/517a9745e5790d3b006569e4257e41c08e995579))
* mask app version so visual regression tests pass when version numbers have changed ([#631](https://github.com/jimhigson/head-over-heels-online/issues/631)) ([1650ade](https://github.com/jimhigson/head-over-heels-online/commit/1650aded05e4b6e7245c865a57b4ea81ca7a077c))
* sprites - smoother lighting/shading for Head ([92e6778](https://github.com/jimhigson/head-over-heels-online/commit/92e6778423f506b32452553862a904e95e1330ef))

## [1.12.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.11.0...v1.12.0) (2025-11-30)


### Features

* make main palette slightly more saturated and contrasty ([#625](https://github.com/jimhigson/head-over-heels-online/issues/625)) ([94594cd](https://github.com/jimhigson/head-over-heels-online/commit/94594cdee1d062055f49a3041a424bf06c429938))
* rooms: add an extra white rabbit for Heels to get by jumping on deactivated monsters ([#623](https://github.com/jimhigson/head-over-heels-online/issues/623)) ([d3b6ddc](https://github.com/jimhigson/head-over-heels-online/commit/d3b6ddcef85337205f771cf4e7d1a1efc6866d43))
* sprite - touched up door and conveyor rendering ([#622](https://github.com/jimhigson/head-over-heels-online/issues/622)) ([96a838d](https://github.com/jimhigson/head-over-heels-online/commit/96a838da02991d46bd0db5dac673bcf1e30acd5b))
* sprites - more colourful main characters ([#628](https://github.com/jimhigson/head-over-heels-online/issues/628)) ([bc3e457](https://github.com/jimhigson/head-over-heels-online/commit/bc3e457a51b9966f114348075deab61cc03fe35e))


### Bug Fixes

* resolve lock-ups in editor when: 1) undo removes the selected item; 2) trying to move a door outside of the room; 3) allow doors only to be mouse-dragged along the wall, not out of it ([#612](https://github.com/jimhigson/head-over-heels-online/issues/612)) ([0c25b14](https://github.com/jimhigson/head-over-heels-online/commit/0c25b1439fe7307c85734a49f61fcb19b53df698))

## [1.11.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.10.0...v1.11.0) (2025-11-24)


### Features

* shadows projected onto playable characters ([#620](https://github.com/jimhigson/head-over-heels-online/issues/620)) ([d5dda1e](https://github.com/jimhigson/head-over-heels-online/commit/d5dda1ee24d0a2c10adf02b50e2c41c3d3c61a6e))

## [1.10.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.9.0...v1.10.0) (2025-11-23)


### Features

* change lighting direction on some main background sprites (volcanos and normal blocks) ([#601](https://github.com/jimhigson/head-over-heels-online/issues/601)) ([948fbcd](https://github.com/jimhigson/head-over-heels-online/commit/948fbcd760957133a1aec2361734320097cacbdd))
* heels can jump-carry immediately on landing if inputs are held, head can auto-fire doughnuts if input held ([#594](https://github.com/jimhigson/head-over-heels-online/issues/594)) ([98a8317](https://github.com/jimhigson/head-over-heels-online/commit/98a8317bcea3ea4287aeabfda181a82e86e7e4b8))
* hitting jump+carry when carrying a spring gets the extra jump height from the spring ([#604](https://github.com/jimhigson/head-over-heels-online/issues/604)) ([46222c9](https://github.com/jimhigson/head-over-heels-online/commit/46222c9161489c1e9ea15908a9a4fe2be401953c))
* make blacktooth18 room not near-impossible in the remake engine ([#598](https://github.com/jimhigson/head-over-heels-online/issues/598)) ([22628f8](https://github.com/jimhigson/head-over-heels-online/commit/22628f864d0db882114faf8b04e3357881ec2c93))
* more vibrant palette in dimmed rooms ([#597](https://github.com/jimhigson/head-over-heels-online/issues/597)) ([16951ad](https://github.com/jimhigson/head-over-heels-online/commit/16951ad729dea55ee65e2b6175b2dc53b2996195))
* physics engine now allows players to push in x/y more quickly, and in z more slowly (used to be the same in both) since pushing upwards just as easily as horizontally felt unnatural ([#591](https://github.com/jimhigson/head-over-heels-online/issues/591)) ([a34cf7b](https://github.com/jimhigson/head-over-heels-online/commit/a34cf7b034eefd05323a70f0896ca8be94293e8c))
* redraw several shadow masks, and render shadows with a custom pixel shader ([#600](https://github.com/jimhigson/head-over-heels-online/issues/600)) ([cbceebf](https://github.com/jimhigson/head-over-heels-online/commit/cbceebf63eceacd5e7e35869b725b71f2ac2f28a))
* sliding around objects does not apply if would slide player onto a deadly item or make them fall off a platform ([#603](https://github.com/jimhigson/head-over-heels-online/issues/603)) ([471f99c](https://github.com/jimhigson/head-over-heels-online/commit/471f99c15ef782d337b3c40e4eb5db30fe60dad5))
* slightly more shiny looking colourisation for conveyors, switches, and stepstools ([#586](https://github.com/jimhigson/head-over-heels-online/issues/586)) ([6cb86d1](https://github.com/jimhigson/head-over-heels-online/commit/6cb86d15d77c77a2c01ddce514bf236193ac8ff4))
* slightly redraw some of the heels sprites ([#593](https://github.com/jimhigson/head-over-heels-online/issues/593)) ([6af13e2](https://github.com/jimhigson/head-over-heels-online/commit/6af13e2f81a90d64240f41df4adcb6df9383f8ee))
* slightly refined teleporting effect ([#590](https://github.com/jimhigson/head-over-heels-online/issues/590)) ([d6d4071](https://github.com/jimhigson/head-over-heels-online/commit/d6d40716579a49542baa1f0e82d544465c11437b))


### Bug Fixes

* gamespeed reverts to 1.0 after reincarnation ([#599](https://github.com/jimhigson/head-over-heels-online/issues/599)) ([b37241b](https://github.com/jimhigson/head-over-heels-online/commit/b37241b4b9bed2bed7cdd9411bc2ad14e6e9f88e))
* if heels loses a life while carrying an item and head is in the room, the item is dropped ([#596](https://github.com/jimhigson/head-over-heels-online/issues/596)) ([dc05f01](https://github.com/jimhigson/head-over-heels-online/commit/dc05f0152d0311d17208c618ff45397a8576582d))
* on heels leaving a room while carrying an item, if heads is in the room, the item is dropped (no longer vanishes out of the game ([#587](https://github.com/jimhigson/head-over-heels-online/issues/587)) ([c8987ff](https://github.com/jimhigson/head-over-heels-online/commit/c8987ff65e86359fdd88f27ee2d12e8f1a3af18b))
* remove remake-specific skip in blacktooth67 ([#602](https://github.com/jimhigson/head-over-heels-online/issues/602)) ([940f5a7](https://github.com/jimhigson/head-over-heels-online/commit/940f5a7e3e895571dbde29aae004f99bcb34bd54))
* shadows now longer show as white in level editor room preview ([#605](https://github.com/jimhigson/head-over-heels-online/issues/605)) ([392cfd2](https://github.com/jimhigson/head-over-heels-online/commit/392cfd2484e21af1aaff0b3d5f9269ac384b74d6))
* sliding/rolling items no longer travel in unexpected ways ([#609](https://github.com/jimhigson/head-over-heels-online/issues/609)) ([39f109a](https://github.com/jimhigson/head-over-heels-online/commit/39f109ad0f7b38b404cd4952ff2ab56c075c6872))
* update colourisation to get lighting right on several sprites ([#589](https://github.com/jimhigson/head-over-heels-online/issues/589)) ([1f535c2](https://github.com/jimhigson/head-over-heels-online/commit/1f535c2f582883f5cd5192c99dc762d18f4db003))
* use mp3 for all sound effects ([#583](https://github.com/jimhigson/head-over-heels-online/issues/583)) ([7b9afd4](https://github.com/jimhigson/head-over-heels-online/commit/7b9afd4fb50ff139a8f5354062869c6733493aca))

## [1.9.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.8.0...v1.9.0) (2025-11-02)


### Features

* colour clash effect while teleporting ([#577](https://github.com/jimhigson/head-over-heels-online/issues/577)) ([27e4ee3](https://github.com/jimhigson/head-over-heels-online/commit/27e4ee340486a733bb5232b022a713d767bb23c7))

## [1.8.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.7.0...v1.8.0) (2025-10-29)


### Features

* joysticks animated when pressed ([#578](https://github.com/jimhigson/head-over-heels-online/issues/578)) ([b40b67f](https://github.com/jimhigson/head-over-heels-online/commit/b40b67fb62d09144c6c4d0563798cb94b2a0dda5))


### Bug Fixes

* avoid skip in blacktooth78 by jumping diagonally from the entrance door threshold ([#580](https://github.com/jimhigson/head-over-heels-online/issues/580)) ([dcbc7db](https://github.com/jimhigson/head-over-heels-online/commit/dcbc7db1c33444993bc6645485e76fb9b3e7f9c7))

## [1.7.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.6.0...v1.7.0) (2025-10-26)


### Features

* add "mixed" as a new default input mode suitable for gamepads with both analogue and digital control ([#569](https://github.com/jimhigson/head-over-heels-online/issues/569)) ([d70ba62](https://github.com/jimhigson/head-over-heels-online/commit/d70ba62abecd69550789bdd50c82cc59051b97b6))
* allow radial d-pads to be used, specifically the 8bitdo ultimate 2c wired ([#572](https://github.com/jimhigson/head-over-heels-online/issues/572)) ([bb2f2a1](https://github.com/jimhigson/head-over-heels-online/commit/bb2f2a1591fef2673148f40c380216cac9319a74))
* improved some input presets ([#575](https://github.com/jimhigson/head-over-heels-online/issues/575)) ([ad18306](https://github.com/jimhigson/head-over-heels-online/commit/ad183069e79b17787876c575b7fee8f2a5290e9b))
* move display options into their own sub-menu ([#571](https://github.com/jimhigson/head-over-heels-online/issues/571)) ([8de6169](https://github.com/jimhigson/head-over-heels-online/commit/8de61696a6544f5eef15902326ff714ef9aa442e))
* narrower lowercase 'r' in bitmap font ([#573](https://github.com/jimhigson/head-over-heels-online/issues/573)) ([6ea0079](https://github.com/jimhigson/head-over-heels-online/commit/6ea007951e4caebdc72d64384f3e3e2db6196c8e))


### Bug Fixes

* don't show as 'custom' input preset when no input has been mapped ([#574](https://github.com/jimhigson/head-over-heels-online/issues/574)) ([6bd0363](https://github.com/jimhigson/head-over-heels-online/commit/6bd0363e14dbe74ac95231986f92f9d34b125433))
* heels blinks like head on main menu screen ([#564](https://github.com/jimhigson/head-over-heels-online/issues/564)) ([e2b6a65](https://github.com/jimhigson/head-over-heels-online/commit/e2b6a658c6efbf17d57119c3b001410a33c9a005))
* if putting down a carried item causes Heels to touch a reincarnation fish, don't create a bugged save with a duplicate of the item put down (both in the bag and in the room) - this would cause crashed on reloading the reincarnation point ([#570](https://github.com/jimhigson/head-over-heels-online/issues/570)) ([58994cf](https://github.com/jimhigson/head-over-heels-online/commit/58994cf6040b3f1ca6e835dfc9fae712a03315e7))

## [1.6.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.5.0...v1.6.0) (2025-10-15)


### Features

* editor annotations tell user which monsters will wake when the player goes near ([#552](https://github.com/jimhigson/head-over-heels-online/issues/552)) ([7dba80b](https://github.com/jimhigson/head-over-heels-online/commit/7dba80be1e395871f6811000b8749adb496a2b0c))
* make crt effect more subtle ([#556](https://github.com/jimhigson/head-over-heels-online/issues/556)) ([4080e85](https://github.com/jimhigson/head-over-heels-online/commit/4080e853d09efdc3a0e99f11facc4781a011df15))
* make dimmed rooms appear more vibrant ([#559](https://github.com/jimhigson/head-over-heels-online/issues/559)) ([8ddcfed](https://github.com/jimhigson/head-over-heels-online/commit/8ddcfedada7bbba4d1122f342371ad603642ea79))
* market scenery improved colourisation on the bricks above the stalls ([#562](https://github.com/jimhigson/head-over-heels-online/issues/562)) ([9f562c5](https://github.com/jimhigson/head-over-heels-online/commit/9f562c5f087da725d825c774011814f18e3fa663))
* more solid-looking egyptus floors ([#553](https://github.com/jimhigson/head-over-heels-online/issues/553)) ([2754e9f](https://github.com/jimhigson/head-over-heels-online/commit/2754e9fafef955e7ba09d3095c1b961db460042f))
* small changes in egyptus7 ([#551](https://github.com/jimhigson/head-over-heels-online/issues/551)) ([d9e0973](https://github.com/jimhigson/head-over-heels-online/commit/d9e097312f62b1ed9bd9593ce3a3acfbcc27e9e3))
* update snapshot tests to run in parellel batches; make items dissapearing on room entry render the bubbles deterministicly so that tests do not depend on room order ([#549](https://github.com/jimhigson/head-over-heels-online/issues/549)) ([2ac95a0](https://github.com/jimhigson/head-over-heels-online/commit/2ac95a07edf15c2397c976e31bc4f675cce5dcff))
* workflows now run on arm64 (not amd64) architecture ([#560](https://github.com/jimhigson/head-over-heels-online/issues/560)) ([6815d1c](https://github.com/jimhigson/head-over-heels-online/commit/6815d1cf67b1474219f13af13bb7abf084a432e4))


### Bug Fixes

* pause/hold banner had unequal spacing on each side ([#557](https://github.com/jimhigson/head-over-heels-online/issues/557)) ([cb673ff](https://github.com/jimhigson/head-over-heels-online/commit/cb673ff620232599eeed78483d6fc44b04a4038c))

## [1.5.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.4.0...v1.5.0) (2025-10-12)


### Features

* game mechanics now constrain item movement to 1.5x its normal speed. Prevents extremely fast movement when an item is on top of another item, especially if there is a stack of items which are all moving ([#548](https://github.com/jimhigson/head-over-heels-online/issues/548)) ([f80febb](https://github.com/jimhigson/head-over-heels-online/commit/f80febb9b1ae8dff4b7bea9db25da211b0b9ef9e))
* make easier for head to fall into some small gaps while drifting downwards by applying more sliding vectors ([#547](https://github.com/jimhigson/head-over-heels-online/issues/547)) ([c0dc2cb](https://github.com/jimhigson/head-over-heels-online/commit/c0dc2cb74cfe997c6c782d9137910f26d1e7930b))
* standardise the options menus ([#546](https://github.com/jimhigson/head-over-heels-online/issues/546)) ([a36ba72](https://github.com/jimhigson/head-over-heels-online/commit/a36ba72d3232b8de60cc2190c5a67cd9f81b271d))

## [1.4.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.3.0...v1.4.0) (2025-10-09)


### Features

* cyan rooms get blue/grey shadows; generally darker mid/dark tones in most rooms ([#542](https://github.com/jimhigson/head-over-heels-online/issues/542)) ([dfe61cd](https://github.com/jimhigson/head-over-heels-online/commit/dfe61cda9b5ba2186d8eabfaf309fde59b718eaa))
* lower-case text in editor room annotations ([#543](https://github.com/jimhigson/head-over-heels-online/issues/543)) ([83b7cdb](https://github.com/jimhigson/head-over-heels-online/commit/83b7cdba71edc1020a61ea22efd12452d4783112))


### Bug Fixes

* picking items up also gets coyote time, for running and jumping and picking up items, to pick up for a short time after leaving the item ([#544](https://github.com/jimhigson/head-over-heels-online/issues/544)) ([07f39dc](https://github.com/jimhigson/head-over-heels-online/commit/07f39dcce017c69f682d7ddd9145fb95654daed8))

## [1.3.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.2.0...v1.3.0) (2025-10-09)


### Features

* make crt emulation brighter overall ([#538](https://github.com/jimhigson/head-over-heels-online/issues/538)) ([53a16f5](https://github.com/jimhigson/head-over-heels-online/commit/53a16f5e9d4fa07e97d1a1728b54e5919445947a))
* make easier to walk though doors by applying sliding even if more misalligned than before ([#537](https://github.com/jimhigson/head-over-heels-online/issues/537)) ([7cd27dc](https://github.com/jimhigson/head-over-heels-online/commit/7cd27dc8251686523ba52aeb410c1f9c0507db3c))
* make some monster sounds quieter ([#539](https://github.com/jimhigson/head-over-heels-online/issues/539)) ([ee189b5](https://github.com/jimhigson/head-over-heels-online/commit/ee189b5be1e156ca10df5a5d233bd453bd7ad885))

## [1.2.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.1.1...v1.2.0) (2025-10-08)


### Features

* helpful sliding vectors now discriminate pushable/static obstructions ([#528](https://github.com/jimhigson/head-over-heels-online/issues/528)) ([a521721](https://github.com/jimhigson/head-over-heels-online/commit/a52172154cd2c6cf7aab49b314e3088d131a9846))
* hyphens in docs are narrower ([#529](https://github.com/jimhigson/head-over-heels-online/issues/529)) ([9d7106d](https://github.com/jimhigson/head-over-heels-online/commit/9d7106d6650436df1cd47b61843500ae131e3389))
* use F8, F9, F10 to change display settings in default keybindings ([#535](https://github.com/jimhigson/head-over-heels-online/issues/535)) ([99a9a38](https://github.com/jimhigson/head-over-heels-online/commit/99a9a3819018689ddc67b633f670d81711799376))


### Bug Fixes

* better (but not perfect) fullscreen in PWAs under iOS26 ([#533](https://github.com/jimhigson/head-over-heels-online/issues/533)) ([337f6a2](https://github.com/jimhigson/head-over-heels-online/commit/337f6a22efb59e3d5aa1c00b81881f67a5268d70))
* do not apply sliding to help walk around joystick items, since we want to keep pushing these ([#536](https://github.com/jimhigson/head-over-heels-online/issues/536)) ([9f1f03d](https://github.com/jimhigson/head-over-heels-online/commit/9f1f03d9b1a45cfe4741d3b0ca634854cb8fe4c9))
* minor footer allignment ([#530](https://github.com/jimhigson/head-over-heels-online/issues/530)) ([a4e928b](https://github.com/jimhigson/head-over-heels-online/commit/a4e928b68f62c016303b1145dab0d2c74636c8f3))
* more modern default keys, hold dialog minor formatting (now called PAUSE, not "Hold") ([#531](https://github.com/jimhigson/head-over-heels-online/issues/531)) ([b82f6bc](https://github.com/jimhigson/head-over-heels-online/commit/b82f6bcda1c0747dfc6e12109179d4f2c8ad6712))

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
