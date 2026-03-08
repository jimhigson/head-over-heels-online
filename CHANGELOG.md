# Changelog

## [20.0.0](https://github.com/jimhigson/head-over-heels-online/compare/v19.0.0...v20.0.0) (2026-03-08)


### Bug Fixes

* Head sometimes keeps eyes cloesd after changing room ([#752](https://github.com/jimhigson/head-over-heels-online/issues/752)) ([0bb932f](https://github.com/jimhigson/head-over-heels-online/commit/0bb932fc725d26b835dffbe35c3a1c78b07318fd))


### Room Changes

* make bookworld27 a little nicer looking ([#753](https://github.com/jimhigson/head-over-heels-online/issues/753)) ([e3c63b4](https://github.com/jimhigson/head-over-heels-online/commit/e3c63b487111e971157751bdaf66bd498484808b))

## [19.0.0](https://github.com/jimhigson/head-over-heels-online/compare/v18.0.0...v19.0.0) (2026-03-06)


### Features

* charles robots can be deactivated, and render grey while they have the deactivated state ([#745](https://github.com/jimhigson/head-over-heels-online/issues/745)) ([088867b](https://github.com/jimhigson/head-over-heels-online/commit/088867bef326237004396e1dc32fe77dc8ff4367))
* easier to slide out of doorways ([#735](https://github.com/jimhigson/head-over-heels-online/issues/735)) ([6b3f1f7](https://github.com/jimhigson/head-over-heels-online/commit/6b3f1f713ef5b1443c6aa59919c10ca9a84e98c0))
* first beta release of native builds ([#563](https://github.com/jimhigson/head-over-heels-online/issues/563)) ([e1026dd](https://github.com/jimhigson/head-over-heels-online/commit/e1026dddde13d0e2c8daf52bb1705d7862209ced))
* going into symbiosis now moved heads and heels to their midpoint horizontally, and faces in the direction the previous character was facing ([#741](https://github.com/jimhigson/head-over-heels-online/issues/741)) ([f2724e6](https://github.com/jimhigson/head-over-heels-online/commit/f2724e6bcf64cdd6f3f681777e20f003d65e47a9))
* head closes eyes if stood on by heels or another item ([#747](https://github.com/jimhigson/head-over-heels-online/issues/747)) ([8169351](https://github.com/jimhigson/head-over-heels-online/commit/81693515631ac2e5392c0a3948f6b21ca4ced376))
* Heels can carry Head's pickups (doughnuts, hooter, fast steps etc) ([#728](https://github.com/jimhigson/head-over-heels-online/issues/728)) ([0b07627](https://github.com/jimhigson/head-over-heels-online/commit/0b07627547f78dee1a5a106a3fa13d7719fdcd14))
* improved positioning of room rendering on screen ([#749](https://github.com/jimhigson/head-over-heels-online/issues/749)) ([6638c90](https://github.com/jimhigson/head-over-heels-online/commit/6638c90b29e1169bda14756c912b0386c6df8f38))
* map current room highlighted in both game and editor ([#744](https://github.com/jimhigson/head-over-heels-online/issues/744)) ([dd540c3](https://github.com/jimhigson/head-over-heels-online/commit/dd540c365b348ebab1284368da5ec6bd2f00f902))
* moonbase rooms have bluer moonscape outside ([#725](https://github.com/jimhigson/head-over-heels-online/issues/725)) ([597ed89](https://github.com/jimhigson/head-over-heels-online/commit/597ed89974c6fcb3c360da3a84e297f7746c22a3))
* reorganised on-screen hud on mobile ([6638c90](https://github.com/jimhigson/head-over-heels-online/commit/6638c90b29e1169bda14756c912b0386c6df8f38))
* scrolls in-game improved appearance ([#742](https://github.com/jimhigson/head-over-heels-online/issues/742)) ([8a84109](https://github.com/jimhigson/head-over-heels-online/commit/8a8410965948554b59abf496452c09ed2bfe366d))
* show simple version numbers (ie "v18") instead of semver (like "18.0.0") in the game ([#718](https://github.com/jimhigson/head-over-heels-online/issues/718)) ([bdd91b5](https://github.com/jimhigson/head-over-heels-online/commit/bdd91b56e04ec8bc6dd35d1c1585b2348eef5119))


### Bug Fixes

* fix rendering order bug where players and other items would sometimes incorrectly be rendered behind scenery items ([#748](https://github.com/jimhigson/head-over-heels-online/issues/748)) ([11e3d79](https://github.com/jimhigson/head-over-heels-online/commit/11e3d7920e3fd64ece83964e55a588d354eb354a))
* improvee behind/in-front detection of items where items are adjacent for rare failure case where items would flicker in front/behind each other during gameplay ([#751](https://github.com/jimhigson/head-over-heels-online/issues/751)) ([2b191d3](https://github.com/jimhigson/head-over-heels-online/commit/2b191d34a4b9f3fdefdbe3d22fcfca76d0abd479))
* restore upscaling by integer amounts only - non-integer upscale was causing render artefacts ([#738](https://github.com/jimhigson/head-over-heels-online/issues/738)) ([b4fb1c1](https://github.com/jimhigson/head-over-heels-online/commit/b4fb1c1e1befc509c9fac32f179ecf5af0bc0782))
* scraping sound no longer plays when player quickly changes direction or rides on a conveyor ([#730](https://github.com/jimhigson/head-over-heels-online/issues/730)) ([fb1e937](https://github.com/jimhigson/head-over-heels-online/commit/fb1e9373cfa88aab3b48c405ff06ebce850f4859))
* scraping sound no longer plays when player quickly changes direction or rides on a conveyor ([#731](https://github.com/jimhigson/head-over-heels-online/issues/731)) ([6d960ff](https://github.com/jimhigson/head-over-heels-online/commit/6d960ff39580337a5b0e9c8040e1bd25b04ae515))


### Room Changes

* blacktooth68 and blacktooth85 non-impactful update to make rooms easier to read ([#743](https://github.com/jimhigson/head-over-heels-online/issues/743)) ([7ba64f2](https://github.com/jimhigson/head-over-heels-online/commit/7ba64f20efa43dc77a86d1290852a71d76e9452a))
* make moonbase12 less visually confusing ([#727](https://github.com/jimhigson/head-over-heels-online/issues/727)) ([65650a2](https://github.com/jimhigson/head-over-heels-online/commit/65650a2b2737a06b4683b178238d9c4b615836ea))
* moonbase 30 made more interesting with some turtles ([#733](https://github.com/jimhigson/head-over-heels-online/issues/733)) ([70e4260](https://github.com/jimhigson/head-over-heels-online/commit/70e42601d7c5cf5a310168f213acd97fedc7b77c))
* penitentiary 3 made a bit easier since in the remake Head while gliding moves slower than the moving platforms, so giving a small head start makes it harder to miss the platform ([#732](https://github.com/jimhigson/head-over-heels-online/issues/732)) ([98c3cf4](https://github.com/jimhigson/head-over-heels-online/commit/98c3cf44d2a89f103cbe0e5e44c343eb4298cc35))


### Sprite Changes

* cowboys in bookworld wearing blue jeans (bookworld wsa looking too brown overall) ([c27c9ed](https://github.com/jimhigson/head-over-heels-online/commit/c27c9ed3cfbe2828c7edcb43a4991e7b02478b37))
* dark blacktooth room wall recolourise ([#750](https://github.com/jimhigson/head-over-heels-online/issues/750)) ([6439ec9](https://github.com/jimhigson/head-over-heels-online/commit/6439ec9c0b53a58fa210dcf5f37afed4a191f72a))
* moonbase doors get a more consistent colourise in dim rooms ([#729](https://github.com/jimhigson/head-over-heels-online/issues/729)) ([125c7e9](https://github.com/jimhigson/head-over-heels-online/commit/125c7e96d3432dd3d284d826af57b92b71f75415))
* moonbase doors have specific door 'legs' sprites, not the generic stone towers ([c27c9ed](https://github.com/jimhigson/head-over-heels-online/commit/c27c9ed3cfbe2828c7edcb43a4991e7b02478b37))
* moonbase walls next to doors end nicely to let the door show through, instead of showing moonscape where the door should be ([c27c9ed](https://github.com/jimhigson/head-over-heels-online/commit/c27c9ed3cfbe2828c7edcb43a4991e7b02478b37))
* new, moonbase-specific sprite for towers since stone towers looked out of place here ([c27c9ed](https://github.com/jimhigson/head-over-heels-online/commit/c27c9ed3cfbe2828c7edcb43a4991e7b02478b37))


### Editor Changes

* crash on entering playtest mode from editor ([#734](https://github.com/jimhigson/head-over-heels-online/issues/734)) ([b4b9db4](https://github.com/jimhigson/head-over-heels-online/commit/b4b9db469d3e848c9a5c37a12ed633601bafa942))

## [1.18.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.17.1...v1.18.0) (2026-02-18)


### Features

* default landing sound used for all items that land on any surface ([#711](https://github.com/jimhigson/head-over-heels-online/issues/711)) ([40e8db4](https://github.com/jimhigson/head-over-heels-online/commit/40e8db4160285b398842e95bc56dbce3103cb62f))
* games upscale can be fractional sometimes to more precisely match the size of the screen it is played on ([#709](https://github.com/jimhigson/head-over-heels-online/issues/709)) ([961787c](https://github.com/jimhigson/head-over-heels-online/commit/961787c7a2a690b10af3d7cf8adb92418291c3a0))
* more colours on loading bars in border ([#712](https://github.com/jimhigson/head-over-heels-online/issues/712)) ([ac4c085](https://github.com/jimhigson/head-over-heels-online/commit/ac4c085f8f7d7873d6fda0af9ebca5deabd31583))
* more sounds for generic items: falling, scraping ([#701](https://github.com/jimhigson/head-over-heels-online/issues/701)) ([cc1b6a2](https://github.com/jimhigson/head-over-heels-online/commit/cc1b6a2c690cde1574650bb8ee18333e311b69d7))
* pixel grid snapping applies in xy plane while an item falls purely vertically ([#697](https://github.com/jimhigson/head-over-heels-online/issues/697)) ([5cca663](https://github.com/jimhigson/head-over-heels-online/commit/5cca663f67e56c361011b51d3cc20748583c8beb))
* post to discord when a release happens ([#716](https://github.com/jimhigson/head-over-heels-online/issues/716)) ([3832cf2](https://github.com/jimhigson/head-over-heels-online/commit/3832cf28c5bc0ebcf5beb1b5d55039a1c62d97d4))
* room entry sounds (disabled by default) ([#706](https://github.com/jimhigson/head-over-heels-online/issues/706)) ([0b9b2d2](https://github.com/jimhigson/head-over-heels-online/commit/0b9b2d26ddcfb87d4934b56c9d34fee2893a20f4))
* scenery players in finalRoom get shadowmasks too, same as real players ([#698](https://github.com/jimhigson/head-over-heels-online/issues/698)) ([39f0a5f](https://github.com/jimhigson/head-over-heels-online/commit/39f0a5f5ad59d5ea0fc8cea6288d33b594cd8d5e))
* show latest version indicator on home screen ([#705](https://github.com/jimhigson/head-over-heels-online/issues/705)) ([85f4200](https://github.com/jimhigson/head-over-heels-online/commit/85f420061d61abd2973cd5976b5be6fbac4bb816))
* slightly more realistic spectrum-style loading bars ([#707](https://github.com/jimhigson/head-over-heels-online/issues/707)) ([968748d](https://github.com/jimhigson/head-over-heels-online/commit/968748dc45cf05ce1bfe2ef066196a0f1cf455dd))
* when cheats are on, clicking/tapping on a room on the map jumps the current character there ([#715](https://github.com/jimhigson/head-over-heels-online/issues/715)) ([80aaecc](https://github.com/jimhigson/head-over-heels-online/commit/80aaeccbc9417043925d262e138c34c3819cf6b4))


### Bug Fixes

* head facing sideways using standard 24x24 pixel sprites ([#694](https://github.com/jimhigson/head-over-heels-online/issues/694)) ([724ccb4](https://github.com/jimhigson/head-over-heels-online/commit/724ccb4c5b164921d4a813512eac4d7e94811ac0))
* phone wrong orientation playable ([#714](https://github.com/jimhigson/head-over-heels-online/issues/714)) ([8e93e7f](https://github.com/jimhigson/head-over-heels-online/commit/8e93e7f5ca300203bf58015c7d8b8a90d627e975))


### Room Changes

* moonbase2, moonbase4: remove room skip by diagonal jumping ([#713](https://github.com/jimhigson/head-over-heels-online/issues/713)) ([f4cba97](https://github.com/jimhigson/head-over-heels-online/commit/f4cba97f5fd658abf1f66842dd0af260ec27bd14))
* moonbase16: make less confusing by adding more drums to use to pile up to jump over volcanos ([#700](https://github.com/jimhigson/head-over-heels-online/issues/700)) ([88c7ffd](https://github.com/jimhigson/head-over-heels-online/commit/88c7ffd74f3fb885c7d7aaf1f58b4e9e9d56ce75))
* moonbase20, moonbase23: arrow rooms have arrow centred in room (unlike original game) ([#699](https://github.com/jimhigson/head-over-heels-online/issues/699)) ([8b7f2e0](https://github.com/jimhigson/head-over-heels-online/commit/8b7f2e027b181fcc7e994b2e715a8197c52251bf))


### Sprite Changes

* make sliding blocks stand out a bit better from the floor in moonbase arrow rooms ([#703](https://github.com/jimhigson/head-over-heels-online/issues/703)) ([4a306e4](https://github.com/jimhigson/head-over-heels-online/commit/4a306e4bf1723738c2d1937c53ccae0702760b83))
* slightly more expressive Heels falling sprites for towards and right direction ([#708](https://github.com/jimhigson/head-over-heels-online/issues/708)) ([36d695f](https://github.com/jimhigson/head-over-heels-online/commit/36d695f49dd8b5733290dfd9c9b4659dfce15019))


### Editor Changes

* editor highlighted/selected items render dark pixels as black ([#695](https://github.com/jimhigson/head-over-heels-online/issues/695)) ([7f4dfa5](https://github.com/jimhigson/head-over-heels-online/commit/7f4dfa5187a5dfc57fa4261405295f8df7eb1214))

## [1.17.1](https://github.com/jimhigson/head-over-heels-online/compare/v1.17.0...v1.17.1) (2026-02-03)


### Bug Fixes

* add ampersand char to bitmap font ([#691](https://github.com/jimhigson/head-over-heels-online/issues/691)) ([eb297eb](https://github.com/jimhigson/head-over-heels-online/commit/eb297eb208e9208bd0cb0b21dc9ed00836da6f02))
* head looking sideways to the camera partial redraw ([#693](https://github.com/jimhigson/head-over-heels-online/issues/693)) ([fb95567](https://github.com/jimhigson/head-over-heels-online/commit/fb9556791a4661053c024b861ec80eab95e224a7))

## [1.17.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.16.3...v1.17.0) (2026-01-27)


### Features

* emperor's guardian looks a bit more distinct ([#687](https://github.com/jimhigson/head-over-heels-online/issues/687)) ([5a462cb](https://github.com/jimhigson/head-over-heels-online/commit/5a462cb8013b19738eb41e01b23cac272fff74be))


### Room Changes

* blacktooth24: spring aligned with doorway ([#688](https://github.com/jimhigson/head-over-heels-online/issues/688)) ([d682624](https://github.com/jimhigson/head-over-heels-online/commit/d682624bfdfa2a1d0d11ff5a82627fbee8947d02))

## [1.16.3](https://github.com/jimhigson/head-over-heels-online/compare/v1.16.2...v1.16.3) (2026-01-26)


### Bug Fixes

* (almost) pointless early load to keep db happy ([#681](https://github.com/jimhigson/head-over-heels-online/issues/681)) ([a5ba237](https://github.com/jimhigson/head-over-heels-online/commit/a5ba237dcadbbb3cef6431e94ab02a802b7db69d))
* update codegen, add github workflow so does not go out of date again ([#682](https://github.com/jimhigson/head-over-heels-online/issues/682)) ([d54763c](https://github.com/jimhigson/head-over-heels-online/commit/d54763c2b3c8ac722a5d8b109c917ef292e734f6))


### Editor Changes

* editor shows map rooms in black ([#683](https://github.com/jimhigson/head-over-heels-online/issues/683)) ([1ef2daa](https://github.com/jimhigson/head-over-heels-online/commit/1ef2daa9d8b9139bbd6a38f9f018196b9c99cabb))

## [1.16.2](https://github.com/jimhigson/head-over-heels-online/compare/v1.16.1...v1.16.2) (2026-01-23)


### Bug Fixes

* don't play music when  getting a crown if user has mute turned on ([#679](https://github.com/jimhigson/head-over-heels-online/issues/679)) ([69d09a5](https://github.com/jimhigson/head-over-heels-online/commit/69d09a5714383fa25984f9f303d156e9787f1620))

## [1.16.1](https://github.com/jimhigson/head-over-heels-online/compare/v1.16.0...v1.16.1) (2026-01-21)


### Bug Fixes

* fix some inconsistent shading on dark room sprites ([#677](https://github.com/jimhigson/head-over-heels-online/issues/677)) ([d50b2d5](https://github.com/jimhigson/head-over-heels-online/commit/d50b2d5ad227045dce269517396bf36ce0b2a528))

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
* rooms with shadows indicating invisible walls on the two sides closest to the camera no longer have a bright square on near corner ([#667](https://github.com/jimhigson/head-over-heels-online/issues/667)) ([f4ef85a](https://github.com/jimhigson/head-over-heels-online/commit/f4ef85a987db869517863dcabfeddae2fbd3e9cd))


### Sprite Changes

* heads sprites stray pixels while blinking ([#658](https://github.com/jimhigson/head-over-heels-online/issues/658)) ([b8b4552](https://github.com/jimhigson/head-over-heels-online/commit/b8b4552b12d1c878041a5d33390f47effd23e555))
* more colourful Heels sprites ([#662](https://github.com/jimhigson/head-over-heels-online/issues/662)) ([fbafad8](https://github.com/jimhigson/head-over-heels-online/commit/fbafad8729d01a7060ebfbbb52519199f7aca768))
* recolour spiky balls, bubble bots, and dark moonbase doors ([#665](https://github.com/jimhigson/head-over-heels-online/issues/665)) ([014d116](https://github.com/jimhigson/head-over-heels-online/commit/014d1161681b729f859e11a2fe6c93e51c47d0b9))
* various sprite updates ([#669](https://github.com/jimhigson/head-over-heels-online/issues/669)) ([d724a78](https://github.com/jimhigson/head-over-heels-online/commit/d724a78f687b8ccd18d2ec0755860ec65680a85f))

## [1.14.1](https://github.com/jimhigson/head-over-heels-online/compare/v1.14.0...v1.14.1) (2025-12-30)


### Bug Fixes

* playable characters face wrong way coming in/out of symbiosis ([#653](https://github.com/jimhigson/head-over-heels-online/issues/653)) ([740b418](https://github.com/jimhigson/head-over-heels-online/commit/740b418ffa2b1f4a11fae27200d16d2013309687))

## [1.14.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.13.0...v1.14.0) (2025-12-24)


### Features

* add grace to allow player to continue running at previous speed after very short (250ms) interuption in walk inputs ([#651](https://github.com/jimhigson/head-over-heels-online/issues/651)) ([90e0008](https://github.com/jimhigson/head-over-heels-online/commit/90e00085e07f0216a2a130deb8bfadaa02b0a6e3))
* advertise the map from pause screen ([#639](https://github.com/jimhigson/head-over-heels-online/issues/639)) ([9c2746e](https://github.com/jimhigson/head-over-heels-online/commit/9c2746eecbaf51dab07542e9c46a486c7a1c0aa6))
* optimise - render door legs as a single texture ([#638](https://github.com/jimhigson/head-over-heels-online/issues/638)) ([471654e](https://github.com/jimhigson/head-over-heels-online/commit/471654e22c509801f793623da1680c341cb337e7))
* visually player rotates towards new facing direction if turning &lt; 180º ([#650](https://github.com/jimhigson/head-over-heels-online/issues/650)) ([30d2d30](https://github.com/jimhigson/head-over-heels-online/commit/30d2d3061bc3e5749eb25496e66da39b5f6b27e1))


### Bug Fixes

* bug where short hits on movement keys would sometimes not cause any movement ([#652](https://github.com/jimhigson/head-over-heels-online/issues/652)) ([b6b663a](https://github.com/jimhigson/head-over-heels-online/commit/b6b663ae96f3120b1b833bf1b696f52400a4aa42))


### Room Changes

* blacktooth37, bookworld11, bookworld21, bookworld24, bookworld6: room layout changed from original, but is truer to the puzzle of the original in the physics of the new engine ([#647](https://github.com/jimhigson/head-over-heels-online/issues/647)) ([c82af01](https://github.com/jimhigson/head-over-heels-online/commit/c82af01ea9a4c7efcc0226e114f92b5215d5a6f6))
* blacktooth73, bookworld21: refactor room to be easier to visually parse ([#649](https://github.com/jimhigson/head-over-heels-online/issues/649)) ([dfcc270](https://github.com/jimhigson/head-over-heels-online/commit/dfcc270df4e512760a379c89bbc12ca96b45350c))


### Sprite Changes

* heels more consistent shading between angles ([#643](https://github.com/jimhigson/head-over-heels-online/issues/643)) ([fd2c464](https://github.com/jimhigson/head-over-heels-online/commit/fd2c4647d329b68394f37b255c9695589ba54578))
* minor playable character redraw ([#641](https://github.com/jimhigson/head-over-heels-online/issues/641)) ([da0f9f8](https://github.com/jimhigson/head-over-heels-online/commit/da0f9f834d6835b41ac721116fa22eca77d414bf))
* reshade Heels colourisation; make dimmed palette a bit closer to the normal one ([#644](https://github.com/jimhigson/head-over-heels-online/issues/644)) ([0b10530](https://github.com/jimhigson/head-over-heels-online/commit/0b10530613d2a762c1198eb7cf1dd6e2606dc0b8))
* slight head recolour ([#645](https://github.com/jimhigson/head-over-heels-online/issues/645)) ([98136d6](https://github.com/jimhigson/head-over-heels-online/commit/98136d6f9de83766b72e1b206fe2a860f5977e01))

## [1.13.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.12.0...v1.13.0) (2025-12-02)


### Features

* helicopter lifts cast animated shadows ([#637](https://github.com/jimhigson/head-over-heels-online/issues/637)) ([191f31d](https://github.com/jimhigson/head-over-heels-online/commit/191f31d69c453fb0a4a902bddafa9862a16dc3a5))
* smoother Heels sprite walking animation (modified sprites from original) ([#636](https://github.com/jimhigson/head-over-heels-online/issues/636)) ([92e6778](https://github.com/jimhigson/head-over-heels-online/commit/92e6778423f506b32452553862a904e95e1330ef))


### Bug Fixes

* crt emulation off by default ([#634](https://github.com/jimhigson/head-over-heels-online/issues/634)) ([3c35808](https://github.com/jimhigson/head-over-heels-online/commit/3c3580834d864b3aa37ac250f26d82e664cf3354))
* dynamically only load umami script when tracking is enabled ([#632](https://github.com/jimhigson/head-over-heels-online/issues/632)) ([e14f83e](https://github.com/jimhigson/head-over-heels-online/commit/e14f83e90af3a9ada5f1bde3615f4ae0e51d6d68))
* fps counter is more reliable ([#630](https://github.com/jimhigson/head-over-heels-online/issues/630)) ([dd37996](https://github.com/jimhigson/head-over-heels-online/commit/dd37996f1b6ba0af2633ade19abfb12884b4c7ce))
* mask app version so visual regression tests pass when version numbers have changed ([#631](https://github.com/jimhigson/head-over-heels-online/issues/631)) ([1650ade](https://github.com/jimhigson/head-over-heels-online/commit/1650aded05e4b6e7245c865a57b4ea81ca7a077c))


### Sprite Changes

* improved lighting on Head sprite ([#633](https://github.com/jimhigson/head-over-heels-online/issues/633)) ([517a974](https://github.com/jimhigson/head-over-heels-online/commit/517a9745e5790d3b006569e4257e41c08e995579))
* sprites - smoother lighting/shading for Head ([92e6778](https://github.com/jimhigson/head-over-heels-online/commit/92e6778423f506b32452553862a904e95e1330ef))

## [1.12.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.11.0...v1.12.0) (2025-11-30)


### Features

* make main palette slightly more saturated and contrasty ([#625](https://github.com/jimhigson/head-over-heels-online/issues/625)) ([94594cd](https://github.com/jimhigson/head-over-heels-online/commit/94594cdee1d062055f49a3041a424bf06c429938))
* sprite - touched up door and conveyor rendering ([#622](https://github.com/jimhigson/head-over-heels-online/issues/622)) ([96a838d](https://github.com/jimhigson/head-over-heels-online/commit/96a838da02991d46bd0db5dac673bcf1e30acd5b))


### Room Changes

* blacktooth37: add an extra white rabbit for Heels to get by jumping on deactivated monsters ([#623](https://github.com/jimhigson/head-over-heels-online/issues/623)) ([d3b6ddc](https://github.com/jimhigson/head-over-heels-online/commit/d3b6ddcef85337205f771cf4e7d1a1efc6866d43))


### Sprite Changes

* brighter blue in palette ([#629](https://github.com/jimhigson/head-over-heels-online/issues/629)) ([90f2de2](https://github.com/jimhigson/head-over-heels-online/commit/90f2de2c372c788498ed036c28d498914a6a90d5))
* more colourful main characters ([#628](https://github.com/jimhigson/head-over-heels-online/issues/628)) ([bc3e457](https://github.com/jimhigson/head-over-heels-online/commit/bc3e457a51b9966f114348075deab61cc03fe35e))


### Editor Changes

* resolve lock-ups in editor when: 1) undo removes the selected item; 2) trying to move a door outside of the room; 3) allow doors only to be mouse-dragged along the wall, not out of it ([#612](https://github.com/jimhigson/head-over-heels-online/issues/612)) ([0c25b14](https://github.com/jimhigson/head-over-heels-online/commit/0c25b1439fe7307c85734a49f61fcb19b53df698))

## [1.11.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.10.0...v1.11.0) (2025-11-24)


### Features

* shadows projected onto playable characters ([#620](https://github.com/jimhigson/head-over-heels-online/issues/620)) ([d5dda1e](https://github.com/jimhigson/head-over-heels-online/commit/d5dda1ee24d0a2c10adf02b50e2c41c3d3c61a6e))

## [1.10.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.9.0...v1.10.0) (2025-11-23)


### Features

* heels can jump-carry immediately on landing if inputs are held, head can auto-fire doughnuts if input held ([#594](https://github.com/jimhigson/head-over-heels-online/issues/594)) ([98a8317](https://github.com/jimhigson/head-over-heels-online/commit/98a8317bcea3ea4287aeabfda181a82e86e7e4b8))
* hitting jump+carry when carrying a spring gets the extra jump height from the spring ([#604](https://github.com/jimhigson/head-over-heels-online/issues/604)) ([46222c9](https://github.com/jimhigson/head-over-heels-online/commit/46222c9161489c1e9ea15908a9a4fe2be401953c))
* physics engine now allows players to push in x/y more quickly, and in z more slowly (used to be the same in both) since pushing upwards just as easily as horizontally felt unnatural ([#591](https://github.com/jimhigson/head-over-heels-online/issues/591)) ([a34cf7b](https://github.com/jimhigson/head-over-heels-online/commit/a34cf7b034eefd05323a70f0896ca8be94293e8c))
* redraw several shadow masks, and render shadows with a custom pixel shader ([#600](https://github.com/jimhigson/head-over-heels-online/issues/600)) ([cbceebf](https://github.com/jimhigson/head-over-heels-online/commit/cbceebf63eceacd5e7e35869b725b71f2ac2f28a))
* sliding around objects does not apply if would slide player onto a deadly item or make them fall off a platform ([#603](https://github.com/jimhigson/head-over-heels-online/issues/603)) ([471f99c](https://github.com/jimhigson/head-over-heels-online/commit/471f99c15ef782d337b3c40e4eb5db30fe60dad5))
* slightly redraw some of the heels sprites ([#593](https://github.com/jimhigson/head-over-heels-online/issues/593)) ([6af13e2](https://github.com/jimhigson/head-over-heels-online/commit/6af13e2f81a90d64240f41df4adcb6df9383f8ee))
* slightly refined teleporting effect ([#590](https://github.com/jimhigson/head-over-heels-online/issues/590)) ([d6d4071](https://github.com/jimhigson/head-over-heels-online/commit/d6d40716579a49542baa1f0e82d544465c11437b))


### Bug Fixes

* ensure backwards-compatability with currently deployed game saves ([#615](https://github.com/jimhigson/head-over-heels-online/issues/615)) ([a80c19f](https://github.com/jimhigson/head-over-heels-online/commit/a80c19faf97a57c4ab8ff292d306f32eb23aae65))
* gamespeed reverts to 1.0 after reincarnation ([#599](https://github.com/jimhigson/head-over-heels-online/issues/599)) ([b37241b](https://github.com/jimhigson/head-over-heels-online/commit/b37241b4b9bed2bed7cdd9411bc2ad14e6e9f88e))
* if heels loses a life while carrying an item and head is in the room, the item is dropped ([#596](https://github.com/jimhigson/head-over-heels-online/issues/596)) ([dc05f01](https://github.com/jimhigson/head-over-heels-online/commit/dc05f0152d0311d17208c618ff45397a8576582d))
* on heels leaving a room while carrying an item, if heads is in the room, the item is dropped (no longer vanishes out of the game ([#587](https://github.com/jimhigson/head-over-heels-online/issues/587)) ([c8987ff](https://github.com/jimhigson/head-over-heels-online/commit/c8987ff65e86359fdd88f27ee2d12e8f1a3af18b))
* sliding/rolling items no longer travel in unexpected ways ([#609](https://github.com/jimhigson/head-over-heels-online/issues/609)) ([39f109a](https://github.com/jimhigson/head-over-heels-online/commit/39f109ad0f7b38b404cd4952ff2ab56c075c6872))
* use correct mp3 files for some sound effects that had a badly converted file ([#585](https://github.com/jimhigson/head-over-heels-online/issues/585)) ([44746f9](https://github.com/jimhigson/head-over-heels-online/commit/44746f994e7991b73a5d318625703ef3d38b5390))
* use mp3 for all sound effects ([#583](https://github.com/jimhigson/head-over-heels-online/issues/583)) ([7b9afd4](https://github.com/jimhigson/head-over-heels-online/commit/7b9afd4fb50ff139a8f5354062869c6733493aca))


### Room Changes

* blacktooth18: make room not near-impossible in the remake engine ([#598](https://github.com/jimhigson/head-over-heels-online/issues/598)) ([22628f8](https://github.com/jimhigson/head-over-heels-online/commit/22628f864d0db882114faf8b04e3357881ec2c93))
* blacktooth18, blacktooth67: remove remake-specific skip ([#602](https://github.com/jimhigson/head-over-heels-online/issues/602)) ([940f5a7](https://github.com/jimhigson/head-over-heels-online/commit/940f5a7e3e895571dbde29aae004f99bcb34bd54))
* blacktooth68, egyptus10, penitentiary8: various room tweaks ([#588](https://github.com/jimhigson/head-over-heels-online/issues/588)) ([b7c0fc1](https://github.com/jimhigson/head-over-heels-online/commit/b7c0fc12c2c4035b1aedb4ee3870278521dade22))


### Sprite Changes

* change lighting direction on some main background sprites (volcanos and normal blocks) ([#601](https://github.com/jimhigson/head-over-heels-online/issues/601)) ([948fbcd](https://github.com/jimhigson/head-over-heels-online/commit/948fbcd760957133a1aec2361734320097cacbdd))
* improvements to heels sprites, blocks, armour in blacktooth, and new icons for the editor ([#608](https://github.com/jimhigson/head-over-heels-online/issues/608)) ([33a91dd](https://github.com/jimhigson/head-over-heels-online/commit/33a91ddd6703c28d69e2fc9c8cdcc7fd847031c9))
* more consistent lighting in a few sprites ([#606](https://github.com/jimhigson/head-over-heels-online/issues/606)) ([3af93d0](https://github.com/jimhigson/head-over-heels-online/commit/3af93d082994b736ceb05c294566696dc87fb176))
* more vibrant palette in dimmed rooms ([#597](https://github.com/jimhigson/head-over-heels-online/issues/597)) ([16951ad](https://github.com/jimhigson/head-over-heels-online/commit/16951ad729dea55ee65e2b6175b2dc53b2996195))
* slightly more shiny looking colourisation for conveyors, switches, and stepstools ([#586](https://github.com/jimhigson/head-over-heels-online/issues/586)) ([6cb86d1](https://github.com/jimhigson/head-over-heels-online/commit/6cb86d15d77c77a2c01ddce514bf236193ac8ff4))
* teleporter sprites get a bit more highlight while flashing ([#617](https://github.com/jimhigson/head-over-heels-online/issues/617)) ([81db719](https://github.com/jimhigson/head-over-heels-online/commit/81db7199ce2953d897820f87359c04807d1e8649))
* update colourisation to get lighting right on several sprites ([#589](https://github.com/jimhigson/head-over-heels-online/issues/589)) ([1f535c2](https://github.com/jimhigson/head-over-heels-online/commit/1f535c2f582883f5cd5192c99dc762d18f4db003))


### Editor Changes

* shadows no longer show as white in level editor room preview ([#605](https://github.com/jimhigson/head-over-heels-online/issues/605)) ([392cfd2](https://github.com/jimhigson/head-over-heels-online/commit/392cfd2484e21af1aaff0b3d5f9269ac384b74d6))

## [1.9.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.8.0...v1.9.0) (2025-11-02)


### Features

* colour clash effect while teleporting ([#577](https://github.com/jimhigson/head-over-heels-online/issues/577)) ([27e4ee3](https://github.com/jimhigson/head-over-heels-online/commit/27e4ee340486a733bb5232b022a713d767bb23c7))

## [1.8.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.7.0...v1.8.0) (2025-10-29)


### Features

* joysticks animated when pressed ([#578](https://github.com/jimhigson/head-over-heels-online/issues/578)) ([b40b67f](https://github.com/jimhigson/head-over-heels-online/commit/b40b67fb62d09144c6c4d0563798cb94b2a0dda5))


### Room Changes

* blacktooth78: avoid skip by jumping diagonally from the entrance door threshold ([#580](https://github.com/jimhigson/head-over-heels-online/issues/580)) ([dcbc7db](https://github.com/jimhigson/head-over-heels-online/commit/dcbc7db1c33444993bc6645485e76fb9b3e7f9c7))

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


### Sprite Changes

* add a lower-case (variable width) version of a slash to the game font ([#565](https://github.com/jimhigson/head-over-heels-online/issues/565)) ([a8bf517](https://github.com/jimhigson/head-over-heels-online/commit/a8bf51731ce563c7aa87626ddfc42f94a27fba5d))
* update lift colourisation ([#576](https://github.com/jimhigson/head-over-heels-online/issues/576)) ([28c7c30](https://github.com/jimhigson/head-over-heels-online/commit/28c7c3086e6add7a71dfd104144f83c4091286ea))

## [1.6.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.5.0...v1.6.0) (2025-10-15)


### Features

* make crt effect more subtle ([#556](https://github.com/jimhigson/head-over-heels-online/issues/556)) ([4080e85](https://github.com/jimhigson/head-over-heels-online/commit/4080e853d09efdc3a0e99f11facc4781a011df15))
* make dimmed rooms appear more vibrant ([#559](https://github.com/jimhigson/head-over-heels-online/issues/559)) ([8ddcfed](https://github.com/jimhigson/head-over-heels-online/commit/8ddcfedada7bbba4d1122f342371ad603642ea79))
* update snapshot tests to run in parellel batches; make items dissapearing on room entry render the bubbles deterministicly so that tests do not depend on room order ([#549](https://github.com/jimhigson/head-over-heels-online/issues/549)) ([2ac95a0](https://github.com/jimhigson/head-over-heels-online/commit/2ac95a07edf15c2397c976e31bc4f675cce5dcff))
* workflows now run on arm64 (not amd64) architecture ([#560](https://github.com/jimhigson/head-over-heels-online/issues/560)) ([6815d1c](https://github.com/jimhigson/head-over-heels-online/commit/6815d1cf67b1474219f13af13bb7abf084a432e4))


### Bug Fixes

* pause/hold banner had unequal spacing on each side ([#557](https://github.com/jimhigson/head-over-heels-online/issues/557)) ([cb673ff](https://github.com/jimhigson/head-over-heels-online/commit/cb673ff620232599eeed78483d6fc44b04a4038c))


### Room Changes

* egyptus2, egyptus3: more solid-looking egyptus floors ([#553](https://github.com/jimhigson/head-over-heels-online/issues/553)) ([2754e9f](https://github.com/jimhigson/head-over-heels-online/commit/2754e9fafef955e7ba09d3095c1b961db460042f))
* egyptus7: small changes ([#551](https://github.com/jimhigson/head-over-heels-online/issues/551)) ([d9e0973](https://github.com/jimhigson/head-over-heels-online/commit/d9e097312f62b1ed9bd9593ce3a3acfbcc27e9e3))


### Sprite Changes

* market scenery improved colourisation on the bricks above the stalls ([#562](https://github.com/jimhigson/head-over-heels-online/issues/562)) ([9f562c5](https://github.com/jimhigson/head-over-heels-online/commit/9f562c5f087da725d825c774011814f18e3fa663))


### Editor Changes

* editor annotations tell user which monsters will wake when the player goes near ([#552](https://github.com/jimhigson/head-over-heels-online/issues/552)) ([7dba80b](https://github.com/jimhigson/head-over-heels-online/commit/7dba80be1e395871f6811000b8749adb496a2b0c))

## [1.5.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.4.0...v1.5.0) (2025-10-12)


### Features

* game mechanics now constrain item movement to 1.5x its normal speed. Prevents extremely fast movement when an item is on top of another item, especially if there is a stack of items which are all moving ([#548](https://github.com/jimhigson/head-over-heels-online/issues/548)) ([f80febb](https://github.com/jimhigson/head-over-heels-online/commit/f80febb9b1ae8dff4b7bea9db25da211b0b9ef9e))
* make easier for head to fall into some small gaps while drifting downwards by applying more sliding vectors ([#547](https://github.com/jimhigson/head-over-heels-online/issues/547)) ([c0dc2cb](https://github.com/jimhigson/head-over-heels-online/commit/c0dc2cb74cfe997c6c782d9137910f26d1e7930b))
* standardise the options menus ([#546](https://github.com/jimhigson/head-over-heels-online/issues/546)) ([a36ba72](https://github.com/jimhigson/head-over-heels-online/commit/a36ba72d3232b8de60cc2190c5a67cd9f81b271d))

## [1.4.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.3.0...v1.4.0) (2025-10-09)


### Features

* cyan rooms get blue/grey shadows; generally darker mid/dark tones in most rooms ([#542](https://github.com/jimhigson/head-over-heels-online/issues/542)) ([dfe61cd](https://github.com/jimhigson/head-over-heels-online/commit/dfe61cda9b5ba2186d8eabfaf309fde59b718eaa))


### Bug Fixes

* picking items up also gets coyote time, for running and jumping and picking up items, to pick up for a short time after leaving the item ([#544](https://github.com/jimhigson/head-over-heels-online/issues/544)) ([07f39dc](https://github.com/jimhigson/head-over-heels-online/commit/07f39dcce017c69f682d7ddd9145fb95654daed8))


### Editor Changes

* lower-case text in editor room annotations ([#543](https://github.com/jimhigson/head-over-heels-online/issues/543)) ([83b7cdb](https://github.com/jimhigson/head-over-heels-online/commit/83b7cdba71edc1020a61ea22efd12452d4783112))

## [1.3.0](https://github.com/jimhigson/head-over-heels-online/compare/v1.2.0...v1.3.0) (2025-10-09)


### Features

* make crt emulation brighter overall ([#538](https://github.com/jimhigson/head-over-heels-online/issues/538)) ([53a16f5](https://github.com/jimhigson/head-over-heels-online/commit/53a16f5e9d4fa07e97d1a1728b54e5919445947a))
* make easier to walk though doors by applying sliding even if more misalligned than before ([#537](https://github.com/jimhigson/head-over-heels-online/issues/537)) ([7cd27dc](https://github.com/jimhigson/head-over-heels-online/commit/7cd27dc8251686523ba52aeb410c1f9c0507db3c))
* make some monster sounds quieter ([#539](https://github.com/jimhigson/head-over-heels-online/issues/539)) ([ee189b5](https://github.com/jimhigson/head-over-heels-online/commit/ee189b5be1e156ca10df5a5d233bd453bd7ad885))


### Bug Fixes

* update shader library to not crash on windows/chrome/d3d ([#540](https://github.com/jimhigson/head-over-heels-online/issues/540)) ([6253c0c](https://github.com/jimhigson/head-over-heels-online/commit/6253c0c18c6f5d1ae7355be75625d2e8bfe916f1))

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


### Room Changes

* finalroom: congratulations scroll minor rewrite ([#532](https://github.com/jimhigson/head-over-heels-online/issues/532)) ([efa4b88](https://github.com/jimhigson/head-over-heels-online/commit/efa4b88933998a333532d78c93bed3f4652fc004))

## [1.1.1](https://github.com/jimhigson/head-over-heels-online/compare/v1.1.0...v1.1.1) (2025-10-08)


### Editor Changes

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
