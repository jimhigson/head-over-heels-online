import { Xyz } from "./modelTypes";

export type Teleporter = {
    type: 'teleporter',
    toRoom: string,
    position: Xyz
}

export type Barrier = {
    type: 'barrier',
    alongAxis: 'x' | 'y',
    position: Xyz
}

export type Item = Teleporter | Barrier; // or others!

