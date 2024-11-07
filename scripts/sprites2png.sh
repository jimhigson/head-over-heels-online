#!/bin/bash

echo "🤖 converting iff -> png"

# curves are trying to approximate the iff colour space transition to png:
# https://chatgpt.com/share/6720c751-1dfc-8007-815f-6b1d156962ef
yes | ffmpeg -i gfx/sprites.iff -vf "curves=r='0.00/0.00 0.25/0.22 0.50/0.50 0.75/0.80 1.00/1.00':g='0.00/0.00 0.25/0.25 0.50/0.50 0.75/0.75 1.00/1.00':b='0.00/0.00 0.25/0.23 0.50/0.50 0.75/0.75 1.00/1.00'" gfx/sprites.png

#
# make sprite mask colour actually transparent in the png (dpaint uses a normal colour)
echo "🤖 making transparent"
magick gfx/sprites.png -transparent \#3a4e4a gfx/sprites.png

echo "🤖 reducing palette"
pngquant -vf --quality 100-100 \
    --ext .png \
    -- gfx/sprites.png 
echo "🤖 what we have now:"
ls -lh gfx/sprites*