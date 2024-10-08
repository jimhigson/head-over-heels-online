#!/bin/bash

yes | ffmpeg -i gfx/sprites.iff gfx/sprites.png
pngquant -vf gfx/sprites.png
ls -lh gfx/sprites*