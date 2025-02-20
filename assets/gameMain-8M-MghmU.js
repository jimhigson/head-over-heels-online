const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-B5lNifAy.js","assets/App-BACw8uni.js","assets/index-D0a3_S6V.js","assets/index-C4_n5-pT.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-DQQ2qgcZ.js","assets/Graphics-09MI2GwJ.js","assets/swopCharacters-DvDvpSiD.js","assets/WebGLRenderer-CkLTpltt.js"])))=>i.map(i=>d[i]);
import{x as to,a8 as ae,a9 as W,m as Pn,y as ie,E as y,e as Je,c as no,C as v,d as Ie,v as Ge,ao as g,D as bt,ag as me,T as Se,U as ro,V as oo,aH as io,aI as so,aJ as ao,l as lo,aK as co,A as uo,aL as fo,aM as se,aN as ho,aO as Bn,a2 as po,aP as mo,X as T,aQ as Ve,aR as ke,aS as go,aT as bo,L as O,Q as I,aU as Pe,a4 as ve,H as Fn,aV as le,aW as Ze,$ as Q,_ as A,aX as vt,aY as vo,O as xt,aZ as xo,a_ as Be,W as Pt,Y as Ke,a$ as An,b0 as Vt,b1 as yo,b2 as wo,b3 as To,N as q,b4 as Co,b5 as So,a3 as Ln,K as Qe,b6 as Bt,b7 as ko,a0 as _,b8 as Oo,J as zn,b9 as _o,ba as Io,bb as Po,bc as st,bd as Bo,be as Fo,bf as Ao,bg as Lo,bh as zo,bi as Do,bj as Oe,Z as Mo,a6 as Ro,bk as Uo,bl as Dn,ad as he,bm as Eo,a5 as Xt}from"./App-BACw8uni.js";import{l as yt,h as qe,g as P,j as Ht,p as M,k as jt,m as Le,n as $o,s as ge,q as ce,i as $,r as wt,t as No,u as Vo,v as Xo,w as Ho,x as N,y as ze,z as jo,A as Go,B as J,C as qo,D as Wo,E as Yo,F as xe,G as at,H as Tt,c as Ft,I as Jo,J as Mn,K as et,L as At,M as Zo,N as Gt,O as lt,P as Rn,Q as Ko,a as ue,R as Un,S as En,T as qt,U as $n,f as Qo,V as Nn,W as Vn,X as ei,Y as ti,Z as Lt,_ as ni,$ as ri,a0 as oi,a1 as ii,b as Fe,a2 as Wt,a3 as Xn,a4 as si,e as Hn,o as jn,a5 as Yt,a6 as ai,a7 as w,a8 as We,a9 as tt,aa as li,ab as ci}from"./swopCharacters-DvDvpSiD.js";import{S as ui,G as E}from"./Graphics-09MI2GwJ.js";import{_ as Jt,g as di}from"./index-D0a3_S6V.js";const Gn=class Ct extends to{constructor(e){e={...Ct.defaultOptions,...e},super(e),this.enabled=!0,this._state=ui.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=ae.from(n)),r&&(s=W.from(r)),new Ct({gpuProgram:i,glProgram:s,...o})}};Gn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Z=Gn;var fi=`
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
`,hi=`in vec2 aPosition;
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
`,pi=`
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
}`;class C extends Z{constructor(e){const n=e.gpu,r=Zt({source:pi,...n}),o=ae.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Zt({source:fi,...i}),a=W.from({vertex:hi,fragment:s}),l=new Pn({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:ie.EMPTY}})}}function Zt(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const zt=`
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
    `,Dt=`
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
	`;class qn extends C{constructor(){super({gl:{functions:`
                ${zt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Dt}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}qn.extension={name:"color",type:y.BlendMode};class Wn extends C{constructor(){super({gl:{functions:`
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
            `}})}}Wn.extension={name:"color-burn",type:y.BlendMode};class Yn extends C{constructor(){super({gl:{functions:`
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
                `}})}}Yn.extension={name:"color-dodge",type:y.BlendMode};class Jn extends C{constructor(){super({gl:{functions:`
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
                `}})}}Jn.extension={name:"darken",type:y.BlendMode};class Zn extends C{constructor(){super({gl:{functions:`
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
            `}})}}Zn.extension={name:"difference",type:y.BlendMode};class Kn extends C{constructor(){super({gl:{functions:`
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
            `}})}}Kn.extension={name:"divide",type:y.BlendMode};class Qn extends C{constructor(){super({gl:{functions:`
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
            `}})}}Qn.extension={name:"exclusion",type:y.BlendMode};class er extends C{constructor(){super({gl:{functions:`
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
                `}})}}er.extension={name:"hard-light",type:y.BlendMode};class tr extends C{constructor(){super({gl:{functions:`
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
            `}})}}tr.extension={name:"hard-mix",type:y.BlendMode};class nr extends C{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"lighten",type:y.BlendMode};class rr extends C{constructor(){super({gl:{functions:`
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
                `}})}}rr.extension={name:"linear-burn",type:y.BlendMode};class or extends C{constructor(){super({gl:{functions:`
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
            `}})}}or.extension={name:"linear-dodge",type:y.BlendMode};class ir extends C{constructor(){super({gl:{functions:`
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
            `}})}}ir.extension={name:"linear-light",type:y.BlendMode};class sr extends C{constructor(){super({gl:{functions:`
                ${zt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Dt}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}sr.extension={name:"luminosity",type:y.BlendMode};class ar extends C{constructor(){super({gl:{functions:`
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
            `}})}}ar.extension={name:"negation",type:y.BlendMode};class lr extends C{constructor(){super({gl:{functions:`
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
                `}})}}lr.extension={name:"overlay",type:y.BlendMode};class cr extends C{constructor(){super({gl:{functions:`
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
                `}})}}cr.extension={name:"pin-light",type:y.BlendMode};class ur extends C{constructor(){super({gl:{functions:`
                ${zt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Dt}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ur.extension={name:"saturation",type:y.BlendMode};class dr extends C{constructor(){super({gl:{functions:`
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
                `}})}}dr.extension={name:"soft-light",type:y.BlendMode};class fr extends C{constructor(){super({gl:{functions:`
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
                `}})}}fr.extension={name:"subtract",type:y.BlendMode};class hr extends C{constructor(){super({gl:{functions:`
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
                `}})}}hr.extension={name:"vivid-light",type:y.BlendMode};const St=[];Je.handleByNamedList(y.Environment,St);async function mi(t){if(!t)for(let e=0;e<St.length;e++){const n=St[e];if(n.value.test()){await n.value.load();return}}}let ye;function gi(){if(typeof ye=="boolean")return ye;try{ye=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{ye=!1}return ye}var pr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(pr||{});class bi{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const vi=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],mr=class gr extends no{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...vi,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await mi(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...gr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof v&&(r={container:r},n&&(Ie(Ge,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:g.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=pr.ALL);const{clear:r,clearColor:o,target:i}=e;g.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,g.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new bi(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!gi())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};mr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let br=mr,De;function xi(t){return De!==void 0||(De=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??br.defaultOptions.failIfMajorPerformanceCaveat};try{if(!bt.get().getWebGLRenderingContext())return!1;let r=bt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),De}let Me;async function yi(t={}){return Me!==void 0||(Me=await(async()=>{const e=bt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Me}const Kt=["webgl","webgpu","canvas"];async function wi(t){let e=[];t.preference?(e.push(t.preference),Kt.forEach(i=>{i!==t.preference&&e.push(i)})):e=Kt.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await yi()){const{WebGPURenderer:a}=await Jt(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-B5lNifAy.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&xi(t.failIfMajorPerformanceCaveat??br.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Jt(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-CkLTpltt.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const vr="8.6.6";class xr{static init(){globalThis.__PIXI_APP_INIT__?.(this,vr)}static destroy(){}}xr.extension=y.Application;class Ti{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,vr)}destroy(){this._renderer=null}}Ti.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"initHook",priority:-10};const yr=class kt{constructor(...e){this.stage=new v,e[0]!==void 0&&Ie(Ge,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await wi(e),kt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ie(Ge,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=kt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};yr._plugins=[];let wr=yr;Je.handleByList(y.Application,wr._plugins);Je.add(xr);var Ci=`in vec2 aPosition;
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
`,Si=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Qt=`struct GlobalFilterUniforms {
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
}`;const Tr=class Cr extends Z{constructor(e){e={...Cr.defaultOptions,...e};const n=ae.from({vertex:{source:Qt,entryPoint:"mainVertex"},fragment:{source:Qt,entryPoint:"mainFragment"}}),r=W.from({vertex:Ci,fragment:Si,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Pn({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Tr.defaultOptions={alpha:1};let ki=Tr;class Ye extends me{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof ie?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Se.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Se.shared.add(this.update,this,ro.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(ie.from(e[r]));return new Ye(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(ie.from(e[r]));return new Ye(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof ie)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Se.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Se.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Oi extends oo{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new io({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function _i(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ie(Ge,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Ii extends Oi{constructor(...e){const n=_i(e,"Text");super(n,so),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=ao.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class Mt extends ie{static create(e){return new Mt({source:new lo(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}var Re={},en;function Pi(){if(en)return Re;en=1;var t=co(),e=t.mark(i),n=uo(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,m=arguments;return t.wrap(function(x){for(;;)switch(x.prev=x.next){case 0:for(a=m.length,l=new Array(a),c=0;c<a;c++)l[c]=m[c];u=0,d=l;case 2:if(!(u<d.length)){x.next=8;break}return h=d[u],x.delegateYield(o(h),"t0",5);case 5:u++,x.next=2;break;case 8:case"end":return x.stop()}},e)}Re.__concat=i;var s=r(i);return Re.concat=s,Re}var ct,tn;function Bi(){return tn||(tn=1,ct=Pi().concat),ct}var Fi=Bi();const Xe=di(Fi);function Ai(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const Li=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},zi=({campaign:t,inputStateTracker:e})=>{const n=Li(t),r=fo(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&yt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&yt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:qe(o.items.head),heels:i===void 0?void 0:qe(i.items.heels)},inputStateTracker:e,campaign:t,events:Ai(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},b={pureBlack:new g("#000000"),lightBlack:new g("#212C20"),shadow:new g("#325149"),midGrey:new g("#7F7773"),lightGrey:new g("#BBB1AB"),white:new g("#FBFEFB"),metallicBlue:new g("#366BAE"),pink:new g("#D68ED1"),moss:new g("#9E9600"),redShadow:new g("#805E50"),midRed:new g("#CA7463"),lightBeige:new g("#DAA78F"),highlightBeige:new g("#EBC690"),alpha:new g("#1E7790"),replaceLight:new g("#08A086"),replaceDark:new g("#187558")},Rt=`in vec2 aPosition;
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
`,Di=`#version 300 es

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
`;class _e extends Z{constructor(e,n){const r=W.from({vertex:Rt,fragment:Di,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const Mi=`precision mediump float;
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
`,nn=[b.pureBlack,b.lightBlack];class G extends Z{uniforms;constructor(e="white"){const n=W.from({vertex:Rt,fragment:Mi,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=nn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=nn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new g(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const R={original:new g("rgb(255, 255, 255)"),basic:new g("rgb(210, 210, 210)"),dimmed:new g("rgb(120, 120, 120)")},U={original:new g("rgb(255, 255, 0)"),basic:new g("hsl(50,65%,70%)"),dimmed:b.redShadow},H={original:new g("rgb(255, 0, 255)"),basic:b.pink,dimmed:new g("hsl(290,35%,38%)")},S={original:new g("rgb(0, 255, 255)"),basic:new g("hsl(183, 50%, 50%)"),dimmed:new g("hsl(183, 50%, 25%)")},j={original:new g("rgb(0, 255, 0)"),basic:b.moss,dimmed:new g("hsl(73,50%,25%)")},Ut={white:{basic:{main:R,edges:{towards:S,right:U},hud:{lives:U,dimmed:H,icons:S}},dimmed:{main:R,edges:{towards:j,right:S},hud:{lives:U,dimmed:H,icons:S}}},yellow:{basic:{main:U,edges:{towards:j,right:R},hud:{lives:S,dimmed:H,icons:j}},dimmed:{main:U,edges:{towards:S,right:S},hud:{lives:S,dimmed:H,icons:j}}},magenta:{basic:{main:H,edges:{towards:j,right:S},hud:{lives:R,dimmed:S,icons:U}},dimmed:{main:H,edges:{towards:j,right:S},hud:{lives:R,dimmed:S,icons:U}}},cyan:{basic:{main:S,edges:{towards:H,right:R},hud:{lives:R,dimmed:j,icons:U}},dimmed:{main:S,edges:{towards:H,right:R},hud:{lives:R,dimmed:j,icons:U}}},green:{basic:{main:j,edges:{towards:S,right:U},hud:{lives:R,dimmed:H,icons:S}},dimmed:{main:j,edges:{towards:S,right:U},hud:{lives:R,dimmed:H,icons:S}}}},Et=t=>Ut[t.hue][t.shade],Sr=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Ht>n?100-Math.ceil((n-e)/(Ht/100)):0},kr=t=>{const e=100*P.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/P.w):0};function $t(t,e){const n=e||new v;for(const r of t)n.addChild(r);return n}const rn={x:.5,y:1},on=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({texture:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a}=t;let l;if(on(t)?l=Ri(t):l=new me(se.textures[t.texture]),a!==void 0){const c={x:1,y:1,z:1,...a},u=new v({label:"timesXyz"});for(let{x:d}=c;d>=1;d--)for(let{y:h}=c;h>=1;h--)for(let m=1;m<=c.z;m++){const p=f(ho(t,"times")),x=M({x:d-1,y:h-1,z:m-1});p.x+=x.x,p.y+=+x.y,u.addChild(p)}return u}if(e===void 0&&r===void 0)if(on(t))l.anchor=rn;else{const c=se.data.frames[t.texture].frame;c.pivot!==void 0?l.pivot=c.pivot:l.anchor=rn}else e!==void 0&&(l.anchor=e),r!==void 0&&(l.pivot=r);return o!==void 0&&(l.x=o),i!==void 0&&(l.y=i),s!==void 0&&(l.filters=s),l.eventMode="static",n===!0&&(l.scale.x=-1),l}};function Ri({animationId:t,reverse:e,playOnce:n}){const o=se.animations[t].map(s=>({texture:s,time:Bn}));e&&o.reverse();const i=new Ye(o);return i.animationSpeed=po.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const Ui=`in vec2 vTextureCoord;
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
`;class nt extends Z{constructor(e){const n=Object.keys(e).length,r=W.from({vertex:Rt,fragment:Ui.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{b[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Or=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),_r=t=>Or(Ut[t.color.hue][t.color.shade].main),Ei=t=>new nt({lightBeige:b.lightGrey,redShadow:b.shadow,pink:b.lightGrey,moss:b.lightGrey,midRed:b.midGrey,highlightBeige:b.lightGrey,..._r(t)}),$i=new nt({midGrey:b.midRed,lightGrey:b.lightBeige,white:b.highlightBeige,metallicBlue:b.redShadow,pink:b.midRed,moss:b.midRed,replaceDark:b.midRed,replaceLight:b.lightBeige}),Ot=(t,e,n)=>n?new nt(Or(Ut[t.color.hue][t.color.shade].edges[e])):new G(Et(t.color).edges[e].original),K=t=>new nt(_r(t)),_t=mo,Ni=250,Vi=24,Xi=56,Hi=80,sn=112,we=t=>t==="heels"?1:-1;function*ji(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;bo(o),yield f({texture:o,x:(r+.5-n/2)*Ve.w})}}function Te(t,e){t.removeChildren(),$t(ji(e),t)}class Gi{#e=new v({label:"HudRenderer"});#o=new G;#r=new G;#n=new G;#a=new G;#i=new G(b.moss);#s=new _e(b.pureBlack,T.getState().upscale.gameEngineUpscale);#c=new G;#h=[this.#s,this.#a];#l={original:[this.#s,this.#c],colourised:{head:[this.#s,new G(b.metallicBlue)],heels:[this.#s,new G(b.pink)]}};#t={head:{sprite:this.#f("head"),livesText:this.#d({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#u({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#u({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#f("heels"),livesText:this.#d({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#u({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new v({label:"heelsCarrying"})}},fps:this.#d({label:"fps",outline:!0})};constructor(){for(const e of jt)this.#e.addChild(this.#t[e].livesText),this.#e.addChild(this.#t[e].sprite),this.#e.addChild(this.#t[e].shield.container),this.#e.addChild(this.#t[e].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[this.#i],this.#t.fps.y=Ve.h,this.#t.fps.x=Ve.w*2}#u({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new v({label:i});s.pivot={x:4,y:16};const a=new me({texture:se.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#n,y:n?0:8});s.addChild(a);const l=this.#d({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Ve.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#s),{text:l,icon:a,container:s}}#f(e){const n=new me(se.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#d({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new v({label:r,filters:n?this.#h:this.#a,scale:{x:1,y:e?2:1}})}#m(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+we("head")*sn,this.#t.head.doughnuts.container.y=e.y-ke.h-8,this.#t.heels.carrying.container.y=e.y-ke.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+we("heels")*sn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}#v(e){return f(e.type==="spring"?"spring.released":e.type==="sceneryPlayer"?e.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":e.config.style)}#p(e,n){return e?n?_t:this.#c:this.#o}#x(e,n){const r=Le(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,a=s.children.length>0;if(i===null&&a)for(const l of s.children)l.destroy();i!==null&&!a&&s.addChild(this.#v(i)),s.filters=this.#p(!0,n),this.#t.heels.bag.icon.filters=this.#p(o,n)}#y(e,n){const r=Le(e,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#p(o,n),this.#t.head.doughnuts.icon.filters=this.#p(i!==0,n),Te(this.#t.head.doughnuts.text,i)}#w(e,n,r){const o=Le(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+we(r)*Hi,Te(i,Sr(o)),s.y=n.y,Te(a,o===void 0?0:r==="head"?kr(o):o.bigJumps),l.y=n.y-24}#g(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#T(e,n,r,o){const i=this.#g(e,o),s=this.#t[o].sprite;i?s.filters=r?_t:this.#c:$o(e)?s.filters=this.#r:s.filters=this.#o,s.x=(n.x>>1)+we(o)*Xi,s.y=n.y-ke.h}#C(e,n,r){const i=Le(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+we(r)*Vi,s.y=n.y,Te(s,i??0)}#S(e,n){const r=ge(e);if(r===void 0)return;const o=Et(r.color);this.#o.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#a.targetColor=o.hud.dimmed[n?"basic":"original"],this.#n.targetColor=o.hud.icons[n?"basic":"original"],this.#r.targetColor=o.hud.dimmed[n?"basic":"original"],this.#c.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#g(e,"head")?this.#l.colourised.head:this.#o:this.#l.original,this.#t.heels.livesText.filters=n?this.#g(e,"heels")?this.#l.colourised.heels:this.#o:this.#l.original}#b=Number.NEGATIVE_INFINITY;#k(){if(go(T.getState())){if(performance.now()>this.#b+Ni){const e=Se.shared.FPS;Te(this.#t.fps,Math.round(e)),this.#i.targetColor=e>56?b.moss:e>50?b.metallicBlue:e>40?b.pink:b.midRed,this.#b=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick({gameState:e,screenSize:n,colourise:r}){this.#S(e,r);for(const o of jt)this.#C(e,n,o),this.#T(e,n,r,o),this.#w(e,n,o);this.#m(n),this.#y(e,r),this.#x(e,r),this.#k()}get container(){return this.#e}destroy(){this.#e.destroy()}}const an={movementType:"vel",vels:{gravity:O}},qi=(t,e,n)=>{if(!ce(t))return an;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=No[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?$("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-wt*n,-a)}}}:an:{movementType:"vel",vels:{gravity:{z:Math.max(o-wt*n,-a)}}}},be={movementType:"steady"},Ue=t=>{const n=t/jo*Bn;return(t+.5*wt*n**2)/n},Wi={head:Ue(ze.head),headOnSpring:Ue(ze.head+P.h),heels:Ue(ze.heels),heelsOnSpring:Ue(ze.heels+P.h)},Yi=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Wi[`${n}${e?"OnSpring":""}`]},Ji=t=>!(t===null||Xo(t)||Ho(t)&&t.config.gives==="scroll"||N(t)&&t.state.standingOn===null),Ir=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&Ji(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:be;const i=Vo(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Yi(t,i)}},stateDelta:{action:"moving",jumped:!0}}},Zi=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Pe(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return I(n,l)},ln={movementType:"vel",vels:{walking:O}},Pr=(t,e,n)=>{const r=Ki(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Pe(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ve(r.vels.walking,O)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Ki=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:h,gravity:m}}}=t,p=n===t.id,x=p?e.currentActionPress("jump"):"released",V=p?e.directionVector:O,L=a===null&&m.z<0,X=o==="head"&&kr(t.state)>0&&a!==null,z=o==="headOverHeels"?L?"head":"heels":X?"heels":o,k=s?l:V,B=J[z];if(c!==null||i==="death")return ln;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Fn(h,I(h,Go*r))}}:ln;if(x!=="released"){const D=le(Ze(k,Q)?l:k),eo=$("spring")(a)?1:qo;return{movementType:"vel",vels:{walking:I({...D,z:0},B*eo)},stateDelta:{facing:D}}}}if(Pe(k)!==0)return L?{movementType:"vel",vels:{walking:I({...k,z:0},B)},stateDelta:{facing:k,action:"falling"}}:{movementType:"vel",vels:{walking:Zi({vel:h,acc:Wo[z],deltaMS:r,maxSpeed:B,unitD:k,minSpeed:0})},stateDelta:{facing:k,action:"moving"}};if(u>0&&u<1){const D=ve(d,l)?1:0;return{movementType:"position",posDelta:I(l,D-u),stateDelta:{action:L?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:L?"falling":"idle"}}},cn=P.h,Ee=.001,Qi=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=at**2/(2*xe);if(n==="up"){if(e<=r)return Math.max(Ee,Math.sqrt(2*xe*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(Ee,Math.sqrt(2*xe*o))}else return at}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-Ee,-Math.sqrt(2*xe*o))}else return e<=r?Math.min(-Ee,-Math.sqrt(2*xe*Math.max(e,0))):-at},es={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function ts({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(A(o).some(h=>Yo(h)&&h.config.style==="stepStool"))return es;const l=t*cn,c=e*cn,u=Qi({currentAltitude:r-l,direction:n,totalDistance:c-l});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=l?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function ns(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&$("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:Tt}}}:be;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return Ft({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Tt}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const un={movementType:"vel",vels:{movingFloor:O}},rs=(t,e,n)=>{if(N(t)&&t.state.teleporting!==null)return un;const{state:{standingOn:r}}=t;if(r===null||!$("conveyor")(r))return un;const{config:{direction:o}}=r,s=$("heels")(t)&&t.state.action==="moving"&&vt(t.state.facing)===vo(o)?J.heels:Jo;return{movementType:"vel",vels:{movingFloor:I(xt[o],s)}}},Br=150,Fr=t=>t[Math.floor(Math.random()*t.length)],ee=Object.freeze({movementType:"vel",vels:{walking:O}}),rt=t=>Mn(t)?J[t.config.which]:J[t.type],dn=P.w/2,os=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=J.homingBot;if(!Ze(e,Q))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Be(l.state.position,t);if(Math.abs(c.y)<dn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<dn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},Ar=(t,e)=>{const{items:{head:n,heels:r}}=e;if(e.items.headOverHeels!==void 0)return e.items.headOverHeels;const o=n===void 0?void 0:Vt(n.state.position,t),i=r===void 0?void 0:Vt(r.state.position,t);return o===void 0?r:i===void 0||o<i?n:r},is=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ee;const l=Ar(o,e);if(l===void 0||s+Br>e.roomTime)return be;const c=Be(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>P.w/4?u:Pt(u),h=rt(t),m={...O,[d]:c[d]>0?h:-h},p=le(m),x=!Ze(p,a);return{movementType:"vel",vels:{walking:m},stateDelta:{facing:p,...x?{timeOfLastDirectionChange:e.roomTime}:Ke}}},fn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return ee;const a=Ar(i,e);if(a===void 0)return ee;const l=a.state.position,c=P.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ee;const d=Be(a?.state.position,i),h=rt(t),m=(1+Math.sqrt(2))/2,p=h*m,x=I({...d,z:0},p/An(d)*(o?-1:1));return{movementType:"vel",vels:{walking:x},stateDelta:{facing:le(x)}}},ut=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return ee;if(!(ve(i,O)||Math.random()<r/1e3))return be;const l=Fr(o);return{movementType:"vel",vels:{walking:I(xt[l],rt(t))},stateDelta:{facing:xt[l]}}},ss=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?ee:Ze(i,Q)?{movementType:"vel",vels:{walking:I(o,rt(t))}}:be},as=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Fr([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},dt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Br))return;const c=et(i,l,e,n);if(c.x===0&&c.y===0)return;const u=as(s,c,o);t.state.vels.walking=u,t.state.facing=le(u),t.state.durationOfTouch=0},ls=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},cs=(t,e,n,r)=>{if(!t.state.activated||Mn(t)&&t.state.busyLickingDoughnutsOffFace)return ee;switch(t.config.movement){case"patrol-randomly-diagonal":return ut(t,e,n,r,To);case"patrol-randomly-xy8":return ut(t,e,n,r,wo);case"patrol-randomly-xy4":return ut(t,e,n,r,yo);case"towards-tripped-on-axis-xy4":return os(t,e);case"towards-on-shortest-axis-xy4":return is(t,e);case"back-forth":case"clockwise":return ss(t);case"unmoving":case"free":return ee;case"towards-when-in-square-xy8":return fn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return fn(t,e,n,r,xo(T.getState()));default:throw t.config,new Error("this should be unreachable")}},us=t=>{const{movingItem:e,touchedItem:n}=t;if(ce(n,e))switch(e.config.movement){case"patrol-randomly-xy4":dt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":dt(t,"opposite");break;case"clockwise":dt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":ls(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},ds=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},hn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>ds(t,e,n,r),pn=.001,Nt=(t,e,n=.001)=>{if(!ce(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:At({state:{position:q(t.state.position,{x:0,y:0,z:-pn})},aabb:{...t.aabb,z:n+pn},id:t.id},{state:{position:q(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Lr=(t,e)=>{const r=[...A(e).filter(i=>Nt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Zo(s,i);return a<0||a===0&&hn(t,s)>hn(t,i)?s:i})};function zr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Sr(n)>0||(e.state.action="death",e.state.expires=t+Tt)}const Dr=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=lt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=lt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=Gt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=lt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=Gt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":T.dispatch(So(r.config.page));break;case"reincarnation":break;case"crown":{T.dispatch(Co(r.config.planet));break}default:r.config}},fs=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Ln(i,r)<=0||e.state.action!=="death"&&Ft({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},hs=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=Qe(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):0,y:i==="y"?-Math.abs(e.x):0,z:0}:{x:i==="x"?Math.abs(e.y):0,y:i==="y"?Math.abs(e.x):0,z:0};t.state.position=q(t.state.position,s)};function ps({movingItem:t}){t.state.autoWalk=!1}const Y=(t,...e)=>$(...e)(t.touchedItem),Ce=(t,...e)=>$(...e)(t.movingItem),Mr=t=>N(t.movingItem),ms=t=>N(t.touchedItem),gs=t=>Rn(t.touchedItem),mn=t=>{switch(!0){case Y(t,"stopAutowalk"):ps(t);break;case gs(t):zr(t);break;case Y(t,"portal"):fs(t);break;case Y(t,"pickup"):Dr(t);break;case Y(t,"doorFrame"):hs(t);break}},bs=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of Bt(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&T.dispatch(ko(o.path))}},vs=({movingItem:t,touchedItem:e})=>{if(!ce(t))return;const{state:{position:n},aabb:r}=e,o=et(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=le(o),s=I(i,-J.ball);return e.state.vels.sliding=s,!1},xs=({movingItem:t,touchedItem:e})=>{if(!ce(e))return;const n=t.state.vels.sliding;if(ve(n,O))return;const{state:{position:r},aabb:o}=t,i=et(e.state.position,e.aabb,r,o);return Ln(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},ys=2*Ko,Rr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ys,positionDelta:n})},ws=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Fn(r.state.position,o),z:0};if(!ve(s,O))for(const a of r.state.stoodOnBy)Rr(a,e,s)}},Ts=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=et(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=le(a);for(const c of o){const u=e.items[c],d=I(l,-J.charles*r);u.state.facing=d,Rr(u,e,d)}},gn=t=>ue(t.movingItem)&&Nt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Ur=(t,e)=>{let n=O;for(const r of e){if(r.movementType==="position"&&(n=q(n,r.posDelta)),r.movementType==="vel"&&(ue(t)||$("lift")(t)))for(const[i,s]of Bt(r.vels)){const a={...O,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},bn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&N(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&gn(t)){if(gn(t)&&Mr(t)){Un({above:t.movingItem,below:t.touchedItem});const n=[Ir(t.movingItem,t.gameState),Pr(t.movingItem,t.gameState,t.deltaMS)];Ur(t.movingItem,n)}En(t)}};function Cs(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Er=t=>{Mr(t)&&mn(t),ms(t)&&mn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),Y(t,...qt)&&vs(t),Ce(t,...qt)&&xs(t),(Ce(t,"monster")&&Y(t,"firedDoughnut")||Ce(t,"firedDoughnut")&&Y(t,"monster"))&&Cs(t),(Ce(t,"monster")||Ce(t,"movableBlock"))&&us(t),Y(t,"switch")&&bs(t),Y(t,"joystick")&&Ts(t),t.touchedItem.state.disappear&&bn(t),t.movingItem.state.disappear&&ce(t.touchedItem,t.movingItem)&&bn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Ss=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=A(_(e.items)).filter($n),u=s===null?Os(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}ks(e,i,u)}else{if(t.state.standingOn===null||!$r(t,_(e.items)))return;const d=Qo({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Nn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:Er}),i.carrying=null}},ks=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Vn({room:t,item:n})},Os=(t,e)=>Lr(t,A(_(e.items)).filter($n)),$r=(t,e)=>{const n={position:q(t.state.position,{z:P.h})},r=ei({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(ce(o,t)){if(!ue(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!$r(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0};function*_s(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Is=P.w*Math.sqrt(2)+1,Ps=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,h=500,m=le(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+h<c){const p={type:"firedDoughnut",...ti,config:Ke,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:q(u,I(m,Is),t.type==="headOverHeels"?{z:P.h}:O),vels:{fired:I(m,J.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Lt({room:e,item:p}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},Bs=2;function*Fs(t,e,n,r){ue(t)&&(yield qi(t,n,r),yield rs(t),yield*_s(t,e)),N(t)&&(yield Pr(t,n,r),t.id===n.currentCharacterName&&(yield ns(t,n,r),yield Ir(t,n),ni(t)&&Ss(t,e,n,r),ri(t)&&Ps(t,e,n))),oi(t)&&(yield ts(t)),ii(t)&&(yield cs(t,e,n,r))}const As=(t,e,n,r)=>{!ue(t)||t.state.standingOn===null||(N(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&Dr({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e,movementVector:{x:0,y:0,z:-1},deltaMS:r})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||N(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&En({touchedItem:t.state.standingOn,gameState:n,room:e}))},Ls=(t,e,n,r)=>{N(t)&&t.state.standingOn!==null&&Rn(t.state.standingOn)&&zr({gameState:n,room:e,movingItem:t,touchedItem:t.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...Fs(t,e,n,r)];As(t,e,n,r);let i=Ur(t,o);(ue(t)||$("lift")(t)||$("firedDoughnut")(t))&&(i=q(i,...A(_(t.state.vels)).map(l=>I(l,r))));const s=Math.ceil(Pe(i)/Bs),a=I(i,1/s);for(let l=0;l<s;l++)Nn({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:Er})},zs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,oe(t,e);const u=Wt(e)[c],d=pe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:qe(u)};return}if(t.entryState.headOverHeels!==void 0){oe(t,e);const c=pe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Wt(e);if(oe(t,c),oe(t,u),At(c,u)){const d=Xn({head:c,heels:u});oe(t,d,"heels");const h=pe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:qe(d)};return}else{const d=pe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},pe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=yt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Lt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&si(o,t);return o},oe=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},Ds=(t,e)=>{const n=Hn(t,jn(e.type));if(e.state.lives--,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];oe(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Xn({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});oe(t,a);const l=pe({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Lt({room:r,item:e});return}else{const s=pe({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Ms=(t,e)=>{e.type==="headOverHeels"?zs(t,e):Ds(t,e),Fe(t)===void 0&&T.dispatch(Oo())},Rs=t=>{for(const e of _(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){Yt(n);continue}if(!Nt(n,e)){Yt(n);const r=Lr(n,_(t.items));r!==void 0&&Un({above:n,below:r})}}},Us=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Es=(t,e,n)=>{for(const r of _(t.items))!ue(r)||t.roomTime===r.state.actedOnAt||_o(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=Io(r.state.position),n.add(r))},$s=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Ns=Ke,Vs=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=vn(t,e),i=ge(t)?.items??Ns;n=new Set(A(Xe(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return vn(t,e*t.gameSpeed)},vn=(t,e)=>{const{inputStateTracker:n}=t,r=ge(t);if(r===void 0)return zn;const o=Object.fromEntries(A(Bt(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&ai(t);for(const a of _(r.items))Us(a,r)&&(Vn({room:r,item:a}),N(a)&&Ms(t,a));const i=Object.values(r.items).sort($s);for(const a of i){const l=Fe(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&Ls(a,r,t,e)}Rs(r);const s=new Set(A(_(r.items)).filter(a=>o[a.id]===void 0||!ve(a.state.position,o[a.id])));return ws(s,r,o),Es(r,o,s),Xs(t,r,e),s},Xs=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Fe(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Hn(t,jn(r.type));i!==void 0&&(i.state.gameTime+=n)}}},xn=(t,e)=>{const n=w(t),r=w(q(t,{x:e.x,z:e.z})),o=w(q(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},ft=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Hs=(t,e,n,r)=>{const o=xn(t,e),i=xn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=ft(s,a,l,c),d=o.topRight.y-o.topRight.x/2,h=o.bottomCentre.y-o.bottomCentre.x/2,m=i.topRight.y-i.topRight.x/2,p=i.bottomCentre.y-i.bottomCentre.x/2,x=ft(d,h,m,p),V=o.topLeft.y+o.topLeft.x/2,L=o.bottomCentre.y+o.bottomCentre.x/2,X=i.topLeft.y+i.topLeft.x/2,z=i.bottomCentre.y+i.bottomCentre.x/2,k=ft(V,L,X,z);return u&&x&&k},js=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Hs(n,r,o,i))return 0;for(const s of Po){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return yn(e)-yn(t)},yn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class He extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const Gs=t=>{const e=qs(t);let n=e.length,r=n;const o=new Array(n),i={},s=Ws(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new He([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const m=h[--c];try{a(m,s.get(m),u)}catch(p){throw p instanceof He?p.hasClosedCycle?p:new He([l,...p.cyclicDependency],p.cyclicDependency.includes(l)):p}}while(c);u.delete(l)}o[--n]=l}};function qs(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Ws(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const wn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},$e=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Ys=(t,e=new Set(_(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||$e(n,o,s);for(const o of e)if(o.renders)for(const i of _(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=js(o,i);if(wn(r,o,i),s===0){$e(n,o.id,i.id),$e(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;wn(n,a,l),$e(n,l,a)}return n},Nr=(t,e,n=3)=>{try{return{order:Gs(t),impossible:!1}}catch(r){if(r instanceof He){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),{order:Nr(t,e,n-1).order,impossible:!0}}else throw r}},Js=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Zs=(t,e,n)=>{const o=se.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&se.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},Ne=t=>F(()=>f(t)),F=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,previousRendering:null}),renderProps:Ke}:"no-update";function*Ks({config:{direction:t,inHiddenWall:e,height:n}},r){const o=Qe(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const c=f({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...st(a,{y:-P.h*n})});c.filters=Ot(r,o==="x"?"towards":"right",!0),yield c}}else{yield f({pivot:{x:i,y:9},texture:"generic.door.legs.base",...st(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...st(a,{y:-l*P.h})})}}yield*s(M({...Q,[o]:1})),yield*s(Q),e||(yield f({pivot:{x:16,y:P.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...M({...Q,[o]:1})}))}const Vr=(t,e)=>{const n=Qe(t),r=Pt(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):Q},Qs=F(({item:t,room:e})=>$t(Ks(t,e),new v({filters:K(e),...Vr(t.config.direction,t.aabb)}))),ea=F(({item:{config:{direction:t,part:e},aabb:n},room:r})=>{const o=Qe(t);return f({texture:Zs(r,o,e),filter:K(r),...Vr(t,n)})}),ht={animationId:"bubbles.cold"},ne=({top:t,bottom:e="homingBot",filter:n})=>{const r=new v({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},pt=({name:t,action:e,facingXy8:n,teleporting:r,highlighted:o})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r!==null){if(r.phase==="out")return{animationId:`${t}.fadeOut`};if(r.phase==="in")return{animationId:`${t}.fadeOut`}}const i=o?new _e(t==="head"?b.metallicBlue:b.pink,T.getState().upscale.gameEngineUpscale):void 0;if(e==="moving")return{animationId:`${t}.walking.${n}`,filter:i};if(e==="falling"){const a=`${t}.falling.${n}`;if(Ao(a))return{texture:a,filter:i}}const s=`${t}.idle.${n}`;return Lo(s)?{animationId:s,filter:i}:{texture:`${t}.walking.${n}.2`,filter:i}},Tn=({gameTime:t,switchedToAt:e})=>e+500>t,mt=({item:t,currentlyRenderedProps:e,previousRendering:n})=>{const{type:r,state:{action:o,facing:i,teleporting:s}}=t,a=Bo(i),l=t.type==="headOverHeels"?Tn(t.state.head):Tn(t.state),c=Pe(i);return e===void 0||e.action!==o||e.facingXy8!==a||e.teleportingPhase!==(s?.phase??null)||e.highlighted!==l?{container:r==="headOverHeels"?ne({top:pt({name:"head",action:o,facingXy8:a,teleporting:s,highlighted:l}),bottom:pt({name:"heels",action:o,facingXy8:a,teleporting:s,highlighted:l})}):f(pt({name:r,action:o,facingXy8:a,teleporting:s,highlighted:l})),renderProps:{action:o,facingXy8:a,teleportingPhase:s?.phase??null,highlighted:l,walkSpeed:c}}:o==="moving"&&e.walkSpeed!==c?(n.animationSpeed=c*Fo,{container:n,renderProps:{action:o,facingXy8:a,teleportingPhase:s?.phase??null,highlighted:l,walkSpeed:c}}):"no-update"},ta=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{side:r},position:{x:o,y:i}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],o),e[r][1]=Math.max(e[r][1],o))}return e},Xr=({blockXExtent:t,blockYExtent:e,blockXMin:n,blockYMin:r,type:o,extraWalls:i})=>{const s=new v({label:"towards"});for(let l=0;l<=t;l+=.5){const c=l+n+.5,u=A(i).find(p=>p.config.side==="towards"&&p.position.x<=c&&p.position.x>=c-1),d=u===void 0?0:u.position.y+1-r,h={x:l,y:d},m={x:7,y:0};s.addChild(We(h,f({pivot:m,texture:`${o}.towards`})))}const a=new v({label:"right"});for(let l=0;l<=e;l+=.5){const c=l+r+.5,u=A(i).find(h=>h.config.side==="right"&&h.position.y<=c&&h.position.y>=c-1),d=u===void 0?0:u.position.x+1-n;a.addChild(We({x:d,y:l},f({pivot:{x:0,y:0},texture:`${o}.right`})))}return{right:a,towards:s}},na=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new E().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(M),!0).fill(0);function*ra(t,e,n){for(const r of zo){const o=Pt(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let a=0;a<=t.size[r];a++){let l;if(t.walls[s][a]==="none"){const c=A(_(t.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===a||u.position[r]+1===a)&&u.position[o]===t.size[o]);c===void 0?l="none":c.position.z===0?l="behind-door":l="corner-on-floor"}else l="corner-on-floor";l!=="none"&&(yield We({[r]:a-e[r],[o]:t.size[o]+(n[i]?.5:0)+(l==="behind-door"?.5:0)},f(l==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const Hr=t=>[...A(_(t)).filter(e=>e.type==="wall")],oa=F(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=tt(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:h},roomJson:{items:m}}=e,p=new v({label:`floor(${e.id})`});if(d!=="none"){const k=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,B=new v;for(let D=-1;D<=o+2;D++)for(let Ae=D%2-1;Ae<=i+2;Ae+=2)B.addChild(We({x:D+(s.right?-.5:0),y:Ae+(s.towards?-.5:0)},f({texture:k})));$t(ra(e,{x:n,y:r},s),B);const te=new E().poly([Q,M({x:c,y:0}),M({x:c,y:u}),M({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});B.addChild(te),B.filters=K(e),B.mask=te,p.addChild(B)}const x=Hr(m),{towards:V,right:L}=Xr({blockXExtent:c,blockYExtent:u,blockXMin:n,blockYMin:r,type:"floorOverdraw",extraWalls:x});p.addChild(V),p.addChild(L);const X=new E().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);p.addChild(X);const z=ta([...x]);if(z!==void 0){const k=na({extraWallRanges:z,blockXMin:n,blockYMin:r});p.addChild(k)}return p.mask=X,p.y=-t.aabb.z,p.cacheAsTexture(!0),p}),ia=F(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=tt(t.roomJson),c=i-r,u=s-o,d=new v({label:"floorEdge"}),h=new E({label:"overDrawToHideFallenItems"}).poly([M({x:c,y:0}),M({x:0,y:0}),M({x:0,y:u}),{...M({x:0,y:u}),y:999},{...M({x:c,y:0}),y:999}],!0).fill(0);h.y=8,d.addChild(h);const{towards:m,right:p}=Xr({blockXExtent:c,blockYExtent:u,blockXMin:r,blockYMin:o,type:"floorEdge",extraWalls:Hr(t.roomJson.items)}),x=!e&&n.colourise;m.filters=Ot(t,"towards",x),p.filters=Ot(t,"right",x),d.addChild(m),d.addChild(p);const V=new E({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(V),d.mask=V,d.cacheAsTexture(!0),d}),sa=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,gt=b.moss,Cn=F(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),aa={head:mt,heels:mt,headOverHeels:mt,doorFrame:ea,doorLegs:Qs,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:F(({item:{config:{side:t,style:e}},room:n})=>{if(t==="right"||t==="towards")throw new Error("this wall should be non-rendering");return f({texture:Js(n.planet,e,t,n.color.shade==="dimmed"),y:1,pivot:t==="away"?{x:Oe.w,y:Oe.h+1}:{x:0,y:Oe.h+1},filter:K(n)})}),barrier:F(({item:{config:{axis:t,times:e}}})=>f({texture:`barrier.${t}`,times:e})),deadlyBlock:F(({item:{config:{style:t,times:e}},room:n})=>f({texture:t,filter:t==="volcano"?K(n):void 0,times:e})),slidingDeadly:Cn,slidingBlock:Cn,block({item:{config:{style:t,times:e},state:{disappear:n}},room:r,currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:f({texture:sa(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?K(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?Do(T.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t},state:{stoodOnBy:e}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new v,s=Mo(t);return i.addChild(f(r?{animationId:`conveyor.${s}`,reverse:t==="towards"||t==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:F(()=>{const t=new v,e={x:ke.w/2,y:ke.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({texture:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=A(t).find(N)!==void 0;return e===void 0||n!==e.flashing?{container:n?new v({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:F(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({texture:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:K(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:F(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=vt(t);return e===void 0||n!==e.facingXy4?{container:ne({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?$i:o?void 0:Ei(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=vt(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({texture:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({texture:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{texture:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ne({top:{texture:`${t.which}.${a}`,filter:s||K(n)},bottom:ht}):f({texture:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ne({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{texture:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({texture:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ne({top:ht,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ne({top:"ball",bottom:ht,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:Ne("joystick"),movableBlock:F(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new _e(gt,T.getState().upscale.gameEngineUpscale):void 0;return{container:f({texture:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new _e(gt,T.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new _e(gt,T.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?ne({top:{texture:`head.walking.${e}.2`,filter:i},bottom:{texture:`heels.walking.${e}.2`,filter:i}}):f({texture:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Ne("hushPuppy"),bubbles:F(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:Ne({animationId:"bubbles.doughnut"}),ball:Ne("ball"),floor:oa,floorEdge:ia},la=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class ca{#e;#o;#r=void 0;#n;#a;constructor(e,n,r){this.#e=e,this.#o=n,this.#n=new v({label:`ItemAppearanceRenderer ${e.id}`}),la(e,this.#n,r),this.#a=aa[e.type]}destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#o,currentlyRenderedProps:this.#r,displaySettings:e.displaySettings,previousRendering:this.#n.children.at(0)??null,onHold:e.onHold});n!=="no-update"&&(this.#r=n.renderProps,this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container))}get container(){return this.#n}}const Sn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},kn=(t,e)=>{const n=new E;return Sn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Sn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},ua={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class da{#e;constructor(e){const n=ua[e.type]??"rgba(255,255,255)";if(this.#e=new v({label:`ItemBoundingBoxRenderer ${e.id}`}),$("portal")(e)){const o=w(e.config.relativePoint);this.#e.addChild(new E().circle(o.x,o.y,5).stroke(n)),this.#e.addChild(new E().circle(o.x,o.y,2).fill(n))}this.#e.addChild(new E({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(kn(e.aabb,n)),e.renderAabb&&this.#e.addChild(kn(e.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#e.addChild(r=new Ii({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class fa{#e;#o;#r;constructor(e,n){this.#o=new v({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#r=n,this.#e=e,this.#n()}#n(){const e=w(this.#e.state.position);this.#o.x=e.x,this.#o.y=e.y}tick(e){this.#r?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#o.destroy({children:!0}),this.#r?.destroy()}get container(){return this.#o}}class ha{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=T.getState();o||(this.#e.filters=new ki({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const s=li(e)?e.config.times:void 0,a=f({...typeof i=="string"?{texture:i}:i,times:s&&Ro(s,"x","y")});let l;if(a instanceof me)l=a;else{const c=a.getLocalBounds(),u=Mt.create({width:c.maxX-c.minX,height:c.maxY-c.minY});a.x-=c.minX,a.y-=c.minY,r.render({container:a,target:u}),l=new me({texture:u,label:"shadowMaskSprite (of renderTexture)",x:c.minX,y:c.minY})}e.shadowMask.relativeTo==="top"&&(l.y-=e.aabb.z),s&&(l.y-=((s.z??1)-1)*P.h),this.#e.addChild(l),o||(this.#e.mask=l)}this.#e.addChild(this.#o),this.#e.addChild(new E().circle(0,0,2).fill(16711680))}#e=new v({label:"ItemShadowRenderer"});#o=new v({label:"shadows"});#r={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=A(_(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:ci}},a=Object.groupBy(i,l=>{const c=this.#r[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":At(s,l)?c?"update":"create":"noShadow"});for(const l of Xe(a.keepUnchanged,a.update))this.#r[l.id].renderedOnProgression=n;for(const l of Xe(a.create)){const c=f(l.shadowCastTexture);c.label=l.id,this.#o.addChild(c),this.#r[l.id]={sprite:c,renderedOnProgression:n}}for(const l of Xe(a.create,a.update)){const{sprite:c}=this.#r[l.id],u=w({...Be(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of Uo(this.#r))u!==n&&(c.destroy(),delete this.#r[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const pa=t=>t.shadowMask!==void 0,ma=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=T.getState(),{userSettings:{displaySettings:{showBoundingBoxes:i,colourise:s}}}=o,a=Dn(o),l=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const u=new ca(t,e,n);c.push(u),l&&(u.container.alpha=.66),!a&&s&&pa(t)&&c.push(new ha(t,e,r))}return l&&c.push(new da(t)),c.length===0?"not-needed":new fa(t,new ga(c))};class ga{#e;#o=new v({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#o.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#o}}const de=.33,ba=16,It=Oe.h-Oe.w/2,va=J.heels,xa=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=tt(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-ba-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,m=u.y+s-It<0;return(p,x,V)=>{if(p===void 0)return;const L=w(p.state.position),X=q(L,u),z={x:d&&X.x<n.x*de?Math.min(-a,n.x*de-L.x):h&&X.x>n.x*(1-de)?Math.max(n.x-l,n.x*(1-de)-L.x):u.x,y:m&&X.y<n.y*de?n.y*de-L.y:u.y};if(V)e.x=z.x,e.y=z.y;else{const k=va*x,B=Be(e,z),te=An(B);if(te>k){const D={x:B.x/te,y:B.y/te};e.x-=D.x*k,e.y-=D.y*k}else e.x=z.x,e.y=z.y}}},ya=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=tt(t);return new E().rect(e+r.x,o-It,n-e,r.y-o+It).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class On{#e=new v({label:"items"});#o=new v({label:"floorEdge"});#r=new v({children:[this.#e,this.#o]});#n=!1;#a=new Map;#i=new Map;#s;#c;#h;#l;#t;#u;#f;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=T.getState();this.#c=i,this.#h=s,this.#l=n,this.#t=e,this.#u=r,this.#f=o,this.#r.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&i.colourise,n.color),i.showBoundingBoxes!=="none"&&this.#r.addChild(ya(n.roomJson)),this.#s=xa(n,this.#r,s.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?_t:new G(Et(n).main.original)}#d(e){for(const n of _(this.#l.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=ma({item:n,room:this.#l,gameState:this.#t,pixiRenderer:this.#f}),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#o:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#l.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#m(e){const{order:n}=Nr(Ys(this.#l.items,e.movedItems,this.#a),this.#l.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(_(this.#l.items))};this.#s(Fe(this.#t),n.deltaMS,!this.#n),this.#d(n),(!this.#n||n.movedItems.size>0)&&this.#m(n),this.#n=!0}destroy(){this.#r.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#c}get upscale(){return this.#h}get everRendered(){return this.#n}get container(){return this.#r}get roomState(){return this.#l}get paused(){return this.#u}}var ot=`in vec2 aPosition;
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
`,it=`struct GlobalFilterUniforms {
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
}`,wa=`precision highp float;
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
`,Ta=`struct CRTUniforms {
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
}`,Ca=Object.defineProperty,Sa=(t,e,n)=>e in t?Ca(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,je=(t,e,n)=>(Sa(t,typeof e!="symbol"?e+"":e,n),n);const jr=class Gr extends Z{constructor(e){e={...Gr.DEFAULT_OPTIONS,...e};const n=ae.from({vertex:{source:it,entryPoint:"mainVertex"},fragment:{source:Ta,entryPoint:"mainFragment"}}),r=W.from({vertex:ot,fragment:wa,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),je(this,"uniforms"),je(this,"seed"),je(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};je(jr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ka=jr;var Oa=`
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
}`,_a=`struct KawaseBlurUniforms {
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
}`,Ia=`
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
`,Pa=`struct KawaseBlurUniforms {
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
}`,Ba=Object.defineProperty,Fa=(t,e,n)=>e in t?Ba(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,re=(t,e,n)=>(Fa(t,typeof e!="symbol"?e+"":e,n),n);const qr=class Wr extends Z{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ie("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Wr.DEFAULT_OPTIONS,...n};const r=ae.from({vertex:{source:it,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Pa:_a,entryPoint:"mainFragment"}}),o=W.from({vertex:ot,fragment:n?.clamp?Ia:Oa,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),re(this,"uniforms"),re(this,"_pixelSize",{x:0,y:0}),re(this,"_clamp"),re(this,"_kernels",[]),re(this,"_blur"),re(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=he.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let m=0;m<h;m++)a=this._kernels[m]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),he.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};re(qr,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Aa=qr;var La=`in vec2 vTextureCoord;
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
`,za=`struct AdvancedBloomUniforms {
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
`,Da=`
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
`,Ma=`struct ExtractBrightnessUniforms {
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
`,Ra=Object.defineProperty,Ua=(t,e,n)=>e in t?Ra(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Yr=(t,e,n)=>(Ua(t,typeof e!="symbol"?e+"":e,n),n);const Jr=class Zr extends Z{constructor(e){e={...Zr.DEFAULT_OPTIONS,...e};const n=ae.from({vertex:{source:it,entryPoint:"mainVertex"},fragment:{source:Ma,entryPoint:"mainFragment"}}),r=W.from({vertex:ot,fragment:Da,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Yr(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Yr(Jr,"DEFAULT_OPTIONS",{threshold:.5});let Ea=Jr;var $a=Object.defineProperty,Na=(t,e,n)=>e in t?$a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fe=(t,e,n)=>(Na(t,typeof e!="symbol"?e+"":e,n),n);const Kr=class Qr extends Z{constructor(e){e={...Qr.DEFAULT_OPTIONS,...e};const n=ae.from({vertex:{source:it,entryPoint:"mainVertex"},fragment:{source:za,entryPoint:"mainFragment"}}),r=W.from({vertex:ot,fragment:La,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:ie.WHITE}}),fe(this,"uniforms"),fe(this,"bloomScale",1),fe(this,"brightness",1),fe(this,"_extractFilter"),fe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Ea({threshold:e.threshold}),this._blurFilter=new Aa({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=he.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=he.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),he.returnTexture(s),he.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};fe(Kr,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Va=Kr;const _n=({crtFilter:t},e)=>[t?new ka({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Va({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Xa{constructor(e,n){this.app=e,this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=T.getState();e.stage.addChild(this.#a),e.stage.scale=r;const o=ge(n);if(o===void 0)throw new Error("main loop with no starting room");this.#n=new On({gameState:n,roomState:o,paused:!1,pixiRenderer:e.renderer}),this.#a.addChild(this.#n.container),this.#r=new Gi,e.stage.addChild(this.#r.container),this.#c()}#e;#o;#r;#n;#a=new v({label:"MainLoop/world"});#i;#s;#c(){const{userSettings:{displaySettings:e}}=T.getState();this.#e=_n(e,!0),this.#o=_n(e,!1)}tick=({deltaMS:e})=>{const n=T.getState(),r=Dn(n),{userSettings:{displaySettings:o},upscale:i}=T.getState();this.#r.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=r?zn:Vs(this.#s,e),a=ge(this.#s);(this.#n?.roomState!==a||this.#n?.upscale!==i||this.#n?.displaySettings!==o||this.#n?.paused!==r)&&(this.#n?.destroy(),a?(this.#n=new On({gameState:this.#s,roomState:a,paused:r,pixiRenderer:this.#i.renderer}),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",a.id)):this.#n=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#n?.tick({progression:this.#s.progression,movedItems:s,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#o};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n?.destroy(),this.#r.destroy(),this.#i.ticker.remove(this.tick)}}Je.add(qn,Wn,Yn,Jn,Zn,Kn,Qn,er,tr,nr,rr,ir,or,sr,ar,lr,cr,ur,dr,fr,hr);Eo.defaultOptions.scaleMode="nearest";const In=async(t,e)=>{const n=new wr;await n.init({background:"#000000",sharedTicker:!0});const r=zi({campaign:t,inputStateTracker:e});T.dispatch(Xt(r.characterRooms.head.id)),T.dispatch(Xt(r.characterRooms.heels.id));const o=new Xa(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=Fe(r);s!==void 0&&Ft({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return ge(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Wa=Object.freeze(Object.defineProperty({__proto__:null,default:In,gameMain:In},Symbol.toStringTag,{value:"Module"}));export{br as A,pr as C,Z as F,Mt as R,bi as S,vr as V,Ti as a,Wa as g,gi as u};
