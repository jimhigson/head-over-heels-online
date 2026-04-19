import type { AnimatedTextureTailwindClass } from "../sprites/spritesheet/spritesheetData/TextureTailwindClass";

type LoaderProps = {
  loadingBorder?: boolean;
};

export const SpinnerHead = ({ loadingBorder }: LoaderProps = {}) => (
  <div
    className={`flex h-full items-center justify-center ${loadingBorder ? "loading-border zx:zx-loading-border" : ""}`}
    role="status"
    aria-label="Loading"
  >
    <span
      className={`sprite ${"texture-animated-head_walking_right" satisfies AnimatedTextureTailwindClass}`}
      aria-hidden
    />
  </div>
);
export const SpinnerHeels = ({ loadingBorder }: LoaderProps = {}) => (
  <div
    className={`flex h-full items-center justify-center ${loadingBorder ? "loading-border zx:zx-loading-border" : ""}`}
    role="status"
    aria-label="Loading"
  >
    <span
      className={`sprite ${"texture-animated-heels_walking_towards" satisfies AnimatedTextureTailwindClass}`}
      aria-hidden
    />
  </div>
);
