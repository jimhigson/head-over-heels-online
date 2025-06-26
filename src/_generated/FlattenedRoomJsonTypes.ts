// Auto-generated flattened types for JSON schema generation
// Generated from AnyRoomJson and its dependencies

type FlattenedJsonItemUnion =
  | FlattenedJsonItemUnionUnion0
  | FlattenedJsonItemUnionUnion1
  | FlattenedJsonItemUnionUnion2
  | FlattenedJsonItemUnionUnion3
  | FlattenedJsonItemUnionUnion4
  | FlattenedJsonItemUnionUnion5
  | FlattenedJsonItemUnionUnion6
  | FlattenedJsonItemUnionUnion7
  | FlattenedJsonItemUnionUnion8
  | FlattenedJsonItemUnionUnion9
  | FlattenedJsonItemUnionUnion10
  | FlattenedJsonItemUnionUnion11
  | FlattenedJsonItemUnionUnion12
  | FlattenedJsonItemUnionUnion13
  | FlattenedJsonItemUnionUnion14
  | FlattenedJsonItemUnionUnion15
  | FlattenedJsonItemUnionUnion16
  | FlattenedJsonItemUnionUnion17
  | FlattenedJsonItemUnionUnion18
  | FlattenedJsonItemUnionUnion19
  | FlattenedJsonItemUnionUnion20
  | FlattenedJsonItemUnionUnion21
  | FlattenedJsonItemUnionUnion22
  | FlattenedJsonItemUnionUnion23
  | FlattenedJsonItemUnionUnion24
  | FlattenedJsonItemUnionUnion25
  | FlattenedJsonItemUnionUnion26
  | FlattenedJsonItemUnionUnion27
  | FlattenedJsonItemUnionUnion28
  | FlattenedJsonItemUnionUnion29
  | FlattenedJsonItemUnionUnion30
  | FlattenedJsonItemUnionUnion31
  | FlattenedJsonItemUnionUnion32;

type FlattenedAnyRoomJsonMeta = {
  /**
   * subRooms are used for the map for rooms which were modelled as multiple rooms
   * in the original game
   */
  subRooms?: FlattenedAnyRoomJsonMetaSubRooms;

  /**
   * for rooms that are shown on the same map even though they don't
   * have any physical connection
   */
  nonContiguousRelationship?: FlattenedAnyRoomJsonMetaNonContiguousRelationship;

  label?: FlattenedAnyRoomJsonMetaLabel;
};

type FlattenedAnyRoomJsonMetaLabel = {
  gridOffset: FlattenedAnyRoomJsonMetaLabelGridOffset;

  text: string;

  align: "left" | "right";
};

type FlattenedAnyRoomJsonMetaLabelGridOffset = {
  x: number;

  y: number;
};

type FlattenedAnyRoomJsonMetaNonContiguousRelationship = {
  with: FlattenedAnyRoomJsonMetaNonContiguousRelationshipWith;

  /**
   * the other room needs to have the opposite (* -1) of this
   */
  gridOffset: FlattenedAnyRoomJsonMetaNonContiguousRelationshipGridOffset;
};

type FlattenedAnyRoomJsonMetaNonContiguousRelationshipGridOffset = {
  x: number;

  y: number;

  z: number;
};

type FlattenedAnyRoomJsonMetaNonContiguousRelationshipWith = {
  room: string;
};

type FlattenedAnyRoomJsonMetaSubRooms = Record<string, any>;

type FlattenedAnyRoomJsonItems = Record<string, FlattenedJsonItemUnion>;

type FlattenedAnyRoomJsonColor = {
  hue: "yellow" | "cyan" | "green" | "magenta" | "white";

  shade: "basic" | "dimmed";
};

type FlattenedAnyRoomJsonCeilingRelativePoint = {
  x: number;

  y: number;
};

type FlattenedAnyRoomJsonSize = {
  x: number;

  y: number;

  z?: number;
};

type FlattenedJsonItemUnionUnion32 = {
  type: "wall";

  config: {
    direction: "left" | "right" | "towards" | "away";
    tiles?: string[];
  };

  position: FlattenedJsonItemUnionUnion32Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion32Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion31 = {
  type: "ball";

  config: FlattenedJsonItemUnionUnion31Config;

  position: FlattenedJsonItemUnionUnion31Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion31Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion31Config = Record<string, any>;

type FlattenedJsonItemUnionUnion30 = {
  type: "hushPuppy";

  config: Record<string, any>;

  position: FlattenedJsonItemUnionUnion30Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion30Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion29 = {
  type: "switch";

  config: {
    type: "in-room" | "global";
    modifies: string[];
    initialSetting: "left" | "right";
  };

  position: FlattenedJsonItemUnionUnion29Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion29Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion28 = {
  type: "charles";

  config: FlattenedJsonItemUnionUnion28Config;

  position: FlattenedJsonItemUnionUnion28Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion28Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion28Config = Record<string, any>;

type FlattenedJsonItemUnionUnion27 = {
  type: "joystick";

  config: {
    controls: string[];
  };

  position: FlattenedJsonItemUnionUnion27Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion27Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion26 = {
  type: "lift";

  config: {
    top: number;
    bottom: number;
  };

  position: FlattenedJsonItemUnionUnion26Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion26Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion25 = {
  type: "monster";

  config:
    | FlattenedJsonItemUnionUnion25ConfigUnion0
    | FlattenedJsonItemUnionUnion25ConfigUnion1
    | FlattenedJsonItemUnionUnion25ConfigUnion2
    | FlattenedJsonItemUnionUnion25ConfigUnion3
    | FlattenedJsonItemUnionUnion25ConfigUnion4
    | FlattenedJsonItemUnionUnion25ConfigUnion5
    | FlattenedJsonItemUnionUnion25ConfigUnion6
    | FlattenedJsonItemUnionUnion25ConfigUnion7
    | FlattenedJsonItemUnionUnion25ConfigUnion8
    | FlattenedJsonItemUnionUnion25ConfigUnion9
    | FlattenedJsonItemUnionUnion25ConfigUnion10
    | FlattenedJsonItemUnionUnion25ConfigUnion11
    | FlattenedJsonItemUnionUnion25ConfigUnion12
    | FlattenedJsonItemUnionUnion25ConfigUnion13;

  position: FlattenedJsonItemUnionUnion25Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion25Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion25ConfigUnion13 = {
  which: "skiHead";

  activated: "on";

  movement: "clockwise" | "back-forth";

  startDirection: "away" | "towards" | "left" | "right";

  style: "greenAndPink" | "starsAndStripes";
};

type FlattenedJsonItemUnionUnion25ConfigUnion12 = {
  which: "cyberman";

  activated: "on" | "off" | "after-player-near";

  movement: "towards-on-shortest-axis-xy4";

  startDirection: "away" | "towards" | "left" | "right";
};

type FlattenedJsonItemUnionUnion25ConfigUnion11 = {
  which: "turtle";

  movement: "clockwise";

  startDirection: "away" | "towards" | "left" | "right";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion10 = {
  which: "helicopterBug";

  movement: "towards-analogue";

  activated: "while-player-near";
};

type FlattenedJsonItemUnionUnion25ConfigUnion9 = {
  which: "helicopterBug";

  movement: "patrol-randomly-xy8";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion8 = {
  which: "homingBot";

  movement: "towards-tripped-on-axis-xy4";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion7 = {
  which: "dalek";

  movement: "patrol-randomly-diagonal";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion6 = {
  which: "bubbleRobot";

  movement: "patrol-randomly-xy8";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion5 = {
  which: "computerBot";

  movement: "towards-on-shortest-axis-xy4" | "patrol-randomly-xy4-and-reverse";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion4 = {
  which: "monkey";

  movement: "patrol-randomly-xy4" | "towards-on-shortest-axis-xy4";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion3 = {
  which: "elephantHead";

  movement: "turn-to-player";

  startDirection: "away" | "towards" | "left" | "right";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion2 = {
  which: "elephant";

  movement: "patrol-randomly-xy4";

  activated: "on";
};

type FlattenedJsonItemUnionUnion25ConfigUnion1 = {
  which: "emperor";

  movement: "towards-analogue";

  activated: "while-player-near";
};

type FlattenedJsonItemUnionUnion25ConfigUnion0 = {
  which: "emperorsGuardian";

  movement: "towards-analogue-unless-planet-crowns";

  activated: "while-player-near";
};

type FlattenedJsonItemUnionUnion24 = {
  type: "player";

  config: {
    which: "head" | "heels" | "headOverHeels";
  };

  position: FlattenedJsonItemUnionUnion24Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion24Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion23 = {
  type: "slidingBlock";

  config: FlattenedJsonItemUnionUnion23Config;

  position: FlattenedJsonItemUnionUnion23Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion23Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion23Config = {
  style: "book" | "puck";
};

type FlattenedJsonItemUnionUnion22 = {
  type: "slidingDeadly";

  config: FlattenedJsonItemUnionUnion22Config;

  position: FlattenedJsonItemUnionUnion22Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion22Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion22Config = {
  style: "spikyBall";

  startingPhase: 1 | 2;
};

type FlattenedJsonItemUnionUnion21 = {
  type: "firedDoughnut";

  config: FlattenedJsonItemUnionUnion21Config;

  position: FlattenedJsonItemUnionUnion21Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion21Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion21Config = {
  direction?:
    | "away"
    | "towards"
    | "left"
    | "right"
    | "awayRight"
    | "towardsRight"
    | "towardsLeft"
    | "awayLeft";
};

type FlattenedJsonItemUnionUnion20 = {
  type: "emitter";

  config: {
    emits: {
      type: string;
      config: any;
    };
    period: number;
    maximum: number | null;
  };

  position: FlattenedJsonItemUnionUnion20Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion20Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion19 = {
  type: "sceneryCrown";

  config: FlattenedJsonItemUnionUnion19Config;

  position: FlattenedJsonItemUnionUnion19Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion19Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion19Config = {
  planet: "blacktooth" | "bookworld" | "egyptus" | "penitentiary" | "safari";
};

type FlattenedJsonItemUnionUnion18 = {
  type: "sceneryPlayer";

  config: FlattenedJsonItemUnionUnion18Config;

  position: FlattenedJsonItemUnionUnion18Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion18Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion18Config = {
  which: "head" | "heels" | "headOverHeels";

  startDirection:
    | "away"
    | "towards"
    | "left"
    | "right"
    | "awayRight"
    | "towardsRight"
    | "towardsLeft"
    | "awayLeft";
};

type FlattenedJsonItemUnionUnion17 = {
  type: "spring";

  config: FlattenedJsonItemUnionUnion17Config;

  position: FlattenedJsonItemUnionUnion17Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion17Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion17Config = Record<string, any>;

type FlattenedJsonItemUnionUnion16 = {
  type: "pickup";

  config:
    | FlattenedJsonItemUnionUnion16ConfigUnion0
    | FlattenedJsonItemUnionUnion16ConfigUnion1
    | FlattenedJsonItemUnionUnion16ConfigUnion2;

  position: FlattenedJsonItemUnionUnion16Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion16Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion16ConfigUnion2 = {
  gives: "crown";

  planet: "blacktooth" | "bookworld" | "egyptus" | "penitentiary" | "safari";
};

type FlattenedJsonItemUnionUnion16ConfigUnion1 = {
  gives: "scroll";

  page:
    | "blacktooth"
    | "egyptus"
    | "penitentiary"
    | "safari"
    | "doughnuts"
    | "bag"
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
    | "installGuide";
};

type FlattenedJsonItemUnionUnion16ConfigUnion0 = {
  gives:
    | "shield"
    | "extra-life"
    | "fast"
    | "jumps"
    | "doughnuts"
    | "bag"
    | "hooter"
    | "reincarnation";
};

type FlattenedJsonItemUnionUnion15 = {
  type: "conveyor";

  config: {
    direction: "left" | "right" | "towards" | "away";
    disappearing?: { on: "stand" };
  };

  position: FlattenedJsonItemUnionUnion15Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion15Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion14 = {
  type: "moveableDeadly";

  config: FlattenedJsonItemUnionUnion14Config;

  position: FlattenedJsonItemUnionUnion14Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion14Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion14Config = {
  style: "deadFish";
};

type FlattenedJsonItemUnionUnion13 = {
  type: "movingPlatform";

  config: FlattenedJsonItemUnionUnion13Config;

  position: FlattenedJsonItemUnionUnion13Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion13Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion13Config = {
  movement: "clockwise" | "back-forth";

  activated: "on" | "off" | "on-stand";

  startDirection: "away" | "towards" | "left" | "right";
};

type FlattenedJsonItemUnionUnion12 = {
  type: "pushableBlock";

  config: FlattenedJsonItemUnionUnion12Config;

  position: FlattenedJsonItemUnionUnion12Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion12Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion12Config = Record<string, any>;

type FlattenedJsonItemUnionUnion11 = {
  type: "portableBlock";

  config: FlattenedJsonItemUnionUnion11Config;

  position: FlattenedJsonItemUnionUnion11Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion11Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion11Config = {
  style: "drum" | "sticks" | "cube";
};

type FlattenedJsonItemUnionUnion10 = {
  type: "spikes";

  config: Record<string, any>;

  position: FlattenedJsonItemUnionUnion10Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion10Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion9 = {
  type: "deadlyBlock";

  config: {
    style: "toaster" | "volcano";
  };

  position: FlattenedJsonItemUnionUnion9Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion9Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion8 = {
  type: "block";

  config: {
    style: "artificial" | "organic" | "book" | "tower";
    disappearing?: { on: "stand" };
  };

  position: FlattenedJsonItemUnionUnion8Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion8Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion7 = {
  type: "barrier";

  config: {
    axis: "x" | "y";
    disappearing?: { on: "touch" };
  };

  position: FlattenedJsonItemUnionUnion7Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion7Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion6 = {
  type: "teleporter";

  config: {
    times?: {
      x?: number;

      y?: number;

      z?: number;
    };
    toRoom: string;

    toPosition: FlattenedJsonItemUnionUnion6ConfigMemberToPosition;

    activatedOnStoreValue?:
      | "userSettings"
      | "planetsLiberated"
      | "currentGame"
      | "reincarnationPoint"
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
      | "currentGame.gameState"
      | "currentGame.gameState.entryState"
      | "currentGame.gameState.entryState.head"
      | "currentGame.gameState.entryState.heels"
      | "currentGame.gameState.entryState.headOverHeels"
      | "currentGame.gameState.entryState.head.autoWalk"
      | "currentGame.gameState.entryState.heels.autoWalk"
      | "currentGame.gameState.entryState.headOverHeels.autoWalk"
      | "reincarnationPoint.gameState"
      | "reincarnationPoint.gameState.entryState"
      | "reincarnationPoint.gameState.entryState.head"
      | "reincarnationPoint.gameState.entryState.heels"
      | "reincarnationPoint.gameState.entryState.headOverHeels"
      | "reincarnationPoint.gameState.entryState.head.autoWalk"
      | "reincarnationPoint.gameState.entryState.heels.autoWalk"
      | "reincarnationPoint.gameState.entryState.headOverHeels.autoWalk"
      | "scrollsRead.blacktooth"
      | "scrollsRead.egyptus"
      | "scrollsRead.penitentiary"
      | "scrollsRead.safari"
      | "scrollsRead.doughnuts"
      | "scrollsRead.bag"
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
      | "scrollsRead.installGuide";
  };

  position: FlattenedJsonItemUnionUnion6Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion6Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion6ConfigMemberToPosition = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion6ConfigMember = {
  times?: FlattenedJsonItemUnionUnion6ConfigMemberTimes;
};

type FlattenedJsonItemUnionUnion6ConfigMemberTimes = {
  x?: number;

  y?: number;

  z?: number;
};

type FlattenedJsonItemUnionUnion5 = {
  type: "portal";

  config: FlattenedJsonItemUnionUnion5Config;

  position: FlattenedJsonItemUnionUnion5Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion5Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion5Config = {
  toRoom: string;

  relativePoint: FlattenedJsonItemUnionUnion5ConfigRelativePoint;
};

type FlattenedJsonItemUnionUnion5ConfigRelativePoint = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion4 = {
  type: "doorLegs";

  config: FlattenedJsonItemUnionUnion4Config;

  position: FlattenedJsonItemUnionUnion4Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion4Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion4Config = {
  direction: "away" | "towards" | "left" | "right";

  inHiddenWall: boolean;

  height: number;
};

type FlattenedJsonItemUnionUnion3 = {
  type: "doorFrame";

  config: FlattenedJsonItemUnionUnion3Config;

  position: FlattenedJsonItemUnionUnion3Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion3Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion3Config = {
  direction: "away" | "towards" | "left" | "right";

  inHiddenWall: boolean;

  toRoom: string;

  /**
   * is this the near post of the doorframe, or the far one?
   */
  part: "near" | "far" | "top";
};

type FlattenedJsonItemUnionUnion2 = {
  type: "floor";

  config:
    | {
        skipRightEdge?: boolean;

        skipTowardsEdge?: boolean;
        floorType: "deadly";

        times: FlattenedJsonItemUnionUnion2ConfigUnion0MemberTimes;
      }
    | {
        skipRightEdge?: boolean;

        skipTowardsEdge?: boolean;
        /**
         * the room has no floor, but it is included to draw the floor edge
         */
        floorType: "none";

        times: FlattenedJsonItemUnionUnion2ConfigUnion1MemberTimes;
      }
    | {
        skipRightEdge?: boolean;

        skipTowardsEdge?: boolean;
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

        times: FlattenedJsonItemUnionUnion2ConfigUnion2MemberTimes;
      };

  position: FlattenedJsonItemUnionUnion2Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion2Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion2ConfigUnion2MemberTimes = {
  x: number;

  y: number;
};

type FlattenedJsonItemUnionUnion2ConfigUnion2Member = {
  skipRightEdge?: boolean;

  skipTowardsEdge?: boolean;
};

type FlattenedJsonItemUnionUnion2ConfigUnion1MemberTimes = {
  x: number;

  y: number;
};

type FlattenedJsonItemUnionUnion2ConfigUnion1Member = {
  skipRightEdge?: boolean;

  skipTowardsEdge?: boolean;
};

type FlattenedJsonItemUnionUnion2ConfigUnion0MemberTimes = {
  x: number;

  y: number;
};

type FlattenedJsonItemUnionUnion2ConfigUnion0Member = {
  skipRightEdge?: boolean;

  skipTowardsEdge?: boolean;
};

type FlattenedJsonItemUnionUnion1 = {
  type: "bubbles";

  config: FlattenedJsonItemUnionUnion1Config;

  position: FlattenedJsonItemUnionUnion1Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion1Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion1Config = {
  style: "white";

  /**
   * it is the bubbles that play the sound when something is fading
   * out, not the item itself. This property helps us know which sound
   * to play
   */
  was:
    | FlattenedJsonItemUnionUnion1ConfigWasUnion0
    | FlattenedJsonItemUnionUnion1ConfigWasUnion1
    | FlattenedJsonItemUnionUnion1ConfigWasUnion2;
};

type FlattenedJsonItemUnionUnion1ConfigWasUnion2 = {
  type: "disappearing";
};

type FlattenedJsonItemUnionUnion1ConfigWasUnion1 = {
  type: "hushPuppy";
};

type FlattenedJsonItemUnionUnion1ConfigWasUnion0 = {
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
};

type FlattenedJsonItemUnionUnion0 = {
  type: "door";

  config: FlattenedJsonItemUnionUnion0Config;

  position: FlattenedJsonItemUnionUnion0Position;

  /**
   * if true, on an original campaign room, the item is an item that has been added for the remake
   */
  isExtra?: undefined;
};

type FlattenedJsonItemUnionUnion0Position = {
  x: number;

  y: number;

  z: number;
};

type FlattenedJsonItemUnionUnion0Config = {
  toRoom: string;

  direction: "away" | "towards" | "left" | "right";

  meta?: FlattenedJsonItemUnionUnion0ConfigMeta;
};

type FlattenedJsonItemUnionUnion0ConfigMeta = {
  toSubRoom?: string;
};

export type RoomJsonSchema = {
  id: string;

  size: FlattenedAnyRoomJsonSize;

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
  ceilingRelativePoint?: FlattenedAnyRoomJsonCeilingRelativePoint;

  roomBelow?: string;

  subRoomBelow?: string;

  color: FlattenedAnyRoomJsonColor;

  /**
   * by keying each item with an id, it makes the diffing easier since the array is no longer
   * position-dependent
   */
  items: FlattenedAnyRoomJsonItems;

  meta?: FlattenedAnyRoomJsonMeta;
};
