import{aB as ce,aC as ue,ap as fo,ay as Xt,a8 as h,o as D,ae as w,n as p,bf as bo,_ as v,bg as po,bh as ho,t as x,L as de,bi as mo,bj as go,bk as Gt,bl as G,bm as qe,a4 as We,bn as qt,bo as vo,bp as yo,ba as _,bq as xo,br as So,W as Oe,bs as Ie,q as Jt,y as L,Y as S,bt as U,bu as Ke,bv as To,bw as $t,bx as Yt,by as Co,bz as k,w as F,bA as Zt,bB as Le,bC as ft,bD as Qt,bE as wo,J as K,bF as Me,bG as Wt,bH as H,bI as fe,bJ as Ae,e as Io,U as W,bK as j,x as ee,bL as Je,bM as ko,d as Po,bN as Bo,bO as Oo,bP as Do,O as te,bQ as Fo,bR as Lo,bS as Mo,bT as $e,bU as Ao,bV as Kt,bW as zo,bX as me,r as et,bY as _o,bZ as Ro,b_ as Uo,A as X,b$ as en,Q as tn,c0 as bt,c1 as nn,u as be,c2 as on,F as rn,k as sn,E as No,bb as ne,j as Ye,c3 as Ee,c4 as Ve,aJ as pt,c5 as je,c6 as ge,c7 as Eo,a9 as Vo,c8 as jo,c9 as oe,ca as ht,cb as Ho,cc as Xo,cd as Go,ce as tt,cf as qo,cg as Jo,ch as $o,a5 as Yo,i as nt,ci as Zo,cj as Qo,ck as Wo,cl as Ko,cm as er,cn as tr,co as nr,cp as mt,Z as gt,H as or,cq as an,be as ln,S as cn,T as rr,P as vt,cr as ir,cs as sr,ct as ar,cu as lr,a as cr,aH as Z,cv as ur,cw as un,cx as dn,cy as dr,cz as fr,cA as yt,cB as xt,cC as br,cD as pr,cE as hr,cF as mr,cG as gr,cH as vr,ad as yr,cI as xr,cJ as St,cK as Sr,$ as Tt,cL as Tr}from"./App-CHH1KIV4.js";import{f as Cr,c as fn,m as ze,a as ot,b as bn,r as wr,o as Ir}from"./changeCharacterRoom-D4HgLWSj.js";import{F as pe,d as y,n as De,h as ke,e as kr,f as P,s as C,r as Pr,g as Br,i as A,P as Or,j as Dr,k as Fr,l as Lr,p as Mr,m as Pe,o as B,t as pn,q as rt,v as Ar,w as ae,x as hn,y as Ct,z as wt,B as He,D as It,E as zr,G as _r,H as Rr,I as ve,J as Ur,R as Nr,A as Er}from"./roomRenderer-DIhs15GH.js";import{G as mn}from"./Graphics-Bd9Qwd02.js";import"./index-D5R9vdwh.js";var Vr=`
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
`,jr=`in vec2 aPosition;
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
`,Hr=`
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
}`;class m extends pe{constructor(t){const n=t.gpu,o=kt({source:Hr,...n}),r=ce.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=t.gl,s=kt({source:Vr,...i}),a=ue.from({vertex:jr,fragment:s}),c=new fo({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:c,uBackTexture:Xt.EMPTY}})}}function kt(e){const{source:t,functions:n,main:o}=e;return t.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const it=`
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
    `,st=`
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
	`;class gn extends m{constructor(){super({gl:{functions:`
                ${it}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${st}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}gn.extension={name:"color",type:h.BlendMode};class vn extends m{constructor(){super({gl:{functions:`
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
            `}})}}vn.extension={name:"color-burn",type:h.BlendMode};class yn extends m{constructor(){super({gl:{functions:`
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
                `}})}}yn.extension={name:"color-dodge",type:h.BlendMode};class xn extends m{constructor(){super({gl:{functions:`
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
                `}})}}xn.extension={name:"darken",type:h.BlendMode};class Sn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Sn.extension={name:"difference",type:h.BlendMode};class Tn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Tn.extension={name:"divide",type:h.BlendMode};class Cn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Cn.extension={name:"exclusion",type:h.BlendMode};class wn extends m{constructor(){super({gl:{functions:`
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
                `}})}}wn.extension={name:"hard-light",type:h.BlendMode};class In extends m{constructor(){super({gl:{functions:`
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
            `}})}}In.extension={name:"hard-mix",type:h.BlendMode};class kn extends m{constructor(){super({gl:{functions:`
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
            `}})}}kn.extension={name:"lighten",type:h.BlendMode};class Pn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Pn.extension={name:"linear-burn",type:h.BlendMode};class Bn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Bn.extension={name:"linear-dodge",type:h.BlendMode};class On extends m{constructor(){super({gl:{functions:`
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
            `}})}}On.extension={name:"linear-light",type:h.BlendMode};class Dn extends m{constructor(){super({gl:{functions:`
                ${it}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${st}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Dn.extension={name:"luminosity",type:h.BlendMode};class Fn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Fn.extension={name:"negation",type:h.BlendMode};class Ln extends m{constructor(){super({gl:{functions:`
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
                `}})}}Ln.extension={name:"overlay",type:h.BlendMode};class Mn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Mn.extension={name:"pin-light",type:h.BlendMode};class An extends m{constructor(){super({gl:{functions:`
                ${it}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${st}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}An.extension={name:"saturation",type:h.BlendMode};class zn extends m{constructor(){super({gl:{functions:`
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
                `}})}}zn.extension={name:"soft-light",type:h.BlendMode};class _n extends m{constructor(){super({gl:{functions:`
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
                `}})}}_n.extension={name:"subtract",type:h.BlendMode};class Rn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Rn.extension={name:"vivid-light",type:h.BlendMode};const q=14,Xr=2,Gr=Math.cos(30*(Math.PI/180)),qr=40;class Jr{constructor(t){this.renderContext=t;const{inputDirectionMode:n,general:{colourised:o}}=t;this.arrowSprites={away:y({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:q,y:-14,filter:P}),right:y({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:q,y:q,filter:P}),towards:y({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:q,filter:P}),left:y({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:P}),...n!=="4-way"?{awayRight:y({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:q*Math.SQRT2,filter:P}),towardsRight:y({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:q*Math.SQRT2,filter:P}),towardsLeft:y({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:P}),awayLeft:y({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:P})}:{}},this.output.addChild(this.#n),this.output.addChild(new mn().circle(0,0,qr).fill("#00000000"));for(const r of D(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#n.filters=o?De:ke}output=new w({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#n=y({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#t;handlePointerEnter=t=>{this.#t!==void 0&&this.stopCurrentPointer(),this.#t=t.pointerId,this.usePointerLocation(t)};stopCurrentPointer=()=>{this.#t=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=p};usePointerLocation=t=>{if(t.pointerId!==this.#t)return;const n=bo(v.getState()),{x:o,y:r}=this.output,{x:i,y:s}=t,{width:a,height:c}=this.output.getLocalBounds(),l=(i/n-o)/(a/2),f=(s/n-r)/(c/2),u=po({x:-l,y:-f}),d=ho(u,Gr),b=x(d,Xr);this.renderContext.inputStateTracker.hudInputState.directionVector=b};tick(){const{renderContext:{inputStateTracker:{directionVector:t}}}=this;if(v.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=de(t)>mo?go(t):void 0;for(const[r,i]of Gt(this.arrowSprites))i.filters=r===o?kr:P}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Ze={colourised:{jump:C.pastelBlue,fire:C.highlightBeige,carry:C.moss,carryAndJump:C.midRed,menu:C.lightGrey,map:C.lightGrey},zx:{jump:G.zxBlue,fire:G.zxYellow,carry:G.zxGreen,carryAndJump:G.zxRed,menu:G.zxWhite,map:G.zxWhite}},Fe=Symbol(),Un=Symbol(),Nn=Symbol(),ye=({colourised:e,button:{which:t}})=>{const n=new w({label:"depress"}),o=new w({label:"arcadeButton"});o.addChild(n);const r=y("button");e?r.filters=Pr(Ze.colourised[t]):o.filters=new Br(Ze.zx[t]),n.addChild(r);const i=new w({label:"surface"}),s=y({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Un]=r,o[Fe]=i,o[Nn]=n,o},re=(e,...t)=>{e[Fe].removeChildren();for(const n of t)n!==void 0&&e[Fe].addChild(n)},xe=(e,t)=>{e[Un].texture=qe().textures[t?"button.pressed":"button"],e[Nn].y=t?1:0},Pt=(e,t,n)=>{n&&(e[Fe].filters=t?Fr():De)},Bt=({which:e},t,n)=>{const o=A(new w,n);return o.filters=new Or({white:t?Dr(Ze.colourised[e]):C.pureBlack}),o},En=(e,t,n)=>{const o=Lr(e);if(!n.room)return;const r=o({renderContext:{general:t.general,item:e,room:n.room},tickContext:{lastRenderRoomTime:qt,movedItems:We,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output};function Vn({room:{roomTime:e},movingItem:t}){t.state.action!=="death"&&(Mr(t)||Pe(t)||(t.state.action="death",t.state.expires=e+Cr))}const z=(e,t)=>e==="infinite"||t==="infinite"?"infinite":e+t,le=e=>e==="infinite"?Number.POSITIVE_INFINITY:e,$r=3e3,jn=e=>{const{gameState:t,movingItem:n,touchedItem:o,room:r}=e,{id:i,config:s}=o,{id:a,roomJson:{items:c},roomTime:l}=r,{pickupsCollected:f}=t;if(f[a]?.[i]===!0)return;c[i]&&(f[a]===void 0&&(f[a]={}),f[a][i]=!0);const u=(d,b=r)=>{const g=Jt(o),T={type:"floatingText",id:`floatingText-${i}`,...$t,fixedZIndex:To,aabb:p,state:{...Ke(),position:L(g,{z:S.h/2}),expires:l+$r},config:{textLines:d,appearanceRoomTime:l}};U({room:b,item:T})};switch(s.gives){case"hooter":{const d=Ie(n);d!==void 0&&(d.hasHooter=!0),u(["hooter","collected"]);break}case"doughnuts":{const d=Ie(n);d!==void 0&&(d.doughnuts=z(d.doughnuts,6)),u(["+6","doughnuts"]);break}case"bag":{const d=Oe(n);d!==void 0&&(d.hasBag=!0),u(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,u(["🛡","shield"]);break}case"fast":{const d=Ie(n);d!==void 0&&(d.fastStepsStartedAtDistance=d.gameWalkDistance),u(["⚡","fast steps"]);break}case"jumps":{const d=Oe(n);d!==void 0&&(d.bigJumps+=10),u(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=z(n.state.head.lives,2),n.state.heels.lives=z(n.state.heels.lives,2),u(["+2","lives","each"])):(n.state.lives=z(n.state.lives,2),u(["+2","lives"]));break;case"scroll":v.dispatch(So(s.page));break;case"reincarnation":{const d=yo(t,v.getState(),i),b=_(d.gameState);if(!b)throw new Error("how are we saving from a pickup if there is no current room?");u(["reincarnation","point","restored"],b),v.dispatch(xo(d)),u(["reincarnation","point","saved"]);break}case"crown":{v.dispatch(vo(s.planet)),u([s.planet,"liberated!"]);break}}},Yr=({gameState:e,movingItem:t,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Yt(i,o)<=0||t.state.action!=="death"&&fn({playableItem:t,gameState:e,toRoomId:r,sourceItem:n,changeType:"portal"})},Zr=({movingItem:e,movementVector:t,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Co(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0};e.state.position=L(e.state.position,s)};function Qr({movingItem:e}){e.state.autoWalk=!1}const O=(e,...t)=>F(...t)(e.touchedItem),ie=(e,...t)=>F(...t)(e.movingItem),Hn=e=>k(e.movingItem),Wr=e=>k(e.touchedItem),Kr=e=>Zt(e.touchedItem),Ot=e=>{switch(!0){case O(e,"stopAutowalk"):Qr(e);break;case Kr(e):Vn(e);break;case O(e,"portal"):Yr(e);break;case O(e,"pickup"):jn(e);break;case O(e,"doorFrame"):Zr(e);break}},at=(e,t)=>{const{head:n,heels:o,headOverHeels:r}=Le(t.items);if(r!==void 0)return Pe(r)?void 0:r;const i=n===void 0||Pe(n)||n.state.action==="death"?void 0:ft(n.state.position,e),s=o===void 0||Pe(o)||o.state.action==="death"?void 0:ft(o.state.position,e);return i===void 0?o:s===void 0||i<s?n:o},lt=e=>e[Math.floor(Math.random()*e.length)],Dt=(e,t,n)=>{switch(n){case"opposite":return{x:t.x===0?e.x:-e.x,y:t.y===0?e.y:-e.y,z:0};case"clockwise":return{x:-e.y,y:e.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const o=lt([-1,1]);return{x:t.x===0?o*e.y:0,y:t.y===0?o*e.x:0,z:0}}}},Xn=150,R=Object.freeze({movementType:"vel",vels:{walking:p}}),_e=e=>Qt(e)?j[e.config.which]:j[e.type],Ft=S.w/2,ei=({state:{position:e,vels:{walking:t}}},n,o,r)=>{const i=j.homingBot;if(!fe(t,Ae))return{movementType:"steady"};for(const s of D(Le(n.items))){if(s===void 0)continue;const a=Me(s.state.position,e);if(Math.abs(a.y)<Ft)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Ft)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ti=(e,t,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=e;if(i===null)return R;const c=at(r,t);if(c===void 0)return B;if(s+Xn>t.roomTime)return B;const l=Me(c?.state.position,r),f=Math.abs(l.x)<Math.abs(l.y)?"x":"y",u=Math.abs(l[f])>S.w/4?f:Io(f),d=_e(e),b={...p,[u]:l[u]>0?d:-d},g=H(b),T=!fe(g,a);return{movementType:"vel",vels:{walking:b},stateDelta:{facing:g,...T?{timeOfLastDirectionChange:t.roomTime}:W}}},Lt=(e,t,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=e;if(s===null)return R;const a=at(i,t);if(a===void 0)return R;const c=a.state.position,l=S.w*3;if(!(i.x>c.x-l&&i.x<c.x+l&&i.y>c.y-l&&i.y<c.y+l))return R;const u=Me(a?.state.position,i),d=_e(e),b=(1+Math.sqrt(2))/2,g=d*b,T=x({...u,z:0},g/Wt(u)*(r?-1:1));return{movementType:"vel",vels:{walking:T},stateDelta:{facing:H(T)}}},Xe=(e,t,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=e;if(s===null)return R;if(!(ee(i,p)||Math.random()<o/1e3))return B;const c=lt(r),l=Je[c];return{movementType:"vel",vels:{walking:x(l,_e(e))},stateDelta:{facing:Je[c]}}},ni=(e,t,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=e;return s===null?R:fe(i,Ae)?{movementType:"vel",vels:{walking:x(r,_e(e))}}:B},Se=({movingItem:e,touchedItem:{state:{position:t},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:c},aabb:l}=e;if(!a||(e.state.durationOfTouch+=o,e.state.durationOfTouch<Xn))return;const f=ze(i,l,t,n);if(f.x===0&&f.y===0)return;const u=Dt(s,f,r);e.state.vels.walking=u;const d=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;e.state.facing=x(fe(u,Ae)?Dt(c,f,r):H(u),d),e.state.durationOfTouch=0},oi=({movingItem:e,movementVector:t})=>{t.z<0||(e.state.vels.walking=p)},ri=(e,t,n,o)=>{if(!e.state.activated||Qt(e)&&e.state.busyLickingDoughnutsOffFace)return R;switch(e.config.movement){case"patrol-randomly-diagonal":return Xe(e,t,n,o,Bo);case"patrol-randomly-xy8":return Xe(e,t,n,o,Po);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return Xe(e,t,n,o,ko);case"towards-tripped-on-axis-xy4":return ei(e,t);case"towards-on-shortest-axis-xy4":return ti(e,t);case"back-forth":case"clockwise":return ni(e);case"unmoving":return R;case"towards-analogue":return Lt(e,t);case"towards-analogue-unless-planet-crowns":return Lt(e,t,n,o,wo(v.getState()));default:throw e.config,new Error("this should be unreachable")}},ii=e=>{const{movingItem:t,touchedItem:n}=e;if(K(n,t))switch(t.config.movement){case"patrol-randomly-xy4":Se(e,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Se(e,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Se(e,"opposite");break;case"clockwise":Se(e,"clockwise");break;case"towards-tripped-on-axis-xy4":oi(e);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw t.config,new Error("this should be unreachable")}},si=({touchedItem:e,gameState:{progression:t},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=e;if(e.state.touchedOnProgression=t,!(t===i+1||t===i))switch(o.type){case"in-room":{const s=e.state.setting=r==="left"?"right":"left";ai(o,s,n.items,n.roomTime);break}case"in-store":{v.dispatch(Oo(o.path));break}}},ai=(e,t,n,o)=>{for(const r of e.modifies)for(const[i,s]of Do(r.newState))if(Object.hasOwn(s,t))for(const a of r.targets){const c=n[a];if(c===void 0)continue;if(c.type!==r.expectType)throw new Error(`item "${c.id}" is of type "${c.type}" - does not match expected type "${r.expectType}" from switch config ${JSON.stringify(e,null,2)}`);const l=c;l.state={...c.state,[i]:s[t],switchedAtRoomTime:o,switchedSetting:t}}},li=({movingItem:e,touchedItem:t})=>{if(!K(e))return;const{state:{position:n},aabb:o}=t,r=ze(e.state.position,e.aabb,n,o);if(r.x===0&&r.y===0)return;const i=H(r),s=x(i,-.05);return t.state.vels.sliding=s,!1},ci=({movingItem:e,touchedItem:t})=>{if(!K(t))return;const n=e.state.vels.sliding;if(ee(n,p))return;const{state:{position:o},aabb:r}=e,i=ze(t.state.position,t.aabb,o,r);return Yt(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=p),!1},ui=({movingItem:e,room:t,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:c}=n,l=ze(e.state.position,e.aabb,a,c);if(l.x===0&&l.y===0)return;const f=H(l);for(const u of s){const d=t.items[u],b=x(f,-.025*o);d.state.facing=b,ot({room:t,subjectItem:d,gameState:r,pusher:n,posDelta:b,deltaMS:o,onTouch:i})}},di=1e3/12,Te=e=>{const t=e-Ao,o=t/zo*Kt;return(t+.5*$e*o**2)/o},fi={head:Te(me.head),headOnSpring:Te(me.head+S.h),heels:Te(me.heels),heelsOnSpring:Te(me.heels+S.h)},Mt=(e,t,n)=>{const o=e.type==="headOverHeels"||e.type==="heels"&&n?"head":e.type;return fi[`${o}${t?"OnSpring":""}`]},bi=e=>!(e===null||Lo(e)&&pn(e)||Mo(e)&&e.config.gives==="scroll"||k(e)&&e.state.standingOnItemId===null),pi=e=>e.state.jumped&&e.state.position.z===e.state.jumpStartZ&&e.state.jumpStartTime+di>(e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime),Gn=(e,t,n)=>{const{state:{standingOnItemId:o}}=e,{inputStateTracker:r}=n,i=te(o,t);if(pi(e))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Mt(e,!1,e.type==="heels"&&e.state.isBigJump)}},stateDelta:{}};if(!(e.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&bi(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...e.type==="heels"?{isBigJump:!1}:{}}}:B;const a=e.type==="heels"&&e.state.bigJumps>0,c=Fo(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Mt(e,c,a)}},stateDelta:{action:"moving",jumped:!0,...e.type==="heels"?a?{bigJumps:e.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:e.state.position.z,jumpStartTime:e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime}}},hi=({vel:e,acc:t,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=de(e),a=Math.max(i,Math.min(o,s+t*r)),c=Math.min(a,o);return x(n,c)},mi={movementType:"vel",vels:{walking:p}},qn=(e,t,n,o)=>{const r=gi(e,t,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=de(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:e.state.walkDistance+i*o},e.type==="head"&&e.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:e.state.gameWalkDistance+i*o})}return e.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ee(r.vels.walking,p)&&(r.stateDelta={...r.stateDelta,walkStartFacing:e.state.facing}),r},gi=(e,t,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:c,facing:l,teleporting:f,walkDistance:u,walkStartFacing:d,vels:{walking:b,gravity:g}}}=e,T=o===e.id,M=T?n.currentActionPress("jump"):"released",ut=T?n.directionVector:p,I=c===null&&g.z<0,co=i==="head"&&rt(e.state)>0&&c!==null,dt=i==="headOverHeels"?I?"head":"heels":co?"heels":i,N=a?l:ut,Ne=j[dt];if(f!==null||s==="death")return mi;if(i==="heels"){if(c===null)return e.state.jumped?{movementType:"vel",vels:{walking:et(b,x(b,_o*r))},stateDelta:{action:I?"falling":"jumping"}}:{movementType:"vel",vels:{walking:p},stateDelta:{action:"falling"}};if(M!=="released"){const he=H(fe(N,Ae)?l:N),uo=F("spring")(te(c,t))?1:Ro;return{movementType:"vel",vels:{walking:x({...he,z:0},Ne*uo)},stateDelta:{facing:he}}}}if(de(N)!==0)return I?{movementType:"vel",vels:{walking:x({...N,z:0},Ne)},stateDelta:{facing:N,action:"falling"}}:{movementType:"vel",vels:{walking:hi({vel:b,acc:Uo[dt],deltaMS:r,maxSpeed:Ne,unitD:N,minSpeed:0})},stateDelta:{facing:N,action:"moving"}};if(u>0&&u<1){const he=ee(d,l)?1:0;return{movementType:"position",posDelta:x(l,he-u),stateDelta:{action:I?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:p},stateDelta:{action:I?"falling":"idle"}}},At=e=>X(e.movingItem)&&en(e.movingItem,e.touchedItem,Math.abs(e.movementVector.z)),Jn=(e,t)=>{let n=p;for(const o of t){if(o.movementType==="position"&&(n=L(n,o.posDelta)),o.movementType==="vel"&&(X(e)||F("lift")(e)))for(const[i,s]of Gt(o.vels)){const a={...p,...s};e.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(e.state={...e.state,...r})}return n},zt=e=>{if(e.touchedItem.type==="firedDoughnut"&&(e.movingItem.type==="head"||e.movingItem.type==="firedDoughnut"))return;if(e.touchedItem.state.disappear==="onTouch"||e.touchedItem.state.disappear==="onTouchByPlayer"&&k(e.movingItem)||e.touchedItem.state.disappear==="onStand"&&At(e)){if(At(e)&&Hn(e)){tn({above:e.movingItem,below:e.touchedItem});const n=[Gn(e.movingItem,e.room,e.gameState,e.deltaMS),qn(e.movingItem,e.room,e.gameState,e.deltaMS)];Jn(e.movingItem,n)}bn(e)}};function vi(e){const t=e.movingItem.type==="monster"?e.movingItem:e.touchedItem;t.config.which!=="emperorsGuardian"&&(t.state.busyLickingDoughnutsOffFace=!0)}const ct=e=>{Hn(e)&&Ot(e),Wr(e)&&Ot({...e,movingItem:e.touchedItem,touchedItem:e.movingItem}),O(e,...bt)&&li(e),ie(e,...bt)&&ci(e),(ie(e,"monster")&&O(e,"firedDoughnut")||ie(e,"firedDoughnut")&&O(e,"monster"))&&vi(e),(ie(e,"monster")||ie(e,"movingPlatform"))&&ii(e),O(e,"switch")&&si(e),O(e,"joystick")&&ui(e,ct),e.touchedItem.state.disappear&&zt(e),e.movingItem.state.disappear&&K(e.touchedItem,e.movingItem)&&zt({...e,movingItem:e.touchedItem,touchedItem:e.movingItem})},yi=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="heels"?e.state:e.state.heels,{carrying:s,hasBag:a}=i,{state:{position:c}}=e;if(!a)return;const l=be(t.items).filter(on),f=s===null?$n(e,t):void 0;for(const b of l)b.state.wouldPickUpNext=!1;f!==void 0&&(f.state.wouldPickUpNext=!0);const u=r.currentActionPress("carry");if(u==="tap"||r.currentActionPress("jump")==="hold"&&u==="hold")if(s===null){if(f===void 0)return;xi(t,i,f),r.actionsHandled.add("carry")}else{if(e.state.standingOnItemId===null||!Yn(e,rn(t.items)))return;s.state.position=c,U({room:t,item:s}),ot({subjectItem:e,gameState:n,room:t,posDelta:{x:0,y:0,z:s.aabb.z},pusher:e,forceful:!0,deltaMS:o,onTouch:ct}),i.carrying=null,r.actionsHandled.add("carry")}},xi=(e,t,n)=>{t.carrying=n,n.state.wouldPickUpNext=!1,sn({room:e,item:n})},$n=(e,t)=>nn(e,be(t.items).filter(on)),Yn=(e,t)=>{const n={position:L(e.state.position,{z:S.h})},o=No({id:e.id,aabb:e.aabb,state:n},t);for(const r of o)if(K(r,e)){if(!X(r))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with non-free",r),!1;if(!Yn(r,t))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Ge=-11,Si={jump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,c=r?.state.standingOnItemId??null,l=c===null||o===void 0?null:o.items[c],f=l===null?!1:l.type==="teleporter"&&pn(l),u=e.actions.every(b=>t.currentActionPress(b)!=="released"),d=a===void 0?ye({colourised:n,button:e}):a;if(s?.pressed!==u&&xe(d,u),f!==s?.standingOnTeleporter)if(f)re(d,y({textureId:"teleporter",y:5}),y({animationId:"teleporter.flashing",y:5}));else{const b=Bt(e,n,"JUMP");b.y=Ge,re(d,b)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:f,colourised:n}}},carry({renderContext:e,currentRendering:t,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=e,{currentPlayable:s,room:a}=n,c=t?.renderProps,l=t?.output,f=s&&Oe(s),u=f?.hasBag??!1,d=f?.carrying??null,b=d===null&&a!==void 0&&$n(s,a)!==void 0,g=o.actions.every(I=>r.currentActionPress(I)!=="released"),T=u&&!b&&d===null,M=l===void 0?ye({colourised:i,button:o}):l;if(M.visible=u,u&&(T!==c?.disabled&&Pt(M,T,i),M.visible=!0,c?.pressed!==g&&xe(M,g),u!==c?.hasBag||d!==c?.carrying)){let I;d!==null?I=En(d,e,n):u&&(I=y({textureId:"bag",y:-2})),re(M,I)}return{output:M,renderProps:{pressed:g,hasBag:u,colourised:i,carrying:d,disabled:T}}},fire({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&Ie(r),c=a?.hasHooter??!1,l=a?.doughnuts??0,f=e.actions.every(b=>t.currentActionPress(b)!=="released"),u=s===void 0?ye({colourised:n,button:e}):s,d=c||le(l)>0;if(u.visible=d,d&&(i?.pressed!==f&&xe(u,f),c!==i?.hasHooter||l!==i?.doughnuts)){let b;c?b=y({textureId:"hooter",y:-3}):le(l)>0&&(b=y({textureId:"doughnuts",y:-2}));const g=A(new w,l);g.y=Ge,g.filters=hn,re(u,b,g),Pt(u,l===0,n)}return{output:u,renderProps:{pressed:f,colourised:n,doughnuts:l,hasHooter:c}}},carryAndJump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,c=(r&&Oe(r))?.hasBag??!1,l=e.actions.every(d=>t.currentActionPress(d)!=="released");if(!(i===void 0||l!==i.pressed||n!==i.colourised||c!==i.hasBag))return"no-update";let u;if(s===void 0){u=ye({colourised:n,button:e});const d=Bt(e,n,"C+J");d.y=Ge,re(u,d)}else u=s;return c?(u.visible=!0,i?.pressed!==l&&xe(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:c,colourised:n}}},menu({currentRendering:e}){if(e!==void 0)return"no-update";const t=y("hud.char.Menu");return t.scale=2,t.filters=P,{output:t,renderProps:W}},map({currentRendering:e}){if(e!==void 0)return"no-update";const t=ae({label:"mapText",outline:!0});return A(t,"MAP"),{output:t,renderProps:W}}};class J extends Ar{constructor(t){const n=Si[t.button.which];super(t,n)}}const Ti=30,Ci=15,wi=42,Ii=36,ki=44,Pi=20;class Bi{constructor(t){this.renderContext=t;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=t;this.#t={mainButtonNest:new w({label:"mainButtonNest"}),buttons:{jump:new J({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new J({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new J({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new J({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new J({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new J({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new Jr({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#t,{mainButtonNest:s,joystick:a}=this.#t;for(const{renderContext:{button:{which:c}},output:l}of D(i))c==="menu"||c==="map"?this.#n.addChild(l):s.addChild(l);i.jump.output.y=Ci,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=Ti,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#n.addChild(s),this.#n.addChild(a.output),this.#e()}#n=new w({label:"OnScreenControls"});#t;#e(){const{renderContext:{general:{gameState:{inputStateTracker:t}}}}=this;for(const n of D(this.#t.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)t.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)t.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)t.hudInputState[r]=!1})}}#o(t){this.#t.mainButtonNest.x=t.x-ki,this.#t.mainButtonNest.y=t.y-Pi,this.#t.joystick.output.x=wi,this.#t.joystick.output.y=t.y-Ii,this.#t.buttons.map.output.x=t.x-4*8}tick(t){const{screenSize:n}=t,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of D(this.#t.buttons))r.tick({...t,currentPlayable:ne(o)});this.#t.joystick.tick()}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t.joystick.destroy()}}Ye.frames.button.frame;const Oi=250,Di=e=>e?48:24,Fi=e=>e?68:56,Li=(e,t)=>e?t.x/2-24:80,Mi=e=>e?72:24,Ai=e=>e?88:0,_t=112,se=e=>e==="heels"?1:-1;class zi{constructor(t){this.renderContext=t;const{onScreenControls:n}=t;for(const o of Ee)this.#n.addChild(this.#e[o].sprite),this.#n.addChild(this.#e[o].livesText),this.#n.addChild(this.#e[o].shield.container),this.#n.addChild(this.#e[o].extraSkill.container);n||(this.#n.addChild(this.#e.head.doughnuts.container),this.#n.addChild(this.#e.head.hooter.container),this.#n.addChild(this.#e.heels.bag.container),this.#n.addChild(this.#e.heels.carrying.container)),this.#n.addChild(this.#e.fps),this.#e.fps.filters=[Ct],this.#e.fps.y=Ve.h,this.#o(),n&&(this.#t=new Bi({general:t.general,inputDirectionMode:t.inputDirectionMode}),this.#n.addChild(this.#t.output))}#n=new w({label:"HudRenderer"});#t=void 0;#e={head:{sprite:this.#s("head"),livesText:ae({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#s("heels"),livesText:ae({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new w({label:"heelsCarrying"})}},fps:ae({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:t}}}}}=this;for(const n of Ee){const{sprite:o,livesText:r}=this.#e[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{t[`swop.${n}`]=!0}),i.on("pointerup",()=>{t[`swop.${n}`]=!1}),i.on("pointerleave",()=>{t[`swop.${n}`]=!1})}}#r({textureId:t,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new w({label:i});s.pivot={x:4,y:16};const a=new pt({texture:qe().textures[t],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:wt,y:n?0:8});s.addChild(a);const c=ae({outline:r==="text-only"});return c.y=n?0:16,c.x=a.x=Ve.w/2,s.addChild(c),o&&(c.visible=!1),r===!0&&(s.filters=hn),{text:c,icon:a,container:s}}#s(t){const n=new pt(qe().textures[`${t}.walking.${t==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:t}){this.#e.head.hooter.container.x=this.#e.head.doughnuts.container.x=(t.x>>1)+se("head")*_t,this.#e.head.doughnuts.container.y=t.y-je.h-8,this.#e.heels.carrying.container.y=t.y-je.h,this.#e.heels.carrying.container.x=this.#e.heels.bag.container.x=(t.x>>1)+se("heels")*_t,this.#e.heels.bag.container.y=this.#e.head.hooter.container.y=t.y-8,this.#e.fps.x=t.x-Ve.w*2}#a(t,n){return t?n?De:He:n?It:ke}#l(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ge(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#e.heels.carrying,c=a.children.length>0;if(s===null&&c)for(const l of a.children)l.destroy();if(s!==null&&!c){const l=En(s,this.renderContext,t);l!==void 0&&a.addChild(l)}a.filters=this.#a(!0,o),this.#e.heels.bag.icon.filters=this.#a(i,o)}#d(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ge(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#e.head.hooter.icon.filters=this.#a(i,o),this.#e.head.doughnuts.icon.filters=this.#a(s!==0,o),A(this.#e.head.doughnuts.text,s)}#f(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=ge(r,t),{text:s,container:a}=this.#e[t].shield,{text:c,container:l}=this.#e[t].extraSkill,f=zr(i),u=f>0||!o;a.visible=u,u&&(A(s,f),a.y=n.y-Ai(o)),l.x=a.x=(n.x>>1)+se(t)*Li(o,n);const d=i===void 0?0:t==="head"?rt(i):i.bigJumps,b=d>0||!o;l.visible=b,b&&(A(c,d),l.y=n.y-Mi(o))}#c(t,n){const{currentCharacterName:o}=t;return o===n||o==="headOverHeels"}#b(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#c(r,t),a=this.#e[t].sprite;s?a.filters=i?De:He:a.filters=i?It:ke,a.x=(n.x>>1)+se(t)*Fi(o),a.y=n.y-je.h}#p(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=ge(r,t)?.lives??0,a=this.#e[t].livesText;a.x=(n.x>>1)+se(t)*Di(o),a.y=n.y,A(a,s??0)}#h(t){const{room:n}=t;if(n===void 0)return;const o=_r(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;ke.targetColor=o.hud.dimmed[r?"dimmed":"original"],Rr.targetColor=o.hud.dimmed[r?"basic":"original"],wt.targetColor=o.hud.icons[r?"basic":"original"],He.targetColor=o.hud.lives.original,this.#e.head.livesText.filters=r?ve.colourised.head[this.#c(i,"head")?"active":"inactive"]:ve.original,this.#e.heels.livesText.filters=r?ve.colourised.heels[this.#c(i,"heels")?"active":"inactive"]:ve.original}#u=qt;#m(){if(Eo(v.getState())){if(performance.now()>this.#u+Oi){const t=Vo.shared.FPS;A(this.#e.fps,Math.round(t)),Ct.targetColor=t>100?C.white:t>58?C.moss:t>55?C.pastelBlue:t>50?C.metallicBlue:t>40?C.pink:C.midRed,this.#u=performance.now()}this.#e.fps.visible=!0}else this.#e.fps.visible=!1}tick(t){this.#h(t);for(const n of Ee)this.#p(n,t),this.#b(n,t),this.#f(n,t);this.#i(t),this.#d(t),this.#l(t),this.#m(),this.#t?.tick(t)}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t?.destroy()}}const Rt={movementType:"vel",vels:{gravity:p}},_i=(e,t,n,o)=>{if(!K(e))return Rt;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=e,c=jo[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const l=te(s,t);return F("lift")(l)&&l.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-$e*o,-c)}}}:Rt}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-$e*o,-c)}}}},Ut=S.h,Nt=.001,Ri=({totalDistance:e,currentAltitude:t,direction:n})=>{const o=ht**2/(2*oe);if(n==="up"){if(t<=o)return Math.max(Nt,Math.sqrt(2*oe*Math.max(t,0)));if(t>=e-o){const r=Math.max(0,e-t);return Math.max(Nt,Math.sqrt(2*oe*r))}else return ht}else if(t>=e-o){const r=Math.max(0,e-t);return Math.min(-.001,-Math.sqrt(2*oe*r))}else return t<=o?Math.min(-.001,-Math.sqrt(2*oe*Math.max(t,0))):-.036},Ui=({config:{bottom:e,top:t},state:{direction:n,position:{z:o}}})=>{const r=e*Ut,i=t*Ut,s=Ri({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Et={movementType:"vel",vels:{movingFloor:p}},Ni=(e,t,n,o)=>{if(k(e)&&e.state.teleporting!==null)return Et;const{state:{standingOnItemId:r}}=e,i=te(r,t);if(i===null||!F("conveyor")(i))return Et;const{config:{direction:s}}=i,c=F("heels")(e)&&e.state.action==="moving"&&Ho(e.state.facing)===Xo(s)?j.heels:Go;return{movementType:"vel",vels:{movingFloor:x(Je[s],c)}}};function*Ei(e,t,n,o){for(;(e.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<t.roomTime;){const{positionDelta:r}=e.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Vi=S.w*.8,ji=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="head"?e.state:e.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:c,facing:l}}=e,f=H(l);if(r.currentActionPress("fire")==="tap"&&a&&le(s)>0){const u={type:"firedDoughnut",...$t,config:W,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...Ke(),position:L(c,x(f,Vi),e.type==="headOverHeels"?{z:S.h}:p),vels:{fired:x(f,j.firedDoughnut)},disappear:"onTouch"}};U({room:t,item:u}),i.doughnuts=z(i.doughnuts,-1),r.actionsHandled.add("fire")}},Zn=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Hi=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Ce=S.w*3,Xi=(e,t)=>{const{state:{position:n}}=e,{state:{position:o}}=t;return n.x>o.x-Ce&&n.x<o.x+Ce&&n.y>o.y-Ce&&n.y<o.y+Ce},Vt=(e,t,n,o,r)=>{if(r&&e.state.activated)return B;const i=at(e.state.position,t);return i===void 0?B:Xi(e,i)?Zn:Hi},Gi=(e,t,n,o)=>e.state.activated?B:tt(e.state.stoodOnBy,t).some(k)?Zn:B,qi=(e,t,n,o)=>{switch(e.config.activated){case"after-player-near":return Vt(e,t,n,o,!0);case"while-player-near":return Vt(e,t,n,o,!1);case"on-stand":return Gi(e,t);case"off":case"on":return B;default:throw e.config,new Error(`unrecognised item.config.activation ${e.config.activated} in ${e.id}:
        ${JSON.stringify(e,null,2)}`)}},Ji=(e,t,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:c,period:l,maximum:f}}=e,{roomTime:u}=t;if(s!==f&&i+l<u){const d=qo(Jo(`${r}-${s}`,{...c,position:p},t.roomJson));if(d===void 0)throw new Error("emitter failed to create a new item");d.state.position=et(a,x(d.aabb,.5)),U({room:t,item:d}),e.state.lastEmittedAtRoomTime=t.roomTime+l,e.state.quantityEmitted++}},jt=Kt*Ye.animations["particle.fade"].length*(1/Ye.animations["particle.fade"].animationSpeed),$i=20,Yi=38,Zi=.5,we=S.w/2;let Qi=0;const Qn=(e,t)=>Math.random()<e*(t/1e3),Wn=(e,t,n,o)=>({id:`particle.${e}.${Qi++}`,type:"particle",aabb:p,config:{forCharacter:t},state:{...Ke(),expires:o+jt+Math.random()*jt,position:n}}),Kn=(e,t,n,o)=>{if(!Qn(n,o))return;const r={...L(Jt(e),{x:Math.random()*we-we/2,y:Math.random()*we-we/2}),z:e.state.position.z};U({room:t,item:Wn(e.id,e.type,r,t.roomTime)})},Wi=(e,t,n)=>{!(rt(e.state)>0)||e.state.standingOnItemId===null||de(e.state.vels.walking)<Yo||Kn(e,t,$i,n)},Ki=(e,t,n)=>{const{isBigJump:o}=e.state;o&&e.state.standingOnItemId===null&&(e.state.vels.gravity.z<=0||Kn(e,t,Yi,n))},es=(e,t)=>{const{head:n,heels:o}=Le(e.items);n!==void 0&&Wi(n,e,t),o!==void 0&&Ki(o,e,t)},ts=(e,t,n)=>{if(!Qn(Zi,n))return;const o=lt($o),r=L(t.state.position,{x:o==="x"?0:Math.random()*S.w,y:o==="y"?0:Math.random()*S.d,z:o==="z"?S.h:Math.random()*S.h});U({room:e,item:Wn(t.id,"crown",r,e.roomTime)})};function*ns(e,t,n,o){X(e)&&(yield _i(e,t,n,o),yield Ni(e,t),yield*Ei(e,t)),k(e)?(yield qn(e,t,n,o),e.id===n.currentCharacterName&&(yield Ur(e,t,n,o),yield Gn(e,t,n),Qo(e)&&yi(e,t,n,o),Wo(e)&&ji(e,t,n))):Ko(e)?yield Ui(e):er(e)?(yield qi(e,t,n,o),yield ri(e,t,n,o)):tr(e)&&Ji(e,t)}const os=(e,t,n,o)=>{if(!X(e)||e.state.standingOnItemId===null)return;const r=te(e.state.standingOnItemId,t);k(e)&&r.type==="pickup"&&jn({gameState:n,movingItem:e,touchedItem:r,room:t}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||k(e)&&r.state.disappear==="onTouchByPlayer")&&bn({touchedItem:r,gameState:n,room:t})},rs=(e,t,n,o)=>{if(k(e)&&e.state.standingOnItemId!==null){const s=te(e.state.standingOnItemId,t);(Zt(s)||s.type==="spikes")&&Vn({room:t,movingItem:e})}const r=[...ns(e,t,n,o)];os(e,t,n);let i=Jn(e,r);(X(e)||F("lift")(e)||F("firedDoughnut")(e))&&(i=L(i,...nt(D(e.state.vels)).map(s=>x(s,o)))),Zo(e)&&ts(t,e,o),ot({subjectItem:e,posDelta:i,gameState:n,room:t,deltaMS:o,onTouch:ct})},is=(e,t)=>{const n=e.characterRooms.headOverHeels;if(t.state.head.lives=z(t.state.head.lives,-1),t.state.heels.lives=z(t.state.heels.lives,-1),t.state.head.lastDiedAt=t.state.head.gameTime,t.state.heels.lastDiedAt=t.state.heels.gameTime,z(t.state.head.lives,t.state.heels.lives)===0)return;const r=le(t.state.head.lives)>0,i=le(t.state.heels.lives)>0;if(t.state.heels.carrying=null,r&&!i||!r&&i){const l=r?"head":"heels";e.currentCharacterName=l,V(e,t);const f=mt(t)[l],u=Q({gameState:e,playableItems:[f],roomId:n.id});e.characterRooms={[l]:u},e.entryState={[l]:gt(f)};return}if(e.entryState.headOverHeels!==void 0){V(e,t);const l=Q({gameState:e,playableItems:[t],roomId:n.id});e.characterRooms={headOverHeels:l};return}else{const{head:l,heels:f}=mt(t);if(V(e,l),V(e,f),or(l,f)){const u=an({head:l,heels:f});V(e,u,"heels");const d=Q({gameState:e,playableItems:[u],roomId:n.id});e.characterRooms={headOverHeels:d},e.entryState={headOverHeels:gt(u)};return}else{const u=Q({gameState:e,playableItems:[l,f],roomId:n.id});e.characterRooms={head:u,heels:u};return}}},Q=({gameState:e,playableItems:t,roomId:n})=>{const{campaign:o}=e,r=rr({roomJson:o.rooms[n],roomPickupsCollected:e.pickupsCollected[n]??W});for(const i of t)U({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&wr(r,e);return r},V=(e,t,n=t.id)=>{const o=e.entryState[n];t.state={...t.state,...o,expires:null,standingOnItemId:null}},ss=(e,t)=>{const n=ln(e,cn(t.type));if(t.state.lives!=="infinite"&&t.state.lives--,t.state.lastDiedAt=t.state.gameTime,t.type==="heels"&&(t.state.carrying=null),t.state.lives===0){delete e.characterRooms[t.id],n!==void 0&&(e.currentCharacterName=n.type);return}else{const o=e.characterRooms[t.type];V(e,t);const r=n===void 0?void 0:e.characterRooms[n.type];if(o===r){if(e.entryState.headOverHeels!==void 0){const a=an({head:t.id==="head"?t:o.items.head,heels:t.id==="heels"?t:o.items.heels});V(e,a);const c=Q({gameState:e,playableItems:[a],roomId:o.id});e.characterRooms={headOverHeels:c},e.currentCharacterName="headOverHeels";return}U({room:o,item:t});return}else{const s=Q({gameState:e,playableItems:[t],roomId:o.id});e.characterRooms[t.id]=s;return}}},as=(e,t)=>{t.type==="headOverHeels"?is(e,t):ss(e,t),ne(e)===void 0&&v.dispatch(nr({offerReincarnation:!0}))},ls=e=>{for(const t of be(e.items))try{for(const n of tt(t.state.stoodOnBy,e)){if(!e.items[n.id]){vt(n,e);continue}if(!en(n,t)){vt(n,e);const o=nn(n,rn(e.items));o!==void 0&&tn({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${t.id}"`,{cause:n})}},cs=2*Ir,us=(e,t,n)=>{e.state.latentMovement.push({moveAtRoomTime:t.roomTime+cs,positionDelta:n})},ds=(e,t,n)=>{for(const o of e){const r=n[o.id];if(r===void 0)continue;const s={...et(o.state.position,r),z:0};if(!ee(s,p))for(const a of tt(o.state.stoodOnBy,t))us(a,t,s)}},fs=(e,t)=>{for(const n of be(e.items))!X(n)||e.roomTime===n.state.actedOnAt.roomTime||ir(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=sr(n.state.position),t.add(n))},bs=(e,t)=>e.state.expires!==null&&e.state.expires<t.roomTime,ps=e=>{for(const t of be(e.items)){const n=t.state.position;t.state.position=ar(n)}},hs=(e,t)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[e.type]??0,r=n[t.type]??0;return o-r},ms=(e,t,n)=>{e.progression++,e.gameTime+=n,t.roomTime+=n;const o=ne(e);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,e.characterRooms.head===e.characterRooms.heels){const i=ln(e,cn(o.type));i!==void 0&&(i.state.gameTime+=n)}}},gs=(e,t)=>{const n=_(e);if(n===void 0)return We;ms(e,n,t);const o=Object.fromEntries(lr(n.items).map(([s,a])=>[s,a.state.position]));for(const s of D(n.items))bs(s,n)&&(sn({room:n,item:s}),k(s)&&as(e,s));const r=Object.values(n.items).sort(hs);for(const s of r){const a=ne(e);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{rs(s,n,e,t)}catch(c){throw console.error(c),new Error(`error caught while ticking item "${s.id}"`,{cause:c})}}es(n,t),ls(n),ps(n);const i=new Set(nt(D(n.items)).filter(s=>o[s.id]===void 0||!ee(s.state.position,o[s.id])));return ds(i,n,o),fs(n,i),i};var Re=`in vec2 aPosition;
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
`,Ue=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

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
}`,vs=`precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec4 uLine;
uniform vec2 uNoise;
uniform vec3 uVignette;
uniform float uSeed;
uniform float uTime;
uniform vec2 uDimensions;

uniform vec4 uInputSize;

const float SQRT_2 = 1.414213;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float vignette(vec3 co, vec2 coord)
{
    float outter = SQRT_2 - uVignette[0] * SQRT_2;
    vec2 dir = vec2(0.5) - coord;
    dir.y *= uDimensions.y / uDimensions.x;
    float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + uVignette[2] * SQRT_2), 0.0, 1.0);
    return darker + (1.0 - darker) * (1.0 - uVignette[1]);
}

float noise(vec2 coord)
{
    vec2 pixelCoord = coord * uInputSize.xy;
    pixelCoord.x = floor(pixelCoord.x / uNoise[1]);
    pixelCoord.y = floor(pixelCoord.y / uNoise[1]);
    return (rand(pixelCoord * uNoise[1] * uSeed) - 0.5) * uNoise[0];
}

vec3 interlaceLines(vec3 co, vec2 coord)
{
    vec3 color = co;

    float curvature = uLine[0];
    float lineWidth = uLine[1];
    float lineContrast = uLine[2];
    float verticalLine = uLine[3];

    vec2 dir = vec2(coord * uInputSize.xy / uDimensions - 0.5);

    float _c = curvature > 0. ? curvature : 1.;
    float k = curvature > 0. ? (length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;
    vec2 uv = dir * k;
    float v = verticalLine > 0.5 ? uv.x * uDimensions.x : uv.y * uDimensions.y;
    v *= min(1.0, 2.0 / lineWidth ) / _c;
    float j = 1. + cos(v * 1.2 - uTime) * 0.5 * lineContrast;
    color *= j;

    float segment = verticalLine > 0.5 ? mod((dir.x + .5) * uDimensions.x, 4.) : mod((dir.y + .5) * uDimensions.y, 4.);
    color *= 0.99 + ceil(segment) * 0.015;

    return color;
}

void main(void)
{
    finalColor = texture(uTexture, vTextureCoord);
    vec2 coord = vTextureCoord * uInputSize.xy / uDimensions;

    if (uNoise[0] > 0.0 && uNoise[1] > 0.0)
    {
        float n = noise(vTextureCoord);
        finalColor += vec4(n, n, n, finalColor.a);
    }

    if (uVignette[0] > 0.)
    {
        float v = vignette(finalColor.rgb, coord);
        finalColor *= vec4(v, v, v, finalColor.a);
    }

    if (uLine[1] > 0.0)
    {
        finalColor = vec4(interlaceLines(finalColor.rgb, vTextureCoord), finalColor.a);  
    }
}
`,ys=`struct CRTUniforms {
    uLine: vec4<f32>,
    uNoise: vec2<f32>,
    uVignette: vec3<f32>,
    uSeed: f32,
    uTime: f32,
    uDimensions: vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> crtUniforms : CRTUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
    
  var color: vec4<f32> = textureSample(uTexture, uSampler, uv);
  let coord: vec2<f32> = uv * gfu.uInputSize.xy / crtUniforms.uDimensions;

  let uNoise = crtUniforms.uNoise;

  if (uNoise[0] > 0.0 && uNoise[1] > 0.0)
  {
    color += vec4<f32>(vec3<f32>(noise(uv)), color.a);
  }

  if (crtUniforms.uVignette[0] > 0.)
  {
    color *= vec4<f32>(vec3<f32>(vignette(color.rgb, coord)), color.a);
  }

  if (crtUniforms.uLine[1] > 0.0)
  {
    color = vec4<f32>(vec3<f32>(interlaceLines(color.rgb, uv)), color.a);  
  }

  return color;
}

const SQRT_2: f32 = 1.414213;

fn modulo(x: f32, y: f32) -> f32
{
  return x - y * floor(x/y);
}

fn rand(co: vec2<f32>) -> f32
{
  return fract(sin(dot(co, vec2<f32>(12.9898, 78.233))) * 43758.5453);
}

fn vignette(co: vec3<f32>, coord: vec2<f32>) -> f32
{
  let uVignette = crtUniforms.uVignette;
  let uDimensions = crtUniforms.uDimensions;
  
  let outter: f32 = SQRT_2 - uVignette[0] * SQRT_2;
  var dir: vec2<f32> = vec2<f32>(0.5) - coord;
  dir.y *= uDimensions.y / uDimensions.x;
  let darker: f32 = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + uVignette[2] * SQRT_2), 0.0, 1.0);
  return darker + (1.0 - darker) * (1.0 - uVignette[1]);
}

fn noise(coord: vec2<f32>) -> f32
{
  let uNoise = crtUniforms.uNoise;
  let uSeed = crtUniforms.uSeed;

  var pixelCoord: vec2<f32> = coord * gfu.uInputSize.xy;
  pixelCoord.x = floor(pixelCoord.x / uNoise[1]);
  pixelCoord.y = floor(pixelCoord.y / uNoise[1]);
  return (rand(pixelCoord * uNoise[1] * uSeed) - 0.5) * uNoise[0];
}

fn interlaceLines(co: vec3<f32>, coord: vec2<f32>) -> vec3<f32>
{
  var color = co;

  let uDimensions = crtUniforms.uDimensions;

  let curvature: f32 = crtUniforms.uLine[0];
  let lineWidth: f32 = crtUniforms.uLine[1];
  let lineContrast: f32 = crtUniforms.uLine[2];
  let verticalLine: f32 = crtUniforms.uLine[3];

  let dir: vec2<f32> = vec2<f32>(coord * gfu.uInputSize.xy / uDimensions - 0.5);

  let _c: f32 = select(1., curvature, curvature > 0.);
  let k: f32 = select(1., (length(dir * dir) * 0.25 * _c * _c + 0.935 * _c), curvature > 0.);
  let uv: vec2<f32> = dir * k;
  let v: f32 = select(uv.y * uDimensions.y, uv.x * uDimensions.x, verticalLine > 0.5) * min(1.0, 2.0 / lineWidth ) / _c;
  let j: f32 = 1. + cos(v * 1.2 - crtUniforms.uTime) * 0.5 * lineContrast;
  color *= j;

  let segment: f32 = select(modulo((dir.y + .5) * uDimensions.y, 4.), modulo((dir.x + .5) * uDimensions.x, 4.), verticalLine > 0.5);
  color *= 0.99 + ceil(segment) * 0.015;

  return color;
}`,xs=Object.defineProperty,Ss=(e,t,n)=>t in e?xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Be=(e,t,n)=>(Ss(e,typeof t!="symbol"?t+"":t,n),n);const eo=class to extends pe{constructor(t){t={...to.DEFAULT_OPTIONS,...t};const n=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:ys,entryPoint:"mainFragment"}}),o=ue.from({vertex:Re,fragment:vs,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:t.seed,type:"f32"},uTime:{value:t.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Be(this,"uniforms"),Be(this,"seed"),Be(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,t)}apply(t,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,t.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(t){this.uniforms.uLine[0]=t}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(t){this.uniforms.uLine[1]=t}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(t){this.uniforms.uLine[2]=t}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(t){this.uniforms.uLine[3]=t?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(t){this.uniforms.uNoise[0]=t}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(t){this.uniforms.uNoise[1]=t}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(t){this.uniforms.uVignette[0]=t}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(t){this.uniforms.uVignette[1]=t}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(t){this.uniforms.uVignette[2]=t}};Be(eo,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Ts=eo;var Cs=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample top right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample bottom right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));

    // Sample bottom left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));

    // Average
    color *= 0.25;

    finalColor = color;
}`,ws=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4<f32>(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y));
  // Average
  color *= 0.25;

  return color;
}`,Is=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

uniform vec4 uInputClamp;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample top right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Average
    color *= 0.25;

    finalColor = color;
}
`,ks=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Average
  color *= 0.25;
    
  return color;
}`,Ps=Object.defineProperty,Bs=(e,t,n)=>t in e?Ps(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t,n)=>(Bs(e,typeof t!="symbol"?t+"":t,n),n);const no=class oo extends pe{constructor(...t){let n=t[0]??{};(typeof n=="number"||Array.isArray(n))&&(cr("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},t[1]!==void 0&&(n.quality=t[1]),t[2]!==void 0&&(n.clamp=t[2])),n={...oo.DEFAULT_OPTIONS,...n};const o=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:n?.clamp?ks:ws,entryPoint:"mainFragment"}}),r=ue.from({vertex:Re,fragment:n?.clamp?Is:Cs,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),E(this,"uniforms"),E(this,"_pixelSize",{x:0,y:0}),E(this,"_clamp"),E(this,"_kernels",[]),E(this,"_blur"),E(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(t,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,n,o,r);else{const c=Z.getSameSizeTexture(n);let l=n,f=c,u;const d=this._quality-1;for(let b=0;b<d;b++)a=this._kernels[b]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,l,f,!0),u=l,l=f,f=u;a=this._kernels[d]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,l,o,r),Z.returnTexture(c)}}get strength(){return this._blur}set strength(t){this._blur=t,this._generateKernels()}get quality(){return this._quality}set quality(t){this._quality=Math.max(1,Math.round(t)),this._generateKernels()}get kernels(){return this._kernels}set kernels(t){Array.isArray(t)&&t.length>0?(this._kernels=t,this._quality=t.length,this._blur=Math.max(...t)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(t){if(typeof t=="number"){this.pixelSizeX=this.pixelSizeY=t;return}if(Array.isArray(t)){this.pixelSizeX=t[0],this.pixelSizeY=t[1];return}this._pixelSize=t}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(t){this.pixelSize.x=t}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(t){this.pixelSize.y=t}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((t,n)=>t+n+.5,0))}_generateKernels(){const t=this._blur,n=this._quality,o=[t];if(t>0){let r=t;const i=t/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};E(no,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Os=no;var Ds=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;
uniform float uBloomScale;
uniform float uBrightness;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);
    color.rgb *= uBrightness;
    vec4 bloomColor = vec4(texture(uMapTexture, vTextureCoord).rgb, 0.0);
    bloomColor.rgb *= uBloomScale;
    finalColor = color + bloomColor;
}
`,Fs=`struct AdvancedBloomUniforms {
  uBloomScale: f32,
  uBrightness: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> advancedBloomUniforms : AdvancedBloomUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color = textureSample(uTexture, uSampler, uv);
  color = vec4<f32>(color.rgb * advancedBloomUniforms.uBrightness, color.a);

  var bloomColor = vec4<f32>(textureSample(uMapTexture, uSampler, uv).rgb, 0.0);
  bloomColor = vec4<f32>(bloomColor.rgb * advancedBloomUniforms.uBloomScale, bloomColor.a);
  
  return color + bloomColor;
}
`,Ls=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uThreshold;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);

    // A simple & fast algorithm for getting brightness.
    // It's inaccuracy , but good enought for this feature.
    float _max = max(max(color.r, color.g), color.b);
    float _min = min(min(color.r, color.g), color.b);
    float brightness = (_max + _min) * 0.5;

    if(brightness > uThreshold) {
        finalColor = color;
    } else {
        finalColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
`,Ms=`struct ExtractBrightnessUniforms {
  uThreshold: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> extractBrightnessUniforms : ExtractBrightnessUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  // A simple & fast algorithm for getting brightness.
  // It's inaccurate, but good enough for this feature.
  let max: f32 = max(max(color.r, color.g), color.b);
  let min: f32 = min(min(color.r, color.g), color.b);
  let brightness: f32 = (max + min) * 0.5;

  return select(vec4<f32>(0.), color, brightness > extractBrightnessUniforms.uThreshold);
}
`,As=Object.defineProperty,zs=(e,t,n)=>t in e?As(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ro=(e,t,n)=>(zs(e,typeof t!="symbol"?t+"":t,n),n);const io=class so extends pe{constructor(t){t={...so.DEFAULT_OPTIONS,...t};const n=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:Ms,entryPoint:"mainFragment"}}),o=ue.from({vertex:Re,fragment:Ls,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:t.threshold,type:"f32"}}}}),ro(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(t){this.uniforms.uThreshold=t}};ro(io,"DEFAULT_OPTIONS",{threshold:.5});let _s=io;var Rs=Object.defineProperty,Us=(e,t,n)=>t in e?Rs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Y=(e,t,n)=>(Us(e,typeof t!="symbol"?t+"":t,n),n);const ao=class lo extends pe{constructor(t){t={...lo.DEFAULT_OPTIONS,...t};const n=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:Fs,entryPoint:"mainFragment"}}),o=ue.from({vertex:Re,fragment:Ds,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:t.bloomScale,type:"f32"},uBrightness:{value:t.brightness,type:"f32"}},uMapTexture:Xt.WHITE}}),Y(this,"uniforms"),Y(this,"bloomScale",1),Y(this,"brightness",1),Y(this,"_extractFilter"),Y(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new _s({threshold:t.threshold}),this._blurFilter=new Os({strength:t.kernels??t.blur,quality:t.kernels?void 0:t.quality}),Object.assign(this,t)}apply(t,n,o,r){const i=Z.getSameSizeTexture(n);this._extractFilter.apply(t,n,i,!0);const s=Z.getSameSizeTexture(n);this._blurFilter.apply(t,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,t.applyFilter(this,n,o,r),Z.returnTexture(s),Z.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(t){this._extractFilter.threshold=t}get kernels(){return this._blurFilter.kernels}set kernels(t){this._blurFilter.kernels=t}get blur(){return this._blurFilter.strength}set blur(t){this._blurFilter.strength=t}get quality(){return this._blurFilter.quality}set quality(t){this._blurFilter.quality=t}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this._blurFilter.pixelSize=t}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(t){this._blurFilter.pixelSizeX=t}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(t){this._blurFilter.pixelSizeY=t}};Y(ao,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ns=ao;const Es=W,Vs=(e,t)=>(n,o)=>{const r=new Set;if(ur(n)){const f=_(n)?.items;if(f!==void 0){const u=nt(D(Le(f))).filter(d=>d!==void 0);for(const d of u)r.add(d)}}const s=o*n.gameSpeed,a=Math.max(1,Math.ceil(s/t)),c=s/a;for(let f=0;f<a;f++){const u=e(n,c);for(const d of u)r.add(d)}const l=_(n)?.items??Es;for(const f of r)l[f.id]===void 0&&r.delete(f);return r},$=.33,js=fr()==="mobile"?-4:16,Qe=yt.h-yt.w/2,Hs=j.heels;class Xs{constructor(t,n){this.renderContext=t,this.childRenderer=n;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:i}}=t,{edgeLeftX:s,edgeRightX:a,frontSide:c,topEdgeY:l}=un(o.roomJson);this.#r=s+c.x,this.#s=a+c.x;const f=(a+s)/2;this.#i={x:r.x/2-f,y:r.y-js-c.y-Math.abs(f/2)},this.#t=this.#i.x+this.#r<0,this.#e=this.#i.x+this.#s>r.x,this.#o=this.#i.y+l-Qe<0;const u=this.childRenderer.output.graphics;if(u===void 0)throw new Error("can't scroll a renderer without graphics");const d={sound:this.childRenderer.output.sound,graphics:new w({children:[u],label:`RoomScrollRenderer(${o.id})`})};(i?.showBoundingBoxes??dn.displaySettings.showBoundingBoxes)!=="none"&&d.graphics.addChild(Gs(t.room.roomJson)),this.output=d}#n=!1;#t;#e;#o;#r;#s;#i;output;tick(t){const{general:{upscale:{gameEngineScreenSize:n},gameState:o}}=this.renderContext,{deltaMS:r}=t,i=ne(o);if(i===void 0)return;const s=dr(i.state.position),a=L(s,this.#i),c={x:this.#t&&a.x<n.x*$?Math.min(-this.#r,n.x*$-s.x):this.#e&&a.x>n.x*(1-$)?Math.max(n.x-this.#s,n.x*(1-$)-s.x):this.#i.x,y:this.#o&&a.y<n.y*$?n.y*$-s.y:this.#i.y},l=this.output.graphics;if(!this.#n)l.x=c.x,l.y=c.y;else{const u=Hs*r,d=Me(l,c),b=Wt(d);if(b>u){const g={x:d.x/b,y:d.y/b};l.x-=g.x*u,l.y-=g.y*u}else l.x=c.x,l.y=c.y}this.#n=!0,this.childRenderer.tick(t)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Gs=e=>{const{edgeLeftX:t,edgeRightX:n,frontSide:o,topEdgeY:r}=un(e);return new mn().rect(t+o.x,r-Qe,n-t,o.y-r+Qe).stroke("red").rect(t+o.x,r,n-t,o.y-r).stroke("blue")},Ht=({crtFilter:e},t)=>[e?new Ts({lineContrast:t?.3:0,vignetting:t?.4:.2}):void 0,e?new Ns({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class qs{constructor(t,n){this.app=t,this.gameState=n;try{const o=v.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#s.connect(xt.destination),t.stage.addChild(this.#r),t.stage.scale=r,_(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#a(o);return}}#n;#t;#e;#o;#r=new w({label:"MainLoop/world"});#s=xt.createGain();#i=Vs(gs,vr);#a(t){v.dispatch(br(pr(t)))}#l(){const{gameMenus:{userSettings:{displaySettings:t}}}=v.getState();this.#n=Ht(t,!0),this.#t=Ht(t,!1)}tickAndCatch=t=>{try{this.tick(t)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#a(o)}};tick=({deltaMS:t})=>{const n=v.getState(),o=hr(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=v.getState(),a=!o&&!(r?.uncolourised??dn.displaySettings.uncolourised),c=mr(n),l=gr(n);(this.#e?.renderContext.general.colourised!==a||this.#e?.renderContext.onScreenControls!==c||this.#e?.renderContext.inputDirectionMode!==l)&&(this.#e?.destroy(),this.#e=new zi({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},inputDirectionMode:l,onScreenControls:c}),this.app.stage.addChild(this.#e.output));const f=_(this.gameState);this.#e.tick({screenSize:s.gameEngineScreenSize,room:f});const u=o?We:this.#i(this.gameState,t),d=_(this.gameState);if(this.#o?.renderContext.room!==d||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o){if(this.#o?.destroy(),d){const b={general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},room:d};this.#o=new Xs(b,new Nr(b)),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#s)}else this.#o=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#o?.tick({progression:this.gameState.progression,movedItems:u,deltaMS:t}),o?this.app.stage.filters=this.#n:this.app.stage.filters=this.#t};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#s.disconnect(),this.#o?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}yr.add(gn,vn,yn,xn,Sn,Tn,Cn,wn,In,kn,Pn,On,Bn,Dn,Fn,Ln,Mn,An,zn,_n,Rn);Tr.defaultOptions.scaleMode="nearest";const ea=async(e,t)=>{const n=new Er;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=xr;const o=v.getState().gameMenus.currentGame,r=St({campaign:e,inputStateTracker:t,savedGame:o});o!==void 0?v.dispatch(Sr(o.store.gameMenus)):(v.dispatch(Tt(r.characterRooms.head.id)),v.dispatch(Tt(r.characterRooms.heels.id)));const i=new qs(n,r).start();return{campaign:e,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=ne(r);a!==void 0&&fn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return _(r)},get gameState(){return r},reincarnateFrom(s){St({campaign:e,inputStateTracker:t,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}};export{ea as default,ea as gameMain};
