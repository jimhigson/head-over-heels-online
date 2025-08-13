/**
 * Custom utility type that ensures at least one property exists.
 * This is simpler than type-fest's RequireAtLeastOne and easier to flatten
 * for schema generation.
 */
export type NonEmptyRecord<T> = Record<string, T> & { [K in string]: T };
