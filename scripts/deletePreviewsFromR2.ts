import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { parseArgs } from "node:util";

import { makeR2Client } from "./r2/makeR2Client";
import { previewsBucket } from "./r2/previewsBucket";

/**
 * removes a pr's preview builds from the previews bucket. Both of the pr's hosts
 * are matched, since the game's prefix (`pr123-<sha>`) is also the start of the
 * editor's (`ed-pr123-<sha>`)
 */
export const deletePreviewsFromR2 = async (
  /** the pr whose previews to delete */
  prNumber: string,
  /**
   * a commit sha to spare, so a fresh push can drop the previews of the commits
   * it supersedes without dropping its own. Omitted when the pr closes and all
   * of them should go
   */
  keepSha: string | undefined,
) => {
  const client = makeR2Client();

  const prefixes = [`pr${prNumber}-`, `ed-pr${prNumber}-`];
  const keepPrefixes =
    keepSha === undefined ?
      []
    : prefixes.map((prefix) => `${prefix}${keepSha}/`);

  const doomed: string[] = [];
  for (const prefix of prefixes) {
    let continuationToken: string | undefined;
    do {
      const listed = await client.send(
        new ListObjectsV2Command({
          Bucket: previewsBucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }),
      );
      for (const { Key } of listed.Contents ?? []) {
        if (
          Key !== undefined &&
          !keepPrefixes.some((keep) => Key.startsWith(keep))
        ) {
          doomed.push(Key);
        }
      }
      continuationToken =
        listed.IsTruncated ? listed.NextContinuationToken : undefined;
    } while (continuationToken);
  }

  if (doomed.length === 0) {
    console.log(`no preview objects to delete for pr ${prNumber}`);
    return;
  }

  console.log(`deleting ${doomed.length} preview objects for pr ${prNumber}…`);
  // DeleteObjects accepts at most 1000 keys per request
  for (let i = 0; i < doomed.length; i += 1_000) {
    const batch = doomed.slice(i, i + 1_000);
    await client.send(
      new DeleteObjectsCommand({
        Bucket: previewsBucket,
        Delete: { Objects: batch.map((Key) => ({ Key })) },
      }),
    );
    for (const key of batch) {
      console.log(`  ✗ ${key}`);
    }
  }
};

const {
  values: { pr, keepSha },
} = parseArgs({
  options: { pr: { type: "string" }, keepSha: { type: "string" } },
});

if (pr === undefined) {
  console.error(
    "usage: tsx scripts/deletePreviewsFromR2.ts --pr <number> [--keepSha <sha>]",
  );
  process.exit(1);
}

deletePreviewsFromR2(pr, keepSha).catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
