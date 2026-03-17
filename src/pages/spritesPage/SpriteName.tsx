export type SpriteNameProps = { name: string };

export const SpriteName = ({ name }: SpriteNameProps) => (
  <div className="text-moss zx:text-zxYellow mt-1 flex-wrap flex-row flex">
    {name.split(/(\.)/).map((frag, i) => (
      <span key={i}>{frag}</span>
    ))}
  </div>
);
