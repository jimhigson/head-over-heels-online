#version 300 es
precision highp float;

/*
 * Experimental two-pass art-aware variant of cleanEdge (scale mode, with 2:1
 * slopes), based on torcado's original: https://torcado.com/cleanEdge/
 * (gist: https://gist.github.com/torcado194/e2794f5a4b22049ac0a41f972d14c329)
 *
 * The variant exploits this game's art being black linework whose white fills
 * were colourised. Two cleanEdge passes share one set of samples:
 *
 * - pass A decides geometry purely on the transparent/black/colour
 *   distinction, so lines and silhouettes keep cleanEdge's crisp 45-degree
 *   and 2:1 slopes;
 * - pass B re-runs cleanEdge with real colour distances to resolve each
 *   fill pixel. It reads the linework by its stand-in colours, each black
 *   pixel as the fill nearest it (upscaleStandIn.frag), so the shading is
 *   resolved as regions that run on beneath the lines; transparent samples
 *   and black pixels with no fill near abstain (no edges, no priority, never
 *   the resolved colour) - so fills keep crisp palette-preserving colour
 *   boundaries, with no mixing/blurring.
 *
 * Each slice line is fitted to the runs the art actually has, rather than to
 * a fixed 45-degree or 2:1 slope as the original's cases assume: the line
 * joins the centres of the two runs meeting at the corner, whatever their
 * lengths. The fixed slopes fall out of that (runs of 1 and 1 give the 45
 * line, 2 and 2 the 2:1 one), 3:1 and shallower come for free, and a run of
 * one length meeting a run of another - which is all a pixel-art curve is -
 * gets a line between the two rather than a step from one fixed slope to the
 * next. The original's transition cleanups are gone with them: they existed
 * only to soften the step from one fixed slope to the next, and there is no
 * longer a step to soften.
 *
 * Pass A also reads the linework as strokes standing on solid black
 * bodies: a one-pixel black tip in the fill keeps the square notch beside
 * it rather than being rounded into the body it stands on, and a run
 * measured along a black body's edge stops short of such a tip, so the two
 * are smoothed as the separate things they are.
 *
 * A strip - a straight run of one to three black pixels, one pixel thick,
 * with no black beside it - is a dot, an eye or a dash the artist sized,
 * and is not sliced: it is drawn as a lozenge of the strip's own area.
 *
 * An arc - runs that lengthen steadily either side of a 45 degree middle,
 * found by the arc passes (upscaleArcAnchors.frag and the two after it) - is
 * not sliced either: its pixels, and those beside it, are drawn to the
 * ellipse fitted through its runs - black outlines' arcs first, then those
 * of the coloured outlines dark items have.
 *
 * This form is BRANCHLESS: the original's booleans are exact 0/1 float
 * masks and its if/else chains are mix()/step() selections, so the whole
 * shader is straight-line code (kind to slow shader compilers, eg
 * SwiftShader). Output is validated pixel-identical to the branching form
 * by the smoothSprites e2e snapshot.
 *
 * MIT LICENSE
 * Copyright (c) 2022 torcado
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

// how dark (relative to alpha, since the art is premultiplied) a pixel must
// be to count as the black linework rather than a colourised fill
const float blackThreshold = 0.1;

const vec3 highestColor = vec3(1.0, 1.0, 1.0);

// 1.0 when a < b (strictly), else 0.0
float lt(float a, float b){
	return 1.0 - step(b, a);
}

// classify a sample: 0 = transparent, 1 = black linework, 2 = colourised fill
float classOf(vec4 col){
	return step(0.5, col.a) * (1.0 + step(blackThreshold * col.a, max(col.r, max(col.g, col.b))));
}

// ---- pass A masks: similarity is class equality

float simA(vec4 col1, vec4 col2){
	return step(abs(classOf(col1) - classOf(col2)), 0.5);
}

float sim3A(vec4 col1, vec4 col2, vec4 col3){
	return simA(col1, col2) * simA(col2, col3);
}

float sim4A(vec4 col1, vec4 col2, vec4 col3, vec4 col4){
	return simA(col1, col2) * simA(col2, col3) * simA(col3, col4);
}

float higherA(vec4 thisCol, vec4 otherCol){
	return step(0.5, classOf(thisCol) - classOf(otherCol));
}

//color distance: binary, on the art classes
float cdA(vec4 col1, vec4 col2){
	return 1.0 - simA(col1, col2);
}

// 1.0 for the black linework
float strokeA(vec4 col){
	return step(0.5, classOf(col)) * (1.0 - step(1.5, classOf(col)));
}

vec4 pickA(vec4 ref, vec4 a, vec4 b){
	return mix(b, a, step(cdA(ref, a), cdA(ref, b)));
}

// ---- pass B masks: colour distances, in which black and transparent
// pixels abstain - they form no edges, never win priority, and can never
// be the resolved colour

float isC(vec4 col){
	return step(1.5, classOf(col));
}

float eqC(vec4 col1, vec4 col2){
	return step(distance(col1, col2), 0.0);
}

float simB(vec4 col1, vec4 col2){
	return max(1.0 - isC(col1) * isC(col2), eqC(col1, col2));
}

float sim3B(vec4 col1, vec4 col2, vec4 col3){
	return simB(col1, col2) * simB(col2, col3);
}

float sim4B(vec4 col1, vec4 col2, vec4 col3, vec4 col4){
	return simB(col1, col2) * simB(col2, col3) * simB(col3, col4);
}

float higherB(vec4 thisCol, vec4 otherCol){
	return isC(thisCol) * mix(
		1.0,
		(1.0 - eqC(thisCol, otherCol)) * lt(distance(thisCol.rgb, highestColor), distance(otherCol.rgb, highestColor)),
		isC(otherCol));
}

//color distance, with abstention
float cdB(vec4 col1, vec4 col2){
	return isC(col1) * isC(col2) * distance(col1.rgba, col2.rgba);
}

//one step of a measured run, for pass B. simB abstains - a black or
//transparent sample counts as similar to anything - which is right for
//deciding edges but would let a run count straight through the linework, so
//a step only counts between two real fills of the same colour
float runStepB(vec4 pixel, vec4 ref){
	return isC(pixel) * isC(ref) * eqC(pixel, ref);
}

//slice colour choice preferring real fill colours; sentinel when neither qualifies
vec4 pickB(vec4 ref, vec4 a, vec4 b){
	return mix(
		mix(vec4(-1.0), b, isC(b)),
		mix(a, mix(b, a, step(cdB(ref, a), cdB(ref, b))), isC(b)),
		isC(a));
}

float distToLine(vec2 testPt, vec2 pt1, vec2 pt2, vec2 dir){
  vec2 lineDir = pt2 - pt1;
  vec2 perpDir = vec2(lineDir.y, -lineDir.x);
  vec2 dirToPt1 = pt1 - testPt;
  return (dot(perpDir, dir) > 0.0 ? 1.0 : -1.0) * (dot(normalize(perpDir), dirToPt1));
}

vec4 srcAt(vec2 px){
	return texture(uTexture, px / uSheetSize);
}

// the resolved crossings of the sheet's 2x2 cells, one texel per cell at its
// top-left pixel, as upscaleGraph.frag encodes them
uniform sampler2D uGraph;

// the graph's verdict on the cell holding `cellC` and its forward, down and
// diagonal neighbours in a slice frame: 1.0 where f and d connect (so c's
// corner is sliced), 0.0 where c and df connect or neither does, and -1.0
// where the cell is no crossing, or is one the graph left unresolved, and
// the local distances decide
float crossingVerdict(vec2 cellC, vec2 dirVec, float layerB){
	vec2 tl = cellC + min(dirVec, vec2(0.0));
	vec4 graph = texture(uGraph, tl / uSheetSize);
	float code = mix(graph.r, graph.g, layerB);
	float isCrossing = step(0.375, code);
	float tlBrConnects = step(0.375, code) * (1.0 - step(0.625, code));
	float trBlConnects = step(0.625, code) * (1.0 - step(0.875, code));
	// f and d connect when the connected diagonal is the one c-df is not
	float cDfIsTlBr = step(0.0, dirVec.x * dirVec.y);
	float fdConnects = mix(tlBrConnects, trBlConnects, cDfIsTlBr);
	return mix(-1.0, fdConnects, isCrossing);
}

// every pixel's stand-in colour for the colour pass, as upscaleStandIn.frag
// gives it: a fill itself, a black pixel of the linework the fill nearest it
uniform sampler2D uStandIn;

vec4 standInAt(vec2 px){
	return texture(uStandIn, px / uSheetSize);
}

// ---- strips: a dot, an eye, a dash. A straight run of one to three black
// pixels, one pixel thick, that is the whole of its black by side - black
// may touch one of its corners, so long as that is a line crossing its
// path and not the next step of a slope - is a thing the artist sized
// rather than an edge to fit a slope to: the slices would round it down to
// less. It is drawn instead as a lozenge of the strip's own area - the
// strip's rectangle let out a little all round, with its corners cut at 45
// degrees

// how far along each edge a lozenge's corners are cut: half a pixel, so the
// ends of a one-pixel strip come to a point
const float lozengeCut = 0.5;

float blackAt(vec2 p){
	return strokeA(srcAt(p));
}

// how far the black runs on from p along `along`, up to three
float runOut(vec2 p, vec2 along){
	float s1 = blackAt(p + along);
	float s2 = s1 * blackAt(p + along * 2.0);
	float s3 = s2 * blackAt(p + along * 3.0);
	return s1 + s2 + s3;
}

// 1.0 where no pixel of the run through p - l pixels before it and r after,
// along `along` - has black beside it across the run
float clearAcross(vec2 p, vec2 along, vec2 across, float l, float r){
	float clear = 1.0;
	for (int k = -2; k <= 2; k++){
		float kf = float(k);
		float inRun = step(-l - 0.5, kf) * step(kf, r + 0.5);
		vec2 q = p + along * kf;
		clear *= 1.0 - inRun * max(blackAt(q + across), blackAt(q - across));
	}
	return clear;
}

// 1.0 where the pixel at q carries a slope on from a run it touches corner
// to corner: black, with no black beside it across the run. A pixel with
// black beside it is a line crossing the run's path, not the next step of
// the same slope
float stepAt(vec2 q, vec2 across){
	return blackAt(q) * (1.0 - max(blackAt(q + across), blackAt(q - across)));
}

// 1.0 where the run through p - l pixels before it and r after, along
// `along` - may be a strip for what touches its end corners: black at no
// more than one of them (a dot amid a chequer, or a dash bridging two lines,
// is part of a texture, not a thing on its own), and that not carrying a
// slope on from it - a 45 degree line, or the runs of a 2:1 one, touch
// corner to corner and are a line to fit slices to
float cornersClear(vec2 p, vec2 along, vec2 across, float l, float r){
	vec2 c1 = p - along * (l + 1.0) + across;
	vec2 c2 = p - along * (l + 1.0) - across;
	vec2 c3 = p + along * (r + 1.0) + across;
	vec2 c4 = p + along * (r + 1.0) - across;
	float contacts = blackAt(c1) + blackAt(c2) + blackAt(c3) + blackAt(c4);
	float steps = stepAt(c1, across) + stepAt(c2, across) + stepAt(c3, across) + stepAt(c4, across);
	return step(contacts, 1.5) * (1.0 - step(0.5, steps));
}

// the strip p is a pixel of, if any: x = 1.0 for a strip, y = its length,
// z = how many of its pixels come before p, w = 1.0 when it runs along x
// (a lone pixel is a strip along either axis and is taken along x)
vec4 stripAt(vec2 p){
	float own = blackAt(p);
	vec2 xAxis = vec2(1.0, 0.0);
	vec2 yAxis = vec2(0.0, 1.0);
	float lx = runOut(p, -xAxis);
	float rx = runOut(p,  xAxis);
	float nx = lx + 1.0 + rx;
	float alongX = own * step(nx, 3.0) * clearAcross(p, xAxis, yAxis, lx, rx) * cornersClear(p, xAxis, yAxis, lx, rx);
	float ly = runOut(p, -yAxis);
	float ry = runOut(p,  yAxis);
	float ny = ly + 1.0 + ry;
	float alongY = own * step(ny, 3.0) * clearAcross(p, yAxis, xAxis, ly, ry) * cornersClear(p, yAxis, xAxis, ly, ry);
	return vec4(max(alongX, alongY), mix(ny, nx, alongX), mix(ly, lx, alongX), alongX);
}

// 1.0 where the point (in pixel units) lies inside the lozenge of the strip
// p is a pixel of
float inLozenge(vec2 point, vec2 p, vec4 strip){
	vec2 along = mix(vec2(0.0, 1.0), vec2(1.0, 0.0), strip.w);
	vec2 across = along.yx;
	float n = strip.y;
	vec2 centre = p + along * ((n - 1.0) * 0.5 - strip.z);
	// let out so that, with the corners cut, the lozenge has the strip's area
	float e = (sqrt((n + 1.0) * (n + 1.0) + 8.0 * lozengeCut * lozengeCut) - (n + 1.0)) * 0.25;
	float a = n * 0.5 + e;
	float b = 0.5 + e;
	float u = abs(dot(point - centre, along));
	float v = abs(dot(point - centre, across));
	return strip.x * step(u, a) * step(v, b) * step(lozengeCut, (a - u) + (b - v));
}

// the fill a lozenge's cut corner shows: a real fill beside it by
// preference, else whatever is there (transparent, at the silhouette)
vec4 cornerFill(vec4 side1, vec4 side2){
	return mix(mix(side2, side1, isC(side1)), side1, 1.0 - max(isC(side1), isC(side2)));
}

// ---- arcs: a pixel that upscaleArcSpread.frag found on an arc, or beside
// one, is drawn to the arc's ellipse rather than sliced: within half a pixel
// of the ellipse it takes the line's colour, as the slices draw a line about
// its runs' centres, and beyond that band the colour of that side

uniform sampler2D uArcs;
// each black arc's ellipse, at its anchor: its centre, then its semi-axes
uniform sampler2D uArcCentres;
uniform sampler2D uArcAxes;

// half the width of the band an arc draws about its ellipse
const float arcHalfWidth = 0.5;

const vec4 arcBlack = vec4(0.0, 0.0, 0.0, 1.0);

// the flags upscaleArcs.frag and upscaleArcSpread.frag give a pixel
float arcFlags(vec4 arc){
	return floor(arc.b * 255.0 + 0.5);
}

// 1.0 where the pixel is drawn to an arc's ellipse
float arcDrawn(vec4 arc){
	return step(2.5, mod(arcFlags(arc), 4.0));
}

vec2 unpackWords(vec4 texel){
	vec4 bytes = floor(texel * 255.0 + 0.5);
	return (bytes.xz * 256.0 + bytes.yw) / 256.0;
}

// where a fragment is from an arc's ellipse: x is its signed distance (out
// from the centre positive), yz the direction across the band away from it
vec3 fromArc(vec2 px, vec2 local, vec4 arc, sampler2D centres, sampler2D axesAt){
	vec2 anchor = px + floor(arc.rg * 255.0 + 0.5) - 128.0;
	vec2 centre = anchor + unpackWords(texture(centres, anchor / uSheetSize)) - 128.0;
	vec2 axes = unpackWords(texture(axesAt, anchor / uSheetSize));
	vec2 fromCentre = (px - 0.5 + local) - centre;
	vec2 scaled = fromCentre / (axes * axes);
	float level = dot(fromCentre, scaled) - 1.0;
	vec2 gradient = 2.0 * scaled;
	float signedDistance = level / length(gradient);
	return vec3(signedDistance, gradient * sign(signedDistance));
}

// the pixel beside a fragment's own on the side away points to: across the
// side it points at more
vec2 sideOf(vec2 away){
	float acrossX = step(abs(away.y), abs(away.x));
	return mix(vec2(0.0, sign(away.y)), vec2(sign(away.x), 0.0), acrossX);
}

// the colour a fragment of a pixel drawn to a black outline's arc takes:
// black in the band, else the pixel's own colour - or, for a black pixel,
// the colour of the pixel beside it on the band's far side
vec4 arcColour(vec2 px, vec2 local, vec4 c, vec4 arc){
	vec3 where = fromArc(px, local, arc, uArcCentres, uArcAxes);
	float inBand = step(abs(where.x), arcHalfWidth);
	vec4 beyond = mix(c, srcAt(px + sideOf(where.yz)), strokeA(c));
	return mix(beyond, arcBlack, inBand);
}

// arcs of a dark item's coloured outline, drawn after the black ones: the
// band takes the outline's colour - its own pixels' own, any other pixel
// that of the outline pixel beside it toward the band - and beyond the band
// an outline pixel shows the pixel beside it on that side, while any other
// keeps what it had. A layered arc - a coloured line between two black
// ones - draws all three from the one ellipse: black for a band either
// side of the coloured one, and beyond those what lies past them

uniform sampler2D uColourArcs;
uniform sampler2D uColourArcCentres;
uniform sampler2D uColourArcAxes;

vec4 colourArcColour(vec2 px, vec2 local, vec4 c, vec4 arc, vec4 under){
	vec3 where = fromArc(px, local, arc, uColourArcCentres, uColourArcAxes);
	float flags = arcFlags(arc);
	float layered = mod(floor(flags / 4.0), 2.0);
	float takenIn = step(7.5, flags);
	float inBand = step(abs(where.x), arcHalfWidth);
	float inLayers = step(abs(where.x), 3.0 * arcHalfWidth) * layered;
	vec2 away = where.yz;
	vec2 sideX = vec2(sign(away.x), 0.0);
	vec2 sideY = vec2(0.0, sign(away.y));
	vec2 side = sideOf(away);
	vec2 otherSide = sideX + sideY - side;
	// the outline pixel beside this one toward the band: across the nearer
	// side first, then the other, then the corner
	vec4 towardFirst = srcAt(px - side);
	vec4 towardSecond = srcAt(px - otherSide);
	vec4 towardCorner = srcAt(px - sideX - sideY);
	vec4 toward = mix(mix(towardCorner, towardSecond, isC(towardSecond)), towardFirst, isC(towardFirst));
	float ownOutline = isC(c) * (1.0 - takenIn);
	vec4 bandColour = mix(toward, c, ownOutline);
	// a pixel taken in beyond the black layers takes black only where the
	// pixel in from it is the layer itself: a band passing through empty
	// space, with no black beside it, is the ellipse straying from the art
	inLayers *= mix(1.0, strokeA(towardFirst), takenIn * (1.0 - strokeA(c)));
	vec4 beside = srcAt(px + side);
	// past the black layer beside an outline pixel, in a layered arc
	vec4 besideLayer = mix(beside, srcAt(px + 2.0 * side), strokeA(beside));
	vec4 beyondPlain = mix(under, beside, ownOutline);
	vec4 beyondLayered = mix(mix(c, beside, strokeA(c)), besideLayer, ownOutline);
	vec4 beyond = mix(beyondPlain, beyondLayered, layered);
	return mix(mix(beyond, arcBlack, inLayers), bandColour, inBand);
}

// a neighbour of the pixel being sliced, in that slice's own frame: which
// quadrant of the pixel the fragment sits in, and the slice's mirroring, are
// both folded into dirVec, so every case reads as though looking down-forward
#define AT(dx, dy) srcAt(px + vec2(dx, dy) * dirVec)
// the same neighbour by its stand-in colour, for the colour pass
#define ATB(dx, dy) standInAt(px + vec2(dx, dy) * dirVec)

//based on down-forward direction; branchless: all five slant cases evaluate,
//an exclusive mask chain reproduces the original's else-if priority
vec4 sliceDistA(vec2 point, vec2 mainDir, vec2 pointDir, vec2 px, float strip){
	vec2 dirVec = pointDir * mainDir;
	point = mainDir * (point - 0.5) + 0.5; //flip point
	vec2 center = vec2(0.5, 0.5);

	//neighbor pixels, Up/Down/Forward/Back of this slice's frame
	vec4 ub  = AT(-1.0,-1.0);
	vec4 u   = AT( 0.0,-1.0);
	vec4 uf  = AT( 1.0,-1.0);
	vec4 uff = AT( 2.0,-1.0);
	vec4 b   = AT(-1.0, 0.0);
	vec4 c   = AT( 0.0, 0.0);
	vec4 f   = AT( 1.0, 0.0);
	vec4 ff  = AT( 2.0, 0.0);
	vec4 db  = AT(-1.0, 1.0);
	vec4 d   = AT( 0.0, 1.0);
	vec4 df  = AT( 1.0, 1.0);
	vec4 dff = AT( 2.0, 1.0);
	vec4 ddb = AT(-1.0, 2.0);
	vec4 dd  = AT( 0.0, 2.0);
	vec4 ddf = AT( 1.0, 2.0);

	//edge detection
	float distAgainst = 4.0*cdA(f,d) + cdA(uf,c) + cdA(c,db) + cdA(ff,df) + cdA(df,dd);
	float distTowards = 4.0*cdA(c,df) + cdA(u,f) + cdA(f,dff) + cdA(b,d) + cdA(d,ddf);
	float sliceM = max(
		lt(distAgainst, distTowards),
		//equivalent edges edge case:
		lt(distAgainst, distTowards + 0.001) * (1.0 - higherA(c, f)));
	//Checkerboard edge case: slicing a checkerboard turns it to mush, so it is
	//left alone. A lone pixel in a field matches that test too - its neighbours
	//are all alike and all unlike it - but a checkerboard carries on, its own
	//class recurring two away, where a lone pixel's does not. Only the pattern
	//that carries on is left unsliced; the lone pixel is rounded off like any
	//other corner.
	float chequerContinues = max(simA(c, ff), simA(c, dd));
	sliceM *= 1.0 - sim4A(f, d, b, u) * sim4A(uf, df, db, ub) * (1.0 - simA(c, f))
		* chequerContinues;

	//a crossing cell is settled by the graph pass, not the local distances:
	//c's own cell for the near cases, f's and d's for the far corners
	float crossC = crossingVerdict(px, dirVec, 0.0);
	float crossF = crossingVerdict(px + vec2(1.0, 0.0) * dirVec, dirVec, 0.0);
	float crossD = crossingVerdict(px + vec2(0.0, 1.0) * dirVec, dirVec, 0.0);
	float sliceC = mix(sliceM, crossC, step(0.0, crossC));
	float sliceF = mix(sliceM, crossF, step(0.0, crossF));
	float sliceD = mix(sliceM, crossD, step(0.0, crossD));

	//the slant cases the original tests in an else-if chain, as
	//priority-exclusive masks: each claims the fragment only where no
	//earlier one did
	float m1 = sim3A(f, d, db) * (1.0 - sim3A(f, d, b)) * (1.0 - simA(uf, db)); //lower shallow slant
	float m2 = sim3A(uf, f, d) * (1.0 - sim3A(u, f, d)) * (1.0 - simA(uf, db)); //forward steep slant
	float m3 = simA(f, d); //45 diagonal
	float m4 = sim3A(ff, df, d) * (1.0 - sim3A(ff, df, c)) * (1.0 - simA(uff, d)); //far corner of shallow slant
	float m5 = sim3A(f, df, dd) * (1.0 - sim3A(c, df, dd)) * (1.0 - simA(f, ddb)); //far corner of steep slant
	float free = 1.0;
	float e1 = m1 * free; free *= 1.0 - e1;
	float e2 = m2 * free; free *= 1.0 - e2;
	float e3 = m3 * free; free *= 1.0 - e3;
	float e4 = m4 * free; free *= 1.0 - e4;
	float e5 = m5 * free;

	//How long the runs meeting at this corner are, up to four. A run carries
	//on while its pixels keep matching the one it started from and the pixels
	//alongside keep matching c - that is, while the edge stays straight. A
	//run along a solid black body's edge - its first two pixels and the two
	//behind them a block of black - stops short of a tip: a pixel of its own
	//with fill alongside, beyond and behind, which is a stroke standing on
	//the body, not the body's edge, so the slice is fitted to the body alone
	float solidF = strokeA(f) * sim4A(f, ff, df, dff);
	float solidD = strokeA(d) * sim4A(d, dd, df, ddf);
	float tipF2 = isC(AT(2.0, 1.0)) * isC(AT(3.0, 0.0)) * isC(AT(3.0, 1.0)) * isC(AT(3.0,-1.0));
	float tipF3 = isC(AT(3.0, 1.0)) * isC(AT(4.0, 0.0)) * isC(AT(4.0, 1.0)) * isC(AT(4.0,-1.0));
	float tipF4 = isC(AT(4.0, 1.0)) * isC(AT(5.0, 0.0)) * isC(AT(5.0, 1.0)) * isC(AT(5.0,-1.0));
	float fw1 = simA(AT(1.0, 0.0), f) * simA(AT(1.0,-1.0), c);
	float fw2 = fw1 * simA(AT(2.0, 0.0), f) * simA(AT(2.0,-1.0), c) * (1.0 - solidF * tipF2);
	float fw3 = fw2 * simA(AT(3.0, 0.0), f) * simA(AT(3.0,-1.0), c) * (1.0 - solidF * tipF3);
	float fw4 = fw3 * simA(AT(4.0, 0.0), f) * simA(AT(4.0,-1.0), c) * (1.0 - solidF * tipF4);
	float runF = max(1.0, fw1 + fw2 + fw3 + fw4);

	float tipB2 = isC(AT(-1.0, 2.0)) * isC(AT(-2.0, 1.0)) * isC(AT(-2.0, 2.0)) * isC(AT(-2.0, 0.0));
	float tipB3 = isC(AT(-2.0, 2.0)) * isC(AT(-3.0, 1.0)) * isC(AT(-3.0, 2.0)) * isC(AT(-3.0, 0.0));
	float tipB4 = isC(AT(-3.0, 2.0)) * isC(AT(-4.0, 1.0)) * isC(AT(-4.0, 2.0)) * isC(AT(-4.0, 0.0));
	float bk1 = simA(AT( 0.0, 1.0), d) * simA(AT( 0.0, 0.0), c);
	float bk2 = bk1 * simA(AT(-1.0, 1.0), d) * simA(AT(-1.0, 0.0), c) * (1.0 - solidD * tipB2);
	float bk3 = bk2 * simA(AT(-2.0, 1.0), d) * simA(AT(-2.0, 0.0), c) * (1.0 - solidD * tipB3);
	float bk4 = bk3 * simA(AT(-3.0, 1.0), d) * simA(AT(-3.0, 0.0), c) * (1.0 - solidD * tipB4);
	float runB = max(1.0, bk1 + bk2 + bk3 + bk4);

	float tipD2 = isC(AT(1.0, 2.0)) * isC(AT(0.0, 3.0)) * isC(AT(1.0, 3.0)) * isC(AT(-1.0, 3.0));
	float tipD3 = isC(AT(1.0, 3.0)) * isC(AT(0.0, 4.0)) * isC(AT(1.0, 4.0)) * isC(AT(-1.0, 4.0));
	float tipD4 = isC(AT(1.0, 4.0)) * isC(AT(0.0, 5.0)) * isC(AT(1.0, 5.0)) * isC(AT(-1.0, 5.0));
	float dn1 = simA(AT(0.0, 1.0), d) * simA(AT(-1.0, 1.0), c);
	float dn2 = dn1 * simA(AT(0.0, 2.0), d) * simA(AT(-1.0, 2.0), c) * (1.0 - solidD * tipD2);
	float dn3 = dn2 * simA(AT(0.0, 3.0), d) * simA(AT(-1.0, 3.0), c) * (1.0 - solidD * tipD3);
	float dn4 = dn3 * simA(AT(0.0, 4.0), d) * simA(AT(-1.0, 4.0), c) * (1.0 - solidD * tipD4);
	float runD = max(1.0, dn1 + dn2 + dn3 + dn4);

	float tipU2 = isC(AT(2.0,-1.0)) * isC(AT(1.0,-2.0)) * isC(AT(2.0,-2.0)) * isC(AT(0.0,-2.0));
	float tipU3 = isC(AT(2.0,-2.0)) * isC(AT(1.0,-3.0)) * isC(AT(2.0,-3.0)) * isC(AT(0.0,-3.0));
	float tipU4 = isC(AT(2.0,-3.0)) * isC(AT(1.0,-4.0)) * isC(AT(2.0,-4.0)) * isC(AT(0.0,-4.0));
	float rise1 = simA(AT(1.0, 0.0), f) * simA(AT(0.0, 0.0), c);
	float rise2 = rise1 * simA(AT(1.0,-1.0), f) * simA(AT(0.0,-1.0), c) * (1.0 - solidF * tipU2);
	float rise3 = rise2 * simA(AT(1.0,-2.0), f) * simA(AT(0.0,-2.0), c) * (1.0 - solidF * tipU3);
	float rise4 = rise3 * simA(AT(1.0,-3.0), f) * simA(AT(0.0,-3.0), c) * (1.0 - solidF * tipU4);
	float runU = max(1.0, rise1 + rise2 + rise3 + rise4);

	//A corner joining a long run to a short one is a corner, not a slope: left
	//to itself the line would swing most of the way to horizontal and slice
	//well away from where the case that found this corner expects it, which in
	//detailed art reads as noise. Neither end may lead the other by more than
	//one pixel, so the line still bends through a curve but never bolts.
	float shF = min(runF, runB + 1.0);
	float shB = min(runB, runF + 1.0);
	float stU = min(runU, runD + 1.0);
	float stD = min(runD, runU + 1.0);

	//the line through the centres of the two runs each corner joins
	vec2 sh1 = vec2(( 1.0 + shF) * 0.5, 0.0);
	vec2 sh2 = vec2(-(shB - 1.0) * 0.5, 1.0);
	vec2 st1 = vec2(1.0, -(stU - 1.0) * 0.5);
	vec2 st2 = vec2(0.0, ( 1.0 + stD) * 0.5);
	//the 45 case is the corner where neither run leads, so it joins the
	//forward and downward ones and leans toward whichever is longer
	vec2 cn1 = vec2((1.0 + min(runF, runD + 1.0)) * 0.5, 0.0);
	vec2 cn2 = vec2(0.0, (1.0 + min(runD, runF + 1.0)) * 0.5);
	//the flipped form of each line is the same line moved to run through the
	//neighbouring pixels rather than between them
	vec2 shFlip = vec2( 0.0, -1.0);
	vec2 stFlip = vec2(-1.0,  0.0);
	vec2 cnFlip = vec2(-0.5, -0.5);
	vec2 farF = vec2(1.0, 0.0);
	vec2 farD = vec2(0.0, 1.0);

	//lower shallow slant ("single pixel wide diagonal, dont flip" then priority edge cases)
	float flip1 = (1.0 - simA(c, df) * higherA(c, f))
		* max(higherA(c, f), simA(u, f) * (1.0 - simA(c, df)) * (1.0 - higherA(c, u)));
	float dist1 = mix(
		distToLine(point, center+sh1*pointDir, center+sh2*pointDir, pointDir),
		1.0 - distToLine(point, center+(sh1+shFlip)*pointDir, center+(sh2+shFlip)*pointDir, -pointDir),
		flip1);
	dist1 -= 0.5;
	vec4 col1 = pickA(c, f, d);

	//forward steep slant
	float flip2 = (1.0 - simA(c, df) * higherA(c, d))
		* max(higherA(c, d), simA(b, d) * (1.0 - simA(c, df)) * (1.0 - higherA(c, d)));
	float dist2 = mix(
		distToLine(point, center+st1*pointDir, center+st2*pointDir, pointDir),
		1.0 - distToLine(point, center+(st1+stFlip)*pointDir, center+(st2+stFlip)*pointDir, -pointDir),
		flip2);
	dist2 -= 0.5;
	vec4 col2 = pickA(c, f, d);

	//45 diagonal: "single pixel diagonal along neighbors" branch (with its
	//"line against triple color stripe" inner case) vs the priority edge cases
	float diagBranch3 = simA(c, df) * higherA(c, f);
	float flip3 = mix(
		max(higherA(c, f), (1.0 - simA(c, b)) * sim4A(b, f, d, u)),
		(1.0 - simA(c, dd)) * (1.0 - simA(c, ff)),
		diagBranch3);
	float dist3 = mix(
		distToLine(point, center+cn1*pointDir, center+cn2*pointDir, pointDir),
		1.0 - distToLine(point, center+(cn1+cnFlip)*pointDir, center+(cn2+cnFlip)*pointDir, -pointDir),
		flip3);
	dist3 -= 0.5;
	vec4 col3 = pickA(c, f, d);

	//far corner of shallow slant: the same line, a pixel further forward
	float flip4 = (1.0 - simA(f, dff) * higherA(f, ff))
		* max(higherA(f, ff), simA(uf, ff) * (1.0 - simA(f, dff)) * (1.0 - higherA(f, uf)));
	float dist4 = mix(
		distToLine(point, center+(sh1+farF)*pointDir, center+(sh2+farF)*pointDir, pointDir),
		1.0 - distToLine(point, center+(sh1+farF+shFlip)*pointDir, center+(sh2+farF+shFlip)*pointDir, -pointDir),
		flip4);
	dist4 -= 0.5;
	vec4 col4 = pickA(f, ff, df);

	//far corner of steep slant: the same line, a pixel further down
	float flip5 = (1.0 - simA(d, ddf) * higherA(d, dd))
		* max(higherA(d, dd), simA(db, dd) * (1.0 - simA(d, ddf)) * (1.0 - higherA(d, dd)));
	float dist5 = mix(
		distToLine(point, center+(st1+farD)*pointDir, center+(st2+farD)*pointDir, pointDir),
		1.0 - distToLine(point, center+(st1+farD+stFlip)*pointDir, center+(st2+farD+stFlip)*pointDir, -pointDir),
		flip5);
	dist5 -= 0.5;
	vec4 col5 = pickA(d, df, dd);

	//A black pixel with only fill beyond it, standing on a solid body's flat
	//edge, is a stroke's end or a protrusion's tip, not a step of a slope:
	//the notch beside it is a square corner, not a curve to round off. The
	//body must be one - solid for a 2x2 block under the corner - since a few
	//pixels on their own are a shape to round, not a body with a protrusion.
	//Only the linework is read this way, and only against the fill: a fill
	//poking into the linework is the lines' own notch, which keeps their
	//slope, and at the edge of the art there is no telling a tip from a
	//clipped line. A crossing the graph settled is a join of two strokes and
	//is sliced regardless
	float bodyC = sim4A(d, df, dd, ddf);
	float bodyB = sim4A(f, df, ff, dff);
	float bodyFar = sim4A(df, dff, ddf, AT(2.0, 2.0));
	//...but not where the body's edge is a slope: a run along it that ends
	//by stepping down a row makes the pixel at its head the slope's apex,
	//not a bar standing on a flat
	float endsB1 = (1.0 - simA(AT(-1.0, 1.0), d)) * simA(AT(-1.0, 2.0), d);
	float endsB2 = (1.0 - simA(AT(-2.0, 1.0), d)) * simA(AT(-2.0, 2.0), d);
	float endsB3 = (1.0 - simA(AT(-3.0, 1.0), d)) * simA(AT(-3.0, 2.0), d);
	float slopeB = (1.0 - bk2) * endsB1 + bk2 * (1.0 - bk3) * endsB2 + bk3 * (1.0 - bk4) * endsB3;
	float endsU1 = (1.0 - simA(AT(1.0,-1.0), f)) * simA(AT(2.0,-1.0), f);
	float endsU2 = (1.0 - simA(AT(1.0,-2.0), f)) * simA(AT(2.0,-2.0), f);
	float endsU3 = (1.0 - simA(AT(1.0,-3.0), f)) * simA(AT(2.0,-3.0), f);
	float slopeU = (1.0 - rise2) * endsU1 + rise2 * (1.0 - rise3) * endsU2 + rise3 * (1.0 - rise4) * endsU3;
	//the same runs seen from the far corners, whose notch is f or d
	float fbk2 = simA(d, df) * simA(c, f);
	float fbk3 = fbk2 * simA(db, df) * simA(b, f);
	float fbk4 = fbk3 * simA(AT(-2.0, 1.0), df) * simA(AT(-2.0, 0.0), f);
	float endsFB1 = (1.0 - simA(d, df)) * simA(dd, df);
	float endsFB2 = (1.0 - simA(db, df)) * simA(ddb, df);
	float endsFB3 = (1.0 - simA(AT(-2.0, 1.0), df)) * simA(AT(-2.0, 2.0), df);
	float slopeFB = (1.0 - fbk2) * endsFB1 + fbk2 * (1.0 - fbk3) * endsFB2 + fbk3 * (1.0 - fbk4) * endsFB3;
	float fri2 = simA(f, df) * simA(c, d);
	float fri3 = fri2 * simA(uf, df) * simA(u, d);
	float fri4 = fri3 * simA(AT(1.0,-2.0), df) * simA(AT(0.0,-2.0), d);
	float endsFU1 = (1.0 - simA(f, df)) * simA(ff, df);
	float endsFU2 = (1.0 - simA(uf, df)) * simA(uff, df);
	float endsFU3 = (1.0 - simA(AT(1.0,-2.0), df)) * simA(AT(2.0,-2.0), df);
	float slopeFU = (1.0 - fri2) * endsFU1 + fri2 * (1.0 - fri3) * endsFU2 + fri3 * (1.0 - fri4) * endsFU3;
	float tipF = strokeA(f) * bodyC * (1.0 - slopeB) * isC(ff) * isC(uf) * isC(uff) * isC(dff) * isC(u);
	float tipD = strokeA(d) * bodyB * (1.0 - slopeU) * isC(dd) * isC(db) * isC(ddb) * isC(ddf) * isC(b);
	float tipFF = strokeA(ff) * bodyFar * (1.0 - slopeFB) * isC(AT(3.0, 0.0)) * isC(uff) * isC(AT(3.0,-1.0)) * isC(AT(3.0, 1.0)) * isC(uf);
	float tipDD = strokeA(dd) * bodyFar * (1.0 - slopeFU) * isC(AT(0.0, 3.0)) * isC(ddb) * isC(AT(-1.0, 3.0)) * isC(AT(1.0, 3.0)) * isC(db);
	float notchC = (1.0 - step(0.0, crossC)) * max(tipF, tipD);
	float notchF = (1.0 - step(0.0, crossF)) * tipFF;
	float notchD = (1.0 - step(0.0, crossD)) * tipDD;

	//Where two one-pixel strokes meet - each with nothing of its own class
	//on its far side, touching at df - the corner between them is a
	//junction, not a step of a slope, and stays square: a T stays a T rather
	//than filleting into a knot, a crossing stays a crossing, and a bend
	//keeps its inside corner
	float junctionC = (1.0 - step(0.0, crossC)) * strokeA(f) * simA(f, df) * (1.0 - simA(ff, f)) * (1.0 - simA(dd, d));

	//select the first matching case's colour where its slice reaches this
	//point (col.r < 0 marks an abstaining pick, colour pass only)
	vec4 res = vec4(-1.0);
	res = mix(res, col1, sliceC * (1.0 - notchC) * (1.0 - junctionC) * e1 * step(dist1, 0.0) * step(0.0, col1.r));
	res = mix(res, col2, sliceC * (1.0 - notchC) * (1.0 - junctionC) * e2 * step(dist2, 0.0) * step(0.0, col2.r));
	res = mix(res, col3, sliceC * (1.0 - notchC) * (1.0 - junctionC) * e3 * step(dist3, 0.0) * step(0.0, col3.r));
	res = mix(res, col4, sliceF * (1.0 - notchF) * e4 * step(dist4, 0.0) * step(0.0, col4.r));
	res = mix(res, col5, sliceD * (1.0 - notchD) * e5 * step(dist5, 0.0) * step(0.0, col5.r));
	//a strip is not sliced: it is drawn as its lozenge instead
	return mix(res, vec4(-1.0), strip);
}

//based on down-forward direction; branchless: all five slant cases evaluate,
//an exclusive mask chain reproduces the original's else-if priority
vec4 sliceDistB(vec2 point, vec2 mainDir, vec2 pointDir, vec2 px){
	vec2 dirVec = pointDir * mainDir;
	point = mainDir * (point - 0.5) + 0.5; //flip point
	vec2 center = vec2(0.5, 0.5);

	vec4 ub  = ATB(-1.0,-1.0);
	vec4 u   = ATB( 0.0,-1.0);
	vec4 uf  = ATB( 1.0,-1.0);
	vec4 uff = ATB( 2.0,-1.0);
	vec4 b   = ATB(-1.0, 0.0);
	vec4 c   = ATB( 0.0, 0.0);
	vec4 f   = ATB( 1.0, 0.0);
	vec4 ff  = ATB( 2.0, 0.0);
	vec4 db  = ATB(-1.0, 1.0);
	vec4 d   = ATB( 0.0, 1.0);
	vec4 df  = ATB( 1.0, 1.0);
	vec4 dff = ATB( 2.0, 1.0);
	vec4 ddb = ATB(-1.0, 2.0);
	vec4 dd  = ATB( 0.0, 2.0);
	vec4 ddf = ATB( 1.0, 2.0);

	//edge detection
	float distAgainst = 4.0*cdB(f,d) + cdB(uf,c) + cdB(c,db) + cdB(ff,df) + cdB(df,dd);
	float distTowards = 4.0*cdB(c,df) + cdB(u,f) + cdB(f,dff) + cdB(b,d) + cdB(d,ddf);
	float sliceM = max(
		lt(distAgainst, distTowards),
		//equivalent edges edge case:
		lt(distAgainst, distTowards + 0.001) * (1.0 - higherB(c, f)));
	//checkerboard edge case:
	sliceM *= 1.0 - sim4B(f, d, b, u) * sim4B(uf, df, db, ub) * (1.0 - simB(c, f));

	//the colour pass keeps cleanEdge's own crossing decision: the shading is
	//read as the original's local distances read it
	float sliceC = sliceM;
	float sliceF = sliceM;
	float sliceD = sliceM;

	float m1 = sim3B(f, d, db) * (1.0 - sim3B(f, d, b)) * (1.0 - simB(uf, db)); //lower shallow slant
	float m2 = sim3B(uf, f, d) * (1.0 - sim3B(u, f, d)) * (1.0 - simB(uf, db)); //forward steep slant
	float m3 = simB(f, d); //45 diagonal
	float m4 = sim3B(ff, df, d) * (1.0 - sim3B(ff, df, c)) * (1.0 - simB(uff, d)); //far corner of shallow slant
	float m5 = sim3B(f, df, dd) * (1.0 - sim3B(c, df, dd)) * (1.0 - simB(f, ddb)); //far corner of steep slant
	float free = 1.0;
	float e1 = m1 * free; free *= 1.0 - e1;
	float e2 = m2 * free; free *= 1.0 - e2;
	float e3 = m3 * free; free *= 1.0 - e3;
	float e4 = m4 * free; free *= 1.0 - e4;
	float e5 = m5 * free;

	float fw1 = runStepB(AT(1.0, 0.0), f) * runStepB(AT(1.0,-1.0), c);
	float fw2 = fw1 * runStepB(AT(2.0, 0.0), f) * runStepB(AT(2.0,-1.0), c);
	float fw3 = fw2 * runStepB(AT(3.0, 0.0), f) * runStepB(AT(3.0,-1.0), c);
	float fw4 = fw3 * runStepB(AT(4.0, 0.0), f) * runStepB(AT(4.0,-1.0), c);
	float runF = max(1.0, fw1 + fw2 + fw3 + fw4);

	float bk1 = runStepB(AT( 0.0, 1.0), d) * runStepB(AT( 0.0, 0.0), c);
	float bk2 = bk1 * runStepB(AT(-1.0, 1.0), d) * runStepB(AT(-1.0, 0.0), c);
	float bk3 = bk2 * runStepB(AT(-2.0, 1.0), d) * runStepB(AT(-2.0, 0.0), c);
	float bk4 = bk3 * runStepB(AT(-3.0, 1.0), d) * runStepB(AT(-3.0, 0.0), c);
	float runB = max(1.0, bk1 + bk2 + bk3 + bk4);

	float dn1 = runStepB(AT(0.0, 1.0), d) * runStepB(AT(-1.0, 1.0), c);
	float dn2 = dn1 * runStepB(AT(0.0, 2.0), d) * runStepB(AT(-1.0, 2.0), c);
	float dn3 = dn2 * runStepB(AT(0.0, 3.0), d) * runStepB(AT(-1.0, 3.0), c);
	float dn4 = dn3 * runStepB(AT(0.0, 4.0), d) * runStepB(AT(-1.0, 4.0), c);
	float runD = max(1.0, dn1 + dn2 + dn3 + dn4);

	float rise1 = runStepB(AT(1.0, 0.0), f) * runStepB(AT(0.0, 0.0), c);
	float rise2 = rise1 * runStepB(AT(1.0,-1.0), f) * runStepB(AT(0.0,-1.0), c);
	float rise3 = rise2 * runStepB(AT(1.0,-2.0), f) * runStepB(AT(0.0,-2.0), c);
	float rise4 = rise3 * runStepB(AT(1.0,-3.0), f) * runStepB(AT(0.0,-3.0), c);
	float runU = max(1.0, rise1 + rise2 + rise3 + rise4);

	vec2 sh1 = vec2(( 1.0 + min(runF, runB + 1.0)) * 0.5, 0.0);
	vec2 sh2 = vec2(-(min(runB, runF + 1.0) - 1.0) * 0.5, 1.0);
	vec2 st1 = vec2(1.0, -(min(runU, runD + 1.0) - 1.0) * 0.5);
	vec2 st2 = vec2(0.0, ( 1.0 + min(runD, runU + 1.0)) * 0.5);
	vec2 cn1 = vec2((1.0 + min(runF, runD + 1.0)) * 0.5, 0.0);
	vec2 cn2 = vec2(0.0, (1.0 + min(runD, runF + 1.0)) * 0.5);
	vec2 shFlip = vec2( 0.0, -1.0);
	vec2 stFlip = vec2(-1.0,  0.0);
	vec2 cnFlip = vec2(-0.5, -0.5);
	vec2 farF = vec2(1.0, 0.0);
	vec2 farD = vec2(0.0, 1.0);

	//lower shallow slant ("single pixel wide diagonal, dont flip" then priority edge cases)
	float flip1 = (1.0 - simB(c, df) * higherB(c, f))
		* max(higherB(c, f), simB(u, f) * (1.0 - simB(c, df)) * (1.0 - higherB(c, u)));
	float dist1 = mix(
		distToLine(point, center+sh1*pointDir, center+sh2*pointDir, pointDir),
		1.0 - distToLine(point, center+(sh1+shFlip)*pointDir, center+(sh2+shFlip)*pointDir, -pointDir),
		flip1);
	dist1 -= 0.5;
	vec4 col1 = pickB(c, f, d);

	//forward steep slant
	float flip2 = (1.0 - simB(c, df) * higherB(c, d))
		* max(higherB(c, d), simB(b, d) * (1.0 - simB(c, df)) * (1.0 - higherB(c, d)));
	float dist2 = mix(
		distToLine(point, center+st1*pointDir, center+st2*pointDir, pointDir),
		1.0 - distToLine(point, center+(st1+stFlip)*pointDir, center+(st2+stFlip)*pointDir, -pointDir),
		flip2);
	dist2 -= 0.5;
	vec4 col2 = pickB(c, f, d);

	//45 diagonal: "single pixel diagonal along neighbors" branch (with its
	//"line against triple color stripe" inner case) vs the priority edge cases
	float diagBranch3 = simB(c, df) * higherB(c, f);
	float flip3 = mix(
		max(higherB(c, f), (1.0 - simB(c, b)) * sim4B(b, f, d, u)),
		(1.0 - simB(c, dd)) * (1.0 - simB(c, ff)),
		diagBranch3);
	float dist3 = mix(
		distToLine(point, center+cn1*pointDir, center+cn2*pointDir, pointDir),
		1.0 - distToLine(point, center+(cn1+cnFlip)*pointDir, center+(cn2+cnFlip)*pointDir, -pointDir),
		flip3);
	dist3 -= 0.5;
	vec4 col3 = pickB(c, f, d);

	//far corner of shallow slant: the same line, a pixel further forward
	float flip4 = (1.0 - simB(f, dff) * higherB(f, ff))
		* max(higherB(f, ff), simB(uf, ff) * (1.0 - simB(f, dff)) * (1.0 - higherB(f, uf)));
	float dist4 = mix(
		distToLine(point, center+(sh1+farF)*pointDir, center+(sh2+farF)*pointDir, pointDir),
		1.0 - distToLine(point, center+(sh1+farF+shFlip)*pointDir, center+(sh2+farF+shFlip)*pointDir, -pointDir),
		flip4);
	dist4 -= 0.5;
	vec4 col4 = pickB(f, ff, df);

	//far corner of steep slant: the same line, a pixel further down
	float flip5 = (1.0 - simB(d, ddf) * higherB(d, dd))
		* max(higherB(d, dd), simB(db, dd) * (1.0 - simB(d, ddf)) * (1.0 - higherB(d, dd)));
	float dist5 = mix(
		distToLine(point, center+(st1+farD)*pointDir, center+(st2+farD)*pointDir, pointDir),
		1.0 - distToLine(point, center+(st1+farD+stFlip)*pointDir, center+(st2+farD+stFlip)*pointDir, -pointDir),
		flip5);
	dist5 -= 0.5;
	vec4 col5 = pickB(d, df, dd);

	//select the first matching case's colour where its slice reaches this
	//point (col.r < 0 marks an abstaining pick, colour pass only)
	vec4 res = vec4(-1.0);
	res = mix(res, col1, sliceC * e1 * step(dist1, 0.0) * step(0.0, col1.r));
	res = mix(res, col2, sliceC * e2 * step(dist2, 0.0) * step(0.0, col2.r));
	res = mix(res, col3, sliceC * e3 * step(dist3, 0.0) * step(0.0, col3.r));
	res = mix(res, col4, sliceF * e4 * step(dist4, 0.0) * step(0.0, col4.r));
	res = mix(res, col5, sliceD * e5 * step(dist5, 0.0) * step(0.0, col5.r));
	return res;
}

void main() {
	vec2 px = vUV * uSheetSize;
	vec2 local = fract(px);
	px = ceil(px) - 0.5;

	vec2 pointDir = round(local)*2.0-1.0;
	vec2 dirVec = pointDir;

	vec4 c  = AT(0.0, 0.0);
	vec4 f  = AT(1.0, 0.0);
	vec4 d  = AT(0.0, 1.0);
	vec4 df = AT(1.0, 1.0);

	vec4 col = c;

	//pass A: c_orner, b_ack, and u_p slices on the art classes
	// (slices from neighbor pixels will only ever reach these 3 quadrants
	vec4 stripC = stripAt(px);
	vec4 cColA = sliceDistA(local, vec2( 1.0, 1.0), pointDir, px, stripC.x);
	vec4 bColA = sliceDistA(local, vec2(-1.0, 1.0), pointDir, px, stripC.x);
	vec4 uColA = sliceDistA(local, vec2( 1.0,-1.0), pointDir, px, stripC.x);

	col = mix(col, cColA, step(0.0, cColA.r));
	col = mix(col, bColA, step(0.0, bColA.r));
	col = mix(col, uColA, step(0.0, uColA.r));

	//a strip's lozenge: black inside it, the fill beside in its cut corners
	vec2 point = px - 0.5 + local;
	vec2 sideX = px + vec2(pointDir.x, 0.0);
	vec2 sideY = px + vec2(0.0, pointDir.y);
	col = mix(col, mix(cornerFill(srcAt(sideX), srcAt(sideY)), c, inLozenge(point, px, stripC)), stripC.x);
	//...and where a strip beside this pixel is let out into it
	col = mix(col, srcAt(sideX), inLozenge(point, sideX, stripAt(sideX)));
	col = mix(col, srcAt(sideY), inLozenge(point, sideY, stripAt(sideY)));

	//an arc's pixels, and those beside it, drawn to its circle
	vec4 arc = texture(uArcs, px / uSheetSize);
	col = mix(col, arcColour(px, local, c, arc), arcDrawn(arc));
	vec4 colourArc = texture(uColourArcs, px / uSheetSize);
	col = mix(col, colourArcColour(px, local, c, colourArc, col), arcDrawn(colourArc));

	//pass B base fill colour before slicing: c itself when it is a fill,
	//else the closest (bilinear-weighted) fill colour of the 2x2 cell (c is
	//linework that pass A smoothed away here)
	vec2 t = abs(local - 0.5);
	float wf  = t.x * (1.0 - t.y);
	float wd  = (1.0 - t.x) * t.y;
	float wdf = t.x * t.y;
	vec4 base = col;
	float wBest = -1.0;
	float takeF  = isC(f)  * (1.0 - step(wf,  wBest)); base = mix(base, f,  takeF);  wBest = mix(wBest, wf,  takeF);
	float takeD  = isC(d)  * (1.0 - step(wd,  wBest)); base = mix(base, d,  takeD);  wBest = mix(wBest, wd,  takeD);
	float takeDf = isC(df) * (1.0 - step(wdf, wBest)); base = mix(base, df, takeDf); wBest = mix(wBest, wdf, takeDf);
	base = mix(base, c, isC(c));

	vec4 cColB = sliceDistB(local, vec2( 1.0, 1.0), pointDir, px);
	vec4 bColB = sliceDistB(local, vec2(-1.0, 1.0), pointDir, px);
	vec4 uColB = sliceDistB(local, vec2( 1.0,-1.0), pointDir, px);

	vec4 resolved = base;
	resolved = mix(resolved, cColB, step(0.0, cColB.r));
	resolved = mix(resolved, bColB, step(0.0, bColB.r));
	resolved = mix(resolved, uColB, step(0.0, uColB.r));

	//apply the pass B fill resolve only where pass A output is a fill:
	col = mix(col, vec4(resolved.rgb, col.a), step(1.5, classOf(col)));

	//a lozenge floats clear of a black line beneath or above it: its fill
	//stops a texel short of that edge, as the graph flags it
	float inset = texture(uGraph, px / uSheetSize).b;
	float insetBelow = step(0.45, inset);
	float insetAbove = step(0.2, inset - 0.5 * insetBelow);
	float texel = fwidth(vUV.y * uSheetSize.y);
	float atEdge = max(insetBelow * step(1.0 - texel, local.y), insetAbove * step(local.y, texel));
	col = mix(col, arcBlack, atEdge * step(1.5, classOf(col)));

	finalColor = col;
}
