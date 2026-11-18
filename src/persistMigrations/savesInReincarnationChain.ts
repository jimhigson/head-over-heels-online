/**
 * the shape every save has had: a reincarnation point is itself a save, so a
 * save heads a linked list of them
 */
type ChainedSave<Save> = {
  gameInPlay: { reincarnationPoint?: Save };
};

/**
 * a save, then each reincarnation point down the chain it heads
 */
export function* savesInReincarnationChain<Save extends ChainedSave<Save>>(
  save: Save,
): Generator<Save> {
  for (
    let chainedSave: Save | undefined = save;
    chainedSave !== undefined;
    chainedSave = chainedSave.gameInPlay.reincarnationPoint
  ) {
    yield chainedSave;
  }
}
