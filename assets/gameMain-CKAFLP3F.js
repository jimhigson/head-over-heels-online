const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-Dt0hh8xv.js","assets/App-DVt5WKrM.js","assets/index-DLVQeYnA.js","assets/index-BtRtUubV.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-BTFxM9QP.js","assets/Graphics-DQ9mdKzy.js","assets/changeCharacterRoom-nboRqpj0.js","assets/WebGLRenderer-UorHh25E.js"])))=>i.map(i=>d[i]);
import{b3 as ji,b4 as dr,b5 as qi,am as Wi,aq as Ce,ar as G,ae as hr,an as we,Z as T,a2 as Ut,a0 as Ji,a3 as v,d as rt,v as Dt,aG as y,a6 as gn,ay as pe,_ as Ke,$ as Zi,V as Yi,b6 as Ki,b7 as Qi,b8 as es,ad as ts,b9 as q,ba as eo,K as _,bb as ns,bc as le,bd as F,be as Fn,s as $e,M as w,o as H,c as B,bf as os,bg as rs,bh as is,g as D,w as Ue,bi as ss,bj as An,bk as fr,bl as as,bm as ls,bn as cs,bo as Bt,H as oe,bp as Rn,bq as I,br as de,bs as Nt,R as ut,bt as _t,bu as us,bv as ds,bw as hs,bx as to,by as fs,bz as ps,bA as ms,i as ce,bB as zt,S as Ne,bC as Ht,bD as gs,l as L,bE as Gt,bF as me,bG as dt,bH as Mn,j as J,bI as He,bJ as U,bK as Dn,bL as Ee,bM as et,bN as zn,t as Te,p as Ln,bO as pr,bP as bs,bQ as vs,a_ as he,bR as ys,bS as xs,I as it,bT as Ft,e as mr,bU as ke,bV as En,bW as ws,bX as gr,k as br,bY as vr,bZ as Vt,b_ as no,b$ as yr,c0 as Ss,c1 as ht,c2 as Ge,c3 as Xt,x as Ie,c4 as bn,c5 as Cs,c6 as Ts,c7 as ks,c8 as Is,A as Ve,c9 as Os,ca as Ps,cb as Bs,cc as vn,cd as _s,ce as Fs,cf as gt,f as $n,cg as As,ch as Rs,ci as Ms,m as Oe,C as xr,cj as oo,h as ge,ck as Un,r as wr,a as Sr,n as Ds,a$ as Xe,cl as Qt,cm as bt,cn as zs,co as Ls,cp as qe,cq as ro,cr as Es,cs as $s,ct as Us,cu as Ns,cv as Hs,cw as Gs,cx as Vs,cy as Xs,cz as js,cA as qs,cB as io,L as so,cC as Cr,b2 as Tr,E as kr,F as Ws,B as ao,cD as Js,cE as Zs,cF as Ys,cG as Ks,cH as Qs,cI as ea,cJ as x,cK as yn,cL as Ir,q as ta,cM as st,cN as en,J as lo,cO as na,cP as oa,cQ as ra,cR as ia,aw as Me,cS as sa,cT as aa,cU as la,cV as ca,cW as ua,cX as da,cY as ha,cZ as fa,c_ as co,c$ as pa,N as uo,d0 as ma}from"./App-DVt5WKrM.js";import{f as xn,c as Nn,a as ga,m as jt,b as Hn,d as Or,r as ba,o as va}from"./changeCharacterRoom-nboRqpj0.js";import{S as ya,G as W}from"./Graphics-DQ9mdKzy.js";import{g as Pr,_ as ho}from"./index-DLVQeYnA.js";var vt={},fo;function xa(){if(fo)return vt;fo=1;var t=ji(),e=t.mark(i),n=dr(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){b.next=8;break}return h=d[u],b.delegateYield(r(h),"t0",5);case 5:u++,b.next=2;break;case 8:case"end":return b.stop()}},e)}vt.__concat=i;var s=o(i);return vt.concat=s,vt}var yt={},po;function wa(){if(po)return yt;po=1;var t=dr(),e=t.iterableCurry,n=qi(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}yt.__isEmpty=i;var s=e(i,{reduces:!0});return yt.isEmpty=s,yt}var tn,mo;function Sa(){return mo||(mo=1,tn=xa().concat),tn}var Ca=Sa();const go=Pr(Ca);var nn,bo;function Ta(){return bo||(bo=1,nn=wa().isEmpty),nn}var ka=Ta();const Ia=Pr(ka),Br=class wn extends Wi{constructor(e){e={...wn.defaultOptions,...e},super(e),this.enabled=!0,this._state=ya.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=Ce.from(n)),o&&(s=G.from(o)),new wn({gpuProgram:i,glProgram:s,...r})}};Br.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let K=Br;var Oa=`
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
`,Ba=`
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
}`;class A extends K{constructor(e){const n=e.gpu,o=vo({source:Ba,...n}),r=Ce.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=vo({source:Oa,...i}),a=G.from({vertex:Pa,fragment:s}),l=new hr({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:we.EMPTY}})}}function vo(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const Gn=`
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
    `,Vn=`
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
	`;class _r extends A{constructor(){super({gl:{functions:`
                ${Gn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Vn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}_r.extension={name:"color",type:T.BlendMode};class Fr extends A{constructor(){super({gl:{functions:`
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
            `}})}}Fr.extension={name:"color-burn",type:T.BlendMode};class Ar extends A{constructor(){super({gl:{functions:`
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
                `}})}}Ar.extension={name:"color-dodge",type:T.BlendMode};class Rr extends A{constructor(){super({gl:{functions:`
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
                `}})}}Rr.extension={name:"darken",type:T.BlendMode};class Mr extends A{constructor(){super({gl:{functions:`
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
            `}})}}Mr.extension={name:"difference",type:T.BlendMode};class Dr extends A{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"divide",type:T.BlendMode};class zr extends A{constructor(){super({gl:{functions:`
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
            `}})}}zr.extension={name:"exclusion",type:T.BlendMode};class Lr extends A{constructor(){super({gl:{functions:`
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
                `}})}}Lr.extension={name:"hard-light",type:T.BlendMode};class Er extends A{constructor(){super({gl:{functions:`
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
            `}})}}Er.extension={name:"hard-mix",type:T.BlendMode};class $r extends A{constructor(){super({gl:{functions:`
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
            `}})}}$r.extension={name:"lighten",type:T.BlendMode};class Ur extends A{constructor(){super({gl:{functions:`
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
                `}})}}Ur.extension={name:"linear-burn",type:T.BlendMode};class Nr extends A{constructor(){super({gl:{functions:`
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
            `}})}}Nr.extension={name:"linear-dodge",type:T.BlendMode};class Hr extends A{constructor(){super({gl:{functions:`
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
            `}})}}Hr.extension={name:"linear-light",type:T.BlendMode};class Gr extends A{constructor(){super({gl:{functions:`
                ${Gn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Vn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Gr.extension={name:"luminosity",type:T.BlendMode};class Vr extends A{constructor(){super({gl:{functions:`
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
            `}})}}Vr.extension={name:"negation",type:T.BlendMode};class Xr extends A{constructor(){super({gl:{functions:`
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
                `}})}}Xr.extension={name:"overlay",type:T.BlendMode};class jr extends A{constructor(){super({gl:{functions:`
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
                `}})}}jr.extension={name:"pin-light",type:T.BlendMode};class qr extends A{constructor(){super({gl:{functions:`
                ${Gn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Vn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}qr.extension={name:"saturation",type:T.BlendMode};class Wr extends A{constructor(){super({gl:{functions:`
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
                `}})}}Wr.extension={name:"soft-light",type:T.BlendMode};class Jr extends A{constructor(){super({gl:{functions:`
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
                `}})}}Jr.extension={name:"subtract",type:T.BlendMode};class Zr extends A{constructor(){super({gl:{functions:`
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
                `}})}}Zr.extension={name:"vivid-light",type:T.BlendMode};const Sn=[];Ut.handleByNamedList(T.Environment,Sn);async function _a(t){if(!t)for(let e=0;e<Sn.length;e++){const n=Sn[e];if(n.value.test()){await n.value.load();return}}}let We;function Fa(){if(typeof We=="boolean")return We;try{We=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{We=!1}return We}var Yr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Yr||{});class Aa{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Ra=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Kr=class Qr extends Ji{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Ra,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await _a(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Qr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof v&&(o={container:o},n&&(rt(Dt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:y.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Yr.ALL);const{clear:o,clearColor:r,target:i}=e;y.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Aa(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Fa())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Kr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let ei=Kr,xt;function Ma(t){return xt!==void 0||(xt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??ei.defaultOptions.failIfMajorPerformanceCaveat};try{if(!gn.get().getWebGLRenderingContext())return!1;let o=gn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),xt}let wt;async function Da(t={}){return wt!==void 0||(wt=await(async()=>{const e=gn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),wt}const yo=["webgl","webgpu","canvas"];async function za(t){let e=[];t.preference?(e.push(t.preference),yo.forEach(i=>{i!==t.preference&&e.push(i)})):e=yo.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Da()){const{WebGPURenderer:a}=await ho(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-Dt0hh8xv.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&Ma(t.failIfMajorPerformanceCaveat??ei.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await ho(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-UorHh25E.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const ti="8.8.1";class ni{static init(){globalThis.__PIXI_APP_INIT__?.(this,ti)}static destroy(){}}ni.extension=T.Application;class La{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,ti)}destroy(){this._renderer=null}}La.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"initHook",priority:-10};const oi=class Cn{constructor(...e){this.stage=new v,e[0]!==void 0&&rt(Dt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await za(e),Cn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return rt(Dt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=Cn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};oi._plugins=[];let ri=oi;Ut.handleByList(T.Application,ri._plugins);Ut.add(ni);var Ea=`in vec2 aPosition;
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
`,$a=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,xo=`struct GlobalFilterUniforms {
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
}`;const ii=class si extends K{constructor(e){e={...si.defaultOptions,...e};const n=Ce.from({vertex:{source:xo,entryPoint:"mainVertex"},fragment:{source:xo,entryPoint:"mainFragment"}}),o=G.from({vertex:Ea,fragment:$a,name:"alpha-filter"}),{alpha:r,...i}=e,s=new hr({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ii.defaultOptions={alpha:1};let Ua=ii;class at extends pe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof we?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ke.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ke.shared.add(this.update,this,Zi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(we.from(e[o]));return new at(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(we.from(e[o]));return new at(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof we)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ke.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ke.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Na extends Yi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Ki({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Ha(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(rt(Dt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Ga extends Na{constructor(...e){const n=Ha(e,"Text");super(n,Qi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=es.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Xn extends we{static create(e){return new Xn({source:new ts(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Se=t=>{const[e,n,o]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:o/2})},X={original:new y(q.zxWhite),basic:g.white,dimmed:g.lightGrey},j={original:new y(q.zxYellow),basic:g.midRed,dimmed:g.redShadow},Q={original:new y(q.zxMagenta),basic:g.pink,dimmed:Se(g.pink)},R={original:new y(q.zxCyan),basic:g.pastelBlue,dimmed:Se(g.pastelBlue)},ee={original:new y(q.zxGreen),basic:g.moss,dimmed:Se(g.moss)},jn={white:{basic:{main:X,edges:{towards:R,right:j},hud:{lives:j,dimmed:Q,icons:R}},dimmed:{main:X,edges:{towards:ee,right:R},hud:{lives:j,dimmed:Q,icons:R}}},yellow:{basic:{main:j,edges:{towards:ee,right:X},hud:{lives:R,dimmed:Q,icons:ee}},dimmed:{main:j,edges:{towards:R,right:R},hud:{lives:R,dimmed:Q,icons:ee}}},magenta:{basic:{main:Q,edges:{towards:ee,right:R},hud:{lives:X,dimmed:R,icons:j}},dimmed:{main:Q,edges:{towards:ee,right:R},hud:{lives:X,dimmed:R,icons:j}}},cyan:{basic:{main:R,edges:{towards:Q,right:X},hud:{lives:X,dimmed:ee,icons:j}},dimmed:{main:R,edges:{towards:Q,right:X},hud:{lives:X,dimmed:ee,icons:j}}},green:{basic:{main:ee,edges:{towards:R,right:j},hud:{lives:X,dimmed:Q,icons:R}},dimmed:{main:ee,edges:{towards:R,right:j},hud:{lives:X,dimmed:Q,icons:R}}}},qn=t=>jn[t.hue][t.shade],De={head:g.pastelBlue,heels:g.pink},At=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+eo>n?100-Math.ceil((n-e)/(eo/100)):0},ai=t=>t.type==="headOverHeels"?At(t.state.head)>0||At(t.state.heels)>0:At(t.state)>0,Wn=t=>{const e=100*_.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/_.w):0},Va={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},ft=`in vec2 aPosition;
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
`,Xa=`in vec2 vTextureCoord;
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
`;class ve extends K{constructor(e){const n=Object.keys(e).length,o=G.from({vertex:ft,fragment:Xa.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const ja=`precision mediump float;
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
`;class N extends K{uniforms;constructor(e="white"){const n=G.from({vertex:ft,fragment:ja,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const qa=`precision mediump float;
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
`;class Wa extends K{constructor(){const e=G.from({vertex:ft,fragment:qa,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const li=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),ci=t=>li(jn[t.color.hue][t.color.shade].main),ui=t=>new ve({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&ci(t)}),Ja=new ve({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Za=t=>new ve({replaceLight:t,replaceDark:Se(t)}),Tn=(t,e,n)=>n?new ve(li(jn[t.color.hue][t.color.shade].edges[e])):new N(qn(t.color).edges[e].original),be=t=>new ve(ci(t)),wo=new Wa,Z=ns,Ya=new ve(Va),So={x:.5,y:1},Co=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),kn=t=>{if(typeof t=="string")return kn({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(Co(t)?c=Ka(t):c=new pe(le().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...a},d=new v({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let m=1;m<=u.z;m++){const b={...t,label:`(${h},${f},${m})`};delete b.times;const k=kn(b),O=F({x:h-1,y:f-1,z:m-1});k.x+=O.x,k.y+=+O.y,d.addChild(k)}return d}if(e===void 0&&o===void 0)if(Co(t))c.anchor=So;else{const u=le().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=So}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=kn;function Ka({animationId:t,reverse:e,playOnce:n,paused:o}){const r=le().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:Fn}));e&&s.reverse();const a=new at(s);return a.animationSpeed=$e.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Qa=`#version 300 es

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
`;class lt extends K{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=G.from({vertex:ft,fragment:Qa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ne=new lt({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),tt=new N,To=new N,Jn=new N,ko=new N(g.moss),nt=new N,te=[tt,ne],el=[nt,ne],tl=[ne,Jn],St={original:[ne,nt],colourised:{head:{active:[ne,new N(De.head)],inactive:[ne,new N(Se(De.head))]},heels:{active:[ne,new N(De.heels)],inactive:[ne,new N(Se(De.heels))]}}},Pe=14,nl=2,ol=Math.cos(30*(Math.PI/180)),rl=40;class il{constructor(e){this.renderContext=e;const{inputDirectionMode:n,general:{colourised:o}}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Pe,y:-14,filter:te}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Pe,y:Pe,filter:te}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Pe,filter:te}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:te}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Pe*Math.SQRT2,filter:te}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Pe*Math.SQRT2,filter:te}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:te}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:te})}:{}},this.output.addChild(this.#e),this.output.addChild(new W().circle(0,0,rl).fill("#00000000"));for(const r of H(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=o?Z:tt}output=new v({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=B};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=os(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=rs({x:-c,y:-u}),h=is(d,ol),f=D(h,nl);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Ue(e)>ss?An(e):void 0;for(const[r,i]of fr(this.arrowSprites))i.filters=r===o?el:te}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const In={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:q.zxBlue,fire:q.zxYellow,carry:q.zxGreen,carryAndJump:q.zxRed,menu:q.zxWhite,map:q.zxWhite}};function Lt(t,e){const n=e||new v;for(const o of t)n.addChild(o);return n}function*sl(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=as(e);let o=0;for(const r of e){const i=`hud.char.${cs(r)}`;try{ls(i)}catch(s){throw new Error(`no texture id for char "${r}": ${s.message}`,{cause:s})}yield p({textureId:i,x:(o+.5-n/2)*Bt.w}),o++}}const se=(t,e)=>{t.removeChildren();try{Lt(sl(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Qe=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new v({label:n,filters:e?tl:Jn,scale:{x:1,y:t?2:1}}),Et=Symbol(),di=Symbol(),hi=Symbol(),Ct=({colourised:t,button:{which:e}})=>{const n=new v({label:"depress"}),o=new v({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Za(In.colourised[e]):o.filters=new N(In.zx[e]),n.addChild(r);const i=new v({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[di]=r,o[Et]=i,o[hi]=n,o},Je=(t,...e)=>{t[Et].removeChildren();for(const n of e)n!==void 0&&t[Et].addChild(n)},Tt=(t,e)=>{t[di].texture=le().textures[e?"button.pressed":"button"],t[hi].y=e?1:0},Io=(t,e,n)=>{n&&(t[Et].filters=e?ui():Z)},Oo=({which:t},e,n)=>{const o=se(new v,n);return o.filters=new ve({white:e?Se(In.colourised[t]):g.pureBlack}),o};class fi{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new v({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&this.output.removeChild(this.#e.output),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const al=(t,e,n)=>{const r=le().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&le().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},pi=(t,e)=>{const n=e.getLocalBounds(),o=Xn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new pe({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},qt=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof pe?r:pi(t,r)},Be=t=>M(({renderContext:{item:e}})=>Rn(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),re=t=>M(({renderContext:{item:e,general:{pixiRenderer:n}}})=>{if(Rn(e))return qt(n,t,e.config.times);{const o=p(t);return o instanceof pe?o:pi(n,o)}}),M=t=>({renderContext:e,currentRendering:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:oe}:"no-update",ie=t=>({renderContext:{general:{pixiRenderer:e},item:n},currentRendering:o})=>{if(o===void 0){const r=Rn(n)?n.config.times:void 0,i={output:qt(e,t(n.config),r),renderProps:oe};return r&&(i.output.y-=((r.z??1)-1)*_.h),i}else return"no-update"};function*ll({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Nt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,..._t(a,{y:-12*n})});l.filters=Tn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",..._t(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",..._t(a,{y:-l*_.h})})}}yield*s(F({...de,[r]:1})),yield*s(de),e||(yield p({pivot:{x:16,y:_.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...F({...de,[r]:1})}))}const mi=(t,e)=>{const n=Nt(t),o=ut(n),r=8;return t==="towards"||t==="right"?I({[o]:e[o]-r}):de},cl=M(({renderContext:{item:t,room:e}})=>Lt(ll(t,e),new v({filters:be(e),...mi(t.config.direction,t.aabb)}))),ul=M(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,general:{gameState:{campaign:i}}}})=>{const s=Nt(t),a=i.rooms[n];return p({textureId:al(r,s,e),filter:be(a),...mi(t,o)})}),on={animationId:"bubbles.cold"},ze=({top:t,bottom:e="homingBot",filter:n})=>{const o=new v({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},gi=Symbol(),bi=Symbol(),dl=({top:t,bottom:e})=>{const n=new v;return n.addChild(e),t.y=-12,n.addChild(t),n[gi]=t,n[bi]=e,n},hl=`#version 300 es

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
`;class $t extends K{constructor(e){const n=G.from({vertex:ft,fragment:hl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const ot=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<us},Wt=t=>t,On=.02,fl=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(o==="out")return{animationId:`${t}.fadeOut`,paused:i};if(o==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:r<On?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`,paused:i};if(e==="falling"){const a=`${t}.falling.${n}`;if(ps(a))return{textureId:a}}const s=`${t}.idle.${n}`;return ms(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},Pn=Symbol(),Bn=Symbol(),pl=(t,e)=>{t[Pn].removeChildren(),t[Pn].addChild(p(fl(e)))},vi=new ve({pastelBlue:g.pink}),rn=(t,e,n)=>{const o=new v,r=new v;o[Pn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?vi:Z,flipX:t==="heels"});return o[Bn]=i,o},Po=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+hs>t,ml=t=>{if(!ot(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%to<to*fs},Bo=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},_o=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?Z:t.filters},gl=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Bo(r,new lt({outlineColor:De[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&_o(r,lt);const s=o?.flashing??!1;n&&!s?Bo(r,new $t(De[t])):!n&&s&&_o(r,$t)},bl=(t,e,n)=>{e&&!n?t.addChild(t[Bn]):!e&&n&&t.removeChild(t[Bn])},sn=(t,e,n,o,r,i)=>{n&&pl(e,{name:t,...o,paused:r}),gl(t,o,i,e),bl(e,o.shining,i?.shining??!1)},vl=({renderContext:{item:t,general:{gameState:e,paused:n}},currentRendering:o})=>{const{type:r,state:{action:i,facing:s,teleporting:a,vels:{gravity:{z:l}}}}=t,c=o?.renderProps,u=o?.output,d=An(s)??"towards",h=t.type==="headOverHeels"?Po(t.state.head,"headOverHeels","headOverHeels"):Po(t.state,t.type,e.currentCharacterName),f=ml(t),m=ai(t),b=Ue(s),k=a?.phase??null,O={action:i,facingXy8:d,teleportingPhase:k,flashing:f,highlighted:h,shining:m,gravityZ:l},S=c===void 0||c.action!==i||c.facingXy8!==d||c.teleportingPhase!==k||c?.gravityZ>On!=l>On;let C;if(r==="headOverHeels"){C=u??dl({top:rn("head",!0,n),bottom:rn("heels",!0,n)});const P=C;sn("head",P[gi],S,O,n,c),sn("heels",P[bi],S,O,n,c)}else C=u??rn(r,!1,n),sn(r,C,S,O,n,c);return i==="moving"&&u instanceof at&&(u.animationSpeed=b*ds),{output:C,renderProps:O}},an=Wt(vl),yl=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new v({label:"floorOverdraws",...F({x:-e.x,y:-e.y})}),r=Lt(ce(zt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...F(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new v({label:"floorOverdraws"})),i=Lt(ce(zt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...F(_t(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...F({...l,z:0}),times:{[ut(Ne(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new v({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},xl=t=>[...ce(H(t.items)).filter(e=>e.type==="wall").filter(e=>Ne(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],wl=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Sl=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new W().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(F),!0).fill(0),Cl=M(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Ht(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:h},roomJson:f}=t,m=new v({label:`floor(${t.id})`});if(d!=="none"){const S=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,C=new v;for(let z=-1;z<=r+2;z++)for(let V=z%2-1;V<=i+2;V+=2)C.addChild(gs({x:z+(s.right?-.5:0),y:V+(s.towards?-.5:0)},p({textureId:S})));C.addChild(yl(f,{x:n,y:o}));const P=new W().poly([de,F({x:c,y:0}),F({x:c,y:u}),F({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});C.addChild(P),C.filters=be(t),C.mask=P,m.addChild(C)}const b=xl(f),k=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(k);const O=wl(b);if(O!==void 0){const S=Sl({extraWallRanges:O,blockXMin:n,blockYMin:o});m.addChild(S)}return m.mask=k,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Tl=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=F({x:-t,y:-e}),i={towards:new v({label:"towards",...r}),right:new v({label:"right",...r})};return ce(zt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:s,textureId:`floorEdge.${l}`,...F(h),times:a.type==="wall"?a.config.times:{[ut(Ne(l))]:2}});i[l].addChild(f),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...F(L(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...F(L(h,{x:-.5}))}))}),i},kl=M(({renderContext:{general:{colourised:t},room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Ht(e.roomJson),l=r-n,c=i-o,u=new v({label:"floorEdge"}),d=new W({label:"overDrawToHideFallenItems"}).poly([F({x:l,y:0}),F({x:0,y:0}),F({x:0,y:c}),{...F({x:0,y:c}),y:999},{...F({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=Tl({blockXMin:n,blockYMin:o},e.roomJson);h.filters=Tn(e,"towards",t),f.filters=Tn(e,"right",t),u.addChild(h),u.addChild(f);const m=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Il=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Ol=({renderContext:{item:{config:t,state:e},room:n,general:{paused:o}},currentRendering:r})=>{const i=r?.renderProps,{activated:s,busyLickingDoughnutsOffFace:a}=e,l=a?Ja:s?void 0:Il.includes(t.which)?ui(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const c=Gt(e.facing)??"towards";if(!(i===void 0||s!==i.activated||a!==i.busyLickingDoughnutsOffFace||c!==i.facingXy4))return"no-update";const d={facingXy4:c,activated:s,busyLickingDoughnutsOffFace:a};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${c}`,filter:l}),renderProps:d};case"elephantHead":return{output:p({textureId:`elephant.${c}`,filter:l}),renderProps:d};case"turtle":return{output:p(s&&!a?{animationId:`${t.which}.${c}`,filter:l,paused:o}:{textureId:`${t.which}.${c}.1`,filter:l}),renderProps:d};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?ze({top:{textureId:`${t.which}.${c}`,filter:l||be(n)},bottom:{...on,paused:o}}):p({textureId:`${t.which}.${c}`,filter:l}),renderProps:d};case"computerBot":case"elephant":case"monkey":return{output:ze({top:`${t.which}.${c}`,filter:l}),renderProps:d};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(i===void 0||a!==i.busyLickingDoughnutsOffFace||s!==i.activated))return"no-update";const u={activated:s,busyLickingDoughnutsOffFace:a};switch(t.which){case"helicopterBug":case"dalek":return{output:p(s&&!a?{animationId:t.which,filter:l,paused:o}:{textureId:`${t.which}.1`,filter:l}),renderProps:u};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:u};case"bubbleRobot":return{output:ze({top:{...on,paused:o},filter:l}),renderProps:u};case"emperorsGuardian":return{output:ze({top:"ball",bottom:{...on,paused:o},filter:l}),renderProps:u};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},Pl=me.floatingText,Bl=12,Fo=_.h*3,Ao=[g.shadow,g.midGrey,g.redShadow,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],Ro=[...Ao,...new Array(20).fill(g.white),...Ao.toReversed()],_l=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},general:{displaySettings:{uncolourised:o}}},currentRendering:r})=>{const i=r?.output;let s;const l=(n-e)*Pl;if(i===void 0){s=new v({filters:new lt({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=se(new v({label:u,y:c*Bl,filters:o?Z:new N(g.pink)}),u.toUpperCase());s.addChild(d)}}else s=i;for(let c=0;c<t.length;c++){const u=s.children[c],[d]=u.filters,h=l+c*-12,f=h>0&&h<Fo;if(u.visible=f,f&&d){const m=Math.floor(h/Fo*Ro.length);d.targetColor=Ro[m]}}return s.y=-l,{output:s,renderProps:oe}},pt=t=>{for(const e in t)return!0;return!1},Mo=500,Fl=$e.animations["conveyor.x"].animationSpeed,Do=$e.animations["conveyor.x"].length,Al=t=>1-(1-t)**2,Rl=(t,e)=>{for(let n=0;n<t.children.length;n++){const o=t.children[n],r=n%Do;o.gotoAndStop(e?Do-r-1:r)}return t},Ml=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:o}},currentRendering:r})=>{const i=r?.renderProps,s=pt(n),a=(!s&&i?.moving?o:i?.roomTimeStoppedMoving)??dt,l=Ne(t),c=r?.output??Rl(p({animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),u=s?0:Math.min(o-a,Mo),d=Math.max(0,1-u/Mo);for(const h of c.children)if(d===0)h.stop();else{const f=Fl*Al(d);h.play(),h.animationSpeed=f}return{output:c,renderProps:{moving:s,roomTimeStoppedMoving:a}}},Dl=Wt(Ml),Y={movementType:"steady"},je=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Mn(w.getState(),t),zl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&J("teleporter")(l)&&je(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:xn}}}:Y;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Nn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:xn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Ll=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=t,s=o?.renderProps,a=je(t),l=a&&He(r,e).find(U)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:l?new v({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:a?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:a}}:"no-update"},El=({renderContext:{item:{state:{facing:t}}},currentRendering:e})=>{const n=e?.renderProps,o=Gt(t)??"towards";return n===void 0||o!==n.facingXy4?{output:ze({top:`charles.${o}`}),renderProps:{facingXy4:o}}:"no-update"},$l=({renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:e}},general:{paused:n}},tickContext:{lastRenderRoomTime:o},currentRendering:r})=>{const i=r?.renderProps,s=pt(t);let a;return r?.output?a=r?.output:(a=p({animationId:"spring.bounce"}),a.loop=!1,a.gotoAndStop(0)),o!==void 0&&e>o&&!s&&!n?a.gotoAndPlay(0):s&&!(i?.compressed??!1)&&a.gotoAndStop(1),{output:a,renderProps:{compressed:s}}},Ul=Wt($l),Nl=({renderContext:{item:{config:{which:t,startDirection:e}}},currentRendering:n})=>n?.renderProps===void 0?{output:t==="headOverHeels"?ze({top:{textureId:`head.walking.${e}.2`},bottom:{textureId:`heels.walking.${e}.2`}}):p({textureId:`${t}.walking.${e}.2`}),renderProps:oe}:"no-update",Hl=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},general:{paused:n}},tickContext:{deltaMS:o},currentRendering:r})=>{const s=(r?.renderProps?.distanceTravelled??0)+Dn(t)*(n?0:o),l=r?.output??p("spikyBall.1"),u=(Math.floor(s*2/Ee.w)+e)%2+1;return l.texture=le().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:s}}},Gl=Wt(Hl),Vl=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,Xl=M(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=ut(Ne(e)),i=new v({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:Vl(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ee.w,y:Ee.h+1}:{x:0,y:Ee.h+1},filter:be(o)}),l=F({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),jl=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const o=n?.renderProps,r=e.type==="in-store"?Mn(w.getState(),e.path)?"right":"left":t;return o===void 0||r!==o.setting?{output:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},ql=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Wl=({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentRendering:r})=>{const i=r?.renderProps;return i===void 0||i.disappear!==n?{output:p({textureId:ql(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?be(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},Jl=()=>M(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Zl={head:an,heels:an,headOverHeels:an,doorFrame:ul,doorLegs:cl,monster:Ol,floatingText:_l,wall:Xl,barrier:M(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:M(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?be(n):void 0,times:e})),spikes:Be("spikes"),slidingDeadly:Gl,slidingBlock:Jl(),block:Wl,switch:jl,conveyor:Dl,lift:M(({renderContext:{general:{paused:t}}})=>{const e=new v,n={x:et.w/2,y:et.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter:Ll,sceneryCrown:M(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:M(({renderContext:{item:{config:t},room:e,general:{paused:n}}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:be(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Be("fish.1"),charles:El,joystick:Be("joystick"),movingPlatform:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),spring:Ul,sceneryPlayer:Nl,hushPuppy:Be("hushPuppy"),bubbles:M(({renderContext:{item:{config:{style:t}},general:{paused:e}}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Be({animationId:"bubbles.doughnut"}),ball:Be("ball"),floor:Cl,floorEdge:kl,particle:M(({renderContext:{item:{config:{forCharacter:t}}}})=>p({animationId:"particle.fade",anchor:{x:.5,y:.5},filter:t==="heels"?vi:Z}))},yi=t=>{if(t.type==="wall"){const{direction:e}=t.config;if(e==="right"||e==="towards")return}return Zl[t.type]},xi=(t,e,n)=>{const o=yi(t);if(!n.room)return;const r=o({renderContext:{general:e.general,item:t,room:n.room},tickContext:{lastRenderRoomTime:dt,movedItems:zn,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Yl=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},zo=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Yl(t,e,n,o),Zn=(t,e,n=.001)=>{if(!Te(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:Ln({state:{position:L(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+pr},id:t.id},{state:{position:L(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},wi=(t,e)=>{const o=[...ce(e).filter(i=>Zn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=ga(s,i);return a<0||a===0&&zo(t,s)>zo(t,i)?s:i})};function Si({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(ai(e)||ot(e)||(e.state.action="death",e.state.expires=t+xn))}const ue=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,ct=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Kl=3e3,Ci=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0);const d=(h,f=r)=>{const m=mr(o),b={type:"floatingText",id:`floatingText-${i}`,...gr,fixedZIndex:ws,aabb:B,state:{...En(),position:L(m,{z:_.h/2}),expires:c+Kl},config:{textLines:h,appearanceRoomTime:c}};ke({room:f,item:b})};switch(s.gives){case"hooter":{const h=Ft(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=Ft(n);h!==void 0&&(h.doughnuts=ue(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=it(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=Ft(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=it(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ue(n.state.head.lives,2),n.state.heels.lives=ue(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=ue(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(xs(s.page));break;case"reincarnation":{const h=vs(e,w.getState(),i),f=he(h.gameState);if(!f)throw new Error("how are we saving from a pickup if there is no current room?");d(["reincarnation","point","restored"],f),w.dispatch(ys(h)),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(bs(s.planet)),d([s.planet,"liberated!"]);break}}},Ql=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;br(i,o)<=0||e.state.action!=="death"&&Nn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},ec=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Nt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=L(t.state.position,s)};function tc({movingItem:t}){t.state.autoWalk=!1}const ae=(t,...e)=>J(...e)(t.touchedItem),Ze=(t,...e)=>J(...e)(t.movingItem),Ti=t=>U(t.movingItem),nc=t=>U(t.touchedItem),oc=t=>vr(t.touchedItem),Lo=t=>{switch(!0){case ae(t,"stopAutowalk"):tc(t);break;case oc(t):Si(t);break;case ae(t,"portal"):Ql(t);break;case ae(t,"pickup"):Ci(t);break;case ae(t,"doorFrame"):ec(t);break}},Yn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Vt(e.items);if(r!==void 0)return ot(r)?void 0:r;const i=n===void 0||ot(n)||n.state.action==="death"?void 0:no(n.state.position,t),s=o===void 0||ot(o)||o.state.action==="death"?void 0:no(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ki=150,Ii=t=>t[Math.floor(Math.random()*t.length)],fe=Object.freeze({movementType:"vel",vels:{walking:B}}),Jt=t=>yr(t)?me[t.config.which]:me[t.type],Eo=_.w/2,rc=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=me.homingBot;if(!Xt(e,de))return{movementType:"steady"};for(const s of H(Vt(n.items))){if(s===void 0)continue;const a=ht(s.state.position,t);if(Math.abs(a.y)<Eo)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Eo)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ic=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return fe;const l=Yn(r,e);if(l===void 0||s+ki>e.roomTime)return Y;const c=ht(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>_.w/4?u:ut(u),h=Jt(t),f={...B,[d]:c[d]>0?h:-h},m=Ge(f),b=!Xt(m,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:m,...b?{timeOfLastDirectionChange:e.roomTime}:oe}}},$o=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return fe;const a=Yn(i,e);if(a===void 0)return fe;const l=a.state.position,c=_.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return fe;const d=ht(a?.state.position,i),h=Jt(t),f=(1+Math.sqrt(2))/2,m=h*f,b=D({...d,z:0},m/Dn(d)*(r?-1:1));return{movementType:"vel",vels:{walking:b},stateDelta:{facing:Ge(b)}}},ln=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return fe;if(!(Ie(i,B)||Math.random()<o/1e3))return Y;const l=Ii(r);return{movementType:"vel",vels:{walking:D(bn[l],Jt(t))},stateDelta:{facing:bn[l]}}},sc=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?fe:Xt(i,de)?{movementType:"vel",vels:{walking:D(r,Jt(t))}}:Y},Uo=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=Ii([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},cn=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ki))return;const u=jt(i,c,e,n);u.x===0&&u.y===0||(t.state.vels.walking=Uo(s,u,r),t.state.facing=Uo(l,u,r),t.state.durationOfTouch=0)},ac=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=B)},lc=(t,e,n,o)=>{if(!t.state.activated||yr(t)&&t.state.busyLickingDoughnutsOffFace)return fe;switch(t.config.movement){case"patrol-randomly-diagonal":return ln(t,e,n,o,ks);case"patrol-randomly-xy8":return ln(t,e,n,o,Ts);case"patrol-randomly-xy4":return ln(t,e,n,o,Cs);case"towards-tripped-on-axis-xy4":return rc(t,e);case"towards-on-shortest-axis-xy4":return ic(t,e);case"back-forth":case"clockwise":return sc(t);case"unmoving":return fe;case"towards-analogue":return $o(t,e);case"towards-analogue-unless-planet-crowns":return $o(t,e,n,o,Ss(w.getState()));default:throw t.config,new Error("this should be unreachable")}},cc=t=>{const{movingItem:e,touchedItem:n}=t;if(Te(n,e))switch(e.config.movement){case"patrol-randomly-xy4":cn(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":cn(t,"opposite");break;case"clockwise":cn(t,"clockwise");break;case"towards-tripped-on-axis-xy4":ac(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},uc=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s],switchedAtRoomTime:n.roomTime,switchedSetting:s})}break}case"in-store":{w.dispatch(Is(o.path));break}}},dc=({movingItem:t,touchedItem:e})=>{if(!Te(t))return;const{state:{position:n},aabb:o}=e,r=jt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=Ge(r),s=D(i,-.05);return e.state.vels.sliding=s,!1},hc=({movingItem:t,touchedItem:e})=>{if(!Te(e))return;const n=t.state.vels.sliding;if(Ie(n,B))return;const{state:{position:o},aabb:r}=t,i=jt(e.state.position,e.aabb,o,r);return br(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=B),!1},fc=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=jt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Ge(c);for(const d of s){const h=e.items[d],f=D(u,-.025*o);h.state.facing=f,Hn({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:i})}},pc=1e3/12,kt=t=>{const e=t-_s,o=e/Fs*Fn;return(e+.5*vn*o**2)/o},mc={head:kt(gt.head),headOnSpring:kt(gt.head+_.h),heels:kt(gt.heels),heelsOnSpring:kt(gt.heels+_.h)},No=(t,e,n)=>{const o=t.type==="headOverHeels"||t.type==="heels"&&n?"head":t.type;return mc[`${o}${e?"OnSpring":""}`]},gc=t=>!(t===null||Ps(t)&&je(t)||Bs(t)&&t.config.gives==="scroll"||U(t)&&t.state.standingOnItemId===null),bc=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+pc>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),Oi=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Ve(o,e);if(bc(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:No(t,!1,t.type==="heels"&&t.state.isBigJump)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&gc(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...t.type==="heels"?{isBigJump:!1}:{}}}:Y;const a=t.type==="heels"&&t.state.bigJumps>0,l=Os(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:No(t,l,a)}},stateDelta:{action:"moving",jumped:!0,...t.type==="heels"?a?{bigJumps:t.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},vc=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Ue(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return D(n,l)},yc={movementType:"vel",vels:{walking:B}},Pi=(t,e,n,o)=>{const r=xc(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Ue(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Ie(r.vels.walking,B)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},xc=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:m}}}=t,b=o===t.id,k=b?n.currentActionPress("jump"):"released",O=b?n.directionVector:B,S=l===null&&m.z<0,C=i==="head"&&Wn(t.state)>0&&l!==null,P=i==="headOverHeels"?S?"head":"heels":C?"heels":i,z=a?c:O,V=me[P];if(u!==null||s==="death")return yc;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:$n(f,D(f,As*r))},stateDelta:{action:S?"falling":"jumping"}}:{movementType:"vel",vels:{walking:B},stateDelta:{action:"falling"}};if(k!=="released"){const mt=Ge(Xt(z,de)?c:z),Xi=J("spring")(Ve(l,e))?1:Rs;return{movementType:"vel",vels:{walking:D({...mt,z:0},V*Xi)},stateDelta:{facing:mt}}}}if(Ue(z)!==0)return S?{movementType:"vel",vels:{walking:D({...z,z:0},V)},stateDelta:{facing:z,action:"falling"}}:{movementType:"vel",vels:{walking:vc({vel:f,acc:Ms[P],deltaMS:r,maxSpeed:V,unitD:z,minSpeed:0})},stateDelta:{facing:z,action:"moving"}};if(d>0&&d<1){const mt=Ie(h,c)?1:0;return{movementType:"position",posDelta:D(c,mt-d),stateDelta:{action:S?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:B},stateDelta:{action:S?"falling":"idle"}}},Ho=t=>Oe(t.movingItem)&&Zn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Bi=(t,e)=>{let n=B;for(const o of e){if(o.movementType==="position"&&(n=L(n,o.posDelta)),o.movementType==="vel"&&(Oe(t)||J("lift")(t)))for(const[i,s]of fr(o.vels)){const a={...B,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},Go=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&U(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Ho(t)){if(Ho(t)&&Ti(t)){xr({above:t.movingItem,below:t.touchedItem});const n=[Oi(t.movingItem,t.room,t.gameState,t.deltaMS),Pi(t.movingItem,t.room,t.gameState,t.deltaMS)];Bi(t.movingItem,n)}Or(t)}};function wc(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Kn=t=>{Ti(t)&&Lo(t),nc(t)&&Lo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ae(t,...oo)&&dc(t),Ze(t,...oo)&&hc(t),(Ze(t,"monster")&&ae(t,"firedDoughnut")||Ze(t,"firedDoughnut")&&ae(t,"monster"))&&wc(t),(Ze(t,"monster")||Ze(t,"movingPlatform"))&&cc(t),ae(t,"switch")&&uc(t),ae(t,"joystick")&&fc(t,Kn),t.touchedItem.state.disappear&&Go(t),t.movingItem.state.disappear&&Te(t.touchedItem,t.movingItem)&&Go({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Sc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ge(e.items).filter(Un),u=s===null?_i(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;Cc(e,i,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!Fi(t,wr(e.items)))return;s.state.position=l,ke({room:e,item:s}),Hn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:s.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Kn}),i.carrying=null,r.actionsHandled.add("carry")}},Cc=(t,e,n)=>{e.carrying=n,n.state.wouldPickUpNext=!1,Sr({room:t,item:n})},_i=(t,e)=>wi(t,ge(e.items).filter(Un)),Fi=(t,e)=>{const n={position:L(t.state.position,{z:_.h})},o=Ds({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(Te(r,t)){if(!Oe(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!Fi(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},un=-11,Tc={jump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],u=c===null?!1:c.type==="teleporter"&&je(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?Ct({colourised:n,button:t}):a;if(s?.pressed!==d&&Tt(h,d),u!==s?.standingOnTeleporter)if(u)Je(h,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Oo(t,n,"JUMP");f.y=un,Je(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourised:n}}},carry({renderContext:t,currentRendering:e,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=t,{currentPlayable:s,room:a}=n,l=e?.renderProps,c=e?.output,u=s&&it(s),d=u?.hasBag??!1,h=u?.carrying??null,f=h===null&&a!==void 0&&_i(s,a)!==void 0,m=o.actions.every(S=>r.currentActionPress(S)!=="released"),b=d&&!f&&h===null,k=c===void 0?Ct({colourised:i,button:o}):c;if(k.visible=d,d&&(b!==l?.disabled&&Io(k,b,i),k.visible=!0,l?.pressed!==m&&Tt(k,m),d!==l?.hasBag||h!==l?.carrying)){let S;h!==null?S=xi(h,t,n):d&&(S=p({textureId:"bag",y:-2})),Je(k,S)}return{output:k,renderProps:{pressed:m,hasBag:d,colourised:i,carrying:h,disabled:b}}},fire({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&Ft(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=s===void 0?Ct({colourised:n,button:t}):s,h=l||ct(c)>0;if(d.visible=h,h&&(i?.pressed!==u&&Tt(d,u),l!==i?.hasHooter||c!==i?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):ct(c)>0&&(f=p({textureId:"doughnuts",y:-2}));const m=se(new v,c);m.y=un,m.filters=ne,Je(d,f,m),Io(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,l=(r&&it(r))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let d;if(s===void 0){d=Ct({colourised:n,button:t});const h=Oo(t,n,"C+J");h.y=un,Je(d,h)}else d=s;return l?(d.visible=!0,i?.pressed!==c&&Tt(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:t}){if(t!==void 0)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=te,{output:e,renderProps:oe}},map({currentRendering:t}){if(t!==void 0)return"no-update";const e=Qe({label:"mapText",outline:!0});return se(e,"MAP"),{output:e,renderProps:oe}}};class _e extends fi{constructor(e){const n=Tc[e.button.which];super(e,n)}}const kc=30,Ic=15,Oc=42,Pc=36,Bc=44,_c=20;class Fc{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=e;this.#n={mainButtonNest:new v({label:"mainButtonNest"}),buttons:{jump:new _e({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new _e({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new _e({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new _e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new _e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new _e({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new il({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of H(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=Ic,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=kc,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new v({label:"OnScreenControls"});#n;#t(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const n of H(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Bc,this.#n.mainButtonNest.y=e.y-_c,this.#n.joystick.output.x=Oc,this.#n.joystick.output.y=e.y-Pc,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of H(this.#n.buttons))r.tick({...e,currentPlayable:Xe(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}$e.frames.button.frame;const Ac=250,Rc=t=>t?48:24,Mc=t=>t?68:56,Dc=(t,e)=>t?e.x/2-24:80,zc=t=>t?72:24,Lc=t=>t?88:0,Vo=112,Ye=t=>t==="heels"?1:-1;class Ec{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Qt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[ko],this.#t.fps.y=Bt.h,this.#o(),n&&(this.#n=new Fc({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#n.output))}#e=new v({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Qe({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Qe({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new v({label:"heelsCarrying"})}},fps:Qe({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const n of Qt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new v({label:i});s.pivot={x:4,y:16};const a=new pe({texture:le().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:To,y:n?0:8});s.addChild(a);const l=Qe({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=Bt.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=ne),{text:l,icon:a,container:s}}#i(e){const n=new pe(le().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#l({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ye("head")*Vo,this.#t.head.doughnuts.container.y=e.y-et.h-8,this.#t.heels.carrying.container.y=e.y-et.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ye("heels")*Vo,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Bt.w*2}#s(e,n){return e?n?Z:nt:n?wo:tt}#a(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=bt(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=xi(s,this.renderContext,e);c!==void 0&&a.addChild(c)}a.filters=this.#s(!0,o),this.#t.heels.bag.icon.filters=this.#s(i,o)}#c(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=bt(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#s(i,o),this.#t.head.doughnuts.icon.filters=this.#s(s!==0,o),se(this.#t.head.doughnuts.text,s)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=bt(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=At(i),d=u>0||!o;a.visible=d,d&&(se(s,u),a.y=n.y-Lc(o)),c.x=a.x=(n.x>>1)+Ye(e)*Dc(o,n);const h=i===void 0?0:e==="head"?Wn(i):i.bigJumps,f=h>0||!o;c.visible=f,f&&(se(l,h),c.y=n.y-zc(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#u(r,e),a=this.#t[e].sprite;s?a.filters=i?Z:nt:a.filters=i?wo:tt,a.x=(n.x>>1)+Ye(e)*Mc(o),a.y=n.y-et.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=bt(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ye(e)*Rc(o),a.y=n.y,se(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=qn(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;tt.targetColor=o.hud.dimmed[r?"dimmed":"original"],Jn.targetColor=o.hud.dimmed[r?"basic":"original"],To.targetColor=o.hud.icons[r?"basic":"original"],nt.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?St.colourised.head[this.#u(i,"head")?"active":"inactive"]:St.original,this.#t.heels.livesText.filters=r?St.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:St.original}#d=dt;#g(){if(zs(w.getState())){if(performance.now()>this.#d+Ac){const e=Ke.shared.FPS;se(this.#t.fps,Math.round(e)),ko.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Qt)this.#p(n,e),this.#f(n,e),this.#h(n,e);this.#l(e),this.#c(e),this.#a(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const Xo={movementType:"vel",vels:{gravity:B}},$c=(t,e,n,o)=>{if(!Te(t))return Xo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=Ls[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Ve(s,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-vn*o,-l)}}}:Xo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-vn*o,-l)}}}},jo=_.h,qo=.001,Uc=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=ro**2/(2*qe);if(n==="up"){if(e<=o)return Math.max(qo,Math.sqrt(2*qe*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(qo,Math.sqrt(2*qe*r))}else return ro}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*qe*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*qe*Math.max(e,0))):-.036},Nc=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*jo,i=e*jo,s=Uc({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Wo={movementType:"vel",vels:{movingFloor:B}},Hc=(t,e,n,o)=>{if(U(t)&&t.state.teleporting!==null)return Wo;const{state:{standingOnItemId:r}}=t,i=Ve(r,e);if(i===null||!J("conveyor")(i))return Wo;const{config:{direction:s}}=i,l=J("heels")(t)&&t.state.action==="moving"&&Gt(t.state.facing)===Es(s)?me.heels:$s;return{movementType:"vel",vels:{movingFloor:D(bn[s],l)}}};function*Gc(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Vc=_.w*.8,Xc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Ge(c);if(r.currentActionPress("fire")==="tap"&&a&&ct(s)>0){const d={type:"firedDoughnut",...gr,config:oe,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...En(),position:L(l,D(u,Vc),t.type==="headOverHeels"?{z:_.h}:B),vels:{fired:D(u,me.firedDoughnut)},disappear:"onTouch"}};ke({room:e,item:d}),i.doughnuts=ue(i.doughnuts,-1),r.actionsHandled.add("fire")}},Ai=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),jc=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),It=_.w*3,qc=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-It&&n.x<o.x+It&&n.y>o.y-It&&n.y<o.y+It},Jo=(t,e,n,o,r)=>{if(r&&t.state.activated)return Y;const i=Yn(t.state.position,e);return i===void 0?Y:qc(t,i)?Ai:jc},Wc=(t,e,n,o)=>t.state.activated?Y:He(t.state.stoodOnBy,e).some(U)?Ai:Y,Jc=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Jo(t,e,n,o,!0);case"while-player-near":return Jo(t,e,n,o,!1);case"on-stand":return Wc(t,e);case"off":case"on":return Y;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Zc=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=Us(Ns(`${r}-${s}`,{...l,position:B},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=$n(a,D(h.aabb,.5)),ke({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*Yc(t,e,n,o){Oe(t)&&(yield $c(t,e,n,o),yield Hc(t,e),yield*Gc(t,e)),U(t)?(yield Pi(t,e,n,o),t.id===n.currentCharacterName&&(yield zl(t,e,n,o),yield Oi(t,e,n),Hs(t)&&Sc(t,e,n,o),Gs(t)&&Xc(t,e,n))):Vs(t)?yield Nc(t):Xs(t)?(yield Jc(t,e,n,o),yield lc(t,e,n,o)):js(t)&&Zc(t,e)}const Kc=(t,e,n,o)=>{if(!Oe(t)||t.state.standingOnItemId===null)return;const r=Ve(t.state.standingOnItemId,e);U(t)&&r.type==="pickup"&&Ci({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||U(t)&&r.state.disappear==="onTouchByPlayer")&&Or({touchedItem:r,gameState:n,room:e})},Qc=(t,e,n,o)=>{if(U(t)&&t.state.standingOnItemId!==null){const s=Ve(t.state.standingOnItemId,e);(vr(s)||s.type==="spikes")&&Si({room:e,movingItem:t})}const r=[...Yc(t,e,n,o)];Kc(t,e,n);let i=Bi(t,r);(Oe(t)||J("lift")(t)||J("firedDoughnut")(t))&&(i=L(i,...ce(H(t.state.vels)).map(s=>D(s,o)))),Hn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:o,onTouch:Kn})},eu=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ue(e.state.head.lives,-1),e.state.heels.lives=ue(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=ct(e.state.head.lives)>0,i=ct(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,xe(t,e);const u=io(e)[c],d=Le({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:so(u)};return}if(t.entryState.headOverHeels!==void 0){xe(t,e);const c=Le({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=io(e);if(xe(t,c),xe(t,u),Ln(c,u)){const d=Cr({head:c,heels:u});xe(t,d,"heels");const h=Le({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:so(d)};return}else{const d=Le({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Le=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=Ws({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??oe});for(const i of e)ke({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ba(r,t);return r},xe=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},tu=(t,e)=>{const n=Tr(t,kr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];xe(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=Cr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});xe(t,a);const l=Le({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}ke({room:o,item:e});return}else{const s=Le({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},nu=(t,e)=>{e.type==="headOverHeels"?eu(t,e):tu(t,e),Xe(t)===void 0&&w.dispatch(qs({offerReincarnation:!0}))},ou=t=>{for(const e of ge(t.items))try{for(const n of He(e.state.stoodOnBy,t)){if(!t.items[n.id]){ao(n,t);continue}if(!Zn(n,e)){ao(n,t);const o=wi(n,wr(t.items));o!==void 0&&xr({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${e.id}"`,{cause:n})}},ru=2*va,iu=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ru,positionDelta:n})},su=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...$n(o.state.position,r),z:0};if(!Ie(s,B))for(const a of He(o.state.stoodOnBy,e))iu(a,e,s)}},au=(t,e)=>{for(const n of ge(t.items))!Oe(n)||t.roomTime===n.state.actedOnAt.roomTime||Js(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Zs(n.state.position),e.add(n))},lu=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,cu=t=>{for(const e of ge(t.items)){const n=e.state.position;e.state.position=Ys(n)}},uu=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},du=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Xe(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Tr(t,kr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Zo=Fn*$e.animations["particle.fade"].length*(1/$e.animations["particle.fade"].animationSpeed),hu=20,fu=38,Ot=_.w/2;let pu=0;const Ri=(t,e,n,o)=>{if(!(Math.random()<n*(o/1e3)))return;const i={...L(mr(t),{x:Math.random()*Ot-Ot/2,y:Math.random()*Ot-Ot/2}),z:t.state.position.z};ke({room:e,item:{id:`particle.${t.id}.${pu++}`,type:"particle",aabb:B,config:{forCharacter:t.type},state:{...En(),expires:e.roomTime+Zo+Math.random()*Zo,position:i}}})},mu=(t,e,n)=>{!(Wn(t.state)>0)||t.state.standingOnItemId===null||Ue(t.state.vels.walking)<pr||Ri(t,e,hu,n)},gu=(t,e,n)=>{const{isBigJump:o}=t.state;o&&t.state.standingOnItemId===null&&(t.state.vels.gravity.z<=0||Ri(t,e,fu,n))},bu=(t,e)=>{const{head:n,heels:o}=Vt(t.items);n!==void 0&&mu(n,t,e),o!==void 0&&gu(o,t,e)},vu=(t,e)=>{const n=he(t);if(n===void 0)return zn;du(t,n,e);const o=Object.fromEntries(Ks(n.items).map(([s,a])=>[s,a.state.position]));for(const s of H(n.items))lu(s,n)&&(Sr({room:n,item:s}),U(s)&&nu(t,s));const r=Object.values(n.items).sort(uu);for(const s of r){const a=Xe(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Qc(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}bu(n,e),ou(n),cu(n);const i=new Set(ce(H(n.items)).filter(s=>o[s.id]===void 0||!Ie(s.state.position,o[s.id])));return su(i,n,o),au(n,i),i},Yo=(t,e)=>{const n=I(t),o=I(L(t,{x:e.x,z:e.z})),r=I(L(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},dn=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,yu=(t,e,n,o)=>{const r=Yo(t,e),i=Yo(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=dn(s,a,l,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,b=dn(d,h,f,m),k=r.topLeft.y+r.topLeft.x/2,O=r.bottomCentre.y+r.bottomCentre.x/2,S=i.topLeft.y+i.topLeft.x/2,C=i.bottomCentre.y+i.bottomCentre.x/2,P=dn(k,O,S,C);return u&&b&&P},xu=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,o=e.renderAabb||e.aabb,r=t.state.position,i=e.state.position;if(!yu(r,n,i,o))return 0;for(const s of Qs){const a=t.state.position[s],l=a+n[s],c=e.state.position[s],u=c+o[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Ko(e)-Ko(t)},Ko=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Rt extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const wu=t=>{const e=Su(t);let n=e.length,o=n;const r=new Array(n),i={},s=Cu(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new Rt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,s.get(f),u)}catch(m){throw m instanceof Rt?m.hasClosedCycle?m:new Rt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function Su(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Cu(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Qo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Pt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Tu=(t,e=new Set(H(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Pt(n,r,s);for(const r of e)if(r.fixedZIndex===void 0)for(const i of H(t)){if(i.fixedZIndex!==void 0||o.get(i)?.has(r)||r===i)continue;const s=xu(r,i);if(Qo(o,r,i),s===0){Pt(n,r.id,i.id),Pt(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;Qo(n,a,l),Pt(n,l,a)}return n},Mi=(t,e,n=3)=>{try{return{order:wu(t),impossible:!1}}catch(o){if(o instanceof Rt){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:Mi(t,e,n-1).order,impossible:!0}}else throw o}};class Di extends fi{}const er=(t,e)=>{e.poly([I({}),I({x:t.x}),I({x:t.x,y:t.y}),I({y:t.y})]).poly([I({}),I({z:t.z}),I({y:t.y,z:t.z}),I({y:t.y})]).poly([I({x:t.x}),I({x:t.x,z:t.z}),I(t),I({x:t.x,y:t.y})]).poly([I({z:t.z}),I({x:t.x,z:t.z}),I({x:t.x,y:t.y,z:t.z}),I({y:t.y,z:t.z})])},tr=(t,e)=>{const n=new W;return er(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),er(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},ku={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Iu{constructor(e){this.renderContext=e;const{item:n}=e,o=ku[n.type]??"rgba(255,255,255)";if(this.#e=new v({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const i=I(n.config.relativePoint);this.#e.addChild(new W().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new W().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new W({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(tr(n.aabb,o)),n.renderAabb&&this.#e.addChild(tr(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new Ga({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class Ou{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new v({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=I(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const Pu=({renderContext:{general:{pixiRenderer:t},item:e,room:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=e,s=o?.renderProps,a=je(e),l=a&&He(r,n).find(U)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:qt(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},i),renderProps:{flashing:l,activated:a}}:"no-update"},hn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:o})=>{const r=o?.renderProps,i=Gt(n)??"towards";if(!(r===void 0||i!==r.facingXy4))return"no-update";const a=p(i==="left"||i==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(_.h*(e-1)),a.scale.x=i==="away"||i==="right"?1:-1,{output:a,renderProps:{facingXy4:i}}},nr={lift:re("shadowMask.smallBlock"),conveyor:ie(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:Ne(t)==="x"})),teleporter:Pu,floor:"no-mask",barrier:ie(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:re("shadowMask.smallRound"),block:ie(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:ie(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),movingPlatform:ie(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),hushPuppy:re("shadowMask.hushPuppy"),portableBlock:ie(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:ie(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:ie(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.fullBlock"),spikes:re("shadowMask.spikes"),switch:re("shadowMask.switch"),pickup:ie(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:re("shadowMask.smallRound"),"monster.dalek":re("shadowMask.dalek"),"monster.turtle":hn("turtle"),"monster.skiHead":hn("skiHead"),"monster.homingBot":re("shadowMask.smallRound"),joystick:re("shadowMask.joystick"),charles:hn("charles",2)},Bu=t=>t.type==="monster"?nr[`monster.${t.config.which}`]:nr[t.type],_u=new Ua({alpha:.66});class Fu{constructor(e,n){this.renderContext=e,this.#r||(this.#e.filters=_u),n!=="no-mask"&&(this.#t=new Di(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new v({label:"ItemShadowRenderer"});#n=new v({label:"shadows"});#t;#o={};get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const o=this.#t.output.children.at(0);if(o===void 0||!(o instanceof pe)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}n!==o&&(this.#r||(this.#e.mask=o))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:o}=e,{item:r,general:{pixiRenderer:i},room:s}=this.renderContext,a=n.has(r),l=r.state.position.z+r.aabb.z,c=ge(s.items).filter(function(m){return m.shadowCastTexture!==void 0}),u={id:r.id,state:{position:{...r.state.position,z:l}},aabb:{...r.aabb,z:ea}},d=Object.groupBy(c,f=>{const m=this.#o[f.id]!==void 0,b=n.has(f);return!a&&!b?m?"keepUnchanged":"noShadow":Ln(u,f)?m?"update":"create":"noShadow"});for(const f of go(d.keepUnchanged,d.update))this.#o[f.id].renderedOnProgression=o;if(d.create)for(const f of d.create){const{times:m}=f.config,b=qt(i,f.shadowCastTexture,m);b.label=f.id,this.#n.addChild(b),this.#o[f.id]={sprite:b,renderedOnProgression:o}}for(const f of go(d.create,d.update)){const{sprite:m}=this.#o[f.id],b=I({...ht(f.state.position,r.state.position),z:r.aabb.z});m.x=b.x,m.y=b.y}for(const[f,{sprite:m,renderedOnProgression:b}]of zt(this.#o))b!==o&&(m.destroy(),delete this.#o[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const Au=t=>{const e=Bu(t.item);return e===void 0?void 0:new Fu(t,e)};class Ru{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const E=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=x.createBufferSource(),c=yn()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Fe=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},$=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=E({...t}),Fe(l,t.gain,s),n!==void 0&&(r?(l=E({...n,loop:!0}),Fe(l,n.gain,s)):l.onended=()=>{c&&(l=E({...n,loop:!0}),Fe(l,n.gain,s))})):n!==void 0&&(l=E({...n,loop:!0}),Fe(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=E({...o}),Fe(l,o.gain,s)));else if(c!==u&&e!==void 0){const h=E({...e});Fe(h,e.gain,s)}a=!1,c=u}};class Mu{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=$({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Du{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&E({soundId:"bonus",connectTo:this.output});break}case"disappearing":{E({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,E({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class Qn{constructor(e,n,o=1){this.renderContext=e,this.#e=$({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,i=o>(e??dt)&&!Ia(Ir(r));this.#e(i)}destroy(){}}class zu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new Qn(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=$({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,a=o===i&&ce(Ir(s)).some(l=>ta(r[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const fn=2;class Lu{constructor(e){this.renderContext=e}output=x.createGain();#e=$({start:{soundId:"conveyorStart",playbackRate:fn},loop:{soundId:"conveyorLoop",playbackRate:fn},stop:{soundId:"conveyorEnd",playbackRate:fn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=pt(e);this.#e(n)}destroy(){this.#e(!1)}}const Eu=3;class $u{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=E({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Eu*e)}destroy(){}}const or={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},rr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},ir={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},sr={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Uu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;or[n]!==void 0&&(this.#r=new Qn(e,or[n]),this.#r.output.connect(this.output)),rr[n]!==void 0&&(this.#t=$({change:rr[n]},this.#e)),sr[n]!==void 0&&(this.#i=$(sr[n],this.#e)),ir[n]!==void 0&&(this.#o=$({loop:ir[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const a=An(o);this.#t(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!i;this.#o(a)}if(this.#i){const a=!Ie(s,B);this.#i(a)}}destroy(){}}class pn{constructor(e){this.renderContext=e;const{general:{soundSettings:n},item:{type:o}}=e,{noFootsteps:r}={...st.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=$({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#i.connect(this.output),this.#o=$({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#r=$({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#o;#r;#i=x.createGain();#l=$({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#s=x.createGain();#a=$({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:i,jumped:s,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=it(n),{teleportingPhase:f,positionZ:m}=this.#c,b=r?r.phase:null,k=s&&l>i&&l>m&&c>0,O=l<m&&c<0&&a===null;this.#r(O),this.#o(k),this.#n!==void 0&&this.#n(!k&&!O&&o==="moving"),h!==void 0&&this.#a(h.carrying!==null);const S=a!==null&&u>(e??dt)&&d[a];if(this.#l(S),b!==null&&b!==f)if(b==="in"){const C=yn().teleportIn,P=x.createBufferSource();P.buffer=C,P.connect(this.output),P.start()}else{const C=yn().teleportOut,P=x.createBufferSource();P.buffer=C,P.connect(this.output),P.start()}this.#c={teleportingPhase:b,positionZ:l}}destroy(){}}class Nu{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=pt(e);!o&&r&&E({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Hu{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=$({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Gu{constructor(e){this.renderContext=e}output=x.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:n,stoodOnUntilRoomTime:o}}}}=this,r=pt(n);e!==void 0&&o>e&&!r&&E({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Vu{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?Mn(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&E({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Xu{constructor(e){this.renderContext=e}output=x.createGain();#e=$({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(je(e)&&He(e.state.stoodOnBy,n).some(U))}destroy(){}}class ju{constructor(e){this.renderContext=e,E({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class qu extends Qn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const Wu={lift:$u,switch:Vu,bubbles:Du,head:pn,heels:pn,headOverHeels:pn,teleporter:Xu,monster:Uu,conveyor:Lu,spring:Gu,portableBlock:Nu,charles:zu,ball:Mu,pushableBlock:Hu,firedDoughnut:ju,slidingBlock:qu},Ju=t=>{const e=Wu[t.item.type];if(e)return new e(t)},ar=_.h*na,lr=_.h*-1,Zu=_.w*16,Yu=0,mn=(t,e,n)=>(t-e)/(n-e)*2-1;class Ku{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=en(lo({x:0,y:o})),this.positionMaxX=en(lo({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=L(o.position,D(n.aabb,.5)),i=mn(en(r),this.positionMaxX,this.positionMinX),s=mn(r.z,lr,ar);if(!Number.isFinite(s))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${lr},
          ${ar},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(o.position)},
          scaleXyz(${JSON.stringify(n.aabb)}, 0.5),
        )`);const a=mn(r.x+r.y,Yu,Zu);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const Qu=[new $t(g.midRed)],ed=[new $t(g.moss)],td=75;class nd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<td?o==="left"?ed:Qu:Z,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const od=g.moss,rd=()=>new lt({outlineColor:od,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale});class id{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:n}=this.renderContext.item.state;n!==!this.#e&&(this.output.filters=n?[rd()]:Z),this.#e=n,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const sd=(t,e,n)=>Un(t)?new id(e,n):n,ad=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},ld=t=>{const e=w.getState(),n=oa(e),o=!ra(e),{item:r,general:{gameState:i}}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[],l=yi(r);if(l!==void 0){const f=new Di(t,l),m=new nd(t,f);a.push(sd(r,t,m)),s&&(m.output.alpha=.66)}if(o){const f=Au(t);f!==void 0&&a.push(f)}s&&a.push(new Iu(t));let c;if(a.length===0)c=void 0;else{const f=a.length===1?a[0]:new cd(a,t);ad(r,f.output,i),c=new Ou(t,f)}const u=t.general.soundSettings.mute??st.soundSettings.mute,d=t.general.paused||u?void 0:Ju(t),h=d===void 0?void 0:new Ku(t,d);return new Ru(t,{graphics:c,sound:h})};class cd{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new v({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Ae=.33,ud=ia()==="mobile"?-4:16,_n=Ee.h-Ee.w/2,dd=me.heels,hd=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Ht(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-ud-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,f=u.y+s-_n<0;return(m,b,k)=>{if(m===void 0)return;const O=I(m.state.position),S=L(O,u),C={x:d&&S.x<n.x*Ae?Math.min(-a,n.x*Ae-O.x):h&&S.x>n.x*(1-Ae)?Math.max(n.x-l,n.x*(1-Ae)-O.x):u.x,y:f&&S.y<n.y*Ae?n.y*Ae-O.y:u.y};if(k)e.x=C.x,e.y=C.y;else{const P=dd*b,z=ht(e,C),V=Dn(z);if(V>P){const Kt={x:z.x/V,y:z.y/V};e.x-=Kt.x*P,e.y-=Kt.y*P}else e.x=C.x,e.y=C.y}}},fd=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Ht(t);return new W().rect(e+o.x,r-_n,n-e,o.y-r+_n).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class pd{constructor(e){this.renderContext=e;const{general:{displaySettings:n,upscale:o,colourised:r,soundSettings:i}}=e;this.initFilters(r,e.room.color);const a=i.mute??st.soundSettings.mute?void 0:x.createGain();this.output={sound:a,graphics:new v({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})},(n?.showBoundingBoxes??st.displaySettings.showBoundingBoxes)!=="none"&&this.output.graphics.addChild(fd(e.room.roomJson)),this.#i=hd(e.room,this.output.graphics,o.gameEngineScreenSize)}#e=new v({label:"items"});#n=new v({label:"floorEdge"});output;#t=void 0;#o=new Map;#r=new Map;#i;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Ya:Z:new N(qn(n).main.original)}#l(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of ge(n.items)){let i=this.#r.get(r.id);if(i===void 0){i=ld({...this.renderContext,item:r}),this.#r.set(r.id,i);const s=r.type==="floorEdge"?this.#n:this.#e,{graphics:a,sound:l}=i.output;if(a&&(s.addChild(a),r.fixedZIndex&&(a.zIndex=r.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{i.tick(o)}catch(s){throw new Error(`RoomRenderer caught error while ticking item "${r.id}" - item JSON is:
           ${JSON.stringify(r,null,2)}`,{cause:s})}}for(const[r,i]of this.#r.entries())n.items[r]===void 0&&(i.destroy(),this.#r.delete(r))}#s(e){const{order:n}=Mi(Tu(this.renderContext.room.items,e.movedItems,this.#o),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);const i=r.output.graphics;if(i)i.zIndex=n.length-o;else throw new Error(`order ${n[o]} was given a z-order by sorting, but item has no graphics`)}}get#a(){return this.#t!==void 0}tick(e){const n=this.#a?e:{...e,movedItems:new Set(ge(this.renderContext.room.items))};this.#i(Xe(this.renderContext.general.gameState),e.deltaMS,!this.#a),this.#l(n),(!this.#a||n.movedItems.size>0)&&this.#s(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Zt=`in vec2 aPosition;
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
`,Yt=`struct GlobalFilterUniforms {
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
}`,md=`precision highp float;
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
`,gd=`struct CRTUniforms {
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
}`,bd=Object.defineProperty,vd=(t,e,n)=>e in t?bd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Mt=(t,e,n)=>(vd(t,typeof e!="symbol"?e+"":e,n),n);const zi=class Li extends K{constructor(e){e={...Li.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:gd,entryPoint:"mainFragment"}}),o=G.from({vertex:Zt,fragment:md,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Mt(this,"uniforms"),Mt(this,"seed"),Mt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Mt(zi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let yd=zi;var xd=`
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
}`,wd=`struct KawaseBlurUniforms {
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
}`,Sd=`
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
`,Cd=`struct KawaseBlurUniforms {
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
}`,Td=Object.defineProperty,kd=(t,e,n)=>e in t?Td(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ye=(t,e,n)=>(kd(t,typeof e!="symbol"?e+"":e,n),n);const Ei=class $i extends K{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(rt("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...$i.DEFAULT_OPTIONS,...n};const o=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Cd:wd,entryPoint:"mainFragment"}}),r=G.from({vertex:Zt,fragment:n?.clamp?Sd:xd,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ye(this,"uniforms"),ye(this,"_pixelSize",{x:0,y:0}),ye(this,"_clamp"),ye(this,"_kernels",[]),ye(this,"_blur"),ye(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=Me.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),Me.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};ye(Ei,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Id=Ei;var Od=`in vec2 vTextureCoord;
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
`,Pd=`struct AdvancedBloomUniforms {
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
`,Bd=`
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
`,_d=`struct ExtractBrightnessUniforms {
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
`,Fd=Object.defineProperty,Ad=(t,e,n)=>e in t?Fd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ui=(t,e,n)=>(Ad(t,typeof e!="symbol"?e+"":e,n),n);const Ni=class Hi extends K{constructor(e){e={...Hi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:_d,entryPoint:"mainFragment"}}),o=G.from({vertex:Zt,fragment:Bd,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Ui(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Ui(Ni,"DEFAULT_OPTIONS",{threshold:.5});let Rd=Ni;var Md=Object.defineProperty,Dd=(t,e,n)=>e in t?Md(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Re=(t,e,n)=>(Dd(t,typeof e!="symbol"?e+"":e,n),n);const Gi=class Vi extends K{constructor(e){e={...Vi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:Pd,entryPoint:"mainFragment"}}),o=G.from({vertex:Zt,fragment:Od,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:we.WHITE}}),Re(this,"uniforms"),Re(this,"bloomScale",1),Re(this,"brightness",1),Re(this,"_extractFilter"),Re(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Rd({threshold:e.threshold}),this._blurFilter=new Id({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Me.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Me.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Me.returnTexture(s),Me.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Re(Gi,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let zd=Gi;const Ld=oe,Ed=(t,e)=>(n,o)=>{const r=new Set;if(sa(n)){const u=he(n)?.items;if(u!==void 0){const d=ce(H(Vt(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const s=o*n.gameSpeed,a=Math.ceil(s/e),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)r.add(h)}const c=he(n)?.items??Ld;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},cr=({crtFilter:t},e)=>[t?new yd({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new zd({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class $d{constructor(e,n){this.app=e,this.gameState=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#i.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,he(n)===void 0)throw new Error("main loop with no starting room");this.#a()}catch(o){this.#s(o);return}}#e;#n;#t;#o;#r=new v({label:"MainLoop/world"});#i=x.createGain();#l=Ed(vu,ha);#s(e){w.dispatch(aa(la(e)))}#a(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=cr(e,!0),this.#n=cr(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#s(o)}};tick=({deltaMS:e})=>{const n=w.getState(),o=ca(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=w.getState(),a=!o&&!(r?.uncolourised??st.displaySettings.uncolourised),l=ua(n),c=da(n);(this.#t?.renderContext.general.colourised!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Ec({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#t.output));const u=he(this.gameState);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=o?zn:this.#l(this.gameState,e),h=he(this.gameState);(this.#o?.renderContext.room!==h||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o)&&(this.#o?.destroy(),h?(this.#o=new pd({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},room:h}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#i),this.gameState.events.emit("roomChange",h.id)):this.#o=void 0,this.app.stage.scale=s.gameEngineUpscale,this.#a()),this.#o?.tick({progression:this.gameState.progression,movedItems:d,deltaMS:e}),o?this.app.stage.filters=this.#e:this.app.stage.filters=this.#n};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#i.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Ut.add(_r,Fr,Ar,Rr,Mr,Dr,zr,Lr,Er,$r,Ur,Hr,Nr,Gr,Vr,Xr,jr,qr,Wr,Jr,Zr);ma.defaultOptions.scaleMode="nearest";const ur=async(t,e)=>{const n=new ri;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=fa;const o=w.getState().gameMenus.currentGame,r=co({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(pa(o.store.gameMenus)):(w.dispatch(uo(r.characterRooms.head.id)),w.dispatch(uo(r.characterRooms.heels.id)));const i=new $d(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Xe(r);a!==void 0&&Nn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return he(r)},get gameState(){return r},reincarnateFrom(s){co({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Xd=Object.freeze(Object.defineProperty({__proto__:null,default:ur,gameMain:ur},Symbol.toStringTag,{value:"Module"}));export{ei as A,Yr as C,K as F,Xn as R,Aa as S,ti as V,La as a,Xd as g,Fa as u};
