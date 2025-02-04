const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BK8ArTBZ.js","assets/index-B0uGs8m4.js","assets/index-D0Ooe6Gp.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-7UiimO3S.js","assets/Graphics-FvqJeh0n.js","assets/changeCharacterRoom-Dtrove9D.js","assets/WebGLRenderer-gyDee06D.js"])))=>i.map(i=>d[i]);
import{y as no,a6 as le,a7 as H,n as Un,A as de,E as v,e as tt,c as ro,C as b,d as qe,v as Tt,am as m,D as Ct,aI as en,ae as je,T as ze,U as oo,aJ as io,F as so,g as ao,aK as lo,aL as ae,aM as En,a3 as co,aN as uo,Y as z,aO as Nn,aP as Te,aQ as fo,L as I,W as k,aR as ke,Q as Ut,aS as be,aT as Et,a0 as se,aU as Ye,aV as ho,aW as po,N as _,K as Nt,aX as Pe,X as $n,aY as Vn,O as St,aZ as tn,a4 as Be,a_ as mo,a$ as bo,b0 as go,b1 as $t,$ as q,a1 as P,b2 as Je,b3 as vo,Z as Vt,b4 as nn,b5 as yo,b6 as xo,b7 as wo,b8 as dt,b9 as To,ba as Ce,_ as Co,bb as So,bc as Hn,ab as fe,J as ko,bd as Oo}from"./index-B0uGs8m4.js";import{l as kt,f as Ze,a as j,e as L,g as rn,h as on,j as De,s as Oe,k as te,i as D,m as Ot,t as _o,p as Le,o as Io,n as Po,w as Bo,q as Y,r as Ao,u as Fo,v as zo,x as ge,y as ft,z as _t,A as sn,B as ht,c as Ht,C as J,D as Xn,E as Gn,F as Do,G as nt,H as V,I as rt,J as Wn,K as an,L as qn,M as Lo,N as It,O as Mo,P as jn,d as Ro,Q as _e,R as Ke,S as pe,T as Uo,U as Eo,V as No,W as $o,X as ln,Y as Pt,Z as Bt,_ as At,$ as Vo,a0 as Ie,a1 as Ho,b as ot,a2 as x,a3 as $,a4 as it,a5 as Qe,a6 as Yn,a7 as Xo}from"./changeCharacterRoom-Dtrove9D.js";import{S as Go,G as W}from"./Graphics-FvqJeh0n.js";const Jn=class Ft extends no{constructor(e){e={...Ft.defaultOptions,...e},super(e),this.enabled=!0,this._state=Go.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=le.from(n)),r&&(s=H.from(r)),new Ft({gpuProgram:i,glProgram:s,...o})}};Jn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Z=Jn;var Wo=`
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
}`;class w extends Z{constructor(e){const n=e.gpu,r=cn({source:jo,...n}),o=le.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=cn({source:Wo,...i}),a=H.from({vertex:qo,fragment:s}),l=new Un({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:de.EMPTY}})}}function cn(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Xt=`
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
    `,Gt=`
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
	`;class Zn extends w{constructor(){super({gl:{functions:`
                ${Xt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Gt}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Zn.extension={name:"color",type:v.BlendMode};class Kn extends w{constructor(){super({gl:{functions:`
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
            `}})}}Kn.extension={name:"color-burn",type:v.BlendMode};class Qn extends w{constructor(){super({gl:{functions:`
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
                `}})}}Qn.extension={name:"color-dodge",type:v.BlendMode};class er extends w{constructor(){super({gl:{functions:`
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
                `}})}}er.extension={name:"darken",type:v.BlendMode};class tr extends w{constructor(){super({gl:{functions:`
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
            `}})}}tr.extension={name:"difference",type:v.BlendMode};class nr extends w{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"divide",type:v.BlendMode};class rr extends w{constructor(){super({gl:{functions:`
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
            `}})}}rr.extension={name:"exclusion",type:v.BlendMode};class or extends w{constructor(){super({gl:{functions:`
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
                `}})}}or.extension={name:"hard-light",type:v.BlendMode};class ir extends w{constructor(){super({gl:{functions:`
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
            `}})}}ir.extension={name:"hard-mix",type:v.BlendMode};class sr extends w{constructor(){super({gl:{functions:`
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
            `}})}}sr.extension={name:"lighten",type:v.BlendMode};class ar extends w{constructor(){super({gl:{functions:`
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
                `}})}}ar.extension={name:"linear-burn",type:v.BlendMode};class lr extends w{constructor(){super({gl:{functions:`
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
            `}})}}lr.extension={name:"linear-dodge",type:v.BlendMode};class cr extends w{constructor(){super({gl:{functions:`
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
            `}})}}cr.extension={name:"linear-light",type:v.BlendMode};class ur extends w{constructor(){super({gl:{functions:`
                ${Xt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Gt}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ur.extension={name:"luminosity",type:v.BlendMode};class dr extends w{constructor(){super({gl:{functions:`
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
            `}})}}dr.extension={name:"negation",type:v.BlendMode};class fr extends w{constructor(){super({gl:{functions:`
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
                `}})}}fr.extension={name:"overlay",type:v.BlendMode};class hr extends w{constructor(){super({gl:{functions:`
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
                `}})}}hr.extension={name:"pin-light",type:v.BlendMode};class pr extends w{constructor(){super({gl:{functions:`
                ${Xt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Gt}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}pr.extension={name:"saturation",type:v.BlendMode};class mr extends w{constructor(){super({gl:{functions:`
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
                `}})}}mr.extension={name:"soft-light",type:v.BlendMode};class br extends w{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"subtract",type:v.BlendMode};class gr extends w{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"vivid-light",type:v.BlendMode};const zt=[];tt.handleByNamedList(v.Environment,zt);async function Yo(t){if(!t)for(let e=0;e<zt.length;e++){const n=zt[e];if(n.value.test()){await n.value.load();return}}}let ve;function Jo(){if(typeof ve=="boolean")return ve;try{ve=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{ve=!1}return ve}var vr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(vr||{});class Zo{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,p=u.length;d<p;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Ko=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],yr=class xr extends ro{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Ko,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Yo(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...xr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(qe(Tt,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:m.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=vr.ALL);const{clear:r,clearColor:o,target:i}=e;m.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,m.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Zo(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Jo())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};yr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let wr=yr,Me;function Qo(t){return Me!==void 0||(Me=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??wr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Ct.get().getWebGLRenderingContext())return!1;let r=Ct.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Me}let Re;async function ei(t={}){return Re!==void 0||(Re=await(async()=>{const e=Ct.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Re}const un=["webgl","webgpu","canvas"];async function ti(t){let e=[];t.preference?(e.push(t.preference),un.forEach(i=>{i!==t.preference&&e.push(i)})):e=un.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ei()){const{WebGPURenderer:a}=await en(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-BK8ArTBZ.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&Qo(t.failIfMajorPerformanceCaveat??wr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await en(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-gyDee06D.js");return{WebGLRenderer:l}},__vite__mapDeps([7,1,2,3,4,5,6]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Tr="8.6.6";class Cr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Tr)}static destroy(){}}Cr.extension=v.Application;class ni{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Tr)}destroy(){this._renderer=null}}ni.extension={type:[v.WebGLSystem,v.WebGPUSystem],name:"initHook",priority:-10};const Sr=class Dt{constructor(...e){this.stage=new b,e[0]!==void 0&&qe(Tt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await ti(e),Dt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return qe(Tt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Dt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Sr._plugins=[];let kr=Sr;tt.handleByList(v.Application,kr._plugins);tt.add(Cr);var ri=`in vec2 aPosition;
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
`,dn=`struct GlobalFilterUniforms {
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
}`;const Or=class _r extends Z{constructor(e){e={..._r.defaultOptions,...e};const n=le.from({vertex:{source:dn,entryPoint:"mainVertex"},fragment:{source:dn,entryPoint:"mainFragment"}}),r=H.from({vertex:ri,fragment:oi,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Un({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Or.defaultOptions={alpha:1};let ii=Or;class et extends je{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof de?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ze.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ze.shared.add(this.update,this,oo.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(de.from(e[r]));return new et(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(de.from(e[r]));return new et(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof de)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ze.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ze.shared.add(this.update,this),this._isConnectedToTicker=!0))}}var Ue={},fn;function si(){if(fn)return Ue;fn=1;var t=io(),e=t.mark(i),n=so(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,p,h=arguments;return t.wrap(function(T){for(;;)switch(T.prev=T.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){T.next=8;break}return p=d[u],T.delegateYield(o(p),"t0",5);case 5:u++,T.next=2;break;case 8:case"end":return T.stop()}},e)}Ue.__concat=i;var s=r(i);return Ue.concat=s,Ue}var pt,hn;function ai(){return hn||(hn=1,pt=si().concat),pt}var li=ai();const Xe=ao(li);function ci(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const ui=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},di=({campaign:t,inputStateTracker:e})=>{const n=ui(t),r=lo(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&kt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&kt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:Ze(o.items.head),heels:i===void 0?void 0:Ze(i.items.heels)},inputStateTracker:e,campaign:t,events:ci(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},g={pureBlack:new m("#000000"),lightBlack:new m("#38453A"),shadow:new m("#325149"),midGrey:new m("#7F7773"),lightGrey:new m("#BBB1AB"),white:new m("#FBFEFB"),metallicBlue:new m("#366BAE"),pink:new m("#D68ED1"),moss:new m("#9E9600"),redShadow:new m("#805E50"),midRed:new m("#CA7463"),lightBeige:new m("#DAA78F"),highlightBeige:new m("#EBC690"),alpha:new m("#FBD042"),replaceLight:new m("#08A086"),replaceDark:new m("#187558")},Wt=`in vec2 aPosition;
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
`,fi=`#version 300 es

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
`;class Se extends Z{constructor(e,n){const r=H.from({vertex:Wt,fragment:fi,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const hi=`precision mediump float;
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
`,pn=[g.pureBlack,g.lightBlack];class X extends Z{uniforms;constructor(e="white"){const n=H.from({vertex:Wt,fragment:hi,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=pn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=pn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new m(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const M={original:new m("rgb(255, 255, 255)"),basic:new m("rgb(210, 210, 210)"),dimmed:new m("rgb(120, 120, 120)")},R={original:new m("rgb(255, 255, 0)"),basic:new m("hsl(50,65%,70%)"),dimmed:g.redShadow},E={original:new m("rgb(255, 0, 255)"),basic:g.pink,dimmed:new m("hsl(290,35%,38%)")},S={original:new m("rgb(0, 255, 255)"),basic:new m("hsl(183, 50%, 50%)"),dimmed:new m("hsl(183, 50%, 25%)")},N={original:new m("rgb(0, 255, 0)"),basic:g.moss,dimmed:new m("hsl(73,50%,25%)")},qt={white:{basic:{main:M,edges:{towards:S,right:R},hud:{lives:R,dimmed:E,icons:S}},dimmed:{main:M,edges:{towards:N,right:S},hud:{lives:R,dimmed:E,icons:S}}},yellow:{basic:{main:R,edges:{towards:N,right:M},hud:{lives:S,dimmed:E,icons:N}},dimmed:{main:R,edges:{towards:S,right:S},hud:{lives:S,dimmed:E,icons:N}}},magenta:{basic:{main:E,edges:{towards:N,right:S},hud:{lives:M,dimmed:S,icons:R}},dimmed:{main:E,edges:{towards:N,right:S},hud:{lives:M,dimmed:S,icons:R}}},cyan:{basic:{main:S,edges:{towards:E,right:M},hud:{lives:M,dimmed:N,icons:R}},dimmed:{main:S,edges:{towards:E,right:M},hud:{lives:M,dimmed:N,icons:R}}},green:{basic:{main:N,edges:{towards:S,right:R},hud:{lives:M,dimmed:E,icons:S}},dimmed:{main:N,edges:{towards:S,right:R},hud:{lives:M,dimmed:E,icons:S}}}},jt=t=>qt[t.hue][t.shade],Ir=t=>{const e=j(t,"head"),n=j(t,"heels");return e!==void 0&&n!==void 0&&e.state.action==="idle"&&n.state.action==="idle"&&e.state.standingOn===n},Pr=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+rn>n?100-Math.ceil((n-e)/(rn/100)):0},Br=t=>{const e=100*L.w;return t.totalWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.totalWalkDistance-t.fastStepsStartedAtDistance)/L.w):0};function st(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}const mn={x:.5,y:1},bn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({texture:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s}=t;let a;if(bn(t)?a=pi(t):a=new je(ae.textures[t.texture]),e===void 0&&r===void 0)if(bn(t))a.anchor=mn;else{const l=ae.data.frames[t.texture].frame;l.pivot!==void 0?a.pivot=l.pivot:a.anchor=mn}else e!==void 0&&(a.anchor=e),r!==void 0&&(a.pivot=r);return o!==void 0&&(a.x=o),i!==void 0&&(a.y=i),s!==void 0&&(a.filters=s),a.eventMode="static",n===!0&&(a.scale.x=-1),a}};function pi({animationId:t,reverse:e,playOnce:n}){const o=ae.animations[t].map(s=>({texture:s,time:En}));e&&o.reverse();const i=new et(o);return i.animationSpeed=co.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const mi=`in vec2 vTextureCoord;
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
`;class at extends Z{constructor(e){const n=Object.keys(e).length,r=H.from({vertex:Wt,fragment:mi.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Ar=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Fr=t=>Ar(qt[t.color.hue][t.color.shade].main),bi=t=>new at({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...Fr(t)}),gi=new at({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Lt=(t,e,n)=>n?new at(Ar(qt[t.color.hue][t.color.shade].edges[e])):new X(jt(t.color).edges[e].original),Q=t=>new at(Fr(t)),we=uo,vi=24,yi=56,xi=80,gn=112,ye=t=>t==="heels"?1:-1;function*wi(t){const e=Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;fo(o),yield f({texture:o,x:(r+.5-n/2)*Nn.w})}}function Ee(t,e){for(const n of t.children)n.destroy();st(wi(e),t)}class Ti{#e=new b({label:"HudRenderer"});#r=new X;#o=new X;#n=new X;#a=new X;#i=new Se(g.pureBlack,z.getState().upscale.gameEngineUpscale);#s=new X;#l=[this.#i,this.#a];#c={original:[this.#i,this.#s],colourised:{head:[this.#i,new X(g.metallicBlue)],heels:[this.#i,new X(g.pink)]}};#t={head:{sprite:this.characterSprite("head"),livesText:this.makeText({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.iconWithNumber({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.iconWithNumber({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.iconWithNumber({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.iconWithNumber({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.characterSprite("heels"),livesText:this.makeText({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.iconWithNumber({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.iconWithNumber({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.iconWithNumber({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}}};constructor(){for(const e of on)this.#e.addChild(this.#t[e].livesText),this.#e.addChild(this.#t[e].sprite),this.#e.addChild(this.#t[e].shield.container),this.#e.addChild(this.#t[e].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)}iconWithNumber({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new je({texture:ae.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#n,y:n?0:8});s.addChild(a);const l=this.makeText({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Nn.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#i),{text:l,icon:a,container:s}}characterSprite(e){const n=new je(ae.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}makeText({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?this.#l:this.#a,scale:{x:1,y:e?2:1}})}updateElementPositions(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+ye("head")*gn,this.#t.head.doughnuts.container.y=e.y-Te.h-8,this.#t.heels.carrying.container.y=e.y-Te.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+ye("heels")*gn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}tickBagAndCarrying(e){const n=De(e,"heels"),r=n?.hasBag??!1,o=n?.carrying??null,{container:i}=this.#t.heels.carrying,s=i.children.length>0;if(o===null&&s)for(const a of i.children)a.destroy();o!==null&&!s&&i.addChild(f(o.type==="spring"?"spring.released":o.type==="sceneryPlayer"?o.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":o.config.style)),this.#t.heels.bag.icon.filters=r?we:this.#r}tickHooterAndDoughnuts(e){const n=De(e,"head"),r=n?.hasHooter??!1;this.#t.head.hooter.icon.filters=r?we:this.#r;const o=n?.doughnuts??0;this.#t.head.doughnuts.icon.filters=o!==0?we:this.#r,Ee(this.#t.head.doughnuts.text,o)}updateAbilitiesIcons(e,n,r){const o=De(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+ye(r)*xi,Ee(i,Pr(o)),s.y=n.y,Ee(a,o===void 0?0:r==="head"?Br(o):o.bigJumps),l.y=n.y-24}characterIsActive(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}updateCharacterSprite(e,n,r,o){const i=this.characterIsActive(e,o),s=this.#t[o].sprite;i?s.filters=r?we:this.#s:Ir(e)?s.filters=this.#o:s.filters=this.#r,s.x=(n.x>>1)+ye(o)*yi,s.y=n.y-Te.h}updateLivesText(e,n,r){const i=De(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+ye(r)*vi,s.y=n.y,Ee(s,i??0)}updateColours(e,n){const r=Oe(e),o=jt(r.color);this.#r.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#a.targetColor=o.hud.dimmed[n?"basic":"original"],this.#n.targetColor=o.hud.icons[n?"basic":"original"],this.#o.targetColor=o.hud.dimmed[n?"basic":"original"],this.#s.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.characterIsActive(e,"head")?this.#c.colourised.head:this.#r:this.#c.original,this.#t.heels.livesText.filters=n?this.characterIsActive(e,"heels")?this.#c.colourised.heels:this.#r:this.#c.original}tick({gameState:e,screenSize:n,colourise:r}){this.updateColours(e,r);for(const o of on)this.updateLivesText(e,n,o),this.updateCharacterSprite(e,n,r,o),this.updateAbilitiesIcons(e,n,o);this.updateElementPositions(n),this.tickHooterAndDoughnuts(e),this.tickBagAndCarrying(e)}get container(){return this.#e}destroy(){this.#e.destroy()}}const vn={movementType:"vel",vels:{gravity:I}},Ci=(t,e,n)=>{if(!te(t))return vn;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=_o[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?D("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Ot*n,-a)}}}:vn:{movementType:"vel",vels:{gravity:{z:Math.max(o-Ot*n,-a)}}}},Ae={movementType:"steady"},Ne=t=>{const n=t/Io*En;return(t+.5*Ot*n**2)/n},Si={head:Ne(Le.head),headOnSpring:Ne(Le.head+L.h),heels:Ne(Le.heels),heelsOnSpring:Ne(Le.heels+L.h)},ki=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Si[`${n}${e?"OnSpring":""}`]},zr=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=n!==null&&D("teleporter")(n);if(!(r.currentActionPress("jump")!=="released"&&n!==null&&!o))return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Ae;const s=D("spring")(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:ki(t,s)}},stateDelta:{action:"moving",jumped:!0}}},Oi=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=ke(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return k(n,l)},yn={movementType:"vel",vels:{walking:I}},Dr=(t,e,n)=>{const r=_i(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=ke(r.vels.walking);r.stateDelta=Object.assign(r.stateDelta||{},{walkDistance:o===0?0:t.state.walkDistance+o*n}),t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta=Object.assign(r.stateDelta||{},{totalWalkDistance:t.state.totalWalkDistance+o*n}))}return r},_i=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,vels:{walking:d,gravity:p}}}=t,h=n===t.id,y=h?e.currentActionPress("jump"):"released",T=h?e.directionVector:I,B=a===null&&p.z<0,U=o==="head"&&Br(t.state)>0&&a!==null,O=o==="headOverHeels"?B?"head":"heels":U?"heels":o,C=s?l:T,A=Y[O];if(c!==null||i==="death")return yn;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Ut(d,k(d,Po*r))}}:yn;if(y!=="released"){const Qt=Et(C,se)?l:C,to=D("spring")(a)?1:Ao;return{movementType:"vel",vels:{walking:k({...Qt,z:0},A*to)},stateDelta:{facing:be(Qt)}}}}if(ke(C)!==0)return B?{movementType:"vel",vels:{walking:k({...C,z:0},A)},stateDelta:{facing:C,action:"falling"}}:{movementType:"vel",vels:{walking:Oi({vel:d,acc:Fo[O],deltaMS:r,maxSpeed:A,unitD:C,minSpeed:0})},stateDelta:{facing:C,action:"moving"}};const ne=ke(d);if(u>0&&u<1)return{movementType:"position",posDelta:k(l,1-u),stateDelta:{action:B?"falling":"idle",walkDistance:0}};const Fe=ne===0?I:k(d,1/ne),Kt=Math.max(ne-zo[O]*r,0);return{movementType:"vel",vels:{walking:k(Fe,Kt<Bo[O]?0:Kt)},stateDelta:{action:B?"falling":"idle"}}},xn=L.h,$e=.001,Ii=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=ft**2/(2*ge);if(n==="up"){if(e<=r)return Math.max($e,Math.sqrt(2*ge*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max($e,Math.sqrt(2*ge*o))}else return ft}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-$e,-Math.sqrt(2*ge*o))}else return e<=r?Math.min(-$e,-Math.sqrt(2*ge*Math.max(e,0))):-ft};function Pi({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}},o,i){const s=t*xn,a=e*xn,l=Ii({currentAltitude:r-s,direction:n,totalDistance:a-s});if(Number.isNaN(l))throw new Error("velocity is NaN");const c=r<=s?"up":r>=a?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:l}},stateDelta:{direction:c}}}const Bi=.5,me=(t,e,n,r)=>{const o=n.x+r.x-t.x,i=n.y+r.y-t.y,s=n.z+r.z-t.z,a=t.x+e.x-n.x,l=t.y+e.y-n.y,c=t.z+e.z-n.z,u=Math.abs(o)<Math.abs(a)?o:-a,d=Math.abs(i)<Math.abs(l)?i:-l,p=Math.abs(s)<Math.abs(c)?s:-c,h=Math.abs(u),y=Math.abs(d),T=Math.abs(p)*Bi;return h<y&&h<T?{x:u,y:0,z:0}:y<T?{x:0,y:d,z:0}:{x:0,y:0,z:p}},wn=(t,e)=>({x:t.x>0?e.state.position.x:e.state.position.x+e.aabb.x,y:t.y>0?e.state.position.y:e.state.position.y+e.aabb.y,z:t.z>0?e.state.position.z:e.state.position.z+e.aabb.z}),Tn={stopAutowalk:0,portal:0,wall:0,doorLegs:0,sceneryPlayer:0,bubbles:0,block:1,barrier:1,floor:1,floorEdge:1,hushPuppy:1,teleporter:1,doorFrame:1,lift:2,movableBlock:2,portableBlock:2,slidingBlock:2,spring:2,ball:3,joystick:3,switch:3,charles:3,conveyor:3,head:4,heels:4,headOverHeels:4,pickup:8,firedDoughnut:9,slidingDeadly:10,moveableDeadly:10,deadlyBlock:10,monster:10},Lr=(t,e)=>Tn[t.type]-Tn[e.type],Ai=(t,e)=>e.toSorted((n,r)=>{const o=Lr(n,r);if(o!==0)return o;const i=Ye(t,wn(t,n)),s=Ye(t,wn(t,r));return i-s});function Mr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Pr(n)>0||(e.state.action="death",e.state.expires=t+_t)}const Fi=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=ht(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=ht(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=sn(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=ht(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.totalWalkDistance);break}case"jumps":{const s=sn(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":z.dispatch(po(r.config.page));break;case"reincarnation":break;case"crown":{z.dispatch(ho(r.config.planet));break}default:r.config}},zi=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Ye(i,r)<=0||Ht({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},Di=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=Nt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):0,y:i==="y"?-Math.abs(e.x):0,z:0}:{x:i==="x"?Math.abs(e.y):0,y:i==="y"?Math.abs(e.x):0,z:0};t.state.position=_(t.state.position,s)};function Li({movingItem:t}){t.state.autoWalk=!1}const G=(t,...e)=>D(...e)(t.touchedItem),xe=(t,...e)=>D(...e)(t.movingItem),Rr=t=>J(t.movingItem),Mi=t=>J(t.touchedItem),Ri=t=>Xn(t.touchedItem),Cn=t=>{switch(!0){case G(t,"stopAutowalk"):Li(t);break;case Ri(t):Mr(t);break;case G(t,"portal"):zi(t);break;case G(t,"pickup"):Fi(t);break;case G(t,"doorFrame"):Di(t);break}},Ur=t=>t[Math.floor(Math.random()*t.length)],ee=Object.freeze({movementType:"vel",vels:{walking:I}}),lt=t=>Gn(t)?Y[t.config.which]:Y[t.type],Ui=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=Y.homingBot;if(!Et(e,se))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Pe(l.state.position,t);if(Math.abs(c.y)<2)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<2)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},Er=(t,e)=>{const{items:{head:n,heels:r}}=e;if(e.items.headOverHeels!==void 0)return e.items.headOverHeels;const o=n===void 0?void 0:tn(n.state.position,t),i=r===void 0?void 0:tn(r.state.position,t);return o===void 0?r:i===void 0||o<i?n:r},Ei=(t,e,n,r)=>{const{state:{position:o,standingOn:i}}=t;if(i===null)return ee;const s=Er(o,e);if(s===void 0)return Ae;const a=Pe(s?.state.position,o),l=Math.abs(a.x)<Math.abs(a.y)?"x":"y",c=Math.abs(a[l])>1?l:$n(l),u=lt(t),d={...I,[c]:a[c]>0?u:-u};return{movementType:"vel",vels:{walking:d},stateDelta:{facing:be(d)}}},Ni=(t,e,n,r)=>{const{state:{position:o,standingOn:i}}=t;if(i===null)return ee;const s=Er(o,e);if(s===void 0)return ee;const a=s.state.position,l=L.w*3;if(!(o.x>a.x-l&&o.x<a.x+l&&o.y>a.y-l&&o.y<a.y+l))return ee;const u=Pe(s?.state.position,o),d=lt(t),p=(1+Math.sqrt(2))/2,h=d*p,y=k({...u,z:0},h/Vn(u));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:be(y)}}},mt=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return ee;if(!(Be(i,I)||Math.random()<r/1e3))return Ae;const l=Ur(o);return{movementType:"vel",vels:{walking:k(St[l],lt(t))},stateDelta:{facing:St[l]}}},$i=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?ee:Et(i,se)?{movementType:"vel",vels:{walking:k(o,lt(t))}}:Ae},Vi=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Ur([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},bt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},{touchDurationBeforeTurn:o,turnStrategy:i})=>{const{state:{position:s,vels:{walking:a},activated:l},aabb:c}=t;if(!l||(t.state.durationOfTouch+=r,t.state.durationOfTouch<o))return;const u=me(s,c,e,n);if(u.x===0&&u.y===0)return;const d=Vi(a,u,i);t.state.vels.walking=d,t.state.facing=be(d),t.state.durationOfTouch=0},Hi=({movingItem:t})=>{t.state.vels.walking=I},Xi=(t,e,n,r)=>{if(!t.state.activated||Gn(t)&&t.state.busyLickingDoughnutsOffFace)return ee;switch(t.config.movement){case"patrol-randomly-diagonal":return mt(t,e,n,r,go);case"patrol-randomly-xy8":return mt(t,e,n,r,bo);case"patrol-randomly-xy4":return mt(t,e,n,r,mo);case"towards-tripped-on-axis-xy4":return Ui(t,e);case"towards-on-shortest-axis-xy4":return Ei(t,e);case"back-forth":case"clockwise":return $i(t);case"unmoving":case"free":return ee;case"towards-when-in-square-xy8":return Ni(t,e);default:throw t.config,new Error("this should be unreachable")}},Gi=t=>{const{movingItem:e,touchedItem:n}=t;if(te(n,e))switch(e.config.movement){case"patrol-randomly-xy4":bt(t,{touchDurationBeforeTurn:150,turnStrategy:"perpendicular"});break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":bt(t,{touchDurationBeforeTurn:150,turnStrategy:"opposite"});break;case"clockwise":bt(t,{touchDurationBeforeTurn:150,turnStrategy:"clockwise"});break;case"towards-tripped-on-axis-xy4":Hi(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Wi=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r},state:{setting:o,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,e===i+1||e===i)return;const s=t.state.setting=o==="left"?"right":"left";for(const[a,l]of $t(r)){const c=n.items[a];c!==void 0&&(c.state={...c.state,...l[s]})}},qi=({movingItem:t,touchedItem:e})=>{if(!te(t))return;const{state:{position:n},aabb:r}=e,o=me(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=be(o),s=k(i,-Y.ball);return e.state.vels.sliding=s,!1},ji=({movingItem:t,touchedItem:e})=>{if(!te(e))return;const n=t.state.vels.sliding;if(Be(n,I))return;const{state:{position:r},aabb:o}=t,i=me(e.state.position,e.aabb,r,o);return Ye(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=I),!1},Yi=2*Do,Nr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Yi,positionDelta:n})},Ji=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Ut(r.state.position,o),z:0};if(!Be(s,I))for(const a of r.state.stoodOnBy)Nr(a,e,s)}},Zi=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=me(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=be(a);for(const c of o){const u=e.items[c],d=k(l,-Y.charles*r);u.state.facing=d,Nr(u,e,d)}},Ki=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},Sn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>Ki(t,e,n,r),kn=.001,Yt=(t,e,n=.001)=>{if(!te(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:nt({state:{position:_(t.state.position,{x:0,y:0,z:-kn})},aabb:{...t.aabb,z:n+kn},id:t.id},{state:{position:_(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},$r=(t,e)=>{const r=[...q(e).filter(i=>Yt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Lr(s,i);return a<0||a===0&&Sn(t,s)>Sn(t,i)?s:i})},On=t=>V(t.movingItem)&&Yt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Vr=(t,e)=>{let n=I;for(const r of e){if(r.movementType==="position"&&(n=_(n,r.posDelta)),r.movementType==="vel"&&(V(t)||D("lift")(t)))for(const[i,s]of $t(r.vels)){const a={...I,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},_n=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&J(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&On(t)){if(On(t)&&Rr(t)){rt({above:t.movingItem,below:t.touchedItem});const n=[zr(t.movingItem,t.gameState),Dr(t.movingItem,t.gameState,t.deltaMS)];Vr(t.movingItem,n)}Wn(t)}};function Qi(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.state.busyLickingDoughnutsOffFace=!0}const es=t=>{Rr(t)&&Cn(t),Mi(t)&&Cn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),G(t,...an)&&qi(t),xe(t,...an)&&ji(t),(xe(t,"monster")&&G(t,"firedDoughnut")||xe(t,"firedDoughnut")&&G(t,"monster"))&&Qi(t),(xe(t,"monster")||xe(t,"movableBlock"))&&Gi(t),G(t,"switch")&&Wi(t),G(t,"joystick")&&Zi(t),t.touchedItem.state.disappear&&_n(t),t.movingItem.state.disappear&&te(t.touchedItem,t.movingItem)&&_n({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Jt=({subjectItem:t,posDelta:e,gameState:n,room:r,pusher:o,deltaMS:i,forceful:s=D("lift")(t)&&o===void 0,recursionDepth:a=0})=>{if(Be(e,I))return;if(a>16)throw new Error("this probably means a non-terminating issue");const{state:{position:l}}=t;t.state.position=_(l,e),V(t)&&(t.state.actedOnAt=r.roomTime);const c=Ai(e,qn(t,P(r.items)));for(const u of c){if(!nt(t,u))continue;if(o!==u&&es({movingItem:t,touchedItem:u,movementVector:Ut(t.state.position,l),gameState:n,deltaMS:i,room:r}),r.items[t.id]===void 0)return;if(r.items[u.id]===void 0||!te(u,t)||!te(t))continue;const d=me(t.state.position,t.aabb,u.state.position,u.aabb);if(V(u)&&u!==o){const p=s||Lo(u)?-1:-.5,h=k(d,p);if(t.state.position=_(t.state.position,d,h),Jt({subjectItem:u,posDelta:h,pusher:t,gameState:n,room:r,deltaMS:i,forceful:s,recursionDepth:a+1}),r.items[u.id]===void 0)continue;t.state.position=_(t.state.position,me(t.state.position,t.aabb,u.state.position,u.aabb))}else t.state.position=_(t.state.position,d);V(t)&&d.z>0&&(t.state.standingOn===null||!c.includes(t.state.standingOn))&&(It(t),rt({above:t,below:u}))}};function ts(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&D("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:_t}}}:Ae;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return Ht({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:_t}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const In={movementType:"vel",vels:{movingFloor:I}},ns=(t,e,n)=>{if(J(t)&&t.state.teleporting!==null)return In;const{state:{standingOn:r}}=t;if(r===null||!D("conveyor")(r))return In;const{config:{direction:o}}=r,s=D("heels")(t)&&t.state.action==="moving"&&Je(t.state.facing)===vo(o)?Y.heels:Mo;return{movementType:"vel",vels:{movingFloor:k(St[o],s)}}},rs=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=q(P(e.items)).filter(jn),u=s===null?is(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}os(e,i,u)}else{if(t.state.standingOn===null||!Hr(t,P(e.items)))return;const d=Ro({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Jt({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r}),i.carrying=null}},os=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,_e({room:t,item:n})},is=(t,e)=>$r(t,q(P(e.items)).filter(jn)),Hr=(t,e)=>{const n={position:_(t.state.position,{z:L.h})},r=qn({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(!V(o)||!Hr(o,e))return!1;return!0};function*ss(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const as=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t;if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+500<c){const h={type:"firedDoughnut",...Ke,config:Vt,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:_(u,k(d,L.w),t.type==="headOverHeels"?{z:L.h}:I),vels:{fired:k(d,Y.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};pe({room:e,item:h}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},ls=2;function*cs(t,e,n,r){V(t)&&(yield Ci(t,n,r),yield ns(t),yield*ss(t,e)),J(t)&&(yield Dr(t,n,r),t.id===n.currentCharacterName&&(yield ts(t,n,r),yield zr(t,n),Uo(t)&&rs(t,e,n,r),Eo(t)&&as(t,e,n))),No(t)&&(yield Pi(t)),$o(t)&&(yield Xi(t,e,n,r))}const us=(t,e,n)=>{V(t)&&t.state.standingOn!==null&&t.state.standingOn.state.disappear==="onStand"&&Wn({touchedItem:t.state.standingOn,gameState:n,room:e}),J(t)&&t.state.standingOn!==null&&t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0)},ds=(t,e,n,r)=>{J(t)&&t.state.standingOn!==null&&Xn(t.state.standingOn)&&Mr({gameState:n,room:e,movingItem:t,touchedItem:t.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...cs(t,e,n,r)];us(t,e,n);let i=Vr(t,o);(V(t)||D("lift")(t)||D("firedDoughnut")(t))&&(i=_(i,...q(P(t.state.vels)).map(l=>k(l,r))));const s=Math.ceil(ke(i)/ls),a=k(i,1/s);for(let l=0;l<s;l++)Jt({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r})},Mt=t=>{const e={id:"head",type:"head",...Ke,...ln,state:{...Pt(),...Bt(),...At(),...t.state.head,facing:t.state.facing,position:_(t.state.position,{z:L.h}),switchedToAt:Number.NEGATIVE_INFINITY,actedOnAt:t.state.actedOnAt}},n={id:"heels",type:"heels",...Ke,...ln,state:{...Pt(),...Bt(),...At(),...t.state.heels,facing:t.state.facing,position:_(t.state.position),switchedToAt:Number.NEGATIVE_INFINITY,actedOnAt:t.state.actedOnAt}};return{head:e,heels:n}},Zt=({head:t,heels:e})=>({type:"headOverHeels",id:"headOverHeels",...Ke,shadowCastTexture:e.shadowCastTexture,config:Vt,aabb:Vo,state:{...Pt(),...Bt(),...At(),position:e.state.position,action:"idle",jumped:!1,teleporting:null,autoWalk:!1,facing:e.state.facing,actedOnAt:Math.max(e.state.actedOnAt,e.state.actedOnAt),head:{...nn(t.state,"hasHooter","doughnuts","doughnutLastFireTime","fastStepsStartedAtDistance","totalWalkDistance","lives","gameTime","shieldCollectedAt"),switchedToAt:Number.NEGATIVE_INFINITY},heels:{...nn(e.state,"hasBag","bigJumps","carrying","lives","gameTime","shieldCollectedAt"),switchedToAt:Number.NEGATIVE_INFINITY}}}),fs=t=>{const e=t.characterRooms.head,n=j(t,"head"),r=j(t,"heels"),o=Zt({head:n,heels:r});_e({room:e,item:"head"}),_e({room:e,item:"heels"}),pe({room:e,item:o}),t.previousPlayable=t.currentCharacterName,t.currentCharacterName="headOverHeels",t.characterRooms={head:void 0,heels:void 0,headOverHeels:e}},hs=t=>{const e=t.characterRooms.headOverHeels,n=j(t,"headOverHeels"),r=Ie(t.previousPlayable),{head:o,heels:i}=Mt(n);_e({room:e,item:"headOverHeels"}),pe({room:e,item:o}),pe({room:e,item:i}),rt({above:o,below:i}),t.currentCharacterName=r,t.previousPlayable=void 0,t.characterRooms={head:e,heels:e,headOverHeels:void 0}},ps=t=>{const e=j(t,t.currentCharacterName);e!==void 0&&(e.type==="headOverHeels"?(e.state.head.switchedToAt=e.state.head.gameTime,e.state.heels.switchedToAt=e.state.heels.gameTime):e.state.switchedToAt=e?.state.gameTime)},ms=t=>{if(Ir(t))fs(t);else if(t.currentCharacterName==="headOverHeels")hs(t);else{if(j(t,Ie(t.currentCharacterName))===void 0)return;t.currentCharacterName=Ie(t.currentCharacterName)}ps(t)},bs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,ie(t,e);const u=Mt(e)[c],d=he({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Ze(u)};return}if(t.entryState.headOverHeels!==void 0){ie(t,e);const c=he({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Mt(e);if(ie(t,c),ie(t,u),nt(c,u)){const d=Zt({head:c,heels:u});ie(t,d,"heels");const p=he({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:p},t.entryState={headOverHeels:Ze(d)};return}else{const d=he({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},he=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=kt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)pe({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Ho(o,t);return o},ie=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},gs=(t,e)=>{const n=j(t,Ie(e.type));if(e.state.lives--,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];ie(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Zt({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});ie(t,a);const l=he({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}pe({room:r,item:e});return}else{const s=he({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},vs=(t,e)=>{e.type==="headOverHeels"?bs(t,e):gs(t,e)},ys=t=>{for(const e of P(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){It(n);continue}if(!Yt(n,e)){It(n);const r=$r(n,P(t.items));r!==void 0&&rt({above:n,below:r})}}},xs=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ws=(t,e,n)=>{for(const r of P(t.items))!V(r)||t.roomTime===r.state.actedOnAt||yo(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=xo(r.state.position),n.add(r))},Ts=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Cs=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++)n=new Set(Xe(n,Pn(t,e)));return n}return Pn(t,e*t.gameSpeed)},Pn=(t,e)=>{const{inputStateTracker:n}=t,r=Oe(t),o=Object.fromEntries(q($t(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&ms(t);for(const a of P(r.items))xs(a,r)&&(_e({room:r,item:a}),J(a)&&vs(t,a));const i=Object.values(r.items).sort(Ts);for(const a of i){if(ot(t).state.action==="death")break;r.items[a.id]!==void 0&&ds(a,r,t,e)}ys(r);const s=new Set(q(P(r.items)).filter(a=>o[a.id]===void 0||!Be(a.state.position,o[a.id])));return Ji(s,r,o),ws(r,o,s),Ss(t,r,e),s},Ss=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=ot(t);if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=j(t,Ie(r.type));i!==void 0&&(i.state.gameTime+=n)}},Bn=(t,e)=>{const n=x(t),r=x(_(t,{x:e.x,z:e.z})),o=x(_(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},gt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,ks=(t,e,n,r)=>{const o=Bn(t,e),i=Bn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=gt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,p=o.bottomCentre.y-o.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,y=i.bottomCentre.y-i.bottomCentre.x/2,T=gt(d,p,h,y),B=o.topLeft.y+o.topLeft.x/2,U=o.bottomCentre.y+o.bottomCentre.x/2,O=i.topLeft.y+i.topLeft.x/2,C=i.bottomCentre.y+i.bottomCentre.x/2,A=gt(B,U,O,C);return u&&T&&A},Os=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!ks(n,r,o,i))return 0;for(const s of wo){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return An(e)-An(t)},An=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ge extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const _s=t=>{const e=Is(t);let n=e.length,r=n;const o=new Array(n),i={},s=Ps(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Ge([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,p=Array.from(d);if(c=p.length){u.add(l);do{const h=p[--c];try{a(h,s.get(h),u)}catch(y){throw y instanceof Ge?y.hasClosedCycle?y:new Ge([l,...y.cyclicDependency],y.cyclicDependency.includes(l)):y}}while(c);u.delete(l)}o[--n]=l}};function Is(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Ps(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Fn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ve=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Bs=(t,e=new Set(P(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Ve(n,o,s);for(const o of e)if(o.renders)for(const i of P(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Os(o,i);if(Fn(r,o,i),s===0){Ve(n,o.id,i.id),Ve(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;Fn(n,a,l),Ve(n,l,a)}return n},Xr=(t,e,n=3)=>{try{return{order:_s(t),impossible:!1}}catch(r){if(r instanceof Ge){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),{order:Xr(t,e,n-1).order,impossible:!0}}else throw r}},As=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Fs=(t,e,n)=>{const o=ae.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ae.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},He=t=>F(()=>f(t)),F=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i}),renderProps:Vt}:"no-update";function*zs({config:{direction:t,inHiddenWall:e,height:n}},r){const o=Nt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const c=f({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...dt(a,{y:-L.h*n})});c.filters=Lt(r,o==="x"?"towards":"right",!0),yield c}}else{yield f({pivot:{x:i,y:9},texture:"generic.door.legs.base",...dt(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...dt(a,{y:-l*L.h})})}}yield*s($({...se,[o]:1})),yield*s(se),e||(yield f({pivot:{x:16,y:L.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...$({...se,[o]:1})}))}const Ds=F(({item:t,room:e})=>st(zs(t,e),new b({filters:Q(e)})));function*Ls({config:{direction:t,part:e}},n){const r=Nt(t);yield f({texture:Fs(n,r,e),filter:Q(n)})}const Ms=F(({item:t,room:e})=>st(Ls(t,e))),vt={animationId:"bubbles.cold"},re=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},yt=({name:t,action:e,facingXy4:n,teleporting:r,highlighted:o})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r!==null){if(r.phase==="out")return{animationId:`${t}.fadeOut`};if(r.phase==="in")return{animationId:`${t}.fadeOut`}}const i=o?new Se(t==="head"?g.metallicBlue:g.pink,z.getState().upscale.gameEngineUpscale):void 0;return e==="moving"?{animationId:`${t}.walking.${n}`,filter:i}:e==="falling"&&t==="head"&&(n==="towards"||n==="right")?{texture:`head.falling.${n}`,filter:i}:t==="head"&&(n==="towards"||n==="right")?{animationId:`head.idle.${n}`,filter:i}:{texture:`${t}.walking.${n}.2`,filter:i}},zn=({gameTime:t,switchedToAt:e})=>e+500>t,xt=({item:t,currentlyRenderedProps:e})=>{const{type:n,state:{action:r,facing:o,teleporting:i}}=t,s=Je(o),a=t.type==="headOverHeels"?zn(t.state.head):zn(t.state);return e===void 0||e.action!==r||e.facingXy4!==s||e.teleportingPhase!==(i?.phase??null)||e.highlighted!==a?{container:n==="headOverHeels"?re({top:yt({name:"head",action:r,facingXy4:s,teleporting:i,highlighted:a}),bottom:yt({name:"heels",action:r,facingXy4:s,teleporting:i,highlighted:a})}):f(yt({name:n,action:r,facingXy4:s,teleporting:i,highlighted:a})),renderProps:{action:r,facingXy4:s,teleportingPhase:i?.phase??null,highlighted:a}}:"no-update"};function*Rs(t,e,n){for(const r of To){const o=$n(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let a=0;a<=t.size[r];a++){let l;if(t.walls[s][a]==="none"){const c=q(P(t.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===a||u.position[r]+1===a)&&u.position[o]===t.size[o]);c===void 0?l="none":c.position.z===0?l="behind-door":l="corner-on-floor"}else l="corner-on-floor";l!=="none"&&(yield Qe({[r]:a-e[r],[o]:t.size[o]+(n[i]?.5:0)+(l==="behind-door"?.5:0)},f(l==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const Gr=({blockXExtent:t,blockYExtent:e,type:n})=>{const r=new b({label:"towards"});for(let i=0;i<=t;i+=.5){const s={x:i,y:0},a={x:7,y:0};r.addChild(Qe(s,f({pivot:a,texture:`${n}.towards`})))}const o=new b({label:"right"});for(let i=0;i<=e;i+=.5)o.addChild(Qe({x:0,y:i},f({pivot:{x:0,y:0},texture:`${n}.right`})));return{right:o,towards:r}},Us=F(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=it(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:p}}=e,h=new b({label:`floor(${e.id})`});if(d!=="none"){const U=d==="deadly"?`generic${p==="dimmed"?".dark":""}.floor.deadly`:`${d}${p==="dimmed"?".dark":""}.floor`,O=new b;for(let A=-1;A<=o+2;A++)for(let K=A%2-1;K<=i+2;K+=2)O.addChild(Qe({x:A+(s.right?-.5:0),y:K+(s.towards?-.5:0)},f({texture:U})));st(Rs(e,{x:n,y:r},s),O);const C=new W().poly([se,$({x:c,y:0}),$({x:c,y:u}),$({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});O.addChild(C),O.filters=Q(e),O.mask=C,h.addChild(O)}const{towards:y,right:T}=Gr({blockXExtent:c,blockYExtent:u,type:"floorOverdraw"});h.addChild(y),h.addChild(T);const B=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);return h.addChild(B),h.mask=B,h.y=-t.aabb.z,h.cacheAsTexture(!0),h}),Es=F(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=it(t.roomJson),c=i-r,u=s-o,d=new b({label:"floorEdge"}),p=new W({label:"overDrawToHideFallenItems"}).poly([$({x:c,y:0}),$({x:0,y:0}),$({x:0,y:u}),{...$({x:0,y:u}),y:999},{...$({x:c,y:0}),y:999}],!0).fill(0);p.y=8,d.addChild(p);const{towards:h,right:y}=Gr({blockXExtent:c,blockYExtent:u,type:"floorEdge"}),T=!e&&n.colourise;h.filters=Lt(t,"towards",T),y.filters=Lt(t,"right",T),d.addChild(h),d.addChild(y);const B=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(B),d.mask=B,d.cacheAsTexture(!0),d}),Ns=(t,e,n)=>e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,wt=g.moss,Dn=F(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),$s={head:xt,heels:xt,headOverHeels:xt,doorFrame:Ms,doorLegs:Ds,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:F(({item:{config:{side:t,style:e}},room:n})=>{if(t==="right"||t==="towards")throw new Error("this wall should be non-rendering");return f({texture:As(n.planet,e,t,n.color.shade==="dimmed"),y:1,pivot:t==="away"?{x:Ce.w,y:Ce.h+1}:{x:0,y:Ce.h+1},filter:Q(n)})}),barrier:F(({item:{config:{axis:t}}})=>f({texture:`barrier.${t}`})),deadlyBlock:F(({item:{config:{style:t}},room:e})=>f({texture:t,filter:t==="volcano"?Q(e):void 0})),slidingDeadly:Dn,slidingBlock:Dn,block({item:{config:{style:t},state:{disappear:e}},room:n,currentlyRenderedProps:r}){return r===void 0||r.disappear!==e?{container:f({texture:Ns(n.color.shade==="dimmed",t,e!==null),filter:t==="organic"?Q(n):void 0}),renderProps:{disappear:e}}:"no-update"},switch({item:{state:{setting:t}},currentlyRenderedProps:e}){return e===void 0||t!==e.setting?{container:f(`switch.${t}`),renderProps:{setting:t}}:"no-update"},conveyor({item:{config:{direction:t},state:{stoodOnBy:e}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new b,s=Co(t);return i.addChild(f(r?{animationId:`conveyor.${s}`,reverse:t==="towards"||t==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:F(()=>{const t=new b,e={x:Te.w/2,y:Te.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({texture:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=q(t).find(J)!==void 0;return e===void 0||n!==e.flashing?{container:n?new b({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:F(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({texture:`crown.${t.planet}`});const r={shield:"bunny",jumps:"bunny",fast:"bunny","extra-life":"bunny",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:Q(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:F(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=Je(t);return e===void 0||n!==e.facingXy4?{container:re({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?gi:o?void 0:bi(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Je(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({texture:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({texture:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{texture:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?re({top:{texture:`${t.which}.${a}`,filter:s||Q(n)},bottom:vt}):f({texture:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:re({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{texture:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({texture:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:re({top:vt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:re({top:"ball",bottom:vt,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:He("joystick"),movableBlock:F(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new Se(wt,z.getState().upscale.gameEngineUpscale):void 0;return{container:f({texture:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new Se(wt,z.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new Se(wt,z.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?re({top:{texture:`head.walking.${e}.2`,filter:i},bottom:{texture:`heels.walking.${e}.2`,filter:i}}):f({texture:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:He("hushPuppy"),bubbles:F(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:He({animationId:"bubbles.doughnut"}),ball:He("ball"),floor:Us,floorEdge:Es},Vs=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class Hs{#e;#r;#o=void 0;#n;#a;constructor(e,n,r){this.#e=e,this.#r=n,this.#n=new b({label:`ItemAppearanceRenderer ${e.id}`}),Vs(e,this.#n,r),this.#a=$s[e.type]}destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#r,currentlyRenderedProps:this.#o,displaySettings:e.displaySettings,onHold:e.onHold});n!=="no-update"&&(this.#o=n.renderProps,this.#n.children.forEach(r=>r.destroy()),n.container!==null&&this.#n.addChild(n.container))}get container(){return this.#n}}const Ln=(t,e)=>{const n=new W().poly([x({}),x({x:t.x}),x({x:t.x,y:t.y}),x({y:t.y})]).poly([x({}),x({z:t.z}),x({y:t.y,z:t.z}),x({y:t.y})]).poly([x({x:t.x}),x({x:t.x,z:t.z}),x(t),x({x:t.x,y:t.y})]).poly([x({z:t.z}),x({x:t.x,z:t.z}),x({x:t.x,y:t.y,z:t.z}),x({y:t.y,z:t.z})]).stroke({width:.5,color:e,alpha:1});return n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.fill({color:"transparent"})}),n},Xs={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Gs{#e;constructor(e){const n=Xs[e.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${e.id}`}),D("portal")(e)){const r=x(e.config.relativePoint);this.#e.addChild(new W().circle(r.x,r.y,5).stroke(n)),this.#e.addChild(new W().circle(r.x,r.y,2).fill(n))}this.#e.addChild(new W().circle(0,0,2).fill(n)),this.#e.addChild(Ln(e.aabb,n)),e.renderAabb&&this.#e.addChild(Ln(e.renderAabb,"rgba(184, 184, 255)"))}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class Ws{#e;#r;#o;constructor(e,n){this.#r=new b({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#o=n,this.#e=e,this.#n()}#n(){const e=Yn(this.#e.state.position);this.#r.x=e.x,this.#r.y=e.y}tick(e){this.#o?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#r.destroy({children:!0}),this.#o?.destroy()}get container(){return this.#r}}class qs{constructor(e,n){this.item=e,this.room=n;const{userSettings:{displaySettings:{showShadowMasks:r}}}=z.getState();if(r||(this.#e.filters=new ii({alpha:.5})),e.shadowMask.spriteOptions){const o=f(e.shadowMask.spriteOptions);e.shadowMask.relativeTo==="top"&&(o.y=-e.aabb.z),this.#e.addChild(o),r||(this.#e.mask=o)}this.#e.addChild(this.#r)}#e=new b({label:"ItemShadowRenderer"});#r=new b({label:"shadows"});#o={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=q(P(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:Xo}},a=Object.groupBy(i,l=>{const c=this.#o[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":nt(s,l)?c?"update":"create":"noShadow"});for(const l of Xe(a.keepUnchanged,a.update))this.#o[l.id].renderedOnProgression=n;for(const l of Xe(a.create)){const c=f(l.shadowCastTexture);c.label=l.id,this.#r.addChild(c),this.#o[l.id]={sprite:c,renderedOnProgression:n}}for(const l of Xe(a.create,a.update)){const{sprite:c}=this.#o[l.id],u=x({...Pe(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of So(this.#o))u!==n&&(c.destroy(),delete this.#o[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const js=t=>t.shadowMask!==void 0,Ys=(t,e,n)=>{const r=z.getState(),{userSettings:{displaySettings:{showBoundingBoxes:o,colourise:i}}}=r,s=Hn(r),a=o==="all"||o==="non-wall"&&t.type!=="wall",l=[];return t.renders&&(l.push(new Hs(t,e,n)),!s&&i&&js(t)&&l.push(new qs(t,e))),a&&l.push(new Gs(t)),l.length===0?"not-needed":new Ws(t,new Js(l))};class Js{#e;#r=new b({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#r.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#r}}const ce=.33,Zs=16,Rt=Ce.h-Ce.w/2,Ks=Y.heels,Qs=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=it(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Zs-i.y-Math.abs(c/2)},d=u.x+a<0,p=u.x+l>n.x,h=u.y+s-Rt<0;return(y,T,B)=>{const U=Yn(y.state.position),O=_(U,u),C={x:d&&O.x<n.x*ce?Math.min(-a,n.x*ce-U.x):p&&O.x>n.x*(1-ce)?Math.max(n.x-l,n.x*(1-ce)-U.x):u.x,y:h&&O.y<n.y*ce?n.y*ce-U.y:u.y};if(B)e.x=C.x,e.y=C.y;else{const A=Ks*T,K=Pe(e,C),ne=Vn(K);if(ne>A){const Fe={x:K.x/ne,y:K.y/ne};e.x-=Fe.x*A,e.y-=Fe.y*A}else e.x=C.x,e.y=C.y}}},ea=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=it(t);return new W().rect(e+r.x,o-Rt,n-e,r.y-o+Rt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Mn{#e=new b({label:"items"});#r=new b({label:"floorEdge"});#o=new b({children:[this.#e,this.#r]});#n=!1;#a=new Map;#i=new Map;#s;#l;#c;#t;#u;#d;constructor(e,n,r){const{userSettings:{displaySettings:o},upscale:i}=z.getState();this.#l=o,this.#c=i,this.#t=n,this.#u=e,this.#d=r,this.#o.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&o.colourise,n.color),o.showBoundingBoxes!=="none"&&this.#o.addChild(ea(n.roomJson)),this.#s=Qs(n,this.#o,i.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?we:new X(jt(n).main.original)}#f(e){for(const n of P(this.#t.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Ys(n,this.#t,this.#u),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#r:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#t.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#h(e){const{order:n}=Xr(Bs(this.#t.items,e.movedItems,this.#a),this.#t.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(P(this.#t.items))};this.#s(ot(this.#u),n.deltaMS,!this.#n),this.#f(n),(!this.#n||n.movedItems.size>0)&&this.#h(n),this.#n=!0}destroy(){this.#o.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#l}get upscale(){return this.#c}get everRendered(){return this.#n}get container(){return this.#o}get roomState(){return this.#t}get paused(){return this.#d}}var ct=`in vec2 aPosition;
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
`,ut=`struct GlobalFilterUniforms {
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
}`,ta=`precision highp float;
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
`,na=`struct CRTUniforms {
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
}`,ra=Object.defineProperty,oa=(t,e,n)=>e in t?ra(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,We=(t,e,n)=>(oa(t,typeof e!="symbol"?e+"":e,n),n);const Wr=class qr extends Z{constructor(e){e={...qr.DEFAULT_OPTIONS,...e};const n=le.from({vertex:{source:ut,entryPoint:"mainVertex"},fragment:{source:na,entryPoint:"mainFragment"}}),r=H.from({vertex:ct,fragment:ta,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),We(this,"uniforms"),We(this,"seed"),We(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};We(Wr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ia=Wr;var sa=`
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
}`,aa=`struct KawaseBlurUniforms {
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
}`,la=`
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
`,ca=`struct KawaseBlurUniforms {
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
}`,ua=Object.defineProperty,da=(t,e,n)=>e in t?ua(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,oe=(t,e,n)=>(da(t,typeof e!="symbol"?e+"":e,n),n);const jr=class Yr extends Z{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(qe("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Yr.DEFAULT_OPTIONS,...n};const r=le.from({vertex:{source:ut,entryPoint:"mainVertex"},fragment:{source:n?.clamp?ca:aa,entryPoint:"mainFragment"}}),o=H.from({vertex:ct,fragment:n?.clamp?la:sa,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),oe(this,"uniforms"),oe(this,"_pixelSize",{x:0,y:0}),oe(this,"_clamp"),oe(this,"_kernels",[]),oe(this,"_blur"),oe(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=fe.getSameSizeTexture(n);let c=n,u=l,d;const p=this._quality-1;for(let h=0;h<p;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),fe.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};oe(jr,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let fa=jr;var ha=`in vec2 vTextureCoord;
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
`,pa=`struct AdvancedBloomUniforms {
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
`,ma=`
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
`,ba=`struct ExtractBrightnessUniforms {
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
`,ga=Object.defineProperty,va=(t,e,n)=>e in t?ga(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Jr=(t,e,n)=>(va(t,typeof e!="symbol"?e+"":e,n),n);const Zr=class Kr extends Z{constructor(e){e={...Kr.DEFAULT_OPTIONS,...e};const n=le.from({vertex:{source:ut,entryPoint:"mainVertex"},fragment:{source:ba,entryPoint:"mainFragment"}}),r=H.from({vertex:ct,fragment:ma,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Jr(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Jr(Zr,"DEFAULT_OPTIONS",{threshold:.5});let ya=Zr;var xa=Object.defineProperty,wa=(t,e,n)=>e in t?xa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ue=(t,e,n)=>(wa(t,typeof e!="symbol"?e+"":e,n),n);const Qr=class eo extends Z{constructor(e){e={...eo.DEFAULT_OPTIONS,...e};const n=le.from({vertex:{source:ut,entryPoint:"mainVertex"},fragment:{source:pa,entryPoint:"mainFragment"}}),r=H.from({vertex:ct,fragment:ha,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:de.WHITE}}),ue(this,"uniforms"),ue(this,"bloomScale",1),ue(this,"brightness",1),ue(this,"_extractFilter"),ue(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new ya({threshold:e.threshold}),this._blurFilter=new fa({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=fe.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=fe.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),fe.returnTexture(s),fe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};ue(Qr,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ta=Qr;const Rn=({crtFilter:t},e)=>[t?new ia({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Ta({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Ca{#e;#r;#o;#n;#a=new b({label:"MainLoop/world"});#i;#s;constructor(e,n){this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=z.getState();e.stage.addChild(this.#a),e.stage.scale=r,this.#n=new Mn(n,Oe(n),!1),this.#a.addChild(this.#n.container),this.#o=new Ti,e.stage.addChild(this.#o.container),this.#l()}#l(){const{userSettings:{displaySettings:e}}=z.getState();this.#e=Rn(e,!0),this.#r=Rn(e,!1)}tick=({deltaMS:e})=>{const n=z.getState(),r=Hn(n),{userSettings:{displaySettings:o},upscale:i}=z.getState();this.#o.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=Oe(this.#s);if((this.#n.roomState!==s||this.#n.upscale!==i||this.#n.displaySettings!==o||this.#n.paused!==r)&&(this.#n.destroy(),this.#n=new Mn(this.#s,s,r),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",s.id),this.#i.stage.scale=i.gameEngineUpscale,this.#l()),r)this.#i.stage.filters=this.#e,this.#n.everRendered||this.#n.tick({progression:this.#s.progression,movedItems:ko,deltaMS:e,displaySettings:o,onHold:!0});else{this.#i.stage.filters=this.#r;const a=Cs(this.#s,e);this.#n.tick({progression:this.#s.progression,movedItems:a,deltaMS:e,displaySettings:o,onHold:!1})}};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n.destroy(),this.#o.destroy(),this.#i.ticker.remove(this.tick)}}tt.add(Zn,Kn,Qn,er,tr,nr,rr,or,ir,sr,ar,cr,lr,ur,dr,fr,hr,pr,mr,br,gr);Oo.defaultOptions.scaleMode="nearest";const Sa=async(t,e)=>{const n=new kr;await n.init({background:"#000000",sharedTicker:!0});const r=di({campaign:t,inputStateTracker:e}),o=new Ca(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){Ht({playableItem:ot(r),gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return Oe(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Pa=Object.freeze(Object.defineProperty({__proto__:null,gameMain:Sa},Symbol.toStringTag,{value:"Module"}));export{wr as A,vr as C,Z as F,ni as R,Zo as S,Tr as V,Pa as g,Jo as u};
