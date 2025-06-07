import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import { RoomSelect } from "./RoomSelect";

import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { useLevelSelectByUrlHash } from "./useLevelSelectByUrlHash";

import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";
import { useGameApi } from "../GameApiContext";
import { Button } from "../../../ui/button";
import type {
  JsonItemType,
  JsonItemConfig,
} from "../../../model/json/JsonItem";
import type { IndividualCharacterName } from "../../../model/modelTypes";
import {
  otherIndividualCharacterName,
  type CharacterName,
} from "../../../model/modelTypes";
import { blockSizePx } from "../../../sprites/spritePivots";
import { useAppDispatch } from "../../../store/hooks";
import type { GameApi } from "../../GameApi";
import { useDebugClickOnItem } from "./useDebugClickOnItem";
import { swopFromUncombinedToCombinedPlayables } from "../../gameState/mutators/swopCharacters";
import { Switch } from "../../../ui/Switch";
import { useShowShadowMasks } from "../../../store/selectors";
import { setShowShadowMasks } from "../../../store/slices/gameMenusSlice";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { getRoomItem } from "../../../model/RoomState";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { ShowBoundingBoxSelect } from "../../debug/ShowBoundingBoxSelect";
import { BitmapText } from "../tailwindSprites/Sprite";
import { CssVariables } from "../CssVariables";

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

const cheatsButtonClasses = "flex-1 h-3";

const SummonPlayableButton = <RoomId extends string>({
  gameApi,
  playableName,
}: SummonPlayableButtonProps<RoomId>) => {
  return (
    <Button
      className={cheatsButtonClasses}
      onClick={(e) => {
        if (gameApi.gameState.currentCharacterName === playableName) {
          return;
        }

        const roomId = selectCurrentRoomState(gameApi.gameState)?.id;
        if (roomId === undefined) {
          return;
        }
        gameApi.gameState.currentCharacterName = playableName;

        if (playableName === "headOverHeels") {
          //sneakily combine the players by moving them to the final room first:
          const head = getRoomItem(
            "head",
            gameApi.gameState.characterRooms.head?.items,
          );
          const heels = getRoomItem(
            "heels",
            gameApi.gameState.characterRooms.heels?.items,
          );

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

            /** TODO: @knownRoomIds - remove casts */
            const headOverHeels = gameApi.gameState.characterRooms
              .headOverHeels!.items.headOverHeels as ItemInPlay<
              "headOverHeels",
              RoomId,
              string
            >;

            changeCharacterRoom({
              playableItem: headOverHeels,
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
          <span className="sprite texture-head.walking.right.2 [button:hover_&]:texture-animated-head.walking.towards" />
          over
          <span className="sprite texture-heels.walking.right.2 [button:hover_&]:texture-animated-heels.walking.towards" />
        </>
      : <span
          className={`sprite texture-${playableName}.walking.right.2 [button:hover_&]:texture-animated-${playableName}.walking.towards`}
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
      className={cheatsButtonClasses}
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
  return <h4 className="bg-redShadow zx:bg-zxMagenta pl-1">{children}</h4>;
};

export const Cheats = <RoomId extends string>(_emptyProps: EmptyObject) => {
  const gameApi = useGameApi<RoomId>();

  useDebugClickOnItem();

  const showShadowMasks = useShowShadowMasks();
  const dispatch = useAppDispatch();

  useLevelSelectByUrlHash(gameApi);

  const summonItem = <T extends JsonItemType>(
    itemType: T,
    config: JsonItemConfig<T, RoomId>,
  ) => {
    const { gameState } = gameApi;
    const playable = selectCurrentPlayableItem(gameState);
    if (playable === undefined) {
      // probably can't click this button when there is no playable (game over)
      // but protect anyway
      return;
    }
    const room = selectCurrentRoomState(gameState);
    if (room === undefined) {
      return;
    }
    addItemFromJsonToRoom({
      gameState,
      room,
      itemType,
      config,
      // locate the item above the player
      position: {
        ...playable.state.position,
        z: playable.state.position.z + blockSizePx.h * 2,
      },
    });
  };

  return (
    <Collapsible>
      <CollapsibleTrigger
        className="absolute bottom-0 right-1 flex flex-col z-cheats text-midRed hover:text-metallicBlue "
        onClick={(e) => e.currentTarget.blur()}
      >
        <span className="sprite texture-helicopterBug.1 hover:texture-animated-helicopterBug zx:sprite-revert-to-two-tone" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CssVariables scaleFactor={2}>
          <div className="absolute bottom-[48px] max-h-[calc(100vh-48px)] right-1 flex flex-col w-[500px] zx:[&_.sprite]:sprite-revert-to-white overflow-y-scroll z-cheats text-white">
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
              <GoToRoomButton gameApi={gameApi} roomId={"moonbase1" as RoomId}>
                Moonbase
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
            <Heading>debug rendering:</Heading>
            <div className="flex flex-row items-center gap-x-1 justify-center pb-1 pt-1 bg-shadow text-white">
              <BitmapText>BBs:</BitmapText>
              <ShowBoundingBoxSelect />
              <BitmapText>shadow:</BitmapText>
              <Switch
                value={showShadowMasks}
                onClick={(e, newValue) => {
                  dispatch(setShowShadowMasks(newValue));
                  e.currentTarget.blur();
                }}
              />
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
            <div className="flex flex-row items-center flex-wrap">
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "bag" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-bag" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "hooter" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-hooter" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "doughnuts" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-doughnuts" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("portableBlock", { style: "cube" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-cube" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("spring", {});
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-spring.released" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "dalek",
                    activated: "on",
                    movement: "patrol-randomly-diagonal",
                  });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-dalek.1 hover:texture-animated-dalek" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "turtle",
                    activated: "on",
                    movement: "clockwise",
                    startDirection: "towards",
                  });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-turtle.towards.1 hover:texture-animated-turtle.towards" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "skiHead",
                    activated: "on",
                    movement: "clockwise",
                    startDirection: "towards",
                    style:
                      Math.random() > 0.5 ? "greenAndPink" : "starsAndStripes",
                  });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-skiHead.greenAndPink.towards" />
              </Button>
            </div>
            <div className="flex flex-row items-center">
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "crown", planet: "bookworld" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-crown.bookworld" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "crown", planet: "egyptus" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-crown.egyptus" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "crown", planet: "safari" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-crown.safari" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", {
                    gives: "crown",
                    planet: "penitentiary",
                  });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-crown.penitentiary" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", {
                    gives: "crown",
                    planet: "blacktooth",
                  });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-crown.blacktooth" />
              </Button>
            </div>
            <div className="flex flex-row items-center">
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "extra-life" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-whiteRabbit" />
                <span className="sprite texture-hud.char.2 left-m2 relative" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "shield" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-whiteRabbit" />
                <span className="sprite texture-hud.char.🛡 left-m2 relative" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "fast" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-whiteRabbit" />
                <span className="sprite texture-hud.char.⚡ left-m2 relative" />
              </Button>
              <Button
                className={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "jumps" });
                  e.currentTarget.blur();
                }}
              >
                <span className="sprite texture-whiteRabbit" />
                <span className="sprite texture-hud.char.♨ left-m2 relative" />
              </Button>
            </div>

            <Heading>game speed x:</Heading>
            <div className="flex flex-row items-center">
              <SpeedButton
                className={cheatsButtonClasses}
                speed={0.05}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={0.2}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={0.5}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={1}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={2}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={5}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={10}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={25}
                gameApi={gameApi}
              />
              <SpeedButton
                className={cheatsButtonClasses}
                speed={100}
                gameApi={gameApi}
              />
            </div>

            <Heading>write to console:</Heading>
            <div className="flex flex-row items-center flex-wrap">
              <Button
                className="flex-grow h-3"
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
                className="flex-grow h-3"
                onClick={(e) => {
                  if (gameApi) {
                    const roomJson = selectCurrentRoomState(
                      gameApi.gameState,
                    )?.roomJson;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).roomJson = roomJson;
                    console.log("roomJson:", roomJson);
                    console.log("roomJson on window.roomJson");
                  }
                  e.currentTarget.blur();
                }}
              >
                Room JSON
              </Button>
              <Button
                className="flex-grow h-3"
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
                    const playable = selectCurrentPlayableItem(
                      gameApi.gameState,
                    );
                    if (playable === undefined) {
                      console.log("no playable item");
                      return;
                    }

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).playable = playable;
                    console.log("currentCharacterName:", playable);
                    console.log("playable on window.playable");

                    if (playable.id !== "headOverHeels") {
                      /** TODO: @knownRoomIds - remove casts */
                      const otherName = otherIndividualCharacterName(
                        playable.id as IndividualCharacterName,
                      );
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
                <span className="sprite texture-head.walking.right.2" />
                <span className="sprite texture-heels.walking.right.2" />
              </Button>
            </div>
          </div>
        </CssVariables>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Cheats;
