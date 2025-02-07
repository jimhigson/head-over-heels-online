const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-JX6zaWvy.js","assets/App-kiKIJop3.js","assets/index-D1TruY1d.js","assets/index-BpmxBfvg.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CACr5cyv.js","assets/Graphics-DINBJzE5.js","assets/swopCharacters-Cj8gPUyd.js","assets/WebGLRenderer-BH4GQAwZ.js"])))=>i.map(i=>d[i]);
import{x as jr,a6 as se,a7 as X,m as _n,y as fe,E as x,e as Je,c as Yr,C as b,d as He,v as bt,am as m,D as vt,ae as Xe,T as we,U as Jr,aF as Zr,A as Kr,aG as Qr,aH as ie,aI as In,a2 as eo,aJ as to,X as k,aK as Ee,aL as Te,aM as no,aN as ro,K as _,Q as O,aO as Oe,O as Pt,aP as ae,aQ as Bt,$ as oe,aR as Ge,aS as oo,aT as io,L as z,J as Ft,aU as _e,W as Pn,aV as Bn,N as xt,aW as Ht,a3 as Ie,aX as so,aY as ao,aZ as lo,a_ as At,a$ as co,_ as W,a0 as I,b0 as qe,b1 as uo,Y as Fn,b2 as fo,b3 as ho,b4 as po,b5 as st,b6 as mo,b7 as go,b8 as bo,b9 as Se,Z as vo,ba as xo,bb as An,ab as he,I as yo,bc as wo}from"./App-kiKIJop3.js";import{l as yt,h as We,g as L,j as Xt,k as Gt,m as Be,n as To,s as ke,p as ee,i as D,q as wt,t as So,r as Fe,u as Co,v as ko,w as j,x as Oo,y as _o,z as ge,A as at,B as Tt,C as qt,D as lt,c as zt,E as Y,F as zn,G as Dn,H as Io,I as Ze,a as H,J as Dt,K as Ln,L as Wt,M as Mn,N as Po,O as St,P as Bo,Q as Rn,f as Fo,R as Un,S as Ao,T as Lt,U as zo,V as Do,W as Lo,X as Mo,Y as jt,Z as En,_ as Ro,d as $n,o as Nn,$ as Uo,e as Ke,a0 as y,a1 as V,a2 as Qe,a3 as je,a4 as Vn,a5 as Eo}from"./swopCharacters-Cj8gPUyd.js";import{S as $o,G as q}from"./Graphics-DINBJzE5.js";import{_ as Yt,g as No}from"./index-D1TruY1d.js";const Hn=class Ct extends jr{constructor(e){e={...Ct.defaultOptions,...e},super(e),this.enabled=!0,this._state=$o.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=se.from(n)),r&&(s=X.from(r)),new Ct({gpuProgram:i,glProgram:s,...o})}};Hn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let J=Hn;var Vo=`
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
`,Ho=`in vec2 aPosition;
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
`,Xo=`
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
}`;class w extends J{constructor(e){const n=e.gpu,r=Jt({source:Xo,...n}),o=se.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Jt({source:Vo,...i}),a=X.from({vertex:Ho,fragment:s}),l=new _n({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:fe.EMPTY}})}}function Jt(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Mt=`
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
    `,Rt=`
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
	`;class Xn extends w{constructor(){super({gl:{functions:`
                ${Mt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Rt}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Xn.extension={name:"color",type:x.BlendMode};class Gn extends w{constructor(){super({gl:{functions:`
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
            `}})}}Gn.extension={name:"color-burn",type:x.BlendMode};class qn extends w{constructor(){super({gl:{functions:`
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
                `}})}}qn.extension={name:"color-dodge",type:x.BlendMode};class Wn extends w{constructor(){super({gl:{functions:`
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
                `}})}}Wn.extension={name:"darken",type:x.BlendMode};class jn extends w{constructor(){super({gl:{functions:`
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
            `}})}}jn.extension={name:"difference",type:x.BlendMode};class Yn extends w{constructor(){super({gl:{functions:`
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
            `}})}}Yn.extension={name:"divide",type:x.BlendMode};class Jn extends w{constructor(){super({gl:{functions:`
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
            `}})}}Jn.extension={name:"exclusion",type:x.BlendMode};class Zn extends w{constructor(){super({gl:{functions:`
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
                `}})}}Zn.extension={name:"hard-light",type:x.BlendMode};class Kn extends w{constructor(){super({gl:{functions:`
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
            `}})}}Kn.extension={name:"hard-mix",type:x.BlendMode};class Qn extends w{constructor(){super({gl:{functions:`
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
            `}})}}Qn.extension={name:"lighten",type:x.BlendMode};class er extends w{constructor(){super({gl:{functions:`
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
                `}})}}er.extension={name:"linear-burn",type:x.BlendMode};class tr extends w{constructor(){super({gl:{functions:`
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
            `}})}}tr.extension={name:"linear-dodge",type:x.BlendMode};class nr extends w{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"linear-light",type:x.BlendMode};class rr extends w{constructor(){super({gl:{functions:`
                ${Mt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Rt}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}rr.extension={name:"luminosity",type:x.BlendMode};class or extends w{constructor(){super({gl:{functions:`
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
            `}})}}or.extension={name:"negation",type:x.BlendMode};class ir extends w{constructor(){super({gl:{functions:`
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
                `}})}}ir.extension={name:"overlay",type:x.BlendMode};class sr extends w{constructor(){super({gl:{functions:`
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
                `}})}}sr.extension={name:"pin-light",type:x.BlendMode};class ar extends w{constructor(){super({gl:{functions:`
                ${Mt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Rt}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}ar.extension={name:"saturation",type:x.BlendMode};class lr extends w{constructor(){super({gl:{functions:`
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
                `}})}}lr.extension={name:"soft-light",type:x.BlendMode};class cr extends w{constructor(){super({gl:{functions:`
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
                `}})}}cr.extension={name:"subtract",type:x.BlendMode};class ur extends w{constructor(){super({gl:{functions:`
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
                `}})}}ur.extension={name:"vivid-light",type:x.BlendMode};const kt=[];Je.handleByNamedList(x.Environment,kt);async function Go(t){if(!t)for(let e=0;e<kt.length;e++){const n=kt[e];if(n.value.test()){await n.value.load();return}}}let be;function qo(){if(typeof be=="boolean")return be;try{be=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{be=!1}return be}var dr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(dr||{});class Wo{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,p=u.length;d<p;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const jo=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],fr=class hr extends Yr{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...jo,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Go(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...hr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(He(bt,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:m.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=dr.ALL);const{clear:r,clearColor:o,target:i}=e;m.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,m.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Wo(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!qo())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};fr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let pr=fr,Ae;function Yo(t){return Ae!==void 0||(Ae=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??pr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!vt.get().getWebGLRenderingContext())return!1;let r=vt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Ae}let ze;async function Jo(t={}){return ze!==void 0||(ze=await(async()=>{const e=vt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),ze}const Zt=["webgl","webgpu","canvas"];async function Zo(t){let e=[];t.preference?(e.push(t.preference),Zt.forEach(i=>{i!==t.preference&&e.push(i)})):e=Zt.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Jo()){const{WebGPURenderer:a}=await Yt(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-JX6zaWvy.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&Yo(t.failIfMajorPerformanceCaveat??pr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Yt(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-BH4GQAwZ.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const mr="8.6.6";class gr{static init(){globalThis.__PIXI_APP_INIT__?.(this,mr)}static destroy(){}}gr.extension=x.Application;class Ko{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,mr)}destroy(){this._renderer=null}}Ko.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const br=class Ot{constructor(...e){this.stage=new b,e[0]!==void 0&&He(bt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Zo(e),Ot._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return He(bt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Ot._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};br._plugins=[];let vr=br;Je.handleByList(x.Application,vr._plugins);Je.add(gr);var Qo=`in vec2 aPosition;
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
`,ei=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Kt=`struct GlobalFilterUniforms {
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
}`;const xr=class yr extends J{constructor(e){e={...yr.defaultOptions,...e};const n=se.from({vertex:{source:Kt,entryPoint:"mainVertex"},fragment:{source:Kt,entryPoint:"mainFragment"}}),r=X.from({vertex:Qo,fragment:ei,name:"alpha-filter"}),{alpha:o,...i}=e,s=new _n({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};xr.defaultOptions={alpha:1};let ti=xr;class Ye extends Xe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof fe?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(we.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(we.shared.add(this.update,this,Jr.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(fe.from(e[r]));return new Ye(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(fe.from(e[r]));return new Ye(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof fe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(we.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(we.shared.add(this.update,this),this._isConnectedToTicker=!0))}}var De={},Qt;function ni(){if(Qt)return De;Qt=1;var t=Zr(),e=t.mark(i),n=Kr(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,p,h=arguments;return t.wrap(function(T){for(;;)switch(T.prev=T.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){T.next=8;break}return p=d[u],T.delegateYield(o(p),"t0",5);case 5:u++,T.next=2;break;case 8:case"end":return T.stop()}},e)}De.__concat=i;var s=r(i);return De.concat=s,De}var ct,en;function ri(){return en||(en=1,ct=ni().concat),ct}var oi=ri();const $e=No(oi);function ii(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const si=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},ai=({campaign:t,inputStateTracker:e})=>{const n=si(t),r=Qr(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&yt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&yt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:We(o.items.head),heels:i===void 0?void 0:We(i.items.heels)},inputStateTracker:e,campaign:t,events:ii(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},g={pureBlack:new m("#000000"),lightBlack:new m("#38453A"),shadow:new m("#325149"),midGrey:new m("#7F7773"),lightGrey:new m("#BBB1AB"),white:new m("#FBFEFB"),metallicBlue:new m("#366BAE"),pink:new m("#D68ED1"),moss:new m("#9E9600"),redShadow:new m("#805E50"),midRed:new m("#CA7463"),lightBeige:new m("#DAA78F"),highlightBeige:new m("#EBC690"),alpha:new m("#FBD042"),replaceLight:new m("#08A086"),replaceDark:new m("#187558")},Ut=`in vec2 aPosition;
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
`,li=`#version 300 es

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
`;class Ce extends J{constructor(e,n){const r=X.from({vertex:Ut,fragment:li,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const ci=`precision mediump float;
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
`,tn=[g.pureBlack,g.lightBlack];class N extends J{uniforms;constructor(e="white"){const n=X.from({vertex:Ut,fragment:ci,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=tn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=tn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new m(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const M={original:new m("rgb(255, 255, 255)"),basic:new m("rgb(210, 210, 210)"),dimmed:new m("rgb(120, 120, 120)")},R={original:new m("rgb(255, 255, 0)"),basic:new m("hsl(50,65%,70%)"),dimmed:g.redShadow},E={original:new m("rgb(255, 0, 255)"),basic:g.pink,dimmed:new m("hsl(290,35%,38%)")},C={original:new m("rgb(0, 255, 255)"),basic:new m("hsl(183, 50%, 50%)"),dimmed:new m("hsl(183, 50%, 25%)")},$={original:new m("rgb(0, 255, 0)"),basic:g.moss,dimmed:new m("hsl(73,50%,25%)")},Et={white:{basic:{main:M,edges:{towards:C,right:R},hud:{lives:R,dimmed:E,icons:C}},dimmed:{main:M,edges:{towards:$,right:C},hud:{lives:R,dimmed:E,icons:C}}},yellow:{basic:{main:R,edges:{towards:$,right:M},hud:{lives:C,dimmed:E,icons:$}},dimmed:{main:R,edges:{towards:C,right:C},hud:{lives:C,dimmed:E,icons:$}}},magenta:{basic:{main:E,edges:{towards:$,right:C},hud:{lives:M,dimmed:C,icons:R}},dimmed:{main:E,edges:{towards:$,right:C},hud:{lives:M,dimmed:C,icons:R}}},cyan:{basic:{main:C,edges:{towards:E,right:M},hud:{lives:M,dimmed:$,icons:R}},dimmed:{main:C,edges:{towards:E,right:M},hud:{lives:M,dimmed:$,icons:R}}},green:{basic:{main:$,edges:{towards:C,right:R},hud:{lives:M,dimmed:E,icons:C}},dimmed:{main:$,edges:{towards:C,right:R},hud:{lives:M,dimmed:E,icons:C}}}},$t=t=>Et[t.hue][t.shade],wr=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Xt>n?100-Math.ceil((n-e)/(Xt/100)):0},Tr=t=>{const e=100*L.w;return t.totalWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.totalWalkDistance-t.fastStepsStartedAtDistance)/L.w):0};function et(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}const nn={x:.5,y:1},rn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({texture:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s}=t;let a;if(rn(t)?a=ui(t):a=new Xe(ie.textures[t.texture]),e===void 0&&r===void 0)if(rn(t))a.anchor=nn;else{const l=ie.data.frames[t.texture].frame;l.pivot!==void 0?a.pivot=l.pivot:a.anchor=nn}else e!==void 0&&(a.anchor=e),r!==void 0&&(a.pivot=r);return o!==void 0&&(a.x=o),i!==void 0&&(a.y=i),s!==void 0&&(a.filters=s),a.eventMode="static",n===!0&&(a.scale.x=-1),a}};function ui({animationId:t,reverse:e,playOnce:n}){const o=ie.animations[t].map(s=>({texture:s,time:In}));e&&o.reverse();const i=new Ye(o);return i.animationSpeed=eo.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const di=`in vec2 vTextureCoord;
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
`;class tt extends J{constructor(e){const n=Object.keys(e).length,r=X.from({vertex:Ut,fragment:di.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Sr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Cr=t=>Sr(Et[t.color.hue][t.color.shade].main),fi=t=>new tt({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...Cr(t)}),hi=new tt({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),_t=(t,e,n)=>n?new tt(Sr(Et[t.color.hue][t.color.shade].edges[e])):new N($t(t.color).edges[e].original),K=t=>new tt(Cr(t)),ue=to,pi=250,mi=24,gi=56,bi=80,on=112,ve=t=>t==="heels"?1:-1;function*vi(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;ro(o),yield f({texture:o,x:(r+.5-n/2)*Ee.w})}}function xe(t,e){t.removeChildren(),et(vi(e),t)}class xi{#e=new b({label:"HudRenderer"});#r=new N;#o=new N;#n=new N;#a=new N;#i=new N(g.moss);#s=new Ce(g.pureBlack,k.getState().upscale.gameEngineUpscale);#c=new N;#f=[this.#s,this.#a];#l={original:[this.#s,this.#c],colourised:{head:[this.#s,new N(g.metallicBlue)],heels:[this.#s,new N(g.pink)]}};#t={head:{sprite:this.#h("head"),livesText:this.#d({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#u({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#u({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#h("heels"),livesText:this.#d({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#u({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#d({label:"fps",outline:!0})};constructor(){for(const e of Gt)this.#e.addChild(this.#t[e].livesText),this.#e.addChild(this.#t[e].sprite),this.#e.addChild(this.#t[e].shield.container),this.#e.addChild(this.#t[e].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[this.#i],this.#t.fps.y=Ee.h,this.#t.fps.x=Ee.w*2}#u({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new Xe({texture:ie.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#n,y:n?0:8});s.addChild(a);const l=this.#d({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Ee.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#s),{text:l,icon:a,container:s}}#h(e){const n=new Xe(ie.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#d({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?this.#f:this.#a,scale:{x:1,y:e?2:1}})}#g(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+ve("head")*on,this.#t.head.doughnuts.container.y=e.y-Te.h-8,this.#t.heels.carrying.container.y=e.y-Te.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+ve("heels")*on,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}#b(e,n){const r=Be(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,a=s.children.length>0;if(i===null&&a)for(const l of s.children)l.destroy();i!==null&&!a&&s.addChild(f(i.type==="spring"?"spring.released":i.type==="sceneryPlayer"?i.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":i.config.style)),s.filters=n?ue:this.#c,this.#t.heels.bag.icon.filters=o?n?ue:this.#c:this.#r}#v(e){const n=Be(e,"head"),r=n?.hasHooter??!1;this.#t.head.hooter.icon.filters=r?ue:this.#r;const o=n?.doughnuts??0;this.#t.head.doughnuts.icon.filters=o!==0?ue:this.#r,xe(this.#t.head.doughnuts.text,o)}#x(e,n,r){const o=Be(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+ve(r)*bi,xe(i,wr(o)),s.y=n.y,xe(a,o===void 0?0:r==="head"?Tr(o):o.bigJumps),l.y=n.y-24}#p(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#y(e,n,r,o){const i=this.#p(e,o),s=this.#t[o].sprite;i?s.filters=r?ue:this.#c:To(e)?s.filters=this.#o:s.filters=this.#r,s.x=(n.x>>1)+ve(o)*gi,s.y=n.y-Te.h}#w(e,n,r){const i=Be(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+ve(r)*mi,s.y=n.y,xe(s,i??0)}#T(e,n){const r=ke(e),o=$t(r.color);this.#r.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#a.targetColor=o.hud.dimmed[n?"basic":"original"],this.#n.targetColor=o.hud.icons[n?"basic":"original"],this.#o.targetColor=o.hud.dimmed[n?"basic":"original"],this.#c.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#p(e,"head")?this.#l.colourised.head:this.#r:this.#l.original,this.#t.heels.livesText.filters=n?this.#p(e,"heels")?this.#l.colourised.heels:this.#r:this.#l.original}#m=Number.NEGATIVE_INFINITY;#S(){if(no(k.getState())){if(performance.now()>this.#m+pi){const e=we.shared.FPS;xe(this.#t.fps,Math.round(e)),this.#i.targetColor=e>56?g.moss:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#m=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick({gameState:e,screenSize:n,colourise:r}){this.#T(e,r);for(const o of Gt)this.#w(e,n,o),this.#y(e,n,r,o),this.#x(e,n,o);this.#g(n),this.#v(e),this.#b(e,r),this.#S()}get container(){return this.#e}destroy(){this.#e.destroy()}}const sn={movementType:"vel",vels:{gravity:_}},yi=(t,e,n)=>{if(!ee(t))return sn;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=So[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?D("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-wt*n,-a)}}}:sn:{movementType:"vel",vels:{gravity:{z:Math.max(o-wt*n,-a)}}}},Pe={movementType:"steady"},Le=t=>{const n=t/Co*In;return(t+.5*wt*n**2)/n},wi={head:Le(Fe.head),headOnSpring:Le(Fe.head+L.h),heels:Le(Fe.heels),heelsOnSpring:Le(Fe.heels+L.h)},Ti=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return wi[`${n}${e?"OnSpring":""}`]},kr=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=n!==null&&D("teleporter")(n);if(!(r.currentActionPress("jump")!=="released"&&n!==null&&!o))return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Pe;const s=D("spring")(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Ti(t,s)}},stateDelta:{action:"moving",jumped:!0}}},Si=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Oe(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return O(n,l)},an={movementType:"vel",vels:{walking:_}},Or=(t,e,n)=>{const r=Ci(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Oe(r.vels.walking);r.stateDelta=Object.assign(r.stateDelta||{},{walkDistance:o===0?0:t.state.walkDistance+o*n}),t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta=Object.assign(r.stateDelta||{},{totalWalkDistance:t.state.totalWalkDistance+o*n}))}return r},Ci=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,vels:{walking:d,gravity:p}}}=t,h=n===t.id,v=h?e.currentActionPress("jump"):"released",T=h?e.directionVector:_,B=a===null&&p.z<0,U=o==="head"&&Tr(t.state)>0&&a!==null,P=o==="headOverHeels"?B?"head":"heels":U?"heels":o,S=s?l:T,F=j[P];if(c!==null||i==="death")return an;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Pt(d,O(d,ko*r))}}:an;if(v!=="released"){const le=ae(Bt(S,oe)?l:S),Wr=D("spring")(a)?1:Oo;return{movementType:"vel",vels:{walking:O({...le,z:0},F*Wr)},stateDelta:{facing:le}}}}return Oe(S)!==0?B?{movementType:"vel",vels:{walking:O({...S,z:0},F)},stateDelta:{facing:S,action:"falling"}}:{movementType:"vel",vels:{walking:Si({vel:d,acc:_o[P],deltaMS:r,maxSpeed:F,unitD:S,minSpeed:0})},stateDelta:{facing:S,action:"moving"}}:u>0&&u<1?{movementType:"position",posDelta:O(l,1-u),stateDelta:{action:B?"falling":"idle",walkDistance:0}}:{movementType:"vel",vels:{walking:_},stateDelta:{action:B?"falling":"idle"}}},ln=L.h,Me=.001,ki=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=at**2/(2*ge);if(n==="up"){if(e<=r)return Math.max(Me,Math.sqrt(2*ge*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(Me,Math.sqrt(2*ge*o))}else return at}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-Me,-Math.sqrt(2*ge*o))}else return e<=r?Math.min(-Me,-Math.sqrt(2*ge*Math.max(e,0))):-at};function Oi({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}},o,i){const s=t*ln,a=e*ln,l=ki({currentAltitude:r-s,direction:n,totalDistance:a-s});if(Number.isNaN(l))throw new Error("velocity is NaN");const c=r<=s?"up":r>=a?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:l}},stateDelta:{direction:c}}}const _i=.5,me=(t,e,n,r)=>{const o=n.x+r.x-t.x,i=n.y+r.y-t.y,s=n.z+r.z-t.z,a=t.x+e.x-n.x,l=t.y+e.y-n.y,c=t.z+e.z-n.z,u=Math.abs(o)<Math.abs(a)?o:-a,d=Math.abs(i)<Math.abs(l)?i:-l,p=Math.abs(s)<Math.abs(c)?s:-c,h=Math.abs(u),v=Math.abs(d),T=Math.abs(p)*_i;return h<v&&h<T?{x:u,y:0,z:0}:v<T?{x:0,y:d,z:0}:{x:0,y:0,z:p}},cn=(t,e)=>({x:t.x>0?e.state.position.x:e.state.position.x+e.aabb.x,y:t.y>0?e.state.position.y:e.state.position.y+e.aabb.y,z:t.z>0?e.state.position.z:e.state.position.z+e.aabb.z}),un={stopAutowalk:0,portal:0,wall:0,doorLegs:0,sceneryPlayer:0,bubbles:0,block:1,barrier:1,floor:1,floorEdge:1,hushPuppy:1,teleporter:1,doorFrame:1,lift:2,movableBlock:2,portableBlock:2,slidingBlock:2,spring:2,ball:3,joystick:3,switch:3,charles:3,conveyor:3,head:4,heels:4,headOverHeels:4,pickup:8,firedDoughnut:9,slidingDeadly:10,moveableDeadly:10,deadlyBlock:10,monster:10},_r=(t,e)=>un[t.type]-un[e.type],Ii=(t,e)=>e.toSorted((n,r)=>{const o=_r(n,r);if(o!==0)return o;const i=Ge(t,cn(t,n)),s=Ge(t,cn(t,r));return i-s});function Ir({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;wr(n)>0||(e.state.action="death",e.state.expires=t+Tt)}const Pi=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=lt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=lt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=qt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=lt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.totalWalkDistance);break}case"jumps":{const s=qt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":k.dispatch(io(r.config.page));break;case"reincarnation":break;case"crown":{k.dispatch(oo(r.config.planet));break}default:r.config}},Bi=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Ge(i,r)<=0||zt({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},Fi=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=Ft(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):0,y:i==="y"?-Math.abs(e.x):0,z:0}:{x:i==="x"?Math.abs(e.y):0,y:i==="y"?Math.abs(e.x):0,z:0};t.state.position=z(t.state.position,s)};function Ai({movingItem:t}){t.state.autoWalk=!1}const G=(t,...e)=>D(...e)(t.touchedItem),ye=(t,...e)=>D(...e)(t.movingItem),Pr=t=>Y(t.movingItem),zi=t=>Y(t.touchedItem),Di=t=>zn(t.touchedItem),dn=t=>{switch(!0){case G(t,"stopAutowalk"):Ai(t);break;case Di(t):Ir(t);break;case G(t,"portal"):Bi(t);break;case G(t,"pickup"):Pi(t);break;case G(t,"doorFrame"):Fi(t);break}},Br=t=>t[Math.floor(Math.random()*t.length)],Q=Object.freeze({movementType:"vel",vels:{walking:_}}),nt=t=>Dn(t)?j[t.config.which]:j[t.type],Li=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=j.homingBot;if(!Bt(e,oe))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=_e(l.state.position,t);if(Math.abs(c.y)<2)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<2)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},Fr=(t,e)=>{const{items:{head:n,heels:r}}=e;if(e.items.headOverHeels!==void 0)return e.items.headOverHeels;const o=n===void 0?void 0:Ht(n.state.position,t),i=r===void 0?void 0:Ht(r.state.position,t);return o===void 0?r:i===void 0||o<i?n:r},Mi=(t,e,n,r)=>{const{state:{position:o,standingOn:i}}=t;if(i===null)return Q;const s=Fr(o,e);if(s===void 0)return Pe;const a=_e(s?.state.position,o),l=Math.abs(a.x)<Math.abs(a.y)?"x":"y",c=Math.abs(a[l])>1?l:Pn(l),u=nt(t),d={..._,[c]:a[c]>0?u:-u};return{movementType:"vel",vels:{walking:d},stateDelta:{facing:ae(d)}}},Ri=(t,e,n,r)=>{const{state:{position:o,standingOn:i}}=t;if(i===null)return Q;const s=Fr(o,e);if(s===void 0)return Q;const a=s.state.position,l=L.w*3;if(!(o.x>a.x-l&&o.x<a.x+l&&o.y>a.y-l&&o.y<a.y+l))return Q;const u=_e(s?.state.position,o),d=nt(t),p=(1+Math.sqrt(2))/2,h=d*p,v=O({...u,z:0},h/Bn(u));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:ae(v)}}},ut=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return Q;if(!(Ie(i,_)||Math.random()<r/1e3))return Pe;const l=Br(o);return{movementType:"vel",vels:{walking:O(xt[l],nt(t))},stateDelta:{facing:xt[l]}}},Ui=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?Q:Bt(i,oe)?{movementType:"vel",vels:{walking:O(o,nt(t))}}:Pe},Ei=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Br([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},dt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},{touchDurationBeforeTurn:o,turnStrategy:i})=>{const{state:{position:s,vels:{walking:a},activated:l},aabb:c}=t;if(!l||(t.state.durationOfTouch+=r,t.state.durationOfTouch<o))return;const u=me(s,c,e,n);if(u.x===0&&u.y===0)return;const d=Ei(a,u,i);t.state.vels.walking=d,t.state.facing=ae(d),t.state.durationOfTouch=0},$i=({movingItem:t})=>{t.state.vels.walking=_},Ni=(t,e,n,r)=>{if(!t.state.activated||Dn(t)&&t.state.busyLickingDoughnutsOffFace)return Q;switch(t.config.movement){case"patrol-randomly-diagonal":return ut(t,e,n,r,lo);case"patrol-randomly-xy8":return ut(t,e,n,r,ao);case"patrol-randomly-xy4":return ut(t,e,n,r,so);case"towards-tripped-on-axis-xy4":return Li(t,e);case"towards-on-shortest-axis-xy4":return Mi(t,e);case"back-forth":case"clockwise":return Ui(t);case"unmoving":case"free":return Q;case"towards-when-in-square-xy8":return Ri(t,e);default:throw t.config,new Error("this should be unreachable")}},Vi=t=>{const{movingItem:e,touchedItem:n}=t;if(ee(n,e))switch(e.config.movement){case"patrol-randomly-xy4":dt(t,{touchDurationBeforeTurn:150,turnStrategy:"perpendicular"});break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":dt(t,{touchDurationBeforeTurn:150,turnStrategy:"opposite"});break;case"clockwise":dt(t,{touchDurationBeforeTurn:150,turnStrategy:"clockwise"});break;case"towards-tripped-on-axis-xy4":$i(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Hi=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of At(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&k.dispatch(co(o.path))}},Xi=({movingItem:t,touchedItem:e})=>{if(!ee(t))return;const{state:{position:n},aabb:r}=e,o=me(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=ae(o),s=O(i,-j.ball);return e.state.vels.sliding=s,!1},Gi=({movingItem:t,touchedItem:e})=>{if(!ee(e))return;const n=t.state.vels.sliding;if(Ie(n,_))return;const{state:{position:r},aabb:o}=t,i=me(e.state.position,e.aabb,r,o);return Ge(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},qi=2*Io,Ar=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+qi,positionDelta:n})},Wi=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Pt(r.state.position,o),z:0};if(!Ie(s,_))for(const a of r.state.stoodOnBy)Ar(a,e,s)}},ji=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=me(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=ae(a);for(const c of o){const u=e.items[c],d=O(l,-j.charles*r);u.state.facing=d,Ar(u,e,d)}},Yi=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},fn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>Yi(t,e,n,r),hn=.001,Nt=(t,e,n=.001)=>{if(!ee(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:Ze({state:{position:z(t.state.position,{x:0,y:0,z:-hn})},aabb:{...t.aabb,z:n+hn},id:t.id},{state:{position:z(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},zr=(t,e)=>{const r=[...W(e).filter(i=>Nt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=_r(s,i);return a<0||a===0&&fn(t,s)>fn(t,i)?s:i})},pn=t=>H(t.movingItem)&&Nt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Dr=(t,e)=>{let n=_;for(const r of e){if(r.movementType==="position"&&(n=z(n,r.posDelta)),r.movementType==="vel"&&(H(t)||D("lift")(t)))for(const[i,s]of At(r.vels)){const a={..._,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},mn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&Y(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&pn(t)){if(pn(t)&&Pr(t)){Dt({above:t.movingItem,below:t.touchedItem});const n=[kr(t.movingItem,t.gameState),Or(t.movingItem,t.gameState,t.deltaMS)];Dr(t.movingItem,n)}Ln(t)}};function Ji(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Zi=t=>{Pr(t)&&dn(t),zi(t)&&dn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),G(t,...Wt)&&Xi(t),ye(t,...Wt)&&Gi(t),(ye(t,"monster")&&G(t,"firedDoughnut")||ye(t,"firedDoughnut")&&G(t,"monster"))&&Ji(t),(ye(t,"monster")||ye(t,"movableBlock"))&&Vi(t),G(t,"switch")&&Hi(t),G(t,"joystick")&&ji(t),t.touchedItem.state.disappear&&mn(t),t.movingItem.state.disappear&&ee(t.touchedItem,t.movingItem)&&mn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Vt=({subjectItem:t,posDelta:e,gameState:n,room:r,pusher:o,deltaMS:i,forceful:s=D("lift")(t)&&o===void 0,recursionDepth:a=0})=>{if(Ie(e,_))return;if(a>16)throw new Error("this probably means a non-terminating issue");const{state:{position:l}}=t;t.state.position=z(l,e),H(t)&&(t.state.actedOnAt=r.roomTime);const c=Ii(e,Mn(t,I(r.items)));for(const u of c){if(!Ze(t,u))continue;if(o!==u&&Zi({movingItem:t,touchedItem:u,movementVector:Pt(t.state.position,l),gameState:n,deltaMS:i,room:r}),r.items[t.id]===void 0)return;if(r.items[u.id]===void 0||!ee(u,t)||!ee(t))continue;const d=me(t.state.position,t.aabb,u.state.position,u.aabb);if(H(u)&&u!==o){const p=s||Po(u)?-1:-.5,h=O(d,p);if(t.state.position=z(t.state.position,d,h),Vt({subjectItem:u,posDelta:h,pusher:t,gameState:n,room:r,deltaMS:i,forceful:s,recursionDepth:a+1}),r.items[u.id]===void 0)continue;t.state.position=z(t.state.position,me(t.state.position,t.aabb,u.state.position,u.aabb))}else t.state.position=z(t.state.position,d);H(t)&&d.z>0&&(t.state.standingOn===null||!c.includes(t.state.standingOn))&&(St(t),Dt({above:t,below:u}))}};function Ki(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&D("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:Tt}}}:Pe;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return zt({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Tt}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const gn={movementType:"vel",vels:{movingFloor:_}},Qi=(t,e,n)=>{if(Y(t)&&t.state.teleporting!==null)return gn;const{state:{standingOn:r}}=t;if(r===null||!D("conveyor")(r))return gn;const{config:{direction:o}}=r,s=D("heels")(t)&&t.state.action==="moving"&&qe(t.state.facing)===uo(o)?j.heels:Bo;return{movementType:"vel",vels:{movingFloor:O(xt[o],s)}}},es=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=W(I(e.items)).filter(Rn),u=s===null?ns(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}ts(e,i,u)}else{if(t.state.standingOn===null||!Lr(t,I(e.items)))return;const d=Fo({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Vt({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r}),i.carrying=null}},ts=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Un({room:t,item:n})},ns=(t,e)=>zr(t,W(I(e.items)).filter(Rn)),Lr=(t,e)=>{const n={position:z(t.state.position,{z:L.h})},r=Mn({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(!H(o)||!Lr(o,e))return!1;return!0};function*rs(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const os=L.w*Math.sqrt(2)+1,is=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,p=500,h=ae(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+p<c){const v={type:"firedDoughnut",...Ao,config:Fn,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:z(u,O(h,os),t.type==="headOverHeels"?{z:L.h}:_),vels:{fired:O(h,j.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Lt({room:e,item:v}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},ss=2;function*as(t,e,n,r){H(t)&&(yield yi(t,n,r),yield Qi(t),yield*rs(t,e)),Y(t)&&(yield Or(t,n,r),t.id===n.currentCharacterName&&(yield Ki(t,n,r),yield kr(t,n),zo(t)&&es(t,e,n,r),Do(t)&&is(t,e,n))),Lo(t)&&(yield Oi(t)),Mo(t)&&(yield Ni(t,e,n,r))}const ls=(t,e,n)=>{H(t)&&t.state.standingOn!==null&&t.state.standingOn.state.disappear==="onStand"&&Ln({touchedItem:t.state.standingOn,gameState:n,room:e}),Y(t)&&t.state.standingOn!==null&&t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0)},cs=(t,e,n,r)=>{Y(t)&&t.state.standingOn!==null&&zn(t.state.standingOn)&&Ir({gameState:n,room:e,movingItem:t,touchedItem:t.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...as(t,e,n,r)];ls(t,e,n);let i=Dr(t,o);(H(t)||D("lift")(t)||D("firedDoughnut")(t))&&(i=z(i,...W(I(t.state.vels)).map(l=>O(l,r))));const s=Math.ceil(Oe(i)/ss),a=O(i,1/s);for(let l=0;l<s;l++)Vt({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r})},us=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,re(t,e);const u=jt(e)[c],d=pe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:We(u)};return}if(t.entryState.headOverHeels!==void 0){re(t,e);const c=pe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=jt(e);if(re(t,c),re(t,u),Ze(c,u)){const d=En({head:c,heels:u});re(t,d,"heels");const p=pe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:p},t.entryState={headOverHeels:We(d)};return}else{const d=pe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},pe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=yt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Lt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Ro(o,t);return o},re=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},ds=(t,e)=>{const n=$n(t,Nn(e.type));if(e.state.lives--,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];re(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=En({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});re(t,a);const l=pe({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Lt({room:r,item:e});return}else{const s=pe({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},fs=(t,e)=>{e.type==="headOverHeels"?us(t,e):ds(t,e)},hs=t=>{for(const e of I(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){St(n);continue}if(!Nt(n,e)){St(n);const r=zr(n,I(t.items));r!==void 0&&Dt({above:n,below:r})}}},ps=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ms=(t,e,n)=>{for(const r of I(t.items))!H(r)||t.roomTime===r.state.actedOnAt||fo(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=ho(r.state.position),n.add(r))},gs=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},bs=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++)n=new Set($e(n,bn(t,e)));return n}return bn(t,e*t.gameSpeed)},bn=(t,e)=>{const{inputStateTracker:n}=t,r=ke(t),o=Object.fromEntries(W(At(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Uo(t);for(const a of I(r.items))ps(a,r)&&(Un({room:r,item:a}),Y(a)&&fs(t,a));const i=Object.values(r.items).sort(gs);for(const a of i){if(Ke(t).state.action==="death")break;r.items[a.id]!==void 0&&cs(a,r,t,e)}hs(r);const s=new Set(W(I(r.items)).filter(a=>o[a.id]===void 0||!Ie(a.state.position,o[a.id])));return Wi(s,r,o),ms(r,o,s),vs(t,r,e),s},vs=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Ke(t);if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=$n(t,Nn(r.type));i!==void 0&&(i.state.gameTime+=n)}},vn=(t,e)=>{const n=y(t),r=y(z(t,{x:e.x,z:e.z})),o=y(z(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},ft=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,xs=(t,e,n,r)=>{const o=vn(t,e),i=vn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=ft(s,a,l,c),d=o.topRight.y-o.topRight.x/2,p=o.bottomCentre.y-o.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,v=i.bottomCentre.y-i.bottomCentre.x/2,T=ft(d,p,h,v),B=o.topLeft.y+o.topLeft.x/2,U=o.bottomCentre.y+o.bottomCentre.x/2,P=i.topLeft.y+i.topLeft.x/2,S=i.bottomCentre.y+i.bottomCentre.x/2,F=ft(B,U,P,S);return u&&T&&F},ys=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!xs(n,r,o,i))return 0;for(const s of po){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return xn(e)-xn(t)},xn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ne extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const ws=t=>{const e=Ts(t);let n=e.length,r=n;const o=new Array(n),i={},s=Ss(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Ne([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,p=Array.from(d);if(c=p.length){u.add(l);do{const h=p[--c];try{a(h,s.get(h),u)}catch(v){throw v instanceof Ne?v.hasClosedCycle?v:new Ne([l,...v.cyclicDependency],v.cyclicDependency.includes(l)):v}}while(c);u.delete(l)}o[--n]=l}};function Ts(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Ss(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const yn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Re=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Cs=(t,e=new Set(I(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Re(n,o,s);for(const o of e)if(o.renders)for(const i of I(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=ys(o,i);if(yn(r,o,i),s===0){Re(n,o.id,i.id),Re(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;yn(n,a,l),Re(n,l,a)}return n},Mr=(t,e,n=3)=>{try{return{order:ws(t),impossible:!1}}catch(r){if(r instanceof Ne){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),{order:Mr(t,e,n-1).order,impossible:!0}}else throw r}},ks=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Os=(t,e,n)=>{const o=ie.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ie.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},Ue=t=>A(()=>f(t)),A=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,previousRendering:null}),renderProps:Fn}:"no-update";function*_s({config:{direction:t,inHiddenWall:e,height:n}},r){const o=Ft(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const c=f({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...st(a,{y:-L.h*n})});c.filters=_t(r,o==="x"?"towards":"right",!0),yield c}}else{yield f({pivot:{x:i,y:9},texture:"generic.door.legs.base",...st(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...st(a,{y:-l*L.h})})}}yield*s(V({...oe,[o]:1})),yield*s(oe),e||(yield f({pivot:{x:16,y:L.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...V({...oe,[o]:1})}))}const Is=A(({item:t,room:e})=>et(_s(t,e),new b({filters:K(e)})));function*Ps({config:{direction:t,part:e}},n){const r=Ft(t);yield f({texture:Os(n,r,e),filter:K(n)})}const Bs=A(({item:t,room:e})=>et(Ps(t,e))),ht={animationId:"bubbles.cold"},te=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},pt=({name:t,action:e,facingXy4:n,teleporting:r,highlighted:o})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r!==null){if(r.phase==="out")return{animationId:`${t}.fadeOut`};if(r.phase==="in")return{animationId:`${t}.fadeOut`}}const i=o?new Ce(t==="head"?g.metallicBlue:g.pink,k.getState().upscale.gameEngineUpscale):void 0;return e==="moving"?{animationId:`${t}.walking.${n}`,filter:i}:e==="falling"&&t==="head"&&(n==="towards"||n==="right")?{texture:`head.falling.${n}`,filter:i}:t==="head"&&(n==="towards"||n==="right")?{animationId:`head.idle.${n}`,filter:i}:{texture:`${t}.walking.${n}.2`,filter:i}},wn=({gameTime:t,switchedToAt:e})=>e+500>t,mt=({item:t,currentlyRenderedProps:e,previousRendering:n})=>{const{type:r,state:{action:o,facing:i,teleporting:s}}=t,a=qe(i),l=t.type==="headOverHeels"?wn(t.state.head):wn(t.state),c=Oe(i);return e===void 0||e.action!==o||e.facingXy4!==a||e.teleportingPhase!==(s?.phase??null)||e.highlighted!==l?{container:r==="headOverHeels"?te({top:pt({name:"head",action:o,facingXy4:a,teleporting:s,highlighted:l}),bottom:pt({name:"heels",action:o,facingXy4:a,teleporting:s,highlighted:l})}):f(pt({name:r,action:o,facingXy4:a,teleporting:s,highlighted:l})),renderProps:{action:o,facingXy4:a,teleportingPhase:s?.phase??null,highlighted:l,walkSpeed:c}}:o==="moving"&&e.walkSpeed!==c?(n.animationSpeed=c*mo,{container:n,renderProps:{action:o,facingXy4:a,teleportingPhase:s?.phase??null,highlighted:l,walkSpeed:c}}):"no-update"};function*Fs(t,e,n){for(const r of go){const o=Pn(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let a=0;a<=t.size[r];a++){let l;if(t.walls[s][a]==="none"){const c=W(I(t.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===a||u.position[r]+1===a)&&u.position[o]===t.size[o]);c===void 0?l="none":c.position.z===0?l="behind-door":l="corner-on-floor"}else l="corner-on-floor";l!=="none"&&(yield je({[r]:a-e[r],[o]:t.size[o]+(n[i]?.5:0)+(l==="behind-door"?.5:0)},f(l==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const Rr=({blockXExtent:t,blockYExtent:e,type:n})=>{const r=new b({label:"towards"});for(let i=0;i<=t;i+=.5){const s={x:i,y:0},a={x:7,y:0};r.addChild(je(s,f({pivot:a,texture:`${n}.towards`})))}const o=new b({label:"right"});for(let i=0;i<=e;i+=.5)o.addChild(je({x:0,y:i},f({pivot:{x:0,y:0},texture:`${n}.right`})));return{right:o,towards:r}},As=A(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Qe(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:p}}=e,h=new b({label:`floor(${e.id})`});if(d!=="none"){const U=d==="deadly"?`generic${p==="dimmed"?".dark":""}.floor.deadly`:`${d}${p==="dimmed"?".dark":""}.floor`,P=new b;for(let F=-1;F<=o+2;F++)for(let Z=F%2-1;Z<=i+2;Z+=2)P.addChild(je({x:F+(s.right?-.5:0),y:Z+(s.towards?-.5:0)},f({texture:U})));et(Fs(e,{x:n,y:r},s),P);const S=new q().poly([oe,V({x:c,y:0}),V({x:c,y:u}),V({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});P.addChild(S),P.filters=K(e),P.mask=S,h.addChild(P)}const{towards:v,right:T}=Rr({blockXExtent:c,blockYExtent:u,type:"floorOverdraw"});h.addChild(v),h.addChild(T);const B=new q().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);return h.addChild(B),h.mask=B,h.y=-t.aabb.z,h.cacheAsTexture(!0),h}),zs=A(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=Qe(t.roomJson),c=i-r,u=s-o,d=new b({label:"floorEdge"}),p=new q({label:"overDrawToHideFallenItems"}).poly([V({x:c,y:0}),V({x:0,y:0}),V({x:0,y:u}),{...V({x:0,y:u}),y:999},{...V({x:c,y:0}),y:999}],!0).fill(0);p.y=8,d.addChild(p);const{towards:h,right:v}=Rr({blockXExtent:c,blockYExtent:u,type:"floorEdge"}),T=!e&&n.colourise;h.filters=_t(t,"towards",T),v.filters=_t(t,"right",T),d.addChild(h),d.addChild(v);const B=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(B),d.mask=B,d.cacheAsTexture(!0),d}),Ds=(t,e,n)=>e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,gt=g.moss,Tn=A(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),Ls={head:mt,heels:mt,headOverHeels:mt,doorFrame:Bs,doorLegs:Is,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:A(({item:{config:{side:t,style:e}},room:n})=>{if(t==="right"||t==="towards")throw new Error("this wall should be non-rendering");return f({texture:ks(n.planet,e,t,n.color.shade==="dimmed"),y:1,pivot:t==="away"?{x:Se.w,y:Se.h+1}:{x:0,y:Se.h+1},filter:K(n)})}),barrier:A(({item:{config:{axis:t}}})=>f({texture:`barrier.${t}`})),deadlyBlock:A(({item:{config:{style:t}},room:e})=>f({texture:t,filter:t==="volcano"?K(e):void 0})),slidingDeadly:Tn,slidingBlock:Tn,block({item:{config:{style:t},state:{disappear:e}},room:n,currentlyRenderedProps:r}){return r===void 0||r.disappear!==e?{container:f({texture:Ds(n.color.shade==="dimmed",t,e!==null),filter:t==="organic"?K(n):void 0}),renderProps:{disappear:e}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?bo(k.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t},state:{stoodOnBy:e}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new b,s=vo(t);return i.addChild(f(r?{animationId:`conveyor.${s}`,reverse:t==="towards"||t==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:A(()=>{const t=new b,e={x:Te.w/2,y:Te.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({texture:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=W(t).find(Y)!==void 0;return e===void 0||n!==e.flashing?{container:n?new b({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:A(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({texture:`crown.${t.planet}`});const r={shield:"bunny",jumps:"bunny",fast:"bunny","extra-life":"bunny",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:K(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:A(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=qe(t);return e===void 0||n!==e.facingXy4?{container:te({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?hi:o?void 0:fi(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=qe(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({texture:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({texture:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{texture:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?te({top:{texture:`${t.which}.${a}`,filter:s||K(n)},bottom:ht}):f({texture:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:te({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{texture:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({texture:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:te({top:ht,filter:s}),renderProps:l};case"emperorsGuardian":return{container:te({top:"ball",bottom:ht,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:Ue("joystick"),movableBlock:A(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new Ce(gt,k.getState().upscale.gameEngineUpscale):void 0;return{container:f({texture:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new Ce(gt,k.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new Ce(gt,k.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?te({top:{texture:`head.walking.${e}.2`,filter:i},bottom:{texture:`heels.walking.${e}.2`,filter:i}}):f({texture:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Ue("hushPuppy"),bubbles:A(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:Ue({animationId:"bubbles.doughnut"}),ball:Ue("ball"),floor:As,floorEdge:zs},Ms=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class Rs{#e;#r;#o=void 0;#n;#a;constructor(e,n,r){this.#e=e,this.#r=n,this.#n=new b({label:`ItemAppearanceRenderer ${e.id}`}),Ms(e,this.#n,r),this.#a=Ls[e.type]}destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#r,currentlyRenderedProps:this.#o,displaySettings:e.displaySettings,previousRendering:this.#n.children.at(0)??null,onHold:e.onHold});n!=="no-update"&&(this.#o=n.renderProps,this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container))}get container(){return this.#n}}const Sn=(t,e)=>{const n=new q().poly([y({}),y({x:t.x}),y({x:t.x,y:t.y}),y({y:t.y})]).poly([y({}),y({z:t.z}),y({y:t.y,z:t.z}),y({y:t.y})]).poly([y({x:t.x}),y({x:t.x,z:t.z}),y(t),y({x:t.x,y:t.y})]).poly([y({z:t.z}),y({x:t.x,z:t.z}),y({x:t.x,y:t.y,z:t.z}),y({y:t.y,z:t.z})]).stroke({width:.5,color:e,alpha:1});return n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.fill({color:"transparent"})}),n},Us={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Es{#e;constructor(e){const n=Us[e.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${e.id}`}),D("portal")(e)){const r=y(e.config.relativePoint);this.#e.addChild(new q().circle(r.x,r.y,5).stroke(n)),this.#e.addChild(new q().circle(r.x,r.y,2).fill(n))}this.#e.addChild(new q().circle(0,0,2).fill(n)),this.#e.addChild(Sn(e.aabb,n)),e.renderAabb&&this.#e.addChild(Sn(e.renderAabb,"rgba(184, 184, 255)"))}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class $s{#e;#r;#o;constructor(e,n){this.#r=new b({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#o=n,this.#e=e,this.#n()}#n(){const e=Vn(this.#e.state.position);this.#r.x=e.x,this.#r.y=e.y}tick(e){this.#o?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#r.destroy({children:!0}),this.#o?.destroy()}get container(){return this.#r}}class Ns{constructor(e,n){this.item=e,this.room=n;const{userSettings:{displaySettings:{showShadowMasks:r}}}=k.getState();if(r||(this.#e.filters=new ti({alpha:.5})),e.shadowMask.spriteOptions){const o=f(e.shadowMask.spriteOptions);e.shadowMask.relativeTo==="top"&&(o.y=-e.aabb.z),this.#e.addChild(o),r||(this.#e.mask=o)}this.#e.addChild(this.#r)}#e=new b({label:"ItemShadowRenderer"});#r=new b({label:"shadows"});#o={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=W(I(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:Eo}},a=Object.groupBy(i,l=>{const c=this.#o[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":Ze(s,l)?c?"update":"create":"noShadow"});for(const l of $e(a.keepUnchanged,a.update))this.#o[l.id].renderedOnProgression=n;for(const l of $e(a.create)){const c=f(l.shadowCastTexture);c.label=l.id,this.#r.addChild(c),this.#o[l.id]={sprite:c,renderedOnProgression:n}}for(const l of $e(a.create,a.update)){const{sprite:c}=this.#o[l.id],u=y({..._e(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of xo(this.#o))u!==n&&(c.destroy(),delete this.#o[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const Vs=t=>t.shadowMask!==void 0,Hs=(t,e,n)=>{const r=k.getState(),{userSettings:{displaySettings:{showBoundingBoxes:o,colourise:i}}}=r,s=An(r),a=o==="all"||o==="non-wall"&&t.type!=="wall",l=[];return t.renders&&(l.push(new Rs(t,e,n)),!s&&i&&Vs(t)&&l.push(new Ns(t,e))),a&&l.push(new Es(t)),l.length===0?"not-needed":new $s(t,new Xs(l))};class Xs{#e;#r=new b({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#r.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#r}}const ce=.33,Gs=16,It=Se.h-Se.w/2,qs=j.heels,Ws=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=Qe(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Gs-i.y-Math.abs(c/2)},d=u.x+a<0,p=u.x+l>n.x,h=u.y+s-It<0;return(v,T,B)=>{const U=Vn(v.state.position),P=z(U,u),S={x:d&&P.x<n.x*ce?Math.min(-a,n.x*ce-U.x):p&&P.x>n.x*(1-ce)?Math.max(n.x-l,n.x*(1-ce)-U.x):u.x,y:h&&P.y<n.y*ce?n.y*ce-U.y:u.y};if(B)e.x=S.x,e.y=S.y;else{const F=qs*T,Z=_e(e,S),le=Bn(Z);if(le>F){const it={x:Z.x/le,y:Z.y/le};e.x-=it.x*F,e.y-=it.y*F}else e.x=S.x,e.y=S.y}}},js=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=Qe(t);return new q().rect(e+r.x,o-It,n-e,r.y-o+It).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Cn{#e=new b({label:"items"});#r=new b({label:"floorEdge"});#o=new b({children:[this.#e,this.#r]});#n=!1;#a=new Map;#i=new Map;#s;#c;#f;#l;#t;#u;constructor(e,n,r){const{userSettings:{displaySettings:o},upscale:i}=k.getState();this.#c=o,this.#f=i,this.#l=n,this.#t=e,this.#u=r,this.#o.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&o.colourise,n.color),o.showBoundingBoxes!=="none"&&this.#o.addChild(js(n.roomJson)),this.#s=Ws(n,this.#o,i.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?ue:new N($t(n).main.original)}#h(e){for(const n of I(this.#l.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Hs(n,this.#l,this.#t),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#r:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#l.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#d(e){const{order:n}=Mr(Cs(this.#l.items,e.movedItems,this.#a),this.#l.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(I(this.#l.items))};this.#s(Ke(this.#t),n.deltaMS,!this.#n),this.#h(n),(!this.#n||n.movedItems.size>0)&&this.#d(n),this.#n=!0}destroy(){this.#o.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#c}get upscale(){return this.#f}get everRendered(){return this.#n}get container(){return this.#o}get roomState(){return this.#l}get paused(){return this.#u}}var rt=`in vec2 aPosition;
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
`,ot=`struct GlobalFilterUniforms {
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
}`,Ys=`precision highp float;
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
`,Js=`struct CRTUniforms {
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
}`,Zs=Object.defineProperty,Ks=(t,e,n)=>e in t?Zs(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ve=(t,e,n)=>(Ks(t,typeof e!="symbol"?e+"":e,n),n);const Ur=class Er extends J{constructor(e){e={...Er.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:Js,entryPoint:"mainFragment"}}),r=X.from({vertex:rt,fragment:Ys,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ve(this,"uniforms"),Ve(this,"seed"),Ve(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ve(Ur,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Qs=Ur;var ea=`
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
}`,ta=`struct KawaseBlurUniforms {
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
}`,na=`
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
`,ra=`struct KawaseBlurUniforms {
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
}`,oa=Object.defineProperty,ia=(t,e,n)=>e in t?oa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ne=(t,e,n)=>(ia(t,typeof e!="symbol"?e+"":e,n),n);const $r=class Nr extends J{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(He("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Nr.DEFAULT_OPTIONS,...n};const r=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:n?.clamp?ra:ta,entryPoint:"mainFragment"}}),o=X.from({vertex:rt,fragment:n?.clamp?na:ea,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ne(this,"uniforms"),ne(this,"_pixelSize",{x:0,y:0}),ne(this,"_clamp"),ne(this,"_kernels",[]),ne(this,"_blur"),ne(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=he.getSameSizeTexture(n);let c=n,u=l,d;const p=this._quality-1;for(let h=0;h<p;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),he.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};ne($r,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let sa=$r;var aa=`in vec2 vTextureCoord;
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
`,la=`struct AdvancedBloomUniforms {
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
`,ca=`
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
`,ua=`struct ExtractBrightnessUniforms {
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
`,da=Object.defineProperty,fa=(t,e,n)=>e in t?da(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Vr=(t,e,n)=>(fa(t,typeof e!="symbol"?e+"":e,n),n);const Hr=class Xr extends J{constructor(e){e={...Xr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:ua,entryPoint:"mainFragment"}}),r=X.from({vertex:rt,fragment:ca,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Vr(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Vr(Hr,"DEFAULT_OPTIONS",{threshold:.5});let ha=Hr;var pa=Object.defineProperty,ma=(t,e,n)=>e in t?pa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>(ma(t,typeof e!="symbol"?e+"":e,n),n);const Gr=class qr extends J{constructor(e){e={...qr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:la,entryPoint:"mainFragment"}}),r=X.from({vertex:rt,fragment:aa,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:fe.WHITE}}),de(this,"uniforms"),de(this,"bloomScale",1),de(this,"brightness",1),de(this,"_extractFilter"),de(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new ha({threshold:e.threshold}),this._blurFilter=new sa({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=he.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=he.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),he.returnTexture(s),he.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};de(Gr,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let ga=Gr;const kn=({crtFilter:t},e)=>[t?new Qs({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new ga({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class ba{#e;#r;#o;#n;#a=new b({label:"MainLoop/world"});#i;#s;constructor(e,n){this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=k.getState();e.stage.addChild(this.#a),e.stage.scale=r,this.#n=new Cn(n,ke(n),!1),this.#a.addChild(this.#n.container),this.#o=new xi,e.stage.addChild(this.#o.container),this.#c()}#c(){const{userSettings:{displaySettings:e}}=k.getState();this.#e=kn(e,!0),this.#r=kn(e,!1)}tick=({deltaMS:e})=>{const n=k.getState(),r=An(n),{userSettings:{displaySettings:o},upscale:i}=k.getState();this.#o.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=ke(this.#s);if((this.#n.roomState!==s||this.#n.upscale!==i||this.#n.displaySettings!==o||this.#n.paused!==r)&&(this.#n.destroy(),this.#n=new Cn(this.#s,s,r),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",s.id),this.#i.stage.scale=i.gameEngineUpscale,this.#c()),r)this.#i.stage.filters=this.#e,this.#n.everRendered||this.#n.tick({progression:this.#s.progression,movedItems:yo,deltaMS:e,displaySettings:o,onHold:!0});else{this.#i.stage.filters=this.#r;const a=bs(this.#s,e);this.#n.tick({progression:this.#s.progression,movedItems:a,deltaMS:e,displaySettings:o,onHold:!1})}};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n.destroy(),this.#o.destroy(),this.#i.ticker.remove(this.tick)}}Je.add(Xn,Gn,qn,Wn,jn,Yn,Jn,Zn,Kn,Qn,er,nr,tr,rr,or,ir,sr,ar,lr,cr,ur);wo.defaultOptions.scaleMode="nearest";const On=async(t,e)=>{const n=new vr;await n.init({background:"#000000",sharedTicker:!0});const r=ai({campaign:t,inputStateTracker:e}),o=new ba(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){zt({playableItem:Ke(r),gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return ke(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Ta=Object.freeze(Object.defineProperty({__proto__:null,default:On,gameMain:On},Symbol.toStringTag,{value:"Module"}));export{pr as A,dr as C,J as F,Ko as R,Wo as S,mr as V,Ta as g,qo as u};
