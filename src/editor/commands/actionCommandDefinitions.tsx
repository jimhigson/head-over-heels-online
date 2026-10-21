import { type TextureTailwindClass } from "../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { editorCampaignsApiSlice } from "../../store/slices/campaigns/editorCampaignsApiSlice";
import { type EditorRootState } from "../../store/store";
import { MenuItemGlyphIcon } from "../../ui/menuBar/MenuItemGlyphIcon";
import { copySelectedItemsToClipboard } from "../clipboard/copySelectedItemsToClipboard";
import { pasteItemsFromClipboard } from "../clipboard/pasteItemsFromClipboard";
import { campaignIsNamed } from "../editorTypes";
import { playtest } from "../playtest";
import { fitCursorRoomInViewThunk } from "../RoomEditingArea/viewport/fitCursorRoomInViewThunk";
import { stepCursorRoomZoomThunk } from "../RoomEditingArea/viewport/stepCursorRoomZoomThunk";
import {
  openCampaignDialogShown,
  saveAsDialogShown,
} from "../slice/editorSaveSlice";
import {
  addRoom,
  deleteSelected,
  redo,
  resetTool,
  roomBack,
  roomForward,
  selectBackRooms,
  selectCampaignHasUnsavedChanges,
  selectCurrentCampaignInProgress,
  selectCursorRoomSelectedJsonItemIds,
  selectForwardRooms,
  selectRedoHistory,
  selectTool,
  selectUndoHistory,
  setTool,
  togglePointerTool,
  undo,
} from "../slice/levelEditorSlice";
import { revertPressed, savePressed } from "../slice/saveAndLoadThunks";
import { IconWithTwoLineHoverText } from "../toolbar/buttons/ToolbarButtonContentPatterns";
import {
  confirmClearRoomThunk,
  confirmDeleteRoomThunk,
  confirmNewCampaignThunk,
} from "../toolbar/confirmThunk";
import { copyCampaignShareLink } from "../toolbar/copyCampaignShareLink";
import { showEditorCmdKThunk } from "../toolbar/showEditorCmdKThunk";
import { showVerifyIssuesThunk } from "../toolbar/showVerifyIssuesThunk";
import { selectVerification } from "../verify/useVerifyCampaign";
import { type EditorCommandDefinition } from "./EditorCommand";
import { SaveIcon } from "./SaveIcon";

const selectSomethingSelected = (state: EditorRootState) =>
  selectCursorRoomSelectedJsonItemIds(state).length > 0;

const selectCampaignIsNamed = (state: EditorRootState) =>
  campaignIsNamed(selectCurrentCampaignInProgress(state));

const selectSupabaseUser =
  editorCampaignsApiSlice.endpoints.getSupabaseUser.select();

const selectIsLoggedIn = (state: EditorRootState) => {
  const user = selectSupabaseUser(state).data;
  return user !== null && user !== undefined;
};

/** the editor's commands other than placing items */
export const actionCommandDefinitions = {
  pointerTool: {
    type: "action",
    label: "Pointer tool",
    synonyms: ["select", "arrow"],
    icon: (
      <span
        class={`sprite ${"texture-pointer" satisfies TextureTailwindClass} relative`}
      />
    ),
    menuIcon: "texture-pointer",
    // dot copies the dpaint shortcut to go back to a single pixel brush
    shortcutKeys: ["."],
    tooltipContent: `## Pointer`,
    selectIsActive: (state) => selectTool(state).type === "pointer",
    action: () => resetTool(),
  },
  togglePointerTool: {
    type: "action",
    label: "Pointer / last item tool",
    synonyms: ["select", "arrow", "swap tool"],
    menuIcon: "texture-pointer",
    // Escape key to switch back to default pointer tool
    shortcutKeys: ["Escape"],
    action: () => togglePointerTool(),
  },
  eyeDropperTool: {
    type: "action",
    label: "Eye-dropper",
    synonyms: ["pick", "copy item"],
    icon: (
      <span
        class={`relative sprite ${"texture-editor_tool_eyedropper" satisfies TextureTailwindClass} leading-none`}
      />
    ),
    menuIcon: "texture-editor_tool_eyedropper",
    shortcutKeys: [
      // i copies photoshop, gimp, Krita, etc
      "I",
      // comma copies dpaint
      ",",
    ],
    tooltipContent: `## Eye-dropper

click on an item in the room to copy it and put a copy down somewhere else`,
    selectIsActive: (state) => selectTool(state).type === "eyeDropper",
    action: () => setTool({ type: "eyeDropper" }),
  },
  commandPalette: {
    type: "action",
    label: "Command palette…",
    icon: <span class="relative text-single-line">CMD</span>,
    shortcutKeys: ["^K", "⌘K"],
    tooltipContent:
      "## Command palette\nSearch for items to place, and commands to run",
    action: () => showEditorCmdKThunk(),
  },
  undo: {
    type: "action",
    label: "Undo",
    icon: (
      <IconWithTwoLineHoverText
        icon={<span class="text-single-line">⎌</span>}
        topText="un"
        bottomText="do"
      />
    ),
    menuIcon: <MenuItemGlyphIcon glyph="⎌" />,
    shortcutKeys: ["⌘Z", "^Z"],
    selectIsAvailable: (state) => selectUndoHistory(state).length > 0,
    action: () => undo(),
  },
  redo: {
    type: "action",
    label: "Redo",
    icon: (
      <IconWithTwoLineHoverText
        icon={<span class="text-single-line">⟳</span>}
        topText="re"
        bottomText="do"
      />
    ),
    menuIcon: <MenuItemGlyphIcon glyph="⟳" />,
    shortcutKeys: ["⌘⇧Z", "^⇧Z"],
    selectIsAvailable: (state) => selectRedoHistory(state).length > 0,
    action: () => redo(),
  },
  copy: {
    type: "action",
    label: "Copy",
    icon: (
      <IconWithTwoLineHoverText
        icon={<span class="text-single-line">C</span>}
        topText="co"
        bottomText="py"
      />
    ),
    menuIcon: <MenuItemGlyphIcon glyph="C" />,
    shortcutKeys: ["⌘C", "^C"],
    tooltipContent: `## Copy\n\nCopy the selected item(s) to the clipboard to paste into another room`,
    selectIsAvailable: selectSomethingSelected,
    action: () => copySelectedItemsToClipboard,
  },
  paste: {
    type: "action",
    label: "Paste",
    icon: (
      <IconWithTwoLineHoverText
        icon={<span class="text-single-line">P</span>}
        topText="ps"
        bottomText="te"
      />
    ),
    menuIcon: <MenuItemGlyphIcon glyph="P" />,
    shortcutKeys: ["⌘V", "^V"],
    tooltipContent: `## Paste\n\nPaste an item into this room copied from another room`,
    action: () => pasteItemsFromClipboard,
  },
  delete: {
    type: "action",
    label: "Delete",
    icon: <span class="text-single-line">X</span>,
    menuIcon: <MenuItemGlyphIcon glyph="X" class="bg-midRed" />,
    toolbarClass: "bg-midRed",
    shortcutKeys: ["Delete", "Backspace"],
    tooltipContent: `## Delete items
delete selected item(s)`,
    selectIsAvailable: selectSomethingSelected,
    action: () => deleteSelected({ timestamp: Date.now() }),
  },
  previousRoom: {
    type: "action",
    label: "Previous room",
    icon: <span class="text-single-line">{"<"}</span>,
    menuIcon: <MenuItemGlyphIcon glyph="<" />,
    toolbarClass: "bg-highlightBeige",
    // this is bit weird - need to give shift on OSX since the <
    // is on the , key, and can only be types using shift.
    // I think windows is the same, so this should be ok
    shortcutKeys: ["⇧<"],
    tooltipContent: `
## Back

Go back to the previous room
`,
    selectIsAvailable: (state) => selectBackRooms(state).length > 0,
    action: () => roomBack(),
  },
  nextRoom: {
    type: "action",
    label: "Next room",
    icon: <span class="text-single-line">{">"}</span>,
    menuIcon: <MenuItemGlyphIcon glyph=">" />,
    toolbarClass: "bg-highlightBeige",
    shortcutKeys: ["⇧>"],
    tooltipContent: `
## Forward

The opposite of back
`,
    selectIsAvailable: (state) => selectForwardRooms(state).length > 0,
    action: () => roomForward(),
  },
  addRoom: {
    type: "action",
    label: "Add room",
    icon: <span class="text-single-line">+</span>,
    menuIcon: <MenuItemGlyphIcon glyph="+" class="bg-moss" />,
    toolbarClass: "bg-moss",
    tooltipContent: `
## Add room

Add a **new room** to this campaign

Nothing will link to the room so add *doors* and *teleporters* to get into it
`,
    action: () => addRoom({}),
  },
  deleteRoom: {
    type: "action",
    label: "Delete room",
    icon: <span class="text-single-line">X</span>,
    menuIcon: <MenuItemGlyphIcon glyph="X" class="bg-midRed" />,
    toolbarClass: "bg-midRed",
    tooltipContent: `
## Delete room

Delete this room
`,
    selectIsAvailable: (state) =>
      Object.keys(selectCurrentCampaignInProgress(state).rooms).length > 1,
    action: () => confirmDeleteRoomThunk(),
  },
  clearRoom: {
    type: "action",
    label: "Clear room",
    icon: <span class="relative text-single-line">CLR</span>,
    toolbarClass: "bg-midRed",
    tooltipContent: `## Clear room

Clears the room out, leaving just walls, floors, and doors`,
    action: () => confirmClearRoomThunk,
  },
  newCampaign: {
    type: "action",
    label: "New campaign",
    icon: <span class="relative text-single-line">NEW</span>,
    tooltipContent:
      "## New Campaign\nCreate a new campaign, starting from one empty room",
    action: () => confirmNewCampaignThunk(),
  },
  openCampaign: {
    type: "action",
    label: "Open…",
    icon: (
      <div class="flex flex-row items-center">
        <span
          class={`sprite ${"texture-editor_tool_open" satisfies TextureTailwindClass} relative`}
        />
        <span class="text-single-line text-highlightBeige">➡</span>
      </div>
    ),
    menuIcon: "texture-editor_tool_open",
    shortcutKeys: ["^O", "⌘O"],
    tooltipContent: `
## Open

Load your saved campaign, or anyone else's for editing
`,
    action: () => openCampaignDialogShown(),
  },
  revertCampaign: {
    type: "action",
    label: "Revert to saved",
    selectIsAvailable: (state) =>
      selectCampaignIsNamed(state) && selectCampaignHasUnsavedChanges(state),
    action: () => revertPressed(),
  },
  saveCampaign: {
    type: "action",
    label: "Save",
    icon: <SaveIcon arrowClass="text-highlightBeige" />,
    menuIcon: <SaveIcon arrowClass="text-highlightBeige" />,
    shortcutKeys: ["^S", "⌘S"],
    tooltipContent: `
## Save

Put your campaign on cassette tape, or even floppy disk! - to be shared or worked on later

(really, saves to a cloud database)
`,
    selectIsAvailable: (state) =>
      selectIsLoggedIn(state) && selectCampaignHasUnsavedChanges(state),
    action: () => savePressed(),
  },
  saveCampaignAs: {
    type: "action",
    label: "Save as…",
    // save's icon, its arrow recoloured to tell them apart:
    menuIcon: <SaveIcon arrowClass="text-midRed" />,
    selectIsAvailable: selectIsLoggedIn,
    action: () => saveAsDialogShown(),
  },
  copyShareLink: {
    type: "action",
    label: "Copy share link",
    icon: (
      <span
        class={`sprite ${"texture-editor_tool_share" satisfies TextureTailwindClass} relative`}
      />
    ),
    menuIcon: "texture-editor_tool_share",
    tooltipContent: `
## Share

**Save first!**

Copies a link to the clipboard

Give anyone the link to your game
`,
    selectIsAvailable: (state) =>
      selectCampaignIsNamed(state) && !selectCampaignHasUnsavedChanges(state),
    action: () => copyCampaignShareLink,
  },
  playtest: {
    type: "action",
    label: "Playtest",
    synonyms: ["run"],
    icon: (
      <IconWithTwoLineHoverText
        topText="pl"
        bottomText="ay"
        icon={
          <span
            class={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} mt-half`}
          />
        }
      />
    ),
    menuIcon: (
      // menus are at scale 2, so this is half size:
      <span
        class={`sprite ${"texture-joystick_whole" satisfies TextureTailwindClass} [--scale:1]`}
      />
    ),
    shortcutKeys: ["⌘P", "^P"],
    tooltipContent: `## Playtest\n\nPlay this room without saving`,
    action: () => playtest,
  },
  verifyCampaign: {
    type: "action",
    label: "Verify and fix…",
    synonyms: ["check", "validate", "lint"],
    selectIsAvailable: (state) => selectVerification(state).length > 0,
    action: () => showVerifyIssuesThunk(),
  },
  zoomOut: {
    type: "action",
    label: "Zoom out",
    icon: <span class="text-single-line">-</span>,
    menuIcon: <MenuItemGlyphIcon glyph="-" />,
    shortcutKeys: ["-"],
    tooltipContent: `## zoom ⬇\n\nmakes things look *smaller*`,
    action: () => stepCursorRoomZoomThunk("out"),
  },
  zoomIn: {
    type: "action",
    label: "Zoom in",
    icon: <span class="text-single-line">+</span>,
    menuIcon: <MenuItemGlyphIcon glyph="+" />,
    shortcutKeys: ["⇧+", "="],
    tooltipContent: `## zoom ⬆\n\nmakes things look *bigger*`,
    action: () => stepCursorRoomZoomThunk("in"),
  },
  fitRoomInView: {
    type: "action",
    label: "Fit room in view",
    synonyms: ["zoom to fit", "reset view"],
    icon: <span class="text-single-line">Fit</span>,
    shortcutKeys: ["0"],
    tooltipContent: `## fit\n\nzoom and pan the room to exactly fit the pane`,
    toolbarClass: "bg-moss px-2",
    action: () => fitCursorRoomInViewThunk(),
  },
} as const satisfies {
  [s in string]: EditorCommandDefinition;
};
