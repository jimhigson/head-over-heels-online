import { Button } from "@/components/ui/button";
import { blockSizePx } from "@/sprites/spritePivots";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-label";

import { selectCurrentRoom } from "../../gameState/GameState";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import { RoomSelect } from "./RoomSelect";
import { ImgSprite } from "../Sprite";
import type { JsonItemConfig, JsonItemType } from "@/model/json/JsonItem";
import type { SceneryName } from "@/sprites/planets";
import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { useLevelSelectByUrlHash } from "./useLevelSelectByUrlHash";
import { Switch } from "@/components/ui/switch";
import type { CharacterName } from "@/model/modelTypes";
import type { PropsWithChildren } from "react";
import type { GameApi } from "@/game/GameApi";
import type { EmptyObject } from "type-fest";
import { useGameApi } from "../GameApiContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setShowBoundingBoxes, setShowShadowMasks } from "@/store/store";

interface SpeedButtonProps<RoomId extends string> {
  gameApi: GameApi<RoomId>;
  speed: number;
  className: string;
}

const SpeedButton = <RoomId extends string>({
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

type SummonPlayableButtonProps<RoomId extends string> = {
  gameApi: GameApi<RoomId>;
  playableName: CharacterName;
};

const SummonPlayableButton = <RoomId extends string>({
  gameApi,
  playableName,
}: SummonPlayableButtonProps<RoomId>) => {
  return (
    <Button
      className="flex-1"
      onClick={(e) => {
        const roomId = selectCurrentRoom(gameApi.gameState).id;
        gameApi.gameState.currentCharacterName = playableName;
        const playableItem = selectPlayableItem(
          gameApi.gameState,
          playableName,
        );
        if (playableItem === undefined) {
          console.error(`can't summon ${playableName} who is not in the game`);
          return;
        }
        changeCharacterRoom({
          playableItem,
          gameState: gameApi.gameState,
          changeType: "level-select",
          toRoomId: roomId,
        });
        e.currentTarget.blur();
      }}
    >
      {playableName === "headOverHeels" ?
        <>
          <ImgSprite textureId="head.walking.right.2" />
          over
          <ImgSprite textureId="heels.walking.right.2" />
        </>
      : <ImgSprite textureId={`${playableName}.walking.right.2`} />}
    </Button>
  );
};

export type GoToRoomButtonProps<RoomId extends string> = {
  gameApi: GameApi<RoomId>;
  readonly roomId: RoomId;
};

export const GoToRoomButton = <RoomId extends string>({
  gameApi,
  roomId,
  children,
}: PropsWithChildren<GoToRoomButtonProps<RoomId>>) => {
  return (
    <Button
      className="flex-1"
      onClick={(e) => {
        gameApi.changeRoom(roomId);
        e.currentTarget.blur();
      }}
    >
      {children || roomId}
    </Button>
  );
};

const Heading = ({ children }: { children: string }) => {
  return <h4 className="bg-redShadow pl-1">{children}</h4>;
};

export const Cheats = <RoomId extends string>(_emptyProps: EmptyObject) => {
  const gameApi = useGameApi<RoomId>();
  const { campaign } = gameApi.gameState;

  const showBoundingBoxes = useAppSelector((state) => state.showBoundingBoxes);
  const showShadowMasks = useAppSelector((state) => state.showShadowMasks);
  const dispatch = useAppDispatch();

  useLevelSelectByUrlHash(gameApi);

  const summonItem = <T extends JsonItemType>(
    itemType: T,
    config: JsonItemConfig<T, SceneryName, RoomId>,
  ) => {
    const { gameState } = gameApi;
    const playable = selectCurrentPlayableItem(gameState);
    addItemFromJsonToRoom({
      gameState,
      room: selectCurrentRoom(gameState),
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
        className="absolute bottom-0 right-1 flex flex-col z-3 text-midRed hover:text-metallicBlue "
        onClick={(e) => e.currentTarget.blur()}
      >
        <ImgSprite textureId="helicopterBug.1" scale={4} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="absolute [--scale:1] [--block:8px] bottom-[48px] right-1 flex flex-col w-[500px]">
          <Heading>room select:</Heading>
          <RoomSelect gameApi={gameApi} className="w-full" />
          <div className="flex flex-row items-center">
            <GoToRoomButton
              gameApi={gameApi}
              roomId={"blacktooth1head" as RoomId}
            >
              Starting room
            </GoToRoomButton>
            <GoToRoomButton gameApi={gameApi} roomId={"laboratory" as RoomId}>
              To the lab!
            </GoToRoomButton>
          </div>
          <div className="flex flex-row items-center">
            <GoToRoomButton
              gameApi={gameApi}
              roomId={"blacktooth45market" as RoomId}
            >
              Market
            </GoToRoomButton>
            <GoToRoomButton gameApi={gameApi} roomId={"egyptus1" as RoomId}>
              Egyptus
            </GoToRoomButton>
            <GoToRoomButton gameApi={gameApi} roomId={"safari1" as RoomId}>
              Safari
            </GoToRoomButton>
            <GoToRoomButton gameApi={gameApi} roomId={"bookworld1" as RoomId}>
              Bookworld
            </GoToRoomButton>
            <GoToRoomButton
              gameApi={gameApi}
              roomId={"penitentiary1" as RoomId}
            >
              Penitentiary
            </GoToRoomButton>
          </div>
          <Heading>render:</Heading>
          <div className="flex flex-row items-center gap-x-2 justify-center pb-1 pt-1 bg-shadow text-white">
            <Switch
              id="showbbs"
              checked={showBoundingBoxes !== "none"}
              onCheckedChange={(checked) =>
                dispatch(setShowBoundingBoxes(checked ? "non-wall" : "none"))
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showbbs">BBs</Label>
            <Switch
              id="showAllBbs"
              checked={showBoundingBoxes === "all"}
              onCheckedChange={(checked) =>
                dispatch(setShowBoundingBoxes(checked ? "all" : "non-wall"))
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showAllBbs">wall BBs</Label>
            <Switch
              id="showshadows"
              checked={showShadowMasks}
              onCheckedChange={(checked) =>
                dispatch(setShowShadowMasks(checked))
              }
              onClick={(e) => e.currentTarget.blur()}
            />
            <Label htmlFor="showshadows">shadow masks</Label>
          </div>

          <Heading>summon character:</Heading>
          <div className="flex flex-row items-center">
            <SummonPlayableButton gameApi={gameApi} playableName="head" />
            <SummonPlayableButton gameApi={gameApi} playableName="heels" />
            <SummonPlayableButton
              gameApi={gameApi}
              playableName="headOverHeels"
            />
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
                summonItem("pickup", { gives: "doughnuts" });
                e.currentTarget.blur();
              }}
            >
              <ImgSprite textureId="doughnuts" />
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

export default Cheats;
