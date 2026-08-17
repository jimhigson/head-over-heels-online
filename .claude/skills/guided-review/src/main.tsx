import { render } from "preact";

import { App } from "./components/App.tsx";
import { liveEditors } from "./liveEditors.ts";
import { followPageTheme } from "./monacoLoader.ts";
import { loadNotes, messagesOf, type Note, noteAt, type Notes, notesStore } from "./notes.ts";
import { meta, server } from "./payload.ts";
import { toast } from "./stores.ts";
import {
  adoptTicks,
  getLastFromServer,
  loadTicks,
  setLastFromServer,
  ticksAreInFlight,
  ticksSignature,
} from "./ticks.ts";
import "./page.css";

/* ---- the page follows the working tree ------------------------------------
   an agent acting on a note shows up here within a couple of seconds, in the
   diff and in the note's own thread */

type ServerState = {
  notes: Notes;
  ticked: string[];
  files: Record<string, { sha: string; added: number; removed: number }>;
};

const agentSaid = (state: ServerState) =>
  Object.entries(state.notes).flatMap(([path, forPath]) =>
    forPath.flatMap((note: Note) => {
      const was = messagesOf(noteAt(path, note.line)).length;
      return messagesOf(note)
        .slice(was)
        .filter((message) => message.from === "agent")
        .map((message) => ({ path, line: note.line, message }));
    }),
  );

let missedPolls = 0;

const pollState = async (): Promise<void> => {
  if (server === undefined) {
    return;
  }
  const paths = [...liveEditors.keys()];
  const response = await fetch("/state", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Review-Token": server.token },
    body: JSON.stringify({ paths }),
  }).catch(() => undefined);

  if (response?.ok !== true) {
    missedPolls += 1;
    // the server can be restarted under an open tab; say so rather than going
    // quietly inert, which looks exactly like "nothing is happening"
    if (missedPolls === 3) {
      toast("lost the review server — saves and notes won't land. Reload this page", "warn");
    }
    return;
  }
  if (missedPolls >= 3) {
    toast("back in touch with the review server", "done");
  }
  missedPolls = 0;

  const state = (await response.json()) as ServerState;

  // a tick made in another tab on this review; while this one has a write in
  // flight the file is the stale side, so leave it alone
  const incoming = ticksSignature(state.ticked ?? []);
  if (incoming !== getLastFromServer() && !ticksAreInFlight()) {
    setLastFromServer(incoming);
    adoptTicks.set(new Set(state.ticked));
  }

  if (JSON.stringify(state.notes) !== JSON.stringify(notesStore.get())) {
    for (const { path, line, message } of agentSaid(state)) {
      toast(`${message.asking === true ? "asked" : "agent"} on ${path}:${line} — ${message.text}`);
    }
    notesStore.set(state.notes);
    for (const editor of liveEditors.values()) {
      editor.refreshNotes();
    }
  }

  for (const [path, file] of Object.entries(state.files)) {
    const editor = liveEditors.get(path);
    if (editor !== undefined && file.sha !== editor.sha()) {
      const fresh = await fetch("/file", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Review-Token": server.token },
        body: JSON.stringify({ path }),
      })
        .then((result) => result.json() as Promise<{ after: string; sha: string; added: number; removed: number }>)
        .catch(() => undefined);
      if (fresh !== undefined) {
        editor.applyFromDisk(fresh);
        toast(`${path} updated — diff refreshed`, "done");
      }
    }
  }
};

const main = async (): Promise<void> => {
  document.title = meta.title;

  followPageTheme();

  await loadNotes();
  const initialTicks = await loadTicks();
  setLastFromServer(ticksSignature(initialTicks));

  const root = document.getElementById("app");
  if (root === null) {
    throw new Error("the page has no #app to render into");
  }
  render(<App initialTicks={initialTicks} />, root);

  if (server !== undefined) {
    setInterval(pollState, 2_000);
  }
};

main().catch((error: unknown) => {
  console.error("failed to start guided review", error);
});
