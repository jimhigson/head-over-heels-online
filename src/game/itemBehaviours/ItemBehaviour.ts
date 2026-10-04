import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { itemBehaviourKey, type ItemInPlayType } from "../../model/ItemInPlay";
import {
  type FreeItem,
  type PositionlessItem,
  type UnionOfAllItemInPlayTypes,
} from "../../model/ItemInPlayNarrowedUnions";
import { type RoomState } from "../../model/RoomState";
import { type Xy, type Xyz } from "../../utils/vectors/vectors";
import { type GameState } from "../gameState/GameState";
import { type ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { type MechanicResult } from "../physics/MechanicResult";
import { type ShadowCastSpriteOptions } from "../render/ShadowCastSpriteOptions";
import { type DrawOrderComparable } from "../render/sortZ/DrawOrderComparable";

/**
 * the constants a behaviour is made with - each sets the field, or the
 * result of the method, of the same name. All default to false/absent
 */
export type ItemBehaviourOptions = {
  //  ____________________________________________________
  //  physics: collision, movement and pushing
  //  ____________________________________________________
  /**
   * @see ItemBehaviour.isNonSolid
   */
  isNonSolid?: boolean;
  /**
   * @see ItemBehaviour.snagsHelpfulMovement
   */
  snagsHelpfulMovement?: boolean;

  //  ____________________________________________________
  //  gameplay: what the item does to playables and other items
  //  ____________________________________________________
  /**
   * @see ItemBehaviour.isDeadly
   */
  isDeadly?: boolean;
  /**
   * @see ItemBehaviour.collisionDoesNotStopAutowalk
   */
  collisionDoesNotStopAutowalk?: boolean;
  /**
   * @see ItemBehaviour.isTeleporter
   */
  isTeleporter?: boolean;
  /**
   * @see ItemBehaviour.isPortable
   */
  isPortable?: boolean;

  //  ____________________________________________________
  //  rendering: draw order, sprite placement and shadows
  //  ____________________________________________________
  /**
   * @see ItemBehaviour.fixedZIndex
   */
  fixedZIndex?: number;
  /**
   * @see ItemBehaviour.isExemptFromNearCornerOffset
   */
  isExemptFromNearCornerOffset?: boolean;
  /**
   * @see ItemBehaviour.isCuboidWarped
   */
  isCuboidWarped?: boolean;
  /**
   * @see ItemBehaviour.castsShadowWhileStoodOn
   */
  castsShadowWhileStoodOn?: boolean;
  /**
   * @see ItemBehaviour.shadowCastTexture
   */
  shadowCastTexture?: ShadowCastSpriteOptions;
};

/**
 * The behaviour of one type of item - a "Type Object" shared by every item of
 * that type. See https://gameprogrammingpatterns.com/type-object.html and the
 * original pattern by Johnson and Woolf at
 * http://www.cs.ox.ac.uk/jeremy.gibbons/dpa/typeobject.pdf
 *
 * Behaviours are stateless: all state stays on the items, which are passed to
 * every method (like a Flyweight's extrinsic state - see
 * https://en.wikipedia.org/wiki/Flyweight_pattern). So behaviours are never
 * part of the game state, nor of saved games.
 *
 * Behaviours form a hierarchy (eg, free item → monster → cyberman), with each
 * subclass narrowing the item parameters to the item types it serves.
 */
export class ItemBehaviour {
  readonly #isNonSolid: boolean;
  readonly #isDeadly: boolean;
  readonly #isTeleporter: boolean;
  readonly #isPortable: boolean;
  readonly #isCuboidWarped: boolean;
  readonly #castsShadowWhileStoodOn: boolean;
  readonly #shadowCastTexture: ShadowCastSpriteOptions | undefined;

  constructor({
    snagsHelpfulMovement = false,
    collisionDoesNotStopAutowalk = false,
    fixedZIndex,
    isExemptFromNearCornerOffset = false,
    isNonSolid = false,
    isDeadly = false,
    isTeleporter = false,
    isPortable = false,
    isCuboidWarped = false,
    castsShadowWhileStoodOn = false,
    shadowCastTexture,
  }: ItemBehaviourOptions = {}) {
    this.snagsHelpfulMovement = snagsHelpfulMovement;
    this.collisionDoesNotStopAutowalk = collisionDoesNotStopAutowalk;
    this.fixedZIndex = fixedZIndex;
    this.isExemptFromNearCornerOffset = isExemptFromNearCornerOffset;
    this.#isNonSolid = isNonSolid;
    this.#isDeadly = isDeadly;
    this.#isTeleporter = isTeleporter;
    this.#isPortable = isPortable;
    this.#isCuboidWarped = isCuboidWarped;
    this.#castsShadowWhileStoodOn = castsShadowWhileStoodOn;
    this.#shadowCastTexture = shadowCastTexture;
  }
  // ---- capabilities ----

  /**
   * heavy items stop lifts from rising (see #blacktooth78)
   */
  isHeavy<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return false;
  }

  /**
   * whether this item is stopped by heavy items it pushes
   */
  readonly stoppedByHeavyItems: boolean = false;

  /**
   * if true, the item pushes other items without slowing down because they are there,
   * ie lifts don't go slower if something is on them
   */
  readonly pushesForcefully: boolean = false;

  /**
   * items partially colliding don't slide past this item; this helps to interact with the
   * item instead. Eg, joysticks, switches, mirrors are interacted with by pushing them
   * so helping to walk around them would not be helpful
   */
  readonly snagsHelpfulMovement: boolean;

  /**
   * whether a playable touching this item keeps autowalking. Touching nearly
   * anything ends an autowalk, so a playable can't get stuck autowalking into
   * an item it can't push. Only items a playable always touches while passing
   * through a doorway (floors, portals, door frames and legs) leave it running
   */
  readonly collisionDoesNotStopAutowalk: boolean;

  /**
   * extra height (px) when jumping off this item (eg springs)
   */
  readonly jumpBoostPx: number = 0;

  /**
   * Whether the toucher (or anything, if none given) passes through this
   */
  isNonSolid<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _toucher?: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return this.#isNonSolid;
  }

  /**
   * whether the stander can stand on this item
   */
  isStandable<RoomId extends string, RoomItemId extends string>(
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    stander: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return !this.isNonSolid(item, stander);
  }

  isDeadly<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return this.#isDeadly;
  }

  /**
   * whether Heels can carry this item
   */
  isPortable<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return this.#isPortable;
  }

  /**
   * deadly from the top-side (ie spikes) even if not generally deadly
   */
  isDeadlyToStandOn<RoomId extends string, RoomItemId extends string>(
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return this.isDeadly(item);
  }

  /**
   * whether the pusher can push this item
   */
  isPushableBy<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    /**
     * if true, some pushes are allowed. Ie, a player can push another player through
     * a door while backing-off-and re-entering the room to clear their area
     */
    _forceful: boolean,
  ): _item is FreeItem<RoomId, RoomItemId> {
    return false;
  }

  /**
   * whether a playable standing on this item can jump off it
   */
  isJumpOffable<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return true;
  }

  /**
   * whether this item's position is irrelevant, so it takes no space in its
   * room and is not spatially indexed
   */
  isPositionless<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): _item is PositionlessItem<RoomId, RoomItemId> {
    return false;
  }

  /**
   * whether items standing on this keep falling, rather than coming to rest on
   * it - so they stick to it as it moves down
   */
  keepsStandersFalling<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return false;
  }

  /**
   * the velocity that this moves the stander at, or undefined if not
   * currently a moving floor (so it isn't acting on the stander at all)
   */
  movingFloorVelocity<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _stander: FreeItem<RoomId, RoomItemId>,
  ): undefined | Xyz {
    return undefined;
  }

  /**
   * whether this item teleports playables standing on it
   */
  isTeleporter<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): _item is ItemTypeUnion<
    "portableTeleporter" | "teleporter",
    RoomId,
    RoomItemId
  > {
    return this.#isTeleporter;
  }

  // ---- ticking ----

  /**
   * this item's mechanics for one tick, pushed onto `into` - all are gathered
   * before any apply. Overrides push their own after calling super
   */
  mechanicResults<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    _deltaMS: number,
    /**
     * reused between ticks, so never kept hold of
     */
    _into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {}

  /**
   * ticks standing on another item, before mechanics run
   */
  tickStandingOnBeforeMechanics<
    RoomId extends string,
    RoomItemId extends string,
  >(
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    standingOn: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    _deltaMS: number,
  ): void {
    // something deadly standing on another item:
    if (this.isDeadly(item)) {
      standingOn[itemBehaviourKey].onDeadlyContact(standingOn, room, gameState);
    }
  }

  /**
   * this item came into contact with something deadly
   */
  onDeadlyContact<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
  ): void {}

  /**
   * ticks standing on another item, after mechanics run
   */
  tickStandingOn<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _standingOn: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _gameState: GameState<RoomId>,
    _deltaMS: number,
  ): void {}

  /**
   * effects of ticking, once this item's mechanics' results are applied
   */
  afterMechanicsApplied<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
    _deltaMS: number,
  ): void {}

  /**
   * a modifier (eg a switch) has just changed this item's settings, so it can
   * react in turn - eg a switch flipping its own targets
   */
  onModified<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: Pick<RoomState<RoomId, RoomItemId>, "items" | "roomTime">,
    /**
     * the chain of items already modified, to avoid infinite loops
     */
    _visited: Set<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
  ): void {}

  /**
   * the room holding this item has just been loaded, before any ticks
   */
  onRoomLoaded<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: RoomState<RoomId, RoomItemId>,
  ): void {}

  /**
   * this item has just been switched on, by itself or by a modifier
   */
  onActivated<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _room: Pick<RoomState<RoomId, RoomItemId>, "items">,
  ): void {}

  // ---- touching ----

  /**
   * this item moved into another (isMover), or another moved into it. Only the
   * mover's is called: it passes the touch on to the touched item, so overrides
   * choose whether to react before or after the touched item does
   */
  onTouch<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover) {
      e.touchedItem[itemBehaviourKey].onTouch(e.touchedItem, e, false);
    }
  }

  // ---- rendering ----

  /**
   * if defined, the z-index for every item of this type will not be based on
   * topological sort of the items in the room
   */
  readonly fixedZIndex: number | undefined;

  /**
   * {@link fixedZIndex}, unless this item does not render at this camera angle.
   * Items are given as the draw-order sort sees them
   */
  fixedZIndexAtAngle(
    _item: DrawOrderComparable,
    _cameraAngle: Xy,
  ): number | undefined {
    return this.fixedZIndex;
  }

  /**
   * whether this item's graphics skip the near-corner offset - for items whose
   * footprint sprite is not anchored at the camera-nearest corner
   */
  readonly isExemptFromNearCornerOffset: boolean;

  /**
   * whether this item is drawn as a solid box, whose faces are warped as a
   * cuboid mesh during a camera-rotation transition (rather than rigidly
   * sliding a flat sprite). Only for items with a box-shaped silhouette that
   * reads correctly as three projected faces
   */
  isCuboidWarped<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): boolean {
    return this.#isCuboidWarped;
  }

  /** the shadow this item casts on other items */
  shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _cameraAngle: Xy,
  ): ShadowCastSpriteOptions | undefined {
    return this.#shadowCastTexture;
  }

  /**
   * if true, an item whose footprint is entirely within this one's is darkened wholesale
   * (a tint over its whole appearance) rather than receiving a shaped cast shadow.
   * Cheaper than the mask + shadow-sprite path. Colourised mode only.
   */
  castsWholeShadows<RoomId extends string, RoomItemId extends string>(
    item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    cameraAngle: Xy,
  ): boolean {
    // solid full-block casters darken whatever falls entirely beneath them:
    return (
      this.shadowCastTexture(item, cameraAngle)?.textureId ===
      "shadow.fullBlock"
    );
  }

  /**
   * if true casts shadow while stood on. Most items can skip casting a shadow in this case, since
   * they will completely cover up and hide their own shadow - true is for items that let a little
   * bit of the floor below them be seen while they are standing on it
   */
  castsShadowWhileStoodOn<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _cameraAngle: Xy,
  ): boolean {
    return this.#castsShadowWhileStoodOn;
  }

  /** items this item will cast no shadows on */
  noShadowCastOn<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    _cameraAngle: Xy,
  ): Array<ItemInPlayType> | undefined {
    return undefined;
  }

  /**
   * Where this item's shadow mask is considered to be relative to its origin.
   *
   * For shadow masks (this item being cast on), the full xyz is considered to move the shadow mask
   *
   * For this item as the caster, the xy part is used but not the z, since the item's z doesn't matter
   * for where the shadow is cast on another item
   *
   * Eg, door legs can be any height, and need to move their shadow
   * masks to their top-side, so they should have a z-value
   */
  shadowOffset<RoomId extends string, RoomItemId extends string>(
    _item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ): Partial<Xyz> | undefined {
    return undefined;
  }
}
