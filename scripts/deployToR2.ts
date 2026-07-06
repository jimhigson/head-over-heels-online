import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, sep } from "node:path";
import { parseArgs } from "node:util";
import { brotliCompressSync, constants as zlibConstants } from "node:zlib";

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

export const deployToR2 = async (
  /** local directory whose contents become the bucket's objects */
  dir: string,
  /** target R2 bucket name */
  bucket: string,
) => {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error(
      "missing env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY are all required",
    );
    process.exit(1);
  }

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    // R2's S3 API rejects the flexible (CRC32) request checksums the aws-sdk
    // now sends by default, so only send a checksum where the operation
    // genuinely requires one
    // https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  const files = readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((rel) => statSync(join(dir, rel)).isFile())
    .map((rel) => ({ rel, key: rel.split(sep).join("/") }));

  console.log(`uploading ${files.length} objects to ${bucket}…`);

  const uploadFile = async ({ rel, key }: { rel: string; key: string }) => {
    const kind = assetKindFor(key);
    const raw = readFileSync(join(dir, rel));
    const brotliBody = kind.compress ? brotli(raw) : raw;
    // keep the brotli only when it actually shrank the file; a tiny or
    // incompressible payload can come out larger than the original
    const useBrotli = kind.compress && brotliBody.length < raw.length;
    const body = useBrotli ? brotliBody : raw;
    // no-transform stops Cloudflare re-encoding our brotli: without it the edge
    // decompresses and recompresses small responses at a lower quality
    const cacheControl =
      useBrotli ?
        `${cacheControlFor(key)}, no-transform`
      : cacheControlFor(key);
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

  // mirror + prune: delete any object the new build no longer contains, so the
  // bucket always matches the build exactly. Pruning runs after every upload
  // has landed, so a client loading the previous build's chunks mid-deploy
  // still finds them until the moment they are superseded
  const uploaded = new Set(files.map(({ key }) => key));
  const stale: string[] = [];
  let continuationToken: string | undefined;
  do {
    const listed = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
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

  console.log(`done: ${bucket} now mirrors ${dir}`);
};

const dirByApp = {
  game: "dist",
  editor: "dist-editor",
} as const satisfies Record<string, string>;

const isApp = (value: string | undefined): value is keyof typeof dirByApp =>
  value !== undefined && value in dirByApp;

const isEnvironment = (
  value: string | undefined,
): value is "main" | "production" => value === "main" || value === "production";

const { positionals } = parseArgs({ allowPositionals: true });
const [app, environment] = positionals;

if (!isApp(app) || !isEnvironment(environment)) {
  console.error(
    "usage: tsx scripts/deployToR2.ts <game|editor> <main|production>",
  );
  process.exit(1);
}

// pick up this environment's R2 credentials from its gitignored local env file
// for local runs; CI sets them as real env vars instead (which win, since
// loadEnvFile does not overwrite existing process.env entries)
const credentialsFile = `.env.r2-${environment}.local`;
if (existsSync(credentialsFile)) {
  process.loadEnvFile(credentialsFile);
}

// buckets follow the hoh-<app>-<environment> convention
deployToR2(dirByApp[app], `hoh-${app}-${environment}`).catch(
  (error: unknown) => {
    console.error(error);
    process.exit(1);
  },
);
