/* give the vscode tailwind plugin a hint that this is a tailwind class and provide auto-complete */
import type { Arrayable } from "type-fest";

export const twClass = <S extends Arrayable<string>>(str: S) => str;
