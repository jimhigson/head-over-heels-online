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
 *   fill pixel, but black/transparent samples abstain (no edges, no
 *   priority, never the resolved colour) - so fills keep crisp
 *   palette-preserving colour boundaries that continue underneath the
 *   linework, with no mixing/blurring.
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

// a neighbour of the pixel being sliced, in that slice's own frame: which
// quadrant of the pixel the fragment sits in, and the slice's mirroring, are
// both folded into dirVec, so every case reads as though looking down-forward
#define AT(dx, dy) srcAt(px + vec2(dx, dy) * dirVec)

//based on down-forward direction; branchless: all five slant cases evaluate,
//an exclusive mask chain reproduces the original's else-if priority
vec4 sliceDistA(vec2 point, vec2 mainDir, vec2 pointDir, vec2 px){
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
	//alongside keep matching c - that is, while the edge stays straight.
	float fw1 = simA(AT(1.0, 0.0), f) * simA(AT(1.0,-1.0), c);
	float fw2 = fw1 * simA(AT(2.0, 0.0), f) * simA(AT(2.0,-1.0), c);
	float fw3 = fw2 * simA(AT(3.0, 0.0), f) * simA(AT(3.0,-1.0), c);
	float fw4 = fw3 * simA(AT(4.0, 0.0), f) * simA(AT(4.0,-1.0), c);
	float runF = max(1.0, fw1 + fw2 + fw3 + fw4);

	float bk1 = simA(AT( 0.0, 1.0), d) * simA(AT( 0.0, 0.0), c);
	float bk2 = bk1 * simA(AT(-1.0, 1.0), d) * simA(AT(-1.0, 0.0), c);
	float bk3 = bk2 * simA(AT(-2.0, 1.0), d) * simA(AT(-2.0, 0.0), c);
	float bk4 = bk3 * simA(AT(-3.0, 1.0), d) * simA(AT(-3.0, 0.0), c);
	float runB = max(1.0, bk1 + bk2 + bk3 + bk4);

	float dn1 = simA(AT(0.0, 1.0), d) * simA(AT(-1.0, 1.0), c);
	float dn2 = dn1 * simA(AT(0.0, 2.0), d) * simA(AT(-1.0, 2.0), c);
	float dn3 = dn2 * simA(AT(0.0, 3.0), d) * simA(AT(-1.0, 3.0), c);
	float dn4 = dn3 * simA(AT(0.0, 4.0), d) * simA(AT(-1.0, 4.0), c);
	float runD = max(1.0, dn1 + dn2 + dn3 + dn4);

	float rise1 = simA(AT(1.0, 0.0), f) * simA(AT(0.0, 0.0), c);
	float rise2 = rise1 * simA(AT(1.0,-1.0), f) * simA(AT(0.0,-1.0), c);
	float rise3 = rise2 * simA(AT(1.0,-2.0), f) * simA(AT(0.0,-2.0), c);
	float rise4 = rise3 * simA(AT(1.0,-3.0), f) * simA(AT(0.0,-3.0), c);
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
	//single pixel 2:1 slope edge case:
	flip3 = max(flip3,
		max(simA(f, db) * sim3A(u, f, df), simA(uf, d) * sim3A(b, d, df)) * (1.0 - simA(c, df)));
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

	//select the first matching case's colour where its slice reaches this
	//point (col.r < 0 marks an abstaining pick, colour pass only)
	vec4 res = vec4(-1.0);
	res = mix(res, col1, e1 * step(dist1, 0.0) * step(0.0, col1.r));
	res = mix(res, col2, e2 * step(dist2, 0.0) * step(0.0, col2.r));
	res = mix(res, col3, e3 * step(dist3, 0.0) * step(0.0, col3.r));
	res = mix(res, col4, e4 * step(dist4, 0.0) * step(0.0, col4.r));
	res = mix(res, col5, e5 * step(dist5, 0.0) * step(0.0, col5.r));
	return mix(vec4(-1.0), res, sliceM);
}

//based on down-forward direction; branchless: all five slant cases evaluate,
//an exclusive mask chain reproduces the original's else-if priority
vec4 sliceDistB(vec2 point, vec2 mainDir, vec2 pointDir, vec2 px){
	vec2 dirVec = pointDir * mainDir;
	point = mainDir * (point - 0.5) + 0.5; //flip point
	vec2 center = vec2(0.5, 0.5);

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
	float distAgainst = 4.0*cdB(f,d) + cdB(uf,c) + cdB(c,db) + cdB(ff,df) + cdB(df,dd);
	float distTowards = 4.0*cdB(c,df) + cdB(u,f) + cdB(f,dff) + cdB(b,d) + cdB(d,ddf);
	float sliceM = max(
		lt(distAgainst, distTowards),
		//equivalent edges edge case:
		lt(distAgainst, distTowards + 0.001) * (1.0 - higherB(c, f)));
	//checkerboard edge case:
	sliceM *= 1.0 - sim4B(f, d, b, u) * sim4B(uf, df, db, ub) * (1.0 - simB(c, f));

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
	//single pixel 2:1 slope edge case:
	flip3 = max(flip3,
		max(simB(f, db) * sim3B(u, f, df), simB(uf, d) * sim3B(b, d, df)) * (1.0 - simB(c, df)));
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
	res = mix(res, col1, e1 * step(dist1, 0.0) * step(0.0, col1.r));
	res = mix(res, col2, e2 * step(dist2, 0.0) * step(0.0, col2.r));
	res = mix(res, col3, e3 * step(dist3, 0.0) * step(0.0, col3.r));
	res = mix(res, col4, e4 * step(dist4, 0.0) * step(0.0, col4.r));
	res = mix(res, col5, e5 * step(dist5, 0.0) * step(0.0, col5.r));
	return mix(vec4(-1.0), res, sliceM);
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
	vec4 cColA = sliceDistA(local, vec2( 1.0, 1.0), pointDir, px);
	vec4 bColA = sliceDistA(local, vec2(-1.0, 1.0), pointDir, px);
	vec4 uColA = sliceDistA(local, vec2( 1.0,-1.0), pointDir, px);

	col = mix(col, cColA, step(0.0, cColA.r));
	col = mix(col, bColA, step(0.0, bColA.r));
	col = mix(col, uColA, step(0.0, uColA.r));

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

	finalColor = col;
}
