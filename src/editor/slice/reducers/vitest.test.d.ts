import "vitest";

interface CustomMatchers<R = unknown> {
  toHaveWallsAndDoorsContiguouslyAroundFloor: (floorId: EditorRoomItemId) => R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type -- from docs https://vitest.dev/guide/extending-matchers
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
