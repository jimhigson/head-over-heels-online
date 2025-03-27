import headWalkSoundUrl from "../../sounds/head-walking.mp3?url";
import heelsWalkSoundUrl from "../../sounds/heels-walking.mp3?url";
import teleportWarningSirenSoundUrl from "../../sounds/teleportWarningSiren.mp3?url";
import helicopterSoundUrl from "../../sounds/helicopter.mp3?url";
import switchClickSoundUrl from "../../sounds/switch-shorter.mp3?url";
import bonusSoundUrl from "../../sounds/bonus.mp3?url";
import dropSoundUrl from "../../sounds/drop2.mp3?url";
import carrySoundUrl from "../../sounds/sources/wind-swoosh-short-289744.mp3?url";
import teleportInSoundUrl from "../../sounds/teleportIn.mp3?url";
import teleportOutSoundUrl from "../../sounds/teleportOut.mp3?url";
import softBumpSoundUrl from "../../sounds/sources/soft-slot-stop-03.m4a?url";
import jetpackLoopSoundUrl from "../../sounds/sources/jetpack-loop-1.m4a";
import jetpackTurnaroundSoundUrl from "../../sounds/jetpack_turnaround.mp3?url";
import conveyorStartSoundUrl from "../../sounds/sources/gear-crank-elevator-2-start-sound-effect-245865410_nw_prev.m4a?url";
import conveyorLoopSoundUrl from "../../sounds/sources/gear-crank-elevator-2-loop-sound-effect-245865336_nw_prev.m4a?url";
import conveyorEndSoundUrl from "../../sounds/sources/gear-crank-elevator-2-stop-sound-effect-245865549_nw_prev.m4a?url";
import mojoLoopSoundUrl from "../../sounds/mojo.mp3";
import mojoTurnSoundUrl from "../../sounds/sources/beep-sound-effect-079209953_nw_prev.m4a?url";
import bubbleRobotLoopSoundUrl from "../../sounds/sources/bubbles-loop-08-sound-effect-150574560_nw_prev.m4a?url";
import springBoingSoundUrl from "../../sounds/spring.mp3";
import drumSoundUrl from "../../sounds/sources/wood-bongo-balloon-pop-perc-sound-effect-302012587_nw_prev.m4a";
import servoStartUrl from "../../sounds/servosStart.mp3?url";
import servoLoopUrl from "../../sounds/servosLoop.mp3?url";
import servoStoptUrl from "../../sounds/servosStop.mp3?url";
import rollingBallLoopSoundUrl from "../../sounds/rollingBallLoop.mp3?url";
import stepStoolScrapingSoundUrl from "../../sounds/sources/machmech_mechanical-loop-heavy-scraping-metallic-sound-effect-239482373_nw_prev.m4a";
import metalHitSoundUrl from "../../sounds/metalClang.mp3";

import { importOnce } from "../utils/importOnce";
import { audioCtx } from "./audioCtx";

type AppSounds = Awaited<ReturnType<typeof importSoundsOnce>>;

export type SoundId = keyof AppSounds;

let loaded: AppSounds | undefined = undefined;

const loadAndDecode = async (url: string) => {
  return await audioCtx.decodeAudioData(await (await fetch(url)).arrayBuffer());
};

const importSoundsOnce = importOnce(async () => {
  return {
    headWalk: await loadAndDecode(headWalkSoundUrl),
    heelsWalk: await loadAndDecode(heelsWalkSoundUrl),
    teleportWarningSiren: await loadAndDecode(teleportWarningSirenSoundUrl),
    helicopter: await loadAndDecode(helicopterSoundUrl),
    switchClick: await loadAndDecode(switchClickSoundUrl),
    bonus: await loadAndDecode(bonusSoundUrl),
    drop: await loadAndDecode(dropSoundUrl),
    carry: await loadAndDecode(carrySoundUrl),
    teleportIn: await loadAndDecode(teleportInSoundUrl),
    teleportOut: await loadAndDecode(teleportOutSoundUrl),
    softBump: await loadAndDecode(softBumpSoundUrl),
    jetpackLoop: await loadAndDecode(jetpackLoopSoundUrl),
    jetpackTurnaround: await loadAndDecode(jetpackTurnaroundSoundUrl),
    conveyorStart: await loadAndDecode(conveyorStartSoundUrl),
    conveyorLoop: await loadAndDecode(conveyorLoopSoundUrl),
    conveyorEnd: await loadAndDecode(conveyorEndSoundUrl),
    mojoLoop: await loadAndDecode(mojoLoopSoundUrl),
    mojoTurn: await loadAndDecode(mojoTurnSoundUrl),
    bubbleRobotLoop: await loadAndDecode(bubbleRobotLoopSoundUrl),
    springBoing: await loadAndDecode(springBoingSoundUrl),
    drum: await loadAndDecode(drumSoundUrl),
    servoStart: await loadAndDecode(servoStartUrl),
    servoLoop: await loadAndDecode(servoLoopUrl),
    servoStop: await loadAndDecode(servoStoptUrl),
    rollingBallLoop: await loadAndDecode(rollingBallLoopSoundUrl),
    stepStoolScraping: await loadAndDecode(stepStoolScrapingSoundUrl),
    metalHit: await loadAndDecode(metalHitSoundUrl),
  };
});

export const loadSounds = async () => {
  if (loaded !== undefined) {
    return;
  }

  loaded = await importSoundsOnce();
};

/**
 * NOTE: this is only safe to call after the spritesheet has had load() called
 * and it resolved! - this is a sync export since we need to get the spritesheet
 * inside the update/render loop synchronously many times
 */
export const loadedSounds = (): AppSounds => {
  if (loaded === undefined) {
    throw new Error(
      `sounds not loaded - only call this from inside code 
      (like in a render loop) that is protected and only executed once 
      loading has happened`,
    );
  }
  return loaded;
};
