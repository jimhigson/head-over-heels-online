import{aP as te,aR as vo,aS as ne,aJ as zt,a3 as Y,a1 as L,dG as tt,N as ie,c9 as ia,az as _e,aA as Je,W as Bn,X as ot,S as re,ac as ut,ad as aa,a0 as Me,dH as dt,_ as la,ae as Qt,$ as ca,aO as ua,aK as da,aN as ha,cb as pa,ce as fa,aC as ma,aE as ps,b6 as ga,dI as xa,aa as ba,ab as Tt,dJ as fs,dK as ya,m as un,n as Ko,b3 as Et,a8 as wo,a7 as mn,T as So,Y as va,Z as wa,dL as rt,dM as Qo,dN as er,dO as Sa,aW as Ca,aX as ms,b2 as Dt,ag as C,dP as Ta,dQ as gs,dR as ka,dS as Ia,dT as Nt,dU as tr,dV as An,dW as On,dX as _a,dY as pe,dZ as nr,b5 as Qe,p as Ma,q as R,d_ as Ft,K as xe,E as U,d$ as Pa,aI as Ra,bN as ae,O as Ba,e0 as Aa,e1 as or,e2 as Oa,e3 as Co,bz as vn,dg as Fa,bg as La,h as Ne,e4 as xs,e5 as za,bP as bs,e6 as Xe,P as Ea,Q as Da,H as Xt,cO as Qn,t as ge,r as G,cG as To,bT as Ut,I as le,e7 as ko,di as Ua,cJ as eo,cT as ys,d4 as wn,s as Io,e8 as vs,bG as yt,cj as _o,e9 as Ga,b8 as Gt,cs as Mo,w as jt,bF as Sn,co as Po,y as Ro,R as to,A as Le,a2 as he,x as fe,ea as Wa,z as Va,bb as Cn,eb as $a,ec as Ha,ed as rr,ee as Na,ef as vt,eg as Xa,bi as Bo,eh as dn,ei as ws,dr as nt,cI as be,ej as Ss,ek as ja,cq as Cs,el as ht,em as wt,en as Ya,eo as Ts,ep as Za,be as ze,eq as qa,er as Ja,o as Ka,v as xt,es as en,et as I,eu as no,bI as ks,cR as St,cF as Oe,da as Is,cA as _s,cP as Qa,bS as el,ev as tl,ew as nl,bR as ol,cD as Te,cE as Fn,bc as rl,c$ as Ms,cz as sl,bX as il,ex as al,at as ll,ey as cl,cy as ul,cN as Wt,cK as Ao,de as sr,ez as dl,eA as _t,eB as Ge,eC as hl,cg as pl,bH as fl,eD as ml,f as gl,eE as xl,eF as bl,eG as yl,eH as vl,eI as Ps,eJ as wl,eK as Sl,eL as Cl,eM as Tl,eN as kl,dk as ir,eO as Il,eP as _l,eQ as ar,eR as lr,eS as Oo,eT as Ml,eU as Pl,eV as Rl,eW as Bl,eX as Al,eY as Ol,eZ as Fl,e_ as Ll,e$ as zl,f0 as El,f1 as Dl,f2 as Ul,cW as cr}from"./App-DFsj4f-6.js";import{v as Gl,s as Wl,r as D,h as Be,c as Rs,g as Fo,b as Vl,A as $l}from"./blockstackToSpectrumLut-Cy5sWeBx.js";import{x as Hl,y as et,z as Bs,A as Lo,B as Yt,C as oo,D as ro,E as As,F as zo,H as Os,I as Fs,J as Vt,K as Tn,p as F,w as Nl,L as hn,M as Xl,N as jl,O as kn,P as Yl,Q as so,n as Zt,R as tn,S as Zl,T as Ls,g as Eo,G as ql,U as ur,V as Jl,j as Kl,W as zs,X as Es,i as Ql,u as ec,Y as Ds,Z as tc,_ as Fe,$ as nc,a0 as dr,a1 as oc,a2 as rc,q as sc,a3 as Us,a4 as ic,a5 as ac,a6 as hr,a7 as lc,a8 as cc,a9 as uc,aa as dc,ab as pr,ac as fr,f as Ct,ad as hc,ae as pc,c as fc}from"./cheatRoomIdFromUrlHash-Bfy8JiaM.js";import{s as mc,l as mr}from"./swopPlayablesIfInput-VC_CHm2A.js";import{r as K,g as io,p as ao,a as Do,t as Gs,b as Ws}from"./pixiContainerToString-D7Q3Xmnh.js";import{c as gc}from"./canvasUtils-BWNRw1cD.js";import{a as xc,b as bc}from"./localUniformBit-BOGrcT1E.js";import{c as yc}from"./useScrollingFromInput-BDA3IJnK.js";import{C as gr}from"./CanvasPool-CiiB4Tjy.js";import{B as vc}from"./BatchableSprite-qOYjpB38.js";import"./index-Bqwqj8Js.js";import"./RoomJson-Cu163H80.js";var wc=`
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
`,Sc=`in vec2 aPosition;
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
`,Cc=`
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
}`;class N extends te{constructor(e){const t=e.gpu,n=xr({source:Cc,...t}),r=vo.from({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,i=xr({source:wc,...s}),a=ne.from({vertex:Sc,fragment:i}),l=new zt({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:Y.EMPTY}})}}function xr(o){const{source:e,functions:t,main:n}=o;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const Uo=`
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
    `,Go=`
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
	`;class Vs extends N{constructor(){super({gl:{functions:`
                ${Uo}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Go}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Vs.extension={name:"color",type:L.BlendMode};class $s extends N{constructor(){super({gl:{functions:`
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
            `}})}}$s.extension={name:"color-burn",type:L.BlendMode};class Hs extends N{constructor(){super({gl:{functions:`
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
                `}})}}Hs.extension={name:"color-dodge",type:L.BlendMode};class Ns extends N{constructor(){super({gl:{functions:`
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
                `}})}}Ns.extension={name:"darken",type:L.BlendMode};class Xs extends N{constructor(){super({gl:{functions:`
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
            `}})}}Xs.extension={name:"difference",type:L.BlendMode};class js extends N{constructor(){super({gl:{functions:`
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
            `}})}}js.extension={name:"divide",type:L.BlendMode};class Ys extends N{constructor(){super({gl:{functions:`
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
            `}})}}Ys.extension={name:"exclusion",type:L.BlendMode};class Zs extends N{constructor(){super({gl:{functions:`
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
                `}})}}Zs.extension={name:"hard-light",type:L.BlendMode};class qs extends N{constructor(){super({gl:{functions:`
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
            `}})}}qs.extension={name:"hard-mix",type:L.BlendMode};class Js extends N{constructor(){super({gl:{functions:`
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
            `}})}}Js.extension={name:"lighten",type:L.BlendMode};class Ks extends N{constructor(){super({gl:{functions:`
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
                `}})}}Ks.extension={name:"linear-burn",type:L.BlendMode};class Qs extends N{constructor(){super({gl:{functions:`
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
            `}})}}Qs.extension={name:"linear-dodge",type:L.BlendMode};class ei extends N{constructor(){super({gl:{functions:`
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
            `}})}}ei.extension={name:"linear-light",type:L.BlendMode};class ti extends N{constructor(){super({gl:{functions:`
                ${Uo}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Go}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ti.extension={name:"luminosity",type:L.BlendMode};class ni extends N{constructor(){super({gl:{functions:`
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
            `}})}}ni.extension={name:"negation",type:L.BlendMode};class oi extends N{constructor(){super({gl:{functions:`
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
                `}})}}oi.extension={name:"overlay",type:L.BlendMode};class ri extends N{constructor(){super({gl:{functions:`
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
                `}})}}ri.extension={name:"pin-light",type:L.BlendMode};class si extends N{constructor(){super({gl:{functions:`
                ${Uo}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Go}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}si.extension={name:"saturation",type:L.BlendMode};class ii extends N{constructor(){super({gl:{functions:`
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
                `}})}}ii.extension={name:"soft-light",type:L.BlendMode};class ai extends N{constructor(){super({gl:{functions:`
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
                `}})}}ai.extension={name:"subtract",type:L.BlendMode};class li extends N{constructor(){super({gl:{functions:`
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
                `}})}}li.extension={name:"vivid-light",type:L.BlendMode};var Tc=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,br=`struct GlobalFilterUniforms {
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
}`;const ci=class ui extends te{constructor(e){e={...ui.defaultOptions,...e};const t=vo.from({vertex:{source:br,entryPoint:"mainVertex"},fragment:{source:br,entryPoint:"mainFragment"}}),n=ne.from({vertex:tt,fragment:Tc,name:"alpha-filter"}),{alpha:r,...s}=e,i=new zt({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:t,glProgram:n,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ci.defaultOptions={alpha:1};let kc=ci;var Ic=`
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
`,yr=`struct GlobalFilterUniforms {
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
}`;class _c extends te{constructor(e={}){const t=new zt({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),n=vo.from({vertex:{source:yr,entryPoint:"mainVertex"},fragment:{source:yr,entryPoint:"mainFragment"}}),r=ne.from({vertex:tt,fragment:Ic,name:"color-matrix-filter"});super({...e,gpuProgram:n,glProgram:r,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const[n,r,s]=ie.shared.setValue(e).toArray(),i=[n,0,0,0,0,0,r,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),r=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=n+(1-n)*i,c=i*(1-n)-a*r,u=i*(1-n)+a*r,d=i*(1-n)+a*r,h=n+i*(1-n),p=i*(1-n)-a*r,f=i*(1-n)-a*r,m=i*(1-n)+a*r,g=n+i*(1-n),x=[l,c,u,0,0,d,h,p,0,0,f,m,g,0,0,0,0,0,1,0];this._loadMatrix(x,t)}contrast(e,t){const n=(e||0)+1,r=-.5*(n-1),s=[n,0,0,0,r,0,n,0,0,r,0,0,n,0,r,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,r=(n-1)*-.5,s=[n,r,r,0,0,r,n,r,0,0,r,r,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,r,s){e||(e=.2),t||(t=.15),n||(n=16770432),r||(r=3375104);const i=ie.shared,[a,l,c]=i.setValue(n).toArray(),[u,d,h]=i.setValue(r).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,t,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,s)}night(e,t){e||(e=.1);const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}const di=class hi extends ia{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(_e(Je,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...hi.defaultOptions,...t};const n=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let r=t.uvs;r||(t.positions?r=new Float32Array(n.length):r=new Float32Array([0,0,1,0,1,1,0,1]));const s=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,a=new Bn({data:n,label:"attribute-mesh-positions",shrinkToFit:i,usage:ot.VERTEX|ot.COPY_DST}),l=new Bn({data:r,label:"attribute-mesh-uvs",shrinkToFit:i,usage:ot.VERTEX|ot.COPY_DST}),c=new Bn({data:s,label:"index-mesh-buffer",shrinkToFit:i,usage:ot.INDEX|ot.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:c,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};di.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let pi=di;class Mc{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),n=t.data;let r=n;const s=this.texture.textureMatrix;return s.isSimple||(r=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!r||r.length<n.length)&&(r=this._transformedUvs=new Float32Array(n.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(n,r))),r}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class Ce extends re{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:n=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=t,[p]=u;super({...h,texture:p instanceof Y?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=n,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ut.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ut.shared.add(this.update,this,aa.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,n=this.animationSpeed*t,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=n/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=n;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(r=>{this.texture!==r&&r.destroy(n)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let n=0;n<e.length;++n)t.push(Y.from(e[n]));return new Ce(t)}static fromImages(e){const t=[];for(let n=0;n<e.length;++n)t.push(Y.from(e[n]));return new Ce(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof Y)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ut.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ut.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Pc{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new Me,this.observer=t,this.position=new dt(this,0,0),this.scale=new dt(this,1,1),this.pivot=new dt(this,0,0),this.skew=new dt(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const nn=new Me,Mt=new Me,we=[new Qt,new Qt,new Qt,new Qt];class fi{constructor(e){this._renderer=e}validateRenderable(e){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}updateRenderable(e){}execute(e){const t=this._renderer,n=t.canvasContext,r=n.activeContext;r.save(),n.setBlendMode(e.groupBlendMode);const s=t.globalUniforms.globalUniformData?.worldColor??4294967295,i=e.groupColorAlpha,a=(s>>>24&255)/255,l=(i>>>24&255)/255,c=t.filter?.alphaMultiplier??1,u=a*l*c;if(u<=0){r.restore();return}r.globalAlpha=u;const d=s&16777215,h=i&16777215,p=la(ca(h,d)),f=e.texture,m=gc.getTintedPattern(f,p),g=e.width,x=e.height,b=e.groupTransform,M=f.source._resolution??f.source.resolution??1;Mt.copyFrom(e._tileTransform.matrix),e.applyAnchorToTexture||Mt.translate(-e.anchor.x*g,-e.anchor.y*x),Mt.scale(1/M,1/M),nn.identity(),nn.prepend(Mt),nn.prepend(b);const w=t._roundPixels|e._roundPixels;n.setContextTransform(nn,w===1),r.fillStyle=m;const y=e.anchor.x*-g,v=e.anchor.y*-x;we[0].set(y,v),we[1].set(y+g,v),we[2].set(y+g,v+x),we[3].set(y,v+x);for(let P=0;P<4;P++)Mt.applyInverse(we[P],we[P]);r.beginPath(),r.moveTo(we[0].x,we[0].y);for(let P=1;P<4;P++)r.lineTo(we[P].x,we[P].y);r.closePath(),r.fill(),r.restore()}destroy(){this._renderer=null}}fi.extension={type:[L.CanvasPipes],name:"tilingSprite"};const Rc={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Bc={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let Ln,zn;class Ac extends ua{constructor(){Ln??(Ln=da({name:"tiling-sprite-shader",bits:[xc,Rc,ha]})),zn??(zn=pa({name:"tiling-sprite-shader",bits:[bc,Bc,fa]}));const e=new zt({uMapCoord:{value:new Me,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new Me,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:zn,gpuProgram:Ln,resources:{localUniforms:new zt({uTransformMatrix:{value:new Me,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:Y.EMPTY.source,uSampler:Y.EMPTY.source.style}})}updateUniforms(e,t,n,r,s,i){const a=this.resources.tilingUniforms,l=i.width,c=i.height,u=i.textureMatrix,d=a.uniforms.uTextureTransform;d.set(n.a*l/e,n.b*l/t,n.c*c/e,n.d*c/t,n.tx/e,n.ty/t),d.invert(),a.uniforms.uMapCoord=u.mapCoord,a.uniforms.uClampFrame=u.uClampFrame,a.uniforms.uClampOffset=u.uClampOffset,a.uniforms.uTextureTransform=d,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=r,a.uniforms.uSizeAnchor[3]=s,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class Oc extends pi{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Fc(o,e){const t=o.anchor.x,n=o.anchor.y;e[0]=-t*o.width,e[1]=-n*o.height,e[2]=(1-t)*o.width,e[3]=-n*o.height,e[4]=(1-t)*o.width,e[5]=(1-n)*o.height,e[6]=-t*o.width,e[7]=(1-n)*o.height}function Lc(o,e,t,n){let r=0;const s=o.length/e,i=n.a,a=n.b,l=n.c,c=n.d,u=n.tx,d=n.ty;for(t*=e;r<s;){const h=o[t],p=o[t+1];o[t]=i*h+l*p+u,o[t+1]=a*h+c*p+d,t+=e,r++}}function zc(o,e){const t=o.texture,n=t.frame.width,r=t.frame.height;let s=0,i=0;o.applyAnchorToTexture&&(s=o.anchor.x,i=o.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-i,e[5]=e[7]=1-i;const a=Me.shared;a.copyFrom(o._tileTransform.matrix),a.tx/=o.width,a.ty/=o.height,a.invert(),a.scale(o.width/n,o.height/r),Lc(e,2,0,a)}const pn=new Oc;class Ec{constructor(){this.canBatch=!0,this.geometry=new pi({indices:pn.indices.slice(),positions:pn.positions.slice(),uvs:pn.uvs.slice()})}destroy(){this.geometry.destroy(),this.shader?.destroy()}}class mi{constructor(e){this._state=ma.default2d,this._renderer=e,this._managedTilingSprites=new ps({renderer:e,type:"renderable",name:"tilingSprite"})}validateRenderable(e){const t=this._getTilingSpriteData(e),n=t.canBatch;this._updateCanBatch(e);const r=t.canBatch;if(r&&r===n){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return n!==r}addRenderable(e,t){const n=this._renderer.renderPipes.batch;this._updateCanBatch(e);const r=this._getTilingSpriteData(e),{geometry:s,canBatch:i}=r;if(i){r.batchableMesh||(r.batchableMesh=new Mc);const a=r.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=s,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,n.addToBatch(a,t)}else n.break(t),r.shader||(r.shader=new Ac),this.updateRenderable(e),t.add(e)}execute(e){const t=this._renderer,{shader:n}=this._getTilingSpriteData(e);n.groups[0]=t.globalUniforms.bindGroup;const r=n.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=t._roundPixels|e._roundPixels,ga(e.groupColorAlpha,r.uColor,0),this._state.blendMode=xa(e.groupBlendMode,e.texture._source),t.encoder.draw({geometry:pn,shader:n,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:n}=t;if(n){const{batchableMesh:r}=t;e.didViewUpdate&&this._updateBatchableMesh(e),r._batcher.updateElement(r)}else if(e.didViewUpdate){const{shader:r}=t;r.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Ec;return t.renderable=e,e._gpuData[this._renderer.uid]=t,this._managedTilingSprites.add(e),t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:n}=t,r=e.texture.source.style;r.addressMode!=="repeat"&&(r.addressMode="repeat",r.update()),zc(e,n.uvs),Fc(e,n.positions)}destroy(){this._managedTilingSprites.destroy(),this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),n=e.texture;let r=!0;return this._renderer.type===ba.WEBGL&&(r=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=n.textureMatrix.isSimple&&(r||n.source.isPowerOfTwo),t.canBatch}}mi.extension={type:[L.WebGLPipes,L.WebGPUPipes],name:"tilingSprite"};Tt.add(fi);Tt.add(mi);const gi=class fn extends fs{constructor(...e){let t=e[0]||{};t instanceof Y&&(t={texture:t}),e.length>1&&(_e(Je,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...fn.defaultOptions,...t};const{texture:n,anchor:r,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=t??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new dt({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=n,this._width=l??n.width,this._height=c??n.height,this._tileTransform=new Pc({observer:{_onUpdate:()=>this.onViewUpdate()}}),r&&(this.anchor=r),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=d??!1}static from(e,t={}){return typeof e=="string"?new fn({texture:ya.get(e),...t}):new fn({texture:e,...t})}get uvRespectAnchor(){return _e(Je,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){_e(Je,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=Y.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,n=this._width,r=this._height;e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}containsPoint(e){const t=this._width,n=this._height,r=-t*this._anchor._x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this._anchor._y,e.y>=s&&e.y<=s+n)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(n)}this._texture=null}};gi.defaultOptions={texture:Y.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let Dc=gi;class Uc extends fs{constructor(e,t){const{text:n,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new dt({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<=s+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function Gc(o,e){let t=o[0]??{};return(typeof t=="string"||o[1])&&(_e(Je,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:o[1]}),t}let We=null,Ie=null;function Wc(o,e){We||(We=un.get().createCanvas(256,128),Ie=We.getContext("2d",{willReadFrequently:!0}),Ie.globalCompositeOperation="copy",Ie.globalAlpha=1),(We.width<o||We.height<e)&&(We.width=Ko(o),We.height=Ko(e))}function vr(o,e,t){for(let n=0,r=4*t*e;n<e;++n,r+=4)if(o[r+3]!==0)return!1;return!0}function wr(o,e,t,n,r){const s=4*e;for(let i=n,a=n*s+4*t;i<=r;++i,a+=s)if(o[a+3]!==0)return!1;return!0}function Vc(...o){let e=o[0];e.canvas||(e={canvas:o[0],resolution:o[1]});const{canvas:t}=e,n=Math.min(e.resolution??1,1),r=e.width??t.width,s=e.height??t.height;let i=e.output;if(Wc(r,s),!Ie)throw new TypeError("Failed to get canvas 2D context");Ie.drawImage(t,0,0,r,s,0,0,r*n,s*n);const l=Ie.getImageData(0,0,r,s).data;let c=0,u=0,d=r-1,h=s-1;for(;u<s&&vr(l,r,u);)++u;if(u===s)return Et.EMPTY;for(;vr(l,r,h);)--h;for(;wr(l,r,c,u,h);)++c;for(;wr(l,r,d,u,h);)--d;return++d,++h,Ie.globalCompositeOperation="source-over",Ie.strokeRect(c,u,d-c,h-u),Ie.globalCompositeOperation="copy",i??(i=new Et),i.set(c/n,u/n,(d-c)/n,(h-u)/n),i}class $c{constructor(e=0,t=0,n=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=n,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){const t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){const t=new Array(e.length);for(let n=0;n<e.length;n++){const r=e[n];t[n]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){const t=this.first;delete this.items[t.key],--this.size===0?(this.first=null,this.last=null):(this.first=t.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){const t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){const e=new Array(this.size);let t=this.first,n=0;for(;t!==null;)e[n++]=t.key,t=t.next;return e}setWithEvicted(e,t,n=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,n);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=s:this.last.next=s,this.last=s}return r}set(e,t,n=!1,r=this.resetTtl){let s=this.items[e];return n||s!==void 0?(s.value=t,n===!1&&r&&(s.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(s)):(this.max>0&&this.size===this.max&&this.evict(!0),s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=s:this.last.next=s,this.last=s),this}values(e=this.keys()){const t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=this.get(e[n]);return t}}function Hc(o=1e3,e=0,t=!1){if(isNaN(o)||o<0)throw new TypeError("Invalid max value");if(isNaN(e)||e<0)throw new TypeError("Invalid ttl value");if(typeof t!="boolean")throw new TypeError("Invalid resetTtl value");return new $c(o,e,t)}function xi(o){return!!o.tagStyles&&Object.keys(o.tagStyles).length>0}function bi(o){return o.includes("<")}function Nc(o,e){return o.clone().assign(e)}function Xc(o,e){const t=[],n=e.tagStyles;if(!xi(e)||!bi(o))return t.push({text:o,style:e}),t;const r=[e],s=[];let i="",a=0;for(;a<o.length;){const l=o[a];if(l==="<"){const c=o.indexOf(">",a);if(c===-1){i+=l,a++;continue}const u=o.slice(a+1,c);if(u.startsWith("/")){const d=u.slice(1).trim();if(s.length>0&&s[s.length-1]===d){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i=""),r.pop(),s.pop(),a=c+1;continue}else{i+=o.slice(a,c+1),a=c+1;continue}}else{const d=u.trim();if(n[d]){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i="");const h=r[r.length-1],p=Nc(h,n[d]);r.push(p),s.push(d),a=c+1;continue}else{i+=o.slice(a,c+1),a=c+1;continue}}}else i+=l,a++}return i.length>0&&t.push({text:i,style:r[r.length-1]}),t}const jc=[10,13],Yc=new Set(jc),Zc=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],qc=new Set(Zc),Jc=/(\r\n|\r|\n)/,Kc=/(?:\r\n|\r|\n)/;function Wo(o){return typeof o!="string"?!1:Yc.has(o.charCodeAt(0))}function me(o,e){return typeof o!="string"?!1:qc.has(o.charCodeAt(0))}function yi(o){return o==="normal"||o==="pre-line"}function vi(o){return o==="normal"}function ke(o){if(typeof o!="string")return"";let e=o.length-1;for(;e>=0&&me(o[e]);)e--;return e<o.length-1?o.slice(0,e+1):o}function wi(o){const e=[],t=[];if(typeof o!="string")return e;for(let n=0;n<o.length;n++){const r=o[n],s=o[n+1];if(me(r)||Wo(r)){t.length>0&&(e.push(t.join("")),t.length=0),r==="\r"&&s===`
`?(e.push(`\r
`),n++):e.push(r);continue}t.push(r)}return t.length>0&&e.push(t.join("")),e}function Si(o,e,t,n){const r=t(o),s=[];for(let i=0;i<r.length;i++){let a=r[i],l=a,c=1;for(;r[i+c];){const u=r[i+c];if(!n(l,u,o,i,e))a+=u,l=u,c++;else break}i+=c-1,s.push(a)}return s}const Qc=/\r\n|\r|\n/g;function eu(o,e,t,n,r,s,i,a){const l=Xc(o,e);if(vi(e.whiteSpace))for(let W=0;W<l.length;W++){const H=l[W];l[W]={text:H.text.replace(Qc," "),style:H.style}}const u=[];let d=[];for(const W of l){const H=W.text.split(Jc);for(let j=0;j<H.length;j++){const E=H[j];E===`\r
`||E==="\r"||E===`
`?(u.push(d),d=[]):E.length>0&&d.push({text:E,style:W.style})}}(d.length>0||u.length===0)&&u.push(d);const h=t?tu(u,e,n,r,i,a):u,p=[],f=[],m=[],g=[],x=[];let b=0;const M=e._fontString,w=s(M);w.fontSize===0&&(w.fontSize=e.fontSize,w.ascent=e.fontSize);let y="",v=!!e.dropShadow;for(const W of h){let H=0,j=w.ascent,E=w.descent,V="";for(const J of W){const se=J.style._fontString,ce=s(se);se!==y&&(n.font=se,y=se);const ve=r(J.text,J.style.letterSpacing,n);H+=ve,j=Math.max(j,ce.ascent),E=Math.max(E,ce.descent),V+=J.text,!v&&J.style.dropShadow&&(v=!0)}W.length===0&&(j=w.ascent,E=w.descent),p.push(H),f.push(j),m.push(E),x.push(V);const O=e.lineHeight||j+E;g.push(O+e.leading),b=Math.max(b,H)}const P=e._stroke?.width||0,B=(t&&e.align!=="left"&&e.align!=="justify"?Math.max(b,e.wordWrapWidth):b)+P+(e.dropShadow?e.dropShadow.distance:0);let _=0;for(let W=0;W<g.length;W++)_+=g[W];_=Math.max(_,g[0]+P);const z=_+(e.dropShadow?e.dropShadow.distance:0),$=e.lineHeight||w.fontSize;return{width:B,height:z,lines:x,lineWidths:p,lineHeight:$+e.leading,maxLineWidth:b,fontProperties:w,runsByLine:h,lineAscents:f,lineDescents:m,lineHeights:g,hasDropShadow:v}}function tu(o,e,t,n,r,s){const{letterSpacing:i,whiteSpace:a,wordWrapWidth:l,breakWords:c}=e,u=yi(a),d=l+i,h={};let p="";const f=(g,x)=>{const b=`${g}|${x.styleKey}`;let M=h[b];if(M===void 0){const w=x._fontString;w!==p&&(t.font=w,p=w),M=n(g,x.letterSpacing,t)+x.letterSpacing,h[b]=M}return M},m=[];for(const g of o){const x=nu(g),b=m.length,M=_=>{let z=0,$=_;do{const{token:W,style:H}=x[$];z+=f(W,H),$++}while($<x.length&&x[$].continuesFromPrevious);return z},w=_=>{const z=[];let $=_;do z.push({token:x[$].token,style:x[$].style}),$++;while($<x.length&&x[$].continuesFromPrevious);return z};let y=[],v=0,P=!u,T=null;const A=()=>{T&&T.text.length>0&&y.push(T),T=null},B=()=>{if(A(),y.length>0){const _=y[y.length-1];_.text=ke(_.text),_.text.length===0&&y.pop()}m.push(y),y=[],v=0,P=!1};for(let _=0;_<x.length;_++){const{token:z,style:$,continuesFromPrevious:W}=x[_],H=f(z,$);if(u){const V=me(z),O=T?.text[T.text.length-1]??y[y.length-1]?.text.slice(-1)??"",J=O?me(O):!1;if(V&&J)continue}const j=!W,E=j?M(_):H;if(E>d&&j)if(v>0&&B(),c){const V=w(_);for(let O=0;O<V.length;O++){const J=V[O].token,se=V[O].style,ce=Si(J,c,s,r);for(const ve of ce){const Ue=f(ve,se);Ue+v>d&&B(),!T||T.style!==se?(A(),T={text:ve,style:se}):T.text+=ve,v+=Ue}}_+=V.length-1}else{const V=w(_);A(),m.push(V.map(O=>({text:O.token,style:O.style}))),P=!1,_+=V.length-1}else if(E+v>d&&j){if(me(z)){P=!1;continue}B(),T={text:z,style:$},v=H}else if(W&&!c)!T||T.style!==$?(A(),T={text:z,style:$}):T.text+=z,v+=H;else{const V=me(z);if(v===0&&V&&!P)continue;!T||T.style!==$?(A(),T={text:z,style:$}):T.text+=z,v+=H}}if(A(),y.length>0){const _=y[y.length-1];_.text=ke(_.text),_.text.length===0&&y.pop()}(y.length>0||m.length===b)&&m.push(y)}return m}function nu(o){const e=[];let t=!1;for(const n of o){const r=wi(n.text);let s=!0;for(const i of r){const a=me(i)||Wo(i),l=s&&t&&!a;e.push({token:i,style:n.style,continuesFromPrevious:l}),t=!a,s=!1}}return e}const ou={willReadFrequently:!0};function Sr(o,e,t,n,r){let s=t[o];return typeof s!="number"&&(s=r(o,e,n)+e,t[o]=s),s}function ru(o,e,t,n,r,s,i){const a=t.getContext("2d",ou);a.font=e._fontString;let l=0,c="";const u=[],d=Object.create(null),{letterSpacing:h,whiteSpace:p}=e,f=yi(p),m=vi(p);let g=!f;const x=e.wordWrapWidth+h,b=wi(o);for(let w=0;w<b.length;w++){let y=b[w];if(Wo(y)){if(!m){u.push(ke(c)),g=!f,c="",l=0;continue}y=" "}if(f){const P=me(y),T=me(c[c.length-1]);if(P&&T)continue}const v=Sr(y,h,d,a,n);if(v>x)if(c!==""&&(u.push(ke(c)),c="",l=0),r(y,e.breakWords)){const P=Si(y,e.breakWords,i,s);for(const T of P){const A=Sr(T,h,d,a,n);A+l>x&&(u.push(ke(c)),g=!1,c="",l=0),c+=T,l+=A}}else c.length>0&&(u.push(ke(c)),c="",l=0),u.push(ke(y)),g=!1,c="",l=0;else v+l>x&&(g=!1,u.push(ke(c)),c="",l=0),(c.length>0||!me(y)||g)&&(c+=y,l+=v)}const M=ke(c);return M.length>0&&u.push(M),u.join(`
`)}const Cr={willReadFrequently:!0},Pe=class k{static get experimentalLetterSpacingSupported(){let e=k._experimentalLetterSpacingSupported;if(e===void 0){const t=un.get().getCanvasRenderingContext2D().prototype;e=k._experimentalLetterSpacingSupported="letterSpacing"in t||"textLetterSpacing"in t}return e}constructor(e,t,n,r,s,i,a,l,c,u){this.text=e,this.style=t,this.width=n,this.height=r,this.lines=s,this.lineWidths=i,this.lineHeight=a,this.maxLineWidth=l,this.fontProperties=c,u&&(this.runsByLine=u.runsByLine,this.lineAscents=u.lineAscents,this.lineDescents=u.lineDescents,this.lineHeights=u.lineHeights,this.hasDropShadow=u.hasDropShadow)}static measureText(e=" ",t,n=k._canvas,r=t.wordWrap){const s=`${e}-${t.styleKey}-wordWrap-${r}`;if(k._measurementCache.has(s))return k._measurementCache.get(s);if(xi(t)&&bi(e)){const y=eu(e,t,r,k._context,k._measureText,k.measureFont,k.canBreakChars,k.wordWrapSplit),v=new k(e,t,y.width,y.height,y.lines,y.lineWidths,y.lineHeight,y.maxLineWidth,y.fontProperties,{runsByLine:y.runsByLine,lineAscents:y.lineAscents,lineDescents:y.lineDescents,lineHeights:y.lineHeights,hasDropShadow:y.hasDropShadow});return k._measurementCache.set(s,v),v}const a=t._fontString,l=k.measureFont(a);l.fontSize===0&&(l.fontSize=t.fontSize,l.ascent=t.fontSize,l.descent=0);const c=k._context;c.font=a;const d=(r?k._wordWrap(e,t,n):e).split(Kc),h=new Array(d.length);let p=0;for(let y=0;y<d.length;y++){const v=k._measureText(d[y],t.letterSpacing,c);h[y]=v,p=Math.max(p,v)}const f=t._stroke?.width??0,m=t.lineHeight||l.fontSize,g=k._getAlignWidth(p,t,r),x=k._adjustWidthForStyle(g,t),b=Math.max(m,l.fontSize+f)+(d.length-1)*(m+t.leading),M=k._adjustHeightForStyle(b,t),w=new k(e,t,x,M,d,h,m+t.leading,p,l);return k._measurementCache.set(s,w),w}static _adjustWidthForStyle(e,t){const n=t._stroke?.width||0;let r=e+n;return t.dropShadow&&(r+=t.dropShadow.distance),r}static _adjustHeightForStyle(e,t){let n=e;return t.dropShadow&&(n+=t.dropShadow.distance),n}static _getAlignWidth(e,t,n){return n&&t.align!=="left"&&t.align!=="justify"?Math.max(e,t.wordWrapWidth):e}static _measureText(e,t,n){let r=!1;k.experimentalLetterSpacingSupported&&(k.experimentalLetterSpacing?(n.letterSpacing=`${t}px`,n.textLetterSpacing=`${t}px`,r=!0):(n.letterSpacing="0px",n.textLetterSpacing="0px"));const s=n.measureText(e);let i=s.width;const a=-(s.actualBoundingBoxLeft??0);let c=(s.actualBoundingBoxRight??0)-a;if(i>0)if(r)i-=t,c-=t;else{const u=(k.graphemeSegmenter(e).length-1)*t;i+=u,c+=u}return Math.max(i,c)}static _wordWrap(e,t,n=k._canvas){return ru(e,t,n,k._measureText,k.canBreakWords,k.canBreakChars,k.wordWrapSplit)}static isBreakingSpace(e,t){return me(e)}static canBreakWords(e,t){return t}static canBreakChars(e,t,n,r,s){return!0}static wordWrapSplit(e){return k.graphemeSegmenter(e)}static measureFont(e){if(k._fonts[e])return k._fonts[e];const t=k._context;t.font=e;const n=t.measureText(k.METRICS_STRING+k.BASELINE_SYMBOL),r=n.actualBoundingBoxAscent??0,s=n.actualBoundingBoxDescent??0,i={ascent:r,descent:s,fontSize:r+s};return k._fonts[e]=i,i}static clearMetrics(e=""){e?delete k._fonts[e]:k._fonts={}}static get _canvas(){if(!k.__canvas){let e;try{const t=new OffscreenCanvas(0,0);if(t.getContext("2d",Cr)?.measureText)return k.__canvas=t,t;e=un.get().createCanvas()}catch{e=un.get().createCanvas()}e.width=e.height=10,k.__canvas=e}return k.__canvas}static get _context(){return k.__context||(k.__context=k._canvas.getContext("2d",Cr)),k.__context}};Pe.METRICS_STRING="|ÉqÅ";Pe.BASELINE_SYMBOL="M";Pe.BASELINE_MULTIPLIER=1.4;Pe.HEIGHT_MULTIPLIER=2;Pe.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter=="function"){const o=new Intl.Segmenter;return e=>{const t=o.segment(e),n=[];let r=0;for(const s of t)n[r++]=s.segment;return n}}return o=>[...o]})();Pe.experimentalLetterSpacing=!1;Pe._fonts={};Pe._measurementCache=Hc(1e3);let Ae=Pe;const su=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function lo(o){const e=typeof o.fontSize=="number"?`${o.fontSize}px`:o.fontSize;let t=o.fontFamily;Array.isArray(o.fontFamily)||(t=o.fontFamily.split(","));for(let n=t.length-1;n>=0;n--){let r=t[n].trim();!/([\"\'])[^\'\"]+\1/.test(r)&&!su.includes(r)&&(r=`"${r}"`),t[n]=r}return`${o.fontStyle} ${o.fontVariant} ${o.fontWeight} ${e} ${t.join(",")}`}const Tr=1e5;function on(o,e,t,n=0,r=0,s=0){if(o.texture===Y.WHITE&&!o.fill)return ie.shared.setValue(o.color).setAlpha(o.alpha??1).toHexa();if(o.fill){if(o.fill instanceof wo){const i=o.fill,a=e.createPattern(i.texture.source.resource,"repeat"),l=i.transform.copyTo(Me.shared);return l.scale(i.texture.source.pixelWidth,i.texture.source.pixelHeight),a.setTransform(l),a}else if(o.fill instanceof mn){const i=o.fill,a=i.type==="linear",l=i.textureSpace==="local";let c=1,u=1;l&&t&&(c=t.width+n,u=t.height+n);let d,h=!1;if(a){const{start:p,end:f}=i;d=e.createLinearGradient(p.x*c+r,p.y*u+s,f.x*c+r,f.y*u+s),h=Math.abs(f.x-p.x)<Math.abs((f.y-p.y)*.1)}else{const{center:p,innerRadius:f,outerCenter:m,outerRadius:g}=i;d=e.createRadialGradient(p.x*c+r,p.y*u+s,f*c,m.x*c+r,m.y*u+s,g*c)}if(h&&l&&t){const p=t.lineHeight/u;for(let f=0;f<t.lines.length;f++){const m=(f*t.lineHeight+n/2)/u;i.colorStops.forEach(g=>{let x=m+g.offset*p;x=Math.max(0,Math.min(1,x)),d.addColorStop(Math.floor(x*Tr)/Tr,ie.shared.setValue(g.color).toHex())})}}else i.colorStops.forEach(p=>{d.addColorStop(p.offset,ie.shared.setValue(p.color).toHex())});return d}}else{const i=e.createPattern(o.texture.source.resource,"repeat"),a=o.matrix.copyTo(Me.shared);return a.scale(o.texture.source.pixelWidth,o.texture.source.pixelHeight),i.setTransform(a),i}return So("FillStyle not recognised",o),"red"}const kr=new Et;class iu{getCanvasAndContext(e){const{text:t,style:n,resolution:r=1}=e,s=n._getFinalPadding(),i=Ae.measureText(t||" ",n),a=Math.ceil(Math.ceil(Math.max(1,i.width)+s*2)*r),l=Math.ceil(Math.ceil(Math.max(1,i.height)+s*2)*r),c=gr.getOptimalCanvasAndContext(a,l);this._renderTextToCanvas(n,s,r,c,i);const u=n.trim?Vc({canvas:c.canvas,width:a,height:l,resolution:1,output:kr}):kr.set(0,0,a,l);return{canvasAndContext:c,frame:u}}returnCanvasAndContext(e){gr.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,n,r,s){if(s.runsByLine&&s.runsByLine.length>0){this._renderTaggedTextToCanvas(s,e,t,n,r);return}const{canvas:i,context:a}=r,l=lo(e),c=s.lines,u=s.lineHeight,d=s.lineWidths,h=s.maxLineWidth,p=s.fontProperties,f=i.height;if(a.resetTransform(),a.scale(n,n),a.textBaseline=e.textBaseline,e._stroke?.width){const v=e._stroke;a.lineWidth=v.width,a.miterLimit=v.miterLimit,a.lineJoin=v.join,a.lineCap=v.cap}a.font=l;let m,g;const x=e.dropShadow?2:1,b=e.wordWrap?e.wordWrapWidth:h,w=(e._stroke?.width??0)/2;let y=(u-p.fontSize)/2;u-p.fontSize<0&&(y=0);for(let v=0;v<x;++v){const P=e.dropShadow&&v===0,T=P?Math.ceil(Math.max(1,f)+t*2):0,A=T*n;if(P)this._setupDropShadow(a,e,n,A);else{const B=e._gradientBounds,_=e._gradientOffset;if(B){const z={width:B.width,height:B.height,lineHeight:B.height,lines:s.lines};this._setFillAndStrokeStyles(a,e,z,t,w,_?.x??0,_?.y??0)}else _?this._setFillAndStrokeStyles(a,e,s,t,w,_.x,_.y):this._setFillAndStrokeStyles(a,e,s,t,w);a.shadowColor="black"}for(let B=0;B<c.length;B++)m=w,g=w+B*u+p.ascent+y,m+=this._getAlignmentOffset(d[B],b,e.align),e._stroke?.width&&this._drawLetterSpacing(c[B],e,r,m+t,g+t-T,!0),e._fill!==void 0&&this._drawLetterSpacing(c[B],e,r,m+t,g+t-T)}}_renderTaggedTextToCanvas(e,t,n,r,s){const{canvas:i,context:a}=s,{runsByLine:l,lineWidths:c,maxLineWidth:u,lineAscents:d,lineHeights:h,hasDropShadow:p}=e,f=i.height;a.resetTransform(),a.scale(r,r),a.textBaseline=t.textBaseline;const m=p?2:1,g=t.wordWrap?t.wordWrapWidth:u,b=(t._stroke?.width??0)/2,M=[];for(let w=0;w<l.length;w++){const y=l[w],v=[];for(const P of y){const T=lo(P.style);a.font=T,v.push({width:Ae._measureText(P.text,P.style.letterSpacing,a),font:T})}M.push(v)}for(let w=0;w<m;++w){const y=p&&w===0,v=y?Math.ceil(Math.max(1,f)+n*2):0,P=v*r;y||(a.shadowColor="black");let T=b;for(let A=0;A<l.length;A++){const B=l[A],_=c[A],z=d[A],$=h[A],W=M[A];let H=b;H+=this._getAlignmentOffset(_,g,t.align);const j=T+z;let E=H+n;for(let V=0;V<B.length;V++){const O=B[V],{width:J,font:se}=W[V];if(a.font=se,a.textBaseline=O.style.textBaseline,O.style._stroke?.width){const ce=O.style._stroke;if(a.lineWidth=ce.width,a.miterLimit=ce.miterLimit,a.lineJoin=ce.join,a.lineCap=ce.cap,y)if(O.style.dropShadow)this._setupDropShadow(a,O.style,r,P);else{E+=J;continue}else{const ve=Ae.measureFont(se),Ue=O.style.lineHeight||ve.fontSize,sa={width:J,height:Ue,lineHeight:Ue,lines:[O.text]};a.strokeStyle=on(ce,a,sa,n*2,E-n,T)}this._drawLetterSpacing(O.text,O.style,s,E,j+n-v,!0)}E+=J}E=H+n;for(let V=0;V<B.length;V++){const O=B[V],{width:J,font:se}=W[V];if(a.font=se,a.textBaseline=O.style.textBaseline,O.style._fill!==void 0){if(y)if(O.style.dropShadow)this._setupDropShadow(a,O.style,r,P);else{E+=J;continue}else{const ce=Ae.measureFont(se),ve=O.style.lineHeight||ce.fontSize,Ue={width:J,height:ve,lineHeight:ve,lines:[O.text]};a.fillStyle=on(O.style._fill,a,Ue,n*2,E-n,T)}this._drawLetterSpacing(O.text,O.style,s,E,j+n-v,!1)}E+=J}T+=$}}}_setFillAndStrokeStyles(e,t,n,r,s,i=0,a=0){if(e.fillStyle=t._fill?on(t._fill,e,n,r*2,i,a):null,t._stroke?.width){const l=s+r*2;e.strokeStyle=on(t._stroke,e,n,l,i,a)}}_setupDropShadow(e,t,n,r){e.fillStyle="black",e.strokeStyle="black";const s=t.dropShadow,i=s.color,a=s.alpha;e.shadowColor=ie.shared.setValue(i).setAlpha(a).toRgbaString();const l=s.blur*n,c=s.distance*n;e.shadowBlur=l,e.shadowOffsetX=Math.cos(s.angle)*c,e.shadowOffsetY=Math.sin(s.angle)*c+r}_getAlignmentOffset(e,t,n){return n==="right"?t-e:n==="center"?(t-e)/2:0}_drawLetterSpacing(e,t,n,r,s,i=!1){const{context:a}=n,l=t.letterSpacing;let c=!1;if(Ae.experimentalLetterSpacingSupported&&(Ae.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,c=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||c){i?a.strokeText(e,r,s):a.fillText(e,r,s);return}let u=r;const d=Ae.graphemeSegmenter(e);let h=a.measureText(e).width,p=0;for(let f=0;f<d.length;++f){const m=d[f];i?a.strokeText(m,u,s):a.fillText(m,u,s);let g="";for(let x=f+1;x<d.length;++x)g+=d[x];p=a.measureText(g).width,u+=h-p+l,h=p}}}const pt=new iu,Vo=class $e extends va{constructor(e={}){super(),this.uid=wa("textStyle"),this._tick=0,this._cachedFontString=null,au(e),e instanceof $e&&(e=e._toObject());const r={...$e.defaultTextStyle,...e};for(const s in r){const i=s;this[i]=r[s]}this._tagStyles=e.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(e){this._dropShadow!==e&&(e!==null&&typeof e=="object"?this._dropShadow=this._createProxy({...$e.defaultDropShadow,...e}):this._dropShadow=e?this._createProxy({...$e.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(typeof e=="string"?this._fontSize=parseInt(e,10):this._fontSize=e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...rt.defaultFillStyle,...e},()=>{this._fill=Qo({...this._originalFill},rt.defaultFillStyle)})),this._fill=Qo(e===0?"black":e,rt.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...rt.defaultStrokeStyle,...e},()=>{this._stroke=er({...this._originalStroke},rt.defaultStrokeStyle)})),this._stroke=er(e,rt.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit("update",this)}reset(){const e=$e.defaultTextStyle;for(const t in e)this[t]=e[t]}assign(e){for(const t in e){const n=t;this[n]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=lo(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new $e(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(n),this._originalFill?.texture&&this._originalFill.texture.destroy(n),this._stroke?.texture&&this._stroke.texture.destroy(n),this._originalStroke?.texture&&this._originalStroke.texture.destroy(n)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(n,r,s)=>(n[r]===s||(n[r]=s,t?.(r,s),this.update()),!0)})}_isFillStyle(e){return(e??null)!==null&&!(ie.isColorLike(e)||e instanceof mn||e instanceof wo)}};Vo.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};Vo.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let gn=Vo;function au(o){const e=o;if(typeof e.dropShadow=="boolean"&&e.dropShadow){const t=gn.defaultDropShadow;o.dropShadow={alpha:e.dropShadowAlpha??t.alpha,angle:e.dropShadowAngle??t.angle,blur:e.dropShadowBlur??t.blur,color:e.dropShadowColor??t.color,distance:e.dropShadowDistance??t.distance}}if(e.strokeThickness!==void 0){_e(Je,"strokeThickness is now a part of stroke");const t=e.stroke;let n={};if(ie.isColorLike(t))n.color=t;else if(t instanceof mn||t instanceof wo)n.fill=t;else if(Object.hasOwnProperty.call(t,"color")||Object.hasOwnProperty.call(t,"fill"))n=t;else throw new Error("Invalid stroke value.");o.stroke={...n,width:e.strokeThickness}}if(Array.isArray(e.fillGradientStops)){if(_e(Je,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(e.fill)||e.fill.length===0)throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");e.fill.length!==e.fillGradientStops.length&&So("The number of fill colors must match the number of fill gradient stops.");const t=new mn({start:{x:0,y:0},end:{x:0,y:1},textureSpace:"local"}),n=e.fillGradientStops.slice(),r=e.fill.map(s=>ie.shared.setValue(s).toNumber());n.forEach((s,i)=>{t.addColorStop(s,r[i])}),o.fill={fill:t}}}function lu(o,e){const{texture:t,bounds:n}=o,r=e._style._getFinalPadding();Sa(n,e._anchor,t);const s=e._anchor._x*r*2,i=e._anchor._y*r*2;n.minX-=r-s,n.minY-=r-i,n.maxX-=r-s,n.maxY-=r-i}class cu extends vc{}class Ci{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),this._managedTexts=new ps({renderer:e,type:"renderable",onUnload:this.onTextUnload.bind(this),name:"canvasText"})}resolutionChange(){for(const e in this._managedTexts.items){const t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}validateRenderable(e){const t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n?!0:e._didTextUpdate}addRenderable(e,t){const n=this._getGpuText(e);if(e._didTextUpdate){const r=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e._resolution!==r)&&this._updateGpuText(e),e._didTextUpdate=!1,lu(n,e)}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new cu;return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){const t=e._gpuData[this._renderer.uid];if(!t)return;const{canvasText:n}=this._renderer;n.getReferenceCount(t.currentKey)>0?n.decreaseReferenceCount(t.currentKey):t.texture&&n.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}}Ci.extension={type:[L.WebGLPipes,L.WebGPUPipes,L.CanvasPipes],name:"text"};const uu=new Ca;function du(o,e,t,n){const r=uu;r.minX=0,r.minY=0,r.maxX=o.width/n|0,r.maxY=o.height/n|0;const s=ms.getOptimalTexture(r.width,r.height,n,!1);return s.source.uploadMethodId="image",s.source.resource=o,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/n,s.frame.height=t/n,s.source.emit("update",s.source),s.updateUvs(),s}class Ti{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,n,r){typeof e=="string"&&(_e("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:n,resolution:t}),e.style instanceof gn||(e.style=new gn(e.style)),e.textureStyle instanceof Dt||(e.textureStyle=new Dt(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:i,textureStyle:a}=e,l=e.resolution??this._renderer.resolution,{frame:c,canvasAndContext:u}=pt.getCanvasAndContext({text:s,style:i,resolution:l}),d=du(u.canvas,c.width,c.height,l);if(a&&(d.source.style=a),i.trim&&(c.pad(i.padding),d.frame.copyFrom(c),d.frame.scale(1/l),d.updateUvs()),i.filters){const h=this._applyFilters(d,i.filters);return this.returnTexture(d),pt.returnCanvasAndContext(u),h}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||pt.returnCanvasAndContext(u),d}returnTexture(e){const t=e.source,n=t.resource;if(this._retainCanvasContext&&n?.getContext){const r=n.getContext("2d");r&&pt.returnCanvasAndContext({canvas:n,context:r})}t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",ms.returnTexture(e,!0)}renderTextToCanvas(){_e("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const n=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:n,usageCount:1},n}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const n=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(n,!1),r}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}class ki extends Ti{constructor(e){super(e,!0)}}ki.extension={type:[L.CanvasSystem],name:"canvasText"};class Ii extends Ti{constructor(e){super(e,!1)}}Ii.extension={type:[L.WebGLSystem,L.WebGPUSystem],name:"canvasText"};Tt.add(ki);Tt.add(Ii);Tt.add(Ci);class hu extends Uc{constructor(...e){const t=Gc(e,"Text");super(t,gn),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof Dt?t.textureStyle:new Dt(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let n=0,r=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=pt.getCanvasAndContext({text:this.text,style:this._style,resolution:1});pt.returnCanvasAndContext(i),n=s.width,r=s.height}else{const s=Ae.measureText(this._text,this._style);n=s.width,r=s.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}}const _i=class Mi extends C{constructor(e={}){e={...Mi.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const n=e[t];if(n.parentRenderLayer){if(n.parentRenderLayer===this)continue;n.parentRenderLayer.detach(n)}this.renderLayerChildren.push(n),n.parentRenderLayer=this;const r=this.renderGroup||this.parentRenderGroup;r&&(r.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const n=e[t],r=this.renderLayerChildren.indexOf(n);r!==-1&&this.renderLayerChildren.splice(r,1),n.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,n){const r=this.renderLayerChildren,s=r.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)r[i].parent||So("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",r[i]),r[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,n){if(!e)return;const r=this.renderLayerChildren;for(let s=0;s<r.length;s++)r[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};_i.defaultOptions={sortableChildren:!1,sortFunction:(o,e)=>o.zIndex-e.zIndex};let Ir=_i;var pu=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;uniform sampler2D uMask;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);float maskVal=texture(uMask,vTextureCoord).r;finalColor=mix(c,lutColourReplace(uLut,c),maskVal);}`;const fu=ne.from({vertex:tt,fragment:pu,name:"palette-swop-filter1"});class bt extends te{#e;#t;constructor({swops:e,lutType:t},n=Y.WHITE){const r=t==="voronoi"?Gl(e):Wl(e);super({glProgram:fu,resources:{colorReplaceUniforms:{},uLut:r.source,uMask:n.source}}),this.#e=r,this.#t=n}destroy(e){const t=e===!0||typeof e=="object"&&e.destroyPrograms,n=e===!0||typeof e=="object"&&e.destroyLutTexture,r=this.lutTexture!==Y.WHITE&&e===!0||typeof e=="object"&&e.destroyMask;n&&this.#e?.destroy(!0),this.#e=null,r&&this.#t?.destroy(!0),super.destroy(t)}get lutTexture(){return this.#e}}const $o={ambient:[]},mu=o=>o.startsWith("shadow.")||o.startsWith("shadowMask.")||o.startsWith("hud."),gu=(o,e,t)=>{const n=new Map;for(const[r,s]of Ma(t))n.set(s,r==="replaceDark"||r==="replaceLight"?o:e);return new bt({swops:n,lutType:"sparse"})},xu=(o,{ambient:e,textureSpecific:t=Nt,noReplacePlaceholderTextures:n},r=ka(),s)=>{const{pixiRenderer:i,spritesheetMetaData:a}=o,l=[];for(const{textureIds:p,swops:f}of t){const m=tr(i,{rects:{textureIds:p,color:An,spritesheetDataFrames:s.frames},clearColour:On}),g=new bt({swops:f,lutType:"sparse"},m);l.push(g)}const c=n!==void 0?gu(On,An,a.palette):void 0,u=tr(i,{clearColour:An,rects:{textureIds:_a(nr(mu,s.frames),Iterator.from(t).filter(({dodgeAmbient:p})=>p).flatMap(({textureIds:p})=>nr(p,s.frames))),color:On,spritesheetDataFrames:s.frames},placeholderColoursMasks:c&&n?{textureIds:n,filter:c,originalSpritesheet:pe()}:void 0});c?.destroy({destroyLutTexture:!0,destroyMask:!0});for(const p of e){const f=new bt(p,u);l.push(f)}const d=new re(r);d.filters=l;const h=Qe.create({width:r.width,height:r.height});i.render({container:d,target:h}),d.destroy(!1),u.destroy();for(const p of l)p instanceof bt?p.destroy({destroyLutTexture:!0,destroyMask:!0,destroyPrograms:!1}):p.destroy(!1);return h},kt=(o,e,t)=>{const{spriteOption:n}=o,r=Ta(gs[n]),s=xu(o,e,t,r),i=new Ia(s.source,r);return i.parseSync(),i.textureSource.scaleMode="nearest",i.spriteOption=n,i.ambient=e.ambient,i},Ho=o=>{if(o.paletteDim!==void 0)return{ambient:[{swops:D(o.palette,o.paletteDim),lutType:"sparse"}]}},xn=(o,e,t)=>{const n=Y.from(e.textureSource),r=kt(o,t,n);return n.destroy(),e.textureSource.destroy(),e.destroy(!0),r};let je;const Pi=()=>{je!==void 0&&(je.textureSource.destroy(),je.destroy(!0),je=void 0)},Ri=o=>{Pi(),je=kt({pixiRenderer:o,spriteOption:"BlockStack",spritesheetMetaData:Ft("BlockStack")},{ambient:[{lutType:"voronoi",swops:D(R,{pureBlack:new ie(0),shadow:new ie(16777215),redShadow:new ie(16777215)})}]})},bu=()=>{if(je===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return je},yu=async(o,{forceRefetch:e}=xe)=>await U.dispatch(Pa.endpoints.getCampaign.initiate(o,{forceRefetch:e}));Tt.add(Vs,$s,Hs,Ns,Xs,js,Ys,Zs,qs,Js,Ks,ei,Qs,ti,ni,oi,ri,si,ii,ai,li);Y.from;Ra.prototype.destroy;const vu=o=>{o.ticker.remove(o.render,o)},Bi={white:{basic:{main:"white",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"white",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}}},yellow:{basic:{main:"yellow",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}},dimmed:{main:"yellow",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!1}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}}},magenta:{basic:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}},dimmed:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}}},cyan:{basic:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}},dimmed:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!0},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}}},green:{basic:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}}}},qt=o=>Bi[o.hue][o.shade],_r=(o,e)=>{const t=qt(o.color).edges[e];return ae(t.hue,t.dimInOriginal?"dimmed":"basic")},wu=o=>o.startsWith("door."),bn=o=>/\.floor$/.test(o),yn=o=>/\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(o),co=o=>/door\.legs\.pillar/.test(o),Su=o=>/\.wall\.[^.]+\.left$/.test(o),Cu=o=>/^moonbase\.wall\.screen/.test(o),En=o=>bn(o)||yn(o),Tu=(o,e,t)=>{switch(t){case"BlockStack":return{ambient:[{lutType:"sparse",swops:D(R,K(e.hue,e.shade==="dimmed"))},e.shade==="basic"?Ai(o,e):{lutType:"sparse",swops:D(R,Aa)}],textureSpecific:[...ku(o,e),...Mr(e),...Iu(e)],noReplacePlaceholderTextures:wu};case"Toppy":return{ambient:[],textureSpecific:[{swops:D(Ba,K(e.hue,!1)),textureIds:n=>bn(n)||yn(n)||co(n)||Cu(n)},...Mr(e)]};default:return}},Mr=o=>{const{edges:e}=Bi[o.hue][o.shade],t=K(e.right.hue,o.shade==="dimmed","light-mid"),n=K(e.towards.hue,o.shade==="dimmed","mid-dark");return[{textureIds:["floorEdge.half.right","floorEdge.right","generic.door.floatingThreshold.y"],swops:D(R,t)},{textureIds:["floorEdge.half.towards","floorEdge.towards","generic.door.floatingThreshold.x"],swops:D(R,n)}]},ku=(o,e)=>{if(o==="jail")return[{textureIds:En,swops:D(R,K(e.hue,e.shade==="dimmed","mid-dark"))}];if(o==="blacktooth"&&e.shade==="dimmed")return[{textureIds:yn,swops:D(R,K(e.hue,!0,"light-mid"))}];if(e.hue==="white"||e.hue==="yellow")switch(o){case"market":return[{textureIds:En,swops:D(R,K(e.hue,e.shade==="dimmed","mid-dark"))}];case"egyptus":return[{textureIds:co,swops:D(R,K(e.hue,e.shade==="dimmed","light-dark"))},{textureIds:bn,swops:D(R,K(e.hue,e.shade==="dimmed","mid-dark"))},{textureIds:Su,swops:D(R,K(e.hue,e.shade==="dimmed","light-mid"))},{textureIds:yn,swops:D(R,K(e.hue,e.shade==="dimmed","mid-dark"))}];case"moonbase":case"penitentiary":case"safari":case"bookworld":return[{textureIds:bn,swops:D(R,K(e.hue,e.shade==="dimmed","mid-dark"))}];case"blacktooth":return[{textureIds:co,swops:D(R,K(e.hue,e.shade==="dimmed","light-dark"))},{textureIds:En,swops:D(R,K(e.hue,e.shade==="dimmed","light-mid"))}]}return Nt},Iu=o=>{const{hue:e,shade:t}=o;return e==="white"||e==="yellow"?[{textureIds:["book.x","book.y"],swops:D(R,{...K(e,t==="dimmed","light-mid"),shadow:io(`swop_${e}Dim`,t==="dimmed")})}]:t==="dimmed"?[{textureIds:["book.x","book.y"],swops:D(R,{...K(o.hue,!0,o.hue==="cyan"?"light-mid":"mid-dark")})}]:Nt},_u={blacktooth:{pureBlack:Be(R.moss,.15)},safari:{pureBlack:Be(R.moss,.17)},jail:{pureBlack:Be(R.redShadow,.2)},egyptus:{pureBlack:Be(R.redShadow)},moonbase:{shadow:R.shadow_greyBlue,pureBlack:Be(R.metallicBlue,.2)},bookworld:{shadow:R.shadow_brown,pureBlack:Be(R.highlightBeige,.1)},penitentiary:{pureBlack:Be(R.midGrey,.2)}},Mu={yellow:{shadow:R.shadow_brown},white:{shadow:R.shadow_greyBlue},magenta:{shadow:R.shadow_magenta},cyan:{shadow:R.shadow_blue}},Ai=(o,e)=>({lutType:"sparse",swops:D(R,{...Mu[e.hue]??xe,..._u[o]??xe})});let ft;const Oi=()=>{ft!==void 0&&(ft.textureSource.destroy(),ft.destroy(!0),ft=void 0)},Pu=o=>{const{roomScenery:e,roomColor:t,spriteOption:n}=o;Oi();const r=Tu(e,t,n)??$o;ft=kt(o,r)},Ru=()=>ft;let Ye;const Bu=o=>{const e=o.swops?.deactivated;if(e===void 0)return $o;const{palette:t}=o,n=Rs(e.colours,t),r=e?.playableDeactivatedPreserveColours?.head??[],s=e?.playableDeactivatedPreserveColours?.heels??[];return{ambient:[{swops:D(t,n),lutType:"sparse"}],textureSpecific:[{textureIds:i=>i.startsWith("head."),swops:D(t,or(n,r)),dodgeAmbient:!0},{textureIds:i=>i.startsWith("heels."),swops:D(t,or(n,s)),dodgeAmbient:!0}]}},Au=()=>{Ye!==void 0&&(Ye.textureSource.destroy(),Ye.destroy(!0),Ye=void 0)},Ou=o=>{const{roomScenery:e,roomColor:t,spritesheetMetaData:n}=o;Au();let r=kt(o,Bu(n));if(t.shade==="dimmed"){const s=Ho(n);s!==void 0&&(r=xn(o,r,s))}else r=xn(o,r,{ambient:[Ai(e,t)]});Ye=r},Fu=()=>{if(Ye===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ye};let Ze;const Lu=()=>{Ze!==void 0&&(Ze.textureSource.destroy(),Ze.destroy(!0),Ze=void 0)},zu=o=>{const{roomColor:e,spritesheetMetaData:t}=o;Lu();const{palette:n}=t,r=t.swops?.doughnutted,s=r===void 0?$o:{ambient:[{swops:D(n,Rs(r.colours,n)),lutType:"sparse"}]};let i=kt(o,s);if(e.shade==="dimmed"){const a=Ho(t);a!==void 0&&(i=xn(o,i,a))}Ze=i},Eu=()=>{if(Ze===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ze};let qe;const Du={pastelBlue:R.moss,metallicBlue:R.moss,pink:R.moss},Uu=()=>{qe!==void 0&&(qe.textureSource.destroy(),qe.destroy(!0),qe=void 0)},Gu=o=>{const{roomColor:e,spritesheetMetaData:t}=o;Uu();let n=kt(o,{ambient:[{swops:D(R,Du),lutType:"sparse"}]});if(e.shade==="dimmed"){const r=Ho(t);r!==void 0&&(n=xn(o,n,r))}qe=n},Wu=()=>{if(qe===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return qe},oe=o=>{try{switch(o){case"original":return pe();case"deactivated":return Fu();case"doughnutted":return Eu();case"for-current-room":return Ru();case"sceneryPlayer":return Wu();case"uncolourised":return bu();default:return o}}catch(e){throw new Error(`could not get spritesheet variant "${o}"`,{cause:e})}},Ot=(o="for-current-room",e)=>oe(o).textures[e];var Vu=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let uo=Co(U.getState());U.subscribe(()=>{uo=Co(U.getState())});const $u=ne.from({vertex:tt,fragment:Vu,name:"outline-filter"});class Ee extends te{#e;constructor({color:e,width:t}){const n=t??uo;super({glProgram:$u,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.#e=t;const r=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();r.uOutline[0]=s,r.uOutline[1]=i,r.uOutline[2]=a}apply(e,t,n,r){const s=this.resources.colorReplaceUniforms.uniforms,i=this.#e??uo;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,n,r)}}const Hu={...Oa(R,([o,e])=>[o,new Ee({color:e})]),black1pxFilter:new Ee({color:R.pureBlack,width:1})};function ye(o,e){return e.frames[o]!==void 0}function In(o,e){return e.animations[o]!==void 0}const ho=o=>{if("spritesheet"in o)return o.spritesheet;if(o.spritesheetVariant!==void 0)return oe(o.spritesheetVariant)},Dn={x:.5,y:1},Pr=o=>typeof o!="string"&&Object.hasOwn(o,"animationId"),po=o=>{const{anchor:e,flipX:t,pivot:n,x:r,y:s,times:i,label:a}=o;if(o.times){const c=Hl(i);if(vn(c)>=2){const d=new C({label:a??"timesXyz"});for(let{x:h}=c;h>=1;h--)for(let{y:p}=c;p>=1;p--)for(let f=1;f<=c.z;f++){const m={...o,label:`(${h},${p},${f})`,...o.subSpriteVariations?.(h-1,p-1,f-1),subSpriteVariations:void 0};"randomiseStartFrame"in m&&(m.randomiseStartFrame=`${m.randomiseStartFrame}${h},${p},${f}`),delete m.times;const g=po(m),x=et({x:h-1,y:p-1,z:f-1});g.x+=x.x,g.y+=+x.y,d.addChild(g)}return d}}if(o.subSpriteVariations!==void 0)return po({...o,...o.subSpriteVariations(0,0,0),subSpriteVariations:void 0});let l;if(Pr(o))l=Nu(o);else{const{textureId:c}=o,u=ho(o);l=new re(c!==void 0?u.textures[c]:Y.EMPTY)}if(e===void 0&&n===void 0)if(Pr(o))l.anchor=Dn;else{const{textureId:c}=o,u=c!==void 0?ho(o).data.frames[c]:void 0;if(u!==void 0){const d=u.frame;d.pivot!==void 0?l.pivot=d.pivot:l.anchor=Dn}else l.anchor=Dn}else e!==void 0&&(l.anchor=e),n!==void 0&&(l.pivot=n);return r!==void 0&&(l.x=r),s!==void 0&&(l.y=s),a!==void 0&&(l.label=a),l.eventMode="static",t===!0&&(l.scale.x=-1),l},Fi=(o,e=!1)=>{const t=ut.shared.speed,n=e||t===0?0:Math.sqrt(t)/t,r=pe().data.animations[o];if(r===void 0)throw new Error(`no animation with id "${o}" in the current original spritesheet`);return r.animationSpeed*n},No=o=>o.map(e=>({texture:e,time:Fa}));function Nu(o){const{animationId:e,reverse:t,playOnce:n,paused:r,randomiseStartFrame:s}=o,i=ho(o).animations[e],a=No(i);t&&a.reverse();const l=new Ce(a);return l.animationSpeed=Fi(e,r),l.gotoAndPlay(s!==void 0?Math.floor(Bs(s)*a.length):0),n!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),n==="and-destroy"&&(l.visible=!1)}),l}const S=po;class Xu extends Ce{destroy(e){const t=this.textures.map(n=>"texture"in n?n.texture:n).filter(n=>n instanceof Qe);super.destroy(e);for(const n of t)n.destroy(!0)}}class ju extends re{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:this.texture instanceof Qe,children:e}):super.destroy({...e,texture:t,textureSource:this.texture instanceof Qe})}}const $t=(o,e,t)=>{const n=e.getLocalBounds(),r=Math.ceil(n.maxX-n.minX),s=Math.ceil(n.maxY-n.minY),i=t!==void 0?t.width===r&&t.height===s:!1,a=i?t:Qe.create({width:r,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=n.minX,e.y-=n.minY;try{o.render({container:e,target:a,clear:i})}catch(u){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${ao(e)}`,{cause:u})}return e.x=l,e.y=c,a},Se=(o,e,t,n)=>{const r=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof Qe?t.texture:void 0,i=$t(o,e,s),a=t||new ju;return a.texture=i,a.label=n??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Xo=(o,e,t,n)=>{if(e instanceof Ce||e instanceof re)return e;const r=e.getLocalBounds(),s=e.children.find(l=>l instanceof Ce)?.textures.length??1,i=La(0,s).map(l=>{if(l>0)for(const c of e.children)c instanceof Ce&&c.gotoAndStop((c.currentFrame+1)%s);return $t(o,e)}).toArray(),a=new Xu(No(i));return a.animationSpeed=Fi(t,!1),a.gotoAndPlay(0),a.label=`animated sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},It=(o,e)=>e instanceof re?e:Se(o,e),Yu=(o,e)=>`hud.char.${za(o)}`,Zu=o=>typeof o=="string"?o==="infinite"?"":o:o.toString();class q extends C{#e;#t="";#o;#n;#r;#i;#s;constructor({pixiRenderer:e,doubleHeight:t=!1,doubleWidth:n=!1,outline:r=!1,label:s="text",x:i,y:a,tint:l,text:c}){super({label:s,x:i,y:a,tint:l}),this.#e=e,this.#i=t?2:1,this.#s=n?2:1,this.#o=new re,this.#o.y=-(Ne.h*this.#i+1),this.addChild(this.#o),this.#r=new C,this.addChild(this.#r),this.#n=new C,this.#n.scale={x:this.#s,y:this.#i},r&&(this.#n.filters=new Ee({color:R.pureBlack,width:1})),this.#r.addChild(this.#n),c!==void 0&&(this.text=c)}get text(){return this.#t}set text(e){const t=Zu(e);this.#t!==t&&(this.#a(t),this.#r.visible=!0,this.#r.boundsArea=new Et(-1,-1,(Ne.w*t.length+2)*this.#s,(Ne.h+2)*this.#i),this.#o.texture&&this.#o.texture.destroy(!0),this.#o.texture=$t(this.#e,this.#r),this.#o.x=-this.#o.texture.frame.width/2,this.#r.visible=!1,this.#t=t)}#a(e){const t=xs(e),n=this.#n.children.length,r=t!==n;try{const s=pe(),i=s.textures;let a=0;for(const l of e){const c=Yu(l,s.data);let u;a<n?(u=this.#n.getChildAt(a),u.texture=i[c]):(u=new re(i[c]),this.#n.addChild(u)),a++}}catch(s){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(s),window.invalid=e,new Error(`could not show text "${e}" in container because: "${s.message}"`,{cause:s})}if(r){t<n&&this.#n.removeChildren(t);for(let s=0;s<t;s++){const i=this.#n.getChildAt(s);i.x=s*Ne.w}}}destroy(e){this.#o.destroy({texture:!0,textureSource:!0}),super.destroy(e)}get characterSpriteContainer(){return this.#n}}function qu(o){return{all:o=o||new Map,on:function(e,t){var n=o.get(e);n?n.push(t):o.set(e,[t])},off:function(e,t){var n=o.get(e);n&&(t?n.splice(n.indexOf(t)>>>0,1):o.set(e,[]))},emit:function(e,t){var n=o.get(e);n&&n.slice().map(function(r){r(t)}),(n=o.get("*"))&&n.slice().map(function(r){r(e,t)})}}}class jo{static instance=new jo;#e={physics:{totalMs:0,count:0},hudUpdate:{totalMs:0,count:0},updateSceneGraph:{totalMs:0,count:0},pixiRender:{totalMs:0,count:0}};#t={};#o=performance.now();#n={frameCount:0,elapsedMs:0,fps:0,theoreticalFps:0,phases:{physics:{avgMs:0,percentage:0},hudUpdateSceneGraph:{avgMs:0,percentage:0},updateSceneGraph:{avgMs:0,percentage:0},pixiRender:{avgMs:0,percentage:0},total:{avgMs:0,percentage:0}}};#r=qu();#i;constructor(e=2e3){this.#i=e}startPhysics(){this.#t.physicsStart=performance.now()}endPhysics(){if(this.#t.physicsStart===void 0){console.warn("endPhysics called without startPhysics");return}const e=performance.now()-this.#t.physicsStart;this.#e.physics.totalMs+=e,this.#e.physics.count++,this.#t.physicsStart=void 0}startHudUpdate(){this.#t.hudUpdateStart=performance.now()}endHudUpdate(){if(this.#t.hudUpdateStart===void 0){console.warn("endHudUpdate called without startHudUpdate");return}const e=performance.now()-this.#t.hudUpdateStart;this.#e.hudUpdate.totalMs+=e,this.#e.hudUpdate.count++,this.#t.hudUpdateStart=void 0}startUpdateSceneGraph(){this.#t.updateSceneGraphStart=performance.now()}endUpdateSceneGraph(){if(this.#t.updateSceneGraphStart===void 0){console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");return}const e=performance.now()-this.#t.updateSceneGraphStart;this.#e.updateSceneGraph.totalMs+=e,this.#e.updateSceneGraph.count++,this.#t.updateSceneGraphStart=void 0}startPixiRender(){this.#t.pixiRenderStart=performance.now()}endPixiRender(){if(this.#t.pixiRenderStart===void 0){console.warn("endPixiRender called without startPixiRender");return}const e=performance.now()-this.#t.pixiRenderStart;this.#e.pixiRender.totalMs+=e,this.#e.pixiRender.count++,this.#t.pixiRenderStart=void 0}tickDone(){const e=performance.now();e-this.#o>=this.#i&&this.#s(e)}on(e){this.#r.on("stats",e)}off(e){this.#r.off("stats",e)}#s(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e;t.count===0&&n.count===0&&r.count===0&&s.count===0||(this.#a(e),this.#r.emit("stats",this.#n),this.reset(e))}#a(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e,i=t.count>0?t.totalMs/t.count:0,a=n.count>0?n.totalMs/n.count:0,l=r.count>0?r.totalMs/r.count:0,c=s.count>0?s.totalMs/s.count:0,u=i+a+l+c,d=Math.max(t.count,n.count,r.count,s.count),h=e-this.#o;this.#n.frameCount=d,this.#n.elapsedMs=h,this.#n.fps=d/h*1e3,this.#n.theoreticalFps=u>0?1e3/u:0,this.#n.phases.physics.avgMs=i,this.#n.phases.physics.percentage=i/u*100,this.#n.phases.hudUpdateSceneGraph.avgMs=a,this.#n.phases.hudUpdateSceneGraph.percentage=a/u*100,this.#n.phases.updateSceneGraph.avgMs=l,this.#n.phases.updateSceneGraph.percentage=l/u*100,this.#n.phases.pixiRender.avgMs=c,this.#n.phases.pixiRender.percentage=c/u*100,this.#n.phases.total.avgMs=u,this.#n.phases.total.percentage=100}reset(e=performance.now()){this.#e.physics.totalMs=0,this.#e.physics.count=0,this.#e.hudUpdate.totalMs=0,this.#e.hudUpdate.count=0,this.#e.updateSceneGraph.totalMs=0,this.#e.updateSceneGraph.count=0,this.#e.pixiRender.totalMs=0,this.#e.pixiRender.count=0,this.#o=e}}const Ht=jo.instance;bs({predicate(o,e,t){return Xe(e)!==Xe(t)},effect(o){Ht.reset()}});class Rr{#e=new C({label:"FpsRenderer"});#t;#o=!1;#n;set isDark(e){this.#o!==e&&(this.#o=e,this.#i())}renderContext;constructor(e){this.renderContext=e,this.#t=new q({pixiRenderer:e.general.pixiRenderer,label:"fps",outline:!0,y:Ne.h,text:"..."}),this.#e.addChild(this.#t),Ht.on(this.tick)}#r(e,t){const n=e/t;return n>1.95?"white":n>1.67?"highlightBeige":n>.97?"moss":n>.92?"pastelBlue":n>.83?"metallicBlue":n>.67?"pink":"midRed"}#i(){const e=this.#n;this.#t.text=e===void 0?"...":`${Math.round(e)} FPS`;const t=e===void 0?"white":this.#r(e,60),n=Ea(Da,this.#o);this.#t.tint=n[t]}tick=e=>{this.#n=e.fps,this.#i()};get output(){return this.#e}destroy(){Ht.off(this.tick),this.#e.destroy()}}const Un={colourised:{jump:"pastelBlue",fire:"highlightBeige",carry:"moss",carryAndJump:"midRed",menu:"lightGrey",map:"lightGrey"},zx:{jump:"blue",fire:"yellow",carry:"green",carryAndJump:"red",menu:"white",map:"white"}};class _n extends C{#e;#t;#o;#n;#r;#i;#s;#a;constructor(e,t,n,r){super({label:`arcadeButton (${t})`}),this.#i=e,this.#s=t,this.#a=n,this.#t=new C({label:"depress"}),this.addChild(this.#t),this.#n=new re({anchor:{x:.5,y:1}}),this.#r=new re({anchor:{x:.5,y:1}}),this.#r.visible=!1,this.#t.addChild(this.#n),this.#t.addChild(this.#r),this.#e=new C({label:"surface"});const s=S({textureId:"button.surfaceMask",label:"surfaceMask",spritesheetVariant:"original"});this.#t.addChild(s),this.#e.mask=s,this.#t.addChild(this.#e),this.shownOnSurface=r}get shownOnSurface(){return this.#o}set shownOnSurface(e){this.#o!==void 0&&this.#o.destroy({children:!0}),this.#o=e,e!==void 0&&this.#e.addChild(e)}set pressed(e){this.#n.visible=!e,this.#r.visible=e,this.#t.y=e?1:0}generateButtonSpriteTextures(e){const t=this.#s,n=this.#i,r=S({textureId:"button",spritesheetVariant:"original"}),s=n.uncolourised?ae(Un.zx[t]):io(Un.colourised[t],e.color.shade==="dimmed"),i=n.uncolourised?ae(Un.zx[t],"dimmed"):Be(s,.66),a=n.uncolourised?ae("black"):io("pureBlack",e.color.shade==="dimmed"),l=new bt({lutType:"sparse",swops:D(R,{replaceLight:s,replaceDark:i,pureBlack:a})});r.filters=l;const c=$t(this.#a,r,this.#n.texture===Y.EMPTY?void 0:this.#n.texture);r.texture=pe().textures["button.pressed"];const u=$t(this.#a,r,this.#r.texture===Y.EMPTY?void 0:this.#r.texture);this.#n.texture=c,this.#r.texture=u,l.destroy({destroyLutTexture:!0}),r.destroy({children:!0})}}const fo=o=>{if(o instanceof re){const{texture:e}=o;e instanceof Qe&&e.destroy(!0)}for(const e of o.children)fo(e)};class Li{#e;output=new C({label:"AppearanceRenderer"});renderContext;#t;constructor(e,t){this.renderContext=e,this.#t=t}destroy(){this.#e?.output&&fo(this.#e.output),this.output.destroy({children:!0})}tick(e){const t=this.#t({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),fo(this.#e.output),this.#e.output.destroy({texture:!1,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}const Yo=-11;class st extends Li{constructor(e,t){super(e,t)}}const Mn=(o,e)=>o.every(t=>e.currentActionPress(t,!0)!=="released"),Ju=({renderContext:{button:o,inputStateTracker:e,general:{spriteOption:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=r?.renderProps,l=r?.output,u=(s&&Lo(s))?.hasBag??!1,d=Mn(o.actions,e),h=a===void 0||d!==a.pressed||u!==a.hasBag,p=i!==a?.renderedInRoom;if(!h&&!p)return"no-update";const f=l===void 0?new _n(t,o.which,n,new q({pixiRenderer:n,text:"C+J",y:Yo})):l;return p&&(f.generateButtonSpriteTextures(i),f.shownOnSurface.tint=Do(t,i?.color.shade==="dimmed")),u?(f.visible=!0,a?.pressed!==d&&(f.pressed=d)):f.visible=!1,{output:f,renderProps:{pressed:d,hasBag:u,renderedInRoom:i}}},zi=350,Ku=(o,e,t,n)=>{const r=o.type==="heels"?o.state:o.state.heels,{carrying:s}=r;if(s===null)return;const{inputStateTracker:i}=t;if(!(i.currentActionPress("carry")!=="released")||o.state.standingOnItemId===null||!Ei(o,e[Xt]))return;const{state:{position:c}}=o;Yt({room:e,item:s,atPosition:c}),Qn(o,e),r.carrying=null,oo({subjectItem:o,gameState:t,room:e,posDelta:{x:0,y:0,z:s.aabb.z},forceful:!0,deltaMS:n,onTouch:ro,visited:new Set().add(o.id)}),As({above:o,below:s}),i.inputWasHandled("carry",zi)},Ei=(o,e)=>{const t={state:{position:ge(o.state.position,{z:G.z})},aabb:o.aabb,id:"item.id-proposedPutdownLocation"},n=zo(t,e,r=>To(r,o)&&r!==o);for(const r of n){if(!Ut(r))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with non-free",r),!1;if(!Ei(r,e))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Qu=(o,e,t)=>{const{inputStateTracker:n}=t,r=o.type==="heels"?o.state:o.state.heels,{carrying:s,hasBag:i}=r;if(!i)return;const a=le(e.items).filter(ko),l=s===null?Di(o,e):void 0;for(const d of a)d.state.wouldPickUpNext=!1;l!==void 0&&(l.state.wouldPickUpNext=!0),n.currentActionPress("carry")!=="released"&&l!==void 0&&(ed(e,r,l),n.inputWasHandled("carry",zi))},ed=(o,e,t)=>{e.carrying=t,t.state.wouldPickUpNext=!1,ys({room:o,item:t})},Di=(o,e)=>{const t=Os(o),n=l=>ko(l)&&(t||!eo(l)),r=le(e.items).filter(n),s=Fs(o,r);if(s)return s;const i=Ua(e,o.state),a=i&&e.items[i];if(a&&n(a))return a},td=(o,e,t,n)=>{const r=pe().data;if(e==="tower"){const a=`tower.${n}`;return ye(a,r)?a:"tower"}if(e==="book")return"book.x";const s=`block.${e}`,i=t?".disappearing":"";if(o){const a=`${s}.dark${i}`;if(ye(a,r))return a}return`${s}${i}`},nd=({renderContext:{general:{pixiRenderer:o,spriteOption:e},item:{config:{style:t,times:n},state:{disappearing:r}},room:s},currentRendering:i})=>{const a=i?.renderProps,l=r!==null;return a===void 0||a.isDissapearing!==l?{output:It(o,S({textureId:td(s.color.shade==="dimmed",t,l,s.planet),times:n,spritesheetVariant:e.uncolourised?"uncolourised":"for-current-room"})),renderProps:{isDissapearing:l}}:"no-update"},od=({renderContext:{item:{state:{pressed:o}},general:{spriteOption:e}},currentRendering:t})=>{const n=t?.renderProps;return n===void 0||o!==n.pressed?{output:S({textureId:o?"buttonInGame.pressed":"buttonInGame",spritesheetVariant:e.uncolourised?"uncolourised":"for-current-room"}),renderProps:{pressed:o}}:"no-update"},mt=({top:o,bottom:e})=>{const t=new C,n=S(e);t.addChild(n);const r=S(o);return r.y=-12,t.addChild(r),t[Pn]=r,t[Zo]=n,t},Pn=Symbol(),Zo=Symbol(),rd=({top:o,bottom:e})=>{const t=new C;return t.addChild(e),o.y=-G.z,t.addChild(o),t[Pn]=o,t[Zo]=e,t},sd=({renderContext:{item:{state:{facing:o,actedOnAt:{roomTime:e,by:t},activated:n=!0}},room:{roomTime:r,items:s},general:{spriteOption:i}},currentRendering:a})=>{const l=a?.renderProps,c=wn(o)??"towards",u=r===e&&Io(t).some(p=>vs(s[p]));if(!(l===void 0||c!==l.facingXy4||u!==l.controlledByJoystick||n!==l.activated))return"no-update";const h=i.uncolourised?"uncolourised":n?"for-current-room":"deactivated";return{output:mt({top:{textureId:`charles.${c}`,spritesheetVariant:h},bottom:{textureId:u?"headlessBase.all":"headlessBase",spritesheetVariant:h}}),renderProps:{facingXy4:c,controlledByJoystick:u,activated:n}}},Ui=o=>{for(const e in o)return!1;return!0},Jt=o=>!Ui(o),Kt=o=>o,Br=250,id=o=>1-(1-o)**2,ad=3,ld=(o,e,t)=>{for(let n=0;n<o.children.length;n++){const r=o.children[n],s=n*ad%t;r.gotoAndStop(e?t-s-1:s)}},cd=(o,e,t,n)=>{const r=yt(o),s=S({animationId:`conveyor.${r}`,reverse:o==="towards"||o==="right",times:e,spritesheetVariant:t}),i=s instanceof Ce?new C({children:[s]}):s;return ld(i,o==="towards"||o==="right",n),i},ud=({renderContext:{item:{config:{times:o},state:{stoodOnBy:e,direction:t}},room:{roomTime:n},general:{spriteOption:r,pixiRenderer:s}},currentRendering:i})=>{const a=i?.renderProps,l=Jt(e),c=!l&&(a?.moving??!1),u=c?n:a?.roomTimeStoppedMoving??Vt,d=l?0:Math.min(n-u,Br),h=i?.output,p=!h||t!==a?.direction,f=r.uncolourised?"uncolourised":"for-current-room",m=oe(f),g=m.data.animations["conveyor.x"].animationSpeed,x=m.data.animations["conveyor.x"].length,b=p?Xo(s,cd(t,o,f,x),"conveyor.x"):h,M=Math.max(0,1-d/Br);if(M===0)b.stop();else{const w=g*id(M);b.play(),b.animationSpeed=w}return p||c||l!==a?.moving?{output:b,renderProps:{moving:l,roomTimeStoppedMoving:u,direction:t}}:"no-update"},dd=Kt(ud),rn=(o,e,t,n=!1)=>{if(n){const s=`${o}.dark.${e}`;if(ye(s,t))return s}const r=`${o}.${e}`;return ye(r,t)?r:`generic.${e}`};function Gi(o,e){const t=e||new C;for(const n of o)t.addChild(n);return t}const Rn=(o,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return S({...o,times:t})},it=o=>Q(({renderContext:{item:e,general:{spriteOption:t}}})=>_o(e)?S({...typeof o=="string"?{textureId:o}:o,times:Tn(e),spritesheetVariant:t.uncolourised?"uncolourised":"for-current-room"}):S({...typeof o=="string"?{textureId:o}:o,spritesheetVariant:t.uncolourised?"uncolourised":"for-current-room"})),hd=o=>Q(({renderContext:{item:e,general:{paused:t,spriteOption:n}}})=>_o(e)?S({...o,times:Tn(e),paused:t,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"}):S({...o,paused:t,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"})),ue=o=>Q(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(_o(e))return It(t,Rn(o,Tn(e)));{const n=S(o);return n instanceof re?n:Se(t,n)}}),Q=o=>(({renderContext:e,currentRendering:t,tickContext:n})=>t===void 0?{output:o({renderContext:e,currentRendering:void 0,tickContext:n}),renderProps:xe}:"no-update"),Re=o=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:n})=>{if(n===void 0){const r=Tn(t),s={output:It(e,Rn(o(t.config),r)),renderProps:xe};return r&&(s.output.y-=((r.z??1)-1)*G.z),s}else return"no-update"}),pd=(o,e,t)=>{const r=pe().textures[`door.frame.${o.planet}.${e}.near`]!==void 0?o.planet:"generic",s=o.color.shade==="dimmed"&&pe().textures[`door.frame.${r}.dark.${e}.${t}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${t}`};function*fd({config:{direction:o,inHiddenWall:e,height:t}},n,r,s){const i=Mo(o);if(e){if(t!==0)for(const a of[1,0])yield S({textureId:rn(r,`door.floatingThreshold.${i}`,n.data,s),...Gt(et({[i]:a}),{y:-G.z*t}),spritesheet:n})}else{yield S({textureId:rn(r,`door.legs.base.${i}`,n.data,s),spritesheet:n});const a=rn(r,`door.legs.pillar.${i}`,n.data,s);for(let l=1;l<t;l++)yield S({textureId:a,y:-l*G.z,spritesheet:n})}e||(yield S({textureId:rn(r,`door.legs.threshold.${i}`,n.data,s),...et({...jt,z:t}),spritesheet:n}))}const Wi=(o,e)=>{const t=Mo(o),n=Sn(t),r=8;return o==="towards"||o==="right"?F({[n]:e[n]-r}):jt},md=Q(({renderContext:{item:o,general:{pixiRenderer:e,spriteOption:t},room:{planet:n,color:{shade:r}}}})=>{const s=t.uncolourised?"uncolourised":"for-current-room",i=oe(s),a=Gi(fd(o,i,n,r==="dimmed")),l=Se(e,a),c=Wi(o.config.direction,o.aabb);return l.x=c.x,l.y=c.y,l}),gd=Q(({renderContext:{item:{config:{direction:o,part:e,toRoom:t},aabb:n},room:r,general:{pixiRenderer:s,spriteOption:i,spritesheetMeta:a}}})=>{const l=Ga(U.getState())??U.getState().levelEditor?.campaignInProgress,c=Mo(o),u=l?.rooms[t]??r,d=new bt({swops:D(R,K(u.color.hue,a.paletteDim!==void 0&&r.color.shade==="dimmed",r.planet==="moonbase"?"light-mid":"light-dark")),lutType:"sparse"}),{x:h,y:p}=Wi(o,n),f=S({textureId:pd(r,c,e),x:h,y:p,spritesheetVariant:i.uncolourised?"uncolourised":"for-current-room"});f.filters=d;const m=new C({children:[f]}),g=Se(s,m);return m.destroy({children:!0}),d.destroy({destroyLutTexture:!0,destroyMask:!0}),e==="top"&&(g.y=.5),g}),xd=Po.floatingText,Ar=12,Or=G.z*3,bd=o=>{const e=o.floatingTextGradient.map(n=>Fo(o.palette,n,oe("for-current-room").ambient)),t=e[e.length-1];return[...e,...new Array(20).fill(t),...e.toReversed()]},yd=({renderContext:{item:{config:{textLines:o,appearanceRoomTime:e}},room:{roomTime:t},general:{spriteOption:n,spritesheetMeta:r,pixiRenderer:s},frontLayer:i},currentRendering:a})=>{const l=a?a.renderProps.fadeOrderColourised:n.uncolourised?void 0:bd(r),c=a?.output;let u;const h=(t-e)*xd;if(c===void 0){u=new C,i?.attach(u);for(let f=0;f<o.length;f++){const m=o[f],g=new q({pixiRenderer:s,y:f*Ar,outline:!0,text:m.toUpperCase()});u.addChild(g)}}else u=c;let p=!1;for(let f=0;f<o.length;f++){const m=u.children[f],g=h+f*-Ar,x=g>0&&g<Or;if(m.visible=x,p||=x,x&&l!==void 0){const b=Math.floor(g/Or*l.length);m.tint=l[b]}}return u.visible=p,u.y=-h,{output:u,renderProps:{fadeOrderColourised:l}}},Fr=(o,e)=>e===0?o:Math.round(o/e)*e,Lr=o=>o-Math.floor(o),vd=(o,e,t,n)=>o<=n&&t<=e;var wd=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;uniform vec4 uTintColour;vec4 transparent=vec4(0.0,0.0,0.0,0.0);vec4 black=vec4(0.0,0.0,0.0,1.0);void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float fgIsTransparent=step(fg.a,0.001f);float bgIsBlack=step(length(bg),0.001f);finalColor=mix(mix(uTintColour,black,bgIsBlack),transparent,fgIsTransparent);}`;const Sd=ne.from({vertex:tt,fragment:wd,name:"colour-clash-filter"});class zr extends te{constructor(e){super({glProgram:Sd,resources:{uBackTexture:Y.EMPTY,colourClashUniforms:{uTintColour:{value:e,type:"vec4<f32>"}}},blendRequired:!0})}}const Cd=(o,e,t)=>{const{floorType:n}=o,r=n==="deadly"?"generic":n==="standable"?o.scenery:void 0;if(r===void 0)throw new Error(`floorTextureId called with floorType "${n}"`);const s=n==="deadly"?".floor.deadly":".floor";if(!e)return`${r}${s}`;const i=`${r}.dark${s}`;return ye(i,t)?i:`${r}${s}`},Td=({state:{position:o}},e,t)=>{const n=s=>s.config.direction==="away"||s.config.direction==="left";return Gi(le(e.items).filter(s=>s.type==="wall"||s.type==="doorLegs").filter(n).map(s=>{const{id:i,config:{direction:a},state:{position:l}}=s;return S({textureId:"floorOverdraw.cornerNearWall",label:i,...F(Ro(l,o)),times:s.type==="wall"?Nl(s.config):{[Sn(yt(a))]:2},anchor:{x:0,y:1},flipX:a==="away",spritesheetVariant:t.uncolourised?"uncolourised":"for-current-room"})}),new C({label:"floorOverdraws"}))},kd=(o,e)=>{const{config:{naturalFootprint:{aabb:t,position:n}},state:{position:r}}=e,s=hn(Le(fe,r)),{left:i,right:a}=le(o.items).filter(Wa).filter(l=>{const{state:{position:c},aabb:u}=l,d=l.config.direction,h=yt(d),p=Sn(h),f=d==="away"||d==="left",m=n[h]+(f?1:0)*t[h],g=c[h]+(f?0:1)*u[h];return m!==g?!1:vd(c[p],c[p]+u[p],n[p],n[p]+t[p])}).reduce((l,{aabb:c,renderAabb:u,renderAabbOffset:d,state:{position:h},fixedZIndex:p})=>{const f=p===Xl,m=f?c:u??c,g=ge(h,d??fe),x=hn(ge(g,{x:m.x,y:f?m.y:0}))+s,b=hn(ge(g,{x:f?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,x),right:Math.max(l.right,b)}},{left:9999,right:-9999});if(a>i)return new he().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},Er=({direction:o,times:e,position:t,spriteOption:n})=>S({label:`floorEdge(${o})`,textureId:`floorEdge.${o}`,times:e,...F(t),spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"}),Id=({room:o,xSize:e,ySize:t,y:n})=>{const r=new C({label:"floorColourClash"}),s=_r(o,"right"),i=new C({label:"floorColourClash.right",filters:[new zr(s)]});for(let c=0;c<=t;c++){const u=et({x:0,y:c,z:0}),d=new he().rect(u.x-(c===0?0:8),u.y,24,8).fill(s);i.addChild(d)}r.addChild(i);const a=_r(o,"towards"),l=new C({label:"floorColourClash.towards",filters:[new zr(a)]});for(let c=0;c<=e;c++){const u=et({x:c,y:0,z:0}),d=new he().rect(u.x-16,u.y,8*(c===0?2:3),8).fill(a);l.addChild(d)}return r.addChild(l),r.y=n,r},_d=Q(({renderContext:{room:o,item:e,general:{spriteOption:t,spritesheetMeta:n,pixiRenderer:r},colourClashLayer:s,frontLayer:i}})=>{const{color:{shade:a}}=o,{config:l,state:{position:c},aabb:u}=e,{floorType:d,naturalFootprint:h}=l,p=new C({label:"floorAppearance"}),f=new C({label:"sprites"}),m=F({...u,y:0}),g=F({...u,x:0,y:0}),x=F({...u,x:0}),b=F(u),M=t.uncolourised?"uncolourised":"for-current-room",w=oe(M),y=new Ee({color:t.uncolourised?to.black:Fo(n.palette,n.effectColours.outline,w.ambient),width:1});if(d!=="none"){const v=new C({label:"tiles"}),P=Cd(l,a==="dimmed",w.data),T=w.textures[P],A=Le(h.position,c),B={x:Lr(A.x/G.x),y:Lr(A.y/G.x)},_=8,z={x:m.x,y:b.y-_,width:x.x-m.x,height:g.y-b.y+2*_},$=Le(et(Gt(B,{x:.5,y:.5})),{y:u.z},z),W=new Dc({texture:T,tilePosition:$,...z});v.addChild(W),n.showFloorOverDraw&&v.addChild(Td(e,o,t));const H=new he().moveTo(b.x,b.y).lineTo(x.x,x.y).lineTo(x.x,x.y+3).lineTo(g.x,g.y+3).lineTo(m.x,m.y+3).lineTo(m.x,m.y).fill({color:16711680,alpha:1}),j=Se(r,H);H.destroy(),v.addChild(j),v.mask=j;const E=new C({children:[v]});E.filters=y,f.addChild(E)}{const v=new C({label:"edges"});if(d==="none"){const B=new he().moveTo(x.x,x.y+10).lineTo(x.x,x.y+100).lineTo(m.x,m.y+100).lineTo(m.x,m.y+10).lineTo(g.x,g.y+10).fill(0),_=Se(r,B);p.addChild(_),i.attach(_),B.destroy()}const P=Math.ceil(u.y/G.x);v.addChild(Er({direction:"right",times:{y:P},position:{z:u.z},spriteOption:t}));const T=Math.ceil(u.x/G.x);v.addChild(Er({direction:"towards",times:{x:T},position:{z:u.z},spriteOption:t})),f.addChild(v);const A=kd(o,e);if(A!==void 0){const B=Se(r,A);f.addChild(B),f.mask=B,A.destroy()}if(p.addChild(Se(r,f)),f.destroy({children:!0}),y.destroy(!1),t.uncolourised){const B=Id({xSize:T,ySize:P,y:-u.z+1,room:o});p.addChild(B),s.attach(B)}}return p}),Md=o=>{const e=new C({label:"joystick"});return e.addChild(S({textureId:"joystick.stick",spritesheetVariant:o})),e.addChild(S({textureId:"joystick.ball",spritesheetVariant:o})),e},Pd=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,jt]]),Rd=({renderContext:{item:{state:{actedOnAt:o,lastPushDirection:e}},room:{roomTime:t},general:{spriteOption:n}},currentRendering:r})=>{const s=r?.renderProps,i=t===o.roomTime?e:void 0,a=s?.pushDirection;if(!(s===void 0||i!==a))return"no-update";const c=n.uncolourised?"uncolourised":"for-current-room",u=r?.output??Md(c),d=u.getChildAt(1);d.texture=oe(c).textures[i===void 0?"joystick.ball":"joystick.ball.active"];const h=Pd.get(i);return d.x=h?.x??0,d.y=h?.y??0,{output:u,renderProps:{pushDirection:i}}},Bd=(o,e)=>{if(o.color.shade!=="dimmed")return"dalek";const{data:t}=e;return In("dalek.dark",t)&&ye(`${o.planet}.dark.floor`,t)?"dalek.dark":"dalek"},Dr=(o,e,t,n)=>{const r=Bs(n);return Math.sin((o+r*2e4)/e)*t},Ad=50,Od=200,Fd=.25,Ld=1,Ve=({id:o,config:{which:e},state:t},n,r)=>{const s=e==="cyberman"||e==="bubbleRobot"||e==="computerBot"||e==="emperorsGuardian";if((s||e==="helicopterBug")&&t.activated){const a=e==="computerBot"||e==="helicopterBug",l=a?Ad:Od,c=a?Fd:Ld;if(s){const u=r;u[Pn].y=-G.z+Dr(n.roomTime,l,c,o)}else r.y=Dr(n.roomTime,l,c,o)}return r},zd=({renderContext:{item:o,room:e,general:{paused:t,spriteOption:n}},currentRendering:r})=>{const{config:s,state:i,id:a}=o,l=r?.renderProps,{activated:c,busyLickingDoughnutsOffFace:u}=i,d=n.uncolourised?"uncolourised":u?"doughnutted":c?"for-current-room":"deactivated",h=oe(d);switch(s.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const p=wn(i.facing)??"towards";if(!(l===void 0||c!==l.activated||u!==l.busyLickingDoughnutsOffFace||p!==l.facingXy4))return Ve(o,e,r.output),"no-update";const m={facingXy4:p,activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"skiHead":{const g=`${s.which}.${s.style}.${p}`,x=pe().data;return{output:S({textureId:ye(g,x)?g:`${s.which}.greenAndPink.${p}`,spritesheet:h}),renderProps:m}}case"elephantHead":return{output:S({textureId:`elephant.${p}`,spritesheet:h}),renderProps:m};case"turtle":return{output:S(c&&!u?{animationId:`${s.which}.${p}`,spritesheet:h,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.${p}.1`,spritesheet:h}),renderProps:m};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ve(o,e,mt({top:{textureId:`${s.which}.${p}`,spritesheet:h},bottom:{animationId:"bubbles.jetpack",paused:t,spritesheet:h}})):S({textureId:`${s.which}.${p}`,spritesheet:h}),renderProps:m};case"computerBot":case"elephant":case"monkey":return{output:Ve(o,e,mt({top:{textureId:`${s.which}.${p}`,spritesheet:h},bottom:{animationId:"headlessBase.flash",playOnce:"and-stop",spritesheet:h}})),renderProps:m};default:throw new Error(`unexpected monster ${s}`)}break}case"homingBot":{const p=!Va(i.vels.walking,jt);return l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated||p!==l.walking?{spritesheet:h,output:S(c&&!u?{animationId:p?"headlessBase.flash":"headlessBase.scan",spritesheet:h}:{textureId:"headlessBase",spritesheet:h}),renderProps:{activated:c,busyLickingDoughnutsOffFace:u,walking:p}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated))return Ve(o,e,r.output),"no-update";const f={activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"helicopterBug":case"dalek":return{output:Ve(o,e,S(c&&!u?{animationId:s.which==="dalek"?Bd(e,h):"helicopterBug",spritesheet:h,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.1`,spritesheet:h})),renderProps:f};case"bubbleRobot":return{output:Ve(o,e,mt({top:c&&!u?{animationId:"bubbles.blueGreen",randomiseStartFrame:a,paused:t,spritesheet:h}:{textureId:"bubbles.blueGreen.1",spritesheet:h},bottom:{textureId:"headlessBase",spritesheet:h}})),renderProps:f};case"emperorsGuardian":return{output:Ve(o,e,mt({top:c&&!u?{animationId:"emperorsGuardian",spritesheet:h}:{textureId:"emperorsGuardian.1",spritesheet:h},bottom:c&&!u?{animationId:"bubbles.cold",spritesheet:h,paused:t}:{textureId:"bubbles.cold.1",spritesheet:h}})),renderProps:f};case"emperor":return{output:S(c&&!u?{animationId:"bubbles.cold",spritesheet:h,paused:t}:{textureId:"bubbles.cold.1",spritesheet:h}),renderProps:f};default:throw new Error(`unexpected monster ${s}`)}break}default:throw new Error(`unexpected monster ${s}`)}};var Ed=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const Dd=ne.from({vertex:tt,fragment:Ed,name:"oneColour-filter"});class mo extends te{constructor(e){super({glProgram:Dd,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[n,r,s]=e.toArray();t.uColour[0]=n,t.uColour[1]=r,t.uColour[2]=s}}const go=.02,Ud=({name:o,action:e,facingXy8:t,teleportingPhase:n,gravityZ:r,paused:s,spritesheet:i,isStoodOn:a,isInSymbiosis:l})=>{if(e==="death")return{animationId:`${o}.fadeOut`,paused:s,spritesheet:i};if(n==="out")return{animationId:`${o}.fadeOut`,paused:s,spritesheet:i};if(n==="in")return{animationId:`${o}.fadeOut`,paused:s,spritesheet:i};if(e==="moving"&&!(l&&o==="head"))return{animationId:`${o}.walking.${t}`,paused:s,spritesheet:i};if(e==="jumping")return{textureId:r<go?`${o}.walking.${t}.2`:`${o}.walking.${t}.1`,spritesheet:i};if(e==="falling"){const u=`${o}.falling.${t}`;if(ye(u,i.data))return{textureId:u,spritesheet:i}}if(o==="head"&&a){const u=`${o}.blinking.${t}`;if(ye(u,i.data))return{textureId:u,spritesheet:i}}const c=`${o}.idle.${t}`;return In(c,i.data)?{animationId:c,paused:s,spritesheet:i}:{textureId:`${o}.walking.${t}.2`,spritesheet:i}},xo=Symbol(),Vi=Symbol(),Gd=(o,e)=>{o[xo].removeChildren(),o[xo].addChild(S(Ud(e)))},Gn=(o,e,t,n,r,s)=>{const i=s.shade==="dimmed",a=n.uncolourised?ae(s):vt(r,i,o),l=new C,c=new C;l[xo]=c,l.addChild(c);const u=S({animationId:e?`shine.${o}InSymbio`:`shine.${o}`,paused:t,flipX:o==="heels",spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"});l.addChild(u),l[Vi]=u,l.filters=[new Ee({color:a}),new Ee({color:n.uncolourised?ae(s):vt(r,i,"invulnerable")}),new mo(a)];for(const d of l.filters)d.enabled=!1;return l},Ur=({gameTime:o,switchedToAt:e},t,n)=>(t==="headOverHeels"||t===n)&&e+Xa>o,$i=(o,e)=>o!==void 0&&(e.type==="headOverHeels"?Ur(e.state.head,"headOverHeels","headOverHeels"):Ur(e.state,e.type,o.currentCharacterName)),Wd=o=>{if(!jl(o))return!1;const{gameTime:e,lastDiedAt:t}=o.type==="headOverHeels"?o.state.head:o.state;return(e-t)%rr<rr*Na},Vd=({highlighted:o,flashing:e,shining:t},n)=>{const[r,s,i]=n.filters;r.enabled=o,s.enabled=!o&&t,i.enabled=e},$d=(o,e)=>{o[Vi].visible=e},Wn=(o,e,t,n,r,s,i)=>{t&&Gd(e,{name:o,...n,paused:r,spritesheet:s,isInSymbiosis:i}),Vd(n,e),$d(e,n.shining)},Hd=({renderContext:{item:o,general:{gameState:e,paused:t,spriteOption:n,spritesheetMeta:r},room:{roomTime:s,color:i}},currentRendering:a})=>{const{type:l,state:{action:c,facing:u,visualFacingVector:d,teleporting:h,vels:{gravity:{z:p}}}}=o,f=a?.renderProps,m=a?.output,g=Cn(d??u)??"towards",x=$i(e,o),b=Wd(o),M=Os(o),w=vn(u),y=h?.phase??null,v=l!=="heels"&&(!$a(o.state.stoodOnBy)||o.state.stoodOnUntilRoomTime+300>s),P={action:c,facingXy8:g,teleportingPhase:y,flashing:b,highlighted:x,shining:M,gravityZ:p,isStoodOn:v},T=f===void 0||f.action!==c||f.facingXy8!==g||f.teleportingPhase!==y||f?.gravityZ>go!=p>go||f.isStoodOn!==v;let A;const B=n.uncolourised?"uncolourised":"for-current-room",_=oe(B);if(l==="headOverHeels"){A=m??rd({top:Gn("head",!0,t,n,r,i),bottom:Gn("heels",!0,t,n,r,i)});const z=A;Wn("head",z[Pn],T,P,t,_,!0),Wn("heels",z[Zo],T,P,t,_,!0)}else A=m??Gn(l,!1,t,n,r,i),Wn(l,A,T,P,t,_,!1);return c==="moving"&&m instanceof Ce&&(m.animationSpeed=w*Ha),{output:A,renderProps:P}},Vn=Kt(Hd),$n=(o,e,t,n,r)=>{const s=`${o}.idle.${e}`,i=r.uncolourised?"uncolourised":"sceneryPlayer",a=oe(i);return In(s,a.data)?{animationId:s,randomiseStartFrame:t,paused:n,spritesheet:a}:{textureId:`${o}.walking.${e}.2`,spritesheet:a}},Nd=({renderContext:{item:{id:o,config:{which:e,startDirection:t}},general:{paused:n,spriteOption:r}},currentRendering:s})=>s?.renderProps===void 0?{output:e==="headOverHeels"?mt({top:$n("head",t,o,n,r),bottom:$n("heels",t,o,n,r)}):S($n(e,t,o,n,r)),renderProps:xe}:"no-update",Xd=({renderContext:{item:{state:{vels:{sliding:o}},config:{startingPhase:e}},general:{paused:t,spriteOption:n}},tickContext:{deltaMS:r},currentRendering:s})=>{const a=(s?.renderProps?.distanceTravelled??0)+Bo(o)*(t?0:r),l=s?.output,c=n.uncolourised?"uncolourised":"for-current-room",u=l??S({textureId:"spikyBall.1",spritesheetVariant:c}),h=(Math.floor(a*2/dn.w)+e)%2+1;return u.texture=oe(c).textures[`spikyBall.${h}`],{output:u,renderProps:{distanceTravelled:a}}},jd=Kt(Xd),Hi=o=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:n,spriteOption:r}},tickContext:{lastRenderRoomTime:s},currentRendering:i})=>{const a=i?.renderProps,l=Jt(e);let c;return i?.output?c=i?.output:(c=S({animationId:o?"shadowMask.spring.bounce":"spring.bounce",paused:n,spritesheetVariant:r.uncolourised?"uncolourised":"for-current-room"}),c.loop=!1,c.gotoAndStop(0)),s!==void 0&&t>s&&!l&&!n?c.gotoAndPlay(0):l!==(a?.compressed??!1)&&(l?c.gotoAndStop(1):c.gotoAndStop(0)),{output:c,renderProps:{compressed:l}}},Yd=Kt(Hi(!1)),Zd=Kt(Hi(!0)),qd=o=>{const{gameMenus:e}=U.getState();try{return ws(e,o.path)?"right":"left"}catch(t){throw new Error(`Error getting switch setting from store for switch with path "${o.path}"

while store has: ${JSON.stringify(e,null,2)}`,{cause:t})}},Jd=({renderContext:{item:{state:{setting:o},config:e},general:{spriteOption:t}},currentRendering:n})=>{const r=n?.renderProps,s=e.type==="in-store"?qd(e):o;return r===void 0||s!==r.setting?{output:S({textureId:`switch.${s}`,spritesheetVariant:t.uncolourised?"uncolourised":"for-current-room"}),renderProps:{setting:s}}:"no-update"},Gr=({renderContext:{item:o,room:e,general:{paused:t,spriteOption:n}},currentRendering:r})=>{const{type:s,state:{stoodOnBy:i},config:{times:a}}=o,l=r?.renderProps,c=kn(o),u=c&&nt(i,e).some(be);if(!(l===void 0||c!==l.activated||u!==l.flashing))return"no-update";const h=n.uncolourised?"uncolourised":"for-current-room";return{output:S(u?{animationId:`${s}.flashing`,times:a,paused:t,spritesheetVariant:h}:{textureId:c?s:"block.artificial",times:a,spritesheetVariant:h}),renderProps:{flashing:u,activated:c}}},Kd=({state:{stoodOnBy:o,position:e},config:{times:t}},n)=>{const r=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return nt(o,n).filter(Ss).forEach(({id:s,state:{position:i}})=>{const a=Le(i,e),l={x:Math.floor(a.x/G.x),y:Math.floor(a.y/G.y)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(r[l.x][l.y]=s)}),r},Qd=(o,e)=>{let t=0,n=1;for(const r of e)for(const s of r)s!==void 0&&o.items[s]?.state.activated&&(t|=n),n<<=1;return t},eh=({renderContext:{item:o,room:e,general:{pixiRenderer:t,spriteOption:n}},currentRendering:r})=>{const{config:{times:s}}=o,i=r===void 0?Kd(o,e):r.renderProps.chargePositions,a=Qd(e,i);if(!(a!==r?.renderProps.cybermanActivationBitmask))return"no-update";const c=S({subSpriteVariations(d,h){const p=i[d][h];return p===void 0?{animationId:"toaster.off"}:e.items[p]?.state.everActivated?{animationId:"toaster.off"}:{textureId:"toaster.on"}},times:s??xe,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"});return{output:Xo(t,c,"toaster.off"),renderProps:{chargePositions:i,cybermanActivationBitmask:a}}},Ni=o=>{if(o==null)return!0;for(const e of o)return!1;return!0},th=(o,e,t,n,r)=>{if(!n)return`${o}.wall.${e}.${t}`;const s=`${o}.dark.wall.${e}.${t}`;return ye(s,r)?s:`${o}.wall.${e}.${t}`},Hn={aabb:{x:1,y:1,z:Cs},id:"farWallAppearanceSampleBuffer",state:{position:{x:0,y:0,z:0}}},nh=Q(({renderContext:{general:{pixiRenderer:o,spriteOption:e},item:t,room:n}})=>{const{id:r,config:s}=t;if(s.direction==="right"||s.direction==="towards")throw new Error(`wall is near: ${r}`);const{direction:i,tiles:a}=s,l=Sn(yt(i)),c=new C({label:"wallTiles"}),u=new C({label:"wallAnimations"});for(let h=0;h<s.tiles.length;h++){const p=et({[l]:h}),f=i==="away"?{x:dn.w,y:dn.h}:{x:0,y:dn.h},m=e.uncolourised?"uncolourised":"for-current-room",g=oe(m),x=S({textureId:th(n.planet,a[h],i,n.color.shade==="dimmed",g.data),...p,pivot:f,spritesheet:g});if(c.addChild(x),n.planet==="moonbase"){const b=`moonbase.wall.screen.${a[h]}.away`;if(In(b,g.data)&&u.addChild(S({animationId:b,randomiseStartFrame:`${r}${h}`,flipX:i==="left",x:p.x+(i==="away"?-8:8),y:p.y-23,spritesheet:g})),h===s.tiles.length-1&&s.tiles.at(-1)!=="coil"){const M=n[Xt];if(Hn.state.position.x=t.state.position.x+t.aabb.x,Hn.state.position.y=t.state.position.y+t.aabb.y,!Ni(zo(Hn,M,ja))){const y=n.color.shade==="dimmed"?".dark":"";c.addChild(S({textureId:`moonbase.wallDoorTransition.${i}${y}`,...p,pivot:f,spritesheetVariant:e.uncolourised?"uncolourised":"for-current-room"}));const v=S({textureId:`moonbase.wallDoorTransition.${i}.mask`,...p,pivot:f,spritesheetVariant:"original"});c.addChild(v),x.setMask({mask:v,inverse:!0})}}}}const d=new C({label:"wallAppearance"});return d.addChild(Se(o,c)),c.destroy({children:!0}),u.children.length>0&&d.addChild(u),d}),oh={head:Vn,heels:Vn,headOverHeels:Vn,doorFrame:gd,doorLegs:md,monster:zd,floatingText:yd,barrier:Q(({renderContext:{item:{config:{axis:o,times:e,disappearing:t}},general:{spriteOption:n,pixiRenderer:r}}})=>It(r,S({textureId:`barrier.${o}${t?".disappearing":""}`,times:e,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"}))),deadlyBlock:Q(({renderContext:{item:{config:o,id:e},general:{paused:t,spriteOption:n,pixiRenderer:r}}})=>{switch(o.style){case"volcano":{const s=S({animationId:"volcano",times:o.times,randomiseStartFrame:e,paused:t,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"});return Xo(r,s,"volcano")}case"toaster":throw new Error("use the special toaster appearance instead");default:throw o.style,new Error("unknown deadly block style")}}),spikes:it("spikes"),slidingDeadly:jd,slidingBlock:Q(({renderContext:{item:{config:{style:o}},general:{spriteOption:e}}})=>{const t=e.uncolourised?"uncolourised":"for-current-room";return S(o==="book"?{textureId:"book.y",spritesheetVariant:t}:{textureId:o,spritesheetVariant:t})}),block:nd,switch:Jd,button:od,conveyor:dd,lift:Q(({renderContext:{general:{paused:o,spriteOption:e}}})=>{const t=new C,n=e.uncolourised?"uncolourised":"for-current-room",r={x:ht.w/2,y:ht.h};return t.addChild(S({animationId:"lift",pivot:r,paused:o,spritesheetVariant:n})),t.addChild(S({textureId:"lift.static",pivot:r,spritesheetVariant:n})),t}),teleporter:Gr,portableTeleporter:Gr,sceneryCrown:Q(({renderContext:{item:{config:{planet:o}},general:{spriteOption:e}}})=>S({textureId:`crown.${o}`,spritesheetVariant:e.uncolourised?"uncolourised":"for-current-room"})),pickup:Q(({renderContext:{item:{config:o},general:{paused:e,spriteOption:t}}})=>{const n=t.uncolourised?"uncolourised":"for-current-room";if(o.gives==="crown")return S({textureId:`crown.${o.planet}`,spritesheetVariant:n});const s={shield:{textureId:"whiteRabbit.shield",spritesheetVariant:n},jumps:{textureId:"whiteRabbit.jumps",spritesheetVariant:n},fast:{textureId:"whiteRabbit.fast",spritesheetVariant:n},"extra-life":{textureId:"whiteRabbit.extra-life",spritesheetVariant:n},bag:{textureId:"bag",spritesheetVariant:n},doughnuts:{textureId:"doughnuts",spritesheetVariant:n},hooter:{textureId:"hooter",spritesheetVariant:n},scroll:{textureId:"scroll",spritesheetVariant:n},reincarnation:{animationId:"fish",paused:e,spritesheetVariant:n}}[o.gives];return S(s)}),moveableDeadly:it("fish.dead"),charles:sd,joystick:Rd,movingPlatform:it("sandwich"),pushableBlock:it("stepStool"),portableBlock:Q(({renderContext:{item:{config:{style:o}},general:{spriteOption:e}}})=>S({textureId:o,spritesheetVariant:e.uncolourised?"uncolourised":"for-current-room"})),spring:Yd,sceneryPlayer:Nd,hushPuppy:it("hushPuppy"),bubbles:Q(({renderContext:{item:{id:o,config:{style:e}},general:{paused:t,spriteOption:n}}})=>S({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:o,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"})),firedDoughnut:hd({animationId:"bubbles.doughnut"}),ball:it("ball"),floor:_d,particle:Q(({renderContext:{item:{config:{forCharacter:o}},general:{paused:e,spriteOption:t}}})=>S({animationId:`particle.${o==="head"?"head":"heels"}.fade`,anchor:{x:.5,y:.5},paused:e,spritesheetVariant:t.uncolourised?"uncolourised":"for-current-room"}))},Xi=o=>{if(o.type==="wall"){const{direction:e}=o.config;return e==="right"||e==="towards"?void 0:nh}return o.type==="deadlyBlock"&&o.config.style==="toaster"?eh:oh[o.type]},ji=(o,e,t)=>{const r=Xi(o)({renderContext:{general:e.general,item:o,room:t,colourClashLayer:void 0,frontLayer:void 0,zEdges:Ya,getItemRenderPipeline(){throw new Error("getOtherItemContainer not supported in carried sprite")}},tickContext:{lastRenderRoomTime:Vt,movedItems:wt,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},rh=()=>{const o=S({label:"carriedItem"}),e=S({label:"bag",textureId:"bag",y:-2,spritesheetVariant:"original"});return new C({label:"carryButtonSurface",children:[o,e]})},sh=({renderContext:o,currentRendering:e,tickContext:t})=>{const{button:n,inputStateTracker:r,general:{spriteOption:s,pixiRenderer:i}}=o,{currentPlayable:a,room:l}=t,c=e?.renderProps,u=e?.output,d=a&&Lo(a),h=d?.hasBag??!1,p=d?.carrying??null,f=p===null&&l!==void 0&&Di(a,l)!==void 0,m=Mn(n.actions,r),g=h&&!f&&p===null,x=u??new _n(s,n.which,i,rh()),b=l!==c?.renderedInRoom;b&&x.generateButtonSpriteTextures(l),x.visible=h;const[M,w]=x.shownOnSurface.children;if(g!==c?.disabled||b){const y=oe(s.uncolourised?"uncolourised":g?"deactivated":"for-current-room");w.texture=y.textures.bag}return c?.pressed!==m&&(x.pressed=m),p!==c?.carrying&&(w.visible=p===null,M.visible=p!==null),(p!==c?.carrying||b)&&(M.removeChildren(),p!==null&&l!==void 0&&M.addChild(ji(p,o,t.room))),{output:x,renderProps:{pressed:m,hasBag:h,carrying:p,disabled:g,renderedInRoom:l}}},ih=o=>{const e=S({textureId:"hooter",y:-3,spritesheetVariant:"original"}),t=S({textureId:"doughnuts",y:-2,spritesheetVariant:"original"}),n=new q({pixiRenderer:o,outline:!0,y:Yo});return new C({label:"fireButtonSurface",children:[e,t,n]})},ah=({renderContext:{button:o,inputStateTracker:e,general:{spriteOption:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=s&&Yl(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=Mn(o.actions,e),d=c===0,h=l?"hooter":so(c)>0?"doughnuts":"none",p=r?.renderProps,f=i!==p?.renderedInRoom,m=u!==p?.pressed,g=d!==p?.disabled,x=h!==p?.showingSprite;if(p!==void 0&&x&&!g&&!m&&!f)return"no-update";const b=r?.output??new _n(t,o.which,n,ih(n));f&&b.generateButtonSpriteTextures(i),b.visible=h!=="none",m&&(b.pressed=u);const[M,w,y]=b.shownOnSurface.children;if(x&&(M.visible=h==="hooter",w.visible=h==="doughnuts"),g||f){const v=oe(t.uncolourised?"uncolourised":d?"deactivated":"for-current-room");M.texture=v.textures.hooter,w.texture=v.textures.doughnuts,y.tint=Do(t,i.color.shade==="dimmed")}return c!==p?.doughnutsCount&&(y.text=so(c)),{output:b,renderProps:{pressed:u,showingSprite:h,renderedInRoom:i,disabled:d,doughnutsCount:c}}},lh=new ie(16777215),gt=(o,e=!0)=>o.uncolourised?"uncolourised":e?"for-current-room":"deactivated",Pt=(o,e,t)=>o.uncolourised?ae(qt(e).hud[t?"brightHue":"dimmedHue"]):lh,Ke=(o,e,t,n)=>{const s=qt(e).hud[t?"brightHue":"dimmedHue"];return o.uncolourised?ae(s):o.name==="Toppy"?Gs(s):(o.name,Ws(s,!1,n.paletteDim!==void 0&&e.shade==="dimmed"))},Wr=(o,e)=>{const n=qt(e).hud.icons;return o.uncolourised?ae(n):o.name==="Toppy"?Gs(n):(o.name,Ws(n,!1,e.shade==="dimmed"))},ch=(o,e)=>{const t=S({animationId:"teleporter.flashing",y:5,spritesheetVariant:gt(o)}),n=new q({pixiRenderer:e,text:"JUMP",y:Yo});return new C({label:"jumpButtonSurface",children:[n,t]})},uh=({renderContext:{button:o,inputStateTracker:e,general:{spriteOption:t,pixiRenderer:n,paused:r}},tickContext:{room:s,currentPlayable:i},currentRendering:a})=>{const l=a?.renderProps,c=a?.output,u=i?.state.standingOnItemId??null,d=u===null||s===void 0?null:s.items[u],h=d===null?!1:d.type==="teleporter"&&kn(d),p=Mn(o.actions,e),f=c??new _n(t,o.which,n,ch(t,n)),m=l?.pressed!==p;m&&(f.pressed=p);const g=s!==l?.renderedInRoom,x=h!==l?.isStandingOnActiveTeleporter,b=r!==l?.paused,[M,w]=f.shownOnSurface.children;if(b&&(r?w.gotoAndStop(0):w.gotoAndPlay(0)),!x&&!g&&!m)return"no-update";if(x&&(w.visible=h,M.visible=!h),g){const y=oe(gt(t));w.textures=No(y.animations["teleporter.flashing"]),r||w.gotoAndPlay(0),M.tint=Do(t,s?.color.shade==="dimmed"),f.generateButtonSpriteTextures(s)}return{output:f,renderProps:{pressed:p,isStandingOnActiveTeleporter:h,renderedInRoom:s,paused:r}}},dh=({currentRendering:o,tickContext:e,renderContext:{general:t}})=>o!==void 0?(o.output.tint=Ke(t.spriteOption,e.room.color,!1,t.spritesheetMeta),"no-update"):{output:new q({pixiRenderer:t.pixiRenderer,label:"mapText",outline:!0,text:"MAP"}),renderProps:xe},hh=({currentRendering:o,tickContext:e,renderContext:{general:t}})=>o!==void 0?(o.output.tint=Ke(t.spriteOption,e.room.color,!1,t.spritesheetMeta),"no-update"):{output:new q({pixiRenderer:t.pixiRenderer,label:"menuText",outline:!0,doubleHeight:!0,doubleWidth:!0,text:"☰"}),renderProps:xe},ph=6e-4,fh=1e-4,sn=.3,mh=40;class gh{#e={x:0,y:0};#t=0;#o=!1;startDrag(){this.#o=!0,this.#e={x:0,y:0},this.#t=performance.now()}stopDrag(){this.#o=!1}updateVelocity(e){const t=performance.now(),n=t-this.#t;if(n>0){const r=e.x/n,s=e.y/n;this.#e.x=this.#e.x*(1-sn)+r*sn,this.#e.y=this.#e.y*(1-sn)+s*sn}this.#t=t}checkStationaryDrag(){this.#o&&performance.now()-this.#t>mh&&(this.#e={x:0,y:0})}applyInertia(e){const t={x:0,y:0};if(!this.#o){const n=Math.sqrt(this.#e.x*this.#e.x+this.#e.y*this.#e.y);if(n>fh){t.x=this.#e.x*e,t.y=this.#e.y*e;const r=ph*e,s=Math.max(0,n-r);if(s>0){const i=s/n;this.#e.x*=i,this.#e.y*=i}else this.#e.x=0,this.#e.y=0}else this.#e.x=0,this.#e.y=0}return t}reset(){this.#e={x:0,y:0},this.#o=!1,this.#t=0}get isDragging(){return this.#o}}const bo=(o,e,t)=>(e?(t.x=o.y,t.y=o.x):(t.x=o.x,t.y=o.y),t),xh={x:-1,y:-1};class bh{output=new he({label:"OnScreenLook",eventMode:"static"});#e;#t={x:-1,y:-1};#o;#n=new gh;renderContext;constructor(e){this.renderContext=e;const{x:t,y:n}=e.general.upscale.gameEngineScreenSize;this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer),this.output.rect(0,0,t,n).fill("#00000000")}handleTouchStart=e=>{if(this.#e!==void 0&&this.stopCurrentPointer(),this.#o.curPointerId===e.pointerId)return;const t=this.renderContext.general.upscale.rotate90;this.#e=e.pointerId,bo(e,t,this.#t),this.#n.startDrag(),this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation)};stopCurrentPointer=()=>{this.#e=void 0,this.#n.stopDrag(),this.renderContext.inputStateTracker.hudInputState.directionVector=fe,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#e)return;const t=this.renderContext.general.upscale.rotate90,n=this.#t,r=Ts(U.getState()),{x:s,y:i}=bo(e,t,xh),a=(n.x-s)/r;let l=(n.y-i)/r;t&&(l=-l),this.#n.updateVelocity({x:a,y:l});const{inputStateTracker:{hudInputState:c}}=this.renderContext;c.lookVector.x+=a,c.lookVector.y+=l,n.x=s,n.y=i};tick(e){if(U.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer(),this.#n.reset();return}const{deltaMS:n}=e,{inputStateTracker:{hudInputState:r}}=this.renderContext;this.#n.checkStationaryDrag();const s=this.#n.applyInertia(n);r.lookVector.x+=s.x,r.lookVector.y+=s.y}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}get curPointerId(){return this.#e}set joystickRenderer(e){this.#o=e}}const de=14,yh=2,vh={x:-1,y:-1},wh=Math.cos(30*(Math.PI/180)),Sh=55,Ch="#00000000";class Th{output=new C({label:"OnScreenJoystick",eventMode:"static"});#e;#t;#o;#n;#r;renderContext;constructor(e){this.renderContext=e;const{inputDirectionMode:t,general:{spriteOption:n,pixiRenderer:r}}=e;this.#t=S({textureId:"joystick.whole",anchor:{x:.5,y:.5},y:1,spritesheetVariant:n.uncolourised?"uncolourised":"for-current-room"}),this.#e={away:new q({pixiRenderer:r,outline:!0,x:de,y:-de,text:"↗"}),right:new q({pixiRenderer:r,outline:!0,x:de,y:de,text:"↘"}),towards:new q({pixiRenderer:r,outline:!0,x:-de,y:de,text:"↙"}),left:new q({pixiRenderer:r,outline:!0,x:-de,y:-de,text:"↖"}),...t!=="4-way"?{awayRight:new q({pixiRenderer:r,outline:!0,x:de*Math.SQRT2,text:"➡"}),towardsRight:new q({pixiRenderer:r,outline:!0,y:de*Math.SQRT2,text:"⬇"}),towardsLeft:new q({pixiRenderer:r,outline:!0,x:-de*Math.SQRT2,text:"⬅"}),awayLeft:new q({pixiRenderer:r,outline:!0,y:-de*Math.SQRT2,text:"⬆"})}:{}},this.output.addChild(this.#t),this.output.addChild(new he().circle(0,0,Sh).fill(Ch)),this.output.addChild(new C({children:Object.values(this.#e),y:yc/2})),this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer)}handleTouchStart=e=>{this.#o!==void 0&&this.stopCurrentPointer(),this.#n.curPointerId!==e.pointerId&&(this.#o=e.pointerId,this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#o=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=fe,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#o)return;const{rotate90:t,gameEngineScreenSize:{y:n}}=this.renderContext.general.upscale,r=Ts(U.getState()),{x:s,y:i}=this.output,a=s,l=t?n-i:i,{x:c,y:u}=bo(e,t,vh),d=c/r,h=u/r,{width:p,height:f}=this.output.getLocalBounds(),m=(d-a)/(p/2),g=(h-l)/(f/2)*(t?-1:1),x=Za({x:-m,y:-g});this.renderContext.inputStateTracker.hudInputState.directionVector=ze(qa(x,wh),yh)};tick({room:e}){const{renderContext:{general:{spriteOption:t,spritesheetMeta:n},inputStateTracker:{directionVector:r}}}=this;if(this.#r!==e&&(this.#t.texture=Ot(t.uncolourised?"uncolourised":"for-current-room","joystick.whole"),this.#r=e),U.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const i=vn(r)>Ja?Cn(r):void 0,a=Ke(t,e.color,!0,n),l=Ke(t,e.color,!1,n);for(const[c,u]of Ka(this.#e))u.tint=c===i?a:l}get curPointerId(){return this.#o}set lookRenderer(e){this.#n=e}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}}const Vr=30,$r=15,kh=42,Ih=36,_h=44,Mh=20;class Ph{#e=new C({label:"OnScreenControls"});#t;renderContext;constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:t}},inputDirectionMode:n,general:r}=e;this.#t={mainButtonNest:new C({label:"mainButtonNest"}),buttons:{jump:new st({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:t},uh),fire:new st({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:t},ah),carry:new st({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:t},sh),carryAndJump:new st({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:t},Ju),menu:new st({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:t},hh),map:new st({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:t},dh)},joystick:new Th({inputStateTracker:t,inputDirectionMode:n,general:r}),look:new bh({inputStateTracker:t,general:r})},this.#t.look.joystickRenderer=this.#t.joystick,this.#t.joystick.lookRenderer=this.#t.look,this.#o(),this.#n()}#o(){const{buttons:e}=this.#t,{mainButtonNest:t,joystick:n,look:r}=this.#t;this.#e.addChild(r.output);for(const{renderContext:{button:{which:s}},output:i}of xt(e))s==="menu"||s==="map"?this.#e.addChild(i):t.addChild(i);e.jump.output.y=$r,e.carry.output.x=-Vr,e.carryAndJump.output.y=-$r,e.fire.output.x=Vr,e.menu.output.x=24,e.menu.output.y=24,e.map.output.y=16,this.#e.addChild(t),this.#e.addChild(n.output)}#n(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const t of xt(this.#t.buttons)){const{renderContext:{button:{actions:n}}}=t;t.output.eventMode="static",t.output.on("pointerdown",()=>{for(const r of n)e.hudInputState[r]=!0}),t.output.on("pointerup",()=>{for(const r of n)e.hudInputState[r]=!1}),t.output.on("pointerleave",()=>{for(const r of n)e.hudInputState[r]=!1})}}#r(e){this.#t.mainButtonNest.x=e.x-_h,this.#t.mainButtonNest.y=e.y-Mh,this.#t.joystick.output.x=kh,this.#t.joystick.output.y=e.y-Ih,this.#t.buttons.map.output.x=e.x-24}tick(e){const{screenSize:t}=e,{general:{gameState:n}}=this.renderContext;this.#r(t);for(const r of xt(this.#t.buttons))r.tick({...e,currentPlayable:Zt(n)});this.#t.joystick.tick(e),this.#t.look.tick(e)}get output(){return this.#e}destroy(){this.#t.joystick.destroy(),this.#t.look.destroy(),this.#e.destroy({children:!0})}}const Rh=o=>o.room!==void 0,Bh=(o,e)=>o?e/2-24:24,Ah=(o,e)=>o?e/2-24:56,Oh=(o,e)=>o?Math.round(e.x/2)-80:80,Fh=(o,e)=>o?Math.round(e.x/2)-104:80,Lh=o=>o?0:24,zh=o=>0,Hr=112,at=o=>o==="heels"?1:-1,Eh={head:"right",heels:"towards"};class Dh{#e=new C({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#o;#n;#r;#i;#s=void 0;renderContext;constructor(e){this.renderContext=e;const{general:t}=e;this.#r={head:this.#u("head"),heels:this.#u("heels")},this.#n={head:{sprite:this.#d("head"),livesText:new q({pixiRenderer:t.pixiRenderer,label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#l({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#l({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#l({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#l({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#d("heels"),livesText:new q({pixiRenderer:t.pixiRenderer,label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#l({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#l({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#l({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new C({label:"heelsCarrying"})}}};for(const r of en)this.#e.addChild(this.#n[r].shield.container),this.#e.addChild(this.#n[r].extraSkill.container);t.onScreenControls||(this.#e.addChild(this.#n.head.doughnuts.container),this.#e.addChild(this.#n.head.hooter.container),this.#e.addChild(this.#n.heels.bag.container),this.#e.addChild(this.#n.heels.carrying.container)),this.#c(),t.onScreenControls&&(this.#t=new Ph({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#t.output));for(const r of en)this.#e.addChild(this.#n[r].livesText),this.#e.addChild(this.#n[r].sprite);this.#i=bs({predicate(r,s,i){return Xe(s)!==Xe(i)},effect:(r,{getState:s})=>{Xe(s())?(this.#o=new Rr(e),this.#a()):(this.#o?.destroy(),this.#o=void 0)}});const n=Xe(U.getState());this.#o=n?new Rr(e):void 0,this.#o&&this.#a()}#a(){this.#e.addChild(this.#o.output)}#c(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const t of en){const{sprite:n,livesText:r}=this.#n[t];for(const s of[n,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${t}`]=!0}),s.on("pointerup",()=>{e[`swop.${t}`]=!1}),s.on("pointerleave",()=>{e[`swop.${t}`]=!1})}}#l({textureId:e,textOnTop:t=!1,noText:n=!1,outline:r=!1,label:s}){const i=new C({label:s});i.pivot={x:4,y:16};const a=new re({texture:pe().textures[e],anchor:t?{x:.5,y:0}:{x:.5,y:1},y:t?0:8});i.addChild(a);const l=Ne.w/2,c=new q({pixiRenderer:this.renderContext.general.pixiRenderer,outline:r==="text-only",y:t?0:16,x:l});return n&&(c.visible=!1),a.x=l,i.addChild(c),r===!0&&(i.filters=Hu.pureBlack),{textContainer:c,icon:a,container:i}}#u(e){const{spriteOption:t}=this.renderContext.general,n=Eh[e],r=gs[t.name].playable[e][n]?.standing;if(!r)throw new Error(`no standing defined for ${e}.${n} in ${t.name}`);return r===!0?`${e}.standing.${n}`:`${e}.walking.${n}.${r}`}#d(e){const t=new re(pe().textures[this.#r[e]]);return t.anchor={x:.5,y:0},t}#h({screenSize:e}){this.#n.head.hooter.container.x=this.#n.head.doughnuts.container.x=(e.x>>1)+at("head")*Hr,this.#n.head.doughnuts.container.y=e.y-ht.h-8,this.#n.heels.carrying.container.y=e.y-ht.h,this.#n.heels.carrying.container.x=this.#n.heels.bag.container.x=(e.x>>1)+at("heels")*Hr,this.#n.heels.bag.container.y=this.#n.head.hooter.container.y=e.y-8,this.#o&&(this.#o.output.x=e.x/2-Ne.w*1.5)}#p({room:e}){const{renderContext:{general:{gameState:t,spriteOption:n}}}=this,r=tn(t,"heels"),s=r?.carrying??null,{container:i}=this.#n.heels.carrying,a=i.children.length>0;if(s===null&&a){for(const u of i.children)u.destroy();this.#s=void 0}if(s!==null&&(!a||e!==this.#s)){const u=ji(s,this.renderContext,e);this.#s=e,i.removeChildren(),i.addChild(u),i.tint=Pt(n,e.color,!0)}const l=this.#n.heels.bag.icon,c=r?.hasBag;l.texture=Ot(gt(n,c??!1),"bag"),l.tint=Pt(n,e.color,c??!1)}#m({room:e}){const{renderContext:{general:{gameState:t,spriteOption:n,spritesheetMeta:r}}}=this,s=tn(t,"head"),i=s?.doughnuts??0,a=i!==0,l=s?.hasHooter,c=this.#n.head.hooter.icon,u=this.#n.head.doughnuts.icon,d=this.#n.head.doughnuts.textContainer;c.texture=Ot(gt(n,l??!1),"hooter"),u.texture=Ot(gt(n,a),"doughnuts"),this.#n.head.doughnuts.textContainer.text=i,d.tint=Ke(n,e.color,!1,r),c.tint=Pt(n,e.color,l??!1),u.tint=Pt(n,e.color,a)}#g(e,{screenSize:t,room:n}){const{renderContext:{general:{gameState:r,spriteOption:s,spritesheetMeta:i,onScreenControls:a}}}=this,l=tn(r,e),{textContainer:c,container:u,icon:d}=this.#n[e].shield,{textContainer:h,container:p,icon:f}=this.#n[e].extraSkill,m=Zl(l),g=m>0||!a;u.visible=g,g&&(c.text=m,u.y=t.y-zh(a)),p.x=(t.x>>1)+at(e)*Oh(a,t),u.x=(t.x>>1)+at(e)*Fh(a,t);const x=l===void 0?0:e==="head"?Ls(l):l.bigJumps,b=x>0||!a;p.visible=b,b&&(h.text=x,p.y=t.y-Lh(a)),h.tint=Ke(s,n.color,!1,i),c.tint=Ke(s,n.color,!1,i),d.tint=Wr(s,n.color),f.tint=Wr(s,n.color)}#f(e,t){const{currentCharacterName:n}=e;return n===t||n==="headOverHeels"}#x(e,{screenSize:t,room:n}){const{renderContext:{general:{gameState:r,spriteOption:s,onScreenControls:i}}}=this,a=this.#n[e].sprite;let l;const c=this.#f(r,e),u=gt(s,c);try{l=Ot(u,this.#r[e])}catch(d){throw console.error(this.renderContext),new Error(`error getting texture for variant ${u}`,{cause:d})}a.texture=l,a.x=(t.x>>1)+at(e)*Ah(i,t.x),a.y=i?Math.round(t.y*.4)-ht.h+2:t.y-ht.h,a.tint=Pt(s,n.color,c)}#b(e,t,n,r,s){if(t.uncolourised)return ae(qt(s).hud.brightHue);const i=s.shade==="dimmed";return vt(e,i,r?n:"dimText")}#y(e,{screenSize:t,freeCharacters:n,room:r}){const{renderContext:{general:{gameState:s,spriteOption:i,spritesheetMeta:a,onScreenControls:l}}}=this,u=n[e]??!1?"FREE":tn(s,e)?.lives??0,d=this.#n[e].livesText;d.x=(t.x>>1)+at(e)*Bh(l,t.x),d.y=l?Math.round(t.y*.4)+16:t.y,d.text=u,d.tint=this.#b(a,i,e,this.#f(s,e),r.color)}tick(e){if(Rh(e)){for(const t of en)this.#y(t,e),this.#x(t,e),this.#g(t,e);this.#h(e),this.#m(e),this.#p(e),this.#t?.tick(e),this.#o&&(this.#o.isDark=e.room.color.shade==="dimmed")}}get output(){return this.#e}destroy(){this.#n.head.doughnuts.textContainer.destroy(),this.#n.head.hooter.textContainer.destroy(),this.#n.heels.bag.textContainer.destroy(),this.#e.destroy({children:!0}),this.#t?.destroy(),this.#o?.destroy(),this.#i()}}const Uh=(o,e,t,n,r)=>o===void 0||o.renderContext.general.spriteOption!==e||o.renderContext.general.onScreenControls!==t||o.renderContext.inputDirectionMode!==n||o.renderContext.general.upscale.rotate90!==r.rotate90,Gh=(o,e,t,n,r,s)=>o===void 0||e||o.renderContext.general.upscale!==t||o.renderContext.general.displaySettings!==n||o.renderContext.general.soundSettings!==r||o.renderContext.general.paused!==s,qo=.1,Lt=(o,e)=>{const t=I.currentTime+qo;e.gain.linearRampToValueAtTime(0,t),o.stop(t),o.onended=()=>{o.disconnect(),e.disconnect()}},He=(o,{gain:e,randomiseStartPoint:t},n)=>{const r=I.createGain(),s=e??r.gain.defaultValue;return t?(r.gain.setValueAtTime(0,I.currentTime),r.gain.linearRampToValueAtTime(s,I.currentTime+qo)):e!==void 0&&(r.gain.value=e),o.connect(r),r.connect(n),r},X=o=>{const e=typeof o=="string"?{soundId:o}:o,{playbackRate:t=1,soundId:n,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1,randomDelayMaxMs:l=0}=e,c=I.createBufferSource(),u=no()[n];c.buffer=u,c.loop=s,c.playbackRate.value=i?t-.05+Math.random()*.1:t;const d=l>0?I.currentTime+Math.random()*l/1e3:0;return s&&a?c.start(d,u.duration*Math.random()):c.start(d),r!==void 0&&c.connect(r),c},Z=({start:o,change:e,loop:t,stop:n,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c,u;return d=>{if(!!d!=!!u)d?o!==void 0&&!(a&&s)?(l&&c&&(l.onended=null,Lt(l,c)),l=X({...o}),c=He(l,o,i),t!==void 0&&(r?(l=X({...t,loop:!0}),c=He(l,t,i)):l.onended=()=>{u&&(l&&c&&(l.onended=null,Lt(l,c)),l=X({...t,loop:!0}),c=He(l,t,i))})):t!==void 0&&(l=X({...t,loop:!0}),c=He(l,t,i)):(l&&l.loop&&c&&(l.onended=null,Lt(l,c)),n!==void 0&&(l=X({...n}),c=He(l,n,i)));else if(u!==d&&e!==void 0){const p=X({...e});c=He(p,e,i)}a=!1,u=d}},Wh={soundId:"fall"},Vh={soundId:"woodScrape",gain:.8,randomiseStartPoint:!0,playbackRate:.8},$h={soundId:"softBump"},Hh=(o,e)=>{let t=!1;for(const n in o){if(n!==e)return!0;t=!0}return!t};class ee{output=I.createGain();#e;#t;#o;#n;currentPositionZ=0;renderContext;constructor(e,t){this.renderContext=e;const n=I.createGain();n.connect(this.output),this.#e=Z({loop:t?.fall??Wh},n);const r=I.createGain();r.connect(this.output),this.#t=t?.standingOn===null?void 0:Z({start:t?.standingOn??$h,noStartOnFirstFrame:!0},r);const s=I.createGain();s.connect(this.output),this.#o=t?.collision&&Z({start:t.collision,noStartOnFirstFrame:!0},s);const i=I.createGain();i.connect(this.output),this.#n=t?.pushed===null?void 0:Z({loop:t?.pushed??Vh},i)}tick({lastRenderRoomTime:e,movedItems:t},n=!1){const{renderContext:{item:r,room:{roomTime:s}}}=this,{state:{standingOnItemId:i,position:{z:a},vels:{gravity:{z:l}},actedOnAt:{roomTime:c,actedInXY:u,by:d},collidedWith:{roomTime:h,by:p}}}=r;if(this.#e!==void 0){const{currentPositionZ:f}=this,m=a<f&&l<0&&i===null;this.#e(m),this.currentPositionZ=a}if(this.#t!==void 0){const f=i!==null&&h>(e??Vt)&&p[i];this.#t(f)}if(this.#o!==void 0){const f=h>(e??Vt)&&!Ni(Io(p));this.#o(f)}if(this.#n!==void 0){const f=!n&&s===c&&u&&i!==null&&Hh(d,i)&&t.has(r);this.#n(f)}}destroy(){this.#e?.(!1),this.#n?.(!1)}}const Nr={soundId:"rollingBallLoop",playbackRate:.5,gain:4};class Nh{output=I.createGain();#e=Z({loop:Nr},this.output);#t;renderContext;constructor(e){this.renderContext=e,this.#t=new ee(e,{pushed:Nr,collision:{soundId:"ballHit",gain:.7,varyPlaybackRate:!0},standingOn:{soundId:"ballHit"}}),this.#t.output.connect(this.output)}tick(e){const{renderContext:{item:{state:{vels:{sliding:t},standingOnItemId:n}}}}=this,r=(t.x!==0||t.y!==0)&&n!==null;this.#e(r),this.#t.tick(e,r)}destroy(){this.#e(!1),this.#t.destroy()}}class Xh{output=I.createGain();renderContext;constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&X({soundId:"bonus",connectTo:this.output});break}case"disappearing":{X({soundId:"destroy",connectTo:this.output});break}case"firedDoughnut":{X({soundId:"doughnutSplat",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,X({soundId:"hushPuppyVanish",connectTo:this.output});break}}}tick(){}destroy(){}}class jh{output=I.createGain();#e=I.createGain();#t=void 0;renderContext;constructor(e){this.renderContext=e,this.#e.connect(this.output)}tick(){const{renderContext:{item:{state:{pressed:e}}}}=this;this.#t!==void 0&&this.#t!==e&&X({soundId:e?"buttonOn":"buttonOff",connectTo:this.#e}),this.#t=e}destroy(){}}const Jo={start:{soundId:"activate",varyPlaybackRate:!0,randomDelayMaxMs:100},stop:{soundId:"deactivate",randomDelayMaxMs:100},noStartOnFirstFrame:!0};class Yh{output=I.createGain();#e=I.createGain();#t=Z({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o;#n;renderContext;constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#o=Z(Jo,this.output),this.#n=new ee(e,{collision:{soundId:"metalHit",gain:.3},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#n.output.connect(this.output)}tick(e){const{renderContext:{item:t,room:{roomTime:n,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=n===s&&Io(i).some(l=>vs(r[l]));this.#t(a),this.#o(t.state.activated??!0),this.#n.tick(e,a)}destroy(){this.#t(!1),this.#n.destroy()}}const Nn=2;class Zh{output=I.createGain();#e=Z({start:{soundId:"conveyorStart",playbackRate:Nn},loop:{soundId:"conveyorLoop",playbackRate:Nn},stop:{soundId:"conveyorEnd",playbackRate:Nn}},this.output);renderContext;constructor(e){this.renderContext=e}tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=Jt(e);this.#e(t)}destroy(){this.#e(!1)}}class qh{output=I.createGain();#e;#t=!1;renderContext;constructor(e){this.renderContext=e,this.#e=new ee(e,{standingOn:{soundId:"drum"}}),this.#e.output.connect(this.output)}tick(e){const{renderContext:{item:{state:{stoodOnBy:t}}}}=this,n=Jt(t);!this.#t&&n&&X({soundId:"drum",connectTo:this.output}),this.#t=n,this.#e.tick(e)}destroy(){this.#e.destroy()}}class Jh{output=I.createGain();#e;renderContext;constructor(e){this.renderContext=e,this.#e=e.item.state.lastEmittedAtRoomTime,this.output.gain.value=2.5}tick(e){const{lastEmittedAtRoomTime:t}=this.renderContext.item.state;t>this.#e&&X({soundId:"emit",connectTo:this.output}),this.#e=t}destroy(){}}class Kh{output=I.createGain();renderContext;constructor(e){this.renderContext=e,X({soundId:"hooter",connectTo:this.output})}tick(){}destroy(){}}const Qh=3;class ep{output=I.createGain();#e=X({soundId:"helicopter",loop:!0,connectTo:this.output});renderContext;constructor(e){this.renderContext=e,this.output.gain.value=.7}tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Qh*e)}destroy(){Lt(this.#e,this.output)}}const tp={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},Xr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3},monkey:{soundId:"monkeyTurn"},elephant:{soundId:"elephantHoot"}},jr={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"},homingBot:{soundId:"lowHum",randomiseStartPoint:!0}},Yr={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class np{output=I.createGain();#e=I.createGain();#t=I.createGain();#o;#n;#r;#i;#s;renderContext;constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e,n=tp[t];this.#r=new ee(e,n?{collision:n}:void 0),this.#r.output.connect(this.output),Xr[t]!==void 0&&(this.#o=Z({change:Xr[t]},this.#e)),Yr[t]!==void 0&&(this.#i=Z(Yr[t],this.#e)),jr[t]!==void 0&&(this.#n=Z({loop:jr[t]},this.#t)),this.#s=Z(Jo,this.#e)}tick(e){const{renderContext:{item:t}}=this,{state:{facing:n,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#o){const l=Cn(n);this.#o(l)}if(this.#n){const l=r&&!s;this.#n(l)}this.#s(r);const a=!ks(i,fe);this.#i&&this.#i(a),this.#r.tick(e,a)}destroy(){this.#n?.(!1),this.#i?.(!1),this.#r.destroy()}}const op=.8;class rp{output=I.createGain();#e;#t;#o;#n;renderContext;constructor(e){this.renderContext=e,this.#e=new ee(e,{pushed:null}),this.#e.output.connect(this.output),this.#t=Z(Jo,this.output),this.#o=I.createGain(),this.#o.gain.value=op,this.#o.connect(this.output),this.#n=Z({loop:{soundId:"lowerSmallMotorLoop",randomiseStartPoint:!0,gain:.5}},this.#o)}tick(e){const{renderContext:{item:{state:{activated:t}}}}=this;this.#n(t),this.#t(this.renderContext.item.state.activated),this.#e.tick(e)}destroy(){this.#n(!1),this.#e.destroy()}}class sp{output=I.createGain();renderContext;constructor(e){this.renderContext=e;const{item:{config:{forCharacter:t}}}=e;t==="crown"&&(X({soundId:"crownSparkle",connectTo:this.output,varyPlaybackRate:!0}),this.output.gain.value=1.2)}tick(){}destroy(){}}const ip=.8,ap=1.2,lp=.8;class Xn{output=I.createGain();#e;#t;#o=I.createGain();#n;#r=I.createGain();#i=Z({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#r);#s;#a;#c=null;renderContext;constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:n}}=e;(t.noFootsteps??St.soundSettings.noFootsteps)||(this.#e=I.createGain(),this.#e.gain.value=ip,this.#e.connect(this.output),this.#t=Z({loop:{soundId:`${n==="headOverHeels"?"heels":n}Walk`}},this.#e)),this.#a=Z({start:{soundId:`${n}Accent`,gain:.3},noStartOnFirstFrame:!1},this.output),this.#o.gain.value=lp,this.#o.connect(this.output),this.#r.gain.value=ap,this.#r.connect(this.output),this.#n=Z({start:{soundId:`${n==="headOverHeels"?"head":n}Jump`}},this.#o),this.#s=new ee(e,{fall:n==="headOverHeels"||n==="head"?{soundId:"headFall"}:void 0,standingOn:{soundId:"softBump"},collision:{soundId:"softBump",gain:.5}}),this.#s.output.connect(this.output)}tick(e){const{renderContext:{item:t,general:{gameState:n}}}=this,{state:{action:r,teleporting:s,jumpStartZ:i,jumped:a,standingOnItemId:l,position:{z:c},vels:{gravity:{z:u},walking:d}}}=t,h=Lo(t),p=s?s.phase:null,f=a&&c>i&&c>this.#s.currentPositionZ&&u>0;this.#n(f);const m=c<this.#s.currentPositionZ&&u<0&&l===null,g=!f&&!m&&Bo(d)>Oe;if(this.#t!==void 0&&this.#t(g),h!==void 0&&this.#i(h.carrying!==null),p!==null&&p!==this.#c)if(p==="in"){const x=no().teleportIn,b=I.createBufferSource();b.buffer=x,b.connect(this.output),b.start()}else{const x=no().teleportOut,b=I.createBufferSource();b.buffer=x,b.connect(this.output),b.start()}this.#c=p,this.#s.tick(e,g||r==="falling"),this.#a($i(n,t))}destroy(){this.#t?.(!1),this.#n(!1),this.#i(!1),this.#a(!1),this.#s.destroy()}}class cp{output=I.createGain();#e;renderContext;constructor(e){this.renderContext=e,this.#e=new ee(e,{standingOn:{soundId:"metalHit"},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#e.output.connect(this.output)}tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const up={collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8},pushed:{soundId:"iceScrape",varyPlaybackRate:!0,randomiseStartPoint:!0}};class dp{output=I.createGain();#e;renderContext;constructor(e){this.renderContext=e,this.#e=new ee(e,e.item.config.style==="puck"?up:void 0),this.#e.output.connect(this.output)}tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class hp{output=I.createGain();#e;renderContext;constructor(e){this.renderContext=e,this.#e=new ee(e,{collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8,playbackRate:1.5},pushed:{soundId:"glassClink",varyPlaybackRate:!0,playbackRate:1.5}}),this.#e.output.connect(this.output)}tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class pp{output=I.createGain();#e;renderContext;constructor(e){this.renderContext=e;const{item:{state:t}}=e;t.played===!1&&(this.#e=X(e.item.config.soundOptions),He(this.#e,e.item.config.soundOptions,this.output),t.played=!0)}tick(e){}destroy(){this.#e!==void 0&&Lt(this.#e,this.output)}}class fp{output=I.createGain();#e;renderContext;constructor(e){this.renderContext=e,this.#e=new ee(e),this.#e.output.connect(this.output)}tick(e){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:n}}}}=this,r=Jt(t);e.lastRenderRoomTime!==void 0&&n>e.lastRenderRoomTime&&!r&&X({soundId:"springBoing",connectTo:this.output}),this.#e.tick(e)}destroy(){this.#e.destroy()}}class mp{output=I.createGain();#e=I.createGain();#t=void 0;renderContext;constructor(e){this.renderContext=e,this.#e.connect(this.output)}tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,n=t.type==="in-store"?ws(U.getState().gameMenus,t.path)?"right":"left":e;this.#t!==void 0&&this.#t!==n&&X({soundId:"switchClick",playbackRate:n==="right"?.95:1.05,connectTo:this.#e}),this.#t=n}destroy(){}}const gp=o=>o.item.type==="portableTeleporter";class Zr{output=I.createGain();#e;#t;renderContext;constructor(e){this.renderContext=e,this.#e=Z({loop:{soundId:"teleportWarningSiren",playbackRate:e.item.type==="portableTeleporter"?1.25:1}},this.output);const t=e;gp(t)&&(this.#t=new ee(t),this.#t.output.connect(this.output))}tick(e){const{renderContext:{item:t,room:n}}=this;this.#e(kn(t)&&nt(t.state.stoodOnBy,n).some(be)),this.#t?.tick(e)}destroy(){this.#e(!1),this.#t?.destroy()}}const xp=(o,e)=>xs(nt(o.state.stoodOnBy,e).filter(Ss));class bp{output=I.createGain();#e=void 0;renderContext;constructor(e){this.renderContext=e,this.output.gain.value=2}tick(e){const{renderContext:{item:t,room:n}}=this,r=xp(t,n);this.#e!==void 0&&r<this.#e&&X({soundId:"toasterPopUp",connectTo:this.output}),this.#e=r}destroy(){}}const yp={ball:Nh,bubbles:Xh,button:jh,charles:Yh,conveyor:Zh,emitter:Jh,firedDoughnut:Kh,head:Xn,headOverHeels:Xn,heels:Xn,lift:ep,monster:np,moveableDeadly:ee,movingPlatform:rp,particle:sp,pickup:ee,portableBlock:ee,portableTeleporter:Zr,pushableBlock:cp,sceneryCrown:ee,sceneryPlayer:ee,slidingBlock:dp,slidingDeadly:hp,soundEffect:pp,spring:fp,switch:mp,teleporter:Zr},vp=o=>{if(o.item.type==="deadlyBlock"&&o.item.config.style==="toaster")return new bp(o);if(o.item.type==="portableBlock"&&o.item.config.style==="drum")return new qh(o);const e=yp[o.item.type];if(e)return new e(o)},qr=G.z*-1,Jr=G.z*Qa,wp=0,Sp=G.x*16,Cp={x:0,y:0,z:0},jn=(o,e,t)=>(o-e)/(t-e)*2-1,Tp=.3,kp=.3;class Ip{output=I.createPanner();#e;#t;renderContext;#o;constructor(e,t){this.renderContext=e,this.#o=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const n=Eo(e.room).floors;this.#e=n.edgeLeftX,this.#t=n.edgeRightX}tick(e){this.#o.tick(e);const{item:t}=this.renderContext,n=t.state,r=Is(_s(Cp,t.aabb,.5),n.position),s=jn(hn(r),this.#e,this.#t),i=jn(r.z,qr,Jr);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${qr},
          ${Jr},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(n.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=jn(r.x+r.y,wp,Sp);this.output.positionX.value=s*Tp,this.output.positionY.value=i,this.output.positionZ.value=a*kp}destroy(){this.#o.destroy()}}class _p{#e;#t=new C({label:"CompositeRenderer"});renderContext;constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(n=>n.output))}tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}const Mp=(o,e)=>e;class Yi extends Li{}const Kr=(o,e)=>{e.poly([F({}),F({x:o.x}),F({x:o.x,y:o.y}),F({y:o.y})]).poly([F({}),F({z:o.z}),F({y:o.y,z:o.z}),F({y:o.y})]).poly([F({x:o.x}),F({x:o.x,z:o.z}),F(o),F({x:o.x,y:o.y})]).poly([F({z:o.z}),F({x:o.x,z:o.z}),F({x:o.x,y:o.y,z:o.z}),F({y:o.y,z:o.z})])},Qr=(o,e)=>{const t=new he;return Kr(o,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),Kr(o,t),t.stroke({width:.5,color:e,alpha:1})}),t},Pp={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Rp{#e;renderContext;constructor(e){this.renderContext=e;const{item:t}=e,n=Pp[t.type]??"rgba(255,255,255)";if(this.#e=new C({label:`ItemBoundingBoxRenderer ${t.id}`}),el("portal")(t)){const s=F(t.config.relativePoint);this.#e.addChild(new he().circle(s.x,s.y,5).stroke(n)),this.#e.addChild(new he().circle(s.x,s.y,2).fill(n))}if(this.#e.addChild(new he({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(Qr(t.aabb,n)),t.renderAabb){const s="rgba(184, 184, 255)",i=Qr(t.renderAabb,s);if(t.renderAabbOffset){const a=F(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(r=new hu({text:s,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)}),e.frontLayer.attach(this.#e)}tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const Bp=75;class Ap{output=new C({label:"ItemFlashOnSwitchedRenderer"});#e;#t;#o;renderContext;#n;constructor(e,t){this.renderContext=e,this.#n=t,this.output.addChild(t.output);const{spriteOption:n,spritesheetMeta:r}=e.general,{color:s}=e.room,i=s.shade==="dimmed";let a,l;n.uncolourised?(a=ae(s),l=to.black):(a=vt(r,i,"left"),l=vt(r,i,"right")),this.#e=new mo(a),this.#t=new mo(l),this.#o=new Ee({color:n.uncolourised?to.black:Fo(r.palette,r.effectColours.outline,oe("for-current-room").ambient)}),this.#e.enabled=!1,this.#t.enabled=!1,this.#o.enabled=!1,this.output.filters=[this.#e,this.#t,this.#o]}tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:n}},room:{roomTime:r}}}=this,s=r-t<Bp,i=n==="left";this.#e.enabled=s&&i,this.#t.enabled=s&&!i,this.#o.enabled=s,this.#n.tick(e)}destroy(){this.output.destroy(),this.#n.destroy()}}const Op=(o,e)=>{const{item:t,room:{items:n}}=o;return le(n).filter(tl).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new Ap(o,e):e},Zi=(o,e,t,n)=>{const r=1/n;o.x=Fr(e,r),o.y=Fr(t,r)},qi=new _c;qi.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class Fp{output;#e=new Map;renderContext;#t;constructor(e,t){this.renderContext=e,this.#t=t,this.output=new C({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#o()}#o(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=F(this.renderContext.item.state.position);Zi(this.output,t.x,t.y,e)}tick(e){this.#t?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#o(),this.#s()}#n(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return wt;let n;for(const[r,s]of t)s&&(n||(n=new Set),n.add(r));return n??wt}#r(e,t){const n=new C({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(n),n.setMask({mask:t,inverse:!0}),this.#e.set(e,n),n}#i(e,t){const[n,r]=t.children,s=t.parent;s.removeChild(t),s.addChild(r),t.mask=null,n.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#n();for(const n of this.#e.keys())if(!t.has(n)){const r=this.#e.get(n);if(r)try{this.#i(n,r)}catch(s){throw new Error(`error while destroying masking container ${ao(r)} 
              for our rendering: ${ao(this.output)}`,{cause:s})}}for(const n of t){const r=this.#e.get(n),s=r?.children[0],i=this.renderContext.getItemRenderPipeline(n)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=qi;const l=Se(e,i,s,`red mask: ${n}`);i.filters=a,r===void 0&&this.#r(n,l);const c=this.renderContext.room.items[n],u=Le(F(c.state.position),F(this.renderContext.item.state.position));l.x=u.x,l.y=u.y}}destroy(){this.output.destroy({children:!0}),this.#t?.destroy()}}const Yn=(o,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:n})=>{const r=n?.renderProps,s=wn(t)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=S({textureId:s==="left"||s==="away"?`shadowMask.${o}.away`:`shadowMask.${o}.right`,spritesheetVariant:"original"});return a.y=-(G.z*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},Lp={left:"away",towardsLeft:"awayRight",towards:"right"},zp=(o,e,t,n)=>{if(!e)return`shadowMask.${o}.${t}`;const r=`shadowMask.${o}.falling.${t}`;return ye(r,n.data)?r:`shadowMask.${o}.${t}`},Zn=(o,e=1)=>({renderContext:{item:t},currentRendering:n})=>{const r=t.type==="sceneryPlayer"?"idle":t.state.action,s=n?.renderProps,i=t.type==="sceneryPlayer"?t.config.startDirection:Cn(t.state.visualFacingVector??t.state.facing)??"towards",a=r==="falling";if(!(s===void 0||i!==s.facingXy8||a!==s.falling))return"no-update";const c=Lp[i],u=c??i,d=pe(),h=zp(o,a,u,d),p=S({textureId:h,spritesheet:d});return p.y=-(G.z*(e-1)),p.scale.x=c===void 0?1:-1,{output:p,renderProps:{facingXy8:i,falling:a}}},es=({renderContext:{general:{pixiRenderer:o},item:e,room:t},currentRendering:n})=>{const{type:r,state:{stoodOnBy:s},config:{times:i}}=e,a=n?.renderProps,l=kn(e),c=l&&nt(s,t).find(be)!==void 0;return a===void 0||l!==a.activated||c!==a.flashing?{output:It(o,Rn({textureId:c?`shadowMask.${r}.flashing`:l?`shadowMask.${r}`:"shadowMask.artificial",spritesheetVariant:"original"},i)),renderProps:{flashing:c,activated:l}}:"no-update"},qn={lift:ue({textureId:"shadowMask.smallBlock",spritesheetVariant:"original"}),conveyor:Re(({direction:o})=>({textureId:"shadowMask.conveyor",flipX:yt(o)==="x",spritesheetVariant:"original"})),doorLegs:Re(({direction:o})=>({textureId:o==="right"||o==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:yt(o)==="y",spritesheetVariant:"original"})),teleporter:es,portableTeleporter:es,floor:"no-mask",barrier:Re(({axis:o})=>({textureId:"shadowMask.barrier.y",flipX:o==="x",y:-1,spritesheetVariant:"original"})),spring:Zd,block:Re(({style:o})=>({textureId:`shadowMask.${o}`,spritesheetVariant:"original"})),pushableBlock:ue({textureId:"shadowMask.stepStool",spritesheetVariant:"original"}),movingPlatform:ue({textureId:"shadowMask.sandwich",spritesheetVariant:"original"}),hushPuppy:ue({textureId:"shadowMask.hushPuppy",spritesheetVariant:"original"}),portableBlock:Re(({style:o})=>({textureId:o==="drum"?"shadowMask.drum":"shadowMask.smallBlock",spritesheetVariant:"original"})),slidingBlock:Re(({style:o})=>o==="book"?{textureId:"shadowMask.book",flipX:!0,spritesheetVariant:"original"}:{textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),deadlyBlock:Re(({style:o})=>({textureId:o==="volcano"?"shadowMask.volcano":"shadowMask.toaster",spritesheetVariant:"original"})),spikes:ue({textureId:"shadowMask.spikes",spritesheetVariant:"original"}),switch:ue({textureId:"shadowMask.switch",spritesheetVariant:"original"}),button:ue({textureId:"shadowMask.buttonInGame",spritesheetVariant:"original"}),pickup:Re(({gives:o})=>{switch(o){case"scroll":return{textureId:"shadowMask.scroll",spritesheetVariant:"original"};case"doughnuts":return{textureId:"shadowMask.doughnuts",spritesheetVariant:"original"};case"fast":case"extra-life":case"jumps":case"shield":return{textureId:"shadowMask.whiteRabbit",spritesheetVariant:"original"};default:return{textureId:"blank",spritesheetVariant:"original"}}}),slidingDeadly:ue({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),ball:ue({textureId:"shadowMask.ball",spritesheetVariant:"original"}),"monster.dalek":ue({textureId:"shadowMask.dalek",spritesheetVariant:"original"}),"monster.turtle":Yn("turtle"),"monster.skiHead":Yn("skiHead"),"monster.homingBot":ue({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),joystick:ue({textureId:"shadowMask.joystick",spritesheetVariant:"original"}),charles:Yn("charles",2),head:Zn("head"),heels:Zn("heels"),headOverHeels:Zn("head",2)},Ep=o=>{switch(o.type){case"sceneryPlayer":return qn[o.config.which];case"monster":return qn[`monster.${o.config.which}`];case"floor":return o.config.floorType==="none"?void 0:"no-mask";default:return qn[o.type]}},Dp=.66,Up=o=>o.shadowCastTexture!==void 0,lt={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:Cs}};class Gp{#e=new C({label:"ItemShadowRenderer"});#t=new C({label:"shadows"});#o;#n=new Map;renderContext;#r;constructor(e,t){this.renderContext=e,this.#r=t,this.#e.addChild(this.#t),this.#i||(this.#e.filters=new kc({alpha:Dp}))}initShadowMaskRenderer(){const{renderContext:e}=this,t=this.#r;if(t!=="no-mask")if(this.#o=new Yi(e,t),e.item.shadowOffset===void 0)this.#e.addChild(this.#o.output);else{const n=new C({label:"shadowMaskOffset",children:[this.#o.output],...F(e.item.shadowOffset)});this.#e.addChild(n)}}get#i(){return U.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#s(e){if(this.#o===void 0)return;const t=this.#o.output.children.at(0);this.#o.tick(e);const n=this.#o.output.children.at(0);if(n===void 0||!(n instanceof re)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${n}`)}t!==n&&(this.#i?this.renderContext.frontLayer.attach(n):this.#e.mask=n)}destroy(){this.#e.destroy(!0),this.#o?.destroy();for(const e of Object.values(this.#n))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:n,general:{pixiRenderer:r},room:s}=this.renderContext,i=t.has(n),a=n.state.position.z+n.aabb.z;lt.state.position.x=n.state.position.x,lt.state.position.y=n.state.position.y,lt.state.position.z=a,lt.aabb.x=n.aabb.x,lt.aabb.y=n.aabb.y;const l=new Set(zo(lt,s[Xt],u=>u!==n&&Up(u)&&(u.castsShadowWhileStoodOn||u.state.position.z>n.state.position.z+n.aabb.z)&&!u.noShadowCastOn?.includes(n.type)));let c=!1;for(const[u,d]of this.#n)l.has(u)||(this.#t.removeChild(d),d.destroy(),this.#n.delete(u));for(const u of l){c=!0;let d=this.#n.get(u),h=!1;if(!d){const{times:p}=u.config,{shadowCastTexture:f}=u,m=Rn({...f,paused:this.renderContext.general.paused},p);d=It(r,m),d.label=u.id,this.#t.addChild(d),this.#n.set(u,d),h=!0}if(h||i||t.has(u)){const p=F({...Gt(Le(u.state.position,n.state.position),u.shadowOffset??jt),z:n.aabb.z});d.x=p.x,d.y=p.y}}this.#e.visible=c,c?(this.#o===void 0&&this.initShadowMaskRenderer(),this.#s(e)):this.#o!==void 0&&(this.#o.destroy(),this.#o=void 0)}get output(){return this.#e}}const Wp=o=>{const e=Ep(o.item);return e===void 0?void 0:new Gp(o,e)};class Vp{output;renderContext;#e;constructor(e,t){this.renderContext=e,this.#e=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}tick(e){this.#e.graphics?.tick(e),this.#e.sound?.tick(e)}destroy(){this.#e.graphics?.destroy(),this.#e.sound?.destroy()}}class $p{output=new C({label:"PortableItemPickUpNextHighlightRenderer"});#e;renderContext;#t;constructor(e,t){this.renderContext=e,this.#t=t,this.output.addChild(t.output);const{general:{spriteOption:n,spritesheetMeta:r},room:s}=e;this.#e=new Ee({color:n.uncolourised?ae(s.color):vt(r,s.color.shade==="dimmed","carry")}),this.#e.enabled=!1,this.output.filters=this.#e}tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;this.#e.enabled=t,this.#t.tick(e)}destroy(){this.output.destroy(),this.#t.destroy()}}const Hp=(o,e)=>ko(o.item)?new $p(o,e):e,Np=(o,e)=>{const{gameMenus:{cheatsOn:t}}=U.getState();e!==void 0&&t&&(e.eventMode="static",e.on("pointertap",()=>{U.dispatch(ol({item:o,pixiContainer:e}))}))},Xp=(o,e=Mp)=>{const t=U.getState(),n=nl(t),r=!o.general.spriteOption.uncolourised,{general:{paused:s}}=o,{item:i}=o,a=n==="all"||n==="non-wall"&&o.item.type!=="wall",l=[],c=Xi(i);let u;if(c!==void 0&&(u=new Yi(o,c),l.push(e(o,Hp(o,Op(o,u))))),r){const m=Wp(o);m!==void 0&&l.push(m)}a&&l.push(new Rp(o));let d;if(l.length===0)d=void 0;else{const m=l.length===1?l[0]:new _p(l,o);d=new Fp(o,m),Np(i,d.output)}const h=o.general.soundSettings.mute??St.soundSettings.mute,p=s||h?void 0:vp(o),f=p===void 0?void 0:i.noSoundPan?p:new Ip(o,p);return{top:new Vp(o,{graphics:d,sound:f}),itemAppearanceRenderer:u}},jp=o=>{for(const[,l]of o)for(const[c]of l)l.set(c,!1);const e=Array.from(Yp(o));let t=e.length,n=t;const r=new Array(t),s={},i=Zp(e);for(;n--;)s[n]||a(e[n],n,new Set,null);return r;function a(l,c,u,d){if(u.has(l)){if(d!==null){const f=o.get(d);f?.has(l)&&f.set(l,!0)}return}if(s[c])return;s[c]=!0;const h=o.get(l),p=Array.from(h?.entries()??wt);if(c=p.length){u.add(l);do{const[f,m]=p[--c];m||a(f,i.get(f),u,l)}while(c);u.delete(l)}r[--t]=l}};function Yp(o){const e=new Set;for(const[t,n]of o.entries()){e.add(t);for(const r of n.keys())e.add(r)}return e}function Zp(o){const e=new Map;for(let t=0,n=o.length;t<n;t++)e.set(o[t],t);return e}const qp=(o,e,t,n)=>(o.has(e)||o.set(e,new Map),o.get(e).set(t,n),o),Rt=(o,e,t)=>{const n=o.get(e);return n!==void 0&&(n.delete(t),n.size===0&&o.delete(e)),o},Jn=1e-5,ts=-.1,Bt=(o,e,t,n,r)=>n-r>o&&t<e-r,Jp=0,Ji=1,Ki=2,Qi=3,Kp=(o,e)=>{const t=Bt(o.zAxisProjectionMin,o.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,Jn),n=Bt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Jn),r=Bt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Jn);return n&&r&&t?Ji:r&&t&&Bt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,ts)?Ki:n&&t&&Bt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,ts)?Qi:Jp},yo=2,ns=(o,e,t,n)=>{const r=o.x,s=r+e.x,i=t.x;if(s<=i)return 1;const a=i+n.x;if(r>=a)return-1;const l=o.y,c=l+e.y,u=t.y;if(c<=u)return 1;const d=t.y+n.y;if(l>=d)return-1;const h=o.z,p=h+e.z,f=t.z;if(p<=f)return-1;const m=t.z+n.z;return h>=m?1:yo},Qp=(o,e,t,n)=>{const r=o.x,s=r+e.x,i=t.x,a=i+n.x,l=o.y,c=l+e.y,u=t.y,d=u+n.y,h=o.z,p=h+e.z,f=t.z,m=f+n.z,g=s-i,x=c-u,b=p-f,M=a-r,w=d-l,y=m-h,v=Math.abs(g)<Math.abs(M)?g:-M,P=Math.abs(x)<Math.abs(w)?x:-w,T=-(Math.abs(b)<Math.abs(y)?b:-y),A=Math.abs(v),B=Math.abs(P),_=Math.abs(T);return A<B?A<_?v:T:B<_?P:T},ef=(o,e,t)=>{if(o.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=o.state.position,r=o.renderAabbOffset?ge(n,o.renderAabbOffset):n,s=o.renderAabb||o.aabb,i=e.state.position,a=e.renderAabbOffset?ge(i,e.renderAabbOffset):i,l=e.renderAabb||e.aabb;switch(Kp(t.getItemAxesProjections(o),t.getItemAxesProjections(e))){case Ji:{let u=ns(r,s,a,l);return u===yo&&(o.renderAabbOffset!==void 0||o.renderAabb!==void 0||e.renderAabbOffset!==void 0||e.renderAabb!==void 0)&&(u=ns(n,o.aabb,i,e.aabb)),u===yo&&(u=Qp(r,s,a,l)),u}case Ki:return Te(r.y,a.y+l.y)&&Te(r.z,a.z+l.z)?1:Te(a.y,r.y+s.y)&&Te(a.z,r.z+s.z)?-1:a.y-a.z-(r.y-r.z);case Qi:return Te(r.x,a.x+l.x)&&Te(r.z,a.z+l.z)?1:Te(a.x,r.x+s.x)&&Te(a.z,r.z+s.z)?-1:a.x-a.z-(r.x-r.z);default:return 0}},tf=(o,e=new ql(xt(o)),t=Object.values(o),n=new Map)=>{const r=new Map;for(const[s,i]of n)if(!o[s])n.delete(s);else for(const[a]of i)o[a]||Rt(n,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=n.get(s.id);a?.forEach((l,c)=>{i.has(o[c])||a.delete(c)}),n.forEach((l,c)=>{i.has(o[c])||Rt(n,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||r.get(a)?.has(s))continue;const l=ef(s,a,e);if(r.has(s)||r.set(s,new Set),r.get(s).add(a),l===0){Rt(n,s.id,a.id),Rt(n,a.id,s.id);continue}const c=l>0?s.id:a.id,u=l>0?a.id:s.id;qp(n,u,c,!1),Rt(n,c,u)}}return n};class nf{#e=!1;#t=new C({label:"items",cullableChildren:!0});#o;#n=new Ir({sortableChildren:!1});output;#r=void 0;#i=new Map;#s=new Map;renderContext;constructor(e){this.renderContext=e;const{general:{spriteOption:t,soundSettings:n},room:r}=e,i=n.mute??St.soundSettings.mute?void 0:I.createGain();this.output={sound:i,graphics:new C({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t.uncolourised&&(this.#o=new Ir({sortableChildren:!1}),this.output.graphics.addChild(this.#o)),this.output.graphics.addChild(this.#n),t.uncolourised&&(this.#t.tint=ae(r.color))}#a=e=>this.#s.get(e);#c(e,t){let n=this.#s.get(t.id);if(n===void 0){n=Xp({...this.renderContext,colourClashLayer:this.#o,frontLayer:this.#n,item:t,zEdges:this.#i,getItemRenderPipeline:this.#a},this.renderContext.wrapItemAppearanceRenderer),this.#s.set(t.id,n);const{graphics:r,sound:s}=n.top.output;if(r&&(this.#t.addChild(r),t.fixedZIndex&&(r.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{n.top.tick(e)}catch(r){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:r})}}#l(e){const{room:t}=this.renderContext,n={...e,lastRenderRoomTime:this.#r},r=new Set,s=a=>{if(r.has(a))return;const l=this.#i.get(a);if(l)for(const[c,u]of l.entries())u&&s(c);this.#c(n,t.items[a]),r.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#s.entries())t.items[a]===void 0&&(l.top.destroy(),this.#s.delete(a),i=!0);i&&this.#u()}#u(){if(this.#o)for(const e of this.#o.renderLayerChildren)e.parent===null&&this.#o.detach(e);for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e)}#d(e){for(let t=0;t<e.length;t++){const n=this.#s.get(e[t]);if(n===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const r=n.top.output.graphics;if(!r)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);r.zIndex=t}}get#h(){return this.#r!==void 0}tick(e){const t=this.#h?e:{...e,movedItems:new Set(le(this.renderContext.room.items))},{renderContext:{room:n}}=this;tf(n.items,n[Xt],t.movedItems,this.#i);const r=jp(this.#i);this.#l(t),(!this.#h||t.movedItems.size>0)&&this.#d(r),this.#r=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0});const{sound:e}=this.output;if(e){const t=qo*1e3;setTimeout(()=>{e.disconnect()},t)}this.#s.forEach(t=>{t.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const ct=.4,of=300,rf=36,sf=.2,af=1250,os=(o,e)=>rl(o,Math.min(1,e/of)),Kn=64;class lf{#e={x:0,y:0};#t={x:0,y:0};#o=Vt;#n=!1;#r;#i;#s;#a;#c;#l;output;renderContext;#u;constructor(e,t){this.renderContext=e,this.#u=t;const{room:n,general:{upscale:{gameEngineScreenSize:r},displaySettings:s}}=e,i=e.general.onScreenControls??St.onScreenControls,{floors:{edgeLeftX:a,edgeRightX:l,bottomEdgeY:c},allItems:{topEdgeY:u}}=Eo(n);this.#a=a,this.#c=l;let d=(l+a)/2;const h=l-a,p=c-u,f=r.y>=p,m=r.x>=h,g=f&&m;m&&!i&&(d/=2);const x=i?-4:f?16:0;this.#l={x:r.x/2-d,y:f&&i?Math.floor((r.y+p)/2)-4:r.y-x-c-(g&&!i?Math.abs(d/2):0)},this.#r=this.#l.x+this.#a<0,this.#i=this.#l.x+this.#c>r.x,this.#s=this.#l.y+u<0;const b=this.#u.output.graphics;if(b===void 0)throw new Error("can't scroll a renderer without graphics");const M={sound:this.#u.output.sound,graphics:new C({children:[b],label:`RoomScrollRenderer(${n.id})`})};(s?.showBoundingBoxes??St.displaySettings.showBoundingBoxes)!=="none"&&M.graphics.addChild(cf(e.room)),this.output=M}#d(e){const{general:{upscale:{gameEngineScreenSize:t},onScreenControls:n}}=this.renderContext,r=F(e);let s,i;const a=n?Kn:0,{x:l,y:c}=this.#l,u=Gt(r,this.#l);if(this.#r&&u.x<t.x*ct){const d=Math.max(r.x,n?this.#a+Kn:Number.NEGATIVE_INFINITY),h=t.x*ct-d;s=Math.min(-this.#a+a,h)}else if(this.#i&&u.x>t.x*(1-ct)){const d=Math.min(r.x,n?this.#c-Kn:Number.POSITIVE_INFINITY),h=t.x*(1-ct)-d;s=Math.max(t.x-this.#c-a,h)}else s=l;return this.#s&&u.y<t.y*ct?i=t.y*ct-r.y:i=c,{x:s,y:i}}#h(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=this.#e,n=this.output.graphics,r=Gt(t,this.#t);Zi(n,r.x,r.y,e)}#p(e){const{general:{gameState:t},room:{roomTime:n}}=this.renderContext,{deltaMS:r}=e,{inputStateTracker:{lookVector:s,hudInputState:{lookVector:i}}}=t;Fn(s)+Fn(i)<Oe?this.#o<n-af&&(this.#t=Le(this.#t,os(this.#t,r))):(this.#o=n,this.#t=Ro(ge(this.#t,ze(s,r*sf)),i),i.x=0,i.y=0)}tick(e){const{general:{gameState:t}}=this.renderContext,{deltaMS:n}=e;this.#p(e);const r=Zt(t);if(r===void 0)return;const s=this.#d(r.state.position);if(!this.#n)this.#e=s;else{const a=Le(this.#e,s);if(Fn(a)>rf){const l=os(a,n);this.#e={x:this.#e.x-l.x,y:this.#e.y-l.y}}}this.#h(),this.#n=!0,this.#u.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.#u.destroy()}}const cf=o=>{const{floors:{edgeLeftX:e,edgeRightX:t,bottomEdgeY:n,topEdgeY:r},allItems:{topEdgeY:s}}=Eo(o);return new he().rect(e,s,t-e,n-s).stroke("red").rect(e,r,t-e,n-r).stroke("blue")};var uf=`#version 300 es
precision highp float;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const int sampleCount=4;const float dimmedAttributeLum=0.6;const float isDimThresh03=1.5;const float saturationThreshold=0.15;const vec3 channelStrengthModifier=vec3(0.8,1.0,1.1);const vec4 pureWhiteColour=vec4(1.0,1.0,1.0,1.0);const vec4 pureBlueColour=vec4(0.0,0.0,1.0,1.0);const vec4 pureBlackColour=vec4(0.0,0.0,0.0,1.0);vec2 attributeBlockPos(vec2 texSize,float blockSize,vec2 textureCoord){vec2 pixelPos=textureCoord*texSize;return(floor(pixelPos/blockSize)*blockSize)/texSize;}vec4 attributeClash(sampler2D inputTexture,sampler2D lut,float blockSize,float blackPoint,float inputDim,vec2 textureCoord){vec2 textureSize=vec2(textureSize(inputTexture,0));vec2 blockPos=attributeBlockPos(textureSize,blockSize,textureCoord);vec3 colorSum=vec3(0.0);float colouredSamplesCount=0.001;vec2 stepSize01=vec2(blockSize/float(sampleCount))/textureSize;vec2 samplePos01=blockPos;for(int y=0;y<sampleCount;y++){samplePos01.y+=stepSize01.y;samplePos01.x=blockPos.x;for(int x=0;x<sampleCount;x++){samplePos01.x+=stepSize01.x;vec4 sampleColor=lutColourReplace(lut,texture(inputTexture,samplePos01))*inputDim;float isInBounds=step(0.0,samplePos01.x)*step(samplePos01.x,1.0)*step(0.0,samplePos01.y)*step(samplePos01.y,1.0);float useSample=isNotBlack(sampleColor,blackPoint)*isInBounds;colorSum+=sampleColor.rgb*sampleColor.rgb*useSample;colouredSamplesCount+=useSample;}}vec3 avgColor=colorSum/colouredSamplesCount;float avgColorLum03=max(avgColor.r+avgColor.g+avgColor.b,0.01);vec3 channelsStrength=avgColor/avgColorLum03;vec4 quantisedColor=vec4(step(0.3,channelsStrength*channelStrengthModifier),0.1);float maxChannel=max(channelsStrength.r,max(channelsStrength.g,channelsStrength.b));float minChannel=min(channelsStrength.r,min(channelsStrength.g,channelsStrength.b));float sat=maxChannel-minChannel;float isSaturated01=step(saturationThreshold,sat);float isBright=step(isDimThresh03,avgColorLum03);float thresholdForUnsatToBeBlue=step(isDimThresh03*0.3,avgColorLum03);float thresholdForSaturatedToBeBlue=step(isDimThresh03*0.03,avgColorLum03);vec4 unsatOrQuantisedColor=mix(mix(pureBlueColour,pureWhiteColour,thresholdForUnsatToBeBlue),mix(pureBlueColour,quantisedColor,thresholdForSaturatedToBeBlue),isSaturated01);float dimMultiplier=mix(dimmedAttributeLum,1.0,isBright);vec4 dimmedColor=unsatOrQuantisedColor*dimMultiplier;vec4 c=lutColourReplace(lut,texture(inputTexture,textureCoord))*inputDim;float originalColorIsNotBlack=isNotBlack(c,blackPoint);return mix(pureBlackColour,dimmedColor,originalColorIsNotBlack);}in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform float uBlockSize;uniform float uBlackPoint;uniform float uProgress;uniform sampler2D uLut;uniform float uCentreX;uniform float uCentreY;uniform vec4 uInputClamp;const float blackCircleMinSize=0.33;const float blackCircleFeathering=0.4;const float fadeDuration=0.1;float fade(){return 1.0-smoothstep(1.0 - fadeDuration,1.0,uProgress);}float blockDistToCentre(float ellipticalFactor){float xCentreTrue=uInputClamp.x+(uInputClamp.z-uInputClamp.x)*uCentreX;float yCentreTrue=uInputClamp.y+(uInputClamp.w-uInputClamp.y)*uCentreY;vec2 trueCentre=vec2(xCentreTrue,yCentreTrue);vec2 texSize=vec2(textureSize(uTexture,0));float texAspect=texSize.x/texSize.y;vec2 blockPos=attributeBlockPos(texSize,uBlockSize,vTextureCoord);return length((blockPos-trueCentre)/vec2(1,texAspect*ellipticalFactor));}float isInCirc(float blockDistToCentre01,float feathering,float circleMinSize,float progress){return smoothstep(progress-feathering,progress+feathering,pow(1.0-blockDistToCentre01,3.0)+circleMinSize);}void main(void){float elipticalFactor=mix(1.0,0.5,uProgress);float blockDistToCentre=blockDistToCentre(elipticalFactor);float insideBlackCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,blackCircleMinSize,uProgress-0.2);float insideInnerCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,0.0,uProgress*1.5-0.3);vec4 clashColour=attributeClash(uTexture,uLut,uBlockSize,uBlackPoint,max(insideBlackCirc01-pow(uProgress,4.0),0.0),vTextureCoord);vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(clashColour,c,insideInnerCirc01*fade());}`;const df=ne.from({vertex:tt,fragment:uf,name:"attribute-block-filter"});class hf extends te{uniforms;constructor({blockSize:e=8,blackPoint:t=.1,centreX:n=.5,centreY:r=.5}={}){super({glProgram:df,resources:{attributeBlockUniforms:{uBlockSize:{value:e,type:"f32"},uBlackPoint:{value:t,type:"f32"},uProgress:{value:0,type:"f32"},uCentreX:{value:n,type:"f32"},uCentreY:{value:r,type:"f32"}},uLut:Vl.source}}),this.uniforms=this.resources.attributeBlockUniforms.uniforms}set progress(e){this.resources.attributeBlockUniforms.uniforms.uProgress=e}set centreX(e){this.resources.attributeBlockUniforms.uniforms.uCentreX=e}set centreY(e){this.resources.attributeBlockUniforms.uniforms.uCentreY=e}}class pf{output;#e;renderContext;#t;constructor(e,t){this.renderContext=e,this.#t=t;const{room:n}=e,r=this.#t.output.graphics,s={sound:this.#t.output.sound,graphics:new C({children:[r],label:`TeleportEffectRenderer(${n.id})`})};this.output=s,this.#n()}#o(e){const t=ge(e.state.position,ze(e.aabb,.5)),{renderContext:{general:{upscale:{rotate90:n}}}}=this,{x:r,y:s}=F(t),i=this.output.graphics.getLocalBounds();this.output.graphics.filterArea=i.rectangle;const a=(r-i.x)/i.width,l=(s-i.y)/i.height;n?(this.#e.centreX=1-l,this.#e.centreY=a):(this.#e.centreX=a,this.#e.centreY=l)}#n(){const{renderContext:{general:{gameState:{currentCharacterName:e}},room:{items:t,id:n}}}=this,r=t[e];if(r!==void 0){const{teleporting:s}=r.state,i=s!==null&&s.otherRoom!==n;if(this.#e!==void 0!==i)if(i){const{renderContext:{general:{upscale:{gameEngineUpscale:l}}}}=this;this.#e=new hf({blockSize:l*8}),this.#o(r),this.output.graphics.filters=[this.#e]}else this.#e=void 0,this.output.graphics.filters=Nt;else if(i){const{startRoomTime:l,phase:c}=s,d=Math.max(0,ur-(this.renderContext.room.roomTime-l))/ur,h=c==="in"?d:1-d;this.#e.progress=h,this.#o(r)}}}tick(e){this.#t.tick(e),this.#n()}destroy(){this.output.graphics.destroy({children:!0}),this.#e?.destroy(),this.#t.destroy()}}const At=o=>({avgMs:o.avgMs.toFixed(2),percentage:o.percentage.toFixed(1)+"%",fps:(1e3/o.avgMs).toLocaleString("en-GB",{maximumFractionDigits:0})}),ff=o=>{const{frameCount:e,fps:t,theoreticalFps:n,phases:r,elapsedMs:s}=o;console.log(`Frame timing (${e} frames in ${(s/1e3).toFixed(3)}s, ${t.toFixed(1)} fps, theoretical max: ${n.toLocaleString("en-GB",{minimumFractionDigits:1,maximumFractionDigits:1})} fps):`),console.table({physics:At(r.physics),hudUpdateSceneGraph:At(r.hudUpdateSceneGraph),updateSceneGraph:At(r.updateSceneGraph),"pixi.js app.render":At(r.pixiRender),total:{...At(r.total),percentage:"100%"}})},mf=()=>{typeof window<"u"&&(window.detailedFps=()=>{Ht.on(ff)},console.log("%cPerformance timing available:","color: #4CAF50; font-weight: bold"),console.log("call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)"))},gf=o=>{for(const e of le(o.items))try{for(const t of nt(e.state.stoodOnBy,o)){if(!o.items[t.id]){Qn(t,o);continue}if(!Jl(t,e)){Qn(t,o);const n=Fs(t,le(o.items));n!==void 0&&As({above:t,below:n})}}}catch(t){throw new Error(`could not update standing on for item "${e.id}"`,{cause:t})}},rs=300,xf=20,bf=38,yf=.5,an=G.x/2;let vf=0;const ea=(o,e)=>Math.random()<o*(e/1e3),ta=(o,e,t,n)=>({...Es,id:`particle.${o}.${vf++}`,type:"particle",aabb:fe,config:{forCharacter:e},state:{...zs(),expires:n+rs+Math.random()*rs,position:t}}),na=(o,e,t,n)=>{if(!ea(t,n))return;const r={...ge(Ql(o),{x:Math.random()*an-an/2,y:Math.random()*an-an/2}),z:o.state.position.z};Yt({room:e,item:ta(o.id,o.type,r,e.roomTime)})},wf=(o,e,t)=>{!(Ls(o.state)>0)||o.state.standingOnItemId===null||vn(o.state.vels.walking)<Oe||na(o,e,xf,t)},Sf=(o,e,t)=>{const{isBigJump:n}=o.state;n&&o.state.standingOnItemId===null&&(o.state.vels.gravity.z<=0||na(o,e,bf,t))},Cf=(o,e)=>{const{head:t,heels:n}=Ms(o.items);t!==void 0&&wf(t,o,e),n!==void 0&&Sf(n,o,e)},Tf=(o,e,t)=>{if(!ea(yf,t))return;const n=Kl(sl),r=ge(e.state.position,{x:n==="x"?0:Math.random()*G.x,y:n==="y"?0:Math.random()*G.y,z:n==="z"?G.z:Math.random()*G.z});Yt({room:o,item:ta(e.id,"crown",r,o.roomTime)})},kf=(o,e,t)=>{o.gameTime+=t,e.roomTime+=t;const n=Zt(o);if(n!==void 0){if(n.type==="headOverHeels")n.state.head.gameTime+=t,n.state.heels.gameTime+=t;else if(n.state.gameTime+=t,o.characterRooms.head===o.characterRooms.heels){const s=ec(o,il(n.type));s!==void 0&&(s.state.gameTime+=t)}}},If=o=>{for(const e of le(o.items)){const t=e.state.position,n=al(t);n!==t&&Ds(o,e,n)}},_f=(o,e)=>o.state.expires!==null&&o.state.expires<e.roomTime,Mf=(o,e)=>{const t={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1,wall:1,floor:1},n=t[o.type]??0,r=t[e.type]??0;return n-r},Pf=(o,e)=>{const{actedOnAt:t}=o.state,n=e===t.roomTime;if(n&&t.actedInXY)return;const{position:r}=o.state,s=!Number.isInteger(r.x)||!Number.isInteger(r.y),i=!n||!t.actedInZ,a=i&&!Number.isInteger(r.z);if(!(!s&&!a))return{x:Math.round(r.x),y:Math.round(r.y),z:i?Math.round(r.z):r.z}},Rf=(o,e)=>{for(const t of le(o.items)){if(!Ut(t))continue;const n=Pf(t,o.roomTime);if(n===void 0)continue;const{id:r}=t,s=l=>l.id!==r&&To(l,t),i={id:r,aabb:t.aabb,state:{position:n}};tc(i,o[Xt],s)||(Ds(o,t,n),e.add(t))}},oa=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Bf=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),ln=G.x*3,Af=(o,e)=>{const{state:{position:t}}=o,{state:{position:n}}=e;return t.x>n.x-ln&&t.x<n.x+ln&&t.y>n.y-ln&&t.y<n.y+ln},Of=(o,e)=>{if(o.state.activated)return Fe;if(o.state.everActivated)return Fe;const t=nc(o.state.position,e);return t===void 0?Fe:Af(o,t)?oa:Bf},Ff=(o,e,t,n)=>o.state.activated?Fe:nt(o.state.stoodOnBy,e).some(be)?oa:Fe,Lf=(o,e,t,n)=>{if(o.config.activated==="while-player-near")return Fe;switch(o.config.activated){case"after-player-near":return Of(o,e);case"on-stand":return Ff(o,e);case"off":case"on":return Fe;default:throw o.config,new Error(`unrecognised item.config.activated ${o.config.activated}`)}},zf={movementType:"steady",stateDelta:{pressed:!0}},Ef={movementType:"steady",stateDelta:{pressed:!1}},Df=(o,e)=>{const{state:{stoodOnUntilRoomTime:t,stoodOnBy:n,pressed:r}}=o,s=t+cl,{roomTime:i}=e,a=!Ui(n),{config:l}=o;if(!a&&i>s&&r)return l.type!=="in-store"&&dr(l.modifies,"right",o,e),Ef;if(!r&&a){if(l.type==="in-store"){const u={nextSpritesOption:ll};U.dispatch(u[l.action]())}else dr(l.modifies,"left",o,e);return zf}return Fe},Uf=(o,e,t)=>{let n=0;for(const r of le(t.items))if(r.state.createdByEmitter===e&&(n++,n>=o))return!1;return!0},Gf=(o,e,t,n)=>{const{id:r,state:s}=o,{lastEmittedAtRoomTime:i,quantityEmitted:a,position:l}=s,{maximum:c}=s;if(c!==null&&a>=c)return;const d=s.delay??0,{roomTime:h}=e;if(h<d)return;const{period:p}=s;if(i+p<h){const f=s.maximumAtOnce??1/0;if(Uf(f,r,e)){const{emits:m}=s,[g]=oc(`${r}-${a}-${Math.floor(h)}`,{...m,position:fe},e.roomJson);if(g===void 0)throw new Error("emitter failed to create a new item");g.state.createdByEmitter=r,Yt({room:e,item:g,atPosition:Ro(l,ze(g.aabb,.5))}),o.state.quantityEmitted++}o.state.lastEmittedAtRoomTime=e.roomTime}},Wf=G.x*.75,Vf=500,$f=(o,e,t,n)=>{const{inputStateTracker:r}=t,s=o.type==="head"?o.state:o.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=o,u=ul(c);if(r.currentActionPress("fire")!=="released"&&a&&so(i)>0){const d={type:"firedDoughnut",...Es,config:xe,id:`firedDoughnut/${o.id}/${e.roomTime}`,shadowCastTexture:rc,state:{...zs(),position:ge(l,ze(u,Wf),o.type==="headOverHeels"?{z:G.z}:fe),vels:{fired:ze(u,Po.firedDoughnut)},disappearing:{on:"touch"}}};Yt({room:e,item:d}),s.doughnuts=sc(s.doughnuts,-1),r.inputWasHandled("fire",Vf)}},ss={movementType:"vel",vels:{gravity:fe}},Hf=(o,e,t,n)=>{if(!To(o))return ss;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=o,l=dl[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=Wt(i,e);return Ao(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-sr*n,-l)}}}:ss}else return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-sr*n,-l)}}}};function*Nf(o,{roomTime:e},t,n){const r=e,s=e-n,i=[];for(let a=0;a<o.state.latentMovement.length;a++){const l=o.state.latentMovement[a];if(l.startAtRoomTime>r)continue;if(l.endAtRoomTime<=s){i.push(a);continue}if(l.fromStandingOn!==o.state.standingOnItemId){i.push(a);continue}const c=Math.max(l.startAtRoomTime,s),d=Math.min(l.endAtRoomTime,r)-c;d>0&&(yield{posDelta:ze(l.velocity,d),movedBy:l.fromStandingOn}),l.endAtRoomTime<=r&&i.push(a)}for(let a=i.length-1;a>=0;a--)o.state.latentMovement.splice(i[a],1)}const is=G.z,as=.001,Xf={movementType:"vel",vels:{lift:fe}},jf=({z:o,lowestZ:e,highestZ:t,direction:n,currentVelocity:r,deltaMS:s})=>{const i=Ge**2/(2*_t);if(n==="up"){const a=t-o;if(a<=i){const l=Math.max(0,a);return Math.max(as,Math.sqrt(2*_t*l))}return r<Ge?Math.min(Ge,r+_t*s):Ge}else{const a=o-e;if(a<=i){const l=Math.max(0,a);return Math.min(-as,-Math.sqrt(2*_t*l))}return r>-Ge?Math.max(-Ge,r-_t*s):-Ge}},Yf=({state:{direction:o,bottom:e,top:t,position:{z:n},vels:r}},s,i,a)=>{const l=e*is,c=t*is;if(l===c&&Te(n,l))return Xf;const u=r?.lift?.z??0,d=jf({z:n,lowestZ:l,highestZ:c,direction:o,currentVelocity:u,deltaMS:a});if(Number.isNaN(d))throw new Error("velocity is NaN");const h=n<=l?"up":n>=c?"down":o;return{movementType:"vel",vels:{lift:{x:0,y:0,z:d}},stateDelta:{direction:h}}},ls={movementType:"vel",vels:{movingFloor:fe}},Zf=(o,e,t,n)=>{if(be(o)&&o.state.teleporting!==null)return ls;const{state:{standingOnItemId:r}}=o,s=Wt(r,e);if(s===null||!hl(s))return ls;const{config:{speed:i},state:{direction:a}}=s,l=i??1,u=l===1&&pl(o)&&o.state.action==="moving"&&wn(o.state.facing)===fl(a)?Po.heels:ml*l,d=ze(gl[a],u);return Us(s.id,o,e,!0,!1),{movementType:"vel",vels:{movingFloor:d}}},qf=(o,e,t,n)=>{const r=o.x*o.x+o.y*o.y,s=e.x*e.x+e.y*e.y;if(r<Oe||s<Oe)return o;const i=Math.atan2(o.x*e.y-o.y*e.x,o.x*e.x+o.y*e.y),a=Math.abs(i);if(a<Oe)return e;const l=a>Math.PI-Oe?a:i,c=t*n,u=Math.max(-c,Math.min(c,l)),d=Math.cos(u),h=Math.sin(u);return{x:o.x*d-o.y*h,y:o.x*h+o.y*d,z:o.z}},Jf=.009,Kf=(o,e,t,n)=>{const{state:{visualFacingVector:r,facing:s}}=o;return{movementType:"steady",stateDelta:{visualFacingVector:qf(r??s,s,Jf,n)}}},Qf=(o,e,t)=>{const n=ic(o);if(n!==void 0){const r=n*bl,s=Bo(e)/Math.max(t,Oe);s>r&&xl(e,r/s)}};function*em(o,e,t,n){if(Ut(o)&&(yield Hf(o,e,t,n),yield Zf(o,e)),be(o)){if(yield lc(o,e,t,n),yield Kf(o,e,t,n),yield cc(o,e,t),o.id===t.currentCharacterName){const r=wl(o);r&&Ku(o,e,t,n),yield uc(o,e,t),r&&Qu(o,e,t),Sl(o)&&$f(o,e,t)}}else Ao(o)?yield Yf(o,e,t,n):Cl(o)?(yield Lf(o,e),yield dc(o,e,t,n)):Tl(o)?Gf(o,e):kl(o)&&(yield Df(o,e))}const tm=(o,e,t,n)=>{if(Ps(o)){if(be(o)){const r=Wt(o.state.standingOnItemId,e);(eo(r)||r.type==="spikes")&&hr({room:e,movingItem:o})}else if(eo(o)){const r=Wt(o.state.standingOnItemId,e);be(r)&&hr({room:e,movingItem:r})}}},nm=(o,e,t,n)=>{if(!Ps(o))return;const r=Wt(o.state.standingOnItemId,e);be(o)?ir(r)&&pr({gameState:t,movingItem:o,touchedItem:r,room:e}):be(r)&&ir(o)&&pr({gameState:t,movingItem:r,touchedItem:o,room:e});const{state:{disappearing:s}}=r;s!==null&&(s.byType===void 0||s.byType.includes(o.type))&&fr({touchedItem:r,gameState:t,room:e});const{state:{disappearing:i}}=o;i!==null&&i.on==="touch"&&(i.byType===void 0||i.byType.includes(r.type))&&fr({touchedItem:o,gameState:t,room:e})},cn={x:0,y:0,z:0},om={x:0,y:0,z:0},rm=(o,e,t,n)=>{tm(o,e);const r=em(o,e,t,n).toArray();if(nm(o,e,t),ac(cn,o,r),Ut(o)||Ao(o)||yl(o))for(const a of xt(o.state.vels))Is(cn,_s(om,{...fe,...a},n));if(vl(o)&&Tf(e,o,n),r.find(a=>a.movementType==="position")!==void 0||Qf(o,cn,n),oo({subjectItem:o,posDelta:cn,gameState:t,room:e,deltaMS:n,onTouch:ro}),Ut(o))for(const{movedBy:a,posDelta:l}of Nf(o,e,t,n))Us(a,o,e,l.x!==0||l.y!==0,l.z!==0),oo({subjectItem:o,posDelta:l,gameState:t,room:e,deltaMS:n,onTouch:ro})},sm=(o,e)=>{const t=new Set;for(const n of le(o)){const r=e[n.id];(r===void 0||!ks(r,n.state.position))&&t.add(n)}return t},im=(o,e)=>{const t=Ct(o);if(t===void 0)return wt;kf(o,t,e);const n=Object.fromEntries(Il(t.items).map(([i,a])=>[i,a.state.position]));for(const i of le(t.items))_f(i,t)&&(ys({room:t,item:i}),be(i)&&hc(o,i));const r=_l(t.items).sort(Mf);for(const i of r){const a=Zt(o);if(a===void 0||a.state.action==="death")break;if(t.items[i.id]!==void 0)try{rm(i,t,o,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${i.id}"`,{cause:l})}}Cf(t,e),gf(t),If(t);const s=sm(t.items,n);return pc(s,t,n,e),Rf(t,s),s},am=xe,lm=(o,e)=>(t,n)=>{const r=new Set;if(mc(t)){const u=Ct(t)?.items;if(u!==void 0){const d=xt(Ms(u)).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const a=ut.shared.speed===0?1:Math.max(1,Math.ceil(n/e)),l=n/a;for(let u=0;u<a;u++){const d=o(t,l);for(const h of d)r.add(h)}const c=Ct(t)?.items??am;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},cm=o=>{Pu(o),Ou(o),zu(o),Gu(o)},cs=o=>{Oo(o),Oi(),Ri(o)},us=(o,e)=>{Oo(o),Pi(),cm(e)},um=(o,e,t,n)=>{const{name:r}=n;if(n.uncolourised){if(!ar(r))return lr(r).then(()=>{cs(o)});cs(o);return}const s={pixiRenderer:o,roomScenery:e,roomColor:t,spriteOption:r,spritesheetMetaData:Ft(r)};if(!ar(r))return lr(r).then(()=>{us(o,s)});us(o,s)},De=`
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
`,dm=`#version 300 es
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
}`,hm={radius:1.2,cutoff:.88,intensity:.14,edgeBlur:.5};class pm extends te{uniforms;constructor(e={}){const t={...hm,...e},n=ne.from({vertex:De,fragment:dm,name:"bloom-filter"});super({glProgram:n,resources:{bloomUniforms:{uRadius:{value:t.radius,type:"f32"},uCutoff:{value:t.cutoff,type:"f32"},uIntensity:{value:t.intensity,type:"f32"},uEdgeBlur:{value:t.edgeBlur,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.bloomUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const fm=`#version 300 es
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
}`,mm={gamma:1,saturation:1,brightness:1,brightnessBottom:0};class ds extends te{uniforms;constructor(e={}){const t={...mm,...e},n=ne.from({vertex:De,fragment:fm,name:"color-adjustment-filter"});super({glProgram:n,resources:{colorAdjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uBrightnessBottom:{value:t.brightnessBottom,type:"f32"}}}}),this.uniforms=this.resources.colorAdjustmentUniforms.uniforms}}const ra=(o,e)=>o.replace(/\{\{(\w+)\}\}/g,(t,n)=>{if(n in e){const r=e[n];return typeof r=="boolean"?r?"1":"0":String(r)}return console.warn(`Shader placeholder {{${n}}} not found in values map`),t}),gm=`#version 300 es
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
}`,xm={curvatureX:.15,curvatureY:.15,multisampling:!0};class bm extends te{uniforms;constructor(e={}){const t={...xm,...e},n=ra(gm,{MULTISAMPLE:t.multisampling}),r=ne.from({vertex:De,fragment:n,name:"curvature-filter"});super({glProgram:r,resources:{curvatureUniforms:{uCurvatureX:{value:t.curvatureX,type:"f32"},uCurvatureY:{value:t.curvatureY,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.curvatureUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const ym=`#version 300 es
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
}`,vm={intensity:.04,scale:6,fps:30};class wm extends te{uniforms;startTime;constructor(e={}){const t={...vm,...e},n=ne.from({vertex:De,fragment:ym,name:"noise-filter"});super({glProgram:n,resources:{noiseUniforms:{uIntensity:{value:t.intensity,type:"f32"},uScale:{value:t.scale,type:"f32"},uFPS:{value:t.fps,type:"f32"},uTime:{value:0,type:"f32"}}}}),this.uniforms=this.resources.noiseUniforms.uniforms,this.startTime=performance.now()}apply(e,t,n,r){this.uniforms.uTime=performance.now()-this.startTime,super.apply(e,t,n,r)}}const Sm=`#version 300 es
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
}`,Cm={pixelWidth:4,maskBrightness:.7,numSamples:4,transitionWidth:.3};class Tm extends te{uniforms;constructor(e={}){const t={...Cm,...e},n=ra(Sm,{NUM_SAMPLES:t.numSamples}),r=ne.from({vertex:De,fragment:n,name:"phosphor-mask-filter"});super({glProgram:r,resources:{phosphorMaskUniforms:{uPixelWidth:{value:t.pixelWidth,type:"f32"},uMaskBrightness:{value:t.maskBrightness,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uTransitionWidth:{value:t.transitionWidth,type:"f32"}}}}),this.uniforms=this.resources.phosphorMaskUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const km=`#version 300 es
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
}`,Im={pixelHeight:4,gapBrightness:.7};class _m extends te{uniforms;constructor(e={}){const t={...Im,...e},n=ne.from({vertex:De,fragment:km,name:"scanlines-filter"});super({glProgram:n,resources:{scanlinesUniforms:{uPixelHeight:{value:t.pixelHeight,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uGapBrightness:{value:t.gapBrightness,type:"f32"}}}}),this.uniforms=this.resources.scanlinesUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Mm=`#version 300 es
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
}`,Pm={intensity:.4,radius:.8};class Rm extends te{uniforms;constructor(e={}){const t={...Pm,...e},n=ne.from({vertex:De,fragment:Mm,name:"vignette-filter"});super({glProgram:n,resources:{vignetteUniforms:{uIntensity:{value:t.intensity,type:"f32"},uRadius:{value:t.radius,type:"f32"}}}}),this.uniforms=this.resources.vignetteUniforms.uniforms}}const Bm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float uBlackPoint;
uniform sampler2D uTexture;

out vec4 finalColor;

void main() {
    vec4 colour = texture(uTexture, vTextureCoord);
    
    finalColor = (colour * (1.0-uBlackPoint)) + uBlackPoint;
}
`,Am={blackPoint:.04};class Om extends te{uniforms;constructor(e={}){const t={...Am,...e},n=ne.from({vertex:De,fragment:Bm,name:"raise-black-point-filter"});super({glProgram:n,resources:{raiseBlackPointUniforms:{uBlackPoint:{value:t.blackPoint,type:"f32"}}}}),this.uniforms=this.resources.raiseBlackPointUniforms.uniforms}}const Fm=Nt,hs=.8,Lm=1.2,zm=({crtFilter:o},e)=>o??St.displaySettings.crtFilter?[new ds({brightness:hs}),new wm({intensity:.03,fps:29.97,scale:5}),new _m({pixelHeight:e.gameEngineUpscale,gapBrightness:.5}),new Tm({pixelWidth:e.gameEngineUpscale*1.1,maskBrightness:.6,numSamples:2,transitionWidth:.2}),new pm({radius:e.gameEngineUpscale/6,intensity:.1,cutoff:.8,edgeBlur:1}),new Rm({intensity:.4,radius:.7}),new bm({curvatureX:.13,curvatureY:.12,multisampling:!0}),new Om({blackPoint:.03}),new ds({gamma:1.1,saturation:1.35,brightness:1/hs*Lm,brightnessBottom:-.15})]:Fm;mf();const Em=Math.PI/2,Dm=10066329,Um=16777215;class Gm{#e;#t;#o=new C({label:"MainLoop/worldContainer"});#n=I.createGain();#r=lm(im,El);#i;#s=new C({label:"MainLoop/mainContainer",children:[this.#o]});#a;#c;constructor(e,t){this.#a=e,this.#c=t;try{const n=U.getState(),r=Co(n);if(this.#n.connect(I.destination),e.stage.addChild(this.#s),e.stage.scale=r,Ct(t)===void 0)throw new Error("main loop with no starting room");this.#u()}catch(n){this.#l(n);return}}#l(e){console.error(e),U.dispatch(Ml(Pl(e)))}#u(){const{gameMenus:{userSettings:{displaySettings:e}},upscale:{upscale:t}}=U.getState();this.#a.stage.filters=zm(e,t)}#d=e=>{try{this.#p(e)}catch(t){const n=new Error("Error caught in main loop tick",{cause:t});this.#l(n)}};#h({gameEngineUpscale:e,rotate90:t,gameEngineScreenSize:n}){const{stage:r}=this.#a;r.scale=e,this.#s.rotation=t?Em:0,this.#s.position.x=t?n.y:0}#p=({deltaMS:e})=>{const t=U.getState(),n=Xe(t)?Ht:void 0;if(Rl(t))return;const r=Bl(t),{gameMenus:{userSettings:{displaySettings:s,soundSettings:i},gameInPlay:{freeCharacters:a}},upscale:{upscale:l}}=U.getState(),c=Al(t),u=r&&Ft(c.name).supportsUncolourised?{...c,uncolourised:!0}:c;this.#s.tint=r&&!u.uncolourised?Dm:Um,n?.startPhysics();const d=r?wt:this.#r(this.#c,e);n?.endPhysics(),n?.startUpdateSceneGraph();const h=Ct(this.#c),p=this.#t?.renderContext.room!==h;if((p||this.#t!==void 0&&!Ol(u,this.#t.renderContext.general.spriteOption))&&h!==void 0&&this.#i===void 0){const b=um(this.#a.renderer,h.planet,h.color,u);b!==void 0&&(this.#i=b.then(()=>{this.#i=void 0}))}if(this.#i!==void 0)return;n?.startHudUpdate();const f=Fl(t),m=Ll(t);Uh(this.#e,u,f,m,l)&&(this.#e?.destroy(),this.#e=new Dh({general:{gameState:this.#c,paused:r,pixiRenderer:this.#a.renderer,displaySettings:s,soundSettings:i,spriteOption:u,spritesheetMeta:Ft(u.name),upscale:l,onScreenControls:f},inputDirectionMode:m}),this.#s.addChild(this.#e.output)),this.#e.tick({screenSize:l.gameEngineScreenSize,deltaMS:e,room:h,freeCharacters:a}),n?.endHudUpdate();const x=Gh(this.#t,p,l,s,i,r);if(x){if(this.#t?.destroy(),h){const b={general:{gameState:this.#c,paused:r,pixiRenderer:this.#a.renderer,displaySettings:s,soundSettings:i,spriteOption:u,spritesheetMeta:Ft(u.name),upscale:l,onScreenControls:f},room:h};this.#t=new lf(b,new pf(b,new nf(b))),this.#o.addChild(this.#t.output.graphics),this.#t.output.sound?.connect(this.#n)}else this.#t=void 0;this.#h(l),this.#u(),this.#s.boundsArea=new Et(0,0,l.rotate90?l.gameEngineScreenSize.y:l.gameEngineScreenSize.x,l.rotate90?l.gameEngineScreenSize.x:l.gameEngineScreenSize.y)}this.#t?.tick({movedItems:d,deltaMS:e}),n?.endUpdateSceneGraph();try{if(n?.startPixiRender(),this.#a.render(),n?.endPixiRender(),x&&h){const b=new CustomEvent("firstRenderOfRoom",{detail:{roomId:h.id}});window.dispatchEvent(b)}}catch(b){throw new Error("Error in Pixi.js app.render()",{cause:b})}n?.tickDone(),this.#a.ticker.maxFPS=r?10:zl};start(){return this.#a.ticker.add(this.#d),this}stop(){this.#a.stage.removeChild(this.#s),this.#n.disconnect(),this.#t?.destroy(),this.#e?.destroy(),this.#a.ticker.remove(this.#d)}}Dt.defaultOptions.scaleMode="nearest";const Qm=async(o,e)=>{const t=new $l,[n]=await Promise.all([yu(o),t.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0})]);if(t.renderer.gl.drawingBufferColorSpace="display-p3",n.error)throw new Error(`could not load campaign ${JSON.stringify(o)}`,{cause:n.error});const r=n.data;Oo(t.renderer),Ri(t.renderer),vu(t),window._e2e_pixiApplication=t,globalThis.__PIXI_APP__=t;const s=Dl(U.getState(),o),i=mr({campaign:r,inputStateTracker:e,savedGame:s});if(s!==void 0){const l=s.store.gameMenus.gameInPlay;U.dispatch(Ul(l))}else i.characterRooms.head&&U.dispatch(cr(i.characterRooms.head.id)),i.characterRooms.heels&&U.dispatch(cr(i.characterRooms.heels.id));const a=new Gm(t,i).start();return{campaign:r,renderIn(l){l.appendChild(t.canvas)},resizeTo(l,c){c?t.renderer.resize(l.y,l.x):t.renderer.resize(l.x,l.y)},changeRoom(l){const c=Zt(i);c!==void 0&&fc({playableItem:c,gameState:i,toRoomId:l,changeType:"level-select"})},get currentRoom(){return Ct(i)},get gameState(){return i},reincarnateFrom(l){mr({campaign:r,inputStateTracker:e,savedGame:l,writeInto:i})},stop(){console.warn("tearing down game"),t.canvas.parentNode?.removeChild(t.canvas),a.stop(),t.destroy()}}};export{Qm as default,Qm as gameMain};
