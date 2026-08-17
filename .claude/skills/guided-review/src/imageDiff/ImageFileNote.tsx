import { useState } from "preact/hooks";

import { focusNoteOnLine, NoteZone } from "../components/NoteZone.tsx";
import { notesStore } from "../notes.ts";
import { server } from "../payload.ts";
import { useStore } from "../stores.ts";

export type ImageFileNoteProps = { path: string };

/**
 * The reviewer's note thread on an image row. An image has no lines to hang a
 * note off, so the whole file gets one thread, stored at line 0 - the same
 * shape as a line note, so replies and handoff work unchanged.
 */
export const ImageFileNote = ({ path }: ImageFileNoteProps) => {
  const notes = useStore(notesStore)[path] ?? [];
  const [editing, setEditing] = useState(false);

  if (server === undefined) {
    return null;
  }

  if (notes.length === 0 && !editing) {
    return (
      <button
        type="button"
        class="control img-add-note"
        onClick={() => {
          focusNoteOnLine(0);
          setEditing(true);
        }}
      >
        Add note
      </button>
    );
  }

  return (
    <div class="image-note">
      {notes.length === 0 ?
        <NoteZone path={path} line={0} done={() => setEditing(false)} />
      : notes.map((note) => (
          <NoteZone key={note.line} path={path} line={note.line} done={() => setEditing(false)} />
        ))
      }
    </div>
  );
};
