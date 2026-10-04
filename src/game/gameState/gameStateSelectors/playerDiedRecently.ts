import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { afterDeathInvulnerabilityTime } from "../../physics/mechanicsConstants";

export const playerDiedRecently = (
  playableItem: PlayableItem<CharacterName, string>,
) => {
  const { gameTime, lastDiedAt } =
    playableItem.type === "headOverHeels" ?
      // in this case, both playables in symbiosis should have the same shield
      // left, so arbitrarily choose head:
      playableItem.state.head
    : playableItem.state;

  const timeSinceLastDied = gameTime - lastDiedAt;
  return timeSinceLastDied < afterDeathInvulnerabilityTime;
};
