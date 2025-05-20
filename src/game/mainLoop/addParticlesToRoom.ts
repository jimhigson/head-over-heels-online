import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ItemInPlay, ItemInPlayConfig } from "../../model/ItemInPlay";
import { itemInPlayCentre } from "../../model/itemInPlayCentre";
import { playablesInRoom, type RoomState } from "../../model/RoomState";
import { originalGameFrameDuration } from "../../originalGame";
import { blockSizePx } from "../../sprites/spritePivots";
import { spritesheetData } from "../../sprites/spriteSheetData";
import type { Xyz } from "../../utils/vectors/vectors";
import {
  addXyz,
  axesXyz,
  lengthXyz,
  originXyz,
} from "../../utils/vectors/vectors";
import { epsilon } from "../../utils/veryClose";
import { fastStepsRemaining } from "../gameState/gameStateSelectors/selectPickupAbilities";
import { defaultBaseState } from "../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../gameState/mutators/addItemToRoom";
import type { PlayableItem } from "../physics/itemPredicates";
import { randomFromArray } from "../../utils/random/randomFromArray";

const particleLifetimeMs =
  originalGameFrameDuration *
  spritesheetData.animations["particle.fade"].length *
  (1 / spritesheetData.animations["particle.fade"].animationSpeed);

const headParticlesFrequencyPerS = 20;
const heelsParticlesFrequencyPerS = 38;
const crownParticlesFrequencyPerS = 0.5;
const particlesSpread = blockSizePx.w / 2;

let particlesAdded = 0;

const particleByChance = (particlesFrequencyPerS: number, deltaMS: number) =>
  Math.random() < particlesFrequencyPerS * (deltaMS / 1000);

const createParticleItemInPlay = (
  forItemId: string,
  forCharacter: ItemInPlayConfig<"particle">["forCharacter"],
  position: Xyz,
  roomTime: number,
): ItemInPlay<"particle"> => ({
  id: `particle.${forItemId}.${particlesAdded++}`,
  type: "particle",
  aabb: originXyz,
  config: {
    forCharacter,
  },
  state: {
    ...defaultBaseState(),
    expires: roomTime + particleLifetimeMs + Math.random() * particleLifetimeMs,
    position,
  },
});

const addParticlesUnderPlayableItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<"head" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  particlesFrequencyPerS: number,
  deltaMS: number,
) => {
  if (!particleByChance(particlesFrequencyPerS, deltaMS)) {
    return;
  }

  const particlePosition = {
    ...addXyz(itemInPlayCentre(item), {
      x: Math.random() * particlesSpread - particlesSpread / 2,
      y: Math.random() * particlesSpread - particlesSpread / 2,
    }),
    z: item.state.position.z,
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
  if (!particleByChance(crownParticlesFrequencyPerS, deltaMS)) {
    return;
  }

  const face = randomFromArray(axesXyz);
  const particlePosition = addXyz(crown.state.position, {
    x: face === "x" ? 0 : Math.random() * blockSizePx.w,
    y: face === "y" ? 0 : Math.random() * blockSizePx.d,
    z: face === "z" ? blockSizePx.h : Math.random() * blockSizePx.h,
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
