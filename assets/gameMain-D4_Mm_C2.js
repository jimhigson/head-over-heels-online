const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-DU-GA2d0.js","assets/App-BXJPZY4h.js","assets/index-Cv2-Nb3P.js","assets/index-CwRnNpWc.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-BfhgDrBa.js","assets/Graphics-8MiJHoTD.js","assets/swopCharacters-B0FGOBlo.js","assets/WebGLRenderer-CwWCKCzE.js"])))=>i.map(i=>d[i]);
import{A as jo,a7 as ue,a8 as X,n as sr,F as ae,E as x,f as bt,e as Ho,C as b,d as Ne,v as ut,an as y,D as $t,af as we,T as Le,U as Xo,V as Go,aH as qo,aI as Wo,aJ as Yo,m as Jo,aK as Zo,H as Qo,aL as Ko,aM as ei,aN as re,aO as ar,a2 as lr,Y as C,a0 as k,L as I,aP as ti,aQ as ni,W as B,aR as Se,aS as ri,aT as cr,aU as gt,aV as oi,aW as it,aX as Ie,N as U,aY as ii,_ as z,aZ as si,a_ as ai,a3 as ur,X as vt,a$ as li,b0 as Xe,b1 as dr,b2 as de,b3 as yt,p as Ge,Z as qe,a4 as ke,Q as Nt,b4 as un,$ as ee,b5 as ci,b6 as ui,b7 as di,b8 as fi,I as fr,b9 as Me,ba as hi,bb as Kt,bc as pi,bd as mi,O as hr,be as bi,bf as gi,bg as vi,bh as dt,bi as st,bj as yi,bk as xi,bl as wi,a as Ve,bm as ft,bn as Ci,bo as Re,bp as Ti,bq as pr,br as mr,bs as Si,ad as ge,bt as Ot,bu as It,a5 as dn,bv as ki}from"./App-BXJPZY4h.js";import{l as Vt,h as ht,j as fn,g as L,p as T,k as fe,m as en,n as Oi,q as Ii,r as jt,t as pt,u as at,c as tn,v as j,i as H,w as br,x as gr,y as le,z as xt,A as _i,B as Pi,C as Bi,D as Ai,E as Ht,F as Fi,G as We,H as Di,I as zi,J as Li,a as he,K as vr,L as yr,M as hn,N as xr,f as Mi,O as wr,P as Cr,Q as Ri,b as Z,s as ce,R as _t,S as Ye,T as Ui,U as Ei,V as _e,W as pn,X as $i,Y as nn,Z as Ni,_ as Vi,$ as ji,a0 as Hi,a1 as Xi,a2 as mn,a3 as Tr,e as Sr,o as kr,a4 as Gi,a5 as bn,a6 as Pt,a7 as w,a8 as qi,a9 as Wi,aa as Yi,ab as gn,ac as wt,ad as Ji}from"./swopCharacters-B0FGOBlo.js";import{S as Zi,G as V}from"./Graphics-8MiJHoTD.js";import{_ as vn,g as Qi}from"./index-Cv2-Nb3P.js";const Or=class Xt extends jo{constructor(e){e={...Xt.defaultOptions,...e},super(e),this.enabled=!0,this._state=Zi.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=ue.from(n)),r&&(s=X.from(r)),new Xt({gpuProgram:i,glProgram:s,...o})}};Or.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=Or;var Ki=`
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
`,es=`in vec2 aPosition;
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
`,ts=`
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
}`;class S extends Y{constructor(e){const n=e.gpu,r=yn({source:ts,...n}),o=ue.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=yn({source:Ki,...i}),a=X.from({vertex:es,fragment:s}),l=new sr({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:ae.EMPTY}})}}function yn(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const rn=`
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
    `,on=`
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
	`;class Ir extends S{constructor(){super({gl:{functions:`
                ${rn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${on}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Ir.extension={name:"color",type:x.BlendMode};class _r extends S{constructor(){super({gl:{functions:`
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
            `}})}}_r.extension={name:"color-burn",type:x.BlendMode};class Pr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"color-dodge",type:x.BlendMode};class Br extends S{constructor(){super({gl:{functions:`
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
                `}})}}Br.extension={name:"darken",type:x.BlendMode};class Ar extends S{constructor(){super({gl:{functions:`
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
            `}})}}Ar.extension={name:"difference",type:x.BlendMode};class Fr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Fr.extension={name:"divide",type:x.BlendMode};class Dr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"exclusion",type:x.BlendMode};class zr extends S{constructor(){super({gl:{functions:`
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
                `}})}}zr.extension={name:"hard-light",type:x.BlendMode};class Lr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Lr.extension={name:"hard-mix",type:x.BlendMode};class Mr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Mr.extension={name:"lighten",type:x.BlendMode};class Rr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Rr.extension={name:"linear-burn",type:x.BlendMode};class Ur extends S{constructor(){super({gl:{functions:`
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
            `}})}}Ur.extension={name:"linear-dodge",type:x.BlendMode};class Er extends S{constructor(){super({gl:{functions:`
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
            `}})}}Er.extension={name:"linear-light",type:x.BlendMode};class $r extends S{constructor(){super({gl:{functions:`
                ${rn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${on}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}$r.extension={name:"luminosity",type:x.BlendMode};class Nr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Nr.extension={name:"negation",type:x.BlendMode};class Vr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Vr.extension={name:"overlay",type:x.BlendMode};class jr extends S{constructor(){super({gl:{functions:`
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
                `}})}}jr.extension={name:"pin-light",type:x.BlendMode};class Hr extends S{constructor(){super({gl:{functions:`
                ${rn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${on}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Hr.extension={name:"saturation",type:x.BlendMode};class Xr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Xr.extension={name:"soft-light",type:x.BlendMode};class Gr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Gr.extension={name:"subtract",type:x.BlendMode};class qr extends S{constructor(){super({gl:{functions:`
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
                `}})}}qr.extension={name:"vivid-light",type:x.BlendMode};const Gt=[];bt.handleByNamedList(x.Environment,Gt);async function ns(t){if(!t)for(let e=0;e<Gt.length;e++){const n=Gt[e];if(n.value.test()){await n.value.load();return}}}let Pe;function rs(){if(typeof Pe=="boolean")return Pe;try{Pe=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Pe=!1}return Pe}var Wr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Wr||{});class os{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const is=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Yr=class Jr extends Ho{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...is,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await ns(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Jr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(Ne(ut,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:y.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Wr.ALL);const{clear:r,clearColor:o,target:i}=e;y.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new os(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!rs())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Yr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Zr=Yr,Je;function ss(t){return Je!==void 0||(Je=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Zr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!$t.get().getWebGLRenderingContext())return!1;let r=$t.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Je}let Ze;async function as(t={}){return Ze!==void 0||(Ze=await(async()=>{const e=$t.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Ze}const xn=["webgl","webgpu","canvas"];async function ls(t){let e=[];t.preference?(e.push(t.preference),xn.forEach(i=>{i!==t.preference&&e.push(i)})):e=xn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await as()){const{WebGPURenderer:a}=await vn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-DU-GA2d0.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&ss(t.failIfMajorPerformanceCaveat??Zr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await vn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-CwWCKCzE.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Qr="8.8.1";class Kr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Qr)}static destroy(){}}Kr.extension=x.Application;class cs{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Qr)}destroy(){this._renderer=null}}cs.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const eo=class qt{constructor(...e){this.stage=new b,e[0]!==void 0&&Ne(ut,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await ls(e),qt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ne(ut,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=qt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};eo._plugins=[];let to=eo;bt.handleByList(x.Application,to._plugins);bt.add(Kr);var us=`in vec2 aPosition;
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
`,ds=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,wn=`struct GlobalFilterUniforms {
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
}`;const no=class ro extends Y{constructor(e){e={...ro.defaultOptions,...e};const n=ue.from({vertex:{source:wn,entryPoint:"mainVertex"},fragment:{source:wn,entryPoint:"mainFragment"}}),r=X.from({vertex:us,fragment:ds,name:"alpha-filter"}),{alpha:o,...i}=e,s=new sr({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};no.defaultOptions={alpha:1};let fs=no;class je extends we{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[p]=u;super({...h,texture:p instanceof ae?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Le.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Le.shared.add(this.update,this,Xo.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(ae.from(e[r]));return new je(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(ae.from(e[r]));return new je(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof ae)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Le.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Le.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class hs extends Go{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new qo({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function ps(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ne(ut,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class ms extends hs{constructor(...e){const n=ps(e,"Text");super(n,Wo),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=Yo.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class sn extends ae{static create(e){return new sn({source:new Jo(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}var Qe={},Cn;function bs(){if(Cn)return Qe;Cn=1;var t=Zo(),e=t.mark(i),n=Qo(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,p=arguments;return t.wrap(function(g){for(;;)switch(g.prev=g.next){case 0:for(a=p.length,l=new Array(a),c=0;c<a;c++)l[c]=p[c];u=0,d=l;case 2:if(!(u<d.length)){g.next=8;break}return h=d[u],g.delegateYield(o(h),"t0",5);case 5:u++,g.next=2;break;case 8:case"end":return g.stop()}},e)}Qe.__concat=i;var s=r(i);return Qe.concat=s,Qe}var Bt,Tn;function gs(){return Tn||(Tn=1,Bt=bs().concat),Bt}var vs=gs();const Wt=Qi(vs);function ys(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const xs=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},ws=({campaign:t,inputStateTracker:e})=>{const n=xs(t),r=Ko(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&Vt(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&Vt(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:ht(o.items.head),heels:i===void 0?void 0:ht(i.items.heels)},inputStateTracker:e,campaign:t,events:ys(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},v={pureBlack:new y("#000000"),lightBlack:new y("#212C20"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},$={original:new y("rgb(255, 255, 255)"),basic:new y("rgb(210, 210, 210)"),dimmed:new y("rgb(120, 120, 120)")},N={original:new y("rgb(255, 255, 0)"),basic:new y("hsl(50,65%,70%)"),dimmed:v.redShadow},G={original:new y("rgb(255, 0, 255)"),basic:v.pink,dimmed:new y("hsl(290,35%,38%)")},O={original:new y("rgb(0, 255, 255)"),basic:new y("hsl(183, 50%, 50%)"),dimmed:new y("hsl(183, 50%, 25%)")},q={original:new y("rgb(0, 255, 0)"),basic:v.moss,dimmed:new y("hsl(73,50%,25%)")},an={white:{basic:{main:$,edges:{towards:O,right:N},hud:{lives:N,dimmed:G,icons:O}},dimmed:{main:$,edges:{towards:q,right:O},hud:{lives:N,dimmed:G,icons:O}}},yellow:{basic:{main:N,edges:{towards:q,right:$},hud:{lives:O,dimmed:G,icons:q}},dimmed:{main:N,edges:{towards:O,right:O},hud:{lives:O,dimmed:G,icons:q}}},magenta:{basic:{main:G,edges:{towards:q,right:O},hud:{lives:$,dimmed:O,icons:N}},dimmed:{main:G,edges:{towards:q,right:O},hud:{lives:$,dimmed:O,icons:N}}},cyan:{basic:{main:O,edges:{towards:G,right:$},hud:{lives:$,dimmed:q,icons:N}},dimmed:{main:O,edges:{towards:G,right:$},hud:{lives:$,dimmed:q,icons:N}}},green:{basic:{main:q,edges:{towards:O,right:N},hud:{lives:$,dimmed:G,icons:O}},dimmed:{main:q,edges:{towards:O,right:N},hud:{lives:$,dimmed:G,icons:O}}}},ln=t=>an[t.hue][t.shade],oo=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+fn>n?100-Math.ceil((n-e)/(fn/100)):0},io=t=>{const e=100*L.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/L.w):0},Ct=`in vec2 aPosition;
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
`,Cs=`in vec2 vTextureCoord;
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
`;class Oe extends Y{constructor(e){const n=Object.keys(e).length,r=X.from({vertex:Ct,fragment:Cs.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{v[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Ts=`precision mediump float;
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
`,Sn=[v.pureBlack,v.lightBlack];class W extends Y{uniforms;constructor(e="white"){const n=X.from({vertex:Ct,fragment:Ts,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=Sn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=Sn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const so=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:r/2})},ao=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),lo=t=>ao(an[t.color.hue][t.color.shade].main),co=t=>new Oe({lightBeige:v.lightGrey,redShadow:v.shadow,pink:v.lightGrey,moss:v.lightGrey,midRed:v.midGrey,highlightBeige:v.lightGrey,...t&&lo(t)}),Ss=new Oe({midGrey:v.midRed,lightGrey:v.lightBeige,white:v.highlightBeige,metallicBlue:v.redShadow,pink:v.midRed,moss:v.midRed,replaceDark:v.midRed,replaceLight:v.lightBeige}),ks=t=>new Oe({replaceLight:t,replaceDark:so(t)}),Yt=(t,e,n)=>n?new Oe(ao(an[t.color.hue][t.color.shade].edges[e])):new W(ln(t.color).edges[e].original),K=t=>new Oe(lo(t)),Ce=ei,kn={x:.5,y:1},On=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),f=t=>{if(typeof t=="string")return f({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(On(t)?c=Os(t):c=new we(re.textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:p}=u;p>=1;p--)for(let m=1;m<=u.z;m++){const g=f({...t,times:void 0,label:`(${h},${p},${m})`}),A=T({x:h-1,y:p-1,z:m-1});g.x+=A.x,g.y+=+A.y,d.addChild(g)}return d}if(e===void 0&&r===void 0)if(On(t))c.anchor=kn;else{const u=re.data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=kn}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Os({animationId:t,reverse:e,playOnce:n}){const o=re.animations[t].map(s=>({texture:s,time:ar}));e&&o.reverse();const i=new je(o);return i.animationSpeed=lr.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const Is=`#version 300 es

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
`;class xe extends Y{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=X.from({vertex:Ct,fragment:Is,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const te=new xe({outlineColor:v.pureBlack,upscale:C.getState().upscale.gameEngineUpscale,lowRes:!0}),Ue=new W,In=new W,Jt=new W,_n=new W(v.moss),Ee=new W,R=[Ue,te],_s=[Ee,te],Ps=[te,Jt],Ke={original:[te,Ee],colourised:{head:[te,new W(v.metallicBlue)],heels:[te,new W(v.pink)]}},pe=13,Bs=2;class As{constructor(e,n){this.inputStateTracker=e,this.inputDirectionMode=n,this.arrowSprites={away:f({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:pe,y:-13,filter:R}),right:f({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:pe,y:pe,filter:R}),towards:f({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-13,y:pe,filter:R}),left:f({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-13,y:-13,filter:R}),...n!=="4-way"?{awayRight:f({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:pe*Math.SQRT2,filter:R}),towardsRight:f({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:pe*Math.SQRT2,filter:R}),towardsLeft:f({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-13*Math.SQRT2,filter:R}),awayLeft:f({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-13*Math.SQRT2,filter:R})}:{}},this.container.addChild(this.#t),this.container.addChild(new V().circle(0,0,24).fill("#00000000"));for(const r of k(this.arrowSprites))this.container.addChild(r);this.container.on("pointerenter",r=>{this.#n=r.pointerId,this.handlePointer(r),this.container.on("globalpointermove",this.handlePointer),this.container.on("pointerup",()=>{this.container.off("globalpointermove",this.handlePointer),this.#n=void 0,e.hudInputState.directionVector=I}),this.container.on("pointerupoutside",()=>{this.container.off("globalpointermove",this.handlePointer),this.#n=void 0,e.hudInputState.directionVector=I})})}container=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#t=f({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointer=e=>{if(e.pointerId!==this.#n)return;const n=ti(C.getState()),{x:r,y:o}=this.container,{x:i,y:s}=e,{width:a,height:l}=this.container.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=ni({x:-c,y:-u}),h=B(d,Bs);this.inputStateTracker.hudInputState.directionVector=h};tick(e){const{directionVector:n}=this.inputStateTracker,r=Se(n)>ri?cr(n):void 0;for(const[o,i]of gt(this.arrowSprites))i.filters=o===r?_s:R;this.#t.filters=e?Ce:Ue}}function He(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}function*uo(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"-",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;oi(o),yield f({textureId:o,x:(r+.5-n/2)*it.w})}}function Be(t,e){t.removeChildren(),He(uo(e),t)}function fo(t,e){return t.removeChildren(),He(uo(e),t),t}const Zt={colourised:{jump:v.metallicBlue,fire:v.highlightBeige,carry:v.moss,carryAndJump:v.midRed,menu:v.lightGrey},zx:{jump:Ie.zxBlue,fire:Ie.zxYellow,carry:Ie.zxGreen,carryAndJump:Ie.zxRed,menu:Ie.zxWhite}},mt=Symbol(),ho=Symbol(),po=Symbol(),et=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),r=new b({label:"arcadeButton"});r.addChild(n);const o=f("button");t?o.filters=ks(Zt.colourised[e]):r.filters=new W(Zt.zx[e]),n.addChild(o);const i=new b({label:"surface"}),s=f({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),r[ho]=o,r[mt]=i,r[po]=n,r},Ae=(t,...e)=>{t[mt].removeChildren();for(const n of e)n!==void 0&&t[mt].addChild(n)},tt=(t,e)=>{t[ho].texture=re.textures[e?"button.pressed":"button"],t[po].y=e?1:0},Pn=(t,e,n)=>{n&&(t[mt].filters=e?co():Ce)},Bn=({which:t},e,n)=>{const r=fo(new b,n);return r.filters=new Oe({white:e?so(Zt.colourised[t]):v.pureBlack}),r};class mo{constructor(e,n,r){this.subject=e,this.gameState=n,this.appearance=r,this.#n=new b({label:`AppearanceRenderer ${e.id}`})}#t=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({subject:this.subject,currentlyRenderedProps:this.#t,previousRendering:this.#n.children.at(0)??null,renderContext:e,gameState:this.gameState});n!=="no-update"&&(this.#t=n.renderProps,this.#n.children.at(0)!==n.container&&(this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container)))}get container(){return this.#n}}const bo=t=>f(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Fs=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},An=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>Fs(t,e,n,r),cn=(t,e,n=.001)=>{if(!fe(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:en({state:{position:U(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+ii},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},go=(t,e)=>{const r=[...z(e).filter(i=>cn(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Oi(s,i);return a<0||a===0&&An(t,s)>An(t,i)?s:i})},$e=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Ii};function vo({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;oo(n)>0||$e(e)||(e.state.action="death",e.state.expires=t+jt)}const yo=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=at(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=at(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=pt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=at(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=pt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":C.dispatch(ai(r.config.page));break;case"reincarnation":break;case"crown":{C.dispatch(si(r.config.planet));break}default:r.config}},Ds=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;ur(i,r)<=0||e.state.action!=="death"&&tn({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},zs=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=vt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Ls({movingItem:t}){t.state.autoWalk=!1}const J=(t,...e)=>H(...e)(t.touchedItem),Fe=(t,...e)=>H(...e)(t.movingItem),xo=t=>j(t.movingItem),Ms=t=>j(t.touchedItem),Rs=t=>br(t.touchedItem),Fn=t=>{switch(!0){case J(t,"stopAutowalk"):Ls(t);break;case Rs(t):vo(t);break;case J(t,"portal"):Ds(t);break;case J(t,"pickup"):yo(t);break;case J(t,"doorFrame"):zs(t);break}},Te={movementType:"steady"},wo=150,Co=t=>t[Math.floor(Math.random()*t.length)],ne=Object.freeze({movementType:"vel",vels:{walking:I}}),Tt=t=>gr(t)?le[t.config.which]:le[t.type],Dn=L.w/2,Us=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=le.homingBot;if(!yt(e,ee))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Xe(l.state.position,t);if(Math.abs(c.y)<Dn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<Dn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},To=(t,e)=>{const{items:{head:n,heels:r,headOverHeels:o}}=e;if(o!==void 0)return $e(o)?void 0:e.items.headOverHeels;const i=n===void 0||$e(n)||n.state.action==="death"?void 0:un(n.state.position,t),s=r===void 0||$e(r)||r.state.action==="death"?void 0:un(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},Es=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ne;const l=To(o,e);if(l===void 0||s+wo>e.roomTime)return Te;const c=Xe(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>L.w/4?u:Ge(u),h=Tt(t),p={...I,[d]:c[d]>0?h:-h},m=de(p),g=!yt(m,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:m,...g?{timeOfLastDirectionChange:e.roomTime}:qe}}},zn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return ne;const a=To(i,e);if(a===void 0)return ne;const l=a.state.position,c=L.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ne;const d=Xe(a?.state.position,i),h=Tt(t),p=(1+Math.sqrt(2))/2,m=h*p,g=B({...d,z:0},m/dr(d)*(o?-1:1));return{movementType:"vel",vels:{walking:g},stateDelta:{facing:de(g)}}},At=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return ne;if(!(ke(i,I)||Math.random()<r/1e3))return Te;const l=Co(o);return{movementType:"vel",vels:{walking:B(Nt[l],Tt(t))},stateDelta:{facing:Nt[l]}}},$s=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?ne:yt(i,ee)?{movementType:"vel",vels:{walking:B(o,Tt(t))}}:Te},Ns=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Co([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},Ft=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<wo))return;const c=xt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Ns(s,c,o);t.state.vels.walking=u,t.state.facing=de(u),t.state.durationOfTouch=0},Vs=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=I)},js=(t,e,n,r)=>{if(!t.state.activated||gr(t)&&t.state.busyLickingDoughnutsOffFace)return ne;switch(t.config.movement){case"patrol-randomly-diagonal":return At(t,e,n,r,di);case"patrol-randomly-xy8":return At(t,e,n,r,ui);case"patrol-randomly-xy4":return At(t,e,n,r,ci);case"towards-tripped-on-axis-xy4":return Us(t,e);case"towards-on-shortest-axis-xy4":return Es(t,e);case"back-forth":case"clockwise":return $s(t);case"unmoving":case"free":return ne;case"towards-when-in-square-xy8":return zn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return zn(t,e,n,r,li(C.getState()));default:throw t.config,new Error("this should be unreachable")}},Hs=t=>{const{movingItem:e,touchedItem:n}=t;if(fe(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Ft(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Ft(t,"opposite");break;case"clockwise":Ft(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Vs(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},Xs=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of gt(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&C.dispatch(fi(o.path))}},Gs=({movingItem:t,touchedItem:e})=>{if(!fe(t))return;const{state:{position:n},aabb:r}=e,o=xt(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=de(o),s=B(i,-.05);return e.state.vels.sliding=s,!1},qs=({movingItem:t,touchedItem:e})=>{if(!fe(e))return;const n=t.state.vels.sliding;if(ke(n,I))return;const{state:{position:r},aabb:o}=t,i=xt(e.state.position,e.aabb,r,o);return ur(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=I),!1},Ws=2*_i,So=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Ws,positionDelta:n})},Ys=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...fr(r.state.position,o),z:0};if(!ke(s,I))for(const a of r.state.stoodOnBy)So(a,e,s)}},Js=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=xt(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=de(a);for(const c of o){const u=e.items[c],d=B(l,-.025*r);u.state.facing=d,So(u,e,d)}},nt=t=>{const n=t/Fi*ar;return(t+.5*Ht*n**2)/n},Zs={head:nt(We.head),headOnSpring:nt(We.head+L.h),heels:nt(We.heels),heelsOnSpring:nt(We.heels+L.h)},Qs=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Zs[`${n}${e?"OnSpring":""}`]},Ks=t=>!(t===null||Bi(t)||Ai(t)&&t.config.gives==="scroll"||j(t)&&t.state.standingOn===null),ko=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&Ks(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Te;const i=Pi(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Qs(t,i)}},stateDelta:{action:"moving",jumped:!0}}},ea=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Se(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return B(n,l)},Ln={movementType:"vel",vels:{walking:I}},Oo=(t,e,n)=>{const r=ta(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Se(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ke(r.vels.walking,I)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},ta=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:h,gravity:p}}}=t,m=n===t.id,g=m?e.currentActionPress("jump"):"released",A=m?e.directionVector:I,F=a===null&&p.z<0,E=o==="head"&&io(t.state)>0&&a!==null,_=o==="headOverHeels"?F?"head":"heels":E?"heels":o,P=s?l:A,M=le[_];if(c!==null||i==="death")return Ln;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:fr(h,B(h,Di*r))}}:Ln;if(g!=="released"){const oe=de(yt(P,ee)?l:P),Vo=H("spring")(a)?1:zi;return{movementType:"vel",vels:{walking:B({...oe,z:0},M*Vo)},stateDelta:{facing:oe}}}}if(Se(P)!==0)return F?{movementType:"vel",vels:{walking:B({...P,z:0},M)},stateDelta:{facing:P,action:"falling"}}:{movementType:"vel",vels:{walking:ea({vel:h,acc:Li[_],deltaMS:r,maxSpeed:M,unitD:P,minSpeed:0})},stateDelta:{facing:P,action:"moving"}};if(u>0&&u<1){const oe=ke(d,l)?1:0;return{movementType:"position",posDelta:B(l,oe-u),stateDelta:{action:F?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:I},stateDelta:{action:F?"falling":"idle"}}},Mn=t=>he(t.movingItem)&&cn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Io=(t,e)=>{let n=I;for(const r of e){if(r.movementType==="position"&&(n=U(n,r.posDelta)),r.movementType==="vel"&&(he(t)||H("lift")(t)))for(const[i,s]of gt(r.vels)){const a={...I,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},Rn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&j(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Mn(t)){if(Mn(t)&&xo(t)){vr({above:t.movingItem,below:t.touchedItem});const n=[ko(t.movingItem,t.gameState),Oo(t.movingItem,t.gameState,t.deltaMS)];Io(t.movingItem,n)}yr(t)}};function na(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const _o=t=>{xo(t)&&Fn(t),Ms(t)&&Fn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),J(t,...hn)&&Gs(t),Fe(t,...hn)&&qs(t),(Fe(t,"monster")&&J(t,"firedDoughnut")||Fe(t,"firedDoughnut")&&J(t,"monster"))&&na(t),(Fe(t,"monster")||Fe(t,"movableBlock"))&&Hs(t),J(t,"switch")&&Xs(t),J(t,"joystick")&&Js(t),t.touchedItem.state.disappear&&Rn(t),t.movingItem.state.disappear&&fe(t.touchedItem,t.movingItem)&&Rn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},ra=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=z(k(e.items)).filter(xr),u=s===null?Po(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}oa(e,i,u)}else{if(t.state.standingOn===null||!Bo(t,k(e.items)))return;const d=Mi({gameState:n,room:e,itemType:s.type,config:s.config,position:l});wr({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:_o}),i.carrying=null}},oa=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Cr({room:t,item:n})},Po=(t,e)=>go(t,z(k(e.items)).filter(xr)),Bo=(t,e)=>{const n={position:U(t.state.position,{z:L.h})},r=Ri({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(fe(o,t)){if(!he(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!Bo(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0},Dt=-11,ia={jump({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,a=Z(e)?.state.standingOn?.type==="teleporter",l=t.actions.every(u=>i.currentActionPress(u)!=="released"),c=r===null?et({colourise:o,button:t}):r;if(n?.pressed!==l&&tt(c,l),a!==n?.standingOnTeleporter)if(a)Ae(c,f({textureId:"teleporter",y:5}),f({animationId:"teleporter.flashing",y:5}));else{const u=Bn(t,o,"JUMP");u.y=Dt,Ae(c,u)}return{container:c,renderProps:{pressed:l,standingOnTeleporter:a,colourise:o}}},carry({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,s=Z(e),a=pt(s),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&Po(s,ce(e))!==void 0,d=t.actions.every(g=>i.currentActionPress(g)!=="released"),h=l&&!u&&c===null,p=r===null?et({colourise:o,button:t}):r;if(p.visible=l,l&&(h!==n?.disabled&&Pn(p,h,o),p.visible=!0,n?.pressed!==d&&tt(p,d),l!==n?.hasBag||c!==n?.carrying)){let g;c!==null?g=bo(c):l&&(g=f({textureId:"bag",y:-2})),Ae(p,g)}return{container:p,renderProps:{pressed:d,hasBag:l,colourise:o,carrying:c,disabled:h}}},fire({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,s=Z(e),a=at(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(p=>i.currentActionPress(p)!=="released"),d=r===null?et({colourise:o,button:t}):r,h=l||c>0;if(d.visible=h,h&&(n?.pressed!==u&&tt(d,u),l!==n?.hasHooter||c!==n?.doughnuts)){let p;l?p=f({textureId:"hooter",y:-3}):c>0&&(p=f({textureId:"doughnuts",y:-2}));const m=fo(new b,String(c));m.y=Dt,m.filters=te,Ae(d,p,m),Pn(d,c===0,o)}return{container:d,renderProps:{pressed:u,colourise:o,doughnuts:c,hasHooter:l}}},carryAndJump({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,s=Z(e),l=pt(s)?.hasBag??!1,c=t.actions.every(h=>i.currentActionPress(h)!=="released");if(!(n===void 0||c!==n.pressed||o!==n.colourise||l!==n.hasBag))return"no-update";let d;if(r===null){d=et({colourise:o,button:t});const h=Bn(t,o,"C+J");h.y=Dt,Ae(d,h)}else d=r;return l?(d.visible=!0,n?.pressed!==c&&tt(d,c)):d.visible=!1,{container:d,renderProps:{pressed:c,hasBag:l,colourise:o}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=f("hud.char.Menu");return e.scale=2,e.filters=R,{container:e,renderProps:qe}}};class De extends mo{constructor(e,n){super(e,n,ia[e.which]),this.button=e}}const sa=26,aa=13;class la{constructor(e,n,r){this.gameState=e,this.colourise=n,this.inputDirectionMode=r,this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new De({which:"jump",actions:["jump"],id:"jump"},e),fire:new De({which:"fire",actions:["fire"],id:"fire"},e),carry:new De({which:"carry",actions:["carry"],id:"carry"},e),carryAndJump:new De({which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},e),menu:new De({which:"menu",actions:["menu_openOrExit"],id:"menu"},e)},joystick:new As(e.inputStateTracker,r)};const{buttons:o}=this.#n,{mainButtonNest:i,joystick:s}=this.#n;for(const a of k(o))a.button.which==="menu"?this.#t.addChild(o.menu.container):i.addChild(a.container);o.jump.container.y=aa,o.carry.container.x=-26,o.carryAndJump.container.y=-13,o.fire.container.x=sa,o.menu.container.x=24,o.menu.container.y=24,this.#t.addChild(i),this.#t.addChild(s.container),this.#e()}#t=new b({label:"OnScreenControls"});#n;#e(){const{gameState:{inputStateTracker:e}}=this;for(const n of k(this.#n.buttons)){const{button:{actions:r}}=n;n.container.eventMode="static",n.container.on("pointerdown",()=>{for(const o of r)e.hudInputState[o]=!0}),n.container.on("pointerup",()=>{for(const o of r)e.hudInputState[o]=!1}),n.container.on("pointerleave",()=>{for(const o of r)e.hudInputState[o]=!1})}}#r(e){this.#n.mainButtonNest.x=e.x-40,this.#n.mainButtonNest.y=e.y-14,this.#n.joystick.container.x=32,this.#n.joystick.container.y=e.y-28}tick({screenSize:e}){this.#r(e);for(const n of k(this.#n.buttons))n.tick({colourise:this.colourise});this.#n.joystick.tick(this.colourise)}get container(){return this.#t}destroy(){this.#t.destroy()}}lr.frames.button.frame;const ca=250,ua=t=>t?12:24,da=t=>t?32:56,fa=t=>t?40:80,ha=t=>t?18:24,Un=112,ze=t=>t==="heels"?1:-1;class En{constructor(e,n,r,o){this.gameState=e,this.onScreenControls=n,this.colourise=r,this.inputDirectionMode=o;for(const i of _t)this.#t.addChild(this.#e[i].livesText),this.#t.addChild(this.#e[i].sprite),this.#t.addChild(this.#e[i].shield.container),this.#t.addChild(this.#e[i].extraSkill.container);n||(this.#t.addChild(this.#e.head.doughnuts.container),this.#t.addChild(this.#e.head.hooter.container),this.#t.addChild(this.#e.heels.bag.container),this.#t.addChild(this.#e.heels.carrying.container)),this.#t.addChild(this.#e.fps),this.#e.fps.filters=[_n],this.#e.fps.y=it.h,this.#r(),n&&(this.#n=new la(e,this.colourise,o),this.#t.addChild(this.#n.container))}#t=new b({label:"HudRenderer"});#n=void 0;#e={head:{sprite:this.#o("head"),livesText:this.#i({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#s({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#s({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#o("heels"),livesText:this.#i({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#s({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#i({label:"fps",outline:!0})};#r(){const{inputStateTracker:{hudInputState:e}}=this.gameState;for(const n of _t){const{sprite:r}=this.#e[n];r.eventMode="static",r.on("pointerdown",()=>{e[`swop.${n}`]=!0}),r.on("pointerup",()=>{e[`swop.${n}`]=!1}),r.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#s({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new we({texture:re.textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:In,y:n?0:8});s.addChild(a);const l=this.#i({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=it.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=te),{text:l,icon:a,container:s}}#o(e){const n=new we(re.textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?Ps:Jt,scale:{x:1,y:e?2:1}})}#l(e){this.#e.head.hooter.container.x=this.#e.head.doughnuts.container.x=(e.x>>1)+ze("head")*Un,this.#e.head.doughnuts.container.y=e.y-Me.h-8,this.#e.heels.carrying.container.y=e.y-Me.h,this.#e.heels.carrying.container.x=this.#e.heels.bag.container.x=(e.x>>1)+ze("heels")*Un,this.#e.heels.bag.container.y=this.#e.head.hooter.container.y=e.y-8,this.#e.fps.x=e.x-it.w*2}#c(e,n){return e?n?Ce:Ee:Ue}#a(e){const n=Ye(e,"heels"),r=n?.hasBag??!1,o=n?.carrying??null,{container:i}=this.#e.heels.carrying,s=i.children.length>0;if(o===null&&s)for(const a of i.children)a.destroy();o!==null&&!s&&i.addChild(bo(o)),i.filters=this.#c(!0,this.colourise),this.#e.heels.bag.icon.filters=this.#c(r,this.colourise)}#d(e){const n=Ye(e,"head"),r=n?.hasHooter??!1,o=n?.doughnuts??0;this.#e.head.hooter.icon.filters=this.#c(r,this.colourise),this.#e.head.doughnuts.icon.filters=this.#c(o!==0,this.colourise),Be(this.#e.head.doughnuts.text,o)}#f(e,n,r){const o=Ye(e,r),{text:i,container:s}=this.#e[r].shield,{text:a,container:l}=this.#e[r].extraSkill,c=oo(o),u=c>0||!this.onScreenControls;s.visible=u,u&&(Be(i,c),s.y=n.y),l.x=s.x=(n.x>>1)+ze(r)*fa(this.onScreenControls);const d=o===void 0?0:r==="head"?io(o):o.bigJumps,h=d>0||!this.onScreenControls;l.visible=h,h&&(Be(a,d),l.y=n.y-ha(this.onScreenControls))}#u(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#h(e,n,r){const o=this.#u(e,r),i=this.#e[r].sprite;o?i.filters=this.colourise?Ce:Ee:i.filters=Ue,i.x=(n.x>>1)+ze(r)*da(this.onScreenControls),i.y=n.y-Me.h}#p(e,n,r){const i=Ye(e,r)?.lives??0,s=this.#e[r].livesText;s.x=(n.x>>1)+ze(r)*ua(this.onScreenControls),s.y=n.y,Be(s,i??0)}#b(e){const n=ce(e);if(n===void 0)return;const r=ln(n.color);Ue.targetColor=r.hud.dimmed[this.colourise?"dimmed":"original"],Jt.targetColor=r.hud.dimmed[this.colourise?"basic":"original"],In.targetColor=r.hud.icons[this.colourise?"basic":"original"],Ee.targetColor=r.hud.lives.original,this.#e.head.livesText.filters=this.colourise?this.#u(e,"head")?Ke.colourised.head:R:Ke.original,this.#e.heels.livesText.filters=this.colourise?this.#u(e,"heels")?Ke.colourised.heels:R:Ke.original}#m=Number.NEGATIVE_INFINITY;#g(){if(hi(C.getState())){if(performance.now()>this.#m+ca){const e=Le.shared.FPS;Be(this.#e.fps,Math.round(e)),_n.targetColor=e>56?v.moss:e>50?v.metallicBlue:e>40?v.pink:v.midRed,this.#m=performance.now()}this.#e.fps.visible=!0}else this.#e.fps.visible=!1}tick(e){const{gameState:n,screenSize:r}=e;this.#b(n);for(const o of _t)this.#p(n,r,o),this.#h(n,r,o),this.#f(n,r,o);this.#l(r),this.#d(n),this.#a(n),this.#g(),this.#n?.tick(e)}get container(){return this.#t}destroy(){this.#t.destroy()}}const $n={movementType:"vel",vels:{gravity:I}},pa=(t,e,n)=>{if(!fe(t))return $n;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=Ui[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?H("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Ht*n,-a)}}}:$n:{movementType:"vel",vels:{gravity:{z:Math.max(o-Ht*n,-a)}}}},Nn=L.h,Vn=.001,ma=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=pn**2/(2*_e);if(n==="up"){if(e<=r)return Math.max(Vn,Math.sqrt(2*_e*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(Vn,Math.sqrt(2*_e*o))}else return pn}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*_e*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*_e*Math.max(e,0))):-.036},ba={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function ga({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(z(o).some(h=>Ei(h)&&h.config.style==="stepStool"))return ba;const l=t*Nn,c=e*Nn,u=ma({currentAltitude:r-l,direction:n,totalDistance:c-l});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=l?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function va(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&H("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:jt}}}:Te;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return tn({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:jt}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const jn={movementType:"vel",vels:{movingFloor:I}},ya=(t,e,n)=>{if(j(t)&&t.state.teleporting!==null)return jn;const{state:{standingOn:r}}=t;if(r===null||!H("conveyor")(r))return jn;const{config:{direction:o}}=r,s=H("heels")(t)&&t.state.action==="moving"&&Kt(t.state.facing)===pi(o)?le.heels:$i;return{movementType:"vel",vels:{movingFloor:B(Nt[o],s)}}};function*xa(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const wa=L.w*Math.sqrt(2)+1,Ca=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,h=500,p=de(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+h<c){const m={type:"firedDoughnut",...Ni,config:qe,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,B(p,wa),t.type==="headOverHeels"?{z:L.h}:I),vels:{fired:B(p,le.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};nn({room:e,item:m}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},Ta=2;function*Sa(t,e,n,r){he(t)&&(yield pa(t,n,r),yield ya(t),yield*xa(t,e)),j(t)&&(yield Oo(t,n,r),t.id===n.currentCharacterName&&(yield va(t,n,r),yield ko(t,n),Vi(t)&&ra(t,e,n,r),ji(t)&&Ca(t,e,n))),Hi(t)&&(yield ga(t)),Xi(t)&&(yield js(t,e,n,r))}const ka=(t,e,n,r)=>{!he(t)||t.state.standingOn===null||(j(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&yo({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||j(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&yr({touchedItem:t.state.standingOn,gameState:n,room:e}))},Oa=(t,e,n,r)=>{j(t)&&t.state.standingOn!==null&&br(t.state.standingOn)&&vo({room:e,movingItem:t,touchedItem:t.state.standingOn});const o=[...Sa(t,e,n,r)];ka(t,e,n);let i=Io(t,o);(he(t)||H("lift")(t)||H("firedDoughnut")(t))&&(i=U(i,...z(k(t.state.vels)).map(l=>B(l,r))));const s=Math.ceil(Se(i)/Ta),a=B(i,1/s);for(let l=0;l<s;l++)wr({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:_o})},Ia=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,se(t,e);const u=mn(e)[c],d=ve({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:ht(u)};return}if(t.entryState.headOverHeels!==void 0){se(t,e);const c=ve({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=mn(e);if(se(t,c),se(t,u),en(c,u)){const d=Tr({head:c,heels:u});se(t,d,"heels");const h=ve({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:ht(d)};return}else{const d=ve({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},ve=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Vt(r.rooms[n],t.pickupsCollected[n]);for(const i of e)nn({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Gi(o,t);return o},se=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},_a=(t,e)=>{const n=Sr(t,kr(e.type));if(e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];se(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Tr({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});se(t,a);const l=ve({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}nn({room:r,item:e});return}else{const s=ve({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Pa=(t,e)=>{e.type==="headOverHeels"?Ia(t,e):_a(t,e),Z(t)===void 0&&C.dispatch(mi())},Ba=t=>{for(const e of k(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){bn(n);continue}if(!cn(n,e)){bn(n);const r=go(n,k(t.items));r!==void 0&&vr({above:n,below:r})}}},Aa=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Fa=(t,e,n)=>{for(const r of k(t.items))!he(r)||t.roomTime===r.state.actedOnAt||bi(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=gi(r.state.position),n.add(r))},Da=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},za=qe,La=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=Hn(t,e),i=ce(t)?.items??za;n=new Set(z(Wt(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return Hn(t,e*t.gameSpeed)},Hn=(t,e)=>{const{inputStateTracker:n}=t,r=ce(t);if(r===void 0)return hr;const o=Object.fromEntries(z(gt(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Pt(t),n.currentActionPress("swop.head")==="tap"&&Pt(t,"head"),n.currentActionPress("swop.heels")==="tap"&&Pt(t,"heels");for(const a of k(r.items))Aa(a,r)&&(Cr({room:r,item:a}),j(a)&&Pa(t,a));const i=Object.values(r.items).sort(Da);for(const a of i){const l=Z(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&Oa(a,r,t,e)}Ba(r);const s=new Set(z(k(r.items)).filter(a=>o[a.id]===void 0||!ke(a.state.position,o[a.id])));return Ys(s,r,o),Fa(r,o,s),Ma(t,r,e),s},Ma=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Z(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Sr(t,kr(r.type));i!==void 0&&(i.state.gameTime+=n)}}},Xn=(t,e)=>{const n=w(t),r=w(U(t,{x:e.x,z:e.z})),o=w(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},zt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Ra=(t,e,n,r)=>{const o=Xn(t,e),i=Xn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=zt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,h=o.bottomCentre.y-o.bottomCentre.x/2,p=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,g=zt(d,h,p,m),A=o.topLeft.y+o.topLeft.x/2,F=o.bottomCentre.y+o.bottomCentre.x/2,E=i.topLeft.y+i.topLeft.x/2,_=i.bottomCentre.y+i.bottomCentre.x/2,P=zt(A,F,E,_);return u&&g&&P},Ua=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Ra(n,r,o,i))return 0;for(const s of vi){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Gn(e)-Gn(t)},Gn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class lt extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const Ea=t=>{const e=$a(t);let n=e.length,r=n;const o=new Array(n),i={},s=Na(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new lt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const p=h[--c];try{a(p,s.get(p),u)}catch(m){throw m instanceof lt?m.hasClosedCycle?m:new lt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function $a(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Na(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const qn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},rt=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Va=(t,e=new Set(k(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||rt(n,o,s);for(const o of e)if(o.renders)for(const i of k(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Ua(o,i);if(qn(r,o,i),s===0){rt(n,o.id,i.id),rt(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;qn(n,a,l),rt(n,l,a)}return n},Ao=(t,e,n=3)=>{try{return{order:Ea(t),impossible:!1}}catch(r){if(r instanceof lt){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:Ao(t,e,n-1).order,impossible:!0}}else throw r}};class ja extends mo{}const Wn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},Yn=(t,e)=>{const n=new V;return Wn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Wn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Ha={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Xa{#t;constructor(e){const n=Ha[e.type]??"rgba(255,255,255)";if(this.#t=new b({label:`ItemBoundingBoxRenderer ${e.id}`}),H("portal")(e)){const o=w(e.config.relativePoint);this.#t.addChild(new V().circle(o.x,o.y,5).stroke(n)),this.#t.addChild(new V().circle(o.x,o.y,2).fill(n))}this.#t.addChild(new V({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#t.addChild(Yn(e.aabb,n)),e.renderAabb&&this.#t.addChild(Yn(e.renderAabb,"rgba(184, 184, 255)")),this.#t.eventMode="static";let r;this.#t.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#t.addChild(r=new ms({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#t.on("pointerleave",()=>{r!==void 0&&(this.#t.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#t.destroy({children:!0})}get container(){return this.#t}}class Ga{#t;#n;#e;constructor(e,n){this.#n=new b({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#e=n,this.#t=e,this.#r()}#r(){const e=w(this.#t.state.position);this.#n.x=e.x,this.#n.y=e.y}tick(e){this.#e?.tick(e),e.movedItems.has(this.#t)&&this.#r()}destroy(){this.#n.destroy({children:!0}),this.#e?.destroy()}get container(){return this.#n}}const qa=(t,e)=>{const n=e.getLocalBounds(),r=sn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new we({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Jn=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=f({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof we?o:qa(t,o)};class Wa{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=C.getState();o||(this.#t.filters=new fs({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const{times:s}=e.config,a=Jn(r,i,s);e.shadowMask.relativeTo==="top"&&(a.y-=e.aabb.z),s&&(a.y-=((s.z??1)-1)*L.h),this.#t.addChild(a),o||(this.#t.mask=a)}this.#t.addChild(this.#n)}#t=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#e={};destroy(){this.#t.destroy(!0)}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=z(k(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:qi}},a=Object.groupBy(i,l=>{const c=this.#e[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":en(s,l)?c?"update":"create":"noShadow"});for(const l of Wt(a.keepUnchanged,a.update))this.#e[l.id].renderedOnProgression=n;if(a.create)for(const l of a.create){const{times:c}=l.config,u=Jn(this.pixiRenderer,l.shadowCastTexture,c);u.label=l.id,this.#n.addChild(u),this.#e[l.id]={sprite:u,renderedOnProgression:n}}for(const l of Wt(a.create,a.update)){const{sprite:c}=this.#e[l.id],u=w({...Xe(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of dt(this.#e))u!==n&&(c.destroy(),delete this.#e[l]);this.#t.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#t}}const Ya=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Ja=(t,e,n)=>{const o=re.textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&re.textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},ot=t=>D(({subject:e})=>Wi(e)?f({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):f(t)),D=t=>({subject:e,currentlyRenderedProps:n,gameState:r,renderContext:o})=>n===void 0?{container:t({subject:e,gameState:r,previousRendering:null,renderContext:o}),renderProps:qe}:"no-update";function*Za({config:{direction:t,inHiddenWall:e,height:n}},r){const o=vt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=f({textureId:`generic.door.floatingThreshold.${o}`,...st(a,{y:-12*n})});l.filters=Yt(r,o==="x"?"towards":"right",!0),yield l}}else{yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...st(a,{})});for(let l=1;l<n;l++)yield f({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...st(a,{y:-l*L.h})})}}yield*s(T({...ee,[o]:1})),yield*s(ee),e||(yield f({pivot:{x:16,y:L.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...T({...ee,[o]:1})}))}const Fo=(t,e)=>{const n=vt(t),r=Ge(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):ee},Qa=D(({subject:t,renderContext:{room:e}})=>He(Za(t,e),new b({filters:K(e),...Fo(t.config.direction,t.aabb)}))),Ka=D(({subject:{config:{direction:t,part:e},aabb:n},renderContext:{room:r}})=>{const o=vt(t);return f({textureId:Ja(r,o,e),filter:K(r),...Fo(t,n)})}),Lt={animationId:"bubbles.cold"},ye=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(f(e));const o=f(t);return o.y=-12,r.addChild(o),r},el=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n},tl=`#version 300 es

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
`;class Zn extends Y{constructor(e){const n=X.from({vertex:Ct,fragment:tl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const Mt=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(xi(i))return{textureId:i}}const o=`${t}.idle.${n}`;return wi(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},Qn=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+Yi>t,nl=t=>{if(!$e(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%gn<gn*.15},Kn={head:v.metallicBlue,heels:v.pink},er=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},tr=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?Ce:t.filters},Rt=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?er(o,new xe({outlineColor:Kn[t],upscale:C.getState().upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&tr(o,xe);const s=r?.flashing??!1;n&&!s?er(o,new Zn(Kn[t])):!n&&s&&tr(o,Zn)},Ut=({subject:t,currentlyRenderedProps:e,previousRendering:n,gameState:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=t,l=cr(s)??"towards",c=t.type==="headOverHeels"?Qn(t.state.head,"headOverHeels","headOverHeels"):Qn(t.state,t.type,r.currentCharacterName),u=nl(t),d=Se(s),h=a?.phase??null,p={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c},m=e===void 0||e.action!==i||e.facingXy8!==l||e.teleportingPhase!==h,g=m?o==="headOverHeels"?el({top:f(Mt({name:"head",...p})),bottom:f(Mt({name:"heels",...p}))}):f(Mt({name:o,...p})):n;return o==="headOverHeels"?(Rt("head",p,m?void 0:e,g.getChildAt(1)),Rt("heels",p,m?void 0:e,g.getChildAt(0))):Rt(o,p,m?void 0:e,g),i==="moving"&&n instanceof je&&(n.animationSpeed=d*yi),{container:g,renderProps:p}},rl=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new b({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),o=He(z(dt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>f({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=He(z(dt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?f({textureId:"floorOverdraw.behindDoor",label:s,...T(st(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):f({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[Ge(Ve(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},ol=t=>[...z(k(t.items)).filter(e=>e.type==="wall").filter(e=>Ve(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],il=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},sl=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new V().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),al=D(({subject:t,renderContext:{room:e}})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=wt(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:h},roomJson:p}=e,m=new b({label:`floor(${e.id})`});if(d!=="none"){const E=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,_=new b;for(let M=-1;M<=o+2;M++)for(let Q=M%2-1;Q<=i+2;Q+=2)_.addChild(Ji({x:M+(s.right?-.5:0),y:Q+(s.towards?-.5:0)},f({textureId:E})));_.addChild(rl(p,{x:n,y:r}));const P=new V().poly([ee,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});_.addChild(P),_.filters=K(e),_.mask=P,m.addChild(_)}const g=ol(p),A=new V().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(A);const F=il(g);if(F!==void 0){const E=sl({extraWallRanges:F,blockXMin:n,blockYMin:r});m.addChild(E)}return m.mask=A,m.y=-t.aabb.z,m.cacheAsTexture(!0),m}),ll=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=T({x:-t,y:-e}),i={towards:new b({label:"towards",...o}),right:new b({label:"right",...o})};return z(dt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},p=f({label:s,textureId:`floorEdge.${l}`,...T(h),times:a.type==="wall"?a.config.times:{[Ge(Ve(l))]:2}});i[l].addChild(p),l==="right"&&c.y===0&&e<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(f({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(h,{x:-.5}))}))}),i},cl=D(({renderContext:{displaySettings:t,onHold:e,room:n}})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=wt(n.roomJson),c=i-r,u=s-o,d=new b({label:"floorEdge"}),h=new V({label:"overDrawToHideFallenItems"}).poly([T({x:c,y:0}),T({x:0,y:0}),T({x:0,y:u}),{...T({x:0,y:u}),y:999},{...T({x:c,y:0}),y:999}],!0).fill(0);h.y=8,d.addChild(h);const{towards:p,right:m}=ll({blockXMin:r,blockYMin:o},n.roomJson),g=!e&&!(t.uncolourised??ft.displaySettings.uncolourised);p.filters=Yt(n,"towards",g),m.filters=Yt(n,"right",g),d.addChild(p),d.addChild(m);const A=new V({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(A),d.mask=A,d.cacheAsTexture(!0),d}),ul=({subject:{config:t,state:e},currentlyRenderedProps:n,renderContext:{room:r}})=>{const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?Ss:o?void 0:co(r);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Kt(e.facing)??"towards";if(!(n===void 0||o!==n.activated||i!==n.busyLickingDoughnutsOffFace||a!==n.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:f({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:f({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:f(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ye({top:{textureId:`${t.which}.${a}`,filter:s||K(r)},bottom:Lt}):f({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ye({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(n===void 0||i!==n.busyLickingDoughnutsOffFace||o!==n.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:f(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:f({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ye({top:Lt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ye({top:"ball",bottom:Lt,filter:s}),renderProps:l};case"emperor":return{container:f({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},dl=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Et=v.moss,nr=()=>D(({subject:{config:{style:t}}})=>f(t==="book"?"book.y":t)),fl={head:Ut,heels:Ut,headOverHeels:Ut,doorFrame:Ka,doorLegs:Qa,monster:ul,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:D(({subject:{id:t,config:{direction:e,tiles:n}},renderContext:{room:r}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=Ge(Ve(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=f({textureId:Ya(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Re.w,y:Re.h+1}:{x:0,y:Re.h+1},filter:K(r)}),l=T({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:D(({subject:{config:{axis:t,times:e}}})=>f({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({subject:{config:{style:t,times:e}},renderContext:{room:n}})=>f({textureId:t,filter:t==="volcano"?K(n):void 0,times:e})),slidingDeadly:nr(),slidingBlock:nr(),block({subject:{config:{style:t,times:e},state:{disappear:n}},currentlyRenderedProps:r,renderContext:{room:o}}){return r===void 0||r.disappear!==n?{container:f({textureId:dl(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?K(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({subject:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?Ci(C.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:f(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({subject:{config:{direction:t,times:e},state:{stoodOnBy:n}},currentlyRenderedProps:r}){const o=n.size>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new b,a=Ve(t);return s.addChild(f(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:D(()=>{const t=new b,e={x:Me.w/2,y:Me.h};return t.addChild(f({animationId:"lift",pivot:e})),t.addChild(f({textureId:"lift.static",pivot:e})),t}),teleporter({subject:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=z(t).find(j)!==void 0;return e===void 0||n!==e.flashing?{container:n?new b({children:[f("teleporter"),f({animationId:"teleporter.flashing"})]}):f("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:D(({subject:{config:t},renderContext:{room:e}})=>{if(t.gives==="crown")return f({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:K(e)},reincarnation:{animationId:"fish"}}[t.gives];return f(r)}),moveableDeadly:D(({subject:{config:{style:t}}})=>f(t==="deadFish"?"fish.1":"puck.deadly")),charles({subject:{state:{facing:t}},currentlyRenderedProps:e}){const n=Kt(t)??"towards";return e===void 0||n!==e.facingXy4?{container:ye({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:ot("joystick"),movableBlock:D(({subject:{config:{style:t}}})=>f(t)),portableBlock({subject:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new xe({outlineColor:Et,lowRes:!1,upscale:C.getState().upscale.gameEngineUpscale}):void 0;return{container:f({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({subject:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new xe({outlineColor:Et,lowRes:!1,upscale:C.getState().upscale.gameEngineUpscale}):void 0;return{container:f(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({subject:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new xe({outlineColor:Et,upscale:C.getState().upscale.gameEngineUpscale,lowRes:!1}):void 0;return{container:t==="headOverHeels"?ye({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):f({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:ot("hushPuppy"),bubbles:D(({subject:{config:{style:t}}})=>f({animationId:`bubbles.${t}`})),firedDoughnut:ot({animationId:"bubbles.doughnut"}),ball:ot("ball"),floor:al,floorEdge:cl},hl=t=>t.shadowMask!==void 0,pl=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=C.getState(),i=Ti(o),s=pr(o),a=mr(o),l=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const u=fl[t.type],d=new ja(t,n,u);c.push(d),l&&(d.container.alpha=.66),!a&&s&&hl(t)&&c.push(new Wa(t,e,r))}return l&&c.push(new Xa(t)),c.length===0?"not-needed":new Ga(t,new ml(c))};class ml{#t;#n=new b({label:"CompositeRenderer"});constructor(e){this.#t=e,this.#n.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#t)n.tick(e)}destroy(){for(const e of this.#t)e.destroy()}get container(){return this.#n}}const me=.33,bl=Si()==="mobile"?-4:16,Qt=Re.h-Re.w/2,gl=le.heels,vl=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=wt(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-bl-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,p=u.y+s-Qt<0;return(m,g,A)=>{if(m===void 0)return;const F=w(m.state.position),E=U(F,u),_={x:d&&E.x<n.x*me?Math.min(-a,n.x*me-F.x):h&&E.x>n.x*(1-me)?Math.max(n.x-l,n.x*(1-me)-F.x):u.x,y:p&&E.y<n.y*me?n.y*me-F.y:u.y};if(A)e.x=_.x,e.y=_.y;else{const P=gl*g,M=Xe(e,_),Q=dr(M);if(Q>P){const oe={x:M.x/Q,y:M.y/Q};e.x-=oe.x*P,e.y-=oe.y*P}else e.x=_.x,e.y=_.y}}},yl=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=wt(t);return new V().rect(e+r.x,o-Qt,n-e,r.y-o+Qt).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class rr{#t=new b({label:"items"});#n=new b({label:"floorEdge"});#e=new b({children:[this.#t,this.#n]});#r=!1;#s=new Map;#o=new Map;#i;#l;#c;#a;#d;#f;#u;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=C.getState();this.#l=i,this.#c=s,this.#a=n,this.#d=e,this.#f=r,this.#u=o,this.#e.label=`RoomRenderer(${n.id})`;const a=!(i?.uncolourised??ft.displaySettings.uncolourised);this.initFilters(!r&&a,n.color),(i?.showBoundingBoxes??ft.displaySettings.showBoundingBoxes)!=="none"&&this.#e.addChild(yl(n.roomJson)),this.#i=vl(n,this.#e,s.gameEngineScreenSize)}initFilters(e,n){this.#t.filters=e?Ce:new W(ln(n).main.original)}#h(e){for(const n of k(this.#a.items)){let r=this.#o.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=pl({item:n,room:this.#a,gameState:this.#d,pixiRenderer:this.#u}),r==="not-needed"){this.#o.set(n.id,"not-needed");continue}this.#o.set(n.id,r),(n.type==="floorEdge"?this.#n:this.#t).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#o.entries())this.#a.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#o.delete(n))}#p(e){const{order:n}=Ao(Va(this.#a.items,e.movedItems,this.#s),this.#a.items);for(let r=0;r<n.length;r++){const o=this.#o.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(k(this.#a.items))};this.#i(Z(this.#d),n.deltaMS,!this.#r);const r={...n,room:this.#a};this.#h(r),(!this.#r||n.movedItems.size>0)&&this.#p(r),this.#r=!0}destroy(){this.#e.destroy({children:!0}),this.#o.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#l}get upscale(){return this.#c}get everRendered(){return this.#r}get container(){return this.#e}get roomState(){return this.#a}get paused(){return this.#f}}var St=`in vec2 aPosition;
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
`,kt=`struct GlobalFilterUniforms {
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
}`,xl=`precision highp float;
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
`,wl=`struct CRTUniforms {
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
}`,Cl=Object.defineProperty,Tl=(t,e,n)=>e in t?Cl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ct=(t,e,n)=>(Tl(t,typeof e!="symbol"?e+"":e,n),n);const Do=class zo extends Y{constructor(e){e={...zo.DEFAULT_OPTIONS,...e};const n=ue.from({vertex:{source:kt,entryPoint:"mainVertex"},fragment:{source:wl,entryPoint:"mainFragment"}}),r=X.from({vertex:St,fragment:xl,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ct(this,"uniforms"),ct(this,"seed"),ct(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};ct(Do,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Sl=Do;var kl=`
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
}`,Ol=`struct KawaseBlurUniforms {
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
}`,Il=`
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
`,_l=`struct KawaseBlurUniforms {
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
}`,Pl=Object.defineProperty,Bl=(t,e,n)=>e in t?Pl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ie=(t,e,n)=>(Bl(t,typeof e!="symbol"?e+"":e,n),n);const Lo=class Mo extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ne("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Mo.DEFAULT_OPTIONS,...n};const r=ue.from({vertex:{source:kt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?_l:Ol,entryPoint:"mainFragment"}}),o=X.from({vertex:St,fragment:n?.clamp?Il:kl,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ie(this,"uniforms"),ie(this,"_pixelSize",{x:0,y:0}),ie(this,"_clamp"),ie(this,"_kernels",[]),ie(this,"_blur"),ie(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=ge.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let p=0;p<h;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),ge.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};ie(Lo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Al=Lo;var Fl=`in vec2 vTextureCoord;
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
`,Dl=`struct AdvancedBloomUniforms {
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
`,zl=`
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
`,Ll=`struct ExtractBrightnessUniforms {
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
`,Ml=Object.defineProperty,Rl=(t,e,n)=>e in t?Ml(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ro=(t,e,n)=>(Rl(t,typeof e!="symbol"?e+"":e,n),n);const Uo=class Eo extends Y{constructor(e){e={...Eo.DEFAULT_OPTIONS,...e};const n=ue.from({vertex:{source:kt,entryPoint:"mainVertex"},fragment:{source:Ll,entryPoint:"mainFragment"}}),r=X.from({vertex:St,fragment:zl,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Ro(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Ro(Uo,"DEFAULT_OPTIONS",{threshold:.5});let Ul=Uo;var El=Object.defineProperty,$l=(t,e,n)=>e in t?El(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,be=(t,e,n)=>($l(t,typeof e!="symbol"?e+"":e,n),n);const $o=class No extends Y{constructor(e){e={...No.DEFAULT_OPTIONS,...e};const n=ue.from({vertex:{source:kt,entryPoint:"mainVertex"},fragment:{source:Dl,entryPoint:"mainFragment"}}),r=X.from({vertex:St,fragment:Fl,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:ae.WHITE}}),be(this,"uniforms"),be(this,"bloomScale",1),be(this,"brightness",1),be(this,"_extractFilter"),be(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Ul({threshold:e.threshold}),this._blurFilter=new Al({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=ge.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=ge.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),ge.returnTexture(s),ge.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};be($o,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Nl=$o;const or=({crtFilter:t},e)=>[t?new Sl({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Nl({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Vl{constructor(e,n){this.app=e,this.#o=e,this.#i=n;const r=C.getState(),{upscale:{gameEngineUpscale:o}}=r;e.stage.addChild(this.#s),e.stage.scale=o;const i=ce(n);if(i===void 0)throw new Error("main loop with no starting room");this.#r=new rr({gameState:n,roomState:i,paused:!1,pixiRenderer:e.renderer}),this.#s.addChild(this.#r.container),this.#e=new En(n,Ot(r),pr(r),It(r)),e.stage.addChild(this.#e.container),this.#l()}#t;#n;#e;#r;#s=new b({label:"MainLoop/world"});#o;#i;#l(){const{userSettings:{displaySettings:e}}=C.getState();this.#t=or(e,!0),this.#n=or(e,!1)}tick=({deltaMS:e})=>{const n=C.getState(),r=mr(n),{userSettings:{displaySettings:o},upscale:i}=C.getState(),s=!r&&!(o?.uncolourised??ft.displaySettings.uncolourised);(this.#e.colourise!==s||this.#e.onScreenControls!==Ot(n)||this.#e.inputDirectionMode!==It(n))&&(this.#e.destroy(),this.#e=new En(this.#i,Ot(n),s,It(n)),this.#o.stage.addChild(this.#e.container)),this.#e.tick({gameState:this.#i,screenSize:i.gameEngineScreenSize});const a=r?hr:La(this.#i,e),l=ce(this.#i);(this.#r?.roomState!==l||this.#r?.upscale!==i||this.#r?.displaySettings!==o||this.#r?.paused!==r)&&(this.#r?.destroy(),l?(this.#r=new rr({gameState:this.#i,roomState:l,paused:r,pixiRenderer:this.#o.renderer}),this.#s.addChild(this.#r.container),this.#i.events.emit("roomChange",l.id)):this.#r=void 0,this.#o.stage.scale=i.gameEngineUpscale,this.#l()),this.#r?.tick({progression:this.#i.progression,movedItems:a,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#o.stage.filters=this.#t:this.#o.stage.filters=this.#n};start(){return this.#o.ticker.add(this.tick),this}stop(){this.#o.stage.removeChild(this.#s),this.#r?.destroy(),this.#e.destroy(),this.#o.ticker.remove(this.tick)}}bt.add(Ir,_r,Pr,Br,Ar,Fr,Dr,zr,Lr,Mr,Rr,Er,Ur,$r,Nr,Vr,jr,Hr,Xr,Gr,qr);ki.defaultOptions.scaleMode="nearest";const ir=async(t,e)=>{const n=new to;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const r=ws({campaign:t,inputStateTracker:e});C.dispatch(dn(r.characterRooms.head.id)),C.dispatch(dn(r.characterRooms.heels.id));const o=new Vl(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=Z(r);s!==void 0&&tn({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return ce(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Wl=Object.freeze(Object.defineProperty({__proto__:null,default:ir,gameMain:ir},Symbol.toStringTag,{value:"Module"}));export{Zr as A,Wr as C,Y as F,sn as R,os as S,Qr as V,cs as a,Wl as g,rs as u};
