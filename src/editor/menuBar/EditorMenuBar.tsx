import { Menu } from "../../ui/menuBar/Menu";
import { MenuBar } from "../../ui/menuBar/MenuBar";
import { CampaignMenuItems } from "./CampaignMenuItems";
import { EditMenuItems } from "./EditMenuItems";
import { ItemMenuItems } from "./ItemMenuItems";
import { PlaytestMenuItems } from "./PlaytestMenuItems";
import { ProfileMenuItems } from "./ProfileMenuItems";
import { ProfileMenuName } from "./ProfileMenuName";
import { RoomMenuItems } from "./RoomMenuItems";

/** the editor's whole-window menu bar */
export const EditorMenuBar = () => (
  <MenuBar class="scale-editor leading-none bg-metallicBlueHalfbrite text-metallicBlue border-b-[calc(1px*var(--scale))] border-metallicBlue">
    <Menu label="Campaign">
      <CampaignMenuItems />
    </Menu>
    <Menu label="Room">
      <RoomMenuItems />
    </Menu>
    <Menu label="Edit">
      <EditMenuItems />
    </Menu>
    <Menu label="Item">
      <ItemMenuItems />
    </Menu>
    <Menu label="Playtest">
      <PlaytestMenuItems />
    </Menu>
    <Menu label="Profile" name={<ProfileMenuName />} alignEnd>
      <ProfileMenuItems />
    </Menu>
  </MenuBar>
);
