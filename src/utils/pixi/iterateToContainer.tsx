import { Container } from "pixi.js";

export function iterateToContainer(gen: Iterable<Container>, into?: Container) {
  const c = into || new Container();
  for (const s of gen) {
    c.addChild(s);
  }
  return c;
}
