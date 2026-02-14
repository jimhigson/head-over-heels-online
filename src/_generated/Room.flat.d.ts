// Auto-generated flattened types
// Generated from AnyRoomJson

// Type aliases for generic parameters that appear in the output
type RoomItemId = string;

export type RoomJsonSchema = {
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
        type: "charles";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: Record<string, never>;
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
          controls: string[];
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
              activated: "while-player-near";
            }
          | {
              which: "emperorsGuardian";
              movement: "towards-analogue-unless-planet-crowns";
              activated: "while-player-near";
            }
          | {
              which: "helicopterBug";
              movement: "towards-analogue";
              activated: "while-player-near";
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
              movement: "back-forth" | "clockwise" | "forwards";
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
              markdown: string;
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
                | "teleportBack"
                | "historyOfTheBlacktoothEmpire"
                | "theGame"
                | "bookWorld"
                | "head"
                | "heels"
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
                | "infiniteLivesPoke"
                | "infiniteDoughnutsPoke"
                | "showFps"
                | "onScreenControls"
                | "soundSettings"
                | "displaySettings.crtFilter"
                | "displaySettings.uncolourised"
                | "displaySettings.showShadowMasks"
                | "soundSettings.mute"
                | "soundSettings.noRoomEntryTunes"
                | "soundSettings.noFootsteps";
            }
          | {
              initialSetting: "right" | "left";
              /**
               * this switch targets items in the room
               */
              type: "in-room";
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
                          | "charles"
                          | "conveyor"
                          | "deadlyBlock"
                          | "hushPuppy"
                          | "joystick"
                          | "lift"
                          | "monster"
                          | "moveableDeadly"
                          | "pickup"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring"
                          | "switch"
                          | "teleporter"
                          | "movingPlatform"
                          | "spikes"
                          | "portableBlock"
                          | "pushableBlock"
                          | "emitter"
                          | "firedDoughnut"
                          | "button"
                          | "sceneryCrown"
                          | "floor"
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
                          | "floatingText"
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
                          | "charles"
                          | "conveyor"
                          | "deadlyBlock"
                          | "hushPuppy"
                          | "joystick"
                          | "lift"
                          | "monster"
                          | "moveableDeadly"
                          | "pickup"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring"
                          | "switch"
                          | "teleporter"
                          | "movingPlatform"
                          | "spikes"
                          | "portableBlock"
                          | "pushableBlock"
                          | "emitter"
                          | "firedDoughnut"
                          | "button"
                          | "sceneryCrown"
                          | "floor"
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
                          | "floatingText"
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
                    expectType: "conveyor";
                    targets?: string[];
                    leftState: {
                      direction?: "right" | "towards" | "away" | "left";
                      disappearing?: null | {
                        on: "stand";
                      };
                    };
                    rightState: {
                      direction?: "right" | "towards" | "away" | "left";
                      disappearing?: null | {
                        on: "stand";
                      };
                    };
                  }
                | {
                    expectType: "emitter";
                    targets?: string[];
                    leftState: {
                      lastEmittedAtRoomTime?: number;
                      quantityEmitted?: number;
                      /**
                       * what does this emitter emit? Could be (potentially) any free item
                       */
                      emits?: {
                        type:
                          | "ball"
                          | "charles"
                          | "monster"
                          | "moveableDeadly"
                          | "pickup"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring"
                          | "movingPlatform"
                          | "portableBlock"
                          | "pushableBlock"
                          | "firedDoughnut"
                          | "sceneryCrown";
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
                              markdown: string;
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
                                | "teleportBack"
                                | "historyOfTheBlacktoothEmpire"
                                | "theGame"
                                | "bookWorld"
                                | "head"
                                | "heels"
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
                              activated: "while-player-near";
                            }
                          | {
                              which: "emperorsGuardian";
                              movement: "towards-analogue-unless-planet-crowns";
                              activated: "while-player-near";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "towards-analogue";
                              activated: "while-player-near";
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
                              movement: "back-forth" | "clockwise" | "forwards";
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
                            }
                          | Record<string, any>
                          | {
                              movement:
                                | "towards-analogue"
                                | "back-forth"
                                | "clockwise";
                              activated: "off" | "on" | "on-stand";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "cube" | "drum" | "sticks";
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
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            };
                      };
                      /**
                       * how long between emissions?
                       */
                      period?: number;
                      /**
                       * how many should this emitter emit? Null for no limit
                       */
                      maximum?: null | number;
                    };
                    rightState: {
                      lastEmittedAtRoomTime?: number;
                      quantityEmitted?: number;
                      /**
                       * what does this emitter emit? Could be (potentially) any free item
                       */
                      emits?: {
                        type:
                          | "ball"
                          | "charles"
                          | "monster"
                          | "moveableDeadly"
                          | "pickup"
                          | "sceneryPlayer"
                          | "slidingBlock"
                          | "slidingDeadly"
                          | "spring"
                          | "movingPlatform"
                          | "portableBlock"
                          | "pushableBlock"
                          | "firedDoughnut"
                          | "sceneryCrown";
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
                              markdown: string;
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
                                | "teleportBack"
                                | "historyOfTheBlacktoothEmpire"
                                | "theGame"
                                | "bookWorld"
                                | "head"
                                | "heels"
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
                              activated: "while-player-near";
                            }
                          | {
                              which: "emperorsGuardian";
                              movement: "towards-analogue-unless-planet-crowns";
                              activated: "while-player-near";
                            }
                          | {
                              which: "helicopterBug";
                              movement: "towards-analogue";
                              activated: "while-player-near";
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
                              movement: "back-forth" | "clockwise" | "forwards";
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
                            }
                          | Record<string, any>
                          | {
                              movement:
                                | "towards-analogue"
                                | "back-forth"
                                | "clockwise";
                              activated: "off" | "on" | "on-stand";
                              startDirection:
                                | "right"
                                | "towards"
                                | "away"
                                | "left";
                            }
                          | {
                              style: "cube" | "drum" | "sticks";
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
                              planet:
                                | "blacktooth"
                                | "bookworld"
                                | "egyptus"
                                | "penitentiary"
                                | "safari";
                            };
                      };
                      /**
                       * how long between emissions?
                       */
                      period?: number;
                      /**
                       * how many should this emitter emit? Null for no limit
                       */
                      maximum?: null | number;
                    };
                  }
                | {
                    expectType: "joystick";
                    targets?: string[];
                    leftState: {
                      controls?: string[];
                    };
                    rightState: {
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
                    expectType: "switch";
                    targets?: string[];
                    /**
                     * this switch will flip the other switch when it is flipped
                     */
                    flip: true;
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
        config: {
          times?: {
            x?: number;
            y?: number;
            z?: number;
          };
          toRoom: string;
          toPosition: {
            x: number;
            y: number;
            z: number;
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
            | "scrollsRead.teleportBack"
            | "scrollsRead.historyOfTheBlacktoothEmpire"
            | "scrollsRead.theGame"
            | "scrollsRead.bookWorld"
            | "scrollsRead.head"
            | "scrollsRead.heels"
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
          movement: "towards-analogue" | "back-forth" | "clockwise";
          activated: "off" | "on" | "on-stand";
          startDirection: "right" | "towards" | "away" | "left";
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
        type: "portableBlock";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          style: "cube" | "drum" | "sticks";
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
                      activated: "while-player-near";
                    }
                  | {
                      which: "emperorsGuardian";
                      movement: "towards-analogue-unless-planet-crowns";
                      activated: "while-player-near";
                    }
                  | {
                      which: "helicopterBug";
                      movement: "towards-analogue";
                      activated: "while-player-near";
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
                      movement: "back-forth" | "clockwise" | "forwards";
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
                config: Record<string, never>;
              }
            | {
                type: "pushableBlock";
                config: Record<string, never>;
              }
            | {
                type: "movingPlatform";
                config: {
                  movement: "towards-analogue" | "back-forth" | "clockwise";
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
                      markdown: string;
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
                        | "teleportBack"
                        | "historyOfTheBlacktoothEmpire"
                        | "theGame"
                        | "bookWorld"
                        | "head"
                        | "heels"
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
                  style: "cube" | "drum" | "sticks";
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
           * how many should this emitter emit? Null for no limit
           */
          maximum: null | number;
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
        type: "button";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
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
                      | "charles"
                      | "conveyor"
                      | "deadlyBlock"
                      | "hushPuppy"
                      | "joystick"
                      | "lift"
                      | "monster"
                      | "moveableDeadly"
                      | "pickup"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spring"
                      | "switch"
                      | "teleporter"
                      | "movingPlatform"
                      | "spikes"
                      | "portableBlock"
                      | "pushableBlock"
                      | "emitter"
                      | "firedDoughnut"
                      | "button"
                      | "sceneryCrown"
                      | "floor"
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
                      | "floatingText"
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
                      | "charles"
                      | "conveyor"
                      | "deadlyBlock"
                      | "hushPuppy"
                      | "joystick"
                      | "lift"
                      | "monster"
                      | "moveableDeadly"
                      | "pickup"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spring"
                      | "switch"
                      | "teleporter"
                      | "movingPlatform"
                      | "spikes"
                      | "portableBlock"
                      | "pushableBlock"
                      | "emitter"
                      | "firedDoughnut"
                      | "button"
                      | "sceneryCrown"
                      | "floor"
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
                      | "floatingText"
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
                expectType: "conveyor";
                targets?: string[];
                leftState: {
                  direction?: "right" | "towards" | "away" | "left";
                  disappearing?: null | {
                    on: "stand";
                  };
                };
                rightState: {
                  direction?: "right" | "towards" | "away" | "left";
                  disappearing?: null | {
                    on: "stand";
                  };
                };
              }
            | {
                expectType: "emitter";
                targets?: string[];
                leftState: {
                  lastEmittedAtRoomTime?: number;
                  quantityEmitted?: number;
                  /**
                   * what does this emitter emit? Could be (potentially) any free item
                   */
                  emits?: {
                    type:
                      | "ball"
                      | "charles"
                      | "monster"
                      | "moveableDeadly"
                      | "pickup"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spring"
                      | "movingPlatform"
                      | "portableBlock"
                      | "pushableBlock"
                      | "firedDoughnut"
                      | "sceneryCrown";
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
                          markdown: string;
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
                            | "teleportBack"
                            | "historyOfTheBlacktoothEmpire"
                            | "theGame"
                            | "bookWorld"
                            | "head"
                            | "heels"
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
                          activated: "while-player-near";
                        }
                      | {
                          which: "emperorsGuardian";
                          movement: "towards-analogue-unless-planet-crowns";
                          activated: "while-player-near";
                        }
                      | {
                          which: "helicopterBug";
                          movement: "towards-analogue";
                          activated: "while-player-near";
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
                          movement: "back-forth" | "clockwise" | "forwards";
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
                        }
                      | Record<string, any>
                      | {
                          movement:
                            | "towards-analogue"
                            | "back-forth"
                            | "clockwise";
                          activated: "off" | "on" | "on-stand";
                          startDirection: "right" | "towards" | "away" | "left";
                        }
                      | {
                          style: "cube" | "drum" | "sticks";
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
                          planet:
                            | "blacktooth"
                            | "bookworld"
                            | "egyptus"
                            | "penitentiary"
                            | "safari";
                        };
                  };
                  /**
                   * how long between emissions?
                   */
                  period?: number;
                  /**
                   * how many should this emitter emit? Null for no limit
                   */
                  maximum?: null | number;
                };
                rightState: {
                  lastEmittedAtRoomTime?: number;
                  quantityEmitted?: number;
                  /**
                   * what does this emitter emit? Could be (potentially) any free item
                   */
                  emits?: {
                    type:
                      | "ball"
                      | "charles"
                      | "monster"
                      | "moveableDeadly"
                      | "pickup"
                      | "sceneryPlayer"
                      | "slidingBlock"
                      | "slidingDeadly"
                      | "spring"
                      | "movingPlatform"
                      | "portableBlock"
                      | "pushableBlock"
                      | "firedDoughnut"
                      | "sceneryCrown";
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
                          markdown: string;
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
                            | "teleportBack"
                            | "historyOfTheBlacktoothEmpire"
                            | "theGame"
                            | "bookWorld"
                            | "head"
                            | "heels"
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
                          activated: "while-player-near";
                        }
                      | {
                          which: "emperorsGuardian";
                          movement: "towards-analogue-unless-planet-crowns";
                          activated: "while-player-near";
                        }
                      | {
                          which: "helicopterBug";
                          movement: "towards-analogue";
                          activated: "while-player-near";
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
                          movement: "back-forth" | "clockwise" | "forwards";
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
                        }
                      | Record<string, any>
                      | {
                          movement:
                            | "towards-analogue"
                            | "back-forth"
                            | "clockwise";
                          activated: "off" | "on" | "on-stand";
                          startDirection: "right" | "towards" | "away" | "left";
                        }
                      | {
                          style: "cube" | "drum" | "sticks";
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
                          planet:
                            | "blacktooth"
                            | "bookworld"
                            | "egyptus"
                            | "penitentiary"
                            | "safari";
                        };
                  };
                  /**
                   * how long between emissions?
                   */
                  period?: number;
                  /**
                   * how many should this emitter emit? Null for no limit
                   */
                  maximum?: null | number;
                };
              }
            | {
                expectType: "joystick";
                targets?: string[];
                leftState: {
                  controls?: string[];
                };
                rightState: {
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
                expectType: "switch";
                targets?: string[];
                /**
                 * this switch will flip the other switch when it is flipped
                 */
                flip: true;
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
          )[];
        };
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
