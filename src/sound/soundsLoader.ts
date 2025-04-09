import bonusSoundUrl from "../../sounds/bonus.mp3";
import bubbleRobotLoopSoundUrl from "../../sounds/bubblesLoop.mp3";
import carrySoundUrl from "../../sounds/sources/wind-swoosh-short-289744.mp3";
import conveyorEndSoundUrl from "../../sounds/conveyorStop.mp3";
import conveyorLoopSoundUrl from "../../sounds/conveyorLoop.mp3";
import conveyorStartSoundUrl from "../../sounds/conveyorStart.mp3";
import destroySoundUrl from "../../sounds/destroy.mp3";
import detectSoundUrl from "../../sounds/detect.mp3";
import drumSoundUrl from "../../sounds/bongo.mp3";
import headFallSoundUrl from "../../sounds/headFall.mp3";
import headJumpSoundUrl from "../../sounds/headJump.mp3";
import headWalkSoundUrl from "../../sounds/headWalk.mp3";
import heelsFallSoundUrl from "../../sounds/heelsFall.mp3";
import heelsJumpSoundUrl from "../../sounds/heelsJump.mp3";
import heelsWalkSoundUrl from "../../sounds/heelsWalk.mp3";
import helicopterSoundUrl from "../../sounds/helicopter.mp3";
import hooterSoundUrl from "../../sounds/hooter.mp3";
import jetpackLoopSoundUrl from "../../sounds/sources/jetpack-loop-1.m4a";
import jetpackTurnaroundSoundUrl from "../../sounds/jetpack_turnaround.mp3";
import landingSoundUrl from "../../sounds/landing.mp3";
import metalHitSoundUrl from "../../sounds/metalClang.mp3";
import mojoLoopSoundUrl from "../../sounds/mojo.mp3";
import mojoTurnSoundUrl from "../../sounds/sources/beep-sound-effect-079209953_nw_prev.m4a";
import robotBeepingLoopSoundUrl from "../../sounds/robotBeepingLoop.mp3";
import robotWhirLoopSoundUrl from "../../sounds/robotWhirLoop.mp3";
import rollingBallLoopSoundUrl from "../../sounds/rollingBallLoop.mp3";
import servoLoopUrl from "../../sounds/servosLoop.mp3";
import servoStartUrl from "../../sounds/servosStart.mp3";
import servoStoptUrl from "../../sounds/servosStop.mp3";
import softBumpSoundUrl from "../../sounds/softBump.mp3";
import springBoingSoundUrl from "../../sounds/spring.mp3";
import stepStoolScrapingSoundUrl from "../../sounds/metalicScraping.mp3";
import switchClickSoundUrl from "../../sounds/switch-shorter.mp3";
import teleportInSoundUrl from "../../sounds/teleportIn.mp3";
import teleportOutSoundUrl from "../../sounds/teleportOut.mp3";
import teleportWarningSirenSoundUrl from "../../sounds/teleportWarningSiren.mp3";

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
    bonus: await loadAndDecode(bonusSoundUrl),
    bubbleRobotLoop: await loadAndDecode(bubbleRobotLoopSoundUrl),
    carry: await loadAndDecode(carrySoundUrl),
    conveyorEnd: await loadAndDecode(conveyorEndSoundUrl),
    conveyorLoop: await loadAndDecode(conveyorLoopSoundUrl),
    conveyorStart: await loadAndDecode(conveyorStartSoundUrl),
    destroy: await loadAndDecode(destroySoundUrl),
    detect: await loadAndDecode(detectSoundUrl),
    drum: await loadAndDecode(drumSoundUrl),
    headFall: await loadAndDecode(headFallSoundUrl),
    headJump: await loadAndDecode(headJumpSoundUrl),
    headWalk: await loadAndDecode(headWalkSoundUrl),
    heelsFall: await loadAndDecode(heelsFallSoundUrl),
    heelsJump: await loadAndDecode(heelsJumpSoundUrl),
    heelsWalk: await loadAndDecode(heelsWalkSoundUrl),
    helicopter: await loadAndDecode(helicopterSoundUrl),
    hooter: await loadAndDecode(hooterSoundUrl),
    jetpackLoop: await loadAndDecode(jetpackLoopSoundUrl),
    jetpackTurnaround: await loadAndDecode(jetpackTurnaroundSoundUrl),
    landing: await loadAndDecode(landingSoundUrl),
    metalHit: await loadAndDecode(metalHitSoundUrl),
    mojoLoop: await loadAndDecode(mojoLoopSoundUrl),
    mojoTurn: await loadAndDecode(mojoTurnSoundUrl),
    robotBeepingLoop: await loadAndDecode(robotBeepingLoopSoundUrl),
    robotWhirLoop: await loadAndDecode(robotWhirLoopSoundUrl),
    rollingBallLoop: await loadAndDecode(rollingBallLoopSoundUrl),
    servoLoop: await loadAndDecode(servoLoopUrl),
    servoStart: await loadAndDecode(servoStartUrl),
    servoStop: await loadAndDecode(servoStoptUrl),
    softBump: await loadAndDecode(softBumpSoundUrl),
    springBoing: await loadAndDecode(springBoingSoundUrl),
    stepStoolScraping: await loadAndDecode(stepStoolScrapingSoundUrl),
    switchClick: await loadAndDecode(switchClickSoundUrl),
    teleportIn: await loadAndDecode(teleportInSoundUrl),
    teleportOut: await loadAndDecode(teleportOutSoundUrl),
    teleportWarningSiren: await loadAndDecode(teleportWarningSirenSoundUrl),
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
