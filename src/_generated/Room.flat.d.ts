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
  color: {
    hue: "yellow" | "cyan" | "green" | "magenta" | "white";
    shade: "basic" | "dimmed";
  };
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
              /**
               * this wall would normally be found on the (invisible) towards side of the room
               */
              direction: "towards";
              times?: {
                x: number;
              };
            }
          | {
              direction: "right";
              times?: {
                y: number;
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
        type: "door";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          toRoom: string;
          /**
           * the id of the door in the destination room. This usually does not need to be given
           * since the game can choose the door facing the right way from the destination room.
           * only give this if there are multiple doors in the same direction between the two
           * rooms
           */
          toDoor?: string;
          direction: "towards" | "right" | "away" | "left";
          meta?: {
            toSubRoom?: string;
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
                type: "pickup";
                gives:
                  | "shield"
                  | "extra-life"
                  | "fast"
                  | "jumps"
                  | "doughnuts"
                  | "bag"
                  | "hooter"
                  | "reincarnation"
                  | "scroll"
                  | "crown";
              }
            | {
                type: "hushPuppy";
              }
            | {
                type: "disappearing";
              };
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
            | "userSettings"
            | "planetsLiberated"
            | "gameRunning"
            | "scrollsRead"
            | "cheatsOn"
            | "userSettings.displaySettings"
            | "userSettings.infiniteLivesPoke"
            | "userSettings.infiniteDoughnutsPoke"
            | "userSettings.showFps"
            | "userSettings.screenRelativeControl"
            | "userSettings.onScreenControls"
            | "userSettings.soundSettings"
            | "userSettings.displaySettings.crtFilter"
            | "userSettings.displaySettings.uncolourised"
            | "userSettings.displaySettings.showShadowMasks"
            | "userSettings.soundSettings.mute"
            | "userSettings.soundSettings.noFootsteps"
            | "planetsLiberated.blacktooth"
            | "planetsLiberated.bookworld"
            | "planetsLiberated.egyptus"
            | "planetsLiberated.penitentiary"
            | "planetsLiberated.safari"
            | "scrollsRead.blacktooth"
            | "scrollsRead.egyptus"
            | "scrollsRead.penitentiary"
            | "scrollsRead.safari"
            | "scrollsRead.doughnuts"
            | "scrollsRead.bag"
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
            | "scrollsRead.installGuide";
        };
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
          style: "book" | "organic" | "artificial" | "tower";
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
          style: "drum" | "sticks" | "cube";
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
        type: "movingPlatform";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          movement: "clockwise" | "back-forth" | "towards-analogue";
          activated: "off" | "on" | "on-stand";
          startDirection: "towards" | "right" | "away" | "left";
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
          direction: "towards" | "right" | "away" | "left";
          disappearing?: {
            on: "stand";
          };
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
              gives:
                | "shield"
                | "extra-life"
                | "fast"
                | "jumps"
                | "doughnuts"
                | "bag"
                | "hooter"
                | "reincarnation";
            }
          | {
              gives: "scroll";
              page:
                | "blacktooth"
                | "egyptus"
                | "penitentiary"
                | "safari"
                | "doughnuts"
                | "bag"
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
                | "installGuide";
            }
          | {
              gives: "crown";
              planet:
                | "blacktooth"
                | "bookworld"
                | "egyptus"
                | "penitentiary"
                | "safari";
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
        type: "sceneryPlayer";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: {
          which: "head" | "heels" | "headOverHeels";
          startDirection:
            | "towards"
            | "right"
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
                      which: "emperorsGuardian";
                      movement: "towards-analogue-unless-planet-crowns";
                      activated: "while-player-near";
                    }
                  | {
                      which: "emperor";
                      movement: "towards-analogue";
                      activated: "while-player-near";
                    }
                  | {
                      which: "elephant";
                      movement: "patrol-randomly-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "elephantHead";
                      movement: "turn-to-player";
                      startDirection: "towards" | "right" | "away" | "left";
                      activated: "off" | "on";
                    }
                  | {
                      which: "monkey";
                      movement:
                        | "patrol-randomly-xy4"
                        | "towards-on-shortest-axis-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "computerBot";
                      movement:
                        | "towards-on-shortest-axis-xy4"
                        | "patrol-randomly-xy4-and-reverse";
                      activated: "off" | "on";
                    }
                  | {
                      which: "bubbleRobot";
                      movement: "patrol-randomly-xy8";
                      activated: "off" | "on";
                    }
                  | {
                      which: "dalek";
                      movement: "patrol-randomly-diagonal";
                      activated: "off" | "on";
                    }
                  | {
                      which: "homingBot";
                      movement: "towards-tripped-on-axis-xy4";
                      activated: "off" | "on";
                    }
                  | {
                      which: "helicopterBug";
                      movement: "patrol-randomly-xy8";
                      activated: "off" | "on";
                    }
                  | {
                      which: "helicopterBug";
                      movement: "towards-analogue";
                      activated: "while-player-near";
                    }
                  | {
                      which: "turtle";
                      movement: "clockwise";
                      startDirection: "towards" | "right" | "away" | "left";
                      activated: "off" | "on";
                    }
                  | {
                      which: "cyberman";
                      activated: "off" | "on" | "after-player-near";
                      movement: "towards-on-shortest-axis-xy4";
                      startDirection: "towards" | "right" | "away" | "left";
                    }
                  | {
                      which: "skiHead";
                      activated: "off" | "on";
                      movement: "clockwise" | "back-forth";
                      startDirection: "towards" | "right" | "away" | "left";
                      style: "greenAndPink" | "starsAndStripes";
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
                  movement: "clockwise" | "back-forth" | "towards-analogue";
                  activated: "off" | "on" | "on-stand";
                  startDirection: "towards" | "right" | "away" | "left";
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
                      gives:
                        | "shield"
                        | "extra-life"
                        | "fast"
                        | "jumps"
                        | "doughnuts"
                        | "bag"
                        | "hooter"
                        | "reincarnation";
                    }
                  | {
                      gives: "scroll";
                      page:
                        | "blacktooth"
                        | "egyptus"
                        | "penitentiary"
                        | "safari"
                        | "doughnuts"
                        | "bag"
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
                        | "installGuide";
                    }
                  | {
                      gives: "crown";
                      planet:
                        | "blacktooth"
                        | "bookworld"
                        | "egyptus"
                        | "penitentiary"
                        | "safari";
                    };
              }
            | {
                type: "portableBlock";
                config: {
                  style: "drum" | "sticks" | "cube";
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
                    | "towards"
                    | "right"
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
                    | "towards"
                    | "right"
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
            | "towards"
            | "right"
            | "away"
            | "left"
            | "awayRight"
            | "towardsRight"
            | "towardsLeft"
            | "awayLeft";
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
        type: "monster";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config:
          | {
              which: "emperorsGuardian";
              movement: "towards-analogue-unless-planet-crowns";
              activated: "while-player-near";
            }
          | {
              which: "emperor";
              movement: "towards-analogue";
              activated: "while-player-near";
            }
          | {
              which: "elephant";
              movement: "patrol-randomly-xy4";
              activated: "off" | "on";
            }
          | {
              which: "elephantHead";
              movement: "turn-to-player";
              startDirection: "towards" | "right" | "away" | "left";
              activated: "off" | "on";
            }
          | {
              which: "monkey";
              movement: "patrol-randomly-xy4" | "towards-on-shortest-axis-xy4";
              activated: "off" | "on";
            }
          | {
              which: "computerBot";
              movement:
                | "towards-on-shortest-axis-xy4"
                | "patrol-randomly-xy4-and-reverse";
              activated: "off" | "on";
            }
          | {
              which: "bubbleRobot";
              movement: "patrol-randomly-xy8";
              activated: "off" | "on";
            }
          | {
              which: "dalek";
              movement: "patrol-randomly-diagonal";
              activated: "off" | "on";
            }
          | {
              which: "homingBot";
              movement: "towards-tripped-on-axis-xy4";
              activated: "off" | "on";
            }
          | {
              which: "helicopterBug";
              movement: "patrol-randomly-xy8";
              activated: "off" | "on";
            }
          | {
              which: "helicopterBug";
              movement: "towards-analogue";
              activated: "while-player-near";
            }
          | {
              which: "turtle";
              movement: "clockwise";
              startDirection: "towards" | "right" | "away" | "left";
              activated: "off" | "on";
            }
          | {
              which: "cyberman";
              activated: "off" | "on" | "after-player-near";
              movement: "towards-on-shortest-axis-xy4";
              startDirection: "towards" | "right" | "away" | "left";
            }
          | {
              which: "skiHead";
              activated: "off" | "on";
              movement: "clockwise" | "back-forth";
              startDirection: "towards" | "right" | "away" | "left";
              style: "greenAndPink" | "starsAndStripes";
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
        type: "charles";
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
                | "userSettings"
                | "planetsLiberated"
                | "gameRunning"
                | "scrollsRead"
                | "cheatsOn"
                | "userSettings.displaySettings"
                | "userSettings.infiniteLivesPoke"
                | "userSettings.infiniteDoughnutsPoke"
                | "userSettings.showFps"
                | "userSettings.screenRelativeControl"
                | "userSettings.onScreenControls"
                | "userSettings.soundSettings"
                | "userSettings.displaySettings.crtFilter"
                | "userSettings.displaySettings.uncolourised"
                | "userSettings.displaySettings.showShadowMasks"
                | "userSettings.soundSettings.mute"
                | "userSettings.soundSettings.noFootsteps"
                | "planetsLiberated.blacktooth"
                | "planetsLiberated.bookworld"
                | "planetsLiberated.egyptus"
                | "planetsLiberated.penitentiary"
                | "planetsLiberated.safari"
                | "scrollsRead.blacktooth"
                | "scrollsRead.egyptus"
                | "scrollsRead.penitentiary"
                | "scrollsRead.safari"
                | "scrollsRead.doughnuts"
                | "scrollsRead.bag"
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
                | "scrollsRead.installGuide";
            }
          | {
              initialSetting: "right" | "left";
              /**
               * this switch targets items in the room
               */
              type: "in-room";
              modifies: (
                | {
                    expectType: "movingPlatform" | "monster";
                    targets: string[];
                    leftState: {
                      activated?: false;
                    };
                    rightState: {
                      activated?: true;
                      everActivated?: true;
                    };
                  }
                | {
                    expectType: "movingPlatform" | "monster";
                    targets: string[];
                    leftState: {
                      activated?: true;
                      everActivated?: true;
                    };
                    rightState: {
                      activated?: false;
                    };
                  }
                | {
                    expectType: "block";
                    targets: string[];
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
                    expectType: "switch";
                    targets: string[];
                    leftState: {
                      setting?: "left";
                    };
                    rightState: {
                      setting?: "right";
                    };
                  }
              )[];
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
        type: "ball";
        position: {
          x: number;
          y: number;
          z: number;
        };
        config: Record<string, never>;
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
              floorType: "deadly";
              times: {
                x: number;
                y: number;
              };
            }
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
    subRooms?: Record<string, any>;
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
