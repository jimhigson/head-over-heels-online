import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { Label } from "@radix-ui/react-label";

import { selectCurrentRoomState } from "../../gameState/GameState";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import { RoomSelect } from "./RoomSelect";
import { CssSprite } from "../Sprite";

import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { useLevelSelectByUrlHash } from "./useLevelSelectByUrlHash";

import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";
import { useGameApi } from "../GameApiContext";
import { Button } from "../../../components/ui/button";
import type {
  JsonItemType,
  JsonItemConfig,
} from "../../../model/json/JsonItem";
import {
  otherIndividualCharacterName,
  type CharacterName,
} from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { blockSizePx } from "../../../sprites/spritePivots";
import {
  setShowBoundingBoxes,
  setShowShadowMasks,
} from "../../../store/gameMenusSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { GameApi } from "../../GameApi";
import { useDebugClickOnItem } from "./useDebugClickOnItem";
import { Switch } from "../../../components/ui/switch";
import { swopFromUncombinedToCombinedPlayables } from "../../gameState/mutators/swopCharacters";

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
        if (gameApi.gameState.currentCharacterName === playableName) {
          return;
        }

        const roomId = selectCurrentRoomState(gameApi.gameState).id;
        gameApi.gameState.currentCharacterName = playableName;

        if (playableName === "headOverHeels") {
          //sneakily combine the players by moving them to the final room first:
          const head = gameApi.gameState.characterRooms.head?.items.head;
          const heels = gameApi.gameState.characterRooms.heels?.items.heels;
          if (!head || !heels) {
            console.log(
              "cant summon headOverHeels - one of the individuals is not in the game to combine",
            );
          } else {
            changeCharacterRoom({
              playableItem: head,
              gameState: gameApi.gameState,
              changeType: "level-select",
              toRoomId: "finalroom" as RoomId,
            });
            changeCharacterRoom({
              playableItem: heels,
              gameState: gameApi.gameState,
              changeType: "level-select",
              toRoomId: "finalroom" as RoomId,
            });

            swopFromUncombinedToCombinedPlayables(gameApi.gameState);
            changeCharacterRoom({
              playableItem:
                gameApi.gameState.characterRooms.headOverHeels!.items
                  .headOverHeels!,
              gameState: gameApi.gameState,
              changeType: "level-select",
              toRoomId: roomId,
            });
          }
        }

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
          <CssSprite className="texture-head.walking.right.2 [button:hover_&]:texture-animated-head.walking.towards" />
          over
          <CssSprite className="texture-heels.walking.right.2 [button:hover_&]:texture-animated-heels.walking.towards" />
        </>
      : <CssSprite
          className={`texture-${playableName}.walking.right.2 [button:hover_&]:texture-animated-${playableName}.walking.towards`}
        />
      }
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

  useDebugClickOnItem();

  const { showBoundingBoxes, showShadowMasks } = useAppSelector(
    (state) => state.userSettings.displaySettings,
  );
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
      room: selectCurrentRoomState(gameState),
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
        <CssSprite className="texture-helicopterBug.1 hover:texture-animated-helicopterBug zx:sprite-revert-to-two-tone" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className="absolute [--scale:1] [--block:8px] bottom-[48px] right-1 flex flex-col w-[500px]"
          style={{ "--scale": 2 }}
        >
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
              <CssSprite className="texture-bag" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "hooter" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-hooter" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "doughnuts" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-doughnuts" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("portableBlock", { style: "cube" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-cube" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("spring", {});
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-spring.released" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("monster", {
                  which: "dalek",
                  activated: true,
                  movement: "patrol-randomly-diagonal",
                });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-dalek.1 hover:texture-animated-dalek" />
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "crown", planet: "bookworld" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-crown.bookworld" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "crown", planet: "egyptus" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-crown.egyptus" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "crown", planet: "safari" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-crown.safari" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", {
                  gives: "crown",
                  planet: "penitentiary",
                });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-crown.penitentiary" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "crown", planet: "blacktooth" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-crown.blacktooth" />
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
              <CssSprite className="texture-bunny" />
              <CssSprite className="texture-hud.char.2" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "shield" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-bunny" />
              <CssSprite className="texture-hud.shield" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "fast" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-bunny" />
              <CssSprite className="texture-hud.fastSteps" />
            </Button>
            <Button
              className="flex-1"
              onClick={(e) => {
                summonItem("pickup", { gives: "jumps" });
                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-bunny" />
              <CssSprite className="texture-hud.bigJumps" />
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
                  const { currentCharacterName } = gameApi.gameState;
                  const playable =
                    gameApi.currentRoom.items[currentCharacterName];

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).playable = playable;
                  console.log("currentCharacterName:", playable);
                  console.log("playable on window.playable");

                  if (currentCharacterName !== "headOverHeels") {
                    const otherName =
                      otherIndividualCharacterName(currentCharacterName);
                    const otherPlayableRoom =
                      gameApi.gameState.characterRooms[otherName];
                    console.log(
                      otherName,
                      "in room",
                      otherPlayableRoom?.id,
                      otherPlayableRoom?.items[otherName],
                    );
                  }
                }

                e.currentTarget.blur();
              }}
            >
              <CssSprite className="texture-head.walking.right.2" />
              <CssSprite className="texture-heels.walking.right.2" />
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Cheats;
