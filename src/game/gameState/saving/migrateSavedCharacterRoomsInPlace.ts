import {
  type LegacyWallConfig,
  migrateWallConfigInPlace,
  migrateWallTilesInPlace,
} from "../../../model/inPlaceMutators/migrateWallTilesInPlace";
import { type ItemInPlayConfig } from "../../../model/ItemInPlay";
import { type Progression, roomItemsIterable } from "../../../model/RoomState";
import { valuesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  alongAxisOfDirectionXy,
  boxWithSize,
  type Direction8Xyz,
  doorAlongAxis,
  type Xyz,
  type XyzBox,
} from "../../../utils/vectors/vectors";
import { fineXyzToBlockXyz } from "../../render/projections";
import { type SavedCharacterRooms } from "./SavedGameState";

/**
 * a direction as an old save could hold it (a friendly name) or as the in-play
 * model now holds it (a unit vector) - old saves are normalised to vectors
 */
type MaybeNamedDirection = Direction8Xyz | Xyz;

const asDirectionVector = (direction: MaybeNamedDirection): Xyz =>
  typeof direction === "string" ? unitVectors[direction] : direction;

/** in-place: convert a config/state's direction-ish field from name to vector */
const vectoriseInPlace = <F extends string>(
  holder: Partial<Record<F, MaybeNamedDirection>>,
  field: F,
): void => {
  const value: MaybeNamedDirection | undefined = holder[field];
  if (typeof value === "string") {
    holder[field] = unitVectors[value];
  }
};

type LegacyFloorConfig = Omit<
  ItemInPlayConfig<"floor", string, string>,
  "doorExpandedSides"
> & {
  /**
   * saves from before floors carried this field omit it (derived on load);
   * saves from before directions were vectorised carry side names
   */
  doorExpandedSides?: Array<MaybeNamedDirection>;
};

/**
 * saves from before floors carried `doorExpandedSides` omit it, but the
 * physical door expansion is already baked into the saved floor's box, so the
 * expanded sides are recovered by comparing against the natural footprint:
 * expanding towards/right shifts the position while away/left only grows the
 * dimensions (mirroring how loadFloor expands)
 */
const migrateFloorConfigInPlace = (
  config: LegacyFloorConfig,
  /** the floor's (possibly door-expanded) baked box */
  box: Readonly<XyzBox>,
): void => {
  if (config.doorExpandedSides !== undefined) {
    // saves written when the sides were names normalise to vectors:
    config.doorExpandedSides = config.doorExpandedSides.map(asDirectionVector);
    return;
  }

  const { naturalFootprint } = config;
  const doorExpandedSides: Array<Xyz> = [];

  const shiftX = naturalFootprint.position.x - box.x;
  if (shiftX > 0) {
    doorExpandedSides.push(unitVectors.right);
  }
  if (box.xd - naturalFootprint.aabb.x > shiftX) {
    doorExpandedSides.push(unitVectors.left);
  }

  const shiftY = naturalFootprint.position.y - box.y;
  if (shiftY > 0) {
    doorExpandedSides.push(unitVectors.towards);
  }
  if (box.yd - naturalFootprint.aabb.y > shiftY) {
    doorExpandedSides.push(unitVectors.away);
  }

  config.doorExpandedSides = doorExpandedSides;
};

/**
 * what an item looked like in saves from before the position and aabb were
 * merged into the state box: the collision size on the item root, the
 * position alone in state
 */
type LegacyBoxCarrier = {
  aabb?: Xyz;
  state: { box?: XyzBox; position?: Xyz };
};

/**
 * saves from before `state.box` carried `state.position` + a root `aabb`;
 * merge them into the box and drop the legacy fields
 */
const migrateItemBoxInPlace = (item: LegacyBoxCarrier): void => {
  if (item.state.box === undefined) {
    const maybePosition = item.state.position;
    const maybeAabb = item.aabb;
    if (
      import.meta.env.DEV &&
      (maybePosition === undefined || maybeAabb === undefined)
    ) {
      throw new Error(
        "saved item has neither a state box nor a legacy position + aabb",
      );
    }
    item.state.box = boxWithSize(maybePosition!, maybeAabb!);
  }
  // unconditionally, so a save written by an intermediate version that carried
  // both shapes does not keep the legacy fields and write them back out:
  delete item.state.position;
  delete item.aabb;
};

/**
 * migrate the rooms embedded in a saved game to the current format. Saves
 * embed both the room json and the loaded (in-play) items exactly as the
 * version that wrote them loaded them, so a save from an old version can
 * carry formats the current code no longer loads - eg walls without tiles
 * (pre-v25), or direction names where the in-play model now holds unit
 * vectors; this normalises them before the save is brought into play.
 */
export const migrateSavedCharacterRoomsInPlace = <RoomId extends string>(
  savedCharacterRooms: SavedCharacterRooms<RoomId>,
): void => {
  // head and heels can be in the same room (the same object twice):
  for (const room of new Set(valuesIter(savedCharacterRooms))) {
    migrateWallTilesInPlace(room.roomJson);

    // saves from before change-tracking was a progression count omit these:
    room.progression ??= 0 as Progression;

    for (const item of roomItemsIterable(room.items)) {
      migrateItemBoxInPlace(item as LegacyBoxCarrier);
      item.state.movedOrResizedOnProgression ??= 0 as Progression;
      if (item.hintShadowDirections !== undefined) {
        item.hintShadowDirections =
          item.hintShadowDirections.map(asDirectionVector);
      }

      switch (item.type) {
        case "wall": {
          const config = item.config as unknown as LegacyWallConfig;
          const alongAxis =
            typeof config.direction === "string" ?
              doorAlongAxis(config.direction)
            : alongAxisOfDirectionXy(config.direction);
          migrateWallConfigInPlace(
            config,
            room.planet,
            fineXyzToBlockXyz(item.state.box)[alongAxis],
          );
          vectoriseInPlace(config, "direction");
          break;
        }
        case "floor":
          migrateFloorConfigInPlace(
            item.config as LegacyFloorConfig,
            item.state.box,
          );
          break;
        case "doorFrame":
        case "doorLegs":
        case "lamp":
        case "firedDoughnut":
          vectoriseInPlace(
            item.config as { direction?: MaybeNamedDirection },
            "direction",
          );
          break;
        case "conveyor":
          vectoriseInPlace(
            item.config as { direction: MaybeNamedDirection },
            "direction",
          );
          vectoriseInPlace(
            item.state as { direction: MaybeNamedDirection },
            "direction",
          );
          break;
        case "monster":
        case "movingPlatform":
        case "sceneryPlayer":
          vectoriseInPlace(
            item.config as { startDirection?: MaybeNamedDirection },
            "startDirection",
          );
          break;
      }
    }
  }
};
