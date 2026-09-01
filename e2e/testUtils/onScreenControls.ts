import { type Page } from "@playwright/test";

import { type ButtonId } from "../../src/game/render/hud/HudButtonRenderer";
import { fastForwardGameTime, whilePainting } from "./advanceGameTime";
import { dispatchToStore } from "./gameStateQueries";
import { osSlowness } from "./infrastructure";

/**
 * The pixi scene-graph label of each button's visible content. The
 * jump/fire/carry buttons use an {@link ArcadeStyleButtonContainer} (labelled
 * `arcadeButton (which)`); the menu/map/rotate buttons are plain text containers.
 */
const buttonContentLabel = {
  jump: "arcadeButton (jump)",
  fire: "arcadeButton (fire)",
  carry: "arcadeButton (carry)",
  carryAndJump: "arcadeButton (carryAndJump)",
  menu: "menuText",
  map: "mapText",
  rotateAnticlockwise: "rotateText.↺",
  rotateClockwise: "rotateText.↻",
} as const satisfies { [K in ButtonId]: string };

/**
 * Turn on the touch-style on-screen controls (joystick + jump/fire/carry
 * buttons). Normally toggled from the options menus, but a test can flip the
 * user setting directly. The HUD rebuilds on the next render tick, so callers
 * should wait for the button to appear (eg via {@link onScreenButtonClientCentre}).
 */
export const enableOnScreenControls = (page: Page) =>
  dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "onScreenControls", value: true },
  });

/**
 * The page (client) coordinates at which a real pointer is guaranteed to land
 * on an on-screen control button.
 *
 * Rather than trusting that the button merely exists in the scene graph, this
 * waits until pixi's own event system reports the button as the hit-test
 * target at that point — i.e. the HUD has been (re)built and ticked, the
 * button is positioned, visible, interactive, and not occluded by anything
 * else. Only then can a click be sent without racing the app's readiness.
 */
export const onScreenButtonClientCentre = async (
  page: Page,
  which: ButtonId,
): Promise<{ x: number; y: number }> => {
  // painted while polling: the HUD is only built and positioned by a tick, and
  // in an e2e build no tick happens unless this asks for one
  const handle = await whilePainting(
    page,
    page.waitForFunction(
      (label) => {
        type PixiNode = {
          label?: null | string;
          eventMode?: string;
          parent?: null | PixiNode;
          children?: PixiNode[];
          getBounds: () => {
            minX: number;
            minY: number;
            maxX: number;
            maxY: number;
          };
        };
        type PixiApp = {
          stage: PixiNode;
          canvas: HTMLCanvasElement;
          renderer: {
            screen: { width: number; height: number };
            lastObjectRendered: PixiNode | undefined;
            events: {
              rootBoundary: {
                rootTarget: PixiNode | undefined;
                hitTest: (x: number, y: number) => null | PixiNode;
              };
            };
          };
        };

        const app = window._e2e_pixiApplication as unknown as
          PixiApp | undefined;
        if (!app) {
          return null;
        }

        const findByLabel = (
          container: PixiNode,
          target: string,
        ): null | PixiNode => {
          if (container.label === target) {
            return container;
          }
          for (const child of container.children ?? []) {
            const found = findByLabel(child, target);
            if (found) {
              return found;
            }
          }
          return null;
        };

        const isSelfOrAncestor = (
          node: null | PixiNode | undefined,
          maybeAncestor: PixiNode,
        ): boolean => {
          for (let n = node; n; n = n.parent) {
            if (n === maybeAncestor) {
              return true;
            }
          }
          return false;
        };

        const content = findByLabel(app.stage, label);
        if (!content) {
          return null;
        }

        // the interactive button is the nearest ancestor pixi will hit-test
        // (its handlers live there); the content sits passively inside it
        let interactive: null | PixiNode | undefined = content;
        while (interactive && interactive.eventMode !== "static") {
          interactive = interactive.parent;
        }
        if (!interactive) {
          // not yet wired up for input
          return null;
        }

        const bounds = content.getBounds();
        const globalX = (bounds.minX + bounds.maxX) / 2;
        const globalY = (bounds.minY + bounds.maxY) / 2;

        // the decisive readiness check: pixi must route a pointer at this point
        // to our button. Fails while the button is unpositioned, hidden, or
        // covered by another container, so we never click prematurely.
        // pixi roots its event boundary only when it handles a pointer event of
        // its own, so a hit test before the first one has no tree to walk.
        // Root it at whatever was last drawn - exactly what pixi does itself
        // whenever a pointer reaches the canvas
        const { lastObjectRendered } = app.renderer;
        if (!lastObjectRendered) {
          // nothing has been drawn, so there is nothing to hit yet
          return null;
        }
        app.renderer.events.rootBoundary.rootTarget = lastObjectRendered;

        const hit = app.renderer.events.rootBoundary.hitTest(globalX, globalY);
        if (!isSelfOrAncestor(hit, interactive)) {
          return null;
        }

        const rect = app.canvas.getBoundingClientRect();
        const scaleX = rect.width / app.renderer.screen.width;
        const scaleY = rect.height / app.renderer.screen.height;
        const centre = {
          x: rect.left + globalX * scaleX,
          y: rect.top + globalY * scaleY,
        };

        // also require the position to be stable across two polls: a button is
        // briefly at its default (0,0) before the first HUD tick moves it, and
        // we must not click the stale spot.
        const cacheKey = `__e2eButtonCentre_${label}`;
        const cache = window as unknown as Record<
          string,
          { x: number; y: number } | undefined
        >;
        const previous = cache[cacheKey];
        cache[cacheKey] = centre;
        if (
          previous === undefined ||
          Math.abs(previous.x - centre.x) > 0.5 ||
          Math.abs(previous.y - centre.y) > 0.5
        ) {
          return null;
        }
        return centre;
      },
      buttonContentLabel[which],
      { timeout: 15_000 * osSlowness, polling: "raf" },
    ),
  );
  // waitForFunction only resolves once the predicate returns a truthy value,
  // so the handle never wraps the null branch here
  return handle.jsonValue() as Promise<{ x: number; y: number }>;
};

/**
 * Press an on-screen control button at its current centre, run `whileHeld`
 * (typically asserting the button's effect), then release.
 *
 * The button is held down for the whole of `whileHeld` rather than tapped:
 * the engine samples input per frame and only treats a press as a tap on the
 * frame the action first goes down, so a quick press+release can fall entirely
 * between two frames and be missed. Holding guarantees the edge is captured.
 */
export const withOnScreenButtonHeld = async (
  page: Page,
  which: ButtonId,
  whileHeld: () => Promise<void>,
) => {
  const { x, y } = await onScreenButtonClientCentre(page, which);
  await page.mouse.move(x, y);
  await page.mouse.down();
  try {
    // the press is read inside a tick, and game time only passes when asked
    // for - so hold it across an advance rather than merely in wall-clock:
    await fastForwardGameTime(page, 250);
    await whileHeld();
  } finally {
    await page.mouse.up();
  }
};
