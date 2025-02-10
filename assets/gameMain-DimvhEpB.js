const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-B5ZW96-C.js","assets/App-DWigmBpZ.js","assets/index-Bx5oTM7M.js","assets/index-C-qy3IN-.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-aeb8_BSV.js","assets/Graphics-nfEDbpSn.js","assets/swopCharacters-DHpBJILy.js","assets/WebGLRenderer-D67bUq1S.js"])))=>i.map(i=>d[i]);
import{x as Zr,a6 as se,a7 as q,m as Bn,y as de,E as x,e as Ye,c as Kr,C as v,d as Ve,v as bt,am as m,D as vt,ae as He,T as Te,U as Qr,aE as eo,A as to,aF as no,aG as ie,aH as Fn,a1 as ro,aI as oo,W as C,aJ as Ue,aK as Ce,aL as io,aM as so,J as _,O,aN as Oe,N as Bt,aO as ae,aP as Je,_ as oe,aQ as Xe,aR as ao,aS as lo,K as z,I as Ft,aT as co,aU as _e,Q as An,X as At,aV as zn,L as xt,aW as Xt,a3 as Ie,aX as uo,aY as fo,aZ as ho,a_ as zt,a$ as po,Z as X,$ as I,b0 as Ge,b1 as mo,b2 as go,b3 as bo,b4 as vo,b5 as st,b6 as xo,b7 as yo,b8 as wo,b9 as Se,Y as To,ba as Co,bb as Ln,ab as fe,H as So,bc as ko,a2 as Gt}from"./App-DWigmBpZ.js";import{l as yt,h as qe,g as L,j as qt,k as Wt,m as Pe,n as Oo,s as pe,p as Y,i as D,q as wt,t as _o,r as Io,u as Po,v as Bo,w as Be,x as Fo,y as Ao,z as J,A as zo,B as Lo,C as be,D as at,E as Tt,F as jt,G as lt,c as Lt,H as G,I as Dn,J as Mn,K as Do,L as Ze,a as H,M as Dt,N as Rn,O as Yt,P as Un,Q as Mo,R as Ct,S as Ro,T as En,f as Uo,U as $n,V as Eo,W as Mt,X as $o,Y as No,Z as Vo,_ as Ho,$ as Jt,a0 as Nn,a1 as Xo,d as Vn,o as Hn,a2 as Go,e as Ke,a3 as w,a4 as V,a5 as Qe,a6 as We,a7 as qo}from"./swopCharacters-DHpBJILy.js";import{S as Wo,G as j}from"./Graphics-nfEDbpSn.js";import{_ as Zt,g as jo}from"./index-Bx5oTM7M.js";const Xn=class St extends Zr{constructor(e){e={...St.defaultOptions,...e},super(e),this.enabled=!0,this._state=Wo.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=se.from(n)),r&&(s=q.from(r)),new St({gpuProgram:i,glProgram:s,...o})}};Xn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Z=Xn;var Yo=`
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
`,Jo=`in vec2 aPosition;
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
`,Zo=`
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
}`;class T extends Z{constructor(e){const n=e.gpu,r=Kt({source:Zo,...n}),o=se.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Kt({source:Yo,...i}),a=q.from({vertex:Jo,fragment:s}),l=new Bn({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:de.EMPTY}})}}function Kt(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Rt=`
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
	`;class Gn extends T{constructor(){super({gl:{functions:`
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
                `}})}}Gn.extension={name:"color",type:x.BlendMode};class qn extends T{constructor(){super({gl:{functions:`
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
            `}})}}qn.extension={name:"color-burn",type:x.BlendMode};class Wn extends T{constructor(){super({gl:{functions:`
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
                `}})}}Wn.extension={name:"color-dodge",type:x.BlendMode};class jn extends T{constructor(){super({gl:{functions:`
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
                `}})}}jn.extension={name:"darken",type:x.BlendMode};class Yn extends T{constructor(){super({gl:{functions:`
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
            `}})}}Yn.extension={name:"difference",type:x.BlendMode};class Jn extends T{constructor(){super({gl:{functions:`
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
            `}})}}Jn.extension={name:"divide",type:x.BlendMode};class Zn extends T{constructor(){super({gl:{functions:`
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
            `}})}}Zn.extension={name:"exclusion",type:x.BlendMode};class Kn extends T{constructor(){super({gl:{functions:`
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
                `}})}}Kn.extension={name:"hard-light",type:x.BlendMode};class Qn extends T{constructor(){super({gl:{functions:`
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
            `}})}}Qn.extension={name:"hard-mix",type:x.BlendMode};class er extends T{constructor(){super({gl:{functions:`
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
            `}})}}er.extension={name:"lighten",type:x.BlendMode};class tr extends T{constructor(){super({gl:{functions:`
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
                `}})}}tr.extension={name:"linear-burn",type:x.BlendMode};class nr extends T{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"linear-dodge",type:x.BlendMode};class rr extends T{constructor(){super({gl:{functions:`
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
            `}})}}rr.extension={name:"linear-light",type:x.BlendMode};class or extends T{constructor(){super({gl:{functions:`
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
            `}})}}or.extension={name:"luminosity",type:x.BlendMode};class ir extends T{constructor(){super({gl:{functions:`
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
            `}})}}ir.extension={name:"negation",type:x.BlendMode};class sr extends T{constructor(){super({gl:{functions:`
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
                `}})}}sr.extension={name:"overlay",type:x.BlendMode};class ar extends T{constructor(){super({gl:{functions:`
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
                `}})}}ar.extension={name:"pin-light",type:x.BlendMode};class lr extends T{constructor(){super({gl:{functions:`
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
            `}})}}lr.extension={name:"saturation",type:x.BlendMode};class cr extends T{constructor(){super({gl:{functions:`
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
                `}})}}cr.extension={name:"soft-light",type:x.BlendMode};class ur extends T{constructor(){super({gl:{functions:`
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
                `}})}}ur.extension={name:"subtract",type:x.BlendMode};class dr extends T{constructor(){super({gl:{functions:`
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
                `}})}}dr.extension={name:"vivid-light",type:x.BlendMode};const kt=[];Ye.handleByNamedList(x.Environment,kt);async function Ko(t){if(!t)for(let e=0;e<kt.length;e++){const n=kt[e];if(n.value.test()){await n.value.load();return}}}let ve;function Qo(){if(typeof ve=="boolean")return ve;try{ve=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{ve=!1}return ve}var fr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(fr||{});class ei{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,p=u.length;d<p;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const ti=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],hr=class pr extends Kr{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...ti,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ko(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...pr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof v&&(r={container:r},n&&(Ve(bt,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:m.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=fr.ALL);const{clear:r,clearColor:o,target:i}=e;m.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,m.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ei(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Qo())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};hr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let mr=hr,Fe;function ni(t){return Fe!==void 0||(Fe=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??mr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!vt.get().getWebGLRenderingContext())return!1;let r=vt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Fe}let Ae;async function ri(t={}){return Ae!==void 0||(Ae=await(async()=>{const e=vt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Ae}const Qt=["webgl","webgpu","canvas"];async function oi(t){let e=[];t.preference?(e.push(t.preference),Qt.forEach(i=>{i!==t.preference&&e.push(i)})):e=Qt.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ri()){const{WebGPURenderer:a}=await Zt(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-B5ZW96-C.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&ni(t.failIfMajorPerformanceCaveat??mr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Zt(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-D67bUq1S.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const gr="8.6.6";class br{static init(){globalThis.__PIXI_APP_INIT__?.(this,gr)}static destroy(){}}br.extension=x.Application;class ii{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,gr)}destroy(){this._renderer=null}}ii.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const vr=class Ot{constructor(...e){this.stage=new v,e[0]!==void 0&&Ve(bt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await oi(e),Ot._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ve(bt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Ot._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};vr._plugins=[];let xr=vr;Ye.handleByList(x.Application,xr._plugins);Ye.add(br);var si=`in vec2 aPosition;
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
`,ai=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,en=`struct GlobalFilterUniforms {
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
}`;const yr=class wr extends Z{constructor(e){e={...wr.defaultOptions,...e};const n=se.from({vertex:{source:en,entryPoint:"mainVertex"},fragment:{source:en,entryPoint:"mainFragment"}}),r=q.from({vertex:si,fragment:ai,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Bn({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};yr.defaultOptions={alpha:1};let li=yr;class je extends He{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof de?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Te.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Te.shared.add(this.update,this,Qr.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(de.from(e[r]));return new je(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(de.from(e[r]));return new je(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof de)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Te.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Te.shared.add(this.update,this),this._isConnectedToTicker=!0))}}var ze={},tn;function ci(){if(tn)return ze;tn=1;var t=eo(),e=t.mark(i),n=to(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,p,h=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return p=d[u],y.delegateYield(o(p),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}ze.__concat=i;var s=r(i);return ze.concat=s,ze}var ct,nn;function ui(){return nn||(nn=1,ct=ci().concat),ct}var di=ui();const Ee=jo(di);function fi(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const hi=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},pi=({campaign:t,inputStateTracker:e})=>{const n=hi(t),r=no(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&yt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&yt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:qe(o.items.head),heels:i===void 0?void 0:qe(i.items.heels)},inputStateTracker:e,campaign:t,events:fi(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},g={pureBlack:new m("#000000"),lightBlack:new m("#38453A"),shadow:new m("#325149"),midGrey:new m("#7F7773"),lightGrey:new m("#BBB1AB"),white:new m("#FBFEFB"),metallicBlue:new m("#366BAE"),pink:new m("#D68ED1"),moss:new m("#9E9600"),redShadow:new m("#805E50"),midRed:new m("#CA7463"),lightBeige:new m("#DAA78F"),highlightBeige:new m("#EBC690"),alpha:new m("#FBD042"),replaceLight:new m("#08A086"),replaceDark:new m("#187558")},Et=`in vec2 aPosition;
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
`,mi=`#version 300 es

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
`;class ke extends Z{constructor(e,n){const r=q.from({vertex:Et,fragment:mi,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=e.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const gi=`precision mediump float;
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
`,rn=[g.pureBlack,g.lightBlack];class N extends Z{uniforms;constructor(e="white"){const n=q.from({vertex:Et,fragment:gi,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=rn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=rn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new m(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const M={original:new m("rgb(255, 255, 255)"),basic:new m("rgb(210, 210, 210)"),dimmed:new m("rgb(120, 120, 120)")},R={original:new m("rgb(255, 255, 0)"),basic:new m("hsl(50,65%,70%)"),dimmed:g.redShadow},E={original:new m("rgb(255, 0, 255)"),basic:g.pink,dimmed:new m("hsl(290,35%,38%)")},k={original:new m("rgb(0, 255, 255)"),basic:new m("hsl(183, 50%, 50%)"),dimmed:new m("hsl(183, 50%, 25%)")},$={original:new m("rgb(0, 255, 0)"),basic:g.moss,dimmed:new m("hsl(73,50%,25%)")},$t={white:{basic:{main:M,edges:{towards:k,right:R},hud:{lives:R,dimmed:E,icons:k}},dimmed:{main:M,edges:{towards:$,right:k},hud:{lives:R,dimmed:E,icons:k}}},yellow:{basic:{main:R,edges:{towards:$,right:M},hud:{lives:k,dimmed:E,icons:$}},dimmed:{main:R,edges:{towards:k,right:k},hud:{lives:k,dimmed:E,icons:$}}},magenta:{basic:{main:E,edges:{towards:$,right:k},hud:{lives:M,dimmed:k,icons:R}},dimmed:{main:E,edges:{towards:$,right:k},hud:{lives:M,dimmed:k,icons:R}}},cyan:{basic:{main:k,edges:{towards:E,right:M},hud:{lives:M,dimmed:$,icons:R}},dimmed:{main:k,edges:{towards:E,right:M},hud:{lives:M,dimmed:$,icons:R}}},green:{basic:{main:$,edges:{towards:k,right:R},hud:{lives:M,dimmed:E,icons:k}},dimmed:{main:$,edges:{towards:k,right:R},hud:{lives:M,dimmed:E,icons:k}}}},Nt=t=>$t[t.hue][t.shade],Tr=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+qt>n?100-Math.ceil((n-e)/(qt/100)):0},Cr=t=>{const e=100*L.w;return t.totalWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.totalWalkDistance-t.fastStepsStartedAtDistance)/L.w):0};function et(t,e){const n=e||new v;for(const r of t)n.addChild(r);return n}const on={x:.5,y:1},sn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({texture:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s}=t;let a;if(sn(t)?a=bi(t):a=new He(ie.textures[t.texture]),e===void 0&&r===void 0)if(sn(t))a.anchor=on;else{const l=ie.data.frames[t.texture].frame;l.pivot!==void 0?a.pivot=l.pivot:a.anchor=on}else e!==void 0&&(a.anchor=e),r!==void 0&&(a.pivot=r);return o!==void 0&&(a.x=o),i!==void 0&&(a.y=i),s!==void 0&&(a.filters=s),a.eventMode="static",n===!0&&(a.scale.x=-1),a}};function bi({animationId:t,reverse:e,playOnce:n}){const o=ie.animations[t].map(s=>({texture:s,time:Fn}));e&&o.reverse();const i=new je(o);return i.animationSpeed=ro.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const vi=`in vec2 vTextureCoord;
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
`;class tt extends Z{constructor(e){const n=Object.keys(e).length,r=q.from({vertex:Et,fragment:vi.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Sr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),kr=t=>Sr($t[t.color.hue][t.color.shade].main),xi=t=>new tt({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...kr(t)}),yi=new tt({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),_t=(t,e,n)=>n?new tt(Sr($t[t.color.hue][t.color.shade].edges[e])):new N(Nt(t.color).edges[e].original),Q=t=>new tt(kr(t)),It=oo,wi=250,Ti=24,Ci=56,Si=80,an=112,xe=t=>t==="heels"?1:-1;function*ki(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;so(o),yield f({texture:o,x:(r+.5-n/2)*Ue.w})}}function ye(t,e){t.removeChildren(),et(ki(e),t)}class Oi{#e=new v({label:"HudRenderer"});#o=new N;#r=new N;#n=new N;#a=new N;#i=new N(g.moss);#s=new ke(g.pureBlack,C.getState().upscale.gameEngineUpscale);#c=new N;#f=[this.#s,this.#a];#l={original:[this.#s,this.#c],colourised:{head:[this.#s,new N(g.metallicBlue)],heels:[this.#s,new N(g.pink)]}};#t={head:{sprite:this.#h("head"),livesText:this.#d({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#u({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#u({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#h("heels"),livesText:this.#d({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#u({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#u({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#u({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new v({label:"heelsCarrying"})}},fps:this.#d({label:"fps",outline:!0})};constructor(){for(const e of Wt)this.#e.addChild(this.#t[e].livesText),this.#e.addChild(this.#t[e].sprite),this.#e.addChild(this.#t[e].shield.container),this.#e.addChild(this.#t[e].extraSkill.container);this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[this.#i],this.#t.fps.y=Ue.h,this.#t.fps.x=Ue.w*2}#u({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new v({label:i});s.pivot={x:4,y:16};const a=new He({texture:ie.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:this.#n,y:n?0:8});s.addChild(a);const l=this.#d({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Ue.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=this.#s),{text:l,icon:a,container:s}}#h(e){const n=new He(ie.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#d({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new v({label:r,filters:n?this.#f:this.#a,scale:{x:1,y:e?2:1}})}#b(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+xe("head")*an,this.#t.head.doughnuts.container.y=e.y-Ce.h-8,this.#t.heels.carrying.container.y=e.y-Ce.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+xe("heels")*an,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8}#v(e){return f(e.type==="spring"?"spring.released":e.type==="sceneryPlayer"?e.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":e.config.style)}#p(e,n){return e?n?It:this.#c:this.#o}#x(e,n){const r=Pe(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,a=s.children.length>0;if(i===null&&a)for(const l of s.children)l.destroy();i!==null&&!a&&s.addChild(this.#v(i)),s.filters=this.#p(!0,n),this.#t.heels.bag.icon.filters=this.#p(o,n)}#y(e,n){const r=Pe(e,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#p(o,n),this.#t.head.doughnuts.icon.filters=this.#p(i!==0,n),ye(this.#t.head.doughnuts.text,i)}#w(e,n,r){const o=Pe(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill;l.x=s.x=(n.x>>1)+xe(r)*Si,ye(i,Tr(o)),s.y=n.y,ye(a,o===void 0?0:r==="head"?Cr(o):o.bigJumps),l.y=n.y-24}#m(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#T(e,n,r,o){const i=this.#m(e,o),s=this.#t[o].sprite;i?s.filters=r?It:this.#c:Oo(e)?s.filters=this.#r:s.filters=this.#o,s.x=(n.x>>1)+xe(o)*Ci,s.y=n.y-Ce.h}#C(e,n,r){const i=Pe(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+xe(r)*Ti,s.y=n.y,ye(s,i??0)}#S(e,n){const r=pe(e),o=Nt(r.color);this.#o.targetColor=o.hud.dimmed[n?"dimmed":"original"],this.#a.targetColor=o.hud.dimmed[n?"basic":"original"],this.#n.targetColor=o.hud.icons[n?"basic":"original"],this.#r.targetColor=o.hud.dimmed[n?"basic":"original"],this.#c.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#m(e,"head")?this.#l.colourised.head:this.#o:this.#l.original,this.#t.heels.livesText.filters=n?this.#m(e,"heels")?this.#l.colourised.heels:this.#o:this.#l.original}#g=Number.NEGATIVE_INFINITY;#k(){if(io(C.getState())){if(performance.now()>this.#g+wi){const e=Te.shared.FPS;ye(this.#t.fps,Math.round(e)),this.#i.targetColor=e>56?g.moss:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#g=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick({gameState:e,screenSize:n,colourise:r}){this.#S(e,r);for(const o of Wt)this.#C(e,n,o),this.#T(e,n,r,o),this.#w(e,n,o);this.#b(n),this.#y(e,r),this.#x(e,r),this.#k()}get container(){return this.#e}destroy(){this.#e.destroy()}}const ln={movementType:"vel",vels:{gravity:_}},_i=(t,e,n)=>{if(!Y(t))return ln;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=_o[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?D("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-wt*n,-a)}}}:ln:{movementType:"vel",vels:{gravity:{z:Math.max(o-wt*n,-a)}}}},me={movementType:"steady"},Le=t=>{const n=t/Fo*Fn;return(t+.5*wt*n**2)/n},Ii={head:Le(Be.head),headOnSpring:Le(Be.head+L.h),heels:Le(Be.heels),heelsOnSpring:Le(Be.heels+L.h)},Pi=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ii[`${n}${e?"OnSpring":""}`]},Bi=t=>!(t===null||Po(t)||Bo(t)&&t.config.gives==="scroll"),Or=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&Bi(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:me;const i=Io(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Pi(t,i)}},stateDelta:{action:"moving",jumped:!0}}},Fi=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Oe(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return O(n,l)},cn={movementType:"vel",vels:{walking:_}},_r=(t,e,n)=>{const r=Ai(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Oe(r.vels.walking);r.stateDelta=Object.assign(r.stateDelta||{},{walkDistance:o===0?0:t.state.walkDistance+o*n}),t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta=Object.assign(r.stateDelta||{},{totalWalkDistance:t.state.totalWalkDistance+o*n}))}return r},Ai=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,vels:{walking:d,gravity:p}}}=t,h=n===t.id,b=h?e.currentActionPress("jump"):"released",y=h?e.directionVector:_,B=a===null&&p.z<0,U=o==="head"&&Cr(t.state)>0&&a!==null,P=o==="headOverHeels"?B?"head":"heels":U?"heels":o,S=s?l:y,F=J[P];if(c!==null||i==="death")return cn;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Bt(d,O(d,Ao*r))}}:cn;if(b!=="released"){const le=ae(Je(S,oe)?l:S),Jr=D("spring")(a)?1:zo;return{movementType:"vel",vels:{walking:O({...le,z:0},F*Jr)},stateDelta:{facing:le}}}}return Oe(S)!==0?B?{movementType:"vel",vels:{walking:O({...S,z:0},F)},stateDelta:{facing:S,action:"falling"}}:{movementType:"vel",vels:{walking:Fi({vel:d,acc:Lo[P],deltaMS:r,maxSpeed:F,unitD:S,minSpeed:0})},stateDelta:{facing:S,action:"moving"}}:u>0&&u<1?{movementType:"position",posDelta:O(l,1-u),stateDelta:{action:B?"falling":"idle",walkDistance:0}}:{movementType:"vel",vels:{walking:_},stateDelta:{action:B?"falling":"idle"}}},un=L.h,De=.001,zi=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=at**2/(2*be);if(n==="up"){if(e<=r)return Math.max(De,Math.sqrt(2*be*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(De,Math.sqrt(2*be*o))}else return at}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-De,-Math.sqrt(2*be*o))}else return e<=r?Math.min(-De,-Math.sqrt(2*be*Math.max(e,0))):-at};function Li({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}},o,i){const s=t*un,a=e*un,l=zi({currentAltitude:r-s,direction:n,totalDistance:a-s});if(Number.isNaN(l))throw new Error("velocity is NaN");const c=r<=s?"up":r>=a?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:l}},stateDelta:{direction:c}}}const Di=.5,ge=(t,e,n,r)=>{const o=n.x+r.x-t.x,i=n.y+r.y-t.y,s=n.z+r.z-t.z,a=t.x+e.x-n.x,l=t.y+e.y-n.y,c=t.z+e.z-n.z,u=Math.abs(o)<Math.abs(a)?o:-a,d=Math.abs(i)<Math.abs(l)?i:-l,p=Math.abs(s)<Math.abs(c)?s:-c,h=Math.abs(u),b=Math.abs(d),y=Math.abs(p)*Di;return h<b&&h<y?{x:u,y:0,z:0}:b<y?{x:0,y:d,z:0}:{x:0,y:0,z:p}},dn=(t,e)=>({x:t.x>0?e.state.position.x:e.state.position.x+e.aabb.x,y:t.y>0?e.state.position.y:e.state.position.y+e.aabb.y,z:t.z>0?e.state.position.z:e.state.position.z+e.aabb.z}),fn={stopAutowalk:0,portal:0,wall:0,doorLegs:0,sceneryPlayer:0,bubbles:0,block:1,barrier:1,floor:1,floorEdge:1,hushPuppy:1,teleporter:1,doorFrame:1,lift:2,movableBlock:2,portableBlock:2,slidingBlock:2,spring:2,ball:3,joystick:3,switch:3,charles:3,conveyor:3,head:4,heels:4,headOverHeels:4,pickup:8,firedDoughnut:9,slidingDeadly:10,moveableDeadly:10,deadlyBlock:10,monster:10},Ir=(t,e)=>fn[t.type]-fn[e.type],Mi=(t,e)=>e.toSorted((n,r)=>{const o=Ir(n,r);if(o!==0)return o;const i=Xe(t,dn(t,n)),s=Xe(t,dn(t,r));return i-s});function Pr({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Tr(n)>0||(e.state.action="death",e.state.expires=t+Tt)}const Br=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=lt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=lt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=jt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=lt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.totalWalkDistance);break}case"jumps":{const s=jt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":C.dispatch(lo(r.config.page));break;case"reincarnation":break;case"crown":{C.dispatch(ao(r.config.planet));break}default:r.config}},Ri=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Xe(i,r)<=0||Lt({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},Ui=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=Ft(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):0,y:i==="y"?-Math.abs(e.x):0,z:0}:{x:i==="x"?Math.abs(e.y):0,y:i==="y"?Math.abs(e.x):0,z:0};t.state.position=z(t.state.position,s)};function Ei({movingItem:t}){t.state.autoWalk=!1}const W=(t,...e)=>D(...e)(t.touchedItem),we=(t,...e)=>D(...e)(t.movingItem),Fr=t=>G(t.movingItem),$i=t=>G(t.touchedItem),Ni=t=>Dn(t.touchedItem),hn=t=>{switch(!0){case W(t,"stopAutowalk"):Ei(t);break;case Ni(t):Pr(t);break;case W(t,"portal"):Ri(t);break;case W(t,"pickup"):Br(t);break;case W(t,"doorFrame"):Ui(t);break}},Ar=150,zr=t=>t[Math.floor(Math.random()*t.length)],ee=Object.freeze({movementType:"vel",vels:{walking:_}}),nt=t=>Mn(t)?J[t.config.which]:J[t.type],Vi=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=J.homingBot;if(!Je(e,oe))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=_e(l.state.position,t);if(Math.abs(c.y)<2)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<2)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},Lr=(t,e)=>{const{items:{head:n,heels:r}}=e;if(e.items.headOverHeels!==void 0)return e.items.headOverHeels;const o=n===void 0?void 0:Xt(n.state.position,t),i=r===void 0?void 0:Xt(r.state.position,t);return o===void 0?r:i===void 0||o<i?n:r},Hi=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ee;const l=Lr(o,e);if(l===void 0||s+Ar>e.roomTime)return me;const c=_e(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>1?u:An(u),p=nt(t),h={..._,[d]:c[d]>0?p:-p},b=ae(h),y=!Je(b,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:b,...y?{timeOfLastDirectionChange:e.roomTime}:At}}},pn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return ee;const a=Lr(i,e);if(a===void 0)return ee;const l=a.state.position,c=L.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ee;const d=_e(a?.state.position,i),p=nt(t),h=(1+Math.sqrt(2))/2,b=p*h,y=O({...d,z:0},b/zn(d)*(o?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:ae(y)}}},ut=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return ee;if(!(Ie(i,_)||Math.random()<r/1e3))return me;const l=zr(o);return{movementType:"vel",vels:{walking:O(xt[l],nt(t))},stateDelta:{facing:xt[l]}}},Xi=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?ee:Je(i,oe)?{movementType:"vel",vels:{walking:O(o,nt(t))}}:me},Gi=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=zr([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},dt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Ar))return;const c=ge(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Gi(s,c,o);t.state.vels.walking=u,t.state.facing=ae(u),t.state.durationOfTouch=0},qi=({movingItem:t})=>{t.state.vels.walking=_},Wi=(t,e,n,r)=>{if(!t.state.activated||Mn(t)&&t.state.busyLickingDoughnutsOffFace)return ee;switch(t.config.movement){case"patrol-randomly-diagonal":return ut(t,e,n,r,ho);case"patrol-randomly-xy8":return ut(t,e,n,r,fo);case"patrol-randomly-xy4":return ut(t,e,n,r,uo);case"towards-tripped-on-axis-xy4":return Vi(t,e);case"towards-on-shortest-axis-xy4":return Hi(t,e);case"back-forth":case"clockwise":return Xi(t);case"unmoving":case"free":return ee;case"towards-when-in-square-xy8":return pn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return pn(t,e,n,r,co(C.getState()));default:throw t.config,new Error("this should be unreachable")}},ji=t=>{const{movingItem:e,touchedItem:n}=t;if(Y(n,e))switch(e.config.movement){case"patrol-randomly-xy4":dt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":dt(t,"opposite");break;case"clockwise":dt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":qi(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Yi=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of zt(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&C.dispatch(po(o.path))}},Ji=({movingItem:t,touchedItem:e})=>{if(!Y(t))return;const{state:{position:n},aabb:r}=e,o=ge(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=ae(o),s=O(i,-J.ball);return e.state.vels.sliding=s,!1},Zi=({movingItem:t,touchedItem:e})=>{if(!Y(e))return;const n=t.state.vels.sliding;if(Ie(n,_))return;const{state:{position:r},aabb:o}=t,i=ge(e.state.position,e.aabb,r,o);return Xe(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},Ki=2*Do,Dr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Ki,positionDelta:n})},Qi=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Bt(r.state.position,o),z:0};if(!Ie(s,_))for(const a of r.state.stoodOnBy)Dr(a,e,s)}},es=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=ge(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=ae(a);for(const c of o){const u=e.items[c],d=O(l,-J.charles*r);u.state.facing=d,Dr(u,e,d)}},ts=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},mn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>ts(t,e,n,r),gn=.001,Vt=(t,e,n=.001)=>{if(!Y(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:Ze({state:{position:z(t.state.position,{x:0,y:0,z:-gn})},aabb:{...t.aabb,z:n+gn},id:t.id},{state:{position:z(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Mr=(t,e)=>{const r=[...X(e).filter(i=>Vt(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Ir(s,i);return a<0||a===0&&mn(t,s)>mn(t,i)?s:i})},bn=t=>H(t.movingItem)&&Vt(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Rr=(t,e)=>{let n=_;for(const r of e){if(r.movementType==="position"&&(n=z(n,r.posDelta)),r.movementType==="vel"&&(H(t)||D("lift")(t)))for(const[i,s]of zt(r.vels)){const a={..._,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},vn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&G(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&bn(t)){if(bn(t)&&Fr(t)){Dt({above:t.movingItem,below:t.touchedItem});const n=[Or(t.movingItem,t.gameState),_r(t.movingItem,t.gameState,t.deltaMS)];Rr(t.movingItem,n)}Rn(t)}};function ns(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const rs=t=>{Fr(t)&&hn(t),$i(t)&&hn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),W(t,...Yt)&&Ji(t),we(t,...Yt)&&Zi(t),(we(t,"monster")&&W(t,"firedDoughnut")||we(t,"firedDoughnut")&&W(t,"monster"))&&ns(t),(we(t,"monster")||we(t,"movableBlock"))&&ji(t),W(t,"switch")&&Yi(t),W(t,"joystick")&&es(t),t.touchedItem.state.disappear&&vn(t),t.movingItem.state.disappear&&Y(t.touchedItem,t.movingItem)&&vn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Ht=({subjectItem:t,posDelta:e,gameState:n,room:r,pusher:o,deltaMS:i,forceful:s=D("lift")(t)&&o===void 0,recursionDepth:a=0})=>{if(Ie(e,_))return;if(a>24)throw new Error("this probably means a non-terminating issue, or you're testing by adding an unreasonable number of items to a room");const{state:{position:l}}=t;t.state.position=z(l,e),H(t)&&(t.state.actedOnAt=r.roomTime);const c=Mi(e,Un(t,I(r.items)));for(const u of c){if(!Ze(t,u))continue;if(o!==u&&rs({movingItem:t,touchedItem:u,movementVector:Bt(t.state.position,l),gameState:n,deltaMS:i,room:r}),r.items[t.id]===void 0)return;if(r.items[u.id]===void 0||!Y(u,t)||!Y(t))continue;const d=ge(t.state.position,t.aabb,u.state.position,u.aabb);if(H(u)&&u!==o){const p=s||Mo(u)?-1:-.5,h=O(d,p);if(t.state.position=z(t.state.position,d,h),Ht({subjectItem:u,posDelta:h,pusher:t,gameState:n,room:r,deltaMS:i,forceful:s,recursionDepth:a+1}),r.items[u.id]===void 0)continue;t.state.position=z(t.state.position,ge(t.state.position,t.aabb,u.state.position,u.aabb))}else t.state.position=z(t.state.position,d);H(t)&&d.z>0&&(t.state.standingOn===null||!c.includes(t.state.standingOn))&&(Ct(t),Dt({above:t,below:u}))}};function os(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&D("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:Tt}}}:me;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return Lt({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Tt}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const xn={movementType:"vel",vels:{movingFloor:_}},is=(t,e,n)=>{if(G(t)&&t.state.teleporting!==null)return xn;const{state:{standingOn:r}}=t;if(r===null||!D("conveyor")(r))return xn;const{config:{direction:o}}=r,s=D("heels")(t)&&t.state.action==="moving"&&Ge(t.state.facing)===mo(o)?J.heels:Ro;return{movementType:"vel",vels:{movingFloor:O(xt[o],s)}}},ss=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=X(I(e.items)).filter(En),u=s===null?ls(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}as(e,i,u)}else{if(t.state.standingOn===null||!Ur(t,I(e.items)))return;const d=Uo({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Ht({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r}),i.carrying=null}},as=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,$n({room:t,item:n})},ls=(t,e)=>Mr(t,X(I(e.items)).filter(En)),Ur=(t,e)=>{const n={position:z(t.state.position,{z:L.h})},r=Un({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(Y(o,t)){if(!H(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!Ur(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0};function*cs(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const us=L.w*Math.sqrt(2)+1,ds=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,p=500,h=ae(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+p<c){const b={type:"firedDoughnut",...Eo,config:At,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:z(u,O(h,us),t.type==="headOverHeels"?{z:L.h}:_),vels:{fired:O(h,J.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Mt({room:e,item:b}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},fs=2;function*hs(t,e,n,r){H(t)&&(yield _i(t,n,r),yield is(t),yield*cs(t,e)),G(t)&&(yield _r(t,n,r),t.id===n.currentCharacterName&&(yield os(t,n,r),yield Or(t,n),$o(t)&&ss(t,e,n,r),No(t)&&ds(t,e,n))),Vo(t)&&(yield Li(t)),Ho(t)&&(yield Wi(t,e,n,r))}const ps=(t,e,n,r)=>{!H(t)||t.state.standingOn===null||(G(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&Br({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e,movementVector:{x:0,y:0,z:-1},deltaMS:r})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||G(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&Rn({touchedItem:t.state.standingOn,gameState:n,room:e}))},ms=(t,e,n,r)=>{G(t)&&t.state.standingOn!==null&&Dn(t.state.standingOn)&&Pr({gameState:n,room:e,movingItem:t,touchedItem:t.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...hs(t,e,n,r)];ps(t,e,n,r);let i=Rr(t,o);(H(t)||D("lift")(t)||D("firedDoughnut")(t))&&(i=z(i,...X(I(t.state.vels)).map(l=>O(l,r))));const s=Math.ceil(Oe(i)/fs),a=O(i,1/s);for(let l=0;l<s;l++)Ht({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r})},gs=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,re(t,e);const u=Jt(e)[c],d=he({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:qe(u)};return}if(t.entryState.headOverHeels!==void 0){re(t,e);const c=he({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Jt(e);if(re(t,c),re(t,u),Ze(c,u)){const d=Nn({head:c,heels:u});re(t,d,"heels");const p=he({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:p},t.entryState={headOverHeels:qe(d)};return}else{const d=he({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},he=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=yt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Mt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Xo(o,t);return o},re=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},bs=(t,e)=>{const n=Vn(t,Hn(e.type));if(e.state.lives--,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];re(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Nn({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});re(t,a);const l=he({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Mt({room:r,item:e});return}else{const s=he({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},vs=(t,e)=>{e.type==="headOverHeels"?gs(t,e):bs(t,e)},xs=t=>{for(const e of I(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){Ct(n);continue}if(!Vt(n,e)){Ct(n);const r=Mr(n,I(t.items));r!==void 0&&Dt({above:n,below:r})}}},ys=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ws=(t,e,n)=>{for(const r of I(t.items))!H(r)||t.roomTime===r.state.actedOnAt||go(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=bo(r.state.position),n.add(r))},Ts=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Cs=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=yn(t,e),i=pe(t).items;n=new Set(X(Ee(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return yn(t,e*t.gameSpeed)},yn=(t,e)=>{const{inputStateTracker:n}=t,r=pe(t),o=Object.fromEntries(X(zt(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Go(t);for(const a of I(r.items))ys(a,r)&&($n({room:r,item:a}),G(a)&&vs(t,a));const i=Object.values(r.items).sort(Ts);for(const a of i){if(Ke(t).state.action==="death")break;r.items[a.id]!==void 0&&ms(a,r,t,e)}xs(r);const s=new Set(X(I(r.items)).filter(a=>o[a.id]===void 0||!Ie(a.state.position,o[a.id])));return Qi(s,r,o),ws(r,o,s),Ss(t,r,e),s},Ss=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Ke(t);if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Vn(t,Hn(r.type));i!==void 0&&(i.state.gameTime+=n)}},wn=(t,e)=>{const n=w(t),r=w(z(t,{x:e.x,z:e.z})),o=w(z(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},ft=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,ks=(t,e,n,r)=>{const o=wn(t,e),i=wn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=ft(s,a,l,c),d=o.topRight.y-o.topRight.x/2,p=o.bottomCentre.y-o.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,b=i.bottomCentre.y-i.bottomCentre.x/2,y=ft(d,p,h,b),B=o.topLeft.y+o.topLeft.x/2,U=o.bottomCentre.y+o.bottomCentre.x/2,P=i.topLeft.y+i.topLeft.x/2,S=i.bottomCentre.y+i.bottomCentre.x/2,F=ft(B,U,P,S);return u&&y&&F},Os=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!ks(n,r,o,i))return 0;for(const s of vo){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Tn(e)-Tn(t)},Tn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class $e extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const _s=t=>{const e=Is(t);let n=e.length,r=n;const o=new Array(n),i={},s=Ps(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new $e([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,p=Array.from(d);if(c=p.length){u.add(l);do{const h=p[--c];try{a(h,s.get(h),u)}catch(b){throw b instanceof $e?b.hasClosedCycle?b:new $e([l,...b.cyclicDependency],b.cyclicDependency.includes(l)):b}}while(c);u.delete(l)}o[--n]=l}};function Is(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Ps(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Cn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Me=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Bs=(t,e=new Set(I(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Me(n,o,s);for(const o of e)if(o.renders)for(const i of I(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Os(o,i);if(Cn(r,o,i),s===0){Me(n,o.id,i.id),Me(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;Cn(n,a,l),Me(n,l,a)}return n},Er=(t,e,n=3)=>{try{return{order:_s(t),impossible:!1}}catch(r){if(r instanceof $e){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),{order:Er(t,e,n-1).order,impossible:!0}}else throw r}},Fs=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,As=(t,e,n)=>{const o=ie.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ie.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},Re=t=>A(()=>f(t)),A=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,previousRendering:null}),renderProps:At}:"no-update";function*zs({config:{direction:t,inHiddenWall:e,height:n}},r){const o=Ft(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const c=f({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...st(a,{y:-L.h*n})});c.filters=_t(r,o==="x"?"towards":"right",!0),yield c}}else{yield f({pivot:{x:i,y:9},texture:"generic.door.legs.base",...st(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...st(a,{y:-l*L.h})})}}yield*s(V({...oe,[o]:1})),yield*s(oe),e||(yield f({pivot:{x:16,y:L.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...V({...oe,[o]:1})}))}const Ls=A(({item:t,room:e})=>et(zs(t,e),new v({filters:Q(e)})));function*Ds({config:{direction:t,part:e}},n){const r=Ft(t);yield f({texture:As(n,r,e),filter:Q(n)})}const Ms=A(({item:t,room:e})=>et(Ds(t,e))),ht={animationId:"bubbles.cold"},te=({top:t,bottom:e="homingBot",filter:n})=>{const r=new v({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},pt=({name:t,action:e,facingXy4:n,teleporting:r,highlighted:o})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r!==null){if(r.phase==="out")return{animationId:`${t}.fadeOut`};if(r.phase==="in")return{animationId:`${t}.fadeOut`}}const i=o?new ke(t==="head"?g.metallicBlue:g.pink,C.getState().upscale.gameEngineUpscale):void 0;return e==="moving"?{animationId:`${t}.walking.${n}`,filter:i}:e==="falling"&&t==="head"&&(n==="towards"||n==="right")?{texture:`head.falling.${n}`,filter:i}:t==="head"&&(n==="towards"||n==="right")?{animationId:`head.idle.${n}`,filter:i}:{texture:`${t}.walking.${n}.2`,filter:i}},Sn=({gameTime:t,switchedToAt:e})=>e+500>t,mt=({item:t,currentlyRenderedProps:e,previousRendering:n})=>{const{type:r,state:{action:o,facing:i,teleporting:s}}=t,a=Ge(i),l=t.type==="headOverHeels"?Sn(t.state.head):Sn(t.state),c=Oe(i);return e===void 0||e.action!==o||e.facingXy4!==a||e.teleportingPhase!==(s?.phase??null)||e.highlighted!==l?{container:r==="headOverHeels"?te({top:pt({name:"head",action:o,facingXy4:a,teleporting:s,highlighted:l}),bottom:pt({name:"heels",action:o,facingXy4:a,teleporting:s,highlighted:l})}):f(pt({name:r,action:o,facingXy4:a,teleporting:s,highlighted:l})),renderProps:{action:o,facingXy4:a,teleportingPhase:s?.phase??null,highlighted:l,walkSpeed:c}}:o==="moving"&&e.walkSpeed!==c?(n.animationSpeed=c*xo,{container:n,renderProps:{action:o,facingXy4:a,teleportingPhase:s?.phase??null,highlighted:l,walkSpeed:c}}):"no-update"};function*Rs(t,e,n){for(const r of yo){const o=An(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let a=0;a<=t.size[r];a++){let l;if(t.walls[s][a]==="none"){const c=X(I(t.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===a||u.position[r]+1===a)&&u.position[o]===t.size[o]);c===void 0?l="none":c.position.z===0?l="behind-door":l="corner-on-floor"}else l="corner-on-floor";l!=="none"&&(yield We({[r]:a-e[r],[o]:t.size[o]+(n[i]?.5:0)+(l==="behind-door"?.5:0)},f(l==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const $r=({blockXExtent:t,blockYExtent:e,type:n})=>{const r=new v({label:"towards"});for(let i=0;i<=t;i+=.5){const s={x:i,y:0},a={x:7,y:0};r.addChild(We(s,f({pivot:a,texture:`${n}.towards`})))}const o=new v({label:"right"});for(let i=0;i<=e;i+=.5)o.addChild(We({x:0,y:i},f({pivot:{x:0,y:0},texture:`${n}.right`})));return{right:o,towards:r}},Us=A(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Qe(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:p}}=e,h=new v({label:`floor(${e.id})`});if(d!=="none"){const U=d==="deadly"?`generic${p==="dimmed"?".dark":""}.floor.deadly`:`${d}${p==="dimmed"?".dark":""}.floor`,P=new v;for(let F=-1;F<=o+2;F++)for(let K=F%2-1;K<=i+2;K+=2)P.addChild(We({x:F+(s.right?-.5:0),y:K+(s.towards?-.5:0)},f({texture:U})));et(Rs(e,{x:n,y:r},s),P);const S=new j().poly([oe,V({x:c,y:0}),V({x:c,y:u}),V({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});P.addChild(S),P.filters=Q(e),P.mask=S,h.addChild(P)}const{towards:b,right:y}=$r({blockXExtent:c,blockYExtent:u,type:"floorOverdraw"});h.addChild(b),h.addChild(y);const B=new j().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);return h.addChild(B),h.mask=B,h.y=-t.aabb.z,h.cacheAsTexture(!0),h}),Es=A(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=Qe(t.roomJson),c=i-r,u=s-o,d=new v({label:"floorEdge"}),p=new j({label:"overDrawToHideFallenItems"}).poly([V({x:c,y:0}),V({x:0,y:0}),V({x:0,y:u}),{...V({x:0,y:u}),y:999},{...V({x:c,y:0}),y:999}],!0).fill(0);p.y=8,d.addChild(p);const{towards:h,right:b}=$r({blockXExtent:c,blockYExtent:u,type:"floorEdge"}),y=!e&&n.colourise;h.filters=_t(t,"towards",y),b.filters=_t(t,"right",y),d.addChild(h),d.addChild(b);const B=new j({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(B),d.mask=B,d.cacheAsTexture(!0),d}),$s=(t,e,n)=>e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,gt=g.moss,kn=A(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),Ns={head:mt,heels:mt,headOverHeels:mt,doorFrame:Ms,doorLegs:Ls,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:A(({item:{config:{side:t,style:e}},room:n})=>{if(t==="right"||t==="towards")throw new Error("this wall should be non-rendering");return f({texture:Fs(n.planet,e,t,n.color.shade==="dimmed"),y:1,pivot:t==="away"?{x:Se.w,y:Se.h+1}:{x:0,y:Se.h+1},filter:Q(n)})}),barrier:A(({item:{config:{axis:t}}})=>f({texture:`barrier.${t}`})),deadlyBlock:A(({item:{config:{style:t}},room:e})=>f({texture:t,filter:t==="volcano"?Q(e):void 0})),slidingDeadly:kn,slidingBlock:kn,block({item:{config:{style:t},state:{disappear:e}},room:n,currentlyRenderedProps:r}){return r===void 0||r.disappear!==e?{container:f({texture:$s(n.color.shade==="dimmed",t,e!==null),filter:t==="organic"?Q(n):void 0}),renderProps:{disappear:e}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?wo(C.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t},state:{stoodOnBy:e}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new v,s=To(t);return i.addChild(f(r?{animationId:`conveyor.${s}`,reverse:t==="towards"||t==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:A(()=>{const t=new v,e={x:Ce.w/2,y:Ce.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({texture:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=X(t).find(G)!==void 0;return e===void 0||n!==e.flashing?{container:n?new v({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:A(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({texture:`crown.${t.planet}`});const r={shield:"bunny",jumps:"bunny",fast:"bunny","extra-life":"bunny",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:Q(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:A(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=Ge(t);return e===void 0||n!==e.facingXy4?{container:te({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?yi:o?void 0:xi(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Ge(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({texture:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({texture:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{texture:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?te({top:{texture:`${t.which}.${a}`,filter:s||Q(n)},bottom:ht}):f({texture:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:te({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{texture:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({texture:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:te({top:ht,filter:s}),renderProps:l};case"emperorsGuardian":return{container:te({top:"ball",bottom:ht,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:Re("joystick"),movableBlock:A(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new ke(gt,C.getState().upscale.gameEngineUpscale):void 0;return{container:f({texture:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new ke(gt,C.getState().upscale.gameEngineUpscale):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new ke(gt,C.getState().upscale.gameEngineUpscale):void 0;return{container:t==="headOverHeels"?te({top:{texture:`head.walking.${e}.2`,filter:i},bottom:{texture:`heels.walking.${e}.2`,filter:i}}):f({texture:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Re("hushPuppy"),bubbles:A(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:Re({animationId:"bubbles.doughnut"}),ball:Re("ball"),floor:Us,floorEdge:Es},Vs=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class Hs{#e;#o;#r=void 0;#n;#a;constructor(e,n,r){this.#e=e,this.#o=n,this.#n=new v({label:`ItemAppearanceRenderer ${e.id}`}),Vs(e,this.#n,r),this.#a=Ns[e.type]}destroy(){this.#n.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#a({item:this.#e,room:this.#o,currentlyRenderedProps:this.#r,displaySettings:e.displaySettings,previousRendering:this.#n.children.at(0)??null,onHold:e.onHold});n!=="no-update"&&(this.#r=n.renderProps,this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container))}get container(){return this.#n}}const On=(t,e)=>{const n=new j().poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})]).stroke({width:.5,color:e,alpha:1});return n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.fill({color:"transparent"})}),n},Xs={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Gs{#e;constructor(e){const n=Xs[e.type]??"rgba(255,255,255)";if(this.#e=new v({label:`ItemBoundingBoxRenderer ${e.id}`}),D("portal")(e)){const r=w(e.config.relativePoint);this.#e.addChild(new j().circle(r.x,r.y,5).stroke(n)),this.#e.addChild(new j().circle(r.x,r.y,2).fill(n))}this.#e.addChild(new j().circle(0,0,2).fill(n)),this.#e.addChild(On(e.aabb,n)),e.renderAabb&&this.#e.addChild(On(e.renderAabb,"rgba(184, 184, 255)"))}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class qs{#e;#o;#r;constructor(e,n){this.#o=new v({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#r=n,this.#e=e,this.#n()}#n(){const e=w(this.#e.state.position);this.#o.x=e.x,this.#o.y=e.y}tick(e){this.#r?.tick(e),e.movedItems.has(this.#e)&&this.#n()}destroy(){this.#o.destroy({children:!0}),this.#r?.destroy()}get container(){return this.#o}}class Ws{constructor(e,n){this.item=e,this.room=n;const{userSettings:{displaySettings:{showShadowMasks:r}}}=C.getState();if(r||(this.#e.filters=new li({alpha:.5})),e.shadowMask.spriteOptions){const o=f(e.shadowMask.spriteOptions);e.shadowMask.relativeTo==="top"&&(o.y=-e.aabb.z),this.#e.addChild(o),r||(this.#e.mask=o)}this.#e.addChild(this.#o)}#e=new v({label:"ItemShadowRenderer"});#o=new v({label:"shadows"});#r={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=X(I(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:qo}},a=Object.groupBy(i,l=>{const c=this.#r[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":Ze(s,l)?c?"update":"create":"noShadow"});for(const l of Ee(a.keepUnchanged,a.update))this.#r[l.id].renderedOnProgression=n;for(const l of Ee(a.create)){const c=f(l.shadowCastTexture);c.label=l.id,this.#o.addChild(c),this.#r[l.id]={sprite:c,renderedOnProgression:n}}for(const l of Ee(a.create,a.update)){const{sprite:c}=this.#r[l.id],u=w({..._e(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of Co(this.#r))u!==n&&(c.destroy(),delete this.#r[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const js=t=>t.shadowMask!==void 0,Ys=(t,e,n)=>{const r=C.getState(),{userSettings:{displaySettings:{showBoundingBoxes:o,colourise:i}}}=r,s=Ln(r),a=o==="all"||o==="non-wall"&&t.type!=="wall",l=[];return t.renders&&(l.push(new Hs(t,e,n)),!s&&i&&js(t)&&l.push(new Ws(t,e))),a&&l.push(new Gs(t)),l.length===0?"not-needed":new qs(t,new Js(l))};class Js{#e;#o=new v({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#o.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#o}}const ce=.33,Zs=16,Pt=Se.h-Se.w/2,Ks=J.heels,Qs=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=Qe(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Zs-i.y-Math.abs(c/2)},d=u.x+a<0,p=u.x+l>n.x,h=u.y+s-Pt<0;return(b,y,B)=>{const U=w(b.state.position),P=z(U,u),S={x:d&&P.x<n.x*ce?Math.min(-a,n.x*ce-U.x):p&&P.x>n.x*(1-ce)?Math.max(n.x-l,n.x*(1-ce)-U.x):u.x,y:h&&P.y<n.y*ce?n.y*ce-U.y:u.y};if(B)e.x=S.x,e.y=S.y;else{const F=Ks*y,K=_e(e,S),le=zn(K);if(le>F){const it={x:K.x/le,y:K.y/le};e.x-=it.x*F,e.y-=it.y*F}else e.x=S.x,e.y=S.y}}},ea=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=Qe(t);return new j().rect(e+r.x,o-Pt,n-e,r.y-o+Pt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class _n{#e=new v({label:"items"});#o=new v({label:"floorEdge"});#r=new v({children:[this.#e,this.#o]});#n=!1;#a=new Map;#i=new Map;#s;#c;#f;#l;#t;#u;constructor(e,n,r){const{userSettings:{displaySettings:o},upscale:i}=C.getState();this.#c=o,this.#f=i,this.#l=n,this.#t=e,this.#u=r,this.#r.label=`RoomRenderer(${n.id})`,this.initFilters(!r&&o.colourise,n.color),o.showBoundingBoxes!=="none"&&this.#r.addChild(ea(n.roomJson)),this.#s=Qs(n,this.#r,i.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?It:new N(Nt(n).main.original)}#h(e){for(const n of I(this.#l.items)){let r=this.#i.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Ys(n,this.#l,this.#t),r==="not-needed"){this.#i.set(n.id,"not-needed");continue}this.#i.set(n.id,r),(n.type==="floorEdge"?this.#o:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#i.entries())this.#l.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#i.delete(n))}#d(e){const{order:n}=Er(Bs(this.#l.items,e.movedItems,this.#a),this.#l.items);for(let r=0;r<n.length;r++){const o=this.#i.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#n?e:{...e,movedItems:new Set(I(this.#l.items))};this.#s(Ke(this.#t),n.deltaMS,!this.#n),this.#h(n),(!this.#n||n.movedItems.size>0)&&this.#d(n),this.#n=!0}destroy(){this.#r.destroy({children:!0}),this.#i.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#c}get upscale(){return this.#f}get everRendered(){return this.#n}get container(){return this.#r}get roomState(){return this.#l}get paused(){return this.#u}}var rt=`in vec2 aPosition;
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
}`,ra=Object.defineProperty,oa=(t,e,n)=>e in t?ra(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ne=(t,e,n)=>(oa(t,typeof e!="symbol"?e+"":e,n),n);const Nr=class Vr extends Z{constructor(e){e={...Vr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:na,entryPoint:"mainFragment"}}),r=q.from({vertex:rt,fragment:ta,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ne(this,"uniforms"),Ne(this,"seed"),Ne(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ne(Nr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ia=Nr;var sa=`
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
}`,ua=Object.defineProperty,da=(t,e,n)=>e in t?ua(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ne=(t,e,n)=>(da(t,typeof e!="symbol"?e+"":e,n),n);const Hr=class Xr extends Z{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ve("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Xr.DEFAULT_OPTIONS,...n};const r=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:n?.clamp?ca:aa,entryPoint:"mainFragment"}}),o=q.from({vertex:rt,fragment:n?.clamp?la:sa,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ne(this,"uniforms"),ne(this,"_pixelSize",{x:0,y:0}),ne(this,"_clamp"),ne(this,"_kernels",[]),ne(this,"_blur"),ne(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=fe.getSameSizeTexture(n);let c=n,u=l,d;const p=this._quality-1;for(let h=0;h<p;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),fe.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};ne(Hr,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let fa=Hr;var ha=`in vec2 vTextureCoord;
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
`,ga=`struct ExtractBrightnessUniforms {
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
`,ba=Object.defineProperty,va=(t,e,n)=>e in t?ba(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Gr=(t,e,n)=>(va(t,typeof e!="symbol"?e+"":e,n),n);const qr=class Wr extends Z{constructor(e){e={...Wr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:ga,entryPoint:"mainFragment"}}),r=q.from({vertex:rt,fragment:ma,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Gr(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Gr(qr,"DEFAULT_OPTIONS",{threshold:.5});let xa=qr;var ya=Object.defineProperty,wa=(t,e,n)=>e in t?ya(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ue=(t,e,n)=>(wa(t,typeof e!="symbol"?e+"":e,n),n);const jr=class Yr extends Z{constructor(e){e={...Yr.DEFAULT_OPTIONS,...e};const n=se.from({vertex:{source:ot,entryPoint:"mainVertex"},fragment:{source:pa,entryPoint:"mainFragment"}}),r=q.from({vertex:rt,fragment:ha,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:de.WHITE}}),ue(this,"uniforms"),ue(this,"bloomScale",1),ue(this,"brightness",1),ue(this,"_extractFilter"),ue(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new xa({threshold:e.threshold}),this._blurFilter=new fa({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=fe.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=fe.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),fe.returnTexture(s),fe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};ue(jr,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ta=jr;const In=({crtFilter:t},e)=>[t?new ia({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Ta({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Ca{#e;#o;#r;#n;#a=new v({label:"MainLoop/world"});#i;#s;constructor(e,n){this.#i=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=C.getState();e.stage.addChild(this.#a),e.stage.scale=r,this.#n=new _n(n,pe(n),!1),this.#a.addChild(this.#n.container),this.#r=new Oi,e.stage.addChild(this.#r.container),this.#c()}#c(){const{userSettings:{displaySettings:e}}=C.getState();this.#e=In(e,!0),this.#o=In(e,!1)}tick=({deltaMS:e})=>{const n=C.getState(),r=Ln(n),{userSettings:{displaySettings:o},upscale:i}=C.getState();this.#r.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&o.colourise});const s=r?So:Cs(this.#s,e),a=pe(this.#s);(this.#n.roomState!==a||this.#n.upscale!==i||this.#n.displaySettings!==o||this.#n.paused!==r)&&(this.#n.destroy(),this.#n=new _n(this.#s,a,r),this.#a.addChild(this.#n.container),this.#s.events.emit("roomChange",a.id),this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#n.tick({progression:this.#s.progression,movedItems:s,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#o};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#a),this.#n.destroy(),this.#r.destroy(),this.#i.ticker.remove(this.tick)}}Ye.add(Gn,qn,Wn,jn,Yn,Jn,Zn,Kn,Qn,er,tr,rr,nr,or,ir,sr,ar,lr,cr,ur,dr);ko.defaultOptions.scaleMode="nearest";const Pn=async(t,e)=>{const n=new xr;await n.init({background:"#000000",sharedTicker:!0});const r=pi({campaign:t,inputStateTracker:e});C.dispatch(Gt(r.characterRooms.head.id)),C.dispatch(Gt(r.characterRooms.heels.id));const o=new Ca(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){Lt({playableItem:Ke(r),gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return pe(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Ia=Object.freeze(Object.defineProperty({__proto__:null,default:Pn,gameMain:Pn},Symbol.toStringTag,{value:"Module"}));export{mr as A,fr as C,Z as F,ii as R,ei as S,gr as V,Ia as g,Qo as u};
