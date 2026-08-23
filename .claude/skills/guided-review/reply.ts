#!/usr/bin/env node
/* Answer a review note, in the note itself.
 *
 * The reviewer wrote a note against a line; this puts your reply in the same
 * thread, where the page picks it up within a couple of seconds and pops a
 * toast. Use it to say what you did, or to ask the one question you need
 * answered before you can do it.
 *
 *   node reply.ts --notes <review>/notes.json --path src/foo.ts --line 12 \
 *                 --text "moved it to src/util — the import sites came with it"
 *
 *   node reply.ts --notes <review>/notes.json --path src/foo.ts --line 12 \
 *                 --text "do you want the old path re-exported?" --asking
 *
 * `--asking` only marks the message as a question, for the reviewer's eye;
 * either way the reply lands in their note box and they can type straight back.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

type NoteMessage = { from: string; text: string; asking?: boolean };
type Note = { line: number; text?: string; messages?: NoteMessage[] };
type Notes = Record<string, Note[]>;

const { values } = parseArgs({
  options: {
    notes: { type: "string" },
    path: { type: "string" },
    line: { type: "string" },
    text: { type: "string" },
    asking: { type: "boolean", default: false },
  },
});

const { notes: notesFile, path, line: lineText, text, asking } = values;
if (notesFile === undefined || path === undefined || lineText === undefined || text === undefined) {
  console.log(
    "reply.ts --notes <review>/notes.json --path <file> --line <n> --text <what to say> [--asking]",
  );
  process.exit(1);
}
const line = Number(lineText);

const notes: Notes =
  existsSync(notesFile) ? (JSON.parse(readFileSync(notesFile, "utf8")) as Notes) : {};

const forPath = (notes[path] ??= []);
let note = forPath.find((candidate) => candidate.line === line);
if (note === undefined) {
  note = { line, messages: [] };
  forPath.push(note);
}
if (note.messages === undefined) {
  note.messages = note.text === undefined ? [] : [{ from: "reviewer", text: note.text }];
  delete note.text;
}

note.messages.push({ from: "agent", text, ...(asking === true ? { asking: true } : {}) });
forPath.sort((left, right) => left.line - right.line);

writeFileSync(notesFile, JSON.stringify(notes, null, 2), "utf8");
console.log(`replied on ${path}:${line}`);
