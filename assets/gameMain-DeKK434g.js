const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-MF1xUOHs.js","assets/App-CRE3jn2e.js","assets/index-YPcs4zKx.js","assets/index-CrBy_tsI.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CK1lh2hS.js","assets/Graphics-DaiUKgNa.js","assets/swopCharacters-BpWOiUnD.js","assets/WebGLRenderer-BR6-ouXW.js"])))=>i.map(i=>d[i]);
import{x as lo,a8 as se,a9 as V,m as Mn,y as oe,E as y,e as Ke,c as co,C as v,d as Pe,v as We,ao as g,D as wt,ag as ge,T as ke,U as uo,V as fo,aH as ho,aI as po,aJ as mo,l as go,aK as bo,A as vo,aL as xo,aM as ie,aN as yo,aO as Rn,a2 as wo,aP as To,X as T,aQ as He,aR as Oe,aS as Co,aT as So,L as O,Q as I,aU as Be,a4 as xe,H as Un,aV as ae,aW as Qe,$ as Q,_ as A,aX as Tt,aY as ko,O as Ct,aZ as Oo,a_ as Ae,W as At,Y as et,a$ as En,b0 as Ht,b1 as _o,b2 as Io,b3 as Po,N as W,b4 as Fo,b5 as Bo,a3 as $n,K as tt,b6 as Dt,b7 as Ao,a0 as _,b8 as Do,J as Nn,b9 as Lo,ba as zo,bb as Mo,bc as ct,bd as Ro,be as Uo,bf as Eo,bg as $o,bh as No,bi as Vo,bj as _e,Z as Xo,bk as Ho,bl as Vn,ad as he,bm as Go,a5 as Gt}from"./App-CRE3jn2e.js";import{l as St,h as Ye,g as P,j as jt,p as M,k as qt,m as ze,n as jo,s as be,q as le,i as $,r as kt,t as qo,u as Wo,v as Yo,w as Jo,x as N,y as Me,z as Zo,A as Ko,B as Z,C as Qo,D as ei,E as ti,F as ye,G as ut,H as Ot,c as Lt,I as ni,J as ri,K as Xn,L as nt,M as zt,N as oi,O as Wt,P as dt,Q as Hn,R as ii,a as ce,S as Gn,T as jn,U as Yt,V as qn,f as si,W as Wn,X as Yn,Y as ai,Z as li,_ as Mt,$ as ci,a0 as ui,a1 as di,a2 as fi,b as De,a3 as Jt,a4 as Jn,a5 as hi,e as Zn,o as Kn,a6 as Zt,a7 as pi,a8 as w,a9 as mi,aa as Kt,ab as Je,ac as rt,ad as gi,ae as bi}from"./swopCharacters-BpWOiUnD.js";import{S as vi,G as E}from"./Graphics-DaiUKgNa.js";import{_ as Qt,g as xi}from"./index-YPcs4zKx.js";const Qn=class _t extends lo{constructor(e){e={..._t.defaultOptions,...e},super(e),this.enabled=!0,this._state=vi.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=se.from(n)),r&&(s=V.from(r)),new _t({gpuProgram:i,glProgram:s,...o})}};Qn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=Qn;var yi=`
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
`,wi=`in vec2 aPosition;
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
`,Ti=`
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
}`;class C extends Y{constructor(e){const n=e.gpu,r=en({source:Ti,...n}),o=se.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=en({source:yi,...i}),l=V.from({vertex:wi,fragment:s}),a=new Mn({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:l,blendRequired:!0,resources:{blendUniforms:a,uBackTexture:oe.EMPTY}})}}function en(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Rt=`
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
    `,Ut=`
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
	`;class er extends C{constructor(){super({gl:{functions:`
                ${Rt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ut}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}er.extension={name:"color",type:y.BlendMode};class tr extends C{constructor(){super({gl:{functions:`
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
            `}})}}tr.extension={name:"color-burn",type:y.BlendMode};class nr extends C{constructor(){super({gl:{functions:`
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
                `}})}}nr.extension={name:"color-dodge",type:y.BlendMode};class rr extends C{constructor(){super({gl:{functions:`
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
                `}})}}rr.extension={name:"darken",type:y.BlendMode};class or extends C{constructor(){super({gl:{functions:`
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
            `}})}}or.extension={name:"difference",type:y.BlendMode};class ir extends C{constructor(){super({gl:{functions:`
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
            `}})}}ir.extension={name:"divide",type:y.BlendMode};class sr extends C{constructor(){super({gl:{functions:`
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
            `}})}}sr.extension={name:"exclusion",type:y.BlendMode};class ar extends C{constructor(){super({gl:{functions:`
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
                `}})}}ar.extension={name:"hard-light",type:y.BlendMode};class lr extends C{constructor(){super({gl:{functions:`
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
            `}})}}lr.extension={name:"hard-mix",type:y.BlendMode};class cr extends C{constructor(){super({gl:{functions:`
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
            `}})}}cr.extension={name:"lighten",type:y.BlendMode};class ur extends C{constructor(){super({gl:{functions:`
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
                `}})}}ur.extension={name:"linear-burn",type:y.BlendMode};class dr extends C{constructor(){super({gl:{functions:`
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
            `}})}}dr.extension={name:"linear-dodge",type:y.BlendMode};class fr extends C{constructor(){super({gl:{functions:`
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
            `}})}}fr.extension={name:"linear-light",type:y.BlendMode};class hr extends C{constructor(){super({gl:{functions:`
                ${Rt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ut}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}hr.extension={name:"luminosity",type:y.BlendMode};class pr extends C{constructor(){super({gl:{functions:`
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
            `}})}}pr.extension={name:"negation",type:y.BlendMode};class mr extends C{constructor(){super({gl:{functions:`
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
                `}})}}mr.extension={name:"overlay",type:y.BlendMode};class gr extends C{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"pin-light",type:y.BlendMode};class br extends C{constructor(){super({gl:{functions:`
                ${Rt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Ut}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}br.extension={name:"saturation",type:y.BlendMode};class vr extends C{constructor(){super({gl:{functions:`
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
                `}})}}vr.extension={name:"soft-light",type:y.BlendMode};class xr extends C{constructor(){super({gl:{functions:`
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
                `}})}}xr.extension={name:"subtract",type:y.BlendMode};class yr extends C{constructor(){super({gl:{functions:`
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
                `}})}}yr.extension={name:"vivid-light",type:y.BlendMode};const It=[];Ke.handleByNamedList(y.Environment,It);async function Ci(t){if(!t)for(let e=0;e<It.length;e++){const n=It[e];if(n.value.test()){await n.value.load();return}}}let we;function Si(){if(typeof we=="boolean")return we;try{we=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{we=!1}return we}var wr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(wr||{});class ki{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,l,a){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,r,o,i,s,l,a);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Oi=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],Tr=class Cr extends co{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Oi,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ci(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Cr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof v&&(r={container:r},n&&(Pe(We,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:g.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=wr.ALL);const{clear:r,clearColor:o,target:i}=e;g.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,g.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ki(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,l=r[s];this.renderPipes[s]=new i(this,l?new l:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Si())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};Tr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Sr=Tr,Re;function _i(t){return Re!==void 0||(Re=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Sr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!wt.get().getWebGLRenderingContext())return!1;let r=wt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Re}let Ue;async function Ii(t={}){return Ue!==void 0||(Ue=await(async()=>{const e=wt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Ue}const tn=["webgl","webgpu","canvas"];async function Pi(t){let e=[];t.preference?(e.push(t.preference),tn.forEach(i=>{i!==t.preference&&e.push(i)})):e=tn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Ii()){const{WebGPURenderer:l}=await Qt(async()=>{const{WebGPURenderer:a}=await import("./WebGPURenderer-MF1xUOHs.js");return{WebGPURenderer:a}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=l,r={...t,...t.webgpu};break}else if(s==="webgl"&&_i(t.failIfMajorPerformanceCaveat??Sr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:l}=await Qt(async()=>{const{WebGLRenderer:a}=await import("./WebGLRenderer-BR6-ouXW.js");return{WebGLRenderer:a}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=l,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const kr="8.6.6";class Or{static init(){globalThis.__PIXI_APP_INIT__?.(this,kr)}static destroy(){}}Or.extension=y.Application;class Fi{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,kr)}destroy(){this._renderer=null}}Fi.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"initHook",priority:-10};const _r=class Pt{constructor(...e){this.stage=new v,e[0]!==void 0&&Pe(We,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Pi(e),Pt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Pe(We,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Pt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};_r._plugins=[];let Ir=_r;Ke.handleByList(y.Application,Ir._plugins);Ke.add(Or);var Bi=`in vec2 aPosition;
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
`,Ai=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,nn=`struct GlobalFilterUniforms {
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
}`;const Pr=class Fr extends Y{constructor(e){e={...Fr.defaultOptions,...e};const n=se.from({vertex:{source:nn,entryPoint:"mainVertex"},fragment:{source:nn,entryPoint:"mainFragment"}}),r=V.from({vertex:Bi,fragment:Ai,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Mn({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Pr.defaultOptions={alpha:1};let Di=Pr;class Fe extends ge{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof oe?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ke.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ke.shared.add(this.update,this,uo.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(oe.from(e[r]));return new Fe(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(oe.from(e[r]));return new Fe(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof oe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ke.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ke.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Li extends fo{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:l,height:a,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new ho({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,l!==void 0&&(this.width=l),a!==void 0&&(this.height=a)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function zi(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Pe(We,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Mi extends Li{constructor(...e){const n=zi(e,"Text");super(n,po),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=mo.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class Et extends oe{static create(e){return new Et({source:new go(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}var Ee={},rn;function Ri(){if(rn)return Ee;rn=1;var t=bo(),e=t.mark(i),n=vo(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var l,a,c,u,d,f,m=arguments;return t.wrap(function(x){for(;;)switch(x.prev=x.next){case 0:for(l=m.length,a=new Array(l),c=0;c<l;c++)a[c]=m[c];u=0,d=a;case 2:if(!(u<d.length)){x.next=8;break}return f=d[u],x.delegateYield(o(f),"t0",5);case 5:u++,x.next=2;break;case 8:case"end":return x.stop()}},e)}Ee.__concat=i;var s=r(i);return Ee.concat=s,Ee}var ft,on;function Ui(){return on||(on=1,ft=Ri().concat),ft}var Ei=Ui();const Ge=xi(Ei);function $i(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const Ni=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},Vi=({campaign:t,inputStateTracker:e})=>{const n=Ni(t),r=xo(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&St(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&St(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:Ye(o.items.head),heels:i===void 0?void 0:Ye(i.items.heels)},inputStateTracker:e,campaign:t,events:$i(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},b={pureBlack:new g("#000000"),lightBlack:new g("#212C20"),shadow:new g("#325149"),midGrey:new g("#7F7773"),lightGrey:new g("#BBB1AB"),white:new g("#FBFEFB"),metallicBlue:new g("#366BAE"),pink:new g("#D68ED1"),moss:new g("#9E9600"),redShadow:new g("#805E50"),midRed:new g("#CA7463"),lightBeige:new g("#DAA78F"),highlightBeige:new g("#EBC690"),alpha:new g("#1E7790"),replaceLight:new g("#08A086"),replaceDark:new g("#187558")},ot=`in vec2 aPosition;
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
`,Xi=`#version 300 es

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
`;class me extends Y{constructor(e,n){const r=V.from({vertex:ot,fragment:Xi,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,l]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=l,o.uOutlineWidth[0]=n}}const Hi=`precision mediump float;
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
`,sn=[b.pureBlack,b.lightBlack];class q extends Y{uniforms;constructor(e="white"){const n=V.from({vertex:ot,fragment:Hi,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=sn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,l,a]=sn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=l,this.uniforms.uSourceBlacks[5]=a,this.targetColor=e}set targetColor(e){const[n,r,o]=new g(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const R={original:new g("rgb(255, 255, 255)"),basic:new g("rgb(210, 210, 210)"),dimmed:new g("rgb(120, 120, 120)")},U={original:new g("rgb(255, 255, 0)"),basic:new g("hsl(50,65%,70%)"),dimmed:b.redShadow},G={original:new g("rgb(255, 0, 255)"),basic:b.pink,dimmed:new g("hsl(290,35%,38%)")},S={original:new g("rgb(0, 255, 255)"),basic:new g("hsl(183, 50%, 50%)"),dimmed:new g("hsl(183, 50%, 25%)")},j={original:new g("rgb(0, 255, 0)"),basic:b.moss,dimmed:new g("hsl(73,50%,25%)")},$t={white:{basic:{main:R,edges:{towards:S,right:U},hud:{lives:U,dimmed:G,icons:S}},dimmed:{main:R,edges:{towards:j,right:S},hud:{lives:U,dimmed:G,icons:S}}},yellow:{basic:{main:U,edges:{towards:j,right:R},hud:{lives:S,dimmed:G,icons:j}},dimmed:{main:U,edges:{towards:S,right:S},hud:{lives:S,dimmed:G,icons:j}}},magenta:{basic:{main:G,edges:{towards:j,right:S},hud:{lives:R,dimmed:S,icons:U}},dimmed:{main:G,edges:{towards:j,right:S},hud:{lives:R,dimmed:S,icons:U}}},cyan:{basic:{main:S,edges:{towards:G,right:R},hud:{lives:R,dimmed:j,icons:U}},dimmed:{main:S,edges:{towards:G,right:R},hud:{lives:R,dimmed:j,icons:U}}},green:{basic:{main:j,edges:{towards:S,right:U},hud:{lives:R,dimmed:G,icons:S}},dimmed:{main:j,edges:{towards:S,right:U},hud:{lives:R,dimmed:G,icons:S}}}},Nt=t=>$t[t.hue][t.shade],Br=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+jt>n?100-Math.ceil((n-e)/(jt/100)):0},Ar=t=>{const e=100*P.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/P.w):0};function Vt(t,e){const n=e||new v;for(const r of t)n.addChild(r);return n}const an={x:.5,y:1},ln=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),h=t=>{if(typeof t=="string")return h({texture:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:l}=t;let a;if(ln(t)?a=Gi(t):a=new ge(ie.textures[t.texture]),l!==void 0){const c={x:1,y:1,z:1,...l},u=new v({label:"timesXyz"});for(let{x:d}=c;d>=1;d--)for(let{y:f}=c;f>=1;f--)for(let m=1;m<=c.z;m++){const p=h(yo(t,"times")),x=M({x:d-1,y:f-1,z:m-1});p.x+=x.x,p.y+=+x.y,u.addChild(p)}return u}if(e===void 0&&r===void 0)if(ln(t))a.anchor=an;else{const c=ie.data.frames[t.texture].frame;c.pivot!==void 0?a.pivot=c.pivot:a.anchor=an}else e!==void 0&&(a.anchor=e),r!==void 0&&(a.pivot=r);return o!==void 0&&(a.x=o),i!==void 0&&(a.y=i),s!==void 0&&(a.filters=s),a.eventMode="static",n===!0&&(a.scale.x=-1),a}};function Gi({animationId:t,reverse:e,playOnce:n}){const o=ie.animations[t].map(s=>({texture:s,time:Rn}));e&&o.reverse();const i=new Fe(o);return i.animationSpeed=wo.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const ji=`in vec2 vTextureCoord;
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
`;class it extends Y{constructor(e){const n=Object.keys(e).length,r=V.from({vertex:ot,fragment:ji.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],l)=>{b[i].toArray().forEach((a,c)=>{o.uOriginal[l*3+c]=a}),s.toArray().forEach((a,c)=>{o.uReplacement[l*3+c]=a})})}}const Dr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Lr=t=>Dr($t[t.color.hue][t.color.shade].main),qi=t=>new it({lightBeige:b.lightGrey,redShadow:b.shadow,pink:b.lightGrey,moss:b.lightGrey,midRed:b.midGrey,highlightBeige:b.lightGrey,...Lr(t)}),Wi=new it({midGrey:b.midRed,lightGrey:b.lightBeige,white:b.highlightBeige,metallicBlue:b.redShadow,pink:b.midRed,moss:b.midRed,replaceDark:b.midRed,replaceLight:b.lightBeige}),Ft=(t,e,n)=>n?new it(Dr($t[t.color.hue][t.color.shade].edges[e])):new q(Nt(t.color).edges[e].original),K=t=>new it(Lr(t)),Ze=To,Yi=250,Ji=24,Zi=56,Ki=80,cn=112,Te=t=>t==="heels"?1:-1;function*Qi(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;So(o),yield h({texture:o,x:(r+.5-n/2)*He.w})}}function Ce(t,e){t.removeChildren(),Vt(Qi(e),t)}class es{#e=new v({label:"HudRenderer"});#o=new q;#r=new q;#n=new q;#a=new q;#i=new q(b.moss);#s=new me(b.pureBlack,T.getState().upscale.gameEngineUpscale);#c=new q;#h=[this.#s,this.#a];#l={original:[this.#s,this.#c],colourised:{head:[this.#s,new q(b.metallicBlue)],heels:[this.#s,new q(b.pink)]}};#t={head:{sprite:this.#f("head"),livesText:this.#d({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#u({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#u({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#f("heels"),livesText:this.#d({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#u({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new v({label:"heelsCarrying"})}},fps:this.#d({label:"fps",outline:!0})};constructor(){for(const e of qt)this.#e.addChild(this.#t[e].livesText),this.#e.addChild(this.#t[e].sprite),this.#e.addChild(this.#t[e].shield.container),this.#e.addChild(this.#t[e].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[this.#i],this.#t.fps.y=He.h,this.#t.fps.x=He.w*2}#u({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new v({label:i});s.pivot={x:4,y:16};const l=new ge({texture:ie.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#n,y:n?0:8});s.addChild(l);const a=this.#d({outline:o==="text-only"});return a.y=n?0:16,a.x=l.x=He.w/2,s.addChild(a),r&&(a.visible=!1),o===!0&&(s.filters=this.#s),{text:a,icon:l,container:s}}#f(e){const n=new ge(ie.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#d({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new v({label:r,filters:n?this.#h:this.#a,scale:{x:1,y:e?2:1}})}#m(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Te("head")*cn,this.#t.head.doughnuts.container.y=e.y-Oe.h-8,this.#t.heels.carrying.container.y=e.y-Oe.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Te("heels")*cn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}#v(e){return h(e.type==="spring"?"spring.released":e.type==="sceneryPlayer"?e.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":e.config.style)}#p(e,n){return e?n?Ze:this.#c:this.#o}#x(e,n){const r=ze(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,l=s.children.length>0;if(i===null&&l)for(const a of s.children)a.destroy();i!==null&&!l&&s.addChild(this.#v(i)),s.filters=this.#p(!0,n),this.#t.heels.bag.icon.filters=this.#p(o,n)}#y(e,n){const r=ze(e,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#p(o,n),this.#t.head.doughnuts.icon.filters=this.#p(i!==0,n),Ce(this.#t.head.doughnuts.text,i)}#w(e,n,r){const o=ze(e,r),{text:i,container:s}=this.#t[r].shield,{text:l,container:a}=this.#t[r].extraSkill;a.x=s.x=(n.x>>1)+Te(r)*Ki,Ce(i,Br(o)),s.y=n.y,Ce(l,o===void 0?0:r==="head"?Ar(o):o.bigJumps),a.y=n.y-24}#g(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#T(e,n,r,o){const i=this.#g(e,o),s=this.#t[o].sprite;i?s.filters=r?Ze:this.#c:jo(e)?s.filters=this.#r:s.filters=this.#o,s.x=(n.x>>1)+Te(o)*Zi,s.y=n.y-Oe.h}#C(e,n,r){const i=ze(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+Te(r)*Ji,s.y=n.y,Ce(s,i??0)}#S(e,n){const r=be(e);if(r===void 0)return;const o=Nt(r.color);this.#o.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#a.targetColor=o.hud.dimmed[n?"basic":"original"],this.#n.targetColor=o.hud.icons[n?"basic":"original"],this.#r.targetColor=o.hud.dimmed[n?"basic":"original"],this.#c.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#g(e,"head")?this.#l.colourised.head:this.#o:this.#l.original,this.#t.heels.livesText.filters=n?this.#g(e,"heels")?this.#l.colourised.heels:this.#o:this.#l.original}#b=Number.NEGATIVE_INFINITY;#k(){if(Co(T.getState())){if(performance.now()>this.#b+Yi){const e=ke.shared.FPS;Ce(this.#t.fps,Math.round(e)),this.#i.targetColor=e>56?b.moss:e>50?b.metallicBlue:e>40?b.pink:b.midRed,this.#b=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick({gameState:e,screenSize:n,colourise:r}){this.#S(e,r);for(const o of qt)this.#C(e,n,o),this.#T(e,n,r,o),this.#w(e,n,o);this.#m(n),this.#y(e,r),this.#x(e,r),this.#k()}get container(){return this.#e}destroy(){this.#e.destroy()}}const un={movementType:"vel",vels:{gravity:O}},ts=(t,e,n)=>{if(!le(t))return un;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,l=qo[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?$("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-kt*n,-l)}}}:un:{movementType:"vel",vels:{gravity:{z:Math.max(o-kt*n,-l)}}}},ve={movementType:"steady"},$e=t=>{const n=t/Zo*Rn;return(t+.5*kt*n**2)/n},ns={head:$e(Me.head),headOnSpring:$e(Me.head+P.h),heels:$e(Me.heels),heelsOnSpring:$e(Me.heels+P.h)},rs=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return ns[`${n}${e?"OnSpring":""}`]},os=t=>!(t===null||Yo(t)||Jo(t)&&t.config.gives==="scroll"||N(t)&&t.state.standingOn===null),zr=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&os(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:ve;const i=Wo(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:rs(t,i)}},stateDelta:{action:"moving",jumped:!0}}},is=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Be(t),l=Math.max(i,Math.min(r,s+e*o)),a=Math.min(l,r);return I(n,a)},dn={movementType:"vel",vels:{walking:O}},Mr=(t,e,n)=>{const r=ss(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Be(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!xe(r.vels.walking,O)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},ss=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:l,facing:a,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:f,gravity:m}}}=t,p=n===t.id,x=p?e.currentActionPress("jump"):"released",X=p?e.directionVector:O,D=l===null&&m.z<0,H=o==="head"&&Ar(t.state)>0&&l!==null,L=o==="headOverHeels"?D?"head":"heels":H?"heels":o,k=s?a:X,F=Z[L];if(c!==null||i==="death")return dn;if(o==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Un(f,I(f,Ko*r))}}:dn;if(x!=="released"){const z=ae(Qe(k,Q)?a:k),ao=$("spring")(l)?1:Qo;return{movementType:"vel",vels:{walking:I({...z,z:0},F*ao)},stateDelta:{facing:z}}}}if(Be(k)!==0)return D?{movementType:"vel",vels:{walking:I({...k,z:0},F)},stateDelta:{facing:k,action:"falling"}}:{movementType:"vel",vels:{walking:is({vel:f,acc:ei[L],deltaMS:r,maxSpeed:F,unitD:k,minSpeed:0})},stateDelta:{facing:k,action:"moving"}};if(u>0&&u<1){const z=xe(d,a)?1:0;return{movementType:"position",posDelta:I(a,z-u),stateDelta:{action:D?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:D?"falling":"idle"}}},fn=P.h,Ne=.001,as=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=ut**2/(2*ye);if(n==="up"){if(e<=r)return Math.max(Ne,Math.sqrt(2*ye*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(Ne,Math.sqrt(2*ye*o))}else return ut}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-Ne,-Math.sqrt(2*ye*o))}else return e<=r?Math.min(-Ne,-Math.sqrt(2*ye*Math.max(e,0))):-ut},ls={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function cs({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(A(o).some(f=>ti(f)&&f.config.style==="stepStool"))return ls;const a=t*fn,c=e*fn,u=as({currentAltitude:r-a,direction:n,totalDistance:c-a});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=a?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function us(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&$("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:Ot}}}:ve;const l=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(l===0)return Lt({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Ot}}};break;case"in":if(l===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:l}}}}const hn={movementType:"vel",vels:{movingFloor:O}},ds=(t,e,n)=>{if(N(t)&&t.state.teleporting!==null)return hn;const{state:{standingOn:r}}=t;if(r===null||!$("conveyor")(r))return hn;const{config:{direction:o}}=r,s=$("heels")(t)&&t.state.action==="moving"&&Tt(t.state.facing)===ko(o)?Z.heels:ni;return{movementType:"vel",vels:{movingFloor:I(Ct[o],s)}}},Ie=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<ri},Rr=150,Ur=t=>t[Math.floor(Math.random()*t.length)],ee=Object.freeze({movementType:"vel",vels:{walking:O}}),st=t=>Xn(t)?Z[t.config.which]:Z[t.type],pn=P.w/2,fs=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=Z.homingBot;if(!Qe(e,Q))return{movementType:"steady"};const{items:{head:s,heels:l}}=n;for(const a of[s,l]){if(a===void 0)continue;const c=Ae(a.state.position,t);if(Math.abs(c.y)<pn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<pn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},Er=(t,e)=>{const{items:{head:n,heels:r,headOverHeels:o}}=e;if(o!==void 0)return Ie(o)?void 0:e.items.headOverHeels;const i=n===void 0||Ie(n)||n.state.action==="death"?void 0:Ht(n.state.position,t),s=r===void 0||Ie(r)||r.state.action==="death"?void 0:Ht(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},hs=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:l}}=t;if(i===null)return ee;const a=Er(o,e);if(a===void 0||s+Rr>e.roomTime)return ve;const c=Ae(a?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>P.w/4?u:At(u),f=st(t),m={...O,[d]:c[d]>0?f:-f},p=ae(m),x=!Qe(p,l);return{movementType:"vel",vels:{walking:m},stateDelta:{facing:p,...x?{timeOfLastDirectionChange:e.roomTime}:et}}},mn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return ee;const l=Er(i,e);if(l===void 0)return ee;const a=l.state.position,c=P.w*3;if(!(i.x>a.x-c&&i.x<a.x+c&&i.y>a.y-c&&i.y<a.y+c))return ee;const d=Ae(l?.state.position,i),f=st(t),m=(1+Math.sqrt(2))/2,p=f*m,x=I({...d,z:0},p/En(d)*(o?-1:1));return{movementType:"vel",vels:{walking:x},stateDelta:{facing:ae(x)}}},ht=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return ee;if(!(xe(i,O)||Math.random()<r/1e3))return ve;const a=Ur(o);return{movementType:"vel",vels:{walking:I(Ct[a],st(t))},stateDelta:{facing:Ct[a]}}},ps=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?ee:Qe(i,Q)?{movementType:"vel",vels:{walking:I(o,st(t))}}:ve},ms=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Ur([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},pt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:l},aabb:a}=t;if(!l||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Rr))return;const c=nt(i,a,e,n);if(c.x===0&&c.y===0)return;const u=ms(s,c,o);t.state.vels.walking=u,t.state.facing=ae(u),t.state.durationOfTouch=0},gs=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},bs=(t,e,n,r)=>{if(!t.state.activated||Xn(t)&&t.state.busyLickingDoughnutsOffFace)return ee;switch(t.config.movement){case"patrol-randomly-diagonal":return ht(t,e,n,r,Po);case"patrol-randomly-xy8":return ht(t,e,n,r,Io);case"patrol-randomly-xy4":return ht(t,e,n,r,_o);case"towards-tripped-on-axis-xy4":return fs(t,e);case"towards-on-shortest-axis-xy4":return hs(t,e);case"back-forth":case"clockwise":return ps(t);case"unmoving":case"free":return ee;case"towards-when-in-square-xy8":return mn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return mn(t,e,n,r,Oo(T.getState()));default:throw t.config,new Error("this should be unreachable")}},vs=t=>{const{movingItem:e,touchedItem:n}=t;if(le(n,e))switch(e.config.movement){case"patrol-randomly-xy4":pt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":pt(t,"opposite");break;case"clockwise":pt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":gs(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},xs=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},gn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>xs(t,e,n,r),bn=.001,Xt=(t,e,n=.001)=>{if(!le(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:zt({state:{position:W(t.state.position,{x:0,y:0,z:-bn})},aabb:{...t.aabb,z:n+bn},id:t.id},{state:{position:W(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},$r=(t,e)=>{const r=[...A(e).filter(i=>Xt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const l=oi(s,i);return l<0||l===0&&gn(t,s)>gn(t,i)?s:i})};function Nr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Br(n)>0||Ie(e)||(e.state.action="death",e.state.expires=t+Ot)}const Vr=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=dt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=dt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=Wt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=dt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=Wt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":T.dispatch(Bo(r.config.page));break;case"reincarnation":break;case"crown":{T.dispatch(Fo(r.config.planet));break}default:r.config}},ys=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;$n(i,r)<=0||e.state.action!=="death"&&Lt({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},ws=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=tt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=W(t.state.position,s)};function Ts({movingItem:t}){t.state.autoWalk=!1}const J=(t,...e)=>$(...e)(t.touchedItem),Se=(t,...e)=>$(...e)(t.movingItem),Xr=t=>N(t.movingItem),Cs=t=>N(t.touchedItem),Ss=t=>Hn(t.touchedItem),vn=t=>{switch(!0){case J(t,"stopAutowalk"):Ts(t);break;case Ss(t):Nr(t);break;case J(t,"portal"):ys(t);break;case J(t,"pickup"):Vr(t);break;case J(t,"doorFrame"):ws(t);break}},ks=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const l=t.state.setting=i==="left"?"right":"left";for(const[a,c]of Dt(r)){const u=n.items[a];u!==void 0&&(u.state={...u.state,...c[l]})}}o&&T.dispatch(Ao(o.path))}},Os=({movingItem:t,touchedItem:e})=>{if(!le(t))return;const{state:{position:n},aabb:r}=e,o=nt(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=ae(o),s=I(i,-Z.ball);return e.state.vels.sliding=s,!1},_s=({movingItem:t,touchedItem:e})=>{if(!le(e))return;const n=t.state.vels.sliding;if(xe(n,O))return;const{state:{position:r},aabb:o}=t,i=nt(e.state.position,e.aabb,r,o);return $n(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},Is=2*ii,Hr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Is,positionDelta:n})},Ps=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Un(r.state.position,o),z:0};if(!xe(s,O))for(const l of r.state.stoodOnBy)Hr(l,e,s)}},Fs=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,l=nt(t.state.position,t.aabb,i,s);if(l.x===0&&l.y===0)return;const a=ae(l);for(const c of o){const u=e.items[c],d=I(a,-Z.charles*r);u.state.facing=d,Hr(u,e,d)}},xn=t=>ce(t.movingItem)&&Xt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Gr=(t,e)=>{let n=O;for(const r of e){if(r.movementType==="position"&&(n=W(n,r.posDelta)),r.movementType==="vel"&&(ce(t)||$("lift")(t)))for(const[i,s]of Dt(r.vels)){const l={...O,...s};t.state.vels[i]=l}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},yn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&N(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&xn(t)){if(xn(t)&&Xr(t)){Gn({above:t.movingItem,below:t.touchedItem});const n=[zr(t.movingItem,t.gameState),Mr(t.movingItem,t.gameState,t.deltaMS)];Gr(t.movingItem,n)}jn(t)}};function Bs(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const jr=t=>{Xr(t)&&vn(t),Cs(t)&&vn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),J(t,...Yt)&&Os(t),Se(t,...Yt)&&_s(t),(Se(t,"monster")&&J(t,"firedDoughnut")||Se(t,"firedDoughnut")&&J(t,"monster"))&&Bs(t),(Se(t,"monster")||Se(t,"movableBlock"))&&vs(t),J(t,"switch")&&ks(t),J(t,"joystick")&&Fs(t),t.touchedItem.state.disappear&&yn(t),t.movingItem.state.disappear&&le(t.touchedItem,t.movingItem)&&yn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},As=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:l}=i,{state:{position:a}}=t;if(!l)return;const c=A(_(e.items)).filter(qn),u=s===null?Ls(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}Ds(e,i,u)}else{if(t.state.standingOn===null||!qr(t,_(e.items)))return;const d=si({gameState:n,room:e,itemType:s.type,config:s.config,position:a});Wn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:jr}),i.carrying=null}},Ds=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Yn({room:t,item:n})},Ls=(t,e)=>$r(t,A(_(e.items)).filter(qn)),qr=(t,e)=>{const n={position:W(t.state.position,{z:P.h})},r=ai({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(le(o,t)){if(!ce(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!qr(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0};function*zs(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Ms=P.w*Math.sqrt(2)+1,Rs=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:l,doughnutLastFireTime:a,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,m=ae(d);if(o.currentActionPress("fire")==="tap"&&l&&s>0&&a+f<c){const p={type:"firedDoughnut",...li,config:et,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:W(u,I(m,Ms),t.type==="headOverHeels"?{z:P.h}:O),vels:{fired:I(m,Z.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Mt({room:e,item:p}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},Us=2;function*Es(t,e,n,r){ce(t)&&(yield ts(t,n,r),yield ds(t),yield*zs(t,e)),N(t)&&(yield Mr(t,n,r),t.id===n.currentCharacterName&&(yield us(t,n,r),yield zr(t,n),ci(t)&&As(t,e,n,r),ui(t)&&Rs(t,e,n))),di(t)&&(yield cs(t)),fi(t)&&(yield bs(t,e,n,r))}const $s=(t,e,n,r)=>{!ce(t)||t.state.standingOn===null||(N(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&Vr({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e,movementVector:{x:0,y:0,z:-1},deltaMS:r})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||N(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&jn({touchedItem:t.state.standingOn,gameState:n,room:e}))},Ns=(t,e,n,r)=>{N(t)&&t.state.standingOn!==null&&Hn(t.state.standingOn)&&Nr({gameState:n,room:e,movingItem:t,touchedItem:t.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...Es(t,e,n,r)];$s(t,e,n,r);let i=Gr(t,o);(ce(t)||$("lift")(t)||$("firedDoughnut")(t))&&(i=W(i,...A(_(t.state.vels)).map(a=>I(a,r))));const s=Math.ceil(Be(i)/Us),l=I(i,1/s);for(let a=0;a<s;a++)Wn({subjectItem:t,posDelta:l,gameState:n,room:e,deltaMS:r,onTouch:jr})},Vs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,re(t,e);const u=Jt(e)[c],d=pe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Ye(u)};return}if(t.entryState.headOverHeels!==void 0){re(t,e);const c=pe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Jt(e);if(re(t,c),re(t,u),zt(c,u)){const d=Jn({head:c,heels:u});re(t,d,"heels");const f=pe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Ye(d)};return}else{const d=pe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},pe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=St(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Mt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&hi(o,t);return o},re=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},Xs=(t,e)=>{const n=Zn(t,Kn(e.type));if(e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];re(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const l=Jn({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});re(t,l);const a=pe({gameState:t,playableItems:[l],roomId:r.id});t.characterRooms={headOverHeels:a},t.currentCharacterName="headOverHeels";return}Mt({room:r,item:e});return}else{const s=pe({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Hs=(t,e)=>{e.type==="headOverHeels"?Vs(t,e):Xs(t,e),De(t)===void 0&&T.dispatch(Do())},Gs=t=>{for(const e of _(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){Zt(n);continue}if(!Xt(n,e)){Zt(n);const r=$r(n,_(t.items));r!==void 0&&Gn({above:n,below:r})}}},js=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,qs=(t,e,n)=>{for(const r of _(t.items))!ce(r)||t.roomTime===r.state.actedOnAt||Lo(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=zo(r.state.position),n.add(r))},Ws=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Ys=et,Js=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=wn(t,e),i=be(t)?.items??Ys;n=new Set(A(Ge(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return wn(t,e*t.gameSpeed)},wn=(t,e)=>{const{inputStateTracker:n}=t,r=be(t);if(r===void 0)return Nn;const o=Object.fromEntries(A(Dt(r.items)).map(([l,a])=>[l,a.state.position]));n.currentActionPress("swop")==="tap"&&pi(t);for(const l of _(r.items))js(l,r)&&(Yn({room:r,item:l}),N(l)&&Hs(t,l));const i=Object.values(r.items).sort(Ws);for(const l of i){const a=De(t);if(a===void 0||a.state.action==="death")break;r.items[l.id]!==void 0&&Ns(l,r,t,e)}Gs(r);const s=new Set(A(_(r.items)).filter(l=>o[l.id]===void 0||!xe(l.state.position,o[l.id])));return Ps(s,r,o),qs(r,o,s),Zs(t,r,e),s},Zs=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=De(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Zn(t,Kn(r.type));i!==void 0&&(i.state.gameTime+=n)}}},Tn=(t,e)=>{const n=w(t),r=w(W(t,{x:e.x,z:e.z})),o=w(W(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},mt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Ks=(t,e,n,r)=>{const o=Tn(t,e),i=Tn(n,r),s=o.topLeft.x,l=o.topRight.x,a=i.topLeft.x,c=i.topRight.x,u=mt(s,l,a,c),d=o.topRight.y-o.topRight.x/2,f=o.bottomCentre.y-o.bottomCentre.x/2,m=i.topRight.y-i.topRight.x/2,p=i.bottomCentre.y-i.bottomCentre.x/2,x=mt(d,f,m,p),X=o.topLeft.y+o.topLeft.x/2,D=o.bottomCentre.y+o.bottomCentre.x/2,H=i.topLeft.y+i.topLeft.x/2,L=i.bottomCentre.y+i.bottomCentre.x/2,k=mt(X,D,H,L);return u&&x&&k},Qs=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Ks(n,r,o,i))return 0;for(const s of Mo){const l=t.state.position[s],a=l+r[s],c=e.state.position[s],u=c+i[s];if(a<=c)return 1*(s==="z"?-1:1);if(l>=u)return-1*(s==="z"?-1:1)}return Cn(e)-Cn(t)},Cn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class je extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const ea=t=>{const e=ta(t);let n=e.length,r=n;const o=new Array(n),i={},s=na(e);for(;r--;)i[r]||l(e[r],r,new Set);return o;function l(a,c,u){if(u.has(a))throw new je([a],!1);if(i[c])return;i[c]=!0;const d=t.get(a)||new Set,f=Array.from(d);if(c=f.length){u.add(a);do{const m=f[--c];try{l(m,s.get(m),u)}catch(p){throw p instanceof je?p.hasClosedCycle?p:new je([a,...p.cyclicDependency],p.cyclicDependency.includes(a)):p}}while(c);u.delete(a)}o[--n]=a}};function ta(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function na(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Sn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ve=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},ra=(t,e=new Set(_(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Ve(n,o,s);for(const o of e)if(o.renders)for(const i of _(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Qs(o,i);if(Sn(r,o,i),s===0){Ve(n,o.id,i.id),Ve(n,i.id,o.id);continue}const l=s>0?o.id:i.id,a=s>0?i.id:o.id;Sn(n,l,a),Ve(n,a,l)}return n},Wr=(t,e,n=3)=>{try{return{order:ea(t),impossible:!1}}catch(r){if(r instanceof je){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),{order:Wr(t,e,n-1).order,impossible:!0}}else throw r}},oa=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,ia=(t,e,n)=>{const o=ie.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ie.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},Xe=t=>B(()=>h(t)),B=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,previousRendering:null}),renderProps:et}:"no-update";function*sa({config:{direction:t,inHiddenWall:e,height:n}},r){const o=tt(t),i=o==="y"?1:16;function*s(l){if(e){if(n!==0){const c=h({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...ct(l,{y:-P.h*n})});c.filters=Ft(r,o==="x"?"towards":"right",!0),yield c}}else{yield h({pivot:{x:i,y:9},texture:"generic.door.legs.base",...ct(l,{})});for(let a=1;a<n;a++)yield h({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...ct(l,{y:-a*P.h})})}}yield*s(M({...Q,[o]:1})),yield*s(Q),e||(yield h({pivot:{x:16,y:P.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...M({...Q,[o]:1})}))}const Yr=(t,e)=>{const n=tt(t),r=At(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):Q},aa=B(({item:t,room:e})=>Vt(sa(t,e),new v({filters:K(e),...Yr(t.config.direction,t.aabb)}))),la=B(({item:{config:{direction:t,part:e},aabb:n},room:r})=>{const o=tt(t);return h({texture:ia(r,o,e),filter:K(r),...Yr(t,n)})}),gt={animationId:"bubbles.cold"},ue=({top:t,bottom:e="homingBot",filter:n})=>{const r=new v({filters:n});r.addChild(h(e));const o=h(t);return o.y=-12,r.addChild(o),r},ca=({top:t,bottom:e})=>{const n=new v;return n.addChild(e),t.y=-12,n.addChild(t),n},ua=`#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uColour;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if( c.a < 0.1 ) {
        finalColor = c;
    } else {
        finalColor = vec4(uColour, 1);
    }
}
`;class kn extends Y{constructor(e){const n=V.from({vertex:ot,fragment:ua,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const bt=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(Eo(i))return{texture:i}}const o=`${t}.idle.${n}`;return $o(o)?{animationId:o}:{texture:`${t}.walking.${n}.2`}},On=({gameTime:t,switchedToAt:e})=>e+mi>t,da=t=>{if(!Ie(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Kt<Kt*.15},_n={head:b.metallicBlue,heels:b.pink},In=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Pn=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?Ze:t.filters},vt=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?In(o,new me(_n[t],T.getState().upscale.gameEngineUpscale)):!e&&i&&Pn(o,me);const s=r?.flashing??!1;n&&!s?In(o,new kn(_n[t])):!n&&s&&Pn(o,kn)},xt=({item:t,currentlyRenderedProps:e,previousRendering:n})=>{const{type:r,state:{action:o,facing:i,teleporting:s}}=t,l=Ro(i),a=t.type==="headOverHeels"?On(t.state.head):On(t.state),c=da(t),u=Be(i),d=s?.phase??null,f={action:o,facingXy8:l,teleportingPhase:d,flashing:c,highlighted:a},m=e===void 0||e.action!==o||e.facingXy8!==l||e.teleportingPhase!==d,p=m?r==="headOverHeels"?ca({top:h(bt({name:"head",...f})),bottom:h(bt({name:"heels",...f}))}):h(bt({name:r,...f})):n;return r==="headOverHeels"?(vt("head",f,m?void 0:e,p.getChildAt(0)),vt("heels",f,m?void 0:e,p.getChildAt(1))):vt(r,f,m?void 0:e,p),o==="moving"&&n instanceof Fe&&(n.animationSpeed=u*Uo),{container:p,renderProps:f}},fa=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{side:r},position:{x:o,y:i}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],o),e[r][1]=Math.max(e[r][1],o))}return e},Jr=({blockXExtent:t,blockYExtent:e,blockXMin:n,blockYMin:r,type:o,extraWalls:i})=>{const s=new v({label:"towards"});for(let a=0;a<=t;a+=.5){const c=a+n+.5,u=A(i).find(p=>p.config.side==="towards"&&p.position.x<=c&&p.position.x>=c-1),d=u===void 0?0:u.position.y+1-r,f={x:a,y:d},m={x:7,y:0};s.addChild(Je(f,h({pivot:m,texture:`${o}.towards`})))}const l=new v({label:"right"});for(let a=0;a<=e;a+=.5){const c=a+r+.5,u=A(i).find(f=>f.config.side==="right"&&f.position.y<=c&&f.position.y>=c-1),d=u===void 0?0:u.position.x+1-n;l.addChild(Je({x:d,y:a},h({pivot:{x:0,y:0},texture:`${o}.right`})))}return{right:l,towards:s}},ha=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new E().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(M),!0).fill(0);function*pa(t,e,n){for(const r of No){const o=At(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let l=0;l<=t.size[r];l++){let a;if(t.walls[s][l]==="none"){const c=A(_(t.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===l||u.position[r]+1===l)&&u.position[o]===t.size[o]);c===void 0?a="none":c.position.z===0?a="behind-door":a="corner-on-floor"}else a="corner-on-floor";a!=="none"&&(yield Je({[r]:l-e[r],[o]:t.size[o]+(n[i]?.5:0)+(a==="behind-door"?.5:0)},h(a==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const Zr=t=>[...A(_(t)).filter(e=>e.type==="wall")],ma=B(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:l,edgeRightX:a}=rt(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:f},roomJson:{items:m}}=e,p=new v({label:`floor(${e.id})`});if(d!=="none"){const k=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,F=new v;for(let z=-1;z<=o+2;z++)for(let Le=z%2-1;Le<=i+2;Le+=2)F.addChild(Je({x:z+(s.right?-.5:0),y:Le+(s.towards?-.5:0)},h({texture:k})));Vt(pa(e,{x:n,y:r},s),F);const te=new E().poly([Q,M({x:c,y:0}),M({x:c,y:u}),M({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});F.addChild(te),F.filters=K(e),F.mask=te,p.addChild(F)}const x=Zr(m),{towards:X,right:D}=Jr({blockXExtent:c,blockYExtent:u,blockXMin:n,blockYMin:r,type:"floorOverdraw",extraWalls:x});p.addChild(X),p.addChild(D);const H=new E().poly([{x:l,y:16},{x:l,y:-999},{x:a,y:-999},{x:a,y:16}],!0).fill(16776960);p.addChild(H);const L=fa([...x]);if(L!==void 0){const k=ha({extraWallRanges:L,blockXMin:n,blockYMin:r});p.addChild(k)}return p.mask=H,p.y=-t.aabb.z,p.cacheAsTexture(!0),p}),ga=B(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:l,edgeRightX:a}=rt(t.roomJson),c=i-r,u=s-o,d=new v({label:"floorEdge"}),f=new E({label:"overDrawToHideFallenItems"}).poly([M({x:c,y:0}),M({x:0,y:0}),M({x:0,y:u}),{...M({x:0,y:u}),y:999},{...M({x:c,y:0}),y:999}],!0).fill(0);f.y=8,d.addChild(f);const{towards:m,right:p}=Jr({blockXExtent:c,blockYExtent:u,blockXMin:r,blockYMin:o,type:"floorEdge",extraWalls:Zr(t.roomJson.items)}),x=!e&&n.colourise;m.filters=Ft(t,"towards",x),p.filters=Ft(t,"right",x),d.addChild(m),d.addChild(p);const X=new E({label:"floorMaskCutOffLeftAndRight"}).poly([{x:l,y:999},{x:l,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return d.addChild(X),d.mask=X,d.cacheAsTexture(!0),d}),ba=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,yt=b.moss,Fn=B(({item:{config:{style:t}}})=>h(t==="book"?"book.y":t)),va={head:xt,heels:xt,headOverHeels:xt,doorFrame:la,doorLegs:aa,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:B(({item:{config:{side:t,style:e}},room:n})=>{if(t==="right"||t==="towards")throw new Error("this wall should be non-rendering");return h({texture:oa(n.planet,e,t,n.color.shade==="dimmed"),y:1,pivot:t==="away"?{x:_e.w,y:_e.h+1}:{x:0,y:_e.h+1},filter:K(n)})}),barrier:B(({item:{config:{axis:t,times:e}}})=>h({texture:`barrier.${t}`,times:e})),deadlyBlock:B(({item:{config:{style:t,times:e}},room:n})=>h({texture:t,filter:t==="volcano"?K(n):void 0,times:e})),slidingDeadly:Fn,slidingBlock:Fn,block({item:{config:{style:t,times:e},state:{disappear:n}},room:r,currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:h({texture:ba(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?K(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?Vo(T.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:h(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t},state:{stoodOnBy:e}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new v,s=Xo(t);return i.addChild(h(r?{animationId:`conveyor.${s}`,reverse:t==="towards"||t==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:B(()=>{const t=new v,e={x:Oe.w/2,y:Oe.h};return t.addChild(h({animationId:"lift",pivot:e})),t.addChild(h({texture:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=A(t).find(N)!==void 0;return e===void 0||n!==e.flashing?{container:n?new v({children:[h("teleporter"),h({animationId:"teleporter.flashing"})]}):h("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:B(({item:{config:t},room:e})=>{if(t.gives==="crown")return h({texture:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:K(e)},reincarnation:{animationId:"fish"}}[t.gives];return h(r)}),moveableDeadly:B(({item:{config:{style:t}}})=>h(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=Tt(t);return e===void 0||n!==e.facingXy4?{container:ue({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?Wi:o?void 0:qi(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const l=Tt(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||l!==r.facingXy4))return"no-update";const c={facingXy4:l,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:h({texture:`${t.which}.${t.style}.${l}`,filter:s}),renderProps:c};case"elephantHead":return{container:h({texture:`elephant.${l}`,filter:s}),renderProps:c};case"turtle":return{container:h(o&&!i?{animationId:`${t.which}.${l}`,filter:s}:{texture:`${t.which}.${l}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ue({top:{texture:`${t.which}.${l}`,filter:s||K(n)},bottom:gt}):h({texture:`${t.which}.${l}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ue({top:`${t.which}.${l}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const a={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:h(o&&!i?{animationId:t.which,filter:s}:{texture:`${t.which}.1`,filter:s}),renderProps:a};case"homingBot":return{filter:s,container:h({texture:t.which,filter:s}),renderProps:a};case"bubbleRobot":return{container:ue({top:gt,filter:s}),renderProps:a};case"emperorsGuardian":return{container:ue({top:"ball",bottom:gt,filter:s}),renderProps:a};case"emperor":return{container:h({animationId:"bubbles.cold",filter:s}),renderProps:a};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:Xe("joystick"),movableBlock:B(({item:{config:{style:t}}})=>h(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new me(yt,T.getState().upscale.gameEngineUpscale):void 0;return{container:h({texture:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new me(yt,T.getState().upscale.gameEngineUpscale):void 0;return{container:h(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new me(yt,T.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?ue({top:{texture:`head.walking.${e}.2`,filter:i},bottom:{texture:`heels.walking.${e}.2`,filter:i}}):h({texture:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Xe("hushPuppy"),bubbles:B(({item:{config:{style:t}}})=>h({animationId:`bubbles.${t}`})),firedDoughnut:Xe({animationId:"bubbles.doughnut"}),ball:Xe("ball"),floor:ma,floorEdge:ga},xa=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class ya{#e;#o;#r=void 0;#n;#a;constructor(e,n,r){this.#e=e,this.#o=n,this.#n=new v({label:`ItemAppearanceRenderer ${e.id}`}),xa(e,this.#n,r),this.#a=va[e.type]}destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#o,currentlyRenderedProps:this.#r,displaySettings:e.displaySettings,previousRendering:this.#n.children.at(0)??null,onHold:e.onHold});n!=="no-update"&&(this.#r=n.renderProps,this.#n.children.at(0)!==n.container&&(this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container)))}get container(){return this.#n}}const Bn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},An=(t,e)=>{const n=new E;return Bn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Bn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},wa={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Ta{#e;constructor(e){const n=wa[e.type]??"rgba(255,255,255)";if(this.#e=new v({label:`ItemBoundingBoxRenderer ${e.id}`}),$("portal")(e)){const o=w(e.config.relativePoint);this.#e.addChild(new E().circle(o.x,o.y,5).stroke(n)),this.#e.addChild(new E().circle(o.x,o.y,2).fill(n))}this.#e.addChild(new E({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(An(e.aabb,n)),e.renderAabb&&this.#e.addChild(An(e.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#e.addChild(r=new Mi({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class Ca{#e;#o;#r;constructor(e,n){this.#o=new v({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#r=n,this.#e=e,this.#n()}#n(){const e=w(this.#e.state.position);this.#o.x=e.x,this.#o.y=e.y}tick(e){this.#r?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#o.destroy({children:!0}),this.#r?.destroy()}get container(){return this.#o}}class Sa{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=T.getState();o||(this.#e.filters=new Di({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const s=gi(e)?e.config.times:void 0,l=s&&{x:s.x??1,y:s.y??1},a=h({...typeof i=="string"?{texture:i}:i,times:l});let c;if(a instanceof ge)c=a;else{const u=a.getLocalBounds(),d=Et.create({width:u.maxX-u.minX,height:u.maxY-u.minY});a.x-=u.minX,a.y-=u.minY,r.render({container:a,target:d}),c=new ge({texture:d,label:"shadowMaskSprite (of renderTexture)",x:u.minX,y:u.minY})}e.shadowMask.relativeTo==="top"&&(c.y-=e.aabb.z),s&&(c.y-=((s.z??1)-1)*P.h),this.#e.addChild(c),o||(this.#e.mask=c)}this.#e.addChild(this.#o),this.#e.addChild(new E().circle(0,0,2).fill(16711680))}#e=new v({label:"ItemShadowRenderer"});#o=new v({label:"shadows"});#r={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=A(_(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:bi}},l=Object.groupBy(i,a=>{const c=this.#r[a.id]!==void 0,u=e.has(a);return!r&&!u?c?"keepUnchanged":"noShadow":zt(s,a)?c?"update":"create":"noShadow"});for(const a of Ge(l.keepUnchanged,l.update))this.#r[a.id].renderedOnProgression=n;for(const a of Ge(l.create)){const c=h(a.shadowCastTexture);c.label=a.id,this.#o.addChild(c),this.#r[a.id]={sprite:c,renderedOnProgression:n}}for(const a of Ge(l.create,l.update)){const{sprite:c}=this.#r[a.id],u=w({...Ae(a.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[a,{sprite:c,renderedOnProgression:u}]of Ho(this.#r))u!==n&&(c.destroy(),delete this.#r[a]);this.#e.visible=(l.keepUnchanged?.length??0)+(l.update?.length??0)+(l.create?.length??0)>0}get container(){return this.#e}}const ka=t=>t.shadowMask!==void 0,Oa=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=T.getState(),{userSettings:{displaySettings:{showBoundingBoxes:i,colourise:s}}}=o,l=Vn(o),a=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const u=new ya(t,e,n);c.push(u),a&&(u.container.alpha=.66),!l&&s&&ka(t)&&c.push(new Sa(t,e,r))}return a&&c.push(new Ta(t)),c.length===0?"not-needed":new Ca(t,new _a(c))};class _a{#e;#o=new v({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#o.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#o}}const de=.33,Ia=16,Bt=_e.h-_e.w/2,Pa=Z.heels,Fa=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=rt(t.roomJson),l=r+i.x,a=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Ia-i.y-Math.abs(c/2)},d=u.x+l<0,f=u.x+a>n.x,m=u.y+s-Bt<0;return(p,x,X)=>{if(p===void 0)return;const D=w(p.state.position),H=W(D,u),L={x:d&&H.x<n.x*de?Math.min(-l,n.x*de-D.x):f&&H.x>n.x*(1-de)?Math.max(n.x-a,n.x*(1-de)-D.x):u.x,y:m&&H.y<n.y*de?n.y*de-D.y:u.y};if(X)e.x=L.x,e.y=L.y;else{const k=Pa*x,F=Ae(e,L),te=En(F);if(te>k){const z={x:F.x/te,y:F.y/te};e.x-=z.x*k,e.y-=z.y*k}else e.x=L.x,e.y=L.y}}},Ba=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=rt(t);return new E().rect(e+r.x,o-Bt,n-e,r.y-o+Bt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Dn{#e=new v({label:"items"});#o=new v({label:"floorEdge"});#r=new v({children:[this.#e,this.#o]});#n=!1;#a=new Map;#i=new Map;#s;#c;#h;#l;#t;#u;#f;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=T.getState();this.#c=i,this.#h=s,this.#l=n,this.#t=e,this.#u=r,this.#f=o,this.#r.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&i.colourise,n.color),i.showBoundingBoxes!=="none"&&this.#r.addChild(Ba(n.roomJson)),this.#s=Fa(n,this.#r,s.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?Ze:new q(Nt(n).main.original)}#d(e){for(const n of _(this.#l.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Oa({item:n,room:this.#l,gameState:this.#t,pixiRenderer:this.#f}),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#o:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#l.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#m(e){const{order:n}=Wr(ra(this.#l.items,e.movedItems,this.#a),this.#l.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(_(this.#l.items))};this.#s(De(this.#t),n.deltaMS,!this.#n),this.#d(n),(!this.#n||n.movedItems.size>0)&&this.#m(n),this.#n=!0}destroy(){this.#r.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#c}get upscale(){return this.#h}get everRendered(){return this.#n}get container(){return this.#r}get roomState(){return this.#l}get paused(){return this.#u}}var at=`in vec2 aPosition;
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
`,lt=`struct GlobalFilterUniforms {
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
}`,Aa=`precision highp float;
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
`,Da=`struct CRTUniforms {
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
}`,La=Object.defineProperty,za=(t,e,n)=>e in t?La(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,qe=(t,e,n)=>(za(t,typeof e!="symbol"?e+"":e,n),n);const Kr=class Qr extends Y{constructor(e){e={...Qr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:lt,entryPoint:"mainVertex"},fragment:{source:Da,entryPoint:"mainFragment"}}),r=V.from({vertex:at,fragment:Aa,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),qe(this,"uniforms"),qe(this,"seed"),qe(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};qe(Kr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Ma=Kr;var Ra=`
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
}`,Ua=`struct KawaseBlurUniforms {
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
}`,Ea=`
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
`,$a=`struct KawaseBlurUniforms {
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
}`,Na=Object.defineProperty,Va=(t,e,n)=>e in t?Na(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ne=(t,e,n)=>(Va(t,typeof e!="symbol"?e+"":e,n),n);const eo=class to extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Pe("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...to.DEFAULT_OPTIONS,...n};const r=se.from({vertex:{source:lt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?$a:Ua,entryPoint:"mainFragment"}}),o=V.from({vertex:at,fragment:n?.clamp?Ea:Ra,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ne(this,"uniforms"),ne(this,"_pixelSize",{x:0,y:0}),ne(this,"_clamp"),ne(this,"_kernels",[]),ne(this,"_blur"),ne(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let l;if(this._quality===1||this._blur===0)l=this._kernels[0]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,n,r,o);else{const a=he.getSameSizeTexture(n);let c=n,u=a,d;const f=this._quality-1;for(let m=0;m<f;m++)l=this._kernels[m]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;l=this._kernels[f]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,r,o),he.returnTexture(a)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};ne(eo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Xa=eo;var Ha=`in vec2 vTextureCoord;
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
`,Ga=`struct AdvancedBloomUniforms {
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
`,ja=`
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
`,qa=`struct ExtractBrightnessUniforms {
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
`,Wa=Object.defineProperty,Ya=(t,e,n)=>e in t?Wa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,no=(t,e,n)=>(Ya(t,typeof e!="symbol"?e+"":e,n),n);const ro=class oo extends Y{constructor(e){e={...oo.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:lt,entryPoint:"mainVertex"},fragment:{source:qa,entryPoint:"mainFragment"}}),r=V.from({vertex:at,fragment:ja,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),no(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};no(ro,"DEFAULT_OPTIONS",{threshold:.5});let Ja=ro;var Za=Object.defineProperty,Ka=(t,e,n)=>e in t?Za(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fe=(t,e,n)=>(Ka(t,typeof e!="symbol"?e+"":e,n),n);const io=class so extends Y{constructor(e){e={...so.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:lt,entryPoint:"mainVertex"},fragment:{source:Ga,entryPoint:"mainFragment"}}),r=V.from({vertex:at,fragment:Ha,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:oe.WHITE}}),fe(this,"uniforms"),fe(this,"bloomScale",1),fe(this,"brightness",1),fe(this,"_extractFilter"),fe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Ja({threshold:e.threshold}),this._blurFilter=new Xa({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=he.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=he.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),he.returnTexture(s),he.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};fe(io,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Qa=io;const Ln=({crtFilter:t},e)=>[t?new Ma({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Qa({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class el{constructor(e,n){this.app=e,this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=T.getState();e.stage.addChild(this.#a),e.stage.scale=r;const o=be(n);if(o===void 0)throw new Error("main loop with no starting room");this.#n=new Dn({gameState:n,roomState:o,paused:!1,pixiRenderer:e.renderer}),this.#a.addChild(this.#n.container),this.#r=new es,e.stage.addChild(this.#r.container),this.#c()}#e;#o;#r;#n;#a=new v({label:"MainLoop/world"});#i;#s;#c(){const{userSettings:{displaySettings:e}}=T.getState();this.#e=Ln(e,!0),this.#o=Ln(e,!1)}tick=({deltaMS:e})=>{const n=T.getState(),r=Vn(n),{userSettings:{displaySettings:o},upscale:i}=T.getState();this.#r.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=r?Nn:Js(this.#s,e),l=be(this.#s);(this.#n?.roomState!==l||this.#n?.upscale!==i||this.#n?.displaySettings!==o||this.#n?.paused!==r)&&(this.#n?.destroy(),l?(this.#n=new Dn({gameState:this.#s,roomState:l,paused:r,pixiRenderer:this.#i.renderer}),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",l.id)):this.#n=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#n?.tick({progression:this.#s.progression,movedItems:s,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#o};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n?.destroy(),this.#r.destroy(),this.#i.ticker.remove(this.tick)}}Ke.add(er,tr,nr,rr,or,ir,sr,ar,lr,cr,ur,fr,dr,hr,pr,mr,gr,br,vr,xr,yr);Go.defaultOptions.scaleMode="nearest";const zn=async(t,e)=>{const n=new Ir;await n.init({background:"#000000",sharedTicker:!0});const r=Vi({campaign:t,inputStateTracker:e});T.dispatch(Gt(r.characterRooms.head.id)),T.dispatch(Gt(r.characterRooms.heels.id));const o=new el(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=De(r);s!==void 0&&Lt({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return be(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},il=Object.freeze(Object.defineProperty({__proto__:null,default:zn,gameMain:zn},Symbol.toStringTag,{value:"Module"}));export{Sr as A,wr as C,Y as F,Et as R,ki as S,kr as V,Fi as a,il as g,Si as u};
