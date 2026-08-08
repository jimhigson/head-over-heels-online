import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { defaultItemProperties } from "../../model/defaultItemProperties";
import { type ItemInPlay, type ItemInPlayConfig } from "../../model/ItemInPlay";
import { itemInPlayCentre } from "../../model/itemInPlayCentre";
import { playablesInRoom, type RoomState } from "../../model/RoomState";
import { epsilon } from "../../utils/epsilon";
import {
  hashNumberToNumber0to1,
  hashXyzToNumber0to1,
} from "../../utils/maths/hashing";
import {
  addXyz,
  axesXyz,
  boxWithSize,
  lengthXyz,
  originXyz,
  type Xyz,
} from "../../utils/vectors/vectors";
import { fastStepsRemaining } from "../gameState/gameStateSelectors/selectPickupAbilities";
import { defaultBaseState } from "../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../physics/itemPredicates";
import { blockSizePx } from "../physics/mechanicsConstants";

const particleLifetimeMs = 300;
// originalGameFrameDuration *
// spritesheetData.animations["particle.head.fade"].length *
// (1 / spritesheetData.animations["particle.head.fade"].animationSpeed);

const headParticlesFrequencyPerS = 20;
const heelsParticlesFrequencyPerS = 38;
const crownParticlesFrequencyPerS = 0.5;
const particlesSpread = blockSizePx.x / 2;

let particlesAdded = 0;

const particleByChance = (
  itemHash: number,
  roomTime: number,
  particlesFrequencyPerS: number,
  deltaMS: number,
) =>
  hashNumberToNumber0to1(itemHash + roomTime) <
  particlesFrequencyPerS * (deltaMS / 1_000);

const createParticleItemInPlay = (
  forItemId: string,
  forCharacter: ItemInPlayConfig<"particle">["forCharacter"],
  position: Xyz,
  roomTime: number,
): ItemInPlay<"particle"> => {
  // fold roomTime in so particles spawned at the same spot at different
  // times don't start their fade animation in sync:
  const hash = hashXyzToNumber0to1(position, roomTime);
  return {
    ...defaultItemProperties,
    hash,
    id: `particle.${forItemId}.${particlesAdded++}`,
    type: "particle",
    config: {
      forCharacter,
    },
    state: {
      ...defaultBaseState(),
      // re-hash the hash for the lifetime so it doesn't correlate with the
      // fade animation phase the hash itself drives:
      expires:
        roomTime +
        particleLifetimeMs +
        hashNumberToNumber0to1(hash) * particleLifetimeMs,
      box: boxWithSize(position, originXyz),
    },
  };
};

const addParticlesUnderPlayableItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<"head" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  particlesFrequencyPerS: number,
  deltaMS: number,
) => {
  if (
    !particleByChance(item.hash, room.roomTime, particlesFrequencyPerS, deltaMS)
  ) {
    return;
  }

  // re-hash the (always-small, since it passed its threshold) chance roll so
  // the spread doesn't correlate with it; chain again for an independent y:
  const xRoll = hashNumberToNumber0to1(
    hashNumberToNumber0to1(item.hash + room.roomTime),
  );
  const yRoll = hashNumberToNumber0to1(xRoll);
  const particlePosition = {
    ...addXyz(itemInPlayCentre(item), {
      x: xRoll * particlesSpread - particlesSpread / 2,
      y: yRoll * particlesSpread - particlesSpread / 2,
    }),
    z: item.state.box.z,
  };

  // we are moving, and we have fast steps - add particles
  addItemToRoom({
    room,
    item: createParticleItemInPlay(
      item.id,
      item.type,
      particlePosition,
      room.roomTime,
    ),
  });
};

const addParticlesForHead = <RoomId extends string, RoomItemId extends string>(
  head: PlayableItem<"head", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
) => {
  const hasFastSteps = fastStepsRemaining(head.state) > 0;

  if (!hasFastSteps) {
    return;
  }

  if (head.state.standingOnItemId === null) {
    return;
  }

  const walkingSpeed = lengthXyz(head.state.vels.walking);

  if (walkingSpeed < epsilon) {
    return;
  }

  addParticlesUnderPlayableItem(
    head,
    room,
    headParticlesFrequencyPerS,
    deltaMS,
  );
};

const addParticlesForHeels = <RoomId extends string, RoomItemId extends string>(
  heels: PlayableItem<"heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
) => {
  const { isBigJump } = heels.state;

  if (!isBigJump) {
    return;
  }

  if (heels.state.standingOnItemId !== null) {
    return;
  }

  if (heels.state.vels.gravity.z <= 0) {
    return;
  }

  addParticlesUnderPlayableItem(
    heels,
    room,
    heelsParticlesFrequencyPerS,
    deltaMS,
  );
};

export const addParticlesForPlayablesInRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  deltaMS: number,
) => {
  const { head, heels } = playablesInRoom(room.items);

  if (head !== undefined) {
    addParticlesForHead(head, room, deltaMS);
  }
  if (heels !== undefined) {
    addParticlesForHeels(heels, room, deltaMS);
  }
};

export const addParticlesAroundCrown = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  crown: ItemInPlay<"pickup", RoomId, RoomItemId> & {
    config: { gives: "crown" };
  },
  deltaMS: number,
) => {
  if (
    !particleByChance(
      crown.hash,
      room.roomTime,
      crownParticlesFrequencyPerS,
      deltaMS,
    )
  ) {
    return;
  }

  // re-hash the (always-small, since it passed its threshold) chance roll so
  // the face pick doesn't correlate with it; chain again for independent
  // positions on the chosen face:
  const faceRoll = hashNumberToNumber0to1(
    hashNumberToNumber0to1(crown.hash + room.roomTime),
  );
  const xRoll = hashNumberToNumber0to1(faceRoll);
  const yRoll = hashNumberToNumber0to1(xRoll);
  const zRoll = hashNumberToNumber0to1(yRoll);
  const face = axesXyz[Math.floor(faceRoll * axesXyz.length)];
  const particlePosition = addXyz(crown.state.box, {
    x: face === "x" ? 0 : xRoll * blockSizePx.x,
    y: face === "y" ? 0 : yRoll * blockSizePx.y,
    z: face === "z" ? blockSizePx.z : zRoll * blockSizePx.z,
  });

  addItemToRoom({
    room,
    item: createParticleItemInPlay(
      crown.id,
      "crown",
      particlePosition,
      room.roomTime,
    ),
  });
};
