import { type Page } from "@playwright/test";

/**
 * driving the world in an e2e build: nothing moves on its own, so anything a
 * test waits for the world to do has to be stepped on from here.
 *
 * Kept apart from the query and interaction helpers because both of those need
 * it, and importing it from either would put a cycle between them
 */

/** advance the simulation by a duration of game time, in one deterministic step */
export const fastForwardGameTime = (
  page: Page,
  durationMs: number,
): Promise<void> =>
  page.evaluate((ms) => {
    const advanceTime = window.__e2e_advanceTime;
    if (advanceTime === undefined) {
      throw new Error(
        "__e2e_advanceTime is not on the window - is this a visual-regression build?",
      );
    }
    advanceTime(ms);
  }, durationMs);

/**
 * draw a frame without moving the world on: an advance of no time still runs
 * every listener, the renderer among them. In an e2e build nothing paints on
 * its own, so this is how a capture is taken of state that has just changed
 */
export const paintFrame = (page: Page): Promise<void> =>
  fastForwardGameTime(page, 0);

/**
 * give keys that have just gone down a frame to become a direction to walk in.
 *
 * The frame a key goes down on is the frame it counts as newly pressed, which
 * is what starts a jump, but the direction it implies is only worked out from
 * there - so a hold that goes straight into a long advance would spend all of
 * it standing still. This spends a millisecond instead
 */
export const settleInput = (page: Page): Promise<void> =>
  fastForwardGameTime(page, 1);

/**
 * keep the app ticking while waiting for something outside the world - a dialog
 * to appear, a chunk to load, a button to become clickable. An e2e build has no
 * frames of its own, so a plain wait would sit watching an app that never gets
 * another tick to render, react to a keypress, or notice that its loading
 * finished.
 *
 * None of the frames carry game time, so however many it takes, nothing moves
 */
export const whilePainting = async <Awaited>(
  page: Page,
  waitedFor: Promise<Awaited>,
): Promise<Awaited> => {
  let settled = false;
  const stopPainting = () => {
    settled = true;
  };
  waitedFor.then(stopPainting, stopPainting);

  while (!settled) {
    await paintFrame(page).catch(stopPainting);
  }

  return waitedFor;
};

/**
 * is a menu covering the game? Read from the store rather than the DOM because
 * that is what the game itself goes by, and it knows a frame before the dialog
 * has rendered - so a caller can stop driving the world at the same moment the
 * game stops running it, rather than a render later.
 */
export const isGameMenuOpen = (page: Page): Promise<boolean> =>
  page.evaluate(
    () => (window._e2e_store?.getState().gameMenus.openMenus.length ?? 0) > 0,
  );

/**
 * step *game* time on until something has happened, or the budget runs out.
 *
 * Nothing moves on its own in an e2e build, so waiting in wall-clock waits for
 * ever; and how long a thing takes is a function of game time anyway, so
 * stepping it is both deterministic and as quick as the machine can manage
 */
export const advanceUntil = async (
  page: Page,
  happened: () => Promise<boolean>,
  { stepMs = 250, maxMs = 30_000 }: { stepMs?: number; maxMs?: number } = {},
): Promise<boolean> => {
  // a step of zero paints without moving the world, so the budget counts polls
  // rather than game time - otherwise it would never be spent
  const polls = Math.ceil(maxMs / Math.max(stepMs, 16));
  for (let poll = 0; poll < polls; poll++) {
    if (await happened()) {
      return true;
    }
    if (await isGameMenuOpen(page)) {
      // the world is paused behind a menu, so moving time on would do nothing -
      // but it still has to be drawn, and the menu still has to be ticked for
      // it to notice a key that closes it
      await paintFrame(page);
      continue;
    }
    await fastForwardGameTime(page, stepMs);
  }
  return happened();
};

/**
 * run the whole stepping loop inside the page, for a condition the page can
 * answer on its own.
 *
 * The steps are the same as {@link advanceUntil} takes, in the same order, for
 * the same game time - what differs is that looking, deciding and stepping cost
 * one call between them rather than one call each. A wait that runs to hundreds
 * of steps pays that per step, and on a slow machine the round trips come to
 * more than whatever is being waited for.
 *
 * The predicate crosses as source, since functions are not serialisable
 */
export const advanceUntilInPageSource = (
  page: Page,
  readySource: string,
  { stepMs = 250, maxMs = 30_000 }: { stepMs?: number; maxMs?: number } = {},
): Promise<boolean> =>
  page.evaluate(
    async ({ readySource, stepMs, polls }) => {
      const ready = new Function(`return (${readySource})`)() as () =>
        boolean | Promise<boolean>;

      const advanceTime = window.__e2e_advanceTime;
      if (advanceTime === undefined) {
        throw new Error(
          "__e2e_advanceTime is not on the window - is this a visual-regression build?",
        );
      }
      const menuIsOpen = () =>
        (window._e2e_store?.getState().gameMenus.openMenus.length ?? 0) > 0;

      for (let poll = 0; poll < polls; poll++) {
        if (await ready()) {
          return true;
        }
        // behind a menu the world is paused, so moving time on would do
        // nothing - but it still has to be drawn, and ticked to notice the key
        // that closes it
        advanceTime(menuIsOpen() ? 0 : stepMs);
        // let whatever that frame scheduled - a render, a dispatch - run before
        // looking again, so the predicate sees a settled page
        await Promise.resolve();
      }
      return ready();
    },
    // a step of zero paints without moving the world, so the budget counts
    // polls rather than game time - otherwise it would never be spent
    { readySource, stepMs, polls: Math.ceil(maxMs / Math.max(stepMs, 16)) },
  );

/**
 * the game-time equivalent of `page.waitForFunction`: keep stepping the world
 * on until the predicate holds in the page. Anything a test waits for that the
 * *world* has to do - a character landing, a fish being eaten - needs this
 * rather than a poll, which would sit watching a frozen world
 */
export const advanceUntilInPage = async (
  page: Page,
  ready: () => boolean,
  describeWhatWasWaitedFor: string,
  options: { stepMs?: number; maxMs?: number } = {},
): Promise<void> => {
  const happened = await advanceUntilInPageSource(
    page,
    ready.toString(),
    options,
  );
  if (!happened) {
    throw new Error(`timed out advancing until ${describeWhatWasWaitedFor}`);
  }
};

/**
 * as {@link advanceUntilInPage}, but the caller does its own `page.evaluate` -
 * for a predicate that needs a value passing into the browser, where the types
 * belong at the call site
 */
export const advanceUntilTrue = async (
  page: Page,
  check: () => Promise<boolean>,
  describeWhatWasWaitedFor: string,
  options: { stepMs?: number; maxMs?: number } = {},
): Promise<void> => {
  const happened = await advanceUntil(page, check, options);
  if (!happened) {
    throw new Error(`timed out advancing until ${describeWhatWasWaitedFor}`);
  }
};
