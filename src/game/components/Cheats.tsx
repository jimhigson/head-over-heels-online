import { Button } from "@/components/ui/button";
import { blockSizePx } from "@/sprites/spritePivots";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-label";

import { currentRoom, currentPlayableItem } from "../gameState/GameState";
import { changeCharacterRoom } from "../gameState/mutators/changeCharacterRoom";
import { RoomSelect } from "../levelEdit/RoomSelect";
import { ImgSprite } from "./Sprite";
import type { GameApi } from "../GameApi";
import type { ShowBoundingBoxes } from "../RenderOptions";
import type { JsonItemConfig, JsonItemType } from "@/model/json/JsonItem";
import type { PlanetName } from "@/sprites/planets";
import { addItemToRoomInPlay } from "../gameState/mutators/addItemToRoomInPlay";
import { useLevelSelectByUrlHash } from "./useLevelSelectByUrlHash";
import { Switch } from "@/components/ui/switch";

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
      {/* remove leading zeros etc: */}
      {speed.toString().replace(/^0\./, ".")}
    </Button>
  );
};

const Heading = ({ children }: { children: string }) => {
  return <h4 className="bg-shadow pl-2">{children}</h4>;
};

export const Cheats = <RoomId extends string>({
  gameApi,
  showBoundingBoxes,
  setShowBoundingBoxes,
  setShowShadowMasks,
  showShadowMasks,
}: {
  gameApi: GameApi<RoomId>;
  showBoundingBoxes: ShowBoundingBoxes;
  setShowBoundingBoxes: (show: ShowBoundingBoxes) => void;
  showShadowMasks: boolean;
  setShowShadowMasks: (show: boolean) => void;
}) => {
  const { campaign } = gameApi.gameState;

  useLevelSelectByUrlHash(gameApi);

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
        className="absolute bottom-0 right-0 flex flex-col z-3 text-midRed hover:text-metallicBlue "
        onClick={(e) => e.currentTarget.blur()}
      >
        <ImgSprite textureId="helicopter-bug.1" scale={2} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="absolute bottom-[48px] right-0 flex flex-col w-[500px]">
          <Heading>room select:</Heading>
          <RoomSelect gameApi={gameApi} className="w-full" />
          <div className="flex flex-row items-center">
            <Button
              className="flex-1"
              onClick={(e) => {
                gameApi.changeRoom("blacktooth1head" as RoomId);
                e.currentTarget.blur();
              }}
            >
              starting room
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                gameApi.changeRoom("laboratory" as RoomId);
                e.currentTarget.blur();
              }}
            >
              To the lab!
            </Button>
          </div>
          <Heading>render:</Heading>
          <div className="flex flex-row items-center gap-x-2 justify-center pb-2 pt-2 bg-redShadow text-white">
            <Switch
              id="showbbs"
              checked={showBoundingBoxes !== "none"}
              onCheckedChange={(checked) =>
                setShowBoundingBoxes(checked ? "non-wall" : "none")
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showbbs">BBs</Label>
            <Switch
              id="showAllBbs"
              checked={showBoundingBoxes === "all"}
              onCheckedChange={(checked) =>
                setShowBoundingBoxes(checked ? "all" : "non-wall")
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showAllBbs">wall BBs</Label>
            <Switch
              id="showshadows"
              checked={showShadowMasks}
              onCheckedChange={(checked) => setShowShadowMasks(checked)}
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showshadows">shadow masks</Label>
          </div>

          <Heading>summon character:</Heading>
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
            <Button
              className="flex-1"
              onClick={(e) => {
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="head.walking.right.2" />
              over
              <ImgSprite textureId="heels.walking.right.2" />
            </Button>
          </div>
          <Heading>summon item:</Heading>
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

          <Heading>game speed x:</Heading>
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

          <Heading>write to console:</Heading>
          <div className="flex flex-row items-center flex-wrap">
            <Button
              className="flex-grow"
              onClick={(e) => {
                if (gameApi) {
                  console.log(gameApi.gameState);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).gs = gameApi.gameState;
                  console.log("gameState on window.gs");
                }
                e.currentTarget.blur();
              }}
            >
              gameState
            </Button>
            <Button
              className="flex-grow"
              onClick={(e) => {
                if (gameApi) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).roomJson = gameApi.gameState;
                  const roomJson = campaign.rooms[gameApi.currentRoom.id];
                  console.log(roomJson);
                  console.log("roomJson on window.roomJson");
                }
                e.currentTarget.blur();
              }}
            >
              Room JSON
            </Button>
            <Button
              className="flex-grow"
              onClick={(e) => {
                if (gameApi) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).room = gameApi.currentRoom;
                  console.log(gameApi.currentRoom);
                  console.log("currentRoom on window.room");
                }
                e.currentTarget.blur();
              }}
            >
              Room state
            </Button>
            <Button
              className="flex-grow"
              onClick={(e) => {
                if (gameApi) {
                  const playable =
                    gameApi.currentRoom.items[
                      gameApi.gameState.currentCharacterName
                    ];

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).playable = playable;
                  console.log(playable);
                  console.log("playable on window.playable");
                }

                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="head.walking.right.2" />|
              <ImgSprite textureId="heels.walking.right.2" />
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
