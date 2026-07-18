import { createClient } from "@supabase/supabase-js";
import { gunzipSync } from "node:zlib";

import { columnarDecode, isColumnarEncoded } from "../src/columnar/decoder";

const [, , campaignName] = process.argv;
if (!campaignName) {
  console.error("usage: tsx scripts/fetchCampaign.ts <campaignName> [userId]");
  process.exit(1);
}

const defaultUserId = "2924c962-99f1-4dd2-9b9c-fef832dc991b";
const [, , , userId = defaultUserId] = process.argv;

const supabase = createClient(
  "https://pkswdnpftrundnewgnya.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrc3dkbnBmdHJ1bmRuZXdnbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODI2MzIsImV4cCI6MjA2ODI1ODYzMn0.r_Y1RLOGJ55C0De5SBTVXqO09SMDqgV38sQuE-oDxXE",
);

const res = await supabase.rpc("get_latest_campaign", {
  p_campaign_name: campaignName,
  p_user_id: userId,
});

if (res.error) {
  console.error("error fetching campaign:", res.error);
  process.exit(1);
}

const compressed = Uint8Array.fromBase64(res.data.data, {
  alphabet: "base64url",
});
const decompressed = gunzipSync(Buffer.from(compressed));
const parsed = JSON.parse(decompressed.toString("utf-8"));

// newer campaigns are columnar-encoded in the db (marked with `_enc`); decode
// back to plain row form so the output is directly readable/queryable. Legacy
// non-columnar rows pass straight through:
const campaign =
  isColumnarEncoded(parsed) ? columnarDecode<string>(parsed) : parsed;

console.log(JSON.stringify(campaign, null, 2));
