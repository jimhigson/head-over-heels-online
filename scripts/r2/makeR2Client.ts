import { S3Client } from "@aws-sdk/client-s3";

/**
 * an S3 client pointed at this account's R2, built from the R2_* env vars. Exits
 * when any of them is missing, since nothing downstream can work without them
 */
export const makeR2Client = (): S3Client => {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error(
      "missing env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY are all required",
    );
    process.exit(1);
  }

  return new S3Client({
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
};
