#!/bin/bash

# check some commands are available:
if ! command -v pngquant 2>&1 >/dev/null
then
    echo "no pngquant"
    exit 1
fi
if ! command -v magick 2>&1 >/dev/null
then
    echo "no magick"
    exit 1
fi
if ! command -v ffmpeg 2>&1 >/dev/null
then
    echo "no ffmpeg"
    exit 1
fi
if ! command -v jq 2>&1 >/dev/null
then
    echo "no jq"
    exit 1
fi

echo "🤖 converting iff -> png"
echo "⏱️ at $(date)"
OUT_DIR="gfx"
# write everything to a temp dir, then switch, to avoid vite, tsc, etc picking up half-converted files
TMP_DIR="gfx_temp"

echo "🤖 creating temp dir at $TMP_DIR"
mkdir $TMP_DIR

# curves are trying to approximate the iff colour space transition to png:
# https://chatgpt.com/share/6720c751-1dfc-8007-815f-6b1d156962ef
curveFilter="curves=r='0.00/0.00 0.25/0.22 0.50/0.50 0.75/0.80 1.00/1.00':g='0.00/0.00 0.25/0.25 0.50/0.50 0.75/0.75 1.00/1.00':b='0.00/0.00 0.25/0.23 0.50/0.50 0.75/0.75 1.00/1.00', eq=saturation=1.25, eq=gamma=0.9"

cd gfx;
for iffFile in *.iff; do
    echo
    echo
    echo "🤖 converting iff: $iffFile -> " ../$TMP_DIR/${iffFile%.iff}.png ...
    yes | ffmpeg -hide_banner -i $iffFile -vf "$curveFilter" -update 1 -frames:v 1 ../$TMP_DIR/${iffFile%.iff}.png
done
cd ..

echo "🤖 sampling palette -> ts"
colorNames=(pureBlack lightBlack shadow midGrey lightGrey white metallicBlue pink moss redShadow midRed lightBeige highlightBeige alpha replaceLight replaceDark)

echo "import { Color } from 'pixi.js';" >> "$TMP_DIR/spritesheetPalette.ts"
echo "// this file is generated from the spritesheet by iff2png.sh, do not edit directly" >> "$TMP_DIR/spritesheetPalette.ts"
echo "export const spritesheetPalette = {" >> "$TMP_DIR/spritesheetPalette.ts"
echo "{" >> "$TMP_DIR/spritesheetPalette.json"

for i in $(seq 0 15);
do
    color=$(magick "$TMP_DIR/sprites.png" -format "#%[hex:u.p{$i,0}]" info:);
    echo ${colorNames[$i]} $color
    echo "  \"${colorNames[$i]}\": new Color(\"$color\")," >> "$TMP_DIR/spritesheetPalette.ts"
    echo "  \"${colorNames[$i]}\": \"$color\"" >> "$TMP_DIR/spritesheetPalette.json"

    if [ $i -ne 15 ]; then
        echo "," >> "$TMP_DIR/spritesheetPalette.json"
    fi
done
echo "} as const;" >> "$TMP_DIR/spritesheetPalette.ts"
echo "export type SpritesheetPaletteColourName = keyof typeof spritesheetPalette;" >> "$TMP_DIR/spritesheetPalette.ts"
echo "}" >> "$TMP_DIR/spritesheetPalette.json"
mv "$TMP_DIR/spritesheetPalette.ts" "$TMP_DIR/spritesheetPalette.ts"
mv "$TMP_DIR/spritesheetPalette.json" "$TMP_DIR/spritesheetPalette.json"
node_modules/.bin/prettier --write "$TMP_DIR/spritesheetPalette.*" 

#
# make sprite mask colour actually transparent in the png (dpaint uses a normal colour)
echo "🤖 making transparent"
# since the palette is in the first 16 pixels of the image, we can auto-detect the transparency colour:
transparencyColor=$(magick "$TMP_DIR/sprites.png" -format "#%[hex:u.p{13,0}]" info:)
matteColor=$(magick "$TMP_DIR/sprites.png" -format "#%[hex:u.p{0,1}]" info:)
echo "transparent color detected as \"$transparencyColor\" and matte as \"$matteColor\""

cp "$TMP_DIR/sprites.png" "$TMP_DIR/sprites.borders".png
magick "$TMP_DIR/sprites.png" -transparent $transparencyColor -fill transparent -floodfill +0+1 $matteColor "$TMP_DIR/sprites.png"

echo "🤖🎨 reducing 🎨 palette for $TMP_DIR/sprites.png"
pngquant -vf --quality 100-100 \
    --ext .png \
    -- "$TMP_DIR/sprites.png" 

#make the sprite:
ICON_FRAME=$(scripts/iconLocationOnSpriteSheet.ts)
echo "🤖 ✂️ cutting out icon at frame (XxY+W+H) is $ICON_FRAME"
magick $TMP_DIR/sprites.png -crop $ICON_FRAME +repage $TMP_DIR/icon.png
# remove transparency and put in fixed background:
ICON_BG=`jq -r '.pink' gfx/spritesheetPalette.json`
printf "\e[48;2;$(printf '%d;%d;%d' 0x${ICON_BG:1:2} 0x${ICON_BG:3:2} 0x${ICON_BG:5:2})m ICON_BACKGROUND \e[0m\n"
magick $TMP_DIR/icon.png -background $ICON_BG -alpha remove $TMP_DIR/icon.png
# scale with nearest neighbour up so it remains pixelated after phone/tablet/etc scales it up:
magick $TMP_DIR/icon.png -filter point -resize 800% $TMP_DIR/icon.png
pngquant -vf --quality 100-100 \
    --ext .png \
    -- "$TMP_DIR/icon.png" 

echo "🤖 moving temp to real"
cp $TMP_DIR/* $OUT_DIR

echo "🤖 deleting the temp dir"
rm -fR $TMP_DIR

echo "🤖 what we have now:"
ls -lh $OUT_DIR/*.png