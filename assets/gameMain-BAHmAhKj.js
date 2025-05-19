const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-DmzT3Tgb.js","assets/App-tcL_WDjv.js","assets/index-DQZP8GcG.js","assets/index-aN9c_ebK.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-Dw4Zrq-y.js","assets/Graphics-BPRBqXXW.js","assets/changeCharacterRoom-BFlAefrE.js","assets/WebGLRenderer-BpN313rI.js"])))=>i.map(i=>d[i]);
import{bb as ji,bc as fr,bd as qi,as as Wi,aw as Ce,ax as G,ak as pr,at as we,a3 as S,a8 as Ut,a6 as Ji,a9 as b,a as it,v as zt,aM as y,ac as gn,aE as pe,a4 as Qe,a5 as Zi,V as Yi,be as Ki,bf as Qi,bg as es,aj as ts,bh as j,bi as no,X as k,bj as ns,bk as le,bl as O,bm as Fn,h as $e,Z as w,o as H,l as P,bn as os,bo as rs,bp as is,r as D,K as Ue,bq as ss,br as Rn,bs as mr,bt as as,bu as ls,bv as cs,bw as _t,T as W,bx as Mn,by as T,bz as de,bA as Nt,c as dt,bB as At,bC as us,bD as ds,bE as hs,bF as oo,bG as fs,bH as ps,bI as bn,i as ce,bJ as st,e as Ne,bK as Ht,bL as ms,w as U,bM as Gt,bN as me,bO as ht,bP as Dn,u as J,bQ as Te,bR as E,bS as zn,H as gr,bT as Ln,bU as Ee,bV as En,bW as He,bX as tt,bY as $n,bZ as gs,b_ as bs,b6 as he,b$ as vs,c0 as ys,U as at,c1 as Ft,n as br,c2 as ke,c3 as Un,c4 as xs,c5 as vr,c6 as yr,c7 as xr,c8 as Vt,c9 as ro,ca as ws,I as Ge,cb as Ve,cc as Xt,x as Ie,cd as vn,ce as Ss,d as Cs,cf as Ts,cg as ks,N as Xe,ch as Is,ci as Ps,cj as Os,ck as yn,cl as Bs,cm as _s,cn as bt,q as Nn,co as As,cp as Fs,cq as Rs,y as Pe,cr as wr,P as Sr,cs as io,ct as Cr,t as ge,cu as Hn,E as Tr,j as kr,C as Ms,b7 as je,cv as Qt,cw as vt,cx as Ds,cy as zs,cz as We,cA as so,cB as Ls,cC as Es,cD as $s,cE as Us,cF as Ns,cG as Hs,cH as Gs,cI as Vs,cJ as Xs,cK as js,cL as ao,Y as lo,F as Ir,cM as Pr,ba as Or,R as Br,S as qs,O as co,cN as Ws,cO as Js,cP as Zs,cQ as Ys,cR as Ks,cS as Qs,cT as ea,cU as x,cV as xn,cW as ft,cX as en,W as uo,cY as ta,cZ as na,c_ as oa,a$ as ra,aC as Me,c$ as ia,d0 as sa,d1 as aa,d2 as la,d3 as ca,d4 as ua,d5 as da,d6 as ha,d7 as fa,d8 as ho,d9 as pa,_ as fo,da as ma}from"./App-tcL_WDjv.js";import{f as wn,c as Gn,m as jt,a as Vn,b as _r,r as ga,o as ba}from"./changeCharacterRoom-BFlAefrE.js";import{S as va,G as q}from"./Graphics-BPRBqXXW.js";import{g as Ar,_ as po}from"./index-DQZP8GcG.js";var yt={},mo;function ya(){if(mo)return yt;mo=1;var t=ji(),e=t.mark(i),n=fr(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var l,a,c,u,d,h,f=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(l=f.length,a=new Array(l),c=0;c<l;c++)a[c]=f[c];u=0,d=a;case 2:if(!(u<d.length)){v.next=8;break}return h=d[u],v.delegateYield(r(h),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}yt.__concat=i;var s=o(i);return yt.concat=s,yt}var xt={},go;function xa(){if(go)return xt;go=1;var t=fr(),e=t.iterableCurry,n=qi(),o=n.__firstOr,r=Symbol("none");function i(l){return o(l,r)===r}xt.__isEmpty=i;var s=e(i,{reduces:!0});return xt.isEmpty=s,xt}var tn,bo;function wa(){return bo||(bo=1,tn=ya().concat),tn}var Sa=wa();const vo=Ar(Sa);var nn,yo;function Ca(){return yo||(yo=1,nn=xa().isEmpty),nn}var Ta=Ca();const ka=Ar(Ta),Fr=class Sn extends Wi{constructor(e){e={...Sn.defaultOptions,...e},super(e),this.enabled=!0,this._state=va.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=Ce.from(n)),o&&(s=G.from(o)),new Sn({gpuProgram:i,glProgram:s,...r})}};Fr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let K=Fr;var Ia=`
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
`,Pa=`in vec2 aPosition;
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
`,Oa=`
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
}`;class B extends K{constructor(e){const n=e.gpu,o=xo({source:Oa,...n}),r=Ce.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=xo({source:Ia,...i}),l=G.from({vertex:Pa,fragment:s}),a=new pr({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:l,blendRequired:!0,resources:{blendUniforms:a,uBackTexture:we.EMPTY}})}}function xo(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const Xn=`
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
    `,jn=`
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
	`;class Rr extends B{constructor(){super({gl:{functions:`
                ${Xn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${jn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Rr.extension={name:"color",type:S.BlendMode};class Mr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Mr.extension={name:"color-burn",type:S.BlendMode};class Dr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Dr.extension={name:"color-dodge",type:S.BlendMode};class zr extends B{constructor(){super({gl:{functions:`
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
                `}})}}zr.extension={name:"darken",type:S.BlendMode};class Lr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Lr.extension={name:"difference",type:S.BlendMode};class Er extends B{constructor(){super({gl:{functions:`
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
            `}})}}Er.extension={name:"divide",type:S.BlendMode};class $r extends B{constructor(){super({gl:{functions:`
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
            `}})}}$r.extension={name:"exclusion",type:S.BlendMode};class Ur extends B{constructor(){super({gl:{functions:`
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
                `}})}}Ur.extension={name:"hard-light",type:S.BlendMode};class Nr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Nr.extension={name:"hard-mix",type:S.BlendMode};class Hr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Hr.extension={name:"lighten",type:S.BlendMode};class Gr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Gr.extension={name:"linear-burn",type:S.BlendMode};class Vr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Vr.extension={name:"linear-dodge",type:S.BlendMode};class Xr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Xr.extension={name:"linear-light",type:S.BlendMode};class jr extends B{constructor(){super({gl:{functions:`
                ${Xn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${jn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}jr.extension={name:"luminosity",type:S.BlendMode};class qr extends B{constructor(){super({gl:{functions:`
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
            `}})}}qr.extension={name:"negation",type:S.BlendMode};class Wr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Wr.extension={name:"overlay",type:S.BlendMode};class Jr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Jr.extension={name:"pin-light",type:S.BlendMode};class Zr extends B{constructor(){super({gl:{functions:`
                ${Xn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${jn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Zr.extension={name:"saturation",type:S.BlendMode};class Yr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Yr.extension={name:"soft-light",type:S.BlendMode};class Kr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Kr.extension={name:"subtract",type:S.BlendMode};class Qr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Qr.extension={name:"vivid-light",type:S.BlendMode};const Cn=[];Ut.handleByNamedList(S.Environment,Cn);async function Ba(t){if(!t)for(let e=0;e<Cn.length;e++){const n=Cn[e];if(n.value.test()){await n.value.load();return}}}let Je;function _a(){if(typeof Je=="boolean")return Je;try{Je=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Je=!1}return Je}var ei=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(ei||{});class Aa{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,l,a){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,i,s,l,a);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Fa=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],ti=class ni extends Ji{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Fa,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ba(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...ni.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(it(zt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:y.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=ei.ALL);const{clear:o,clearColor:r,target:i}=e;y.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Aa(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,l=o[s];this.renderPipes[s]=new i(this,l?new l:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!_a())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};ti.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let oi=ti,wt;function Ra(t){return wt!==void 0||(wt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??oi.defaultOptions.failIfMajorPerformanceCaveat};try{if(!gn.get().getWebGLRenderingContext())return!1;let o=gn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),wt}let St;async function Ma(t={}){return St!==void 0||(St=await(async()=>{const e=gn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),St}const wo=["webgl","webgpu","canvas"];async function Da(t){let e=[];t.preference?(e.push(t.preference),wo.forEach(i=>{i!==t.preference&&e.push(i)})):e=wo.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Ma()){const{WebGPURenderer:l}=await po(async()=>{const{WebGPURenderer:a}=await import("./WebGPURenderer-DmzT3Tgb.js");return{WebGPURenderer:a}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=l,o={...t,...t.webgpu};break}else if(s==="webgl"&&Ra(t.failIfMajorPerformanceCaveat??oi.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:l}=await po(async()=>{const{WebGLRenderer:a}=await import("./WebGLRenderer-BpN313rI.js");return{WebGLRenderer:a}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=l,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const ri="8.8.1";class ii{static init(){globalThis.__PIXI_APP_INIT__?.(this,ri)}static destroy(){}}ii.extension=S.Application;class za{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,ri)}destroy(){this._renderer=null}}za.extension={type:[S.WebGLSystem,S.WebGPUSystem],name:"initHook",priority:-10};const si=class Tn{constructor(...e){this.stage=new b,e[0]!==void 0&&it(zt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Da(e),Tn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return it(zt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=Tn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};si._plugins=[];let ai=si;Ut.handleByList(S.Application,ai._plugins);Ut.add(ii);var La=`in vec2 aPosition;
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
`,Ea=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,So=`struct GlobalFilterUniforms {
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
}`;const li=class ci extends K{constructor(e){e={...ci.defaultOptions,...e};const n=Ce.from({vertex:{source:So,entryPoint:"mainVertex"},fragment:{source:So,entryPoint:"mainFragment"}}),o=G.from({vertex:La,fragment:Ea,name:"alpha-filter"}),{alpha:r,...i}=e,s=new pr({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};li.defaultOptions={alpha:1};let $a=li;class lt extends pe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:l=null,onFrameChange:a=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof we?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=l,this.onFrameChange=a,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Qe.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Qe.shared.add(this.update,this,Zi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(we.from(e[o]));return new lt(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(we.from(e[o]));return new lt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof we)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Qe.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Qe.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Ua extends Yi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:l,height:a,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Ki({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,l!==void 0&&(this.width=l),a!==void 0&&(this.height=a)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Na(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(it(zt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Ha extends Ua{constructor(...e){const n=Na(e,"Text");super(n,Qi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=es.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class qn extends we{static create(e){return new qn({source:new ts(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Se=t=>{const[e,n,o]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:o/2})},V={original:new y(j.zxWhite),basic:g.white,dimmed:g.lightGrey},X={original:new y(j.zxYellow),basic:g.midRed,dimmed:g.redShadow},Q={original:new y(j.zxMagenta),basic:g.pink,dimmed:Se(g.pink)},R={original:new y(j.zxCyan),basic:g.pastelBlue,dimmed:Se(g.pastelBlue)},ee={original:new y(j.zxGreen),basic:g.moss,dimmed:Se(g.moss)},Wn={white:{basic:{main:V,edges:{towards:R,right:X},hud:{lives:X,dimmed:Q,icons:R}},dimmed:{main:V,edges:{towards:ee,right:R},hud:{lives:X,dimmed:Q,icons:R}}},yellow:{basic:{main:X,edges:{towards:ee,right:V},hud:{lives:R,dimmed:Q,icons:ee}},dimmed:{main:X,edges:{towards:R,right:R},hud:{lives:R,dimmed:Q,icons:ee}}},magenta:{basic:{main:Q,edges:{towards:ee,right:R},hud:{lives:V,dimmed:R,icons:X}},dimmed:{main:Q,edges:{towards:ee,right:R},hud:{lives:V,dimmed:R,icons:X}}},cyan:{basic:{main:R,edges:{towards:Q,right:V},hud:{lives:V,dimmed:ee,icons:X}},dimmed:{main:R,edges:{towards:Q,right:V},hud:{lives:V,dimmed:ee,icons:X}}},green:{basic:{main:ee,edges:{towards:R,right:X},hud:{lives:V,dimmed:Q,icons:R}},dimmed:{main:ee,edges:{towards:R,right:X},hud:{lives:V,dimmed:Q,icons:R}}}},Jn=t=>Wn[t.hue][t.shade],De={head:g.pastelBlue,heels:g.pink},Rt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+no>n?100-Math.ceil((n-e)/(no/100)):0},ui=t=>t.type==="headOverHeels"?Rt(t.state.head)>0||Rt(t.state.heels)>0:Rt(t.state)>0,Zn=t=>{const e=100*k.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/k.w):0},Ga={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},pt=`in vec2 aPosition;
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
`,Va=`in vec2 vTextureCoord;
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
`;class be extends K{constructor(e){const n=Object.keys(e).length,o=G.from({vertex:pt,fragment:Va.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],l)=>{g[i].toArray().forEach((a,c)=>{r.uOriginal[l*3+c]=a}),s.toArray().forEach((a,c)=>{r.uReplacement[l*3+c]=a})})}}const Xa=`precision mediump float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uTargetColor;

// colours are floats so check if they're very close rather than exactly equal:
bool colorsEffectivelyEqual(vec3 color1, vec3 color2) {

    return distance(color1, color2) < 0.05;
}

vec3 black3 = vec3(0, 0, 0);
vec4 black4 = vec4(0, 0, 0, 1);

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if(c.a == 0.0) {
        finalColor = c;
        return;
    }

    if(colorsEffectivelyEqual(c.rgb, black3)) {
        finalColor = black4;
    } else {
        finalColor = vec4(uTargetColor, 1);
    }
}
`;class $ extends K{uniforms;constructor(e="white"){const n=G.from({vertex:pt,fragment:Xa,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ja=`precision mediump float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;

// colours are floats so check if they're very close rather than exactly equal:
bool colorsEffectivelyEqual(vec3 color1, vec3 color2) {

    return distance(color1, color2) < 0.05;
}

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    finalColor = vec4(c.rgb * 0.5, c.a);
}
`;class qa extends K{constructor(){const e=G.from({vertex:pt,fragment:ja,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const di=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),hi=t=>di(Wn[t.color.hue][t.color.shade].main),fi=t=>new be({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&hi(t)}),Wa=new be({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Ja=t=>new be({replaceLight:t,replaceDark:Se(t)}),kn=(t,e,n)=>n?new be(di(Wn[t.color.hue][t.color.shade].edges[e])):new $(Jn(t.color).edges[e].original),ae=t=>new be(hi(t)),Co=new qa,Z=ns,Za=new be(Ga),To={x:.5,y:1},ko=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),In=t=>{if(typeof t=="string")return In({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:l,label:a}=t;let c;if(ko(t)?c=Ya(t):c=new pe(le().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...l},d=new b({label:a??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let m=1;m<=u.z;m++){const v={...t,textureId:t.textureId??t.textureIdCallback?.(h-1,f-1,m-1),label:`(${h},${f},${m})`};delete v.times;const I=In(v),A=O({x:h-1,y:f-1,z:m-1});I.x+=A.x,I.y+=+A.y,d.addChild(I)}return d}if(e===void 0&&o===void 0)if(ko(t))c.anchor=To;else{const u=le().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=To}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),a!==void 0&&(c.label=a),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=In;function Ya({animationId:t,reverse:e,playOnce:n,paused:o,randomiseStartFrame:r}){const i=le().animations[t],l=(o?[i[0]]:i).map(c=>({texture:c,time:Fn}));e&&l.reverse();const a=new lt(l);return a.animationSpeed=$e.animations[t].animationSpeed,a.gotoAndPlay(r?Math.floor(Math.random()*l.length):0),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Ka=`#version 300 es

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
`;class ct extends K{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=G.from({vertex:pt,fragment:Ka,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,l,a]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=l,i.uOutline[2]=a,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ne=new ct({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),nt=new $,Io=new $,Yn=new $,Po=new $(g.moss),ot=new $,te=[nt,ne],Qa=[ot,ne],el=[ne,Yn],Ct={original:[ne,ot],colourised:{head:{active:[ne,new $(De.head)],inactive:[ne,new $(Se(De.head))]},heels:{active:[ne,new $(De.heels)],inactive:[ne,new $(Se(De.heels))]}}},Oe=14,tl=2,nl=Math.cos(30*(Math.PI/180)),ol=40;class rl{constructor(e){this.renderContext=e;const{inputDirectionMode:n,general:{colourised:o}}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Oe,y:-14,filter:te}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Oe,y:Oe,filter:te}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Oe,filter:te}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:te}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Oe*Math.SQRT2,filter:te}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Oe*Math.SQRT2,filter:te}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:te}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:te})}:{}},this.output.addChild(this.#e),this.output.addChild(new q().circle(0,0,ol).fill("#00000000"));for(const r of H(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=o?Z:nt}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=P};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=os(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:l,height:a}=this.output.getLocalBounds(),c=(i/n-o)/(l/2),u=(s/n-r)/(a/2),d=rs({x:-c,y:-u}),h=is(d,nl),f=D(h,tl);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Ue(e)>ss?Rn(e):void 0;for(const[r,i]of mr(this.arrowSprites))i.filters=r===o?Qa:te}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Pn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:j.zxBlue,fire:j.zxYellow,carry:j.zxGreen,carryAndJump:j.zxRed,menu:j.zxWhite,map:j.zxWhite}};function Lt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*il(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=as(e);let o=0;for(const r of e){const i=`hud.char.${cs(r)}`;try{ls(i)}catch(s){throw new Error(`no texture id for char "${r}": ${s.message}`,{cause:s})}yield p({textureId:i,x:(o+.5-n/2)*_t.w}),o++}}const ie=(t,e)=>{t.removeChildren();try{Lt(il(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},et=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?el:Yn,scale:{x:1,y:t?2:1}}),Et=Symbol(),pi=Symbol(),mi=Symbol(),Tt=({colourised:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Ja(Pn.colourised[e]):o.filters=new $(Pn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[pi]=r,o[Et]=i,o[mi]=n,o},Ze=(t,...e)=>{t[Et].removeChildren();for(const n of e)n!==void 0&&t[Et].addChild(n)},kt=(t,e)=>{t[pi].texture=le().textures[e?"button.pressed":"button"],t[mi].y=e?1:0},Oo=(t,e,n)=>{n&&(t[Et].filters=e?fi():Z)},Bo=({which:t},e,n)=>{const o=ie(new b,n);return o.filters=new be({white:e?Se(Pn.colourised[t]):g.pureBlack}),o};class gi{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new b({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&this.output.removeChild(this.#e.output),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const sl=(t,e,n)=>{const r=le().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&le().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},bi=(t,e)=>{const n=e.getLocalBounds(),o=qn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new pe({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},qt=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof pe?r:bi(t,r)},Be=t=>M(({renderContext:{item:e}})=>Mn(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),oe=t=>M(({renderContext:{item:e,general:{pixiRenderer:n}}})=>{if(Mn(e))return qt(n,t,e.config.times);{const o=p(t);return o instanceof pe?o:bi(n,o)}}),M=t=>({renderContext:e,currentRendering:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:W}:"no-update",re=t=>({renderContext:{general:{pixiRenderer:e},item:n},currentRendering:o})=>{if(o===void 0){const r=Mn(n)?n.config.times:void 0,i={output:qt(e,t(n.config),r),renderProps:W};return r&&(i.output.y-=((r.z??1)-1)*k.h),i}else return"no-update"};function*al({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Nt(t),i=r==="y"?1:16;function*s(l){if(e){if(n!==0){const a=p({textureId:`generic.door.floatingThreshold.${r}`,...At(l,{y:-12*n})});a.filters=kn(o,r==="x"?"towards":"right",!0),yield a}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...At(l,{})});for(let a=1;a<n;a++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...At(l,{y:-a*k.h})})}}yield*s(O({...de,[r]:1})),yield*s(de),e||(yield p({pivot:{x:16,y:k.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...O({...de,[r]:1})}))}const vi=(t,e)=>{const n=Nt(t),o=dt(n),r=8;return t==="towards"||t==="right"?T({[o]:e[o]-r}):de},ll=M(({renderContext:{item:t,room:e}})=>Lt(al(t,e),new b({filters:ae(e),...vi(t.config.direction,t.aabb)}))),cl=M(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,general:{gameState:{campaign:i}}}})=>{const s=Nt(t),l=i.rooms[n];return p({textureId:sl(r,s,e),filter:ae(l),...vi(t,o)})}),on={animationId:"bubbles.cold"},ze=({top:t,bottom:e="headlessBase",filter:n})=>{const o=new b({filters:n}),r=p(e);o.addChild(r);const i=p(t);return i.y=-12,o.addChild(i),o[Wt]=i,o[Kn]=r,o},Wt=Symbol(),Kn=Symbol(),ul=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[Wt]=t,n[Kn]=e,n},dl=`#version 300 es

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
`;class $t extends K{constructor(e){const n=G.from({vertex:pt,fragment:dl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const rt=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<us},Jt=t=>t,On=.02,hl=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(o==="out")return{animationId:`${t}.fadeOut`,paused:i};if(o==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:r<On?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`};if(e==="falling"){const l=`${t}.falling.${n}`;if(ps(l))return{textureId:l}}const s=`${t}.idle.${n}`;return bn(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},Bn=Symbol(),_n=Symbol(),fl=(t,e)=>{t[Bn].removeChildren(),t[Bn].addChild(p(hl(e)))},yi=new be({pastelBlue:g.pink}),rn=(t,e,n)=>{const o=new b,r=new b;o[Bn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?yi:Z,flipX:t==="heels"});return o[_n]=i,o},_o=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+hs>t,pl=t=>{if(!rt(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%oo<oo*fs},Ao=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Fo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?Z:t.filters},ml=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Ao(r,new ct({outlineColor:De[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Fo(r,ct);const s=o?.flashing??!1;n&&!s?Ao(r,new $t(De[t])):!n&&s&&Fo(r,$t)},gl=(t,e,n)=>{e&&!n?t.addChild(t[_n]):!e&&n&&t.removeChild(t[_n])},sn=(t,e,n,o,r,i)=>{n&&fl(e,{name:t,...o,paused:r}),ml(t,o,i,e),gl(e,o.shining,i?.shining??!1)},bl=({renderContext:{item:t,general:{gameState:e,paused:n}},currentRendering:o})=>{const{type:r,state:{action:i,facing:s,teleporting:l,vels:{gravity:{z:a}}}}=t,c=o?.renderProps,u=o?.output,d=Rn(s)??"towards",h=t.type==="headOverHeels"?_o(t.state.head,"headOverHeels","headOverHeels"):_o(t.state,t.type,e.currentCharacterName),f=pl(t),m=ui(t),v=Ue(s),I=l?.phase??null,A={action:i,facingXy8:d,teleportingPhase:I,flashing:f,highlighted:h,shining:m,gravityZ:a},C=c===void 0||c.action!==i||c.facingXy8!==d||c.teleportingPhase!==I||c?.gravityZ>On!=a>On;let _;if(r==="headOverHeels"){_=u??ul({top:rn("head",!0,n),bottom:rn("heels",!0,n)});const F=_;sn("head",F[Wt],C,A,n,c),sn("heels",F[Kn],C,A,n,c)}else _=u??rn(r,!1,n),sn(r,_,C,A,n,c);return i==="moving"&&u instanceof lt&&(u.animationSpeed=v*ds),{output:_,renderProps:A}},an=Jt(bl),vl=(t,e)=>{const n=([s,l])=>l.config.direction==="away"||l.config.direction==="left",o=new b({label:"floorOverdraws",...O({x:-e.x,y:-e.y})}),r=Lt(ce(st(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:l,direction:a},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...O(c),times:l,anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"floorOverdraws"})),i=Lt(ce(st(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:l},position:a}])=>a.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...O(At(a,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:l==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...O({...a,z:0}),times:{[dt(Ne(l))]:2},anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},yl=t=>[...ce(H(t.items)).filter(e=>e.type==="wall").filter(e=>Ne(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],xl=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},wl=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new q().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(O),!0).fill(0),Sl=M(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:l,edgeRightX:a}=Ht(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:h},roomJson:f}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const C=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,_=new b;for(let N=-1;N<=r+2;N++)for(let ve=N%2-1;ve<=i+2;ve+=2)_.addChild(ms({x:N+(s.right?-.5:0),y:ve+(s.towards?-.5:0)},p({textureId:C})));_.addChild(vl(f,{x:n,y:o}));const F=new q().poly([de,O({x:c,y:0}),O({x:c,y:u}),O({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});_.addChild(F),_.filters=ae(t),_.mask=F,m.addChild(_)}const v=yl(f),I=new q().poly([{x:l,y:16},{x:l,y:-999},{x:a,y:-999},{x:a,y:16}],!0).fill(16776960);m.addChild(I);const A=xl(v);if(A!==void 0)try{const C=wl({extraWallRanges:A,blockXMin:n,blockYMin:o});m.addChild(C)}catch(C){throw new Error(`could not create floor overdraw for extra walls ${JSON.stringify(A,null,2)}`,{cause:C})}return m.mask=I,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Cl=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=O({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return ce(st(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,l])=>{const{config:{direction:a},position:c}=l,u=a==="right"&&c.x===0,d=a==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:s,textureId:`floorEdge.${a}`,...O(h),times:l.type==="wall"?l.config.times:{[dt(Ne(a))]:2}});i[a].addChild(f),a==="right"&&c.y===0&&e<0&&i[a].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${a}`,...O(U(h,{y:-.5}))})),a==="towards"&&c.x===0&&t<0&&i[a].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${a}`,...O(U(h,{x:-.5}))}))}),i},Tl=M(({renderContext:{general:{colourised:t},room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:l}=Ht(e.roomJson),a=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new q({label:"overDrawToHideFallenItems"}).poly([O({x:a,y:0}),O({x:0,y:0}),O({x:0,y:c}),{...O({x:0,y:c}),y:999},{...O({x:a,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=Cl({blockXMin:n,blockYMin:o},e.roomJson);h.filters=kn(e,"towards",t),f.filters=kn(e,"right",t),u.addChild(h),u.addChild(f);const m=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),kl=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Il=t=>{let e=2166136261;const n=t.length;for(let o=Math.max(0,n-9);o<n;o++)e^=t.charCodeAt(o),e=Math.imul(e,1540483477),e^=e>>>15;return(e>>>0)/4294967295},Pl=200,Ol=1,Bl=(t,e)=>{const n=Il(e);return Math.sin((t+n*2e4)/Pl)*Ol},Ro=({id:t,config:{which:e},state:n},o,r)=>{if((e==="cyberman"||e==="bubbleRobot")&&n.activated){const i=r;i[Wt].y=-12+Bl(o.roomTime,t)}},_l=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:o})=>{const{config:r,state:i}=t,s=o?.renderProps,{activated:l,busyLickingDoughnutsOffFace:a}=i,c=a?Wa:l?void 0:kl.includes(r.which)?fi(e):void 0;switch(r.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const u=Gt(i.facing)??"towards";if(!(s===void 0||l!==s.activated||a!==s.busyLickingDoughnutsOffFace||u!==s.facingXy4))return Ro(t,e,o.output),"no-update";const h={facingXy4:u,activated:l,busyLickingDoughnutsOffFace:a};switch(r.which){case"skiHead":return{output:p({textureId:`${r.which}.${r.style}.${u}`,filter:c}),renderProps:h};case"elephantHead":return{output:p({textureId:`elephant.${u}`,filter:c}),renderProps:h};case"turtle":return{output:p(l&&!a?{animationId:`${r.which}.${u}`,filter:c,paused:n}:{textureId:`${r.which}.${u}.1`,filter:c}),renderProps:h};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?ze({top:{textureId:`${r.which}.${u}`,filter:c||ae(e)},bottom:{...on,paused:n}}):p({textureId:`${r.which}.${u}`,filter:c}),renderProps:h};case"computerBot":case"elephant":case"monkey":return{output:ze({top:`${r.which}.${u}`,filter:c}),renderProps:h};default:throw new Error(`unexpected monster ${r}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(s===void 0||a!==s.busyLickingDoughnutsOffFace||l!==s.activated))return Ro(t,e,o.output),"no-update";const d={activated:l,busyLickingDoughnutsOffFace:a};switch(r.which){case"helicopterBug":case"dalek":return{output:p(l&&!a?{animationId:r.which,filter:c,paused:n}:{textureId:`${r.which}.1`,filter:c}),renderProps:d};case"homingBot":return{filter:c,output:p({animationId:"headlessBase.scan",filter:c}),renderProps:d};case"bubbleRobot":return{output:ze({top:{...on,paused:n},filter:c}),renderProps:d};case"emperorsGuardian":return{output:ze({top:"ball",bottom:{...on,paused:n},filter:c}),renderProps:d};case"emperor":return{output:p({animationId:"bubbles.cold",filter:c,paused:n}),renderProps:d};default:throw new Error(`unexpected monster ${r}`)}break}default:throw new Error(`unexpected monster ${r}`)}},Al=me.floatingText,Fl=12,Mo=k.h*3,Do=[g.shadow,g.midGrey,g.redShadow,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],zo=[...Do,...new Array(20).fill(g.white),...Do.toReversed()],Rl=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},general:{displaySettings:{uncolourised:o}}},currentRendering:r})=>{const i=r?.output;let s;const a=(n-e)*Al;if(i===void 0){s=new b({filters:new ct({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=ie(new b({label:u,y:c*Fl,filters:o?Z:new $(g.pink)}),u.toUpperCase());s.addChild(d)}}else s=i;for(let c=0;c<t.length;c++){const u=s.children[c],[d]=u.filters,h=a+c*-12,f=h>0&&h<Mo;if(u.visible=f,f&&d){const m=Math.floor(h/Mo*zo.length);d.targetColor=zo[m]}}return s.y=-a,{output:s,renderProps:W}},mt=t=>{for(const e in t)return!0;return!1},Lo=500,Ml=$e.animations["conveyor.x"].animationSpeed,Eo=$e.animations["conveyor.x"].length,Dl=t=>1-(1-t)**2,zl=(t,e)=>{for(let n=0;n<t.children.length;n++){const o=t.children[n],r=n%Eo;o.gotoAndStop(e?Eo-r-1:r)}return t},Ll=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:o}},currentRendering:r})=>{const i=r?.renderProps,s=mt(n),l=(!s&&i?.moving?o:i?.roomTimeStoppedMoving)??ht,a=Ne(t),c=r?.output??zl(p({animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),u=s?0:Math.min(o-l,Lo),d=Math.max(0,1-u/Lo);for(const h of c.children)if(d===0)h.stop();else{const f=Ml*Dl(d);h.play(),h.animationSpeed=f}return{output:c,renderProps:{moving:s,roomTimeStoppedMoving:l}}},El=Jt(Ll),Y={movementType:"steady"},qe=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Dn(w.getState(),t),$l=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,l=s.currentActionPress("jump"),a=i===null?null:e.items[i],c=a!==null&&J("teleporter")(a)&&qe(a);if(r===null)return l!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:a.config.toRoom,timeRemaining:wn}}}:Y;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Gn({changeType:"teleport",sourceItem:a,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:wn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Ul=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=t,s=o?.renderProps,l=qe(t),a=l&&Te(r,e).some(E);return s===void 0||l!==s.activated||a!==s.flashing?{output:a?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:l?"teleporter":"block.artificial",times:i}),renderProps:{flashing:a,activated:l}}:"no-update"},Nl=({renderContext:{item:{state:{facing:t,actedOnAt:{roomTime:e,by:n}}},room:{roomTime:o,items:r}},currentRendering:i})=>{const s=i?.renderProps,l=Gt(t)??"towards",a=o===e&&ce(zn(n)).some(u=>gr(r[u]));return s===void 0||l!==s.facingXy4||a!==s.controlledByJoystick?{output:ze({top:`charles.${l}`,bottom:a?"headlessBase.all":"headlessBase"}),renderProps:{facingXy4:l,controlledByJoystick:a}}:"no-update"},Hl=({renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:e}},general:{paused:n}},tickContext:{lastRenderRoomTime:o},currentRendering:r})=>{const i=r?.renderProps,s=mt(t);let l;return r?.output?l=r?.output:(l=p({animationId:"spring.bounce"}),l.loop=!1,l.gotoAndStop(0)),o!==void 0&&e>o&&!s&&!n?l.gotoAndPlay(0):s&&!(i?.compressed??!1)&&l.gotoAndStop(1),{output:l,renderProps:{compressed:s}}},Gl=Jt(Hl),Vl=({renderContext:{item:{config:{which:t,startDirection:e}}},currentRendering:n})=>n?.renderProps===void 0?{output:t==="headOverHeels"?ze({top:{textureId:`head.walking.${e}.2`},bottom:{textureId:`heels.walking.${e}.2`}}):p({textureId:`${t}.walking.${e}.2`}),renderProps:W}:"no-update",Xl=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},general:{paused:n}},tickContext:{deltaMS:o},currentRendering:r})=>{const s=(r?.renderProps?.distanceTravelled??0)+Ln(t)*(n?0:o),a=r?.output??p("spikyBall.1"),u=(Math.floor(s*2/Ee.w)+e)%2+1;return a.texture=le().textures[`spikyBall.${u}`],{output:a,renderProps:{distanceTravelled:s}}},jl=Jt(Xl),ql=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,Wl=M(({renderContext:{item:{id:t,config:e},room:n}})=>{if(e.direction==="right"||e.direction==="towards")throw new Error(`this wall should be non-rendering ${t}`);const{direction:o,tiles:r}=e,i=dt(Ne(o)),s=new b({label:"wallTiles"});for(let l=0;l<e.tiles.length;l++){let a=p({textureId:ql(n.planet,r[l],o,n.color.shade==="dimmed"),y:1,pivot:o==="away"?{x:Ee.w,y:Ee.h+1}:{x:0,y:Ee.h+1}});const c=O({[i]:l});if(n.planet==="moonbase"){const u=`moonbase.wall.screen.${r[l]}.away`;console.log(u,bn(u)),bn(u)&&(a=new b({children:[a]}),a.addChild(p({animationId:u,randomiseStartFrame:!0,flipX:o==="left",x:o==="away"?-8:8,y:-23})))}a.x+=c.x,a.y+=c.y,s.addChild(a),s.filters=ae(n)}return s}),Jl=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const o=n?.renderProps,r=e.type==="in-store"?Dn(w.getState(),e.path)?"right":"left":t;return o===void 0||r!==o.setting?{output:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},Zl=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Yl=({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentRendering:r})=>{const i=r?.renderProps;return i===void 0||i.disappear!==n?{output:p({textureId:Zl(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"||t==="book"?ae(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},Kl=t=>En(t)&&t.config.which==="cyberman"&&t.state.everActivated===!1,Ql=({state:{stoodOnBy:t,position:e},config:{times:n}},o)=>{const r=new Array(n?.x??1).fill(null).map(()=>new Array(n?.y??1));return Te(t,o).filter(Kl).forEach(({id:i,state:{position:s}})=>{const l=He(s,e),a={x:Math.floor(l.x/k.w),y:Math.floor(l.y/k.d)};a.x<0||a.x>=(n?.x??1)||a.y<0||a.y>=(n?.y??1)||(r[a.x][a.y]=i)}),r},ec=(t,e)=>{let n=0,o=1;for(const r of e)for(const i of r)i!==void 0&&t.items[i]?.state.activated&&(n|=o),o<<=1;return n},tc=({renderContext:{item:t,room:e},currentRendering:n})=>{const{config:{times:o}}=t,r=n===void 0?Ql(t,e):n.renderProps.chargePositions,i=ec(e,r);return i!==n?.renderProps.cybermanActivationBitmask?{output:p({textureIdCallback(l,a){const c=r[l][a];return c===void 0||e.items[c]?.state.everActivated?"toaster.off":"toaster.on"},times:o??W}),renderProps:{chargePositions:r,cybermanActivationBitmask:i}}:"no-update"},nc={head:an,heels:an,headOverHeels:an,doorFrame:cl,doorLegs:ll,monster:_l,floatingText:Rl,wall:Wl,barrier:M(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:M(({renderContext:{item:{config:t},room:e}})=>{switch(t.style){case"volcano":return p({animationId:"volcano",filter:ae(e),times:t.times,randomiseStartFrame:!0});case"toaster":throw new Error("use the special toaster appearance instead");default:throw t.style,new Error("unknown deadly block style")}}),spikes:Be("spikes"),slidingDeadly:jl,slidingBlock:M(({renderContext:{item:{config:{style:t}},room:e}})=>p(t==="book"?{textureId:"book.y",filter:ae(e)}:t)),block:Yl,switch:Jl,conveyor:El,lift:M(({renderContext:{general:{paused:t}}})=>{const e=new b,n={x:tt.w/2,y:tt.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter:Ul,sceneryCrown:M(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:M(({renderContext:{item:{config:t},room:e,general:{paused:n}}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ae(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Be("fish.1"),charles:Nl,joystick:Be("joystick"),movingPlatform:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),spring:Gl,sceneryPlayer:Vl,hushPuppy:Be("hushPuppy"),bubbles:M(({renderContext:{item:{config:{style:t}},general:{paused:e}}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Be({animationId:"bubbles.doughnut"}),ball:Be("ball"),floor:Sl,floorEdge:Tl,particle:M(({renderContext:{item:{config:{forCharacter:t}}}})=>p({animationId:"particle.fade",anchor:{x:.5,y:.5},filter:t==="heels"?yi:Z}))},xi=t=>{if(t.type==="wall"){const{direction:e}=t.config;if(e==="right"||e==="towards")return}return t.type==="deadlyBlock"&&t.config.style==="toaster"?tc:nc[t.type]},wi=(t,e,n)=>{const o=xi(t);if(!n.room)return;const r=o({renderContext:{general:e.general,item:t,room:n.room},tickContext:{lastRenderRoomTime:ht,movedItems:$n,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output};function Si({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(ui(e)||rt(e)||(e.state.action="death",e.state.expires=t+wn))}const ue=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,ut=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,oc=3e3,Ci=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:i,config:s}=o,{id:l,roomJson:{items:a},roomTime:c}=r,{pickupsCollected:u}=e;if(u[l]?.[i]===!0)return;a[i]&&(u[l]===void 0&&(u[l]={}),u[l][i]=!0);const d=(h,f=r)=>{const m=br(o),v={type:"floatingText",id:`floatingText-${i}`,...vr,fixedZIndex:xs,aabb:P,state:{...Un(),position:U(m,{z:k.h/2}),expires:c+oc},config:{textLines:h,appearanceRoomTime:c}};ke({room:f,item:v})};switch(s.gives){case"hooter":{const h=Ft(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=Ft(n);h!==void 0&&(h.doughnuts=ue(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=at(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=Ft(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=at(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ue(n.state.head.lives,2),n.state.heels.lives=ue(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=ue(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(ys(s.page));break;case"reincarnation":{const h=bs(e,w.getState(),i),f=he(h.gameState);if(!f)throw new Error("how are we saving from a pickup if there is no current room?");d(["reincarnation","point","restored"],f),w.dispatch(vs(h)),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(gs(s.planet)),d([s.planet,"liberated!"]);break}}},rc=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;yr(i,o)<=0||e.state.action!=="death"&&Gn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},ic=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Nt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function sc({movingItem:t}){t.state.autoWalk=!1}const se=(t,...e)=>J(...e)(t.touchedItem),Ye=(t,...e)=>J(...e)(t.movingItem),Ti=t=>E(t.movingItem),ac=t=>E(t.touchedItem),lc=t=>xr(t.touchedItem),$o=t=>{switch(!0){case se(t,"stopAutowalk"):sc(t);break;case lc(t):Si(t);break;case se(t,"portal"):rc(t);break;case se(t,"pickup"):Ci(t);break;case se(t,"doorFrame"):ic(t);break}},Qn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Vt(e.items);if(r!==void 0)return rt(r)?void 0:r;const i=n===void 0||rt(n)||n.state.action==="death"?void 0:ro(n.state.position,t),s=o===void 0||rt(o)||o.state.action==="death"?void 0:ro(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ki=150,Ii=t=>t[Math.floor(Math.random()*t.length)],fe=Object.freeze({movementType:"vel",vels:{walking:P}}),Zt=t=>En(t)?me[t.config.which]:me[t.type],Uo=k.w/2,cc=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=me.homingBot;if(!Xt(e,de))return{movementType:"steady"};for(const s of H(Vt(n.items))){if(s===void 0)continue;const l=He(s.state.position,t);if(Math.abs(l.y)<Uo)return{movementType:"vel",vels:{walking:{x:l.x>0?i:-.05,y:0,z:0}}};if(Math.abs(l.x)<Uo)return{movementType:"vel",vels:{walking:{x:0,y:l.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},uc=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:l}}=t;if(i===null)return fe;const a=Qn(r,e);if(a===void 0||s+ki>e.roomTime)return Y;const c=He(a?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>k.w/4?u:dt(u),h=Zt(t),f={...P,[d]:c[d]>0?h:-h},m=Ve(f),v=!Xt(m,l);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:W}}},No=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return fe;const l=Qn(i,e);if(l===void 0)return fe;const a=l.state.position,c=k.w*3;if(!(i.x>a.x-c&&i.x<a.x+c&&i.y>a.y-c&&i.y<a.y+c))return fe;const d=He(l?.state.position,i),h=Zt(t),f=(1+Math.sqrt(2))/2,m=h*f,v=D({...d,z:0},m/Ln(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:Ve(v)}}},ln=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return fe;if(!(Ie(i,P)||Math.random()<o/1e3))return Y;const a=Ii(r);return{movementType:"vel",vels:{walking:D(vn[a],Zt(t))},stateDelta:{facing:vn[a]}}},dc=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?fe:Xt(i,de)?{movementType:"vel",vels:{walking:D(r,Zt(t))}}:Y},Ho=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=Ii([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},cn=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:l,facing:a},aabb:c}=t;if(!l||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ki))return;const u=jt(i,c,e,n);u.x===0&&u.y===0||(t.state.vels.walking=Ho(s,u,r),t.state.facing=Ho(a,u,r),t.state.durationOfTouch=0)},hc=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=P)},fc=(t,e,n,o)=>{if(!t.state.activated||En(t)&&t.state.busyLickingDoughnutsOffFace)return fe;switch(t.config.movement){case"patrol-randomly-diagonal":return ln(t,e,n,o,Ts);case"patrol-randomly-xy8":return ln(t,e,n,o,Cs);case"patrol-randomly-xy4":return ln(t,e,n,o,Ss);case"towards-tripped-on-axis-xy4":return cc(t,e);case"towards-on-shortest-axis-xy4":return uc(t,e);case"back-forth":case"clockwise":return dc(t);case"unmoving":return fe;case"towards-analogue":return No(t,e);case"towards-analogue-unless-planet-crowns":return No(t,e,n,o,ws(w.getState()));default:throw t.config,new Error("this should be unreachable")}},pc=t=>{const{movingItem:e,touchedItem:n}=t;if(Ge(n,e))switch(e.config.movement){case"patrol-randomly-xy4":cn(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":cn(t,"opposite");break;case"clockwise":cn(t,"clockwise");break;case"towards-tripped-on-axis-xy4":hc(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},mc=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";gc(o,s,n.items,n.roomTime);break}case"in-store":{w.dispatch(ks(o.path));break}}},gc=(t,e,n,o)=>{for(const r of t.modifies)for(const[i,s]of st(r.newState))if(Object.hasOwn(s,e))for(const l of r.targets){const a=n[l];if(a===void 0)continue;if(a.type!==r.expectType)throw new Error(`item "${a.id}" is of type "${a.type}" - does not match expected type "${r.expectType}" from switch config ${JSON.stringify(t,null,2)}`);const c=a;c.state={...a.state,[i]:s[e],switchedAtRoomTime:o,switchedSetting:e}}},bc=({movingItem:t,touchedItem:e})=>{if(!Ge(t))return;const{state:{position:n},aabb:o}=e,r=jt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=Ve(r),s=D(i,-.05);return e.state.vels.sliding=s,!1},vc=({movingItem:t,touchedItem:e})=>{if(!Ge(e))return;const n=t.state.vels.sliding;if(Ie(n,P))return;const{state:{position:o},aabb:r}=t,i=jt(e.state.position,e.aabb,o,r);return yr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=P),!1},yc=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:l},aabb:a}=n,c=jt(t.state.position,t.aabb,l,a);if(c.x===0&&c.y===0)return;const u=Ve(c);for(const d of s){const h=e.items[d],f=D(u,-.025*o);h.state.facing=f,Vn({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:i})}},xc=1e3/12,It=t=>{const e=t-Bs,o=e/_s*Fn;return(e+.5*yn*o**2)/o},wc={head:It(bt.head),headOnSpring:It(bt.head+k.h),heels:It(bt.heels),heelsOnSpring:It(bt.heels+k.h)},Go=(t,e,n)=>{const o=t.type==="headOverHeels"||t.type==="heels"&&n?"head":t.type;return wc[`${o}${e?"OnSpring":""}`]},Sc=t=>!(t===null||Ps(t)&&qe(t)||Os(t)&&t.config.gives==="scroll"||E(t)&&t.state.standingOnItemId===null),Cc=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+xc>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),Pi=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Xe(o,e);if(Cc(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Go(t,!1,t.type==="heels"&&t.state.isBigJump)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&Sc(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...t.type==="heels"?{isBigJump:!1}:{}}}:Y;const l=t.type==="heels"&&t.state.bigJumps>0,a=Is(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Go(t,a,l)}},stateDelta:{action:"moving",jumped:!0,...t.type==="heels"?l?{bigJumps:t.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},Tc=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Ue(t),l=Math.max(i,Math.min(o,s+e*r)),a=Math.min(l,o);return D(n,a)},kc={movementType:"vel",vels:{walking:P}},Oi=(t,e,n,o)=>{const r=Ic(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Ue(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Ie(r.vels.walking,P)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Ic=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:l,standingOnItemId:a,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:m}}}=t,v=o===t.id,I=v?n.currentActionPress("jump"):"released",A=v?n.directionVector:P,C=a===null&&m.z<0,_=i==="head"&&Zn(t.state)>0&&a!==null,F=i==="headOverHeels"?C?"head":"heels":_?"heels":i,N=l?c:A,ve=me[F];if(u!==null||s==="death")return kc;if(i==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Nn(f,D(f,As*r))},stateDelta:{action:C?"falling":"jumping"}}:{movementType:"vel",vels:{walking:P},stateDelta:{action:"falling"}};if(I!=="released"){const gt=Ve(Xt(N,de)?c:N),Xi=J("spring")(Xe(a,e))?1:Fs;return{movementType:"vel",vels:{walking:D({...gt,z:0},ve*Xi)},stateDelta:{facing:gt}}}}if(Ue(N)!==0)return C?{movementType:"vel",vels:{walking:D({...N,z:0},ve)},stateDelta:{facing:N,action:"falling"}}:{movementType:"vel",vels:{walking:Tc({vel:f,acc:Rs[F],deltaMS:r,maxSpeed:ve,unitD:N,minSpeed:0})},stateDelta:{facing:N,action:"moving"}};if(d>0&&d<1){const gt=Ie(h,c)?1:0;return{movementType:"position",posDelta:D(c,gt-d),stateDelta:{action:C?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:P},stateDelta:{action:C?"falling":"idle"}}},Vo=t=>Pe(t.movingItem)&&wr(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Bi=(t,e)=>{let n=P;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(Pe(t)||J("lift")(t)))for(const[i,s]of mr(o.vels)){const l={...P,...s};t.state.vels[i]=l}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},Xo=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&E(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Vo(t)){if(Vo(t)&&Ti(t)){Sr({above:t.movingItem,below:t.touchedItem});const n=[Pi(t.movingItem,t.room,t.gameState,t.deltaMS),Oi(t.movingItem,t.room,t.gameState,t.deltaMS)];Bi(t.movingItem,n)}_r(t)}};function Pc(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const eo=t=>{Ti(t)&&$o(t),ac(t)&&$o({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),se(t,...io)&&bc(t),Ye(t,...io)&&vc(t),(Ye(t,"monster")&&se(t,"firedDoughnut")||Ye(t,"firedDoughnut")&&se(t,"monster"))&&Pc(t),(Ye(t,"monster")||Ye(t,"movingPlatform"))&&pc(t),se(t,"switch")&&mc(t),se(t,"joystick")&&yc(t,eo),t.touchedItem.state.disappear&&Xo(t),t.movingItem.state.disappear&&Ge(t.touchedItem,t.movingItem)&&Xo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Oc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:l}=i,{state:{position:a}}=t;if(!l)return;const c=ge(e.items).filter(Hn),u=s===null?_i(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;Bc(e,i,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!Ai(t,Tr(e.items)))return;s.state.position=a,ke({room:e,item:s}),Vn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:s.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:eo}),i.carrying=null,r.actionsHandled.add("carry")}},Bc=(t,e,n)=>{e.carrying=n,n.state.wouldPickUpNext=!1,kr({room:t,item:n})},_i=(t,e)=>Cr(t,ge(e.items).filter(Hn)),Ai=(t,e)=>{const n={position:U(t.state.position,{z:k.h})},o=Ms({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(Ge(r,t)){if(!Pe(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!Ai(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},un=-11,_c={jump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,l=i?.output,a=r?.state.standingOnItemId??null,c=a===null||o===void 0?null:o.items[a],u=c===null?!1:c.type==="teleporter"&&qe(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=l===void 0?Tt({colourised:n,button:t}):l;if(s?.pressed!==d&&kt(h,d),u!==s?.standingOnTeleporter)if(u)Ze(h,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Bo(t,n,"JUMP");f.y=un,Ze(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourised:n}}},carry({renderContext:t,currentRendering:e,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=t,{currentPlayable:s,room:l}=n,a=e?.renderProps,c=e?.output,u=s&&at(s),d=u?.hasBag??!1,h=u?.carrying??null,f=h===null&&l!==void 0&&_i(s,l)!==void 0,m=o.actions.every(C=>r.currentActionPress(C)!=="released"),v=d&&!f&&h===null,I=c===void 0?Tt({colourised:i,button:o}):c;if(I.visible=d,d&&(v!==a?.disabled&&Oo(I,v,i),I.visible=!0,a?.pressed!==m&&kt(I,m),d!==a?.hasBag||h!==a?.carrying)){let C;h!==null?C=wi(h,t,n):d&&(C=p({textureId:"bag",y:-2})),Ze(I,C)}return{output:I,renderProps:{pressed:m,hasBag:d,colourised:i,carrying:h,disabled:v}}},fire({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,l=r&&Ft(r),a=l?.hasHooter??!1,c=l?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=s===void 0?Tt({colourised:n,button:t}):s,h=a||ut(c)>0;if(d.visible=h,h&&(i?.pressed!==u&&kt(d,u),a!==i?.hasHooter||c!==i?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):ut(c)>0&&(f=p({textureId:"doughnuts",y:-2}));const m=ie(new b,c);m.y=un,m.filters=ne,Ze(d,f,m),Oo(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourised:n,doughnuts:c,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=(r&&at(r))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||a!==i.hasBag))return"no-update";let d;if(s===void 0){d=Tt({colourised:n,button:t});const h=Bo(t,n,"C+J");h.y=un,Ze(d,h)}else d=s;return a?(d.visible=!0,i?.pressed!==c&&kt(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:a,colourised:n}}},menu({currentRendering:t}){if(t!==void 0)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=te,{output:e,renderProps:W}},map({currentRendering:t}){if(t!==void 0)return"no-update";const e=et({label:"mapText",outline:!0});return ie(e,"MAP"),{output:e,renderProps:W}}};class _e extends gi{constructor(e){const n=_c[e.button.which];super(e,n)}}const Ac=30,Fc=15,Rc=42,Mc=36,Dc=44,zc=20;class Lc{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new _e({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new _e({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new _e({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new _e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new _e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new _e({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new rl({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:l}=this.#n;for(const{renderContext:{button:{which:a}},output:c}of H(i))a==="menu"||a==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=Fc,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=Ac,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(l.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const n of H(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Dc,this.#n.mainButtonNest.y=e.y-zc,this.#n.joystick.output.x=Rc,this.#n.joystick.output.y=e.y-Mc,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of H(this.#n.buttons))r.tick({...e,currentPlayable:je(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}$e.frames.button.frame;const Ec=250,$c=t=>t?48:24,Uc=t=>t?68:56,Nc=(t,e)=>t?e.x/2-24:80,Hc=t=>t?72:24,Gc=t=>t?88:0,jo=112,Ke=t=>t==="heels"?1:-1;class Vc{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Qt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[Po],this.#t.fps.y=_t.h,this.#o(),n&&(this.#n=new Lc({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:et({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:et({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:et({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const n of Qt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const l=new pe({texture:le().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Io,y:n?0:8});s.addChild(l);const a=et({outline:r==="text-only"});return a.y=n?0:16,a.x=l.x=_t.w/2,s.addChild(a),o&&(a.visible=!1),r===!0&&(s.filters=ne),{text:a,icon:l,container:s}}#i(e){const n=new pe(le().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#s({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ke("head")*jo,this.#t.head.doughnuts.container.y=e.y-tt.h-8,this.#t.heels.carrying.container.y=e.y-tt.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ke("heels")*jo,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-_t.w*2}#a(e,n){return e?n?Z:ot:n?Co:nt}#l(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=vt(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:l}=this.#t.heels.carrying,a=l.children.length>0;if(s===null&&a)for(const c of l.children)c.destroy();if(s!==null&&!a){const c=wi(s,this.renderContext,e);c!==void 0&&l.addChild(c)}l.filters=this.#a(!0,o),this.#t.heels.bag.icon.filters=this.#a(i,o)}#c(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=vt(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#a(i,o),this.#t.head.doughnuts.icon.filters=this.#a(s!==0,o),ie(this.#t.head.doughnuts.text,s)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=vt(r,e),{text:s,container:l}=this.#t[e].shield,{text:a,container:c}=this.#t[e].extraSkill,u=Rt(i),d=u>0||!o;l.visible=d,d&&(ie(s,u),l.y=n.y-Gc(o)),c.x=l.x=(n.x>>1)+Ke(e)*Nc(o,n);const h=i===void 0?0:e==="head"?Zn(i):i.bigJumps,f=h>0||!o;c.visible=f,f&&(ie(a,h),c.y=n.y-Hc(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#u(r,e),l=this.#t[e].sprite;s?l.filters=i?Z:ot:l.filters=i?Co:nt,l.x=(n.x>>1)+Ke(e)*Uc(o),l.y=n.y-tt.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=vt(r,e)?.lives??0,l=this.#t[e].livesText;l.x=(n.x>>1)+Ke(e)*$c(o),l.y=n.y,ie(l,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Jn(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;nt.targetColor=o.hud.dimmed[r?"dimmed":"original"],Yn.targetColor=o.hud.dimmed[r?"basic":"original"],Io.targetColor=o.hud.icons[r?"basic":"original"],ot.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?Ct.colourised.head[this.#u(i,"head")?"active":"inactive"]:Ct.original,this.#t.heels.livesText.filters=r?Ct.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:Ct.original}#d=ht;#g(){if(Ds(w.getState())){if(performance.now()>this.#d+Ec){const e=Qe.shared.FPS;ie(this.#t.fps,Math.round(e)),Po.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Qt)this.#p(n,e),this.#f(n,e),this.#h(n,e);this.#s(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const qo={movementType:"vel",vels:{gravity:P}},Xc=(t,e,n,o)=>{if(!Ge(t))return qo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,a=zs[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Xe(s,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-yn*o,-a)}}}:qo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-yn*o,-a)}}}},Wo=k.h,Jo=.001,jc=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=so**2/(2*We);if(n==="up"){if(e<=o)return Math.max(Jo,Math.sqrt(2*We*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(Jo,Math.sqrt(2*We*r))}else return so}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*We*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*We*Math.max(e,0))):-.036},qc=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*Wo,i=e*Wo,s=jc({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const l=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:l}}},Zo={movementType:"vel",vels:{movingFloor:P}},Wc=(t,e,n,o)=>{if(E(t)&&t.state.teleporting!==null)return Zo;const{state:{standingOnItemId:r}}=t,i=Xe(r,e);if(i===null||!J("conveyor")(i))return Zo;const{config:{direction:s}}=i,a=J("heels")(t)&&t.state.action==="moving"&&Gt(t.state.facing)===Ls(s)?me.heels:Es;return{movementType:"vel",vels:{movingFloor:D(vn[s],a)}}};function*Jc(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Zc=k.w*.8,Yc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:l}=i,{state:{position:a,facing:c}}=t,u=Ve(c);if(r.currentActionPress("fire")==="tap"&&l&&ut(s)>0){const d={type:"firedDoughnut",...vr,config:W,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...Un(),position:U(a,D(u,Zc),t.type==="headOverHeels"?{z:k.h}:P),vels:{fired:D(u,me.firedDoughnut)},disappear:"onTouch"}};ke({room:e,item:d}),i.doughnuts=ue(i.doughnuts,-1),r.actionsHandled.add("fire")}},Fi=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Kc=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Pt=k.w*3,Qc=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-Pt&&n.x<o.x+Pt&&n.y>o.y-Pt&&n.y<o.y+Pt},Yo=(t,e,n,o,r)=>{if(r&&t.state.activated)return Y;const i=Qn(t.state.position,e);return i===void 0?Y:Qc(t,i)?Fi:Kc},eu=(t,e,n,o)=>t.state.activated?Y:Te(t.state.stoodOnBy,e).some(E)?Fi:Y,tu=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Yo(t,e,n,o,!0);case"while-player-near":return Yo(t,e,n,o,!1);case"on-stand":return eu(t,e);case"off":case"on":return Y;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},nu=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:l},config:{emits:a,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=$s(Us(`${r}-${s}`,{...a,position:P},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=Nn(l,D(h.aabb,.5)),ke({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*ou(t,e,n,o){Pe(t)&&(yield Xc(t,e,n,o),yield Wc(t,e),yield*Jc(t,e)),E(t)?(yield Oi(t,e,n,o),t.id===n.currentCharacterName&&(yield $l(t,e,n,o),yield Pi(t,e,n),Ns(t)&&Oc(t,e,n,o),Hs(t)&&Yc(t,e,n))):Gs(t)?yield qc(t):Vs(t)?(yield tu(t,e,n,o),yield fc(t,e,n,o)):Xs(t)&&nu(t,e)}const ru=(t,e,n,o)=>{if(!Pe(t)||t.state.standingOnItemId===null)return;const r=Xe(t.state.standingOnItemId,e);E(t)&&r.type==="pickup"&&Ci({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||E(t)&&r.state.disappear==="onTouchByPlayer")&&_r({touchedItem:r,gameState:n,room:e})},iu=(t,e,n,o)=>{if(E(t)&&t.state.standingOnItemId!==null){const s=Xe(t.state.standingOnItemId,e);(xr(s)||s.type==="spikes")&&Si({room:e,movingItem:t})}const r=[...ou(t,e,n,o)];ru(t,e,n);let i=Bi(t,r);(Pe(t)||J("lift")(t)||J("firedDoughnut")(t))&&(i=U(i,...ce(H(t.state.vels)).map(s=>D(s,o)))),Vn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:o,onTouch:eo})},su=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ue(e.state.head.lives,-1),e.state.heels.lives=ue(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0)return;const r=ut(e.state.head.lives)>0,i=ut(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,xe(t,e);const u=ao(e)[c],d=Le({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:lo(u)};return}if(t.entryState.headOverHeels!==void 0){xe(t,e);const c=Le({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=ao(e);if(xe(t,c),xe(t,u),Ir(c,u)){const d=Pr({head:c,heels:u});xe(t,d,"heels");const h=Le({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:lo(d)};return}else{const d=Le({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Le=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=qs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??W});for(const i of e)ke({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ga(r,t);return r},xe=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},au=(t,e)=>{const n=Or(t,Br(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0){delete t.characterRooms[e.id],n!==void 0&&(t.currentCharacterName=n.type);return}else{const o=t.characterRooms[e.type];xe(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const l=Pr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});xe(t,l);const a=Le({gameState:t,playableItems:[l],roomId:o.id});t.characterRooms={headOverHeels:a},t.currentCharacterName="headOverHeels";return}ke({room:o,item:e});return}else{const s=Le({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},lu=(t,e)=>{e.type==="headOverHeels"?su(t,e):au(t,e),je(t)===void 0&&w.dispatch(js({offerReincarnation:!0}))},cu=t=>{for(const e of ge(t.items))try{for(const n of Te(e.state.stoodOnBy,t)){if(!t.items[n.id]){co(n,t);continue}if(!wr(n,e)){co(n,t);const o=Cr(n,Tr(t.items));o!==void 0&&Sr({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${e.id}"`,{cause:n})}},uu=2*ba,du=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+uu,positionDelta:n})},hu=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Nn(o.state.position,r),z:0};if(!Ie(s,P))for(const l of Te(o.state.stoodOnBy,e))du(l,e,s)}},fu=(t,e)=>{for(const n of ge(t.items))!Pe(n)||t.roomTime===n.state.actedOnAt.roomTime||Ws(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Js(n.state.position),e.add(n))},pu=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,mu=t=>{for(const e of ge(t.items)){const n=e.state.position;e.state.position=Zs(n)}},gu=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},bu=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=je(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Or(t,Br(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Ko=Fn*$e.animations["particle.fade"].length*(1/$e.animations["particle.fade"].animationSpeed),vu=20,yu=38,Ot=k.w/2;let xu=0;const Ri=(t,e,n,o)=>{if(!(Math.random()<n*(o/1e3)))return;const i={...U(br(t),{x:Math.random()*Ot-Ot/2,y:Math.random()*Ot-Ot/2}),z:t.state.position.z};ke({room:e,item:{id:`particle.${t.id}.${xu++}`,type:"particle",aabb:P,config:{forCharacter:t.type},state:{...Un(),expires:e.roomTime+Ko+Math.random()*Ko,position:i}}})},wu=(t,e,n)=>{!(Zn(t.state)>0)||t.state.standingOnItemId===null||Ue(t.state.vels.walking)<Ys||Ri(t,e,vu,n)},Su=(t,e,n)=>{const{isBigJump:o}=t.state;o&&t.state.standingOnItemId===null&&(t.state.vels.gravity.z<=0||Ri(t,e,yu,n))},Cu=(t,e)=>{const{head:n,heels:o}=Vt(t.items);n!==void 0&&wu(n,t,e),o!==void 0&&Su(o,t,e)},Tu=(t,e)=>{const n=he(t);if(n===void 0)return $n;bu(t,n,e);const o=Object.fromEntries(Ks(n.items).map(([s,l])=>[s,l.state.position]));for(const s of H(n.items))pu(s,n)&&(kr({room:n,item:s}),E(s)&&lu(t,s));const r=Object.values(n.items).sort(gu);for(const s of r){const l=je(t);if(l===void 0||l.state.action==="death")break;if(n.items[s.id]!==void 0)try{iu(s,n,t,e)}catch(a){throw console.error(a),new Error(`error caught while ticking item "${s.id}"`,{cause:a})}}Cu(n,e),cu(n),mu(n);const i=new Set(ce(H(n.items)).filter(s=>o[s.id]===void 0||!Ie(s.state.position,o[s.id])));return hu(i,n,o),fu(n,i),i},Qo=(t,e)=>{const n=T(t),o=T(U(t,{x:e.x,z:e.z})),r=T(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},dn=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,ku=(t,e,n,o)=>{const r=Qo(t,e),i=Qo(n,o),s=r.topLeft.x,l=r.topRight.x,a=i.topLeft.x,c=i.topRight.x,u=dn(s,l,a,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=dn(d,h,f,m),I=r.topLeft.y+r.topLeft.x/2,A=r.bottomCentre.y+r.bottomCentre.x/2,C=i.topLeft.y+i.topLeft.x/2,_=i.bottomCentre.y+i.bottomCentre.x/2,F=dn(I,A,C,_);return u&&v&&F},Iu=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,o=e.renderAabb||e.aabb,r=t.state.position,i=e.state.position;if(!ku(r,n,i,o))return 0;for(const s of Qs){const l=t.state.position[s],a=l+n[s],c=e.state.position[s],u=c+o[s];if(a<=c)return 1*(s==="z"?-1:1);if(l>=u)return-1*(s==="z"?-1:1)}return er(e)-er(t)},er=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Mt extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Pu=t=>{const e=Ou(t);let n=e.length,o=n;const r=new Array(n),i={},s=Bu(e);for(;o--;)i[o]||l(e[o],o,new Set);return r;function l(a,c,u){if(u.has(a))throw new Mt([a],!1);if(i[c])return;i[c]=!0;const d=t.get(a)||new Set,h=Array.from(d);if(c=h.length){u.add(a);do{const f=h[--c];try{l(f,s.get(f),u)}catch(m){throw m instanceof Mt?m.hasClosedCycle?m:new Mt([a,...m.cyclicDependency],m.cyclicDependency.includes(a)):m}}while(c);u.delete(a)}r[--n]=a}};function Ou(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Bu(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const tr=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Bt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},_u=(t,e=new Set(H(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Bt(n,r,s);for(const r of e)if(r.fixedZIndex===void 0)for(const i of H(t)){if(i.fixedZIndex!==void 0||o.get(i)?.has(r)||r===i)continue;const s=Iu(r,i);if(tr(o,r,i),s===0){Bt(n,r.id,i.id),Bt(n,i.id,r.id);continue}const l=s>0?r.id:i.id,a=s>0?i.id:r.id;tr(n,l,a),Bt(n,a,l)}return n},Mi=(t,e,n=3)=>{try{return{order:Pu(t),impossible:!1}}catch(o){if(o instanceof Mt){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:Mi(t,e,n-1).order,impossible:!0}}else throw o}};class Di extends gi{}const nr=(t,e)=>{e.poly([T({}),T({x:t.x}),T({x:t.x,y:t.y}),T({y:t.y})]).poly([T({}),T({z:t.z}),T({y:t.y,z:t.z}),T({y:t.y})]).poly([T({x:t.x}),T({x:t.x,z:t.z}),T(t),T({x:t.x,y:t.y})]).poly([T({z:t.z}),T({x:t.x,z:t.z}),T({x:t.x,y:t.y,z:t.z}),T({y:t.y,z:t.z})])},or=(t,e)=>{const n=new q;return nr(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),nr(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Au={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Fu{constructor(e){this.renderContext=e;const{item:n}=e,o=Au[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const i=T(n.config.relativePoint);this.#e.addChild(new q().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new q().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new q({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(or(n.aabb,o)),n.renderAabb&&this.#e.addChild(or(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new Ha({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class Ru{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=T(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const Mu=({renderContext:{general:{pixiRenderer:t},item:e,room:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=e,s=o?.renderProps,l=qe(e),a=l&&Te(r,n).find(E)!==void 0;return s===void 0||l!==s.activated||a!==s.flashing?{output:qt(t,{textureId:a?"shadowMask.teleporter.flashing":l?"shadowMask.teleporter":"shadowMask.fullBlock"},i),renderProps:{flashing:a,activated:l}}:"no-update"},hn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:o})=>{const r=o?.renderProps,i=Gt(n)??"towards";if(!(r===void 0||i!==r.facingXy4))return"no-update";const l=p(i==="left"||i==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return l.y=-(k.h*(e-1)),l.scale.x=i==="away"||i==="right"?1:-1,{output:l,renderProps:{facingXy4:i}}},rr={lift:oe("shadowMask.smallBlock"),conveyor:re(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:Ne(t)==="x"})),teleporter:Mu,floor:"no-mask",barrier:re(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:oe("shadowMask.smallRound"),block:re(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:re(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),movingPlatform:re(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),hushPuppy:oe("shadowMask.hushPuppy"),portableBlock:re(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:re(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:re(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.toaster"),spikes:oe("shadowMask.spikes"),switch:oe("shadowMask.switch"),pickup:re(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:oe("shadowMask.smallRound"),"monster.dalek":oe("shadowMask.dalek"),"monster.turtle":hn("turtle"),"monster.skiHead":hn("skiHead"),"monster.homingBot":oe("shadowMask.smallRound"),joystick:oe("shadowMask.joystick"),charles:hn("charles",2)},Du=t=>t.type==="monster"?rr[`monster.${t.config.which}`]:rr[t.type],zu=new $a({alpha:.66});class Lu{constructor(e,n){this.renderContext=e,this.#e.filters=zu,n!=="no-mask"&&(this.#t=new Di(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t;#o={};get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const o=this.#t.output.children.at(0);if(o===void 0||!(o instanceof pe)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}n!==o&&(this.#r||(this.#e.mask=o))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:o}=e,{item:r,general:{pixiRenderer:i},room:s}=this.renderContext,l=n.has(r),a=r.state.position.z+r.aabb.z,c=ge(s.items).filter(function(m){return m.shadowCastTexture!==void 0}),u={id:r.id,state:{position:{...r.state.position,z:a}},aabb:{...r.aabb,z:ea}},d=Object.groupBy(c,f=>{const m=this.#o[f.id]!==void 0,v=n.has(f);return!l&&!v?m?"keepUnchanged":"noShadow":Ir(u,f)?m?"update":"create":"noShadow"});for(const f of vo(d.keepUnchanged,d.update))this.#o[f.id].renderedOnProgression=o;if(d.create)for(const f of d.create){const{times:m}=f.config,v=qt(i,f.shadowCastTexture,m);v.label=f.id,this.#n.addChild(v),this.#o[f.id]={sprite:v,renderedOnProgression:o}}for(const f of vo(d.create,d.update)){const{sprite:m}=this.#o[f.id],v=T({...He(f.state.position,r.state.position),z:r.aabb.z});m.x=v.x,m.y=v.y}for(const[f,{sprite:m,renderedOnProgression:v}]of st(this.#o))v!==o&&(m.destroy(),delete this.#o[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const Eu=t=>{const e=Du(t.item);return e===void 0?void 0:new Lu(t,e)};class $u{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const z=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:l=!1}=e,a=x.createBufferSource(),c=xn()[o];return a.buffer=c,a.loop=i,a.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&l?a.start(0,c.duration*Math.random()):a.start(),r!==void 0&&a.connect(r),a},Ae=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},L=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let l=!0,a,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(l&&i)?(a?.stop(),a=z({...t}),Ae(a,t.gain,s),n!==void 0&&(r?(a=z({...n,loop:!0}),Ae(a,n.gain,s)):a.onended=()=>{c&&(a=z({...n,loop:!0}),Ae(a,n.gain,s))})):n!==void 0&&(a=z({...n,loop:!0}),Ae(a,n.gain,s)):(a&&a.loop&&(a.stop(),a.onended=null),o!==void 0&&(a=z({...o}),Ae(a,o.gain,s)));else if(c!==u&&e!==void 0){const h=z({...e});Ae(h,e.gain,s)}l=!1,c=u}};class Uu{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Nu{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&z({soundId:"bonus",connectTo:this.output});break}case"disappearing":{z({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,z({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class to{constructor(e,n,o=1){this.renderContext=e,this.#e=L({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,i=o>(e??ht)&&!ka(zn(r));this.#e(i)}destroy(){}}class Hu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new to(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,l=o===i&&ce(zn(s)).some(a=>gr(r[a]));this.#n(l),this.#t.tick(e)}destroy(){}}const fn=2;class Gu{constructor(e){this.renderContext=e}output=x.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:fn},loop:{soundId:"conveyorLoop",playbackRate:fn},stop:{soundId:"conveyorEnd",playbackRate:fn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=mt(e);this.#e(n)}destroy(){this.#e(!1)}}const Vu=3;class Xu{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=z({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Vu*e)}destroy(){}}const ir={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},sr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},ar={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},lr={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class ju{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;ir[n]!==void 0&&(this.#r=new to(e,ir[n]),this.#r.output.connect(this.output)),sr[n]!==void 0&&(this.#t=L({change:sr[n]},this.#e)),lr[n]!==void 0&&(this.#i=L(lr[n],this.#e)),ar[n]!==void 0&&(this.#o=L({loop:ar[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const l=Rn(o);this.#t(l)}if(this.#r&&this.#r.tick(e),this.#o){const l=r&&!i;this.#o(l)}if(this.#i){const l=!Ie(s,P);this.#i(l)}}destroy(){}}class pn{constructor(e){this.renderContext=e;const{general:{soundSettings:n},item:{type:o}}=e,{noFootsteps:r}={...ft.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=L({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#a.gain.value=1.2,this.#a.connect(this.output),this.#i.connect(this.output),this.#o=L({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#r=L({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#o;#r;#i=x.createGain();#s=L({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#a=x.createGain();#l=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#a);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:i,jumped:s,standingOnItemId:l,position:{z:a},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=at(n),{teleportingPhase:f,positionZ:m}=this.#c,v=r?r.phase:null,I=s&&a>i&&a>m&&c>0,A=a<m&&c<0&&l===null;this.#r(A),this.#o(I),this.#n!==void 0&&this.#n(!I&&!A&&o==="moving"),h!==void 0&&this.#l(h.carrying!==null);const C=l!==null&&u>(e??ht)&&d[l];if(this.#s(C),v!==null&&v!==f)if(v==="in"){const _=xn().teleportIn,F=x.createBufferSource();F.buffer=_,F.connect(this.output),F.start()}else{const _=xn().teleportOut,F=x.createBufferSource();F.buffer=_,F.connect(this.output),F.start()}this.#c={teleportingPhase:v,positionZ:a}}destroy(){}}class qu{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=mt(e);!o&&r&&z({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Wu{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Ju{constructor(e){this.renderContext=e}output=x.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:n,stoodOnUntilRoomTime:o}}}}=this,r=mt(n);e!==void 0&&o>e&&!r&&z({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Zu{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?Dn(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&z({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Yu{constructor(e){this.renderContext=e}output=x.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(qe(e)&&Te(e.state.stoodOnBy,n).some(E))}destroy(){}}class Ku{constructor(e){this.renderContext=e,z({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class Qu extends to{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const ed={lift:Xu,switch:Zu,bubbles:Nu,head:pn,heels:pn,headOverHeels:pn,teleporter:Yu,monster:ju,conveyor:Gu,spring:Ju,portableBlock:qu,charles:Hu,ball:Uu,pushableBlock:Wu,firedDoughnut:Ku,slidingBlock:Qu},td=t=>{const e=ed[t.item.type];if(e)return new e(t)},cr=k.h*ta,ur=k.h*-1,nd=k.w*16,od=0,mn=(t,e,n)=>(t-e)/(n-e)*2-1;class rd{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=en(uo({x:0,y:o})),this.positionMaxX=en(uo({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=U(o.position,D(n.aabb,.5)),i=mn(en(r),this.positionMaxX,this.positionMinX),s=mn(r.z,ur,cr);if(!Number.isFinite(s))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${ur},
          ${cr},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(o.position)},
          scaleXyz(${JSON.stringify(n.aabb)}, 0.5),
        )`);const l=mn(r.x+r.y,od,nd);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=l}destroy(){this.childRenderer.destroy()}}const id=[new $t(g.midRed)],sd=[new $t(g.moss)],ad=75;class ld{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<ad?o==="left"?sd:id:Z,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const cd=g.moss,ud=()=>new ct({outlineColor:cd,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale});class dd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:n}=this.renderContext.item.state;n!==!this.#e&&(this.output.filters=n?[ud()]:Z),this.#e=n,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const hd=(t,e,n)=>Hn(t)?new dd(e,n):n,fd=(t,e)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{w.dispatch(ra({item:t}))}))},pd=t=>{const e=w.getState(),n=na(e),o=!oa(e),{item:r}=t,i=n==="all"||n==="non-wall"&&t.item.type!=="wall",s=[],l=xi(r);if(l!==void 0){const h=new Di(t,l),f=new ld(t,h);s.push(hd(r,t,f)),i&&(f.output.alpha=.66)}if(o){const h=Eu(t);h!==void 0&&s.push(h)}i&&s.push(new Fu(t));let a;if(s.length===0)a=void 0;else{const h=s.length===1?s[0]:new md(s,t);fd(r,h.output),a=new Ru(t,h)}const c=t.general.soundSettings.mute??ft.soundSettings.mute,u=t.general.paused||c?void 0:td(t),d=u===void 0?void 0:new rd(t,u);return new $u(t,{graphics:a,sound:d})};class md{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}class gd{constructor(e){this.renderContext=e;const{general:{colourised:n,soundSettings:o}}=e;this.initFilters(n,e.room.color);const i=o.mute??ft.soundSettings.mute?void 0:x.createGain();this.output={sound:i,graphics:new b({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})}}#e=new b({label:"items"});#n=new b({label:"floorEdge"});output;#t=void 0;#o=new Map;#r=new Map;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Za:Z:new $(Jn(n).main.original)}#i(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of ge(n.items)){let i=this.#r.get(r.id);if(i===void 0){i=pd({...this.renderContext,item:r}),this.#r.set(r.id,i);const s=r.type==="floorEdge"?this.#n:this.#e,{graphics:l,sound:a}=i.output;if(l&&(s.addChild(l),r.fixedZIndex&&(l.zIndex=r.fixedZIndex)),a){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");a.connect(this.output.sound)}}try{i.tick(o)}catch(s){throw new Error(`RoomRenderer caught error while ticking Renderer for item "${r.id}" - item JSON is:
           ${JSON.stringify(r,null,2)}`,{cause:s})}}for(const[r,i]of this.#r.entries())n.items[r]===void 0&&(i.destroy(),this.#r.delete(r))}#s(e){const{order:n}=Mi(_u(this.renderContext.room.items,e.movedItems,this.#o),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);const i=r.output.graphics;if(i)i.zIndex=n.length-o;else throw new Error(`order ${n[o]} was given a z-order by sorting, but item has no graphics`)}}get#a(){return this.#t!==void 0}tick(e){const n=this.#a?e:{...e,movedItems:new Set(ge(this.renderContext.room.items))};this.#i(n),(!this.#a||n.movedItems.size>0)&&this.#s(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Yt=`in vec2 aPosition;
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
`,Kt=`struct GlobalFilterUniforms {
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
}`,bd=`precision highp float;
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
`,vd=`struct CRTUniforms {
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
}`,yd=Object.defineProperty,xd=(t,e,n)=>e in t?yd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Dt=(t,e,n)=>(xd(t,typeof e!="symbol"?e+"":e,n),n);const zi=class Li extends K{constructor(e){e={...Li.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Kt,entryPoint:"mainVertex"},fragment:{source:vd,entryPoint:"mainFragment"}}),o=G.from({vertex:Yt,fragment:bd,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Dt(this,"uniforms"),Dt(this,"seed"),Dt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Dt(zi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let wd=zi;var Sd=`
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
}`,Cd=`struct KawaseBlurUniforms {
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
}`,Td=`
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
`,kd=`struct KawaseBlurUniforms {
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
}`,Id=Object.defineProperty,Pd=(t,e,n)=>e in t?Id(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ye=(t,e,n)=>(Pd(t,typeof e!="symbol"?e+"":e,n),n);const Ei=class $i extends K{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(it("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...$i.DEFAULT_OPTIONS,...n};const o=Ce.from({vertex:{source:Kt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?kd:Cd,entryPoint:"mainFragment"}}),r=G.from({vertex:Yt,fragment:n?.clamp?Td:Sd,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ye(this,"uniforms"),ye(this,"_pixelSize",{x:0,y:0}),ye(this,"_clamp"),ye(this,"_kernels",[]),ye(this,"_blur"),ye(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let l;if(this._quality===1||this._blur===0)l=this._kernels[0]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,n,o,r);else{const a=Me.getSameSizeTexture(n);let c=n,u=a,d;const h=this._quality-1;for(let f=0;f<h;f++)l=this._kernels[f]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;l=this._kernels[h]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,o,r),Me.returnTexture(a)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};ye(Ei,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Od=Ei;var Bd=`in vec2 vTextureCoord;
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
`,_d=`struct AdvancedBloomUniforms {
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
`,Ad=`
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
`,Fd=`struct ExtractBrightnessUniforms {
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
`,Rd=Object.defineProperty,Md=(t,e,n)=>e in t?Rd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ui=(t,e,n)=>(Md(t,typeof e!="symbol"?e+"":e,n),n);const Ni=class Hi extends K{constructor(e){e={...Hi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Kt,entryPoint:"mainVertex"},fragment:{source:Fd,entryPoint:"mainFragment"}}),o=G.from({vertex:Yt,fragment:Ad,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Ui(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Ui(Ni,"DEFAULT_OPTIONS",{threshold:.5});let Dd=Ni;var zd=Object.defineProperty,Ld=(t,e,n)=>e in t?zd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Re=(t,e,n)=>(Ld(t,typeof e!="symbol"?e+"":e,n),n);const Gi=class Vi extends K{constructor(e){e={...Vi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Kt,entryPoint:"mainVertex"},fragment:{source:_d,entryPoint:"mainFragment"}}),o=G.from({vertex:Yt,fragment:Bd,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:we.WHITE}}),Re(this,"uniforms"),Re(this,"bloomScale",1),Re(this,"brightness",1),Re(this,"_extractFilter"),Re(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Dd({threshold:e.threshold}),this._blurFilter=new Od({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Me.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Me.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Me.returnTexture(s),Me.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Re(Gi,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ed=Gi;const $d=W,Ud=(t,e)=>(n,o)=>{const r=new Set;if(ia(n)){const u=he(n)?.items;if(u!==void 0){const d=ce(H(Vt(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const s=o*n.gameSpeed,l=Math.max(1,Math.ceil(s/e)),a=s/l;for(let u=0;u<l;u++){const d=t(n,a);for(const h of d)r.add(h)}const c=he(n)?.items??$d;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},Fe=.33,Nd=sa()==="mobile"?-4:16,An=Ee.h-Ee.w/2,Hd=me.heels;class Gd{constructor(e,n){this.renderContext=e,this.childRenderer=n;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:i}}=e,{edgeLeftX:s,edgeRightX:l,frontSide:a,topEdgeY:c}=Ht(o.roomJson);this.#r=s+a.x,this.#i=l+a.x;const u=(l+s)/2;this.#s={x:r.x/2-u,y:r.y-Nd-a.y-Math.abs(u/2)},this.#n=this.#s.x+this.#r<0,this.#t=this.#s.x+this.#i>r.x,this.#o=this.#s.y+c-An<0;const d=this.childRenderer.output.graphics;if(d===void 0)throw new Error("can't scroll a renderer without graphics");const h={sound:this.childRenderer.output.sound,graphics:new b({children:[d],label:`RoomScrollRenderer(${o.id})`})};(i?.showBoundingBoxes??ft.displaySettings.showBoundingBoxes)!=="none"&&h.graphics.addChild(Vd(e.room.roomJson)),this.output=h}#e=!1;#n;#t;#o;#r;#i;#s;output;tick(e){const{general:{upscale:{gameEngineScreenSize:n},gameState:o}}=this.renderContext,{deltaMS:r}=e,i=je(o);if(i===void 0)return;const s=T(i.state.position),l=U(s,this.#s),a={x:this.#n&&l.x<n.x*Fe?Math.min(-this.#r,n.x*Fe-s.x):this.#t&&l.x>n.x*(1-Fe)?Math.max(n.x-this.#i,n.x*(1-Fe)-s.x):this.#s.x,y:this.#o&&l.y<n.y*Fe?n.y*Fe-s.y:this.#s.y},c=this.output.graphics;if(!this.#e)c.x=a.x,c.y=a.y;else{const d=Hd*r,h=He(c,a),f=Ln(h);if(f>d){const m={x:h.x/f,y:h.y/f};c.x-=m.x*d,c.y-=m.y*d}else c.x=a.x,c.y=a.y}this.#e=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Vd=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Ht(t);return new q().rect(e+o.x,r-An,n-e,o.y-r+An).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")},dr=({crtFilter:t},e)=>[t?new wd({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Ed({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Xd{constructor(e,n){this.app=e,this.gameState=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#i.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,he(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#a(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#i=x.createGain();#s=Ud(Tu,ha);#a(e){w.dispatch(aa(la(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=dr(e,!0),this.#n=dr(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#a(o)}};tick=({deltaMS:e})=>{const n=w.getState(),o=ca(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=w.getState(),l=!o&&!(r?.uncolourised??ft.displaySettings.uncolourised),a=ua(n),c=da(n);(this.#t?.renderContext.general.colourised!==l||this.#t?.renderContext.onScreenControls!==a||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Vc({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:l,upscale:s},inputDirectionMode:c,onScreenControls:a}),this.app.stage.addChild(this.#t.output));const u=he(this.gameState);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=o?$n:this.#s(this.gameState,e),h=he(this.gameState);if(this.#o?.renderContext.room!==h||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o){if(this.#o?.destroy(),h){const f={general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:l,upscale:s},room:h};this.#o=new Gd(f,new gd(f)),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#i)}else this.#o=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#o?.tick({progression:this.gameState.progression,movedItems:d,deltaMS:e}),o?this.app.stage.filters=this.#e:this.app.stage.filters=this.#n};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#i.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Ut.add(Rr,Mr,Dr,zr,Lr,Er,$r,Ur,Nr,Hr,Gr,Xr,Vr,jr,qr,Wr,Jr,Zr,Yr,Kr,Qr);ma.defaultOptions.scaleMode="nearest";const hr=async(t,e)=>{const n=new ai;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=fa;const o=w.getState().gameMenus.currentGame,r=ho({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(pa(o.store.gameMenus)):(w.dispatch(fo(r.characterRooms.head.id)),w.dispatch(fo(r.characterRooms.heels.id)));const i=new Xd(n,r).start();return{campaign:t,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const l=je(r);l!==void 0&&Gn({playableItem:l,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return he(r)},get gameState(){return r},reincarnateFrom(s){ho({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Kd=Object.freeze(Object.defineProperty({__proto__:null,default:hr,gameMain:hr},Symbol.toStringTag,{value:"Module"}));export{oi as A,ei as C,K as F,qn as R,Aa as S,ri as V,za as a,Kd as g,_a as u};
