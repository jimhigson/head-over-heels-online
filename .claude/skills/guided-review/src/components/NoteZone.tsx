import { useLayoutEffect, useRef, useState } from "preact/hooks";

import {
  awaitingReply,
  messagesOf,
  noteAt,
  notesStore,
  removeNote,
  sayOnNote,
} from "../notes.ts";
import { offlineStore } from "../offline.ts";
import { useStore } from "../stores.ts";

/** what has been typed but not sent, so a redraw mid-sentence loses nothing */
const drafts = new Map<string, string>();

/** the one line whose box should take the caret on this draw */
let focusLine: number | undefined;

export const focusNoteOnLine = (line: number): void => {
  focusLine = line;
};

export type NoteZoneProps = {
  path: string;
  line: number;
  /** the zone is finished with: rebuild them */
  done: () => void;
};

/**
 * the note ui that sits in a monaco view zone under its line: the thread so
 * far, and a box that is always open, because replying is the point rather
 * than a mode you have to enter
 */
export const NoteZone = ({ path, line, done }: NoteZoneProps) => {
  useStore(notesStore);
  const offline = useStore(offlineStore);
  const messages = messagesOf(noteAt(path, line));
  const draftKey = `${path}:${line}`;
  const [draft, setDraft] = useState(drafts.get(draftKey) ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  // only the box just opened takes the caret - a poll redrawing every zone must
  // not steal it from wherever you are typing
  useLayoutEffect(() => {
    if (focusLine !== line) {
      return;
    }
    focusLine = undefined;
    // monaco puts a zone's dom into the document on its own render frame, not
    // when the zone is added, and focusing an element that is not in the
    // document yet does nothing at all - so ask until it takes
    let attempts = 0;
    const takeCaret = () => {
      const textarea = textareaRef.current;
      if (textarea === null) {
        return;
      }
      textarea.focus();
      if (document.activeElement !== textarea && (attempts += 1) < 10) {
        requestAnimationFrame(takeCaret);
      }
    };
    takeCaret();
  }, [line]);

  // keeps the newest message in view rather than leaving the reader scrolled
  // up at whatever line the thread happened to open on. Same caveat as the
  // caret above: monaco hasn't laid this zone's dom out yet on this render
  // frame (it isn't in the document yet, or is still display: none while
  // monaco moves it there), so scrollHeight reads as 0 until it is - ask
  // again across frames until the thread actually has a height to scroll
  useLayoutEffect(() => {
    let attempts = 0;
    const scrollToBottom = () => {
      const thread = threadRef.current;
      if (thread === null) {
        return;
      }
      if (thread.clientHeight === 0 && (attempts += 1) < 10) {
        requestAnimationFrame(scrollToBottom);
        return;
      }
      thread.scrollTop = thread.scrollHeight;
    };
    scrollToBottom();
  }, [messages.length]);

  const send = () => {
    sayOnNote(path, line, draft);
    drafts.delete(draftKey);
    focusLine = line;
    done();
  };

  const type = (value: string) => {
    drafts.set(draftKey, value);
    setDraft(value);
  };

  // the zone's own dom node belongs to monaco, which writes an inline display
  // onto it - so the layout lives on a wrapper of ours inside it
  return (
    <div class="note-zone">
      {messages.length > 0 && (
        <div
          class="note-thread"
          ref={threadRef}
          onWheel={(event) => {
            const thread = event.currentTarget;
            // only trap it when there's actually somewhere for it to go - a
            // short thread with nothing to scroll leaves the wheel for the
            // editor underneath, same as before
            if (thread.scrollHeight > thread.clientHeight) {
              event.stopPropagation();
            }
          }}
        >
          {messages.map((message, index) => (
            <p class={`note-message note-from-${message.from}`} key={index}>
              <span class="note-who">{message.from === "agent" ? "agent" : "you"}</span>
              {message.text}
            </p>
          ))}
          {awaitingReply(messages) &&
            (offline ?
              <div class="note-pending">
                <span>saved locally — an agent will pick this up later</span>
              </div>
            : <div class="note-pending">
                <span class="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>the agent is on it — the reply lands here</span>
              </div>)}
        </div>
      )}

      <textarea
        ref={textareaRef}
        rows={2}
        value={draft}
        placeholder={
          messages.length > 0 ? "reply…"
            // line 0 is a whole-file note: images have no lines to note on
          : line === 0 ? "note on this file — ask for a change, or say what you think"
          : `note on line ${line} — ask for a change, or say what you think`
        }
        onInput={(event) => type(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            send();
          }
        }}
      />

      <div class="note-actions">
        <button type="button" onClick={send}>
          {messages.length === 0 ? "Save note" : "Send"}
        </button>
        {messages.length === 0 ?
          <button
            type="button"
            onClick={() => {
              drafts.delete(draftKey);
              done();
            }}
          >
            Cancel
          </button>
        : <button
            type="button"
            onClick={() => {
              drafts.delete(draftKey);
              removeNote(path, line);
              done();
            }}
          >
            Delete
          </button>
        }
        <span class="note-stamp">
          {line === 0 ? "whole file" : `line ${line}`} · ⌘↵ sends
        </span>
      </div>
    </div>
  );
};
