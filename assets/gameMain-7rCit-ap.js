import{ai as Qi,O as E,V as nn,W as U,A as rn,T as H,h as A,bL as be,C as Oe,a1 as N,j as Ie,U as Ki,M as ea,bM as Xe,bN as cs,f as Wt,v as Yt,bO as ta,a7 as Eo,i as y,w as oa,bP as na,bQ as ra,bR as De,bS as Ke,bT as $n,bU as vo,bV as xo,bW as me,aG as ye,aa as Fe,t as us,bX as Ct,g as sa,aq as X,bY as w,bZ as ia,z as aa,bo as Y,aD as ds,b_ as Hn,aB as C,b$ as sn,c0 as la,az as Le,c1 as ze,c2 as an,c3 as hs,aH as ca,c4 as Re,R as ps,c5 as fs,c6 as ms,c7 as ua,br as gs,c8 as Pe,c9 as et,ca as da,cb as io,cc as Nn,cd as ln,ce as ne,cf as ha,cg as st,as as R,ch as te,b1 as B,ci as pa,cj as It,aX as St,ck as it,cl as ve,cm as J,cn as fa,aP as Rt,co as Pt,aZ as ie,aW as Ee,cp as ao,cq as ma,cr as ga,cs as ba,ct as ya,cu as cn,bv as Ue,bu as Mt,o as bs,cv as va,cw as ys,cx as oo,bF as un,cy as Lt,cz as Uo,cA as xa,cB as wa,cC as dn,cD as vs,cE as Ca,cF as Sa,cG as oe,cH as Ta,aR as Bt,cI as ka,cJ as At,cK as re,cL as xe,cM as Ia,cN as Ra,cO as Pa,cP as hn,cQ as xs,cR as no,cS as pn,cT as ws,cU as we,cV as Ma,cW as Cs,cX as Ba,cY as Aa,cZ as Jt,c_ as fn,c$ as Oa,d0 as _a,d1 as Da,d2 as q,d3 as Fa,d4 as za,d5 as F,d6 as La,d7 as Ea,d8 as Ua,d9 as qt,da as Ss,aS as Z,db as mn,dc as Va,dd as gn,aM as Ts,de as bn,df as wo,dg as Vo,bD as ro,dh as jn,bC as yn,di as ks,dj as Is,dk as vn,dl as Rs,b0 as xn,dm as Ps,aQ as tt,dn as wn,dp as lo,dq as Ga,dr as Cn,ds as k,dt as Ze,aO as $a,ak as Ha,du as ee,dv as Zt,dw as Na,dx as ja,dy as co,dz as Xa,dA as Wa,dB as Xn,dC as Ya,dD as Ms,dE as Sn,dF as Qt,dG as Bs,dH as As,dI as xt,dJ as ot,dK as Ja,dL as qa,dM as Os,dN as Za,dO as Qa,dP as Ka,dQ as el,bA as at,dR as Et,dS as Ut,dT as S,dU as Go,dV as _s,dW as lt,ar as Tn,dX as Ds,dY as tl,dZ as ol,d_ as nl,d$ as rl,e0 as sl,bt as il,e1 as ce,e2 as Fs,e3 as al,e4 as ll,e5 as cl,e6 as Wn,e7 as Yn,e8 as ul,e9 as zs,bH as Ls,ea as dl,ap as hl,eb as pl,ec as fl,ed as ml,ee as Es,ef as gl,eg as bl,aL as yl,eh as vl,aJ as xl,ei as wl,ej as kn,ek as Cl,el as ht,em as Se,en as Sl,eo as Tl,aU as kl,ep as Il,eq as Rl,er as Pl,es as Ml,et as Bl,eu as Al,ev as Ol,ew as _l,ex as Dl,ey as Fl,bB as nt,ez as zl,eA as Ll,eB as El,eC as Ul,eD as Vl,eE as Gl,eF as $l,eG as Hl,eH as Nl,eI as jl,eJ as Xl,eK as Wl,eL as Jn,eM as Yl,eN as qn}from"./App-CJ_JOKAG.js";import{s as g,a as uo,g as Us}from"./spritesheetPalette-hcmYXtMp.js";import{v as Jl,b as ql,h as pe,s as Zl,A as Ql}from"./spectrumLut-B-uHZL5h.js";import{g as Kl}from"./index-DnJ6meqD.js";import{r as V,g as $o,p as Ho,b as In,c as Rn,a as ue,d as rt,e as Vs,f as Zn,s as Qn,h as ec,i as tc,j as oc}from"./pixiContainerToString-CNDT9ozZ.js";import{T as nc,C as Kn,a as rc}from"./CanvasTextGenerator-B8Cuxdqb.js";import"./CanvasPool-C3YdN_UB.js";var Vt={},er;function sc(){if(er)return Vt;er=1;const{wrapWithIterableIterator:o,ensureIterable:e}=Qi();function*t(...r){for(const s of r)yield*e(s)}Vt.__concat=t;const n=o(t);return Vt.concat=n,Vt}var Co,tr;function ic(){return tr||(tr=1,Co=sc().concat),Co}var ac=ic();const lc=Kl(ac);var cc=`
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
`,uc=`in vec2 aPosition;
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
`,dc=`
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
}`;class O extends E{constructor(e){const t=e.gpu,n=or({source:dc,...t}),r=nn.from({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,i=or({source:cc,...s}),a=U.from({vertex:uc,fragment:i}),l=new rn({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:H.EMPTY}})}}function or(o){const{source:e,functions:t,main:n}=o;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const Pn=`
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
    `,Mn=`
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
	`;class Gs extends O{constructor(){super({gl:{functions:`
                ${Pn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Mn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Gs.extension={name:"color",type:A.BlendMode};class $s extends O{constructor(){super({gl:{functions:`
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
            `}})}}$s.extension={name:"color-burn",type:A.BlendMode};class Hs extends O{constructor(){super({gl:{functions:`
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
                `}})}}Hs.extension={name:"color-dodge",type:A.BlendMode};class Ns extends O{constructor(){super({gl:{functions:`
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
                `}})}}Ns.extension={name:"darken",type:A.BlendMode};class js extends O{constructor(){super({gl:{functions:`
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
            `}})}}js.extension={name:"difference",type:A.BlendMode};class Xs extends O{constructor(){super({gl:{functions:`
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
            `}})}}Xs.extension={name:"divide",type:A.BlendMode};class Ws extends O{constructor(){super({gl:{functions:`
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
            `}})}}Ws.extension={name:"exclusion",type:A.BlendMode};class Ys extends O{constructor(){super({gl:{functions:`
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
                `}})}}Ys.extension={name:"hard-light",type:A.BlendMode};class Js extends O{constructor(){super({gl:{functions:`
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
            `}})}}Js.extension={name:"hard-mix",type:A.BlendMode};class qs extends O{constructor(){super({gl:{functions:`
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
            `}})}}qs.extension={name:"lighten",type:A.BlendMode};class Zs extends O{constructor(){super({gl:{functions:`
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
                `}})}}Zs.extension={name:"linear-burn",type:A.BlendMode};class Qs extends O{constructor(){super({gl:{functions:`
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
            `}})}}Qs.extension={name:"linear-dodge",type:A.BlendMode};class Ks extends O{constructor(){super({gl:{functions:`
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
            `}})}}Ks.extension={name:"linear-light",type:A.BlendMode};class ei extends O{constructor(){super({gl:{functions:`
                ${Pn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Mn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ei.extension={name:"luminosity",type:A.BlendMode};class ti extends O{constructor(){super({gl:{functions:`
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
            `}})}}ti.extension={name:"negation",type:A.BlendMode};class oi extends O{constructor(){super({gl:{functions:`
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
                `}})}}oi.extension={name:"overlay",type:A.BlendMode};class ni extends O{constructor(){super({gl:{functions:`
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
                `}})}}ni.extension={name:"pin-light",type:A.BlendMode};class ri extends O{constructor(){super({gl:{functions:`
                ${Pn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Mn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ri.extension={name:"saturation",type:A.BlendMode};class si extends O{constructor(){super({gl:{functions:`
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
                `}})}}si.extension={name:"soft-light",type:A.BlendMode};class ii extends O{constructor(){super({gl:{functions:`
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
                `}})}}ii.extension={name:"subtract",type:A.BlendMode};class ai extends O{constructor(){super({gl:{functions:`
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
                `}})}}ai.extension={name:"vivid-light",type:A.BlendMode};var hc=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,nr=`struct GlobalFilterUniforms {
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
}`;const li=class ci extends E{constructor(e){e={...ci.defaultOptions,...e};const t=nn.from({vertex:{source:nr,entryPoint:"mainVertex"},fragment:{source:nr,entryPoint:"mainFragment"}}),n=U.from({vertex:be,fragment:hc,name:"alpha-filter"}),{alpha:r,...s}=e,i=new rn({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:t,glProgram:n,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};li.defaultOptions={alpha:1};let pc=li;var fc=`
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
`,rr=`struct GlobalFilterUniforms {
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
}`;class mc extends E{constructor(e={}){const t=new rn({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),n=nn.from({vertex:{source:rr,entryPoint:"mainVertex"},fragment:{source:rr,entryPoint:"mainFragment"}}),r=U.from({vertex:be,fragment:fc,name:"color-matrix-filter"});super({...e,gpuProgram:n,glProgram:r,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const[n,r,s]=Oe.shared.setValue(e).toArray(),i=[n,0,0,0,0,0,r,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),r=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=n+(1-n)*i,c=i*(1-n)-a*r,u=i*(1-n)+a*r,d=i*(1-n)+a*r,h=n+i*(1-n),p=i*(1-n)-a*r,f=i*(1-n)-a*r,m=i*(1-n)+a*r,v=n+i*(1-n),x=[l,c,u,0,0,d,h,p,0,0,f,m,v,0,0,0,0,0,1,0];this._loadMatrix(x,t)}contrast(e,t){const n=(e||0)+1,r=-.5*(n-1),s=[n,0,0,0,r,0,n,0,0,r,0,0,n,0,r,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,r=(n-1)*-.5,s=[n,r,r,0,0,r,n,r,0,0,r,r,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,r,s){e||(e=.2),t||(t=.15),n||(n=16770432),r||(r=3375104);const i=Oe.shared,[a,l,c]=i.setValue(n).toArray(),[u,d,h]=i.setValue(r).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,t,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,s)}night(e,t){e||(e=.1);const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}class ae extends N{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:n=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=t,[p]=u;super({...h,texture:p instanceof H?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=n,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ie.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ie.shared.add(this.update,this,Ki.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,n=this.animationSpeed*t,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=n/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=n;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(r=>{this.texture!==r&&r.destroy(n)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let n=0;n<e.length;++n)t.push(H.from(e[n]));return new ae(t)}static fromImages(e){const t=[];for(let n=0;n<e.length;++n)t.push(H.from(e[n]));return new ae(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof H)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ie.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ie.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class gc{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new ea,this.observer=t,this.position=new Xe(this,0,0),this.scale=new Xe(this,1,1),this.pivot=new Xe(this,0,0),this.skew=new Xe(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const ui=class Kt extends cs{constructor(...e){let t=e[0]||{};t instanceof H&&(t={texture:t}),e.length>1&&(Wt(Yt,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...Kt.defaultOptions,...t};const{texture:n,anchor:r,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=t??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new Xe({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=n,this._width=l??n.width,this._height=c??n.height,this._tileTransform=new gc({observer:{_onUpdate:()=>this.onViewUpdate()}}),r&&(this.anchor=r),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=d??!1}static from(e,t={}){return typeof e=="string"?new Kt({texture:ta.get(e),...t}):new Kt({texture:e,...t})}get uvRespectAnchor(){return Wt(Yt,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){Wt(Yt,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=H.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,n=this._width,r=this._height;e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}containsPoint(e){const t=this._width,n=this._height,r=-t*this._anchor._x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this._anchor._y,e.y>=s&&e.y<=s+n)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(n)}this._texture=null}};ui.defaultOptions={texture:H.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let bc=ui;class yc extends cs{constructor(e,t){const{text:n,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Xe({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<=s+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function vc(o,e){let t=o[0]??{};return(typeof t=="string"||o[1])&&(Wt(Yt,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:o[1]}),t}class xc extends yc{constructor(...e){const t=vc(e,"Text");super(t,nc),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof Eo?t.textureStyle:new Eo(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let n=0,r=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=Kn.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Kn.returnCanvasAndContext(i),n=s.width,r=s.height}else{const s=rc.measureText(this._text,this._style);n=s.width,r=s.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}}const di=class hi extends y{constructor(e={}){e={...hi.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const n=e[t];if(n.parentRenderLayer){if(n.parentRenderLayer===this)continue;n.parentRenderLayer.detach(n)}this.renderLayerChildren.push(n),n.parentRenderLayer=this;const r=this.renderGroup||this.parentRenderGroup;r&&(r.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const n=e[t],r=this.renderLayerChildren.indexOf(n);r!==-1&&this.renderLayerChildren.splice(r,1),n.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,n){const r=this.renderLayerChildren,s=r.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)r[i].parent||oa("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",r[i]),r[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,n){if(!e)return;const r=this.renderLayerChildren;for(let s=0;s<r.length;s++)r[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};di.defaultOptions={sortableChildren:!1,sortFunction:(o,e)=>o.zIndex-e.zIndex};let sr=di;var wc=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;uniform sampler2D uMask;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);float maskVal=texture(uMask,vTextureCoord).r;finalColor=mix(c,lutColourReplace(uLut,c),maskVal);}`;const Cc=U.from({vertex:be,fragment:wc,name:"palette-swop-filter1"});class Qe extends E{constructor({paletteSwaps:e,lutType:t},n=H.WHITE){const r=(t==="voronoi"?Jl:ql)(e);super({glProgram:Cc,resources:{colorReplaceUniforms:{},uLut:r.source,uMask:n.source}}),this.mask=n,this.#e=r}#e;destroy(e){const t=e===!0||typeof e=="object"&&e.destroyPrograms,n=e===!0||typeof e=="object"&&e.destroyLutTexture,r=this.lutTexture!==H.WHITE&&e===!0||typeof e=="object"&&e.destroyMask;n&&this.#e?.destroy(!0),this.#e=null,r&&this.mask?.destroy(!0),super.destroy(t)}get lutTexture(){return this.#e}}const pi={ambient:[]},Sc=ye(Ct).filter(o=>o.startsWith("shadow.")||o.startsWith("shadowMask.")||o.startsWith("hud.")).toArray(),Tc=o=>typeof o=="function"?ye(Ct).filter(o):o,kc=(o,e)=>new Qe({paletteSwaps:us(g,([t])=>t==="replaceDark"||t==="replaceLight"?[t,o]:[t,e]),lutType:"sparse"}),Ic=(o,{ambient:e,textureSpecific:t=Ke,noReplacePlaceholderTextures:n=Ke},r=na())=>{const s=[];for(const{textureIds:u,paletteSwaps:d}of t){const h=$n(o,{rects:{textureIds:u,color:vo},clearColour:xo}),p=new Qe({paletteSwaps:d,lutType:"sparse"},h);s.push(p)}const i=n.length>0?kc(xo,vo):void 0,a=$n(o,{clearColour:vo,rects:{textureIds:lc(Sc,ye(t).filter(({dodgeAmbient:u})=>u).flatMap(({textureIds:u})=>Tc(u))),color:xo},placeholderColoursMasks:i?{textureIds:n,filter:i,originalSpritesheet:me()}:void 0});i?.destroy({destroyLutTexture:!0,destroyMask:!0});for(const u of e){const d=new Qe(u,a);s.push(d)}const l=new N(r);l.filters=s;const c=Fe.create({width:r.width,height:r.height});o.render({container:l,target:c}),l.destroy(!1),a.destroy();for(const u of s)u instanceof Qe?u.destroy({destroyLutTexture:!0,destroyMask:!0,destroyPrograms:!1}):u.destroy(!1);return c},ct=(o,e,t)=>{const n=Ic(o,e,t),r=new ra(n.source,structuredClone(De));return r.parseSync(),r.textureSource.scaleMode="nearest",r},Bn={ambient:[{paletteSwaps:uo,lutType:"sparse"}]},so=(o,e,t)=>{const n=H.from(e.textureSource),r=ct(o,t,n);return n.destroy(),e.textureSource.destroy(),e.destroy(!0),r};let No;const Rc=o=>{No=ct(o,{ambient:[{lutType:"voronoi",paletteSwaps:{pureBlack:new Oe(0),shadow:new Oe(16777215),redShadow:new Oe(16777215)}}]})},Pc=()=>{if(No===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return No};sa.add(Gs,$s,Hs,Ns,js,Xs,Ws,Ys,Js,qs,Zs,Ks,Qs,ei,ti,oi,ni,ri,si,ii,ai);const Mc=async(o,{forceRefetch:e}=X)=>await w.dispatch(ia.endpoints.getCampaign.initiate(o,{forceRefetch:e}));H.from;aa.prototype.destroy;const Bc=o=>{o.ticker.remove(o.render,o)},fi={white:{basic:{main:"white",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"white",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}}},yellow:{basic:{main:"yellow",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}},dimmed:{main:"yellow",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!1}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}}},magenta:{basic:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}},dimmed:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}}},cyan:{basic:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}},dimmed:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!0},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}}},green:{basic:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}}}},Ot=o=>fi[o.hue][o.shade],jo={head:"pastelBlue",heels:"pink"},ir=(o,e)=>{const t=Ot(o.color).edges[e];return Y(t.hue,t.dimInOriginal?"dimmed":"basic")},Ac=Ct.filter(o=>o.startsWith("door.")),Xo=o=>/\.floor$/.test(o),Wo=o=>/\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(o),ar=o=>/door\.legs\.pillar/.test(o),Oc=o=>/\.wall\.[^.]+\.left$/.test(o),So=o=>Xo(o)||Wo(o),_c=(o,e,t)=>{if(o)return{ambient:[{lutType:"sparse",paletteSwaps:V(t.hue,t.shade==="dimmed")},t.shade==="basic"?mi(e,t):{lutType:"sparse",paletteSwaps:{...uo}}],textureSpecific:[...Fc(e,t),...Dc(e,t),...zc(t)],noReplacePlaceholderTextures:Ac}},Dc=(o,e)=>{const{edges:t}=fi[e.hue][e.shade],n=V(t.right.hue,e.shade==="dimmed","light-mid"),r=V(t.towards.hue,e.shade==="dimmed","mid-dark");return[{textureIds:["floorEdge.half.right","floorEdge.right","generic.door.floatingThreshold.y"],paletteSwaps:n},{textureIds:["floorEdge.half.towards","floorEdge.towards","generic.door.floatingThreshold.x"],paletteSwaps:r}]},Fc=(o,e)=>{if(o==="jail")return[{textureIds:So,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];if(o==="blacktooth"&&e.shade==="dimmed")return[{textureIds:Wo,paletteSwaps:V(e.hue,!0,"light-mid")}];if(e.hue==="white"||e.hue==="yellow")switch(o){case"market":return[{textureIds:So,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];case"egyptus":return[{textureIds:ar,paletteSwaps:V(e.hue,e.shade==="dimmed","light-dark")},{textureIds:Xo,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")},{textureIds:Oc,paletteSwaps:V(e.hue,e.shade==="dimmed","light-mid")},{textureIds:Wo,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];case"moonbase":case"penitentiary":case"safari":case"bookworld":return[{textureIds:Xo,paletteSwaps:V(e.hue,e.shade==="dimmed","mid-dark")}];case"blacktooth":return[{textureIds:ar,paletteSwaps:V(e.hue,e.shade==="dimmed","light-dark")},{textureIds:So,paletteSwaps:V(e.hue,e.shade==="dimmed","light-mid")}]}return Ke},zc=o=>{const{hue:e,shade:t}=o;return e==="white"||e==="yellow"?[{textureIds:["book.x","book.y"],paletteSwaps:{...V(e,t==="dimmed","light-mid"),shadow:$o(`swop_${e}Dim`,t==="dimmed")}}]:t==="dimmed"?[{textureIds:["book.x","book.y"],paletteSwaps:{...V(o.hue,!0,o.hue==="cyan"?"light-mid":"mid-dark")}}]:Ke},Lc={blacktooth:{pureBlack:pe(g.moss,.15)},safari:{pureBlack:pe(g.moss,.17)},jail:{pureBlack:pe(g.redShadow,.2)},egyptus:{pureBlack:pe(g.redShadow)},moonbase:{shadow:g.shadow_greyBlue,pureBlack:pe(g.metallicBlue,.2)},bookworld:{shadow:g.shadow_brown,pureBlack:pe(g.highlightBeige,.1)},penitentiary:{pureBlack:pe(g.midGrey,.2)}},Ec={yellow:{shadow:g.shadow_brown},white:{shadow:g.shadow_greyBlue},magenta:{shadow:g.shadow_magenta},cyan:{shadow:g.shadow_blue}},mi=(o,e)=>({lutType:"sparse",paletteSwaps:{...Ec[e.hue]??X,...Lc[o]??X}});let We,Yo=pi;const gi=()=>{We!==void 0&&(We.textureSource.destroy(),We.destroy(!0),We=void 0)},Uc=(o,e,t,n)=>{gi(),Yo=_c(e,t,n)??pi,We=ct(o,Yo)},Vc=()=>We,eo=o=>{let e=g[o];for(const t of Yo.ambient)e=t.paletteSwaps[o]??e;return e};let Me;const An={lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,pastelBlue:g.lightGrey,metallicBlue:g.midGrey,replaceLight:g.lightGrey,replaceDark:g.midGrey},Gc=ds(An,"metallicBlue","pastelBlue"),$c=ds(An,"pink"),Hc={ambient:[{paletteSwaps:An,lutType:"sparse"}],textureSpecific:[{textureIds:Ct.filter(o=>o.startsWith("head.")),paletteSwaps:Gc,dodgeAmbient:!0},{textureIds:Ct.filter(o=>o.startsWith("heels.")),paletteSwaps:$c,dodgeAmbient:!0}]},Nc=()=>{Me!==void 0&&(Me.textureSource.destroy(),Me.destroy(!0),Me=void 0)},jc=(o,e,t)=>{Nc();let n=ct(o,Hc);t.shade==="dimmed"?n=so(o,n,Bn):n=so(o,n,{ambient:[mi(e,t)]}),Me=n},Xc=()=>{if(Me===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Me};let Be;const Wc={midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,shadow:g.redShadow,pastelBlue:g.lightBeige,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige},Yc=()=>{Be!==void 0&&(Be.textureSource.destroy(),Be.destroy(!0),Be=void 0)},Jc=(o,e)=>{Yc();let t=ct(o,{ambient:[{paletteSwaps:Wc,lutType:"sparse"}]});e&&(t=so(o,t,Bn)),Be=t},qc=()=>{if(Be===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Be};let Ae;const Zc={pastelBlue:g.moss,metallicBlue:g.moss,pink:g.moss},Qc=()=>{Ae!==void 0&&(Ae.textureSource.destroy(),Ae.destroy(!0),Ae=void 0)},Kc=(o,e)=>{Qc();let t=ct(o,{ambient:[{paletteSwaps:Zc,lutType:"sparse"}]});e&&(t=so(o,t,Bn)),Ae=t},eu=()=>{if(Ae===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ae},de=o=>{try{switch(o){case"original":return me();case"deactivated":return Xc();case"doughnutted":return qc();case"for-current-room":return Vc();case"sceneryPlayer":return eu();case"uncolourised":return Pc();default:return o}}catch(e){throw new Error(`could not get spritesheet variant "${o}"`,{cause:e})}},vt=(o="for-current-room",e)=>de(o).textures[e],to=o=>{if(o===void 0)return 0;const{shieldCollectedAt:e,gameTime:t}=o;return e!==null&&e+Hn>t?100-Math.ceil((t-e)/(Hn/100)):0},On=o=>o.type==="headOverHeels"?to(o.state.head)>0||to(o.state.heels)>0:to(o.state)>0,_n=o=>{const e=100*C.x;return o.gameWalkDistance<=o.fastStepsStartedAtDistance+e?100-Math.ceil((o.gameWalkDistance-o.fastStepsStartedAtDistance)/C.x):0};var tu=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let Jo=sn(w.getState());w.subscribe(()=>{Jo=sn(w.getState())});const ou=U.from({vertex:be,fragment:tu,name:"outline-filter"});class ge extends E{outlineWidth;constructor({color:e,width:t}){const n=t??Jo;super({glProgram:ou,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.outlineWidth=t;const r=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();r.uOutline[0]=s,r.uOutline[1]=i,r.uOutline[2]=a}apply(e,t,n,r){const s=this.resources.colorReplaceUniforms.uniforms,i=this.outlineWidth??Jo;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,n,r)}}const _t={...us(g,([o,e])=>[o,new ge({color:e})]),black1pxFilter:new ge({color:g.pureBlack,width:1})},To={x:.5,y:1},lr=o=>typeof o!="string"&&Object.hasOwn(o,"animationId"),qo=o=>{const{anchor:e,flipX:t,pivot:n,x:r,y:s,times:i,label:a}=o;if(o.times){const c=la(i);if(Le(c)>=2){const d=new y({label:a??"timesXyz"});for(let{x:h}=c;h>=1;h--)for(let{y:p}=c;p>=1;p--)for(let f=1;f<=c.z;f++){const m={...o,label:`(${h},${p},${f})`,...o.subSpriteVariations?.(h-1,p-1,f-1),subSpriteVariations:void 0};"randomiseStartFrame"in m&&(m.randomiseStartFrame=`${m.randomiseStartFrame}${h},${p},${f}`),delete m.times;const v=qo(m),x=ze({x:h-1,y:p-1,z:f-1});v.x+=x.x,v.y+=+x.y,d.addChild(v)}return d}}if(o.subSpriteVariations!==void 0)return qo({...o,...o.subSpriteVariations(0,0,0),subSpriteVariations:void 0});let l;if(lr(o))l=nu(o);else{const{textureId:c}=o,u=de(o.spritesheetVariant??"original");l=new N(c!==void 0?u.textures[c]:H.EMPTY)}if(e===void 0&&n===void 0)if(lr(o))l.anchor=To;else{const{textureId:c}=o,u=c!==void 0?de(o.spritesheetVariant??"original").data.frames[c]:void 0;if(u!==void 0){const d=u.frame;d.pivot!==void 0?l.pivot=d.pivot:l.anchor=To}else l.anchor=To}else e!==void 0&&(l.anchor=e),n!==void 0&&(l.pivot=n);return r!==void 0&&(l.x=r),s!==void 0&&(l.y=s),a!==void 0&&(l.label=a),l.eventMode="static",t===!0&&(l.scale.x=-1),l},bi=(o,e=!1)=>{const t=Ie.shared.speed,n=e||t===0?0:Math.sqrt(t)/t;return De.animations[o].animationSpeed*n},Dn=o=>o.map(e=>({texture:e,time:an}));function nu({animationId:o,reverse:e,playOnce:t,paused:n,randomiseStartFrame:r,spritesheetVariant:s}){const i=de(s).animations[o],a=Dn(i);e&&a.reverse();const l=new ae(a);return l.animationSpeed=bi(o,n),l.gotoAndPlay(r!==void 0?Math.floor(hs(r)*a.length):0),t!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),t==="and-destroy"&&(l.visible=!1)}),l}const b=qo;class ru extends ae{destroy(e){const t=this.textures.map(n=>"texture"in n?n.texture:n).filter(n=>n instanceof Fe);super.destroy(e);for(const n of t)n.destroy(!0)}}class su extends N{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:this.texture instanceof Fe,children:e}):super.destroy({...e,texture:t,textureSource:this.texture instanceof Fe})}}const Tt=(o,e,t)=>{const n=e.getLocalBounds(),r=Math.ceil(n.maxX-n.minX),s=Math.ceil(n.maxY-n.minY),i=t!==void 0?t.width===r&&t.height===s:!1,a=i?t:Fe.create({width:r,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=n.minX,e.y-=n.minY;try{o.render({container:e,target:a,clear:i})}catch(u){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${Ho(e)}`,{cause:u})}return e.x=l,e.y=c,a},se=(o,e,t,n)=>{const r=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof Fe?t.texture:void 0,i=Tt(o,e,s),a=t||new su;return a.texture=i,a.label=n??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Fn=(o,e,t,n)=>{if(e instanceof ae||e instanceof N)return e;const r=e.getLocalBounds(),s=e.children.find(l=>l instanceof ae)?.textures.length??1,i=ye(ca(0,s)).map(l=>{if(l>0)for(const c of e.children)c instanceof ae&&c.gotoAndStop((c.currentFrame+1)%s);return Tt(o,e)}).toArray(),a=new ru(Dn(i));return a.animationSpeed=bi(t,!1),a.gotoAndPlay(0),a.label=`animated sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},ut=(o,e)=>e instanceof N?e:se(o,e),iu=o=>{const e=`hud.char.${ua(o)}`;try{ms(e)}catch(t){throw new Error(`no texture id for char "${o}": ${t.message}`,{cause:t})}return e},au=o=>typeof o=="string"?o==="infinite"?"":o:o.toString();class D extends y{#e;#t="";#n;#o;#r;#s;#i;constructor({pixiRenderer:e,doubleHeight:t=!1,doubleWidth:n=!1,outline:r=!1,label:s="text",x:i,y:a,tint:l,text:c}){super({label:s,x:i,y:a,tint:l}),this.#e=e,this.#s=t?2:1,this.#i=n?2:1,this.#n=new N,this.#n.y=-(Re.h*this.#s+1),this.addChild(this.#n),this.#r=new y,this.addChild(this.#r),this.#o=new y,this.#o.scale={x:this.#i,y:this.#s},r&&(this.#o.filters=new ge({color:g.pureBlack,width:1})),this.#r.addChild(this.#o),c!==void 0&&(this.text=c)}get text(){return this.#t}set text(e){const t=au(e);this.#t!==t&&(this.#c(t),this.#r.visible=!0,this.#r.boundsArea=new ps(-1,-1,(Re.w*t.length+2)*this.#i,(Re.h+2)*this.#s),this.#n.texture&&this.#n.texture.destroy(!0),this.#n.texture=Tt(this.#e,this.#r),this.#n.x=-this.#n.texture.frame.width/2,this.#r.visible=!1,this.#t=t)}#c(e){const t=fs(e),n=this.#o.children.length,r=t!==n;try{const s=me().textures;let i=0;for(const a of e){const l=iu(a);let c;i<n?(c=this.#o.getChildAt(i),c.texture=s[l]):(c=new N(s[l]),this.#o.addChild(c)),i++}}catch(s){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(s),window.invalid=e,new Error(`could not show text "${e}" in container because: "${s.message}"`,{cause:s})}if(r){t<n&&this.#o.removeChildren(t);for(let s=0;s<t;s++){const i=this.#o.getChildAt(s);i.x=s*Re.w}}}destroy(e){this.#n.destroy({texture:!0,textureSource:!0}),super.destroy(e)}get characterSpriteContainer(){return this.#o}}function lu(o){return{all:o=o||new Map,on:function(e,t){var n=o.get(e);n?n.push(t):o.set(e,[t])},off:function(e,t){var n=o.get(e);n&&(t?n.splice(n.indexOf(t)>>>0,1):o.set(e,[]))},emit:function(e,t){var n=o.get(e);n&&n.slice().map(function(r){r(t)}),(n=o.get("*"))&&n.slice().map(function(r){r(e,t)})}}}class zn{constructor(e=2e3){this.reportIntervalMs=e}static instance=new zn;#e={physics:{totalMs:0,count:0},hudUpdate:{totalMs:0,count:0},updateSceneGraph:{totalMs:0,count:0},pixiRender:{totalMs:0,count:0}};#t={};#n=performance.now();#o={frameCount:0,elapsedMs:0,fps:0,theoreticalFps:0,phases:{physics:{avgMs:0,percentage:0},hudUpdateSceneGraph:{avgMs:0,percentage:0},updateSceneGraph:{avgMs:0,percentage:0},pixiRender:{avgMs:0,percentage:0},total:{avgMs:0,percentage:0}}};#r=lu();startPhysics(){this.#t.physicsStart=performance.now()}endPhysics(){if(this.#t.physicsStart===void 0){console.warn("endPhysics called without startPhysics");return}const e=performance.now()-this.#t.physicsStart;this.#e.physics.totalMs+=e,this.#e.physics.count++,this.#t.physicsStart=void 0}startHudUpdate(){this.#t.hudUpdateStart=performance.now()}endHudUpdate(){if(this.#t.hudUpdateStart===void 0){console.warn("endHudUpdate called without startHudUpdate");return}const e=performance.now()-this.#t.hudUpdateStart;this.#e.hudUpdate.totalMs+=e,this.#e.hudUpdate.count++,this.#t.hudUpdateStart=void 0}startUpdateSceneGraph(){this.#t.updateSceneGraphStart=performance.now()}endUpdateSceneGraph(){if(this.#t.updateSceneGraphStart===void 0){console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");return}const e=performance.now()-this.#t.updateSceneGraphStart;this.#e.updateSceneGraph.totalMs+=e,this.#e.updateSceneGraph.count++,this.#t.updateSceneGraphStart=void 0}startPixiRender(){this.#t.pixiRenderStart=performance.now()}endPixiRender(){if(this.#t.pixiRenderStart===void 0){console.warn("endPixiRender called without startPixiRender");return}const e=performance.now()-this.#t.pixiRenderStart;this.#e.pixiRender.totalMs+=e,this.#e.pixiRender.count++,this.#t.pixiRenderStart=void 0}tickDone(){const e=performance.now();e-this.#n>=this.reportIntervalMs&&this.#s(e)}on(e){this.#r.on("stats",e)}off(e){this.#r.off("stats",e)}#s(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e;t.count===0&&n.count===0&&r.count===0&&s.count===0||(this.#i(e),this.#r.emit("stats",this.#o),this.reset(e))}#i(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e,i=t.count>0?t.totalMs/t.count:0,a=n.count>0?n.totalMs/n.count:0,l=r.count>0?r.totalMs/r.count:0,c=s.count>0?s.totalMs/s.count:0,u=i+a+l+c,d=Math.max(t.count,n.count,r.count,s.count),h=e-this.#n;this.#o.frameCount=d,this.#o.elapsedMs=h,this.#o.fps=d/h*1e3,this.#o.theoreticalFps=u>0?1e3/u:0,this.#o.phases.physics.avgMs=i,this.#o.phases.physics.percentage=i/u*100,this.#o.phases.hudUpdateSceneGraph.avgMs=a,this.#o.phases.hudUpdateSceneGraph.percentage=a/u*100,this.#o.phases.updateSceneGraph.avgMs=l,this.#o.phases.updateSceneGraph.percentage=l/u*100,this.#o.phases.pixiRender.avgMs=c,this.#o.phases.pixiRender.percentage=c/u*100,this.#o.phases.total.avgMs=u,this.#o.phases.total.percentage=100}reset(e=performance.now()){this.#e.physics.totalMs=0,this.#e.physics.count=0,this.#e.hudUpdate.totalMs=0,this.#e.hudUpdate.count=0,this.#e.updateSceneGraph.totalMs=0,this.#e.updateSceneGraph.count=0,this.#e.pixiRender.totalMs=0,this.#e.pixiRender.count=0,this.#n=e}}const kt=zn.instance;gs({predicate(o,e,t){return Pe(e)!==Pe(t)},effect(o){kt.reset()}});class cr{constructor(e){this.renderContext=e,this.#t=new D({pixiRenderer:e.general.pixiRenderer,label:"fps",outline:!0,y:Re.h,text:"..."}),this.#e.addChild(this.#t),kt.on(this.tick)}#e=new y({label:"FpsRenderer"});#t;#n=!1;#o;set isDark(e){this.#n!==e&&(this.#n=e,this.#s())}#r(e,t){const n=e/t;return n>1.95?"white":n>1.67?"highlightBeige":n>.97?"moss":n>.92?"pastelBlue":n>.83?"metallicBlue":n>.67?"pink":"midRed"}#s(){const e=this.#o;this.#t.text=e===void 0?"...":`${Math.round(e)} FPS`;const t=e===void 0?"white":this.#r(e,60),n=Us(this.#n);this.#t.tint=n[t]}tick=e=>{this.#o=e.fps,this.#s()};get output(){return this.#e}destroy(){kt.off(this.tick),this.#e.destroy()}}const ko={colourised:{jump:"pastelBlue",fire:"highlightBeige",carry:"moss",carryAndJump:"midRed",menu:"lightGrey",map:"lightGrey"},zx:{jump:"blue",fire:"yellow",carry:"green",carryAndJump:"red",menu:"white",map:"white"}};class ho extends y{constructor(e,t,n,r){super({label:`arcadeButton (${t})`}),this.colourised=e,this.which=t,this.pixiRenderer=n,this.#t=new y({label:"depress"}),this.addChild(this.#t),this.#o=new N({anchor:{x:.5,y:1}}),this.#r=new N({anchor:{x:.5,y:1}}),this.#r.visible=!1,this.#t.addChild(this.#o),this.#t.addChild(this.#r),this.#e=new y({label:"surface"});const s=b({textureId:"button.surfaceMask",label:"surfaceMask",spritesheetVariant:"original"});this.#t.addChild(s),this.#e.mask=s,this.#t.addChild(this.#e),this.shownOnSurface=r}#e;#t;#n;#o;#r;get shownOnSurface(){return this.#n}set shownOnSurface(e){this.#n!==void 0&&this.#n.destroy({children:!0}),this.#n=e,e!==void 0&&this.#e.addChild(e)}set pressed(e){this.#o.visible=!e,this.#r.visible=e,this.#t.y=e?1:0}generateButtonSpriteTextures(e){const{which:t,colourised:n}=this,r=b({textureId:"button",spritesheetVariant:"original"}),s=n?$o(ko.colourised[t],e.color.shade==="dimmed"):Y(ko.zx[t]),i=n?pe(s,.66):Y(ko.zx[t],"dimmed"),a=n?$o("pureBlack",e.color.shade==="dimmed"):Y("black"),l=new Qe({lutType:"sparse",paletteSwaps:{replaceLight:s,replaceDark:i,pureBlack:a}});r.filters=l;const c=Tt(this.pixiRenderer,r,this.#o.texture===H.EMPTY?void 0:this.#o.texture);r.texture=me().textures["button.pressed"];const u=Tt(this.pixiRenderer,r,this.#r.texture===H.EMPTY?void 0:this.#r.texture);this.#o.texture=c,this.#r.texture=u,l.destroy({destroyLutTexture:!0}),r.destroy({children:!0})}}const Zo=o=>{if(o instanceof N){const{texture:e}=o;e instanceof Fe&&e.destroy(!0)}for(const e of o.children)Zo(e)};class yi{constructor(e,t){this.renderContext=e,this.appearance=t}#e;output=new y({label:"AppearanceRenderer"});destroy(){this.#e?.output&&Zo(this.#e.output),this.output.destroy({children:!0})}tick(e){const t=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),Zo(this.#e.output),this.#e.output.destroy({texture:!1,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}const Ln=-11;class Ge extends yi{constructor(e,t){super(e,t)}}const po=(o,e)=>o.every(t=>e.currentActionPress(t,!0)!=="released"),cu=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=r?.renderProps,l=r?.output,u=(s&&et(s))?.hasBag??!1,d=po(o.actions,e),h=a===void 0||d!==a.pressed||t!==a.colourised||u!==a.hasBag,p=i!==a?.renderedInRoom;if(!h&&!p)return"no-update";const f=l===void 0?new ho(t,o.which,n,new D({pixiRenderer:n,text:"C+J",y:Ln})):l;return p&&(f.generateButtonSpriteTextures(i),f.shownOnSurface.tint=In(t,i?.color.shade==="dimmed")),u?(f.visible=!0,a?.pressed!==d&&(f.pressed=d)):f.visible=!1,{output:f,renderProps:{pressed:d,hasBag:u,colourised:t,renderedInRoom:i}}},wt=o=>{const{gameTime:e,lastDiedAt:t}=o.type==="headOverHeels"?o.state.head:o.state;return e-t<da},fo=(o,e)=>{const{head:t,heels:n,headOverHeels:r}=io(e.items);if(r!==void 0)return wt(r)?void 0:r;const s=t===void 0||wt(t)||t.state.action==="death"?void 0:Nn(t.state.position,o),i=n===void 0||wt(n)||n.state.action==="death"?void 0:Nn(n.state.position,o);return s===void 0?n:i===void 0||s<i?t:n},W={movementType:"steady"},uu=o=>ln(o)?ne[o.config.which]:ne[o.type],mo=o=>ln(o)?ne[o.config.which]:ne[o.type],ur=(o,e,t)=>{switch(t){case"opposite":return{x:e.x===0?o.x:-o.x,y:e.y===0?o.y:-o.y,z:0};case"clockwise":return{x:-o.y,y:o.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const n=Rn([-1,1]);return{x:e.x===0?n*o.y:0,y:e.y===0?n*o.x:0,z:0}}}},vi=150,fe=Object.freeze({movementType:"vel",vels:{walking:R}}),dr=C.x/2,du=({state:{position:o,vels:{walking:e}}},t,n,r)=>{const s=ne.homingBot;if(!ve(e,J))return{movementType:"steady"};for(const i of ie(io(t.items))){if(i===void 0)continue;const a=te(i.state.position,o);if(Math.abs(a.y)<dr)return{movementType:"vel",vels:{walking:{x:a.x>0?s:-s,y:0,z:0}}};if(Math.abs(a.x)<dr)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?s:-s,z:0}}}}return{movementType:"steady"}},hu=(o,e,t,n)=>{const{state:{position:r,facing:s}}=o,i=fo(r,e);if(i===void 0)return W;const a=te(i?.state.position,r),l=St[it(a)];return ve(l,s)?W:{movementType:"steady",stateDelta:{facing:l}}},pu=(o,e,t,n)=>{const{state:{position:r,standingOnItemId:s,timeOfLastDirectionChange:i,facing:a}}=o;if(s===null)return fe;const l=fo(r,e);if(l===void 0||i+vi>e.roomTime)return W;const c=te(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>C.x/4?u:Rt(u),h=mo(o),p={...R,[d]:c[d]>0?h:-h},f=Pt(p),m=!ve(f,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:f,...m?{timeOfLastDirectionChange:e.roomTime}:X}}},hr=(o,e,t,n,r=!1)=>{const{state:{position:s,standingOnItemId:i}}=o;if(i===null)return fe;const a=fo(s,e);if(a===void 0)return fe;const l=a.state.position,c=C.x*3;if(!(s.x>l.x-c&&s.x<l.x+c&&s.y>l.y-c&&s.y<l.y+c)||a.state.standingOnItemId===o.id)return fe;const d=te(a.state.position,s),h=mo(o),p=(1+Math.SQRT2)/2,f=h*p,m=B({...d,z:0},f/pa(It(d))*(r?-1:1));return{movementType:"vel",vels:{walking:m},stateDelta:{facing:m}}},Io=(o,e,t,n,r)=>{const{state:{vels:{walking:s},standingOnItemId:i}}=o;if(i===null)return fe;const{shared:{speed:a}}=Ie;if(!(Ee(s,R)?a!==0:Math.random()<n/1e3))return W;const c=Rn(r),u=St[c];return{movementType:"vel",vels:{walking:B(u,mo(o))},stateDelta:{facing:St[c]}}},fu=(o,e,t,n)=>{const{state:{facing:r,vels:{walking:s},standingOnItemId:i}}=o;return i===null?fe:ve(s,J)||!fa(s,r)?{movementType:"vel",vels:{walking:B(r,mo(o))}}:W},Gt=({movingItem:o,touchedItem:{state:{position:e},aabb:t},deltaMS:n},r)=>{const{state:{position:s,vels:{walking:i},activated:a,facing:l},aabb:c}=o;if(!a||(o.state.durationOfTouch+=n,o.state.durationOfTouch<vi))return;const u=ao(s,c,e,t);if(u.x===0&&u.y===0)return;const d=ur(i,u,r);o.state.vels.walking=d;const h=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;o.state.facing=B(ve(d,J)?ur(l,u,r):Pt(d),h),o.state.durationOfTouch=0},mu=({movingItem:o,movementVector:e})=>{e.z<0||(o.state.vels.walking=R)},gu=(o,e,t,n)=>{if(!o.state.activated||ln(o)&&o.state.busyLickingDoughnutsOffFace)return fe;switch(o.config.movement){case"patrol-randomly-diagonal":return Io(o,e,t,n,ba);case"patrol-randomly-xy8":return Io(o,e,t,n,ga);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return Io(o,e,t,n,ma);case"towards-tripped-on-axis-xy4":return du(o,e);case"towards-on-shortest-axis-xy4":return pu(o,e);case"back-forth":case"forwards":case"clockwise":return fu(o);case"turn-to-player":return hu(o,e);case"towards-analogue":return hr(o,e);case"towards-analogue-unless-planet-crowns":return hr(o,e,t,n,ha(w.getState()));default:throw o.config,new Error("this should be unreachable")}},bu=o=>{const{movingItem:e,touchedItem:t}=o;if(st(t,e))switch(e.config.movement){case"patrol-randomly-xy4":Gt(o,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Gt(o,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Gt(o,"opposite");break;case"clockwise":Gt(o,"clockwise");break;case"towards-tripped-on-axis-xy4":mu(o);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":case"forwards":return;default:throw e.config,new Error("this should be unreachable")}};function yu(o){const e=o.movingItem.type==="monster"?o.movingItem:o.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const xi=(o,e,t)=>{ya(o);for(const n of t){if(n.movementType==="position"&&cn(o,n.posDelta),n.movementType==="vel"&&(Ue(e)||Mt("lift")(e)))for(const[s,i]of bs(n.vels))e.state.vels[s]=i;const r=n.stateDelta;r!==void 0&&Object.assign(e.state,r)}return o},dt=({config:{activatedOnStoreValue:o}})=>o===void 0?!0:!!va(w.getState().gameMenus.gameInPlay,o),vu=(o,e,t,n)=>{const{type:r,state:{teleporting:s,standingOnItemId:i}}=o,{inputStateTracker:a}=t,c=r===t.currentCharacterName?a.currentActionPress("jump"):"released",u=i===null?null:e.items[i],d=u!==null&&ys(u)&&dt(u);if(s===null)return c!=="released"&&d?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:u.state.toRoom,timeRemaining:oo}}}:W;const h=Math.max(s.timeRemaining-n,0);switch(s.phase){case"out":if(!d)return{movementType:"steady",stateDelta:{teleporting:null}};if(h===0)return un({changeType:"teleport",sourceItem:u,playableItem:o,gameState:t,toRoomId:s.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:oo}}};break;case"in":if(h===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...s,timeRemaining:h}}}},$t=o=>{const e=o-xa,n=e/wa*an;return(e+.5*Uo*n**2)/n},xu={head:$t(Lt.head),headOnSpring:$t(Lt.head+C.z),heels:$t(Lt.heels),heelsOnSpring:$t(Lt.heels+C.z)},pr=(o,e,t)=>{const n=o.type==="headOverHeels"||o.type==="heels"&&t?"head":o.type;return xu[`${n}${e?"OnSpring":""}`]},wu=o=>!(o===null||ys(o)&&dt(o)||Sa(o)&&o.config.gives==="scroll"||oe(o)&&o.state.standingOnItemId===null),Cu=o=>o.state.jumped&&o.state.position.z===o.state.jumpStartZ&&o.state.jumpStartTime+Ca>(o.type==="headOverHeels"?o.state.head.gameTime:o.state.gameTime),wi=(o,e,t)=>{const{state:{standingOnItemId:n}}=o,{inputStateTracker:r}=t,s=dn(e,o.state),i=s===null?null:e.items[s];if(Cu(o))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:pr(o,!1,o.type==="heels"&&o.state.isBigJump)}},stateDelta:{}};const a=o.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&wu(i);if(!n&&a&&console.log("coyote jump"),!a)return n!==null?{movementType:"steady",stateDelta:{jumped:!1,...o.type==="heels"?{isBigJump:!1}:{}}}:W;const l=o.type==="heels"&&o.state.bigJumps>0,c=vs(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:pr(o,c,l)}},stateDelta:{action:"moving",jumped:!0,...o.type==="heels"?l?{bigJumps:o.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:o.state.position.z,jumpStartTime:o.type==="headOverHeels"?o.state.head.gameTime:o.state.gameTime}}},Su=({vel:o,acc:e,unitD:t,maxSpeed:n,deltaMS:r,minSpeed:s=0})=>{const i=Le(o),a=Math.max(s,Math.min(n,i+e*r)),l=Math.min(a,n);return B(t,l)},Tu={movementType:"vel",vels:{walking:R}},Ci=(o,e,t,n)=>{const r=ku(o,e,t,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Le(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:o.state.walkDistance+i*n},o.type==="head"&&o.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:o.state.gameWalkDistance+i*n})}o.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Ee(r.vels.walking,R)&&(r.stateDelta={...r.stateDelta,walkStartFacing:o.state.facing});const s=It(o.state.vels.walking);return r.movementType==="vel"&&ve(J,r.vels.walking??J)&&s>0&&(r.stateDelta={...r.stateDelta,stoppedWalkingAtGameTime:t.gameTime,stoppedWalkingSpeed:s}),r},ku=(o,e,{inputStateTracker:t,currentCharacterName:n,gameTime:r},s)=>{const{type:i,state:{action:a,autoWalk:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,stoppedWalkingAtGameTime:p,stoppedWalkingSpeed:f,vels:{walking:m,gravity:v}}}=o,x=dn(e,o.state),P=n===o.id,I=P?t.currentActionPress("jump"):"released",T=P?t.directionVector:R,M=x===null&&v.z<0,z=i==="head"&&_n(o.state)>0&&x!==null,L=i==="headOverHeels"?M?"head":"heels":z?"heels":i,_=l?c:T,le=(x===null?Ta:ne)[L];if(u!==null||a==="death")return Tu;if(i==="heels"){if(x===null)return o.state.jumped?{movementType:"vel",vels:{walking:Bt(m,B(m,ka*s))},stateDelta:{action:M?"falling":"jumping"}}:{movementType:"vel",vels:{walking:R},stateDelta:{action:"falling"}};if(I!=="released"){const Ve=Pt(ve(_,J)?c:_),zt=vs(At(x,e))?1:Ra;return{movementType:"vel",vels:{walking:B({...Ve,z:0},le*zt)},stateDelta:{facing:Ve}}}}if(Le(_)!==0)return M?{movementType:"vel",vels:{walking:B({..._,z:0},le)},stateDelta:{facing:_,action:"falling"}}:It(m)<re&&(p??xe)+Ia>r&&(f??0)>re?(console.log("keep speed grace"),{movementType:"vel",vels:{walking:B(_,f)},stateDelta:{facing:_,action:"moving"}}):{movementType:"vel",vels:{walking:Su({vel:m,acc:Pa[L],deltaMS:s,maxSpeed:le,unitD:_,minSpeed:0})},stateDelta:{facing:_,action:"moving"}};if(d>0&&d<1){const Ve=Ee(h,c)?1:0;return{movementType:"position",posDelta:B(c,Ve-d),stateDelta:{action:M?"falling":"idle",walkDistance:0,facing:c}}}return{movementType:"vel",vels:{walking:R},stateDelta:{action:M?"falling":"idle"}}},Te=(o,...e)=>Mt(...e)(o.touchedItem),pt=(o,...e)=>Mt(...e)(o.movingItem),Si=o=>oe(o.movingItem),Iu=o=>oe(o.touchedItem),Ru=o=>hn(o.touchedItem),fr=o=>Ue(o.movingItem)&&xs(o.movingItem,o.touchedItem,Math.abs(o.movementVector.z)),Pu={x:0,y:0,z:0},mr=o=>{if(o.touchedItem.type==="firedDoughnut"&&(o.movingItem.type==="head"||o.movingItem.type==="headOverHeels"||o.movingItem.type==="firedDoughnut"))return;const{touchedItem:{state:{disappearing:e}}}=o;if(e!==null&&(e.byType===void 0||e.byType.includes(o.movingItem.type))&&(e.on==="touch"||e.on==="stand"&&fr(o))){if(fr(o)&&Si(o)&&o.movementVector.z<0){no(o.movingItem,o.room),pn({above:o.movingItem,below:o.touchedItem});const n=[wi(o.movingItem,o.room,o.gameState,o.deltaMS),Ci(o.movingItem,o.room,o.gameState,o.deltaMS)];xi(Pu,o.movingItem,n)}ws(o)}},Mu=2*Ma,Ti=(o,e,t,n,r=Mu)=>{const s={endAtRoomTime:e.roomTime+n+r,startAtRoomTime:e.roomTime+r,velocity:B(t,1/n)};o.state.latentMovement.push(s)},Bu=(o,e,t,n)=>{for(const r of o){const s=t[r.id];if(s===void 0)continue;const a={...Bt(r.state.position,s),z:0};if(!Ee(a,R))for(const l of we(r.state.stoodOnBy,e))Ti(l,e,a,n)}},Au=({movingItem:o,room:e,touchedItem:t,deltaMS:n})=>{const{state:{position:r,controls:s},aabb:i}=t,a=ao(o.state.position,o.aabb,r,i);if(a.x===0&&a.y===0){t.state.lastPushDirection=void 0;return}const l=Pt(a);t.state.lastPushDirection=it(Cs(l,-1));for(const c of s){const u=e.items[c];if(u===void 0)continue;const{roomTime:d}=e;if(u.state.controlledWithJoystickAtRoomTime===d||c===void 0)continue;const h=B(l,-ne.charles*n);u.state.facing=h,u.state.controlledWithJoystickAtRoomTime=d,Ba(t,u,e),Ti(u,e,h,n,1)}},Ou=o=>{const{movingItem:e,touchedItem:t,movementVector:n}=o;if(!st(e))return;const{state:{position:r},aabb:s}=t,i=ao(e.state.position,e.aabb,r,s),a=Aa(e.state.position,e.aabb,r,s,n);a.z=0;const l=Jt(a);l<re||fn(i,a)/l<.44||(Oa(a),_a(a,-ne.ball),t.state.vels.sliding=a)},_u=o=>{const{movingItem:e,touchedItem:t}=o;if(!st(t))return;const n=e.state.vels.sliding;if(Ee(n,R))return;const{state:{position:r},aabb:s}=e,i=ao(t.state.position,t.aabb,r,s);fn(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=R)},Du=o=>o==="left"?"right":"left",Fu=(o,e)=>{if(o.expectType==="switch"&&"flip"in o)return{};if(o.expectType==="block"&&"makesStable"in o){const{makesStable:t}=o;return e===(t?"left":"right")?{disappearing:null}:{disappearing:{on:"stand"}}}if((o.expectType==="monster"||o.expectType==="movingPlatform")&&"activates"in o){const{activates:t}=o;return e===(t?"left":"right")?{activated:!0,everActivated:!0}:{activated:!1}}if(o.expectType==="monster"&&"switchedDirection"in o&&o.switchedDirection!==void 0){const{switchedDirection:t}=o,n=St[t];return{facing:e==="left"?n:B(n,-1)}}return o[`${e}State`]},Qo=(o,e,t,n,r=new Set)=>{r.add(t);for(const s of o)for(const i of q(n.items)){const{targets:a}=s;if(i.type!==s.expectType||!i.jsonItemId||a!==void 0&&!a.includes(i.jsonItemId)||i===void 0||r.has(i))continue;const l=i;l.state={...i.state,...Fu(s,e),switchedAtRoomTime:n.roomTime,switchedSetting:e},r.add(i),i.type==="switch"&&ki(i,n,r)}},zu=(o,e,t)=>{const n=Du(o.state.setting);o.state.setting=n;const r=o.config.modifies;Qo(r,n,o,e,t)},Lu=o=>o.config.type==="in-room",ki=(o,e,t)=>{if(Lu(o))zu(o,e,t);else{const n=o.config;w.dispatch(Fa({path:n.path}))}},Eu=({touchedItem:o,room:e})=>{const t=o.state.lastToggledAtRoomTime??xe,{roomTime:n}=e;o.state.lastToggledAtRoomTime=n,!(t+Da>n)&&ki(o,e)};function Ii({room:{roomTime:o},movingItem:e}){e.state.action!=="death"&&(On(e)||wt(e)||(e.state.action="death",e.state.expires=o+oo))}const Uu=3e3,Ri=o=>{const{gameState:e,movingItem:t,touchedItem:n,room:r}=o,{id:s,config:i}=n,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[s]===!0)return;const d=()=>{l[s]&&(u[a]===void 0&&(u[a]={}),u[a][s]=!0)},h=p=>{const f=Ss(n);return{type:"floatingText",id:`floatingText-${s}`,...gn,fixedZIndex:Va,aabb:R,state:{...mn(),position:Z(f,{z:C.z/2}),expires:c+Uu},config:{textLines:p,appearanceRoomTime:c}}};switch(i.gives){case"hooter":{const p=qt(t);if(p===void 0)return;p.hasHooter=!0,F({room:r,item:h(["hooter","collected"])}),d();break}case"doughnuts":{const p=qt(t);if(p===void 0)return;p.doughnuts=ue(p.doughnuts,6),F({room:r,item:h(["+6","doughnuts"])}),d();break}case"bag":{const p=et(t);if(p===void 0)return;p.hasBag=!0,F({room:r,item:h(["bag","collected"])}),d();break}case"shield":{t.type==="headOverHeels"?(t.state.head.shieldCollectedAt=t.state.head.gameTime,t.state.heels.shieldCollectedAt=t.state.heels.gameTime):t.state.shieldCollectedAt=t.state.gameTime,F({room:r,item:h(["🛡","shield"])}),d();break}case"fast":{const p=qt(t);if(p===void 0)return;p.fastStepsStartedAtDistance=p.gameWalkDistance,F({room:r,item:h(["⚡","fast steps"])}),d();break}case"jumps":{const p=et(t);if(p===void 0)return;p.bigJumps+=10,F({room:r,item:h(["♨","10","big jumps"])}),d();break}case"extra-life":t.type==="headOverHeels"?(t.state.head.lives=ue(t.state.head.lives,2),t.state.heels.lives=ue(t.state.heels.lives,2),F({room:r,item:h(["+2","lives","each"])})):(t.state.lives=ue(t.state.lives,2),F({room:r,item:h(["+2","lives"])})),d();break;case"scroll":w.dispatch(Ua(i)),d();break;case"reincarnation":{d();const p=La(e,w.getState(),{characterPickingUp:t.type,pickupId:s});for(const f of Object.values(p.gameState.characterRooms))if(f.id===r.id){const m=h(["reincarnation","point","restored"]);f.items[m.id]=m}w.dispatch(Ea(p)),F({room:r,item:h(["reincarnation","point","saved"])});break}case"crown":{w.dispatch(za(i.planet)),F({room:r,item:h([i.planet,"liberated!"])}),d();break}}},Vu=({gameState:o,room:e,movingItem:t,touchedItem:n,movementVector:r})=>{const{config:{toRoom:s,direction:i}}=n;fn(i,r)<=0||t.state.action!=="death"&&(s===Ts?(delete o.characterRooms[t.type],bn({room:e,item:t}),t.type==="headOverHeels"?(w.dispatch(wo("head")),w.dispatch(wo("heels")),w.dispatch(Vo({offerReincarnation:!1}))):(w.dispatch(wo(t.type)),ro(t.type)in o.characterRooms?o.currentCharacterName=ro(t.type):w.dispatch(Vo({offerReincarnation:!1})))):un({playableItem:t,gameState:o,toRoomId:s,sourceItem:n,changeType:"portal"}))},Gu=Mt("floor","doorLegs","doorFrame","portal"),gr=o=>{switch(!0){case Ru(o):Ii(o);break;case Te(o,"portal"):Vu(o);break;case Te(o,"pickup"):Ri(o);break}Gu(o.touchedItem)||(o.movingItem.state.autoWalk=!1)},Pi=o=>{Si(o)&&gr(o),Iu(o)&&gr({...o,movingItem:o.touchedItem,touchedItem:o.movingItem}),Te(o,...jn)&&Ou(o),pt(o,...jn)&&_u(o),(pt(o,"monster")&&Te(o,"firedDoughnut")||pt(o,"firedDoughnut")&&Te(o,"monster"))&&yu(o),(pt(o,"monster")||pt(o,"movingPlatform"))&&bu(o),Te(o,"switch")&&Eu(o),Te(o,"joystick")&&Au(o),o.touchedItem.state.disappearing&&mr(o),o.movingItem.state.disappearing&&st(o.touchedItem,o.movingItem)&&mr({...o,movingItem:o.touchedItem,touchedItem:o.movingItem})},Mi=350,$u=(o,e,t,n)=>{const r=o.type==="heels"?o.state:o.state.heels,{carrying:s}=r;if(s===null)return;const{inputStateTracker:i}=t;if(!(i.currentActionPress("carry")!=="released")||o.state.standingOnItemId===null||!Bi(o,e[yn]))return;const{state:{position:c}}=o;F({room:e,item:s,atPosition:c}),no(o,e),r.carrying=null,ks({subjectItem:o,gameState:t,room:e,posDelta:{x:0,y:0,z:s.aabb.z},forceful:!0,deltaMS:n,onTouch:Pi,visited:new Set().add(o.id)}),pn({above:o,below:s}),i.inputWasHandled("carry",Mi)},Bi=(o,e)=>{const t={state:{position:Z(o.state.position,{z:C.z})},aabb:o.aabb,id:"item.id-proposedPutdownLocation"},n=Is(t,e,r=>st(r,o)&&r!==o);for(const r of n){if(!Ue(r))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with non-free",r),!1;if(!Bi(r,e))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Hu=(o,e,t)=>{const{inputStateTracker:n}=t,r=o.type==="heels"?o.state:o.state.heels,{carrying:s,hasBag:i}=r;if(!i)return;const a=q(e.items).filter(vn),l=s===null?Ai(o,e):void 0;for(const d of a)d.state.wouldPickUpNext=!1;l!==void 0&&(l.state.wouldPickUpNext=!0),n.currentActionPress("carry")!=="released"&&l!==void 0&&(Nu(e,r,l),n.inputWasHandled("carry",Mi))},Nu=(o,e,t)=>{e.carrying=t,t.state.wouldPickUpNext=!1,bn({room:o,item:t})},Ai=(o,e)=>{const t=On(o),n=l=>vn(l)&&(t||!hn(l)),r=q(e.items).filter(n),s=Rs(o,r);if(s)return s;const i=dn(e,o.state),a=i&&e.items[i];if(a&&n(a))return a},ju=(o,e,t)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&o?`block.organic.dark${t?".disappearing":""}`:`block.${e}${t?".disappearing":""}`,Xu=({renderContext:{general:{pixiRenderer:o,colourised:e},item:{config:{style:t,times:n},state:{disappearing:r}},room:s},currentRendering:i})=>{const a=i?.renderProps,l=r!==null;return a===void 0||a.isDissapearing!==l?{output:ut(o,b({textureId:ju(s.color.shade==="dimmed",t,l),times:n,spritesheetVariant:e?"for-current-room":"uncolourised"})),renderProps:{isDissapearing:l}}:"no-update"},Wu=({renderContext:{item:{state:{pressed:o}},general:{colourised:e}},currentRendering:t})=>{const n=t?.renderProps;return n===void 0||o!==n.pressed?{output:b({textureId:o?"buttonInGame.pressed":"buttonInGame",spritesheetVariant:e?"for-current-room":"uncolourised"}),renderProps:{pressed:o}}:"no-update"},Ye=({top:o,bottom:e})=>{const t=new y,n=b(e);t.addChild(n);const r=b(o);return r.y=-12,t.addChild(r),t[go]=r,t[En]=n,t},go=Symbol(),En=Symbol(),Yu=({top:o,bottom:e})=>{const t=new y;return t.addChild(e),o.y=-C.z,t.addChild(o),t[go]=o,t[En]=e,t},Ju=({renderContext:{item:{state:{facing:o,actedOnAt:{roomTime:e,by:t}}},room:{roomTime:n,items:r},general:{colourised:s}},currentRendering:i})=>{const a=i?.renderProps,l=it(o)??"towards",c=n===e&&ye(xn(t)).some(h=>Ps(r[h]));if(!(a===void 0||l!==a.facingXy4||c!==a.controlledByJoystick))return"no-update";const d=s?"for-current-room":"uncolourised";return{output:Ye({top:{textureId:`charles.${l}`,spritesheetVariant:d},bottom:{textureId:c?"headlessBase.all":"headlessBase",spritesheetVariant:d}}),renderProps:{facingXy4:l,controlledByJoystick:c}}},Dt=o=>{for(const e in o)return!0;return!1},Ft=o=>o,br=250,qu=De.animations["conveyor.x"].animationSpeed,yr=De.animations["conveyor.x"].length,Zu=o=>1-(1-o)**2,Qu=3,Ku=(o,e)=>{for(let t=0;t<o.children.length;t++){const n=o.children[t],r=t*Qu%yr;n.gotoAndStop(e?yr-r-1:r)}},ed=(o,e,t)=>{const n=tt(o),r=b({animationId:`conveyor.${n}`,reverse:o==="towards"||o==="right",times:e,spritesheetVariant:t}),s=r instanceof ae?new y({children:[r]}):r;return Ku(s,o==="towards"||o==="right"),s},td=({renderContext:{item:{config:{times:o},state:{stoodOnBy:e,direction:t}},room:{roomTime:n},general:{colourised:r,pixiRenderer:s}},currentRendering:i})=>{const a=i?.renderProps,l=Dt(e),c=!l&&(a?.moving??!1),u=c?n:a?.roomTimeStoppedMoving??xe,d=l?0:Math.min(n-u,br),h=i?.output,p=!h||t!==a?.direction,m=p?Fn(s,ed(t,o,r?"for-current-room":"uncolourised"),"conveyor.x"):h,v=Math.max(0,1-d/br);if(v===0)m.stop();else{const x=qu*Zu(v);m.play(),m.animationSpeed=x}return p||c||l!==a?.moving?{output:m,renderProps:{moving:l,roomTimeStoppedMoving:u,direction:t}}:"no-update"},od=Ft(td);function Oi(o,e){const t=e||new y;for(const n of o)t.addChild(n);return t}const bo=(o,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return b({...o,times:t})},$e=o=>G(({renderContext:{item:e,general:{colourised:t}}})=>wn(e)?b({...typeof o=="string"?{textureId:o}:o,times:lo(e),spritesheetVariant:t?"for-current-room":"uncolourised"}):b({...typeof o=="string"?{textureId:o}:o,spritesheetVariant:t?"for-current-room":"uncolourised"})),nd=o=>G(({renderContext:{item:e,general:{paused:t,colourised:n}}})=>wn(e)?b({...o,times:lo(e),paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"}):b({...o,paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"})),Q=o=>G(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(wn(e))return ut(t,bo(o,lo(e)));{const n=b(o);return n instanceof N?n:se(t,n)}}),G=o=>(({renderContext:e,currentRendering:t,tickContext:n})=>t===void 0?{output:o({renderContext:e,currentRendering:void 0,tickContext:n}),renderProps:X}:"no-update"),he=o=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:n})=>{if(n===void 0){const r=lo(t),s={output:ut(e,bo(o(t.config),r)),renderProps:X};return r&&(s.output.y-=((r.z??1)-1)*C.z),s}else return"no-update"}),rd=(o,e,t)=>{const r=me().textures[`door.frame.${o.planet}.${e}.near`]!==void 0?o.planet:"generic",s=o.color.shade==="dimmed"&&me().textures[`door.frame.${r}.dark.${e}.${t}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${t}`};function*sd({config:{direction:o,inHiddenWall:e,height:t}},n){const r=Cn(o),s=r==="y"?1:16;function*i(a){if(e)t!==0&&(yield b({textureId:`generic.door.floatingThreshold.${r}`,...Ze(a,{y:-C.z*t}),spritesheetVariant:n}));else{yield b({pivot:{x:s,y:9},textureId:`generic.door.legs.base.${r}`,...Ze(a,{}),spritesheetVariant:n});for(let l=1;l<t;l++)yield b({pivot:{x:s,y:9},textureId:`generic.door.legs.pillar.${r}`,...Ze(a,{y:-l*C.z}),spritesheetVariant:n})}}yield*i(ze({...J,[r]:1})),yield*i(J),e||(yield b({pivot:{x:16,y:C.z*t+13},textureId:`generic.door.legs.threshold.double.${r}`,...ze({...J,[r]:1}),spritesheetVariant:n}))}const _i=(o,e)=>{const t=Cn(o),n=Rt(t),r=8;return o==="towards"||o==="right"?k({[n]:e[n]-r}):J},id=G(({renderContext:{item:o,general:{pixiRenderer:e,colourised:t}}})=>{const r=Oi(sd(o,t?"for-current-room":"uncolourised")),s=se(e,r),i=_i(o.config.direction,o.aabb);return s.x=i.x,s.y=i.y,s}),ad=G(({renderContext:{item:{config:{direction:o,part:e,toRoom:t},aabb:n},room:r,general:{pixiRenderer:s,colourised:i}}})=>{const a=Ga(w.getState())??w.getState().levelEditor?.campaignInProgress,l=Cn(o),c=a?.rooms[t]??r,u=new Qe({paletteSwaps:V(c.color.hue,r.color.shade==="dimmed",r.planet==="moonbase"?"light-mid":"light-dark"),lutType:"sparse"}),{x:d,y:h}=_i(o,n),p=b({textureId:rd(r,l,e),x:d,y:h,spritesheetVariant:i?"for-current-room":"uncolourised"});p.filters=u;const f=new y({children:[p]}),m=se(s,f);return f.destroy({children:!0}),u.destroy({destroyLutTexture:!0,destroyMask:!0}),e==="top"&&(m.y=.5),m}),ld=ne.floatingText,vr=12,xr=C.z*3,wr=[g.shadow,g.redShadow,g.midGrey,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],Cr=[...wr,...new Array(20).fill(g.white),...wr.toReversed()],cd=({renderContext:{item:{config:{textLines:o,appearanceRoomTime:e}},room:{roomTime:t},general:{displaySettings:{uncolourised:n},pixiRenderer:r},frontLayer:s},currentRendering:i})=>{const a=i?.output;let l;const u=(t-e)*ld;if(a===void 0){l=new y,s?.attach(l);for(let h=0;h<o.length;h++){const p=o[h],f=new D({pixiRenderer:r,y:h*vr,outline:!0,text:p.toUpperCase()});l.addChild(f)}}else l=a;let d=!1;for(let h=0;h<o.length;h++){const p=l.children[h],f=u+h*-vr,m=f>0&&f<xr;if(p.visible=m,d||=m,m&&!n){const v=Math.floor(f/xr*Cr.length);p.tint=Cr[v]}}return l.visible=d,l.y=-u,{output:l,renderProps:X}},Sr=(o,e)=>e===0?o:Math.round(o/e)*e,Tr=o=>o-Math.floor(o),ud=(o,e,t,n)=>o<=n&&t<=e;var dd=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;uniform vec4 uTintColour;vec4 transparent=vec4(0.0,0.0,0.0,0.0);vec4 black=vec4(0.0,0.0,0.0,1.0);void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float fgIsTransparent=step(fg.a,0.001f);float bgIsBlack=step(length(bg),0.001f);finalColor=mix(mix(uTintColour,black,bgIsBlack),transparent,fgIsTransparent);}`;const hd=U.from({vertex:be,fragment:dd,name:"colour-clash-filter"});class kr extends E{constructor(e){super({glProgram:hd,resources:{uBackTexture:H.EMPTY,colourClashUniforms:{uTintColour:{value:e,type:"vec4<f32>"}}},blendRequired:!0})}}const pd=({state:{position:o}},e,t)=>{const n=s=>s.config.direction==="away"||s.config.direction==="left";return Oi(q(e.items).filter(s=>s.type==="wall"||s.type==="doorLegs").filter(n).map(s=>{const{id:i,config:{direction:a},state:{position:l}}=s;return b({textureId:"floorOverdraw.cornerNearWall",label:i,...k(Bt(l,o)),times:s.type==="wall"?$a(s.config):{[Rt(tt(a))]:2},anchor:{x:0,y:1},flipX:a==="away",spritesheetVariant:t?"for-current-room":"uncolourised"})}),new y({label:"floorOverdraws"}))},fd=(o,e)=>{const{config:{naturalFootprint:{aabb:t,position:n}},state:{position:r}}=e,s=Zt(te(R,r)),{left:i,right:a}=q(o.items).filter(Na).filter(l=>{const{state:{position:c},aabb:u}=l,d=l.config.direction,h=tt(d),p=Rt(h),f=d==="away"||d==="left",m=n[h]+(f?1:0)*t[h],v=c[h]+(f?0:1)*u[h];return m!==v?!1:ud(c[p],c[p]+u[p],n[p],n[p]+t[p])}).reduce((l,{aabb:c,renderAabb:u,renderAabbOffset:d,state:{position:h},fixedZIndex:p})=>{const f=p===ja,m=f?c:u??c,v=Z(h,d??R),x=Zt(Z(v,{x:m.x,y:f?m.y:0}))+s,P=Zt(Z(v,{x:f?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,x),right:Math.max(l.right,P)}},{left:9999,right:-9999});if(a>i)return new ee().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},Ir=({direction:o,times:e,position:t,colourised:n})=>b({label:`floorEdge(${o})`,textureId:`floorEdge.${o}`,times:e,...k(t),spritesheetVariant:n?"for-current-room":"uncolourised"}),md=({room:o,xSize:e,ySize:t,y:n})=>{const r=new y({label:"floorColourClash"}),s=ir(o,"right"),i=new y({label:"floorColourClash.right",filters:[new kr(s)]});for(let c=0;c<=t;c++){const u=ze({x:0,y:c,z:0}),d=new ee().rect(u.x-(c===0?0:8),u.y,24,8).fill(s);i.addChild(d)}r.addChild(i);const a=ir(o,"towards"),l=new y({label:"floorColourClash.towards",filters:[new kr(a)]});for(let c=0;c<=e;c++){const u=ze({x:c,y:0,z:0}),d=new ee().rect(u.x-16,u.y,8*(c===0?2:3),8).fill(a);l.addChild(d)}return r.addChild(l),r.y=n,r},gd=G(({renderContext:{room:o,item:e,general:{colourised:t,pixiRenderer:n},colourClashLayer:r,frontLayer:s}})=>{const{color:{shade:i}}=o,{config:a,state:{position:l},aabb:c}=e,{floorType:u,naturalFootprint:d}=a,h=new y({label:"floorAppearance"}),p=new y({label:"sprites"}),f=k({...c,y:0}),m=k({...c,x:0,y:0}),v=k({...c,x:0}),x=k(c),P=new ge({color:t?eo("pureBlack"):Ha.black,width:1});if(u!=="none"){const I=new y({label:"tiles"}),T=u==="deadly"?`generic${i==="dimmed"?".dark":""}.floor.deadly`:`${a.scenery}${i==="dimmed"?".dark":""}.floor`,M=de(t?"for-current-room":"uncolourised").textures[T];try{ms(T)}catch(Zi){throw new Error(`no floor textureId for floorType: ${u}, shade: ${i}`,{cause:Zi})}const z=te(d.position,l),L={x:Tr(z.x/C.x),y:Tr(z.y/C.x)},_=8,le={x:f.x,y:x.y-_,width:v.x-f.x,height:m.y-x.y+2*_},Vn=te(ze(Ze(L,{x:.5,y:.5})),{y:c.z},le),Ve=new bc({texture:M,tilePosition:Vn,...le});I.addChild(Ve),I.addChild(pd(e,o,t));const yo=new ee().moveTo(x.x,x.y).lineTo(v.x,v.y).lineTo(v.x,v.y+3).lineTo(m.x,m.y+3).lineTo(f.x,f.y+3).lineTo(f.x,f.y).fill({color:16711680,alpha:1}),zt=se(n,yo);yo.destroy(),I.addChild(zt),I.mask=zt;const Gn=new y({children:[I]});Gn.filters=P,p.addChild(Gn)}{const I=new y({label:"edges"});if(u==="none"){const L=new ee().moveTo(v.x,v.y+10).lineTo(v.x,v.y+100).lineTo(f.x,f.y+100).lineTo(f.x,f.y+10).lineTo(m.x,m.y+10).fill(0),_=se(n,L);h.addChild(_),s.attach(_),L.destroy()}const T=Math.ceil(c.y/C.x);I.addChild(Ir({direction:"right",times:{y:T},position:{z:c.z},colourised:t}));const M=Math.ceil(c.x/C.x);I.addChild(Ir({direction:"towards",times:{x:M},position:{z:c.z},colourised:t})),p.addChild(I);const z=fd(o,e);if(z!==void 0){const L=se(n,z);p.addChild(L),p.mask=L,z.destroy()}if(h.addChild(se(n,p)),p.destroy({children:!0}),P.destroy(!1),!t){const L=md({xSize:M,ySize:T,y:-c.z+1,room:o});h.addChild(L),r.attach(L)}}return h}),bd=o=>{const e=new y({label:"joystick"});return e.addChild(b({textureId:"joystick.stick",spritesheetVariant:o})),e.addChild(b({textureId:"joystick.ball",spritesheetVariant:o})),e},yd=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,J]]),vd=({renderContext:{item:{state:{actedOnAt:o,lastPushDirection:e}},room:{roomTime:t},general:{colourised:n}},currentRendering:r})=>{const s=r?.renderProps,i=t===o.roomTime?e:void 0,a=s?.pushDirection;if(!(s===void 0||i!==a))return"no-update";const c=r?.output??bd(n?"for-current-room":"uncolourised"),u=c.getChildAt(1),d=yd.get(i);return u.x=d?.x??0,u.y=d?.y??0,{output:c,renderProps:{pushDirection:i}}},xd=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle","homingBot"],Rr=(o,e,t,n)=>{const r=hs(n);return Math.sin((o+r*2e4)/e)*t},wd=50,Cd=200,Sd=.25,Td=1,Pr=({id:o,config:{which:e},state:t},n,r)=>{const s=e==="emperorsGuardian"||e==="helicopterBug",i=e==="cyberman"||e==="bubbleRobot"||e==="computerBot"||e==="emperorsGuardian";if((i||e==="helicopterBug")&&t.activated||s){const l=e==="computerBot"||e==="helicopterBug",c=l?wd:Cd,u=l?Sd:Td;if(i){const d=r;d[go].y=-C.z+Rr(n.roomTime,c,u,o)}else r.y=Rr(n.roomTime,c,u,o)}},kd=({renderContext:{item:o,room:e,general:{paused:t,colourised:n}},currentRendering:r})=>{const{config:s,state:i,id:a}=o,l=r?.renderProps,{activated:c,busyLickingDoughnutsOffFace:u}=i,d=n?u?"doughnutted":!c&&xd.includes(s.which)?"deactivated":"for-current-room":"uncolourised";switch(s.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const h=it(i.facing)??"towards";if(!(l===void 0||c!==l.activated||u!==l.busyLickingDoughnutsOffFace||h!==l.facingXy4))return Pr(o,e,r.output),"no-update";const f={facingXy4:h,activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"skiHead":return{output:b({textureId:`${s.which}.${s.style}.${h}`,spritesheetVariant:d}),renderProps:f};case"elephantHead":return{output:b({textureId:`elephant.${h}`,spritesheetVariant:d}),renderProps:f};case"turtle":return{output:b(c&&!u?{animationId:`${s.which}.${h}`,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.${h}.1`,spritesheetVariant:d}),renderProps:f};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ye({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"bubbles.jetpack",paused:t,spritesheetVariant:d}}):b({textureId:`${s.which}.${h}`,spritesheetVariant:d}),renderProps:f};case"computerBot":case"elephant":case"monkey":return{output:Ye({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"headlessBase.flash",playOnce:"and-stop",spritesheetVariant:d}}),renderProps:f};default:throw new Error(`unexpected monster ${s}`)}break}case"homingBot":{const h=!ve(i.vels.walking,J);return l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated||h!==l.walking?{spritesheetVariant:d,output:b(c&&!u?{animationId:h?"headlessBase.flash":"headlessBase.scan",spritesheetVariant:d}:{textureId:"headlessBase",spritesheetVariant:d}),renderProps:{activated:c,busyLickingDoughnutsOffFace:u,walking:h}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated))return Pr(o,e,r.output),"no-update";const p={activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"helicopterBug":case"dalek":return{output:b(c&&!u?{animationId:s.which==="dalek"&&e.color.shade==="dimmed"&&(e.planet==="blacktooth"||e.planet==="egyptus"||e.planet==="moonbase")?"dalek.dark":s.which,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.1`,spritesheetVariant:d}),renderProps:p};case"bubbleRobot":return{output:Ye({top:{animationId:"bubbles.blueGreen",randomiseStartFrame:a,paused:t,spritesheetVariant:d},bottom:{textureId:"headlessBase",spritesheetVariant:d}}),renderProps:p};case"emperorsGuardian":return{output:Ye({top:{textureId:"ball",spritesheetVariant:d},bottom:{animationId:"bubbles.cold",spritesheetVariant:d,paused:t}}),renderProps:p};case"emperor":return{output:b({animationId:"bubbles.cold",spritesheetVariant:d,paused:t}),renderProps:p};default:throw new Error(`unexpected monster ${s}`)}break}default:throw new Error(`unexpected monster ${s}`)}};var Id=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const Rd=U.from({vertex:be,fragment:Id,name:"oneColour-filter"});class Ko extends E{constructor(e){super({glProgram:Rd,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[n,r,s]=e.toArray();t.uColour[0]=n,t.uColour[1]=r,t.uColour[2]=s}}const en=.02,Pd=({name:o,action:e,facingXy8:t,teleportingPhase:n,gravityZ:r,paused:s,spritesheetVariant:i})=>{if(e==="death")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(n==="out")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(n==="in")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(e==="moving")return{animationId:`${o}.walking.${t}`,paused:s,spritesheetVariant:i};if(e==="jumping")return{textureId:r<en?`${o}.walking.${t}.2`:`${o}.walking.${t}.1`,spritesheetVariant:i};if(e==="falling"){const l=`${o}.falling.${t}`;if(Ms(l))return{textureId:l,spritesheetVariant:i}}const a=`${o}.idle.${t}`;return Sn(a)?{animationId:a,paused:s,spritesheetVariant:i}:{textureId:`${o}.walking.${t}.2`,spritesheetVariant:i}},tn=Symbol(),Di=Symbol(),Md=(o,e)=>{o[tn].removeChildren(),o[tn].addChild(b(Pd(e)))},Ro=(o,e,t,n,r)=>{const s=new y,i=new y;s[tn]=i,s.addChild(i);const a=b({animationId:e?`shine.${o}InSymbio`:`shine.${o}`,paused:t,flipX:o==="heels",spritesheetVariant:n?"for-current-room":"uncolourised"});s.addChild(a),s[Di]=a,s.filters=[new ge({color:r?Y(r):eo(jo[o])}),new ge({color:r?Y(r):eo("midRed")}),new Ko(r?Y(r):eo(jo[o]))];for(const l of s.filters)l.enabled=!1;return s},Mr=({gameTime:o,switchedToAt:e},t,n)=>(t==="headOverHeels"||t===n)&&e+Wa>o,Bd=o=>{if(!wt(o))return!1;const{gameTime:e,lastDiedAt:t}=o.type==="headOverHeels"?o.state.head:o.state;return(e-t)%Xn<Xn*Ya},Ad=({highlighted:o,flashing:e,shining:t},n)=>{const[r,s,i]=n.filters;r.enabled=o,s.enabled=!o&&t,i.enabled=e},Od=(o,e)=>{o[Di].visible=e},Po=(o,e,t,n,r,s)=>{t&&Md(e,{name:o,...n,paused:r,spritesheetVariant:s}),Ad(n,e),Od(e,n.shining)},_d=({renderContext:{item:o,general:{gameState:e,paused:t,colourised:n},room:r},currentRendering:s})=>{const{type:i,state:{action:a,facing:l,visualFacingVector:c,teleporting:u,vels:{gravity:{z:d}}}}=o,h=s?.renderProps,p=s?.output,f=co(c??l)??"towards",m=e!==void 0&&(o.type==="headOverHeels"?Mr(o.state.head,"headOverHeels","headOverHeels"):Mr(o.state,o.type,e.currentCharacterName)),v=Bd(o),x=On(o),P=Le(l),I=u?.phase??null,T={action:a,facingXy8:f,teleportingPhase:I,flashing:v,highlighted:m,shining:x,gravityZ:d},M=h===void 0||h.action!==a||h.facingXy8!==f||h.teleportingPhase!==I||h?.gravityZ>en!=d>en;let z;const L=n?"for-current-room":"uncolourised",_=n?void 0:r.color;if(i==="headOverHeels"){z=p??Yu({top:Ro("head",!0,t,n,_),bottom:Ro("heels",!0,t,n,_)});const le=z;Po("head",le[go],M,T,t,L),Po("heels",le[En],M,T,t,L)}else z=p??Ro(i,!1,t,n,_),Po(i,z,M,T,t,L);return a==="moving"&&p instanceof ae&&(p.animationSpeed=P*Xa),{output:z,renderProps:T}},Mo=Ft(_d),Bo=(o,e,t,n,r)=>{const s=`${o}.idle.${e}`,i=r?"sceneryPlayer":"uncolourised";return Sn(s)?{animationId:s,randomiseStartFrame:t,paused:n,spritesheetVariant:i}:{textureId:`${o}.walking.${e}.2`,spritesheetVariant:i}},Dd=({renderContext:{item:{id:o,config:{which:e,startDirection:t}},general:{paused:n,colourised:r}},currentRendering:s})=>s?.renderProps===void 0?{output:e==="headOverHeels"?Ye({top:Bo("head",t,o,n,r),bottom:Bo("heels",t,o,n,r)}):b(Bo(e,t,o,n,r)),renderProps:X}:"no-update",Fd=({renderContext:{item:{state:{vels:{sliding:o}},config:{startingPhase:e}},general:{paused:t,colourised:n}},tickContext:{deltaMS:r},currentRendering:s})=>{const a=(s?.renderProps?.distanceTravelled??0)+It(o)*(t?0:r),l=s?.output,c=n?"for-current-room":"uncolourised",u=l??b({textureId:"spikyBall.1",spritesheetVariant:c}),h=(Math.floor(a*2/Qt.w)+e)%2+1;return u.texture=de(c).textures[`spikyBall.${h}`],{output:u,renderProps:{distanceTravelled:a}}},zd=Ft(Fd),Fi=o=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:n,colourised:r}},tickContext:{lastRenderRoomTime:s},currentRendering:i})=>{const a=i?.renderProps,l=Dt(e);let c;return i?.output?c=i?.output:(c=b({animationId:o?"shadowMask.spring.bounce":"spring.bounce",paused:n,spritesheetVariant:r?"for-current-room":"uncolourised"}),c.loop=!1,c.gotoAndStop(0)),s!==void 0&&t>s&&!l&&!n?c.gotoAndPlay(0):l!==(a?.compressed??!1)&&(l?c.gotoAndStop(1):c.gotoAndStop(0)),{output:c,renderProps:{compressed:l}}},Ld=Ft(Fi(!1)),Ed=Ft(Fi(!0)),Ud=({renderContext:{item:{state:{setting:o},config:e},general:{colourised:t}},currentRendering:n})=>{const r=n?.renderProps,s=e.type==="in-store"?Bs(w.getState().gameMenus,e.path)?"right":"left":o;return r===void 0||s!==r.setting?{output:b({textureId:`switch.${s}`,spritesheetVariant:t?"for-current-room":"uncolourised"}),renderProps:{setting:s}}:"no-update"},Vd=({renderContext:{item:o,room:e,general:{paused:t,colourised:n}},currentRendering:r})=>{const{state:{stoodOnBy:s},config:{times:i}}=o,a=r?.renderProps,l=dt(o),c=l&&we(s,e).some(oe);if(!(a===void 0||l!==a.activated||c!==a.flashing))return"no-update";const d=n?"for-current-room":"uncolourised";return{output:b(c?{animationId:"teleporter.flashing",times:i,paused:t,spritesheetVariant:d}:{textureId:l?"teleporter":"block.artificial",times:i,spritesheetVariant:d}),renderProps:{flashing:c,activated:l}}},Gd=({state:{stoodOnBy:o,position:e},config:{times:t}},n)=>{const r=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return we(o,n).filter(As).forEach(({id:s,state:{position:i}})=>{const a=te(i,e),l={x:Math.floor(a.x/C.x),y:Math.floor(a.y/C.y)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(r[l.x][l.y]=s)}),r},$d=(o,e)=>{let t=0,n=1;for(const r of e)for(const s of r)s!==void 0&&o.items[s]?.state.activated&&(t|=n),n<<=1;return t},Hd=({renderContext:{item:o,room:e,general:{pixiRenderer:t,colourised:n}},currentRendering:r})=>{const{config:{times:s}}=o,i=r===void 0?Gd(o,e):r.renderProps.chargePositions,a=$d(e,i);if(!(a!==r?.renderProps.cybermanActivationBitmask))return"no-update";const c=b({subSpriteVariations(d,h){const p=i[d][h];return p===void 0?{animationId:"toaster.off"}:e.items[p]?.state.everActivated?{animationId:"toaster.off"}:{textureId:"toaster.on"}},times:s??X,spritesheetVariant:n?"for-current-room":"uncolourised"});return{output:Fn(t,c,"toaster.off"),renderProps:{chargePositions:i,cybermanActivationBitmask:a}}},Nd=(o,e,t,n)=>`${o}${n?".dark":""}.wall.${e}.${t}`,jd=G(({renderContext:{general:{pixiRenderer:o,colourised:e},item:{id:t,config:n},room:r}})=>{if(n.direction==="right"||n.direction==="towards")throw new Error(`wall is near: ${t}`);const{direction:s,tiles:i}=n,a=Rt(tt(s)),l=new y({label:"wallTiles"}),c=new y({label:"wallAnimations"});for(let d=0;d<n.tiles.length;d++){const h=ze({[a]:d});if(l.addChild(b({textureId:Nd(r.planet,i[d],s,r.color.shade==="dimmed"),...h,pivot:s==="away"?{x:Qt.w,y:Qt.h}:{x:0,y:Qt.h},spritesheetVariant:e?"for-current-room":"uncolourised"})),r.planet==="moonbase"){const p=`moonbase.wall.screen.${i[d]}.away`;Sn(p)&&c.addChild(b({animationId:p,randomiseStartFrame:`${t}${d}`,flipX:s==="left",x:h.x+(s==="away"?-8:8),y:h.y-23,spritesheetVariant:e?"for-current-room":"uncolourised"}))}}const u=new y({label:"wallAppearance"});return u.addChild(se(o,l)),c.children.length>0&&u.addChild(c),u}),Xd={head:Mo,heels:Mo,headOverHeels:Mo,doorFrame:ad,doorLegs:id,monster:kd,floatingText:cd,barrier:G(({renderContext:{item:{config:{axis:o,times:e,disappearing:t}},general:{colourised:n,pixiRenderer:r}}})=>ut(r,b({textureId:`barrier.${o}${t?".disappearing":""}`,times:e,spritesheetVariant:n?"for-current-room":"uncolourised"}))),deadlyBlock:G(({renderContext:{item:{config:o,id:e},general:{paused:t,colourised:n,pixiRenderer:r}}})=>{switch(o.style){case"volcano":{const s=b({animationId:"volcano",times:o.times,randomiseStartFrame:e,paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"});return Fn(r,s,"volcano")}case"toaster":throw new Error("use the special toaster appearance instead");default:throw o.style,new Error("unknown deadly block style")}}),spikes:$e("spikes"),slidingDeadly:zd,slidingBlock:G(({renderContext:{item:{config:{style:o}},general:{colourised:e}}})=>{const t=e?"for-current-room":"uncolourised";return b(o==="book"?{textureId:"book.y",spritesheetVariant:t}:{textureId:o,spritesheetVariant:t})}),block:Xu,switch:Ud,button:Wu,conveyor:od,lift:G(({renderContext:{general:{paused:o,colourised:e}}})=>{const t=new y,n=e?"for-current-room":"uncolourised",r={x:xt.w/2,y:xt.h};return t.addChild(b({animationId:"lift",pivot:r,paused:o,spritesheetVariant:n})),t.addChild(b({textureId:"lift.static",pivot:r,spritesheetVariant:n})),t}),teleporter:Vd,sceneryCrown:G(({renderContext:{item:{config:{planet:o}},general:{colourised:e}}})=>b({textureId:`crown.${o}`,spritesheetVariant:e?"for-current-room":"uncolourised"})),pickup:G(({renderContext:{item:{config:o},general:{paused:e,colourised:t}}})=>{const n=t?"for-current-room":"uncolourised";if(o.gives==="crown")return b({textureId:`crown.${o.planet}`,spritesheetVariant:n});const s={shield:{textureId:"whiteRabbit",spritesheetVariant:n},jumps:{textureId:"whiteRabbit",spritesheetVariant:n},fast:{textureId:"whiteRabbit",spritesheetVariant:n},"extra-life":{textureId:"whiteRabbit",spritesheetVariant:n},bag:{textureId:"bag",spritesheetVariant:n},doughnuts:{textureId:"doughnuts",spritesheetVariant:n},hooter:{textureId:"hooter",spritesheetVariant:n},scroll:{textureId:"scroll",spritesheetVariant:n},reincarnation:{animationId:"fish",paused:e,spritesheetVariant:n}}[o.gives];return b(s)}),moveableDeadly:$e("fish.1"),charles:Ju,joystick:vd,movingPlatform:$e("sandwich"),pushableBlock:$e("stepStool"),portableBlock:G(({renderContext:{item:{config:{style:o}},general:{colourised:e}}})=>b({textureId:o,spritesheetVariant:e?"for-current-room":"uncolourised"})),spring:Ld,sceneryPlayer:Dd,hushPuppy:$e("hushPuppy"),bubbles:G(({renderContext:{item:{id:o,config:{style:e}},general:{paused:t,colourised:n}}})=>b({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:o,spritesheetVariant:n?"for-current-room":"uncolourised"})),firedDoughnut:nd({animationId:"bubbles.doughnut"}),ball:$e("ball"),floor:gd,particle:G(({renderContext:{item:{config:{forCharacter:o}},general:{paused:e,colourised:t}}})=>b({animationId:`particle.${o==="head"?"head":"heels"}.fade`,anchor:{x:.5,y:.5},paused:e,spritesheetVariant:t?"for-current-room":"uncolourised"}))},zi=o=>{if(o.type==="wall"){const{direction:e}=o.config;return e==="right"||e==="towards"?void 0:jd}return o.type==="deadlyBlock"&&o.config.style==="toaster"?Hd:Xd[o.type]},Li=(o,e,t)=>{const r=zi(o)({renderContext:{general:e.general,item:o,room:t,colourClashLayer:void 0,frontLayer:void 0,zEdges:Ja,getItemRenderPipeline(){throw new Error("getOtherItemContainer not supported in carried sprite")}},tickContext:{lastRenderRoomTime:xe,movedItems:ot,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Wd=()=>{const o=b({label:"carriedItem"}),e=b({label:"bag",textureId:"bag",y:-2,spritesheetVariant:"original"});return new y({label:"carryButtonSurface",children:[o,e]})},Yd=({renderContext:o,currentRendering:e,tickContext:t})=>{const{button:n,inputStateTracker:r,general:{colourised:s,pixiRenderer:i}}=o,{currentPlayable:a,room:l}=t,c=e?.renderProps,u=e?.output,d=a&&et(a),h=d?.hasBag??!1,p=d?.carrying??null,f=p===null&&l!==void 0&&Ai(a,l)!==void 0,m=po(n.actions,r),v=h&&!f&&p===null,x=u??new ho(s,n.which,i,Wd()),P=l!==c?.renderedInRoom;P&&x.generateButtonSpriteTextures(l),x.visible=h;const[I,T]=x.shownOnSurface.children;if(v!==c?.disabled||s!==c?.colourised||P){const M=de(s?v?"deactivated":"for-current-room":"uncolourised");T.texture=M.textures.bag}return c?.pressed!==m&&(x.pressed=m),p!==c?.carrying&&(T.visible=p===null,I.visible=p!==null),(p!==c?.carrying||P)&&(I.removeChildren(),p!==null&&l!==void 0&&I.addChild(Li(p,o,t.room))),{output:x,renderProps:{pressed:m,hasBag:h,colourised:s,carrying:p,disabled:v,renderedInRoom:l}}},Jd=o=>{const e=b({textureId:"hooter",y:-3,spritesheetVariant:"original"}),t=b({textureId:"doughnuts",y:-2,spritesheetVariant:"original"}),n=new D({pixiRenderer:o,outline:!0,y:Ln});return new y({label:"fireButtonSurface",children:[e,t,n]})},qd=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=s&&qt(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=po(o.actions,e),d=c===0,h=l?"hooter":rt(c)>0?"doughnuts":"none",p=r?.renderProps,f=i!==p?.renderedInRoom,m=u!==p?.pressed,v=d!==p?.disabled,x=h!==p?.showingSprite;if(p!==void 0&&t===p.colourised&&x&&!v&&!m&&!f)return"no-update";const P=r?.output??new ho(t,o.which,n,Jd(n));f&&P.generateButtonSpriteTextures(i),P.visible=h!=="none",m&&(P.pressed=u);const[I,T,M]=P.shownOnSurface.children;if(x&&(I.visible=h==="hooter",T.visible=h==="doughnuts"),v||f){const z=de(t?d?"deactivated":"for-current-room":"uncolourised");I.texture=z.textures.hooter,T.texture=z.textures.doughnuts,M.tint=In(t,i.color.shade==="dimmed")}return c!==p?.doughnutsCount&&(M.text=rt(c)),{output:P,renderProps:{pressed:u,colourised:t,showingSprite:h,renderedInRoom:i,disabled:d,doughnutsCount:c}}},Zd=new Oe(16777215),Je=(o,e=!0)=>o?e?"for-current-room":"deactivated":"uncolourised",ft=(o,e,t)=>o?Zd:Y(Ot(e).hud[t?"brightHue":"dimmedHue"]),_e=(o,e,t)=>{const n=Ot(e);return o?Vs(n.hud[t?"brightHue":"dimmedHue"],!1,e.shade==="dimmed"):Y(n.hud[t?"brightHue":"dimmedHue"])},Br=(o,e)=>{const t=Ot(e);return o?Vs(t.hud.icons,!1,e.shade==="dimmed"):Y(t.hud.icons)},Qd=(o,e)=>{const t=b({animationId:"teleporter.flashing",y:5,spritesheetVariant:Je(o)}),n=new D({pixiRenderer:e,text:"JUMP",y:Ln});return new y({label:"jumpButtonSurface",children:[n,t]})},Kd=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n,paused:r}},tickContext:{room:s,currentPlayable:i},currentRendering:a})=>{const l=a?.renderProps,c=a?.output,u=i?.state.standingOnItemId??null,d=u===null||s===void 0?null:s.items[u],h=d===null?!1:d.type==="teleporter"&&dt(d),p=po(o.actions,e),f=c??new ho(t,o.which,n,Qd(t,n)),m=l?.pressed!==p;m&&(f.pressed=p);const v=s!==l?.renderedInRoom,x=h!==l?.isStandingOnActiveTeleporter,P=r!==l?.paused,[I,T]=f.shownOnSurface.children;if(P&&(r?T.gotoAndStop(0):T.gotoAndPlay(0)),!x&&!v&&!m)return"no-update";if(x&&(T.visible=h,I.visible=!h),v){const M=de(Je(t));T.textures=Dn(M.animations["teleporter.flashing"]),r||T.gotoAndPlay(0),I.tint=In(t,s?.color.shade==="dimmed"),f.generateButtonSpriteTextures(s)}return{output:f,renderProps:{pressed:p,isStandingOnActiveTeleporter:h,colourised:t,renderedInRoom:s,paused:r}}},eh=({currentRendering:o,tickContext:e,renderContext:t})=>o!==void 0?(o.output.tint=_e(t.general.colourised,e.room.color,!1),"no-update"):{output:new D({pixiRenderer:t.general.pixiRenderer,label:"mapText",outline:!0,text:"MAP"}),renderProps:X},th=({currentRendering:o,tickContext:e,renderContext:t})=>o!==void 0?(o.output.tint=_e(t.general.colourised,e.room.color,!1),"no-update"):{output:new D({pixiRenderer:t.general.pixiRenderer,label:"menuText",outline:!0,doubleHeight:!0,doubleWidth:!0,text:"☰"}),renderProps:X},oh=6e-4,nh=1e-4,Ht=.3,rh=40;class sh{#e={x:0,y:0};#t=0;#n=!1;startDrag(){this.#n=!0,this.#e={x:0,y:0},this.#t=performance.now()}stopDrag(){this.#n=!1}updateVelocity(e){const t=performance.now(),n=t-this.#t;if(n>0){const r=e.x/n,s=e.y/n;this.#e.x=this.#e.x*(1-Ht)+r*Ht,this.#e.y=this.#e.y*(1-Ht)+s*Ht}this.#t=t}checkStationaryDrag(){this.#n&&performance.now()-this.#t>rh&&(this.#e={x:0,y:0})}applyInertia(e){const t={x:0,y:0};if(!this.#n){const n=Math.sqrt(this.#e.x*this.#e.x+this.#e.y*this.#e.y);if(n>nh){t.x=this.#e.x*e,t.y=this.#e.y*e;const r=oh*e,s=Math.max(0,n-r);if(s>0){const i=s/n;this.#e.x*=i,this.#e.y*=i}else this.#e.x=0,this.#e.y=0}else this.#e.x=0,this.#e.y=0}return t}reset(){this.#e={x:0,y:0},this.#n=!1,this.#t=0}get isDragging(){return this.#n}}class ih{constructor(e){this.renderContext=e;const{x:t,y:n}=e.general.upscale.gameEngineScreenSize;this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer),this.output.rect(0,0,t,n).fill("#00000000")}output=new ee({label:"OnScreenLook",eventMode:"static"});#e;#t=void 0;#n;#o=new sh;handleTouchStart=e=>{this.#e!==void 0&&this.stopCurrentPointer(),this.#n.curPointerId!==e.pointerId&&(this.#e=e.pointerId,this.#t=qa(e,"x","y"),this.#o.startDrag(),this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#e=void 0,this.#t=void 0,this.#o.stopDrag(),this.renderContext.inputStateTracker.hudInputState.directionVector=R,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#e)return;const t=this.#t,n=Os(w.getState()),{x:r,y:s}=e,i=(t.x-r)/n,a=(t.y-s)/n;this.#o.updateVelocity({x:i,y:a});const{inputStateTracker:{hudInputState:l}}=this.renderContext;l.lookVector.x+=i,l.lookVector.y+=a,t.x=r,t.y=s};tick(e){if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer(),this.#o.reset();return}const{deltaMS:n}=e,{inputStateTracker:{hudInputState:r}}=this.renderContext;this.#o.checkStationaryDrag();const s=this.#o.applyInertia(n);r.lookVector.x+=s.x,r.lookVector.y+=s.y}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}get curPointerId(){return this.#e}set joystickRenderer(e){this.#n=e}}const K=14,ah=2,lh=Math.cos(30*(Math.PI/180)),ch=40,uh="#00000000";class dh{constructor(e){this.renderContext=e;const{inputDirectionMode:t,general:{colourised:n,pixiRenderer:r}}=e;this.#t=b({textureId:"joystick.whole",anchor:{x:.5,y:.5},y:1,spritesheetVariant:n?"for-current-room":"uncolourised"}),this.#e={away:new D({pixiRenderer:r,outline:!0,x:K,y:-K,text:"↗"}),right:new D({pixiRenderer:r,outline:!0,x:K,y:K,text:"↘"}),towards:new D({pixiRenderer:r,outline:!0,x:-K,y:K,text:"↙"}),left:new D({pixiRenderer:r,outline:!0,x:-K,y:-K,text:"↖"}),...t!=="4-way"?{awayRight:new D({pixiRenderer:r,outline:!0,x:K*Math.SQRT2,text:"➡"}),towardsRight:new D({pixiRenderer:r,outline:!0,y:K*Math.SQRT2,text:"⬇"}),towardsLeft:new D({pixiRenderer:r,outline:!0,x:-K*Math.SQRT2,text:"⬅"}),awayLeft:new D({pixiRenderer:r,outline:!0,y:-K*Math.SQRT2,text:"⬆"})}:{}},this.output.addChild(this.#t),this.output.addChild(new ee().circle(0,0,ch).fill(uh)),this.output.addChild(new y({children:Object.values(this.#e),y:Za/2})),this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer)}output=new y({label:"OnScreenJoystick",eventMode:"static"});#e;#t;#n;#o;#r;handleTouchStart=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#o.curPointerId!==e.pointerId&&(this.#n=e.pointerId,this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=R,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const t=Os(w.getState()),{x:n,y:r}=this.output,{x:s,y:i}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(s/t-n)/(a/2),u=(i/t-r)/(l/2),d=Qa({x:-c,y:-u});this.renderContext.inputStateTracker.hudInputState.directionVector=B(Ka(d,lh),ah)};tick({room:e}){const{renderContext:{general:{colourised:t},inputStateTracker:{directionVector:n}}}=this;if(this.#r!==e&&(this.#t.texture=vt(t?"for-current-room":"uncolourised","joystick.whole"),this.#r=e),w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const s=Le(n)>el?co(n):void 0,i=_e(t,e.color,!0),a=_e(t,e.color,!1);for(const[l,c]of bs(this.#e))c.tint=l===s?i:a}get curPointerId(){return this.#n}set lookRenderer(e){this.#o=e}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}}const Ar=30,Or=15,hh=42,ph=36,fh=44,mh=20;class gh{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:t}},inputDirectionMode:n,general:r}=e;this.#t={mainButtonNest:new y({label:"mainButtonNest"}),buttons:{jump:new Ge({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:t},Kd),fire:new Ge({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:t},qd),carry:new Ge({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:t},Yd),carryAndJump:new Ge({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:t},cu),menu:new Ge({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:t},th),map:new Ge({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:t},eh)},joystick:new dh({inputStateTracker:t,inputDirectionMode:n,general:r}),look:new ih({inputStateTracker:t,general:r})},this.#t.look.joystickRenderer=this.#t.joystick,this.#t.joystick.lookRenderer=this.#t.look,this.#n(),this.#o()}#e=new y({label:"OnScreenControls"});#t;#n(){const{buttons:e}=this.#t,{mainButtonNest:t,joystick:n,look:r}=this.#t;this.#e.addChild(r.output);for(const{renderContext:{button:{which:s}},output:i}of ie(e))s==="menu"||s==="map"?this.#e.addChild(i):t.addChild(i);e.jump.output.y=Or,e.carry.output.x=-Ar,e.carryAndJump.output.y=-Or,e.fire.output.x=Ar,e.menu.output.x=24,e.menu.output.y=24,e.map.output.y=16,this.#e.addChild(t),this.#e.addChild(n.output)}#o(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const t of ie(this.#t.buttons)){const{renderContext:{button:{actions:n}}}=t;t.output.eventMode="static",t.output.on("pointerdown",()=>{for(const r of n)e.hudInputState[r]=!0}),t.output.on("pointerup",()=>{for(const r of n)e.hudInputState[r]=!1}),t.output.on("pointerleave",()=>{for(const r of n)e.hudInputState[r]=!1})}}#r(e){this.#t.mainButtonNest.x=e.x-fh,this.#t.mainButtonNest.y=e.y-mh,this.#t.joystick.output.x=hh,this.#t.joystick.output.y=e.y-ph,this.#t.buttons.map.output.x=e.x-32}tick(e){const{screenSize:t}=e,{general:{gameState:n}}=this.renderContext;this.#r(t);for(const r of ie(this.#t.buttons))r.tick({...e,currentPlayable:at(n)});this.#t.joystick.tick(e),this.#t.look.tick(e)}get output(){return this.#e}destroy(){this.#t.joystick.destroy(),this.#t.look.destroy(),this.#e.destroy({children:!0})}}De.frames.button.frame;const bh=o=>o.room!==void 0,yh=o=>o?48:24,vh=o=>o?68:56,xh=(o,e)=>o?e.x/2-24:80,wh=o=>o?72:24,Ch=o=>o?88:0,_r=112,mt=o=>o==="heels"?1:-1,Dr="head.walking.right.2",Fr="heels.standing.towards";class Sh{constructor(e){this.renderContext=e;const{onScreenControls:t,general:n}=e;this.#o={head:{sprite:this.#l("head"),livesText:new D({pixiRenderer:n.pixiRenderer,label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#a({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#a({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#l("heels"),livesText:new D({pixiRenderer:n.pixiRenderer,label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#a({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new y({label:"heelsCarrying"})}}};for(const s of Et)this.#e.addChild(this.#o[s].shield.container),this.#e.addChild(this.#o[s].extraSkill.container);t||(this.#e.addChild(this.#o.head.doughnuts.container),this.#e.addChild(this.#o.head.hooter.container),this.#e.addChild(this.#o.heels.bag.container),this.#e.addChild(this.#o.heels.carrying.container)),this.#c(),t&&(this.#t=new gh({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#t.output));for(const s of Et)this.#e.addChild(this.#o[s].sprite),this.#e.addChild(this.#o[s].livesText);this.#r=gs({predicate(s,i,a){return Pe(i)!==Pe(a)},effect:(s,{getState:i})=>{Pe(i())?(this.#n=new cr(e),this.#i()):(this.#n?.destroy(),this.#n=void 0)}});const r=Pe(w.getState());this.#n=r?new cr(e):void 0,this.#n&&this.#i()}#e=new y({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#n;#o;#r;#s=void 0;#i(){this.#e.addChild(this.#n.output)}#c(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const t of Et){const{sprite:n,livesText:r}=this.#o[t];for(const s of[n,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${t}`]=!0}),s.on("pointerup",()=>{e[`swop.${t}`]=!1}),s.on("pointerleave",()=>{e[`swop.${t}`]=!1})}}#a({textureId:e,textOnTop:t=!1,noText:n=!1,outline:r=!1,label:s}){const i=new y({label:s});i.pivot={x:4,y:16};const a=new N({texture:me().textures[e],anchor:t?{x:.5,y:0}:{x:.5,y:1},y:t?0:8});i.addChild(a);const l=Re.w/2,c=new D({pixiRenderer:this.renderContext.general.pixiRenderer,outline:r==="text-only",y:t?0:16,x:l});return n&&(c.visible=!1),a.x=l,i.addChild(c),r===!0&&(i.filters=_t.pureBlack),{textContainer:c,icon:a,container:i}}#l(e){const t=new N(me().textures[e==="head"?Dr:Fr]);return t.anchor={x:.5,y:0},t}#u({screenSize:e}){this.#o.head.hooter.container.x=this.#o.head.doughnuts.container.x=(e.x>>1)+mt("head")*_r,this.#o.head.doughnuts.container.y=e.y-xt.h-8,this.#o.heels.carrying.container.y=e.y-xt.h,this.#o.heels.carrying.container.x=this.#o.heels.bag.container.x=(e.x>>1)+mt("heels")*_r,this.#o.heels.bag.container.y=this.#o.head.hooter.container.y=e.y-8,this.#n&&(this.#n.output.x=e.x/2-Re.w*1.5)}#d({room:e}){const{renderContext:{general:{gameState:t,colourised:n}}}=this,r=Ut(t,"heels"),s=r?.carrying??null,{container:i}=this.#o.heels.carrying,a=i.children.length>0;if(s===null&&a){for(const u of i.children)u.destroy();this.#s=void 0}if(s!==null&&(!a||e!==this.#s)){const u=Li(s,this.renderContext,e);this.#s=e,i.removeChildren(),i.addChild(u),i.tint=ft(n,e.color,!0)}const l=this.#o.heels.bag.icon,c=r?.hasBag;l.texture=vt(Je(n,c??!1),"bag"),l.tint=ft(n,e.color,c??!1)}#h({room:e}){const{renderContext:{general:{gameState:t,colourised:n}}}=this,r=Ut(t,"head"),s=r?.doughnuts??0,i=s!==0,a=r?.hasHooter,l=this.#o.head.hooter.icon,c=this.#o.head.doughnuts.icon,u=this.#o.head.doughnuts.textContainer;l.texture=vt(Je(n,a??!1),"hooter"),c.texture=vt(Je(n,i),"doughnuts"),this.#o.head.doughnuts.textContainer.text=s,u.tint=_e(n,e.color,!1),l.tint=ft(n,e.color,a??!1),c.tint=ft(n,e.color,i)}#f(e,{screenSize:t,room:n}){const{renderContext:{onScreenControls:r,general:{gameState:s,colourised:i}}}=this,a=Ut(s,e),{textContainer:l,container:c,icon:u}=this.#o[e].shield,{textContainer:d,container:h,icon:p}=this.#o[e].extraSkill,f=to(a),m=f>0||!r;c.visible=m,m&&(l.text=f,c.y=t.y-Ch(r)),h.x=c.x=(t.x>>1)+mt(e)*xh(r,t);const v=a===void 0?0:e==="head"?_n(a):a.bigJumps,x=v>0||!r;h.visible=x,x&&(d.text=v,h.y=t.y-wh(r)),d.tint=_e(i,n.color,!1),l.tint=_e(i,n.color,!1),u.tint=Br(i,n.color),p.tint=Br(i,n.color)}#p(e,t){const{currentCharacterName:n}=e;return n===t||n==="headOverHeels"}#m(e,{screenSize:t,room:n}){const{renderContext:{onScreenControls:r,general:{gameState:s,colourised:i}}}=this,a=this.#o[e].sprite;let l;const c=this.#p(s,e),u=Je(i,c);try{l=vt(u,e==="head"?Dr:Fr)}catch(d){throw console.error(this.renderContext),new Error(`error getting texture for variant ${u}`,{cause:d})}a.texture=l,a.x=(t.x>>1)+mt(e)*vh(r),a.y=t.y-xt.h,a.tint=ft(i,n.color,c)}#g(e,{screenSize:t,freeCharacters:n,room:r}){const{renderContext:{onScreenControls:s,general:{gameState:i,colourised:a}}}=this,c=n[e]??!1?"FREE":Ut(i,e)?.lives??0,u=this.#o[e].livesText;u.x=(t.x>>1)+mt(e)*yh(s),u.y=t.y,u.text=c;const d=this.#p(i,e),h=r.color.shade==="dimmed",p=a?Us(h)[d?jo[e]:"midGrey"]:Y(Ot(r.color).hud.brightHue);u.tint=p}tick(e){if(bh(e)){for(const t of Et)this.#g(t,e),this.#m(t,e),this.#f(t,e);this.#u(e),this.#h(e),this.#d(e),this.#t?.tick(e),this.#n&&(this.#n.isDark=e.room.color.shade==="dimmed")}}get output(){return this.#e}destroy(){this.#o.head.doughnuts.textContainer.destroy(),this.#o.head.hooter.textContainer.destroy(),this.#o.heels.bag.textContainer.destroy(),this.#e.destroy({children:!0}),this.#t?.destroy(),this.#n?.destroy(),this.#r()}}const Th=(o,e,t,n)=>o===void 0||o.renderContext.general.colourised!==e||o.renderContext.onScreenControls!==t||o.renderContext.inputDirectionMode!==n,kh=(o,e,t,n,r,s)=>o===void 0||e||o.renderContext.general.upscale!==t||o.renderContext.general.displaySettings!==n||o.renderContext.general.soundSettings!==r||o.renderContext.general.paused!==s,$=o=>{const e=typeof o=="string"?{soundId:o}:o,{playbackRate:t=1,soundId:n,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=S.createBufferSource(),c=Go()[n];return l.buffer=c,l.loop=s,l.playbackRate.value=i?t-.05+Math.random()*.1:t,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},He=(o,e,t)=>{const n=S.createGain();return e!==void 0&&(n.gain.value=e),o.connect(n),n.connect(t),n},j=({start:o,change:e,loop:t,stop:n,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?o!==void 0&&!(a&&s)?(l&&(l.onended=null,l.stop()),l=$({...o}),He(l,o.gain,i),t!==void 0&&(r?(l=$({...t,loop:!0}),He(l,t.gain,i)):l.onended=()=>{c&&(l&&(l.onended=null,l.stop()),l=$({...t,loop:!0}),He(l,t.gain,i))})):t!==void 0&&(l=$({...t,loop:!0}),He(l,t.gain,i)):(l&&l.loop&&(l.onended=null,l.stop()),n!==void 0&&(l=$({...n}),He(l,n.gain,i)));else if(c!==u&&e!==void 0){const h=$({...e});He(h,e.gain,i)}a=!1,c=u}};class Ih{constructor(e){this.renderContext=e,this.output.gain.value=4}output=S.createGain();#e=j({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:t}}}}=this,n=(e.x!==0||e.y!==0)&&t!==null;this.#e(n)}destroy(){}}class Rh{constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&$({soundId:"bonus",connectTo:this.output});break}case"disappearing":{$({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,$({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=S.createGain();tick(){}destroy(){}}class Ph{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=S.createGain();#e=S.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{pressed:e}}}}=this,t=this.#t?.pressed;t!==void 0&&t!==e&&$({soundId:"switchClick",playbackRate:e?.95:1.05,connectTo:this.#e}),this.#t={pressed:e}}destroy(){}}class Un{constructor(e,t,n=1){this.renderContext=e,this.#e=j({start:t},this.output),this.output.gain.value=n}output=S.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:t}}=this,{state:{collidedWith:{roomTime:n,by:r}}}=t,s=n>(e??xe)&&!_s(xn(r));this.#e(s)}destroy(){}}class Mh{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n=new Un(e,{soundId:"metalHit"},.3),this.#n.output.connect(this.output)}output=S.createGain();#e=S.createGain();#t=j({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#n;tick(e){const{renderContext:{item:t,room:{roomTime:n,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=n===s&&ye(xn(i)).some(l=>Ps(r[l]));this.#t(a),this.#n.tick(e)}destroy(){}}const Ao=2;class Bh{constructor(e){this.renderContext=e}output=S.createGain();#e=j({start:{soundId:"conveyorStart",playbackRate:Ao},loop:{soundId:"conveyorLoop",playbackRate:Ao},stop:{soundId:"conveyorEnd",playbackRate:Ao}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=Dt(e);this.#e(t)}destroy(){this.#e(!1)}}class Ah{constructor(e){this.renderContext=e,$({soundId:"hooter",connectTo:this.output})}output=S.createGain();tick(){}destroy(){}}const Oh=3;class _h{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=S.createGain();#e=$({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Oh*e)}destroy(){}}const zr={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},Lr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Er={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Ur={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Dh{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e;zr[t]!==void 0&&(this.#r=new Un(e,zr[t]),this.#r.output.connect(this.output)),Lr[t]!==void 0&&(this.#n=j({change:Lr[t]},this.#e)),Ur[t]!==void 0&&(this.#s=j(Ur[t],this.#e)),Er[t]!==void 0&&(this.#o=j({loop:Er[t]},this.#t))}output=S.createGain();#e=S.createGain();#t=S.createGain();#n;#o;#r;#s;tick(e){const{renderContext:{item:t}}=this,{state:{facing:n,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#n){const a=co(n);this.#n(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!s;this.#o(a)}if(this.#s){const a=!Ee(i,R);this.#s(a)}}destroy(){}}const Fh=.8,zh=1.2,Lh=.8;class Oo{constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:n}}=e,{noFootsteps:r}={...lt.soundSettings,...t};r||(this.#e=S.createGain(),this.#e.gain.value=Fh,this.#e.connect(this.output),this.#t=j({loop:{soundId:`${n==="headOverHeels"?"heels":n}Walk`}},this.#e)),this.#n.gain.value=Lh,this.#n.connect(this.output),this.#c.gain.value=zh,this.#c.connect(this.output),this.#s.connect(this.output),this.#o=j({start:{soundId:`${n==="headOverHeels"?"head":n}Jump`}},this.#n),this.#r=j({loop:{soundId:`${n==="headOverHeels"?"head":n}Fall`}},this.#n)}output=S.createGain();#e;#t;#n=S.createGain();#o;#r;#s=S.createGain();#i=j({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#s);#c=S.createGain();#a=j({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#c);#l={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:t}}=this,{state:{action:n,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=t,h=et(t),{teleportingPhase:p,positionZ:f}=this.#l,m=r?r.phase:null,v=i&&l>s&&l>f&&c>0,x=l<f&&c<0&&a===null;this.#r(x),this.#o(v),this.#t!==void 0&&this.#t(!v&&!x&&n==="moving"),h!==void 0&&this.#a(h.carrying!==null);const P=a!==null&&u>(e??xe)&&d[a];if(this.#i(P),m!==null&&m!==p)if(m==="in"){const I=Go().teleportIn,T=S.createBufferSource();T.buffer=I,T.connect(this.output),T.start()}else{const I=Go().teleportOut,T=S.createBufferSource();T.buffer=I,T.connect(this.output),T.start()}this.#l={teleportingPhase:m,positionZ:l}}destroy(){}}class Eh{constructor(e){this.renderContext=e}output=S.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:t}}}}=this;if(t!=="drum")return;const n=this.#e?.stoodOn??!1,r=Dt(e);!n&&r&&$({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Uh{constructor(e){this.renderContext=e,this.scrapeBracketed=j({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4}output=S.createGain();scrapeBracketed;tick({movedItems:e}){const{renderContext:{item:t,room:{roomTime:n}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:s}}=t,i=n===r&&s!==null&&e.has(t);this.scrapeBracketed(i)}destroy(){}}class Vh extends Un{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}class Gh{constructor(e){this.renderContext=e}output=S.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:n}}}}=this,r=Dt(t);e!==void 0&&n>e&&!r&&$({soundId:"springBoing",connectTo:this.output})}destroy(){}}class $h{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=S.createGain();#e=S.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,n=t.type==="in-store"?Bs(w.getState().gameMenus,t.path)?"right":"left":e,r=this.#t?.setting;r!==void 0&&r!==n&&$({soundId:"switchClick",playbackRate:n==="right"?.95:1.05,connectTo:this.#e}),this.#t={setting:n}}destroy(){}}class Hh{constructor(e){this.renderContext=e}output=S.createGain();#e=j({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:t}}=this;this.#e(dt(e)&&we(e.state.stoodOnBy,t).some(oe))}destroy(){}}const Nh=(o,e)=>fs(we(o.state.stoodOnBy,e).filter(As));class jh{constructor(e){this.renderContext=e,this.output.gain.value=2}output=S.createGain();#e=void 0;tick(e){const{renderContext:{item:t,room:n}}=this,r=Nh(t,n);this.#e!==void 0&&r<this.#e&&$({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=r}destroy(){}}const Xh={lift:_h,switch:$h,button:Ph,bubbles:Rh,head:Oo,heels:Oo,headOverHeels:Oo,teleporter:Hh,monster:Dh,conveyor:Bh,spring:Gh,portableBlock:Eh,charles:Mh,ball:Ih,pushableBlock:Uh,firedDoughnut:Ah,slidingBlock:Vh},Wh=o=>{if(o.item.type==="deadlyBlock"&&o.item.config.style==="toaster")return new jh(o);const e=Xh[o.item.type];if(e)return new e(o)},Vr=C.z*-1,Gr=C.z*tl,Yh=0,Jh=C.x*16,qh={x:0,y:0,z:0},_o=(o,e,t)=>(o-e)/(t-e)*2-1,Zh=.5,Qh=.3;class Kh{constructor(e,t){this.renderContext=e,this.childRenderer=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const n=Tn(e.room).floors;this.soundPositionMinX=n.edgeLeftX,this.soundPositionMaxX=n.edgeRightX}output=S.createPanner();soundPositionMinX;soundPositionMaxX;tick(e){this.childRenderer.tick(e);const{item:t}=this.renderContext,n=t.state,r=cn(Ds(qh,t.aabb,.5),n.position),s=_o(Zt(r),this.soundPositionMinX,this.soundPositionMaxX),i=_o(r.z,Vr,Gr);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${Vr},
          ${Gr},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(n.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=_o(r.x+r.y,Yh,Jh);this.output.positionX.value=s*Zh,this.output.positionY.value=i,this.output.positionZ.value=a*Qh}destroy(){this.childRenderer.destroy()}}class ep{constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(n=>n.output))}#e;#t=new y({label:"CompositeRenderer"});tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}var tp=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uTargetColor;const float blackThreshold=sqrt(3.0)*0.1;void main(void){vec4 c=texture(uTexture,vTextureCoord);float isBlack=step(length(c.rgb),blackThreshold);finalColor=mix(vec4(uTargetColor,1),c,max(isBlack,1.0-c.a));}`;const op=U.from({vertex:be,fragment:tp,name:"revert-colourise-filter"});class np extends E{uniforms;constructor(e="white"){super({glProgram:op,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[t,n,r]=new Oe(e).toArray();this.uniforms.uTargetColor[0]=t,this.uniforms.uTargetColor[1]=n,this.uniforms.uTargetColor[2]=r}}const Ei=Ke,rp=g.pastelBlue,$r=_t.highlightBeige,sp=g.lightBeige,ip=_t.lightBeige,Hr=_t.midRed,ap=_t.white,Nr=new np(rp),Do=g.white,jr=g.midRed,lp=g.pastelBlue,Xr={left:"↖",away:"↗",right:"↘",towards:"↙"},Wr=o=>o.type==="switch"&&o.config.type==="in-room"||o.type==="button",Yr=(o,e)=>{switch(o){case"back-forth":switch(e){case"left":return"↖↘";case"right":return"↘↖";case"away":return"↗↙";case"towards":return"↙↗";default:throw new Error("Unexpected startDirection")}case"forwards":switch(e){case"left":return"↖";case"right":return"↘";case"away":return"↗";case"towards":return"↙";default:throw new Error("Unexpected startDirection")}case"clockwise":switch(e){case"left":return"↖↗↘↙";case"right":return"↘↙↖↘";case"away":return"↗↘↙↖";case"towards":return"↙↖↗↘";default:throw new Error("Unexpected startDirection")}case"towards-analogue":return"➡.⬅"}return""},cp=o=>o.type==="monster"&&o.config.activated==="after-player-near";class up{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output),this.#e()}output=new y({label:"EditorAnnotationsRenderer"});#e(){const e=this.renderContext.item;switch(e.type){case"pickup":if(e.config.gives==="shield"||e.config.gives==="extra-life"||e.config.gives==="jumps"||e.config.gives==="fast"){const t={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"};this.#t({annotationText:t[e.config.gives],yAdj:-16})}break;case"doorFrame":if(e.config.part==="near"){const{rooms:t}=w.getState().levelEditor.campaignInProgress,{config:{toRoom:n,direction:r}}=e;if(n!==Ts){const s=!!t[n],i=Xr[r],a=r==="away"||r==="right"?`${n}${i}`:`${i}${n}`;this.#t({annotationText:a,yAdj:r==="left"||r==="away"?-48:0,tint:s?Do:jr,clickDispatch:s?()=>Zn(n):void 0})}}break;case"teleporter":{const{rooms:t}=w.getState().levelEditor.campaignInProgress,{config:{toRoom:n}}=e,r=!!t[n];this.#t({annotationText:`➡${n}`,yAdj:-12,tint:r?Do:jr,clickDispatch:r?()=>Zn(n):void 0})}break;case"conveyor":{const{config:{direction:t}}=e,n=Xr[t];this.#t({annotationText:n,yAdj:-12})}break;case"movingPlatform":{const{config:{movement:t,startDirection:n}}=e;this.#t({annotationText:Yr(t,n),yAdj:-12})}break;case"monster":{const{config:t}=e;switch(!0){case(t.which==="cyberman"&&t.activated==="after-player-near"):this.#t({annotationText:"wake",tint:sp,yAdj:-12});break;case(t.which==="turtle"||t.which==="skiHead"):this.#t({annotationText:Yr(t.movement,t.startDirection),yAdj:-12});break}}break}}#t({annotationText:e,yAdj:t=0,tint:n=Do,clickDispatch:r}){const{renderContext:{frontLayer:s,general:{pixiRenderer:i}}}=this,a=new D({pixiRenderer:i,label:"EditorAnnotationTextContainer",outline:!0,tint:n,text:e,y:t});r!==void 0&&(a.eventMode="static",a.on("click",()=>{w.dispatch(r())}),a.on("mouseover",()=>{w.getState().levelEditor.tool.type==="pointer"&&(w.dispatch(Qn(!0)),a.tint=lp)}),a.on("mouseout",()=>{w.dispatch(Qn(!1)),a.tint=n}),a.cursor="pointer"),this.output.addChild(a),s.attach(a)}tick(e){this.#n(),this.childRenderer.tick(e)}#n(){const{renderContext:{room:e}}=this,t=this.renderContext.item,{clickableAnnotationHovered:n}=w.getState().levelEditor,{jsonItemId:r}=t,s=w.getState(),i=ec(s),a=tc(s),l=oc(s),c=r&&i?.jsonItemId===r&&!n,u=r&&a.includes(r),d=()=>r!==void 0&&(q(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&Wr(h)&&h.config.modifies.some(p=>p.expectType===t.type&&(p.targets===void 0||p.targets.includes(r))))||Wr(t)&&q(e.items).some(({jsonItemId:h,type:p})=>h!==void 0&&h===i?.jsonItemId&&t.config.modifies.some(f=>f.expectType===p&&(f.targets===void 0||f.targets.includes(h))))||t.type==="charles"&&q(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&h.type==="joystick"&&h.config.controls.some(p=>p===r))||t.type==="joystick"&&t.config.controls.some(h=>i?.jsonItemId===h));this.output.filters=c&&u?[Nr,l.type==="eyeDropper"?Hr:$r]:c?l.type==="eyeDropper"?Hr:$r:u?Nr:d()?ap:cp(t)?ip:Ei}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const dp=(o,e,t)=>e.general.editor?new up(e,t):t;class Ui extends yi{}const Jr=(o,e)=>{e.poly([k({}),k({x:o.x}),k({x:o.x,y:o.y}),k({y:o.y})]).poly([k({}),k({z:o.z}),k({y:o.y,z:o.z}),k({y:o.y})]).poly([k({x:o.x}),k({x:o.x,z:o.z}),k(o),k({x:o.x,y:o.y})]).poly([k({z:o.z}),k({x:o.x,z:o.z}),k({x:o.x,y:o.y,z:o.z}),k({y:o.y,z:o.z})])},qr=(o,e)=>{const t=new ee;return Jr(o,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),Jr(o,t),t.stroke({width:.5,color:e,alpha:1})}),t},hp={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class pp{constructor(e){this.renderContext=e;const{item:t}=e,n=hp[t.type]??"rgba(255,255,255)";if(this.#e=new y({label:`ItemBoundingBoxRenderer ${t.id}`}),Mt("portal")(t)){const s=k(t.config.relativePoint);this.#e.addChild(new ee().circle(s.x,s.y,5).stroke(n)),this.#e.addChild(new ee().circle(s.x,s.y,2).fill(n))}if(this.#e.addChild(new ee({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(qr(t.aabb,n)),t.renderAabb){const s="rgba(184, 184, 255)",i=qr(t.renderAabb,s);if(t.renderAabbOffset){const a=k(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(r=new xc({text:s,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)}),e.frontLayer.attach(this.#e)}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const fp=75;class mp{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const n=e.room.color.shade==="dimmed"?uo:g;this.#e=new Ko(n.moss),this.#t=new Ko(n.midRed),this.#n=new ge({color:n.pureBlack}),this.#e.enabled=!1,this.#t.enabled=!1,this.#n.enabled=!1,this.output.filters=[this.#e,this.#t,this.#n]}output=new y({label:"ItemFlashOnSwitchedRenderer"});#e;#t;#n;tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:n}},room:{roomTime:r}}}=this,s=r-t<fp,i=n==="left";this.#e.enabled=s&&i,this.#t.enabled=s&&!i,this.#n.enabled=s,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const gp=(o,e)=>{const{item:t,room:{items:n}}=o;return q(n).filter(ol).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new mp(o,e):e},Vi=(o,e,t,n)=>{const r=1/n;o.x=Sr(e,r),o.y=Sr(t,r)},Gi=new mc;Gi.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class bp{constructor(e,t){this.renderContext=e,this.wrappedRenderer=t,this.output=new y({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#t()}output;#e=new Map;#t(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=k(this.renderContext.item.state.position);Vi(this.output,t.x,t.y,e)}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#t(),this.#s()}#n(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return ot;let n;for(const[r,s]of t)s&&(n||(n=new Set),n.add(r));return n??ot}#o(e,t){const n=new y({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(n),n.setMask({mask:t,inverse:!0}),this.#e.set(e,n),n}#r(e,t){const[n,r]=t.children,s=t.parent;s.removeChild(t),s.addChild(r),t.mask=null,n.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#n();for(const n of this.#e.keys())if(!t.has(n)){const r=this.#e.get(n);if(r)try{this.#r(n,r)}catch(s){throw new Error(`error while destroying masking container ${Ho(r)} 
              for our rendering: ${Ho(this.output)}`,{cause:s})}}for(const n of t){const r=this.#e.get(n),s=r?.children[0],i=this.renderContext.getItemRenderPipeline(n)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=Gi;const l=se(e,i,s,`red mask: ${n}`);i.filters=a,r===void 0&&this.#o(n,l);const c=this.renderContext.room.items[n],u=te(k(c.state.position),k(this.renderContext.item.state.position));l.x=u.x,l.y=u.y}}destroy(){this.output.destroy({children:!0}),this.wrappedRenderer?.destroy()}}const Fo=(o,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:n})=>{const r=n?.renderProps,s=it(t)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=b({textureId:s==="left"||s==="away"?`shadowMask.${o}.away`:`shadowMask.${o}.right`,spritesheetVariant:"original"});return a.y=-(C.z*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},yp={left:"away",towardsLeft:"awayRight",towards:"right"},vp=(o,e,t)=>{if(!e)return`shadowMask.${o}.${t}`;const n=`shadowMask.${o}.falling.${t}`;return Ms(n)?n:`shadowMask.${o}.${t}`},zo=(o,e=1)=>({renderContext:{item:{state:{visualFacingVector:t,facing:n,action:r}}},currentRendering:s})=>{const i=s?.renderProps,a=co(t??n)??"towards",l=r==="falling";if(!(i===void 0||a!==i.facingXy8||l!==i.falling))return"no-update";const u=yp[a],h=vp(o,l,u??a),p=b({textureId:h,spritesheetVariant:"original"});return p.y=-(C.z*(e-1)),p.scale.x=u===void 0?1:-1,{output:p,renderProps:{facingXy8:a,falling:l}}},xp=({renderContext:{general:{pixiRenderer:o},item:e,room:t},currentRendering:n})=>{const{state:{stoodOnBy:r},config:{times:s}}=e,i=n?.renderProps,a=dt(e),l=a&&we(r,t).find(oe)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:ut(o,bo({textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.artificial",spritesheetVariant:"original"},s)),renderProps:{flashing:l,activated:a}}:"no-update"},Zr={lift:Q({textureId:"shadowMask.smallBlock",spritesheetVariant:"original"}),conveyor:he(({direction:o})=>({textureId:"shadowMask.conveyor",flipX:tt(o)==="x",spritesheetVariant:"original"})),doorLegs:he(({direction:o})=>({textureId:o==="right"||o==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:tt(o)==="y",spritesheetVariant:"original"})),teleporter:xp,floor:"no-mask",barrier:he(({axis:o})=>({textureId:"shadowMask.barrier.y",flipX:o==="x",y:-1,spritesheetVariant:"original"})),spring:Ed,block:he(({style:o})=>({textureId:`shadowMask.${o}`,spritesheetVariant:"original"})),pushableBlock:Q({textureId:"shadowMask.stepStool",spritesheetVariant:"original"}),movingPlatform:Q({textureId:"shadowMask.sandwich",spritesheetVariant:"original"}),hushPuppy:Q({textureId:"shadowMask.hushPuppy",spritesheetVariant:"original"}),portableBlock:he(({style:o})=>({textureId:o==="drum"?"shadowMask.drum":"shadowMask.smallBlock",spritesheetVariant:"original"})),slidingBlock:he(({style:o})=>o==="book"?{textureId:"shadowMask.book",flipX:!0,spritesheetVariant:"original"}:{textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),deadlyBlock:he(({style:o})=>({textureId:o==="volcano"?"shadowMask.volcano":"shadowMask.toaster",spritesheetVariant:"original"})),spikes:Q({textureId:"shadowMask.spikes",spritesheetVariant:"original"}),switch:Q({textureId:"shadowMask.switch",spritesheetVariant:"original"}),button:Q({textureId:"shadowMask.buttonInGame",spritesheetVariant:"original"}),pickup:he(({gives:o})=>{switch(o){case"scroll":return{textureId:"shadowMask.scroll",spritesheetVariant:"original"};case"doughnuts":return{textureId:"shadowMask.doughnuts",spritesheetVariant:"original"};case"fast":case"extra-life":case"jumps":case"shield":return{textureId:"shadowMask.whiteRabbit",spritesheetVariant:"original"};default:return{textureId:"blank",spritesheetVariant:"original"}}}),slidingDeadly:Q({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),ball:Q({textureId:"shadowMask.ball",spritesheetVariant:"original"}),"monster.dalek":Q({textureId:"shadowMask.dalek",spritesheetVariant:"original"}),"monster.turtle":Fo("turtle"),"monster.skiHead":Fo("skiHead"),"monster.homingBot":Q({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),joystick:Q({textureId:"shadowMask.joystick",spritesheetVariant:"original"}),charles:Fo("charles",2),head:zo("head"),heels:zo("heels"),headOverHeels:zo("head",2)},wp=o=>{switch(o.type){case"monster":return Zr[`monster.${o.config.which}`];case"floor":return o.config.floorType==="none"?void 0:"no-mask";default:return Zr[o.type]}},Cp=.66,Sp=o=>o.shadowCastTexture!==void 0,Ne={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:nl}};class Tp{constructor(e,t){this.renderContext=e,this.appearance=t,this.#e.addChild(this.#t),this.#r||(this.#e.filters=new pc({alpha:Cp}))}#e=new y({label:"ItemShadowRenderer"});#t=new y({label:"shadows"});#n;#o=new Map;initShadowMaskRenderer(){const{renderContext:e,appearance:t}=this;if(t!=="no-mask")if(this.#n=new Ui(e,t),e.item.shadowOffset===void 0)this.#e.addChild(this.#n.output);else{const n=new y({label:"shadowMaskOffset",children:[this.#n.output],...k(e.item.shadowOffset)});this.#e.addChild(n)}}get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#s(e){if(this.#n===void 0)return;const t=this.#n.output.children.at(0);this.#n.tick(e);const n=this.#n.output.children.at(0);if(n===void 0||!(n instanceof N)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${n}`)}t!==n&&(this.#r?this.renderContext.frontLayer.attach(n):this.#e.mask=n)}destroy(){this.#e.destroy(!0),this.#n?.destroy();for(const e of Object.values(this.#o))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:n,general:{pixiRenderer:r},room:s}=this.renderContext,i=t.has(n),a=n.state.position.z+n.aabb.z;Ne.state.position.x=n.state.position.x,Ne.state.position.y=n.state.position.y,Ne.state.position.z=a,Ne.aabb.x=n.aabb.x,Ne.aabb.y=n.aabb.y;const l=new Set(Is(Ne,s[yn],u=>u!==n&&Sp(u)&&(u.castsShadowWhileStoodOn||u.state.position.z>n.state.position.z+n.aabb.z)&&!u.noShadowCastOn?.includes(n.type)));let c=!1;for(const[u,d]of this.#o)l.has(u)||(this.#t.removeChild(d),d.destroy(),this.#o.delete(u));for(const u of l){c=!0;let d=this.#o.get(u),h=!1;if(!d){const{times:p}=u.config,{shadowCastTexture:f}=u,m=bo(typeof f=="string"?{textureId:f}:f,p);d=ut(r,m),d.label=u.id,this.#t.addChild(d),this.#o.set(u,d),h=!0}if(h||i||t.has(u)){const p=k({...Ze(te(u.state.position,n.state.position),u.shadowOffset??J),z:n.aabb.z});d.x=p.x,d.y=p.y}}this.#e.visible=c,c?(this.#n===void 0&&this.initShadowMaskRenderer(),this.#s(e)):this.#n!==void 0&&(this.#n.destroy(),this.#n=void 0)}get output(){return this.#e}}const kp=o=>{const e=wp(o.item);return e===void 0?void 0:new Tp(o,e)};class Ip{constructor(e,t){this.renderContext=e,this.componentRenderers=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}class Rp{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const{general:{colourised:n},room:r}=e;this.#e=new ge({color:n?(r.color.shade==="dimmed"?uo:g).moss:Y(r.color)}),this.#e.enabled=!1,this.output.filters=this.#e}output=new y({label:"PortableItemPickUpNextHighlightRenderer"});#e;tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;this.#e.enabled=t,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Pp=(o,e,t)=>vn(o)?new Rp(e,t):t,Mp=(o,e)=>{e!==void 0&&w.getState().gameMenus.cheatsOn&&(e.eventMode="static",e.on("pointertap",()=>{w.dispatch(il({item:o,pixiContainer:e}))}))},Bp=o=>{const e=w.getState(),t=rl(e),n=!sl(e),{general:{paused:r}}=o,{item:s}=o,i=t==="all"||t==="non-wall"&&o.item.type!=="wall",a=[],l=zi(s);let c;if(l!==void 0){c=new Ui(o,l);const f=gp(o,c);a.push(dp(s,o,Pp(s,o,f)))}if(n&&!r){const f=kp(o);f!==void 0&&a.push(f)}i&&a.push(new pp(o));let u;if(a.length===0)u=void 0;else{const f=a.length===1?a[0]:new ep(a,o);u=new bp(o,f),Mp(s,u.output)}const d=o.general.soundSettings.mute??lt.soundSettings.mute,h=r||d?void 0:Wh(o),p=h===void 0?void 0:new Kh(o,h);return{top:new Ip(o,{graphics:u,sound:p}),itemAppearanceRenderer:c}},Ap=o=>{for(const[,l]of o)for(const[c]of l)l.set(c,!1);const e=Array.from(Op(o));let t=e.length,n=t;const r=new Array(t),s={},i=_p(e);for(;n--;)s[n]||a(e[n],n,new Set,null);return r;function a(l,c,u,d){if(u.has(l)){if(d!==null){const f=o.get(d);f?.has(l)&&f.set(l,!0)}return}if(s[c])return;s[c]=!0;const h=o.get(l),p=Array.from(h?.entries()??ot);if(c=p.length){u.add(l);do{const[f,m]=p[--c];m||a(f,i.get(f),u,l)}while(c);u.delete(l)}r[--t]=l}};function Op(o){const e=new Set;for(const[t,n]of o.entries()){e.add(t);for(const r of n.keys())e.add(r)}return e}function _p(o){const e=new Map;for(let t=0,n=o.length;t<n;t++)e.set(o[t],t);return e}const Dp=(o,e,t,n)=>(o.has(e)||o.set(e,new Map),o.get(e).set(t,n),o),gt=(o,e,t)=>{const n=o.get(e);return n!==void 0&&(n.delete(t),n.size===0&&o.delete(e)),o},Lo=1e-5,Qr=-1,bt=(o,e,t,n,r)=>n-r>o&&t<e-r,Fp=0,$i=1,Hi=2,Ni=3,zp=(o,e)=>{const t=bt(o.zAxisProjectionMin,o.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,Lo),n=bt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Lo),r=bt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Lo);return n&&r&&t?$i:r&&t&&bt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Qr)?Hi:n&&t&&bt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Qr)?Ni:Fp},Lp=(o,e,t,n)=>{for(const r of Fs){const s=o[r],i=s+e[r],a=t[r],l=a+n[r];if(i<=a)return 1*(r==="z"?-1:1);if(s>=l)return-1*(r==="z"?-1:1)}return Kr(t)-Kr(o)},Ep=(o,e,t)=>{if(o.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=o.renderAabbOffset?Z(o.state.position,o.renderAabbOffset):o.state.position,r=o.renderAabb||o.aabb,s=e.renderAabbOffset?Z(e.state.position,e.renderAabbOffset):e.state.position,i=e.renderAabb||e.aabb;switch(zp(t.getItemAxesProjections(o),t.getItemAxesProjections(e))){case $i:return Lp(n,r,s,i);case Hi:return ce(n.y,s.y+i.y)&&ce(n.z,s.z+i.z)?1:ce(s.y,n.y+r.y)&&ce(s.z,n.z+r.z)?-1:0;case Ni:return ce(n.x,s.x+i.x)&&ce(n.z,s.z+i.z)?1:ce(s.x,n.x+r.x)&&ce(s.z,n.z+r.z)?-1:0;default:return 0}},Kr=o=>o.x+o.y-o.z,Up=(o,e=new al(ie(o)),t=new Set(ie(o)),n=new Map)=>{const r=new Map;for(const[s,i]of n)if(!o[s])n.delete(s);else for(const[a]of i)o[a]||gt(n,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=n.get(s.id);a?.forEach((l,c)=>{i.has(o[c])||a.delete(c)}),n.forEach((l,c)=>{i.has(o[c])||gt(n,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||r.get(a)?.has(s))continue;const l=Ep(s,a,e);if(r.has(s)||r.set(s,new Set),r.get(s).add(a),l===0){gt(n,s.id,a.id),gt(n,a.id,s.id);continue}const c=l>0?s.id:a.id,u=l>0?a.id:s.id;Dp(n,u,c,!1),gt(n,c,u)}}return n};class Vp{constructor(e){this.renderContext=e;const{general:{colourised:t,soundSettings:n},room:r}=e,i=n.mute??lt.soundSettings.mute?void 0:S.createGain();this.output={sound:i,graphics:new y({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t||(this.#n=new sr({sortableChildren:!1}),this.output.graphics.addChild(this.#n)),this.output.graphics.addChild(this.#o),t||(this.#t.tint=Y(r.color))}#e=!1;#t=new y({label:"items",cullableChildren:!0});#n;#o=new sr({sortableChildren:!1});output;#r=void 0;#s=new Map;#i=new Map;#c=e=>this.#i.get(e);#a(e,t){let n=this.#i.get(t.id);if(n===void 0){n=Bp({...this.renderContext,colourClashLayer:this.#n,frontLayer:this.#o,item:t,zEdges:this.#s,getItemRenderPipeline:this.#c}),this.#i.set(t.id,n);const{graphics:r,sound:s}=n.top.output;if(r&&(this.#t.addChild(r),t.fixedZIndex&&(r.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{n.top.tick(e)}catch(r){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:r})}}#l(e){const{room:t}=this.renderContext,n={...e,lastRenderRoomTime:this.#r},r=new Set,s=a=>{if(r.has(a))return;const l=this.#s.get(a);if(l)for(const[c,u]of l.entries())u&&s(c);this.#a(n,t.items[a]),r.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#i.entries())t.items[a]===void 0&&(l.top.destroy(),this.#i.delete(a),i=!0);i&&this.#u()}#u(){if(this.#n)for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e);for(const e of this.#o.renderLayerChildren)e.parent===null&&this.#o.detach(e)}#d(e){for(let t=0;t<e.length;t++){const n=this.#i.get(e[t]);if(n===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const r=n.top.output.graphics;if(!r)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);r.zIndex=t}}get#h(){return this.#r!==void 0}tick(e){const t=this.#h?e:{...e,movedItems:new Set(q(this.renderContext.room.items))},{renderContext:{room:n}}=this;Up(n.items,n[yn],t.movedItems,this.#s);const r=Ap(this.#s);this.#l(t),(!this.#h||t.movedItems.size>0)&&this.#d(r),this.#r=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#i.forEach(e=>{e.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const je=.4,Gp=300,$p=36,Hp=.2,Np=1250,es=(o,e)=>Cs(o,Math.min(1,e/Gp));class jp{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:n,general:{upscale:{gameEngineScreenSize:r},displaySettings:s}}=e,{floors:{edgeLeftX:i,edgeRightX:a,bottomEdgeY:l},allItems:{topEdgeY:c}}=Tn(n);this.#c=i,this.#a=a;const u=(a+i)/2,d=a-i,h=l-c,p=r.y>=h,f=p&&r.x>=d,m=p?16:ll()==="mobile"?-4:0;this.#l={x:r.x/2-u,y:r.y-m-l-(f?Math.abs(u/2):0)},this.#r=this.#l.x+this.#c<0,this.#s=this.#l.x+this.#a>r.x,this.#i=this.#l.y+c<0;const v=this.childRenderer.output.graphics;if(v===void 0)throw new Error("can't scroll a renderer without graphics");const x={sound:this.childRenderer.output.sound,graphics:new y({children:[v],label:`RoomScrollRenderer(${n.id})`})};(s?.showBoundingBoxes??lt.displaySettings.showBoundingBoxes)!=="none"&&x.graphics.addChild(Xp(e.room)),this.output=x}#e={x:0,y:0};#t={x:0,y:0};#n=xe;#o=!1;#r;#s;#i;#c;#a;#l;output;#u(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=this.#e,n=this.output.graphics,r=Ze(t,this.#t);Vi(n,r.x,r.y,e)}#d(e){const{general:{gameState:t},room:{roomTime:n}}=this.renderContext,{deltaMS:r}=e,{inputStateTracker:{lookVector:s,hudInputState:{lookVector:i}}}=t;Jt(s)+Jt(i)<re?this.#n<n-Np&&(this.#t=te(this.#t,es(this.#t,r))):(this.#n=n,this.#t=Bt(Z(this.#t,B(s,r*Hp)),i),i.x=0,i.y=0)}tick(e){const{general:{upscale:{gameEngineScreenSize:t},gameState:n}}=this.renderContext,{deltaMS:r}=e;this.#d(e);const s=at(n);if(s===void 0)return;const i=k(s.state.position),a=Z(i,this.#l),l={x:this.#r&&a.x<t.x*je?Math.min(-this.#c,t.x*je-i.x):this.#s&&a.x>t.x*(1-je)?Math.max(t.x-this.#a,t.x*(1-je)-i.x):this.#l.x,y:this.#i&&a.y<t.y*je?t.y*je-i.y:this.#l.y};if(!this.#o)this.#e=l;else{const u=te(this.#e,l);if(Jt(u)>$p){const d=es(u,r);this.#e={x:this.#e.x-d.x,y:this.#e.y-d.y}}}this.#u(),this.#o=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Xp=o=>{const{floors:{edgeLeftX:e,edgeRightX:t,bottomEdgeY:n,topEdgeY:r},allItems:{topEdgeY:s}}=Tn(o);return new ee().rect(e,s,t-e,n-s).stroke("red").rect(e,r,t-e,n-r).stroke("blue")};var Wp=`#version 300 es
precision highp float;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const int sampleCount=4;const float dimmedAttributeLum=0.6;const float isDimThresh03=1.5;const float saturationThreshold=0.15;const vec3 channelStrengthModifier=vec3(0.8,1.0,1.1);const vec4 pureWhiteColour=vec4(1.0,1.0,1.0,1.0);const vec4 pureBlueColour=vec4(0.0,0.0,1.0,1.0);const vec4 pureBlackColour=vec4(0.0,0.0,0.0,1.0);vec2 attributeBlockPos(vec2 texSize,float blockSize,vec2 textureCoord){vec2 pixelPos=textureCoord*texSize;return(floor(pixelPos/blockSize)*blockSize)/texSize;}vec4 attributeClash(sampler2D inputTexture,sampler2D lut,float blockSize,float blackPoint,float inputDim,vec2 textureCoord){vec2 textureSize=vec2(textureSize(inputTexture,0));vec2 blockPos=attributeBlockPos(textureSize,blockSize,textureCoord);vec3 colorSum=vec3(0.0);float colouredSamplesCount=0.001;vec2 stepSize01=vec2(blockSize/float(sampleCount))/textureSize;vec2 samplePos01=blockPos;for(int y=0;y<sampleCount;y++){samplePos01.y+=stepSize01.y;samplePos01.x=blockPos.x;for(int x=0;x<sampleCount;x++){samplePos01.x+=stepSize01.x;vec4 sampleColor=lutColourReplace(lut,texture(inputTexture,samplePos01))*inputDim;float isInBounds=step(0.0,samplePos01.x)*step(samplePos01.x,1.0)*step(0.0,samplePos01.y)*step(samplePos01.y,1.0);float useSample=isNotBlack(sampleColor,blackPoint)*isInBounds;colorSum+=sampleColor.rgb*sampleColor.rgb*useSample;colouredSamplesCount+=useSample;}}vec3 avgColor=colorSum/colouredSamplesCount;float avgColorLum03=max(avgColor.r+avgColor.g+avgColor.b,0.01);vec3 channelsStrength=avgColor/avgColorLum03;vec4 quantisedColor=vec4(step(0.3,channelsStrength*channelStrengthModifier),0.1);float maxChannel=max(channelsStrength.r,max(channelsStrength.g,channelsStrength.b));float minChannel=min(channelsStrength.r,min(channelsStrength.g,channelsStrength.b));float sat=maxChannel-minChannel;float isSaturated01=step(saturationThreshold,sat);float isBright=step(isDimThresh03,avgColorLum03);float thresholdForUnsatToBeBlue=step(isDimThresh03*0.3,avgColorLum03);float thresholdForSaturatedToBeBlue=step(isDimThresh03*0.03,avgColorLum03);vec4 unsatOrQuantisedColor=mix(mix(pureBlueColour,pureWhiteColour,thresholdForUnsatToBeBlue),mix(pureBlueColour,quantisedColor,thresholdForSaturatedToBeBlue),isSaturated01);float dimMultiplier=mix(dimmedAttributeLum,1.0,isBright);vec4 dimmedColor=unsatOrQuantisedColor*dimMultiplier;vec4 c=lutColourReplace(lut,texture(inputTexture,textureCoord))*inputDim;float originalColorIsNotBlack=isNotBlack(c,blackPoint);return mix(pureBlackColour,dimmedColor,originalColorIsNotBlack);}in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform float uBlockSize;uniform float uBlackPoint;uniform float uProgress;uniform sampler2D uLut;uniform float uCentreX;uniform float uCentreY;uniform vec4 uInputClamp;const float blackCircleMinSize=0.33;const float blackCircleFeathering=0.4;const float fadeDuration=0.1;float fade(){return 1.0-smoothstep(1.0 - fadeDuration,1.0,uProgress);}float blockDistToCentre(float ellipticalFactor){float xCentreTrue=uInputClamp.x+(uInputClamp.z-uInputClamp.x)*uCentreX;float yCentreTrue=uInputClamp.y+(uInputClamp.w-uInputClamp.y)*uCentreY;vec2 trueCentre=vec2(xCentreTrue,yCentreTrue);vec2 texSize=vec2(textureSize(uTexture,0));float texAspect=texSize.x/texSize.y;vec2 blockPos=attributeBlockPos(texSize,uBlockSize,vTextureCoord);return length((blockPos-trueCentre)/vec2(1,texAspect*ellipticalFactor));}float isInCirc(float blockDistToCentre01,float feathering,float circleMinSize,float progress){return smoothstep(progress-feathering,progress+feathering,pow(1.0-blockDistToCentre01,3.0)+circleMinSize);}void main(void){float elipticalFactor=mix(1.0,0.5,uProgress);float blockDistToCentre=blockDistToCentre(elipticalFactor);float insideBlackCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,blackCircleMinSize,uProgress-0.2);float insideInnerCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,0.0,uProgress*1.5-0.3);vec4 clashColour=attributeClash(uTexture,uLut,uBlockSize,uBlackPoint,max(insideBlackCirc01-pow(uProgress,4.0),0.0),vTextureCoord);vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(clashColour,c,insideInnerCirc01*fade());}`;const Yp=U.from({vertex:be,fragment:Wp,name:"attribute-block-filter"});class Jp extends E{uniforms;constructor({blockSize:e=8,blackPoint:t=.1,centreX:n=.5,centreY:r=.5}={}){super({glProgram:Yp,resources:{attributeBlockUniforms:{uBlockSize:{value:e,type:"f32"},uBlackPoint:{value:t,type:"f32"},uProgress:{value:0,type:"f32"},uCentreX:{value:n,type:"f32"},uCentreY:{value:r,type:"f32"}},uLut:Zl.source}}),this.uniforms=this.resources.attributeBlockUniforms.uniforms}set progress(e){this.resources.attributeBlockUniforms.uniforms.uProgress=e}set centreX(e){this.resources.attributeBlockUniforms.uniforms.uCentreX=e}set centreY(e){this.resources.attributeBlockUniforms.uniforms.uCentreY=e}}class qp{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:n}=e,r=this.childRenderer.output.graphics,s={sound:this.childRenderer.output.sound,graphics:new y({children:[r],label:`TeleportEffectRenderer(${n.id})`})};this.output=s,this.#n()}output;#e;#t(e){const t=Z(e.state.position,B(e.aabb,.5)),{x:n,y:r}=k(t),s=this.output.graphics.getLocalBounds();this.output.graphics.filterArea=s.rectangle,this.#e.centreX=(n-s.x)/s.width,this.#e.centreY=(r-s.y)/s.height}#n(){const{renderContext:{general:{gameState:{currentCharacterName:e}},room:{items:t}}}=this,n=t[e];if(n!==void 0){const{teleporting:r}=n.state;if(this.#e===void 0!=(r===null))if(r!==null){const{renderContext:{general:{upscale:{gameEngineUpscale:s}}}}=this;this.#e=new Jp({blockSize:s*8}),this.#t(n),this.output.graphics.filters=[this.#e]}else this.#e=void 0,this.output.graphics.filters=Ke;else if(r!==null){const{timeRemaining:s,phase:i}=r,a=s/oo,l=i==="in"?a:1-a;this.#e.progress=l,this.#t(n)}}}tick(e){this.childRenderer.tick(e),this.#n()}destroy(){this.output.graphics.destroy({children:!0}),this.#e?.destroy(),this.childRenderer.destroy()}}const yt=o=>({avgMs:o.avgMs.toFixed(2),percentage:o.percentage.toFixed(1)+"%",fps:(1e3/o.avgMs).toLocaleString("en-GB",{maximumFractionDigits:0})}),Zp=o=>{const{frameCount:e,fps:t,theoreticalFps:n,phases:r,elapsedMs:s}=o;console.log(`Frame timing (${e} frames in ${(s/1e3).toFixed(3)}s, ${t.toFixed(1)} fps, theoretical max: ${n.toLocaleString("en-GB",{minimumFractionDigits:1,maximumFractionDigits:1})} fps):`),console.table({physics:yt(r.physics),hudUpdateSceneGraph:yt(r.hudUpdateSceneGraph),updateSceneGraph:yt(r.updateSceneGraph),"pixi.js app.render":yt(r.pixiRender),total:{...yt(r.total),percentage:"100%"}})},Qp=()=>{typeof window<"u"&&(window.detailedFps=()=>{kt.on(Zp)},console.log("%cPerformance timing available:","color: #4CAF50; font-weight: bold"),console.log("call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)"))},on=(o,e)=>{if(o.lives=ue(o.lives,-1),o.lives===0&&e!==void 0){const t=rt(e.lives);t>=2&&(o.lives=ue(o.lives,1),e.lives=ue(e.lives,t>2?-2:-1))}},ji=(o,e)=>{const t=et(e);if(t===void 0)return;const{carrying:n}=t;n!==null&&(F({room:o,item:n,atPosition:e.state.position}),t.carrying=null)},Kp=(o,e)=>{const t=o.characterRooms.headOverHeels;if(on(e.state.head,e.state.heels),on(e.state.heels,e.state.head),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0)return;const r=rt(e.state.head.lives)>0,s=rt(e.state.heels.lives)>0;if(ji(t,e),r&&!s||!r&&s){const c=r?"head":"heels";o.currentCharacterName=c,ke(o,e);const u=Wn(e)[c],d=qe({gameState:o,playableItems:[u],roomId:t.id});o.characterRooms={[c]:d},o.entryState={[c]:Yn(u)};return}if(o.entryState.headOverHeels!==void 0){ke(o,e);const c=qe({gameState:o,playableItems:[e],roomId:t.id});o.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Wn(e);if(ke(o,c),ke(o,u),ul(c,u)){const d=zs({head:c,heels:u});ke(o,d,"heels");const h=qe({gameState:o,playableItems:[d],roomId:t.id});o.characterRooms={headOverHeels:h},o.entryState={headOverHeels:Yn(d)};return}else{const d=qe({gameState:o,playableItems:[c,u],roomId:t.id});o.characterRooms={head:d,heels:d};return}}},qe=({gameState:o,playableItems:e,roomId:t})=>{const n=dl(w.getState()),r=hl({roomJson:n.rooms[t],roomPickupsCollected:o.pickupsCollected[t]??X,scrollsRead:w.getState().gameMenus.gameInPlay.scrollsRead});for(const s of e)F({room:r,item:s}),(s.type==="head"||s.type==="headOverHeels")&&pl(r,o);return r},ke=(o,e,t=e.id)=>{const n=o.entryState[t];e.state={...e.state,...n,expires:null,standingOnItemId:null}},ef=o=>{o.state.standingOnItemId=null,o.state.previousStandingOnItemId=null,o.state.standingOnUntilRoomTime=xe},tf=(o,e)=>{const t=Ls(o,ro(e.type));e.state.lastDiedAt=e.state.gameTime;const n=o.characterRooms[e.type];if(ji(n,e),ef(e),on(e.state,t?.state),e.state.lives===0){delete o.characterRooms[e.id],t!==void 0&&(o.currentCharacterName=t.type);return}else{ke(o,e);const r=t===void 0?void 0:o.characterRooms[t.type];if(n===r){if(o.entryState.headOverHeels!==void 0){const a=zs({head:e.id==="head"?e:n.items.head,heels:e.id==="heels"?e:n.items.heels});ke(o,a);const l=qe({gameState:o,playableItems:[a],roomId:n.id});o.characterRooms={headOverHeels:l},o.currentCharacterName="headOverHeels";return}F({room:n,item:e});return}else{const i=qe({gameState:o,playableItems:[e],roomId:n.id});o.characterRooms[e.id]=i;return}}},of=(o,e)=>{w.dispatch(cl({characterLosingLifeItem:e})),e.type==="headOverHeels"?Kp(o,e):tf(o,e),at(o)===void 0&&w.dispatch(Vo({offerReincarnation:!0}))},nf=o=>{for(const e of q(o.items))try{for(const t of we(e.state.stoodOnBy,o)){if(!o.items[t.id]){no(t,o);continue}if(!xs(t,e)){no(t,o);const n=Rs(t,fl(o.items));n!==void 0&&pn({above:t,below:n})}}}catch(t){throw new Error(`could not update standing on for item "${e.id}"`,{cause:t})}},ts=an*De.animations["particle.head.fade"].length*(1/De.animations["particle.head.fade"].animationSpeed),rf=20,sf=38,af=.5,Nt=C.x/2;let lf=0;const Xi=(o,e)=>Math.random()<o*(e/1e3),Wi=(o,e,t,n)=>({...gn,id:`particle.${o}.${lf++}`,type:"particle",aabb:R,config:{forCharacter:e},state:{...mn(),expires:n+ts+Math.random()*ts,position:t}}),Yi=(o,e,t,n)=>{if(!Xi(t,n))return;const r={...Z(Ss(o),{x:Math.random()*Nt-Nt/2,y:Math.random()*Nt-Nt/2}),z:o.state.position.z};F({room:e,item:Wi(o.id,o.type,r,e.roomTime)})},cf=(o,e,t)=>{!(_n(o.state)>0)||o.state.standingOnItemId===null||Le(o.state.vels.walking)<re||Yi(o,e,rf,t)},uf=(o,e,t)=>{const{isBigJump:n}=o.state;n&&o.state.standingOnItemId===null&&(o.state.vels.gravity.z<=0||Yi(o,e,sf,t))},df=(o,e)=>{const{head:t,heels:n}=io(o.items);t!==void 0&&cf(t,o,e),n!==void 0&&uf(n,o,e)},hf=(o,e,t)=>{if(!Xi(af,t))return;const n=Rn(Fs),r=Z(e.state.position,{x:n==="x"?0:Math.random()*C.x,y:n==="y"?0:Math.random()*C.y,z:n==="z"?C.z:Math.random()*C.z});F({room:o,item:Wi(e.id,"crown",r,o.roomTime)})},pf=(o,e,t)=>{o.gameTime+=t,e.roomTime+=t;const n=at(o);if(n!==void 0){if(n.type==="headOverHeels")n.state.head.gameTime+=t,n.state.heels.gameTime+=t;else if(n.state.gameTime+=t,o.characterRooms.head===o.characterRooms.heels){const s=Ls(o,ro(n.type));s!==void 0&&(s.state.gameTime+=t)}}},ff=o=>{for(const e of q(o.items)){const t=e.state.position,n=ml(t);n!==t&&Es(o,e,n)}},mf=(o,e)=>o.state.expires!==null&&o.state.expires<e.roomTime,gf=(o,e)=>{const t={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1,wall:1,floor:1},n=t[o.type]??0,r=t[e.type]??0;return n-r},bf=(o,e)=>{for(const t of q(o.items))if(!(!Ue(t)||o.roomTime===t.state.actedOnAt.roomTime)&&!gl(t.state.position)){const n=bl(t.state.position);Es(o,t,n),e.add(t)}},Ji=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),yf=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),jt=C.x*3,vf=(o,e)=>{const{state:{position:t}}=o,{state:{position:n}}=e;return t.x>n.x-jt&&t.x<n.x+jt&&t.y>n.y-jt&&t.y<n.y+jt},os=(o,e,t,n,r)=>{if(r&&o.state.activated)return W;const s=fo(o.state.position,e);return s===void 0?W:vf(o,s)?Ji:yf},xf=(o,e,t,n)=>o.state.activated?W:we(o.state.stoodOnBy,e).some(oe)?Ji:W,wf=(o,e,t,n)=>{switch(o.config.activated){case"after-player-near":return os(o,e,t,n,!0);case"while-player-near":return os(o,e,t,n,!1);case"on-stand":return xf(o,e);case"off":case"on":return W;default:throw o.config,new Error(`unrecognised item.config.activation ${o.config.activated} in ${o.id}:
        ${JSON.stringify(o,null,2)}`)}},Cf={movementType:"steady",stateDelta:{pressed:!0}},Sf={movementType:"steady",stateDelta:{pressed:!1}},Tf=(o,e)=>{const{state:{stoodOnUntilRoomTime:t,stoodOnBy:n,pressed:r}}=o,s=t+vl,{roomTime:i}=e,a=!_s(yl(n));return!a&&i>s&&r?(Qo(o.config.modifies,"right",o,e),Sf):!r&&a?(Qo(o.config.modifies,"left",o,e),Cf):W},kf=(o,e,t,n)=>{const{id:r,state:s,config:i}=o,{roomTime:a}=e,{lastEmittedAtRoomTime:l,quantityEmitted:c,position:u}=s,d=s.emits??i.emits,h=s.period??i.period,p=s.maximum??i.maximum;if(c!==p&&l+h<a){const f=xl(wl(`${r}-${c}-${a}`,{...d,position:R},e.roomJson));if(f===void 0)throw new Error("emitter failed to create a new item");F({room:e,item:f,atPosition:Bt(u,B(f.aabb,.5))}),o.state.lastEmittedAtRoomTime=e.roomTime+h,o.state.quantityEmitted++}},If=Object.freeze({textureId:"shadow.smallRound",spritesheetVariant:"original"}),Rf=C.x*.75,Pf=500,Mf=(o,e,t,n)=>{const{inputStateTracker:r}=t,s=o.type==="head"?o.state:o.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=o,u=Pt(c);if(r.currentActionPress("fire")!=="released"&&a&&rt(i)>0){const d={type:"firedDoughnut",...gn,config:X,id:`firedDoughnut/${o.id}/${e.roomTime}`,shadowCastTexture:If,state:{...mn(),position:Z(l,B(u,Rf),o.type==="headOverHeels"?{z:C.z}:R),vels:{fired:B(u,ne.firedDoughnut)},disappearing:{on:"touch"}}};F({room:e,item:d}),s.doughnuts=ue(s.doughnuts,-1),r.inputWasHandled("fire",Pf)}},ns={movementType:"vel",vels:{gravity:R}},Bf=(o,e,t,n)=>{if(!st(o))return ns;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=o,l=Cl[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=At(i,e);return kn(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-Uo*n,-l)}}}:ns}else return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-Uo*n,-l)}}}};function*Af(o,{roomTime:e},t,n){const r=e,s=e-n,i=[];for(let a=0;a<o.state.latentMovement.length;a++){const l=o.state.latentMovement[a];if(l.startAtRoomTime>r)continue;if(l.endAtRoomTime<=s){i.push(a);continue}const c=Math.max(l.startAtRoomTime,s),d=Math.min(l.endAtRoomTime,r)-c;d>0&&(yield{movementType:"position",posDelta:B(l.velocity,d)}),l.endAtRoomTime<=r&&i.push(a)}for(let a=i.length-1;a>=0;a--)o.state.latentMovement.splice(i[a],1)}const rs=C.z,ss=.001,Of={movementType:"vel",vels:{lift:R}},_f=({z:o,lowestZ:e,highestZ:t,direction:n,currentVelocity:r,deltaMS:s})=>{const i=Se**2/(2*ht);if(n==="up"){const a=t-o;if(a<=i){const l=Math.max(0,a);return Math.max(ss,Math.sqrt(2*ht*l))}return r<Se?Math.min(Se,r+ht*s):Se}else{const a=o-e;if(a<=i){const l=Math.max(0,a);return Math.min(-ss,-Math.sqrt(2*ht*l))}return r>-Se?Math.max(-Se,r-ht*s):-Se}},Df=({state:{direction:o,bottom:e,top:t,position:{z:n},vels:r}},s,i,a)=>{const l=e*rs,c=t*rs;if(l===c&&ce(n,l))return Of;const u=r?.lift?.z??0,d=_f({z:n,lowestZ:l,highestZ:c,direction:o,currentVelocity:u,deltaMS:a});if(Number.isNaN(d))throw new Error("velocity is NaN");const h=n<=l?"up":n>=c?"down":o;return{movementType:"vel",vels:{lift:{x:0,y:0,z:d}},stateDelta:{direction:h}}},is={movementType:"vel",vels:{movingFloor:R}},Ff=(o,e,t,n)=>{if(oe(o)&&o.state.teleporting!==null)return is;const{state:{standingOnItemId:r}}=o,s=At(r,e);if(s===null||!Sl(s))return is;const{state:{direction:i}}=s,l=Tl(o)&&o.state.action==="moving"&&it(o.state.facing)===kl(i)?ne.heels:Il;return{movementType:"vel",vels:{movingFloor:B(St[i],l)}}},zf=(o,e,t,n)=>{const r=o.x*o.x+o.y*o.y,s=e.x*e.x+e.y*e.y;if(r<re||s<re)return o;const i=Math.atan2(o.x*e.y-o.y*e.x,o.x*e.x+o.y*e.y),a=Math.abs(i);if(a<re)return e;const l=a>Math.PI-re?a:i,c=t*n,u=Math.max(-c,Math.min(c,l)),d=Math.cos(u),h=Math.sin(u);return{x:o.x*d-o.y*h,y:o.x*h+o.y*d,z:o.z}},Lf=.009,Ef=(o,e,t,n)=>{const{state:{visualFacingVector:r,facing:s}}=o;return{movementType:"steady",stateDelta:{visualFacingVector:zf(r??s,s,Lf,n)}}},Uf=(o,e,t)=>{const n=uu(o);if(n!==void 0){const r=n*Pl,s=It(e)/Math.max(t,re);s>r&&Rl(e,r/s)}};function*Vf(o,e,t,n){if(Ue(o)&&(yield Bf(o,e,t,n),yield Ff(o,e),yield*Af(o,e,t,n)),oe(o)){if(yield Ci(o,e,t,n),yield Ef(o,e,t,n),yield vu(o,e,t,n),o.id===t.currentCharacterName){const r=Al(o);r&&$u(o,e,t,n),yield wi(o,e,t),r&&Hu(o,e,t),Ol(o)&&Mf(o,e,t)}}else kn(o)?yield Df(o,e,t,n):_l(o)?(yield wf(o,e,t,n),yield gu(o,e,t,n)):Dl(o)?kf(o,e):Fl(o)&&(yield Tf(o,e))}const Gf=(o,e,t,n)=>{if(!Ue(o)||o.state.standingOnItemId===null)return;const r=At(o.state.standingOnItemId,e);oe(o)&&r.type==="pickup"&&Ri({gameState:t,movingItem:o,touchedItem:r,room:e});const{state:{disappearing:s}}=r;s!==null&&(s.byType===void 0||s.byType.includes(o.type))&&ws({touchedItem:r,gameState:t,room:e})},Xt={x:0,y:0,z:0},$f={x:0,y:0,z:0},Hf=(o,e,t,n)=>{if(oe(o)&&o.state.standingOnItemId!==null){const a=At(o.state.standingOnItemId,e);(hn(a)||a.type==="spikes")&&Ii({room:e,movingItem:o})}const r=Vf(o,e,t,n).toArray();if(Gf(o,e,t),xi(Xt,o,r),Ue(o)||kn(o)||Ml(o))for(const a of ie(o.state.vels))cn(Xt,Ds($f,{...R,...a},n));Bl(o)&&hf(e,o,n),r.find(a=>a.movementType==="position")!==void 0||Uf(o,Xt,n),ks({subjectItem:o,posDelta:Xt,gameState:t,room:e,deltaMS:n,onTouch:Pi})},Nf=(o,e)=>{const t=nt(o);if(t===void 0)return ot;pf(o,t,e);const n=Object.fromEntries(zl(t.items).map(([i,a])=>[i,a.state.position]));for(const i of ie(t.items))mf(i,t)&&(bn({room:t,item:i}),oe(i)&&of(o,i));const r=Object.values(t.items).sort(gf);for(const i of r){const a=at(o);if(a===void 0||a.state.action==="death")break;if(t.items[i.id]!==void 0)try{Hf(i,t,o,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${i.id}"`,{cause:l})}}df(t,e),nf(t),ff(t);const s=new Set(ye(ie(t.items)).filter(i=>n[i.id]===void 0||!Ee(i.state.position,n[i.id])));return Bu(s,t,n,e),bf(t,s),s},jf=X,Xf=(o,e)=>(t,n)=>{const r=new Set;if(Ll(t)){const u=nt(t)?.items;if(u!==void 0){const d=ye(ie(io(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const a=Ie.shared.speed===0?1:Math.max(1,Math.ceil(n/e)),l=n/a;for(let u=0;u<a;u++){const d=o(t,l);for(const h of d)r.add(h)}const c=nt(t)?.items??jf;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},Wf=(o,e,t,n)=>{if(e){const r=n.shade==="dimmed";Uc(o,e,t,n),jc(o,t,n),Jc(o,r),Kc(o,r)}else gi()},Ce=`
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
`,Yf=`#version 300 es
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
}`,Jf={radius:1.2,cutoff:.88,intensity:.14,edgeBlur:.5};class qf extends E{uniforms;constructor(e={}){const t={...Jf,...e},n=U.from({vertex:Ce,fragment:Yf,name:"bloom-filter"});super({glProgram:n,resources:{bloomUniforms:{uRadius:{value:t.radius,type:"f32"},uCutoff:{value:t.cutoff,type:"f32"},uIntensity:{value:t.intensity,type:"f32"},uEdgeBlur:{value:t.edgeBlur,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.bloomUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Zf=`#version 300 es
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
}`,Qf={gamma:1,saturation:1,brightness:1,brightnessBottom:0};class as extends E{uniforms;constructor(e={}){const t={...Qf,...e},n=U.from({vertex:Ce,fragment:Zf,name:"color-adjustment-filter"});super({glProgram:n,resources:{colorAdjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uBrightnessBottom:{value:t.brightnessBottom,type:"f32"}}}}),this.uniforms=this.resources.colorAdjustmentUniforms.uniforms}}const qi=(o,e)=>o.replace(/\{\{(\w+)\}\}/g,(t,n)=>{if(n in e){const r=e[n];return typeof r=="boolean"?r?"1":"0":String(r)}return console.warn(`Shader placeholder {{${n}}} not found in values map`),t}),Kf=`#version 300 es
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
}`,em={curvatureX:.15,curvatureY:.15,multisampling:!0};class tm extends E{uniforms;constructor(e={}){const t={...em,...e},n=qi(Kf,{MULTISAMPLE:t.multisampling}),r=U.from({vertex:Ce,fragment:n,name:"curvature-filter"});super({glProgram:r,resources:{curvatureUniforms:{uCurvatureX:{value:t.curvatureX,type:"f32"},uCurvatureY:{value:t.curvatureY,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.curvatureUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const om=`#version 300 es
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
}`,nm={intensity:.04,scale:6,fps:30};class rm extends E{uniforms;startTime;constructor(e={}){const t={...nm,...e},n=U.from({vertex:Ce,fragment:om,name:"noise-filter"});super({glProgram:n,resources:{noiseUniforms:{uIntensity:{value:t.intensity,type:"f32"},uScale:{value:t.scale,type:"f32"},uFPS:{value:t.fps,type:"f32"},uTime:{value:0,type:"f32"}}}}),this.uniforms=this.resources.noiseUniforms.uniforms,this.startTime=performance.now()}apply(e,t,n,r){this.uniforms.uTime=performance.now()-this.startTime,super.apply(e,t,n,r)}}const sm=`#version 300 es
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
}`,im={pixelWidth:4,maskBrightness:.7,numSamples:4,transitionWidth:.3};class am extends E{uniforms;constructor(e={}){const t={...im,...e},n=qi(sm,{NUM_SAMPLES:t.numSamples}),r=U.from({vertex:Ce,fragment:n,name:"phosphor-mask-filter"});super({glProgram:r,resources:{phosphorMaskUniforms:{uPixelWidth:{value:t.pixelWidth,type:"f32"},uMaskBrightness:{value:t.maskBrightness,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uTransitionWidth:{value:t.transitionWidth,type:"f32"}}}}),this.uniforms=this.resources.phosphorMaskUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const lm=`#version 300 es
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
}`,cm={pixelHeight:4,gapBrightness:.7};class um extends E{uniforms;constructor(e={}){const t={...cm,...e},n=U.from({vertex:Ce,fragment:lm,name:"scanlines-filter"});super({glProgram:n,resources:{scanlinesUniforms:{uPixelHeight:{value:t.pixelHeight,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uGapBrightness:{value:t.gapBrightness,type:"f32"}}}}),this.uniforms=this.resources.scanlinesUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const dm=`#version 300 es
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
}`,hm={intensity:.4,radius:.8};class pm extends E{uniforms;constructor(e={}){const t={...hm,...e},n=U.from({vertex:Ce,fragment:dm,name:"vignette-filter"});super({glProgram:n,resources:{vignetteUniforms:{uIntensity:{value:t.intensity,type:"f32"},uRadius:{value:t.radius,type:"f32"}}}}),this.uniforms=this.resources.vignetteUniforms.uniforms}}const fm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float uBlackPoint;
uniform sampler2D uTexture;

out vec4 finalColor;

void main() {
    vec4 colour = texture(uTexture, vTextureCoord);
    
    finalColor = (colour * (1.0-uBlackPoint)) + uBlackPoint;
}
`,mm={blackPoint:.04};class gm extends E{uniforms;constructor(e={}){const t={...mm,...e},n=U.from({vertex:Ce,fragment:fm,name:"raise-black-point-filter"});super({glProgram:n,resources:{raiseBlackPointUniforms:{uBlackPoint:{value:t.blackPoint,type:"f32"}}}}),this.uniforms=this.resources.raiseBlackPointUniforms.uniforms}}const ls=.8,bm=1.2,ym=({crtFilter:o},e)=>o??lt.displaySettings.crtFilter?[new as({brightness:ls}),new rm({intensity:.03,fps:29.97,scale:5}),new um({pixelHeight:e.gameEngineUpscale,gapBrightness:.66}),new am({pixelWidth:e.gameEngineUpscale*1.1,maskBrightness:.6,numSamples:2,transitionWidth:.2}),new qf({radius:e.gameEngineUpscale/6,intensity:.1,cutoff:.8,edgeBlur:1}),new pm({intensity:.4,radius:.7}),new tm({curvatureX:.13,curvatureY:.12,multisampling:!0}),new gm({blackPoint:.03}),new as({gamma:1.1,saturation:1.35,brightness:1/ls*bm,brightnessBottom:-.15})]:Ei;Qp();class vm{constructor(e,t){this.app=e,this.gameState=t;try{const n=w.getState(),r=sn(n);if(this.#o.connect(S.destination),e.stage.addChild(this.#n),e.stage.scale=r,nt(t)===void 0)throw new Error("main loop with no starting room");this.#i()}catch(n){this.#s(n);return}}#e;#t;#n=new y({label:"MainLoop/world"});#o=S.createGain();#r=Xf(Nf,jl);#s(e){console.error(e),w.dispatch(El(Ul(e)))}#i(){const{gameMenus:{userSettings:{displaySettings:e}},upscale:{upscale:t}}=w.getState();this.app.stage.filters=ym(e,t)}tickAndCatch=e=>{try{this.tick(e)}catch(t){const n=new Error("Error caught in main loop tick",{cause:t});this.#s(n)}};tick=({deltaMS:e})=>{const t=w.getState(),n=Pe(t)?kt:void 0;if(Vl(t))return;const r=Gl(t),{gameMenus:{userSettings:{displaySettings:s,soundSettings:i},gameInPlay:{freeCharacters:a}},upscale:{upscale:l}}=w.getState(),c=!r&&!(s?.uncolourised??lt.displaySettings.uncolourised);n?.startPhysics();const u=r?ot:this.#r(this.gameState,e);n?.endPhysics(),n?.startUpdateSceneGraph();const d=nt(this.gameState),h=this.#t?.renderContext.room!==d;(h||c!==this.#t?.renderContext.general.colourised)&&d!==void 0&&Wf(this.app.renderer,c,d.planet,d.color),n?.startHudUpdate();const p=$l(t),f=Hl(t);Th(this.#e,c,p,f)&&(this.#e?.destroy(),this.#e=new Sh({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1},inputDirectionMode:f,onScreenControls:p}),this.app.stage.addChild(this.#e.output)),this.#e.tick({screenSize:l.gameEngineScreenSize,deltaMS:e,room:d,freeCharacters:a}),n?.endHudUpdate();const v=kh(this.#t,h,l,s,i,r);if(v){if(this.#t?.destroy(),d){const x={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1},room:d};this.#t=new jp(x,new qp(x,new Vp(x))),this.#n.addChild(this.#t.output.graphics),this.#t.output.sound?.connect(this.#o)}else this.#t=void 0;this.app.stage.scale=l.gameEngineUpscale,this.#i(),this.app.stage.boundsArea=new ps(0,0,l.gameEngineScreenSize.x,l.gameEngineScreenSize.y)}this.#t?.tick({movedItems:u,deltaMS:e}),n?.endUpdateSceneGraph();try{if(n?.startPixiRender(),this.app.render(),n?.endPixiRender(),v&&d){const x=new CustomEvent("firstRenderOfRoom",{detail:{roomId:d.id}});window.dispatchEvent(x)}}catch(x){throw new Error("Error in Pixi.js app.render()",{cause:x})}n?.tickDone(),this.app.ticker.maxFPS=r?10:Nl};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#n),this.#o.disconnect(),this.#t?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Eo.defaultOptions.scaleMode="nearest";const Rm=async(o,e)=>{const t=new Ql,[n]=await Promise.all([Mc(o),t.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0})]);if(t.renderer.gl.drawingBufferColorSpace="display-p3",n.error)throw new Error(`could not load campaign ${JSON.stringify(o)}`,{cause:n.error});const r=n.data;Xl(t.renderer),Rc(t.renderer),Bc(t),window._e2e_pixiApplication=t,globalThis.__PIXI_APP__=t;const s=Wl(w.getState(),o),i=Jn({campaign:r,inputStateTracker:e,savedGame:s});if(s!==void 0){const l=s.store.gameMenus.gameInPlay;w.dispatch(Yl(l))}else i.characterRooms.head&&w.dispatch(qn(i.characterRooms.head.id)),i.characterRooms.heels&&w.dispatch(qn(i.characterRooms.heels.id));const a=new vm(t,i).start();return{campaign:r,renderIn(l){l.appendChild(t.canvas)},resizeTo(l){t.renderer?.resize(l.x,l.y)},changeRoom(l){const c=at(i);c!==void 0&&un({playableItem:c,gameState:i,toRoomId:l,changeType:"level-select"})},get currentRoom(){return nt(i)},get gameState(){return i},reincarnateFrom(l){Jn({campaign:r,inputStateTracker:e,savedGame:l,writeInto:i})},stop(){console.warn("tearing down game"),t.canvas.parentNode?.removeChild(t.canvas),a.stop(),t.destroy()}}};export{Rm as default,Rm as gameMain};
