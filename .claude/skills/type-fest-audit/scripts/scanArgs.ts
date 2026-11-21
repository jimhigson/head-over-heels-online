import { resolve } from "node:path";
import { parseArgs } from "node:util";

export type ScanOptions = {
  /**
   * the project root: its `node_modules` supplies `typescript`
   */
  rootDir: string;
  /**
   * absolute paths of the tsconfig files whose programs are scanned
   */
  tsconfigPaths: string[];
  /**
   * source files whose path contains any of these are skipped
   */
  excludeSubstrings: string[];
};

export const scanUsage = `options:
  --root <dir>        project root (default: current directory)
  --tsconfig <file>   tsconfig to scan, relative to --root; repeat for several
                      (default: tsconfig.json)
  --exclude <text>    skip source files whose path contains this; repeat for
                      several (node_modules is always skipped)`;

export const parseScanArgs = (argv: string[]): ScanOptions => {
  const { values } = parseArgs({
    args: argv,
    options: {
      root: { type: "string" },
      tsconfig: { type: "string", multiple: true },
      exclude: { type: "string", multiple: true },
      help: { type: "boolean" },
    },
  });

  if (values.help) {
    console.log(scanUsage);
    process.exit(0);
  }

  const rootDir = resolve(values.root ?? process.cwd());
  return {
    rootDir,
    tsconfigPaths: (values.tsconfig ?? ["tsconfig.json"]).map((tsconfigPath) =>
      resolve(rootDir, tsconfigPath),
    ),
    excludeSubstrings: ["node_modules", ...(values.exclude ?? [])],
  };
};
