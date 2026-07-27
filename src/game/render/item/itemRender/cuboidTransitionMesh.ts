import { Mesh, MeshGeometry, type Texture } from "pixi.js";

import { type UnionOfAllItemInPlayTypes } from "../../../../model/ItemInPlay";
import { addXyz, type Xy, type Xyz } from "../../../../utils/vectors/vectors";
import { projectWorldXyzToScreenXy } from "../../projections";

/**
 * During a rotation each boxy item is drawn as its own little 3D cuboid:
 * its visible box corners are projected through the continuous θ(t) and the
 * item's layer-angle art (captured to a texture) is stretched across the faces.
 * Because every corner is `projectWorldXyzToScreenXy(<shared 3D point>, θ)`, two
 * items that touch at a world corner draw that corner at the identical screen
 * point at every θ - so shared edges stay welded throughout the turn (no seam,
 * no slide).
 *
 * The WHOLE snapshot rectangle is mapped, not just the box's projected
 * silhouette: each face's warp is an affine map (two plane projections
 * composed), and affine maps extend over the whole plane. The three visible
 * faces' shared edges all meet at the near-top corner, so their projections
 * are three rays fanning out from that apex - down (the vertical near edge)
 * and the two top edges. Those rays partition the snapshot rectangle into
 * three sectors, one per face; every pixel rides its sector's face. Adjacent
 * sectors agree exactly along the shared rays (both face planes contain the
 * 3D edge line), so the piecewise map is seamless at every θ. This way art
 * overdrawn outside the box silhouette (ears, tall tile tops...) warps along
 * with its nearest face instead of being cropped, and UVs never leave the
 * texture, so nothing samples - and smears - a clamped edge.
 */
type CornerVector = Xyz;

/**
 * a visible face expressed as an affine basis from the shared apex (the
 * near-top corner): the apex plus the two corners its edges run to. The
 * face's warp at any θ is then `A(θ) + α·(B(θ)-A(θ)) + β·(C(θ)-A(θ))` for
 * per-vertex constants (α, β) found once at the layer angle.
 */
type FaceBasis = {
  b: CornerVector;
  c: CornerVector;
};

/**
 * the three faces of a box visible from a corner-on isometric view: the top
 * (z = high) and the two vertical sides adjacent to the camera-near vertical
 * edge. `nearX`/`nearY` are 0/1 picking which corner is nearest the camera at
 * this angle (from {@link nearCornerOffsetWorldXyz}); the far/back vertical edge
 * is the one hidden behind the box.
 */
const visibleFaces = (nearX: 0 | 1, nearY: 0 | 1): readonly FaceBasis[] => {
  const farX = (1 - nearX) as 0 | 1;
  const farY = (1 - nearY) as 0 | 1;

  return [
    // top face (z = 1): edges from the apex to the two far top corners
    { b: { x: farX, y: nearY, z: 1 }, c: { x: nearX, y: farY, z: 1 } },
    // side face spanning the x axis (at y = nearY): top edge and down edge
    { b: { x: farX, y: nearY, z: 1 }, c: { x: nearX, y: nearY, z: 0 } },
    // side face spanning the y axis (at x = nearX):
    { b: { x: nearX, y: farY, z: 1 }, c: { x: nearX, y: nearY, z: 0 } },
  ];
};

/** the 0/1 corner nearest the camera at this angle (see nearCornerOffsetWorldXyz) */
const nearCornerXy = (cameraAngle: Xy): { nearX: 0 | 1; nearY: 0 | 1 } => ({
  nearX: cameraAngle.x + cameraAngle.y < 0 ? 1 : 0,
  nearY: cameraAngle.x - cameraAngle.y < 0 ? 1 : 0,
});

/**
 * screen offset (from the item origin) of a box corner, projected at `angle`.
 * The box spans `offset` .. `offset + dims` from the item origin (dims/offset are
 * the render box, so the mesh hugs the drawn art rather than the physics aabb).
 */
/** a box corner's world-space position relative to the item origin */
const cornerWorldOffset = (
  cornerVector: CornerVector,
  dims: Xyz,
  offset: Xyz,
): Xyz =>
  addXyz(offset, {
    x: cornerVector.x * dims.x,
    y: cornerVector.y * dims.y,
    z: cornerVector.z * dims.z,
  });

const cornerScreenOffset = (
  cornerVector: CornerVector,
  dims: Xyz,
  offset: Xyz,
  angle: Xy,
): Xy =>
  projectWorldXyzToScreenXy(
    cornerWorldOffset(cornerVector, dims, offset),
    angle,
  );

/**
 * The screen-space bounding box (item-origin-relative) the item's cuboid
 * projects to at `angle` - the min/max over all eight box corners.
 */
export const boxProjectedExtent = (
  dims: Xyz,
  offset: Xyz,
  angle: Xy,
): { min: Xy; max: Xy } => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const x of [0, 1] as const) {
    for (const y of [0, 1] as const) {
      for (const z of [0, 1] as const) {
        const { x: px, y: py } = cornerScreenOffset(
          { x, y, z },
          dims,
          offset,
          angle,
        );
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
      }
    }
  }
  return { min: { x: minX, y: minY }, max: { x: maxX, y: maxY } };
};

/**
 * cut `polygon` (convex, wound either way) by the line through `origin` along
 * `direction`, keeping the side where `keep` lies (Sutherland-Hodgman step)
 */
const clipPolygonToHalfPlane = (
  polygon: Xy[],
  origin: Xy,
  direction: Xy,
  keep: Xy,
): Xy[] => {
  const side = (p: Xy): number =>
    direction.x * (p.y - origin.y) - direction.y * (p.x - origin.x);
  const keepSign = Math.sign(side(keep));

  const out: Xy[] = [];
  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = polygon[(i + 1) % polygon.length];
    const currentSide = side(current) * keepSign;
    const nextSide = side(next) * keepSign;

    if (currentSide >= 0) {
      out.push(current);
    }
    if (
      (currentSide > 0 && nextSide < 0) ||
      (currentSide < 0 && nextSide > 0)
    ) {
      const t = currentSide / (currentSide - nextSide);
      out.push({
        x: current.x + (next.x - current.x) * t,
        y: current.y + (next.y - current.y) * t,
      });
    }
  }
  return out;
};

const normalised = ({ x, y }: Xy): Xy => {
  const length = Math.hypot(x, y);
  return { x: x / length, y: y / length };
};

export type CuboidTransitionMesh = {
  mesh: Mesh;
  /** recompute the face vertices for a new render angle θ(t) */
  update: (cameraAngle: Xy) => void;
};

/**
 * Build a mesh that warps `texture` (a snapshot of the item's art at
 * `layerAngle`) across the item's visible box faces. UVs are fixed from the
 * layer angle - so at θ = layerAngle every face's map is the identity and the
 * mesh reproduces the snapshot pixel-for-pixel - while
 * {@link CuboidTransitionMesh.update} moves the vertices to the θ(t)
 * projection each frame.
 *
 * Vertices are in the item container's local frame (item origin = local 0,0);
 * UVs are normalised into the snapshot texture using the layer-angle projection
 * offset by the snapshot's own bounds origin (`textureOriginOffset` = the item
 * origin's pixel position within the texture). See the module doc: the
 * geometry is the whole snapshot rectangle, partitioned into per-face sectors
 * by the rays fanning out from the near-top corner.
 */
export const createCuboidTransitionMesh = (
  item: UnionOfAllItemInPlayTypes,
  texture: Texture,
  layerAngle: Xy,
  /**
   * the pixel position of the item origin within `texture` - i.e. `-boundsMin`
   * of the snapshotted container (see renderContainerToTexture).
   */
  textureOriginOffset: Xy,
  /** the box the mesh warps, in world px (the item's render box, hugging the art) */
  dims: Xyz,
  /** the box's near corner offset from the item origin, in world px */
  offset: Xyz,
): CuboidTransitionMesh => {
  const { nearX, nearY } = nearCornerXy(layerAngle);
  const apex: CornerVector = { x: nearX, y: nearY, z: 1 };
  // a zero-height box has sides that collapse to lines, so its single top
  // face's affine map carries the whole rectangle; a box with height
  // partitions the rectangle between all three visible faces:
  const usedFaces =
    dims.z > 0 ? visibleFaces(nearX, nearY) : [visibleFaces(nearX, nearY)[0]];

  // the snapshot rectangle in the item's local frame:
  const rect: Xy[] = [
    { x: -textureOriginOffset.x, y: -textureOriginOffset.y },
    { x: texture.width - textureOriginOffset.x, y: -textureOriginOffset.y },
    {
      x: texture.width - textureOriginOffset.x,
      y: texture.height - textureOriginOffset.y,
    },
    { x: -textureOriginOffset.x, y: texture.height - textureOriginOffset.y },
  ];

  const apexAtLayer = cornerScreenOffset(apex, dims, offset, layerAngle);

  // per-face: the polygon of the rectangle-sector it carries, and each
  // vertex's constant (α, β) in the face's affine basis
  const faceIndexOfVertex: number[] = [];
  const alphas: number[] = [];
  const betas: number[] = [];
  const uvList: number[] = [];
  const indexList: number[] = [];

  usedFaces.forEach((face, faceIndex) => {
    const bAtLayer = cornerScreenOffset(face.b, dims, offset, layerAngle);
    const cAtLayer = cornerScreenOffset(face.c, dims, offset, layerAngle);
    const u = { x: bAtLayer.x - apexAtLayer.x, y: bAtLayer.y - apexAtLayer.y };
    const v = { x: cAtLayer.x - apexAtLayer.x, y: cAtLayer.y - apexAtLayer.y };
    const det = u.x * v.y - u.y * v.x;
    if (Math.abs(det) < 1e-9) {
      // the face is edge-on at the layer angle (eg zero-depth boxes) - it
      // carries no pixels:
      return;
    }

    let polygon = rect;
    if (usedFaces.length > 1) {
      // this face's sector: between its two boundary rays (its own basis
      // directions - each is the projection of an edge shared with a
      // neighbouring face). A point safely interior to the sector picks the
      // kept side of each cut:
      const interior = {
        x: apexAtLayer.x + normalised(u).x + normalised(v).x,
        y: apexAtLayer.y + normalised(u).y + normalised(v).y,
      };
      polygon = clipPolygonToHalfPlane(polygon, apexAtLayer, u, interior);
      polygon = clipPolygonToHalfPlane(polygon, apexAtLayer, v, interior);
    }
    if (polygon.length < 3) {
      return;
    }

    const baseVertex = faceIndexOfVertex.length;
    for (const p of polygon) {
      faceIndexOfVertex.push(faceIndex);
      // (α, β) such that p = apex + α·u + β·v, via the inverse basis:
      const px = p.x - apexAtLayer.x;
      const py = p.y - apexAtLayer.y;
      alphas.push((px * v.y - py * v.x) / det);
      betas.push((py * u.x - px * u.y) / det);
      uvList.push(
        (p.x + textureOriginOffset.x) / texture.width,
        (p.y + textureOriginOffset.y) / texture.height,
      );
    }
    // fan-triangulate the (convex) sector polygon:
    for (let i = 1; i < polygon.length - 1; i++) {
      indexList.push(baseVertex, baseVertex + i, baseVertex + i + 1);
    }
  });

  const vertexCount = faceIndexOfVertex.length;
  const positions = new Float32Array(vertexCount * 2);
  const uvs = new Float32Array(uvList);
  const indices = new Uint32Array(indexList);

  const geometry = new MeshGeometry({ positions, uvs, indices });
  // nearest-neighbour sampling keeps the warped 2-colour pixel art crisp (linear
  // filtering would soften every edge, so even an identity warp would differ
  // noticeably from the sprites it replaces):
  texture.source.scaleMode = "nearest";
  const mesh = new Mesh({ geometry, texture });
  mesh.label = `cuboidTransitionMesh ${item.id}`;

  const positionBuffer = geometry.getBuffer("aPosition");

  // update() runs per warping item per frame, so it works entirely in
  // per-mesh scalar scratch - no objects are allocated. The world-space
  // corner coordinates are fixed for the mesh's life; only the rotation
  // (then the fixed 2:1 projection) changes with the camera angle:
  const faceCount = usedFaces.length;
  /** apex and per-face b/c corners in world space: [x, y, z] each */
  const apexWorld = new Float64Array(3);
  {
    const apexOffset = cornerWorldOffset(apex, dims, offset);
    apexWorld[0] = apexOffset.x;
    apexWorld[1] = apexOffset.y;
    apexWorld[2] = apexOffset.z;
  }
  /** per face: bX, bY, bZ, cX, cY, cZ */
  const faceWorlds = new Float64Array(faceCount * 6);
  usedFaces.forEach((face, f) => {
    const bOffset = cornerWorldOffset(face.b, dims, offset);
    const cOffset = cornerWorldOffset(face.c, dims, offset);
    const o = f * 6;
    faceWorlds[o] = bOffset.x;
    faceWorlds[o + 1] = bOffset.y;
    faceWorlds[o + 2] = bOffset.z;
    faceWorlds[o + 3] = cOffset.x;
    faceWorlds[o + 4] = cOffset.y;
    faceWorlds[o + 5] = cOffset.z;
  });
  /** per-update scratch, per face: ux, uy, vx, vy */
  const faceBases = new Float64Array(faceCount * 4);

  const update = (cameraAngle: Xy) => {
    const { x: cos, y: sin } = cameraAngle;
    // rotate about z then project (screenX = ry − rx, screenY = −(rx+ry)/2 − z):
    const apexRx = cos * apexWorld[0] - sin * apexWorld[1];
    const apexRy = sin * apexWorld[0] + cos * apexWorld[1];
    const apexScreenX = apexRy - apexRx;
    const apexScreenY = -(apexRx + apexRy) / 2 - apexWorld[2];

    for (let f = 0; f < faceCount; f++) {
      const o = f * 6;
      const bRx = cos * faceWorlds[o] - sin * faceWorlds[o + 1];
      const bRy = sin * faceWorlds[o] + cos * faceWorlds[o + 1];
      const cRx = cos * faceWorlds[o + 3] - sin * faceWorlds[o + 4];
      const cRy = sin * faceWorlds[o + 3] + cos * faceWorlds[o + 4];
      const b = f * 4;
      faceBases[b] = bRy - bRx - apexScreenX;
      faceBases[b + 1] = -(bRx + bRy) / 2 - faceWorlds[o + 2] - apexScreenY;
      faceBases[b + 2] = cRy - cRx - apexScreenX;
      faceBases[b + 3] = -(cRx + cRy) / 2 - faceWorlds[o + 5] - apexScreenY;
    }

    for (let i = 0; i < vertexCount; i++) {
      const b = faceIndexOfVertex[i] * 4;
      const alpha = alphas[i];
      const beta = betas[i];
      positions[i * 2] =
        apexScreenX + alpha * faceBases[b] + beta * faceBases[b + 2];
      positions[i * 2 + 1] =
        apexScreenY + alpha * faceBases[b + 1] + beta * faceBases[b + 3];
    }
    positionBuffer.update();
  };

  update(layerAngle);

  return { mesh, update };
};
