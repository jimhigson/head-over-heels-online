// CI is slower, needs more time, even on arm64 runners (fastest on github).
// Windows is even slower (on the Github runners at least).

export const osSlowness = process.platform === "win32" ? 4 : 1;
