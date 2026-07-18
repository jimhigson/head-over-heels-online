import { Color, type ColorSource, Container, Graphics } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { selectShowBoundingBoxTypesSet } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../../store/store";
import { nearestQuarterAngle } from "../../../../utils/vectors/rotateXy";
import { type Aabb, type Xy } from "../../../../utils/vectors/vectors";
import { isItemType } from "../../../physics/itemPredicates";
import { type ItemRenderContext } from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import { createHudText } from "../../text/createHudText";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";

const bbColors: Record<ItemInPlayType, string> = {
  // players
  head: "#0091FF",
  heels: "#F200FF",
  headOverHeels: "#FFB800",

  // structural / static geometry
  wall: "#9B9B9B",
  floor: "#EFB06D",
  block: "#FFFFFF",
  doorFrame: "#FF8000",
  doorLegs: "#004ECC",

  // deadly / hazardous
  deadlyBlock: "#FF2040",
  moveableDeadly: "#D01030",
  slidingDeadly: "#FF4060",
  spikes: "#E00050",

  // enemies
  monster: "#FF6020",
  charles: "#FF4500",
  hushPuppy: "#E05820",

  // moveable / interactive blocks
  portableBlock: "#CDA040",
  pushableBlock: "#A08030",
  slidingBlock: "#D4A850",

  // transport / movement
  portal: "#FF00FF",
  teleporter: "#CAEFFE",
  portableTeleporter: "#AA66FF",
  lift: "#4488FF",
  conveyor: "#2266DD",
  spring: "#00BBFF",

  // pickups & rewards
  pickup: "#00C4FF",
  sceneryCrown: "#FFD700",

  // switches & triggers
  switch: "#CCDD00",
  button: "#AACC00",
  joystick: "#DDEE22",
  timer: "#EEDD00",

  // lamps, mirrors and light:
  lamp: "#FFF080",
  mirror: "#C0E8FF",
  lightBeam: "#FFFFC0",

  // emitters & projectiles
  emitter: "#00FFFF",
  firedDoughnut: "#00DDAA",
  bubbles: "#88EEFF",

  // platforms
  movingPlatform: "#20B0A0",

  // barriers & blockers
  barrier: "#A0A0C0",
  blocker: "#973BFF",
  outOfBounds: "#606060",
  stopAutowalk: "#FF8080",

  // visual effects / non-physical
  particle: "#DD88FF",
  floatingText: "#8000FF",
  soundEffect: "#B060D0",
  sceneryPlayer: "#FFB060",

  // misc
  ball: "#FF9944",
};

/** which single face of the box to faintly shade in, if any */
type ShadeFace = "bottom" | "none" | "top";

const addCuboidPathsToGraphics = (
  cuboid: Aabb,
  graphics: Graphics,
  cameraQuarterAngle: Xy,
  shadeFace: ShadeFace = "none",
  color?: ColorSource,
) => {
  const bottomFace = [
    projectWorldXyzToScreenXy({}, cameraQuarterAngle),
    projectWorldXyzToScreenXy({ x: cuboid.x }, cameraQuarterAngle),
    projectWorldXyzToScreenXy({ x: cuboid.x, y: cuboid.y }, cameraQuarterAngle),
    projectWorldXyzToScreenXy({ y: cuboid.y }, cameraQuarterAngle),
  ];
  const topFace = [
    projectWorldXyzToScreenXy({ z: cuboid.z }, cameraQuarterAngle),
    projectWorldXyzToScreenXy({ x: cuboid.x, z: cuboid.z }, cameraQuarterAngle),
    projectWorldXyzToScreenXy(
      { x: cuboid.x, y: cuboid.y, z: cuboid.z },
      cameraQuarterAngle,
    ),
    projectWorldXyzToScreenXy({ y: cuboid.y, z: cuboid.z }, cameraQuarterAngle),
  ];

  // faintly shade one face - the footprint (bottom) or the top - in the box's
  // own colour:
  if (shadeFace !== "none" && color !== undefined) {
    graphics
      .poly(shadeFace === "top" ? topFace : bottomFace)
      .fill({ color, alpha: 0.5 });
  }

  graphics
    // bottom:
    .poly(bottomFace)
    // right:
    .poly([
      projectWorldXyzToScreenXy({}, cameraQuarterAngle),
      projectWorldXyzToScreenXy({ z: cuboid.z }, cameraQuarterAngle),
      projectWorldXyzToScreenXy(
        { y: cuboid.y, z: cuboid.z },
        cameraQuarterAngle,
      ),
      projectWorldXyzToScreenXy({ y: cuboid.y }, cameraQuarterAngle),
    ])
    // left:
    .poly([
      projectWorldXyzToScreenXy({ x: cuboid.x }, cameraQuarterAngle),
      projectWorldXyzToScreenXy(
        { x: cuboid.x, z: cuboid.z },
        cameraQuarterAngle,
      ),
      projectWorldXyzToScreenXy(cuboid, cameraQuarterAngle),
      projectWorldXyzToScreenXy(
        { x: cuboid.x, y: cuboid.y },
        cameraQuarterAngle,
      ),
    ])
    // top:
    .poly(topFace);
};

const bbLineWidth = 0.66;

const renderBB = (
  aabb: Aabb,
  color: ColorSource,
  cameraQuarterAngle: Xy,
  lineWidth = bbLineWidth,
  shadeFace: ShadeFace = "none",
) => {
  const graphics = new Graphics();
  addCuboidPathsToGraphics(
    aabb,
    graphics,
    cameraQuarterAngle,
    shadeFace,
    color,
  );

  graphics.stroke({
    width: lineWidth,
    color,
    alpha: 1,
  });

  graphics.eventMode = "static";
  graphics.on("pointerenter", () => {
    graphics.fill({ color, alpha: 0.5 });
  });
  graphics.on("pointerleave", () => {
    graphics.clear();
    addCuboidPathsToGraphics(aabb, graphics, cameraQuarterAngle, "none", color);

    graphics.stroke({
      width: lineWidth,
      color,
      alpha: 1,
    });
  });

  return graphics;
};

export class ItemBoundingBoxRenderer<T extends ItemInPlayType>
  implements ItemChainPixiRenderer<T>
{
  #container: Container;
  #shown = false;
  /**
   * the aabb reference last drawn, so the overlay can be redrawn when an
   * item's bounding box changes. Items replace their aabb by reference when
   * it changes (eg light beams), so reference inequality is a sound signal
   */
  #lastRenderedAabb: Aabb | undefined;
  /**
   * the camera angle last drawn, so the overlay redraws on rotation: the box shape and the
   * renderAabb's offset are both projected with the angle, and renderAabbOffset is re-derived
   * per angle too - none of which changes the item's aabb reference
   */
  #lastRenderedCameraAngle: undefined | Xy;

  readonly renderContext: ItemRenderContext<T>;

  constructor(renderContext: ItemRenderContext<T>) {
    this.renderContext = renderContext;
    this.#container = new Container({
      label: `ItemBoundingBoxRenderer ${renderContext.item.id}`,
    });
  }

  /** (re)build the overlay graphics for the item's current bounding box */
  #draw() {
    this.#container.removeChildren();
    this.#container.removeAllListeners();

    const { item } = this.renderContext;
    const { cameraAngle } = this.renderContext.general;
    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
    const color = bbColors[item.type];

    // the box draws every corner at its true projected position (project(worldCorner)
    // via the inherited container transform), so boxes stay consistent with each
    // other at all angles - and coincide with sprites, which are anchored at their
    // footprint's near corner (see footprintNearCornerXY):

    if (isItemType("portal")(item)) {
      const relativePointScreenXy = projectWorldXyzToScreenXy(
        item.config.relativePoint,
        cameraQuarterAngle,
      );
      this.#container.addChild(
        new Graphics()
          .circle(relativePointScreenXy.x, relativePointScreenXy.y, 5)
          .stroke(color),
      );
      this.#container.addChild(
        new Graphics()
          .circle(relativePointScreenXy.x, relativePointScreenXy.y, 2)
          .fill(color),
      );
    }

    this.#container.addChild(
      new Graphics({ label: "objectOrigin" }).circle(0, 0, 2).fill(color),
    );
    this.#container.addChild(
      renderBB(
        item.aabb,
        color,
        cameraQuarterAngle,
        undefined,
        item.type === "floor" ? "top" : "bottom",
      ),
    );
    const renderBox = this.renderContext.renderBoxes.get(item);
    if (renderBox) {
      const renderAabbGraphics = renderBB(
        renderBox.renderAabb,
        color,
        cameraQuarterAngle,
        bbLineWidth / 2,
      );
      if (renderBox.renderAabbOffset) {
        const offset = projectWorldXyzToScreenXy(
          renderBox.renderAabbOffset,
          cameraQuarterAngle,
        );
        renderAabbGraphics.position.set(offset.x, offset.y);
        renderAabbGraphics.circle(0, 0, 2).fill(color);
      }
      this.#container.addChild(renderAabbGraphics);
    }

    this.#container.eventMode = "static";
    // hover info rendered with the HUD web font via createHudText (Pixi
    // BitmapText):
    let textNode: Container | undefined;
    this.#container.on("pointerenter", () => {
      if (textNode !== undefined) {
        return;
      }
      const lines = [
        `${item.id} ${item.type}`,
        `at (${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})`,
        `aabb (${item.aabb.x}, ${item.aabb.y}, ${item.aabb.z})`,
      ];
      textNode = new Container({ label: "bbHoverInfo" });
      for (const [i, line] of lines.entries()) {
        textNode.addChild(
          createHudText({
            text: line,
            colour: new Color(color),
            y: i * 10,
            outline: true,
          }),
        );
      }
      this.#container.addChild(textNode);
    });
    this.#container.on("pointerleave", () => {
      if (textNode === undefined) {
        return;
      }
      this.#container.removeChild(textNode);
      textNode = undefined;
    });

    this.#lastRenderedAabb = item.aabb;
    this.#lastRenderedCameraAngle = cameraQuarterAngle;
  }

  #show() {
    this.#draw();
    // the box draws its corners at the item's true projected origin, so it must not inherit
    // the near-corner offset applied to the item's sprites: parent it to the item position
    // container (outside the offset) rather than leaving it nested in the offset container:
    this.renderContext.itemPositionContainer?.addChild(this.#container);
    this.renderContext.frontLayer.attach(this.#container);
    this.#shown = true;
  }

  #clear() {
    this.#shown = false;
    this.#container.removeChildren();
    this.#container.removeAllListeners();
    this.renderContext.frontLayer.detach(this.#container);
  }

  tick() {
    const shouldShow = selectShowBoundingBoxTypesSet(store.getState()).has(
      this.renderContext.item.type,
    );

    if (shouldShow !== this.#shown) {
      if (shouldShow) {
        this.#show();
      } else {
        this.#clear();
      }
      return;
    }

    // already showing: redraw if the bounding box changed (new aabb reference) or the
    // camera rotated (the box shape and the renderAabb offset are camera-dependent)
    const cameraQuarterAngle = nearestQuarterAngle(
      this.renderContext.general.cameraAngle,
    );
    if (
      shouldShow &&
      (this.renderContext.item.aabb !== this.#lastRenderedAabb ||
        cameraQuarterAngle.x !== this.#lastRenderedCameraAngle?.x ||
        cameraQuarterAngle.y !== this.#lastRenderedCameraAngle?.y)
    ) {
      this.#draw();
    }
  }

  destroy(): void {
    this.#container.destroy({ children: true });
  }
  get output() {
    return this.#container;
  }
}
