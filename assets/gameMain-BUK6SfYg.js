const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-ChAfb6Hq.js","assets/App-C7GiytiJ.js","assets/index-C8rFhfk0.js","assets/index-DIUaDGiq.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-DVWqwlKS.js","assets/Graphics-CW6m7OGC.js","assets/swopCharacters-uIQ-bqLq.js","assets/WebGLRenderer-B1nCeSft.js"])))=>i.map(i=>d[i]);
import{A as _o,a7 as le,a8 as G,n as er,F as se,E as x,f as dt,e as Po,C as b,d as Re,v as it,an as v,D as zt,af as xe,T as Fe,U as Bo,V as Fo,aH as Ao,aI as Do,aJ as zo,m as Lo,aK as Mo,H as Ro,aL as Uo,aM as ne,aN as tr,a2 as nr,aO as Eo,Y as T,a0 as _,L as I,aP as $o,W as B,aQ as No,aR as Ce,aS as Vo,aT as rr,a1 as Ho,aU as je,aV as Xo,aW as tt,aX as Ae,aY as jo,a4 as Se,I as or,aZ as ce,a_ as ft,$ as ee,_ as L,a$ as Lt,b0 as Go,Q as Mt,b1 as qo,b2 as Ne,b3 as ir,p as Ve,Z as ht,b4 as rn,b5 as Wo,b6 as Yo,b7 as Zo,N as E,b8 as Jo,b9 as Qo,a3 as sr,X as pt,ba as qt,bb as Ko,bc as ei,O as ar,bd as ti,be as ni,bf as ri,bg as nt,bh as oi,bi as ii,bj as si,bk as st,a as Ue,bl as at,bm as ai,bn as De,bo as li,bp as ci,bq as lr,br as cr,ad as ge,a5 as on,bs as ui}from"./App-C7GiytiJ.js";import{l as Rt,h as lt,j as sn,g as M,p as C,k as be,m as wt,s as we,n as ue,i as X,q as Ut,t as di,r as fi,u as hi,v as pi,w as j,x as mi,y as Ge,z as gi,A as ae,B as bi,C as vi,D as yi,E as ke,F as an,G as Et,c as Wt,H as xi,I as wi,J as ur,K as mt,L as Yt,M as Ti,N as ln,O as Tt,P as dr,Q as Ci,a as de,R as fr,S as hr,T as cn,U as pr,f as Si,V as mr,W as gr,X as ki,Y as Zt,Z as Ii,_ as Oi,$ as _i,a0 as Pi,a1 as Bi,b as He,a2 as un,a3 as br,e as vr,o as yr,a4 as Fi,a5 as dn,a6 as Ct,a7 as w,a8 as Ai,a9 as Di,aa as fn,ab as gt,ac as zi,ad as Li}from"./swopCharacters-uIQ-bqLq.js";import{S as Mi,G as H}from"./Graphics-CW6m7OGC.js";import{_ as hn,g as Ri}from"./index-C8rFhfk0.js";const xr=class $t extends _o{constructor(e){e={...$t.defaultOptions,...e},super(e),this.enabled=!0,this._state=Mi.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=le.from(n)),r&&(s=G.from(r)),new $t({gpuProgram:i,glProgram:s,...o})}};xr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Z=xr;var Ui=`
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
`,Ei=`in vec2 aPosition;
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
`,$i=`
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
}`;class S extends Z{constructor(e){const n=e.gpu,r=pn({source:$i,...n}),o=le.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=pn({source:Ui,...i}),a=G.from({vertex:Ei,fragment:s}),l=new er({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:se.EMPTY}})}}function pn(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Jt=`
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
    `,Qt=`
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
	`;class wr extends S{constructor(){super({gl:{functions:`
                ${Jt}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Qt}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}wr.extension={name:"color",type:x.BlendMode};class Tr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Tr.extension={name:"color-burn",type:x.BlendMode};class Cr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Cr.extension={name:"color-dodge",type:x.BlendMode};class Sr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Sr.extension={name:"darken",type:x.BlendMode};class kr extends S{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"difference",type:x.BlendMode};class Ir extends S{constructor(){super({gl:{functions:`
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
            `}})}}Ir.extension={name:"divide",type:x.BlendMode};class Or extends S{constructor(){super({gl:{functions:`
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
            `}})}}Or.extension={name:"exclusion",type:x.BlendMode};class _r extends S{constructor(){super({gl:{functions:`
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
                `}})}}_r.extension={name:"hard-light",type:x.BlendMode};class Pr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Pr.extension={name:"hard-mix",type:x.BlendMode};class Br extends S{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"lighten",type:x.BlendMode};class Fr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"linear-burn",type:x.BlendMode};class Ar extends S{constructor(){super({gl:{functions:`
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
            `}})}}Ar.extension={name:"linear-dodge",type:x.BlendMode};class Dr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"linear-light",type:x.BlendMode};class zr extends S{constructor(){super({gl:{functions:`
                ${Jt}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Qt}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}zr.extension={name:"luminosity",type:x.BlendMode};class Lr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Lr.extension={name:"negation",type:x.BlendMode};class Mr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Mr.extension={name:"overlay",type:x.BlendMode};class Rr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Rr.extension={name:"pin-light",type:x.BlendMode};class Ur extends S{constructor(){super({gl:{functions:`
                ${Jt}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Qt}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Ur.extension={name:"saturation",type:x.BlendMode};class Er extends S{constructor(){super({gl:{functions:`
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
                `}})}}Er.extension={name:"soft-light",type:x.BlendMode};class $r extends S{constructor(){super({gl:{functions:`
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
                `}})}}$r.extension={name:"subtract",type:x.BlendMode};class Nr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Nr.extension={name:"vivid-light",type:x.BlendMode};const Nt=[];dt.handleByNamedList(x.Environment,Nt);async function Ni(t){if(!t)for(let e=0;e<Nt.length;e++){const n=Nt[e];if(n.value.test()){await n.value.load();return}}}let Ie;function Vi(){if(typeof Ie=="boolean")return Ie;try{Ie=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Ie=!1}return Ie}var Vr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Vr||{});class Hi{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Xi=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Hr=class Xr extends Po{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Xi,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ni(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Xr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(Re(it,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:v.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Vr.ALL);const{clear:r,clearColor:o,target:i}=e;v.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Hi(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Vi())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Hr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let jr=Hr,qe;function ji(t){return qe!==void 0||(qe=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??jr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!zt.get().getWebGLRenderingContext())return!1;let r=zt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),qe}let We;async function Gi(t={}){return We!==void 0||(We=await(async()=>{const e=zt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),We}const mn=["webgl","webgpu","canvas"];async function qi(t){let e=[];t.preference?(e.push(t.preference),mn.forEach(i=>{i!==t.preference&&e.push(i)})):e=mn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Gi()){const{WebGPURenderer:a}=await hn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-ChAfb6Hq.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&ji(t.failIfMajorPerformanceCaveat??jr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await hn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-B1nCeSft.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Gr="8.8.1";class qr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Gr)}static destroy(){}}qr.extension=x.Application;class Wi{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Gr)}destroy(){this._renderer=null}}Wi.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const Wr=class Vt{constructor(...e){this.stage=new b,e[0]!==void 0&&Re(it,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await qi(e),Vt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Re(it,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Vt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Wr._plugins=[];let Yr=Wr;dt.handleByList(x.Application,Yr._plugins);dt.add(qr);var Yi=`in vec2 aPosition;
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
`,Zi=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,gn=`struct GlobalFilterUniforms {
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
}`;const Zr=class Jr extends Z{constructor(e){e={...Jr.defaultOptions,...e};const n=le.from({vertex:{source:gn,entryPoint:"mainVertex"},fragment:{source:gn,entryPoint:"mainFragment"}}),r=G.from({vertex:Yi,fragment:Zi,name:"alpha-filter"}),{alpha:o,...i}=e,s=new er({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Zr.defaultOptions={alpha:1};let Ji=Zr;class Ee extends xe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[p]=u;super({...h,texture:p instanceof se?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Fe.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Fe.shared.add(this.update,this,Bo.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(se.from(e[r]));return new Ee(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(se.from(e[r]));return new Ee(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof se)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Fe.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Fe.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Qi extends Fo{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new Ao({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Ki(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Re(it,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class es extends Qi{constructor(...e){const n=Ki(e,"Text");super(n,Do),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=zo.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class Kt extends se{static create(e){return new Kt({source:new Lo(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}var Ye={},bn;function ts(){if(bn)return Ye;bn=1;var t=Mo(),e=t.mark(i),n=Ro(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,p=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=p.length,l=new Array(a),c=0;c<a;c++)l[c]=p[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return h=d[u],y.delegateYield(o(h),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}Ye.__concat=i;var s=r(i);return Ye.concat=s,Ye}var St,vn;function ns(){return vn||(vn=1,St=ts().concat),St}var rs=ns();const Ht=Ri(rs);function os(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const is=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},ss=({campaign:t,inputStateTracker:e})=>{const n=is(t),r=Uo(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&Rt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&Rt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:lt(o.items.head),heels:i===void 0?void 0:lt(i.items.heels)},inputStateTracker:e,campaign:t,events:os(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},g={pureBlack:new v("#000000"),lightBlack:new v("#212C20"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},N={original:new v("rgb(255, 255, 255)"),basic:new v("rgb(210, 210, 210)"),dimmed:new v("rgb(120, 120, 120)")},V={original:new v("rgb(255, 255, 0)"),basic:new v("hsl(50,65%,70%)"),dimmed:g.redShadow},q={original:new v("rgb(255, 0, 255)"),basic:g.pink,dimmed:new v("hsl(290,35%,38%)")},k={original:new v("rgb(0, 255, 255)"),basic:new v("hsl(183, 50%, 50%)"),dimmed:new v("hsl(183, 50%, 25%)")},W={original:new v("rgb(0, 255, 0)"),basic:g.moss,dimmed:new v("hsl(73,50%,25%)")},en={white:{basic:{main:N,edges:{towards:k,right:V},hud:{lives:V,dimmed:q,icons:k}},dimmed:{main:N,edges:{towards:W,right:k},hud:{lives:V,dimmed:q,icons:k}}},yellow:{basic:{main:V,edges:{towards:W,right:N},hud:{lives:k,dimmed:q,icons:W}},dimmed:{main:V,edges:{towards:k,right:k},hud:{lives:k,dimmed:q,icons:W}}},magenta:{basic:{main:q,edges:{towards:W,right:k},hud:{lives:N,dimmed:k,icons:V}},dimmed:{main:q,edges:{towards:W,right:k},hud:{lives:N,dimmed:k,icons:V}}},cyan:{basic:{main:k,edges:{towards:q,right:N},hud:{lives:N,dimmed:W,icons:V}},dimmed:{main:k,edges:{towards:q,right:N},hud:{lives:N,dimmed:W,icons:V}}},green:{basic:{main:W,edges:{towards:k,right:V},hud:{lives:N,dimmed:q,icons:k}},dimmed:{main:W,edges:{towards:k,right:V},hud:{lives:N,dimmed:q,icons:k}}}},tn=t=>en[t.hue][t.shade],Qr=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+sn>n?100-Math.ceil((n-e)/(sn/100)):0},Kr=t=>{const e=100*M.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/M.w):0},yn={x:.5,y:1},xn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(xn(t)?c=as(t):c=new xe(ne.textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:p}=u;p>=1;p--)for(let m=1;m<=u.z;m++){const y=f({...t,times:void 0,label:`(${h},${p},${m})`}),A=C({x:h-1,y:p-1,z:m-1});y.x+=A.x,y.y+=+A.y,d.addChild(y)}return d}if(e===void 0&&r===void 0)if(xn(t))c.anchor=yn;else{const u=ne.data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=yn}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function as({animationId:t,reverse:e,playOnce:n}){const o=ne.animations[t].map(s=>({texture:s,time:tr}));e&&o.reverse();const i=new Ee(o);return i.animationSpeed=nr.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const bt=`in vec2 aPosition;
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
`,ls=`in vec2 vTextureCoord;
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
`;class Xe extends Z{constructor(e){const n=Object.keys(e).length,r=G.from({vertex:bt,fragment:ls.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const cs=`precision mediump float;
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
`,wn=[g.pureBlack,g.lightBlack];class F extends Z{uniforms;constructor(e="white"){const n=G.from({vertex:bt,fragment:cs,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=wn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=wn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const eo=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),to=t=>eo(en[t.color.hue][t.color.shade].main),us=t=>new Xe({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...to(t)}),ds=new Xe({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),fs=t=>{const[e,n,r]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:r/2})},Ze=t=>new Xe({replaceLight:t,replaceDark:fs(t)}),Xt=(t,e,n)=>n?new Xe(eo(en[t.color.hue][t.color.shade].edges[e])):new F(tn(t.color).edges[e].original),K=t=>new Xe(to(t)),$e=Eo,hs=`#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform vec3 uOutline;
uniform float uOutlineWidth;

void main(void) {

    vec4 sampledColour = texture(uTexture, vTextureCoord);

    if(sampledColour.a != 0.0f) {
        // can only outline at transparent pixels
        finalColor = sampledColour;
        return;
    }

    vec2 texelSize = vec2(1.0f) / vec2(textureSize(uTexture, 0));

    // right
    if(vTextureCoord.x + texelSize.x * uOutlineWidth >= 1.0f) {
        //original 
        finalColor = sampledColour;
        return;
    }
    vec4 colourToRight = texture(uTexture, vec2(vTextureCoord.x + texelSize.x * uOutlineWidth, vTextureCoord.y));

    if(colourToRight.a != 0.0f) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // left
    if(vTextureCoord.x - texelSize.x < 0.0f) {
        finalColor = sampledColour;
        return;
    }

    vec4 colourToLeft = texture(uTexture, vec2(vTextureCoord.x - texelSize.x * uOutlineWidth, vTextureCoord.y));

    if(colourToLeft.a != 0.0f) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // below
    if(vTextureCoord.y + texelSize.y * uOutlineWidth > 1.0f) {
        finalColor = sampledColour;
        return;
    }

    vec4 colourBelow = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y * uOutlineWidth));

    if(colourBelow.a != 0.0f) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // above
    if(vTextureCoord.y - texelSize.y * uOutlineWidth < 0.0f) {
        finalColor = sampledColour;
        return;
    }

    vec4 colourAbove = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y * uOutlineWidth));

    if(colourAbove.a != 0.0f) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    finalColor = sampledColour;
}
`;class ye extends Z{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=G.from({vertex:bt,fragment:hs,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const Y=new ye({outlineColor:g.pureBlack,upscale:T.getState().upscale.gameEngineUpscale,lowRes:!0}),ze=new F,Tn=new F,jt=new F,Cn=new F(g.moss),Le=new F,ct=[ze,Y],ps=[Le,Y],ms=[Y,jt],Je={original:[Y,Le],colourised:{head:[Y,new F(g.metallicBlue)],heels:[Y,new F(g.pink)]}},fe=13,gs=2;class U{constructor(e){this.inputStateTracker=e,this.container.addChild(this.#t),this.container.addChild(new H().circle(0,0,24).fill("#00000000"));for(const n of _(this.arrowSprites))this.container.addChild(n);this.container.on("pointerenter",n=>{this.#r=n.pointerId,this.handlePointer(n),this.container.on("globalpointermove",this.handlePointer),this.container.on("pointerup",()=>{this.container.off("globalpointermove",this.handlePointer),this.#r=void 0,e.hudInputState.directionVector=I}),this.container.on("pointerupoutside",()=>{this.container.off("globalpointermove",this.handlePointer),this.#r=void 0,e.hudInputState.directionVector=I})})}container=new b({label:"OnScreenJoystick",eventMode:"static"});static#e=[new F(g.metallicBlue),Y];static#n=[new F(g.highlightBeige),Y];arrowSprites={away:f({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:fe,y:-13,filter:U.#e}),awayRight:f({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:fe*Math.SQRT2,filter:U.#e}),right:f({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:fe,y:fe,filter:U.#e}),towardsRight:f({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:fe*Math.SQRT2,filter:U.#e}),towards:f({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-13,y:fe,filter:U.#e}),towardsLeft:f({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-13*Math.SQRT2,filter:U.#e}),left:f({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-13,y:-13,filter:U.#e}),awayLeft:f({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-13*Math.SQRT2,filter:U.#e})};#t=f({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#r;handlePointer=e=>{if(e.pointerId!==this.#r)return;const n=$o(T.getState()),{x:r,y:o}=this.container,{x:i,y:s}=e,{width:a,height:l}=this.container.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=B(No({x:-c,y:-u}),gs);this.inputStateTracker.hudInputState.directionVector=d};tick(e){const{directionVector:n}=this.inputStateTracker,r=Ce(n)>Vo?rr(n):void 0;for(const[o,i]of Ho(this.arrowSprites))i.filters=o===r?e?U.#n:ps:e?U.#e:ct;this.#t.filters=e?$e:ze}}const bs=nr.frames.button.frame,Sn={colourised:{red:Ze(g.midRed),blue:Ze(g.metallicBlue),yellow:Ze(g.highlightBeige),green:Ze(g.moss)},zx:{red:new F(je.zxRed),blue:new F(je.zxBlue),yellow:new F(je.zxYellow),green:new F(je.zxGreen)}};class Oe{constructor(e,n,r,o="button",i="button.pressed"){this.actions=e,this.inputStateTracker=n,this.colour=r,this.textureId=o,this.pressedTextureId=i;const s=this.container=f(o),{hudInputState:a}=n;s.eventMode="static",s.on("pointerdown",()=>{for(const l of e)a[l]=!0}),s.on("pointerup",()=>{for(const l of e)a[l]=!1}),s.on("pointerleave",()=>{for(const l of e)a[l]=!1})}container;#e(e){this.colour&&(e?this.container.filters=Sn.colourised[this.colour]:this.container.filters=Sn.zx[this.colour])}#n(){const e=this.actions.every(n=>this.inputStateTracker.currentActionPress(n)!=="released");this.container.texture=ne.textures[e?this.pressedTextureId:this.textureId]}update(e){this.#e(e),this.#n()}}const kt=14,kn=[new F(g.lightGrey),Y];class vs{constructor(e){this.gameState=e,this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{},joystick:new U(e.inputStateTracker)};const n=this.#n.buttons={menu:new Oe(["menu_openOrExit"],e.inputStateTracker,void 0,"hud.char.Menu"),jump:new Oe(["jump"],e.inputStateTracker,"green"),carry:new Oe(["carry"],e.inputStateTracker,"blue"),fire:new Oe(["fire"],e.inputStateTracker,"red"),carryAndJump:new Oe(["carry","jump"],e.inputStateTracker,"yellow")},{mainButtonNest:r,joystick:o}=this.#n;r.addChild(n.jump.container),r.addChild(n.carry.container),r.addChild(n.fire.container),r.addChild(n.carryAndJump.container),n.jump.container.y=kt,n.carry.container.x=-14*2,n.carryAndJump.container.y=-14,n.fire.container.x=kt*2,n.menu.container.x=24,n.menu.container.y=24,n.menu.container.scale=2,n.menu.container.filters=kn,this.#e.addChild(r),this.#e.addChild(n.menu.container),this.#e.addChild(o.container),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){}#r(e){const n=bs.w+kt;this.#n.mainButtonNest.x=e.x-n,this.#n.mainButtonNest.y=e.y-14,this.#n.joystick.container.x=n-10,this.#n.joystick.container.y=e.y-24}#i(){const{currentCharacterName:e}=this.gameState,n=be(this.gameState,"heels"),r=be(this.gameState,"head"),o=(this.#o(e,"heels")&&n?.hasBag)??!1;this.#n.buttons.carryAndJump.container.visible=this.#n.buttons.carry.container.visible=o;const i=(this.#o(e,"head")&&r?.hasHooter)??!1;this.#n.buttons.fire.container.visible=i}#o(e,n){return e===n||e==="headOverHeels"}tick({screenSize:e,colourise:n}){this.#r(e);for(const r of _(this.#n.buttons))r.update(n);this.#i(),this.#n.joystick.tick(n),this.#n.buttons.menu.container.filters=n?kn:ct}get container(){return this.#e}destroy(){this.#e.destroy()}}function ut(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}function*ys(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;Xo(o),yield f({textureId:o,x:(r+.5-n/2)*tt.w})}}function _e(t,e){t.removeChildren(),ut(ys(e),t)}const xs=250,ws={server:24,desktop:24,tablet:24,mobile:16},Ts={server:56,desktop:56,tablet:56,mobile:38},Cs={server:80,desktop:80,tablet:80,mobile:60},Ss={server:24,desktop:24,tablet:16,mobile:18},In=112,Pe=t=>t==="heels"?1:-1;class ks{constructor(e,n){this.gameState=e,this.deviceType=n;for(const r of wt)this.#e.addChild(this.#t[r].livesText),this.#e.addChild(this.#t[r].sprite),this.#e.addChild(this.#t[r].shield.container),this.#e.addChild(this.#t[r].extraSkill.container);this.deviceType!=="mobile"&&(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[Cn],this.#t.fps.y=tt.h,this.#r(),n!=="desktop"&&(this.#n=new vs(e),this.#e.addChild(this.#n.container))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#o("head"),livesText:this.#s({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#i({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#i({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#i({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#i({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#o("heels"),livesText:this.#s({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#i({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#i({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#i({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#s({label:"fps",outline:!0})};#r(){const{inputStateTracker:{hudInputState:e}}=this.gameState;for(const n of wt){const{sprite:r}=this.#t[n];r.eventMode="static",r.on("pointerdown",()=>{e[`swop.${n}`]=!0}),r.on("pointerup",()=>{e[`swop.${n}`]=!1}),r.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#i({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new xe({texture:ne.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Tn,y:n?0:8});s.addChild(a);const l=this.#s({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=tt.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=Y),{text:l,icon:a,container:s}}#o(e){const n=new xe(ne.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#s({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?ms:jt,scale:{x:1,y:e?2:1}})}#l(e){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Pe("head")*In,this.#t.head.doughnuts.container.y=e.y-Ae.h-8,this.#t.heels.carrying.container.y=e.y-Ae.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Pe("heels")*In,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-tt.w*2}#d(e){return f(e.type==="spring"?"spring.released":e.type==="sceneryPlayer"?e.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":e.config.style)}#a(e,n){return e?n?$e:Le:ze}#c(e,n){const r=be(e,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{container:s}=this.#t.heels.carrying,a=s.children.length>0;if(i===null&&a)for(const l of s.children)l.destroy();i!==null&&!a&&s.addChild(this.#d(i)),s.filters=this.#a(!0,n),this.#t.heels.bag.icon.filters=this.#a(o,n)}#f(e,n){const r=be(e,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#a(o,n),this.#t.head.doughnuts.icon.filters=this.#a(i!==0,n),_e(this.#t.head.doughnuts.text,i)}#h(e,n,r){const o=be(e,r),{text:i,container:s}=this.#t[r].shield,{text:a,container:l}=this.#t[r].extraSkill,c=Qr(o),u=c>0||this.deviceType!=="mobile";s.visible=u,u&&(_e(i,c),s.y=n.y),l.x=s.x=(n.x>>1)+Pe(r)*Cs[this.deviceType];const d=o===void 0?0:r==="head"?Kr(o):o.bigJumps,h=d>0||this.deviceType!=="mobile";l.visible=h,h&&(_e(a,d),l.y=n.y-Ss[this.deviceType])}#u(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#p(e,n,r,o){const i=this.#u(e,o),s=this.#t[o].sprite;i?s.filters=r?$e:Le:s.filters=ze,s.x=(n.x>>1)+Pe(o)*Ts[this.deviceType],s.y=n.y-Ae.h}#g(e,n,r){const i=be(e,r)?.lives??0,s=this.#t[r].livesText;s.x=(n.x>>1)+Pe(r)*ws[this.deviceType],s.y=n.y,_e(s,i??0)}#b(e,n){const r=we(e);if(r===void 0)return;const o=tn(r.color);ze.targetColor=o.hud.dimmed[n?"dimmed":"original"],jt.targetColor=o.hud.dimmed[n?"basic":"original"],Tn.targetColor=o.hud.icons[n?"basic":"original"],Le.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=n?this.#u(e,"head")?Je.colourised.head:ct:Je.original,this.#t.heels.livesText.filters=n?this.#u(e,"heels")?Je.colourised.heels:ct:Je.original}#m=Number.NEGATIVE_INFINITY;#v(){if(jo(T.getState())){if(performance.now()>this.#m+xs){const e=Fe.shared.FPS;_e(this.#t.fps,Math.round(e)),Cn.targetColor=e>56?g.moss:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#m=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){const{gameState:n,screenSize:r,colourise:o}=e;this.#b(n,o);for(const i of wt)this.#g(n,r,i),this.#p(n,r,o,i),this.#h(n,r,i);this.#l(r),this.#f(n,o),this.#c(n,o),this.#v(),this.#n?.tick(e)}get container(){return this.#e}destroy(){this.#e.destroy()}}const On={movementType:"vel",vels:{gravity:I}},Is=(t,e,n)=>{if(!ue(t))return On;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=di[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?X("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Ut*n,-a)}}}:On:{movementType:"vel",vels:{gravity:{z:Math.max(o-Ut*n,-a)}}}},Te={movementType:"steady"},Qe=t=>{const n=t/mi*tr;return(t+.5*Ut*n**2)/n},Os={head:Qe(Ge.head),headOnSpring:Qe(Ge.head+M.h),heels:Qe(Ge.heels),heelsOnSpring:Qe(Ge.heels+M.h)},_s=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Os[`${n}${e?"OnSpring":""}`]},Ps=t=>!(t===null||hi(t)||pi(t)&&t.config.gives==="scroll"||j(t)&&t.state.standingOn===null),no=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&Ps(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Te;const i=fi(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:_s(t,i)}},stateDelta:{action:"moving",jumped:!0}}},Bs=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Ce(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return B(n,l)},_n={movementType:"vel",vels:{walking:I}},ro=(t,e,n)=>{const r=Fs(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Ce(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Se(r.vels.walking,I)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Fs=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:h,gravity:p}}}=t,m=n===t.id,y=m?e.currentActionPress("jump"):"released",A=m?e.directionVector:I,D=a===null&&p.z<0,$=o==="head"&&Kr(t.state)>0&&a!==null,O=o==="headOverHeels"?D?"head":"heels":$?"heels":o,P=s?l:A,R=ae[O];if(c!==null||i==="death")return _n;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:or(h,B(h,gi*r))}}:_n;if(y!=="released"){const re=ce(ft(P,ee)?l:P),Oo=X("spring")(a)?1:bi;return{movementType:"vel",vels:{walking:B({...re,z:0},R*Oo)},stateDelta:{facing:re}}}}if(Ce(P)!==0)return D?{movementType:"vel",vels:{walking:B({...P,z:0},R)},stateDelta:{facing:P,action:"falling"}}:{movementType:"vel",vels:{walking:Bs({vel:h,acc:vi[O],deltaMS:r,maxSpeed:R,unitD:P,minSpeed:0})},stateDelta:{facing:P,action:"moving"}};if(u>0&&u<1){const re=Se(d,l)?1:0;return{movementType:"position",posDelta:B(l,re-u),stateDelta:{action:D?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:I},stateDelta:{action:D?"falling":"idle"}}},Pn=M.h,Bn=.001,As=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=an**2/(2*ke);if(n==="up"){if(e<=r)return Math.max(Bn,Math.sqrt(2*ke*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(Bn,Math.sqrt(2*ke*o))}else return an}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*ke*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*ke*Math.max(e,0))):-.036},Ds={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function zs({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(L(o).some(h=>yi(h)&&h.config.style==="stepStool"))return Ds;const l=t*Pn,c=e*Pn,u=As({currentAltitude:r-l,direction:n,totalDistance:c-l});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=l?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function Ls(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&X("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:Et}}}:Te;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return Wt({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Et}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const Fn={movementType:"vel",vels:{movingFloor:I}},Ms=(t,e,n)=>{if(j(t)&&t.state.teleporting!==null)return Fn;const{state:{standingOn:r}}=t;if(r===null||!X("conveyor")(r))return Fn;const{config:{direction:o}}=r,s=X("heels")(t)&&t.state.action==="moving"&&Lt(t.state.facing)===Go(o)?ae.heels:xi;return{movementType:"vel",vels:{movingFloor:B(Mt[o],s)}}},Me=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<wi},oo=150,io=t=>t[Math.floor(Math.random()*t.length)],te=Object.freeze({movementType:"vel",vels:{walking:I}}),vt=t=>ur(t)?ae[t.config.which]:ae[t.type],An=M.w/2,Rs=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ae.homingBot;if(!ft(e,ee))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Ne(l.state.position,t);if(Math.abs(c.y)<An)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<An)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},so=(t,e)=>{const{items:{head:n,heels:r,headOverHeels:o}}=e;if(o!==void 0)return Me(o)?void 0:e.items.headOverHeels;const i=n===void 0||Me(n)||n.state.action==="death"?void 0:rn(n.state.position,t),s=r===void 0||Me(r)||r.state.action==="death"?void 0:rn(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},Us=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return te;const l=so(o,e);if(l===void 0||s+oo>e.roomTime)return Te;const c=Ne(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>M.w/4?u:Ve(u),h=vt(t),p={...I,[d]:c[d]>0?h:-h},m=ce(p),y=!ft(m,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:m,...y?{timeOfLastDirectionChange:e.roomTime}:ht}}},Dn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return te;const a=so(i,e);if(a===void 0)return te;const l=a.state.position,c=M.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return te;const d=Ne(a?.state.position,i),h=vt(t),p=(1+Math.sqrt(2))/2,m=h*p,y=B({...d,z:0},m/ir(d)*(o?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:ce(y)}}},It=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return te;if(!(Se(i,I)||Math.random()<r/1e3))return Te;const l=io(o);return{movementType:"vel",vels:{walking:B(Mt[l],vt(t))},stateDelta:{facing:Mt[l]}}},Es=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?te:ft(i,ee)?{movementType:"vel",vels:{walking:B(o,vt(t))}}:Te},$s=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=io([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},Ot=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<oo))return;const c=mt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=$s(s,c,o);t.state.vels.walking=u,t.state.facing=ce(u),t.state.durationOfTouch=0},Ns=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=I)},Vs=(t,e,n,r)=>{if(!t.state.activated||ur(t)&&t.state.busyLickingDoughnutsOffFace)return te;switch(t.config.movement){case"patrol-randomly-diagonal":return It(t,e,n,r,Zo);case"patrol-randomly-xy8":return It(t,e,n,r,Yo);case"patrol-randomly-xy4":return It(t,e,n,r,Wo);case"towards-tripped-on-axis-xy4":return Rs(t,e);case"towards-on-shortest-axis-xy4":return Us(t,e);case"back-forth":case"clockwise":return Es(t);case"unmoving":case"free":return te;case"towards-when-in-square-xy8":return Dn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return Dn(t,e,n,r,qo(T.getState()));default:throw t.config,new Error("this should be unreachable")}},Hs=t=>{const{movingItem:e,touchedItem:n}=t;if(ue(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Ot(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Ot(t,"opposite");break;case"clockwise":Ot(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Ns(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Xs=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},zn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>Xs(t,e,n,r),js=.001,nn=(t,e,n=.001)=>{if(!ue(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:Yt({state:{position:E(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+js},id:t.id},{state:{position:E(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},ao=(t,e)=>{const r=[...L(e).filter(i=>nn(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Ti(s,i);return a<0||a===0&&zn(t,s)>zn(t,i)?s:i})};function lo({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;Qr(n)>0||Me(e)||(e.state.action="death",e.state.expires=t+Et)}const co=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=Tt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=Tt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=ln(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=Tt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=ln(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":T.dispatch(Qo(r.config.page));break;case"reincarnation":break;case"crown":{T.dispatch(Jo(r.config.planet));break}default:r.config}},Gs=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;sr(i,r)<=0||e.state.action!=="death"&&Wt({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},qs=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=pt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=E(t.state.position,s)};function Ws({movingItem:t}){t.state.autoWalk=!1}const J=(t,...e)=>X(...e)(t.touchedItem),Be=(t,...e)=>X(...e)(t.movingItem),uo=t=>j(t.movingItem),Ys=t=>j(t.touchedItem),Zs=t=>dr(t.touchedItem),Ln=t=>{switch(!0){case J(t,"stopAutowalk"):Ws(t);break;case Zs(t):lo(t);break;case J(t,"portal"):Gs(t);break;case J(t,"pickup"):co(t);break;case J(t,"doorFrame"):qs(t);break}},Js=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of qt(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&T.dispatch(Ko(o.path))}},Qs=({movingItem:t,touchedItem:e})=>{if(!ue(t))return;const{state:{position:n},aabb:r}=e,o=mt(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=ce(o),s=B(i,-.05);return e.state.vels.sliding=s,!1},Ks=({movingItem:t,touchedItem:e})=>{if(!ue(e))return;const n=t.state.vels.sliding;if(Se(n,I))return;const{state:{position:r},aabb:o}=t,i=mt(e.state.position,e.aabb,r,o);return sr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=I),!1},ea=2*Ci,fo=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ea,positionDelta:n})},ta=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...or(r.state.position,o),z:0};if(!Se(s,I))for(const a of r.state.stoodOnBy)fo(a,e,s)}},na=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=mt(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=ce(a);for(const c of o){const u=e.items[c],d=B(l,-.025*r);u.state.facing=d,fo(u,e,d)}},Mn=t=>de(t.movingItem)&&nn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),ho=(t,e)=>{let n=I;for(const r of e){if(r.movementType==="position"&&(n=E(n,r.posDelta)),r.movementType==="vel"&&(de(t)||X("lift")(t)))for(const[i,s]of qt(r.vels)){const a={...I,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},Rn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&j(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Mn(t)){if(Mn(t)&&uo(t)){fr({above:t.movingItem,below:t.touchedItem});const n=[no(t.movingItem,t.gameState),ro(t.movingItem,t.gameState,t.deltaMS)];ho(t.movingItem,n)}hr(t)}};function ra(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const po=t=>{uo(t)&&Ln(t),Ys(t)&&Ln({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),J(t,...cn)&&Qs(t),Be(t,...cn)&&Ks(t),(Be(t,"monster")&&J(t,"firedDoughnut")||Be(t,"firedDoughnut")&&J(t,"monster"))&&ra(t),(Be(t,"monster")||Be(t,"movableBlock"))&&Hs(t),J(t,"switch")&&Js(t),J(t,"joystick")&&na(t),t.touchedItem.state.disappear&&Rn(t),t.movingItem.state.disappear&&ue(t.touchedItem,t.movingItem)&&Rn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},oa=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=L(_(e.items)).filter(pr),u=s===null?sa(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}ia(e,i,u)}else{if(t.state.standingOn===null||!mo(t,_(e.items)))return;const d=Si({gameState:n,room:e,itemType:s.type,config:s.config,position:l});mr({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:po}),i.carrying=null}},ia=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,gr({room:t,item:n})},sa=(t,e)=>ao(t,L(_(e.items)).filter(pr)),mo=(t,e)=>{const n={position:E(t.state.position,{z:M.h})},r=ki({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(ue(o,t)){if(!de(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!mo(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0};function*aa(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const la=M.w*Math.sqrt(2)+1,ca=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,h=500,p=ce(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+h<c){const m={type:"firedDoughnut",...Ii,config:ht,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:E(u,B(p,la),t.type==="headOverHeels"?{z:M.h}:I),vels:{fired:B(p,ae.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};Zt({room:e,item:m}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},ua=2;function*da(t,e,n,r){de(t)&&(yield Is(t,n,r),yield Ms(t),yield*aa(t,e)),j(t)&&(yield ro(t,n,r),t.id===n.currentCharacterName&&(yield Ls(t,n,r),yield no(t,n),Oi(t)&&oa(t,e,n,r),_i(t)&&ca(t,e,n))),Pi(t)&&(yield zs(t)),Bi(t)&&(yield Vs(t,e,n,r))}const fa=(t,e,n,r)=>{!de(t)||t.state.standingOn===null||(j(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&co({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||j(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&hr({touchedItem:t.state.standingOn,gameState:n,room:e}))},ha=(t,e,n,r)=>{j(t)&&t.state.standingOn!==null&&dr(t.state.standingOn)&&lo({room:e,movingItem:t,touchedItem:t.state.standingOn});const o=[...da(t,e,n,r)];fa(t,e,n);let i=ho(t,o);(de(t)||X("lift")(t)||X("firedDoughnut")(t))&&(i=E(i,...L(_(t.state.vels)).map(l=>B(l,r))));const s=Math.ceil(Ce(i)/ua),a=B(i,1/s);for(let l=0;l<s;l++)mr({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:po})},pa=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,ie(t,e);const u=un(e)[c],d=ve({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:lt(u)};return}if(t.entryState.headOverHeels!==void 0){ie(t,e);const c=ve({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=un(e);if(ie(t,c),ie(t,u),Yt(c,u)){const d=br({head:c,heels:u});ie(t,d,"heels");const h=ve({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:lt(d)};return}else{const d=ve({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},ve=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Rt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)Zt({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Fi(o,t);return o},ie=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},ma=(t,e)=>{const n=vr(t,yr(e.type));if(e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];ie(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=br({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});ie(t,a);const l=ve({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Zt({room:r,item:e});return}else{const s=ve({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},ga=(t,e)=>{e.type==="headOverHeels"?pa(t,e):ma(t,e),He(t)===void 0&&T.dispatch(ei())},ba=t=>{for(const e of _(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){dn(n);continue}if(!nn(n,e)){dn(n);const r=ao(n,_(t.items));r!==void 0&&fr({above:n,below:r})}}},va=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ya=(t,e,n)=>{for(const r of _(t.items))!de(r)||t.roomTime===r.state.actedOnAt||ti(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=ni(r.state.position),n.add(r))},xa=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},wa=ht,Ta=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=Un(t,e),i=we(t)?.items??wa;n=new Set(L(Ht(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return Un(t,e*t.gameSpeed)},Un=(t,e)=>{const{inputStateTracker:n}=t,r=we(t);if(r===void 0)return ar;const o=Object.fromEntries(L(qt(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Ct(t),n.currentActionPress("swop.head")==="tap"&&Ct(t,"head"),n.currentActionPress("swop.heels")==="tap"&&Ct(t,"heels");for(const a of _(r.items))va(a,r)&&(gr({room:r,item:a}),j(a)&&ga(t,a));const i=Object.values(r.items).sort(xa);for(const a of i){const l=He(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&ha(a,r,t,e)}ba(r);const s=new Set(L(_(r.items)).filter(a=>o[a.id]===void 0||!Se(a.state.position,o[a.id])));return ta(s,r,o),ya(r,o,s),Ca(t,r,e),s},Ca=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=He(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=vr(t,yr(r.type));i!==void 0&&(i.state.gameTime+=n)}}},En=(t,e)=>{const n=w(t),r=w(E(t,{x:e.x,z:e.z})),o=w(E(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},_t=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Sa=(t,e,n,r)=>{const o=En(t,e),i=En(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=_t(s,a,l,c),d=o.topRight.y-o.topRight.x/2,h=o.bottomCentre.y-o.bottomCentre.x/2,p=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,y=_t(d,h,p,m),A=o.topLeft.y+o.topLeft.x/2,D=o.bottomCentre.y+o.bottomCentre.x/2,$=i.topLeft.y+i.topLeft.x/2,O=i.bottomCentre.y+i.bottomCentre.x/2,P=_t(A,D,$,O);return u&&y&&P},ka=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Sa(n,r,o,i))return 0;for(const s of ri){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return $n(e)-$n(t)},$n=t=>t.state.position.x+t.state.position.y-t.state.position.z;class rt extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const Ia=t=>{const e=Oa(t);let n=e.length,r=n;const o=new Array(n),i={},s=_a(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new rt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const p=h[--c];try{a(p,s.get(p),u)}catch(m){throw m instanceof rt?m.hasClosedCycle?m:new rt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function Oa(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function _a(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Nn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ke=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Pa=(t,e=new Set(_(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Ke(n,o,s);for(const o of e)if(o.renders)for(const i of _(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=ka(o,i);if(Nn(r,o,i),s===0){Ke(n,o.id,i.id),Ke(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;Nn(n,a,l),Ke(n,l,a)}return n},go=(t,e,n=3)=>{try{return{order:Ia(t),impossible:!1}}catch(r){if(r instanceof rt){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:go(t,e,n-1).order,impossible:!0}}else throw r}},Ba=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Fa=(t,e,n)=>{const o=ne.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ne.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},et=t=>z(({item:e})=>Ai(e)?f({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):f(t)),z=t=>({item:e,room:n,currentlyRenderedProps:r,displaySettings:o,onHold:i,gameState:s})=>r===void 0?{container:t({item:e,room:n,displaySettings:o,onHold:i,gameState:s,previousRendering:null}),renderProps:ht}:"no-update";function*Aa({config:{direction:t,inHiddenWall:e,height:n}},r){const o=pt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=f({textureId:`generic.door.floatingThreshold.${o}`,...nt(a,{y:-12*n})});l.filters=Xt(r,o==="x"?"towards":"right",!0),yield l}}else{yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...nt(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...nt(a,{y:-l*M.h})})}}yield*s(C({...ee,[o]:1})),yield*s(ee),e||(yield f({pivot:{x:16,y:M.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...C({...ee,[o]:1})}))}const bo=(t,e)=>{const n=pt(t),r=Ve(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):ee},Da=z(({item:t,room:e})=>ut(Aa(t,e),new b({filters:K(e),...bo(t.config.direction,t.aabb)}))),za=z(({item:{config:{direction:t,part:e},aabb:n},room:r})=>{const o=pt(t);return f({textureId:Fa(r,o,e),filter:K(r),...bo(t,n)})}),Pt={animationId:"bubbles.cold"},he=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},La=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n},Ma=`#version 300 es

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
`;class Vn extends Z{constructor(e){const n=G.from({vertex:bt,fragment:Ma,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const Bt=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(ii(i))return{textureId:i}}const o=`${t}.idle.${n}`;return si(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},Hn=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+Di>t,Ra=t=>{if(!Me(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%fn<fn*.15},Xn={head:g.metallicBlue,heels:g.pink},jn=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Gn=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?$e:t.filters},Ft=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?jn(o,new ye({outlineColor:Xn[t],upscale:T.getState().upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Gn(o,ye);const s=r?.flashing??!1;n&&!s?jn(o,new Vn(Xn[t])):!n&&s&&Gn(o,Vn)},At=({item:t,currentlyRenderedProps:e,previousRendering:n,gameState:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=t,l=rr(s),c=t.type==="headOverHeels"?Hn(t.state.head,"headOverHeels","headOverHeels"):Hn(t.state,t.type,r.currentCharacterName),u=Ra(t),d=Ce(s),h=a?.phase??null,p={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c},m=e===void 0||e.action!==i||e.facingXy8!==l||e.teleportingPhase!==h,y=m?o==="headOverHeels"?La({top:f(Bt({name:"head",...p})),bottom:f(Bt({name:"heels",...p}))}):f(Bt({name:o,...p})):n;return o==="headOverHeels"?(Ft("head",p,m?void 0:e,y.getChildAt(1)),Ft("heels",p,m?void 0:e,y.getChildAt(0))):Ft(o,p,m?void 0:e,y),i==="moving"&&n instanceof Ee&&(n.animationSpeed=d*oi),{container:y,renderProps:p}},Ua=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new b({label:"floorOverdraws",...C({x:-e.x,y:-e.y})}),o=ut(L(st(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>f({textureId:"floorOverdraw.cornerNearWall",label:s,...C(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=ut(L(st(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?f({textureId:"floorOverdraw.behindDoor",label:s,...C(nt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):f({textureId:"floorOverdraw.cornerNearWall",label:s,...C({...l,z:0}),times:{[Ve(Ue(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},Ea=t=>[...L(_(t.items)).filter(e=>e.type==="wall").filter(e=>Ue(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],$a=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},Na=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new H().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(C),!0).fill(0),Va=z(({item:t,room:e})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=gt(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:h},roomJson:p}=e,m=new b({label:`floor(${e.id})`});if(d!=="none"){const $=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,O=new b;for(let R=-1;R<=o+2;R++)for(let Q=R%2-1;Q<=i+2;Q+=2)O.addChild(zi({x:R+(s.right?-.5:0),y:Q+(s.towards?-.5:0)},f({textureId:$})));O.addChild(Ua(p,{x:n,y:r}));const P=new H().poly([ee,C({x:c,y:0}),C({x:c,y:u}),C({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});O.addChild(P),O.filters=K(e),O.mask=P,m.addChild(O)}const y=Ea(p),A=new H().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(A);const D=$a(y);if(D!==void 0){const $=Na({extraWallRanges:D,blockXMin:n,blockYMin:r});m.addChild($)}return m.mask=A,m.y=-t.aabb.z,m.cacheAsTexture(!0),m}),Ha=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=C({x:-t,y:-e}),i={towards:new b({label:"towards",...o}),right:new b({label:"right",...o})};return L(st(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},p=f({label:s,textureId:`floorEdge.${l}`,...C(h),times:a.type==="wall"?a.config.times:{[Ve(Ue(l))]:2}});i[l].addChild(p),l==="right"&&c.y===0&&e<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...C(E(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...C(E(h,{x:-.5}))}))}),i},Xa=z(({room:t,onHold:e,displaySettings:n})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=gt(t.roomJson),c=i-r,u=s-o,d=new b({label:"floorEdge"}),h=new H({label:"overDrawToHideFallenItems"}).poly([C({x:c,y:0}),C({x:0,y:0}),C({x:0,y:u}),{...C({x:0,y:u}),y:999},{...C({x:c,y:0}),y:999}],!0).fill(0);h.y=8,d.addChild(h);const{towards:p,right:m}=Ha({blockXMin:r,blockYMin:o},t.roomJson),y=!e&&!(n.uncolourised??at.displaySettings.uncolourised);p.filters=Xt(t,"towards",y),m.filters=Xt(t,"right",y),d.addChild(p),d.addChild(m);const A=new H({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(A),d.mask=A,d.cacheAsTexture(!0),d}),ja=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Dt=g.moss,qn=()=>z(({item:{config:{style:t}}})=>f(t==="book"?"book.y":t)),Ga={head:At,heels:At,headOverHeels:At,doorFrame:za,doorLegs:Da,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:z(({item:{id:t,config:{direction:e,tiles:n}},room:r})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=Ve(Ue(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=f({textureId:Ba(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:De.w,y:De.h+1}:{x:0,y:De.h+1},filter:K(r)}),l=C({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:z(({item:{config:{axis:t,times:e}}})=>f({textureId:`barrier.${t}`,times:e})),deadlyBlock:z(({item:{config:{style:t,times:e}},room:n})=>f({textureId:t,filter:t==="volcano"?K(n):void 0,times:e})),slidingDeadly:qn(),slidingBlock:qn(),block({item:{config:{style:t,times:e},state:{disappear:n}},room:r,currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:f({textureId:ja(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?K(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({item:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?ai(T.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({item:{config:{direction:t,times:e},state:{stoodOnBy:n}},currentlyRenderedProps:r}){const o=n.size>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new b,a=Ue(t);return s.addChild(f(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:z(()=>{const t=new b,e={x:Ae.w/2,y:Ae.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({textureId:"lift.static",pivot:e})),t}),teleporter({item:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=L(t).find(j)!==void 0;return e===void 0||n!==e.flashing?{container:n?new b({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:z(({item:{config:t},room:e})=>{if(t.gives==="crown")return f({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:K(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:z(({item:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:t}},currentlyRenderedProps:e}){const n=Lt(t);return e===void 0||n!==e.facingXy4?{container:he({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:t,state:e},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?ds:o?void 0:us(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Lt(e.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?he({top:{textureId:`${t.which}.${a}`,filter:s||K(n)},bottom:Pt}):f({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:he({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:he({top:Pt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:he({top:"ball",bottom:Pt,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},joystick:et("joystick"),movableBlock:z(({item:{config:{style:t}}})=>f(t)),portableBlock({item:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new ye({outlineColor:Dt,lowRes:!1,upscale:T.getState().upscale.gameEngineUpscale}):void 0;return{container:f({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({item:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new ye({outlineColor:Dt,lowRes:!1,upscale:T.getState().upscale.gameEngineUpscale}):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new ye({outlineColor:Dt,upscale:T.getState().upscale.gameEngineUpscale,lowRes:!1}):void 0;return{container:t==="headOverHeels"?he({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):f({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:et("hushPuppy"),bubbles:z(({item:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:et({animationId:"bubbles.doughnut"}),ball:et("ball"),floor:Va,floorEdge:Xa},qa=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))};class Wa{constructor(e,n,r){this.gameState=r,this.#e=e,this.#n=n,this.#r=new b({label:`ItemAppearanceRenderer ${e.id}`}),qa(e,this.#r,r),this.#i=Ga[e.type]}#e;#n;#t=void 0;#r;#i;destroy(){this.#r.destroy({children:!0})}tick(e){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#i({item:this.#e,room:this.#n,currentlyRenderedProps:this.#t,displaySettings:e.displaySettings,previousRendering:this.#r.children.at(0)??null,onHold:e.onHold,gameState:this.gameState});n!=="no-update"&&(this.#t=n.renderProps,this.#r.children.at(0)!==n.container&&(this.#r.removeChildren(),n.container!==null&&this.#r.addChild(n.container)))}get container(){return this.#r}}const Wn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},Yn=(t,e)=>{const n=new H;return Wn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Wn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Ya={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Za{#e;constructor(e){const n=Ya[e.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${e.id}`}),X("portal")(e)){const o=w(e.config.relativePoint);this.#e.addChild(new H().circle(o.x,o.y,5).stroke(n)),this.#e.addChild(new H().circle(o.x,o.y,2).fill(n))}this.#e.addChild(new H({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(Yn(e.aabb,n)),e.renderAabb&&this.#e.addChild(Yn(e.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#e.addChild(r=new es({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class Ja{#e;#n;#t;constructor(e,n){this.#n=new b({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#t=n,this.#e=e,this.#r()}#r(){const e=w(this.#e.state.position);this.#n.x=e.x,this.#n.y=e.y}tick(e){this.#t?.tick(e),e.movedItems.has(this.#e)&&this.#r()}destroy(){this.#n.destroy({children:!0}),this.#t?.destroy()}get container(){return this.#n}}const Qa=(t,e)=>{const n=e.getLocalBounds(),r=Kt.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new xe({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Zn=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=f({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof xe?o:Qa(t,o)};class Ka{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=T.getState();o||(this.#e.filters=new Ji({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const{times:s}=e.config,a=Zn(r,i,s);e.shadowMask.relativeTo==="top"&&(a.y-=e.aabb.z),s&&(a.y-=((s.z??1)-1)*M.h),this.#e.addChild(a),o||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=L(_(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:Li}},a=Object.groupBy(i,l=>{const c=this.#t[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":Yt(s,l)?c?"update":"create":"noShadow"});for(const l of Ht(a.keepUnchanged,a.update))this.#t[l.id].renderedOnProgression=n;if(a.create)for(const l of a.create){const{times:c}=l.config,u=Zn(this.pixiRenderer,l.shadowCastTexture,c);u.label=l.id,this.#n.addChild(u),this.#t[l.id]={sprite:u,renderedOnProgression:n}}for(const l of Ht(a.create,a.update)){const{sprite:c}=this.#t[l.id],u=w({...Ne(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of st(this.#t))u!==n&&(c.destroy(),delete this.#t[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const el=t=>t.shadowMask!==void 0,tl=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=T.getState(),i=li(o),s=ci(o),a=lr(o),l=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const u=new Wa(t,e,n);c.push(u),l&&(u.container.alpha=.66),!a&&s&&el(t)&&c.push(new Ka(t,e,r))}return l&&c.push(new Za(t)),c.length===0?"not-needed":new Ja(t,new nl(c))};class nl{#e;#n=new b({label:"CompositeRenderer"});constructor(e){this.#e=e,this.#n.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#n}}const pe=.33,rl=cr()==="mobile"?-4:16,Gt=De.h-De.w/2,ol=ae.heels,il=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=gt(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-rl-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,p=u.y+s-Gt<0;return(m,y,A)=>{if(m===void 0)return;const D=w(m.state.position),$=E(D,u),O={x:d&&$.x<n.x*pe?Math.min(-a,n.x*pe-D.x):h&&$.x>n.x*(1-pe)?Math.max(n.x-l,n.x*(1-pe)-D.x):u.x,y:p&&$.y<n.y*pe?n.y*pe-D.y:u.y};if(A)e.x=O.x,e.y=O.y;else{const P=ol*y,R=Ne(e,O),Q=ir(R);if(Q>P){const re={x:R.x/Q,y:R.y/Q};e.x-=re.x*P,e.y-=re.y*P}else e.x=O.x,e.y=O.y}}},sl=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=gt(t);return new H().rect(e+r.x,o-Gt,n-e,r.y-o+Gt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Jn{#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#r=!1;#i=new Map;#o=new Map;#s;#l;#d;#a;#c;#f;#h;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=T.getState();this.#l=i,this.#d=s,this.#a=n,this.#c=e,this.#f=r,this.#h=o,this.#t.label=`RoomRenderer(${n.id})`;const a=!(i?.uncolourised??at.displaySettings.uncolourised);this.initFilters(!r&&a,n.color),(i?.showBoundingBoxes??at.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(sl(n.roomJson)),this.#s=il(n,this.#t,s.gameEngineScreenSize)}initFilters(e,n){this.#e.filters=e?$e:new F(tn(n).main.original)}#u(e){for(const n of _(this.#a.items)){let r=this.#o.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=tl({item:n,room:this.#a,gameState:this.#c,pixiRenderer:this.#h}),r==="not-needed"){this.#o.set(n.id,"not-needed");continue}this.#o.set(n.id,r),(n.type==="floorEdge"?this.#n:this.#e).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#o.entries())this.#a.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#o.delete(n))}#p(e){const{order:n}=go(Pa(this.#a.items,e.movedItems,this.#i),this.#a.items);for(let r=0;r<n.length;r++){const o=this.#o.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(_(this.#a.items))};this.#s(He(this.#c),n.deltaMS,!this.#r),this.#u(n),(!this.#r||n.movedItems.size>0)&&this.#p(n),this.#r=!0}destroy(){this.#t.destroy({children:!0}),this.#o.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#l}get upscale(){return this.#d}get everRendered(){return this.#r}get container(){return this.#t}get roomState(){return this.#a}get paused(){return this.#f}}var yt=`in vec2 aPosition;
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
`,xt=`struct GlobalFilterUniforms {
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
}`,al=`precision highp float;
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
`,ll=`struct CRTUniforms {
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
}`,cl=Object.defineProperty,ul=(t,e,n)=>e in t?cl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ot=(t,e,n)=>(ul(t,typeof e!="symbol"?e+"":e,n),n);const vo=class yo extends Z{constructor(e){e={...yo.DEFAULT_OPTIONS,...e};const n=le.from({vertex:{source:xt,entryPoint:"mainVertex"},fragment:{source:ll,entryPoint:"mainFragment"}}),r=G.from({vertex:yt,fragment:al,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ot(this,"uniforms"),ot(this,"seed"),ot(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};ot(vo,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let dl=vo;var fl=`
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
}`,hl=`struct KawaseBlurUniforms {
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
}`,pl=`
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
`,ml=`struct KawaseBlurUniforms {
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
}`,gl=Object.defineProperty,bl=(t,e,n)=>e in t?gl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,oe=(t,e,n)=>(bl(t,typeof e!="symbol"?e+"":e,n),n);const xo=class wo extends Z{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Re("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...wo.DEFAULT_OPTIONS,...n};const r=le.from({vertex:{source:xt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?ml:hl,entryPoint:"mainFragment"}}),o=G.from({vertex:yt,fragment:n?.clamp?pl:fl,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),oe(this,"uniforms"),oe(this,"_pixelSize",{x:0,y:0}),oe(this,"_clamp"),oe(this,"_kernels",[]),oe(this,"_blur"),oe(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=ge.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let p=0;p<h;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),ge.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};oe(xo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let vl=xo;var yl=`in vec2 vTextureCoord;
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
`,xl=`struct AdvancedBloomUniforms {
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
`,wl=`
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
`,Tl=`struct ExtractBrightnessUniforms {
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
`,Cl=Object.defineProperty,Sl=(t,e,n)=>e in t?Cl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,To=(t,e,n)=>(Sl(t,typeof e!="symbol"?e+"":e,n),n);const Co=class So extends Z{constructor(e){e={...So.DEFAULT_OPTIONS,...e};const n=le.from({vertex:{source:xt,entryPoint:"mainVertex"},fragment:{source:Tl,entryPoint:"mainFragment"}}),r=G.from({vertex:yt,fragment:wl,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),To(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};To(Co,"DEFAULT_OPTIONS",{threshold:.5});let kl=Co;var Il=Object.defineProperty,Ol=(t,e,n)=>e in t?Il(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,me=(t,e,n)=>(Ol(t,typeof e!="symbol"?e+"":e,n),n);const ko=class Io extends Z{constructor(e){e={...Io.DEFAULT_OPTIONS,...e};const n=le.from({vertex:{source:xt,entryPoint:"mainVertex"},fragment:{source:xl,entryPoint:"mainFragment"}}),r=G.from({vertex:yt,fragment:yl,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:se.WHITE}}),me(this,"uniforms"),me(this,"bloomScale",1),me(this,"brightness",1),me(this,"_extractFilter"),me(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new kl({threshold:e.threshold}),this._blurFilter=new vl({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=ge.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=ge.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),ge.returnTexture(s),ge.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};me(ko,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let _l=ko;const Qn=({crtFilter:t},e)=>[t?new dl({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new _l({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Pl{constructor(e,n){this.app=e,this.#o=e,this.#s=n;const{upscale:{gameEngineUpscale:r}}=T.getState();e.stage.addChild(this.#i),e.stage.scale=r;const o=we(n);if(o===void 0)throw new Error("main loop with no starting room");this.#r=new Jn({gameState:n,roomState:o,paused:!1,pixiRenderer:e.renderer}),this.#i.addChild(this.#r.container),this.#t=new ks(n,cr()),e.stage.addChild(this.#t.container),this.#l()}#e;#n;#t;#r;#i=new b({label:"MainLoop/world"});#o;#s;#l(){const{userSettings:{displaySettings:e}}=T.getState();this.#e=Qn(e,!0),this.#n=Qn(e,!1)}tick=({deltaMS:e})=>{const n=T.getState(),r=lr(n),{userSettings:{displaySettings:o},upscale:i}=T.getState();this.#t.tick({gameState:this.#s,screenSize:i.gameEngineScreenSize,colourise:!r&&!(o?.uncolourised??at.displaySettings.uncolourised)});const s=r?ar:Ta(this.#s,e),a=we(this.#s);(this.#r?.roomState!==a||this.#r?.upscale!==i||this.#r?.displaySettings!==o||this.#r?.paused!==r)&&(this.#r?.destroy(),a?(this.#r=new Jn({gameState:this.#s,roomState:a,paused:r,pixiRenderer:this.#o.renderer}),this.#i.addChild(this.#r.container),this.#s.events.emit("roomChange",a.id)):this.#r=void 0,this.#o.stage.scale=i.gameEngineUpscale,this.#l()),this.#r?.tick({progression:this.#s.progression,movedItems:s,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#o.stage.filters=this.#e:this.#o.stage.filters=this.#n};start(){return this.#o.ticker.add(this.tick),this}stop(){this.#o.stage.removeChild(this.#i),this.#r?.destroy(),this.#t.destroy(),this.#o.ticker.remove(this.tick)}}dt.add(wr,Tr,Cr,Sr,kr,Ir,Or,_r,Pr,Br,Fr,Dr,Ar,zr,Lr,Mr,Rr,Ur,Er,$r,Nr);ui.defaultOptions.scaleMode="nearest";const Kn=async(t,e)=>{const n=new Yr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const r=ss({campaign:t,inputStateTracker:e});T.dispatch(on(r.characterRooms.head.id)),T.dispatch(on(r.characterRooms.heels.id));const o=new Pl(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=He(r);s!==void 0&&Wt({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return we(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Ll=Object.freeze(Object.defineProperty({__proto__:null,default:Kn,gameMain:Kn},Symbol.toStringTag,{value:"Module"}));export{jr as A,Vr as C,Z as F,Kt as R,Hi as S,Gr as V,Wi as a,Ll as g,Vi as u};
