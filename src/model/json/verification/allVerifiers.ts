import { missingCrownVerifier } from "./campaign/missingCrownVerifier";
import { missingPlayerStartVerifier } from "./campaign/missingPlayerStartVerifier";
import { schemaComplianceVerifier } from "./campaign/schemaComplianceVerifier";
import { unreachableRoomVerifier } from "./campaign/unreachableRoomVerifier";
import { type CampaignVerifier } from "./CampaignVerification";
import { controllerExpectTypeVerifier } from "./controllers/controllerExpectTypeVerifier";
import { deadControllerReferenceVerifier } from "./controllers/deadControllerReferenceVerifier";
import { danglingDoorTargetVerifier } from "./doors/danglingDoorTargetVerifier";
import { doorAboveRoomHeightVerifier } from "./doors/doorAboveRoomHeightVerifier";
import { doorAmbiguousLinkVerifier } from "./doors/doorAmbiguousLinkVerifier";
import { doorDirectionMismatchVerifier } from "./doors/doorDirectionMismatchVerifier";
import { doorNoReturnVerifier } from "./doors/doorNoReturnVerifier";
import { doorRoomMissingVerifier } from "./doors/doorRoomMissingVerifier";
import { doorToSameRoomVerifier } from "./doors/doorToSameRoomVerifier";
import { doorTwoWayLinkVerifier } from "./doors/doorTwoWayLinkVerifier";
import { redundantToDoorVerifier } from "./doors/redundantToDoorVerifier";
import { mapGeometryVerifier } from "./rooms/mapGeometryVerifier";
import { redundantTimesVerifier } from "./rooms/redundantTimesVerifier";
import { roomPerimeterCoverageVerifier } from "./rooms/roomPerimeterCoverageVerifier";
import { nonContiguousMirrorVerifier } from "./subRooms/nonContiguousMirrorVerifier";
import { redundantToSubRoomVerifier } from "./subRooms/redundantToSubRoomVerifier";
import { subRoomAdjacencyVerifier } from "./subRooms/subRoomAdjacencyVerifier";
import { subRoomFloorCoverageVerifier } from "./subRooms/subRoomFloorCoverageVerifier";
import { subRoomInvertedExtentVerifier } from "./subRooms/subRoomInvertedExtentVerifier";
import { verticalLinkBadSubRoomVerifier } from "./subRooms/verticalLinkBadSubRoomVerifier";
import { verticalLinkCollisionVerifier } from "./subRooms/verticalLinkCollisionVerifier";
import { verticalLinkOneWayVerifier } from "./subRooms/verticalLinkOneWayVerifier";
import { redundantTeleporterItemVerifier } from "./teleporters/redundantTeleporterItemVerifier";
import { teleporterTargetInvalidVerifier } from "./teleporters/teleporterTargetInvalidVerifier";

/**
 * every verifier the editor runs against the open campaign. Each is authored
 * with its own typed `issueData` and erased to `unknown` here, since the
 * orchestrator treats them opaquely and only passes them back to their own
 * verifier's `fix`.
 */
export const allVerifiers: CampaignVerifier<unknown>[] = [
  danglingDoorTargetVerifier,
  doorRoomMissingVerifier,
  doorNoReturnVerifier,
  doorAmbiguousLinkVerifier,
  doorDirectionMismatchVerifier,
  doorTwoWayLinkVerifier,
  doorToSameRoomVerifier,
  teleporterTargetInvalidVerifier,
  redundantToDoorVerifier,
  redundantToSubRoomVerifier,
  redundantTeleporterItemVerifier,
  deadControllerReferenceVerifier,
  controllerExpectTypeVerifier,
  verticalLinkOneWayVerifier,
  verticalLinkBadSubRoomVerifier,
  verticalLinkCollisionVerifier,
  nonContiguousMirrorVerifier,
  subRoomInvertedExtentVerifier,
  subRoomFloorCoverageVerifier,
  subRoomAdjacencyVerifier,
  roomPerimeterCoverageVerifier,
  doorAboveRoomHeightVerifier,
  redundantTimesVerifier,
  unreachableRoomVerifier,
  mapGeometryVerifier,
  missingPlayerStartVerifier,
  missingCrownVerifier,
  schemaComplianceVerifier,
];
