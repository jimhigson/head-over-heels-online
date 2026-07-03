import { readFileSync } from "node:fs";
const buf = readFileSync("gfx/sprites.iff");
if (
  buf.toString("latin1", 0, 4) !== "FORM" ||
  buf.toString("latin1", 8, 12) !== "ILBM"
)
  throw new Error("not ILBM");
let p = 12;
const chunks = [];
while (p < buf.length) {
  const id = buf.toString("latin1", p, p + 4);
  const size = buf.readUInt32BE(p + 4);
  chunks.push({ id, off: p + 8, size });
  p += 8 + size + (size & 1);
}
console.log("chunks:", chunks.map((c) => `${c.id}(${c.size})`).join(" "));
const bmhd = chunks.find((c) => c.id === "BMHD");
const o = bmhd.off;
const b = {
  w: buf.readUInt16BE(o),
  h: buf.readUInt16BE(o + 2),
  nPlanes: buf.readUInt8(o + 8),
  masking: buf.readUInt8(o + 9),
  compression: buf.readUInt8(o + 10),
  transparent: buf.readUInt16BE(o + 12),
};
console.log("BMHD:", JSON.stringify(b));
const cmap = chunks.find((c) => c.id === "CMAP");
console.log("CMAP colours:", cmap.size / 3);
