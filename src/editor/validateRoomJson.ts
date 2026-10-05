import Ajv from "ajv";

import roomSchema from "../_generated/room.schema.json";
import { type EditorRoomJson } from "./editorTypes";

/** checks a room's json against the room schema; `.errors` says what failed */
export const validateRoomJson = new Ajv().compile<EditorRoomJson>(roomSchema);
