- why all sprites have an extra 1px transparency (rounding errors in texels)
- why dpaint still the best for sprite work (30 years later)
    - continuous vs discrete
        - eg, stencil - simple selection from palette in dpaint vs complex ranges and feathering
        - for cutting out, for putting the cutots on the screen with another stencil (eg, making bottom of wall tiles transparent)
    - putting the saves on a hard drive visible to host os
    - using ffmpeg to converts
- animation in dpaint for sprite work

- how to work with dpaint in 202x?        

- sub-pixel positioning of sprites
- why jumping into ladder-gaps is hard
- working out z-order
    - x+y+z
    - x+y+weighted z
    - topological sorting
    - top sort + hexagon bounds
    - why this meant walls couldn't overdraw their bottom corners on the floor
        - why the wall with overdraw went outside its BB
        - this shows on room #blacktooth11 with the near door        
        - how this had to be reproduced - overdrawing on the floor tiles

- why write 16 "sample" pixels out to the top-left of the spritesheet?

- rendering the floor
    - why the floor is a chessboard (rendering chequred squares)
    - ... and then overdraw with a mask

- why (and how) I wrote my own markdown parser

- Safari's issues with dynamic imports and how I fixed them

- Iter helper methods and polyfilling with dynamic imports