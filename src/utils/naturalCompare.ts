const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

/**
 * natural string compare (so `room10` follows `room2`, not `room1`), for
 * passing to `.sort()`/`.toSorted()`.
 *
 * The campaign generation scripts and the columnar decoder both sort room ids
 * with this comparator - room iteration order is observable (eg it decides
 * which door a character enters a room by), so the generated `campaign.ts`
 * (dev) and the decoded blob (prod) must agree on ordering.
 */
export const naturalCompare: (a: string, b: string) => number =
  collator.compare;
