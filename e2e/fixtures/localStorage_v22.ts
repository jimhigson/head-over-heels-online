/**
 * Captured from blockstack.ing v22 on 2026-05-12.
 *
 * Setup before capture:
 *   1. Started original campaign, dismissed crowns dialog
 *   2. Opened main menu (Escape) > Options > toggled "∞ Lives Poke" on
 *   3. Reloaded to persist
 *
 * Delta to v23:
 *
 * * The live site uses the legacy persist key (persist:hohol/gameMenus/userSettings)
 *   which combines userSettings and savedGames in one blob.
 * * Pokes are at top-level of userSettings (infiniteLivesPoke: true) rather than
 *   nested under pokesEnabled with renamed fields (infiniteLives, infiniteDoughnuts).
 */

export const localStorage_v22: Record<string, Record<string, unknown>> = {
  "persist:hohol/gameMenus/userSettings": {
    userSettings: {
      displaySettings: {},
      soundSettings: {
        mute: true,
      },
      infiniteLivesPoke: true,
    },
    savedGames: {
      saves: {
        '{"campaignName":"original","userId":"@@original"}': {
          saveTime: 1_778_576_511_600,
          gameState: {
            characterRooms: {
              head: {
                color: {
                  hue: "yellow",
                  shade: "basic",
                },
                id: "blacktooth1head",
                items: {
                  br: {
                    config: {
                      axis: "y",
                    },
                    position: {
                      x: 5,
                      y: 0,
                      z: 0,
                    },
                    type: "barrier",
                    aabb: {
                      x: 4,
                      y: 15,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "br",
                    jsonItemId: "br",
                    shadowCastTexture: {
                      textureId: "shadow.barrier.y",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 86,
                        y: 0,
                        z: 0,
                      },
                    },
                  },
                  br1: {
                    config: {
                      axis: "y",
                    },
                    position: {
                      x: 5,
                      y: 0,
                      z: 2,
                    },
                    type: "barrier",
                    aabb: {
                      x: 4,
                      y: 15,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "br1",
                    jsonItemId: "br1",
                    shadowCastTexture: {
                      textureId: "shadow.barrier.y",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 86,
                        y: 0,
                        z: 24,
                      },
                    },
                  },
                  br2: {
                    config: {
                      axis: "y",
                    },
                    position: {
                      x: 5,
                      y: 0,
                      z: 4,
                    },
                    type: "barrier",
                    aabb: {
                      x: 4,
                      y: 15,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "br2",
                    jsonItemId: "br2",
                    shadowCastTexture: {
                      textureId: "shadow.barrier.y",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 86,
                        y: 0,
                        z: 48,
                      },
                    },
                  },
                  br3: {
                    config: {
                      axis: "y",
                    },
                    position: {
                      x: 5,
                      y: 0,
                      z: 6,
                    },
                    type: "barrier",
                    aabb: {
                      x: 4,
                      y: 15,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "br3",
                    jsonItemId: "br3",
                    shadowCastTexture: {
                      textureId: "shadow.barrier.y",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {
                        pi: true,
                      },
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 86,
                        y: 0,
                        z: 72,
                      },
                    },
                  },
                  "d/frameFar": {
                    config: {
                      direction: "right",
                      toRoom: "blacktooth23heels",
                      inHiddenWall: true,
                      part: "far",
                    },
                    position: {
                      x: 0,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 8,
                      z: 48,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/frameFar",
                    jsonItemId: "d",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -24,
                        y: 72,
                        z: 0,
                      },
                    },
                    renderAabb: {
                      y: 8,
                      x: 8,
                      z: 48,
                    },
                    renderAabbOffset: {
                      x: 16,
                      y: 0,
                      z: 0,
                    },
                  },
                  "d/frameNear": {
                    config: {
                      direction: "right",
                      toRoom: "blacktooth23heels",
                      inHiddenWall: true,
                      part: "near",
                    },
                    position: {
                      x: 0,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 9,
                      z: 48,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/frameNear",
                    jsonItemId: "d",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -24,
                        y: 48,
                        z: 0,
                      },
                    },
                    renderAabb: {
                      y: 9,
                      x: 8,
                      z: 48,
                    },
                    renderAabbOffset: {
                      x: 16,
                      y: 0,
                      z: 0,
                    },
                  },
                  "d/frameTop": {
                    config: {
                      direction: "right",
                      toRoom: "blacktooth23heels",
                      inHiddenWall: true,
                      part: "top",
                    },
                    position: {
                      x: 0,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 15,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: true,
                    id: "d/frameTop",
                    jsonItemId: "d",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -24,
                        y: 57,
                        z: 24,
                      },
                    },
                    renderAabb: {
                      y: 15,
                      x: 8,
                      z: 24,
                    },
                    renderAabbOffset: {
                      x: 16,
                      y: 0,
                      z: 0,
                    },
                  },
                  "d/blockerAbove": {
                    config: {},
                    position: {
                      x: 0,
                      y: 3,
                      z: 0,
                    },
                    type: "blocker",
                    aabb: {
                      x: 24,
                      y: 32,
                      z: 9999,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/blockerAbove",
                    jsonItemId: "d",
                    renders: false,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -24,
                        y: 48,
                        z: 48,
                      },
                    },
                    renderAabb: {
                      x: 0,
                      y: 0,
                      z: 0,
                    },
                    fixedZIndex: -2,
                  },
                  "d/portal": {
                    config: {
                      toRoom: "blacktooth23heels",
                      inHidden: true,
                      relativePoint: {
                        x: 20,
                        y: 0,
                        z: 0,
                      },
                      direction: {
                        x: -1,
                        y: 0,
                        z: 0,
                      },
                    },
                    position: {
                      x: 0,
                      y: 3,
                      z: 0,
                    },
                    type: "portal",
                    aabb: {
                      y: 15,
                      x: 16,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/portal",
                    jsonItemId: "d",
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -24,
                        y: 57,
                        z: 0,
                      },
                    },
                  },
                  "d/stopAutowalk": {
                    aabb: {
                      x: 32,
                      y: 32,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "stopAutowalk",
                    id: "d/stopAutowalk",
                    jsonItemId: "d",
                    config: {},
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 8,
                        y: 48,
                        z: 0,
                      },
                    },
                  },
                  "d1/frameFar": {
                    config: {
                      direction: "left",
                      toRoom: "blacktooth0switches",
                      inHiddenWall: false,
                      part: "far",
                    },
                    position: {
                      x: 6,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 8,
                      z: 48,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d1/frameFar",
                    jsonItemId: "d1",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 96,
                        y: 72,
                        z: 0,
                      },
                    },
                    renderAabb: {
                      y: 8,
                      x: 8,
                      z: 48,
                    },
                  },
                  "d1/frameNear": {
                    config: {
                      direction: "left",
                      toRoom: "blacktooth0switches",
                      inHiddenWall: false,
                      part: "near",
                    },
                    position: {
                      x: 6,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 9,
                      z: 48,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d1/frameNear",
                    jsonItemId: "d1",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 96,
                        y: 48,
                        z: 0,
                      },
                    },
                    renderAabb: {
                      y: 9,
                      x: 8,
                      z: 48,
                    },
                  },
                  "d1/frameTop": {
                    config: {
                      direction: "left",
                      toRoom: "blacktooth0switches",
                      inHiddenWall: false,
                      part: "top",
                    },
                    position: {
                      x: 6,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 15,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: true,
                    id: "d1/frameTop",
                    jsonItemId: "d1",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 96,
                        y: 57,
                        z: 24,
                      },
                    },
                    renderAabb: {
                      y: 15,
                      x: 8,
                      z: 24,
                    },
                    shadowCastTexture: {
                      textureId: "shadow.doorFrame.top.y",
                      spritesheetVariant: "original",
                    },
                    noShadowCastOn: ["doorLegs"],
                  },
                  "d1/blockerAbove": {
                    config: {},
                    position: {
                      x: 6,
                      y: 3,
                      z: 0,
                    },
                    type: "blocker",
                    aabb: {
                      x: 24,
                      y: 32,
                      z: 9999,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d1/blockerAbove",
                    jsonItemId: "d1",
                    renders: false,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 96,
                        y: 48,
                        z: 48,
                      },
                    },
                    renderAabb: {
                      x: 0,
                      y: 0,
                      z: 0,
                    },
                    fixedZIndex: -2,
                  },
                  "d1/portal": {
                    config: {
                      toRoom: "blacktooth0switches",
                      inHidden: false,
                      relativePoint: {
                        x: -4,
                        y: 0,
                        z: 0,
                      },
                      direction: {
                        x: 1,
                        y: 0,
                        z: 0,
                      },
                    },
                    position: {
                      x: 6,
                      y: 3,
                      z: 0,
                    },
                    type: "portal",
                    aabb: {
                      y: 15,
                      x: 16,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d1/portal",
                    jsonItemId: "d1",
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 104,
                        y: 57,
                        z: 0,
                      },
                    },
                  },
                  "d1/stopAutowalk": {
                    aabb: {
                      x: 32,
                      y: 32,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "stopAutowalk",
                    id: "d1/stopAutowalk",
                    jsonItemId: "d1",
                    config: {},
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 56,
                        y: 48,
                        z: 0,
                      },
                    },
                  },
                  f: {
                    aabb: {
                      x: 112.32,
                      y: 128,
                      z: 36,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "floor",
                    id: "f",
                    jsonItemId: "f",
                    config: {
                      floorType: "standable",
                      scenery: "jail",
                      times: {
                        x: 6,
                        y: 8,
                      },
                      naturalFootprint: {
                        aabb: {
                          x: 96,
                          y: 128,
                          z: 36,
                        },
                        position: {
                          x: 0,
                          y: 0,
                          z: -36,
                        },
                      },
                    },
                    renderAabb: {
                      x: 112.32,
                      y: 128,
                      z: 10,
                    },
                    renderAabbOffset: {
                      x: 0,
                      y: 0,
                      z: 26,
                    },
                    shadowCastTexture: {
                      textureId: "shadow.fullBlock",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {
                        head: true,
                        pi1: true,
                        pi2: true,
                      },
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -8,
                        y: 0,
                        z: -36,
                      },
                    },
                  },
                  head: {
                    id: "head",
                    jsonItemId: "head",
                    type: "head",
                    aabb: {
                      x: 12,
                      y: 12,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: true,
                    config: {},
                    shadowCastTexture: {
                      textureId: "shadow.playable",
                      spritesheetVariant: "original",
                    },
                    renderAabbOffset: {
                      x: -0.5,
                      y: -0.5,
                      z: 0,
                    },
                    renderAabb: {
                      x: 15,
                      y: 15,
                      z: 13,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      vels: {
                        walking: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "f",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      action: "idle",
                      jumped: false,
                      teleporting: null,
                      autoWalk: false,
                      facing: {
                        x: 0,
                        y: -1,
                        z: 0,
                      },
                      visualFacingVector: {
                        x: 0,
                        y: -1,
                        z: 0,
                      },
                      walkStartFacing: {
                        x: 0,
                        y: -1,
                        z: 0,
                      },
                      walkDistance: 0,
                      switchedToAt: -9_007_199_254_740_991,
                      lastDiedAt: -9_007_199_254_740_991,
                      gameTime: 87_066.599_999_997_55,
                      lives: 8,
                      jumpStartZ: 0,
                      hasHooter: false,
                      gameWalkDistance: 0,
                      fastStepsStartedAtDistance: -9_007_199_254_740_991,
                      shieldCollectedAt: -9_007_199_254_740_991,
                      doughnuts: 0,
                      position: {
                        x: 41,
                        y: 41,
                        z: 0,
                      },
                    },
                  },
                  pi: {
                    config: {
                      gives: "extra-life",
                    },
                    position: {
                      x: 5,
                      y: 0,
                      z: 7,
                    },
                    type: "pickup",
                    aabb: {
                      x: 12,
                      y: 12,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: true,
                    renderAabb: {
                      x: 12,
                      y: 13,
                      z: 13,
                    },
                    id: "pi",
                    jsonItemId: "pi",
                    shadowCastTexture: {
                      textureId: "shadow.smallRound",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: {
                        on: "touch",
                        byType: ["head", "heels", "headOverHeels"],
                      },
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 82,
                        y: 2,
                        z: 84,
                      },
                      vels: {
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "br3",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      wouldPickUpNext: false,
                    },
                  },
                  pi1: {
                    config: {
                      gives: "scroll",
                      page: "cuddlyStuffedWhiteRabbits",
                      source: "manual",
                    },
                    position: {
                      x: 3,
                      y: 0,
                      z: 0,
                    },
                    type: "pickup",
                    aabb: {
                      x: 16,
                      y: 4,
                      z: 13,
                    },
                    castsShadowWhileStoodOn: true,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 6,
                      z: 13,
                    },
                    id: "pi1",
                    jsonItemId: "pi1",
                    shadowCastTexture: {
                      textureId: "shadow.scroll",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: {
                        on: "touch",
                        byType: ["head", "heels", "headOverHeels"],
                      },
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 48,
                        y: 6,
                        z: 0,
                      },
                      vels: {
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "f",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      wouldPickUpNext: false,
                    },
                  },
                  pi2: {
                    config: {
                      gives: "scroll",
                      page: "theGame",
                      source: "manual",
                    },
                    position: {
                      x: 3,
                      y: 7,
                      z: 0,
                    },
                    type: "pickup",
                    aabb: {
                      x: 16,
                      y: 4,
                      z: 13,
                    },
                    castsShadowWhileStoodOn: true,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 6,
                      z: 13,
                    },
                    id: "pi2",
                    jsonItemId: "pi2",
                    shadowCastTexture: {
                      textureId: "shadow.scroll",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: {
                        on: "touch",
                        byType: ["head", "heels", "headOverHeels"],
                      },
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 48,
                        y: 118,
                        z: 0,
                      },
                      vels: {
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "f",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      wouldPickUpNext: false,
                    },
                  },
                  t: {
                    config: {
                      toRoom: "blacktooth2",
                    },
                    position: {
                      x: 5,
                      y: 7,
                      z: 0,
                    },
                    type: "teleporter",
                    aabb: {
                      x: 16,
                      y: 16,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 18,
                      z: 12,
                    },
                    id: "t",
                    jsonItemId: "t",
                    shadowCastTexture: {
                      textureId: "shadow.fullBlock",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 80,
                        y: 112,
                        z: 0,
                      },
                      toRoom: "blacktooth2",
                    },
                  },
                  w: {
                    type: "wall",
                    id: "w",
                    jsonItemId: "w",
                    config: {
                      direction: "right",
                      times: {
                        y: 3,
                      },
                    },
                    aabb: {
                      x: 16,
                      y: 48,
                      z: 9999,
                    },
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -16,
                        y: 0,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: true,
                  },
                  w1: {
                    type: "wall",
                    id: "w1",
                    jsonItemId: "w1",
                    config: {
                      direction: "towards",
                      times: {
                        x: 6,
                      },
                    },
                    aabb: {
                      x: 96,
                      y: 16,
                      z: 9999,
                    },
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: -16,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      flipX: true,
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: true,
                  },
                  w2: {
                    type: "wall",
                    id: "w2",
                    jsonItemId: "w2",
                    config: {
                      direction: "right",
                      times: {
                        y: 3,
                      },
                    },
                    aabb: {
                      x: 16,
                      y: 48,
                      z: 9999,
                    },
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -16,
                        y: 80,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: true,
                  },
                  w3: {
                    type: "wall",
                    id: "w3",
                    jsonItemId: "w3",
                    config: {
                      direction: "away",
                      tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
                    },
                    aabb: {
                      x: 96,
                      y: 16,
                      z: 9999,
                    },
                    renderAabb: {
                      x: 96,
                      y: 0,
                      z: 50,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: 128,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      flipX: true,
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: false,
                  },
                  w4: {
                    type: "wall",
                    id: "w4",
                    jsonItemId: "w4",
                    config: {
                      direction: "left",
                      tiles: ["bars", "bars", "bars"],
                    },
                    aabb: {
                      x: 16,
                      y: 48,
                      z: 9999,
                    },
                    renderAabb: {
                      x: 0,
                      y: 48,
                      z: 50,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 96,
                        y: 80,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: false,
                  },
                  w5: {
                    type: "wall",
                    id: "w5",
                    jsonItemId: "w5",
                    config: {
                      direction: "left",
                      tiles: ["bars", "bars", "bars"],
                    },
                    aabb: {
                      x: 16,
                      y: 48,
                      z: 9999,
                    },
                    renderAabb: {
                      x: 0,
                      y: 48,
                      z: 50,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 96,
                        y: 0,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: false,
                  },
                  outOfBounds: {
                    aabb: {
                      x: 224,
                      y: 224,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "outOfBounds",
                    id: "outOfBounds",
                    fixedZIndex: -2,
                    config: {},
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -64,
                        y: -64,
                        z: -120,
                      },
                    },
                  },
                },
                meta: {
                  nonContiguousRelationship: {
                    gridOffset: {
                      x: 4,
                      y: 7,
                      z: 0,
                    },
                    with: {
                      room: "blacktooth9",
                    },
                  },
                },
                planet: "jail",
                roomJson: {
                  color: {
                    hue: "yellow",
                    shade: "basic",
                  },
                  id: "blacktooth1head",
                  items: {
                    br: {
                      config: {
                        axis: "y",
                      },
                      position: {
                        x: 5,
                        y: 0,
                        z: 0,
                      },
                      type: "barrier",
                    },
                    br1: {
                      config: {
                        axis: "y",
                      },
                      position: {
                        x: 5,
                        y: 0,
                        z: 2,
                      },
                      type: "barrier",
                    },
                    br2: {
                      config: {
                        axis: "y",
                      },
                      position: {
                        x: 5,
                        y: 0,
                        z: 4,
                      },
                      type: "barrier",
                    },
                    br3: {
                      config: {
                        axis: "y",
                      },
                      position: {
                        x: 5,
                        y: 0,
                        z: 6,
                      },
                      type: "barrier",
                    },
                    d: {
                      config: {
                        direction: "right",
                        toRoom: "blacktooth23heels",
                      },
                      position: {
                        x: 0,
                        y: 3,
                        z: 0,
                      },
                      type: "door",
                    },
                    d1: {
                      config: {
                        direction: "left",
                        toRoom: "blacktooth0switches",
                      },
                      position: {
                        x: 6,
                        y: 3,
                        z: 0,
                      },
                      type: "door",
                    },
                    f: {
                      config: {
                        floorType: "standable",
                        scenery: "jail",
                        times: {
                          x: 6,
                          y: 8,
                        },
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "floor",
                    },
                    head: {
                      config: {
                        which: "head",
                      },
                      position: {
                        x: 2.5,
                        y: 2.5,
                        z: 0,
                      },
                      type: "player",
                    },
                    pi: {
                      config: {
                        gives: "extra-life",
                      },
                      position: {
                        x: 5,
                        y: 0,
                        z: 7,
                      },
                      type: "pickup",
                    },
                    pi1: {
                      config: {
                        gives: "scroll",
                        page: "cuddlyStuffedWhiteRabbits",
                        source: "manual",
                      },
                      position: {
                        x: 3,
                        y: 0,
                        z: 0,
                      },
                      type: "pickup",
                    },
                    pi2: {
                      config: {
                        gives: "scroll",
                        page: "theGame",
                        source: "manual",
                      },
                      position: {
                        x: 3,
                        y: 7,
                        z: 0,
                      },
                      type: "pickup",
                    },
                    t: {
                      config: {
                        toRoom: "blacktooth2",
                      },
                      position: {
                        x: 5,
                        y: 7,
                        z: 0,
                      },
                      type: "teleporter",
                    },
                    w: {
                      config: {
                        direction: "right",
                        times: {
                          y: 3,
                        },
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w1: {
                      config: {
                        direction: "towards",
                        times: {
                          x: 6,
                        },
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w2: {
                      config: {
                        direction: "right",
                        times: {
                          y: 3,
                        },
                      },
                      position: {
                        x: 0,
                        y: 5,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w3: {
                      config: {
                        direction: "away",
                        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
                      },
                      position: {
                        x: 0,
                        y: 8,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w4: {
                      config: {
                        direction: "left",
                        tiles: ["bars", "bars", "bars"],
                      },
                      position: {
                        x: 6,
                        y: 5,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w5: {
                      config: {
                        direction: "left",
                        tiles: ["bars", "bars", "bars"],
                      },
                      position: {
                        x: 6,
                        y: 0,
                        z: 0,
                      },
                      type: "wall",
                    },
                  },
                  meta: {
                    nonContiguousRelationship: {
                      gridOffset: {
                        x: 4,
                        y: 7,
                        z: 0,
                      },
                      with: {
                        room: "blacktooth9",
                      },
                    },
                  },
                  planet: "jail",
                },
                roomTime: 87_066.599_999_997_55,
              },
              heels: {
                color: {
                  hue: "cyan",
                  shade: "basic",
                },
                id: "blacktooth23heels",
                items: {
                  br: {
                    config: {
                      axis: "y",
                      times: {
                        y: 8,
                        z: 3,
                      },
                    },
                    position: {
                      x: 4,
                      y: 0,
                      z: 0,
                    },
                    type: "barrier",
                    aabb: {
                      x: 4,
                      y: 127,
                      z: 36,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "br",
                    jsonItemId: "br",
                    shadowCastTexture: {
                      textureId: "shadow.barrier.y",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 70,
                        y: 0,
                        z: 0,
                      },
                    },
                  },
                  co: {
                    config: {
                      direction: "away",
                      times: {
                        y: 6,
                      },
                    },
                    position: {
                      x: 0,
                      y: 1,
                      z: 0,
                    },
                    type: "conveyor",
                    aabb: {
                      x: 16,
                      y: 96,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    renderAabb: {
                      x: 18,
                      y: 98,
                      z: 12,
                    },
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    id: "co",
                    jsonItemId: "co",
                    shadowCastTexture: {
                      textureId: "shadow.fullBlock",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: 16,
                        z: 0,
                      },
                      direction: "away",
                      times: {
                        y: 6,
                      },
                    },
                  },
                  "d/frameFar": {
                    config: {
                      direction: "left",
                      toRoom: "blacktooth1head",
                      inHiddenWall: false,
                      part: "far",
                    },
                    position: {
                      x: 8,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 8,
                      z: 48,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/frameFar",
                    jsonItemId: "d",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 128,
                        y: 72,
                        z: 0,
                      },
                    },
                    renderAabb: {
                      y: 8,
                      x: 8,
                      z: 48,
                    },
                  },
                  "d/frameNear": {
                    config: {
                      direction: "left",
                      toRoom: "blacktooth1head",
                      inHiddenWall: false,
                      part: "near",
                    },
                    position: {
                      x: 8,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 9,
                      z: 48,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/frameNear",
                    jsonItemId: "d",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 128,
                        y: 48,
                        z: 0,
                      },
                    },
                    renderAabb: {
                      y: 9,
                      x: 8,
                      z: 48,
                    },
                  },
                  "d/frameTop": {
                    config: {
                      direction: "left",
                      toRoom: "blacktooth1head",
                      inHiddenWall: false,
                      part: "top",
                    },
                    position: {
                      x: 8,
                      y: 3,
                      z: 0,
                    },
                    type: "doorFrame",
                    aabb: {
                      x: 24,
                      y: 15,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: true,
                    id: "d/frameTop",
                    jsonItemId: "d",
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 128,
                        y: 57,
                        z: 24,
                      },
                    },
                    renderAabb: {
                      y: 15,
                      x: 8,
                      z: 24,
                    },
                    shadowCastTexture: {
                      textureId: "shadow.doorFrame.top.y",
                      spritesheetVariant: "original",
                    },
                    noShadowCastOn: ["doorLegs"],
                  },
                  "d/blockerAbove": {
                    config: {},
                    position: {
                      x: 8,
                      y: 3,
                      z: 0,
                    },
                    type: "blocker",
                    aabb: {
                      x: 24,
                      y: 32,
                      z: 9999,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/blockerAbove",
                    jsonItemId: "d",
                    renders: false,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 128,
                        y: 48,
                        z: 48,
                      },
                    },
                    renderAabb: {
                      x: 0,
                      y: 0,
                      z: 0,
                    },
                    fixedZIndex: -2,
                  },
                  "d/portal": {
                    config: {
                      toRoom: "blacktooth1head",
                      inHidden: false,
                      relativePoint: {
                        x: -4,
                        y: 0,
                        z: 0,
                      },
                      direction: {
                        x: 1,
                        y: 0,
                        z: 0,
                      },
                    },
                    position: {
                      x: 8,
                      y: 3,
                      z: 0,
                    },
                    type: "portal",
                    aabb: {
                      y: 15,
                      x: 16,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: false,
                    id: "d/portal",
                    jsonItemId: "d",
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 136,
                        y: 57,
                        z: 0,
                      },
                    },
                  },
                  "d/stopAutowalk": {
                    aabb: {
                      x: 32,
                      y: 32,
                      z: 24,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "stopAutowalk",
                    id: "d/stopAutowalk",
                    jsonItemId: "d",
                    config: {},
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 88,
                        y: 48,
                        z: 0,
                      },
                    },
                  },
                  db: {
                    config: {
                      style: "volcano",
                    },
                    position: {
                      x: 0,
                      y: 7,
                      z: 0,
                    },
                    type: "deadlyBlock",
                    aabb: {
                      x: 16,
                      y: 16,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 18,
                      z: 12,
                    },
                    id: "db",
                    jsonItemId: "db",
                    shadowCastTexture: {
                      textureId: "shadow.fullBlock",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: 112,
                        z: 0,
                      },
                    },
                  },
                  f: {
                    aabb: {
                      x: 136.32,
                      y: 128,
                      z: 36,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "floor",
                    id: "f",
                    jsonItemId: "f",
                    config: {
                      floorType: "standable",
                      scenery: "jail",
                      times: {
                        x: 8,
                        y: 8,
                      },
                      naturalFootprint: {
                        aabb: {
                          x: 128,
                          y: 128,
                          z: 36,
                        },
                        position: {
                          x: 0,
                          y: 0,
                          z: -36,
                        },
                      },
                    },
                    renderAabb: {
                      x: 136.32,
                      y: 128,
                      z: 10,
                    },
                    renderAabbOffset: {
                      x: 0,
                      y: 0,
                      z: 26,
                    },
                    shadowCastTexture: {
                      textureId: "shadow.fullBlock",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {
                        heels: true,
                        pi: true,
                        pi1: true,
                      },
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: -36,
                      },
                    },
                  },
                  heels: {
                    id: "heels",
                    jsonItemId: "heels",
                    type: "heels",
                    aabb: {
                      x: 12,
                      y: 12,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: true,
                    config: {},
                    shadowCastTexture: {
                      textureId: "shadow.playable",
                      spritesheetVariant: "original",
                    },
                    renderAabbOffset: {
                      x: -1.5,
                      y: -1.5,
                      z: 0,
                    },
                    renderAabb: {
                      x: 14,
                      y: 14,
                      z: 14,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      vels: {
                        walking: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "f",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      action: "idle",
                      jumped: false,
                      teleporting: null,
                      autoWalk: false,
                      facing: {
                        x: 0,
                        y: -1,
                        z: 0,
                      },
                      visualFacingVector: {
                        x: 0,
                        y: -1,
                        z: 0,
                      },
                      walkStartFacing: {
                        x: 0,
                        y: -1,
                        z: 0,
                      },
                      walkDistance: 0,
                      switchedToAt: -9_007_199_254_740_991,
                      lastDiedAt: -9_007_199_254_740_991,
                      gameTime: 0,
                      lives: 8,
                      jumpStartZ: 0,
                      carrying: null,
                      hasBag: false,
                      bigJumps: 0,
                      isBigJump: false,
                      shieldCollectedAt: -9_007_199_254_740_991,
                      position: {
                        x: 49,
                        y: 57,
                        z: 0,
                      },
                    },
                  },
                  pi: {
                    config: {
                      gives: "scroll",
                      page: "head",
                      source: "manual",
                    },
                    position: {
                      x: 7,
                      y: 1,
                      z: 0,
                    },
                    type: "pickup",
                    aabb: {
                      x: 16,
                      y: 4,
                      z: 13,
                    },
                    castsShadowWhileStoodOn: true,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 6,
                      z: 13,
                    },
                    id: "pi",
                    jsonItemId: "pi",
                    shadowCastTexture: {
                      textureId: "shadow.scroll",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: {
                        on: "touch",
                        byType: ["head", "heels", "headOverHeels"],
                      },
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 112,
                        y: 22,
                        z: 0,
                      },
                      vels: {
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "f",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      wouldPickUpNext: false,
                    },
                  },
                  pi1: {
                    config: {
                      gives: "scroll",
                      page: "heels",
                      source: "manual",
                    },
                    position: {
                      x: 3,
                      y: 7,
                      z: 0,
                    },
                    type: "pickup",
                    aabb: {
                      x: 16,
                      y: 4,
                      z: 13,
                    },
                    castsShadowWhileStoodOn: true,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 6,
                      z: 13,
                    },
                    id: "pi1",
                    jsonItemId: "pi1",
                    shadowCastTexture: {
                      textureId: "shadow.scroll",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: {
                        on: "touch",
                        byType: ["head", "heels", "headOverHeels"],
                      },
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 48,
                        y: 118,
                        z: 0,
                      },
                      vels: {
                        gravity: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                        movingFloor: {
                          x: 0,
                          y: 0,
                          z: 0,
                        },
                      },
                      latentMovement: [],
                      collidedWith: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                      },
                      controlledWithJoystickAtRoomTime: -9_007_199_254_740_991,
                      standingOnItemId: "f",
                      standingOnUntilRoomTime: -9_007_199_254_740_991,
                      previousStandingOnItemId: null,
                      wouldPickUpNext: false,
                    },
                  },
                  t: {
                    config: {
                      toRoom: "blacktooth24",
                    },
                    position: {
                      x: 0,
                      y: 0,
                      z: 0,
                    },
                    type: "teleporter",
                    aabb: {
                      x: 16,
                      y: 16,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    renderAabbOffset: {
                      x: -1,
                      y: -1,
                      z: 0,
                    },
                    renderAabb: {
                      x: 18,
                      y: 18,
                      z: 12,
                    },
                    id: "t",
                    jsonItemId: "t",
                    shadowCastTexture: {
                      textureId: "shadow.fullBlock",
                      spritesheetVariant: "original",
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      toRoom: "blacktooth24",
                    },
                  },
                  w: {
                    type: "wall",
                    id: "w",
                    jsonItemId: "w",
                    config: {
                      direction: "right",
                      times: {
                        y: 8,
                      },
                    },
                    aabb: {
                      x: 16,
                      y: 128,
                      z: 9999,
                    },
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -16,
                        y: 0,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: true,
                  },
                  w1: {
                    type: "wall",
                    id: "w1",
                    jsonItemId: "w1",
                    config: {
                      direction: "towards",
                      times: {
                        x: 8,
                      },
                    },
                    aabb: {
                      x: 128,
                      y: 16,
                      z: 9999,
                    },
                    fixedZIndex: -2,
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: -16,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      flipX: true,
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: true,
                  },
                  w2: {
                    type: "wall",
                    id: "w2",
                    jsonItemId: "w2",
                    config: {
                      direction: "away",
                      tiles: [
                        "bars",
                        "bars",
                        "bars",
                        "bars",
                        "bars",
                        "bars",
                        "bars",
                        "bars",
                      ],
                    },
                    aabb: {
                      x: 128,
                      y: 16,
                      z: 9999,
                    },
                    renderAabb: {
                      x: 128,
                      y: 0,
                      z: 50,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 0,
                        y: 128,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      flipX: true,
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: false,
                  },
                  w3: {
                    type: "wall",
                    id: "w3",
                    jsonItemId: "w3",
                    config: {
                      direction: "left",
                      tiles: ["bars", "bars", "bars"],
                    },
                    aabb: {
                      x: 16,
                      y: 48,
                      z: 9999,
                    },
                    renderAabb: {
                      x: 0,
                      y: 48,
                      z: 50,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 128,
                        y: 0,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: false,
                  },
                  w4: {
                    type: "wall",
                    id: "w4",
                    jsonItemId: "w4",
                    config: {
                      direction: "left",
                      tiles: ["bars", "bars", "bars"],
                    },
                    aabb: {
                      x: 16,
                      y: 48,
                      z: 9999,
                    },
                    renderAabb: {
                      x: 0,
                      y: 48,
                      z: 50,
                    },
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: 128,
                        y: 80,
                        z: 0,
                      },
                    },
                    shadowCastTexture: {
                      textureId: "shadow.wall.y",
                      spritesheetVariant: "original",
                    },
                    castsShadowWhileStoodOn: false,
                  },
                  outOfBounds: {
                    aabb: {
                      x: 224,
                      y: 224,
                      z: 12,
                    },
                    castsShadowWhileStoodOn: false,
                    type: "outOfBounds",
                    id: "outOfBounds",
                    fixedZIndex: -2,
                    config: {},
                    state: {
                      expires: null,
                      stoodOnBy: {},
                      disappearing: null,
                      switchedAtRoomTime: -9_007_199_254_740_991,
                      stoodOnUntilRoomTime: -9_007_199_254_740_991,
                      actedOnAt: {
                        roomTime: -9_007_199_254_740_991,
                        by: {},
                        actedInXY: false,
                        actedInZ: false,
                      },
                      position: {
                        x: -64,
                        y: -64,
                        z: -120,
                      },
                    },
                  },
                },
                planet: "jail",
                roomJson: {
                  color: {
                    hue: "cyan",
                    shade: "basic",
                  },
                  id: "blacktooth23heels",
                  items: {
                    br: {
                      config: {
                        axis: "y",
                        times: {
                          y: 8,
                          z: 3,
                        },
                      },
                      position: {
                        x: 4,
                        y: 0,
                        z: 0,
                      },
                      type: "barrier",
                    },
                    co: {
                      config: {
                        direction: "away",
                        times: {
                          y: 6,
                        },
                      },
                      position: {
                        x: 0,
                        y: 1,
                        z: 0,
                      },
                      type: "conveyor",
                    },
                    d: {
                      config: {
                        direction: "left",
                        toRoom: "blacktooth1head",
                      },
                      position: {
                        x: 8,
                        y: 3,
                        z: 0,
                      },
                      type: "door",
                    },
                    db: {
                      config: {
                        style: "volcano",
                      },
                      position: {
                        x: 0,
                        y: 7,
                        z: 0,
                      },
                      type: "deadlyBlock",
                    },
                    f: {
                      config: {
                        floorType: "standable",
                        scenery: "jail",
                        times: {
                          x: 8,
                          y: 8,
                        },
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "floor",
                    },
                    heels: {
                      config: {
                        which: "heels",
                      },
                      position: {
                        x: 3,
                        y: 3.5,
                        z: 0,
                      },
                      type: "player",
                    },
                    pi: {
                      config: {
                        gives: "scroll",
                        page: "head",
                        source: "manual",
                      },
                      position: {
                        x: 7,
                        y: 1,
                        z: 0,
                      },
                      type: "pickup",
                    },
                    pi1: {
                      config: {
                        gives: "scroll",
                        page: "heels",
                        source: "manual",
                      },
                      position: {
                        x: 3,
                        y: 7,
                        z: 0,
                      },
                      type: "pickup",
                    },
                    t: {
                      config: {
                        toRoom: "blacktooth24",
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "teleporter",
                    },
                    w: {
                      config: {
                        direction: "right",
                        times: {
                          y: 8,
                        },
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w1: {
                      config: {
                        direction: "towards",
                        times: {
                          x: 8,
                        },
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w2: {
                      config: {
                        direction: "away",
                        tiles: [
                          "bars",
                          "bars",
                          "bars",
                          "bars",
                          "bars",
                          "bars",
                          "bars",
                          "bars",
                        ],
                      },
                      position: {
                        x: 0,
                        y: 8,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w3: {
                      config: {
                        direction: "left",
                        tiles: ["bars", "bars", "bars"],
                      },
                      position: {
                        x: 8,
                        y: 0,
                        z: 0,
                      },
                      type: "wall",
                    },
                    w4: {
                      config: {
                        direction: "left",
                        tiles: ["bars", "bars", "bars"],
                      },
                      position: {
                        x: 8,
                        y: 5,
                        z: 0,
                      },
                      type: "wall",
                    },
                  },
                  planet: "jail",
                },
                roomTime: 0,
              },
            },
            currentCharacterName: "head",
            entryState: {
              head: {
                position: {
                  x: 41,
                  y: 41,
                  z: 0,
                },
                facing: {
                  x: 0,
                  y: -1,
                  z: 0,
                },
                autoWalk: false,
                action: "idle",
                vels: {
                  walking: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                  gravity: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                  movingFloor: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                },
              },
              heels: {
                position: {
                  x: 49,
                  y: 57,
                  z: 0,
                },
                facing: {
                  x: 0,
                  y: -1,
                  z: 0,
                },
                autoWalk: false,
                action: "idle",
                vels: {
                  walking: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                  gravity: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                  movingFloor: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                },
              },
            },
            gameTime: 87_066.599_999_997_55,
            pickupsCollected: {},
          },
          store: {
            gameMenus: {
              gameInPlay: {
                freeCharacters: {},
                planetsLiberated: {
                  blacktooth: false,
                  bookworld: false,
                  egyptus: false,
                  penitentiary: false,
                  safari: false,
                },
                roomsExplored: {
                  blacktooth1head: true,
                  blacktooth23heels: true,
                },
                scrollsRead: {},
                campaignLocator: {
                  userId: "@@original",
                  campaignName: "original",
                  version: -1,
                },
              },
            },
          },
        },
      },
      lastSavedCampaignLocator: {
        userId: "@@original",
        campaignName: "original",
        version: -1,
      },
    },
    _persist: {
      version: 17,
      rehydrated: true,
    },
  },
  "campaignDirectory/true": {
    "2924c962-99f1-4dd2-9b9c-fef832dc991b": {
      user: {
        id: "2924c962-99f1-4dd2-9b9c-fef832dc991b",
        username: "jim",
        isCurrentUser: null,
      },
      campaigns: {
        childrens: {
          name: "childrens",
          version: 5,
          created_at: "2025-08-20T16:12:09.312806+00:00",
        },
        sequel: {
          name: "sequel",
          version: 589,
          created_at: "2026-04-29T17:06:04.819209+00:00",
        },
      },
    },
    "bba40a78-4903-4997-b65e-20ab3ca7b422": {
      user: {
        id: "bba40a78-4903-4997-b65e-20ab3ca7b422",
        username: "RJ52",
        isCurrentUser: null,
      },
      campaigns: {
        "Jons rooms": {
          name: "Jons rooms",
          version: 3,
          created_at: "2025-07-29T17:40:08.92782+00:00",
        },
      },
    },
    "8d15b7cc-9c67-4f70-9f4f-743b1a2a8f8e": {
      user: {
        id: "8d15b7cc-9c67-4f70-9f4f-743b1a2a8f8e",
        username: "anon",
        isCurrentUser: null,
      },
      campaigns: {
        "test-rooms": {
          name: "test-rooms",
          version: 1,
          created_at: "2025-08-16T21:25:28.07751+00:00",
        },
      },
    },
  },
  "persist:hohol/spritesheetOverride": {
    overrides: {},
    _persist: {
      version: 1,
      rehydrated: true,
    },
  },
};
