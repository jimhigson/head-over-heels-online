const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-B8yXooih.js","assets/index-Cc9CTqV2.js","assets/index-Bc5uafZs.css","assets/colorToUniform-BXaCBwVl.js","assets/SharedSystems-BUtg02fC.js","assets/CanvasTextGenerator-D-BV8kYk.js","assets/levelEditorSlice-Bs_1X2ta.js","assets/RoomJson-BgIs5_iw.js","assets/LevelEditor-5sGGwdMj.js","assets/WebGLRenderer-Dm0do1fW.js"])))=>i.map(i=>d[i]);
import{r as ms,g as gs,G as _r,a as J,A as Lr,K as V,E as P,l as dt,k as ys,a1 as xs,m as C,d as ue,v as he,e as T,a0 as vs,D as Dt,aW as An,_ as me,T as de,U as ws,M as Cs,aX as ke,V as Or,aY as Ss,aZ as ks,a6 as Et,C as Is,z as Ms,w as Ts,a_ as zr,a$ as A,b0 as Bn,aB as S,ag as ut,b1 as rn,b2 as $t,aj as Z,b3 as Q,b4 as Ps,b5 as As,b6 as on,ai as oe,b7 as Bs,aw as Rs,al as Me,ak as _s,b8 as G,b9 as W,am as Ls,az as Ee,aF as se,aE as Os,aT as Ut,ao as jt,aR as sn,ba as Gt,i as ht,aD as an,bb as Ve,bc as Fr,bd as zs,as as Dr,o as Fs,av as pe,aJ as Er,ah as ft,be as $r,bf as ln,bg as Ur,bh as pt,bi as Ds,bj as Es,bk as $s,bl as ie,bm as Us,bn as cn,bo as js,aO as fe,ay as dn,bp as De,bq as jr,br as Gs,bs as Hs,aP as Ns,bt as Vs,au as Qe,bu as Rn,bv as Ws,bw as Xs,bx as qs,by as Zs}from"./index-Cc9CTqV2.js";import{G as Ys,p as Js,a as un,b as hn,c as fn,d as Ks,e as Qs,f as ei,u as ti,i as ne,g as ni,h as ri,j as L,s as Gr,k as Hr,l as Nr,m as pn,n as et,o as oi,w as Vr,q as si,r as ii,t as Ht,v as _n,x as ai,y as Wr,z as Xr,A as li,B as ci,C as xt,D as qr,E as di,F as ui,H as hi,I as fi,J as We,K as vt,L as Fe,M as pi,N as Zr,O as Nt,P as bi,Q as bn,R as Yr,S as mi,T as gi,U as mn,V as Jr,W as yi,X as tt,Y as xi,Z as vi,_ as be,$ as gn,a0 as bt,a1 as I,a2 as wi,a3 as Ci,a4 as Si,a5 as ki,a6 as Ln,a7 as Ii,a8 as On,a9 as Mi,aa as Ti,ab as zn,ac as Pi,ad as Ai,ae as Bi,af as Ri,ag as Kr,ah as _i,ai as Li,aj as Qr}from"./levelEditorSlice-Bs_1X2ta.js";import{o as Vt}from"./RoomJson-BgIs5_iw.js";import{s as b,a as Oi,i as zi,u as Fi,B as wt,T as Fn,t as j,b as eo,h as q,z as to,g as ot,y as Di,c as Ei,d as no,e as $i,f as st,j as ro,k as Ui,l as yn}from"./LevelEditor-5sGGwdMj.js";import{F as K,v as ae,C as Dn,G as Y}from"./CanvasTextGenerator-D-BV8kYk.js";var Xe={},En;function ji(){if(En)return Xe;En=1;const{ensureIterable:n}=ms();function e(r){const o=n(r);let s=0;for(const i of o)s++;return s}Xe.__size=e;const t=e;return Xe.size=t,Xe}var Ct,$n;function Gi(){return $n||($n=1,Ct=ji().size),Ct}var Hi=Gi();const oo=gs(Hi);var Ni=`
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
`,Vi=`in vec2 aPosition;
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
`,Wi=`
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
}`;class R extends K{constructor(e){const t=e.gpu,r=Un({source:Wi,...t}),o=_r.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),s=e.gl,i=Un({source:Ni,...s}),a=J.from({vertex:Vi,fragment:i}),l=new Lr({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:V.EMPTY}})}}function Un(n){const{source:e,functions:t,main:r}=n;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",r)}const xn=`
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
    `,vn=`
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
	`;class so extends R{constructor(){super({gl:{functions:`
                ${xn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${vn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}so.extension={name:"color",type:P.BlendMode};class io extends R{constructor(){super({gl:{functions:`
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
            `}})}}io.extension={name:"color-burn",type:P.BlendMode};class ao extends R{constructor(){super({gl:{functions:`
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
                `}})}}ao.extension={name:"color-dodge",type:P.BlendMode};class lo extends R{constructor(){super({gl:{functions:`
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
                `}})}}lo.extension={name:"darken",type:P.BlendMode};class co extends R{constructor(){super({gl:{functions:`
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
            `}})}}co.extension={name:"difference",type:P.BlendMode};class uo extends R{constructor(){super({gl:{functions:`
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
            `}})}}uo.extension={name:"divide",type:P.BlendMode};class ho extends R{constructor(){super({gl:{functions:`
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
            `}})}}ho.extension={name:"exclusion",type:P.BlendMode};class fo extends R{constructor(){super({gl:{functions:`
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
                `}})}}fo.extension={name:"hard-light",type:P.BlendMode};class po extends R{constructor(){super({gl:{functions:`
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
            `}})}}po.extension={name:"hard-mix",type:P.BlendMode};class bo extends R{constructor(){super({gl:{functions:`
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
            `}})}}bo.extension={name:"lighten",type:P.BlendMode};class mo extends R{constructor(){super({gl:{functions:`
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
                `}})}}mo.extension={name:"linear-burn",type:P.BlendMode};class go extends R{constructor(){super({gl:{functions:`
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
            `}})}}go.extension={name:"linear-dodge",type:P.BlendMode};class yo extends R{constructor(){super({gl:{functions:`
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
            `}})}}yo.extension={name:"linear-light",type:P.BlendMode};class xo extends R{constructor(){super({gl:{functions:`
                ${xn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${vn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}xo.extension={name:"luminosity",type:P.BlendMode};class vo extends R{constructor(){super({gl:{functions:`
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
            `}})}}vo.extension={name:"negation",type:P.BlendMode};class wo extends R{constructor(){super({gl:{functions:`
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
                `}})}}wo.extension={name:"overlay",type:P.BlendMode};class Co extends R{constructor(){super({gl:{functions:`
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
                `}})}}Co.extension={name:"pin-light",type:P.BlendMode};class So extends R{constructor(){super({gl:{functions:`
                ${xn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${vn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}So.extension={name:"saturation",type:P.BlendMode};class ko extends R{constructor(){super({gl:{functions:`
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
                `}})}}ko.extension={name:"soft-light",type:P.BlendMode};class Io extends R{constructor(){super({gl:{functions:`
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
                `}})}}Io.extension={name:"subtract",type:P.BlendMode};class Mo extends R{constructor(){super({gl:{functions:`
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
                `}})}}Mo.extension={name:"vivid-light",type:P.BlendMode};const Wt=[];dt.handleByNamedList(P.Environment,Wt);async function Xi(n){if(!n)for(let e=0;e<Wt.length;e++){const t=Wt[e];if(t.value.test()){await t.value.load();return}}}let Re;function qi(){if(typeof Re=="boolean")return Re;try{Re=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Re=!1}return Re}var To=(n=>(n[n.NONE=0]="NONE",n[n.COLOR=16384]="COLOR",n[n.STENCIL=1024]="STENCIL",n[n.DEPTH=256]="DEPTH",n[n.COLOR_DEPTH=16640]="COLOR_DEPTH",n[n.COLOR_STENCIL=17408]="COLOR_STENCIL",n[n.DEPTH_STENCIL=1280]="DEPTH_STENCIL",n[n.ALL=17664]="ALL",n))(To||{});class Zi{constructor(e){this.items=[],this._name=e}emit(e,t,r,o,s,i,a,l){const{name:c,items:d}=this;for(let h=0,f=d.length;h<f;h++)d[h][c](e,t,r,o,s,i,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Yi=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Po=class Ao extends ys{constructor(e){super(),this.uid=xs("renderer"),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const t=[...Yi,...this.config.runners??[]];this._addRunners(...t),this._unsafeEvalCheck()}async init(e={}){const t=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Xi(t),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Ao.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,t){let r=e;if(r instanceof C&&(r={container:r},t&&(ue(he,"passing a second argument is deprecated, please use render options instead"),r.target=t.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:T.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.visible&&(r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r))}resize(e,t,r){const o=this.view.resolution;this.view.resize(e,t,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const t=this;e.target||(e.target=t.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=To.ALL);const{clear:r,clearColor:o,target:s}=e;T.shared.setValue(o??this.background.colorRgba),t.renderTarget.clear(s,r,T.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(t=>{this.runners[t]=new Zi(t)})}_addSystems(e){let t;for(t in e){const r=e[t];this._addSystem(r.value,r.name)}}_addSystem(e,t){const r=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=r,this._systemsHash[t]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,t){const r=t.reduce((o,s)=>(o[s.name]=s.value,o),{});e.forEach(o=>{const s=o.value,i=o.name,a=r[i];this.renderPipes[i]=new s(this,a?new a:null),this.runners.destroy.add(this.renderPipes[i])})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),(e===!0||typeof e=="object"&&e.releaseGlobalResources)&&vs.release(),Object.values(this.runners).forEach(t=>{t.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!qi())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Po.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Bo=Po,qe;function Ji(n){return qe!==void 0||(qe=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:n??Bo.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Dt.get().getWebGLRenderingContext())return!1;let r=Dt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const s=r.getExtension("WEBGL_lose_context");s&&s.loseContext()}return r=null,o}catch{return!1}})()),qe}let Ze;async function Ki(n={}){return Ze!==void 0||(Ze=await(async()=>{const e=Dt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(n)).requestDevice(),!0}catch{return!1}})()),Ze}const jn=["webgl","webgpu","canvas"];async function Qi(n){let e=[];n.preference?(e.push(n.preference),jn.forEach(s=>{s!==n.preference&&e.push(s)})):e=jn.slice();let t,r={};for(let s=0;s<e.length;s++){const i=e[s];if(i==="webgpu"&&await Ki()){const{WebGPURenderer:a}=await An(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-B8yXooih.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]));t=a,r={...n,...n.webgpu};break}else if(i==="webgl"&&Ji(n.failIfMajorPerformanceCaveat??Bo.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await An(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-Dm0do1fW.js");return{WebGLRenderer:l}},__vite__mapDeps([9,1,2,3,4,5,6,7,8]));t=a,r={...n,...n.webgl};break}else if(i==="canvas")throw r={...n},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!t)throw new Error("No available renderer for the current environment");const o=new t;return await o.init(r),o}const Ro="8.14.3";class _o{static init(){globalThis.__PIXI_APP_INIT__?.(this,Ro)}static destroy(){}}_o.extension=P.Application;class ea{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Ro)}destroy(){this._renderer=null}}ea.extension={type:[P.WebGLSystem,P.WebGPUSystem],name:"initHook",priority:-10};const Lo=class Xt{constructor(...e){this.stage=new C,e[0]!==void 0&&ue(he,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.stage||(this.stage=new C),this.renderer=await Qi(e),Xt._plugins.forEach(t=>{t.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return ue(he,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,t=!1){const r=Xt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(t),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Lo._plugins=[];let Oo=Lo;dt.handleByList(P.Application,Oo._plugins);dt.add(_o);var ta=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    if (uAlpha == 0.0) {
        finalColor = color;
        return;
    }

    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    vec4 result;

    result.r = (uColorMatrix[0] * color.r);
        result.r += (uColorMatrix[1] * color.g);
        result.r += (uColorMatrix[2] * color.b);
        result.r += (uColorMatrix[3] * color.a);
        result.r += uColorMatrix[4];

    result.g = (uColorMatrix[5] * color.r);
        result.g += (uColorMatrix[6] * color.g);
        result.g += (uColorMatrix[7] * color.b);
        result.g += (uColorMatrix[8] * color.a);
        result.g += uColorMatrix[9];

    result.b = (uColorMatrix[10] * color.r);
       result.b += (uColorMatrix[11] * color.g);
       result.b += (uColorMatrix[12] * color.b);
       result.b += (uColorMatrix[13] * color.a);
       result.b += uColorMatrix[14];

    result.a = (uColorMatrix[15] * color.r);
       result.a += (uColorMatrix[16] * color.g);
       result.a += (uColorMatrix[17] * color.b);
       result.a += (uColorMatrix[18] * color.a);
       result.a += uColorMatrix[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    finalColor = vec4(rgb, result.a);
}
`,Gn=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
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

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uTexture, uSampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class na extends K{constructor(e={}){const t=new Lr({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),r=_r.from({vertex:{source:Gn,entryPoint:"mainVertex"},fragment:{source:Gn,entryPoint:"mainFragment"}}),o=J.from({vertex:ae,fragment:ta,name:"color-matrix-filter"});super({...e,gpuProgram:r,glProgram:o,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let r=e;t&&(this._multiply(r,this.matrix,e),r=this._colorMatrix(r)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=r,this.resources.colorMatrixUniforms.update()}_multiply(e,t,r){return e[0]=t[0]*r[0]+t[1]*r[5]+t[2]*r[10]+t[3]*r[15],e[1]=t[0]*r[1]+t[1]*r[6]+t[2]*r[11]+t[3]*r[16],e[2]=t[0]*r[2]+t[1]*r[7]+t[2]*r[12]+t[3]*r[17],e[3]=t[0]*r[3]+t[1]*r[8]+t[2]*r[13]+t[3]*r[18],e[4]=t[0]*r[4]+t[1]*r[9]+t[2]*r[14]+t[3]*r[19]+t[4],e[5]=t[5]*r[0]+t[6]*r[5]+t[7]*r[10]+t[8]*r[15],e[6]=t[5]*r[1]+t[6]*r[6]+t[7]*r[11]+t[8]*r[16],e[7]=t[5]*r[2]+t[6]*r[7]+t[7]*r[12]+t[8]*r[17],e[8]=t[5]*r[3]+t[6]*r[8]+t[7]*r[13]+t[8]*r[18],e[9]=t[5]*r[4]+t[6]*r[9]+t[7]*r[14]+t[8]*r[19]+t[9],e[10]=t[10]*r[0]+t[11]*r[5]+t[12]*r[10]+t[13]*r[15],e[11]=t[10]*r[1]+t[11]*r[6]+t[12]*r[11]+t[13]*r[16],e[12]=t[10]*r[2]+t[11]*r[7]+t[12]*r[12]+t[13]*r[17],e[13]=t[10]*r[3]+t[11]*r[8]+t[12]*r[13]+t[13]*r[18],e[14]=t[10]*r[4]+t[11]*r[9]+t[12]*r[14]+t[13]*r[19]+t[14],e[15]=t[15]*r[0]+t[16]*r[5]+t[17]*r[10]+t[18]*r[15],e[16]=t[15]*r[1]+t[16]*r[6]+t[17]*r[11]+t[18]*r[16],e[17]=t[15]*r[2]+t[16]*r[7]+t[17]*r[12]+t[18]*r[17],e[18]=t[15]*r[3]+t[16]*r[8]+t[17]*r[13]+t[18]*r[18],e[19]=t[15]*r[4]+t[16]*r[9]+t[17]*r[14]+t[18]*r[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const r=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(r,t)}tint(e,t){const[r,o,s]=T.shared.setValue(e).toArray(),i=[r,0,0,0,0,0,o,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const r=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(r,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const r=Math.cos(e),o=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=r+(1-r)*i,c=i*(1-r)-a*o,d=i*(1-r)+a*o,h=i*(1-r)+a*o,f=r+i*(1-r),u=i*(1-r)-a*o,p=i*(1-r)-a*o,m=i*(1-r)+a*o,g=r+i*(1-r),v=[l,c,d,0,0,h,f,u,0,0,p,m,g,0,0,0,0,0,1,0];this._loadMatrix(v,t)}contrast(e,t){const r=(e||0)+1,o=-.5*(r-1),s=[r,0,0,0,o,0,r,0,0,o,0,0,r,0,o,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const r=e*2/3+1,o=(r-1)*-.5,s=[r,o,o,0,0,o,r,o,0,0,o,o,r,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,r,o,s){e||(e=.2),t||(t=.15),r||(r=16770432),o||(o=3375104);const i=T.shared,[a,l,c]=i.setValue(r).toArray(),[d,h,f]=i.setValue(o).toArray(),u=[.3,.59,.11,0,0,a,l,c,e,0,d,h,f,t,0,a-d,l-h,c-f,0,0];this._loadMatrix(u,s)}night(e,t){e||(e=.1);const r=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(r,t)}predator(e,t){const r=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(r,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}class Te extends me{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:d,updateAnchor:h=!1,...f}=t,[u]=d;super({...f,texture:u instanceof V?u:u.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=i,this.updateAnchor=h,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=d,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(de.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(de.shared.add(this.update,this,ws.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,r=this.animationSpeed*t,o=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=r/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const r=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(o=>{this.texture!==o&&o.destroy(r)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let r=0;r<e.length;++r)t.push(V.from(e[r]));return new Te(t)}static fromImages(e){const t=[];for(let r=0;r<e.length;++r)t.push(V.from(e[r]));return new Te(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof V)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(de.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(de.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ra{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new Cs,this.observer=t,this.position=new ke(this,0,0),this.scale=new ke(this,1,1),this.pivot=new ke(this,0,0),this.skew=new ke(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const zo=class nt extends Or{constructor(...e){let t=e[0]||{};t instanceof V&&(t={texture:t}),e.length>1&&(ue(he,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...nt.defaultOptions,...t};const{texture:r,anchor:o,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:d,roundPixels:h,...f}=t??{};super({label:"TilingSprite",...f}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new ke({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=d,this.texture=r,this._width=l??r.width,this._height=c??r.height,this._tileTransform=new ra({observer:{_onUpdate:()=>this.onViewUpdate()}}),o&&(this.anchor=o),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=h??!1}static from(e,t={}){return typeof e=="string"?new nt({texture:Ss.get(e),...t}):new nt({texture:e,...t})}get uvRespectAnchor(){return ue(he,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){ue(he,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=V.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,r=this._width,o=this._height;e.minX=-t._x*r,e.maxX=e.minX+r,e.minY=-t._y*o,e.maxY=e.minY+o}containsPoint(e){const t=this._width,r=this._height,o=-t*this._anchor._x;let s=0;return e.x>=o&&e.x<=o+t&&(s=-r*this._anchor._y,e.y>=s&&e.y<=s+r)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const r=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(r)}this._texture=null}};zo.defaultOptions={texture:V.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let oa=zo;class sa extends Or{constructor(e,t){const{text:r,resolution:o,style:s,anchor:i,width:a,height:l,roundPixels:c,...d}=e;super({...d}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=r??"",this.style=s,this.resolution=o??null,this.allowChildren=!1,this._anchor=new ke({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,r=this.bounds.height,o=-t*this.anchor.x;let s=0;return e.x>=o&&e.x<=o+t&&(s=-r*this.anchor.y,e.y>=s&&e.y<=s+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function ia(n,e){let t=n[0]??{};return(typeof t=="string"||n[1])&&(ue(he,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:n[1]}),t}class aa extends sa{constructor(...e){const t=ia(e,"Text");super(t,ks),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof Et?t.textureStyle:new Et(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let r=0,o=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=Dn.getCanvasAndContext({text:this.text,style:this._style,resolution:1});Dn.returnCanvasAndContext(i),r=s.width,o=s.height}else{const s=Is.measureText(this._text,this._style);r=s.width,o=s.height}e.minX=-t._x*r,e.maxX=e.minX+r,e.minY=-t._y*o,e.maxY=e.minY+o}}class mt extends V{static create(e){return new mt({source:new Ms(e)})}resize(e,t,r){return this.source.resize(e,t,r),this}}const Fo=class Do extends C{constructor(e={}){e={...Do.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const r=e[t];if(r.parentRenderLayer){if(r.parentRenderLayer===this)continue;r.parentRenderLayer.detach(r)}this.renderLayerChildren.push(r),r.parentRenderLayer=this;const o=this.renderGroup||this.parentRenderGroup;o&&(o.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const r=e[t],o=this.renderLayerChildren.indexOf(r);o!==-1&&this.renderLayerChildren.splice(o,1),r.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,r){const o=this.renderLayerChildren,s=o.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)o[i].parent||Ts("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",o[i]),o[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,r){if(!e)return;const o=this.renderLayerChildren;for(let s=0;s<o.length;s++)o[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};Fo.defaultOptions={sortableChildren:!1,sortFunction:(n,e)=>n.zIndex-e.zIndex};let Hn=Fo;const la=(n,e)=>{const t=zr();A.useLayoutEffect(()=>{Bn(S.dispatch,S.getState,n,e)},[n,e]),A.useLayoutEffect(()=>{const r=()=>Bn(S.dispatch,S.getState,n,e);if(e){const o=new ResizeObserver(r);return o.observe(e),()=>o.disconnect()}else return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[t,e,n])},ca=()=>{const{cssUpscale:n,canvasSize:e,rotate90:t}=ut(rn);return t?`scale(${n}) rotate(90deg) translate(0, -${e.y}px)`:`scale(${n})`},da=(n,e=console.error)=>(...t)=>{try{return n(...t)}catch(r){e(r);return}},Eo=n=>{for(const[,l]of n)for(const[c]of l)l.set(c,!1);const e=Array.from(ua(n));let t=e.length,r=t;const o=new Array(t),s={},i=ha(e);for(;r--;)s[r]||a(e[r],r,new Set,null);return o;function a(l,c,d,h){if(d.has(l)){if(h!==null){const p=n.get(h);p?.has(l)&&p.set(l,!0)}return}if(s[c])return;s[c]=!0;const f=n.get(l),u=Array.from(f?.entries()??$t);if(c=u.length){d.add(l);do{const[p,m]=u[--c];m||a(p,i.get(p),d,l)}while(c);d.delete(l)}o[--t]=l}};function ua(n){const e=new Set;for(const[t,r]of n.entries()){e.add(t);for(const o of r.keys())e.add(o)}return e}function ha(n){const e=new Map;for(let t=0,r=n.length;t<r;t++)e.set(n[t],t);return e}const fa=(n,e,t,r)=>(n.has(e)||n.set(e,new Map),n.get(e).set(t,r),n),_e=(n,e,t)=>{const r=n.get(e);return r!==void 0&&(r.delete(t),r.size===0&&n.delete(e)),n},St=1e-5,Nn=-1,Le=(n,e,t,r,o)=>r-o>n&&t<e-o,pa=0,$o=1,Uo=2,jo=3,ba=(n,e)=>{const t=Le(n.zAxisProjectionMin,n.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,St),r=Le(n.xAxisProjectionMin,n.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,St),o=Le(n.yAxisProjectionMin,n.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,St);return r&&o&&t?$o:o&&t&&Le(n.xAxisProjectionMin,n.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Nn)?Uo:r&&t&&Le(n.yAxisProjectionMin,n.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Nn)?jo:pa},ma=(n,e,t,r)=>{for(const o of Ps){const s=n[o],i=s+e[o],a=t[o],l=a+r[o];if(i<=a)return 1*(o==="z"?-1:1);if(s>=l)return-1*(o==="z"?-1:1)}return Vn(t)-Vn(n)},ga=(n,e,t)=>{if(n.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const r=n.renderAabbOffset?Z(n.state.position,n.renderAabbOffset):n.state.position,o=n.renderAabb||n.aabb,s=e.renderAabbOffset?Z(e.state.position,e.renderAabbOffset):e.state.position,i=e.renderAabb||e.aabb;switch(ba(t.getItemAxesProjections(n),t.getItemAxesProjections(e))){case $o:return ma(r,o,s,i);case Uo:return Q(r.y,s.y+i.y)&&Q(r.z,s.z+i.z)?1:Q(s.y,r.y+o.y)&&Q(s.z,r.z+o.z)?-1:0;case jo:return Q(r.x,s.x+i.x)&&Q(r.z,s.z+i.z)?1:Q(s.x,r.x+o.x)&&Q(s.z,r.z+o.z)?-1:0;default:return 0}},Vn=n=>n.x+n.y-n.z,Go=(n,e=new Ys(Vt(n)),t=new Set(Vt(n)),r=new Map)=>{const o=new Map;for(const[s,i]of r)if(!n[s])r.delete(s);else for(const[a]of i)n[a]||_e(r,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=r.get(s.id);a?.forEach((l,c)=>{i.has(n[c])||a.delete(c)}),r.forEach((l,c)=>{i.has(n[c])||_e(r,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||o.get(a)?.has(s))continue;const l=ga(s,a,e);if(o.has(s)||o.set(s,new Set),o.get(s).add(a),l===0){_e(r,s.id,a.id),_e(r,a.id,s.id);continue}const c=l>0?s.id:a.id,d=l>0?a.id:s.id;fa(r,d,c,!1),_e(r,c,d)}}return r},Wn=n=>n.fixedZIndex!==void 0,ya=n=>{const t=n.some(([,i])=>i==="intersects-rendered")?n.filter(([,i])=>i==="intersects-rendered").map(([i])=>i):n.map(([i])=>i);if(t.every(Wn))return t.toSorted((i,a)=>a.fixedZIndex-i.fixedZIndex).at(0);const r=t.filter(i=>!Wn(i));if(r.length===0)return;if(r.length===1)return r[0];const o=Object.fromEntries(r.map(i=>[i.id,i])),s=Eo(Go(o));return o[s.at(-1)]},xa=3,va=(n,{x:e,y:t},r)=>As.find(o=>{const s=Js(n.state.position,n.aabb,o);return on(oe(s,{x:e,y:t}))<xa}),ve=3,kt=1.5;function X({x:n,y:e},t,r){const o={x:n-t.x,y:e-t.y},s=o.x*r.y-o.y*r.x;return Math.abs(s)/Bs(Math.hypot(r.x,r.y))}const Ho={point:{x:-1,y:-1,z:0},normal:{x:0,y:0,z:1}},No={point:{x:-1,y:0,z:1},normal:{x:0,y:1,z:0}},Vo={point:{x:0,y:-1,z:1},normal:{x:1,y:0,z:0}},Wo={point:{x:0,y:1,z:1},normal:{x:1,y:0,z:0}},Xo={point:{x:1,y:0,z:1},normal:{x:0,y:1,z:0}},qo={point:{x:1,y:-1,z:0},normal:{x:0,y:0,z:1}},Zo={point:{x:0,y:-1,z:-1},normal:{x:1,y:0,z:0}},Yo={point:{x:-1,y:1,z:0},normal:{x:0,y:0,z:1}},Jo={point:{x:-1,y:0,z:-1},normal:{x:0,y:1,z:0}},wa=(n,e,t,r)=>{const{position:o}=n.state,{aabb:s}=n,i=t.x<0,a=t.y<0,l=t.z>0;if((i||a)&&X(e,un(o),{x:0,y:-1})<kt)return Ho;if((i||l)&&X(e,hn(o,s),{x:2,y:-1})<kt)return No;if((a||l)&&X(e,fn(o,s),{x:2,y:1})<kt)return Vo;switch(!0){case l:{const c=ei(o,s);if(X(e,c,{x:2,y:1})<ve)return Wo;if(X(e,c,{x:-2,y:1})<ve)return Xo;break}case a:{const c=Qs(o,s);if(X(e,c,{x:0,y:-1})<ve)return qo;if(X(e,c,{x:2,y:1})<ve)return Zo;break}case i:{const c=Ks(o,s);if(X(e,c,{x:0,y:-1})<ve)return Yo;if(X(e,c,{x:-2,y:1})<ve)return Jo;break}}},Ca={z:1,x:0,y:0},Sa={z:0,x:0,y:-1},Xn={z:0,x:-1,y:0},ka=(n,{x:e,y:t},r)=>{if(r.type==="item"&&r.item.type==="door"&&n.type==="wall"){const d=n.config.direction;return Rs(ti[d],-1)}const{position:o}=n.state,{aabb:s}=n,i=un(o),a=fn(o,s),l=hn(o,s);return t<a.y-(a.x-e)/2?t<l.y-(e-l.x)/2?Ca:Xn:e<i.x?Sa:Xn},qn=(n,e,t)=>t?{position:n.state.position,aabb:n.aabb}:{position:Z(n.state.position,n.renderAabbOffset??Me),aabb:n.renderAabb??n.aabb},Zn=({x:n,y:e},t,r)=>{const o=un(t),s=fn(t,r),i=hn(t,r);return!(n<s.x||n>i.x||e<i.y-(i.x-n)/2||e<s.y-(n-s.x)/2||e>o.y-(n-o.x)/2||e>o.y-(o.x-n)/2)},Ia=(n,e,t)=>{const{position:r,aabb:o}=qn(t,e,!1);if(Zn(n,r,o))return"intersects-rendered";if(e.type==="item"&&t.type==="wall"){const{position:i,aabb:a}=qn(t,e,!0);if(Zn(n,i,a))return"intersects-unrendered"}return"non-intersecting"},Ko=(n,e,t,r)=>{const o=t.type==="item"&&t.item.type==="door"?1:r,s=L.w*o,i=L.h,a=o===1?0:L.w/2,l=i/2,c=_s(e);return{x:c==="yz"?Math.round(n.x/s)*s:Math.floor((n.x-a)/s)*s,y:c==="xz"?Math.round(n.y/s)*s:Math.floor((n.y-a)/s)*s,z:c==="xy"?Math.round(n.z/i)*i:Math.floor((n.z+l)/i)*i}},Ma=({state:{position:n},aabb:e},t,r,o,s)=>{const i={x:n.x+(t.x<0?0:e.x),y:n.y+(t.y<0?0:e.y),z:n.z+(t.z<0?0:e.z)},a=ri(i,t,r);return Ko(a,t,o,s)},Ta=n=>e=>{const t=ni(e);return n.type==="item"&&n.item.type==="door"?t&&e.type==="wall":t},It=(n,e,t,r)=>{const o=ne(e.items).filter(Ta(t)).map(l=>[l,Ia(n,t,l)]).filter(l=>l[1]!=="non-intersecting"),s=Array.from(o),i=ya(s),a=e.id;if(i){const l=ka(i,n,t);if(!(l.z>0&&!Object.isExtensible(i.state.stoodOnBy)))return{roomId:a,scrXy:n,world:{itemId:i.id,onItem:{face:l,corner:va(i,n),edge:wa(i,n,l)},position:Ma(i,l,n,t,r)}}}return{roomId:a,scrXy:n,world:void 0}},Pe=40,rt=(n,e,t)=>{const r=n.cssUpscale*n.gameEngineUpscale;if(t.target===null)throw new Error("Mouse event target is null");const o=t.target.getBoundingClientRect(),s=t.clientX-o.left,i=t.clientY-o.top;return{x:s/r+e.l-Pe,y:i/r+e.t-Pe}},Pa=(n,e)=>{const t=n.cssUpscale*n.gameEngineUpscale;if(e.target===null)throw new Error("Mouse event target is null");const r=e.movementX,o=e.movementY;return{x:r/t,y:o/t}},Aa=n=>{n.ticker.remove(n.render,n)},Qo=A.createContext(null),Ba=({children:n})=>{const[e,t]=A.useState(null);return A.useEffect(()=>{const r=new Oo;return r.init({background:b.pureBlack,sharedTicker:!0,useBackBuffer:!0}).then(()=>{Aa(r),t(r)}),()=>{}},[]),e===null?null:G.jsx(Qo,{value:e,children:n})},ge=()=>A.useContext(Qo),it=(n,...e)=>n.levelEditor.wallsFloorsLocked&&e.some(t=>t.type==="wall"||t.type==="floor"),qt=(n,e)=>{const t=S.getState();let r;if(e.world){const o=e.world.itemId,s=o&&n.items[o],i=it(t,s)?void 0:s.jsonItemId;r=i===void 0?void 0:{jsonItemId:i,pointingAtOnItem:e.world.onItem}}else r=void 0;W(Gr(t),r)||S.dispatch(Hr(r))},at=({levelEditor:n},e,t)=>{const r=e.items[t]?.jsonItemId;if(r===void 0)return;const o=Nr(n,r);if(o!==void 0)return[r,o]},{dispatch:Ra}=S;class _a{handleMouseMove({roomState:e,pointingAt:t}){qt(e,t)}handleMouseUp({roomState:e,pointingAt:t,storeState:r,isClick:o}){if(!o)return;const s=t.world?.itemId;if(s===void 0){console.warn("no itemId");return}const i=e.items[s];if(it(r,i))return;const a=at(r,e,s);if(a===void 0)return;const[,l]=a;Ra(pn({type:"item",item:{type:l.type,config:l.config}}))}handleMouseDown(e){}handleMouseLeave(e){}}const Yn=(n,e,t)=>{const{world:{onItem:{face:r},position:o,itemId:s}}=n;if(r.z>Ls)return et(o);if(t.type==="door"){const i=e.items[s];if(i.type!=="wall")return;const{config:a,aabb:l,state:{position:c}}=i,d=oi(Vr(a)),h=Ee(se(a.direction)),f=se(a.direction);if(d[h]<2)return;const u=c[h],p=c[h]+l[h]-si,m=c.z,g=c.z+l.z-ii,v={[h]:Math.max(Math.min(o[h],p),u),[f]:o[f],z:Math.max(Math.min(o.z,g),m)};return et(v)}return Z(et(o),r)},{dispatch:Oe}=S;class La{handleMouseMove({pointingAtChanged:e,roomState:t,pointingAt:r,tool:o,storeState:s}){if(!e||(Oe(Ht()),r.world===void 0))return;const i=at(s,t,r.world.itemId);if(i===void 0)return;const[,a]=i,l=Yn(r,t,o.item);if(l===void 0)return;const{item:c}=o,d=c.type==="door"?Os(c,f=>{const u=t.items[r.world.itemId];f.config.direction=u.config.direction}):o.item;Oi({roomState:t,blockPosition:l,itemTool:d})||Oe(_n({blockPosition:l,pointedAtItemJson:a,preview:!0}))}handleMouseUp({roomState:e,pointingAt:t,tool:r,storeState:o,isClick:s}){if(!s)return;if(t.world===void 0){Oe(pn({type:"pointer"}));return}const i=at(o,e,t.world.itemId);if(i===void 0)return;const[,a]=i,l=Yn(t,e,r.item);l!==void 0&&Oe(_n({blockPosition:l,pointedAtItemJson:a,preview:!1}))}handleMouseDown(e){}handleMouseLeave(e){Oe(Ht())}}const Oa=n=>Xr(e=>e>0?e:e>-1?1:-e+1,n),za=({jsonItem:n,blockDragAccVec:e,resizeEdgeDirection:t})=>{const r=n.position,o=ai(n),s=Ut(e,t,Wr(n)),i=Z(o,s),a=Oa(i),l=Xr((c,d,h,f,u)=>{const p=d<1;return c<0!==p?p?h-u+1:h+f-u:p?h+f-1:h},t,i,r,o,a);return{timesDelta:jt(a,o),positionDelta:jt(l,r)}},Fa=5,{dispatch:ze}=S,Da=(n,e,t)=>{const r=t?.world?.itemId;if(r===void 0)return Gt;const o=e.items[r].jsonItemId;if(o===void 0)return Gt;const{selectedJsonItemIds:s}=n.levelEditor;return s.includes(o)?s:[o]},Ea=(n,e,t)=>{const r=n.world?.onItem.edge,o=Ut(...ht(t).map(i=>Wr(i))),s=Ut(r?.point??Me,o);return an(s)>0?r.normal:e?{x:1,y:0,z:0}:{x:0,y:0,z:1}},$a=(n,e,t,r,o,s)=>{if(n===void 0)return;const i=oe(e,n.scrXy),a=on(i);if(!(o||a>Fa))return;const c=Ea(n,r,s),d=fi(c,t);return r?{x:0,y:0,z:d.z}:d},Jn=(n,e=!1)=>{const t=S.getState().levelEditor;return Ko(n,{x:0,y:0,z:1},t.tool,e?1:t.gridResolution)};class Ua{handleMouseMove({roomState:e,pointingAt:t,storeState:r,mouseDownPointingAtRef:o,mouseEvent:s,upscale:i,dragAccVec:a,roomRenderSize:l}){const c=Pa(i,s),d=Da(r,e,o.current);if(d.length===0){qt(e,t);return}const h=d.map(B=>li(r,B));if(it(r,...h))return;const u=t.roomId===o.current?.roomId?$a(o.current,rt(i,l,s),c,s.metaKey||s.shiftKey,a.current!==void 0,h):void 0;if(!u){qt(e,t);return}d.length===1&&!ci(r,d[0])&&S.dispatch(xt({jsonItemIds:d}));const p=o.current?.world?.onItem.edge,m=p&&h.every(B=>qr(B)),g=a.current??Me,v=Z(g,u),x=Jn(v,m);if(a.current=v,sn(Jn(g,m),x))return;const w=et(x);let M,U;if(m){const[,B]=at(r,e,o.current.world.itemId);({timesDelta:U,positionDelta:M}=za({jsonItem:B,blockDragAccVec:w,resizeEdgeDirection:p.point}))}else M=w;zi({roomState:e,jsonItemIds:d,blockPositionDelta:M,timesDelta:U})||ze(di({jsonItemIds:d,positionDelta:M,timesDelta:U}))}handleMouseUp({roomState:e,pointingAt:t,storeState:r,mouseEvent:o,isClick:s,isDragEnd:i}){if(s){const a=t.world===void 0?void 0:e.items[t.world.itemId];if(a?.jsonItemId===void 0||it(r,a)){ze(xt({jsonItemIds:[]}));return}ze(o.ctrlKey||o.metaKey?ui({jsonItemId:a.jsonItemId}):xt({jsonItemIds:[a.jsonItemId]}))}else i&&ze(hi())}handleMouseDown(e){}handleMouseLeave(e){ze(Hr(void 0))}}const Ye={item:new La,pointer:new Ua,eyeDropper:new _a},ja=n=>{const e=ge(),t=ut(rn),r=zr(),o=A.useRef(void 0),s=A.useRef(void 0),i=A.useRef(void 0);A.useEffect(()=>{if(n===null)return;const a=f=>{const u=S.getState(),p=We(u),m=vt(u),g=rt(t,m,f),v=Fe(u),x=It(g,p,v,u.levelEditor.gridResolution),w=!W(x.world,o.current?.world);Ye[v.type].handleMouseMove({pointingAtChanged:w,roomState:p,pointingAt:x,tool:v,storeState:u,mouseDownPointingAtRef:s,mouseEvent:f,upscale:t,dragAccVec:i,roomRenderSize:m}),o.current=x},l=f=>{const u=S.getState(),p=We(u);if(p.id!==u.levelEditor.currentlyEditingRoomId)return;const m=vt(u),g=rt(t,m,f),v=Fe(S.getState()),x=It(g,p,v,u.levelEditor.gridResolution),w=i.current!==void 0,M=!w&&x.roomId===s.current?.roomId&&x.world?.itemId===s.current?.world?.itemId,U=s.current;if(i.current=void 0,s.current=void 0,S.dispatch(pi(!1)),!M&&!w){console.log("mouseUp - not a click or drag end - skipping");return}Ye[v.type].handleMouseUp({roomState:p,pointingAt:x,tool:v,storeState:u,mouseDownPointingAt:U,mouseEvent:f,upscale:t,isClick:M,isDragEnd:w})},c=f=>{const u=S.getState(),p=We(u),m=Fe(u);i.current=void 0,s.current=void 0,Ye[m.type].handleMouseLeave({roomState:p,tool:m,storeState:u,mouseEvent:f})},d=f=>{const u=S.getState(),p=We(u),m=vt(u),g=rt(t,m,f),v=Fe(u),x=It(g,p,v,u.levelEditor.gridResolution);console.log("setting mouseDownPointingAtRef to",x),s.current=x,Ye[v.type].handleMouseDown({roomState:p,pointingAt:x,tool:v,storeState:u,mouseEvent:f,upscale:t})},h=da(a);return n.addEventListener("mousemove",h),n.addEventListener("mouseup",l),n.addEventListener("mousedown",d),n.addEventListener("mouseleave",c),()=>{n.removeEventListener("mousemove",h),n.removeEventListener("mouseup",l),n.removeEventListener("mousedown",d),n.removeEventListener("mouseleave",c)}},[e.stage,t,n,r])},Ga={amigaHiResPal:"Amiga Hi-Res PAL",classicMac:"Classic Mac",amigaLowResPal:"Amiga Low-Res PAL",zxSpectrum:"ZX Spectrum",handheld:"Handheld"},Ha=({selectedResolution:n,onResolutionChange:e})=>{const t=Ve.indexOf(n),r=t<Ve.length-1,o=t>0,{justDone:s,doneNow:i}=Fi();return G.jsxs("div",{className:"absolute scale-editor top-0 right-1 z-slightlyAbove flex gap-0 leading-none text-white",children:[s>0&&G.jsx(wt,{className:"px-1 bg-moss items-center flex",children:Ga[n]}),G.jsx(Fn,{small:!0,disabled:!o,tooltipContent:`##zoom ⬇

makes things look *smaller* by *increasing* emulated resolution`,onClick:()=>{o&&(e(Ve[t-1]),i())},shortcutKeys:["-"],children:G.jsx(wt,{children:"-"})}),G.jsx(Fn,{small:!0,disabled:!r,tooltipContent:`##zoom ⬆

makes things look *bigger* by *decreasing* emulated resolution`,onClick:()=>{r&&(e(Ve[t+1]),i())},shortcutKeys:["⇧+","="],children:G.jsx(wt,{children:"+"})})]})},Na=n=>{const e=ge();A.useEffect(()=>{if(n)return n.appendChild(e.canvas),()=>{n.removeChild(e.canvas)}},[n,e])},Va=n=>{const e=ge(),[t]=A.useState(()=>new C({label:"editorPositioner"})),r=Zr();A.useEffect(()=>{if(n.destroyed){console.log("useAddRoomRendererOutputToApplicationStage: room renderer was destroyed, will not add its output to app");return}return t.addChild(n.output.graphics),e.stage.addChild(t),()=>{e.stage.removeChild(t),t.removeChild(n.output.graphics)}},[n,e,t]),A.useEffect(()=>{t.x=-r.l+Pe,t.y=-r.t+Pe},[t,r])},Wa=(n,e)=>{const t=A.useCallback(()=>{if(n===null)return;const r=Math.max(0,(n.scrollWidth-n.clientWidth)/2),o=Math.max(0,(n.scrollHeight-n.clientHeight)/2);n.scrollTo(r,o)},[n]);A.useEffect(()=>{if(n!==null)return Fr({actionCreator:Nt,effect(){setTimeout(t,0)}})},[t,n]),A.useEffect(()=>{if(n===null||e===null)return;if(e.querySelector("canvas"))setTimeout(t,0);else{const o=new MutationObserver(()=>{e.querySelector("canvas")&&(t(),o.disconnect())});return o.observe(e,{childList:!0,subtree:!0}),()=>o.disconnect()}},[n,e,t])},Xa=()=>{const n=ge(),e=ut(t=>t.upscale.upscale.gameEngineUpscale);n.stage.scale=e},qa=()=>{A.useEffect(()=>Fr({actionCreator:pn,effect(n,{dispatch:e}){e(Ht())}}))},Za=()=>{const n=ge(),e=Zr(),t=ut(r=>r.upscale.upscale);A.useEffect(()=>{const r=(2*Pe+e.w)*t.gameEngineUpscale,o=(2*Pe+e.h)*t.gameEngineUpscale;n.renderer?.resize(r,o)},[n.renderer,e,t])},Ya=({levelEditor:n})=>{const{dragInProgress:e,clickableAnnotationHovered:t,hoveredItem:r,selectedJsonItemIds:o}=n;if(e)return j("cursor-grabbing");if(t)return j("cursor-pointer");if(r){const s=Nr(n,r.jsonItemId);if(s!==void 0&&qr(s))if(r.pointingAtOnItem.corner){if(sn(r.pointingAtOnItem.corner,{x:1,y:1,z:1}))return j("cursor-n-resize")}else{const{edge:i}=r.pointingAtOnItem;if(i){if(W(i,Yo))return j("cursor-e-resize");if(W(i,Ho))return j("cursor-s-resize");if(W(i,qo))return j("cursor-w-resize");if(W(i,No)||W(i,Wo))return j("cursor-ne-resize");if(W(i,Vo)||W(i,Xo))return j("cursor-nw-resize");if(W(i,Jo))return j("cursor-se-resize");if(W(i,Zo))return j("cursor-sw-resize")}}return o.includes(r.jsonItemId)?j("cursor-grab"):j("cursor-default")}return j("cursor-crosshair")},Ja=()=>bi(Ya),k=new window.AudioContext,Zt={pureBlack:new T("#000000"),shadow:new T("#0A1A2A"),midGrey:new T("#3A4036"),lightGrey:new T("#827F63"),white:new T("#FFFADD"),pastelBlue:new T("#1F75FC"),metallicBlue:new T("#003664"),pink:new T("#AD3E90"),moss:new T("#595D00"),redShadow:new T("#412326"),midRed:new T("#9A3226"),lightBeige:new T("#B56B41"),highlightBeige:new T("#D99A42"),alpha:new T("#00404D"),replaceLight:new T("#006847"),replaceDark:new T("#00171C")};var Ka=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=vec4(c.rgb*0.5,c.a);}`;const Qa=J.from({vertex:ae,fragment:Ka,name:"halfbrite-filter"});class el extends K{constructor(){super({glProgram:Qa,resources:{}})}}const wn=6;function*tl(n,e,t,r=1){const o=2**wn-1,s=Math.floor(n*o+.5),i=Math.floor(e*o+.5),a=Math.floor(t*o+.5);for(let l=-r;l<=r;l++)for(let c=-r;c<=r;c++)for(let d=-r;d<=r;d++){const h=s+l,f=i+c,u=a+d;if(h<0||h>o||f<0||f>o||u<0||u>o)continue;const p=Math.sqrt(l*l+c*c+d*d),m=u%8*64,g=Math.floor(u/8)*64,v=m+h,x=g+f;yield{x:v,y:x,distance:p}}}const re=(2**wn)**(3/2),es=re*re,nl=n=>{const e=new Uint8Array(es*4);for(const r of eo)for(const[o,s]of zs(n)){const i=b[o];for(const{x:a,y:l,distance:c}of tl(i.red*r,i.green*r,i.blue*r,2)){const d=l*re+a,h=e[d*4+3],f=Math.max(1,Math.floor(255-c/1.732*254));(h===0||f>h)&&(e[d*4+0]=Math.floor(s.red*r*255),e[d*4+1]=Math.floor(s.green*r*255),e[d*4+2]=Math.floor(s.blue*r*255),e[d*4+3]=f)}}for(let r=3;r<e.length;r+=4)e[r]>0&&(e[r]=255);return V.from({resource:e,width:re,height:re,scaleMode:"nearest",antialias:!1})},{floor:Je,min:rl}=Math,ol=n=>{if(n instanceof Map)return n;const e=new Map,t=Object.entries(n);for(const[r,o]of t){const s=b[r],i=typeof o=="string"?b[o]:o;e.set(s,i)}return e},Kn={red:0,blue:0,green:0},sl=9;function il(n){const e=ol(n),t=new Uint8Array(es*4).fill(255),r=e.keys().toArray(),o=e.values().map(g=>({red:Je(g.red*255),green:Je(g.green*255),blue:Je(g.blue*255)})).toArray(),s=r.length,i=2**wn,a=1/(i-1),l=new Array(s),c=new Array(s),d=[];let h=0;for(let g=0;g<i;g++){const v=new Array(s);for(let x=0;x<s;x++){const w=h-r[x].green;v[x]=w*w}d[g]=v,h+=a}const f=[];let u=0;for(let g=0;g<i;g++){const v=new Array(s);for(let x=0;x<s;x++){const w=u-r[x].red;v[x]=w*w}f[g]=v,u+=a}let p=0;for(let g=0;g<i;g++){const v=g%8*64,x=Je(g/8)*64;for(let w=0;w<s;w++){const M=p-r[w].blue;l[w]=M*M}for(let w=0;w<i;w++){const M=d[w];let _=(x+w)*re+v<<2;for(let B=0;B<s;B++)c[B]=l[B]+M[B];for(let B=0;B<i;){const Ge=f[B];let le=Kn,He=9999;for(let z=0;z<s;z++){const ce=c[z]+Ge[z];ce<He&&(le=o[z],He=ce)}let xe=1;const Ne=rl(B+sl,i-1);for(let z=Ne;z>B;z--){let ce=Kn,Tn=9999;const bs=f[z];for(let Be=0;Be<s;Be++){const Pn=c[Be]+bs[Be];Pn<Tn&&(ce=o[Be],Tn=Pn)}if(ce===le){xe=z-B+1;break}}for(let z=0;z<xe;z++)t[_++]=le.red,t[_++]=le.green,t[_]=le.blue,_+=2;B+=xe}}p+=a}return V.from({resource:t,width:re,height:re,scaleMode:"nearest",antialias:!1})}var al=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=inputColour.a*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=lutColourReplace(uLut,c);}`;const ll=J.from({vertex:ae,fragment:al,name:"palette-swop-filter"}),Qn=new Map;class cl extends K{#e;constructor(e,t){const r=(t==="voronoi"?il:nl)(e);super({glProgram:ll,resources:{colorReplaceUniforms:{},uLut:r.source}}),this.#e=r}destroy(e){this.#e?.destroy(!0),this.#e=null,super.destroy(e)}}const dl=n=>Object.entries(n).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>`${e}:${t.toHex()}`).join("|"),$=(n,e="sparse")=>{const t=`${e}|${dl(n)}`;let r=Qn.get(t);return r||(r=new cl(n,e),Qn.set(t,r)),r};var ul=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uTargetColor;vec4 black=vec4(0.0,0.0,0.0,1.0);void main(void){vec4 c=texture(uTexture,vTextureCoord);float isBlack=step(length(c.rgb),0.01);finalColor=mix(vec4(uTargetColor,1),c,max(isBlack,1.0-c.a));}`;const hl=J.from({vertex:ae,fragment:ul,name:"revert-colourise-filter"});class O extends K{uniforms;constructor(e="white"){super({glProgram:hl,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[t,r,o]=new T(e).toArray();this.uniforms.uTargetColor[0]=t,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const ts=({basic:n,dimmed:e})=>({replaceLight:n,replaceDark:e}),Yt=({color:{hue:n,shade:e},planet:t})=>{const r=n==="yellow"?e==="dimmed"||t==="jail"?Di:Ei:no[n][e].main;return ts(r)},Cn={lightBeige:b.lightGrey,redShadow:b.shadow,pink:b.lightGrey,moss:b.lightGrey,midRed:b.midGrey,highlightBeige:b.lightGrey,pastelBlue:b.lightGrey,metallicBlue:b.midGrey,replaceLight:b.lightGrey,replaceDark:b.midGrey};$(Cn);const fl=$(Er(Cn,"metallicBlue","pastelBlue"));$(Er(Cn,"pink"));const pl=$({midGrey:b.midRed,lightGrey:b.lightBeige,white:b.highlightBeige,metallicBlue:b.redShadow,pink:b.midRed,moss:b.midRed,replaceDark:b.midRed,replaceLight:b.lightBeige}),er=(n,e)=>{const t=ot(n.color).edges[e],r=t.original;return t.dimInOriginal?to(r):r},ns=new T("#424249"),bl=new T("#494908"),ml=new T("#554055"),gl=new T("#404055"),yl={blacktooth:{pureBlack:q(b.moss,.15)},safari:{pureBlack:q(b.moss,.17)},jail:{pureBlack:q(b.redShadow,.2)},egyptus:{pureBlack:q(b.redShadow)},moonbase:{shadow:ns,pureBlack:q(b.metallicBlue,.2)},bookworld:{pureBlack:q(b.highlightBeige,.1)},penitentiary:{pureBlack:q(b.midGrey,.2)}},xl={yellow:{shadow:bl},white:{shadow:ns},magenta:{shadow:ml},cyan:{shadow:gl}},vl=(n,e)=>{if(n){if(e.color.shade==="dimmed"){const t=Yt(e),r=Dr(t,([o,s])=>{for(const[i,a]of Fs(b))for(const l of eo)if(q(a,l).toHex()===s.toHex())return[o,q(Zt[i],l)];return[o,s]});return $({...Zt,...r})}return $({...yl[e.planet]??pe,...xl[e.color.hue]??pe,...Yt(e)})}else return new O(e.color.shade==="dimmed"?to(ot(e.color).main.original):ot(e.color).main.original)},rs=(n,e,t)=>t?$(ts(no[n.color.hue][n.color.shade].edges[e])):new O(ot(n.color).edges[e].original),os=n=>$(Yt(n)),wl=n=>{switch(n.color.hue){case"white":return $({replaceLight:b.lightGrey,replaceDark:b.midGrey});default:return}},ss=n=>{switch(n.color.hue){case"white":return $({replaceLight:b.lightBeige,replaceDark:b.midRed,shadow:b.redShadow});case"yellow":return os({planet:n.planet,color:{hue:"yellow",shade:"dimmed"}});default:return}};new el;const ye=Gt;$(Zt);const Jt=()=>{throw new Error(`sounds not loaded - only call this from inside code 
      (like in a render loop) that is protected and only executed once 
      loading has happened`)},D=n=>{const e=typeof n=="string"?{soundId:n}:n,{playbackRate:t=1,soundId:r,connectTo:o,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=k.createBufferSource(),c=Jt()[r];return l.buffer=c,l.loop=s,l.playbackRate.value=i?t-.05+Math.random()*.1:t,s&&a?l.start(0,c.duration*Math.random()):l.start(),o!==void 0&&l.connect(o),l},we=(n,e,t)=>{const r=k.createGain();return e!==void 0&&(r.gain.value=e),n.connect(r),r.connect(t),r},E=({start:n,change:e,loop:t,stop:r,startAndLoopTogether:o=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c;return d=>{if(!!d!=!!c)d?n!==void 0&&!(a&&s)?(l&&(l.onended=null,l.stop()),l=D({...n}),we(l,n.gain,i),t!==void 0&&(o?(l=D({...t,loop:!0}),we(l,t.gain,i)):l.onended=()=>{c&&(l&&(l.onended=null,l.stop()),l=D({...t,loop:!0}),we(l,t.gain,i))})):t!==void 0&&(l=D({...t,loop:!0}),we(l,t.gain,i)):(l&&l.loop&&(l.onended=null,l.stop()),r!==void 0&&(l=D({...r}),we(l,r.gain,i)));else if(c!==d&&e!==void 0){const f=D({...e});we(f,e.gain,i)}a=!1,c=d}};class Cl{constructor(e){this.renderContext=e,this.output.gain.value=4}output=k.createGain();#e=E({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:t}}}}=this,r=(e.x!==0||e.y!==0)&&t!==null;this.#e(r)}destroy(){}}class Sl{constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&D({soundId:"bonus",connectTo:this.output});break}case"disappearing":{D({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,D({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=k.createGain();tick(){}destroy(){}}class kl{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=k.createGain();#e=k.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{pressed:e}}}}=this,t=this.#t?.pressed;t!==void 0&&t!==e&&D({soundId:"switchClick",playbackRate:e?.95:1.05,connectTo:this.#e}),this.#t={pressed:e}}destroy(){}}class Sn{constructor(e,t,r=1){this.renderContext=e,this.#e=E({start:t},this.output),this.output.gain.value=r}output=k.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:t}}=this,{state:{collidedWith:{roomTime:r,by:o}}}=t,s=r>(e??bn)&&!$i(ft(o));this.#e(s)}destroy(){}}class Il{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n=new Sn(e,{soundId:"metalHit"},.3),this.#n.output.connect(this.output)}output=k.createGain();#e=k.createGain();#t=E({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#n;tick(e){const{renderContext:{item:t,room:{roomTime:r,items:o}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=r===s&&ht(ft(i)).some(l=>Yr(o[l]));this.#t(a),this.#n.tick(e)}destroy(){}}const $e=n=>{for(const e in n)return!0;return!1},Mt=2;class Ml{constructor(e){this.renderContext=e}output=k.createGain();#e=E({start:{soundId:"conveyorStart",playbackRate:Mt},loop:{soundId:"conveyorLoop",playbackRate:Mt},stop:{soundId:"conveyorEnd",playbackRate:Mt}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=$e(e);this.#e(t)}destroy(){this.#e(!1)}}class Tl{constructor(e){this.renderContext=e,D({soundId:"hooter",connectTo:this.output})}output=k.createGain();tick(){}destroy(){}}const Pl=3;class Al{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=k.createGain();#e=D({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Pl*e)}destroy(){}}const tr={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},nr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},rr={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},or={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Bl{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e;tr[t]!==void 0&&(this.#o=new Sn(e,tr[t]),this.#o.output.connect(this.output)),nr[t]!==void 0&&(this.#n=E({change:nr[t]},this.#e)),or[t]!==void 0&&(this.#s=E(or[t],this.#e)),rr[t]!==void 0&&(this.#r=E({loop:rr[t]},this.#t))}output=k.createGain();#e=k.createGain();#t=k.createGain();#n;#r;#o;#s;tick(e){const{renderContext:{item:t}}=this,{state:{facing:r,activated:o,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#n){const a=$r(r);this.#n(a)}if(this.#o&&this.#o.tick(e),this.#r){const a=o&&!s;this.#r(a)}if(this.#s){const a=!sn(i,Me);this.#s(a)}}destroy(){}}const Rl=n=>{if(mi(n))return n.state;if(gi(n))return n.state.heels},_l=.8,Ll=1.2,Ol=.8;class Tt{constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:r}}=e,{noFootsteps:o}={...ln.soundSettings,...t};o||(this.#e=k.createGain(),this.#e.gain.value=_l,this.#e.connect(this.output),this.#t=E({loop:{soundId:`${r==="headOverHeels"?"heels":r}Walk`}},this.#e)),this.#n.gain.value=Ol,this.#n.connect(this.output),this.#a.gain.value=Ll,this.#a.connect(this.output),this.#s.connect(this.output),this.#r=E({start:{soundId:`${r==="headOverHeels"?"head":r}Jump`}},this.#n),this.#o=E({loop:{soundId:`${r==="headOverHeels"?"head":r}Fall`}},this.#n)}output=k.createGain();#e;#t;#n=k.createGain();#r;#o;#s=k.createGain();#i=E({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#s);#a=k.createGain();#c=E({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#a);#l={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:t}}=this,{state:{action:r,teleporting:o,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:d,by:h}}}=t,f=Rl(t),{teleportingPhase:u,positionZ:p}=this.#l,m=o?o.phase:null,g=i&&l>s&&l>p&&c>0,v=l<p&&c<0&&a===null;this.#o(v),this.#r(g),this.#t!==void 0&&this.#t(!g&&!v&&r==="moving"),f!==void 0&&this.#c(f.carrying!==null);const x=a!==null&&d>(e??bn)&&h[a];if(this.#i(x),m!==null&&m!==u)if(m==="in"){const w=Jt().teleportIn,M=k.createBufferSource();M.buffer=w,M.connect(this.output),M.start()}else{const w=Jt().teleportOut,M=k.createBufferSource();M.buffer=w,M.connect(this.output),M.start()}this.#l={teleportingPhase:m,positionZ:l}}destroy(){}}class zl{constructor(e){this.renderContext=e}output=k.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:t}}}}=this;if(t!=="drum")return;const r=this.#e?.stoodOn??!1,o=$e(e);!r&&o&&D({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Fl{constructor(e){this.renderContext=e,this.scrapeBracketed=E({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4}output=k.createGain();scrapeBracketed;tick({movedItems:e}){const{renderContext:{item:t,room:{roomTime:r}}}=this,{state:{actedOnAt:{roomTime:o},standingOnItemId:s}}=t,i=r===o&&s!==null&&e.has(t);this.scrapeBracketed(i)}destroy(){}}class Dl extends Sn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}class El{constructor(e){this.renderContext=e}output=k.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:r}}}}=this,o=$e(t);e!==void 0&&r>e&&!o&&D({soundId:"springBoing",connectTo:this.output})}destroy(){}}class $l{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=k.createGain();#e=k.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,r=t.type==="in-store"?Ur(S.getState().gameMenus,t.path)?"right":"left":e,o=this.#t?.setting;o!==void 0&&o!==r&&D({soundId:"switchClick",playbackRate:r==="right"?.95:1.05,connectTo:this.#e}),this.#t={setting:r}}destroy(){}}const Ue=(n,e)=>ht(ft(n)).map(t=>{const r=e.items[t];if(r===void 0)throw new Error(`item ${t} in stoodOnBy is not in the room`);return r}),is=n=>{let e=2166136261;const t=n.length;for(let r=Math.max(0,t-9);r<t;r++)e^=n.charCodeAt(r),e=Math.imul(e,1540483477),e^=e>>>15;return(e>>>0)/4294967295},Ul=1e3/25,as=n=>{const e=pt.animations[n],t=e.length,{animationSpeed:r}=e;return t*Ul/r};as("bubbles.white");as("head.fadeOut");const kn=({config:{activatedOnStoreValue:n}})=>n===void 0?!0:!!Ds(S.getState().gameMenus.gameInPlay,n);class jl{constructor(e){this.renderContext=e}output=k.createGain();#e=E({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:t}}=this;this.#e(kn(e)&&Ue(e.state.stoodOnBy,t).some(mn))}destroy(){}}const Gl=(n,e)=>oo(Ue(n.state.stoodOnBy,e).filter(Jr));class Hl{constructor(e){this.renderContext=e,this.output.gain.value=2}output=k.createGain();#e=void 0;tick(e){const{renderContext:{item:t,room:r}}=this,o=Gl(t,r);this.#e!==void 0&&o<this.#e&&D({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=o}destroy(){}}const Nl={lift:Al,switch:$l,button:kl,bubbles:Sl,head:Tt,heels:Tt,headOverHeels:Tt,teleporter:jl,monster:Bl,conveyor:Ml,spring:El,portableBlock:zl,charles:Il,ball:Cl,pushableBlock:Fl,firedDoughnut:Tl,slidingBlock:Dl},Vl=n=>{if(n.item.type==="deadlyBlock"&&n.item.config.style==="toaster")return new Hl(n);const e=Nl[n.item.type];if(e)return new e(n)},sr=L.h*-1,ir=L.h*xi,Wl=0,Xl=L.w*16,ql={x:0,y:0,z:0},Pt=(n,e,t)=>(n-e)/(t-e)*2-1,Zl=.5,Yl=.3;class Jl{constructor(e,t){this.renderContext=e,this.childRenderer=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const r=yi(e.room).floors;this.soundPositionMinX=r.edgeLeftX,this.soundPositionMaxX=r.edgeRightX}output=k.createPanner();soundPositionMinX;soundPositionMaxX;tick(e){this.childRenderer.tick(e);const{item:t}=this.renderContext,r=t.state,o=Es($s(ql,t.aabb,.5),r.position),s=Pt(tt(o),this.soundPositionMinX,this.soundPositionMaxX),i=Pt(o.z,sr,ir);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${o.z},
          ${sr},
          ${ir},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(r.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=Pt(o.x+o.y,Wl,Xl);this.output.positionX.value=s*Zl,this.output.positionY.value=i,this.output.positionZ.value=a*Yl}destroy(){this.childRenderer.destroy()}}const ar={x:.5,y:1},lr=n=>typeof n!="string"&&Object.hasOwn(n,"animationId"),Kt=n=>{if(typeof n=="string")return Kt({textureId:n});{const{anchor:e,flipX:t,pivot:r,x:o,y:s,filter:i,times:a,label:l}=n;if(n.times){const d=vi(a);if(an(d)>=2){const f=new C({label:l??"timesXyz"});for(let{x:u}=d;u>=1;u--)for(let{y:p}=d;p>=1;p--)for(let m=1;m<=d.z;m++){const g=n.textureId??n.textureIdCallback?.(u-1,p-1,m-1),v={...n,textureId:g,label:`(${u},${p},${m})`};"randomiseStartFrame"in v&&(v.randomiseStartFrame=`${v.randomiseStartFrame}${u},${p},${m}`),delete v.times;const x=Kt(v),w=be({x:u-1,y:p-1,z:m-1});x.x+=w.x,x.y+=+w.y,f.addChild(x)}return f}}let c;if(lr(n))c=Kl(n);else{const d=n.textureId??n.textureIdCallback?.(0,0,0);c=new me(ie().textures[d])}if(e===void 0&&r===void 0)if(lr(n))c.anchor=ar;else{const d=n.textureId??n.textureIdCallback?.(0,0,0),h=ie().data.frames[d];if(h===void 0)throw new Error(`no spritesheet entry for textureId "${d}"`);const f=h.frame;f.pivot!==void 0?c.pivot=f.pivot:c.anchor=ar}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),s!==void 0&&(c.y=s),i!==void 0&&(c.filters=i),l!==void 0&&(c.label=l),c.eventMode="static",t===!0&&(c.scale.x=-1),c}},y=Kt;function Kl({animationId:n,reverse:e,playOnce:t,paused:r,randomiseStartFrame:o}){const i=ie().animations[n].map(d=>({texture:d,time:Us}));e&&i.reverse();const a=new Te(i),l=de.shared.speed,c=r||l===0?0:Math.sqrt(l)/l;return a.animationSpeed=pt.animations[n].animationSpeed*c,a.gotoAndPlay(o!==void 0?Math.floor(is(o)*i.length):0),t!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),t==="and-destroy"&&(a.visible=!1)}),a}const Ql={Container:"📦",Sprite:"🖼️",UniqueTextureSprite:"✨",Graphics:"🎨",Text:"📝",AnimatedSprite:"🎬",TilingSprite:"🔲",BitmapText:"🔤",Mesh:"🔺",NineSliceSprite:"🔳"},lt=(n,e="",t=!0,r=!0,o=[])=>{const s=[];r&&s.push("");const i=n.constructor.name,a=i.startsWith("_")?i.slice(1):i;let l=Ql[a]||"📌";o.forEach((u,p)=>{u.mask===n&&(p===0?l+="😷":l+=`😷^${p+1}`)});const c=n.label&&n.label!==a?` "${n.label}"`:"",d=[];try{(n.x!==0||n.y!==0)&&d.push(`@(${n.x}, ${n.y})`)}catch{d.push("@(ERROR)")}if(n.children.length>2&&d.push(`children: ${n.children.length}`),n.visible||d.push("hidden"),n.alpha<1&&d.push(`alpha: ${n.alpha.toFixed(2)}`),n.mask&&d.push("😷 masked"),n instanceof me){const u=n;if(u.texture===null||u.texture===void 0)d.push("texture: NO TEXTURE");else{const p=u.texture.label||"(anon texture)";d.push(`texture: "${p}"`)}}const h=r?"":e+(t?"└── ":"├── ");if(s.push(`${h}${l} ${a}${c}`),d.length>0){const u=n.children.length>0,p=r?u?"│  ":"   ":e+(t?"    ":"│   ")+(u?"│  ":"   ");d.forEach(m=>{s.push(`${p}→ ${m}`)})}const f=r?"":e+(t?"    ":"│   ");return n.children.forEach((u,p)=>{const m=p===n.children.length-1;s.push(lt(u,f,m,!1,[n,...o]))}),s.join(`
`)+(r?`
`:"")};class ec extends me{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:e,children:e}):super.destroy({...e,texture:t})}}const tc=(n,e,t)=>{const r=e.getLocalBounds(),o=Math.ceil(r.maxX-r.minX),s=Math.ceil(r.maxY-r.minY),i=t!==void 0?t.width===o&&t.height===s:!1,a=i?t:mt.create({width:o,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=r.minX,e.y-=r.minY;try{n.render({container:e,target:a,clear:i})}catch(d){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${lt(e)}`,{cause:d})}return e.x=l,e.y=c,a},te=(n,e,t,r)=>{const o=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof mt?t.texture:void 0,i=tc(n,e,s),a=t||new ec;return a.texture=i,a.label=r??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-o.minX),y:Math.floor(-o.minY)},a},Ae=(n,e)=>e instanceof me?e:te(n,e),nc=(n,e,t)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&n?`block.organic.dark${t?".disappearing":""}`:`block.${e}${t?".disappearing":""}`,rc=({renderContext:{general:{pixiRenderer:n},item:{config:{style:e,times:t},state:{disappearing:r}},room:o},currentRendering:s})=>{const i=s?.renderProps,a=r!==null;return i===void 0||i.isDissapearing!==a?{output:Ae(n,y({textureId:nc(o.color.shade==="dimmed",e,a),filter:e==="book"?ss(o):void 0,times:t})),renderProps:{isDissapearing:a}}:"no-update"},oc=({renderContext:{item:{state:{pressed:n}}},currentRendering:e})=>{const t=e?.renderProps;return t===void 0||n!==t.pressed?{output:y({textureId:n?"buttonInGame.pressed":"buttonInGame"}),renderProps:{pressed:n}}:"no-update"},At={animationId:"bubbles.cold"},Ie=({top:n,bottom:e="headlessBase",filter:t})=>{const r=new C({filters:t}),o=y(e);r.addChild(o);const s=y(n);return s.y=-12,r.addChild(s),r[gt]=s,r[In]=o,r},gt=Symbol(),In=Symbol(),sc=({top:n,bottom:e})=>{const t=new C;return t.addChild(e),n.y=-12,t.addChild(n),t[gt]=n,t[In]=e,t},ic=({renderContext:{item:{state:{facing:n,actedOnAt:{roomTime:e,by:t}}},room:{roomTime:r,items:o}},currentRendering:s})=>{const i=s?.renderProps,a=cn(n)??"towards",l=r===e&&ht(ft(t)).some(d=>Yr(o[d]));return i===void 0||a!==i.facingXy4||l!==i.controlledByJoystick?{output:Ie({top:`charles.${a}`,bottom:l?"headlessBase.all":"headlessBase"}),renderProps:{facingXy4:a,controlledByJoystick:l}}:"no-update"},je=n=>n,cr=500,ac=pt.animations["conveyor.x"].animationSpeed,dr=pt.animations["conveyor.x"].length,lc=n=>1-(1-n)**2,cc=(n,e)=>{for(let t=0;t<n.children.length;t++){const r=n.children[t],o=t%dr;r.gotoAndStop(e?dr-o-1:o)}},dc=(n,e)=>{const t=se(n),r=y({animationId:`conveyor.${t}`,reverse:n==="towards"||n==="right",times:e}),o=r instanceof Te?new C({children:[r]}):r;return cc(o,n==="towards"||n==="right"),o},uc=({renderContext:{item:{config:{times:n},state:{stoodOnBy:e,direction:t}},room:{roomTime:r}},currentRendering:o})=>{const s=o?.renderProps,i=$e(e),a=(!i&&s?.moving?r:s?.roomTimeStoppedMoving)??bn,l=i?0:Math.min(r-a,cr),c=o?.output,h=!c||t!==s?.direction?dc(t,n):c,f=Math.max(0,1-l/cr);for(const u of h.children)if(f===0)u.stop();else{const p=ac*lc(f);u.play(),u.animationSpeed=p}return{output:h,renderProps:{moving:i,roomTimeStoppedMoving:a,direction:t}}},hc=je(uc);function ls(n,e){const t=e||new C;for(const r of n)t.addChild(r);return t}const yt=(n,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return y({...typeof n=="string"?{textureId:n}:n,times:t})},Ce=n=>F(({renderContext:{item:e}})=>gn(e)?y({...typeof n=="string"?{textureId:n}:n,times:bt(e)}):y(n)),fc=n=>F(({renderContext:{item:e,general:{paused:t}}})=>gn(e)?y({...n,times:bt(e),paused:t}):y({...n,paused:t})),N=n=>F(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(gn(e))return Ae(t,yt(n,bt(e)));{const r=y(n);return r instanceof me?r:te(t,r)}}),F=n=>(({renderContext:e,currentRendering:t,tickContext:r})=>t===void 0?{output:n({renderContext:e,currentRendering:void 0,tickContext:r}),renderProps:pe}:"no-update"),ee=n=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:r})=>{if(r===void 0){const o=bt(t),s={output:Ae(e,yt(n(t.config),o)),renderProps:pe};return o&&(s.output.y-=((o.z??1)-1)*L.h),s}else return"no-update"}),pc=(n,e,t)=>{const o=ie().textures[`door.frame.${n.planet}.${e}.near`]!==void 0?n.planet:"generic",s=n.color.shade==="dimmed"&&ie().textures[`door.frame.${o}.dark.${e}.${t}`]!==void 0;return`door.frame.${o}${s?".dark":""}.${e}.${t}`};function*bc({config:{direction:n,inHiddenWall:e,height:t}},r){const o=dn(n),s=o==="y"?1:16;function*i(a){if(e){if(t!==0){const l=y({textureId:`generic.door.floatingThreshold.${o}`,...De(a,{y:-12*t})});l.filters=rs(r,o==="x"?"towards":"right",!0),yield l}}else{yield y({pivot:{x:s,y:9},textureId:`generic.door.legs.base.${o}`,...De(a,{})});for(let l=1;l<t;l++)yield y({pivot:{x:s,y:9},textureId:`generic.door.legs.pillar.${o}`,...De(a,{y:-l*L.h})})}}yield*i(be({...fe,[o]:1})),yield*i(fe),e||(yield y({pivot:{x:16,y:L.h*t+13},textureId:`generic.door.legs.threshold.double.${o}`,...be({...fe,[o]:1})}))}const cs=(n,e)=>{const t=dn(n),r=Ee(t),o=8;return n==="towards"||n==="right"?I({[r]:e[r]-o}):fe},mc=F(({renderContext:{item:n,room:e}})=>ls(bc(n,e),new C({...cs(n.config.direction,n.aabb)}))),gc=F(({renderContext:{item:{config:{direction:n,part:e,toRoom:t},aabb:r},room:o}})=>{const s=js(S.getState())??S.getState().levelEditor?.campaignInProgress,i=dn(n),a=s?.rooms[t]??o;return y({textureId:pc(o,i,e),filter:os(a),...cs(n,r)})});var yc=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let Qt=jr(S.getState());S.subscribe(()=>{Qt=jr(S.getState())});const xc=J.from({vertex:ae,fragment:yc,name:"outline-filter"});class ct extends K{outlineWidth;constructor({color:e,width:t}){const r=t??Qt;super({glProgram:xc,padding:r,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.outlineWidth=t;const o=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();o.uOutline[0]=s,o.uOutline[1]=i,o.uOutline[2]=a}apply(e,t,r,o){const s=this.resources.colorReplaceUniforms.uniforms,i=this.outlineWidth??Qt;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,r,o)}}const H={...Dr(b,([n,e])=>[n,new ct({color:e})]),black1pxFilter:new ct({color:b.pureBlack,width:1})},Ke=H.pureBlack;new O;new O;new O;new O(b.moss);new O;new O(b[st.head]),new O(b.midGrey),new O(b[st.heels]),new O(b.midGrey);const vc=n=>{const e=`hud.char.${Gs(n)}`;try{ro(e)}catch(t){throw new Error(`no texture id for char "${n}": ${t.message}`,{cause:t})}return e},wc=(n,e)=>(n+.5-e/2)*Hs.w,Cc=n=>typeof n=="string"?n==="infinite"?"":n:n.toString(),ds=(n,e)=>{const t=Cc(e),r=oo(t),o=n.children.length,s=r!==o;try{let i=0;for(const a of t){const l=vc(a);let c;if(i<o){c=n.getChildAt(i);const d=ie().textures[l];c.texture=d}else c=y(l),n.addChild(c);i++}}catch(i){throw console.error("invalid string is",t,"and on window as window.invalid"),console.error(i),window.invalid=e,new Error(`could not show text "${e}" in container because: "${i.message}"`,{cause:i})}if(s){r<o&&n.removeChildren(r);for(let i=0;i<r;i++){const a=n.getChildAt(i);a.x=wc(n.getChildIndex(a),r)}}return n},Sc=wi.floatingText,ur=12,hr=L.h*3,fr=[b.shadow,b.midGrey,b.redShadow,b.metallicBlue,b.midRed,b.moss,b.pink,b.lightBeige,b.pastelBlue,b.lightGrey,b.highlightBeige],pr=[...fr,...new Array(20).fill(b.white),...fr.toReversed()],kc=({renderContext:{item:{config:{textLines:n,appearanceRoomTime:e}},room:{roomTime:t},general:{displaySettings:{uncolourised:r}},frontLayer:o},currentRendering:s})=>{const i=s?.output;let a;const c=(t-e)*Sc;if(i===void 0){a=new C({filters:H.pureBlack}),o?.attach(a);for(let h=0;h<n.length;h++){const f=n[h],u=ds(new C({label:f,y:h*ur,filters:r?ye:new O(b.pink)}),f.toUpperCase());a.addChild(u)}}else a=i;let d=!1;for(let h=0;h<n.length;h++){const f=a.children[h],[u]=f.filters,p=c+h*-ur,m=p>0&&p<hr;if(f.visible=m,d||=m,m&&u){const g=Math.floor(p/hr*pr.length);u.targetColor=pr[g]}}return a.visible=d,a.y=-c,{output:a,renderProps:pe}},br=(n,e)=>e===0?n:Math.round(n/e)*e,mr=n=>n-Math.floor(n),Ic=(n,e,t,r)=>n<=r&&t<=e;var Mc=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float isBlack=step(length(bg),0.001f);finalColor=mix(fg,vec4(0.0,0.0,0.0,0.0),isBlack);}`;const Tc=J.from({vertex:ae,fragment:Mc,name:"colour-clash-filter"});class Pc extends K{constructor(){super({glProgram:Tc,resources:{colorReplaceUniforms:{},uBackTexture:V.EMPTY},blendRequired:!0})}}const Ac=new Pc,Bc=({state:{position:n}},e)=>{const t=o=>o.config.direction==="away"||o.config.direction==="left";return ls(ne(e.items).filter(o=>o.type==="wall"||o.type==="doorLegs").filter(t).map(o=>{const{id:s,config:{direction:i},state:{position:a}}=o;return y({textureId:"floorOverdraw.cornerNearWall",label:s,...I(jt(a,n)),times:o.type==="wall"?Vr(o.config):{[Ee(se(i))]:2},anchor:{x:0,y:1},flipX:i==="away"})}),new C({label:"floorOverdraws"}))},Rc=(n,e)=>{const{config:{naturalFootprint:{aabb:t,position:r}},state:{position:o}}=e,s=tt(oe(Me,o)),{left:i,right:a}=ne(n.items).filter(Ci).filter(l=>{const{state:{position:c},aabb:d}=l,h=l.config.direction,f=se(h),u=Ee(f),p=h==="away"||h==="left",m=r[f]+(p?1:0)*t[f],g=c[f]+(p?0:1)*d[f];return m!==g?!1:Ic(c[u],c[u]+d[u],r[u],r[u]+t[u])}).reduce((l,{aabb:c,renderAabb:d,renderAabbOffset:h,state:{position:f},fixedZIndex:u})=>{const p=u===Si,m=p?c:d??c,g=Z(f,h??Me),v=tt(Z(g,{x:m.x,y:p?m.y:0}))+s,x=tt(Z(g,{x:p?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,v),right:Math.max(l.right,x)}},{left:9999,right:-9999});if(a>i)return new Y().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},gr=({colourised:n,direction:e,room:t,times:r,position:o,colourSwap:s})=>y({label:`floorEdge(${e})`,textureId:`floorEdge.${e}`,times:r,filter:s?rs(t,e,n):void 0,...I(o)}),_c=({room:n,xSize:e,ySize:t,y:r})=>{const o=new C({label:"floorColourClash",filters:[Ac]}),s=er(n,"right");for(let a=0;a<=t;a++){const l=be({x:0,y:a,z:0}),c=new Y().rect(l.x-(a===0?0:8),l.y,24,8).fill(s);o.addChild(c)}const i=er(n,"towards");for(let a=0;a<=e;a++){const l=be({x:a,y:0,z:0}),c=new Y().rect(l.x-16,l.y,8*(a===0?2:3),8).fill(i);o.addChild(c)}return o.y=r,o},Lc=F(({renderContext:{room:n,item:e,general:{colourised:t,pixiRenderer:r},colourClashLayer:o,frontLayer:s}})=>{const{color:{shade:i}}=n,{config:a,state:{position:l},aabb:c}=e,{floorType:d,naturalFootprint:h}=a,f=new C({label:"floorAppearance"}),u=new C({label:"sprites"}),p=I({...c,y:0}),m=I({...c,x:0,y:0}),g=I({...c,x:0}),v=I(c);if(d!=="none"){const x=new C({label:"tiles"}),w=d==="deadly"?`generic${i==="dimmed"?".dark":""}.floor.deadly`:`${a.scenery}${i==="dimmed"?".dark":""}.floor`,M=ie().textures[w];try{ro(w)}catch(ce){throw new Error(`no floor textureId for floorType: ${d}, shade: ${i}`,{cause:ce})}const U=oe(h.position,l),_={x:mr(U.x/L.w),y:mr(U.y/L.w)},B=8,Ge={x:p.x,y:v.y-B,width:g.x-p.x,height:m.y-v.y+2*B},le=oe(be(De(_,{x:.5,y:.5})),{y:c.z},Ge),He=new oa({texture:M,tilePosition:le,...Ge});x.addChild(He),x.addChild(Bc(e,n));const xe=new Y().moveTo(v.x,v.y).lineTo(g.x,g.y).lineTo(g.x,g.y+3).lineTo(m.x,m.y+3).lineTo(p.x,p.y+3).lineTo(p.x,p.y).fill({color:16711680,alpha:1}),Ne=te(r,xe);xe.destroy(),x.addChild(Ne),x.mask=Ne,x.filters=wl(n)??ye;const z=new C({children:[x]});z.filters=H.black1pxFilter,u.addChild(z)}{const x=new C({label:"edges"});if(d==="none"){const _=new Y().moveTo(g.x,g.y+10).lineTo(g.x,g.y+100).lineTo(p.x,p.y+100).lineTo(p.x,p.y+10).lineTo(m.x,m.y+10).fill(0),B=te(r,_);f.addChild(B),s.attach(B),_.destroy()}const w=Math.ceil(c.y/L.w);x.addChild(gr({colourised:t,direction:"right",room:n,times:{y:w},position:{z:c.z},colourSwap:t}));const M=Math.ceil(c.x/L.w);x.addChild(gr({colourised:t,direction:"towards",room:n,times:{x:M},position:{z:c.z},colourSwap:t})),u.addChild(x);const U=Rc(n,e);if(U!==void 0){const _=te(r,U);u.addChild(_),u.mask=_,U.destroy()}if(f.addChild(te(r,u)),u.destroy({children:!0}),!t){const _=_c({xSize:M,ySize:w,y:-c.z+1,room:n});f.addChild(_),o.attach(_)}}return f}),Oc=()=>{const n=new C({label:"joystick"});return n.addChild(y("joystick.stick")),n.addChild(y("joystick.ball")),n},zc=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,fe]]),Fc=({renderContext:{item:{state:{actedOnAt:n,lastPushDirection:e}},room:{roomTime:t}},currentRendering:r})=>{const o=r?.renderProps,s=t===n.roomTime?e:void 0,i=o?.pushDirection;if(!(o===void 0||s!==i))return"no-update";const l=r?.output??Oc(),c=l.getChildAt(1),d=zc.get(s);return c.x=d?.x??0,c.y=d?.y??0,{output:l,renderProps:{pushDirection:s}}},Dc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle","homingBot"],Ec=200,$c=1,Uc=(n,e)=>{const t=is(e);return Math.sin((n+t*2e4)/Ec)*$c},yr=({id:n,config:{which:e},state:t},r,o)=>{if((e==="cyberman"||e==="bubbleRobot")&&t.activated||e==="emperorsGuardian"){const s=o;s[gt].y=-12+Uc(r.roomTime,n)}},jc=({renderContext:{item:n,room:e,general:{paused:t}},currentRendering:r})=>{const{config:o,state:s,id:i}=n,a=r?.renderProps,{activated:l,busyLickingDoughnutsOffFace:c}=s,d=c?pl:l?void 0:Dc.includes(o.which)?fl:void 0;switch(o.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const h=cn(s.facing)??"towards";if(!(a===void 0||l!==a.activated||c!==a.busyLickingDoughnutsOffFace||h!==a.facingXy4))return yr(n,e,r.output),"no-update";const u={facingXy4:h,activated:l,busyLickingDoughnutsOffFace:c};switch(o.which){case"skiHead":return{output:y({textureId:`${o.which}.${o.style}.${h}`,filter:d}),renderProps:u};case"elephantHead":return{output:y({textureId:`elephant.${h}`,filter:d}),renderProps:u};case"turtle":return{output:y(l&&!c?{animationId:`${o.which}.${h}`,filter:d,paused:t,randomiseStartFrame:i}:{textureId:`${o.which}.${h}.1`,filter:d}),renderProps:u};case"cyberman":return{output:s.activated||s.busyLickingDoughnutsOffFace?Ie({top:{textureId:`${o.which}.${h}`,filter:d||void 0},bottom:{...At,paused:t}}):y({textureId:`${o.which}.${h}`,filter:d}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Ie({top:`${o.which}.${h}`,bottom:{animationId:"headlessBase.flash",playOnce:"and-stop"},filter:d}),renderProps:u};default:throw new Error(`unexpected monster ${o}`)}break}case"homingBot":{const h=!Ns(s.vels.walking,fe);return a===void 0||c!==a.busyLickingDoughnutsOffFace||l!==a.activated||h!==a.walking?{filter:d,output:y(l&&!c?{animationId:h?"headlessBase.flash":"headlessBase.scan",filter:d}:{textureId:"headlessBase",filter:d}),renderProps:{activated:l,busyLickingDoughnutsOffFace:c,walking:h}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(a===void 0||c!==a.busyLickingDoughnutsOffFace||l!==a.activated))return yr(n,e,r.output),"no-update";const f={activated:l,busyLickingDoughnutsOffFace:c};switch(o.which){case"helicopterBug":case"dalek":return{output:y(l&&!c?{animationId:o.which,filter:d,paused:t,randomiseStartFrame:i}:{textureId:`${o.which}.1`,filter:d}),renderProps:f};case"bubbleRobot":return{output:Ie({top:{...At,randomiseStartFrame:i,paused:t},filter:d}),renderProps:f};case"emperorsGuardian":return{output:Ie({top:"ball",bottom:{...At,paused:t},filter:d}),renderProps:f};case"emperor":return{output:y({animationId:"bubbles.cold",filter:d,paused:t}),renderProps:f};default:throw new Error(`unexpected monster ${o}`)}break}default:throw new Error(`unexpected monster ${o}`)}},Gc=n=>{const{gameTime:e,lastDiedAt:t}=n.type==="headOverHeels"?n.state.head:n.state;return e-t<ki},Bt=n=>{if(n===void 0)return 0;const{shieldCollectedAt:e,gameTime:t}=n;return e!==null&&e+Ln>t?100-Math.ceil((t-e)/(Ln/100)):0},Hc=n=>n.type==="headOverHeels"?Bt(n.state.head)>0||Bt(n.state.heels)>0:Bt(n.state)>0;var Nc=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const Vc=J.from({vertex:ae,fragment:Nc,name:"oneColour-filter"});class Mn extends K{constructor(e){super({glProgram:Vc,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[r,o,s]=e.toArray();t.uColour[0]=r,t.uColour[1]=o,t.uColour[2]=s}}const en=.02,Wc=({name:n,action:e,facingXy8:t,teleportingPhase:r,gravityZ:o,paused:s})=>{if(e==="death")return{animationId:`${n}.fadeOut`,paused:s};if(r==="out")return{animationId:`${n}.fadeOut`,paused:s};if(r==="in")return{animationId:`${n}.fadeOut`,paused:s};if(e==="moving")return{animationId:`${n}.walking.${t}`,paused:s};if(e==="jumping")return{textureId:o<en?`${n}.walking.${t}.2`:`${n}.walking.${t}.1`};if(e==="falling"){const a=`${n}.falling.${t}`;if(Ui(a))return{textureId:a}}const i=`${n}.idle.${t}`;return yn(i)?{animationId:i,paused:s}:{textureId:`${n}.walking.${t}.2`}},tn=Symbol(),nn=Symbol(),Xc=(n,e)=>{n[tn].removeChildren(),n[tn].addChild(y(Wc(e)))},us=$({pastelBlue:b.pink}),Rt=(n,e,t)=>{const r=new C,o=new C;r[tn]=o,r.addChild(o);const s=y({animationId:e?`shine.${n}InSymbio`:"shine",paused:t,filter:n==="heels"?us:ye,flipX:n==="heels"});r[nn]=s,r.filters=[new ct({color:b[st[n]]}),new ct({color:b.midRed}),new Mn(b[st[n]])];for(const i of r.filters)i.enabled=!1;return r},xr=({gameTime:n,switchedToAt:e},t,r)=>(t==="headOverHeels"||t===r)&&e+Ii>n,qc=n=>{if(!Gc(n))return!1;const{gameTime:e,lastDiedAt:t}=n.type==="headOverHeels"?n.state.head:n.state;return(e-t)%On<On*Mi},Zc=({highlighted:n,flashing:e,shining:t},r)=>{const[o,s,i]=r.filters;o.enabled=n,s.enabled=!n&&t,i.enabled=e},Yc=(n,e,t)=>{e&&!t?n.addChild(n[nn]):!e&&t&&n.removeChild(n[nn])},_t=(n,e,t,r,o,s)=>{t&&Xc(e,{name:n,...r,paused:o}),Zc(r,e),Yc(e,r.shining,s?.shining??!1)},Jc=({renderContext:{item:n,general:{gameState:e,paused:t}},currentRendering:r})=>{const{type:o,state:{action:s,facing:i,teleporting:a,vels:{gravity:{z:l}}}}=n,c=r?.renderProps,d=r?.output,h=$r(i)??"towards",f=e!==void 0&&(n.type==="headOverHeels"?xr(n.state.head,"headOverHeels","headOverHeels"):xr(n.state,n.type,e.currentCharacterName)),u=qc(n),p=Hc(n),m=an(i),g=a?.phase??null,v={action:s,facingXy8:h,teleportingPhase:g,flashing:u,highlighted:f,shining:p,gravityZ:l},x=c===void 0||c.action!==s||c.facingXy8!==h||c.teleportingPhase!==g||c?.gravityZ>en!=l>en;let w;if(o==="headOverHeels"){w=d??sc({top:Rt("head",!0,t),bottom:Rt("heels",!0,t)});const M=w;_t("head",M[gt],x,v,t,c),_t("heels",M[In],x,v,t,c)}else w=d??Rt(o,!1,t),_t(o,w,x,v,t,c);return s==="moving"&&d instanceof Te&&(d.animationSpeed=m*Vs),{output:w,renderProps:v}},Lt=je(Jc),vr=$({pastelBlue:b.moss,metallicBlue:b.moss,pink:b.moss}),Ot=(n,e,t,r)=>{const o=`${n}.idle.${e}`;return yn(o)?{animationId:o,randomiseStartFrame:t,paused:r}:{textureId:`${n}.walking.${e}.2`}},Kc=({renderContext:{item:{id:n,config:{which:e,startDirection:t}},general:{paused:r}},currentRendering:o})=>o?.renderProps===void 0?{output:e==="headOverHeels"?Ie({top:Ot("head",t,n,r),bottom:Ot("heels",t,n,r),filter:vr}):y({...Ot(e,t,n,r),filter:vr}),renderProps:pe}:"no-update",Qc=({renderContext:{item:{state:{vels:{sliding:n}},config:{startingPhase:e}},general:{paused:t}},tickContext:{deltaMS:r},currentRendering:o})=>{const i=(o?.renderProps?.distanceTravelled??0)+on(n)*(t?0:r),l=o?.output??y("spikyBall.1"),d=(Math.floor(i*2/Qe.w)+e)%2+1;return l.texture=ie().textures[`spikyBall.${d}`],{output:l,renderProps:{distanceTravelled:i}}},ed=je(Qc),hs=n=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:r}},tickContext:{lastRenderRoomTime:o},currentRendering:s})=>{const i=s?.renderProps,a=$e(e);let l;return s?.output?l=s?.output:(l=y({animationId:n?"shadowMask.spring.bounce":"spring.bounce",paused:r}),l.loop=!1,l.gotoAndStop(0)),o!==void 0&&t>o&&!a&&!r?l.gotoAndPlay(0):a!==(i?.compressed??!1)&&(a?l.gotoAndStop(1):l.gotoAndStop(0)),{output:l,renderProps:{compressed:a}}},td=je(hs(!1)),nd=je(hs(!0)),rd=({renderContext:{item:{state:{setting:n},config:e}},currentRendering:t})=>{const r=t?.renderProps,o=e.type==="in-store"?Ur(S.getState().gameMenus,e.path)?"right":"left":n;return r===void 0||o!==r.setting?{output:y(`switch.${o}`),renderProps:{setting:o}}:"no-update"},od=({renderContext:{item:n,room:e,general:{paused:t}},currentRendering:r})=>{const{state:{stoodOnBy:o},config:{times:s}}=n,i=r?.renderProps,a=kn(n),l=a&&Ue(o,e).some(mn);return i===void 0||a!==i.activated||l!==i.flashing?{output:l?new C({children:[y({textureId:"teleporter",times:s}),y({animationId:"teleporter.flashing",times:s,paused:t})]}):y({textureId:a?"teleporter":"block.artificial",times:s}),renderProps:{flashing:l,activated:a}}:"no-update"},sd=({state:{stoodOnBy:n,position:e},config:{times:t}},r)=>{const o=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return Ue(n,r).filter(Jr).forEach(({id:s,state:{position:i}})=>{const a=oe(i,e),l={x:Math.floor(a.x/L.w),y:Math.floor(a.y/L.d)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(o[l.x][l.y]=s)}),o},id=(n,e)=>{let t=0,r=1;for(const o of e)for(const s of o)s!==void 0&&n.items[s]?.state.activated&&(t|=r),r<<=1;return t},ad=({renderContext:{item:n,room:e,general:{pixiRenderer:t}},currentRendering:r})=>{const{config:{times:o}}=n,s=r===void 0?sd(n,e):r.renderProps.chargePositions,i=id(e,s);if(!(i!==r?.renderProps.cybermanActivationBitmask))return"no-update";const l=y({textureIdCallback(d,h){const f=s[d][h];return f===void 0||e.items[f]?.state.everActivated?"toaster.off":"toaster.on"},times:o??pe});return{output:Ae(t,l),renderProps:{chargePositions:s,cybermanActivationBitmask:i}}},ld=(n,e,t,r)=>`${n}${r?".dark":""}.wall.${e}.${t}`,cd=F(({renderContext:{general:{pixiRenderer:n},item:{id:e,config:t},room:r}})=>{if(t.direction==="right"||t.direction==="towards")throw new Error(`wall is near: ${e}`);const{direction:o,tiles:s}=t,i=Ee(se(o)),a=new C({label:"wallTiles"}),l=new C({label:"wallAnimations"});for(let d=0;d<t.tiles.length;d++){const h=be({[i]:d});if(a.addChild(y({textureId:ld(r.planet,s[d],o,r.color.shade==="dimmed"),...h,pivot:o==="away"?{x:Qe.w,y:Qe.h}:{x:0,y:Qe.h}})),r.planet==="moonbase"){const f=`moonbase.wall.screen.${s[d]}.away`;yn(f)&&l.addChild(y({animationId:f,randomiseStartFrame:`${e}${d}`,flipX:o==="left",x:h.x+(o==="away"?-8:8),y:h.y-23}))}}const c=new C({label:"wallAppearance"});return c.addChild(te(n,a)),l.children.length>0&&c.addChild(l),c}),dd=$({white:b.lightBeige,highlightBeige:b.lightBeige,midRed:b.redShadow}),ud={head:Lt,heels:Lt,headOverHeels:Lt,doorFrame:gc,doorLegs:mc,monster:jc,floatingText:kc,barrier:F(({renderContext:{item:{config:{axis:n,times:e,disappearing:t}}}})=>y({textureId:`barrier.${n}`,times:e,filter:t?dd:void 0})),deadlyBlock:F(({renderContext:{item:{config:n,id:e},general:{paused:t}}})=>{switch(n.style){case"volcano":return y({animationId:"volcano",times:n.times,randomiseStartFrame:e,paused:t});case"toaster":throw new Error("use the special toaster appearance instead");default:throw n.style,new Error("unknown deadly block style")}}),spikes:Ce("spikes"),slidingDeadly:ed,slidingBlock:F(({renderContext:{item:{config:{style:n}},room:e}})=>y(n==="book"?{textureId:"book.y",filter:ss(e)}:n)),block:rc,switch:rd,button:oc,conveyor:hc,lift:F(({renderContext:{general:{paused:n}}})=>{const e=new C,t={x:Rn.w/2,y:Rn.h};return e.addChild(y({animationId:"lift",pivot:t,paused:n})),e.addChild(y({textureId:"lift.static",pivot:t})),e}),teleporter:od,sceneryCrown:F(({renderContext:{item:{config:{planet:n}}}})=>y({textureId:`crown.${n}`})),pickup:F(({renderContext:{item:{config:n},general:{paused:e}}})=>{if(n.gives==="crown")return y({textureId:`crown.${n.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll"},reincarnation:{animationId:"fish",paused:e}}[n.gives];return y(r)}),moveableDeadly:Ce("fish.1"),charles:ic,joystick:Fc,movingPlatform:Ce("sandwich"),pushableBlock:Ce("stepStool"),portableBlock:F(({renderContext:{item:{config:{style:n}}}})=>y(n)),spring:td,sceneryPlayer:Kc,hushPuppy:Ce("hushPuppy"),bubbles:F(({renderContext:{item:{id:n,config:{style:e}},general:{paused:t}}})=>y({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:n})),firedDoughnut:fc({animationId:"bubbles.doughnut"}),ball:Ce("ball"),floor:Lc,particle:F(({renderContext:{item:{config:{forCharacter:n}},general:{paused:e}}})=>y({animationId:"particle.fade",anchor:{x:.5,y:.5},filter:n==="heels"?us:ye,paused:e}))},hd=n=>{if(n.type==="wall"){const{direction:e}=n.config;return e==="right"||e==="towards"?void 0:cd}return n.type==="deadlyBlock"&&n.config.style==="toaster"?ad:ud[n.type]};class fd{constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(r=>r.output))}#e;#t=new C({label:"CompositeRenderer"});tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}const pd=b.pastelBlue,wr=H.highlightBeige,bd=H.lightBeige,Cr=H.midRed,md=H.white,Sr=new O(pd),zt=new O(b.white),kr=new O(b.midRed),gd=new O(b.lightBeige),yd=new O(b.pastelBlue),Ir={left:"↖",away:"↗",right:"↘",towards:"↙"},Mr=n=>n.type==="switch"&&n.config.type==="in-room"||n.type==="button",Tr=(n,e)=>{switch(n){case"back-forth":switch(e){case"left":return"↖↘";case"right":return"↘↖";case"away":return"↗↙";case"towards":return"↙↗";default:throw new Error("Unexpected startDirection")}case"forwards":switch(e){case"left":return"↖";case"right":return"↘";case"away":return"↗";case"towards":return"↙";default:throw new Error("Unexpected startDirection")}case"clockwise":switch(e){case"left":return"↖↗↘↙";case"right":return"↘↙↖↘";case"away":return"↗↘↙↖";case"towards":return"↙↖↗↘";default:throw new Error("Unexpected startDirection")}case"towards-analogue":return"➡.⬅"}return""},xd=n=>n.type==="monster"&&n.config.activated==="after-player-near";class vd{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output),this.#e()}output=new C({label:"EditorAnnotationsRenderer"});#e(){const e=this.renderContext.item;switch(e.type){case"pickup":if(e.config.gives==="shield"||e.config.gives==="extra-life"||e.config.gives==="jumps"||e.config.gives==="fast"){const t={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"};this.#t({annotationText:t[e.config.gives],yAdj:-16})}break;case"doorFrame":if(e.config.part==="near"){const{rooms:t}=S.getState().levelEditor.campaignInProgress,{config:{toRoom:r,direction:o}}=e;if(r!==Ti){const s=!!t[r],i=Ir[o],a=o==="away"||o==="right"?`${r}${i}`:`${i}${r}`;this.#t({annotationText:a,yAdj:o==="left"||o==="away"?-48:0,filter:s?zt:kr,clickDispatch:s?()=>Nt(r):void 0})}}break;case"teleporter":{const{rooms:t}=S.getState().levelEditor.campaignInProgress,{config:{toRoom:r}}=e,o=!!t[r];this.#t({annotationText:`➡${r}`,yAdj:-12,filter:o?zt:kr,clickDispatch:o?()=>Nt(r):void 0})}break;case"conveyor":{const{config:{direction:t}}=e,r=Ir[t];this.#t({annotationText:r,yAdj:-12})}break;case"movingPlatform":{const{config:{movement:t,startDirection:r}}=e;this.#t({annotationText:Tr(t,r),yAdj:-12})}break;case"monster":{const{config:t}=e;switch(!0){case(t.which==="cyberman"&&t.activated==="after-player-near"):this.#t({annotationText:"wake",filter:gd,yAdj:-12});break;case(t.which==="turtle"||t.which==="skiHead"):this.#t({annotationText:Tr(t.movement,t.startDirection),yAdj:-12});break}}break}}#t({annotationText:e,yAdj:t=0,filter:r=zt,clickDispatch:o}){const{renderContext:{frontLayer:s}}=this,i=ds(new C({label:"EditorAnnotationTextContainer",filters:[r,H.pureBlack]}),e);i.y=t,o!==void 0&&(i.eventMode="static",i.on("click",()=>{S.dispatch(o())}),i.on("mouseover",()=>{S.getState().levelEditor.tool.type==="pointer"&&(S.dispatch(zn(!0)),i.filters=[yd,H.pureBlack])}),i.on("mouseout",()=>{S.dispatch(zn(!1)),i.filters=[r,H.pureBlack]}),i.cursor="pointer"),this.output.addChild(i),s.attach(i)}tick(e){this.#n(),this.childRenderer.tick(e)}#n(){const{renderContext:{room:e}}=this,t=this.renderContext.item,{clickableAnnotationHovered:r}=S.getState().levelEditor,{jsonItemId:o}=t,s=S.getState(),i=Gr(s),a=Pi(s),l=Fe(s),c=o&&i?.jsonItemId===o&&!r,d=o&&a.includes(o),h=()=>o!==void 0&&(ne(e.items).some(f=>f.jsonItemId===i?.jsonItemId&&Mr(f)&&f.config.modifies.some(u=>u.expectType===t.type&&(u.targets===void 0||u.targets.includes(o))))||Mr(t)&&ne(e.items).some(({jsonItemId:f,type:u})=>f!==void 0&&f===i?.jsonItemId&&t.config.modifies.some(p=>p.expectType===u&&(p.targets===void 0||p.targets.includes(f))))||t.type==="charles"&&ne(e.items).some(f=>f.jsonItemId===i?.jsonItemId&&f.type==="joystick"&&f.config.controls.some(u=>u===o))||t.type==="joystick"&&t.config.controls.some(f=>i?.jsonItemId===f));this.output.filters=c&&d?[Sr,l.type==="eyeDropper"?Cr:wr]:c?l.type==="eyeDropper"?Cr:wr:d?Sr:h()?md:xd(t)?bd:ye}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const wd=(n,e,t)=>e.general.editor?new vd(e,t):t;class Cd{constructor(e,t){this.renderContext=e,this.appearance=t,this.output=new C({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const t=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),this.#e.output.destroy({texture:!0,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}class fs extends Cd{}const Pr=(n,e)=>{e.poly([I({}),I({x:n.x}),I({x:n.x,y:n.y}),I({y:n.y})]).poly([I({}),I({z:n.z}),I({y:n.y,z:n.z}),I({y:n.y})]).poly([I({x:n.x}),I({x:n.x,z:n.z}),I(n),I({x:n.x,y:n.y})]).poly([I({z:n.z}),I({x:n.x,z:n.z}),I({x:n.x,y:n.y,z:n.z}),I({y:n.y,z:n.z})])},Ar=(n,e)=>{const t=new Y;return Pr(n,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),Pr(n,t),t.stroke({width:.5,color:e,alpha:1})}),t},Sd={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class kd{constructor(e){this.renderContext=e;const{item:t}=e,r=Sd[t.type]??"rgba(255,255,255)";if(this.#e=new C({label:`ItemBoundingBoxRenderer ${t.id}`}),Ai("portal")(t)){const s=I(t.config.relativePoint);this.#e.addChild(new Y().circle(s.x,s.y,5).stroke(r)),this.#e.addChild(new Y().circle(s.x,s.y,2).fill(r))}if(this.#e.addChild(new Y({label:"objectOrigin"}).circle(0,0,2).fill(r)),this.#e.addChild(Ar(t.aabb,r)),t.renderAabb){const s="rgba(184, 184, 255)",i=Ar(t.renderAabb,s);if(t.renderAabbOffset){const a=I(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let o;this.#e.on("pointerenter",()=>{if(o!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(o=new aa({text:s,style:{fill:r,fontSize:6,fontFamily:"Menlo"}})),o.resolution=4}),this.#e.on("pointerleave",()=>{o!==void 0&&(this.#e.removeChild(o),o=void 0)}),e.frontLayer.attach(this.#e)}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const Id=[new Mn(b.midRed),H.pureBlack],Md=[new Mn(b.moss),H.pureBlack],Td=75;class Pd{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output)}output=new C({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:r}},room:{roomTime:o}}}=this;this.output.filters=o-t<Td?r==="left"?Md:Id:ye,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Ad=(n,e)=>{const{item:t,room:{items:r}}=n;return ne(r).filter(Bi).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new Pd(n,e):e},Bd=(n,e,t,r)=>{const o=1/r;n.x=br(e,o),n.y=br(t,o)},ps=new na;ps.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class Rd{constructor(e,t){this.renderContext=e,this.wrappedRenderer=t,this.output=new C({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#t()}output;#e=new Map;#t(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=I(this.renderContext.item.state.position);Bd(this.output,t.x,t.y,e)}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#t(),this.#s()}#n(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return $t;let r;for(const[o,s]of t)s&&(r||(r=new Set),r.add(o));return r??$t}#r(e,t){const r=new C({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(r),r.setMask({mask:t,inverse:!0}),this.#e.set(e,r),r}#o(e,t){const[r,o]=t.children,s=t.parent;s.removeChild(t),s.addChild(o),t.mask=null,r.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#n();for(const r of this.#e.keys())if(!t.has(r)){const o=this.#e.get(r);if(o)try{this.#o(r,o)}catch(s){throw new Error(`error while destroying masking container ${lt(o)} 
              for our rendering: ${lt(this.output)}`,{cause:s})}}for(const r of t){const o=this.#e.get(r),s=o?.children[0],i=this.renderContext.getItemRenderPipeline(r)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=ps;const l=te(e,i,s,`red mask: ${r}`);i.filters=a,o===void 0&&this.#r(r,l);const c=this.renderContext.room.items[r],d=oe(I(c.state.position),I(this.renderContext.item.state.position));l.x=d.x,l.y=d.y}}destroy(){this.output.destroy({children:!0}),this.wrappedRenderer?.destroy()}}var _d=`#version 300 es
const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=inputColour.a*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}precision mediump float;out vec4 finalColor;in vec2 vTextureCoord;const vec4 transparentBlack=vec4(0.0,0.0,0.0,0.0);uniform sampler2D uTexture;void main(){vec4 cShadowSprite=texture(uTexture,vTextureCoord);float shadowSpriteLum=cShadowSprite.r;float shadowAlpha=(shadowSpriteLum)*cShadowSprite.a*0.6+0.4;float shadowAlphaSnapped=step(0.2,shadowAlpha)*0.4+step(0.7,shadowAlpha)*0.2;float isShadow=step(0.01,cShadowSprite.a);finalColor=mix(transparentBlack,vec4(0.,0.,0.,shadowAlphaSnapped),isShadow);}`;const Ld=J.from({vertex:ae,fragment:_d,name:"palletised-shadow-filter"});class Od extends K{constructor(){super({glProgram:Ld,resources:{}})}}const zd=new Od,Ft=(n,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:r})=>{const o=r?.renderProps,s=cn(t)??"towards";if(!(o===void 0||s!==o.facingXy4))return"no-update";const a=y(s==="left"||s==="away"?`shadowMask.${n}.away`:`shadowMask.${n}.right`);return a.y=-(L.h*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},Fd=({renderContext:{general:{pixiRenderer:n},item:e,room:t},currentRendering:r})=>{const{state:{stoodOnBy:o},config:{times:s}}=e,i=r?.renderProps,a=kn(e),l=a&&Ue(o,t).find(mn)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:Ae(n,yt({textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.artificial"},s)),renderProps:{flashing:l,activated:a}}:"no-update"},Br={lift:N("shadowMask.smallBlock"),conveyor:ee(({direction:n})=>({textureId:"shadowMask.conveyor",flipX:se(n)==="x"})),doorLegs:ee(({direction:n})=>({textureId:n==="right"||n==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:se(n)==="y"})),teleporter:Fd,floor:"no-mask",barrier:ee(({axis:n})=>({textureId:"shadowMask.barrier.y",flipX:n==="x",y:-1})),spring:nd,block:ee(({style:n})=>`shadowMask.${n}`),pushableBlock:N("shadowMask.stepStool"),movingPlatform:N("shadowMask.sandwich"),hushPuppy:N("shadowMask.hushPuppy"),portableBlock:ee(({style:n})=>n==="drum"?"shadowMask.drum":"shadowMask.smallBlock"),slidingBlock:ee(({style:n})=>n==="book"?{textureId:"shadowMask.book",flipX:!0}:"shadowMask.smallRound"),deadlyBlock:ee(({style:n})=>n==="volcano"?"shadowMask.volcano":"shadowMask.toaster"),spikes:N("shadowMask.spikes"),switch:N("shadowMask.switch"),button:N("shadowMask.buttonInGame"),pickup:ee(({gives:n})=>{switch(n){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:N("shadowMask.smallRound"),ball:N("shadowMask.ball"),"monster.dalek":N("shadowMask.dalek"),"monster.turtle":Ft("turtle"),"monster.skiHead":Ft("skiHead"),"monster.homingBot":N("shadowMask.smallRound"),joystick:N("shadowMask.joystick"),charles:Ft("charles",2)},Dd=n=>{switch(n.type){case"monster":return Br[`monster.${n.config.which}`];case"floor":return n.config.floorType==="none"?void 0:"no-mask";default:return Br[n.type]}};dt.add(so,io,ao,lo,co,uo,ho,fo,po,bo,mo,yo,go,xo,vo,wo,Co,So,ko,Io,Mo);const Ed=n=>n.shadowCastTexture!==void 0,Se={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:_i}};class $d{constructor(e,t){if(this.renderContext=e,t!=="no-mask")if(this.#r=new fs(e,t),e.item.shadowOffset===void 0)this.#t.addChild(this.#r.output);else{const r=new C({label:"shadowMaskOffset",children:[this.#r.output],...I(e.item.shadowOffset)});this.#t.addChild(r)}this.#t.addChild(this.#n),this.#e.addChild(this.#t),this.#s||(this.#e.filters=zd,this.#e.blendMode="darken")}#e=new C({label:"ItemShadowRenderer.#filterApplier"});#t=new C({label:"ItemShadowRenderer"});#n=new C({label:"shadows"});#r;#o=new Map;get#s(){return S.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#r===void 0)return;const t=this.#r.output.children.at(0);this.#r.tick(e);const r=this.#r.output.children.at(0);if(r===void 0||!(r instanceof me)){const{item:o}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${o.id}" of type "${o.type}". Have got ${r}`)}t!==r&&(this.#s?this.renderContext.frontLayer.attach(r):this.#t.mask=r)}destroy(){this.#t.destroy(!0),this.#r?.destroy();for(const e of Object.values(this.#o))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:r,general:{pixiRenderer:o},room:s}=this.renderContext,i=t.has(r),a=r.state.position.z+r.aabb.z;Se.state.position.x=r.state.position.x,Se.state.position.y=r.state.position.y,Se.state.position.z=a,Se.aabb.x=r.aabb.x,Se.aabb.y=r.aabb.y;const l=new Set(Ri(Se,s[Kr],d=>d!==r&&Ed(d)&&(d.castsShadowWhileStoodOn||d.state.position.z>r.state.position.z+r.aabb.z)));let c=!1;for(const[d,h]of this.#o)l.has(d)||(this.#n.removeChild(h),h.destroy(),this.#o.delete(d));for(const d of l){c=!0;let h=this.#o.get(d),f=!1;if(!h){const{times:u}=d.config;h=Ae(o,yt(d.shadowCastTexture,u)),h.blendMode="lighten",h.label=d.id,this.#n.addChild(h),this.#o.set(d,h),f=!0}if(f||i||t.has(d)){const u=I({...De(oe(d.state.position,r.state.position),d.shadowOffset??fe),z:r.aabb.z});h.x=u.x,h.y=u.y}}this.#t.visible=c,c&&this.#i(e)}get output(){return this.#e}}const Ud=n=>{const e=Dd(n.item);return e===void 0?void 0:new $d(n,e)};class jd{constructor(e,t){this.renderContext=e,this.componentRenderers=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const Gd=()=>H.moss;class Hd{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output)}output=new C({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;t!==!this.#e&&(this.output.filters=t?[Gd()]:ye),this.#e=t,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Nd=(n,e,t)=>Li(n)?new Hd(e,t):t,Vd=(n,e)=>{e!==void 0&&S.getState().gameMenus.cheatsOn&&(e.eventMode="static",e.on("pointertap",()=>{S.dispatch(qs({item:n,pixiContainer:e}))}))},Wd=n=>{const e=S.getState(),t=Ws(e),r=!Xs(e),{item:o}=n,s=t==="all"||t==="non-wall"&&n.item.type!=="wall",i=[],a=hd(o);let l;if(a!==void 0){l=new fs(n,a);const u=Ad(n,l);i.push(wd(o,n,Nd(o,n,u)))}if(r){const u=Ud(n);u!==void 0&&i.push(u)}s&&i.push(new kd(n));let c;if(i.length===0)c=void 0;else{const u=i.length===1?i[0]:new fd(i,n);c=new Rd(n,u),Vd(o,c.output)}const d=n.general.soundSettings.mute??ln.soundSettings.mute,h=n.general.paused||d?void 0:Vl(n),f=h===void 0?void 0:new Jl(n,h);return{top:new jd(n,{graphics:c,sound:f}),itemAppearanceRenderer:l}};class Xd{constructor(e){this.renderContext=e;const{general:{colourised:t,soundSettings:r}}=e;this.initFilters();const s=r.mute??ln.soundSettings.mute?void 0:k.createGain();this.output={sound:s,graphics:new C({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t||(this.#n=new Hn({sortableChildren:!1}),this.output.graphics.addChild(this.#n)),this.output.graphics.addChild(this.#r)}#e=!1;#t=new C({label:"items",cullableChildren:!0});#n;#r=new Hn({sortableChildren:!1});output;#o=void 0;#s=new Map;#i=new Map;initFilters(){const{general:{colourised:e},room:t}=this.renderContext;this.#t.filters=vl(e,t)}#a=e=>this.#i.get(e);#c(e,t){let r=this.#i.get(t.id);if(r===void 0){r=Wd({...this.renderContext,colourClashLayer:this.#n,frontLayer:this.#r,item:t,zEdges:this.#s,getItemRenderPipeline:this.#a}),this.#i.set(t.id,r);const{graphics:o,sound:s}=r.top.output;if(o&&(this.#t.addChild(o),t.fixedZIndex&&(o.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{r.top.tick(e)}catch(o){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:o})}}#l(e){const{room:t}=this.renderContext,r={...e,lastRenderRoomTime:this.#o},o=new Set,s=a=>{if(o.has(a))return;const l=this.#s.get(a);if(l)for(const[c,d]of l.entries())d&&s(c);this.#c(r,t.items[a]),o.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#i.entries())t.items[a]===void 0&&(l.top.destroy(),this.#i.delete(a),i=!0);i&&this.#u()}#u(){if(this.#n)for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e);for(const e of this.#r.renderLayerChildren)e.parent===null&&this.#r.detach(e)}#h(e){for(let t=0;t<e.length;t++){const r=this.#i.get(e[t]);if(r===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const o=r.top.output.graphics;if(!o)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);o.zIndex=t}}get#d(){return this.#o!==void 0}tick(e){const t=this.#d?e:{...e,movedItems:new Set(ne(this.renderContext.room.items))},{renderContext:{room:r}}=this;Go(r.items,r[Kr],t.movedItems,this.#s);const o=Eo(this.#s);this.#l(t),(!this.#d||t.movedItems.size>0)&&this.#h(o),this.#o=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#i.forEach(e=>{e.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const qd=(n,e)=>({displaySettings:{emulatedResolution:"amigaLowResPal",showBoundingBoxes:e},soundSettings:{mute:!0},pixiRenderer:n,gameState:void 0,paused:!1,colourised:!0,upscale:rn(S.getState()),editor:!0}),Rr=(n,e,t)=>new Xd({room:n,general:qd(e,t)}),Zd=()=>{const{renderer:n}=ge(),e=Zs();if(!n)throw new Error("this should never be falsey (typescript violation)");const t=Qr(),[r,o]=A.useState(()=>Rr(t,n,e));return A.useEffect(()=>{const s=Rr(t,n,e);return o(s),()=>{s.destroy()}},[t,n,e]),r},Yd=n=>{const e=Qr(),t=ge();A.useEffect(()=>{const r=({deltaMS:o})=>{if(n.destroyed)return;n.renderContext.room!==e&&console.warn("room renderer does not have the current room");const s=new Set(Vt(e.items));e.roomTime+=o,n.tick({deltaMS:o,movedItems:s}),t.render()};return de.shared.add(r),()=>{de.shared.remove(r)}},[n,e,t])};Et.defaultOptions.scaleMode="nearest";const Jd=()=>{const n=Zd(),[e,t]=A.useState(null),[r,o]=A.useState(null),[s,i]=A.useState("amigaLowResPal"),a=Ja();return la(s,r??void 0),Za(),Va(n),Yd(n),ja(e),Na(e),Xa(),qa(),Wa(r,e),G.jsxs("div",{className:"w-full h-full relative",children:[G.jsx(Ha,{selectedResolution:s,onResolutionChange:i}),G.jsx("div",{ref:o,className:`w-full h-full ${a} scale-editor bg-editor-checkerboard overflow-scroll scrollbar scrollbar-w-1 scrollbar-track-pureBlack scrollbar-thumb-metallicBlue`,children:G.jsx("div",{style:{transform:ca(),transformOrigin:"center center"},ref:t,tabIndex:1,className:"focus-visible:outline-none"})})]})},Kd=()=>G.jsx(Ba,{children:G.jsx(Jd,{})}),ou=Object.freeze(Object.defineProperty({__proto__:null,default:Kd},Symbol.toStringTag,{value:"Module"}));export{Bo as A,To as C,mt as R,Zi as S,Ro as V,ea as a,ou as b,qi as u};
