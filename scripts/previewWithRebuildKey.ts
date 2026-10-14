/**
 * Serves one app's production build with vite preview, rebuilding it when `b`
 * is pressed in this terminal. Used by `pnpm dev --built` inside tmux, one per
 * pane.
 *
 *   tsx scripts/previewWithRebuildKey.ts <game|editor> [...vite preview args]
 *
 * vite preview serves whatever is on disk, so a reload after the rebuild
 * shows it without restarting the server.
 */
import { execa, type ResultPromise } from "execa";

const apps = ["game", "editor"] as const;
type App = (typeof apps)[number];

const isApp = (arg: string | undefined): arg is App =>
  apps.some((app) => app === arg);

const [maybeApp, ...previewArgs] = process.argv.slice(2);
if (!isApp(maybeApp)) {
  throw new Error(`first argument must be one of: ${apps.join(", ")}`);
}
const app = maybeApp;

// stdin is ignored so that this script, not vite, reads the keys:
const preview = execa("pnpm", [`preview:${app}`, ...previewArgs], {
  stdio: ["ignore", "inherit", "inherit"],
  reject: false,
});

let build: ResultPromise | undefined;

const rebuild = async () => {
  if (build !== undefined) {
    process.stdout.write(`\x1b[33m${app} already rebuilding\x1b[0m\n`);
    return;
  }
  process.stdout.write(`\x1b[33mrebuilding ${app}...\x1b[0m\n`);
  build = execa("pnpm", [`build:${app}`], { stdio: "inherit", reject: false });
  const { exitCode } = await build;
  build = undefined;
  process.stdout.write(
    exitCode === 0 ?
      `\x1b[32m${app} rebuilt - reload to see it\x1b[0m\n`
    : `\x1b[31m${app} build failed\x1b[0m\n`,
  );
};

const stop = () => {
  build?.kill();
  preview.kill();
};

process.stdout.write(`\x1b[2mpress b to rebuild ${app}\x1b[0m\n`);

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (key: string) => {
    if (key === "b") {
      rebuild();
    } else if (key === "\u0003") {
      // raw mode swallows ctrl-c's signal, so stop on the key itself:
      stop();
    }
  });
}

const { exitCode } = await preview;
process.exit(exitCode ?? 1);
