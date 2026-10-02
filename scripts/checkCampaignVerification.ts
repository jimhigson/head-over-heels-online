import { createClient } from "@supabase/supabase-js";
import chalk from "chalk";

import { type Database } from "../src/_generated/db";
import { campaign as originalCampaign } from "../src/_generated/originalCampaign/campaign";
import { loadCampaignFromDb } from "../src/db/campaign";
import {
  supabaseAnonKey,
  supabaseUrl,
} from "../src/db/supabaseEnvironmentVariables";
import { sequelCampaignLocator } from "../src/gameInfo";
import { type VerificationCampaign } from "../src/model/json/verification/verificationTypes";
import { verifyCampaign } from "../src/model/json/verification/verifyCampaign";

/*
 * Both the original campaign and the sequel are offered from the game's main menu, so we
 * need a couple of quality checks on them.
 *
 * This isn't really safe to run in CI since the db with the sequel can change at any time,
 * so a pass here only checks against the version in the db at the time of execution
 *
 * Runs the same verifications that the editor would have
 *
 * exits 0 if both campaigns have no verification issues - exits 1 if either has any
 */

const db = createClient<Database>(supabaseUrl, supabaseAnonKey);

const campaignsToCheck: Array<[name: string, campaign: VerificationCampaign]> =
  [
    ["original", originalCampaign as VerificationCampaign],
    [
      `${sequelCampaignLocator.campaignName} (latest in db)`,
      (await loadCampaignFromDb(
        db,
        sequelCampaignLocator,
      )) as VerificationCampaign,
    ],
  ];

let issueCount = 0;
for (const [campaignName, campaign] of campaignsToCheck) {
  const issues = verifyCampaign(campaign);
  issueCount += issues.length;
  const countColour = issues.length === 0 ? chalk.green : chalk.red;
  console.log(
    `${chalk.magenta(campaignName)}: ${countColour(`${issues.length} verification issue(s)`)}`,
  );
  for (const { severity, verifier, msg } of issues) {
    const severityColour = severity === "error" ? chalk.red : chalk.yellow;
    console.log(`  ${severityColour(severity)} [${verifier.name}] ${msg}`);
  }
}

process.exit(issueCount === 0 ? 0 : 1);
