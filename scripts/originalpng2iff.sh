#!/bin/bash

for filename in gfx/originals/*; do
    [ -e "$filename" ] || continue
    
    iffFilename=$(echo $filename | sed "s/.png/_iff/")
    # actually, this doesn't work so I used dpaint.js to convert them since there aren't that many
    echo ffmpeg -i $filename -f ilbm $iffFilename
done