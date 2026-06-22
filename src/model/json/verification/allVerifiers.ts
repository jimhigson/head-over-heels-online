import { type CampaignVerifier } from "./CampaignVerification";
import { controllerExpectTypeVerifier } from "./controllerExpectTypeVerifier";
import { danglingDoorTargetVerifier } from "./danglingDoorTargetVerifier";
import { deadControllerReferenceVerifier } from "./deadControllerReferenceVerifier";
import { doorAboveRoomHeightVerifier } from "./doorAboveRoomHeightVerifier";
import { doorAmbiguousLinkVerifier } from "./doorAmbiguousLinkVerifier";
import { doorDirectionMismatchVerifier } from "./doorDirectionMismatchVerifier";
import { doorNoReturnVerifier } from "./doorNoReturnVerifier";
import { doorRoomMissingVerifier } from "./doorRoomMissingVerifier";
import { doorToSameRoomVerifier } from "./doorToSameRoomVerifier";
import { doorTwoWayLinkVerifier } from "./doorTwoWayLinkVerifier";
import { mapGeometryVerifier } from "./mapGeometryVerifier";
import { missingCrownVerifier } from "./missingCrownVerifier";
import { missingPlayerStartVerifier } from "./missingPlayerStartVerifier";
import { nonContiguousMirrorVerifier } from "./nonContiguousMirrorVerifier";
import { redundantTeleporterItemVerifier } from "./redundantTeleporterItemVerifier";
import { redundantTimesVerifier } from "./redundantTimesVerifier";
import { redundantToDoorVerifier } from "./redundantToDoorVerifier";
import { redundantToSubRoomVerifier } from "./redundantToSubRoomVerifier";
import { roomPerimeterCoverageVerifier } from "./roomPerimeterCoverageVerifier";
import { schemaComplianceVerifier } from "./schemaComplianceVerifier";
import { subRoomAdjacencyVerifier } from "./subRoomAdjacencyVerifier";
import { subRoomFloorCoverageVerifier } from "./subRoomFloorCoverageVerifier";
import { subRoomInvertedExtentVerifier } from "./subRoomInvertedExtentVerifier";
import { teleporterTargetInvalidVerifier } from "./teleporterTargetInvalidVerifier";
import { unreachableRoomVerifier } from "./unreachableRoomVerifier";
import { verticalLinkBadSubRoomVerifier } from "./verticalLinkBadSubRoomVerifier";
import { verticalLinkCollisionVerifier } from "./verticalLinkCollisionVerifier";
import { verticalLinkOneWayVerifier } from "./verticalLinkOneWayVerifier";

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
