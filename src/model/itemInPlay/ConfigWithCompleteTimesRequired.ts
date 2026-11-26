import type { Merge } from "type-fest";

import type { Xyz } from "../../utils/vectors/vectors";

/**
 * an in-play config: it always has `times`, with every one of its axes given
 */
export type ConfigWithCompleteTimesRequired<Config> =
  Config extends unknown ? Merge<Config, { times: Xyz }> : never;
