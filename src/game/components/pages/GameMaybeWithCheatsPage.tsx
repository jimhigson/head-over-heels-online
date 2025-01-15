import { Game } from "../Game.tsx";
import type { Campaign } from "../../../model/modelTypes.ts";
import { useRef } from "react";

export const GameMaybeWithCheatsPage = <RoomId extends string>({
  campaign,
}: {
  campaign: Campaign<RoomId>;
}) => {
  const CampaignGame = useRef(Game(campaign)).current;

  return (
    <>
      <CampaignGame />
    </>
  );
};
