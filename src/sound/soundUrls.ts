import type { SceneryName } from "../sprites/planets";

import activateSoundUrl from "../../sounds/activate.mp3";
import ballHitSoundUrl from "../../sounds/ballHit.mp3";
import drumSoundUrl from "../../sounds/bongo.mp3";
import bonusSoundUrl from "../../sounds/bonus.mp3";
import bubbleRobotLoopSoundUrl from "../../sounds/bubblesLoop.mp3";
import buttonOffSoundUrl from "../../sounds/buttonOff.mp3";
import buttonOnSoundUrl from "../../sounds/buttonOn.mp3";
import carrySoundUrl from "../../sounds/carry.mp3";
import conveyorLoopSoundUrl from "../../sounds/conveyorLoop.mp3";
import conveyorStartSoundUrl from "../../sounds/conveyorStart.mp3";
import conveyorEndSoundUrl from "../../sounds/conveyorStop.mp3";
import crownSparkleSoundUrl from "../../sounds/crownSparkle.mp3";
import deactivateSoundUrl from "../../sounds/deactivate.mp3";
import destroySoundUrl from "../../sounds/destroy.mp3";
import detectSoundUrl from "../../sounds/detect.mp3";
import doorSoundUrl from "../../sounds/door.mp3";
import doughnutSplatSoundUrl from "../../sounds/doughnutSplat.mp3";
import elephantHootSoundUrl from "../../sounds/elephantHoot.mp3";
import emitSoundUrl from "../../sounds/emit.mp3";
import fanfareSoundUrl from "../../sounds/fanfare.mp3";
import glassClinkSoundUrl from "../../sounds/glassClink.mp3";
import headAccentSoundUrl from "../../sounds/headAccent.mp3";
import headFallSoundUrl from "../../sounds/headFall.mp3";
import headJumpSoundUrl from "../../sounds/headJump.mp3";
import headOverHeelsAccentSoundUrl from "../../sounds/headOverHeelsAccent.mp3";
import headWalkSoundUrl from "../../sounds/headWalk.mp3";
import heelsAccentSoundUrl from "../../sounds/heelsAccent.mp3";
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
import monkeyTurnSoundUrl from "../../sounds/monkeyTurn.mp3";
import moonbaseDoorSoundUrl from "../../sounds/moonbaseDoor.mp3";
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
import setting0SoundUrl from "../../sounds/setting0.mp3";
import setting1SoundUrl from "../../sounds/setting1.mp3";
import setting2SoundUrl from "../../sounds/setting2.mp3";
import setting3SoundUrl from "../../sounds/setting3.mp3";
import softBumpSoundUrl from "../../sounds/softBump.mp3";
import springBoingSoundUrl from "../../sounds/spring.mp3";
import switchClickSoundUrl from "../../sounds/switch-shorter.mp3";
import teleportInSoundUrl from "../../sounds/teleportIn.mp3";
import teleportOutSoundUrl from "../../sounds/teleportOut.mp3";
import teleportWarningSirenSoundUrl from "../../sounds/teleportWarningSiren.mp3";
import toasterPopUpSoundUrl from "../../sounds/toasterPopUp.mp3";
import woodScrapeSoundUrl from "../../sounds/woodScrape.mp3";

export const soundUrls = {
  activate: activateSoundUrl,
  ballHit: ballHitSoundUrl,
  bonus: bonusSoundUrl,
  bubbleRobotLoop: bubbleRobotLoopSoundUrl,
  buttonOff: buttonOffSoundUrl,
  buttonOn: buttonOnSoundUrl,
  carry: carrySoundUrl,
  conveyorEnd: conveyorEndSoundUrl,
  conveyorLoop: conveyorLoopSoundUrl,
  conveyorStart: conveyorStartSoundUrl,
  crownSparkle: crownSparkleSoundUrl,
  deactivate: deactivateSoundUrl,
  destroy: destroySoundUrl,
  detect: detectSoundUrl,
  door: doorSoundUrl,
  doughnutSplat: doughnutSplatSoundUrl,
  drum: drumSoundUrl,
  elephantHoot: elephantHootSoundUrl,
  emit: emitSoundUrl,
  fall: fallSoundUrl,
  fanfare: fanfareSoundUrl,
  glassClink: glassClinkSoundUrl,
  headAccent: headAccentSoundUrl,
  headFall: headFallSoundUrl,
  headJump: headJumpSoundUrl,
  headOverHeelsAccent: headOverHeelsAccentSoundUrl,
  headWalk: headWalkSoundUrl,
  heavyMetalScraping: heavyMetalScrapingSoundUrl,
  heelsAccent: heelsAccentSoundUrl,
  heelsJump: heelsJumpSoundUrl,
  heelsWalk: heelsWalkSoundUrl,
  helicopter: helicopterSoundUrl,
  hooter: hooterSoundUrl,
  hushPuppyVanish: hushPuppyVanishSoundUrl,
  iceScrape: iceScrapeSoundUrl,
  jetpackLoop: jetpackLoopSoundUrl,
  jetpackTurnaround: jetpackTurnaroundSoundUrl,
  landing: landingSoundUrl,
  lowHum: lowHumSoundUrl,
  metalHit: metalHitSoundUrl,
  mojoLoop: mojoLoopSoundUrl,
  mojoTurn: mojoTurnSoundUrl,
  monkeyTurn: monkeyTurnSoundUrl,
  moonbaseDoor: moonbaseDoorSoundUrl,
  robotBeepingLoop: robotBeepingLoopSoundUrl,
  robotWhirLoop: robotWhirLoopSoundUrl,
  rollingBallLoop: rollingBallLoopSoundUrl,
  servoLoop: servoLoopUrl,
  servoStart: servoStartUrl,
  servoStop: servoStoptUrl,
  setting0: setting0SoundUrl,
  setting1: setting1SoundUrl,
  setting2: setting2SoundUrl,
  setting3: setting3SoundUrl,
  softBump: softBumpSoundUrl,
  springBoing: springBoingSoundUrl,
  switchClick: switchClickSoundUrl,
  teleportIn: teleportInSoundUrl,
  teleportOut: teleportOutSoundUrl,
  teleportWarningSiren: teleportWarningSirenSoundUrl,
  toasterPopUpSoundUrl,
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
