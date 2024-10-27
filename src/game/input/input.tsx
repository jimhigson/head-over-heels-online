import { Direction } from "@/modelTypes";
import { Key } from "./keys";

type Assignable = Direction | "jump" | "fire" | "bag" | "switch";

const keyAssignments: Record<Assignable, Key> = {
  right: "ArrowRight",
  towards: "ArrowDown",
  left: "ArrowLeft",
  away: "ArrowUp",
  //jump: " ",
};

export const input = () => {
  console.log("addng listeners on keys");

  const keyDownHandler = (e: KeyboardEvent): void => {
    console.log("pressed: ", e.key);
  };
  const keyUpHandler = (e: KeyboardEvent): void => {};

  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);

  return () => {
    console.log("removing listeners on keys");
    window.removeEventListener("keydown", keyDownHandler, false);
    window.removeEventListener("keyup", keyUpHandler, false);
  };
};
