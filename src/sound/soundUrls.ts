import type { SceneryName } from "../sprites/planets";

import ballHitSoundUrl from "../../sounds/ballHit.mp3";
import drumSoundUrl from "../../sounds/bongo.mp3";
import bonusSoundUrl from "../../sounds/bonus.mp3";
import bubbleRobotLoopSoundUrl from "../../sounds/bubblesLoop.mp3";
import carrySoundUrl from "../../sounds/carry.mp3";
import conveyorLoopSoundUrl from "../../sounds/conveyorLoop.mp3";
import conveyorStartSoundUrl from "../../sounds/conveyorStart.mp3";
import conveyorEndSoundUrl from "../../sounds/conveyorStop.mp3";
import destroySoundUrl from "../../sounds/destroy.mp3";
import detectSoundUrl from "../../sounds/detect.mp3";
import fanfareSoundUrl from "../../sounds/fanfare.mp3";
import glassClinkSoundUrl from "../../sounds/glassClink.mp3";
import headFallSoundUrl from "../../sounds/headFall.mp3";
import headJumpSoundUrl from "../../sounds/headJump.mp3";
import headWalkSoundUrl from "../../sounds/headWalk.mp3";
import fallSoundUrl from "../../sounds/heelsFall.mp3";
import heelsJumpSoundUrl from "../../sounds/heelsJump.mp3";
import heelsWalkSoundUrl from "../../sounds/heelsWalk.mp3";
import helicopterSoundUrl from "../../sounds/helicopter.mp3";
import hooterSoundUrl from "../../sounds/hooter.mp3";
import hushPuppyVanishSoundUrl from "../../sounds/hushPuppyVanish.mp3";
import iceScrapeSoundUrl from "../../sounds/iceScrape.mp3";
import jetpackTurnaroundSoundUrl from "../../sounds/jetpack_turnaround.mp3";
import jetpackLoopSoundUrl from "../../sounds/jetpackLoop.mp3";
import landingSoundUrl from "../../sounds/landing.mp3";
import lowHumSoundUrl from "../../sounds/lowHum.mp3";
import metalHitSoundUrl from "../../sounds/metalClang.mp3";
import heavyMetalScrapingSoundUrl from "../../sounds/metalicScraping.mp3";
import mojoLoopSoundUrl from "../../sounds/mojo.mp3";
import mojoTurnSoundUrl from "../../sounds/mojoTurnSound.mp3";
import blacktoothMusicUrl from "../../sounds/music/blacktooth.mp3";
import bookworldMusicUrl from "../../sounds/music/bookworld.mp3";
import egyptusMusicUrl from "../../sounds/music/egyptus.mp3";
import marketMusicUrl from "../../sounds/music/market.mp3";
import moonbaseMusicUrl from "../../sounds/music/moonbase.mp3";
import penitentiaryMusicUrl from "../../sounds/music/penitentiary.mp3";
import safariMusicUrl from "../../sounds/music/safari.mp3";
import robotBeepingLoopSoundUrl from "../../sounds/robotBeepingLoop.mp3";
import robotWhirLoopSoundUrl from "../../sounds/robotWhirLoop.mp3";
import rollingBallLoopSoundUrl from "../../sounds/rollingBallLoop.mp3";
import servoLoopUrl from "../../sounds/servosLoop.mp3";
import servoStartUrl from "../../sounds/servosStart.mp3";
import servoStoptUrl from "../../sounds/servosStop.mp3";
import softBumpSoundUrl from "../../sounds/softBump.mp3";
import springBoingSoundUrl from "../../sounds/spring.mp3";
import switchClickSoundUrl from "../../sounds/switch-shorter.mp3";
import teleportInSoundUrl from "../../sounds/teleportIn.mp3";
import teleportOutSoundUrl from "../../sounds/teleportOut.mp3";
import teleportWarningSirenSoundUrl from "../../sounds/teleportWarningSiren.mp3";
import toasterPopUpSoundUrl from "../../sounds/toasterPopUp.mp3";
import woodScrapeSoundUrl from "../../sounds/woodScrape.mp3";

export const soundUrls = {
  bonus: bonusSoundUrl,
  bubbleRobotLoop: bubbleRobotLoopSoundUrl,
  carry: carrySoundUrl,
  conveyorEnd: conveyorEndSoundUrl,
  conveyorLoop: conveyorLoopSoundUrl,
  conveyorStart: conveyorStartSoundUrl,
  destroy: destroySoundUrl,
  fanfare: fanfareSoundUrl,
  detect: detectSoundUrl,
  drum: drumSoundUrl,
  glassClink: glassClinkSoundUrl,
  headFall: headFallSoundUrl,
  headJump: headJumpSoundUrl,
  headWalk: headWalkSoundUrl,
  fall: fallSoundUrl,
  heelsJump: heelsJumpSoundUrl,
  heelsWalk: heelsWalkSoundUrl,
  helicopter: helicopterSoundUrl,
  hooter: hooterSoundUrl,
  hushPuppyVanish: hushPuppyVanishSoundUrl,
  jetpackLoop: jetpackLoopSoundUrl,
  jetpackTurnaround: jetpackTurnaroundSoundUrl,
  landing: landingSoundUrl,
  metalHit: metalHitSoundUrl,
  mojoLoop: mojoLoopSoundUrl,
  mojoTurn: mojoTurnSoundUrl,
  robotBeepingLoop: robotBeepingLoopSoundUrl,
  robotWhirLoop: robotWhirLoopSoundUrl,
  rollingBallLoop: rollingBallLoopSoundUrl,
  ballHit: ballHitSoundUrl,
  servoLoop: servoLoopUrl,
  servoStart: servoStartUrl,
  servoStop: servoStoptUrl,
  softBump: softBumpSoundUrl,
  springBoing: springBoingSoundUrl,
  heavyMetalScraping: heavyMetalScrapingSoundUrl,
  switchClick: switchClickSoundUrl,
  toasterPopUpSoundUrl,
  teleportIn: teleportInSoundUrl,
  teleportOut: teleportOutSoundUrl,
  teleportWarningSiren: teleportWarningSirenSoundUrl,
  iceScrape: iceScrapeSoundUrl,
  lowHum: lowHumSoundUrl,
  woodScrape: woodScrapeSoundUrl,
  ...({
    "roomEntry.blacktooth": blacktoothMusicUrl,
    "roomEntry.bookworld": bookworldMusicUrl,
    "roomEntry.egyptus": egyptusMusicUrl,
    //"roomEntry.jail": jailMusicUrl,
    "roomEntry.market": marketMusicUrl,
    "roomEntry.moonbase": moonbaseMusicUrl,
    "roomEntry.penitentiary": penitentiaryMusicUrl,
    "roomEntry.safari": safariMusicUrl,
  } satisfies { [s in SceneryName as `roomEntry.${s}`]?: string }),
};

export type SoundId = keyof typeof soundUrls;

export const isSoundId = (id: string): id is SoundId => {
  return id in soundUrls;
};
