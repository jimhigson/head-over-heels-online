/** we stringify->parse (not structuredClone) because we want to
    explicitly find circular structures or non-serializable data */
import { canonicalize } from "json-canonicalize";

export const badJsonClone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

/** like badJsonClone, but object property order will be canonicalised */
export const badJsonCanonicalClone = <T>(x: T): T =>
  JSON.parse(canonicalize(x));
