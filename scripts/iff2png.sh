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
colorNames=(
pureBlack
shadow
midGrey
lightGrey
white
pastelBlue
metallicBlue
pink
moss
redShadow
midRed
lightBeige
highlightBeige
replaceLight
replaceDark
ss_alphaKey
ss_background
swop_yellow
swop_yellowMid
swop_yellowDim
swop_green
swop_greenDim
swop_cyan
swop_cyanMid
swop_cyanDim
swop_magenta
swop_magentaDim
swop_white
swop_whiteMid
swop_whiteDim
shadow_greyBlue
shadow_brown
shadow_magenta
shadow_blue
)
lastColorIndex=$((${#colorNames[@]} - 1))

# palette sampling grid position
paletteStartX=562
paletteStartY=663
paletteStepY=10
paletteStepX=90
paletteColorsPerColumn=17

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

# call like : write_palette(sourcePng, destinationName, [floodFillTransparent])
write_palette() {
    local sourcePng=$1
    local destName=$2
    local removeSample=${3:-false}

    echo "🤖 sampling 🎨 palette from $sourcePng -> $destName.json"
    echo "{" >> "$TMP_DIR/$destName.json"

    for i in $(seq 0 $lastColorIndex);
    do
        x=$((paletteStartX + (i / paletteColorsPerColumn) * paletteStepX))
        y=$((paletteStartY + (i % paletteColorsPerColumn) * paletteStepY))
        # taking the first 7 chars strips off the alpha, ie '#AABBCCFF' -> '#AABBCC'
        color=$(magick "$sourcePng" -format "#%[hex:u.p{$x,$y}]" info: | cut -c1-7);
        print_with_bg_color "$(printf '%-16s' "${colorNames[$i]}") ($x,$y) $color" "$color"
        echo "  \"${colorNames[$i]}\": \"$color\"" >> "$TMP_DIR/$destName.json"

        # flood-fill the sampled location with transparent to remove palette swatches from image
        if [ "$removeSample" = "true" ]; then
            magick "$sourcePng" -fill transparent -floodfill "+${x}+${y}" "$color" "$sourcePng"
        fi

        if [ $i -ne $lastColorIndex ]; then
            echo "," >> "$TMP_DIR/$destName.json"
        fi
    done
    echo "}" >> "$TMP_DIR/$destName.json"
    node_modules/.bin/prettier --write "$TMP_DIR/$destName.json"
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
# put the easily visually parsable png version somewhere - this is never used by the game
cp "$TMP_DIR/sprites.png" "$TMP_DIR/sprites.borders".png

echo "🤖 sampling palette -> {json, ts}"
write_palette "$TMP_DIR/sprites.png" spritesheetPalette true
# sprites_dim_lut.png has been edited using the curves tool in Krita to adjust the colours; we don't use most of the image
# but we can sample the palette from it:
write_palette gfx/palette_dim_lut.png spritesheetPaletteDim


# make sprite mask colours actually transparent in the png (dpaint uses rgb colours, no alpha channel)
echo "🤖 making transparent"
alphaKeyColor=$(jq -r '.ss_alphaKey' "$TMP_DIR/spritesheetPalette.json")
backgroundColor=$(jq -r '.ss_background' "$TMP_DIR/spritesheetPalette.json")
print_with_bg_color "alpha key: $alphaKeyColor" "$alphaKeyColor"
print_with_bg_color "background: $backgroundColor" "$backgroundColor"

magick "$TMP_DIR/sprites.png" -transparent "$alphaKeyColor" -transparent "$backgroundColor" "$TMP_DIR/sprites.png"

echo "🤖🎨 reducing 🎨 palette for $TMP_DIR/sprites.png"
pngquant -vf --quality 100-100 \
    --ext .png \
    -- "$TMP_DIR/sprites.png"
magick identify -verbose "$TMP_DIR/sprites.png" | grep -E "^  (Geometry|Colorspace|Type|Depth|Colors):"
echo "  Filesize: $(ls -lh "$TMP_DIR/sprites.png" | awk '{print $5}')"

#make the sprite:
ICON_FRAME=$(scripts/iconLocationOnSpriteSheet.ts)
echo "🤖 ✂️ cutting out icon at frame (XxY+W+H) is $ICON_FRAME"
# crop out
magick $TMP_DIR/sprites.png -crop $ICON_FRAME +repage $TMP_DIR_ICONS/icon.png
# move to centre of icon (if it doesn't fill the whole frame)
magick $TMP_DIR_ICONS/icon.png -trim -gravity center -background transparent -extent 24x24 $TMP_DIR_ICONS/icon.png
# remove transparency and put in fixed background:
ICON_BG=`jq -r '.moss' src/_generated/palette/spritesheetPalette.json`
print_with_bg_color "ICON_BACKGROUND ${ICON_BG}" "$ICON_BG"
magick $TMP_DIR_ICONS/icon.png -background $ICON_BG -alpha remove $TMP_DIR_ICONS/icon.png
# scale with nearest neighbour up so it remains pixelated after phone/tablet/etc scales it up:
magick $TMP_DIR_ICONS/icon.png -filter point -resize 192x192 $TMP_DIR_ICONS/icon-192.png
magick $TMP_DIR_ICONS/icon.png -filter point -resize 512x512 $TMP_DIR_ICONS/icon-512.png
pngquant -vf --quality 100-100 \
    --ext .png \
    -- $TMP_DIR_ICONS/icon-{192,512}.png
for icon in $TMP_DIR_ICONS/icon-{192,512}.png; do
    echo "$icon:"
    magick identify -verbose "$icon" | grep -E "^  (Geometry|Colorspace|Type|Depth|Colors):"
    echo "  Filesize: $(ls -lh "$icon" | awk '{print $5}')"
done

echo "🤖 moving temp to real"
cp $TMP_DIR/*.png $OUT_DIR
cp $TMP_DIR/*.json src/_generated/palette
rm public/icon*.png
cp $TMP_DIR_ICONS/*.png public

echo "🤖 deleting the temp dir"
rm -fR $TMP_DIR
rm -fR $TMP_DIR_ICONS

# echo "🤖 what we have now:"
# ls -lh $OUT_DIR/*.png
# ls -lh public/*.png