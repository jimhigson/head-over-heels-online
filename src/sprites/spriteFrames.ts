import { SpritesheetFrameData } from "pixi.js";
import { Direction, Planet } from "../modelTypes";

export type SpriteFrame = SpritesheetFrameData['frame'];
export type SpritePosition = Pick<SpriteFrame, 'x' | 'y'>;
export type SpriteSize = Pick<SpriteFrame, 'w' | 'h'>;

type AnimatedSpriteLocation = SpriteFrame[];

/**
 * r and d walls are not drawn since they would hide the game
 */
export type DrawnWallDirection = Extract<Direction, 'away' | 'left'>;

type PlanetBackgroundSpriteFrames<TWallNames extends string> = {

    walls: {
        // we only give the left since the 'away' can be implied from reflection
        // (they're always like this on the sprite sheet to make it easier to draw them together)
        names: TWallNames[],
        firstSpriteXy: SpritePosition
    },
    // floor can be implied from the wall sprite location
};
type DoorSpriteFrames = { fg: SpriteFrame, bg: SpriteFrame };

type BackgroundSpriteFrames = Record<Planet, PlanetBackgroundSpriteFrames<string>> & {
    generic: {
        doors: {
            towardsAway: DoorSpriteFrames,
            leftRight: DoorSpriteFrames
        }
    }
};

export type SpriteMap<TKey extends string> = Record<TKey, SpriteFrame | AnimatedSpriteLocation>;
export type DirectionMap = Record<Direction, AnimatedSpriteLocation>;



export type SpriteFrames = {
    world: BackgroundSpriteFrames,
    //player: SpriteMap<string>
};
export const spriteFrames = {

    world: {
        generic: {
            doors: {
                towardsAway: {
                    fg: {
                        x: 0, y: 0, w: 32, h: 32
                    },
                    bg: {
                        x: 0, y: 0, w: 32, h: 32
                    }
                },
                leftRight: {
                    fg: {
                        x: 0, y: 0, w: 32, h: 32
                    },
                    bg: {
                        x: 0, y: 0, w: 32, h: 32
                    }
                }
            }
        },
        blacktooth: {
            walls: {
                names: [
                    'plain',
                    'shield',
                    'armour',
                    'window',
                ],
                firstSpriteXy: { x: 400, y: 221 },
            },
        },
        bookworld: {
            walls: {
                names: ['book', 'nook'],
                firstSpriteXy: { x: 0, y: 0 },
            },
        },
        egyptus: {
            walls: {
                names: ['sarcophagus', 'hieroglyphics'],
                firstSpriteXy: { x: 0, y: 0 },
            }
        },
        market: {
            walls: {
                names: ['sarcophagus', 'hieroglyphics'],
                firstSpriteXy: { x: 0, y: 0 },
            },
        },
        moonbase: {
            walls: {
                names: ['sarcophagus', 'hieroglyphics'],
                firstSpriteXy: { x: 0, y: 0 },
            },
        },
        penitentiary: {
            walls: {
                names: ['sarcophagus', 'hieroglyphics'],
                firstSpriteXy: { x: 0, y: 0 },
            },
        },
        safari: {
            walls: {
                names: ['sarcophagus', 'hieroglyphics'],
                firstSpriteXy: { x: 0, y: 0 },
            },
        }
    },
    /*
    player: {
        head: {
            idle: [
                {
                    x: 0, y: 0, w: 32, h: 32
                } satisfies SpriteFrame,
                {
                    x: 0, y: 0, w: 32, h: 32
                } satisfies SpriteFrame
            ],
            walking: {
                l: [
                    {
                        x: 0, y: 0, w: 32, h: 32
                    } satisfies SpriteFrame,
                    {
                        x: 0, y: 0, w: 32, h: 32
                    } satisfies SpriteFrame,
                    {
                        x: 0, y: 0, w: 32, h: 32
                    } satisfies SpriteFrame,
                ]
            },
            falling: {
                x: 0, y: 0, w: 32, h: 32
            } satisfies SpriteFrame,
        },
        heels: {
        },
    },
    collectables: {
        bag: {
            x: 0, y: 0, w: 32, h: 32
        },
        hooter: {
            x: 0, y: 0, w: 32, h: 32
        },
        donuts: {
            x: 0, y: 0, w: 32, h: 32
        },
        bunny: [{
            x: 0, y: 0, w: 32, h: 32
        }, {
            x: 0, y: 0, w: 32, h: 32
        }],
        crown: {
            x: 0, y: 0, w: 32, h: 32
        }
    }
        */
} satisfies SpriteFrames;
