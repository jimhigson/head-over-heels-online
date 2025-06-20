import{be as de,bf as fe,b4 as ho,bb as Gt,av as m,o as D,aB as w,U as h,bH as mo,af as v,bI as go,bJ as vo,Y as x,a7 as pe,bK as yo,bL as xo,bM as qt,bN as G,bO as Ye,bP as et,bQ as $t,bR as So,bS as To,I as R,bT as Co,bU as wo,ah as Fe,bV as Pe,W as Jt,$ as M,P as S,aG as _,aI as tt,bW as Io,bX as Yt,bY as Zt,bZ as Qt,b_ as L,x as F,b$ as Wt,c0 as ze,c1 as pt,c2 as Kt,c3 as ko,a5 as K,c4 as be,c5 as en,c6 as X,aN as Me,c7 as tn,c8 as ee,c9 as Re,j as Po,ag as W,ca as j,_ as te,cb as Bo,d as Oo,cc as Do,cd as Fo,ce as Mo,aa as ne,cf as Lo,cg as Ao,ch as zo,ci as Ze,cj as Ro,ck as nn,cl as _o,cm as ve,X as nt,cn as Uo,co as No,cp as Eo,y as H,cq as on,ac as rn,cr as bt,cs as sn,Z as he,ct as an,a2 as ln,T as cn,a1 as Vo,J as oe,Q as Qe,cu as Xe,cv as He,bm as ht,cw as Ge,cx as ye,cy as jo,aw as Xo,cz as Ho,cA as re,cB as mt,aq as Go,cC as qo,cD as ot,cE as $o,aO as Jo,cF as Yo,cG as Zo,i as rt,cH as Qo,cI as Wo,cJ as Ko,cK as er,cL as tr,cM as nr,cN as or,cO as gt,aj as vt,a3 as rr,cP as un,N as dn,K as fn,ae as ir,ab as yt,cQ as sr,cR as ar,cS as lr,cT as cr,a as ur,bk as Z,cU as dr,cV as ie,cW as pn,cX as fr,cY as pr,cZ as xt,c_ as br,c$ as St,d0 as hr,d1 as mr,d2 as gr,d3 as vr,d4 as yr,d5 as xr,d6 as Sr,aA as Tr,d7 as Cr,d8 as Tt,d9 as wr,ak as Ct,aU as Ir}from"./App-BzcrcKKs.js";import{f as kr,c as bn,m as _e,a as it,b as hn,r as Pr,o as Br}from"./changeCharacterRoom-BbDPeK5J.js";import{F as me,g as y,n as Le,h as Be,j as Or,k as B,s as C,r as Dr,l as Fr,m as A,P as Mr,o as Lr,q as Ar,t as zr,v as Rr,w as Oe,x as I,y as mn,B as st,D as _r,E as ce,G as gn,H as wt,I as It,J as qe,K as kt,L as Ur,M as Nr,N as Er,O as xe,Q as Vr,R as jr,A as Xr,a as Hr}from"./stopAppAutoRendering-DG8U1Ee8.js";import{G as vn}from"./CanvasTextGenerator-uvVy84yz.js";import"./index-Bch07tm-.js";var Gr=`
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
`,qr=`in vec2 aPosition;
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
`,$r=`
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
}`;class g extends me{constructor(t){const n=t.gpu,o=Pt({source:$r,...n}),r=de.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=t.gl,s=Pt({source:Gr,...i}),a=fe.from({vertex:qr,fragment:s}),l=new ho({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:Gt.EMPTY}})}}function Pt(e){const{source:t,functions:n,main:o}=e;return t.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const at=`
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
    `,lt=`
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
	`;class yn extends g{constructor(){super({gl:{functions:`
                ${at}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${lt}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}yn.extension={name:"color",type:m.BlendMode};class xn extends g{constructor(){super({gl:{functions:`
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
            `}})}}xn.extension={name:"color-burn",type:m.BlendMode};class Sn extends g{constructor(){super({gl:{functions:`
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
                `}})}}Sn.extension={name:"color-dodge",type:m.BlendMode};class Tn extends g{constructor(){super({gl:{functions:`
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
                `}})}}Tn.extension={name:"darken",type:m.BlendMode};class Cn extends g{constructor(){super({gl:{functions:`
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
            `}})}}Cn.extension={name:"difference",type:m.BlendMode};class wn extends g{constructor(){super({gl:{functions:`
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
            `}})}}wn.extension={name:"divide",type:m.BlendMode};class In extends g{constructor(){super({gl:{functions:`
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
            `}})}}In.extension={name:"exclusion",type:m.BlendMode};class kn extends g{constructor(){super({gl:{functions:`
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
                `}})}}kn.extension={name:"hard-light",type:m.BlendMode};class Pn extends g{constructor(){super({gl:{functions:`
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
            `}})}}Pn.extension={name:"hard-mix",type:m.BlendMode};class Bn extends g{constructor(){super({gl:{functions:`
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
            `}})}}Bn.extension={name:"lighten",type:m.BlendMode};class On extends g{constructor(){super({gl:{functions:`
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
                `}})}}On.extension={name:"linear-burn",type:m.BlendMode};class Dn extends g{constructor(){super({gl:{functions:`
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
            `}})}}Dn.extension={name:"linear-dodge",type:m.BlendMode};class Fn extends g{constructor(){super({gl:{functions:`
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
            `}})}}Fn.extension={name:"linear-light",type:m.BlendMode};class Mn extends g{constructor(){super({gl:{functions:`
                ${at}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${lt}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Mn.extension={name:"luminosity",type:m.BlendMode};class Ln extends g{constructor(){super({gl:{functions:`
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
            `}})}}Ln.extension={name:"negation",type:m.BlendMode};class An extends g{constructor(){super({gl:{functions:`
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
                `}})}}An.extension={name:"overlay",type:m.BlendMode};class zn extends g{constructor(){super({gl:{functions:`
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
                `}})}}zn.extension={name:"pin-light",type:m.BlendMode};class Rn extends g{constructor(){super({gl:{functions:`
                ${at}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${lt}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Rn.extension={name:"saturation",type:m.BlendMode};class _n extends g{constructor(){super({gl:{functions:`
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
                `}})}}_n.extension={name:"soft-light",type:m.BlendMode};class Un extends g{constructor(){super({gl:{functions:`
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
                `}})}}Un.extension={name:"subtract",type:m.BlendMode};class Nn extends g{constructor(){super({gl:{functions:`
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
                `}})}}Nn.extension={name:"vivid-light",type:m.BlendMode};const q=14,Jr=2,Yr=Math.cos(30*(Math.PI/180)),Zr=40;class Qr{constructor(t){this.renderContext=t;const{inputDirectionMode:n,general:{colourised:o}}=t;this.arrowSprites={away:y({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:q,y:-14,filter:B}),right:y({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:q,y:q,filter:B}),towards:y({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:q,filter:B}),left:y({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:B}),...n!=="4-way"?{awayRight:y({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:q*Math.SQRT2,filter:B}),towardsRight:y({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:q*Math.SQRT2,filter:B}),towardsLeft:y({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:B}),awayLeft:y({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:B})}:{}},this.output.addChild(this.#n),this.output.addChild(new vn().circle(0,0,Zr).fill("#00000000"));for(const r of D(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#n.filters=o?Le:Be}output=new w({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#n=y({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#t;handlePointerEnter=t=>{this.#t!==void 0&&this.stopCurrentPointer(),this.#t=t.pointerId,this.usePointerLocation(t)};stopCurrentPointer=()=>{this.#t=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=h};usePointerLocation=t=>{if(t.pointerId!==this.#t)return;const n=mo(v.getState()),{x:o,y:r}=this.output,{x:i,y:s}=t,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),d=(s/n-r)/(l/2),u=go({x:-c,y:-d}),f=vo(u,Yr),p=x(f,Jr);this.renderContext.inputStateTracker.hudInputState.directionVector=p};tick(){const{renderContext:{inputStateTracker:{directionVector:t}}}=this;if(v.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=pe(t)>yo?xo(t):void 0;for(const[r,i]of qt(this.arrowSprites))i.filters=r===o?Or:B}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const We={colourised:{jump:C.pastelBlue,fire:C.highlightBeige,carry:C.moss,carryAndJump:C.midRed,menu:C.lightGrey,map:C.lightGrey},zx:{jump:G.zxBlue,fire:G.zxYellow,carry:G.zxGreen,carryAndJump:G.zxRed,menu:G.zxWhite,map:G.zxWhite}},Ae=Symbol(),En=Symbol(),Vn=Symbol(),Se=({colourised:e,button:{which:t}})=>{const n=new w({label:"depress"}),o=new w({label:"arcadeButton"});o.addChild(n);const r=y("button");e?r.filters=Dr(We.colourised[t]):o.filters=new Fr(We.zx[t]),n.addChild(r);const i=new w({label:"surface"}),s=y({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[En]=r,o[Ae]=i,o[Vn]=n,o},se=(e,...t)=>{e[Ae].removeChildren();for(const n of t)n!==void 0&&e[Ae].addChild(n)},Te=(e,t)=>{e[En].texture=Ye().textures[t?"button.pressed":"button"],e[Vn].y=t?1:0},Bt=(e,t,n)=>{n&&(e[Ae].filters=t?Ar():Le)},Ot=({which:e},t,n)=>{const o=A(new w,n);return o.filters=new Mr({white:t?Lr(We.colourised[e]):C.pureBlack}),o},jn=(e,t,n)=>{const o=zr(e);if(!n.room)return;const r=o({renderContext:{general:t.general,item:e,room:n.room,uncolourisedLayer:void 0},tickContext:{lastRenderRoomTime:$t,movedItems:et,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output};function Xn({room:{roomTime:e},movingItem:t}){t.state.action!=="death"&&(Rr(t)||Oe(t)||(t.state.action="death",t.state.expires=e+kr))}const z=(e,t)=>e==="infinite"||t==="infinite"?"infinite":e+t,ue=e=>e==="infinite"?Number.POSITIVE_INFINITY:e,Wr=3e3,Hn=e=>{const{gameState:t,movingItem:n,touchedItem:o,room:r}=e,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:d}=t;if(d[a]?.[i]===!0)return;const u=()=>{l[i]&&(d[a]===void 0&&(d[a]={}),d[a][i]=!0)},f=(p,b=r)=>{const T=Jt(o),P={type:"floatingText",id:`floatingText-${i}`,...Yt,fixedZIndex:Io,aabb:h,state:{...tt(),position:M(T,{z:S.h/2}),expires:c+Wr},config:{textLines:p,appearanceRoomTime:c}};_({room:b,item:P})};switch(s.gives){case"hooter":{const p=Pe(n);if(p===void 0)return;p.hasHooter=!0,f(["hooter","collected"]),u();break}case"doughnuts":{const p=Pe(n);if(p===void 0)return;p.doughnuts=z(p.doughnuts,6),f(["+6","doughnuts"]),u();break}case"bag":{const p=Fe(n);if(p===void 0)return;p.hasBag=!0,f(["bag","collected"]),u();break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,f(["🛡","shield"]),u();break}case"fast":{if(Pe(n)===void 0)return;f(["⚡","fast steps"]),u();break}case"jumps":{const p=Fe(n);if(p===void 0)return;p.bigJumps+=10,f(["♨","10","big jumps"]),u();break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=z(n.state.head.lives,2),n.state.heels.lives=z(n.state.heels.lives,2),f(["+2","lives","each"])):(n.state.lives=z(n.state.lives,2),f(["+2","lives"])),u();break;case"scroll":v.dispatch(wo(s.page)),u();break;case"reincarnation":{const p=To(t,v.getState(),i),b=R(p.gameState);if(!b)throw new Error("how are we saving from a pickup if there is no current room?");f(["reincarnation","point","restored"],b),v.dispatch(Co(p)),f(["reincarnation","point","saved"]),u();break}case"crown":{v.dispatch(So(s.planet)),f([s.planet,"liberated!"]),u();break}}},Kr=({gameState:e,movingItem:t,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Zt(i,o)<=0||t.state.action!=="death"&&bn({playableItem:t,gameState:e,toRoomId:r,sourceItem:n,changeType:"portal"})},ei=({movingItem:e,movementVector:t,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Qt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0};e.state.position=M(e.state.position,s)};function ti({movingItem:e}){e.state.autoWalk=!1}const O=(e,...t)=>F(...t)(e.touchedItem),ae=(e,...t)=>F(...t)(e.movingItem),Gn=e=>L(e.movingItem),ni=e=>L(e.touchedItem),oi=e=>Wt(e.touchedItem),Dt=e=>{switch(!0){case O(e,"stopAutowalk"):ti(e);break;case oi(e):Xn(e);break;case O(e,"portal"):Kr(e);break;case O(e,"pickup"):Hn(e);break;case O(e,"doorFrame"):ei(e);break}},Ue=(e,t)=>{const{head:n,heels:o,headOverHeels:r}=ze(t.items);if(r!==void 0)return Oe(r)?void 0:r;const i=n===void 0||Oe(n)||n.state.action==="death"?void 0:pt(n.state.position,e),s=o===void 0||Oe(o)||o.state.action==="death"?void 0:pt(o.state.position,e);return i===void 0?o:s===void 0||i<s?n:o},ct=e=>e[Math.floor(Math.random()*e.length)],Ft=(e,t,n)=>{switch(n){case"opposite":return{x:t.x===0?e.x:-e.x,y:t.y===0?e.y:-e.y,z:0};case"clockwise":return{x:-e.y,y:e.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const o=ct([-1,1]);return{x:t.x===0?o*e.y:0,y:t.y===0?o*e.x:0,z:0}}}},qn=150,V=Object.freeze({movementType:"vel",vels:{walking:h}}),Ne=e=>Kt(e)?j[e.config.which]:j[e.type],Mt=S.w/2,ri=({state:{position:e,vels:{walking:t}}},n,o,r)=>{const i=j.homingBot;if(!ee(t,Re))return{movementType:"steady"};for(const s of D(ze(n.items))){if(s===void 0)continue;const a=be(s.state.position,e);if(Math.abs(a.y)<Mt)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Mt)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ii=(e,t,n,o)=>{const{state:{position:r,facing:i}}=e,s=Ue(r,t);if(s===void 0)return I;const a=be(s?.state.position,r),l=Me[tn(a)];return ee(l,i)?I:{movementType:"steady",stateDelta:{facing:l}}},si=(e,t,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=e;if(i===null)return V;const l=Ue(r,t);if(l===void 0)return I;if(s+qn>t.roomTime)return I;const c=be(l?.state.position,r),d=Math.abs(c.x)<Math.abs(c.y)?"x":"y",u=Math.abs(c[d])>S.w/4?d:Po(d),f=Ne(e),p={...h,[u]:c[u]>0?f:-f},b=X(p),T=!ee(b,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:b,...T?{timeOfLastDirectionChange:t.roomTime}:W}}},Lt=(e,t,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=e;if(s===null)return V;const a=Ue(i,t);if(a===void 0)return V;const l=a.state.position,c=S.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return V;const u=be(a?.state.position,i),f=Ne(e),p=(1+Math.sqrt(2))/2,b=f*p,T=x({...u,z:0},b/en(u)*(r?-1:1));return{movementType:"vel",vels:{walking:T},stateDelta:{facing:X(T)}}},$e=(e,t,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=e;if(s===null)return V;if(!(te(i,h)||Math.random()<o/1e3))return I;const l=ct(r),c=Me[l];return{movementType:"vel",vels:{walking:x(c,Ne(e))},stateDelta:{facing:Me[l]}}},ai=(e,t,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=e;return s===null?V:ee(i,Re)?{movementType:"vel",vels:{walking:x(r,Ne(e))}}:I},Ce=({movingItem:e,touchedItem:{state:{position:t},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=e;if(!a||(e.state.durationOfTouch+=o,e.state.durationOfTouch<qn))return;const d=_e(i,c,t,n);if(d.x===0&&d.y===0)return;const u=Ft(s,d,r);e.state.vels.walking=u;const f=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;e.state.facing=x(ee(u,Re)?Ft(l,d,r):X(u),f),e.state.durationOfTouch=0},li=({movingItem:e,movementVector:t})=>{t.z<0||(e.state.vels.walking=h)},ci=(e,t,n,o)=>{if(!e.state.activated||Kt(e)&&e.state.busyLickingDoughnutsOffFace)return V;switch(e.config.movement){case"patrol-randomly-diagonal":return $e(e,t,n,o,Do);case"patrol-randomly-xy8":return $e(e,t,n,o,Oo);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return $e(e,t,n,o,Bo);case"towards-tripped-on-axis-xy4":return ri(e,t);case"towards-on-shortest-axis-xy4":return si(e,t);case"back-forth":case"clockwise":return ai(e);case"turn-to-player":return ii(e,t);case"towards-analogue":return Lt(e,t);case"towards-analogue-unless-planet-crowns":return Lt(e,t,n,o,ko(v.getState()));default:throw e.config,new Error("this should be unreachable")}},ui=e=>{const{movingItem:t,touchedItem:n}=e;if(K(n,t))switch(t.config.movement){case"patrol-randomly-xy4":Ce(e,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Ce(e,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Ce(e,"opposite");break;case"clockwise":Ce(e,"clockwise");break;case"towards-tripped-on-axis-xy4":li(e);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":return;default:throw t.config,new Error("this should be unreachable")}},di=({touchedItem:e,gameState:{progression:t},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=e;if(e.state.touchedOnProgression=t,!(t===i+1||t===i))switch(o.type){case"in-room":{const s=e.state.setting=r==="left"?"right":"left";fi(o,s,n.items,n.roomTime);break}case"in-store":{v.dispatch(Fo(o.path));break}}},fi=(e,t,n,o)=>{for(const r of e.modifies)for(const[i,s]of Mo(r.newState))if(Object.hasOwn(s,t))for(const a of r.targets){const l=n[a];if(l===void 0)continue;if(l.type!==r.expectType)throw new Error(`item "${l.id}" is of type "${l.type}" - does not match expected type "${r.expectType}" from switch config ${JSON.stringify(e,null,2)}`);const c=l;c.state={...l.state,[i]:s[t],switchedAtRoomTime:o,switchedSetting:t}}},pi=({movingItem:e,touchedItem:t})=>{if(!K(e))return;const{state:{position:n},aabb:o}=t,r=_e(e.state.position,e.aabb,n,o);if(r.x===0&&r.y===0)return;const i=X(r),s=x(i,-.05);return t.state.vels.sliding=s,!1},bi=({movingItem:e,touchedItem:t})=>{if(!K(t))return;const n=e.state.vels.sliding;if(te(n,h))return;const{state:{position:o},aabb:r}=e,i=_e(t.state.position,t.aabb,o,r);return Zt(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=h),!1},hi=({movingItem:e,room:t,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=_e(e.state.position,e.aabb,a,l);if(c.x===0&&c.y===0)return;const d=X(c);for(const u of s){const f=t.items[u],p=x(d,-.025*o);f.state.facing=p,it({room:t,subjectItem:f,gameState:r,pusher:n,posDelta:p,deltaMS:o,onTouch:i})}},mi=1e3/12,we=e=>{const t=e-Ro,o=t/_o*nn;return(t+.5*Ze*o**2)/o},gi={head:we(ve.head),headOnSpring:we(ve.head+S.h),heels:we(ve.heels),heelsOnSpring:we(ve.heels+S.h)},At=(e,t,n)=>{const o=e.type==="headOverHeels"||e.type==="heels"&&n?"head":e.type;return gi[`${o}${t?"OnSpring":""}`]},vi=e=>!(e===null||Ao(e)&&mn(e)||zo(e)&&e.config.gives==="scroll"||L(e)&&e.state.standingOnItemId===null),yi=e=>e.state.jumped&&e.state.position.z===e.state.jumpStartZ&&e.state.jumpStartTime+mi>(e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime),$n=(e,t,n)=>{const{state:{standingOnItemId:o}}=e,{inputStateTracker:r}=n,i=ne(o,t);if(yi(e))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:At(e,!1,e.type==="heels"&&e.state.isBigJump)}},stateDelta:{}};if(!(e.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&vi(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...e.type==="heels"?{isBigJump:!1}:{}}}:I;const a=e.type==="heels"&&e.state.bigJumps>0,l=Lo(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:At(e,l,a)}},stateDelta:{action:"moving",jumped:!0,...e.type==="heels"?a?{bigJumps:e.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:e.state.position.z,jumpStartTime:e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime}}},xi=({vel:e,acc:t,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=pe(e),a=Math.max(i,Math.min(o,s+t*r)),l=Math.min(a,o);return x(n,l)},Si={movementType:"vel",vels:{walking:h}},Jn=(e,t,n,o)=>{const r=Ti(e,t,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=pe(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:e.state.walkDistance+i*o},e.type==="head"&&e.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:e.state.gameWalkDistance+i*o})}return e.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!te(r.vels.walking,h)&&(r.stateDelta={...r.stateDelta,walkStartFacing:e.state.facing}),r},Ti=(e,t,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:d,walkDistance:u,walkStartFacing:f,vels:{walking:p,gravity:b}}}=e,T=o===e.id,P=T?n.currentActionPress("jump"):"released",dt=T?n.directionVector:h,k=l===null&&b.z<0,po=i==="head"&&st(e.state)>0&&l!==null,ft=i==="headOverHeels"?k?"head":"heels":po?"heels":i,U=a?c:dt,je=j[ft];if(d!==null||s==="death")return Si;if(i==="heels"){if(l===null)return e.state.jumped?{movementType:"vel",vels:{walking:nt(p,x(p,Uo*r))},stateDelta:{action:k?"falling":"jumping"}}:{movementType:"vel",vels:{walking:h},stateDelta:{action:"falling"}};if(P!=="released"){const ge=X(ee(U,Re)?c:U),bo=F("spring")(ne(l,t))?1:No;return{movementType:"vel",vels:{walking:x({...ge,z:0},je*bo)},stateDelta:{facing:ge}}}}if(pe(U)!==0)return k?{movementType:"vel",vels:{walking:x({...U,z:0},je)},stateDelta:{facing:U,action:"falling"}}:{movementType:"vel",vels:{walking:xi({vel:p,acc:Eo[ft],deltaMS:r,maxSpeed:je,unitD:U,minSpeed:0})},stateDelta:{facing:U,action:"moving"}};if(u>0&&u<1){const ge=te(f,c)?1:0;return{movementType:"position",posDelta:x(c,ge-u),stateDelta:{action:k?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:h},stateDelta:{action:k?"falling":"idle"}}},zt=e=>H(e.movingItem)&&on(e.movingItem,e.touchedItem,Math.abs(e.movementVector.z)),Yn=(e,t)=>{let n=h;for(const o of t){if(o.movementType==="position"&&(n=M(n,o.posDelta)),o.movementType==="vel"&&(H(e)||F("lift")(e)))for(const[i,s]of qt(o.vels)){const a={...h,...s};e.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(e.state={...e.state,...r})}return n},Rt=e=>{if(e.touchedItem.type==="firedDoughnut"&&(e.movingItem.type==="head"||e.movingItem.type==="firedDoughnut"))return;const{touchedItem:{state:{disappearing:t}}}=e;if(t!==null&&(t.byType===void 0||t.byType.includes(e.movingItem.type))&&(t.on==="touch"||t.on==="stand"&&zt(e))){if(zt(e)&&Gn(e)){rn({above:e.movingItem,below:e.touchedItem});const o=[$n(e.movingItem,e.room,e.gameState,e.deltaMS),Jn(e.movingItem,e.room,e.gameState,e.deltaMS)];Yn(e.movingItem,o)}hn(e)}};function Ci(e){const t=e.movingItem.type==="monster"?e.movingItem:e.touchedItem;t.config.which!=="emperorsGuardian"&&(t.state.busyLickingDoughnutsOffFace=!0)}const ut=e=>{Gn(e)&&Dt(e),ni(e)&&Dt({...e,movingItem:e.touchedItem,touchedItem:e.movingItem}),O(e,...bt)&&pi(e),ae(e,...bt)&&bi(e),(ae(e,"monster")&&O(e,"firedDoughnut")||ae(e,"firedDoughnut")&&O(e,"monster"))&&Ci(e),(ae(e,"monster")||ae(e,"movingPlatform"))&&ui(e),O(e,"switch")&&di(e),O(e,"joystick")&&hi(e,ut),e.touchedItem.state.disappearing&&Rt(e),e.movingItem.state.disappearing&&K(e.touchedItem,e.movingItem)&&Rt({...e,movingItem:e.touchedItem,touchedItem:e.movingItem})},wi=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="heels"?e.state:e.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=e;if(!a)return;const c=he(t.items).filter(an),d=s===null?Zn(e,t):void 0;for(const p of c)p.state.wouldPickUpNext=!1;d!==void 0&&(d.state.wouldPickUpNext=!0);const u=r.currentActionPress("carry");if(u==="tap"||r.currentActionPress("jump")==="hold"&&u==="hold")if(s===null){if(d===void 0)return;Ii(t,i,d),r.actionsHandled.add("carry")}else{if(e.state.standingOnItemId===null||!Qn(e,ln(t.items)))return;s.state.position=l,_({room:t,item:s}),it({subjectItem:e,gameState:n,room:t,posDelta:{x:0,y:0,z:s.aabb.z},pusher:e,forceful:!0,deltaMS:o,onTouch:ut}),i.carrying=null,r.actionsHandled.add("carry")}},Ii=(e,t,n)=>{t.carrying=n,n.state.wouldPickUpNext=!1,cn({room:e,item:n})},Zn=(e,t)=>sn(e,he(t.items).filter(an)),Qn=(e,t)=>{const n={position:M(e.state.position,{z:S.h})},o=Vo({id:e.id,aabb:e.aabb,state:n},t);for(const r of o)if(K(r,e)){if(!H(r))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with non-free",r),!1;if(!Qn(r,t))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Je=-11,ki={jump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],d=c===null?!1:c.type==="teleporter"&&mn(c),u=e.actions.every(p=>t.currentActionPress(p)!=="released"),f=a===void 0?Se({colourised:n,button:e}):a;if(s?.pressed!==u&&Te(f,u),d!==s?.standingOnTeleporter)if(d)se(f,y({textureId:"teleporter",y:5}),y({animationId:"teleporter.flashing",y:5}));else{const p=Ot(e,n,"JUMP");p.y=Je,se(f,p)}return{output:f,renderProps:{pressed:u,standingOnTeleporter:d,colourised:n}}},carry({renderContext:e,currentRendering:t,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=e,{currentPlayable:s,room:a}=n,l=t?.renderProps,c=t?.output,d=s&&Fe(s),u=d?.hasBag??!1,f=d?.carrying??null,p=f===null&&a!==void 0&&Zn(s,a)!==void 0,b=o.actions.every(k=>r.currentActionPress(k)!=="released"),T=u&&!p&&f===null,P=c===void 0?Se({colourised:i,button:o}):c;if(P.visible=u,u&&(T!==l?.disabled&&Bt(P,T,i),P.visible=!0,l?.pressed!==b&&Te(P,b),u!==l?.hasBag||f!==l?.carrying)){let k;f!==null?k=jn(f,e,n):u&&(k=y({textureId:"bag",y:-2})),se(P,k)}return{output:P,renderProps:{pressed:b,hasBag:u,colourised:i,carrying:f,disabled:T}}},fire({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&Pe(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,d=e.actions.every(p=>t.currentActionPress(p)!=="released"),u=s===void 0?Se({colourised:n,button:e}):s,f=l||ue(c)>0;if(u.visible=f,f&&(i?.pressed!==d&&Te(u,d),l!==i?.hasHooter||c!==i?.doughnuts)){let p;l?p=y({textureId:"hooter",y:-3}):ue(c)>0&&(p=y({textureId:"doughnuts",y:-2}));const b=A(new w,c);b.y=Je,b.filters=gn,se(u,p,b),Bt(u,c===0,n)}return{output:u,renderProps:{pressed:d,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,l=(r&&Fe(r))?.hasBag??!1,c=e.actions.every(f=>t.currentActionPress(f)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let u;if(s===void 0){u=Se({colourised:n,button:e});const f=Ot(e,n,"C+J");f.y=Je,se(u,f)}else u=s;return l?(u.visible=!0,i?.pressed!==c&&Te(u,c)):u.visible=!1,{output:u,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:e}){if(e!==void 0)return"no-update";const t=y("hud.char.Menu");return t.scale=2,t.filters=B,{output:t,renderProps:W}},map({currentRendering:e}){if(e!==void 0)return"no-update";const t=ce({label:"mapText",outline:!0});return A(t,"MAP"),{output:t,renderProps:W}}};class $ extends _r{constructor(t){const n=ki[t.button.which];super(t,n)}}const Pi=30,Bi=15,Oi=42,Di=36,Fi=44,Mi=20;class Li{constructor(t){this.renderContext=t;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=t;this.#t={mainButtonNest:new w({label:"mainButtonNest"}),buttons:{jump:new $({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new $({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new $({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new $({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new $({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new $({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new Qr({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#t,{mainButtonNest:s,joystick:a}=this.#t;for(const{renderContext:{button:{which:l}},output:c}of D(i))l==="menu"||l==="map"?this.#n.addChild(c):s.addChild(c);i.jump.output.y=Bi,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=Pi,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#n.addChild(s),this.#n.addChild(a.output),this.#e()}#n=new w({label:"OnScreenControls"});#t;#e(){const{renderContext:{general:{gameState:{inputStateTracker:t}}}}=this;for(const n of D(this.#t.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)t.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)t.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)t.hudInputState[r]=!1})}}#o(t){this.#t.mainButtonNest.x=t.x-Fi,this.#t.mainButtonNest.y=t.y-Mi,this.#t.joystick.output.x=Oi,this.#t.joystick.output.y=t.y-Di,this.#t.buttons.map.output.x=t.x-4*8}tick(t){const{screenSize:n}=t,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of D(this.#t.buttons))r.tick({...t,currentPlayable:oe(o)});this.#t.joystick.tick()}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t.joystick.destroy()}}Qe.frames.button.frame;const Ai=250,zi=e=>e?48:24,Ri=e=>e?68:56,_i=(e,t)=>e?t.x/2-24:80,Ui=e=>e?72:24,Ni=e=>e?88:0,_t=112,le=e=>e==="heels"?1:-1;class Ei{constructor(t){this.renderContext=t;const{onScreenControls:n}=t;for(const o of Xe)this.#n.addChild(this.#e[o].sprite),this.#n.addChild(this.#e[o].livesText),this.#n.addChild(this.#e[o].shield.container),this.#n.addChild(this.#e[o].extraSkill.container);n||(this.#n.addChild(this.#e.head.doughnuts.container),this.#n.addChild(this.#e.head.hooter.container),this.#n.addChild(this.#e.heels.bag.container),this.#n.addChild(this.#e.heels.carrying.container)),this.#n.addChild(this.#e.fps),this.#e.fps.filters=[wt],this.#e.fps.y=He.h,this.#o(),n&&(this.#t=new Li({general:t.general,inputDirectionMode:t.inputDirectionMode}),this.#n.addChild(this.#t.output))}#n=new w({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#e={head:{sprite:this.#s("head"),livesText:ce({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#s("heels"),livesText:ce({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new w({label:"heelsCarrying"})}},fps:ce({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:t}}}}}=this;for(const n of Xe){const{sprite:o,livesText:r}=this.#e[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{t[`swop.${n}`]=!0}),i.on("pointerup",()=>{t[`swop.${n}`]=!1}),i.on("pointerleave",()=>{t[`swop.${n}`]=!1})}}#r({textureId:t,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new w({label:i});s.pivot={x:4,y:16};const a=new ht({texture:Ye().textures[t],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:It,y:n?0:8});s.addChild(a);const l=ce({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=He.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=gn),{text:l,icon:a,container:s}}#s(t){const n=new ht(Ye().textures[`${t}.walking.${t==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:t}){this.#e.head.hooter.container.x=this.#e.head.doughnuts.container.x=(t.x>>1)+le("head")*_t,this.#e.head.doughnuts.container.y=t.y-Ge.h-8,this.#e.heels.carrying.container.y=t.y-Ge.h,this.#e.heels.carrying.container.x=this.#e.heels.bag.container.x=(t.x>>1)+le("heels")*_t,this.#e.heels.bag.container.y=this.#e.head.hooter.container.y=t.y-8,this.#e.fps.x=t.x-He.w*2}#a(t,n){return t?n?Le:qe:n?kt:Be}#l(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ye(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#e.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=jn(s,this.renderContext,t);c!==void 0&&a.addChild(c)}a.filters=this.#a(!0,o),this.#e.heels.bag.icon.filters=this.#a(i,o)}#d(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ye(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#e.head.hooter.icon.filters=this.#a(i,o),this.#e.head.doughnuts.icon.filters=this.#a(s!==0,o),A(this.#e.head.doughnuts.text,s)}#f(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=ye(r,t),{text:s,container:a}=this.#e[t].shield,{text:l,container:c}=this.#e[t].extraSkill,d=Ur(i),u=d>0||!o;a.visible=u,u&&(A(s,d),a.y=n.y-Ni(o)),c.x=a.x=(n.x>>1)+le(t)*_i(o,n);const f=i===void 0?0:t==="head"?st(i):i.bigJumps,p=f>0||!o;c.visible=p,p&&(A(l,f),c.y=n.y-Ui(o))}#c(t,n){const{currentCharacterName:o}=t;return o===n||o==="headOverHeels"}#p(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#c(r,t),a=this.#e[t].sprite;s?a.filters=i?Le:qe:a.filters=i?kt:Be,a.x=(n.x>>1)+le(t)*Ri(o),a.y=n.y-Ge.h}#b(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=ye(r,t)?.lives??0,a=this.#e[t].livesText;a.x=(n.x>>1)+le(t)*zi(o),a.y=n.y,A(a,s??0)}#h(t){const{room:n}=t;if(n===void 0)return;const o=Nr(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;Be.targetColor=o.hud.dimmed[r?"dimmed":"original"],Er.targetColor=o.hud.dimmed[r?"basic":"original"],It.targetColor=o.hud.icons[r?"basic":"original"],qe.targetColor=o.hud.lives.original,this.#e.head.livesText.filters=r?xe.colourised.head[this.#c(i,"head")?"active":"inactive"]:xe.original,this.#e.heels.livesText.filters=r?xe.colourised.heels[this.#c(i,"heels")?"active":"inactive"]:xe.original}#u=$t;#m(){if(jo(v.getState())){if(performance.now()>this.#u+Ai){const t=Xo.shared.FPS;A(this.#e.fps,Math.round(t)),wt.targetColor=t>100?C.white:t>58?C.moss:t>55?C.pastelBlue:t>50?C.metallicBlue:t>40?C.pink:C.midRed,this.#u=performance.now()}this.#e.fps.visible=!0}else this.#e.fps.visible=!1}tick(t){this.#h(t);for(const n of Xe)this.#b(n,t),this.#p(n,t),this.#f(n,t);this.#i(t),this.#d(t),this.#l(t),this.#m(),this.#t?.tick(t)}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t?.destroy()}}const Ut={movementType:"vel",vels:{gravity:h}},Vi=(e,t,n,o)=>{if(!K(e))return Ut;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=e,l=Ho[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=ne(s,t);return F("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-Ze*o,-l)}}}:Ut}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-Ze*o,-l)}}}},Nt=S.h,Et=.001,ji=({totalDistance:e,currentAltitude:t,direction:n})=>{const o=mt**2/(2*re);if(n==="up"){if(t<=o)return Math.max(Et,Math.sqrt(2*re*Math.max(t,0)));if(t>=e-o){const r=Math.max(0,e-t);return Math.max(Et,Math.sqrt(2*re*r))}else return mt}else if(t>=e-o){const r=Math.max(0,e-t);return Math.min(-.001,-Math.sqrt(2*re*r))}else return t<=o?Math.min(-.001,-Math.sqrt(2*re*Math.max(t,0))):-.036},Xi=({config:{bottom:e,top:t},state:{direction:n,position:{z:o}}})=>{const r=e*Nt,i=t*Nt,s=ji({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Vt={movementType:"vel",vels:{movingFloor:h}},Hi=(e,t,n,o)=>{if(L(e)&&e.state.teleporting!==null)return Vt;const{state:{standingOnItemId:r}}=e,i=ne(r,t);if(i===null||!F("conveyor")(i))return Vt;const{config:{direction:s}}=i,l=F("heels")(e)&&e.state.action==="moving"&&tn(e.state.facing)===Go(s)?j.heels:qo;return{movementType:"vel",vels:{movingFloor:x(Me[s],l)}}};function*Gi(e,t,n,o){for(;(e.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<t.roomTime;){const{positionDelta:r}=e.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const qi=S.w*.8,$i=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="head"?e.state:e.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=e,d=X(c);if(r.currentActionPress("fire")==="tap"&&a&&ue(s)>0){const u={type:"firedDoughnut",...Yt,config:W,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...tt(),position:M(l,x(d,qi),e.type==="headOverHeels"?{z:S.h}:h),vels:{fired:x(d,j.firedDoughnut)},disappearing:{on:"touch"}}};_({room:t,item:u}),i.doughnuts=z(i.doughnuts,-1),r.actionsHandled.add("fire")}},Wn=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Ji=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Ie=S.w*3,Yi=(e,t)=>{const{state:{position:n}}=e,{state:{position:o}}=t;return n.x>o.x-Ie&&n.x<o.x+Ie&&n.y>o.y-Ie&&n.y<o.y+Ie},jt=(e,t,n,o,r)=>{if(r&&e.state.activated)return I;const i=Ue(e.state.position,t);return i===void 0?I:Yi(e,i)?Wn:Ji},Zi=(e,t,n,o)=>e.state.activated?I:ot(e.state.stoodOnBy,t).some(L)?Wn:I,Qi=(e,t,n,o)=>{switch(e.config.activated){case"after-player-near":return jt(e,t,n,o,!0);case"while-player-near":return jt(e,t,n,o,!1);case"on-stand":return Zi(e,t);case"off":case"on":return I;default:throw e.config,new Error(`unrecognised item.config.activation ${e.config.activated} in ${e.id}:
        ${JSON.stringify(e,null,2)}`)}},Wi=(e,t,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:d}}=e,{roomTime:u}=t;if(s!==d&&i+c<u){const f=$o(Jo(`${r}-${s}`,{...l,position:h},t.roomJson));if(f===void 0)throw new Error("emitter failed to create a new item");f.state.position=nt(a,x(f.aabb,.5)),_({room:t,item:f}),e.state.lastEmittedAtRoomTime=t.roomTime+c,e.state.quantityEmitted++}},Xt=nn*Qe.animations["particle.fade"].length*(1/Qe.animations["particle.fade"].animationSpeed),Ki=20,es=38,ts=.5,ke=S.w/2;let ns=0;const Kn=(e,t)=>Math.random()<e*(t/1e3),eo=(e,t,n,o)=>({id:`particle.${e}.${ns++}`,type:"particle",aabb:h,config:{forCharacter:t},state:{...tt(),expires:o+Xt+Math.random()*Xt,position:n}}),to=(e,t,n,o)=>{if(!Kn(n,o))return;const r={...M(Jt(e),{x:Math.random()*ke-ke/2,y:Math.random()*ke-ke/2}),z:e.state.position.z};_({room:t,item:eo(e.id,e.type,r,t.roomTime)})},os=(e,t,n)=>{!(st(e.state)>0)||e.state.standingOnItemId===null||pe(e.state.vels.walking)<Zo||to(e,t,Ki,n)},rs=(e,t,n)=>{const{isBigJump:o}=e.state;o&&e.state.standingOnItemId===null&&(e.state.vels.gravity.z<=0||to(e,t,es,n))},is=(e,t)=>{const{head:n,heels:o}=ze(e.items);n!==void 0&&os(n,e,t),o!==void 0&&rs(o,e,t)},ss=(e,t,n)=>{if(!Kn(ts,n))return;const o=ct(Yo),r=M(t.state.position,{x:o==="x"?0:Math.random()*S.w,y:o==="y"?0:Math.random()*S.d,z:o==="z"?S.h:Math.random()*S.h});_({room:e,item:eo(t.id,"crown",r,e.roomTime)})};function*as(e,t,n,o){H(e)&&(yield Vi(e,t,n,o),yield Hi(e,t),yield*Gi(e,t)),L(e)?(yield Jn(e,t,n,o),e.id===n.currentCharacterName&&(yield Vr(e,t,n,o),yield $n(e,t,n),Wo(e)&&wi(e,t,n,o),Ko(e)&&$i(e,t,n))):er(e)?yield Xi(e):tr(e)?(yield Qi(e,t,n,o),yield ci(e,t,n,o)):nr(e)&&Wi(e,t)}const ls=(e,t,n,o)=>{if(!H(e)||e.state.standingOnItemId===null)return;const r=ne(e.state.standingOnItemId,t);L(e)&&r.type==="pickup"&&Hn({gameState:n,movingItem:e,touchedItem:r,room:t});const{state:{disappearing:i}}=r;i!==null&&(i.byType===void 0||i.byType.includes(e.type))&&hn({touchedItem:r,gameState:n,room:t})},cs=(e,t,n,o)=>{if(L(e)&&e.state.standingOnItemId!==null){const s=ne(e.state.standingOnItemId,t);(Wt(s)||s.type==="spikes")&&Xn({room:t,movingItem:e})}const r=[...as(e,t,n,o)];ls(e,t,n);let i=Yn(e,r);(H(e)||F("lift")(e)||F("firedDoughnut")(e))&&(i=M(i,...rt(D(e.state.vels)).map(s=>x(s,o)))),Qo(e)&&ss(t,e,o),it({subjectItem:e,posDelta:i,gameState:n,room:t,deltaMS:o,onTouch:ut})},us=(e,t)=>{const n=e.characterRooms.headOverHeels;if(t.state.head.lives=z(t.state.head.lives,-1),t.state.heels.lives=z(t.state.heels.lives,-1),t.state.head.lastDiedAt=t.state.head.gameTime,t.state.heels.lastDiedAt=t.state.heels.gameTime,z(t.state.head.lives,t.state.heels.lives)===0)return;const r=ue(t.state.head.lives)>0,i=ue(t.state.heels.lives)>0;if(t.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";e.currentCharacterName=c,E(e,t);const d=gt(t)[c],u=Q({gameState:e,playableItems:[d],roomId:n.id});e.characterRooms={[c]:u},e.entryState={[c]:vt(d)};return}if(e.entryState.headOverHeels!==void 0){E(e,t);const c=Q({gameState:e,playableItems:[t],roomId:n.id});e.characterRooms={headOverHeels:c};return}else{const{head:c,heels:d}=gt(t);if(E(e,c),E(e,d),rr(c,d)){const u=un({head:c,heels:d});E(e,u,"heels");const f=Q({gameState:e,playableItems:[u],roomId:n.id});e.characterRooms={headOverHeels:f},e.entryState={headOverHeels:vt(u)};return}else{const u=Q({gameState:e,playableItems:[c,d],roomId:n.id});e.characterRooms={head:u,heels:u};return}}},Q=({gameState:e,playableItems:t,roomId:n})=>{const{campaign:o}=e,r=ir({roomJson:o.rooms[n],roomPickupsCollected:e.pickupsCollected[n]??W,scrollsRead:v.getState().gameMenus.scrollsRead});for(const i of t)_({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Pr(r,e);return r},E=(e,t,n=t.id)=>{const o=e.entryState[n];t.state={...t.state,...o,expires:null,standingOnItemId:null}},ds=(e,t)=>{const n=dn(e,fn(t.type));if(t.state.lives!=="infinite"&&t.state.lives--,t.state.lastDiedAt=t.state.gameTime,t.type==="heels"&&(t.state.carrying=null),t.state.lives===0){delete e.characterRooms[t.id],n!==void 0&&(e.currentCharacterName=n.type);return}else{const o=e.characterRooms[t.type];E(e,t);const r=n===void 0?void 0:e.characterRooms[n.type];if(o===r){if(e.entryState.headOverHeels!==void 0){const a=un({head:t.id==="head"?t:o.items.head,heels:t.id==="heels"?t:o.items.heels});E(e,a);const l=Q({gameState:e,playableItems:[a],roomId:o.id});e.characterRooms={headOverHeels:l},e.currentCharacterName="headOverHeels";return}_({room:o,item:t});return}else{const s=Q({gameState:e,playableItems:[t],roomId:o.id});e.characterRooms[t.id]=s;return}}},fs=(e,t)=>{t.type==="headOverHeels"?us(e,t):ds(e,t),oe(e)===void 0&&v.dispatch(or({offerReincarnation:!0}))},ps=e=>{for(const t of he(e.items))try{for(const n of ot(t.state.stoodOnBy,e)){if(!e.items[n.id]){yt(n,e);continue}if(!on(n,t)){yt(n,e);const o=sn(n,ln(e.items));o!==void 0&&rn({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${t.id}"`,{cause:n})}},bs=2*Br,hs=(e,t,n)=>{e.state.latentMovement.push({moveAtRoomTime:t.roomTime+bs,positionDelta:n})},ms=(e,t,n)=>{for(const o of e){const r=n[o.id];if(r===void 0)continue;const s={...nt(o.state.position,r),z:0};if(!te(s,h))for(const a of ot(o.state.stoodOnBy,t))hs(a,t,s)}},gs=(e,t)=>{for(const n of he(e.items))!H(n)||e.roomTime===n.state.actedOnAt.roomTime||sr(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=ar(n.state.position),t.add(n))},vs=(e,t)=>e.state.expires!==null&&e.state.expires<t.roomTime,ys=e=>{for(const t of he(e.items)){const n=t.state.position;t.state.position=lr(n)}},xs=(e,t)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[e.type]??0,r=n[t.type]??0;return o-r},Ss=(e,t,n)=>{e.progression++,e.gameTime+=n,t.roomTime+=n;const o=oe(e);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,e.characterRooms.head===e.characterRooms.heels){const i=dn(e,fn(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Ts=(e,t)=>{const n=R(e);if(n===void 0)return et;Ss(e,n,t);const o=Object.fromEntries(cr(n.items).map(([s,a])=>[s,a.state.position]));for(const s of D(n.items))vs(s,n)&&(cn({room:n,item:s}),L(s)&&fs(e,s));const r=Object.values(n.items).sort(xs);for(const s of r){const a=oe(e);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{cs(s,n,e,t)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}is(n,t),ps(n),ys(n);const i=new Set(rt(D(n.items)).filter(s=>o[s.id]===void 0||!te(s.state.position,o[s.id])));return ms(i,n,o),gs(n,i),i};var Ee=`in vec2 aPosition;
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
`,Ve=`struct GlobalFilterUniforms {
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
}`,Cs=`precision highp float;
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
`,ws=`struct CRTUniforms {
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
}`,Is=Object.defineProperty,ks=(e,t,n)=>t in e?Is(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,De=(e,t,n)=>(ks(e,typeof t!="symbol"?t+"":t,n),n);const no=class oo extends me{constructor(t){t={...oo.DEFAULT_OPTIONS,...t};const n=de.from({vertex:{source:Ve,entryPoint:"mainVertex"},fragment:{source:ws,entryPoint:"mainFragment"}}),o=fe.from({vertex:Ee,fragment:Cs,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:t.seed,type:"f32"},uTime:{value:t.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),De(this,"uniforms"),De(this,"seed"),De(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,t)}apply(t,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,t.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(t){this.uniforms.uLine[0]=t}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(t){this.uniforms.uLine[1]=t}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(t){this.uniforms.uLine[2]=t}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(t){this.uniforms.uLine[3]=t?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(t){this.uniforms.uNoise[0]=t}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(t){this.uniforms.uNoise[1]=t}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(t){this.uniforms.uVignette[0]=t}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(t){this.uniforms.uVignette[1]=t}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(t){this.uniforms.uVignette[2]=t}};De(no,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Ps=no;var Bs=`
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
}`,Os=`struct KawaseBlurUniforms {
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
}`,Ds=`
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
`,Fs=`struct KawaseBlurUniforms {
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
}`,Ms=Object.defineProperty,Ls=(e,t,n)=>t in e?Ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,N=(e,t,n)=>(Ls(e,typeof t!="symbol"?t+"":t,n),n);const ro=class io extends me{constructor(...t){let n=t[0]??{};(typeof n=="number"||Array.isArray(n))&&(ur("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},t[1]!==void 0&&(n.quality=t[1]),t[2]!==void 0&&(n.clamp=t[2])),n={...io.DEFAULT_OPTIONS,...n};const o=de.from({vertex:{source:Ve,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Fs:Os,entryPoint:"mainFragment"}}),r=fe.from({vertex:Ee,fragment:n?.clamp?Ds:Bs,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),N(this,"uniforms"),N(this,"_pixelSize",{x:0,y:0}),N(this,"_clamp"),N(this,"_kernels",[]),N(this,"_blur"),N(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(t,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,n,o,r);else{const l=Z.getSameSizeTexture(n);let c=n,d=l,u;const f=this._quality-1;for(let p=0;p<f;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,c,d,!0),u=c,c=d,d=u;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,c,o,r),Z.returnTexture(l)}}get strength(){return this._blur}set strength(t){this._blur=t,this._generateKernels()}get quality(){return this._quality}set quality(t){this._quality=Math.max(1,Math.round(t)),this._generateKernels()}get kernels(){return this._kernels}set kernels(t){Array.isArray(t)&&t.length>0?(this._kernels=t,this._quality=t.length,this._blur=Math.max(...t)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(t){if(typeof t=="number"){this.pixelSizeX=this.pixelSizeY=t;return}if(Array.isArray(t)){this.pixelSizeX=t[0],this.pixelSizeY=t[1];return}this._pixelSize=t}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(t){this.pixelSize.x=t}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(t){this.pixelSize.y=t}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((t,n)=>t+n+.5,0))}_generateKernels(){const t=this._blur,n=this._quality,o=[t];if(t>0){let r=t;const i=t/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};N(ro,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let As=ro;var zs=`in vec2 vTextureCoord;
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
`,Rs=`struct AdvancedBloomUniforms {
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
`,_s=`
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
`,Us=`struct ExtractBrightnessUniforms {
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
`,Ns=Object.defineProperty,Es=(e,t,n)=>t in e?Ns(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,so=(e,t,n)=>(Es(e,typeof t!="symbol"?t+"":t,n),n);const ao=class lo extends me{constructor(t){t={...lo.DEFAULT_OPTIONS,...t};const n=de.from({vertex:{source:Ve,entryPoint:"mainVertex"},fragment:{source:Us,entryPoint:"mainFragment"}}),o=fe.from({vertex:Ee,fragment:_s,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:t.threshold,type:"f32"}}}}),so(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(t){this.uniforms.uThreshold=t}};so(ao,"DEFAULT_OPTIONS",{threshold:.5});let Vs=ao;var js=Object.defineProperty,Xs=(e,t,n)=>t in e?js(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Y=(e,t,n)=>(Xs(e,typeof t!="symbol"?t+"":t,n),n);const co=class uo extends me{constructor(t){t={...uo.DEFAULT_OPTIONS,...t};const n=de.from({vertex:{source:Ve,entryPoint:"mainVertex"},fragment:{source:Rs,entryPoint:"mainFragment"}}),o=fe.from({vertex:Ee,fragment:zs,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:t.bloomScale,type:"f32"},uBrightness:{value:t.brightness,type:"f32"}},uMapTexture:Gt.WHITE}}),Y(this,"uniforms"),Y(this,"bloomScale",1),Y(this,"brightness",1),Y(this,"_extractFilter"),Y(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Vs({threshold:t.threshold}),this._blurFilter=new As({strength:t.kernels??t.blur,quality:t.kernels?void 0:t.quality}),Object.assign(this,t)}apply(t,n,o,r){const i=Z.getSameSizeTexture(n);this._extractFilter.apply(t,n,i,!0);const s=Z.getSameSizeTexture(n);this._blurFilter.apply(t,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,t.applyFilter(this,n,o,r),Z.returnTexture(s),Z.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(t){this._extractFilter.threshold=t}get kernels(){return this._blurFilter.kernels}set kernels(t){this._blurFilter.kernels=t}get blur(){return this._blurFilter.strength}set blur(t){this._blurFilter.strength=t}get quality(){return this._blurFilter.quality}set quality(t){this._blurFilter.quality=t}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this._blurFilter.pixelSize=t}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(t){this._blurFilter.pixelSizeX=t}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(t){this._blurFilter.pixelSizeY=t}};Y(co,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Hs=co;const Gs=W,qs=(e,t)=>(n,o)=>{const r=new Set;if(dr(n)){const d=R(n)?.items;if(d!==void 0){const u=rt(D(ze(d))).filter(f=>f!==void 0);for(const f of u)r.add(f)}}const s=o*n.gameSpeed,a=Math.max(1,Math.ceil(s/t)),l=s/a;for(let d=0;d<a;d++){const u=e(n,l);for(const f of u)r.add(f)}const c=R(n)?.items??Gs;for(const d of r)c[d.id]===void 0&&r.delete(d);return r},$s=e=>{const t={},n=Object.values(e.items).filter(o=>o.type==="door");for(const{config:{direction:o},position:{x:r,y:i}}of n)Qt(o)==="x"?i===0?t.towards=!0:i===e.size.y&&(t.away=!0):r===0?t.right=!0:r===e.size.x&&(t.left=!0);return t},Js=e=>{const t=$s(e),n=t.right?-.5:0,o=e.size.x+(t.left?.5:0),r=t.towards?-.5:0,i=e.size.y+(t.away?.5:0);return{blockXMin:n,blockXMax:o,blockYMin:r,blockYMax:i,sidesWithDoors:t}},fo=e=>{const{blockXMax:t,blockXMin:n,blockYMax:o,blockYMin:r,sidesWithDoors:i}=Js(e),s=ie({x:e.size.x+(i.right?.5:0),y:-r}).x,a=ie({x:-n,y:e.size.y+(i.towards?.5:0)}).x,l=ie({x:e.size.x,y:e.size.y}).y,c=ie({x:n,y:r}),d=ie({x:t,y:o});return{blockXMin:n,blockXMax:t,blockYMin:r,blockYMax:o,edgeLeftX:s,edgeRightX:a,topEdgeY:l,frontSide:c,backSide:d,sidesWithDoors:i}},J=.33,Ys=pr()==="mobile"?-4:16,Ke=xt.h-xt.w/2,Zs=j.heels;class Qs{constructor(t,n){this.renderContext=t,this.childRenderer=n;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:i}}=t,{edgeLeftX:s,edgeRightX:a,frontSide:l,topEdgeY:c}=fo(o.roomJson);this.#r=s+l.x,this.#s=a+l.x;const d=(a+s)/2;this.#i={x:r.x/2-d,y:r.y-Ys-l.y-Math.abs(d/2)},this.#t=this.#i.x+this.#r<0,this.#e=this.#i.x+this.#s>r.x,this.#o=this.#i.y+c-Ke<0;const u=this.childRenderer.output.graphics;if(u===void 0)throw new Error("can't scroll a renderer without graphics");const f={sound:this.childRenderer.output.sound,graphics:new w({children:[u],label:`RoomScrollRenderer(${o.id})`})};(i?.showBoundingBoxes??pn.displaySettings.showBoundingBoxes)!=="none"&&f.graphics.addChild(Ws(t.room.roomJson)),this.output=f}#n=!1;#t;#e;#o;#r;#s;#i;output;tick(t){const{general:{upscale:{gameEngineScreenSize:n},gameState:o}}=this.renderContext,{deltaMS:r}=t,i=oe(o);if(i===void 0)return;const s=fr(i.state.position),a=M(s,this.#i),l={x:this.#t&&a.x<n.x*J?Math.min(-this.#r,n.x*J-s.x):this.#e&&a.x>n.x*(1-J)?Math.max(n.x-this.#s,n.x*(1-J)-s.x):this.#i.x,y:this.#o&&a.y<n.y*J?n.y*J-s.y:this.#i.y},c=this.output.graphics;if(!this.#n)c.x=l.x,c.y=l.y;else{const u=Zs*r,f=be(c,l),p=en(f);if(p>u){const b={x:f.x/p,y:f.y/p};c.x-=b.x*u,c.y-=b.y*u}else c.x=l.x,c.y=l.y}this.#n=!0,this.childRenderer.tick(t)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Ws=e=>{const{edgeLeftX:t,edgeRightX:n,frontSide:o,topEdgeY:r}=fo(e);return new vn().rect(t+o.x,r-Ke,n-t,o.y-r+Ke).stroke("red").rect(t+o.x,r,n-t,o.y-r).stroke("blue")},Ht=({crtFilter:e},t)=>[e?new Ps({lineContrast:t?.3:0,vignetting:t?.4:.2}):void 0,e?new Hs({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Ks{constructor(t,n){this.app=t,this.gameState=n;try{const o=v.getState(),r=br(o);if(this.#s.connect(St.destination),t.stage.addChild(this.#r),t.stage.scale=r,R(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#a(o);return}}#n;#t;#e;#o;#r=new w({label:"MainLoop/world"});#s=St.createGain();#i=qs(Ts,Sr);#a(t){v.dispatch(hr(mr(t)))}#l(){const{gameMenus:{userSettings:{displaySettings:t}}}=v.getState();this.#n=Ht(t,!0),this.#t=Ht(t,!1)}tickAndCatch=t=>{try{this.tick(t)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#a(o)}};tick=({deltaMS:t})=>{const n=v.getState();if(gr(n))return;const o=vr(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i}},upscale:{upscale:s}}=v.getState(),a=!o&&!(r?.uncolourised??pn.displaySettings.uncolourised),l=yr(n),c=xr(n);(this.#e?.renderContext.general.colourised!==a||this.#e?.renderContext.onScreenControls!==l||this.#e?.renderContext.inputDirectionMode!==c)&&(this.#e?.destroy(),this.#e=new Ei({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s,editor:!1},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#e.output));const d=R(this.gameState);this.#e.tick({screenSize:s.gameEngineScreenSize,room:d});const u=o?et:this.#i(this.gameState,t),f=R(this.gameState);if(this.#o?.renderContext.room!==f||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o){if(this.#o?.destroy(),f){const p={general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s,editor:!1},room:f};this.#o=new Qs(p,new jr(p)),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#s)}else this.#o=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#o?.tick({progression:this.gameState.progression,movedItems:u,deltaMS:t}),o?this.app.stage.filters=this.#n:this.app.stage.filters=this.#t;try{this.app.render()}catch(p){throw new Error("Error in Pixi.js render",{cause:p})}};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#s.disconnect(),this.#o?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Tr.add(yn,xn,Sn,Tn,Cn,wn,In,kn,Pn,Bn,On,Fn,Dn,Mn,Ln,An,zn,Rn,_n,Un,Nn);Ir.defaultOptions.scaleMode="nearest";const aa=async(e,t)=>{const n=new Xr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1}),Hr(n),n.ticker.maxFPS=Cr;const o=v.getState().gameMenus.currentGame,r=Tt({campaign:e,inputStateTracker:t,savedGame:o});o!==void 0?v.dispatch(wr(o.store.gameMenus)):(v.dispatch(Ct(r.characterRooms.head.id)),v.dispatch(Ct(r.characterRooms.heels.id)));const i=new Ks(n,r).start();return{campaign:e,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=oe(r);a!==void 0&&bn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return R(r)},get gameState(){return r},reincarnateFrom(s){Tt({campaign:e,inputStateTracker:t,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}};export{aa as default,aa as gameMain};
