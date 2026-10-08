/*
 * builds every behaviour and registers them. Imported, for its side effect, only
 * by the entry points that start the game or editor (and the test setup), so no
 * game code depends on it and the behaviours' own imports can't loop back here
 */

import { type ItemInPlayType } from "../../model/ItemInPlay";
import { type MonsterWhich } from "../../model/json/MonsterJsonConfig";
import { emptyObject } from "../../utils/empty";
import { entries } from "../../utils/entries";
import {
  shadowFullBlock,
  shadowSmallRound,
} from "../render/shadows/shadowCastTextures";
import {
  floatingTextFixedZIndex,
  nonRenderingItemFixedZIndex,
} from "../render/sortZ/fixedZIndexes";
import {
  type ItemTypeAndConfigArgs,
  registerItemBehaviourCache,
} from "./attachBehaviourToItem";
import { BarrierBehaviour } from "./BarrierBehaviour";
import { BlockBehaviour } from "./BlockBehaviour";
import { BlockerBehaviour } from "./BlockerBehaviour";
import { ConveyorBehaviour } from "./ConveyorBehaviour";
import { DeadlyBlockBehaviour } from "./DeadlyBlockBehaviour";
import { DoorFrameBehaviour } from "./DoorFrameBehaviour";
import { DoorLegsBehaviour } from "./DoorLegsBehaviour";
import { EmitterBehaviour } from "./emitter/EmitterBehaviour";
import { FiredDoughnutBehaviour } from "./FiredDoughnutBehaviour";
import { FloorBehaviour } from "./FloorBehaviour";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";
import { ItemBehaviour, type ItemBehaviourOptions } from "./ItemBehaviour";
import { JoystickBehaviour } from "./JoystickBehaviour";
import { LampBehaviour } from "./LampBehaviour";
import { LiftBehaviour } from "./LiftBehaviour";
import { LightBeamBehaviour } from "./LightBeamBehaviour";
import {
  type Activation,
  activationMixinFor,
} from "./locomotion/activationMixinFor";
import {
  type Locomotion,
  locomotionMixins,
} from "./locomotion/locomotionMixins";
import { MirrorBehaviour } from "./MirrorBehaviour";
import { ButtonBehaviour } from "./modifiers/ButtonBehaviour";
import { SwitchBehaviour } from "./modifiers/SwitchBehaviour";
import { TimerBehaviour } from "./modifiers/TimerBehaviour";
import { CybermanBehaviour } from "./monsters/CybermanBehaviour";
import { MonsterBehaviour } from "./monsters/MonsterBehaviour";
import { MovingPlatformBehaviour } from "./MovingPlatformBehaviour";
import { NonSolidBehaviour } from "./NonSolidBehaviour";
import { OutOfBoundsBehaviour } from "./OutOfBoundsBehaviour";
import { BagPickupBehaviour } from "./pickups/BagPickupBehaviour";
import { BigJumpsPickupBehaviour } from "./pickups/BigJumpsPickupBehaviour";
import { CrownPickupBehaviour } from "./pickups/CrownPickupBehaviour";
import { DoughnutsPickupBehaviour } from "./pickups/DoughnutsPickupBehaviour";
import { ExtraLifePickupBehaviour } from "./pickups/ExtraLifePickupBehaviour";
import { FastStepsPickupBehaviour } from "./pickups/FastStepsPickupBehaviour";
import { HooterPickupBehaviour } from "./pickups/HooterPickupBehaviour";
import {
  type PickupBehaviour,
  type PickupGives,
} from "./pickups/PickupBehaviour";
import { ReincarnationPickupBehaviour } from "./pickups/ReincarnationPickupBehaviour";
import { ScrollPickupBehaviour } from "./pickups/ScrollPickupBehaviour";
import { ShieldPickupBehaviour } from "./pickups/ShieldPickupBehaviour";
import { PlayableBehaviour } from "./playable/PlayableBehaviour";
import { PortableBlockBehaviour } from "./PortableBlockBehaviour";
import { PortableTeleporterBehaviour } from "./PortableTeleporterBehaviour";
import { PortalBehaviour } from "./PortalBehaviour";
import { PushableBlockBehaviour } from "./PushableBlockBehaviour";
import { SlidingBlockBehaviour } from "./SlidingBlockBehaviour";
import { SlidingItemBehaviour } from "./SlidingItemBehaviour";
import { SpikesBehaviour } from "./SpikesBehaviour";
import { SpringBehaviour } from "./SpringBehaviour";
import { TeleporterBehaviour } from "./TeleporterBehaviour";
import { WallBehaviour } from "./WallBehaviour";

/**
 * item types whose behaviour depends on their config, not just their type
 */
type MultiBehaviourItemType = "monster" | "movingPlatform" | "pickup";

/**
 * identifies one behaviour: an item type, plus whatever config chooses between its behaviours
 */
type ItemBehaviourCacheKey =
  | `monster/${MonsterWhich}/${Locomotion}/${Activation}`
  | `movingPlatform/${Locomotion}/${Activation}`
  | `pickup/${PickupGives}`
  | Exclude<ItemInPlayType, MultiBehaviourItemType>;

// behaviours are stateless, so types that behave the same share an instance:
const playableBehaviour = new PlayableBehaviour();

const monsterCastingShadowWhileStoodOnOptions = {
  castsShadowWhileStoodOn: true,
};

// monsters small enough for Heels to carry:
const portableMonsterOptions = { isPortable: true };

// the class and options each monster's behaviour is made from, by which monster it is:
const monsterBehaviourRecipes: {
  [W in MonsterWhich]: [typeof MonsterBehaviour, ItemBehaviourOptions];
} = {
  bubbleRobot: [MonsterBehaviour, emptyObject],
  computerBot: [MonsterBehaviour, emptyObject],
  cyberman: [CybermanBehaviour, emptyObject],
  dalek: [MonsterBehaviour, portableMonsterOptions],
  elephant: [MonsterBehaviour, emptyObject],
  elephantHead: [MonsterBehaviour, portableMonsterOptions],
  emperor: [MonsterBehaviour, monsterCastingShadowWhileStoodOnOptions],
  emperorsGuardian: [MonsterBehaviour, monsterCastingShadowWhileStoodOnOptions],
  helicopterBug: [
    MonsterBehaviour,
    { ...monsterCastingShadowWhileStoodOnOptions, ...portableMonsterOptions },
  ],
  homingBot: [MonsterBehaviour, portableMonsterOptions],
  monkey: [MonsterBehaviour, emptyObject],
  skiHead: [MonsterBehaviour, emptyObject],
  turtle: [
    MonsterBehaviour,
    { ...monsterCastingShadowWhileStoodOnOptions, ...portableMonsterOptions },
  ],
};

// the behaviour (Type Object) of every pickup, by what it gives:
const pickupBehaviours: { [G in PickupGives]: PickupBehaviour } = {
  bag: new BagPickupBehaviour(),
  crown: new CrownPickupBehaviour(),
  doughnuts: new DoughnutsPickupBehaviour(),
  "extra-life": new ExtraLifePickupBehaviour(),
  fast: new FastStepsPickupBehaviour(),
  hooter: new HooterPickupBehaviour(),
  jumps: new BigJumpsPickupBehaviour(),
  reincarnation: new ReincarnationPickupBehaviour(),
  scroll: new ScrollPickupBehaviour(),
  shield: new ShieldPickupBehaviour(),
};

// every behaviour (Type Object), shared by all items it serves. Monsters' and
// moving platforms' are made on first use, the rest are here from the start:
const behaviours = new Map<ItemBehaviourCacheKey, ItemBehaviour>(
  // the behaviour of every type of item that has only one:
  entries({
    head: playableBehaviour,
    heels: playableBehaviour,
    headOverHeels: playableBehaviour,
    ball: new SlidingItemBehaviour({
      shadowCastTexture: shadowSmallRound,
      castsShadowWhileStoodOn: true,
    }),
    barrier: new BarrierBehaviour(),
    block: new BlockBehaviour(),
    blocker: new BlockerBehaviour(),
    bubbles: new NonSolidBehaviour({}),
    button: new ButtonBehaviour(),
    charles: new FreeItemBehaviour({
      shadowCastTexture: shadowSmallRound,
    }),
    conveyor: new ConveyorBehaviour(),
    deadlyBlock: new DeadlyBlockBehaviour(),
    doorFrame: new DoorFrameBehaviour(),
    doorLegs: new DoorLegsBehaviour(),
    emitter: new EmitterBehaviour(),
    firedDoughnut: new FiredDoughnutBehaviour(),
    floatingText: new NonSolidBehaviour({
      fixedZIndex: floatingTextFixedZIndex,
      // floating text is centred, not anchored at its camera-nearest corner:
      isExemptFromNearCornerOffset: true,
    }),
    floor: new FloorBehaviour(),
    hushPuppy: new ItemBehaviour({
      shadowCastTexture: shadowFullBlock,
      isCuboidWarped: true,
    }),
    joystick: new JoystickBehaviour(),
    lamp: new LampBehaviour(),
    lift: new LiftBehaviour(),
    lightBeam: new LightBeamBehaviour(),
    mirror: new MirrorBehaviour(),
    // the dead fish:
    moveableDeadly: new FreeItemBehaviour({
      isDeadly: true,
    }),
    outOfBounds: new OutOfBoundsBehaviour(),
    particle: new NonSolidBehaviour({}),
    portableBlock: new PortableBlockBehaviour({ isPortable: true }),
    portableTeleporter: new PortableTeleporterBehaviour(),
    portal: new PortalBehaviour(),
    pushableBlock: new PushableBlockBehaviour(),
    // the crowns in the final room:
    sceneryCrown: new FreeItemBehaviour({ isPortable: true }),
    // the (non-playable) characters in the final room:
    sceneryPlayer: new FreeItemBehaviour({
      castsShadowWhileStoodOn: true,
      isPortable: true,
    }),
    slidingBlock: new SlidingBlockBehaviour(),
    // spiky balls:
    slidingDeadly: new SlidingItemBehaviour({
      isDeadly: true,
      shadowCastTexture: shadowSmallRound,
      castsShadowWhileStoodOn: true,
    }),
    // a sound that plays from a point in a room:
    soundEffect: new NonSolidBehaviour({
      fixedZIndex: nonRenderingItemFixedZIndex,
    }),
    spikes: new SpikesBehaviour(),
    spring: new SpringBehaviour(),
    stopAutowalk: new NonSolidBehaviour({
      fixedZIndex: nonRenderingItemFixedZIndex,
    }),
    switch: new SwitchBehaviour(),
    teleporter: new TeleporterBehaviour(),
    timer: new TimerBehaviour(),
    wall: new WallBehaviour(),
  } satisfies {
    [T in Exclude<ItemInPlayType, MultiBehaviourItemType>]: ItemBehaviour;
  }),
);
for (const [gives, pickupBehaviour] of entries(pickupBehaviours)) {
  behaviours.set(`pickup/${gives}`, pickupBehaviour);
}

/**
 * get or make the correct ItemBehaviour for a given item
 */
const itemBehaviourCache = (
  ...[type, config]: ItemTypeAndConfigArgs
): ItemBehaviour => {
  if (type === "monster") {
    const { which, movement, activated } = config;
    return behaviours.getOrInsertComputed(
      `monster/${which}/${movement}/${activated}`,
      () => {
        const [MonsterClass, options] = monsterBehaviourRecipes[which];
        return new (activationMixinFor(activated)(
          locomotionMixins[movement](MonsterClass),
        ))(options);
      },
    );
  }
  if (type === "movingPlatform") {
    const { movement, activated } = config;
    return behaviours.getOrInsertComputed(
      `movingPlatform/${movement}/${activated}`,
      () =>
        new (activationMixinFor(activated)(
          locomotionMixins[movement](MovingPlatformBehaviour),
        ))(),
    );
  }

  const maybeBehaviour = behaviours.get(
    type === "pickup" ? `pickup/${config.gives}` : type,
  );
  if (import.meta.env.DEV && maybeBehaviour === undefined) {
    throw new Error(`no behaviour for an item of type ${type}`);
  }
  return maybeBehaviour!;
};

registerItemBehaviourCache(itemBehaviourCache);
