/**
 * for setting the times for things that have never happened.
 * can't use Number.NEGATIVE_INFINITY because it is not json serialisable
 * this number is very negative - as a unix timestamp it would be something like the year
 * - 260,000 - functionally, it is the same as Number.NEGATIVE_INFINITY
 */

export const neverTime = Number.MIN_SAFE_INTEGER;
