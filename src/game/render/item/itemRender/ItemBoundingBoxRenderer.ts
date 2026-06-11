import { Color, type ColorSource, Container, Graphics } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { selectShowBoundingBoxTypesSet } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../../store/store";
import { type Aabb } from "../../../../utils/vectors/vectors";
import { isItemType } from "../../../physics/itemPredicates";
import { type ItemRenderContext } from "../../ItemRenderContexts";
import { projectWorldXyzToScreenXy } from "../../projections";
import { TextContainer } from "../../text/TextContainer";
import { type ItemPixiRenderer } from "./ItemPixiRenderer";

const addCuboidPaths = (cuboid: Aabb, graphics: Graphics) => {
  graphics
    // bottom:
    .poly([
      projectWorldXyzToScreenXy({}),
      projectWorldXyzToScreenXy({ x: cuboid.x }),
      projectWorldXyzToScreenXy({ x: cuboid.x, y: cuboid.y }),
      projectWorldXyzToScreenXy({ y: cuboid.y }),
    ])
    // right:
    .poly([
      projectWorldXyzToScreenXy({}),
      projectWorldXyzToScreenXy({ z: cuboid.z }),
      projectWorldXyzToScreenXy({ y: cuboid.y, z: cuboid.z }),
      projectWorldXyzToScreenXy({ y: cuboid.y }),
    ])
    // left:
    .poly([
      projectWorldXyzToScreenXy({ x: cuboid.x }),
      projectWorldXyzToScreenXy({ x: cuboid.x, z: cuboid.z }),
      projectWorldXyzToScreenXy(cuboid),
      projectWorldXyzToScreenXy({ x: cuboid.x, y: cuboid.y }),
    ])
    // top:
    .poly([
      projectWorldXyzToScreenXy({ z: cuboid.z }),
      projectWorldXyzToScreenXy({ x: cuboid.x, z: cuboid.z }),
      projectWorldXyzToScreenXy({
        x: cuboid.x,
        y: cuboid.y,
        z: cuboid.z,
      }),
      projectWorldXyzToScreenXy({ y: cuboid.y, z: cuboid.z }),
    ]);
};

const bbLineWidth = 0.66;

const renderBB = (aabb: Aabb, color: ColorSource, lineWidth = bbLineWidth) => {
  const graphics = new Graphics();
  addCuboidPaths(aabb, graphics);

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
    addCuboidPaths(aabb, graphics);

    graphics.stroke({
      width: lineWidth,
      color,
      alpha: 1,
    });
  });

  return graphics;
};

const bbColors: Record<ItemInPlayType, string> = {
  // players
  head: "#FFB800",
  heels: "#FFB800",
  headOverHeels: "#FFB800",

  // structural / static geometry
  wall: "#80C800",
  floor: "#4A7A2E",
  block: "#8B6914",
  doorFrame: "#FF8000",
  doorLegs: "#CC6600",

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
  teleporter: "#CC44FF",
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

  // emitters & projectiles
  emitter: "#00FFFF",
  firedDoughnut: "#00DDAA",
  bubbles: "#88EEFF",

  // platforms
  movingPlatform: "#20B0A0",

  // barriers & blockers
  barrier: "#A0A0C0",
  blocker: "#808080",
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

export class ItemBoundingBoxRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #container: Container;
  #shown = false;

  readonly renderContext: ItemRenderContext<T>;

  constructor(renderContext: ItemRenderContext<T>) {
    this.renderContext = renderContext;
    this.#container = new Container({
      label: `ItemBoundingBoxRenderer ${renderContext.item.id}`,
    });
  }

  #render() {
    const { item } = this.renderContext;
    const color = bbColors[item.type];

    if (isItemType("portal")(item)) {
      const relativePointScreenXy = projectWorldXyzToScreenXy(
        item.config.relativePoint,
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
    this.#container.addChild(renderBB(item.aabb, color));
    if (item.renderAabb) {
      const renderAabbGraphics = renderBB(
        item.renderAabb,
        color,
        bbLineWidth / 2,
      );
      if (item.renderAabbOffset) {
        const offset = projectWorldXyzToScreenXy(item.renderAabbOffset);
        renderAabbGraphics.position.set(offset.x, offset.y);
        renderAabbGraphics.circle(0, 0, 2).fill(color);
      }
      this.#container.addChild(renderAabbGraphics);
    }

    this.#container.eventMode = "static";
    // the game's own sprite-font (TextContainer), not pixi's Text: this is
    // the only Text usage in the game/editor, so avoiding it lets the
    // bundler tree-shake all of pixi's text rendering away
    let textNode: Container | undefined;
    this.#container.on("pointerenter", () => {
      if (textNode !== undefined) {
        return;
      }
      const { pixiRenderer, spritesheetVariants } = this.renderContext.general;
      const lines = [
        `${item.id} ${item.type}`,
        `at (${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})`,
        `aabb (${item.aabb.x}, ${item.aabb.y}, ${item.aabb.z})`,
      ];
      textNode = new Container({ label: "bbHoverInfo" });
      for (const [i, line] of lines.entries()) {
        textNode.addChild(
          new TextContainer({
            pixiRenderer,
            spritesheet: spritesheetVariants.originalSpritesheet,
            text: line,
            colour: new Color(color),
            y: i * 10,
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

    if (shouldShow === this.#shown) {
      return;
    }

    if (shouldShow) {
      this.#render();
    } else {
      this.#clear();
    }
  }

  destroy(): void {
    this.#container.destroy({ children: true });
  }
  get output() {
    return this.#container;
  }
}
