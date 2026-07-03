import { type PropsWithChildren } from "preact/compat";
import { useState } from "preact/hooks";
import { type EmptyObject } from "type-fest";

import { type ItemInPlay } from "../../../model/ItemInPlay";
import { addPokeableNumbers } from "../../../model/ItemStateMap";
import {
  type JsonItemConfig,
  type JsonItemType,
} from "../../../model/json/JsonItem";
import {
  type CharacterName,
  type IndividualCharacterName,
  otherIndividualCharacterName,
} from "../../../model/modelTypes";
import { getRoomItem, roomSpatialIndexKey } from "../../../model/RoomState";
import {
  type AnimatedTextureTailwindClass,
  type TextureTailwindClass,
} from "../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useShowShadowMasks } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { type SelectableGameSpeeds } from "../../../store/slices/userSettings/selectableGameSpeeds";
import {
  setGameSpeed,
  setShowShadowMasks,
} from "../../../store/slices/userSettings/userSettingsSlice";
import { Button } from "../../../ui/Button";
import { Switch } from "../../../ui/Switch";
import { ShowBoundingBoxSelect } from "../../debug/ShowBoundingBoxSelect";
import { type GameApi } from "../../GameApi";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import {
  selectCurrentPlayableItem,
  selectPlayableItem,
} from "../../gameState/gameStateSelectors/selectPlayableItem";
import { addItemFromJsonToRoom } from "../../gameState/mutators/addItemToRoom";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import { swopFromUncombinedToCombinedPlayables } from "../../gameState/mutators/swopPlayables";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { boundingBoxDecorateItemRenderer } from "../../render/item/itemRender/boundingBoxDecorateItemRenderer";
import { debugPointerDecorateItemRenderer } from "../../render/item/itemRender/debugPointerDecorateItemRenderer";
import { subRoomBoundariesDecorateRoomRenderer } from "../../render/room/subRoomBoundariesDecorateRoomRenderer";
import { useRegisterDecorateItemRenderers } from "../../render/useRegisterDecorateItemRenderers";
import { useRegisterDecorateRoomRenderers } from "../../render/useRegisterDecorateRoomRenderers";
import { CssVariables } from "../CssVariables";
import { useGameApi } from "../GameApiContext";
import { usePlayableTailwindSpriteClassname } from "../tailwindSprites/playableTailwindSpriteClassname";
import { GameApiConnectedRoomSelect } from "./GameApiConnectedRoomSelect";
import { useLevelSelectByUrlHash } from "./useLevelSelectByUrlHash";

interface SpeedButtonProps {
  speed: number;
  class?: string;
}

const SpeedButton = ({ speed, class: className = "" }: SpeedButtonProps) => {
  const dispatch = useAppDispatch();
  const currentSpeed = useAppSelector(
    (state) => state.userSettings.userSettings.gameSpeed,
  );

  return (
    <Button
      data-test-id={"cheats-speed-" + speed}
      class={`${cheatsButtonClasses} ${className} ${speed === currentSpeed ? "bg-shadow text-white" : ""}`}
      onClick={(e) => {
        dispatch(
          setGameSpeed(
            // since we're cheating, illegally pass in the wrong number while casting
            // to the legal numbers:
            speed as SelectableGameSpeeds,
          ),
        );
        (e?.currentTarget as HTMLElement | undefined)?.blur();
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
  const spriteClassname = usePlayableTailwindSpriteClassname();
  return (
    <Button
      data-test-id={`cheats-summon-character-${playableName}`}
      class={cheatsButtonClasses}
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
        (e?.currentTarget as HTMLElement | undefined)?.blur();
      }}
    >
      {playableName === "headOverHeels" ?
        <>
          <span
            class={`sprite
              ${spriteClassname({ character: "head", action: "idle", facingXy8: "right" })}`}
          />
          over
          <span
            class={`sprite
              ${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })}`}
          />
        </>
      : playableName === "heels" ?
        <span
          class={`sprite
            ${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })}`}
        />
      : <span
          class={`sprite
            ${spriteClassname({ character: "head", action: "idle", facingXy8: "right" })}`}
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
      data-test-id={`cheats-goto-room-${roomId}`}
      class={cheatsButtonClasses}
      onClick={(e) => {
        gameApi.changeRoom(roomId);
        (e?.currentTarget as HTMLElement | undefined)?.blur();
      }}
    >
      {children || roomId}
    </Button>
  );
};

const Heading = ({ children }: { children: string }) => {
  return <h4 class="bg-redShadow zx:bg-zxMagenta pl-1">{children}</h4>;
};

let summonedItemNumber = 0;

const cheatsDecorators = [
  boundingBoxDecorateItemRenderer,
  debugPointerDecorateItemRenderer,
];

const cheatsRoomDecorators = [subRoomBoundariesDecorateRoomRenderer];

export const Cheats = <RoomId extends string>(_emptyProps: EmptyObject) => {
  useRegisterDecorateItemRenderers(cheatsDecorators);
  useRegisterDecorateRoomRenderers(cheatsRoomDecorators);
  const gameApi = useGameApi<RoomId>();
  const spriteClassname = usePlayableTailwindSpriteClassname();

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
        z: playable.state.position.z + blockSizePx.z * 2,
      },
      additionalIdPart: `${summonedItemNumber++}`,
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        data-test-id="cheats-open-button"
        aria-expanded={open}
        aria-controls="cheats-menu"
        class="absolute bottom-0 right-1 flex flex-col z-cheats text-midRed hover:text-metallicBlue "
        onClick={(e) => {
          setOpen((o) => !o);
          (e.currentTarget as HTMLElement).blur();
        }}
      >
        <span
          class={`sprite ${"texture-helicopterBug_1" satisfies TextureTailwindClass} ${"hover:texture-animated-helicopterBug" satisfies AnimatedTextureTailwindClass} zx:sprite-revert-to-two-tone`}
        />
      </button>
      {open && (
        <div
          id="cheats-menu"
          data-test-id="cheats-menu"
          class="absolute bottom-3 max-h-[calc(100vh-var(--block)*3)] right-0 flex flex-col w-[500px] zx:[&_.sprite]:sprite-revert-to-white overflow-y-scroll z-cheats text-white"
        >
          <CssVariables scaleFactor={2}>
            <Heading>room select:</Heading>
            <GameApiConnectedRoomSelect />
            <div class="flex flex-row items-center">
              <GoToRoomButton
                gameApi={gameApi}
                roomId={"blacktooth1head" as RoomId}
              >
                Starting room
              </GoToRoomButton>
              <GoToRoomButton gameApi={gameApi} roomId={"finalroom" as RoomId}>
                Final room
              </GoToRoomButton>
            </div>
            <div class="flex flex-row items-center">
              <GoToRoomButton
                gameApi={gameApi}
                roomId={"blacktooth45market" as RoomId}
              >
                Mkt
              </GoToRoomButton>
              <GoToRoomButton gameApi={gameApi} roomId={"moonbase1" as RoomId}>
                Mob
              </GoToRoomButton>
              <GoToRoomButton gameApi={gameApi} roomId={"egyptus1" as RoomId}>
                Egy
              </GoToRoomButton>
              <GoToRoomButton gameApi={gameApi} roomId={"safari1" as RoomId}>
                Saf
              </GoToRoomButton>
              <GoToRoomButton gameApi={gameApi} roomId={"bookworld1" as RoomId}>
                Boo
              </GoToRoomButton>
              <GoToRoomButton
                gameApi={gameApi}
                roomId={"penitentiary1" as RoomId}
              >
                Pen
              </GoToRoomButton>
            </div>
            <Heading>debug rendering:</Heading>
            <div class="flex flex-row items-center gap-x-1 justify-center pb-1 pt-1 bg-shadow text-white">
              <span class="text-single-line">BB:</span>
              <ShowBoundingBoxSelect
                getCurrentRoomItems={() =>
                  selectCurrentRoomState(gameApi.gameState)?.items
                }
              />
              <Switch
                label="shadow"
                value={showShadowMasks}
                onChange={(newValue, e) => {
                  dispatch(setShowShadowMasks(newValue));
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              />
            </div>

            <Heading>summon character:</Heading>
            <div class="flex flex-row items-center">
              <SummonPlayableButton gameApi={gameApi} playableName="head" />
              <SummonPlayableButton gameApi={gameApi} playableName="heels" />
              <SummonPlayableButton
                gameApi={gameApi}
                playableName="headOverHeels"
              />
            </div>
            <Heading>summon item:</Heading>
            <div class="flex flex-row items-center flex-wrap">
              <Button
                data-test-id="cheats-summon-portableBlock-cube"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("portableBlock", { style: "cube" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-cube" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-ball"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("ball", {});
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-ball" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-spring"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("spring", {});
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-spring_released" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-monster-dalek"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "dalek",
                    activated: "on",
                    movement: "patrol-randomly-diagonal",
                  });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-dalek_1" satisfies TextureTailwindClass} ${"hover:texture-animated-dalek" satisfies AnimatedTextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-monster-turtle"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "turtle",
                    activated: "on",
                    movement: "clockwise",
                    startDirection: "towards",
                  });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-turtle_towards_1" satisfies TextureTailwindClass} ${"hover:texture-animated-turtle_towards" satisfies AnimatedTextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-monster-skiHead"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "skiHead",
                    activated: "on",
                    movement: "clockwise",
                    startDirection: "towards",
                    style:
                      Math.random() > 0.5 ? "greenAndPink" : "starsAndStripes",
                  });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-skiHead_greenAndPink_towards" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-monster-emperorsGuardian"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("monster", {
                    which: "emperorsGuardian",
                    activated: "on",
                    movement: "towards-analogue-unless-planet-crowns",
                  });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-emperorsGuardian_1" satisfies TextureTailwindClass} ${"hover:texture-animated-emperorsGuardian" satisfies AnimatedTextureTailwindClass}`}
                />
              </Button>
            </div>
            <div class="flex flex-row items-center">
              <Button
                data-test-id="cheats-summon-bag"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "bag" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-bag" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-hooter"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "hooter" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-hooter" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-doughnuts"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "doughnuts" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-doughnuts" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-crown-bookworld"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "crown", planet: "bookworld" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-crown_bookworld" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-crown-egyptus"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "crown", planet: "egyptus" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-crown_egyptus" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-crown-safari"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "crown", planet: "safari" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-crown_safari" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-crown-penitentiary"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", {
                    gives: "crown",
                    planet: "penitentiary",
                  });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-crown_penitentiary" satisfies TextureTailwindClass}`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-crown-blacktooth"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", {
                    gives: "crown",
                    planet: "blacktooth",
                  });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-crown_blacktooth" satisfies TextureTailwindClass}`}
                />
              </Button>
            </div>
            <div class="flex flex-row items-center">
              <Button
                data-test-id="cheats-summon-extra-life"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "extra-life" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-whiteRabbit_extra-life" satisfies TextureTailwindClass}`}
                />
                <span
                  class={`sprite ${"texture-hud_char_2" satisfies TextureTailwindClass} left-m2 relative`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-shield"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "shield" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-whiteRabbit_shield" satisfies TextureTailwindClass}`}
                />
                <span
                  class={`sprite ${"texture-hud_char_🛡" satisfies TextureTailwindClass} left-m2 relative`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-fast"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "fast" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-whiteRabbit_fast" satisfies TextureTailwindClass}`}
                />
                <span
                  class={`sprite ${"texture-hud_char_⚡" satisfies TextureTailwindClass} left-m2 relative`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-jumps"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "jumps" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-whiteRabbit_jumps" satisfies TextureTailwindClass}`}
                />
                <span
                  class={`sprite ${"texture-hud_char_♨" satisfies TextureTailwindClass} left-m2 relative`}
                />
              </Button>
              <Button
                data-test-id="cheats-summon-reincarnation"
                class={cheatsButtonClasses}
                onClick={(e) => {
                  summonItem("pickup", { gives: "reincarnation" });
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${"texture-fish_1" satisfies TextureTailwindClass} ${"hover:texture-animated-fish" satisfies AnimatedTextureTailwindClass}`}
                />
              </Button>
            </div>

            <Heading>game speed:</Heading>
            <div class="flex flex-row items-center">
              <SpeedButton
                speed={-1}
                class="bg-midRed text-white zx:bg-zxRed toppy:bg-toppyPink2"
              />
              <SpeedButton
                speed={0}
                class="bg-midGrey text-white zx:bg-zxBlack toppy:bg-toppyGrey3"
              />
              <SpeedButton speed={0.05} />
              <SpeedButton speed={0.2} />
              <SpeedButton speed={0.5} />
              <SpeedButton
                speed={1}
                class="bg-pastelBlue text-shadow zx:bg-zxCyan zx:text-zxBlack toppy:bg-toppyCool1 toppy:text-toppyGrey4"
              />
              <SpeedButton
                speed={1.2}
                class="bg-moss text-shadow zx:bg-zxGreen zx:text-zxBlack toppy:bg-toppyCool2 toppy:text-toppyGrey4"
              />
              <SpeedButton
                speed={1.5}
                class="bg-pastelBlue text-shadow zx:bg-zxCyan zx:text-zxBlack toppy:bg-toppyCool1 toppy:text-toppyGrey4"
              />
              <SpeedButton
                speed={2}
                class="bg-pastelBlue text-shadow zx:bg-zxCyan zx:text-zxBlack toppy:bg-toppyCool1 toppy:text-toppyGrey4"
              />
              <SpeedButton speed={5} />
              <SpeedButton speed={10} />
              <SpeedButton
                speed={25}
                class="bg-highlightBeige text-shadow zx:bg-zxYellow zx:text-zxBlack toppy:bg-toppyWarm3 toppy:text-toppyGrey4"
              />
              <SpeedButton
                speed={100}
                class="bg-lightBeige text-shadow zx:bg-zxYellowDimmed zx:text-zxBlack toppy:bg-toppyWarm2 toppy:text-toppyGrey4"
              />
              <SpeedButton
                speed={250}
                class="bg-midRed text-white zx:bg-zxRed toppy:bg-toppyPink2"
              />
            </div>

            <Heading>pokes:</Heading>
            <div class="flex flex-row items-center flex-wrap">
              <Button
                data-test-id="cheats-poke-lives-plus"
                class="flex-grow h-3"
                onClick={(e) => {
                  if (!gameApi) {
                    return;
                  }
                  const playable = selectCurrentPlayableItem(gameApi.gameState);
                  if (!playable) {
                    return;
                  }
                  if (playable.type === "headOverHeels") {
                    playable.state.head.lives = addPokeableNumbers(
                      playable.state.head.lives,
                      1,
                    );
                    playable.state.heels.lives = addPokeableNumbers(
                      playable.state.heels.lives,
                      1,
                    );
                  } else {
                    playable.state.lives = addPokeableNumbers(
                      playable.state.lives,
                      1,
                    );
                  }

                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                lives++
              </Button>
              <Button
                data-test-id="cheats-poke-lives-minus"
                class="flex-grow h-3"
                onClick={(e) => {
                  if (!gameApi) {
                    return;
                  }
                  const playable = selectCurrentPlayableItem(gameApi.gameState);
                  if (!playable) {
                    return;
                  }
                  if (playable.type === "headOverHeels") {
                    playable.state.head.lives = addPokeableNumbers(
                      playable.state.head.lives,
                      -1,
                    );
                    playable.state.heels.lives = addPokeableNumbers(
                      playable.state.heels.lives,
                      -1,
                    );
                  } else {
                    playable.state.lives = addPokeableNumbers(
                      playable.state.lives,
                      -1,
                    );
                  }

                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                lives--
              </Button>
            </div>
            <Heading>WebGL context:</Heading>
            <div class="flex flex-row items-center flex-wrap">
              <Button
                data-test-id="cheats-lose-gl-context"
                class="flex-grow h-3"
                onClick={(e) => {
                  gameApi.loseWebGlContext();
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                Lose & restore WebGL context
              </Button>
            </div>
            <Heading>write to console:</Heading>
            <div class="flex flex-row items-center flex-wrap">
              <Button
                class="flex-grow h-3"
                onClick={(e) => {
                  if (gameApi) {
                    console.log(gameApi.gameState);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).gs = gameApi.gameState;
                    console.log("gameState on window.gs");
                  }
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                gameState
              </Button>
              <Button
                class="flex-grow h-3"
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
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                Room JSON
              </Button>
              <Button
                class="flex-grow h-3"
                onClick={(e) => {
                  if (gameApi) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).room = gameApi.currentRoom;
                    if (gameApi.currentRoom) {
                      console.log(gameApi.currentRoom);
                      console.log(
                        "spatial index is",
                        gameApi.currentRoom[
                          roomSpatialIndexKey
                        ].debugToString(),
                      );
                      console.log("currentRoom on window.room");
                    }
                  }
                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                Room state
              </Button>
              <Button
                class="flex-grow"
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

                  (e?.currentTarget as HTMLElement | undefined)?.blur();
                }}
              >
                <span
                  class={`sprite ${spriteClassname({ character: "head", action: "idle", facingXy8: "right" })}`}
                />
                <span
                  class={`sprite ${spriteClassname({ character: "heels", action: "idle", facingXy8: "right" })}`}
                />
              </Button>
            </div>
          </CssVariables>
        </div>
      )}
    </>
  );
};

export default Cheats;
