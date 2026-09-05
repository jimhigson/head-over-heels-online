import { useLayoutEffect, useRef, useState } from "preact/hooks";

import { diffViewStore, setDiffView } from "../diffView.ts";
import faviconUrl from "../favicon.png";
import { notesAsMarkdown, notesStore } from "../notes.ts";
import { offlineStore } from "../offline.ts";
import { meta, server, total } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { useStore } from "../stores.ts";
import { setTheme, themeStore } from "../theme.ts";
import { StackBar } from "./StackBar.tsx";

export type HeaderProps = { state: ReadingState };

export const Header = ({ state }: HeaderProps) => {
  const [copyLabel, setCopyLabel] = useState("Copy notes");
  const [handoffLabel, setHandoffLabel] = useState("Send notes to agent");
  const headerRef = useRef<HTMLElement>(null);
  const diffView = useStore(diffViewStore);
  const theme = useStore(themeStore);
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
      <StackBar state={state} />
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
          <div class="control-group" role="group" aria-label="How every diff is shown">
            <button
              type="button"
              class="control segment"
              aria-pressed={diffView === "inline"}
              aria-label="Inline"
              title="Inline"
              onClick={() => setDiffView("inline")}
            >
              {""}
            </button>
            <button
              type="button"
              class="control segment"
              aria-pressed={diffView === "sideBySide"}
              aria-label="Side by side"
              title="Side by side"
              onClick={() => setDiffView("sideBySide")}
            >
              {""}
            </button>
          </div>
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
        <div class="control-group theme-switcher" role="group" aria-label="Colour theme">
          <button
            type="button"
            class="control segment"
            aria-pressed={theme === "light"}
            aria-label="Light"
            title="Light"
            onClick={() => setTheme("light")}
          >
            {""}
          </button>
          <button
            type="button"
            class="control segment"
            aria-pressed={theme === "dark"}
            aria-label="Dark"
            title="Dark"
            onClick={() => setTheme("dark")}
          >
            {""}
          </button>
        </div>
        <a
          class="brand-link"
          href="https://blockstack.ing"
          target="_blank"
          rel="noreferrer"
          title="Head over Heels Online"
        >
          <img class="brand-icon" src={faviconUrl} alt="Head over Heels Online" width={24} height={24} />
        </a>
      </div>
    </header>
  );
};
