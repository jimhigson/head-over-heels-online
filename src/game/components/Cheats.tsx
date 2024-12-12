import { Button } from "@/components/ui/button";
import { blockSizePx } from "@/sprites/spritePivots";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@radix-ui/react-switch";
import { LucideBug, LucideTestTube } from "lucide-react";
import { currentRoom, currentPlayableItem } from "../gameState/GameState";
import { changeCharacterRoom } from "../gameState/mutators/changeCharacterRoom";
import { RoomSelect } from "../levelEdit/RoomSelect";
import { ImgSprite } from "./Sprite";
import type { GameApi } from "../GameApi";
import type { ShowBoundingBoxes } from "../RenderOptions";
import type { JsonItemConfig, JsonItemType } from "@/model/json/JsonItem";
import type { PlanetName } from "@/sprites/planets";
import { addItemToRoomInPlay } from "../gameState/mutators/addItemToRoomInPlay";

export interface SpeedButtonProps<RoomId extends string> {
  gameApi: GameApi<RoomId>;
  speed: number;
  className: string;
}

export const SpeedButton = <RoomId extends string>({
  gameApi,
  speed,
  className,
}: SpeedButtonProps<RoomId>) => {
  return (
    <Button
      className={className}
      onClick={(e) => {
        gameApi.gameState.gameSpeed = speed;
        e.currentTarget.blur();
      }}
    >
      x{speed}
    </Button>
  );
};

export const Cheats = <RoomId extends string>({
  gameApi,
  showBBs,
  setShowBBs,
}: {
  gameApi: GameApi<RoomId>;
  showBBs: ShowBoundingBoxes;
  setShowBBs: (show: ShowBoundingBoxes) => void;
}) => {
  const { campaign } = gameApi.gameState;

  const summonItem = <T extends JsonItemType>(
    itemType: T,
    config: JsonItemConfig<T, PlanetName, RoomId>,
  ) => {
    const { gameState } = gameApi;
    const playable = currentPlayableItem(gameState);
    addItemToRoomInPlay({
      gameState,
      room: currentRoom(gameState),
      itemType,
      config,
      position: {
        ...playable.state.position,
        z: playable.state.position.z + blockSizePx.h * 2,
      },
    });
  };

  return (
    <Collapsible>
      <CollapsibleTrigger
        className="absolute bottom-2 right-2 flex flex-col z-3"
        onClick={(e) => e.currentTarget.blur()}
      >
        <LucideBug color="hsl(183, 28%,30%)" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="absolute bottom-10 right-2 flex flex-col">
          <RoomSelect gameApi={gameApi} />
          <div className="flex flex-row items-center gap-x-2 justify-center pb-2 pt-2 bg-redShadow text-white">
            <Switch
              id="showbbs"
              checked={showBBs !== "none"}
              onCheckedChange={(checked) =>
                setShowBBs(checked ? "non-wall" : "none")
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showbbs">BBs</Label>
            <Switch
              id="showAllBbs"
              checked={showBBs === "all"}
              onCheckedChange={(checked) =>
                setShowBBs(checked ? "all" : "non-wall")
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showAllBbs">inc walls</Label>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="flex-1"
              onClick={(e) => {
                gameApi.changeRoom("blacktooth1head" as RoomId);
                e.currentTarget.blur();
              }}
            >
              Room 1
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                gameApi.changeRoom("laboratory" as RoomId);
                e.currentTarget.blur();
              }}
            >
              <LucideTestTube />
              To the lab!
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="flex-1"
              onClick={(e) => {
                const roomId = currentRoom(gameApi.gameState).id;
                gameApi.gameState.currentCharacterName = "heels";
                changeCharacterRoom({
                  gameState: gameApi.gameState,
                  changeType: "level-select",
                  toRoomId: roomId,
                });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="heels.walking.right.2" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                const roomId = currentRoom(gameApi.gameState).id;
                gameApi.gameState.currentCharacterName = "head";
                changeCharacterRoom({
                  gameState: gameApi.gameState,
                  changeType: "level-select",
                  toRoomId: roomId,
                });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="head.walking.right.2" />
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "bag" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="bag" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "hooter" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="hooter" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "donuts" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="donuts" />
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "extra-life" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="bunny" />
              <ImgSprite textureId="hud.char.2" scale={2} />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "shield" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="bunny" />
              <ImgSprite textureId="hud.shield" scale={2} />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "fast" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="bunny" />
              <ImgSprite textureId="hud.fastSteps" scale={2} />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "jumps" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="bunny" />
              <ImgSprite textureId="hud.bigJumps" scale={2} />
            </Button>
          </div>

          <div className="flex flex-row items-center">
            <SpeedButton className="flex-1" speed={0.05} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={0.2} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={0.5} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={1} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={2} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={5} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={10} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={25} gameApi={gameApi} />
            <SpeedButton className="flex-1" speed={100} gameApi={gameApi} />
          </div>

          <Button
            onClick={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).gs = gameApi.gameState;
              if (gameApi) console.log(gameApi.gameState);
              e.currentTarget.blur();
            }}
          >
            log(gameState); gs=gameState
          </Button>
          <Button
            onClick={(e) => {
              if (gameApi) console.log(campaign.rooms[gameApi.currentRoom.id]);
              e.currentTarget.blur();
            }}
          >
            Room JSON to console
          </Button>
          <Button onClick={() => gameApi && console.log(gameApi.currentRoom)}>
            Room state to console
          </Button>
          <Button
            onClick={(e) => {
              if (gameApi)
                console.log(
                  gameApi.currentRoom.items[
                    gameApi.gameState.currentCharacterName
                  ],
                );
              e.currentTarget.blur();
            }}
          >
            Playable to console
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
