import { useEffect, useState } from "preact/hooks";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Button } from "../../../src/ui/Button";
import { Switch } from "../../../src/ui/Switch";
import {
  artHashOf,
  type GlyphOverrides,
  type PixelKey,
  type PixelRuleSetting,
  type VectorShape,
} from "../geometry/glyphOverrides";
import { charLabel } from "./charLabel";
import { CharStrip } from "./CharStrip";
import { GlyphView, type Selection } from "./GlyphView";
import { RulePanel } from "./RulePanel";
import { seedShapes } from "./seedShapes";
import { useGlyphs, usePixelRules } from "./useGlyphs";
import { useSpritesheet } from "./useSpritesheet";
import { VectorPanel } from "./VectorPanel";

const zoom = 88;

export const FontEditor = () => {
  const image = useSpritesheet();
  const [overrides, setOverrides] = useState<GlyphOverrides>({});
  const [char, setChar] = useState("A");
  const [selection, setSelection] = useState<Selection | undefined>(undefined);
  const [status, setStatus] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fontFamily, setFontFamily] = useState<string | undefined>(undefined);
  const [pixel, setPixel] = useState<PixelKey | undefined>(undefined);
  const [showArt, setShowArt] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    fetch("/__overrides")
      .then((response) => response.json())
      .then(setOverrides)
      .catch((e: unknown) =>
        setStatus(`could not read overrides: ${String(e)}`),
      );
  }, []);

  const glyphs = useGlyphs(image, overrides);
  const glyph = glyphs.find((candidate) => candidate.char === char);
  const pixelRules = usePixelRules(glyph);

  useEffect(() => {
    // a cell of one character means nothing in the next
    setPixel(undefined);
  }, [char]);

  const override = overrides[char];
  const shapes = override?.shapes ?? [];
  const inVectorMode = override?.vectorMode === true;

  const changeOverride = (
    change: (was: GlyphOverrides[string] | undefined) => GlyphOverrides[string],
  ) => {
    setOverrides((was) => ({ ...was, [char]: change(was[char]) }));
    setDirty(true);
  };

  const setShapes = (next: VectorShape[]) =>
    changeOverride((was) => ({
      vectorMode: was?.vectorMode ?? true,
      ...was,
      shapes: next,
      artHash: glyph === undefined ? was?.artHash : artHashOf(glyph.bitmap),
    }));

  const toggleVectorMode = () => {
    if (glyph === undefined) {
      return;
    }
    if (inVectorMode) {
      changeOverride((was) => ({ ...was, vectorMode: false }));
      setStatus(`${char} back on the kernel rules - its outline is kept`);
      return;
    }
    const existing = override?.shapes;
    if (existing !== undefined && existing.length > 0) {
      changeOverride((was) => ({ ...was, vectorMode: true }));
      setStatus(`${char} back on its hand-drawn outline`);
      return;
    }
    const { shapes: seeded, unconverted } = seedShapes(glyph.outline);
    changeOverride((was) => ({
      ...was,
      vectorMode: true,
      shapes: seeded,
      artHash: artHashOf(glyph.bitmap),
    }));
    setStatus(
      unconverted === 0 ?
        `${char} traced into ${seeded.length} editable shape(s)`
      : `${char} traced into ${seeded.length} shape(s); ${unconverted} curved one(s) need redrawing with the circle and corner tools`,
    );
  };

  /**
   * turn a set of rules off, or back on if every one of them is already off -
   * so the same control works for one rule and for a whole branch of them
   */
  const toggleRules = (ruleNames: readonly string[]) =>
    changeOverride((was) => {
      const disabled = was?.disabledRules ?? [];
      const allOff = ruleNames.every((name) => disabled.includes(name));
      return {
        vectorMode: false,
        ...was,
        disabledRules:
          allOff ?
            disabled.filter((name) => !ruleNames.includes(name))
          : [...new Set([...disabled, ...ruleNames])],
      };
    });

  /** throw away the hand-drawn outline, putting the character on the rules */
  const deleteOutline = () => {
    changeOverride((was) => ({
      ...was,
      vectorMode: false,
      shapes: undefined,
      artHash: undefined,
    }));
    setSelection(undefined);
    setStatus(`${char}'s outline deleted - back on the kernel rules`);
  };

  /** take the character back to what the rules alone make of its art */
  const revertToDefault = () => {
    setOverrides(({ [char]: _dropped, ...rest }) => rest);
    setDirty(true);
    setSelection(undefined);
    setPixel(undefined);
    setStatus(`${char} reverted - every setting for it dropped`);
  };

  /**
   * change what one cell says about some rules. A setting that says nothing -
   * inheriting, with no mode chosen - is removed rather than written out, so
   * the file holds only what was decided
   */
  const changePixelRules = (
    cell: PixelKey,
    ruleNames: readonly string[],
    change: (was: PixelRuleSetting) => PixelRuleSetting,
  ) =>
    changeOverride((was) => {
      const forCell = { ...(was?.pixelRules?.[cell] ?? {}) };
      for (const name of ruleNames) {
        const next = change(forCell[name] ?? {});
        if (
          next.on === undefined &&
          Object.keys(next.options ?? {}).length === 0
        ) {
          delete forCell[name];
        } else {
          forCell[name] = next;
        }
      }
      const pixelRules = { ...(was?.pixelRules ?? {}) };
      if (Object.keys(forCell).length === 0) {
        delete pixelRules[cell];
      } else {
        pixelRules[cell] = forCell;
      }
      return { ...was, pixelRules };
    });

  const save = async () => {
    setBusy(true);
    try {
      // a character left with nothing to say - every rule as it comes and no
      // outline drawn - is dropped rather than committed as an empty entry
      const saying = Object.fromEntries(
        Object.entries(overrides).filter(
          ([, entry]) =>
            (entry.shapes?.length ?? 0) > 0 ||
            (entry.disabledRules?.length ?? 0) > 0 ||
            Object.keys(entry.pixelRules ?? {}).length > 0,
        ),
      );
      const response = await fetch("/__overrides", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(saying),
      });
      setStatus(response.ok ? "saved to glyphOverrides.json" : "save failed");
      setDirty(!response.ok);
    } finally {
      setBusy(false);
    }
  };

  const rebuild = async () => {
    setBusy(true);
    setStatus("building the font...");
    try {
      const { ok, output } = await (
        await fetch("/__rebuild", { method: "POST" })
      ).json();
      setStatus(output.trim().split("\n").slice(-2).join(" — "));
      if (ok) {
        // the built face is registered under a fresh name so the specimen
        // shows this build rather than a cached earlier one
        const family = `blockstackSmooth${Date.now()}`;
        const face = new FontFace(family, `url(/__smoothFont?t=${Date.now()})`);
        await face.load();
        document.fonts.add(face);
        setFontFamily(family);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class="editor-shell">
      <header class="editor-header">
        <h1 class="editor-title">font outlines — {char}</h1>
        <span class="editor-note">{status}</span>
        <Button disabled={busy || !dirty} onClick={save}>
          save{dirty ? " •" : ""}
        </Button>
        <Button disabled={busy} onClick={rebuild}>
          rebuild font
        </Button>
      </header>

      {/* the three panes drag against each other, the same way the level
          editor's do and styled to match - a glyph blown up this large wants
          the room, and how much of it is a matter of what is being looked at */}
      <PanelGroup direction="horizontal" className="editor-body">
        <Panel id="chars" defaultSize={26} minSize={8} collapsible>
          <CharStrip glyphs={glyphs} selected={char} onSelect={setChar} />
        </Panel>

        <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite hover:border-moss hover:bg-moss border-r-[calc(1px*var(--scale))] border-metallicBlue" />

        <Panel id="glyph">
          <main class="editor-main">
            {glyph === undefined ?
              <p>loading the spritesheet…</p>
            : <>
                <div class="editor-row">
                  <Switch
                    value={inVectorMode}
                    label="vector mode"
                    ariaLabel="draw this character by hand rather than by the kernel rules"
                    onChange={toggleVectorMode}
                  />
                  <Switch
                    value={showArt}
                    label="pixels"
                    ariaLabel="show the pixel art the outline came from"
                    onChange={setShowArt}
                  />
                  <Switch
                    value={showOutline}
                    label="outline"
                    ariaLabel="show the upscaled outline"
                    onChange={setShowOutline}
                  />
                  <Switch
                    value={showGrid}
                    label="grid"
                    ariaLabel="show the pixel grid over everything else"
                    onChange={setShowGrid}
                  />
                  <span class="editor-note">
                    drawn by {glyph.outline.drawnBy}
                    {glyph.outline.staleAgainstArt ?
                      " — the art has changed since this was drawn"
                    : ""}
                  </span>
                </div>

                <div class="editor-row">
                  <Button
                    disabled={shapes.length === 0}
                    onClick={deleteOutline}
                    aria-label="delete this character's hand-drawn outline"
                  >
                    delete outline
                  </Button>
                  <Button
                    disabled={override === undefined}
                    onClick={revertToDefault}
                    aria-label="drop every setting for this character"
                  >
                    revert to default
                  </Button>
                </div>

                <GlyphView
                  glyph={glyph}
                  shapes={shapes}
                  editable={inVectorMode}
                  selection={selection}
                  onSelect={setSelection}
                  onShapeChange={(shapeIndex, shape) =>
                    setShapes(
                      shapes.map((was, index) =>
                        index === shapeIndex ? shape : was,
                      ),
                    )
                  }
                  selectedPixel={pixel}
                  onSelectPixel={setPixel}
                  pixelRules={pixelRules}
                  override={override}
                  showArt={showArt}
                  showOutline={showOutline}
                  showGrid={showGrid}
                  zoom={zoom}
                />

                {/* written the way it would be pasted into a message, so a cell
                  can be pointed at without any counting or ambiguity. Greyed
                  where no rule bears on the cell - it can still be named, but
                  there is nothing to set there */}
                <p
                  class="editor-pixel-readout"
                  data-inert={
                    pixel !== undefined && !pixelRules.has(pixel) ?
                      "true"
                    : undefined
                  }
                >
                  {pixel === undefined ?
                    `char ${charLabel(char)} — no pixel selected`
                  : `pixel (${pixel}), char ${charLabel(char)}`}
                </p>

                {fontFamily !== undefined && (
                  // the woff2 the last rebuild wrote, so an edit can be read as
                  // running text and not only as an outline
                  <p class="editor-specimen" style={{ fontFamily }}>
                    Head over Heels — the quick brown fox jumps over the lazy
                    dog 0123456789 &lt;/&gt;\ ⬅➡⬆⬇
                  </p>
                )}
              </>
            }
          </main>
        </Panel>

        <PanelResizeHandle className="scale-editor w-1 bg-metallicBlueHalfbrite hover:border-moss hover:bg-moss border-l-[calc(1px*var(--scale))] border-metallicBlue" />

        <Panel id="rules" defaultSize={24} minSize={10} collapsible>
          <aside class="editor-aside">
            {glyph === undefined ?
              null
            : inVectorMode ?
              <VectorPanel
                shapes={shapes}
                selection={selection}
                onShapeChange={(shapeIndex, shape) =>
                  setShapes(
                    shapes.map((was, index) =>
                      index === shapeIndex ? shape : was,
                    ),
                  )
                }
                onShapesChange={setShapes}
                onSelect={setSelection}
              />
            : <RulePanel
                glyph={glyph}
                override={override}
                pixelRules={pixelRules}
                pixel={pixel}
                onToggleForChar={toggleRules}
                onSetForPixel={(ruleNames, setting) =>
                  pixel !== undefined &&
                  changePixelRules(pixel, ruleNames, (was) => ({
                    ...was,
                    on: setting === "inherit" ? undefined : setting === "on",
                  }))
                }
                onSetChoiceForPixel={(ruleName, optionName, choice) =>
                  pixel !== undefined &&
                  changePixelRules(pixel, [ruleName], (was) => ({
                    ...was,
                    options: { ...was.options, [optionName]: choice },
                  }))
                }
              />
            }
          </aside>
        </Panel>
      </PanelGroup>
    </div>
  );
};
