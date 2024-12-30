#!/bin/bash

echo "🤖 converting iff -> png"
echo "⏱️ at $(date)"

# curves are trying to approximate the iff colour space transition to png:
# https://chatgpt.com/share/6720c751-1dfc-8007-815f-6b1d156962ef
curveFilter="curves=r='0.00/0.00 0.25/0.22 0.50/0.50 0.75/0.80 1.00/1.00':g='0.00/0.00 0.25/0.25 0.50/0.50 0.75/0.75 1.00/1.00':b='0.00/0.00 0.25/0.23 0.50/0.50 0.75/0.75 1.00/1.00', eq=saturation=1.2, eq=gamma=0.95"

for iffFile in gfx/*.iff; do
    echo
    echo
    echo "🤖 converting iff: $iffFile -> " ${iffFile%.iff}.png ...
    yes | ffmpeg -hide_banner -i $iffFile -vf "$curveFilter" -update 1 -frames:v 1 ${iffFile%.iff}.png
done

echo "🤖 sampling palette -> ts"
colorNames=(pureBlack lightBlack shadow midGrey lightGrey white metallicBlue pink moss redShadow midRed lightBeige highlightBeige alpha replaceLight replaceDark)
rm gfx/spritesheetPalette.ts gfx/spritesheetPalette.json
echo "import { Color } from 'pixi.js';" >> gfx/spritesheetPalette.ts.out
echo "// this file is generated from the spritesheet by iff2png.sh, do not edit directly" >> gfx/spritesheetPalette.ts.out
echo "export const spritesheetPalette = {" >> gfx/spritesheetPalette.ts.out
echo "{" >> gfx/spritesheetPalette.json.out

for i in $(seq 0 15);
do
    color=$(magick gfx/sprites.png -format "#%[hex:u.p{$i,0}]" info:);
    echo ${colorNames[$i]} $color
    echo "  \"${colorNames[$i]}\": new Color(\"$color\")," >> gfx/spritesheetPalette.ts.out
    echo "  \"${colorNames[$i]}\": \"$color\"" >> gfx/spritesheetPalette.json.out

    if [ $i -ne 15 ]; then
        echo "," >> gfx/spritesheetPalette.json.out
    fi
done
echo "} as const;" >> gfx/spritesheetPalette.ts.out
echo "export type SpritesheetPaletteColourName = keyof typeof spritesheetPalette;" >> gfx/spritesheetPalette.ts.out
echo "}" >> gfx/spritesheetPalette.json.out
mv gfx/spritesheetPalette.ts.out gfx/spritesheetPalette.ts
mv gfx/spritesheetPalette.json.out gfx/spritesheetPalette.json
node_modules/.bin/prettier --write gfx/spritesheetPalette.* 

#
# make sprite mask colour actually transparent in the png (dpaint uses a normal colour)
echo "🤖 making transparent"
# since the palette is in the first 16 pixels of the image, we can auto-detect the transparency colour:
transparencyColor=$(magick gfx/sprites.png -format "#%[hex:u.p{13,0}]" info:)
matteColor=$(magick gfx/sprites.png -format "#%[hex:u.p{0,1}]" info:)
echo "transparent color detected as \"$transparencyColor\" and matte as \"$matteColor\""

cp gfx/sprites.png gfx/sprites.borders.png
magick gfx/sprites.png -transparent $transparencyColor -fill transparent -floodfill +0+1 $matteColor gfx/sprites.png

echo "🤖 reducing palette"
pngquant -vf --quality 100-100 \
    --ext .png \
    -- gfx/sprites.png 
echo "🤖 what we have now:"
ls -lh gfx/sprites*