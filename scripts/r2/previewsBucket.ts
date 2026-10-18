/**
 * every pr preview lives in this one bucket, under a key prefix named after the
 * host that serves it - unlike the per-environment hoh-<app>-<environment>
 * buckets, which hold a single build each
 */
export const previewsBucket = "hoh-previews";
