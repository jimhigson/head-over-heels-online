---
name: add-migration-test
description: "Add an e2e migration test by capturing localStorage from the live site and writing a Playwright test that seeds it before page load. Use when: the user says 'add a migration test', 'capture a fixture from prod', or similar."
---

# Adding a redux-persist migration test

Migration tests verify that old localStorage data from previous versions of the game loads correctly after schema changes. The fixture is captured from the live production site.

## Step 1: Capture localStorage from the live site

Use the chrome-devtools MCP to grab the full localStorage from https://blockstack.ing:

1. Open a new page to `https://blockstack.ing`
2. Start a game (click Play > Original Remastered > dismiss crowns dialog)
3. Reload the page to trigger a save
4. Extract ALL localStorage keys and values:

```js
// run via mcp__chrome-devtools__evaluate_script
() => {
  const result = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const val = JSON.parse(localStorage.getItem(key));
    const parsed = {};
    for (const [k, v] of Object.entries(val)) {
      try { parsed[k] = JSON.parse(v); } catch { parsed[k] = v; }
    }
    result[key] = parsed;
  }
  navigator.clipboard.writeText(JSON.stringify(result));
  return "copied, length: " + JSON.stringify(result).length;
}
```

5. Paste from clipboard to a temp file: `pbpaste > /tmp/capture.json`
6. Convert to a TS fixture using python:

```python
import json
with open('/tmp/capture.json') as f:
    data = json.load(f)
lines = []
lines.append('/**')
lines.append(f' * Captured from blockstack.ing vXX on YYYY-MM-DD.')
lines.append(' */')
lines.append('')
for key, value in data.items():
    varname = key.replace('persist:', '').replace('/', '_').replace('.', '_')
    formatted = json.dumps(value, indent=2)
    lines.append(f'export const {varname} = {formatted};')
    lines.append('')
with open('e2e/fixtures/vXX-localStorage.ts', 'w') as f:
    f.write('\n'.join(lines))
```

Replace XX with the version shown on the site and YYYY-MM-DD with today's date.

## Step 2: Clicking menu items

Menu items use `display: contents` so MCP click fails. Use `evaluate_script` instead:

```js
() => {
  document.querySelector('[data-menuitem_id="playGame"]').click();
  return "clicked";
}
```

For the crowns dialog, click the dialog element itself:
```js
() => {
  document.querySelector('[data-dialog-id="crowns"]')?.click();
  return "clicked";
}
```

## Step 3: Write the test

Tests go in `e2e/migrations.spec.ts`. Follow this pattern:

```ts
import { expect, test } from "@playwright/test";
import { myFixtureExport } from "./fixtures/vXX-localStorage";
import { waitForGameState } from "./testUtils/gameStateQueries";
import { osSlowness } from "./testUtils/infrastructure";
import { startCampaignViaMenu } from "./testUtils/menuNavigation";
import { setupE2ePage } from "./testUtils/pageSetup";

// redux-persist stores each top-level value as a stringified JSON string
const toPersistedValue = (obj: Record<string, unknown>) =>
  JSON.stringify(
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, JSON.stringify(v)]),
    ),
  );
```

### Seeding localStorage before page load

Navigate to `about:blank` first (same origin not required — localStorage is set before navigating to the game):

```ts
await page.goto("about:blank");
await page.evaluate(
  (entries) => {
    for (const [key, value] of entries) {
      localStorage.setItem(key, value);
    }
  },
  [
    ["persist:hohol/userSettings", toPersistedValue(fixture)],
  ] as [string, string][],
);
```

**Important**: The live site may use the legacy persist key `persist:hohol/gameMenus/userSettings` (v17 format, combines userSettings + savedGames). The game's `migrateLegacySavedGames` code handles splitting this into separate keys on boot. Seed using whichever key the capture contains.

### Starting the game and verifying

```ts
await startCampaignViaMenu(page, testInfo.project.name, "originalGame");
await waitForGameState(page);

// verify migrated state
const value = await page.evaluate(
  () => window._e2e_store?.getState().userSettings.userSettings.someField,
);
expect(value).toEqual(expectedValue);
```

## Step 4: Run the test

```bash
pnpm build:game && pnpm playwright test migrations --project=chromium-desktop
```

## Key details

- Fixtures live in `e2e/fixtures/`
- The fixture is a TS file exporting parsed objects (not raw strings) for readability
- `toPersistedValue()` re-stringifies nested values to match redux-persist's storage format
- The test uses `setupE2ePage` in `beforeEach` for audio muting and error dialog handling
- Test timeout should be `60_000 * osSlowness`
- See `e2e/fixtures/v22-localStorage.ts` and `e2e/migrations.spec.ts` as the reference implementation
