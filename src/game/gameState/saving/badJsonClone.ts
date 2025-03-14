// we stringify->parse (not structuredClone) because we want to
// explicitly find circular structures or non-serializable data

export const badJsonClone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
