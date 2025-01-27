const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-Cz3wVSQa.js","assets/index-NCJ8fxNL.js","assets/index-C8GmzEbr.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-HGRx9TMT.js","assets/Graphics-BhYrXJn7.js","assets/changeCharacterRoom-2Fa0wAqG.js","assets/WebGLRenderer-BfkoewFZ.js"])))=>i.map(i=>d[i]);
import{af as eo,aD as ae,aE as X,a7 as Rn,ag as ue,E as v,e as tt,c as to,C as b,d as qe,v as Ct,aT as m,$ as St,a$ as Qt,aL as je,T as ze,U as no,b0 as ro,ai as oo,g as io,b1 as so,b2 as ao,b3 as se,b4 as Un,aA as lo,b5 as co,at as A,b6 as En,b7 as Ce,b8 as uo,an as _,ar as k,b9 as Oe,ba as fo,aq as Et,bb as me,bc as Nt,ax as ie,bd as Ye,be as ho,bf as po,ao as O,am as $t,bg as Be,as as Nn,bh as $n,ap as kt,bi as en,aB as Ae,bj as mo,bk as bo,bl as go,bm as Vt,aw as j,ay as I,bn as Je,bo as vo,au as Ht,bp as yo,bq as xo,br as wo,bs as ft,bt as To,bu as Se,av as Co,bv as So,bw as Vn,aI as de,al as ko,bx as Oo}from"./index-NCJ8fxNL.js";import{l as Ot,f as Ze,a as Y,e as D,g as tn,h as nn,j as De,s as Ie,k as te,i as F,m as It,t as Io,p as Le,o as _o,n as Po,w as Bo,q as J,r as Ao,u as Fo,v as zo,x as ve,y as ht,z as _t,A as rn,B as pt,c as Xt,C as Z,D as Hn,E as Xn,F as nt,G as H,H as rt,I as Gn,J as on,K as Wn,L as Do,M as Pt,N as Lo,O as qn,d as Mo,P as _e,Q as Ke,R as he,S as Ro,T as Uo,U as Eo,V as No,W as sn,X as Bt,Y as At,Z as Ft,_ as $o,$ as Pe,a0 as Vo,a1 as Ho,b as ot,a2 as w,a3 as V,a4 as it,a5 as Qe,a6 as jn,a7 as Xo}from"./changeCharacterRoom-2Fa0wAqG.js";import{S as Go,G as q}from"./Graphics-BhYrXJn7.js";const Yn=class zt extends eo{constructor(e){e={...zt.defaultOptions,...e},super(e),this.enabled=!0,this._state=Go.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=ae.from(n)),r&&(s=X.from(r)),new zt({gpuProgram:i,glProgram:s,...o})}};Yn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let K=Yn;var Wo=`
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
`,qo=`in vec2 aPosition;
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
`,jo=`
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
}`;class T extends K{constructor(e){const n=e.gpu,r=an({source:jo,...n}),o=ae.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=an({source:Wo,...i}),a=X.from({vertex:qo,fragment:s}),l=new Rn({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:ue.EMPTY}})}}function an(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Gt=`
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
    `,Wt=`
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
	`;class Jn extends T{constructor(){super({gl:{functions:`
                ${Gt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Wt}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Jn.extension={name:"color",type:v.BlendMode};class Zn extends T{constructor(){super({gl:{functions:`
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
            `}})}}Zn.extension={name:"color-burn",type:v.BlendMode};class Kn extends T{constructor(){super({gl:{functions:`
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
                `}})}}Kn.extension={name:"color-dodge",type:v.BlendMode};class Qn extends T{constructor(){super({gl:{functions:`
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
                `}})}}Qn.extension={name:"darken",type:v.BlendMode};class er extends T{constructor(){super({gl:{functions:`
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
            `}})}}er.extension={name:"difference",type:v.BlendMode};class tr extends T{constructor(){super({gl:{functions:`
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
            `}})}}tr.extension={name:"divide",type:v.BlendMode};class nr extends T{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"exclusion",type:v.BlendMode};class rr extends T{constructor(){super({gl:{functions:`
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
                `}})}}rr.extension={name:"hard-light",type:v.BlendMode};class or extends T{constructor(){super({gl:{functions:`
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
            `}})}}or.extension={name:"hard-mix",type:v.BlendMode};class ir extends T{constructor(){super({gl:{functions:`
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
            `}})}}ir.extension={name:"lighten",type:v.BlendMode};class sr extends T{constructor(){super({gl:{functions:`
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
                `}})}}sr.extension={name:"linear-burn",type:v.BlendMode};class ar extends T{constructor(){super({gl:{functions:`
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
            `}})}}ar.extension={name:"linear-dodge",type:v.BlendMode};class lr extends T{constructor(){super({gl:{functions:`
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
            `}})}}lr.extension={name:"linear-light",type:v.BlendMode};class cr extends T{constructor(){super({gl:{functions:`
                ${Gt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Wt}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}cr.extension={name:"luminosity",type:v.BlendMode};class ur extends T{constructor(){super({gl:{functions:`
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
            `}})}}ur.extension={name:"negation",type:v.BlendMode};class dr extends T{constructor(){super({gl:{functions:`
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
                `}})}}dr.extension={name:"overlay",type:v.BlendMode};class fr extends T{constructor(){super({gl:{functions:`
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
                `}})}}fr.extension={name:"pin-light",type:v.BlendMode};class hr extends T{constructor(){super({gl:{functions:`
                ${Gt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Wt}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}hr.extension={name:"saturation",type:v.BlendMode};class pr extends T{constructor(){super({gl:{functions:`
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
                `}})}}pr.extension={name:"soft-light",type:v.BlendMode};class mr extends T{constructor(){super({gl:{functions:`
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
                `}})}}mr.extension={name:"subtract",type:v.BlendMode};class br extends T{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"vivid-light",type:v.BlendMode};const Dt=[];tt.handleByNamedList(v.Environment,Dt);async function Yo(t){if(!t)for(let e=0;e<Dt.length;e++){const n=Dt[e];if(n.value.test()){await n.value.load();return}}}let ye;function Jo(){if(typeof ye=="boolean")return ye;try{ye=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{ye=!1}return ye}var gr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(gr||{});class Zo{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,p=u.length;d<p;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Ko=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],vr=class yr extends to{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Ko,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Yo(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...yr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(qe(Ct,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:m.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=gr.ALL);const{clear:r,clearColor:o,target:i}=e;m.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,m.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Zo(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Jo())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};vr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let xr=vr,Me;function Qo(t){return Me!==void 0||(Me=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??xr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!St.get().getWebGLRenderingContext())return!1;let r=St.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Me}let Re;async function ei(t={}){return Re!==void 0||(Re=await(async()=>{const e=St.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Re}const ln=["webgl","webgpu","canvas"];async function ti(t){let e=[];t.preference?(e.push(t.preference),ln.forEach(i=>{i!==t.preference&&e.push(i)})):e=ln.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ei()){const{WebGPURenderer:a}=await Qt(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-Cz3wVSQa.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&Qo(t.failIfMajorPerformanceCaveat??xr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Qt(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-BfkoewFZ.js");return{WebGLRenderer:l}},__vite__mapDeps([7,1,2,3,4,5,6]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const wr="8.6.6";class Tr{static init(){globalThis.__PIXI_APP_INIT__?.(this,wr)}static destroy(){}}Tr.extension=v.Application;class ni{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,wr)}destroy(){this._renderer=null}}ni.extension={type:[v.WebGLSystem,v.WebGPUSystem],name:"initHook",priority:-10};const Cr=class Lt{constructor(...e){this.stage=new b,e[0]!==void 0&&qe(Ct,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await ti(e),Lt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return qe(Ct,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Lt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Cr._plugins=[];let Sr=Cr;tt.handleByList(v.Application,Sr._plugins);tt.add(Tr);var ri=`in vec2 aPosition;
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
`,oi=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,cn=`struct GlobalFilterUniforms {
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
}`;const kr=class Or extends K{constructor(e){e={...Or.defaultOptions,...e};const n=ae.from({vertex:{source:cn,entryPoint:"mainVertex"},fragment:{source:cn,entryPoint:"mainFragment"}}),r=X.from({vertex:ri,fragment:oi,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Rn({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};kr.defaultOptions={alpha:1};let ii=kr;class et extends je{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof ue?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ze.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ze.shared.add(this.update,this,no.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(ue.from(e[r]));return new et(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(ue.from(e[r]));return new et(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof ue)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ze.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ze.shared.add(this.update,this),this._isConnectedToTicker=!0))}}var Ue={},un;function si(){if(un)return Ue;un=1;var t=ro(),e=t.mark(i),n=oo(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,p,h=arguments;return t.wrap(function(x){for(;;)switch(x.prev=x.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){x.next=8;break}return p=d[u],x.delegateYield(o(p),"t0",5);case 5:u++,x.next=2;break;case 8:case"end":return x.stop()}},e)}Ue.__concat=i;var s=r(i);return Ue.concat=s,Ue}var mt,dn;function ai(){return dn||(dn=1,mt=si().concat),mt}var li=ai();const Xe=io(li),ci=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},ui=({campaign:t,inputState:e})=>{const n=ci(t),r=so(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&Ot(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&Ot(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:Ze(o.items.head),heels:i===void 0?void 0:Ze(i.items.heels)},inputState:e,campaign:t,events:ao(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},g={pureBlack:new m("#000000"),lightBlack:new m("#38453A"),shadow:new m("#325149"),midGrey:new m("#7F7773"),lightGrey:new m("#BBB1AB"),white:new m("#FBFEFB"),metallicBlue:new m("#366BAE"),pink:new m("#D68ED1"),moss:new m("#9E9600"),redShadow:new m("#805E50"),midRed:new m("#CA7463"),lightBeige:new m("#DAA78F"),highlightBeige:new m("#EBC690"),alpha:new m("#FBD042"),replaceLight:new m("#08A086"),replaceDark:new m("#187558")},qt=`in vec2 aPosition;
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
`,di=`#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform vec3 uOutline;
uniform float uOutlineWidth;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if( c.a != 0.0 ) {
        finalColor = c;
        return;
    }

    vec2 texelSize = vec2(1.0) / vec2(textureSize(uTexture, 0));

    // right
    if( vTextureCoord.x + texelSize.x * uOutlineWidth >= 1.0 ) {
        finalColor = c;
        return;
    }
    vec4 cRight = texture(uTexture, vec2(vTextureCoord.x + texelSize.x * uOutlineWidth, vTextureCoord.y));

    if( cRight.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // left
    if( vTextureCoord.x - texelSize.x <= 0.0 ) {
        finalColor = c;
        return;
    }

    vec4 cLeft = texture(uTexture, vec2(vTextureCoord.x - texelSize.x * uOutlineWidth, vTextureCoord.y));

    if( cLeft.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }


    // down
    if( vTextureCoord.y + texelSize.y * uOutlineWidth > 1.0 ) {
        finalColor = c;
        return;
    }

    vec4 cDown = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y * uOutlineWidth));

    if( cDown.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // up
    if( vTextureCoord.y - texelSize.y * uOutlineWidth < 0.0 ) {
        finalColor = c;
        return;
    }

    vec4 cUp = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y * uOutlineWidth));

    if( cUp.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }    

    finalColor = c;
}
`;class ke extends K{constructor(e,n){const r=X.from({vertex:qt,fragment:di,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const fi=`precision mediump float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uSourceBlacks[2];
uniform vec3 uTargetColor;

// colours are floats so check if they're very close rather than exactly equal:
bool colorsEffectivelyEqual(vec3 color1, vec3 color2) {    
    
    return distance(color1, color2) < 0.05;
}

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if( c.a == 0.0 ) {
        finalColor = c;
        return;
    }

    if ( colorsEffectivelyEqual(c.rgb, uSourceBlacks[0]) || colorsEffectivelyEqual(c.rgb, uSourceBlacks[1])) {
        finalColor = vec4(0,0,0, 1.0);
    } else {
        finalColor = vec4(uTargetColor, 1);    
    }
}
`,fn=[g.pureBlack,g.lightBlack];class G extends K{uniforms;constructor(e="white"){const n=X.from({vertex:qt,fragment:fi,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=fn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=fn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new m(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const U={original:new m("rgb(255, 255, 255)"),basic:new m("rgb(210, 210, 210)"),dimmed:new m("rgb(120, 120, 120)")},E={original:new m("rgb(255, 255, 0)"),basic:new m("hsl(50,65%,70%)"),dimmed:g.redShadow},N={original:new m("rgb(255, 0, 255)"),basic:g.pink,dimmed:new m("hsl(290,35%,38%)")},S={original:new m("rgb(0, 255, 255)"),basic:new m("hsl(183, 50%, 50%)"),dimmed:new m("hsl(183, 50%, 25%)")},$={original:new m("rgb(0, 255, 0)"),basic:g.moss,dimmed:new m("hsl(73,50%,25%)")},jt={white:{basic:{main:U,edges:{towards:S,right:E},hud:{lives:E,dimmed:N,icons:S}},dimmed:{main:U,edges:{towards:$,right:S},hud:{lives:E,dimmed:N,icons:S}}},yellow:{basic:{main:E,edges:{towards:$,right:U},hud:{lives:S,dimmed:N,icons:$}},dimmed:{main:E,edges:{towards:S,right:S},hud:{lives:S,dimmed:N,icons:$}}},magenta:{basic:{main:N,edges:{towards:$,right:S},hud:{lives:U,dimmed:S,icons:E}},dimmed:{main:N,edges:{towards:$,right:S},hud:{lives:U,dimmed:S,icons:E}}},cyan:{basic:{main:S,edges:{towards:N,right:U},hud:{lives:U,dimmed:$,icons:E}},dimmed:{main:S,edges:{towards:N,right:U},hud:{lives:U,dimmed:$,icons:E}}},green:{basic:{main:$,edges:{towards:S,right:E},hud:{lives:U,dimmed:N,icons:S}},dimmed:{main:$,edges:{towards:S,right:E},hud:{lives:U,dimmed:N,icons:S}}}},Yt=t=>jt[t.hue][t.shade],Ir=t=>{const e=Y(t,"head"),n=Y(t,"heels");return e!==void 0&&n!==void 0&&e.state.action==="idle"&&n.state.action==="idle"&&e.state.standingOn===n},_r=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+tn>n?100-Math.ceil((n-e)/(tn/100)):0},Pr=t=>{const e=100*D.w;return t.totalWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.totalWalkDistance-t.fastStepsStartedAtDistance)/D.w):0};function st(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}const hn={x:.5,y:1},pn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({texture:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s}=t;let a;if(pn(t)?a=hi(t):a=new je(se.textures[t.texture]),e===void 0&&r===void 0)if(pn(t))a.anchor=hn;else{const l=se.data.frames[t.texture].frame;l.pivot!==void 0?a.pivot=l.pivot:a.anchor=hn}else e!==void 0&&(a.anchor=e),r!==void 0&&(a.pivot=r);return o!==void 0&&(a.x=o),i!==void 0&&(a.y=i),s!==void 0&&(a.filters=s),a.eventMode="static",n===!0&&(a.scale.x=-1),a}};function hi({animationId:t,reverse:e,playOnce:n}){const o=se.animations[t].map(s=>({texture:s,time:Un}));e&&o.reverse();const i=new et(o);return i.animationSpeed=lo.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const pi=`in vec2 vTextureCoord;
out vec4 finalColor;

const int SWOP_COUNT = \${SWOP_COUNT};

uniform sampler2D uTexture;
uniform vec3 uOriginal[SWOP_COUNT];
uniform vec3 uReplacement[SWOP_COUNT];

// colours are floats so check if they're very close rather than exactly equal:
bool colorsEffectivelyEqual(vec3 color1, vec3 color2) {       
    return distance(color1, color2) < 0.05;
}

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if( c.a == 0.0 ) {
        finalColor = c;
        return;
    }
    
    for(int i = 0; i < SWOP_COUNT; i++) {
        if ( colorsEffectivelyEqual(c.rgb, uOriginal[i]) ) {
            finalColor = vec4(uReplacement[i], c.a);            
            return;
        }
    }    
    finalColor = vec4(c.rgb, c.a);
}
`;class at extends K{constructor(e){const n=Object.keys(e).length,r=X.from({vertex:qt,fragment:pi.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Br=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Ar=t=>Br(jt[t.color.hue][t.color.shade].main),mi=t=>new at({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...Ar(t)}),bi=new at({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Mt=(t,e,n)=>n?new at(Br(jt[t.color.hue][t.color.shade].edges[e])):new G(Yt(t.color).edges[e].original),Q=t=>new at(Ar(t)),Te=co,gi=24,vi=56,yi=80,mn=112,xe=t=>t==="heels"?1:-1;function*xi(t){const e=Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;uo(o),yield f({texture:o,x:(r+.5-n/2)*En.w})}}function Ee(t,e){for(const n of t.children)n.destroy();st(xi(e),t)}class wi{#e=new b({label:"HudRenderer"});#r=new G;#o=new G;#n=new G;#a=new G;#i=new ke(g.pureBlack,A.getState().upscale.gameEngineUpscale);#s=new G;#l=[this.#i,this.#a];#c={original:[this.#i,this.#s],colourised:{head:[this.#i,new G(g.metallicBlue)],heels:[this.#i,new G(g.pink)]}};#t={head:{sprite:this.characterSprite("head"),livesText:this.makeText({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.iconWithNumber({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.iconWithNumber({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.iconWithNumber({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.iconWithNumber({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.characterSprite("heels"),livesText:this.makeText({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.iconWithNumber({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.iconWithNumber({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.iconWithNumber({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}}};constructor(){for(const e of nn)this.#e.addChild(this.#t[e].livesText),this.#e.addChild(this.#t[e].sprite),this.#e.addChild(this.#t[e].shield.container),this.#e.addChild(this.#t[e].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)}iconWithNumber({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new je({texture:se.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#n,y:n?0:8});s.addChild(a);const l=this.makeText({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=En.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#i),{text:l,icon:a,container:s}}characterSprite(e){const n=new je(se.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}makeText({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?this.#l:this.#a,scale:{x:1,y:e?2:1}})}updateElementPositions(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+xe("head")*mn,this.#t.head.doughnuts.container.y=e.y-Ce.h-8,this.#t.heels.carrying.container.y=e.y-Ce.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+xe("heels")*mn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}tickBagAndCarrying(e){const n=De(e,"heels"),r=n?.hasBag??!1,o=n?.carrying??null,{container:i}=this.#t.heels.carrying,s=i.children.length>0;if(o===null&&s)for(const a of i.children)a.destroy();o!==null&&!s&&i.addChild(f(o.type==="spring"?"spring.released":o.type==="sceneryPlayer"?o.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":o.config.style)),this.#t.heels.bag.icon.filters=r?Te:this.#r}tickHooterAndDoughnuts(e){const n=De(e,"head"),r=n?.hasHooter??!1;this.#t.head.hooter.icon.filters=r?Te:this.#r;const o=n?.doughnuts??0;this.#t.head.doughnuts.icon.filters=o!==0?Te:this.#r,Ee(this.#t.head.doughnuts.text,o)}updateAbilitiesIcons(e,n,r){const o=De(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+xe(r)*yi,Ee(i,_r(o)),s.y=n.y,Ee(a,o===void 0?0:r==="head"?Pr(o):o.bigJumps),l.y=n.y-24}characterIsActive(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}updateCharacterSprite(e,n,r,o){const i=this.characterIsActive(e,o),s=this.#t[o].sprite;i?s.filters=r?Te:this.#s:Ir(e)?s.filters=this.#o:s.filters=this.#r,s.x=(n.x>>1)+xe(o)*vi,s.y=n.y-Ce.h}updateLivesText(e,n,r){const i=De(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+xe(r)*gi,s.y=n.y,Ee(s,i??0)}updateColours(e,n){const r=Ie(e),o=Yt(r.color);this.#r.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#a.targetColor=o.hud.dimmed[n?"basic":"original"],this.#n.targetColor=o.hud.icons[n?"basic":"original"],this.#o.targetColor=o.hud.dimmed[n?"basic":"original"],this.#s.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.characterIsActive(e,"head")?this.#c.colourised.head:this.#r:this.#c.original,this.#t.heels.livesText.filters=n?this.characterIsActive(e,"heels")?this.#c.colourised.heels:this.#r:this.#c.original}tick({gameState:e,screenSize:n,colourise:r}){this.updateColours(e,r);for(const o of nn)this.updateLivesText(e,n,o),this.updateCharacterSprite(e,n,r,o),this.updateAbilitiesIcons(e,n,o);this.updateElementPositions(n),this.tickHooterAndDoughnuts(e),this.tickBagAndCarrying(e)}get container(){return this.#e}destroy(){this.#e.destroy()}}const bn={movementType:"vel",vels:{gravity:_}},Ti=(t,e,n)=>{if(!te(t))return bn;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=Io[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?F("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-It*n,-a)}}}:bn:{movementType:"vel",vels:{gravity:{z:Math.max(o-It*n,-a)}}}},Fe={movementType:"steady"},Ne=t=>{const n=t/_o*Un;return(t+.5*It*n**2)/n},Ci={head:Ne(Le.head),headOnSpring:Ne(Le.head+D.h),heels:Ne(Le.heels),heelsOnSpring:Ne(Le.heels+D.h)},Si=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ci[`${n}${e?"OnSpring":""}`]},Fr=(t,e)=>{const{state:{standingOn:n}}=t,{inputState:{jump:r}}=e,o=n!==null&&F("teleporter")(n);if(!(r&&n!==null&&!o))return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Fe;const s=F("spring")(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Si(t,s)}},stateDelta:{action:"moving",jumped:!0}}},ki=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Oe(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return k(n,l)},gn={movementType:"vel",vels:{walking:_}},zr=(t,e,n)=>{const r=Oi(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Oe(r.vels.walking);r.stateDelta=Object.assign(r.stateDelta||{},{walkDistance:o===0?0:t.state.walkDistance+o*n}),t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta=Object.assign(r.stateDelta||{},{totalWalkDistance:t.state.totalWalkDistance+o*n}))}return r},Oi=(t,{inputState:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,vels:{walking:d,gravity:p}}}=t,y=n===t.id?e:fo,x=a===null&&p.z<0,L=o==="head"&&Pr(t.state)>0&&a!==null,z=o==="headOverHeels"?x?"head":"heels":L?"heels":o,C=s?l:y.direction,P=J[z];if(c!==null||i==="death")return gn;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Et(d,k(d,Po*r))}}:gn;if(y.jump){const Kt=Nt(C,ie)?l:C,Qr=F("spring")(a)?1:Ao;return{movementType:"vel",vels:{walking:k({...Kt,z:0},P*Qr)},stateDelta:{facing:me(Kt)}}}}if(Oe(C)!==0)return x?{movementType:"vel",vels:{walking:k({...C,z:0},P)},stateDelta:{facing:C,action:"falling"}}:{movementType:"vel",vels:{walking:ki({vel:d,acc:Fo[z],deltaMS:r,maxSpeed:P,unitD:C,minSpeed:0})},stateDelta:{facing:C,action:"moving"}};const R=Oe(d);if(u>0&&u<1)return{movementType:"position",posDelta:k(l,1-u),stateDelta:{action:x?"falling":"idle",walkDistance:0}};const be=R===0?_:k(d,1/R),ge=Math.max(R-zo[z]*r,0);return{movementType:"vel",vels:{walking:k(be,ge<Bo[z]?0:ge)},stateDelta:{action:x?"falling":"idle"}}},vn=D.h,$e=.001,Ii=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=ht**2/(2*ve);if(n==="up"){if(e<=r)return Math.max($e,Math.sqrt(2*ve*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max($e,Math.sqrt(2*ve*o))}else return ht}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-$e,-Math.sqrt(2*ve*o))}else return e<=r?Math.min(-$e,-Math.sqrt(2*ve*Math.max(e,0))):-ht};function _i({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}},o,i){const s=t*vn,a=e*vn,l=Ii({currentAltitude:r-s,direction:n,totalDistance:a-s});if(Number.isNaN(l))throw new Error("velocity is NaN");const c=r<=s?"up":r>=a?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:l}},stateDelta:{direction:c}}}const Pi=.5,pe=(t,e,n,r)=>{const o=n.x+r.x-t.x,i=n.y+r.y-t.y,s=n.z+r.z-t.z,a=t.x+e.x-n.x,l=t.y+e.y-n.y,c=t.z+e.z-n.z,u=Math.abs(o)<Math.abs(a)?o:-a,d=Math.abs(i)<Math.abs(l)?i:-l,p=Math.abs(s)<Math.abs(c)?s:-c,h=Math.abs(u),y=Math.abs(d),x=Math.abs(p)*Pi;return h<y&&h<x?{x:u,y:0,z:0}:y<x?{x:0,y:d,z:0}:{x:0,y:0,z:p}},yn=(t,e)=>({x:t.x>0?e.state.position.x:e.state.position.x+e.aabb.x,y:t.y>0?e.state.position.y:e.state.position.y+e.aabb.y,z:t.z>0?e.state.position.z:e.state.position.z+e.aabb.z}),xn={stopAutowalk:0,portal:0,wall:0,doorLegs:0,sceneryPlayer:0,bubbles:0,block:1,barrier:1,floor:1,floorEdge:1,hushPuppy:1,teleporter:1,doorFrame:1,lift:2,movableBlock:2,portableBlock:2,slidingBlock:2,spring:2,ball:3,joystick:3,switch:3,charles:3,conveyor:3,head:4,heels:4,headOverHeels:4,pickup:8,firedDoughnut:9,slidingDeadly:10,moveableDeadly:10,deadlyBlock:10,monster:10},Dr=(t,e)=>xn[t.type]-xn[e.type],Bi=(t,e)=>e.toSorted((n,r)=>{const o=Dr(n,r);if(o!==0)return o;const i=Ye(t,yn(t,n)),s=Ye(t,yn(t,r));return i-s});function Lr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;_r(n)>0||(e.state.action="death",e.state.expires=t+_t)}const Ai=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=pt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=pt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=rn(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=pt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.totalWalkDistance);break}case"jumps":{const s=rn(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":e.inputState.jump=!1,A.dispatch(po(r.config.page));break;case"reincarnation":break;case"crown":{A.dispatch(ho(r.config.planet));break}default:r.config}},Fi=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Ye(i,r)<=0||Xt({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},zi=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=$t(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):0,y:i==="y"?-Math.abs(e.x):0,z:0}:{x:i==="x"?Math.abs(e.y):0,y:i==="y"?Math.abs(e.x):0,z:0};t.state.position=O(t.state.position,s)};function Di({movingItem:t}){t.state.autoWalk=!1}const W=(t,...e)=>F(...e)(t.touchedItem),we=(t,...e)=>F(...e)(t.movingItem),Mr=t=>Z(t.movingItem),Li=t=>Z(t.touchedItem),Mi=t=>Hn(t.touchedItem),wn=t=>{switch(!0){case W(t,"stopAutowalk"):Di(t);break;case Mi(t):Lr(t);break;case W(t,"portal"):Fi(t);break;case W(t,"pickup"):Ai(t);break;case W(t,"doorFrame"):zi(t);break}},Rr=t=>t[Math.floor(Math.random()*t.length)],ee=Object.freeze({movementType:"vel",vels:{walking:_}}),lt=t=>Xn(t)?J[t.config.which]:J[t.type],Ri=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=J.homingBot;if(!Nt(e,ie))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Be(l.state.position,t);if(Math.abs(c.y)<2)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<2)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},Ur=(t,e)=>{const{items:{head:n,heels:r}}=e;if(e.items.headOverHeels!==void 0)return e.items.headOverHeels;const o=n===void 0?void 0:en(n.state.position,t),i=r===void 0?void 0:en(r.state.position,t);return o===void 0?r:i===void 0||o<i?n:r},Ui=(t,e,n,r)=>{const{state:{position:o,standingOn:i}}=t;if(i===null)return ee;const s=Ur(o,e);if(s===void 0)return Fe;const a=Be(s?.state.position,o),l=Math.abs(a.x)<Math.abs(a.y)?"x":"y",c=Math.abs(a[l])>1?l:Nn(l),u=lt(t),d={..._,[c]:a[c]>0?u:-u};return{movementType:"vel",vels:{walking:d},stateDelta:{facing:me(d)}}},Ei=(t,e,n,r)=>{const{state:{position:o,standingOn:i}}=t;if(i===null)return ee;const s=Ur(o,e);if(s===void 0)return ee;const a=s.state.position,l=D.w*3;if(!(o.x>a.x-l&&o.x<a.x+l&&o.y>a.y-l&&o.y<a.y+l))return ee;const u=Be(s?.state.position,o),d=lt(t),p=(1+Math.sqrt(2))/2,h=d*p,y=k({...u,z:0},h/$n(u));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:me(y)}}},bt=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return ee;if(!(Ae(i,_)||Math.random()<r/1e3))return Fe;const l=Rr(o);return{movementType:"vel",vels:{walking:k(kt[l],lt(t))},stateDelta:{facing:kt[l]}}},Ni=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?ee:Nt(i,ie)?{movementType:"vel",vels:{walking:k(o,lt(t))}}:Fe},$i=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Rr([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},gt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},{touchDurationBeforeTurn:o,turnStrategy:i})=>{const{state:{position:s,vels:{walking:a},activated:l},aabb:c}=t;if(!l||(t.state.durationOfTouch+=r,t.state.durationOfTouch<o))return;const u=pe(s,c,e,n);if(u.x===0&&u.y===0)return;const d=$i(a,u,i);t.state.vels.walking=d,t.state.facing=me(d),t.state.durationOfTouch=0},Vi=({movingItem:t})=>{t.state.vels.walking=_},Hi=(t,e,n,r)=>{if(!t.state.activated||Xn(t)&&t.state.busyLickingDoughnutsOffFace)return ee;switch(t.config.movement){case"patrol-randomly-diagonal":return bt(t,e,n,r,go);case"patrol-randomly-xy8":return bt(t,e,n,r,bo);case"patrol-randomly-xy4":return bt(t,e,n,r,mo);case"towards-tripped-on-axis-xy4":return Ri(t,e);case"towards-on-shortest-axis-xy4":return Ui(t,e);case"back-forth":case"clockwise":return Ni(t);case"unmoving":case"free":return ee;case"towards-when-in-square-xy8":return Ei(t,e);default:throw t.config,new Error("this should be unreachable")}},Xi=t=>{const{movingItem:e,touchedItem:n}=t;if(te(n,e))switch(e.config.movement){case"patrol-randomly-xy4":gt(t,{touchDurationBeforeTurn:150,turnStrategy:"perpendicular"});break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":gt(t,{touchDurationBeforeTurn:150,turnStrategy:"opposite"});break;case"clockwise":gt(t,{touchDurationBeforeTurn:150,turnStrategy:"clockwise"});break;case"towards-tripped-on-axis-xy4":Vi(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Gi=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r},state:{setting:o,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,e===i+1||e===i)return;const s=t.state.setting=o==="left"?"right":"left";for(const[a,l]of Vt(r)){const c=n.items[a];c!==void 0&&(c.state={...c.state,...l[s]})}},Wi=({movingItem:t,touchedItem:e})=>{if(!te(t))return;const{state:{position:n},aabb:r}=e,o=pe(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=me(o),s=k(i,-J.ball);return e.state.vels.sliding=s,!1},qi=({movingItem:t,touchedItem:e})=>{if(!te(e))return;const n=t.state.vels.sliding;if(Ae(n,_))return;const{state:{position:r},aabb:o}=t,i=pe(e.state.position,e.aabb,r,o);return Ye(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},ji=({gameState:t,movingItem:e,room:n,touchedItem:r,deltaMS:o})=>{const{config:{controls:i},state:{position:s},aabb:a}=r,l=pe(e.state.position,e.aabb,s,a);if(l.x===0&&l.y===0)return;const c=me(l);for(const u of i){const d=n.items[u],p=k(c,-J.charles*o);d.state.facing=p,ct({subjectItem:d,posDelta:p,gameState:t,room:n,pusher:r,deltaMS:o})}},Yi=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},Tn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>Yi(t,e,n,r),Cn=.001,Jt=(t,e,n=.001)=>{if(!te(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:nt({state:{position:O(t.state.position,{x:0,y:0,z:-Cn})},aabb:{...t.aabb,z:n+Cn},id:t.id},{state:{position:O(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Er=(t,e)=>{const r=[...j(e).filter(i=>Jt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Dr(s,i);return a<0||a===0&&Tn(t,s)>Tn(t,i)?s:i})},Sn=t=>H(t.movingItem)&&Jt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),kn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&Z(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Sn(t)){if(Sn(t)&&Mr(t)){rt({above:t.movingItem,below:t.touchedItem});const n=[Fr(t.movingItem,t.gameState),zr(t.movingItem,t.gameState,t.deltaMS)];$r(t.movingItem,n)}Gn(t)}};function Ji(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.state.busyLickingDoughnutsOffFace=!0}const Zi=t=>{Mr(t)&&wn(t),Li(t)&&wn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),W(t,...on)&&Wi(t),we(t,...on)&&qi(t),(we(t,"monster")&&W(t,"firedDoughnut")||we(t,"firedDoughnut")&&W(t,"monster"))&&Ji(t),(we(t,"monster")||we(t,"movableBlock"))&&Xi(t),W(t,"switch")&&Gi(t),W(t,"joystick")&&ji(t),t.touchedItem.state.disappear&&kn(t),t.movingItem.state.disappear&&te(t.touchedItem,t.movingItem)&&kn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},ct=({subjectItem:t,posDelta:e,gameState:n,room:r,pusher:o,deltaMS:i,forceful:s=F("lift")(t)&&o===void 0,recursionDepth:a=0})=>{if(Ae(e,_))return;if(a>16)throw new Error("this probably means a non-terminating issue");const{state:{position:l}}=t;t.state.position=O(l,e),H(t)&&(t.state.actedOnAt=r.roomTime);const c=Bi(e,Wn(t,I(r.items)));for(const u of c){if(!nt(t,u))continue;if(o!==u&&Zi({movingItem:t,touchedItem:u,movementVector:Et(t.state.position,l),gameState:n,deltaMS:i,room:r}),r.items[t.id]===void 0)return;if(r.items[u.id]===void 0||!te(u,t)||!te(t))continue;const d=pe(t.state.position,t.aabb,u.state.position,u.aabb);if(H(u)&&u!==o){const p=s||Do(u)?-1:-.5,h=k(d,p);if(t.state.position=O(t.state.position,d,h),ct({subjectItem:u,posDelta:h,pusher:t,gameState:n,room:r,deltaMS:i,forceful:s,recursionDepth:a+1}),r.items[u.id]===void 0)continue;t.state.position=O(t.state.position,pe(t.state.position,t.aabb,u.state.position,u.aabb))}else t.state.position=O(t.state.position,d);H(t)&&d.z>0&&(t.state.standingOn===null||!c.includes(t.state.standingOn))&&(Pt(t),rt({above:t,below:u}))}};function Ki(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputState:{jump:i}}=e;if(r===null)return i&&o!==null&&F("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:_t}}}:Fe;const s=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(s===0)return Xt({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:_t}}};break;case"in":if(s===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:s}}}}const On={movementType:"vel",vels:{movingFloor:_}},Qi=(t,e,n)=>{if(Z(t)&&t.state.teleporting!==null)return On;const{state:{standingOn:r}}=t;if(r===null||!F("conveyor")(r))return On;const{config:{direction:o}}=r,s=F("heels")(t)&&t.state.action==="moving"&&Je(t.state.facing)===vo(o)?J.heels:Lo;return{movementType:"vel",vels:{movingFloor:k(kt[o],s)}}},es=(t,e,n,r)=>{const{inputState:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=j(I(e.items)).filter(qn),u=s===null?ns(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.carry){if(s===null){if(u===void 0){console.warn("nothing to pick up");return}ts(e,i,u)}else{if(t.state.standingOn===null||!Nr(t,I(e.items)))return;const d=Mo({gameState:n,room:e,itemType:s.type,config:s.config,position:l});ct({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r}),i.carrying=null}o.carry=!1}},ts=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,_e({room:t,item:n})},ns=(t,e)=>Er(t,j(I(e.items)).filter(qn)),Nr=(t,e)=>{const n={position:O(t.state.position,{z:D.h})},r=Wn({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(!H(o)||!Nr(o,e))return!1;return!0};function*rs(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const os=(t,e,n,r)=>{const{inputState:{fire:o}}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t;if(o&&a&&s>0&&l+500<c){const h={type:"firedDoughnut",...Ke,config:Ht,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:O(u,k(d,D.w),t.type==="headOverHeels"?{z:D.h}:_),vels:{fired:k(d,J.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};he({room:e,item:h}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime,n.inputState.fire=!1}},is=2;function*ss(t,e,n,r){H(t)&&(yield Ti(t,n,r),yield Qi(t),yield*rs(t,e)),Z(t)&&(yield zr(t,n,r),t.id===n.currentCharacterName&&(yield Ki(t,n,r),yield Fr(t,n),Ro(t)&&es(t,e,n,r),Uo(t)&&os(t,e,n))),Eo(t)&&(yield _i(t)),No(t)&&(yield Hi(t,e,n,r))}const as=(t,e,n)=>{H(t)&&t.state.standingOn!==null&&t.state.standingOn.state.disappear==="onStand"&&Gn({touchedItem:t.state.standingOn,gameState:n,room:e}),Z(t)&&t.state.standingOn!==null&&t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0)},ls=(t,e,n,r)=>{Z(t)&&t.state.standingOn!==null&&Hn(t.state.standingOn)&&Lr({gameState:n,room:e,movingItem:t,touchedItem:t.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...ss(t,e,n,r)];as(t,e,n);let i=$r(t,o);(H(t)||F("lift")(t)||F("firedDoughnut")(t))&&(i=O(i,...j(I(t.state.vels)).map(l=>k(l,r))));const s=Math.ceil(Oe(i)/is),a=k(i,1/s);for(let l=0;l<s;l++)ct({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r})},$r=(t,e)=>{let n=_;for(const r of e){if(r.movementType==="position"&&(n=O(n,r.posDelta)),r.movementType==="vel"&&(H(t)||F("lift")(t)))for(const[i,s]of Vt(r.vels)){const a={..._,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},In=(t,...e)=>{const n={};for(const r of e)n[r]=t[r];return n},Rt=t=>{const e={id:"head",type:"head",...Ke,...sn,state:{...Bt(),...At(),...Ft(),...t.state.head,facing:t.state.facing,position:O(t.state.position,{z:D.h}),switchedToAt:Number.NEGATIVE_INFINITY,actedOnAt:t.state.actedOnAt}},n={id:"heels",type:"heels",...Ke,...sn,state:{...Bt(),...At(),...Ft(),...t.state.heels,facing:t.state.facing,position:O(t.state.position),switchedToAt:Number.NEGATIVE_INFINITY,actedOnAt:t.state.actedOnAt}};return{head:e,heels:n}},Zt=({head:t,heels:e})=>({type:"headOverHeels",id:"headOverHeels",...Ke,shadowCastTexture:e.shadowCastTexture,config:Ht,aabb:$o,state:{...Bt(),...At(),...Ft(),position:e.state.position,action:"idle",jumped:!1,teleporting:null,autoWalk:!1,facing:e.state.facing,actedOnAt:Math.max(e.state.actedOnAt,e.state.actedOnAt),head:{...In(t.state,"hasHooter","doughnuts","doughnutLastFireTime","fastStepsStartedAtDistance","totalWalkDistance","lives","gameTime","shieldCollectedAt"),switchedToAt:Number.NEGATIVE_INFINITY},heels:{...In(e.state,"hasBag","bigJumps","carrying","lives","gameTime","shieldCollectedAt"),switchedToAt:Number.NEGATIVE_INFINITY}}}),cs=t=>{const e=t.characterRooms.head,n=Y(t,"head"),r=Y(t,"heels"),o=Zt({head:n,heels:r});_e({room:e,item:"head"}),_e({room:e,item:"heels"}),he({room:e,item:o}),t.previousPlayable=t.currentCharacterName,t.currentCharacterName="headOverHeels",t.characterRooms={head:void 0,heels:void 0,headOverHeels:e}},us=t=>{const e=t.characterRooms.headOverHeels,n=Y(t,"headOverHeels"),r=Pe(t.previousPlayable),{head:o,heels:i}=Rt(n);_e({room:e,item:"headOverHeels"}),he({room:e,item:o}),he({room:e,item:i}),rt({above:o,below:i}),t.currentCharacterName=r,t.previousPlayable=void 0,t.characterRooms={head:e,heels:e,headOverHeels:void 0}},ds=t=>{const e=Y(t,t.currentCharacterName);e!==void 0&&(e.type==="headOverHeels"?(e.state.head.switchedToAt=e.state.head.gameTime,e.state.heels.switchedToAt=e.state.heels.gameTime):e.state.switchedToAt=e?.state.gameTime)},fs=t=>{if(Ir(t))cs(t);else if(t.currentCharacterName==="headOverHeels")us(t);else{if(Y(t,Pe(t.currentCharacterName))===void 0)return;t.currentCharacterName=Pe(t.currentCharacterName)}ds(t)},hs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,oe(t,e);const u=Rt(e)[c],d=fe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Ze(u)};return}if(t.entryState.headOverHeels!==void 0){oe(t,e);const c=fe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Rt(e);if(oe(t,c),oe(t,u),nt(c,u)){const d=Zt({head:c,heels:u});oe(t,d,"heels");const p=fe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:p},t.entryState={headOverHeels:Ze(d)};return}else{const d=fe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},fe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Ot(r.rooms[n],t.pickupsCollected[n]);for(const i of e)he({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Vo(o,t);return o},oe=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},ps=(t,e)=>{const n=Y(t,Pe(e.type));if(e.state.lives--,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];oe(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Zt({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});oe(t,a);const l=fe({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}he({room:r,item:e});return}else{const s=fe({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},ms=(t,e)=>{e.type==="headOverHeels"?hs(t,e):ps(t,e)},bs=t=>{for(const e of I(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){Pt(n);continue}if(!Jt(n,e)){Pt(n);const r=Er(n,I(t.items));r!==void 0&&rt({above:n,below:r})}}},gs=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Et(r.state.position,o),z:0};if(!Ae(s,_))for(const a of r.state.stoodOnBy)a.state.latentMovement.push({moveAtRoomTime:e.roomTime+2*Ho,positionDelta:s})}},vs=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ys=(t,e,n)=>{for(const r of I(t.items))!H(r)||t.roomTime===r.state.actedOnAt||yo(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=xo(r.state.position),n.add(r))},xs=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},ws=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++)n=new Set(Xe(n,_n(t,e)));return n}return _n(t,e*t.gameSpeed)},_n=(t,e)=>{const{inputState:n}=t,r=Ie(t),o=Object.fromEntries(j(Vt(r.items)).map(([a,l])=>[a,l.state.position]));n.swop&&(fs(t),n.swop=!1);for(const a of I(r.items))vs(a,r)&&(_e({room:r,item:a}),Z(a)&&ms(t,a));const i=Object.values(r.items).sort(xs);for(const a of i){if(ot(t).state.action==="death")break;r.items[a.id]!==void 0&&ls(a,r,t,e)}bs(r);const s=new Set(j(I(r.items)).filter(a=>o[a.id]===void 0||!Ae(a.state.position,o[a.id])));return gs(s,r,o),ys(r,o,s),Ts(t,r,e),s},Ts=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=ot(t);if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Y(t,Pe(r.type));i!==void 0&&(i.state.gameTime+=n)}},Pn=(t,e)=>{const n=w(t),r=w(O(t,{x:e.x,z:e.z})),o=w(O(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},vt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Cs=(t,e,n,r)=>{const o=Pn(t,e),i=Pn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=vt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,p=o.bottomCentre.y-o.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,y=i.bottomCentre.y-i.bottomCentre.x/2,x=vt(d,p,h,y),L=o.topLeft.y+o.topLeft.x/2,z=o.bottomCentre.y+o.bottomCentre.x/2,C=i.topLeft.y+i.topLeft.x/2,P=i.bottomCentre.y+i.bottomCentre.x/2,M=vt(L,z,C,P);return u&&x&&M},Ss=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Cs(n,r,o,i))return 0;for(const s of wo){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Bn(e)-Bn(t)},Bn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ge extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const ks=t=>{const e=Os(t);let n=e.length,r=n;const o=new Array(n),i={},s=Is(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Ge([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,p=Array.from(d);if(c=p.length){u.add(l);do{const h=p[--c];try{a(h,s.get(h),u)}catch(y){throw y instanceof Ge?y.hasClosedCycle?y:new Ge([l,...y.cyclicDependency],y.cyclicDependency.includes(l)):y}}while(c);u.delete(l)}o[--n]=l}};function Os(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Is(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const An=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ve=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},_s=(t,e=new Set(I(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Ve(n,o,s);for(const o of e)if(o.renders)for(const i of I(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Ss(o,i);if(An(r,o,i),s===0){Ve(n,o.id,i.id),Ve(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;An(n,a,l),Ve(n,l,a)}return n},Vr=(t,e,n=3)=>{try{return{order:ks(t),impossible:!1}}catch(r){if(r instanceof Ge){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),{order:Vr(t,e,n-1).order,impossible:!0}}else throw r}},Ps=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Bs=(t,e,n)=>{const o=se.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&se.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},He=t=>B(()=>f(t)),B=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i}),renderProps:Ht}:"no-update";function*As({config:{direction:t,inHiddenWall:e,height:n}},r){const o=$t(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const c=f({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...ft(a,{y:-D.h*n})});c.filters=Mt(r,o==="x"?"towards":"right",!0),yield c}}else{yield f({pivot:{x:i,y:9},texture:"generic.door.legs.base",...ft(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...ft(a,{y:-l*D.h})})}}yield*s(V({...ie,[o]:1})),yield*s(ie),e||(yield f({pivot:{x:16,y:D.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...V({...ie,[o]:1})}))}const Fs=B(({item:t,room:e})=>st(As(t,e),new b({filters:Q(e)})));function*zs({config:{direction:t,part:e}},n){const r=$t(t);yield f({texture:Bs(n,r,e),filter:Q(n)})}const Ds=B(({item:t,room:e})=>st(zs(t,e))),yt={animationId:"bubbles.cold"},ne=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},xt=({name:t,action:e,facingXy4:n,teleporting:r,highlighted:o})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r!==null){if(r.phase==="out")return{animationId:`${t}.fadeOut`};if(r.phase==="in")return{animationId:`${t}.fadeOut`}}const i=o?new ke(t==="head"?g.metallicBlue:g.pink,A.getState().upscale.gameEngineUpscale):void 0;return e==="moving"?{animationId:`${t}.walking.${n}`,filter:i}:e==="falling"&&t==="head"&&(n==="towards"||n==="right")?{texture:`head.falling.${n}`,filter:i}:t==="head"&&(n==="towards"||n==="right")?{animationId:`head.idle.${n}`,filter:i}:{texture:`${t}.walking.${n}.2`,filter:i}},Fn=({gameTime:t,switchedToAt:e})=>e+500>t,wt=({item:t,currentlyRenderedProps:e})=>{const{type:n,state:{action:r,facing:o,teleporting:i}}=t,s=Je(o),a=t.type==="headOverHeels"?Fn(t.state.head):Fn(t.state);return e===void 0||e.action!==r||e.facingXy4!==s||e.teleportingPhase!==(i?.phase??null)||e.highlighted!==a?{container:n==="headOverHeels"?ne({top:xt({name:"head",action:r,facingXy4:s,teleporting:i,highlighted:a}),bottom:xt({name:"heels",action:r,facingXy4:s,teleporting:i,highlighted:a})}):f(xt({name:n,action:r,facingXy4:s,teleporting:i,highlighted:a})),renderProps:{action:r,facingXy4:s,teleportingPhase:i?.phase??null,highlighted:a}}:"no-update"};function*Ls(t,e,n){for(const r of To){const o=Nn(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let a=0;a<=t.size[r];a++){let l;if(t.walls[s][a]==="none"){const c=j(I(t.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===a||u.position[r]+1===a)&&u.position[o]===t.size[o]);c===void 0?l="none":c.position.z===0?l="behind-door":l="corner-on-floor"}else l="corner-on-floor";l!=="none"&&(yield Qe({[r]:a-e[r],[o]:t.size[o]+(n[i]?.5:0)+(l==="behind-door"?.5:0)},f(l==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const Hr=({blockXExtent:t,blockYExtent:e,type:n})=>{const r=new b({label:"towards"});for(let i=0;i<=t;i+=.5){const s={x:i,y:0},a={x:7,y:0};r.addChild(Qe(s,f({pivot:a,texture:`${n}.towards`})))}const o=new b({label:"right"});for(let i=0;i<=e;i+=.5)o.addChild(Qe({x:0,y:i},f({pivot:{x:0,y:0},texture:`${n}.right`})));return{right:o,towards:r}},Ms=B(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=it(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:p}}=e,h=new b({label:`floor(${e.id})`});if(d!=="none"){const z=d==="deadly"?`generic${p==="dimmed"?".dark":""}.floor.deadly`:`${d}${p==="dimmed"?".dark":""}.floor`,C=new b;for(let M=-1;M<=o+2;M++)for(let R=M%2-1;R<=i+2;R+=2)C.addChild(Qe({x:M+(s.right?-.5:0),y:R+(s.towards?-.5:0)},f({texture:z})));st(Ls(e,{x:n,y:r},s),C);const P=new q().poly([ie,V({x:c,y:0}),V({x:c,y:u}),V({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});C.addChild(P),C.filters=Q(e),C.mask=P,h.addChild(C)}const{towards:y,right:x}=Hr({blockXExtent:c,blockYExtent:u,type:"floorOverdraw"});h.addChild(y),h.addChild(x);const L=new q().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);return h.addChild(L),h.mask=L,h.y=-t.aabb.z,h.cacheAsTexture(!0),h}),Rs=B(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=it(t.roomJson),c=i-r,u=s-o,d=new b({label:"floorEdge"}),p=new q({label:"overDrawToHideFallenItems"}).poly([V({x:c,y:0}),V({x:0,y:0}),V({x:0,y:u}),{...V({x:0,y:u}),y:999},{...V({x:c,y:0}),y:999}],!0).fill(0);p.y=8,d.addChild(p);const{towards:h,right:y}=Hr({blockXExtent:c,blockYExtent:u,type:"floorEdge"}),x=!e&&n.colourise;h.filters=Mt(t,"towards",x),y.filters=Mt(t,"right",x),d.addChild(h),d.addChild(y);const L=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(L),d.mask=L,d.cacheAsTexture(!0),d}),Us=(t,e,n)=>e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Tt=g.moss,zn=B(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),Es={head:wt,heels:wt,headOverHeels:wt,doorFrame:Ds,doorLegs:Fs,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:B(({item:{config:{side:t,style:e}},room:n})=>{if(t==="right"||t==="towards")throw new Error("this wall should be non-rendering");return f({texture:Ps(n.planet,e,t,n.color.shade==="dimmed"),y:1,pivot:t==="away"?{x:Se.w,y:Se.h+1}:{x:0,y:Se.h+1},filter:Q(n)})}),barrier:B(({item:{config:{axis:t}}})=>f({texture:`barrier.${t}`})),deadlyBlock:B(({item:{config:{style:t}},room:e})=>f({texture:t,filter:t==="volcano"?Q(e):void 0})),slidingDeadly:zn,slidingBlock:zn,block({item:{config:{style:t},state:{disappear:e}},room:n,currentlyRenderedProps:r}){return r===void 0||r.disappear!==e?{container:f({texture:Us(n.color.shade==="dimmed",t,e!==null),filter:t==="organic"?Q(n):void 0}),renderProps:{disappear:e}}:"no-update"},switch({item:{state:{setting:t}},currentlyRenderedProps:e}){return e===void 0||t!==e.setting?{container:f(`switch.${t}`),renderProps:{setting:t}}:"no-update"},conveyor({item:{config:{direction:t},state:{stoodOnBy:e}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new b,s=Co(t);return i.addChild(f(r?{animationId:`conveyor.${s}`,reverse:t==="towards"||t==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:B(()=>{const t=new b,e={x:Ce.w/2,y:Ce.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({texture:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=j(t).find(Z)!==void 0;return e===void 0||n!==e.flashing?{container:n?new b({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:B(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({texture:`crown.${t.planet}`});const r={shield:"bunny",jumps:"bunny",fast:"bunny","extra-life":"bunny",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:Q(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:B(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=Je(t);return e===void 0||n!==e.facingXy4?{container:ne({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?bi:o?void 0:mi(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Je(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({texture:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({texture:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{texture:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ne({top:{texture:`${t.which}.${a}`,filter:s||Q(n)},bottom:yt}):f({texture:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ne({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{texture:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({texture:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ne({top:yt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ne({top:"ball",bottom:yt,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:He("joystick"),movableBlock:B(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new ke(Tt,A.getState().upscale.gameEngineUpscale):void 0;return{container:f({texture:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new ke(Tt,A.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new ke(Tt,A.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?ne({top:{texture:`head.walking.${e}.2`,filter:i},bottom:{texture:`heels.walking.${e}.2`,filter:i}}):f({texture:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:He("hushPuppy"),bubbles:B(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:He({animationId:"bubbles.doughnut"}),ball:He("ball"),floor:Ms,floorEdge:Rs};class Ns{#e;#r;#o=void 0;#n;#a;constructor(e,n,r){this.#e=e,this.#r=n,this.#n=new b({label:`ItemAppearanceRenderer ${e.id}`}),Gs(e,this.#n,r),this.#a=Es[e.type]}destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#r,currentlyRenderedProps:this.#o,displaySettings:e.displaySettings,onHold:e.onHold});n!=="no-update"&&(this.#o=n.renderProps,this.#n.children.forEach(r=>r.destroy()),n.container!==null&&this.#n.addChild(n.container))}get container(){return this.#n}}const Dn=(t,e)=>{const n=new q().poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})]).stroke({width:.5,color:e,alpha:1});return n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.fill({color:"transparent"})}),n},$s={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Vs{#e;constructor(e){const n=$s[e.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${e.id}`}),F("portal")(e)){const r=w(e.config.relativePoint);this.#e.addChild(new q().circle(r.x,r.y,5).stroke(n)),this.#e.addChild(new q().circle(r.x,r.y,2).fill(n))}this.#e.addChild(new q().circle(0,0,2).fill(n)),this.#e.addChild(Dn(e.aabb,n)),e.renderAabb&&this.#e.addChild(Dn(e.renderAabb,"rgba(184, 184, 255)"))}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class Hs{#e;#r;#o;constructor(e,n){this.#r=new b({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#o=n,this.#e=e,this.#n()}#n(){const e=jn(this.#e.state.position);this.#r.x=e.x,this.#r.y=e.y}tick(e){this.#o?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#r.destroy({children:!0}),this.#o?.destroy()}get container(){return this.#r}}class Xs{constructor(e,n){this.item=e,this.room=n;const{userSettings:{displaySettings:{showShadowMasks:r}}}=A.getState();if(r||(this.#e.filters=new ii({alpha:.5})),e.shadowMask.spriteOptions){const o=f(e.shadowMask.spriteOptions);e.shadowMask.relativeTo==="top"&&(o.y=-e.aabb.z),this.#e.addChild(o),r||(this.#e.mask=o)}this.#e.addChild(this.#r)}#e=new b({label:"ItemShadowRenderer"});#r=new b({label:"shadows"});#o={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=j(I(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:Xo}},a=Object.groupBy(i,l=>{const c=this.#o[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":nt(s,l)?c?"update":"create":"noShadow"});for(const l of Xe(a.keepUnchanged,a.update))this.#o[l.id].renderedOnProgression=n;for(const l of Xe(a.create)){const c=f(l.shadowCastTexture);c.label=l.id,this.#r.addChild(c),this.#o[l.id]={sprite:c,renderedOnProgression:n}}for(const l of Xe(a.create,a.update)){const{sprite:c}=this.#o[l.id],u=w({...Be(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of So(this.#o))u!==n&&(c.destroy(),delete this.#o[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const Gs=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Ws=t=>t.shadowMask!==void 0,qs=(t,e,n)=>{const r=A.getState(),{userSettings:{displaySettings:{showBoundingBoxes:o,colourise:i}}}=r,s=Vn(r),a=o==="all"||o==="non-wall"&&t.type!=="wall",l=[];return t.renders&&(l.push(new Ns(t,e,n)),!s&&i&&Ws(t)&&l.push(new Xs(t,e))),a&&l.push(new Vs(t)),l.length===0?"not-needed":new Hs(t,new js(l))};class js{#e;#r=new b({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#r.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#r}}const le=.33,Ys=16,Ut=Se.h-Se.w/2,Js=J.heels,Zs=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=it(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Ys-i.y-Math.abs(c/2)},d=u.x+a<0,p=u.x+l>n.x,h=u.y+s-Ut<0;return(y,x,L)=>{const z=jn(y.state.position),C=O(z,u),P={x:d&&C.x<n.x*le?Math.min(-a,n.x*le-z.x):p&&C.x>n.x*(1-le)?Math.max(n.x-l,n.x*(1-le)-z.x):u.x,y:h&&C.y<n.y*le?n.y*le-z.y:u.y};if(L)e.x=P.x,e.y=P.y;else{const M=Js*x,R=Be(e,P),be=$n(R);if(be>M){const ge={x:R.x/be,y:R.y/be};e.x-=ge.x*M,e.y-=ge.y*M}else e.x=P.x,e.y=P.y}}},Ks=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=it(t);return new q().rect(e+r.x,o-Ut,n-e,r.y-o+Ut).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Ln{#e=new b({label:"items"});#r=new b({label:"floorEdge"});#o=new b({children:[this.#e,this.#r]});#n=!1;#a=new Map;#i=new Map;#s;#l;#c;#t;#u;#d;constructor(e,n,r){const{userSettings:{displaySettings:o},upscale:i}=A.getState();this.#l=o,this.#c=i,this.#t=n,this.#u=e,this.#d=r,this.#o.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&o.colourise,n.color),o.showBoundingBoxes!=="none"&&this.#o.addChild(Ks(n.roomJson)),this.#s=Zs(n,this.#o,i.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?Te:new G(Yt(n).main.original)}#f(e){for(const n of I(this.#t.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=qs(n,this.#t,this.#u),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#r:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#t.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#h(e){const{order:n}=Vr(_s(this.#t.items,e.movedItems,this.#a),this.#t.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(I(this.#t.items))};this.#s(ot(this.#u),n.deltaMS,!this.#n),this.#f(n),(!this.#n||n.movedItems.size>0)&&this.#h(n),this.#n=!0}destroy(){this.#o.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#l}get upscale(){return this.#c}get everRendered(){return this.#n}get container(){return this.#o}get roomState(){return this.#t}get paused(){return this.#d}}var ut=`in vec2 aPosition;
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
`,dt=`struct GlobalFilterUniforms {
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
}`,Qs=`precision highp float;
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
`,ea=`struct CRTUniforms {
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
}`,ta=Object.defineProperty,na=(t,e,n)=>e in t?ta(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,We=(t,e,n)=>(na(t,typeof e!="symbol"?e+"":e,n),n);const Xr=class Gr extends K{constructor(e){e={...Gr.DEFAULT_OPTIONS,...e};const n=ae.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:ea,entryPoint:"mainFragment"}}),r=X.from({vertex:ut,fragment:Qs,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),We(this,"uniforms"),We(this,"seed"),We(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};We(Xr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ra=Xr;var oa=`
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
}`,ia=`struct KawaseBlurUniforms {
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
}`,sa=`
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
`,aa=`struct KawaseBlurUniforms {
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
}`,la=Object.defineProperty,ca=(t,e,n)=>e in t?la(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,re=(t,e,n)=>(ca(t,typeof e!="symbol"?e+"":e,n),n);const Wr=class qr extends K{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(qe("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...qr.DEFAULT_OPTIONS,...n};const r=ae.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?aa:ia,entryPoint:"mainFragment"}}),o=X.from({vertex:ut,fragment:n?.clamp?sa:oa,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),re(this,"uniforms"),re(this,"_pixelSize",{x:0,y:0}),re(this,"_clamp"),re(this,"_kernels",[]),re(this,"_blur"),re(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=de.getSameSizeTexture(n);let c=n,u=l,d;const p=this._quality-1;for(let h=0;h<p;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),de.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};re(Wr,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let ua=Wr;var da=`in vec2 vTextureCoord;
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
`,fa=`struct AdvancedBloomUniforms {
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
`,ha=`
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
`,pa=`struct ExtractBrightnessUniforms {
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
`,ma=Object.defineProperty,ba=(t,e,n)=>e in t?ma(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,jr=(t,e,n)=>(ba(t,typeof e!="symbol"?e+"":e,n),n);const Yr=class Jr extends K{constructor(e){e={...Jr.DEFAULT_OPTIONS,...e};const n=ae.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:pa,entryPoint:"mainFragment"}}),r=X.from({vertex:ut,fragment:ha,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),jr(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};jr(Yr,"DEFAULT_OPTIONS",{threshold:.5});let ga=Yr;var va=Object.defineProperty,ya=(t,e,n)=>e in t?va(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ce=(t,e,n)=>(ya(t,typeof e!="symbol"?e+"":e,n),n);const Zr=class Kr extends K{constructor(e){e={...Kr.DEFAULT_OPTIONS,...e};const n=ae.from({vertex:{source:dt,entryPoint:"mainVertex"},fragment:{source:fa,entryPoint:"mainFragment"}}),r=X.from({vertex:ut,fragment:da,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:ue.WHITE}}),ce(this,"uniforms"),ce(this,"bloomScale",1),ce(this,"brightness",1),ce(this,"_extractFilter"),ce(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new ga({threshold:e.threshold}),this._blurFilter=new ua({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=de.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=de.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),de.returnTexture(s),de.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};ce(Zr,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let xa=Zr;const Mn=({crtFilter:t},e)=>[t?new ra({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new xa({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class wa{#e;#r;#o;#n;#a=new b({label:"MainLoop/world"});#i;#s;constructor(e,n){this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=A.getState();e.stage.addChild(this.#a),e.stage.scale=r,this.#n=new Ln(n,Ie(n),!1),this.#a.addChild(this.#n.container),this.#o=new wi,e.stage.addChild(this.#o.container),this.#l()}#l(){const{userSettings:{displaySettings:e}}=A.getState();this.#e=Mn(e,!0),this.#r=Mn(e,!1)}tick=({deltaMS:e})=>{const n=A.getState(),r=Vn(n),{userSettings:{displaySettings:o},upscale:i}=A.getState();this.#o.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=Ie(this.#s);if((this.#n.roomState!==s||this.#n.upscale!==i||this.#n.displaySettings!==o||this.#n.paused!==r)&&(this.#n.destroy(),this.#n=new Ln(this.#s,s,r),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",s.id),this.#i.stage.scale=i.gameEngineUpscale,this.#l()),r)this.#i.stage.filters=this.#e,this.#n.everRendered||this.#n.tick({progression:this.#s.progression,movedItems:ko,deltaMS:e,displaySettings:o,onHold:!0});else{this.#i.stage.filters=this.#r;const a=ws(this.#s,e);this.#n.tick({progression:this.#s.progression,movedItems:a,deltaMS:e,displaySettings:o,onHold:!1})}};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n.destroy(),this.#o.destroy(),this.#i.ticker.remove(this.tick)}}tt.add(Jn,Zn,Kn,Qn,er,tr,nr,rr,or,ir,sr,lr,ar,cr,ur,dr,fr,hr,pr,mr,br);Oo.defaultOptions.scaleMode="nearest";const Ta=async(t,e)=>{const n=new Sr;await n.init({background:"#000000",useBackBuffer:!0});const r=ui({campaign:t,inputState:e}),o=new wa(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){Xt({playableItem:ot(r),gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return Ie(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Ia=Object.freeze(Object.defineProperty({__proto__:null,gameMain:Ta},Symbol.toStringTag,{value:"Module"}));export{xr as A,gr as C,K as F,ni as R,Zo as S,wr as V,Ia as g,Jo as u};
