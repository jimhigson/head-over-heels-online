# TODO

## xml-> json

[ ] parseInt from xml earlier and remove many parseInt 
        
## General


[ ] bug: can make a character fall off the world if on top of other character while they go through a portal
    [?] or push through door by other char?
    [?] should portals only work for the current char/
    [?] make portals solid?    
[ ] scrolls - no space around em,strong etc    
[ ] colon and '>' (citation in scrolls) never shown in sprite-text    
[x] limit maximum scale factor (maximum resolution to render to) to 4x or so, and scale in css past that
    - the game stops running as smoothly past a certain size with crt filter on    
    - on unscaled 4k , get: `changing upscale to 11x for 3840 x 2160`
[ ] remove '@' mapping added by shad    
[ ] "press a button" to exit scrolls (any mapped key that isn't up or down)
[ ] pressing return to start a game shouldn't immediately switch to heels
[ ] replace vignette with a transparent texture etc
[x] load game initially shows menu, with game not started
    [ ] load campaign lazily
[ ] custom key assignments
[ ] persist settings
[ ] colourise option should actually work (and switch in first room)
[ ] actually use joystick/control pad input
[ ] why doesn't work in Safari/iOS?
[ ] sonic-like shield effect when got shield    
    [?] sunglasses?
[ ] collecting crowns (and screen)
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


*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: currentColor; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
5. Use the user's configured `sans` font-feature-settings by default.
6. Use the user's configured `sans` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured `mono` font-family by default.
2. Use the user's configured `mono` font-feature-settings by default.
3. Use the user's configured `mono` font-variation-settings by default.
4. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
  body {
  --tw-bg-opacity: 1;
  background-color: rgb(58 86 79 / var(--tw-bg-opacity, 1));
  --tw-text-opacity: 1;
  color: rgb(252 255 252 / var(--tw-text-opacity, 1));
}

  *:focus {
    outline: none;
  }
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
.pointer-events-none {
  pointer-events: none;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-\[48px\] {
  bottom: 48px;
}
.left-\[50\%\] {
  left: 50%;
}
.right-1 {
  right: calc(var(--block) * 1);
}
.top-\[50\%\] {
  top: 50%;
}
.z-50 {
  z-index: 50;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.col-start-1 {
  grid-column-start: 1;
}
.float-left {
  float: left;
}
.clear-both {
  clear: both;
}
.m-1 {
  margin: calc(var(--block) * 1);
}
.m-\[8px\] {
  margin: 8px;
}
.-mx-1 {
  margin-left: calc(calc(var(--block) * 1) * -1);
  margin-right: calc(calc(var(--block) * 1) * -1);
}
.mb-1 {
  margin-bottom: calc(var(--block) * 1);
}
.me-0 {
  margin-inline-end: 0px;
}
.me-1 {
  margin-inline-end: calc(var(--block) * 1);
}
.ml-1 {
  margin-left: calc(var(--block) * 1);
}
.ml-2 {
  margin-left: calc(var(--block) * 2);
}
.ml-3 {
  margin-left: calc(var(--block) * 3);
}
.ml-auto {
  margin-left: auto;
}
.mr-1 {
  margin-right: calc(var(--block) * 1);
}
.mt-1 {
  margin-top: calc(var(--block) * 1);
}
.mt-2 {
  margin-top: calc(var(--block) * 2);
}
.mb-2 {
  margin-bottom: calc(var(--block) * 2);
}
.box-content {
  box-sizing: content-box;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.grid {
  display: grid;
}
.contents {
  display: contents;
}
.hidden {
  display: none;
}
.h-\[16px\] {
  height: 16px;
}
.h-\[24px\] {
  height: 24px;
}
.h-zx {
  height: calc(var(--scale) * 192px);
}
.max-h-\[300px\] {
  max-height: 300px;
}
.max-h-screen {
  max-height: 100vh;
}
.w-\[--radix-popper-anchor-width\] {
  width: var(--radix-popper-anchor-width);
}
.w-\[16px\] {
  width: 16px;
}
.w-\[48px\] {
  width: 48px;
}
.w-\[500px\] {
  width: 500px;
}
.w-zx {
  width: calc(var(--scale) * 256px);
}
.flex-1 {
  flex: 1 1 0%;
}
.shrink-0 {
  flex-shrink: 0;
}
.flex-grow {
  flex-grow: 1;
}
.origin-top-left {
  transform-origin: top left;
}
.translate-x-\[-50\%\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-\[-50\%\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.cursor-default {
  cursor: default;
}
.cursor-pointer {
  cursor: pointer;
}
.select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.resize {
  resize: both;
}
.grid-cols-menuItems {
  grid-template-columns: max-content 1fr;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-2 {
  gap: calc(var(--block) * 2);
}
.gap-3 {
  gap: calc(var(--block) * 3);
}
.gap-x-1 {
  -moz-column-gap: calc(var(--block) * 1);
       column-gap: calc(var(--block) * 1);
}
.gap-x-2 {
  -moz-column-gap: calc(var(--block) * 2);
       column-gap: calc(var(--block) * 2);
}
.gap-y-oneScaledPix {
  row-gap: calc(var(--scale) * 1px);
}
.gap-y-1 {
  row-gap: calc(var(--block) * 1);
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-y-auto {
  overflow-y: auto;
}
.overflow-x-hidden {
  overflow-x: hidden;
}
.overflow-y-hidden {
  overflow-y: hidden;
}
.overscroll-none {
  overscroll-behavior: none;
}
.whitespace-nowrap {
  white-space: nowrap;
}
.text-nowrap {
  text-wrap: nowrap;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-none {
  border-radius: 0px;
}
.rounded-sm {
  border-radius: 0.125rem;
}
.border {
  border-width: 1px;
}
.border-2 {
  border-width: 2px;
}
.border-4 {
  border-width: 4px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-solid {
  border-style: solid;
}
.border-midRed {
  --tw-border-opacity: 1;
  border-color: rgb(205 123 107 / var(--tw-border-opacity, 1));
}
.border-shadow {
  --tw-border-opacity: 1;
  border-color: rgb(58 86 79 / var(--tw-border-opacity, 1));
}
.bg-alpha {
  --tw-bg-opacity: 1;
  background-color: rgb(253 212 75 / var(--tw-bg-opacity, 1));
}
.bg-alpha\/0 {
  background-color: rgb(253 212 75 / 0);
}
.bg-alpha\/10 {
  background-color: rgb(253 212 75 / 0.1);
}
.bg-alpha\/100 {
  background-color: rgb(253 212 75 / 1);
}
.bg-alpha\/15 {
  background-color: rgb(253 212 75 / 0.15);
}
.bg-alpha\/20 {
  background-color: rgb(253 212 75 / 0.2);
}
.bg-alpha\/25 {
  background-color: rgb(253 212 75 / 0.25);
}
.bg-alpha\/30 {
  background-color: rgb(253 212 75 / 0.3);
}
.bg-alpha\/35 {
  background-color: rgb(253 212 75 / 0.35);
}
.bg-alpha\/40 {
  background-color: rgb(253 212 75 / 0.4);
}
.bg-alpha\/45 {
  background-color: rgb(253 212 75 / 0.45);
}
.bg-alpha\/5 {
  background-color: rgb(253 212 75 / 0.05);
}
.bg-alpha\/50 {
  background-color: rgb(253 212 75 / 0.5);
}
.bg-alpha\/55 {
  background-color: rgb(253 212 75 / 0.55);
}
.bg-alpha\/60 {
  background-color: rgb(253 212 75 / 0.6);
}
.bg-alpha\/65 {
  background-color: rgb(253 212 75 / 0.65);
}
.bg-alpha\/70 {
  background-color: rgb(253 212 75 / 0.7);
}
.bg-alpha\/75 {
  background-color: rgb(253 212 75 / 0.75);
}
.bg-alpha\/80 {
  background-color: rgb(253 212 75 / 0.8);
}
.bg-alpha\/85 {
  background-color: rgb(253 212 75 / 0.85);
}
.bg-alpha\/90 {
  background-color: rgb(253 212 75 / 0.9);
}
.bg-alpha\/95 {
  background-color: rgb(253 212 75 / 0.95);
}
.bg-highlightBeige {
  --tw-bg-opacity: 1;
  background-color: rgb(236 201 152 / var(--tw-bg-opacity, 1));
}
.bg-highlightBeige\/0 {
  background-color: rgb(236 201 152 / 0);
}
.bg-highlightBeige\/10 {
  background-color: rgb(236 201 152 / 0.1);
}
.bg-highlightBeige\/100 {
  background-color: rgb(236 201 152 / 1);
}
.bg-highlightBeige\/15 {
  background-color: rgb(236 201 152 / 0.15);
}
.bg-highlightBeige\/20 {
  background-color: rgb(236 201 152 / 0.2);
}
.bg-highlightBeige\/25 {
  background-color: rgb(236 201 152 / 0.25);
}
.bg-highlightBeige\/30 {
  background-color: rgb(236 201 152 / 0.3);
}
.bg-highlightBeige\/35 {
  background-color: rgb(236 201 152 / 0.35);
}
.bg-highlightBeige\/40 {
  background-color: rgb(236 201 152 / 0.4);
}
.bg-highlightBeige\/45 {
  background-color: rgb(236 201 152 / 0.45);
}
.bg-highlightBeige\/5 {
  background-color: rgb(236 201 152 / 0.05);
}
.bg-highlightBeige\/50 {
  background-color: rgb(236 201 152 / 0.5);
}
.bg-highlightBeige\/55 {
  background-color: rgb(236 201 152 / 0.55);
}
.bg-highlightBeige\/60 {
  background-color: rgb(236 201 152 / 0.6);
}
.bg-highlightBeige\/65 {
  background-color: rgb(236 201 152 / 0.65);
}
.bg-highlightBeige\/70 {
  background-color: rgb(236 201 152 / 0.7);
}
.bg-highlightBeige\/75 {
  background-color: rgb(236 201 152 / 0.75);
}
.bg-highlightBeige\/80 {
  background-color: rgb(236 201 152 / 0.8);
}
.bg-highlightBeige\/85 {
  background-color: rgb(236 201 152 / 0.85);
}
.bg-highlightBeige\/90 {
  background-color: rgb(236 201 152 / 0.9);
}
.bg-highlightBeige\/95 {
  background-color: rgb(236 201 152 / 0.95);
}
.bg-lightBeige {
  --tw-bg-opacity: 1;
  background-color: rgb(221 172 150 / var(--tw-bg-opacity, 1));
}
.bg-lightBeige\/0 {
  background-color: rgb(221 172 150 / 0);
}
.bg-lightBeige\/10 {
  background-color: rgb(221 172 150 / 0.1);
}
.bg-lightBeige\/100 {
  background-color: rgb(221 172 150 / 1);
}
.bg-lightBeige\/15 {
  background-color: rgb(221 172 150 / 0.15);
}
.bg-lightBeige\/20 {
  background-color: rgb(221 172 150 / 0.2);
}
.bg-lightBeige\/25 {
  background-color: rgb(221 172 150 / 0.25);
}
.bg-lightBeige\/30 {
  background-color: rgb(221 172 150 / 0.3);
}
.bg-lightBeige\/35 {
  background-color: rgb(221 172 150 / 0.35);
}
.bg-lightBeige\/40 {
  background-color: rgb(221 172 150 / 0.4);
}
.bg-lightBeige\/45 {
  background-color: rgb(221 172 150 / 0.45);
}
.bg-lightBeige\/5 {
  background-color: rgb(221 172 150 / 0.05);
}
.bg-lightBeige\/50 {
  background-color: rgb(221 172 150 / 0.5);
}
.bg-lightBeige\/55 {
  background-color: rgb(221 172 150 / 0.55);
}
.bg-lightBeige\/60 {
  background-color: rgb(221 172 150 / 0.6);
}
.bg-lightBeige\/65 {
  background-color: rgb(221 172 150 / 0.65);
}
.bg-lightBeige\/70 {
  background-color: rgb(221 172 150 / 0.7);
}
.bg-lightBeige\/75 {
  background-color: rgb(221 172 150 / 0.75);
}
.bg-lightBeige\/80 {
  background-color: rgb(221 172 150 / 0.8);
}
.bg-lightBeige\/85 {
  background-color: rgb(221 172 150 / 0.85);
}
.bg-lightBeige\/90 {
  background-color: rgb(221 172 150 / 0.9);
}
.bg-lightBeige\/95 {
  background-color: rgb(221 172 150 / 0.95);
}
.bg-lightBlack {
  --tw-bg-opacity: 1;
  background-color: rgb(49 76 64 / var(--tw-bg-opacity, 1));
}
.bg-lightBlack\/0 {
  background-color: rgb(49 76 64 / 0);
}
.bg-lightBlack\/10 {
  background-color: rgb(49 76 64 / 0.1);
}
.bg-lightBlack\/100 {
  background-color: rgb(49 76 64 / 1);
}
.bg-lightBlack\/15 {
  background-color: rgb(49 76 64 / 0.15);
}
.bg-lightBlack\/20 {
  background-color: rgb(49 76 64 / 0.2);
}
.bg-lightBlack\/25 {
  background-color: rgb(49 76 64 / 0.25);
}
.bg-lightBlack\/30 {
  background-color: rgb(49 76 64 / 0.3);
}
.bg-lightBlack\/35 {
  background-color: rgb(49 76 64 / 0.35);
}
.bg-lightBlack\/40 {
  background-color: rgb(49 76 64 / 0.4);
}
.bg-lightBlack\/45 {
  background-color: rgb(49 76 64 / 0.45);
}
.bg-lightBlack\/5 {
  background-color: rgb(49 76 64 / 0.05);
}
.bg-lightBlack\/50 {
  background-color: rgb(49 76 64 / 0.5);
}
.bg-lightBlack\/55 {
  background-color: rgb(49 76 64 / 0.55);
}
.bg-lightBlack\/60 {
  background-color: rgb(49 76 64 / 0.6);
}
.bg-lightBlack\/65 {
  background-color: rgb(49 76 64 / 0.65);
}
.bg-lightBlack\/70 {
  background-color: rgb(49 76 64 / 0.7);
}
.bg-lightBlack\/75 {
  background-color: rgb(49 76 64 / 0.75);
}
.bg-lightBlack\/80 {
  background-color: rgb(49 76 64 / 0.8);
}
.bg-lightBlack\/85 {
  background-color: rgb(49 76 64 / 0.85);
}
.bg-lightBlack\/90 {
  background-color: rgb(49 76 64 / 0.9);
}
.bg-lightBlack\/95 {
  background-color: rgb(49 76 64 / 0.95);
}
.bg-lightGrey {
  --tw-bg-opacity: 1;
  background-color: rgb(192 181 178 / var(--tw-bg-opacity, 1));
}
.bg-lightGrey\/0 {
  background-color: rgb(192 181 178 / 0);
}
.bg-lightGrey\/10 {
  background-color: rgb(192 181 178 / 0.1);
}
.bg-lightGrey\/100 {
  background-color: rgb(192 181 178 / 1);
}
.bg-lightGrey\/15 {
  background-color: rgb(192 181 178 / 0.15);
}
.bg-lightGrey\/20 {
  background-color: rgb(192 181 178 / 0.2);
}
.bg-lightGrey\/25 {
  background-color: rgb(192 181 178 / 0.25);
}
.bg-lightGrey\/30 {
  background-color: rgb(192 181 178 / 0.3);
}
.bg-lightGrey\/35 {
  background-color: rgb(192 181 178 / 0.35);
}
.bg-lightGrey\/40 {
  background-color: rgb(192 181 178 / 0.4);
}
.bg-lightGrey\/45 {
  background-color: rgb(192 181 178 / 0.45);
}
.bg-lightGrey\/5 {
  background-color: rgb(192 181 178 / 0.05);
}
.bg-lightGrey\/50 {
  background-color: rgb(192 181 178 / 0.5);
}
.bg-lightGrey\/55 {
  background-color: rgb(192 181 178 / 0.55);
}
.bg-lightGrey\/60 {
  background-color: rgb(192 181 178 / 0.6);
}
.bg-lightGrey\/65 {
  background-color: rgb(192 181 178 / 0.65);
}
.bg-lightGrey\/70 {
  background-color: rgb(192 181 178 / 0.7);
}
.bg-lightGrey\/75 {
  background-color: rgb(192 181 178 / 0.75);
}
.bg-lightGrey\/80 {
  background-color: rgb(192 181 178 / 0.8);
}
.bg-lightGrey\/85 {
  background-color: rgb(192 181 178 / 0.85);
}
.bg-lightGrey\/90 {
  background-color: rgb(192 181 178 / 0.9);
}
.bg-lightGrey\/95 {
  background-color: rgb(192 181 178 / 0.95);
}
.bg-metallicBlue {
  --tw-bg-opacity: 1;
  background-color: rgb(63 112 177 / var(--tw-bg-opacity, 1));
}
.bg-metallicBlue\/0 {
  background-color: rgb(63 112 177 / 0);
}
.bg-metallicBlue\/10 {
  background-color: rgb(63 112 177 / 0.1);
}
.bg-metallicBlue\/100 {
  background-color: rgb(63 112 177 / 1);
}
.bg-metallicBlue\/15 {
  background-color: rgb(63 112 177 / 0.15);
}
.bg-metallicBlue\/20 {
  background-color: rgb(63 112 177 / 0.2);
}
.bg-metallicBlue\/25 {
  background-color: rgb(63 112 177 / 0.25);
}
.bg-metallicBlue\/30 {
  background-color: rgb(63 112 177 / 0.3);
}
.bg-metallicBlue\/35 {
  background-color: rgb(63 112 177 / 0.35);
}
.bg-metallicBlue\/40 {
  background-color: rgb(63 112 177 / 0.4);
}
.bg-metallicBlue\/45 {
  background-color: rgb(63 112 177 / 0.45);
}
.bg-metallicBlue\/5 {
  background-color: rgb(63 112 177 / 0.05);
}
.bg-metallicBlue\/50 {
  background-color: rgb(63 112 177 / 0.5);
}
.bg-metallicBlue\/55 {
  background-color: rgb(63 112 177 / 0.55);
}
.bg-metallicBlue\/60 {
  background-color: rgb(63 112 177 / 0.6);
}
.bg-metallicBlue\/65 {
  background-color: rgb(63 112 177 / 0.65);
}
.bg-metallicBlue\/70 {
  background-color: rgb(63 112 177 / 0.7);
}
.bg-metallicBlue\/75 {
  background-color: rgb(63 112 177 / 0.75);
}
.bg-metallicBlue\/80 {
  background-color: rgb(63 112 177 / 0.8);
}
.bg-metallicBlue\/85 {
  background-color: rgb(63 112 177 / 0.85);
}
.bg-metallicBlue\/90 {
  background-color: rgb(63 112 177 / 0.9);
}
.bg-metallicBlue\/95 {
  background-color: rgb(63 112 177 / 0.95);
}
.bg-midGrey {
  --tw-bg-opacity: 1;
  background-color: rgb(132 123 122 / var(--tw-bg-opacity, 1));
}
.bg-midGrey\/0 {
  background-color: rgb(132 123 122 / 0);
}
.bg-midGrey\/10 {
  background-color: rgb(132 123 122 / 0.1);
}
.bg-midGrey\/100 {
  background-color: rgb(132 123 122 / 1);
}
.bg-midGrey\/15 {
  background-color: rgb(132 123 122 / 0.15);
}
.bg-midGrey\/20 {
  background-color: rgb(132 123 122 / 0.2);
}
.bg-midGrey\/25 {
  background-color: rgb(132 123 122 / 0.25);
}
.bg-midGrey\/30 {
  background-color: rgb(132 123 122 / 0.3);
}
.bg-midGrey\/35 {
  background-color: rgb(132 123 122 / 0.35);
}
.bg-midGrey\/40 {
  background-color: rgb(132 123 122 / 0.4);
}
.bg-midGrey\/45 {
  background-color: rgb(132 123 122 / 0.45);
}
.bg-midGrey\/5 {
  background-color: rgb(132 123 122 / 0.05);
}
.bg-midGrey\/50 {
  background-color: rgb(132 123 122 / 0.5);
}
.bg-midGrey\/55 {
  background-color: rgb(132 123 122 / 0.55);
}
.bg-midGrey\/60 {
  background-color: rgb(132 123 122 / 0.6);
}
.bg-midGrey\/65 {
  background-color: rgb(132 123 122 / 0.65);
}
.bg-midGrey\/70 {
  background-color: rgb(132 123 122 / 0.7);
}
.bg-midGrey\/75 {
  background-color: rgb(132 123 122 / 0.75);
}
.bg-midGrey\/80 {
  background-color: rgb(132 123 122 / 0.8);
}
.bg-midGrey\/85 {
  background-color: rgb(132 123 122 / 0.85);
}
.bg-midGrey\/90 {
  background-color: rgb(132 123 122 / 0.9);
}
.bg-midGrey\/95 {
  background-color: rgb(132 123 122 / 0.95);
}
.bg-midRed {
  --tw-bg-opacity: 1;
  background-color: rgb(205 123 107 / var(--tw-bg-opacity, 1));
}
.bg-midRed\/0 {
  background-color: rgb(205 123 107 / 0);
}
.bg-midRed\/10 {
  background-color: rgb(205 123 107 / 0.1);
}
.bg-midRed\/100 {
  background-color: rgb(205 123 107 / 1);
}
.bg-midRed\/15 {
  background-color: rgb(205 123 107 / 0.15);
}
.bg-midRed\/20 {
  background-color: rgb(205 123 107 / 0.2);
}
.bg-midRed\/25 {
  background-color: rgb(205 123 107 / 0.25);
}
.bg-midRed\/30 {
  background-color: rgb(205 123 107 / 0.3);
}
.bg-midRed\/35 {
  background-color: rgb(205 123 107 / 0.35);
}
.bg-midRed\/40 {
  background-color: rgb(205 123 107 / 0.4);
}
.bg-midRed\/45 {
  background-color: rgb(205 123 107 / 0.45);
}
.bg-midRed\/5 {
  background-color: rgb(205 123 107 / 0.05);
}
.bg-midRed\/50 {
  background-color: rgb(205 123 107 / 0.5);
}
.bg-midRed\/55 {
  background-color: rgb(205 123 107 / 0.55);
}
.bg-midRed\/60 {
  background-color: rgb(205 123 107 / 0.6);
}
.bg-midRed\/65 {
  background-color: rgb(205 123 107 / 0.65);
}
.bg-midRed\/70 {
  background-color: rgb(205 123 107 / 0.7);
}
.bg-midRed\/75 {
  background-color: rgb(205 123 107 / 0.75);
}
.bg-midRed\/80 {
  background-color: rgb(205 123 107 / 0.8);
}
.bg-midRed\/85 {
  background-color: rgb(205 123 107 / 0.85);
}
.bg-midRed\/90 {
  background-color: rgb(205 123 107 / 0.9);
}
.bg-midRed\/95 {
  background-color: rgb(205 123 107 / 0.95);
}
.bg-moss {
  --tw-bg-opacity: 1;
  background-color: rgb(164 155 0 / var(--tw-bg-opacity, 1));
}
.bg-moss\/0 {
  background-color: rgb(164 155 0 / 0);
}
.bg-moss\/10 {
  background-color: rgb(164 155 0 / 0.1);
}
.bg-moss\/100 {
  background-color: rgb(164 155 0 / 1);
}
.bg-moss\/15 {
  background-color: rgb(164 155 0 / 0.15);
}
.bg-moss\/20 {
  background-color: rgb(164 155 0 / 0.2);
}
.bg-moss\/25 {
  background-color: rgb(164 155 0 / 0.25);
}
.bg-moss\/30 {
  background-color: rgb(164 155 0 / 0.3);
}
.bg-moss\/35 {
  background-color: rgb(164 155 0 / 0.35);
}
.bg-moss\/40 {
  background-color: rgb(164 155 0 / 0.4);
}
.bg-moss\/45 {
  background-color: rgb(164 155 0 / 0.45);
}
.bg-moss\/5 {
  background-color: rgb(164 155 0 / 0.05);
}
.bg-moss\/50 {
  background-color: rgb(164 155 0 / 0.5);
}
.bg-moss\/55 {
  background-color: rgb(164 155 0 / 0.55);
}
.bg-moss\/60 {
  background-color: rgb(164 155 0 / 0.6);
}
.bg-moss\/65 {
  background-color: rgb(164 155 0 / 0.65);
}
.bg-moss\/70 {
  background-color: rgb(164 155 0 / 0.7);
}
.bg-moss\/75 {
  background-color: rgb(164 155 0 / 0.75);
}
.bg-moss\/80 {
  background-color: rgb(164 155 0 / 0.8);
}
.bg-moss\/85 {
  background-color: rgb(164 155 0 / 0.85);
}
.bg-moss\/90 {
  background-color: rgb(164 155 0 / 0.9);
}
.bg-moss\/95 {
  background-color: rgb(164 155 0 / 0.95);
}
.bg-pink {
  --tw-bg-opacity: 1;
  background-color: rgb(219 147 212 / var(--tw-bg-opacity, 1));
}
.bg-pink\/0 {
  background-color: rgb(219 147 212 / 0);
}
.bg-pink\/10 {
  background-color: rgb(219 147 212 / 0.1);
}
.bg-pink\/100 {
  background-color: rgb(219 147 212 / 1);
}
.bg-pink\/15 {
  background-color: rgb(219 147 212 / 0.15);
}
.bg-pink\/20 {
  background-color: rgb(219 147 212 / 0.2);
}
.bg-pink\/25 {
  background-color: rgb(219 147 212 / 0.25);
}
.bg-pink\/30 {
  background-color: rgb(219 147 212 / 0.3);
}
.bg-pink\/35 {
  background-color: rgb(219 147 212 / 0.35);
}
.bg-pink\/40 {
  background-color: rgb(219 147 212 / 0.4);
}
.bg-pink\/45 {
  background-color: rgb(219 147 212 / 0.45);
}
.bg-pink\/5 {
  background-color: rgb(219 147 212 / 0.05);
}
.bg-pink\/50 {
  background-color: rgb(219 147 212 / 0.5);
}
.bg-pink\/55 {
  background-color: rgb(219 147 212 / 0.55);
}
.bg-pink\/60 {
  background-color: rgb(219 147 212 / 0.6);
}
.bg-pink\/65 {
  background-color: rgb(219 147 212 / 0.65);
}
.bg-pink\/70 {
  background-color: rgb(219 147 212 / 0.7);
}
.bg-pink\/75 {
  background-color: rgb(219 147 212 / 0.75);
}
.bg-pink\/80 {
  background-color: rgb(219 147 212 / 0.8);
}
.bg-pink\/85 {
  background-color: rgb(219 147 212 / 0.85);
}
.bg-pink\/90 {
  background-color: rgb(219 147 212 / 0.9);
}
.bg-pink\/95 {
  background-color: rgb(219 147 212 / 0.95);
}
.bg-pureBlack {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}
.bg-pureBlack\/0 {
  background-color: rgb(0 0 0 / 0);
}
.bg-pureBlack\/10 {
  background-color: rgb(0 0 0 / 0.1);
}
.bg-pureBlack\/100 {
  background-color: rgb(0 0 0 / 1);
}
.bg-pureBlack\/15 {
  background-color: rgb(0 0 0 / 0.15);
}
.bg-pureBlack\/20 {
  background-color: rgb(0 0 0 / 0.2);
}
.bg-pureBlack\/25 {
  background-color: rgb(0 0 0 / 0.25);
}
.bg-pureBlack\/30 {
  background-color: rgb(0 0 0 / 0.3);
}
.bg-pureBlack\/35 {
  background-color: rgb(0 0 0 / 0.35);
}
.bg-pureBlack\/40 {
  background-color: rgb(0 0 0 / 0.4);
}
.bg-pureBlack\/45 {
  background-color: rgb(0 0 0 / 0.45);
}
.bg-pureBlack\/5 {
  background-color: rgb(0 0 0 / 0.05);
}
.bg-pureBlack\/50 {
  background-color: rgb(0 0 0 / 0.5);
}
.bg-pureBlack\/55 {
  background-color: rgb(0 0 0 / 0.55);
}
.bg-pureBlack\/60 {
  background-color: rgb(0 0 0 / 0.6);
}
.bg-pureBlack\/65 {
  background-color: rgb(0 0 0 / 0.65);
}
.bg-pureBlack\/70 {
  background-color: rgb(0 0 0 / 0.7);
}
.bg-pureBlack\/75 {
  background-color: rgb(0 0 0 / 0.75);
}
.bg-pureBlack\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.bg-pureBlack\/85 {
  background-color: rgb(0 0 0 / 0.85);
}
.bg-pureBlack\/90 {
  background-color: rgb(0 0 0 / 0.9);
}
.bg-pureBlack\/95 {
  background-color: rgb(0 0 0 / 0.95);
}
.bg-redShadow {
  --tw-bg-opacity: 1;
  background-color: rgb(134 100 86 / var(--tw-bg-opacity, 1));
}
.bg-redShadow\/0 {
  background-color: rgb(134 100 86 / 0);
}
.bg-redShadow\/10 {
  background-color: rgb(134 100 86 / 0.1);
}
.bg-redShadow\/100 {
  background-color: rgb(134 100 86 / 1);
}
.bg-redShadow\/15 {
  background-color: rgb(134 100 86 / 0.15);
}
.bg-redShadow\/20 {
  background-color: rgb(134 100 86 / 0.2);
}
.bg-redShadow\/25 {
  background-color: rgb(134 100 86 / 0.25);
}
.bg-redShadow\/30 {
  background-color: rgb(134 100 86 / 0.3);
}
.bg-redShadow\/35 {
  background-color: rgb(134 100 86 / 0.35);
}
.bg-redShadow\/40 {
  background-color: rgb(134 100 86 / 0.4);
}
.bg-redShadow\/45 {
  background-color: rgb(134 100 86 / 0.45);
}
.bg-redShadow\/5 {
  background-color: rgb(134 100 86 / 0.05);
}
.bg-redShadow\/50 {
  background-color: rgb(134 100 86 / 0.5);
}
.bg-redShadow\/55 {
  background-color: rgb(134 100 86 / 0.55);
}
.bg-redShadow\/60 {
  background-color: rgb(134 100 86 / 0.6);
}
.bg-redShadow\/65 {
  background-color: rgb(134 100 86 / 0.65);
}
.bg-redShadow\/70 {
  background-color: rgb(134 100 86 / 0.7);
}
.bg-redShadow\/75 {
  background-color: rgb(134 100 86 / 0.75);
}
.bg-redShadow\/80 {
  background-color: rgb(134 100 86 / 0.8);
}
.bg-redShadow\/85 {
  background-color: rgb(134 100 86 / 0.85);
}
.bg-redShadow\/90 {
  background-color: rgb(134 100 86 / 0.9);
}
.bg-redShadow\/95 {
  background-color: rgb(134 100 86 / 0.95);
}
.bg-replaceDark {
  --tw-bg-opacity: 1;
  background-color: rgb(0 131 128 / var(--tw-bg-opacity, 1));
}
.bg-replaceDark\/0 {
  background-color: rgb(0 131 128 / 0);
}
.bg-replaceDark\/10 {
  background-color: rgb(0 131 128 / 0.1);
}
.bg-replaceDark\/100 {
  background-color: rgb(0 131 128 / 1);
}
.bg-replaceDark\/15 {
  background-color: rgb(0 131 128 / 0.15);
}
.bg-replaceDark\/20 {
  background-color: rgb(0 131 128 / 0.2);
}
.bg-replaceDark\/25 {
  background-color: rgb(0 131 128 / 0.25);
}
.bg-replaceDark\/30 {
  background-color: rgb(0 131 128 / 0.3);
}
.bg-replaceDark\/35 {
  background-color: rgb(0 131 128 / 0.35);
}
.bg-replaceDark\/40 {
  background-color: rgb(0 131 128 / 0.4);
}
.bg-replaceDark\/45 {
  background-color: rgb(0 131 128 / 0.45);
}
.bg-replaceDark\/5 {
  background-color: rgb(0 131 128 / 0.05);
}
.bg-replaceDark\/50 {
  background-color: rgb(0 131 128 / 0.5);
}
.bg-replaceDark\/55 {
  background-color: rgb(0 131 128 / 0.55);
}
.bg-replaceDark\/60 {
  background-color: rgb(0 131 128 / 0.6);
}
.bg-replaceDark\/65 {
  background-color: rgb(0 131 128 / 0.65);
}
.bg-replaceDark\/70 {
  background-color: rgb(0 131 128 / 0.7);
}
.bg-replaceDark\/75 {
  background-color: rgb(0 131 128 / 0.75);
}
.bg-replaceDark\/80 {
  background-color: rgb(0 131 128 / 0.8);
}
.bg-replaceDark\/85 {
  background-color: rgb(0 131 128 / 0.85);
}
.bg-replaceDark\/90 {
  background-color: rgb(0 131 128 / 0.9);
}
.bg-replaceDark\/95 {
  background-color: rgb(0 131 128 / 0.95);
}
.bg-replaceLight {
  --tw-bg-opacity: 1;
  background-color: rgb(0 255 255 / var(--tw-bg-opacity, 1));
}
.bg-replaceLight\/0 {
  background-color: rgb(0 255 255 / 0);
}
.bg-replaceLight\/10 {
  background-color: rgb(0 255 255 / 0.1);
}
.bg-replaceLight\/100 {
  background-color: rgb(0 255 255 / 1);
}
.bg-replaceLight\/15 {
  background-color: rgb(0 255 255 / 0.15);
}
.bg-replaceLight\/20 {
  background-color: rgb(0 255 255 / 0.2);
}
.bg-replaceLight\/25 {
  background-color: rgb(0 255 255 / 0.25);
}
.bg-replaceLight\/30 {
  background-color: rgb(0 255 255 / 0.3);
}
.bg-replaceLight\/35 {
  background-color: rgb(0 255 255 / 0.35);
}
.bg-replaceLight\/40 {
  background-color: rgb(0 255 255 / 0.4);
}
.bg-replaceLight\/45 {
  background-color: rgb(0 255 255 / 0.45);
}
.bg-replaceLight\/5 {
  background-color: rgb(0 255 255 / 0.05);
}
.bg-replaceLight\/50 {
  background-color: rgb(0 255 255 / 0.5);
}
.bg-replaceLight\/55 {
  background-color: rgb(0 255 255 / 0.55);
}
.bg-replaceLight\/60 {
  background-color: rgb(0 255 255 / 0.6);
}
.bg-replaceLight\/65 {
  background-color: rgb(0 255 255 / 0.65);
}
.bg-replaceLight\/70 {
  background-color: rgb(0 255 255 / 0.7);
}
.bg-replaceLight\/75 {
  background-color: rgb(0 255 255 / 0.75);
}
.bg-replaceLight\/80 {
  background-color: rgb(0 255 255 / 0.8);
}
.bg-replaceLight\/85 {
  background-color: rgb(0 255 255 / 0.85);
}
.bg-replaceLight\/90 {
  background-color: rgb(0 255 255 / 0.9);
}
.bg-replaceLight\/95 {
  background-color: rgb(0 255 255 / 0.95);
}
.bg-shadow {
  --tw-bg-opacity: 1;
  background-color: rgb(58 86 79 / var(--tw-bg-opacity, 1));
}
.bg-shadow\/0 {
  background-color: rgb(58 86 79 / 0);
}
.bg-shadow\/10 {
  background-color: rgb(58 86 79 / 0.1);
}
.bg-shadow\/100 {
  background-color: rgb(58 86 79 / 1);
}
.bg-shadow\/15 {
  background-color: rgb(58 86 79 / 0.15);
}
.bg-shadow\/20 {
  background-color: rgb(58 86 79 / 0.2);
}
.bg-shadow\/25 {
  background-color: rgb(58 86 79 / 0.25);
}
.bg-shadow\/30 {
  background-color: rgb(58 86 79 / 0.3);
}
.bg-shadow\/35 {
  background-color: rgb(58 86 79 / 0.35);
}
.bg-shadow\/40 {
  background-color: rgb(58 86 79 / 0.4);
}
.bg-shadow\/45 {
  background-color: rgb(58 86 79 / 0.45);
}
.bg-shadow\/5 {
  background-color: rgb(58 86 79 / 0.05);
}
.bg-shadow\/50 {
  background-color: rgb(58 86 79 / 0.5);
}
.bg-shadow\/55 {
  background-color: rgb(58 86 79 / 0.55);
}
.bg-shadow\/60 {
  background-color: rgb(58 86 79 / 0.6);
}
.bg-shadow\/65 {
  background-color: rgb(58 86 79 / 0.65);
}
.bg-shadow\/70 {
  background-color: rgb(58 86 79 / 0.7);
}
.bg-shadow\/75 {
  background-color: rgb(58 86 79 / 0.75);
}
.bg-shadow\/80 {
  background-color: rgb(58 86 79 / 0.8);
}
.bg-shadow\/85 {
  background-color: rgb(58 86 79 / 0.85);
}
.bg-shadow\/90 {
  background-color: rgb(58 86 79 / 0.9);
}
.bg-shadow\/95 {
  background-color: rgb(58 86 79 / 0.95);
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(252 255 252 / var(--tw-bg-opacity, 1));
}
.bg-white\/0 {
  background-color: rgb(252 255 252 / 0);
}
.bg-white\/10 {
  background-color: rgb(252 255 252 / 0.1);
}
.bg-white\/100 {
  background-color: rgb(252 255 252 / 1);
}
.bg-white\/15 {
  background-color: rgb(252 255 252 / 0.15);
}
.bg-white\/20 {
  background-color: rgb(252 255 252 / 0.2);
}
.bg-white\/25 {
  background-color: rgb(252 255 252 / 0.25);
}
.bg-white\/30 {
  background-color: rgb(252 255 252 / 0.3);
}
.bg-white\/35 {
  background-color: rgb(252 255 252 / 0.35);
}
.bg-white\/40 {
  background-color: rgb(252 255 252 / 0.4);
}
.bg-white\/45 {
  background-color: rgb(252 255 252 / 0.45);
}
.bg-white\/5 {
  background-color: rgb(252 255 252 / 0.05);
}
.bg-white\/50 {
  background-color: rgb(252 255 252 / 0.5);
}
.bg-white\/55 {
  background-color: rgb(252 255 252 / 0.55);
}
.bg-white\/60 {
  background-color: rgb(252 255 252 / 0.6);
}
.bg-white\/65 {
  background-color: rgb(252 255 252 / 0.65);
}
.bg-white\/70 {
  background-color: rgb(252 255 252 / 0.7);
}
.bg-white\/75 {
  background-color: rgb(252 255 252 / 0.75);
}
.bg-white\/80 {
  background-color: rgb(252 255 252 / 0.8);
}
.bg-white\/85 {
  background-color: rgb(252 255 252 / 0.85);
}
.bg-white\/90 {
  background-color: rgb(252 255 252 / 0.9);
}
.bg-white\/95 {
  background-color: rgb(252 255 252 / 0.95);
}
.bg-opacity-0 {
  --tw-bg-opacity: 0;
}
.bg-opacity-10 {
  --tw-bg-opacity: 0.1;
}
.bg-opacity-100 {
  --tw-bg-opacity: 1;
}
.bg-opacity-15 {
  --tw-bg-opacity: 0.15;
}
.bg-opacity-20 {
  --tw-bg-opacity: 0.2;
}
.bg-opacity-25 {
  --tw-bg-opacity: 0.25;
}
.bg-opacity-30 {
  --tw-bg-opacity: 0.3;
}
.bg-opacity-35 {
  --tw-bg-opacity: 0.35;
}
.bg-opacity-40 {
  --tw-bg-opacity: 0.4;
}
.bg-opacity-45 {
  --tw-bg-opacity: 0.45;
}
.bg-opacity-5 {
  --tw-bg-opacity: 0.05;
}
.bg-opacity-50 {
  --tw-bg-opacity: 0.5;
}
.bg-opacity-55 {
  --tw-bg-opacity: 0.55;
}
.bg-opacity-60 {
  --tw-bg-opacity: 0.6;
}
.bg-opacity-65 {
  --tw-bg-opacity: 0.65;
}
.bg-opacity-70 {
  --tw-bg-opacity: 0.7;
}
.bg-opacity-75 {
  --tw-bg-opacity: 0.75;
}
.bg-opacity-80 {
  --tw-bg-opacity: 0.8;
}
.bg-opacity-85 {
  --tw-bg-opacity: 0.85;
}
.bg-opacity-90 {
  --tw-bg-opacity: 0.9;
}
.bg-opacity-95 {
  --tw-bg-opacity: 0.95;
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
.bg-gradient-to-bl {
  background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));
}
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.bg-gradient-to-l {
  background-image: linear-gradient(to left, var(--tw-gradient-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}
.bg-gradient-to-tl {
  background-image: linear-gradient(to top left, var(--tw-gradient-stops));
}
.bg-gradient-to-tr {
  background-image: linear-gradient(to top right, var(--tw-gradient-stops));
}
.bg-none {
  background-image: none;
}
.bg-auto {
  background-size: auto;
}
.bg-contain {
  background-size: contain;
}
.bg-cover {
  background-size: cover;
}
.bg-fixed {
  background-attachment: fixed;
}
.bg-local {
  background-attachment: local;
}
.bg-scroll {
  background-attachment: scroll;
}
.bg-clip-border {
  background-clip: border-box;
}
.bg-clip-padding {
  background-clip: padding-box;
}
.bg-clip-content {
  background-clip: content-box;
}
.bg-clip-text {
  -webkit-background-clip: text;
          background-clip: text;
}
.bg-bottom {
  background-position: bottom;
}
.bg-center {
  background-position: center;
}
.bg-left {
  background-position: left;
}
.bg-left-bottom {
  background-position: left bottom;
}
.bg-left-top {
  background-position: left top;
}
.bg-right {
  background-position: right;
}
.bg-right-bottom {
  background-position: right bottom;
}
.bg-right-top {
  background-position: right top;
}
.bg-top {
  background-position: top;
}
.bg-repeat {
  background-repeat: repeat;
}
.bg-no-repeat {
  background-repeat: no-repeat;
}
.bg-repeat-x {
  background-repeat: repeat-x;
}
.bg-repeat-y {
  background-repeat: repeat-y;
}
.bg-repeat-round {
  background-repeat: round;
}
.bg-repeat-space {
  background-repeat: space;
}
.bg-origin-border {
  background-origin: border-box;
}
.bg-origin-padding {
  background-origin: padding-box;
}
.bg-origin-content {
  background-origin: content-box;
}
.p-0 {
  padding: 0px;
}
.p-1 {
  padding: calc(var(--block) * 1);
}
.p-4 {
  padding: calc(var(--block) * 4);
}
.p-\[16px\] {
  padding: 16px;
}
.p-\[8px\] {
  padding: 8px;
}
.px-1 {
  padding-left: calc(var(--block) * 1);
  padding-right: calc(var(--block) * 1);
}
.px-2 {
  padding-left: calc(var(--block) * 2);
  padding-right: calc(var(--block) * 2);
}
.px-3 {
  padding-left: calc(var(--block) * 3);
  padding-right: calc(var(--block) * 3);
}
.py-1 {
  padding-top: calc(var(--block) * 1);
  padding-bottom: calc(var(--block) * 1);
}
.py-3 {
  padding-top: calc(var(--block) * 3);
  padding-bottom: calc(var(--block) * 3);
}
.pb-0 {
  padding-bottom: 0px;
}
.pb-1 {
  padding-bottom: calc(var(--block) * 1);
}
.pl-1 {
  padding-left: calc(var(--block) * 1);
}
.pt-1 {
  padding-top: calc(var(--block) * 1);
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.indent-1 {
  text-indent: calc(var(--block) * 1);
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.text-\[0px\] {
  font-size: 0px;
}
.text-\[1px\] {
  font-size: 1px;
}
.text-\[10px\] {
  font-size: 10px;
}
.font-medium {
  font-weight: 500;
}
.ordinal {
  --tw-ordinal: ordinal;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.leading-none {
  line-height: 0;
}
.leading-multilineText {
  line-height: calc(var(--block) + (var(--scale) * 1px));
}
.tracking-widest {
  letter-spacing: 0.1em;
}
.text-highlightBeige {
  --tw-text-opacity: 1;
  color: rgb(236 201 152 / var(--tw-text-opacity, 1));
}
.text-lightGrey {
  --tw-text-opacity: 1;
  color: rgb(192 181 178 / var(--tw-text-opacity, 1));
}
.text-metallicBlue {
  --tw-text-opacity: 1;
  color: rgb(63 112 177 / var(--tw-text-opacity, 1));
}
.text-midGrey {
  --tw-text-opacity: 1;
  color: rgb(132 123 122 / var(--tw-text-opacity, 1));
}
.text-midRed {
  --tw-text-opacity: 1;
  color: rgb(205 123 107 / var(--tw-text-opacity, 1));
}
.text-moss {
  --tw-text-opacity: 1;
  color: rgb(164 155 0 / var(--tw-text-opacity, 1));
}
.text-pink {
  --tw-text-opacity: 1;
  color: rgb(219 147 212 / var(--tw-text-opacity, 1));
}
.text-redShadow {
  --tw-text-opacity: 1;
  color: rgb(134 100 86 / var(--tw-text-opacity, 1));
}
.text-shadow {
  --tw-text-opacity: 1;
  color: rgb(58 86 79 / var(--tw-text-opacity, 1));
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(252 255 252 / var(--tw-text-opacity, 1));
}
.text-\[\] {
  color: ;
}
.bg-blend-normal {
  background-blend-mode: normal;
}
.bg-blend-multiply {
  background-blend-mode: multiply;
}
.bg-blend-screen {
  background-blend-mode: screen;
}
.bg-blend-overlay {
  background-blend-mode: overlay;
}
.bg-blend-darken {
  background-blend-mode: darken;
}
.bg-blend-lighten {
  background-blend-mode: lighten;
}
.bg-blend-color-dodge {
  background-blend-mode: color-dodge;
}
.bg-blend-color-burn {
  background-blend-mode: color-burn;
}
.bg-blend-hard-light {
  background-blend-mode: hard-light;
}
.bg-blend-soft-light {
  background-blend-mode: soft-light;
}
.bg-blend-difference {
  background-blend-mode: difference;
}
.bg-blend-exclusion {
  background-blend-mode: exclusion;
}
.bg-blend-hue {
  background-blend-mode: hue;
}
.bg-blend-saturation {
  background-blend-mode: saturation;
}
.bg-blend-color {
  background-blend-mode: color;
}
.bg-blend-luminosity {
  background-blend-mode: luminosity;
}
.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.outline {
  outline-style: solid;
}
.ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.sprite {
  display: inline-block;
  width: calc(var(--w) * var(--scale, 1));
  height: calc(var(--h) * var(--scale, 1) * var(--doubleHeight, 1));
  background-image: var(--spritesheetUrl);
  background-position: calc(-1 * var(--x) * var(--scale, 1)) calc(-1 * var(--y) * var(--scale, 1) * var(--doubleHeight, 1));
  background-size: calc(var(--spritesheetW) * var(--scale, 1)) calc( var(--spritesheetH) * var(--scale, 1) * var(--doubleHeight, 1));
  image-rendering: pixelated;
}
.sprite-tinted {
  display: inline-block;
  width: calc(var(--w) * var(--scale, 1));
  height: calc(var(--h) * var(--scale, 1) * var(--doubleHeight, 1));
  -webkit-mask-image: var(--spritesheetUrl);
          mask-image: var(--spritesheetUrl);
  -webkit-mask-position: calc(-1 * var(--x) * var(--scale, 1)) calc(-1 * var(--y) * var(--scale, 1) * var(--doubleHeight, 1));
          mask-position: calc(-1 * var(--x) * var(--scale, 1)) calc(-1 * var(--y) * var(--scale, 1) * var(--doubleHeight, 1));
  -webkit-mask-size: calc(var(--spritesheetW) * var(--scale, 1)) calc( var(--spritesheetH) * var(--scale, 1) * var(--doubleHeight, 1));
          mask-size: calc(var(--spritesheetW) * var(--scale, 1)) calc( var(--spritesheetH) * var(--scale, 1) * var(--doubleHeight, 1));
  image-rendering: pixelated;
  background-color: currentColor;
}
.set-spritesheet-vars {
  --spritesheetUrl: url('/gfx/sprites.png');
  --spritesheetW: 640px;
  --spritesheetH: 512px;
}
.sprites-double-height {
  --doubleHeight: 2;
}
.texture-floorEdge\.right {
  --w: 8px;
  --h: 9px;
  --x: 400px;
  --y: 502px;
}
.texture-floorEdge\.towards {
  --w: 8px;
  --h: 9px;
  --x: 391px;
  --y: 502px;
}
.texture-floorOverdraw\.right {
  --w: 8px;
  --h: 9px;
  --x: 400px;
  --y: 492px;
}
.texture-floorOverdraw\.towards {
  --w: 8px;
  --h: 9px;
  --x: 391px;
  --y: 492px;
}
.texture-generic\.floor\.overdraw {
  --w: 16px;
  --h: 32px;
  --x: 180px;
  --y: 113px;
}
.texture-generic\.wall\.overdraw {
  --w: 16px;
  --h: 32px;
  --x: 197px;
  --y: 113px;
}
.texture-shadow\.wall\.y {
  --w: 36px;
  --h: 16px;
  --x: 410px;
  --y: 129px;
}
.texture-generic\.floor\.deadly {
  --w: 32px;
  --h: 16px;
  --x: 376px;
  --y: 454px;
}
.texture-generic\.dark\.floor\.deadly {
  --w: 32px;
  --h: 16px;
  --x: 376px;
  --y: 471px;
}
.texture-generic\.door\.legs\.pillar {
  --w: 16px;
  --h: 12px;
  --x: 237px;
  --y: 92px;
}
.texture-generic\.door\.legs\.base {
  --w: 16px;
  --h: 9px;
  --x: 237px;
  --y: 104px;
}
.texture-generic\.door\.legs\.threshold\.double\.x {
  --w: 32px;
  --h: 24px;
  --x: 221px;
  --y: 68px;
}
.texture-generic\.door\.legs\.threshold\.double\.y {
  --w: 32px;
  --h: 24px;
  --x: 186px;
  --y: 68px;
}
.texture-shadowMask\.door\.legs\.threshold\.double\.y {
  --w: 32px;
  --h: 21px;
  --x: 254px;
  --y: 68px;
}
.texture-generic\.door\.floatingThreshold\.x {
  --w: 26px;
  --h: 19px;
  --x: 209px;
  --y: 93px;
}
.texture-generic\.door\.floatingThreshold\.y {
  --w: 26px;
  --h: 19px;
  --x: 180px;
  --y: 93px;
}
.texture-shadowMask\.door\.floatingThreshold\.double\.y {
  --w: 42px;
  --h: 21px;
  --x: 254px;
  --y: 90px;
}
.texture-shadow\.door\.floatingThreshold\.double\.y {
  --w: 42px;
  --h: 21px;
  --x: 297px;
  --y: 90px;
}
.texture-teleporter {
  --w: 32px;
  --h: 28px;
  --x: 2px;
  --y: 478px;
}
.texture-teleporter\.flashing\.1 {
  --w: 32px;
  --h: 28px;
  --x: 35px;
  --y: 478px;
}
.texture-teleporter\.flashing\.2 {
  --w: 32px;
  --h: 28px;
  --x: 68px;
  --y: 478px;
}
.texture-shadowMask\.teleporter {
  --w: 32px;
  --h: 28px;
  --x: 101px;
  --y: 478px;
}
.texture-barrier\.x {
  --w: 24px;
  --h: 24px;
  --x: 335px;
  --y: 241px;
}
.texture-barrier\.y {
  --w: 24px;
  --h: 24px;
  --x: 310px;
  --y: 241px;
}
.texture-shadowMask\.barrier\.y {
  --w: 24px;
  --h: 24px;
  --x: 310px;
  --y: 216px;
}
.texture-shadow\.barrier\.y {
  --w: 24px;
  --h: 24px;
  --x: 310px;
  --y: 266px;
}
.texture-block\.organic {
  --w: 32px;
  --h: 28px;
  --x: 160px;
  --y: 449px;
}
.texture-block\.organic\.dark {
  --w: 32px;
  --h: 28px;
  --x: 160px;
  --y: 391px;
}
.texture-block\.organic\.disappearing {
  --w: 32px;
  --h: 28px;
  --x: 160px;
  --y: 420px;
}
.texture-block\.organic\.dark\.disappearing {
  --w: 32px;
  --h: 28px;
  --x: 127px;
  --y: 391px;
}
.texture-block\.artificial {
  --w: 32px;
  --h: 28px;
  --x: 127px;
  --y: 449px;
}
.texture-block\.artificial\.disappearing {
  --w: 32px;
  --h: 28px;
  --x: 127px;
  --y: 449px;
}
.texture-block\.tower {
  --w: 24px;
  --h: 24px;
  --x: 27px;
  --y: 374px;
}
.texture-block\.tower\.disappearing {
  --w: 24px;
  --h: 24px;
  --x: 27px;
  --y: 374px;
}
.texture-volcano {
  --w: 32px;
  --h: 28px;
  --x: 193px;
  --y: 420px;
}
.texture-shadowMask\.volcano {
  --w: 32px;
  --h: 28px;
  --x: 193px;
  --y: 449px;
}
.texture-toaster {
  --w: 32px;
  --h: 28px;
  --x: 226px;
  --y: 449px;
}
.texture-spikes {
  --w: 32px;
  --h: 28px;
  --x: 333px;
  --y: 427px;
}
.texture-shadowMask\.spikes {
  --w: 32px;
  --h: 28px;
  --x: 333px;
  --y: 397px;
}
.texture-conveyor\.x\.1 {
  --w: 32px;
  --h: 28px;
  --x: 409px;
  --y: 454px;
}
.texture-conveyor\.x\.2 {
  --w: 32px;
  --h: 28px;
  --x: 442px;
  --y: 454px;
}
.texture-conveyor\.x\.3 {
  --w: 32px;
  --h: 28px;
  --x: 475px;
  --y: 454px;
}
.texture-conveyor\.x\.4 {
  --w: 32px;
  --h: 28px;
  --x: 508px;
  --y: 454px;
}
.texture-conveyor\.x\.5 {
  --w: 32px;
  --h: 28px;
  --x: 541px;
  --y: 454px;
}
.texture-conveyor\.x\.6 {
  --w: 32px;
  --h: 28px;
  --x: 574px;
  --y: 454px;
}
.texture-conveyor\.x\.7 {
  --w: 32px;
  --h: 28px;
  --x: 607px;
  --y: 454px;
}
.texture-conveyor\.y\.1 {
  --w: 32px;
  --h: 28px;
  --x: 409px;
  --y: 483px;
}
.texture-conveyor\.y\.2 {
  --w: 32px;
  --h: 28px;
  --x: 442px;
  --y: 483px;
}
.texture-conveyor\.y\.3 {
  --w: 32px;
  --h: 28px;
  --x: 475px;
  --y: 483px;
}
.texture-conveyor\.y\.4 {
  --w: 32px;
  --h: 28px;
  --x: 508px;
  --y: 483px;
}
.texture-conveyor\.y\.5 {
  --w: 32px;
  --h: 28px;
  --x: 541px;
  --y: 483px;
}
.texture-conveyor\.y\.6 {
  --w: 32px;
  --h: 28px;
  --x: 574px;
  --y: 483px;
}
.texture-conveyor\.y\.7 {
  --w: 32px;
  --h: 28px;
  --x: 607px;
  --y: 483px;
}
.texture-bunny {
  --w: 24px;
  --h: 24px;
  --x: 77px;
  --y: 349px;
}
.texture-scroll {
  --w: 24px;
  --h: 24px;
  --x: 52px;
  --y: 324px;
}
.texture-shadowMask\.scroll {
  --w: 24px;
  --h: 24px;
  --x: 27px;
  --y: 324px;
}
.texture-shadow\.scroll {
  --w: 24px;
  --h: 24px;
  --x: 2px;
  --y: 324px;
}
.texture-doughnuts {
  --w: 24px;
  --h: 24px;
  --x: 77px;
  --y: 324px;
}
.texture-crown {
  --w: 24px;
  --h: 24px;
  --x: 202px;
  --y: 374px;
}
.texture-hooter {
  --w: 24px;
  --h: 24px;
  --x: 202px;
  --y: 349px;
}
.texture-bag {
  --w: 24px;
  --h: 24px;
  --x: 227px;
  --y: 349px;
}
.texture-fish\.1 {
  --w: 24px;
  --h: 24px;
  --x: 177px;
  --y: 324px;
}
.texture-fish\.2 {
  --w: 24px;
  --h: 24px;
  --x: 202px;
  --y: 324px;
}
.texture-spring\.compressed {
  --w: 24px;
  --h: 24px;
  --x: 2px;
  --y: 453px;
}
.texture-spring\.released {
  --w: 24px;
  --h: 24px;
  --x: 27px;
  --y: 453px;
}
.texture-lift\.1 {
  --w: 24px;
  --h: 24px;
  --x: 233px;
  --y: 481px;
}
.texture-lift\.2 {
  --w: 24px;
  --h: 24px;
  --x: 258px;
  --y: 481px;
}
.texture-lift\.3 {
  --w: 24px;
  --h: 24px;
  --x: 283px;
  --y: 481px;
}
.texture-lift\.4 {
  --w: 24px;
  --h: 24px;
  --x: 308px;
  --y: 481px;
}
.texture-lift\.static {
  --w: 24px;
  --h: 24px;
  --x: 333px;
  --y: 481px;
}
.texture-dalek\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 4px;
}
.texture-dalek\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 4px;
}
.texture-shadowMask\.dalek {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 29px;
}
.texture-homingBot {
  --w: 24px;
  --h: 24px;
  --x: 93px;
  --y: 102px;
}
.texture-joystick {
  --w: 24px;
  --h: 24px;
  --x: 2px;
  --y: 374px;
}
.texture-shadowMask\.joystick {
  --w: 24px;
  --h: 24px;
  --x: 2px;
  --y: 349px;
}
.texture-stepStool {
  --w: 32px;
  --h: 28px;
  --x: 252px;
  --y: 366px;
}
.texture-shadowMask\.stepStool {
  --w: 32px;
  --h: 28px;
  --x: 285px;
  --y: 366px;
}
.texture-book\.x {
  --w: 32px;
  --h: 28px;
  --x: 167px;
  --y: 478px;
}
.texture-book\.y {
  --w: 32px;
  --h: 28px;
  --x: 200px;
  --y: 478px;
}
.texture-sandwich {
  --w: 32px;
  --h: 28px;
  --x: 2px;
  --y: 399px;
}
.texture-sticks {
  --w: 24px;
  --h: 24px;
  --x: 2px;
  --y: 428px;
}
.texture-cube {
  --w: 24px;
  --h: 24px;
  --x: 27px;
  --y: 428px;
}
.texture-drum {
  --w: 24px;
  --h: 24px;
  --x: 52px;
  --y: 428px;
}
.texture-switch\.left {
  --w: 24px;
  --h: 24px;
  --x: 52px;
  --y: 453px;
}
.texture-switch\.right {
  --w: 24px;
  --h: 24px;
  --x: 77px;
  --y: 453px;
}
.texture-shadowMask\.switch {
  --w: 24px;
  --h: 24px;
  --x: 77px;
  --y: 428px;
}
.texture-skiHead\.starsAndStripes\.left {
  --w: 24px;
  --h: 32px;
  --x: 274px;
  --y: 131px;
}
.texture-skiHead\.starsAndStripes\.away {
  --w: 24px;
  --h: 32px;
  --x: 299px;
  --y: 131px;
}
.texture-skiHead\.starsAndStripes\.towards {
  --w: 24px;
  --h: 32px;
  --x: 274px;
  --y: 164px;
}
.texture-skiHead\.starsAndStripes\.right {
  --w: 24px;
  --h: 32px;
  --x: 299px;
  --y: 164px;
}
.texture-skiHead\.greenAndPink\.left {
  --w: 24px;
  --h: 32px;
  --x: 224px;
  --y: 131px;
}
.texture-skiHead\.greenAndPink\.away {
  --w: 24px;
  --h: 32px;
  --x: 249px;
  --y: 131px;
}
.texture-skiHead\.greenAndPink\.towards {
  --w: 24px;
  --h: 32px;
  --x: 224px;
  --y: 164px;
}
.texture-skiHead\.greenAndPink\.right {
  --w: 24px;
  --h: 32px;
  --x: 249px;
  --y: 164px;
}
.texture-charles\.left {
  --w: 24px;
  --h: 24px;
  --x: 118px;
  --y: 34px;
}
.texture-charles\.away {
  --w: 24px;
  --h: 24px;
  --x: 143px;
  --y: 34px;
}
.texture-charles\.towards {
  --w: 24px;
  --h: 24px;
  --x: 118px;
  --y: 59px;
}
.texture-charles\.right {
  --w: 24px;
  --h: 24px;
  --x: 143px;
  --y: 59px;
}
.texture-cyberman\.left {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 29px;
}
.texture-cyberman\.away {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 29px;
}
.texture-cyberman\.towards {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 54px;
}
.texture-cyberman\.right {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 54px;
}
.texture-monkey\.left {
  --w: 24px;
  --h: 24px;
  --x: 118px;
  --y: 90px;
}
.texture-monkey\.away {
  --w: 24px;
  --h: 24px;
  --x: 143px;
  --y: 90px;
}
.texture-monkey\.towards {
  --w: 24px;
  --h: 24px;
  --x: 118px;
  --y: 115px;
}
.texture-monkey\.right {
  --w: 24px;
  --h: 24px;
  --x: 143px;
  --y: 115px;
}
.texture-elephant\.left {
  --w: 24px;
  --h: 24px;
  --x: 118px;
  --y: 146px;
}
.texture-elephant\.away {
  --w: 24px;
  --h: 24px;
  --x: 143px;
  --y: 146px;
}
.texture-elephant\.towards {
  --w: 24px;
  --h: 24px;
  --x: 118px;
  --y: 171px;
}
.texture-elephant\.right {
  --w: 24px;
  --h: 24px;
  --x: 143px;
  --y: 171px;
}
.texture-computerBot\.left {
  --w: 24px;
  --h: 24px;
  --x: 173px;
  --y: 146px;
}
.texture-computerBot\.away {
  --w: 24px;
  --h: 24px;
  --x: 198px;
  --y: 146px;
}
.texture-computerBot\.towards {
  --w: 24px;
  --h: 24px;
  --x: 173px;
  --y: 171px;
}
.texture-computerBot\.right {
  --w: 24px;
  --h: 24px;
  --x: 198px;
  --y: 171px;
}
.texture-bubbles\.cold\.1 {
  --w: 24px;
  --h: 24px;
  --x: 79px;
  --y: 4px;
}
.texture-bubbles\.cold\.2 {
  --w: 24px;
  --h: 24px;
  --x: 104px;
  --y: 4px;
}
.texture-bubbles\.taupe\.1 {
  --w: 24px;
  --h: 24px;
  --x: 102px;
  --y: 324px;
}
.texture-bubbles\.taupe\.2 {
  --w: 24px;
  --h: 24px;
  --x: 127px;
  --y: 324px;
}
.texture-bubbles\.taupe\.3 {
  --w: 24px;
  --h: 24px;
  --x: 152px;
  --y: 324px;
}
.texture-bubbles\.white\.1 {
  --w: 24px;
  --h: 24px;
  --x: 102px;
  --y: 349px;
}
.texture-bubbles\.white\.2 {
  --w: 24px;
  --h: 24px;
  --x: 127px;
  --y: 349px;
}
.texture-bubbles\.white\.3 {
  --w: 24px;
  --h: 24px;
  --x: 152px;
  --y: 349px;
}
.texture-bubbles\.fish\.1 {
  --w: 24px;
  --h: 24px;
  --x: 227px;
  --y: 324px;
}
.texture-bubbles\.fish\.2 {
  --w: 24px;
  --h: 24px;
  --x: 252px;
  --y: 324px;
}
.texture-bubbles\.fish\.3 {
  --w: 24px;
  --h: 24px;
  --x: 277px;
  --y: 324px;
}
.texture-turtle\.left\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 137px;
}
.texture-turtle\.left\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 137px;
}
.texture-turtle\.away\.1 {
  --w: 24px;
  --h: 24px;
  --x: 55px;
  --y: 137px;
}
.texture-turtle\.away\.2 {
  --w: 24px;
  --h: 24px;
  --x: 80px;
  --y: 137px;
}
.texture-turtle\.towards\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 163px;
}
.texture-turtle\.towards\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 163px;
}
.texture-turtle\.right\.1 {
  --w: 24px;
  --h: 24px;
  --x: 55px;
  --y: 163px;
}
.texture-turtle\.right\.2 {
  --w: 24px;
  --h: 24px;
  --x: 80px;
  --y: 163px;
}
.texture-helicopterBug\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 188px;
}
.texture-helicopterBug\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 188px;
}
.texture-helicopterBug\.3 {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 188px;
}
.texture-helicopterBug\.4 {
  --w: 24px;
  --h: 24px;
  --x: 79px;
  --y: 188px;
}
.texture-hushPuppy {
  --w: 32px;
  --h: 28px;
  --x: 209px;
  --y: 291px;
}
.texture-shadowMask\.hushPuppy {
  --w: 32px;
  --h: 28px;
  --x: 242px;
  --y: 291px;
}
.texture-ball {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 4px;
}
.texture-puck {
  --w: 24px;
  --h: 24px;
  --x: 102px;
  --y: 428px;
}
.texture-puck\.deadly {
  --w: 24px;
  --h: 24px;
  --x: 102px;
  --y: 453px;
}
.texture-head\.walking\.towards\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 266px;
}
.texture-head\.walking\.towards\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 266px;
}
.texture-head\.walking\.towards\.3 {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 266px;
}
.texture-head\.walking\.right\.1 {
  --w: 24px;
  --h: 24px;
  --x: 80px;
  --y: 266px;
}
.texture-head\.walking\.right\.2 {
  --w: 24px;
  --h: 24px;
  --x: 105px;
  --y: 266px;
}
.texture-head\.walking\.right\.3 {
  --w: 24px;
  --h: 24px;
  --x: 130px;
  --y: 266px;
}
.texture-head\.walking\.left\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 240px;
}
.texture-head\.walking\.left\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 240px;
}
.texture-head\.walking\.left\.3 {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 240px;
}
.texture-head\.walking\.away\.1 {
  --w: 24px;
  --h: 24px;
  --x: 80px;
  --y: 240px;
}
.texture-head\.walking\.away\.2 {
  --w: 24px;
  --h: 24px;
  --x: 105px;
  --y: 240px;
}
.texture-head\.walking\.away\.3 {
  --w: 24px;
  --h: 24px;
  --x: 130px;
  --y: 240px;
}
.texture-head\.blinking\.towards {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 291px;
}
.texture-head\.blinking\.right {
  --w: 24px;
  --h: 24px;
  --x: 130px;
  --y: 291px;
}
.texture-head\.falling\.towards {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 291px;
}
.texture-head\.falling\.right {
  --w: 24px;
  --h: 24px;
  --x: 105px;
  --y: 291px;
}
.texture-bubbles\.head\.1 {
  --w: 24px;
  --h: 24px;
  --x: 4px;
  --y: 215px;
}
.texture-bubbles\.head\.2 {
  --w: 24px;
  --h: 24px;
  --x: 29px;
  --y: 215px;
}
.texture-bubbles\.head\.3 {
  --w: 24px;
  --h: 24px;
  --x: 54px;
  --y: 215px;
}
.texture-bubbles\.head\.4 {
  --w: 24px;
  --h: 24px;
  --x: 79px;
  --y: 215px;
}
.texture-bubbles\.head\.5 {
  --w: 24px;
  --h: 24px;
  --x: 104px;
  --y: 215px;
}
.texture-bubbles\.head\.6 {
  --w: 24px;
  --h: 24px;
  --x: 129px;
  --y: 215px;
}
.texture-heels\.walking\.towards\.1 {
  --w: 24px;
  --h: 24px;
  --x: 159px;
  --y: 266px;
}
.texture-heels\.walking\.towards\.2 {
  --w: 24px;
  --h: 24px;
  --x: 184px;
  --y: 266px;
}
.texture-heels\.walking\.towards\.3 {
  --w: 24px;
  --h: 24px;
  --x: 209px;
  --y: 266px;
}
.texture-heels\.walking\.right\.1 {
  --w: 24px;
  --h: 24px;
  --x: 235px;
  --y: 266px;
}
.texture-heels\.walking\.right\.2 {
  --w: 24px;
  --h: 24px;
  --x: 260px;
  --y: 266px;
}
.texture-heels\.walking\.right\.3 {
  --w: 24px;
  --h: 24px;
  --x: 285px;
  --y: 266px;
}
.texture-heels\.walking\.left\.1 {
  --w: 24px;
  --h: 24px;
  --x: 159px;
  --y: 240px;
}
.texture-heels\.walking\.left\.2 {
  --w: 24px;
  --h: 24px;
  --x: 184px;
  --y: 240px;
}
.texture-heels\.walking\.left\.3 {
  --w: 24px;
  --h: 24px;
  --x: 209px;
  --y: 240px;
}
.texture-heels\.walking\.away\.1 {
  --w: 24px;
  --h: 24px;
  --x: 235px;
  --y: 240px;
}
.texture-heels\.walking\.away\.2 {
  --w: 24px;
  --h: 24px;
  --x: 260px;
  --y: 240px;
}
.texture-heels\.walking\.away\.3 {
  --w: 24px;
  --h: 24px;
  --x: 285px;
  --y: 240px;
}
.texture-bubbles\.heels\.1 {
  --w: 24px;
  --h: 24px;
  --x: 159px;
  --y: 215px;
}
.texture-bubbles\.heels\.2 {
  --w: 24px;
  --h: 24px;
  --x: 184px;
  --y: 215px;
}
.texture-bubbles\.heels\.3 {
  --w: 24px;
  --h: 24px;
  --x: 209px;
  --y: 215px;
}
.texture-bubbles\.heels\.4 {
  --w: 24px;
  --h: 24px;
  --x: 234px;
  --y: 215px;
}
.texture-bubbles\.heels\.5 {
  --w: 24px;
  --h: 24px;
  --x: 259px;
  --y: 215px;
}
.texture-bubbles\.heels\.6 {
  --w: 24px;
  --h: 24px;
  --x: 284px;
  --y: 215px;
}
.texture-blacktooth\.dark\.wall\.armour\.left {
  --w: 16px;
  --h: 56px;
  --x: 544px;
  --y: 148px;
}
.texture-blacktooth\.dark\.wall\.armour\.away {
  --w: 16px;
  --h: 56px;
  --x: 624px;
  --y: 148px;
}
.texture-blacktooth\.dark\.wall\.shield\.left {
  --w: 16px;
  --h: 56px;
  --x: 560px;
  --y: 140px;
}
.texture-blacktooth\.dark\.wall\.shield\.away {
  --w: 16px;
  --h: 56px;
  --x: 608px;
  --y: 140px;
}
.texture-blacktooth\.dark\.wall\.plain\.left {
  --w: 16px;
  --h: 56px;
  --x: 576px;
  --y: 132px;
}
.texture-blacktooth\.dark\.wall\.plain\.away {
  --w: 16px;
  --h: 56px;
  --x: 592px;
  --y: 132px;
}
.texture-blacktooth\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 576px;
  --y: 188px;
}
.texture-blacktooth\.wall\.armour\.left {
  --w: 16px;
  --h: 56px;
  --x: 544px;
  --y: 76px;
}
.texture-blacktooth\.wall\.armour\.away {
  --w: 16px;
  --h: 56px;
  --x: 624px;
  --y: 76px;
}
.texture-blacktooth\.wall\.shield\.left {
  --w: 16px;
  --h: 56px;
  --x: 560px;
  --y: 68px;
}
.texture-blacktooth\.wall\.shield\.away {
  --w: 16px;
  --h: 56px;
  --x: 608px;
  --y: 68px;
}
.texture-blacktooth\.wall\.plain\.left {
  --w: 16px;
  --h: 56px;
  --x: 576px;
  --y: 60px;
}
.texture-blacktooth\.wall\.plain\.away {
  --w: 16px;
  --h: 56px;
  --x: 592px;
  --y: 60px;
}
.texture-blacktooth\.floor {
  --w: 32px;
  --h: 16px;
  --x: 576px;
  --y: 116px;
}
.texture-bookworld\.dark\.wall\.cowboy\.left {
  --w: 16px;
  --h: 56px;
  --x: 382px;
  --y: 16px;
}
.texture-bookworld\.dark\.wall\.cowboy\.away {
  --w: 16px;
  --h: 56px;
  --x: 430px;
  --y: 16px;
}
.texture-bookworld\.dark\.wall\.book\.left {
  --w: 16px;
  --h: 56px;
  --x: 398px;
  --y: 8px;
}
.texture-bookworld\.dark\.wall\.book\.away {
  --w: 16px;
  --h: 56px;
  --x: 414px;
  --y: 8px;
}
.texture-bookworld\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 398px;
  --y: 64px;
}
.texture-bookworld\.wall\.cowboy\.left {
  --w: 16px;
  --h: 56px;
  --x: 382px;
  --y: 16px;
}
.texture-bookworld\.wall\.cowboy\.away {
  --w: 16px;
  --h: 56px;
  --x: 430px;
  --y: 16px;
}
.texture-bookworld\.wall\.book\.left {
  --w: 16px;
  --h: 56px;
  --x: 398px;
  --y: 8px;
}
.texture-bookworld\.wall\.book\.away {
  --w: 16px;
  --h: 56px;
  --x: 414px;
  --y: 8px;
}
.texture-bookworld\.floor {
  --w: 32px;
  --h: 16px;
  --x: 398px;
  --y: 64px;
}
.texture-egyptus\.wall\.sarcophagus\.left {
  --w: 16px;
  --h: 56px;
  --x: 447px;
  --y: 16px;
}
.texture-egyptus\.wall\.sarcophagus\.away {
  --w: 16px;
  --h: 56px;
  --x: 495px;
  --y: 16px;
}
.texture-egyptus\.wall\.hieroglyphics\.left {
  --w: 16px;
  --h: 56px;
  --x: 463px;
  --y: 8px;
}
.texture-egyptus\.wall\.hieroglyphics\.away {
  --w: 16px;
  --h: 56px;
  --x: 479px;
  --y: 8px;
}
.texture-egyptus\.floor {
  --w: 32px;
  --h: 16px;
  --x: 463px;
  --y: 64px;
}
.texture-egyptus\.dark\.wall\.sarcophagus\.left {
  --w: 16px;
  --h: 56px;
  --x: 447px;
  --y: 89px;
}
.texture-egyptus\.dark\.wall\.sarcophagus\.away {
  --w: 16px;
  --h: 56px;
  --x: 495px;
  --y: 89px;
}
.texture-egyptus\.dark\.wall\.hieroglyphics\.left {
  --w: 16px;
  --h: 56px;
  --x: 463px;
  --y: 81px;
}
.texture-egyptus\.dark\.wall\.hieroglyphics\.away {
  --w: 16px;
  --h: 56px;
  --x: 479px;
  --y: 81px;
}
.texture-egyptus\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 463px;
  --y: 137px;
}
.texture-jail\.dark\.wall\.bars\.left {
  --w: 16px;
  --h: 56px;
  --x: 512px;
  --y: 76px;
}
.texture-jail\.dark\.wall\.bars\.away {
  --w: 16px;
  --h: 56px;
  --x: 528px;
  --y: 76px;
}
.texture-jail\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 512px;
  --y: 132px;
}
.texture-jail\.wall\.bars\.left {
  --w: 16px;
  --h: 56px;
  --x: 512px;
  --y: 76px;
}
.texture-jail\.wall\.bars\.away {
  --w: 16px;
  --h: 56px;
  --x: 528px;
  --y: 76px;
}
.texture-jail\.floor {
  --w: 32px;
  --h: 16px;
  --x: 512px;
  --y: 132px;
}
.texture-market\.dark\.wall\.passage\.left {
  --w: 16px;
  --h: 56px;
  --x: 440px;
  --y: 386px;
}
.texture-market\.dark\.wall\.passage\.away {
  --w: 16px;
  --h: 56px;
  --x: 520px;
  --y: 386px;
}
.texture-market\.dark\.wall\.fruits\.left {
  --w: 16px;
  --h: 56px;
  --x: 456px;
  --y: 378px;
}
.texture-market\.dark\.wall\.fruits\.away {
  --w: 16px;
  --h: 56px;
  --x: 504px;
  --y: 378px;
}
.texture-market\.dark\.wall\.more-fruits\.left {
  --w: 16px;
  --h: 56px;
  --x: 472px;
  --y: 370px;
}
.texture-market\.dark\.wall\.more-fruits\.away {
  --w: 16px;
  --h: 56px;
  --x: 488px;
  --y: 370px;
}
.texture-market\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 472px;
  --y: 426px;
}
.texture-market\.wall\.passage\.left {
  --w: 16px;
  --h: 56px;
  --x: 440px;
  --y: 386px;
}
.texture-market\.wall\.passage\.away {
  --w: 16px;
  --h: 56px;
  --x: 520px;
  --y: 386px;
}
.texture-market\.wall\.fruits\.left {
  --w: 16px;
  --h: 56px;
  --x: 456px;
  --y: 378px;
}
.texture-market\.wall\.fruits\.away {
  --w: 16px;
  --h: 56px;
  --x: 504px;
  --y: 378px;
}
.texture-market\.wall\.more-fruits\.left {
  --w: 16px;
  --h: 56px;
  --x: 472px;
  --y: 370px;
}
.texture-market\.wall\.more-fruits\.away {
  --w: 16px;
  --h: 56px;
  --x: 488px;
  --y: 370px;
}
.texture-market\.floor {
  --w: 32px;
  --h: 16px;
  --x: 472px;
  --y: 426px;
}
.texture-moonbase\.dark\.wall\.window1\.left {
  --w: 16px;
  --h: 56px;
  --x: 453px;
  --y: 305px;
}
.texture-moonbase\.dark\.wall\.window1\.away {
  --w: 16px;
  --h: 56px;
  --x: 565px;
  --y: 305px;
}
.texture-moonbase\.dark\.wall\.window2\.left {
  --w: 16px;
  --h: 56px;
  --x: 469px;
  --y: 297px;
}
.texture-moonbase\.dark\.wall\.window2\.away {
  --w: 16px;
  --h: 56px;
  --x: 549px;
  --y: 297px;
}
.texture-moonbase\.dark\.wall\.window3\.left {
  --w: 16px;
  --h: 56px;
  --x: 485px;
  --y: 289px;
}
.texture-moonbase\.dark\.wall\.window3\.away {
  --w: 16px;
  --h: 56px;
  --x: 533px;
  --y: 289px;
}
.texture-moonbase\.dark\.wall\.coil\.left {
  --w: 16px;
  --h: 56px;
  --x: 501px;
  --y: 281px;
}
.texture-moonbase\.dark\.wall\.coil\.away {
  --w: 16px;
  --h: 56px;
  --x: 517px;
  --y: 281px;
}
.texture-moonbase\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 501px;
  --y: 337px;
}
.texture-moonbase\.wall\.window1\.left {
  --w: 16px;
  --h: 56px;
  --x: 453px;
  --y: 233px;
}
.texture-moonbase\.wall\.window1\.away {
  --w: 16px;
  --h: 56px;
  --x: 565px;
  --y: 233px;
}
.texture-moonbase\.wall\.window2\.left {
  --w: 16px;
  --h: 56px;
  --x: 469px;
  --y: 225px;
}
.texture-moonbase\.wall\.window2\.away {
  --w: 16px;
  --h: 56px;
  --x: 549px;
  --y: 225px;
}
.texture-moonbase\.wall\.window3\.left {
  --w: 16px;
  --h: 56px;
  --x: 485px;
  --y: 217px;
}
.texture-moonbase\.wall\.window3\.away {
  --w: 16px;
  --h: 56px;
  --x: 533px;
  --y: 217px;
}
.texture-moonbase\.wall\.coil\.left {
  --w: 16px;
  --h: 56px;
  --x: 501px;
  --y: 209px;
}
.texture-moonbase\.wall\.coil\.away {
  --w: 16px;
  --h: 56px;
  --x: 517px;
  --y: 209px;
}
.texture-moonbase\.floor {
  --w: 32px;
  --h: 16px;
  --x: 501px;
  --y: 265px;
}
.texture-penitentiary\.dark\.wall\.loop\.left {
  --w: 16px;
  --h: 56px;
  --x: 372px;
  --y: 389px;
}
.texture-penitentiary\.dark\.wall\.loop\.away {
  --w: 16px;
  --h: 56px;
  --x: 420px;
  --y: 389px;
}
.texture-penitentiary\.dark\.wall\.skeleton\.left {
  --w: 16px;
  --h: 56px;
  --x: 388px;
  --y: 381px;
}
.texture-penitentiary\.dark\.wall\.skeleton\.away {
  --w: 16px;
  --h: 56px;
  --x: 404px;
  --y: 381px;
}
.texture-penitentiary\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 388px;
  --y: 437px;
}
.texture-penitentiary\.wall\.loop\.left {
  --w: 16px;
  --h: 56px;
  --x: 372px;
  --y: 389px;
}
.texture-penitentiary\.wall\.loop\.away {
  --w: 16px;
  --h: 56px;
  --x: 420px;
  --y: 389px;
}
.texture-penitentiary\.wall\.skeleton\.left {
  --w: 16px;
  --h: 56px;
  --x: 388px;
  --y: 381px;
}
.texture-penitentiary\.wall\.skeleton\.away {
  --w: 16px;
  --h: 56px;
  --x: 404px;
  --y: 381px;
}
.texture-penitentiary\.floor {
  --w: 32px;
  --h: 16px;
  --x: 388px;
  --y: 437px;
}
.texture-safari\.dark\.wall\.window\.left {
  --w: 16px;
  --h: 56px;
  --x: 544px;
  --y: 386px;
}
.texture-safari\.dark\.wall\.window\.away {
  --w: 16px;
  --h: 56px;
  --x: 624px;
  --y: 386px;
}
.texture-safari\.dark\.wall\.shield\.left {
  --w: 16px;
  --h: 56px;
  --x: 560px;
  --y: 378px;
}
.texture-safari\.dark\.wall\.shield\.away {
  --w: 16px;
  --h: 56px;
  --x: 608px;
  --y: 378px;
}
.texture-safari\.dark\.wall\.wall\.left {
  --w: 16px;
  --h: 56px;
  --x: 576px;
  --y: 370px;
}
.texture-safari\.dark\.wall\.wall\.away {
  --w: 16px;
  --h: 56px;
  --x: 592px;
  --y: 370px;
}
.texture-safari\.dark\.floor {
  --w: 32px;
  --h: 16px;
  --x: 576px;
  --y: 426px;
}
.texture-safari\.wall\.window\.left {
  --w: 16px;
  --h: 56px;
  --x: 544px;
  --y: 386px;
}
.texture-safari\.wall\.window\.away {
  --w: 16px;
  --h: 56px;
  --x: 624px;
  --y: 386px;
}
.texture-safari\.wall\.shield\.left {
  --w: 16px;
  --h: 56px;
  --x: 560px;
  --y: 378px;
}
.texture-safari\.wall\.shield\.away {
  --w: 16px;
  --h: 56px;
  --x: 608px;
  --y: 378px;
}
.texture-safari\.wall\.wall\.left {
  --w: 16px;
  --h: 56px;
  --x: 576px;
  --y: 370px;
}
.texture-safari\.wall\.wall\.away {
  --w: 16px;
  --h: 56px;
  --x: 592px;
  --y: 370px;
}
.texture-safari\.floor {
  --w: 32px;
  --h: 16px;
  --x: 576px;
  --y: 426px;
}
.texture-hud\.char\.A {
  --w: 8px;
  --h: 8px;
  --x: 173px;
  --y: 0px;
}
.texture-hud\.char\.B {
  --w: 8px;
  --h: 8px;
  --x: 182px;
  --y: 0px;
}
.texture-hud\.char\.C {
  --w: 8px;
  --h: 8px;
  --x: 191px;
  --y: 0px;
}
.texture-hud\.char\.D {
  --w: 8px;
  --h: 8px;
  --x: 200px;
  --y: 0px;
}
.texture-hud\.char\.E {
  --w: 8px;
  --h: 8px;
  --x: 209px;
  --y: 0px;
}
.texture-hud\.char\.F {
  --w: 8px;
  --h: 8px;
  --x: 218px;
  --y: 0px;
}
.texture-hud\.char\.G {
  --w: 8px;
  --h: 8px;
  --x: 227px;
  --y: 0px;
}
.texture-hud\.char\.H {
  --w: 8px;
  --h: 8px;
  --x: 236px;
  --y: 0px;
}
.texture-hud\.char\.I {
  --w: 8px;
  --h: 8px;
  --x: 245px;
  --y: 0px;
}
.texture-hud\.char\.J {
  --w: 8px;
  --h: 8px;
  --x: 254px;
  --y: 0px;
}
.texture-hud\.char\.K {
  --w: 8px;
  --h: 8px;
  --x: 263px;
  --y: 0px;
}
.texture-hud\.char\.L {
  --w: 8px;
  --h: 8px;
  --x: 272px;
  --y: 0px;
}
.texture-hud\.char\.M {
  --w: 8px;
  --h: 8px;
  --x: 281px;
  --y: 0px;
}
.texture-hud\.char\.N {
  --w: 8px;
  --h: 8px;
  --x: 290px;
  --y: 0px;
}
.texture-hud\.char\.O {
  --w: 8px;
  --h: 8px;
  --x: 299px;
  --y: 0px;
}
.texture-hud\.char\.P {
  --w: 8px;
  --h: 8px;
  --x: 308px;
  --y: 0px;
}
.texture-hud\.char\.Q {
  --w: 8px;
  --h: 8px;
  --x: 317px;
  --y: 0px;
}
.texture-hud\.char\.R {
  --w: 8px;
  --h: 8px;
  --x: 326px;
  --y: 0px;
}
.texture-hud\.char\.S {
  --w: 8px;
  --h: 8px;
  --x: 335px;
  --y: 0px;
}
.texture-hud\.char\.T {
  --w: 8px;
  --h: 8px;
  --x: 344px;
  --y: 0px;
}
.texture-hud\.char\.U {
  --w: 8px;
  --h: 8px;
  --x: 353px;
  --y: 0px;
}
.texture-hud\.char\.V {
  --w: 8px;
  --h: 8px;
  --x: 362px;
  --y: 0px;
}
.texture-hud\.char\.W {
  --w: 8px;
  --h: 8px;
  --x: 371px;
  --y: 0px;
}
.texture-hud\.char\.X {
  --w: 8px;
  --h: 8px;
  --x: 380px;
  --y: 0px;
}
.texture-hud\.char\.Y {
  --w: 8px;
  --h: 8px;
  --x: 389px;
  --y: 0px;
}
.texture-hud\.char\.Z {
  --w: 8px;
  --h: 8px;
  --x: 398px;
  --y: 0px;
}
.texture-hud\.char\.0 {
  --w: 8px;
  --h: 8px;
  --x: 407px;
  --y: 0px;
}
.texture-hud\.char\.1 {
  --w: 8px;
  --h: 8px;
  --x: 416px;
  --y: 0px;
}
.texture-hud\.char\.2 {
  --w: 8px;
  --h: 8px;
  --x: 425px;
  --y: 0px;
}
.texture-hud\.char\.3 {
  --w: 8px;
  --h: 8px;
  --x: 434px;
  --y: 0px;
}
.texture-hud\.char\.4 {
  --w: 8px;
  --h: 8px;
  --x: 443px;
  --y: 0px;
}
.texture-hud\.char\.5 {
  --w: 8px;
  --h: 8px;
  --x: 452px;
  --y: 0px;
}
.texture-hud\.char\.6 {
  --w: 8px;
  --h: 8px;
  --x: 461px;
  --y: 0px;
}
.texture-hud\.char\.7 {
  --w: 8px;
  --h: 8px;
  --x: 470px;
  --y: 0px;
}
.texture-hud\.char\.8 {
  --w: 8px;
  --h: 8px;
  --x: 479px;
  --y: 0px;
}
.texture-hud\.char\.9 {
  --w: 8px;
  --h: 8px;
  --x: 488px;
  --y: 0px;
}
.texture-hud\.fastSteps {
  --w: 8px;
  --h: 8px;
  --x: 497px;
  --y: 0px;
}
.texture-hud\.shield {
  --w: 8px;
  --h: 8px;
  --x: 506px;
  --y: 0px;
}
.texture-hud\.bigJumps {
  --w: 8px;
  --h: 8px;
  --x: 515px;
  --y: 0px;
}
.texture-hud\.char\.\1F579 {
  --w: 8px;
  --h: 8px;
  --x: 227px;
  --y: 27px;
}
.texture-hud\.char\.\  {
  --w: 8px;
  --h: 8px;
  --x: 173px;
  --y: 9px;
}
.texture-hud\.char\.\? {
  --w: 8px;
  --h: 8px;
  --x: 182px;
  --y: 9px;
}
.texture-hud\.char\.\! {
  --w: 8px;
  --h: 8px;
  --x: 191px;
  --y: 9px;
}
.texture-hud\.char\.\. {
  --w: 8px;
  --h: 8px;
  --x: 200px;
  --y: 9px;
}
.texture-hud\.char\.\2c  {
  --w: 8px;
  --h: 8px;
  --x: 209px;
  --y: 9px;
}
.texture-hud\.char\.\; {
  --w: 8px;
  --h: 8px;
  --x: 218px;
  --y: 9px;
}
.texture-hud\.char\.\/ {
  --w: 8px;
  --h: 8px;
  --x: 236px;
  --y: 9px;
}
.texture-hud\.char\.\\ {
  --w: 8px;
  --h: 8px;
  --x: 245px;
  --y: 9px;
}
.texture-hud\.char\.\2018 {
  --w: 8px;
  --h: 8px;
  --x: 254px;
  --y: 9px;
}
.texture-hud\.char\.\2019 {
  --w: 8px;
  --h: 8px;
  --x: 263px;
  --y: 9px;
}
.texture-hud\.char\.- {
  --w: 8px;
  --h: 8px;
  --x: 290px;
  --y: 9px;
}
.texture-hud\.char\.\+ {
  --w: 8px;
  --h: 8px;
  --x: 299px;
  --y: 9px;
}
.texture-hud\.char\.\2B05 {
  --w: 8px;
  --h: 8px;
  --x: 173px;
  --y: 18px;
}
.texture-hud\.char\.\27A1 {
  --w: 8px;
  --h: 8px;
  --x: 182px;
  --y: 18px;
}
.texture-hud\.char\.\2B06 {
  --w: 8px;
  --h: 8px;
  --x: 191px;
  --y: 18px;
}
.texture-hud\.char\.\2B07 {
  --w: 8px;
  --h: 8px;
  --x: 200px;
  --y: 18px;
}
.texture-hud\.char\.\2196 {
  --w: 8px;
  --h: 8px;
  --x: 209px;
  --y: 18px;
}
.texture-hud\.char\.\2198 {
  --w: 8px;
  --h: 8px;
  --x: 218px;
  --y: 18px;
}
.texture-hud\.char\.\2197 {
  --w: 8px;
  --h: 8px;
  --x: 227px;
  --y: 18px;
}
.texture-hud\.char\.\2199 {
  --w: 8px;
  --h: 8px;
  --x: 236px;
  --y: 18px;
}
.texture-hud\.char\.\23E9 {
  --w: 8px;
  --h: 8px;
  --x: 524px;
  --y: 0px;
}
.texture-hud\.char\.\204C {
  --w: 8px;
  --h: 8px;
  --x: 533px;
  --y: 0px;
}
.texture-hud\.char\.\204D {
  --w: 8px;
  --h: 8px;
  --x: 542px;
  --y: 0px;
}
.texture-hud\.char\.\( {
  --w: 8px;
  --h: 8px;
  --x: 173px;
  --y: 27px;
}
.texture-hud\.char\.\) {
  --w: 8px;
  --h: 8px;
  --x: 182px;
  --y: 27px;
}
.texture-hud\.char\.\[ {
  --w: 8px;
  --h: 8px;
  --x: 191px;
  --y: 27px;
}
.texture-hud\.char\.\] {
  --w: 8px;
  --h: 8px;
  --x: 200px;
  --y: 27px;
}
.texture-shadowMask\.fullBlock {
  --w: 32px;
  --h: 28px;
  --x: 226px;
  --y: 395px;
}
.texture-shadow\.fullBlock {
  --w: 32px;
  --h: 28px;
  --x: 259px;
  --y: 395px;
}
.texture-shadowMask\.smallBlock {
  --w: 24px;
  --h: 24px;
  --x: 333px;
  --y: 456px;
}
.texture-shadow\.smallBlock {
  --w: 24px;
  --h: 24px;
  --x: 308px;
  --y: 456px;
}
.texture-shadowMask\.conveyor {
  --w: 32px;
  --h: 28px;
  --x: 292px;
  --y: 395px;
}
.texture-shadow\.smallRound {
  --w: 24px;
  --h: 24px;
  --x: 159px;
  --y: 291px;
}
.texture-shadowMask\.smallRound {
  --w: 24px;
  --h: 24px;
  --x: 184px;
  --y: 291px;
}
.texture-shadowMask\.tower {
  --w: 24px;
  --h: 24px;
  --x: 27px;
  --y: 349px;
}
.texture-door\.frame\.generic\.y\.far {
  --w: 17px;
  --h: 57px;
  --x: 364px;
  --y: 147px;
}
.texture-door\.frame\.generic\.y\.near {
  --w: 20px;
  --h: 58px;
  --x: 341px;
  --y: 153px;
}
.texture-door\.frame\.generic\.y\.top {
  --w: 15px;
  --h: 36px;
  --x: 325px;
  --y: 146px;
}
.texture-door\.frame\.generic\.x\.far {
  --w: 17px;
  --h: 57px;
  --x: 382px;
  --y: 147px;
}
.texture-door\.frame\.generic\.x\.near {
  --w: 20px;
  --h: 58px;
  --x: 402px;
  --y: 153px;
}
.texture-door\.frame\.generic\.x\.top {
  --w: 15px;
  --h: 36px;
  --x: 423px;
  --y: 146px;
}
.texture-door\.frame\.moonbase\.y\.far {
  --w: 17px;
  --h: 57px;
  --x: 435px;
  --y: 232px;
}
.texture-door\.frame\.moonbase\.y\.near {
  --w: 20px;
  --h: 58px;
  --x: 412px;
  --y: 238px;
}
.texture-door\.frame\.moonbase\.y\.top {
  --w: 15px;
  --h: 36px;
  --x: 396px;
  --y: 231px;
}
.texture-door\.frame\.moonbase\.x\.far {
  --w: 17px;
  --h: 57px;
  --x: 582px;
  --y: 232px;
}
.texture-door\.frame\.moonbase\.x\.near {
  --w: 20px;
  --h: 58px;
  --x: 602px;
  --y: 238px;
}
.texture-door\.frame\.moonbase\.x\.top {
  --w: 15px;
  --h: 36px;
  --x: 623px;
  --y: 231px;
}
.texture-door\.frame\.moonbase\.dark\.y\.far {
  --w: 17px;
  --h: 57px;
  --x: 435px;
  --y: 304px;
}
.texture-door\.frame\.moonbase\.dark\.y\.near {
  --w: 20px;
  --h: 58px;
  --x: 412px;
  --y: 310px;
}
.texture-door\.frame\.moonbase\.dark\.y\.top {
  --w: 15px;
  --h: 36px;
  --x: 396px;
  --y: 303px;
}
.texture-door\.frame\.moonbase\.dark\.x\.far {
  --w: 17px;
  --h: 57px;
  --x: 582px;
  --y: 304px;
}
.texture-door\.frame\.moonbase\.dark\.x\.near {
  --w: 20px;
  --h: 58px;
  --x: 602px;
  --y: 310px;
}
.texture-door\.frame\.moonbase\.dark\.x\.top {
  --w: 15px;
  --h: 36px;
  --x: 623px;
  --y: 303px;
}
.\[--block\:8px\] {
  --block: 8px;
}
.\[--scale\:1\] {
  --scale: 1;
}

.placeholder\:text-shadow::-moz-placeholder {
  --tw-text-opacity: 1;
  color: rgb(58 86 79 / var(--tw-text-opacity, 1));
}

.placeholder\:text-shadow::placeholder {
  --tw-text-opacity: 1;
  color: rgb(58 86 79 / var(--tw-text-opacity, 1));
}

.hover\:border-pink:hover {
  --tw-border-opacity: 1;
  border-color: rgb(219 147 212 / var(--tw-border-opacity, 1));
}

.hover\:bg-metallicBlue:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(63 112 177 / var(--tw-bg-opacity, 1));
}

.hover\:bg-moss:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(164 155 0 / var(--tw-bg-opacity, 1));
}

.hover\:bg-redShadow:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(134 100 86 / var(--tw-bg-opacity, 1));
}

.hover\:text-metallicBlue:hover {
  --tw-text-opacity: 1;
  color: rgb(63 112 177 / var(--tw-text-opacity, 1));
}

.focus-visible\:outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\:ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-visible\:ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.disabled\:pointer-events-none:disabled {
  pointer-events: none;
}

.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

.peer:disabled ~ .peer-disabled\:cursor-not-allowed {
  cursor: not-allowed;
}

.peer:disabled ~ .peer-disabled\:opacity-70 {
  opacity: 0.7;
}

.data-\[disabled\=true\]\:pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}

.data-\[state\=checked\]\:translate-x-\[26px\][data-state="checked"] {
  --tw-translate-x: 26px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\[state\=unchecked\]\:translate-x-\[2px\][data-state="unchecked"] {
  --tw-translate-x: 2px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\[state\=checked\]\:border-moss[data-state="checked"] {
  --tw-border-opacity: 1;
  border-color: rgb(164 155 0 / var(--tw-border-opacity, 1));
}

.data-\[selected\=\'true\'\]\:bg-midRed[data-selected='true'] {
  --tw-bg-opacity: 1;
  background-color: rgb(205 123 107 / var(--tw-bg-opacity, 1));
}

.data-\[state\=checked\]\:bg-moss[data-state="checked"] {
  --tw-bg-opacity: 1;
  background-color: rgb(164 155 0 / var(--tw-bg-opacity, 1));
}

.data-\[state\=unchecked\]\:bg-redShadow[data-state="unchecked"] {
  --tw-bg-opacity: 1;
  background-color: rgb(134 100 86 / var(--tw-bg-opacity, 1));
}

.data-\[disabled\=true\]\:opacity-50[data-disabled="true"] {
  opacity: 0.5;
}

.\[\&_\[cmdk-group-heading\]\]\:px-2 [cmdk-group-heading] {
  padding-left: calc(var(--block) * 2);
  padding-right: calc(var(--block) * 2);
}

.\[\&_\[cmdk-group-heading\]\]\:text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}

.\[\&_\[cmdk-group-heading\]\]\:font-medium [cmdk-group-heading] {
  font-weight: 500;
}

.\[\&_svg\]\:pointer-events-none svg {
  pointer-events: none;
}

.\[\&_svg\]\:size-4 svg {
  width: calc(var(--block) * 4);
  height: calc(var(--block) * 4);
}

.\[\&_svg\]\:shrink-0 svg {
  flex-shrink: 0;
}
