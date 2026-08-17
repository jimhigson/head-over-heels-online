import { useEffect, useRef, useState } from "preact/hooks";

import { notesStore } from "../notes.ts";
import { links, stats, statusLabel } from "../payload.ts";
import { type ReviewFile } from "../ReviewPayload.ts";
import { registerRow, unregisterRow } from "../rowNodes.ts";
import { useStore } from "../stores.ts";
import { MonacoDiff } from "./MonacoDiff.tsx";

export type RowProps = {
  file: ReviewFile;
  ticked: boolean;
  collapsed: boolean;
  diffOpen: boolean;
  active: boolean;
  onTick: (on: boolean) => void;
  onCollapse: (on: boolean) => void;
  onDiff: (on: boolean) => void;
};

export const Row = ({
  file,
  ticked,
  collapsed,
  diffOpen,
  active,
  onTick,
  onCollapse,
  onDiff,
}: RowProps) => {
  const [counts, setCounts] = useState<[number, number]>(stats[file.path] ?? [0, 0]);
  const [copied, setCopied] = useState(false);
  // opening a diff mounts its editor; closing only hides it, so an unsaved edit
  // survives the file being ticked away and reopened
  const [mounted, setMounted] = useState(false);
  const notes = useStore(notesStore)[file.path] ?? [];
  const nodeRef = useRef<HTMLDivElement>(null);

  // the contents scrolls to these, and the app watches them to know which file
  // is being read
  useEffect(() => {
    const node = nodeRef.current;
    if (node === null) {
      return;
    }
    registerRow(file.id, node);
    return () => unregisterRow(file.id, node);
  }, [file.id]);

  useEffect(() => {
    if (diffOpen) {
      setMounted(true);
    }
  }, [diffOpen]);

  const copyPath = async () => {
    try {
      await navigator.clipboard.writeText(file.path);
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {
      /* clipboard blocked - the path is selectable anyway */
    }
  };

  const [added, removed] = counts;
  const href = links[file.path];

  return (
    <div
      class={`row ${ticked ? "is-ticked" : ""} ${active ? "is-active" : ""}`}
      ref={nodeRef}
      data-path={file.path}
    >
      <div class="row-head" onClick={() => onCollapse(!collapsed)}>
        <input
          class="tick"
          type="checkbox"
          checked={ticked}
          aria-label={`Read ${file.path}`}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => onTick(event.currentTarget.checked)}
        />
        <span class={`chip chip-${file.status}`}>{statusLabel[file.status] ?? file.status}</span>
        <button
          type="button"
          class={`path ${copied ? "copied" : ""}`}
          title="Copy path"
          onClick={(event) => {
            event.stopPropagation();
            copyPath();
          }}
        >
          {file.path}
        </button>
        {href !== undefined && (
          <a
            class="github"
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            GitHub ↗
          </a>
        )}
        {notes.length > 0 && <span class="note-count">{notes.length}</span>}
        <span class="row-stat">
          <span class="stat-add">+{added}</span> <span class="stat-rm">−{removed}</span>
        </span>
        <button
          type="button"
          class="caret"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand this file" : "Collapse this file"}
          onClick={(event) => {
            event.stopPropagation();
            onCollapse(!collapsed);
          }}
        >
          {collapsed ? "▸" : "▾"}
        </button>
      </div>

      <div class="row-body" hidden={collapsed}>
        <p class="note" dangerouslySetInnerHTML={{ __html: file.note ?? "" }} />
        <div class="diff">
          <button
            type="button"
            class="diff-toggle"
            aria-expanded={diffOpen}
            onClick={() => onDiff(!diffOpen)}
          >
            <span>{diffOpen ? "Hide diff" : "Show diff"}</span>
          </button>
          {mounted && (
            <div hidden={!diffOpen}>
              <MonacoDiff path={file.path} setCounts={setCounts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
