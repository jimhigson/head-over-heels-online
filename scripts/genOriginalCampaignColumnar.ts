#!/usr/bin/env -S node --import ./buildTools/registerNodeImportHooks.ts

/**
 * Writes the original campaign's columnar blob, which production builds load,
 * from the campaign's .ts rooms - the blob is never edited by hand.
 */
import { writeFile } from "node:fs/promises";

import { columnarEncode } from "../src/columnar/encoder";
import { campaign } from "../src/originalCampaign/campaign";

// oxlint-disable-next-line eslint-js/no-restricted-syntax - we don't care about Safari since this is a script:
await writeFile(
  "src/originalCampaign/campaign.columnar.json",
  JSON.stringify(
    // the blob only decodes back for play (its editable source is the .ts), so
    // drop the ids nothing references to save bytes:
    columnarEncode(campaign, { dropUnreferencedIds: true }),
  ),
);
