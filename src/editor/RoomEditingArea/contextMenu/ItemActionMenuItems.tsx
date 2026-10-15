import { ActivationMenuItems } from "./ActivationMenuItems";
import { CoalesceMenuItem } from "./CoalesceMenuItem";
import { DeleteMenuItem } from "./DeleteMenuItem";
import { DisappearingMenuItems } from "./DisappearingMenuItems";
import { DoorGameEndMenuItem } from "./DoorGameEndMenuItem";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { ExplodeMenuItem } from "./ExplodeMenuItem";
import { MirrorOrientationMenuItems } from "./MirrorOrientationMenuItems";
import { MonsterMovementMenuItems } from "./MonsterMovementMenuItems";
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
    <ActivationMenuItems />
    <DisappearingMenuItems />
    <MonsterMovementMenuItems />
    <TeleporterDestinationMenuItem />
    <DoorGameEndMenuItem />
    <StartDirectionMenuItems />
    <MirrorOrientationMenuItems />
  </>
);
