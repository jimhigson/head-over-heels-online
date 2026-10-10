import { type EditorThunk } from "../../store/store";
import { type DirectionXyz4 } from "../../utils/vectors/vectors";
import { insertRoom, setRoomAboveOrBelow } from "./levelEditorSlice";

/** adds a new room next to the current one, as the map's insert buttons do */
export const insertRoomInDirection =
  (direction: DirectionXyz4): EditorThunk =>
  (dispatch) => {
    switch (direction) {
      case "left":
      case "right":
      case "away":
      case "towards":
        dispatch(insertRoom({ direction }));
        break;
      case "up":
      case "down":
        dispatch(
          setRoomAboveOrBelow({
            direction: direction === "up" ? "above" : "below",
            createNew: true,
          }),
        );
        break;
      default:
        direction satisfies never;
    }
  };
