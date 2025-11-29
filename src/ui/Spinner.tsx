export const SpinnerHead = () => (
  <div
    className="flex h-full items-center justify-center loading-border zx:zx-loading-border"
    role="status"
    aria-label="Loading"
  >
    <span className="sprite texture-animated-head_walking_right" aria-hidden />
  </div>
);
export const SpinnerHeels = () => (
  <div
    className="flex h-full items-center justify-center loading-border zx:zx-loading-border"
    role="status"
    aria-label="Loading"
  >
    <span
      className="sprite texture-animated-heels_walking_towards"
      aria-hidden
    />
  </div>
);
