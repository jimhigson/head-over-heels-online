import{aB as ce,aC as ue,ap as co,ay as Ht,a8 as h,o as D,ae as C,n as p,bf as uo,_ as v,bg as fo,bh as bo,t as x,L as de,bi as po,bj as ho,bk as Xt,bl as G,bm as qe,a4 as We,bn as Gt,bo as mo,bp as go,ba as z,bq as vo,br as yo,W as Oe,bs as we,q as qt,y as R,Y as I,bt as j,bu as Ke,bv as xo,bw as Jt,bx as $t,by as So,bz as k,w as F,bA as Yt,bB as Le,bC as dt,bD as Zt,bE as To,J as K,bF as Me,bG as Qt,bH as H,bI as fe,bJ as Ae,e as Co,U as W,bK as V,x as ee,bL as Je,bM as Io,d as wo,bN as ko,bO as Po,bP as Bo,O as te,bQ as Oo,bR as Do,bS as Fo,bT as $e,bU as Lo,bV as Wt,bW as Mo,bX as me,r as et,bY as Ao,bZ as zo,b_ as _o,A as X,b$ as Kt,Q as en,c0 as ft,c1 as tn,u as be,c2 as nn,F as on,k as rn,E as Ro,bb as ne,j as Ye,c3 as Ee,c4 as Ve,aJ as bt,c5 as je,c6 as ge,c7 as Uo,a9 as No,c8 as Eo,c9 as oe,ca as pt,cb as Vo,cc as jo,cd as Ho,ce as tt,cf as Xo,cg as Go,i as nt,ch as qo,ci as Jo,cj as $o,ck as Yo,cl as Zo,cm as Qo,cn as ht,Z as mt,H as Wo,co as sn,be as an,S as ln,T as Ko,P as gt,cp as er,cq as tr,cr as nr,a5 as or,cs as rr,a as ir,aH as Z,ct as sr,cu as cn,cv as un,cw as ar,cx as lr,cy as vt,cz as yt,cA as cr,cB as ur,cC as dr,cD as fr,cE as br,cF as pr,ad as hr,cG as mr,cH as xt,cI as gr,$ as St,cJ as vr}from"./App-CB8J7ILr.js";import{f as yr,c as dn,m as ze,a as ot,b as fn,r as xr,o as Sr}from"./changeCharacterRoom-D_cioizY.js";import{F as pe,d as y,n as De,h as ke,e as Tr,f as P,s as T,r as Cr,g as Ir,i as M,P as wr,j as kr,k as Pr,l as Br,p as Or,m as Pe,o as B,t as bn,q as rt,v as Dr,w as ae,x as pn,y as Tt,z as Ct,B as He,D as It,E as Fr,G as Lr,H as Mr,I as ve,J as Ar,R as zr,A as _r}from"./roomRenderer-BAc6_N_o.js";import{G as hn}from"./Graphics-eqf3DrwF.js";import"./index-CvQMMo6S.js";var Rr=`
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
`,Ur=`in vec2 aPosition;
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
`,Nr=`
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
}`;class m extends pe{constructor(t){const n=t.gpu,o=wt({source:Nr,...n}),r=ce.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=t.gl,s=wt({source:Rr,...i}),a=ue.from({vertex:Ur,fragment:s}),c=new co({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:c,uBackTexture:Ht.EMPTY}})}}function wt(e){const{source:t,functions:n,main:o}=e;return t.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const it=`
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
	`;class mn extends m{constructor(){super({gl:{functions:`
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
                `}})}}mn.extension={name:"color",type:h.BlendMode};class gn extends m{constructor(){super({gl:{functions:`
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
            `}})}}gn.extension={name:"color-burn",type:h.BlendMode};class vn extends m{constructor(){super({gl:{functions:`
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
                `}})}}vn.extension={name:"color-dodge",type:h.BlendMode};class yn extends m{constructor(){super({gl:{functions:`
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
                `}})}}yn.extension={name:"darken",type:h.BlendMode};class xn extends m{constructor(){super({gl:{functions:`
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
            `}})}}xn.extension={name:"difference",type:h.BlendMode};class Sn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Sn.extension={name:"divide",type:h.BlendMode};class Tn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Tn.extension={name:"exclusion",type:h.BlendMode};class Cn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Cn.extension={name:"hard-light",type:h.BlendMode};class In extends m{constructor(){super({gl:{functions:`
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
            `}})}}In.extension={name:"hard-mix",type:h.BlendMode};class wn extends m{constructor(){super({gl:{functions:`
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
            `}})}}wn.extension={name:"lighten",type:h.BlendMode};class kn extends m{constructor(){super({gl:{functions:`
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
                `}})}}kn.extension={name:"linear-burn",type:h.BlendMode};class Pn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Pn.extension={name:"linear-dodge",type:h.BlendMode};class Bn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Bn.extension={name:"linear-light",type:h.BlendMode};class On extends m{constructor(){super({gl:{functions:`
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
            `}})}}On.extension={name:"luminosity",type:h.BlendMode};class Dn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Dn.extension={name:"negation",type:h.BlendMode};class Fn extends m{constructor(){super({gl:{functions:`
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
                `}})}}Fn.extension={name:"overlay",type:h.BlendMode};class Ln extends m{constructor(){super({gl:{functions:`
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
                `}})}}Ln.extension={name:"pin-light",type:h.BlendMode};class Mn extends m{constructor(){super({gl:{functions:`
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
            `}})}}Mn.extension={name:"saturation",type:h.BlendMode};class An extends m{constructor(){super({gl:{functions:`
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
                `}})}}An.extension={name:"soft-light",type:h.BlendMode};class zn extends m{constructor(){super({gl:{functions:`
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
                `}})}}zn.extension={name:"subtract",type:h.BlendMode};class _n extends m{constructor(){super({gl:{functions:`
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
                `}})}}_n.extension={name:"vivid-light",type:h.BlendMode};const q=14,Er=2,Vr=Math.cos(30*(Math.PI/180)),jr=40;class Hr{constructor(t){this.renderContext=t;const{inputDirectionMode:n,general:{colourised:o}}=t;this.arrowSprites={away:y({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:q,y:-14,filter:P}),right:y({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:q,y:q,filter:P}),towards:y({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:q,filter:P}),left:y({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:P}),...n!=="4-way"?{awayRight:y({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:q*Math.SQRT2,filter:P}),towardsRight:y({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:q*Math.SQRT2,filter:P}),towardsLeft:y({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:P}),awayLeft:y({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:P})}:{}},this.output.addChild(this.#n),this.output.addChild(new hn().circle(0,0,jr).fill("#00000000"));for(const r of D(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#n.filters=o?De:ke}output=new C({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#n=y({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#t;handlePointerEnter=t=>{this.#t!==void 0&&this.stopCurrentPointer(),this.#t=t.pointerId,this.usePointerLocation(t)};stopCurrentPointer=()=>{this.#t=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=p};usePointerLocation=t=>{if(t.pointerId!==this.#t)return;const n=uo(v.getState()),{x:o,y:r}=this.output,{x:i,y:s}=t,{width:a,height:c}=this.output.getLocalBounds(),l=(i/n-o)/(a/2),f=(s/n-r)/(c/2),u=fo({x:-l,y:-f}),d=bo(u,Vr),b=x(d,Er);this.renderContext.inputStateTracker.hudInputState.directionVector=b};tick(){const{renderContext:{inputStateTracker:{directionVector:t}}}=this;if(v.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=de(t)>po?ho(t):void 0;for(const[r,i]of Xt(this.arrowSprites))i.filters=r===o?Tr:P}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Ze={colourised:{jump:T.pastelBlue,fire:T.highlightBeige,carry:T.moss,carryAndJump:T.midRed,menu:T.lightGrey,map:T.lightGrey},zx:{jump:G.zxBlue,fire:G.zxYellow,carry:G.zxGreen,carryAndJump:G.zxRed,menu:G.zxWhite,map:G.zxWhite}},Fe=Symbol(),Rn=Symbol(),Un=Symbol(),ye=({colourised:e,button:{which:t}})=>{const n=new C({label:"depress"}),o=new C({label:"arcadeButton"});o.addChild(n);const r=y("button");e?r.filters=Cr(Ze.colourised[t]):o.filters=new Ir(Ze.zx[t]),n.addChild(r);const i=new C({label:"surface"}),s=y({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Rn]=r,o[Fe]=i,o[Un]=n,o},re=(e,...t)=>{e[Fe].removeChildren();for(const n of t)n!==void 0&&e[Fe].addChild(n)},xe=(e,t)=>{e[Rn].texture=qe().textures[t?"button.pressed":"button"],e[Un].y=t?1:0},kt=(e,t,n)=>{n&&(e[Fe].filters=t?Pr():De)},Pt=({which:e},t,n)=>{const o=M(new C,n);return o.filters=new wr({white:t?kr(Ze.colourised[e]):T.pureBlack}),o},Nn=(e,t,n)=>{const o=Br(e);if(!n.room)return;const r=o({renderContext:{general:t.general,item:e,room:n.room},tickContext:{lastRenderRoomTime:Gt,movedItems:We,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output};function En({room:{roomTime:e},movingItem:t}){t.state.action!=="death"&&(Or(t)||Pe(t)||(t.state.action="death",t.state.expires=e+yr))}const A=(e,t)=>e==="infinite"||t==="infinite"?"infinite":e+t,le=e=>e==="infinite"?Number.POSITIVE_INFINITY:e,Xr=3e3,Vn=e=>{const{gameState:t,movingItem:n,touchedItem:o,room:r}=e,{id:i,config:s}=o,{id:a,roomJson:{items:c},roomTime:l}=r,{pickupsCollected:f}=t;if(f[a]?.[i]===!0)return;c[i]&&(f[a]===void 0&&(f[a]={}),f[a][i]=!0);const u=(d,b=r)=>{const g=qt(o),S={type:"floatingText",id:`floatingText-${i}`,...Jt,fixedZIndex:xo,aabb:p,state:{...Ke(),position:R(g,{z:I.h/2}),expires:l+Xr},config:{textLines:d,appearanceRoomTime:l}};j({room:b,item:S})};switch(s.gives){case"hooter":{const d=we(n);d!==void 0&&(d.hasHooter=!0),u(["hooter","collected"]);break}case"doughnuts":{const d=we(n);d!==void 0&&(d.doughnuts=A(d.doughnuts,6)),u(["+6","doughnuts"]);break}case"bag":{const d=Oe(n);d!==void 0&&(d.hasBag=!0),u(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,u(["🛡","shield"]);break}case"fast":{const d=we(n);d!==void 0&&(d.fastStepsStartedAtDistance=d.gameWalkDistance),u(["⚡","fast steps"]);break}case"jumps":{const d=Oe(n);d!==void 0&&(d.bigJumps+=10),u(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=A(n.state.head.lives,2),n.state.heels.lives=A(n.state.heels.lives,2),u(["+2","lives","each"])):(n.state.lives=A(n.state.lives,2),u(["+2","lives"]));break;case"scroll":v.dispatch(yo(s.page));break;case"reincarnation":{const d=go(t,v.getState(),i),b=z(d.gameState);if(!b)throw new Error("how are we saving from a pickup if there is no current room?");u(["reincarnation","point","restored"],b),v.dispatch(vo(d)),u(["reincarnation","point","saved"]);break}case"crown":{v.dispatch(mo(s.planet)),u([s.planet,"liberated!"]);break}}},Gr=({gameState:e,movingItem:t,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;$t(i,o)<=0||t.state.action!=="death"&&dn({playableItem:t,gameState:e,toRoomId:r,sourceItem:n,changeType:"portal"})},qr=({movingItem:e,movementVector:t,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=So(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(t.y):Math.abs(t.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(t.x):Math.abs(t.x)*(o==="away"?-1:1),z:0};e.state.position=R(e.state.position,s)};function Jr({movingItem:e}){e.state.autoWalk=!1}const O=(e,...t)=>F(...t)(e.touchedItem),ie=(e,...t)=>F(...t)(e.movingItem),jn=e=>k(e.movingItem),$r=e=>k(e.touchedItem),Yr=e=>Yt(e.touchedItem),Bt=e=>{switch(!0){case O(e,"stopAutowalk"):Jr(e);break;case Yr(e):En(e);break;case O(e,"portal"):Gr(e);break;case O(e,"pickup"):Vn(e);break;case O(e,"doorFrame"):qr(e);break}},at=(e,t)=>{const{head:n,heels:o,headOverHeels:r}=Le(t.items);if(r!==void 0)return Pe(r)?void 0:r;const i=n===void 0||Pe(n)||n.state.action==="death"?void 0:dt(n.state.position,e),s=o===void 0||Pe(o)||o.state.action==="death"?void 0:dt(o.state.position,e);return i===void 0?o:s===void 0||i<s?n:o},Ot=(e,t,n)=>{switch(n){case"opposite":return{x:t.x===0?e.x:-e.x,y:t.y===0?e.y:-e.y,z:0};case"clockwise":return{x:-e.y,y:e.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const o=Xn([-1,1]);return{x:t.x===0?o*e.y:0,y:t.y===0?o*e.x:0,z:0}}}},Hn=150,Xn=e=>e[Math.floor(Math.random()*e.length)],_=Object.freeze({movementType:"vel",vels:{walking:p}}),_e=e=>Zt(e)?V[e.config.which]:V[e.type],Dt=I.w/2,Zr=({state:{position:e,vels:{walking:t}}},n,o,r)=>{const i=V.homingBot;if(!fe(t,Ae))return{movementType:"steady"};for(const s of D(Le(n.items))){if(s===void 0)continue;const a=Me(s.state.position,e);if(Math.abs(a.y)<Dt)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Dt)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Qr=(e,t,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=e;if(i===null)return _;const c=at(r,t);if(c===void 0)return B;if(s+Hn>t.roomTime)return B;const l=Me(c?.state.position,r),f=Math.abs(l.x)<Math.abs(l.y)?"x":"y",u=Math.abs(l[f])>I.w/4?f:Co(f),d=_e(e),b={...p,[u]:l[u]>0?d:-d},g=H(b),S=!fe(g,a);return{movementType:"vel",vels:{walking:b},stateDelta:{facing:g,...S?{timeOfLastDirectionChange:t.roomTime}:W}}},Ft=(e,t,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=e;if(s===null)return _;const a=at(i,t);if(a===void 0)return _;const c=a.state.position,l=I.w*3;if(!(i.x>c.x-l&&i.x<c.x+l&&i.y>c.y-l&&i.y<c.y+l))return _;const u=Me(a?.state.position,i),d=_e(e),b=(1+Math.sqrt(2))/2,g=d*b,S=x({...u,z:0},g/Qt(u)*(r?-1:1));return{movementType:"vel",vels:{walking:S},stateDelta:{facing:H(S)}}},Xe=(e,t,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=e;if(s===null)return _;if(!(ee(i,p)||Math.random()<o/1e3))return B;const c=Xn(r),l=Je[c];return{movementType:"vel",vels:{walking:x(l,_e(e))},stateDelta:{facing:Je[c]}}},Wr=(e,t,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=e;return s===null?_:fe(i,Ae)?{movementType:"vel",vels:{walking:x(r,_e(e))}}:B},Se=({movingItem:e,touchedItem:{state:{position:t},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:c},aabb:l}=e;if(!a||(e.state.durationOfTouch+=o,e.state.durationOfTouch<Hn))return;const f=ze(i,l,t,n);if(f.x===0&&f.y===0)return;const u=Ot(s,f,r);e.state.vels.walking=u;const d=r==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;e.state.facing=x(fe(u,Ae)?Ot(c,f,r):H(u),d),e.state.durationOfTouch=0},Kr=({movingItem:e,movementVector:t})=>{t.z<0||(e.state.vels.walking=p)},ei=(e,t,n,o)=>{if(!e.state.activated||Zt(e)&&e.state.busyLickingDoughnutsOffFace)return _;switch(e.config.movement){case"patrol-randomly-diagonal":return Xe(e,t,n,o,ko);case"patrol-randomly-xy8":return Xe(e,t,n,o,wo);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return Xe(e,t,n,o,Io);case"towards-tripped-on-axis-xy4":return Zr(e,t);case"towards-on-shortest-axis-xy4":return Qr(e,t);case"back-forth":case"clockwise":return Wr(e);case"unmoving":return _;case"towards-analogue":return Ft(e,t);case"towards-analogue-unless-planet-crowns":return Ft(e,t,n,o,To(v.getState()));default:throw e.config,new Error("this should be unreachable")}},ti=e=>{const{movingItem:t,touchedItem:n}=e;if(K(n,t))switch(t.config.movement){case"patrol-randomly-xy4":Se(e,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Se(e,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Se(e,"opposite");break;case"clockwise":Se(e,"clockwise");break;case"towards-tripped-on-axis-xy4":Kr(e);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw t.config,new Error("this should be unreachable")}},ni=({touchedItem:e,gameState:{progression:t},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=e;if(e.state.touchedOnProgression=t,!(t===i+1||t===i))switch(o.type){case"in-room":{const s=e.state.setting=r==="left"?"right":"left";oi(o,s,n.items,n.roomTime);break}case"in-store":{v.dispatch(Po(o.path));break}}},oi=(e,t,n,o)=>{for(const r of e.modifies)for(const[i,s]of Bo(r.newState))if(Object.hasOwn(s,t))for(const a of r.targets){const c=n[a];if(c===void 0)continue;if(c.type!==r.expectType)throw new Error(`item "${c.id}" is of type "${c.type}" - does not match expected type "${r.expectType}" from switch config ${JSON.stringify(e,null,2)}`);const l=c;l.state={...c.state,[i]:s[t],switchedAtRoomTime:o,switchedSetting:t}}},ri=({movingItem:e,touchedItem:t})=>{if(!K(e))return;const{state:{position:n},aabb:o}=t,r=ze(e.state.position,e.aabb,n,o);if(r.x===0&&r.y===0)return;const i=H(r),s=x(i,-.05);return t.state.vels.sliding=s,!1},ii=({movingItem:e,touchedItem:t})=>{if(!K(t))return;const n=e.state.vels.sliding;if(ee(n,p))return;const{state:{position:o},aabb:r}=e,i=ze(t.state.position,t.aabb,o,r);return $t(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=p),!1},si=({movingItem:e,room:t,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:c}=n,l=ze(e.state.position,e.aabb,a,c);if(l.x===0&&l.y===0)return;const f=H(l);for(const u of s){const d=t.items[u],b=x(f,-.025*o);d.state.facing=b,ot({room:t,subjectItem:d,gameState:r,pusher:n,posDelta:b,deltaMS:o,onTouch:i})}},ai=1e3/12,Te=e=>{const t=e-Lo,o=t/Mo*Wt;return(t+.5*$e*o**2)/o},li={head:Te(me.head),headOnSpring:Te(me.head+I.h),heels:Te(me.heels),heelsOnSpring:Te(me.heels+I.h)},Lt=(e,t,n)=>{const o=e.type==="headOverHeels"||e.type==="heels"&&n?"head":e.type;return li[`${o}${t?"OnSpring":""}`]},ci=e=>!(e===null||Do(e)&&bn(e)||Fo(e)&&e.config.gives==="scroll"||k(e)&&e.state.standingOnItemId===null),ui=e=>e.state.jumped&&e.state.position.z===e.state.jumpStartZ&&e.state.jumpStartTime+ai>(e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime),Gn=(e,t,n)=>{const{state:{standingOnItemId:o}}=e,{inputStateTracker:r}=n,i=te(o,t);if(ui(e))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Lt(e,!1,e.type==="heels"&&e.state.isBigJump)}},stateDelta:{}};if(!(e.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&ci(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...e.type==="heels"?{isBigJump:!1}:{}}}:B;const a=e.type==="heels"&&e.state.bigJumps>0,c=Oo(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Lt(e,c,a)}},stateDelta:{action:"moving",jumped:!0,...e.type==="heels"?a?{bigJumps:e.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:e.state.position.z,jumpStartTime:e.type==="headOverHeels"?e.state.head.gameTime:e.state.gameTime}}},di=({vel:e,acc:t,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=de(e),a=Math.max(i,Math.min(o,s+t*r)),c=Math.min(a,o);return x(n,c)},fi={movementType:"vel",vels:{walking:p}},qn=(e,t,n,o)=>{const r=bi(e,t,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=de(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:e.state.walkDistance+i*o},e.type==="head"&&e.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:e.state.gameWalkDistance+i*o})}return e.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ee(r.vels.walking,p)&&(r.stateDelta={...r.stateDelta,walkStartFacing:e.state.facing}),r},bi=(e,t,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:c,facing:l,teleporting:f,walkDistance:u,walkStartFacing:d,vels:{walking:b,gravity:g}}}=e,S=o===e.id,L=S?n.currentActionPress("jump"):"released",ct=S?n.directionVector:p,w=c===null&&g.z<0,ao=i==="head"&&rt(e.state)>0&&c!==null,ut=i==="headOverHeels"?w?"head":"heels":ao?"heels":i,U=a?l:ct,Ne=V[ut];if(f!==null||s==="death")return fi;if(i==="heels"){if(c===null)return e.state.jumped?{movementType:"vel",vels:{walking:et(b,x(b,Ao*r))},stateDelta:{action:w?"falling":"jumping"}}:{movementType:"vel",vels:{walking:p},stateDelta:{action:"falling"}};if(L!=="released"){const he=H(fe(U,Ae)?l:U),lo=F("spring")(te(c,t))?1:zo;return{movementType:"vel",vels:{walking:x({...he,z:0},Ne*lo)},stateDelta:{facing:he}}}}if(de(U)!==0)return w?{movementType:"vel",vels:{walking:x({...U,z:0},Ne)},stateDelta:{facing:U,action:"falling"}}:{movementType:"vel",vels:{walking:di({vel:b,acc:_o[ut],deltaMS:r,maxSpeed:Ne,unitD:U,minSpeed:0})},stateDelta:{facing:U,action:"moving"}};if(u>0&&u<1){const he=ee(d,l)?1:0;return{movementType:"position",posDelta:x(l,he-u),stateDelta:{action:w?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:p},stateDelta:{action:w?"falling":"idle"}}},Mt=e=>X(e.movingItem)&&Kt(e.movingItem,e.touchedItem,Math.abs(e.movementVector.z)),Jn=(e,t)=>{let n=p;for(const o of t){if(o.movementType==="position"&&(n=R(n,o.posDelta)),o.movementType==="vel"&&(X(e)||F("lift")(e)))for(const[i,s]of Xt(o.vels)){const a={...p,...s};e.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(e.state={...e.state,...r})}return n},At=e=>{if(e.touchedItem.type==="firedDoughnut"&&(e.movingItem.type==="head"||e.movingItem.type==="firedDoughnut"))return;if(e.touchedItem.state.disappear==="onTouch"||e.touchedItem.state.disappear==="onTouchByPlayer"&&k(e.movingItem)||e.touchedItem.state.disappear==="onStand"&&Mt(e)){if(Mt(e)&&jn(e)){en({above:e.movingItem,below:e.touchedItem});const n=[Gn(e.movingItem,e.room,e.gameState,e.deltaMS),qn(e.movingItem,e.room,e.gameState,e.deltaMS)];Jn(e.movingItem,n)}fn(e)}};function pi(e){const t=e.movingItem.type==="monster"?e.movingItem:e.touchedItem;t.config.which!=="emperorsGuardian"&&(t.state.busyLickingDoughnutsOffFace=!0)}const lt=e=>{jn(e)&&Bt(e),$r(e)&&Bt({...e,movingItem:e.touchedItem,touchedItem:e.movingItem}),O(e,...ft)&&ri(e),ie(e,...ft)&&ii(e),(ie(e,"monster")&&O(e,"firedDoughnut")||ie(e,"firedDoughnut")&&O(e,"monster"))&&pi(e),(ie(e,"monster")||ie(e,"movingPlatform"))&&ti(e),O(e,"switch")&&ni(e),O(e,"joystick")&&si(e,lt),e.touchedItem.state.disappear&&At(e),e.movingItem.state.disappear&&K(e.touchedItem,e.movingItem)&&At({...e,movingItem:e.touchedItem,touchedItem:e.movingItem})},hi=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="heels"?e.state:e.state.heels,{carrying:s,hasBag:a}=i,{state:{position:c}}=e;if(!a)return;const l=be(t.items).filter(nn),f=s===null?$n(e,t):void 0;for(const b of l)b.state.wouldPickUpNext=!1;f!==void 0&&(f.state.wouldPickUpNext=!0);const u=r.currentActionPress("carry");if(u==="tap"||r.currentActionPress("jump")==="hold"&&u==="hold")if(s===null){if(f===void 0)return;mi(t,i,f),r.actionsHandled.add("carry")}else{if(e.state.standingOnItemId===null||!Yn(e,on(t.items)))return;s.state.position=c,j({room:t,item:s}),ot({subjectItem:e,gameState:n,room:t,posDelta:{x:0,y:0,z:s.aabb.z},pusher:e,forceful:!0,deltaMS:o,onTouch:lt}),i.carrying=null,r.actionsHandled.add("carry")}},mi=(e,t,n)=>{t.carrying=n,n.state.wouldPickUpNext=!1,rn({room:e,item:n})},$n=(e,t)=>tn(e,be(t.items).filter(nn)),Yn=(e,t)=>{const n={position:R(e.state.position,{z:I.h})},o=Ro({id:e.id,aabb:e.aabb,state:n},t);for(const r of o)if(K(r,e)){if(!X(r))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with non-free",r),!1;if(!Yn(r,t))return console.log("carrying: cannot put down due to collision: item:",e,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Ge=-11,gi={jump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,c=r?.state.standingOnItemId??null,l=c===null||o===void 0?null:o.items[c],f=l===null?!1:l.type==="teleporter"&&bn(l),u=e.actions.every(b=>t.currentActionPress(b)!=="released"),d=a===void 0?ye({colourised:n,button:e}):a;if(s?.pressed!==u&&xe(d,u),f!==s?.standingOnTeleporter)if(f)re(d,y({textureId:"teleporter",y:5}),y({animationId:"teleporter.flashing",y:5}));else{const b=Pt(e,n,"JUMP");b.y=Ge,re(d,b)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:f,colourised:n}}},carry({renderContext:e,currentRendering:t,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=e,{currentPlayable:s,room:a}=n,c=t?.renderProps,l=t?.output,f=s&&Oe(s),u=f?.hasBag??!1,d=f?.carrying??null,b=d===null&&a!==void 0&&$n(s,a)!==void 0,g=o.actions.every(w=>r.currentActionPress(w)!=="released"),S=u&&!b&&d===null,L=l===void 0?ye({colourised:i,button:o}):l;if(L.visible=u,u&&(S!==c?.disabled&&kt(L,S,i),L.visible=!0,c?.pressed!==g&&xe(L,g),u!==c?.hasBag||d!==c?.carrying)){let w;d!==null?w=Nn(d,e,n):u&&(w=y({textureId:"bag",y:-2})),re(L,w)}return{output:L,renderProps:{pressed:g,hasBag:u,colourised:i,carrying:d,disabled:S}}},fire({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&we(r),c=a?.hasHooter??!1,l=a?.doughnuts??0,f=e.actions.every(b=>t.currentActionPress(b)!=="released"),u=s===void 0?ye({colourised:n,button:e}):s,d=c||le(l)>0;if(u.visible=d,d&&(i?.pressed!==f&&xe(u,f),c!==i?.hasHooter||l!==i?.doughnuts)){let b;c?b=y({textureId:"hooter",y:-3}):le(l)>0&&(b=y({textureId:"doughnuts",y:-2}));const g=M(new C,l);g.y=Ge,g.filters=pn,re(u,b,g),kt(u,l===0,n)}return{output:u,renderProps:{pressed:f,colourised:n,doughnuts:l,hasHooter:c}}},carryAndJump({renderContext:{button:e,inputStateTracker:t,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,c=(r&&Oe(r))?.hasBag??!1,l=e.actions.every(d=>t.currentActionPress(d)!=="released");if(!(i===void 0||l!==i.pressed||n!==i.colourised||c!==i.hasBag))return"no-update";let u;if(s===void 0){u=ye({colourised:n,button:e});const d=Pt(e,n,"C+J");d.y=Ge,re(u,d)}else u=s;return c?(u.visible=!0,i?.pressed!==l&&xe(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:c,colourised:n}}},menu({currentRendering:e}){if(e!==void 0)return"no-update";const t=y("hud.char.Menu");return t.scale=2,t.filters=P,{output:t,renderProps:W}},map({currentRendering:e}){if(e!==void 0)return"no-update";const t=ae({label:"mapText",outline:!0});return M(t,"MAP"),{output:t,renderProps:W}}};class J extends Dr{constructor(t){const n=gi[t.button.which];super(t,n)}}const vi=30,yi=15,xi=42,Si=36,Ti=44,Ci=20;class Ii{constructor(t){this.renderContext=t;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=t;this.#t={mainButtonNest:new C({label:"mainButtonNest"}),buttons:{jump:new J({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new J({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new J({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new J({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new J({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new J({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new Hr({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#t,{mainButtonNest:s,joystick:a}=this.#t;for(const{renderContext:{button:{which:c}},output:l}of D(i))c==="menu"||c==="map"?this.#n.addChild(l):s.addChild(l);i.jump.output.y=yi,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=vi,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#n.addChild(s),this.#n.addChild(a.output),this.#e()}#n=new C({label:"OnScreenControls"});#t;#e(){const{renderContext:{general:{gameState:{inputStateTracker:t}}}}=this;for(const n of D(this.#t.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)t.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)t.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)t.hudInputState[r]=!1})}}#o(t){this.#t.mainButtonNest.x=t.x-Ti,this.#t.mainButtonNest.y=t.y-Ci,this.#t.joystick.output.x=xi,this.#t.joystick.output.y=t.y-Si,this.#t.buttons.map.output.x=t.x-4*8}tick(t){const{screenSize:n}=t,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of D(this.#t.buttons))r.tick({...t,currentPlayable:ne(o)});this.#t.joystick.tick()}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t.joystick.destroy()}}Ye.frames.button.frame;const wi=250,ki=e=>e?48:24,Pi=e=>e?68:56,Bi=(e,t)=>e?t.x/2-24:80,Oi=e=>e?72:24,Di=e=>e?88:0,zt=112,se=e=>e==="heels"?1:-1;class Fi{constructor(t){this.renderContext=t;const{onScreenControls:n}=t;for(const o of Ee)this.#n.addChild(this.#e[o].sprite),this.#n.addChild(this.#e[o].livesText),this.#n.addChild(this.#e[o].shield.container),this.#n.addChild(this.#e[o].extraSkill.container);n||(this.#n.addChild(this.#e.head.doughnuts.container),this.#n.addChild(this.#e.head.hooter.container),this.#n.addChild(this.#e.heels.bag.container),this.#n.addChild(this.#e.heels.carrying.container)),this.#n.addChild(this.#e.fps),this.#e.fps.filters=[Tt],this.#e.fps.y=Ve.h,this.#o(),n&&(this.#t=new Ii({general:t.general,inputDirectionMode:t.inputDirectionMode}),this.#n.addChild(this.#t.output))}#n=new C({label:"HudRenderer"});#t=void 0;#e={head:{sprite:this.#s("head"),livesText:ae({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#s("heels"),livesText:ae({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new C({label:"heelsCarrying"})}},fps:ae({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:t}}}}}=this;for(const n of Ee){const{sprite:o,livesText:r}=this.#e[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{t[`swop.${n}`]=!0}),i.on("pointerup",()=>{t[`swop.${n}`]=!1}),i.on("pointerleave",()=>{t[`swop.${n}`]=!1})}}#r({textureId:t,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new C({label:i});s.pivot={x:4,y:16};const a=new bt({texture:qe().textures[t],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Ct,y:n?0:8});s.addChild(a);const c=ae({outline:r==="text-only"});return c.y=n?0:16,c.x=a.x=Ve.w/2,s.addChild(c),o&&(c.visible=!1),r===!0&&(s.filters=pn),{text:c,icon:a,container:s}}#s(t){const n=new bt(qe().textures[`${t}.walking.${t==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:t}){this.#e.head.hooter.container.x=this.#e.head.doughnuts.container.x=(t.x>>1)+se("head")*zt,this.#e.head.doughnuts.container.y=t.y-je.h-8,this.#e.heels.carrying.container.y=t.y-je.h,this.#e.heels.carrying.container.x=this.#e.heels.bag.container.x=(t.x>>1)+se("heels")*zt,this.#e.heels.bag.container.y=this.#e.head.hooter.container.y=t.y-8,this.#e.fps.x=t.x-Ve.w*2}#a(t,n){return t?n?De:He:n?It:ke}#l(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ge(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#e.heels.carrying,c=a.children.length>0;if(s===null&&c)for(const l of a.children)l.destroy();if(s!==null&&!c){const l=Nn(s,this.renderContext,t);l!==void 0&&a.addChild(l)}a.filters=this.#a(!0,o),this.#e.heels.bag.icon.filters=this.#a(i,o)}#d(t){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=ge(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#e.head.hooter.icon.filters=this.#a(i,o),this.#e.head.doughnuts.icon.filters=this.#a(s!==0,o),M(this.#e.head.doughnuts.text,s)}#f(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=ge(r,t),{text:s,container:a}=this.#e[t].shield,{text:c,container:l}=this.#e[t].extraSkill,f=Fr(i),u=f>0||!o;a.visible=u,u&&(M(s,f),a.y=n.y-Di(o)),l.x=a.x=(n.x>>1)+se(t)*Bi(o,n);const d=i===void 0?0:t==="head"?rt(i):i.bigJumps,b=d>0||!o;l.visible=b,b&&(M(c,d),l.y=n.y-Oi(o))}#c(t,n){const{currentCharacterName:o}=t;return o===n||o==="headOverHeels"}#b(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#c(r,t),a=this.#e[t].sprite;s?a.filters=i?De:He:a.filters=i?It:ke,a.x=(n.x>>1)+se(t)*Pi(o),a.y=n.y-je.h}#p(t,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=ge(r,t)?.lives??0,a=this.#e[t].livesText;a.x=(n.x>>1)+se(t)*ki(o),a.y=n.y,M(a,s??0)}#h(t){const{room:n}=t;if(n===void 0)return;const o=Lr(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;ke.targetColor=o.hud.dimmed[r?"dimmed":"original"],Mr.targetColor=o.hud.dimmed[r?"basic":"original"],Ct.targetColor=o.hud.icons[r?"basic":"original"],He.targetColor=o.hud.lives.original,this.#e.head.livesText.filters=r?ve.colourised.head[this.#c(i,"head")?"active":"inactive"]:ve.original,this.#e.heels.livesText.filters=r?ve.colourised.heels[this.#c(i,"heels")?"active":"inactive"]:ve.original}#u=Gt;#m(){if(Uo(v.getState())){if(performance.now()>this.#u+wi){const t=No.shared.FPS;M(this.#e.fps,Math.round(t)),Tt.targetColor=t>100?T.white:t>58?T.moss:t>55?T.pastelBlue:t>50?T.metallicBlue:t>40?T.pink:T.midRed,this.#u=performance.now()}this.#e.fps.visible=!0}else this.#e.fps.visible=!1}tick(t){this.#h(t);for(const n of Ee)this.#p(n,t),this.#b(n,t),this.#f(n,t);this.#i(t),this.#d(t),this.#l(t),this.#m(),this.#t?.tick(t)}get output(){return this.#n}destroy(){this.#n.destroy(),this.#t?.destroy()}}const _t={movementType:"vel",vels:{gravity:p}},Li=(e,t,n,o)=>{if(!K(e))return _t;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=e,c=Eo[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const l=te(s,t);return F("lift")(l)&&l.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-$e*o,-c)}}}:_t}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-$e*o,-c)}}}},Rt=I.h,Ut=.001,Mi=({totalDistance:e,currentAltitude:t,direction:n})=>{const o=pt**2/(2*oe);if(n==="up"){if(t<=o)return Math.max(Ut,Math.sqrt(2*oe*Math.max(t,0)));if(t>=e-o){const r=Math.max(0,e-t);return Math.max(Ut,Math.sqrt(2*oe*r))}else return pt}else if(t>=e-o){const r=Math.max(0,e-t);return Math.min(-.001,-Math.sqrt(2*oe*r))}else return t<=o?Math.min(-.001,-Math.sqrt(2*oe*Math.max(t,0))):-.036},Ai=({config:{bottom:e,top:t},state:{direction:n,position:{z:o}}})=>{const r=e*Rt,i=t*Rt,s=Mi({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Nt={movementType:"vel",vels:{movingFloor:p}},zi=(e,t,n,o)=>{if(k(e)&&e.state.teleporting!==null)return Nt;const{state:{standingOnItemId:r}}=e,i=te(r,t);if(i===null||!F("conveyor")(i))return Nt;const{config:{direction:s}}=i,c=F("heels")(e)&&e.state.action==="moving"&&Vo(e.state.facing)===jo(s)?V.heels:Ho;return{movementType:"vel",vels:{movingFloor:x(Je[s],c)}}};function*_i(e,t,n,o){for(;(e.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<t.roomTime;){const{positionDelta:r}=e.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Ri=I.w*.8,Ui=(e,t,n,o)=>{const{inputStateTracker:r}=n,i=e.type==="head"?e.state:e.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:c,facing:l}}=e,f=H(l);if(r.currentActionPress("fire")==="tap"&&a&&le(s)>0){const u={type:"firedDoughnut",...Jt,config:W,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...Ke(),position:R(c,x(f,Ri),e.type==="headOverHeels"?{z:I.h}:p),vels:{fired:x(f,V.firedDoughnut)},disappear:"onTouch"}};j({room:t,item:u}),i.doughnuts=A(i.doughnuts,-1),r.actionsHandled.add("fire")}},Zn=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Ni=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Ce=I.w*3,Ei=(e,t)=>{const{state:{position:n}}=e,{state:{position:o}}=t;return n.x>o.x-Ce&&n.x<o.x+Ce&&n.y>o.y-Ce&&n.y<o.y+Ce},Et=(e,t,n,o,r)=>{if(r&&e.state.activated)return B;const i=at(e.state.position,t);return i===void 0?B:Ei(e,i)?Zn:Ni},Vi=(e,t,n,o)=>e.state.activated?B:tt(e.state.stoodOnBy,t).some(k)?Zn:B,ji=(e,t,n,o)=>{switch(e.config.activated){case"after-player-near":return Et(e,t,n,o,!0);case"while-player-near":return Et(e,t,n,o,!1);case"on-stand":return Vi(e,t);case"off":case"on":return B;default:throw e.config,new Error(`unrecognised item.config.activation ${e.config.activated} in ${e.id}:
        ${JSON.stringify(e,null,2)}`)}},Hi=(e,t,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:c,period:l,maximum:f}}=e,{roomTime:u}=t;if(s!==f&&i+l<u){const d=Xo(Go(`${r}-${s}`,{...c,position:p},t.roomJson));if(d===void 0)throw new Error("emitter failed to create a new item");d.state.position=et(a,x(d.aabb,.5)),j({room:t,item:d}),e.state.lastEmittedAtRoomTime=t.roomTime+l,e.state.quantityEmitted++}};function*Xi(e,t,n,o){X(e)&&(yield Li(e,t,n,o),yield zi(e,t),yield*_i(e,t)),k(e)?(yield qn(e,t,n,o),e.id===n.currentCharacterName&&(yield Ar(e,t,n,o),yield Gn(e,t,n),qo(e)&&hi(e,t,n,o),Jo(e)&&Ui(e,t,n))):$o(e)?yield Ai(e):Yo(e)?(yield ji(e,t,n,o),yield ei(e,t,n,o)):Zo(e)&&Hi(e,t)}const Gi=(e,t,n,o)=>{if(!X(e)||e.state.standingOnItemId===null)return;const r=te(e.state.standingOnItemId,t);k(e)&&r.type==="pickup"&&Vn({gameState:n,movingItem:e,touchedItem:r,room:t}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||k(e)&&r.state.disappear==="onTouchByPlayer")&&fn({touchedItem:r,gameState:n,room:t})},qi=(e,t,n,o)=>{if(k(e)&&e.state.standingOnItemId!==null){const s=te(e.state.standingOnItemId,t);(Yt(s)||s.type==="spikes")&&En({room:t,movingItem:e})}const r=[...Xi(e,t,n,o)];Gi(e,t,n);let i=Jn(e,r);(X(e)||F("lift")(e)||F("firedDoughnut")(e))&&(i=R(i,...nt(D(e.state.vels)).map(s=>x(s,o)))),ot({subjectItem:e,posDelta:i,gameState:n,room:t,deltaMS:o,onTouch:lt})},Ji=(e,t)=>{const n=e.characterRooms.headOverHeels;if(t.state.head.lives=A(t.state.head.lives,-1),t.state.heels.lives=A(t.state.heels.lives,-1),t.state.head.lastDiedAt=t.state.head.gameTime,t.state.heels.lastDiedAt=t.state.heels.gameTime,A(t.state.head.lives,t.state.heels.lives)===0)return;const r=le(t.state.head.lives)>0,i=le(t.state.heels.lives)>0;if(t.state.heels.carrying=null,r&&!i||!r&&i){const l=r?"head":"heels";e.currentCharacterName=l,E(e,t);const f=ht(t)[l],u=Q({gameState:e,playableItems:[f],roomId:n.id});e.characterRooms={[l]:u},e.entryState={[l]:mt(f)};return}if(e.entryState.headOverHeels!==void 0){E(e,t);const l=Q({gameState:e,playableItems:[t],roomId:n.id});e.characterRooms={headOverHeels:l};return}else{const{head:l,heels:f}=ht(t);if(E(e,l),E(e,f),Wo(l,f)){const u=sn({head:l,heels:f});E(e,u,"heels");const d=Q({gameState:e,playableItems:[u],roomId:n.id});e.characterRooms={headOverHeels:d},e.entryState={headOverHeels:mt(u)};return}else{const u=Q({gameState:e,playableItems:[l,f],roomId:n.id});e.characterRooms={head:u,heels:u};return}}},Q=({gameState:e,playableItems:t,roomId:n})=>{const{campaign:o}=e,r=Ko({roomJson:o.rooms[n],roomPickupsCollected:e.pickupsCollected[n]??W});for(const i of t)j({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&xr(r,e);return r},E=(e,t,n=t.id)=>{const o=e.entryState[n];t.state={...t.state,...o,expires:null,standingOnItemId:null}},$i=(e,t)=>{const n=an(e,ln(t.type));if(t.state.lives!=="infinite"&&t.state.lives--,t.state.lastDiedAt=t.state.gameTime,t.type==="heels"&&(t.state.carrying=null),t.state.lives===0){delete e.characterRooms[t.id],n!==void 0&&(e.currentCharacterName=n.type);return}else{const o=e.characterRooms[t.type];E(e,t);const r=n===void 0?void 0:e.characterRooms[n.type];if(o===r){if(e.entryState.headOverHeels!==void 0){const a=sn({head:t.id==="head"?t:o.items.head,heels:t.id==="heels"?t:o.items.heels});E(e,a);const c=Q({gameState:e,playableItems:[a],roomId:o.id});e.characterRooms={headOverHeels:c},e.currentCharacterName="headOverHeels";return}j({room:o,item:t});return}else{const s=Q({gameState:e,playableItems:[t],roomId:o.id});e.characterRooms[t.id]=s;return}}},Yi=(e,t)=>{t.type==="headOverHeels"?Ji(e,t):$i(e,t),ne(e)===void 0&&v.dispatch(Qo({offerReincarnation:!0}))},Zi=e=>{for(const t of be(e.items))try{for(const n of tt(t.state.stoodOnBy,e)){if(!e.items[n.id]){gt(n,e);continue}if(!Kt(n,t)){gt(n,e);const o=tn(n,on(e.items));o!==void 0&&en({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${t.id}"`,{cause:n})}},Qi=2*Sr,Wi=(e,t,n)=>{e.state.latentMovement.push({moveAtRoomTime:t.roomTime+Qi,positionDelta:n})},Ki=(e,t,n)=>{for(const o of e){const r=n[o.id];if(r===void 0)continue;const s={...et(o.state.position,r),z:0};if(!ee(s,p))for(const a of tt(o.state.stoodOnBy,t))Wi(a,t,s)}},es=(e,t)=>{for(const n of be(e.items))!X(n)||e.roomTime===n.state.actedOnAt.roomTime||er(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=tr(n.state.position),t.add(n))},ts=(e,t)=>e.state.expires!==null&&e.state.expires<t.roomTime,ns=e=>{for(const t of be(e.items)){const n=t.state.position;t.state.position=nr(n)}},os=(e,t)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[e.type]??0,r=n[t.type]??0;return o-r},rs=(e,t,n)=>{e.progression++,e.gameTime+=n,t.roomTime+=n;const o=ne(e);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,e.characterRooms.head===e.characterRooms.heels){const i=an(e,ln(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Vt=Wt*Ye.animations["particle.fade"].length*(1/Ye.animations["particle.fade"].animationSpeed),is=20,ss=38,Ie=I.w/2;let as=0;const Qn=(e,t,n,o)=>{if(!(Math.random()<n*(o/1e3)))return;const i={...R(qt(e),{x:Math.random()*Ie-Ie/2,y:Math.random()*Ie-Ie/2}),z:e.state.position.z};j({room:t,item:{id:`particle.${e.id}.${as++}`,type:"particle",aabb:p,config:{forCharacter:e.type},state:{...Ke(),expires:t.roomTime+Vt+Math.random()*Vt,position:i}}})},ls=(e,t,n)=>{!(rt(e.state)>0)||e.state.standingOnItemId===null||de(e.state.vels.walking)<or||Qn(e,t,is,n)},cs=(e,t,n)=>{const{isBigJump:o}=e.state;o&&e.state.standingOnItemId===null&&(e.state.vels.gravity.z<=0||Qn(e,t,ss,n))},us=(e,t)=>{const{head:n,heels:o}=Le(e.items);n!==void 0&&ls(n,e,t),o!==void 0&&cs(o,e,t)},ds=(e,t)=>{const n=z(e);if(n===void 0)return We;rs(e,n,t);const o=Object.fromEntries(rr(n.items).map(([s,a])=>[s,a.state.position]));for(const s of D(n.items))ts(s,n)&&(rn({room:n,item:s}),k(s)&&Yi(e,s));const r=Object.values(n.items).sort(os);for(const s of r){const a=ne(e);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{qi(s,n,e,t)}catch(c){throw console.error(c),new Error(`error caught while ticking item "${s.id}"`,{cause:c})}}us(n,t),Zi(n),ns(n);const i=new Set(nt(D(n.items)).filter(s=>o[s.id]===void 0||!ee(s.state.position,o[s.id])));return Ki(i,n,o),es(n,i),i};var Re=`in vec2 aPosition;
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
}`,fs=`precision highp float;
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
`,bs=`struct CRTUniforms {
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
}`,ps=Object.defineProperty,hs=(e,t,n)=>t in e?ps(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Be=(e,t,n)=>(hs(e,typeof t!="symbol"?t+"":t,n),n);const Wn=class Kn extends pe{constructor(t){t={...Kn.DEFAULT_OPTIONS,...t};const n=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:bs,entryPoint:"mainFragment"}}),o=ue.from({vertex:Re,fragment:fs,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:t.seed,type:"f32"},uTime:{value:t.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Be(this,"uniforms"),Be(this,"seed"),Be(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,t)}apply(t,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,t.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(t){this.uniforms.uLine[0]=t}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(t){this.uniforms.uLine[1]=t}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(t){this.uniforms.uLine[2]=t}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(t){this.uniforms.uLine[3]=t?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(t){this.uniforms.uNoise[0]=t}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(t){this.uniforms.uNoise[1]=t}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(t){this.uniforms.uVignette[0]=t}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(t){this.uniforms.uVignette[1]=t}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(t){this.uniforms.uVignette[2]=t}};Be(Wn,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ms=Wn;var gs=`
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
}`,vs=`struct KawaseBlurUniforms {
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
}`,ys=`
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
`,xs=`struct KawaseBlurUniforms {
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
}`,Ss=Object.defineProperty,Ts=(e,t,n)=>t in e?Ss(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,N=(e,t,n)=>(Ts(e,typeof t!="symbol"?t+"":t,n),n);const eo=class to extends pe{constructor(...t){let n=t[0]??{};(typeof n=="number"||Array.isArray(n))&&(ir("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},t[1]!==void 0&&(n.quality=t[1]),t[2]!==void 0&&(n.clamp=t[2])),n={...to.DEFAULT_OPTIONS,...n};const o=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:n?.clamp?xs:vs,entryPoint:"mainFragment"}}),r=ue.from({vertex:Re,fragment:n?.clamp?ys:gs,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),N(this,"uniforms"),N(this,"_pixelSize",{x:0,y:0}),N(this,"_clamp"),N(this,"_kernels",[]),N(this,"_blur"),N(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(t,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,n,o,r);else{const c=Z.getSameSizeTexture(n);let l=n,f=c,u;const d=this._quality-1;for(let b=0;b<d;b++)a=this._kernels[b]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,l,f,!0),u=l,l=f,f=u;a=this._kernels[d]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,l,o,r),Z.returnTexture(c)}}get strength(){return this._blur}set strength(t){this._blur=t,this._generateKernels()}get quality(){return this._quality}set quality(t){this._quality=Math.max(1,Math.round(t)),this._generateKernels()}get kernels(){return this._kernels}set kernels(t){Array.isArray(t)&&t.length>0?(this._kernels=t,this._quality=t.length,this._blur=Math.max(...t)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(t){if(typeof t=="number"){this.pixelSizeX=this.pixelSizeY=t;return}if(Array.isArray(t)){this.pixelSizeX=t[0],this.pixelSizeY=t[1];return}this._pixelSize=t}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(t){this.pixelSize.x=t}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(t){this.pixelSize.y=t}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((t,n)=>t+n+.5,0))}_generateKernels(){const t=this._blur,n=this._quality,o=[t];if(t>0){let r=t;const i=t/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};N(eo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Cs=eo;var Is=`in vec2 vTextureCoord;
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
`,ws=`struct AdvancedBloomUniforms {
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
`,ks=`
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
`,Ps=`struct ExtractBrightnessUniforms {
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
`,Bs=Object.defineProperty,Os=(e,t,n)=>t in e?Bs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,no=(e,t,n)=>(Os(e,typeof t!="symbol"?t+"":t,n),n);const oo=class ro extends pe{constructor(t){t={...ro.DEFAULT_OPTIONS,...t};const n=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:Ps,entryPoint:"mainFragment"}}),o=ue.from({vertex:Re,fragment:ks,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:t.threshold,type:"f32"}}}}),no(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(t){this.uniforms.uThreshold=t}};no(oo,"DEFAULT_OPTIONS",{threshold:.5});let Ds=oo;var Fs=Object.defineProperty,Ls=(e,t,n)=>t in e?Fs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Y=(e,t,n)=>(Ls(e,typeof t!="symbol"?t+"":t,n),n);const io=class so extends pe{constructor(t){t={...so.DEFAULT_OPTIONS,...t};const n=ce.from({vertex:{source:Ue,entryPoint:"mainVertex"},fragment:{source:ws,entryPoint:"mainFragment"}}),o=ue.from({vertex:Re,fragment:Is,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:t.bloomScale,type:"f32"},uBrightness:{value:t.brightness,type:"f32"}},uMapTexture:Ht.WHITE}}),Y(this,"uniforms"),Y(this,"bloomScale",1),Y(this,"brightness",1),Y(this,"_extractFilter"),Y(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Ds({threshold:t.threshold}),this._blurFilter=new Cs({strength:t.kernels??t.blur,quality:t.kernels?void 0:t.quality}),Object.assign(this,t)}apply(t,n,o,r){const i=Z.getSameSizeTexture(n);this._extractFilter.apply(t,n,i,!0);const s=Z.getSameSizeTexture(n);this._blurFilter.apply(t,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,t.applyFilter(this,n,o,r),Z.returnTexture(s),Z.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(t){this._extractFilter.threshold=t}get kernels(){return this._blurFilter.kernels}set kernels(t){this._blurFilter.kernels=t}get blur(){return this._blurFilter.strength}set blur(t){this._blurFilter.strength=t}get quality(){return this._blurFilter.quality}set quality(t){this._blurFilter.quality=t}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this._blurFilter.pixelSize=t}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(t){this._blurFilter.pixelSizeX=t}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(t){this._blurFilter.pixelSizeY=t}};Y(io,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ms=io;const As=W,zs=(e,t)=>(n,o)=>{const r=new Set;if(sr(n)){const f=z(n)?.items;if(f!==void 0){const u=nt(D(Le(f))).filter(d=>d!==void 0);for(const d of u)r.add(d)}}const s=o*n.gameSpeed,a=Math.max(1,Math.ceil(s/t)),c=s/a;for(let f=0;f<a;f++){const u=e(n,c);for(const d of u)r.add(d)}const l=z(n)?.items??As;for(const f of r)l[f.id]===void 0&&r.delete(f);return r},$=.33,_s=lr()==="mobile"?-4:16,Qe=vt.h-vt.w/2,Rs=V.heels;class Us{constructor(t,n){this.renderContext=t,this.childRenderer=n;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:i}}=t,{edgeLeftX:s,edgeRightX:a,frontSide:c,topEdgeY:l}=cn(o.roomJson);this.#r=s+c.x,this.#s=a+c.x;const f=(a+s)/2;this.#i={x:r.x/2-f,y:r.y-_s-c.y-Math.abs(f/2)},this.#t=this.#i.x+this.#r<0,this.#e=this.#i.x+this.#s>r.x,this.#o=this.#i.y+l-Qe<0;const u=this.childRenderer.output.graphics;if(u===void 0)throw new Error("can't scroll a renderer without graphics");const d={sound:this.childRenderer.output.sound,graphics:new C({children:[u],label:`RoomScrollRenderer(${o.id})`})};(i?.showBoundingBoxes??un.displaySettings.showBoundingBoxes)!=="none"&&d.graphics.addChild(Ns(t.room.roomJson)),this.output=d}#n=!1;#t;#e;#o;#r;#s;#i;output;tick(t){const{general:{upscale:{gameEngineScreenSize:n},gameState:o}}=this.renderContext,{deltaMS:r}=t,i=ne(o);if(i===void 0)return;const s=ar(i.state.position),a=R(s,this.#i),c={x:this.#t&&a.x<n.x*$?Math.min(-this.#r,n.x*$-s.x):this.#e&&a.x>n.x*(1-$)?Math.max(n.x-this.#s,n.x*(1-$)-s.x):this.#i.x,y:this.#o&&a.y<n.y*$?n.y*$-s.y:this.#i.y},l=this.output.graphics;if(!this.#n)l.x=c.x,l.y=c.y;else{const u=Rs*r,d=Me(l,c),b=Qt(d);if(b>u){const g={x:d.x/b,y:d.y/b};l.x-=g.x*u,l.y-=g.y*u}else l.x=c.x,l.y=c.y}this.#n=!0,this.childRenderer.tick(t)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Ns=e=>{const{edgeLeftX:t,edgeRightX:n,frontSide:o,topEdgeY:r}=cn(e);return new hn().rect(t+o.x,r-Qe,n-t,o.y-r+Qe).stroke("red").rect(t+o.x,r,n-t,o.y-r).stroke("blue")},jt=({crtFilter:e},t)=>[e?new ms({lineContrast:t?.3:0,vignetting:t?.4:.2}):void 0,e?new Ms({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Es{constructor(t,n){this.app=t,this.gameState=n;try{const o=v.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#s.connect(yt.destination),t.stage.addChild(this.#r),t.stage.scale=r,z(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#a(o);return}}#n;#t;#e;#o;#r=new C({label:"MainLoop/world"});#s=yt.createGain();#i=zs(ds,pr);#a(t){v.dispatch(cr(ur(t)))}#l(){const{gameMenus:{userSettings:{displaySettings:t}}}=v.getState();this.#n=jt(t,!0),this.#t=jt(t,!1)}tickAndCatch=t=>{try{this.tick(t)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#a(o)}};tick=({deltaMS:t})=>{const n=v.getState(),o=dr(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=v.getState(),a=!o&&!(r?.uncolourised??un.displaySettings.uncolourised),c=fr(n),l=br(n);(this.#e?.renderContext.general.colourised!==a||this.#e?.renderContext.onScreenControls!==c||this.#e?.renderContext.inputDirectionMode!==l)&&(this.#e?.destroy(),this.#e=new Fi({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},inputDirectionMode:l,onScreenControls:c}),this.app.stage.addChild(this.#e.output));const f=z(this.gameState);this.#e.tick({screenSize:s.gameEngineScreenSize,room:f});const u=o?We:this.#i(this.gameState,t),d=z(this.gameState);if(this.#o?.renderContext.room!==d||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o){if(this.#o?.destroy(),d){const b={general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},room:d};this.#o=new Us(b,new zr(b)),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#s)}else this.#o=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#o?.tick({progression:this.gameState.progression,movedItems:u,deltaMS:t}),o?this.app.stage.filters=this.#n:this.app.stage.filters=this.#t};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#s.disconnect(),this.#o?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}hr.add(mn,gn,vn,yn,xn,Sn,Tn,Cn,In,wn,kn,Bn,Pn,On,Dn,Fn,Ln,Mn,An,zn,_n);vr.defaultOptions.scaleMode="nearest";const $s=async(e,t)=>{const n=new _r;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=mr;const o=v.getState().gameMenus.currentGame,r=xt({campaign:e,inputStateTracker:t,savedGame:o});o!==void 0?v.dispatch(gr(o.store.gameMenus)):(v.dispatch(St(r.characterRooms.head.id)),v.dispatch(St(r.characterRooms.heels.id)));const i=new Es(n,r).start();return{campaign:e,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=ne(r);a!==void 0&&dn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return z(r)},get gameState(){return r},reincarnateFrom(s){xt({campaign:e,inputStateTracker:t,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}};export{$s as default,$s as gameMain};
