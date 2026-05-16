// Auto-generated flattened types
// Generated from AnyRoomJson

// Type aliases for generic parameters that appear in the output
type RoomItemId = string;

export type RoomJsonSchema = {
  $schema?: string;
  id: string;
  /**
   * custom room height that can be set per-room in blocks.
   * If not set, the default room height is used. Only a few of the original game rooms need this
   * to make the transition to the next room above work better. Can be used to fine-tune the
   * point in a jump where the room above loads.
   */
  height?: number;
  /**
   * TODO: rename to scenery
   */
  planet:
    | "jail"
    | "blacktooth"
    | "bookworld"
    | "egyptus"
    | "market"
    | "moonbase"
    | "penitentiary"
    | "safari";
  /**
   * the color the room was shown in in the zx spectrum original game. This is used to provide highlight
   * colours in each room
   */
  color: {
    hue: "yellow" | "cyan" | "green" | "magenta" | "white";
    shade: "basic" | "dimmed";
  };
  roomAbove?: string;
  subRoomAbove?: string;
  /**
   * usually, the ceiling portal's relative point is the centre of the room. However, in cases
   * where multi-rooms are stitched together into a single room, this relationship is broken.
   * Ie, bookworld28/ bookworld29. In this case, this point is used instead
   */
  ceilingRelativePoint?: {
    x: number;
    y: number;
  };
  roomBelow?: string;
  subRoomBelow?: string;
  /**
   * by keying each item with an id, it makes the diffing easier since the array is no longer
   * position-dependent
   */
  items: Record<
    string,
    | {
        type: "wall";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              direction: "right";
              times?: {
                y: number;
              };
            }
          | {
              /**
               * this wall would normally be found on the (invisible) towards side of the room
               */
              direction: "towards";
              times?: {
                x: number;
              };
            }
          | {
              /**
               * this wall would normally be found/rendered on the away side of the room
               */
              direction: "away";
              /**
               * the tiles to show - the length of this array also determines the size of the wall
               */
              tiles: any[];
            }
          | {
              /**
               * this wall would normally be found/rendered on the left side of the room
               */
              direction: "left";
              /**
               * the tiles to show - the length of this array also determines the size of the wall
               */
              tiles: any[];
            };
      }
    | {
        type: "ball";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: Record<string, never>;
      }
    | {
        type: "barrier";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
          axis: "x" | "y";
          disappearing?: {
            on: "touch";
          };
        };
      }
    | {
        type: "block";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
          style: "book" | "artificial" | "organic" | "tower";
          disappearing?: {
            on: "stand";
          };
        };
      }
    | {
        type: "bubbles";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          style: "white";
          /**
           * it is the bubbles that play the sound when something is fading
           * out, not the item itself. This property helps us know which sound
           * to play
           */
          was:
            | {
                type: "disappearing";
              }
            | {
                type: "firedDoughnut";
              }
            | {
                type: "hushPuppy";
              }
            | {
                type: "pickup";
                gives:
                  | "shield"
                  | "crown"
                  | "bag"
                  | "doughnuts"
                  | "extra-life"
                  | "fast"
                  | "hooter"
                  | "jumps"
                  | "reincarnation"
                  | "scroll";
              };
        };
      }
    | {
        type: "button";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              type: "in-store";
              action: "nextSpritesOption";
            }
          | {
              /**
               * this button targets items in the room. This is the default, so
               * also used if undefined
               */
              type?: "in-room";
              modifies: (
                | {
                    expectType: "monster" | "movingPlatform";
                    targets?: string[];
                    /**
                     * true is a shorthand for monsters/platforms that are activated by default:
                     *   {leftState: {activated: true, everActivated:true}, rightState: {activated:false}},
                     * false is shorthand for monsters/platforms that are deactivated by default:
                     *   {leftState: {activated: false}, rightState: {activated: true, everActivated:true}},
                     */
                    activates?: false | true;
                    /**
                     * shortcut - gives this direction for left state and opposite direction for right state
                     */
                    switchedDirection?: "right" | "towards" | "away" | "left";
                    leftState?: {
                      /**
                       * if given, the item disappears after the specified interaction.
                       * This must be null (not undefined) so switches can tell the difference
                       * between having no setting, and having a setting to change to null
                       * when they make something not disappearing
                       */
                      disappearing?: null | {
                        on: "touch" | "stand";
                        /**
                         * if given, the item will disappear only if stood/touched by items of this type.
                         * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
                         * or ['head'] eg for doughnuts that only head can collect
                         */
                        byType?: (
                          | "wall"
                          | "ball"
                          | "barrier"
                          | "block"
                          | "bubbles"
                          | "button"
                          | "charles"
                          | "conveyor"
                          | "deadlyBlock"
                          | "emitter"
                          | "firedDoughnut"
                          | "floatingText"
                          | "floor"
                          | "hushPuppy"
                          | "joystick"
                          | "lift"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spikes"
                          | "spring"
                          | "switch"
                          | "teleporter"
                          | "timer"
                          | "head"
                          | "heels"
                          | "headOverHeels"
                          | "stopAutowalk"
                          | "soundEffect"
                          | "doorFrame"
                          | "doorLegs"
                          | "portal"
                          | "blocker"
                          | "particle"
                          | "outOfBounds"
                        )[];
                      };
                      /**
                       * activated for us is a boolean, not the many-states from the json config, ie it is stateful
                       * on if the item is currently activated (so they can render differently)
                       */
                      activated?: false | true;
                      /**
                       * if this item has ever been activated, in the lifetime of the room. Charging cybermen will
                       * have this flag as false so long as they are charging
                       */
                      everActivated?: false | true;
                      /**
                       * The item will be removed from the room after the room it is in has more than this roomTime.
                       * To guarantee removal on the next frame (effectively immediately)
                       * set to -1. Otherwise, can set to the current roomTime + duration of an animation
                       * that needs to play
                       *
                       * If null, the item is not scheduled for removal (the normal case)
                       */
                      expires?: null | number;
                      facing?: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                    rightState?: {
                      /**
                       * if given, the item disappears after the specified interaction.
                       * This must be null (not undefined) so switches can tell the difference
                       * between having no setting, and having a setting to change to null
                       * when they make something not disappearing
                       */
                      disappearing?: null | {
                        on: "touch" | "stand";
                        /**
                         * if given, the item will disappear only if stood/touched by items of this type.
                         * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
                         * or ['head'] eg for doughnuts that only head can collect
                         */
                        byType?: (
                          | "wall"
                          | "ball"
                          | "barrier"
                          | "block"
                          | "bubbles"
                          | "button"
                          | "charles"
                          | "conveyor"
                          | "deadlyBlock"
                          | "emitter"
                          | "firedDoughnut"
                          | "floatingText"
                          | "floor"
                          | "hushPuppy"
                          | "joystick"
                          | "lift"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spikes"
                          | "spring"
                          | "switch"
                          | "teleporter"
                          | "timer"
                          | "head"
                          | "heels"
                          | "headOverHeels"
                          | "stopAutowalk"
                          | "soundEffect"
                          | "doorFrame"
                          | "doorLegs"
                          | "portal"
                          | "blocker"
                          | "particle"
                          | "outOfBounds"
                        )[];
                      };
                      /**
                       * activated for us is a boolean, not the many-states from the json config, ie it is stateful
                       * on if the item is currently activated (so they can render differently)
                       */
                      activated?: false | true;
                      /**
                       * if this item has ever been activated, in the lifetime of the room. Charging cybermen will
                       * have this flag as false so long as they are charging
                       */
                      everActivated?: false | true;
                      /**
                       * The item will be removed from the room after the room it is in has more than this roomTime.
                       * To guarantee removal on the next frame (effectively immediately)
                       * set to -1. Otherwise, can set to the current roomTime + duration of an animation
                       * that needs to play
                       *
                       * If null, the item is not scheduled for removal (the normal case)
                       */
                      expires?: null | number;
                      facing?: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                  }
                | {
                    expectType: "switch";
                    targets?: string[];
                    /**
                     * this switch will flip the other switch when it is flipped
                     */
                    flip: true;
                  }
                | {
                    expectType: "block";
                    targets?: string[];
                    /**
                     * if true, equivalent to leftState disappearing on stand, right state not disappearing
                     * if false, equivalent to leftState not disappearing, right state disappearing on stand
                     */
                    makesStable: boolean;
                  }
                | {
                    expectType: "block";
                    targets?: string[];
                    leftState: {
                      disappearing?: {
                        on: "stand";
                      };
                    };
                    rightState: {
                      disappearing?: null;
                    };
                  }
                | {
                    expectType: "charles";
                    targets?: string[];
                    /**
                     * true is a shorthand for charles bots that are activated by default:
                     *   {leftState: {activated: true}, rightState: {activated: false}},
                     * false is shorthand for charles bots that are deactivated by default:
                     *   {leftState: {activated: false}, rightState: {activated: true}},
                     */
                    activates?: false | true;
                    leftState?: {
                      activated?: false | true;
                    };
                    rightState?: {
                      activated?: false | true;
                    };
                  }
                | {
                    expectType: "conveyor";
                    targets?: string[];
                    /**
                     * true is a shorthand for conveyors that the switch enables
                     *   {leftState: {disabled: false}, rightState: {disabled: true}},
                     * false is a shorthand for conveyors that the switch disables
                     *   {leftState: {disabled: true}, rightState: {disabled: false}},
                     */
                    activates?: false | true;
                    /**
                     * true means the left setting reverses the conveyor (opposite of config direction),
                     * false means the right setting reverses it.
                     * "reverse" = set direction to the opposite of the item's config.direction.
                     */
                    reverses?: false | true;
                    leftState?: {
                      disabled?: false | true;
                      direction?: "right" | "towards" | "away" | "left";
                      disappearing?: null | {
                        on: "stand";
                      };
                    };
                    rightState?: {
                      disabled?: false | true;
                      direction?: "right" | "towards" | "away" | "left";
                      disappearing?: null | {
                        on: "stand";
                      };
                    };
                  }
                | {
                    expectType: "deadlyBlock";
                    targets?: string[];
                    /**
                     * true is a shorthand for deadly blocks that start disabled:
                     *   {leftState: {disabled: true}, rightState: {disabled: false}},
                     * false is a shorthand for deadly blocks that start enabled:
                     *   {leftState: {disabled: false}, rightState: {disabled: true}},
                     */
                    disables?: false | true;
                    leftState?: {
                      disabled?: false | true;
                    };
                    rightState?: {
                      disabled?: false | true;
                    };
                  }
                | {
                    expectType: "emitter";
                    targets?: string[];
                    leftState: {
                      lastEmittedAtRoomTime?: number;
                      quantityEmitted?: number;
                      playerInsideAtRoomTime?: number;
                      /**
                       * what does this emitter emit? Could be (potentially) any free item
                       */
                      emits?: {
                        type:
                          | "ball"
                          | "charles"
                          | "firedDoughnut"
                          | "floatingText"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring";
                        config:
                          | {
                              gives: "crown";
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              gives:
                                | "shield"
                                | "bag"
                                | "doughnuts"
                                | "extra-life"
                                | "fast"
                                | "hooter"
                                | "jumps"
                                | "reincarnation";
                            }
                          | {
                              gives: "scroll";
                              source: "inline";
                              markdown: string | string[];
                            }
                          | {
                              gives: "scroll";
                              source: "manual";
                              page:
                                | "blacktooth"
                                | "egyptus"
                                | "penitentiary"
                                | "safari"
                                | "bag"
                                | "doughnuts"
                                | "hooter"
                                | "head"
                                | "heels"
                                | "teleportBack"
                                | "historyOfTheBlacktoothEmpire"
                                | "theGame"
                                | "bookWorld"
                                | "reincarnationFish"
                                | "cuddlyStuffedWhiteRabbits"
                                | "crowns"
                                | "teleports"
                                | "springs"
                                | "switches"
                                | "conveyorBelts"
                                | "hushPuppies"
                                | "theEmperorsGuardian"
                                | "swopKey"
                                | "hintsAndTips"
                                | "credits"
                                | "installPwa"
                                | "installNative";
                            }
                          | Record<string, any>
                          | {
                              activated?: false | true;
                            }
                          | {
                              direction?:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              /**
                               * the lines of text to display, each rendered as a separate row
                               */
                              textLines: string[];
                              /**
                               * the room time when this floating text starts; used to calculate the rise animation age.
                               * if not given, will start right away at time zero.
                               * if given, will delay starting until this time
                               */
                              appearanceRoomTime?: number;
                              /**
                               * if true, lines oscillate horizontally as they rise
                               */
                              sway?: false | true;
                            }
                          | {
                              which: "bubbleRobot";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "computerBot";
                              movement:
                                | "patrol-randomly-xy4-and-reverse"
                                | "towards-on-shortest-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "dalek";
                              movement: "patrol-randomly-diagonal";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephant";
                              movement: "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephantHead";
                              movement: "turn-to-player";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperor";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperorsGuardian";
                              movement: "towards-analogue-unless-planet-crowns";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "homingBot";
                              movement: "towards-tripped-on-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "monkey";
                              movement:
                                | "towards-on-shortest-axis-xy4"
                                | "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "skiHead";
                              activated: "off" | "on";
                              movement: "back-forth" | "clockwise" | "forwards";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              style: "greenAndPink" | "starsAndStripes";
                            }
                          | {
                              which: "turtle";
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "forwards"
                                | "anticlockwise";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "cyberman";
                              activated: "off" | "on" | "after-player-near";
                              movement: "towards-on-shortest-axis-xy4";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "deadFish";
                            }
                          | {
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "towards-analogue";
                              activated: "off" | "on" | "on-stand";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "drum" | "cube" | "sticks";
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * an item in the destination room this teleporter should go to - the
                               * player will be moved to atop this item
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               *
                               * note: not RoomItemId because that is the ids of items in *this* room, but this
                               * is pointing to another room
                               */
                              toItemId?: string;
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item.
                               */
                              toRoom?: string;
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * where in the destination room this teleporter should go - usually
                               * to atop another teleporter, but could be anywhere.
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               */
                              toPosition: {
                                x: number;
                                y: number;
                                z: number;
                              };
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item
                               * If undefined, is a same-room teleporter
                               */
                              toRoom?: string;
                            }
                          | {
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              which: "head" | "heels" | "headOverHeels";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              style: "book" | "puck";
                            }
                          | {
                              style: "spikyBall";
                              startingPhase: 1 | 2;
                            };
                      };
                      /**
                       * how long between emissions?
                       */
                      period?: number;
                      /**
                       * how long to delay until the first emitting?
                       * after this time the first emit will happen, then all others will
                       * continue at the period interval.
                       * undefined is treated the same as 0
                       */
                      delay?: number;
                      /**
                       * how many total should this emitter emit? Null for no limit
                       */
                      maximum?: null | number;
                      /**
                       * How many items emitted from this emitter can be in the room at once?
                       * If undefined, no limit. If already this many items in the room, the
                       * items will have to be removed from the room before more can be emitted
                       * (for example, collecting an emitted pickup)
                       */
                      maximumAtOnce?: number;
                    };
                    rightState: {
                      lastEmittedAtRoomTime?: number;
                      quantityEmitted?: number;
                      playerInsideAtRoomTime?: number;
                      /**
                       * what does this emitter emit? Could be (potentially) any free item
                       */
                      emits?: {
                        type:
                          | "ball"
                          | "charles"
                          | "firedDoughnut"
                          | "floatingText"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring";
                        config:
                          | {
                              gives: "crown";
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              gives:
                                | "shield"
                                | "bag"
                                | "doughnuts"
                                | "extra-life"
                                | "fast"
                                | "hooter"
                                | "jumps"
                                | "reincarnation";
                            }
                          | {
                              gives: "scroll";
                              source: "inline";
                              markdown: string | string[];
                            }
                          | {
                              gives: "scroll";
                              source: "manual";
                              page:
                                | "blacktooth"
                                | "egyptus"
                                | "penitentiary"
                                | "safari"
                                | "bag"
                                | "doughnuts"
                                | "hooter"
                                | "head"
                                | "heels"
                                | "teleportBack"
                                | "historyOfTheBlacktoothEmpire"
                                | "theGame"
                                | "bookWorld"
                                | "reincarnationFish"
                                | "cuddlyStuffedWhiteRabbits"
                                | "crowns"
                                | "teleports"
                                | "springs"
                                | "switches"
                                | "conveyorBelts"
                                | "hushPuppies"
                                | "theEmperorsGuardian"
                                | "swopKey"
                                | "hintsAndTips"
                                | "credits"
                                | "installPwa"
                                | "installNative";
                            }
                          | Record<string, any>
                          | {
                              activated?: false | true;
                            }
                          | {
                              direction?:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              /**
                               * the lines of text to display, each rendered as a separate row
                               */
                              textLines: string[];
                              /**
                               * the room time when this floating text starts; used to calculate the rise animation age.
                               * if not given, will start right away at time zero.
                               * if given, will delay starting until this time
                               */
                              appearanceRoomTime?: number;
                              /**
                               * if true, lines oscillate horizontally as they rise
                               */
                              sway?: false | true;
                            }
                          | {
                              which: "bubbleRobot";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "computerBot";
                              movement:
                                | "patrol-randomly-xy4-and-reverse"
                                | "towards-on-shortest-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "dalek";
                              movement: "patrol-randomly-diagonal";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephant";
                              movement: "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephantHead";
                              movement: "turn-to-player";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperor";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperorsGuardian";
                              movement: "towards-analogue-unless-planet-crowns";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "homingBot";
                              movement: "towards-tripped-on-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "monkey";
                              movement:
                                | "towards-on-shortest-axis-xy4"
                                | "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "skiHead";
                              activated: "off" | "on";
                              movement: "back-forth" | "clockwise" | "forwards";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              style: "greenAndPink" | "starsAndStripes";
                            }
                          | {
                              which: "turtle";
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "forwards"
                                | "anticlockwise";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "cyberman";
                              activated: "off" | "on" | "after-player-near";
                              movement: "towards-on-shortest-axis-xy4";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "deadFish";
                            }
                          | {
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "towards-analogue";
                              activated: "off" | "on" | "on-stand";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "drum" | "cube" | "sticks";
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * an item in the destination room this teleporter should go to - the
                               * player will be moved to atop this item
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               *
                               * note: not RoomItemId because that is the ids of items in *this* room, but this
                               * is pointing to another room
                               */
                              toItemId?: string;
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item.
                               */
                              toRoom?: string;
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * where in the destination room this teleporter should go - usually
                               * to atop another teleporter, but could be anywhere.
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               */
                              toPosition: {
                                x: number;
                                y: number;
                                z: number;
                              };
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item
                               * If undefined, is a same-room teleporter
                               */
                              toRoom?: string;
                            }
                          | {
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              which: "head" | "heels" | "headOverHeels";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              style: "book" | "puck";
                            }
                          | {
                              style: "spikyBall";
                              startingPhase: 1 | 2;
                            };
                      };
                      /**
                       * how long between emissions?
                       */
                      period?: number;
                      /**
                       * how long to delay until the first emitting?
                       * after this time the first emit will happen, then all others will
                       * continue at the period interval.
                       * undefined is treated the same as 0
                       */
                      delay?: number;
                      /**
                       * how many total should this emitter emit? Null for no limit
                       */
                      maximum?: null | number;
                      /**
                       * How many items emitted from this emitter can be in the room at once?
                       * If undefined, no limit. If already this many items in the room, the
                       * items will have to be removed from the room before more can be emitted
                       * (for example, collecting an emitted pickup)
                       */
                      maximumAtOnce?: number;
                    };
                  }
                | {
                    expectType: "joystick";
                    targets?: string[];
                    leftState: {
                      /**
                       * item ids of all the items (probably Charles) that this joystick controls.
                       * if omitted, the joystick controls every charles in its room — which is
                       * how the original game always behaved.
                       */
                      controls?: string[];
                    };
                    rightState: {
                      /**
                       * item ids of all the items (probably Charles) that this joystick controls.
                       * if omitted, the joystick controls every charles in its room — which is
                       * how the original game always behaved.
                       */
                      controls?: string[];
                    };
                  }
                | {
                    expectType: "lift";
                    targets?: string[];
                    leftState: {
                      direction?: "down" | "up";
                      vels?: {
                        lift: {
                          x: number;
                          y: number;
                          z: number;
                        };
                      };
                      top?: number;
                      bottom?: number;
                    };
                    rightState: {
                      direction?: "down" | "up";
                      vels?: {
                        lift: {
                          x: number;
                          y: number;
                          z: number;
                        };
                      };
                      top?: number;
                      bottom?: number;
                    };
                  }
                | {
                    expectType: "teleporter";
                    targets?: string[];
                    leftState: {
                      toRoom: string;
                      toPosition: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                    rightState: {
                      toRoom: string;
                      toPosition: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                  }
                | {
                    expectType: "timer";
                    targets?: string[];
                    activates?: false | true;
                    leftState?: {
                      activated?: false | true;
                    };
                    rightState?: {
                      activated?: false | true;
                    };
                  }
              )[];
            };
      }
    | {
        type: "charles";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          activated?: false | true;
        };
      }
    | {
        type: "conveyor";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
          direction: "right" | "towards" | "away" | "left";
          /**
           * speed multiplier — undefined is treated as 1 (original game speed)
           */
          speed?: number;
          disabled?: false | true;
          disappearing?: {
            on: "stand";
          };
        };
      }
    | {
        type: "deadlyBlock";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
          style: "toaster" | "volcano";
          disabled?: false | true;
        };
      }
    | {
        type: "door";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          toRoom: string | "$$final";
          /**
           * the id of the door in the destination room. This usually does not need to be given
           * since the game can choose the door facing the right way from the destination room.
           * only give this if there are multiple doors in the same direction between the two
           * rooms
           */
          toDoor?: string;
          direction: "right" | "towards" | "away" | "left";
          meta?: {
            toSubRoom?: string;
          };
        };
      }
    | {
        type: "emitter";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          /**
           * what does this emitter emit? Could be (potentially) any free item
           */
          emits:
            | {
                type: "head";
                config: Record<string, never>;
              }
            | {
                type: "heels";
                config: Record<string, never>;
              }
            | {
                type: "headOverHeels";
                config: Record<string, never>;
              }
            | {
                type: "monster";
                config:
                  | {
                      which: "bubbleRobot";
                      movement: "patrol-randomly-xy8";
                      activated: "off" | "on";
                    }
                  | {
                      which: "computerBot";
                      movement:
                        | "patrol-randomly-xy4-and-reverse"
                        | "towards-on-shortest-axis-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "dalek";
                      movement: "patrol-randomly-diagonal";
                      activated: "off" | "on";
                    }
                  | {
                      which: "elephant";
                      movement: "patrol-randomly-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "elephantHead";
                      movement: "turn-to-player";
                      startDirection: "right" | "towards" | "away" | "left";
                      activated: "off" | "on";
                    }
                  | {
                      which: "emperor";
                      movement: "towards-analogue";
                      activated: "off" | "on";
                    }
                  | {
                      which: "emperorsGuardian";
                      movement: "towards-analogue-unless-planet-crowns";
                      activated: "off" | "on";
                    }
                  | {
                      which: "helicopterBug";
                      movement: "towards-analogue";
                      activated: "off" | "on";
                    }
                  | {
                      which: "helicopterBug";
                      movement: "patrol-randomly-xy8";
                      activated: "off" | "on";
                    }
                  | {
                      which: "homingBot";
                      movement: "towards-tripped-on-axis-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "monkey";
                      movement:
                        | "towards-on-shortest-axis-xy4"
                        | "patrol-randomly-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "skiHead";
                      activated: "off" | "on";
                      movement: "back-forth" | "clockwise" | "forwards";
                      startDirection: "right" | "towards" | "away" | "left";
                      style: "greenAndPink" | "starsAndStripes";
                    }
                  | {
                      which: "turtle";
                      movement:
                        | "back-forth"
                        | "clockwise"
                        | "forwards"
                        | "anticlockwise";
                      startDirection: "right" | "towards" | "away" | "left";
                      activated: "off" | "on";
                    }
                  | {
                      which: "cyberman";
                      activated: "off" | "on" | "after-player-near";
                      movement: "towards-on-shortest-axis-xy4";
                      startDirection: "right" | "towards" | "away" | "left";
                    };
              }
            | {
                type: "ball";
                config: Record<string, never>;
              }
            | {
                type: "charles";
                config: {
                  activated?: false | true;
                };
              }
            | {
                type: "pushableBlock";
                config: Record<string, never>;
              }
            | {
                type: "movingPlatform";
                config: {
                  movement: "back-forth" | "clockwise" | "towards-analogue";
                  activated: "off" | "on" | "on-stand";
                  startDirection: "right" | "towards" | "away" | "left";
                };
              }
            | {
                type: "moveableDeadly";
                config: {
                  style: "deadFish";
                };
              }
            | {
                type: "pickup";
                config:
                  | {
                      gives: "crown";
                      planet:
                        | "blacktooth"
                        | "bookworld"
                        | "egyptus"
                        | "penitentiary"
                        | "safari";
                    }
                  | {
                      gives:
                        | "shield"
                        | "bag"
                        | "doughnuts"
                        | "extra-life"
                        | "fast"
                        | "hooter"
                        | "jumps"
                        | "reincarnation";
                    }
                  | {
                      gives: "scroll";
                      source: "inline";
                      markdown: string | string[];
                    }
                  | {
                      gives: "scroll";
                      source: "manual";
                      page:
                        | "blacktooth"
                        | "egyptus"
                        | "penitentiary"
                        | "safari"
                        | "bag"
                        | "doughnuts"
                        | "hooter"
                        | "head"
                        | "heels"
                        | "teleportBack"
                        | "historyOfTheBlacktoothEmpire"
                        | "theGame"
                        | "bookWorld"
                        | "reincarnationFish"
                        | "cuddlyStuffedWhiteRabbits"
                        | "crowns"
                        | "teleports"
                        | "springs"
                        | "switches"
                        | "conveyorBelts"
                        | "hushPuppies"
                        | "theEmperorsGuardian"
                        | "swopKey"
                        | "hintsAndTips"
                        | "credits"
                        | "installPwa"
                        | "installNative";
                    };
              }
            | {
                type: "portableBlock";
                config: {
                  style: "drum" | "cube" | "sticks";
                };
              }
            | {
                type: "slidingBlock";
                config: {
                  style: "book" | "puck";
                };
              }
            | {
                type: "slidingDeadly";
                config: {
                  style: "spikyBall";
                  startingPhase: 1 | 2;
                };
              }
            | {
                type: "spring";
                config: Record<string, never>;
              }
            | {
                type: "sceneryPlayer";
                config: {
                  which: "head" | "heels" | "headOverHeels";
                  startDirection:
                    | "right"
                    | "towards"
                    | "away"
                    | "left"
                    | "awayRight"
                    | "towardsRight"
                    | "towardsLeft"
                    | "awayLeft";
                };
              }
            | {
                type: "sceneryCrown";
                config: {
                  planet:
                    | "blacktooth"
                    | "bookworld"
                    | "egyptus"
                    | "penitentiary"
                    | "safari";
                };
              }
            | {
                type: "portableTeleporter";
                config:
                  | {
                      times?: {
                        x?: number;
                        y?: number;
                        z?: number;
                      };
                      activatedOnStoreValue?:
                        | "planetsLiberated"
                        | "scrollsRead"
                        | "freeCharacters"
                        | "planetsLiberated.blacktooth"
                        | "planetsLiberated.bookworld"
                        | "planetsLiberated.egyptus"
                        | "planetsLiberated.penitentiary"
                        | "planetsLiberated.safari"
                        | "scrollsRead.blacktooth"
                        | "scrollsRead.egyptus"
                        | "scrollsRead.penitentiary"
                        | "scrollsRead.safari"
                        | "scrollsRead.bag"
                        | "scrollsRead.doughnuts"
                        | "scrollsRead.hooter"
                        | "scrollsRead.head"
                        | "scrollsRead.heels"
                        | "scrollsRead.teleportBack"
                        | "scrollsRead.historyOfTheBlacktoothEmpire"
                        | "scrollsRead.theGame"
                        | "scrollsRead.bookWorld"
                        | "scrollsRead.reincarnationFish"
                        | "scrollsRead.cuddlyStuffedWhiteRabbits"
                        | "scrollsRead.crowns"
                        | "scrollsRead.teleports"
                        | "scrollsRead.springs"
                        | "scrollsRead.switches"
                        | "scrollsRead.conveyorBelts"
                        | "scrollsRead.hushPuppies"
                        | "scrollsRead.theEmperorsGuardian"
                        | "scrollsRead.swopKey"
                        | "scrollsRead.hintsAndTips"
                        | "scrollsRead.credits"
                        | "scrollsRead.installPwa"
                        | "scrollsRead.installNative"
                        | "freeCharacters.head"
                        | "freeCharacters.heels";
                      /**
                       * an item in the destination room this teleporter should go to - the
                       * player will be moved to atop this item
                       *
                       * If not given, will find the (only teleporter) in the destination room
                       *
                       * note: not RoomItemId because that is the ids of items in *this* room, but this
                       * is pointing to another room
                       */
                      toItemId?: string;
                      /**
                       * note that if the other room contains exactly one teleporter, we need not
                       * give the position or the item.
                       */
                      toRoom?: string | "$$final";
                    }
                  | {
                      times?: {
                        x?: number;
                        y?: number;
                        z?: number;
                      };
                      activatedOnStoreValue?:
                        | "planetsLiberated"
                        | "scrollsRead"
                        | "freeCharacters"
                        | "planetsLiberated.blacktooth"
                        | "planetsLiberated.bookworld"
                        | "planetsLiberated.egyptus"
                        | "planetsLiberated.penitentiary"
                        | "planetsLiberated.safari"
                        | "scrollsRead.blacktooth"
                        | "scrollsRead.egyptus"
                        | "scrollsRead.penitentiary"
                        | "scrollsRead.safari"
                        | "scrollsRead.bag"
                        | "scrollsRead.doughnuts"
                        | "scrollsRead.hooter"
                        | "scrollsRead.head"
                        | "scrollsRead.heels"
                        | "scrollsRead.teleportBack"
                        | "scrollsRead.historyOfTheBlacktoothEmpire"
                        | "scrollsRead.theGame"
                        | "scrollsRead.bookWorld"
                        | "scrollsRead.reincarnationFish"
                        | "scrollsRead.cuddlyStuffedWhiteRabbits"
                        | "scrollsRead.crowns"
                        | "scrollsRead.teleports"
                        | "scrollsRead.springs"
                        | "scrollsRead.switches"
                        | "scrollsRead.conveyorBelts"
                        | "scrollsRead.hushPuppies"
                        | "scrollsRead.theEmperorsGuardian"
                        | "scrollsRead.swopKey"
                        | "scrollsRead.hintsAndTips"
                        | "scrollsRead.credits"
                        | "scrollsRead.installPwa"
                        | "scrollsRead.installNative"
                        | "freeCharacters.head"
                        | "freeCharacters.heels";
                      /**
                       * where in the destination room this teleporter should go - usually
                       * to atop another teleporter, but could be anywhere.
                       *
                       * If not given, will find the (only teleporter) in the destination room
                       */
                      toPosition: {
                        x: number;
                        y: number;
                        z: number;
                      };
                      /**
                       * note that if the other room contains exactly one teleporter, we need not
                       * give the position or the item
                       * If undefined, is a same-room teleporter
                       */
                      toRoom?: string | "$$final";
                    };
              }
            | {
                type: "firedDoughnut";
                config: {
                  direction?:
                    | "right"
                    | "towards"
                    | "away"
                    | "left"
                    | "awayRight"
                    | "towardsRight"
                    | "towardsLeft"
                    | "awayLeft";
                };
              };
          /**
           * how long between emissions?
           */
          period: number;
          /**
           * how long to delay until the first emitting?
           * after this time the first emit will happen, then all others will
           * continue at the period interval.
           * undefined is treated the same as 0
           */
          delay?: number;
          /**
           * how many total should this emitter emit? Null for no limit
           */
          maximum: null | number;
          /**
           * How many items emitted from this emitter can be in the room at once?
           * If undefined, no limit. If already this many items in the room, the
           * items will have to be removed from the room before more can be emitted
           * (for example, collecting an emitted pickup)
           */
          maximumAtOnce?: number;
          /**
           * size of the emitter's collision volume in blocks; if undefined, the emitter has no volume
           */
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
          /**
           * if true, only emits while the currently selected player overlaps the emitter's bounds; timing resets on each entry
           */
          whenPlayerInside?: false | true;
          /**
           * offset in blocks applied to the emission position, relative to the emitter's origin
           */
          offset?: {
            x?: number;
            y?: number;
            z?: number;
          };
          /**
           * The sound to play on emit, undefined to use the default sound, or null for no sound
           */
          sound?:
            | null
            | "door"
            | "hooter"
            | "roomEntry.blacktooth"
            | "roomEntry.bookworld"
            | "roomEntry.egyptus"
            | "roomEntry.market"
            | "roomEntry.moonbase"
            | "roomEntry.penitentiary"
            | "roomEntry.safari"
            | "activate"
            | "ballHit"
            | "bonus"
            | "bubbleRobotLoop"
            | "buttonOff"
            | "buttonOn"
            | "carry"
            | "conveyorEnd"
            | "conveyorLoop"
            | "conveyorStart"
            | "crownSparkle"
            | "deactivate"
            | "destroy"
            | "detect"
            | "doughnutSplat"
            | "drum"
            | "elephantHoot"
            | "emit"
            | "fall"
            | "fanfare"
            | "glassClink"
            | "headAccent"
            | "headFall"
            | "headJump"
            | "headOverHeelsAccent"
            | "headWalk"
            | "heavyMetalScraping"
            | "heelsAccent"
            | "heelsJump"
            | "heelsWalk"
            | "helicopter"
            | "hushPuppyVanish"
            | "iceScrape"
            | "jetpackLoop"
            | "jetpackTurnaround"
            | "landing"
            | "lowerSmallMotorLoop"
            | "lowHum"
            | "menuSofter"
            | "metalHit"
            | "mojoLoop"
            | "mojoTurn"
            | "monkeyTurn"
            | "moonbaseDoor"
            | "robotBeepingLoop"
            | "robotWhirLoop"
            | "rollingBallLoop"
            | "scrollOpen"
            | "servoLoop"
            | "servoStart"
            | "servoStop"
            | "setting0"
            | "setting1"
            | "setting2"
            | "setting3"
            | "softBump"
            | "springBoing"
            | "switchClick"
            | "teleportIn"
            | "teleportOut"
            | "teleportWarningSiren"
            | "toasterPopUp"
            | "toasterPushDown"
            | "uhOh"
            | "woodScrape";
        };
      }
    | {
        type: "firedDoughnut";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          direction?:
            | "right"
            | "towards"
            | "away"
            | "left"
            | "awayRight"
            | "towardsRight"
            | "towardsLeft"
            | "awayLeft";
        };
      }
    | {
        type: "floatingText";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          /**
           * the lines of text to display, each rendered as a separate row
           */
          textLines: string[];
          /**
           * the room time when this floating text starts; used to calculate the rise animation age.
           * if not given, will start right away at time zero.
           * if given, will delay starting until this time
           */
          appearanceRoomTime?: number;
          /**
           * if true, lines oscillate horizontally as they rise
           */
          sway?: false | true;
        };
      }
    | {
        type: "floor";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              /**
               * the room has no floor, but it is included to draw the floor edge
               */
              floorType: "none";
              times: {
                x: number;
                y: number;
              };
            }
          | {
              floorType: "deadly";
              times: {
                x: number;
                y: number;
              };
            }
          | {
              floorType: "standable";
              scenery:
                | "jail"
                | "blacktooth"
                | "bookworld"
                | "egyptus"
                | "market"
                | "moonbase"
                | "penitentiary"
                | "safari";
              times: {
                x: number;
                y: number;
              };
            };
      }
    | {
        type: "hushPuppy";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
        };
      }
    | {
        type: "joystick";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          /**
           * item ids of all the items (probably Charles) that this joystick controls.
           * if omitted, the joystick controls every charles in its room — which is
           * how the original game always behaved.
           */
          controls?: string[];
        };
      }
    | {
        type: "lift";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          top: number;
          bottom: number;
        };
      }
    | {
        type: "monster";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              which: "bubbleRobot";
              movement: "patrol-randomly-xy8";
              activated: "off" | "on";
            }
          | {
              which: "computerBot";
              movement:
                | "patrol-randomly-xy4-and-reverse"
                | "towards-on-shortest-axis-xy4";
              activated: "off" | "on";
            }
          | {
              which: "dalek";
              movement: "patrol-randomly-diagonal";
              activated: "off" | "on";
            }
          | {
              which: "elephant";
              movement: "patrol-randomly-xy4";
              activated: "off" | "on";
            }
          | {
              which: "elephantHead";
              movement: "turn-to-player";
              startDirection: "right" | "towards" | "away" | "left";
              activated: "off" | "on";
            }
          | {
              which: "emperor";
              movement: "towards-analogue";
              activated: "off" | "on";
            }
          | {
              which: "emperorsGuardian";
              movement: "towards-analogue-unless-planet-crowns";
              activated: "off" | "on";
            }
          | {
              which: "helicopterBug";
              movement: "towards-analogue";
              activated: "off" | "on";
            }
          | {
              which: "helicopterBug";
              movement: "patrol-randomly-xy8";
              activated: "off" | "on";
            }
          | {
              which: "homingBot";
              movement: "towards-tripped-on-axis-xy4";
              activated: "off" | "on";
            }
          | {
              which: "monkey";
              movement: "towards-on-shortest-axis-xy4" | "patrol-randomly-xy4";
              activated: "off" | "on";
            }
          | {
              which: "skiHead";
              activated: "off" | "on";
              movement: "back-forth" | "clockwise" | "forwards";
              startDirection: "right" | "towards" | "away" | "left";
              style: "greenAndPink" | "starsAndStripes";
            }
          | {
              which: "turtle";
              movement:
                | "back-forth"
                | "clockwise"
                | "forwards"
                | "anticlockwise";
              startDirection: "right" | "towards" | "away" | "left";
              activated: "off" | "on";
            }
          | {
              which: "cyberman";
              activated: "off" | "on" | "after-player-near";
              movement: "towards-on-shortest-axis-xy4";
              startDirection: "right" | "towards" | "away" | "left";
            };
      }
    | {
        type: "moveableDeadly";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          style: "deadFish";
        };
      }
    | {
        type: "movingPlatform";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          movement: "back-forth" | "clockwise" | "towards-analogue";
          activated: "off" | "on" | "on-stand";
          startDirection: "right" | "towards" | "away" | "left";
        };
      }
    | {
        type: "pickup";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              gives: "crown";
              planet:
                | "blacktooth"
                | "bookworld"
                | "egyptus"
                | "penitentiary"
                | "safari";
            }
          | {
              gives:
                | "shield"
                | "bag"
                | "doughnuts"
                | "extra-life"
                | "fast"
                | "hooter"
                | "jumps"
                | "reincarnation";
            }
          | {
              gives: "scroll";
              source: "inline";
              markdown: string | string[];
            }
          | {
              gives: "scroll";
              source: "manual";
              page:
                | "blacktooth"
                | "egyptus"
                | "penitentiary"
                | "safari"
                | "bag"
                | "doughnuts"
                | "hooter"
                | "head"
                | "heels"
                | "teleportBack"
                | "historyOfTheBlacktoothEmpire"
                | "theGame"
                | "bookWorld"
                | "reincarnationFish"
                | "cuddlyStuffedWhiteRabbits"
                | "crowns"
                | "teleports"
                | "springs"
                | "switches"
                | "conveyorBelts"
                | "hushPuppies"
                | "theEmperorsGuardian"
                | "swopKey"
                | "hintsAndTips"
                | "credits"
                | "installPwa"
                | "installNative";
            };
      }
    | {
        type: "player";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          which: "head" | "heels" | "headOverHeels";
        };
      }
    | {
        type: "portableBlock";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          style: "drum" | "cube" | "sticks";
        };
      }
    | {
        type: "portableTeleporter";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              times?: {
                x?: number;
                y?: number;
                z?: number;
              };
              activatedOnStoreValue?:
                | "planetsLiberated"
                | "scrollsRead"
                | "freeCharacters"
                | "planetsLiberated.blacktooth"
                | "planetsLiberated.bookworld"
                | "planetsLiberated.egyptus"
                | "planetsLiberated.penitentiary"
                | "planetsLiberated.safari"
                | "scrollsRead.blacktooth"
                | "scrollsRead.egyptus"
                | "scrollsRead.penitentiary"
                | "scrollsRead.safari"
                | "scrollsRead.bag"
                | "scrollsRead.doughnuts"
                | "scrollsRead.hooter"
                | "scrollsRead.head"
                | "scrollsRead.heels"
                | "scrollsRead.teleportBack"
                | "scrollsRead.historyOfTheBlacktoothEmpire"
                | "scrollsRead.theGame"
                | "scrollsRead.bookWorld"
                | "scrollsRead.reincarnationFish"
                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                | "scrollsRead.crowns"
                | "scrollsRead.teleports"
                | "scrollsRead.springs"
                | "scrollsRead.switches"
                | "scrollsRead.conveyorBelts"
                | "scrollsRead.hushPuppies"
                | "scrollsRead.theEmperorsGuardian"
                | "scrollsRead.swopKey"
                | "scrollsRead.hintsAndTips"
                | "scrollsRead.credits"
                | "scrollsRead.installPwa"
                | "scrollsRead.installNative"
                | "freeCharacters.head"
                | "freeCharacters.heels";
              /**
               * an item in the destination room this teleporter should go to - the
               * player will be moved to atop this item
               *
               * If not given, will find the (only teleporter) in the destination room
               *
               * note: not RoomItemId because that is the ids of items in *this* room, but this
               * is pointing to another room
               */
              toItemId?: string;
              /**
               * note that if the other room contains exactly one teleporter, we need not
               * give the position or the item.
               */
              toRoom?: string | "$$final";
            }
          | {
              times?: {
                x?: number;
                y?: number;
                z?: number;
              };
              activatedOnStoreValue?:
                | "planetsLiberated"
                | "scrollsRead"
                | "freeCharacters"
                | "planetsLiberated.blacktooth"
                | "planetsLiberated.bookworld"
                | "planetsLiberated.egyptus"
                | "planetsLiberated.penitentiary"
                | "planetsLiberated.safari"
                | "scrollsRead.blacktooth"
                | "scrollsRead.egyptus"
                | "scrollsRead.penitentiary"
                | "scrollsRead.safari"
                | "scrollsRead.bag"
                | "scrollsRead.doughnuts"
                | "scrollsRead.hooter"
                | "scrollsRead.head"
                | "scrollsRead.heels"
                | "scrollsRead.teleportBack"
                | "scrollsRead.historyOfTheBlacktoothEmpire"
                | "scrollsRead.theGame"
                | "scrollsRead.bookWorld"
                | "scrollsRead.reincarnationFish"
                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                | "scrollsRead.crowns"
                | "scrollsRead.teleports"
                | "scrollsRead.springs"
                | "scrollsRead.switches"
                | "scrollsRead.conveyorBelts"
                | "scrollsRead.hushPuppies"
                | "scrollsRead.theEmperorsGuardian"
                | "scrollsRead.swopKey"
                | "scrollsRead.hintsAndTips"
                | "scrollsRead.credits"
                | "scrollsRead.installPwa"
                | "scrollsRead.installNative"
                | "freeCharacters.head"
                | "freeCharacters.heels";
              /**
               * where in the destination room this teleporter should go - usually
               * to atop another teleporter, but could be anywhere.
               *
               * If not given, will find the (only teleporter) in the destination room
               */
              toPosition: {
                x: number;
                y: number;
                z: number;
              };
              /**
               * note that if the other room contains exactly one teleporter, we need not
               * give the position or the item
               * If undefined, is a same-room teleporter
               */
              toRoom?: string | "$$final";
            };
      }
    | {
        type: "pushableBlock";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: Record<string, never>;
      }
    | {
        type: "sceneryCrown";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          planet:
            | "blacktooth"
            | "bookworld"
            | "egyptus"
            | "penitentiary"
            | "safari";
        };
      }
    | {
        type: "sceneryPlayer";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          which: "head" | "heels" | "headOverHeels";
          startDirection:
            | "right"
            | "towards"
            | "away"
            | "left"
            | "awayRight"
            | "towardsRight"
            | "towardsLeft"
            | "awayLeft";
        };
      }
    | {
        type: "slidingBlock";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          style: "book" | "puck";
        };
      }
    | {
        type: "slidingDeadly";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          style: "spikyBall";
          startingPhase: 1 | 2;
        };
      }
    | {
        type: "spikes";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
        };
      }
    | {
        type: "spring";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: Record<string, never>;
      }
    | {
        type: "switch";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              initialSetting: "right" | "left";
              /**
               * this switch targets the redux store
               */
              type: "in-store";
              path:
                | "displaySettings"
                | "showFps"
                | "pokesEnabled"
                | "onScreenControls"
                | "soundSettings"
                | "displaySettings.crtFilter"
                | "displaySettings.showRoomScrollBounds"
                | "displaySettings.showShadowMasks"
                | "pokesEnabled.infiniteLives"
                | "pokesEnabled.infiniteDoughnuts"
                | "soundSettings.mute"
                | "soundSettings.noRoomEntryTunes"
                | "soundSettings.noFootsteps";
            }
          | {
              initialSetting: "right" | "left";
              /**
               * this switch targets items in the room. This is the default, so
               * also used if undefined
               */
              type?: "in-room";
              modifies: (
                | {
                    expectType: "monster" | "movingPlatform";
                    targets?: string[];
                    /**
                     * true is a shorthand for monsters/platforms that are activated by default:
                     *   {leftState: {activated: true, everActivated:true}, rightState: {activated:false}},
                     * false is shorthand for monsters/platforms that are deactivated by default:
                     *   {leftState: {activated: false}, rightState: {activated: true, everActivated:true}},
                     */
                    activates?: false | true;
                    /**
                     * shortcut - gives this direction for left state and opposite direction for right state
                     */
                    switchedDirection?: "right" | "towards" | "away" | "left";
                    leftState?: {
                      /**
                       * if given, the item disappears after the specified interaction.
                       * This must be null (not undefined) so switches can tell the difference
                       * between having no setting, and having a setting to change to null
                       * when they make something not disappearing
                       */
                      disappearing?: null | {
                        on: "touch" | "stand";
                        /**
                         * if given, the item will disappear only if stood/touched by items of this type.
                         * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
                         * or ['head'] eg for doughnuts that only head can collect
                         */
                        byType?: (
                          | "wall"
                          | "ball"
                          | "barrier"
                          | "block"
                          | "bubbles"
                          | "button"
                          | "charles"
                          | "conveyor"
                          | "deadlyBlock"
                          | "emitter"
                          | "firedDoughnut"
                          | "floatingText"
                          | "floor"
                          | "hushPuppy"
                          | "joystick"
                          | "lift"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spikes"
                          | "spring"
                          | "switch"
                          | "teleporter"
                          | "timer"
                          | "head"
                          | "heels"
                          | "headOverHeels"
                          | "stopAutowalk"
                          | "soundEffect"
                          | "doorFrame"
                          | "doorLegs"
                          | "portal"
                          | "blocker"
                          | "particle"
                          | "outOfBounds"
                        )[];
                      };
                      /**
                       * activated for us is a boolean, not the many-states from the json config, ie it is stateful
                       * on if the item is currently activated (so they can render differently)
                       */
                      activated?: false | true;
                      /**
                       * if this item has ever been activated, in the lifetime of the room. Charging cybermen will
                       * have this flag as false so long as they are charging
                       */
                      everActivated?: false | true;
                      /**
                       * The item will be removed from the room after the room it is in has more than this roomTime.
                       * To guarantee removal on the next frame (effectively immediately)
                       * set to -1. Otherwise, can set to the current roomTime + duration of an animation
                       * that needs to play
                       *
                       * If null, the item is not scheduled for removal (the normal case)
                       */
                      expires?: null | number;
                      facing?: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                    rightState?: {
                      /**
                       * if given, the item disappears after the specified interaction.
                       * This must be null (not undefined) so switches can tell the difference
                       * between having no setting, and having a setting to change to null
                       * when they make something not disappearing
                       */
                      disappearing?: null | {
                        on: "touch" | "stand";
                        /**
                         * if given, the item will disappear only if stood/touched by items of this type.
                         * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
                         * or ['head'] eg for doughnuts that only head can collect
                         */
                        byType?: (
                          | "wall"
                          | "ball"
                          | "barrier"
                          | "block"
                          | "bubbles"
                          | "button"
                          | "charles"
                          | "conveyor"
                          | "deadlyBlock"
                          | "emitter"
                          | "firedDoughnut"
                          | "floatingText"
                          | "floor"
                          | "hushPuppy"
                          | "joystick"
                          | "lift"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spikes"
                          | "spring"
                          | "switch"
                          | "teleporter"
                          | "timer"
                          | "head"
                          | "heels"
                          | "headOverHeels"
                          | "stopAutowalk"
                          | "soundEffect"
                          | "doorFrame"
                          | "doorLegs"
                          | "portal"
                          | "blocker"
                          | "particle"
                          | "outOfBounds"
                        )[];
                      };
                      /**
                       * activated for us is a boolean, not the many-states from the json config, ie it is stateful
                       * on if the item is currently activated (so they can render differently)
                       */
                      activated?: false | true;
                      /**
                       * if this item has ever been activated, in the lifetime of the room. Charging cybermen will
                       * have this flag as false so long as they are charging
                       */
                      everActivated?: false | true;
                      /**
                       * The item will be removed from the room after the room it is in has more than this roomTime.
                       * To guarantee removal on the next frame (effectively immediately)
                       * set to -1. Otherwise, can set to the current roomTime + duration of an animation
                       * that needs to play
                       *
                       * If null, the item is not scheduled for removal (the normal case)
                       */
                      expires?: null | number;
                      facing?: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                  }
                | {
                    expectType: "switch";
                    targets?: string[];
                    /**
                     * this switch will flip the other switch when it is flipped
                     */
                    flip: true;
                  }
                | {
                    expectType: "block";
                    targets?: string[];
                    /**
                     * if true, equivalent to leftState disappearing on stand, right state not disappearing
                     * if false, equivalent to leftState not disappearing, right state disappearing on stand
                     */
                    makesStable: boolean;
                  }
                | {
                    expectType: "block";
                    targets?: string[];
                    leftState: {
                      disappearing?: {
                        on: "stand";
                      };
                    };
                    rightState: {
                      disappearing?: null;
                    };
                  }
                | {
                    expectType: "charles";
                    targets?: string[];
                    /**
                     * true is a shorthand for charles bots that are activated by default:
                     *   {leftState: {activated: true}, rightState: {activated: false}},
                     * false is shorthand for charles bots that are deactivated by default:
                     *   {leftState: {activated: false}, rightState: {activated: true}},
                     */
                    activates?: false | true;
                    leftState?: {
                      activated?: false | true;
                    };
                    rightState?: {
                      activated?: false | true;
                    };
                  }
                | {
                    expectType: "conveyor";
                    targets?: string[];
                    /**
                     * true is a shorthand for conveyors that the switch enables
                     *   {leftState: {disabled: false}, rightState: {disabled: true}},
                     * false is a shorthand for conveyors that the switch disables
                     *   {leftState: {disabled: true}, rightState: {disabled: false}},
                     */
                    activates?: false | true;
                    /**
                     * true means the left setting reverses the conveyor (opposite of config direction),
                     * false means the right setting reverses it.
                     * "reverse" = set direction to the opposite of the item's config.direction.
                     */
                    reverses?: false | true;
                    leftState?: {
                      disabled?: false | true;
                      direction?: "right" | "towards" | "away" | "left";
                      disappearing?: null | {
                        on: "stand";
                      };
                    };
                    rightState?: {
                      disabled?: false | true;
                      direction?: "right" | "towards" | "away" | "left";
                      disappearing?: null | {
                        on: "stand";
                      };
                    };
                  }
                | {
                    expectType: "deadlyBlock";
                    targets?: string[];
                    /**
                     * true is a shorthand for deadly blocks that start disabled:
                     *   {leftState: {disabled: true}, rightState: {disabled: false}},
                     * false is a shorthand for deadly blocks that start enabled:
                     *   {leftState: {disabled: false}, rightState: {disabled: true}},
                     */
                    disables?: false | true;
                    leftState?: {
                      disabled?: false | true;
                    };
                    rightState?: {
                      disabled?: false | true;
                    };
                  }
                | {
                    expectType: "emitter";
                    targets?: string[];
                    leftState: {
                      lastEmittedAtRoomTime?: number;
                      quantityEmitted?: number;
                      playerInsideAtRoomTime?: number;
                      /**
                       * what does this emitter emit? Could be (potentially) any free item
                       */
                      emits?: {
                        type:
                          | "ball"
                          | "charles"
                          | "firedDoughnut"
                          | "floatingText"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring";
                        config:
                          | {
                              gives: "crown";
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              gives:
                                | "shield"
                                | "bag"
                                | "doughnuts"
                                | "extra-life"
                                | "fast"
                                | "hooter"
                                | "jumps"
                                | "reincarnation";
                            }
                          | {
                              gives: "scroll";
                              source: "inline";
                              markdown: string | string[];
                            }
                          | {
                              gives: "scroll";
                              source: "manual";
                              page:
                                | "blacktooth"
                                | "egyptus"
                                | "penitentiary"
                                | "safari"
                                | "bag"
                                | "doughnuts"
                                | "hooter"
                                | "head"
                                | "heels"
                                | "teleportBack"
                                | "historyOfTheBlacktoothEmpire"
                                | "theGame"
                                | "bookWorld"
                                | "reincarnationFish"
                                | "cuddlyStuffedWhiteRabbits"
                                | "crowns"
                                | "teleports"
                                | "springs"
                                | "switches"
                                | "conveyorBelts"
                                | "hushPuppies"
                                | "theEmperorsGuardian"
                                | "swopKey"
                                | "hintsAndTips"
                                | "credits"
                                | "installPwa"
                                | "installNative";
                            }
                          | Record<string, any>
                          | {
                              activated?: false | true;
                            }
                          | {
                              direction?:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              /**
                               * the lines of text to display, each rendered as a separate row
                               */
                              textLines: string[];
                              /**
                               * the room time when this floating text starts; used to calculate the rise animation age.
                               * if not given, will start right away at time zero.
                               * if given, will delay starting until this time
                               */
                              appearanceRoomTime?: number;
                              /**
                               * if true, lines oscillate horizontally as they rise
                               */
                              sway?: false | true;
                            }
                          | {
                              which: "bubbleRobot";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "computerBot";
                              movement:
                                | "patrol-randomly-xy4-and-reverse"
                                | "towards-on-shortest-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "dalek";
                              movement: "patrol-randomly-diagonal";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephant";
                              movement: "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephantHead";
                              movement: "turn-to-player";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperor";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperorsGuardian";
                              movement: "towards-analogue-unless-planet-crowns";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "homingBot";
                              movement: "towards-tripped-on-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "monkey";
                              movement:
                                | "towards-on-shortest-axis-xy4"
                                | "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "skiHead";
                              activated: "off" | "on";
                              movement: "back-forth" | "clockwise" | "forwards";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              style: "greenAndPink" | "starsAndStripes";
                            }
                          | {
                              which: "turtle";
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "forwards"
                                | "anticlockwise";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "cyberman";
                              activated: "off" | "on" | "after-player-near";
                              movement: "towards-on-shortest-axis-xy4";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "deadFish";
                            }
                          | {
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "towards-analogue";
                              activated: "off" | "on" | "on-stand";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "drum" | "cube" | "sticks";
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * an item in the destination room this teleporter should go to - the
                               * player will be moved to atop this item
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               *
                               * note: not RoomItemId because that is the ids of items in *this* room, but this
                               * is pointing to another room
                               */
                              toItemId?: string;
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item.
                               */
                              toRoom?: string;
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * where in the destination room this teleporter should go - usually
                               * to atop another teleporter, but could be anywhere.
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               */
                              toPosition: {
                                x: number;
                                y: number;
                                z: number;
                              };
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item
                               * If undefined, is a same-room teleporter
                               */
                              toRoom?: string;
                            }
                          | {
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              which: "head" | "heels" | "headOverHeels";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              style: "book" | "puck";
                            }
                          | {
                              style: "spikyBall";
                              startingPhase: 1 | 2;
                            };
                      };
                      /**
                       * how long between emissions?
                       */
                      period?: number;
                      /**
                       * how long to delay until the first emitting?
                       * after this time the first emit will happen, then all others will
                       * continue at the period interval.
                       * undefined is treated the same as 0
                       */
                      delay?: number;
                      /**
                       * how many total should this emitter emit? Null for no limit
                       */
                      maximum?: null | number;
                      /**
                       * How many items emitted from this emitter can be in the room at once?
                       * If undefined, no limit. If already this many items in the room, the
                       * items will have to be removed from the room before more can be emitted
                       * (for example, collecting an emitted pickup)
                       */
                      maximumAtOnce?: number;
                    };
                    rightState: {
                      lastEmittedAtRoomTime?: number;
                      quantityEmitted?: number;
                      playerInsideAtRoomTime?: number;
                      /**
                       * what does this emitter emit? Could be (potentially) any free item
                       */
                      emits?: {
                        type:
                          | "ball"
                          | "charles"
                          | "firedDoughnut"
                          | "floatingText"
                          | "monster"
                          | "moveableDeadly"
                          | "movingPlatform"
                          | "pickup"
                          | "portableBlock"
                          | "portableTeleporter"
                          | "pushableBlock"
                          | "sceneryCrown"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring";
                        config:
                          | {
                              gives: "crown";
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              gives:
                                | "shield"
                                | "bag"
                                | "doughnuts"
                                | "extra-life"
                                | "fast"
                                | "hooter"
                                | "jumps"
                                | "reincarnation";
                            }
                          | {
                              gives: "scroll";
                              source: "inline";
                              markdown: string | string[];
                            }
                          | {
                              gives: "scroll";
                              source: "manual";
                              page:
                                | "blacktooth"
                                | "egyptus"
                                | "penitentiary"
                                | "safari"
                                | "bag"
                                | "doughnuts"
                                | "hooter"
                                | "head"
                                | "heels"
                                | "teleportBack"
                                | "historyOfTheBlacktoothEmpire"
                                | "theGame"
                                | "bookWorld"
                                | "reincarnationFish"
                                | "cuddlyStuffedWhiteRabbits"
                                | "crowns"
                                | "teleports"
                                | "springs"
                                | "switches"
                                | "conveyorBelts"
                                | "hushPuppies"
                                | "theEmperorsGuardian"
                                | "swopKey"
                                | "hintsAndTips"
                                | "credits"
                                | "installPwa"
                                | "installNative";
                            }
                          | Record<string, any>
                          | {
                              activated?: false | true;
                            }
                          | {
                              direction?:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              /**
                               * the lines of text to display, each rendered as a separate row
                               */
                              textLines: string[];
                              /**
                               * the room time when this floating text starts; used to calculate the rise animation age.
                               * if not given, will start right away at time zero.
                               * if given, will delay starting until this time
                               */
                              appearanceRoomTime?: number;
                              /**
                               * if true, lines oscillate horizontally as they rise
                               */
                              sway?: false | true;
                            }
                          | {
                              which: "bubbleRobot";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "computerBot";
                              movement:
                                | "patrol-randomly-xy4-and-reverse"
                                | "towards-on-shortest-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "dalek";
                              movement: "patrol-randomly-diagonal";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephant";
                              movement: "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "elephantHead";
                              movement: "turn-to-player";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperor";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "emperorsGuardian";
                              movement: "towards-analogue-unless-planet-crowns";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "towards-analogue";
                              activated: "off" | "on";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "patrol-randomly-xy8";
                              activated: "off" | "on";
                            }
                          | {
                              which: "homingBot";
                              movement: "towards-tripped-on-axis-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "monkey";
                              movement:
                                | "towards-on-shortest-axis-xy4"
                                | "patrol-randomly-xy4";
                              activated: "off" | "on";
                            }
                          | {
                              which: "skiHead";
                              activated: "off" | "on";
                              movement: "back-forth" | "clockwise" | "forwards";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              style: "greenAndPink" | "starsAndStripes";
                            }
                          | {
                              which: "turtle";
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "forwards"
                                | "anticlockwise";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                              activated: "off" | "on";
                            }
                          | {
                              which: "cyberman";
                              activated: "off" | "on" | "after-player-near";
                              movement: "towards-on-shortest-axis-xy4";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "deadFish";
                            }
                          | {
                              movement:
                                | "back-forth"
                                | "clockwise"
                                | "towards-analogue";
                              activated: "off" | "on" | "on-stand";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "drum" | "cube" | "sticks";
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * an item in the destination room this teleporter should go to - the
                               * player will be moved to atop this item
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               *
                               * note: not RoomItemId because that is the ids of items in *this* room, but this
                               * is pointing to another room
                               */
                              toItemId?: string;
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item.
                               */
                              toRoom?: string;
                            }
                          | {
                              times?: {
                                x?: number;
                                y?: number;
                                z?: number;
                              };
                              activatedOnStoreValue?:
                                | "planetsLiberated"
                                | "scrollsRead"
                                | "freeCharacters"
                                | "planetsLiberated.blacktooth"
                                | "planetsLiberated.bookworld"
                                | "planetsLiberated.egyptus"
                                | "planetsLiberated.penitentiary"
                                | "planetsLiberated.safari"
                                | "scrollsRead.blacktooth"
                                | "scrollsRead.egyptus"
                                | "scrollsRead.penitentiary"
                                | "scrollsRead.safari"
                                | "scrollsRead.bag"
                                | "scrollsRead.doughnuts"
                                | "scrollsRead.hooter"
                                | "scrollsRead.head"
                                | "scrollsRead.heels"
                                | "scrollsRead.teleportBack"
                                | "scrollsRead.historyOfTheBlacktoothEmpire"
                                | "scrollsRead.theGame"
                                | "scrollsRead.bookWorld"
                                | "scrollsRead.reincarnationFish"
                                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                                | "scrollsRead.crowns"
                                | "scrollsRead.teleports"
                                | "scrollsRead.springs"
                                | "scrollsRead.switches"
                                | "scrollsRead.conveyorBelts"
                                | "scrollsRead.hushPuppies"
                                | "scrollsRead.theEmperorsGuardian"
                                | "scrollsRead.swopKey"
                                | "scrollsRead.hintsAndTips"
                                | "scrollsRead.credits"
                                | "scrollsRead.installPwa"
                                | "scrollsRead.installNative"
                                | "freeCharacters.head"
                                | "freeCharacters.heels";
                              /**
                               * where in the destination room this teleporter should go - usually
                               * to atop another teleporter, but could be anywhere.
                               *
                               * If not given, will find the (only teleporter) in the destination room
                               */
                              toPosition: {
                                x: number;
                                y: number;
                                z: number;
                              };
                              /**
                               * note that if the other room contains exactly one teleporter, we need not
                               * give the position or the item
                               * If undefined, is a same-room teleporter
                               */
                              toRoom?: string;
                            }
                          | {
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            }
                          | {
                              which: "head" | "heels" | "headOverHeels";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left"
                                | "awayRight"
                                | "towardsRight"
                                | "towardsLeft"
                                | "awayLeft";
                            }
                          | {
                              style: "book" | "puck";
                            }
                          | {
                              style: "spikyBall";
                              startingPhase: 1 | 2;
                            };
                      };
                      /**
                       * how long between emissions?
                       */
                      period?: number;
                      /**
                       * how long to delay until the first emitting?
                       * after this time the first emit will happen, then all others will
                       * continue at the period interval.
                       * undefined is treated the same as 0
                       */
                      delay?: number;
                      /**
                       * how many total should this emitter emit? Null for no limit
                       */
                      maximum?: null | number;
                      /**
                       * How many items emitted from this emitter can be in the room at once?
                       * If undefined, no limit. If already this many items in the room, the
                       * items will have to be removed from the room before more can be emitted
                       * (for example, collecting an emitted pickup)
                       */
                      maximumAtOnce?: number;
                    };
                  }
                | {
                    expectType: "joystick";
                    targets?: string[];
                    leftState: {
                      /**
                       * item ids of all the items (probably Charles) that this joystick controls.
                       * if omitted, the joystick controls every charles in its room — which is
                       * how the original game always behaved.
                       */
                      controls?: string[];
                    };
                    rightState: {
                      /**
                       * item ids of all the items (probably Charles) that this joystick controls.
                       * if omitted, the joystick controls every charles in its room — which is
                       * how the original game always behaved.
                       */
                      controls?: string[];
                    };
                  }
                | {
                    expectType: "lift";
                    targets?: string[];
                    leftState: {
                      direction?: "down" | "up";
                      vels?: {
                        lift: {
                          x: number;
                          y: number;
                          z: number;
                        };
                      };
                      top?: number;
                      bottom?: number;
                    };
                    rightState: {
                      direction?: "down" | "up";
                      vels?: {
                        lift: {
                          x: number;
                          y: number;
                          z: number;
                        };
                      };
                      top?: number;
                      bottom?: number;
                    };
                  }
                | {
                    expectType: "teleporter";
                    targets?: string[];
                    leftState: {
                      toRoom: string;
                      toPosition: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                    rightState: {
                      toRoom: string;
                      toPosition: {
                        x: number;
                        y: number;
                        z: number;
                      };
                    };
                  }
                | {
                    expectType: "timer";
                    targets?: string[];
                    activates?: false | true;
                    leftState?: {
                      activated?: false | true;
                    };
                    rightState?: {
                      activated?: false | true;
                    };
                  }
              )[];
            };
      }
    | {
        type: "teleporter";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              times?: {
                x?: number;
                y?: number;
                z?: number;
              };
              activatedOnStoreValue?:
                | "planetsLiberated"
                | "scrollsRead"
                | "freeCharacters"
                | "planetsLiberated.blacktooth"
                | "planetsLiberated.bookworld"
                | "planetsLiberated.egyptus"
                | "planetsLiberated.penitentiary"
                | "planetsLiberated.safari"
                | "scrollsRead.blacktooth"
                | "scrollsRead.egyptus"
                | "scrollsRead.penitentiary"
                | "scrollsRead.safari"
                | "scrollsRead.bag"
                | "scrollsRead.doughnuts"
                | "scrollsRead.hooter"
                | "scrollsRead.head"
                | "scrollsRead.heels"
                | "scrollsRead.teleportBack"
                | "scrollsRead.historyOfTheBlacktoothEmpire"
                | "scrollsRead.theGame"
                | "scrollsRead.bookWorld"
                | "scrollsRead.reincarnationFish"
                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                | "scrollsRead.crowns"
                | "scrollsRead.teleports"
                | "scrollsRead.springs"
                | "scrollsRead.switches"
                | "scrollsRead.conveyorBelts"
                | "scrollsRead.hushPuppies"
                | "scrollsRead.theEmperorsGuardian"
                | "scrollsRead.swopKey"
                | "scrollsRead.hintsAndTips"
                | "scrollsRead.credits"
                | "scrollsRead.installPwa"
                | "scrollsRead.installNative"
                | "freeCharacters.head"
                | "freeCharacters.heels";
              /**
               * an item in the destination room this teleporter should go to - the
               * player will be moved to atop this item
               *
               * If not given, will find the (only teleporter) in the destination room
               *
               * note: not RoomItemId because that is the ids of items in *this* room, but this
               * is pointing to another room
               */
              toItemId?: string;
              /**
               * note that if the other room contains exactly one teleporter, we need not
               * give the position or the item.
               */
              toRoom?: string | "$$final";
            }
          | {
              times?: {
                x?: number;
                y?: number;
                z?: number;
              };
              activatedOnStoreValue?:
                | "planetsLiberated"
                | "scrollsRead"
                | "freeCharacters"
                | "planetsLiberated.blacktooth"
                | "planetsLiberated.bookworld"
                | "planetsLiberated.egyptus"
                | "planetsLiberated.penitentiary"
                | "planetsLiberated.safari"
                | "scrollsRead.blacktooth"
                | "scrollsRead.egyptus"
                | "scrollsRead.penitentiary"
                | "scrollsRead.safari"
                | "scrollsRead.bag"
                | "scrollsRead.doughnuts"
                | "scrollsRead.hooter"
                | "scrollsRead.head"
                | "scrollsRead.heels"
                | "scrollsRead.teleportBack"
                | "scrollsRead.historyOfTheBlacktoothEmpire"
                | "scrollsRead.theGame"
                | "scrollsRead.bookWorld"
                | "scrollsRead.reincarnationFish"
                | "scrollsRead.cuddlyStuffedWhiteRabbits"
                | "scrollsRead.crowns"
                | "scrollsRead.teleports"
                | "scrollsRead.springs"
                | "scrollsRead.switches"
                | "scrollsRead.conveyorBelts"
                | "scrollsRead.hushPuppies"
                | "scrollsRead.theEmperorsGuardian"
                | "scrollsRead.swopKey"
                | "scrollsRead.hintsAndTips"
                | "scrollsRead.credits"
                | "scrollsRead.installPwa"
                | "scrollsRead.installNative"
                | "freeCharacters.head"
                | "freeCharacters.heels";
              /**
               * where in the destination room this teleporter should go - usually
               * to atop another teleporter, but could be anywhere.
               *
               * If not given, will find the (only teleporter) in the destination room
               */
              toPosition: {
                x: number;
                y: number;
                z: number;
              };
              /**
               * note that if the other room contains exactly one teleporter, we need not
               * give the position or the item
               * If undefined, is a same-room teleporter
               */
              toRoom?: string | "$$final";
            };
      }
    | {
        type: "timer";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          period: number;
          delay?: number;
          initialSetting: "right" | "left";
          modifies: (
            | {
                expectType: "monster" | "movingPlatform";
                targets?: string[];
                /**
                 * true is a shorthand for monsters/platforms that are activated by default:
                 *   {leftState: {activated: true, everActivated:true}, rightState: {activated:false}},
                 * false is shorthand for monsters/platforms that are deactivated by default:
                 *   {leftState: {activated: false}, rightState: {activated: true, everActivated:true}},
                 */
                activates?: false | true;
                /**
                 * shortcut - gives this direction for left state and opposite direction for right state
                 */
                switchedDirection?: "right" | "towards" | "away" | "left";
                leftState?: {
                  /**
                   * if given, the item disappears after the specified interaction.
                   * This must be null (not undefined) so switches can tell the difference
                   * between having no setting, and having a setting to change to null
                   * when they make something not disappearing
                   */
                  disappearing?: null | {
                    on: "touch" | "stand";
                    /**
                     * if given, the item will disappear only if stood/touched by items of this type.
                     * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
                     * or ['head'] eg for doughnuts that only head can collect
                     */
                    byType?: (
                      | "wall"
                      | "ball"
                      | "barrier"
                      | "block"
                      | "bubbles"
                      | "button"
                      | "charles"
                      | "conveyor"
                      | "deadlyBlock"
                      | "emitter"
                      | "firedDoughnut"
                      | "floatingText"
                      | "floor"
                      | "hushPuppy"
                      | "joystick"
                      | "lift"
                      | "monster"
                      | "moveableDeadly"
                      | "movingPlatform"
                      | "pickup"
                      | "portableBlock"
                      | "portableTeleporter"
                      | "pushableBlock"
                      | "sceneryCrown"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spikes"
                      | "spring"
                      | "switch"
                      | "teleporter"
                      | "timer"
                      | "head"
                      | "heels"
                      | "headOverHeels"
                      | "stopAutowalk"
                      | "soundEffect"
                      | "doorFrame"
                      | "doorLegs"
                      | "portal"
                      | "blocker"
                      | "particle"
                      | "outOfBounds"
                    )[];
                  };
                  /**
                   * activated for us is a boolean, not the many-states from the json config, ie it is stateful
                   * on if the item is currently activated (so they can render differently)
                   */
                  activated?: false | true;
                  /**
                   * if this item has ever been activated, in the lifetime of the room. Charging cybermen will
                   * have this flag as false so long as they are charging
                   */
                  everActivated?: false | true;
                  /**
                   * The item will be removed from the room after the room it is in has more than this roomTime.
                   * To guarantee removal on the next frame (effectively immediately)
                   * set to -1. Otherwise, can set to the current roomTime + duration of an animation
                   * that needs to play
                   *
                   * If null, the item is not scheduled for removal (the normal case)
                   */
                  expires?: null | number;
                  facing?: {
                    x: number;
                    y: number;
                    z: number;
                  };
                };
                rightState?: {
                  /**
                   * if given, the item disappears after the specified interaction.
                   * This must be null (not undefined) so switches can tell the difference
                   * between having no setting, and having a setting to change to null
                   * when they make something not disappearing
                   */
                  disappearing?: null | {
                    on: "touch" | "stand";
                    /**
                     * if given, the item will disappear only if stood/touched by items of this type.
                     * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
                     * or ['head'] eg for doughnuts that only head can collect
                     */
                    byType?: (
                      | "wall"
                      | "ball"
                      | "barrier"
                      | "block"
                      | "bubbles"
                      | "button"
                      | "charles"
                      | "conveyor"
                      | "deadlyBlock"
                      | "emitter"
                      | "firedDoughnut"
                      | "floatingText"
                      | "floor"
                      | "hushPuppy"
                      | "joystick"
                      | "lift"
                      | "monster"
                      | "moveableDeadly"
                      | "movingPlatform"
                      | "pickup"
                      | "portableBlock"
                      | "portableTeleporter"
                      | "pushableBlock"
                      | "sceneryCrown"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spikes"
                      | "spring"
                      | "switch"
                      | "teleporter"
                      | "timer"
                      | "head"
                      | "heels"
                      | "headOverHeels"
                      | "stopAutowalk"
                      | "soundEffect"
                      | "doorFrame"
                      | "doorLegs"
                      | "portal"
                      | "blocker"
                      | "particle"
                      | "outOfBounds"
                    )[];
                  };
                  /**
                   * activated for us is a boolean, not the many-states from the json config, ie it is stateful
                   * on if the item is currently activated (so they can render differently)
                   */
                  activated?: false | true;
                  /**
                   * if this item has ever been activated, in the lifetime of the room. Charging cybermen will
                   * have this flag as false so long as they are charging
                   */
                  everActivated?: false | true;
                  /**
                   * The item will be removed from the room after the room it is in has more than this roomTime.
                   * To guarantee removal on the next frame (effectively immediately)
                   * set to -1. Otherwise, can set to the current roomTime + duration of an animation
                   * that needs to play
                   *
                   * If null, the item is not scheduled for removal (the normal case)
                   */
                  expires?: null | number;
                  facing?: {
                    x: number;
                    y: number;
                    z: number;
                  };
                };
              }
            | {
                expectType: "switch";
                targets?: string[];
                /**
                 * this switch will flip the other switch when it is flipped
                 */
                flip: true;
              }
            | {
                expectType: "block";
                targets?: string[];
                /**
                 * if true, equivalent to leftState disappearing on stand, right state not disappearing
                 * if false, equivalent to leftState not disappearing, right state disappearing on stand
                 */
                makesStable: boolean;
              }
            | {
                expectType: "block";
                targets?: string[];
                leftState: {
                  disappearing?: {
                    on: "stand";
                  };
                };
                rightState: {
                  disappearing?: null;
                };
              }
            | {
                expectType: "charles";
                targets?: string[];
                /**
                 * true is a shorthand for charles bots that are activated by default:
                 *   {leftState: {activated: true}, rightState: {activated: false}},
                 * false is shorthand for charles bots that are deactivated by default:
                 *   {leftState: {activated: false}, rightState: {activated: true}},
                 */
                activates?: false | true;
                leftState?: {
                  activated?: false | true;
                };
                rightState?: {
                  activated?: false | true;
                };
              }
            | {
                expectType: "conveyor";
                targets?: string[];
                /**
                 * true is a shorthand for conveyors that the switch enables
                 *   {leftState: {disabled: false}, rightState: {disabled: true}},
                 * false is a shorthand for conveyors that the switch disables
                 *   {leftState: {disabled: true}, rightState: {disabled: false}},
                 */
                activates?: false | true;
                /**
                 * true means the left setting reverses the conveyor (opposite of config direction),
                 * false means the right setting reverses it.
                 * "reverse" = set direction to the opposite of the item's config.direction.
                 */
                reverses?: false | true;
                leftState?: {
                  disabled?: false | true;
                  direction?: "right" | "towards" | "away" | "left";
                  disappearing?: null | {
                    on: "stand";
                  };
                };
                rightState?: {
                  disabled?: false | true;
                  direction?: "right" | "towards" | "away" | "left";
                  disappearing?: null | {
                    on: "stand";
                  };
                };
              }
            | {
                expectType: "deadlyBlock";
                targets?: string[];
                /**
                 * true is a shorthand for deadly blocks that start disabled:
                 *   {leftState: {disabled: true}, rightState: {disabled: false}},
                 * false is a shorthand for deadly blocks that start enabled:
                 *   {leftState: {disabled: false}, rightState: {disabled: true}},
                 */
                disables?: false | true;
                leftState?: {
                  disabled?: false | true;
                };
                rightState?: {
                  disabled?: false | true;
                };
              }
            | {
                expectType: "emitter";
                targets?: string[];
                leftState: {
                  lastEmittedAtRoomTime?: number;
                  quantityEmitted?: number;
                  playerInsideAtRoomTime?: number;
                  /**
                   * what does this emitter emit? Could be (potentially) any free item
                   */
                  emits?: {
                    type:
                      | "ball"
                      | "charles"
                      | "firedDoughnut"
                      | "floatingText"
                      | "monster"
                      | "moveableDeadly"
                      | "movingPlatform"
                      | "pickup"
                      | "portableBlock"
                      | "portableTeleporter"
                      | "pushableBlock"
                      | "sceneryCrown"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spring";
                    config:
                      | {
                          gives: "crown";
                          planet:
                            | "blacktooth"
                            | "bookworld"
                            | "egyptus"
                            | "penitentiary"
                            | "safari";
                        }
                      | {
                          gives:
                            | "shield"
                            | "bag"
                            | "doughnuts"
                            | "extra-life"
                            | "fast"
                            | "hooter"
                            | "jumps"
                            | "reincarnation";
                        }
                      | {
                          gives: "scroll";
                          source: "inline";
                          markdown: string | string[];
                        }
                      | {
                          gives: "scroll";
                          source: "manual";
                          page:
                            | "blacktooth"
                            | "egyptus"
                            | "penitentiary"
                            | "safari"
                            | "bag"
                            | "doughnuts"
                            | "hooter"
                            | "head"
                            | "heels"
                            | "teleportBack"
                            | "historyOfTheBlacktoothEmpire"
                            | "theGame"
                            | "bookWorld"
                            | "reincarnationFish"
                            | "cuddlyStuffedWhiteRabbits"
                            | "crowns"
                            | "teleports"
                            | "springs"
                            | "switches"
                            | "conveyorBelts"
                            | "hushPuppies"
                            | "theEmperorsGuardian"
                            | "swopKey"
                            | "hintsAndTips"
                            | "credits"
                            | "installPwa"
                            | "installNative";
                        }
                      | Record<string, any>
                      | {
                          activated?: false | true;
                        }
                      | {
                          direction?:
                            | "right"
                            | "towards"
                            | "away"
                            | "left"
                            | "awayRight"
                            | "towardsRight"
                            | "towardsLeft"
                            | "awayLeft";
                        }
                      | {
                          /**
                           * the lines of text to display, each rendered as a separate row
                           */
                          textLines: string[];
                          /**
                           * the room time when this floating text starts; used to calculate the rise animation age.
                           * if not given, will start right away at time zero.
                           * if given, will delay starting until this time
                           */
                          appearanceRoomTime?: number;
                          /**
                           * if true, lines oscillate horizontally as they rise
                           */
                          sway?: false | true;
                        }
                      | {
                          which: "bubbleRobot";
                          movement: "patrol-randomly-xy8";
                          activated: "off" | "on";
                        }
                      | {
                          which: "computerBot";
                          movement:
                            | "patrol-randomly-xy4-and-reverse"
                            | "towards-on-shortest-axis-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "dalek";
                          movement: "patrol-randomly-diagonal";
                          activated: "off" | "on";
                        }
                      | {
                          which: "elephant";
                          movement: "patrol-randomly-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "elephantHead";
                          movement: "turn-to-player";
                          startDirection: "right" | "towards" | "away" | "left";
                          activated: "off" | "on";
                        }
                      | {
                          which: "emperor";
                          movement: "towards-analogue";
                          activated: "off" | "on";
                        }
                      | {
                          which: "emperorsGuardian";
                          movement: "towards-analogue-unless-planet-crowns";
                          activated: "off" | "on";
                        }
                      | {
                          which: "helicopterBug";
                          movement: "towards-analogue";
                          activated: "off" | "on";
                        }
                      | {
                          which: "helicopterBug";
                          movement: "patrol-randomly-xy8";
                          activated: "off" | "on";
                        }
                      | {
                          which: "homingBot";
                          movement: "towards-tripped-on-axis-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "monkey";
                          movement:
                            | "towards-on-shortest-axis-xy4"
                            | "patrol-randomly-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "skiHead";
                          activated: "off" | "on";
                          movement: "back-forth" | "clockwise" | "forwards";
                          startDirection: "right" | "towards" | "away" | "left";
                          style: "greenAndPink" | "starsAndStripes";
                        }
                      | {
                          which: "turtle";
                          movement:
                            | "back-forth"
                            | "clockwise"
                            | "forwards"
                            | "anticlockwise";
                          startDirection: "right" | "towards" | "away" | "left";
                          activated: "off" | "on";
                        }
                      | {
                          which: "cyberman";
                          activated: "off" | "on" | "after-player-near";
                          movement: "towards-on-shortest-axis-xy4";
                          startDirection: "right" | "towards" | "away" | "left";
                        }
                      | {
                          style: "deadFish";
                        }
                      | {
                          movement:
                            | "back-forth"
                            | "clockwise"
                            | "towards-analogue";
                          activated: "off" | "on" | "on-stand";
                          startDirection: "right" | "towards" | "away" | "left";
                        }
                      | {
                          style: "drum" | "cube" | "sticks";
                        }
                      | {
                          times?: {
                            x?: number;
                            y?: number;
                            z?: number;
                          };
                          activatedOnStoreValue?:
                            | "planetsLiberated"
                            | "scrollsRead"
                            | "freeCharacters"
                            | "planetsLiberated.blacktooth"
                            | "planetsLiberated.bookworld"
                            | "planetsLiberated.egyptus"
                            | "planetsLiberated.penitentiary"
                            | "planetsLiberated.safari"
                            | "scrollsRead.blacktooth"
                            | "scrollsRead.egyptus"
                            | "scrollsRead.penitentiary"
                            | "scrollsRead.safari"
                            | "scrollsRead.bag"
                            | "scrollsRead.doughnuts"
                            | "scrollsRead.hooter"
                            | "scrollsRead.head"
                            | "scrollsRead.heels"
                            | "scrollsRead.teleportBack"
                            | "scrollsRead.historyOfTheBlacktoothEmpire"
                            | "scrollsRead.theGame"
                            | "scrollsRead.bookWorld"
                            | "scrollsRead.reincarnationFish"
                            | "scrollsRead.cuddlyStuffedWhiteRabbits"
                            | "scrollsRead.crowns"
                            | "scrollsRead.teleports"
                            | "scrollsRead.springs"
                            | "scrollsRead.switches"
                            | "scrollsRead.conveyorBelts"
                            | "scrollsRead.hushPuppies"
                            | "scrollsRead.theEmperorsGuardian"
                            | "scrollsRead.swopKey"
                            | "scrollsRead.hintsAndTips"
                            | "scrollsRead.credits"
                            | "scrollsRead.installPwa"
                            | "scrollsRead.installNative"
                            | "freeCharacters.head"
                            | "freeCharacters.heels";
                          /**
                           * an item in the destination room this teleporter should go to - the
                           * player will be moved to atop this item
                           *
                           * If not given, will find the (only teleporter) in the destination room
                           *
                           * note: not RoomItemId because that is the ids of items in *this* room, but this
                           * is pointing to another room
                           */
                          toItemId?: string;
                          /**
                           * note that if the other room contains exactly one teleporter, we need not
                           * give the position or the item.
                           */
                          toRoom?: string;
                        }
                      | {
                          times?: {
                            x?: number;
                            y?: number;
                            z?: number;
                          };
                          activatedOnStoreValue?:
                            | "planetsLiberated"
                            | "scrollsRead"
                            | "freeCharacters"
                            | "planetsLiberated.blacktooth"
                            | "planetsLiberated.bookworld"
                            | "planetsLiberated.egyptus"
                            | "planetsLiberated.penitentiary"
                            | "planetsLiberated.safari"
                            | "scrollsRead.blacktooth"
                            | "scrollsRead.egyptus"
                            | "scrollsRead.penitentiary"
                            | "scrollsRead.safari"
                            | "scrollsRead.bag"
                            | "scrollsRead.doughnuts"
                            | "scrollsRead.hooter"
                            | "scrollsRead.head"
                            | "scrollsRead.heels"
                            | "scrollsRead.teleportBack"
                            | "scrollsRead.historyOfTheBlacktoothEmpire"
                            | "scrollsRead.theGame"
                            | "scrollsRead.bookWorld"
                            | "scrollsRead.reincarnationFish"
                            | "scrollsRead.cuddlyStuffedWhiteRabbits"
                            | "scrollsRead.crowns"
                            | "scrollsRead.teleports"
                            | "scrollsRead.springs"
                            | "scrollsRead.switches"
                            | "scrollsRead.conveyorBelts"
                            | "scrollsRead.hushPuppies"
                            | "scrollsRead.theEmperorsGuardian"
                            | "scrollsRead.swopKey"
                            | "scrollsRead.hintsAndTips"
                            | "scrollsRead.credits"
                            | "scrollsRead.installPwa"
                            | "scrollsRead.installNative"
                            | "freeCharacters.head"
                            | "freeCharacters.heels";
                          /**
                           * where in the destination room this teleporter should go - usually
                           * to atop another teleporter, but could be anywhere.
                           *
                           * If not given, will find the (only teleporter) in the destination room
                           */
                          toPosition: {
                            x: number;
                            y: number;
                            z: number;
                          };
                          /**
                           * note that if the other room contains exactly one teleporter, we need not
                           * give the position or the item
                           * If undefined, is a same-room teleporter
                           */
                          toRoom?: string;
                        }
                      | {
                          planet:
                            | "blacktooth"
                            | "bookworld"
                            | "egyptus"
                            | "penitentiary"
                            | "safari";
                        }
                      | {
                          which: "head" | "heels" | "headOverHeels";
                          startDirection:
                            | "right"
                            | "towards"
                            | "away"
                            | "left"
                            | "awayRight"
                            | "towardsRight"
                            | "towardsLeft"
                            | "awayLeft";
                        }
                      | {
                          style: "book" | "puck";
                        }
                      | {
                          style: "spikyBall";
                          startingPhase: 1 | 2;
                        };
                  };
                  /**
                   * how long between emissions?
                   */
                  period?: number;
                  /**
                   * how long to delay until the first emitting?
                   * after this time the first emit will happen, then all others will
                   * continue at the period interval.
                   * undefined is treated the same as 0
                   */
                  delay?: number;
                  /**
                   * how many total should this emitter emit? Null for no limit
                   */
                  maximum?: null | number;
                  /**
                   * How many items emitted from this emitter can be in the room at once?
                   * If undefined, no limit. If already this many items in the room, the
                   * items will have to be removed from the room before more can be emitted
                   * (for example, collecting an emitted pickup)
                   */
                  maximumAtOnce?: number;
                };
                rightState: {
                  lastEmittedAtRoomTime?: number;
                  quantityEmitted?: number;
                  playerInsideAtRoomTime?: number;
                  /**
                   * what does this emitter emit? Could be (potentially) any free item
                   */
                  emits?: {
                    type:
                      | "ball"
                      | "charles"
                      | "firedDoughnut"
                      | "floatingText"
                      | "monster"
                      | "moveableDeadly"
                      | "movingPlatform"
                      | "pickup"
                      | "portableBlock"
                      | "portableTeleporter"
                      | "pushableBlock"
                      | "sceneryCrown"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spring";
                    config:
                      | {
                          gives: "crown";
                          planet:
                            | "blacktooth"
                            | "bookworld"
                            | "egyptus"
                            | "penitentiary"
                            | "safari";
                        }
                      | {
                          gives:
                            | "shield"
                            | "bag"
                            | "doughnuts"
                            | "extra-life"
                            | "fast"
                            | "hooter"
                            | "jumps"
                            | "reincarnation";
                        }
                      | {
                          gives: "scroll";
                          source: "inline";
                          markdown: string | string[];
                        }
                      | {
                          gives: "scroll";
                          source: "manual";
                          page:
                            | "blacktooth"
                            | "egyptus"
                            | "penitentiary"
                            | "safari"
                            | "bag"
                            | "doughnuts"
                            | "hooter"
                            | "head"
                            | "heels"
                            | "teleportBack"
                            | "historyOfTheBlacktoothEmpire"
                            | "theGame"
                            | "bookWorld"
                            | "reincarnationFish"
                            | "cuddlyStuffedWhiteRabbits"
                            | "crowns"
                            | "teleports"
                            | "springs"
                            | "switches"
                            | "conveyorBelts"
                            | "hushPuppies"
                            | "theEmperorsGuardian"
                            | "swopKey"
                            | "hintsAndTips"
                            | "credits"
                            | "installPwa"
                            | "installNative";
                        }
                      | Record<string, any>
                      | {
                          activated?: false | true;
                        }
                      | {
                          direction?:
                            | "right"
                            | "towards"
                            | "away"
                            | "left"
                            | "awayRight"
                            | "towardsRight"
                            | "towardsLeft"
                            | "awayLeft";
                        }
                      | {
                          /**
                           * the lines of text to display, each rendered as a separate row
                           */
                          textLines: string[];
                          /**
                           * the room time when this floating text starts; used to calculate the rise animation age.
                           * if not given, will start right away at time zero.
                           * if given, will delay starting until this time
                           */
                          appearanceRoomTime?: number;
                          /**
                           * if true, lines oscillate horizontally as they rise
                           */
                          sway?: false | true;
                        }
                      | {
                          which: "bubbleRobot";
                          movement: "patrol-randomly-xy8";
                          activated: "off" | "on";
                        }
                      | {
                          which: "computerBot";
                          movement:
                            | "patrol-randomly-xy4-and-reverse"
                            | "towards-on-shortest-axis-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "dalek";
                          movement: "patrol-randomly-diagonal";
                          activated: "off" | "on";
                        }
                      | {
                          which: "elephant";
                          movement: "patrol-randomly-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "elephantHead";
                          movement: "turn-to-player";
                          startDirection: "right" | "towards" | "away" | "left";
                          activated: "off" | "on";
                        }
                      | {
                          which: "emperor";
                          movement: "towards-analogue";
                          activated: "off" | "on";
                        }
                      | {
                          which: "emperorsGuardian";
                          movement: "towards-analogue-unless-planet-crowns";
                          activated: "off" | "on";
                        }
                      | {
                          which: "helicopterBug";
                          movement: "towards-analogue";
                          activated: "off" | "on";
                        }
                      | {
                          which: "helicopterBug";
                          movement: "patrol-randomly-xy8";
                          activated: "off" | "on";
                        }
                      | {
                          which: "homingBot";
                          movement: "towards-tripped-on-axis-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "monkey";
                          movement:
                            | "towards-on-shortest-axis-xy4"
                            | "patrol-randomly-xy4";
                          activated: "off" | "on";
                        }
                      | {
                          which: "skiHead";
                          activated: "off" | "on";
                          movement: "back-forth" | "clockwise" | "forwards";
                          startDirection: "right" | "towards" | "away" | "left";
                          style: "greenAndPink" | "starsAndStripes";
                        }
                      | {
                          which: "turtle";
                          movement:
                            | "back-forth"
                            | "clockwise"
                            | "forwards"
                            | "anticlockwise";
                          startDirection: "right" | "towards" | "away" | "left";
                          activated: "off" | "on";
                        }
                      | {
                          which: "cyberman";
                          activated: "off" | "on" | "after-player-near";
                          movement: "towards-on-shortest-axis-xy4";
                          startDirection: "right" | "towards" | "away" | "left";
                        }
                      | {
                          style: "deadFish";
                        }
                      | {
                          movement:
                            | "back-forth"
                            | "clockwise"
                            | "towards-analogue";
                          activated: "off" | "on" | "on-stand";
                          startDirection: "right" | "towards" | "away" | "left";
                        }
                      | {
                          style: "drum" | "cube" | "sticks";
                        }
                      | {
                          times?: {
                            x?: number;
                            y?: number;
                            z?: number;
                          };
                          activatedOnStoreValue?:
                            | "planetsLiberated"
                            | "scrollsRead"
                            | "freeCharacters"
                            | "planetsLiberated.blacktooth"
                            | "planetsLiberated.bookworld"
                            | "planetsLiberated.egyptus"
                            | "planetsLiberated.penitentiary"
                            | "planetsLiberated.safari"
                            | "scrollsRead.blacktooth"
                            | "scrollsRead.egyptus"
                            | "scrollsRead.penitentiary"
                            | "scrollsRead.safari"
                            | "scrollsRead.bag"
                            | "scrollsRead.doughnuts"
                            | "scrollsRead.hooter"
                            | "scrollsRead.head"
                            | "scrollsRead.heels"
                            | "scrollsRead.teleportBack"
                            | "scrollsRead.historyOfTheBlacktoothEmpire"
                            | "scrollsRead.theGame"
                            | "scrollsRead.bookWorld"
                            | "scrollsRead.reincarnationFish"
                            | "scrollsRead.cuddlyStuffedWhiteRabbits"
                            | "scrollsRead.crowns"
                            | "scrollsRead.teleports"
                            | "scrollsRead.springs"
                            | "scrollsRead.switches"
                            | "scrollsRead.conveyorBelts"
                            | "scrollsRead.hushPuppies"
                            | "scrollsRead.theEmperorsGuardian"
                            | "scrollsRead.swopKey"
                            | "scrollsRead.hintsAndTips"
                            | "scrollsRead.credits"
                            | "scrollsRead.installPwa"
                            | "scrollsRead.installNative"
                            | "freeCharacters.head"
                            | "freeCharacters.heels";
                          /**
                           * an item in the destination room this teleporter should go to - the
                           * player will be moved to atop this item
                           *
                           * If not given, will find the (only teleporter) in the destination room
                           *
                           * note: not RoomItemId because that is the ids of items in *this* room, but this
                           * is pointing to another room
                           */
                          toItemId?: string;
                          /**
                           * note that if the other room contains exactly one teleporter, we need not
                           * give the position or the item.
                           */
                          toRoom?: string;
                        }
                      | {
                          times?: {
                            x?: number;
                            y?: number;
                            z?: number;
                          };
                          activatedOnStoreValue?:
                            | "planetsLiberated"
                            | "scrollsRead"
                            | "freeCharacters"
                            | "planetsLiberated.blacktooth"
                            | "planetsLiberated.bookworld"
                            | "planetsLiberated.egyptus"
                            | "planetsLiberated.penitentiary"
                            | "planetsLiberated.safari"
                            | "scrollsRead.blacktooth"
                            | "scrollsRead.egyptus"
                            | "scrollsRead.penitentiary"
                            | "scrollsRead.safari"
                            | "scrollsRead.bag"
                            | "scrollsRead.doughnuts"
                            | "scrollsRead.hooter"
                            | "scrollsRead.head"
                            | "scrollsRead.heels"
                            | "scrollsRead.teleportBack"
                            | "scrollsRead.historyOfTheBlacktoothEmpire"
                            | "scrollsRead.theGame"
                            | "scrollsRead.bookWorld"
                            | "scrollsRead.reincarnationFish"
                            | "scrollsRead.cuddlyStuffedWhiteRabbits"
                            | "scrollsRead.crowns"
                            | "scrollsRead.teleports"
                            | "scrollsRead.springs"
                            | "scrollsRead.switches"
                            | "scrollsRead.conveyorBelts"
                            | "scrollsRead.hushPuppies"
                            | "scrollsRead.theEmperorsGuardian"
                            | "scrollsRead.swopKey"
                            | "scrollsRead.hintsAndTips"
                            | "scrollsRead.credits"
                            | "scrollsRead.installPwa"
                            | "scrollsRead.installNative"
                            | "freeCharacters.head"
                            | "freeCharacters.heels";
                          /**
                           * where in the destination room this teleporter should go - usually
                           * to atop another teleporter, but could be anywhere.
                           *
                           * If not given, will find the (only teleporter) in the destination room
                           */
                          toPosition: {
                            x: number;
                            y: number;
                            z: number;
                          };
                          /**
                           * note that if the other room contains exactly one teleporter, we need not
                           * give the position or the item
                           * If undefined, is a same-room teleporter
                           */
                          toRoom?: string;
                        }
                      | {
                          planet:
                            | "blacktooth"
                            | "bookworld"
                            | "egyptus"
                            | "penitentiary"
                            | "safari";
                        }
                      | {
                          which: "head" | "heels" | "headOverHeels";
                          startDirection:
                            | "right"
                            | "towards"
                            | "away"
                            | "left"
                            | "awayRight"
                            | "towardsRight"
                            | "towardsLeft"
                            | "awayLeft";
                        }
                      | {
                          style: "book" | "puck";
                        }
                      | {
                          style: "spikyBall";
                          startingPhase: 1 | 2;
                        };
                  };
                  /**
                   * how long between emissions?
                   */
                  period?: number;
                  /**
                   * how long to delay until the first emitting?
                   * after this time the first emit will happen, then all others will
                   * continue at the period interval.
                   * undefined is treated the same as 0
                   */
                  delay?: number;
                  /**
                   * how many total should this emitter emit? Null for no limit
                   */
                  maximum?: null | number;
                  /**
                   * How many items emitted from this emitter can be in the room at once?
                   * If undefined, no limit. If already this many items in the room, the
                   * items will have to be removed from the room before more can be emitted
                   * (for example, collecting an emitted pickup)
                   */
                  maximumAtOnce?: number;
                };
              }
            | {
                expectType: "joystick";
                targets?: string[];
                leftState: {
                  /**
                   * item ids of all the items (probably Charles) that this joystick controls.
                   * if omitted, the joystick controls every charles in its room — which is
                   * how the original game always behaved.
                   */
                  controls?: string[];
                };
                rightState: {
                  /**
                   * item ids of all the items (probably Charles) that this joystick controls.
                   * if omitted, the joystick controls every charles in its room — which is
                   * how the original game always behaved.
                   */
                  controls?: string[];
                };
              }
            | {
                expectType: "lift";
                targets?: string[];
                leftState: {
                  direction?: "down" | "up";
                  vels?: {
                    lift: {
                      x: number;
                      y: number;
                      z: number;
                    };
                  };
                  top?: number;
                  bottom?: number;
                };
                rightState: {
                  direction?: "down" | "up";
                  vels?: {
                    lift: {
                      x: number;
                      y: number;
                      z: number;
                    };
                  };
                  top?: number;
                  bottom?: number;
                };
              }
            | {
                expectType: "teleporter";
                targets?: string[];
                leftState: {
                  toRoom: string;
                  toPosition: {
                    x: number;
                    y: number;
                    z: number;
                  };
                };
                rightState: {
                  toRoom: string;
                  toPosition: {
                    x: number;
                    y: number;
                    z: number;
                  };
                };
              }
            | {
                expectType: "timer";
                targets?: string[];
                activates?: false | true;
                leftState?: {
                  activated?: false | true;
                };
                rightState?: {
                  activated?: false | true;
                };
              }
          )[];
        };
      }
  >;
  meta?: {
    /**
     * subRooms are used for the map for rooms which were modelled as multiple rooms
     * in the original game
     */
    subRooms?: Record<
      string,
      {
        /**
         * the grid position (on the map) of this sub-room
         */
        gridPosition: {
          x: number;
          y: number;
        };
        /**
         * where the sub-room actually starts and ends once loaded (so we
         * can work out which sub-room items are in while the game is in-play)
         */
        physicalPosition: {
          from: {
            x: number;
            y: number;
          };
          to: {
            x: number;
            y: number;
          };
        };
      }
    >;
    /**
     * for rooms that are shown on the same map even though they don't
     * have any physical connection
     */
    nonContiguousRelationship?: {
      with: {
        room: string;
        subRoom?: string;
      };
      /**
       * the other room needs to have the opposite (* -1) of this
       */
      gridOffset: {
        x: number;
        y: number;
        z: number;
      };
    };
    label?: {
      gridOffset: {
        x: number;
        y: number;
      };
      text: string;
      align: "right" | "left";
    };
  };
};
