import{O as E,V as on,W as U,A as nn,T as H,h as A,bO as be,C as _e,a1 as N,j as Re,U as Yi,M as Ji,bP as We,bQ as ss,f as Wt,v as Yt,bR as qi,a7 as Lo,i as y,w as Zi,bS as Qi,bT as Ki,bU as Fe,bV as et,bW as Gn,bX as vo,bY as xo,bZ as ea,b_ as me,aG as ye,aa as ze,t as is,b$ as Ct,g as ta,aq as X,c0 as w,c1 as oa,z as na,br as Y,aD as as,c2 as $n,aB as S,c3 as rn,c4 as ra,az as Ee,c5 as Le,c6 as sn,c7 as ls,aH as sa,c8 as Pe,R as cs,c9 as us,ca as ds,cb as ia,bu as hs,cc as Me,cd as tt,ce as aa,cf as io,cg as Hn,ch as an,ci as ne,cj as la,ck as it,as as R,cl as te,b1 as B,cm as ca,cn as Rt,aX as Tt,co as at,cp as ve,cq as J,cr as ua,aP as Pt,cs as Mt,aZ as ie,aW as Ue,ct as ao,cu as da,cv as ha,cw as pa,cx as fa,cy as ln,by as Ve,bx as Bt,o as ps,cz as ma,cA as fs,cB as oo,bI as cn,cC as Et,cD as Eo,cE as ga,cF as ba,cG as un,cH as ms,cI as ya,cJ as va,cK as oe,cL as xa,aR as At,cM as wa,cN as Ot,cO as re,cP as xe,cQ as Sa,cR as Ca,cS as Ta,cT as dn,cU as gs,cV as no,cW as hn,cX as bs,cY as we,cZ as ka,c_ as ys,c$ as Ia,d0 as Ra,d1 as Jt,d2 as pn,d3 as Pa,d4 as Ma,d5 as Ba,d6 as q,d7 as Aa,d8 as Oa,d9 as F,da as _a,db as Da,dc as Fa,dd as qt,de as vs,aS as Z,df as fn,dg as za,dh as mn,aM as xs,di as gn,dj as wo,dk as Uo,bG as ro,dl as Nn,bF as bn,dm as ws,dn as Ss,dp as yn,dq as Cs,b0 as vn,dr as Ts,aQ as ot,ds as xn,dt as lo,du as La,dv as wn,dw as k,dx as Qe,aO as Ea,ak as Ua,dy as ee,dz as Zt,dA as Va,dB as Ga,dC as co,dD as $a,dE as Ha,dF as jn,dG as Na,dH as ks,dI as Sn,dJ as Qt,dK as Is,dL as Rs,dM as wt,dN as nt,dO as ja,dP as Xa,dQ as Ps,dR as Wa,dS as Ya,dT as Ja,dU as qa,bD as lt,dV as Ut,dW as Vt,dX as C,dY as Vo,dZ as Ms,d_ as ct,ar as Cn,d$ as Bs,e0 as Za,e1 as Qa,e2 as Ka,e3 as el,e4 as tl,bw as ol,e5 as ce,e6 as As,e7 as nl,e8 as rl,e9 as sl,ea as Xn,eb as Wn,ec as il,ed as Os,bK as _s,ee as al,ap as ll,ef as cl,eg as ul,eh as dl,ei as Ds,ej as hl,ek as pl,aL as fl,el as ml,aJ as gl,em as bl,en as Tn,eo as yl,ep as pt,eq as Ce,er as vl,es as xl,aU as wl,et as Sl,eu as Cl,ev as Tl,ew as kl,ex as Il,ey as Rl,ez as Pl,eA as Ml,eB as Bl,eC as Al,bE as rt,eD as Ol,eE as _l,eF as Dl,eG as Fl,eH as zl,eI as Ll,eJ as El,eK as Ul,eL as Vl,eM as Gl,eN as $l,eO as Hl,eP as Yn,eQ as Nl,eR as Jn}from"./App-6aj33Be9.js";import{s as g,a as uo,g as Fs}from"./spritesheetPalette-nkaeZj1I.js";import{v as jl,b as Xl,h as pe,s as Wl,A as Yl}from"./spectrumLut-QrFGtjD6.js";import{r as V,g as Go,p as $o,b as kn,c as In,a as ue,d as st,e as zs,f as qn,s as Zn,h as Jl,i as ql,j as Zl}from"./pixiContainerToString-De139bsn.js";import{T as Ql,C as Qn,a as Kl}from"./CanvasTextGenerator-BfO-hY6D.js";import"./index-L3TiWJoo.js";import"./CanvasPool-DpDRzPz3.js";var ec=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uBlend;

uniform sampler2D uTexture;
uniform sampler2D uBackTexture;

{FUNCTIONS}

void main()
{ 
    vec4 back = texture(uBackTexture, vTextureCoord);
    vec4 front = texture(uTexture, vTextureCoord);
    float blendedAlpha = front.a + back.a * (1.0 - front.a);
    
    {MAIN}
}
`,tc=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 backgroundUv;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,oc=`
struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlendUniforms {
  uBlend:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(0) @binding(3) var uBackTexture: texture_2d<f32>;

@group(1) @binding(0) var<uniform> blendUniforms : BlendUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

{FUNCTIONS}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>
) -> @location(0) vec4<f32> {


   var back =  textureSample(uBackTexture, uSampler, uv);
   var front = textureSample(uTexture, uSampler, uv);
   var blendedAlpha = front.a + back.a * (1.0 - front.a);
   
   var out = vec4<f32>(0.0,0.0,0.0,0.0);

   {MAIN}

   return out;
}`;class O extends E{constructor(e){const t=e.gpu,n=Kn({source:oc,...t}),r=on.from({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,i=Kn({source:ec,...s}),a=U.from({vertex:tc,fragment:i}),l=new nn({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:H.EMPTY}})}}function Kn(o){const{source:e,functions:t,main:n}=o;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const Rn=`
	float getLuminosity(vec3 c) {
		return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
	}

	vec3 setLuminosity(vec3 c, float lum) {
		float modLum = lum - getLuminosity(c);
		vec3 color = c.rgb + vec3(modLum);

		// clip back into legal range
		modLum = getLuminosity(color);
		vec3 modLumVec = vec3(modLum);

		float cMin = min(color.r, min(color.g, color.b));
		float cMax = max(color.r, max(color.g, color.b));

		if(cMin < 0.0) {
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0) {
			color = mix(modLumVec, color, (1.0 - modLum) / (cMax - modLum));
		}

		return color;
	}

	float getSaturation(vec3 c) {
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	vec3 setSaturationMinMidMax(vec3 cSorted, float s) {
		vec3 colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x) {
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else {
			colorSorted.y = 0.0;
			colorSorted.z = 0.0;
		}

		colorSorted.x = 0.0;

		return colorSorted;
	}

	vec3 setSaturation(vec3 c, float s) {
		vec3 color = c;

		if(color.r <= color.g && color.r <= color.b) {
			if(color.g <= color.b) {
				color = setSaturationMinMidMax(color.rgb, s).rgb;
			}
			else {
				color = setSaturationMinMidMax(color.rbg, s).rbg;
			}
		}
		else if(color.g <= color.r && color.g <= color.b) {
			if(color.r <= color.b) {
				color = setSaturationMinMidMax(color.grb, s).grb;
			}
			else {
				color = setSaturationMinMidMax(color.gbr, s).gbr;
			}
		}
		else {
			// Using bgr for both fixes part of hue
			if(color.r <= color.g) {
				color = setSaturationMinMidMax(color.brg, s).brg;
			}
			else {
				color = setSaturationMinMidMax(color.bgr, s).bgr;
			}
		}

		return color;
	}
    `,Pn=`
	fn getLuminosity(c: vec3<f32>) -> f32
	{
		return 0.3*c.r + 0.59*c.g + 0.11*c.b;
	}

	fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32>
	{
		var modLum: f32 = lum - getLuminosity(c);
		var color: vec3<f32> = c.rgb + modLum;

		// clip back into legal range
		modLum = getLuminosity(color);
		let modLumVec = vec3<f32>(modLum);

		let cMin: f32 = min(color.r, min(color.g, color.b));
		let cMax: f32 = max(color.r, max(color.g, color.b));

		if(cMin < 0.0)
		{
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0)
		{
			color = mix(modLumVec, color, (1 - modLum) / (cMax - modLum));
		}

		return color;
	}

	fn getSaturation(c: vec3<f32>) -> f32
	{
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32>
	{
		var colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x)
		{
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else
		{
			colorSorted.y = 0;
			colorSorted.z = 0;
		}

		colorSorted.x = 0;

		return colorSorted;
	}

	fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32>
	{
		var color = c;

		if (color.r <= color.g && color.r <= color.b)
		{
			if (color.g <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rgb, s)).rgb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rbg, s)).rbg;
			}
		}
		else if (color.g <= color.r && color.g <= color.b)
		{
			if (color.r <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.grb, s)).grb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.gbr, s)).gbr;
			}
		}
		else
		{
			// Using bgr for both fixes part of hue
			if (color.r <= color.g)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.brg, s)).brg;
			}
			else
			{
				color  = vec3<f32>(setSaturationMinMidMax(color.bgr, s)).bgr;
			}
		}

		return color;
	}
	`;class Ls extends O{constructor(){super({gl:{functions:`
                ${Rn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Pn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Ls.extension={name:"color",type:A.BlendMode};class Es extends O{constructor(){super({gl:{functions:`
                float colorBurn(float base, float blend)
                {
                    return max((1.0 - ((1.0 - base) / blend)), 0.0);
                }

                vec3 blendColorBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendColorBurn(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn blendColorBurn(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendColorBurn(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Es.extension={name:"color-burn",type:A.BlendMode};class Us extends O{constructor(){super({gl:{functions:`
                float colorDodge(float base, float blend)
                {
                    return base / (1.0 - blend);
                }

                vec3 blendColorDodge(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColorDodge(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return base / (1.0 - blend);
                }

                fn blendColorDodge(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                    out = vec4<f32>(blendColorDodge(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Us.extension={name:"color-dodge",type:A.BlendMode};class Vs extends O{constructor(){super({gl:{functions:`
                vec3 blendDarken(vec3 base, vec3 blend, float opacity)
                {
                    return (min(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendDarken(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn blendDarken(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (min(blend,base) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendDarken(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Vs.extension={name:"darken",type:A.BlendMode};class Gs extends O{constructor(){super({gl:{functions:`
                vec3 blendDifference(vec3 base, vec3 blend,  float opacity)
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendDifference(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn blendDifference(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendDifference(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Gs.extension={name:"difference",type:A.BlendMode};class $s extends O{constructor(){super({gl:{functions:`
                float divide(float base, float blend)
                {
                    return (blend > 0.0) ? clamp(base / blend, 0.0, 1.0) : 1.0;
                }

                vec3 blendDivide(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendDivide(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn divide(base: f32, blend: f32) -> f32
                {
                    return select(1.0, clamp(base / blend, 0.0, 1.0), blend > 0.0);
                }

                fn blendDivide(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendDivide(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}$s.extension={name:"divide",type:A.BlendMode};class Hs extends O{constructor(){super({gl:{functions:`
                vec3 exclusion(vec3 base, vec3 blend)
                {
                    return base + blend - 2.0 * base * blend;
                }

                vec3 blendExclusion(vec3 base, vec3 blend, float opacity)
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendExclusion(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn exclusion(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return base+blend-2.0*base*blend;
                }

                fn blendExclusion(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendExclusion(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Hs.extension={name:"exclusion",type:A.BlendMode};class Ns extends O{constructor(){super({gl:{functions:`
                float hardLight(float base, float blend)
                {
                    return (blend < 0.5) ? 2.0 * base * blend : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
                }

                vec3 blendHardLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendHardLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn hardLight(base: f32, blend: f32) -> f32
                {
                    return select(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, blend < 0.5);
                }

                fn blendHardLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendHardLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Ns.extension={name:"hard-light",type:A.BlendMode};class js extends O{constructor(){super({gl:{functions:`
                float hardMix(float base, float blend)
                {
                    return (base + blend >= 1.0) ? 1.0 : 0.0;
                }

                vec3 blendHardMix(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blended = vec3(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendHardMix(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn hardMix(base: f32, blend: f32) -> f32
                {
                    return select(0.0, 1.0, base + blend >= 1.0);
                }

                fn blendHardMix(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendHardMix(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}js.extension={name:"hard-mix",type:A.BlendMode};class Xs extends O{constructor(){super({gl:{functions:`
                vec3 blendLighten(vec3 base, vec3 blend, float opacity)
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLighten(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn blendLighten(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLighten(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Xs.extension={name:"lighten",type:A.BlendMode};class Ws extends O{constructor(){super({gl:{functions:`
                float linearBurn(float base, float blend)
                {
                    return max(0.0, base + blend - 1.0);
                }

                vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLinearBurn(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn blendLinearBurn(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendLinearBurn(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Ws.extension={name:"linear-burn",type:A.BlendMode};class Ys extends O{constructor(){super({gl:{functions:`
                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLinearDodge(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1, base + blend);
                }

                fn blendLinearDodge(base:vec3<f32>, blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLinearDodge(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Ys.extension={name:"linear-dodge",type:A.BlendMode};class Js extends O{constructor(){super({gl:{functions:`
                float linearBurn(float base, float blend) {
                    return max(0.0, base + blend - 1.0);
                }

                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                float linearLight(float base, float blend) {
                    return (blend <= 0.5) ? linearBurn(base,2.0*blend) : linearBurn(base,2.0*(blend-0.5));
                }

                vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendLinearLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base + blend);
                }

                fn linearLight(base: f32, blend: f32) -> f32
                {
                    return select(linearBurn(base,2.0*(blend-0.5)), linearBurn(base,2.0*blend), blend <= 0.5);
                }

                fn blendLinearLightOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLinearLightOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Js.extension={name:"linear-light",type:A.BlendMode};class qs extends O{constructor(){super({gl:{functions:`
                ${Rn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Pn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}qs.extension={name:"luminosity",type:A.BlendMode};class Zs extends O{constructor(){super({gl:{functions:`
                vec3 negation(vec3 base, vec3 blend)
                {
                    return 1.0-abs(1.0-base-blend);
                }

                vec3 blendNegation(vec3 base, vec3 blend, float opacity)
                {
                    return (negation(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendNegation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn blendNegation(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return 1.0-abs(1.0-base-blend);
                }

                fn blendNegationOpacity(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendNegationOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Zs.extension={name:"negation",type:A.BlendMode};class Qs extends O{constructor(){super({gl:{functions:`
                float overlay(float base, float blend)
                {
                    return (base < 0.5) ? (2.0*base*blend) : (1.0-2.0*(1.0-base)*(1.0-blend));
                }

                vec3 blendOverlay(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendOverlay(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn overlay(base: f32, blend: f32) -> f32
                {
                    return select((1.0-2.0*(1.0-base)*(1.0-blend)), (2.0*base*blend), base < 0.5);
                }

                fn blendOverlay(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendOverlay(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Qs.extension={name:"overlay",type:A.BlendMode};class Ks extends O{constructor(){super({gl:{functions:`
                float pinLight(float base, float blend)
                {
                    return (blend <= 0.5) ? min(base, 2.0 * blend) : max(base, 2.0 * (blend - 0.5));
                }

                vec3 blendPinLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendPinLight(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn pinLight(base: f32, blend: f32) -> f32
                {
                    return select(max(base,2.0*(blend-0.5)), min(base,2.0*blend), blend <= 0.5);
                }

                fn blendPinLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendPinLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Ks.extension={name:"pin-light",type:A.BlendMode};class ei extends O{constructor(){super({gl:{functions:`
                ${Rn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Pn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ei.extension={name:"saturation",type:A.BlendMode};class ti extends O{constructor(){super({gl:{functions:`
                float softLight(float base, float blend)
                {
                    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
                }

                vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendSoftLight(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn softLight(base: f32, blend: f32) -> f32
                {
                    return select(2.0 * base * blend + base * base * (1.0 - 2.0 * blend), sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend), blend < 0.5);
                }

                fn blendSoftLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendSoftLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ti.extension={name:"soft-light",type:A.BlendMode};class oi extends O{constructor(){super({gl:{functions:`
                float subtract(float base, float blend)
                {
                    return max(0.0, base - blend);
                }

                vec3 blendSubtract(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendSubtract(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                fn subtract(base: f32, blend: f32) -> f32
                {
                    return max(0, base - blend);
                }

                fn blendSubtract(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendSubtract(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}oi.extension={name:"subtract",type:A.BlendMode};class ni extends O{constructor(){super({gl:{functions:`
                float colorBurn(float base, float blend)
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                float colorDodge(float base, float blend)
                {
                    return min(1.0, base / (1.0-blend));
                }

                float vividLight(float base, float blend)
                {
                    return (blend < 0.5) ? colorBurn(base,(2.0*blend)) : colorDodge(base,(2.0*(blend-0.5)));
                }

                vec3 blendVividLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendVividLight(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base / (1.0-blend));
                }

                fn vividLight(base: f32, blend: f32) -> f32
                {
                    return select(colorDodge(base,(2.0*(blend-0.5))), colorBurn(base,(2.0*blend)), blend<0.5);
                }

                fn blendVividLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendVividLight(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ni.extension={name:"vivid-light",type:A.BlendMode};var nc=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,er=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct AlphaUniforms {
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {
 
    var sample = textureSample(uTexture, uSampler, uv);
    
    return sample * alphaUniforms.uAlpha;
}`;const ri=class si extends E{constructor(e){e={...si.defaultOptions,...e};const t=on.from({vertex:{source:er,entryPoint:"mainVertex"},fragment:{source:er,entryPoint:"mainFragment"}}),n=U.from({vertex:be,fragment:nc,name:"alpha-filter"}),{alpha:r,...s}=e,i=new nn({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:t,glProgram:n,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ri.defaultOptions={alpha:1};let rc=ri;var sc=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    if (uAlpha == 0.0) {
        finalColor = color;
        return;
    }

    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    vec4 result;

    result.r = (uColorMatrix[0] * color.r);
        result.r += (uColorMatrix[1] * color.g);
        result.r += (uColorMatrix[2] * color.b);
        result.r += (uColorMatrix[3] * color.a);
        result.r += uColorMatrix[4];

    result.g = (uColorMatrix[5] * color.r);
        result.g += (uColorMatrix[6] * color.g);
        result.g += (uColorMatrix[7] * color.b);
        result.g += (uColorMatrix[8] * color.a);
        result.g += uColorMatrix[9];

    result.b = (uColorMatrix[10] * color.r);
       result.b += (uColorMatrix[11] * color.g);
       result.b += (uColorMatrix[12] * color.b);
       result.b += (uColorMatrix[13] * color.a);
       result.b += uColorMatrix[14];

    result.a = (uColorMatrix[15] * color.r);
       result.a += (uColorMatrix[16] * color.g);
       result.a += (uColorMatrix[17] * color.b);
       result.a += (uColorMatrix[18] * color.a);
       result.a += uColorMatrix[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    finalColor = vec4(rgb, result.a);
}
`,tr=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
  };
  
fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uTexture, uSampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class ic extends E{constructor(e={}){const t=new nn({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),n=on.from({vertex:{source:tr,entryPoint:"mainVertex"},fragment:{source:tr,entryPoint:"mainFragment"}}),r=U.from({vertex:be,fragment:sc,name:"color-matrix-filter"});super({...e,gpuProgram:n,glProgram:r,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const[n,r,s]=_e.shared.setValue(e).toArray(),i=[n,0,0,0,0,0,r,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),r=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=n+(1-n)*i,c=i*(1-n)-a*r,u=i*(1-n)+a*r,d=i*(1-n)+a*r,h=n+i*(1-n),p=i*(1-n)-a*r,f=i*(1-n)-a*r,m=i*(1-n)+a*r,v=n+i*(1-n),x=[l,c,u,0,0,d,h,p,0,0,f,m,v,0,0,0,0,0,1,0];this._loadMatrix(x,t)}contrast(e,t){const n=(e||0)+1,r=-.5*(n-1),s=[n,0,0,0,r,0,n,0,0,r,0,0,n,0,r,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,r=(n-1)*-.5,s=[n,r,r,0,0,r,n,r,0,0,r,r,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,r,s){e||(e=.2),t||(t=.15),n||(n=16770432),r||(r=3375104);const i=_e.shared,[a,l,c]=i.setValue(n).toArray(),[u,d,h]=i.setValue(r).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,t,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,s)}night(e,t){e||(e=.1);const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}class ae extends N{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:n=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=t,[p]=u;super({...h,texture:p instanceof H?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=n,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Re.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Re.shared.add(this.update,this,Yi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,n=this.animationSpeed*t,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=n/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=n;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(r=>{this.texture!==r&&r.destroy(n)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let n=0;n<e.length;++n)t.push(H.from(e[n]));return new ae(t)}static fromImages(e){const t=[];for(let n=0;n<e.length;++n)t.push(H.from(e[n]));return new ae(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof H)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Re.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Re.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ac{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new Ji,this.observer=t,this.position=new We(this,0,0),this.scale=new We(this,1,1),this.pivot=new We(this,0,0),this.skew=new We(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const ii=class Kt extends ss{constructor(...e){let t=e[0]||{};t instanceof H&&(t={texture:t}),e.length>1&&(Wt(Yt,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...Kt.defaultOptions,...t};const{texture:n,anchor:r,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=t??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new We({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=n,this._width=l??n.width,this._height=c??n.height,this._tileTransform=new ac({observer:{_onUpdate:()=>this.onViewUpdate()}}),r&&(this.anchor=r),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=d??!1}static from(e,t={}){return typeof e=="string"?new Kt({texture:qi.get(e),...t}):new Kt({texture:e,...t})}get uvRespectAnchor(){return Wt(Yt,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){Wt(Yt,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=H.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,n=this._width,r=this._height;e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}containsPoint(e){const t=this._width,n=this._height,r=-t*this._anchor._x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this._anchor._y,e.y>=s&&e.y<=s+n)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(n)}this._texture=null}};ii.defaultOptions={texture:H.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let lc=ii;class cc extends ss{constructor(e,t){const{text:n,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new We({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<=s+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function uc(o,e){let t=o[0]??{};return(typeof t=="string"||o[1])&&(Wt(Yt,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:o[1]}),t}class dc extends cc{constructor(...e){const t=uc(e,"Text");super(t,Ql),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof Lo?t.textureStyle:new Lo(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let n=0,r=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=Qn.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Qn.returnCanvasAndContext(i),n=s.width,r=s.height}else{const s=Kl.measureText(this._text,this._style);n=s.width,r=s.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}}const ai=class li extends y{constructor(e={}){e={...li.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const n=e[t];if(n.parentRenderLayer){if(n.parentRenderLayer===this)continue;n.parentRenderLayer.detach(n)}this.renderLayerChildren.push(n),n.parentRenderLayer=this;const r=this.renderGroup||this.parentRenderGroup;r&&(r.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const n=e[t],r=this.renderLayerChildren.indexOf(n);r!==-1&&this.renderLayerChildren.splice(r,1),n.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,n){const r=this.renderLayerChildren,s=r.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)r[i].parent||Zi("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",r[i]),r[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,n){if(!e)return;const r=this.renderLayerChildren;for(let s=0;s<r.length;s++)r[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};ai.defaultOptions={sortableChildren:!1,sortFunction:(o,e)=>o.zIndex-e.zIndex};let or=ai;var hc=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;uniform sampler2D uMask;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);float maskVal=texture(uMask,vTextureCoord).r;finalColor=mix(c,lutColourReplace(uLut,c),maskVal);}`;const pc=U.from({vertex:be,fragment:hc,name:"palette-swop-filter1"});class Ke extends E{constructor({paletteSwaps:e,lutType:t},n=H.WHITE){const r=(t==="voronoi"?jl:Xl)(e);super({glProgram:pc,resources:{colorReplaceUniforms:{},uLut:r.source,uMask:n.source}}),this.mask=n,this.#e=r}#e;destroy(e){const t=e===!0||typeof e=="object"&&e.destroyPrograms,n=e===!0||typeof e=="object"&&e.destroyLutTexture,r=this.lutTexture!==H.WHITE&&e===!0||typeof e=="object"&&e.destroyMask;n&&this.#e?.destroy(!0),this.#e=null,r&&this.mask?.destroy(!0),super.destroy(t)}get lutTexture(){return this.#e}}const ci={ambient:[]},fc=ye(Ct).filter(o=>o.startsWith("shadow.")||o.startsWith("shadowMask.")||o.startsWith("hud.")).toArray(),mc=o=>typeof o=="function"?ye(Ct).filter(o):o,gc=(o,e)=>new Ke({paletteSwaps:is(g,([t])=>t==="replaceDark"||t==="replaceLight"?[t,o]:[t,e]),lutType:"sparse"}),bc=(o,{ambient:e,textureSpecific:t=et,noReplacePlaceholderTextures:n=et},r=Qi())=>{const s=[];for(const{textureIds:u,paletteSwaps:d}of t){const h=Gn(o,{rects:{textureIds:u,color:vo},clearColour:xo}),p=new Ke({paletteSwaps:d,lutType:"sparse"},h);s.push(p)}const i=n.length>0?gc(xo,vo):void 0,a=Gn(o,{clearColour:vo,rects:{textureIds:ea(fc,ye(t).filter(({dodgeAmbient:u})=>u).flatMap(({textureIds:u})=>mc(u))),color:xo},placeholderColoursMasks:i?{textureIds:n,filter:i,originalSpritesheet:me()}:void 0});i?.destroy({destroyLutTexture:!0,destroyMask:!0});for(const u of e){const d=new Ke(u,a);s.push(d)}const l=new N(r);l.filters=s;const c=ze.create({width:r.width,height:r.height});o.render({container:l,target:c}),l.destroy(!1),a.destroy();for(const u of s)u instanceof Ke?u.destroy({destroyLutTexture:!0,destroyMask:!0,destroyPrograms:!1}):u.destroy(!1);return c},ut=(o,e,t)=>{const n=bc(o,e,t),r=new Ki(n.source,structuredClone(Fe));return r.parseSync(),r.textureSource.scaleMode="nearest",r},Mn={ambient:[{paletteSwaps:uo,lutType:"sparse"}]},so=(o,e,t)=>{const n=H.from(e.textureSource),r=ut(o,t,n);return n.destroy(),e.textureSource.destroy(),e.destroy(!0),r};let Ho;const yc=o=>{Ho=ut(o,{ambient:[{lutType:"voronoi",paletteSwaps:{pureBlack:new _e(0),shadow:new _e(16777215),redShadow:new _e(16777215)}}]})},vc=()=>{if(Ho===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ho};ta.add(Ls,Es,Us,Vs,Gs,$s,Hs,Ns,js,Xs,Ws,Js,Ys,qs,Zs,Qs,Ks,ei,ti,oi,ni);const xc=async(o,{forceRefetch:e}=X)=>await w.dispatch(oa.endpoints.getCampaign.initiate(o,{forceRefetch:e}));H.from;na.prototype.destroy;const wc=o=>{o.ticker.remove(o.render,o)},ui={white:{basic:{main:"white",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"white",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}}},yellow:{basic:{main:"yellow",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}},dimmed:{main:"yellow",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!1}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}}},magenta:{basic:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}},dimmed:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}}},cyan:{basic:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}},dimmed:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!0},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}}},green:{basic:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}}}},_t=o=>ui[o.hue][o.shade],No={head:"pastelBlue",heels:"pink"},nr=(o,e)=>{const t=_t(o.color).edges[e];return Y(t.hue,t.dimInOriginal?"dimmed":"basic")},Sc=Ct.filter(o=>o.startsWith("door.")),jo=o=>/\.floor$/.test(o),Xo=o=>/\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(o),rr=o=>/door\.legs\.pillar/.test(o),Cc=o=>/\.wall\.[^.]+\.left$/.test(o),So=o=>jo(o)||Xo(o),Tc=(o,e,t)=>{if(o)return{ambient:[{lutType:"sparse",paletteSwaps:V(t.hue,t.shade==="dimmed")},t.shade==="basic"?di(e,t):{lutType:"sparse",paletteSwaps:{...uo}}],textureSpecific:[...Ic(e,t),...kc(e,t),...Rc(t)],noReplacePlaceholderTextures:Sc}},kc=(o,e)=>{const{edges:t}=ui[e.hue][e.shade],n=V(t.right.hue,e.shade==="dimmed","light-mid"),r=V(t.towards.hue,e.shade==="dimmed","mid-dark");return[{textureIds:["floorEdge.half.right","floorEdge.right","generic.door.floatingThreshold.y"],paletteSwaps:n},{textureIds:["floorEdge.half.towards","floorEdge.towards","generic.door.floatingThreshold.x"],paletteSwaps:r}]},Ic=(o,e)=>{if(o==="jail")return[{textureIds:So,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];if(o==="blacktooth"&&e.shade==="dimmed")return[{textureIds:Xo,paletteSwaps:V(e.hue,!0,"light-mid")}];if(e.hue==="white"||e.hue==="yellow")switch(o){case"market":return[{textureIds:So,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];case"egyptus":return[{textureIds:rr,paletteSwaps:V(e.hue,e.shade==="dimmed","light-dark")},{textureIds:jo,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")},{textureIds:Cc,paletteSwaps:V(e.hue,e.shade==="dimmed","light-mid")},{textureIds:Xo,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];case"moonbase":case"penitentiary":case"safari":case"bookworld":return[{textureIds:jo,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];case"blacktooth":return[{textureIds:rr,paletteSwaps:V(e.hue,e.shade==="dimmed","light-dark")},{textureIds:So,paletteSwaps:V(e.hue,e.shade==="dimmed","light-mid")}]}return et},Rc=o=>{const{hue:e,shade:t}=o;return e==="white"||e==="yellow"?[{textureIds:["book.x","book.y"],paletteSwaps:{...V(e,t==="dimmed","light-mid"),shadow:Go(`swop_${e}Dim`,t==="dimmed")}}]:t==="dimmed"?[{textureIds:["book.x","book.y"],paletteSwaps:{...V(o.hue,!0,o.hue==="cyan"?"light-mid":"mid-dark")}}]:et},Pc={blacktooth:{pureBlack:pe(g.moss,.15)},safari:{pureBlack:pe(g.moss,.17)},jail:{pureBlack:pe(g.redShadow,.2)},egyptus:{pureBlack:pe(g.redShadow)},moonbase:{shadow:g.shadow_greyBlue,pureBlack:pe(g.metallicBlue,.2)},bookworld:{shadow:g.shadow_brown,pureBlack:pe(g.highlightBeige,.1)},penitentiary:{pureBlack:pe(g.midGrey,.2)}},Mc={yellow:{shadow:g.shadow_brown},white:{shadow:g.shadow_greyBlue},magenta:{shadow:g.shadow_magenta},cyan:{shadow:g.shadow_blue}},di=(o,e)=>({lutType:"sparse",paletteSwaps:{...Mc[e.hue]??X,...Pc[o]??X}});let Ye,Wo=ci;const hi=()=>{Ye!==void 0&&(Ye.textureSource.destroy(),Ye.destroy(!0),Ye=void 0)},Bc=(o,e,t,n)=>{hi(),Wo=Tc(e,t,n)??ci,Ye=ut(o,Wo)},Ac=()=>Ye,eo=o=>{let e=g[o];for(const t of Wo.ambient)e=t.paletteSwaps[o]??e;return e};let Be;const Bn={lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,pastelBlue:g.lightGrey,metallicBlue:g.midGrey,replaceLight:g.lightGrey,replaceDark:g.midGrey},Oc=as(Bn,"metallicBlue","pastelBlue"),_c=as(Bn,"pink"),Dc={ambient:[{paletteSwaps:Bn,lutType:"sparse"}],textureSpecific:[{textureIds:Ct.filter(o=>o.startsWith("head.")),paletteSwaps:Oc,dodgeAmbient:!0},{textureIds:Ct.filter(o=>o.startsWith("heels.")),paletteSwaps:_c,dodgeAmbient:!0}]},Fc=()=>{Be!==void 0&&(Be.textureSource.destroy(),Be.destroy(!0),Be=void 0)},zc=(o,e,t)=>{Fc();let n=ut(o,Dc);t.shade==="dimmed"?n=so(o,n,Mn):n=so(o,n,{ambient:[di(e,t)]}),Be=n},Lc=()=>{if(Be===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Be};let Ae;const Ec={midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,shadow:g.redShadow,pastelBlue:g.lightBeige,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige},Uc=()=>{Ae!==void 0&&(Ae.textureSource.destroy(),Ae.destroy(!0),Ae=void 0)},Vc=(o,e)=>{Uc();let t=ut(o,{ambient:[{paletteSwaps:Ec,lutType:"sparse"}]});e&&(t=so(o,t,Mn)),Ae=t},Gc=()=>{if(Ae===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ae};let Oe;const $c={pastelBlue:g.moss,metallicBlue:g.moss,pink:g.moss},Hc=()=>{Oe!==void 0&&(Oe.textureSource.destroy(),Oe.destroy(!0),Oe=void 0)},Nc=(o,e)=>{Hc();let t=ut(o,{ambient:[{paletteSwaps:$c,lutType:"sparse"}]});e&&(t=so(o,t,Mn)),Oe=t},jc=()=>{if(Oe===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Oe},de=o=>{try{switch(o){case"original":return me();case"deactivated":return Lc();case"doughnutted":return Gc();case"for-current-room":return Ac();case"sceneryPlayer":return jc();case"uncolourised":return vc();default:return o}}catch(e){throw new Error(`could not get spritesheet variant "${o}"`,{cause:e})}},xt=(o="for-current-room",e)=>de(o).textures[e],to=o=>{if(o===void 0)return 0;const{shieldCollectedAt:e,gameTime:t}=o;return e!==null&&e+$n>t?100-Math.ceil((t-e)/($n/100)):0},An=o=>o.type==="headOverHeels"?to(o.state.head)>0||to(o.state.heels)>0:to(o.state)>0,On=o=>{const e=100*S.x;return o.gameWalkDistance<=o.fastStepsStartedAtDistance+e?100-Math.ceil((o.gameWalkDistance-o.fastStepsStartedAtDistance)/S.x):0};var Xc=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let Yo=rn(w.getState());w.subscribe(()=>{Yo=rn(w.getState())});const Wc=U.from({vertex:be,fragment:Xc,name:"outline-filter"});class ge extends E{outlineWidth;constructor({color:e,width:t}){const n=t??Yo;super({glProgram:Wc,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.outlineWidth=t;const r=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();r.uOutline[0]=s,r.uOutline[1]=i,r.uOutline[2]=a}apply(e,t,n,r){const s=this.resources.colorReplaceUniforms.uniforms,i=this.outlineWidth??Yo;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,n,r)}}const Dt={...is(g,([o,e])=>[o,new ge({color:e})]),black1pxFilter:new ge({color:g.pureBlack,width:1})},Co={x:.5,y:1},sr=o=>typeof o!="string"&&Object.hasOwn(o,"animationId"),Jo=o=>{const{anchor:e,flipX:t,pivot:n,x:r,y:s,times:i,label:a}=o;if(o.times){const c=ra(i);if(Ee(c)>=2){const d=new y({label:a??"timesXyz"});for(let{x:h}=c;h>=1;h--)for(let{y:p}=c;p>=1;p--)for(let f=1;f<=c.z;f++){const m={...o,label:`(${h},${p},${f})`,...o.subSpriteVariations?.(h-1,p-1,f-1),subSpriteVariations:void 0};"randomiseStartFrame"in m&&(m.randomiseStartFrame=`${m.randomiseStartFrame}${h},${p},${f}`),delete m.times;const v=Jo(m),x=Le({x:h-1,y:p-1,z:f-1});v.x+=x.x,v.y+=+x.y,d.addChild(v)}return d}}if(o.subSpriteVariations!==void 0)return Jo({...o,...o.subSpriteVariations(0,0,0),subSpriteVariations:void 0});let l;if(sr(o))l=Yc(o);else{const{textureId:c}=o,u=de(o.spritesheetVariant??"original");l=new N(c!==void 0?u.textures[c]:H.EMPTY)}if(e===void 0&&n===void 0)if(sr(o))l.anchor=Co;else{const{textureId:c}=o,u=c!==void 0?de(o.spritesheetVariant??"original").data.frames[c]:void 0;if(u!==void 0){const d=u.frame;d.pivot!==void 0?l.pivot=d.pivot:l.anchor=Co}else l.anchor=Co}else e!==void 0&&(l.anchor=e),n!==void 0&&(l.pivot=n);return r!==void 0&&(l.x=r),s!==void 0&&(l.y=s),a!==void 0&&(l.label=a),l.eventMode="static",t===!0&&(l.scale.x=-1),l},pi=(o,e=!1)=>{const t=Re.shared.speed,n=e||t===0?0:Math.sqrt(t)/t;return Fe.animations[o].animationSpeed*n},_n=o=>o.map(e=>({texture:e,time:sn}));function Yc({animationId:o,reverse:e,playOnce:t,paused:n,randomiseStartFrame:r,spritesheetVariant:s}){const i=de(s).animations[o],a=_n(i);e&&a.reverse();const l=new ae(a);return l.animationSpeed=pi(o,n),l.gotoAndPlay(r!==void 0?Math.floor(ls(r)*a.length):0),t!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),t==="and-destroy"&&(l.visible=!1)}),l}const b=Jo;class Jc extends ae{destroy(e){const t=this.textures.map(n=>"texture"in n?n.texture:n).filter(n=>n instanceof ze);super.destroy(e);for(const n of t)n.destroy(!0)}}class qc extends N{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:this.texture instanceof ze,children:e}):super.destroy({...e,texture:t,textureSource:this.texture instanceof ze})}}const kt=(o,e,t)=>{const n=e.getLocalBounds(),r=Math.ceil(n.maxX-n.minX),s=Math.ceil(n.maxY-n.minY),i=t!==void 0?t.width===r&&t.height===s:!1,a=i?t:ze.create({width:r,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=n.minX,e.y-=n.minY;try{o.render({container:e,target:a,clear:i})}catch(u){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${$o(e)}`,{cause:u})}return e.x=l,e.y=c,a},se=(o,e,t,n)=>{const r=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof ze?t.texture:void 0,i=kt(o,e,s),a=t||new qc;return a.texture=i,a.label=n??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Dn=(o,e,t,n)=>{if(e instanceof ae||e instanceof N)return e;const r=e.getLocalBounds(),s=e.children.find(l=>l instanceof ae)?.textures.length??1,i=ye(sa(0,s)).map(l=>{if(l>0)for(const c of e.children)c instanceof ae&&c.gotoAndStop((c.currentFrame+1)%s);return kt(o,e)}).toArray(),a=new Jc(_n(i));return a.animationSpeed=pi(t,!1),a.gotoAndPlay(0),a.label=`animated sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},dt=(o,e)=>e instanceof N?e:se(o,e),Zc=o=>{const e=`hud.char.${ia(o)}`;try{ds(e)}catch(t){throw new Error(`no texture id for char "${o}": ${t.message}`,{cause:t})}return e},Qc=o=>typeof o=="string"?o==="infinite"?"":o:o.toString();class D extends y{#e;#t="";#n;#o;#r;#s;#i;constructor({pixiRenderer:e,doubleHeight:t=!1,doubleWidth:n=!1,outline:r=!1,label:s="text",x:i,y:a,tint:l,text:c}){super({label:s,x:i,y:a,tint:l}),this.#e=e,this.#s=t?2:1,this.#i=n?2:1,this.#n=new N,this.#n.y=-(Pe.h*this.#s+1),this.addChild(this.#n),this.#r=new y,this.addChild(this.#r),this.#o=new y,this.#o.scale={x:this.#i,y:this.#s},r&&(this.#o.filters=new ge({color:g.pureBlack,width:1})),this.#r.addChild(this.#o),c!==void 0&&(this.text=c)}get text(){return this.#t}set text(e){const t=Qc(e);this.#t!==t&&(this.#c(t),this.#r.visible=!0,this.#r.boundsArea=new cs(-1,-1,(Pe.w*t.length+2)*this.#i,(Pe.h+2)*this.#s),this.#n.texture&&this.#n.texture.destroy(!0),this.#n.texture=kt(this.#e,this.#r),this.#n.x=-this.#n.texture.frame.width/2,this.#r.visible=!1,this.#t=t)}#c(e){const t=us(e),n=this.#o.children.length,r=t!==n;try{const s=me().textures;let i=0;for(const a of e){const l=Zc(a);let c;i<n?(c=this.#o.getChildAt(i),c.texture=s[l]):(c=new N(s[l]),this.#o.addChild(c)),i++}}catch(s){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(s),window.invalid=e,new Error(`could not show text "${e}" in container because: "${s.message}"`,{cause:s})}if(r){t<n&&this.#o.removeChildren(t);for(let s=0;s<t;s++){const i=this.#o.getChildAt(s);i.x=s*Pe.w}}}destroy(e){this.#n.destroy({texture:!0,textureSource:!0}),super.destroy(e)}get characterSpriteContainer(){return this.#o}}function Kc(o){return{all:o=o||new Map,on:function(e,t){var n=o.get(e);n?n.push(t):o.set(e,[t])},off:function(e,t){var n=o.get(e);n&&(t?n.splice(n.indexOf(t)>>>0,1):o.set(e,[]))},emit:function(e,t){var n=o.get(e);n&&n.slice().map(function(r){r(t)}),(n=o.get("*"))&&n.slice().map(function(r){r(e,t)})}}}class Fn{constructor(e=2e3){this.reportIntervalMs=e}static instance=new Fn;#e={physics:{totalMs:0,count:0},hudUpdate:{totalMs:0,count:0},updateSceneGraph:{totalMs:0,count:0},pixiRender:{totalMs:0,count:0}};#t={};#n=performance.now();#o={frameCount:0,elapsedMs:0,fps:0,theoreticalFps:0,phases:{physics:{avgMs:0,percentage:0},hudUpdateSceneGraph:{avgMs:0,percentage:0},updateSceneGraph:{avgMs:0,percentage:0},pixiRender:{avgMs:0,percentage:0},total:{avgMs:0,percentage:0}}};#r=Kc();startPhysics(){this.#t.physicsStart=performance.now()}endPhysics(){if(this.#t.physicsStart===void 0){console.warn("endPhysics called without startPhysics");return}const e=performance.now()-this.#t.physicsStart;this.#e.physics.totalMs+=e,this.#e.physics.count++,this.#t.physicsStart=void 0}startHudUpdate(){this.#t.hudUpdateStart=performance.now()}endHudUpdate(){if(this.#t.hudUpdateStart===void 0){console.warn("endHudUpdate called without startHudUpdate");return}const e=performance.now()-this.#t.hudUpdateStart;this.#e.hudUpdate.totalMs+=e,this.#e.hudUpdate.count++,this.#t.hudUpdateStart=void 0}startUpdateSceneGraph(){this.#t.updateSceneGraphStart=performance.now()}endUpdateSceneGraph(){if(this.#t.updateSceneGraphStart===void 0){console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");return}const e=performance.now()-this.#t.updateSceneGraphStart;this.#e.updateSceneGraph.totalMs+=e,this.#e.updateSceneGraph.count++,this.#t.updateSceneGraphStart=void 0}startPixiRender(){this.#t.pixiRenderStart=performance.now()}endPixiRender(){if(this.#t.pixiRenderStart===void 0){console.warn("endPixiRender called without startPixiRender");return}const e=performance.now()-this.#t.pixiRenderStart;this.#e.pixiRender.totalMs+=e,this.#e.pixiRender.count++,this.#t.pixiRenderStart=void 0}tickDone(){const e=performance.now();e-this.#n>=this.reportIntervalMs&&this.#s(e)}on(e){this.#r.on("stats",e)}off(e){this.#r.off("stats",e)}#s(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e;t.count===0&&n.count===0&&r.count===0&&s.count===0||(this.#i(e),this.#r.emit("stats",this.#o),this.reset(e))}#i(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e,i=t.count>0?t.totalMs/t.count:0,a=n.count>0?n.totalMs/n.count:0,l=r.count>0?r.totalMs/r.count:0,c=s.count>0?s.totalMs/s.count:0,u=i+a+l+c,d=Math.max(t.count,n.count,r.count,s.count),h=e-this.#n;this.#o.frameCount=d,this.#o.elapsedMs=h,this.#o.fps=d/h*1e3,this.#o.theoreticalFps=u>0?1e3/u:0,this.#o.phases.physics.avgMs=i,this.#o.phases.physics.percentage=i/u*100,this.#o.phases.hudUpdateSceneGraph.avgMs=a,this.#o.phases.hudUpdateSceneGraph.percentage=a/u*100,this.#o.phases.updateSceneGraph.avgMs=l,this.#o.phases.updateSceneGraph.percentage=l/u*100,this.#o.phases.pixiRender.avgMs=c,this.#o.phases.pixiRender.percentage=c/u*100,this.#o.phases.total.avgMs=u,this.#o.phases.total.percentage=100}reset(e=performance.now()){this.#e.physics.totalMs=0,this.#e.physics.count=0,this.#e.hudUpdate.totalMs=0,this.#e.hudUpdate.count=0,this.#e.updateSceneGraph.totalMs=0,this.#e.updateSceneGraph.count=0,this.#e.pixiRender.totalMs=0,this.#e.pixiRender.count=0,this.#n=e}}const It=Fn.instance;hs({predicate(o,e,t){return Me(e)!==Me(t)},effect(o){It.reset()}});class ir{constructor(e){this.renderContext=e,this.#t=new D({pixiRenderer:e.general.pixiRenderer,label:"fps",outline:!0,y:Pe.h,text:"..."}),this.#e.addChild(this.#t),It.on(this.tick)}#e=new y({label:"FpsRenderer"});#t;#n=!1;#o;set isDark(e){this.#n!==e&&(this.#n=e,this.#s())}#r(e,t){const n=e/t;return n>1.95?"white":n>1.67?"highlightBeige":n>.97?"moss":n>.92?"pastelBlue":n>.83?"metallicBlue":n>.67?"pink":"midRed"}#s(){const e=this.#o;this.#t.text=e===void 0?"...":`${Math.round(e)} FPS`;const t=e===void 0?"white":this.#r(e,60),n=Fs(this.#n);this.#t.tint=n[t]}tick=e=>{this.#o=e.fps,this.#s()};get output(){return this.#e}destroy(){It.off(this.tick),this.#e.destroy()}}const To={colourised:{jump:"pastelBlue",fire:"highlightBeige",carry:"moss",carryAndJump:"midRed",menu:"lightGrey",map:"lightGrey"},zx:{jump:"blue",fire:"yellow",carry:"green",carryAndJump:"red",menu:"white",map:"white"}};class ho extends y{constructor(e,t,n,r){super({label:`arcadeButton (${t})`}),this.colourised=e,this.which=t,this.pixiRenderer=n,this.#t=new y({label:"depress"}),this.addChild(this.#t),this.#o=new N({anchor:{x:.5,y:1}}),this.#r=new N({anchor:{x:.5,y:1}}),this.#r.visible=!1,this.#t.addChild(this.#o),this.#t.addChild(this.#r),this.#e=new y({label:"surface"});const s=b({textureId:"button.surfaceMask",label:"surfaceMask",spritesheetVariant:"original"});this.#t.addChild(s),this.#e.mask=s,this.#t.addChild(this.#e),this.shownOnSurface=r}#e;#t;#n;#o;#r;get shownOnSurface(){return this.#n}set shownOnSurface(e){this.#n!==void 0&&this.#n.destroy({children:!0}),this.#n=e,e!==void 0&&this.#e.addChild(e)}set pressed(e){this.#o.visible=!e,this.#r.visible=e,this.#t.y=e?1:0}generateButtonSpriteTextures(e){const{which:t,colourised:n}=this,r=b({textureId:"button",spritesheetVariant:"original"}),s=n?Go(To.colourised[t],e.color.shade==="dimmed"):Y(To.zx[t]),i=n?pe(s,.66):Y(To.zx[t],"dimmed"),a=n?Go("pureBlack",e.color.shade==="dimmed"):Y("black"),l=new Ke({lutType:"sparse",paletteSwaps:{replaceLight:s,replaceDark:i,pureBlack:a}});r.filters=l;const c=kt(this.pixiRenderer,r,this.#o.texture===H.EMPTY?void 0:this.#o.texture);r.texture=me().textures["button.pressed"];const u=kt(this.pixiRenderer,r,this.#r.texture===H.EMPTY?void 0:this.#r.texture);this.#o.texture=c,this.#r.texture=u,l.destroy({destroyLutTexture:!0}),r.destroy({children:!0})}}const qo=o=>{if(o instanceof N){const{texture:e}=o;e instanceof ze&&e.destroy(!0)}for(const e of o.children)qo(e)};class fi{constructor(e,t){this.renderContext=e,this.appearance=t}#e;output=new y({label:"AppearanceRenderer"});destroy(){this.#e?.output&&qo(this.#e.output),this.output.destroy({children:!0})}tick(e){const t=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),qo(this.#e.output),this.#e.output.destroy({texture:!1,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}const zn=-11;class $e extends fi{constructor(e,t){super(e,t)}}const po=(o,e)=>o.every(t=>e.currentActionPress(t,!0)!=="released"),eu=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=r?.renderProps,l=r?.output,u=(s&&tt(s))?.hasBag??!1,d=po(o.actions,e),h=a===void 0||d!==a.pressed||t!==a.colourised||u!==a.hasBag,p=i!==a?.renderedInRoom;if(!h&&!p)return"no-update";const f=l===void 0?new ho(t,o.which,n,new D({pixiRenderer:n,text:"C+J",y:zn})):l;return p&&(f.generateButtonSpriteTextures(i),f.shownOnSurface.tint=kn(t,i?.color.shade==="dimmed")),u?(f.visible=!0,a?.pressed!==d&&(f.pressed=d)):f.visible=!1,{output:f,renderProps:{pressed:d,hasBag:u,colourised:t,renderedInRoom:i}}},St=o=>{const{gameTime:e,lastDiedAt:t}=o.type==="headOverHeels"?o.state.head:o.state;return e-t<aa},fo=(o,e)=>{const{head:t,heels:n,headOverHeels:r}=io(e.items);if(r!==void 0)return St(r)?void 0:r;const s=t===void 0||St(t)||t.state.action==="death"?void 0:Hn(t.state.position,o),i=n===void 0||St(n)||n.state.action==="death"?void 0:Hn(n.state.position,o);return s===void 0?n:i===void 0||s<i?t:n},W={movementType:"steady"},tu=o=>an(o)?ne[o.config.which]:ne[o.type],mo=o=>an(o)?ne[o.config.which]:ne[o.type],ar=(o,e,t)=>{switch(t){case"opposite":return{x:e.x===0?o.x:-o.x,y:e.y===0?o.y:-o.y,z:0};case"clockwise":return{x:-o.y,y:o.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const n=In([-1,1]);return{x:e.x===0?n*o.y:0,y:e.y===0?n*o.x:0,z:0}}}},mi=150,fe=Object.freeze({movementType:"vel",vels:{walking:R}}),lr=S.x/2,ou=({state:{position:o,vels:{walking:e}}},t,n,r)=>{const s=ne.homingBot;if(!ve(e,J))return{movementType:"steady"};for(const i of ie(io(t.items))){if(i===void 0)continue;const a=te(i.state.position,o);if(Math.abs(a.y)<lr)return{movementType:"vel",vels:{walking:{x:a.x>0?s:-s,y:0,z:0}}};if(Math.abs(a.x)<lr)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?s:-s,z:0}}}}return{movementType:"steady"}},nu=(o,e,t,n)=>{const{state:{position:r,facing:s}}=o,i=fo(r,e);if(i===void 0)return W;const a=te(i?.state.position,r),l=Tt[at(a)];return ve(l,s)?W:{movementType:"steady",stateDelta:{facing:l}}},ru=(o,e,t,n)=>{const{state:{position:r,standingOnItemId:s,timeOfLastDirectionChange:i,facing:a}}=o;if(s===null)return fe;const l=fo(r,e);if(l===void 0||i+mi>e.roomTime)return W;const c=te(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>S.x/4?u:Pt(u),h=mo(o),p={...R,[d]:c[d]>0?h:-h},f=Mt(p),m=!ve(f,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:f,...m?{timeOfLastDirectionChange:e.roomTime}:X}}},cr=(o,e,t,n,r=!1)=>{const{state:{position:s,standingOnItemId:i}}=o;if(i===null)return fe;const a=fo(s,e);if(a===void 0)return fe;const l=a.state.position,c=S.x*3;if(!(s.x>l.x-c&&s.x<l.x+c&&s.y>l.y-c&&s.y<l.y+c)||a.state.standingOnItemId===o.id)return fe;const d=te(a.state.position,s),h=mo(o),p=(1+Math.SQRT2)/2,f=h*p,m=B({...d,z:0},f/ca(Rt(d))*(r?-1:1));return{movementType:"vel",vels:{walking:m},stateDelta:{facing:m}}},ko=(o,e,t,n,r)=>{const{state:{vels:{walking:s},standingOnItemId:i}}=o;if(i===null)return fe;const{shared:{speed:a}}=Re;if(!(Ue(s,R)?a!==0:Math.random()<n/1e3))return W;const c=In(r),u=Tt[c];return{movementType:"vel",vels:{walking:B(u,mo(o))},stateDelta:{facing:Tt[c]}}},su=(o,e,t,n)=>{const{state:{facing:r,vels:{walking:s},standingOnItemId:i}}=o;return i===null?fe:ve(s,J)||!ua(s,r)?{movementType:"vel",vels:{walking:B(r,mo(o))}}:W},Gt=({movingItem:o,touchedItem:{state:{position:e},aabb:t},deltaMS:n},r)=>{const{state:{position:s,vels:{walking:i},activated:a,facing:l},aabb:c}=o;if(!a||(o.state.durationOfTouch+=n,o.state.durationOfTouch<mi))return;const u=ao(s,c,e,t);if(u.x===0&&u.y===0)return;const d=ar(i,u,r);o.state.vels.walking=d;const h=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;o.state.facing=B(ve(d,J)?ar(l,u,r):Mt(d),h),o.state.durationOfTouch=0},iu=({movingItem:o,movementVector:e})=>{e.z<0||(o.state.vels.walking=R)},au=(o,e,t,n)=>{if(!o.state.activated||an(o)&&o.state.busyLickingDoughnutsOffFace)return fe;switch(o.config.movement){case"patrol-randomly-diagonal":return ko(o,e,t,n,pa);case"patrol-randomly-xy8":return ko(o,e,t,n,ha);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return ko(o,e,t,n,da);case"towards-tripped-on-axis-xy4":return ou(o,e);case"towards-on-shortest-axis-xy4":return ru(o,e);case"back-forth":case"forwards":case"clockwise":return su(o);case"turn-to-player":return nu(o,e);case"towards-analogue":return cr(o,e);case"towards-analogue-unless-planet-crowns":return cr(o,e,t,n,la(w.getState()));default:throw o.config,new Error("this should be unreachable")}},lu=o=>{const{movingItem:e,touchedItem:t}=o;if(it(t,e))switch(e.config.movement){case"patrol-randomly-xy4":Gt(o,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Gt(o,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Gt(o,"opposite");break;case"clockwise":Gt(o,"clockwise");break;case"towards-tripped-on-axis-xy4":iu(o);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":case"forwards":return;default:throw e.config,new Error("this should be unreachable")}};function cu(o){const e=o.movingItem.type==="monster"?o.movingItem:o.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const gi=(o,e,t)=>{fa(o);for(const n of t){if(n.movementType==="position"&&ln(o,n.posDelta),n.movementType==="vel"&&(Ve(e)||Bt("lift")(e)))for(const[s,i]of ps(n.vels))e.state.vels[s]=i;const r=n.stateDelta;r!==void 0&&Object.assign(e.state,r)}return o},ht=({config:{activatedOnStoreValue:o}})=>o===void 0?!0:!!ma(w.getState().gameMenus.gameInPlay,o),uu=(o,e,t,n)=>{const{type:r,state:{teleporting:s,standingOnItemId:i}}=o,{inputStateTracker:a}=t,c=r===t.currentCharacterName?a.currentActionPress("jump"):"released",u=i===null?null:e.items[i],d=u!==null&&fs(u)&&ht(u);if(s===null)return c!=="released"&&d?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:u.state.toRoom,timeRemaining:oo}}}:W;const h=Math.max(s.timeRemaining-n,0);switch(s.phase){case"out":if(!d)return{movementType:"steady",stateDelta:{teleporting:null}};if(h===0)return cn({changeType:"teleport",sourceItem:u,playableItem:o,gameState:t,toRoomId:s.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:oo}}};break;case"in":if(h===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...s,timeRemaining:h}}}},$t=o=>{const e=o-ga,n=e/ba*sn;return(e+.5*Eo*n**2)/n},du={head:$t(Et.head),headOnSpring:$t(Et.head+S.z),heels:$t(Et.heels),heelsOnSpring:$t(Et.heels+S.z)},ur=(o,e,t)=>{const n=o.type==="headOverHeels"||o.type==="heels"&&t?"head":o.type;return du[`${n}${e?"OnSpring":""}`]},hu=o=>!(o===null||fs(o)&&ht(o)||va(o)&&o.config.gives==="scroll"||oe(o)&&o.state.standingOnItemId===null),pu=o=>o.state.jumped&&o.state.position.z===o.state.jumpStartZ&&o.state.jumpStartTime+ya>(o.type==="headOverHeels"?o.state.head.gameTime:o.state.gameTime),bi=(o,e,t)=>{const{state:{standingOnItemId:n}}=o,{inputStateTracker:r}=t,s=un(e,o.state),i=s===null?null:e.items[s];if(pu(o))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:ur(o,!1,o.type==="heels"&&o.state.isBigJump)}},stateDelta:{}};const a=o.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&hu(i);if(!n&&a&&console.log("coyote jump"),!a)return n!==null?{movementType:"steady",stateDelta:{jumped:!1,...o.type==="heels"?{isBigJump:!1}:{}}}:W;const l=o.type==="heels"&&o.state.bigJumps>0,c=ms(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:ur(o,c,l)}},stateDelta:{action:"moving",jumped:!0,...o.type==="heels"?l?{bigJumps:o.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:o.state.position.z,jumpStartTime:o.type==="headOverHeels"?o.state.head.gameTime:o.state.gameTime}}},fu=({vel:o,acc:e,unitD:t,maxSpeed:n,deltaMS:r,minSpeed:s=0})=>{const i=Ee(o),a=Math.max(s,Math.min(n,i+e*r)),l=Math.min(a,n);return B(t,l)},mu={movementType:"vel",vels:{walking:R}},yi=(o,e,t,n)=>{const r=gu(o,e,t,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Ee(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:o.state.walkDistance+i*n},o.type==="head"&&o.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:o.state.gameWalkDistance+i*n})}o.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Ue(r.vels.walking,R)&&(r.stateDelta={...r.stateDelta,walkStartFacing:o.state.facing});const s=Rt(o.state.vels.walking);return r.movementType==="vel"&&ve(J,r.vels.walking??J)&&s>0&&(r.stateDelta={...r.stateDelta,stoppedWalkingAtGameTime:t.gameTime,stoppedWalkingSpeed:s}),r},gu=(o,e,{inputStateTracker:t,currentCharacterName:n,gameTime:r},s)=>{const{type:i,state:{action:a,autoWalk:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,stoppedWalkingAtGameTime:p,stoppedWalkingSpeed:f,vels:{walking:m,gravity:v}}}=o,x=un(e,o.state),P=n===o.id,I=P?t.currentActionPress("jump"):"released",T=P?t.directionVector:R,M=x===null&&v.z<0,z=i==="head"&&On(o.state)>0&&x!==null,L=i==="headOverHeels"?M?"head":"heels":z?"heels":i,_=l?c:T,le=(x===null?xa:ne)[L];if(u!==null||a==="death")return mu;if(i==="heels"){if(x===null)return o.state.jumped?{movementType:"vel",vels:{walking:At(m,B(m,wa*s))},stateDelta:{action:M?"falling":"jumping"}}:{movementType:"vel",vels:{walking:R},stateDelta:{action:"falling"}};if(I!=="released"){const Ge=Mt(ve(_,J)?c:_),Lt=ms(Ot(x,e))?1:Ca;return{movementType:"vel",vels:{walking:B({...Ge,z:0},le*Lt)},stateDelta:{facing:Ge}}}}if(Ee(_)!==0)return M?{movementType:"vel",vels:{walking:B({..._,z:0},le)},stateDelta:{facing:_,action:"falling"}}:Rt(m)<re&&(p??xe)+Sa>r&&(f??0)>re?(console.log("keep speed grace"),{movementType:"vel",vels:{walking:B(_,f)},stateDelta:{facing:_,action:"moving"}}):{movementType:"vel",vels:{walking:fu({vel:m,acc:Ta[L],deltaMS:s,maxSpeed:le,unitD:_,minSpeed:0})},stateDelta:{facing:_,action:"moving"}};if(d>0&&d<1){const Ge=Ue(h,c)?1:0;return{movementType:"position",posDelta:B(c,Ge-d),stateDelta:{action:M?"falling":"idle",walkDistance:0,facing:c}}}return{movementType:"vel",vels:{walking:R},stateDelta:{action:M?"falling":"idle"}}},ke=(o,...e)=>Bt(...e)(o.touchedItem),ft=(o,...e)=>Bt(...e)(o.movingItem),vi=o=>oe(o.movingItem),bu=o=>oe(o.touchedItem),yu=o=>dn(o.touchedItem),dr=o=>Ve(o.movingItem)&&gs(o.movingItem,o.touchedItem,Math.abs(o.movementVector.z)),vu={x:0,y:0,z:0},hr=o=>{if(o.touchedItem.type==="firedDoughnut"&&(o.movingItem.type==="head"||o.movingItem.type==="headOverHeels"||o.movingItem.type==="firedDoughnut"))return;const{touchedItem:{state:{disappearing:e}}}=o;if(e!==null&&(e.byType===void 0||e.byType.includes(o.movingItem.type))&&(e.on==="touch"||e.on==="stand"&&dr(o))){if(dr(o)&&vi(o)&&o.movementVector.z<0){no(o.movingItem,o.room),hn({above:o.movingItem,below:o.touchedItem});const n=[bi(o.movingItem,o.room,o.gameState,o.deltaMS),yi(o.movingItem,o.room,o.gameState,o.deltaMS)];gi(vu,o.movingItem,n)}bs(o)}},xu=2*ka,xi=(o,e,t,n,r=xu)=>{const s={endAtRoomTime:e.roomTime+n+r,startAtRoomTime:e.roomTime+r,velocity:B(t,1/n)};o.state.latentMovement.push(s)},wu=(o,e,t,n)=>{for(const r of o){const s=t[r.id];if(s===void 0)continue;const a={...At(r.state.position,s),z:0};if(!Ue(a,R))for(const l of we(r.state.stoodOnBy,e))xi(l,e,a,n)}},Su=({movingItem:o,room:e,touchedItem:t,deltaMS:n})=>{const{state:{position:r,controls:s},aabb:i}=t,a=ao(o.state.position,o.aabb,r,i);if(a.x===0&&a.y===0){t.state.lastPushDirection=void 0;return}const l=Mt(a);t.state.lastPushDirection=at(ys(l,-1));for(const c of s){const u=e.items[c];if(u===void 0)continue;const{roomTime:d}=e;if(u.state.controlledWithJoystickAtRoomTime===d||c===void 0)continue;const h=B(l,-ne.charles*n);u.state.facing=h,u.state.controlledWithJoystickAtRoomTime=d,Ia(t,u,e),xi(u,e,h,n,1)}},Cu=o=>{const{movingItem:e,touchedItem:t,movementVector:n}=o;if(!it(e))return;const{state:{position:r},aabb:s}=t,i=ao(e.state.position,e.aabb,r,s),a=Ra(e.state.position,e.aabb,r,s,n);a.z=0;const l=Jt(a);l<re||pn(i,a)/l<.44||(Pa(a),Ma(a,-ne.ball),t.state.vels.sliding=a)},Tu=o=>{const{movingItem:e,touchedItem:t}=o;if(!it(t))return;const n=e.state.vels.sliding;if(Ue(n,R))return;const{state:{position:r},aabb:s}=e,i=ao(t.state.position,t.aabb,r,s);pn(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=R)},ku=o=>o==="left"?"right":"left",Iu=(o,e)=>{if(o.expectType==="switch"&&"flip"in o)return{};if(o.expectType==="block"&&"makesStable"in o){const{makesStable:t}=o;return e===(t?"left":"right")?{disappearing:null}:{disappearing:{on:"stand"}}}if((o.expectType==="monster"||o.expectType==="movingPlatform")&&"activates"in o){const{activates:t}=o;return e===(t?"left":"right")?{activated:!0,everActivated:!0}:{activated:!1}}if(o.expectType==="monster"&&"switchedDirection"in o&&o.switchedDirection!==void 0){const{switchedDirection:t}=o,n=Tt[t];return{facing:e==="left"?n:B(n,-1)}}return o[`${e}State`]},Zo=(o,e,t,n,r=new Set)=>{r.add(t);for(const s of o)for(const i of q(n.items)){const{targets:a}=s;if(i.type!==s.expectType||!i.jsonItemId||a!==void 0&&!a.includes(i.jsonItemId)||i===void 0||r.has(i))continue;const l=i;l.state={...i.state,...Iu(s,e),switchedAtRoomTime:n.roomTime,switchedSetting:e},r.add(i),i.type==="switch"&&wi(i,n,r)}},Ru=(o,e,t)=>{const n=ku(o.state.setting);o.state.setting=n;const r=o.config.modifies;Zo(r,n,o,e,t)},Pu=o=>o.config.type==="in-room",wi=(o,e,t)=>{if(Pu(o))Ru(o,e,t);else{const n=o.config;w.dispatch(Aa({path:n.path}))}},Mu=({touchedItem:o,room:e})=>{const t=o.state.lastToggledAtRoomTime??xe,{roomTime:n}=e;o.state.lastToggledAtRoomTime=n,!(t+Ba>n)&&wi(o,e)};function Si({room:{roomTime:o},movingItem:e}){e.state.action!=="death"&&(An(e)||St(e)||(e.state.action="death",e.state.expires=o+oo))}const Bu=3e3,Ci=o=>{const{gameState:e,movingItem:t,touchedItem:n,room:r}=o,{id:s,config:i}=n,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[s]===!0)return;const d=()=>{l[s]&&(u[a]===void 0&&(u[a]={}),u[a][s]=!0)},h=p=>{const f=vs(n);return{type:"floatingText",id:`floatingText-${s}`,...mn,fixedZIndex:za,aabb:R,state:{...fn(),position:Z(f,{z:S.z/2}),expires:c+Bu},config:{textLines:p,appearanceRoomTime:c}}};switch(i.gives){case"hooter":{const p=qt(t);if(p===void 0)return;p.hasHooter=!0,F({room:r,item:h(["hooter","collected"])}),d();break}case"doughnuts":{const p=qt(t);if(p===void 0)return;p.doughnuts=ue(p.doughnuts,6),F({room:r,item:h(["+6","doughnuts"])}),d();break}case"bag":{const p=tt(t);if(p===void 0)return;p.hasBag=!0,F({room:r,item:h(["bag","collected"])}),d();break}case"shield":{t.type==="headOverHeels"?(t.state.head.shieldCollectedAt=t.state.head.gameTime,t.state.heels.shieldCollectedAt=t.state.heels.gameTime):t.state.shieldCollectedAt=t.state.gameTime,F({room:r,item:h(["🛡","shield"])}),d();break}case"fast":{const p=qt(t);if(p===void 0)return;p.fastStepsStartedAtDistance=p.gameWalkDistance,F({room:r,item:h(["⚡","fast steps"])}),d();break}case"jumps":{const p=tt(t);if(p===void 0)return;p.bigJumps+=10,F({room:r,item:h(["♨","10","big jumps"])}),d();break}case"extra-life":t.type==="headOverHeels"?(t.state.head.lives=ue(t.state.head.lives,2),t.state.heels.lives=ue(t.state.heels.lives,2),F({room:r,item:h(["+2","lives","each"])})):(t.state.lives=ue(t.state.lives,2),F({room:r,item:h(["+2","lives"])})),d();break;case"scroll":w.dispatch(Fa(i)),d();break;case"reincarnation":{d();const p=_a(e,w.getState(),{characterPickingUp:t.type,pickupId:s});for(const f of Object.values(p.gameState.characterRooms))if(f.id===r.id){const m=h(["reincarnation","point","restored"]);f.items[m.id]=m}w.dispatch(Da(p)),F({room:r,item:h(["reincarnation","point","saved"])});break}case"crown":{w.dispatch(Oa(i.planet)),F({room:r,item:h([i.planet,"liberated!"])}),d();break}}},Au=({gameState:o,room:e,movingItem:t,touchedItem:n,movementVector:r})=>{const{config:{toRoom:s,direction:i}}=n;pn(i,r)<=0||t.state.action!=="death"&&(s===xs?(delete o.characterRooms[t.type],gn({room:e,item:t}),t.type==="headOverHeels"?(w.dispatch(wo("head")),w.dispatch(wo("heels")),w.dispatch(Uo({offerReincarnation:!1}))):(w.dispatch(wo(t.type)),ro(t.type)in o.characterRooms?o.currentCharacterName=ro(t.type):w.dispatch(Uo({offerReincarnation:!1})))):cn({playableItem:t,gameState:o,toRoomId:s,sourceItem:n,changeType:"portal"}))},Ou=Bt("floor","doorLegs","doorFrame","portal"),pr=o=>{switch(!0){case yu(o):Si(o);break;case ke(o,"portal"):Au(o);break;case ke(o,"pickup"):Ci(o);break}Ou(o.touchedItem)||(o.movingItem.state.autoWalk=!1)},Ti=o=>{vi(o)&&pr(o),bu(o)&&pr({...o,movingItem:o.touchedItem,touchedItem:o.movingItem}),ke(o,...Nn)&&Cu(o),ft(o,...Nn)&&Tu(o),(ft(o,"monster")&&ke(o,"firedDoughnut")||ft(o,"firedDoughnut")&&ke(o,"monster"))&&cu(o),(ft(o,"monster")||ft(o,"movingPlatform"))&&lu(o),ke(o,"switch")&&Mu(o),ke(o,"joystick")&&Su(o),o.touchedItem.state.disappearing&&hr(o),o.movingItem.state.disappearing&&it(o.touchedItem,o.movingItem)&&hr({...o,movingItem:o.touchedItem,touchedItem:o.movingItem})},ki=350,_u=(o,e,t,n)=>{const r=o.type==="heels"?o.state:o.state.heels,{carrying:s}=r;if(s===null)return;const{inputStateTracker:i}=t;if(!(i.currentActionPress("carry")!=="released")||o.state.standingOnItemId===null||!Ii(o,e[bn]))return;const{state:{position:c}}=o;F({room:e,item:s,atPosition:c}),no(o,e),r.carrying=null,ws({subjectItem:o,gameState:t,room:e,posDelta:{x:0,y:0,z:s.aabb.z},forceful:!0,deltaMS:n,onTouch:Ti,visited:new Set().add(o.id)}),hn({above:o,below:s}),i.inputWasHandled("carry",ki)},Ii=(o,e)=>{const t={state:{position:Z(o.state.position,{z:S.z})},aabb:o.aabb,id:"item.id-proposedPutdownLocation"},n=Ss(t,e,r=>it(r,o)&&r!==o);for(const r of n){if(!Ve(r))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with non-free",r),!1;if(!Ii(r,e))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Du=(o,e,t)=>{const{inputStateTracker:n}=t,r=o.type==="heels"?o.state:o.state.heels,{carrying:s,hasBag:i}=r;if(!i)return;const a=q(e.items).filter(yn),l=s===null?Ri(o,e):void 0;for(const d of a)d.state.wouldPickUpNext=!1;l!==void 0&&(l.state.wouldPickUpNext=!0),n.currentActionPress("carry")!=="released"&&l!==void 0&&(Fu(e,r,l),n.inputWasHandled("carry",ki))},Fu=(o,e,t)=>{e.carrying=t,t.state.wouldPickUpNext=!1,gn({room:o,item:t})},Ri=(o,e)=>{const t=An(o),n=l=>yn(l)&&(t||!dn(l)),r=q(e.items).filter(n),s=Cs(o,r);if(s)return s;const i=un(e,o.state),a=i&&e.items[i];if(a&&n(a))return a},zu=(o,e,t)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&o?`block.organic.dark${t?".disappearing":""}`:`block.${e}${t?".disappearing":""}`,Lu=({renderContext:{general:{pixiRenderer:o,colourised:e},item:{config:{style:t,times:n},state:{disappearing:r}},room:s},currentRendering:i})=>{const a=i?.renderProps,l=r!==null;return a===void 0||a.isDissapearing!==l?{output:dt(o,b({textureId:zu(s.color.shade==="dimmed",t,l),times:n,spritesheetVariant:e?"for-current-room":"uncolourised"})),renderProps:{isDissapearing:l}}:"no-update"},Eu=({renderContext:{item:{state:{pressed:o}},general:{colourised:e}},currentRendering:t})=>{const n=t?.renderProps;return n===void 0||o!==n.pressed?{output:b({textureId:o?"buttonInGame.pressed":"buttonInGame",spritesheetVariant:e?"for-current-room":"uncolourised"}),renderProps:{pressed:o}}:"no-update"},Je=({top:o,bottom:e})=>{const t=new y,n=b(e);t.addChild(n);const r=b(o);return r.y=-12,t.addChild(r),t[go]=r,t[Ln]=n,t},go=Symbol(),Ln=Symbol(),Uu=({top:o,bottom:e})=>{const t=new y;return t.addChild(e),o.y=-S.z,t.addChild(o),t[go]=o,t[Ln]=e,t},Vu=({renderContext:{item:{state:{facing:o,actedOnAt:{roomTime:e,by:t}}},room:{roomTime:n,items:r},general:{colourised:s}},currentRendering:i})=>{const a=i?.renderProps,l=at(o)??"towards",c=n===e&&ye(vn(t)).some(h=>Ts(r[h]));if(!(a===void 0||l!==a.facingXy4||c!==a.controlledByJoystick))return"no-update";const d=s?"for-current-room":"uncolourised";return{output:Je({top:{textureId:`charles.${l}`,spritesheetVariant:d},bottom:{textureId:c?"headlessBase.all":"headlessBase",spritesheetVariant:d}}),renderProps:{facingXy4:l,controlledByJoystick:c}}},Ft=o=>{for(const e in o)return!0;return!1},zt=o=>o,fr=250,Gu=Fe.animations["conveyor.x"].animationSpeed,mr=Fe.animations["conveyor.x"].length,$u=o=>1-(1-o)**2,Hu=3,Nu=(o,e)=>{for(let t=0;t<o.children.length;t++){const n=o.children[t],r=t*Hu%mr;n.gotoAndStop(e?mr-r-1:r)}},ju=(o,e,t)=>{const n=ot(o),r=b({animationId:`conveyor.${n}`,reverse:o==="towards"||o==="right",times:e,spritesheetVariant:t}),s=r instanceof ae?new y({children:[r]}):r;return Nu(s,o==="towards"||o==="right"),s},Xu=({renderContext:{item:{config:{times:o},state:{stoodOnBy:e,direction:t}},room:{roomTime:n},general:{colourised:r,pixiRenderer:s}},currentRendering:i})=>{const a=i?.renderProps,l=Ft(e),c=!l&&(a?.moving??!1),u=c?n:a?.roomTimeStoppedMoving??xe,d=l?0:Math.min(n-u,fr),h=i?.output,p=!h||t!==a?.direction,m=p?Dn(s,ju(t,o,r?"for-current-room":"uncolourised"),"conveyor.x"):h,v=Math.max(0,1-d/fr);if(v===0)m.stop();else{const x=Gu*$u(v);m.play(),m.animationSpeed=x}return p||c||l!==a?.moving?{output:m,renderProps:{moving:l,roomTimeStoppedMoving:u,direction:t}}:"no-update"},Wu=zt(Xu);function Pi(o,e){const t=e||new y;for(const n of o)t.addChild(n);return t}const bo=(o,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return b({...o,times:t})},He=o=>G(({renderContext:{item:e,general:{colourised:t}}})=>xn(e)?b({...typeof o=="string"?{textureId:o}:o,times:lo(e),spritesheetVariant:t?"for-current-room":"uncolourised"}):b({...typeof o=="string"?{textureId:o}:o,spritesheetVariant:t?"for-current-room":"uncolourised"})),Yu=o=>G(({renderContext:{item:e,general:{paused:t,colourised:n}}})=>xn(e)?b({...o,times:lo(e),paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"}):b({...o,paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"})),Q=o=>G(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(xn(e))return dt(t,bo(o,lo(e)));{const n=b(o);return n instanceof N?n:se(t,n)}}),G=o=>(({renderContext:e,currentRendering:t,tickContext:n})=>t===void 0?{output:o({renderContext:e,currentRendering:void 0,tickContext:n}),renderProps:X}:"no-update"),he=o=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:n})=>{if(n===void 0){const r=lo(t),s={output:dt(e,bo(o(t.config),r)),renderProps:X};return r&&(s.output.y-=((r.z??1)-1)*S.z),s}else return"no-update"}),Ju=(o,e,t)=>{const r=me().textures[`door.frame.${o.planet}.${e}.near`]!==void 0?o.planet:"generic",s=o.color.shade==="dimmed"&&me().textures[`door.frame.${r}.dark.${e}.${t}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${t}`};function*qu({config:{direction:o,inHiddenWall:e,height:t}},n){const r=wn(o),s=r==="y"?1:16;function*i(a){if(e)t!==0&&(yield b({textureId:`generic.door.floatingThreshold.${r}`,...Qe(a,{y:-S.z*t}),spritesheetVariant:n}));else{yield b({pivot:{x:s,y:9},textureId:`generic.door.legs.base.${r}`,...Qe(a,{}),spritesheetVariant:n});for(let l=1;l<t;l++)yield b({pivot:{x:s,y:9},textureId:`generic.door.legs.pillar.${r}`,...Qe(a,{y:-l*S.z}),spritesheetVariant:n})}}yield*i(Le({...J,[r]:1})),yield*i(J),e||(yield b({pivot:{x:16,y:S.z*t+13},textureId:`generic.door.legs.threshold.double.${r}`,...Le({...J,[r]:1}),spritesheetVariant:n}))}const Mi=(o,e)=>{const t=wn(o),n=Pt(t),r=8;return o==="towards"||o==="right"?k({[n]:e[n]-r}):J},Zu=G(({renderContext:{item:o,general:{pixiRenderer:e,colourised:t}}})=>{const r=Pi(qu(o,t?"for-current-room":"uncolourised")),s=se(e,r),i=Mi(o.config.direction,o.aabb);return s.x=i.x,s.y=i.y,s}),Qu=G(({renderContext:{item:{config:{direction:o,part:e,toRoom:t},aabb:n},room:r,general:{pixiRenderer:s,colourised:i}}})=>{const a=La(w.getState())??w.getState().levelEditor?.campaignInProgress,l=wn(o),c=a?.rooms[t]??r,u=new Ke({paletteSwaps:V(c.color.hue,r.color.shade==="dimmed",r.planet==="moonbase"?"light-mid":"light-dark"),lutType:"sparse"}),{x:d,y:h}=Mi(o,n),p=b({textureId:Ju(r,l,e),x:d,y:h,spritesheetVariant:i?"for-current-room":"uncolourised"});p.filters=u;const f=new y({children:[p]}),m=se(s,f);return f.destroy({children:!0}),u.destroy({destroyLutTexture:!0,destroyMask:!0}),e==="top"&&(m.y=.5),m}),Ku=ne.floatingText,gr=12,br=S.z*3,yr=[g.shadow,g.redShadow,g.midGrey,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],vr=[...yr,...new Array(20).fill(g.white),...yr.toReversed()],ed=({renderContext:{item:{config:{textLines:o,appearanceRoomTime:e}},room:{roomTime:t},general:{displaySettings:{uncolourised:n},pixiRenderer:r},frontLayer:s},currentRendering:i})=>{const a=i?.output;let l;const u=(t-e)*Ku;if(a===void 0){l=new y,s?.attach(l);for(let h=0;h<o.length;h++){const p=o[h],f=new D({pixiRenderer:r,y:h*gr,outline:!0,text:p.toUpperCase()});l.addChild(f)}}else l=a;let d=!1;for(let h=0;h<o.length;h++){const p=l.children[h],f=u+h*-gr,m=f>0&&f<br;if(p.visible=m,d||=m,m&&!n){const v=Math.floor(f/br*vr.length);p.tint=vr[v]}}return l.visible=d,l.y=-u,{output:l,renderProps:X}},xr=(o,e)=>e===0?o:Math.round(o/e)*e,wr=o=>o-Math.floor(o),td=(o,e,t,n)=>o<=n&&t<=e;var od=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;uniform vec4 uTintColour;vec4 transparent=vec4(0.0,0.0,0.0,0.0);vec4 black=vec4(0.0,0.0,0.0,1.0);void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float fgIsTransparent=step(fg.a,0.001f);float bgIsBlack=step(length(bg),0.001f);finalColor=mix(mix(uTintColour,black,bgIsBlack),transparent,fgIsTransparent);}`;const nd=U.from({vertex:be,fragment:od,name:"colour-clash-filter"});class Sr extends E{constructor(e){super({glProgram:nd,resources:{uBackTexture:H.EMPTY,colourClashUniforms:{uTintColour:{value:e,type:"vec4<f32>"}}},blendRequired:!0})}}const rd=({state:{position:o}},e,t)=>{const n=s=>s.config.direction==="away"||s.config.direction==="left";return Pi(q(e.items).filter(s=>s.type==="wall"||s.type==="doorLegs").filter(n).map(s=>{const{id:i,config:{direction:a},state:{position:l}}=s;return b({textureId:"floorOverdraw.cornerNearWall",label:i,...k(At(l,o)),times:s.type==="wall"?Ea(s.config):{[Pt(ot(a))]:2},anchor:{x:0,y:1},flipX:a==="away",spritesheetVariant:t?"for-current-room":"uncolourised"})}),new y({label:"floorOverdraws"}))},sd=(o,e)=>{const{config:{naturalFootprint:{aabb:t,position:n}},state:{position:r}}=e,s=Zt(te(R,r)),{left:i,right:a}=q(o.items).filter(Va).filter(l=>{const{state:{position:c},aabb:u}=l,d=l.config.direction,h=ot(d),p=Pt(h),f=d==="away"||d==="left",m=n[h]+(f?1:0)*t[h],v=c[h]+(f?0:1)*u[h];return m!==v?!1:td(c[p],c[p]+u[p],n[p],n[p]+t[p])}).reduce((l,{aabb:c,renderAabb:u,renderAabbOffset:d,state:{position:h},fixedZIndex:p})=>{const f=p===Ga,m=f?c:u??c,v=Z(h,d??R),x=Zt(Z(v,{x:m.x,y:f?m.y:0}))+s,P=Zt(Z(v,{x:f?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,x),right:Math.max(l.right,P)}},{left:9999,right:-9999});if(a>i)return new ee().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},Cr=({direction:o,times:e,position:t,colourised:n})=>b({label:`floorEdge(${o})`,textureId:`floorEdge.${o}`,times:e,...k(t),spritesheetVariant:n?"for-current-room":"uncolourised"}),id=({room:o,xSize:e,ySize:t,y:n})=>{const r=new y({label:"floorColourClash"}),s=nr(o,"right"),i=new y({label:"floorColourClash.right",filters:[new Sr(s)]});for(let c=0;c<=t;c++){const u=Le({x:0,y:c,z:0}),d=new ee().rect(u.x-(c===0?0:8),u.y,24,8).fill(s);i.addChild(d)}r.addChild(i);const a=nr(o,"towards"),l=new y({label:"floorColourClash.towards",filters:[new Sr(a)]});for(let c=0;c<=e;c++){const u=Le({x:c,y:0,z:0}),d=new ee().rect(u.x-16,u.y,8*(c===0?2:3),8).fill(a);l.addChild(d)}return r.addChild(l),r.y=n,r},ad=G(({renderContext:{room:o,item:e,general:{colourised:t,pixiRenderer:n},colourClashLayer:r,frontLayer:s}})=>{const{color:{shade:i}}=o,{config:a,state:{position:l},aabb:c}=e,{floorType:u,naturalFootprint:d}=a,h=new y({label:"floorAppearance"}),p=new y({label:"sprites"}),f=k({...c,y:0}),m=k({...c,x:0,y:0}),v=k({...c,x:0}),x=k(c),P=new ge({color:t?eo("pureBlack"):Ua.black,width:1});if(u!=="none"){const I=new y({label:"tiles"}),T=u==="deadly"?`generic${i==="dimmed"?".dark":""}.floor.deadly`:`${a.scenery}${i==="dimmed"?".dark":""}.floor`,M=de(t?"for-current-room":"uncolourised").textures[T];try{ds(T)}catch(Wi){throw new Error(`no floor textureId for floorType: ${u}, shade: ${i}`,{cause:Wi})}const z=te(d.position,l),L={x:wr(z.x/S.x),y:wr(z.y/S.x)},_=8,le={x:f.x,y:x.y-_,width:v.x-f.x,height:m.y-x.y+2*_},Un=te(Le(Qe(L,{x:.5,y:.5})),{y:c.z},le),Ge=new lc({texture:M,tilePosition:Un,...le});I.addChild(Ge),I.addChild(rd(e,o,t));const yo=new ee().moveTo(x.x,x.y).lineTo(v.x,v.y).lineTo(v.x,v.y+3).lineTo(m.x,m.y+3).lineTo(f.x,f.y+3).lineTo(f.x,f.y).fill({color:16711680,alpha:1}),Lt=se(n,yo);yo.destroy(),I.addChild(Lt),I.mask=Lt;const Vn=new y({children:[I]});Vn.filters=P,p.addChild(Vn)}{const I=new y({label:"edges"});if(u==="none"){const L=new ee().moveTo(v.x,v.y+10).lineTo(v.x,v.y+100).lineTo(f.x,f.y+100).lineTo(f.x,f.y+10).lineTo(m.x,m.y+10).fill(0),_=se(n,L);h.addChild(_),s.attach(_),L.destroy()}const T=Math.ceil(c.y/S.x);I.addChild(Cr({direction:"right",times:{y:T},position:{z:c.z},colourised:t}));const M=Math.ceil(c.x/S.x);I.addChild(Cr({direction:"towards",times:{x:M},position:{z:c.z},colourised:t})),p.addChild(I);const z=sd(o,e);if(z!==void 0){const L=se(n,z);p.addChild(L),p.mask=L,z.destroy()}if(h.addChild(se(n,p)),p.destroy({children:!0}),P.destroy(!1),!t){const L=id({xSize:M,ySize:T,y:-c.z+1,room:o});h.addChild(L),r.attach(L)}}return h}),ld=o=>{const e=new y({label:"joystick"});return e.addChild(b({textureId:"joystick.stick",spritesheetVariant:o})),e.addChild(b({textureId:"joystick.ball",spritesheetVariant:o})),e},cd=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,J]]),ud=({renderContext:{item:{state:{actedOnAt:o,lastPushDirection:e}},room:{roomTime:t},general:{colourised:n}},currentRendering:r})=>{const s=r?.renderProps,i=t===o.roomTime?e:void 0,a=s?.pushDirection;if(!(s===void 0||i!==a))return"no-update";const c=r?.output??ld(n?"for-current-room":"uncolourised"),u=c.getChildAt(1),d=cd.get(i);return u.x=d?.x??0,u.y=d?.y??0,{output:c,renderProps:{pushDirection:i}}},dd=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle","homingBot"],Tr=(o,e,t,n)=>{const r=ls(n);return Math.sin((o+r*2e4)/e)*t},hd=50,pd=200,fd=.25,md=1,Te=({id:o,config:{which:e},state:t},n,r)=>{const s=e==="emperorsGuardian"||e==="helicopterBug",i=e==="cyberman"||e==="bubbleRobot"||e==="computerBot"||e==="emperorsGuardian";if((i||e==="helicopterBug")&&t.activated||s){const l=e==="computerBot"||e==="helicopterBug",c=l?hd:pd,u=l?fd:md;if(i){const d=r;d[go].y=-S.z+Tr(n.roomTime,c,u,o)}else r.y=Tr(n.roomTime,c,u,o)}return r},gd=({renderContext:{item:o,room:e,general:{paused:t,colourised:n}},currentRendering:r})=>{const{config:s,state:i,id:a}=o,l=r?.renderProps,{activated:c,busyLickingDoughnutsOffFace:u}=i,d=n?u?"doughnutted":!c&&dd.includes(s.which)?"deactivated":"for-current-room":"uncolourised";switch(s.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const h=at(i.facing)??"towards";if(!(l===void 0||c!==l.activated||u!==l.busyLickingDoughnutsOffFace||h!==l.facingXy4))return Te(o,e,r.output),"no-update";const f={facingXy4:h,activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"skiHead":return{output:b({textureId:`${s.which}.${s.style}.${h}`,spritesheetVariant:d}),renderProps:f};case"elephantHead":return{output:b({textureId:`elephant.${h}`,spritesheetVariant:d}),renderProps:f};case"turtle":return{output:b(c&&!u?{animationId:`${s.which}.${h}`,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.${h}.1`,spritesheetVariant:d}),renderProps:f};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Te(o,e,Je({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"bubbles.jetpack",paused:t,spritesheetVariant:d}})):b({textureId:`${s.which}.${h}`,spritesheetVariant:d}),renderProps:f};case"computerBot":case"elephant":case"monkey":return{output:Te(o,e,Je({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"headlessBase.flash",playOnce:"and-stop",spritesheetVariant:d}})),renderProps:f};default:throw new Error(`unexpected monster ${s}`)}break}case"homingBot":{const h=!ve(i.vels.walking,J);return l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated||h!==l.walking?{spritesheetVariant:d,output:b(c&&!u?{animationId:h?"headlessBase.flash":"headlessBase.scan",spritesheetVariant:d}:{textureId:"headlessBase",spritesheetVariant:d}),renderProps:{activated:c,busyLickingDoughnutsOffFace:u,walking:h}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated))return Te(o,e,r.output),"no-update";const p={activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"helicopterBug":case"dalek":return{output:Te(o,e,b(c&&!u?{animationId:s.which==="dalek"&&e.color.shade==="dimmed"&&(e.planet==="blacktooth"||e.planet==="egyptus"||e.planet==="moonbase")?"dalek.dark":s.which,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.1`,spritesheetVariant:d})),renderProps:p};case"bubbleRobot":return{output:Te(o,e,Je({top:{animationId:"bubbles.blueGreen",randomiseStartFrame:a,paused:t,spritesheetVariant:d},bottom:{textureId:"headlessBase",spritesheetVariant:d}})),renderProps:p};case"emperorsGuardian":return{output:Te(o,e,Je({top:{textureId:"ball.blueGreen",spritesheetVariant:d},bottom:{animationId:"bubbles.cold",spritesheetVariant:d,paused:t}})),renderProps:p};case"emperor":return{output:b({animationId:"bubbles.cold",spritesheetVariant:d,paused:t}),renderProps:p};default:throw new Error(`unexpected monster ${s}`)}break}default:throw new Error(`unexpected monster ${s}`)}};var bd=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const yd=U.from({vertex:be,fragment:bd,name:"oneColour-filter"});class Qo extends E{constructor(e){super({glProgram:yd,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[n,r,s]=e.toArray();t.uColour[0]=n,t.uColour[1]=r,t.uColour[2]=s}}const Ko=.02,vd=({name:o,action:e,facingXy8:t,teleportingPhase:n,gravityZ:r,paused:s,spritesheetVariant:i})=>{if(e==="death")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(n==="out")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(n==="in")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(e==="moving")return{animationId:`${o}.walking.${t}`,paused:s,spritesheetVariant:i};if(e==="jumping")return{textureId:r<Ko?`${o}.walking.${t}.2`:`${o}.walking.${t}.1`,spritesheetVariant:i};if(e==="falling"){const l=`${o}.falling.${t}`;if(ks(l))return{textureId:l,spritesheetVariant:i}}const a=`${o}.idle.${t}`;return Sn(a)?{animationId:a,paused:s,spritesheetVariant:i}:{textureId:`${o}.walking.${t}.2`,spritesheetVariant:i}},en=Symbol(),Bi=Symbol(),xd=(o,e)=>{o[en].removeChildren(),o[en].addChild(b(vd(e)))},Io=(o,e,t,n,r)=>{const s=new y,i=new y;s[en]=i,s.addChild(i);const a=b({animationId:e?`shine.${o}InSymbio`:`shine.${o}`,paused:t,flipX:o==="heels",spritesheetVariant:n?"for-current-room":"uncolourised"});s.addChild(a),s[Bi]=a,s.filters=[new ge({color:r?Y(r):eo(No[o])}),new ge({color:r?Y(r):eo("midRed")}),new Qo(r?Y(r):eo(No[o]))];for(const l of s.filters)l.enabled=!1;return s},kr=({gameTime:o,switchedToAt:e},t,n)=>(t==="headOverHeels"||t===n)&&e+Ha>o,wd=o=>{if(!St(o))return!1;const{gameTime:e,lastDiedAt:t}=o.type==="headOverHeels"?o.state.head:o.state;return(e-t)%jn<jn*Na},Sd=({highlighted:o,flashing:e,shining:t},n)=>{const[r,s,i]=n.filters;r.enabled=o,s.enabled=!o&&t,i.enabled=e},Cd=(o,e)=>{o[Bi].visible=e},Ro=(o,e,t,n,r,s)=>{t&&xd(e,{name:o,...n,paused:r,spritesheetVariant:s}),Sd(n,e),Cd(e,n.shining)},Td=({renderContext:{item:o,general:{gameState:e,paused:t,colourised:n},room:r},currentRendering:s})=>{const{type:i,state:{action:a,facing:l,visualFacingVector:c,teleporting:u,vels:{gravity:{z:d}}}}=o,h=s?.renderProps,p=s?.output,f=co(c??l)??"towards",m=e!==void 0&&(o.type==="headOverHeels"?kr(o.state.head,"headOverHeels","headOverHeels"):kr(o.state,o.type,e.currentCharacterName)),v=wd(o),x=An(o),P=Ee(l),I=u?.phase??null,T={action:a,facingXy8:f,teleportingPhase:I,flashing:v,highlighted:m,shining:x,gravityZ:d},M=h===void 0||h.action!==a||h.facingXy8!==f||h.teleportingPhase!==I||h?.gravityZ>Ko!=d>Ko;let z;const L=n?"for-current-room":"uncolourised",_=n?void 0:r.color;if(i==="headOverHeels"){z=p??Uu({top:Io("head",!0,t,n,_),bottom:Io("heels",!0,t,n,_)});const le=z;Ro("head",le[go],M,T,t,L),Ro("heels",le[Ln],M,T,t,L)}else z=p??Io(i,!1,t,n,_),Ro(i,z,M,T,t,L);return a==="moving"&&p instanceof ae&&(p.animationSpeed=P*$a),{output:z,renderProps:T}},Po=zt(Td),Mo=(o,e,t,n,r)=>{const s=`${o}.idle.${e}`,i=r?"sceneryPlayer":"uncolourised";return Sn(s)?{animationId:s,randomiseStartFrame:t,paused:n,spritesheetVariant:i}:{textureId:`${o}.walking.${e}.2`,spritesheetVariant:i}},kd=({renderContext:{item:{id:o,config:{which:e,startDirection:t}},general:{paused:n,colourised:r}},currentRendering:s})=>s?.renderProps===void 0?{output:e==="headOverHeels"?Je({top:Mo("head",t,o,n,r),bottom:Mo("heels",t,o,n,r)}):b(Mo(e,t,o,n,r)),renderProps:X}:"no-update",Id=({renderContext:{item:{state:{vels:{sliding:o}},config:{startingPhase:e}},general:{paused:t,colourised:n}},tickContext:{deltaMS:r},currentRendering:s})=>{const a=(s?.renderProps?.distanceTravelled??0)+Rt(o)*(t?0:r),l=s?.output,c=n?"for-current-room":"uncolourised",u=l??b({textureId:"spikyBall.1",spritesheetVariant:c}),h=(Math.floor(a*2/Qt.w)+e)%2+1;return u.texture=de(c).textures[`spikyBall.${h}`],{output:u,renderProps:{distanceTravelled:a}}},Rd=zt(Id),Ai=o=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:n,colourised:r}},tickContext:{lastRenderRoomTime:s},currentRendering:i})=>{const a=i?.renderProps,l=Ft(e);let c;return i?.output?c=i?.output:(c=b({animationId:o?"shadowMask.spring.bounce":"spring.bounce",paused:n,spritesheetVariant:r?"for-current-room":"uncolourised"}),c.loop=!1,c.gotoAndStop(0)),s!==void 0&&t>s&&!l&&!n?c.gotoAndPlay(0):l!==(a?.compressed??!1)&&(l?c.gotoAndStop(1):c.gotoAndStop(0)),{output:c,renderProps:{compressed:l}}},Pd=zt(Ai(!1)),Md=zt(Ai(!0)),Bd=o=>{const{gameMenus:e}=w.getState();try{return Is(e,o.path)?"right":"left"}catch(t){throw new Error(`Error getting switch setting from store for switch with path "${o.path}"

while store has: ${JSON.stringify(e,null,2)}`,{cause:t})}},Ad=({renderContext:{item:{state:{setting:o},config:e},general:{colourised:t}},currentRendering:n})=>{const r=n?.renderProps,s=e.type==="in-store"?Bd(e):o;return r===void 0||s!==r.setting?{output:b({textureId:`switch.${s}`,spritesheetVariant:t?"for-current-room":"uncolourised"}),renderProps:{setting:s}}:"no-update"},Od=({renderContext:{item:o,room:e,general:{paused:t,colourised:n}},currentRendering:r})=>{const{state:{stoodOnBy:s},config:{times:i}}=o,a=r?.renderProps,l=ht(o),c=l&&we(s,e).some(oe);if(!(a===void 0||l!==a.activated||c!==a.flashing))return"no-update";const d=n?"for-current-room":"uncolourised";return{output:b(c?{animationId:"teleporter.flashing",times:i,paused:t,spritesheetVariant:d}:{textureId:l?"teleporter":"block.artificial",times:i,spritesheetVariant:d}),renderProps:{flashing:c,activated:l}}},_d=({state:{stoodOnBy:o,position:e},config:{times:t}},n)=>{const r=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return we(o,n).filter(Rs).forEach(({id:s,state:{position:i}})=>{const a=te(i,e),l={x:Math.floor(a.x/S.x),y:Math.floor(a.y/S.y)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(r[l.x][l.y]=s)}),r},Dd=(o,e)=>{let t=0,n=1;for(const r of e)for(const s of r)s!==void 0&&o.items[s]?.state.activated&&(t|=n),n<<=1;return t},Fd=({renderContext:{item:o,room:e,general:{pixiRenderer:t,colourised:n}},currentRendering:r})=>{const{config:{times:s}}=o,i=r===void 0?_d(o,e):r.renderProps.chargePositions,a=Dd(e,i);if(!(a!==r?.renderProps.cybermanActivationBitmask))return"no-update";const c=b({subSpriteVariations(d,h){const p=i[d][h];return p===void 0?{animationId:"toaster.off"}:e.items[p]?.state.everActivated?{animationId:"toaster.off"}:{textureId:"toaster.on"}},times:s??X,spritesheetVariant:n?"for-current-room":"uncolourised"});return{output:Dn(t,c,"toaster.off"),renderProps:{chargePositions:i,cybermanActivationBitmask:a}}},zd=(o,e,t,n)=>`${o}${n?".dark":""}.wall.${e}.${t}`,Ld=G(({renderContext:{general:{pixiRenderer:o,colourised:e},item:{id:t,config:n},room:r}})=>{if(n.direction==="right"||n.direction==="towards")throw new Error(`wall is near: ${t}`);const{direction:s,tiles:i}=n,a=Pt(ot(s)),l=new y({label:"wallTiles"}),c=new y({label:"wallAnimations"});for(let d=0;d<n.tiles.length;d++){const h=Le({[a]:d});if(l.addChild(b({textureId:zd(r.planet,i[d],s,r.color.shade==="dimmed"),...h,pivot:s==="away"?{x:Qt.w,y:Qt.h}:{x:0,y:Qt.h},spritesheetVariant:e?"for-current-room":"uncolourised"})),r.planet==="moonbase"){const p=`moonbase.wall.screen.${i[d]}.away`;Sn(p)&&c.addChild(b({animationId:p,randomiseStartFrame:`${t}${d}`,flipX:s==="left",x:h.x+(s==="away"?-8:8),y:h.y-23,spritesheetVariant:e?"for-current-room":"uncolourised"}))}}const u=new y({label:"wallAppearance"});return u.addChild(se(o,l)),c.children.length>0&&u.addChild(c),u}),Ed={head:Po,heels:Po,headOverHeels:Po,doorFrame:Qu,doorLegs:Zu,monster:gd,floatingText:ed,barrier:G(({renderContext:{item:{config:{axis:o,times:e,disappearing:t}},general:{colourised:n,pixiRenderer:r}}})=>dt(r,b({textureId:`barrier.${o}${t?".disappearing":""}`,times:e,spritesheetVariant:n?"for-current-room":"uncolourised"}))),deadlyBlock:G(({renderContext:{item:{config:o,id:e},general:{paused:t,colourised:n,pixiRenderer:r}}})=>{switch(o.style){case"volcano":{const s=b({animationId:"volcano",times:o.times,randomiseStartFrame:e,paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"});return Dn(r,s,"volcano")}case"toaster":throw new Error("use the special toaster appearance instead");default:throw o.style,new Error("unknown deadly block style")}}),spikes:He("spikes"),slidingDeadly:Rd,slidingBlock:G(({renderContext:{item:{config:{style:o}},general:{colourised:e}}})=>{const t=e?"for-current-room":"uncolourised";return b(o==="book"?{textureId:"book.y",spritesheetVariant:t}:{textureId:o,spritesheetVariant:t})}),block:Lu,switch:Ad,button:Eu,conveyor:Wu,lift:G(({renderContext:{general:{paused:o,colourised:e}}})=>{const t=new y,n=e?"for-current-room":"uncolourised",r={x:wt.w/2,y:wt.h};return t.addChild(b({animationId:"lift",pivot:r,paused:o,spritesheetVariant:n})),t.addChild(b({textureId:"lift.static",pivot:r,spritesheetVariant:n})),t}),teleporter:Od,sceneryCrown:G(({renderContext:{item:{config:{planet:o}},general:{colourised:e}}})=>b({textureId:`crown.${o}`,spritesheetVariant:e?"for-current-room":"uncolourised"})),pickup:G(({renderContext:{item:{config:o},general:{paused:e,colourised:t}}})=>{const n=t?"for-current-room":"uncolourised";if(o.gives==="crown")return b({textureId:`crown.${o.planet}`,spritesheetVariant:n});const s={shield:{textureId:"whiteRabbit",spritesheetVariant:n},jumps:{textureId:"whiteRabbit",spritesheetVariant:n},fast:{textureId:"whiteRabbit",spritesheetVariant:n},"extra-life":{textureId:"whiteRabbit",spritesheetVariant:n},bag:{textureId:"bag",spritesheetVariant:n},doughnuts:{textureId:"doughnuts",spritesheetVariant:n},hooter:{textureId:"hooter",spritesheetVariant:n},scroll:{textureId:"scroll",spritesheetVariant:n},reincarnation:{animationId:"fish",paused:e,spritesheetVariant:n}}[o.gives];return b(s)}),moveableDeadly:He("fish.1"),charles:Vu,joystick:ud,movingPlatform:He("sandwich"),pushableBlock:He("stepStool"),portableBlock:G(({renderContext:{item:{config:{style:o}},general:{colourised:e}}})=>b({textureId:o,spritesheetVariant:e?"for-current-room":"uncolourised"})),spring:Pd,sceneryPlayer:kd,hushPuppy:He("hushPuppy"),bubbles:G(({renderContext:{item:{id:o,config:{style:e}},general:{paused:t,colourised:n}}})=>b({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:o,spritesheetVariant:n?"for-current-room":"uncolourised"})),firedDoughnut:Yu({animationId:"bubbles.doughnut"}),ball:He("ball"),floor:ad,particle:G(({renderContext:{item:{config:{forCharacter:o}},general:{paused:e,colourised:t}}})=>b({animationId:`particle.${o==="head"?"head":"heels"}.fade`,anchor:{x:.5,y:.5},paused:e,spritesheetVariant:t?"for-current-room":"uncolourised"}))},Oi=o=>{if(o.type==="wall"){const{direction:e}=o.config;return e==="right"||e==="towards"?void 0:Ld}return o.type==="deadlyBlock"&&o.config.style==="toaster"?Fd:Ed[o.type]},_i=(o,e,t)=>{const r=Oi(o)({renderContext:{general:e.general,item:o,room:t,colourClashLayer:void 0,frontLayer:void 0,zEdges:ja,getItemRenderPipeline(){throw new Error("getOtherItemContainer not supported in carried sprite")}},tickContext:{lastRenderRoomTime:xe,movedItems:nt,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Ud=()=>{const o=b({label:"carriedItem"}),e=b({label:"bag",textureId:"bag",y:-2,spritesheetVariant:"original"});return new y({label:"carryButtonSurface",children:[o,e]})},Vd=({renderContext:o,currentRendering:e,tickContext:t})=>{const{button:n,inputStateTracker:r,general:{colourised:s,pixiRenderer:i}}=o,{currentPlayable:a,room:l}=t,c=e?.renderProps,u=e?.output,d=a&&tt(a),h=d?.hasBag??!1,p=d?.carrying??null,f=p===null&&l!==void 0&&Ri(a,l)!==void 0,m=po(n.actions,r),v=h&&!f&&p===null,x=u??new ho(s,n.which,i,Ud()),P=l!==c?.renderedInRoom;P&&x.generateButtonSpriteTextures(l),x.visible=h;const[I,T]=x.shownOnSurface.children;if(v!==c?.disabled||s!==c?.colourised||P){const M=de(s?v?"deactivated":"for-current-room":"uncolourised");T.texture=M.textures.bag}return c?.pressed!==m&&(x.pressed=m),p!==c?.carrying&&(T.visible=p===null,I.visible=p!==null),(p!==c?.carrying||P)&&(I.removeChildren(),p!==null&&l!==void 0&&I.addChild(_i(p,o,t.room))),{output:x,renderProps:{pressed:m,hasBag:h,colourised:s,carrying:p,disabled:v,renderedInRoom:l}}},Gd=o=>{const e=b({textureId:"hooter",y:-3,spritesheetVariant:"original"}),t=b({textureId:"doughnuts",y:-2,spritesheetVariant:"original"}),n=new D({pixiRenderer:o,outline:!0,y:zn});return new y({label:"fireButtonSurface",children:[e,t,n]})},$d=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=s&&qt(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=po(o.actions,e),d=c===0,h=l?"hooter":st(c)>0?"doughnuts":"none",p=r?.renderProps,f=i!==p?.renderedInRoom,m=u!==p?.pressed,v=d!==p?.disabled,x=h!==p?.showingSprite;if(p!==void 0&&t===p.colourised&&x&&!v&&!m&&!f)return"no-update";const P=r?.output??new ho(t,o.which,n,Gd(n));f&&P.generateButtonSpriteTextures(i),P.visible=h!=="none",m&&(P.pressed=u);const[I,T,M]=P.shownOnSurface.children;if(x&&(I.visible=h==="hooter",T.visible=h==="doughnuts"),v||f){const z=de(t?d?"deactivated":"for-current-room":"uncolourised");I.texture=z.textures.hooter,T.texture=z.textures.doughnuts,M.tint=kn(t,i.color.shade==="dimmed")}return c!==p?.doughnutsCount&&(M.text=st(c)),{output:P,renderProps:{pressed:u,colourised:t,showingSprite:h,renderedInRoom:i,disabled:d,doughnutsCount:c}}},Hd=new _e(16777215),qe=(o,e=!0)=>o?e?"for-current-room":"deactivated":"uncolourised",mt=(o,e,t)=>o?Hd:Y(_t(e).hud[t?"brightHue":"dimmedHue"]),De=(o,e,t)=>{const n=_t(e);return o?zs(n.hud[t?"brightHue":"dimmedHue"],!1,e.shade==="dimmed"):Y(n.hud[t?"brightHue":"dimmedHue"])},Ir=(o,e)=>{const t=_t(e);return o?zs(t.hud.icons,!1,e.shade==="dimmed"):Y(t.hud.icons)},Nd=(o,e)=>{const t=b({animationId:"teleporter.flashing",y:5,spritesheetVariant:qe(o)}),n=new D({pixiRenderer:e,text:"JUMP",y:zn});return new y({label:"jumpButtonSurface",children:[n,t]})},jd=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n,paused:r}},tickContext:{room:s,currentPlayable:i},currentRendering:a})=>{const l=a?.renderProps,c=a?.output,u=i?.state.standingOnItemId??null,d=u===null||s===void 0?null:s.items[u],h=d===null?!1:d.type==="teleporter"&&ht(d),p=po(o.actions,e),f=c??new ho(t,o.which,n,Nd(t,n)),m=l?.pressed!==p;m&&(f.pressed=p);const v=s!==l?.renderedInRoom,x=h!==l?.isStandingOnActiveTeleporter,P=r!==l?.paused,[I,T]=f.shownOnSurface.children;if(P&&(r?T.gotoAndStop(0):T.gotoAndPlay(0)),!x&&!v&&!m)return"no-update";if(x&&(T.visible=h,I.visible=!h),v){const M=de(qe(t));T.textures=_n(M.animations["teleporter.flashing"]),r||T.gotoAndPlay(0),I.tint=kn(t,s?.color.shade==="dimmed"),f.generateButtonSpriteTextures(s)}return{output:f,renderProps:{pressed:p,isStandingOnActiveTeleporter:h,colourised:t,renderedInRoom:s,paused:r}}},Xd=({currentRendering:o,tickContext:e,renderContext:t})=>o!==void 0?(o.output.tint=De(t.general.colourised,e.room.color,!1),"no-update"):{output:new D({pixiRenderer:t.general.pixiRenderer,label:"mapText",outline:!0,text:"MAP"}),renderProps:X},Wd=({currentRendering:o,tickContext:e,renderContext:t})=>o!==void 0?(o.output.tint=De(t.general.colourised,e.room.color,!1),"no-update"):{output:new D({pixiRenderer:t.general.pixiRenderer,label:"menuText",outline:!0,doubleHeight:!0,doubleWidth:!0,text:"☰"}),renderProps:X},Yd=6e-4,Jd=1e-4,Ht=.3,qd=40;class Zd{#e={x:0,y:0};#t=0;#n=!1;startDrag(){this.#n=!0,this.#e={x:0,y:0},this.#t=performance.now()}stopDrag(){this.#n=!1}updateVelocity(e){const t=performance.now(),n=t-this.#t;if(n>0){const r=e.x/n,s=e.y/n;this.#e.x=this.#e.x*(1-Ht)+r*Ht,this.#e.y=this.#e.y*(1-Ht)+s*Ht}this.#t=t}checkStationaryDrag(){this.#n&&performance.now()-this.#t>qd&&(this.#e={x:0,y:0})}applyInertia(e){const t={x:0,y:0};if(!this.#n){const n=Math.sqrt(this.#e.x*this.#e.x+this.#e.y*this.#e.y);if(n>Jd){t.x=this.#e.x*e,t.y=this.#e.y*e;const r=Yd*e,s=Math.max(0,n-r);if(s>0){const i=s/n;this.#e.x*=i,this.#e.y*=i}else this.#e.x=0,this.#e.y=0}else this.#e.x=0,this.#e.y=0}return t}reset(){this.#e={x:0,y:0},this.#n=!1,this.#t=0}get isDragging(){return this.#n}}class Qd{constructor(e){this.renderContext=e;const{x:t,y:n}=e.general.upscale.gameEngineScreenSize;this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer),this.output.rect(0,0,t,n).fill("#00000000")}output=new ee({label:"OnScreenLook",eventMode:"static"});#e;#t=void 0;#n;#o=new Zd;handleTouchStart=e=>{this.#e!==void 0&&this.stopCurrentPointer(),this.#n.curPointerId!==e.pointerId&&(this.#e=e.pointerId,this.#t=Xa(e,"x","y"),this.#o.startDrag(),this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#e=void 0,this.#t=void 0,this.#o.stopDrag(),this.renderContext.inputStateTracker.hudInputState.directionVector=R,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#e)return;const t=this.#t,n=Ps(w.getState()),{x:r,y:s}=e,i=(t.x-r)/n,a=(t.y-s)/n;this.#o.updateVelocity({x:i,y:a});const{inputStateTracker:{hudInputState:l}}=this.renderContext;l.lookVector.x+=i,l.lookVector.y+=a,t.x=r,t.y=s};tick(e){if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer(),this.#o.reset();return}const{deltaMS:n}=e,{inputStateTracker:{hudInputState:r}}=this.renderContext;this.#o.checkStationaryDrag();const s=this.#o.applyInertia(n);r.lookVector.x+=s.x,r.lookVector.y+=s.y}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}get curPointerId(){return this.#e}set joystickRenderer(e){this.#n=e}}const K=14,Kd=2,eh=Math.cos(30*(Math.PI/180)),th=40,oh="#00000000";class nh{constructor(e){this.renderContext=e;const{inputDirectionMode:t,general:{colourised:n,pixiRenderer:r}}=e;this.#t=b({textureId:"joystick.whole",anchor:{x:.5,y:.5},y:1,spritesheetVariant:n?"for-current-room":"uncolourised"}),this.#e={away:new D({pixiRenderer:r,outline:!0,x:K,y:-K,text:"↗"}),right:new D({pixiRenderer:r,outline:!0,x:K,y:K,text:"↘"}),towards:new D({pixiRenderer:r,outline:!0,x:-K,y:K,text:"↙"}),left:new D({pixiRenderer:r,outline:!0,x:-K,y:-K,text:"↖"}),...t!=="4-way"?{awayRight:new D({pixiRenderer:r,outline:!0,x:K*Math.SQRT2,text:"➡"}),towardsRight:new D({pixiRenderer:r,outline:!0,y:K*Math.SQRT2,text:"⬇"}),towardsLeft:new D({pixiRenderer:r,outline:!0,x:-K*Math.SQRT2,text:"⬅"}),awayLeft:new D({pixiRenderer:r,outline:!0,y:-K*Math.SQRT2,text:"⬆"})}:{}},this.output.addChild(this.#t),this.output.addChild(new ee().circle(0,0,th).fill(oh)),this.output.addChild(new y({children:Object.values(this.#e),y:Wa/2})),this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer)}output=new y({label:"OnScreenJoystick",eventMode:"static"});#e;#t;#n;#o;#r;handleTouchStart=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#o.curPointerId!==e.pointerId&&(this.#n=e.pointerId,this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=R,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const t=Ps(w.getState()),{x:n,y:r}=this.output,{x:s,y:i}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(s/t-n)/(a/2),u=(i/t-r)/(l/2),d=Ya({x:-c,y:-u});this.renderContext.inputStateTracker.hudInputState.directionVector=B(Ja(d,eh),Kd)};tick({room:e}){const{renderContext:{general:{colourised:t},inputStateTracker:{directionVector:n}}}=this;if(this.#r!==e&&(this.#t.texture=xt(t?"for-current-room":"uncolourised","joystick.whole"),this.#r=e),w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const s=Ee(n)>qa?co(n):void 0,i=De(t,e.color,!0),a=De(t,e.color,!1);for(const[l,c]of ps(this.#e))c.tint=l===s?i:a}get curPointerId(){return this.#n}set lookRenderer(e){this.#o=e}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}}const Rr=30,Pr=15,rh=42,sh=36,ih=44,ah=20;class lh{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:t}},inputDirectionMode:n,general:r}=e;this.#t={mainButtonNest:new y({label:"mainButtonNest"}),buttons:{jump:new $e({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:t},jd),fire:new $e({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:t},$d),carry:new $e({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:t},Vd),carryAndJump:new $e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:t},eu),menu:new $e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:t},Wd),map:new $e({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:t},Xd)},joystick:new nh({inputStateTracker:t,inputDirectionMode:n,general:r}),look:new Qd({inputStateTracker:t,general:r})},this.#t.look.joystickRenderer=this.#t.joystick,this.#t.joystick.lookRenderer=this.#t.look,this.#n(),this.#o()}#e=new y({label:"OnScreenControls"});#t;#n(){const{buttons:e}=this.#t,{mainButtonNest:t,joystick:n,look:r}=this.#t;this.#e.addChild(r.output);for(const{renderContext:{button:{which:s}},output:i}of ie(e))s==="menu"||s==="map"?this.#e.addChild(i):t.addChild(i);e.jump.output.y=Pr,e.carry.output.x=-Rr,e.carryAndJump.output.y=-Pr,e.fire.output.x=Rr,e.menu.output.x=24,e.menu.output.y=24,e.map.output.y=16,this.#e.addChild(t),this.#e.addChild(n.output)}#o(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const t of ie(this.#t.buttons)){const{renderContext:{button:{actions:n}}}=t;t.output.eventMode="static",t.output.on("pointerdown",()=>{for(const r of n)e.hudInputState[r]=!0}),t.output.on("pointerup",()=>{for(const r of n)e.hudInputState[r]=!1}),t.output.on("pointerleave",()=>{for(const r of n)e.hudInputState[r]=!1})}}#r(e){this.#t.mainButtonNest.x=e.x-ih,this.#t.mainButtonNest.y=e.y-ah,this.#t.joystick.output.x=rh,this.#t.joystick.output.y=e.y-sh,this.#t.buttons.map.output.x=e.x-32}tick(e){const{screenSize:t}=e,{general:{gameState:n}}=this.renderContext;this.#r(t);for(const r of ie(this.#t.buttons))r.tick({...e,currentPlayable:lt(n)});this.#t.joystick.tick(e),this.#t.look.tick(e)}get output(){return this.#e}destroy(){this.#t.joystick.destroy(),this.#t.look.destroy(),this.#e.destroy({children:!0})}}Fe.frames.button.frame;const ch=o=>o.room!==void 0,uh=o=>o?48:24,dh=o=>o?68:56,hh=(o,e)=>o?e.x/2-24:80,ph=o=>o?72:24,fh=o=>o?88:0,Mr=112,gt=o=>o==="heels"?1:-1,Br="head.walking.right.2",Ar="heels.standing.towards";class mh{constructor(e){this.renderContext=e;const{onScreenControls:t,general:n}=e;this.#o={head:{sprite:this.#l("head"),livesText:new D({pixiRenderer:n.pixiRenderer,label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#a({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#a({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#l("heels"),livesText:new D({pixiRenderer:n.pixiRenderer,label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#a({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new y({label:"heelsCarrying"})}}};for(const s of Ut)this.#e.addChild(this.#o[s].shield.container),this.#e.addChild(this.#o[s].extraSkill.container);t||(this.#e.addChild(this.#o.head.doughnuts.container),this.#e.addChild(this.#o.head.hooter.container),this.#e.addChild(this.#o.heels.bag.container),this.#e.addChild(this.#o.heels.carrying.container)),this.#c(),t&&(this.#t=new lh({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#t.output));for(const s of Ut)this.#e.addChild(this.#o[s].sprite),this.#e.addChild(this.#o[s].livesText);this.#r=hs({predicate(s,i,a){return Me(i)!==Me(a)},effect:(s,{getState:i})=>{Me(i())?(this.#n=new ir(e),this.#i()):(this.#n?.destroy(),this.#n=void 0)}});const r=Me(w.getState());this.#n=r?new ir(e):void 0,this.#n&&this.#i()}#e=new y({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#n;#o;#r;#s=void 0;#i(){this.#e.addChild(this.#n.output)}#c(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const t of Ut){const{sprite:n,livesText:r}=this.#o[t];for(const s of[n,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${t}`]=!0}),s.on("pointerup",()=>{e[`swop.${t}`]=!1}),s.on("pointerleave",()=>{e[`swop.${t}`]=!1})}}#a({textureId:e,textOnTop:t=!1,noText:n=!1,outline:r=!1,label:s}){const i=new y({label:s});i.pivot={x:4,y:16};const a=new N({texture:me().textures[e],anchor:t?{x:.5,y:0}:{x:.5,y:1},y:t?0:8});i.addChild(a);const l=Pe.w/2,c=new D({pixiRenderer:this.renderContext.general.pixiRenderer,outline:r==="text-only",y:t?0:16,x:l});return n&&(c.visible=!1),a.x=l,i.addChild(c),r===!0&&(i.filters=Dt.pureBlack),{textContainer:c,icon:a,container:i}}#l(e){const t=new N(me().textures[e==="head"?Br:Ar]);return t.anchor={x:.5,y:0},t}#u({screenSize:e}){this.#o.head.hooter.container.x=this.#o.head.doughnuts.container.x=(e.x>>1)+gt("head")*Mr,this.#o.head.doughnuts.container.y=e.y-wt.h-8,this.#o.heels.carrying.container.y=e.y-wt.h,this.#o.heels.carrying.container.x=this.#o.heels.bag.container.x=(e.x>>1)+gt("heels")*Mr,this.#o.heels.bag.container.y=this.#o.head.hooter.container.y=e.y-8,this.#n&&(this.#n.output.x=e.x/2-Pe.w*1.5)}#d({room:e}){const{renderContext:{general:{gameState:t,colourised:n}}}=this,r=Vt(t,"heels"),s=r?.carrying??null,{container:i}=this.#o.heels.carrying,a=i.children.length>0;if(s===null&&a){for(const u of i.children)u.destroy();this.#s=void 0}if(s!==null&&(!a||e!==this.#s)){const u=_i(s,this.renderContext,e);this.#s=e,i.removeChildren(),i.addChild(u),i.tint=mt(n,e.color,!0)}const l=this.#o.heels.bag.icon,c=r?.hasBag;l.texture=xt(qe(n,c??!1),"bag"),l.tint=mt(n,e.color,c??!1)}#h({room:e}){const{renderContext:{general:{gameState:t,colourised:n}}}=this,r=Vt(t,"head"),s=r?.doughnuts??0,i=s!==0,a=r?.hasHooter,l=this.#o.head.hooter.icon,c=this.#o.head.doughnuts.icon,u=this.#o.head.doughnuts.textContainer;l.texture=xt(qe(n,a??!1),"hooter"),c.texture=xt(qe(n,i),"doughnuts"),this.#o.head.doughnuts.textContainer.text=s,u.tint=De(n,e.color,!1),l.tint=mt(n,e.color,a??!1),c.tint=mt(n,e.color,i)}#f(e,{screenSize:t,room:n}){const{renderContext:{onScreenControls:r,general:{gameState:s,colourised:i}}}=this,a=Vt(s,e),{textContainer:l,container:c,icon:u}=this.#o[e].shield,{textContainer:d,container:h,icon:p}=this.#o[e].extraSkill,f=to(a),m=f>0||!r;c.visible=m,m&&(l.text=f,c.y=t.y-fh(r)),h.x=c.x=(t.x>>1)+gt(e)*hh(r,t);const v=a===void 0?0:e==="head"?On(a):a.bigJumps,x=v>0||!r;h.visible=x,x&&(d.text=v,h.y=t.y-ph(r)),d.tint=De(i,n.color,!1),l.tint=De(i,n.color,!1),u.tint=Ir(i,n.color),p.tint=Ir(i,n.color)}#p(e,t){const{currentCharacterName:n}=e;return n===t||n==="headOverHeels"}#m(e,{screenSize:t,room:n}){const{renderContext:{onScreenControls:r,general:{gameState:s,colourised:i}}}=this,a=this.#o[e].sprite;let l;const c=this.#p(s,e),u=qe(i,c);try{l=xt(u,e==="head"?Br:Ar)}catch(d){throw console.error(this.renderContext),new Error(`error getting texture for variant ${u}`,{cause:d})}a.texture=l,a.x=(t.x>>1)+gt(e)*dh(r),a.y=t.y-wt.h,a.tint=mt(i,n.color,c)}#g(e,{screenSize:t,freeCharacters:n,room:r}){const{renderContext:{onScreenControls:s,general:{gameState:i,colourised:a}}}=this,c=n[e]??!1?"FREE":Vt(i,e)?.lives??0,u=this.#o[e].livesText;u.x=(t.x>>1)+gt(e)*uh(s),u.y=t.y,u.text=c;const d=this.#p(i,e),h=r.color.shade==="dimmed",p=a?Fs(h)[d?No[e]:"midGrey"]:Y(_t(r.color).hud.brightHue);u.tint=p}tick(e){if(ch(e)){for(const t of Ut)this.#g(t,e),this.#m(t,e),this.#f(t,e);this.#u(e),this.#h(e),this.#d(e),this.#t?.tick(e),this.#n&&(this.#n.isDark=e.room.color.shade==="dimmed")}}get output(){return this.#e}destroy(){this.#o.head.doughnuts.textContainer.destroy(),this.#o.head.hooter.textContainer.destroy(),this.#o.heels.bag.textContainer.destroy(),this.#e.destroy({children:!0}),this.#t?.destroy(),this.#n?.destroy(),this.#r()}}const gh=(o,e,t,n)=>o===void 0||o.renderContext.general.colourised!==e||o.renderContext.onScreenControls!==t||o.renderContext.inputDirectionMode!==n,bh=(o,e,t,n,r,s)=>o===void 0||e||o.renderContext.general.upscale!==t||o.renderContext.general.displaySettings!==n||o.renderContext.general.soundSettings!==r||o.renderContext.general.paused!==s,$=o=>{const e=typeof o=="string"?{soundId:o}:o,{playbackRate:t=1,soundId:n,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=C.createBufferSource(),c=Vo()[n];return l.buffer=c,l.loop=s,l.playbackRate.value=i?t-.05+Math.random()*.1:t,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Ne=(o,e,t)=>{const n=C.createGain();return e!==void 0&&(n.gain.value=e),o.connect(n),n.connect(t),n},j=({start:o,change:e,loop:t,stop:n,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?o!==void 0&&!(a&&s)?(l&&(l.onended=null,l.stop()),l=$({...o}),Ne(l,o.gain,i),t!==void 0&&(r?(l=$({...t,loop:!0}),Ne(l,t.gain,i)):l.onended=()=>{c&&(l&&(l.onended=null,l.stop()),l=$({...t,loop:!0}),Ne(l,t.gain,i))})):t!==void 0&&(l=$({...t,loop:!0}),Ne(l,t.gain,i)):(l&&l.loop&&(l.onended=null,l.stop()),n!==void 0&&(l=$({...n}),Ne(l,n.gain,i)));else if(c!==u&&e!==void 0){const h=$({...e});Ne(h,e.gain,i)}a=!1,c=u}};class yh{constructor(e){this.renderContext=e,this.output.gain.value=4}output=C.createGain();#e=j({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:t}}}}=this,n=(e.x!==0||e.y!==0)&&t!==null;this.#e(n)}destroy(){}}class vh{constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&$({soundId:"bonus",connectTo:this.output});break}case"disappearing":{$({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,$({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=C.createGain();tick(){}destroy(){}}class xh{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=C.createGain();#e=C.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{pressed:e}}}}=this,t=this.#t?.pressed;t!==void 0&&t!==e&&$({soundId:"switchClick",playbackRate:e?.95:1.05,connectTo:this.#e}),this.#t={pressed:e}}destroy(){}}class En{constructor(e,t,n=1){this.renderContext=e,this.#e=j({start:t},this.output),this.output.gain.value=n}output=C.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:t}}=this,{state:{collidedWith:{roomTime:n,by:r}}}=t,s=n>(e??xe)&&!Ms(vn(r));this.#e(s)}destroy(){}}class wh{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n=new En(e,{soundId:"metalHit"},.3),this.#n.output.connect(this.output)}output=C.createGain();#e=C.createGain();#t=j({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#n;tick(e){const{renderContext:{item:t,room:{roomTime:n,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=n===s&&ye(vn(i)).some(l=>Ts(r[l]));this.#t(a),this.#n.tick(e)}destroy(){}}const Bo=2;class Sh{constructor(e){this.renderContext=e}output=C.createGain();#e=j({start:{soundId:"conveyorStart",playbackRate:Bo},loop:{soundId:"conveyorLoop",playbackRate:Bo},stop:{soundId:"conveyorEnd",playbackRate:Bo}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=Ft(e);this.#e(t)}destroy(){this.#e(!1)}}class Ch{constructor(e){this.renderContext=e,$({soundId:"hooter",connectTo:this.output})}output=C.createGain();tick(){}destroy(){}}const Th=3;class kh{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=C.createGain();#e=$({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Th*e)}destroy(){}}const Or={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},_r={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Dr={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Fr={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Ih{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e;Or[t]!==void 0&&(this.#r=new En(e,Or[t]),this.#r.output.connect(this.output)),_r[t]!==void 0&&(this.#n=j({change:_r[t]},this.#e)),Fr[t]!==void 0&&(this.#s=j(Fr[t],this.#e)),Dr[t]!==void 0&&(this.#o=j({loop:Dr[t]},this.#t))}output=C.createGain();#e=C.createGain();#t=C.createGain();#n;#o;#r;#s;tick(e){const{renderContext:{item:t}}=this,{state:{facing:n,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#n){const a=co(n);this.#n(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!s;this.#o(a)}if(this.#s){const a=!Ue(i,R);this.#s(a)}}destroy(){}}const Rh=.8,Ph=1.2,Mh=.8;class Ao{constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:n}}=e,{noFootsteps:r}={...ct.soundSettings,...t};r||(this.#e=C.createGain(),this.#e.gain.value=Rh,this.#e.connect(this.output),this.#t=j({loop:{soundId:`${n==="headOverHeels"?"heels":n}Walk`}},this.#e)),this.#n.gain.value=Mh,this.#n.connect(this.output),this.#c.gain.value=Ph,this.#c.connect(this.output),this.#s.connect(this.output),this.#o=j({start:{soundId:`${n==="headOverHeels"?"head":n}Jump`}},this.#n),this.#r=j({loop:{soundId:`${n==="headOverHeels"?"head":n}Fall`}},this.#n)}output=C.createGain();#e;#t;#n=C.createGain();#o;#r;#s=C.createGain();#i=j({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#s);#c=C.createGain();#a=j({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#c);#l={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:t}}=this,{state:{action:n,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=t,h=tt(t),{teleportingPhase:p,positionZ:f}=this.#l,m=r?r.phase:null,v=i&&l>s&&l>f&&c>0,x=l<f&&c<0&&a===null;this.#r(x),this.#o(v),this.#t!==void 0&&this.#t(!v&&!x&&n==="moving"),h!==void 0&&this.#a(h.carrying!==null);const P=a!==null&&u>(e??xe)&&d[a];if(this.#i(P),m!==null&&m!==p)if(m==="in"){const I=Vo().teleportIn,T=C.createBufferSource();T.buffer=I,T.connect(this.output),T.start()}else{const I=Vo().teleportOut,T=C.createBufferSource();T.buffer=I,T.connect(this.output),T.start()}this.#l={teleportingPhase:m,positionZ:l}}destroy(){}}class Bh{constructor(e){this.renderContext=e}output=C.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:t}}}}=this;if(t!=="drum")return;const n=this.#e?.stoodOn??!1,r=Ft(e);!n&&r&&$({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Ah{constructor(e){this.renderContext=e,this.scrapeBracketed=j({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4}output=C.createGain();scrapeBracketed;tick({movedItems:e}){const{renderContext:{item:t,room:{roomTime:n}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:s}}=t,i=n===r&&s!==null&&e.has(t);this.scrapeBracketed(i)}destroy(){}}class Oh extends En{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}class _h{constructor(e){this.renderContext=e}output=C.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:n}}}}=this,r=Ft(t);e!==void 0&&n>e&&!r&&$({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Dh{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=C.createGain();#e=C.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,n=t.type==="in-store"?Is(w.getState().gameMenus,t.path)?"right":"left":e,r=this.#t?.setting;r!==void 0&&r!==n&&$({soundId:"switchClick",playbackRate:n==="right"?.95:1.05,connectTo:this.#e}),this.#t={setting:n}}destroy(){}}class Fh{constructor(e){this.renderContext=e}output=C.createGain();#e=j({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:t}}=this;this.#e(ht(e)&&we(e.state.stoodOnBy,t).some(oe))}destroy(){}}const zh=(o,e)=>us(we(o.state.stoodOnBy,e).filter(Rs));class Lh{constructor(e){this.renderContext=e,this.output.gain.value=2}output=C.createGain();#e=void 0;tick(e){const{renderContext:{item:t,room:n}}=this,r=zh(t,n);this.#e!==void 0&&r<this.#e&&$({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=r}destroy(){}}const Eh={lift:kh,switch:Dh,button:xh,bubbles:vh,head:Ao,heels:Ao,headOverHeels:Ao,teleporter:Fh,monster:Ih,conveyor:Sh,spring:_h,portableBlock:Bh,charles:wh,ball:yh,pushableBlock:Ah,firedDoughnut:Ch,slidingBlock:Oh},Uh=o=>{if(o.item.type==="deadlyBlock"&&o.item.config.style==="toaster")return new Lh(o);const e=Eh[o.item.type];if(e)return new e(o)},zr=S.z*-1,Lr=S.z*Za,Vh=0,Gh=S.x*16,$h={x:0,y:0,z:0},Oo=(o,e,t)=>(o-e)/(t-e)*2-1,Hh=.5,Nh=.3;class jh{constructor(e,t){this.renderContext=e,this.childRenderer=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const n=Cn(e.room).floors;this.soundPositionMinX=n.edgeLeftX,this.soundPositionMaxX=n.edgeRightX}output=C.createPanner();soundPositionMinX;soundPositionMaxX;tick(e){this.childRenderer.tick(e);const{item:t}=this.renderContext,n=t.state,r=ln(Bs($h,t.aabb,.5),n.position),s=Oo(Zt(r),this.soundPositionMinX,this.soundPositionMaxX),i=Oo(r.z,zr,Lr);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${zr},
          ${Lr},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(n.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=Oo(r.x+r.y,Vh,Gh);this.output.positionX.value=s*Hh,this.output.positionY.value=i,this.output.positionZ.value=a*Nh}destroy(){this.childRenderer.destroy()}}class Xh{constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(n=>n.output))}#e;#t=new y({label:"CompositeRenderer"});tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}var Wh=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uTargetColor;const float blackThreshold=sqrt(3.0)*0.1;void main(void){vec4 c=texture(uTexture,vTextureCoord);float isBlack=step(length(c.rgb),blackThreshold);finalColor=mix(vec4(uTargetColor,1),c,max(isBlack,1.0-c.a));}`;const Yh=U.from({vertex:be,fragment:Wh,name:"revert-colourise-filter"});class Jh extends E{uniforms;constructor(e="white"){super({glProgram:Yh,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[t,n,r]=new _e(e).toArray();this.uniforms.uTargetColor[0]=t,this.uniforms.uTargetColor[1]=n,this.uniforms.uTargetColor[2]=r}}const Di=et,qh=g.pastelBlue,Er=Dt.highlightBeige,Zh=g.lightBeige,Qh=Dt.lightBeige,Ur=Dt.midRed,Kh=Dt.white,Vr=new Jh(qh),_o=g.white,Gr=g.midRed,ep=g.pastelBlue,$r={left:"↖",away:"↗",right:"↘",towards:"↙"},Hr=o=>o.type==="switch"&&o.config.type==="in-room"||o.type==="button",Nr=(o,e)=>{switch(o){case"back-forth":switch(e){case"left":return"↖↘";case"right":return"↘↖";case"away":return"↗↙";case"towards":return"↙↗";default:throw new Error("Unexpected startDirection")}case"forwards":switch(e){case"left":return"↖";case"right":return"↘";case"away":return"↗";case"towards":return"↙";default:throw new Error("Unexpected startDirection")}case"clockwise":switch(e){case"left":return"↖↗↘↙";case"right":return"↘↙↖↘";case"away":return"↗↘↙↖";case"towards":return"↙↖↗↘";default:throw new Error("Unexpected startDirection")}case"towards-analogue":return"➡.⬅"}return""},tp=o=>o.type==="monster"&&o.config.activated==="after-player-near";class op{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output),this.#e()}output=new y({label:"EditorAnnotationsRenderer"});#e(){const e=this.renderContext.item;switch(e.type){case"pickup":if(e.config.gives==="shield"||e.config.gives==="extra-life"||e.config.gives==="jumps"||e.config.gives==="fast"){const t={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"};this.#t({annotationText:t[e.config.gives],yAdj:-16})}break;case"doorFrame":if(e.config.part==="near"){const{rooms:t}=w.getState().levelEditor.campaignInProgress,{config:{toRoom:n,direction:r}}=e;if(n!==xs){const s=!!t[n],i=$r[r],a=r==="away"||r==="right"?`${n}${i}`:`${i}${n}`;this.#t({annotationText:a,yAdj:r==="left"||r==="away"?-48:0,tint:s?_o:Gr,clickDispatch:s?()=>qn(n):void 0})}}break;case"teleporter":{const{rooms:t}=w.getState().levelEditor.campaignInProgress,{config:{toRoom:n}}=e,r=!!t[n];this.#t({annotationText:`➡${n}`,yAdj:-12,tint:r?_o:Gr,clickDispatch:r?()=>qn(n):void 0})}break;case"conveyor":{const{config:{direction:t}}=e,n=$r[t];this.#t({annotationText:n,yAdj:-12})}break;case"movingPlatform":{const{config:{movement:t,startDirection:n}}=e;this.#t({annotationText:Nr(t,n),yAdj:-12})}break;case"monster":{const{config:t}=e;switch(!0){case(t.which==="cyberman"&&t.activated==="after-player-near"):this.#t({annotationText:"wake",tint:Zh,yAdj:-12});break;case(t.which==="turtle"||t.which==="skiHead"):this.#t({annotationText:Nr(t.movement,t.startDirection),yAdj:-12});break}}break}}#t({annotationText:e,yAdj:t=0,tint:n=_o,clickDispatch:r}){const{renderContext:{frontLayer:s,general:{pixiRenderer:i}}}=this,a=new D({pixiRenderer:i,label:"EditorAnnotationTextContainer",outline:!0,tint:n,text:e,y:t});r!==void 0&&(a.eventMode="static",a.on("click",()=>{w.dispatch(r())}),a.on("mouseover",()=>{w.getState().levelEditor.tool.type==="pointer"&&(w.dispatch(Zn(!0)),a.tint=ep)}),a.on("mouseout",()=>{w.dispatch(Zn(!1)),a.tint=n}),a.cursor="pointer"),this.output.addChild(a),s.attach(a)}tick(e){this.#n(),this.childRenderer.tick(e)}#n(){const{renderContext:{room:e}}=this,t=this.renderContext.item,{clickableAnnotationHovered:n}=w.getState().levelEditor,{jsonItemId:r}=t,s=w.getState(),i=Jl(s),a=ql(s),l=Zl(s),c=r&&i?.jsonItemId===r&&!n,u=r&&a.includes(r),d=()=>r!==void 0&&(q(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&Hr(h)&&h.config.modifies.some(p=>p.expectType===t.type&&(p.targets===void 0||p.targets.includes(r))))||Hr(t)&&q(e.items).some(({jsonItemId:h,type:p})=>h!==void 0&&h===i?.jsonItemId&&t.config.modifies.some(f=>f.expectType===p&&(f.targets===void 0||f.targets.includes(h))))||t.type==="charles"&&q(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&h.type==="joystick"&&h.config.controls.some(p=>p===r))||t.type==="joystick"&&t.config.controls.some(h=>i?.jsonItemId===h));this.output.filters=c&&u?[Vr,l.type==="eyeDropper"?Ur:Er]:c?l.type==="eyeDropper"?Ur:Er:u?Vr:d()?Kh:tp(t)?Qh:Di}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const np=(o,e,t)=>e.general.editor?new op(e,t):t;class Fi extends fi{}const jr=(o,e)=>{e.poly([k({}),k({x:o.x}),k({x:o.x,y:o.y}),k({y:o.y})]).poly([k({}),k({z:o.z}),k({y:o.y,z:o.z}),k({y:o.y})]).poly([k({x:o.x}),k({x:o.x,z:o.z}),k(o),k({x:o.x,y:o.y})]).poly([k({z:o.z}),k({x:o.x,z:o.z}),k({x:o.x,y:o.y,z:o.z}),k({y:o.y,z:o.z})])},Xr=(o,e)=>{const t=new ee;return jr(o,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),jr(o,t),t.stroke({width:.5,color:e,alpha:1})}),t},rp={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class sp{constructor(e){this.renderContext=e;const{item:t}=e,n=rp[t.type]??"rgba(255,255,255)";if(this.#e=new y({label:`ItemBoundingBoxRenderer ${t.id}`}),Bt("portal")(t)){const s=k(t.config.relativePoint);this.#e.addChild(new ee().circle(s.x,s.y,5).stroke(n)),this.#e.addChild(new ee().circle(s.x,s.y,2).fill(n))}if(this.#e.addChild(new ee({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(Xr(t.aabb,n)),t.renderAabb){const s="rgba(184, 184, 255)",i=Xr(t.renderAabb,s);if(t.renderAabbOffset){const a=k(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(r=new dc({text:s,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)}),e.frontLayer.attach(this.#e)}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const ip=75;class ap{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const n=e.room.color.shade==="dimmed"?uo:g;this.#e=new Qo(n.moss),this.#t=new Qo(n.midRed),this.#n=new ge({color:n.pureBlack}),this.#e.enabled=!1,this.#t.enabled=!1,this.#n.enabled=!1,this.output.filters=[this.#e,this.#t,this.#n]}output=new y({label:"ItemFlashOnSwitchedRenderer"});#e;#t;#n;tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:n}},room:{roomTime:r}}}=this,s=r-t<ip,i=n==="left";this.#e.enabled=s&&i,this.#t.enabled=s&&!i,this.#n.enabled=s,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const lp=(o,e)=>{const{item:t,room:{items:n}}=o;return q(n).filter(Qa).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new ap(o,e):e},zi=(o,e,t,n)=>{const r=1/n;o.x=xr(e,r),o.y=xr(t,r)},Li=new ic;Li.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class cp{constructor(e,t){this.renderContext=e,this.wrappedRenderer=t,this.output=new y({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#t()}output;#e=new Map;#t(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=k(this.renderContext.item.state.position);zi(this.output,t.x,t.y,e)}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#t(),this.#s()}#n(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return nt;let n;for(const[r,s]of t)s&&(n||(n=new Set),n.add(r));return n??nt}#o(e,t){const n=new y({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(n),n.setMask({mask:t,inverse:!0}),this.#e.set(e,n),n}#r(e,t){const[n,r]=t.children,s=t.parent;s.removeChild(t),s.addChild(r),t.mask=null,n.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#n();for(const n of this.#e.keys())if(!t.has(n)){const r=this.#e.get(n);if(r)try{this.#r(n,r)}catch(s){throw new Error(`error while destroying masking container ${$o(r)} 
              for our rendering: ${$o(this.output)}`,{cause:s})}}for(const n of t){const r=this.#e.get(n),s=r?.children[0],i=this.renderContext.getItemRenderPipeline(n)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=Li;const l=se(e,i,s,`red mask: ${n}`);i.filters=a,r===void 0&&this.#o(n,l);const c=this.renderContext.room.items[n],u=te(k(c.state.position),k(this.renderContext.item.state.position));l.x=u.x,l.y=u.y}}destroy(){this.output.destroy({children:!0}),this.wrappedRenderer?.destroy()}}const Do=(o,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:n})=>{const r=n?.renderProps,s=at(t)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=b({textureId:s==="left"||s==="away"?`shadowMask.${o}.away`:`shadowMask.${o}.right`,spritesheetVariant:"original"});return a.y=-(S.z*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},up={left:"away",towardsLeft:"awayRight",towards:"right"},dp=(o,e,t)=>{if(!e)return`shadowMask.${o}.${t}`;const n=`shadowMask.${o}.falling.${t}`;return ks(n)?n:`shadowMask.${o}.${t}`},Fo=(o,e=1)=>({renderContext:{item:{state:{visualFacingVector:t,facing:n,action:r}}},currentRendering:s})=>{const i=s?.renderProps,a=co(t??n)??"towards",l=r==="falling";if(!(i===void 0||a!==i.facingXy8||l!==i.falling))return"no-update";const u=up[a],h=dp(o,l,u??a),p=b({textureId:h,spritesheetVariant:"original"});return p.y=-(S.z*(e-1)),p.scale.x=u===void 0?1:-1,{output:p,renderProps:{facingXy8:a,falling:l}}},hp=({renderContext:{general:{pixiRenderer:o},item:e,room:t},currentRendering:n})=>{const{state:{stoodOnBy:r},config:{times:s}}=e,i=n?.renderProps,a=ht(e),l=a&&we(r,t).find(oe)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:dt(o,bo({textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.artificial",spritesheetVariant:"original"},s)),renderProps:{flashing:l,activated:a}}:"no-update"},Wr={lift:Q({textureId:"shadowMask.smallBlock",spritesheetVariant:"original"}),conveyor:he(({direction:o})=>({textureId:"shadowMask.conveyor",flipX:ot(o)==="x",spritesheetVariant:"original"})),doorLegs:he(({direction:o})=>({textureId:o==="right"||o==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:ot(o)==="y",spritesheetVariant:"original"})),teleporter:hp,floor:"no-mask",barrier:he(({axis:o})=>({textureId:"shadowMask.barrier.y",flipX:o==="x",y:-1,spritesheetVariant:"original"})),spring:Md,block:he(({style:o})=>({textureId:`shadowMask.${o}`,spritesheetVariant:"original"})),pushableBlock:Q({textureId:"shadowMask.stepStool",spritesheetVariant:"original"}),movingPlatform:Q({textureId:"shadowMask.sandwich",spritesheetVariant:"original"}),hushPuppy:Q({textureId:"shadowMask.hushPuppy",spritesheetVariant:"original"}),portableBlock:he(({style:o})=>({textureId:o==="drum"?"shadowMask.drum":"shadowMask.smallBlock",spritesheetVariant:"original"})),slidingBlock:he(({style:o})=>o==="book"?{textureId:"shadowMask.book",flipX:!0,spritesheetVariant:"original"}:{textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),deadlyBlock:he(({style:o})=>({textureId:o==="volcano"?"shadowMask.volcano":"shadowMask.toaster",spritesheetVariant:"original"})),spikes:Q({textureId:"shadowMask.spikes",spritesheetVariant:"original"}),switch:Q({textureId:"shadowMask.switch",spritesheetVariant:"original"}),button:Q({textureId:"shadowMask.buttonInGame",spritesheetVariant:"original"}),pickup:he(({gives:o})=>{switch(o){case"scroll":return{textureId:"shadowMask.scroll",spritesheetVariant:"original"};case"doughnuts":return{textureId:"shadowMask.doughnuts",spritesheetVariant:"original"};case"fast":case"extra-life":case"jumps":case"shield":return{textureId:"shadowMask.whiteRabbit",spritesheetVariant:"original"};default:return{textureId:"blank",spritesheetVariant:"original"}}}),slidingDeadly:Q({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),ball:Q({textureId:"shadowMask.ball",spritesheetVariant:"original"}),"monster.dalek":Q({textureId:"shadowMask.dalek",spritesheetVariant:"original"}),"monster.turtle":Do("turtle"),"monster.skiHead":Do("skiHead"),"monster.homingBot":Q({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),joystick:Q({textureId:"shadowMask.joystick",spritesheetVariant:"original"}),charles:Do("charles",2),head:Fo("head"),heels:Fo("heels"),headOverHeels:Fo("head",2)},pp=o=>{switch(o.type){case"monster":return Wr[`monster.${o.config.which}`];case"floor":return o.config.floorType==="none"?void 0:"no-mask";default:return Wr[o.type]}},fp=.66,mp=o=>o.shadowCastTexture!==void 0,je={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:Ka}};class gp{constructor(e,t){this.renderContext=e,this.appearance=t,this.#e.addChild(this.#t),this.#r||(this.#e.filters=new rc({alpha:fp}))}#e=new y({label:"ItemShadowRenderer"});#t=new y({label:"shadows"});#n;#o=new Map;initShadowMaskRenderer(){const{renderContext:e,appearance:t}=this;if(t!=="no-mask")if(this.#n=new Fi(e,t),e.item.shadowOffset===void 0)this.#e.addChild(this.#n.output);else{const n=new y({label:"shadowMaskOffset",children:[this.#n.output],...k(e.item.shadowOffset)});this.#e.addChild(n)}}get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#s(e){if(this.#n===void 0)return;const t=this.#n.output.children.at(0);this.#n.tick(e);const n=this.#n.output.children.at(0);if(n===void 0||!(n instanceof N)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${n}`)}t!==n&&(this.#r?this.renderContext.frontLayer.attach(n):this.#e.mask=n)}destroy(){this.#e.destroy(!0),this.#n?.destroy();for(const e of Object.values(this.#o))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:n,general:{pixiRenderer:r},room:s}=this.renderContext,i=t.has(n),a=n.state.position.z+n.aabb.z;je.state.position.x=n.state.position.x,je.state.position.y=n.state.position.y,je.state.position.z=a,je.aabb.x=n.aabb.x,je.aabb.y=n.aabb.y;const l=new Set(Ss(je,s[bn],u=>u!==n&&mp(u)&&(u.castsShadowWhileStoodOn||u.state.position.z>n.state.position.z+n.aabb.z)&&!u.noShadowCastOn?.includes(n.type)));let c=!1;for(const[u,d]of this.#o)l.has(u)||(this.#t.removeChild(d),d.destroy(),this.#o.delete(u));for(const u of l){c=!0;let d=this.#o.get(u),h=!1;if(!d){const{times:p}=u.config,{shadowCastTexture:f}=u,m=bo(typeof f=="string"?{textureId:f}:f,p);d=dt(r,m),d.label=u.id,this.#t.addChild(d),this.#o.set(u,d),h=!0}if(h||i||t.has(u)){const p=k({...Qe(te(u.state.position,n.state.position),u.shadowOffset??J),z:n.aabb.z});d.x=p.x,d.y=p.y}}this.#e.visible=c,c?(this.#n===void 0&&this.initShadowMaskRenderer(),this.#s(e)):this.#n!==void 0&&(this.#n.destroy(),this.#n=void 0)}get output(){return this.#e}}const bp=o=>{const e=pp(o.item);return e===void 0?void 0:new gp(o,e)};class yp{constructor(e,t){this.renderContext=e,this.componentRenderers=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}class vp{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const{general:{colourised:n},room:r}=e;this.#e=new ge({color:n?(r.color.shade==="dimmed"?uo:g).moss:Y(r.color)}),this.#e.enabled=!1,this.output.filters=this.#e}output=new y({label:"PortableItemPickUpNextHighlightRenderer"});#e;tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;this.#e.enabled=t,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const xp=(o,e,t)=>yn(o)?new vp(e,t):t,wp=(o,e)=>{e!==void 0&&w.getState().gameMenus.cheatsOn&&(e.eventMode="static",e.on("pointertap",()=>{w.dispatch(ol({item:o,pixiContainer:e}))}))},Sp=o=>{const e=w.getState(),t=el(e),n=!tl(e),{general:{paused:r}}=o,{item:s}=o,i=t==="all"||t==="non-wall"&&o.item.type!=="wall",a=[],l=Oi(s);let c;if(l!==void 0){c=new Fi(o,l);const f=lp(o,c);a.push(np(s,o,xp(s,o,f)))}if(n&&!r){const f=bp(o);f!==void 0&&a.push(f)}i&&a.push(new sp(o));let u;if(a.length===0)u=void 0;else{const f=a.length===1?a[0]:new Xh(a,o);u=new cp(o,f),wp(s,u.output)}const d=o.general.soundSettings.mute??ct.soundSettings.mute,h=r||d?void 0:Uh(o),p=h===void 0?void 0:new jh(o,h);return{top:new yp(o,{graphics:u,sound:p}),itemAppearanceRenderer:c}},Cp=o=>{for(const[,l]of o)for(const[c]of l)l.set(c,!1);const e=Array.from(Tp(o));let t=e.length,n=t;const r=new Array(t),s={},i=kp(e);for(;n--;)s[n]||a(e[n],n,new Set,null);return r;function a(l,c,u,d){if(u.has(l)){if(d!==null){const f=o.get(d);f?.has(l)&&f.set(l,!0)}return}if(s[c])return;s[c]=!0;const h=o.get(l),p=Array.from(h?.entries()??nt);if(c=p.length){u.add(l);do{const[f,m]=p[--c];m||a(f,i.get(f),u,l)}while(c);u.delete(l)}r[--t]=l}};function Tp(o){const e=new Set;for(const[t,n]of o.entries()){e.add(t);for(const r of n.keys())e.add(r)}return e}function kp(o){const e=new Map;for(let t=0,n=o.length;t<n;t++)e.set(o[t],t);return e}const Ip=(o,e,t,n)=>(o.has(e)||o.set(e,new Map),o.get(e).set(t,n),o),bt=(o,e,t)=>{const n=o.get(e);return n!==void 0&&(n.delete(t),n.size===0&&o.delete(e)),o},zo=1e-5,Yr=-1,yt=(o,e,t,n,r)=>n-r>o&&t<e-r,Rp=0,Ei=1,Ui=2,Vi=3,Pp=(o,e)=>{const t=yt(o.zAxisProjectionMin,o.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,zo),n=yt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,zo),r=yt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,zo);return n&&r&&t?Ei:r&&t&&yt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Yr)?Ui:n&&t&&yt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Yr)?Vi:Rp},Mp=(o,e,t,n)=>{for(const r of As){const s=o[r],i=s+e[r],a=t[r],l=a+n[r];if(i<=a)return 1*(r==="z"?-1:1);if(s>=l)return-1*(r==="z"?-1:1)}return Jr(t)-Jr(o)},Bp=(o,e,t)=>{if(o.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=o.renderAabbOffset?Z(o.state.position,o.renderAabbOffset):o.state.position,r=o.renderAabb||o.aabb,s=e.renderAabbOffset?Z(e.state.position,e.renderAabbOffset):e.state.position,i=e.renderAabb||e.aabb;switch(Pp(t.getItemAxesProjections(o),t.getItemAxesProjections(e))){case Ei:return Mp(n,r,s,i);case Ui:return ce(n.y,s.y+i.y)&&ce(n.z,s.z+i.z)?1:ce(s.y,n.y+r.y)&&ce(s.z,n.z+r.z)?-1:0;case Vi:return ce(n.x,s.x+i.x)&&ce(n.z,s.z+i.z)?1:ce(s.x,n.x+r.x)&&ce(s.z,n.z+r.z)?-1:0;default:return 0}},Jr=o=>o.x+o.y-o.z,Ap=(o,e=new nl(ie(o)),t=new Set(ie(o)),n=new Map)=>{const r=new Map;for(const[s,i]of n)if(!o[s])n.delete(s);else for(const[a]of i)o[a]||bt(n,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=n.get(s.id);a?.forEach((l,c)=>{i.has(o[c])||a.delete(c)}),n.forEach((l,c)=>{i.has(o[c])||bt(n,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||r.get(a)?.has(s))continue;const l=Bp(s,a,e);if(r.has(s)||r.set(s,new Set),r.get(s).add(a),l===0){bt(n,s.id,a.id),bt(n,a.id,s.id);continue}const c=l>0?s.id:a.id,u=l>0?a.id:s.id;Ip(n,u,c,!1),bt(n,c,u)}}return n};class Op{constructor(e){this.renderContext=e;const{general:{colourised:t,soundSettings:n},room:r}=e,i=n.mute??ct.soundSettings.mute?void 0:C.createGain();this.output={sound:i,graphics:new y({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t||(this.#n=new or({sortableChildren:!1}),this.output.graphics.addChild(this.#n)),this.output.graphics.addChild(this.#o),t||(this.#t.tint=Y(r.color))}#e=!1;#t=new y({label:"items",cullableChildren:!0});#n;#o=new or({sortableChildren:!1});output;#r=void 0;#s=new Map;#i=new Map;#c=e=>this.#i.get(e);#a(e,t){let n=this.#i.get(t.id);if(n===void 0){n=Sp({...this.renderContext,colourClashLayer:this.#n,frontLayer:this.#o,item:t,zEdges:this.#s,getItemRenderPipeline:this.#c}),this.#i.set(t.id,n);const{graphics:r,sound:s}=n.top.output;if(r&&(this.#t.addChild(r),t.fixedZIndex&&(r.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{n.top.tick(e)}catch(r){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:r})}}#l(e){const{room:t}=this.renderContext,n={...e,lastRenderRoomTime:this.#r},r=new Set,s=a=>{if(r.has(a))return;const l=this.#s.get(a);if(l)for(const[c,u]of l.entries())u&&s(c);this.#a(n,t.items[a]),r.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#i.entries())t.items[a]===void 0&&(l.top.destroy(),this.#i.delete(a),i=!0);i&&this.#u()}#u(){if(this.#n)for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e);for(const e of this.#o.renderLayerChildren)e.parent===null&&this.#o.detach(e)}#d(e){for(let t=0;t<e.length;t++){const n=this.#i.get(e[t]);if(n===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const r=n.top.output.graphics;if(!r)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);r.zIndex=t}}get#h(){return this.#r!==void 0}tick(e){const t=this.#h?e:{...e,movedItems:new Set(q(this.renderContext.room.items))},{renderContext:{room:n}}=this;Ap(n.items,n[bn],t.movedItems,this.#s);const r=Cp(this.#s);this.#l(t),(!this.#h||t.movedItems.size>0)&&this.#d(r),this.#r=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#i.forEach(e=>{e.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const Xe=.4,_p=300,Dp=36,Fp=.2,zp=1250,qr=(o,e)=>ys(o,Math.min(1,e/_p));class Lp{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:n,general:{upscale:{gameEngineScreenSize:r},displaySettings:s}}=e,{floors:{edgeLeftX:i,edgeRightX:a,bottomEdgeY:l},allItems:{topEdgeY:c}}=Cn(n);this.#c=i,this.#a=a;const u=(a+i)/2,d=a-i,h=l-c,p=r.y>=h,f=p&&r.x>=d,m=p?16:rl()==="mobile"?-4:0;this.#l={x:r.x/2-u,y:r.y-m-l-(f?Math.abs(u/2):0)},this.#r=this.#l.x+this.#c<0,this.#s=this.#l.x+this.#a>r.x,this.#i=this.#l.y+c<0;const v=this.childRenderer.output.graphics;if(v===void 0)throw new Error("can't scroll a renderer without graphics");const x={sound:this.childRenderer.output.sound,graphics:new y({children:[v],label:`RoomScrollRenderer(${n.id})`})};(s?.showBoundingBoxes??ct.displaySettings.showBoundingBoxes)!=="none"&&x.graphics.addChild(Ep(e.room)),this.output=x}#e={x:0,y:0};#t={x:0,y:0};#n=xe;#o=!1;#r;#s;#i;#c;#a;#l;output;#u(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=this.#e,n=this.output.graphics,r=Qe(t,this.#t);zi(n,r.x,r.y,e)}#d(e){const{general:{gameState:t},room:{roomTime:n}}=this.renderContext,{deltaMS:r}=e,{inputStateTracker:{lookVector:s,hudInputState:{lookVector:i}}}=t;Jt(s)+Jt(i)<re?this.#n<n-zp&&(this.#t=te(this.#t,qr(this.#t,r))):(this.#n=n,this.#t=At(Z(this.#t,B(s,r*Fp)),i),i.x=0,i.y=0)}tick(e){const{general:{upscale:{gameEngineScreenSize:t},gameState:n}}=this.renderContext,{deltaMS:r}=e;this.#d(e);const s=lt(n);if(s===void 0)return;const i=k(s.state.position),a=Z(i,this.#l),l={x:this.#r&&a.x<t.x*Xe?Math.min(-this.#c,t.x*Xe-i.x):this.#s&&a.x>t.x*(1-Xe)?Math.max(t.x-this.#a,t.x*(1-Xe)-i.x):this.#l.x,y:this.#i&&a.y<t.y*Xe?t.y*Xe-i.y:this.#l.y};if(!this.#o)this.#e=l;else{const u=te(this.#e,l);if(Jt(u)>Dp){const d=qr(u,r);this.#e={x:this.#e.x-d.x,y:this.#e.y-d.y}}}this.#u(),this.#o=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Ep=o=>{const{floors:{edgeLeftX:e,edgeRightX:t,bottomEdgeY:n,topEdgeY:r},allItems:{topEdgeY:s}}=Cn(o);return new ee().rect(e,s,t-e,n-s).stroke("red").rect(e,r,t-e,n-r).stroke("blue")};var Up=`#version 300 es
precision highp float;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const int sampleCount=4;const float dimmedAttributeLum=0.6;const float isDimThresh03=1.5;const float saturationThreshold=0.15;const vec3 channelStrengthModifier=vec3(0.8,1.0,1.1);const vec4 pureWhiteColour=vec4(1.0,1.0,1.0,1.0);const vec4 pureBlueColour=vec4(0.0,0.0,1.0,1.0);const vec4 pureBlackColour=vec4(0.0,0.0,0.0,1.0);vec2 attributeBlockPos(vec2 texSize,float blockSize,vec2 textureCoord){vec2 pixelPos=textureCoord*texSize;return(floor(pixelPos/blockSize)*blockSize)/texSize;}vec4 attributeClash(sampler2D inputTexture,sampler2D lut,float blockSize,float blackPoint,float inputDim,vec2 textureCoord){vec2 textureSize=vec2(textureSize(inputTexture,0));vec2 blockPos=attributeBlockPos(textureSize,blockSize,textureCoord);vec3 colorSum=vec3(0.0);float colouredSamplesCount=0.001;vec2 stepSize01=vec2(blockSize/float(sampleCount))/textureSize;vec2 samplePos01=blockPos;for(int y=0;y<sampleCount;y++){samplePos01.y+=stepSize01.y;samplePos01.x=blockPos.x;for(int x=0;x<sampleCount;x++){samplePos01.x+=stepSize01.x;vec4 sampleColor=lutColourReplace(lut,texture(inputTexture,samplePos01))*inputDim;float isInBounds=step(0.0,samplePos01.x)*step(samplePos01.x,1.0)*step(0.0,samplePos01.y)*step(samplePos01.y,1.0);float useSample=isNotBlack(sampleColor,blackPoint)*isInBounds;colorSum+=sampleColor.rgb*sampleColor.rgb*useSample;colouredSamplesCount+=useSample;}}vec3 avgColor=colorSum/colouredSamplesCount;float avgColorLum03=max(avgColor.r+avgColor.g+avgColor.b,0.01);vec3 channelsStrength=avgColor/avgColorLum03;vec4 quantisedColor=vec4(step(0.3,channelsStrength*channelStrengthModifier),0.1);float maxChannel=max(channelsStrength.r,max(channelsStrength.g,channelsStrength.b));float minChannel=min(channelsStrength.r,min(channelsStrength.g,channelsStrength.b));float sat=maxChannel-minChannel;float isSaturated01=step(saturationThreshold,sat);float isBright=step(isDimThresh03,avgColorLum03);float thresholdForUnsatToBeBlue=step(isDimThresh03*0.3,avgColorLum03);float thresholdForSaturatedToBeBlue=step(isDimThresh03*0.03,avgColorLum03);vec4 unsatOrQuantisedColor=mix(mix(pureBlueColour,pureWhiteColour,thresholdForUnsatToBeBlue),mix(pureBlueColour,quantisedColor,thresholdForSaturatedToBeBlue),isSaturated01);float dimMultiplier=mix(dimmedAttributeLum,1.0,isBright);vec4 dimmedColor=unsatOrQuantisedColor*dimMultiplier;vec4 c=lutColourReplace(lut,texture(inputTexture,textureCoord))*inputDim;float originalColorIsNotBlack=isNotBlack(c,blackPoint);return mix(pureBlackColour,dimmedColor,originalColorIsNotBlack);}in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform float uBlockSize;uniform float uBlackPoint;uniform float uProgress;uniform sampler2D uLut;uniform float uCentreX;uniform float uCentreY;uniform vec4 uInputClamp;const float blackCircleMinSize=0.33;const float blackCircleFeathering=0.4;const float fadeDuration=0.1;float fade(){return 1.0-smoothstep(1.0 - fadeDuration,1.0,uProgress);}float blockDistToCentre(float ellipticalFactor){float xCentreTrue=uInputClamp.x+(uInputClamp.z-uInputClamp.x)*uCentreX;float yCentreTrue=uInputClamp.y+(uInputClamp.w-uInputClamp.y)*uCentreY;vec2 trueCentre=vec2(xCentreTrue,yCentreTrue);vec2 texSize=vec2(textureSize(uTexture,0));float texAspect=texSize.x/texSize.y;vec2 blockPos=attributeBlockPos(texSize,uBlockSize,vTextureCoord);return length((blockPos-trueCentre)/vec2(1,texAspect*ellipticalFactor));}float isInCirc(float blockDistToCentre01,float feathering,float circleMinSize,float progress){return smoothstep(progress-feathering,progress+feathering,pow(1.0-blockDistToCentre01,3.0)+circleMinSize);}void main(void){float elipticalFactor=mix(1.0,0.5,uProgress);float blockDistToCentre=blockDistToCentre(elipticalFactor);float insideBlackCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,blackCircleMinSize,uProgress-0.2);float insideInnerCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,0.0,uProgress*1.5-0.3);vec4 clashColour=attributeClash(uTexture,uLut,uBlockSize,uBlackPoint,max(insideBlackCirc01-pow(uProgress,4.0),0.0),vTextureCoord);vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(clashColour,c,insideInnerCirc01*fade());}`;const Vp=U.from({vertex:be,fragment:Up,name:"attribute-block-filter"});class Gp extends E{uniforms;constructor({blockSize:e=8,blackPoint:t=.1,centreX:n=.5,centreY:r=.5}={}){super({glProgram:Vp,resources:{attributeBlockUniforms:{uBlockSize:{value:e,type:"f32"},uBlackPoint:{value:t,type:"f32"},uProgress:{value:0,type:"f32"},uCentreX:{value:n,type:"f32"},uCentreY:{value:r,type:"f32"}},uLut:Wl.source}}),this.uniforms=this.resources.attributeBlockUniforms.uniforms}set progress(e){this.resources.attributeBlockUniforms.uniforms.uProgress=e}set centreX(e){this.resources.attributeBlockUniforms.uniforms.uCentreX=e}set centreY(e){this.resources.attributeBlockUniforms.uniforms.uCentreY=e}}class $p{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:n}=e,r=this.childRenderer.output.graphics,s={sound:this.childRenderer.output.sound,graphics:new y({children:[r],label:`TeleportEffectRenderer(${n.id})`})};this.output=s,this.#n()}output;#e;#t(e){const t=Z(e.state.position,B(e.aabb,.5)),{x:n,y:r}=k(t),s=this.output.graphics.getLocalBounds();this.output.graphics.filterArea=s.rectangle,this.#e.centreX=(n-s.x)/s.width,this.#e.centreY=(r-s.y)/s.height}#n(){const{renderContext:{general:{gameState:{currentCharacterName:e}},room:{items:t}}}=this,n=t[e];if(n!==void 0){const{teleporting:r}=n.state;if(this.#e===void 0!=(r===null))if(r!==null){const{renderContext:{general:{upscale:{gameEngineUpscale:s}}}}=this;this.#e=new Gp({blockSize:s*8}),this.#t(n),this.output.graphics.filters=[this.#e]}else this.#e=void 0,this.output.graphics.filters=et;else if(r!==null){const{timeRemaining:s,phase:i}=r,a=s/oo,l=i==="in"?a:1-a;this.#e.progress=l,this.#t(n)}}}tick(e){this.childRenderer.tick(e),this.#n()}destroy(){this.output.graphics.destroy({children:!0}),this.#e?.destroy(),this.childRenderer.destroy()}}const vt=o=>({avgMs:o.avgMs.toFixed(2),percentage:o.percentage.toFixed(1)+"%",fps:(1e3/o.avgMs).toLocaleString("en-GB",{maximumFractionDigits:0})}),Hp=o=>{const{frameCount:e,fps:t,theoreticalFps:n,phases:r,elapsedMs:s}=o;console.log(`Frame timing (${e} frames in ${(s/1e3).toFixed(3)}s, ${t.toFixed(1)} fps, theoretical max: ${n.toLocaleString("en-GB",{minimumFractionDigits:1,maximumFractionDigits:1})} fps):`),console.table({physics:vt(r.physics),hudUpdateSceneGraph:vt(r.hudUpdateSceneGraph),updateSceneGraph:vt(r.updateSceneGraph),"pixi.js app.render":vt(r.pixiRender),total:{...vt(r.total),percentage:"100%"}})},Np=()=>{typeof window<"u"&&(window.detailedFps=()=>{It.on(Hp)},console.log("%cPerformance timing available:","color: #4CAF50; font-weight: bold"),console.log("call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)"))},tn=(o,e)=>{if(o.lives=ue(o.lives,-1),o.lives===0&&e!==void 0){const t=st(e.lives);t>=2&&(o.lives=ue(o.lives,1),e.lives=ue(e.lives,t>2?-2:-1))}},Gi=(o,e)=>{const t=tt(e);if(t===void 0)return;const{carrying:n}=t;n!==null&&(F({room:o,item:n,atPosition:e.state.position}),t.carrying=null)},jp=(o,e)=>{const t=o.characterRooms.headOverHeels;if(tn(e.state.head,e.state.heels),tn(e.state.heels,e.state.head),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0)return;const r=st(e.state.head.lives)>0,s=st(e.state.heels.lives)>0;if(Gi(t,e),r&&!s||!r&&s){const c=r?"head":"heels";o.currentCharacterName=c,Ie(o,e);const u=Xn(e)[c],d=Ze({gameState:o,playableItems:[u],roomId:t.id});o.characterRooms={[c]:d},o.entryState={[c]:Wn(u)};return}if(o.entryState.headOverHeels!==void 0){Ie(o,e);const c=Ze({gameState:o,playableItems:[e],roomId:t.id});o.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Xn(e);if(Ie(o,c),Ie(o,u),il(c,u)){const d=Os({head:c,heels:u});Ie(o,d,"heels");const h=Ze({gameState:o,playableItems:[d],roomId:t.id});o.characterRooms={headOverHeels:h},o.entryState={headOverHeels:Wn(d)};return}else{const d=Ze({gameState:o,playableItems:[c,u],roomId:t.id});o.characterRooms={head:d,heels:d};return}}},Ze=({gameState:o,playableItems:e,roomId:t})=>{const n=al(w.getState()),r=ll({roomJson:n.rooms[t],roomPickupsCollected:o.pickupsCollected[t]??X,scrollsRead:w.getState().gameMenus.gameInPlay.scrollsRead});for(const s of e)F({room:r,item:s}),(s.type==="head"||s.type==="headOverHeels")&&cl(r,o);return r},Ie=(o,e,t=e.id)=>{const n=o.entryState[t];e.state={...e.state,...n,expires:null,standingOnItemId:null}},Xp=o=>{o.state.standingOnItemId=null,o.state.previousStandingOnItemId=null,o.state.standingOnUntilRoomTime=xe},Wp=(o,e)=>{const t=_s(o,ro(e.type));e.state.lastDiedAt=e.state.gameTime;const n=o.characterRooms[e.type];if(Gi(n,e),Xp(e),tn(e.state,t?.state),e.state.lives===0){delete o.characterRooms[e.id],t!==void 0&&(o.currentCharacterName=t.type);return}else{Ie(o,e);const r=t===void 0?void 0:o.characterRooms[t.type];if(n===r){if(o.entryState.headOverHeels!==void 0){const a=Os({head:e.id==="head"?e:n.items.head,heels:e.id==="heels"?e:n.items.heels});Ie(o,a);const l=Ze({gameState:o,playableItems:[a],roomId:n.id});o.characterRooms={headOverHeels:l},o.currentCharacterName="headOverHeels";return}F({room:n,item:e});return}else{const i=Ze({gameState:o,playableItems:[e],roomId:n.id});o.characterRooms[e.id]=i;return}}},Yp=(o,e)=>{w.dispatch(sl({characterLosingLifeItem:e})),e.type==="headOverHeels"?jp(o,e):Wp(o,e),lt(o)===void 0&&w.dispatch(Uo({offerReincarnation:!0}))},Jp=o=>{for(const e of q(o.items))try{for(const t of we(e.state.stoodOnBy,o)){if(!o.items[t.id]){no(t,o);continue}if(!gs(t,e)){no(t,o);const n=Cs(t,ul(o.items));n!==void 0&&hn({above:t,below:n})}}}catch(t){throw new Error(`could not update standing on for item "${e.id}"`,{cause:t})}},Zr=sn*Fe.animations["particle.head.fade"].length*(1/Fe.animations["particle.head.fade"].animationSpeed),qp=20,Zp=38,Qp=.5,Nt=S.x/2;let Kp=0;const $i=(o,e)=>Math.random()<o*(e/1e3),Hi=(o,e,t,n)=>({...mn,id:`particle.${o}.${Kp++}`,type:"particle",aabb:R,config:{forCharacter:e},state:{...fn(),expires:n+Zr+Math.random()*Zr,position:t}}),Ni=(o,e,t,n)=>{if(!$i(t,n))return;const r={...Z(vs(o),{x:Math.random()*Nt-Nt/2,y:Math.random()*Nt-Nt/2}),z:o.state.position.z};F({room:e,item:Hi(o.id,o.type,r,e.roomTime)})},ef=(o,e,t)=>{!(On(o.state)>0)||o.state.standingOnItemId===null||Ee(o.state.vels.walking)<re||Ni(o,e,qp,t)},tf=(o,e,t)=>{const{isBigJump:n}=o.state;n&&o.state.standingOnItemId===null&&(o.state.vels.gravity.z<=0||Ni(o,e,Zp,t))},of=(o,e)=>{const{head:t,heels:n}=io(o.items);t!==void 0&&ef(t,o,e),n!==void 0&&tf(n,o,e)},nf=(o,e,t)=>{if(!$i(Qp,t))return;const n=In(As),r=Z(e.state.position,{x:n==="x"?0:Math.random()*S.x,y:n==="y"?0:Math.random()*S.y,z:n==="z"?S.z:Math.random()*S.z});F({room:o,item:Hi(e.id,"crown",r,o.roomTime)})},rf=(o,e,t)=>{o.gameTime+=t,e.roomTime+=t;const n=lt(o);if(n!==void 0){if(n.type==="headOverHeels")n.state.head.gameTime+=t,n.state.heels.gameTime+=t;else if(n.state.gameTime+=t,o.characterRooms.head===o.characterRooms.heels){const s=_s(o,ro(n.type));s!==void 0&&(s.state.gameTime+=t)}}},sf=o=>{for(const e of q(o.items)){const t=e.state.position,n=dl(t);n!==t&&Ds(o,e,n)}},af=(o,e)=>o.state.expires!==null&&o.state.expires<e.roomTime,lf=(o,e)=>{const t={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1,wall:1,floor:1},n=t[o.type]??0,r=t[e.type]??0;return n-r},cf=(o,e)=>{for(const t of q(o.items))if(!(!Ve(t)||o.roomTime===t.state.actedOnAt.roomTime)&&!hl(t.state.position)){const n=pl(t.state.position);Ds(o,t,n),e.add(t)}},ji=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),uf=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),jt=S.x*3,df=(o,e)=>{const{state:{position:t}}=o,{state:{position:n}}=e;return t.x>n.x-jt&&t.x<n.x+jt&&t.y>n.y-jt&&t.y<n.y+jt},Qr=(o,e,t,n,r)=>{if(r&&o.state.activated)return W;const s=fo(o.state.position,e);return s===void 0?W:df(o,s)?ji:uf},hf=(o,e,t,n)=>o.state.activated?W:we(o.state.stoodOnBy,e).some(oe)?ji:W,pf=(o,e,t,n)=>{switch(o.config.activated){case"after-player-near":return Qr(o,e,t,n,!0);case"while-player-near":return Qr(o,e,t,n,!1);case"on-stand":return hf(o,e);case"off":case"on":return W;default:throw o.config,new Error(`unrecognised item.config.activation ${o.config.activated} in ${o.id}:
        ${JSON.stringify(o,null,2)}`)}},ff={movementType:"steady",stateDelta:{pressed:!0}},mf={movementType:"steady",stateDelta:{pressed:!1}},gf=(o,e)=>{const{state:{stoodOnUntilRoomTime:t,stoodOnBy:n,pressed:r}}=o,s=t+ml,{roomTime:i}=e,a=!Ms(fl(n));return!a&&i>s&&r?(Zo(o.config.modifies,"right",o,e),mf):!r&&a?(Zo(o.config.modifies,"left",o,e),ff):W},bf=(o,e,t,n)=>{const{id:r,state:s,config:i}=o,{roomTime:a}=e,{lastEmittedAtRoomTime:l,quantityEmitted:c,position:u}=s,d=s.emits??i.emits,h=s.period??i.period,p=s.maximum??i.maximum;if(c!==p&&l+h<a){const f=gl(bl(`${r}-${c}-${a}`,{...d,position:R},e.roomJson));if(f===void 0)throw new Error("emitter failed to create a new item");F({room:e,item:f,atPosition:At(u,B(f.aabb,.5))}),o.state.lastEmittedAtRoomTime=e.roomTime+h,o.state.quantityEmitted++}},yf=Object.freeze({textureId:"shadow.smallRound",spritesheetVariant:"original"}),vf=S.x*.75,xf=500,wf=(o,e,t,n)=>{const{inputStateTracker:r}=t,s=o.type==="head"?o.state:o.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=o,u=Mt(c);if(r.currentActionPress("fire")!=="released"&&a&&st(i)>0){const d={type:"firedDoughnut",...mn,config:X,id:`firedDoughnut/${o.id}/${e.roomTime}`,shadowCastTexture:yf,state:{...fn(),position:Z(l,B(u,vf),o.type==="headOverHeels"?{z:S.z}:R),vels:{fired:B(u,ne.firedDoughnut)},disappearing:{on:"touch"}}};F({room:e,item:d}),s.doughnuts=ue(s.doughnuts,-1),r.inputWasHandled("fire",xf)}},Kr={movementType:"vel",vels:{gravity:R}},Sf=(o,e,t,n)=>{if(!it(o))return Kr;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=o,l=yl[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=Ot(i,e);return Tn(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-Eo*n,-l)}}}:Kr}else return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-Eo*n,-l)}}}};function*Cf(o,{roomTime:e},t,n){const r=e,s=e-n,i=[];for(let a=0;a<o.state.latentMovement.length;a++){const l=o.state.latentMovement[a];if(l.startAtRoomTime>r)continue;if(l.endAtRoomTime<=s){i.push(a);continue}const c=Math.max(l.startAtRoomTime,s),d=Math.min(l.endAtRoomTime,r)-c;d>0&&(yield{movementType:"position",posDelta:B(l.velocity,d)}),l.endAtRoomTime<=r&&i.push(a)}for(let a=i.length-1;a>=0;a--)o.state.latentMovement.splice(i[a],1)}const es=S.z,ts=.001,Tf={movementType:"vel",vels:{lift:R}},kf=({z:o,lowestZ:e,highestZ:t,direction:n,currentVelocity:r,deltaMS:s})=>{const i=Ce**2/(2*pt);if(n==="up"){const a=t-o;if(a<=i){const l=Math.max(0,a);return Math.max(ts,Math.sqrt(2*pt*l))}return r<Ce?Math.min(Ce,r+pt*s):Ce}else{const a=o-e;if(a<=i){const l=Math.max(0,a);return Math.min(-ts,-Math.sqrt(2*pt*l))}return r>-Ce?Math.max(-Ce,r-pt*s):-Ce}},If=({state:{direction:o,bottom:e,top:t,position:{z:n},vels:r}},s,i,a)=>{const l=e*es,c=t*es;if(l===c&&ce(n,l))return Tf;const u=r?.lift?.z??0,d=kf({z:n,lowestZ:l,highestZ:c,direction:o,currentVelocity:u,deltaMS:a});if(Number.isNaN(d))throw new Error("velocity is NaN");const h=n<=l?"up":n>=c?"down":o;return{movementType:"vel",vels:{lift:{x:0,y:0,z:d}},stateDelta:{direction:h}}},os={movementType:"vel",vels:{movingFloor:R}},Rf=(o,e,t,n)=>{if(oe(o)&&o.state.teleporting!==null)return os;const{state:{standingOnItemId:r}}=o,s=Ot(r,e);if(s===null||!vl(s))return os;const{state:{direction:i}}=s,l=xl(o)&&o.state.action==="moving"&&at(o.state.facing)===wl(i)?ne.heels:Sl;return{movementType:"vel",vels:{movingFloor:B(Tt[i],l)}}},Pf=(o,e,t,n)=>{const r=o.x*o.x+o.y*o.y,s=e.x*e.x+e.y*e.y;if(r<re||s<re)return o;const i=Math.atan2(o.x*e.y-o.y*e.x,o.x*e.x+o.y*e.y),a=Math.abs(i);if(a<re)return e;const l=a>Math.PI-re?a:i,c=t*n,u=Math.max(-c,Math.min(c,l)),d=Math.cos(u),h=Math.sin(u);return{x:o.x*d-o.y*h,y:o.x*h+o.y*d,z:o.z}},Mf=.009,Bf=(o,e,t,n)=>{const{state:{visualFacingVector:r,facing:s}}=o;return{movementType:"steady",stateDelta:{visualFacingVector:Pf(r??s,s,Mf,n)}}},Af=(o,e,t)=>{const n=tu(o);if(n!==void 0){const r=n*Tl,s=Rt(e)/Math.max(t,re);s>r&&Cl(e,r/s)}};function*Of(o,e,t,n){if(Ve(o)&&(yield Sf(o,e,t,n),yield Rf(o,e),yield*Cf(o,e,t,n)),oe(o)){if(yield yi(o,e,t,n),yield Bf(o,e,t,n),yield uu(o,e,t,n),o.id===t.currentCharacterName){const r=Rl(o);r&&_u(o,e,t,n),yield bi(o,e,t),r&&Du(o,e,t),Pl(o)&&wf(o,e,t)}}else Tn(o)?yield If(o,e,t,n):Ml(o)?(yield pf(o,e,t,n),yield au(o,e,t,n)):Bl(o)?bf(o,e):Al(o)&&(yield gf(o,e))}const _f=(o,e,t,n)=>{if(!Ve(o)||o.state.standingOnItemId===null)return;const r=Ot(o.state.standingOnItemId,e);oe(o)&&r.type==="pickup"&&Ci({gameState:t,movingItem:o,touchedItem:r,room:e});const{state:{disappearing:s}}=r;s!==null&&(s.byType===void 0||s.byType.includes(o.type))&&bs({touchedItem:r,gameState:t,room:e})},Xt={x:0,y:0,z:0},Df={x:0,y:0,z:0},Ff=(o,e,t,n)=>{if(oe(o)&&o.state.standingOnItemId!==null){const a=Ot(o.state.standingOnItemId,e);(dn(a)||a.type==="spikes")&&Si({room:e,movingItem:o})}const r=Of(o,e,t,n).toArray();if(_f(o,e,t),gi(Xt,o,r),Ve(o)||Tn(o)||kl(o))for(const a of ie(o.state.vels))ln(Xt,Bs(Df,{...R,...a},n));Il(o)&&nf(e,o,n),r.find(a=>a.movementType==="position")!==void 0||Af(o,Xt,n),ws({subjectItem:o,posDelta:Xt,gameState:t,room:e,deltaMS:n,onTouch:Ti})},zf=(o,e)=>{const t=rt(o);if(t===void 0)return nt;rf(o,t,e);const n=Object.fromEntries(Ol(t.items).map(([i,a])=>[i,a.state.position]));for(const i of ie(t.items))af(i,t)&&(gn({room:t,item:i}),oe(i)&&Yp(o,i));const r=Object.values(t.items).sort(lf);for(const i of r){const a=lt(o);if(a===void 0||a.state.action==="death")break;if(t.items[i.id]!==void 0)try{Ff(i,t,o,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${i.id}"`,{cause:l})}}of(t,e),Jp(t),sf(t);const s=new Set(ye(ie(t.items)).filter(i=>n[i.id]===void 0||!Ue(i.state.position,n[i.id])));return wu(s,t,n,e),cf(t,s),s},Lf=X,Ef=(o,e)=>(t,n)=>{const r=new Set;if(_l(t)){const u=rt(t)?.items;if(u!==void 0){const d=ye(ie(io(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const a=Re.shared.speed===0?1:Math.max(1,Math.ceil(n/e)),l=n/a;for(let u=0;u<a;u++){const d=o(t,l);for(const h of d)r.add(h)}const c=rt(t)?.items??Lf;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},Uf=(o,e,t,n)=>{if(e){const r=n.shade==="dimmed";Bc(o,e,t,n),zc(o,t,n),Vc(o,r),Nc(o,r)}else hi()},Se=`
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Vf=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uRadius;      // Blur radius in pixels
uniform float uCutoff;      // Brightness cutoff (0.0 to 1.0)
uniform float uIntensity;   // Bloom intensity (0.0 to 1.0)
uniform vec2 uResolution;   // Screen resolution
uniform float uEdgeBlur;    // Edge blur multiplier (1.0 = uniform, 2.0 = edges 2x blurrier)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

// Configuration for the poisson disk sampling pattern
const float INNER_RING_RADIUS = 0.7;
const float OUTER_RING_RADIUS = 1.0;
const float CENTER_WEIGHT = 4.0;
const float INNER_WEIGHT = 3.5;
const float OUTER_WEIGHT = 0.1;

// Rotation angle for outer ring: 22.5° = π/8 radians
const float OUTER_ROTATION = 0.39269908169872414;
const float COS_OUTER_ROT = cos(OUTER_ROTATION);
const float SIN_OUTER_ROT = sin(OUTER_ROTATION);

// 13-tap pattern: center + 4-point inner ring + 8-point outer ring
// Inner ring on cardinal axes, outer ring rotated 22.5° between cardinal/diagonal
const int NUM_SAMPLES = 12;
const vec2 poissonOffsets[NUM_SAMPLES] = vec2[](

    // Inner ring (on cardinal axes)
    vec2(0.0, -INNER_RING_RADIUS),
    vec2(INNER_RING_RADIUS, 0.0),
    vec2(0.0, INNER_RING_RADIUS),
    vec2(-INNER_RING_RADIUS, 0.0),

    // Outer ring rotated 22.5° from top, going clockwise
    vec2(SIN_OUTER_ROT * OUTER_RING_RADIUS, -COS_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(COS_OUTER_ROT * OUTER_RING_RADIUS, -SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(COS_OUTER_ROT * OUTER_RING_RADIUS, SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(SIN_OUTER_ROT * OUTER_RING_RADIUS, COS_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-SIN_OUTER_ROT * OUTER_RING_RADIUS, COS_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-COS_OUTER_ROT * OUTER_RING_RADIUS, SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-COS_OUTER_ROT * OUTER_RING_RADIUS, -SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-SIN_OUTER_ROT * OUTER_RING_RADIUS, -COS_OUTER_ROT * OUTER_RING_RADIUS)
);

// Weights for each sample - falloff from center to outer ring
const float poissonWeights[NUM_SAMPLES] = float[](
    // Inner ring
    INNER_WEIGHT, INNER_WEIGHT, INNER_WEIGHT, INNER_WEIGHT,

    // Outer ring
    OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT,
    OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT
);

void main() {
    vec3 originalColor = texture(uTexture, vTextureCoord).rgb;
    
    // Calculate pixel size
    vec2 pixelSize = 1.0 / uResolution;
    
    // Calculate distance from center using the same logic as vignette/curvature
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    vec2 visibleCenter = (uInputClamp.xy + uInputClamp.zw) * 0.5;
    vec2 centered = (vTextureCoord - visibleCenter) / visibleSize;
            
    // Accumulate bloom from neighboring pixels
    vec3 bloom = vec3(0.0);
    float totalWeight = 0.0;

    // Distance from center (0 at center, ~0.707 at corners for square aspect)
    float distFromCenter = length(centered);

    // transform edgeBlue from 0..1 to 1..2, raising initially slowly but
    // ramping up more sharply at the corners due to the square factor
    float blurCoefForEdge = (distFromCenter * distFromCenter + 1.0) * (uEdgeBlur + 1.0);
    
    // Sample using two-ring pattern for smoother bloom
    for (int i = 0; i < NUM_SAMPLES; i++) {
        vec2 offset = poissonOffsets[i] * pixelSize * uRadius * blurCoefForEdge;
        vec2 sampleCoord = vTextureCoord + offset;
        
        // Sample the neighbor
        vec3 sampleColor = texture(uTexture, sampleCoord).rgb;
        
        // Calculate brightness of the sample
        float sampleBrightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
        
        // Apply smooth cutoff to determine contribution
        // Only bright pixels contribute to bloom
        float contribution = smoothstep(uCutoff * 0.5, uCutoff + 0.1, sampleBrightness);
        
        // Get weight for this sample
        float weight = poissonWeights[i] * contribution;
        
        bloom += sampleColor * weight;
        totalWeight += weight;
    }
    
    // Normalize the bloom (avoid divide by zero)
    bloom /= max(totalWeight, 0.001);        
    
    // Add bloom to original color
    vec3 result = originalColor + (bloom * uIntensity * blurCoefForEdge);
    
    finalColor = vec4(result, 1.0);
}`,Gf={radius:1.2,cutoff:.88,intensity:.14,edgeBlur:.5};class $f extends E{uniforms;constructor(e={}){const t={...Gf,...e},n=U.from({vertex:Se,fragment:Vf,name:"bloom-filter"});super({glProgram:n,resources:{bloomUniforms:{uRadius:{value:t.radius,type:"f32"},uCutoff:{value:t.cutoff,type:"f32"},uIntensity:{value:t.intensity,type:"f32"},uEdgeBlur:{value:t.edgeBlur,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.bloomUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Hf=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uGamma;              // Gamma correction
uniform float uSaturation;         // Color saturation
uniform float uBrightness;         // Brightness (0.0 to 2.0)
uniform float uBrightnessBottom;   // Extra brightness at bottom of screen
uniform vec4 uInputClamp;          // Input clamp for calculating vertical position

out vec4 finalColor;

void main() {
    vec3 colour = texture(uTexture, vTextureCoord).rgb;

    // Calculate vertical position (0 at top, 1 at bottom) within visible area
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    float normalizedY = (vTextureCoord.y - uInputClamp.y) / visibleSize.y;

    // Apply brightness adjustment with gradient from top to bottom
    float brightnessAtPixel = uBrightness + (uBrightnessBottom * normalizedY);
    colour *= brightnessAtPixel;
    
    // Apply saturation adjustment
    float luminance = dot(colour, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(luminance);
    colour = mix(grayscale, colour, uSaturation);
    
    // Apply gamma correction
    colour = pow(colour, vec3(1.0 / uGamma));
    
    finalColor = vec4(colour, 1.0);
}`,Nf={gamma:1,saturation:1,brightness:1,brightnessBottom:0};class ns extends E{uniforms;constructor(e={}){const t={...Nf,...e},n=U.from({vertex:Se,fragment:Hf,name:"color-adjustment-filter"});super({glProgram:n,resources:{colorAdjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uBrightnessBottom:{value:t.brightnessBottom,type:"f32"}}}}),this.uniforms=this.resources.colorAdjustmentUniforms.uniforms}}const Xi=(o,e)=>o.replace(/\{\{(\w+)\}\}/g,(t,n)=>{if(n in e){const r=e[n];return typeof r=="boolean"?r?"1":"0":String(r)}return console.warn(`Shader placeholder {{${n}}} not found in values map`),t}),jf=`#version 300 es
precision mediump float;

// Injected define for multisampling
#define MULTISAMPLE {{MULTISAMPLE}}

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uCurvatureX;  // Screen curvature - horizontal
uniform float uCurvatureY;  // Screen curvature - vertical
uniform vec2 uResolution;   // Screen resolution for AA sampling

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

vec2 distort(vec2 coord) {
    vec2 curvatureDistortion = vec2(uCurvatureX, uCurvatureY);
    vec2 barrelScale = 1.0 - (0.23 * curvatureDistortion);
    
    // Map texture coords to normalized visible space (0-1)
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    vec2 visibleCenter = (uInputClamp.xy + uInputClamp.zw) * 0.5;
    
    // Normalize coord to visible area's 0-1 range
    vec2 normalizedCoord = (coord - uInputClamp.xy) / visibleSize;
    
    // Center normalized coordinates around 0,0
    normalizedCoord -= vec2(0.5, 0.5);
    
    // Apply barrel distortion
    float rsq = normalizedCoord.x * normalizedCoord.x + normalizedCoord.y * normalizedCoord.y;
    normalizedCoord += normalizedCoord * (curvatureDistortion * rsq);
    normalizedCoord *= barrelScale;
    
    // Re-center normalized coordinates
    normalizedCoord += vec2(0.5, 0.5);
    
    // Map back to texture coordinate space
    return normalizedCoord * visibleSize + uInputClamp.xy;
}

void main() {
    #if MULTISAMPLE
        // Calculate pixel size in texture coordinates for AA sampling
        vec2 pixelSize = 1.0 / uResolution;
        
        // Quincunx (X) pattern: center + 4 diagonal corners
        // Sample offsets at half-pixel distance diagonally
        vec2 offset = pixelSize * 0.5;
        
        // Take 5 samples with distortion applied to each
        vec2 coord0 = distort(vTextureCoord);                                    // Center
        vec2 coord1 = distort(vTextureCoord + vec2(-offset.x, -offset.y));      // Top-left
        vec2 coord2 = distort(vTextureCoord + vec2( offset.x, -offset.y));      // Top-right
        vec2 coord3 = distort(vTextureCoord + vec2(-offset.x,  offset.y));      // Bottom-left
        vec2 coord4 = distort(vTextureCoord + vec2( offset.x,  offset.y));      // Bottom-right
        
        // Branchless bounds check for each sample (check against visible bounds)
        float inBounds0 = step(uInputClamp.x, coord0.x) * step(coord0.x, uInputClamp.z) * step(uInputClamp.y, coord0.y) * step(coord0.y, uInputClamp.w);
        float inBounds1 = step(uInputClamp.x, coord1.x) * step(coord1.x, uInputClamp.z) * step(uInputClamp.y, coord1.y) * step(coord1.y, uInputClamp.w);
        float inBounds2 = step(uInputClamp.x, coord2.x) * step(coord2.x, uInputClamp.z) * step(uInputClamp.y, coord2.y) * step(coord2.y, uInputClamp.w);
        float inBounds3 = step(uInputClamp.x, coord3.x) * step(coord3.x, uInputClamp.z) * step(uInputClamp.y, coord3.y) * step(coord3.y, uInputClamp.w);
        float inBounds4 = step(uInputClamp.x, coord4.x) * step(coord4.x, uInputClamp.z) * step(uInputClamp.y, coord4.y) * step(coord4.y, uInputClamp.w);
        
        // Sample textures and apply bounds check
        vec3 sample0 = texture(uTexture, coord0).rgb * inBounds0;
        vec3 sample1 = texture(uTexture, coord1).rgb * inBounds1;
        vec3 sample2 = texture(uTexture, coord2).rgb * inBounds2;
        vec3 sample3 = texture(uTexture, coord3).rgb * inBounds3;
        vec3 sample4 = texture(uTexture, coord4).rgb * inBounds4;
        
        // Weighted average: center gets 50%, corners get 12.5% each
        vec3 colour = sample0 * 0.5 + (sample1 + sample2 + sample3 + sample4) * 0.125;
        
        finalColor = vec4(colour, 1.0);
    #else
        // Single sample - faster but may have aliasing at edges
        vec2 coord = distort(vTextureCoord);
        
        // Check if in bounds
        float inBounds = step(uInputClamp.x, coord.x) * step(coord.x, uInputClamp.z) * 
                         step(uInputClamp.y, coord.y) * step(coord.y, uInputClamp.w);
        
        vec3 colour = texture(uTexture, coord).rgb * inBounds;
        finalColor = vec4(colour, 1.0);
    #endif
}`,Xf={curvatureX:.15,curvatureY:.15,multisampling:!0};class Wf extends E{uniforms;constructor(e={}){const t={...Xf,...e},n=Xi(jf,{MULTISAMPLE:t.multisampling}),r=U.from({vertex:Se,fragment:n,name:"curvature-filter"});super({glProgram:r,resources:{curvatureUniforms:{uCurvatureX:{value:t.curvatureX,type:"f32"},uCurvatureY:{value:t.curvatureY,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.curvatureUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Yf=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uIntensity;
uniform float uScale;
uniform float uFPS;
uniform float uTime;

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

///  3 out, 2 in...
vec3 hash32(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy+p3.yzz)*p3.zyx);
}

void main() {
    float period = (1000.0/uFPS);
    float uFrameNumber = floor(uTime / period) * period;

    vec2 uv = vTextureCoord * (uInputClamp.zw - uInputClamp.xy); // Scale to texture size
    // adjust the scale uniform given to be half the size for every unit increase
    float scale10 = pow(0.5, (uScale + 7.0));
    // change the square pixels to be wider than they are tall (scanlines)
    vec2 scale10BiasedHoriz = vec2(scale10 * 16.0, scale10);
    // round the uv coords to the nearest "pixel" center. Adding fract(uTime) randomises
    // where the pixels start so it isn't on a strict grid:
    vec2 uvRounded = floor(uv / scale10BiasedHoriz + fract(uFrameNumber)) * scale10BiasedHoriz;

    vec3 rgbNoise = hash32( uvRounded * (uFrameNumber + 1000.0));

    // Keep original value if >= 0.7, otherwise set to 0 (not all pixels have noise in all channels)
    rgbNoise = rgbNoise * step(vec3(0.7), rgbNoise);

    // shift from [0,1] to [-0.5,0.5]
    // actually, don't, keep this additive only (positive noise only)
    //rgbNoise -= 0.5;
    // shift from [-0.5,0.5] to [-1,1]
    //rgbNoise *= 2.0;

    vec4 color = texture(uTexture, vTextureCoord);

    // Add noise and clamp to valid range [0.0, 1.0]
    vec3 noisyColor = clamp(color.rgb + rgbNoise * uIntensity, 0.0, 1.0);
    finalColor = vec4(noisyColor, color.a);
}`,Jf={intensity:.04,scale:6,fps:30};class qf extends E{uniforms;startTime;constructor(e={}){const t={...Jf,...e},n=U.from({vertex:Se,fragment:Yf,name:"noise-filter"});super({glProgram:n,resources:{noiseUniforms:{uIntensity:{value:t.intensity,type:"f32"},uScale:{value:t.scale,type:"f32"},uFPS:{value:t.fps,type:"f32"},uTime:{value:0,type:"f32"}}}}),this.uniforms=this.resources.noiseUniforms.uniforms,this.startTime=performance.now()}apply(e,t,n,r){this.uniforms.uTime=performance.now()-this.startTime,super.apply(e,t,n,r)}}const Zf=`#version 300 es
precision mediump float;

// Injected number of samples for antialiasing
#define NUM_SAMPLES {{NUM_SAMPLES}}

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uPixelWidth;      // Width of virtual pixels in output pixels
uniform float uMaskBrightness;  // Shadow mask brightness (0.0 to 1.0)
uniform vec2 uResolution;        // Screen resolution
uniform float uTransitionWidth; // Width of transition zone between phosphors (0.0 to 1.0, 0 = hard edge, 1 = maximum smooth)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

void main() {
    vec3 colour = texture(uTexture, vTextureCoord).rgb;
    vec3 originalColour = colour;

    // Normalize transition width to actual proportion of phosphor width
    // Input is 0-1 for ease of use, convert to 0-0.166 (max sensible value)
    float transitionWidth = uTransitionWidth * 0.166666;

    // Convert to virtual pixel space for slot mask, accounting for visible area
    // Map texture coord to position within visible area (0-1), then to pixel position
    float normalizedX = (vTextureCoord.x - uInputClamp.x) / (uInputClamp.z - uInputClamp.x);

    // Mask will accumulate the phosphor value of our current pixel - eg, how much it is a r, g, b
    // sub-pixel:
    vec3 mask = vec3(0.0);
    float sampleWidth = 1.0 / uResolution.x; // Width of one output pixel in normalized coords

    for (int i = 0; i < NUM_SAMPLES; i++) {
         // Distribute samples across pixel - offset is the proportion we are into the pixel:
        float offset = (float(i) + 0.5) / float(NUM_SAMPLES) - 0.5;
        float sampleX = normalizedX + offset * sampleWidth * (uInputClamp.z - uInputClamp.x);
        float sampleVirtualX = sampleX * uResolution.x / uPixelWidth;
        float samplePos = fract(sampleVirtualX);

        // work out if we are in an R,G,or B sub-pixel
        // smooth transitions for each RGB sample:
        float isRed = 1.0 - smoothstep(0.333333 - transitionWidth, 0.333333 + transitionWidth, samplePos);
        float isGreen = smoothstep(0.333333 - transitionWidth, 0.333333 + transitionWidth, samplePos) *
                       (1.0 - smoothstep(0.666667 - transitionWidth, 0.666667 + transitionWidth, samplePos));
        float isBlue = smoothstep(0.666667 - transitionWidth, 0.666667 + transitionWidth, samplePos);

        // Accumulate mask values
        mask.r += mix(uMaskBrightness, 1.0, isRed);
        mask.g += mix(uMaskBrightness, 1.0, isGreen);
        mask.b += mix(uMaskBrightness, 1.0, isBlue);
    }

    mask /= float(NUM_SAMPLES); // Average the samples
    
    // the value of this pixel. However, if we left it here, we'd be trending darker overall - 
    // need to compensate for bright pixels to not bring down the overall appearance
    vec3 maskedColour = originalColour * mask;
        
    // boost for bright colours:
    float brightness = (originalColour.r + originalColour.g + originalColour.b) / 3.0;
    float brightBoost = smoothstep(0.5, 1.0, brightness);
    
    // Apply compensation
    float avgMaskEffect = (1.0 + 2.0 * uMaskBrightness) / 3.0;
    float compensation = 1.0 / max(avgMaskEffect, 0.001);
    vec3 compensatedColour = maskedColour * compensation;
    float maxChannel = max(max(compensatedColour.r, compensatedColour.g), compensatedColour.b);
    float clampScale = min(1.0, 1.0 / max(maxChannel, 0.001));
    vec3 maskedPath = compensatedColour * clampScale;
    
    colour = mix(maskedPath, originalColour, brightBoost);
    
    finalColor = vec4(colour, 1.0);
}`,Qf={pixelWidth:4,maskBrightness:.7,numSamples:4,transitionWidth:.3};class Kf extends E{uniforms;constructor(e={}){const t={...Qf,...e},n=Xi(Zf,{NUM_SAMPLES:t.numSamples}),r=U.from({vertex:Se,fragment:n,name:"phosphor-mask-filter"});super({glProgram:r,resources:{phosphorMaskUniforms:{uPixelWidth:{value:t.pixelWidth,type:"f32"},uMaskBrightness:{value:t.maskBrightness,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uTransitionWidth:{value:t.transitionWidth,type:"f32"}}}}),this.uniforms=this.resources.phosphorMaskUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const em=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uPixelHeight;  // Height of virtual pixels in output pixels
uniform vec2 uResolution;    // Screen resolution
uniform float uGapBrightness;  // Brightness of dark bands (0.0 to 1.0)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

// Sample neighborhood in cross pattern to get average luminosity
float getNeighborhoodLuminosity(vec2 coord) {
    vec2 pixelSize = 1.0 / uResolution;
    
    // Sample in cross pattern: center + 4 cardinal directions
    vec3 centerSample = texture(uTexture, coord).rgb;
    vec3 leftSample = texture(uTexture, coord + vec2(-pixelSize.x, 0.0)).rgb;
    vec3 rightSample = texture(uTexture, coord + vec2(pixelSize.x, 0.0)).rgb;
    vec3 topSample = texture(uTexture, coord + vec2(0.0, -pixelSize.y)).rgb;
    vec3 bottomSample = texture(uTexture, coord + vec2(0.0, pixelSize.y)).rgb;
    
    // Calculate luminosity for each sample (simple average)
    float centerLum = (centerSample.r + centerSample.g + centerSample.b) / 3.0;
    float leftLum = (leftSample.r + leftSample.g + leftSample.b) / 3.0;
    float rightLum = (rightSample.r + rightSample.g + rightSample.b) / 3.0;
    float topLum = (topSample.r + topSample.g + topSample.b) / 3.0;
    float bottomLum = (bottomSample.r + bottomSample.g + bottomSample.b) / 3.0;
    
    // Weight center more heavily (0.5) and edges equally (0.125 each)
    return centerLum * 0.5 + (leftLum + rightLum + topLum + bottomLum) * 0.125;
}

void main() {
    // Get the color at this position (for final output mixing)
    vec3 color = texture(uTexture, vTextureCoord).rgb;
    
    // Get neighborhood luminosity for determining scanline thickness
    float luminosity = getNeighborhoodLuminosity(vTextureCoord);
    
    // Convert to virtual pixel space, accounting for visible area
    // Map texture coord to position within visible area (0-1), then to pixel position
    float normalizedY = (vTextureCoord.y - uInputClamp.y) / (uInputClamp.w - uInputClamp.y);
    float virtualPixelY = normalizedY * uResolution.y / uPixelHeight;
    
    // Calculate position within scanline period (0 to 2 for double height scanlines)
    float yInScanline = mod(virtualPixelY, 2.0);
    
    // Calculate distance to nearest dark band center
    // Dark band centers are at 0.5 and 1.5 in our 2-unit period
    // Use branchless selection: if yInScanline < 1.0, use 0.5, else use 1.5
    float darkCenter = mix(1.5, 0.5, step(yInScanline, 1.0));
    
    float distToDarkCenter = abs(yInScanline - darkCenter);
    
    // Calculate minimum line width in virtual pixel space
    // Each scanline period is 2 virtual pixels, and we need at least 1 real pixel
    float realPixInVirtual = 1.0 / uPixelHeight;
    
    // Calculate threshold based on luminosity - how close we need to be to the centre of
    // a dark band to be considered "in" the dark band.
    // Bright pixels = low threshold = thin dark bands (wide bright bands)
    // Dark pixels = high threshold = thick dark bands (narrow bright bands)
    // Range from 0.5 (black) to 0.0 (white) - allows dark bands to completely disappear
    float distanceThresh = 0.5 * (1.0 - luminosity); // Range from 0.5 to 0.0
    
    // Clamp threshold to ensure both dark and bright bands are at least 1 real pixel wide
    // Maximum threshold is 1.0 - realPixInVirtual (ensures bright band is at least 1 real pixel)
    // Minimum threshold is realPixInVirtual (ensures dark band is at least 1 real pixel)
    //distanceThresh = clamp(distanceThresh, realPixInVirtual, 1.0 - realPixInVirtual);
    
    // Calculate the ratio of dark to bright stripe widths
    // Dark stripe width = 2 * threshold (extends ±threshold from center)
    // Bright stripe width = 2 * (1.0 - threshold)
    float darkToBrightRatio = distanceThresh / (1.0 - distanceThresh);
    
    // Calculate boost factor to compensate for the darkening
    // Dark bands now contribute gap_brightness instead of 0
    // Average = (bright * boost + dark * gap_brightness) / (bright + dark)
    // To maintain original brightness of 1.0:
    // boost = 1 + darkToBrightRatio * (1.0 - uGapBrightness)
    float boostFactor = 1.0 + darkToBrightRatio * (1.0 - uGapBrightness);
    
    // Apply soft cutoff using smoothstep for anti-aliasing
    // Transition width is 1/4 of a virtual pixel for smooth edges
    float transitionWidth = 0.25;
    float innerBoundary = distanceThresh - transitionWidth * 0.5;
    float outerBoundary = distanceThresh + transitionWidth * 0.5;
    
    // Smoothstep gives us a gradual transition from dark (0) to bright (1)
    float inBrightBand = smoothstep(innerBoundary, outerBoundary, distToDarkCenter);
    
    // Output the boosted color for bright band, reduced brightness for dark band
    vec3 brightBandColor = color * boostFactor;
    vec3 darkBandColor = color * uGapBrightness;
    vec3 outputColor = mix(darkBandColor, brightBandColor, inBrightBand);
    
    finalColor = vec4(outputColor, 1.0);
}`,tm={pixelHeight:4,gapBrightness:.7};class om extends E{uniforms;constructor(e={}){const t={...tm,...e},n=U.from({vertex:Se,fragment:em,name:"scanlines-filter"});super({glProgram:n,resources:{scanlinesUniforms:{uPixelHeight:{value:t.pixelHeight,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uGapBrightness:{value:t.gapBrightness,type:"f32"}}}}),this.uniforms=this.resources.scanlinesUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const nm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uIntensity; // Vignette effect (-1.0 to 1.0, negative = brighten center)
uniform float uRadius;    // Vignette radius (0.0 to 2.0)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

void main() {
    vec3 colour = texture(uTexture, vTextureCoord).rgb;
    
    // Calculate the center of the visible area using Pixi's input clamp
    vec2 visibleCenter = (uInputClamp.xy + uInputClamp.zw) * 0.5;
    
    // Calculate position relative to the actual visible center
    vec2 centered = vTextureCoord - visibleCenter;
    
    // Scale the distance calculation to account for the visible area size
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    centered = centered / visibleSize;
    
    // Calculate distance from center (0 to ~1.414 at corners)
    float dist = length(centered) * 2.0;
    
    float falloff = dist / uRadius;

    float vignetteFactor = clamp(1.0 - falloff, 0.0, 1.0);
    
    // multiply the rgb colour by 0..1 to darken it
    colour *= mix(1.0 - uIntensity, 1.0, vignetteFactor);
    
    
    finalColor = vec4(colour, 1.0);
}`,rm={intensity:.4,radius:.8};class sm extends E{uniforms;constructor(e={}){const t={...rm,...e},n=U.from({vertex:Se,fragment:nm,name:"vignette-filter"});super({glProgram:n,resources:{vignetteUniforms:{uIntensity:{value:t.intensity,type:"f32"},uRadius:{value:t.radius,type:"f32"}}}}),this.uniforms=this.resources.vignetteUniforms.uniforms}}const im=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float uBlackPoint;
uniform sampler2D uTexture;

out vec4 finalColor;

void main() {
    vec4 colour = texture(uTexture, vTextureCoord);
    
    finalColor = (colour * (1.0-uBlackPoint)) + uBlackPoint;
}
`,am={blackPoint:.04};class lm extends E{uniforms;constructor(e={}){const t={...am,...e},n=U.from({vertex:Se,fragment:im,name:"raise-black-point-filter"});super({glProgram:n,resources:{raiseBlackPointUniforms:{uBlackPoint:{value:t.blackPoint,type:"f32"}}}}),this.uniforms=this.resources.raiseBlackPointUniforms.uniforms}}const rs=.8,cm=1.2,um=({crtFilter:o},e)=>o??ct.displaySettings.crtFilter?[new ns({brightness:rs}),new qf({intensity:.03,fps:29.97,scale:5}),new om({pixelHeight:e.gameEngineUpscale,gapBrightness:.66}),new Kf({pixelWidth:e.gameEngineUpscale*1.1,maskBrightness:.6,numSamples:2,transitionWidth:.2}),new $f({radius:e.gameEngineUpscale/6,intensity:.1,cutoff:.8,edgeBlur:1}),new sm({intensity:.4,radius:.7}),new Wf({curvatureX:.13,curvatureY:.12,multisampling:!0}),new lm({blackPoint:.03}),new ns({gamma:1.1,saturation:1.35,brightness:1/rs*cm,brightnessBottom:-.15})]:Di;Np();class dm{constructor(e,t){this.app=e,this.gameState=t;try{const n=w.getState(),r=rn(n);if(this.#o.connect(C.destination),e.stage.addChild(this.#n),e.stage.scale=r,rt(t)===void 0)throw new Error("main loop with no starting room");this.#i()}catch(n){this.#s(n);return}}#e;#t;#n=new y({label:"MainLoop/world"});#o=C.createGain();#r=Ef(zf,Gl);#s(e){console.error(e),w.dispatch(Dl(Fl(e)))}#i(){const{gameMenus:{userSettings:{displaySettings:e}},upscale:{upscale:t}}=w.getState();this.app.stage.filters=um(e,t)}tickAndCatch=e=>{try{this.tick(e)}catch(t){const n=new Error("Error caught in main loop tick",{cause:t});this.#s(n)}};tick=({deltaMS:e})=>{const t=w.getState(),n=Me(t)?It:void 0;if(zl(t))return;const r=Ll(t),{gameMenus:{userSettings:{displaySettings:s,soundSettings:i},gameInPlay:{freeCharacters:a}},upscale:{upscale:l}}=w.getState(),c=!r&&!(s?.uncolourised??ct.displaySettings.uncolourised);n?.startPhysics();const u=r?nt:this.#r(this.gameState,e);n?.endPhysics(),n?.startUpdateSceneGraph();const d=rt(this.gameState),h=this.#t?.renderContext.room!==d;(h||c!==this.#t?.renderContext.general.colourised)&&d!==void 0&&Uf(this.app.renderer,c,d.planet,d.color),n?.startHudUpdate();const p=El(t),f=Ul(t);gh(this.#e,c,p,f)&&(this.#e?.destroy(),this.#e=new mh({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1},inputDirectionMode:f,onScreenControls:p}),this.app.stage.addChild(this.#e.output)),this.#e.tick({screenSize:l.gameEngineScreenSize,deltaMS:e,room:d,freeCharacters:a}),n?.endHudUpdate();const v=bh(this.#t,h,l,s,i,r);if(v){if(this.#t?.destroy(),d){const x={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1},room:d};this.#t=new Lp(x,new $p(x,new Op(x))),this.#n.addChild(this.#t.output.graphics),this.#t.output.sound?.connect(this.#o)}else this.#t=void 0;this.app.stage.scale=l.gameEngineUpscale,this.#i(),this.app.stage.boundsArea=new cs(0,0,l.gameEngineScreenSize.x,l.gameEngineScreenSize.y)}this.#t?.tick({movedItems:u,deltaMS:e}),n?.endUpdateSceneGraph();try{if(n?.startPixiRender(),this.app.render(),n?.endPixiRender(),v&&d){const x=new CustomEvent("firstRenderOfRoom",{detail:{roomId:d.id}});window.dispatchEvent(x)}}catch(x){throw new Error("Error in Pixi.js app.render()",{cause:x})}n?.tickDone(),this.app.ticker.maxFPS=r?10:Vl};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#n),this.#o.disconnect(),this.#t?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Lo.defaultOptions.scaleMode="nearest";const vm=async(o,e)=>{const t=new Yl,[n]=await Promise.all([xc(o),t.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0})]);if(t.renderer.gl.drawingBufferColorSpace="display-p3",n.error)throw new Error(`could not load campaign ${JSON.stringify(o)}`,{cause:n.error});const r=n.data;$l(t.renderer),yc(t.renderer),wc(t),window._e2e_pixiApplication=t,globalThis.__PIXI_APP__=t;const s=Hl(w.getState(),o),i=Yn({campaign:r,inputStateTracker:e,savedGame:s});if(s!==void 0){const l=s.store.gameMenus.gameInPlay;w.dispatch(Nl(l))}else i.characterRooms.head&&w.dispatch(Jn(i.characterRooms.head.id)),i.characterRooms.heels&&w.dispatch(Jn(i.characterRooms.heels.id));const a=new dm(t,i).start();return{campaign:r,renderIn(l){l.appendChild(t.canvas)},resizeTo(l){t.renderer?.resize(l.x,l.y)},changeRoom(l){const c=lt(i);c!==void 0&&cn({playableItem:c,gameState:i,toRoomId:l,changeType:"level-select"})},get currentRoom(){return rt(i)},get gameState(){return i},reincarnateFrom(l){Yn({campaign:r,inputStateTracker:e,savedGame:l,writeInto:i})},stop(){console.warn("tearing down game"),t.canvas.parentNode?.removeChild(t.canvas),a.stop(),t.destroy()}}};export{vm as default,vm as gameMain};
