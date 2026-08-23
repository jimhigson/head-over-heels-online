import { useEffect, useRef, useState } from "preact/hooks";

import { files, filesInGroup, groups, images, meta } from "../payload.ts";
import { type ReadingState } from "../readingState.ts";
import { type ReviewFile } from "../ReviewPayload.ts";
import { holdActiveFile, scrollToRow, watchRows } from "../rowNodes.ts";
import { adoptTicks, saveTicks, withMembership } from "../ticks.ts";
import { filePathFromUrl, recordFileInUrl } from "../urlState.ts";
import { Group } from "./Group.tsx";
import { Header } from "./Header.tsx";
import { Intro } from "./Intro.tsx";
import { contentsWouldOverlay, Layout, useContentsOverlays } from "./Layout.tsx";
import { Toasts } from "./Toasts.tsx";

export type AppProps = { initialTicks: Set<string> };

export const App = ({ initialTicks }: AppProps) => {
  // the file a url or a reload asks to land back on - never folded away or
  // hidden behind a closed group, whatever ticked/read state says otherwise
  const restoredFile = files.find((file) => file.path === filePathFromUrl());

  const [ticked, setTicked] = useState(initialTicks);
  // a file already read loads folded away, so a reload picks up where the
  // reading did rather than reopening everything
  const [collapsed, setCollapsed] = useState(
    () =>
      new Set(
        files
          .filter((file) => ticked.has(file.path) && file.id !== restoredFile?.id)
          .map((file) => file.id),
      ),
  );
  const [closedGroups, setClosedGroups] = useState(
    () =>
      new Set(
        groups
          .map((_group, index) => index)
          .filter(
            (index) =>
              index !== restoredFile?.groupIndex &&
              filesInGroup(index).every((file) => ticked.has(file.path)),
          ),
      ),
  );
  // image rows open without a click - seeing the image IS reading the row
  const [openDiffs, setOpenDiffs] = useState(
    () => new Set(files.filter((file) => images[file.path] !== undefined).map((file) => file.id)),
  );
  const [showContents, setShowContents] = useState(() => !contentsWouldOverlay());
  const [activeId, setActiveId] = useState(restoredFile?.id ?? files[0]?.id);
  const [scrollTo, setScrollTo] = useState<string | undefined>(() => restoredFile?.id);
  const loaded = useRef(false);
  const overlays = useContentsOverlays();

  useEffect(() => {
    // the first run is the state that was just read back, and writing it
    // straight out again would only race the poll with itself
    if (loaded.current) {
      saveTicks(ticked);
    }
    loaded.current = true;
  }, [ticked]);

  // another tab on this review moving the file on under us: take its ticks, and
  // fold away whatever it has read since - but never unfold anything, or it
  // would reopen files deliberately folded here
  useEffect(
    () =>
      adoptTicks.subscribe(() => {
        const fresh = adoptTicks.get();
        setTicked(fresh);
        setCollapsed((folded) =>
          files.reduce(
            (set, file) =>
              fresh.has(file.path) && !ticked.has(file.path) ?
                withMembership(set, file.id, true)
              : set,
            folded,
          ),
        );
      }),
    [ticked],
  );

  const tickFile = (file: ReviewFile, on: boolean) => {
    setTicked((previous) => withMembership(previous, file.path, on));
    // reading a file folds it away; changing your mind brings it back
    setCollapsed((previous) => withMembership(previous, file.id, on));
  };

  const tickGroup = (index: number, on: boolean) => {
    const groupFiles = filesInGroup(index);
    setTicked((previous) =>
      groupFiles.reduce((set, file) => withMembership(set, file.path, on), previous),
    );
    setCollapsed((previous) =>
      groupFiles.reduce((set, file) => withMembership(set, file.id, on), previous),
    );
    setClosedGroups((previous) => withMembership(previous, index, on));
  };

  const goTo = (file: ReviewFile | undefined) => {
    if (file === undefined) {
      return;
    }
    setClosedGroups((previous) => withMembership(previous, file.groupIndex, false));
    setCollapsed((previous) => withMembership(previous, file.id, false));
    setActiveId(file.id);
    setScrollTo(file.id);
    if (contentsWouldOverlay()) {
      setShowContents(false);
    }
  };

  // scrolling waits for the render that opened whatever the file was inside.
  // Held so the file just scrolled to is the active one for a moment, whether
  // this scroll came from a click or - on mount - a restored url
  useEffect(() => {
    if (scrollTo === undefined) {
      return;
    }
    holdActiveFile(1_000);
    scrollToRow(scrollTo);
    setScrollTo(undefined);
  }, [scrollTo]);

  /* which file the reader is on, so the contents tracks the main pane */
  useEffect(
    () =>
      watchRows(
        files.map((file) => file.id),
        setActiveId,
      ),
    [],
  );

  // keeps the url pointed at whatever file is active, whether that came from
  // a click or from scrolling past it, so a reload lands back here
  useEffect(() => {
    const active = files.find((file) => file.id === activeId);
    if (active !== undefined) {
      recordFileInUrl(active.path);
    }
  }, [activeId]);

  const state: ReadingState = {
    ticked,
    collapsed,
    openDiffs,
    activeId,
    showContents,
    setShowContents,
    tickFile,
    tickGroup,
    goTo,
    collapseFile: (id, on) => setCollapsed((previous) => withMembership(previous, id, on)),
    openGroup: (index, on) => setClosedGroups((previous) => withMembership(previous, index, !on)),
    openDiff: (id, on) => setOpenDiffs((previous) => withMembership(previous, id, on)),
    // one control for the whole page: everything open to read, or everything
    // folded back to the bare reading order
    setAllDiffs(on) {
      setOpenDiffs(on ? new Set(files.map((file) => file.id)) : new Set());
      setCollapsed(on ? new Set() : new Set(files.map((file) => file.id)));
      if (on) {
        setClosedGroups(new Set());
      }
    },
    clearTicks() {
      setTicked(new Set());
      setCollapsed(new Set());
      setClosedGroups(new Set());
    },
  };

  return (
    <>
      <Header state={state} />
      <Layout state={state} overlays={overlays}>
        <div class="shell">
          <Intro />
          <main>
            {groups.map((group, index) => (
              <Group
                key={index}
                group={group}
                index={index}
                files={filesInGroup(index)}
                open={!closedGroups.has(index)}
                state={state}
              />
            ))}
          </main>
          <footer dangerouslySetInnerHTML={{ __html: meta.footer ?? "" }} />
        </div>
      </Layout>
      <Toasts />
    </>
  );
};
