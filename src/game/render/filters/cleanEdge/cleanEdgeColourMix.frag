#version 300 es
precision highp float;

/*
 * Experimental art-aware variant of cleanEdge (scale mode, with 2:1 slopes),
 * based on torcado's original: https://torcado.com/cleanEdge/
 * (gist: https://gist.github.com/torcado194/e2794f5a4b22049ac0a41f972d14c329)
 *
 * The variant exploits this game's art being black linework whose white fills
 * were colourised: edge/slope geometry is decided purely on the
 * transparent/black/colour distinction (so lines and silhouettes keep
 * cleanEdge's crisp 45-degree and 2:1 slopes), while every non-black,
 * non-transparent output pixel takes its colour from interpolating (mixing)
 * the non-black pixels of the sampling neighbourhood - dithered colour fills
 * melt into smooth gradients instead of upscaled chequerboard.
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

// enables 2:1 slopes. otherwise only uses 45 degree slopes
#define SLOPE
// cleans up small detail slope transitions (if SLOPE is enabled)
#define CLEANUP

in vec2 vUV;
out vec4 finalColor;

uniform sampler2D uTexture;

// the size of the source sheet in (1x) texels
uniform vec2 uSheetSize;

const float lineWidth = 1.0;

// how dark (relative to alpha, since the art is premultiplied) a pixel must
// be to count as the black linework rather than a colourised fill
const float blackThreshold = 0.1;

// classify a sample: 0 = transparent, 1 = black linework, 2 = colourised fill
float classOf(vec4 col){
	if(col.a < 0.5) return 0.0;
	return (max(col.r, max(col.g, col.b)) < blackThreshold * col.a) ? 1.0 : 2.0;
}

bool similar(vec4 col1, vec4 col2){
	return classOf(col1) == classOf(col2);
}

// note: inner check should ideally check between all permutations
//  but this is good enough, and faster
bool similar3(vec4 col1, vec4 col2, vec4 col3){
	return similar(col1, col2) && similar(col2, col3);
}

bool similar4(vec4 col1, vec4 col2, vec4 col3, vec4 col4){
	return similar(col1, col2) && similar(col2, col3) && similar(col3, col4);
}

bool higher(vec4 thisCol, vec4 otherCol){
	return classOf(thisCol) > classOf(otherCol);
}

//color distance: binary, on the art classes
float cd(vec4 col1, vec4 col2){
	return classOf(col1) == classOf(col2) ? 0.0 : 1.0;
}

float distToLine(vec2 testPt, vec2 pt1, vec2 pt2, vec2 dir){
  vec2 lineDir = pt2 - pt1;
  vec2 perpDir = vec2(lineDir.y, -lineDir.x);
  vec2 dirToPt1 = pt1 - testPt;
  return (dot(perpDir, dir) > 0.0 ? 1.0 : -1.0) * (dot(normalize(perpDir), dirToPt1));
}

//based on down-forward direction
vec4 sliceDist(vec2 point, vec2 mainDir, vec2 pointDir, vec4 ub, vec4 u, vec4 uf, vec4 uff, vec4 b, vec4 c, vec4 f, vec4 ff, vec4 db, vec4 d, vec4 df, vec4 dff, vec4 ddb, vec4 dd, vec4 ddf){
	//clamped range prevents inacccurate identity (no change) result
	#ifdef SLOPE
	float minWidth = 0.45;
	float maxWidth = 1.142;
	#else
	float minWidth = 0.0;
	float maxWidth = 1.4;
	#endif
	float _lineWidth = max(minWidth, min(maxWidth, lineWidth));
	point = mainDir * (point - 0.5) + 0.5; //flip point

	//edge detection
	float distAgainst = 4.0*cd(f,d) + cd(uf,c) + cd(c,db) + cd(ff,df) + cd(df,dd);
	float distTowards = 4.0*cd(c,df) + cd(u,f) + cd(f,dff) + cd(b,d) + cd(d,ddf);
	bool shouldSlice =
	  (distAgainst < distTowards)
	  || (distAgainst < distTowards + 0.001) && !higher(c, f); //equivalent edges edge case
	if(similar4(f, d, b, u) && similar4(uf, df, db, ub) && !similar(c, f)){ //checkerboard edge case
		shouldSlice = false;
	}
	if(!shouldSlice) return vec4(-1.0);

	float dist = 1.0;
	bool flip = false;
	vec2 center = vec2(0.5,0.5);

	#ifdef SLOPE
	if(similar3(f, d, db) && !similar3(f, d, b) && !similar(uf, db)){ //lower shallow 2:1 slant
		if(similar(c, df) && higher(c, f)){ //single pixel wide diagonal, dont flip

		} else {
			//priority edge cases
			if(higher(c, f)){
				flip = true;
			}
			if(similar(u, f) && !similar(c, df) && !higher(c, u)){
				flip = true;
			}
		}

		if(flip){
			dist = _lineWidth-distToLine(point, center+vec2(1.5, -1.0)*pointDir, center+vec2(-0.5, 0.0)*pointDir, -pointDir); //midpoints of neighbor two-pixel groupings
		} else {
			dist = distToLine(point, center+vec2(1.5, 0.0)*pointDir, center+vec2(-0.5, 1.0)*pointDir, pointDir); //midpoints of neighbor two-pixel groupings
		}

		//cleanup slant transitions
		#ifdef CLEANUP
		if(!flip && similar(c, uf) && !(similar3(c, uf, uff) && !similar3(c, uf, ff) && !similar(d, uff))){ //shallow
			float dist2 = distToLine(point, center+vec2(2.0, -1.0)*pointDir, center+vec2(-0.0, 1.0)*pointDir, pointDir);
			dist = min(dist, dist2);
		}
		#endif

		dist -= (_lineWidth/2.0);
		return dist <= 0.0 ? ((cd(c,f) <= cd(c,d)) ? f : d) : vec4(-1.0);
	} else if(similar3(uf, f, d) && !similar3(u, f, d) && !similar(uf, db)){ //forward steep 2:1 slant
		if(similar(c, df) && higher(c, d)){ //single pixel wide diagonal, dont flip

		} else {
			//priority edge cases
			if(higher(c, d)){
				flip = true;
			}
			if(similar(b, d) && !similar(c, df) && !higher(c, d)){
				flip = true;
			}
		}

		if(flip){
			dist = _lineWidth-distToLine(point, center+vec2(0.0, -0.5)*pointDir, center+vec2(-1.0, 1.5)*pointDir, -pointDir); //midpoints of neighbor two-pixel groupings
		} else {
			dist = distToLine(point, center+vec2(1.0, -0.5)*pointDir, center+vec2(0.0, 1.5)*pointDir, pointDir); //midpoints of neighbor two-pixel groupings
		}

		//cleanup slant transitions
		#ifdef CLEANUP
		if(!flip && similar(c, db) && !(similar3(c, db, ddb) && !similar3(c, db, dd) && !similar(f, ddb))){ //steep
			float dist2 = distToLine(point, center+vec2(1.0, 0.0)*pointDir, center+vec2(-1.0, 2.0)*pointDir, pointDir);
			dist = min(dist, dist2);
		}
		#endif

		dist -= (_lineWidth/2.0);
		return dist <= 0.0 ? ((cd(c,f) <= cd(c,d)) ? f : d) : vec4(-1.0);
	} else
	#endif
	if(similar(f, d)) { //45 diagonal
		if(similar(c, df) && higher(c, f)){ //single pixel diagonal along neighbors, dont flip
			if(!similar(c, dd) && !similar(c, ff)){ //line against triple color stripe edge case
				flip = true;
			}
		} else {
			//priority edge cases
			if(higher(c, f)){
				flip = true;
			}
			if(!similar(c, b) && similar4(b, f, d, u)){
				flip = true;
			}
		}
		//single pixel 2:1 slope, dont flip
		if((( (similar(f, db) && similar3(u, f, df)) || (similar(uf, d) && similar3(b, d, df)) ) && !similar(c, df))){
			flip = true;
		}

		if(flip){
			dist = _lineWidth-distToLine(point, center+vec2(1.0, -1.0)*pointDir, center+vec2(-1.0, 1.0)*pointDir, -pointDir); //midpoints of own diagonal pixels
		} else {
			dist = distToLine(point, center+vec2(1.0, 0.0)*pointDir, center+vec2(0.0, 1.0)*pointDir, pointDir); //midpoints of corner neighbor pixels
		}

		//cleanup slant transitions
		#ifdef SLOPE
		#ifdef CLEANUP
		if(!flip && similar3(c, uf, uff) && !similar3(c, uf, ff) && !similar(d, uff)){ //shallow
			float dist2 = distToLine(point, center+vec2(1.5, 0.0)*pointDir, center+vec2(-0.5, 1.0)*pointDir, pointDir);
			dist = max(dist, dist2);
		}

		if(!flip && similar3(ddb, db, c) && !similar3(dd, db, c) && !similar(ddb, f)){ //steep
			float dist2 = distToLine(point, center+vec2(1.0, -0.5)*pointDir, center+vec2(0.0, 1.5)*pointDir, pointDir);
			dist = max(dist, dist2);
		}
		#endif
		#endif

		dist -= (_lineWidth/2.0);
		return dist <= 0.0 ? ((cd(c,f) <= cd(c,d)) ? f : d) : vec4(-1.0);
	}
	#ifdef SLOPE
	else if(similar3(ff, df, d) && !similar3(ff, df, c) && !similar(uff, d)){ //far corner of shallow slant

		if(similar(f, dff) && higher(f, ff)){ //single pixel wide diagonal, dont flip

		} else {
			//priority edge cases
			if(higher(f, ff)){
				flip = true;
			}
			if(similar(uf, ff) && !similar(f, dff) && !higher(f, uf)){
				flip = true;
			}
		}
		if(flip){
			dist = _lineWidth-distToLine(point, center+vec2(1.5+1.0, -1.0)*pointDir, center+vec2(-0.5+1.0, 0.0)*pointDir, -pointDir); //midpoints of neighbor two-pixel groupings
		} else {
			dist = distToLine(point, center+vec2(1.5+1.0, 0.0)*pointDir, center+vec2(-0.5+1.0, 1.0)*pointDir, pointDir); //midpoints of neighbor two-pixel groupings
		}

		dist -= (_lineWidth/2.0);
		return dist <= 0.0 ? ((cd(f,ff) <= cd(f,df)) ? ff : df) : vec4(-1.0);
	} else if(similar3(f, df, dd) && !similar3(c, df, dd) && !similar(f, ddb)){ //far corner of steep slant
		if(similar(d, ddf) && higher(d, dd)){ //single pixel wide diagonal, dont flip

		} else {
			//priority edge cases
			if(higher(d, dd)){
				flip = true;
			}
			if(similar(db, dd) && !similar(d, ddf) && !higher(d, dd)){
				flip = true;
			}
		}

		if(flip){
			dist = _lineWidth-distToLine(point, center+vec2(0.0, -0.5+1.0)*pointDir, center+vec2(-1.0, 1.5+1.0)*pointDir, -pointDir); //midpoints of neighbor two-pixel groupings
		} else {
			dist = distToLine(point, center+vec2(1.0, -0.5+1.0)*pointDir, center+vec2(0.0, 1.5+1.0)*pointDir, pointDir); //midpoints of neighbor two-pixel groupings
		}
		dist -= (_lineWidth/2.0);
		return dist <= 0.0 ? ((cd(d,df) <= cd(d,dd)) ? df : dd) : vec4(-1.0);
	}
	#endif
	return vec4(-1.0);
}

vec4 srcAt(vec2 px){
	return texture(uTexture, px / uSheetSize);
}

void main() {
	vec2 px = vUV * uSheetSize;
	vec2 local = fract(px);
	px = ceil(px) - 0.5;

	vec2 pointDir = round(local)*2.0-1.0;

	//neighbor pixels
	//Up, Down, Forward, and Back
	//relative to quadrant of current location within pixel

	vec4 uub = srcAt(px+vec2(-1.0,-2.0)*pointDir);
	vec4 uu  = srcAt(px+vec2( 0.0,-2.0)*pointDir);
	vec4 uuf = srcAt(px+vec2( 1.0,-2.0)*pointDir);

	vec4 ubb = srcAt(px+vec2(-2.0,-2.0)*pointDir);
	vec4 ub  = srcAt(px+vec2(-1.0,-1.0)*pointDir);
	vec4 u   = srcAt(px+vec2( 0.0,-1.0)*pointDir);
	vec4 uf  = srcAt(px+vec2( 1.0,-1.0)*pointDir);
	vec4 uff = srcAt(px+vec2( 2.0,-1.0)*pointDir);

	vec4 bb  = srcAt(px+vec2(-2.0, 0.0)*pointDir);
	vec4 b   = srcAt(px+vec2(-1.0, 0.0)*pointDir);
	vec4 c   = srcAt(px+vec2( 0.0, 0.0)*pointDir);
	vec4 f   = srcAt(px+vec2( 1.0, 0.0)*pointDir);
	vec4 ff  = srcAt(px+vec2( 2.0, 0.0)*pointDir);

	vec4 dbb = srcAt(px+vec2(-2.0, 1.0)*pointDir);
	vec4 db  = srcAt(px+vec2(-1.0, 1.0)*pointDir);
	vec4 d   = srcAt(px+vec2( 0.0, 1.0)*pointDir);
	vec4 df  = srcAt(px+vec2( 1.0, 1.0)*pointDir);
	vec4 dff = srcAt(px+vec2( 2.0, 1.0)*pointDir);

	vec4 ddb = srcAt(px+vec2(-1.0, 2.0)*pointDir);
	vec4 dd  = srcAt(px+vec2( 0.0, 2.0)*pointDir);
	vec4 ddf = srcAt(px+vec2( 1.0, 2.0)*pointDir);

	vec4 col = c;

	//c_orner, b_ack, and u_p slices
	// (slices from neighbor pixels will only ever reach these 3 quadrants
	vec4 c_col = sliceDist(local, vec2( 1.0, 1.0), pointDir, ub, u, uf, uff, b, c, f, ff, db, d, df, dff, ddb, dd, ddf);
	vec4 b_col = sliceDist(local, vec2(-1.0, 1.0), pointDir, uf, u, ub, ubb, f, c, b, bb, df, d, db, dbb, ddf, dd, ddb);
	vec4 u_col = sliceDist(local, vec2( 1.0,-1.0), pointDir, db, d, df, dff, b, c, f, ff, ub, u, uf, uff, uub, uu, uuf);

	if(c_col.r >= 0.0){
		col = c_col;
	}
	if(b_col.r >= 0.0){
		col = b_col;
	}
	if(u_col.r >= 0.0){
		col = u_col;
	}

	if(classOf(col) == 2.0){
		// colourised fill: bilinear mix of the 2x2 sampling cell around this
		// point, using only its non-black, non-transparent pixels (c/f/d/df
		// are that cell - f, d, df sit quadrant-ward of c via pointDir)
		vec2 t = abs(local - 0.5);
		float wc  = (1.0 - t.x) * (1.0 - t.y);
		float wf  = t.x * (1.0 - t.y);
		float wd  = (1.0 - t.x) * t.y;
		float wdf = t.x * t.y;
		vec3 mixed = vec3(0.0);
		float wSum = 0.0;
		if(classOf(c)  == 2.0){ mixed += c.rgb  * wc;  wSum += wc;  }
		if(classOf(f)  == 2.0){ mixed += f.rgb  * wf;  wSum += wf;  }
		if(classOf(d)  == 2.0){ mixed += d.rgb  * wd;  wSum += wd;  }
		if(classOf(df) == 2.0){ mixed += df.rgb * wdf; wSum += wdf; }
		if(wSum > 0.001){
			col = vec4(mixed / wSum * col.a, col.a);
		}
	}

	finalColor = col;
}
