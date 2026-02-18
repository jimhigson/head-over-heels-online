import{X as K,Z as qo,_ as Q,L as nn,T as Y,d as z,bU as Ne,C as ae,b4 as dl,q as Be,v as lt,B as so,b as gt,a5 as re,o as nt,U as hl,M as Ae,bV as St,c as pl,P as vn,m as fl,W as ml,N as gl,V as xl,b6 as yl,b9 as bl,y as vl,A as li,af as wl,bW as Sl,R as Cl,l as zt,bX as ci,bY as Tl,D as An,n as zr,ac as on,j as Zo,F as Wn,w as Ko,E as kl,u as Il,bZ as xt,b_ as Lr,b$ as Er,c0 as Pl,a2 as Rl,a3 as ui,ab as rn,p as C,c1 as _l,c2 as Ml,c3 as ut,c4 as Mt,c5 as Ur,c6 as io,c7 as ao,c8 as Bl,c9 as We,aF as pt,ae as dt,t as di,ca as sn,ao as ce,cb as k,cc as Al,K as Ol,bx as de,aC as hi,cd as Gr,aA as A,ce as Qo,cf as Fl,ay as ft,cg as ht,ch as er,ci as pi,aG as Dl,cj as ot,ck as fi,cl as mi,cm as zl,bA as gi,cn as rt,co as Bt,cp as Ll,cq as Xn,cr as Wr,cs as tr,ct as we,cu as El,cv as mt,ar as H,cw as ye,b0 as N,cx as Ul,cy as un,aW as an,cz as Lt,cA as Fe,cB as le,cC as Gl,aO as dn,cD as hn,aY as Ge,aV as Et,cE as Yn,cF as Wl,cG as Vl,cH as Hl,cI as $l,cJ as nr,bE as Ve,bD as pn,x as xi,cK as Nl,cL as yi,cM as Vn,bO as or,cN as wn,cO as Ro,cP as jl,cQ as Xl,cR as rr,cS as bi,cT as Yl,cU as Jl,cV as be,cW as ql,aQ as fn,cX as Zl,cY as mn,cZ as Te,c_ as He,c$ as Kl,d0 as Ql,d1 as ec,d2 as sr,d3 as vi,d4 as Hn,d5 as ir,d6 as wi,d7 as je,d8 as tc,d9 as Si,da as Ci,db as nc,dc as On,dd as ar,de as oc,df as rc,dg as sc,dh as he,di as ic,dj as ac,dk as J,dl as lc,dm as cc,dn as uc,dp as Fn,dq as Ti,aR as pe,dr as lr,ds as dc,dt as cr,aL as ki,du as ur,dv as lo,dw as _o,bM as $n,dx as Vr,bL as Jn,dy as Mo,dz as dr,dA as hr,dB as Ii,a$ as pr,dC as Pi,aP as At,dD as fr,dE as qn,dF as hc,dG as mr,dH as F,dI as Rt,aN as pc,ai as fc,f as xe,dJ as Dn,dK as mc,dL as gc,dM as Zn,dN as xc,dO as yc,dP as Hr,dQ as bc,dR as Ri,dS as gr,dT as zn,dU as _i,dV as Mi,dW as Qt,dX as Ot,dY as vc,dZ as Bi,d_ as wc,d$ as Sc,e0 as Cc,e1 as Tc,bJ as Ut,e2 as Sn,e3 as Cn,e4 as M,e5 as Bo,e6 as Ai,e7 as Gt,aq as xr,e8 as Oi,e9 as kc,ea as Ic,eb as Pc,ec as Rc,ed as _c,bC as Mc,ee as Pe,ef as Fi,eg as Bc,eh as Ac,ei as Oc,ej as $r,ek as Nr,el as Fc,em as Di,bQ as zi,en as Dc,an as zc,eo as Lc,ep as yr,eq as Ec,er as Li,aK as Uc,es as Gc,aI as Wc,et as Vc,eu as br,ev as Hc,ew as $t,ex as Je,ey as $c,ez as Nc,aT as jc,eA as Xc,eB as Yc,eC as Jc,eD as qc,eE as Zc,eF as Kc,eG as Qc,eH as eu,eI as tu,eJ as nu,bK as Ft,eK as ou,eL as ru,eM as su,eN as iu,eO as au,eP as lu,eQ as cu,eR as uu,eS as du,eT as hu,eU as pu,eV as fu,eW as mu,eX as jr,eY as gu,eZ as Xr}from"./App-BXuZWElz.js";import{s as w,a as Kn,g as Ei}from"./spritesheetPalette-CzWQoMjj.js";import{v as xu,b as yu,h as Le,s as bu,A as vu}from"./spectrumLut-C7r_7MCR.js";import{r as te,g as Ao,p as Oo,b as vr,c as wr,a as Me,d as Dt,e as Ui,f as Yr,s as Jr,h as wu,i as Su,j as Cu}from"./pixiContainerToString-C25dflba.js";import{c as Tu}from"./canvasUtils-BA9Acge-.js";import{a as ku,b as Iu}from"./localUniformBit-BOGrcT1E.js";import{C as qr}from"./CanvasPool-njU718b8.js";import{B as Pu}from"./BatchableSprite-qOYjpB38.js";import"./index-BWiMp7rh.js";var Ru=`
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
`,_u=`in vec2 aPosition;
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
`,Mu=`
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
}`;class j extends K{constructor(e){const t=e.gpu,o=Zr({source:Mu,...t}),r=qo.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),s=e.gl,i=Zr({source:Ru,...s}),a=Q.from({vertex:_u,fragment:i}),l=new nn({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:Y.EMPTY}})}}function Zr(n){const{source:e,functions:t,main:o}=n;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",o)}const Sr=`
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
    `,Cr=`
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
	`;class Gi extends j{constructor(){super({gl:{functions:`
                ${Sr}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Cr}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Gi.extension={name:"color",type:z.BlendMode};class Wi extends j{constructor(){super({gl:{functions:`
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
            `}})}}Wi.extension={name:"color-burn",type:z.BlendMode};class Vi extends j{constructor(){super({gl:{functions:`
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
                `}})}}Vi.extension={name:"color-dodge",type:z.BlendMode};class Hi extends j{constructor(){super({gl:{functions:`
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
                `}})}}Hi.extension={name:"darken",type:z.BlendMode};class $i extends j{constructor(){super({gl:{functions:`
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
            `}})}}$i.extension={name:"difference",type:z.BlendMode};class Ni extends j{constructor(){super({gl:{functions:`
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
            `}})}}Ni.extension={name:"divide",type:z.BlendMode};class ji extends j{constructor(){super({gl:{functions:`
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
            `}})}}ji.extension={name:"exclusion",type:z.BlendMode};class Xi extends j{constructor(){super({gl:{functions:`
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
                `}})}}Xi.extension={name:"hard-light",type:z.BlendMode};class Yi extends j{constructor(){super({gl:{functions:`
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
            `}})}}Yi.extension={name:"hard-mix",type:z.BlendMode};class Ji extends j{constructor(){super({gl:{functions:`
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
            `}})}}Ji.extension={name:"lighten",type:z.BlendMode};class qi extends j{constructor(){super({gl:{functions:`
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
                `}})}}qi.extension={name:"linear-burn",type:z.BlendMode};class Zi extends j{constructor(){super({gl:{functions:`
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
            `}})}}Zi.extension={name:"linear-dodge",type:z.BlendMode};class Ki extends j{constructor(){super({gl:{functions:`
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
            `}})}}Ki.extension={name:"linear-light",type:z.BlendMode};class Qi extends j{constructor(){super({gl:{functions:`
                ${Sr}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Cr}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Qi.extension={name:"luminosity",type:z.BlendMode};class ea extends j{constructor(){super({gl:{functions:`
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
            `}})}}ea.extension={name:"negation",type:z.BlendMode};class ta extends j{constructor(){super({gl:{functions:`
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
                `}})}}ta.extension={name:"overlay",type:z.BlendMode};class na extends j{constructor(){super({gl:{functions:`
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
                `}})}}na.extension={name:"pin-light",type:z.BlendMode};class oa extends j{constructor(){super({gl:{functions:`
                ${Sr}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Cr}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}oa.extension={name:"saturation",type:z.BlendMode};class ra extends j{constructor(){super({gl:{functions:`
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
                `}})}}ra.extension={name:"soft-light",type:z.BlendMode};class sa extends j{constructor(){super({gl:{functions:`
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
                `}})}}sa.extension={name:"subtract",type:z.BlendMode};class ia extends j{constructor(){super({gl:{functions:`
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
                `}})}}ia.extension={name:"vivid-light",type:z.BlendMode};var Bu=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Kr=`struct GlobalFilterUniforms {
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
}`;const aa=class la extends K{constructor(e){e={...la.defaultOptions,...e};const t=qo.from({vertex:{source:Kr,entryPoint:"mainVertex"},fragment:{source:Kr,entryPoint:"mainFragment"}}),o=Q.from({vertex:Ne,fragment:Bu,name:"alpha-filter"}),{alpha:r,...s}=e,i=new nn({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:t,glProgram:o,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};aa.defaultOptions={alpha:1};let Au=aa;var Ou=`
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
`,Qr=`struct GlobalFilterUniforms {
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
}`;class Fu extends K{constructor(e={}){const t=new nn({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),o=qo.from({vertex:{source:Qr,entryPoint:"mainVertex"},fragment:{source:Qr,entryPoint:"mainFragment"}}),r=Q.from({vertex:Ne,fragment:Ou,name:"color-matrix-filter"});super({...e,gpuProgram:o,glProgram:r,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let o=e;t&&(this._multiply(o,this.matrix,e),o=this._colorMatrix(o)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=o,this.resources.colorMatrixUniforms.update()}_multiply(e,t,o){return e[0]=t[0]*o[0]+t[1]*o[5]+t[2]*o[10]+t[3]*o[15],e[1]=t[0]*o[1]+t[1]*o[6]+t[2]*o[11]+t[3]*o[16],e[2]=t[0]*o[2]+t[1]*o[7]+t[2]*o[12]+t[3]*o[17],e[3]=t[0]*o[3]+t[1]*o[8]+t[2]*o[13]+t[3]*o[18],e[4]=t[0]*o[4]+t[1]*o[9]+t[2]*o[14]+t[3]*o[19]+t[4],e[5]=t[5]*o[0]+t[6]*o[5]+t[7]*o[10]+t[8]*o[15],e[6]=t[5]*o[1]+t[6]*o[6]+t[7]*o[11]+t[8]*o[16],e[7]=t[5]*o[2]+t[6]*o[7]+t[7]*o[12]+t[8]*o[17],e[8]=t[5]*o[3]+t[6]*o[8]+t[7]*o[13]+t[8]*o[18],e[9]=t[5]*o[4]+t[6]*o[9]+t[7]*o[14]+t[8]*o[19]+t[9],e[10]=t[10]*o[0]+t[11]*o[5]+t[12]*o[10]+t[13]*o[15],e[11]=t[10]*o[1]+t[11]*o[6]+t[12]*o[11]+t[13]*o[16],e[12]=t[10]*o[2]+t[11]*o[7]+t[12]*o[12]+t[13]*o[17],e[13]=t[10]*o[3]+t[11]*o[8]+t[12]*o[13]+t[13]*o[18],e[14]=t[10]*o[4]+t[11]*o[9]+t[12]*o[14]+t[13]*o[19]+t[14],e[15]=t[15]*o[0]+t[16]*o[5]+t[17]*o[10]+t[18]*o[15],e[16]=t[15]*o[1]+t[16]*o[6]+t[17]*o[11]+t[18]*o[16],e[17]=t[15]*o[2]+t[16]*o[7]+t[17]*o[12]+t[18]*o[17],e[18]=t[15]*o[3]+t[16]*o[8]+t[17]*o[13]+t[18]*o[18],e[19]=t[15]*o[4]+t[16]*o[9]+t[17]*o[14]+t[18]*o[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const o=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(o,t)}tint(e,t){const[o,r,s]=ae.shared.setValue(e).toArray(),i=[o,0,0,0,0,0,r,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const o=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(o,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const o=Math.cos(e),r=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=o+(1-o)*i,c=i*(1-o)-a*r,u=i*(1-o)+a*r,d=i*(1-o)+a*r,h=o+i*(1-o),p=i*(1-o)-a*r,f=i*(1-o)-a*r,m=i*(1-o)+a*r,g=o+i*(1-o),x=[l,c,u,0,0,d,h,p,0,0,f,m,g,0,0,0,0,0,1,0];this._loadMatrix(x,t)}contrast(e,t){const o=(e||0)+1,r=-.5*(o-1),s=[o,0,0,0,r,0,o,0,0,r,0,0,o,0,r,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const o=e*2/3+1,r=(o-1)*-.5,s=[o,r,r,0,0,r,o,r,0,0,r,r,o,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,o,r,s){e||(e=.2),t||(t=.15),o||(o=16770432),r||(r=3375104);const i=ae.shared,[a,l,c]=i.setValue(o).toArray(),[u,d,h]=i.setValue(r).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,t,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,s)}night(e,t){e||(e=.1);const o=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(o,t)}predator(e,t){const o=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(o,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}const ca=class ua extends dl{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(Be(lt,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...ua.defaultOptions,...t};const o=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let r=t.uvs;r||(t.positions?r=new Float32Array(o.length):r=new Float32Array([0,0,1,0,1,1,0,1]));const s=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,a=new so({data:o,label:"attribute-mesh-positions",shrinkToFit:i,usage:gt.VERTEX|gt.COPY_DST}),l=new so({data:r,label:"attribute-mesh-uvs",shrinkToFit:i,usage:gt.VERTEX|gt.COPY_DST}),c=new so({data:s,label:"index-mesh-buffer",shrinkToFit:i,usage:gt.INDEX|gt.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:c,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};ca.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let da=ca;class Du{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),o=t.data;let r=o;const s=this.texture.textureMatrix;return s.isSimple||(r=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!r||r.length<o.length)&&(r=this._transformedUvs=new Float32Array(o.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(o,r))),r}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class Ie extends re{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=t,[p]=u;super({...h,texture:p instanceof Y?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(nt.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(nt.shared.add(this.update,this,hl.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,o=this.animationSpeed*t,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=o/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const o=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(r=>{this.texture!==r&&r.destroy(o)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let o=0;o<e.length;++o)t.push(Y.from(e[o]));return new Ie(t)}static fromImages(e){const t=[];for(let o=0;o<e.length;++o)t.push(Y.from(e[o]));return new Ie(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof Y)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(nt.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(nt.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class zu{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new Ae,this.observer=t,this.position=new St(this,0,0),this.scale=new St(this,1,1),this.pivot=new St(this,0,0),this.skew=new St(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const Tn=new Ae,Nt=new Ae,Ce=[new vn,new vn,new vn,new vn];class ha{constructor(e){this._renderer=e}validateRenderable(e){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}updateRenderable(e){}execute(e){const t=this._renderer,o=t.canvasContext,r=o.activeContext;r.save(),o.setBlendMode(e.groupBlendMode);const s=t.globalUniforms.globalUniformData?.worldColor??4294967295,i=e.groupColorAlpha,a=(s>>>24&255)/255,l=(i>>>24&255)/255,c=t.filter?.alphaMultiplier??1,u=a*l*c;if(u<=0){r.restore();return}r.globalAlpha=u;const d=s&16777215,h=i&16777215,p=pl(fl(h,d)),f=e.texture,m=Tu.getTintedPattern(f,p),g=e.width,x=e.height,R=e.groupTransform,_=f.source._resolution??f.source.resolution??1;Nt.copyFrom(e._tileTransform.matrix),e.applyAnchorToTexture||Nt.translate(-e.anchor.x*g,-e.anchor.y*x),Nt.scale(1/_,1/_),Tn.identity(),Tn.prepend(Nt),Tn.prepend(R);const b=t._roundPixels|e._roundPixels;o.setContextTransform(Tn,b===1),r.fillStyle=m;const y=e.anchor.x*-g,v=e.anchor.y*-x;Ce[0].set(y,v),Ce[1].set(y+g,v),Ce[2].set(y+g,v+x),Ce[3].set(y,v+x);for(let I=0;I<4;I++)Nt.applyInverse(Ce[I],Ce[I]);r.beginPath(),r.moveTo(Ce[0].x,Ce[0].y);for(let I=1;I<4;I++)r.lineTo(Ce[I].x,Ce[I].y);r.closePath(),r.fill(),r.restore()}destroy(){this._renderer=null}}ha.extension={type:[z.CanvasPipes],name:"tilingSprite"};const Lu={name:"tiling-bit",vertex:{header:`
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
        `}},Eu={name:"tiling-bit",vertex:{header:`
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

        `}};let co,uo;class Uu extends ml{constructor(){co??(co=gl({name:"tiling-sprite-shader",bits:[ku,Lu,xl]})),uo??(uo=yl({name:"tiling-sprite-shader",bits:[Iu,Eu,bl]}));const e=new nn({uMapCoord:{value:new Ae,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new Ae,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:uo,gpuProgram:co,resources:{localUniforms:new nn({uTransformMatrix:{value:new Ae,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:Y.EMPTY.source,uSampler:Y.EMPTY.source.style}})}updateUniforms(e,t,o,r,s,i){const a=this.resources.tilingUniforms,l=i.width,c=i.height,u=i.textureMatrix,d=a.uniforms.uTextureTransform;d.set(o.a*l/e,o.b*l/t,o.c*c/e,o.d*c/t,o.tx/e,o.ty/t),d.invert(),a.uniforms.uMapCoord=u.mapCoord,a.uniforms.uClampFrame=u.uClampFrame,a.uniforms.uClampOffset=u.uClampOffset,a.uniforms.uTextureTransform=d,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=r,a.uniforms.uSizeAnchor[3]=s,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class Gu extends da{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Wu(n,e){const t=n.anchor.x,o=n.anchor.y;e[0]=-t*n.width,e[1]=-o*n.height,e[2]=(1-t)*n.width,e[3]=-o*n.height,e[4]=(1-t)*n.width,e[5]=(1-o)*n.height,e[6]=-t*n.width,e[7]=(1-o)*n.height}function Vu(n,e,t,o){let r=0;const s=n.length/e,i=o.a,a=o.b,l=o.c,c=o.d,u=o.tx,d=o.ty;for(t*=e;r<s;){const h=n[t],p=n[t+1];n[t]=i*h+l*p+u,n[t+1]=a*h+c*p+d,t+=e,r++}}function Hu(n,e){const t=n.texture,o=t.frame.width,r=t.frame.height;let s=0,i=0;n.applyAnchorToTexture&&(s=n.anchor.x,i=n.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-i,e[5]=e[7]=1-i;const a=Ae.shared;a.copyFrom(n._tileTransform.matrix),a.tx/=n.width,a.ty/=n.height,a.invert(),a.scale(n.width/o,n.height/r),Vu(e,2,0,a)}const Ln=new Gu;class $u{constructor(){this.canBatch=!0,this.geometry=new da({indices:Ln.indices.slice(),positions:Ln.positions.slice(),uvs:Ln.uvs.slice()})}destroy(){this.geometry.destroy(),this.shader?.destroy()}}class pa{constructor(e){this._state=vl.default2d,this._renderer=e,this._managedTilingSprites=new li({renderer:e,type:"renderable",name:"tilingSprite"})}validateRenderable(e){const t=this._getTilingSpriteData(e),o=t.canBatch;this._updateCanBatch(e);const r=t.canBatch;if(r&&r===o){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return o!==r}addRenderable(e,t){const o=this._renderer.renderPipes.batch;this._updateCanBatch(e);const r=this._getTilingSpriteData(e),{geometry:s,canBatch:i}=r;if(i){r.batchableMesh||(r.batchableMesh=new Du);const a=r.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=s,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,o.addToBatch(a,t)}else o.break(t),r.shader||(r.shader=new Uu),this.updateRenderable(e),t.add(e)}execute(e){const t=this._renderer,{shader:o}=this._getTilingSpriteData(e);o.groups[0]=t.globalUniforms.bindGroup;const r=o.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=t._roundPixels|e._roundPixels,wl(e.groupColorAlpha,r.uColor,0),this._state.blendMode=Sl(e.groupBlendMode,e.texture._source),t.encoder.draw({geometry:Ln,shader:o,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:o}=t;if(o){const{batchableMesh:r}=t;e.didViewUpdate&&this._updateBatchableMesh(e),r._batcher.updateElement(r)}else if(e.didViewUpdate){const{shader:r}=t;r.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new $u;return t.renderable=e,e._gpuData[this._renderer.uid]=t,this._managedTilingSprites.add(e),t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:o}=t,r=e.texture.source.style;r.addressMode!=="repeat"&&(r.addressMode="repeat",r.update()),Hu(e,o.uvs),Wu(e,o.positions)}destroy(){this._managedTilingSprites.destroy(),this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),o=e.texture;let r=!0;return this._renderer.type===Cl.WEBGL&&(r=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=o.textureMatrix.isSimple&&(r||o.source.isPowerOfTwo),t.canBatch}}pa.extension={type:[z.WebGLPipes,z.WebGPUPipes],name:"tilingSprite"};zt.add(ha);zt.add(pa);const fa=class En extends ci{constructor(...e){let t=e[0]||{};t instanceof Y&&(t={texture:t}),e.length>1&&(Be(lt,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...En.defaultOptions,...t};const{texture:o,anchor:r,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=t??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new St({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=o,this._width=l??o.width,this._height=c??o.height,this._tileTransform=new zu({observer:{_onUpdate:()=>this.onViewUpdate()}}),r&&(this.anchor=r),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=d??!1}static from(e,t={}){return typeof e=="string"?new En({texture:Tl.get(e),...t}):new En({texture:e,...t})}get uvRespectAnchor(){return Be(lt,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){Be(lt,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=Y.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,o=this._width,r=this._height;e.minX=-t._x*o,e.maxX=e.minX+o,e.minY=-t._y*r,e.maxY=e.minY+r}containsPoint(e){const t=this._width,o=this._height,r=-t*this._anchor._x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-o*this._anchor._y,e.y>=s&&e.y<=s+o)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const o=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(o)}this._texture=null}};fa.defaultOptions={texture:Y.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let Nu=fa;class ju extends ci{constructor(e,t){const{text:o,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=o??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new St({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,o=this.bounds.height,r=-t*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-o*this.anchor.y,e.y>=s&&e.y<=s+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function Xu(n,e){let t=n[0]??{};return(typeof t=="string"||n[1])&&(Be(lt,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:n[1]}),t}let qe=null,_e=null;function Yu(n,e){qe||(qe=An.get().createCanvas(256,128),_e=qe.getContext("2d",{willReadFrequently:!0}),_e.globalCompositeOperation="copy",_e.globalAlpha=1),(qe.width<n||qe.height<e)&&(qe.width=zr(n),qe.height=zr(e))}function es(n,e,t){for(let o=0,r=4*t*e;o<e;++o,r+=4)if(n[r+3]!==0)return!1;return!0}function ts(n,e,t,o,r){const s=4*e;for(let i=o,a=o*s+4*t;i<=r;++i,a+=s)if(n[a+3]!==0)return!1;return!0}function Ju(...n){let e=n[0];e.canvas||(e={canvas:n[0],resolution:n[1]});const{canvas:t}=e,o=Math.min(e.resolution??1,1),r=e.width??t.width,s=e.height??t.height;let i=e.output;if(Yu(r,s),!_e)throw new TypeError("Failed to get canvas 2D context");_e.drawImage(t,0,0,r,s,0,0,r*o,s*o);const l=_e.getImageData(0,0,r,s).data;let c=0,u=0,d=r-1,h=s-1;for(;u<s&&es(l,r,u);)++u;if(u===s)return on.EMPTY;for(;es(l,r,h);)--h;for(;ts(l,r,c,u,h);)++c;for(;ts(l,r,d,u,h);)--d;return++d,++h,_e.globalCompositeOperation="source-over",_e.strokeRect(c,u,d-c,h-u),_e.globalCompositeOperation="copy",i??(i=new on),i.set(c/o,u/o,(d-c)/o,(h-u)/o),i}class qu{constructor(e=0,t=0,o=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=o,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){const t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){const t=new Array(e.length);for(let o=0;o<e.length;o++){const r=e[o];t[o]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){const t=this.first;delete this.items[t.key],--this.size===0?(this.first=null,this.last=null):(this.first=t.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){const t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){const e=new Array(this.size);let t=this.first,o=0;for(;t!==null;)e[o++]=t.key,t=t.next;return e}setWithEvicted(e,t,o=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,o);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=s:this.last.next=s,this.last=s}return r}set(e,t,o=!1,r=this.resetTtl){let s=this.items[e];return o||s!==void 0?(s.value=t,o===!1&&r&&(s.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(s)):(this.max>0&&this.size===this.max&&this.evict(!0),s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=s:this.last.next=s,this.last=s),this}values(e=this.keys()){const t=new Array(e.length);for(let o=0;o<e.length;o++)t[o]=this.get(e[o]);return t}}function Zu(n=1e3,e=0,t=!1){if(isNaN(n)||n<0)throw new TypeError("Invalid max value");if(isNaN(e)||e<0)throw new TypeError("Invalid ttl value");if(typeof t!="boolean")throw new TypeError("Invalid resetTtl value");return new qu(n,e,t)}function ma(n){return!!n.tagStyles&&Object.keys(n.tagStyles).length>0}function ga(n){return n.includes("<")}function Ku(n,e){return n.clone().assign(e)}function Qu(n,e){const t=[],o=e.tagStyles;if(!ma(e)||!ga(n))return t.push({text:n,style:e}),t;const r=[e],s=[];let i="",a=0;for(;a<n.length;){const l=n[a];if(l==="<"){const c=n.indexOf(">",a);if(c===-1){i+=l,a++;continue}const u=n.slice(a+1,c);if(u.startsWith("/")){const d=u.slice(1).trim();if(s.length>0&&s[s.length-1]===d){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i=""),r.pop(),s.pop(),a=c+1;continue}else{i+=n.slice(a,c+1),a=c+1;continue}}else{const d=u.trim();if(o[d]){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i="");const h=r[r.length-1],p=Ku(h,o[d]);r.push(p),s.push(d),a=c+1;continue}else{i+=n.slice(a,c+1),a=c+1;continue}}}else i+=l,a++}return i.length>0&&t.push({text:i,style:r[r.length-1]}),t}const ed=[10,13],td=new Set(ed),nd=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],od=new Set(nd),rd=/(\r\n|\r|\n)/,sd=/(?:\r\n|\r|\n)/;function Tr(n){return typeof n!="string"?!1:td.has(n.charCodeAt(0))}function ve(n,e){return typeof n!="string"?!1:od.has(n.charCodeAt(0))}function xa(n){return n==="normal"||n==="pre-line"}function ya(n){return n==="normal"}function Re(n){if(typeof n!="string")return"";let e=n.length-1;for(;e>=0&&ve(n[e]);)e--;return e<n.length-1?n.slice(0,e+1):n}function ba(n){const e=[],t=[];if(typeof n!="string")return e;for(let o=0;o<n.length;o++){const r=n[o],s=n[o+1];if(ve(r)||Tr(r)){t.length>0&&(e.push(t.join("")),t.length=0),r==="\r"&&s===`
`?(e.push(`\r
`),o++):e.push(r);continue}t.push(r)}return t.length>0&&e.push(t.join("")),e}function va(n,e,t,o){const r=t(n),s=[];for(let i=0;i<r.length;i++){let a=r[i],l=a,c=1;for(;r[i+c];){const u=r[i+c];if(!o(l,u,n,i,e))a+=u,l=u,c++;else break}i+=c-1,s.push(a)}return s}const id=/\r\n|\r|\n/g;function ad(n,e,t,o,r,s,i,a){const l=Qu(n,e);if(ya(e.whiteSpace))for(let G=0;G<l.length;G++){const $=l[G];l[G]={text:$.text.replace(id," "),style:$.style}}const u=[];let d=[];for(const G of l){const $=G.text.split(rd);for(let ee=0;ee<$.length;ee++){const W=$[ee];W===`\r
`||W==="\r"||W===`
`?(u.push(d),d=[]):W.length>0&&d.push({text:W,style:G.style})}}(d.length>0||u.length===0)&&u.push(d);const h=t?ld(u,e,o,r,i,a):u,p=[],f=[],m=[],g=[],x=[];let R=0;const _=e._fontString,b=s(_);b.fontSize===0&&(b.fontSize=e.fontSize,b.ascent=e.fontSize);let y="",v=!!e.dropShadow;for(const G of h){let $=0,ee=b.ascent,W=b.descent,V="";for(const q of G){const se=q.style._fontString,fe=s(se);se!==y&&(o.font=se,y=se);const Se=r(q.text,q.style.letterSpacing,o);$+=Se,ee=Math.max(ee,fe.ascent),W=Math.max(W,fe.descent),V+=q.text,!v&&q.style.dropShadow&&(v=!0)}G.length===0&&(ee=b.ascent,W=b.descent),p.push($),f.push(ee),m.push(W),x.push(V);const O=e.lineHeight||ee+W;g.push(O+e.leading),R=Math.max(R,$)}const I=e._stroke?.width||0,E=(t&&e.align!=="left"&&e.align!=="justify"?Math.max(R,e.wordWrapWidth):R)+I+(e.dropShadow?e.dropShadow.distance:0);let B=0;for(let G=0;G<g.length;G++)B+=g[G];B=Math.max(B,g[0]+I);const U=B+(e.dropShadow?e.dropShadow.distance:0),L=e.lineHeight||b.fontSize;return{width:E,height:U,lines:x,lineWidths:p,lineHeight:L+e.leading,maxLineWidth:R,fontProperties:b,runsByLine:h,lineAscents:f,lineDescents:m,lineHeights:g,hasDropShadow:v}}function ld(n,e,t,o,r,s){const{letterSpacing:i,whiteSpace:a,wordWrapWidth:l,breakWords:c}=e,u=xa(a),d=l+i,h={};let p="";const f=(g,x)=>{const R=`${g}|${x.styleKey}`;let _=h[R];if(_===void 0){const b=x._fontString;b!==p&&(t.font=b,p=b),_=o(g,x.letterSpacing,t)+x.letterSpacing,h[R]=_}return _},m=[];for(const g of n){const x=cd(g),R=m.length,_=B=>{let U=0,L=B;do{const{token:G,style:$}=x[L];U+=f(G,$),L++}while(L<x.length&&x[L].continuesFromPrevious);return U},b=B=>{const U=[];let L=B;do U.push({token:x[L].token,style:x[L].style}),L++;while(L<x.length&&x[L].continuesFromPrevious);return U};let y=[],v=0,I=!u,T=null;const D=()=>{T&&T.text.length>0&&y.push(T),T=null},E=()=>{if(D(),y.length>0){const B=y[y.length-1];B.text=Re(B.text),B.text.length===0&&y.pop()}m.push(y),y=[],v=0,I=!1};for(let B=0;B<x.length;B++){const{token:U,style:L,continuesFromPrevious:G}=x[B],$=f(U,L);if(u){const V=ve(U),O=T?.text[T.text.length-1]??y[y.length-1]?.text.slice(-1)??"",q=O?ve(O):!1;if(V&&q)continue}const ee=!G,W=ee?_(B):$;if(W>d&&ee)if(v>0&&E(),c){const V=b(B);for(let O=0;O<V.length;O++){const q=V[O].token,se=V[O].style,fe=va(q,c,s,r);for(const Se of fe){const Ye=f(Se,se);Ye+v>d&&E(),!T||T.style!==se?(D(),T={text:Se,style:se}):T.text+=Se,v+=Ye}}B+=V.length-1}else{const V=b(B);D(),m.push(V.map(O=>({text:O.token,style:O.style}))),I=!1,B+=V.length-1}else if(W+v>d&&ee){if(ve(U)){I=!1;continue}E(),T={text:U,style:L},v=$}else if(G&&!c)!T||T.style!==L?(D(),T={text:U,style:L}):T.text+=U,v+=$;else{const V=ve(U);if(v===0&&V&&!I)continue;!T||T.style!==L?(D(),T={text:U,style:L}):T.text+=U,v+=$}}if(D(),y.length>0){const B=y[y.length-1];B.text=Re(B.text),B.text.length===0&&y.pop()}(y.length>0||m.length===R)&&m.push(y)}return m}function cd(n){const e=[];let t=!1;for(const o of n){const r=ba(o.text);let s=!0;for(const i of r){const a=ve(i)||Tr(i),l=s&&t&&!a;e.push({token:i,style:o.style,continuesFromPrevious:l}),t=!a,s=!1}}return e}const ud={willReadFrequently:!0};function ns(n,e,t,o,r){let s=t[n];return typeof s!="number"&&(s=r(n,e,o)+e,t[n]=s),s}function dd(n,e,t,o,r,s,i){const a=t.getContext("2d",ud);a.font=e._fontString;let l=0,c="";const u=[],d=Object.create(null),{letterSpacing:h,whiteSpace:p}=e,f=xa(p),m=ya(p);let g=!f;const x=e.wordWrapWidth+h,R=ba(n);for(let b=0;b<R.length;b++){let y=R[b];if(Tr(y)){if(!m){u.push(Re(c)),g=!f,c="",l=0;continue}y=" "}if(f){const I=ve(y),T=ve(c[c.length-1]);if(I&&T)continue}const v=ns(y,h,d,a,o);if(v>x)if(c!==""&&(u.push(Re(c)),c="",l=0),r(y,e.breakWords)){const I=va(y,e.breakWords,i,s);for(const T of I){const D=ns(T,h,d,a,o);D+l>x&&(u.push(Re(c)),g=!1,c="",l=0),c+=T,l+=D}}else c.length>0&&(u.push(Re(c)),c="",l=0),u.push(Re(y)),g=!1,c="",l=0;else v+l>x&&(g=!1,u.push(Re(c)),c="",l=0),(c.length>0||!ve(y)||g)&&(c+=y,l+=v)}const _=Re(c);return _.length>0&&u.push(_),u.join(`
`)}const os={willReadFrequently:!0},De=class P{static get experimentalLetterSpacingSupported(){let e=P._experimentalLetterSpacingSupported;if(e===void 0){const t=An.get().getCanvasRenderingContext2D().prototype;e=P._experimentalLetterSpacingSupported="letterSpacing"in t||"textLetterSpacing"in t}return e}constructor(e,t,o,r,s,i,a,l,c,u){this.text=e,this.style=t,this.width=o,this.height=r,this.lines=s,this.lineWidths=i,this.lineHeight=a,this.maxLineWidth=l,this.fontProperties=c,u&&(this.runsByLine=u.runsByLine,this.lineAscents=u.lineAscents,this.lineDescents=u.lineDescents,this.lineHeights=u.lineHeights,this.hasDropShadow=u.hasDropShadow)}static measureText(e=" ",t,o=P._canvas,r=t.wordWrap){const s=`${e}-${t.styleKey}-wordWrap-${r}`;if(P._measurementCache.has(s))return P._measurementCache.get(s);if(ma(t)&&ga(e)){const y=ad(e,t,r,P._context,P._measureText,P.measureFont,P.canBreakChars,P.wordWrapSplit),v=new P(e,t,y.width,y.height,y.lines,y.lineWidths,y.lineHeight,y.maxLineWidth,y.fontProperties,{runsByLine:y.runsByLine,lineAscents:y.lineAscents,lineDescents:y.lineDescents,lineHeights:y.lineHeights,hasDropShadow:y.hasDropShadow});return P._measurementCache.set(s,v),v}const a=t._fontString,l=P.measureFont(a);l.fontSize===0&&(l.fontSize=t.fontSize,l.ascent=t.fontSize,l.descent=0);const c=P._context;c.font=a;const d=(r?P._wordWrap(e,t,o):e).split(sd),h=new Array(d.length);let p=0;for(let y=0;y<d.length;y++){const v=P._measureText(d[y],t.letterSpacing,c);h[y]=v,p=Math.max(p,v)}const f=t._stroke?.width??0,m=t.lineHeight||l.fontSize,g=P._getAlignWidth(p,t,r),x=P._adjustWidthForStyle(g,t),R=Math.max(m,l.fontSize+f)+(d.length-1)*(m+t.leading),_=P._adjustHeightForStyle(R,t),b=new P(e,t,x,_,d,h,m+t.leading,p,l);return P._measurementCache.set(s,b),b}static _adjustWidthForStyle(e,t){const o=t._stroke?.width||0;let r=e+o;return t.dropShadow&&(r+=t.dropShadow.distance),r}static _adjustHeightForStyle(e,t){let o=e;return t.dropShadow&&(o+=t.dropShadow.distance),o}static _getAlignWidth(e,t,o){return o&&t.align!=="left"&&t.align!=="justify"?Math.max(e,t.wordWrapWidth):e}static _measureText(e,t,o){let r=!1;P.experimentalLetterSpacingSupported&&(P.experimentalLetterSpacing?(o.letterSpacing=`${t}px`,o.textLetterSpacing=`${t}px`,r=!0):(o.letterSpacing="0px",o.textLetterSpacing="0px"));const s=o.measureText(e);let i=s.width;const a=-(s.actualBoundingBoxLeft??0);let c=(s.actualBoundingBoxRight??0)-a;if(i>0)if(r)i-=t,c-=t;else{const u=(P.graphemeSegmenter(e).length-1)*t;i+=u,c+=u}return Math.max(i,c)}static _wordWrap(e,t,o=P._canvas){return dd(e,t,o,P._measureText,P.canBreakWords,P.canBreakChars,P.wordWrapSplit)}static isBreakingSpace(e,t){return ve(e)}static canBreakWords(e,t){return t}static canBreakChars(e,t,o,r,s){return!0}static wordWrapSplit(e){return P.graphemeSegmenter(e)}static measureFont(e){if(P._fonts[e])return P._fonts[e];const t=P._context;t.font=e;const o=t.measureText(P.METRICS_STRING+P.BASELINE_SYMBOL),r=o.actualBoundingBoxAscent??0,s=o.actualBoundingBoxDescent??0,i={ascent:r,descent:s,fontSize:r+s};return P._fonts[e]=i,i}static clearMetrics(e=""){e?delete P._fonts[e]:P._fonts={}}static get _canvas(){if(!P.__canvas){let e;try{const t=new OffscreenCanvas(0,0);if(t.getContext("2d",os)?.measureText)return P.__canvas=t,t;e=An.get().createCanvas()}catch{e=An.get().createCanvas()}e.width=e.height=10,P.__canvas=e}return P.__canvas}static get _context(){return P.__context||(P.__context=P._canvas.getContext("2d",os)),P.__context}};De.METRICS_STRING="|ÉqÅ";De.BASELINE_SYMBOL="M";De.BASELINE_MULTIPLIER=1.4;De.HEIGHT_MULTIPLIER=2;De.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter=="function"){const n=new Intl.Segmenter;return e=>{const t=n.segment(e),o=[];let r=0;for(const s of t)o[r++]=s.segment;return o}}return n=>[...n]})();De.experimentalLetterSpacing=!1;De._fonts={};De._measurementCache=Zu(1e3);let Ee=De;const hd=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function Fo(n){const e=typeof n.fontSize=="number"?`${n.fontSize}px`:n.fontSize;let t=n.fontFamily;Array.isArray(n.fontFamily)||(t=n.fontFamily.split(","));for(let o=t.length-1;o>=0;o--){let r=t[o].trim();!/([\"\'])[^\'\"]+\1/.test(r)&&!hd.includes(r)&&(r=`"${r}"`),t[o]=r}return`${n.fontStyle} ${n.fontVariant} ${n.fontWeight} ${e} ${t.join(",")}`}const rs=1e5;function kn(n,e,t,o=0,r=0,s=0){if(n.texture===Y.WHITE&&!n.fill)return ae.shared.setValue(n.color).setAlpha(n.alpha??1).toHexa();if(n.fill){if(n.fill instanceof Zo){const i=n.fill,a=e.createPattern(i.texture.source.resource,"repeat"),l=i.transform.copyTo(Ae.shared);return l.scale(i.texture.source.pixelWidth,i.texture.source.pixelHeight),a.setTransform(l),a}else if(n.fill instanceof Wn){const i=n.fill,a=i.type==="linear",l=i.textureSpace==="local";let c=1,u=1;l&&t&&(c=t.width+o,u=t.height+o);let d,h=!1;if(a){const{start:p,end:f}=i;d=e.createLinearGradient(p.x*c+r,p.y*u+s,f.x*c+r,f.y*u+s),h=Math.abs(f.x-p.x)<Math.abs((f.y-p.y)*.1)}else{const{center:p,innerRadius:f,outerCenter:m,outerRadius:g}=i;d=e.createRadialGradient(p.x*c+r,p.y*u+s,f*c,m.x*c+r,m.y*u+s,g*c)}if(h&&l&&t){const p=t.lineHeight/u;for(let f=0;f<t.lines.length;f++){const m=(f*t.lineHeight+o/2)/u;i.colorStops.forEach(g=>{let x=m+g.offset*p;x=Math.max(0,Math.min(1,x)),d.addColorStop(Math.floor(x*rs)/rs,ae.shared.setValue(g.color).toHex())})}}else i.colorStops.forEach(p=>{d.addColorStop(p.offset,ae.shared.setValue(p.color).toHex())});return d}}else{const i=e.createPattern(n.texture.source.resource,"repeat"),a=n.matrix.copyTo(Ae.shared);return a.scale(n.texture.source.pixelWidth,n.texture.source.pixelHeight),i.setTransform(a),i}return Ko("FillStyle not recognised",n),"red"}const ss=new on;class pd{getCanvasAndContext(e){const{text:t,style:o,resolution:r=1}=e,s=o._getFinalPadding(),i=Ee.measureText(t||" ",o),a=Math.ceil(Math.ceil(Math.max(1,i.width)+s*2)*r),l=Math.ceil(Math.ceil(Math.max(1,i.height)+s*2)*r),c=qr.getOptimalCanvasAndContext(a,l);this._renderTextToCanvas(o,s,r,c,i);const u=o.trim?Ju({canvas:c.canvas,width:a,height:l,resolution:1,output:ss}):ss.set(0,0,a,l);return{canvasAndContext:c,frame:u}}returnCanvasAndContext(e){qr.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,o,r,s){if(s.runsByLine&&s.runsByLine.length>0){this._renderTaggedTextToCanvas(s,e,t,o,r);return}const{canvas:i,context:a}=r,l=Fo(e),c=s.lines,u=s.lineHeight,d=s.lineWidths,h=s.maxLineWidth,p=s.fontProperties,f=i.height;if(a.resetTransform(),a.scale(o,o),a.textBaseline=e.textBaseline,e._stroke?.width){const v=e._stroke;a.lineWidth=v.width,a.miterLimit=v.miterLimit,a.lineJoin=v.join,a.lineCap=v.cap}a.font=l;let m,g;const x=e.dropShadow?2:1,R=e.wordWrap?e.wordWrapWidth:h,b=(e._stroke?.width??0)/2;let y=(u-p.fontSize)/2;u-p.fontSize<0&&(y=0);for(let v=0;v<x;++v){const I=e.dropShadow&&v===0,T=I?Math.ceil(Math.max(1,f)+t*2):0,D=T*o;if(I)this._setupDropShadow(a,e,o,D);else{const E=e._gradientBounds,B=e._gradientOffset;if(E){const U={width:E.width,height:E.height,lineHeight:E.height,lines:s.lines};this._setFillAndStrokeStyles(a,e,U,t,b,B?.x??0,B?.y??0)}else B?this._setFillAndStrokeStyles(a,e,s,t,b,B.x,B.y):this._setFillAndStrokeStyles(a,e,s,t,b);a.shadowColor="black"}for(let E=0;E<c.length;E++)m=b,g=b+E*u+p.ascent+y,m+=this._getAlignmentOffset(d[E],R,e.align),e._stroke?.width&&this._drawLetterSpacing(c[E],e,r,m+t,g+t-T,!0),e._fill!==void 0&&this._drawLetterSpacing(c[E],e,r,m+t,g+t-T)}}_renderTaggedTextToCanvas(e,t,o,r,s){const{canvas:i,context:a}=s,{runsByLine:l,lineWidths:c,maxLineWidth:u,lineAscents:d,lineHeights:h,hasDropShadow:p}=e,f=i.height;a.resetTransform(),a.scale(r,r),a.textBaseline=t.textBaseline;const m=p?2:1,g=t.wordWrap?t.wordWrapWidth:u,R=(t._stroke?.width??0)/2,_=[];for(let b=0;b<l.length;b++){const y=l[b],v=[];for(const I of y){const T=Fo(I.style);a.font=T,v.push({width:Ee._measureText(I.text,I.style.letterSpacing,a),font:T})}_.push(v)}for(let b=0;b<m;++b){const y=p&&b===0,v=y?Math.ceil(Math.max(1,f)+o*2):0,I=v*r;y||(a.shadowColor="black");let T=R;for(let D=0;D<l.length;D++){const E=l[D],B=c[D],U=d[D],L=h[D],G=_[D];let $=R;$+=this._getAlignmentOffset(B,g,t.align);const ee=T+U;let W=$+o;for(let V=0;V<E.length;V++){const O=E[V],{width:q,font:se}=G[V];if(a.font=se,a.textBaseline=O.style.textBaseline,O.style._stroke?.width){const fe=O.style._stroke;if(a.lineWidth=fe.width,a.miterLimit=fe.miterLimit,a.lineJoin=fe.join,a.lineCap=fe.cap,y)if(O.style.dropShadow)this._setupDropShadow(a,O.style,r,I);else{W+=q;continue}else{const Se=Ee.measureFont(se),Ye=O.style.lineHeight||Se.fontSize,ul={width:q,height:Ye,lineHeight:Ye,lines:[O.text]};a.strokeStyle=kn(fe,a,ul,o*2,W-o,T)}this._drawLetterSpacing(O.text,O.style,s,W,ee+o-v,!0)}W+=q}W=$+o;for(let V=0;V<E.length;V++){const O=E[V],{width:q,font:se}=G[V];if(a.font=se,a.textBaseline=O.style.textBaseline,O.style._fill!==void 0){if(y)if(O.style.dropShadow)this._setupDropShadow(a,O.style,r,I);else{W+=q;continue}else{const fe=Ee.measureFont(se),Se=O.style.lineHeight||fe.fontSize,Ye={width:q,height:Se,lineHeight:Se,lines:[O.text]};a.fillStyle=kn(O.style._fill,a,Ye,o*2,W-o,T)}this._drawLetterSpacing(O.text,O.style,s,W,ee+o-v,!1)}W+=q}T+=L}}}_setFillAndStrokeStyles(e,t,o,r,s,i=0,a=0){if(e.fillStyle=t._fill?kn(t._fill,e,o,r*2,i,a):null,t._stroke?.width){const l=s+r*2;e.strokeStyle=kn(t._stroke,e,o,l,i,a)}}_setupDropShadow(e,t,o,r){e.fillStyle="black",e.strokeStyle="black";const s=t.dropShadow,i=s.color,a=s.alpha;e.shadowColor=ae.shared.setValue(i).setAlpha(a).toRgbaString();const l=s.blur*o,c=s.distance*o;e.shadowBlur=l,e.shadowOffsetX=Math.cos(s.angle)*c,e.shadowOffsetY=Math.sin(s.angle)*c+r}_getAlignmentOffset(e,t,o){return o==="right"?t-e:o==="center"?(t-e)/2:0}_drawLetterSpacing(e,t,o,r,s,i=!1){const{context:a}=o,l=t.letterSpacing;let c=!1;if(Ee.experimentalLetterSpacingSupported&&(Ee.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,c=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||c){i?a.strokeText(e,r,s):a.fillText(e,r,s);return}let u=r;const d=Ee.graphemeSegmenter(e);let h=a.measureText(e).width,p=0;for(let f=0;f<d.length;++f){const m=d[f];i?a.strokeText(m,u,s):a.fillText(m,u,s);let g="";for(let x=f+1;x<d.length;++x)g+=d[x];p=a.measureText(g).width,u+=h-p+l,h=p}}}const Ct=new pd,kr=class Ke extends kl{constructor(e={}){super(),this.uid=Il("textStyle"),this._tick=0,this._cachedFontString=null,fd(e),e instanceof Ke&&(e=e._toObject());const r={...Ke.defaultTextStyle,...e};for(const s in r){const i=s;this[i]=r[s]}this._tagStyles=e.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(e){this._dropShadow!==e&&(e!==null&&typeof e=="object"?this._dropShadow=this._createProxy({...Ke.defaultDropShadow,...e}):this._dropShadow=e?this._createProxy({...Ke.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(typeof e=="string"?this._fontSize=parseInt(e,10):this._fontSize=e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...xt.defaultFillStyle,...e},()=>{this._fill=Lr({...this._originalFill},xt.defaultFillStyle)})),this._fill=Lr(e===0?"black":e,xt.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...xt.defaultStrokeStyle,...e},()=>{this._stroke=Er({...this._originalStroke},xt.defaultStrokeStyle)})),this._stroke=Er(e,xt.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit("update",this)}reset(){const e=Ke.defaultTextStyle;for(const t in e)this[t]=e[t]}assign(e){for(const t in e){const o=t;this[o]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=Fo(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new Ke(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e=="boolean"?e:e?.texture){const o=typeof e=="boolean"?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(o),this._originalFill?.texture&&this._originalFill.texture.destroy(o),this._stroke?.texture&&this._stroke.texture.destroy(o),this._originalStroke?.texture&&this._originalStroke.texture.destroy(o)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(o,r,s)=>(o[r]===s||(o[r]=s,t?.(r,s),this.update()),!0)})}_isFillStyle(e){return(e??null)!==null&&!(ae.isColorLike(e)||e instanceof Wn||e instanceof Zo)}};kr.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};kr.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let Nn=kr;function fd(n){const e=n;if(typeof e.dropShadow=="boolean"&&e.dropShadow){const t=Nn.defaultDropShadow;n.dropShadow={alpha:e.dropShadowAlpha??t.alpha,angle:e.dropShadowAngle??t.angle,blur:e.dropShadowBlur??t.blur,color:e.dropShadowColor??t.color,distance:e.dropShadowDistance??t.distance}}if(e.strokeThickness!==void 0){Be(lt,"strokeThickness is now a part of stroke");const t=e.stroke;let o={};if(ae.isColorLike(t))o.color=t;else if(t instanceof Wn||t instanceof Zo)o.fill=t;else if(Object.hasOwnProperty.call(t,"color")||Object.hasOwnProperty.call(t,"fill"))o=t;else throw new Error("Invalid stroke value.");n.stroke={...o,width:e.strokeThickness}}if(Array.isArray(e.fillGradientStops)){if(Be(lt,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(e.fill)||e.fill.length===0)throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");e.fill.length!==e.fillGradientStops.length&&Ko("The number of fill colors must match the number of fill gradient stops.");const t=new Wn({start:{x:0,y:0},end:{x:0,y:1},textureSpace:"local"}),o=e.fillGradientStops.slice(),r=e.fill.map(s=>ae.shared.setValue(s).toNumber());o.forEach((s,i)=>{t.addColorStop(s,r[i])}),n.fill={fill:t}}}function md(n,e){const{texture:t,bounds:o}=n,r=e._style._getFinalPadding();Pl(o,e._anchor,t);const s=e._anchor._x*r*2,i=e._anchor._y*r*2;o.minX-=r-s,o.minY-=r-i,o.maxX-=r-s,o.maxY-=r-i}class gd extends Pu{}class wa{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),this._managedTexts=new li({renderer:e,type:"renderable",onUnload:this.onTextUnload.bind(this),name:"canvasText"})}resolutionChange(){for(const e in this._managedTexts.items){const t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}validateRenderable(e){const t=this._getGpuText(e),o=e.styleKey;return t.currentKey!==o?!0:e._didTextUpdate}addRenderable(e,t){const o=this._getGpuText(e);if(e._didTextUpdate){const r=e._autoResolution?this._renderer.resolution:e.resolution;(o.currentKey!==e.styleKey||e._resolution!==r)&&this._updateGpuText(e),e._didTextUpdate=!1,md(o,e)}this._renderer.renderPipes.batch.addToBatch(o,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new gd;return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){const t=e._gpuData[this._renderer.uid];if(!t)return;const{canvasText:o}=this._renderer;o.getReferenceCount(t.currentKey)>0?o.decreaseReferenceCount(t.currentKey):t.texture&&o.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}}wa.extension={type:[z.WebGLPipes,z.WebGPUPipes,z.CanvasPipes],name:"text"};const xd=new Rl;function yd(n,e,t,o){const r=xd;r.minX=0,r.minY=0,r.maxX=n.width/o|0,r.maxY=n.height/o|0;const s=ui.getOptimalTexture(r.width,r.height,o,!1);return s.source.uploadMethodId="image",s.source.resource=n,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/o,s.frame.height=t/o,s.source.emit("update",s.source),s.updateUvs(),s}class Sa{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,o,r){typeof e=="string"&&(Be("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:o,resolution:t}),e.style instanceof Nn||(e.style=new Nn(e.style)),e.textureStyle instanceof rn||(e.textureStyle=new rn(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:i,textureStyle:a}=e,l=e.resolution??this._renderer.resolution,{frame:c,canvasAndContext:u}=Ct.getCanvasAndContext({text:s,style:i,resolution:l}),d=yd(u.canvas,c.width,c.height,l);if(a&&(d.source.style=a),i.trim&&(c.pad(i.padding),d.frame.copyFrom(c),d.frame.scale(1/l),d.updateUvs()),i.filters){const h=this._applyFilters(d,i.filters);return this.returnTexture(d),Ct.returnCanvasAndContext(u),h}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||Ct.returnCanvasAndContext(u),d}returnTexture(e){const t=e.source,o=t.resource;if(this._retainCanvasContext&&o?.getContext){const r=o.getContext("2d");r&&Ct.returnCanvasAndContext({canvas:o,context:r})}t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",ui.returnTexture(e,!0)}renderTextToCanvas(){Be("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const o=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:o,usageCount:1},o}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const o=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(o,!1),r}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}class Ca extends Sa{constructor(e){super(e,!0)}}Ca.extension={type:[z.CanvasSystem],name:"canvasText"};class Ta extends Sa{constructor(e){super(e,!1)}}Ta.extension={type:[z.WebGLSystem,z.WebGPUSystem],name:"canvasText"};zt.add(Ca);zt.add(Ta);zt.add(wa);class bd extends ju{constructor(...e){const t=Xu(e,"Text");super(t,Nn),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof rn?t.textureStyle:new rn(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let o=0,r=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=Ct.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Ct.returnCanvasAndContext(i),o=s.width,r=s.height}else{const s=Ee.measureText(this._text,this._style);o=s.width,r=s.height}e.minX=-t._x*o,e.maxX=e.minX+o,e.minY=-t._y*r,e.maxY=e.minY+r}}const ka=class Ia extends C{constructor(e={}){e={...Ia.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const o=e[t];if(o.parentRenderLayer){if(o.parentRenderLayer===this)continue;o.parentRenderLayer.detach(o)}this.renderLayerChildren.push(o),o.parentRenderLayer=this;const r=this.renderGroup||this.parentRenderGroup;r&&(r.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const o=e[t],r=this.renderLayerChildren.indexOf(o);r!==-1&&this.renderLayerChildren.splice(r,1),o.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,o){const r=this.renderLayerChildren,s=r.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)r[i].parent||Ko("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",r[i]),r[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,o){if(!e)return;const r=this.renderLayerChildren;for(let s=0;s<r.length;s++)r[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};ka.defaultOptions={sortableChildren:!1,sortFunction:(n,e)=>n.zIndex-e.zIndex};let is=ka;var vd=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;uniform sampler2D uMask;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);float maskVal=texture(uMask,vTextureCoord).r;finalColor=mix(c,lutColourReplace(uLut,c),maskVal);}`;const wd=Q.from({vertex:Ne,fragment:vd,name:"palette-swop-filter1"});class _t extends K{constructor({paletteSwaps:e,lutType:t},o=Y.WHITE){const r=(t==="voronoi"?xu:yu)(e);super({glProgram:wd,resources:{colorReplaceUniforms:{},uLut:r.source,uMask:o.source}}),this.mask=o,this.#e=r}#e;destroy(e){const t=e===!0||typeof e=="object"&&e.destroyPrograms,o=e===!0||typeof e=="object"&&e.destroyLutTexture,r=this.lutTexture!==Y.WHITE&&e===!0||typeof e=="object"&&e.destroyMask;o&&this.#e?.destroy(!0),this.#e=null,r&&this.mask?.destroy(!0),super.destroy(t)}get lutTexture(){return this.#e}}const Pa={ambient:[]},Sd=pt(sn).filter(n=>n.startsWith("shadow.")||n.startsWith("shadowMask.")||n.startsWith("hud.")).toArray(),Cd=n=>typeof n=="function"?pt(sn).filter(n):n,Td=(n,e)=>new _t({paletteSwaps:di(w,([t])=>t==="replaceDark"||t==="replaceLight"?[t,n]:[t,e]),lutType:"sparse"}),kd=(n,{ambient:e,textureSpecific:t=Mt,noReplacePlaceholderTextures:o=Mt},r=_l())=>{const s=[];for(const{textureIds:u,paletteSwaps:d}of t){const h=Ur(n,{rects:{textureIds:u,color:io},clearColour:ao}),p=new _t({paletteSwaps:d,lutType:"sparse"},h);s.push(p)}const i=o.length>0?Td(ao,io):void 0,a=Ur(n,{clearColour:io,rects:{textureIds:Bl(Sd,pt(t).filter(({dodgeAmbient:u})=>u).flatMap(({textureIds:u})=>Cd(u))),color:ao},placeholderColoursMasks:i?{textureIds:o,filter:i,originalSpritesheet:We()}:void 0});i?.destroy({destroyLutTexture:!0,destroyMask:!0});for(const u of e){const d=new _t(u,a);s.push(d)}const l=new re(r);l.filters=s;const c=dt.create({width:r.width,height:r.height});n.render({container:l,target:c}),l.destroy(!1),a.destroy();for(const u of s)u instanceof _t?u.destroy({destroyLutTexture:!0,destroyMask:!0,destroyPrograms:!1}):u.destroy(!1);return c},Wt=(n,e,t)=>{const o=kd(n,e,t),r=new Ml(o.source,structuredClone(ut));return r.parseSync(),r.textureSource.scaleMode="nearest",r},Ir={ambient:[{paletteSwaps:Kn,lutType:"sparse"}]},jn=(n,e,t)=>{const o=Y.from(e.textureSource),r=Wt(n,t,o);return o.destroy(),e.textureSource.destroy(),e.destroy(!0),r};let Do;const Id=n=>{Do=Wt(n,{ambient:[{lutType:"voronoi",paletteSwaps:{pureBlack:new ae(0),shadow:new ae(16777215),redShadow:new ae(16777215)}}]})},Pd=()=>{if(Do===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Do};zt.add(Gi,Wi,Vi,Hi,$i,Ni,ji,Xi,Yi,Ji,qi,Ki,Zi,Qi,ea,ta,na,oa,ra,sa,ia);const Rd=async(n,{forceRefetch:e}=ce)=>await k.dispatch(Al.endpoints.getCampaign.initiate(n,{forceRefetch:e}));Y.from;Ol.prototype.destroy;const _d=n=>{n.ticker.remove(n.render,n)},Ra={white:{basic:{main:"white",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"white",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}}},yellow:{basic:{main:"yellow",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}},dimmed:{main:"yellow",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!1}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}}},magenta:{basic:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}},dimmed:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}}},cyan:{basic:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}},dimmed:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!0},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}}},green:{basic:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}}}},gn=n=>Ra[n.hue][n.shade],zo={head:"pastelBlue",heels:"pink"},as=(n,e)=>{const t=gn(n.color).edges[e];return de(t.hue,t.dimInOriginal?"dimmed":"basic")},Md=sn.filter(n=>n.startsWith("door.")),Lo=n=>/\.floor$/.test(n),Eo=n=>/\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(n),ls=n=>/door\.legs\.pillar/.test(n),Bd=n=>/\.wall\.[^.]+\.left$/.test(n),ho=n=>Lo(n)||Eo(n),Ad=(n,e,t)=>{if(n)return{ambient:[{lutType:"sparse",paletteSwaps:te(t.hue,t.shade==="dimmed")},t.shade==="basic"?_a(e,t):{lutType:"sparse",paletteSwaps:{...Kn}}],textureSpecific:[...Fd(e,t),...Od(e,t),...Dd(t)],noReplacePlaceholderTextures:Md}},Od=(n,e)=>{const{edges:t}=Ra[e.hue][e.shade],o=te(t.right.hue,e.shade==="dimmed","light-mid"),r=te(t.towards.hue,e.shade==="dimmed","mid-dark");return[{textureIds:["floorEdge.half.right","floorEdge.right","generic.door.floatingThreshold.y"],paletteSwaps:o},{textureIds:["floorEdge.half.towards","floorEdge.towards","generic.door.floatingThreshold.x"],paletteSwaps:r}]},Fd=(n,e)=>{if(n==="jail")return[{textureIds:ho,paletteSwaps:te(e.hue,e.shade==="dimmed","mid-dark")}];if(n==="blacktooth"&&e.shade==="dimmed")return[{textureIds:Eo,paletteSwaps:te(e.hue,!0,"light-mid")}];if(e.hue==="white"||e.hue==="yellow")switch(n){case"market":return[{textureIds:ho,paletteSwaps:te(e.hue,e.shade==="dimmed","mid-dark")}];case"egyptus":return[{textureIds:ls,paletteSwaps:te(e.hue,e.shade==="dimmed","light-dark")},{textureIds:Lo,paletteSwaps:te(e.hue,e.shade==="dimmed","mid-dark")},{textureIds:Bd,paletteSwaps:te(e.hue,e.shade==="dimmed","light-mid")},{textureIds:Eo,paletteSwaps:te(e.hue,e.shade==="dimmed","mid-dark")}];case"moonbase":case"penitentiary":case"safari":case"bookworld":return[{textureIds:Lo,paletteSwaps:te(e.hue,e.shade==="dimmed","mid-dark")}];case"blacktooth":return[{textureIds:ls,paletteSwaps:te(e.hue,e.shade==="dimmed","light-dark")},{textureIds:ho,paletteSwaps:te(e.hue,e.shade==="dimmed","light-mid")}]}return Mt},Dd=n=>{const{hue:e,shade:t}=n;return e==="white"||e==="yellow"?[{textureIds:["book.x","book.y"],paletteSwaps:{...te(e,t==="dimmed","light-mid"),shadow:Ao(`swop_${e}Dim`,t==="dimmed")}}]:t==="dimmed"?[{textureIds:["book.x","book.y"],paletteSwaps:{...te(n.hue,!0,n.hue==="cyan"?"light-mid":"mid-dark")}}]:Mt},zd={blacktooth:{pureBlack:Le(w.moss,.15)},safari:{pureBlack:Le(w.moss,.17)},jail:{pureBlack:Le(w.redShadow,.2)},egyptus:{pureBlack:Le(w.redShadow)},moonbase:{shadow:w.shadow_greyBlue,pureBlack:Le(w.metallicBlue,.2)},bookworld:{shadow:w.shadow_brown,pureBlack:Le(w.highlightBeige,.1)},penitentiary:{pureBlack:Le(w.midGrey,.2)}},Ld={yellow:{shadow:w.shadow_brown},white:{shadow:w.shadow_greyBlue},magenta:{shadow:w.shadow_magenta},cyan:{shadow:w.shadow_blue}},_a=(n,e)=>({lutType:"sparse",paletteSwaps:{...Ld[e.hue]??ce,...zd[n]??ce}});let Tt,Uo=Pa;const Ma=()=>{Tt!==void 0&&(Tt.textureSource.destroy(),Tt.destroy(!0),Tt=void 0)},Ed=(n,e,t,o)=>{Ma(),Uo=Ad(e,t,o)??Pa,Tt=Wt(n,Uo)},Ud=()=>Tt,Un=n=>{let e=w[n];for(const t of Uo.ambient)e=t.paletteSwaps[n]??e;return e};let st;const Pr={lightBeige:w.lightGrey,redShadow:w.shadow,pink:w.lightGrey,moss:w.lightGrey,midRed:w.midGrey,highlightBeige:w.lightGrey,pastelBlue:w.lightGrey,metallicBlue:w.midGrey,replaceLight:w.lightGrey,replaceDark:w.midGrey},Gd=hi(Pr,"metallicBlue","pastelBlue"),Wd=hi(Pr,"pink"),Vd={ambient:[{paletteSwaps:Pr,lutType:"sparse"}],textureSpecific:[{textureIds:sn.filter(n=>n.startsWith("head.")),paletteSwaps:Gd,dodgeAmbient:!0},{textureIds:sn.filter(n=>n.startsWith("heels.")),paletteSwaps:Wd,dodgeAmbient:!0}]},Hd=()=>{st!==void 0&&(st.textureSource.destroy(),st.destroy(!0),st=void 0)},$d=(n,e,t)=>{Hd();let o=Wt(n,Vd);t.shade==="dimmed"?o=jn(n,o,Ir):o=jn(n,o,{ambient:[_a(e,t)]}),st=o},Nd=()=>{if(st===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return st};let it;const jd={midGrey:w.midRed,lightGrey:w.lightBeige,white:w.highlightBeige,metallicBlue:w.redShadow,shadow:w.redShadow,pastelBlue:w.lightBeige,pink:w.midRed,moss:w.midRed,replaceDark:w.midRed,replaceLight:w.lightBeige},Xd=()=>{it!==void 0&&(it.textureSource.destroy(),it.destroy(!0),it=void 0)},Yd=(n,e)=>{Xd();let t=Wt(n,{ambient:[{paletteSwaps:jd,lutType:"sparse"}]});e&&(t=jn(n,t,Ir)),it=t},Jd=()=>{if(it===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return it};let at;const qd={pastelBlue:w.moss,metallicBlue:w.moss,pink:w.moss},Zd=()=>{at!==void 0&&(at.textureSource.destroy(),at.destroy(!0),at=void 0)},Kd=(n,e)=>{Zd();let t=Wt(n,{ambient:[{paletteSwaps:qd,lutType:"sparse"}]});e&&(t=jn(n,t,Ir)),at=t},Qd=()=>{if(at===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return at},Oe=n=>{try{switch(n){case"original":return We();case"deactivated":return Nd();case"doughnutted":return Jd();case"for-current-room":return Ud();case"sceneryPlayer":return Qd();case"uncolourised":return Pd();default:return n}}catch(e){throw new Error(`could not get spritesheet variant "${n}"`,{cause:e})}},Kt=(n="for-current-room",e)=>Oe(n).textures[e],Gn=n=>{if(n===void 0)return 0;const{shieldCollectedAt:e,gameTime:t}=n;return e!==null&&e+Gr>t?100-Math.ceil((t-e)/(Gr/100)):0},Rr=n=>n.type==="headOverHeels"?Gn(n.state.head)>0||Gn(n.state.heels)>0:Gn(n.state)>0,_r=n=>{const e=100*A.x;return n.gameWalkDistance<=n.fastStepsStartedAtDistance+e?100-Math.ceil((n.gameWalkDistance-n.fastStepsStartedAtDistance)/A.x):0};var eh=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let Go=Qo(k.getState());k.subscribe(()=>{Go=Qo(k.getState())});const th=Q.from({vertex:Ne,fragment:eh,name:"outline-filter"});class $e extends K{#e;constructor({color:e,width:t}){const o=t??Go;super({glProgram:th,padding:o,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.#e=t;const r=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();r.uOutline[0]=s,r.uOutline[1]=i,r.uOutline[2]=a}apply(e,t,o,r){const s=this.resources.colorReplaceUniforms.uniforms,i=this.#e??Go;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,o,r)}}const xn={...di(w,([n,e])=>[n,new $e({color:e})]),black1pxFilter:new $e({color:w.pureBlack,width:1})},po={x:.5,y:1},cs=n=>typeof n!="string"&&Object.hasOwn(n,"animationId"),Wo=n=>{const{anchor:e,flipX:t,pivot:o,x:r,y:s,times:i,label:a}=n;if(n.times){const c=Fl(i);if(ft(c)>=2){const d=new C({label:a??"timesXyz"});for(let{x:h}=c;h>=1;h--)for(let{y:p}=c;p>=1;p--)for(let f=1;f<=c.z;f++){const m={...n,label:`(${h},${p},${f})`,...n.subSpriteVariations?.(h-1,p-1,f-1),subSpriteVariations:void 0};"randomiseStartFrame"in m&&(m.randomiseStartFrame=`${m.randomiseStartFrame}${h},${p},${f}`),delete m.times;const g=Wo(m),x=ht({x:h-1,y:p-1,z:f-1});g.x+=x.x,g.y+=+x.y,d.addChild(g)}return d}}if(n.subSpriteVariations!==void 0)return Wo({...n,...n.subSpriteVariations(0,0,0),subSpriteVariations:void 0});let l;if(cs(n))l=nh(n);else{const{textureId:c}=n,u=Oe(n.spritesheetVariant??"original");l=new re(c!==void 0?u.textures[c]:Y.EMPTY)}if(e===void 0&&o===void 0)if(cs(n))l.anchor=po;else{const{textureId:c}=n,u=c!==void 0?Oe(n.spritesheetVariant??"original").data.frames[c]:void 0;if(u!==void 0){const d=u.frame;d.pivot!==void 0?l.pivot=d.pivot:l.anchor=po}else l.anchor=po}else e!==void 0&&(l.anchor=e),o!==void 0&&(l.pivot=o);return r!==void 0&&(l.x=r),s!==void 0&&(l.y=s),a!==void 0&&(l.label=a),l.eventMode="static",t===!0&&(l.scale.x=-1),l},Ba=(n,e=!1)=>{const t=nt.shared.speed,o=e||t===0?0:Math.sqrt(t)/t;return ut.animations[n].animationSpeed*o},Mr=n=>n.map(e=>({texture:e,time:er}));function nh({animationId:n,reverse:e,playOnce:t,paused:o,randomiseStartFrame:r,spritesheetVariant:s}){const i=Oe(s).animations[n],a=Mr(i);e&&a.reverse();const l=new Ie(a);return l.animationSpeed=Ba(n,o),l.gotoAndPlay(r!==void 0?Math.floor(pi(r)*a.length):0),t!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),t==="and-destroy"&&(l.visible=!1)}),l}const S=Wo;class oh extends Ie{destroy(e){const t=this.textures.map(o=>"texture"in o?o.texture:o).filter(o=>o instanceof dt);super.destroy(e);for(const o of t)o.destroy(!0)}}class rh extends re{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:this.texture instanceof dt,children:e}):super.destroy({...e,texture:t,textureSource:this.texture instanceof dt})}}const ln=(n,e,t)=>{const o=e.getLocalBounds(),r=Math.ceil(o.maxX-o.minX),s=Math.ceil(o.maxY-o.minY),i=t!==void 0?t.width===r&&t.height===s:!1,a=i?t:dt.create({width:r,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=o.minX,e.y-=o.minY;try{n.render({container:e,target:a,clear:i})}catch(u){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${Oo(e)}`,{cause:u})}return e.x=l,e.y=c,a},ke=(n,e,t,o)=>{const r=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof dt?t.texture:void 0,i=ln(n,e,s),a=t||new rh;return a.texture=i,a.label=o??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Br=(n,e,t,o)=>{if(e instanceof Ie||e instanceof re)return e;const r=e.getLocalBounds(),s=e.children.find(l=>l instanceof Ie)?.textures.length??1,i=pt(Dl(0,s)).map(l=>{if(l>0)for(const c of e.children)c instanceof Ie&&c.gotoAndStop((c.currentFrame+1)%s);return ln(n,e)}).toArray(),a=new oh(Mr(i));return a.animationSpeed=Ba(t,!1),a.gotoAndPlay(0),a.label=`animated sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Vt=(n,e)=>e instanceof re?e:ke(n,e),sh=n=>{const e=`hud.char.${zl(n)}`;try{mi(e)}catch(t){throw new Error(`no texture id for char "${n}": ${t.message}`,{cause:t})}return e},ih=n=>typeof n=="string"?n==="infinite"?"":n:n.toString();class X extends C{#e;#t="";#o;#n;#r;#s;#i;constructor({pixiRenderer:e,doubleHeight:t=!1,doubleWidth:o=!1,outline:r=!1,label:s="text",x:i,y:a,tint:l,text:c}){super({label:s,x:i,y:a,tint:l}),this.#e=e,this.#s=t?2:1,this.#i=o?2:1,this.#o=new re,this.#o.y=-(ot.h*this.#s+1),this.addChild(this.#o),this.#r=new C,this.addChild(this.#r),this.#n=new C,this.#n.scale={x:this.#i,y:this.#s},r&&(this.#n.filters=new $e({color:w.pureBlack,width:1})),this.#r.addChild(this.#n),c!==void 0&&(this.text=c)}get text(){return this.#t}set text(e){const t=ih(e);this.#t!==t&&(this.#l(t),this.#r.visible=!0,this.#r.boundsArea=new on(-1,-1,(ot.w*t.length+2)*this.#i,(ot.h+2)*this.#s),this.#o.texture&&this.#o.texture.destroy(!0),this.#o.texture=ln(this.#e,this.#r),this.#o.x=-this.#o.texture.frame.width/2,this.#r.visible=!1,this.#t=t)}#l(e){const t=fi(e),o=this.#n.children.length,r=t!==o;try{const s=We().textures;let i=0;for(const a of e){const l=sh(a);let c;i<o?(c=this.#n.getChildAt(i),c.texture=s[l]):(c=new re(s[l]),this.#n.addChild(c)),i++}}catch(s){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(s),window.invalid=e,new Error(`could not show text "${e}" in container because: "${s.message}"`,{cause:s})}if(r){t<o&&this.#n.removeChildren(t);for(let s=0;s<t;s++){const i=this.#n.getChildAt(s);i.x=s*ot.w}}}destroy(e){this.#o.destroy({texture:!0,textureSource:!0}),super.destroy(e)}get characterSpriteContainer(){return this.#n}}function ah(n){return{all:n=n||new Map,on:function(e,t){var o=n.get(e);o?o.push(t):n.set(e,[t])},off:function(e,t){var o=n.get(e);o&&(t?o.splice(o.indexOf(t)>>>0,1):n.set(e,[]))},emit:function(e,t){var o=n.get(e);o&&o.slice().map(function(r){r(t)}),(o=n.get("*"))&&o.slice().map(function(r){r(e,t)})}}}class Ar{constructor(e=2e3){this.reportIntervalMs=e}static instance=new Ar;#e={physics:{totalMs:0,count:0},hudUpdate:{totalMs:0,count:0},updateSceneGraph:{totalMs:0,count:0},pixiRender:{totalMs:0,count:0}};#t={};#o=performance.now();#n={frameCount:0,elapsedMs:0,fps:0,theoreticalFps:0,phases:{physics:{avgMs:0,percentage:0},hudUpdateSceneGraph:{avgMs:0,percentage:0},updateSceneGraph:{avgMs:0,percentage:0},pixiRender:{avgMs:0,percentage:0},total:{avgMs:0,percentage:0}}};#r=ah();startPhysics(){this.#t.physicsStart=performance.now()}endPhysics(){if(this.#t.physicsStart===void 0){console.warn("endPhysics called without startPhysics");return}const e=performance.now()-this.#t.physicsStart;this.#e.physics.totalMs+=e,this.#e.physics.count++,this.#t.physicsStart=void 0}startHudUpdate(){this.#t.hudUpdateStart=performance.now()}endHudUpdate(){if(this.#t.hudUpdateStart===void 0){console.warn("endHudUpdate called without startHudUpdate");return}const e=performance.now()-this.#t.hudUpdateStart;this.#e.hudUpdate.totalMs+=e,this.#e.hudUpdate.count++,this.#t.hudUpdateStart=void 0}startUpdateSceneGraph(){this.#t.updateSceneGraphStart=performance.now()}endUpdateSceneGraph(){if(this.#t.updateSceneGraphStart===void 0){console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");return}const e=performance.now()-this.#t.updateSceneGraphStart;this.#e.updateSceneGraph.totalMs+=e,this.#e.updateSceneGraph.count++,this.#t.updateSceneGraphStart=void 0}startPixiRender(){this.#t.pixiRenderStart=performance.now()}endPixiRender(){if(this.#t.pixiRenderStart===void 0){console.warn("endPixiRender called without startPixiRender");return}const e=performance.now()-this.#t.pixiRenderStart;this.#e.pixiRender.totalMs+=e,this.#e.pixiRender.count++,this.#t.pixiRenderStart=void 0}tickDone(){const e=performance.now();e-this.#o>=this.reportIntervalMs&&this.#s(e)}on(e){this.#r.on("stats",e)}off(e){this.#r.off("stats",e)}#s(e){const{physics:t,hudUpdate:o,updateSceneGraph:r,pixiRender:s}=this.#e;t.count===0&&o.count===0&&r.count===0&&s.count===0||(this.#i(e),this.#r.emit("stats",this.#n),this.reset(e))}#i(e){const{physics:t,hudUpdate:o,updateSceneGraph:r,pixiRender:s}=this.#e,i=t.count>0?t.totalMs/t.count:0,a=o.count>0?o.totalMs/o.count:0,l=r.count>0?r.totalMs/r.count:0,c=s.count>0?s.totalMs/s.count:0,u=i+a+l+c,d=Math.max(t.count,o.count,r.count,s.count),h=e-this.#o;this.#n.frameCount=d,this.#n.elapsedMs=h,this.#n.fps=d/h*1e3,this.#n.theoreticalFps=u>0?1e3/u:0,this.#n.phases.physics.avgMs=i,this.#n.phases.physics.percentage=i/u*100,this.#n.phases.hudUpdateSceneGraph.avgMs=a,this.#n.phases.hudUpdateSceneGraph.percentage=a/u*100,this.#n.phases.updateSceneGraph.avgMs=l,this.#n.phases.updateSceneGraph.percentage=l/u*100,this.#n.phases.pixiRender.avgMs=c,this.#n.phases.pixiRender.percentage=c/u*100,this.#n.phases.total.avgMs=u,this.#n.phases.total.percentage=100}reset(e=performance.now()){this.#e.physics.totalMs=0,this.#e.physics.count=0,this.#e.hudUpdate.totalMs=0,this.#e.hudUpdate.count=0,this.#e.updateSceneGraph.totalMs=0,this.#e.updateSceneGraph.count=0,this.#e.pixiRender.totalMs=0,this.#e.pixiRender.count=0,this.#o=e}}const cn=Ar.instance;gi({predicate(n,e,t){return rt(e)!==rt(t)},effect(n){cn.reset()}});class us{constructor(e){this.renderContext=e,this.#t=new X({pixiRenderer:e.general.pixiRenderer,label:"fps",outline:!0,y:ot.h,text:"..."}),this.#e.addChild(this.#t),cn.on(this.tick)}#e=new C({label:"FpsRenderer"});#t;#o=!1;#n;set isDark(e){this.#o!==e&&(this.#o=e,this.#s())}#r(e,t){const o=e/t;return o>1.95?"white":o>1.67?"highlightBeige":o>.97?"moss":o>.92?"pastelBlue":o>.83?"metallicBlue":o>.67?"pink":"midRed"}#s(){const e=this.#n;this.#t.text=e===void 0?"...":`${Math.round(e)} FPS`;const t=e===void 0?"white":this.#r(e,60),o=Ei(this.#o);this.#t.tint=o[t]}tick=e=>{this.#n=e.fps,this.#s()};get output(){return this.#e}destroy(){cn.off(this.tick),this.#e.destroy()}}const fo={colourised:{jump:"pastelBlue",fire:"highlightBeige",carry:"moss",carryAndJump:"midRed",menu:"lightGrey",map:"lightGrey"},zx:{jump:"blue",fire:"yellow",carry:"green",carryAndJump:"red",menu:"white",map:"white"}};class Qn extends C{constructor(e,t,o,r){super({label:`arcadeButton (${t})`}),this.colourised=e,this.which=t,this.pixiRenderer=o,this.#t=new C({label:"depress"}),this.addChild(this.#t),this.#n=new re({anchor:{x:.5,y:1}}),this.#r=new re({anchor:{x:.5,y:1}}),this.#r.visible=!1,this.#t.addChild(this.#n),this.#t.addChild(this.#r),this.#e=new C({label:"surface"});const s=S({textureId:"button.surfaceMask",label:"surfaceMask",spritesheetVariant:"original"});this.#t.addChild(s),this.#e.mask=s,this.#t.addChild(this.#e),this.shownOnSurface=r}#e;#t;#o;#n;#r;get shownOnSurface(){return this.#o}set shownOnSurface(e){this.#o!==void 0&&this.#o.destroy({children:!0}),this.#o=e,e!==void 0&&this.#e.addChild(e)}set pressed(e){this.#n.visible=!e,this.#r.visible=e,this.#t.y=e?1:0}generateButtonSpriteTextures(e){const{which:t,colourised:o}=this,r=S({textureId:"button",spritesheetVariant:"original"}),s=o?Ao(fo.colourised[t],e.color.shade==="dimmed"):de(fo.zx[t]),i=o?Le(s,.66):de(fo.zx[t],"dimmed"),a=o?Ao("pureBlack",e.color.shade==="dimmed"):de("black"),l=new _t({lutType:"sparse",paletteSwaps:{replaceLight:s,replaceDark:i,pureBlack:a}});r.filters=l;const c=ln(this.pixiRenderer,r,this.#n.texture===Y.EMPTY?void 0:this.#n.texture);r.texture=We().textures["button.pressed"];const u=ln(this.pixiRenderer,r,this.#r.texture===Y.EMPTY?void 0:this.#r.texture);this.#n.texture=c,this.#r.texture=u,l.destroy({destroyLutTexture:!0}),r.destroy({children:!0})}}const Vo=n=>{if(n instanceof re){const{texture:e}=n;e instanceof dt&&e.destroy(!0)}for(const e of n.children)Vo(e)};class Aa{constructor(e,t){this.renderContext=e,this.appearance=t}#e;output=new C({label:"AppearanceRenderer"});destroy(){this.#e?.output&&Vo(this.#e.output),this.output.destroy({children:!0})}tick(e){const t=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),Vo(this.#e.output),this.#e.output.destroy({texture:!1,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}const Or=-11;class yt extends Aa{constructor(e,t){super(e,t)}}const eo=(n,e)=>n.every(t=>e.currentActionPress(t,!0)!=="released"),lh=({renderContext:{button:n,inputStateTracker:e,general:{colourised:t,pixiRenderer:o}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=r?.renderProps,l=r?.output,u=(s&&Bt(s))?.hasBag??!1,d=eo(n.actions,e),h=a===void 0||d!==a.pressed||t!==a.colourised||u!==a.hasBag,p=i!==a?.renderedInRoom;if(!h&&!p)return"no-update";const f=l===void 0?new Qn(t,n.which,o,new X({pixiRenderer:o,text:"C+J",y:Or})):l;return p&&(f.generateButtonSpriteTextures(i),f.shownOnSurface.tint=vr(t,i?.color.shade==="dimmed")),u?(f.visible=!0,a?.pressed!==d&&(f.pressed=d)):f.visible=!1,{output:f,renderProps:{pressed:d,hasBag:u,colourised:t,renderedInRoom:i}}},en=n=>{const{gameTime:e,lastDiedAt:t}=n.type==="headOverHeels"?n.state.head:n.state;return e-t<Ll},to=(n,e)=>{const{head:t,heels:o,headOverHeels:r}=Xn(e.items);if(r!==void 0)return en(r)?void 0:r;const s=t===void 0||en(t)||t.state.action==="death"?void 0:Wr(t.state.position,n),i=o===void 0||en(o)||o.state.action==="death"?void 0:Wr(o.state.position,n);return s===void 0?o:i===void 0||s<i?t:o},ue={movementType:"steady"},ch=n=>tr(n)?we[n.config.which]:we[n.type],no=n=>tr(n)?we[n.config.which]:we[n.type],ds=(n,e,t)=>{switch(t){case"opposite":return{x:e.x===0?n.x:-n.x,y:e.y===0?n.y:-n.y,z:0};case"clockwise":return{x:-n.y,y:n.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const o=wr([-1,1]);return{x:e.x===0?o*n.y:0,y:e.y===0?o*n.x:0,z:0}}}},Oa=150,Ue=Object.freeze({movementType:"vel",vels:{walking:H}}),hs=A.x/2,uh=({state:{position:n,vels:{walking:e}}},t,o,r)=>{const s=we.homingBot;if(!Fe(e,le))return{movementType:"steady"};for(const i of Ge(Xn(t.items))){if(i===void 0)continue;const a=ye(i.state.position,n);if(Math.abs(a.y)<hs)return{movementType:"vel",vels:{walking:{x:a.x>0?s:-s,y:0,z:0}}};if(Math.abs(a.x)<hs)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?s:-s,z:0}}}}return{movementType:"steady"}},dh=(n,e,t,o)=>{const{state:{position:r,facing:s}}=n,i=to(r,e);if(i===void 0)return ue;const a=ye(i?.state.position,r),l=an[Lt(a)];return Fe(l,s)?ue:{movementType:"steady",stateDelta:{facing:l}}},hh=(n,e,t,o)=>{const{state:{position:r,standingOnItemId:s,timeOfLastDirectionChange:i,facing:a}}=n;if(s===null)return Ue;const l=to(r,e);if(l===void 0||i+Oa>e.roomTime)return ue;const c=ye(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>A.x/4?u:dn(u),h=no(n),p={...H,[d]:c[d]>0?h:-h},f=hn(p),m=!Fe(f,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:f,...m?{timeOfLastDirectionChange:e.roomTime}:ce}}},ps=(n,e,t,o,r=!1)=>{const{state:{position:s,standingOnItemId:i}}=n;if(i===null)return Ue;const a=to(s,e);if(a===void 0)return Ue;const l=a.state.position,c=A.x*3;if(!(s.x>l.x-c&&s.x<l.x+c&&s.y>l.y-c&&s.y<l.y+c)||a.state.standingOnItemId===n.id)return Ue;const d=ye(a.state.position,s),h=no(n),p=(1+Math.SQRT2)/2,f=h*p,m=N({...d,z:0},f/Ul(un(d))*(r?-1:1));return{movementType:"vel",vels:{walking:m},stateDelta:{facing:m}}},mo=(n,e,t,o,r)=>{const{state:{vels:{walking:s},standingOnItemId:i}}=n;if(i===null)return Ue;const{shared:{speed:a}}=nt;if(!(Et(s,H)?a!==0:Math.random()<o/1e3))return ue;const c=wr(r),u=an[c];return{movementType:"vel",vels:{walking:N(u,no(n))},stateDelta:{facing:an[c]}}},ph=(n,e,t,o)=>{const{state:{facing:r,vels:{walking:s},standingOnItemId:i}}=n;return i===null?Ue:Fe(s,le)||!Gl(s,r)?{movementType:"vel",vels:{walking:N(r,no(n))}}:ue},In=({movingItem:n,touchedItem:{state:{position:e},aabb:t},deltaMS:o},r)=>{const{state:{position:s,vels:{walking:i},activated:a,facing:l},aabb:c}=n;if(!a||(n.state.durationOfTouch+=o,n.state.durationOfTouch<Oa))return;const u=Yn(s,c,e,t);if(u.x===0&&u.y===0)return;const d=ds(i,u,r);n.state.vels.walking=d;const h=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;n.state.facing=N(Fe(d,le)?ds(l,u,r):hn(d),h),n.state.durationOfTouch=0},fh=({movingItem:n,movementVector:e})=>{e.z<0||(n.state.vels.walking=H)},mh=(n,e,t,o)=>{if(!n.state.activated||tr(n)&&n.state.busyLickingDoughnutsOffFace)return Ue;switch(n.config.movement){case"patrol-randomly-diagonal":return mo(n,e,t,o,Hl);case"patrol-randomly-xy8":return mo(n,e,t,o,Vl);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return mo(n,e,t,o,Wl);case"towards-tripped-on-axis-xy4":return uh(n,e);case"towards-on-shortest-axis-xy4":return hh(n,e);case"back-forth":case"forwards":case"clockwise":return ph(n);case"turn-to-player":return dh(n,e);case"towards-analogue":return ps(n,e);case"towards-analogue-unless-planet-crowns":return ps(n,e,t,o,El(k.getState()));default:throw n.config,new Error("this should be unreachable")}},gh=n=>{const{movingItem:e,touchedItem:t}=n;if(mt(t,e))switch(e.config.movement){case"patrol-randomly-xy4":In(n,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":In(n,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":In(n,"opposite");break;case"clockwise":In(n,"clockwise");break;case"towards-tripped-on-axis-xy4":fh(n);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":case"forwards":return;default:throw e.config,new Error("this should be unreachable")}};function xh(n){const e=n.movingItem.type==="monster"?n.movingItem:n.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Fa=(n,e,t)=>{$l(n);for(const o of t){if(o.movementType==="position"&&nr(n,o.posDelta),o.movementType==="vel"&&(Ve(e)||pn("lift")(e)))for(const[s,i]of xi(o.vels))e.state.vels[s]=i;const r=o.stateDelta;r!==void 0&&Object.assign(e.state,r)}return n},Ht=({config:{activatedOnStoreValue:n}})=>n===void 0?!0:!!Nl(k.getState().gameMenus.gameInPlay,n),yh=(n,e,t,o)=>{const{type:r,state:{teleporting:s,standingOnItemId:i}}=n,{inputStateTracker:a}=t,c=r===t.currentCharacterName?a.currentActionPress("jump"):"released",u=i===null?null:e.items[i],d=u!==null&&yi(u)&&Ht(u);if(s===null)return c!=="released"&&d?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:u.state.toRoom,timeRemaining:Vn}}}:ue;const h=Math.max(s.timeRemaining-o,0);switch(s.phase){case"out":if(!d)return{movementType:"steady",stateDelta:{teleporting:null}};if(h===0)return or({changeType:"teleport",sourceItem:u,playableItem:n,gameState:t,toRoomId:s.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Vn}}};break;case"in":if(h===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...s,timeRemaining:h}}}},Pn=n=>{const e=n-jl,o=e/Xl*er;return(e+.5*Ro*o**2)/o},bh={head:Pn(wn.head),headOnSpring:Pn(wn.head+A.z),heels:Pn(wn.heels),heelsOnSpring:Pn(wn.heels+A.z)},fs=(n,e,t)=>{const o=n.type==="headOverHeels"||n.type==="heels"&&t?"head":n.type;return bh[`${o}${e?"OnSpring":""}`]},vh=n=>!(n===null||yi(n)&&Ht(n)||Jl(n)&&n.config.gives==="scroll"||be(n)&&n.state.standingOnItemId===null),wh=n=>n.state.jumped&&n.state.position.z===n.state.jumpStartZ&&n.state.jumpStartTime+Yl>(n.type==="headOverHeels"?n.state.head.gameTime:n.state.gameTime),Da=(n,e,t)=>{const{state:{standingOnItemId:o}}=n,{inputStateTracker:r}=t,s=rr(e,n.state),i=s===null?null:e.items[s];if(wh(n))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:fs(n,!1,n.type==="heels"&&n.state.isBigJump)}},stateDelta:{}};const a=n.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&vh(i);if(!o&&a&&console.log("coyote jump"),!a)return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...n.type==="heels"?{isBigJump:!1}:{}}}:ue;const l=n.type==="heels"&&n.state.bigJumps>0,c=bi(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:fs(n,c,l)}},stateDelta:{action:"moving",jumped:!0,...n.type==="heels"?l?{bigJumps:n.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:n.state.position.z,jumpStartTime:n.type==="headOverHeels"?n.state.head.gameTime:n.state.gameTime}}},Sh=({vel:n,acc:e,unitD:t,maxSpeed:o,deltaMS:r,minSpeed:s=0})=>{const i=ft(n),a=Math.max(s,Math.min(o,i+e*r)),l=Math.min(a,o);return N(t,l)},Ch={movementType:"vel",vels:{walking:H}},za=(n,e,t,o)=>{const r=Th(n,e,t,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=ft(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:n.state.walkDistance+i*o},n.type==="head"&&n.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:n.state.gameWalkDistance+i*o})}n.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Et(r.vels.walking,H)&&(r.stateDelta={...r.stateDelta,walkStartFacing:n.state.facing});const s=un(n.state.vels.walking);return r.movementType==="vel"&&Fe(le,r.vels.walking??le)&&s>0&&(r.stateDelta={...r.stateDelta,stoppedWalkingAtGameTime:t.gameTime,stoppedWalkingSpeed:s}),r},Th=(n,e,{inputStateTracker:t,currentCharacterName:o,gameTime:r},s)=>{const{type:i,state:{action:a,autoWalk:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,stoppedWalkingAtGameTime:p,stoppedWalkingSpeed:f,vels:{walking:m,gravity:g}}}=n,x=rr(e,n.state),R=o===n.id,_=R?t.currentActionPress("jump"):"released",b=R?t.directionVector:H,y=x===null&&g.z<0,v=i==="head"&&_r(n.state)>0&&x!==null,I=i==="headOverHeels"?y?"head":"heels":v?"heels":i,T=l?c:b,D=(x===null?ql:we)[I];if(u!==null||a==="death")return Ch;if(i==="heels"){if(x===null)return n.state.jumped?{movementType:"vel",vels:{walking:fn(m,N(m,Zl*s))},stateDelta:{action:y?"falling":"jumping"}}:{movementType:"vel",vels:{walking:H},stateDelta:{action:"falling"}};if(_!=="released"){const B=hn(Fe(T,le)?c:T),L=bi(mn(x,e))?1:Ql;return{movementType:"vel",vels:{walking:N({...B,z:0},D*L)},stateDelta:{facing:B}}}}if(ft(T)!==0)return y?{movementType:"vel",vels:{walking:N({...T,z:0},D)},stateDelta:{facing:T,action:"falling"}}:un(m)<Te&&(p??He)+Kl>r&&(f??0)>Te?(console.log("keep speed grace"),{movementType:"vel",vels:{walking:N(T,f)},stateDelta:{facing:T,action:"moving"}}):{movementType:"vel",vels:{walking:Sh({vel:m,acc:ec[I],deltaMS:s,maxSpeed:D,unitD:T,minSpeed:0})},stateDelta:{facing:T,action:"moving"}};if(d>0&&d<1){const B=Et(h,c)?1:0;return{movementType:"position",posDelta:N(c,B-d),stateDelta:{action:y?"falling":"idle",walkDistance:0,facing:c}}}return{movementType:"vel",vels:{walking:H},stateDelta:{action:y?"falling":"idle"}}},et=(n,...e)=>pn(...e)(n.touchedItem),jt=(n,...e)=>pn(...e)(n.movingItem),La=n=>be(n.movingItem),kh=n=>be(n.touchedItem),Ih=n=>sr(n.touchedItem),ms=n=>Ve(n.movingItem)&&vi(n.movingItem,n.touchedItem,Math.abs(n.movementVector.z)),Ph={x:0,y:0,z:0},gs=n=>{if(n.touchedItem.type==="firedDoughnut"&&(n.movingItem.type==="head"||n.movingItem.type==="headOverHeels"||n.movingItem.type==="firedDoughnut"))return;const{touchedItem:{state:{disappearing:e}}}=n;if(e!==null&&(e.byType===void 0||e.byType.includes(n.movingItem.type))&&(e.on==="touch"||e.on==="stand"&&ms(n))){if(ms(n)&&La(n)&&n.movementVector.z<0){Hn(n.movingItem,n.room),ir({above:n.movingItem,below:n.touchedItem});const o=[Da(n.movingItem,n.room,n.gameState,n.deltaMS),za(n.movingItem,n.room,n.gameState,n.deltaMS)];Fa(Ph,n.movingItem,o)}wi(n)}},Rh=2*tc,Ea=(n,e,t,o,r=Rh)=>{const s={endAtRoomTime:e.roomTime+o+r,startAtRoomTime:e.roomTime+r,velocity:N(t,1/o),fromStandingOn:n.state.standingOnItemId};n.state.latentMovement.push(s)},_h=n=>{for(const e in n.state.stoodOnBy)return!0;return!1},Mh=(n,e,t,o)=>{for(const r of n){const s=t[r.id];if(s===void 0||!_h(r))continue;const i=fn(r.state.position,s);if(i.z=0,!Fe(i,le))for(const a of je(r.state.stoodOnBy,e))Ea(a,e,i,o)}},Bh=({movingItem:n,room:e,touchedItem:t,deltaMS:o})=>{const{state:{position:r,controls:s},aabb:i}=t,a=Yn(n.state.position,n.aabb,r,i);if(a.x===0&&a.y===0){t.state.lastPushDirection=void 0;return}const l=hn(a);t.state.lastPushDirection=Lt(Si(l,-1));for(const c of s){const u=e.items[c];if(u===void 0)continue;const{roomTime:d}=e;if(u.state.controlledWithJoystickAtRoomTime===d||c===void 0)continue;const h=N(l,-we.charles*o);u.state.facing=h,u.state.controlledWithJoystickAtRoomTime=d,Ci(t.id,u,e,!0,!1),Ea(u,e,h,o,1)}},Ah=n=>{const{movingItem:e,touchedItem:t,movementVector:o}=n;if(!mt(e))return;const{state:{position:r},aabb:s}=t,i=Yn(e.state.position,e.aabb,r,s),a=nc(e.state.position,e.aabb,r,s,o);a.z=0;const l=On(a);l<Te||ar(i,a)/l<.44||(oc(a),rc(a,-we.ball),t.state.vels.sliding=a)},Oh=n=>{const{movingItem:e,touchedItem:t}=n;if(!mt(t))return;const o=e.state.vels.sliding;if(Et(o,H))return;const{state:{position:r},aabb:s}=e,i=Yn(t.state.position,t.aabb,r,s);ar(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=H)},Fh=n=>n==="left"?"right":"left",Dh=(n,e)=>{if(n.expectType==="switch"&&"flip"in n)return{};if(n.expectType==="block"&&"makesStable"in n){const{makesStable:t}=n;return e===(t?"left":"right")?{disappearing:null}:{disappearing:{on:"stand"}}}if((n.expectType==="monster"||n.expectType==="movingPlatform")&&"activates"in n){const{activates:t}=n;return e===(t?"left":"right")?{activated:!0,everActivated:!0}:{activated:!1}}if(n.expectType==="monster"&&"switchedDirection"in n&&n.switchedDirection!==void 0){const{switchedDirection:t}=n,o=an[t];return{facing:e==="left"?o:N(o,-1)}}return n[`${e}State`]},Ho=(n,e,t,o,r=new Set)=>{r.add(t);for(const s of n)for(const i of he(o.items)){const{targets:a}=s;if(i.type!==s.expectType||!i.jsonItemId||a!==void 0&&!a.includes(i.jsonItemId)||i===void 0||r.has(i))continue;const l=i;l.state={...i.state,...Dh(s,e),switchedAtRoomTime:o.roomTime,switchedSetting:e},r.add(i),i.type==="switch"&&Ua(i,o,r)}},zh=(n,e,t)=>{const o=Fh(n.state.setting);n.state.setting=o;const r=n.config.modifies;Ho(r,o,n,e,t)},Lh=n=>n.config.type==="in-room",Ua=(n,e,t)=>{if(Lh(n))zh(n,e,t);else{const o=n.config;k.dispatch(ic({path:o.path}))}},Eh=({touchedItem:n,room:e})=>{const t=n.state.lastToggledAtRoomTime??He,{roomTime:o}=e;n.state.lastToggledAtRoomTime=o,!(t+sc>o)&&Ua(n,e)};function Ga({room:{roomTime:n},movingItem:e}){e.state.action!=="death"&&(Rr(e)||en(e)||(e.state.action="death",e.state.expires=n+Vn))}const Uh=3e3,Wa=n=>{const{gameState:e,movingItem:t,touchedItem:o,room:r}=n,{id:s,config:i}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[s]===!0)return;const d=()=>{l[s]&&(u[a]===void 0&&(u[a]={}),u[a][s]=!0)},h=p=>{const f=Ti(o);return{type:"floatingText",id:`floatingText-${s}`,...cr,fixedZIndex:dc,aabb:H,state:{...lr(),position:pe(f,{z:A.z/2}),expires:c+Uh},config:{textLines:p,appearanceRoomTime:c}}};switch(i.gives){case"hooter":{const p=Fn(t);if(p===void 0)return;p.hasHooter=!0,J({room:r,item:h(["hooter","collected"])}),d();break}case"doughnuts":{const p=Fn(t);if(p===void 0)return;p.doughnuts=Me(p.doughnuts,6),J({room:r,item:h(["+6","doughnuts"])}),d();break}case"bag":{const p=Bt(t);if(p===void 0)return;p.hasBag=!0,J({room:r,item:h(["bag","collected"])}),d();break}case"shield":{t.type==="headOverHeels"?(t.state.head.shieldCollectedAt=t.state.head.gameTime,t.state.heels.shieldCollectedAt=t.state.heels.gameTime):t.state.shieldCollectedAt=t.state.gameTime,J({room:r,item:h(["🛡","shield"])}),d();break}case"fast":{const p=Fn(t);if(p===void 0)return;p.fastStepsStartedAtDistance=p.gameWalkDistance,J({room:r,item:h(["⚡","fast steps"])}),d();break}case"jumps":{const p=Bt(t);if(p===void 0)return;p.bigJumps+=10,J({room:r,item:h(["♨","10","big jumps"])}),d();break}case"extra-life":t.type==="headOverHeels"?(t.state.head.lives=Me(t.state.head.lives,2),t.state.heels.lives=Me(t.state.heels.lives,2),J({room:r,item:h(["+2","lives","each"])})):(t.state.lives=Me(t.state.lives,2),J({room:r,item:h(["+2","lives"])})),d();break;case"scroll":k.dispatch(uc(i)),d();break;case"reincarnation":{d();const p=lc(e,k.getState(),{characterPickingUp:t.type,pickupId:s});for(const f of Object.values(p.gameState.characterRooms))if(f.id===r.id){const m=h(["reincarnation","point","restored"]);f.items[m.id]=m}k.dispatch(cc(p)),J({room:r,item:h(["reincarnation","point","saved"])});break}case"crown":{k.dispatch(ac(i.planet)),J({room:r,item:h([i.planet,"liberated!"])}),d();break}}},Gh=({gameState:n,room:e,movingItem:t,touchedItem:o,movementVector:r})=>{const{config:{toRoom:s,direction:i}}=o;ar(i,r)<=0||t.state.action!=="death"&&(s===ki?(delete n.characterRooms[t.type],ur({room:e,item:t}),t.type==="headOverHeels"?(k.dispatch(lo("head")),k.dispatch(lo("heels")),k.dispatch(_o({offerReincarnation:!1}))):(k.dispatch(lo(t.type)),$n(t.type)in n.characterRooms?n.currentCharacterName=$n(t.type):k.dispatch(_o({offerReincarnation:!1})))):or({playableItem:t,gameState:n,toRoomId:s,sourceItem:o,changeType:"portal"}))},Wh=pn("floor","doorLegs","doorFrame","portal"),xs=n=>{switch(!0){case Ih(n):Ga(n);break;case et(n,"portal"):Gh(n);break;case et(n,"pickup"):Wa(n);break}Wh(n.touchedItem)||(n.movingItem.state.autoWalk=!1)},$o=n=>{La(n)&&xs(n),kh(n)&&xs({...n,movingItem:n.touchedItem,touchedItem:n.movingItem}),et(n,...Vr)&&Ah(n),jt(n,...Vr)&&Oh(n),(jt(n,"monster")&&et(n,"firedDoughnut")||jt(n,"firedDoughnut")&&et(n,"monster"))&&xh(n),(jt(n,"monster")||jt(n,"movingPlatform"))&&gh(n),et(n,"switch")&&Eh(n),et(n,"joystick")&&Bh(n),n.touchedItem.state.disappearing&&gs(n),n.movingItem.state.disappearing&&mt(n.touchedItem,n.movingItem)&&gs({...n,movingItem:n.touchedItem,touchedItem:n.movingItem})},Va=350,Vh=(n,e,t,o)=>{const r=n.type==="heels"?n.state:n.state.heels,{carrying:s}=r;if(s===null)return;const{inputStateTracker:i}=t;if(!(i.currentActionPress("carry")!=="released")||n.state.standingOnItemId===null||!Ha(n,e[Jn]))return;const{state:{position:c}}=n;J({room:e,item:s,atPosition:c}),Hn(n,e),r.carrying=null,Mo({subjectItem:n,gameState:t,room:e,posDelta:{x:0,y:0,z:s.aabb.z},forceful:!0,deltaMS:o,onTouch:$o,visited:new Set().add(n.id)}),ir({above:n,below:s}),i.inputWasHandled("carry",Va)},Ha=(n,e)=>{const t={state:{position:pe(n.state.position,{z:A.z})},aabb:n.aabb,id:"item.id-proposedPutdownLocation"},o=dr(t,e,r=>mt(r,n)&&r!==n);for(const r of o){if(!Ve(r))return console.log("carrying: cannot put down due to collision: item:",n,"can't move up because it would collide with non-free",r),!1;if(!Ha(r,e))return console.log("carrying: cannot put down due to collision: item:",n,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Hh=(n,e,t)=>{const{inputStateTracker:o}=t,r=n.type==="heels"?n.state:n.state.heels,{carrying:s,hasBag:i}=r;if(!i)return;const a=he(e.items).filter(hr),l=s===null?$a(n,e):void 0;for(const d of a)d.state.wouldPickUpNext=!1;l!==void 0&&(l.state.wouldPickUpNext=!0),o.currentActionPress("carry")!=="released"&&l!==void 0&&($h(e,r,l),o.inputWasHandled("carry",Va))},$h=(n,e,t)=>{e.carrying=t,t.state.wouldPickUpNext=!1,ur({room:n,item:t})},$a=(n,e)=>{const t=Rr(n),o=l=>hr(l)&&(t||!sr(l)),r=he(e.items).filter(o),s=Ii(n,r);if(s)return s;const i=rr(e,n.state),a=i&&e.items[i];if(a&&o(a))return a},Nh=(n,e,t)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&n?`block.organic.dark${t?".disappearing":""}`:`block.${e}${t?".disappearing":""}`,jh=({renderContext:{general:{pixiRenderer:n,colourised:e},item:{config:{style:t,times:o},state:{disappearing:r}},room:s},currentRendering:i})=>{const a=i?.renderProps,l=r!==null;return a===void 0||a.isDissapearing!==l?{output:Vt(n,S({textureId:Nh(s.color.shade==="dimmed",t,l),times:o,spritesheetVariant:e?"for-current-room":"uncolourised"})),renderProps:{isDissapearing:l}}:"no-update"},Xh=({renderContext:{item:{state:{pressed:n}},general:{colourised:e}},currentRendering:t})=>{const o=t?.renderProps;return o===void 0||n!==o.pressed?{output:S({textureId:n?"buttonInGame.pressed":"buttonInGame",spritesheetVariant:e?"for-current-room":"uncolourised"}),renderProps:{pressed:n}}:"no-update"},kt=({top:n,bottom:e})=>{const t=new C,o=S(e);t.addChild(o);const r=S(n);return r.y=-12,t.addChild(r),t[oo]=r,t[Fr]=o,t},oo=Symbol(),Fr=Symbol(),Yh=({top:n,bottom:e})=>{const t=new C;return t.addChild(e),n.y=-A.z,t.addChild(n),t[oo]=n,t[Fr]=e,t},Jh=({renderContext:{item:{state:{facing:n,actedOnAt:{roomTime:e,by:t}}},room:{roomTime:o,items:r},general:{colourised:s}},currentRendering:i})=>{const a=i?.renderProps,l=Lt(n)??"towards",c=o===e&&pt(pr(t)).some(h=>Pi(r[h]));if(!(a===void 0||l!==a.facingXy4||c!==a.controlledByJoystick))return"no-update";const d=s?"for-current-room":"uncolourised";return{output:kt({top:{textureId:`charles.${l}`,spritesheetVariant:d},bottom:{textureId:c?"headlessBase.all":"headlessBase",spritesheetVariant:d}}),renderProps:{facingXy4:l,controlledByJoystick:c}}},yn=n=>{for(const e in n)return!0;return!1},bn=n=>n,ys=250,qh=ut.animations["conveyor.x"].animationSpeed,bs=ut.animations["conveyor.x"].length,Zh=n=>1-(1-n)**2,Kh=3,Qh=(n,e)=>{for(let t=0;t<n.children.length;t++){const o=n.children[t],r=t*Kh%bs;o.gotoAndStop(e?bs-r-1:r)}},ep=(n,e,t)=>{const o=At(n),r=S({animationId:`conveyor.${o}`,reverse:n==="towards"||n==="right",times:e,spritesheetVariant:t}),s=r instanceof Ie?new C({children:[r]}):r;return Qh(s,n==="towards"||n==="right"),s},tp=({renderContext:{item:{config:{times:n},state:{stoodOnBy:e,direction:t}},room:{roomTime:o},general:{colourised:r,pixiRenderer:s}},currentRendering:i})=>{const a=i?.renderProps,l=yn(e),c=!l&&(a?.moving??!1),u=c?o:a?.roomTimeStoppedMoving??He,d=l?0:Math.min(o-u,ys),h=i?.output,p=!h||t!==a?.direction,m=p?Br(s,ep(t,n,r?"for-current-room":"uncolourised"),"conveyor.x"):h,g=Math.max(0,1-d/ys);if(g===0)m.stop();else{const x=qh*Zh(g);m.play(),m.animationSpeed=x}return p||c||l!==a?.moving?{output:m,renderProps:{moving:l,roomTimeStoppedMoving:u,direction:t}}:"no-update"},np=bn(tp);function Na(n,e){const t=e||new C;for(const o of n)t.addChild(o);return t}const ro=(n,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return S({...n,times:t})},bt=n=>ne(({renderContext:{item:e,general:{colourised:t}}})=>fr(e)?S({...typeof n=="string"?{textureId:n}:n,times:qn(e),spritesheetVariant:t?"for-current-room":"uncolourised"}):S({...typeof n=="string"?{textureId:n}:n,spritesheetVariant:t?"for-current-room":"uncolourised"})),op=n=>ne(({renderContext:{item:e,general:{paused:t,colourised:o}}})=>fr(e)?S({...n,times:qn(e),paused:t,spritesheetVariant:o?"for-current-room":"uncolourised"}):S({...n,paused:t,spritesheetVariant:o?"for-current-room":"uncolourised"})),me=n=>ne(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(fr(e))return Vt(t,ro(n,qn(e)));{const o=S(n);return o instanceof re?o:ke(t,o)}}),ne=n=>(({renderContext:e,currentRendering:t,tickContext:o})=>t===void 0?{output:n({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:ce}:"no-update"),ze=n=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:o})=>{if(o===void 0){const r=qn(t),s={output:Vt(e,ro(n(t.config),r)),renderProps:ce};return r&&(s.output.y-=((r.z??1)-1)*A.z),s}else return"no-update"}),rp=(n,e,t)=>{const r=We().textures[`door.frame.${n.planet}.${e}.near`]!==void 0?n.planet:"generic",s=n.color.shade==="dimmed"&&We().textures[`door.frame.${r}.dark.${e}.${t}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${t}`};function*sp({config:{direction:n,inHiddenWall:e,height:t}},o){const r=mr(n),s=r==="y"?1:16;function*i(a){if(e)t!==0&&(yield S({textureId:`generic.door.floatingThreshold.${r}`,...Rt(a,{y:-A.z*t}),spritesheetVariant:o}));else{yield S({pivot:{x:s,y:9},textureId:`generic.door.legs.base.${r}`,...Rt(a,{}),spritesheetVariant:o});for(let l=1;l<t;l++)yield S({pivot:{x:s,y:9},textureId:`generic.door.legs.pillar.${r}`,...Rt(a,{y:-l*A.z}),spritesheetVariant:o})}}yield*i(ht({...le,[r]:1})),yield*i(le),e||(yield S({pivot:{x:16,y:A.z*t+13},textureId:`generic.door.legs.threshold.double.${r}`,...ht({...le,[r]:1}),spritesheetVariant:o}))}const ja=(n,e)=>{const t=mr(n),o=dn(t),r=8;return n==="towards"||n==="right"?F({[o]:e[o]-r}):le},ip=ne(({renderContext:{item:n,general:{pixiRenderer:e,colourised:t}}})=>{const r=Na(sp(n,t?"for-current-room":"uncolourised")),s=ke(e,r),i=ja(n.config.direction,n.aabb);return s.x=i.x,s.y=i.y,s}),ap=ne(({renderContext:{item:{config:{direction:n,part:e,toRoom:t},aabb:o},room:r,general:{pixiRenderer:s,colourised:i}}})=>{const a=hc(k.getState())??k.getState().levelEditor?.campaignInProgress,l=mr(n),c=a?.rooms[t]??r,u=new _t({paletteSwaps:te(c.color.hue,r.color.shade==="dimmed",r.planet==="moonbase"?"light-mid":"light-dark"),lutType:"sparse"}),{x:d,y:h}=ja(n,o),p=S({textureId:rp(r,l,e),x:d,y:h,spritesheetVariant:i?"for-current-room":"uncolourised"});p.filters=u;const f=new C({children:[p]}),m=ke(s,f);return f.destroy({children:!0}),u.destroy({destroyLutTexture:!0,destroyMask:!0}),e==="top"&&(m.y=.5),m}),lp=we.floatingText,vs=12,ws=A.z*3,Ss=[w.shadow,w.redShadow,w.midGrey,w.metallicBlue,w.midRed,w.moss,w.pink,w.lightBeige,w.pastelBlue,w.lightGrey,w.highlightBeige],Cs=[...Ss,...new Array(20).fill(w.white),...Ss.toReversed()],cp=({renderContext:{item:{config:{textLines:n,appearanceRoomTime:e}},room:{roomTime:t},general:{displaySettings:{uncolourised:o},pixiRenderer:r},frontLayer:s},currentRendering:i})=>{const a=i?.output;let l;const u=(t-e)*lp;if(a===void 0){l=new C,s?.attach(l);for(let h=0;h<n.length;h++){const p=n[h],f=new X({pixiRenderer:r,y:h*vs,outline:!0,text:p.toUpperCase()});l.addChild(f)}}else l=a;let d=!1;for(let h=0;h<n.length;h++){const p=l.children[h],f=u+h*-vs,m=f>0&&f<ws;if(p.visible=m,d||=m,m&&!o){const g=Math.floor(f/ws*Cs.length);p.tint=Cs[g]}}return l.visible=d,l.y=-u,{output:l,renderProps:ce}},Ts=(n,e)=>e===0?n:Math.round(n/e)*e,ks=n=>n-Math.floor(n),up=(n,e,t,o)=>n<=o&&t<=e;var dp=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;uniform vec4 uTintColour;vec4 transparent=vec4(0.0,0.0,0.0,0.0);vec4 black=vec4(0.0,0.0,0.0,1.0);void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float fgIsTransparent=step(fg.a,0.001f);float bgIsBlack=step(length(bg),0.001f);finalColor=mix(mix(uTintColour,black,bgIsBlack),transparent,fgIsTransparent);}`;const hp=Q.from({vertex:Ne,fragment:dp,name:"colour-clash-filter"});class Is extends K{constructor(e){super({glProgram:hp,resources:{uBackTexture:Y.EMPTY,colourClashUniforms:{uTintColour:{value:e,type:"vec4<f32>"}}},blendRequired:!0})}}const pp=({state:{position:n}},e,t)=>{const o=s=>s.config.direction==="away"||s.config.direction==="left";return Na(he(e.items).filter(s=>s.type==="wall"||s.type==="doorLegs").filter(o).map(s=>{const{id:i,config:{direction:a},state:{position:l}}=s;return S({textureId:"floorOverdraw.cornerNearWall",label:i,...F(fn(l,n)),times:s.type==="wall"?pc(s.config):{[dn(At(a))]:2},anchor:{x:0,y:1},flipX:a==="away",spritesheetVariant:t?"for-current-room":"uncolourised"})}),new C({label:"floorOverdraws"}))},fp=(n,e)=>{const{config:{naturalFootprint:{aabb:t,position:o}},state:{position:r}}=e,s=Dn(ye(H,r)),{left:i,right:a}=he(n.items).filter(mc).filter(l=>{const{state:{position:c},aabb:u}=l,d=l.config.direction,h=At(d),p=dn(h),f=d==="away"||d==="left",m=o[h]+(f?1:0)*t[h],g=c[h]+(f?0:1)*u[h];return m!==g?!1:up(c[p],c[p]+u[p],o[p],o[p]+t[p])}).reduce((l,{aabb:c,renderAabb:u,renderAabbOffset:d,state:{position:h},fixedZIndex:p})=>{const f=p===gc,m=f?c:u??c,g=pe(h,d??H),x=Dn(pe(g,{x:m.x,y:f?m.y:0}))+s,R=Dn(pe(g,{x:f?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,x),right:Math.max(l.right,R)}},{left:9999,right:-9999});if(a>i)return new xe().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},Ps=({direction:n,times:e,position:t,colourised:o})=>S({label:`floorEdge(${n})`,textureId:`floorEdge.${n}`,times:e,...F(t),spritesheetVariant:o?"for-current-room":"uncolourised"}),mp=({room:n,xSize:e,ySize:t,y:o})=>{const r=new C({label:"floorColourClash"}),s=as(n,"right"),i=new C({label:"floorColourClash.right",filters:[new Is(s)]});for(let c=0;c<=t;c++){const u=ht({x:0,y:c,z:0}),d=new xe().rect(u.x-(c===0?0:8),u.y,24,8).fill(s);i.addChild(d)}r.addChild(i);const a=as(n,"towards"),l=new C({label:"floorColourClash.towards",filters:[new Is(a)]});for(let c=0;c<=e;c++){const u=ht({x:c,y:0,z:0}),d=new xe().rect(u.x-16,u.y,8*(c===0?2:3),8).fill(a);l.addChild(d)}return r.addChild(l),r.y=o,r},gp=ne(({renderContext:{room:n,item:e,general:{colourised:t,pixiRenderer:o},colourClashLayer:r,frontLayer:s}})=>{const{color:{shade:i}}=n,{config:a,state:{position:l},aabb:c}=e,{floorType:u,naturalFootprint:d}=a,h=new C({label:"floorAppearance"}),p=new C({label:"sprites"}),f=F({...c,y:0}),m=F({...c,x:0,y:0}),g=F({...c,x:0}),x=F(c),R=new $e({color:t?Un("pureBlack"):fc.black,width:1});if(u!=="none"){const _=new C({label:"tiles"}),b=u==="deadly"?`generic${i==="dimmed"?".dark":""}.floor.deadly`:`${a.scenery}${i==="dimmed"?".dark":""}.floor`,y=Oe(t?"for-current-room":"uncolourised").textures[b];try{mi(b)}catch($){throw new Error(`no floor textureId for floorType: ${u}, shade: ${i}`,{cause:$})}const v=ye(d.position,l),I={x:ks(v.x/A.x),y:ks(v.y/A.x)},T=8,D={x:f.x,y:x.y-T,width:g.x-f.x,height:m.y-x.y+2*T},E=ye(ht(Rt(I,{x:.5,y:.5})),{y:c.z},D),B=new Nu({texture:y,tilePosition:E,...D});_.addChild(B),_.addChild(pp(e,n,t));const U=new xe().moveTo(x.x,x.y).lineTo(g.x,g.y).lineTo(g.x,g.y+3).lineTo(m.x,m.y+3).lineTo(f.x,f.y+3).lineTo(f.x,f.y).fill({color:16711680,alpha:1}),L=ke(o,U);U.destroy(),_.addChild(L),_.mask=L;const G=new C({children:[_]});G.filters=R,p.addChild(G)}{const _=new C({label:"edges"});if(u==="none"){const I=new xe().moveTo(g.x,g.y+10).lineTo(g.x,g.y+100).lineTo(f.x,f.y+100).lineTo(f.x,f.y+10).lineTo(m.x,m.y+10).fill(0),T=ke(o,I);h.addChild(T),s.attach(T),I.destroy()}const b=Math.ceil(c.y/A.x);_.addChild(Ps({direction:"right",times:{y:b},position:{z:c.z},colourised:t}));const y=Math.ceil(c.x/A.x);_.addChild(Ps({direction:"towards",times:{x:y},position:{z:c.z},colourised:t})),p.addChild(_);const v=fp(n,e);if(v!==void 0){const I=ke(o,v);p.addChild(I),p.mask=I,v.destroy()}if(h.addChild(ke(o,p)),p.destroy({children:!0}),R.destroy(!1),!t){const I=mp({xSize:y,ySize:b,y:-c.z+1,room:n});h.addChild(I),r.attach(I)}}return h}),xp=n=>{const e=new C({label:"joystick"});return e.addChild(S({textureId:"joystick.stick",spritesheetVariant:n})),e.addChild(S({textureId:"joystick.ball",spritesheetVariant:n})),e},yp=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,le]]),bp=({renderContext:{item:{state:{actedOnAt:n,lastPushDirection:e}},room:{roomTime:t},general:{colourised:o}},currentRendering:r})=>{const s=r?.renderProps,i=t===n.roomTime?e:void 0,a=s?.pushDirection;if(!(s===void 0||i!==a))return"no-update";const c=r?.output??xp(o?"for-current-room":"uncolourised"),u=c.getChildAt(1),d=yp.get(i);return u.x=d?.x??0,u.y=d?.y??0,{output:c,renderProps:{pushDirection:i}}},vp=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle","homingBot"],Rs=(n,e,t,o)=>{const r=pi(o);return Math.sin((n+r*2e4)/e)*t},wp=50,Sp=200,Cp=.25,Tp=1,Ze=({id:n,config:{which:e},state:t},o,r)=>{const s=e==="emperorsGuardian"||e==="helicopterBug",i=e==="cyberman"||e==="bubbleRobot"||e==="computerBot"||e==="emperorsGuardian";if((i||e==="helicopterBug")&&t.activated||s){const l=e==="computerBot"||e==="helicopterBug",c=l?wp:Sp,u=l?Cp:Tp;if(i){const d=r;d[oo].y=-A.z+Rs(o.roomTime,c,u,n)}else r.y=Rs(o.roomTime,c,u,n)}return r},kp=({renderContext:{item:n,room:e,general:{paused:t,colourised:o}},currentRendering:r})=>{const{config:s,state:i,id:a}=n,l=r?.renderProps,{activated:c,busyLickingDoughnutsOffFace:u}=i,d=o?u?"doughnutted":!c&&vp.includes(s.which)?"deactivated":"for-current-room":"uncolourised";switch(s.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const h=Lt(i.facing)??"towards";if(!(l===void 0||c!==l.activated||u!==l.busyLickingDoughnutsOffFace||h!==l.facingXy4))return Ze(n,e,r.output),"no-update";const f={facingXy4:h,activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"skiHead":return{output:S({textureId:`${s.which}.${s.style}.${h}`,spritesheetVariant:d}),renderProps:f};case"elephantHead":return{output:S({textureId:`elephant.${h}`,spritesheetVariant:d}),renderProps:f};case"turtle":return{output:S(c&&!u?{animationId:`${s.which}.${h}`,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.${h}.1`,spritesheetVariant:d}),renderProps:f};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ze(n,e,kt({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"bubbles.jetpack",paused:t,spritesheetVariant:d}})):S({textureId:`${s.which}.${h}`,spritesheetVariant:d}),renderProps:f};case"computerBot":case"elephant":case"monkey":return{output:Ze(n,e,kt({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"headlessBase.flash",playOnce:"and-stop",spritesheetVariant:d}})),renderProps:f};default:throw new Error(`unexpected monster ${s}`)}break}case"homingBot":{const h=!Fe(i.vels.walking,le);return l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated||h!==l.walking?{spritesheetVariant:d,output:S(c&&!u?{animationId:h?"headlessBase.flash":"headlessBase.scan",spritesheetVariant:d}:{textureId:"headlessBase",spritesheetVariant:d}),renderProps:{activated:c,busyLickingDoughnutsOffFace:u,walking:h}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated))return Ze(n,e,r.output),"no-update";const p={activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"helicopterBug":case"dalek":return{output:Ze(n,e,S(c&&!u?{animationId:s.which==="dalek"&&e.color.shade==="dimmed"&&(e.planet==="blacktooth"||e.planet==="egyptus"||e.planet==="moonbase")?"dalek.dark":s.which,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.1`,spritesheetVariant:d})),renderProps:p};case"bubbleRobot":return{output:Ze(n,e,kt({top:{animationId:"bubbles.blueGreen",randomiseStartFrame:a,paused:t,spritesheetVariant:d},bottom:{textureId:"headlessBase",spritesheetVariant:d}})),renderProps:p};case"emperorsGuardian":return{output:Ze(n,e,kt({top:{textureId:"ball.blueGreen",spritesheetVariant:d},bottom:{animationId:"bubbles.cold",spritesheetVariant:d,paused:t}})),renderProps:p};case"emperor":return{output:S({animationId:"bubbles.cold",spritesheetVariant:d,paused:t}),renderProps:p};default:throw new Error(`unexpected monster ${s}`)}break}default:throw new Error(`unexpected monster ${s}`)}};var Ip=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const Pp=Q.from({vertex:Ne,fragment:Ip,name:"oneColour-filter"});class No extends K{constructor(e){super({glProgram:Pp,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[o,r,s]=e.toArray();t.uColour[0]=o,t.uColour[1]=r,t.uColour[2]=s}}const jo=.02,Rp=({name:n,action:e,facingXy8:t,teleportingPhase:o,gravityZ:r,paused:s,spritesheetVariant:i})=>{if(e==="death")return{animationId:`${n}.fadeOut`,paused:s,spritesheetVariant:i};if(o==="out")return{animationId:`${n}.fadeOut`,paused:s,spritesheetVariant:i};if(o==="in")return{animationId:`${n}.fadeOut`,paused:s,spritesheetVariant:i};if(e==="moving")return{animationId:`${n}.walking.${t}`,paused:s,spritesheetVariant:i};if(e==="jumping")return{textureId:r<jo?`${n}.walking.${t}.2`:`${n}.walking.${t}.1`,spritesheetVariant:i};if(e==="falling"){const l=`${n}.falling.${t}`;if(Ri(l))return{textureId:l,spritesheetVariant:i}}const a=`${n}.idle.${t}`;return gr(a)?{animationId:a,paused:s,spritesheetVariant:i}:{textureId:`${n}.walking.${t}.2`,spritesheetVariant:i}},Xo=Symbol(),Xa=Symbol(),_p=(n,e)=>{n[Xo].removeChildren(),n[Xo].addChild(S(Rp(e)))},go=(n,e,t,o,r)=>{const s=new C,i=new C;s[Xo]=i,s.addChild(i);const a=S({animationId:e?`shine.${n}InSymbio`:`shine.${n}`,paused:t,flipX:n==="heels",spritesheetVariant:o?"for-current-room":"uncolourised"});s.addChild(a),s[Xa]=a,s.filters=[new $e({color:r?de(r):Un(zo[n])}),new $e({color:r?de(r):Un("midRed")}),new No(r?de(r):Un(zo[n]))];for(const l of s.filters)l.enabled=!1;return s},_s=({gameTime:n,switchedToAt:e},t,o)=>(t==="headOverHeels"||t===o)&&e+yc>n,Mp=n=>{if(!en(n))return!1;const{gameTime:e,lastDiedAt:t}=n.type==="headOverHeels"?n.state.head:n.state;return(e-t)%Hr<Hr*bc},Bp=({highlighted:n,flashing:e,shining:t},o)=>{const[r,s,i]=o.filters;r.enabled=n,s.enabled=!n&&t,i.enabled=e},Ap=(n,e)=>{n[Xa].visible=e},xo=(n,e,t,o,r,s)=>{t&&_p(e,{name:n,...o,paused:r,spritesheetVariant:s}),Bp(o,e),Ap(e,o.shining)},Op=({renderContext:{item:n,general:{gameState:e,paused:t,colourised:o},room:r},currentRendering:s})=>{const{type:i,state:{action:a,facing:l,visualFacingVector:c,teleporting:u,vels:{gravity:{z:d}}}}=n,h=s?.renderProps,p=s?.output,f=Zn(c??l)??"towards",m=e!==void 0&&(n.type==="headOverHeels"?_s(n.state.head,"headOverHeels","headOverHeels"):_s(n.state,n.type,e.currentCharacterName)),g=Mp(n),x=Rr(n),R=ft(l),_=u?.phase??null,b={action:a,facingXy8:f,teleportingPhase:_,flashing:g,highlighted:m,shining:x,gravityZ:d},y=h===void 0||h.action!==a||h.facingXy8!==f||h.teleportingPhase!==_||h?.gravityZ>jo!=d>jo;let v;const I=o?"for-current-room":"uncolourised",T=o?void 0:r.color;if(i==="headOverHeels"){v=p??Yh({top:go("head",!0,t,o,T),bottom:go("heels",!0,t,o,T)});const D=v;xo("head",D[oo],y,b,t,I),xo("heels",D[Fr],y,b,t,I)}else v=p??go(i,!1,t,o,T),xo(i,v,y,b,t,I);return a==="moving"&&p instanceof Ie&&(p.animationSpeed=R*xc),{output:v,renderProps:b}},yo=bn(Op),bo=(n,e,t,o,r)=>{const s=`${n}.idle.${e}`,i=r?"sceneryPlayer":"uncolourised";return gr(s)?{animationId:s,randomiseStartFrame:t,paused:o,spritesheetVariant:i}:{textureId:`${n}.walking.${e}.2`,spritesheetVariant:i}},Fp=({renderContext:{item:{id:n,config:{which:e,startDirection:t}},general:{paused:o,colourised:r}},currentRendering:s})=>s?.renderProps===void 0?{output:e==="headOverHeels"?kt({top:bo("head",t,n,o,r),bottom:bo("heels",t,n,o,r)}):S(bo(e,t,n,o,r)),renderProps:ce}:"no-update",Dp=({renderContext:{item:{state:{vels:{sliding:n}},config:{startingPhase:e}},general:{paused:t,colourised:o}},tickContext:{deltaMS:r},currentRendering:s})=>{const a=(s?.renderProps?.distanceTravelled??0)+un(n)*(t?0:r),l=s?.output,c=o?"for-current-room":"uncolourised",u=l??S({textureId:"spikyBall.1",spritesheetVariant:c}),h=(Math.floor(a*2/zn.w)+e)%2+1;return u.texture=Oe(c).textures[`spikyBall.${h}`],{output:u,renderProps:{distanceTravelled:a}}},zp=bn(Dp),Ya=n=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:o,colourised:r}},tickContext:{lastRenderRoomTime:s},currentRendering:i})=>{const a=i?.renderProps,l=yn(e);let c;return i?.output?c=i?.output:(c=S({animationId:n?"shadowMask.spring.bounce":"spring.bounce",paused:o,spritesheetVariant:r?"for-current-room":"uncolourised"}),c.loop=!1,c.gotoAndStop(0)),s!==void 0&&t>s&&!l&&!o?c.gotoAndPlay(0):l!==(a?.compressed??!1)&&(l?c.gotoAndStop(1):c.gotoAndStop(0)),{output:c,renderProps:{compressed:l}}},Lp=bn(Ya(!1)),Ep=bn(Ya(!0)),Up=n=>{const{gameMenus:e}=k.getState();try{return _i(e,n.path)?"right":"left"}catch(t){throw new Error(`Error getting switch setting from store for switch with path "${n.path}"

while store has: ${JSON.stringify(e,null,2)}`,{cause:t})}},Gp=({renderContext:{item:{state:{setting:n},config:e},general:{colourised:t}},currentRendering:o})=>{const r=o?.renderProps,s=e.type==="in-store"?Up(e):n;return r===void 0||s!==r.setting?{output:S({textureId:`switch.${s}`,spritesheetVariant:t?"for-current-room":"uncolourised"}),renderProps:{setting:s}}:"no-update"},Wp=({renderContext:{item:n,room:e,general:{paused:t,colourised:o}},currentRendering:r})=>{const{state:{stoodOnBy:s},config:{times:i}}=n,a=r?.renderProps,l=Ht(n),c=l&&je(s,e).some(be);if(!(a===void 0||l!==a.activated||c!==a.flashing))return"no-update";const d=o?"for-current-room":"uncolourised";return{output:S(c?{animationId:"teleporter.flashing",times:i,paused:t,spritesheetVariant:d}:{textureId:l?"teleporter":"block.artificial",times:i,spritesheetVariant:d}),renderProps:{flashing:c,activated:l}}},Vp=({state:{stoodOnBy:n,position:e},config:{times:t}},o)=>{const r=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return je(n,o).filter(Mi).forEach(({id:s,state:{position:i}})=>{const a=ye(i,e),l={x:Math.floor(a.x/A.x),y:Math.floor(a.y/A.y)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(r[l.x][l.y]=s)}),r},Hp=(n,e)=>{let t=0,o=1;for(const r of e)for(const s of r)s!==void 0&&n.items[s]?.state.activated&&(t|=o),o<<=1;return t},$p=({renderContext:{item:n,room:e,general:{pixiRenderer:t,colourised:o}},currentRendering:r})=>{const{config:{times:s}}=n,i=r===void 0?Vp(n,e):r.renderProps.chargePositions,a=Hp(e,i);if(!(a!==r?.renderProps.cybermanActivationBitmask))return"no-update";const c=S({subSpriteVariations(d,h){const p=i[d][h];return p===void 0?{animationId:"toaster.off"}:e.items[p]?.state.everActivated?{animationId:"toaster.off"}:{textureId:"toaster.on"}},times:s??ce,spritesheetVariant:o?"for-current-room":"uncolourised"});return{output:Br(t,c,"toaster.off"),renderProps:{chargePositions:i,cybermanActivationBitmask:a}}},Np=(n,e,t,o)=>`${n}${o?".dark":""}.wall.${e}.${t}`,jp=ne(({renderContext:{general:{pixiRenderer:n,colourised:e},item:{id:t,config:o},room:r}})=>{if(o.direction==="right"||o.direction==="towards")throw new Error(`wall is near: ${t}`);const{direction:s,tiles:i}=o,a=dn(At(s)),l=new C({label:"wallTiles"}),c=new C({label:"wallAnimations"});for(let d=0;d<o.tiles.length;d++){const h=ht({[a]:d});if(l.addChild(S({textureId:Np(r.planet,i[d],s,r.color.shade==="dimmed"),...h,pivot:s==="away"?{x:zn.w,y:zn.h}:{x:0,y:zn.h},spritesheetVariant:e?"for-current-room":"uncolourised"})),r.planet==="moonbase"){const p=`moonbase.wall.screen.${i[d]}.away`;gr(p)&&c.addChild(S({animationId:p,randomiseStartFrame:`${t}${d}`,flipX:s==="left",x:h.x+(s==="away"?-8:8),y:h.y-23,spritesheetVariant:e?"for-current-room":"uncolourised"}))}}const u=new C({label:"wallAppearance"});return u.addChild(ke(n,l)),c.children.length>0&&u.addChild(c),u}),Xp={head:yo,heels:yo,headOverHeels:yo,doorFrame:ap,doorLegs:ip,monster:kp,floatingText:cp,barrier:ne(({renderContext:{item:{config:{axis:n,times:e,disappearing:t}},general:{colourised:o,pixiRenderer:r}}})=>Vt(r,S({textureId:`barrier.${n}${t?".disappearing":""}`,times:e,spritesheetVariant:o?"for-current-room":"uncolourised"}))),deadlyBlock:ne(({renderContext:{item:{config:n,id:e},general:{paused:t,colourised:o,pixiRenderer:r}}})=>{switch(n.style){case"volcano":{const s=S({animationId:"volcano",times:n.times,randomiseStartFrame:e,paused:t,spritesheetVariant:o?"for-current-room":"uncolourised"});return Br(r,s,"volcano")}case"toaster":throw new Error("use the special toaster appearance instead");default:throw n.style,new Error("unknown deadly block style")}}),spikes:bt("spikes"),slidingDeadly:zp,slidingBlock:ne(({renderContext:{item:{config:{style:n}},general:{colourised:e}}})=>{const t=e?"for-current-room":"uncolourised";return S(n==="book"?{textureId:"book.y",spritesheetVariant:t}:{textureId:n,spritesheetVariant:t})}),block:jh,switch:Gp,button:Xh,conveyor:np,lift:ne(({renderContext:{general:{paused:n,colourised:e}}})=>{const t=new C,o=e?"for-current-room":"uncolourised",r={x:Qt.w/2,y:Qt.h};return t.addChild(S({animationId:"lift",pivot:r,paused:n,spritesheetVariant:o})),t.addChild(S({textureId:"lift.static",pivot:r,spritesheetVariant:o})),t}),teleporter:Wp,sceneryCrown:ne(({renderContext:{item:{config:{planet:n}},general:{colourised:e}}})=>S({textureId:`crown.${n}`,spritesheetVariant:e?"for-current-room":"uncolourised"})),pickup:ne(({renderContext:{item:{config:n},general:{paused:e,colourised:t}}})=>{const o=t?"for-current-room":"uncolourised";if(n.gives==="crown")return S({textureId:`crown.${n.planet}`,spritesheetVariant:o});const s={shield:{textureId:"whiteRabbit",spritesheetVariant:o},jumps:{textureId:"whiteRabbit",spritesheetVariant:o},fast:{textureId:"whiteRabbit",spritesheetVariant:o},"extra-life":{textureId:"whiteRabbit",spritesheetVariant:o},bag:{textureId:"bag",spritesheetVariant:o},doughnuts:{textureId:"doughnuts",spritesheetVariant:o},hooter:{textureId:"hooter",spritesheetVariant:o},scroll:{textureId:"scroll",spritesheetVariant:o},reincarnation:{animationId:"fish",paused:e,spritesheetVariant:o}}[n.gives];return S(s)}),moveableDeadly:bt("fish.1"),charles:Jh,joystick:bp,movingPlatform:bt("sandwich"),pushableBlock:bt("stepStool"),portableBlock:ne(({renderContext:{item:{config:{style:n}},general:{colourised:e}}})=>S({textureId:n,spritesheetVariant:e?"for-current-room":"uncolourised"})),spring:Lp,sceneryPlayer:Fp,hushPuppy:bt("hushPuppy"),bubbles:ne(({renderContext:{item:{id:n,config:{style:e}},general:{paused:t,colourised:o}}})=>S({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:n,spritesheetVariant:o?"for-current-room":"uncolourised"})),firedDoughnut:op({animationId:"bubbles.doughnut"}),ball:bt("ball"),floor:gp,particle:ne(({renderContext:{item:{config:{forCharacter:n}},general:{paused:e,colourised:t}}})=>S({animationId:`particle.${n==="head"?"head":"heels"}.fade`,anchor:{x:.5,y:.5},paused:e,spritesheetVariant:t?"for-current-room":"uncolourised"}))},Ja=n=>{if(n.type==="wall"){const{direction:e}=n.config;return e==="right"||e==="towards"?void 0:jp}return n.type==="deadlyBlock"&&n.config.style==="toaster"?$p:Xp[n.type]},qa=(n,e,t)=>{const r=Ja(n)({renderContext:{general:e.general,item:n,room:t,colourClashLayer:void 0,frontLayer:void 0,zEdges:vc,getItemRenderPipeline(){throw new Error("getOtherItemContainer not supported in carried sprite")}},tickContext:{lastRenderRoomTime:He,movedItems:Ot,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Yp=()=>{const n=S({label:"carriedItem"}),e=S({label:"bag",textureId:"bag",y:-2,spritesheetVariant:"original"});return new C({label:"carryButtonSurface",children:[n,e]})},Jp=({renderContext:n,currentRendering:e,tickContext:t})=>{const{button:o,inputStateTracker:r,general:{colourised:s,pixiRenderer:i}}=n,{currentPlayable:a,room:l}=t,c=e?.renderProps,u=e?.output,d=a&&Bt(a),h=d?.hasBag??!1,p=d?.carrying??null,f=p===null&&l!==void 0&&$a(a,l)!==void 0,m=eo(o.actions,r),g=h&&!f&&p===null,x=u??new Qn(s,o.which,i,Yp()),R=l!==c?.renderedInRoom;R&&x.generateButtonSpriteTextures(l),x.visible=h;const[_,b]=x.shownOnSurface.children;if(g!==c?.disabled||s!==c?.colourised||R){const y=Oe(s?g?"deactivated":"for-current-room":"uncolourised");b.texture=y.textures.bag}return c?.pressed!==m&&(x.pressed=m),p!==c?.carrying&&(b.visible=p===null,_.visible=p!==null),(p!==c?.carrying||R)&&(_.removeChildren(),p!==null&&l!==void 0&&_.addChild(qa(p,n,t.room))),{output:x,renderProps:{pressed:m,hasBag:h,colourised:s,carrying:p,disabled:g,renderedInRoom:l}}},qp=n=>{const e=S({textureId:"hooter",y:-3,spritesheetVariant:"original"}),t=S({textureId:"doughnuts",y:-2,spritesheetVariant:"original"}),o=new X({pixiRenderer:n,outline:!0,y:Or});return new C({label:"fireButtonSurface",children:[e,t,o]})},Zp=({renderContext:{button:n,inputStateTracker:e,general:{colourised:t,pixiRenderer:o}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=s&&Fn(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=eo(n.actions,e),d=c===0,h=l?"hooter":Dt(c)>0?"doughnuts":"none",p=r?.renderProps,f=i!==p?.renderedInRoom,m=u!==p?.pressed,g=d!==p?.disabled,x=h!==p?.showingSprite;if(p!==void 0&&t===p.colourised&&x&&!g&&!m&&!f)return"no-update";const R=r?.output??new Qn(t,n.which,o,qp(o));f&&R.generateButtonSpriteTextures(i),R.visible=h!=="none",m&&(R.pressed=u);const[_,b,y]=R.shownOnSurface.children;if(x&&(_.visible=h==="hooter",b.visible=h==="doughnuts"),g||f){const v=Oe(t?d?"deactivated":"for-current-room":"uncolourised");_.texture=v.textures.hooter,b.texture=v.textures.doughnuts,y.tint=vr(t,i.color.shade==="dimmed")}return c!==p?.doughnutsCount&&(y.text=Dt(c)),{output:R,renderProps:{pressed:u,colourised:t,showingSprite:h,renderedInRoom:i,disabled:d,doughnutsCount:c}}},Kp=new ae(16777215),It=(n,e=!0)=>n?e?"for-current-room":"deactivated":"uncolourised",Xt=(n,e,t)=>n?Kp:de(gn(e).hud[t?"brightHue":"dimmedHue"]),ct=(n,e,t)=>{const o=gn(e);return n?Ui(o.hud[t?"brightHue":"dimmedHue"],!1,e.shade==="dimmed"):de(o.hud[t?"brightHue":"dimmedHue"])},Ms=(n,e)=>{const t=gn(e);return n?Ui(t.hud.icons,!1,e.shade==="dimmed"):de(t.hud.icons)},Qp=(n,e)=>{const t=S({animationId:"teleporter.flashing",y:5,spritesheetVariant:It(n)}),o=new X({pixiRenderer:e,text:"JUMP",y:Or});return new C({label:"jumpButtonSurface",children:[o,t]})},ef=({renderContext:{button:n,inputStateTracker:e,general:{colourised:t,pixiRenderer:o,paused:r}},tickContext:{room:s,currentPlayable:i},currentRendering:a})=>{const l=a?.renderProps,c=a?.output,u=i?.state.standingOnItemId??null,d=u===null||s===void 0?null:s.items[u],h=d===null?!1:d.type==="teleporter"&&Ht(d),p=eo(n.actions,e),f=c??new Qn(t,n.which,o,Qp(t,o)),m=l?.pressed!==p;m&&(f.pressed=p);const g=s!==l?.renderedInRoom,x=h!==l?.isStandingOnActiveTeleporter,R=r!==l?.paused,[_,b]=f.shownOnSurface.children;if(R&&(r?b.gotoAndStop(0):b.gotoAndPlay(0)),!x&&!g&&!m)return"no-update";if(x&&(b.visible=h,_.visible=!h),g){const y=Oe(It(t));b.textures=Mr(y.animations["teleporter.flashing"]),r||b.gotoAndPlay(0),_.tint=vr(t,s?.color.shade==="dimmed"),f.generateButtonSpriteTextures(s)}return{output:f,renderProps:{pressed:p,isStandingOnActiveTeleporter:h,colourised:t,renderedInRoom:s,paused:r}}},tf=({currentRendering:n,tickContext:e,renderContext:t})=>n!==void 0?(n.output.tint=ct(t.general.colourised,e.room.color,!1),"no-update"):{output:new X({pixiRenderer:t.general.pixiRenderer,label:"mapText",outline:!0,text:"MAP"}),renderProps:ce},nf=({currentRendering:n,tickContext:e,renderContext:t})=>n!==void 0?(n.output.tint=ct(t.general.colourised,e.room.color,!1),"no-update"):{output:new X({pixiRenderer:t.general.pixiRenderer,label:"menuText",outline:!0,doubleHeight:!0,doubleWidth:!0,text:"☰"}),renderProps:ce},of=6e-4,rf=1e-4,Rn=.3,sf=40;class af{#e={x:0,y:0};#t=0;#o=!1;startDrag(){this.#o=!0,this.#e={x:0,y:0},this.#t=performance.now()}stopDrag(){this.#o=!1}updateVelocity(e){const t=performance.now(),o=t-this.#t;if(o>0){const r=e.x/o,s=e.y/o;this.#e.x=this.#e.x*(1-Rn)+r*Rn,this.#e.y=this.#e.y*(1-Rn)+s*Rn}this.#t=t}checkStationaryDrag(){this.#o&&performance.now()-this.#t>sf&&(this.#e={x:0,y:0})}applyInertia(e){const t={x:0,y:0};if(!this.#o){const o=Math.sqrt(this.#e.x*this.#e.x+this.#e.y*this.#e.y);if(o>rf){t.x=this.#e.x*e,t.y=this.#e.y*e;const r=of*e,s=Math.max(0,o-r);if(s>0){const i=s/o;this.#e.x*=i,this.#e.y*=i}else this.#e.x=0,this.#e.y=0}else this.#e.x=0,this.#e.y=0}return t}reset(){this.#e={x:0,y:0},this.#o=!1,this.#t=0}get isDragging(){return this.#o}}const Yo=(n,e,t)=>(e?(t.x=n.y,t.y=n.x):(t.x=n.x,t.y=n.y),t),lf={x:-1,y:-1};class cf{constructor(e){this.renderContext=e;const{x:t,y:o}=e.general.upscale.gameEngineScreenSize;this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer),this.output.rect(0,0,t,o).fill("#00000000")}output=new xe({label:"OnScreenLook",eventMode:"static"});#e;#t={x:-1,y:-1};#o;#n=new af;handleTouchStart=e=>{if(this.#e!==void 0&&this.stopCurrentPointer(),this.#o.curPointerId===e.pointerId)return;const t=this.renderContext.general.upscale.rotate90;this.#e=e.pointerId,Yo(e,t,this.#t),this.#n.startDrag(),this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation)};stopCurrentPointer=()=>{this.#e=void 0,this.#n.stopDrag(),this.renderContext.inputStateTracker.hudInputState.directionVector=H,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#e)return;const t=this.renderContext.general.upscale.rotate90,o=this.#t,r=Bi(k.getState()),{x:s,y:i}=Yo(e,t,lf),a=(o.x-s)/r;let l=(o.y-i)/r;t&&(l=-l),this.#n.updateVelocity({x:a,y:l});const{inputStateTracker:{hudInputState:c}}=this.renderContext;c.lookVector.x+=a,c.lookVector.y+=l,o.x=s,o.y=i};tick(e){if(k.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer(),this.#n.reset();return}const{deltaMS:o}=e,{inputStateTracker:{hudInputState:r}}=this.renderContext;this.#n.checkStationaryDrag();const s=this.#n.applyInertia(o);r.lookVector.x+=s.x,r.lookVector.y+=s.y}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}get curPointerId(){return this.#e}set joystickRenderer(e){this.#o=e}}const ge=14,uf=2,df={x:-1,y:-1},hf=Math.cos(30*(Math.PI/180)),pf=55,ff="#00000000";class mf{constructor(e){this.renderContext=e;const{inputDirectionMode:t,general:{colourised:o,pixiRenderer:r}}=e;this.#t=S({textureId:"joystick.whole",anchor:{x:.5,y:.5},y:1,spritesheetVariant:o?"for-current-room":"uncolourised"}),this.#e={away:new X({pixiRenderer:r,outline:!0,x:ge,y:-ge,text:"↗"}),right:new X({pixiRenderer:r,outline:!0,x:ge,y:ge,text:"↘"}),towards:new X({pixiRenderer:r,outline:!0,x:-ge,y:ge,text:"↙"}),left:new X({pixiRenderer:r,outline:!0,x:-ge,y:-ge,text:"↖"}),...t!=="4-way"?{awayRight:new X({pixiRenderer:r,outline:!0,x:ge*Math.SQRT2,text:"➡"}),towardsRight:new X({pixiRenderer:r,outline:!0,y:ge*Math.SQRT2,text:"⬇"}),towardsLeft:new X({pixiRenderer:r,outline:!0,x:-ge*Math.SQRT2,text:"⬅"}),awayLeft:new X({pixiRenderer:r,outline:!0,y:-ge*Math.SQRT2,text:"⬆"})}:{}},this.output.addChild(this.#t),this.output.addChild(new xe().circle(0,0,pf).fill(ff)),this.output.addChild(new C({children:Object.values(this.#e),y:wc/2})),this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer)}output=new C({label:"OnScreenJoystick",eventMode:"static"});#e;#t;#o;#n;#r;handleTouchStart=e=>{this.#o!==void 0&&this.stopCurrentPointer(),this.#n.curPointerId!==e.pointerId&&(this.#o=e.pointerId,this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#o=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=H,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#o)return;const{rotate90:t,gameEngineScreenSize:{y:o}}=this.renderContext.general.upscale,r=Bi(k.getState()),{x:s,y:i}=this.output,a=s,l=t?o-i:i,{x:c,y:u}=Yo(e,t,df),d=c/r,h=u/r,{width:p,height:f}=this.output.getLocalBounds(),m=(d-a)/(p/2),g=(h-l)/(f/2)*(t?-1:1),x=Sc({x:-m,y:-g});this.renderContext.inputStateTracker.hudInputState.directionVector=N(Cc(x,hf),uf)};tick({room:e}){const{renderContext:{general:{colourised:t},inputStateTracker:{directionVector:o}}}=this;if(this.#r!==e&&(this.#t.texture=Kt(t?"for-current-room":"uncolourised","joystick.whole"),this.#r=e),k.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const s=ft(o)>Tc?Zn(o):void 0,i=ct(t,e.color,!0),a=ct(t,e.color,!1);for(const[l,c]of xi(this.#e))c.tint=l===s?i:a}get curPointerId(){return this.#o}set lookRenderer(e){this.#n=e}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}}const Bs=30,As=15,gf=42,xf=36,yf=44,bf=20;class vf{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:t}},inputDirectionMode:o,general:r}=e;this.#t={mainButtonNest:new C({label:"mainButtonNest"}),buttons:{jump:new yt({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:t},ef),fire:new yt({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:t},Zp),carry:new yt({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:t},Jp),carryAndJump:new yt({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:t},lh),menu:new yt({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:t},nf),map:new yt({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:t},tf)},joystick:new mf({inputStateTracker:t,inputDirectionMode:o,general:r}),look:new cf({inputStateTracker:t,general:r})},this.#t.look.joystickRenderer=this.#t.joystick,this.#t.joystick.lookRenderer=this.#t.look,this.#o(),this.#n()}#e=new C({label:"OnScreenControls"});#t;#o(){const{buttons:e}=this.#t,{mainButtonNest:t,joystick:o,look:r}=this.#t;this.#e.addChild(r.output);for(const{renderContext:{button:{which:s}},output:i}of Ge(e))s==="menu"||s==="map"?this.#e.addChild(i):t.addChild(i);e.jump.output.y=As,e.carry.output.x=-Bs,e.carryAndJump.output.y=-As,e.fire.output.x=Bs,e.menu.output.x=24,e.menu.output.y=24,e.map.output.y=16,this.#e.addChild(t),this.#e.addChild(o.output)}#n(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const t of Ge(this.#t.buttons)){const{renderContext:{button:{actions:o}}}=t;t.output.eventMode="static",t.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),t.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),t.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#r(e){this.#t.mainButtonNest.x=e.x-yf,this.#t.mainButtonNest.y=e.y-bf,this.#t.joystick.output.x=gf,this.#t.joystick.output.y=e.y-xf,this.#t.buttons.map.output.x=e.x-32}tick(e){const{screenSize:t}=e,{general:{gameState:o}}=this.renderContext;this.#r(t);for(const r of Ge(this.#t.buttons))r.tick({...e,currentPlayable:Ut(o)});this.#t.joystick.tick(e),this.#t.look.tick(e)}get output(){return this.#e}destroy(){this.#t.joystick.destroy(),this.#t.look.destroy(),this.#e.destroy({children:!0})}}ut.frames.button.frame;const wf=n=>n.room!==void 0,Sf=n=>n?48:24,Cf=n=>n?68:56,Tf=(n,e)=>n?e.x/2-24:80,kf=n=>n?72:24,If=n=>n?88:0,Os=112,Yt=n=>n==="heels"?1:-1,Fs="head.walking.right.2",Ds="heels.standing.towards";class Pf{constructor(e){this.renderContext=e;const{onScreenControls:t,general:o}=e;this.#n={head:{sprite:this.#c("head"),livesText:new X({pixiRenderer:o.pixiRenderer,label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#a({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#a({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#c("heels"),livesText:new X({pixiRenderer:o.pixiRenderer,label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#a({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new C({label:"heelsCarrying"})}}};for(const s of Sn)this.#e.addChild(this.#n[s].shield.container),this.#e.addChild(this.#n[s].extraSkill.container);t||(this.#e.addChild(this.#n.head.doughnuts.container),this.#e.addChild(this.#n.head.hooter.container),this.#e.addChild(this.#n.heels.bag.container),this.#e.addChild(this.#n.heels.carrying.container)),this.#l(),t&&(this.#t=new vf({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#t.output));for(const s of Sn)this.#e.addChild(this.#n[s].sprite),this.#e.addChild(this.#n[s].livesText);this.#r=gi({predicate(s,i,a){return rt(i)!==rt(a)},effect:(s,{getState:i})=>{rt(i())?(this.#o=new us(e),this.#i()):(this.#o?.destroy(),this.#o=void 0)}});const r=rt(k.getState());this.#o=r?new us(e):void 0,this.#o&&this.#i()}#e=new C({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#o;#n;#r;#s=void 0;#i(){this.#e.addChild(this.#o.output)}#l(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const t of Sn){const{sprite:o,livesText:r}=this.#n[t];for(const s of[o,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${t}`]=!0}),s.on("pointerup",()=>{e[`swop.${t}`]=!1}),s.on("pointerleave",()=>{e[`swop.${t}`]=!1})}}#a({textureId:e,textOnTop:t=!1,noText:o=!1,outline:r=!1,label:s}){const i=new C({label:s});i.pivot={x:4,y:16};const a=new re({texture:We().textures[e],anchor:t?{x:.5,y:0}:{x:.5,y:1},y:t?0:8});i.addChild(a);const l=ot.w/2,c=new X({pixiRenderer:this.renderContext.general.pixiRenderer,outline:r==="text-only",y:t?0:16,x:l});return o&&(c.visible=!1),a.x=l,i.addChild(c),r===!0&&(i.filters=xn.pureBlack),{textContainer:c,icon:a,container:i}}#c(e){const t=new re(We().textures[e==="head"?Fs:Ds]);return t.anchor={x:.5,y:0},t}#u({screenSize:e}){this.#n.head.hooter.container.x=this.#n.head.doughnuts.container.x=(e.x>>1)+Yt("head")*Os,this.#n.head.doughnuts.container.y=e.y-Qt.h-8,this.#n.heels.carrying.container.y=e.y-Qt.h,this.#n.heels.carrying.container.x=this.#n.heels.bag.container.x=(e.x>>1)+Yt("heels")*Os,this.#n.heels.bag.container.y=this.#n.head.hooter.container.y=e.y-8,this.#o&&(this.#o.output.x=e.x/2-ot.w*1.5)}#d({room:e}){const{renderContext:{general:{gameState:t,colourised:o}}}=this,r=Cn(t,"heels"),s=r?.carrying??null,{container:i}=this.#n.heels.carrying,a=i.children.length>0;if(s===null&&a){for(const u of i.children)u.destroy();this.#s=void 0}if(s!==null&&(!a||e!==this.#s)){const u=qa(s,this.renderContext,e);this.#s=e,i.removeChildren(),i.addChild(u),i.tint=Xt(o,e.color,!0)}const l=this.#n.heels.bag.icon,c=r?.hasBag;l.texture=Kt(It(o,c??!1),"bag"),l.tint=Xt(o,e.color,c??!1)}#h({room:e}){const{renderContext:{general:{gameState:t,colourised:o}}}=this,r=Cn(t,"head"),s=r?.doughnuts??0,i=s!==0,a=r?.hasHooter,l=this.#n.head.hooter.icon,c=this.#n.head.doughnuts.icon,u=this.#n.head.doughnuts.textContainer;l.texture=Kt(It(o,a??!1),"hooter"),c.texture=Kt(It(o,i),"doughnuts"),this.#n.head.doughnuts.textContainer.text=s,u.tint=ct(o,e.color,!1),l.tint=Xt(o,e.color,a??!1),c.tint=Xt(o,e.color,i)}#f(e,{screenSize:t,room:o}){const{renderContext:{onScreenControls:r,general:{gameState:s,colourised:i}}}=this,a=Cn(s,e),{textContainer:l,container:c,icon:u}=this.#n[e].shield,{textContainer:d,container:h,icon:p}=this.#n[e].extraSkill,f=Gn(a),m=f>0||!r;c.visible=m,m&&(l.text=f,c.y=t.y-If(r)),h.x=c.x=(t.x>>1)+Yt(e)*Tf(r,t);const g=a===void 0?0:e==="head"?_r(a):a.bigJumps,x=g>0||!r;h.visible=x,x&&(d.text=g,h.y=t.y-kf(r)),d.tint=ct(i,o.color,!1),l.tint=ct(i,o.color,!1),u.tint=Ms(i,o.color),p.tint=Ms(i,o.color)}#p(e,t){const{currentCharacterName:o}=e;return o===t||o==="headOverHeels"}#m(e,{screenSize:t,room:o}){const{renderContext:{onScreenControls:r,general:{gameState:s,colourised:i}}}=this,a=this.#n[e].sprite;let l;const c=this.#p(s,e),u=It(i,c);try{l=Kt(u,e==="head"?Fs:Ds)}catch(d){throw console.error(this.renderContext),new Error(`error getting texture for variant ${u}`,{cause:d})}a.texture=l,a.x=(t.x>>1)+Yt(e)*Cf(r),a.y=t.y-Qt.h,a.tint=Xt(i,o.color,c)}#g(e,{screenSize:t,freeCharacters:o,room:r}){const{renderContext:{onScreenControls:s,general:{gameState:i,colourised:a}}}=this,c=o[e]??!1?"FREE":Cn(i,e)?.lives??0,u=this.#n[e].livesText;u.x=(t.x>>1)+Yt(e)*Sf(s),u.y=t.y,u.text=c;const d=this.#p(i,e),h=r.color.shade==="dimmed",p=a?Ei(h)[d?zo[e]:"midGrey"]:de(gn(r.color).hud.brightHue);u.tint=p}tick(e){if(wf(e)){for(const t of Sn)this.#g(t,e),this.#m(t,e),this.#f(t,e);this.#u(e),this.#h(e),this.#d(e),this.#t?.tick(e),this.#o&&(this.#o.isDark=e.room.color.shade==="dimmed")}}get output(){return this.#e}destroy(){this.#n.head.doughnuts.textContainer.destroy(),this.#n.head.hooter.textContainer.destroy(),this.#n.heels.bag.textContainer.destroy(),this.#e.destroy({children:!0}),this.#t?.destroy(),this.#o?.destroy(),this.#r()}}const Rf=(n,e,t,o,r)=>n===void 0||n.renderContext.general.colourised!==e||n.renderContext.onScreenControls!==t||n.renderContext.inputDirectionMode!==o||n.renderContext.general.upscale.rotate90!==r.rotate90,_f=(n,e,t,o,r,s)=>n===void 0||e||n.renderContext.general.upscale!==t||n.renderContext.general.displaySettings!==o||n.renderContext.general.soundSettings!==r||n.renderContext.general.paused!==s,Dr=.1,tn=(n,e)=>{const t=M.currentTime+Dr;e.gain.linearRampToValueAtTime(0,t),n.stop(t),n.onended=()=>{n.disconnect(),e.disconnect()}},Qe=(n,{gain:e,randomiseStartPoint:t},o)=>{const r=M.createGain(),s=e??r.gain.defaultValue;return t?(r.gain.setValueAtTime(0,M.currentTime),r.gain.linearRampToValueAtTime(s,M.currentTime+Dr)):e!==void 0&&(r.gain.value=e),n.connect(r),r.connect(o),r},Z=n=>{const e=typeof n=="string"?{soundId:n}:n,{playbackRate:t=1,soundId:o,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=M.createBufferSource(),c=Bo()[o];return l.buffer=c,l.loop=s,l.playbackRate.value=i?t-.05+Math.random()*.1:t,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},ie=({start:n,change:e,loop:t,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c,u;return d=>{if(!!d!=!!u)d?n!==void 0&&!(a&&s)?(l&&c&&(l.onended=null,tn(l,c)),l=Z({...n}),c=Qe(l,n,i),t!==void 0&&(r?(l=Z({...t,loop:!0}),c=Qe(l,t,i)):l.onended=()=>{u&&(l&&c&&(l.onended=null,tn(l,c)),l=Z({...t,loop:!0}),c=Qe(l,t,i))})):t!==void 0&&(l=Z({...t,loop:!0}),c=Qe(l,t,i)):(l&&l.loop&&c&&(l.onended=null,tn(l,c)),o!==void 0&&(l=Z({...o}),c=Qe(l,o,i)));else if(u!==d&&e!==void 0){const p=Z({...e});c=Qe(p,e,i)}a=!1,u=d}},Mf={soundId:"fall"},Bf={soundId:"woodScrape",gain:.8,randomiseStartPoint:!0,playbackRate:.8},Af={soundId:"softBump"},Of=(n,e)=>{let t=!1;for(const o in n){if(o!==e)return!0;t=!0}return!t};class oe{constructor(e,t){this.renderContext=e;const o=M.createGain();o.connect(this.output),this.#e=ie({loop:t?.fall??Mf},o);const r=M.createGain();r.connect(this.output),this.#t=t?.standingOn===null?void 0:ie({start:t?.standingOn??Af,noStartOnFirstFrame:!0},r);const s=M.createGain();s.connect(this.output),this.#o=t?.collision&&ie({start:t.collision,noStartOnFirstFrame:!0},s);const i=M.createGain();i.connect(this.output),this.#n=t?.pushed===null?void 0:ie({loop:t?.pushed??Bf},i)}output=M.createGain();#e;#t;#o;#n;currentPositionZ=0;tick({lastRenderRoomTime:e,movedItems:t},o=!1){const{renderContext:{item:r,room:{roomTime:s}}}=this,{state:{standingOnItemId:i,position:{z:a},vels:{gravity:{z:l}},actedOnAt:{roomTime:c,actedInXY:u,by:d},collidedWith:{roomTime:h,by:p}}}=r;if(this.#e!==void 0){const{currentPositionZ:f}=this,m=a<f&&l<0&&i===null;this.#e(m),this.currentPositionZ=a}if(this.#t!==void 0){const f=i!==null&&h>(e??He)&&p[i];this.#t(f)}if(this.#o!==void 0){const f=h>(e??He)&&!Ai(pr(p));this.#o(f)}if(this.#n!==void 0){const f=!o&&s===c&&u&&i!==null&&Of(d,i)&&t.has(r);this.#n(f)}}destroy(){this.#e?.(!1),this.#n?.(!1)}}const zs={soundId:"rollingBallLoop",playbackRate:.5,gain:4};class Ff{constructor(e){this.renderContext=e,this.#t=new oe(e,{pushed:zs,collision:{soundId:"ballHit",gain:.7,varyPlaybackRate:!0},standingOn:{soundId:"ballHit"}}),this.#t.output.connect(this.output)}output=M.createGain();#e=ie({loop:zs},this.output);#t;tick(e){const{renderContext:{item:{state:{vels:{sliding:t},standingOnItemId:o}}}}=this,r=(t.x!==0||t.y!==0)&&o!==null;this.#e(r),this.#t.tick(e,r)}destroy(){this.#e(!1),this.#t.destroy()}}class Df{constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&Z({soundId:"bonus",connectTo:this.output});break}case"disappearing":{Z({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,Z({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=M.createGain();tick(){}destroy(){}}class zf{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=M.createGain();#e=M.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{pressed:e}}}}=this;this.#t!==void 0&&this.#t!==e&&Z({soundId:"switchClick",playbackRate:e?.95:1.05,connectTo:this.#e}),this.#t=e}destroy(){}}class Lf{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#o=new oe(e,{collision:{soundId:"metalHit",gain:.3},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#o.output.connect(this.output)}output=M.createGain();#e=M.createGain();#t=ie({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o;tick(e){const{renderContext:{item:t,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=o===s&&pt(pr(i)).some(l=>Pi(r[l]));this.#t(a),this.#o.tick(e,a)}destroy(){this.#t(!1),this.#o.destroy()}}const vo=2;class Ef{constructor(e){this.renderContext=e}output=M.createGain();#e=ie({start:{soundId:"conveyorStart",playbackRate:vo},loop:{soundId:"conveyorLoop",playbackRate:vo},stop:{soundId:"conveyorEnd",playbackRate:vo}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=yn(e);this.#e(t)}destroy(){this.#e(!1)}}class Uf{constructor(e){this.renderContext=e,this.#e=new oe(e,{standingOn:{soundId:"drum"}}),this.#e.output.connect(this.output)}output=M.createGain();#e;#t=!1;tick(e){const{renderContext:{item:{state:{stoodOnBy:t}}}}=this,o=yn(t);!this.#t&&o&&Z({soundId:"drum",connectTo:this.output}),this.#t=o,this.#e.tick(e)}destroy(){this.#e.destroy()}}class Gf{constructor(e){this.renderContext=e,Z({soundId:"hooter",connectTo:this.output})}output=M.createGain();tick(){}destroy(){}}const Wf=3;class Vf{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=M.createGain();#e=Z({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Wf*e)}destroy(){tn(this.#e,this.output)}}const Hf={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},Ls={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Es={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"},homingBot:{soundId:"lowHum",randomiseStartPoint:!0}},Us={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class $f{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e,o=Hf[t];this.#r=new oe(e,o?{collision:o}:void 0),this.#r.output.connect(this.output),Ls[t]!==void 0&&(this.#o=ie({change:Ls[t]},this.#e)),Us[t]!==void 0&&(this.#s=ie(Us[t],this.#e)),Es[t]!==void 0&&(this.#n=ie({loop:Es[t]},this.#t))}output=M.createGain();#e=M.createGain();#t=M.createGain();#o;#n;#r;#s;tick(e){const{renderContext:{item:t}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#o){const l=Zn(o);this.#o(l)}if(this.#n){const l=r&&!s;this.#n(l)}const a=!Et(i,H);this.#s&&this.#s(a),this.#r.tick(e,a)}destroy(){this.#n?.(!1),this.#s?.(!1),this.#r.destroy()}}class Nf{constructor(e){this.renderContext=e,this.#e=new oe(e,{pushed:null}),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const jf=.8,Xf=1.2,Yf=.8;class wo{constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:o}}=e;(t.noFootsteps??Gt.soundSettings.noFootsteps)||(this.#e=M.createGain(),this.#e.gain.value=jf,this.#e.connect(this.output),this.#t=ie({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#o.gain.value=Yf,this.#o.connect(this.output),this.#r.gain.value=Xf,this.#r.connect(this.output),this.#n=ie({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#o),this.#i=new oe(e,{fall:o==="headOverHeels"||o==="head"?{soundId:"headFall"}:void 0,standingOn:{soundId:"softBump"},collision:{soundId:"softBump",gain:.5}}),this.#i.output.connect(this.output)}output=M.createGain();#e;#t;#o=M.createGain();#n;#r=M.createGain();#s=ie({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#r);#i;#l=null;tick(e){const{renderContext:{item:t}}=this,{state:{action:o,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}}}}=t,u=Bt(t),d=r?r.phase:null,h=i&&l>s&&l>this.#i.currentPositionZ&&c>0;this.#n(h);const p=l<this.#i.currentPositionZ&&c<0&&a===null,f=!h&&!p&&o==="moving";if(this.#t!==void 0&&this.#t(f),u!==void 0&&this.#s(u.carrying!==null),d!==null&&d!==this.#l)if(d==="in"){const m=Bo().teleportIn,g=M.createBufferSource();g.buffer=m,g.connect(this.output),g.start()}else{const m=Bo().teleportOut,g=M.createBufferSource();g.buffer=m,g.connect(this.output),g.start()}this.#l=d,this.#i.tick(e,f||o==="falling")}destroy(){this.#t?.(!1),this.#n(!1),this.#s(!1),this.#i.destroy()}}class Jf{constructor(e){this.renderContext=e,this.#e=new oe(e,{standingOn:{soundId:"metalHit"},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const qf={collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8},pushed:{soundId:"iceScrape",varyPlaybackRate:!0,randomiseStartPoint:!0}};class Zf{constructor(e){this.renderContext=e,this.#e=new oe(e,e.item.config.style==="puck"?qf:void 0),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class Kf{constructor(e){this.renderContext=e,this.#e=new oe(e,{collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8,playbackRate:1.5},pushed:{soundId:"glassClink",varyPlaybackRate:!0,playbackRate:1.5}}),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class Qf{constructor(e){this.renderContext=e;const{item:{state:t}}=e;t.played===!1&&(this.#e=Z(e.item.config.soundOptions),Qe(this.#e,e.item.config.soundOptions,this.output),t.played=!0)}output=M.createGain();#e;tick(e){}destroy(){this.#e!==void 0&&tn(this.#e,this.output)}}class em{constructor(e){this.renderContext=e,this.#e=new oe(e),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:o}}}}=this,r=yn(t);e.lastRenderRoomTime!==void 0&&o>e.lastRenderRoomTime&&!r&&Z({soundId:"springBoing",connectTo:this.output}),this.#e.tick(e)}destroy(){this.#e.destroy()}}class tm{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=M.createGain();#e=M.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,o=t.type==="in-store"?_i(k.getState().gameMenus,t.path)?"right":"left":e;this.#t!==void 0&&this.#t!==o&&Z({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#t=o}destroy(){}}class nm{constructor(e){this.renderContext=e}output=M.createGain();#e=ie({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:t}}=this;this.#e(Ht(e)&&je(e.state.stoodOnBy,t).some(be))}destroy(){this.#e(!1)}}const om=(n,e)=>fi(je(n.state.stoodOnBy,e).filter(Mi));class rm{constructor(e){this.renderContext=e,this.output.gain.value=2}output=M.createGain();#e=void 0;tick(e){const{renderContext:{item:t,room:o}}=this,r=om(t,o);this.#e!==void 0&&r<this.#e&&Z({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=r}destroy(){}}const sm={lift:Vf,switch:tm,button:zf,bubbles:Df,head:wo,heels:wo,headOverHeels:wo,teleporter:nm,monster:$f,conveyor:Ef,spring:em,portableBlock:oe,charles:Lf,ball:Ff,pushableBlock:Jf,firedDoughnut:Gf,slidingBlock:Zf,pickup:oe,movingPlatform:Nf,moveableDeadly:oe,slidingDeadly:Kf,soundEffect:Qf,sceneryPlayer:oe,sceneryCrown:oe},im=n=>{if(n.item.type==="deadlyBlock"&&n.item.config.style==="toaster")return new rm(n);if(n.item.type==="portableBlock"&&n.item.config.style==="drum")return new Uf(n);const e=sm[n.item.type];if(e)return new e(n)},Gs=A.z*-1,Ws=A.z*kc,am=0,lm=A.x*16,cm={x:0,y:0,z:0},So=(n,e,t)=>(n-e)/(t-e)*2-1,um=.3,dm=.3;class hm{constructor(e,t){this.renderContext=e,this.childRenderer=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const o=xr(e.room).floors;this.#e=o.edgeLeftX,this.#t=o.edgeRightX}output=M.createPanner();#e;#t;tick(e){this.childRenderer.tick(e);const{item:t}=this.renderContext,o=t.state,r=nr(Oi(cm,t.aabb,.5),o.position),s=So(Dn(r),this.#e,this.#t),i=So(r.z,Gs,Ws);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${Gs},
          ${Ws},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(o.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=So(r.x+r.y,am,lm);this.output.positionX.value=s*um,this.output.positionY.value=i,this.output.positionZ.value=a*dm}destroy(){this.childRenderer.destroy()}}class pm{constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(o=>o.output))}#e;#t=new C({label:"CompositeRenderer"});tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}var fm=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uTargetColor;const float blackThreshold=sqrt(3.0)*0.15;void main(void){vec4 c=texture(uTexture,vTextureCoord);float isBlack=step(length(c.rgb),blackThreshold);finalColor=mix(vec4(uTargetColor,1),c,max(isBlack,1.0-c.a));}`;const mm=Q.from({vertex:Ne,fragment:fm,name:"revert-colourise-filter"});class gm extends K{uniforms;constructor(e="white"){super({glProgram:mm,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[t,o,r]=new ae(e).toArray();this.uniforms.uTargetColor[0]=t,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const Za=Mt,xm=w.pastelBlue,Vs=xn.highlightBeige,ym=w.lightBeige,bm=xn.lightBeige,Hs=xn.midRed,vm=xn.white,$s=new gm(xm),Co=w.white,Ns=w.midRed,wm=w.pastelBlue,js={left:"↖",away:"↗",right:"↘",towards:"↙"},Xs=n=>n.type==="switch"&&n.config.type==="in-room"||n.type==="button",Ys=(n,e)=>{switch(n){case"back-forth":switch(e){case"left":return"↖↘";case"right":return"↘↖";case"away":return"↗↙";case"towards":return"↙↗";default:throw new Error("Unexpected startDirection")}case"forwards":switch(e){case"left":return"↖";case"right":return"↘";case"away":return"↗";case"towards":return"↙";default:throw new Error("Unexpected startDirection")}case"clockwise":switch(e){case"left":return"↖↗↘↙";case"right":return"↘↙↖↘";case"away":return"↗↘↙↖";case"towards":return"↙↖↗↘";default:throw new Error("Unexpected startDirection")}case"towards-analogue":return"➡.⬅"}return""},Sm=n=>n.type==="monster"&&n.config.activated==="after-player-near";class Cm{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output),this.#e()}output=new C({label:"EditorAnnotationsRenderer"});#e(){const e=this.renderContext.item;switch(e.type){case"pickup":if(e.config.gives==="shield"||e.config.gives==="extra-life"||e.config.gives==="jumps"||e.config.gives==="fast"){const t={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"};this.#t({annotationText:t[e.config.gives],yAdj:-16})}break;case"doorFrame":if(e.config.part==="near"){const{rooms:t}=k.getState().levelEditor.campaignInProgress,{config:{toRoom:o,direction:r}}=e;if(o!==ki){const s=!!t[o],i=js[r],a=r==="away"||r==="right"?`${o}${i}`:`${i}${o}`;this.#t({annotationText:a,yAdj:r==="left"||r==="away"?-48:0,tint:s?Co:Ns,clickDispatch:s?()=>Yr(o):void 0})}}break;case"teleporter":{const{rooms:t}=k.getState().levelEditor.campaignInProgress,{config:{toRoom:o}}=e,r=!!t[o];this.#t({annotationText:`➡${o}`,yAdj:-12,tint:r?Co:Ns,clickDispatch:r?()=>Yr(o):void 0})}break;case"conveyor":{const{config:{direction:t}}=e,o=js[t];this.#t({annotationText:o,yAdj:-12})}break;case"movingPlatform":{const{config:{movement:t,startDirection:o}}=e;this.#t({annotationText:Ys(t,o),yAdj:-12})}break;case"monster":{const{config:t}=e;switch(!0){case(t.which==="cyberman"&&t.activated==="after-player-near"):this.#t({annotationText:"wake",tint:ym,yAdj:-12});break;case(t.which==="turtle"||t.which==="skiHead"):this.#t({annotationText:Ys(t.movement,t.startDirection),yAdj:-12});break}}break}}#t({annotationText:e,yAdj:t=0,tint:o=Co,clickDispatch:r}){const{renderContext:{frontLayer:s,general:{pixiRenderer:i}}}=this,a=new X({pixiRenderer:i,label:"EditorAnnotationTextContainer",outline:!0,tint:o,text:e,y:t});r!==void 0&&(a.eventMode="static",a.on("click",()=>{k.dispatch(r())}),a.on("mouseover",()=>{k.getState().levelEditor.tool.type==="pointer"&&(k.dispatch(Jr(!0)),a.tint=wm)}),a.on("mouseout",()=>{k.dispatch(Jr(!1)),a.tint=o}),a.cursor="pointer"),this.output.addChild(a),s.attach(a)}tick(e){this.#o(),this.childRenderer.tick(e)}#o(){const{renderContext:{room:e}}=this,t=this.renderContext.item,{clickableAnnotationHovered:o}=k.getState().levelEditor,{jsonItemId:r}=t,s=k.getState(),i=wu(s),a=Su(s),l=Cu(s),c=r&&i?.jsonItemId===r&&!o,u=r&&a.includes(r),d=()=>r!==void 0&&(he(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&Xs(h)&&h.config.modifies.some(p=>p.expectType===t.type&&(p.targets===void 0||p.targets.includes(r))))||Xs(t)&&he(e.items).some(({jsonItemId:h,type:p})=>h!==void 0&&h===i?.jsonItemId&&t.config.modifies.some(f=>f.expectType===p&&(f.targets===void 0||f.targets.includes(h))))||t.type==="charles"&&he(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&h.type==="joystick"&&h.config.controls.some(p=>p===r))||t.type==="joystick"&&t.config.controls.some(h=>i?.jsonItemId===h));this.output.filters=c&&u?[$s,l.type==="eyeDropper"?Hs:Vs]:c?l.type==="eyeDropper"?Hs:Vs:u?$s:d()?vm:Sm(t)?bm:Za}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Tm=(n,e,t)=>e.general.editor?new Cm(e,t):t;class Ka extends Aa{}const Js=(n,e)=>{e.poly([F({}),F({x:n.x}),F({x:n.x,y:n.y}),F({y:n.y})]).poly([F({}),F({z:n.z}),F({y:n.y,z:n.z}),F({y:n.y})]).poly([F({x:n.x}),F({x:n.x,z:n.z}),F(n),F({x:n.x,y:n.y})]).poly([F({z:n.z}),F({x:n.x,z:n.z}),F({x:n.x,y:n.y,z:n.z}),F({y:n.y,z:n.z})])},qs=(n,e)=>{const t=new xe;return Js(n,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),Js(n,t),t.stroke({width:.5,color:e,alpha:1})}),t},km={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Im{constructor(e){this.renderContext=e;const{item:t}=e,o=km[t.type]??"rgba(255,255,255)";if(this.#e=new C({label:`ItemBoundingBoxRenderer ${t.id}`}),pn("portal")(t)){const s=F(t.config.relativePoint);this.#e.addChild(new xe().circle(s.x,s.y,5).stroke(o)),this.#e.addChild(new xe().circle(s.x,s.y,2).fill(o))}if(this.#e.addChild(new xe({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(qs(t.aabb,o)),t.renderAabb){const s="rgba(184, 184, 255)",i=qs(t.renderAabb,s);if(t.renderAabbOffset){const a=F(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(r=new bd({text:s,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)}),e.frontLayer.attach(this.#e)}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const Pm=75;class Rm{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const o=e.room.color.shade==="dimmed"?Kn:w;this.#e=new No(o.moss),this.#t=new No(o.midRed),this.#o=new $e({color:o.pureBlack}),this.#e.enabled=!1,this.#t.enabled=!1,this.#o.enabled=!1,this.output.filters=[this.#e,this.#t,this.#o]}output=new C({label:"ItemFlashOnSwitchedRenderer"});#e;#t;#o;tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:o}},room:{roomTime:r}}}=this,s=r-t<Pm,i=o==="left";this.#e.enabled=s&&i,this.#t.enabled=s&&!i,this.#o.enabled=s,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const _m=(n,e)=>{const{item:t,room:{items:o}}=n;return he(o).filter(Ic).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new Rm(n,e):e},Qa=(n,e,t,o)=>{const r=1/o;n.x=Ts(e,r),n.y=Ts(t,r)},el=new Fu;el.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class Mm{constructor(e,t){this.renderContext=e,this.wrappedRenderer=t,this.output=new C({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#t()}output;#e=new Map;#t(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=F(this.renderContext.item.state.position);Qa(this.output,t.x,t.y,e)}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#t(),this.#s()}#o(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return Ot;let o;for(const[r,s]of t)s&&(o||(o=new Set),o.add(r));return o??Ot}#n(e,t){const o=new C({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(o),o.setMask({mask:t,inverse:!0}),this.#e.set(e,o),o}#r(e,t){const[o,r]=t.children,s=t.parent;s.removeChild(t),s.addChild(r),t.mask=null,o.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#o();for(const o of this.#e.keys())if(!t.has(o)){const r=this.#e.get(o);if(r)try{this.#r(o,r)}catch(s){throw new Error(`error while destroying masking container ${Oo(r)} 
              for our rendering: ${Oo(this.output)}`,{cause:s})}}for(const o of t){const r=this.#e.get(o),s=r?.children[0],i=this.renderContext.getItemRenderPipeline(o)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=el;const l=ke(e,i,s,`red mask: ${o}`);i.filters=a,r===void 0&&this.#n(o,l);const c=this.renderContext.room.items[o],u=ye(F(c.state.position),F(this.renderContext.item.state.position));l.x=u.x,l.y=u.y}}destroy(){this.output.destroy({children:!0}),this.wrappedRenderer?.destroy()}}const To=(n,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:o})=>{const r=o?.renderProps,s=Lt(t)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=S({textureId:s==="left"||s==="away"?`shadowMask.${n}.away`:`shadowMask.${n}.right`,spritesheetVariant:"original"});return a.y=-(A.z*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},Bm={left:"away",towardsLeft:"awayRight",towards:"right"},Am=(n,e,t)=>{if(!e)return`shadowMask.${n}.${t}`;const o=`shadowMask.${n}.falling.${t}`;return Ri(o)?o:`shadowMask.${n}.${t}`},ko=(n,e=1)=>({renderContext:{item:t},currentRendering:o})=>{const r=t.type==="sceneryPlayer"?"idle":t.state.action,s=o?.renderProps,i=t.type==="sceneryPlayer"?t.config.startDirection:Zn(t.state.visualFacingVector??t.state.facing)??"towards",a=r==="falling";if(!(s===void 0||i!==s.facingXy8||a!==s.falling))return"no-update";const c=Bm[i],d=Am(n,a,c??i),h=S({textureId:d,spritesheetVariant:"original"});return h.y=-(A.z*(e-1)),h.scale.x=c===void 0?1:-1,{output:h,renderProps:{facingXy8:i,falling:a}}},Om=({renderContext:{general:{pixiRenderer:n},item:e,room:t},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:s}}=e,i=o?.renderProps,a=Ht(e),l=a&&je(r,t).find(be)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:Vt(n,ro({textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.artificial",spritesheetVariant:"original"},s)),renderProps:{flashing:l,activated:a}}:"no-update"},Io={lift:me({textureId:"shadowMask.smallBlock",spritesheetVariant:"original"}),conveyor:ze(({direction:n})=>({textureId:"shadowMask.conveyor",flipX:At(n)==="x",spritesheetVariant:"original"})),doorLegs:ze(({direction:n})=>({textureId:n==="right"||n==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:At(n)==="y",spritesheetVariant:"original"})),teleporter:Om,floor:"no-mask",barrier:ze(({axis:n})=>({textureId:"shadowMask.barrier.y",flipX:n==="x",y:-1,spritesheetVariant:"original"})),spring:Ep,block:ze(({style:n})=>({textureId:`shadowMask.${n}`,spritesheetVariant:"original"})),pushableBlock:me({textureId:"shadowMask.stepStool",spritesheetVariant:"original"}),movingPlatform:me({textureId:"shadowMask.sandwich",spritesheetVariant:"original"}),hushPuppy:me({textureId:"shadowMask.hushPuppy",spritesheetVariant:"original"}),portableBlock:ze(({style:n})=>({textureId:n==="drum"?"shadowMask.drum":"shadowMask.smallBlock",spritesheetVariant:"original"})),slidingBlock:ze(({style:n})=>n==="book"?{textureId:"shadowMask.book",flipX:!0,spritesheetVariant:"original"}:{textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),deadlyBlock:ze(({style:n})=>({textureId:n==="volcano"?"shadowMask.volcano":"shadowMask.toaster",spritesheetVariant:"original"})),spikes:me({textureId:"shadowMask.spikes",spritesheetVariant:"original"}),switch:me({textureId:"shadowMask.switch",spritesheetVariant:"original"}),button:me({textureId:"shadowMask.buttonInGame",spritesheetVariant:"original"}),pickup:ze(({gives:n})=>{switch(n){case"scroll":return{textureId:"shadowMask.scroll",spritesheetVariant:"original"};case"doughnuts":return{textureId:"shadowMask.doughnuts",spritesheetVariant:"original"};case"fast":case"extra-life":case"jumps":case"shield":return{textureId:"shadowMask.whiteRabbit",spritesheetVariant:"original"};default:return{textureId:"blank",spritesheetVariant:"original"}}}),slidingDeadly:me({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),ball:me({textureId:"shadowMask.ball",spritesheetVariant:"original"}),"monster.dalek":me({textureId:"shadowMask.dalek",spritesheetVariant:"original"}),"monster.turtle":To("turtle"),"monster.skiHead":To("skiHead"),"monster.homingBot":me({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),joystick:me({textureId:"shadowMask.joystick",spritesheetVariant:"original"}),charles:To("charles",2),head:ko("head"),heels:ko("heels"),headOverHeels:ko("head",2)},Fm=n=>{switch(n.type){case"sceneryPlayer":return Io[n.config.which];case"monster":return Io[`monster.${n.config.which}`];case"floor":return n.config.floorType==="none"?void 0:"no-mask";default:return Io[n.type]}},Dm=.66,zm=n=>n.shadowCastTexture!==void 0,vt={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:Pc}};class Lm{constructor(e,t){this.renderContext=e,this.appearance=t,this.#e.addChild(this.#t),this.#r||(this.#e.filters=new Au({alpha:Dm}))}#e=new C({label:"ItemShadowRenderer"});#t=new C({label:"shadows"});#o;#n=new Map;initShadowMaskRenderer(){const{renderContext:e,appearance:t}=this;if(t!=="no-mask")if(this.#o=new Ka(e,t),e.item.shadowOffset===void 0)this.#e.addChild(this.#o.output);else{const o=new C({label:"shadowMaskOffset",children:[this.#o.output],...F(e.item.shadowOffset)});this.#e.addChild(o)}}get#r(){return k.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#s(e){if(this.#o===void 0)return;const t=this.#o.output.children.at(0);this.#o.tick(e);const o=this.#o.output.children.at(0);if(o===void 0||!(o instanceof re)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}t!==o&&(this.#r?this.renderContext.frontLayer.attach(o):this.#e.mask=o)}destroy(){this.#e.destroy(!0),this.#o?.destroy();for(const e of Object.values(this.#n))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:o,general:{pixiRenderer:r},room:s}=this.renderContext,i=t.has(o),a=o.state.position.z+o.aabb.z;vt.state.position.x=o.state.position.x,vt.state.position.y=o.state.position.y,vt.state.position.z=a,vt.aabb.x=o.aabb.x,vt.aabb.y=o.aabb.y;const l=new Set(dr(vt,s[Jn],u=>u!==o&&zm(u)&&(u.castsShadowWhileStoodOn||u.state.position.z>o.state.position.z+o.aabb.z)&&!u.noShadowCastOn?.includes(o.type)));let c=!1;for(const[u,d]of this.#n)l.has(u)||(this.#t.removeChild(d),d.destroy(),this.#n.delete(u));for(const u of l){c=!0;let d=this.#n.get(u),h=!1;if(!d){const{times:p}=u.config,{shadowCastTexture:f}=u,m=ro(typeof f=="string"?{textureId:f}:f,p);d=Vt(r,m),d.label=u.id,this.#t.addChild(d),this.#n.set(u,d),h=!0}if(h||i||t.has(u)){const p=F({...Rt(ye(u.state.position,o.state.position),u.shadowOffset??le),z:o.aabb.z});d.x=p.x,d.y=p.y}}this.#e.visible=c,c?(this.#o===void 0&&this.initShadowMaskRenderer(),this.#s(e)):this.#o!==void 0&&(this.#o.destroy(),this.#o=void 0)}get output(){return this.#e}}const Em=n=>{const e=Fm(n.item);return e===void 0?void 0:new Lm(n,e)};class Um{constructor(e,t){this.renderContext=e,this.componentRenderers=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}class Gm{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const{general:{colourised:o},room:r}=e;this.#e=new $e({color:o?(r.color.shade==="dimmed"?Kn:w).moss:de(r.color)}),this.#e.enabled=!1,this.output.filters=this.#e}output=new C({label:"PortableItemPickUpNextHighlightRenderer"});#e;tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;this.#e.enabled=t,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Wm=(n,e,t)=>hr(n)?new Gm(e,t):t,Vm=(n,e)=>{const{gameMenus:{cheatsOn:t}}=k.getState();e!==void 0&&t&&(e.eventMode="static",e.on("pointertap",()=>{k.dispatch(Mc({item:n,pixiContainer:e}))}))},Hm=n=>{const e=k.getState(),t=Rc(e),o=!_c(e),{general:{paused:r}}=n,{item:s}=n,i=t==="all"||t==="non-wall"&&n.item.type!=="wall",a=[],l=Ja(s);let c;if(l!==void 0){c=new Ka(n,l);const f=_m(n,c);a.push(Tm(s,n,Wm(s,n,f)))}if(o&&!r){const f=Em(n);f!==void 0&&a.push(f)}i&&a.push(new Im(n));let u;if(a.length===0)u=void 0;else{const f=a.length===1?a[0]:new pm(a,n);u=new Mm(n,f),Vm(s,u.output)}const d=n.general.soundSettings.mute??Gt.soundSettings.mute,h=r||d?void 0:im(n),p=h===void 0?void 0:s.noSoundPan?h:new hm(n,h);return{top:new Um(n,{graphics:u,sound:p}),itemAppearanceRenderer:c}},$m=n=>{for(const[,l]of n)for(const[c]of l)l.set(c,!1);const e=Array.from(Nm(n));let t=e.length,o=t;const r=new Array(t),s={},i=jm(e);for(;o--;)s[o]||a(e[o],o,new Set,null);return r;function a(l,c,u,d){if(u.has(l)){if(d!==null){const f=n.get(d);f?.has(l)&&f.set(l,!0)}return}if(s[c])return;s[c]=!0;const h=n.get(l),p=Array.from(h?.entries()??Ot);if(c=p.length){u.add(l);do{const[f,m]=p[--c];m||a(f,i.get(f),u,l)}while(c);u.delete(l)}r[--t]=l}};function Nm(n){const e=new Set;for(const[t,o]of n.entries()){e.add(t);for(const r of o.keys())e.add(r)}return e}function jm(n){const e=new Map;for(let t=0,o=n.length;t<o;t++)e.set(n[t],t);return e}const Xm=(n,e,t,o)=>(n.has(e)||n.set(e,new Map),n.get(e).set(t,o),n),Jt=(n,e,t)=>{const o=n.get(e);return o!==void 0&&(o.delete(t),o.size===0&&n.delete(e)),n},Po=1e-5,Zs=-1,qt=(n,e,t,o,r)=>o-r>n&&t<e-r,Ym=0,tl=1,nl=2,ol=3,Jm=(n,e)=>{const t=qt(n.zAxisProjectionMin,n.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,Po),o=qt(n.xAxisProjectionMin,n.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Po),r=qt(n.yAxisProjectionMin,n.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Po);return o&&r&&t?tl:r&&t&&qt(n.xAxisProjectionMin,n.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Zs)?nl:o&&t&&qt(n.yAxisProjectionMin,n.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Zs)?ol:Ym},qm=(n,e,t,o)=>{for(const r of Fi){const s=n[r],i=s+e[r],a=t[r],l=a+o[r];if(i<=a)return 1*(r==="z"?-1:1);if(s>=l)return-1*(r==="z"?-1:1)}return Ks(t)-Ks(n)},Zm=(n,e,t)=>{if(n.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const o=n.renderAabbOffset?pe(n.state.position,n.renderAabbOffset):n.state.position,r=n.renderAabb||n.aabb,s=e.renderAabbOffset?pe(e.state.position,e.renderAabbOffset):e.state.position,i=e.renderAabb||e.aabb;switch(Jm(t.getItemAxesProjections(n),t.getItemAxesProjections(e))){case tl:return qm(o,r,s,i);case nl:return Pe(o.y,s.y+i.y)&&Pe(o.z,s.z+i.z)?1:Pe(s.y,o.y+r.y)&&Pe(s.z,o.z+r.z)?-1:0;case ol:return Pe(o.x,s.x+i.x)&&Pe(o.z,s.z+i.z)?1:Pe(s.x,o.x+r.x)&&Pe(s.z,o.z+r.z)?-1:0;default:return 0}},Ks=n=>n.x+n.y-n.z,Km=(n,e=new Bc(Ge(n)),t=Ge(n),o=new Map)=>{const r=new Map;for(const[s,i]of o)if(!n[s])o.delete(s);else for(const[a]of i)n[a]||Jt(o,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=o.get(s.id);a?.forEach((l,c)=>{i.has(n[c])||a.delete(c)}),o.forEach((l,c)=>{i.has(n[c])||Jt(o,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||r.get(a)?.has(s))continue;const l=Zm(s,a,e);if(r.has(s)||r.set(s,new Set),r.get(s).add(a),l===0){Jt(o,s.id,a.id),Jt(o,a.id,s.id);continue}const c=l>0?s.id:a.id,u=l>0?a.id:s.id;Xm(o,u,c,!1),Jt(o,c,u)}}return o};class Qm{constructor(e){this.renderContext=e;const{general:{colourised:t,soundSettings:o},room:r}=e,i=o.mute??Gt.soundSettings.mute?void 0:M.createGain();this.output={sound:i,graphics:new C({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t||(this.#o=new is({sortableChildren:!1}),this.output.graphics.addChild(this.#o)),this.output.graphics.addChild(this.#n),t||(this.#t.tint=de(r.color))}#e=!1;#t=new C({label:"items",cullableChildren:!0});#o;#n=new is({sortableChildren:!1});output;#r=void 0;#s=new Map;#i=new Map;#l=e=>this.#i.get(e);#a(e,t){let o=this.#i.get(t.id);if(o===void 0){o=Hm({...this.renderContext,colourClashLayer:this.#o,frontLayer:this.#n,item:t,zEdges:this.#s,getItemRenderPipeline:this.#l}),this.#i.set(t.id,o);const{graphics:r,sound:s}=o.top.output;if(r&&(this.#t.addChild(r),t.fixedZIndex&&(r.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{o.top.tick(e)}catch(r){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:r})}}#c(e){const{room:t}=this.renderContext,o={...e,lastRenderRoomTime:this.#r},r=new Set,s=a=>{if(r.has(a))return;const l=this.#s.get(a);if(l)for(const[c,u]of l.entries())u&&s(c);this.#a(o,t.items[a]),r.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#i.entries())t.items[a]===void 0&&(l.top.destroy(),this.#i.delete(a),i=!0);i&&this.#u()}#u(){if(this.#o)for(const e of this.#o.renderLayerChildren)e.parent===null&&this.#o.detach(e);for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e)}#d(e){for(let t=0;t<e.length;t++){const o=this.#i.get(e[t]);if(o===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const r=o.top.output.graphics;if(!r)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);r.zIndex=t}}get#h(){return this.#r!==void 0}tick(e){const t=this.#h?e:{...e,movedItems:new Set(he(this.renderContext.room.items))},{renderContext:{room:o}}=this;Km(o.items,o[Jn],t.movedItems,this.#s);const r=$m(this.#s);this.#c(t),(!this.#h||t.movedItems.size>0)&&this.#d(r),this.#r=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0});const{sound:e}=this.output;if(e){const t=Dr*1e3;setTimeout(()=>{e.disconnect()},t)}this.#i.forEach(t=>{t.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const wt=.4,eg=300,tg=36,ng=.2,og=1250,Qs=(n,e)=>Si(n,Math.min(1,e/eg));class rg{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:s}}=e,{floors:{edgeLeftX:i,edgeRightX:a,bottomEdgeY:l},allItems:{topEdgeY:c}}=xr(o);this.#l=i,this.#a=a;const u=(a+i)/2,d=a-i,h=l-c,p=r.y>=h,f=p&&r.x>=d,m=p?16:Ac()==="mobile"?-4:0;this.#c={x:r.x/2-u,y:r.y-m-l-(f?Math.abs(u/2):0)},this.#r=this.#c.x+this.#l<0,this.#s=this.#c.x+this.#a>r.x,this.#i=this.#c.y+c<0;const g=this.childRenderer.output.graphics;if(g===void 0)throw new Error("can't scroll a renderer without graphics");const x={sound:this.childRenderer.output.sound,graphics:new C({children:[g],label:`RoomScrollRenderer(${o.id})`})};(s?.showBoundingBoxes??Gt.displaySettings.showBoundingBoxes)!=="none"&&x.graphics.addChild(sg(e.room)),this.output=x}#e={x:0,y:0};#t={x:0,y:0};#o=He;#n=!1;#r;#s;#i;#l;#a;#c;output;#u(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=this.#e,o=this.output.graphics,r=Rt(t,this.#t);Qa(o,r.x,r.y,e)}#d(e){const{general:{gameState:t},room:{roomTime:o}}=this.renderContext,{deltaMS:r}=e,{inputStateTracker:{lookVector:s,hudInputState:{lookVector:i}}}=t;On(s)+On(i)<Te?this.#o<o-og&&(this.#t=ye(this.#t,Qs(this.#t,r))):(this.#o=o,this.#t=fn(pe(this.#t,N(s,r*ng)),i),i.x=0,i.y=0)}tick(e){const{general:{upscale:{gameEngineScreenSize:t},gameState:o}}=this.renderContext,{deltaMS:r}=e;this.#d(e);const s=Ut(o);if(s===void 0)return;const i=F(s.state.position),a=pe(i,this.#c),l={x:this.#r&&a.x<t.x*wt?Math.min(-this.#l,t.x*wt-i.x):this.#s&&a.x>t.x*(1-wt)?Math.max(t.x-this.#a,t.x*(1-wt)-i.x):this.#c.x,y:this.#i&&a.y<t.y*wt?t.y*wt-i.y:this.#c.y};if(!this.#n)this.#e=l;else{const u=ye(this.#e,l);if(On(u)>tg){const d=Qs(u,r);this.#e={x:this.#e.x-d.x,y:this.#e.y-d.y}}}this.#u(),this.#n=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const sg=n=>{const{floors:{edgeLeftX:e,edgeRightX:t,bottomEdgeY:o,topEdgeY:r},allItems:{topEdgeY:s}}=xr(n);return new xe().rect(e,s,t-e,o-s).stroke("red").rect(e,r,t-e,o-r).stroke("blue")};var ig=`#version 300 es
precision highp float;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const int sampleCount=4;const float dimmedAttributeLum=0.6;const float isDimThresh03=1.5;const float saturationThreshold=0.15;const vec3 channelStrengthModifier=vec3(0.8,1.0,1.1);const vec4 pureWhiteColour=vec4(1.0,1.0,1.0,1.0);const vec4 pureBlueColour=vec4(0.0,0.0,1.0,1.0);const vec4 pureBlackColour=vec4(0.0,0.0,0.0,1.0);vec2 attributeBlockPos(vec2 texSize,float blockSize,vec2 textureCoord){vec2 pixelPos=textureCoord*texSize;return(floor(pixelPos/blockSize)*blockSize)/texSize;}vec4 attributeClash(sampler2D inputTexture,sampler2D lut,float blockSize,float blackPoint,float inputDim,vec2 textureCoord){vec2 textureSize=vec2(textureSize(inputTexture,0));vec2 blockPos=attributeBlockPos(textureSize,blockSize,textureCoord);vec3 colorSum=vec3(0.0);float colouredSamplesCount=0.001;vec2 stepSize01=vec2(blockSize/float(sampleCount))/textureSize;vec2 samplePos01=blockPos;for(int y=0;y<sampleCount;y++){samplePos01.y+=stepSize01.y;samplePos01.x=blockPos.x;for(int x=0;x<sampleCount;x++){samplePos01.x+=stepSize01.x;vec4 sampleColor=lutColourReplace(lut,texture(inputTexture,samplePos01))*inputDim;float isInBounds=step(0.0,samplePos01.x)*step(samplePos01.x,1.0)*step(0.0,samplePos01.y)*step(samplePos01.y,1.0);float useSample=isNotBlack(sampleColor,blackPoint)*isInBounds;colorSum+=sampleColor.rgb*sampleColor.rgb*useSample;colouredSamplesCount+=useSample;}}vec3 avgColor=colorSum/colouredSamplesCount;float avgColorLum03=max(avgColor.r+avgColor.g+avgColor.b,0.01);vec3 channelsStrength=avgColor/avgColorLum03;vec4 quantisedColor=vec4(step(0.3,channelsStrength*channelStrengthModifier),0.1);float maxChannel=max(channelsStrength.r,max(channelsStrength.g,channelsStrength.b));float minChannel=min(channelsStrength.r,min(channelsStrength.g,channelsStrength.b));float sat=maxChannel-minChannel;float isSaturated01=step(saturationThreshold,sat);float isBright=step(isDimThresh03,avgColorLum03);float thresholdForUnsatToBeBlue=step(isDimThresh03*0.3,avgColorLum03);float thresholdForSaturatedToBeBlue=step(isDimThresh03*0.03,avgColorLum03);vec4 unsatOrQuantisedColor=mix(mix(pureBlueColour,pureWhiteColour,thresholdForUnsatToBeBlue),mix(pureBlueColour,quantisedColor,thresholdForSaturatedToBeBlue),isSaturated01);float dimMultiplier=mix(dimmedAttributeLum,1.0,isBright);vec4 dimmedColor=unsatOrQuantisedColor*dimMultiplier;vec4 c=lutColourReplace(lut,texture(inputTexture,textureCoord))*inputDim;float originalColorIsNotBlack=isNotBlack(c,blackPoint);return mix(pureBlackColour,dimmedColor,originalColorIsNotBlack);}in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform float uBlockSize;uniform float uBlackPoint;uniform float uProgress;uniform sampler2D uLut;uniform float uCentreX;uniform float uCentreY;uniform vec4 uInputClamp;const float blackCircleMinSize=0.33;const float blackCircleFeathering=0.4;const float fadeDuration=0.1;float fade(){return 1.0-smoothstep(1.0 - fadeDuration,1.0,uProgress);}float blockDistToCentre(float ellipticalFactor){float xCentreTrue=uInputClamp.x+(uInputClamp.z-uInputClamp.x)*uCentreX;float yCentreTrue=uInputClamp.y+(uInputClamp.w-uInputClamp.y)*uCentreY;vec2 trueCentre=vec2(xCentreTrue,yCentreTrue);vec2 texSize=vec2(textureSize(uTexture,0));float texAspect=texSize.x/texSize.y;vec2 blockPos=attributeBlockPos(texSize,uBlockSize,vTextureCoord);return length((blockPos-trueCentre)/vec2(1,texAspect*ellipticalFactor));}float isInCirc(float blockDistToCentre01,float feathering,float circleMinSize,float progress){return smoothstep(progress-feathering,progress+feathering,pow(1.0-blockDistToCentre01,3.0)+circleMinSize);}void main(void){float elipticalFactor=mix(1.0,0.5,uProgress);float blockDistToCentre=blockDistToCentre(elipticalFactor);float insideBlackCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,blackCircleMinSize,uProgress-0.2);float insideInnerCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,0.0,uProgress*1.5-0.3);vec4 clashColour=attributeClash(uTexture,uLut,uBlockSize,uBlackPoint,max(insideBlackCirc01-pow(uProgress,4.0),0.0),vTextureCoord);vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(clashColour,c,insideInnerCirc01*fade());}`;const ag=Q.from({vertex:Ne,fragment:ig,name:"attribute-block-filter"});class lg extends K{uniforms;constructor({blockSize:e=8,blackPoint:t=.1,centreX:o=.5,centreY:r=.5}={}){super({glProgram:ag,resources:{attributeBlockUniforms:{uBlockSize:{value:e,type:"f32"},uBlackPoint:{value:t,type:"f32"},uProgress:{value:0,type:"f32"},uCentreX:{value:o,type:"f32"},uCentreY:{value:r,type:"f32"}},uLut:bu.source}}),this.uniforms=this.resources.attributeBlockUniforms.uniforms}set progress(e){this.resources.attributeBlockUniforms.uniforms.uProgress=e}set centreX(e){this.resources.attributeBlockUniforms.uniforms.uCentreX=e}set centreY(e){this.resources.attributeBlockUniforms.uniforms.uCentreY=e}}class cg{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:o}=e,r=this.childRenderer.output.graphics,s={sound:this.childRenderer.output.sound,graphics:new C({children:[r],label:`TeleportEffectRenderer(${o.id})`})};this.output=s,this.#o()}output;#e;#t(e){const t=pe(e.state.position,N(e.aabb,.5)),{renderContext:{general:{upscale:{rotate90:o}}}}=this,{x:r,y:s}=F(t),i=this.output.graphics.getLocalBounds();this.output.graphics.filterArea=i.rectangle;const a=(r-i.x)/i.width,l=(s-i.y)/i.height;o?(this.#e.centreX=1-l,this.#e.centreY=a):(this.#e.centreX=a,this.#e.centreY=l)}#o(){const{renderContext:{general:{gameState:{currentCharacterName:e}},room:{items:t}}}=this,o=t[e];if(o!==void 0){const{teleporting:r}=o.state;if(this.#e===void 0!=(r===null))if(r!==null){const{renderContext:{general:{upscale:{gameEngineUpscale:s}}}}=this;this.#e=new lg({blockSize:s*8}),this.#t(o),this.output.graphics.filters=[this.#e]}else this.#e=void 0,this.output.graphics.filters=Mt;else if(r!==null){const{timeRemaining:s,phase:i}=r,a=s/Vn,l=i==="in"?a:1-a;this.#e.progress=l,this.#t(o)}}}tick(e){this.childRenderer.tick(e),this.#o()}destroy(){this.output.graphics.destroy({children:!0}),this.#e?.destroy(),this.childRenderer.destroy()}}const Zt=n=>({avgMs:n.avgMs.toFixed(2),percentage:n.percentage.toFixed(1)+"%",fps:(1e3/n.avgMs).toLocaleString("en-GB",{maximumFractionDigits:0})}),ug=n=>{const{frameCount:e,fps:t,theoreticalFps:o,phases:r,elapsedMs:s}=n;console.log(`Frame timing (${e} frames in ${(s/1e3).toFixed(3)}s, ${t.toFixed(1)} fps, theoretical max: ${o.toLocaleString("en-GB",{minimumFractionDigits:1,maximumFractionDigits:1})} fps):`),console.table({physics:Zt(r.physics),hudUpdateSceneGraph:Zt(r.hudUpdateSceneGraph),updateSceneGraph:Zt(r.updateSceneGraph),"pixi.js app.render":Zt(r.pixiRender),total:{...Zt(r.total),percentage:"100%"}})},dg=()=>{typeof window<"u"&&(window.detailedFps=()=>{cn.on(ug)},console.log("%cPerformance timing available:","color: #4CAF50; font-weight: bold"),console.log("call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)"))},Jo=(n,e)=>{if(n.lives=Me(n.lives,-1),n.lives===0&&e!==void 0){const t=Dt(e.lives);t>=2&&(n.lives=Me(n.lives,1),e.lives=Me(e.lives,t>2?-2:-1))}},rl=(n,e)=>{const t=Bt(e);if(t===void 0)return;const{carrying:o}=t;o!==null&&(J({room:n,item:o,atPosition:e.state.position}),t.carrying=null)},hg=(n,e)=>{const t=n.characterRooms.headOverHeels;if(Jo(e.state.head,e.state.heels),Jo(e.state.heels,e.state.head),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,Me(e.state.head.lives,e.state.heels.lives)===0)return;const r=Dt(e.state.head.lives)>0,s=Dt(e.state.heels.lives)>0;if(rl(t,e),r&&!s||!r&&s){const c=r?"head":"heels";n.currentCharacterName=c,tt(n,e);const u=$r(e)[c],d=Pt({gameState:n,playableItems:[u],roomId:t.id});n.characterRooms={[c]:d},n.entryState={[c]:Nr(u)};return}if(n.entryState.headOverHeels!==void 0){tt(n,e);const c=Pt({gameState:n,playableItems:[e],roomId:t.id});n.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=$r(e);if(tt(n,c),tt(n,u),Fc(c,u)){const d=Di({head:c,heels:u});tt(n,d,"heels");const h=Pt({gameState:n,playableItems:[d],roomId:t.id});n.characterRooms={headOverHeels:h},n.entryState={headOverHeels:Nr(d)};return}else{const d=Pt({gameState:n,playableItems:[c,u],roomId:t.id});n.characterRooms={head:d,heels:d};return}}},Pt=({gameState:n,playableItems:e,roomId:t})=>{const o=Dc(k.getState()),r=zc({roomJson:o.rooms[t],roomPickupsCollected:n.pickupsCollected[t]??ce,scrollsRead:k.getState().gameMenus.gameInPlay.scrollsRead,userSettings:k.getState().gameMenus.userSettings});for(const s of e)J({room:r,item:s}),(s.type==="head"||s.type==="headOverHeels")&&Lc(r,n);return r},tt=(n,e,t=e.id)=>{const o=n.entryState[t];e.state={...e.state,...o,expires:null,standingOnItemId:null}},pg=n=>{n.state.standingOnItemId=null,n.state.previousStandingOnItemId=null,n.state.standingOnUntilRoomTime=He},fg=(n,e)=>{const t=zi(n,$n(e.type));e.state.lastDiedAt=e.state.gameTime;const o=n.characterRooms[e.type];if(rl(o,e),pg(e),Jo(e.state,t?.state),e.state.lives===0){delete n.characterRooms[e.id],t!==void 0&&(n.currentCharacterName=t.type);return}else{tt(n,e);const r=t===void 0?void 0:n.characterRooms[t.type];if(o===r){if(n.entryState.headOverHeels!==void 0){const a=Di({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});tt(n,a);const l=Pt({gameState:n,playableItems:[a],roomId:o.id});n.characterRooms={headOverHeels:l},n.currentCharacterName="headOverHeels";return}J({room:o,item:e});return}else{const i=Pt({gameState:n,playableItems:[e],roomId:o.id});n.characterRooms[e.id]=i;return}}},mg=(n,e)=>{k.dispatch(Oc({characterLosingLifeItem:e})),e.type==="headOverHeels"?hg(n,e):fg(n,e),Ut(n)===void 0&&k.dispatch(_o({offerReincarnation:!0}))},gg=n=>{for(const e of he(n.items))try{for(const t of je(e.state.stoodOnBy,n)){if(!n.items[t.id]){Hn(t,n);continue}if(!vi(t,e)){Hn(t,n);const o=Ii(t,yr(n.items));o!==void 0&&ir({above:t,below:o})}}}catch(t){throw new Error(`could not update standing on for item "${e.id}"`,{cause:t})}},ei=er*ut.animations["particle.head.fade"].length*(1/ut.animations["particle.head.fade"].animationSpeed),xg=20,yg=38,bg=.5,_n=A.x/2;let vg=0;const sl=(n,e)=>Math.random()<n*(e/1e3),il=(n,e,t,o)=>({...cr,id:`particle.${n}.${vg++}`,type:"particle",aabb:H,config:{forCharacter:e},state:{...lr(),expires:o+ei+Math.random()*ei,position:t}}),al=(n,e,t,o)=>{if(!sl(t,o))return;const r={...pe(Ti(n),{x:Math.random()*_n-_n/2,y:Math.random()*_n-_n/2}),z:n.state.position.z};J({room:e,item:il(n.id,n.type,r,e.roomTime)})},wg=(n,e,t)=>{!(_r(n.state)>0)||n.state.standingOnItemId===null||ft(n.state.vels.walking)<Te||al(n,e,xg,t)},Sg=(n,e,t)=>{const{isBigJump:o}=n.state;o&&n.state.standingOnItemId===null&&(n.state.vels.gravity.z<=0||al(n,e,yg,t))},Cg=(n,e)=>{const{head:t,heels:o}=Xn(n.items);t!==void 0&&wg(t,n,e),o!==void 0&&Sg(o,n,e)},Tg=(n,e,t)=>{if(!sl(bg,t))return;const o=wr(Fi),r=pe(e.state.position,{x:o==="x"?0:Math.random()*A.x,y:o==="y"?0:Math.random()*A.y,z:o==="z"?A.z:Math.random()*A.z});J({room:n,item:il(e.id,"crown",r,n.roomTime)})},kg=(n,e,t)=>{n.gameTime+=t,e.roomTime+=t;const o=Ut(n);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=t,o.state.heels.gameTime+=t;else if(o.state.gameTime+=t,n.characterRooms.head===n.characterRooms.heels){const s=zi(n,$n(o.type));s!==void 0&&(s.state.gameTime+=t)}}},Ig=n=>{for(const e of he(n.items)){const t=e.state.position,o=Ec(t);o!==t&&Li(n,e,o)}},Pg=(n,e)=>n.state.expires!==null&&n.state.expires<e.roomTime,Rg=(n,e)=>{const t={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1,wall:1,floor:1},o=t[n.type]??0,r=t[e.type]??0;return o-r},_g=(n,e)=>{const{actedOnAt:t}=n.state,o=e===t.roomTime;if(o&&t.actedInXY)return;const{position:r}=n.state,s=!Number.isInteger(r.x)||!Number.isInteger(r.y),i=!o||!t.actedInZ,a=i&&!Number.isInteger(r.z);if(!(!s&&!a))return{x:Math.round(r.x),y:Math.round(r.y),z:i?Math.round(r.z):r.z}},Mg=(n,e)=>{for(const t of he(n.items)){if(!Ve(t))continue;const o=_g(t,n.roomTime);if(o===void 0)continue;const{id:r}=t;dr({id:r,aabb:t.aabb,state:{position:o}},n[Jn],i=>i.id!==r&&mt(i,t)).toArray().length>0||(Li(n,t,o),e.add(t))}},ll=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Bg=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Mn=A.x*3,Ag=(n,e)=>{const{state:{position:t}}=n,{state:{position:o}}=e;return t.x>o.x-Mn&&t.x<o.x+Mn&&t.y>o.y-Mn&&t.y<o.y+Mn},ti=(n,e,t,o,r)=>{if(r&&n.state.activated)return ue;const s=to(n.state.position,e);return s===void 0?ue:Ag(n,s)?ll:Bg},Og=(n,e,t,o)=>n.state.activated?ue:je(n.state.stoodOnBy,e).some(be)?ll:ue,Fg=(n,e,t,o)=>{switch(n.config.activated){case"after-player-near":return ti(n,e,t,o,!0);case"while-player-near":return ti(n,e,t,o,!1);case"on-stand":return Og(n,e);case"off":case"on":return ue;default:throw n.config,new Error(`unrecognised item.config.activation ${n.config.activated} in ${n.id}:
        ${JSON.stringify(n,null,2)}`)}},Dg={movementType:"steady",stateDelta:{pressed:!0}},zg={movementType:"steady",stateDelta:{pressed:!1}},Lg=(n,e)=>{const{state:{stoodOnUntilRoomTime:t,stoodOnBy:o,pressed:r}}=n,s=t+Gc,{roomTime:i}=e,a=!Ai(Uc(o));return!a&&i>s&&r?(Ho(n.config.modifies,"right",n,e),zg):!r&&a?(Ho(n.config.modifies,"left",n,e),Dg):ue},Eg=(n,e,t,o)=>{const{id:r,state:s,config:i}=n,{roomTime:a}=e,{lastEmittedAtRoomTime:l,quantityEmitted:c,position:u}=s,d=s.emits??i.emits,h=s.period??i.period,p=s.maximum??i.maximum;if(c!==p&&l+h<a){const f=Wc(Vc(`${r}-${c}-${a}`,{...d,position:H},e.roomJson));if(f===void 0)throw new Error("emitter failed to create a new item");J({room:e,item:f,atPosition:fn(u,N(f.aabb,.5))}),n.state.lastEmittedAtRoomTime=e.roomTime+h,n.state.quantityEmitted++}},Ug=Object.freeze({textureId:"shadow.smallRound",spritesheetVariant:"original"}),Gg=A.x*.75,Wg=500,Vg=(n,e,t,o)=>{const{inputStateTracker:r}=t,s=n.type==="head"?n.state:n.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=n,u=hn(c);if(r.currentActionPress("fire")!=="released"&&a&&Dt(i)>0){const d={type:"firedDoughnut",...cr,config:ce,id:`firedDoughnut/${n.id}/${e.roomTime}`,shadowCastTexture:Ug,state:{...lr(),position:pe(l,N(u,Gg),n.type==="headOverHeels"?{z:A.z}:H),vels:{fired:N(u,we.firedDoughnut)},disappearing:{on:"touch"}}};J({room:e,item:d}),s.doughnuts=Me(s.doughnuts,-1),r.inputWasHandled("fire",Wg)}},ni={movementType:"vel",vels:{gravity:H}},Hg=(n,e,t,o)=>{if(!mt(n))return ni;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=n,l=Hc[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=mn(i,e);return br(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-Ro*o,-l)}}}:ni}else return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-Ro*o,-l)}}}};function*$g(n,{roomTime:e},t,o){const r=e,s=e-o,i=[];for(let a=0;a<n.state.latentMovement.length;a++){const l=n.state.latentMovement[a];if(l.startAtRoomTime>r)continue;if(l.endAtRoomTime<=s){i.push(a);continue}if(l.fromStandingOn!==n.state.standingOnItemId){i.push(a);continue}const c=Math.max(l.startAtRoomTime,s),d=Math.min(l.endAtRoomTime,r)-c;d>0&&(yield{posDelta:N(l.velocity,d),movedBy:l.fromStandingOn}),l.endAtRoomTime<=r&&i.push(a)}for(let a=i.length-1;a>=0;a--)n.state.latentMovement.splice(i[a],1)}const oi=A.z,ri=.001,Ng={movementType:"vel",vels:{lift:H}},jg=({z:n,lowestZ:e,highestZ:t,direction:o,currentVelocity:r,deltaMS:s})=>{const i=Je**2/(2*$t);if(o==="up"){const a=t-n;if(a<=i){const l=Math.max(0,a);return Math.max(ri,Math.sqrt(2*$t*l))}return r<Je?Math.min(Je,r+$t*s):Je}else{const a=n-e;if(a<=i){const l=Math.max(0,a);return Math.min(-ri,-Math.sqrt(2*$t*l))}return r>-Je?Math.max(-Je,r-$t*s):-Je}},Xg=({state:{direction:n,bottom:e,top:t,position:{z:o},vels:r}},s,i,a)=>{const l=e*oi,c=t*oi;if(l===c&&Pe(o,l))return Ng;const u=r?.lift?.z??0,d=jg({z:o,lowestZ:l,highestZ:c,direction:n,currentVelocity:u,deltaMS:a});if(Number.isNaN(d))throw new Error("velocity is NaN");const h=o<=l?"up":o>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:d}},stateDelta:{direction:h}}},si={movementType:"vel",vels:{movingFloor:H}},Yg=(n,e,t,o)=>{if(be(n)&&n.state.teleporting!==null)return si;const{state:{standingOnItemId:r}}=n,s=mn(r,e);if(s===null||!$c(s))return si;const{state:{direction:i}}=s,l=Nc(n)&&n.state.action==="moving"&&Lt(n.state.facing)===jc(i)?we.heels:Xc;return{movementType:"vel",vels:{movingFloor:N(an[i],l)}}},Jg=(n,e,t,o)=>{const r=n.x*n.x+n.y*n.y,s=e.x*e.x+e.y*e.y;if(r<Te||s<Te)return n;const i=Math.atan2(n.x*e.y-n.y*e.x,n.x*e.x+n.y*e.y),a=Math.abs(i);if(a<Te)return e;const l=a>Math.PI-Te?a:i,c=t*o,u=Math.max(-c,Math.min(c,l)),d=Math.cos(u),h=Math.sin(u);return{x:n.x*d-n.y*h,y:n.x*h+n.y*d,z:n.z}},qg=.009,Zg=(n,e,t,o)=>{const{state:{visualFacingVector:r,facing:s}}=n;return{movementType:"steady",stateDelta:{visualFacingVector:Jg(r??s,s,qg,o)}}},Kg=(n,e,t)=>{const o=ch(n);if(o!==void 0){const r=o*Jc,s=un(e)/Math.max(t,Te);s>r&&Yc(e,r/s)}};function*Qg(n,e,t,o){if(Ve(n)&&(yield Hg(n,e,t,o),yield Yg(n,e)),be(n)){if(yield za(n,e,t,o),yield Zg(n,e,t,o),yield yh(n,e,t,o),n.id===t.currentCharacterName){const r=Kc(n);r&&Vh(n,e,t,o),yield Da(n,e,t),r&&Hh(n,e,t),Qc(n)&&Vg(n,e,t)}}else br(n)?yield Xg(n,e,t,o):eu(n)?(yield Fg(n,e,t,o),yield mh(n,e,t,o)):tu(n)?Eg(n,e):nu(n)&&(yield Lg(n,e))}const ex=(n,e,t,o)=>{if(!Ve(n)||n.state.standingOnItemId===null)return;const r=mn(n.state.standingOnItemId,e);be(n)&&r.type==="pickup"&&Wa({gameState:t,movingItem:n,touchedItem:r,room:e});const{state:{disappearing:s}}=r;s!==null&&(s.byType===void 0||s.byType.includes(n.type))&&wi({touchedItem:r,gameState:t,room:e})},Bn={x:0,y:0,z:0},tx={x:0,y:0,z:0},nx=(n,e,t,o)=>{if(be(n)&&n.state.standingOnItemId!==null){const a=mn(n.state.standingOnItemId,e);(sr(a)||a.type==="spikes")&&Ga({room:e,movingItem:n})}const r=Qg(n,e,t,o).toArray();if(ex(n,e,t),Fa(Bn,n,r),Ve(n)||br(n)||qc(n))for(const a of Ge(n.state.vels))nr(Bn,Oi(tx,{...H,...a},o));if(Zc(n)&&Tg(e,n,o),r.find(a=>a.movementType==="position")!==void 0||Kg(n,Bn,o),Mo({subjectItem:n,posDelta:Bn,gameState:t,room:e,deltaMS:o,onTouch:$o}),Ve(n))for(const{movedBy:a,posDelta:l}of $g(n,e,t,o))Ci(a,n,e,l.x!==0||l.y!==0,l.z!==0),Mo({subjectItem:n,posDelta:l,gameState:t,room:e,deltaMS:o,onTouch:$o})},ox=(n,e)=>{const t=new Set;for(const o of yr(n)){const r=e[o.id];(r===void 0||!Et(r,o.state.position))&&t.add(o)}return t},rx=(n,e)=>{const t=Ft(n);if(t===void 0)return Ot;kg(n,t,e);const o=Object.fromEntries(ou(t.items).map(([i,a])=>[i,a.state.position]));for(const i of yr(t.items))Pg(i,t)&&(ur({room:t,item:i}),be(i)&&mg(n,i));const r=ru(t.items).sort(Rg);for(const i of r){const a=Ut(n);if(a===void 0||a.state.action==="death")break;if(t.items[i.id]!==void 0)try{nx(i,t,n,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${i.id}"`,{cause:l})}}Cg(t,e),gg(t),Ig(t);const s=ox(t.items,o);return Mh(s,t,o,e),Mg(t,s),s},sx=ce,ix=(n,e)=>(t,o)=>{const r=new Set;if(su(t)){const u=Ft(t)?.items;if(u!==void 0){const d=pt(Ge(Xn(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const a=nt.shared.speed===0?1:Math.max(1,Math.ceil(o/e)),l=o/a;for(let u=0;u<a;u++){const d=n(t,l);for(const h of d)r.add(h)}const c=Ft(t)?.items??sx;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},ax=(n,e,t,o)=>{if(e){const r=o.shade==="dimmed";Ed(n,e,t,o),$d(n,t,o),Yd(n,r),Kd(n,r)}else Ma()},Xe=`
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
`,lx=`#version 300 es
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
}`,cx={radius:1.2,cutoff:.88,intensity:.14,edgeBlur:.5};class ux extends K{uniforms;constructor(e={}){const t={...cx,...e},o=Q.from({vertex:Xe,fragment:lx,name:"bloom-filter"});super({glProgram:o,resources:{bloomUniforms:{uRadius:{value:t.radius,type:"f32"},uCutoff:{value:t.cutoff,type:"f32"},uIntensity:{value:t.intensity,type:"f32"},uEdgeBlur:{value:t.edgeBlur,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.bloomUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const dx=`#version 300 es
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
}`,hx={gamma:1,saturation:1,brightness:1,brightnessBottom:0};class ii extends K{uniforms;constructor(e={}){const t={...hx,...e},o=Q.from({vertex:Xe,fragment:dx,name:"color-adjustment-filter"});super({glProgram:o,resources:{colorAdjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uBrightnessBottom:{value:t.brightnessBottom,type:"f32"}}}}),this.uniforms=this.resources.colorAdjustmentUniforms.uniforms}}const cl=(n,e)=>n.replace(/\{\{(\w+)\}\}/g,(t,o)=>{if(o in e){const r=e[o];return typeof r=="boolean"?r?"1":"0":String(r)}return console.warn(`Shader placeholder {{${o}}} not found in values map`),t}),px=`#version 300 es
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
}`,fx={curvatureX:.15,curvatureY:.15,multisampling:!0};class mx extends K{uniforms;constructor(e={}){const t={...fx,...e},o=cl(px,{MULTISAMPLE:t.multisampling}),r=Q.from({vertex:Xe,fragment:o,name:"curvature-filter"});super({glProgram:r,resources:{curvatureUniforms:{uCurvatureX:{value:t.curvatureX,type:"f32"},uCurvatureY:{value:t.curvatureY,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.curvatureUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const gx=`#version 300 es
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
}`,xx={intensity:.04,scale:6,fps:30};class yx extends K{uniforms;startTime;constructor(e={}){const t={...xx,...e},o=Q.from({vertex:Xe,fragment:gx,name:"noise-filter"});super({glProgram:o,resources:{noiseUniforms:{uIntensity:{value:t.intensity,type:"f32"},uScale:{value:t.scale,type:"f32"},uFPS:{value:t.fps,type:"f32"},uTime:{value:0,type:"f32"}}}}),this.uniforms=this.resources.noiseUniforms.uniforms,this.startTime=performance.now()}apply(e,t,o,r){this.uniforms.uTime=performance.now()-this.startTime,super.apply(e,t,o,r)}}const bx=`#version 300 es
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
}`,vx={pixelWidth:4,maskBrightness:.7,numSamples:4,transitionWidth:.3};class wx extends K{uniforms;constructor(e={}){const t={...vx,...e},o=cl(bx,{NUM_SAMPLES:t.numSamples}),r=Q.from({vertex:Xe,fragment:o,name:"phosphor-mask-filter"});super({glProgram:r,resources:{phosphorMaskUniforms:{uPixelWidth:{value:t.pixelWidth,type:"f32"},uMaskBrightness:{value:t.maskBrightness,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uTransitionWidth:{value:t.transitionWidth,type:"f32"}}}}),this.uniforms=this.resources.phosphorMaskUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const Sx=`#version 300 es
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
}`,Cx={pixelHeight:4,gapBrightness:.7};class Tx extends K{uniforms;constructor(e={}){const t={...Cx,...e},o=Q.from({vertex:Xe,fragment:Sx,name:"scanlines-filter"});super({glProgram:o,resources:{scanlinesUniforms:{uPixelHeight:{value:t.pixelHeight,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uGapBrightness:{value:t.gapBrightness,type:"f32"}}}}),this.uniforms=this.resources.scanlinesUniforms.uniforms}apply(e,t,o,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,o,r)}}const kx=`#version 300 es
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
}`,Ix={intensity:.4,radius:.8};class Px extends K{uniforms;constructor(e={}){const t={...Ix,...e},o=Q.from({vertex:Xe,fragment:kx,name:"vignette-filter"});super({glProgram:o,resources:{vignetteUniforms:{uIntensity:{value:t.intensity,type:"f32"},uRadius:{value:t.radius,type:"f32"}}}}),this.uniforms=this.resources.vignetteUniforms.uniforms}}const Rx=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float uBlackPoint;
uniform sampler2D uTexture;

out vec4 finalColor;

void main() {
    vec4 colour = texture(uTexture, vTextureCoord);
    
    finalColor = (colour * (1.0-uBlackPoint)) + uBlackPoint;
}
`,_x={blackPoint:.04};class Mx extends K{uniforms;constructor(e={}){const t={..._x,...e},o=Q.from({vertex:Xe,fragment:Rx,name:"raise-black-point-filter"});super({glProgram:o,resources:{raiseBlackPointUniforms:{uBlackPoint:{value:t.blackPoint,type:"f32"}}}}),this.uniforms=this.resources.raiseBlackPointUniforms.uniforms}}const ai=.8,Bx=1.2,Ax=({crtFilter:n},e)=>n??Gt.displaySettings.crtFilter?[new ii({brightness:ai}),new yx({intensity:.03,fps:29.97,scale:5}),new Tx({pixelHeight:e.gameEngineUpscale,gapBrightness:.66}),new wx({pixelWidth:e.gameEngineUpscale*1.1,maskBrightness:.6,numSamples:2,transitionWidth:.2}),new ux({radius:e.gameEngineUpscale/6,intensity:.1,cutoff:.8,edgeBlur:1}),new Px({intensity:.4,radius:.7}),new mx({curvatureX:.13,curvatureY:.12,multisampling:!0}),new Mx({blackPoint:.03}),new ii({gamma:1.1,saturation:1.35,brightness:1/ai*Bx,brightnessBottom:-.15})]:Za;dg();const Ox=Math.PI/2;class Fx{constructor(e,t){this.app=e,this.gameState=t;try{const o=k.getState(),r=Qo(o);if(this.#n.connect(M.destination),e.stage.addChild(this.#s),e.stage.scale=r,Ft(t)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#i(o);return}}#e;#t;#o=new C({label:"MainLoop/worldContainer"});#n=M.createGain();#r=ix(rx,pu);#s=new C({label:"MainLoop/mainContainer",children:[this.#o]});#i(e){console.error(e),k.dispatch(iu(au(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}},upscale:{upscale:t}}=k.getState();this.app.stage.filters=Ax(e,t)}#a=e=>{try{this.#u(e)}catch(t){const o=new Error("Error caught in main loop tick",{cause:t});this.#i(o)}};#c({gameEngineUpscale:e,rotate90:t,gameEngineScreenSize:o}){const{app:{stage:r}}=this;r.scale=e,this.#s.rotation=t?Ox:0,this.#s.position.x=t?o.y:0}#u=({deltaMS:e})=>{const t=k.getState(),o=rt(t)?cn:void 0;if(lu(t))return;const r=cu(t),{gameMenus:{userSettings:{displaySettings:s,soundSettings:i},gameInPlay:{freeCharacters:a}},upscale:{upscale:l}}=k.getState(),c=!r&&!(s?.uncolourised??Gt.displaySettings.uncolourised);o?.startPhysics();const u=r?Ot:this.#r(this.gameState,e);o?.endPhysics(),o?.startUpdateSceneGraph();const d=Ft(this.gameState),h=this.#t?.renderContext.room!==d;(h||c!==this.#t?.renderContext.general.colourised)&&d!==void 0&&ax(this.app.renderer,c,d.planet,d.color),o?.startHudUpdate();const p=uu(t),f=du(t);Rf(this.#e,c,p,f,l)&&(this.#e?.destroy(),this.#e=new Pf({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1},inputDirectionMode:f,onScreenControls:p}),this.#s.addChild(this.#e.output)),this.#e.tick({screenSize:l.gameEngineScreenSize,deltaMS:e,room:d,freeCharacters:a}),o?.endHudUpdate();const g=_f(this.#t,h,l,s,i,r);if(g){if(this.#t?.destroy(),d){const x={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1},room:d};this.#t=new rg(x,new cg(x,new Qm(x))),this.#o.addChild(this.#t.output.graphics),this.#t.output.sound?.connect(this.#n)}else this.#t=void 0;this.#c(l),this.#l(),this.#s.boundsArea=new on(0,0,l.rotate90?l.gameEngineScreenSize.y:l.gameEngineScreenSize.x,l.rotate90?l.gameEngineScreenSize.x:l.gameEngineScreenSize.y)}this.#t?.tick({movedItems:u,deltaMS:e}),o?.endUpdateSceneGraph();try{if(o?.startPixiRender(),this.app.render(),o?.endPixiRender(),g&&d){const x=new CustomEvent("firstRenderOfRoom",{detail:{roomId:d.id}});window.dispatchEvent(x)}}catch(x){throw new Error("Error in Pixi.js app.render()",{cause:x})}o?.tickDone(),this.app.ticker.maxFPS=r?10:hu};start(){return this.app.ticker.add(this.#a),this}stop(){this.app.stage.removeChild(this.#s),this.#n.disconnect(),this.#t?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.#a)}}rn.defaultOptions.scaleMode="nearest";const $x=async(n,e)=>{const t=new vu,[o]=await Promise.all([Rd(n),t.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0})]);if(t.renderer.gl.drawingBufferColorSpace="display-p3",o.error)throw new Error(`could not load campaign ${JSON.stringify(n)}`,{cause:o.error});const r=o.data;fu(t.renderer),Id(t.renderer),_d(t),window._e2e_pixiApplication=t,globalThis.__PIXI_APP__=t;const s=mu(k.getState(),n),i=jr({campaign:r,inputStateTracker:e,savedGame:s});if(s!==void 0){const l=s.store.gameMenus.gameInPlay;k.dispatch(gu(l))}else i.characterRooms.head&&k.dispatch(Xr(i.characterRooms.head.id)),i.characterRooms.heels&&k.dispatch(Xr(i.characterRooms.heels.id));const a=new Fx(t,i).start();return{campaign:r,renderIn(l){l.appendChild(t.canvas)},resizeTo(l,c){c?t.renderer.resize(l.y,l.x):t.renderer.resize(l.x,l.y)},changeRoom(l){const c=Ut(i);c!==void 0&&or({playableItem:c,gameState:i,toRoomId:l,changeType:"level-select"})},get currentRoom(){return Ft(i)},get gameState(){return i},reincarnateFrom(l){jr({campaign:r,inputStateTracker:e,savedGame:l,writeInto:i})},stop(){console.warn("tearing down game"),t.canvas.parentNode?.removeChild(t.canvas),a.stop(),t.destroy()}}};export{$x as default,$x as gameMain};
