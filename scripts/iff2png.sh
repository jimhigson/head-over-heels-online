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

OUT_DIR="gfx"
# we write everything to a temp dir, then switch, to avoid vite, tsc, etc picking up half-converted files
TMP_DIR="gfx_temp"
TMP_DIR_ICONS="icon_temp"
colorNames=(pureBlack shadow midGrey lightGrey white pastelBlue metallicBlue pink moss redShadow midRed lightBeige highlightBeige alpha replaceLight replaceDark)

# call like : print_with_bg_color message hexColor 
print_with_bg_color() {
    local message=$1
    local hex=$2
    local r=$((0x${hex:1:2}))
    local g=$((0x${hex:3:2}))
    local b=$((0x${hex:5:2}))
    local mean=$(((r + g + b) / 3))
    local fg_color
    if [ $mean -gt 127 ]; then
        fg_color="30"  # black foreground
    else
        fg_color="97"  # bright white foreground
    fi
    printf "\e[${fg_color};48;2;$(printf '%d;%d;%d' $r $g $b)m $message \e[0m\n"
}

# call like : write_palette(sourcePng, destinationName)
write_palette() {
    echo "🤖 sampling 🎨 palette from $1 -> $2{json, ts}"
    echo "import { Color } from 'pixi.js';" >> "$TMP_DIR/$2.ts"
    echo "// this file is generated from the spritesheet by iff2png.sh, do not edit directly" >> "$TMP_DIR/$2.ts"
    echo "export const $2 = {" >> "$TMP_DIR/$2.ts"
    echo "{" >> "$TMP_DIR/$2.json"

    for i in $(seq 0 15);
    do
        # taking the first 7 chars strips off the alpha, ie '#AABBCCFF' -> '#AABBCC'
        color=$(magick $1 -format "#%[hex:u.p{$i,0}]" info: | cut -c1-7);
        print_with_bg_color "$(printf '%-16s' "${colorNames[$i]}") $color" "$color"
        echo "  \"${colorNames[$i]}\": new Color(\"$color\")," >> "$TMP_DIR/$2.ts"
        echo "  \"${colorNames[$i]}\": \"$color\"" >> "$TMP_DIR/$2.json"

        if [ $i -ne 15 ]; then
            echo "," >> "$TMP_DIR/$2.json"
        fi
    done
    echo "} as const;" >> "$TMP_DIR/$2.ts"
    echo "export type SpritesheetPaletteColourName = keyof typeof $2;" >> "$TMP_DIR/$2.ts"
    echo "}" >> "$TMP_DIR/$2.json"
    node_modules/.bin/prettier --write "$TMP_DIR/$2.*" 
}

echo "🤖 converting iff -> png"
echo "⏱️ at $(date)"


echo "🤖 creating temp dir at $TMP_DIR"
mkdir $TMP_DIR
mkdir $TMP_DIR_ICONS

cd gfx;
for iffFile in *.iff; do
    echo
    echo
    echo "🤖 converting iff: $iffFile -> " ../$TMP_DIR/${iffFile%.iff}.png ...
    yes | ffmpeg -hide_banner -i $iffFile -update 1 -frames:v 1 ../$TMP_DIR/${iffFile%.iff}.png
done
cd ..

echo "🤖 sampling palette -> {json, ts}"
write_palette "$TMP_DIR/sprites.png" spritesheetPalette
write_palette gfx/palette.dim.png spritesheetPaletteDim

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
# crop out
magick $TMP_DIR/sprites.png -crop $ICON_FRAME +repage $TMP_DIR_ICONS/icon.png
# move to centre of icon (if it doesn't fill the whole frame)
magick $TMP_DIR_ICONS/icon.png -trim -gravity center -background transparent -extent 24x24 $TMP_DIR_ICONS/icon.png
# remove transparency and put in fixed background:
ICON_BG=`jq -r '.moss' gfx/spritesheetPalette.json`
print_with_bg_color "ICON_BACKGROUND" "$ICON_BG"
magick $TMP_DIR_ICONS/icon.png -background $ICON_BG -alpha remove $TMP_DIR_ICONS/icon.png
# scale with nearest neighbour up so it remains pixelated after phone/tablet/etc scales it up:
magick $TMP_DIR_ICONS/icon.png -filter point -resize 192x192 $TMP_DIR_ICONS/icon-192.png
magick $TMP_DIR_ICONS/icon.png -filter point -resize 512x512 $TMP_DIR_ICONS/icon-512.png
pngquant -vf --quality 100-100 \
    --ext .png \
    -- $TMP_DIR_ICONS/icon-{192,512}.png

echo "🤖 moving temp to real"
cp $TMP_DIR/* $OUT_DIR
rm public/icon*.png
cp $TMP_DIR_ICONS/*.png public

# produce rgba version for tauri:
echo "🤖 creating RGBA icons for tauri"
magick public/icon.png \( +clone -channel A -evaluate multiply 0.999 \) -compose over -composite -define png:color-type=6 PNG32:src-tauri/icons/icon.png
magick public/icon.png -resize 32x32 -define png:color-type=6 PNG32:src-tauri/icons/32x32.png
magick public/icon.png -filter point -resize 128x128 -define png:color-type=6 PNG32:src-tauri/icons/128x128.png
magick public/icon.png -filter point -resize 256x256 -define png:color-type=6 PNG32:src-tauri/icons/128x128@2x.png
magick public/icon-512.png -define png:color-type=6 PNG32:src-tauri/icons/icon-512.png

echo "🤖 creating .ico for Windows (in tauri build)"
magick public/icon.png -filter point -resize 256x256 -define icon:auto-resize=256,128,64,48,32,16 src-tauri/icons/icon.ico

echo "🤖 deleting the temp dirs"
rm -fR $TMP_DIR
rm -fR $TMP_DIR_ICONS

echo "🤖 what we have now:"
ls -lh $OUT_DIR/*.png
ls -lh public/*.png