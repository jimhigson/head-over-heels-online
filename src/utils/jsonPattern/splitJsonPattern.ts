/**
 * the parts of a json pattern: dot-separated, except inside an attribute
 * selector, which may hold dotted properties - eg `[config.which=skiHead].position`
 * → `["[config.which=skiHead]", "position"]`
 */
export const splitJsonPattern = (pattern: string): string[] =>
  pattern.match(/\[[^\]]*\]|[^.[]+/g) ?? [];
