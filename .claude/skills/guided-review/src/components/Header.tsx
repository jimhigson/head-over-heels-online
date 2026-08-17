import { useLayoutEffect, useRef, useState } from "preact/hooks";

import { type DiffView, diffViewStore, setDiffView } from "../diffView.ts";
import { notesAsMarkdown, notesStore } from "../notes.ts";
import { offlineStore } from "../offline.ts";
import { meta, server, total } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { StackBar } from "./StackBar.tsx";

export type HeaderProps = { state: ReadingState };

export const Header = ({ state }: HeaderProps) => {
  const [copyLabel, setCopyLabel] = useState("Copy notes");
  const [handoffLabel, setHandoffLabel] = useState("Send notes to agent");
  const headerRef = useRef<HTMLElement>(null);
  const diffView = useStore(diffViewStore);
  const offline = useStore(offlineStore);

  // the contents and the group headings stick below this header, whatever
  // height its controls wrap to
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (header === null) {
      return;
    }
    const measure = () =>
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    return () => observer.disconnect();
  }, []);

  const copyNotes = async () => {
    const markdown = notesAsMarkdown();
    if (markdown === "") {
      setCopyLabel("No notes yet");
    } else {
      await navigator.clipboard.writeText(markdown).catch(() => undefined);
      setCopyLabel("Notes copied");
    }
    setTimeout(() => setCopyLabel("Copy notes"), 1_200);
  };

  const handOff = async () => {
    const response = await fetch("/handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Review-Token": server?.token ?? "" },
      body: JSON.stringify(notesStore.get()),
    }).catch(() => undefined);
    const result =
      response?.ok === true ? ((await response.json()) as { count: number }) : undefined;
    setHandoffLabel(
      result === undefined ? "Send failed"
      : result.count === 0 ? "No notes yet"
      : `Sent ${result.count} — ask the agent to pick them up`,
    );
    setTimeout(() => setHandoffLabel("Send notes to agent"), 4_000);
  };

  const done = state.ticked.size;

  return (
    <header class="top" ref={headerRef}>
      <StackBar />
      <div class="top-inner">
        <p class="top-title">{meta.headerTitle ?? meta.title}</p>
        {offline && (
          <span
            class="offline-chip"
            title="no network — the review server is local, so everything keeps working; notes queue here for the agent to pick up later"
          >
            offline — notes queue locally
          </span>
        )}
        <div class="meter">
          <div class="track">
            <div class="fill" style={`width: ${total === 0 ? 0 : (done / total) * 100}%`} />
          </div>
          <span class="count">
            {done}/{total}
          </span>
        </div>
        <div class="controls">
          <button
            class="control"
            type="button"
            aria-pressed={state.showContents}
            aria-controls="contents"
            onClick={() => state.setShowContents(!state.showContents)}
          >
            Contents
          </button>
          <button class="control" type="button" onClick={() => state.setAllDiffs(true)}>
            Open all diffs
          </button>
          <button class="control" type="button" onClick={() => state.setAllDiffs(false)}>
            Close all
          </button>
          <label class="control select">
            <span>Diffs</span>
            <select
              value={diffView}
              aria-label="How every diff is shown"
              onChange={(event) => setDiffView(event.currentTarget.value as DiffView)}
            >
              <option value="inline">inline</option>
              <option value="sideBySide">side by side</option>
            </select>
          </label>
          <button class="control" type="button" onClick={copyNotes}>
            {copyLabel}
          </button>
          {server !== undefined && (
            <button class="control" type="button" onClick={handOff}>
              {handoffLabel}
            </button>
          )}
          <button class="control" type="button" onClick={state.clearTicks}>
            Clear ticks
          </button>
        </div>
      </div>
    </header>
  );
};
