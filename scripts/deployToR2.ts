import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, sep } from "node:path";
import { parseArgs } from "node:util";
import { brotliCompressSync, constants as zlibConstants } from "node:zlib";

import { makeR2Client } from "./r2/makeR2Client";
import { previewsBucket } from "./r2/previewsBucket";

type AssetKind = {
  contentType: string;
  /**
   * brotli the compressible text assets; leave already-compact binaries
   * (images, audio, video, fonts) as-is since recompressing them wastes cpu
   * and can grow them
   */
  compress: boolean;
};

const assetKindByExtension = {
  ".html": { contentType: "text/html; charset=utf-8", compress: true },
  ".js": { contentType: "text/javascript; charset=utf-8", compress: true },
  ".mjs": { contentType: "text/javascript; charset=utf-8", compress: true },
  ".css": { contentType: "text/css; charset=utf-8", compress: true },
  ".json": { contentType: "application/json; charset=utf-8", compress: true },
  ".map": { contentType: "application/json; charset=utf-8", compress: true },
  ".webmanifest": {
    contentType: "application/manifest+json; charset=utf-8",
    compress: true,
  },
  ".svg": { contentType: "image/svg+xml", compress: true },
  ".txt": { contentType: "text/plain; charset=utf-8", compress: true },
  ".png": { contentType: "image/png", compress: false },
  ".webp": { contentType: "image/webp", compress: false },
  ".jpg": { contentType: "image/jpeg", compress: false },
  ".jpeg": { contentType: "image/jpeg", compress: false },
  ".gif": { contentType: "image/gif", compress: false },
  ".ico": { contentType: "image/x-icon", compress: false },
  ".woff2": { contentType: "font/woff2", compress: false },
  ".woff": { contentType: "font/woff", compress: false },
  ".ttf": { contentType: "font/ttf", compress: false },
  ".opus": { contentType: "audio/ogg", compress: false },
  ".mp3": { contentType: "audio/mpeg", compress: false },
  ".mp4": { contentType: "video/mp4", compress: false },
  ".wasm": { contentType: "application/wasm", compress: false },
} as const satisfies Record<string, AssetKind>;

const fallbackKind = {
  contentType: "application/octet-stream",
  compress: false,
} as const satisfies AssetKind;

const isKnownExtension = (
  ext: string,
): ext is keyof typeof assetKindByExtension => ext in assetKindByExtension;

const assetKindFor = (key: string): AssetKind => {
  const ext = extname(key).toLowerCase();
  return isKnownExtension(ext) ? assetKindByExtension[ext] : fallbackKind;
};

const cacheControlFor = (key: string): string => {
  // content-hashed assets never change under a given name, so they can be
  // cached forever and served from the edge without billing an R2 read
  if (key.startsWith("assets/")) {
    return "public, max-age=31536000, immutable";
  }
  // the shell and service worker must be revalidated so a deploy is picked up
  if (key.endsWith(".html") || key === "sw.js") {
    return "no-cache";
  }
  return "public, max-age=3600";
};

const brotli = (input: Buffer): Buffer =>
  brotliCompressSync(input, {
    params: {
      [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
      [zlibConstants.BROTLI_PARAM_SIZE_HINT]: input.length,
    },
  });

export type DeployToR2Options = {
  /**
   * prepended to every key, so several deploys can share one bucket. Pruning is
   * scoped to it, leaving the rest of the bucket alone
   */
  keyPrefix: string;
  /** brotli the compressible text assets before storing them */
  compress: boolean;
};

export const deployToR2 = async (
  /** local directory whose contents become the bucket's objects */
  dir: string,
  /** target R2 bucket name */
  bucket: string,
  { keyPrefix, compress }: DeployToR2Options,
) => {
  const client = makeR2Client();

  const files = readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((rel) => statSync(join(dir, rel)).isFile())
    .map((rel) => {
      // path is the build-relative path, which decides content type and cache
      // headers; key is where it lands in the bucket
      const path = rel.split(sep).join("/");
      return { rel, path, key: `${keyPrefix}${path}` };
    });

  console.log(
    `uploading ${files.length} objects to ${bucket}/${keyPrefix}${compress ? "" : " uncompressed"}…`,
  );

  const uploadFile = async ({
    rel,
    path,
    key,
  }: {
    rel: string;
    path: string;
    key: string;
  }) => {
    const kind = assetKindFor(path);
    const raw = readFileSync(join(dir, rel));
    const compressible = compress && kind.compress;
    const brotliBody = compressible ? brotli(raw) : raw;
    // keep the brotli only when it actually shrank the file; a tiny or
    // incompressible payload can come out larger than the original
    const useBrotli = compressible && brotliBody.length < raw.length;
    const body = useBrotli ? brotliBody : raw;
    // no-transform stops Cloudflare re-encoding our brotli: without it the edge
    // decompresses and recompresses small responses at a lower quality
    const cacheControl =
      useBrotli ?
        `${cacheControlFor(path)}, no-transform`
      : cacheControlFor(path);
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: kind.contentType,
        ContentEncoding: useBrotli ? "br" : undefined,
        CacheControl: cacheControl,
      }),
    );
    console.log(
      `  ↑ ${key} (${kind.contentType}${useBrotli ? ", br" : ""}, ${body.length}b)`,
    );
  };

  // bounded concurrency keeps the upload fast without opening hundreds of
  // sockets at once
  const concurrency = 12;
  let next = 0;
  const worker = async () => {
    while (next < files.length) {
      await uploadFile(files[next++]);
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));

  // mirror + prune: delete any object under this prefix the new build no longer
  // contains, so the prefix always matches the build exactly. Pruning runs after every upload
  // has landed, so a client loading the previous build's chunks mid-deploy
  // still finds them until the moment they are superseded
  const uploaded = new Set(files.map(({ key }) => key));
  const stale: string[] = [];
  let continuationToken: string | undefined;
  do {
    const listed = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: keyPrefix,
        ContinuationToken: continuationToken,
      }),
    );
    for (const object of listed.Contents ?? []) {
      if (object.Key !== undefined && !uploaded.has(object.Key)) {
        stale.push(object.Key);
      }
    }
    continuationToken =
      listed.IsTruncated ? listed.NextContinuationToken : undefined;
  } while (continuationToken);

  if (stale.length > 0) {
    console.log(`pruning ${stale.length} stale objects from ${bucket}…`);
    // DeleteObjects accepts at most 1000 keys per request
    for (let i = 0; i < stale.length; i += 1_000) {
      const batch = stale.slice(i, i + 1_000);
      await client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: { Objects: batch.map((Key) => ({ Key })) },
        }),
      );
      for (const key of batch) {
        console.log(`  ✗ ${key}`);
      }
    }
  }

  console.log(`done: ${bucket}/${keyPrefix} now mirrors ${dir}`);
};

const dirByApp = {
  game: "dist",
  editor: "dist-editor",
} as const satisfies Record<string, string>;

const isApp = (value: string | undefined): value is keyof typeof dirByApp =>
  value !== undefined && value in dirByApp;

const isEnvironment = (
  value: string | undefined,
): value is "main" | "preview" | "production" =>
  value === "main" || value === "preview" || value === "production";

const {
  positionals,
  values: { prefix },
} = parseArgs({
  allowPositionals: true,
  options: { prefix: { type: "string" } },
});
const [app, environment] = positionals;

const usage =
  "usage: tsx scripts/deployToR2.ts <game|editor> <main|production> | <game|editor> preview --prefix <hostLabel>";

if (!isApp(app) || !isEnvironment(environment)) {
  console.error(usage);
  process.exit(1);
}

// previews all share one bucket, told apart by a key prefix named after the
// host serving them, and are stored uncompressed - the edge compresses them on
// the fly, which is the right trade for a throwaway
if (environment === "preview" && prefix === undefined) {
  console.error(usage);
  process.exit(1);
}

// pick up this environment's R2 credentials from its gitignored local env file
// for local runs; CI sets them as real env vars instead (which win, since
// loadEnvFile does not overwrite existing process.env entries)
const credentialsFile = `.env.r2-${environment}.local`;
if (existsSync(credentialsFile)) {
  process.loadEnvFile(credentialsFile);
}

const target =
  environment === "preview" ?
    { bucket: previewsBucket, keyPrefix: `${prefix}/`, compress: false }
    // the other buckets follow the hoh-<app>-<environment> convention, one
    // build per bucket, so they need no prefix
  : { bucket: `hoh-${app}-${environment}`, keyPrefix: "", compress: true };

const { bucket, ...options } = target;

deployToR2(dirByApp[app], bucket, options).catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
