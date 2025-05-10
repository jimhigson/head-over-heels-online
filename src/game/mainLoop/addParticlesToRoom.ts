import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { itemInPlayCentre } from "../../model/itemInPlayCentre";
import { playablesInRoom, type RoomState } from "../../model/RoomState";
import { originalGameFrameDuration } from "../../originalGame";
import { blockSizePx } from "../../sprites/spritePivots";
import { spritesheetData } from "../../sprites/spriteSheetData";
import { addXyz, lengthXyz, originXyz } from "../../utils/vectors/vectors";
import { epsilon } from "../../utils/veryClose";
import { fastStepsRemaining } from "../gameState/gameStateSelectors/selectPickupAbilities";
import { defaultBaseState } from "../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../gameState/mutators/addItemToRoom";
import type { PlayableItem } from "../physics/itemPredicates";

const particleLifetimeMs =
  originalGameFrameDuration *
  spritesheetData.animations["particle.fade"].length *
  (1 / spritesheetData.animations["particle.fade"].animationSpeed);

const headParticlesFrequencyPerS = 20;
const heelsParticlesFrequencyPerS = 38;
const particlesSpread = blockSizePx.w / 2;

let particlesAdded = 0;

const addParticleAroundItem = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<"head" | "heels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  particlesFrequencyPerS: number,
  deltaMS: number,
) => {
  const addParticleByChance =
    Math.random() < particlesFrequencyPerS * (deltaMS / 1000);

  if (!addParticleByChance) {
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
    item: {
      id: `particle.${item.id}.${particlesAdded++}`,
      type: "particle",
      aabb: originXyz,
      config: {
        forCharacter: item.type,
      },
      state: {
        ...defaultBaseState(),
        expires:
          room.roomTime +
          particleLifetimeMs +
          Math.random() * particleLifetimeMs,
        position: particlePosition,
      },
    },
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

  addParticleAroundItem(head, room, headParticlesFrequencyPerS, deltaMS);
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

  addParticleAroundItem(heels, room, heelsParticlesFrequencyPerS, deltaMS);
};

export const addParticlesToRoom = <
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
