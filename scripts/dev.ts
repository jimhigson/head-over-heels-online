/**
 * Starts the game and editor vite dev servers together, each knowing the
 * other's url.
 *
 * Ports are allocated here (game from 5200, editor from 5210, incrementing
 * until free) rather than letting vite fall through to another port itself,
 * because each server's url must be in the other's env
 * (VITE_GAME_URL/VITE_EDITOR_URL) before it starts. --strictPort makes the
 * (tiny) allocation race fail loudly instead of drifting silently.
 *
 * Inside tmux, both servers open in a new window split into two panes (game
 * on the left, editor on the right); pass --panes to instead split the
 * current window (game in this pane, editor in a new one). Outside tmux both
 * run in this terminal with interleaved output.
 *
 * Extra cli args are passed through to both vite instances, eg:
 *   pnpm dev --open
 */
import { execa } from "execa";
import getPort, { portNumbers } from "get-port";
import { setTimeout as delay } from "node:timers/promises";

// --panes keeps the old behaviour of splitting the current window rather than
// opening a new one; all other args are forwarded to both vite instances
const splitCurrentWindow = process.argv.includes("--panes");
const extraArgs = process.argv.slice(2).filter((arg) => arg !== "--panes");

const gamePort = await getPort({ port: portNumbers(5_200, 5_209) });
const editorPort = await getPort({ port: portNumbers(5_210, 5_219) });

const gameUrl = `http://localhost:${gamePort}/`;
// in dev mode the editor is served from the /editor/ base path
const editorUrl = `http://localhost:${editorPort}/editor/`;

const gameNodeArgs = [
  "--max_http_header_size=128000",
  "node_modules/vite/bin/vite",
  "--port",
  String(gamePort),
  "--strictPort",
  ...extraArgs,
];

const editorViteArgs = [
  "--config",
  "vite.editor.config.ts",
  "--mode",
  "development",
  "--port",
  String(editorPort),
  "--strictPort",
  ...extraArgs,
];

const shellQuote = (arg: string) => `'${arg.replaceAll("'", `'\\''`)}'`;

/**
 * whether a tmux pane with this id is still live (ie its command is running).
 * The `-f` filter excludes dead panes so a pane kept around by remain-on-exit
 * after the game stops doesn't leave the poll loop spinning forever.
 */
const tmuxPaneIsLive = async (paneId: string) => {
  const { stdout } = await execa("tmux", [
    "list-panes",
    "-a",
    "-f",
    "#{==:#{pane_dead},0}",
    "-F",
    "#{pane_id}",
  ]);
  return stdout.split("\n").includes(paneId);
};

/**
 * opens a new tmux window split into two panes: game on the left, editor on
 * the right. When the game pane exits, the editor pane is killed too.
 */
const runInNewTmuxWindow = async () => {
  // vite's own screen-clear on startup would otherwise scroll the GAME/EDITOR
  // labels out of view
  const noClear = ["--clearScreen", "false"];

  // create the new window running the game; capture the game pane's id so we
  // can wait on it and split from it
  const { stdout: gamePaneId } = await execa("tmux", [
    "new-window",
    "-P",
    "-F",
    "#{pane_id}",
    "-n",
    "hoh dev",
    "-e",
    `VITE_EDITOR_URL=${editorUrl}`,
    `printf '\\033[1;32mGAME\\033[0m\\n'; node ${[...gameNodeArgs, ...noClear].map(shellQuote).join(" ")}`,
  ]);

  // split that window for the editor
  const { stdout: editorPaneId } = await execa("tmux", [
    "split-window",
    "-h",
    "-t",
    gamePaneId,
    "-P",
    "-F",
    "#{pane_id}",
    "-e",
    `VITE_GAME_URL=${gameUrl}`,
    `printf '\\033[1;35mEDITOR\\033[0m\\n'; pnpm exec vite ${[...editorViteArgs, ...noClear].map(shellQuote).join(" ")}`,
  ]);

  // the servers now run in the new window; wait for the game to stop, then
  // tear down the editor pane alongside it
  while (await tmuxPaneIsLive(gamePaneId)) {
    await delay(500);
  }

  await execa("tmux", ["kill-pane", "-t", editorPaneId], { reject: false });
};

/**
 * splits the current tmux window: editor in the new pane, game in this one.
 * When the game exits, the editor pane is killed too
 */
const runSplitInTmux = async () => {
  // start both panes visually fresh: wipe this pane's screen and scrollback
  // so it matches the newly-created editor pane
  process.stdout.write("\x1b[2J\x1b[H");
  await execa("tmux", ["clear-history"]);
  process.stdout.write("\x1b[1;32mGAME\x1b[0m\n");

  // the launcher already cleared the panes; without this, vite's own
  // screen-clear on startup would scroll the GAME/EDITOR labels out of view
  const noClear = ["--clearScreen", "false"];

  const { stdout: editorPaneId } = await execa("tmux", [
    "split-window",
    "-h",
    // print the new pane's id so we can kill it when the game exits
    "-P",
    "-F",
    "#{pane_id}",
    "-e",
    `VITE_GAME_URL=${gameUrl}`,
    `printf '\\033[1;35mEDITOR\\033[0m\\n'; pnpm exec vite ${[...editorViteArgs, ...noClear].map(shellQuote).join(" ")}`,
  ]);

  const gameResult = await execa("node", [...gameNodeArgs, ...noClear], {
    stdio: "inherit",
    env: { VITE_EDITOR_URL: editorUrl },
    reject: false,
  });

  await execa("tmux", ["kill-pane", "-t", editorPaneId], { reject: false });

  process.exitCode = gameResult.exitCode === 0 ? 0 : 1;
};

/** both servers in this terminal, output interleaved */
const runInterleaved = async () => {
  const game = execa("node", gameNodeArgs, {
    stdio: "inherit",
    env: { VITE_EDITOR_URL: editorUrl },
    reject: false,
  });

  const editor = execa("vite", editorViteArgs, {
    preferLocal: true,
    stdio: "inherit",
    env: { VITE_GAME_URL: gameUrl },
    reject: false,
  });

  const children = [game, editor];

  const results = await Promise.all(
    children.map(async (child) => {
      const result = await child;
      // one server stopping (or failing to start) takes the other down too
      for (const other of children) {
        if (other !== child && other.exitCode === null) {
          other.kill();
        }
      }
      return result;
    }),
  );

  process.exitCode = results.every(({ exitCode }) => exitCode === 0) ? 0 : 1;
};

if (process.env.TMUX === undefined) {
  await runInterleaved();
} else if (splitCurrentWindow) {
  await runSplitInTmux();
} else {
  await runInNewTmuxWindow();
}
