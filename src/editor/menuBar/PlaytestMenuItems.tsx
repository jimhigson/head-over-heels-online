import { store, useEditorAppSelector } from "../../store/store";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { Switch, SwitchN } from "../../ui/Switch";
import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { CommandMenuItem } from "../commands/CommandMenuItem";
import { playtestGameUrls } from "../playtestGameUrls";
import {
  selectPlaytestOptions,
  setPlaytestOptions,
} from "../slice/levelEditorSlice";

const gameUrlLabel = (url: string): string =>
  playtestGameUrls.find((gameUrl) => gameUrl.url === url)?.label ?? url;

/** the playtest menu: playing the campaign, and the options for it */
export const PlaytestMenuItems = () => {
  const playtestOptions = useEditorAppSelector(selectPlaytestOptions);
  // a saved game url that is none of these is offered too:
  const gameUrls =
    playtestGameUrls.some(({ url }) => url === playtestOptions.baseUrl) ?
      playtestGameUrls.map(({ url }) => url)
    : [playtestOptions.baseUrl, ...playtestGameUrls.map(({ url }) => url)];

  return (
    <>
      <CommandMenuItem command={actionCommandDefinitions.playtest} />
      <MenuItem
        label="Start from"
        keepsMenuOpen
        onSelect={() =>
          store.dispatch(
            setPlaytestOptions({ fromStart: !playtestOptions.fromStart }),
          )
        }
        control={
          <Switch
            ariaLabel="Playtest start point"
            value={playtestOptions.fromStart}
            falseLabel="this room"
            trueLabel="start"
            onChange={(fromStart) =>
              store.dispatch(setPlaytestOptions({ fromStart }))
            }
          />
        }
      />
      <MenuItem
        label="Play as"
        keepsMenuOpen
        onSelect={() =>
          store.dispatch(
            setPlaytestOptions({ playAsHeels: !playtestOptions.playAsHeels }),
          )
        }
        control={
          <Switch
            ariaLabel="Playtest character"
            value={playtestOptions.playAsHeels}
            falseLabel="head"
            trueLabel="heels"
            onChange={(playAsHeels) =>
              store.dispatch(setPlaytestOptions({ playAsHeels }))
            }
          />
        }
      />
      <MenuItem
        label="Open game at"
        keepsMenuOpen
        onSelect={() =>
          store.dispatch(
            setPlaytestOptions({
              baseUrl:
                gameUrls[
                  (gameUrls.indexOf(playtestOptions.baseUrl) + 1) %
                    gameUrls.length
                ],
            }),
          )
        }
        control={
          <SwitchN
            ariaLabel="Playtest game"
            values={gameUrls}
            valueLabels={gameUrls.map(gameUrlLabel)}
            value={playtestOptions.baseUrl}
            onChange={(baseUrl) =>
              store.dispatch(setPlaytestOptions({ baseUrl }))
            }
          />
        }
      />
    </>
  );
};
