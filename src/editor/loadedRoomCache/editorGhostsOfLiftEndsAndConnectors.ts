import { loadItemFromJson } from "../../game/gameState/loadRoom/loadItemFromJson";
import { blockSizePx } from "../../game/physics/mechanicsConstants";
import { noPlanetsLiberated } from "../../store/slices/gameInPlay/gameInPlaySlice";
import { xyzEqual } from "../../utils/vectors/vectors";
import { editorGhostEditorBehaviours } from "../editorGhostEditorBehaviours";
import {
  type EditorItemInPlayUnion,
  type EditorJsonItem,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorUnionOfAllItemInPlayTypes,
} from "../editorTypes";
import { type WhichEditorGhostOf } from "../WhichEditorGhostOf";
import { editorGhostOfParticleDot } from "./editorGhostOfParticleDot";
import { editorGhostWithBrushItem } from "./editorGhostWithBrushItem";

/**
 * the spacing of the particle dots joining a lift to its editor ghosts, in px
 */
const connectorEditorGhostSpacingPx = blockSizePx.z / 4;

const whichLiftEndEditorGhosts = [
  "liftTop",
  "liftBottom",
] as const satisfies WhichEditorGhostOf<"lift">[];

/**
 * greyed editor ghosts of a lift at its top and bottom - leaving out any where the
 * lift starts, or where the other end already is - and particle dots joining them
 * to the lift, all belonging to the lift
 */
export const editorGhostsOfLiftEndsAndConnectors = (
  jsonItemId: EditorRoomItemId,
  liftJson: EditorJsonItem<"lift">,
  roomJson: EditorRoomJson,
): EditorItemInPlayUnion<"editorGhost">[] => {
  const liftEndEditorGhosts: EditorItemInPlayUnion<"editorGhost">[] = [];
  const takenPositions = [liftJson.position];
  for (const whichEditorGhost of whichLiftEndEditorGhosts) {
    const position =
      editorGhostEditorBehaviours.lift[whichEditorGhost].blockPosition(
        liftJson,
      );
    if (takenPositions.some((taken) => xyzEqual(taken, position))) {
      continue;
    }
    takenPositions.push(position);
    const [brushLift] = loadItemFromJson<EditorRoomId, EditorRoomItemId>(
      `${jsonItemId}.${whichEditorGhost}` as EditorRoomItemId,
      { ...liftJson, position },
      roomJson,
      // the editor plays no game, so has liberated no planets:
      noPlanetsLiberated,
    );
    liftEndEditorGhosts.push(
      editorGhostWithBrushItem(brushLift as EditorUnionOfAllItemInPlayTypes, {
        jsonItemId,
        drawnGreyedOut: true,
        whichEditorGhost,
      }),
    );
  }

  const [firstLiftEndEditorGhost] = liftEndEditorGhosts;
  if (firstLiftEndEditorGhost === undefined) {
    return liftEndEditorGhosts;
  }
  const { x, y, xd, yd, zd } = firstLiftEndEditorGhost.state.box;
  const liftZs = [
    liftJson.position.z * blockSizePx.z,
    ...liftEndEditorGhosts.map((editorGhost) => editorGhost.state.box.z),
  ];
  const isInsideALift = (z: number) =>
    liftZs.some((liftZ) => z >= liftZ && z <= liftZ + zd);
  const connectorEditorGhosts: EditorItemInPlayUnion<"editorGhost">[] = [];
  for (
    let z = Math.min(...liftZs);
    z <= Math.max(...liftZs) + zd;
    z += connectorEditorGhostSpacingPx
  ) {
    if (!isInsideALift(z)) {
      connectorEditorGhosts.push(
        editorGhostOfParticleDot(
          { x: x + xd / 2, y: y + yd / 2, z },
          jsonItemId,
        ),
      );
    }
  }

  return [...liftEndEditorGhosts, ...connectorEditorGhosts];
};
