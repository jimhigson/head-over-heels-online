import headWalkSoundUrl from "../../sounds/headWalk.mp3";
import headJumpSoundUrl from "../../sounds/headJump.mp3";
import headFallSoundUrl from "../../sounds/headFall.mp3";
import heelsWalkSoundUrl from "../../sounds/heelsWalk.mp3";
import heelsJumpSoundUrl from "../../sounds/heelsJump.mp3";
import heelsFallSoundUrl from "../../sounds/heelsFall.mp3";
import teleportWarningSirenSoundUrl from "../../sounds/teleportWarningSiren.mp3";
import helicopterSoundUrl from "../../sounds/helicopter.mp3";
import switchClickSoundUrl from "../../sounds/switch-shorter.mp3";
import bonusSoundUrl from "../../sounds/bonus.mp3";
import carrySoundUrl from "../../sounds/sources/wind-swoosh-short-289744.mp3";
import teleportInSoundUrl from "../../sounds/teleportIn.mp3";
import teleportOutSoundUrl from "../../sounds/teleportOut.mp3";
import softBumpSoundUrl from "../../sounds/sources/soft-slot-stop-03.m4a";
import jetpackLoopSoundUrl from "../../sounds/sources/jetpack-loop-1.m4a";
import jetpackTurnaroundSoundUrl from "../../sounds/jetpack_turnaround.mp3";
import conveyorStartSoundUrl from "../../sounds/conveyorStart.mp3";
import conveyorLoopSoundUrl from "../../sounds/conveyorLoop.mp3";
import conveyorEndSoundUrl from "../../sounds/conveyorStop.mp3";
import mojoLoopSoundUrl from "../../sounds/mojo.mp3";
import mojoTurnSoundUrl from "../../sounds/sources/beep-sound-effect-079209953_nw_prev.m4a";
import bubbleRobotLoopSoundUrl from "../../sounds/bubblesLoop.mp3";
import springBoingSoundUrl from "../../sounds/spring.mp3";
import drumSoundUrl from "../../sounds/bongo.mp3";
import servoStartUrl from "../../sounds/servosStart.mp3";
import servoLoopUrl from "../../sounds/servosLoop.mp3";
import servoStoptUrl from "../../sounds/servosStop.mp3";
import rollingBallLoopSoundUrl from "../../sounds/rollingBallLoop.mp3";
import stepStoolScrapingSoundUrl from "../../sounds/metalicScraping.mp3";
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
    headJump: await loadAndDecode(headJumpSoundUrl),
    headFall: await loadAndDecode(headFallSoundUrl),
    heelsWalk: await loadAndDecode(heelsWalkSoundUrl),
    heelsJump: await loadAndDecode(heelsJumpSoundUrl),
    heelsFall: await loadAndDecode(heelsFallSoundUrl),
    teleportWarningSiren: await loadAndDecode(teleportWarningSirenSoundUrl),
    helicopter: await loadAndDecode(helicopterSoundUrl),
    switchClick: await loadAndDecode(switchClickSoundUrl),
    bonus: await loadAndDecode(bonusSoundUrl),
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
