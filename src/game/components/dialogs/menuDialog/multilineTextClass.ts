export const multilineTextClass =
  // leading-none removes any residual line-height from the text layout engine
  // bottom margin on all char sprites spaces the text out
  // 1px keeps (almost) strictly on the grid for upper-case chars
  // 3px allows hanging chars (g,y,j etc) to not dangle into the line below
  "leading-none [--line-gap:1px] [&_[class*='texture-hud']]:mb-[calc(var(--scale)*var(--line-gap))]";
