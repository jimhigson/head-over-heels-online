import { ActivationMenuItems } from "./ActivationMenuItems";
import { BlockStyleMenuItems } from "./BlockStyleMenuItems";
import { ChangeBlocksDeadlinessMenuItem } from "./ChangeBlocksDeadlinessMenuItem";
import { CoalesceMenuItem } from "./CoalesceMenuItem";
import { DeleteMenuItem } from "./DeleteMenuItem";
import { DisappearingMenuItems } from "./DisappearingMenuItems";
import { DoorGameEndMenuItem } from "./DoorGameEndMenuItem";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { ExplodeMenuItem } from "./ExplodeMenuItem";
import { FloorMenuItems } from "./FloorMenuItems";
import { MakeHoleMenuItem } from "./MakeHoleMenuItem";
import { MirrorOrientationMenuItems } from "./MirrorOrientationMenuItems";
import { MonsterMovementMenuItems } from "./MonsterMovementMenuItems";
import { SelectAllOfTypeMenuItems } from "./SelectAllOfTypeMenuItems";
import { SnapToGridMenuItems } from "./SnapToGridMenuItems";
import { StartDirectionMenuItems } from "./StartDirectionMenuItems";
import { TeleporterDestinationMenuItem } from "./TeleporterDestinationMenuItem";

/**
 * the actions available on the selected items, each deciding for itself
 * whether it applies to them
 */
export const ItemActionMenuItems = () => (
  <>
    <DeleteMenuItem />
    <DuplicateMenuItem />
    <ExplodeMenuItem />
    <CoalesceMenuItem />
    <MakeHoleMenuItem />
    <FloorMenuItems />
    <ChangeBlocksDeadlinessMenuItem />
    <BlockStyleMenuItems />
    <ActivationMenuItems />
    <DisappearingMenuItems />
    <MonsterMovementMenuItems />
    <TeleporterDestinationMenuItem />
    <DoorGameEndMenuItem />
    <StartDirectionMenuItems />
    <MirrorOrientationMenuItems />
    <SnapToGridMenuItems />
    <SelectAllOfTypeMenuItems />
  </>
);
