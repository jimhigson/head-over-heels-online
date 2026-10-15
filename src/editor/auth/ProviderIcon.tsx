import { type Provider } from "@supabase/supabase-js";

import {
  nerdFontAppleChar,
  nerdFontDiscordChar,
  nerdFontGithubChar,
  nerdFontGoogleChar,
  nerdFontTwitchChar,
} from "../../sprites/spritesheet/spritesheetData/hudChars";

const providerIcons: Partial<Record<Provider, string>> = {
  apple: nerdFontAppleChar,
  discord: nerdFontDiscordChar,
  github: nerdFontGithubChar,
  google: nerdFontGoogleChar,
  twitch: nerdFontTwitchChar,
};

export type ProviderIconProps = {
  provider: Provider;
  class?: string;
};

/** the icon of a login service */
export const ProviderIcon = ({
  provider,
  class: className,
}: ProviderIconProps) => {
  const icon = providerIcons[provider];
  if (icon === undefined) {
    return <span class="w-1" />;
  }
  return <span class={className}>{icon}</span>;
};
