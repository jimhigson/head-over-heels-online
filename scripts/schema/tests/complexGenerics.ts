/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
type ConfigMap<ItemId extends string> = Record<
  ItemId,
  {
    type: string;
    config: any;
  }
>;
type MyConfig = ConfigMap<string>;
