const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-DtzbH7qB.js","assets/App-DGKcuZcc.js","assets/index-IrjwM9a4.js","assets/index-Vl4cYYvO.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-UUhEX1FN.js","assets/Graphics-swXzRLtq.js","assets/swopCharacters-BVKeewiq.js","assets/WebGLRenderer-CNNB3Jx5.js"])))=>i.map(i=>d[i]);
import{A as ao,a8 as se,a9 as H,n as Rn,F as re,E as x,f as Qe,e as lo,C as g,d as Pe,v as We,ao as b,D as Tt,ag as ge,T as ke,U as co,V as uo,aH as fo,aI as ho,aJ as po,m as mo,aK as go,H as bo,aL as vo,aM as oe,aN as Un,a2 as yo,aO as xo,aP as Xe,Y as C,aQ as Oe,aR as wo,aS as To,L as _,aT as Ae,W as P,a4 as ye,I as En,aU as ae,aV as et,$ as K,_ as L,aW as Ct,aX as Co,Q as St,aY as So,aZ as De,a_ as $n,p as Le,Z as tt,a$ as Xt,b0 as ko,b1 as Oo,b2 as Io,N as R,b3 as _o,b4 as Po,a3 as Nn,X as nt,b5 as Lt,b6 as Fo,a0 as F,b7 as Bo,O as Vn,b8 as Ao,b9 as Do,ba as Lo,bb as Ge,bc as zo,bd as Mo,be as Ro,bf as Uo,bg as Ye,a as Fe,bh as Eo,bi as Ie,bj as Hn,ae as he,a5 as Gt,bk as $o}from"./App-DGKcuZcc.js";import{l as kt,h as Je,j as jt,g as z,p as T,k as ut,m as Me,s as be,n as le,i as N,q as Ot,t as No,r as Vo,u as Ho,v as Xo,w as V,x as Go,y as Re,z as jo,A as ie,B as qo,C as Wo,D as Yo,E as xe,F as qt,G as It,c as zt,H as Jo,I as Zo,J as Xn,K as rt,L as Mt,M as Ko,N as Wt,O as dt,P as Gn,Q as Qo,a as ce,R as jn,S as qn,T as Yt,U as Wn,f as ei,V as Yn,W as Jn,X as ti,Y as Rt,Z as ni,_ as ri,$ as oi,a0 as ii,a1 as si,b as ze,a2 as Jt,a3 as Zn,e as Kn,o as Qn,a4 as ai,a5 as Zt,a6 as ft,a7 as w,a8 as li,a9 as ci,aa as Kt,ab as ot,ac as ui,ad as di}from"./swopCharacters-BVKeewiq.js";import{S as fi,G as j}from"./Graphics-swXzRLtq.js";import{_ as Qt,g as hi}from"./index-IrjwM9a4.js";const er=class _t extends ao{constructor(e){e={..._t.defaultOptions,...e},super(e),this.enabled=!0,this._state=fi.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=se.from(n)),r&&(s=H.from(r)),new _t({gpuProgram:i,glProgram:s,...o})}};er.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let q=er;var pi=`
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
`,mi=`in vec2 aPosition;
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
`,gi=`
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
}`;class S extends q{constructor(e){const n=e.gpu,r=en({source:gi,...n}),o=se.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=en({source:pi,...i}),a=H.from({vertex:mi,fragment:s}),l=new Rn({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:re.EMPTY}})}}function en(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Ut=`
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
    `,Et=`
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
	`;class tr extends S{constructor(){super({gl:{functions:`
                ${Ut}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Et}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}tr.extension={name:"color",type:x.BlendMode};class nr extends S{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"color-burn",type:x.BlendMode};class rr extends S{constructor(){super({gl:{functions:`
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
                `}})}}rr.extension={name:"color-dodge",type:x.BlendMode};class or extends S{constructor(){super({gl:{functions:`
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
                `}})}}or.extension={name:"darken",type:x.BlendMode};class ir extends S{constructor(){super({gl:{functions:`
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
            `}})}}ir.extension={name:"difference",type:x.BlendMode};class sr extends S{constructor(){super({gl:{functions:`
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
            `}})}}sr.extension={name:"divide",type:x.BlendMode};class ar extends S{constructor(){super({gl:{functions:`
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
            `}})}}ar.extension={name:"exclusion",type:x.BlendMode};class lr extends S{constructor(){super({gl:{functions:`
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
                `}})}}lr.extension={name:"hard-light",type:x.BlendMode};class cr extends S{constructor(){super({gl:{functions:`
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
            `}})}}cr.extension={name:"hard-mix",type:x.BlendMode};class ur extends S{constructor(){super({gl:{functions:`
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
            `}})}}ur.extension={name:"lighten",type:x.BlendMode};class dr extends S{constructor(){super({gl:{functions:`
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
                `}})}}dr.extension={name:"linear-burn",type:x.BlendMode};class fr extends S{constructor(){super({gl:{functions:`
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
            `}})}}fr.extension={name:"linear-dodge",type:x.BlendMode};class hr extends S{constructor(){super({gl:{functions:`
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
            `}})}}hr.extension={name:"linear-light",type:x.BlendMode};class pr extends S{constructor(){super({gl:{functions:`
                ${Ut}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Et}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}pr.extension={name:"luminosity",type:x.BlendMode};class mr extends S{constructor(){super({gl:{functions:`
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
            `}})}}mr.extension={name:"negation",type:x.BlendMode};class gr extends S{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"overlay",type:x.BlendMode};class br extends S{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"pin-light",type:x.BlendMode};class vr extends S{constructor(){super({gl:{functions:`
                ${Ut}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Et}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}vr.extension={name:"saturation",type:x.BlendMode};class yr extends S{constructor(){super({gl:{functions:`
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
                `}})}}yr.extension={name:"soft-light",type:x.BlendMode};class xr extends S{constructor(){super({gl:{functions:`
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
                `}})}}xr.extension={name:"subtract",type:x.BlendMode};class wr extends S{constructor(){super({gl:{functions:`
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
                `}})}}wr.extension={name:"vivid-light",type:x.BlendMode};const Pt=[];Qe.handleByNamedList(x.Environment,Pt);async function bi(t){if(!t)for(let e=0;e<Pt.length;e++){const n=Pt[e];if(n.value.test()){await n.value.load();return}}}let we;function vi(){if(typeof we=="boolean")return we;try{we=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{we=!1}return we}var Tr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Tr||{});class yi{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const xi=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Cr=class Sr extends lo{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...xi,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await bi(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Sr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof g&&(r={container:r},n&&(Pe(We,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:b.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Tr.ALL);const{clear:r,clearColor:o,target:i}=e;b.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,b.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new yi(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!vi())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Cr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let kr=Cr,Ue;function wi(t){return Ue!==void 0||(Ue=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??kr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Tt.get().getWebGLRenderingContext())return!1;let r=Tt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Ue}let Ee;async function Ti(t={}){return Ee!==void 0||(Ee=await(async()=>{const e=Tt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Ee}const tn=["webgl","webgpu","canvas"];async function Ci(t){let e=[];t.preference?(e.push(t.preference),tn.forEach(i=>{i!==t.preference&&e.push(i)})):e=tn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Ti()){const{WebGPURenderer:a}=await Qt(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-DtzbH7qB.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&wi(t.failIfMajorPerformanceCaveat??kr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Qt(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-CNNB3Jx5.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Or="8.8.1";class Ir{static init(){globalThis.__PIXI_APP_INIT__?.(this,Or)}static destroy(){}}Ir.extension=x.Application;class Si{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Or)}destroy(){this._renderer=null}}Si.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const _r=class Ft{constructor(...e){this.stage=new g,e[0]!==void 0&&Pe(We,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Ci(e),Ft._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Pe(We,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Ft._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};_r._plugins=[];let Pr=_r;Qe.handleByList(x.Application,Pr._plugins);Qe.add(Ir);var ki=`in vec2 aPosition;
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
`,Oi=`
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
}`;const Fr=class Br extends q{constructor(e){e={...Br.defaultOptions,...e};const n=se.from({vertex:{source:nn,entryPoint:"mainVertex"},fragment:{source:nn,entryPoint:"mainFragment"}}),r=H.from({vertex:ki,fragment:Oi,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Rn({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Fr.defaultOptions={alpha:1};let Ii=Fr;class Be extends ge{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[p]=u;super({...h,texture:p instanceof re?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ke.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ke.shared.add(this.update,this,co.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(re.from(e[r]));return new Be(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(re.from(e[r]));return new Be(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof re)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ke.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ke.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class _i extends uo{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new fo({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Pi(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Pe(We,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Fi extends _i{constructor(...e){const n=Pi(e,"Text");super(n,ho),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=po.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class $t extends re{static create(e){return new $t({source:new mo(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}var $e={},rn;function Bi(){if(rn)return $e;rn=1;var t=go(),e=t.mark(i),n=bo(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,p=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=p.length,l=new Array(a),c=0;c<a;c++)l[c]=p[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return h=d[u],v.delegateYield(o(h),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}$e.__concat=i;var s=r(i);return $e.concat=s,$e}var ht,on;function Ai(){return on||(on=1,ht=Bi().concat),ht}var Di=Ai();const Bt=hi(Di);function Li(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const zi=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},Mi=({campaign:t,inputStateTracker:e})=>{const n=zi(t),r=vo(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&kt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&kt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:Je(o.items.head),heels:i===void 0?void 0:Je(i.items.heels)},inputStateTracker:e,campaign:t,events:Li(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},y={pureBlack:new b("#000000"),lightBlack:new b("#212C20"),shadow:new b("#325149"),midGrey:new b("#7F7773"),lightGrey:new b("#BBB1AB"),white:new b("#FBFEFB"),metallicBlue:new b("#366CAA"),pink:new b("#D68ED1"),moss:new b("#9E9600"),redShadow:new b("#805E50"),midRed:new b("#CA7463"),lightBeige:new b("#DAA78F"),highlightBeige:new b("#EBC690"),alpha:new b("#1E7790"),replaceLight:new b("#08A086"),replaceDark:new b("#187558")},it=`in vec2 aPosition;
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
`,Ri=`#version 300 es

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
`;class me extends q{constructor(e,n){const r=H.from({vertex:it,fragment:Ri,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const Ui=`precision mediump float;
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
`,sn=[y.pureBlack,y.lightBlack];class W extends q{uniforms;constructor(e="white"){const n=H.from({vertex:it,fragment:Ui,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=sn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=sn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new b(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const E={original:new b("rgb(255, 255, 255)"),basic:new b("rgb(210, 210, 210)"),dimmed:new b("rgb(120, 120, 120)")},$={original:new b("rgb(255, 255, 0)"),basic:new b("hsl(50,65%,70%)"),dimmed:y.redShadow},X={original:new b("rgb(255, 0, 255)"),basic:y.pink,dimmed:new b("hsl(290,35%,38%)")},k={original:new b("rgb(0, 255, 255)"),basic:new b("hsl(183, 50%, 50%)"),dimmed:new b("hsl(183, 50%, 25%)")},G={original:new b("rgb(0, 255, 0)"),basic:y.moss,dimmed:new b("hsl(73,50%,25%)")},Nt={white:{basic:{main:E,edges:{towards:k,right:$},hud:{lives:$,dimmed:X,icons:k}},dimmed:{main:E,edges:{towards:G,right:k},hud:{lives:$,dimmed:X,icons:k}}},yellow:{basic:{main:$,edges:{towards:G,right:E},hud:{lives:k,dimmed:X,icons:G}},dimmed:{main:$,edges:{towards:k,right:k},hud:{lives:k,dimmed:X,icons:G}}},magenta:{basic:{main:X,edges:{towards:G,right:k},hud:{lives:E,dimmed:k,icons:$}},dimmed:{main:X,edges:{towards:G,right:k},hud:{lives:E,dimmed:k,icons:$}}},cyan:{basic:{main:k,edges:{towards:X,right:E},hud:{lives:E,dimmed:G,icons:$}},dimmed:{main:k,edges:{towards:X,right:E},hud:{lives:E,dimmed:G,icons:$}}},green:{basic:{main:G,edges:{towards:k,right:$},hud:{lives:E,dimmed:X,icons:k}},dimmed:{main:G,edges:{towards:k,right:$},hud:{lives:E,dimmed:X,icons:k}}}},Vt=t=>Nt[t.hue][t.shade],Ar=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+jt>n?100-Math.ceil((n-e)/(jt/100)):0},Dr=t=>{const e=100*z.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/z.w):0};function Ze(t,e){const n=e||new g;for(const r of t)n.addChild(r);return n}const an={x:.5,y:1},ln=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(ln(t)?c=Ei(t):c=new ge(oe.textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new g({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:p}=u;p>=1;p--)for(let m=1;m<=u.z;m++){const v=f({...t,times:void 0,label:`(${h},${p},${m})`}),B=T({x:h-1,y:p-1,z:m-1});v.x+=B.x,v.y+=+B.y,d.addChild(v)}return d}if(e===void 0&&r===void 0)if(ln(t))c.anchor=an;else{const u=oe.data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=an}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Ei({animationId:t,reverse:e,playOnce:n}){const o=oe.animations[t].map(s=>({texture:s,time:Un}));e&&o.reverse();const i=new Be(o);return i.animationSpeed=yo.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const $i=`in vec2 vTextureCoord;
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
`;class st extends q{constructor(e){const n=Object.keys(e).length,r=H.from({vertex:it,fragment:$i.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{y[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Lr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),zr=t=>Lr(Nt[t.color.hue][t.color.shade].main),Ni=t=>new st({lightBeige:y.lightGrey,redShadow:y.shadow,pink:y.lightGrey,moss:y.lightGrey,midRed:y.midGrey,highlightBeige:y.lightGrey,...zr(t)}),Vi=new st({midGrey:y.midRed,lightGrey:y.lightBeige,white:y.highlightBeige,metallicBlue:y.redShadow,pink:y.midRed,moss:y.midRed,replaceDark:y.midRed,replaceLight:y.lightBeige}),At=(t,e,n)=>n?new st(Lr(Nt[t.color.hue][t.color.shade].edges[e])):new W(Vt(t.color).edges[e].original),Z=t=>new st(zr(t)),Ke=xo,Hi=250,Xi=24,Gi=56,ji=80,cn=112,Te=t=>t==="heels"?1:-1;function*qi(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;To(o),yield f({textureId:o,x:(r+.5-n/2)*Xe.w})}}function Ce(t,e){t.removeChildren(),Ze(qi(e),t)}class Wi{constructor(e){this.gameState=e;for(const n of ut)this.#e.addChild(this.#t[n].livesText),this.#e.addChild(this.#t[n].sprite),this.#e.addChild(this.#t[n].shield.container),this.#e.addChild(this.#t[n].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[this.#a],this.#t.fps.y=Xe.h,this.#t.fps.x=Xe.w*2,this.#f()}#e=new g({label:"HudRenderer"});#o=new W;#r=new W;#n=new W;#a=new W(y.moss);#i=new me(y.pureBlack,C.getState().upscale.gameEngineUpscale);#s=new W;#c=[this.#i,this.#n];#u={original:[this.#i,this.#s],colourised:{head:[this.#i,new W(y.metallicBlue)],heels:[this.#i,new W(y.pink)]}};#t={head:{sprite:this.#h("head"),livesText:this.#d({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#l({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#l({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#l({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#l({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#h("heels"),livesText:this.#d({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#l({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#l({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#l({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new g({label:"heelsCarrying"})}},fps:this.#d({label:"fps",outline:!0})};#f(){const{inputStateTracker:{hudInputState:e}}=this.gameState;for(const n of ut){const{sprite:r}=this.#t[n];r.eventMode="static",r.on("pointerdown",()=>{e[`swop.${n}`]=!0}),r.on("pointerup",()=>{e[`swop.${n}`]=!1}),r.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#l({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new g({label:i});s.pivot={x:4,y:16};const a=new ge({texture:oe.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#r,y:n?0:8});s.addChild(a);const l=this.#d({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Xe.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#i),{text:l,icon:a,container:s}}#h(e){const n=new ge(oe.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#d({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new g({label:r,filters:n?this.#c:this.#n,scale:{x:1,y:e?2:1}})}#m(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Te("head")*cn,this.#t.head.doughnuts.container.y=e.y-Oe.h-8,this.#t.heels.carrying.container.y=e.y-Oe.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Te("heels")*cn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}#v(e){return f(e.type==="spring"?"spring.released":e.type==="sceneryPlayer"?e.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":e.config.style)}#p(e,n){return e?n?Ke:this.#s:this.#o}#y(e,n){const r=Me(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,a=s.children.length>0;if(i===null&&a)for(const l of s.children)l.destroy();i!==null&&!a&&s.addChild(this.#v(i)),s.filters=this.#p(!0,n),this.#t.heels.bag.icon.filters=this.#p(o,n)}#x(e,n){const r=Me(e,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#p(o,n),this.#t.head.doughnuts.icon.filters=this.#p(i!==0,n),Ce(this.#t.head.doughnuts.text,i)}#w(e,n,r){const o=Me(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+Te(r)*ji,Ce(i,Ar(o)),s.y=n.y,Ce(a,o===void 0?0:r==="head"?Dr(o):o.bigJumps),l.y=n.y-24}#g(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#T(e,n,r,o){const i=this.#g(e,o),s=this.#t[o].sprite;i?s.filters=r?Ke:this.#s:s.filters=this.#o,s.x=(n.x>>1)+Te(o)*Gi,s.y=n.y-Oe.h}#C(e,n,r){const i=Me(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+Te(r)*Xi,s.y=n.y,Ce(s,i??0)}#S(e,n){const r=be(e);if(r===void 0)return;const o=Vt(r.color);this.#o.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#n.targetColor=o.hud.dimmed[n?"basic":"original"],this.#r.targetColor=o.hud.icons[n?"basic":"original"],this.#s.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#g(e,"head")?this.#u.colourised.head:this.#o:this.#u.original,this.#t.heels.livesText.filters=n?this.#g(e,"heels")?this.#u.colourised.heels:this.#o:this.#u.original}#b=Number.NEGATIVE_INFINITY;#k(){if(wo(C.getState())){if(performance.now()>this.#b+Hi){const e=ke.shared.FPS;Ce(this.#t.fps,Math.round(e)),this.#a.targetColor=e>56?y.moss:e>50?y.metallicBlue:e>40?y.pink:y.midRed,this.#b=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick({gameState:e,screenSize:n,colourise:r}){this.#S(e,r);for(const o of ut)this.#C(e,n,o),this.#T(e,n,r,o),this.#w(e,n,o);this.#m(n),this.#x(e,r),this.#y(e,r),this.#k()}get container(){return this.#e}destroy(){this.#e.destroy()}}const un={movementType:"vel",vels:{gravity:_}},Yi=(t,e,n)=>{if(!le(t))return un;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=No[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?N("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Ot*n,-a)}}}:un:{movementType:"vel",vels:{gravity:{z:Math.max(o-Ot*n,-a)}}}},ve={movementType:"steady"},Ne=t=>{const n=t/Go*Un;return(t+.5*Ot*n**2)/n},Ji={head:Ne(Re.head),headOnSpring:Ne(Re.head+z.h),heels:Ne(Re.heels),heelsOnSpring:Ne(Re.heels+z.h)},Zi=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ji[`${n}${e?"OnSpring":""}`]},Ki=t=>!(t===null||Ho(t)||Xo(t)&&t.config.gives==="scroll"||V(t)&&t.state.standingOn===null),Mr=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&Ki(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:ve;const i=Vo(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Zi(t,i)}},stateDelta:{action:"moving",jumped:!0}}},Qi=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Ae(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return P(n,l)},dn={movementType:"vel",vels:{walking:_}},Rr=(t,e,n)=>{const r=es(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Ae(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ye(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},es=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:h,gravity:p}}}=t,m=n===t.id,v=m?e.currentActionPress("jump"):"released",B=m?e.directionVector:_,A=a===null&&p.z<0,U=o==="head"&&Dr(t.state)>0&&a!==null,O=o==="headOverHeels"?A?"head":"heels":U?"heels":o,I=s?l:B,M=ie[O];if(c!==null||i==="death")return dn;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:En(h,P(h,jo*r))}}:dn;if(v!=="released"){const ee=ae(et(I,K)?l:I),so=N("spring")(a)?1:qo;return{movementType:"vel",vels:{walking:P({...ee,z:0},M*so)},stateDelta:{facing:ee}}}}if(Ae(I)!==0)return A?{movementType:"vel",vels:{walking:P({...I,z:0},M)},stateDelta:{facing:I,action:"falling"}}:{movementType:"vel",vels:{walking:Qi({vel:h,acc:Wo[O],deltaMS:r,maxSpeed:M,unitD:I,minSpeed:0})},stateDelta:{facing:I,action:"moving"}};if(u>0&&u<1){const ee=ye(d,l)?1:0;return{movementType:"position",posDelta:P(l,ee-u),stateDelta:{action:A?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:A?"falling":"idle"}}},fn=z.h,hn=.001,ts=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=qt**2/(2*xe);if(n==="up"){if(e<=r)return Math.max(hn,Math.sqrt(2*xe*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(hn,Math.sqrt(2*xe*o))}else return qt}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*xe*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*xe*Math.max(e,0))):-.036},ns={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function rs({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(L(o).some(h=>Yo(h)&&h.config.style==="stepStool"))return ns;const l=t*fn,c=e*fn,u=ts({currentAltitude:r-l,direction:n,totalDistance:c-l});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=l?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function os(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&N("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:It}}}:ve;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return zt({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:It}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const pn={movementType:"vel",vels:{movingFloor:_}},is=(t,e,n)=>{if(V(t)&&t.state.teleporting!==null)return pn;const{state:{standingOn:r}}=t;if(r===null||!N("conveyor")(r))return pn;const{config:{direction:o}}=r,s=N("heels")(t)&&t.state.action==="moving"&&Ct(t.state.facing)===Co(o)?ie.heels:Jo;return{movementType:"vel",vels:{movingFloor:P(St[o],s)}}},_e=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Zo},Ur=150,Er=t=>t[Math.floor(Math.random()*t.length)],Q=Object.freeze({movementType:"vel",vels:{walking:_}}),at=t=>Xn(t)?ie[t.config.which]:ie[t.type],mn=z.w/2,ss=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ie.homingBot;if(!et(e,K))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=De(l.state.position,t);if(Math.abs(c.y)<mn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<mn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},$r=(t,e)=>{const{items:{head:n,heels:r,headOverHeels:o}}=e;if(o!==void 0)return _e(o)?void 0:e.items.headOverHeels;const i=n===void 0||_e(n)||n.state.action==="death"?void 0:Xt(n.state.position,t),s=r===void 0||_e(r)||r.state.action==="death"?void 0:Xt(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},as=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return Q;const l=$r(o,e);if(l===void 0||s+Ur>e.roomTime)return ve;const c=De(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>z.w/4?u:Le(u),h=at(t),p={..._,[d]:c[d]>0?h:-h},m=ae(p),v=!et(m,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:tt}}},gn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return Q;const a=$r(i,e);if(a===void 0)return Q;const l=a.state.position,c=z.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return Q;const d=De(a?.state.position,i),h=at(t),p=(1+Math.sqrt(2))/2,m=h*p,v=P({...d,z:0},m/$n(d)*(o?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:ae(v)}}},pt=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return Q;if(!(ye(i,_)||Math.random()<r/1e3))return ve;const l=Er(o);return{movementType:"vel",vels:{walking:P(St[l],at(t))},stateDelta:{facing:St[l]}}},ls=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?Q:et(i,K)?{movementType:"vel",vels:{walking:P(o,at(t))}}:ve},cs=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Er([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},mt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Ur))return;const c=rt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=cs(s,c,o);t.state.vels.walking=u,t.state.facing=ae(u),t.state.durationOfTouch=0},us=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},ds=(t,e,n,r)=>{if(!t.state.activated||Xn(t)&&t.state.busyLickingDoughnutsOffFace)return Q;switch(t.config.movement){case"patrol-randomly-diagonal":return pt(t,e,n,r,Io);case"patrol-randomly-xy8":return pt(t,e,n,r,Oo);case"patrol-randomly-xy4":return pt(t,e,n,r,ko);case"towards-tripped-on-axis-xy4":return ss(t,e);case"towards-on-shortest-axis-xy4":return as(t,e);case"back-forth":case"clockwise":return ls(t);case"unmoving":case"free":return Q;case"towards-when-in-square-xy8":return gn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return gn(t,e,n,r,So(C.getState()));default:throw t.config,new Error("this should be unreachable")}},fs=t=>{const{movingItem:e,touchedItem:n}=t;if(le(n,e))switch(e.config.movement){case"patrol-randomly-xy4":mt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":mt(t,"opposite");break;case"clockwise":mt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":us(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},hs=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},bn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>hs(t,e,n,r),ps=.001,Ht=(t,e,n=.001)=>{if(!le(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:Mt({state:{position:R(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+ps},id:t.id},{state:{position:R(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Nr=(t,e)=>{const r=[...L(e).filter(i=>Ht(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Ko(s,i);return a<0||a===0&&bn(t,s)>bn(t,i)?s:i})};function Vr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Ar(n)>0||_e(e)||(e.state.action="death",e.state.expires=t+It)}const Hr=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=dt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=dt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=Wt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=dt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=Wt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":C.dispatch(Po(r.config.page));break;case"reincarnation":break;case"crown":{C.dispatch(_o(r.config.planet));break}default:r.config}},ms=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Nn(i,r)<=0||e.state.action!=="death"&&zt({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},gs=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=nt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=R(t.state.position,s)};function bs({movingItem:t}){t.state.autoWalk=!1}const Y=(t,...e)=>N(...e)(t.touchedItem),Se=(t,...e)=>N(...e)(t.movingItem),Xr=t=>V(t.movingItem),vs=t=>V(t.touchedItem),ys=t=>Gn(t.touchedItem),vn=t=>{switch(!0){case Y(t,"stopAutowalk"):bs(t);break;case ys(t):Vr(t);break;case Y(t,"portal"):ms(t);break;case Y(t,"pickup"):Hr(t);break;case Y(t,"doorFrame"):gs(t);break}},xs=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of Lt(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&C.dispatch(Fo(o.path))}},ws=({movingItem:t,touchedItem:e})=>{if(!le(t))return;const{state:{position:n},aabb:r}=e,o=rt(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=ae(o),s=P(i,-.05);return e.state.vels.sliding=s,!1},Ts=({movingItem:t,touchedItem:e})=>{if(!le(e))return;const n=t.state.vels.sliding;if(ye(n,_))return;const{state:{position:r},aabb:o}=t,i=rt(e.state.position,e.aabb,r,o);return Nn(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},Cs=2*Qo,Gr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Cs,positionDelta:n})},Ss=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...En(r.state.position,o),z:0};if(!ye(s,_))for(const a of r.state.stoodOnBy)Gr(a,e,s)}},ks=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=rt(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=ae(a);for(const c of o){const u=e.items[c],d=P(l,-.025*r);u.state.facing=d,Gr(u,e,d)}},yn=t=>ce(t.movingItem)&&Ht(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),jr=(t,e)=>{let n=_;for(const r of e){if(r.movementType==="position"&&(n=R(n,r.posDelta)),r.movementType==="vel"&&(ce(t)||N("lift")(t)))for(const[i,s]of Lt(r.vels)){const a={..._,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},xn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&V(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&yn(t)){if(yn(t)&&Xr(t)){jn({above:t.movingItem,below:t.touchedItem});const n=[Mr(t.movingItem,t.gameState),Rr(t.movingItem,t.gameState,t.deltaMS)];jr(t.movingItem,n)}qn(t)}};function Os(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const qr=t=>{Xr(t)&&vn(t),vs(t)&&vn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),Y(t,...Yt)&&ws(t),Se(t,...Yt)&&Ts(t),(Se(t,"monster")&&Y(t,"firedDoughnut")||Se(t,"firedDoughnut")&&Y(t,"monster"))&&Os(t),(Se(t,"monster")||Se(t,"movableBlock"))&&fs(t),Y(t,"switch")&&xs(t),Y(t,"joystick")&&ks(t),t.touchedItem.state.disappear&&xn(t),t.movingItem.state.disappear&&le(t.touchedItem,t.movingItem)&&xn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Is=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=L(F(e.items)).filter(Wn),u=s===null?Ps(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}_s(e,i,u)}else{if(t.state.standingOn===null||!Wr(t,F(e.items)))return;const d=ei({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Yn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:qr}),i.carrying=null}},_s=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Jn({room:t,item:n})},Ps=(t,e)=>Nr(t,L(F(e.items)).filter(Wn)),Wr=(t,e)=>{const n={position:R(t.state.position,{z:z.h})},r=ti({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(le(o,t)){if(!ce(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!Wr(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0};function*Fs(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Bs=z.w*Math.sqrt(2)+1,As=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,h=500,p=ae(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+h<c){const m={type:"firedDoughnut",...ni,config:tt,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:R(u,P(p,Bs),t.type==="headOverHeels"?{z:z.h}:_),vels:{fired:P(p,ie.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Rt({room:e,item:m}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},Ds=2;function*Ls(t,e,n,r){ce(t)&&(yield Yi(t,n,r),yield is(t),yield*Fs(t,e)),V(t)&&(yield Rr(t,n,r),t.id===n.currentCharacterName&&(yield os(t,n,r),yield Mr(t,n),ri(t)&&Is(t,e,n,r),oi(t)&&As(t,e,n))),ii(t)&&(yield rs(t)),si(t)&&(yield ds(t,e,n,r))}const zs=(t,e,n,r)=>{!ce(t)||t.state.standingOn===null||(V(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&Hr({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||V(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&qn({touchedItem:t.state.standingOn,gameState:n,room:e}))},Ms=(t,e,n,r)=>{V(t)&&t.state.standingOn!==null&&Gn(t.state.standingOn)&&Vr({room:e,movingItem:t,touchedItem:t.state.standingOn});const o=[...Ls(t,e,n,r)];zs(t,e,n);let i=jr(t,o);(ce(t)||N("lift")(t)||N("firedDoughnut")(t))&&(i=R(i,...L(F(t.state.vels)).map(l=>P(l,r))));const s=Math.ceil(Ae(i)/Ds),a=P(i,1/s);for(let l=0;l<s;l++)Yn({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:qr})},Rs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,ne(t,e);const u=Jt(e)[c],d=pe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Je(u)};return}if(t.entryState.headOverHeels!==void 0){ne(t,e);const c=pe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Jt(e);if(ne(t,c),ne(t,u),Mt(c,u)){const d=Zn({head:c,heels:u});ne(t,d,"heels");const h=pe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:Je(d)};return}else{const d=pe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},pe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=kt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Rt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ai(o,t);return o},ne=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},Us=(t,e)=>{const n=Kn(t,Qn(e.type));if(e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];ne(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Zn({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});ne(t,a);const l=pe({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Rt({room:r,item:e});return}else{const s=pe({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Es=(t,e)=>{e.type==="headOverHeels"?Rs(t,e):Us(t,e),ze(t)===void 0&&C.dispatch(Bo())},$s=t=>{for(const e of F(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){Zt(n);continue}if(!Ht(n,e)){Zt(n);const r=Nr(n,F(t.items));r!==void 0&&jn({above:n,below:r})}}},Ns=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Vs=(t,e,n)=>{for(const r of F(t.items))!ce(r)||t.roomTime===r.state.actedOnAt||Ao(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=Do(r.state.position),n.add(r))},Hs=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Xs=tt,Gs=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=wn(t,e),i=be(t)?.items??Xs;n=new Set(L(Bt(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return wn(t,e*t.gameSpeed)},wn=(t,e)=>{const{inputStateTracker:n}=t,r=be(t);if(r===void 0)return Vn;const o=Object.fromEntries(L(Lt(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&ft(t),n.currentActionPress("swop.head")==="tap"&&ft(t,"head"),n.currentActionPress("swop.heels")==="tap"&&ft(t,"heels");for(const a of F(r.items))Ns(a,r)&&(Jn({room:r,item:a}),V(a)&&Es(t,a));const i=Object.values(r.items).sort(Hs);for(const a of i){const l=ze(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&Ms(a,r,t,e)}$s(r);const s=new Set(L(F(r.items)).filter(a=>o[a.id]===void 0||!ye(a.state.position,o[a.id])));return Ss(s,r,o),Vs(r,o,s),js(t,r,e),s},js=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=ze(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Kn(t,Qn(r.type));i!==void 0&&(i.state.gameTime+=n)}}},Tn=(t,e)=>{const n=w(t),r=w(R(t,{x:e.x,z:e.z})),o=w(R(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},gt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,qs=(t,e,n,r)=>{const o=Tn(t,e),i=Tn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=gt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,h=o.bottomCentre.y-o.bottomCentre.x/2,p=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=gt(d,h,p,m),B=o.topLeft.y+o.topLeft.x/2,A=o.bottomCentre.y+o.bottomCentre.x/2,U=i.topLeft.y+i.topLeft.x/2,O=i.bottomCentre.y+i.bottomCentre.x/2,I=gt(B,A,U,O);return u&&v&&I},Ws=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!qs(n,r,o,i))return 0;for(const s of Lo){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Cn(e)-Cn(t)},Cn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class je extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const Ys=t=>{const e=Js(t);let n=e.length,r=n;const o=new Array(n),i={},s=Zs(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new je([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const p=h[--c];try{a(p,s.get(p),u)}catch(m){throw m instanceof je?m.hasClosedCycle?m:new je([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function Js(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Zs(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Sn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ve=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Ks=(t,e=new Set(F(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Ve(n,o,s);for(const o of e)if(o.renders)for(const i of F(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Ws(o,i);if(Sn(r,o,i),s===0){Ve(n,o.id,i.id),Ve(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;Sn(n,a,l),Ve(n,l,a)}return n},Yr=(t,e,n=3)=>{try{return{order:Ys(t),impossible:!1}}catch(r){if(r instanceof je){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:Yr(t,e,n-1).order,impossible:!0}}else throw r}},Qs=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,ea=(t,e,n)=>{const o=oe.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&oe.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},He=t=>D(({item:e})=>li(e)?f({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):f(t)),D=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i,gameState:s})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,gameState:s,previousRendering:null}),renderProps:tt}:"no-update";function*ta({config:{direction:t,inHiddenWall:e,height:n}},r){const o=nt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=f({textureId:`generic.door.floatingThreshold.${o}`,...Ge(a,{y:-12*n})});l.filters=At(r,o==="x"?"towards":"right",!0),yield l}}else{yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...Ge(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...Ge(a,{y:-l*z.h})})}}yield*s(T({...K,[o]:1})),yield*s(K),e||(yield f({pivot:{x:16,y:z.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...T({...K,[o]:1})}))}const Jr=(t,e)=>{const n=nt(t),r=Le(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):K},na=D(({item:t,room:e})=>Ze(ta(t,e),new g({filters:Z(e),...Jr(t.config.direction,t.aabb)}))),ra=D(({item:{config:{direction:t,part:e},aabb:n},room:r})=>{const o=nt(t);return f({textureId:ea(r,o,e),filter:Z(r),...Jr(t,n)})}),bt={animationId:"bubbles.cold"},ue=({top:t,bottom:e="homingBot",filter:n})=>{const r=new g({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},oa=({top:t,bottom:e})=>{const n=new g;return n.addChild(e),t.y=-12,n.addChild(t),n},ia=`#version 300 es

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
`;class kn extends q{constructor(e){const n=H.from({vertex:it,fragment:ia,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const vt=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(Ro(i))return{textureId:i}}const o=`${t}.idle.${n}`;return Uo(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},On=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+ci>t,sa=t=>{if(!_e(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Kt<Kt*.15},In={head:y.metallicBlue,heels:y.pink},_n=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Pn=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?Ke:t.filters},yt=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?_n(o,new me(In[t],C.getState().upscale.gameEngineUpscale)):!e&&i&&Pn(o,me);const s=r?.flashing??!1;n&&!s?_n(o,new kn(In[t])):!n&&s&&Pn(o,kn)},xt=({item:t,currentlyRenderedProps:e,previousRendering:n,gameState:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=t,l=zo(s),c=t.type==="headOverHeels"?On(t.state.head,"headOverHeels","headOverHeels"):On(t.state,t.type,r.currentCharacterName),u=sa(t),d=Ae(s),h=a?.phase??null,p={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c},m=e===void 0||e.action!==i||e.facingXy8!==l||e.teleportingPhase!==h,v=m?o==="headOverHeels"?oa({top:f(vt({name:"head",...p})),bottom:f(vt({name:"heels",...p}))}):f(vt({name:o,...p})):n;return o==="headOverHeels"?(yt("head",p,m?void 0:e,v.getChildAt(1)),yt("heels",p,m?void 0:e,v.getChildAt(0))):yt(o,p,m?void 0:e,v),i==="moving"&&n instanceof Be&&(n.animationSpeed=d*Mo),{container:v,renderProps:p}},aa=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new g({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),o=Ze(L(Ye(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>f({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new g({label:"floorOverdraws"})),i=Ze(L(Ye(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?f({textureId:"floorOverdraw.behindDoor",label:s,...T(Ge(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):f({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[Le(Fe(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new g({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},la=t=>[...L(F(t.items)).filter(e=>e.type==="wall").filter(e=>Fe(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],ca=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},ua=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new j().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),da=D(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=ot(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:h},roomJson:p}=e,m=new g({label:`floor(${e.id})`});if(d!=="none"){const U=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,O=new g;for(let M=-1;M<=o+2;M++)for(let J=M%2-1;J<=i+2;J+=2)O.addChild(ui({x:M+(s.right?-.5:0),y:J+(s.towards?-.5:0)},f({textureId:U})));O.addChild(aa(p,{x:n,y:r}));const I=new j().poly([K,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});O.addChild(I),O.filters=Z(e),O.mask=I,m.addChild(O)}const v=la(p),B=new j().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(B);const A=ca(v);if(A!==void 0){const U=ua({extraWallRanges:A,blockXMin:n,blockYMin:r});m.addChild(U)}return m.mask=B,m.y=-t.aabb.z,m.cacheAsTexture(!0),m}),fa=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=T({x:-t,y:-e}),i={towards:new g({label:"towards",...o}),right:new g({label:"right",...o})};return L(Ye(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},p=f({label:s,textureId:`floorEdge.${l}`,...T(h),times:a.type==="wall"?a.config.times:{[Le(Fe(l))]:2}});i[l].addChild(p),l==="right"&&c.y===0&&e<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(R(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(R(h,{x:-.5}))}))}),i},ha=D(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=ot(t.roomJson),c=i-r,u=s-o,d=new g({label:"floorEdge"}),h=new j({label:"overDrawToHideFallenItems"}).poly([T({x:c,y:0}),T({x:0,y:0}),T({x:0,y:u}),{...T({x:0,y:u}),y:999},{...T({x:c,y:0}),y:999}],!0).fill(0);h.y=8,d.addChild(h);const{towards:p,right:m}=fa({blockXMin:r,blockYMin:o},t.roomJson),v=!e&&n.colourise;p.filters=At(t,"towards",v),m.filters=At(t,"right",v),d.addChild(p),d.addChild(m);const B=new j({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(B),d.mask=B,d.cacheAsTexture(!0),d}),pa=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,wt=y.moss,Fn=()=>D(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),ma={head:xt,heels:xt,headOverHeels:xt,doorFrame:ra,doorLegs:na,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:D(({item:{id:t,config:{direction:e,tiles:n}},room:r})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=Le(Fe(e)),i=new g({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=f({textureId:Qs(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ie.w,y:Ie.h+1}:{x:0,y:Ie.h+1},filter:Z(r)}),l=T({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:D(({item:{config:{axis:t,times:e}}})=>f({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({item:{config:{style:t,times:e}},room:n})=>f({textureId:t,filter:t==="volcano"?Z(n):void 0,times:e})),slidingDeadly:Fn(),slidingBlock:Fn(),block({item:{config:{style:t,times:e},state:{disappear:n}},room:r,currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:f({textureId:pa(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?Z(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?Eo(C.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t,times:e},state:{stoodOnBy:n}},currentlyRenderedProps:r}){const o=n.size>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new g,a=Fe(t);return s.addChild(f(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:D(()=>{const t=new g,e={x:Oe.w/2,y:Oe.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({textureId:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=L(t).find(V)!==void 0;return e===void 0||n!==e.flashing?{container:n?new g({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:D(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:Z(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:D(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=Ct(t);return e===void 0||n!==e.facingXy4?{container:ue({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?Vi:o?void 0:Ni(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Ct(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ue({top:{textureId:`${t.which}.${a}`,filter:s||Z(n)},bottom:bt}):f({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ue({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ue({top:bt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ue({top:"ball",bottom:bt,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:He("joystick"),movableBlock:D(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new me(wt,C.getState().upscale.gameEngineUpscale):void 0;return{container:f({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new me(wt,C.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new me(wt,C.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?ue({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):f({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:He("hushPuppy"),bubbles:D(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:He({animationId:"bubbles.doughnut"}),ball:He("ball"),floor:da,floorEdge:ha},ga=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class ba{constructor(e,n,r){this.gameState=r,this.#e=e,this.#o=n,this.#n=new g({label:`ItemAppearanceRenderer ${e.id}`}),ga(e,this.#n,r),this.#a=ma[e.type]}#e;#o;#r=void 0;#n;#a;destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#o,currentlyRenderedProps:this.#r,displaySettings:e.displaySettings,previousRendering:this.#n.children.at(0)??null,onHold:e.onHold,gameState:this.gameState});n!=="no-update"&&(this.#r=n.renderProps,this.#n.children.at(0)!==n.container&&(this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container)))}get container(){return this.#n}}const Bn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},An=(t,e)=>{const n=new j;return Bn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Bn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},va={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class ya{#e;constructor(e){const n=va[e.type]??"rgba(255,255,255)";if(this.#e=new g({label:`ItemBoundingBoxRenderer ${e.id}`}),N("portal")(e)){const o=w(e.config.relativePoint);this.#e.addChild(new j().circle(o.x,o.y,5).stroke(n)),this.#e.addChild(new j().circle(o.x,o.y,2).fill(n))}this.#e.addChild(new j({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(An(e.aabb,n)),e.renderAabb&&this.#e.addChild(An(e.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#e.addChild(r=new Fi({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class xa{#e;#o;#r;constructor(e,n){this.#o=new g({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#r=n,this.#e=e,this.#n()}#n(){const e=w(this.#e.state.position);this.#o.x=e.x,this.#o.y=e.y}tick(e){this.#r?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#o.destroy({children:!0}),this.#r?.destroy()}get container(){return this.#o}}const wa=(t,e)=>{const n=e.getLocalBounds(),r=$t.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new ge({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Dn=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=f({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof ge?o:wa(t,o)};class Ta{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=C.getState();o||(this.#e.filters=new Ii({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const{times:s}=e.config,a=Dn(r,i,s);e.shadowMask.relativeTo==="top"&&(a.y-=e.aabb.z),s&&(a.y-=((s.z??1)-1)*z.h),this.#e.addChild(a),o||(this.#e.mask=a)}this.#e.addChild(this.#o)}#e=new g({label:"ItemShadowRenderer"});#o=new g({label:"shadows"});#r={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=L(F(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:di}},a=Object.groupBy(i,l=>{const c=this.#r[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":Mt(s,l)?c?"update":"create":"noShadow"});for(const l of Bt(a.keepUnchanged,a.update))this.#r[l.id].renderedOnProgression=n;if(a.create)for(const l of a.create){const{times:c}=l.config,u=Dn(this.pixiRenderer,l.shadowCastTexture,c);u.label=l.id,this.#o.addChild(u),this.#r[l.id]={sprite:u,renderedOnProgression:n}}for(const l of Bt(a.create,a.update)){const{sprite:c}=this.#r[l.id],u=w({...De(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of Ye(this.#r))u!==n&&(c.destroy(),delete this.#r[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const Ca=t=>t.shadowMask!==void 0,Sa=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=C.getState(),{userSettings:{displaySettings:{showBoundingBoxes:i,colourise:s}}}=o,a=Hn(o),l=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const u=new ba(t,e,n);c.push(u),l&&(u.container.alpha=.66),!a&&s&&Ca(t)&&c.push(new Ta(t,e,r))}return l&&c.push(new ya(t)),c.length===0?"not-needed":new xa(t,new ka(c))};class ka{#e;#o=new g({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#o.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#o}}const de=.33,Oa=16,Dt=Ie.h-Ie.w/2,Ia=ie.heels,_a=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=ot(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Oa-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,p=u.y+s-Dt<0;return(m,v,B)=>{if(m===void 0)return;const A=w(m.state.position),U=R(A,u),O={x:d&&U.x<n.x*de?Math.min(-a,n.x*de-A.x):h&&U.x>n.x*(1-de)?Math.max(n.x-l,n.x*(1-de)-A.x):u.x,y:p&&U.y<n.y*de?n.y*de-A.y:u.y};if(B)e.x=O.x,e.y=O.y;else{const I=Ia*v,M=De(e,O),J=$n(M);if(J>I){const ee={x:M.x/J,y:M.y/J};e.x-=ee.x*I,e.y-=ee.y*I}else e.x=O.x,e.y=O.y}}},Pa=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=ot(t);return new j().rect(e+r.x,o-Dt,n-e,r.y-o+Dt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Ln{#e=new g({label:"items"});#o=new g({label:"floorEdge"});#r=new g({children:[this.#e,this.#o]});#n=!1;#a=new Map;#i=new Map;#s;#c;#u;#t;#f;#l;#h;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=C.getState();this.#c=i,this.#u=s,this.#t=n,this.#f=e,this.#l=r,this.#h=o,this.#r.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&i.colourise,n.color),i.showBoundingBoxes!=="none"&&this.#r.addChild(Pa(n.roomJson)),this.#s=_a(n,this.#r,s.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?Ke:new W(Vt(n).main.original)}#d(e){for(const n of F(this.#t.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Sa({item:n,room:this.#t,gameState:this.#f,pixiRenderer:this.#h}),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#o:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#t.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#m(e){const{order:n}=Yr(Ks(this.#t.items,e.movedItems,this.#a),this.#t.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(F(this.#t.items))};this.#s(ze(this.#f),n.deltaMS,!this.#n),this.#d(n),(!this.#n||n.movedItems.size>0)&&this.#m(n),this.#n=!0}destroy(){this.#r.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#c}get upscale(){return this.#u}get everRendered(){return this.#n}get container(){return this.#r}get roomState(){return this.#t}get paused(){return this.#l}}var lt=`in vec2 aPosition;
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
`,ct=`struct GlobalFilterUniforms {
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
}`,Fa=`precision highp float;
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
`,Ba=`struct CRTUniforms {
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
}`,Aa=Object.defineProperty,Da=(t,e,n)=>e in t?Aa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,qe=(t,e,n)=>(Da(t,typeof e!="symbol"?e+"":e,n),n);const Zr=class Kr extends q{constructor(e){e={...Kr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ct,entryPoint:"mainVertex"},fragment:{source:Ba,entryPoint:"mainFragment"}}),r=H.from({vertex:lt,fragment:Fa,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),qe(this,"uniforms"),qe(this,"seed"),qe(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};qe(Zr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let La=Zr;var za=`
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
}`,Ma=`struct KawaseBlurUniforms {
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
}`,Ra=`
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
`,Ua=`struct KawaseBlurUniforms {
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
}`,Ea=Object.defineProperty,$a=(t,e,n)=>e in t?Ea(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,te=(t,e,n)=>($a(t,typeof e!="symbol"?e+"":e,n),n);const Qr=class eo extends q{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Pe("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...eo.DEFAULT_OPTIONS,...n};const r=se.from({vertex:{source:ct,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Ua:Ma,entryPoint:"mainFragment"}}),o=H.from({vertex:lt,fragment:n?.clamp?Ra:za,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),te(this,"uniforms"),te(this,"_pixelSize",{x:0,y:0}),te(this,"_clamp"),te(this,"_kernels",[]),te(this,"_blur"),te(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=he.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let p=0;p<h;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),he.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};te(Qr,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Na=Qr;var Va=`in vec2 vTextureCoord;
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
`,Ha=`struct AdvancedBloomUniforms {
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
`,Xa=`
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
`,Ga=`struct ExtractBrightnessUniforms {
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
`,ja=Object.defineProperty,qa=(t,e,n)=>e in t?ja(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,to=(t,e,n)=>(qa(t,typeof e!="symbol"?e+"":e,n),n);const no=class ro extends q{constructor(e){e={...ro.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ct,entryPoint:"mainVertex"},fragment:{source:Ga,entryPoint:"mainFragment"}}),r=H.from({vertex:lt,fragment:Xa,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),to(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};to(no,"DEFAULT_OPTIONS",{threshold:.5});let Wa=no;var Ya=Object.defineProperty,Ja=(t,e,n)=>e in t?Ya(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fe=(t,e,n)=>(Ja(t,typeof e!="symbol"?e+"":e,n),n);const oo=class io extends q{constructor(e){e={...io.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ct,entryPoint:"mainVertex"},fragment:{source:Ha,entryPoint:"mainFragment"}}),r=H.from({vertex:lt,fragment:Va,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:re.WHITE}}),fe(this,"uniforms"),fe(this,"bloomScale",1),fe(this,"brightness",1),fe(this,"_extractFilter"),fe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Wa({threshold:e.threshold}),this._blurFilter=new Na({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=he.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=he.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),he.returnTexture(s),he.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};fe(oo,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Za=oo;const zn=({crtFilter:t},e)=>[t?new La({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Za({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Ka{constructor(e,n){this.app=e,this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=C.getState();e.stage.addChild(this.#a),e.stage.scale=r;const o=be(n);if(o===void 0)throw new Error("main loop with no starting room");this.#n=new Ln({gameState:n,roomState:o,paused:!1,pixiRenderer:e.renderer}),this.#a.addChild(this.#n.container),this.#r=new Wi(n),e.stage.addChild(this.#r.container),this.#c()}#e;#o;#r;#n;#a=new g({label:"MainLoop/world"});#i;#s;#c(){const{userSettings:{displaySettings:e}}=C.getState();this.#e=zn(e,!0),this.#o=zn(e,!1)}tick=({deltaMS:e})=>{const n=C.getState(),r=Hn(n),{userSettings:{displaySettings:o},upscale:i}=C.getState();this.#r.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=r?Vn:Gs(this.#s,e),a=be(this.#s);(this.#n?.roomState!==a||this.#n?.upscale!==i||this.#n?.displaySettings!==o||this.#n?.paused!==r)&&(this.#n?.destroy(),a?(this.#n=new Ln({gameState:this.#s,roomState:a,paused:r,pixiRenderer:this.#i.renderer}),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",a.id)):this.#n=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#n?.tick({progression:this.#s.progression,movedItems:s,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#o};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n?.destroy(),this.#r.destroy(),this.#i.ticker.remove(this.tick)}}Qe.add(tr,nr,rr,or,ir,sr,ar,lr,cr,ur,dr,hr,fr,pr,mr,gr,br,vr,yr,xr,wr);$o.defaultOptions.scaleMode="nearest";const Mn=async(t,e)=>{const n=new Pr;await n.init({background:"#000000",sharedTicker:!0});const r=Mi({campaign:t,inputStateTracker:e});C.dispatch(Gt(r.characterRooms.head.id)),C.dispatch(Gt(r.characterRooms.heels.id));const o=new Ka(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=ze(r);s!==void 0&&zt({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return be(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},ol=Object.freeze(Object.defineProperty({__proto__:null,default:Mn,gameMain:Mn},Symbol.toStringTag,{value:"Module"}));export{kr as A,Tr as C,q as F,$t as R,yi as S,Or as V,Si as a,ol as g,vi as u};
