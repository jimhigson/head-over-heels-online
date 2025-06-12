import{b9 as ue,ba as de,aZ as po,b6 as Xt,am as h,o as D,as as w,U as b,bD as bo,ad as g,bE as ho,bF as mo,X as x,a5 as fe,bG as go,bH as vo,bI as Gt,bJ as G,bK as Je,bL as We,bM as qt,bN as yo,bO as xo,J as R,bP as So,bQ as To,af as De,bR as ke,W as $t,q as M,Q as S,ax as _,az as et,bS as Co,bT as Jt,bU as Yt,bV as wo,bW as P,A as F,bX as Zt,bY as Ae,bZ as ft,b_ as Qt,b$ as Io,a3 as W,c0 as pe,c1 as Kt,c2 as H,aE as Fe,c3 as Wt,c4 as ee,c5 as ze,c as ko,ae as K,c6 as j,Z as te,c7 as Po,d as Bo,c8 as Oo,c9 as Do,ca as Fo,a8 as ne,cb as Mo,cc as Lo,cd as Ao,ce as Ye,cf as zo,cg as en,ch as Ro,ci as ge,l as tt,cj as _o,ck as Uo,cl as No,E as X,cm as tn,aa as nn,cn as pt,co as on,Y as be,cp as rn,a0 as sn,T as an,$ as Eo,K as oe,R as Ze,cq as je,cr as He,bh as bt,cs as Xe,ct as ve,cu as Vo,an as jo,cv as Ho,cw as re,cx as ht,aG as Xo,cy as Go,cz as nt,cA as qo,aF as $o,cB as Jo,cC as Yo,i as ot,cD as Zo,cE as Qo,cF as Ko,cG as Wo,cH as er,cI as tr,cJ as nr,cK as mt,ah as gt,a1 as or,cL as ln,O as cn,L as un,ac as rr,a9 as vt,cM as ir,cN as sr,cO as ar,cP as lr,a as cr,bf as Z,cQ as ur,cR as dn,cS as fn,cT as dr,cU as fr,cV as yt,cW as pr,cX as xt,cY as br,cZ as hr,c_ as mr,c$ as gr,d0 as vr,d1 as yr,ar as xr,d2 as Sr,d3 as St,d4 as Tr,ai as Tt,aM as Cr}from"./App-DiBbS_BO.js";import{f as wr,c as pn,m as Re,a as rt,b as bn,r as Ir,o as kr}from"./changeCharacterRoom-D8aybIGN.js";import{F as he,f as y,n as Me,h as Pe,g as Pr,j as B,s as C,r as Br,k as Or,l as A,P as Dr,m as Fr,o as Mr,q as Lr,t as Ar,v as Be,w as I,x as hn,y as it,B as zr,D as le,E as mn,G as Ct,H as wt,I as Ge,J as It,K as Rr,L as _r,M as Ur,N as ye,O as Nr,R as Er,A as Vr}from"./roomRenderer-Br1ch1e8.js";import{G as gn}from"./Graphics-DcyIS5ru.js";import"./index-DDzkeb-V.js";var jr=`
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
`,Hr=`in vec2 aPosition;
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
`,Xr=`
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
}`;class m extends he{constructor(t){const n=t.gpu,o=kt({source:Xr,...n}),r=ue.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=t.gl,s=kt({source:jr,...i}),a=de.from({vertex:Hr,fragment:s}),l=new po({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:Xt.EMPTY}})}}function kt(e){const{source:t,functions:n,main:o}=e;return t.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const st=`
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
    `,at=`
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
	`;class vn extends m{constructor(){super({gl:{functions:`
                ${st}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${at}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}vn.extension={name:"color",type:h.BlendMode};class yn extends m{constructor(){super({gl:{functions:`
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
            `}})}}yn.extension={name:"color-burn",type:h.BlendMode};class xn extends m{constructor(){super({gl:{functions:`
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
                `}})}}xn.extension={name:"color-dodge",type:h.BlendMode};class Sn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Sn.extension={name:"darken",type:h.BlendMode};class Tn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Tn.extension={name:"difference",type:h.BlendMode};class Cn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Cn.extension={name:"divide",type:h.BlendMode};class wn extends m{constructor(){super({gl:{functions:`
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
            `}})}}wn.extension={name:"exclusion",type:h.BlendMode};class In extends m{constructor(){super({gl:{functions:`
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
                `}})}}In.extension={name:"hard-light",type:h.BlendMode};class kn extends m{constructor(){super({gl:{functions:`
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
            `}})}}kn.extension={name:"hard-mix",type:h.BlendMode};class Pn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Pn.extension={name:"lighten",type:h.BlendMode};class Bn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Bn.extension={name:"linear-burn",type:h.BlendMode};class On extends m{constructor(){super({gl:{functions:`
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
            `}})}}On.extension={name:"linear-dodge",type:h.BlendMode};class Dn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Dn.extension={name:"linear-light",type:h.BlendMode};class Fn extends m{constructor(){super({gl:{functions:`
                ${st}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${at}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Fn.extension={name:"luminosity",type:h.BlendMode};class Mn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Mn.extension={name:"negation",type:h.BlendMode};class Ln extends m{constructor(){super({gl:{functions:`
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
                `}})}}Ln.extension={name:"overlay",type:h.BlendMode};class An extends m{constructor(){super({gl:{functions:`
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
                `}})}}An.extension={name:"pin-light",type:h.BlendMode};class zn extends m{constructor(){super({gl:{functions:`
                ${st}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${at}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}zn.extension={name:"saturation",type:h.BlendMode};class Rn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Rn.extension={name:"soft-light",type:h.BlendMode};class _n extends m{constructor(){super({gl:{functions:`
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
                `}})}}_n.extension={name:"subtract",type:h.BlendMode};class Un extends m{constructor(){super({gl:{functions:`
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
                `}})}}Un.extension={name:"vivid-light",type:h.BlendMode};const q=14,Gr=2,qr=Math.cos(30*(Math.PI/180)),$r=40;class Jr{constructor(t){this.renderContext=t;const{inputDirectionMode:n,general:{colourised:o}}=t;this.arrowSprites={away:y({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:q,y:-14,filter:B}),right:y({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:q,y:q,filter:B}),towards:y({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:q,filter:B}),left:y({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:B}),...n!=="4-way"?{awayRight:y({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:q*Math.SQRT2,filter:B}),towardsRight:y({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:q*Math.SQRT2,filter:B}),towardsLeft:y({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:B}),awayLeft:y({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:B})}:{}},this.output.addChild(this.#n),this.output.addChild(new gn().circle(0,0,$r).fill("#00000000"));for(const r of D(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#n.filters=o?Me:Pe}output=new w({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#n=y({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#t;handlePointerEnter=t=>{this.#t!==void 0&&this.stopCurrentPointer(),this.#t=t.pointerId,this.usePointerLocation(t)};stopCurrentPointer=()=>{this.#t=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=b};usePointerLocation=t=>{if(t.pointerId!==this.#t)return;const n=bo(g.getState()),{x:o,y:r}=this.output,{x:i,y:s}=t,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),f=(s/n-r)/(l/2),u=ho({x:-c,y:-f}),d=mo(u,qr),p=x(d,Gr);this.renderContext.inputStateTracker.hudInputState.directionVector=p};tick(){const{renderContext:{inputStateTracker:{directionVector:t}}}=this;if(g.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=fe(t)>go?vo(t):void 0;for(const[r,i]of Gt(this.arrowSprites))i.filters=r===o?Pr:B}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Qe={colourised:{jump:C.pastelBlue,fire:C.highlightBeige,carry:C.moss,carryAndJump:C.midRed,menu:C.lightGrey,map:C.lightGrey},zx:{jump:G.zxBlue,fire:G.zxYellow,carry:G.zxGreen,carryAndJump:G.zxRed,menu:G.zxWhite,map:G.zxWhite}},Le=Symbol(),Nn=Symbol(),En=Symbol(),xe=({colourised:e,button:{which:t}})=>{const n=new w({label:"depress"}),o=new w({label:"arcadeButton"});o.addChild(n);const r=y("button");e?r.filters=Br(Qe.colourised[t]):o.filters=new Or(Qe.zx[t]),n.addChild(r);const i=new w({label:"surface"}),s=y({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Nn]=r,o[Le]=i,o[En]=n,o},ie=(e,...t)=>{e[Le].removeChildren();for(const n of t)n!==void 0&&e[Le].addChild(n)},Se=(e,t)=>{e[Nn].texture=Je().textures[t?"button.pressed":"button"],e[En].y=t?1:0},Pt=(e,t,n)=>{n&&(e[Le].filters=t?Mr():Me)},Bt=({which:e},t,n)=>{const o=A(new w,n);return o.filters=new Dr({white:t?Fr(Qe.colourised[e]):C.pureBlack}),o},Vn=(e,t,n)=>{const o=Lr(e);if(!n.room)return;const r=o({renderContext:{general:t.general,item:e,room:n.room},tickContext:{lastRenderRoomTime:qt,movedItems:We,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output};function jn({room:{roomTime:e},movingItem:t}){t.state.action!=="death"&&(Ar(t)||Be(t)||(t.state.action="death",t.state.expires=e+wr))}const z=(e,t)=>e==="infinite"||t==="infinite"?"infinite":e+t,ce=e=>e==="infinite"?Number.POSITIVE_INFINITY:e,Yr=3e3,Hn=e=>{const{gameState:t,movingItem:n,touchedItem:o,room:r}=e,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:f}=t;if(f[a]?.[i]===!0)return;l[i]&&(f[a]===void 0&&(f[a]={}),f[a][i]=!0);const u=(d,p=r)=>{const v=$t(o),T={type:"floatingText",id:`floatingText-${i}`,...Jt,fixedZIndex:Co,aabb:b,state:{...et(),position:M(v,{z:S.h/2}),expires:c+Yr},config:{textLines:d,appearanceRoomTime:c}};_({room:p,item:T})};switch(s.gives){case"hooter":{const d=ke(n);d!==void 0&&(d.hasHooter=!0),u(["hooter","collected"]);break}case"doughnuts":{const d=ke(n);d!==void 0&&(d.doughnuts=z(d.doughnuts,6)),u(["+6","doughnuts"]);break}case"bag":{const d=De(n);d!==void 0&&(d.hasBag=!0),u(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,u(["🛡","shield"]);break}case"fast":{const d=ke(n);d!==void 0&&(d.fastStepsStartedAtDistance=d.gameWalkDistance),u(["⚡","fast steps"]);break}case"jumps":{const d=De(n);d!==void 0&&(d.bigJumps+=10),u(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=z(n.state.head.lives,2),n.state.heels.lives=z(n.state.heels.lives,2),u(["+2","lives","each"])):(n.state.lives=z(n.state.lives,2),u(["+2","lives"]));break;case"scroll":g.dispatch(To(s.page));break;case"reincarnation":{const d=xo(t,g.getState(),i),p=R(d.gameState);if(!p)throw new Error("how are we saving from a pickup if there is no current room?");u(["reincarnation","point","restored"],p),g.dispatch(So(d)),u(["reincarnation","point","saved"]);break}case"crown":{g.dispatch(yo(s.planet)),u([s.planet,"liberated!"]);break}}},Zr=({gameState:e,movingItem:t,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Yt(i,o)<=0||t.state.action!=="death"&&pn({playableItem:t,gameState:e,toRoomId:r,sourceItem:n,changeType:"portal"})},Qr=({movingItem:e,movementVector:t,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=wo(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0};e.state.position=M(e.state.position,s)};function Kr({movingItem:e}){e.state.autoWalk=!1}const O=(e,...t)=>F(...t)(e.touchedItem),se=(e,...t)=>F(...t)(e.movingItem),Xn=e=>P(e.movingItem),Wr=e=>P(e.touchedItem),ei=e=>Zt(e.touchedItem),Ot=e=>{switch(!0){case O(e,"stopAutowalk"):Kr(e);break;case ei(e):jn(e);break;case O(e,"portal"):Zr(e);break;case O(e,"pickup"):Hn(e);break;case O(e,"doorFrame"):Qr(e);break}},_e=(e,t)=>{const{head:n,heels:o,headOverHeels:r}=Ae(t.items);if(r!==void 0)return Be(r)?void 0:r;const i=n===void 0||Be(n)||n.state.action==="death"?void 0:ft(n.state.position,e),s=o===void 0||Be(o)||o.state.action==="death"?void 0:ft(o.state.position,e);return i===void 0?o:s===void 0||i<s?n:o},lt=e=>e[Math.floor(Math.random()*e.length)],Dt=(e,t,n)=>{switch(n){case"opposite":return{x:t.x===0?e.x:-e.x,y:t.y===0?e.y:-e.y,z:0};case"clockwise":return{x:-e.y,y:e.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const o=lt([-1,1]);return{x:t.x===0?o*e.y:0,y:t.y===0?o*e.x:0,z:0}}}},Gn=150,V=Object.freeze({movementType:"vel",vels:{walking:b}}),Ue=e=>Qt(e)?j[e.config.which]:j[e.type],Ft=S.w/2,ti=({state:{position:e,vels:{walking:t}}},n,o,r)=>{const i=j.homingBot;if(!ee(t,ze))return{movementType:"steady"};for(const s of D(Ae(n.items))){if(s===void 0)continue;const a=pe(s.state.position,e);if(Math.abs(a.y)<Ft)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Ft)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ni=(e,t,n,o)=>{const{state:{position:r,facing:i}}=e,s=_e(r,t);if(s===void 0)return I;const a=pe(s?.state.position,r),l=Fe[Wt(a)];return ee(l,i)?I:{movementType:"steady",stateDelta:{facing:l}}},oi=(e,t,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=e;if(i===null)return V;const l=_e(r,t);if(l===void 0)return I;if(s+Gn>t.roomTime)return I;const c=pe(l?.state.position,r),f=Math.abs(c.x)<Math.abs(c.y)?"x":"y",u=Math.abs(c[f])>S.w/4?f:ko(f),d=Ue(e),p={...b,[u]:c[u]>0?d:-d},v=H(p),T=!ee(v,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:v,...T?{timeOfLastDirectionChange:t.roomTime}:K}}},Mt=(e,t,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=e;if(s===null)return V;const a=_e(i,t);if(a===void 0)return V;const l=a.state.position,c=S.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return V;const u=pe(a?.state.position,i),d=Ue(e),p=(1+Math.sqrt(2))/2,v=d*p,T=x({...u,z:0},v/Kt(u)*(r?-1:1));return{movementType:"vel",vels:{walking:T},stateDelta:{facing:H(T)}}},qe=(e,t,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=e;if(s===null)return V;if(!(te(i,b)||Math.random()<o/1e3))return I;const l=lt(r),c=Fe[l];return{movementType:"vel",vels:{walking:x(c,Ue(e))},stateDelta:{facing:Fe[l]}}},ri=(e,t,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=e;return s===null?V:ee(i,ze)?{movementType:"vel",vels:{walking:x(r,Ue(e))}}:I},Te=({movingItem:e,touchedItem:{state:{position:t},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=e;if(!a||(e.state.durationOfTouch+=o,e.state.durationOfTouch<Gn))return;const f=Re(i,c,t,n);if(f.x===0&&f.y===0)return;const u=Dt(s,f,r);e.state.vels.walking=u;const d=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;e.state.facing=x(ee(u,ze)?Dt(l,f,r):H(u),d),e.state.durationOfTouch=0},ii=({movingItem:e,movementVector:t})=>{t.z<0||(e.state.vels.walking=b)},si=(e,t,n,o)=>{if(!e.state.activated||Qt(e)&&e.state.busyLickingDoughnutsOffFace)return V;switch(e.config.movement){case"patrol-randomly-diagonal":return qe(e,t,n,o,Oo);case"patrol-randomly-xy8":return qe(e,t,n,o,Bo);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return qe(e,t,n,o,Po);case"towards-tripped-on-axis-xy4":return ti(e,t);case"towards-on-shortest-axis-xy4":return oi(e,t);case"back-forth":case"clockwise":return ri(e);case"turn-to-player":return ni(e,t);case"towards-analogue":return Mt(e,t);case"towards-analogue-unless-planet-crowns":return Mt(e,t,n,o,Io(g.getState()));default:throw e.config,new Error("this should be unreachable")}},ai=e=>{const{movingItem:t,touchedItem:n}=e;if(W(n,t))switch(t.config.movement){case"patrol-randomly-xy4":Te(e,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Te(e,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Te(e,"opposite");break;case"clockwise":Te(e,"clockwise");break;case"towards-tripped-on-axis-xy4":ii(e);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":return;default:throw t.config,new Error("this should be unreachable")}},li=({touchedItem:e,gameState:{progression:t},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=e;if(e.state.touchedOnProgression=t,!(t===i+1||t===i))switch(o.type){case"in-room":{const s=e.state.setting=r==="left"?"right":"left";ci(o,s,n.items,n.roomTime);break}case"in-store":{g.dispatch(Do(o.path));break}}},ci=(e,t,n,o)=>{for(const r of e.modifies)for(const[i,s]of Fo(r.newState))if(Object.hasOwn(s,t))for(const a of r.targets){const l=n[a];if(l===void 0)continue;if(l.type!==r.expectType)throw new Error(`item "${l.id}" is of type "${l.type}" - does not match expected type "${r.expectType}" from switch config ${JSON.stringify(e,null,2)}`);const c=l;c.state={...l.state,[i]:s[t],switchedAtRoomTime:o,switchedSetting:t}}},ui=({movingItem:e,touchedItem:t})=>{if(!W(e))return;const{state:{position:n},aabb:o}=t,r=Re(e.state.position,e.aabb,n,o);if(r.x===0&&r.y===0)return;const i=H(r),s=x(i,-.05);return t.state.vels.sliding=s,!1},di=({movingItem:e,touchedItem:t})=>{if(!W(t))return;const n=e.state.vels.sliding;if(te(n,b))return;const{state:{position:o},aabb:r}=e,i=Re(t.state.position,t.aabb,o,r);return Yt(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=b),!1},fi=({movingItem:e,room:t,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Re(e.state.position,e.aabb,a,l);if(c.x===0&&c.y===0)return;const f=H(c);for(const u of s){const d=t.items[u],p=x(f,-.025*o);d.state.facing=p,rt({room:t,subjectItem:d,gameState:r,pusher:n,posDelta:p,deltaMS:o,onTouch:i})}},pi=1e3/12,Ce=e=>{const t=e-zo,o=t/Ro*en;return(t+.5*Ye*o**2)/o},bi={head:Ce(ge.head),headOnSpring:Ce(ge.head+S.h),heels:Ce(ge.heels),heelsOnSpring:Ce(ge.heels+S.h)},Lt=(e,t,n)=>{const o=e.type==="headOverHeels"||e.type==="heels"&&n?"head":e.type;return bi[`${o}${t?"OnSpring":""}`]},hi=e=>!(e===null||Lo(e)&&hn(e)||Ao(e)&&e.config.gives==="scroll"||P(e)&&e.state.standingOnItemId===null),mi=e=>e.state.jumped&&e.state.position.z===e.state.jumpStartZ&&e.state.jumpStartTime+pi>(e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime),qn=(e,t,n)=>{const{state:{standingOnItemId:o}}=e,{inputStateTracker:r}=n,i=ne(o,t);if(mi(e))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Lt(e,!1,e.type==="heels"&&e.state.isBigJump)}},stateDelta:{}};if(!(e.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&hi(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...e.type==="heels"?{isBigJump:!1}:{}}}:I;const a=e.type==="heels"&&e.state.bigJumps>0,l=Mo(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Lt(e,l,a)}},stateDelta:{action:"moving",jumped:!0,...e.type==="heels"?a?{bigJumps:e.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:e.state.position.z,jumpStartTime:e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime}}},gi=({vel:e,acc:t,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=fe(e),a=Math.max(i,Math.min(o,s+t*r)),l=Math.min(a,o);return x(n,l)},vi={movementType:"vel",vels:{walking:b}},$n=(e,t,n,o)=>{const r=yi(e,t,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=fe(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:e.state.walkDistance+i*o},e.type==="head"&&e.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:e.state.gameWalkDistance+i*o})}return e.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!te(r.vels.walking,b)&&(r.stateDelta={...r.stateDelta,walkStartFacing:e.state.facing}),r},yi=(e,t,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:f,walkDistance:u,walkStartFacing:d,vels:{walking:p,gravity:v}}}=e,T=o===e.id,L=T?n.currentActionPress("jump"):"released",ut=T?n.directionVector:b,k=l===null&&v.z<0,uo=i==="head"&&it(e.state)>0&&l!==null,dt=i==="headOverHeels"?k?"head":"heels":uo?"heels":i,U=a?c:ut,Ve=j[dt];if(f!==null||s==="death")return vi;if(i==="heels"){if(l===null)return e.state.jumped?{movementType:"vel",vels:{walking:tt(p,x(p,_o*r))},stateDelta:{action:k?"falling":"jumping"}}:{movementType:"vel",vels:{walking:b},stateDelta:{action:"falling"}};if(L!=="released"){const me=H(ee(U,ze)?c:U),fo=F("spring")(ne(l,t))?1:Uo;return{movementType:"vel",vels:{walking:x({...me,z:0},Ve*fo)},stateDelta:{facing:me}}}}if(fe(U)!==0)return k?{movementType:"vel",vels:{walking:x({...U,z:0},Ve)},stateDelta:{facing:U,action:"falling"}}:{movementType:"vel",vels:{walking:gi({vel:p,acc:No[dt],deltaMS:r,maxSpeed:Ve,unitD:U,minSpeed:0})},stateDelta:{facing:U,action:"moving"}};if(u>0&&u<1){const me=te(d,c)?1:0;return{movementType:"position",posDelta:x(c,me-u),stateDelta:{action:k?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:b},stateDelta:{action:k?"falling":"idle"}}},At=e=>X(e.movingItem)&&tn(e.movingItem,e.touchedItem,Math.abs(e.movementVector.z)),Jn=(e,t)=>{let n=b;for(const o of t){if(o.movementType==="position"&&(n=M(n,o.posDelta)),o.movementType==="vel"&&(X(e)||F("lift")(e)))for(const[i,s]of Gt(o.vels)){const a={...b,...s};e.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(e.state={...e.state,...r})}return n},zt=e=>{if(e.touchedItem.type==="firedDoughnut"&&(e.movingItem.type==="head"||e.movingItem.type==="firedDoughnut"))return;if(e.touchedItem.state.disappear==="onTouch"||e.touchedItem.state.disappear==="onTouchByPlayer"&&P(e.movingItem)||e.touchedItem.state.disappear==="onStand"&&At(e)){if(At(e)&&Xn(e)){nn({above:e.movingItem,below:e.touchedItem});const n=[qn(e.movingItem,e.room,e.gameState,e.deltaMS),$n(e.movingItem,e.room,e.gameState,e.deltaMS)];Jn(e.movingItem,n)}bn(e)}};function xi(e){const t=e.movingItem.type==="monster"?e.movingItem:e.touchedItem;t.config.which!=="emperorsGuardian"&&(t.state.busyLickingDoughnutsOffFace=!0)}const ct=e=>{Xn(e)&&Ot(e),Wr(e)&&Ot({...e,movingItem:e.touchedItem,touchedItem:e.movingItem}),O(e,...pt)&&ui(e),se(e,...pt)&&di(e),(se(e,"monster")&&O(e,"firedDoughnut")||se(e,"firedDoughnut")&&O(e,"monster"))&&xi(e),(se(e,"monster")||se(e,"movingPlatform"))&&ai(e),O(e,"switch")&&li(e),O(e,"joystick")&&fi(e,ct),e.touchedItem.state.disappear&&zt(e),e.movingItem.state.disappear&&W(e.touchedItem,e.movingItem)&&zt({...e,movingItem:e.touchedItem,touchedItem:e.movingItem})},Si=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="heels"?e.state:e.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=e;if(!a)return;const c=be(t.items).filter(rn),f=s===null?Yn(e,t):void 0;for(const p of c)p.state.wouldPickUpNext=!1;f!==void 0&&(f.state.wouldPickUpNext=!0);const u=r.currentActionPress("carry");if(u==="tap"||r.currentActionPress("jump")==="hold"&&u==="hold")if(s===null){if(f===void 0)return;Ti(t,i,f),r.actionsHandled.add("carry")}else{if(e.state.standingOnItemId===null||!Zn(e,sn(t.items)))return;s.state.position=l,_({room:t,item:s}),rt({subjectItem:e,gameState:n,room:t,posDelta:{x:0,y:0,z:s.aabb.z},pusher:e,forceful:!0,deltaMS:o,onTouch:ct}),i.carrying=null,r.actionsHandled.add("carry")}},Ti=(e,t,n)=>{t.carrying=n,n.state.wouldPickUpNext=!1,an({room:e,item:n})},Yn=(e,t)=>on(e,be(t.items).filter(rn)),Zn=(e,t)=>{const n={position:M(e.state.position,{z:S.h})},o=Eo({id:e.id,aabb:e.aabb,state:n},t);for(const r of o)if(W(r,e)){if(!X(r))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with non-free",r),!1;if(!Zn(r,t))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},$e=-11,Ci={jump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],f=c===null?!1:c.type==="teleporter"&&hn(c),u=e.actions.every(p=>t.currentActionPress(p)!=="released"),d=a===void 0?xe({colourised:n,button:e}):a;if(s?.pressed!==u&&Se(d,u),f!==s?.standingOnTeleporter)if(f)ie(d,y({textureId:"teleporter",y:5}),y({animationId:"teleporter.flashing",y:5}));else{const p=Bt(e,n,"JUMP");p.y=$e,ie(d,p)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:f,colourised:n}}},carry({renderContext:e,currentRendering:t,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=e,{currentPlayable:s,room:a}=n,l=t?.renderProps,c=t?.output,f=s&&De(s),u=f?.hasBag??!1,d=f?.carrying??null,p=d===null&&a!==void 0&&Yn(s,a)!==void 0,v=o.actions.every(k=>r.currentActionPress(k)!=="released"),T=u&&!p&&d===null,L=c===void 0?xe({colourised:i,button:o}):c;if(L.visible=u,u&&(T!==l?.disabled&&Pt(L,T,i),L.visible=!0,l?.pressed!==v&&Se(L,v),u!==l?.hasBag||d!==l?.carrying)){let k;d!==null?k=Vn(d,e,n):u&&(k=y({textureId:"bag",y:-2})),ie(L,k)}return{output:L,renderProps:{pressed:v,hasBag:u,colourised:i,carrying:d,disabled:T}}},fire({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&ke(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,f=e.actions.every(p=>t.currentActionPress(p)!=="released"),u=s===void 0?xe({colourised:n,button:e}):s,d=l||ce(c)>0;if(u.visible=d,d&&(i?.pressed!==f&&Se(u,f),l!==i?.hasHooter||c!==i?.doughnuts)){let p;l?p=y({textureId:"hooter",y:-3}):ce(c)>0&&(p=y({textureId:"doughnuts",y:-2}));const v=A(new w,c);v.y=$e,v.filters=mn,ie(u,p,v),Pt(u,c===0,n)}return{output:u,renderProps:{pressed:f,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,l=(r&&De(r))?.hasBag??!1,c=e.actions.every(d=>t.currentActionPress(d)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let u;if(s===void 0){u=xe({colourised:n,button:e});const d=Bt(e,n,"C+J");d.y=$e,ie(u,d)}else u=s;return l?(u.visible=!0,i?.pressed!==c&&Se(u,c)):u.visible=!1,{output:u,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:e}){if(e!==void 0)return"no-update";const t=y("hud.char.Menu");return t.scale=2,t.filters=B,{output:t,renderProps:K}},map({currentRendering:e}){if(e!==void 0)return"no-update";const t=le({label:"mapText",outline:!0});return A(t,"MAP"),{output:t,renderProps:K}}};class $ extends zr{constructor(t){const n=Ci[t.button.which];super(t,n)}}const wi=30,Ii=15,ki=42,Pi=36,Bi=44,Oi=20;class Di{constructor(t){this.renderContext=t;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=t;this.#t={mainButtonNest:new w({label:"mainButtonNest"}),buttons:{jump:new $({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new $({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new $({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new $({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new $({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new $({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new Jr({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#t,{mainButtonNest:s,joystick:a}=this.#t;for(const{renderContext:{button:{which:l}},output:c}of D(i))l==="menu"||l==="map"?this.#n.addChild(c):s.addChild(c);i.jump.output.y=Ii,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=wi,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#n.addChild(s),this.#n.addChild(a.output),this.#e()}#n=new w({label:"OnScreenControls"});#t;#e(){const{renderContext:{general:{gameState:{inputStateTracker:t}}}}=this;for(const n of D(this.#t.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)t.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)t.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)t.hudInputState[r]=!1})}}#o(t){this.#t.mainButtonNest.x=t.x-Bi,this.#t.mainButtonNest.y=t.y-Oi,this.#t.joystick.output.x=ki,this.#t.joystick.output.y=t.y-Pi,this.#t.buttons.map.output.x=t.x-4*8}tick(t){const{screenSize:n}=t,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of D(this.#t.buttons))r.tick({...t,currentPlayable:oe(o)});this.#t.joystick.tick()}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t.joystick.destroy()}}Ze.frames.button.frame;const Fi=250,Mi=e=>e?48:24,Li=e=>e?68:56,Ai=(e,t)=>e?t.x/2-24:80,zi=e=>e?72:24,Ri=e=>e?88:0,Rt=112,ae=e=>e==="heels"?1:-1;class _i{constructor(t){this.renderContext=t;const{onScreenControls:n}=t;for(const o of je)this.#n.addChild(this.#e[o].sprite),this.#n.addChild(this.#e[o].livesText),this.#n.addChild(this.#e[o].shield.container),this.#n.addChild(this.#e[o].extraSkill.container);n||(this.#n.addChild(this.#e.head.doughnuts.container),this.#n.addChild(this.#e.head.hooter.container),this.#n.addChild(this.#e.heels.bag.container),this.#n.addChild(this.#e.heels.carrying.container)),this.#n.addChild(this.#e.fps),this.#e.fps.filters=[Ct],this.#e.fps.y=He.h,this.#o(),n&&(this.#t=new Di({general:t.general,inputDirectionMode:t.inputDirectionMode}),this.#n.addChild(this.#t.output))}#n=new w({label:"HudRenderer"});#t=void 0;#e={head:{sprite:this.#s("head"),livesText:le({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#s("heels"),livesText:le({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new w({label:"heelsCarrying"})}},fps:le({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:t}}}}}=this;for(const n of je){const{sprite:o,livesText:r}=this.#e[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{t[`swop.${n}`]=!0}),i.on("pointerup",()=>{t[`swop.${n}`]=!1}),i.on("pointerleave",()=>{t[`swop.${n}`]=!1})}}#r({textureId:t,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new w({label:i});s.pivot={x:4,y:16};const a=new bt({texture:Je().textures[t],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:wt,y:n?0:8});s.addChild(a);const l=le({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=He.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=mn),{text:l,icon:a,container:s}}#s(t){const n=new bt(Je().textures[`${t}.walking.${t==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:t}){this.#e.head.hooter.container.x=this.#e.head.doughnuts.container.x=(t.x>>1)+ae("head")*Rt,this.#e.head.doughnuts.container.y=t.y-Xe.h-8,this.#e.heels.carrying.container.y=t.y-Xe.h,this.#e.heels.carrying.container.x=this.#e.heels.bag.container.x=(t.x>>1)+ae("heels")*Rt,this.#e.heels.bag.container.y=this.#e.head.hooter.container.y=t.y-8,this.#e.fps.x=t.x-He.w*2}#a(t,n){return t?n?Me:Ge:n?It:Pe}#l(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ve(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#e.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=Vn(s,this.renderContext,t);c!==void 0&&a.addChild(c)}a.filters=this.#a(!0,o),this.#e.heels.bag.icon.filters=this.#a(i,o)}#d(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ve(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#e.head.hooter.icon.filters=this.#a(i,o),this.#e.head.doughnuts.icon.filters=this.#a(s!==0,o),A(this.#e.head.doughnuts.text,s)}#f(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=ve(r,t),{text:s,container:a}=this.#e[t].shield,{text:l,container:c}=this.#e[t].extraSkill,f=Rr(i),u=f>0||!o;a.visible=u,u&&(A(s,f),a.y=n.y-Ri(o)),c.x=a.x=(n.x>>1)+ae(t)*Ai(o,n);const d=i===void 0?0:t==="head"?it(i):i.bigJumps,p=d>0||!o;c.visible=p,p&&(A(l,d),c.y=n.y-zi(o))}#c(t,n){const{currentCharacterName:o}=t;return o===n||o==="headOverHeels"}#p(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#c(r,t),a=this.#e[t].sprite;s?a.filters=i?Me:Ge:a.filters=i?It:Pe,a.x=(n.x>>1)+ae(t)*Li(o),a.y=n.y-Xe.h}#b(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=ve(r,t)?.lives??0,a=this.#e[t].livesText;a.x=(n.x>>1)+ae(t)*Mi(o),a.y=n.y,A(a,s??0)}#h(t){const{room:n}=t;if(n===void 0)return;const o=_r(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;Pe.targetColor=o.hud.dimmed[r?"dimmed":"original"],Ur.targetColor=o.hud.dimmed[r?"basic":"original"],wt.targetColor=o.hud.icons[r?"basic":"original"],Ge.targetColor=o.hud.lives.original,this.#e.head.livesText.filters=r?ye.colourised.head[this.#c(i,"head")?"active":"inactive"]:ye.original,this.#e.heels.livesText.filters=r?ye.colourised.heels[this.#c(i,"heels")?"active":"inactive"]:ye.original}#u=qt;#m(){if(Vo(g.getState())){if(performance.now()>this.#u+Fi){const t=jo.shared.FPS;A(this.#e.fps,Math.round(t)),Ct.targetColor=t>100?C.white:t>58?C.moss:t>55?C.pastelBlue:t>50?C.metallicBlue:t>40?C.pink:C.midRed,this.#u=performance.now()}this.#e.fps.visible=!0}else this.#e.fps.visible=!1}tick(t){this.#h(t);for(const n of je)this.#b(n,t),this.#p(n,t),this.#f(n,t);this.#i(t),this.#d(t),this.#l(t),this.#m(),this.#t?.tick(t)}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t?.destroy()}}const _t={movementType:"vel",vels:{gravity:b}},Ui=(e,t,n,o)=>{if(!W(e))return _t;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=e,l=Ho[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=ne(s,t);return F("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-Ye*o,-l)}}}:_t}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-Ye*o,-l)}}}},Ut=S.h,Nt=.001,Ni=({totalDistance:e,currentAltitude:t,direction:n})=>{const o=ht**2/(2*re);if(n==="up"){if(t<=o)return Math.max(Nt,Math.sqrt(2*re*Math.max(t,0)));if(t>=e-o){const r=Math.max(0,e-t);return Math.max(Nt,Math.sqrt(2*re*r))}else return ht}else if(t>=e-o){const r=Math.max(0,e-t);return Math.min(-.001,-Math.sqrt(2*re*r))}else return t<=o?Math.min(-.001,-Math.sqrt(2*re*Math.max(t,0))):-.036},Ei=({config:{bottom:e,top:t},state:{direction:n,position:{z:o}}})=>{const r=e*Ut,i=t*Ut,s=Ni({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Et={movementType:"vel",vels:{movingFloor:b}},Vi=(e,t,n,o)=>{if(P(e)&&e.state.teleporting!==null)return Et;const{state:{standingOnItemId:r}}=e,i=ne(r,t);if(i===null||!F("conveyor")(i))return Et;const{config:{direction:s}}=i,l=F("heels")(e)&&e.state.action==="moving"&&Wt(e.state.facing)===Xo(s)?j.heels:Go;return{movementType:"vel",vels:{movingFloor:x(Fe[s],l)}}};function*ji(e,t,n,o){for(;(e.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<t.roomTime;){const{positionDelta:r}=e.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Hi=S.w*.8,Xi=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="head"?e.state:e.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=e,f=H(c);if(r.currentActionPress("fire")==="tap"&&a&&ce(s)>0){const u={type:"firedDoughnut",...Jt,config:K,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...et(),position:M(l,x(f,Hi),e.type==="headOverHeels"?{z:S.h}:b),vels:{fired:x(f,j.firedDoughnut)},disappear:"onTouch"}};_({room:t,item:u}),i.doughnuts=z(i.doughnuts,-1),r.actionsHandled.add("fire")}},Qn=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Gi=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),we=S.w*3,qi=(e,t)=>{const{state:{position:n}}=e,{state:{position:o}}=t;return n.x>o.x-we&&n.x<o.x+we&&n.y>o.y-we&&n.y<o.y+we},Vt=(e,t,n,o,r)=>{if(r&&e.state.activated)return I;const i=_e(e.state.position,t);return i===void 0?I:qi(e,i)?Qn:Gi},$i=(e,t,n,o)=>e.state.activated?I:nt(e.state.stoodOnBy,t).some(P)?Qn:I,Ji=(e,t,n,o)=>{switch(e.config.activated){case"after-player-near":return Vt(e,t,n,o,!0);case"while-player-near":return Vt(e,t,n,o,!1);case"on-stand":return $i(e,t);case"off":case"on":return I;default:throw e.config,new Error(`unrecognised item.config.activation ${e.config.activated} in ${e.id}:
        ${JSON.stringify(e,null,2)}`)}},Yi=(e,t,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:f}}=e,{roomTime:u}=t;if(s!==f&&i+c<u){const d=qo($o(`${r}-${s}`,{...l,position:b},t.roomJson));if(d===void 0)throw new Error("emitter failed to create a new item");d.state.position=tt(a,x(d.aabb,.5)),_({room:t,item:d}),e.state.lastEmittedAtRoomTime=t.roomTime+c,e.state.quantityEmitted++}},jt=en*Ze.animations["particle.fade"].length*(1/Ze.animations["particle.fade"].animationSpeed),Zi=20,Qi=38,Ki=.5,Ie=S.w/2;let Wi=0;const Kn=(e,t)=>Math.random()<e*(t/1e3),Wn=(e,t,n,o)=>({id:`particle.${e}.${Wi++}`,type:"particle",aabb:b,config:{forCharacter:t},state:{...et(),expires:o+jt+Math.random()*jt,position:n}}),eo=(e,t,n,o)=>{if(!Kn(n,o))return;const r={...M($t(e),{x:Math.random()*Ie-Ie/2,y:Math.random()*Ie-Ie/2}),z:e.state.position.z};_({room:t,item:Wn(e.id,e.type,r,t.roomTime)})},es=(e,t,n)=>{!(it(e.state)>0)||e.state.standingOnItemId===null||fe(e.state.vels.walking)<Yo||eo(e,t,Zi,n)},ts=(e,t,n)=>{const{isBigJump:o}=e.state;o&&e.state.standingOnItemId===null&&(e.state.vels.gravity.z<=0||eo(e,t,Qi,n))},ns=(e,t)=>{const{head:n,heels:o}=Ae(e.items);n!==void 0&&es(n,e,t),o!==void 0&&ts(o,e,t)},os=(e,t,n)=>{if(!Kn(Ki,n))return;const o=lt(Jo),r=M(t.state.position,{x:o==="x"?0:Math.random()*S.w,y:o==="y"?0:Math.random()*S.d,z:o==="z"?S.h:Math.random()*S.h});_({room:e,item:Wn(t.id,"crown",r,e.roomTime)})};function*rs(e,t,n,o){X(e)&&(yield Ui(e,t,n,o),yield Vi(e,t),yield*ji(e,t)),P(e)?(yield $n(e,t,n,o),e.id===n.currentCharacterName&&(yield Nr(e,t,n,o),yield qn(e,t,n),Qo(e)&&Si(e,t,n,o),Ko(e)&&Xi(e,t,n))):Wo(e)?yield Ei(e):er(e)?(yield Ji(e,t,n,o),yield si(e,t,n,o)):tr(e)&&Yi(e,t)}const is=(e,t,n,o)=>{if(!X(e)||e.state.standingOnItemId===null)return;const r=ne(e.state.standingOnItemId,t);P(e)&&r.type==="pickup"&&Hn({gameState:n,movingItem:e,touchedItem:r,room:t}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||P(e)&&r.state.disappear==="onTouchByPlayer")&&bn({touchedItem:r,gameState:n,room:t})},ss=(e,t,n,o)=>{if(P(e)&&e.state.standingOnItemId!==null){const s=ne(e.state.standingOnItemId,t);(Zt(s)||s.type==="spikes")&&jn({room:t,movingItem:e})}const r=[...rs(e,t,n,o)];is(e,t,n);let i=Jn(e,r);(X(e)||F("lift")(e)||F("firedDoughnut")(e))&&(i=M(i,...ot(D(e.state.vels)).map(s=>x(s,o)))),Zo(e)&&os(t,e,o),rt({subjectItem:e,posDelta:i,gameState:n,room:t,deltaMS:o,onTouch:ct})},as=(e,t)=>{const n=e.characterRooms.headOverHeels;if(t.state.head.lives=z(t.state.head.lives,-1),t.state.heels.lives=z(t.state.heels.lives,-1),t.state.head.lastDiedAt=t.state.head.gameTime,t.state.heels.lastDiedAt=t.state.heels.gameTime,z(t.state.head.lives,t.state.heels.lives)===0)return;const r=ce(t.state.head.lives)>0,i=ce(t.state.heels.lives)>0;if(t.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";e.currentCharacterName=c,E(e,t);const f=mt(t)[c],u=Q({gameState:e,playableItems:[f],roomId:n.id});e.characterRooms={[c]:u},e.entryState={[c]:gt(f)};return}if(e.entryState.headOverHeels!==void 0){E(e,t);const c=Q({gameState:e,playableItems:[t],roomId:n.id});e.characterRooms={headOverHeels:c};return}else{const{head:c,heels:f}=mt(t);if(E(e,c),E(e,f),or(c,f)){const u=ln({head:c,heels:f});E(e,u,"heels");const d=Q({gameState:e,playableItems:[u],roomId:n.id});e.characterRooms={headOverHeels:d},e.entryState={headOverHeels:gt(u)};return}else{const u=Q({gameState:e,playableItems:[c,f],roomId:n.id});e.characterRooms={head:u,heels:u};return}}},Q=({gameState:e,playableItems:t,roomId:n})=>{const{campaign:o}=e,r=rr({roomJson:o.rooms[n],roomPickupsCollected:e.pickupsCollected[n]??K,scrollsRead:g.getState().gameMenus.scrollsRead});for(const i of t)_({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Ir(r,e);return r},E=(e,t,n=t.id)=>{const o=e.entryState[n];t.state={...t.state,...o,expires:null,standingOnItemId:null}},ls=(e,t)=>{const n=cn(e,un(t.type));if(t.state.lives!=="infinite"&&t.state.lives--,t.state.lastDiedAt=t.state.gameTime,t.type==="heels"&&(t.state.carrying=null),t.state.lives===0){delete e.characterRooms[t.id],n!==void 0&&(e.currentCharacterName=n.type);return}else{const o=e.characterRooms[t.type];E(e,t);const r=n===void 0?void 0:e.characterRooms[n.type];if(o===r){if(e.entryState.headOverHeels!==void 0){const a=ln({head:t.id==="head"?t:o.items.head,heels:t.id==="heels"?t:o.items.heels});E(e,a);const l=Q({gameState:e,playableItems:[a],roomId:o.id});e.characterRooms={headOverHeels:l},e.currentCharacterName="headOverHeels";return}_({room:o,item:t});return}else{const s=Q({gameState:e,playableItems:[t],roomId:o.id});e.characterRooms[t.id]=s;return}}},cs=(e,t)=>{t.type==="headOverHeels"?as(e,t):ls(e,t),oe(e)===void 0&&g.dispatch(nr({offerReincarnation:!0}))},us=e=>{for(const t of be(e.items))try{for(const n of nt(t.state.stoodOnBy,e)){if(!e.items[n.id]){vt(n,e);continue}if(!tn(n,t)){vt(n,e);const o=on(n,sn(e.items));o!==void 0&&nn({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${t.id}"`,{cause:n})}},ds=2*kr,fs=(e,t,n)=>{e.state.latentMovement.push({moveAtRoomTime:t.roomTime+ds,positionDelta:n})},ps=(e,t,n)=>{for(const o of e){const r=n[o.id];if(r===void 0)continue;const s={...tt(o.state.position,r),z:0};if(!te(s,b))for(const a of nt(o.state.stoodOnBy,t))fs(a,t,s)}},bs=(e,t)=>{for(const n of be(e.items))!X(n)||e.roomTime===n.state.actedOnAt.roomTime||ir(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=sr(n.state.position),t.add(n))},hs=(e,t)=>e.state.expires!==null&&e.state.expires<t.roomTime,ms=e=>{for(const t of be(e.items)){const n=t.state.position;t.state.position=ar(n)}},gs=(e,t)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[e.type]??0,r=n[t.type]??0;return o-r},vs=(e,t,n)=>{e.progression++,e.gameTime+=n,t.roomTime+=n;const o=oe(e);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,e.characterRooms.head===e.characterRooms.heels){const i=cn(e,un(o.type));i!==void 0&&(i.state.gameTime+=n)}}},ys=(e,t)=>{const n=R(e);if(n===void 0)return We;vs(e,n,t);const o=Object.fromEntries(lr(n.items).map(([s,a])=>[s,a.state.position]));for(const s of D(n.items))hs(s,n)&&(an({room:n,item:s}),P(s)&&cs(e,s));const r=Object.values(n.items).sort(gs);for(const s of r){const a=oe(e);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{ss(s,n,e,t)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}ns(n,t),us(n),ms(n);const i=new Set(ot(D(n.items)).filter(s=>o[s.id]===void 0||!te(s.state.position,o[s.id])));return ps(i,n,o),bs(n,i),i};var Ne=`in vec2 aPosition;
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
`,Ee=`struct GlobalFilterUniforms {
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
}`,xs=`precision highp float;
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
`,Ss=`struct CRTUniforms {
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
}`,Ts=Object.defineProperty,Cs=(e,t,n)=>t in e?Ts(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Oe=(e,t,n)=>(Cs(e,typeof t!="symbol"?t+"":t,n),n);const to=class no extends he{constructor(t){t={...no.DEFAULT_OPTIONS,...t};const n=ue.from({vertex:{source:Ee,entryPoint:"mainVertex"},fragment:{source:Ss,entryPoint:"mainFragment"}}),o=de.from({vertex:Ne,fragment:xs,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:t.seed,type:"f32"},uTime:{value:t.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Oe(this,"uniforms"),Oe(this,"seed"),Oe(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,t)}apply(t,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,t.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(t){this.uniforms.uLine[0]=t}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(t){this.uniforms.uLine[1]=t}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(t){this.uniforms.uLine[2]=t}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(t){this.uniforms.uLine[3]=t?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(t){this.uniforms.uNoise[0]=t}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(t){this.uniforms.uNoise[1]=t}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(t){this.uniforms.uVignette[0]=t}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(t){this.uniforms.uVignette[1]=t}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(t){this.uniforms.uVignette[2]=t}};Oe(to,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ws=to;var Is=`
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
}`,ks=`struct KawaseBlurUniforms {
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
}`,Ps=`
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
`,Bs=`struct KawaseBlurUniforms {
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
}`,Os=Object.defineProperty,Ds=(e,t,n)=>t in e?Os(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,N=(e,t,n)=>(Ds(e,typeof t!="symbol"?t+"":t,n),n);const oo=class ro extends he{constructor(...t){let n=t[0]??{};(typeof n=="number"||Array.isArray(n))&&(cr("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},t[1]!==void 0&&(n.quality=t[1]),t[2]!==void 0&&(n.clamp=t[2])),n={...ro.DEFAULT_OPTIONS,...n};const o=ue.from({vertex:{source:Ee,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Bs:ks,entryPoint:"mainFragment"}}),r=de.from({vertex:Ne,fragment:n?.clamp?Ps:Is,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),N(this,"uniforms"),N(this,"_pixelSize",{x:0,y:0}),N(this,"_clamp"),N(this,"_kernels",[]),N(this,"_blur"),N(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(t,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,n,o,r);else{const l=Z.getSameSizeTexture(n);let c=n,f=l,u;const d=this._quality-1;for(let p=0;p<d;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,c,f,!0),u=c,c=f,f=u;a=this._kernels[d]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,c,o,r),Z.returnTexture(l)}}get strength(){return this._blur}set strength(t){this._blur=t,this._generateKernels()}get quality(){return this._quality}set quality(t){this._quality=Math.max(1,Math.round(t)),this._generateKernels()}get kernels(){return this._kernels}set kernels(t){Array.isArray(t)&&t.length>0?(this._kernels=t,this._quality=t.length,this._blur=Math.max(...t)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(t){if(typeof t=="number"){this.pixelSizeX=this.pixelSizeY=t;return}if(Array.isArray(t)){this.pixelSizeX=t[0],this.pixelSizeY=t[1];return}this._pixelSize=t}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(t){this.pixelSize.x=t}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(t){this.pixelSize.y=t}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((t,n)=>t+n+.5,0))}_generateKernels(){const t=this._blur,n=this._quality,o=[t];if(t>0){let r=t;const i=t/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};N(oo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Fs=oo;var Ms=`in vec2 vTextureCoord;
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
`,Ls=`struct AdvancedBloomUniforms {
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
`,As=`
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
`,zs=`struct ExtractBrightnessUniforms {
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
`,Rs=Object.defineProperty,_s=(e,t,n)=>t in e?Rs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,io=(e,t,n)=>(_s(e,typeof t!="symbol"?t+"":t,n),n);const so=class ao extends he{constructor(t){t={...ao.DEFAULT_OPTIONS,...t};const n=ue.from({vertex:{source:Ee,entryPoint:"mainVertex"},fragment:{source:zs,entryPoint:"mainFragment"}}),o=de.from({vertex:Ne,fragment:As,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:t.threshold,type:"f32"}}}}),io(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(t){this.uniforms.uThreshold=t}};io(so,"DEFAULT_OPTIONS",{threshold:.5});let Us=so;var Ns=Object.defineProperty,Es=(e,t,n)=>t in e?Ns(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Y=(e,t,n)=>(Es(e,typeof t!="symbol"?t+"":t,n),n);const lo=class co extends he{constructor(t){t={...co.DEFAULT_OPTIONS,...t};const n=ue.from({vertex:{source:Ee,entryPoint:"mainVertex"},fragment:{source:Ls,entryPoint:"mainFragment"}}),o=de.from({vertex:Ne,fragment:Ms,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:t.bloomScale,type:"f32"},uBrightness:{value:t.brightness,type:"f32"}},uMapTexture:Xt.WHITE}}),Y(this,"uniforms"),Y(this,"bloomScale",1),Y(this,"brightness",1),Y(this,"_extractFilter"),Y(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Us({threshold:t.threshold}),this._blurFilter=new Fs({strength:t.kernels??t.blur,quality:t.kernels?void 0:t.quality}),Object.assign(this,t)}apply(t,n,o,r){const i=Z.getSameSizeTexture(n);this._extractFilter.apply(t,n,i,!0);const s=Z.getSameSizeTexture(n);this._blurFilter.apply(t,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,t.applyFilter(this,n,o,r),Z.returnTexture(s),Z.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(t){this._extractFilter.threshold=t}get kernels(){return this._blurFilter.kernels}set kernels(t){this._blurFilter.kernels=t}get blur(){return this._blurFilter.strength}set blur(t){this._blurFilter.strength=t}get quality(){return this._blurFilter.quality}set quality(t){this._blurFilter.quality=t}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this._blurFilter.pixelSize=t}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(t){this._blurFilter.pixelSizeX=t}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(t){this._blurFilter.pixelSizeY=t}};Y(lo,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Vs=lo;const js=K,Hs=(e,t)=>(n,o)=>{const r=new Set;if(ur(n)){const f=R(n)?.items;if(f!==void 0){const u=ot(D(Ae(f))).filter(d=>d!==void 0);for(const d of u)r.add(d)}}const s=o*n.gameSpeed,a=Math.max(1,Math.ceil(s/t)),l=s/a;for(let f=0;f<a;f++){const u=e(n,l);for(const d of u)r.add(d)}const c=R(n)?.items??js;for(const f of r)c[f.id]===void 0&&r.delete(f);return r},J=.33,Xs=fr()==="mobile"?-4:16,Ke=yt.h-yt.w/2,Gs=j.heels;class qs{constructor(t,n){this.renderContext=t,this.childRenderer=n;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:i}}=t,{edgeLeftX:s,edgeRightX:a,frontSide:l,topEdgeY:c}=dn(o.roomJson);this.#r=s+l.x,this.#s=a+l.x;const f=(a+s)/2;this.#i={x:r.x/2-f,y:r.y-Xs-l.y-Math.abs(f/2)},this.#t=this.#i.x+this.#r<0,this.#e=this.#i.x+this.#s>r.x,this.#o=this.#i.y+c-Ke<0;const u=this.childRenderer.output.graphics;if(u===void 0)throw new Error("can't scroll a renderer without graphics");const d={sound:this.childRenderer.output.sound,graphics:new w({children:[u],label:`RoomScrollRenderer(${o.id})`})};(i?.showBoundingBoxes??fn.displaySettings.showBoundingBoxes)!=="none"&&d.graphics.addChild($s(t.room.roomJson)),this.output=d}#n=!1;#t;#e;#o;#r;#s;#i;output;tick(t){const{general:{upscale:{gameEngineScreenSize:n},gameState:o}}=this.renderContext,{deltaMS:r}=t,i=oe(o);if(i===void 0)return;const s=dr(i.state.position),a=M(s,this.#i),l={x:this.#t&&a.x<n.x*J?Math.min(-this.#r,n.x*J-s.x):this.#e&&a.x>n.x*(1-J)?Math.max(n.x-this.#s,n.x*(1-J)-s.x):this.#i.x,y:this.#o&&a.y<n.y*J?n.y*J-s.y:this.#i.y},c=this.output.graphics;if(!this.#n)c.x=l.x,c.y=l.y;else{const u=Gs*r,d=pe(c,l),p=Kt(d);if(p>u){const v={x:d.x/p,y:d.y/p};c.x-=v.x*u,c.y-=v.y*u}else c.x=l.x,c.y=l.y}this.#n=!0,this.childRenderer.tick(t)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const $s=e=>{const{edgeLeftX:t,edgeRightX:n,frontSide:o,topEdgeY:r}=dn(e);return new gn().rect(t+o.x,r-Ke,n-t,o.y-r+Ke).stroke("red").rect(t+o.x,r,n-t,o.y-r).stroke("blue")},Ht=({crtFilter:e},t)=>[e?new ws({lineContrast:t?.3:0,vignetting:t?.4:.2}):void 0,e?new Vs({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Js{constructor(t,n){this.app=t,this.gameState=n;try{const o=g.getState(),r=pr(o);if(this.#s.connect(xt.destination),t.stage.addChild(this.#r),t.stage.scale=r,R(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#a(o);return}}#n;#t;#e;#o;#r=new w({label:"MainLoop/world"});#s=xt.createGain();#i=Hs(ys,yr);#a(t){g.dispatch(br(hr(t)))}#l(){const{gameMenus:{userSettings:{displaySettings:t}}}=g.getState();this.#n=Ht(t,!0),this.#t=Ht(t,!1)}tickAndCatch=t=>{try{this.tick(t)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#a(o)}};tick=({deltaMS:t})=>{const n=g.getState(),o=mr(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i}},upscale:{upscale:s}}=g.getState(),a=!o&&!(r?.uncolourised??fn.displaySettings.uncolourised),l=gr(n),c=vr(n);(this.#e?.renderContext.general.colourised!==a||this.#e?.renderContext.onScreenControls!==l||this.#e?.renderContext.inputDirectionMode!==c)&&(this.#e?.destroy(),this.#e=new _i({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s,editor:!1},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#e.output));const f=R(this.gameState);this.#e.tick({screenSize:s.gameEngineScreenSize,room:f});const u=o?We:this.#i(this.gameState,t),d=R(this.gameState);if(this.#o?.renderContext.room!==d||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o){if(this.#o?.destroy(),d){const p={general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s,editor:!1},room:d};this.#o=new qs(p,new Er(p)),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#s)}else this.#o=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#o?.tick({progression:this.gameState.progression,movedItems:u,deltaMS:t}),o?this.app.stage.filters=this.#n:this.app.stage.filters=this.#t};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#s.disconnect(),this.#o?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}xr.add(vn,yn,xn,Sn,Tn,Cn,wn,In,kn,Pn,Bn,Dn,On,Fn,Mn,Ln,An,zn,Rn,_n,Un);Cr.defaultOptions.scaleMode="nearest";const na=async(e,t)=>{const n=new Vr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=Sr;const o=g.getState().gameMenus.currentGame,r=St({campaign:e,inputStateTracker:t,savedGame:o});o!==void 0?g.dispatch(Tr(o.store.gameMenus)):(g.dispatch(Tt(r.characterRooms.head.id)),g.dispatch(Tt(r.characterRooms.heels.id)));const i=new Js(n,r).start();return{campaign:e,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=oe(r);a!==void 0&&pn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return R(r)},get gameState(){return r},reincarnateFrom(s){St({campaign:e,inputStateTracker:t,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}};export{na as default,na as gameMain};
