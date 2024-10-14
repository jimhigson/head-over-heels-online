#!/bin/bash

echo "🤖 converting iff -> png"
yes | ffmpeg -i gfx/sprites.iff gfx/sprites.png
# make sprite mask colour actually transparent in the png (dpaint uses a normal colour)
echo "🤖 making transparent"
magick gfx/sprites.png -transparent \#718b90 gfx/sprites.png
echo "🤖 reducing palette"
pngquant -vf --quality 100-100 \
    --ext .png \
    -- gfx/sprites.png 
echo "🤖 what we have now:"
ls -lh gfx/sprites*