#!/usr/bin/env node
/* Block until the reviewer writes a new note, then print it and exit.
 *
 * Run in the background while serve.ts is up. It finishes the moment a note
 * appears, which is what brings the agent back to the conversation to act on it
 * - without this, notes sit in a file nobody is looking at until someone thinks
 * to check.
 *
 *   node awaitNotes.ts --notes <review>/notes.json [--timeout 1800] [--poll 0.5]
 *
 * Exits 0 either way: with the new notes as markdown on stdout, or with
 * "no new notes" if it timed out. Re-run it after acting to wait for the next.
 */

import { existsSync, readFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { parseArgs } from "node:util";

type NoteMessage = { from?: string; text?: string };
type Note = { line?: number; text?: string; messages?: NoteMessage[] };
type Notes = Record<string, Note[]>;

const { values } = parseArgs({
  options: {
    notes: { type: "string" },
    timeout: { type: "string", default: "1800" },
    poll: { type: "string", default: "0.5" },
  },
});

if (values.notes === undefined) {
  console.log("awaitNotes.ts --notes <review>/notes.json [--timeout 1800] [--poll 0.5]");
  process.exit(1);
}

const notesFile = values.notes;
const timeoutMs = Number(values.timeout) * 1_000;
const pollMs = Number(values.poll) * 1_000;

const read = (): Notes => {
  if (!existsSync(notesFile)) {
    return {};
  }
  try {
    return JSON.parse(readFileSync(notesFile, "utf8")) as Notes;
  } catch {
    // caught mid-write; the next poll will see it whole
    return {};
  }
};

/** the reviewer's side of each thread - your own replies must not wake you */
const flatten = (notes: Notes): Map<string, string> => {
  const said = (note: Note): string => {
    // a note is a thread; the single-text shape it started as is its first
    // message. Anything else is read as empty rather than crashing the wait
    const messages =
      Array.isArray(note.messages) ? note.messages
      : note.text === undefined ? []
      : [{ from: "reviewer", text: note.text }];
    return messages
      .filter((message) => message.from !== "agent")
      .map((message) => message.text ?? "")
      .join(" | ");
  };

  return new Map(
    Object.entries(notes).flatMap(([path, forPath]) =>
      forPath
        .filter((note) => note.line !== undefined)
        .map((note) => [`${path}:${note.line}`, said(note)] as const),
    ),
  );
};

const before = flatten(read());
const deadline = performance.now() + timeoutMs;

while (performance.now() < deadline) {
  await sleep(pollMs);
  const now = flatten(read());
  // a changed note counts as new: the reviewer edited it to say more. A thread
  // the agent started on its own has nothing of theirs in it and is not news
  const fresh = [...now].filter(([key, text]) => text !== "" && before.get(key) !== text);
  if (fresh.length > 0) {
    console.log(`${fresh.length} new review note(s):\n`);
    for (const [where, text] of fresh.sort(([left], [right]) => (left < right ? -1 : 1))) {
      console.log(`- ${where} — ${text}`);
    }
    console.log("\nact on these now, then wait again.");
    process.exit(0);
  }
}

console.log("no new notes");
