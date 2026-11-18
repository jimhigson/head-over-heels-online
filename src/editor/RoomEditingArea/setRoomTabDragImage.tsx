import { render } from "preact";

import { store } from "../../store/store";
import { Tab } from "../../ui/tabs/Tab";
import { type EditorRoomId } from "../editorTypes";
import { cssForRoomColour } from "../toolbar/buttons/RoomColourSelect";
import { buttonSmallHeightClassNames } from "../toolbar/buttonSizeClassNames";
import { abbreviateRoomId } from "./abbreviateRoomId";

const doNothing = () => {};

/**
 * while a room is dragged in to open (eg from the map), show it as the tab it
 * will become, coloured as room tabs are
 */
export const setRoomTabDragImage = (
  dragEvent: DragEvent,
  roomId: EditorRoomId,
  uncolourised: boolean,
) => {
  const { dataTransfer, currentTarget } = dragEvent;
  if (dataTransfer === null || !(currentTarget instanceof Element)) {
    return;
  }
  const roomHue =
    store.getState().levelEditor.campaignInProgress.rooms[roomId].color.hue;

  // inside the element dragged, so the tab is drawn at the same scale, but
  // out of view - the image is only taken from it:
  const imageContainer = document.createElement("div");
  imageContainer.style.position = "fixed";
  imageContainer.style.left = "-10000px";
  imageContainer.style.top = "0";
  currentTarget.appendChild(imageContainer);
  render(
    <div class="inline-flex">
      <Tab
        label={roomId}
        shortLabel={abbreviateRoomId(roomId)}
        isActive={false}
        onSelect={doNothing}
        class={`command-colours ${buttonSmallHeightClassNames}`}
        style={cssForRoomColour(roomHue, uncolourised)}
      />
    </div>,
    imageContainer,
  );
  dataTransfer.setDragImage(imageContainer, 0, 0);

  // the image is taken as the drag starts, so the tab isn't needed after:
  requestAnimationFrame(() => {
    render(null, imageContainer);
    imageContainer.remove();
  });
};
