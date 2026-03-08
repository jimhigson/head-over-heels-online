import{ag as va,bW as wa,X as q,Z as _o,_ as Z,L as Vt,T as j,d as E,bX as Le,C as re,b5 as Sa,q as Se,v as Ze,B as En,b as st,a5 as te,o as ht,U as Ca,M as Ce,bY as pt,c as Ta,P as tn,m as ka,W as Ia,N as _a,V as Ra,b7 as Pa,ba as Ma,y as Ba,A as Ts,af as Aa,bZ as Oa,R as Fa,l as Pt,b_ as ks,b$ as La,D as pn,n as rr,ac as $t,j as Ro,F as yn,w as Po,E as Ea,u as za,c0 as it,c1 as sr,c2 as ir,c3 as Ua,a2 as Da,a3 as Is,ab as Ht,p as C,c4 as Wa,c5 as Ga,c6 as Qe,c7 as wt,c8 as ar,c9 as zn,ca as Un,cb as Va,cc as Be,aF as ot,ae as et,t as _s,cd as Nt,ao as ie,ce as M,cf as $a,K as Ha,by as se,aC as Rs,cg as Mo,ch as Na,ay as Sn,ci as tt,cj as Ps,ck as Ms,aG as ja,cl as Ne,cm as Bs,cn as As,co as Xa,bB as Os,cp as je,cq as Cn,bN as qt,cr as Ee,cs as so,ct as io,cu as ao,cv as Fs,aS as ue,aA as z,cw as Bo,cx as Ao,bF as St,cy as Ls,cz as de,cA as Oo,cB as Es,cC as Ya,cD as zs,cE as Us,cF as Tn,b0 as Fo,cG as Ds,cH as Ct,aQ as Tt,cI as jt,cJ as Lo,cK as kn,cL as qa,cM as In,cN as Zt,cO as O,cP as Eo,aP as _n,cQ as zo,aO as Za,aR as Uo,ai as Ja,cR as Ae,f as he,cS as fn,ar as pe,cT as Ka,cU as Qa,cV as el,cW as Rn,cX as tl,cY as nl,cZ as ol,c_ as rl,c$ as lr,d0 as sl,d1 as Do,d2 as Wo,d3 as mn,d4 as Ws,d5 as Pn,d6 as rt,d7 as ke,d8 as Gs,d9 as il,da as Vs,db as ft,dc as kt,dd as al,de as ll,df as It,dg as $s,dh as cl,di as ul,b1 as Oe,dj as dl,dk as hl,x as pl,aZ as Je,bK as Mt,dl as nn,dm as on,dn as fl,dp as Hs,dq as P,dr as lo,aW as Ns,ds as nt,dt as Me,aq as Go,du as js,dv as Xs,dw as ml,aM as gl,bE as xl,dx as bl,dy as yl,dz as vl,bD as wl,dA as ye,dB as Sl,dC as Dn,dD as Cl,dE as Tl,dF as kl,dG as Il,dH as _l,bL as Wt,dI as cr,dJ as ur,dK as Rl,dL as Ys,bS as qs,bO as Zs,dM as Pl,an as Ml,dN as Bl,dO as Al,dP as Vo,dQ as Js,aH as Ol,dR as Fl,dS as Ks,dT as Qs,dU as Ll,dV as El,dW as ei,dX as zl,dY as _t,dZ as Ul,aL as Dl,d_ as dr,d$ as Wl,aJ as Gl,e0 as Vl,e1 as $l,e2 as Mn,e3 as $o,e4 as hr,e5 as Hl,e6 as Ot,e7 as De,e8 as Nl,e9 as jl,aU as Xl,ea as Yl,aX as ql,eb as ti,ec as Zl,ed as Jl,ee as Kl,ef as Ql,eg as ec,eh as tc,ei as nc,ej as oc,ek as rc,el as sc,em as ic,en as ac,eo as lc,ep as cc,eq as uc,er as dc,es as hc,et as pc,bM as Rt,eu as fc,ev as mc,ew as gc,ex as xc,ey as bc,ez as yc,eA as vc,eB as wc,eC as Sc,eD as Cc,eE as Tc,eF as kc,eG as Ic,eH as _c,eI as pr,eJ as Rc,eK as fr,bQ as Pc}from"./App-c6nQxUhn.js";import{s as S,a as Bn,g as ni}from"./spritesheetPalette-CqXYVs2M.js";import{v as Mc,b as Bc,h as Re,s as Ac,A as Oc}from"./spectrumLut-DHDWsuBz.js";import{r as K,g as co,p as uo,a as Ho,b as oi,c as mr,s as gr,d as Fc,e as Lc,f as Ec}from"./pixiContainerToString-DwXxO8St.js";import{c as zc}from"./canvasUtils-dxfvkOaS.js";import{a as Uc,b as Dc}from"./localUniformBit-BOGrcT1E.js";import{g as Wc}from"./index-HZt23wAx.js";import{C as xr}from"./CanvasPool-CNmoDEmA.js";import{B as Gc}from"./BatchableSprite-qOYjpB38.js";var rn={},br;function Vc(){if(br)return rn;br=1;const{iterableCurry:n}=va(),{__firstOr:e}=wa(),t=Symbol("none");function o(s){return e(s,t)===t}rn.__isEmpty=o;const r=n(o,{reduces:!0});return rn.isEmpty=r,rn}var Wn,yr;function $c(){return yr||(yr=1,Wn=Vc().isEmpty),Wn}var Hc=$c();const No=Wc(Hc);var Nc=`
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
`,jc=`in vec2 aPosition;
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
`,Xc=`
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
}`;class H extends q{constructor(e){const t=e.gpu,o=vr({source:Xc,...t}),r=_o.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),s=e.gl,i=vr({source:Nc,...s}),a=Z.from({vertex:jc,fragment:i}),l=new Vt({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:j.EMPTY}})}}function vr(n){const{source:e,functions:t,main:o}=n;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",o)}const jo=`
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
    `,Xo=`
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
	`;class ri extends H{constructor(){super({gl:{functions:`
                ${jo}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Xo}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ri.extension={name:"color",type:E.BlendMode};class si extends H{constructor(){super({gl:{functions:`
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
            `}})}}si.extension={name:"color-burn",type:E.BlendMode};class ii extends H{constructor(){super({gl:{functions:`
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
                `}})}}ii.extension={name:"color-dodge",type:E.BlendMode};class ai extends H{constructor(){super({gl:{functions:`
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
                `}})}}ai.extension={name:"darken",type:E.BlendMode};class li extends H{constructor(){super({gl:{functions:`
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
            `}})}}li.extension={name:"difference",type:E.BlendMode};class ci extends H{constructor(){super({gl:{functions:`
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
            `}})}}ci.extension={name:"divide",type:E.BlendMode};class ui extends H{constructor(){super({gl:{functions:`
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
            `}})}}ui.extension={name:"exclusion",type:E.BlendMode};class di extends H{constructor(){super({gl:{functions:`
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
                `}})}}di.extension={name:"hard-light",type:E.BlendMode};class hi extends H{constructor(){super({gl:{functions:`
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
            `}})}}hi.extension={name:"hard-mix",type:E.BlendMode};class pi extends H{constructor(){super({gl:{functions:`
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
            `}})}}pi.extension={name:"lighten",type:E.BlendMode};class fi extends H{constructor(){super({gl:{functions:`
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
                `}})}}fi.extension={name:"linear-burn",type:E.BlendMode};class mi extends H{constructor(){super({gl:{functions:`
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
            `}})}}mi.extension={name:"linear-dodge",type:E.BlendMode};class gi extends H{constructor(){super({gl:{functions:`
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
            `}})}}gi.extension={name:"linear-light",type:E.BlendMode};class xi extends H{constructor(){super({gl:{functions:`
                ${jo}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Xo}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}xi.extension={name:"luminosity",type:E.BlendMode};class bi extends H{constructor(){super({gl:{functions:`
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
            `}})}}bi.extension={name:"negation",type:E.BlendMode};class yi extends H{constructor(){super({gl:{functions:`
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
                `}})}}yi.extension={name:"overlay",type:E.BlendMode};class vi extends H{constructor(){super({gl:{functions:`
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
                `}})}}vi.extension={name:"pin-light",type:E.BlendMode};class wi extends H{constructor(){super({gl:{functions:`
                ${jo}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Xo}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}wi.extension={name:"saturation",type:E.BlendMode};class Si extends H{constructor(){super({gl:{functions:`
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
                `}})}}Si.extension={name:"soft-light",type:E.BlendMode};class Ci extends H{constructor(){super({gl:{functions:`
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
                `}})}}Ci.extension={name:"subtract",type:E.BlendMode};class Ti extends H{constructor(){super({gl:{functions:`
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
                `}})}}Ti.extension={name:"vivid-light",type:E.BlendMode};var Yc=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,wr=`struct GlobalFilterUniforms {
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
}`;const ki=class Ii extends q{constructor(e){e={...Ii.defaultOptions,...e};const t=_o.from({vertex:{source:wr,entryPoint:"mainVertex"},fragment:{source:wr,entryPoint:"mainFragment"}}),o=Z.from({vertex:Le,fragment:Yc,name:"alpha-filter"}),{alpha:r,...s}=e,i=new Vt({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:t,glProgram:o,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ki.defaultOptions={alpha:1};let qc=ki;var Zc=`
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
`,Sr=`struct GlobalFilterUniforms {
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
}`;class Jc extends q{constructor(e={}){const t=new Vt({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),o=_o.from({vertex:{source:Sr,entryPoint:"mainVertex"},fragment:{source:Sr,entryPoint:"mainFragment"}}),r=Z.from({vertex:Le,fragment:Zc,name:"color-matrix-filter"});super({...e,gpuProgram:o,glProgram:r,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let o=e;t&&(this._multiply(o,this.matrix,e),o=this._colorMatrix(o)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=o,this.resources.colorMatrixUniforms.update()}_multiply(e,t,o){return e[0]=t[0]*o[0]+t[1]*o[5]+t[2]*o[10]+t[3]*o[15],e[1]=t[0]*o[1]+t[1]*o[6]+t[2]*o[11]+t[3]*o[16],e[2]=t[0]*o[2]+t[1]*o[7]+t[2]*o[12]+t[3]*o[17],e[3]=t[0]*o[3]+t[1]*o[8]+t[2]*o[13]+t[3]*o[18],e[4]=t[0]*o[4]+t[1]*o[9]+t[2]*o[14]+t[3]*o[19]+t[4],e[5]=t[5]*o[0]+t[6]*o[5]+t[7]*o[10]+t[8]*o[15],e[6]=t[5]*o[1]+t[6]*o[6]+t[7]*o[11]+t[8]*o[16],e[7]=t[5]*o[2]+t[6]*o[7]+t[7]*o[12]+t[8]*o[17],e[8]=t[5]*o[3]+t[6]*o[8]+t[7]*o[13]+t[8]*o[18],e[9]=t[5]*o[4]+t[6]*o[9]+t[7]*o[14]+t[8]*o[19]+t[9],e[10]=t[10]*o[0]+t[11]*o[5]+t[12]*o[10]+t[13]*o[15],e[11]=t[10]*o[1]+t[11]*o[6]+t[12]*o[11]+t[13]*o[16],e[12]=t[10]*o[2]+t[11]*o[7]+t[12]*o[12]+t[13]*o[17],e[13]=t[10]*o[3]+t[11]*o[8]+t[12]*o[13]+t[13]*o[18],e[14]=t[10]*o[4]+t[11]*o[9]+t[12]*o[14]+t[13]*o[19]+t[14],e[15]=t[15]*o[0]+t[16]*o[5]+t[17]*o[10]+t[18]*o[15],e[16]=t[15]*o[1]+t[16]*o[6]+t[17]*o[11]+t[18]*o[16],e[17]=t[15]*o[2]+t[16]*o[7]+t[17]*o[12]+t[18]*o[17],e[18]=t[15]*o[3]+t[16]*o[8]+t[17]*o[13]+t[18]*o[18],e[19]=t[15]*o[4]+t[16]*o[9]+t[17]*o[14]+t[18]*o[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const o=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(o,t)}tint(e,t){const[o,r,s]=re.shared.setValue(e).toArray(),i=[o,0,0,0,0,0,r,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const o=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(o,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const o=Math.cos(e),r=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=o+(1-o)*i,c=i*(1-o)-a*r,u=i*(1-o)+a*r,d=i*(1-o)+a*r,h=o+i*(1-o),p=i*(1-o)-a*r,f=i*(1-o)-a*r,m=i*(1-o)+a*r,x=o+i*(1-o),g=[l,c,u,0,0,d,h,p,0,0,f,m,x,0,0,0,0,0,1,0];this._loadMatrix(g,t)}contrast(e,t){const o=(e||0)+1,r=-.5*(o-1),s=[o,0,0,0,r,0,o,0,0,r,0,0,o,0,r,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const o=e*2/3+1,r=(o-1)*-.5,s=[o,r,r,0,0,r,o,r,0,0,r,r,o,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,o,r,s){e||(e=.2),t||(t=.15),o||(o=16770432),r||(r=3375104);const i=re.shared,[a,l,c]=i.setValue(o).toArray(),[u,d,h]=i.setValue(r).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,t,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,s)}night(e,t){e||(e=.1);const o=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(o,t)}predator(e,t){const o=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(o,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}const _i=class Ri extends Sa{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(Se(Ze,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...Ri.defaultOptions,...t};const o=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let r=t.uvs;r||(t.positions?r=new Float32Array(o.length):r=new Float32Array([0,0,1,0,1,1,0,1]));const s=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,a=new En({data:o,label:"attribute-mesh-positions",shrinkToFit:i,usage:st.VERTEX|st.COPY_DST}),l=new En({data:r,label:"attribute-mesh-uvs",shrinkToFit:i,usage:st.VERTEX|st.COPY_DST}),c=new En({data:s,label:"index-mesh-buffer",shrinkToFit:i,usage:st.INDEX|st.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:c,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};_i.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let Pi=_i;class Kc{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),o=t.data;let r=o;const s=this.texture.textureMatrix;return s.isSimple||(r=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!r||r.length<o.length)&&(r=this._transformedUvs=new Float32Array(o.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(o,r))),r}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class be extends te{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=t,[p]=u;super({...h,texture:p instanceof j?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ht.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ht.shared.add(this.update,this,Ca.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,o=this.animationSpeed*t,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=o/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const o=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(r=>{this.texture!==r&&r.destroy(o)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let o=0;o<e.length;++o)t.push(j.from(e[o]));return new be(t)}static fromImages(e){const t=[];for(let o=0;o<e.length;++o)t.push(j.from(e[o]));return new be(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof j)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ht.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ht.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Qc{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new Ce,this.observer=t,this.position=new pt(this,0,0),this.scale=new pt(this,1,1),this.pivot=new pt(this,0,0),this.skew=new pt(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const sn=new Ce,Ft=new Ce,ge=[new tn,new tn,new tn,new tn];class Mi{constructor(e){this._renderer=e}validateRenderable(e){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}updateRenderable(e){}execute(e){const t=this._renderer,o=t.canvasContext,r=o.activeContext;r.save(),o.setBlendMode(e.groupBlendMode);const s=t.globalUniforms.globalUniformData?.worldColor??4294967295,i=e.groupColorAlpha,a=(s>>>24&255)/255,l=(i>>>24&255)/255,c=t.filter?.alphaMultiplier??1,u=a*l*c;if(u<=0){r.restore();return}r.globalAlpha=u;const d=s&16777215,h=i&16777215,p=Ta(ka(h,d)),f=e.texture,m=zc.getTintedPattern(f,p),x=e.width,g=e.height,_=e.groupTransform,T=f.source._resolution??f.source.resolution??1;Ft.copyFrom(e._tileTransform.matrix),e.applyAnchorToTexture||Ft.translate(-e.anchor.x*x,-e.anchor.y*g),Ft.scale(1/T,1/T),sn.identity(),sn.prepend(Ft),sn.prepend(_);const y=t._roundPixels|e._roundPixels;o.setContextTransform(sn,y===1),r.fillStyle=m;const b=e.anchor.x*-x,w=e.anchor.y*-g;ge[0].set(b,w),ge[1].set(b+x,w),ge[2].set(b+x,w+g),ge[3].set(b,w+g);for(let k=0;k<4;k++)Ft.applyInverse(ge[k],ge[k]);r.beginPath(),r.moveTo(ge[0].x,ge[0].y);for(let k=1;k<4;k++)r.lineTo(ge[k].x,ge[k].y);r.closePath(),r.fill(),r.restore()}destroy(){this._renderer=null}}Mi.extension={type:[E.CanvasPipes],name:"tilingSprite"};const eu={name:"tiling-bit",vertex:{header:`
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
        `}},tu={name:"tiling-bit",vertex:{header:`
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

        `}};let Gn,Vn;class nu extends Ia{constructor(){Gn??(Gn=_a({name:"tiling-sprite-shader",bits:[Uc,eu,Ra]})),Vn??(Vn=Pa({name:"tiling-sprite-shader",bits:[Dc,tu,Ma]}));const e=new Vt({uMapCoord:{value:new Ce,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new Ce,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:Vn,gpuProgram:Gn,resources:{localUniforms:new Vt({uTransformMatrix:{value:new Ce,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:j.EMPTY.source,uSampler:j.EMPTY.source.style}})}updateUniforms(e,t,o,r,s,i){const a=this.resources.tilingUniforms,l=i.width,c=i.height,u=i.textureMatrix,d=a.uniforms.uTextureTransform;d.set(o.a*l/e,o.b*l/t,o.c*c/e,o.d*c/t,o.tx/e,o.ty/t),d.invert(),a.uniforms.uMapCoord=u.mapCoord,a.uniforms.uClampFrame=u.uClampFrame,a.uniforms.uClampOffset=u.uClampOffset,a.uniforms.uTextureTransform=d,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=r,a.uniforms.uSizeAnchor[3]=s,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class ou extends Pi{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function ru(n,e){const t=n.anchor.x,o=n.anchor.y;e[0]=-t*n.width,e[1]=-o*n.height,e[2]=(1-t)*n.width,e[3]=-o*n.height,e[4]=(1-t)*n.width,e[5]=(1-o)*n.height,e[6]=-t*n.width,e[7]=(1-o)*n.height}function su(n,e,t,o){let r=0;const s=n.length/e,i=o.a,a=o.b,l=o.c,c=o.d,u=o.tx,d=o.ty;for(t*=e;r<s;){const h=n[t],p=n[t+1];n[t]=i*h+l*p+u,n[t+1]=a*h+c*p+d,t+=e,r++}}function iu(n,e){const t=n.texture,o=t.frame.width,r=t.frame.height;let s=0,i=0;n.applyAnchorToTexture&&(s=n.anchor.x,i=n.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-i,e[5]=e[7]=1-i;const a=Ce.shared;a.copyFrom(n._tileTransform.matrix),a.tx/=n.width,a.ty/=n.height,a.invert(),a.scale(n.width/o,n.height/r),su(e,2,0,a)}const gn=new ou;class au{constructor(){this.canBatch=!0,this.geometry=new Pi({indices:gn.indices.slice(),positions:gn.positions.slice(),uvs:gn.uvs.slice()})}destroy(){this.geometry.destroy(),this.shader?.destroy()}}class Bi{constructor(e){this._state=Ba.default2d,this._renderer=e,this._managedTilingSprites=new Ts({renderer:e,type:"renderable",name:"tilingSprite"})}validateRenderable(e){const t=this._getTilingSpriteData(e),o=t.canBatch;this._updateCanBatch(e);const r=t.canBatch;if(r&&r===o){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return o!==r}addRenderable(e,t){const o=this._renderer.renderPipes.batch;this._updateCanBatch(e);const r=this._getTilingSpriteData(e),{geometry:s,canBatch:i}=r;if(i){r.batchableMesh||(r.batchableMesh=new Kc);const a=r.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=s,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,o.addToBatch(a,t)}else o.break(t),r.shader||(r.shader=new nu),this.updateRenderable(e),t.add(e)}execute(e){const t=this._renderer,{shader:o}=this._getTilingSpriteData(e);o.groups[0]=t.globalUniforms.bindGroup;const r=o.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=t._roundPixels|e._roundPixels,Aa(e.groupColorAlpha,r.uColor,0),this._state.blendMode=Oa(e.groupBlendMode,e.texture._source),t.encoder.draw({geometry:gn,shader:o,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:o}=t;if(o){const{batchableMesh:r}=t;e.didViewUpdate&&this._updateBatchableMesh(e),r._batcher.updateElement(r)}else if(e.didViewUpdate){const{shader:r}=t;r.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new au;return t.renderable=e,e._gpuData[this._renderer.uid]=t,this._managedTilingSprites.add(e),t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:o}=t,r=e.texture.source.style;r.addressMode!=="repeat"&&(r.addressMode="repeat",r.update()),iu(e,o.uvs),ru(e,o.positions)}destroy(){this._managedTilingSprites.destroy(),this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),o=e.texture;let r=!0;return this._renderer.type===Fa.WEBGL&&(r=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=o.textureMatrix.isSimple&&(r||o.source.isPowerOfTwo),t.canBatch}}Bi.extension={type:[E.WebGLPipes,E.WebGPUPipes],name:"tilingSprite"};Pt.add(Mi);Pt.add(Bi);const Ai=class xn extends ks{constructor(...e){let t=e[0]||{};t instanceof j&&(t={texture:t}),e.length>1&&(Se(Ze,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...xn.defaultOptions,...t};const{texture:o,anchor:r,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=t??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new pt({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=o,this._width=l??o.width,this._height=c??o.height,this._tileTransform=new Qc({observer:{_onUpdate:()=>this.onViewUpdate()}}),r&&(this.anchor=r),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=d??!1}static from(e,t={}){return typeof e=="string"?new xn({texture:La.get(e),...t}):new xn({texture:e,...t})}get uvRespectAnchor(){return Se(Ze,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){Se(Ze,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=j.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,o=this._width,r=this._height;e.minX=-t._x*o,e.maxX=e.minX+o,e.minY=-t._y*r,e.maxY=e.minY+r}containsPoint(e){const t=this._width,o=this._height,r=-t*this._anchor._x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-o*this._anchor._y,e.y>=s&&e.y<=s+o)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const o=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(o)}this._texture=null}};Ai.defaultOptions={texture:j.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let lu=Ai;class cu extends ks{constructor(e,t){const{text:o,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=o??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new pt({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,o=this.bounds.height,r=-t*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-o*this.anchor.y,e.y>=s&&e.y<=s+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function uu(n,e){let t=n[0]??{};return(typeof t=="string"||n[1])&&(Se(Ze,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:n[1]}),t}let We=null,we=null;function du(n,e){We||(We=pn.get().createCanvas(256,128),we=We.getContext("2d",{willReadFrequently:!0}),we.globalCompositeOperation="copy",we.globalAlpha=1),(We.width<n||We.height<e)&&(We.width=rr(n),We.height=rr(e))}function Cr(n,e,t){for(let o=0,r=4*t*e;o<e;++o,r+=4)if(n[r+3]!==0)return!1;return!0}function Tr(n,e,t,o,r){const s=4*e;for(let i=o,a=o*s+4*t;i<=r;++i,a+=s)if(n[a+3]!==0)return!1;return!0}function hu(...n){let e=n[0];e.canvas||(e={canvas:n[0],resolution:n[1]});const{canvas:t}=e,o=Math.min(e.resolution??1,1),r=e.width??t.width,s=e.height??t.height;let i=e.output;if(du(r,s),!we)throw new TypeError("Failed to get canvas 2D context");we.drawImage(t,0,0,r,s,0,0,r*o,s*o);const l=we.getImageData(0,0,r,s).data;let c=0,u=0,d=r-1,h=s-1;for(;u<s&&Cr(l,r,u);)++u;if(u===s)return $t.EMPTY;for(;Cr(l,r,h);)--h;for(;Tr(l,r,c,u,h);)++c;for(;Tr(l,r,d,u,h);)--d;return++d,++h,we.globalCompositeOperation="source-over",we.strokeRect(c,u,d-c,h-u),we.globalCompositeOperation="copy",i??(i=new $t),i.set(c/o,u/o,(d-c)/o,(h-u)/o),i}class pu{constructor(e=0,t=0,o=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=o,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){const t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){const t=new Array(e.length);for(let o=0;o<e.length;o++){const r=e[o];t[o]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){const t=this.first;delete this.items[t.key],--this.size===0?(this.first=null,this.last=null):(this.first=t.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){const t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){const e=new Array(this.size);let t=this.first,o=0;for(;t!==null;)e[o++]=t.key,t=t.next;return e}setWithEvicted(e,t,o=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,o);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=s:this.last.next=s,this.last=s}return r}set(e,t,o=!1,r=this.resetTtl){let s=this.items[e];return o||s!==void 0?(s.value=t,o===!1&&r&&(s.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(s)):(this.max>0&&this.size===this.max&&this.evict(!0),s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=s:this.last.next=s,this.last=s),this}values(e=this.keys()){const t=new Array(e.length);for(let o=0;o<e.length;o++)t[o]=this.get(e[o]);return t}}function fu(n=1e3,e=0,t=!1){if(isNaN(n)||n<0)throw new TypeError("Invalid max value");if(isNaN(e)||e<0)throw new TypeError("Invalid ttl value");if(typeof t!="boolean")throw new TypeError("Invalid resetTtl value");return new pu(n,e,t)}function Oi(n){return!!n.tagStyles&&Object.keys(n.tagStyles).length>0}function Fi(n){return n.includes("<")}function mu(n,e){return n.clone().assign(e)}function gu(n,e){const t=[],o=e.tagStyles;if(!Oi(e)||!Fi(n))return t.push({text:n,style:e}),t;const r=[e],s=[];let i="",a=0;for(;a<n.length;){const l=n[a];if(l==="<"){const c=n.indexOf(">",a);if(c===-1){i+=l,a++;continue}const u=n.slice(a+1,c);if(u.startsWith("/")){const d=u.slice(1).trim();if(s.length>0&&s[s.length-1]===d){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i=""),r.pop(),s.pop(),a=c+1;continue}else{i+=n.slice(a,c+1),a=c+1;continue}}else{const d=u.trim();if(o[d]){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i="");const h=r[r.length-1],p=mu(h,o[d]);r.push(p),s.push(d),a=c+1;continue}else{i+=n.slice(a,c+1),a=c+1;continue}}}else i+=l,a++}return i.length>0&&t.push({text:i,style:r[r.length-1]}),t}const xu=[10,13],bu=new Set(xu),yu=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],vu=new Set(yu),wu=/(\r\n|\r|\n)/,Su=/(?:\r\n|\r|\n)/;function Yo(n){return typeof n!="string"?!1:bu.has(n.charCodeAt(0))}function fe(n,e){return typeof n!="string"?!1:vu.has(n.charCodeAt(0))}function Li(n){return n==="normal"||n==="pre-line"}function Ei(n){return n==="normal"}function ve(n){if(typeof n!="string")return"";let e=n.length-1;for(;e>=0&&fe(n[e]);)e--;return e<n.length-1?n.slice(0,e+1):n}function zi(n){const e=[],t=[];if(typeof n!="string")return e;for(let o=0;o<n.length;o++){const r=n[o],s=n[o+1];if(fe(r)||Yo(r)){t.length>0&&(e.push(t.join("")),t.length=0),r==="\r"&&s===`
`?(e.push(`\r
`),o++):e.push(r);continue}t.push(r)}return t.length>0&&e.push(t.join("")),e}function Ui(n,e,t,o){const r=t(n),s=[];for(let i=0;i<r.length;i++){let a=r[i],l=a,c=1;for(;r[i+c];){const u=r[i+c];if(!o(l,u,n,i,e))a+=u,l=u,c++;else break}i+=c-1,s.push(a)}return s}const Cu=/\r\n|\r|\n/g;function Tu(n,e,t,o,r,s,i,a){const l=gu(n,e);if(Ei(e.whiteSpace))for(let U=0;U<l.length;U++){const $=l[U];l[U]={text:$.text.replace(Cu," "),style:$.style}}const u=[];let d=[];for(const U of l){const $=U.text.split(wu);for(let J=0;J<$.length;J++){const G=$[J];G===`\r
`||G==="\r"||G===`
`?(u.push(d),d=[]):G.length>0&&d.push({text:G,style:U.style})}}(d.length>0||u.length===0)&&u.push(d);const h=t?ku(u,e,o,r,i,a):u,p=[],f=[],m=[],x=[],g=[];let _=0;const T=e._fontString,y=s(T);y.fontSize===0&&(y.fontSize=e.fontSize,y.ascent=e.fontSize);let b="",w=!!e.dropShadow;for(const U of h){let $=0,J=y.ascent,G=y.descent,V="";for(const X of U){const ne=X.style._fontString,ae=s(ne);ne!==b&&(o.font=ne,b=ne);const me=r(X.text,X.style.letterSpacing,o);$+=me,J=Math.max(J,ae.ascent),G=Math.max(G,ae.descent),V+=X.text,!w&&X.style.dropShadow&&(w=!0)}U.length===0&&(J=y.ascent,G=y.descent),p.push($),f.push(J),m.push(G),g.push(V);const A=e.lineHeight||J+G;x.push(A+e.leading),_=Math.max(_,$)}const k=e._stroke?.width||0,L=(t&&e.align!=="left"&&e.align!=="justify"?Math.max(_,e.wordWrapWidth):_)+k+(e.dropShadow?e.dropShadow.distance:0);let B=0;for(let U=0;U<x.length;U++)B+=x[U];B=Math.max(B,x[0]+k);const D=B+(e.dropShadow?e.dropShadow.distance:0),W=e.lineHeight||y.fontSize;return{width:L,height:D,lines:g,lineWidths:p,lineHeight:W+e.leading,maxLineWidth:_,fontProperties:y,runsByLine:h,lineAscents:f,lineDescents:m,lineHeights:x,hasDropShadow:w}}function ku(n,e,t,o,r,s){const{letterSpacing:i,whiteSpace:a,wordWrapWidth:l,breakWords:c}=e,u=Li(a),d=l+i,h={};let p="";const f=(x,g)=>{const _=`${x}|${g.styleKey}`;let T=h[_];if(T===void 0){const y=g._fontString;y!==p&&(t.font=y,p=y),T=o(x,g.letterSpacing,t)+g.letterSpacing,h[_]=T}return T},m=[];for(const x of n){const g=Iu(x),_=m.length,T=B=>{let D=0,W=B;do{const{token:U,style:$}=g[W];D+=f(U,$),W++}while(W<g.length&&g[W].continuesFromPrevious);return D},y=B=>{const D=[];let W=B;do D.push({token:g[W].token,style:g[W].style}),W++;while(W<g.length&&g[W].continuesFromPrevious);return D};let b=[],w=0,k=!u,I=null;const F=()=>{I&&I.text.length>0&&b.push(I),I=null},L=()=>{if(F(),b.length>0){const B=b[b.length-1];B.text=ve(B.text),B.text.length===0&&b.pop()}m.push(b),b=[],w=0,k=!1};for(let B=0;B<g.length;B++){const{token:D,style:W,continuesFromPrevious:U}=g[B],$=f(D,W);if(u){const V=fe(D),A=I?.text[I.text.length-1]??b[b.length-1]?.text.slice(-1)??"",X=A?fe(A):!1;if(V&&X)continue}const J=!U,G=J?T(B):$;if(G>d&&J)if(w>0&&L(),c){const V=y(B);for(let A=0;A<V.length;A++){const X=V[A].token,ne=V[A].style,ae=Ui(X,c,s,r);for(const me of ae){const Ue=f(me,ne);Ue+w>d&&L(),!I||I.style!==ne?(F(),I={text:me,style:ne}):I.text+=me,w+=Ue}}B+=V.length-1}else{const V=y(B);F(),m.push(V.map(A=>({text:A.token,style:A.style}))),k=!1,B+=V.length-1}else if(G+w>d&&J){if(fe(D)){k=!1;continue}L(),I={text:D,style:W},w=$}else if(U&&!c)!I||I.style!==W?(F(),I={text:D,style:W}):I.text+=D,w+=$;else{const V=fe(D);if(w===0&&V&&!k)continue;!I||I.style!==W?(F(),I={text:D,style:W}):I.text+=D,w+=$}}if(F(),b.length>0){const B=b[b.length-1];B.text=ve(B.text),B.text.length===0&&b.pop()}(b.length>0||m.length===_)&&m.push(b)}return m}function Iu(n){const e=[];let t=!1;for(const o of n){const r=zi(o.text);let s=!0;for(const i of r){const a=fe(i)||Yo(i),l=s&&t&&!a;e.push({token:i,style:o.style,continuesFromPrevious:l}),t=!a,s=!1}}return e}const _u={willReadFrequently:!0};function kr(n,e,t,o,r){let s=t[n];return typeof s!="number"&&(s=r(n,e,o)+e,t[n]=s),s}function Ru(n,e,t,o,r,s,i){const a=t.getContext("2d",_u);a.font=e._fontString;let l=0,c="";const u=[],d=Object.create(null),{letterSpacing:h,whiteSpace:p}=e,f=Li(p),m=Ei(p);let x=!f;const g=e.wordWrapWidth+h,_=zi(n);for(let y=0;y<_.length;y++){let b=_[y];if(Yo(b)){if(!m){u.push(ve(c)),x=!f,c="",l=0;continue}b=" "}if(f){const k=fe(b),I=fe(c[c.length-1]);if(k&&I)continue}const w=kr(b,h,d,a,o);if(w>g)if(c!==""&&(u.push(ve(c)),c="",l=0),r(b,e.breakWords)){const k=Ui(b,e.breakWords,i,s);for(const I of k){const F=kr(I,h,d,a,o);F+l>g&&(u.push(ve(c)),x=!1,c="",l=0),c+=I,l+=F}}else c.length>0&&(u.push(ve(c)),c="",l=0),u.push(ve(b)),x=!1,c="",l=0;else w+l>g&&(x=!1,u.push(ve(c)),c="",l=0),(c.length>0||!fe(b)||x)&&(c+=b,l+=w)}const T=ve(c);return T.length>0&&u.push(T),u.join(`
`)}const Ir={willReadFrequently:!0},Ie=class R{static get experimentalLetterSpacingSupported(){let e=R._experimentalLetterSpacingSupported;if(e===void 0){const t=pn.get().getCanvasRenderingContext2D().prototype;e=R._experimentalLetterSpacingSupported="letterSpacing"in t||"textLetterSpacing"in t}return e}constructor(e,t,o,r,s,i,a,l,c,u){this.text=e,this.style=t,this.width=o,this.height=r,this.lines=s,this.lineWidths=i,this.lineHeight=a,this.maxLineWidth=l,this.fontProperties=c,u&&(this.runsByLine=u.runsByLine,this.lineAscents=u.lineAscents,this.lineDescents=u.lineDescents,this.lineHeights=u.lineHeights,this.hasDropShadow=u.hasDropShadow)}static measureText(e=" ",t,o=R._canvas,r=t.wordWrap){const s=`${e}-${t.styleKey}-wordWrap-${r}`;if(R._measurementCache.has(s))return R._measurementCache.get(s);if(Oi(t)&&Fi(e)){const b=Tu(e,t,r,R._context,R._measureText,R.measureFont,R.canBreakChars,R.wordWrapSplit),w=new R(e,t,b.width,b.height,b.lines,b.lineWidths,b.lineHeight,b.maxLineWidth,b.fontProperties,{runsByLine:b.runsByLine,lineAscents:b.lineAscents,lineDescents:b.lineDescents,lineHeights:b.lineHeights,hasDropShadow:b.hasDropShadow});return R._measurementCache.set(s,w),w}const a=t._fontString,l=R.measureFont(a);l.fontSize===0&&(l.fontSize=t.fontSize,l.ascent=t.fontSize,l.descent=0);const c=R._context;c.font=a;const d=(r?R._wordWrap(e,t,o):e).split(Su),h=new Array(d.length);let p=0;for(let b=0;b<d.length;b++){const w=R._measureText(d[b],t.letterSpacing,c);h[b]=w,p=Math.max(p,w)}const f=t._stroke?.width??0,m=t.lineHeight||l.fontSize,x=R._getAlignWidth(p,t,r),g=R._adjustWidthForStyle(x,t),_=Math.max(m,l.fontSize+f)+(d.length-1)*(m+t.leading),T=R._adjustHeightForStyle(_,t),y=new R(e,t,g,T,d,h,m+t.leading,p,l);return R._measurementCache.set(s,y),y}static _adjustWidthForStyle(e,t){const o=t._stroke?.width||0;let r=e+o;return t.dropShadow&&(r+=t.dropShadow.distance),r}static _adjustHeightForStyle(e,t){let o=e;return t.dropShadow&&(o+=t.dropShadow.distance),o}static _getAlignWidth(e,t,o){return o&&t.align!=="left"&&t.align!=="justify"?Math.max(e,t.wordWrapWidth):e}static _measureText(e,t,o){let r=!1;R.experimentalLetterSpacingSupported&&(R.experimentalLetterSpacing?(o.letterSpacing=`${t}px`,o.textLetterSpacing=`${t}px`,r=!0):(o.letterSpacing="0px",o.textLetterSpacing="0px"));const s=o.measureText(e);let i=s.width;const a=-(s.actualBoundingBoxLeft??0);let c=(s.actualBoundingBoxRight??0)-a;if(i>0)if(r)i-=t,c-=t;else{const u=(R.graphemeSegmenter(e).length-1)*t;i+=u,c+=u}return Math.max(i,c)}static _wordWrap(e,t,o=R._canvas){return Ru(e,t,o,R._measureText,R.canBreakWords,R.canBreakChars,R.wordWrapSplit)}static isBreakingSpace(e,t){return fe(e)}static canBreakWords(e,t){return t}static canBreakChars(e,t,o,r,s){return!0}static wordWrapSplit(e){return R.graphemeSegmenter(e)}static measureFont(e){if(R._fonts[e])return R._fonts[e];const t=R._context;t.font=e;const o=t.measureText(R.METRICS_STRING+R.BASELINE_SYMBOL),r=o.actualBoundingBoxAscent??0,s=o.actualBoundingBoxDescent??0,i={ascent:r,descent:s,fontSize:r+s};return R._fonts[e]=i,i}static clearMetrics(e=""){e?delete R._fonts[e]:R._fonts={}}static get _canvas(){if(!R.__canvas){let e;try{const t=new OffscreenCanvas(0,0);if(t.getContext("2d",Ir)?.measureText)return R.__canvas=t,t;e=pn.get().createCanvas()}catch{e=pn.get().createCanvas()}e.width=e.height=10,R.__canvas=e}return R.__canvas}static get _context(){return R.__context||(R.__context=R._canvas.getContext("2d",Ir)),R.__context}};Ie.METRICS_STRING="|ÉqÅ";Ie.BASELINE_SYMBOL="M";Ie.BASELINE_MULTIPLIER=1.4;Ie.HEIGHT_MULTIPLIER=2;Ie.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter=="function"){const n=new Intl.Segmenter;return e=>{const t=n.segment(e),o=[];let r=0;for(const s of t)o[r++]=s.segment;return o}}return n=>[...n]})();Ie.experimentalLetterSpacing=!1;Ie._fonts={};Ie._measurementCache=fu(1e3);let Pe=Ie;const Pu=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function ho(n){const e=typeof n.fontSize=="number"?`${n.fontSize}px`:n.fontSize;let t=n.fontFamily;Array.isArray(n.fontFamily)||(t=n.fontFamily.split(","));for(let o=t.length-1;o>=0;o--){let r=t[o].trim();!/([\"\'])[^\'\"]+\1/.test(r)&&!Pu.includes(r)&&(r=`"${r}"`),t[o]=r}return`${n.fontStyle} ${n.fontVariant} ${n.fontWeight} ${e} ${t.join(",")}`}const _r=1e5;function an(n,e,t,o=0,r=0,s=0){if(n.texture===j.WHITE&&!n.fill)return re.shared.setValue(n.color).setAlpha(n.alpha??1).toHexa();if(n.fill){if(n.fill instanceof Ro){const i=n.fill,a=e.createPattern(i.texture.source.resource,"repeat"),l=i.transform.copyTo(Ce.shared);return l.scale(i.texture.source.pixelWidth,i.texture.source.pixelHeight),a.setTransform(l),a}else if(n.fill instanceof yn){const i=n.fill,a=i.type==="linear",l=i.textureSpace==="local";let c=1,u=1;l&&t&&(c=t.width+o,u=t.height+o);let d,h=!1;if(a){const{start:p,end:f}=i;d=e.createLinearGradient(p.x*c+r,p.y*u+s,f.x*c+r,f.y*u+s),h=Math.abs(f.x-p.x)<Math.abs((f.y-p.y)*.1)}else{const{center:p,innerRadius:f,outerCenter:m,outerRadius:x}=i;d=e.createRadialGradient(p.x*c+r,p.y*u+s,f*c,m.x*c+r,m.y*u+s,x*c)}if(h&&l&&t){const p=t.lineHeight/u;for(let f=0;f<t.lines.length;f++){const m=(f*t.lineHeight+o/2)/u;i.colorStops.forEach(x=>{let g=m+x.offset*p;g=Math.max(0,Math.min(1,g)),d.addColorStop(Math.floor(g*_r)/_r,re.shared.setValue(x.color).toHex())})}}else i.colorStops.forEach(p=>{d.addColorStop(p.offset,re.shared.setValue(p.color).toHex())});return d}}else{const i=e.createPattern(n.texture.source.resource,"repeat"),a=n.matrix.copyTo(Ce.shared);return a.scale(n.texture.source.pixelWidth,n.texture.source.pixelHeight),i.setTransform(a),i}return Po("FillStyle not recognised",n),"red"}const Rr=new $t;class Mu{getCanvasAndContext(e){const{text:t,style:o,resolution:r=1}=e,s=o._getFinalPadding(),i=Pe.measureText(t||" ",o),a=Math.ceil(Math.ceil(Math.max(1,i.width)+s*2)*r),l=Math.ceil(Math.ceil(Math.max(1,i.height)+s*2)*r),c=xr.getOptimalCanvasAndContext(a,l);this._renderTextToCanvas(o,s,r,c,i);const u=o.trim?hu({canvas:c.canvas,width:a,height:l,resolution:1,output:Rr}):Rr.set(0,0,a,l);return{canvasAndContext:c,frame:u}}returnCanvasAndContext(e){xr.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,o,r,s){if(s.runsByLine&&s.runsByLine.length>0){this._renderTaggedTextToCanvas(s,e,t,o,r);return}const{canvas:i,context:a}=r,l=ho(e),c=s.lines,u=s.lineHeight,d=s.lineWidths,h=s.maxLineWidth,p=s.fontProperties,f=i.height;if(a.resetTransform(),a.scale(o,o),a.textBaseline=e.textBaseline,e._stroke?.width){const w=e._stroke;a.lineWidth=w.width,a.miterLimit=w.miterLimit,a.lineJoin=w.join,a.lineCap=w.cap}a.font=l;let m,x;const g=e.dropShadow?2:1,_=e.wordWrap?e.wordWrapWidth:h,y=(e._stroke?.width??0)/2;let b=(u-p.fontSize)/2;u-p.fontSize<0&&(b=0);for(let w=0;w<g;++w){const k=e.dropShadow&&w===0,I=k?Math.ceil(Math.max(1,f)+t*2):0,F=I*o;if(k)this._setupDropShadow(a,e,o,F);else{const L=e._gradientBounds,B=e._gradientOffset;if(L){const D={width:L.width,height:L.height,lineHeight:L.height,lines:s.lines};this._setFillAndStrokeStyles(a,e,D,t,y,B?.x??0,B?.y??0)}else B?this._setFillAndStrokeStyles(a,e,s,t,y,B.x,B.y):this._setFillAndStrokeStyles(a,e,s,t,y);a.shadowColor="black"}for(let L=0;L<c.length;L++)m=y,x=y+L*u+p.ascent+b,m+=this._getAlignmentOffset(d[L],_,e.align),e._stroke?.width&&this._drawLetterSpacing(c[L],e,r,m+t,x+t-I,!0),e._fill!==void 0&&this._drawLetterSpacing(c[L],e,r,m+t,x+t-I)}}_renderTaggedTextToCanvas(e,t,o,r,s){const{canvas:i,context:a}=s,{runsByLine:l,lineWidths:c,maxLineWidth:u,lineAscents:d,lineHeights:h,hasDropShadow:p}=e,f=i.height;a.resetTransform(),a.scale(r,r),a.textBaseline=t.textBaseline;const m=p?2:1,x=t.wordWrap?t.wordWrapWidth:u,_=(t._stroke?.width??0)/2,T=[];for(let y=0;y<l.length;y++){const b=l[y],w=[];for(const k of b){const I=ho(k.style);a.font=I,w.push({width:Pe._measureText(k.text,k.style.letterSpacing,a),font:I})}T.push(w)}for(let y=0;y<m;++y){const b=p&&y===0,w=b?Math.ceil(Math.max(1,f)+o*2):0,k=w*r;b||(a.shadowColor="black");let I=_;for(let F=0;F<l.length;F++){const L=l[F],B=c[F],D=d[F],W=h[F],U=T[F];let $=_;$+=this._getAlignmentOffset(B,x,t.align);const J=I+D;let G=$+o;for(let V=0;V<L.length;V++){const A=L[V],{width:X,font:ne}=U[V];if(a.font=ne,a.textBaseline=A.style.textBaseline,A.style._stroke?.width){const ae=A.style._stroke;if(a.lineWidth=ae.width,a.miterLimit=ae.miterLimit,a.lineJoin=ae.join,a.lineCap=ae.cap,b)if(A.style.dropShadow)this._setupDropShadow(a,A.style,r,k);else{G+=X;continue}else{const me=Pe.measureFont(ne),Ue=A.style.lineHeight||me.fontSize,ya={width:X,height:Ue,lineHeight:Ue,lines:[A.text]};a.strokeStyle=an(ae,a,ya,o*2,G-o,I)}this._drawLetterSpacing(A.text,A.style,s,G,J+o-w,!0)}G+=X}G=$+o;for(let V=0;V<L.length;V++){const A=L[V],{width:X,font:ne}=U[V];if(a.font=ne,a.textBaseline=A.style.textBaseline,A.style._fill!==void 0){if(b)if(A.style.dropShadow)this._setupDropShadow(a,A.style,r,k);else{G+=X;continue}else{const ae=Pe.measureFont(ne),me=A.style.lineHeight||ae.fontSize,Ue={width:X,height:me,lineHeight:me,lines:[A.text]};a.fillStyle=an(A.style._fill,a,Ue,o*2,G-o,I)}this._drawLetterSpacing(A.text,A.style,s,G,J+o-w,!1)}G+=X}I+=W}}}_setFillAndStrokeStyles(e,t,o,r,s,i=0,a=0){if(e.fillStyle=t._fill?an(t._fill,e,o,r*2,i,a):null,t._stroke?.width){const l=s+r*2;e.strokeStyle=an(t._stroke,e,o,l,i,a)}}_setupDropShadow(e,t,o,r){e.fillStyle="black",e.strokeStyle="black";const s=t.dropShadow,i=s.color,a=s.alpha;e.shadowColor=re.shared.setValue(i).setAlpha(a).toRgbaString();const l=s.blur*o,c=s.distance*o;e.shadowBlur=l,e.shadowOffsetX=Math.cos(s.angle)*c,e.shadowOffsetY=Math.sin(s.angle)*c+r}_getAlignmentOffset(e,t,o){return o==="right"?t-e:o==="center"?(t-e)/2:0}_drawLetterSpacing(e,t,o,r,s,i=!1){const{context:a}=o,l=t.letterSpacing;let c=!1;if(Pe.experimentalLetterSpacingSupported&&(Pe.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,c=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||c){i?a.strokeText(e,r,s):a.fillText(e,r,s);return}let u=r;const d=Pe.graphemeSegmenter(e);let h=a.measureText(e).width,p=0;for(let f=0;f<d.length;++f){const m=d[f];i?a.strokeText(m,u,s):a.fillText(m,u,s);let x="";for(let g=f+1;g<d.length;++g)x+=d[g];p=a.measureText(x).width,u+=h-p+l,h=p}}}const mt=new Mu,qo=class Ve extends Ea{constructor(e={}){super(),this.uid=za("textStyle"),this._tick=0,this._cachedFontString=null,Bu(e),e instanceof Ve&&(e=e._toObject());const r={...Ve.defaultTextStyle,...e};for(const s in r){const i=s;this[i]=r[s]}this._tagStyles=e.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(e){this._dropShadow!==e&&(e!==null&&typeof e=="object"?this._dropShadow=this._createProxy({...Ve.defaultDropShadow,...e}):this._dropShadow=e?this._createProxy({...Ve.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(typeof e=="string"?this._fontSize=parseInt(e,10):this._fontSize=e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...it.defaultFillStyle,...e},()=>{this._fill=sr({...this._originalFill},it.defaultFillStyle)})),this._fill=sr(e===0?"black":e,it.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...it.defaultStrokeStyle,...e},()=>{this._stroke=ir({...this._originalStroke},it.defaultStrokeStyle)})),this._stroke=ir(e,it.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit("update",this)}reset(){const e=Ve.defaultTextStyle;for(const t in e)this[t]=e[t]}assign(e){for(const t in e){const o=t;this[o]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=ho(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new Ve(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e=="boolean"?e:e?.texture){const o=typeof e=="boolean"?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(o),this._originalFill?.texture&&this._originalFill.texture.destroy(o),this._stroke?.texture&&this._stroke.texture.destroy(o),this._originalStroke?.texture&&this._originalStroke.texture.destroy(o)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(o,r,s)=>(o[r]===s||(o[r]=s,t?.(r,s),this.update()),!0)})}_isFillStyle(e){return(e??null)!==null&&!(re.isColorLike(e)||e instanceof yn||e instanceof Ro)}};qo.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};qo.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let vn=qo;function Bu(n){const e=n;if(typeof e.dropShadow=="boolean"&&e.dropShadow){const t=vn.defaultDropShadow;n.dropShadow={alpha:e.dropShadowAlpha??t.alpha,angle:e.dropShadowAngle??t.angle,blur:e.dropShadowBlur??t.blur,color:e.dropShadowColor??t.color,distance:e.dropShadowDistance??t.distance}}if(e.strokeThickness!==void 0){Se(Ze,"strokeThickness is now a part of stroke");const t=e.stroke;let o={};if(re.isColorLike(t))o.color=t;else if(t instanceof yn||t instanceof Ro)o.fill=t;else if(Object.hasOwnProperty.call(t,"color")||Object.hasOwnProperty.call(t,"fill"))o=t;else throw new Error("Invalid stroke value.");n.stroke={...o,width:e.strokeThickness}}if(Array.isArray(e.fillGradientStops)){if(Se(Ze,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(e.fill)||e.fill.length===0)throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");e.fill.length!==e.fillGradientStops.length&&Po("The number of fill colors must match the number of fill gradient stops.");const t=new yn({start:{x:0,y:0},end:{x:0,y:1},textureSpace:"local"}),o=e.fillGradientStops.slice(),r=e.fill.map(s=>re.shared.setValue(s).toNumber());o.forEach((s,i)=>{t.addColorStop(s,r[i])}),n.fill={fill:t}}}function Au(n,e){const{texture:t,bounds:o}=n,r=e._style._getFinalPadding();Ua(o,e._anchor,t);const s=e._anchor._x*r*2,i=e._anchor._y*r*2;o.minX-=r-s,o.minY-=r-i,o.maxX-=r-s,o.maxY-=r-i}class Ou extends Gc{}class Di{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),this._managedTexts=new Ts({renderer:e,type:"renderable",onUnload:this.onTextUnload.bind(this),name:"canvasText"})}resolutionChange(){for(const e in this._managedTexts.items){const t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}validateRenderable(e){const t=this._getGpuText(e),o=e.styleKey;return t.currentKey!==o?!0:e._didTextUpdate}addRenderable(e,t){const o=this._getGpuText(e);if(e._didTextUpdate){const r=e._autoResolution?this._renderer.resolution:e.resolution;(o.currentKey!==e.styleKey||e._resolution!==r)&&this._updateGpuText(e),e._didTextUpdate=!1,Au(o,e)}this._renderer.renderPipes.batch.addToBatch(o,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Ou;return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){const t=e._gpuData[this._renderer.uid];if(!t)return;const{canvasText:o}=this._renderer;o.getReferenceCount(t.currentKey)>0?o.decreaseReferenceCount(t.currentKey):t.texture&&o.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}}Di.extension={type:[E.WebGLPipes,E.WebGPUPipes,E.CanvasPipes],name:"text"};const Fu=new Da;function Lu(n,e,t,o){const r=Fu;r.minX=0,r.minY=0,r.maxX=n.width/o|0,r.maxY=n.height/o|0;const s=Is.getOptimalTexture(r.width,r.height,o,!1);return s.source.uploadMethodId="image",s.source.resource=n,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/o,s.frame.height=t/o,s.source.emit("update",s.source),s.updateUvs(),s}class Wi{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,o,r){typeof e=="string"&&(Se("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:o,resolution:t}),e.style instanceof vn||(e.style=new vn(e.style)),e.textureStyle instanceof Ht||(e.textureStyle=new Ht(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:i,textureStyle:a}=e,l=e.resolution??this._renderer.resolution,{frame:c,canvasAndContext:u}=mt.getCanvasAndContext({text:s,style:i,resolution:l}),d=Lu(u.canvas,c.width,c.height,l);if(a&&(d.source.style=a),i.trim&&(c.pad(i.padding),d.frame.copyFrom(c),d.frame.scale(1/l),d.updateUvs()),i.filters){const h=this._applyFilters(d,i.filters);return this.returnTexture(d),mt.returnCanvasAndContext(u),h}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||mt.returnCanvasAndContext(u),d}returnTexture(e){const t=e.source,o=t.resource;if(this._retainCanvasContext&&o?.getContext){const r=o.getContext("2d");r&&mt.returnCanvasAndContext({canvas:o,context:r})}t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",Is.returnTexture(e,!0)}renderTextToCanvas(){Se("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const o=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:o,usageCount:1},o}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const o=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(o,!1),r}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}class Gi extends Wi{constructor(e){super(e,!0)}}Gi.extension={type:[E.CanvasSystem],name:"canvasText"};class Vi extends Wi{constructor(e){super(e,!1)}}Vi.extension={type:[E.WebGLSystem,E.WebGPUSystem],name:"canvasText"};Pt.add(Gi);Pt.add(Vi);Pt.add(Di);class Eu extends cu{constructor(...e){const t=uu(e,"Text");super(t,vn),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof Ht?t.textureStyle:new Ht(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let o=0,r=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=mt.getCanvasAndContext({text:this.text,style:this._style,resolution:1});mt.returnCanvasAndContext(i),o=s.width,r=s.height}else{const s=Pe.measureText(this._text,this._style);o=s.width,r=s.height}e.minX=-t._x*o,e.maxX=e.minX+o,e.minY=-t._y*r,e.maxY=e.minY+r}}const $i=class Hi extends C{constructor(e={}){e={...Hi.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const o=e[t];if(o.parentRenderLayer){if(o.parentRenderLayer===this)continue;o.parentRenderLayer.detach(o)}this.renderLayerChildren.push(o),o.parentRenderLayer=this;const r=this.renderGroup||this.parentRenderGroup;r&&(r.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const o=e[t],r=this.renderLayerChildren.indexOf(o);r!==-1&&this.renderLayerChildren.splice(r,1),o.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,o){const r=this.renderLayerChildren,s=r.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)r[i].parent||Po("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",r[i]),r[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,o){if(!e)return;const r=this.renderLayerChildren;for(let s=0;s<r.length;s++)r[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};$i.defaultOptions={sortableChildren:!1,sortFunction:(n,e)=>n.zIndex-e.zIndex};let Pr=$i;var zu=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;uniform sampler2D uMask;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);float maskVal=texture(uMask,vTextureCoord).r;finalColor=mix(c,lutColourReplace(uLut,c),maskVal);}`;const Uu=Z.from({vertex:Le,fragment:zu,name:"palette-swop-filter1"});class vt extends q{constructor({paletteSwaps:e,lutType:t},o=j.WHITE){const r=(t==="voronoi"?Mc:Bc)(e);super({glProgram:Uu,resources:{colorReplaceUniforms:{},uLut:r.source,uMask:o.source}}),this.mask=o,this.#e=r}#e;destroy(e){const t=e===!0||typeof e=="object"&&e.destroyPrograms,o=e===!0||typeof e=="object"&&e.destroyLutTexture,r=this.lutTexture!==j.WHITE&&e===!0||typeof e=="object"&&e.destroyMask;o&&this.#e?.destroy(!0),this.#e=null,r&&this.mask?.destroy(!0),super.destroy(t)}get lutTexture(){return this.#e}}const Ni={ambient:[]},Du=ot(Nt).filter(n=>n.startsWith("shadow.")||n.startsWith("shadowMask.")||n.startsWith("hud.")).toArray(),Wu=n=>typeof n=="function"?ot(Nt).filter(n):n,Gu=(n,e)=>new vt({paletteSwaps:_s(S,([t])=>t==="replaceDark"||t==="replaceLight"?[t,n]:[t,e]),lutType:"sparse"}),Vu=(n,{ambient:e,textureSpecific:t=wt,noReplacePlaceholderTextures:o=wt},r=Wa())=>{const s=[];for(const{textureIds:u,paletteSwaps:d}of t){const h=ar(n,{rects:{textureIds:u,color:zn},clearColour:Un}),p=new vt({paletteSwaps:d,lutType:"sparse"},h);s.push(p)}const i=o.length>0?Gu(Un,zn):void 0,a=ar(n,{clearColour:zn,rects:{textureIds:Va(Du,ot(t).filter(({dodgeAmbient:u})=>u).flatMap(({textureIds:u})=>Wu(u))),color:Un},placeholderColoursMasks:i?{textureIds:o,filter:i,originalSpritesheet:Be()}:void 0});i?.destroy({destroyLutTexture:!0,destroyMask:!0});for(const u of e){const d=new vt(u,a);s.push(d)}const l=new te(r);l.filters=s;const c=et.create({width:r.width,height:r.height});n.render({container:l,target:c}),l.destroy(!1),a.destroy();for(const u of s)u instanceof vt?u.destroy({destroyLutTexture:!0,destroyMask:!0,destroyPrograms:!1}):u.destroy(!1);return c},Bt=(n,e,t)=>{const o=Vu(n,e,t),r=new Ga(o.source,structuredClone(Qe));return r.parseSync(),r.textureSource.scaleMode="nearest",r},Zo={ambient:[{paletteSwaps:Bn,lutType:"sparse"}]},wn=(n,e,t)=>{const o=j.from(e.textureSource),r=Bt(n,t,o);return o.destroy(),e.textureSource.destroy(),e.destroy(!0),r};let po;const $u=n=>{po=Bt(n,{ambient:[{lutType:"voronoi",paletteSwaps:{pureBlack:new re(0),shadow:new re(16777215),redShadow:new re(16777215)}}]})},Hu=()=>{if(po===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return po};Pt.add(ri,si,ii,ai,li,ci,ui,di,hi,pi,fi,gi,mi,xi,bi,yi,vi,wi,Si,Ci,Ti);const Nu=async(n,{forceRefetch:e}=ie)=>await M.dispatch($a.endpoints.getCampaign.initiate(n,{forceRefetch:e}));j.from;Ha.prototype.destroy;const ju=n=>{n.ticker.remove(n.render,n)},ji={white:{basic:{main:"white",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"white",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}}},yellow:{basic:{main:"yellow",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}},dimmed:{main:"yellow",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!1}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}}},magenta:{basic:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}},dimmed:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}}},cyan:{basic:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}},dimmed:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!0},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}}},green:{basic:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}}}},Jt=n=>ji[n.hue][n.shade],fo={head:"pastelBlue",heels:"pink"},Mr=(n,e)=>{const t=Jt(n.color).edges[e];return se(t.hue,t.dimInOriginal?"dimmed":"basic")},Xu=Nt.filter(n=>n.startsWith("door.")),mo=n=>/\.floor$/.test(n),go=n=>/\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(n),Br=n=>/door\.legs\.pillar/.test(n),Yu=n=>/\.wall\.[^.]+\.left$/.test(n),$n=n=>mo(n)||go(n),qu=(n,e,t)=>{if(n)return{ambient:[{lutType:"sparse",paletteSwaps:K(t.hue,t.shade==="dimmed")},t.shade==="basic"?Xi(e,t):{lutType:"sparse",paletteSwaps:{...Bn}}],textureSpecific:[...Ju(e,t),...Zu(e,t),...Ku(t)],noReplacePlaceholderTextures:Xu}},Zu=(n,e)=>{const{edges:t}=ji[e.hue][e.shade],o=K(t.right.hue,e.shade==="dimmed","light-mid"),r=K(t.towards.hue,e.shade==="dimmed","mid-dark");return[{textureIds:["floorEdge.half.right","floorEdge.right","generic.door.floatingThreshold.y"],paletteSwaps:o},{textureIds:["floorEdge.half.towards","floorEdge.towards","generic.door.floatingThreshold.x"],paletteSwaps:r}]},Ju=(n,e)=>{if(n==="jail")return[{textureIds:$n,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];if(n==="blacktooth"&&e.shade==="dimmed")return[{textureIds:go,paletteSwaps:K(e.hue,!0,"light-mid")}];if(e.hue==="white"||e.hue==="yellow")switch(n){case"market":return[{textureIds:$n,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];case"egyptus":return[{textureIds:Br,paletteSwaps:K(e.hue,e.shade==="dimmed","light-dark")},{textureIds:mo,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")},{textureIds:Yu,paletteSwaps:K(e.hue,e.shade==="dimmed","light-mid")},{textureIds:go,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];case"moonbase":case"penitentiary":case"safari":case"bookworld":return[{textureIds:mo,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];case"blacktooth":return[{textureIds:Br,paletteSwaps:K(e.hue,e.shade==="dimmed","light-dark")},{textureIds:$n,paletteSwaps:K(e.hue,e.shade==="dimmed","light-mid")}]}return wt},Ku=n=>{const{hue:e,shade:t}=n;return e==="white"||e==="yellow"?[{textureIds:["book.x","book.y"],paletteSwaps:{...K(e,t==="dimmed","light-mid"),shadow:co(`swop_${e}Dim`,t==="dimmed")}}]:t==="dimmed"?[{textureIds:["book.x","book.y"],paletteSwaps:{...K(n.hue,!0,n.hue==="cyan"?"light-mid":"mid-dark")}}]:wt},Qu={blacktooth:{pureBlack:Re(S.moss,.15)},safari:{pureBlack:Re(S.moss,.17)},jail:{pureBlack:Re(S.redShadow,.2)},egyptus:{pureBlack:Re(S.redShadow)},moonbase:{shadow:S.shadow_greyBlue,pureBlack:Re(S.metallicBlue,.2)},bookworld:{shadow:S.shadow_brown,pureBlack:Re(S.highlightBeige,.1)},penitentiary:{pureBlack:Re(S.midGrey,.2)}},ed={yellow:{shadow:S.shadow_brown},white:{shadow:S.shadow_greyBlue},magenta:{shadow:S.shadow_magenta},cyan:{shadow:S.shadow_blue}},Xi=(n,e)=>({lutType:"sparse",paletteSwaps:{...ed[e.hue]??ie,...Qu[n]??ie}});let gt,xo=Ni;const Yi=()=>{gt!==void 0&&(gt.textureSource.destroy(),gt.destroy(!0),gt=void 0)},td=(n,e,t,o)=>{Yi(),xo=qu(e,t,o)??Ni,gt=Bt(n,xo)},nd=()=>gt,bn=n=>{let e=S[n];for(const t of xo.ambient)e=t.paletteSwaps[n]??e;return e};let Xe;const Jo={lightBeige:S.lightGrey,redShadow:S.shadow,pink:S.lightGrey,moss:S.lightGrey,midRed:S.midGrey,highlightBeige:S.lightGrey,pastelBlue:S.lightGrey,metallicBlue:S.midGrey,replaceLight:S.lightGrey,replaceDark:S.midGrey},od=Rs(Jo,"metallicBlue","pastelBlue"),rd=Rs(Jo,"pink"),sd={ambient:[{paletteSwaps:Jo,lutType:"sparse"}],textureSpecific:[{textureIds:Nt.filter(n=>n.startsWith("head.")),paletteSwaps:od,dodgeAmbient:!0},{textureIds:Nt.filter(n=>n.startsWith("heels.")),paletteSwaps:rd,dodgeAmbient:!0}]},id=()=>{Xe!==void 0&&(Xe.textureSource.destroy(),Xe.destroy(!0),Xe=void 0)},ad=(n,e,t)=>{id();let o=Bt(n,sd);t.shade==="dimmed"?o=wn(n,o,Zo):o=wn(n,o,{ambient:[Xi(e,t)]}),Xe=o},ld=()=>{if(Xe===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Xe};let Ye;const cd={midGrey:S.midRed,lightGrey:S.lightBeige,white:S.highlightBeige,metallicBlue:S.redShadow,shadow:S.redShadow,pastelBlue:S.lightBeige,pink:S.midRed,moss:S.midRed,replaceDark:S.midRed,replaceLight:S.lightBeige},ud=()=>{Ye!==void 0&&(Ye.textureSource.destroy(),Ye.destroy(!0),Ye=void 0)},dd=(n,e)=>{ud();let t=Bt(n,{ambient:[{paletteSwaps:cd,lutType:"sparse"}]});e&&(t=wn(n,t,Zo)),Ye=t},hd=()=>{if(Ye===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ye};let qe;const pd={pastelBlue:S.moss,metallicBlue:S.moss,pink:S.moss},fd=()=>{qe!==void 0&&(qe.textureSource.destroy(),qe.destroy(!0),qe=void 0)},md=(n,e)=>{fd();let t=Bt(n,{ambient:[{paletteSwaps:pd,lutType:"sparse"}]});e&&(t=wn(n,t,Zo)),qe=t},gd=()=>{if(qe===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return qe},Te=n=>{try{switch(n){case"original":return Be();case"deactivated":return ld();case"doughnutted":return hd();case"for-current-room":return nd();case"sceneryPlayer":return gd();case"uncolourised":return Hu();default:return n}}catch(e){throw new Error(`could not get spritesheet variant "${n}"`,{cause:e})}},Dt=(n="for-current-room",e)=>Te(n).textures[e];var xd=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let bo=Mo(M.getState());M.subscribe(()=>{bo=Mo(M.getState())});const bd=Z.from({vertex:Le,fragment:xd,name:"outline-filter"});class Fe extends q{#e;constructor({color:e,width:t}){const o=t??bo;super({glProgram:bd,padding:o,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.#e=t;const r=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();r.uOutline[0]=s,r.uOutline[1]=i,r.uOutline[2]=a}apply(e,t,o,r){const s=this.resources.colorReplaceUniforms.uniforms,i=this.#e??bo;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,o,r)}}const Kt={..._s(S,([n,e])=>[n,new Fe({color:e})]),black1pxFilter:new Fe({color:S.pureBlack,width:1})},Hn={x:.5,y:1},Ar=n=>typeof n!="string"&&Object.hasOwn(n,"animationId"),yo=n=>{const{anchor:e,flipX:t,pivot:o,x:r,y:s,times:i,label:a}=n;if(n.times){const c=Na(i);if(Sn(c)>=2){const d=new C({label:a??"timesXyz"});for(let{x:h}=c;h>=1;h--)for(let{y:p}=c;p>=1;p--)for(let f=1;f<=c.z;f++){const m={...n,label:`(${h},${p},${f})`,...n.subSpriteVariations?.(h-1,p-1,f-1),subSpriteVariations:void 0};"randomiseStartFrame"in m&&(m.randomiseStartFrame=`${m.randomiseStartFrame}${h},${p},${f}`),delete m.times;const x=yo(m),g=tt({x:h-1,y:p-1,z:f-1});x.x+=g.x,x.y+=+g.y,d.addChild(x)}return d}}if(n.subSpriteVariations!==void 0)return yo({...n,...n.subSpriteVariations(0,0,0),subSpriteVariations:void 0});let l;if(Ar(n))l=yd(n);else{const{textureId:c}=n,u=Te(n.spritesheetVariant??"original");l=new te(c!==void 0?u.textures[c]:j.EMPTY)}if(e===void 0&&o===void 0)if(Ar(n))l.anchor=Hn;else{const{textureId:c}=n,u=c!==void 0?Te(n.spritesheetVariant??"original").data.frames[c]:void 0;if(u!==void 0){const d=u.frame;d.pivot!==void 0?l.pivot=d.pivot:l.anchor=Hn}else l.anchor=Hn}else e!==void 0&&(l.anchor=e),o!==void 0&&(l.pivot=o);return r!==void 0&&(l.x=r),s!==void 0&&(l.y=s),a!==void 0&&(l.label=a),l.eventMode="static",t===!0&&(l.scale.x=-1),l},qi=(n,e=!1)=>{const t=ht.shared.speed,o=e||t===0?0:Math.sqrt(t)/t;return Qe.animations[n].animationSpeed*o},Ko=n=>n.map(e=>({texture:e,time:Ps}));function yd({animationId:n,reverse:e,playOnce:t,paused:o,randomiseStartFrame:r,spritesheetVariant:s}){const i=Te(s).animations[n],a=Ko(i);e&&a.reverse();const l=new be(a);return l.animationSpeed=qi(n,o),l.gotoAndPlay(r!==void 0?Math.floor(Ms(r)*a.length):0),t!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),t==="and-destroy"&&(l.visible=!1)}),l}const v=yo;class vd extends be{destroy(e){const t=this.textures.map(o=>"texture"in o?o.texture:o).filter(o=>o instanceof et);super.destroy(e);for(const o of t)o.destroy(!0)}}class wd extends te{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:this.texture instanceof et,children:e}):super.destroy({...e,texture:t,textureSource:this.texture instanceof et})}}const Xt=(n,e,t)=>{const o=e.getLocalBounds(),r=Math.ceil(o.maxX-o.minX),s=Math.ceil(o.maxY-o.minY),i=t!==void 0?t.width===r&&t.height===s:!1,a=i?t:et.create({width:r,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=o.minX,e.y-=o.minY;try{n.render({container:e,target:a,clear:i})}catch(u){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${uo(e)}`,{cause:u})}return e.x=l,e.y=c,a},xe=(n,e,t,o)=>{const r=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof et?t.texture:void 0,i=Xt(n,e,s),a=t||new wd;return a.texture=i,a.label=o??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Qo=(n,e,t,o)=>{if(e instanceof be||e instanceof te)return e;const r=e.getLocalBounds(),s=e.children.find(l=>l instanceof be)?.textures.length??1,i=ot(ja(0,s)).map(l=>{if(l>0)for(const c of e.children)c instanceof be&&c.gotoAndStop((c.currentFrame+1)%s);return Xt(n,e)}).toArray(),a=new vd(Ko(i));return a.animationSpeed=qi(t,!1),a.gotoAndPlay(0),a.label=`animated sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},At=(n,e)=>e instanceof te?e:xe(n,e),Sd=n=>{const e=`hud.char.${Xa(n)}`;try{As(e)}catch(t){throw new Error(`no texture id for char "${n}": ${t.message}`,{cause:t})}return e},Cd=n=>typeof n=="string"?n==="infinite"?"":n:n.toString();class N extends C{#e;#t="";#o;#n;#r;#s;#i;constructor({pixiRenderer:e,doubleHeight:t=!1,doubleWidth:o=!1,outline:r=!1,label:s="text",x:i,y:a,tint:l,text:c}){super({label:s,x:i,y:a,tint:l}),this.#e=e,this.#s=t?2:1,this.#i=o?2:1,this.#o=new te,this.#o.y=-(Ne.h*this.#s+1),this.addChild(this.#o),this.#r=new C,this.addChild(this.#r),this.#n=new C,this.#n.scale={x:this.#i,y:this.#s},r&&(this.#n.filters=new Fe({color:S.pureBlack,width:1})),this.#r.addChild(this.#n),c!==void 0&&(this.text=c)}get text(){return this.#t}set text(e){const t=Cd(e);this.#t!==t&&(this.#l(t),this.#r.visible=!0,this.#r.boundsArea=new $t(-1,-1,(Ne.w*t.length+2)*this.#i,(Ne.h+2)*this.#s),this.#o.texture&&this.#o.texture.destroy(!0),this.#o.texture=Xt(this.#e,this.#r),this.#o.x=-this.#o.texture.frame.width/2,this.#r.visible=!1,this.#t=t)}#l(e){const t=Bs(e),o=this.#n.children.length,r=t!==o;try{const s=Be().textures;let i=0;for(const a of e){const l=Sd(a);let c;i<o?(c=this.#n.getChildAt(i),c.texture=s[l]):(c=new te(s[l]),this.#n.addChild(c)),i++}}catch(s){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(s),window.invalid=e,new Error(`could not show text "${e}" in container because: "${s.message}"`,{cause:s})}if(r){t<o&&this.#n.removeChildren(t);for(let s=0;s<t;s++){const i=this.#n.getChildAt(s);i.x=s*Ne.w}}}destroy(e){this.#o.destroy({texture:!0,textureSource:!0}),super.destroy(e)}get characterSpriteContainer(){return this.#n}}function Td(n){return{all:n=n||new Map,on:function(e,t){var o=n.get(e);o?o.push(t):n.set(e,[t])},off:function(e,t){var o=n.get(e);o&&(t?o.splice(o.indexOf(t)>>>0,1):n.set(e,[]))},emit:function(e,t){var o=n.get(e);o&&o.slice().map(function(r){r(t)}),(o=n.get("*"))&&o.slice().map(function(r){r(e,t)})}}}class er{constructor(e=2e3){this.reportIntervalMs=e}static instance=new er;#e={physics:{totalMs:0,count:0},hudUpdate:{totalMs:0,count:0},updateSceneGraph:{totalMs:0,count:0},pixiRender:{totalMs:0,count:0}};#t={};#o=performance.now();#n={frameCount:0,elapsedMs:0,fps:0,theoreticalFps:0,phases:{physics:{avgMs:0,percentage:0},hudUpdateSceneGraph:{avgMs:0,percentage:0},updateSceneGraph:{avgMs:0,percentage:0},pixiRender:{avgMs:0,percentage:0},total:{avgMs:0,percentage:0}}};#r=Td();startPhysics(){this.#t.physicsStart=performance.now()}endPhysics(){if(this.#t.physicsStart===void 0){console.warn("endPhysics called without startPhysics");return}const e=performance.now()-this.#t.physicsStart;this.#e.physics.totalMs+=e,this.#e.physics.count++,this.#t.physicsStart=void 0}startHudUpdate(){this.#t.hudUpdateStart=performance.now()}endHudUpdate(){if(this.#t.hudUpdateStart===void 0){console.warn("endHudUpdate called without startHudUpdate");return}const e=performance.now()-this.#t.hudUpdateStart;this.#e.hudUpdate.totalMs+=e,this.#e.hudUpdate.count++,this.#t.hudUpdateStart=void 0}startUpdateSceneGraph(){this.#t.updateSceneGraphStart=performance.now()}endUpdateSceneGraph(){if(this.#t.updateSceneGraphStart===void 0){console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");return}const e=performance.now()-this.#t.updateSceneGraphStart;this.#e.updateSceneGraph.totalMs+=e,this.#e.updateSceneGraph.count++,this.#t.updateSceneGraphStart=void 0}startPixiRender(){this.#t.pixiRenderStart=performance.now()}endPixiRender(){if(this.#t.pixiRenderStart===void 0){console.warn("endPixiRender called without startPixiRender");return}const e=performance.now()-this.#t.pixiRenderStart;this.#e.pixiRender.totalMs+=e,this.#e.pixiRender.count++,this.#t.pixiRenderStart=void 0}tickDone(){const e=performance.now();e-this.#o>=this.reportIntervalMs&&this.#s(e)}on(e){this.#r.on("stats",e)}off(e){this.#r.off("stats",e)}#s(e){const{physics:t,hudUpdate:o,updateSceneGraph:r,pixiRender:s}=this.#e;t.count===0&&o.count===0&&r.count===0&&s.count===0||(this.#i(e),this.#r.emit("stats",this.#n),this.reset(e))}#i(e){const{physics:t,hudUpdate:o,updateSceneGraph:r,pixiRender:s}=this.#e,i=t.count>0?t.totalMs/t.count:0,a=o.count>0?o.totalMs/o.count:0,l=r.count>0?r.totalMs/r.count:0,c=s.count>0?s.totalMs/s.count:0,u=i+a+l+c,d=Math.max(t.count,o.count,r.count,s.count),h=e-this.#o;this.#n.frameCount=d,this.#n.elapsedMs=h,this.#n.fps=d/h*1e3,this.#n.theoreticalFps=u>0?1e3/u:0,this.#n.phases.physics.avgMs=i,this.#n.phases.physics.percentage=i/u*100,this.#n.phases.hudUpdateSceneGraph.avgMs=a,this.#n.phases.hudUpdateSceneGraph.percentage=a/u*100,this.#n.phases.updateSceneGraph.avgMs=l,this.#n.phases.updateSceneGraph.percentage=l/u*100,this.#n.phases.pixiRender.avgMs=c,this.#n.phases.pixiRender.percentage=c/u*100,this.#n.phases.total.avgMs=u,this.#n.phases.total.percentage=100}reset(e=performance.now()){this.#e.physics.totalMs=0,this.#e.physics.count=0,this.#e.hudUpdate.totalMs=0,this.#e.hudUpdate.count=0,this.#e.updateSceneGraph.totalMs=0,this.#e.updateSceneGraph.count=0,this.#e.pixiRender.totalMs=0,this.#e.pixiRender.count=0,this.#o=e}}const Yt=er.instance;Os({predicate(n,e,t){return je(e)!==je(t)},effect(n){Yt.reset()}});class Or{constructor(e){this.renderContext=e,this.#t=new N({pixiRenderer:e.general.pixiRenderer,label:"fps",outline:!0,y:Ne.h,text:"..."}),this.#e.addChild(this.#t),Yt.on(this.tick)}#e=new C({label:"FpsRenderer"});#t;#o=!1;#n;set isDark(e){this.#o!==e&&(this.#o=e,this.#s())}#r(e,t){const o=e/t;return o>1.95?"white":o>1.67?"highlightBeige":o>.97?"moss":o>.92?"pastelBlue":o>.83?"metallicBlue":o>.67?"pink":"midRed"}#s(){const e=this.#n;this.#t.text=e===void 0?"...":`${Math.round(e)} FPS`;const t=e===void 0?"white":this.#r(e,60),o=ni(this.#o);this.#t.tint=o[t]}tick=e=>{this.#n=e.fps,this.#s()};get output(){return this.#e}destroy(){Yt.off(this.tick),this.#e.destroy()}}const Nn={colourised:{jump:"pastelBlue",fire:"highlightBeige",carry:"moss",carryAndJump:"midRed",menu:"lightGrey",map:"lightGrey"},zx:{jump:"blue",fire:"yellow",carry:"green",carryAndJump:"red",menu:"white",map:"white"}};class An extends C{constructor(e,t,o,r){super({label:`arcadeButton (${t})`}),this.colourised=e,this.which=t,this.pixiRenderer=o,this.#t=new C({label:"depress"}),this.addChild(this.#t),this.#n=new te({anchor:{x:.5,y:1}}),this.#r=new te({anchor:{x:.5,y:1}}),this.#r.visible=!1,this.#t.addChild(this.#n),this.#t.addChild(this.#r),this.#e=new C({label:"surface"});const s=v({textureId:"button.surfaceMask",label:"surfaceMask",spritesheetVariant:"original"});this.#t.addChild(s),this.#e.mask=s,this.#t.addChild(this.#e),this.shownOnSurface=r}#e;#t;#o;#n;#r;get shownOnSurface(){return this.#o}set shownOnSurface(e){this.#o!==void 0&&this.#o.destroy({children:!0}),this.#o=e,e!==void 0&&this.#e.addChild(e)}set pressed(e){this.#n.visible=!e,this.#r.visible=e,this.#t.y=e?1:0}generateButtonSpriteTextures(e){const{which:t,colourised:o}=this,r=v({textureId:"button",spritesheetVariant:"original"}),s=o?co(Nn.colourised[t],e.color.shade==="dimmed"):se(Nn.zx[t]),i=o?Re(s,.66):se(Nn.zx[t],"dimmed"),a=o?co("pureBlack",e.color.shade==="dimmed"):se("black"),l=new vt({lutType:"sparse",paletteSwaps:{replaceLight:s,replaceDark:i,pureBlack:a}});r.filters=l;const c=Xt(this.pixiRenderer,r,this.#n.texture===j.EMPTY?void 0:this.#n.texture);r.texture=Be().textures["button.pressed"];const u=Xt(this.pixiRenderer,r,this.#r.texture===j.EMPTY?void 0:this.#r.texture);this.#n.texture=c,this.#r.texture=u,l.destroy({destroyLutTexture:!0}),r.destroy({children:!0})}}const vo=n=>{if(n instanceof te){const{texture:e}=n;e instanceof et&&e.destroy(!0)}for(const e of n.children)vo(e)};class Zi{constructor(e,t){this.renderContext=e,this.appearance=t}#e;output=new C({label:"AppearanceRenderer"});destroy(){this.#e?.output&&vo(this.#e.output),this.output.destroy({children:!0})}tick(e){const t=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),vo(this.#e.output),this.#e.output.destroy({texture:!1,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}const tr=-11;class at extends Zi{constructor(e,t){super(e,t)}}const On=(n,e)=>n.every(t=>e.currentActionPress(t,!0)!=="released"),kd=({renderContext:{button:n,inputStateTracker:e,general:{colourised:t,pixiRenderer:o}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=r?.renderProps,l=r?.output,u=(s&&Cn(s))?.hasBag??!1,d=On(n.actions,e),h=a===void 0||d!==a.pressed||t!==a.colourised||u!==a.hasBag,p=i!==a?.renderedInRoom;if(!h&&!p)return"no-update";const f=l===void 0?new An(t,n.which,o,new N({pixiRenderer:o,text:"C+J",y:tr})):l;return p&&(f.generateButtonSpriteTextures(i),f.shownOnSurface.tint=Ho(t,i?.color.shade==="dimmed")),u?(f.visible=!0,a?.pressed!==d&&(f.pressed=d)):f.visible=!1,{output:f,renderProps:{pressed:d,hasBag:u,colourised:t,renderedInRoom:i}}},Ji=350,Id=(n,e,t,o)=>{const r=n.type==="heels"?n.state:n.state.heels,{carrying:s}=r;if(s===null)return;const{inputStateTracker:i}=t;if(!(i.currentActionPress("carry")!=="released")||n.state.standingOnItemId===null||!Ki(n,e[qt]))return;const{state:{position:c}}=n;Ee({room:e,item:s,atPosition:c}),so(n,e),r.carrying=null,io({subjectItem:n,gameState:t,room:e,posDelta:{x:0,y:0,z:s.aabb.z},forceful:!0,deltaMS:o,onTouch:ao,visited:new Set().add(n.id)}),Fs({above:n,below:s}),i.inputWasHandled("carry",Ji)},Ki=(n,e)=>{const t={state:{position:ue(n.state.position,{z:z.z})},aabb:n.aabb,id:"item.id-proposedPutdownLocation"},o=Bo(t,e,r=>Ao(r,n)&&r!==n);for(const r of o){if(!St(r))return console.log("carrying: cannot put down due to collision: item:",n,"can't move up because it would collide with non-free",r),!1;if(!Ki(r,e))return console.log("carrying: cannot put down due to collision: item:",n,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},_d=(n,e,t)=>{const{inputStateTracker:o}=t,r=n.type==="heels"?n.state:n.state.heels,{carrying:s,hasBag:i}=r;if(!i)return;const a=de(e.items).filter(Oo),l=s===null?Qi(n,e):void 0;for(const d of a)d.state.wouldPickUpNext=!1;l!==void 0&&(l.state.wouldPickUpNext=!0),o.currentActionPress("carry")!=="released"&&l!==void 0&&(Rd(e,r,l),o.inputWasHandled("carry",Ji))},Rd=(n,e,t)=>{e.carrying=t,t.state.wouldPickUpNext=!1,Us({room:n,item:t})},Qi=(n,e)=>{const t=Ls(n),o=l=>Oo(l)&&(t||!zs(l)),r=de(e.items).filter(o),s=Es(n,r);if(s)return s;const i=Ya(e,n.state),a=i&&e.items[i];if(a&&o(a))return a},Pd=(n,e,t,o)=>e==="tower"?o==="moonbase"?"tower.moonbase":"tower":e==="book"?"book.x":e==="organic"&&n?`block.organic.dark${t?".disappearing":""}`:`block.${e}${t?".disappearing":""}`,Md=({renderContext:{general:{pixiRenderer:n,colourised:e},item:{config:{style:t,times:o},state:{disappearing:r}},room:s},currentRendering:i})=>{const a=i?.renderProps,l=r!==null;return a===void 0||a.isDissapearing!==l?{output:At(n,v({textureId:Pd(s.color.shade==="dimmed",t,l,s.planet),times:o,spritesheetVariant:e?"for-current-room":"uncolourised"})),renderProps:{isDissapearing:l}}:"no-update"},Bd=({renderContext:{item:{state:{pressed:n}},general:{colourised:e}},currentRendering:t})=>{const o=t?.renderProps;return o===void 0||n!==o.pressed?{output:v({textureId:n?"buttonInGame.pressed":"buttonInGame",spritesheetVariant:e?"for-current-room":"uncolourised"}),renderProps:{pressed:n}}:"no-update"},xt=({top:n,bottom:e})=>{const t=new C,o=v(e);t.addChild(o);const r=v(n);return r.y=-12,t.addChild(r),t[Fn]=r,t[nr]=o,t},Fn=Symbol(),nr=Symbol(),Ad=({top:n,bottom:e})=>{const t=new C;return t.addChild(e),n.y=-z.z,t.addChild(n),t[Fn]=n,t[nr]=e,t},Od=({renderContext:{item:{state:{facing:n,actedOnAt:{roomTime:e,by:t},activated:o=!0}},room:{roomTime:r,items:s},general:{colourised:i}},currentRendering:a})=>{const l=a?.renderProps,c=Tn(n)??"towards",u=r===e&&ot(Fo(t)).some(p=>Ds(s[p]));if(!(l===void 0||c!==l.facingXy4||u!==l.controlledByJoystick||o!==l.activated))return"no-update";const h=i?o?"for-current-room":"deactivated":"uncolourised";return{output:xt({top:{textureId:`charles.${c}`,spritesheetVariant:h},bottom:{textureId:u?"headlessBase.all":"headlessBase",spritesheetVariant:h}}),renderProps:{facingXy4:c,controlledByJoystick:u,activated:o}}},Qt=n=>{for(const e in n)return!0;return!1},en=n=>n,Fr=250,Fd=Qe.animations["conveyor.x"].animationSpeed,Lr=Qe.animations["conveyor.x"].length,Ld=n=>1-(1-n)**2,Ed=3,zd=(n,e)=>{for(let t=0;t<n.children.length;t++){const o=n.children[t],r=t*Ed%Lr;o.gotoAndStop(e?Lr-r-1:r)}},Ud=(n,e,t)=>{const o=Tt(n),r=v({animationId:`conveyor.${o}`,reverse:n==="towards"||n==="right",times:e,spritesheetVariant:t}),s=r instanceof be?new C({children:[r]}):r;return zd(s,n==="towards"||n==="right"),s},Dd=({renderContext:{item:{config:{times:n},state:{stoodOnBy:e,direction:t}},room:{roomTime:o},general:{colourised:r,pixiRenderer:s}},currentRendering:i})=>{const a=i?.renderProps,l=Qt(e),c=!l&&(a?.moving??!1),u=c?o:a?.roomTimeStoppedMoving??Ct,d=l?0:Math.min(o-u,Fr),h=i?.output,p=!h||t!==a?.direction,m=p?Qo(s,Ud(t,n,r?"for-current-room":"uncolourised"),"conveyor.x"):h,x=Math.max(0,1-d/Fr);if(x===0)m.stop();else{const g=Fd*Ld(x);m.play(),m.animationSpeed=g}return p||c||l!==a?.moving?{output:m,renderProps:{moving:l,roomTimeStoppedMoving:u,direction:t}}:"no-update"},Wd=en(Dd),ln=(n,e,t=!1)=>{if(t){const r=`${n}.dark.${e}`;if(jt(r))return r}const o=`${n}.${e}`;return jt(o)?o:`generic.${e}`};function ea(n,e){const t=e||new C;for(const o of n)t.addChild(o);return t}const Ln=(n,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return v({...n,times:t})},lt=n=>Q(({renderContext:{item:e,general:{colourised:t}}})=>Lo(e)?v({...typeof n=="string"?{textureId:n}:n,times:kn(e),spritesheetVariant:t?"for-current-room":"uncolourised"}):v({...typeof n=="string"?{textureId:n}:n,spritesheetVariant:t?"for-current-room":"uncolourised"})),Gd=n=>Q(({renderContext:{item:e,general:{paused:t,colourised:o}}})=>Lo(e)?v({...n,times:kn(e),paused:t,spritesheetVariant:o?"for-current-room":"uncolourised"}):v({...n,paused:t,spritesheetVariant:o?"for-current-room":"uncolourised"})),le=n=>Q(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(Lo(e))return At(t,Ln(n,kn(e)));{const o=v(n);return o instanceof te?o:xe(t,o)}}),Q=n=>(({renderContext:e,currentRendering:t,tickContext:o})=>t===void 0?{output:n({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:ie}:"no-update"),_e=n=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:o})=>{if(o===void 0){const r=kn(t),s={output:At(e,Ln(n(t.config),r)),renderProps:ie};return r&&(s.output.y-=((r.z??1)-1)*z.z),s}else return"no-update"}),Vd=(n,e,t)=>{const r=Be().textures[`door.frame.${n.planet}.${e}.near`]!==void 0?n.planet:"generic",s=n.color.shade==="dimmed"&&Be().textures[`door.frame.${r}.dark.${e}.${t}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${t}`};function*$d({config:{direction:n,inHiddenWall:e,height:t}},o,r,s){const i=Eo(n);if(e){if(t!==0)for(const a of[1,0])yield v({textureId:ln(r,`door.floatingThreshold.${i}`,s),...In(tt({[i]:a}),{y:-z.z*t}),spritesheetVariant:o})}else{yield v({textureId:ln(r,`door.legs.base.${i}`,s),spritesheetVariant:o});const a=ln(r,`door.legs.pillar.${i}`,s);for(let l=1;l<t;l++)yield v({textureId:a,y:-l*z.z,spritesheetVariant:o})}e||(yield v({textureId:ln(r,`door.legs.threshold.${i}`,s),...tt({...Zt,z:t}),spritesheetVariant:o}))}const ta=(n,e)=>{const t=Eo(n),o=_n(t),r=8;return n==="towards"||n==="right"?O({[o]:e[o]-r}):Zt},Hd=Q(({renderContext:{item:n,general:{pixiRenderer:e,colourised:t},room:{planet:o,color:{shade:r}}}})=>{const i=ea($d(n,t?"for-current-room":"uncolourised",o,r==="dimmed")),a=xe(e,i),l=ta(n.config.direction,n.aabb);return a.x=l.x,a.y=l.y,a}),Nd=Q(({renderContext:{item:{config:{direction:n,part:e,toRoom:t},aabb:o},room:r,general:{pixiRenderer:s,colourised:i}}})=>{const a=qa(M.getState())??M.getState().levelEditor?.campaignInProgress,l=Eo(n),c=a?.rooms[t]??r,u=new vt({paletteSwaps:K(c.color.hue,r.color.shade==="dimmed",r.planet==="moonbase"?"light-mid":"light-dark"),lutType:"sparse"}),{x:d,y:h}=ta(n,o),p=v({textureId:Vd(r,l,e),x:d,y:h,spritesheetVariant:i?"for-current-room":"uncolourised"});p.filters=u;const f=new C({children:[p]}),m=xe(s,f);return f.destroy({children:!0}),u.destroy({destroyLutTexture:!0,destroyMask:!0}),e==="top"&&(m.y=.5),m}),jd=zo.floatingText,Er=12,zr=z.z*3,Ur=[S.shadow,S.redShadow,S.midGrey,S.metallicBlue,S.midRed,S.moss,S.pink,S.lightBeige,S.pastelBlue,S.lightGrey,S.highlightBeige],Dr=[...Ur,...new Array(20).fill(S.white),...Ur.toReversed()],Xd=({renderContext:{item:{config:{textLines:n,appearanceRoomTime:e}},room:{roomTime:t},general:{displaySettings:{uncolourised:o},pixiRenderer:r},frontLayer:s},currentRendering:i})=>{const a=i?.output;let l;const u=(t-e)*jd;if(a===void 0){l=new C,s?.attach(l);for(let h=0;h<n.length;h++){const p=n[h],f=new N({pixiRenderer:r,y:h*Er,outline:!0,text:p.toUpperCase()});l.addChild(f)}}else l=a;let d=!1;for(let h=0;h<n.length;h++){const p=l.children[h],f=u+h*-Er,m=f>0&&f<zr;if(p.visible=m,d||=m,m&&!o){const x=Math.floor(f/zr*Dr.length);p.tint=Dr[x]}}return l.visible=d,l.y=-u,{output:l,renderProps:ie}},Wr=(n,e)=>e===0?n:Math.round(n/e)*e,Gr=n=>n-Math.floor(n),Yd=(n,e,t,o)=>n<=o&&t<=e;var qd=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;uniform vec4 uTintColour;vec4 transparent=vec4(0.0,0.0,0.0,0.0);vec4 black=vec4(0.0,0.0,0.0,1.0);void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float fgIsTransparent=step(fg.a,0.001f);float bgIsBlack=step(length(bg),0.001f);finalColor=mix(mix(uTintColour,black,bgIsBlack),transparent,fgIsTransparent);}`;const Zd=Z.from({vertex:Le,fragment:qd,name:"colour-clash-filter"});class Vr extends q{constructor(e){super({glProgram:Zd,resources:{uBackTexture:j.EMPTY,colourClashUniforms:{uTintColour:{value:e,type:"vec4<f32>"}}},blendRequired:!0})}}const Jd=({state:{position:n}},e,t)=>{const o=s=>s.config.direction==="away"||s.config.direction==="left";return ea(de(e.items).filter(s=>s.type==="wall"||s.type==="doorLegs").filter(o).map(s=>{const{id:i,config:{direction:a},state:{position:l}}=s;return v({textureId:"floorOverdraw.cornerNearWall",label:i,...O(Uo(l,n)),times:s.type==="wall"?Za(s.config):{[_n(Tt(a))]:2},anchor:{x:0,y:1},flipX:a==="away",spritesheetVariant:t?"for-current-room":"uncolourised"})}),new C({label:"floorOverdraws"}))},Kd=(n,e)=>{const{config:{naturalFootprint:{aabb:t,position:o}},state:{position:r}}=e,s=fn(Ae(pe,r)),{left:i,right:a}=de(n.items).filter(Ka).filter(l=>{const{state:{position:c},aabb:u}=l,d=l.config.direction,h=Tt(d),p=_n(h),f=d==="away"||d==="left",m=o[h]+(f?1:0)*t[h],x=c[h]+(f?0:1)*u[h];return m!==x?!1:Yd(c[p],c[p]+u[p],o[p],o[p]+t[p])}).reduce((l,{aabb:c,renderAabb:u,renderAabbOffset:d,state:{position:h},fixedZIndex:p})=>{const f=p===Qa,m=f?c:u??c,x=ue(h,d??pe),g=fn(ue(x,{x:m.x,y:f?m.y:0}))+s,_=fn(ue(x,{x:f?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,g),right:Math.max(l.right,_)}},{left:9999,right:-9999});if(a>i)return new he().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},$r=({direction:n,times:e,position:t,colourised:o})=>v({label:`floorEdge(${n})`,textureId:`floorEdge.${n}`,times:e,...O(t),spritesheetVariant:o?"for-current-room":"uncolourised"}),Qd=({room:n,xSize:e,ySize:t,y:o})=>{const r=new C({label:"floorColourClash"}),s=Mr(n,"right"),i=new C({label:"floorColourClash.right",filters:[new Vr(s)]});for(let c=0;c<=t;c++){const u=tt({x:0,y:c,z:0}),d=new he().rect(u.x-(c===0?0:8),u.y,24,8).fill(s);i.addChild(d)}r.addChild(i);const a=Mr(n,"towards"),l=new C({label:"floorColourClash.towards",filters:[new Vr(a)]});for(let c=0;c<=e;c++){const u=tt({x:c,y:0,z:0}),d=new he().rect(u.x-16,u.y,8*(c===0?2:3),8).fill(a);l.addChild(d)}return r.addChild(l),r.y=o,r},eh=Q(({renderContext:{room:n,item:e,general:{colourised:t,pixiRenderer:o},colourClashLayer:r,frontLayer:s}})=>{const{color:{shade:i}}=n,{config:a,state:{position:l},aabb:c}=e,{floorType:u,naturalFootprint:d}=a,h=new C({label:"floorAppearance"}),p=new C({label:"sprites"}),f=O({...c,y:0}),m=O({...c,x:0,y:0}),x=O({...c,x:0}),g=O(c),_=new Fe({color:t?bn("pureBlack"):Ja.black,width:1});if(u!=="none"){const T=new C({label:"tiles"}),y=u==="deadly"?`generic${i==="dimmed"?".dark":""}.floor.deadly`:`${a.scenery}${i==="dimmed"?".dark":""}.floor`,b=Te(t?"for-current-room":"uncolourised").textures[y];try{As(y)}catch($){throw new Error(`no floor textureId for floorType: ${u}, shade: ${i}`,{cause:$})}const w=Ae(d.position,l),k={x:Gr(w.x/z.x),y:Gr(w.y/z.x)},I=8,F={x:f.x,y:g.y-I,width:x.x-f.x,height:m.y-g.y+2*I},L=Ae(tt(In(k,{x:.5,y:.5})),{y:c.z},F),B=new lu({texture:b,tilePosition:L,...F});T.addChild(B),T.addChild(Jd(e,n,t));const D=new he().moveTo(g.x,g.y).lineTo(x.x,x.y).lineTo(x.x,x.y+3).lineTo(m.x,m.y+3).lineTo(f.x,f.y+3).lineTo(f.x,f.y).fill({color:16711680,alpha:1}),W=xe(o,D);D.destroy(),T.addChild(W),T.mask=W;const U=new C({children:[T]});U.filters=_,p.addChild(U)}{const T=new C({label:"edges"});if(u==="none"){const k=new he().moveTo(x.x,x.y+10).lineTo(x.x,x.y+100).lineTo(f.x,f.y+100).lineTo(f.x,f.y+10).lineTo(m.x,m.y+10).fill(0),I=xe(o,k);h.addChild(I),s.attach(I),k.destroy()}const y=Math.ceil(c.y/z.x);T.addChild($r({direction:"right",times:{y},position:{z:c.z},colourised:t}));const b=Math.ceil(c.x/z.x);T.addChild($r({direction:"towards",times:{x:b},position:{z:c.z},colourised:t})),p.addChild(T);const w=Kd(n,e);if(w!==void 0){const k=xe(o,w);p.addChild(k),p.mask=k,w.destroy()}if(h.addChild(xe(o,p)),p.destroy({children:!0}),_.destroy(!1),!t){const k=Qd({xSize:b,ySize:y,y:-c.z+1,room:n});h.addChild(k),r.attach(k)}}return h}),th=n=>{const e=new C({label:"joystick"});return e.addChild(v({textureId:"joystick.stick",spritesheetVariant:n})),e.addChild(v({textureId:"joystick.ball",spritesheetVariant:n})),e},nh=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,Zt]]),oh=({renderContext:{item:{state:{actedOnAt:n,lastPushDirection:e}},room:{roomTime:t},general:{colourised:o}},currentRendering:r})=>{const s=r?.renderProps,i=t===n.roomTime?e:void 0,a=s?.pushDirection;if(!(s===void 0||i!==a))return"no-update";const c=r?.output??th(o?"for-current-room":"uncolourised"),u=c.getChildAt(1),d=nh.get(i);return u.x=d?.x??0,u.y=d?.y??0,{output:c,renderProps:{pushDirection:i}}},rh=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle","homingBot"],Hr=(n,e,t,o)=>{const r=Ms(o);return Math.sin((n+r*2e4)/e)*t},sh=50,ih=200,ah=.25,lh=1,Ge=({id:n,config:{which:e},state:t},o,r)=>{const s=e==="emperorsGuardian"||e==="helicopterBug",i=e==="cyberman"||e==="bubbleRobot"||e==="computerBot"||e==="emperorsGuardian";if((i||e==="helicopterBug")&&t.activated||s){const l=e==="computerBot"||e==="helicopterBug",c=l?sh:ih,u=l?ah:lh;if(i){const d=r;d[Fn].y=-z.z+Hr(o.roomTime,c,u,n)}else r.y=Hr(o.roomTime,c,u,n)}return r},ch=({renderContext:{item:n,room:e,general:{paused:t,colourised:o}},currentRendering:r})=>{const{config:s,state:i,id:a}=n,l=r?.renderProps,{activated:c,busyLickingDoughnutsOffFace:u}=i,d=o?u?"doughnutted":!c&&rh.includes(s.which)?"deactivated":"for-current-room":"uncolourised";switch(s.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const h=Tn(i.facing)??"towards";if(!(l===void 0||c!==l.activated||u!==l.busyLickingDoughnutsOffFace||h!==l.facingXy4))return Ge(n,e,r.output),"no-update";const f={facingXy4:h,activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"skiHead":return{output:v({textureId:`${s.which}.${s.style}.${h}`,spritesheetVariant:d}),renderProps:f};case"elephantHead":return{output:v({textureId:`elephant.${h}`,spritesheetVariant:d}),renderProps:f};case"turtle":return{output:v(c&&!u?{animationId:`${s.which}.${h}`,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.${h}.1`,spritesheetVariant:d}),renderProps:f};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ge(n,e,xt({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"bubbles.jetpack",paused:t,spritesheetVariant:d}})):v({textureId:`${s.which}.${h}`,spritesheetVariant:d}),renderProps:f};case"computerBot":case"elephant":case"monkey":return{output:Ge(n,e,xt({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"headlessBase.flash",playOnce:"and-stop",spritesheetVariant:d}})),renderProps:f};default:throw new Error(`unexpected monster ${s}`)}break}case"homingBot":{const h=!el(i.vels.walking,Zt);return l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated||h!==l.walking?{spritesheetVariant:d,output:v(c&&!u?{animationId:h?"headlessBase.flash":"headlessBase.scan",spritesheetVariant:d}:{textureId:"headlessBase",spritesheetVariant:d}),renderProps:{activated:c,busyLickingDoughnutsOffFace:u,walking:h}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated))return Ge(n,e,r.output),"no-update";const p={activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"helicopterBug":case"dalek":return{output:Ge(n,e,v(c&&!u?{animationId:s.which==="dalek"&&e.color.shade==="dimmed"&&(e.planet==="blacktooth"||e.planet==="egyptus"||e.planet==="moonbase")?"dalek.dark":s.which,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.1`,spritesheetVariant:d})),renderProps:p};case"bubbleRobot":return{output:Ge(n,e,xt({top:{animationId:"bubbles.blueGreen",randomiseStartFrame:a,paused:t,spritesheetVariant:d},bottom:{textureId:"headlessBase",spritesheetVariant:d}})),renderProps:p};case"emperorsGuardian":return{output:Ge(n,e,xt({top:{textureId:"ball.blueGreen",spritesheetVariant:d},bottom:{animationId:"bubbles.cold",spritesheetVariant:d,paused:t}})),renderProps:p};case"emperor":return{output:v({animationId:"bubbles.cold",spritesheetVariant:d,paused:t}),renderProps:p};default:throw new Error(`unexpected monster ${s}`)}break}default:throw new Error(`unexpected monster ${s}`)}};var uh=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const dh=Z.from({vertex:Le,fragment:uh,name:"oneColour-filter"});class wo extends q{constructor(e){super({glProgram:dh,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[o,r,s]=e.toArray();t.uColour[0]=o,t.uColour[1]=r,t.uColour[2]=s}}const So=.02,hh=({name:n,action:e,facingXy8:t,teleportingPhase:o,gravityZ:r,paused:s,spritesheetVariant:i,isStoodOn:a})=>{if(e==="death")return{animationId:`${n}.fadeOut`,paused:s,spritesheetVariant:i};if(o==="out")return{animationId:`${n}.fadeOut`,paused:s,spritesheetVariant:i};if(o==="in")return{animationId:`${n}.fadeOut`,paused:s,spritesheetVariant:i};if(e==="moving")return{animationId:`${n}.walking.${t}`,paused:s,spritesheetVariant:i};if(e==="jumping")return{textureId:r<So?`${n}.walking.${t}.2`:`${n}.walking.${t}.1`,spritesheetVariant:i};if(e==="falling"){const c=`${n}.falling.${t}`;if(jt(c))return{textureId:c,spritesheetVariant:i}}if(n==="head"&&a){const c=`${n}.blinking.${t}`;if(jt(c))return{textureId:c,spritesheetVariant:i}}const l=`${n}.idle.${t}`;return Do(l)?{animationId:l,paused:s,spritesheetVariant:i}:{textureId:`${n}.walking.${t}.2`,spritesheetVariant:i}},Co=Symbol(),na=Symbol(),ph=(n,e)=>{n[Co].removeChildren(),n[Co].addChild(v(hh(e)))},jn=(n,e,t,o,r)=>{const s=new C,i=new C;s[Co]=i,s.addChild(i);const a=v({animationId:e?`shine.${n}InSymbio`:`shine.${n}`,paused:t,flipX:n==="heels",spritesheetVariant:o?"for-current-room":"uncolourised"});s.addChild(a),s[na]=a,s.filters=[new Fe({color:r?se(r):bn(fo[n])}),new Fe({color:r?se(r):bn("midRed")}),new wo(r?se(r):bn(fo[n]))];for(const l of s.filters)l.enabled=!1;return s},Nr=({gameTime:n,switchedToAt:e},t,o)=>(t==="headOverHeels"||t===o)&&e+ol>n,fh=n=>{if(!rl(n))return!1;const{gameTime:e,lastDiedAt:t}=n.type==="headOverHeels"?n.state.head:n.state;return(e-t)%lr<lr*sl},mh=({highlighted:n,flashing:e,shining:t},o)=>{const[r,s,i]=o.filters;r.enabled=n,s.enabled=!n&&t,i.enabled=e},gh=(n,e)=>{n[na].visible=e},Xn=(n,e,t,o,r,s)=>{t&&ph(e,{name:n,...o,paused:r,spritesheetVariant:s}),mh(o,e),gh(e,o.shining)},xh=({renderContext:{item:n,general:{gameState:e,paused:t,colourised:o},room:r},currentRendering:s})=>{const{type:i,state:{action:a,facing:l,visualFacingVector:c,teleporting:u,vels:{gravity:{z:d}}}}=n,h=s?.renderProps,p=s?.output,f=Rn(c??l)??"towards",m=e!==void 0&&(n.type==="headOverHeels"?Nr(n.state.head,"headOverHeels","headOverHeels"):Nr(n.state,n.type,e.currentCharacterName)),x=fh(n),g=Ls(n),_=Sn(l),T=u?.phase??null,y=i!=="heels"&&(!tl(n.state.stoodOnBy)||n.state.stoodOnUntilRoomTime+300>r.roomTime),b={action:a,facingXy8:f,teleportingPhase:T,flashing:x,highlighted:m,shining:g,gravityZ:d,isStoodOn:y},w=h===void 0||h.action!==a||h.facingXy8!==f||h.teleportingPhase!==T||h?.gravityZ>So!=d>So||h.isStoodOn!==y;let k;const I=o?"for-current-room":"uncolourised",F=o?void 0:r.color;if(i==="headOverHeels"){k=p??Ad({top:jn("head",!0,t,o,F),bottom:jn("heels",!0,t,o,F)});const L=k;Xn("head",L[Fn],w,b,t,I),Xn("heels",L[nr],w,b,t,I)}else k=p??jn(i,!1,t,o,F),Xn(i,k,w,b,t,I);return a==="moving"&&p instanceof be&&(p.animationSpeed=_*nl),{output:k,renderProps:b}},Yn=en(xh),qn=(n,e,t,o,r)=>{const s=`${n}.idle.${e}`,i=r?"sceneryPlayer":"uncolourised";return Do(s)?{animationId:s,randomiseStartFrame:t,paused:o,spritesheetVariant:i}:{textureId:`${n}.walking.${e}.2`,spritesheetVariant:i}},bh=({renderContext:{item:{id:n,config:{which:e,startDirection:t}},general:{paused:o,colourised:r}},currentRendering:s})=>s?.renderProps===void 0?{output:e==="headOverHeels"?xt({top:qn("head",t,n,o,r),bottom:qn("heels",t,n,o,r)}):v(qn(e,t,n,o,r)),renderProps:ie}:"no-update",yh=({renderContext:{item:{state:{vels:{sliding:n}},config:{startingPhase:e}},general:{paused:t,colourised:o}},tickContext:{deltaMS:r},currentRendering:s})=>{const a=(s?.renderProps?.distanceTravelled??0)+Wo(n)*(t?0:r),l=s?.output,c=o?"for-current-room":"uncolourised",u=l??v({textureId:"spikyBall.1",spritesheetVariant:c}),h=(Math.floor(a*2/mn.w)+e)%2+1;return u.texture=Te(c).textures[`spikyBall.${h}`],{output:u,renderProps:{distanceTravelled:a}}},vh=en(yh),oa=n=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:o,colourised:r}},tickContext:{lastRenderRoomTime:s},currentRendering:i})=>{const a=i?.renderProps,l=Qt(e);let c;return i?.output?c=i?.output:(c=v({animationId:n?"shadowMask.spring.bounce":"spring.bounce",paused:o,spritesheetVariant:r?"for-current-room":"uncolourised"}),c.loop=!1,c.gotoAndStop(0)),s!==void 0&&t>s&&!l&&!o?c.gotoAndPlay(0):l!==(a?.compressed??!1)&&(l?c.gotoAndStop(1):c.gotoAndStop(0)),{output:c,renderProps:{compressed:l}}},wh=en(oa(!1)),Sh=en(oa(!0)),Ch=n=>{const{gameMenus:e}=M.getState();try{return Ws(e,n.path)?"right":"left"}catch(t){throw new Error(`Error getting switch setting from store for switch with path "${n.path}"

while store has: ${JSON.stringify(e,null,2)}`,{cause:t})}},Th=({renderContext:{item:{state:{setting:n},config:e},general:{colourised:t}},currentRendering:o})=>{const r=o?.renderProps,s=e.type==="in-store"?Ch(e):n;return r===void 0||s!==r.setting?{output:v({textureId:`switch.${s}`,spritesheetVariant:t?"for-current-room":"uncolourised"}),renderProps:{setting:s}}:"no-update"},kh=({renderContext:{item:n,room:e,general:{paused:t,colourised:o}},currentRendering:r})=>{const{state:{stoodOnBy:s},config:{times:i}}=n,a=r?.renderProps,l=Pn(n),c=l&&rt(s,e).some(ke);if(!(a===void 0||l!==a.activated||c!==a.flashing))return"no-update";const d=o?"for-current-room":"uncolourised";return{output:v(c?{animationId:"teleporter.flashing",times:i,paused:t,spritesheetVariant:d}:{textureId:l?"teleporter":"block.artificial",times:i,spritesheetVariant:d}),renderProps:{flashing:c,activated:l}}},Ih=({state:{stoodOnBy:n,position:e},config:{times:t}},o)=>{const r=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return rt(n,o).filter(Gs).forEach(({id:s,state:{position:i}})=>{const a=Ae(i,e),l={x:Math.floor(a.x/z.x),y:Math.floor(a.y/z.y)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(r[l.x][l.y]=s)}),r},_h=(n,e)=>{let t=0,o=1;for(const r of e)for(const s of r)s!==void 0&&n.items[s]?.state.activated&&(t|=o),o<<=1;return t},Rh=({renderContext:{item:n,room:e,general:{pixiRenderer:t,colourised:o}},currentRendering:r})=>{const{config:{times:s}}=n,i=r===void 0?Ih(n,e):r.renderProps.chargePositions,a=_h(e,i);if(!(a!==r?.renderProps.cybermanActivationBitmask))return"no-update";const c=v({subSpriteVariations(d,h){const p=i[d][h];return p===void 0?{animationId:"toaster.off"}:e.items[p]?.state.everActivated?{animationId:"toaster.off"}:{textureId:"toaster.on"}},times:s??ie,spritesheetVariant:o?"for-current-room":"uncolourised"});return{output:Qo(t,c,"toaster.off"),renderProps:{chargePositions:i,cybermanActivationBitmask:a}}},Ph=(n,e,t,o)=>`${n}${o?".dark":""}.wall.${e}.${t}`,Zn={aabb:{x:1,y:1,z:Vs},id:"farWallAppearanceSampleBuffer",state:{position:{x:0,y:0,z:0}}},Mh=Q(({renderContext:{general:{pixiRenderer:n,colourised:e},item:t,room:o}})=>{const{id:r,config:s}=t;if(s.direction==="right"||s.direction==="towards")throw new Error(`wall is near: ${r}`);const{direction:i,tiles:a}=s,l=_n(Tt(i)),c=new C({label:"wallTiles"}),u=new C({label:"wallAnimations"});for(let h=0;h<s.tiles.length;h++){const p=tt({[l]:h}),f=i==="away"?{x:mn.w,y:mn.h}:{x:0,y:mn.h},m=v({textureId:Ph(o.planet,a[h],i,o.color.shade==="dimmed"),...p,pivot:f,spritesheetVariant:e?"for-current-room":"uncolourised"});if(c.addChild(m),o.planet==="moonbase"){const x=`moonbase.wall.screen.${a[h]}.away`;if(Do(x)&&u.addChild(v({animationId:x,randomiseStartFrame:`${r}${h}`,flipX:i==="left",x:p.x+(i==="away"?-8:8),y:p.y-23,spritesheetVariant:e?"for-current-room":"uncolourised"})),h===s.tiles.length-1&&s.tiles.at(-1)!=="coil"){const g=o[qt];if(Zn.state.position.x=t.state.position.x+t.aabb.x,Zn.state.position.y=t.state.position.y+t.aabb.y,!No(Bo(Zn,g,il))){const T=o.color.shade==="dimmed"?".dark":"";c.addChild(v({textureId:`moonbase.wallDoorTransition.${i}${T}`,...p,pivot:f,spritesheetVariant:e?"for-current-room":"uncolourised"}));const y=v({textureId:`moonbase.wallDoorTransition.${i}.mask`,...p,pivot:f,spritesheetVariant:"original"});c.addChild(y),m.setMask({mask:y,inverse:!0})}}}}const d=new C({label:"wallAppearance"});return d.addChild(xe(n,c)),c.destroy({children:!0}),u.children.length>0&&d.addChild(u),d}),Bh={head:Yn,heels:Yn,headOverHeels:Yn,doorFrame:Nd,doorLegs:Hd,monster:ch,floatingText:Xd,barrier:Q(({renderContext:{item:{config:{axis:n,times:e,disappearing:t}},general:{colourised:o,pixiRenderer:r}}})=>At(r,v({textureId:`barrier.${n}${t?".disappearing":""}`,times:e,spritesheetVariant:o?"for-current-room":"uncolourised"}))),deadlyBlock:Q(({renderContext:{item:{config:n,id:e},general:{paused:t,colourised:o,pixiRenderer:r}}})=>{switch(n.style){case"volcano":{const s=v({animationId:"volcano",times:n.times,randomiseStartFrame:e,paused:t,spritesheetVariant:o?"for-current-room":"uncolourised"});return Qo(r,s,"volcano")}case"toaster":throw new Error("use the special toaster appearance instead");default:throw n.style,new Error("unknown deadly block style")}}),spikes:lt("spikes"),slidingDeadly:vh,slidingBlock:Q(({renderContext:{item:{config:{style:n}},general:{colourised:e}}})=>{const t=e?"for-current-room":"uncolourised";return v(n==="book"?{textureId:"book.y",spritesheetVariant:t}:{textureId:n,spritesheetVariant:t})}),block:Md,switch:Th,button:Bd,conveyor:Wd,lift:Q(({renderContext:{general:{paused:n,colourised:e}}})=>{const t=new C,o=e?"for-current-room":"uncolourised",r={x:ft.w/2,y:ft.h};return t.addChild(v({animationId:"lift",pivot:r,paused:n,spritesheetVariant:o})),t.addChild(v({textureId:"lift.static",pivot:r,spritesheetVariant:o})),t}),teleporter:kh,sceneryCrown:Q(({renderContext:{item:{config:{planet:n}},general:{colourised:e}}})=>v({textureId:`crown.${n}`,spritesheetVariant:e?"for-current-room":"uncolourised"})),pickup:Q(({renderContext:{item:{config:n},general:{paused:e,colourised:t}}})=>{const o=t?"for-current-room":"uncolourised";if(n.gives==="crown")return v({textureId:`crown.${n.planet}`,spritesheetVariant:o});const s={shield:{textureId:"whiteRabbit",spritesheetVariant:o},jumps:{textureId:"whiteRabbit",spritesheetVariant:o},fast:{textureId:"whiteRabbit",spritesheetVariant:o},"extra-life":{textureId:"whiteRabbit",spritesheetVariant:o},bag:{textureId:"bag",spritesheetVariant:o},doughnuts:{textureId:"doughnuts",spritesheetVariant:o},hooter:{textureId:"hooter",spritesheetVariant:o},scroll:{textureId:"scroll",spritesheetVariant:o},reincarnation:{animationId:"fish",paused:e,spritesheetVariant:o}}[n.gives];return v(s)}),moveableDeadly:lt("fish.1"),charles:Od,joystick:oh,movingPlatform:lt("sandwich"),pushableBlock:lt("stepStool"),portableBlock:Q(({renderContext:{item:{config:{style:n}},general:{colourised:e}}})=>v({textureId:n,spritesheetVariant:e?"for-current-room":"uncolourised"})),spring:wh,sceneryPlayer:bh,hushPuppy:lt("hushPuppy"),bubbles:Q(({renderContext:{item:{id:n,config:{style:e}},general:{paused:t,colourised:o}}})=>v({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:n,spritesheetVariant:o?"for-current-room":"uncolourised"})),firedDoughnut:Gd({animationId:"bubbles.doughnut"}),ball:lt("ball"),floor:eh,particle:Q(({renderContext:{item:{config:{forCharacter:n}},general:{paused:e,colourised:t}}})=>v({animationId:`particle.${n==="head"?"head":"heels"}.fade`,anchor:{x:.5,y:.5},paused:e,spritesheetVariant:t?"for-current-room":"uncolourised"}))},ra=n=>{if(n.type==="wall"){const{direction:e}=n.config;return e==="right"||e==="towards"?void 0:Mh}return n.type==="deadlyBlock"&&n.config.style==="toaster"?Rh:Bh[n.type]},sa=(n,e,t)=>{const r=ra(n)({renderContext:{general:e.general,item:n,room:t,colourClashLayer:void 0,frontLayer:void 0,zEdges:al,getItemRenderPipeline(){throw new Error("getOtherItemContainer not supported in carried sprite")}},tickContext:{lastRenderRoomTime:Ct,movedItems:kt,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Ah=()=>{const n=v({label:"carriedItem"}),e=v({label:"bag",textureId:"bag",y:-2,spritesheetVariant:"original"});return new C({label:"carryButtonSurface",children:[n,e]})},Oh=({renderContext:n,currentRendering:e,tickContext:t})=>{const{button:o,inputStateTracker:r,general:{colourised:s,pixiRenderer:i}}=n,{currentPlayable:a,room:l}=t,c=e?.renderProps,u=e?.output,d=a&&Cn(a),h=d?.hasBag??!1,p=d?.carrying??null,f=p===null&&l!==void 0&&Qi(a,l)!==void 0,m=On(o.actions,r),x=h&&!f&&p===null,g=u??new An(s,o.which,i,Ah()),_=l!==c?.renderedInRoom;_&&g.generateButtonSpriteTextures(l),g.visible=h;const[T,y]=g.shownOnSurface.children;if(x!==c?.disabled||s!==c?.colourised||_){const b=Te(s?x?"deactivated":"for-current-room":"uncolourised");y.texture=b.textures.bag}return c?.pressed!==m&&(g.pressed=m),p!==c?.carrying&&(y.visible=p===null,T.visible=p!==null),(p!==c?.carrying||_)&&(T.removeChildren(),p!==null&&l!==void 0&&T.addChild(sa(p,n,t.room))),{output:g,renderProps:{pressed:m,hasBag:h,colourised:s,carrying:p,disabled:x,renderedInRoom:l}}},Fh=n=>{const e=v({textureId:"hooter",y:-3,spritesheetVariant:"original"}),t=v({textureId:"doughnuts",y:-2,spritesheetVariant:"original"}),o=new N({pixiRenderer:n,outline:!0,y:tr});return new C({label:"fireButtonSurface",children:[e,t,o]})},Lh=({renderContext:{button:n,inputStateTracker:e,general:{colourised:t,pixiRenderer:o}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=s&&ll(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=On(n.actions,e),d=c===0,h=l?"hooter":It(c)>0?"doughnuts":"none",p=r?.renderProps,f=i!==p?.renderedInRoom,m=u!==p?.pressed,x=d!==p?.disabled,g=h!==p?.showingSprite;if(p!==void 0&&t===p.colourised&&g&&!x&&!m&&!f)return"no-update";const _=r?.output??new An(t,n.which,o,Fh(o));f&&_.generateButtonSpriteTextures(i),_.visible=h!=="none",m&&(_.pressed=u);const[T,y,b]=_.shownOnSurface.children;if(g&&(T.visible=h==="hooter",y.visible=h==="doughnuts"),x||f){const w=Te(t?d?"deactivated":"for-current-room":"uncolourised");T.texture=w.textures.hooter,y.texture=w.textures.doughnuts,b.tint=Ho(t,i.color.shade==="dimmed")}return c!==p?.doughnutsCount&&(b.text=It(c)),{output:_,renderProps:{pressed:u,colourised:t,showingSprite:h,renderedInRoom:i,disabled:d,doughnutsCount:c}}},Eh=new re(16777215),bt=(n,e=!0)=>n?e?"for-current-room":"deactivated":"uncolourised",Lt=(n,e,t)=>n?Eh:se(Jt(e).hud[t?"brightHue":"dimmedHue"]),Ke=(n,e,t)=>{const o=Jt(e);return n?oi(o.hud[t?"brightHue":"dimmedHue"],!1,e.shade==="dimmed"):se(o.hud[t?"brightHue":"dimmedHue"])},jr=(n,e)=>{const t=Jt(e);return n?oi(t.hud.icons,!1,e.shade==="dimmed"):se(t.hud.icons)},zh=(n,e)=>{const t=v({animationId:"teleporter.flashing",y:5,spritesheetVariant:bt(n)}),o=new N({pixiRenderer:e,text:"JUMP",y:tr});return new C({label:"jumpButtonSurface",children:[o,t]})},Uh=({renderContext:{button:n,inputStateTracker:e,general:{colourised:t,pixiRenderer:o,paused:r}},tickContext:{room:s,currentPlayable:i},currentRendering:a})=>{const l=a?.renderProps,c=a?.output,u=i?.state.standingOnItemId??null,d=u===null||s===void 0?null:s.items[u],h=d===null?!1:d.type==="teleporter"&&Pn(d),p=On(n.actions,e),f=c??new An(t,n.which,o,zh(t,o)),m=l?.pressed!==p;m&&(f.pressed=p);const x=s!==l?.renderedInRoom,g=h!==l?.isStandingOnActiveTeleporter,_=r!==l?.paused,[T,y]=f.shownOnSurface.children;if(_&&(r?y.gotoAndStop(0):y.gotoAndPlay(0)),!g&&!x&&!m)return"no-update";if(g&&(y.visible=h,T.visible=!h),x){const b=Te(bt(t));y.textures=Ko(b.animations["teleporter.flashing"]),r||y.gotoAndPlay(0),T.tint=Ho(t,s?.color.shade==="dimmed"),f.generateButtonSpriteTextures(s)}return{output:f,renderProps:{pressed:p,isStandingOnActiveTeleporter:h,colourised:t,renderedInRoom:s,paused:r}}},Dh=({currentRendering:n,tickContext:e,renderContext:t})=>n!==void 0?(n.output.tint=Ke(t.general.colourised,e.room.color,!1),"no-update"):{output:new N({pixiRenderer:t.general.pixiRenderer,label:"mapText",outline:!0,text:"MAP"}),renderProps:ie},Wh=({currentRendering:n,tickContext:e,renderContext:t})=>n!==void 0?(n.output.tint=Ke(t.general.colourised,e.room.color,!1),"no-update"):{output:new N({pixiRenderer:t.general.pixiRenderer,label:"menuText",outline:!0,doubleHeight:!0,doubleWidth:!0,text:"☰"}),renderProps:ie},Gh=6e-4,Vh=1e-4,cn=.3,$h=40;class Hh{#e={x:0,y:0};#t=0;#o=!1;startDrag(){this.#o=!0,this.#e={x:0,y:0},this.#t=performance.now()}stopDrag(){this.#o=!1}updateVelocity(e){const t=performance.now(),o=t-this.#t;if(o>0){const r=e.x/o,s=e.y/o;this.#e.x=this.#e.x*(1-cn)+r*cn,this.#e.y=this.#e.y*(1-cn)+s*cn}this.#t=t}checkStationaryDrag(){this.#o&&performance.now()-this.#t>$h&&(this.#e={x:0,y:0})}applyInertia(e){const t={x:0,y:0};if(!this.#o){const o=Math.sqrt(this.#e.x*this.#e.x+this.#e.y*this.#e.y);if(o>Vh){t.x=this.#e.x*e,t.y=this.#e.y*e;const r=Gh*e,s=Math.max(0,o-r);if(s>0){const i=s/o;this.#e.x*=i,this.#e.y*=i}else this.#e.x=0,this.#e.y=0}else this.#e.x=0,this.#e.y=0}return t}reset(){this.#e={x:0,y:0},this.#o=!1,this.#t=0}get isDragging(){return this.#o}}const To=(n,e,t)=>(e?(t.x=n.y,t.y=n.x):(t.x=n.x,t.y=n.y),t),Nh={x:-1,y:-1};class jh{constructor(e){this.renderContext=e;const{x:t,y:o}=e.general.upscale.gameEngineScreenSize;this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer),this.output.rect(0,0,t,o).fill("#00000000")}output=new he({label:"OnScreenLook",eventMode:"static"});#e;#t={x:-1,y:-1};#o;#n=new Hh;handleTouchStart=e=>{if(this.#e!==void 0&&this.stopCurrentPointer(),this.#o.curPointerId===e.pointerId)return;const t=this.renderContext.general.upscale.rotate90;this.#e=e.pointerId,To(e,t,this.#t),this.#n.startDrag(),this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation)};stopCurrentPointer=()=>{this.#e=void 0,this.#n.stopDrag(),this.renderContext.inputStateTracker.hudInputState.directionVector=pe,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#e)return;const t=this.renderContext.general.upscale.rotate90,o=this.#t,r=$s(M.getState()),{x:s,y:i}=To(e,t,Nh),a=(o.x-s)/r;let l=(o.y-i)/r;t&&(l=-l),this.#n.updateVelocity({x:a,y:l});const{inputStateTracker:{hudInputState:c}}=this.renderContext;c.lookVector.x+=a,c.lookVector.y+=l,o.x=s,o.y=i};tick(e){if(M.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer(),this.#n.reset();return}const{deltaMS:o}=e,{inputStateTracker:{hudInputState:r}}=this.renderContext;this.#n.checkStationaryDrag();const s=this.#n.applyInertia(o);r.lookVector.x+=s.x,r.lookVector.y+=s.y}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}get curPointerId(){return this.#e}set joystickRenderer(e){this.#o=e}}const ce=14,Xh=2,Yh={x:-1,y:-1},qh=Math.cos(30*(Math.PI/180)),Zh=55,Jh="#00000000";class Kh{constructor(e){this.renderContext=e;const{inputDirectionMode:t,general:{colourised:o,pixiRenderer:r}}=e;this.#t=v({textureId:"joystick.whole",anchor:{x:.5,y:.5},y:1,spritesheetVariant:o?"for-current-room":"uncolourised"}),this.#e={away:new N({pixiRenderer:r,outline:!0,x:ce,y:-ce,text:"↗"}),right:new N({pixiRenderer:r,outline:!0,x:ce,y:ce,text:"↘"}),towards:new N({pixiRenderer:r,outline:!0,x:-ce,y:ce,text:"↙"}),left:new N({pixiRenderer:r,outline:!0,x:-ce,y:-ce,text:"↖"}),...t!=="4-way"?{awayRight:new N({pixiRenderer:r,outline:!0,x:ce*Math.SQRT2,text:"➡"}),towardsRight:new N({pixiRenderer:r,outline:!0,y:ce*Math.SQRT2,text:"⬇"}),towardsLeft:new N({pixiRenderer:r,outline:!0,x:-ce*Math.SQRT2,text:"⬅"}),awayLeft:new N({pixiRenderer:r,outline:!0,y:-ce*Math.SQRT2,text:"⬆"})}:{}},this.output.addChild(this.#t),this.output.addChild(new he().circle(0,0,Zh).fill(Jh)),this.output.addChild(new C({children:Object.values(this.#e),y:cl/2})),this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer)}output=new C({label:"OnScreenJoystick",eventMode:"static"});#e;#t;#o;#n;#r;handleTouchStart=e=>{this.#o!==void 0&&this.stopCurrentPointer(),this.#n.curPointerId!==e.pointerId&&(this.#o=e.pointerId,this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#o=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=pe,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#o)return;const{rotate90:t,gameEngineScreenSize:{y:o}}=this.renderContext.general.upscale,r=$s(M.getState()),{x:s,y:i}=this.output,a=s,l=t?o-i:i,{x:c,y:u}=To(e,t,Yh),d=c/r,h=u/r,{width:p,height:f}=this.output.getLocalBounds(),m=(d-a)/(p/2),x=(h-l)/(f/2)*(t?-1:1),g=ul({x:-m,y:-x});this.renderContext.inputStateTracker.hudInputState.directionVector=Oe(dl(g,qh),Xh)};tick({room:e}){const{renderContext:{general:{colourised:t},inputStateTracker:{directionVector:o}}}=this;if(this.#r!==e&&(this.#t.texture=Dt(t?"for-current-room":"uncolourised","joystick.whole"),this.#r=e),M.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const s=Sn(o)>hl?Rn(o):void 0,i=Ke(t,e.color,!0),a=Ke(t,e.color,!1);for(const[l,c]of pl(this.#e))c.tint=l===s?i:a}get curPointerId(){return this.#o}set lookRenderer(e){this.#n=e}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}}const Xr=30,Yr=15,Qh=42,ep=36,tp=44,np=20;class op{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:t}},inputDirectionMode:o,general:r}=e;this.#t={mainButtonNest:new C({label:"mainButtonNest"}),buttons:{jump:new at({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:t},Uh),fire:new at({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:t},Lh),carry:new at({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:t},Oh),carryAndJump:new at({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:t},kd),menu:new at({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:t},Wh),map:new at({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:t},Dh)},joystick:new Kh({inputStateTracker:t,inputDirectionMode:o,general:r}),look:new jh({inputStateTracker:t,general:r})},this.#t.look.joystickRenderer=this.#t.joystick,this.#t.joystick.lookRenderer=this.#t.look,this.#o(),this.#n()}#e=new C({label:"OnScreenControls"});#t;#o(){const{buttons:e}=this.#t,{mainButtonNest:t,joystick:o,look:r}=this.#t;this.#e.addChild(r.output);for(const{renderContext:{button:{which:s}},output:i}of Je(e))s==="menu"||s==="map"?this.#e.addChild(i):t.addChild(i);e.jump.output.y=Yr,e.carry.output.x=-Xr,e.carryAndJump.output.y=-Yr,e.fire.output.x=Xr,e.menu.output.x=24,e.menu.output.y=24,e.map.output.y=16,this.#e.addChild(t),this.#e.addChild(o.output)}#n(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const t of Je(this.#t.buttons)){const{renderContext:{button:{actions:o}}}=t;t.output.eventMode="static",t.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),t.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),t.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#r(e){this.#t.mainButtonNest.x=e.x-tp,this.#t.mainButtonNest.y=e.y-np,this.#t.joystick.output.x=Qh,this.#t.joystick.output.y=e.y-ep,this.#t.buttons.map.output.x=e.x-24}tick(e){const{screenSize:t}=e,{general:{gameState:o}}=this.renderContext;this.#r(t);for(const r of Je(this.#t.buttons))r.tick({...e,currentPlayable:Mt(o)});this.#t.joystick.tick(e),this.#t.look.tick(e)}get output(){return this.#e}destroy(){this.#t.joystick.destroy(),this.#t.look.destroy(),this.#e.destroy({children:!0})}}Qe.frames.button.frame;const rp=n=>n.room!==void 0,sp=(n,e)=>n?e/2-24:24,ip=(n,e)=>n?e/2-24:56,ap=(n,e)=>n?Math.round(e.x/2)-80:80,lp=(n,e)=>n?Math.round(e.x/2)-104:80,cp=n=>n?0:24,up=n=>0,qr=112,ct=n=>n==="heels"?1:-1,Zr="head.walking.right.2",Jr="heels.standing.towards";class dp{constructor(e){this.renderContext=e;const{general:t}=e;this.#n={head:{sprite:this.#c("head"),livesText:new N({pixiRenderer:t.pixiRenderer,label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#a({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#a({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#c("heels"),livesText:new N({pixiRenderer:t.pixiRenderer,label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#a({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new C({label:"heelsCarrying"})}}};for(const r of nn)this.#e.addChild(this.#n[r].shield.container),this.#e.addChild(this.#n[r].extraSkill.container);t.onScreenControls||(this.#e.addChild(this.#n.head.doughnuts.container),this.#e.addChild(this.#n.head.hooter.container),this.#e.addChild(this.#n.heels.bag.container),this.#e.addChild(this.#n.heels.carrying.container)),this.#l(),t.onScreenControls&&(this.#t=new op({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#t.output));for(const r of nn)this.#e.addChild(this.#n[r].livesText),this.#e.addChild(this.#n[r].sprite);this.#r=Os({predicate(r,s,i){return je(s)!==je(i)},effect:(r,{getState:s})=>{je(s())?(this.#o=new Or(e),this.#i()):(this.#o?.destroy(),this.#o=void 0)}});const o=je(M.getState());this.#o=o?new Or(e):void 0,this.#o&&this.#i()}#e=new C({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#o;#n;#r;#s=void 0;#i(){this.#e.addChild(this.#o.output)}#l(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const t of nn){const{sprite:o,livesText:r}=this.#n[t];for(const s of[o,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${t}`]=!0}),s.on("pointerup",()=>{e[`swop.${t}`]=!1}),s.on("pointerleave",()=>{e[`swop.${t}`]=!1})}}#a({textureId:e,textOnTop:t=!1,noText:o=!1,outline:r=!1,label:s}){const i=new C({label:s});i.pivot={x:4,y:16};const a=new te({texture:Be().textures[e],anchor:t?{x:.5,y:0}:{x:.5,y:1},y:t?0:8});i.addChild(a);const l=Ne.w/2,c=new N({pixiRenderer:this.renderContext.general.pixiRenderer,outline:r==="text-only",y:t?0:16,x:l});return o&&(c.visible=!1),a.x=l,i.addChild(c),r===!0&&(i.filters=Kt.pureBlack),{textContainer:c,icon:a,container:i}}#c(e){const t=new te(Be().textures[e==="head"?Zr:Jr]);return t.anchor={x:.5,y:0},t}#u({screenSize:e}){this.#n.head.hooter.container.x=this.#n.head.doughnuts.container.x=(e.x>>1)+ct("head")*qr,this.#n.head.doughnuts.container.y=e.y-ft.h-8,this.#n.heels.carrying.container.y=e.y-ft.h,this.#n.heels.carrying.container.x=this.#n.heels.bag.container.x=(e.x>>1)+ct("heels")*qr,this.#n.heels.bag.container.y=this.#n.head.hooter.container.y=e.y-8,this.#o&&(this.#o.output.x=e.x/2-Ne.w*1.5)}#d({room:e}){const{renderContext:{general:{gameState:t,colourised:o}}}=this,r=on(t,"heels"),s=r?.carrying??null,{container:i}=this.#n.heels.carrying,a=i.children.length>0;if(s===null&&a){for(const u of i.children)u.destroy();this.#s=void 0}if(s!==null&&(!a||e!==this.#s)){const u=sa(s,this.renderContext,e);this.#s=e,i.removeChildren(),i.addChild(u),i.tint=Lt(o,e.color,!0)}const l=this.#n.heels.bag.icon,c=r?.hasBag;l.texture=Dt(bt(o,c??!1),"bag"),l.tint=Lt(o,e.color,c??!1)}#h({room:e}){const{renderContext:{general:{gameState:t,colourised:o}}}=this,r=on(t,"head"),s=r?.doughnuts??0,i=s!==0,a=r?.hasHooter,l=this.#n.head.hooter.icon,c=this.#n.head.doughnuts.icon,u=this.#n.head.doughnuts.textContainer;l.texture=Dt(bt(o,a??!1),"hooter"),c.texture=Dt(bt(o,i),"doughnuts"),this.#n.head.doughnuts.textContainer.text=s,u.tint=Ke(o,e.color,!1),l.tint=Lt(o,e.color,a??!1),c.tint=Lt(o,e.color,i)}#f(e,{screenSize:t,room:o}){const{renderContext:{general:{gameState:r,colourised:s,onScreenControls:i}}}=this,a=on(r,e),{textContainer:l,container:c,icon:u}=this.#n[e].shield,{textContainer:d,container:h,icon:p}=this.#n[e].extraSkill,f=fl(a),m=f>0||!i;c.visible=m,m&&(l.text=f,c.y=t.y-up(i)),h.x=(t.x>>1)+ct(e)*ap(i,t),c.x=(t.x>>1)+ct(e)*lp(i,t);const x=a===void 0?0:e==="head"?Hs(a):a.bigJumps,g=x>0||!i;h.visible=g,g&&(d.text=x,h.y=t.y-cp(i)),d.tint=Ke(s,o.color,!1),l.tint=Ke(s,o.color,!1),u.tint=jr(s,o.color),p.tint=jr(s,o.color)}#p(e,t){const{currentCharacterName:o}=e;return o===t||o==="headOverHeels"}#m(e,{screenSize:t,room:o}){const{renderContext:{general:{gameState:r,colourised:s,onScreenControls:i}}}=this,a=this.#n[e].sprite;let l;const c=this.#p(r,e),u=bt(s,c);try{l=Dt(u,e==="head"?Zr:Jr)}catch(d){throw console.error(this.renderContext),new Error(`error getting texture for variant ${u}`,{cause:d})}a.texture=l,a.x=(t.x>>1)+ct(e)*ip(i,t.x),a.y=i?Math.round(t.y*.4)-ft.h+2:t.y-ft.h,a.tint=Lt(s,o.color,c)}#g(e,{screenSize:t,freeCharacters:o,room:r}){const{renderContext:{general:{gameState:s,colourised:i,onScreenControls:a}}}=this,c=o[e]??!1?"FREE":on(s,e)?.lives??0,u=this.#n[e].livesText;u.x=(t.x>>1)+ct(e)*sp(a,t.x),u.y=a?Math.round(t.y*.4)+16:t.y,u.text=c;const d=this.#p(s,e),h=r.color.shade==="dimmed",p=i?ni(h)[d?fo[e]:"midGrey"]:se(Jt(r.color).hud.brightHue);u.tint=p}tick(e){if(rp(e)){for(const t of nn)this.#g(t,e),this.#m(t,e),this.#f(t,e);this.#u(e),this.#h(e),this.#d(e),this.#t?.tick(e),this.#o&&(this.#o.isDark=e.room.color.shade==="dimmed")}}get output(){return this.#e}destroy(){this.#n.head.doughnuts.textContainer.destroy(),this.#n.head.hooter.textContainer.destroy(),this.#n.heels.bag.textContainer.destroy(),this.#e.destroy({children:!0}),this.#t?.destroy(),this.#o?.destroy(),this.#r()}}const hp=(n,e,t,o,r)=>n===void 0||n.renderContext.general.colourised!==e||n.renderContext.general.onScreenControls!==t||n.renderContext.inputDirectionMode!==o||n.renderContext.general.upscale.rotate90!==r.rotate90,pp=(n,e,t,o,r,s)=>n===void 0||e||n.renderContext.general.upscale!==t||n.renderContext.general.displaySettings!==o||n.renderContext.general.soundSettings!==r||n.renderContext.general.paused!==s,or=.1,Gt=(n,e)=>{const t=P.currentTime+or;e.gain.linearRampToValueAtTime(0,t),n.stop(t),n.onended=()=>{n.disconnect(),e.disconnect()}},$e=(n,{gain:e,randomiseStartPoint:t},o)=>{const r=P.createGain(),s=e??r.gain.defaultValue;return t?(r.gain.setValueAtTime(0,P.currentTime),r.gain.linearRampToValueAtTime(s,P.currentTime+or)):e!==void 0&&(r.gain.value=e),n.connect(r),r.connect(o),r},Y=n=>{const e=typeof n=="string"?{soundId:n}:n,{playbackRate:t=1,soundId:o,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=P.createBufferSource(),c=lo()[o];return l.buffer=c,l.loop=s,l.playbackRate.value=i?t-.05+Math.random()*.1:t,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},oe=({start:n,change:e,loop:t,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c,u;return d=>{if(!!d!=!!u)d?n!==void 0&&!(a&&s)?(l&&c&&(l.onended=null,Gt(l,c)),l=Y({...n}),c=$e(l,n,i),t!==void 0&&(r?(l=Y({...t,loop:!0}),c=$e(l,t,i)):l.onended=()=>{u&&(l&&c&&(l.onended=null,Gt(l,c)),l=Y({...t,loop:!0}),c=$e(l,t,i))})):t!==void 0&&(l=Y({...t,loop:!0}),c=$e(l,t,i)):(l&&l.loop&&c&&(l.onended=null,Gt(l,c)),o!==void 0&&(l=Y({...o}),c=$e(l,o,i)));else if(u!==d&&e!==void 0){const p=Y({...e});c=$e(p,e,i)}a=!1,u=d}},fp={soundId:"fall"},mp={soundId:"woodScrape",gain:.8,randomiseStartPoint:!0,playbackRate:.8},gp={soundId:"softBump"},xp=(n,e)=>{let t=!1;for(const o in n){if(o!==e)return!0;t=!0}return!t};class ee{constructor(e,t){this.renderContext=e;const o=P.createGain();o.connect(this.output),this.#e=oe({loop:t?.fall??fp},o);const r=P.createGain();r.connect(this.output),this.#t=t?.standingOn===null?void 0:oe({start:t?.standingOn??gp,noStartOnFirstFrame:!0},r);const s=P.createGain();s.connect(this.output),this.#o=t?.collision&&oe({start:t.collision,noStartOnFirstFrame:!0},s);const i=P.createGain();i.connect(this.output),this.#n=t?.pushed===null?void 0:oe({loop:t?.pushed??mp},i)}output=P.createGain();#e;#t;#o;#n;currentPositionZ=0;tick({lastRenderRoomTime:e,movedItems:t},o=!1){const{renderContext:{item:r,room:{roomTime:s}}}=this,{state:{standingOnItemId:i,position:{z:a},vels:{gravity:{z:l}},actedOnAt:{roomTime:c,actedInXY:u,by:d},collidedWith:{roomTime:h,by:p}}}=r;if(this.#e!==void 0){const{currentPositionZ:f}=this,m=a<f&&l<0&&i===null;this.#e(m),this.currentPositionZ=a}if(this.#t!==void 0){const f=i!==null&&h>(e??Ct)&&p[i];this.#t(f)}if(this.#o!==void 0){const f=h>(e??Ct)&&!No(Fo(p));this.#o(f)}if(this.#n!==void 0){const f=!o&&s===c&&u&&i!==null&&xp(d,i)&&t.has(r);this.#n(f)}}destroy(){this.#e?.(!1),this.#n?.(!1)}}const Kr={soundId:"rollingBallLoop",playbackRate:.5,gain:4};class bp{constructor(e){this.renderContext=e,this.#t=new ee(e,{pushed:Kr,collision:{soundId:"ballHit",gain:.7,varyPlaybackRate:!0},standingOn:{soundId:"ballHit"}}),this.#t.output.connect(this.output)}output=P.createGain();#e=oe({loop:Kr},this.output);#t;tick(e){const{renderContext:{item:{state:{vels:{sliding:t},standingOnItemId:o}}}}=this,r=(t.x!==0||t.y!==0)&&o!==null;this.#e(r),this.#t.tick(e,r)}destroy(){this.#e(!1),this.#t.destroy()}}class yp{constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&Y({soundId:"bonus",connectTo:this.output});break}case"disappearing":{Y({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,Y({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=P.createGain();tick(){}destroy(){}}class vp{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=P.createGain();#e=P.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{pressed:e}}}}=this;this.#t!==void 0&&this.#t!==e&&Y({soundId:"switchClick",playbackRate:e?.95:1.05,connectTo:this.#e}),this.#t=e}destroy(){}}class wp{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#o=new ee(e,{collision:{soundId:"metalHit",gain:.3},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#o.output.connect(this.output)}output=P.createGain();#e=P.createGain();#t=oe({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o;tick(e){const{renderContext:{item:t,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=o===s&&ot(Fo(i)).some(l=>Ds(r[l]));this.#t(a),this.#o.tick(e,a)}destroy(){this.#t(!1),this.#o.destroy()}}const Jn=2;class Sp{constructor(e){this.renderContext=e}output=P.createGain();#e=oe({start:{soundId:"conveyorStart",playbackRate:Jn},loop:{soundId:"conveyorLoop",playbackRate:Jn},stop:{soundId:"conveyorEnd",playbackRate:Jn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=Qt(e);this.#e(t)}destroy(){this.#e(!1)}}class Cp{constructor(e){this.renderContext=e,this.#e=new ee(e,{standingOn:{soundId:"drum"}}),this.#e.output.connect(this.output)}output=P.createGain();#e;#t=!1;tick(e){const{renderContext:{item:{state:{stoodOnBy:t}}}}=this,o=Qt(t);!this.#t&&o&&Y({soundId:"drum",connectTo:this.output}),this.#t=o,this.#e.tick(e)}destroy(){this.#e.destroy()}}class Tp{constructor(e){this.renderContext=e,Y({soundId:"hooter",connectTo:this.output})}output=P.createGain();tick(){}destroy(){}}const kp=3;class Ip{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=P.createGain();#e=Y({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+kp*e)}destroy(){Gt(this.#e,this.output)}}const _p={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},Qr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},es={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"},homingBot:{soundId:"lowHum",randomiseStartPoint:!0}},ts={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Rp{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e,o=_p[t];this.#r=new ee(e,o?{collision:o}:void 0),this.#r.output.connect(this.output),Qr[t]!==void 0&&(this.#o=oe({change:Qr[t]},this.#e)),ts[t]!==void 0&&(this.#s=oe(ts[t],this.#e)),es[t]!==void 0&&(this.#n=oe({loop:es[t]},this.#t))}output=P.createGain();#e=P.createGain();#t=P.createGain();#o;#n;#r;#s;tick(e){const{renderContext:{item:t}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#o){const l=Rn(o);this.#o(l)}if(this.#n){const l=r&&!s;this.#n(l)}const a=!Ns(i,pe);this.#s&&this.#s(a),this.#r.tick(e,a)}destroy(){this.#n?.(!1),this.#s?.(!1),this.#r.destroy()}}class Pp{constructor(e){this.renderContext=e,this.#e=new ee(e,{pushed:null}),this.#e.output.connect(this.output)}output=P.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const Mp=.8,Bp=1.2,Ap=.8;class Kn{constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:o}}=e;(t.noFootsteps??nt.soundSettings.noFootsteps)||(this.#e=P.createGain(),this.#e.gain.value=Mp,this.#e.connect(this.output),this.#t=oe({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#o.gain.value=Ap,this.#o.connect(this.output),this.#r.gain.value=Bp,this.#r.connect(this.output),this.#n=oe({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#o),this.#i=new ee(e,{fall:o==="headOverHeels"||o==="head"?{soundId:"headFall"}:void 0,standingOn:{soundId:"softBump"},collision:{soundId:"softBump",gain:.5}}),this.#i.output.connect(this.output)}output=P.createGain();#e;#t;#o=P.createGain();#n;#r=P.createGain();#s=oe({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#r);#i;#l=null;tick(e){const{renderContext:{item:t}}=this,{state:{action:o,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c},walking:u}}}=t,d=Cn(t),h=r?r.phase:null,p=i&&l>s&&l>this.#i.currentPositionZ&&c>0;this.#n(p);const f=l<this.#i.currentPositionZ&&c<0&&a===null,m=!p&&!f&&Wo(u)>Me;if(this.#t!==void 0&&this.#t(m),d!==void 0&&this.#s(d.carrying!==null),h!==null&&h!==this.#l)if(h==="in"){const x=lo().teleportIn,g=P.createBufferSource();g.buffer=x,g.connect(this.output),g.start()}else{const x=lo().teleportOut,g=P.createBufferSource();g.buffer=x,g.connect(this.output),g.start()}this.#l=h,this.#i.tick(e,m||o==="falling")}destroy(){this.#t?.(!1),this.#n(!1),this.#s(!1),this.#i.destroy()}}class Op{constructor(e){this.renderContext=e,this.#e=new ee(e,{standingOn:{soundId:"metalHit"},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#e.output.connect(this.output)}output=P.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const Fp={collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8},pushed:{soundId:"iceScrape",varyPlaybackRate:!0,randomiseStartPoint:!0}};class Lp{constructor(e){this.renderContext=e,this.#e=new ee(e,e.item.config.style==="puck"?Fp:void 0),this.#e.output.connect(this.output)}output=P.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class Ep{constructor(e){this.renderContext=e,this.#e=new ee(e,{collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8,playbackRate:1.5},pushed:{soundId:"glassClink",varyPlaybackRate:!0,playbackRate:1.5}}),this.#e.output.connect(this.output)}output=P.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class zp{constructor(e){this.renderContext=e;const{item:{state:t}}=e;t.played===!1&&(this.#e=Y(e.item.config.soundOptions),$e(this.#e,e.item.config.soundOptions,this.output),t.played=!0)}output=P.createGain();#e;tick(e){}destroy(){this.#e!==void 0&&Gt(this.#e,this.output)}}class Up{constructor(e){this.renderContext=e,this.#e=new ee(e),this.#e.output.connect(this.output)}output=P.createGain();#e;tick(e){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:o}}}}=this,r=Qt(t);e.lastRenderRoomTime!==void 0&&o>e.lastRenderRoomTime&&!r&&Y({soundId:"springBoing",connectTo:this.output}),this.#e.tick(e)}destroy(){this.#e.destroy()}}class Dp{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=P.createGain();#e=P.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,o=t.type==="in-store"?Ws(M.getState().gameMenus,t.path)?"right":"left":e;this.#t!==void 0&&this.#t!==o&&Y({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#t=o}destroy(){}}class Wp{constructor(e){this.renderContext=e}output=P.createGain();#e=oe({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:t}}=this;this.#e(Pn(e)&&rt(e.state.stoodOnBy,t).some(ke))}destroy(){this.#e(!1)}}const Gp=(n,e)=>Bs(rt(n.state.stoodOnBy,e).filter(Gs));class Vp{constructor(e){this.renderContext=e,this.output.gain.value=2}output=P.createGain();#e=void 0;tick(e){const{renderContext:{item:t,room:o}}=this,r=Gp(t,o);this.#e!==void 0&&r<this.#e&&Y({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=r}destroy(){}}const $p={lift:Ip,switch:Dp,button:vp,bubbles:yp,head:Kn,heels:Kn,headOverHeels:Kn,teleporter:Wp,monster:Rp,conveyor:Sp,spring:Up,portableBlock:ee,charles:wp,ball:bp,pushableBlock:Op,firedDoughnut:Tp,slidingBlock:Lp,pickup:ee,movingPlatform:Pp,moveableDeadly:ee,slidingDeadly:Ep,soundEffect:zp,sceneryPlayer:ee,sceneryCrown:ee},Hp=n=>{if(n.item.type==="deadlyBlock"&&n.item.config.style==="toaster")return new Vp(n);if(n.item.type==="portableBlock"&&n.item.config.style==="drum")return new Cp(n);const e=$p[n.item.type];if(e)return new e(n)},ns=z.z*-1,os=z.z*ml,Np=0,jp=z.x*16,Xp={x:0,y:0,z:0},Qn=(n,e,t)=>(n-e)/(t-e)*2-1,Yp=.3,qp=.3;class Zp{constructor(e,t){this.renderContext=e,this.childRenderer=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const o=Go(e.room).floors;this.#e=o.edgeLeftX,this.#t=o.edgeRightX}output=P.createPanner();#e;#t;tick(e){this.childRenderer.tick(e);const{item:t}=this.renderContext,o=t.state,r=js(Xs(Xp,t.aabb,.5),o.position),s=Qn(fn(r),this.#e,this.#t),i=Qn(r.z,ns,os);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${ns},
          ${os},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(o.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=Qn(r.x+r.y,Np,jp);this.output.positionX.value=s*Yp,this.output.positionY.value=i,this.output.positionZ.value=a*qp}destroy(){this.childRenderer.destroy()}}class Jp{constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(o=>o.output))}#e;#t=new C({label:"CompositeRenderer"});tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}var Kp=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uTargetColor;const float blackThreshold=sqrt(3.0)*0.15;void main(void){vec4 c=texture(uTexture,vTextureCoord);float isBlack=step(length(c.rgb),blackThreshold);finalColor=mix(vec4(uTargetColor,1),c,max(isBlack,1.0-c.a));}`;const Qp=Z.from({vertex:Le,fragment:Kp,name:"revert-colourise-filter"});class ef extends q{uniforms;constructor(e="white"){super({glProgram:Qp,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[t,o,r]=new re(e).toArray();this.uniforms.uTargetColor[0]=t,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ia=wt,tf=S.pastelBlue,rs=Kt.highlightBeige,nf=S.lightBeige,of=Kt.lightBeige,ss=Kt.midRed,rf=Kt.white,is=new ef(tf),eo=S.white,as=S.midRed,sf=S.pastelBlue,ls={left:"↖",away:"↗",right:"↘",towards:"↙"},cs=n=>n.type==="switch"&&n.config.type==="in-room"||n.type==="button",us=(n,e)=>{switch(n){case"back-forth":switch(e){case"left":return"↖↘";case"right":return"↘↖";case"away":return"↗↙";case"towards":return"↙↗";default:throw new Error("Unexpected startDirection")}case"forwards":switch(e){case"left":return"↖";case"right":return"↘";case"away":return"↗";case"towards":return"↙";default:throw new Error("Unexpected startDirection")}case"clockwise":switch(e){case"left":return"↖↗↘↙";case"right":return"↘↙↖↗";case"away":return"↗↘↙↖";case"towards":return"↙↖↗↘";default:throw new Error("Unexpected startDirection")}case"anticlockwise":switch(e){case"left":return"↖↙↘↗";case"right":return"↘↗↖↙";case"away":return"↗↖↙↘";case"towards":return"↙↘↗↖";default:throw new Error("Unexpected startDirection")}case"towards-analogue":return"➡.⬅"}return""},af=n=>n.type==="monster"&&n.config.activated==="after-player-near";class lf{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output),this.#e()}output=new C({label:"EditorAnnotationsRenderer"});#e(){const e=this.renderContext.item;switch(e.type){case"pickup":if(e.config.gives==="shield"||e.config.gives==="extra-life"||e.config.gives==="jumps"||e.config.gives==="fast"){const t={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"};this.#t({annotationText:t[e.config.gives],yAdj:-16})}break;case"doorFrame":if(e.config.part==="near"){const{rooms:t}=M.getState().levelEditor.campaignInProgress,{config:{toRoom:o,direction:r}}=e;if(o!==gl){const s=!!t[o],i=ls[r],a=r==="away"||r==="right"?`${o}${i}`:`${i}${o}`;this.#t({annotationText:a,yAdj:r==="left"||r==="away"?-48:0,tint:s?eo:as,clickDispatch:s?()=>mr(o):void 0})}}break;case"teleporter":{const{rooms:t}=M.getState().levelEditor.campaignInProgress,{config:{toRoom:o}}=e,r=!!t[o];this.#t({annotationText:`➡${o}`,yAdj:-12,tint:r?eo:as,clickDispatch:r?()=>mr(o):void 0})}break;case"conveyor":{const{config:{direction:t}}=e,o=ls[t];this.#t({annotationText:o,yAdj:-12})}break;case"movingPlatform":{const{config:{movement:t,startDirection:o}}=e;this.#t({annotationText:us(t,o),yAdj:-12})}break;case"monster":{const{config:t}=e;switch(!0){case(t.which==="cyberman"&&t.activated==="after-player-near"):this.#t({annotationText:"wake",tint:nf,yAdj:-12});break;case(t.which==="turtle"||t.which==="skiHead"):this.#t({annotationText:us(t.movement,t.startDirection),yAdj:-12});break}}break}}#t({annotationText:e,yAdj:t=0,tint:o=eo,clickDispatch:r}){const{renderContext:{frontLayer:s,general:{pixiRenderer:i}}}=this,a=new N({pixiRenderer:i,label:"EditorAnnotationTextContainer",outline:!0,tint:o,text:e,y:t});r!==void 0&&(a.eventMode="static",a.on("click",()=>{M.dispatch(r())}),a.on("mouseover",()=>{M.getState().levelEditor.tool.type==="pointer"&&(M.dispatch(gr(!0)),a.tint=sf)}),a.on("mouseout",()=>{M.dispatch(gr(!1)),a.tint=o}),a.cursor="pointer"),this.output.addChild(a),s.attach(a)}tick(e){this.#o(),this.childRenderer.tick(e)}#o(){const{renderContext:{room:e}}=this,t=this.renderContext.item,{clickableAnnotationHovered:o}=M.getState().levelEditor,{jsonItemId:r}=t,s=M.getState(),i=Fc(s),a=Lc(s),l=Ec(s),c=r&&i?.jsonItemId===r&&!o,u=r&&a.includes(r),d=()=>r!==void 0&&(de(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&cs(h)&&h.config.modifies.some(p=>p.expectType===t.type&&(p.targets===void 0||p.targets.includes(r))))||cs(t)&&de(e.items).some(({jsonItemId:h,type:p})=>h!==void 0&&h===i?.jsonItemId&&t.config.modifies.some(f=>f.expectType===p&&(f.targets===void 0||f.targets.includes(h))))||t.type==="charles"&&de(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&h.type==="joystick"&&h.config.controls.some(p=>p===r))||t.type==="joystick"&&t.config.controls.some(h=>i?.jsonItemId===h));this.output.filters=c&&u?[is,l.type==="eyeDropper"?ss:rs]:c?l.type==="eyeDropper"?ss:rs:u?is:d()?rf:af(t)?of:ia}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const cf=(n,e,t)=>e.general.editor?new lf(e,t):t;class aa extends Zi{}const ds=(n,e)=>{e.poly([O({}),O({x:n.x}),O({x:n.x,y:n.y}),O({y:n.y})]).poly([O({}),O({z:n.z}),O({y:n.y,z:n.z}),O({y:n.y})]).poly([O({x:n.x}),O({x:n.x,z:n.z}),O(n),O({x:n.x,y:n.y})]).poly([O({z:n.z}),O({x:n.x,z:n.z}),O({x:n.x,y:n.y,z:n.z}),O({y:n.y,z:n.z})])},hs=(n,e)=>{const t=new he;return ds(n,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),ds(n,t),t.stroke({width:.5,color:e,alpha:1})}),t},uf={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class df{constructor(e){this.renderContext=e;const{item:t}=e,o=uf[t.type]??"rgba(255,255,255)";if(this.#e=new C({label:`ItemBoundingBoxRenderer ${t.id}`}),xl("portal")(t)){const s=O(t.config.relativePoint);this.#e.addChild(new he().circle(s.x,s.y,5).stroke(o)),this.#e.addChild(new he().circle(s.x,s.y,2).fill(o))}if(this.#e.addChild(new he({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(hs(t.aabb,o)),t.renderAabb){const s="rgba(184, 184, 255)",i=hs(t.renderAabb,s);if(t.renderAabbOffset){const a=O(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(r=new Eu({text:s,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)}),e.frontLayer.attach(this.#e)}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const hf=75;class pf{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const o=e.room.color.shade==="dimmed"?Bn:S;this.#e=new wo(o.moss),this.#t=new wo(o.midRed),this.#o=new Fe({color:o.pureBlack}),this.#e.enabled=!1,this.#t.enabled=!1,this.#o.enabled=!1,this.output.filters=[this.#e,this.#t,this.#o]}output=new C({label:"ItemFlashOnSwitchedRenderer"});#e;#t;#o;tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:o}},room:{roomTime:r}}}=this,s=r-t<hf,i=o==="left";this.#e.enabled=s&&i,this.#t.enabled=s&&!i,this.#o.enabled=s,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const ff=(n,e)=>{const{item:t,room:{items:o}}=n;return de(o).filter(bl).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new pf(n,e):e},la=(n,e,t,o)=>{const r=1/o;n.x=Wr(e,r),n.y=Wr(t,r)},ca=new Jc;ca.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class mf{constructor(e,t){this.renderContext=e,this.wrappedRenderer=t,this.output=new C({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#t()}output;#e=new Map;#t(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=O(this.renderContext.item.state.position);la(this.output,t.x,t.y,e)}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#t(),this.#s()}#o(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return kt;let o;for(const[r,s]of t)s&&(o||(o=new Set),o.add(r));return o??kt}#n(e,t){const o=new C({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(o),o.setMask({mask:t,inverse:!0}),this.#e.set(e,o),o}#r(e,t){const[o,r]=t.children,s=t.parent;s.removeChild(t),s.addChild(r),t.mask=null,o.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#o();for(const o of this.#e.keys())if(!t.has(o)){const r=this.#e.get(o);if(r)try{this.#r(o,r)}catch(s){throw new Error(`error while destroying masking container ${uo(r)} 
              for our rendering: ${uo(this.output)}`,{cause:s})}}for(const o of t){const r=this.#e.get(o),s=r?.children[0],i=this.renderContext.getItemRenderPipeline(o)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=ca;const l=xe(e,i,s,`red mask: ${o}`);i.filters=a,r===void 0&&this.#n(o,l);const c=this.renderContext.room.items[o],u=Ae(O(c.state.position),O(this.renderContext.item.state.position));l.x=u.x,l.y=u.y}}destroy(){this.output.destroy({children:!0}),this.wrappedRenderer?.destroy()}}const to=(n,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:o})=>{const r=o?.renderProps,s=Tn(t)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=v({textureId:s==="left"||s==="away"?`shadowMask.${n}.away`:`shadowMask.${n}.right`,spritesheetVariant:"original"});return a.y=-(z.z*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},gf={left:"away",towardsLeft:"awayRight",towards:"right"},xf=(n,e,t)=>{if(!e)return`shadowMask.${n}.${t}`;const o=`shadowMask.${n}.falling.${t}`;return jt(o)?o:`shadowMask.${n}.${t}`},no=(n,e=1)=>({renderContext:{item:t},currentRendering:o})=>{const r=t.type==="sceneryPlayer"?"idle":t.state.action,s=o?.renderProps,i=t.type==="sceneryPlayer"?t.config.startDirection:Rn(t.state.visualFacingVector??t.state.facing)??"towards",a=r==="falling";if(!(s===void 0||i!==s.facingXy8||a!==s.falling))return"no-update";const c=gf[i],d=xf(n,a,c??i),h=v({textureId:d,spritesheetVariant:"original"});return h.y=-(z.z*(e-1)),h.scale.x=c===void 0?1:-1,{output:h,renderProps:{facingXy8:i,falling:a}}},bf=({renderContext:{general:{pixiRenderer:n},item:e,room:t},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:s}}=e,i=o?.renderProps,a=Pn(e),l=a&&rt(r,t).find(ke)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:At(n,Ln({textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.artificial",spritesheetVariant:"original"},s)),renderProps:{flashing:l,activated:a}}:"no-update"},oo={lift:le({textureId:"shadowMask.smallBlock",spritesheetVariant:"original"}),conveyor:_e(({direction:n})=>({textureId:"shadowMask.conveyor",flipX:Tt(n)==="x",spritesheetVariant:"original"})),doorLegs:_e(({direction:n})=>({textureId:n==="right"||n==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:Tt(n)==="y",spritesheetVariant:"original"})),teleporter:bf,floor:"no-mask",barrier:_e(({axis:n})=>({textureId:"shadowMask.barrier.y",flipX:n==="x",y:-1,spritesheetVariant:"original"})),spring:Sh,block:_e(({style:n})=>({textureId:`shadowMask.${n}`,spritesheetVariant:"original"})),pushableBlock:le({textureId:"shadowMask.stepStool",spritesheetVariant:"original"}),movingPlatform:le({textureId:"shadowMask.sandwich",spritesheetVariant:"original"}),hushPuppy:le({textureId:"shadowMask.hushPuppy",spritesheetVariant:"original"}),portableBlock:_e(({style:n})=>({textureId:n==="drum"?"shadowMask.drum":"shadowMask.smallBlock",spritesheetVariant:"original"})),slidingBlock:_e(({style:n})=>n==="book"?{textureId:"shadowMask.book",flipX:!0,spritesheetVariant:"original"}:{textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),deadlyBlock:_e(({style:n})=>({textureId:n==="volcano"?"shadowMask.volcano":"shadowMask.toaster",spritesheetVariant:"original"})),spikes:le({textureId:"shadowMask.spikes",spritesheetVariant:"original"}),switch:le({textureId:"shadowMask.switch",spritesheetVariant:"original"}),button:le({textureId:"shadowMask.buttonInGame",spritesheetVariant:"original"}),pickup:_e(({gives:n})=>{switch(n){case"scroll":return{textureId:"shadowMask.scroll",spritesheetVariant:"original"};case"doughnuts":return{textureId:"shadowMask.doughnuts",spritesheetVariant:"original"};case"fast":case"extra-life":case"jumps":case"shield":return{textureId:"shadowMask.whiteRabbit",spritesheetVariant:"original"};default:return{textureId:"blank",spritesheetVariant:"original"}}}),slidingDeadly:le({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),ball:le({textureId:"shadowMask.ball",spritesheetVariant:"original"}),"monster.dalek":le({textureId:"shadowMask.dalek",spritesheetVariant:"original"}),"monster.turtle":to("turtle"),"monster.skiHead":to("skiHead"),"monster.homingBot":le({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),joystick:le({textureId:"shadowMask.joystick",spritesheetVariant:"original"}),charles:to("charles",2),head:no("head"),heels:no("heels"),headOverHeels:no("head",2)},yf=n=>{switch(n.type){case"sceneryPlayer":return oo[n.config.which];case"monster":return oo[`monster.${n.config.which}`];case"floor":return n.config.floorType==="none"?void 0:"no-mask";default:return oo[n.type]}},vf=.66,wf=n=>n.shadowCastTexture!==void 0,ut={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:Vs}};class Sf{constructor(e,t){this.renderContext=e,this.appearance=t,this.#e.addChild(this.#t),this.#r||(this.#e.filters=new qc({alpha:vf}))}#e=new C({label:"ItemShadowRenderer"});#t=new C({label:"shadows"});#o;#n=new Map;initShadowMaskRenderer(){const{renderContext:e,appearance:t}=this;if(t!=="no-mask")if(this.#o=new aa(e,t),e.item.shadowOffset===void 0)this.#e.addChild(this.#o.output);else{const o=new C({label:"shadowMaskOffset",children:[this.#o.output],...O(e.item.shadowOffset)});this.#e.addChild(o)}}get#r(){return M.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#s(e){if(this.#o===void 0)return;const t=this.#o.output.children.at(0);this.#o.tick(e);const o=this.#o.output.children.at(0);if(o===void 0||!(o instanceof te)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}t!==o&&(this.#r?this.renderContext.frontLayer.attach(o):this.#e.mask=o)}destroy(){this.#e.destroy(!0),this.#o?.destroy();for(const e of Object.values(this.#n))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:o,general:{pixiRenderer:r},room:s}=this.renderContext,i=t.has(o),a=o.state.position.z+o.aabb.z;ut.state.position.x=o.state.position.x,ut.state.position.y=o.state.position.y,ut.state.position.z=a,ut.aabb.x=o.aabb.x,ut.aabb.y=o.aabb.y;const l=new Set(Bo(ut,s[qt],u=>u!==o&&wf(u)&&(u.castsShadowWhileStoodOn||u.state.position.z>o.state.position.z+o.aabb.z)&&!u.noShadowCastOn?.includes(o.type)));let c=!1;for(const[u,d]of this.#n)l.has(u)||(this.#t.removeChild(d),d.destroy(),this.#n.delete(u));for(const u of l){c=!0;let d=this.#n.get(u),h=!1;if(!d){const{times:p}=u.config,{shadowCastTexture:f}=u,m=Ln(typeof f=="string"?{textureId:f}:f,p);d=At(r,m),d.label=u.id,this.#t.addChild(d),this.#n.set(u,d),h=!0}if(h||i||t.has(u)){const p=O({...In(Ae(u.state.position,o.state.position),u.shadowOffset??Zt),z:o.aabb.z});d.x=p.x,d.y=p.y}}this.#e.visible=c,c?(this.#o===void 0&&this.initShadowMaskRenderer(),this.#s(e)):this.#o!==void 0&&(this.#o.destroy(),this.#o=void 0)}get output(){return this.#e}}const Cf=n=>{const e=yf(n.item);return e===void 0?void 0:new Sf(n,e)};class Tf{constructor(e,t){this.renderContext=e,this.componentRenderers=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}class kf{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const{general:{colourised:o},room:r}=e;this.#e=new Fe({color:o?(r.color.shade==="dimmed"?Bn:S).moss:se(r.color)}),this.#e.enabled=!1,this.output.filters=this.#e}output=new C({label:"PortableItemPickUpNextHighlightRenderer"});#e;tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;this.#e.enabled=t,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const If=(n,e,t)=>Oo(n)?new kf(e,t):t,_f=(n,e)=>{const{gameMenus:{cheatsOn:t}}=M.getState();e!==void 0&&t&&(e.eventMode="static",e.on("pointertap",()=>{M.dispatch(wl({item:n,pixiContainer:e}))}))},Rf=n=>{const e=M.getState(),t=yl(e),o=!vl(e),{general:{paused:r}}=n,{item:s}=n,i=t==="all"||t==="non-wall"&&n.item.type!=="wall",a=[],l=ra(s);let c;if(l!==void 0){c=new aa(n,l);const f=ff(n,c);a.push(cf(s,n,If(s,n,f)))}if(o&&!r){const f=Cf(n);f!==void 0&&a.push(f)}i&&a.push(new df(n));let u;if(a.length===0)u=void 0;else{const f=a.length===1?a[0]:new Jp(a,n);u=new mf(n,f),_f(s,u.output)}const d=n.general.soundSettings.mute??nt.soundSettings.mute,h=r||d?void 0:Hp(n),p=h===void 0?void 0:s.noSoundPan?h:new Zp(n,h);return{top:new Tf(n,{graphics:u,sound:p}),itemAppearanceRenderer:c}},Pf=n=>{for(const[,l]of n)for(const[c]of l)l.set(c,!1);const e=Array.from(Mf(n));let t=e.length,o=t;const r=new Array(t),s={},i=Bf(e);for(;o--;)s[o]||a(e[o],o,new Set,null);return r;function a(l,c,u,d){if(u.has(l)){if(d!==null){const f=n.get(d);f?.has(l)&&(console.groupEnd(),f.set(l,!0))}return}if(s[c])return;s[c]=!0;const h=n.get(l),p=Array.from(h?.entries()??kt);if(c=p.length){u.add(l);do{const[f,m]=p[--c];m||a(f,i.get(f),u,l)}while(c);u.delete(l)}r[--t]=l}};function Mf(n){const e=new Set;for(const[t,o]of n.entries()){e.add(t);for(const r of o.keys())e.add(r)}return e}function Bf(n){const e=new Map;for(let t=0,o=n.length;t<o;t++)e.set(n[t],t);return e}const Af=(n,e,t,o)=>(n.has(e)||n.set(e,new Map),n.get(e).set(t,o),n),Et=(n,e,t)=>{const o=n.get(e);return o!==void 0&&(o.delete(t),o.size===0&&n.delete(e)),n},ro=1e-5,ps=-.1,zt=(n,e,t,o,r)=>o-r>n&&t<e-r,Of=0,ua=1,da=2,ha=3,Ff=(n,e)=>{const t=zt(n.zAxisProjectionMin,n.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,ro),o=zt(n.xAxisProjectionMin,n.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,ro),r=zt(n.yAxisProjectionMin,n.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,ro);return o&&r&&t?ua:r&&t&&zt(n.xAxisProjectionMin,n.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,ps)?da:o&&t&&zt(n.yAxisProjectionMin,n.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,ps)?ha:Of},ko=2,fs=(n,e,t,o)=>{const r=n.x,s=r+e.x,i=t.x;if(s<=i)return 1;const a=i+o.x;if(r>=a)return-1;const l=n.y,c=l+e.y,u=t.y;if(c<=u)return 1;const d=t.y+o.y;if(l>=d)return-1;const h=n.z,p=h+e.z,f=t.z;if(p<=f)return-1;const m=t.z+o.z;return h>=m?1:ko},Lf=(n,e,t,o)=>{const r=n.x,s=r+e.x,i=t.x,a=i+o.x,l=n.y,c=l+e.y,u=t.y,d=u+o.y,h=n.z,p=h+e.z,f=t.z,m=f+o.z,x=s-i,g=c-u,_=p-f,T=a-r,y=d-l,b=m-h,w=Math.abs(x)<Math.abs(T)?x:-T,k=Math.abs(g)<Math.abs(y)?g:-y,I=-(Math.abs(_)<Math.abs(b)?_:-b),F=Math.abs(w),L=Math.abs(k),B=Math.abs(I);return F<L?F<B?w:I:L<B?k:I},Ef=(n,e,t)=>{if(n.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const o=n.state.position,r=n.renderAabbOffset?ue(o,n.renderAabbOffset):o,s=n.renderAabb||n.aabb,i=e.state.position,a=e.renderAabbOffset?ue(i,e.renderAabbOffset):i,l=e.renderAabb||e.aabb;switch(Ff(t.getItemAxesProjections(n),t.getItemAxesProjections(e))){case ua:{let u=fs(r,s,a,l);return u===ko&&(n.renderAabbOffset!==void 0||n.renderAabb!==void 0||e.renderAabbOffset!==void 0||e.renderAabb!==void 0)&&(u=fs(o,n.aabb,i,e.aabb)),u===ko&&(u=Lf(r,s,a,l)),u}case da:return ye(r.y,a.y+l.y)&&ye(r.z,a.z+l.z)?1:ye(a.y,r.y+s.y)&&ye(a.z,r.z+s.z)?-1:a.y-a.z-(r.y-r.z);case ha:return ye(r.x,a.x+l.x)&&ye(r.z,a.z+l.z)?1:ye(a.x,r.x+s.x)&&ye(a.z,r.z+s.z)?-1:a.x-a.z-(r.x-r.z);default:return 0}},zf=(n,e=new Sl(Je(n)),t=Je(n),o=new Map)=>{const r=new Map;for(const[s,i]of o)if(!n[s])o.delete(s);else for(const[a]of i)n[a]||Et(o,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=o.get(s.id);a?.forEach((l,c)=>{i.has(n[c])||a.delete(c)}),o.forEach((l,c)=>{i.has(n[c])||Et(o,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||r.get(a)?.has(s))continue;const l=Ef(s,a,e);if(r.has(s)||r.set(s,new Set),r.get(s).add(a),l===0){Et(o,s.id,a.id),Et(o,a.id,s.id);continue}const c=l>0?s.id:a.id,u=l>0?a.id:s.id;Af(o,u,c,!1),Et(o,c,u)}}return o};class Uf{constructor(e){this.renderContext=e;const{general:{colourised:t,soundSettings:o},room:r}=e,i=o.mute??nt.soundSettings.mute?void 0:P.createGain();this.output={sound:i,graphics:new C({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t||(this.#o=new Pr({sortableChildren:!1}),this.output.graphics.addChild(this.#o)),this.output.graphics.addChild(this.#n),t||(this.#t.tint=se(r.color))}#e=!1;#t=new C({label:"items",cullableChildren:!0});#o;#n=new Pr({sortableChildren:!1});output;#r=void 0;#s=new Map;#i=new Map;#l=e=>this.#i.get(e);#a(e,t){let o=this.#i.get(t.id);if(o===void 0){o=Rf({...this.renderContext,colourClashLayer:this.#o,frontLayer:this.#n,item:t,zEdges:this.#s,getItemRenderPipeline:this.#l}),this.#i.set(t.id,o);const{graphics:r,sound:s}=o.top.output;if(r&&(this.#t.addChild(r),t.fixedZIndex&&(r.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{o.top.tick(e)}catch(r){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:r})}}#c(e){const{room:t}=this.renderContext,o={...e,lastRenderRoomTime:this.#r},r=new Set,s=a=>{if(r.has(a))return;const l=this.#s.get(a);if(l)for(const[c,u]of l.entries())u&&s(c);this.#a(o,t.items[a]),r.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#i.entries())t.items[a]===void 0&&(l.top.destroy(),this.#i.delete(a),i=!0);i&&this.#u()}#u(){if(this.#o)for(const e of this.#o.renderLayerChildren)e.parent===null&&this.#o.detach(e);for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e)}#d(e){for(let t=0;t<e.length;t++){const o=this.#i.get(e[t]);if(o===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const r=o.top.output.graphics;if(!r)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);r.zIndex=t}}get#h(){return this.#r!==void 0}tick(e){const t=this.#h?e:{...e,movedItems:new Set(de(this.renderContext.room.items))},{renderContext:{room:o}}=this;zf(o.items,o[qt],t.movedItems,this.#s);const r=Pf(this.#s);this.#c(t),(!this.#h||t.movedItems.size>0)&&this.#d(r),this.#r=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0});const{sound:e}=this.output;if(e){const t=or*1e3;setTimeout(()=>{e.disconnect()},t)}this.#i.forEach(t=>{t.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const dt=.4,Df=300,Wf=36,Gf=.2,Vf=1250,ms=(n,e)=>Cl(n,Math.min(1,e/Df));class $f{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:s}}=e,i=e.general.onScreenControls??nt.onScreenControls,{floors:{edgeLeftX:a,edgeRightX:l,bottomEdgeY:c},allItems:{topEdgeY:u}}=Go(o);this.#l=a,this.#a=l;let d=(l+a)/2;const h=l-a,p=c-u,f=r.y>=p,m=r.x>=h,x=f&&m;m&&!i&&(d/=2);const g=i?-4:f?16:0;this.#c={x:r.x/2-d,y:f&&i?Math.floor((r.y+p)/2)-4:r.y-g-c-(x&&!i?Math.abs(d/2):0)},this.#r=this.#c.x+this.#l<0,this.#s=this.#c.x+this.#a>r.x,this.#i=this.#c.y+u<0;const _=this.childRenderer.output.graphics;if(_===void 0)throw new Error("can't scroll a renderer without graphics");const T={sound:this.childRenderer.output.sound,graphics:new C({children:[_],label:`RoomScrollRenderer(${o.id})`})};(s?.showBoundingBoxes??nt.displaySettings.showBoundingBoxes)!=="none"&&T.graphics.addChild(Hf(e.room)),this.output=T}#e={x:0,y:0};#t={x:0,y:0};#o=Ct;#n=!1;#r;#s;#i;#l;#a;#c;output;#u(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=this.#e,o=this.output.graphics,r=In(t,this.#t);la(o,r.x,r.y,e)}#d(e){const{general:{gameState:t},room:{roomTime:o}}=this.renderContext,{deltaMS:r}=e,{inputStateTracker:{lookVector:s,hudInputState:{lookVector:i}}}=t;Dn(s)+Dn(i)<Me?this.#o<o-Vf&&(this.#t=Ae(this.#t,ms(this.#t,r))):(this.#o=o,this.#t=Uo(ue(this.#t,Oe(s,r*Gf)),i),i.x=0,i.y=0)}tick(e){const{general:{upscale:{gameEngineScreenSize:t},gameState:o}}=this.renderContext,{deltaMS:r}=e;this.#d(e);const s=Mt(o);if(s===void 0)return;const i=O(s.state.position),a=ue(i,this.#c),l={x:this.#r&&a.x<t.x*dt?Math.min(-this.#l,t.x*dt-i.x):this.#s&&a.x>t.x*(1-dt)?Math.max(t.x-this.#a,t.x*(1-dt)-i.x):this.#c.x,y:this.#i&&a.y<t.y*dt?t.y*dt-i.y:this.#c.y};if(!this.#n)this.#e=l;else{const u=Ae(this.#e,l);if(Dn(u)>Wf){const d=ms(u,r);this.#e={x:this.#e.x-d.x,y:this.#e.y-d.y}}}this.#u(),this.#n=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Hf=n=>{const{floors:{edgeLeftX:e,edgeRightX:t,bottomEdgeY:o,topEdgeY:r},allItems:{topEdgeY:s}}=Go(n);return new he().rect(e,s,t-e,o-s).stroke("red").rect(e,r,t-e,o-r).stroke("blue")};var Nf=`#version 300 es
precision highp float;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const int sampleCount=4;const float dimmedAttributeLum=0.6;const float isDimThresh03=1.5;const float saturationThreshold=0.15;const vec3 channelStrengthModifier=vec3(0.8,1.0,1.1);const vec4 pureWhiteColour=vec4(1.0,1.0,1.0,1.0);const vec4 pureBlueColour=vec4(0.0,0.0,1.0,1.0);const vec4 pureBlackColour=vec4(0.0,0.0,0.0,1.0);vec2 attributeBlockPos(vec2 texSize,float blockSize,vec2 textureCoord){vec2 pixelPos=textureCoord*texSize;return(floor(pixelPos/blockSize)*blockSize)/texSize;}vec4 attributeClash(sampler2D inputTexture,sampler2D lut,float blockSize,float blackPoint,float inputDim,vec2 textureCoord){vec2 textureSize=vec2(textureSize(inputTexture,0));vec2 blockPos=attributeBlockPos(textureSize,blockSize,textureCoord);vec3 colorSum=vec3(0.0);float colouredSamplesCount=0.001;vec2 stepSize01=vec2(blockSize/float(sampleCount))/textureSize;vec2 samplePos01=blockPos;for(int y=0;y<sampleCount;y++){samplePos01.y+=stepSize01.y;samplePos01.x=blockPos.x;for(int x=0;x<sampleCount;x++){samplePos01.x+=stepSize01.x;vec4 sampleColor=lutColourReplace(lut,texture(inputTexture,samplePos01))*inputDim;float isInBounds=step(0.0,samplePos01.x)*step(samplePos01.x,1.0)*step(0.0,samplePos01.y)*step(samplePos01.y,1.0);float useSample=isNotBlack(sampleColor,blackPoint)*isInBounds;colorSum+=sampleColor.rgb*sampleColor.rgb*useSample;colouredSamplesCount+=useSample;}}vec3 avgColor=colorSum/colouredSamplesCount;float avgColorLum03=max(avgColor.r+avgColor.g+avgColor.b,0.01);vec3 channelsStrength=avgColor/avgColorLum03;vec4 quantisedColor=vec4(step(0.3,channelsStrength*channelStrengthModifier),0.1);float maxChannel=max(channelsStrength.r,max(channelsStrength.g,channelsStrength.b));float minChannel=min(channelsStrength.r,min(channelsStrength.g,channelsStrength.b));float sat=maxChannel-minChannel;float isSaturated01=step(saturationThreshold,sat);float isBright=step(isDimThresh03,avgColorLum03);float thresholdForUnsatToBeBlue=step(isDimThresh03*0.3,avgColorLum03);float thresholdForSaturatedToBeBlue=step(isDimThresh03*0.03,avgColorLum03);vec4 unsatOrQuantisedColor=mix(mix(pureBlueColour,pureWhiteColour,thresholdForUnsatToBeBlue),mix(pureBlueColour,quantisedColor,thresholdForSaturatedToBeBlue),isSaturated01);float dimMultiplier=mix(dimmedAttributeLum,1.0,isBright);vec4 dimmedColor=unsatOrQuantisedColor*dimMultiplier;vec4 c=lutColourReplace(lut,texture(inputTexture,textureCoord))*inputDim;float originalColorIsNotBlack=isNotBlack(c,blackPoint);return mix(pureBlackColour,dimmedColor,originalColorIsNotBlack);}in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform float uBlockSize;uniform float uBlackPoint;uniform float uProgress;uniform sampler2D uLut;uniform float uCentreX;uniform float uCentreY;uniform vec4 uInputClamp;const float blackCircleMinSize=0.33;const float blackCircleFeathering=0.4;const float fadeDuration=0.1;float fade(){return 1.0-smoothstep(1.0 - fadeDuration,1.0,uProgress);}float blockDistToCentre(float ellipticalFactor){float xCentreTrue=uInputClamp.x+(uInputClamp.z-uInputClamp.x)*uCentreX;float yCentreTrue=uInputClamp.y+(uInputClamp.w-uInputClamp.y)*uCentreY;vec2 trueCentre=vec2(xCentreTrue,yCentreTrue);vec2 texSize=vec2(textureSize(uTexture,0));float texAspect=texSize.x/texSize.y;vec2 blockPos=attributeBlockPos(texSize,uBlockSize,vTextureCoord);return length((blockPos-trueCentre)/vec2(1,texAspect*ellipticalFactor));}float isInCirc(float blockDistToCentre01,float feathering,float circleMinSize,float progress){return smoothstep(progress-feathering,progress+feathering,pow(1.0-blockDistToCentre01,3.0)+circleMinSize);}void main(void){float elipticalFactor=mix(1.0,0.5,uProgress);float blockDistToCentre=blockDistToCentre(elipticalFactor);float insideBlackCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,blackCircleMinSize,uProgress-0.2);float insideInnerCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,0.0,uProgress*1.5-0.3);vec4 clashColour=attributeClash(uTexture,uLut,uBlockSize,uBlackPoint,max(insideBlackCirc01-pow(uProgress,4.0),0.0),vTextureCoord);vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(clashColour,c,insideInnerCirc01*fade());}`;const jf=Z.from({vertex:Le,fragment:Nf,name:"attribute-block-filter"});class Xf extends q{uniforms;constructor({blockSize:e=8,blackPoint:t=.1,centreX:o=.5,centreY:r=.5}={}){super({glProgram:jf,resources:{attributeBlockUniforms:{uBlockSize:{value:e,type:"f32"},uBlackPoint:{value:t,type:"f32"},uProgress:{value:0,type:"f32"},uCentreX:{value:o,type:"f32"},uCentreY:{value:r,type:"f32"}},uLut:Ac.source}}),this.uniforms=this.resources.attributeBlockUniforms.uniforms}set progress(e){this.resources.attributeBlockUniforms.uniforms.uProgress=e}set centreX(e){this.resources.attributeBlockUniforms.uniforms.uCentreX=e}set centreY(e){this.resources.attributeBlockUniforms.uniforms.uCentreY=e}}class Yf{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:o}=e,r=this.childRenderer.output.graphics,s={sound:this.childRenderer.output.sound,graphics:new C({children:[r],label:`TeleportEffectRenderer(${o.id})`})};this.output=s,this.#o()}output;#e;#t(e){const t=ue(e.state.position,Oe(e.aabb,.5)),{renderContext:{general:{upscale:{rotate90:o}}}}=this,{x:r,y:s}=O(t),i=this.output.graphics.getLocalBounds();this.output.graphics.filterArea=i.rectangle;const a=(r-i.x)/i.width,l=(s-i.y)/i.height;o?(this.#e.centreX=1-l,this.#e.centreY=a):(this.#e.centreX=a,this.#e.centreY=l)}#o(){const{renderContext:{general:{gameState:{currentCharacterName:e}},room:{items:t}}}=this,o=t[e];if(o!==void 0){const{teleporting:r}=o.state;if(this.#e===void 0!=(r===null))if(r!==null){const{renderContext:{general:{upscale:{gameEngineUpscale:s}}}}=this;this.#e=new Xf({blockSize:s*8}),this.#t(o),this.output.graphics.filters=[this.#e]}else this.#e=void 0,this.output.graphics.filters=wt;else if(r!==null){const{timeRemaining:s,phase:i}=r,a=s/Tl,l=i==="in"?a:1-a;this.#e.progress=l,this.#t(o)}}}tick(e){this.childRenderer.tick(e),this.#o()}destroy(){this.output.graphics.destroy({children:!0}),this.#e?.destroy(),this.childRenderer.destroy()}}const Ut=n=>({avgMs:n.avgMs.toFixed(2),percentage:n.percentage.toFixed(1)+"%",fps:(1e3/n.avgMs).toLocaleString("en-GB",{maximumFractionDigits:0})}),qf=n=>{const{frameCount:e,fps:t,theoreticalFps:o,phases:r,elapsedMs:s}=n;console.log(`Frame timing (${e} frames in ${(s/1e3).toFixed(3)}s, ${t.toFixed(1)} fps, theoretical max: ${o.toLocaleString("en-GB",{minimumFractionDigits:1,maximumFractionDigits:1})} fps):`),console.table({physics:Ut(r.physics),hudUpdateSceneGraph:Ut(r.hudUpdateSceneGraph),updateSceneGraph:Ut(r.updateSceneGraph),"pixi.js app.render":Ut(r.pixiRender),total:{...Ut(r.total),percentage:"100%"}})},Zf=()=>{typeof window<"u"&&(window.detailedFps=()=>{Yt.on(qf)},console.log("%cPerformance timing available:","color: #4CAF50; font-weight: bold"),console.log("call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)"))},Io=(n,e)=>{if(n.lives=Wt(n.lives,-1),n.lives===0&&e!==void 0){const t=It(e.lives);t>=2&&(n.lives=Wt(n.lives,1),e.lives=Wt(e.lives,t>2?-2:-1))}},pa=(n,e)=>{const t=Cn(e);if(t===void 0)return;const{carrying:o}=t;o!==null&&(Ee({room:n,item:o,atPosition:e.state.position}),t.carrying=null)},Jf=(n,e)=>{const t=n.characterRooms.headOverHeels;if(Io(e.state.head,e.state.heels),Io(e.state.heels,e.state.head),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,Wt(e.state.head.lives,e.state.heels.lives)===0)return;const r=It(e.state.head.lives)>0,s=It(e.state.heels.lives)>0;if(pa(t,e),r&&!s||!r&&s){const c=r?"head":"heels";n.currentCharacterName=c,He(n,e);const u=cr(e)[c],d=yt({gameState:n,playableItems:[u],roomId:t.id});n.characterRooms={[c]:d},n.entryState={[c]:ur(u)};return}if(n.entryState.headOverHeels!==void 0){He(n,e);const c=yt({gameState:n,playableItems:[e],roomId:t.id});n.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=cr(e);if(He(n,c),He(n,u),Rl(c,u)){const d=Ys({head:c,heels:u});He(n,d,"heels");const h=yt({gameState:n,playableItems:[d],roomId:t.id});n.characterRooms={headOverHeels:h},n.entryState={headOverHeels:ur(d)};return}else{const d=yt({gameState:n,playableItems:[c,u],roomId:t.id});n.characterRooms={head:d,heels:d};return}}},yt=({gameState:n,playableItems:e,roomId:t})=>{const o=Pl(M.getState()),r=Ml({roomJson:o.rooms[t],roomPickupsCollected:n.pickupsCollected[t]??ie,scrollsRead:M.getState().gameMenus.gameInPlay.scrollsRead,userSettings:M.getState().gameMenus.userSettings});for(const s of e)Ee({room:r,item:s}),(s.type==="head"||s.type==="headOverHeels")&&Bl(r,n);return r},He=(n,e,t=e.id)=>{const o=n.entryState[t];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Kf=n=>{n.state.standingOnItemId=null,n.state.previousStandingOnItemId=null,n.state.standingOnUntilRoomTime=Ct},Qf=(n,e)=>{const t=qs(n,Zs(e.type));e.state.lastDiedAt=e.state.gameTime;const o=n.characterRooms[e.type];if(pa(o,e),Kf(e),Io(e.state,t?.state),e.state.lives===0){delete n.characterRooms[e.id],t!==void 0&&(n.currentCharacterName=t.type);return}else{He(n,e);const r=t===void 0?void 0:n.characterRooms[t.type];if(o===r){if(n.entryState.headOverHeels!==void 0){const a=Ys({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});He(n,a);const l=yt({gameState:n,playableItems:[a],roomId:o.id});n.characterRooms={headOverHeels:l},n.currentCharacterName="headOverHeels";return}Ee({room:o,item:e});return}else{const i=yt({gameState:n,playableItems:[e],roomId:o.id});n.characterRooms[e.id]=i;return}}},em=(n,e)=>{M.dispatch(kl({characterLosingLifeItem:e})),e.type==="headOverHeels"?Jf(n,e):Qf(n,e),Mt(n)===void 0?M.dispatch(Il({offerReincarnation:!0})):_l(n,M)},tm=n=>{for(const e of de(n.items))try{for(const t of rt(e.state.stoodOnBy,n)){if(!n.items[t.id]){so(t,n);continue}if(!Al(t,e)){so(t,n);const o=Es(t,Vo(n.items));o!==void 0&&Fs({above:t,below:o})}}}catch(t){throw new Error(`could not update standing on for item "${e.id}"`,{cause:t})}},gs=Ps*Qe.animations["particle.head.fade"].length*(1/Qe.animations["particle.head.fade"].animationSpeed),nm=20,om=38,rm=.5,un=z.x/2;let sm=0;const fa=(n,e)=>Math.random()<n*(e/1e3),ma=(n,e,t,o)=>({...Qs,id:`particle.${n}.${sm++}`,type:"particle",aabb:pe,config:{forCharacter:e},state:{...Ks(),expires:o+gs+Math.random()*gs,position:t}}),ga=(n,e,t,o)=>{if(!fa(t,o))return;const r={...ue(Ll(n),{x:Math.random()*un-un/2,y:Math.random()*un-un/2}),z:n.state.position.z};Ee({room:e,item:ma(n.id,n.type,r,e.roomTime)})},im=(n,e,t)=>{!(Hs(n.state)>0)||n.state.standingOnItemId===null||Sn(n.state.vels.walking)<Me||ga(n,e,nm,t)},am=(n,e,t)=>{const{isBigJump:o}=n.state;o&&n.state.standingOnItemId===null&&(n.state.vels.gravity.z<=0||ga(n,e,om,t))},lm=(n,e)=>{const{head:t,heels:o}=Js(n.items);t!==void 0&&im(t,n,e),o!==void 0&&am(o,n,e)},cm=(n,e,t)=>{if(!fa(rm,t))return;const o=Ol(Fl),r=ue(e.state.position,{x:o==="x"?0:Math.random()*z.x,y:o==="y"?0:Math.random()*z.y,z:o==="z"?z.z:Math.random()*z.z});Ee({room:n,item:ma(e.id,"crown",r,n.roomTime)})},um=(n,e,t)=>{n.gameTime+=t,e.roomTime+=t;const o=Mt(n);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=t,o.state.heels.gameTime+=t;else if(o.state.gameTime+=t,n.characterRooms.head===n.characterRooms.heels){const s=qs(n,Zs(o.type));s!==void 0&&(s.state.gameTime+=t)}}},dm=n=>{for(const e of de(n.items)){const t=e.state.position,o=El(t);o!==t&&ei(n,e,o)}},hm=(n,e)=>n.state.expires!==null&&n.state.expires<e.roomTime,pm=(n,e)=>{const t={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1,wall:1,floor:1},o=t[n.type]??0,r=t[e.type]??0;return o-r},fm=(n,e)=>{const{actedOnAt:t}=n.state,o=e===t.roomTime;if(o&&t.actedInXY)return;const{position:r}=n.state,s=!Number.isInteger(r.x)||!Number.isInteger(r.y),i=!o||!t.actedInZ,a=i&&!Number.isInteger(r.z);if(!(!s&&!a))return{x:Math.round(r.x),y:Math.round(r.y),z:i?Math.round(r.z):r.z}},mm=(n,e)=>{for(const t of de(n.items)){if(!St(t))continue;const o=fm(t,n.roomTime);if(o===void 0)continue;const{id:r}=t,s=l=>l.id!==r&&Ao(l,t),i={id:r,aabb:t.aabb,state:{position:o}};zl(i,n[qt],s)||(ei(n,t,o),e.add(t))}},xa=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),gm=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),dn=z.x*3,xm=(n,e)=>{const{state:{position:t}}=n,{state:{position:o}}=e;return t.x>o.x-dn&&t.x<o.x+dn&&t.y>o.y-dn&&t.y<o.y+dn},xs=(n,e,t,o,r)=>{if(r&&n.state.activated)return _t;const s=Ul(n.state.position,e);return s===void 0?_t:xm(n,s)?xa:gm},bm=(n,e,t,o)=>n.state.activated?_t:rt(n.state.stoodOnBy,e).some(ke)?xa:_t,ym=(n,e,t,o)=>{switch(n.config.activated){case"after-player-near":return xs(n,e,t,o,!0);case"while-player-near":return xs(n,e,t,o,!1);case"on-stand":return bm(n,e);case"off":case"on":return _t;default:throw n.config,new Error(`unrecognised item.config.activation ${n.config.activated} in ${n.id}:
        ${JSON.stringify(n,null,2)}`)}},vm={movementType:"steady",stateDelta:{pressed:!0}},wm={movementType:"steady",stateDelta:{pressed:!1}},Sm=(n,e)=>{const{state:{stoodOnUntilRoomTime:t,stoodOnBy:o,pressed:r}}=n,s=t+Wl,{roomTime:i}=e,a=!No(Dl(o));return!a&&i>s&&r?(dr(n.config.modifies,"right",n,e),wm):!r&&a?(dr(n.config.modifies,"left",n,e),vm):_t},Cm=(n,e,t,o)=>{const{id:r,state:s,config:i}=n,{roomTime:a}=e,{lastEmittedAtRoomTime:l,quantityEmitted:c,position:u}=s,d=s.emits??i.emits,h=s.period??i.period,p=s.maximum??i.maximum;if(c!==p&&l+h<a){const f=Gl(Vl(`${r}-${c}-${a}`,{...d,position:pe},e.roomJson));if(f===void 0)throw new Error("emitter failed to create a new item");Ee({room:e,item:f,atPosition:Uo(u,Oe(f.aabb,.5))}),n.state.lastEmittedAtRoomTime=e.roomTime+h,n.state.quantityEmitted++}},Tm=Object.freeze({textureId:"shadow.smallRound",spritesheetVariant:"original"}),km=z.x*.75,Im=500,_m=(n,e,t,o)=>{const{inputStateTracker:r}=t,s=n.type==="head"?n.state:n.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=n,u=$l(c);if(r.currentActionPress("fire")!=="released"&&a&&It(i)>0){const d={type:"firedDoughnut",...Qs,config:ie,id:`firedDoughnut/${n.id}/${e.roomTime}`,shadowCastTexture:Tm,state:{...Ks(),position:ue(l,Oe(u,km),n.type==="headOverHeels"?{z:z.z}:pe),vels:{fired:Oe(u,zo.firedDoughnut)},disappearing:{on:"touch"}}};Ee({room:e,item:d}),s.doughnuts=Wt(s.doughnuts,-1),r.inputWasHandled("fire",Im)}},bs={movementType:"vel",vels:{gravity:pe}},Rm=(n,e,t,o)=>{if(!Ao(n))return bs;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=n,l=Hl[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=Mn(i,e);return $o(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-hr*o,-l)}}}:bs}else return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-hr*o,-l)}}}};function*Pm(n,{roomTime:e},t,o){const r=e,s=e-o,i=[];for(let a=0;a<n.state.latentMovement.length;a++){const l=n.state.latentMovement[a];if(l.startAtRoomTime>r)continue;if(l.endAtRoomTime<=s){i.push(a);continue}if(l.fromStandingOn!==n.state.standingOnItemId){i.push(a);continue}const c=Math.max(l.startAtRoomTime,s),d=Math.min(l.endAtRoomTime,r)-c;d>0&&(yield{posDelta:Oe(l.velocity,d),movedBy:l.fromStandingOn}),l.endAtRoomTime<=r&&i.push(a)}for(let a=i.length-1;a>=0;a--)n.state.latentMovement.splice(i[a],1)}const ys=z.z,vs=.001,Mm={movementType:"vel",vels:{lift:pe}},Bm=({z:n,lowestZ:e,highestZ:t,direction:o,currentVelocity:r,deltaMS:s})=>{const i=De**2/(2*Ot);if(o==="up"){const a=t-n;if(a<=i){const l=Math.max(0,a);return Math.max(vs,Math.sqrt(2*Ot*l))}return r<De?Math.min(De,r+Ot*s):De}else{const a=n-e;if(a<=i){const l=Math.max(0,a);return Math.min(-vs,-Math.sqrt(2*Ot*l))}return r>-De?Math.max(-De,r-Ot*s):-De}},Am=({state:{direction:n,bottom:e,top:t,position:{z:o},vels:r}},s,i,a)=>{const l=e*ys,c=t*ys;if(l===c&&ye(o,l))return Mm;const u=r?.lift?.z??0,d=Bm({z:o,lowestZ:l,highestZ:c,direction:n,currentVelocity:u,deltaMS:a});if(Number.isNaN(d))throw new Error("velocity is NaN");const h=o<=l?"up":o>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:d}},stateDelta:{direction:h}}},ws={movementType:"vel",vels:{movingFloor:pe}},Om=(n,e,t,o)=>{if(ke(n)&&n.state.teleporting!==null)return ws;const{state:{standingOnItemId:r}}=n,s=Mn(r,e);if(s===null||!Nl(s))return ws;const{state:{direction:i}}=s,l=jl(n)&&n.state.action==="moving"&&Tn(n.state.facing)===Xl(i)?zo.heels:Yl,c=Oe(ql[i],l);return ti(s.id,n,e,!0,!1),{movementType:"vel",vels:{movingFloor:c}}},Fm=(n,e,t,o)=>{const r=n.x*n.x+n.y*n.y,s=e.x*e.x+e.y*e.y;if(r<Me||s<Me)return n;const i=Math.atan2(n.x*e.y-n.y*e.x,n.x*e.x+n.y*e.y),a=Math.abs(i);if(a<Me)return e;const l=a>Math.PI-Me?a:i,c=t*o,u=Math.max(-c,Math.min(c,l)),d=Math.cos(u),h=Math.sin(u);return{x:n.x*d-n.y*h,y:n.x*h+n.y*d,z:n.z}},Lm=.009,Em=(n,e,t,o)=>{const{state:{visualFacingVector:r,facing:s}}=n;return{movementType:"steady",stateDelta:{visualFacingVector:Fm(r??s,s,Lm,o)}}},zm=(n,e,t)=>{const o=Zl(n);if(o!==void 0){const r=o*Kl,s=Wo(e)/Math.max(t,Me);s>r&&Jl(e,r/s)}};function*Um(n,e,t,o){if(St(n)&&(yield Rm(n,e,t,o),yield Om(n,e)),ke(n)){if(yield oc(n,e,t,o),yield Em(n,e,t,o),yield rc(n,e,t,o),n.id===t.currentCharacterName){const r=sc(n);r&&Id(n,e,t,o),yield ic(n,e,t),r&&_d(n,e,t),ac(n)&&_m(n,e,t)}}else $o(n)?yield Am(n,e,t,o):lc(n)?(yield ym(n,e,t,o),yield cc(n,e,t,o)):uc(n)?Cm(n,e):dc(n)&&(yield Sm(n,e))}const Dm=(n,e,t,o)=>{if(!St(n)||n.state.standingOnItemId===null)return;const r=Mn(n.state.standingOnItemId,e);ke(n)&&r.type==="pickup"&&hc({gameState:t,movingItem:n,touchedItem:r,room:e});const{state:{disappearing:s}}=r;s!==null&&(s.byType===void 0||s.byType.includes(n.type))&&pc({touchedItem:r,gameState:t,room:e})},hn={x:0,y:0,z:0},Wm={x:0,y:0,z:0},Gm=(n,e,t,o)=>{if(ke(n)&&n.state.standingOnItemId!==null){const a=Mn(n.state.standingOnItemId,e);(zs(a)||a.type==="spikes")&&Ql({room:e,movingItem:n})}const r=Um(n,e,t,o).toArray();if(Dm(n,e,t),ec(hn,n,r),St(n)||$o(n)||tc(n))for(const a of Je(n.state.vels))js(hn,Xs(Wm,{...pe,...a},o));if(nc(n)&&cm(e,n,o),r.find(a=>a.movementType==="position")!==void 0||zm(n,hn,o),io({subjectItem:n,posDelta:hn,gameState:t,room:e,deltaMS:o,onTouch:ao}),St(n))for(const{movedBy:a,posDelta:l}of Pm(n,e,t,o))ti(a,n,e,l.x!==0||l.y!==0,l.z!==0),io({subjectItem:n,posDelta:l,gameState:t,room:e,deltaMS:o,onTouch:ao})},Vm=(n,e)=>{const t=new Set;for(const o of Vo(n)){const r=e[o.id];(r===void 0||!Ns(r,o.state.position))&&t.add(o)}return t},$m=(n,e)=>{const t=Rt(n);if(t===void 0)return kt;um(n,t,e);const o=Object.fromEntries(fc(t.items).map(([i,a])=>[i,a.state.position]));for(const i of Vo(t.items))hm(i,t)&&(Us({room:t,item:i}),ke(i)&&em(n,i));const r=mc(t.items).sort(pm);for(const i of r){const a=Mt(n);if(a===void 0||a.state.action==="death")break;if(t.items[i.id]!==void 0)try{Gm(i,t,n,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${i.id}"`,{cause:l})}}lm(t,e),tm(t),dm(t);const s=Vm(t.items,o);return gc(s,t,o,e),mm(t,s),s},Hm=ie,Nm=(n,e)=>(t,o)=>{const r=new Set;if(xc(t)){const u=Rt(t)?.items;if(u!==void 0){const d=ot(Je(Js(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const a=ht.shared.speed===0?1:Math.max(1,Math.ceil(o/e)),l=o/a;for(let u=0;u<a;u++){const d=n(t,l);for(const h of d)r.add(h)}const c=Rt(t)?.items??Hm;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},jm=(n,e,t,o)=>{if(e){const r=o.shade==="dimmed";td(n,e,t,o),ad(n,t,o),dd(n,r),md(n,r)}else Yi()},ze=`
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
`,Xm=`#version 300 es
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
}`,Ym={radius:1.2,cutoff:.88,intensity:.14,edgeBlur:.5};class qm extends q{uniforms;constructor(e={}){const t={...Ym,...e},o=Z.from({vertex:ze,fragment:Xm,name:"bloom-filter"});super({glProgram:o,resources:{bloomUniforms:{uRadius:{value:t.radius,type:"f32"},uCutoff:{value:t.cutoff,type:"f32"},uIntensity:{value:t.intensity,type:"f32"},uEdgeBlur:{value:t.edgeBlur,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.bloomUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const Zm=`#version 300 es
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
}`,Jm={gamma:1,saturation:1,brightness:1,brightnessBottom:0};class Ss extends q{uniforms;constructor(e={}){const t={...Jm,...e},o=Z.from({vertex:ze,fragment:Zm,name:"color-adjustment-filter"});super({glProgram:o,resources:{colorAdjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uBrightnessBottom:{value:t.brightnessBottom,type:"f32"}}}}),this.uniforms=this.resources.colorAdjustmentUniforms.uniforms}}const ba=(n,e)=>n.replace(/\{\{(\w+)\}\}/g,(t,o)=>{if(o in e){const r=e[o];return typeof r=="boolean"?r?"1":"0":String(r)}return console.warn(`Shader placeholder {{${o}}} not found in values map`),t}),Km=`#version 300 es
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
}`,Qm={curvatureX:.15,curvatureY:.15,multisampling:!0};class eg extends q{uniforms;constructor(e={}){const t={...Qm,...e},o=ba(Km,{MULTISAMPLE:t.multisampling}),r=Z.from({vertex:ze,fragment:o,name:"curvature-filter"});super({glProgram:r,resources:{curvatureUniforms:{uCurvatureX:{value:t.curvatureX,type:"f32"},uCurvatureY:{value:t.curvatureY,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.curvatureUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const tg=`#version 300 es
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
}`,ng={intensity:.04,scale:6,fps:30};class og extends q{uniforms;startTime;constructor(e={}){const t={...ng,...e},o=Z.from({vertex:ze,fragment:tg,name:"noise-filter"});super({glProgram:o,resources:{noiseUniforms:{uIntensity:{value:t.intensity,type:"f32"},uScale:{value:t.scale,type:"f32"},uFPS:{value:t.fps,type:"f32"},uTime:{value:0,type:"f32"}}}}),this.uniforms=this.resources.noiseUniforms.uniforms,this.startTime=performance.now()}apply(e,t,o,r){this.uniforms.uTime=performance.now()-this.startTime,super.apply(e,t,o,r)}}const rg=`#version 300 es
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
}`,sg={pixelWidth:4,maskBrightness:.7,numSamples:4,transitionWidth:.3};class ig extends q{uniforms;constructor(e={}){const t={...sg,...e},o=ba(rg,{NUM_SAMPLES:t.numSamples}),r=Z.from({vertex:ze,fragment:o,name:"phosphor-mask-filter"});super({glProgram:r,resources:{phosphorMaskUniforms:{uPixelWidth:{value:t.pixelWidth,type:"f32"},uMaskBrightness:{value:t.maskBrightness,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uTransitionWidth:{value:t.transitionWidth,type:"f32"}}}}),this.uniforms=this.resources.phosphorMaskUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const ag=`#version 300 es
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
}`,lg={pixelHeight:4,gapBrightness:.7};class cg extends q{uniforms;constructor(e={}){const t={...lg,...e},o=Z.from({vertex:ze,fragment:ag,name:"scanlines-filter"});super({glProgram:o,resources:{scanlinesUniforms:{uPixelHeight:{value:t.pixelHeight,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uGapBrightness:{value:t.gapBrightness,type:"f32"}}}}),this.uniforms=this.resources.scanlinesUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const ug=`#version 300 es
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
}`,dg={intensity:.4,radius:.8};class hg extends q{uniforms;constructor(e={}){const t={...dg,...e},o=Z.from({vertex:ze,fragment:ug,name:"vignette-filter"});super({glProgram:o,resources:{vignetteUniforms:{uIntensity:{value:t.intensity,type:"f32"},uRadius:{value:t.radius,type:"f32"}}}}),this.uniforms=this.resources.vignetteUniforms.uniforms}}const pg=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float uBlackPoint;
uniform sampler2D uTexture;

out vec4 finalColor;

void main() {
    vec4 colour = texture(uTexture, vTextureCoord);
    
    finalColor = (colour * (1.0-uBlackPoint)) + uBlackPoint;
}
`,fg={blackPoint:.04};class mg extends q{uniforms;constructor(e={}){const t={...fg,...e},o=Z.from({vertex:ze,fragment:pg,name:"raise-black-point-filter"});super({glProgram:o,resources:{raiseBlackPointUniforms:{uBlackPoint:{value:t.blackPoint,type:"f32"}}}}),this.uniforms=this.resources.raiseBlackPointUniforms.uniforms}}const Cs=.8,gg=1.2,xg=({crtFilter:n},e)=>n??nt.displaySettings.crtFilter?[new Ss({brightness:Cs}),new og({intensity:.03,fps:29.97,scale:5}),new cg({pixelHeight:e.gameEngineUpscale,gapBrightness:.5}),new ig({pixelWidth:e.gameEngineUpscale*1.1,maskBrightness:.6,numSamples:2,transitionWidth:.2}),new qm({radius:e.gameEngineUpscale/6,intensity:.1,cutoff:.8,edgeBlur:1}),new hg({intensity:.4,radius:.7}),new eg({curvatureX:.13,curvatureY:.12,multisampling:!0}),new mg({blackPoint:.03}),new Ss({gamma:1.1,saturation:1.35,brightness:1/Cs*gg,brightnessBottom:-.15})]:ia;Zf();const bg=Math.PI/2;class yg{constructor(e,t){this.app=e,this.gameState=t;try{const o=M.getState(),r=Mo(o);if(this.#n.connect(P.destination),e.stage.addChild(this.#s),e.stage.scale=r,Rt(t)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#i(o);return}}#e;#t;#o=new C({label:"MainLoop/worldContainer"});#n=P.createGain();#r=Nm($m,kc);#s=new C({label:"MainLoop/mainContainer",children:[this.#o]});#i(e){console.error(e),M.dispatch(bc(yc(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}},upscale:{upscale:t}}=M.getState();this.app.stage.filters=xg(e,t)}#a=e=>{try{this.#u(e)}catch(t){const o=new Error("Error caught in main loop tick",{cause:t});this.#i(o)}};#c({gameEngineUpscale:e,rotate90:t,gameEngineScreenSize:o}){const{app:{stage:r}}=this;r.scale=e,this.#s.rotation=t?bg:0,this.#s.position.x=t?o.y:0}#u=({deltaMS:e})=>{const t=M.getState(),o=je(t)?Yt:void 0;if(vc(t))return;const r=wc(t),{gameMenus:{userSettings:{displaySettings:s,soundSettings:i},gameInPlay:{freeCharacters:a}},upscale:{upscale:l}}=M.getState(),c=!r&&!(s?.uncolourised??nt.displaySettings.uncolourised);o?.startPhysics();const u=r?kt:this.#r(this.gameState,e);o?.endPhysics(),o?.startUpdateSceneGraph();const d=Rt(this.gameState),h=this.#t?.renderContext.room!==d;(h||c!==this.#t?.renderContext.general.colourised)&&d!==void 0&&jm(this.app.renderer,c,d.planet,d.color),o?.startHudUpdate();const p=Sc(t),f=Cc(t);hp(this.#e,c,p,f,l)&&(this.#e?.destroy(),this.#e=new dp({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1,onScreenControls:p},inputDirectionMode:f}),this.#s.addChild(this.#e.output)),this.#e.tick({screenSize:l.gameEngineScreenSize,deltaMS:e,room:d,freeCharacters:a}),o?.endHudUpdate();const x=pp(this.#t,h,l,s,i,r);if(x){if(this.#t?.destroy(),d){const g={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1,onScreenControls:p},room:d};this.#t=new $f(g,new Yf(g,new Uf(g))),this.#o.addChild(this.#t.output.graphics),this.#t.output.sound?.connect(this.#n)}else this.#t=void 0;this.#c(l),this.#l(),this.#s.boundsArea=new $t(0,0,l.rotate90?l.gameEngineScreenSize.y:l.gameEngineScreenSize.x,l.rotate90?l.gameEngineScreenSize.x:l.gameEngineScreenSize.y)}this.#t?.tick({movedItems:u,deltaMS:e}),o?.endUpdateSceneGraph();try{if(o?.startPixiRender(),this.app.render(),o?.endPixiRender(),x&&d){const g=new CustomEvent("firstRenderOfRoom",{detail:{roomId:d.id}});window.dispatchEvent(g)}}catch(g){throw new Error("Error in Pixi.js app.render()",{cause:g})}o?.tickDone(),this.app.ticker.maxFPS=r?10:Tc};start(){return this.app.ticker.add(this.#a),this}stop(){this.app.stage.removeChild(this.#s),this.#n.disconnect(),this.#t?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.#a)}}Ht.defaultOptions.scaleMode="nearest";const Pg=async(n,e)=>{const t=new Oc,[o]=await Promise.all([Nu(n),t.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0})]);if(t.renderer.gl.drawingBufferColorSpace="display-p3",o.error)throw new Error(`could not load campaign ${JSON.stringify(n)}`,{cause:o.error});const r=o.data;Ic(t.renderer),$u(t.renderer),ju(t),window._e2e_pixiApplication=t,globalThis.__PIXI_APP__=t;const s=_c(M.getState(),n),i=pr({campaign:r,inputStateTracker:e,savedGame:s});if(s!==void 0){const l=s.store.gameMenus.gameInPlay;M.dispatch(Rc(l))}else i.characterRooms.head&&M.dispatch(fr(i.characterRooms.head.id)),i.characterRooms.heels&&M.dispatch(fr(i.characterRooms.heels.id));const a=new yg(t,i).start();return{campaign:r,renderIn(l){l.appendChild(t.canvas)},resizeTo(l,c){c?t.renderer.resize(l.y,l.x):t.renderer.resize(l.x,l.y)},changeRoom(l){const c=Mt(i);c!==void 0&&Pc({playableItem:c,gameState:i,toRoomId:l,changeType:"level-select"})},get currentRoom(){return Rt(i)},get gameState(){return i},reincarnateFrom(l){pr({campaign:r,inputStateTracker:e,savedGame:l,writeInto:i})},stop(){console.warn("tearing down game"),t.canvas.parentNode?.removeChild(t.canvas),a.stop(),t.destroy()}}};export{Pg as default,Pg as gameMain};
