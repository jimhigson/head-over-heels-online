import type { EmptyObject, RequiredKeysOf } from "type-fest";
import { expectTypeOf, test } from "vitest";

import type { Xy, Xyz } from "../../utils/vectors/vectors";
import type { JsonItemConfig } from "../json/JsonItem";
import type { ConfigWithCompleteTimesRequired } from "./ConfigWithCompleteTimesRequired";

type RoomId = "kitchen";
type RoomItemId = "ball";

test("optional partial xyz times become complete", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ times?: Partial<Xyz> }>["times"]
  >().toEqualTypeOf<Xyz>();
});

test("times becomes a required key", () => {
  expectTypeOf<
    RequiredKeysOf<ConfigWithCompleteTimesRequired<{ times?: Partial<Xyz> }>>
  >().toEqualTypeOf<"times">();
});

test("explicitly undefined-able times become complete", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{
      times?: Partial<Xyz> | undefined;
    }>["times"]
  >().toEqualTypeOf<Xyz>();
});

test("already-complete times stay complete", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ times: Xyz }>["times"]
  >().toEqualTypeOf<Xyz>();
});

test("z-only times become complete", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ times?: { z?: number } }>["times"]
  >().toEqualTypeOf<Xyz>();
});

test("required z-only times become complete", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ times?: { z: number } }>["times"]
  >().toEqualTypeOf<Xyz>();
});

test("xy-only times become complete", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ times?: Partial<Xy> }>["times"]
  >().toEqualTypeOf<Xyz>();
});

test("the config's other properties are kept", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{
      style: "cube";
      times?: Partial<Xyz>;
    }>["style"]
  >().toEqualTypeOf<"cube">();
});

test("a config without times gains complete times", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ style: "cube" }>
  >().toEqualTypeOf<{ style: "cube"; times: Xyz }>();
});

test("a config with only other optional properties gains complete times", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<{ speed?: number }>
  >().toEqualTypeOf<{ speed?: number; times: Xyz }>();
});

test("an empty config gains complete times, as its only key", () => {
  expectTypeOf<
    RequiredKeysOf<ConfigWithCompleteTimesRequired<EmptyObject>>
  >().toEqualTypeOf<"times">();
});

test("never is unchanged", () => {
  expectTypeOf<ConfigWithCompleteTimesRequired<never>>().toBeNever();
});

test("union members with times have them completed", () => {
  expectTypeOf<
    Extract<
      ConfigWithCompleteTimesRequired<
        { style: "cube"; times?: Partial<Xyz> } | { style: "tower" }
      >,
      { style: "cube" }
    >["times"]
  >().toEqualTypeOf<Xyz>();
});

test("union members without times gain complete times", () => {
  expectTypeOf<
    Extract<
      ConfigWithCompleteTimesRequired<
        { style: "cube"; times?: Partial<Xyz> } | { style: "tower" }
      >,
      { style: "tower" }
    >
  >().toEqualTypeOf<{ style: "tower"; times: Xyz }>();
});

test("block json configs have their times completed", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<
      JsonItemConfig<"block", RoomId, RoomItemId>
    >["times"]
  >().toEqualTypeOf<Xyz>();
});

test("floor json configs have their times completed", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<
      JsonItemConfig<"floor", RoomId, RoomItemId>
    >["times"]
  >().toEqualTypeOf<Xyz>();
});

test("conveyor json configs have their times completed", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<
      JsonItemConfig<"conveyor", RoomId, RoomItemId>
    >["times"]
  >().toEqualTypeOf<Xyz>();
});

test("lamp json configs have their times completed", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<
      JsonItemConfig<"lamp", RoomId, RoomItemId>
    >["times"]
  >().toEqualTypeOf<Xyz>();
});

test("json configs without times gain complete times", () => {
  expectTypeOf<
    ConfigWithCompleteTimesRequired<
      JsonItemConfig<"pickup", RoomId, RoomItemId>
    >["times"]
  >().toEqualTypeOf<Xyz>();
});
