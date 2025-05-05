const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-lN7Usldu.js","assets/App-CiG4hPx4.js","assets/index-K6xui6JH.js","assets/index-BGYEaiUx.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-C2Cl6YvC.js","assets/Graphics-TaT31Ywh.js","assets/changeCharacterRoom-BAuZar-M.js","assets/WebGLRenderer-Tcbdm4NO.js"])))=>i.map(i=>d[i]);
import{b3 as zs,b4 as Ko,b5 as Ls,am as Es,aq as Te,ar as H,ae as Qo,an as xe,Z as S,a2 as Lt,a0 as $s,a3 as b,d as nt,v as Rt,aG as y,a6 as dn,ay as fe,_ as Ze,$ as Us,V as Ns,b6 as Gs,b7 as Hs,b8 as Vs,ad as Xs,b9 as q,ba as qn,K as _,bb as er,bc as ie,bd as P,be as tr,s as nr,M as w,o as G,c as B,bf as js,bg as qs,bh as Ws,g as M,w as at,bi as Js,bj as In,bk as or,bl as Zs,bm as Ys,bn as Ks,bo as It,i as ae,t as ke,p as On,l as $,bp as Qs,bq as ei,br as ti,bs as ni,bt as oi,bu as ri,I as ot,bv as Ot,e as si,bw as lt,bx as rr,by as ii,bz as sr,k as ir,bA as Et,bB as U,j as J,bC as ar,bD as Pn,bE as Wn,bF as lr,bG as ai,bH as ct,bI as Bn,bJ as Ie,bK as $t,bL as de,R as ut,H as le,bM as pe,x as Oe,bN as hn,bO as li,bP as ci,bQ as ui,bR as di,bS as _n,A as Ue,bT as hi,bU as fi,bV as pi,bW as fn,bX as mi,bY as gi,bZ as pt,f as Fn,b_ as bi,b$ as vi,c0 as yi,m as Pe,C as cr,c1 as Jn,h as me,c2 as ur,r as dr,b as xi,a as hr,n as wi,a$ as Ne,c3 as Wt,c4 as Ke,c5 as mt,c6 as Rn,c7 as Ci,c8 as Si,c9 as Xe,ca as Zn,cb as Ut,cc as Ti,cd as ki,ce as Ge,cf as Ii,cg as Oi,ch as Pi,ci as Bi,cj as _i,ck as Fi,cl as Ri,cm as Ai,cn as Yn,L as Kn,co as fr,b2 as pr,E as mr,F as Mi,B as Qn,cp as Di,cq as zi,cr as Li,a_ as we,cs as gr,ct as Ei,cu as $i,cv as T,cw as An,S as He,cx as Ui,cy as At,cz as x,cA as pn,cB as br,q as Ni,cC as rt,cD as Jt,J as eo,cE as Gi,cF as Pt,cG as Hi,cH as Vi,cI as to,cJ as Xi,cK as ji,cL as qi,cM as Nt,cN as Wi,cO as $e,cP as Ji,cQ as Zi,cR as Yi,aw as De,cS as Ki,cT as Qi,cU as ea,cV as ta,cW as na,cX as oa,cY as ra,cZ as sa,c_ as no,c$ as ia,N as oo,d0 as aa}from"./App-CiG4hPx4.js";import{a as la,f as mn,c as Mn,m as Gt,b as Dn,d as vr,r as ca,o as ua}from"./changeCharacterRoom-BAuZar-M.js";import{S as da,G as W}from"./Graphics-TaT31Ywh.js";import{g as yr,_ as ro}from"./index-K6xui6JH.js";var gt={},so;function ha(){if(so)return gt;so=1;var t=zs(),e=t.mark(s),n=Ko(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function s(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return h=d[u],v.delegateYield(r(h),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}gt.__concat=s;var i=o(s);return gt.concat=i,gt}var bt={},io;function fa(){if(io)return bt;io=1;var t=Ko(),e=t.iterableCurry,n=Ls(),o=n.__firstOr,r=Symbol("none");function s(a){return o(a,r)===r}bt.__isEmpty=s;var i=e(s,{reduces:!0});return bt.isEmpty=i,bt}var Zt,ao;function pa(){return ao||(ao=1,Zt=ha().concat),Zt}var ma=pa();const lo=yr(ma);var Yt,co;function ga(){return co||(co=1,Yt=fa().isEmpty),Yt}var ba=ga();const va=yr(ba),xr=class gn extends Es{constructor(e){e={...gn.defaultOptions,...e},super(e),this.enabled=!0,this._state=da.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let s,i;return n&&(s=Te.from(n)),o&&(i=H.from(o)),new gn({gpuProgram:s,glProgram:i,...r})}};xr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=xr;var ya=`
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
`,xa=`in vec2 aPosition;
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
`,wa=`
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
}`;class F extends Y{constructor(e){const n=e.gpu,o=uo({source:wa,...n}),r=Te.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),s=e.gl,i=uo({source:ya,...s}),a=H.from({vertex:xa,fragment:i}),l=new Qo({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:xe.EMPTY}})}}function uo(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const zn=`
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
    `,Ln=`
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
	`;class wr extends F{constructor(){super({gl:{functions:`
                ${zn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ln}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}wr.extension={name:"color",type:S.BlendMode};class Cr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"color-burn",type:S.BlendMode};class Sr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Sr.extension={name:"color-dodge",type:S.BlendMode};class Tr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Tr.extension={name:"darken",type:S.BlendMode};class kr extends F{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"difference",type:S.BlendMode};class Ir extends F{constructor(){super({gl:{functions:`
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
            `}})}}Ir.extension={name:"divide",type:S.BlendMode};class Or extends F{constructor(){super({gl:{functions:`
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
            `}})}}Or.extension={name:"exclusion",type:S.BlendMode};class Pr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"hard-light",type:S.BlendMode};class Br extends F{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"hard-mix",type:S.BlendMode};class _r extends F{constructor(){super({gl:{functions:`
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
            `}})}}_r.extension={name:"lighten",type:S.BlendMode};class Fr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"linear-burn",type:S.BlendMode};class Rr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Rr.extension={name:"linear-dodge",type:S.BlendMode};class Ar extends F{constructor(){super({gl:{functions:`
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
            `}})}}Ar.extension={name:"linear-light",type:S.BlendMode};class Mr extends F{constructor(){super({gl:{functions:`
                ${zn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ln}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Mr.extension={name:"luminosity",type:S.BlendMode};class Dr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"negation",type:S.BlendMode};class zr extends F{constructor(){super({gl:{functions:`
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
                `}})}}zr.extension={name:"overlay",type:S.BlendMode};class Lr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Lr.extension={name:"pin-light",type:S.BlendMode};class Er extends F{constructor(){super({gl:{functions:`
                ${zn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Ln}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Er.extension={name:"saturation",type:S.BlendMode};class $r extends F{constructor(){super({gl:{functions:`
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
                `}})}}$r.extension={name:"soft-light",type:S.BlendMode};class Ur extends F{constructor(){super({gl:{functions:`
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
                `}})}}Ur.extension={name:"subtract",type:S.BlendMode};class Nr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Nr.extension={name:"vivid-light",type:S.BlendMode};const bn=[];Lt.handleByNamedList(S.Environment,bn);async function Ca(t){if(!t)for(let e=0;e<bn.length;e++){const n=bn[e];if(n.value.test()){await n.value.load();return}}}let je;function Sa(){if(typeof je=="boolean")return je;try{je=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{je=!1}return je}var Gr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Gr||{});class Ta{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,s,i,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,s,i,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const ka=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Hr=class Vr extends $s{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...ka,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ca(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Vr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(nt(Rt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:y.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Gr.ALL);const{clear:o,clearColor:r,target:s}=e;y.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(s,o,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Ta(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,s)=>(r[s.name]=s.value,r),{});e.forEach(r=>{const s=r.value,i=r.name,a=o[i];this.renderPipes[i]=new s(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Sa())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Hr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Xr=Hr,vt;function Ia(t){return vt!==void 0||(vt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Xr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!dn.get().getWebGLRenderingContext())return!1;let o=dn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const s=o.getExtension("WEBGL_lose_context");s&&s.loseContext()}return o=null,r}catch{return!1}})()),vt}let yt;async function Oa(t={}){return yt!==void 0||(yt=await(async()=>{const e=dn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),yt}const ho=["webgl","webgpu","canvas"];async function Pa(t){let e=[];t.preference?(e.push(t.preference),ho.forEach(s=>{s!==t.preference&&e.push(s)})):e=ho.slice();let n,o={};for(let s=0;s<e.length;s++){const i=e[s];if(i==="webgpu"&&await Oa()){const{WebGPURenderer:a}=await ro(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-lN7Usldu.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(i==="webgl"&&Ia(t.failIfMajorPerformanceCaveat??Xr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await ro(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-Tcbdm4NO.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(i==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const jr="8.8.1";class qr{static init(){globalThis.__PIXI_APP_INIT__?.(this,jr)}static destroy(){}}qr.extension=S.Application;class Ba{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,jr)}destroy(){this._renderer=null}}Ba.extension={type:[S.WebGLSystem,S.WebGPUSystem],name:"initHook",priority:-10};const Wr=class vn{constructor(...e){this.stage=new b,e[0]!==void 0&&nt(Rt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Pa(e),vn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return nt(Rt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=vn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Wr._plugins=[];let Jr=Wr;Lt.handleByList(S.Application,Jr._plugins);Lt.add(qr);var _a=`in vec2 aPosition;
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
`,Fa=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,fo=`struct GlobalFilterUniforms {
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
}`;const Zr=class Yr extends Y{constructor(e){e={...Yr.defaultOptions,...e};const n=Te.from({vertex:{source:fo,entryPoint:"mainVertex"},fragment:{source:fo,entryPoint:"mainFragment"}}),o=H.from({vertex:_a,fragment:Fa,name:"alpha-filter"}),{alpha:r,...s}=e,i=new Qo({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:n,glProgram:o,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Zr.defaultOptions={alpha:1};let Ra=Zr;class st extends fe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof xe?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ze.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ze.shared.add(this.update,this,Us.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=o/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(xe.from(e[o]));return new st(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(xe.from(e[o]));return new st(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof xe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ze.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ze.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Aa extends Ns{constructor(e,n){const{text:o,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Gs({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+n&&(s=-o*this.anchor.y,e.y>=s&&e.y<=s+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Ma(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(nt(Rt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Da extends Aa{constructor(...e){const n=Ma(e,"Text");super(n,Hs),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Vs.measureText(this._text,this._style),{width:r,height:s}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*s,e.maxY=e.minY+s}}class En extends xe{static create(e){return new En({source:new Xs(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Ce=t=>{const[e,n,o]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:o/2})},X={original:new y(q.zxWhite),basic:g.white,dimmed:g.lightGrey},j={original:new y(q.zxYellow),basic:g.midRed,dimmed:g.redShadow},K={original:new y(q.zxMagenta),basic:g.pink,dimmed:Ce(g.pink)},A={original:new y(q.zxCyan),basic:g.pastelBlue,dimmed:Ce(g.pastelBlue)},Q={original:new y(q.zxGreen),basic:g.moss,dimmed:Ce(g.moss)},$n={white:{basic:{main:X,edges:{towards:A,right:j},hud:{lives:j,dimmed:K,icons:A}},dimmed:{main:X,edges:{towards:Q,right:A},hud:{lives:j,dimmed:K,icons:A}}},yellow:{basic:{main:j,edges:{towards:Q,right:X},hud:{lives:A,dimmed:K,icons:Q}},dimmed:{main:j,edges:{towards:A,right:A},hud:{lives:A,dimmed:K,icons:Q}}},magenta:{basic:{main:K,edges:{towards:Q,right:A},hud:{lives:X,dimmed:A,icons:j}},dimmed:{main:K,edges:{towards:Q,right:A},hud:{lives:X,dimmed:A,icons:j}}},cyan:{basic:{main:A,edges:{towards:K,right:X},hud:{lives:X,dimmed:Q,icons:j}},dimmed:{main:A,edges:{towards:K,right:X},hud:{lives:X,dimmed:Q,icons:j}}},green:{basic:{main:Q,edges:{towards:A,right:j},hud:{lives:X,dimmed:K,icons:A}},dimmed:{main:Q,edges:{towards:A,right:j},hud:{lives:X,dimmed:K,icons:A}}}},Un=t=>$n[t.hue][t.shade],ze={head:g.pastelBlue,heels:g.pink},Bt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+qn>n?100-Math.ceil((n-e)/(qn/100)):0},Kr=t=>t.type==="headOverHeels"?Bt(t.state.head)>0||Bt(t.state.heels)>0:Bt(t.state)>0,Qr=t=>{const e=100*_.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/_.w):0},za={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},dt=`in vec2 aPosition;
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
`,La=`in vec2 vTextureCoord;
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
`;class be extends Y{constructor(e){const n=Object.keys(e).length,o=H.from({vertex:dt,fragment:La.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([s,i],a)=>{g[s].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),i.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const Ea=`precision mediump float;
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
`;class N extends Y{uniforms;constructor(e="white"){const n=H.from({vertex:dt,fragment:Ea,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const $a=`precision mediump float;
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
`;class Ua extends Y{constructor(){const e=H.from({vertex:dt,fragment:$a,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const es=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),ts=t=>es($n[t.color.hue][t.color.shade].main),ns=t=>new be({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&ts(t)}),Na=new be({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Ga=t=>new be({replaceLight:t,replaceDark:Ce(t)}),yn=(t,e,n)=>n?new be(es($n[t.color.hue][t.color.shade].edges[e])):new N(Un(t.color).edges[e].original),ge=t=>new be(ts(t)),po=new Ua,ce=er,Ha=new be(za),mo={x:.5,y:1},go=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),xn=t=>{if(typeof t=="string")return xn({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:s,filter:i,times:a,label:l}=t;let c;if(go(t)?c=Va(t):c=new fe(ie().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let m=1;m<=u.z;m++){const v=xn({...t,times:void 0,label:`(${h},${f},${m})`}),k=P({x:h-1,y:f-1,z:m-1});v.x+=k.x,v.y+=+k.y,d.addChild(v)}return d}if(e===void 0&&o===void 0)if(go(t))c.anchor=mo;else{const u=ie().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=mo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),s!==void 0&&(c.y=s),i!==void 0&&(c.filters=i),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=xn;function Va({animationId:t,reverse:e,playOnce:n,paused:o}){const r=ie().animations[t],i=(o?[r[0]]:r).map(l=>({texture:l,time:tr}));e&&i.reverse();const a=new st(i);return a.animationSpeed=nr.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Xa=`#version 300 es

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
`;class Se extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=H.from({vertex:dt,fragment:Xa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const s=this.resources.colorReplaceUniforms.uniforms,[i,a,l]=e.toArray();s.uOutline[0]=i,s.uOutline[1]=a,s.uOutline[2]=l,s.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,s.uOutlineWidth[0]=1)}}const te=new Se({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),Qe=new N,bo=new N,Nn=new N,vo=new N(g.moss),et=new N,ee=[Qe,te],ja=[et,te],qa=[te,Nn],xt={original:[te,et],colourised:{head:{active:[te,new N(ze.head)],inactive:[te,new N(Ce(ze.head))]},heels:{active:[te,new N(ze.heels)],inactive:[te,new N(Ce(ze.heels))]}}},Be=14,Wa=2,Ja=Math.cos(30*(Math.PI/180)),Za=40;class Ya{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Be,y:-14,filter:ee}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Be,y:Be,filter:ee}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Be,filter:ee}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Be*Math.SQRT2,filter:ee}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Be*Math.SQRT2,filter:ee}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new W().circle(0,0,Za).fill("#00000000"));for(const o of G(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?ce:Qe}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=B};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=js(w.getState()),{x:o,y:r}=this.output,{x:s,y:i}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(s/n-o)/(a/2),u=(i/n-r)/(l/2),d=qs({x:-c,y:-u}),h=Ws(d,Ja),f=M(h,Wa);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=at(e)>Js?In(e):void 0;for(const[r,s]of or(this.arrowSprites))s.filters=r===o?ja:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const wn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:q.zxBlue,fire:q.zxYellow,carry:q.zxGreen,carryAndJump:q.zxRed,menu:q.zxWhite,map:q.zxWhite}};function Mt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*Ka(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=Zs(e);let o=0;for(const r of e){const s=`hud.char.${Ks(r)}`;try{Ys(s)}catch(i){throw new Error(`no texture id for char "${r}": ${i.message}`,{cause:i})}yield p({textureId:s,x:(o+.5-n/2)*It.w}),o++}}const re=(t,e)=>{t.removeChildren();try{Mt(Ka(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Ye=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?qa:Nn,scale:{x:1,y:t?2:1}}),Dt=Symbol(),os=Symbol(),rs=Symbol(),wt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Ga(wn.colourised[e]):o.filters=new N(wn.zx[e]),n.addChild(r);const s=new b({label:"surface"}),i=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(i),s.mask=i,n.addChild(s),o[os]=r,o[Dt]=s,o[rs]=n,o},qe=(t,...e)=>{t[Dt].removeChildren();for(const n of e)n!==void 0&&t[Dt].addChild(n)},Ct=(t,e)=>{t[os].texture=ie().textures[e?"button.pressed":"button"],t[rs].y=e?1:0},yo=(t,e,n)=>{n&&(t[Dt].filters=e?ns():ce)},xo=({which:t},e,n)=>{const o=re(new b,n);return o.filters=new be({white:e?Ce(wn.colourised[t]):g.pureBlack}),o};class ss{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new b({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&(console.log("removing",this.#e.output,"from",this.output),this.output.removeChild(this.#e.output)),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const is=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Qa=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),s=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*s},wo=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Qa(t,e,n,o),Gn=(t,e,n=.001)=>{if(!ke(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:On({state:{position:$(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+Qs},id:t.id},{state:{position:$(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},as=(t,e)=>{const o=[...ae(e).filter(s=>Gn(t,s))];return o.length===0?void 0:o.reduce((s,i)=>{const a=la(i,s);return a<0||a===0&&wo(t,i)>wo(t,s)?i:s})},tt=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<ei};function ls({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Kr(e)||tt(e)||(e.state.action="death",e.state.expires=t+mn))}const ue=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,it=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,el=3e3,cs=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:s,config:i}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[s]===!0)return;l[s]&&(u[a]===void 0&&(u[a]={}),u[a][s]=!0);const d=h=>{const f=si(o),m={type:"floatingText",id:`floatingText-${s}`,...sr,fixedZIndex:ii,aabb:B,state:{...rr(),position:$(f,{z:_.h/2}),expires:c+el},config:{textLines:h,appearanceRoomTime:c}};lt({room:r,item:m})};switch(i.gives){case"hooter":{const h=Ot(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=Ot(n);h!==void 0&&(h.doughnuts=ue(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=ot(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=Ot(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=ot(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ue(n.state.head.lives,2),n.state.heels.lives=ue(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=ue(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(ri(i.page));break;case"reincarnation":{w.dispatch(ni(oi(e,w.getState()))),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(ti(i.planet)),d([i.planet,"liberated!"]);break}}},tl=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:s}}=n;ir(s,o)<=0||e.state.action!=="death"&&Mn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},nl=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,s=Et(o);if(r==="top")return;const i=r==="far"?{x:s==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:s==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:s==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:s==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=$(t.state.position,i)};function ol({movingItem:t}){t.state.autoWalk=!1}const se=(t,...e)=>J(...e)(t.touchedItem),We=(t,...e)=>J(...e)(t.movingItem),us=t=>U(t.movingItem),rl=t=>U(t.touchedItem),sl=t=>ar(t.touchedItem),Co=t=>{switch(!0){case se(t,"stopAutowalk"):ol(t);break;case sl(t):ls(t);break;case se(t,"portal"):tl(t);break;case se(t,"pickup"):cs(t);break;case se(t,"doorFrame"):nl(t);break}},Z={movementType:"steady"},Hn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Pn(e.items);if(r!==void 0)return tt(r)?void 0:r;const s=n===void 0||tt(n)||n.state.action==="death"?void 0:Wn(n.state.position,t),i=o===void 0||tt(o)||o.state.action==="death"?void 0:Wn(o.state.position,t);return s===void 0?o:i===void 0||s<i?n:o},ds=150,hs=t=>t[Math.floor(Math.random()*t.length)],he=Object.freeze({movementType:"vel",vels:{walking:B}}),Ht=t=>lr(t)?pe[t.config.which]:pe[t.type],So=_.w/2,il=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const s=pe.homingBot;if(!$t(e,de))return{movementType:"steady"};for(const i of G(Pn(n.items))){if(i===void 0)continue;const a=ct(i.state.position,t);if(Math.abs(a.y)<So)return{movementType:"vel",vels:{walking:{x:a.x>0?s:-.05,y:0,z:0}}};if(Math.abs(a.x)<So)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?s:-.05,z:0}}}}return{movementType:"steady"}},al=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:s,timeOfLastDirectionChange:i,facing:a}}=t;if(s===null)return he;const l=Hn(r,e);if(l===void 0||i+ds>e.roomTime)return Z;const c=ct(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>_.w/4?u:ut(u),h=Ht(t),f={...B,[d]:c[d]>0?h:-h},m=Ie(f),v=!$t(m,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:le}}},To=(t,e,n,o,r=!1)=>{const{state:{position:s,standingOnItemId:i}}=t;if(i===null)return he;const a=Hn(s,e);if(a===void 0)return he;const l=a.state.position,c=_.w*3;if(!(s.x>l.x-c&&s.x<l.x+c&&s.y>l.y-c&&s.y<l.y+c))return he;const d=ct(a?.state.position,s),h=Ht(t),f=(1+Math.sqrt(2))/2,m=h*f,v=M({...d,z:0},m/Bn(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:Ie(v)}}},Kt=(t,e,n,o,r)=>{const{state:{vels:{walking:s},standingOnItemId:i}}=t;if(i===null)return he;if(!(Oe(s,B)||Math.random()<o/1e3))return Z;const l=hs(r);return{movementType:"vel",vels:{walking:M(hn[l],Ht(t))},stateDelta:{facing:hn[l]}}},ll=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:s},standingOnItemId:i}}=t;return i===null?he:$t(s,de)?{movementType:"vel",vels:{walking:M(r,Ht(t))}}:Z},cl=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=hs([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},Qt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:s,vels:{walking:i},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ds))return;const c=Gt(s,l,e,n);if(c.x===0&&c.y===0)return;const u=cl(i,c,r);t.state.vels.walking=u,t.state.facing=Ie(u),t.state.durationOfTouch=0},ul=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=B)},dl=(t,e,n,o)=>{if(!t.state.activated||lr(t)&&t.state.busyLickingDoughnutsOffFace)return he;switch(t.config.movement){case"patrol-randomly-diagonal":return Kt(t,e,n,o,ui);case"patrol-randomly-xy8":return Kt(t,e,n,o,ci);case"patrol-randomly-xy4":return Kt(t,e,n,o,li);case"towards-tripped-on-axis-xy4":return il(t,e);case"towards-on-shortest-axis-xy4":return al(t,e);case"back-forth":case"clockwise":return ll(t);case"unmoving":return he;case"towards-analogue":return To(t,e);case"towards-analogue-unless-planet-crowns":return To(t,e,n,o,ai(w.getState()));default:throw t.config,new Error("this should be unreachable")}},hl=t=>{const{movingItem:e,touchedItem:n}=t;if(ke(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Qt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Qt(t,"opposite");break;case"clockwise":Qt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":ul(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},fl=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s))switch(o.type){case"in-room":{const i=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[i],switchedAtRoomTime:n.roomTime,switchedSetting:i})}break}case"in-store":{w.dispatch(di(o.path));break}}},pl=({movingItem:t,touchedItem:e})=>{if(!ke(t))return;const{state:{position:n},aabb:o}=e,r=Gt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const s=Ie(r),i=M(s,-.05);return e.state.vels.sliding=i,!1},ml=({movingItem:t,touchedItem:e})=>{if(!ke(e))return;const n=t.state.vels.sliding;if(Oe(n,B))return;const{state:{position:o},aabb:r}=t,s=Gt(e.state.position,e.aabb,o,r);return ir(s,t.state.vels.sliding)>0&&(t.state.vels.sliding=B),!1},gl=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},s)=>{const{config:{controls:i},state:{position:a},aabb:l}=n,c=Gt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Ie(c);for(const d of i){const h=e.items[d],f=M(u,-.025*o);h.state.facing=f,Dn({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:s})}},Ve=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:_n(w.getState(),t),bl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:s}}=t,{inputStateTracker:i}=n,a=i.currentActionPress("jump"),l=s===null?null:e.items[s],c=l!==null&&J("teleporter")(l)&&Ve(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:mn}}}:Z;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Mn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:mn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},vl=1e3/12,St=t=>{const e=t-mi,o=e/gi*tr;return(e+.5*fn*o**2)/o},yl={head:St(pt.head),headOnSpring:St(pt.head+_.h),heels:St(pt.heels),heelsOnSpring:St(pt.heels+_.h)},ko=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return yl[`${n}${e?"OnSpring":""}`]},xl=t=>!(t===null||fi(t)&&Ve(t)||pi(t)&&t.config.gives==="scroll"||U(t)&&t.state.standingOnItemId===null),wl=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+vl>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),fs=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,s=Ue(o,e);if(wl(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:ko(t,!1)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&xl(s)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Z;const a=hi(s);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:ko(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},Cl=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:s=0})=>{const i=at(t),a=Math.max(s,Math.min(o,i+e*r)),l=Math.min(a,o);return M(n,l)},Sl={movementType:"vel",vels:{walking:B}},ps=(t,e,n,o)=>{const r=Tl(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const s=at(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:s===0?0:t.state.walkDistance+s*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+s*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Oe(r.vels.walking,B)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Tl=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:s,state:{action:i,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:m}}}=t,v=o===t.id,k=v?n.currentActionPress("jump"):"released",R=v?n.directionVector:B,O=l===null&&m.z<0,C=s==="head"&&Qr(t.state)>0&&l!==null,I=s==="headOverHeels"?O?"head":"heels":C?"heels":s,D=a?c:R,V=pe[I];if(u!==null||i==="death")return Sl;if(s==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Fn(f,M(f,bi*r))},stateDelta:{action:O?"falling":"jumping"}}:{movementType:"vel",vels:{walking:B},stateDelta:{action:"falling"}};if(k!=="released"){const ft=Ie($t(D,de)?c:D),Ds=J("spring")(Ue(l,e))?1:vi;return{movementType:"vel",vels:{walking:M({...ft,z:0},V*Ds)},stateDelta:{facing:ft}}}}if(at(D)!==0)return O?{movementType:"vel",vels:{walking:M({...D,z:0},V)},stateDelta:{facing:D,action:"falling"}}:{movementType:"vel",vels:{walking:Cl({vel:f,acc:yi[I],deltaMS:r,maxSpeed:V,unitD:D,minSpeed:0})},stateDelta:{facing:D,action:"moving"}};if(d>0&&d<1){const ft=Oe(h,c)?1:0;return{movementType:"position",posDelta:M(c,ft-d),stateDelta:{action:O?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:B},stateDelta:{action:O?"falling":"idle"}}},Io=t=>Pe(t.movingItem)&&Gn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),ms=(t,e)=>{let n=B;for(const o of e){if(o.movementType==="position"&&(n=$(n,o.posDelta)),o.movementType==="vel"&&(Pe(t)||J("lift")(t)))for(const[s,i]of or(o.vels)){const a={...B,...i};t.state.vels[s]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},Oo=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&U(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Io(t)){if(Io(t)&&us(t)){cr({above:t.movingItem,below:t.touchedItem});const n=[fs(t.movingItem,t.room,t.gameState,t.deltaMS),ps(t.movingItem,t.room,t.gameState,t.deltaMS)];ms(t.movingItem,n)}vr(t)}};function kl(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Vn=t=>{us(t)&&Co(t),rl(t)&&Co({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),se(t,...Jn)&&pl(t),We(t,...Jn)&&ml(t),(We(t,"monster")&&se(t,"firedDoughnut")||We(t,"firedDoughnut")&&se(t,"monster"))&&kl(t),(We(t,"monster")||We(t,"movingPlatform"))&&hl(t),se(t,"switch")&&fl(t),se(t,"joystick")&&gl(t,Vn),t.touchedItem.state.disappear&&Oo(t),t.movingItem.state.disappear&&ke(t.touchedItem,t.movingItem)&&Oo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Il=(t,e,n,o)=>{const{inputStateTracker:r}=n,s=t.type==="heels"?t.state:t.state.heels,{carrying:i,hasBag:a}=s,{state:{position:l}}=t;if(!a)return;const c=me(e.items).filter(ur),u=i===null?gs(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(i===null){if(u===void 0)return;Ol(e,s,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!bs(t,dr(e.items)))return;const f=xi({gameState:n,room:e,itemType:i.type,config:i.config,position:l});Dn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:f.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Vn}),s.carrying=null,r.actionsHandled.add("carry")}},Ol=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,hr({room:t,item:n})},gs=(t,e)=>as(t,me(e.items).filter(ur)),bs=(t,e)=>{const n={position:$(t.state.position,{z:_.h})},o=wi({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(ke(r,t)){if(!Pe(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!bs(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},en=-11,Pl={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},tickContext:{room:o,currentPlayable:r},currentRendering:s}){const i=s?.renderProps,a=s?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],u=c===null?!1:c.type==="teleporter"&&Ve(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?wt({colourise:n,button:t}):a;if(i?.pressed!==d&&Ct(h,d),u!==i?.standingOnTeleporter)if(u)qe(h,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=xo(t,n,"JUMP");f.y=en,qe(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentRendering:o,tickContext:{currentPlayable:r,room:s}}){const i=o?.renderProps,a=o?.output,l=r&&ot(r),c=l?.hasBag??!1,u=l?.carrying??null,d=u===null&&s!==void 0&&gs(r,s)!==void 0,h=t.actions.every(k=>e.currentActionPress(k)!=="released"),f=c&&!d&&u===null,m=a===void 0?wt({colourise:n,button:t}):a;if(m.visible=c,c&&(f!==i?.disabled&&yo(m,f,n),m.visible=!0,i?.pressed!==h&&Ct(m,h),c!==i?.hasBag||u!==i?.carrying)){let k;u!==null?k=is(u):c&&(k=p({textureId:"bag",y:-2})),qe(m,k)}return{output:m,renderProps:{pressed:h,hasBag:c,colourise:n,carrying:u,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentRendering:o,tickContext:{currentPlayable:r}}){const s=o?.renderProps,i=o?.output,a=r&&Ot(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=i===void 0?wt({colourise:n,button:t}):i,h=l||it(c)>0;if(d.visible=h,h&&(s?.pressed!==u&&Ct(d,u),l!==s?.hasHooter||c!==s?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):it(c)>0&&(f=p({textureId:"doughnuts",y:-2}));const m=re(new b,c);m.y=en,m.filters=te,qe(d,f,m),yo(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourise:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentRendering:o,tickContext:{currentPlayable:r}}){const s=o?.renderProps,i=o?.output,l=(r&&ot(r))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(s===void 0||c!==s.pressed||n!==s.colourise||l!==s.hasBag))return"no-update";let d;if(i===void 0){d=wt({colourise:n,button:t});const h=xo(t,n,"C+J");h.y=en,qe(d,h)}else d=i;return l?(d.visible=!0,s?.pressed!==c&&Ct(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourise:n}}},menu({currentRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:le}},map({currentRendering:t}){if(t!==null)return"no-update";const e=Ye({label:"mapText",outline:!0});return re(e,"MAP"),{output:e,renderProps:le}}};class _e extends ss{constructor(e){const n=Pl[e.button.which];super(e,n)}}const Bl=30,_l=15,Fl=42,Rl=36,Al=44,Ml=20;class Dl{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new _e({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new _e({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new _e({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new _e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new _e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new _e({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new Ya({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:s}=this.#n,{mainButtonNest:i,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of G(s))l==="menu"||l==="map"?this.#e.addChild(c):i.addChild(c);s.jump.output.y=_l,s.carry.output.x=-30,s.carryAndJump.output.y=-15,s.fire.output.x=Bl,s.menu.output.x=24,s.menu.output.y=24,s.map.output.y=16,this.#e.addChild(i),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of G(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Al,this.#n.mainButtonNest.y=e.y-Ml,this.#n.joystick.output.x=Fl,this.#n.joystick.output.y=e.y-Rl,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of G(this.#n.buttons))r.tick({...e,currentPlayable:Ne(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}nr.frames.button.frame;const zl=250,Ll=t=>t?48:24,El=t=>t?68:56,$l=(t,e)=>t?e.x/2-24:80,Ul=t=>t?72:24,Nl=t=>t?88:0,Po=112,Je=t=>t==="heels"?1:-1;class Gl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Wt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[vo],this.#t.fps.y=It.h,this.#o(),n&&(this.#n=new Dl({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Ye({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Ye({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:Ye({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Wt){const{sprite:o,livesText:r}=this.#t[n];for(const s of[o,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${n}`]=!0}),s.on("pointerup",()=>{e[`swop.${n}`]=!1}),s.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:s}){const i=new b({label:s});i.pivot={x:4,y:16};const a=new fe({texture:ie().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:bo,y:n?0:8});i.addChild(a);const l=Ye({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=It.w/2,i.addChild(l),o&&(l.visible=!1),r===!0&&(i.filters=te),{text:l,icon:a,container:i}}#i(e){const n=new fe(ie().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#a({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Je("head")*Po,this.#t.head.doughnuts.container.y=e.y-Ke.h-8,this.#t.heels.carrying.container.y=e.y-Ke.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Je("heels")*Po,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-It.w*2}#s(e,n){return e?n?ce:et:n?po:Qe}#l(e){const{renderContext:{gameState:n}}=this,o=mt(n,"heels"),r=o?.hasBag??!1,s=o?.carrying??null,{renderContext:{colourise:i}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();s!==null&&!l&&a.addChild(is(s)),a.filters=this.#s(!0,i),this.#t.heels.bag.icon.filters=this.#s(r,i)}#c(e){const{renderContext:{gameState:n}}=this,o=mt(n,"head"),r=o?.hasHooter??!1,s=o?.doughnuts??0,{renderContext:{colourise:i}}=this;this.#t.head.hooter.icon.filters=this.#s(r,i),this.#t.head.doughnuts.icon.filters=this.#s(s!==0,i),re(this.#t.head.doughnuts.text,s)}#u(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=mt(r,e),{text:i,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=Bt(s),d=u>0||!o;a.visible=d,d&&(re(i,u),a.y=n.y-Nl(o)),c.x=a.x=(n.x>>1)+Je(e)*$l(o,n);const h=s===void 0?0:e==="head"?Qr(s):s.bigJumps,f=h>0||!o;c.visible=f,f&&(re(l,h),c.y=n.y-Ul(o))}#d(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=this.#d(r,e),i=this.#t[e].sprite,{renderContext:{colourise:a}}=this;s?i.filters=a?ce:et:i.filters=a?po:Qe,i.x=(n.x>>1)+Je(e)*El(o),i.y=n.y-Ke.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=mt(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Je(e)*Ll(o),a.y=n.y,re(a,i??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Un(n.color),{colourise:r,gameState:s}=this.renderContext;Qe.targetColor=o.hud.dimmed[r?"dimmed":"original"],Nn.targetColor=o.hud.dimmed[r?"basic":"original"],bo.targetColor=o.hud.icons[r?"basic":"original"],et.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?xt.colourised.head[this.#d(s,"head")?"active":"inactive"]:xt.original,this.#t.heels.livesText.filters=r?xt.colourised.heels[this.#d(s,"heels")?"active":"inactive"]:xt.original}#h=Rn;#g(){if(Ci(w.getState())){if(performance.now()>this.#h+zl){const e=Ze.shared.FPS;re(this.#t.fps,Math.round(e)),vo.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#h=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Wt)this.#p(n,e),this.#f(n,e),this.#u(n,e);this.#a(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const Bo={movementType:"vel",vels:{gravity:B}},Hl=(t,e,n,o)=>{if(!ke(t))return Bo;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=t,l=Si[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=Ue(i,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(s-fn*o,-l)}}}:Bo}else return{movementType:"vel",vels:{gravity:{z:Math.max(s-fn*o,-l)}}}},_o=_.h,Fo=.001,Vl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=Zn**2/(2*Xe);if(n==="up"){if(e<=o)return Math.max(Fo,Math.sqrt(2*Xe*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(Fo,Math.sqrt(2*Xe*r))}else return Zn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Xe*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Xe*Math.max(e,0))):-.036},Xl=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*_o,s=e*_o,i=Vl({currentAltitude:o-r,direction:n,totalDistance:s-r});if(Number.isNaN(i))throw new Error("velocity is NaN");const a=o<=r?"up":o>=s?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:i}},stateDelta:{direction:a}}},Ro={movementType:"vel",vels:{movingFloor:B}},jl=(t,e,n,o)=>{if(U(t)&&t.state.teleporting!==null)return Ro;const{state:{standingOnItemId:r}}=t,s=Ue(r,e);if(s===null||!J("conveyor")(s))return Ro;const{config:{direction:i}}=s,l=J("heels")(t)&&t.state.action==="moving"&&Ut(t.state.facing)===Ti(i)?pe.heels:ki;return{movementType:"vel",vels:{movingFloor:M(hn[i],l)}}};function*ql(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Wl=_.w*.8,Jl=(t,e,n,o)=>{const{inputStateTracker:r}=n,s=t.type==="head"?t.state:t.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=t,u=Ie(c);if(r.currentActionPress("fire")==="tap"&&a&&it(i)>0){const d={type:"firedDoughnut",...sr,config:le,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...rr(),position:$(l,M(u,Wl),t.type==="headOverHeels"?{z:_.h}:B),vels:{fired:M(u,pe.firedDoughnut)},disappear:"onTouch"}};lt({room:e,item:d}),s.doughnuts=ue(s.doughnuts,-1),r.actionsHandled.add("fire")}},vs=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Zl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Tt=_.w*3,Yl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-Tt&&n.x<o.x+Tt&&n.y>o.y-Tt&&n.y<o.y+Tt},Ao=(t,e,n,o,r)=>{if(r&&t.state.activated)return Z;const s=Hn(t.state.position,e);return s===void 0?Z:Yl(t,s)?vs:Zl},Kl=(t,e,n,o)=>t.state.activated?Z:Ge(t.state.stoodOnBy,e).some(U)?vs:Z,Ql=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Ao(t,e,n,o,!0);case"while-player-near":return Ao(t,e,n,o,!1);case"on-stand":return Kl(t,e);case"off":case"on":return Z;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},ec=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:s,quantityEmitted:i,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(i!==u&&s+c<d){const h=Ii(Oi(`${r}-${i}`,{...l,position:B},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=Fn(a,M(h.aabb,.5)),lt({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*tc(t,e,n,o){Pe(t)&&(yield Hl(t,e,n,o),yield jl(t,e),yield*ql(t,e)),U(t)?(yield ps(t,e,n,o),t.id===n.currentCharacterName&&(yield bl(t,e,n,o),yield fs(t,e,n),Pi(t)&&Il(t,e,n,o),Bi(t)&&Jl(t,e,n))):_i(t)?yield Xl(t):Fi(t)?(yield Ql(t,e,n,o),yield dl(t,e,n,o)):Ri(t)&&ec(t,e)}const nc=(t,e,n,o)=>{if(!Pe(t)||t.state.standingOnItemId===null)return;const r=Ue(t.state.standingOnItemId,e);U(t)&&r.type==="pickup"&&cs({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||U(t)&&r.state.disappear==="onTouchByPlayer")&&vr({touchedItem:r,gameState:n,room:e})},oc=(t,e,n,o)=>{if(U(t)&&t.state.standingOnItemId!==null){const i=Ue(t.state.standingOnItemId,e);(ar(i)||i.type==="spikes")&&ls({room:e,movingItem:t})}const r=[...tc(t,e,n,o)];nc(t,e,n);let s=ms(t,r);(Pe(t)||J("lift")(t)||J("firedDoughnut")(t))&&(s=$(s,...ae(G(t.state.vels)).map(i=>M(i,o)))),Dn({subjectItem:t,posDelta:s,gameState:n,room:e,deltaMS:o,onTouch:Vn})},rc=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ue(e.state.head.lives,-1),e.state.heels.lives=ue(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=it(e.state.head.lives)>0,s=it(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!s||!r&&s){const c=r?"head":"heels";t.currentCharacterName=c,ye(t,e);const u=Yn(e)[c],d=Le({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Kn(u)};return}if(t.entryState.headOverHeels!==void 0){ye(t,e);const c=Le({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Yn(e);if(ye(t,c),ye(t,u),On(c,u)){const d=fr({head:c,heels:u});ye(t,d,"heels");const h=Le({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:Kn(d)};return}else{const d=Le({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Le=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=Mi({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??le});for(const s of e)lt({room:r,item:s}),(s.type==="head"||s.type==="headOverHeels")&&ca(r,t);return r},ye=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},sc=(t,e)=>{const n=pr(t,mr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];ye(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=fr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});ye(t,a);const l=Le({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}lt({room:o,item:e});return}else{const i=Le({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=i;return}}},ic=(t,e)=>{e.type==="headOverHeels"?rc(t,e):sc(t,e),Ne(t)===void 0&&w.dispatch(Ai({offerReincarnation:!0}))},ac=t=>{for(const e of me(t.items))for(const n of Ge(e.state.stoodOnBy,t)){if(!t.items[n.id]){Qn(n,t);continue}if(!Gn(n,e)){Qn(n,t);const o=as(n,dr(t.items));o!==void 0&&cr({above:n,below:o})}}},lc=2*ua,cc=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+lc,positionDelta:n})},uc=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const i={...Fn(o.state.position,r),z:0};if(!Oe(i,B))for(const a of Ge(o.state.stoodOnBy,e))cc(a,e,i)}},dc=(t,e)=>{for(const n of me(t.items))!Pe(n)||t.roomTime===n.state.actedOnAt.roomTime||Di(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=zi(n.state.position),e.add(n))},hc=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,fc=t=>{for(const e of me(t.items)){const n=e.state.position;e.state.position=Li(n)}},pc=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},mc=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Ne(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const s=pr(t,mr(o.type));s!==void 0&&(s.state.gameTime+=n)}}},gc=(t,e)=>{const n=we(t);if(n===void 0)return gr;mc(t,n,e);const o=Object.fromEntries(Ei(n.items).map(([i,a])=>[i,a.state.position]));for(const i of G(n.items))hc(i,n)&&(hr({room:n,item:i}),U(i)&&ic(t,i));const r=Object.values(n.items).sort(pc);for(const i of r){const a=Ne(t);if(a===void 0||a.state.action==="death")break;if(n.items[i.id]!==void 0)try{oc(i,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item ${i.id}: ${l}`)}}ac(n),fc(n);const s=new Set(ae(G(n.items)).filter(i=>o[i.id]===void 0||!Oe(i.state.position,o[i.id])));return uc(s,n,o),dc(n,s),s},Mo=(t,e)=>{const n=T(t),o=T($(t,{x:e.x,z:e.z})),r=T($(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},tn=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,bc=(t,e,n,o)=>{const r=Mo(t,e),s=Mo(n,o),i=r.topLeft.x,a=r.topRight.x,l=s.topLeft.x,c=s.topRight.x,u=tn(i,a,l,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=s.topRight.y-s.topRight.x/2,m=s.bottomCentre.y-s.bottomCentre.x/2,v=tn(d,h,f,m),k=r.topLeft.y+r.topLeft.x/2,R=r.bottomCentre.y+r.bottomCentre.x/2,O=s.topLeft.y+s.topLeft.x/2,C=s.bottomCentre.y+s.bottomCentre.x/2,I=tn(k,R,O,C);return u&&v&&I},vc=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,o=e.renderAabb||e.aabb,r=t.state.position,s=e.state.position;if(!bc(r,n,s,o))return 0;for(const i of $i){const a=t.state.position[i],l=a+n[i],c=e.state.position[i],u=c+o[i];if(l<=c)return 1*(i==="z"?-1:1);if(a>=u)return-1*(i==="z"?-1:1)}return Do(e)-Do(t)},Do=t=>t.state.position.x+t.state.position.y-t.state.position.z;class _t extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const yc=t=>{const e=xc(t);let n=e.length,o=n;const r=new Array(n),s={},i=wc(e);for(;o--;)s[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new _t([l],!1);if(s[c])return;s[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,i.get(f),u)}catch(m){throw m instanceof _t?m.hasClosedCycle?m:new _t([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function xc(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function wc(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const zo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},kt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Cc=(t,e=new Set(G(t)),n=new Map)=>{const o=new Map;for(const[r,s]of n)if(!t[r])n.delete(r);else for(const i of s)t[i]||kt(n,r,i);for(const r of e)if(r.fixedZIndex===void 0)for(const s of G(t)){if(s.fixedZIndex!==void 0||o.get(s)?.has(r)||r===s)continue;const i=vc(r,s);if(zo(o,r,s),i===0){kt(n,r.id,s.id),kt(n,s.id,r.id);continue}const a=i>0?r.id:s.id,l=i>0?s.id:r.id;zo(n,a,l),kt(n,l,a)}return n},ys=(t,e,n=3)=>{try{return{order:yc(t),impossible:!1}}catch(o){if(o instanceof _t){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:ys(t,e,n-1).order,impossible:!0}}else throw o}};class xs extends ss{}const Lo=(t,e)=>{e.poly([T({}),T({x:t.x}),T({x:t.x,y:t.y}),T({y:t.y})]).poly([T({}),T({z:t.z}),T({y:t.y,z:t.z}),T({y:t.y})]).poly([T({x:t.x}),T({x:t.x,z:t.z}),T(t),T({x:t.x,y:t.y})]).poly([T({z:t.z}),T({x:t.x,z:t.z}),T({x:t.x,y:t.y,z:t.z}),T({y:t.y,z:t.z})])},Eo=(t,e)=>{const n=new W;return Lo(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Lo(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Sc={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Tc{constructor(e){this.renderContext=e;const{item:n}=e,o=Sc[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const s=T(n.config.relativePoint);this.#e.addChild(new W().circle(s.x,s.y,5).stroke(o)),this.#e.addChild(new W().circle(s.x,s.y,2).fill(o))}this.#e.addChild(new W({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Eo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Eo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new Da({text:s,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class kc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=T(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const ws=(t,e)=>{const n=e.getLocalBounds(),o=En.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new fe({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Vt=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof fe?r:ws(t,r)},Fe=t=>z(({renderContext:{item:e}})=>An(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),ne=t=>z(({renderContext:{item:e,pixiRenderer:n}})=>{if(An(e))return Vt(n,t,e.config.times);{const o=p(t);return o instanceof fe?o:ws(n,o)}}),z=t=>({renderContext:e,currentRendering:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:le}:"no-update",oe=t=>({renderContext:{pixiRenderer:e,item:n},currentRendering:o})=>{if(o===void 0){const r=An(n)?n.config.times:void 0,s={output:Vt(e,t(n.config),r),renderProps:le};return r&&(s.output.y-=((r.z??1)-1)*_.h),s}else return"no-update"},Ic=({renderContext:{pixiRenderer:t,item:e,room:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:s}}=e,i=o?.renderProps,a=Ve(e),l=a&&Ge(r,n).find(U)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:Vt(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},s),renderProps:{flashing:l,activated:a}}:"no-update"},nn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:o})=>{const r=o?.renderProps,s=Ut(n)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=p(s==="left"||s==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(_.h*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},$o={lift:ne("shadowMask.smallBlock"),conveyor:oe(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:He(t)==="x"})),teleporter:Ic,floor:"no-mask",barrier:oe(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:ne("shadowMask.smallRound"),block:oe(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:oe(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),movingPlatform:oe(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),hushPuppy:ne("shadowMask.hushPuppy"),portableBlock:oe(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:oe(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:oe(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.fullBlock"),spikes:ne("shadowMask.spikes"),switch:ne("shadowMask.switch"),pickup:oe(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:ne("shadowMask.smallRound"),"monster.dalek":ne("shadowMask.dalek"),"monster.turtle":nn("turtle"),"monster.skiHead":nn("skiHead"),"monster.homingBot":ne("shadowMask.smallRound"),joystick:ne("shadowMask.joystick"),charles:nn("charles",2)},Oc=t=>t.type==="monster"?$o[`monster.${t.config.which}`]:$o[t.type],Pc=new Ra({alpha:.66});class Bc{constructor(e,n){this.renderContext=e,this.#r||(this.#e.filters=Pc),n!=="no-mask"&&(this.#t=new xs(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t;#o={};get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const o=this.#t.output.children.at(0);if(o===void 0||!(o instanceof fe)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}n!==o&&(this.#r||(this.#e.mask=o))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:o}=e,{item:r,pixiRenderer:s,room:i}=this.renderContext,a=n.has(r),l=r.state.position.z+r.aabb.z,c=me(i.items).filter(function(m){return m.shadowCastTexture!==void 0}),u={id:r.id,state:{position:{...r.state.position,z:l}},aabb:{...r.aabb,z:Ui}},d=Object.groupBy(c,f=>{const m=this.#o[f.id]!==void 0,v=n.has(f);return!a&&!v?m?"keepUnchanged":"noShadow":On(u,f)?m?"update":"create":"noShadow"});for(const f of lo(d.keepUnchanged,d.update))this.#o[f.id].renderedOnProgression=o;if(d.create)for(const f of d.create){const{times:m}=f.config,v=Vt(s,f.shadowCastTexture,m);v.label=f.id,this.#n.addChild(v),this.#o[f.id]={sprite:v,renderedOnProgression:o}}for(const f of lo(d.create,d.update)){const{sprite:m}=this.#o[f.id],v=T({...ct(f.state.position,r.state.position),z:r.aabb.z});m.x=v.x,m.y=v.y}for(const[f,{sprite:m,renderedOnProgression:v}]of At(this.#o))v!==o&&(m.destroy(),delete this.#o[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const _c=t=>{const e=Oc(t.item);return e===void 0?void 0:new Bc(t,e)};class Fc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const L=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=x.createBufferSource(),c=pn()[o];return l.buffer=c,l.loop=s,l.playbackRate.value=i?n-.05+Math.random()*.1:n,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Re=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},E=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&s)?(l?.stop(),l=L({...t}),Re(l,t.gain,i),n!==void 0&&(r?(l=L({...n,loop:!0}),Re(l,n.gain,i)):l.onended=()=>{c&&(l=L({...n,loop:!0}),Re(l,n.gain,i))})):n!==void 0&&(l=L({...n,loop:!0}),Re(l,n.gain,i)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=L({...o}),Re(l,o.gain,i)));else if(c!==u&&e!==void 0){const h=L({...e});Re(h,e.gain,i)}a=!1,c=u}};class Rc{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=E({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Ac{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&L({soundId:"bonus",connectTo:this.output});break}case"disappearing":{L({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,L({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class Xn{constructor(e,n,o=1){this.renderContext=e,this.#e=E({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,s=o>(e??Rn)&&!va(br(r));this.#e(s)}destroy(){}}class Mc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new Xn(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=E({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=n,a=o===s&&ae(br(i)).some(l=>Ni(r[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const ht=t=>{for(const e in t)return!0;return!1},on=2;class Dc{constructor(e){this.renderContext=e}output=x.createGain();#e=E({start:{soundId:"conveyorStart",playbackRate:on},loop:{soundId:"conveyorLoop",playbackRate:on},stop:{soundId:"conveyorEnd",playbackRate:on}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=ht(e);this.#e(n)}destroy(){this.#e(!1)}}const zc=3;class Lc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=L({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+zc*e)}destroy(){}}const Uo={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},No={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Go={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Ho={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Ec{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Uo[n]!==void 0&&(this.#r=new Xn(e,Uo[n]),this.#r.output.connect(this.output)),No[n]!==void 0&&(this.#t=E({change:No[n]},this.#e)),Ho[n]!==void 0&&(this.#i=E(Ho[n],this.#e)),Go[n]!==void 0&&(this.#o=E({loop:Go[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=n;if(this.#t){const a=In(o);this.#t(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!s;this.#o(a)}if(this.#i){const a=!Oe(i,B);this.#i(a)}}destroy(){}}class rn{constructor(e){this.renderContext=e;const{soundSettings:n,item:{type:o}}=e,{noFootsteps:r}={...rt.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=E({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#i.connect(this.output),this.#o=E({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#r=E({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#o;#r;#i=x.createGain();#a=E({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#s=x.createGain();#l=E({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=ot(n),{teleportingPhase:f,positionZ:m}=this.#c,v=r?r.phase:null,k=i&&l>s&&l>m&&c>0,R=l<m&&c<0&&a===null;this.#r(R),this.#o(k),this.#n!==void 0&&this.#n(!k&&!R&&o==="moving"),h!==void 0&&this.#l(h.carrying!==null);const O=a!==null&&u>(e??Rn)&&d[a];if(this.#a(O),v!==null&&v!==f)if(v==="in"){const C=pn().teleportIn,I=x.createBufferSource();I.buffer=C,I.connect(this.output),I.start()}else{const C=pn().teleportOut,I=x.createBufferSource();I.buffer=C,I.connect(this.output),I.start()}this.#c={teleportingPhase:v,positionZ:l}}destroy(){}}class $c{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=ht(e);!o&&r&&L({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Uc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=E({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:s}}=n,i=o===r&&s!==null&&e.has(n);this.scrapeBracketed(i)}}destroy(){}}class Nc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=ht(e);n&&!o&&L({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Gc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?_n(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&L({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Hc{constructor(e){this.renderContext=e}output=x.createGain();#e=E({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(Ve(e)&&Ge(e.state.stoodOnBy,n).some(U))}destroy(){}}class Vc{constructor(e){this.renderContext=e,L({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class Xc extends Xn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const jc={lift:Lc,switch:Gc,bubbles:Ac,head:rn,heels:rn,headOverHeels:rn,teleporter:Hc,monster:Ec,conveyor:Dc,spring:Nc,portableBlock:$c,charles:Mc,ball:Rc,pushableBlock:Uc,firedDoughnut:Vc,slidingBlock:Xc},qc=t=>{const e=jc[t.item.type];if(e)return new e(t)},Wc=_.h*Gi,Jc=_.h*-1,Zc=_.w*16,Yc=0,sn=(t,e,n)=>(t-e)/(n-e)*2-1;class Kc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Jt(eo({x:0,y:o})),this.positionMaxX=Jt(eo({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=$(o.position,M(n.aabb,.5)),s=sn(Jt(r),this.positionMaxX,this.positionMinX),i=sn(r.z,Jc,Wc),a=sn(r.x+r.y,Yc,Zc);this.output.positionX.value=s,this.output.positionY.value=i,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const Qc=`#version 300 es

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
`;class zt extends Y{constructor(e){const n=H.from({vertex:dt,fragment:Qc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,s,i]=e.toArray();o.uColour[0]=r,o.uColour[1]=s,o.uColour[2]=i}}const eu=[new zt(g.midRed)],tu=[new zt(g.moss)],nu=75;class ou{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<nu?o==="left"?tu:eu:ce,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const ru=(t,e,n)=>{const r=ie().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",s=t.color.shade==="dimmed"&&ie().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${n}`};function*su({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Et(t),s=r==="y"?1:16;function*i(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...Pt(a,{y:-12*n})});l.filters=yn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:s,y:9},textureId:"generic.door.legs.base",...Pt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:s,y:9},textureId:"generic.door.legs.pillar",...Pt(a,{y:-l*_.h})})}}yield*i(P({...de,[r]:1})),yield*i(de),e||(yield p({pivot:{x:16,y:_.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...P({...de,[r]:1})}))}const Cs=(t,e)=>{const n=Et(t),o=ut(n),r=8;return t==="towards"||t==="right"?T({[o]:e[o]-r}):de},iu=z(({renderContext:{item:t,room:e}})=>Mt(su(t,e),new b({filters:ge(e),...Cs(t.config.direction,t.aabb)}))),au=z(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:s}}})=>{const i=Et(t),a=s.rooms[n];return p({textureId:ru(r,i,e),filter:ge(a),...Cs(t,o)})}),an={animationId:"bubbles.cold"},Ee=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},Ss=Symbol(),Ts=Symbol(),lu=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[Ss]=t,n[Ts]=e,n},ks=t=>t,Cn=.02,cu=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:s})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:s};if(o==="out")return{animationId:`${t}.fadeOut`,paused:s};if(o==="in")return{animationId:`${t}.fadeOut`,paused:s};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:s};if(e==="jumping")return{textureId:r<Cn?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`,paused:s};if(e==="falling"){const a=`${t}.falling.${n}`;if(ji(a))return{textureId:a}}const i=`${t}.idle.${n}`;return qi(i)?{animationId:i,paused:s}:{textureId:`${t}.walking.${n}.2`}},Sn=Symbol(),Tn=Symbol(),uu=(t,e)=>{t[Sn].removeChildren(),t[Sn].addChild(p(cu(e)))},ln=(t,e,n)=>{const o=new b,r=new b;o[Sn]=r,o.addChild(r);const s=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new be({pastelBlue:g.pink}):ce,flipX:t==="heels"});return o[Tn]=s,o},Vo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Vi>t,du=t=>{if(!tt(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%to<to*Xi},Xo=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},jo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?ce:t.filters},hu=(t,{highlighted:e,flashing:n},o,r)=>{const s=o?.highlighted??!1;e&&!s?Xo(r,new Se({outlineColor:ze[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&s&&jo(r,Se);const i=o?.flashing??!1;n&&!i?Xo(r,new zt(ze[t])):!n&&i&&jo(r,zt)},fu=(t,e,n)=>{e&&!n?t.addChild(t[Tn]):!e&&n&&t.removeChild(t[Tn])},cn=(t,e,n,o,r,s)=>{n&&uu(e,{name:t,...o,paused:r}),hu(t,o,s,e),fu(e,o.shining,s?.shining??!1)},pu=({renderContext:{item:t,gameState:e,paused:n},currentRendering:o})=>{const{type:r,state:{action:s,facing:i,teleporting:a,vels:{gravity:{z:l}}}}=t,c=o?.renderProps,u=o?.output,d=In(i)??"towards",h=t.type==="headOverHeels"?Vo(t.state.head,"headOverHeels","headOverHeels"):Vo(t.state,t.type,e.currentCharacterName),f=du(t),m=Kr(t),v=at(i),k=a?.phase??null,R={action:s,facingXy8:d,teleportingPhase:k,flashing:f,highlighted:h,shining:m,gravityZ:l},O=c===void 0||c.action!==s||c.facingXy8!==d||c.teleportingPhase!==k||c?.gravityZ>Cn!=l>Cn;let C;if(r==="headOverHeels"){C=u??lu({top:ln("head",!0,n),bottom:ln("heels",!0,n)});const I=C;cn("head",I[Ss],O,R,n,c),cn("heels",I[Ts],O,R,n,c)}else C=u??ln(r,!1,n),cn(r,C,O,R,n,c);return s==="moving"&&u instanceof st&&(u.animationSpeed=v*Hi),{output:C,renderProps:R}},un=ks(pu),mu=(t,e)=>{const n=([i,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...P({x:-e.x,y:-e.y})}),r=Mt(ae(At(t.items)).filter(i=>i[1].type==="wall").filter(n).map(([i,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:i,...P(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),s=Mt(ae(At(t.items)).filter(i=>i[1].type==="door").filter(n).map(([i,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:i,...P(Pt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:i,...P({...l,z:0}),times:{[ut(He(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(s),o},gu=t=>[...ae(G(t.items)).filter(e=>e.type==="wall").filter(e=>He(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],bu=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:s,y:i}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.x??1)-1))}return e},vu=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new W().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(P),!0).fill(0),yu=z(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:s,sidesWithDoors:i,edgeLeftX:a,edgeRightX:l}=Nt(t.roomJson),c=r-n,u=s-o,{floor:d,color:{shade:h},roomJson:f}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const O=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,C=new b;for(let D=-1;D<=r+2;D++)for(let V=D%2-1;V<=s+2;V+=2)C.addChild(Wi({x:D+(i.right?-.5:0),y:V+(i.towards?-.5:0)},p({textureId:O})));C.addChild(mu(f,{x:n,y:o}));const I=new W().poly([de,P({x:c,y:0}),P({x:c,y:u}),P({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});C.addChild(I),C.filters=ge(t),C.mask=I,m.addChild(C)}const v=gu(f),k=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(k);const R=bu(v);if(R!==void 0){const O=vu({extraWallRanges:R,blockXMin:n,blockYMin:o});m.addChild(O)}return m.mask=k,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),xu=({blockXMin:t,blockYMin:e},n)=>{const o=i=>i[1].config.direction==="towards"||i[1].config.direction==="right",r=P({x:-t,y:-e}),s={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return ae(At(n.items)).filter(i=>i[1].type==="wall"||i[1].type==="door").filter(o).forEach(([i,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:i,textureId:`floorEdge.${l}`,...P(h),times:a.type==="wall"?a.config.times:{[ut(He(l))]:2}});s[l].addChild(f),l==="right"&&c.y===0&&e<0&&s[l].addChild(p({label:`${i}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...P($(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&s[l].addChild(p({label:`${i}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...P($(h,{x:-.5}))}))}),s},wu=z(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:s,edgeLeftX:i,edgeRightX:a}=Nt(e.roomJson),l=r-n,c=s-o,u=new b({label:"floorEdge"}),d=new W({label:"overDrawToHideFallenItems"}).poly([P({x:l,y:0}),P({x:0,y:0}),P({x:0,y:c}),{...P({x:0,y:c}),y:999},{...P({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=xu({blockXMin:n,blockYMin:o},e.roomJson);h.filters=yn(e,"towards",t),f.filters=yn(e,"right",t),u.addChild(h),u.addChild(f);const m=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:i,y:999},{x:i,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Cu=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Su=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentRendering:r})=>{const s=r?.renderProps,{activated:i,busyLickingDoughnutsOffFace:a}=e,l=a?Na:i?void 0:Cu.includes(t.which)?ns(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const c=Ut(e.facing)??"towards";if(!(s===void 0||i!==s.activated||a!==s.busyLickingDoughnutsOffFace||c!==s.facingXy4))return"no-update";const d={facingXy4:c,activated:i,busyLickingDoughnutsOffFace:a};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${c}`,filter:l}),renderProps:d};case"elephantHead":return{output:p({textureId:`elephant.${c}`,filter:l}),renderProps:d};case"turtle":return{output:p(i&&!a?{animationId:`${t.which}.${c}`,filter:l,paused:o}:{textureId:`${t.which}.${c}.1`,filter:l}),renderProps:d};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Ee({top:{textureId:`${t.which}.${c}`,filter:l||ge(n)},bottom:{...an,paused:o}}):p({textureId:`${t.which}.${c}`,filter:l}),renderProps:d};case"computerBot":case"elephant":case"monkey":return{output:Ee({top:`${t.which}.${c}`,filter:l}),renderProps:d};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(s===void 0||a!==s.busyLickingDoughnutsOffFace||i!==s.activated))return"no-update";const u={activated:i,busyLickingDoughnutsOffFace:a};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!a?{animationId:t.which,filter:l,paused:o}:{textureId:`${t.which}.1`,filter:l}),renderProps:u};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:u};case"bubbleRobot":return{output:Ee({top:{...an,paused:o},filter:l}),renderProps:u};case"emperorsGuardian":return{output:Ee({top:"ball",bottom:{...an,paused:o},filter:l}),renderProps:u};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},Tu=pe.floatingText,ku=12,qo=_.h*3,Wo=[g.shadow,g.midGrey,g.redShadow,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],Jo=[...Wo,...new Array(20).fill(g.white),...Wo.toReversed()],Iu=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},displaySettings:{uncolourised:o}},currentRendering:r})=>{const s=r?.output;let i;const l=(n-e)*Tu;if(s===void 0){i=new b({filters:new Se({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=re(new b({label:u,y:c*ku,filters:o?ce:new N(g.pink)}),u.toUpperCase());i.addChild(d)}}else i=s;for(let c=0;c<t.length;c++){const u=i.children[c],[d]=u.filters,h=l+c*-12,f=h>0&&h<qo;if(u.visible=f,f&&d){const m=Math.floor(h/qo*Jo.length);d.targetColor=Jo[m]}}return i.y=-l,{output:i,renderProps:le}},Ou=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentRendering:r})=>{const s=r?.renderProps,i=ht(n);if(!(s===void 0||s.moving!==i))return"no-update";const l=new b,c=He(t);return l.addChild(p(i?{animationId:`conveyor.${c}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${c}.6`,times:e})),{output:l,renderProps:{moving:i}}},Pu=({renderContext:{item:t,room:e,paused:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:s}}=t,i=o?.renderProps,a=Ve(t),l=a&&Ge(r,e).find(U)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:l?new b({children:[p({textureId:"teleporter",times:s}),p({animationId:"teleporter.flashing",times:s,paused:n})]}):p({textureId:a?"teleporter":"block.artificial",times:s}),renderProps:{flashing:l,activated:a}}:"no-update"},Bu=({renderContext:{item:{state:{facing:t}}},currentRendering:e})=>{const n=e?.renderProps,o=Ut(t)??"towards";return n===void 0||o!==n.facingXy4?{output:Ee({top:`charles.${o}`}),renderProps:{facingXy4:o}}:"no-update"},jn=g.moss,_u=({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentRendering:n})=>{const o=n?.renderProps;if(!(o===void 0||e!==o.highlighted))return"no-update";const s=e?new Se({outlineColor:jn,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:s}),renderProps:{highlighted:e}}},Fu=({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentRendering:o})=>{const r=o?.renderProps,s=ht(t);if(!(r===void 0||e!==r.highlighted||s!==r.compressed))return"no-update";const a=r?.compressed??!1,l=e?new Se({outlineColor:jn,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=o?.output,u=c!==void 0&&s===a&&e!==r?.highlighted;let d;return u?(c.filters=l??er,d=c):d=p(!s&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:s?"spring.compressed":"spring.released",filter:l}),{output:d,renderProps:{compressed:s,highlighted:e}}},Ru=({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentRendering:o})=>{const r=o?.renderProps;if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new Se({outlineColor:jn,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Ee({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},Au=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},paused:n},tickContext:{deltaMS:o},currentRendering:r})=>{const i=(r?.renderProps?.distanceTravelled??0)+Bn(t)*(n?0:o),l=r?.output??p("spikyBall.1"),u=(Math.floor(i*2/$e.w)+e)%2+1;return l.texture=ie().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:i}}},Mu=ks(Au),Du=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,zu=z(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=ut(He(e)),s=new b({label:"wallTiles"});for(let i=0;i<n.length;i++){const a=p({textureId:Du(o.planet,n[i],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:$e.w,y:$e.h+1}:{x:0,y:$e.h+1},filter:ge(o)}),l=P({[r]:i});a.x+=l.x,a.y+=l.y,s.addChild(a)}return s}),Lu=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const o=n?.renderProps,r=e.type==="in-store"?_n(w.getState(),e.path)?"right":"left":t;return o===void 0||r!==o.setting?{output:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},Eu=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,$u=({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentRendering:r})=>{const s=r?.renderProps;return s===void 0||s.disappear!==n?{output:p({textureId:Eu(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ge(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},Uu=()=>z(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Nu={head:un,heels:un,headOverHeels:un,doorFrame:au,doorLegs:iu,monster:Su,floatingText:Iu,wall:zu,barrier:z(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:z(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ge(n):void 0,times:e})),spikes:Fe("spikes"),slidingDeadly:Mu,slidingBlock:Uu(),block:$u,switch:Lu,conveyor:Ou,lift:z(({renderContext:{paused:t}})=>{const e=new b,n={x:Ke.w/2,y:Ke.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter:Pu,sceneryCrown:z(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:z(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ge(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Fe("fish.1"),charles:Bu,joystick:Fe("joystick"),movingPlatform:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock:_u,spring:Fu,sceneryPlayer:Ru,hushPuppy:Fe("hushPuppy"),bubbles:z(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Fe({animationId:"bubbles.doughnut"}),ball:Fe("ball"),floor:yu,floorEdge:wu},Gu=t=>{if(t.type==="wall"){const{direction:e}=t.config;if(e==="right"||e==="towards")return}return Nu[t.type]},Hu=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Vu=t=>{const e=w.getState(),n=Ji(e),o=!Zi(e),{item:r,gameState:s}=t,i=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[],l=Gu(r);if(l!==void 0){const f=new xs(t,l),m=new ou(t,f);a.push(m),i&&(m.output.alpha=.66)}if(o){const f=_c(t);f!==void 0&&a.push(f)}i&&a.push(new Tc(t));let c;if(a.length===0)c=void 0;else{const f=a.length===1?a[0]:new Xu(a,t);Hu(r,f.output,s),c=new kc(t,f)}const u=t.soundSettings.mute??rt.soundSettings.mute,d=t.paused||u?void 0:qc(t),h=d===void 0?void 0:new Kc(t,d);return new Fc(t,{graphics:c,sound:h})};class Xu{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Ae=.33,ju=Yi()==="mobile"?-4:16,kn=$e.h-$e.w/2,qu=pe.heels,Wu=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:s,topEdgeY:i}=Nt(t.roomJson),a=o+s.x,l=r+s.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-ju-s.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,f=u.y+i-kn<0;return(m,v,k)=>{if(m===void 0)return;const R=T(m.state.position),O=$(R,u),C={x:d&&O.x<n.x*Ae?Math.min(-a,n.x*Ae-R.x):h&&O.x>n.x*(1-Ae)?Math.max(n.x-l,n.x*(1-Ae)-R.x):u.x,y:f&&O.y<n.y*Ae?n.y*Ae-R.y:u.y};if(k)e.x=C.x,e.y=C.y;else{const I=qu*v,D=ct(e,C),V=Bn(D);if(V>I){const qt={x:D.x/V,y:D.y/V};e.x-=qt.x*I,e.y-=qt.y*I}else e.x=C.x,e.y=C.y}}},Ju=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Nt(t);return new W().rect(e+o.x,r-kn,n-e,o.y-r+kn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class Zu{constructor(e){this.renderContext=e;const{displaySettings:n,upscale:o}=e;this.initFilters(e.colourised,e.room.color);const s=e.soundSettings.mute??rt.soundSettings.mute?void 0:x.createGain();this.output={sound:s,graphics:new b({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})},(n?.showBoundingBoxes??rt.displaySettings.showBoundingBoxes)!=="none"&&this.output.graphics.addChild(Ju(e.room.roomJson)),this.#i=Wu(e.room,this.output.graphics,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});output;#t=void 0;#o=new Map;#r=new Map;#i;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Ha:ce:new N(Un(n).main.original)}#a(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of me(n.items)){let s=this.#r.get(r.id);if(s===void 0){s=Vu({...this.renderContext,item:r}),this.#r.set(r.id,s);const i=r.type==="floorEdge"?this.#n:this.#e,{graphics:a,sound:l}=s.output;if(a&&(i.addChild(a),r.fixedZIndex&&(a.zIndex=r.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{s.tick(o)}catch(i){throw new Error(`RoomRenderer caught error while ticking item ${r.id}: ${i.message}`,{cause:i})}}for(const[r,s]of this.#r.entries())n.items[r]===void 0&&(s.destroy(),this.#r.delete(r))}#s(e){const{order:n}=ys(Cc(this.renderContext.room.items,e.movedItems,this.#o),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);const s=r.output.graphics;if(s)s.zIndex=n.length-o;else throw new Error(`order ${n[o]} was given a z-order by sorting, but item has no graphics`)}}get#l(){return this.#t!==void 0}tick(e){const n=this.#l?e:{...e,movedItems:new Set(me(this.renderContext.room.items))};this.#i(Ne(this.renderContext.gameState),e.deltaMS,!this.#l),this.#a(n),(!this.#l||n.movedItems.size>0)&&this.#s(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Xt=`in vec2 aPosition;
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
`,jt=`struct GlobalFilterUniforms {
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
}`,Yu=`precision highp float;
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
`,Ku=`struct CRTUniforms {
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
}`,Qu=Object.defineProperty,ed=(t,e,n)=>e in t?Qu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ft=(t,e,n)=>(ed(t,typeof e!="symbol"?e+"":e,n),n);const Is=class Os extends Y{constructor(e){e={...Os.DEFAULT_OPTIONS,...e};const n=Te.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:Ku,entryPoint:"mainFragment"}}),o=H.from({vertex:Xt,fragment:Yu,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ft(this,"uniforms"),Ft(this,"seed"),Ft(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ft(Is,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let td=Is;var nd=`
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
}`,od=`struct KawaseBlurUniforms {
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
}`,rd=`
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
`,sd=`struct KawaseBlurUniforms {
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
}`,id=Object.defineProperty,ad=(t,e,n)=>e in t?id(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ve=(t,e,n)=>(ad(t,typeof e!="symbol"?e+"":e,n),n);const Ps=class Bs extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(nt("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Bs.DEFAULT_OPTIONS,...n};const o=Te.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?sd:od,entryPoint:"mainFragment"}}),r=H.from({vertex:Xt,fragment:n?.clamp?rd:nd,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ve(this,"uniforms"),ve(this,"_pixelSize",{x:0,y:0}),ve(this,"_clamp"),ve(this,"_kernels",[]),ve(this,"_blur"),ve(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const s=this.pixelSizeX/n.source.width,i=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*i,e.applyFilter(this,n,o,r);else{const l=De.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*i,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*i,e.applyFilter(this,c,o,r),De.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const s=e/n;for(let i=1;i<n;i++)r-=s,o.push(r)}this._kernels=o,this._updatePadding()}};ve(Ps,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let ld=Ps;var cd=`in vec2 vTextureCoord;
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
`,ud=`struct AdvancedBloomUniforms {
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
`,dd=`
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
`,hd=`struct ExtractBrightnessUniforms {
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
`,fd=Object.defineProperty,pd=(t,e,n)=>e in t?fd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,_s=(t,e,n)=>(pd(t,typeof e!="symbol"?e+"":e,n),n);const Fs=class Rs extends Y{constructor(e){e={...Rs.DEFAULT_OPTIONS,...e};const n=Te.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:hd,entryPoint:"mainFragment"}}),o=H.from({vertex:Xt,fragment:dd,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),_s(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};_s(Fs,"DEFAULT_OPTIONS",{threshold:.5});let md=Fs;var gd=Object.defineProperty,bd=(t,e,n)=>e in t?gd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Me=(t,e,n)=>(bd(t,typeof e!="symbol"?e+"":e,n),n);const As=class Ms extends Y{constructor(e){e={...Ms.DEFAULT_OPTIONS,...e};const n=Te.from({vertex:{source:jt,entryPoint:"mainVertex"},fragment:{source:ud,entryPoint:"mainFragment"}}),o=H.from({vertex:Xt,fragment:cd,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:xe.WHITE}}),Me(this,"uniforms"),Me(this,"bloomScale",1),Me(this,"brightness",1),Me(this,"_extractFilter"),Me(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new md({threshold:e.threshold}),this._blurFilter=new ld({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const s=De.getSameSizeTexture(n);this._extractFilter.apply(e,n,s,!0);const i=De.getSameSizeTexture(n);this._blurFilter.apply(e,s,i,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=i.source,e.applyFilter(this,n,o,r),De.returnTexture(i),De.returnTexture(s)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Me(As,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let vd=As;const yd=le,xd=(t,e)=>(n,o)=>{const r=new Set;if(Ki(n)){const u=we(n)?.items;if(u!==void 0){const d=ae(G(Pn(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const i=o*n.gameSpeed,a=Math.ceil(i/e),l=i/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)r.add(h)}const c=we(n)?.items??yd;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},Zo=({crtFilter:t},e)=>[t?new td({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new vd({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class wd{constructor(e,n){this.app=e,this.#a=e,this.#s=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#i.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,we(n)===void 0)throw new Error("main loop with no starting room");this.#u()}catch(o){this.#c(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#i=x.createGain();#a;#s;#l=xd(gc,ra);#c(e){w.dispatch(Qi(ea(e)))}#u(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=Zo(e,!0),this.#n=Zo(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const o=new Error("Error caught in main loop",{cause:n});console.error(o),this.#c(o)}};tick=({deltaMS:e})=>{const n=w.getState(),o=ta(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:s},upscale:i}}=w.getState(),a=!o&&!(r?.uncolourised??rt.displaySettings.uncolourised),l=na(n),c=oa(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Gl({colourise:a,gameState:this.#s,inputDirectionMode:c,onScreenControls:l}),this.#a.stage.addChild(this.#t.output));const u=we(this.#s);this.#t.tick({screenSize:i.gameEngineScreenSize,room:u});const d=o?gr:this.#l(this.#s,e),h=we(this.#s);(this.#o?.renderContext.room!==h||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.soundSettings!==s||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),h?(this.#o=new Zu({gameState:this.#s,room:h,paused:o,pixiRenderer:this.#a.renderer,displaySettings:r,soundSettings:s,colourised:a,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#i),this.#s.events.emit("roomChange",h.id)):this.#o=void 0,this.#a.stage.scale=i.gameEngineUpscale,this.#u()),this.#o?.tick({progression:this.#s.progression,movedItems:d,deltaMS:e}),o?this.#a.stage.filters=this.#e:this.#a.stage.filters=this.#n};start(){return this.#a.ticker.add(this.tickAndCatch),this}stop(){this.#a.stage.removeChild(this.#r),this.#i.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#a.ticker.remove(this.tickAndCatch)}}Lt.add(wr,Cr,Sr,Tr,kr,Ir,Or,Pr,Br,_r,Fr,Ar,Rr,Mr,Dr,zr,Lr,Er,$r,Ur,Nr);aa.defaultOptions.scaleMode="nearest";const Yo=async(t,e)=>{const n=new Jr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=sa;const o=w.getState().gameMenus.currentGame,r=no({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(ia(o.store.gameMenus)):(w.dispatch(oo(r.characterRooms.head.id)),w.dispatch(oo(r.characterRooms.heels.id)));const s=new wd(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const a=Ne(r);a!==void 0&&Mn({playableItem:a,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return we(r)},get gameState(){return r},reincarnateFrom(i){no({campaign:t,inputStateTracker:e,savedGame:i,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),s.stop(),n.destroy()}}},Od=Object.freeze(Object.defineProperty({__proto__:null,default:Yo,gameMain:Yo},Symbol.toStringTag,{value:"Module"}));export{Xr as A,Gr as C,Y as F,En as R,Ta as S,jr as V,Ba as a,Od as g,Sa as u};
