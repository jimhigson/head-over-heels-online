const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-7jGilcDv.js","assets/App-D5Pu3oVn.js","assets/index-DiefGcoC.js","assets/index-PCs61_DU.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-B9i3iYgg.js","assets/Graphics-iw2kcZJE.js","assets/swopCharacters-CS6QLA18.js","assets/WebGLRenderer--aVru3Tb.js"])))=>i.map(i=>d[i]);
import{A as po,a8 as se,a9 as X,n as Vn,F as oe,E as x,f as rt,e as mo,C as b,d as Ae,v as Ke,ao as v,D as Ot,ag as be,T as Ie,U as go,V as bo,aH as vo,aI as yo,aJ as xo,m as wo,aK as To,H as Co,aL as So,aM as ee,aN as Hn,a2 as Xn,aO as ko,a0 as _,aP as Ee,aQ as We,Y as C,aR as _e,aS as Oo,aT as Io,L as P,aU as ze,W as B,a4 as xe,I as jn,aV as ae,aW as ot,$ as K,_ as z,aX as It,aY as _o,Q as _t,aZ as Po,a_ as Le,a$ as Gn,p as Me,Z as it,b0 as Wt,b1 as Bo,b2 as Ao,b3 as Fo,N as U,b4 as Do,b5 as zo,a3 as qn,X as st,b6 as Ut,b7 as Lo,b8 as Mo,O as Wn,b9 as Ro,ba as Uo,bb as Eo,bc as Ye,bd as $o,be as No,bf as Vo,bg as Ho,bh as Qe,a as Fe,bi as Xo,bj as Pe,bk as Yn,ae as he,bl as jo,a5 as Yt,bm as Go}from"./App-D5Pu3oVn.js";import{l as Pt,h as et,j as Jt,g as L,p as T,k as pe,m as ht,s as ve,n as le,i as V,q as Bt,t as qo,r as Wo,u as Yo,v as Jo,w as H,x as Zo,y as $e,z as Ko,A as ie,B as Qo,C as ei,D as ti,E as we,F as Zt,G as At,c as Et,H as ni,I as ri,J as Jn,K as at,L as $t,M as oi,N as Kt,O as pt,P as Zn,Q as ii,a as ce,R as Kn,S as Qn,T as Qt,U as er,f as si,V as tr,W as nr,X as ai,Y as Nt,Z as li,_ as ci,$ as ui,a0 as di,a1 as fi,b as Re,a2 as en,a3 as rr,e as or,o as ir,a4 as hi,a5 as tn,a6 as mt,a7 as w,a8 as pi,a9 as mi,aa as nn,ab as lt,ac as gi,ad as bi}from"./swopCharacters-CS6QLA18.js";import{S as vi,G as q}from"./Graphics-iw2kcZJE.js";import{_ as rn,g as yi}from"./index-DiefGcoC.js";const sr=class Ft extends po{constructor(e){e={...Ft.defaultOptions,...e},super(e),this.enabled=!0,this._state=vi.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=se.from(n)),r&&(s=X.from(r)),new Ft({gpuProgram:i,glProgram:s,...o})}};sr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let W=sr;var xi=`
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
}`;class S extends W{constructor(e){const n=e.gpu,r=on({source:Ti,...n}),o=se.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=on({source:xi,...i}),a=X.from({vertex:wi,fragment:s}),l=new Vn({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:oe.EMPTY}})}}function on(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Vt=`
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
    `,Ht=`
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
	`;class ar extends S{constructor(){super({gl:{functions:`
                ${Vt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ht}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ar.extension={name:"color",type:x.BlendMode};class lr extends S{constructor(){super({gl:{functions:`
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
            `}})}}lr.extension={name:"color-burn",type:x.BlendMode};class cr extends S{constructor(){super({gl:{functions:`
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
                `}})}}cr.extension={name:"color-dodge",type:x.BlendMode};class ur extends S{constructor(){super({gl:{functions:`
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
                `}})}}ur.extension={name:"darken",type:x.BlendMode};class dr extends S{constructor(){super({gl:{functions:`
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
            `}})}}dr.extension={name:"difference",type:x.BlendMode};class fr extends S{constructor(){super({gl:{functions:`
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
            `}})}}fr.extension={name:"divide",type:x.BlendMode};class hr extends S{constructor(){super({gl:{functions:`
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
            `}})}}hr.extension={name:"exclusion",type:x.BlendMode};class pr extends S{constructor(){super({gl:{functions:`
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
                `}})}}pr.extension={name:"hard-light",type:x.BlendMode};class mr extends S{constructor(){super({gl:{functions:`
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
            `}})}}mr.extension={name:"hard-mix",type:x.BlendMode};class gr extends S{constructor(){super({gl:{functions:`
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
            `}})}}gr.extension={name:"lighten",type:x.BlendMode};class br extends S{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"linear-burn",type:x.BlendMode};class vr extends S{constructor(){super({gl:{functions:`
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
            `}})}}vr.extension={name:"linear-dodge",type:x.BlendMode};class yr extends S{constructor(){super({gl:{functions:`
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
            `}})}}yr.extension={name:"linear-light",type:x.BlendMode};class xr extends S{constructor(){super({gl:{functions:`
                ${Vt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ht}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}xr.extension={name:"luminosity",type:x.BlendMode};class wr extends S{constructor(){super({gl:{functions:`
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
            `}})}}wr.extension={name:"negation",type:x.BlendMode};class Tr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Tr.extension={name:"overlay",type:x.BlendMode};class Cr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Cr.extension={name:"pin-light",type:x.BlendMode};class Sr extends S{constructor(){super({gl:{functions:`
                ${Vt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Ht}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Sr.extension={name:"saturation",type:x.BlendMode};class kr extends S{constructor(){super({gl:{functions:`
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
                `}})}}kr.extension={name:"soft-light",type:x.BlendMode};class Or extends S{constructor(){super({gl:{functions:`
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
                `}})}}Or.extension={name:"subtract",type:x.BlendMode};class Ir extends S{constructor(){super({gl:{functions:`
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
                `}})}}Ir.extension={name:"vivid-light",type:x.BlendMode};const Dt=[];rt.handleByNamedList(x.Environment,Dt);async function Ci(t){if(!t)for(let e=0;e<Dt.length;e++){const n=Dt[e];if(n.value.test()){await n.value.load();return}}}let Te;function Si(){if(typeof Te=="boolean")return Te;try{Te=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Te=!1}return Te}var _r=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(_r||{});class ki{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Oi=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Pr=class Br extends mo{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Oi,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ci(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Br.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(Ae(Ke,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:v.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=_r.ALL);const{clear:r,clearColor:o,target:i}=e;v.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ki(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Si())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Pr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Ar=Pr,Ne;function Ii(t){return Ne!==void 0||(Ne=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Ar.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Ot.get().getWebGLRenderingContext())return!1;let r=Ot.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Ne}let Ve;async function _i(t={}){return Ve!==void 0||(Ve=await(async()=>{const e=Ot.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Ve}const sn=["webgl","webgpu","canvas"];async function Pi(t){let e=[];t.preference?(e.push(t.preference),sn.forEach(i=>{i!==t.preference&&e.push(i)})):e=sn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await _i()){const{WebGPURenderer:a}=await rn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-7jGilcDv.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&Ii(t.failIfMajorPerformanceCaveat??Ar.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await rn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer--aVru3Tb.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Fr="8.8.1";class Dr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Fr)}static destroy(){}}Dr.extension=x.Application;class Bi{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Fr)}destroy(){this._renderer=null}}Bi.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const zr=class zt{constructor(...e){this.stage=new b,e[0]!==void 0&&Ae(Ke,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Pi(e),zt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ae(Ke,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=zt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};zr._plugins=[];let Lr=zr;rt.handleByList(x.Application,Lr._plugins);rt.add(Dr);var Ai=`in vec2 aPosition;
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
`,Fi=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,an=`struct GlobalFilterUniforms {
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
}`;const Mr=class Rr extends W{constructor(e){e={...Rr.defaultOptions,...e};const n=se.from({vertex:{source:an,entryPoint:"mainVertex"},fragment:{source:an,entryPoint:"mainFragment"}}),r=X.from({vertex:Ai,fragment:Fi,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Vn({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Mr.defaultOptions={alpha:1};let Di=Mr;class De extends be{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[p]=u;super({...h,texture:p instanceof oe?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ie.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ie.shared.add(this.update,this,go.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(oe.from(e[r]));return new De(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(oe.from(e[r]));return new De(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof oe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ie.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ie.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class zi extends bo{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new vo({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Li(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ae(Ke,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Mi extends zi{constructor(...e){const n=Li(e,"Text");super(n,yo),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=xo.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class Xt extends oe{static create(e){return new Xt({source:new wo(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}var He={},ln;function Ri(){if(ln)return He;ln=1;var t=To(),e=t.mark(i),n=Co(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,p=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=p.length,l=new Array(a),c=0;c<a;c++)l[c]=p[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return h=d[u],y.delegateYield(o(h),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}He.__concat=i;var s=r(i);return He.concat=s,He}var gt,cn;function Ui(){return cn||(cn=1,gt=Ri().concat),gt}var Ei=Ui();const Lt=yi(Ei);function $i(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const Ni=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},Vi=({campaign:t,inputStateTracker:e})=>{const n=Ni(t),r=So(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&Pt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&Pt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:et(o.items.head),heels:i===void 0?void 0:et(i.items.heels)},inputStateTracker:e,campaign:t,events:$i(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},g={pureBlack:new v("#000000"),lightBlack:new v("#212C20"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},ct=`in vec2 aPosition;
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
`,Hi=`#version 300 es

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
`;class ge extends W{constructor(e,n){const r=X.from({vertex:ct,fragment:Hi,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const Xi=`precision mediump float;
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
`,un=[g.pureBlack,g.lightBlack];class M extends W{uniforms;constructor(e="white"){const n=X.from({vertex:ct,fragment:Xi,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=un[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=un[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const $={original:new v("rgb(255, 255, 255)"),basic:new v("rgb(210, 210, 210)"),dimmed:new v("rgb(120, 120, 120)")},N={original:new v("rgb(255, 255, 0)"),basic:new v("hsl(50,65%,70%)"),dimmed:g.redShadow},j={original:new v("rgb(255, 0, 255)"),basic:g.pink,dimmed:new v("hsl(290,35%,38%)")},k={original:new v("rgb(0, 255, 255)"),basic:new v("hsl(183, 50%, 50%)"),dimmed:new v("hsl(183, 50%, 25%)")},G={original:new v("rgb(0, 255, 0)"),basic:g.moss,dimmed:new v("hsl(73,50%,25%)")},jt={white:{basic:{main:$,edges:{towards:k,right:N},hud:{lives:N,dimmed:j,icons:k}},dimmed:{main:$,edges:{towards:G,right:k},hud:{lives:N,dimmed:j,icons:k}}},yellow:{basic:{main:N,edges:{towards:G,right:$},hud:{lives:k,dimmed:j,icons:G}},dimmed:{main:N,edges:{towards:k,right:k},hud:{lives:k,dimmed:j,icons:G}}},magenta:{basic:{main:j,edges:{towards:G,right:k},hud:{lives:$,dimmed:k,icons:N}},dimmed:{main:j,edges:{towards:G,right:k},hud:{lives:$,dimmed:k,icons:N}}},cyan:{basic:{main:k,edges:{towards:j,right:$},hud:{lives:$,dimmed:G,icons:N}},dimmed:{main:k,edges:{towards:j,right:$},hud:{lives:$,dimmed:G,icons:N}}},green:{basic:{main:G,edges:{towards:k,right:N},hud:{lives:$,dimmed:j,icons:k}},dimmed:{main:G,edges:{towards:k,right:N},hud:{lives:$,dimmed:j,icons:k}}}},Gt=t=>jt[t.hue][t.shade],Ur=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Jt>n?100-Math.ceil((n-e)/(Jt/100)):0},Er=t=>{const e=100*L.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/L.w):0};function tt(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}const dn={x:.5,y:1},fn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(fn(t)?c=ji(t):c=new be(ee.textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:p}=u;p>=1;p--)for(let m=1;m<=u.z;m++){const y=f({...t,times:void 0,label:`(${h},${p},${m})`}),A=T({x:h-1,y:p-1,z:m-1});y.x+=A.x,y.y+=+A.y,d.addChild(y)}return d}if(e===void 0&&r===void 0)if(fn(t))c.anchor=dn;else{const u=ee.data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=dn}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function ji({animationId:t,reverse:e,playOnce:n}){const o=ee.animations[t].map(s=>({texture:s,time:Hn}));e&&o.reverse();const i=new De(o);return i.animationSpeed=Xn.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const Gi=`in vec2 vTextureCoord;
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
`;class Ue extends W{constructor(e){const n=Object.keys(e).length,r=X.from({vertex:ct,fragment:Gi.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const $r=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Nr=t=>$r(jt[t.color.hue][t.color.shade].main),qi=t=>new Ue({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...Nr(t)}),Wi=new Ue({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Yi=t=>{const[e,n,r]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:r/2})},Xe=t=>new Ue({replaceLight:t,replaceDark:Yi(t)}),Mt=(t,e,n)=>n?new Ue($r(jt[t.color.hue][t.color.shade].edges[e])):new M(Gt(t.color).edges[e].original),Z=t=>new Ue(Nr(t)),nt=ko,bt=14,Ji=Xn.frames.button.frame,hn={colourised:{red:Xe(g.midRed),blue:Xe(g.metallicBlue),yellow:Xe(g.highlightBeige),green:Xe(g.moss)},zx:{red:new M(Ee.zxRed),blue:new M(Ee.zxBlue),yellow:new M(Ee.zxYellow),green:new M(Ee.zxGreen)}};class Ce{constructor(e,n,r,o="button",i="button.pressed"){this.actions=e,this.inputStateTracker=n,this.colour=r,this.textureId=o,this.pressedTextureId=i;const s=this.container=f(o),{hudInputState:a}=n;s.eventMode="static",s.on("pointerdown",()=>{for(const l of e)a[l]=!0}),s.on("pointerup",()=>{for(const l of e)a[l]=!1}),s.on("pointerleave",()=>{for(const l of e)a[l]=!1})}container;#e(e){this.colour&&(e?this.container.filters=hn.colourised[this.colour]:this.container.filters=hn.zx[this.colour])}#n(){const e=this.actions.every(n=>this.inputStateTracker.currentActionPress(n)!=="released");this.container.texture=ee.textures[e?this.pressedTextureId:this.textureId]}update(e){this.#e(e),this.#n()}}class Zi{constructor(e){this.gameState=e;const n=this.#n.buttons={menu_openOrExit:new Ce(["menu_openOrExit"],e.inputStateTracker,void 0,"hud.char.Menu"),jump:new Ce(["jump"],e.inputStateTracker,"green"),carry:new Ce(["carry"],e.inputStateTracker,"blue"),fire:new Ce(["fire"],e.inputStateTracker,"red"),carryAndJump:new Ce(["carry","jump"],e.inputStateTracker,"yellow")},{mainButtonNest:r}=this.#n;r.addChild(n.jump.container),r.addChild(n.carry.container),r.addChild(n.fire.container),r.addChild(n.carryAndJump.container),n.jump.container.y=bt,n.carry.container.x=-14*2,n.carryAndJump.container.y=-14,n.fire.container.x=bt*2,this.#e.addChild(r),this.#e.addChild(n.menu_openOrExit.container),this.#o()}#e=new b({label:"OnScreenControls"});#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{}};#o(){}#r(e){this.#n.mainButtonNest.x=e.x-Ji.w-bt,this.#n.mainButtonNest.y=e.y-20}#a(){const{currentCharacterName:e}=this.gameState,n=pe(this.gameState,"heels"),r=pe(this.gameState,"head"),o=(this.#i(e,"heels")&&n?.hasBag)??!1;this.#n.buttons.carryAndJump.container.visible=this.#n.buttons.carry.container.visible=o;const i=(this.#i(e,"head")&&r?.hasHooter)??!1;this.#n.buttons.fire.container.visible=i}#i(e,n){return e===n||e==="headOverHeels"}tick({screenSize:e,colourise:n}){this.#r(e);for(const r of _(this.#n.buttons))r.update(n);this.#a()}get container(){return this.#e}destroy(){this.#e.destroy()}}const Ki=250,Qi=24,es=56,ts=80,pn=112,Se=t=>t==="heels"?1:-1;function*ns(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;Io(o),yield f({textureId:o,x:(r+.5-n/2)*We.w})}}function ke(t,e){t.removeChildren(),tt(ns(e),t)}class rs{constructor(e,n){this.gameState=e,this.deviceType=n;for(const r of ht)this.#e.addChild(this.#t[r].livesText),this.#e.addChild(this.#t[r].sprite),this.#e.addChild(this.#t[r].shield.container),this.#e.addChild(this.#t[r].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[this.#a],this.#t.fps.y=We.h,this.#h(),n!=="desktop"&&(this.#i=new Zi(e),this.#e.addChild(this.#i.container))}#e=new b({label:"HudRenderer"});#n=new M;#o=new M;#r=new M;#a=new M(g.moss);#i=void 0;#s=new ge(g.pureBlack,C.getState().upscale.gameEngineUpscale);#c=new M;#f=[this.#s,this.#r];#l={original:[this.#s,this.#c],colourised:{head:[this.#s,new M(g.metallicBlue)],heels:[this.#s,new M(g.pink)]}};#t={head:{sprite:this.#p("head"),livesText:this.#d({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#u({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#u({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#p("heels"),livesText:this.#d({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#u({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#d({label:"fps",outline:!0})};#h(){const{inputStateTracker:{hudInputState:e}}=this.gameState;for(const n of ht){const{sprite:r}=this.#t[n];r.eventMode="static",r.on("pointerdown",()=>{e[`swop.${n}`]=!0}),r.on("pointerup",()=>{e[`swop.${n}`]=!1}),r.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#u({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new be({texture:ee.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#o,y:n?0:8});s.addChild(a);const l=this.#d({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=We.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#s),{text:l,icon:a,container:s}}#p(e){const n=new be(ee.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#d({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?this.#f:this.#r,scale:{x:1,y:e?2:1}})}#v(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Se("head")*pn,this.#t.head.doughnuts.container.y=e.y-_e.h-8,this.#t.heels.carrying.container.y=e.y-_e.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Se("heels")*pn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-We.w*2}#y(e){return f(e.type==="spring"?"spring.released":e.type==="sceneryPlayer"?e.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":e.config.style)}#m(e,n){return e?n?nt:this.#c:this.#n}#x(e,n){const r=pe(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,a=s.children.length>0;if(i===null&&a)for(const l of s.children)l.destroy();i!==null&&!a&&s.addChild(this.#y(i)),s.filters=this.#m(!0,n),this.#t.heels.bag.icon.filters=this.#m(o,n)}#w(e,n){const r=pe(e,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#m(o,n),this.#t.head.doughnuts.icon.filters=this.#m(i!==0,n),ke(this.#t.head.doughnuts.text,i)}#T(e,n,r){const o=pe(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+Se(r)*ts,ke(i,Ur(o)),s.y=n.y,ke(a,o===void 0?0:r==="head"?Er(o):o.bigJumps),l.y=n.y-24}#g(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#C(e,n,r,o){const i=this.#g(e,o),s=this.#t[o].sprite;i?s.filters=r?nt:this.#c:s.filters=this.#n,s.x=(n.x>>1)+Se(o)*es,s.y=n.y-_e.h}#S(e,n,r){const i=pe(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+Se(r)*Qi,s.y=n.y,ke(s,i??0)}#k(e,n){const r=ve(e);if(r===void 0)return;const o=Gt(r.color);this.#n.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#r.targetColor=o.hud.dimmed[n?"basic":"original"],this.#o.targetColor=o.hud.icons[n?"basic":"original"],this.#c.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#g(e,"head")?this.#l.colourised.head:this.#n:this.#l.original,this.#t.heels.livesText.filters=n?this.#g(e,"heels")?this.#l.colourised.heels:this.#n:this.#l.original}#b=Number.NEGATIVE_INFINITY;#O(){if(Oo(C.getState())){if(performance.now()>this.#b+Ki){const e=Ie.shared.FPS;ke(this.#t.fps,Math.round(e)),this.#a.targetColor=e>56?g.moss:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#b=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){const{gameState:n,screenSize:r,colourise:o}=e;this.#k(n,o);for(const i of ht)this.#S(n,r,i),this.#C(n,r,o,i),this.#T(n,r,i);this.#v(r),this.#w(n,o),this.#x(n,o),this.#O(),this.#i?.tick(e)}get container(){return this.#e}destroy(){this.#e.destroy()}}const mn={movementType:"vel",vels:{gravity:P}},os=(t,e,n)=>{if(!le(t))return mn;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=qo[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?V("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Bt*n,-a)}}}:mn:{movementType:"vel",vels:{gravity:{z:Math.max(o-Bt*n,-a)}}}},ye={movementType:"steady"},je=t=>{const n=t/Zo*Hn;return(t+.5*Bt*n**2)/n},is={head:je($e.head),headOnSpring:je($e.head+L.h),heels:je($e.heels),heelsOnSpring:je($e.heels+L.h)},ss=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return is[`${n}${e?"OnSpring":""}`]},as=t=>!(t===null||Yo(t)||Jo(t)&&t.config.gives==="scroll"||H(t)&&t.state.standingOn===null),Vr=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&as(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:ye;const i=Wo(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:ss(t,i)}},stateDelta:{action:"moving",jumped:!0}}},ls=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=ze(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return B(n,l)},gn={movementType:"vel",vels:{walking:P}},Hr=(t,e,n)=>{const r=cs(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=ze(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!xe(r.vels.walking,P)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},cs=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:h,gravity:p}}}=t,m=n===t.id,y=m?e.currentActionPress("jump"):"released",A=m?e.directionVector:P,F=a===null&&p.z<0,E=o==="head"&&Er(t.state)>0&&a!==null,O=o==="headOverHeels"?F?"head":"heels":E?"heels":o,I=s?l:A,R=ie[O];if(c!==null||i==="death")return gn;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:jn(h,B(h,Ko*r))}}:gn;if(y!=="released"){const te=ae(ot(I,K)?l:I),ho=V("spring")(a)?1:Qo;return{movementType:"vel",vels:{walking:B({...te,z:0},R*ho)},stateDelta:{facing:te}}}}if(ze(I)!==0)return F?{movementType:"vel",vels:{walking:B({...I,z:0},R)},stateDelta:{facing:I,action:"falling"}}:{movementType:"vel",vels:{walking:ls({vel:h,acc:ei[O],deltaMS:r,maxSpeed:R,unitD:I,minSpeed:0})},stateDelta:{facing:I,action:"moving"}};if(u>0&&u<1){const te=xe(d,l)?1:0;return{movementType:"position",posDelta:B(l,te-u),stateDelta:{action:F?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:P},stateDelta:{action:F?"falling":"idle"}}},bn=L.h,vn=.001,us=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=Zt**2/(2*we);if(n==="up"){if(e<=r)return Math.max(vn,Math.sqrt(2*we*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(vn,Math.sqrt(2*we*o))}else return Zt}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*we*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*we*Math.max(e,0))):-.036},ds={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function fs({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(z(o).some(h=>ti(h)&&h.config.style==="stepStool"))return ds;const l=t*bn,c=e*bn,u=us({currentAltitude:r-l,direction:n,totalDistance:c-l});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=l?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function hs(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&V("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:At}}}:ye;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return Et({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:At}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const yn={movementType:"vel",vels:{movingFloor:P}},ps=(t,e,n)=>{if(H(t)&&t.state.teleporting!==null)return yn;const{state:{standingOn:r}}=t;if(r===null||!V("conveyor")(r))return yn;const{config:{direction:o}}=r,s=V("heels")(t)&&t.state.action==="moving"&&It(t.state.facing)===_o(o)?ie.heels:ni;return{movementType:"vel",vels:{movingFloor:B(_t[o],s)}}},Be=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<ri},Xr=150,jr=t=>t[Math.floor(Math.random()*t.length)],Q=Object.freeze({movementType:"vel",vels:{walking:P}}),ut=t=>Jn(t)?ie[t.config.which]:ie[t.type],xn=L.w/2,ms=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ie.homingBot;if(!ot(e,K))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Le(l.state.position,t);if(Math.abs(c.y)<xn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<xn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Gr=(t,e)=>{const{items:{head:n,heels:r,headOverHeels:o}}=e;if(o!==void 0)return Be(o)?void 0:e.items.headOverHeels;const i=n===void 0||Be(n)||n.state.action==="death"?void 0:Wt(n.state.position,t),s=r===void 0||Be(r)||r.state.action==="death"?void 0:Wt(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},gs=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return Q;const l=Gr(o,e);if(l===void 0||s+Xr>e.roomTime)return ye;const c=Le(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>L.w/4?u:Me(u),h=ut(t),p={...P,[d]:c[d]>0?h:-h},m=ae(p),y=!ot(m,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:m,...y?{timeOfLastDirectionChange:e.roomTime}:it}}},wn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return Q;const a=Gr(i,e);if(a===void 0)return Q;const l=a.state.position,c=L.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return Q;const d=Le(a?.state.position,i),h=ut(t),p=(1+Math.sqrt(2))/2,m=h*p,y=B({...d,z:0},m/Gn(d)*(o?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:ae(y)}}},vt=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return Q;if(!(xe(i,P)||Math.random()<r/1e3))return ye;const l=jr(o);return{movementType:"vel",vels:{walking:B(_t[l],ut(t))},stateDelta:{facing:_t[l]}}},bs=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?Q:ot(i,K)?{movementType:"vel",vels:{walking:B(o,ut(t))}}:ye},vs=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=jr([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},yt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Xr))return;const c=at(i,l,e,n);if(c.x===0&&c.y===0)return;const u=vs(s,c,o);t.state.vels.walking=u,t.state.facing=ae(u),t.state.durationOfTouch=0},ys=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=P)},xs=(t,e,n,r)=>{if(!t.state.activated||Jn(t)&&t.state.busyLickingDoughnutsOffFace)return Q;switch(t.config.movement){case"patrol-randomly-diagonal":return vt(t,e,n,r,Fo);case"patrol-randomly-xy8":return vt(t,e,n,r,Ao);case"patrol-randomly-xy4":return vt(t,e,n,r,Bo);case"towards-tripped-on-axis-xy4":return ms(t,e);case"towards-on-shortest-axis-xy4":return gs(t,e);case"back-forth":case"clockwise":return bs(t);case"unmoving":case"free":return Q;case"towards-when-in-square-xy8":return wn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return wn(t,e,n,r,Po(C.getState()));default:throw t.config,new Error("this should be unreachable")}},ws=t=>{const{movingItem:e,touchedItem:n}=t;if(le(n,e))switch(e.config.movement){case"patrol-randomly-xy4":yt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":yt(t,"opposite");break;case"clockwise":yt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":ys(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Ts=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},Tn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>Ts(t,e,n,r),Cs=.001,qt=(t,e,n=.001)=>{if(!le(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:$t({state:{position:U(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+Cs},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},qr=(t,e)=>{const r=[...z(e).filter(i=>qt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=oi(s,i);return a<0||a===0&&Tn(t,s)>Tn(t,i)?s:i})};function Wr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Ur(n)>0||Be(e)||(e.state.action="death",e.state.expires=t+At)}const Yr=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=pt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=pt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=Kt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=pt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=Kt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":C.dispatch(zo(r.config.page));break;case"reincarnation":break;case"crown":{C.dispatch(Do(r.config.planet));break}default:r.config}},Ss=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;qn(i,r)<=0||e.state.action!=="death"&&Et({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},ks=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=st(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Os({movingItem:t}){t.state.autoWalk=!1}const Y=(t,...e)=>V(...e)(t.touchedItem),Oe=(t,...e)=>V(...e)(t.movingItem),Jr=t=>H(t.movingItem),Is=t=>H(t.touchedItem),_s=t=>Zn(t.touchedItem),Cn=t=>{switch(!0){case Y(t,"stopAutowalk"):Os(t);break;case _s(t):Wr(t);break;case Y(t,"portal"):Ss(t);break;case Y(t,"pickup"):Yr(t);break;case Y(t,"doorFrame"):ks(t);break}},Ps=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of Ut(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&C.dispatch(Lo(o.path))}},Bs=({movingItem:t,touchedItem:e})=>{if(!le(t))return;const{state:{position:n},aabb:r}=e,o=at(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=ae(o),s=B(i,-.05);return e.state.vels.sliding=s,!1},As=({movingItem:t,touchedItem:e})=>{if(!le(e))return;const n=t.state.vels.sliding;if(xe(n,P))return;const{state:{position:r},aabb:o}=t,i=at(e.state.position,e.aabb,r,o);return qn(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=P),!1},Fs=2*ii,Zr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Fs,positionDelta:n})},Ds=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...jn(r.state.position,o),z:0};if(!xe(s,P))for(const a of r.state.stoodOnBy)Zr(a,e,s)}},zs=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=at(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=ae(a);for(const c of o){const u=e.items[c],d=B(l,-.025*r);u.state.facing=d,Zr(u,e,d)}},Sn=t=>ce(t.movingItem)&&qt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Kr=(t,e)=>{let n=P;for(const r of e){if(r.movementType==="position"&&(n=U(n,r.posDelta)),r.movementType==="vel"&&(ce(t)||V("lift")(t)))for(const[i,s]of Ut(r.vels)){const a={...P,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},kn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&H(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Sn(t)){if(Sn(t)&&Jr(t)){Kn({above:t.movingItem,below:t.touchedItem});const n=[Vr(t.movingItem,t.gameState),Hr(t.movingItem,t.gameState,t.deltaMS)];Kr(t.movingItem,n)}Qn(t)}};function Ls(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Qr=t=>{Jr(t)&&Cn(t),Is(t)&&Cn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),Y(t,...Qt)&&Bs(t),Oe(t,...Qt)&&As(t),(Oe(t,"monster")&&Y(t,"firedDoughnut")||Oe(t,"firedDoughnut")&&Y(t,"monster"))&&Ls(t),(Oe(t,"monster")||Oe(t,"movableBlock"))&&ws(t),Y(t,"switch")&&Ps(t),Y(t,"joystick")&&zs(t),t.touchedItem.state.disappear&&kn(t),t.movingItem.state.disappear&&le(t.touchedItem,t.movingItem)&&kn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Ms=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=z(_(e.items)).filter(er),u=s===null?Us(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}Rs(e,i,u)}else{if(t.state.standingOn===null||!eo(t,_(e.items)))return;const d=si({gameState:n,room:e,itemType:s.type,config:s.config,position:l});tr({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:Qr}),i.carrying=null}},Rs=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,nr({room:t,item:n})},Us=(t,e)=>qr(t,z(_(e.items)).filter(er)),eo=(t,e)=>{const n={position:U(t.state.position,{z:L.h})},r=ai({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(le(o,t)){if(!ce(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!eo(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0};function*Es(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const $s=L.w*Math.sqrt(2)+1,Ns=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,h=500,p=ae(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+h<c){const m={type:"firedDoughnut",...li,config:it,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,B(p,$s),t.type==="headOverHeels"?{z:L.h}:P),vels:{fired:B(p,ie.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Nt({room:e,item:m}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},Vs=2;function*Hs(t,e,n,r){ce(t)&&(yield os(t,n,r),yield ps(t),yield*Es(t,e)),H(t)&&(yield Hr(t,n,r),t.id===n.currentCharacterName&&(yield hs(t,n,r),yield Vr(t,n),ci(t)&&Ms(t,e,n,r),ui(t)&&Ns(t,e,n))),di(t)&&(yield fs(t)),fi(t)&&(yield xs(t,e,n,r))}const Xs=(t,e,n,r)=>{!ce(t)||t.state.standingOn===null||(H(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&Yr({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||H(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&Qn({touchedItem:t.state.standingOn,gameState:n,room:e}))},js=(t,e,n,r)=>{H(t)&&t.state.standingOn!==null&&Zn(t.state.standingOn)&&Wr({room:e,movingItem:t,touchedItem:t.state.standingOn});const o=[...Hs(t,e,n,r)];Xs(t,e,n);let i=Kr(t,o);(ce(t)||V("lift")(t)||V("firedDoughnut")(t))&&(i=U(i,...z(_(t.state.vels)).map(l=>B(l,r))));const s=Math.ceil(ze(i)/Vs),a=B(i,1/s);for(let l=0;l<s;l++)tr({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:Qr})},Gs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,re(t,e);const u=en(e)[c],d=me({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:et(u)};return}if(t.entryState.headOverHeels!==void 0){re(t,e);const c=me({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=en(e);if(re(t,c),re(t,u),$t(c,u)){const d=rr({head:c,heels:u});re(t,d,"heels");const h=me({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:et(d)};return}else{const d=me({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},me=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Pt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Nt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&hi(o,t);return o},re=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},qs=(t,e)=>{const n=or(t,ir(e.type));if(e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];re(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=rr({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});re(t,a);const l=me({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Nt({room:r,item:e});return}else{const s=me({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Ws=(t,e)=>{e.type==="headOverHeels"?Gs(t,e):qs(t,e),Re(t)===void 0&&C.dispatch(Mo())},Ys=t=>{for(const e of _(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){tn(n);continue}if(!qt(n,e)){tn(n);const r=qr(n,_(t.items));r!==void 0&&Kn({above:n,below:r})}}},Js=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Zs=(t,e,n)=>{for(const r of _(t.items))!ce(r)||t.roomTime===r.state.actedOnAt||Ro(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=Uo(r.state.position),n.add(r))},Ks=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Qs=it,ea=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=On(t,e),i=ve(t)?.items??Qs;n=new Set(z(Lt(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return On(t,e*t.gameSpeed)},On=(t,e)=>{const{inputStateTracker:n}=t,r=ve(t);if(r===void 0)return Wn;const o=Object.fromEntries(z(Ut(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&mt(t),n.currentActionPress("swop.head")==="tap"&&mt(t,"head"),n.currentActionPress("swop.heels")==="tap"&&mt(t,"heels");for(const a of _(r.items))Js(a,r)&&(nr({room:r,item:a}),H(a)&&Ws(t,a));const i=Object.values(r.items).sort(Ks);for(const a of i){const l=Re(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&js(a,r,t,e)}Ys(r);const s=new Set(z(_(r.items)).filter(a=>o[a.id]===void 0||!xe(a.state.position,o[a.id])));return Ds(s,r,o),Zs(r,o,s),ta(t,r,e),s},ta=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Re(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=or(t,ir(r.type));i!==void 0&&(i.state.gameTime+=n)}}},In=(t,e)=>{const n=w(t),r=w(U(t,{x:e.x,z:e.z})),o=w(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},xt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,na=(t,e,n,r)=>{const o=In(t,e),i=In(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=xt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,h=o.bottomCentre.y-o.bottomCentre.x/2,p=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,y=xt(d,h,p,m),A=o.topLeft.y+o.topLeft.x/2,F=o.bottomCentre.y+o.bottomCentre.x/2,E=i.topLeft.y+i.topLeft.x/2,O=i.bottomCentre.y+i.bottomCentre.x/2,I=xt(A,F,E,O);return u&&y&&I},ra=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!na(n,r,o,i))return 0;for(const s of Eo){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return _n(e)-_n(t)},_n=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Je extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const oa=t=>{const e=ia(t);let n=e.length,r=n;const o=new Array(n),i={},s=sa(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Je([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const p=h[--c];try{a(p,s.get(p),u)}catch(m){throw m instanceof Je?m.hasClosedCycle?m:new Je([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function ia(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function sa(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Pn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ge=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},aa=(t,e=new Set(_(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Ge(n,o,s);for(const o of e)if(o.renders)for(const i of _(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=ra(o,i);if(Pn(r,o,i),s===0){Ge(n,o.id,i.id),Ge(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;Pn(n,a,l),Ge(n,l,a)}return n},to=(t,e,n=3)=>{try{return{order:oa(t),impossible:!1}}catch(r){if(r instanceof Je){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:to(t,e,n-1).order,impossible:!0}}else throw r}},la=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,ca=(t,e,n)=>{const o=ee.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ee.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},qe=t=>D(({item:e})=>pi(e)?f({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):f(t)),D=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i,gameState:s})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,gameState:s,previousRendering:null}),renderProps:it}:"no-update";function*ua({config:{direction:t,inHiddenWall:e,height:n}},r){const o=st(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=f({textureId:`generic.door.floatingThreshold.${o}`,...Ye(a,{y:-12*n})});l.filters=Mt(r,o==="x"?"towards":"right",!0),yield l}}else{yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...Ye(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...Ye(a,{y:-l*L.h})})}}yield*s(T({...K,[o]:1})),yield*s(K),e||(yield f({pivot:{x:16,y:L.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...T({...K,[o]:1})}))}const no=(t,e)=>{const n=st(t),r=Me(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):K},da=D(({item:t,room:e})=>tt(ua(t,e),new b({filters:Z(e),...no(t.config.direction,t.aabb)}))),fa=D(({item:{config:{direction:t,part:e},aabb:n},room:r})=>{const o=st(t);return f({textureId:ca(r,o,e),filter:Z(r),...no(t,n)})}),wt={animationId:"bubbles.cold"},ue=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},ha=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n},pa=`#version 300 es

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
`;class Bn extends W{constructor(e){const n=X.from({vertex:ct,fragment:pa,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const Tt=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(Vo(i))return{textureId:i}}const o=`${t}.idle.${n}`;return Ho(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},An=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+mi>t,ma=t=>{if(!Be(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%nn<nn*.15},Fn={head:g.metallicBlue,heels:g.pink},Dn=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},zn=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?nt:t.filters},Ct=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?Dn(o,new ge(Fn[t],C.getState().upscale.gameEngineUpscale)):!e&&i&&zn(o,ge);const s=r?.flashing??!1;n&&!s?Dn(o,new Bn(Fn[t])):!n&&s&&zn(o,Bn)},St=({item:t,currentlyRenderedProps:e,previousRendering:n,gameState:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=t,l=$o(s),c=t.type==="headOverHeels"?An(t.state.head,"headOverHeels","headOverHeels"):An(t.state,t.type,r.currentCharacterName),u=ma(t),d=ze(s),h=a?.phase??null,p={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c},m=e===void 0||e.action!==i||e.facingXy8!==l||e.teleportingPhase!==h,y=m?o==="headOverHeels"?ha({top:f(Tt({name:"head",...p})),bottom:f(Tt({name:"heels",...p}))}):f(Tt({name:o,...p})):n;return o==="headOverHeels"?(Ct("head",p,m?void 0:e,y.getChildAt(1)),Ct("heels",p,m?void 0:e,y.getChildAt(0))):Ct(o,p,m?void 0:e,y),i==="moving"&&n instanceof De&&(n.animationSpeed=d*No),{container:y,renderProps:p}},ga=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new b({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),o=tt(z(Qe(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>f({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=tt(z(Qe(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?f({textureId:"floorOverdraw.behindDoor",label:s,...T(Ye(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):f({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[Me(Fe(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},ba=t=>[...z(_(t.items)).filter(e=>e.type==="wall").filter(e=>Fe(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],va=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},ya=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new q().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),xa=D(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=lt(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:h},roomJson:p}=e,m=new b({label:`floor(${e.id})`});if(d!=="none"){const E=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,O=new b;for(let R=-1;R<=o+2;R++)for(let J=R%2-1;J<=i+2;J+=2)O.addChild(gi({x:R+(s.right?-.5:0),y:J+(s.towards?-.5:0)},f({textureId:E})));O.addChild(ga(p,{x:n,y:r}));const I=new q().poly([K,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});O.addChild(I),O.filters=Z(e),O.mask=I,m.addChild(O)}const y=ba(p),A=new q().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(A);const F=va(y);if(F!==void 0){const E=ya({extraWallRanges:F,blockXMin:n,blockYMin:r});m.addChild(E)}return m.mask=A,m.y=-t.aabb.z,m.cacheAsTexture(!0),m}),wa=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=T({x:-t,y:-e}),i={towards:new b({label:"towards",...o}),right:new b({label:"right",...o})};return z(Qe(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},p=f({label:s,textureId:`floorEdge.${l}`,...T(h),times:a.type==="wall"?a.config.times:{[Me(Fe(l))]:2}});i[l].addChild(p),l==="right"&&c.y===0&&e<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(h,{x:-.5}))}))}),i},Ta=D(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=lt(t.roomJson),c=i-r,u=s-o,d=new b({label:"floorEdge"}),h=new q({label:"overDrawToHideFallenItems"}).poly([T({x:c,y:0}),T({x:0,y:0}),T({x:0,y:u}),{...T({x:0,y:u}),y:999},{...T({x:c,y:0}),y:999}],!0).fill(0);h.y=8,d.addChild(h);const{towards:p,right:m}=wa({blockXMin:r,blockYMin:o},t.roomJson),y=!e&&n.colourise;p.filters=Mt(t,"towards",y),m.filters=Mt(t,"right",y),d.addChild(p),d.addChild(m);const A=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(A),d.mask=A,d.cacheAsTexture(!0),d}),Ca=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,kt=g.moss,Ln=()=>D(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),Sa={head:St,heels:St,headOverHeels:St,doorFrame:fa,doorLegs:da,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:D(({item:{id:t,config:{direction:e,tiles:n}},room:r})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=Me(Fe(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=f({textureId:la(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Pe.w,y:Pe.h+1}:{x:0,y:Pe.h+1},filter:Z(r)}),l=T({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:D(({item:{config:{axis:t,times:e}}})=>f({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({item:{config:{style:t,times:e}},room:n})=>f({textureId:t,filter:t==="volcano"?Z(n):void 0,times:e})),slidingDeadly:Ln(),slidingBlock:Ln(),block({item:{config:{style:t,times:e},state:{disappear:n}},room:r,currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:f({textureId:Ca(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?Z(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?Xo(C.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t,times:e},state:{stoodOnBy:n}},currentlyRenderedProps:r}){const o=n.size>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new b,a=Fe(t);return s.addChild(f(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:D(()=>{const t=new b,e={x:_e.w/2,y:_e.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({textureId:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=z(t).find(H)!==void 0;return e===void 0||n!==e.flashing?{container:n?new b({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:D(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:Z(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:D(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=It(t);return e===void 0||n!==e.facingXy4?{container:ue({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?Wi:o?void 0:qi(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=It(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ue({top:{textureId:`${t.which}.${a}`,filter:s||Z(n)},bottom:wt}):f({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ue({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ue({top:wt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ue({top:"ball",bottom:wt,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:qe("joystick"),movableBlock:D(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new ge(kt,C.getState().upscale.gameEngineUpscale):void 0;return{container:f({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new ge(kt,C.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new ge(kt,C.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?ue({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):f({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:qe("hushPuppy"),bubbles:D(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:qe({animationId:"bubbles.doughnut"}),ball:qe("ball"),floor:xa,floorEdge:Ta},ka=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class Oa{constructor(e,n,r){this.gameState=r,this.#e=e,this.#n=n,this.#r=new b({label:`ItemAppearanceRenderer ${e.id}`}),ka(e,this.#r,r),this.#a=Sa[e.type]}#e;#n;#o=void 0;#r;#a;destroy(){this.#r.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#n,currentlyRenderedProps:this.#o,displaySettings:e.displaySettings,previousRendering:this.#r.children.at(0)??null,onHold:e.onHold,gameState:this.gameState});n!=="no-update"&&(this.#o=n.renderProps,this.#r.children.at(0)!==n.container&&(this.#r.removeChildren(),n.container!==null&&this.#r.addChild(n.container)))}get container(){return this.#r}}const Mn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},Rn=(t,e)=>{const n=new q;return Mn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Mn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Ia={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class _a{#e;constructor(e){const n=Ia[e.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${e.id}`}),V("portal")(e)){const o=w(e.config.relativePoint);this.#e.addChild(new q().circle(o.x,o.y,5).stroke(n)),this.#e.addChild(new q().circle(o.x,o.y,2).fill(n))}this.#e.addChild(new q({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(Rn(e.aabb,n)),e.renderAabb&&this.#e.addChild(Rn(e.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#e.addChild(r=new Mi({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class Pa{#e;#n;#o;constructor(e,n){this.#n=new b({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#o=n,this.#e=e,this.#r()}#r(){const e=w(this.#e.state.position);this.#n.x=e.x,this.#n.y=e.y}tick(e){this.#o?.tick(e),e.movedItems.has(this.#e)&&this.#r()}destroy(){this.#n.destroy({children:!0}),this.#o?.destroy()}get container(){return this.#n}}const Ba=(t,e)=>{const n=e.getLocalBounds(),r=Xt.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new be({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Un=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=f({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof be?o:Ba(t,o)};class Aa{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=C.getState();o||(this.#e.filters=new Di({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const{times:s}=e.config,a=Un(r,i,s);e.shadowMask.relativeTo==="top"&&(a.y-=e.aabb.z),s&&(a.y-=((s.z??1)-1)*L.h),this.#e.addChild(a),o||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#o={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=z(_(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:bi}},a=Object.groupBy(i,l=>{const c=this.#o[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":$t(s,l)?c?"update":"create":"noShadow"});for(const l of Lt(a.keepUnchanged,a.update))this.#o[l.id].renderedOnProgression=n;if(a.create)for(const l of a.create){const{times:c}=l.config,u=Un(this.pixiRenderer,l.shadowCastTexture,c);u.label=l.id,this.#n.addChild(u),this.#o[l.id]={sprite:u,renderedOnProgression:n}}for(const l of Lt(a.create,a.update)){const{sprite:c}=this.#o[l.id],u=w({...Le(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of Qe(this.#o))u!==n&&(c.destroy(),delete this.#o[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const Fa=t=>t.shadowMask!==void 0,Da=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=C.getState(),{userSettings:{displaySettings:{showBoundingBoxes:i,colourise:s}}}=o,a=Yn(o),l=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const u=new Oa(t,e,n);c.push(u),l&&(u.container.alpha=.66),!a&&s&&Fa(t)&&c.push(new Aa(t,e,r))}return l&&c.push(new _a(t)),c.length===0?"not-needed":new Pa(t,new za(c))};class za{#e;#n=new b({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#n.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#n}}const de=.33,La=16,Rt=Pe.h-Pe.w/2,Ma=ie.heels,Ra=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=lt(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-La-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,p=u.y+s-Rt<0;return(m,y,A)=>{if(m===void 0)return;const F=w(m.state.position),E=U(F,u),O={x:d&&E.x<n.x*de?Math.min(-a,n.x*de-F.x):h&&E.x>n.x*(1-de)?Math.max(n.x-l,n.x*(1-de)-F.x):u.x,y:p&&E.y<n.y*de?n.y*de-F.y:u.y};if(A)e.x=O.x,e.y=O.y;else{const I=Ma*y,R=Le(e,O),J=Gn(R);if(J>I){const te={x:R.x/J,y:R.y/J};e.x-=te.x*I,e.y-=te.y*I}else e.x=O.x,e.y=O.y}}},Ua=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=lt(t);return new q().rect(e+r.x,o-Rt,n-e,r.y-o+Rt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class En{#e=new b({label:"items"});#n=new b({label:"floorEdge"});#o=new b({children:[this.#e,this.#n]});#r=!1;#a=new Map;#i=new Map;#s;#c;#f;#l;#t;#h;#u;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=C.getState();this.#c=i,this.#f=s,this.#l=n,this.#t=e,this.#h=r,this.#u=o,this.#o.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&i.colourise,n.color),i.showBoundingBoxes!=="none"&&this.#o.addChild(Ua(n.roomJson)),this.#s=Ra(n,this.#o,s.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?nt:new M(Gt(n).main.original)}#p(e){for(const n of _(this.#l.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Da({item:n,room:this.#l,gameState:this.#t,pixiRenderer:this.#u}),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#n:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#l.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#d(e){const{order:n}=to(aa(this.#l.items,e.movedItems,this.#a),this.#l.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(_(this.#l.items))};this.#s(Re(this.#t),n.deltaMS,!this.#r),this.#p(n),(!this.#r||n.movedItems.size>0)&&this.#d(n),this.#r=!0}destroy(){this.#o.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#c}get upscale(){return this.#f}get everRendered(){return this.#r}get container(){return this.#o}get roomState(){return this.#l}get paused(){return this.#h}}var dt=`in vec2 aPosition;
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
`,ft=`struct GlobalFilterUniforms {
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
}`,Ea=`precision highp float;
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
`,$a=`struct CRTUniforms {
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
}`,Na=Object.defineProperty,Va=(t,e,n)=>e in t?Na(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ze=(t,e,n)=>(Va(t,typeof e!="symbol"?e+"":e,n),n);const ro=class oo extends W{constructor(e){e={...oo.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ft,entryPoint:"mainVertex"},fragment:{source:$a,entryPoint:"mainFragment"}}),r=X.from({vertex:dt,fragment:Ea,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ze(this,"uniforms"),Ze(this,"seed"),Ze(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ze(ro,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Ha=ro;var Xa=`
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
}`,ja=`struct KawaseBlurUniforms {
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
}`,Ga=`
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
`,qa=`struct KawaseBlurUniforms {
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
}`,Wa=Object.defineProperty,Ya=(t,e,n)=>e in t?Wa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ne=(t,e,n)=>(Ya(t,typeof e!="symbol"?e+"":e,n),n);const io=class so extends W{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ae("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...so.DEFAULT_OPTIONS,...n};const r=se.from({vertex:{source:ft,entryPoint:"mainVertex"},fragment:{source:n?.clamp?qa:ja,entryPoint:"mainFragment"}}),o=X.from({vertex:dt,fragment:n?.clamp?Ga:Xa,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ne(this,"uniforms"),ne(this,"_pixelSize",{x:0,y:0}),ne(this,"_clamp"),ne(this,"_kernels",[]),ne(this,"_blur"),ne(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=he.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let p=0;p<h;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),he.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};ne(io,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Ja=io;var Za=`in vec2 vTextureCoord;
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
`,Ka=`struct AdvancedBloomUniforms {
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
`,Qa=`
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
`,el=`struct ExtractBrightnessUniforms {
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
`,tl=Object.defineProperty,nl=(t,e,n)=>e in t?tl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ao=(t,e,n)=>(nl(t,typeof e!="symbol"?e+"":e,n),n);const lo=class co extends W{constructor(e){e={...co.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ft,entryPoint:"mainVertex"},fragment:{source:el,entryPoint:"mainFragment"}}),r=X.from({vertex:dt,fragment:Qa,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),ao(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};ao(lo,"DEFAULT_OPTIONS",{threshold:.5});let rl=lo;var ol=Object.defineProperty,il=(t,e,n)=>e in t?ol(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fe=(t,e,n)=>(il(t,typeof e!="symbol"?e+"":e,n),n);const uo=class fo extends W{constructor(e){e={...fo.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ft,entryPoint:"mainVertex"},fragment:{source:Ka,entryPoint:"mainFragment"}}),r=X.from({vertex:dt,fragment:Za,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:oe.WHITE}}),fe(this,"uniforms"),fe(this,"bloomScale",1),fe(this,"brightness",1),fe(this,"_extractFilter"),fe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new rl({threshold:e.threshold}),this._blurFilter=new Ja({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=he.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=he.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),he.returnTexture(s),he.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};fe(uo,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let sl=uo;const $n=({crtFilter:t},e)=>[t?new Ha({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new sl({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class al{constructor(e,n){this.app=e,this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=C.getState();e.stage.addChild(this.#a),e.stage.scale=r;const o=ve(n);if(o===void 0)throw new Error("main loop with no starting room");this.#r=new En({gameState:n,roomState:o,paused:!1,pixiRenderer:e.renderer}),this.#a.addChild(this.#r.container),this.#o=new rs(n,jo()),e.stage.addChild(this.#o.container),this.#c()}#e;#n;#o;#r;#a=new b({label:"MainLoop/world"});#i;#s;#c(){const{userSettings:{displaySettings:e}}=C.getState();this.#e=$n(e,!0),this.#n=$n(e,!1)}tick=({deltaMS:e})=>{const n=C.getState(),r=Yn(n),{userSettings:{displaySettings:o},upscale:i}=C.getState();this.#o.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=r?Wn:ea(this.#s,e),a=ve(this.#s);(this.#r?.roomState!==a||this.#r?.upscale!==i||this.#r?.displaySettings!==o||this.#r?.paused!==r)&&(this.#r?.destroy(),a?(this.#r=new En({gameState:this.#s,roomState:a,paused:r,pixiRenderer:this.#i.renderer}),this.#a.addChild(this.#r.container),this.#s.events.emit("roomChange",a.id)):this.#r=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#r?.tick({progression:this.#s.progression,movedItems:s,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#n};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#r?.destroy(),this.#o.destroy(),this.#i.ticker.remove(this.tick)}}rt.add(ar,lr,cr,ur,dr,fr,hr,pr,mr,gr,br,yr,vr,xr,wr,Tr,Cr,Sr,kr,Or,Ir);Go.defaultOptions.scaleMode="nearest";const Nn=async(t,e)=>{const n=new Lr;await n.init({background:"#000000",sharedTicker:!0});const r=Vi({campaign:t,inputStateTracker:e});C.dispatch(Yt(r.characterRooms.head.id)),C.dispatch(Yt(r.characterRooms.heels.id));const o=new al(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=Re(r);s!==void 0&&Et({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return ve(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},hl=Object.freeze(Object.defineProperty({__proto__:null,default:Nn,gameMain:Nn},Symbol.toStringTag,{value:"Module"}));export{Ar as A,_r as C,W as F,Xt as R,ki as S,Fr as V,Bi as a,hl as g,Si as u};
