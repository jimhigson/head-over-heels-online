/**
 * extremely basic JSON fixup to add quotes, remove trailing commas,
 * and strip comments.
 * This is not a full JSON parser, and will break if it detects these
 * features inside strings, however should work for pasting code in from ts files
 */
export const fixJson = (text: string) =>
  text
    // remove single-line comments // like this
    .replace(/\/\/.*$/gm, "")
    // remove multi-line comments /* like this */
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // quote unquoted keys
    .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
    // remove trailing commas before closing brackets
    .replace(/,(\s*[}\]])/g, "$1");
