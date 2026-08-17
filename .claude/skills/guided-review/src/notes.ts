/* A note belongs to a line of the modified side, and is a thread: what you
   asked for, and what the agent said back. Served, they persist to a json file
   beside the review; without a server there is nowhere for them to go, so the
   whole note-authoring surface stays off. */

import { server } from "./payload.ts";
import { makeStore, toast } from "./stores.ts";

export type NoteMessage = {
  from: "agent" | "reviewer";
  text: string;
  /** the agent asked something rather than reporting what it did */
  asking?: boolean;
};

export type Note = {
  line: number;
  messages?: NoteMessage[];
  /** the single-text shape a note started as */
  text?: string;
};

export type Notes = Record<string, Note[]>;

export const notesStore = makeStore<Notes>({});

export const notesFor = (path: string): Note[] => notesStore.get()[path] ?? [];

export const noteAt = (path: string, line: number): Note | undefined =>
  notesFor(path).find((note) => note.line === line);

/** the single-text shape a note started as reads as its first message */
export const messagesOf = (note: Note | undefined): NoteMessage[] =>
  note === undefined ? []
  : note.messages ?? (note.text === undefined ? [] : [{ from: "reviewer", text: note.text }]);

export const loadNotes = async (): Promise<void> => {
  if (server === undefined) {
    return;
  }
  const response = await fetch("/notes").catch(() => undefined);
  notesStore.set(response?.ok === true ? ((await response.json()) as Notes) : {});
};

export const saveNotes = async (): Promise<void> => {
  if (server === undefined) {
    return;
  }
  const response = await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Review-Token": server.token },
    body: JSON.stringify(notesStore.get()),
  }).catch(() => undefined);

  // silence here would be the worst kind: the note looks written and isn't
  if (response?.ok !== true) {
    toast(
      response?.status === 403 ?
        "note not saved — this page is older than the server. Reload it"
      : "note not saved — the review server isn't answering",
      "warn",
    );
  }
};

export const sayOnNote = (path: string, line: number, text: string): void => {
  if (text.trim() === "") {
    return;
  }
  const forPath = notesFor(path);
  const said: NoteMessage = { from: "reviewer", text };
  const updated =
    noteAt(path, line) === undefined ?
      [...forPath, { line, messages: [said] }].sort((a, b) => a.line - b.line)
    : forPath.map((note) =>
        note.line === line ? { line, messages: [...messagesOf(note), said] } : note,
      );
  notesStore.set({ ...notesStore.get(), [path]: updated });
  saveNotes();
};

export const removeNote = (path: string, line: number): void => {
  const remaining = notesFor(path).filter((note) => note.line !== line);
  const next = { ...notesStore.get() };
  if (remaining.length === 0) {
    delete next[path];
  } else {
    next[path] = remaining;
  }
  notesStore.set(next);
  saveNotes();
};

export const notesAsMarkdown = (): string =>
  Object.entries(notesStore.get())
    .map(
      ([path, forPath]) =>
        `### ${path}\n` +
        forPath
          .map((note) =>
            messagesOf(note)
              .map((message, index) =>
                index === 0 ?
                  `- L${note.line}: ${message.text}`
                : `  - ${message.from}: ${message.text}`,
              )
              .join("\n"),
          )
          .join("\n"),
    )
    .join("\n\n");

/** the thread's last word is the reviewer's, so a reply is coming */
export const awaitingReply = (messages: NoteMessage[]): boolean =>
  server !== undefined && messages.length > 0 && messages[messages.length - 1]?.from !== "agent";
