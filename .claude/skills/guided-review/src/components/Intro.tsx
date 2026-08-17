import { images, meta, server, stats, total } from "../payload.ts";

export const Intro = () => {
  const [added, removed] = Object.values(stats).reduce(
    ([totalAdded, totalRemoved], [fileAdded, fileRemoved]) => [
      totalAdded + fileAdded,
      totalRemoved + fileRemoved,
    ],
    [0, 0],
  );
  const imageCount = Object.keys(images).length;
  const facts = [
    `${total} files`,
    ...(imageCount > 0 ? [`${imageCount} image${imageCount === 1 ? "" : "s"}`] : []),
    `+${added} −${removed} lines`,
    ...(meta.facts ?? []),
  ];

  return (
    <section class="intro">
      <p class="eyebrow">{meta.eyebrow ?? "reading order"}</p>
      <h1>{meta.title}</h1>
      <p class="lede" dangerouslySetInnerHTML={{ __html: meta.lede ?? "" }} />
      <ul class="facts">
        {facts.map((fact, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: fact }} />
        ))}
      </ul>
      {server === undefined && (
        <div class="callout">
          <strong>Read-only build.</strong> This review is not served, so there is no live agent
          behind this page — leaving in-page notes and chatting back are not possible here. Read and
          tick through; to send feedback, paste it into your chat with the agent.
        </div>
      )}
    </section>
  );
};
