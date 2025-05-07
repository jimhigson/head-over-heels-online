const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BTBtcmof.js","assets/App-D9PszxrR.js","assets/index-CAkdMFcY.js","assets/index-BGYEaiUx.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-DMkizC1f.js","assets/Graphics-DIQSUN8Y.js","assets/changeCharacterRoom-Zt-3S0di.js","assets/WebGLRenderer-t3SUWGOr.js"])))=>i.map(i=>d[i]);
import{b3 as Es,b4 as nr,b5 as $s,am as Us,aq as Te,ar as H,ae as or,an as xe,Z as C,a2 as Lt,a0 as Ns,a3 as b,d as nt,v as Ft,aG as y,a6 as fn,ay as fe,_ as Ze,$ as Gs,V as Hs,b6 as Vs,b7 as Xs,b8 as js,ad as qs,b9 as q,ba as Jn,K as A,bb as rr,bc as ie,bd as B,be as sr,s as Et,M as w,o as G,c as _,bf as Ws,bg as Js,bh as Zs,g as M,w as at,bi as Ys,bj as Pn,bk as ir,bl as Ks,bm as Qs,bn as ei,bo as It,i as ae,t as ke,p as Bn,l as $,bp as ti,bq as ni,br as oi,bs as ri,bt as si,bu as ii,I as ot,bv as Ot,e as ai,bw as lt,bx as ar,by as li,bz as lr,k as cr,bA as $t,bB as U,j as J,bC as ur,bD as _n,bE as Zn,bF as dr,bG as ci,bH as ct,bI as An,bJ as Ie,bK as Ut,bL as de,R as ut,H as le,bM as pe,x as Oe,bN as pn,bO as ui,bP as di,bQ as hi,bR as fi,bS as Fn,A as Ue,bT as pi,bU as mi,bV as gi,bW as mn,bX as bi,bY as vi,bZ as pt,f as Rn,b_ as yi,b$ as xi,c0 as wi,m as Pe,C as hr,c1 as Yn,h as me,c2 as fr,r as pr,b as Si,a as mr,n as Ci,a$ as Ne,c3 as Zt,c4 as Ke,c5 as mt,c6 as Nt,c7 as Ti,c8 as ki,c9 as Xe,ca as Kn,cb as Gt,cc as Ii,cd as Oi,ce as Ge,cf as Pi,cg as Bi,ch as _i,ci as Ai,cj as Fi,ck as Ri,cl as Mi,cm as Di,cn as Qn,L as eo,co as gr,b2 as br,E as vr,F as zi,B as to,cp as Li,cq as Ei,cr as $i,a_ as we,cs as yr,ct as Ui,cu as Ni,cv as k,cw as Mn,S as He,cx as Gi,cy as Rt,cz as x,cA as gn,cB as xr,q as Hi,cC as rt,cD as Yt,J as no,cE as Vi,cF as Pt,cG as Xi,cH as ji,cI as oo,cJ as qi,cK as Wi,cL as Ji,cM as Ht,cN as Zi,cO as $e,cP as Yi,cQ as Ki,cR as Qi,aw as De,cS as ea,cT as ta,cU as na,cV as oa,cW as ra,cX as sa,cY as ia,cZ as aa,c_ as ro,c$ as la,N as so,d0 as ca}from"./App-D9PszxrR.js";import{a as ua,f as bn,c as Dn,m as Vt,b as zn,d as wr,r as da,o as ha}from"./changeCharacterRoom-Zt-3S0di.js";import{S as fa,G as W}from"./Graphics-DIQSUN8Y.js";import{g as Sr,_ as io}from"./index-CAkdMFcY.js";var gt={},ao;function pa(){if(ao)return gt;ao=1;var t=Es(),e=t.mark(s),n=nr(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function s(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return h=d[u],v.delegateYield(r(h),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}gt.__concat=s;var i=o(s);return gt.concat=i,gt}var bt={},lo;function ma(){if(lo)return bt;lo=1;var t=nr(),e=t.iterableCurry,n=$s(),o=n.__firstOr,r=Symbol("none");function s(a){return o(a,r)===r}bt.__isEmpty=s;var i=e(s,{reduces:!0});return bt.isEmpty=i,bt}var Kt,co;function ga(){return co||(co=1,Kt=pa().concat),Kt}var ba=ga();const uo=Sr(ba);var Qt,ho;function va(){return ho||(ho=1,Qt=ma().isEmpty),Qt}var ya=va();const xa=Sr(ya),Cr=class vn extends Us{constructor(e){e={...vn.defaultOptions,...e},super(e),this.enabled=!0,this._state=fa.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let s,i;return n&&(s=Te.from(n)),o&&(i=H.from(o)),new vn({gpuProgram:s,glProgram:i,...r})}};Cr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=Cr;var wa=`
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
`,Sa=`in vec2 aPosition;
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
`,Ca=`
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
}`;class F extends Y{constructor(e){const n=e.gpu,o=fo({source:Ca,...n}),r=Te.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),s=e.gl,i=fo({source:wa,...s}),a=H.from({vertex:Sa,fragment:i}),l=new or({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:xe.EMPTY}})}}function fo(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const Ln=`
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
    `,En=`
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
	`;class Tr extends F{constructor(){super({gl:{functions:`
                ${Ln}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${En}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Tr.extension={name:"color",type:C.BlendMode};class kr extends F{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"color-burn",type:C.BlendMode};class Ir extends F{constructor(){super({gl:{functions:`
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
                `}})}}Ir.extension={name:"color-dodge",type:C.BlendMode};class Or extends F{constructor(){super({gl:{functions:`
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
                `}})}}Or.extension={name:"darken",type:C.BlendMode};class Pr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Pr.extension={name:"difference",type:C.BlendMode};class Br extends F{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"divide",type:C.BlendMode};class _r extends F{constructor(){super({gl:{functions:`
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
            `}})}}_r.extension={name:"exclusion",type:C.BlendMode};class Ar extends F{constructor(){super({gl:{functions:`
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
                `}})}}Ar.extension={name:"hard-light",type:C.BlendMode};class Fr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Fr.extension={name:"hard-mix",type:C.BlendMode};class Rr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Rr.extension={name:"lighten",type:C.BlendMode};class Mr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Mr.extension={name:"linear-burn",type:C.BlendMode};class Dr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"linear-dodge",type:C.BlendMode};class zr extends F{constructor(){super({gl:{functions:`
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
            `}})}}zr.extension={name:"linear-light",type:C.BlendMode};class Lr extends F{constructor(){super({gl:{functions:`
                ${Ln}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${En}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Lr.extension={name:"luminosity",type:C.BlendMode};class Er extends F{constructor(){super({gl:{functions:`
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
            `}})}}Er.extension={name:"negation",type:C.BlendMode};class $r extends F{constructor(){super({gl:{functions:`
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
                `}})}}$r.extension={name:"overlay",type:C.BlendMode};class Ur extends F{constructor(){super({gl:{functions:`
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
                `}})}}Ur.extension={name:"pin-light",type:C.BlendMode};class Nr extends F{constructor(){super({gl:{functions:`
                ${Ln}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${En}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Nr.extension={name:"saturation",type:C.BlendMode};class Gr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Gr.extension={name:"soft-light",type:C.BlendMode};class Hr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Hr.extension={name:"subtract",type:C.BlendMode};class Vr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Vr.extension={name:"vivid-light",type:C.BlendMode};const yn=[];Lt.handleByNamedList(C.Environment,yn);async function Ta(t){if(!t)for(let e=0;e<yn.length;e++){const n=yn[e];if(n.value.test()){await n.value.load();return}}}let je;function ka(){if(typeof je=="boolean")return je;try{je=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{je=!1}return je}var Xr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Xr||{});class Ia{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,s,i,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,s,i,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Oa=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],jr=class qr extends Ns{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Oa,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ta(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...qr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(nt(Ft,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:y.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Xr.ALL);const{clear:o,clearColor:r,target:s}=e;y.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(s,o,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Ia(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,s)=>(r[s.name]=s.value,r),{});e.forEach(r=>{const s=r.value,i=r.name,a=o[i];this.renderPipes[i]=new s(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!ka())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};jr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Wr=jr,vt;function Pa(t){return vt!==void 0||(vt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Wr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!fn.get().getWebGLRenderingContext())return!1;let o=fn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const s=o.getExtension("WEBGL_lose_context");s&&s.loseContext()}return o=null,r}catch{return!1}})()),vt}let yt;async function Ba(t={}){return yt!==void 0||(yt=await(async()=>{const e=fn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),yt}const po=["webgl","webgpu","canvas"];async function _a(t){let e=[];t.preference?(e.push(t.preference),po.forEach(s=>{s!==t.preference&&e.push(s)})):e=po.slice();let n,o={};for(let s=0;s<e.length;s++){const i=e[s];if(i==="webgpu"&&await Ba()){const{WebGPURenderer:a}=await io(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-BTBtcmof.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(i==="webgl"&&Pa(t.failIfMajorPerformanceCaveat??Wr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await io(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-t3SUWGOr.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(i==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Jr="8.8.1";class Zr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Jr)}static destroy(){}}Zr.extension=C.Application;class Aa{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Jr)}destroy(){this._renderer=null}}Aa.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Yr=class xn{constructor(...e){this.stage=new b,e[0]!==void 0&&nt(Ft,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await _a(e),xn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return nt(Ft,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=xn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Yr._plugins=[];let Kr=Yr;Lt.handleByList(C.Application,Kr._plugins);Lt.add(Zr);var Fa=`in vec2 aPosition;
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
`,Ra=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,mo=`struct GlobalFilterUniforms {
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
}`;const Qr=class es extends Y{constructor(e){e={...es.defaultOptions,...e};const n=Te.from({vertex:{source:mo,entryPoint:"mainVertex"},fragment:{source:mo,entryPoint:"mainFragment"}}),o=H.from({vertex:Fa,fragment:Ra,name:"alpha-filter"}),{alpha:r,...s}=e,i=new or({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:n,glProgram:o,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Qr.defaultOptions={alpha:1};let Ma=Qr;class st extends fe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof xe?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ze.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ze.shared.add(this.update,this,Gs.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=o/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(xe.from(e[o]));return new st(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(xe.from(e[o]));return new st(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof xe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ze.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ze.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Da extends Hs{constructor(e,n){const{text:o,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Vs({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+n&&(s=-o*this.anchor.y,e.y>=s&&e.y<=s+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function za(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(nt(Ft,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class La extends Da{constructor(...e){const n=za(e,"Text");super(n,Xs),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=js.measureText(this._text,this._style),{width:r,height:s}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*s,e.maxY=e.minY+s}}class $n extends xe{static create(e){return new $n({source:new qs(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Se=t=>{const[e,n,o]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:o/2})},X={original:new y(q.zxWhite),basic:g.white,dimmed:g.lightGrey},j={original:new y(q.zxYellow),basic:g.midRed,dimmed:g.redShadow},K={original:new y(q.zxMagenta),basic:g.pink,dimmed:Se(g.pink)},R={original:new y(q.zxCyan),basic:g.pastelBlue,dimmed:Se(g.pastelBlue)},Q={original:new y(q.zxGreen),basic:g.moss,dimmed:Se(g.moss)},Un={white:{basic:{main:X,edges:{towards:R,right:j},hud:{lives:j,dimmed:K,icons:R}},dimmed:{main:X,edges:{towards:Q,right:R},hud:{lives:j,dimmed:K,icons:R}}},yellow:{basic:{main:j,edges:{towards:Q,right:X},hud:{lives:R,dimmed:K,icons:Q}},dimmed:{main:j,edges:{towards:R,right:R},hud:{lives:R,dimmed:K,icons:Q}}},magenta:{basic:{main:K,edges:{towards:Q,right:R},hud:{lives:X,dimmed:R,icons:j}},dimmed:{main:K,edges:{towards:Q,right:R},hud:{lives:X,dimmed:R,icons:j}}},cyan:{basic:{main:R,edges:{towards:K,right:X},hud:{lives:X,dimmed:Q,icons:j}},dimmed:{main:R,edges:{towards:K,right:X},hud:{lives:X,dimmed:Q,icons:j}}},green:{basic:{main:Q,edges:{towards:R,right:j},hud:{lives:X,dimmed:K,icons:R}},dimmed:{main:Q,edges:{towards:R,right:j},hud:{lives:X,dimmed:K,icons:R}}}},Nn=t=>Un[t.hue][t.shade],ze={head:g.pastelBlue,heels:g.pink},Bt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Jn>n?100-Math.ceil((n-e)/(Jn/100)):0},ts=t=>t.type==="headOverHeels"?Bt(t.state.head)>0||Bt(t.state.heels)>0:Bt(t.state)>0,ns=t=>{const e=100*A.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/A.w):0},Ea={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},dt=`in vec2 aPosition;
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
`,$a=`in vec2 vTextureCoord;
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
`;class be extends Y{constructor(e){const n=Object.keys(e).length,o=H.from({vertex:dt,fragment:$a.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([s,i],a)=>{g[s].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),i.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const Ua=`precision mediump float;
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
`;class N extends Y{uniforms;constructor(e="white"){const n=H.from({vertex:dt,fragment:Ua,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const Na=`precision mediump float;
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
`;class Ga extends Y{constructor(){const e=H.from({vertex:dt,fragment:Na,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const os=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),rs=t=>os(Un[t.color.hue][t.color.shade].main),ss=t=>new be({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&rs(t)}),Ha=new be({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Va=t=>new be({replaceLight:t,replaceDark:Se(t)}),wn=(t,e,n)=>n?new be(os(Un[t.color.hue][t.color.shade].edges[e])):new N(Nn(t.color).edges[e].original),ge=t=>new be(rs(t)),go=new Ga,ce=rr,Xa=new be(Ea),bo={x:.5,y:1},vo=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),Sn=t=>{if(typeof t=="string")return Sn({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:s,filter:i,times:a,label:l}=t;let c;if(vo(t)?c=ja(t):c=new fe(ie().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let m=1;m<=u.z;m++){const v={...t,label:`(${h},${f},${m})`};delete v.times;const T=Sn(v),I=B({x:h-1,y:f-1,z:m-1});T.x+=I.x,T.y+=+I.y,d.addChild(T)}return d}if(e===void 0&&o===void 0)if(vo(t))c.anchor=bo;else{const u=ie().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=bo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),s!==void 0&&(c.y=s),i!==void 0&&(c.filters=i),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=Sn;function ja({animationId:t,reverse:e,playOnce:n,paused:o}){const r=ie().animations[t],i=(o?[r[0]]:r).map(l=>({texture:l,time:sr}));e&&i.reverse();const a=new st(i);return a.animationSpeed=Et.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const qa=`#version 300 es

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
`;class Ce extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=H.from({vertex:dt,fragment:qa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const s=this.resources.colorReplaceUniforms.uniforms,[i,a,l]=e.toArray();s.uOutline[0]=i,s.uOutline[1]=a,s.uOutline[2]=l,s.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,s.uOutlineWidth[0]=1)}}const te=new Ce({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),Qe=new N,yo=new N,Gn=new N,xo=new N(g.moss),et=new N,ee=[Qe,te],Wa=[et,te],Ja=[te,Gn],xt={original:[te,et],colourised:{head:{active:[te,new N(ze.head)],inactive:[te,new N(Se(ze.head))]},heels:{active:[te,new N(ze.heels)],inactive:[te,new N(Se(ze.heels))]}}},Be=14,Za=2,Ya=Math.cos(30*(Math.PI/180)),Ka=40;class Qa{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Be,y:-14,filter:ee}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Be,y:Be,filter:ee}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Be,filter:ee}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Be*Math.SQRT2,filter:ee}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Be*Math.SQRT2,filter:ee}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new W().circle(0,0,Ka).fill("#00000000"));for(const o of G(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?ce:Qe}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=_};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Ws(w.getState()),{x:o,y:r}=this.output,{x:s,y:i}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(s/n-o)/(a/2),u=(i/n-r)/(l/2),d=Js({x:-c,y:-u}),h=Zs(d,Ya),f=M(h,Za);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=at(e)>Ys?Pn(e):void 0;for(const[r,s]of ir(this.arrowSprites))s.filters=r===o?Wa:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Cn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:q.zxBlue,fire:q.zxYellow,carry:q.zxGreen,carryAndJump:q.zxRed,menu:q.zxWhite,map:q.zxWhite}};function Mt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*el(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=Ks(e);let o=0;for(const r of e){const s=`hud.char.${ei(r)}`;try{Qs(s)}catch(i){throw new Error(`no texture id for char "${r}": ${i.message}`,{cause:i})}yield p({textureId:s,x:(o+.5-n/2)*It.w}),o++}}const re=(t,e)=>{t.removeChildren();try{Mt(el(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Ye=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?Ja:Gn,scale:{x:1,y:t?2:1}}),Dt=Symbol(),is=Symbol(),as=Symbol(),wt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Va(Cn.colourised[e]):o.filters=new N(Cn.zx[e]),n.addChild(r);const s=new b({label:"surface"}),i=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(i),s.mask=i,n.addChild(s),o[is]=r,o[Dt]=s,o[as]=n,o},qe=(t,...e)=>{t[Dt].removeChildren();for(const n of e)n!==void 0&&t[Dt].addChild(n)},St=(t,e)=>{t[is].texture=ie().textures[e?"button.pressed":"button"],t[as].y=e?1:0},wo=(t,e,n)=>{n&&(t[Dt].filters=e?ss():ce)},So=({which:t},e,n)=>{const o=re(new b,n);return o.filters=new be({white:e?Se(Cn.colourised[t]):g.pureBlack}),o};class ls{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new b({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&(console.log("removing",this.#e.output,"from",this.output),this.output.removeChild(this.#e.output)),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const cs=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),tl=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),s=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*s},Co=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>tl(t,e,n,o),Hn=(t,e,n=.001)=>{if(!ke(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:Bn({state:{position:$(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+ti},id:t.id},{state:{position:$(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},us=(t,e)=>{const o=[...ae(e).filter(s=>Hn(t,s))];return o.length===0?void 0:o.reduce((s,i)=>{const a=ua(i,s);return a<0||a===0&&Co(t,i)>Co(t,s)?i:s})},tt=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<ni};function ds({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(ts(e)||tt(e)||(e.state.action="death",e.state.expires=t+bn))}const ue=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,it=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,nl=3e3,hs=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:s,config:i}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[s]===!0)return;l[s]&&(u[a]===void 0&&(u[a]={}),u[a][s]=!0);const d=h=>{const f=ai(o),m={type:"floatingText",id:`floatingText-${s}`,...lr,fixedZIndex:li,aabb:_,state:{...ar(),position:$(f,{z:A.h/2}),expires:c+nl},config:{textLines:h,appearanceRoomTime:c}};lt({room:r,item:m})};switch(i.gives){case"hooter":{const h=Ot(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=Ot(n);h!==void 0&&(h.doughnuts=ue(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=ot(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=Ot(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=ot(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ue(n.state.head.lives,2),n.state.heels.lives=ue(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=ue(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(ii(i.page));break;case"reincarnation":{w.dispatch(ri(si(e,w.getState()))),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(oi(i.planet)),d([i.planet,"liberated!"]);break}}},ol=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:s}}=n;cr(s,o)<=0||e.state.action!=="death"&&Dn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},rl=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,s=$t(o);if(r==="top")return;const i=r==="far"?{x:s==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:s==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:s==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:s==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=$(t.state.position,i)};function sl({movingItem:t}){t.state.autoWalk=!1}const se=(t,...e)=>J(...e)(t.touchedItem),We=(t,...e)=>J(...e)(t.movingItem),fs=t=>U(t.movingItem),il=t=>U(t.touchedItem),al=t=>ur(t.touchedItem),To=t=>{switch(!0){case se(t,"stopAutowalk"):sl(t);break;case al(t):ds(t);break;case se(t,"portal"):ol(t);break;case se(t,"pickup"):hs(t);break;case se(t,"doorFrame"):rl(t);break}},Z={movementType:"steady"},Vn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=_n(e.items);if(r!==void 0)return tt(r)?void 0:r;const s=n===void 0||tt(n)||n.state.action==="death"?void 0:Zn(n.state.position,t),i=o===void 0||tt(o)||o.state.action==="death"?void 0:Zn(o.state.position,t);return s===void 0?o:i===void 0||s<i?n:o},ps=150,ms=t=>t[Math.floor(Math.random()*t.length)],he=Object.freeze({movementType:"vel",vels:{walking:_}}),Xt=t=>dr(t)?pe[t.config.which]:pe[t.type],ko=A.w/2,ll=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const s=pe.homingBot;if(!Ut(e,de))return{movementType:"steady"};for(const i of G(_n(n.items))){if(i===void 0)continue;const a=ct(i.state.position,t);if(Math.abs(a.y)<ko)return{movementType:"vel",vels:{walking:{x:a.x>0?s:-.05,y:0,z:0}}};if(Math.abs(a.x)<ko)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?s:-.05,z:0}}}}return{movementType:"steady"}},cl=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:s,timeOfLastDirectionChange:i,facing:a}}=t;if(s===null)return he;const l=Vn(r,e);if(l===void 0||i+ps>e.roomTime)return Z;const c=ct(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>A.w/4?u:ut(u),h=Xt(t),f={..._,[d]:c[d]>0?h:-h},m=Ie(f),v=!Ut(m,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:le}}},Io=(t,e,n,o,r=!1)=>{const{state:{position:s,standingOnItemId:i}}=t;if(i===null)return he;const a=Vn(s,e);if(a===void 0)return he;const l=a.state.position,c=A.w*3;if(!(s.x>l.x-c&&s.x<l.x+c&&s.y>l.y-c&&s.y<l.y+c))return he;const d=ct(a?.state.position,s),h=Xt(t),f=(1+Math.sqrt(2))/2,m=h*f,v=M({...d,z:0},m/An(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:Ie(v)}}},en=(t,e,n,o,r)=>{const{state:{vels:{walking:s},standingOnItemId:i}}=t;if(i===null)return he;if(!(Oe(s,_)||Math.random()<o/1e3))return Z;const l=ms(r);return{movementType:"vel",vels:{walking:M(pn[l],Xt(t))},stateDelta:{facing:pn[l]}}},ul=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:s},standingOnItemId:i}}=t;return i===null?he:Ut(s,de)?{movementType:"vel",vels:{walking:M(r,Xt(t))}}:Z},dl=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=ms([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},tn=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:s,vels:{walking:i},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ps))return;const c=Vt(s,l,e,n);if(c.x===0&&c.y===0)return;const u=dl(i,c,r);t.state.vels.walking=u,t.state.facing=Ie(u),t.state.durationOfTouch=0},hl=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},fl=(t,e,n,o)=>{if(!t.state.activated||dr(t)&&t.state.busyLickingDoughnutsOffFace)return he;switch(t.config.movement){case"patrol-randomly-diagonal":return en(t,e,n,o,hi);case"patrol-randomly-xy8":return en(t,e,n,o,di);case"patrol-randomly-xy4":return en(t,e,n,o,ui);case"towards-tripped-on-axis-xy4":return ll(t,e);case"towards-on-shortest-axis-xy4":return cl(t,e);case"back-forth":case"clockwise":return ul(t);case"unmoving":return he;case"towards-analogue":return Io(t,e);case"towards-analogue-unless-planet-crowns":return Io(t,e,n,o,ci(w.getState()));default:throw t.config,new Error("this should be unreachable")}},pl=t=>{const{movingItem:e,touchedItem:n}=t;if(ke(n,e))switch(e.config.movement){case"patrol-randomly-xy4":tn(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":tn(t,"opposite");break;case"clockwise":tn(t,"clockwise");break;case"towards-tripped-on-axis-xy4":hl(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},ml=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s))switch(o.type){case"in-room":{const i=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[i],switchedAtRoomTime:n.roomTime,switchedSetting:i})}break}case"in-store":{w.dispatch(fi(o.path));break}}},gl=({movingItem:t,touchedItem:e})=>{if(!ke(t))return;const{state:{position:n},aabb:o}=e,r=Vt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const s=Ie(r),i=M(s,-.05);return e.state.vels.sliding=i,!1},bl=({movingItem:t,touchedItem:e})=>{if(!ke(e))return;const n=t.state.vels.sliding;if(Oe(n,_))return;const{state:{position:o},aabb:r}=t,s=Vt(e.state.position,e.aabb,o,r);return cr(s,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},vl=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},s)=>{const{config:{controls:i},state:{position:a},aabb:l}=n,c=Vt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Ie(c);for(const d of i){const h=e.items[d],f=M(u,-.025*o);h.state.facing=f,zn({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:s})}},Ve=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Fn(w.getState(),t),yl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:s}}=t,{inputStateTracker:i}=n,a=i.currentActionPress("jump"),l=s===null?null:e.items[s],c=l!==null&&J("teleporter")(l)&&Ve(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:bn}}}:Z;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Dn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:bn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},xl=1e3/12,Ct=t=>{const e=t-bi,o=e/vi*sr;return(e+.5*mn*o**2)/o},wl={head:Ct(pt.head),headOnSpring:Ct(pt.head+A.h),heels:Ct(pt.heels),heelsOnSpring:Ct(pt.heels+A.h)},Oo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return wl[`${n}${e?"OnSpring":""}`]},Sl=t=>!(t===null||mi(t)&&Ve(t)||gi(t)&&t.config.gives==="scroll"||U(t)&&t.state.standingOnItemId===null),Cl=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+xl>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),gs=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,s=Ue(o,e);if(Cl(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Oo(t,!1)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&Sl(s)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Z;const a=pi(s);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Oo(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},Tl=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:s=0})=>{const i=at(t),a=Math.max(s,Math.min(o,i+e*r)),l=Math.min(a,o);return M(n,l)},kl={movementType:"vel",vels:{walking:_}},bs=(t,e,n,o)=>{const r=Il(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const s=at(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:s===0?0:t.state.walkDistance+s*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+s*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Oe(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Il=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:s,state:{action:i,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:m}}}=t,v=o===t.id,T=v?n.currentActionPress("jump"):"released",I=v?n.directionVector:_,P=l===null&&m.z<0,S=s==="head"&&ns(t.state)>0&&l!==null,O=s==="headOverHeels"?P?"head":"heels":S?"heels":s,D=a?c:I,V=pe[O];if(u!==null||i==="death")return kl;if(s==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Rn(f,M(f,yi*r))},stateDelta:{action:P?"falling":"jumping"}}:{movementType:"vel",vels:{walking:_},stateDelta:{action:"falling"}};if(T!=="released"){const ft=Ie(Ut(D,de)?c:D),Ls=J("spring")(Ue(l,e))?1:xi;return{movementType:"vel",vels:{walking:M({...ft,z:0},V*Ls)},stateDelta:{facing:ft}}}}if(at(D)!==0)return P?{movementType:"vel",vels:{walking:M({...D,z:0},V)},stateDelta:{facing:D,action:"falling"}}:{movementType:"vel",vels:{walking:Tl({vel:f,acc:wi[O],deltaMS:r,maxSpeed:V,unitD:D,minSpeed:0})},stateDelta:{facing:D,action:"moving"}};if(d>0&&d<1){const ft=Oe(h,c)?1:0;return{movementType:"position",posDelta:M(c,ft-d),stateDelta:{action:P?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:P?"falling":"idle"}}},Po=t=>Pe(t.movingItem)&&Hn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),vs=(t,e)=>{let n=_;for(const o of e){if(o.movementType==="position"&&(n=$(n,o.posDelta)),o.movementType==="vel"&&(Pe(t)||J("lift")(t)))for(const[s,i]of ir(o.vels)){const a={..._,...i};t.state.vels[s]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},Bo=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&U(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Po(t)){if(Po(t)&&fs(t)){hr({above:t.movingItem,below:t.touchedItem});const n=[gs(t.movingItem,t.room,t.gameState,t.deltaMS),bs(t.movingItem,t.room,t.gameState,t.deltaMS)];vs(t.movingItem,n)}wr(t)}};function Ol(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Xn=t=>{fs(t)&&To(t),il(t)&&To({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),se(t,...Yn)&&gl(t),We(t,...Yn)&&bl(t),(We(t,"monster")&&se(t,"firedDoughnut")||We(t,"firedDoughnut")&&se(t,"monster"))&&Ol(t),(We(t,"monster")||We(t,"movingPlatform"))&&pl(t),se(t,"switch")&&ml(t),se(t,"joystick")&&vl(t,Xn),t.touchedItem.state.disappear&&Bo(t),t.movingItem.state.disappear&&ke(t.touchedItem,t.movingItem)&&Bo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Pl=(t,e,n,o)=>{const{inputStateTracker:r}=n,s=t.type==="heels"?t.state:t.state.heels,{carrying:i,hasBag:a}=s,{state:{position:l}}=t;if(!a)return;const c=me(e.items).filter(fr),u=i===null?ys(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(i===null){if(u===void 0)return;Bl(e,s,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!xs(t,pr(e.items)))return;const f=Si({gameState:n,room:e,itemType:i.type,config:i.config,position:l});zn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:f.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Xn}),s.carrying=null,r.actionsHandled.add("carry")}},Bl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,mr({room:t,item:n})},ys=(t,e)=>us(t,me(e.items).filter(fr)),xs=(t,e)=>{const n={position:$(t.state.position,{z:A.h})},o=Ci({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(ke(r,t)){if(!Pe(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!xs(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},nn=-11,_l={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},tickContext:{room:o,currentPlayable:r},currentRendering:s}){const i=s?.renderProps,a=s?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],u=c===null?!1:c.type==="teleporter"&&Ve(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?wt({colourise:n,button:t}):a;if(i?.pressed!==d&&St(h,d),u!==i?.standingOnTeleporter)if(u)qe(h,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=So(t,n,"JUMP");f.y=nn,qe(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentRendering:o,tickContext:{currentPlayable:r,room:s}}){const i=o?.renderProps,a=o?.output,l=r&&ot(r),c=l?.hasBag??!1,u=l?.carrying??null,d=u===null&&s!==void 0&&ys(r,s)!==void 0,h=t.actions.every(T=>e.currentActionPress(T)!=="released"),f=c&&!d&&u===null,m=a===void 0?wt({colourise:n,button:t}):a;if(m.visible=c,c&&(f!==i?.disabled&&wo(m,f,n),m.visible=!0,i?.pressed!==h&&St(m,h),c!==i?.hasBag||u!==i?.carrying)){let T;u!==null?T=cs(u):c&&(T=p({textureId:"bag",y:-2})),qe(m,T)}return{output:m,renderProps:{pressed:h,hasBag:c,colourise:n,carrying:u,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentRendering:o,tickContext:{currentPlayable:r}}){const s=o?.renderProps,i=o?.output,a=r&&Ot(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=i===void 0?wt({colourise:n,button:t}):i,h=l||it(c)>0;if(d.visible=h,h&&(s?.pressed!==u&&St(d,u),l!==s?.hasHooter||c!==s?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):it(c)>0&&(f=p({textureId:"doughnuts",y:-2}));const m=re(new b,c);m.y=nn,m.filters=te,qe(d,f,m),wo(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourise:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentRendering:o,tickContext:{currentPlayable:r}}){const s=o?.renderProps,i=o?.output,l=(r&&ot(r))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(s===void 0||c!==s.pressed||n!==s.colourise||l!==s.hasBag))return"no-update";let d;if(i===void 0){d=wt({colourise:n,button:t});const h=So(t,n,"C+J");h.y=nn,qe(d,h)}else d=i;return l?(d.visible=!0,s?.pressed!==c&&St(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourise:n}}},menu({currentRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:le}},map({currentRendering:t}){if(t!==null)return"no-update";const e=Ye({label:"mapText",outline:!0});return re(e,"MAP"),{output:e,renderProps:le}}};class _e extends ls{constructor(e){const n=_l[e.button.which];super(e,n)}}const Al=30,Fl=15,Rl=42,Ml=36,Dl=44,zl=20;class Ll{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new _e({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new _e({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new _e({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new _e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new _e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new _e({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new Qa({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:s}=this.#n,{mainButtonNest:i,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of G(s))l==="menu"||l==="map"?this.#e.addChild(c):i.addChild(c);s.jump.output.y=Fl,s.carry.output.x=-30,s.carryAndJump.output.y=-15,s.fire.output.x=Al,s.menu.output.x=24,s.menu.output.y=24,s.map.output.y=16,this.#e.addChild(i),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of G(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Dl,this.#n.mainButtonNest.y=e.y-zl,this.#n.joystick.output.x=Rl,this.#n.joystick.output.y=e.y-Ml,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of G(this.#n.buttons))r.tick({...e,currentPlayable:Ne(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Et.frames.button.frame;const El=250,$l=t=>t?48:24,Ul=t=>t?68:56,Nl=(t,e)=>t?e.x/2-24:80,Gl=t=>t?72:24,Hl=t=>t?88:0,_o=112,Je=t=>t==="heels"?1:-1;class Vl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Zt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[xo],this.#t.fps.y=It.h,this.#o(),n&&(this.#n=new Ll({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Ye({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Ye({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:Ye({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Zt){const{sprite:o,livesText:r}=this.#t[n];for(const s of[o,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${n}`]=!0}),s.on("pointerup",()=>{e[`swop.${n}`]=!1}),s.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:s}){const i=new b({label:s});i.pivot={x:4,y:16};const a=new fe({texture:ie().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:yo,y:n?0:8});i.addChild(a);const l=Ye({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=It.w/2,i.addChild(l),o&&(l.visible=!1),r===!0&&(i.filters=te),{text:l,icon:a,container:i}}#i(e){const n=new fe(ie().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#a({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Je("head")*_o,this.#t.head.doughnuts.container.y=e.y-Ke.h-8,this.#t.heels.carrying.container.y=e.y-Ke.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Je("heels")*_o,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-It.w*2}#s(e,n){return e?n?ce:et:n?go:Qe}#l(e){const{renderContext:{gameState:n}}=this,o=mt(n,"heels"),r=o?.hasBag??!1,s=o?.carrying??null,{renderContext:{colourise:i}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();s!==null&&!l&&a.addChild(cs(s)),a.filters=this.#s(!0,i),this.#t.heels.bag.icon.filters=this.#s(r,i)}#c(e){const{renderContext:{gameState:n}}=this,o=mt(n,"head"),r=o?.hasHooter??!1,s=o?.doughnuts??0,{renderContext:{colourise:i}}=this;this.#t.head.hooter.icon.filters=this.#s(r,i),this.#t.head.doughnuts.icon.filters=this.#s(s!==0,i),re(this.#t.head.doughnuts.text,s)}#u(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=mt(r,e),{text:i,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=Bt(s),d=u>0||!o;a.visible=d,d&&(re(i,u),a.y=n.y-Hl(o)),c.x=a.x=(n.x>>1)+Je(e)*Nl(o,n);const h=s===void 0?0:e==="head"?ns(s):s.bigJumps,f=h>0||!o;c.visible=f,f&&(re(l,h),c.y=n.y-Gl(o))}#d(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=this.#d(r,e),i=this.#t[e].sprite,{renderContext:{colourise:a}}=this;s?i.filters=a?ce:et:i.filters=a?go:Qe,i.x=(n.x>>1)+Je(e)*Ul(o),i.y=n.y-Ke.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=mt(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Je(e)*$l(o),a.y=n.y,re(a,i??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Nn(n.color),{colourise:r,gameState:s}=this.renderContext;Qe.targetColor=o.hud.dimmed[r?"dimmed":"original"],Gn.targetColor=o.hud.dimmed[r?"basic":"original"],yo.targetColor=o.hud.icons[r?"basic":"original"],et.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?xt.colourised.head[this.#d(s,"head")?"active":"inactive"]:xt.original,this.#t.heels.livesText.filters=r?xt.colourised.heels[this.#d(s,"heels")?"active":"inactive"]:xt.original}#h=Nt;#g(){if(Ti(w.getState())){if(performance.now()>this.#h+El){const e=Ze.shared.FPS;re(this.#t.fps,Math.round(e)),xo.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#h=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Zt)this.#p(n,e),this.#f(n,e),this.#u(n,e);this.#a(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const Ao={movementType:"vel",vels:{gravity:_}},Xl=(t,e,n,o)=>{if(!ke(t))return Ao;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=t,l=ki[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=Ue(i,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(s-mn*o,-l)}}}:Ao}else return{movementType:"vel",vels:{gravity:{z:Math.max(s-mn*o,-l)}}}},Fo=A.h,Ro=.001,jl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=Kn**2/(2*Xe);if(n==="up"){if(e<=o)return Math.max(Ro,Math.sqrt(2*Xe*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(Ro,Math.sqrt(2*Xe*r))}else return Kn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Xe*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Xe*Math.max(e,0))):-.036},ql=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*Fo,s=e*Fo,i=jl({currentAltitude:o-r,direction:n,totalDistance:s-r});if(Number.isNaN(i))throw new Error("velocity is NaN");const a=o<=r?"up":o>=s?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:i}},stateDelta:{direction:a}}},Mo={movementType:"vel",vels:{movingFloor:_}},Wl=(t,e,n,o)=>{if(U(t)&&t.state.teleporting!==null)return Mo;const{state:{standingOnItemId:r}}=t,s=Ue(r,e);if(s===null||!J("conveyor")(s))return Mo;const{config:{direction:i}}=s,l=J("heels")(t)&&t.state.action==="moving"&&Gt(t.state.facing)===Ii(i)?pe.heels:Oi;return{movementType:"vel",vels:{movingFloor:M(pn[i],l)}}};function*Jl(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Zl=A.w*.8,Yl=(t,e,n,o)=>{const{inputStateTracker:r}=n,s=t.type==="head"?t.state:t.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=t,u=Ie(c);if(r.currentActionPress("fire")==="tap"&&a&&it(i)>0){const d={type:"firedDoughnut",...lr,config:le,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...ar(),position:$(l,M(u,Zl),t.type==="headOverHeels"?{z:A.h}:_),vels:{fired:M(u,pe.firedDoughnut)},disappear:"onTouch"}};lt({room:e,item:d}),s.doughnuts=ue(s.doughnuts,-1),r.actionsHandled.add("fire")}},ws=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Kl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Tt=A.w*3,Ql=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-Tt&&n.x<o.x+Tt&&n.y>o.y-Tt&&n.y<o.y+Tt},Do=(t,e,n,o,r)=>{if(r&&t.state.activated)return Z;const s=Vn(t.state.position,e);return s===void 0?Z:Ql(t,s)?ws:Kl},ec=(t,e,n,o)=>t.state.activated?Z:Ge(t.state.stoodOnBy,e).some(U)?ws:Z,tc=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Do(t,e,n,o,!0);case"while-player-near":return Do(t,e,n,o,!1);case"on-stand":return ec(t,e);case"off":case"on":return Z;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},nc=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:s,quantityEmitted:i,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(i!==u&&s+c<d){const h=Pi(Bi(`${r}-${i}`,{...l,position:_},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=Rn(a,M(h.aabb,.5)),lt({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*oc(t,e,n,o){Pe(t)&&(yield Xl(t,e,n,o),yield Wl(t,e),yield*Jl(t,e)),U(t)?(yield bs(t,e,n,o),t.id===n.currentCharacterName&&(yield yl(t,e,n,o),yield gs(t,e,n),_i(t)&&Pl(t,e,n,o),Ai(t)&&Yl(t,e,n))):Fi(t)?yield ql(t):Ri(t)?(yield tc(t,e,n,o),yield fl(t,e,n,o)):Mi(t)&&nc(t,e)}const rc=(t,e,n,o)=>{if(!Pe(t)||t.state.standingOnItemId===null)return;const r=Ue(t.state.standingOnItemId,e);U(t)&&r.type==="pickup"&&hs({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||U(t)&&r.state.disappear==="onTouchByPlayer")&&wr({touchedItem:r,gameState:n,room:e})},sc=(t,e,n,o)=>{if(U(t)&&t.state.standingOnItemId!==null){const i=Ue(t.state.standingOnItemId,e);(ur(i)||i.type==="spikes")&&ds({room:e,movingItem:t})}const r=[...oc(t,e,n,o)];rc(t,e,n);let s=vs(t,r);(Pe(t)||J("lift")(t)||J("firedDoughnut")(t))&&(s=$(s,...ae(G(t.state.vels)).map(i=>M(i,o)))),zn({subjectItem:t,posDelta:s,gameState:n,room:e,deltaMS:o,onTouch:Xn})},ic=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ue(e.state.head.lives,-1),e.state.heels.lives=ue(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=it(e.state.head.lives)>0,s=it(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!s||!r&&s){const c=r?"head":"heels";t.currentCharacterName=c,ye(t,e);const u=Qn(e)[c],d=Le({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:eo(u)};return}if(t.entryState.headOverHeels!==void 0){ye(t,e);const c=Le({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Qn(e);if(ye(t,c),ye(t,u),Bn(c,u)){const d=gr({head:c,heels:u});ye(t,d,"heels");const h=Le({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:eo(d)};return}else{const d=Le({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Le=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=zi({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??le});for(const s of e)lt({room:r,item:s}),(s.type==="head"||s.type==="headOverHeels")&&da(r,t);return r},ye=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},ac=(t,e)=>{const n=br(t,vr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];ye(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=gr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});ye(t,a);const l=Le({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}lt({room:o,item:e});return}else{const i=Le({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=i;return}}},lc=(t,e)=>{e.type==="headOverHeels"?ic(t,e):ac(t,e),Ne(t)===void 0&&w.dispatch(Di({offerReincarnation:!0}))},cc=t=>{for(const e of me(t.items))for(const n of Ge(e.state.stoodOnBy,t)){if(!t.items[n.id]){to(n,t);continue}if(!Hn(n,e)){to(n,t);const o=us(n,pr(t.items));o!==void 0&&hr({above:n,below:o})}}},uc=2*ha,dc=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+uc,positionDelta:n})},hc=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const i={...Rn(o.state.position,r),z:0};if(!Oe(i,_))for(const a of Ge(o.state.stoodOnBy,e))dc(a,e,i)}},fc=(t,e)=>{for(const n of me(t.items))!Pe(n)||t.roomTime===n.state.actedOnAt.roomTime||Li(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Ei(n.state.position),e.add(n))},pc=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,mc=t=>{for(const e of me(t.items)){const n=e.state.position;e.state.position=$i(n)}},gc=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},bc=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Ne(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const s=br(t,vr(o.type));s!==void 0&&(s.state.gameTime+=n)}}},vc=(t,e)=>{const n=we(t);if(n===void 0)return yr;bc(t,n,e);const o=Object.fromEntries(Ui(n.items).map(([i,a])=>[i,a.state.position]));for(const i of G(n.items))pc(i,n)&&(mr({room:n,item:i}),U(i)&&lc(t,i));const r=Object.values(n.items).sort(gc);for(const i of r){const a=Ne(t);if(a===void 0||a.state.action==="death")break;if(n.items[i.id]!==void 0)try{sc(i,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item ${i.id}: ${l}`)}}cc(n),mc(n);const s=new Set(ae(G(n.items)).filter(i=>o[i.id]===void 0||!Oe(i.state.position,o[i.id])));return hc(s,n,o),fc(n,s),s},zo=(t,e)=>{const n=k(t),o=k($(t,{x:e.x,z:e.z})),r=k($(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},on=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,yc=(t,e,n,o)=>{const r=zo(t,e),s=zo(n,o),i=r.topLeft.x,a=r.topRight.x,l=s.topLeft.x,c=s.topRight.x,u=on(i,a,l,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=s.topRight.y-s.topRight.x/2,m=s.bottomCentre.y-s.bottomCentre.x/2,v=on(d,h,f,m),T=r.topLeft.y+r.topLeft.x/2,I=r.bottomCentre.y+r.bottomCentre.x/2,P=s.topLeft.y+s.topLeft.x/2,S=s.bottomCentre.y+s.bottomCentre.x/2,O=on(T,I,P,S);return u&&v&&O},xc=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,o=e.renderAabb||e.aabb,r=t.state.position,s=e.state.position;if(!yc(r,n,s,o))return 0;for(const i of Ni){const a=t.state.position[i],l=a+n[i],c=e.state.position[i],u=c+o[i];if(l<=c)return 1*(i==="z"?-1:1);if(a>=u)return-1*(i==="z"?-1:1)}return Lo(e)-Lo(t)},Lo=t=>t.state.position.x+t.state.position.y-t.state.position.z;class _t extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const wc=t=>{const e=Sc(t);let n=e.length,o=n;const r=new Array(n),s={},i=Cc(e);for(;o--;)s[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new _t([l],!1);if(s[c])return;s[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,i.get(f),u)}catch(m){throw m instanceof _t?m.hasClosedCycle?m:new _t([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function Sc(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Cc(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Eo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},kt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Tc=(t,e=new Set(G(t)),n=new Map)=>{const o=new Map;for(const[r,s]of n)if(!t[r])n.delete(r);else for(const i of s)t[i]||kt(n,r,i);for(const r of e)if(r.fixedZIndex===void 0)for(const s of G(t)){if(s.fixedZIndex!==void 0||o.get(s)?.has(r)||r===s)continue;const i=xc(r,s);if(Eo(o,r,s),i===0){kt(n,r.id,s.id),kt(n,s.id,r.id);continue}const a=i>0?r.id:s.id,l=i>0?s.id:r.id;Eo(n,a,l),kt(n,l,a)}return n},Ss=(t,e,n=3)=>{try{return{order:wc(t),impossible:!1}}catch(o){if(o instanceof _t){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:Ss(t,e,n-1).order,impossible:!0}}else throw o}};class Cs extends ls{}const $o=(t,e)=>{e.poly([k({}),k({x:t.x}),k({x:t.x,y:t.y}),k({y:t.y})]).poly([k({}),k({z:t.z}),k({y:t.y,z:t.z}),k({y:t.y})]).poly([k({x:t.x}),k({x:t.x,z:t.z}),k(t),k({x:t.x,y:t.y})]).poly([k({z:t.z}),k({x:t.x,z:t.z}),k({x:t.x,y:t.y,z:t.z}),k({y:t.y,z:t.z})])},Uo=(t,e)=>{const n=new W;return $o(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),$o(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},kc={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Ic{constructor(e){this.renderContext=e;const{item:n}=e,o=kc[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const s=k(n.config.relativePoint);this.#e.addChild(new W().circle(s.x,s.y,5).stroke(o)),this.#e.addChild(new W().circle(s.x,s.y,2).fill(o))}this.#e.addChild(new W({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Uo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Uo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new La({text:s,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class Oc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=k(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const Ts=(t,e)=>{const n=e.getLocalBounds(),o=$n.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new fe({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},jt=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof fe?r:Ts(t,r)},Ae=t=>z(({renderContext:{item:e}})=>Mn(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),ne=t=>z(({renderContext:{item:e,pixiRenderer:n}})=>{if(Mn(e))return jt(n,t,e.config.times);{const o=p(t);return o instanceof fe?o:Ts(n,o)}}),z=t=>({renderContext:e,currentRendering:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:le}:"no-update",oe=t=>({renderContext:{pixiRenderer:e,item:n},currentRendering:o})=>{if(o===void 0){const r=Mn(n)?n.config.times:void 0,s={output:jt(e,t(n.config),r),renderProps:le};return r&&(s.output.y-=((r.z??1)-1)*A.h),s}else return"no-update"},Pc=({renderContext:{pixiRenderer:t,item:e,room:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:s}}=e,i=o?.renderProps,a=Ve(e),l=a&&Ge(r,n).find(U)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:jt(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},s),renderProps:{flashing:l,activated:a}}:"no-update"},rn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:o})=>{const r=o?.renderProps,s=Gt(n)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=p(s==="left"||s==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(A.h*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},No={lift:ne("shadowMask.smallBlock"),conveyor:oe(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:He(t)==="x"})),teleporter:Pc,floor:"no-mask",barrier:oe(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:ne("shadowMask.smallRound"),block:oe(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:oe(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),movingPlatform:oe(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),hushPuppy:ne("shadowMask.hushPuppy"),portableBlock:oe(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:oe(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:oe(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.fullBlock"),spikes:ne("shadowMask.spikes"),switch:ne("shadowMask.switch"),pickup:oe(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:ne("shadowMask.smallRound"),"monster.dalek":ne("shadowMask.dalek"),"monster.turtle":rn("turtle"),"monster.skiHead":rn("skiHead"),"monster.homingBot":ne("shadowMask.smallRound"),joystick:ne("shadowMask.joystick"),charles:rn("charles",2)},Bc=t=>t.type==="monster"?No[`monster.${t.config.which}`]:No[t.type],_c=new Ma({alpha:.66});class Ac{constructor(e,n){this.renderContext=e,this.#r||(this.#e.filters=_c),n!=="no-mask"&&(this.#t=new Cs(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t;#o={};get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const o=this.#t.output.children.at(0);if(o===void 0||!(o instanceof fe)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}n!==o&&(this.#r||(this.#e.mask=o))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:o}=e,{item:r,pixiRenderer:s,room:i}=this.renderContext,a=n.has(r),l=r.state.position.z+r.aabb.z,c=me(i.items).filter(function(m){return m.shadowCastTexture!==void 0}),u={id:r.id,state:{position:{...r.state.position,z:l}},aabb:{...r.aabb,z:Gi}},d=Object.groupBy(c,f=>{const m=this.#o[f.id]!==void 0,v=n.has(f);return!a&&!v?m?"keepUnchanged":"noShadow":Bn(u,f)?m?"update":"create":"noShadow"});for(const f of uo(d.keepUnchanged,d.update))this.#o[f.id].renderedOnProgression=o;if(d.create)for(const f of d.create){const{times:m}=f.config,v=jt(s,f.shadowCastTexture,m);v.label=f.id,this.#n.addChild(v),this.#o[f.id]={sprite:v,renderedOnProgression:o}}for(const f of uo(d.create,d.update)){const{sprite:m}=this.#o[f.id],v=k({...ct(f.state.position,r.state.position),z:r.aabb.z});m.x=v.x,m.y=v.y}for(const[f,{sprite:m,renderedOnProgression:v}]of Rt(this.#o))v!==o&&(m.destroy(),delete this.#o[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const Fc=t=>{const e=Bc(t.item);return e===void 0?void 0:new Ac(t,e)};class Rc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const L=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=x.createBufferSource(),c=gn()[o];return l.buffer=c,l.loop=s,l.playbackRate.value=i?n-.05+Math.random()*.1:n,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Fe=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},E=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&s)?(l?.stop(),l=L({...t}),Fe(l,t.gain,i),n!==void 0&&(r?(l=L({...n,loop:!0}),Fe(l,n.gain,i)):l.onended=()=>{c&&(l=L({...n,loop:!0}),Fe(l,n.gain,i))})):n!==void 0&&(l=L({...n,loop:!0}),Fe(l,n.gain,i)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=L({...o}),Fe(l,o.gain,i)));else if(c!==u&&e!==void 0){const h=L({...e});Fe(h,e.gain,i)}a=!1,c=u}};class Mc{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=E({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Dc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&L({soundId:"bonus",connectTo:this.output});break}case"disappearing":{L({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,L({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class jn{constructor(e,n,o=1){this.renderContext=e,this.#e=E({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,s=o>(e??Nt)&&!xa(xr(r));this.#e(s)}destroy(){}}class zc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new jn(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=E({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=n,a=o===s&&ae(xr(i)).some(l=>Hi(r[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const ht=t=>{for(const e in t)return!0;return!1},sn=2;class Lc{constructor(e){this.renderContext=e}output=x.createGain();#e=E({start:{soundId:"conveyorStart",playbackRate:sn},loop:{soundId:"conveyorLoop",playbackRate:sn},stop:{soundId:"conveyorEnd",playbackRate:sn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=ht(e);this.#e(n)}destroy(){this.#e(!1)}}const Ec=3;class $c{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=L({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Ec*e)}destroy(){}}const Go={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Ho={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Vo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Xo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Uc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Go[n]!==void 0&&(this.#r=new jn(e,Go[n]),this.#r.output.connect(this.output)),Ho[n]!==void 0&&(this.#t=E({change:Ho[n]},this.#e)),Xo[n]!==void 0&&(this.#i=E(Xo[n],this.#e)),Vo[n]!==void 0&&(this.#o=E({loop:Vo[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=n;if(this.#t){const a=Pn(o);this.#t(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!s;this.#o(a)}if(this.#i){const a=!Oe(i,_);this.#i(a)}}destroy(){}}class an{constructor(e){this.renderContext=e;const{soundSettings:n,item:{type:o}}=e,{noFootsteps:r}={...rt.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=E({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#i.connect(this.output),this.#o=E({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#r=E({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#o;#r;#i=x.createGain();#a=E({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#s=x.createGain();#l=E({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=ot(n),{teleportingPhase:f,positionZ:m}=this.#c,v=r?r.phase:null,T=i&&l>s&&l>m&&c>0,I=l<m&&c<0&&a===null;this.#r(I),this.#o(T),this.#n!==void 0&&this.#n(!T&&!I&&o==="moving"),h!==void 0&&this.#l(h.carrying!==null);const P=a!==null&&u>(e??Nt)&&d[a];if(this.#a(P),v!==null&&v!==f)if(v==="in"){const S=gn().teleportIn,O=x.createBufferSource();O.buffer=S,O.connect(this.output),O.start()}else{const S=gn().teleportOut,O=x.createBufferSource();O.buffer=S,O.connect(this.output),O.start()}this.#c={teleportingPhase:v,positionZ:l}}destroy(){}}class Nc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=ht(e);!o&&r&&L({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Gc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=E({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:s}}=n,i=o===r&&s!==null&&e.has(n);this.scrapeBracketed(i)}}destroy(){}}class Hc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=ht(e);n&&!o&&L({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Vc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?Fn(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&L({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Xc{constructor(e){this.renderContext=e}output=x.createGain();#e=E({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(Ve(e)&&Ge(e.state.stoodOnBy,n).some(U))}destroy(){}}class jc{constructor(e){this.renderContext=e,L({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class qc extends jn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const Wc={lift:$c,switch:Vc,bubbles:Dc,head:an,heels:an,headOverHeels:an,teleporter:Xc,monster:Uc,conveyor:Lc,spring:Hc,portableBlock:Nc,charles:zc,ball:Mc,pushableBlock:Gc,firedDoughnut:jc,slidingBlock:qc},Jc=t=>{const e=Wc[t.item.type];if(e)return new e(t)},Zc=A.h*Vi,Yc=A.h*-1,Kc=A.w*16,Qc=0,ln=(t,e,n)=>(t-e)/(n-e)*2-1;class eu{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Yt(no({x:0,y:o})),this.positionMaxX=Yt(no({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=$(o.position,M(n.aabb,.5)),s=ln(Yt(r),this.positionMaxX,this.positionMinX),i=ln(r.z,Yc,Zc),a=ln(r.x+r.y,Qc,Kc);this.output.positionX.value=s,this.output.positionY.value=i,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const tu=`#version 300 es

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
`;class zt extends Y{constructor(e){const n=H.from({vertex:dt,fragment:tu,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,s,i]=e.toArray();o.uColour[0]=r,o.uColour[1]=s,o.uColour[2]=i}}const nu=[new zt(g.midRed)],ou=[new zt(g.moss)],ru=75;class su{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<ru?o==="left"?ou:nu:ce,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const iu=(t,e,n)=>{const r=ie().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",s=t.color.shade==="dimmed"&&ie().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${n}`};function*au({config:{direction:t,inHiddenWall:e,height:n}},o){const r=$t(t),s=r==="y"?1:16;function*i(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...Pt(a,{y:-12*n})});l.filters=wn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:s,y:9},textureId:"generic.door.legs.base",...Pt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:s,y:9},textureId:"generic.door.legs.pillar",...Pt(a,{y:-l*A.h})})}}yield*i(B({...de,[r]:1})),yield*i(de),e||(yield p({pivot:{x:16,y:A.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...B({...de,[r]:1})}))}const ks=(t,e)=>{const n=$t(t),o=ut(n),r=8;return t==="towards"||t==="right"?k({[o]:e[o]-r}):de},lu=z(({renderContext:{item:t,room:e}})=>Mt(au(t,e),new b({filters:ge(e),...ks(t.config.direction,t.aabb)}))),cu=z(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:s}}})=>{const i=$t(t),a=s.rooms[n];return p({textureId:iu(r,i,e),filter:ge(a),...ks(t,o)})}),cn={animationId:"bubbles.cold"},Ee=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},Is=Symbol(),Os=Symbol(),uu=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[Is]=t,n[Os]=e,n},qn=t=>t,Tn=.02,du=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:s})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:s};if(o==="out")return{animationId:`${t}.fadeOut`,paused:s};if(o==="in")return{animationId:`${t}.fadeOut`,paused:s};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:s};if(e==="jumping")return{textureId:r<Tn?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`,paused:s};if(e==="falling"){const a=`${t}.falling.${n}`;if(Wi(a))return{textureId:a}}const i=`${t}.idle.${n}`;return Ji(i)?{animationId:i,paused:s}:{textureId:`${t}.walking.${n}.2`}},kn=Symbol(),In=Symbol(),hu=(t,e)=>{t[kn].removeChildren(),t[kn].addChild(p(du(e)))},un=(t,e,n)=>{const o=new b,r=new b;o[kn]=r,o.addChild(r);const s=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new be({pastelBlue:g.pink}):ce,flipX:t==="heels"});return o[In]=s,o},jo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+ji>t,fu=t=>{if(!tt(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%oo<oo*qi},qo=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Wo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?ce:t.filters},pu=(t,{highlighted:e,flashing:n},o,r)=>{const s=o?.highlighted??!1;e&&!s?qo(r,new Ce({outlineColor:ze[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&s&&Wo(r,Ce);const i=o?.flashing??!1;n&&!i?qo(r,new zt(ze[t])):!n&&i&&Wo(r,zt)},mu=(t,e,n)=>{e&&!n?t.addChild(t[In]):!e&&n&&t.removeChild(t[In])},dn=(t,e,n,o,r,s)=>{n&&hu(e,{name:t,...o,paused:r}),pu(t,o,s,e),mu(e,o.shining,s?.shining??!1)},gu=({renderContext:{item:t,gameState:e,paused:n},currentRendering:o})=>{const{type:r,state:{action:s,facing:i,teleporting:a,vels:{gravity:{z:l}}}}=t,c=o?.renderProps,u=o?.output,d=Pn(i)??"towards",h=t.type==="headOverHeels"?jo(t.state.head,"headOverHeels","headOverHeels"):jo(t.state,t.type,e.currentCharacterName),f=fu(t),m=ts(t),v=at(i),T=a?.phase??null,I={action:s,facingXy8:d,teleportingPhase:T,flashing:f,highlighted:h,shining:m,gravityZ:l},P=c===void 0||c.action!==s||c.facingXy8!==d||c.teleportingPhase!==T||c?.gravityZ>Tn!=l>Tn;let S;if(r==="headOverHeels"){S=u??uu({top:un("head",!0,n),bottom:un("heels",!0,n)});const O=S;dn("head",O[Is],P,I,n,c),dn("heels",O[Os],P,I,n,c)}else S=u??un(r,!1,n),dn(r,S,P,I,n,c);return s==="moving"&&u instanceof st&&(u.animationSpeed=v*Xi),{output:S,renderProps:I}},hn=qn(gu),bu=(t,e)=>{const n=([i,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...B({x:-e.x,y:-e.y})}),r=Mt(ae(Rt(t.items)).filter(i=>i[1].type==="wall").filter(n).map(([i,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:i,...B(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),s=Mt(ae(Rt(t.items)).filter(i=>i[1].type==="door").filter(n).map(([i,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:i,...B(Pt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:i,...B({...l,z:0}),times:{[ut(He(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(s),o},vu=t=>[...ae(G(t.items)).filter(e=>e.type==="wall").filter(e=>He(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],yu=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:s,y:i}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.x??1)-1))}return e},xu=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new W().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(B),!0).fill(0),wu=z(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:s,sidesWithDoors:i,edgeLeftX:a,edgeRightX:l}=Ht(t.roomJson),c=r-n,u=s-o,{floor:d,color:{shade:h},roomJson:f}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const P=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,S=new b;for(let D=-1;D<=r+2;D++)for(let V=D%2-1;V<=s+2;V+=2)S.addChild(Zi({x:D+(i.right?-.5:0),y:V+(i.towards?-.5:0)},p({textureId:P})));S.addChild(bu(f,{x:n,y:o}));const O=new W().poly([de,B({x:c,y:0}),B({x:c,y:u}),B({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});S.addChild(O),S.filters=ge(t),S.mask=O,m.addChild(S)}const v=vu(f),T=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(T);const I=yu(v);if(I!==void 0){const P=xu({extraWallRanges:I,blockXMin:n,blockYMin:o});m.addChild(P)}return m.mask=T,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Su=({blockXMin:t,blockYMin:e},n)=>{const o=i=>i[1].config.direction==="towards"||i[1].config.direction==="right",r=B({x:-t,y:-e}),s={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return ae(Rt(n.items)).filter(i=>i[1].type==="wall"||i[1].type==="door").filter(o).forEach(([i,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:i,textureId:`floorEdge.${l}`,...B(h),times:a.type==="wall"?a.config.times:{[ut(He(l))]:2}});s[l].addChild(f),l==="right"&&c.y===0&&e<0&&s[l].addChild(p({label:`${i}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...B($(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&s[l].addChild(p({label:`${i}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...B($(h,{x:-.5}))}))}),s},Cu=z(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:s,edgeLeftX:i,edgeRightX:a}=Ht(e.roomJson),l=r-n,c=s-o,u=new b({label:"floorEdge"}),d=new W({label:"overDrawToHideFallenItems"}).poly([B({x:l,y:0}),B({x:0,y:0}),B({x:0,y:c}),{...B({x:0,y:c}),y:999},{...B({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=Su({blockXMin:n,blockYMin:o},e.roomJson);h.filters=wn(e,"towards",t),f.filters=wn(e,"right",t),u.addChild(h),u.addChild(f);const m=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:i,y:999},{x:i,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Tu=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],ku=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentRendering:r})=>{const s=r?.renderProps,{activated:i,busyLickingDoughnutsOffFace:a}=e,l=a?Ha:i?void 0:Tu.includes(t.which)?ss(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const c=Gt(e.facing)??"towards";if(!(s===void 0||i!==s.activated||a!==s.busyLickingDoughnutsOffFace||c!==s.facingXy4))return"no-update";const d={facingXy4:c,activated:i,busyLickingDoughnutsOffFace:a};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${c}`,filter:l}),renderProps:d};case"elephantHead":return{output:p({textureId:`elephant.${c}`,filter:l}),renderProps:d};case"turtle":return{output:p(i&&!a?{animationId:`${t.which}.${c}`,filter:l,paused:o}:{textureId:`${t.which}.${c}.1`,filter:l}),renderProps:d};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Ee({top:{textureId:`${t.which}.${c}`,filter:l||ge(n)},bottom:{...cn,paused:o}}):p({textureId:`${t.which}.${c}`,filter:l}),renderProps:d};case"computerBot":case"elephant":case"monkey":return{output:Ee({top:`${t.which}.${c}`,filter:l}),renderProps:d};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(s===void 0||a!==s.busyLickingDoughnutsOffFace||i!==s.activated))return"no-update";const u={activated:i,busyLickingDoughnutsOffFace:a};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!a?{animationId:t.which,filter:l,paused:o}:{textureId:`${t.which}.1`,filter:l}),renderProps:u};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:u};case"bubbleRobot":return{output:Ee({top:{...cn,paused:o},filter:l}),renderProps:u};case"emperorsGuardian":return{output:Ee({top:"ball",bottom:{...cn,paused:o},filter:l}),renderProps:u};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},Iu=pe.floatingText,Ou=12,Jo=A.h*3,Zo=[g.shadow,g.midGrey,g.redShadow,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],Yo=[...Zo,...new Array(20).fill(g.white),...Zo.toReversed()],Pu=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},displaySettings:{uncolourised:o}},currentRendering:r})=>{const s=r?.output;let i;const l=(n-e)*Iu;if(s===void 0){i=new b({filters:new Ce({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=re(new b({label:u,y:c*Ou,filters:o?ce:new N(g.pink)}),u.toUpperCase());i.addChild(d)}}else i=s;for(let c=0;c<t.length;c++){const u=i.children[c],[d]=u.filters,h=l+c*-12,f=h>0&&h<Jo;if(u.visible=f,f&&d){const m=Math.floor(h/Jo*Yo.length);d.targetColor=Yo[m]}}return i.y=-l,{output:i,renderProps:le}},Ko=500,Bu=Et.animations["conveyor.x"].animationSpeed,Qo=Et.animations["conveyor.x"].length,_u=t=>1-(1-t)**2,Au=(t,e)=>{for(let n=0;n<t.children.length;n++){const o=t.children[n],r=n%Qo;o.gotoAndStop(e?Qo-r-1:r)}return t},Fu=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:o}},currentRendering:r})=>{const s=r?.renderProps,i=ht(n),a=(!i&&s?.moving?o:s?.roomTimeStoppedMoving)??Nt,l=He(t),c=r?.output??Au(p({animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),u=i?0:Math.min(o-a,Ko),d=Math.max(0,1-u/Ko);for(const h of c.children)if(d===0)h.stop();else{const f=Bu*_u(d);h.play(),h.animationSpeed=f}return{output:c,renderProps:{moving:i,roomTimeStoppedMoving:a}}},Ru=qn(Fu),Mu=({renderContext:{item:t,room:e,paused:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:s}}=t,i=o?.renderProps,a=Ve(t),l=a&&Ge(r,e).find(U)!==void 0;return i===void 0||a!==i.activated||l!==i.flashing?{output:l?new b({children:[p({textureId:"teleporter",times:s}),p({animationId:"teleporter.flashing",times:s,paused:n})]}):p({textureId:a?"teleporter":"block.artificial",times:s}),renderProps:{flashing:l,activated:a}}:"no-update"},Du=({renderContext:{item:{state:{facing:t}}},currentRendering:e})=>{const n=e?.renderProps,o=Gt(t)??"towards";return n===void 0||o!==n.facingXy4?{output:Ee({top:`charles.${o}`}),renderProps:{facingXy4:o}}:"no-update"},Wn=g.moss,zu=({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentRendering:n})=>{const o=n?.renderProps;if(!(o===void 0||e!==o.highlighted))return"no-update";const s=e?new Ce({outlineColor:Wn,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:s}),renderProps:{highlighted:e}}},Lu=({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentRendering:o})=>{const r=o?.renderProps,s=ht(t);if(!(r===void 0||e!==r.highlighted||s!==r.compressed))return"no-update";const a=r?.compressed??!1,l=e?new Ce({outlineColor:Wn,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=o?.output,u=c!==void 0&&s===a&&e!==r?.highlighted;let d;return u?(c.filters=l??rr,d=c):d=p(!s&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:s?"spring.compressed":"spring.released",filter:l}),{output:d,renderProps:{compressed:s,highlighted:e}}},Eu=({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentRendering:o})=>{const r=o?.renderProps;if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new Ce({outlineColor:Wn,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Ee({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},$u=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},paused:n},tickContext:{deltaMS:o},currentRendering:r})=>{const i=(r?.renderProps?.distanceTravelled??0)+An(t)*(n?0:o),l=r?.output??p("spikyBall.1"),u=(Math.floor(i*2/$e.w)+e)%2+1;return l.texture=ie().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:i}}},Uu=qn($u),Nu=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,Gu=z(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=ut(He(e)),s=new b({label:"wallTiles"});for(let i=0;i<n.length;i++){const a=p({textureId:Nu(o.planet,n[i],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:$e.w,y:$e.h+1}:{x:0,y:$e.h+1},filter:ge(o)}),l=B({[r]:i});a.x+=l.x,a.y+=l.y,s.addChild(a)}return s}),Hu=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const o=n?.renderProps,r=e.type==="in-store"?Fn(w.getState(),e.path)?"right":"left":t;return o===void 0||r!==o.setting?{output:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},Vu=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Xu=({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentRendering:r})=>{const s=r?.renderProps;return s===void 0||s.disappear!==n?{output:p({textureId:Vu(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ge(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},ju=()=>z(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),qu={head:hn,heels:hn,headOverHeels:hn,doorFrame:cu,doorLegs:lu,monster:ku,floatingText:Pu,wall:Gu,barrier:z(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:z(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ge(n):void 0,times:e})),spikes:Ae("spikes"),slidingDeadly:Uu,slidingBlock:ju(),block:Xu,switch:Hu,conveyor:Ru,lift:z(({renderContext:{paused:t}})=>{const e=new b,n={x:Ke.w/2,y:Ke.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter:Mu,sceneryCrown:z(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:z(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ge(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Ae("fish.1"),charles:Du,joystick:Ae("joystick"),movingPlatform:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock:zu,spring:Lu,sceneryPlayer:Eu,hushPuppy:Ae("hushPuppy"),bubbles:z(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Ae({animationId:"bubbles.doughnut"}),ball:Ae("ball"),floor:wu,floorEdge:Cu},Wu=t=>{if(t.type==="wall"){const{direction:e}=t.config;if(e==="right"||e==="towards")return}return qu[t.type]},Ju=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Zu=t=>{const e=w.getState(),n=Yi(e),o=!Ki(e),{item:r,gameState:s}=t,i=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[],l=Wu(r);if(l!==void 0){const f=new Cs(t,l),m=new su(t,f);a.push(m),i&&(m.output.alpha=.66)}if(o){const f=Fc(t);f!==void 0&&a.push(f)}i&&a.push(new Ic(t));let c;if(a.length===0)c=void 0;else{const f=a.length===1?a[0]:new Yu(a,t);Ju(r,f.output,s),c=new Oc(t,f)}const u=t.soundSettings.mute??rt.soundSettings.mute,d=t.paused||u?void 0:Jc(t),h=d===void 0?void 0:new eu(t,d);return new Rc(t,{graphics:c,sound:h})};class Yu{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Re=.33,Ku=Qi()==="mobile"?-4:16,On=$e.h-$e.w/2,Qu=pe.heels,ed=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:s,topEdgeY:i}=Ht(t.roomJson),a=o+s.x,l=r+s.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-Ku-s.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,f=u.y+i-On<0;return(m,v,T)=>{if(m===void 0)return;const I=k(m.state.position),P=$(I,u),S={x:d&&P.x<n.x*Re?Math.min(-a,n.x*Re-I.x):h&&P.x>n.x*(1-Re)?Math.max(n.x-l,n.x*(1-Re)-I.x):u.x,y:f&&P.y<n.y*Re?n.y*Re-I.y:u.y};if(T)e.x=S.x,e.y=S.y;else{const O=Qu*v,D=ct(e,S),V=An(D);if(V>O){const Jt={x:D.x/V,y:D.y/V};e.x-=Jt.x*O,e.y-=Jt.y*O}else e.x=S.x,e.y=S.y}}},td=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Ht(t);return new W().rect(e+o.x,r-On,n-e,o.y-r+On).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class nd{constructor(e){this.renderContext=e;const{displaySettings:n,upscale:o}=e;this.initFilters(e.colourised,e.room.color);const s=e.soundSettings.mute??rt.soundSettings.mute?void 0:x.createGain();this.output={sound:s,graphics:new b({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})},(n?.showBoundingBoxes??rt.displaySettings.showBoundingBoxes)!=="none"&&this.output.graphics.addChild(td(e.room.roomJson)),this.#i=ed(e.room,this.output.graphics,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});output;#t=void 0;#o=new Map;#r=new Map;#i;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Xa:ce:new N(Nn(n).main.original)}#a(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of me(n.items)){let s=this.#r.get(r.id);if(s===void 0){s=Zu({...this.renderContext,item:r}),this.#r.set(r.id,s);const i=r.type==="floorEdge"?this.#n:this.#e,{graphics:a,sound:l}=s.output;if(a&&(i.addChild(a),r.fixedZIndex&&(a.zIndex=r.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{s.tick(o)}catch(i){throw new Error(`RoomRenderer caught error while ticking item ${r.id}: ${i.message}`,{cause:i})}}for(const[r,s]of this.#r.entries())n.items[r]===void 0&&(s.destroy(),this.#r.delete(r))}#s(e){const{order:n}=Ss(Tc(this.renderContext.room.items,e.movedItems,this.#o),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);const s=r.output.graphics;if(s)s.zIndex=n.length-o;else throw new Error(`order ${n[o]} was given a z-order by sorting, but item has no graphics`)}}get#l(){return this.#t!==void 0}tick(e){const n=this.#l?e:{...e,movedItems:new Set(me(this.renderContext.room.items))};this.#i(Ne(this.renderContext.gameState),e.deltaMS,!this.#l),this.#a(n),(!this.#l||n.movedItems.size>0)&&this.#s(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var qt=`in vec2 aPosition;
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
`,Wt=`struct GlobalFilterUniforms {
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
}`,od=`precision highp float;
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
`,rd=`struct CRTUniforms {
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
}`,sd=Object.defineProperty,id=(t,e,n)=>e in t?sd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,At=(t,e,n)=>(id(t,typeof e!="symbol"?e+"":e,n),n);const Ps=class Bs extends Y{constructor(e){e={...Bs.DEFAULT_OPTIONS,...e};const n=Te.from({vertex:{source:Wt,entryPoint:"mainVertex"},fragment:{source:rd,entryPoint:"mainFragment"}}),o=H.from({vertex:qt,fragment:od,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),At(this,"uniforms"),At(this,"seed"),At(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};At(Ps,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ad=Ps;var ld=`
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
}`,cd=`struct KawaseBlurUniforms {
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
}`,ud=`
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
`,dd=`struct KawaseBlurUniforms {
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
}`,hd=Object.defineProperty,fd=(t,e,n)=>e in t?hd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ve=(t,e,n)=>(fd(t,typeof e!="symbol"?e+"":e,n),n);const _s=class As extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(nt("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...As.DEFAULT_OPTIONS,...n};const o=Te.from({vertex:{source:Wt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?dd:cd,entryPoint:"mainFragment"}}),r=H.from({vertex:qt,fragment:n?.clamp?ud:ld,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ve(this,"uniforms"),ve(this,"_pixelSize",{x:0,y:0}),ve(this,"_clamp"),ve(this,"_kernels",[]),ve(this,"_blur"),ve(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const s=this.pixelSizeX/n.source.width,i=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*i,e.applyFilter(this,n,o,r);else{const l=De.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*i,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*s,this.uniforms.uOffset[1]=a*i,e.applyFilter(this,c,o,r),De.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const s=e/n;for(let i=1;i<n;i++)r-=s,o.push(r)}this._kernels=o,this._updatePadding()}};ve(_s,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let pd=_s;var md=`in vec2 vTextureCoord;
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
`,gd=`struct AdvancedBloomUniforms {
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
`,bd=`
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
`,vd=`struct ExtractBrightnessUniforms {
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
`,yd=Object.defineProperty,xd=(t,e,n)=>e in t?yd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Fs=(t,e,n)=>(xd(t,typeof e!="symbol"?e+"":e,n),n);const Rs=class Ms extends Y{constructor(e){e={...Ms.DEFAULT_OPTIONS,...e};const n=Te.from({vertex:{source:Wt,entryPoint:"mainVertex"},fragment:{source:vd,entryPoint:"mainFragment"}}),o=H.from({vertex:qt,fragment:bd,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Fs(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Fs(Rs,"DEFAULT_OPTIONS",{threshold:.5});let wd=Rs;var Sd=Object.defineProperty,Cd=(t,e,n)=>e in t?Sd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Me=(t,e,n)=>(Cd(t,typeof e!="symbol"?e+"":e,n),n);const Ds=class zs extends Y{constructor(e){e={...zs.DEFAULT_OPTIONS,...e};const n=Te.from({vertex:{source:Wt,entryPoint:"mainVertex"},fragment:{source:gd,entryPoint:"mainFragment"}}),o=H.from({vertex:qt,fragment:md,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:xe.WHITE}}),Me(this,"uniforms"),Me(this,"bloomScale",1),Me(this,"brightness",1),Me(this,"_extractFilter"),Me(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new wd({threshold:e.threshold}),this._blurFilter=new pd({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const s=De.getSameSizeTexture(n);this._extractFilter.apply(e,n,s,!0);const i=De.getSameSizeTexture(n);this._blurFilter.apply(e,s,i,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=i.source,e.applyFilter(this,n,o,r),De.returnTexture(i),De.returnTexture(s)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Me(Ds,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Td=Ds;const kd=le,Id=(t,e)=>(n,o)=>{const r=new Set;if(ea(n)){const u=we(n)?.items;if(u!==void 0){const d=ae(G(_n(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const i=o*n.gameSpeed,a=Math.ceil(i/e),l=i/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)r.add(h)}const c=we(n)?.items??kd;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},er=({crtFilter:t},e)=>[t?new ad({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Td({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Od{constructor(e,n){this.app=e,this.#a=e,this.#s=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#i.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,we(n)===void 0)throw new Error("main loop with no starting room");this.#u()}catch(o){this.#c(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#i=x.createGain();#a;#s;#l=Id(vc,ia);#c(e){w.dispatch(ta(na(e)))}#u(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=er(e,!0),this.#n=er(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const o=new Error("Error caught in main loop",{cause:n});console.error(o),this.#c(o)}};tick=({deltaMS:e})=>{const n=w.getState(),o=oa(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:s},upscale:i}}=w.getState(),a=!o&&!(r?.uncolourised??rt.displaySettings.uncolourised),l=ra(n),c=sa(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Vl({colourise:a,gameState:this.#s,inputDirectionMode:c,onScreenControls:l}),this.#a.stage.addChild(this.#t.output));const u=we(this.#s);this.#t.tick({screenSize:i.gameEngineScreenSize,room:u});const d=o?yr:this.#l(this.#s,e),h=we(this.#s);(this.#o?.renderContext.room!==h||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.soundSettings!==s||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),h?(this.#o=new nd({gameState:this.#s,room:h,paused:o,pixiRenderer:this.#a.renderer,displaySettings:r,soundSettings:s,colourised:a,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#i),this.#s.events.emit("roomChange",h.id)):this.#o=void 0,this.#a.stage.scale=i.gameEngineUpscale,this.#u()),this.#o?.tick({progression:this.#s.progression,movedItems:d,deltaMS:e}),o?this.#a.stage.filters=this.#e:this.#a.stage.filters=this.#n};start(){return this.#a.ticker.add(this.tickAndCatch),this}stop(){this.#a.stage.removeChild(this.#r),this.#i.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#a.ticker.remove(this.tickAndCatch)}}Lt.add(Tr,kr,Ir,Or,Pr,Br,_r,Ar,Fr,Rr,Mr,zr,Dr,Lr,Er,$r,Ur,Nr,Gr,Hr,Vr);ca.defaultOptions.scaleMode="nearest";const tr=async(t,e)=>{const n=new Kr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=aa;const o=w.getState().gameMenus.currentGame,r=ro({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(la(o.store.gameMenus)):(w.dispatch(so(r.characterRooms.head.id)),w.dispatch(so(r.characterRooms.heels.id)));const s=new Od(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const a=Ne(r);a!==void 0&&Dn({playableItem:a,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return we(r)},get gameState(){return r},reincarnateFrom(i){ro({campaign:t,inputStateTracker:e,savedGame:i,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),s.stop(),n.destroy()}}},Rd=Object.freeze(Object.defineProperty({__proto__:null,default:tr,gameMain:tr},Symbol.toStringTag,{value:"Module"}));export{Wr as A,Xr as C,Y as F,$n as R,Ia as S,Jr as V,Aa as a,Rd as g,ka as u};
