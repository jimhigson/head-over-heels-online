const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-DIbmyf1J.js","assets/App-BtedgQcV.js","assets/index-CqbFnIR6.js","assets/index-dY78FFVS.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-D-Iyt1cB.js","assets/Graphics-C66IIwVy.js","assets/changeCharacterRoom-CjXRaA9I.js","assets/WebGLRenderer-igUrT8nR.js"])))=>i.map(i=>d[i]);
import{bb as Xi,bc as ur,bd as ji,as as qi,aw as Ce,ax as G,ak as dr,at as we,a3 as S,a8 as Ut,a6 as Wi,a9 as b,a as rt,v as Dt,aM as y,ac as mn,aE as fe,a4 as Qe,a5 as Ji,V as Zi,be as Yi,bf as Qi,bg as Ki,aj as es,bh as j,bi as Kn,P as O,bj as ts,bk as ae,bl as P,bm as _n,s as $e,R as w,o as H,e as I,bn as ns,bo as os,bp as rs,h as D,A as Ue,bq as is,br as Rn,bs as hr,bt as ss,bu as as,bv as ls,bw as Bt,M as ne,bx as Fn,by as T,bz as ue,bA as Nt,Y as ct,bB as _t,bC as cs,bD as us,bE as ds,bF as eo,bG as hs,bH as fs,bI as ps,i as le,bJ as zt,Z as Ne,bK as Ht,bL as ms,n as z,bM as Gt,bN as pe,bO as ut,bP as An,k as W,bQ as He,bR as $,bS as Mn,bT as Ee,bU as et,bV as Dn,y as Te,u as zn,bW as fr,bX as gs,bY as bs,b6 as de,bZ as vs,b_ as ys,N as it,b$ as Rt,f as pr,c0 as ke,c1 as Ln,c2 as xs,c3 as mr,l as gr,c4 as br,c5 as Vt,c6 as to,c7 as vr,c8 as ws,c9 as dt,ca as Ge,cb as Xt,x as Ie,cc as gn,cd as Ss,d as Cs,ce as Ts,cf as ks,F as Ve,cg as Is,ch as Os,ci as Ps,cj as bn,ck as Bs,cl as _s,cm as gt,g as En,cn as Rs,co as Fs,cp as As,q as Oe,I as yr,cq as no,j as me,cr as $n,t as xr,b as wr,r as Ms,b7 as Xe,cs as Qt,ct as bt,cu as Ds,cv as zs,cw as qe,cx as oo,cy as Ls,cz as Es,cA as $s,cB as Us,cC as Ns,cD as Hs,cE as Gs,cF as Vs,cG as Xs,cH as js,cI as ro,Q as io,cJ as Sr,ba as Cr,K as Tr,L as qs,H as so,cK as Ws,cL as Js,cM as Zs,cN as Ys,cO as Qs,cP as Ks,cQ as x,cR as vn,cS as kr,w as ea,cT as ht,cU as Kt,O as ao,cV as ta,cW as na,cX as oa,a$ as ra,aC as Me,cY as ia,cZ as sa,c_ as aa,c$ as la,d0 as ca,d1 as ua,d2 as da,d3 as ha,d4 as fa,d5 as lo,d6 as pa,S as co,d7 as ma}from"./App-BtedgQcV.js";import{f as yn,c as Un,a as ga,m as jt,b as Nn,d as Ir,r as ba,o as va}from"./changeCharacterRoom-CjXRaA9I.js";import{S as ya,G as q}from"./Graphics-C66IIwVy.js";import{g as Or,_ as uo}from"./index-CqbFnIR6.js";var vt={},ho;function xa(){if(ho)return vt;ho=1;var t=Xi(),e=t.mark(i),n=ur(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return h=d[u],v.delegateYield(r(h),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}vt.__concat=i;var s=o(i);return vt.concat=s,vt}var yt={},fo;function wa(){if(fo)return yt;fo=1;var t=ur(),e=t.iterableCurry,n=ji(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}yt.__isEmpty=i;var s=e(i,{reduces:!0});return yt.isEmpty=s,yt}var en,po;function Sa(){return po||(po=1,en=xa().concat),en}var Ca=Sa();const mo=Or(Ca);var tn,go;function Ta(){return go||(go=1,tn=wa().isEmpty),tn}var ka=Ta();const Ia=Or(ka),Pr=class xn extends qi{constructor(e){e={...xn.defaultOptions,...e},super(e),this.enabled=!0,this._state=ya.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=Ce.from(n)),o&&(s=G.from(o)),new xn({gpuProgram:i,glProgram:s,...r})}};Pr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=Pr;var Oa=`
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
}`;class B extends Y{constructor(e){const n=e.gpu,o=bo({source:Ba,...n}),r=Ce.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=bo({source:Oa,...i}),a=G.from({vertex:Pa,fragment:s}),l=new dr({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:we.EMPTY}})}}function bo(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const Hn=`
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
    `,Gn=`
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
	`;class Br extends B{constructor(){super({gl:{functions:`
                ${Hn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Gn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Br.extension={name:"color",type:S.BlendMode};class _r extends B{constructor(){super({gl:{functions:`
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
            `}})}}_r.extension={name:"color-burn",type:S.BlendMode};class Rr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Rr.extension={name:"color-dodge",type:S.BlendMode};class Fr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"darken",type:S.BlendMode};class Ar extends B{constructor(){super({gl:{functions:`
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
            `}})}}Ar.extension={name:"difference",type:S.BlendMode};class Mr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Mr.extension={name:"divide",type:S.BlendMode};class Dr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"exclusion",type:S.BlendMode};class zr extends B{constructor(){super({gl:{functions:`
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
                `}})}}zr.extension={name:"hard-light",type:S.BlendMode};class Lr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Lr.extension={name:"hard-mix",type:S.BlendMode};class Er extends B{constructor(){super({gl:{functions:`
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
            `}})}}Er.extension={name:"lighten",type:S.BlendMode};class $r extends B{constructor(){super({gl:{functions:`
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
                `}})}}$r.extension={name:"linear-burn",type:S.BlendMode};class Ur extends B{constructor(){super({gl:{functions:`
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
            `}})}}Ur.extension={name:"linear-dodge",type:S.BlendMode};class Nr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Nr.extension={name:"linear-light",type:S.BlendMode};class Hr extends B{constructor(){super({gl:{functions:`
                ${Hn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Gn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Hr.extension={name:"luminosity",type:S.BlendMode};class Gr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Gr.extension={name:"negation",type:S.BlendMode};class Vr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Vr.extension={name:"overlay",type:S.BlendMode};class Xr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Xr.extension={name:"pin-light",type:S.BlendMode};class jr extends B{constructor(){super({gl:{functions:`
                ${Hn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Gn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}jr.extension={name:"saturation",type:S.BlendMode};class qr extends B{constructor(){super({gl:{functions:`
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
                `}})}}qr.extension={name:"soft-light",type:S.BlendMode};class Wr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Wr.extension={name:"subtract",type:S.BlendMode};class Jr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Jr.extension={name:"vivid-light",type:S.BlendMode};const wn=[];Ut.handleByNamedList(S.Environment,wn);async function _a(t){if(!t)for(let e=0;e<wn.length;e++){const n=wn[e];if(n.value.test()){await n.value.load();return}}}let We;function Ra(){if(typeof We=="boolean")return We;try{We=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{We=!1}return We}var Zr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Zr||{});class Fa{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Aa=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Yr=class Qr extends Wi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Aa,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await _a(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Qr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(rt(Dt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:y.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Zr.ALL);const{clear:o,clearColor:r,target:i}=e;y.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Fa(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Ra())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Yr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Kr=Yr,xt;function Ma(t){return xt!==void 0||(xt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Kr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!mn.get().getWebGLRenderingContext())return!1;let o=mn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),xt}let wt;async function Da(t={}){return wt!==void 0||(wt=await(async()=>{const e=mn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),wt}const vo=["webgl","webgpu","canvas"];async function za(t){let e=[];t.preference?(e.push(t.preference),vo.forEach(i=>{i!==t.preference&&e.push(i)})):e=vo.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Da()){const{WebGPURenderer:a}=await uo(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-DIbmyf1J.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&Ma(t.failIfMajorPerformanceCaveat??Kr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await uo(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-igUrT8nR.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const ei="8.8.1";class ti{static init(){globalThis.__PIXI_APP_INIT__?.(this,ei)}static destroy(){}}ti.extension=S.Application;class La{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,ei)}destroy(){this._renderer=null}}La.extension={type:[S.WebGLSystem,S.WebGPUSystem],name:"initHook",priority:-10};const ni=class Sn{constructor(...e){this.stage=new b,e[0]!==void 0&&rt(Dt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await za(e),Sn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return rt(Dt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=Sn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};ni._plugins=[];let oi=ni;Ut.handleByList(S.Application,oi._plugins);Ut.add(ti);var Ea=`in vec2 aPosition;
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
`,yo=`struct GlobalFilterUniforms {
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
}`;const ri=class ii extends Y{constructor(e){e={...ii.defaultOptions,...e};const n=Ce.from({vertex:{source:yo,entryPoint:"mainVertex"},fragment:{source:yo,entryPoint:"mainFragment"}}),o=G.from({vertex:Ea,fragment:$a,name:"alpha-filter"}),{alpha:r,...i}=e,s=new dr({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ri.defaultOptions={alpha:1};let Ua=ri;class st extends fe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof we?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Qe.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Qe.shared.add(this.update,this,Ji.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(we.from(e[o]));return new st(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(we.from(e[o]));return new st(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof we)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Qe.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Qe.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Na extends Zi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Yi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Ha(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(rt(Dt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Ga extends Na{constructor(...e){const n=Ha(e,"Text");super(n,Qi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Ki.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Vn extends we{static create(e){return new Vn({source:new es(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Se=t=>{const[e,n,o]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:o/2})},V={original:new y(j.zxWhite),basic:g.white,dimmed:g.lightGrey},X={original:new y(j.zxYellow),basic:g.midRed,dimmed:g.redShadow},Q={original:new y(j.zxMagenta),basic:g.pink,dimmed:Se(g.pink)},A={original:new y(j.zxCyan),basic:g.pastelBlue,dimmed:Se(g.pastelBlue)},K={original:new y(j.zxGreen),basic:g.moss,dimmed:Se(g.moss)},Xn={white:{basic:{main:V,edges:{towards:A,right:X},hud:{lives:X,dimmed:Q,icons:A}},dimmed:{main:V,edges:{towards:K,right:A},hud:{lives:X,dimmed:Q,icons:A}}},yellow:{basic:{main:X,edges:{towards:K,right:V},hud:{lives:A,dimmed:Q,icons:K}},dimmed:{main:X,edges:{towards:A,right:A},hud:{lives:A,dimmed:Q,icons:K}}},magenta:{basic:{main:Q,edges:{towards:K,right:A},hud:{lives:V,dimmed:A,icons:X}},dimmed:{main:Q,edges:{towards:K,right:A},hud:{lives:V,dimmed:A,icons:X}}},cyan:{basic:{main:A,edges:{towards:Q,right:V},hud:{lives:V,dimmed:K,icons:X}},dimmed:{main:A,edges:{towards:Q,right:V},hud:{lives:V,dimmed:K,icons:X}}},green:{basic:{main:K,edges:{towards:A,right:X},hud:{lives:V,dimmed:Q,icons:A}},dimmed:{main:K,edges:{towards:A,right:X},hud:{lives:V,dimmed:Q,icons:A}}}},jn=t=>Xn[t.hue][t.shade],De={head:g.pastelBlue,heels:g.pink},Ft=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Kn>n?100-Math.ceil((n-e)/(Kn/100)):0},si=t=>t.type==="headOverHeels"?Ft(t.state.head)>0||Ft(t.state.heels)>0:Ft(t.state)>0,qn=t=>{const e=100*O.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/O.w):0},Va={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},ft=`in vec2 aPosition;
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
`;class be extends Y{constructor(e){const n=Object.keys(e).length,o=G.from({vertex:ft,fragment:Xa.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const ja=`precision mediump float;
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
`;class U extends Y{uniforms;constructor(e="white"){const n=G.from({vertex:ft,fragment:ja,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const qa=`precision mediump float;
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
`;class Wa extends Y{constructor(){const e=G.from({vertex:ft,fragment:qa,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const ai=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),li=t=>ai(Xn[t.color.hue][t.color.shade].main),ci=t=>new be({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&li(t)}),Ja=new be({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Za=t=>new be({replaceLight:t,replaceDark:Se(t)}),Cn=(t,e,n)=>n?new be(ai(Xn[t.color.hue][t.color.shade].edges[e])):new U(jn(t.color).edges[e].original),ge=t=>new be(li(t)),xo=new Wa,J=ts,Ya=new be(Va),wo={x:.5,y:1},So=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),Tn=t=>{if(typeof t=="string")return Tn({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(So(t)?c=Qa(t):c=new fe(ae().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let m=1;m<=u.z;m++){const v={...t,label:`(${h},${f},${m})`};delete v.times;const k=Tn(v),R=P({x:h-1,y:f-1,z:m-1});k.x+=R.x,k.y+=+R.y,d.addChild(k)}return d}if(e===void 0&&o===void 0)if(So(t))c.anchor=wo;else{const u=ae().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=wo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=Tn;function Qa({animationId:t,reverse:e,playOnce:n,paused:o}){const r=ae().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:_n}));e&&s.reverse();const a=new st(s);return a.animationSpeed=$e.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Ka=`#version 300 es

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
`;class at extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=G.from({vertex:ft,fragment:Ka,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const te=new at({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),tt=new U,Co=new U,Wn=new U,To=new U(g.moss),nt=new U,ee=[tt,te],el=[nt,te],tl=[te,Wn],St={original:[te,nt],colourised:{head:{active:[te,new U(De.head)],inactive:[te,new U(Se(De.head))]},heels:{active:[te,new U(De.heels)],inactive:[te,new U(Se(De.heels))]}}},Pe=14,nl=2,ol=Math.cos(30*(Math.PI/180)),rl=40;class il{constructor(e){this.renderContext=e;const{inputDirectionMode:n,general:{colourised:o}}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Pe,y:-14,filter:ee}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Pe,y:Pe,filter:ee}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Pe,filter:ee}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Pe*Math.SQRT2,filter:ee}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Pe*Math.SQRT2,filter:ee}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new q().circle(0,0,rl).fill("#00000000"));for(const r of H(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=o?J:tt}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=I};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=ns(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=os({x:-c,y:-u}),h=rs(d,ol),f=D(h,nl);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Ue(e)>is?Rn(e):void 0;for(const[r,i]of hr(this.arrowSprites))i.filters=r===o?el:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const kn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:j.zxBlue,fire:j.zxYellow,carry:j.zxGreen,carryAndJump:j.zxRed,menu:j.zxWhite,map:j.zxWhite}};function Lt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*sl(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=ss(e);let o=0;for(const r of e){const i=`hud.char.${ls(r)}`;try{as(i)}catch(s){throw new Error(`no texture id for char "${r}": ${s.message}`,{cause:s})}yield p({textureId:i,x:(o+.5-n/2)*Bt.w}),o++}}const ie=(t,e)=>{t.removeChildren();try{Lt(sl(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Ke=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?tl:Wn,scale:{x:1,y:t?2:1}}),Et=Symbol(),ui=Symbol(),di=Symbol(),Ct=({colourised:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Za(kn.colourised[e]):o.filters=new U(kn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[ui]=r,o[Et]=i,o[di]=n,o},Je=(t,...e)=>{t[Et].removeChildren();for(const n of e)n!==void 0&&t[Et].addChild(n)},Tt=(t,e)=>{t[ui].texture=ae().textures[e?"button.pressed":"button"],t[di].y=e?1:0},ko=(t,e,n)=>{n&&(t[Et].filters=e?ci():J)},Io=({which:t},e,n)=>{const o=ie(new b,n);return o.filters=new be({white:e?Se(kn.colourised[t]):g.pureBlack}),o};class hi{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new b({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&this.output.removeChild(this.#e.output),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const al=(t,e,n)=>{const r=ae().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ae().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},fi=(t,e)=>{const n=e.getLocalBounds(),o=Vn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new fe({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},qt=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof fe?r:fi(t,r)},Be=t=>M(({renderContext:{item:e}})=>Fn(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),oe=t=>M(({renderContext:{item:e,general:{pixiRenderer:n}}})=>{if(Fn(e))return qt(n,t,e.config.times);{const o=p(t);return o instanceof fe?o:fi(n,o)}}),M=t=>({renderContext:e,currentRendering:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:ne}:"no-update",re=t=>({renderContext:{general:{pixiRenderer:e},item:n},currentRendering:o})=>{if(o===void 0){const r=Fn(n)?n.config.times:void 0,i={output:qt(e,t(n.config),r),renderProps:ne};return r&&(i.output.y-=((r.z??1)-1)*O.h),i}else return"no-update"};function*ll({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Nt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,..._t(a,{y:-12*n})});l.filters=Cn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",..._t(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",..._t(a,{y:-l*O.h})})}}yield*s(P({...ue,[r]:1})),yield*s(ue),e||(yield p({pivot:{x:16,y:O.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...P({...ue,[r]:1})}))}const pi=(t,e)=>{const n=Nt(t),o=ct(n),r=8;return t==="towards"||t==="right"?T({[o]:e[o]-r}):ue},cl=M(({renderContext:{item:t,room:e}})=>Lt(ll(t,e),new b({filters:ge(e),...pi(t.config.direction,t.aabb)}))),ul=M(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,general:{gameState:{campaign:i}}}})=>{const s=Nt(t),a=i.rooms[n];return p({textureId:al(r,s,e),filter:ge(a),...pi(t,o)})}),nn={animationId:"bubbles.cold"},ze=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},mi=Symbol(),gi=Symbol(),dl=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[mi]=t,n[gi]=e,n},hl=`#version 300 es

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
`;class $t extends Y{constructor(e){const n=G.from({vertex:ft,fragment:hl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const ot=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<cs},Wt=t=>t,In=.02,fl=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(o==="out")return{animationId:`${t}.fadeOut`,paused:i};if(o==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:r<In?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`,paused:i};if(e==="falling"){const a=`${t}.falling.${n}`;if(fs(a))return{textureId:a}}const s=`${t}.idle.${n}`;return ps(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},On=Symbol(),Pn=Symbol(),pl=(t,e)=>{t[On].removeChildren(),t[On].addChild(p(fl(e)))},bi=new be({pastelBlue:g.pink}),on=(t,e,n)=>{const o=new b,r=new b;o[On]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?bi:J,flipX:t==="heels"});return o[Pn]=i,o},Oo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+ds>t,ml=t=>{if(!ot(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%eo<eo*hs},Po=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Bo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?J:t.filters},gl=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Po(r,new at({outlineColor:De[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Bo(r,at);const s=o?.flashing??!1;n&&!s?Po(r,new $t(De[t])):!n&&s&&Bo(r,$t)},bl=(t,e,n)=>{e&&!n?t.addChild(t[Pn]):!e&&n&&t.removeChild(t[Pn])},rn=(t,e,n,o,r,i)=>{n&&pl(e,{name:t,...o,paused:r}),gl(t,o,i,e),bl(e,o.shining,i?.shining??!1)},vl=({renderContext:{item:t,general:{gameState:e,paused:n}},currentRendering:o})=>{const{type:r,state:{action:i,facing:s,teleporting:a,vels:{gravity:{z:l}}}}=t,c=o?.renderProps,u=o?.output,d=Rn(s)??"towards",h=t.type==="headOverHeels"?Oo(t.state.head,"headOverHeels","headOverHeels"):Oo(t.state,t.type,e.currentCharacterName),f=ml(t),m=si(t),v=Ue(s),k=a?.phase??null,R={action:i,facingXy8:d,teleportingPhase:k,flashing:f,highlighted:h,shining:m,gravityZ:l},C=c===void 0||c.action!==i||c.facingXy8!==d||c.teleportingPhase!==k||c?.gravityZ>In!=l>In;let _;if(r==="headOverHeels"){_=u??dl({top:on("head",!0,n),bottom:on("heels",!0,n)});const F=_;rn("head",F[mi],C,R,n,c),rn("heels",F[gi],C,R,n,c)}else _=u??on(r,!1,n),rn(r,_,C,R,n,c);return i==="moving"&&u instanceof st&&(u.animationSpeed=v*us),{output:_,renderProps:R}},sn=Wt(vl),yl=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...P({x:-e.x,y:-e.y})}),r=Lt(le(zt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...P(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=Lt(le(zt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...P(_t(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...P({...l,z:0}),times:{[ct(Ne(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},xl=t=>[...le(H(t.items)).filter(e=>e.type==="wall").filter(e=>Ne(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],wl=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Sl=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new q().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(P),!0).fill(0),Cl=M(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Ht(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:h},roomJson:f}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const C=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,_=new b;for(let N=-1;N<=r+2;N++)for(let ve=N%2-1;ve<=i+2;ve+=2)_.addChild(ms({x:N+(s.right?-.5:0),y:ve+(s.towards?-.5:0)},p({textureId:C})));_.addChild(yl(f,{x:n,y:o}));const F=new q().poly([ue,P({x:c,y:0}),P({x:c,y:u}),P({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});_.addChild(F),_.filters=ge(t),_.mask=F,m.addChild(_)}const v=xl(f),k=new q().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(k);const R=wl(v);if(R!==void 0)try{const C=Sl({extraWallRanges:R,blockXMin:n,blockYMin:o});m.addChild(C)}catch(C){throw new Error(`could not create floor overdraw for extra walls ${JSON.stringify(R,null,2)}`,{cause:C})}return m.mask=k,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Tl=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=P({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return le(zt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:s,textureId:`floorEdge.${l}`,...P(h),times:a.type==="wall"?a.config.times:{[ct(Ne(l))]:2}});i[l].addChild(f),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...P(z(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...P(z(h,{x:-.5}))}))}),i},kl=M(({renderContext:{general:{colourised:t},room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Ht(e.roomJson),l=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new q({label:"overDrawToHideFallenItems"}).poly([P({x:l,y:0}),P({x:0,y:0}),P({x:0,y:c}),{...P({x:0,y:c}),y:999},{...P({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=Tl({blockXMin:n,blockYMin:o},e.roomJson);h.filters=Cn(e,"towards",t),f.filters=Cn(e,"right",t),u.addChild(h),u.addChild(f);const m=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Il=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Ol=({renderContext:{item:{config:t,state:e},room:n,general:{paused:o}},currentRendering:r})=>{const i=r?.renderProps,{activated:s,busyLickingDoughnutsOffFace:a}=e,l=a?Ja:s?void 0:Il.includes(t.which)?ci(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const c=Gt(e.facing)??"towards";if(!(i===void 0||s!==i.activated||a!==i.busyLickingDoughnutsOffFace||c!==i.facingXy4))return"no-update";const d={facingXy4:c,activated:s,busyLickingDoughnutsOffFace:a};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${c}`,filter:l}),renderProps:d};case"elephantHead":return{output:p({textureId:`elephant.${c}`,filter:l}),renderProps:d};case"turtle":return{output:p(s&&!a?{animationId:`${t.which}.${c}`,filter:l,paused:o}:{textureId:`${t.which}.${c}.1`,filter:l}),renderProps:d};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?ze({top:{textureId:`${t.which}.${c}`,filter:l||ge(n)},bottom:{...nn,paused:o}}):p({textureId:`${t.which}.${c}`,filter:l}),renderProps:d};case"computerBot":case"elephant":case"monkey":return{output:ze({top:`${t.which}.${c}`,filter:l}),renderProps:d};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(i===void 0||a!==i.busyLickingDoughnutsOffFace||s!==i.activated))return"no-update";const u={activated:s,busyLickingDoughnutsOffFace:a};switch(t.which){case"helicopterBug":case"dalek":return{output:p(s&&!a?{animationId:t.which,filter:l,paused:o}:{textureId:`${t.which}.1`,filter:l}),renderProps:u};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:u};case"bubbleRobot":return{output:ze({top:{...nn,paused:o},filter:l}),renderProps:u};case"emperorsGuardian":return{output:ze({top:"ball",bottom:{...nn,paused:o},filter:l}),renderProps:u};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},Pl=pe.floatingText,Bl=12,_o=O.h*3,Ro=[g.shadow,g.midGrey,g.redShadow,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],Fo=[...Ro,...new Array(20).fill(g.white),...Ro.toReversed()],_l=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},general:{displaySettings:{uncolourised:o}}},currentRendering:r})=>{const i=r?.output;let s;const l=(n-e)*Pl;if(i===void 0){s=new b({filters:new at({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=ie(new b({label:u,y:c*Bl,filters:o?J:new U(g.pink)}),u.toUpperCase());s.addChild(d)}}else s=i;for(let c=0;c<t.length;c++){const u=s.children[c],[d]=u.filters,h=l+c*-12,f=h>0&&h<_o;if(u.visible=f,f&&d){const m=Math.floor(h/_o*Fo.length);d.targetColor=Fo[m]}}return s.y=-l,{output:s,renderProps:ne}},pt=t=>{for(const e in t)return!0;return!1},Ao=500,Rl=$e.animations["conveyor.x"].animationSpeed,Mo=$e.animations["conveyor.x"].length,Fl=t=>1-(1-t)**2,Al=(t,e)=>{for(let n=0;n<t.children.length;n++){const o=t.children[n],r=n%Mo;o.gotoAndStop(e?Mo-r-1:r)}return t},Ml=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:o}},currentRendering:r})=>{const i=r?.renderProps,s=pt(n),a=(!s&&i?.moving?o:i?.roomTimeStoppedMoving)??ut,l=Ne(t),c=r?.output??Al(p({animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),u=s?0:Math.min(o-a,Ao),d=Math.max(0,1-u/Ao);for(const h of c.children)if(d===0)h.stop();else{const f=Rl*Fl(d);h.play(),h.animationSpeed=f}return{output:c,renderProps:{moving:s,roomTimeStoppedMoving:a}}},Dl=Wt(Ml),Z={movementType:"steady"},je=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:An(w.getState(),t),zl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&W("teleporter")(l)&&je(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:yn}}}:Z;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Un({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:yn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Ll=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=t,s=o?.renderProps,a=je(t),l=a&&He(r,e).find($)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:l?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:a?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:a}}:"no-update"},El=({renderContext:{item:{state:{facing:t}}},currentRendering:e})=>{const n=e?.renderProps,o=Gt(t)??"towards";return n===void 0||o!==n.facingXy4?{output:ze({top:`charles.${o}`}),renderProps:{facingXy4:o}}:"no-update"},$l=({renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:e}},general:{paused:n}},tickContext:{lastRenderRoomTime:o},currentRendering:r})=>{const i=r?.renderProps,s=pt(t);let a;return r?.output?a=r?.output:(a=p({animationId:"spring.bounce"}),a.loop=!1,a.gotoAndStop(0)),o!==void 0&&e>o&&!s&&!n?a.gotoAndPlay(0):s&&!(i?.compressed??!1)&&a.gotoAndStop(1),{output:a,renderProps:{compressed:s}}},Ul=Wt($l),Nl=({renderContext:{item:{config:{which:t,startDirection:e}}},currentRendering:n})=>n?.renderProps===void 0?{output:t==="headOverHeels"?ze({top:{textureId:`head.walking.${e}.2`},bottom:{textureId:`heels.walking.${e}.2`}}):p({textureId:`${t}.walking.${e}.2`}),renderProps:ne}:"no-update",Hl=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},general:{paused:n}},tickContext:{deltaMS:o},currentRendering:r})=>{const s=(r?.renderProps?.distanceTravelled??0)+Mn(t)*(n?0:o),l=r?.output??p("spikyBall.1"),u=(Math.floor(s*2/Ee.w)+e)%2+1;return l.texture=ae().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:s}}},Gl=Wt(Hl),Vl=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,Xl=M(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=ct(Ne(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:Vl(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ee.w,y:Ee.h+1}:{x:0,y:Ee.h+1},filter:ge(o)}),l=P({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),jl=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const o=n?.renderProps,r=e.type==="in-store"?An(w.getState(),e.path)?"right":"left":t;return o===void 0||r!==o.setting?{output:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},ql=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Wl=({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentRendering:r})=>{const i=r?.renderProps;return i===void 0||i.disappear!==n?{output:p({textureId:ql(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ge(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},Jl=()=>M(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Zl={head:sn,heels:sn,headOverHeels:sn,doorFrame:ul,doorLegs:cl,monster:Ol,floatingText:_l,wall:Xl,barrier:M(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:M(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ge(n):void 0,times:e})),spikes:Be("spikes"),slidingDeadly:Gl,slidingBlock:Jl(),block:Wl,switch:jl,conveyor:Dl,lift:M(({renderContext:{general:{paused:t}}})=>{const e=new b,n={x:et.w/2,y:et.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter:Ll,sceneryCrown:M(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:M(({renderContext:{item:{config:t},room:e,general:{paused:n}}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ge(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Be("fish.1"),charles:El,joystick:Be("joystick"),movingPlatform:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),spring:Ul,sceneryPlayer:Nl,hushPuppy:Be("hushPuppy"),bubbles:M(({renderContext:{item:{config:{style:t}},general:{paused:e}}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Be({animationId:"bubbles.doughnut"}),ball:Be("ball"),floor:Cl,floorEdge:kl,particle:M(({renderContext:{item:{config:{forCharacter:t}}}})=>p({animationId:"particle.fade",anchor:{x:.5,y:.5},filter:t==="heels"?bi:J}))},vi=t=>{if(t.type==="wall"){const{direction:e}=t.config;if(e==="right"||e==="towards")return}return Zl[t.type]},yi=(t,e,n)=>{const o=vi(t);if(!n.room)return;const r=o({renderContext:{general:e.general,item:t,room:n.room},tickContext:{lastRenderRoomTime:ut,movedItems:Dn,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Yl=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},Do=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Yl(t,e,n,o),Jn=(t,e,n=.001)=>{if(!Te(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:zn({state:{position:z(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+fr},id:t.id},{state:{position:z(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},xi=(t,e)=>{const o=[...le(e).filter(i=>Jn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=ga(s,i);return a<0||a===0&&Do(t,s)>Do(t,i)?s:i})};function wi({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(si(e)||ot(e)||(e.state.action="death",e.state.expires=t+yn))}const ce=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,lt=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Ql=3e3,Si=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0);const d=(h,f=r)=>{const m=pr(o),v={type:"floatingText",id:`floatingText-${i}`,...mr,fixedZIndex:xs,aabb:I,state:{...Ln(),position:z(m,{z:O.h/2}),expires:c+Ql},config:{textLines:h,appearanceRoomTime:c}};ke({room:f,item:v})};switch(s.gives){case"hooter":{const h=Rt(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=Rt(n);h!==void 0&&(h.doughnuts=ce(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=it(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=Rt(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=it(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ce(n.state.head.lives,2),n.state.heels.lives=ce(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=ce(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(ys(s.page));break;case"reincarnation":{const h=bs(e,w.getState(),i),f=de(h.gameState);if(!f)throw new Error("how are we saving from a pickup if there is no current room?");d(["reincarnation","point","restored"],f),w.dispatch(vs(h)),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(gs(s.planet)),d([s.planet,"liberated!"]);break}}},Kl=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;gr(i,o)<=0||e.state.action!=="death"&&Un({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},ec=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Nt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=z(t.state.position,s)};function tc({movingItem:t}){t.state.autoWalk=!1}const se=(t,...e)=>W(...e)(t.touchedItem),Ze=(t,...e)=>W(...e)(t.movingItem),Ci=t=>$(t.movingItem),nc=t=>$(t.touchedItem),oc=t=>br(t.touchedItem),zo=t=>{switch(!0){case se(t,"stopAutowalk"):tc(t);break;case oc(t):wi(t);break;case se(t,"portal"):Kl(t);break;case se(t,"pickup"):Si(t);break;case se(t,"doorFrame"):ec(t);break}},Zn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Vt(e.items);if(r!==void 0)return ot(r)?void 0:r;const i=n===void 0||ot(n)||n.state.action==="death"?void 0:to(n.state.position,t),s=o===void 0||ot(o)||o.state.action==="death"?void 0:to(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},Ti=150,ki=t=>t[Math.floor(Math.random()*t.length)],he=Object.freeze({movementType:"vel",vels:{walking:I}}),Jt=t=>vr(t)?pe[t.config.which]:pe[t.type],Lo=O.w/2,rc=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=pe.homingBot;if(!Xt(e,ue))return{movementType:"steady"};for(const s of H(Vt(n.items))){if(s===void 0)continue;const a=dt(s.state.position,t);if(Math.abs(a.y)<Lo)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Lo)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ic=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return he;const l=Zn(r,e);if(l===void 0||s+Ti>e.roomTime)return Z;const c=dt(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>O.w/4?u:ct(u),h=Jt(t),f={...I,[d]:c[d]>0?h:-h},m=Ge(f),v=!Xt(m,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:ne}}},Eo=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return he;const a=Zn(i,e);if(a===void 0)return he;const l=a.state.position,c=O.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return he;const d=dt(a?.state.position,i),h=Jt(t),f=(1+Math.sqrt(2))/2,m=h*f,v=D({...d,z:0},m/Mn(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:Ge(v)}}},an=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return he;if(!(Ie(i,I)||Math.random()<o/1e3))return Z;const l=ki(r);return{movementType:"vel",vels:{walking:D(gn[l],Jt(t))},stateDelta:{facing:gn[l]}}},sc=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?he:Xt(i,ue)?{movementType:"vel",vels:{walking:D(r,Jt(t))}}:Z},$o=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=ki([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},ln=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<Ti))return;const u=jt(i,c,e,n);u.x===0&&u.y===0||(t.state.vels.walking=$o(s,u,r),t.state.facing=$o(l,u,r),t.state.durationOfTouch=0)},ac=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=I)},lc=(t,e,n,o)=>{if(!t.state.activated||vr(t)&&t.state.busyLickingDoughnutsOffFace)return he;switch(t.config.movement){case"patrol-randomly-diagonal":return an(t,e,n,o,Ts);case"patrol-randomly-xy8":return an(t,e,n,o,Cs);case"patrol-randomly-xy4":return an(t,e,n,o,Ss);case"towards-tripped-on-axis-xy4":return rc(t,e);case"towards-on-shortest-axis-xy4":return ic(t,e);case"back-forth":case"clockwise":return sc(t);case"unmoving":return he;case"towards-analogue":return Eo(t,e);case"towards-analogue-unless-planet-crowns":return Eo(t,e,n,o,ws(w.getState()));default:throw t.config,new Error("this should be unreachable")}},cc=t=>{const{movingItem:e,touchedItem:n}=t;if(Te(n,e))switch(e.config.movement){case"patrol-randomly-xy4":ln(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":ln(t,"opposite");break;case"clockwise":ln(t,"clockwise");break;case"towards-tripped-on-axis-xy4":ac(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},uc=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s],switchedAtRoomTime:n.roomTime,switchedSetting:s})}break}case"in-store":{w.dispatch(ks(o.path));break}}},dc=({movingItem:t,touchedItem:e})=>{if(!Te(t))return;const{state:{position:n},aabb:o}=e,r=jt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=Ge(r),s=D(i,-.05);return e.state.vels.sliding=s,!1},hc=({movingItem:t,touchedItem:e})=>{if(!Te(e))return;const n=t.state.vels.sliding;if(Ie(n,I))return;const{state:{position:o},aabb:r}=t,i=jt(e.state.position,e.aabb,o,r);return gr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=I),!1},fc=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=jt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Ge(c);for(const d of s){const h=e.items[d],f=D(u,-.025*o);h.state.facing=f,Nn({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:i})}},pc=1e3/12,kt=t=>{const e=t-Bs,o=e/_s*_n;return(e+.5*bn*o**2)/o},mc={head:kt(gt.head),headOnSpring:kt(gt.head+O.h),heels:kt(gt.heels),heelsOnSpring:kt(gt.heels+O.h)},Uo=(t,e,n)=>{const o=t.type==="headOverHeels"||t.type==="heels"&&n?"head":t.type;return mc[`${o}${e?"OnSpring":""}`]},gc=t=>!(t===null||Os(t)&&je(t)||Ps(t)&&t.config.gives==="scroll"||$(t)&&t.state.standingOnItemId===null),bc=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+pc>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),Ii=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Ve(o,e);if(bc(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Uo(t,!1,t.type==="heels"&&t.state.isBigJump)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&gc(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1,...t.type==="heels"?{isBigJump:!1}:{}}}:Z;const a=t.type==="heels"&&t.state.bigJumps>0,l=Is(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Uo(t,l,a)}},stateDelta:{action:"moving",jumped:!0,...t.type==="heels"?a?{bigJumps:t.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},vc=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Ue(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return D(n,l)},yc={movementType:"vel",vels:{walking:I}},Oi=(t,e,n,o)=>{const r=xc(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Ue(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Ie(r.vels.walking,I)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},xc=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:m}}}=t,v=o===t.id,k=v?n.currentActionPress("jump"):"released",R=v?n.directionVector:I,C=l===null&&m.z<0,_=i==="head"&&qn(t.state)>0&&l!==null,F=i==="headOverHeels"?C?"head":"heels":_?"heels":i,N=a?c:R,ve=pe[F];if(u!==null||s==="death")return yc;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:En(f,D(f,Rs*r))},stateDelta:{action:C?"falling":"jumping"}}:{movementType:"vel",vels:{walking:I},stateDelta:{action:"falling"}};if(k!=="released"){const mt=Ge(Xt(N,ue)?c:N),Vi=W("spring")(Ve(l,e))?1:Fs;return{movementType:"vel",vels:{walking:D({...mt,z:0},ve*Vi)},stateDelta:{facing:mt}}}}if(Ue(N)!==0)return C?{movementType:"vel",vels:{walking:D({...N,z:0},ve)},stateDelta:{facing:N,action:"falling"}}:{movementType:"vel",vels:{walking:vc({vel:f,acc:As[F],deltaMS:r,maxSpeed:ve,unitD:N,minSpeed:0})},stateDelta:{facing:N,action:"moving"}};if(d>0&&d<1){const mt=Ie(h,c)?1:0;return{movementType:"position",posDelta:D(c,mt-d),stateDelta:{action:C?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:I},stateDelta:{action:C?"falling":"idle"}}},No=t=>Oe(t.movingItem)&&Jn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Pi=(t,e)=>{let n=I;for(const o of e){if(o.movementType==="position"&&(n=z(n,o.posDelta)),o.movementType==="vel"&&(Oe(t)||W("lift")(t)))for(const[i,s]of hr(o.vels)){const a={...I,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},Ho=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&$(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&No(t)){if(No(t)&&Ci(t)){yr({above:t.movingItem,below:t.touchedItem});const n=[Ii(t.movingItem,t.room,t.gameState,t.deltaMS),Oi(t.movingItem,t.room,t.gameState,t.deltaMS)];Pi(t.movingItem,n)}Ir(t)}};function wc(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Yn=t=>{Ci(t)&&zo(t),nc(t)&&zo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),se(t,...no)&&dc(t),Ze(t,...no)&&hc(t),(Ze(t,"monster")&&se(t,"firedDoughnut")||Ze(t,"firedDoughnut")&&se(t,"monster"))&&wc(t),(Ze(t,"monster")||Ze(t,"movingPlatform"))&&cc(t),se(t,"switch")&&uc(t),se(t,"joystick")&&fc(t,Yn),t.touchedItem.state.disappear&&Ho(t),t.movingItem.state.disappear&&Te(t.touchedItem,t.movingItem)&&Ho({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Sc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=me(e.items).filter($n),u=s===null?Bi(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;Cc(e,i,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!_i(t,xr(e.items)))return;s.state.position=l,ke({room:e,item:s}),Nn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:s.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Yn}),i.carrying=null,r.actionsHandled.add("carry")}},Cc=(t,e,n)=>{e.carrying=n,n.state.wouldPickUpNext=!1,wr({room:t,item:n})},Bi=(t,e)=>xi(t,me(e.items).filter($n)),_i=(t,e)=>{const n={position:z(t.state.position,{z:O.h})},o=Ms({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(Te(r,t)){if(!Oe(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!_i(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},cn=-11,Tc={jump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],u=c===null?!1:c.type==="teleporter"&&je(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?Ct({colourised:n,button:t}):a;if(s?.pressed!==d&&Tt(h,d),u!==s?.standingOnTeleporter)if(u)Je(h,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Io(t,n,"JUMP");f.y=cn,Je(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourised:n}}},carry({renderContext:t,currentRendering:e,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=t,{currentPlayable:s,room:a}=n,l=e?.renderProps,c=e?.output,u=s&&it(s),d=u?.hasBag??!1,h=u?.carrying??null,f=h===null&&a!==void 0&&Bi(s,a)!==void 0,m=o.actions.every(C=>r.currentActionPress(C)!=="released"),v=d&&!f&&h===null,k=c===void 0?Ct({colourised:i,button:o}):c;if(k.visible=d,d&&(v!==l?.disabled&&ko(k,v,i),k.visible=!0,l?.pressed!==m&&Tt(k,m),d!==l?.hasBag||h!==l?.carrying)){let C;h!==null?C=yi(h,t,n):d&&(C=p({textureId:"bag",y:-2})),Je(k,C)}return{output:k,renderProps:{pressed:m,hasBag:d,colourised:i,carrying:h,disabled:v}}},fire({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&Rt(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=s===void 0?Ct({colourised:n,button:t}):s,h=l||lt(c)>0;if(d.visible=h,h&&(i?.pressed!==u&&Tt(d,u),l!==i?.hasHooter||c!==i?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):lt(c)>0&&(f=p({textureId:"doughnuts",y:-2}));const m=ie(new b,c);m.y=cn,m.filters=te,Je(d,f,m),ko(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,l=(r&&it(r))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let d;if(s===void 0){d=Ct({colourised:n,button:t});const h=Io(t,n,"C+J");h.y=cn,Je(d,h)}else d=s;return l?(d.visible=!0,i?.pressed!==c&&Tt(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:t}){if(t!==void 0)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:ne}},map({currentRendering:t}){if(t!==void 0)return"no-update";const e=Ke({label:"mapText",outline:!0});return ie(e,"MAP"),{output:e,renderProps:ne}}};class _e extends hi{constructor(e){const n=Tc[e.button.which];super(e,n)}}const kc=30,Ic=15,Oc=42,Pc=36,Bc=44,_c=20;class Rc{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new _e({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new _e({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new _e({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new _e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new _e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new _e({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new il({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of H(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=Ic,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=kc,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const n of H(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Bc,this.#n.mainButtonNest.y=e.y-_c,this.#n.joystick.output.x=Oc,this.#n.joystick.output.y=e.y-Pc,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of H(this.#n.buttons))r.tick({...e,currentPlayable:Xe(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}$e.frames.button.frame;const Fc=250,Ac=t=>t?48:24,Mc=t=>t?68:56,Dc=(t,e)=>t?e.x/2-24:80,zc=t=>t?72:24,Lc=t=>t?88:0,Go=112,Ye=t=>t==="heels"?1:-1;class Ec{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Qt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[To],this.#t.fps.y=Bt.h,this.#o(),n&&(this.#n=new Rc({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Ke({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Ke({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:Ke({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const n of Qt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new fe({texture:ae().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Co,y:n?0:8});s.addChild(a);const l=Ke({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=Bt.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=te),{text:l,icon:a,container:s}}#i(e){const n=new fe(ae().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#s({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ye("head")*Go,this.#t.head.doughnuts.container.y=e.y-et.h-8,this.#t.heels.carrying.container.y=e.y-et.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ye("heels")*Go,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Bt.w*2}#a(e,n){return e?n?J:nt:n?xo:tt}#l(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=bt(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=yi(s,this.renderContext,e);c!==void 0&&a.addChild(c)}a.filters=this.#a(!0,o),this.#t.heels.bag.icon.filters=this.#a(i,o)}#c(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=bt(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#a(i,o),this.#t.head.doughnuts.icon.filters=this.#a(s!==0,o),ie(this.#t.head.doughnuts.text,s)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=bt(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=Ft(i),d=u>0||!o;a.visible=d,d&&(ie(s,u),a.y=n.y-Lc(o)),c.x=a.x=(n.x>>1)+Ye(e)*Dc(o,n);const h=i===void 0?0:e==="head"?qn(i):i.bigJumps,f=h>0||!o;c.visible=f,f&&(ie(l,h),c.y=n.y-zc(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#u(r,e),a=this.#t[e].sprite;s?a.filters=i?J:nt:a.filters=i?xo:tt,a.x=(n.x>>1)+Ye(e)*Mc(o),a.y=n.y-et.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=bt(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ye(e)*Ac(o),a.y=n.y,ie(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=jn(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;tt.targetColor=o.hud.dimmed[r?"dimmed":"original"],Wn.targetColor=o.hud.dimmed[r?"basic":"original"],Co.targetColor=o.hud.icons[r?"basic":"original"],nt.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?St.colourised.head[this.#u(i,"head")?"active":"inactive"]:St.original,this.#t.heels.livesText.filters=r?St.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:St.original}#d=ut;#g(){if(Ds(w.getState())){if(performance.now()>this.#d+Fc){const e=Qe.shared.FPS;ie(this.#t.fps,Math.round(e)),To.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Qt)this.#p(n,e),this.#f(n,e),this.#h(n,e);this.#s(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const Vo={movementType:"vel",vels:{gravity:I}},$c=(t,e,n,o)=>{if(!Te(t))return Vo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=zs[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Ve(s,e);return W("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-bn*o,-l)}}}:Vo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-bn*o,-l)}}}},Xo=O.h,jo=.001,Uc=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=oo**2/(2*qe);if(n==="up"){if(e<=o)return Math.max(jo,Math.sqrt(2*qe*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(jo,Math.sqrt(2*qe*r))}else return oo}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*qe*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*qe*Math.max(e,0))):-.036},Nc=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*Xo,i=e*Xo,s=Uc({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},qo={movementType:"vel",vels:{movingFloor:I}},Hc=(t,e,n,o)=>{if($(t)&&t.state.teleporting!==null)return qo;const{state:{standingOnItemId:r}}=t,i=Ve(r,e);if(i===null||!W("conveyor")(i))return qo;const{config:{direction:s}}=i,l=W("heels")(t)&&t.state.action==="moving"&&Gt(t.state.facing)===Ls(s)?pe.heels:Es;return{movementType:"vel",vels:{movingFloor:D(gn[s],l)}}};function*Gc(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Vc=O.w*.8,Xc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Ge(c);if(r.currentActionPress("fire")==="tap"&&a&&lt(s)>0){const d={type:"firedDoughnut",...mr,config:ne,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...Ln(),position:z(l,D(u,Vc),t.type==="headOverHeels"?{z:O.h}:I),vels:{fired:D(u,pe.firedDoughnut)},disappear:"onTouch"}};ke({room:e,item:d}),i.doughnuts=ce(i.doughnuts,-1),r.actionsHandled.add("fire")}},Ri=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),jc=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),It=O.w*3,qc=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-It&&n.x<o.x+It&&n.y>o.y-It&&n.y<o.y+It},Wo=(t,e,n,o,r)=>{if(r&&t.state.activated)return Z;const i=Zn(t.state.position,e);return i===void 0?Z:qc(t,i)?Ri:jc},Wc=(t,e,n,o)=>t.state.activated?Z:He(t.state.stoodOnBy,e).some($)?Ri:Z,Jc=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Wo(t,e,n,o,!0);case"while-player-near":return Wo(t,e,n,o,!1);case"on-stand":return Wc(t,e);case"off":case"on":return Z;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Zc=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=$s(Us(`${r}-${s}`,{...l,position:I},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=En(a,D(h.aabb,.5)),ke({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*Yc(t,e,n,o){Oe(t)&&(yield $c(t,e,n,o),yield Hc(t,e),yield*Gc(t,e)),$(t)?(yield Oi(t,e,n,o),t.id===n.currentCharacterName&&(yield zl(t,e,n,o),yield Ii(t,e,n),Ns(t)&&Sc(t,e,n,o),Hs(t)&&Xc(t,e,n))):Gs(t)?yield Nc(t):Vs(t)?(yield Jc(t,e,n,o),yield lc(t,e,n,o)):Xs(t)&&Zc(t,e)}const Qc=(t,e,n,o)=>{if(!Oe(t)||t.state.standingOnItemId===null)return;const r=Ve(t.state.standingOnItemId,e);$(t)&&r.type==="pickup"&&Si({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||$(t)&&r.state.disappear==="onTouchByPlayer")&&Ir({touchedItem:r,gameState:n,room:e})},Kc=(t,e,n,o)=>{if($(t)&&t.state.standingOnItemId!==null){const s=Ve(t.state.standingOnItemId,e);(br(s)||s.type==="spikes")&&wi({room:e,movingItem:t})}const r=[...Yc(t,e,n,o)];Qc(t,e,n);let i=Pi(t,r);(Oe(t)||W("lift")(t)||W("firedDoughnut")(t))&&(i=z(i,...le(H(t.state.vels)).map(s=>D(s,o)))),Nn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:o,onTouch:Yn})},eu=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ce(e.state.head.lives,-1),e.state.heels.lives=ce(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ce(e.state.head.lives,e.state.heels.lives)===0)return;const r=lt(e.state.head.lives)>0,i=lt(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,xe(t,e);const u=ro(e)[c],d=Le({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:io(u)};return}if(t.entryState.headOverHeels!==void 0){xe(t,e);const c=Le({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=ro(e);if(xe(t,c),xe(t,u),zn(c,u)){const d=Sr({head:c,heels:u});xe(t,d,"heels");const h=Le({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:io(d)};return}else{const d=Le({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Le=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=qs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??ne});for(const i of e)ke({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ba(r,t);return r},xe=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},tu=(t,e)=>{const n=Cr(t,Tr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0){delete t.characterRooms[e.id],n!==void 0&&(t.currentCharacterName=n.type);return}else{const o=t.characterRooms[e.type];xe(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=Sr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});xe(t,a);const l=Le({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}ke({room:o,item:e});return}else{const s=Le({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},nu=(t,e)=>{e.type==="headOverHeels"?eu(t,e):tu(t,e),Xe(t)===void 0&&w.dispatch(js({offerReincarnation:!0}))},ou=t=>{for(const e of me(t.items))try{for(const n of He(e.state.stoodOnBy,t)){if(!t.items[n.id]){so(n,t);continue}if(!Jn(n,e)){so(n,t);const o=xi(n,xr(t.items));o!==void 0&&yr({above:n,below:o})}}}catch(n){throw new Error(`could not update standing on for item "${e.id}"`,{cause:n})}},ru=2*va,iu=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ru,positionDelta:n})},su=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...En(o.state.position,r),z:0};if(!Ie(s,I))for(const a of He(o.state.stoodOnBy,e))iu(a,e,s)}},au=(t,e)=>{for(const n of me(t.items))!Oe(n)||t.roomTime===n.state.actedOnAt.roomTime||Ws(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Js(n.state.position),e.add(n))},lu=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,cu=t=>{for(const e of me(t.items)){const n=e.state.position;e.state.position=Zs(n)}},uu=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},du=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Xe(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Cr(t,Tr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Jo=_n*$e.animations["particle.fade"].length*(1/$e.animations["particle.fade"].animationSpeed),hu=20,fu=38,Ot=O.w/2;let pu=0;const Fi=(t,e,n,o)=>{if(!(Math.random()<n*(o/1e3)))return;const i={...z(pr(t),{x:Math.random()*Ot-Ot/2,y:Math.random()*Ot-Ot/2}),z:t.state.position.z};ke({room:e,item:{id:`particle.${t.id}.${pu++}`,type:"particle",aabb:I,config:{forCharacter:t.type},state:{...Ln(),expires:e.roomTime+Jo+Math.random()*Jo,position:i}}})},mu=(t,e,n)=>{!(qn(t.state)>0)||t.state.standingOnItemId===null||Ue(t.state.vels.walking)<fr||Fi(t,e,hu,n)},gu=(t,e,n)=>{const{isBigJump:o}=t.state;o&&t.state.standingOnItemId===null&&(t.state.vels.gravity.z<=0||Fi(t,e,fu,n))},bu=(t,e)=>{const{head:n,heels:o}=Vt(t.items);n!==void 0&&mu(n,t,e),o!==void 0&&gu(o,t,e)},vu=(t,e)=>{const n=de(t);if(n===void 0)return Dn;du(t,n,e);const o=Object.fromEntries(Ys(n.items).map(([s,a])=>[s,a.state.position]));for(const s of H(n.items))lu(s,n)&&(wr({room:n,item:s}),$(s)&&nu(t,s));const r=Object.values(n.items).sort(uu);for(const s of r){const a=Xe(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Kc(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}bu(n,e),ou(n),cu(n);const i=new Set(le(H(n.items)).filter(s=>o[s.id]===void 0||!Ie(s.state.position,o[s.id])));return su(i,n,o),au(n,i),i},Zo=(t,e)=>{const n=T(t),o=T(z(t,{x:e.x,z:e.z})),r=T(z(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},un=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,yu=(t,e,n,o)=>{const r=Zo(t,e),i=Zo(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=un(s,a,l,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=un(d,h,f,m),k=r.topLeft.y+r.topLeft.x/2,R=r.bottomCentre.y+r.bottomCentre.x/2,C=i.topLeft.y+i.topLeft.x/2,_=i.bottomCentre.y+i.bottomCentre.x/2,F=un(k,R,C,_);return u&&v&&F},xu=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,o=e.renderAabb||e.aabb,r=t.state.position,i=e.state.position;if(!yu(r,n,i,o))return 0;for(const s of Qs){const a=t.state.position[s],l=a+n[s],c=e.state.position[s],u=c+o[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Yo(e)-Yo(t)},Yo=t=>t.state.position.x+t.state.position.y-t.state.position.z;class At extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const wu=t=>{const e=Su(t);let n=e.length,o=n;const r=new Array(n),i={},s=Cu(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new At([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,s.get(f),u)}catch(m){throw m instanceof At?m.hasClosedCycle?m:new At([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function Su(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Cu(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Qo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Pt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Tu=(t,e=new Set(H(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Pt(n,r,s);for(const r of e)if(r.fixedZIndex===void 0)for(const i of H(t)){if(i.fixedZIndex!==void 0||o.get(i)?.has(r)||r===i)continue;const s=xu(r,i);if(Qo(o,r,i),s===0){Pt(n,r.id,i.id),Pt(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;Qo(n,a,l),Pt(n,l,a)}return n},Ai=(t,e,n=3)=>{try{return{order:wu(t),impossible:!1}}catch(o){if(o instanceof At){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:Ai(t,e,n-1).order,impossible:!0}}else throw o}};class Mi extends hi{}const Ko=(t,e)=>{e.poly([T({}),T({x:t.x}),T({x:t.x,y:t.y}),T({y:t.y})]).poly([T({}),T({z:t.z}),T({y:t.y,z:t.z}),T({y:t.y})]).poly([T({x:t.x}),T({x:t.x,z:t.z}),T(t),T({x:t.x,y:t.y})]).poly([T({z:t.z}),T({x:t.x,z:t.z}),T({x:t.x,y:t.y,z:t.z}),T({y:t.y,z:t.z})])},er=(t,e)=>{const n=new q;return Ko(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Ko(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},ku={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Iu{constructor(e){this.renderContext=e;const{item:n}=e,o=ku[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),W("portal")(n)){const i=T(n.config.relativePoint);this.#e.addChild(new q().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new q().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new q({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(er(n.aabb,o)),n.renderAabb&&this.#e.addChild(er(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new Ga({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class Ou{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=T(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const Pu=({renderContext:{general:{pixiRenderer:t},item:e,room:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=e,s=o?.renderProps,a=je(e),l=a&&He(r,n).find($)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:qt(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},i),renderProps:{flashing:l,activated:a}}:"no-update"},dn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:o})=>{const r=o?.renderProps,i=Gt(n)??"towards";if(!(r===void 0||i!==r.facingXy4))return"no-update";const a=p(i==="left"||i==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(O.h*(e-1)),a.scale.x=i==="away"||i==="right"?1:-1,{output:a,renderProps:{facingXy4:i}}},tr={lift:oe("shadowMask.smallBlock"),conveyor:re(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:Ne(t)==="x"})),teleporter:Pu,floor:"no-mask",barrier:re(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:oe("shadowMask.smallRound"),block:re(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:re(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),movingPlatform:re(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),hushPuppy:oe("shadowMask.hushPuppy"),portableBlock:re(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:re(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:re(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.fullBlock"),spikes:oe("shadowMask.spikes"),switch:oe("shadowMask.switch"),pickup:re(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:oe("shadowMask.smallRound"),"monster.dalek":oe("shadowMask.dalek"),"monster.turtle":dn("turtle"),"monster.skiHead":dn("skiHead"),"monster.homingBot":oe("shadowMask.smallRound"),joystick:oe("shadowMask.joystick"),charles:dn("charles",2)},Bu=t=>t.type==="monster"?tr[`monster.${t.config.which}`]:tr[t.type],_u=new Ua({alpha:.66});class Ru{constructor(e,n){this.renderContext=e,this.#r||(this.#e.filters=_u),n!=="no-mask"&&(this.#t=new Mi(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t;#o={};get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const o=this.#t.output.children.at(0);if(o===void 0||!(o instanceof fe)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}n!==o&&(this.#r||(this.#e.mask=o))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:o}=e,{item:r,general:{pixiRenderer:i},room:s}=this.renderContext,a=n.has(r),l=r.state.position.z+r.aabb.z,c=me(s.items).filter(function(m){return m.shadowCastTexture!==void 0}),u={id:r.id,state:{position:{...r.state.position,z:l}},aabb:{...r.aabb,z:Ks}},d=Object.groupBy(c,f=>{const m=this.#o[f.id]!==void 0,v=n.has(f);return!a&&!v?m?"keepUnchanged":"noShadow":zn(u,f)?m?"update":"create":"noShadow"});for(const f of mo(d.keepUnchanged,d.update))this.#o[f.id].renderedOnProgression=o;if(d.create)for(const f of d.create){const{times:m}=f.config,v=qt(i,f.shadowCastTexture,m);v.label=f.id,this.#n.addChild(v),this.#o[f.id]={sprite:v,renderedOnProgression:o}}for(const f of mo(d.create,d.update)){const{sprite:m}=this.#o[f.id],v=T({...dt(f.state.position,r.state.position),z:r.aabb.z});m.x=v.x,m.y=v.y}for(const[f,{sprite:m,renderedOnProgression:v}]of zt(this.#o))v!==o&&(m.destroy(),delete this.#o[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const Fu=t=>{const e=Bu(t.item);return e===void 0?void 0:new Ru(t,e)};class Au{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const L=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=x.createBufferSource(),c=vn()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Re=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},E=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=L({...t}),Re(l,t.gain,s),n!==void 0&&(r?(l=L({...n,loop:!0}),Re(l,n.gain,s)):l.onended=()=>{c&&(l=L({...n,loop:!0}),Re(l,n.gain,s))})):n!==void 0&&(l=L({...n,loop:!0}),Re(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=L({...o}),Re(l,o.gain,s)));else if(c!==u&&e!==void 0){const h=L({...e});Re(h,e.gain,s)}a=!1,c=u}};class Mu{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=E({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Du{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&L({soundId:"bonus",connectTo:this.output});break}case"disappearing":{L({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,L({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class Qn{constructor(e,n,o=1){this.renderContext=e,this.#e=E({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,i=o>(e??ut)&&!Ia(kr(r));this.#e(i)}destroy(){}}class zu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new Qn(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=E({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,a=o===i&&le(kr(s)).some(l=>ea(r[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const hn=2;class Lu{constructor(e){this.renderContext=e}output=x.createGain();#e=E({start:{soundId:"conveyorStart",playbackRate:hn},loop:{soundId:"conveyorLoop",playbackRate:hn},stop:{soundId:"conveyorEnd",playbackRate:hn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=pt(e);this.#e(n)}destroy(){this.#e(!1)}}const Eu=3;class $u{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=L({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Eu*e)}destroy(){}}const nr={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},or={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},rr={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},ir={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Uu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;nr[n]!==void 0&&(this.#r=new Qn(e,nr[n]),this.#r.output.connect(this.output)),or[n]!==void 0&&(this.#t=E({change:or[n]},this.#e)),ir[n]!==void 0&&(this.#i=E(ir[n],this.#e)),rr[n]!==void 0&&(this.#o=E({loop:rr[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const a=Rn(o);this.#t(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!i;this.#o(a)}if(this.#i){const a=!Ie(s,I);this.#i(a)}}destroy(){}}class fn{constructor(e){this.renderContext=e;const{general:{soundSettings:n},item:{type:o}}=e,{noFootsteps:r}={...ht.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=E({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#a.gain.value=1.2,this.#a.connect(this.output),this.#i.connect(this.output),this.#o=E({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#r=E({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#o;#r;#i=x.createGain();#s=E({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#a=x.createGain();#l=E({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#a);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:i,jumped:s,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=it(n),{teleportingPhase:f,positionZ:m}=this.#c,v=r?r.phase:null,k=s&&l>i&&l>m&&c>0,R=l<m&&c<0&&a===null;this.#r(R),this.#o(k),this.#n!==void 0&&this.#n(!k&&!R&&o==="moving"),h!==void 0&&this.#l(h.carrying!==null);const C=a!==null&&u>(e??ut)&&d[a];if(this.#s(C),v!==null&&v!==f)if(v==="in"){const _=vn().teleportIn,F=x.createBufferSource();F.buffer=_,F.connect(this.output),F.start()}else{const _=vn().teleportOut,F=x.createBufferSource();F.buffer=_,F.connect(this.output),F.start()}this.#c={teleportingPhase:v,positionZ:l}}destroy(){}}class Nu{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=pt(e);!o&&r&&L({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Hu{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=E({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Gu{constructor(e){this.renderContext=e}output=x.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:n,stoodOnUntilRoomTime:o}}}}=this,r=pt(n);e!==void 0&&o>e&&!r&&L({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Vu{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?An(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&L({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Xu{constructor(e){this.renderContext=e}output=x.createGain();#e=E({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(je(e)&&He(e.state.stoodOnBy,n).some($))}destroy(){}}class ju{constructor(e){this.renderContext=e,L({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class qu extends Qn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const Wu={lift:$u,switch:Vu,bubbles:Du,head:fn,heels:fn,headOverHeels:fn,teleporter:Xu,monster:Uu,conveyor:Lu,spring:Gu,portableBlock:Nu,charles:zu,ball:Mu,pushableBlock:Hu,firedDoughnut:ju,slidingBlock:qu},Ju=t=>{const e=Wu[t.item.type];if(e)return new e(t)},sr=O.h*ta,ar=O.h*-1,Zu=O.w*16,Yu=0,pn=(t,e,n)=>(t-e)/(n-e)*2-1;class Qu{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Kt(ao({x:0,y:o})),this.positionMaxX=Kt(ao({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=z(o.position,D(n.aabb,.5)),i=pn(Kt(r),this.positionMaxX,this.positionMinX),s=pn(r.z,ar,sr);if(!Number.isFinite(s))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${ar},
          ${sr},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(o.position)},
          scaleXyz(${JSON.stringify(n.aabb)}, 0.5),
        )`);const a=pn(r.x+r.y,Yu,Zu);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const Ku=[new $t(g.midRed)],ed=[new $t(g.moss)],td=75;class nd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<td?o==="left"?ed:Ku:J,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const od=g.moss,rd=()=>new at({outlineColor:od,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale});class id{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:n}=this.renderContext.item.state;n!==!this.#e&&(this.output.filters=n?[rd()]:J),this.#e=n,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const sd=(t,e,n)=>$n(t)?new id(e,n):n,ad=(t,e)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{w.dispatch(ra({item:t}))}))},ld=t=>{const e=w.getState(),n=na(e),o=!oa(e),{item:r}=t,i=n==="all"||n==="non-wall"&&t.item.type!=="wall",s=[],a=vi(r);if(a!==void 0){const h=new Mi(t,a),f=new nd(t,h);s.push(sd(r,t,f)),i&&(f.output.alpha=.66)}if(o){const h=Fu(t);h!==void 0&&s.push(h)}i&&s.push(new Iu(t));let l;if(s.length===0)l=void 0;else{const h=s.length===1?s[0]:new cd(s,t);ad(r,h.output),l=new Ou(t,h)}const c=t.general.soundSettings.mute??ht.soundSettings.mute,u=t.general.paused||c?void 0:Ju(t),d=u===void 0?void 0:new Qu(t,u);return new Au(t,{graphics:l,sound:d})};class cd{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}class ud{constructor(e){this.renderContext=e;const{general:{colourised:n,soundSettings:o}}=e;this.initFilters(n,e.room.color);const i=o.mute??ht.soundSettings.mute?void 0:x.createGain();this.output={sound:i,graphics:new b({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})}}#e=new b({label:"items"});#n=new b({label:"floorEdge"});output;#t=void 0;#o=new Map;#r=new Map;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Ya:J:new U(jn(n).main.original)}#i(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of me(n.items)){let i=this.#r.get(r.id);if(i===void 0){i=ld({...this.renderContext,item:r}),this.#r.set(r.id,i);const s=r.type==="floorEdge"?this.#n:this.#e,{graphics:a,sound:l}=i.output;if(a&&(s.addChild(a),r.fixedZIndex&&(a.zIndex=r.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{i.tick(o)}catch(s){throw new Error(`RoomRenderer caught error while ticking Renderer for item "${r.id}" - item JSON is:
           ${JSON.stringify(r,null,2)}`,{cause:s})}}for(const[r,i]of this.#r.entries())n.items[r]===void 0&&(i.destroy(),this.#r.delete(r))}#s(e){const{order:n}=Ai(Tu(this.renderContext.room.items,e.movedItems,this.#o),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);const i=r.output.graphics;if(i)i.zIndex=n.length-o;else throw new Error(`order ${n[o]} was given a z-order by sorting, but item has no graphics`)}}get#a(){return this.#t!==void 0}tick(e){const n=this.#a?e:{...e,movedItems:new Set(me(this.renderContext.room.items))};this.#i(n),(!this.#a||n.movedItems.size>0)&&this.#s(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Zt=`in vec2 aPosition;
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
}`,dd=`precision highp float;
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
`,hd=`struct CRTUniforms {
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
}`,fd=Object.defineProperty,pd=(t,e,n)=>e in t?fd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Mt=(t,e,n)=>(pd(t,typeof e!="symbol"?e+"":e,n),n);const Di=class zi extends Y{constructor(e){e={...zi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:hd,entryPoint:"mainFragment"}}),o=G.from({vertex:Zt,fragment:dd,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Mt(this,"uniforms"),Mt(this,"seed"),Mt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Mt(Di,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let md=Di;var gd=`
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
}`,bd=`struct KawaseBlurUniforms {
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
}`,vd=`
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
`,yd=`struct KawaseBlurUniforms {
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
}`,xd=Object.defineProperty,wd=(t,e,n)=>e in t?xd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ye=(t,e,n)=>(wd(t,typeof e!="symbol"?e+"":e,n),n);const Li=class Ei extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(rt("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Ei.DEFAULT_OPTIONS,...n};const o=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?yd:bd,entryPoint:"mainFragment"}}),r=G.from({vertex:Zt,fragment:n?.clamp?vd:gd,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ye(this,"uniforms"),ye(this,"_pixelSize",{x:0,y:0}),ye(this,"_clamp"),ye(this,"_kernels",[]),ye(this,"_blur"),ye(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=Me.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),Me.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};ye(Li,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Sd=Li;var Cd=`in vec2 vTextureCoord;
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
`,Td=`struct AdvancedBloomUniforms {
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
`,kd=`
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
`,Id=`struct ExtractBrightnessUniforms {
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
`,Od=Object.defineProperty,Pd=(t,e,n)=>e in t?Od(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,$i=(t,e,n)=>(Pd(t,typeof e!="symbol"?e+"":e,n),n);const Ui=class Ni extends Y{constructor(e){e={...Ni.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:Id,entryPoint:"mainFragment"}}),o=G.from({vertex:Zt,fragment:kd,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),$i(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};$i(Ui,"DEFAULT_OPTIONS",{threshold:.5});let Bd=Ui;var _d=Object.defineProperty,Rd=(t,e,n)=>e in t?_d(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ae=(t,e,n)=>(Rd(t,typeof e!="symbol"?e+"":e,n),n);const Hi=class Gi extends Y{constructor(e){e={...Gi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Yt,entryPoint:"mainVertex"},fragment:{source:Td,entryPoint:"mainFragment"}}),o=G.from({vertex:Zt,fragment:Cd,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:we.WHITE}}),Ae(this,"uniforms"),Ae(this,"bloomScale",1),Ae(this,"brightness",1),Ae(this,"_extractFilter"),Ae(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Bd({threshold:e.threshold}),this._blurFilter=new Sd({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Me.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Me.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Me.returnTexture(s),Me.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Ae(Hi,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Fd=Hi;const Ad=ne,Md=(t,e)=>(n,o)=>{const r=new Set;if(ia(n)){const u=de(n)?.items;if(u!==void 0){const d=le(H(Vt(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const s=o*n.gameSpeed,a=Math.ceil(s/e),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)r.add(h)}const c=de(n)?.items??Ad;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},Fe=.33,Dd=sa()==="mobile"?-4:16,Bn=Ee.h-Ee.w/2,zd=pe.heels;class Ld{constructor(e,n){this.renderContext=e,this.childRenderer=n;const{room:o,general:{upscale:{gameEngineScreenSize:r},displaySettings:i}}=e,{edgeLeftX:s,edgeRightX:a,frontSide:l,topEdgeY:c}=Ht(o.roomJson);this.#r=s+l.x,this.#i=a+l.x;const u=(a+s)/2;this.#s={x:r.x/2-u,y:r.y-Dd-l.y-Math.abs(u/2)},this.#n=this.#s.x+this.#r<0,this.#t=this.#s.x+this.#i>r.x,this.#o=this.#s.y+c-Bn<0;const d=this.childRenderer.output.graphics;if(d===void 0)throw new Error("can't scroll a renderer without graphics");const h={sound:this.childRenderer.output.sound,graphics:new b({children:[d],label:`RoomScrollRenderer(${o.id})`})};(i?.showBoundingBoxes??ht.displaySettings.showBoundingBoxes)!=="none"&&h.graphics.addChild(Ed(e.room.roomJson)),this.output=h}#e=!1;#n;#t;#o;#r;#i;#s;output;tick(e){const{general:{upscale:{gameEngineScreenSize:n},gameState:o}}=this.renderContext,{deltaMS:r}=e,i=Xe(o);if(i===void 0)return;const s=T(i.state.position),a=z(s,this.#s),l={x:this.#n&&a.x<n.x*Fe?Math.min(-this.#r,n.x*Fe-s.x):this.#t&&a.x>n.x*(1-Fe)?Math.max(n.x-this.#i,n.x*(1-Fe)-s.x):this.#s.x,y:this.#o&&a.y<n.y*Fe?n.y*Fe-s.y:this.#s.y},c=this.output.graphics;if(!this.#e)c.x=l.x,c.y=l.y;else{const d=zd*r,h=dt(c,l),f=Mn(h);if(f>d){const m={x:h.x/f,y:h.y/f};c.x-=m.x*d,c.y-=m.y*d}else c.x=l.x,c.y=l.y}this.#e=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Ed=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Ht(t);return new q().rect(e+o.x,r-Bn,n-e,o.y-r+Bn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")},lr=({crtFilter:t},e)=>[t?new md({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Fd({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class $d{constructor(e,n){this.app=e,this.gameState=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#i.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,de(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#a(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#i=x.createGain();#s=Md(vu,ha);#a(e){w.dispatch(aa(la(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=lr(e,!0),this.#n=lr(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#a(o)}};tick=({deltaMS:e})=>{const n=w.getState(),o=ca(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=w.getState(),a=!o&&!(r?.uncolourised??ht.displaySettings.uncolourised),l=ua(n),c=da(n);(this.#t?.renderContext.general.colourised!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Ec({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#t.output));const u=de(this.gameState);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=o?Dn:this.#s(this.gameState,e),h=de(this.gameState);if(this.#o?.renderContext.room!==h||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o){if(this.#o?.destroy(),h){const f={general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},room:h};this.#o=new Ld(f,new ud(f)),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#i)}else this.#o=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#o?.tick({progression:this.gameState.progression,movedItems:d,deltaMS:e}),o?this.app.stage.filters=this.#e:this.app.stage.filters=this.#n};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#i.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Ut.add(Br,_r,Rr,Fr,Ar,Mr,Dr,zr,Lr,Er,$r,Nr,Ur,Hr,Gr,Vr,Xr,jr,qr,Wr,Jr);ma.defaultOptions.scaleMode="nearest";const cr=async(t,e)=>{const n=new oi;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=fa;const o=w.getState().gameMenus.currentGame,r=lo({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(pa(o.store.gameMenus)):(w.dispatch(co(r.characterRooms.head.id)),w.dispatch(co(r.characterRooms.heels.id)));const i=new $d(n,r).start();return{campaign:t,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Xe(r);a!==void 0&&Un({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return de(r)},get gameState(){return r},reincarnateFrom(s){lo({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},jd=Object.freeze(Object.defineProperty({__proto__:null,default:cr,gameMain:cr},Symbol.toStringTag,{value:"Module"}));export{Kr as A,Zr as C,Y as F,Vn as R,Fa as S,ei as V,La as a,jd as g,Ra as u};
