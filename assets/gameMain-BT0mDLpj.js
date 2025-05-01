const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-D99s5xQe.js","assets/App-lNPdPh8d.js","assets/index-XZTRzSht.js","assets/index-Bey31AcW.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CUMW7f_p.js","assets/Graphics-X-TvTtSB.js","assets/changeCharacterRoom-NIu1TepH.js","assets/WebGLRenderer-DsbQZHjr.js"])))=>i.map(i=>d[i]);
import{b3 as Bi,b4 as qo,b5 as _i,am as Pi,aq as we,ar as H,ae as Wo,an as be,Z as C,a2 as zt,a0 as Fi,a3 as g,d as Ze,v as Pt,aG as v,a6 as an,ay as Re,_ as je,$ as Ai,V as Di,b6 as Mi,b7 as zi,b8 as Li,ad as Ri,b9 as q,ba as Gn,K as _,bb as Jo,bc as re,bd as I,be as Yo,s as Zo,M as w,o as G,c as O,bf as Ei,bg as Ui,bh as $i,g as M,w as rt,bi as Ni,bj as Cn,bk as Ko,bl as Gi,bm as Hi,bn as Vi,bo as Tt,i as ie,t as Ce,p as Sn,l as U,bp as ji,bq as Xi,br as qi,bs as Wi,bt as Ji,bu as Yi,I as Ke,bv as kt,e as Zi,bw as it,bx as Qo,by as er,k as tr,bz as Lt,bA as N,j as J,bB as nr,bC as Tn,bD as Hn,bE as or,bF as Ki,bG as st,bH as kn,bI as Se,bJ as Rt,bK as ce,R as at,H as de,bL as he,x as Te,bM as ln,bN as Qi,bO as es,bP as ts,bQ as ns,bR as In,A as Ee,bS as os,bT as rs,bU as is,bV as cn,bW as ss,bX as as,bY as ht,f as On,bZ as ls,b_ as cs,b$ as us,m as ke,C as rr,c0 as Vn,h as fe,c1 as ir,r as sr,b as ds,a as ar,n as hs,a$ as Ue,c2 as Vt,c3 as qe,c4 as ft,c5 as Bn,c6 as fs,c7 as ps,c8 as $e,c9 as jn,ca as _n,cb as ms,cc as gs,cd as lt,ce as bs,cf as vs,cg as ys,ch as xs,ci as ws,cj as Cs,ck as Ss,cl as Ts,cm as Xn,L as qn,cn as lr,b2 as cr,E as ur,F as ks,B as Wn,co as Is,cp as Os,cq as Bs,a_ as ve,cr as dr,cs as _s,ct as Ps,cu as S,cv as Fs,cw as Ft,cx as As,cy as It,cz as Ds,cA as Ms,cB as Jn,cC as zs,cD as Ls,cE as Rs,S as Qe,cF as Et,cG as Es,cH as Ae,cI as x,cJ as un,cK as hr,q as Us,cL as et,cM as jt,J as Yn,cN as $s,cO as Ns,cP as Gs,cQ as Hs,aw as De,cR as Vs,cS as js,cT as Xs,cU as qs,cV as Ws,cW as Js,cX as Ys,cY as Zs,cZ as Zn,c_ as Ks,N as Kn,c$ as Qs}from"./App-lNPdPh8d.js";import{a as ea,f as dn,c as Pn,m as Ut,b as Fn,d as fr,r as ta,o as na}from"./changeCharacterRoom-NIu1TepH.js";import{S as oa,G as W}from"./Graphics-X-TvTtSB.js";import{g as pr,_ as Qn}from"./index-XZTRzSht.js";var pt={},eo;function ra(){if(eo)return pt;eo=1;var t=Bi(),e=t.mark(i),n=qo(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return h=d[u],y.delegateYield(r(h),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}pt.__concat=i;var s=o(i);return pt.concat=s,pt}var mt={},to;function ia(){if(to)return mt;to=1;var t=qo(),e=t.iterableCurry,n=_i(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}mt.__isEmpty=i;var s=e(i,{reduces:!0});return mt.isEmpty=s,mt}var Xt,no;function sa(){return no||(no=1,Xt=ra().concat),Xt}var aa=sa();const oo=pr(aa);var qt,ro;function la(){return ro||(ro=1,qt=ia().isEmpty),qt}var ca=la();const ua=pr(ca),mr=class hn extends Pi{constructor(e){e={...hn.defaultOptions,...e},super(e),this.enabled=!0,this._state=oa.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=we.from(n)),o&&(s=H.from(o)),new hn({gpuProgram:i,glProgram:s,...r})}};mr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Z=mr;var da=`
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
`,ha=`in vec2 aPosition;
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
`,fa=`
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
}`;class B extends Z{constructor(e){const n=e.gpu,o=io({source:fa,...n}),r=we.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=io({source:da,...i}),a=H.from({vertex:ha,fragment:s}),l=new Wo({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:be.EMPTY}})}}function io(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const An=`
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
    `,Dn=`
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
	`;class gr extends B{constructor(){super({gl:{functions:`
                ${An}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Dn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}gr.extension={name:"color",type:C.BlendMode};class br extends B{constructor(){super({gl:{functions:`
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
            `}})}}br.extension={name:"color-burn",type:C.BlendMode};class vr extends B{constructor(){super({gl:{functions:`
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
                `}})}}vr.extension={name:"color-dodge",type:C.BlendMode};class yr extends B{constructor(){super({gl:{functions:`
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
                `}})}}yr.extension={name:"darken",type:C.BlendMode};class xr extends B{constructor(){super({gl:{functions:`
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
            `}})}}xr.extension={name:"difference",type:C.BlendMode};class wr extends B{constructor(){super({gl:{functions:`
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
            `}})}}wr.extension={name:"divide",type:C.BlendMode};class Cr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"exclusion",type:C.BlendMode};class Sr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Sr.extension={name:"hard-light",type:C.BlendMode};class Tr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Tr.extension={name:"hard-mix",type:C.BlendMode};class kr extends B{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"lighten",type:C.BlendMode};class Ir extends B{constructor(){super({gl:{functions:`
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
                `}})}}Ir.extension={name:"linear-burn",type:C.BlendMode};class Or extends B{constructor(){super({gl:{functions:`
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
            `}})}}Or.extension={name:"linear-dodge",type:C.BlendMode};class Br extends B{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"linear-light",type:C.BlendMode};class _r extends B{constructor(){super({gl:{functions:`
                ${An}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Dn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}_r.extension={name:"luminosity",type:C.BlendMode};class Pr extends B{constructor(){super({gl:{functions:`
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
            `}})}}Pr.extension={name:"negation",type:C.BlendMode};class Fr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"overlay",type:C.BlendMode};class Ar extends B{constructor(){super({gl:{functions:`
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
                `}})}}Ar.extension={name:"pin-light",type:C.BlendMode};class Dr extends B{constructor(){super({gl:{functions:`
                ${An}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Dn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Dr.extension={name:"saturation",type:C.BlendMode};class Mr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Mr.extension={name:"soft-light",type:C.BlendMode};class zr extends B{constructor(){super({gl:{functions:`
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
                `}})}}zr.extension={name:"subtract",type:C.BlendMode};class Lr extends B{constructor(){super({gl:{functions:`
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
                `}})}}Lr.extension={name:"vivid-light",type:C.BlendMode};const fn=[];zt.handleByNamedList(C.Environment,fn);async function pa(t){if(!t)for(let e=0;e<fn.length;e++){const n=fn[e];if(n.value.test()){await n.value.load();return}}}let Ne;function ma(){if(typeof Ne=="boolean")return Ne;try{Ne=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Ne=!1}return Ne}var Rr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Rr||{});class ga{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const ba=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Er=class Ur extends Fi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...ba,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await pa(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Ur.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof g&&(o={container:o},n&&(Ze(Pt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:v.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Rr.ALL);const{clear:o,clearColor:r,target:i}=e;v.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ga(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!ma())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Er.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let $r=Er,gt;function va(t){return gt!==void 0||(gt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??$r.defaultOptions.failIfMajorPerformanceCaveat};try{if(!an.get().getWebGLRenderingContext())return!1;let o=an.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),gt}let bt;async function ya(t={}){return bt!==void 0||(bt=await(async()=>{const e=an.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),bt}const so=["webgl","webgpu","canvas"];async function xa(t){let e=[];t.preference?(e.push(t.preference),so.forEach(i=>{i!==t.preference&&e.push(i)})):e=so.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ya()){const{WebGPURenderer:a}=await Qn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-D99s5xQe.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&va(t.failIfMajorPerformanceCaveat??$r.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Qn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-DsbQZHjr.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Nr="8.8.1";class Gr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Nr)}static destroy(){}}Gr.extension=C.Application;class wa{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Nr)}destroy(){this._renderer=null}}wa.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Hr=class pn{constructor(...e){this.stage=new g,e[0]!==void 0&&Ze(Pt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await xa(e),pn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ze(Pt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=pn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Hr._plugins=[];let Vr=Hr;zt.handleByList(C.Application,Vr._plugins);zt.add(Gr);var Ca=`in vec2 aPosition;
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
`,Sa=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,ao=`struct GlobalFilterUniforms {
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
}`;const jr=class Xr extends Z{constructor(e){e={...Xr.defaultOptions,...e};const n=we.from({vertex:{source:ao,entryPoint:"mainVertex"},fragment:{source:ao,entryPoint:"mainFragment"}}),o=H.from({vertex:Ca,fragment:Sa,name:"alpha-filter"}),{alpha:r,...i}=e,s=new Wo({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};jr.defaultOptions={alpha:1};let Ta=jr;class tt extends Re{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof be?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(je.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(je.shared.add(this.update,this,Ai.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(be.from(e[o]));return new tt(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(be.from(e[o]));return new tt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof be)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(je.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(je.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ka extends Di{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Mi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Ia(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ze(Pt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Oa extends ka{constructor(...e){const n=Ia(e,"Text");super(n,zi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Li.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Mn extends be{static create(e){return new Mn({source:new Ri(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const m={pureBlack:new v("#000000"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),pastelBlue:new v("#75ACFF"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},xe=t=>{const[e,n,o]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:o/2})},j={original:new v(q.zxWhite),basic:m.white,dimmed:m.lightGrey},X={original:new v(q.zxYellow),basic:m.midRed,dimmed:m.redShadow},K={original:new v(q.zxMagenta),basic:m.pink,dimmed:xe(m.pink)},D={original:new v(q.zxCyan),basic:m.pastelBlue,dimmed:xe(m.pastelBlue)},Q={original:new v(q.zxGreen),basic:m.moss,dimmed:xe(m.moss)},zn={white:{basic:{main:j,edges:{towards:D,right:X},hud:{lives:X,dimmed:K,icons:D}},dimmed:{main:j,edges:{towards:Q,right:D},hud:{lives:X,dimmed:K,icons:D}}},yellow:{basic:{main:X,edges:{towards:Q,right:j},hud:{lives:D,dimmed:K,icons:Q}},dimmed:{main:X,edges:{towards:D,right:D},hud:{lives:D,dimmed:K,icons:Q}}},magenta:{basic:{main:K,edges:{towards:Q,right:D},hud:{lives:j,dimmed:D,icons:X}},dimmed:{main:K,edges:{towards:Q,right:D},hud:{lives:j,dimmed:D,icons:X}}},cyan:{basic:{main:D,edges:{towards:K,right:j},hud:{lives:j,dimmed:Q,icons:X}},dimmed:{main:D,edges:{towards:K,right:j},hud:{lives:j,dimmed:Q,icons:X}}},green:{basic:{main:Q,edges:{towards:D,right:X},hud:{lives:j,dimmed:K,icons:D}},dimmed:{main:Q,edges:{towards:D,right:X},hud:{lives:j,dimmed:K,icons:D}}}},Ln=t=>zn[t.hue][t.shade],Me={head:m.pastelBlue,heels:m.pink},Ot=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Gn>n?100-Math.ceil((n-e)/(Gn/100)):0},qr=t=>t.type==="headOverHeels"?Ot(t.state.head)>0||Ot(t.state.heels)>0:Ot(t.state)>0,Wr=t=>{const e=100*_.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/_.w):0},Ba={pureBlack:new v("#000000"),shadow:new v("#1B2D3B"),midGrey:new v("#505A55"),lightGrey:new v("#929981"),white:new v("#F8FEF8"),pastelBlue:new v("#4893FF"),metallicBlue:new v("#1D4E80"),pink:new v("#B973AF"),moss:new v("#6E7B00"),redShadow:new v("#513D40"),midRed:new v("#A7574B"),lightBeige:new v("#BF8E69"),highlightBeige:new v("#DBB269"),alpha:new v("#105A69"),replaceLight:new v("#048662"),replaceDark:new v("#052229")},ct=`in vec2 aPosition;
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
`,_a=`in vec2 vTextureCoord;
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
`;class pe extends Z{constructor(e){const n=Object.keys(e).length,o=H.from({vertex:ct,fragment:_a.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{m[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const Pa=`precision mediump float;
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
`;class $ extends Z{uniforms;constructor(e="white"){const n=H.from({vertex:ct,fragment:Pa,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const Fa=`precision mediump float;
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
`;class Aa extends Z{constructor(){const e=H.from({vertex:ct,fragment:Fa,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Jr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Yr=t=>Jr(zn[t.color.hue][t.color.shade].main),Zr=t=>new pe({lightBeige:m.lightGrey,redShadow:m.shadow,pink:m.lightGrey,moss:m.lightGrey,midRed:m.midGrey,highlightBeige:m.lightGrey,...t&&Yr(t)}),Da=new pe({midGrey:m.midRed,lightGrey:m.lightBeige,white:m.highlightBeige,metallicBlue:m.redShadow,pink:m.midRed,moss:m.midRed,replaceDark:m.midRed,replaceLight:m.lightBeige}),Ma=t=>new pe({replaceLight:t,replaceDark:xe(t)}),mn=(t,e,n)=>n?new pe(Jr(zn[t.color.hue][t.color.shade].edges[e])):new $(Ln(t.color).edges[e].original),ae=t=>new pe(Yr(t)),lo=new Aa,se=Jo,za=new pe(Ba),co={x:.5,y:1},uo=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),gn=t=>{if(typeof t=="string")return gn({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(uo(t)?c=La(t):c=new Re(re().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new g({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let b=1;b<=u.z;b++){const y=gn({...t,times:void 0,label:`(${h},${f},${b})`}),P=I({x:h-1,y:f-1,z:b-1});y.x+=P.x,y.y+=+P.y,d.addChild(y)}return d}if(e===void 0&&o===void 0)if(uo(t))c.anchor=co;else{const u=re().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=co}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=gn;function La({animationId:t,reverse:e,playOnce:n,paused:o}){const r=re().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:Yo}));e&&s.reverse();const a=new tt(s);return a.animationSpeed=Zo.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Ra=`#version 300 es

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
`;class ye extends Z{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=H.from({vertex:ct,fragment:Ra,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const te=new ye({outlineColor:m.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),We=new $,ho=new $,Rn=new $,fo=new $(m.moss),Je=new $,ee=[We,te],Ea=[Je,te],Ua=[te,Rn],vt={original:[te,Je],colourised:{head:{active:[te,new $(Me.head)],inactive:[te,new $(xe(Me.head))]},heels:{active:[te,new $(Me.heels)],inactive:[te,new $(xe(Me.heels))]}}},Ie=14,$a=2,Na=Math.cos(30*(Math.PI/180)),Ga=40;class Ha{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Ie,y:-14,filter:ee}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Ie,y:Ie,filter:ee}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Ie,filter:ee}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Ie*Math.SQRT2,filter:ee}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Ie*Math.SQRT2,filter:ee}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new W().circle(0,0,Ga).fill("#00000000"));for(const o of G(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?se:We}output=new g({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=O};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Ei(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=Ui({x:-c,y:-u}),h=$i(d,Na),f=M(h,$a);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=rt(e)>Ni?Cn(e):void 0;for(const[r,i]of Ko(this.arrowSprites))i.filters=r===o?Ea:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const bn={colourised:{jump:m.pastelBlue,fire:m.highlightBeige,carry:m.moss,carryAndJump:m.midRed,menu:m.lightGrey,map:m.lightGrey},zx:{jump:q.zxBlue,fire:q.zxYellow,carry:q.zxGreen,carryAndJump:q.zxRed,menu:q.zxWhite,map:q.zxWhite}};function At(t,e){const n=e||new g;for(const o of t)n.addChild(o);return n}function*Va(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=Gi(e);let o=0;for(const r of e){const i=`hud.char.${Vi(r)}`;try{Hi(i)}catch(s){throw new Error(`no texture id for char "${r}": ${s.message}`,{cause:s})}yield p({textureId:i,x:(o+.5-n/2)*Tt.w}),o++}}const ne=(t,e)=>{t.removeChildren();try{At(Va(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Xe=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new g({label:n,filters:e?Ua:Rn,scale:{x:1,y:t?2:1}}),Dt=Symbol(),Kr=Symbol(),Qr=Symbol(),yt=({colourise:t,button:{which:e}})=>{const n=new g({label:"depress"}),o=new g({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Ma(bn.colourised[e]):o.filters=new $(bn.zx[e]),n.addChild(r);const i=new g({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Kr]=r,o[Dt]=i,o[Qr]=n,o},Ge=(t,...e)=>{t[Dt].removeChildren();for(const n of e)n!==void 0&&t[Dt].addChild(n)},xt=(t,e)=>{t[Kr].texture=re().textures[e?"button.pressed":"button"],t[Qr].y=e?1:0},po=(t,e,n)=>{n&&(t[Dt].filters=e?Zr():se)},mo=({which:t},e,n)=>{const o=ne(new g,n);return o.filters=new pe({white:e?xe(bn.colourised[t]):m.pureBlack}),o};class ei{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new g({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const ti=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),ja=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},go=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>ja(t,e,n,o),En=(t,e,n=.001)=>{if(!Ce(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:Sn({state:{position:U(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+ji},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},ni=(t,e)=>{const o=[...ie(e).filter(i=>En(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=ea(s,i);return a<0||a===0&&go(t,s)>go(t,i)?s:i})},Ye=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Xi};function oi({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(qr(e)||Ye(e)||(e.state.action="death",e.state.expires=t+dn))}const le=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,nt=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Xa=3e3,ri=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0);const d=h=>{const f=Zi(o),b={type:"floatingText",id:`floatingText-${i}`,...er,fixedZIndex:999,aabb:O,state:{...Qo(),position:U(f,{z:_.h/2}),expires:c+Xa},config:{textLines:h,appearanceRoomTime:c}};it({room:r,item:b})};switch(s.gives){case"hooter":{const h=kt(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=kt(n);h!==void 0&&(h.doughnuts=le(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=Ke(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=kt(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=Ke(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=le(n.state.head.lives,2),n.state.heels.lives=le(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=le(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(Yi(s.page));break;case"reincarnation":{w.dispatch(Wi(Ji(e,w.getState()))),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(qi(s.planet)),d([s.planet,"liberated!"]);break}}},qa=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;tr(i,o)<=0||e.state.action!=="death"&&Pn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},Wa=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Lt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Ja({movingItem:t}){t.state.autoWalk=!1}const oe=(t,...e)=>J(...e)(t.touchedItem),He=(t,...e)=>J(...e)(t.movingItem),ii=t=>N(t.movingItem),Ya=t=>N(t.touchedItem),Za=t=>nr(t.touchedItem),bo=t=>{switch(!0){case oe(t,"stopAutowalk"):Ja(t);break;case Za(t):oi(t);break;case oe(t,"portal"):qa(t);break;case oe(t,"pickup"):ri(t);break;case oe(t,"doorFrame"):Wa(t);break}},Y={movementType:"steady"},Un=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Tn(e.items);if(r!==void 0)return Ye(r)?void 0:r;const i=n===void 0||Ye(n)||n.state.action==="death"?void 0:Hn(n.state.position,t),s=o===void 0||Ye(o)||o.state.action==="death"?void 0:Hn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},si=150,ai=t=>t[Math.floor(Math.random()*t.length)],ue=Object.freeze({movementType:"vel",vels:{walking:O}}),$t=t=>or(t)?he[t.config.which]:he[t.type],vo=_.w/2,Ka=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=he.homingBot;if(!Rt(e,ce))return{movementType:"steady"};for(const s of G(Tn(n.items))){if(s===void 0)continue;const a=st(s.state.position,t);if(Math.abs(a.y)<vo)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<vo)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Qa=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ue;const l=Un(r,e);if(l===void 0||s+si>e.roomTime)return Y;const c=st(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>_.w/4?u:at(u),h=$t(t),f={...O,[d]:c[d]>0?h:-h},b=Se(f),y=!Rt(b,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:b,...y?{timeOfLastDirectionChange:e.roomTime}:de}}},yo=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ue;const a=Un(i,e);if(a===void 0)return ue;const l=a.state.position,c=_.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ue;const d=st(a?.state.position,i),h=$t(t),f=(1+Math.sqrt(2))/2,b=h*f,y=M({...d,z:0},b/kn(d)*(r?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:Se(y)}}},Wt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ue;if(!(Te(i,O)||Math.random()<o/1e3))return Y;const l=ai(r);return{movementType:"vel",vels:{walking:M(ln[l],$t(t))},stateDelta:{facing:ln[l]}}},el=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ue:Rt(i,ce)?{movementType:"vel",vels:{walking:M(r,$t(t))}}:Y},tl=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=ai([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},Jt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<si))return;const c=Ut(i,l,e,n);if(c.x===0&&c.y===0)return;const u=tl(s,c,r);t.state.vels.walking=u,t.state.facing=Se(u),t.state.durationOfTouch=0},nl=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},ol=(t,e,n,o)=>{if(!t.state.activated||or(t)&&t.state.busyLickingDoughnutsOffFace)return ue;switch(t.config.movement){case"patrol-randomly-diagonal":return Wt(t,e,n,o,ts);case"patrol-randomly-xy8":return Wt(t,e,n,o,es);case"patrol-randomly-xy4":return Wt(t,e,n,o,Qi);case"towards-tripped-on-axis-xy4":return Ka(t,e);case"towards-on-shortest-axis-xy4":return Qa(t,e);case"back-forth":case"clockwise":return el(t);case"unmoving":return ue;case"towards-analogue":return yo(t,e);case"towards-analogue-unless-planet-crowns":return yo(t,e,n,o,Ki(w.getState()));default:throw t.config,new Error("this should be unreachable")}},rl=t=>{const{movingItem:e,touchedItem:n}=t;if(Ce(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Jt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Jt(t,"opposite");break;case"clockwise":Jt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":nl(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},il=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s],switchedAtRoomTime:n.roomTime,switchedSetting:s})}break}case"in-store":{w.dispatch(ns(o.path));break}}},sl=({movingItem:t,touchedItem:e})=>{if(!Ce(t))return;const{state:{position:n},aabb:o}=e,r=Ut(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=Se(r),s=M(i,-.05);return e.state.vels.sliding=s,!1},al=({movingItem:t,touchedItem:e})=>{if(!Ce(e))return;const n=t.state.vels.sliding;if(Te(n,O))return;const{state:{position:o},aabb:r}=t,i=Ut(e.state.position,e.aabb,o,r);return tr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},ll=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Ut(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Se(c);for(const d of s){const h=e.items[d],f=M(u,-.025*o);h.state.facing=f,Fn({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:i})}},ut=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:In(w.getState(),t),cl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&J("teleporter")(l)&&ut(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:dn}}}:Y;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Pn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:dn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},ul=1e3/12,wt=t=>{const e=t-ss,o=e/as*Yo;return(e+.5*cn*o**2)/o},dl={head:wt(ht.head),headOnSpring:wt(ht.head+_.h),heels:wt(ht.heels),heelsOnSpring:wt(ht.heels+_.h)},xo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return dl[`${n}${e?"OnSpring":""}`]},hl=t=>!(t===null||rs(t)&&ut(t)||is(t)&&t.config.gives==="scroll"||N(t)&&t.state.standingOnItemId===null),fl=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+ul>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),li=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Ee(o,e);if(fl(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:xo(t,!1)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&hl(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Y;const a=os(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:xo(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},pl=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=rt(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return M(n,l)},ml={movementType:"vel",vels:{walking:O}},ci=(t,e,n,o)=>{const r=gl(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=rt(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Te(r.vels.walking,O)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},gl=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:b}}}=t,y=o===t.id,P=y?n.currentActionPress("jump"):"released",A=y?n.directionVector:O,T=l===null&&b.z<0,k=i==="head"&&Wr(t.state)>0&&l!==null,F=i==="headOverHeels"?T?"head":"heels":k?"heels":i,z=a?c:A,V=he[F];if(u!==null||s==="death")return ml;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:On(f,M(f,ls*r))},stateDelta:{action:T?"falling":"jumping"}}:{movementType:"vel",vels:{walking:O},stateDelta:{action:"falling"}};if(P!=="released"){const dt=Se(Rt(z,ce)?c:z),Oi=J("spring")(Ee(l,e))?1:cs;return{movementType:"vel",vels:{walking:M({...dt,z:0},V*Oi)},stateDelta:{facing:dt}}}}if(rt(z)!==0)return T?{movementType:"vel",vels:{walking:M({...z,z:0},V)},stateDelta:{facing:z,action:"falling"}}:{movementType:"vel",vels:{walking:pl({vel:f,acc:us[F],deltaMS:r,maxSpeed:V,unitD:z,minSpeed:0})},stateDelta:{facing:z,action:"moving"}};if(d>0&&d<1){const dt=Te(h,c)?1:0;return{movementType:"position",posDelta:M(c,dt-d),stateDelta:{action:T?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:T?"falling":"idle"}}},wo=t=>ke(t.movingItem)&&En(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),ui=(t,e)=>{let n=O;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(ke(t)||J("lift")(t)))for(const[i,s]of Ko(o.vels)){const a={...O,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},Co=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&N(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&wo(t)){if(wo(t)&&ii(t)){rr({above:t.movingItem,below:t.touchedItem});const n=[li(t.movingItem,t.room,t.gameState,t.deltaMS),ci(t.movingItem,t.room,t.gameState,t.deltaMS)];ui(t.movingItem,n)}fr(t)}};function bl(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const $n=t=>{ii(t)&&bo(t),Ya(t)&&bo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),oe(t,...Vn)&&sl(t),He(t,...Vn)&&al(t),(He(t,"monster")&&oe(t,"firedDoughnut")||He(t,"firedDoughnut")&&oe(t,"monster"))&&bl(t),(He(t,"monster")||He(t,"movingPlatform"))&&rl(t),oe(t,"switch")&&il(t),oe(t,"joystick")&&ll(t,$n),t.touchedItem.state.disappear&&Co(t),t.movingItem.state.disappear&&Ce(t.touchedItem,t.movingItem)&&Co({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},vl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=fe(e.items).filter(ir),u=s===null?di(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;yl(e,i,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!hi(t,sr(e.items)))return;const f=ds({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Fn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:f.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:$n}),i.carrying=null,r.actionsHandled.add("carry")}},yl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,ar({room:t,item:n})},di=(t,e)=>ni(t,fe(e.items).filter(ir)),hi=(t,e)=>{const n={position:U(t.state.position,{z:_.h})},o=hs({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(Ce(r,t)){if(!ke(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!hi(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Yt=-11,xl={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter"&&ut(l),u=t.actions.every(h=>e.currentActionPress(h)!=="released"),d=r===null?yt({colourise:n,button:t}):r;if(o?.pressed!==u&&xt(d,u),c!==o?.standingOnTeleporter)if(c)Ge(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const h=mo(t,n,"JUMP");h.y=Yt,Ge(d,h)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const a=i&&Ke(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&di(i,s)!==void 0,d=t.actions.every(y=>e.currentActionPress(y)!=="released"),h=l&&!u&&c===null,f=r===null?yt({colourise:n,button:t}):r;if(f.visible=l,l&&(h!==o?.disabled&&po(f,h,n),f.visible=!0,o?.pressed!==d&&xt(f,d),l!==o?.hasBag||c!==o?.carrying)){let y;c!==null?y=ti(c):l&&(y=p({textureId:"bag",y:-2})),Ge(f,y)}return{output:f,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:h}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&kt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(h=>e.currentActionPress(h)!=="released"),u=r===null?yt({colourise:n,button:t}):r,d=a||nt(l)>0;if(u.visible=d,d&&(o?.pressed!==c&&xt(u,c),a!==o?.hasHooter||l!==o?.doughnuts)){let h;a?h=p({textureId:"hooter",y:-3}):nt(l)>0&&(h=p({textureId:"doughnuts",y:-2}));const f=ne(new g,l);f.y=Yt,f.filters=te,Ge(u,h,f),po(u,l===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const a=(i&&Ke(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||l!==o.pressed||n!==o.colourise||a!==o.hasBag))return"no-update";let u;if(r===null){u=yt({colourise:n,button:t});const d=mo(t,n,"C+J");d.y=Yt,Ge(u,d)}else u=r;return a?(u.visible=!0,o?.pressed!==l&&xt(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:de}},map({previousRendering:t}){if(t!==null)return"no-update";const e=Xe({label:"mapText",outline:!0});return ne(e,"MAP"),{output:e,renderProps:de}}};class Oe extends ei{constructor(e){const n=xl[e.button.which];super(e,n)}}const wl=30,Cl=15,Sl=42,Tl=36,kl=44,Il=20;class Ol{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new g({label:"mainButtonNest"}),buttons:{jump:new Oe({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new Oe({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new Oe({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new Oe({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new Oe({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new Oe({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new Ha({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of G(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=Cl,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=wl,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new g({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of G(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#r(e){this.#n.mainButtonNest.x=e.x-kl,this.#n.mainButtonNest.y=e.y-Il,this.#n.joystick.output.x=Sl,this.#n.joystick.output.y=e.y-Tl,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#r(n);for(const r of G(this.#n.buttons))r.tick({...e,currentPlayable:Ue(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Zo.frames.button.frame;const Bl=250,_l=t=>t?48:24,Pl=t=>t?68:56,Fl=(t,e)=>t?e.x/2-24:80,Al=t=>t?72:24,Dl=t=>t?88:0,So=112,Ve=t=>t==="heels"?1:-1;class Ml{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Vt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[fo],this.#t.fps.y=Tt.h,this.#r(),n&&(this.#n=new Ol({...e}),this.#e.addChild(this.#n.output))}#e=new g({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#s("head"),livesText:Xe({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#o({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#o({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#o({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#o({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#s("heels"),livesText:Xe({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#o({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#o({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#o({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new g({label:"heelsCarrying"})}},fps:Xe({label:"fps",outline:!0})};#r(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Vt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#o({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new g({label:i});s.pivot={x:4,y:16};const a=new Re({texture:re().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:ho,y:n?0:8});s.addChild(a);const l=Xe({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=Tt.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=te),{text:l,icon:a,container:s}}#s(e){const n=new Re(re().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#a({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ve("head")*So,this.#t.head.doughnuts.container.y=e.y-qe.h-8,this.#t.heels.carrying.container.y=e.y-qe.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ve("heels")*So,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Tt.w*2}#i(e,n){return e?n?se:Je:n?lo:We}#l(e){const{renderContext:{gameState:n}}=this,o=ft(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(ti(i)),a.filters=this.#i(!0,s),this.#t.heels.bag.icon.filters=this.#i(r,s)}#c(e){const{renderContext:{gameState:n}}=this,o=ft(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#i(r,s),this.#t.head.doughnuts.icon.filters=this.#i(i!==0,s),ne(this.#t.head.doughnuts.text,i)}#u(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ft(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=Ot(i),d=u>0||!o;a.visible=d,d&&(ne(s,u),a.y=n.y-Dl(o)),c.x=a.x=(n.x>>1)+Ve(e)*Fl(o,n);const h=i===void 0?0:e==="head"?Wr(i):i.bigJumps,f=h>0||!o;c.visible=f,f&&(ne(l,h),c.y=n.y-Al(o))}#d(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#d(r,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?se:Je:s.filters=a?lo:We,s.x=(n.x>>1)+Ve(e)*Pl(o),s.y=n.y-qe.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ft(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ve(e)*_l(o),a.y=n.y,ne(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Ln(n.color),{colourise:r,gameState:i}=this.renderContext;We.targetColor=o.hud.dimmed[r?"dimmed":"original"],Rn.targetColor=o.hud.dimmed[r?"basic":"original"],ho.targetColor=o.hud.icons[r?"basic":"original"],Je.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?vt.colourised.head[this.#d(i,"head")?"active":"inactive"]:vt.original,this.#t.heels.livesText.filters=r?vt.colourised.heels[this.#d(i,"heels")?"active":"inactive"]:vt.original}#h=Bn;#g(){if(fs(w.getState())){if(performance.now()>this.#h+Bl){const e=je.shared.FPS;ne(this.#t.fps,Math.round(e)),fo.targetColor=e>100?m.white:e>58?m.moss:e>55?m.pastelBlue:e>50?m.metallicBlue:e>40?m.pink:m.midRed,this.#h=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Vt)this.#p(n,e),this.#f(n,e),this.#u(n,e);this.#a(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const To={movementType:"vel",vels:{gravity:O}},zl=(t,e,n,o)=>{if(!Ce(t))return To;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=ps[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Ee(s,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-cn*o,-l)}}}:To}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-cn*o,-l)}}}},ko=_.h,Io=.001,Ll=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=jn**2/(2*$e);if(n==="up"){if(e<=o)return Math.max(Io,Math.sqrt(2*$e*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(Io,Math.sqrt(2*$e*r))}else return jn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*$e*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*$e*Math.max(e,0))):-.036},Rl=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*ko,i=e*ko,s=Ll({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Oo={movementType:"vel",vels:{movingFloor:O}},El=(t,e,n,o)=>{if(N(t)&&t.state.teleporting!==null)return Oo;const{state:{standingOnItemId:r}}=t,i=Ee(r,e);if(i===null||!J("conveyor")(i))return Oo;const{config:{direction:s}}=i,l=J("heels")(t)&&t.state.action==="moving"&&_n(t.state.facing)===ms(s)?he.heels:gs;return{movementType:"vel",vels:{movingFloor:M(ln[s],l)}}};function*Ul(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const $l=_.w*.8,Nl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Se(c);if(r.currentActionPress("fire")==="tap"&&a&&nt(s)>0){const d={type:"firedDoughnut",...er,config:de,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...Qo(),position:U(l,M(u,$l),t.type==="headOverHeels"?{z:_.h}:O),vels:{fired:M(u,he.firedDoughnut)},disappear:"onTouch"}};it({room:e,item:d}),i.doughnuts=le(i.doughnuts,-1),r.actionsHandled.add("fire")}},fi=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Gl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Ct=_.w*3,Hl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-Ct&&n.x<o.x+Ct&&n.y>o.y-Ct&&n.y<o.y+Ct},Bo=(t,e,n,o,r)=>{if(r&&t.state.activated)return Y;const i=Un(t.state.position,e);return i===void 0?Y:Hl(t,i)?fi:Gl},Vl=(t,e,n,o)=>t.state.activated?Y:lt(t.state.stoodOnBy,e).some(N)?fi:Y,jl=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Bo(t,e,n,o,!0);case"while-player-near":return Bo(t,e,n,o,!1);case"on-stand":return Vl(t,e);case"off":case"on":return Y;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Xl=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=bs(vs(`${r}-${s}`,{...l,position:O},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=On(a,M(h.aabb,.5)),it({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*ql(t,e,n,o){ke(t)&&(yield zl(t,e,n,o),yield El(t,e),yield*Ul(t,e)),N(t)?(yield ci(t,e,n,o),t.id===n.currentCharacterName&&(yield cl(t,e,n,o),yield li(t,e,n),ys(t)&&vl(t,e,n,o),xs(t)&&Nl(t,e,n))):ws(t)?yield Rl(t):Cs(t)?(yield jl(t,e,n,o),yield ol(t,e,n,o)):Ss(t)&&Xl(t,e)}const Wl=(t,e,n,o)=>{if(!ke(t)||t.state.standingOnItemId===null)return;const r=Ee(t.state.standingOnItemId,e);N(t)&&r.type==="pickup"&&ri({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||N(t)&&r.state.disappear==="onTouchByPlayer")&&fr({touchedItem:r,gameState:n,room:e})},Jl=(t,e,n,o)=>{if(N(t)&&t.state.standingOnItemId!==null){const s=Ee(t.state.standingOnItemId,e);(nr(s)||s.type==="spikes")&&oi({room:e,movingItem:t})}const r=[...ql(t,e,n,o)];Wl(t,e,n);let i=ui(t,r);(ke(t)||J("lift")(t)||J("firedDoughnut")(t))&&(i=U(i,...ie(G(t.state.vels)).map(s=>M(s,o)))),Fn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:o,onTouch:$n})},Yl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=le(e.state.head.lives,-1),e.state.heels.lives=le(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,le(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=nt(e.state.head.lives)>0,i=nt(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,ge(t,e);const u=Xn(e)[c],d=ze({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:qn(u)};return}if(t.entryState.headOverHeels!==void 0){ge(t,e);const c=ze({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Xn(e);if(ge(t,c),ge(t,u),Sn(c,u)){const d=lr({head:c,heels:u});ge(t,d,"heels");const h=ze({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:qn(d)};return}else{const d=ze({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},ze=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=ks({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??de});for(const i of e)it({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ta(r,t);return r},ge=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Zl=(t,e)=>{const n=cr(t,ur(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];ge(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=lr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});ge(t,a);const l=ze({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}it({room:o,item:e});return}else{const s=ze({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Kl=(t,e)=>{e.type==="headOverHeels"?Yl(t,e):Zl(t,e),Ue(t)===void 0&&w.dispatch(Ts({offerReincarnation:!0}))},Ql=t=>{for(const e of fe(t.items))for(const n of lt(e.state.stoodOnBy,t)){if(!t.items[n.id]){Wn(n,t);continue}if(!En(n,e)){Wn(n,t);const o=ni(n,sr(t.items));o!==void 0&&rr({above:n,below:o})}}},ec=2*na,tc=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ec,positionDelta:n})},nc=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...On(o.state.position,r),z:0};if(!Te(s,O))for(const a of lt(o.state.stoodOnBy,e))tc(a,e,s)}},oc=(t,e)=>{for(const n of fe(t.items))!ke(n)||t.roomTime===n.state.actedOnAt.roomTime||Is(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Os(n.state.position),e.add(n))},rc=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ic=t=>{for(const e of fe(t.items)){const n=e.state.position;e.state.position=Bs(n)}},sc=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},ac=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Ue(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=cr(t,ur(o.type));i!==void 0&&(i.state.gameTime+=n)}}},lc=(t,e)=>{const n=ve(t);if(n===void 0)return dr;ac(t,n,e);const o=Object.fromEntries(_s(n.items).map(([s,a])=>[s,a.state.position]));for(const s of G(n.items))rc(s,n)&&(ar({room:n,item:s}),N(s)&&Kl(t,s));const r=Object.values(n.items).sort(sc);for(const s of r){const a=Ue(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Jl(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item ${s.id}: ${l}`)}}Ql(n),ic(n);const i=new Set(ie(G(n.items)).filter(s=>o[s.id]===void 0||!Te(s.state.position,o[s.id])));return nc(i,n,o),oc(n,i),i},_o=(t,e)=>{const n=S(t),o=S(U(t,{x:e.x,z:e.z})),r=S(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Zt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,cc=(t,e,n,o)=>{const r=_o(t,e),i=_o(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Zt(s,a,l,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=i.topRight.y-i.topRight.x/2,b=i.bottomCentre.y-i.bottomCentre.x/2,y=Zt(d,h,f,b),P=r.topLeft.y+r.topLeft.x/2,A=r.bottomCentre.y+r.bottomCentre.x/2,T=i.topLeft.y+i.topLeft.x/2,k=i.bottomCentre.y+i.bottomCentre.x/2,F=Zt(P,A,T,k);return u&&y&&F},uc=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!cc(n,o,r,i))return 0;for(const s of Ps){const a=t.state.position[s],l=a+o[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Po(e)-Po(t)},Po=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Bt extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const dc=t=>{const e=hc(t);let n=e.length,o=n;const r=new Array(n),i={},s=fc(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new Bt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,s.get(f),u)}catch(b){throw b instanceof Bt?b.hasClosedCycle?b:new Bt([l,...b.cyclicDependency],b.cyclicDependency.includes(l)):b}}while(c);u.delete(l)}r[--n]=l}};function hc(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function fc(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Fo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},St=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},pc=(t,e=new Set(G(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||St(n,r,s);for(const r of e)if(r.renders)for(const i of G(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=uc(r,i);if(Fo(o,r,i),s===0){St(n,r.id,i.id),St(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;Fo(n,a,l),St(n,l,a)}return n},pi=(t,e,n=3)=>{try{return{order:dc(t),impossible:!1}}catch(o){if(o instanceof Bt){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:pi(t,e,n-1).order,impossible:!0}}else throw o}};class mc extends ei{}const Ao=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Do=(t,e)=>{const n=new W;return Ao(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Ao(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},gc={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class bc{constructor(e){this.renderContext=e;const{item:n}=e,o=gc[n.type]??"rgba(255,255,255)";if(this.#e=new g({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new W().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new W().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new W({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Do(n.aabb,o)),n.renderAabb&&this.#e.addChild(Do(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new Oa({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class vc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new g({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const yc=(t,e)=>{const n=e.getLocalBounds(),o=Mn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new Re({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Mo=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof Re?r:yc(t,r)};class xc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=w.getState();n||(this.#e.filters=new Ta({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,a=Mo(r,i,s);o.shadowMask.relativeTo==="top"&&(a.y-=o.aabb.z),s&&(a.y-=((s.z??1)-1)*_.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new g({label:"ItemShadowRenderer"});#n=new g({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),a=o.state.position.z+o.aabb.z,l=fe(i.items).filter(function(h){return h.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:a}},aabb:{...o.aabb,z:Fs}},u=Object.groupBy(l,d=>{const h=this.#t[d.id]!==void 0,f=e.has(d);return!s&&!f?h?"keepUnchanged":"noShadow":Sn(c,d)?h?"update":"create":"noShadow"});for(const d of oo(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:h}=d.config,f=Mo(r,d.shadowCastTexture,h);f.label=d.id,this.#n.addChild(f),this.#t[d.id]={sprite:f,renderedOnProgression:n}}for(const d of oo(u.create,u.update)){const{sprite:h}=this.#t[d.id],f=S({...st(d.state.position,o.state.position),z:o.aabb.z});h.x=f.x,h.y=f.y}for(const[d,{sprite:h,renderedOnProgression:f}]of Ft(this.#t))f!==n&&(h.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const wc=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,Cc=(t,e,n)=>{const r=re().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&re().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},Be=t=>L(({renderContext:{item:e}})=>As(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),L=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:de}:"no-update";function*Sc({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Lt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...It(a,{y:-12*n})});l.filters=mn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...It(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...It(a,{y:-l*_.h})})}}yield*s(I({...ce,[r]:1})),yield*s(ce),e||(yield p({pivot:{x:16,y:_.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...I({...ce,[r]:1})}))}const mi=(t,e)=>{const n=Lt(t),o=at(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):ce},Tc=L(({renderContext:{item:t,room:e}})=>At(Sc(t,e),new g({filters:ae(e),...mi(t.config.direction,t.aabb)}))),kc=L(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Lt(t),a=i.rooms[n];return p({textureId:Cc(r,s,e),filter:ae(a),...mi(t,o)})}),Kt={animationId:"bubbles.cold"},Le=({top:t,bottom:e="homingBot",filter:n})=>{const o=new g({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},gi=Symbol(),bi=Symbol(),Ic=({top:t,bottom:e})=>{const n=new g;return n.addChild(e),t.y=-12,n.addChild(t),n[gi]=t,n[bi]=e,n},Oc=`#version 300 es

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
`;class Mt extends Z{constructor(e){const n=H.from({vertex:ct,fragment:Oc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const vn=.02,Bc=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(o==="out")return{animationId:`${t}.fadeOut`,paused:i};if(o==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:r<vn?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`,paused:i};if(e==="falling"){const a=`${t}.falling.${n}`;if(Ls(a))return{textureId:a}}const s=`${t}.idle.${n}`;return Rs(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},yn=Symbol(),xn=Symbol(),_c=(t,e)=>{t[yn].removeChildren(),t[yn].addChild(p(Bc(e)))},Qt=(t,e,n)=>{const o=new g,r=new g;o[yn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new pe({pastelBlue:m.pink}):se,flipX:t==="heels"});return o[xn]=i,o},zo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Ms>t,Pc=t=>{if(!Ye(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Jn<Jn*zs},Lo=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Ro=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?se:t.filters},Fc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Lo(r,new ye({outlineColor:Me[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Ro(r,ye);const s=o?.flashing??!1;n&&!s?Lo(r,new Mt(Me[t])):!n&&s&&Ro(r,Mt)},Ac=(t,e,n)=>{e&&!n?t.addChild(t[xn]):!e&&n&&t.removeChild(t[xn])},en=(t,e,n,o,r,i)=>{n&&_c(e,{name:t,...o,paused:r}),Fc(t,o,i,e),Ac(e,o.shining,i?.shining??!1)},tn=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:a,teleporting:l,vels:{gravity:{z:c}}}}=e,u=Cn(a)??"towards",d=e.type==="headOverHeels"?zo(e.state.head,"headOverHeels","headOverHeels"):zo(e.state,e.type,n.currentCharacterName),h=Pc(e),f=qr(e),b=rt(a),y=l?.phase??null,P={action:s,facingXy8:u,teleportingPhase:y,flashing:h,highlighted:d,shining:f,gravityZ:c},A=t===void 0||t.action!==s||t.facingXy8!==u||t.teleportingPhase!==y||t?.gravityZ>vn!=c>vn;let T;if(i==="headOverHeels"){T=r??Ic({top:Qt("head",!0,o),bottom:Qt("heels",!0,o)});const k=T;en("head",k[gi],A,P,o,t),en("heels",k[bi],A,P,o,t)}else T=r??Qt(i,!1,o),en(i,T,A,P,o,t);return s==="moving"&&r instanceof tt&&(r.animationSpeed=b*Ds),{output:T,renderProps:P}},Dc=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new g({label:"floorOverdraws",...I({x:-e.x,y:-e.y})}),r=At(ie(Ft(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...I(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new g({label:"floorOverdraws"})),i=At(ie(Ft(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...I(It(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...I({...l,z:0}),times:{[at(Qe(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new g({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},Mc=t=>[...ie(G(t.items)).filter(e=>e.type==="wall").filter(e=>Qe(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],zc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Lc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new W().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(I),!0).fill(0),Rc=L(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Et(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:h},roomJson:f}=t,b=new g({label:`floor(${t.id})`});if(d!=="none"){const T=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,k=new g;for(let z=-1;z<=r+2;z++)for(let V=z%2-1;V<=i+2;V+=2)k.addChild(Es({x:z+(s.right?-.5:0),y:V+(s.towards?-.5:0)},p({textureId:T})));k.addChild(Dc(f,{x:n,y:o}));const F=new W().poly([ce,I({x:c,y:0}),I({x:c,y:u}),I({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});k.addChild(F),k.filters=ae(t),k.mask=F,b.addChild(k)}const y=Mc(f),P=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);b.addChild(P);const A=zc(y);if(A!==void 0){const T=Lc({extraWallRanges:A,blockXMin:n,blockYMin:o});b.addChild(T)}return b.mask=P,b.y=-e.aabb.z,b.cacheAsTexture(!0),b}),Ec=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=I({x:-t,y:-e}),i={towards:new g({label:"towards",...r}),right:new g({label:"right",...r})};return ie(Ft(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:s,textureId:`floorEdge.${l}`,...I(h),times:a.type==="wall"?a.config.times:{[at(Qe(l))]:2}});i[l].addChild(f),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...I(U(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...I(U(h,{x:-.5}))}))}),i},Uc=L(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Et(e.roomJson),l=r-n,c=i-o,u=new g({label:"floorEdge"}),d=new W({label:"overDrawToHideFallenItems"}).poly([I({x:l,y:0}),I({x:0,y:0}),I({x:0,y:c}),{...I({x:0,y:c}),y:999},{...I({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=Ec({blockXMin:n,blockYMin:o},e.roomJson);h.filters=mn(e,"towards",t),f.filters=mn(e,"right",t),u.addChild(h),u.addChild(f);const b=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(b),u.mask=b,u.cacheAsTexture(!0),u}),$c=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Nc=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,a=s?Da:i?void 0:$c.includes(t.which)?Zr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const l=_n(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||l!==r.facingXy4))return"no-update";const u={facingXy4:l,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${l}`,filter:a}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${l}`,filter:a}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${l}`,filter:a,paused:o}:{textureId:`${t.which}.${l}.1`,filter:a}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Le({top:{textureId:`${t.which}.${l}`,filter:a||ae(n)},bottom:{...Kt,paused:o}}):p({textureId:`${t.which}.${l}`,filter:a}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Le({top:`${t.which}.${l}`,filter:a}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:a,paused:o}:{textureId:`${t.which}.1`,filter:a}),renderProps:c};case"homingBot":return{filter:a,output:p({textureId:t.which,filter:a}),renderProps:c};case"bubbleRobot":return{output:Le({top:{...Kt,paused:o},filter:a}),renderProps:c};case"emperorsGuardian":return{output:Le({top:"ball",bottom:{...Kt,paused:o},filter:a}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:a,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},ot=t=>{for(const e in t)return!0;return!1},Gc=he.floatingText,Hc=12,Eo=_.h*3,Uo=[m.shadow,m.midGrey,m.redShadow,m.metallicBlue,m.midRed,m.moss,m.pink,m.lightBeige,m.pastelBlue,m.lightGrey,m.highlightBeige],$o=[...Uo,...new Array(20).fill(m.white),...Uo.toReversed()],Vc=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},displaySettings:{uncolourised:o}},previousRendering:r})=>{let i;const a=(n-e)*Gc;if(r===null){i=new g({filters:new ye({outlineColor:m.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let l=0;l<t.length;l++){const c=t[l],u=ne(new g({label:c,y:l*Hc,filters:o?se:new $(m.pink)}),c.toUpperCase());i.addChild(u)}}else i=r;for(let l=0;l<t.length;l++){const c=i.children[l],[u]=c.filters,d=a+l*-12,h=d>0&&d<Eo;if(c.visible=h,h&&u){const f=Math.floor(d/Eo*$o.length);u.targetColor=$o[f]}}return i.y=-a,{output:i,renderProps:de}},jc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,nn=m.moss,Xc=()=>L(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),qc={head:tn,heels:tn,headOverHeels:tn,doorFrame:kc,doorLegs:Tc,monster:Nc,floatingText:Vc,stopAutowalk(){throw new Error("these should always be non-rendering")},emitter(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:L(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=at(Qe(e)),i=new g({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:wc(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ae.w,y:Ae.h+1}:{x:0,y:Ae.h+1},filter:ae(o)}),l=I({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:L(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:L(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ae(n):void 0,times:e})),spikes:Be("spikes"),slidingDeadly({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},paused:n},currentlyRenderedProps:o,tickContext:{deltaMS:r},previousRendering:i}){const s=(o?.distanceTravelled??0)+kn(t)*(n?0:r),a=i||p("spikyBall.1"),c=(Math.floor(s*2/Ae.w)+e)%2+1;return a.texture=re().textures[`spikyBall.${c}`],{output:a,renderProps:{distanceTravelled:s}}},slidingBlock:Xc(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:jc(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ae(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?In(w.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=ot(n);if(!(r===void 0||r.moving!==i))return"no-update";const a=new g,l=Qe(t);return a.addChild(p(i?{animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${l}.6`,times:e})),{output:a,renderProps:{moving:i}}},lift:L(({renderContext:{paused:t}})=>{const e=new g,n={x:qe.w/2,y:qe.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=ut(t),a=s&&lt(r,e).find(N)!==void 0;return o===void 0||s!==o.activated||a!==o.flashing?{output:a?new g({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:a,activated:s}}:"no-update"},sceneryCrown:L(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:L(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ae(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Be("fish.1"),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=_n(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Le({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:Be("joystick"),movingPlatform:L(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:L(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new ye({outlineColor:nn,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=ot(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const a=o?.compressed??!1,l=e?new ye({outlineColor:nn,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===a&&e!==o?.highlighted;let u;return c?(r.filters=l??Jo,u=r):u=p(!i&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:l}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new ye({outlineColor:nn,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Le({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Be("hushPuppy"),bubbles:L(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Be({animationId:"bubbles.doughnut"}),ball:Be("ball"),floor:Rc,floorEdge:Uc};class Wc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const R=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=x.createBufferSource(),c=un()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},_e=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},E=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=R({...t}),_e(l,t.gain,s),n!==void 0&&(r?(l=R({...n,loop:!0}),_e(l,n.gain,s)):l.onended=()=>{c&&(l=R({...n,loop:!0}),_e(l,n.gain,s))})):n!==void 0&&(l=R({...n,loop:!0}),_e(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=R({...o}),_e(l,o.gain,s)));else if(c!==u&&e!==void 0){const h=R({...e});_e(h,e.gain,s)}a=!1,c=u}};class Jc{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=E({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Yc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&R({soundId:"bonus",connectTo:this.output});break}case"disappearing":{R({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,R({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class Nn{constructor(e,n,o=1){this.renderContext=e,this.#e=E({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,i=o>(e??Bn)&&!ua(hr(r));this.#e(i)}destroy(){}}class Zc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new Nn(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=E({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,a=o===i&&ie(hr(s)).some(l=>Us(r[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const on=2;class Kc{constructor(e){this.renderContext=e}output=x.createGain();#e=E({start:{soundId:"conveyorStart",playbackRate:on},loop:{soundId:"conveyorLoop",playbackRate:on},stop:{soundId:"conveyorEnd",playbackRate:on}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=ot(e);this.#e(n)}destroy(){this.#e(!1)}}const Qc=3;class eu{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=R({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Qc*e)}destroy(){}}const No={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Go={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Ho={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Vo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class tu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;No[n]!==void 0&&(this.#o=new Nn(e,No[n]),this.#o.output.connect(this.output)),Go[n]!==void 0&&(this.#t=E({change:Go[n]},this.#e)),Vo[n]!==void 0&&(this.#s=E(Vo[n],this.#e)),Ho[n]!==void 0&&(this.#r=E({loop:Ho[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#r;#o;#s;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const a=Cn(o);this.#t(a)}if(this.#o&&this.#o.tick(e),this.#r){const a=r&&!i;this.#r(a)}if(this.#s){const a=!Te(s,O);this.#s(a)}}destroy(){}}class rn{constructor(e){this.renderContext=e;const{soundSettings:n,item:{type:o}}=e,{noFootsteps:r}={...et.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=E({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#i.gain.value=1.2,this.#i.connect(this.output),this.#s.connect(this.output),this.#r=E({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#o=E({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#r;#o;#s=x.createGain();#a=E({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#s);#i=x.createGain();#l=E({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#i);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:i,jumped:s,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=Ke(n),{teleportingPhase:f,positionZ:b}=this.#c,y=r?r.phase:null,P=s&&l>i&&l>b&&c>0,A=l<b&&c<0&&a===null;this.#o(A),this.#r(P),this.#n!==void 0&&this.#n(!P&&!A&&o==="moving"),h!==void 0&&this.#l(h.carrying!==null);const T=a!==null&&u>(e??Bn)&&d[a];if(this.#a(T),y!==null&&y!==f)if(y==="in"){const k=un().teleportIn,F=x.createBufferSource();F.buffer=k,F.connect(this.output),F.start()}else{const k=un().teleportOut,F=x.createBufferSource();F.buffer=k,F.connect(this.output),F.start()}this.#c={teleportingPhase:y,positionZ:l}}destroy(){}}class nu{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=ot(e);!o&&r&&R({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class ou{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=E({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class ru{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=ot(e);n&&!o&&R({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class iu{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?In(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&R({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class su{constructor(e){this.renderContext=e}output=x.createGain();#e=E({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(ut(e)&&lt(e.state.stoodOnBy,n).some(N))}destroy(){}}class au{constructor(e){this.renderContext=e,R({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class lu extends Nn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const cu={lift:eu,switch:iu,bubbles:Yc,head:rn,heels:rn,headOverHeels:rn,teleporter:su,monster:tu,conveyor:Kc,spring:ru,portableBlock:nu,charles:Zc,ball:Jc,pushableBlock:ou,firedDoughnut:au,slidingBlock:lu},uu=t=>{const e=cu[t.item.type];if(e)return new e(t)},du=_.h*$s,hu=_.h*-1,fu=_.w*16,pu=0,sn=(t,e,n)=>(t-e)/(n-e)*2-1;class mu{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=jt(Yn({x:0,y:o})),this.positionMaxX=jt(Yn({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=U(o.position,M(n.aabb,.5)),i=sn(jt(r),this.positionMaxX,this.positionMinX),s=sn(r.z,hu,du),a=sn(r.x+r.y,pu,fu);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const gu=[new Mt(m.midRed)],bu=[new Mt(m.moss)],vu=75;class yu{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new g;tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<vu?o==="left"?bu:gu:se,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const xu=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},wu=t=>t.item.shadowMask!==void 0,Cu=t=>{const e=w.getState(),n=Ns(e),o=!Gs(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const h=qc[r.type],f=new yu(t,new mc(t,h));a.push(f),s&&(f.output.alpha=.66),o&&wu(t)&&a.push(new xc(t))}s&&a.push(new bc(t));let l;if(a.length===0)l=void 0;else{const h=a.length===1?a[0]:new Su(a,t);xu(r,h.output,i),l=new vc(t,h)}const c=t.soundSettings.mute??et.soundSettings.mute,u=t.paused||c?void 0:uu(t),d=u===void 0?void 0:new mu(t,u);return new Wc(t,{graphics:l,sound:d})};class Su{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new g({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Pe=.33,Tu=Hs()==="mobile"?-4:16,wn=Ae.h-Ae.w/2,ku=he.heels,Iu=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Et(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-Tu-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,f=u.y+s-wn<0;return(b,y,P)=>{if(b===void 0)return;const A=S(b.state.position),T=U(A,u),k={x:d&&T.x<n.x*Pe?Math.min(-a,n.x*Pe-A.x):h&&T.x>n.x*(1-Pe)?Math.max(n.x-l,n.x*(1-Pe)-A.x):u.x,y:f&&T.y<n.y*Pe?n.y*Pe-A.y:u.y};if(P)e.x=k.x,e.y=k.y;else{const F=ku*y,z=st(e,k),V=kn(z);if(V>F){const Ht={x:z.x/V,y:z.y/V};e.x-=Ht.x*F,e.y-=Ht.y*F}else e.x=k.x,e.y=k.y}}},Ou=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Et(t);return new W().rect(e+o.x,r-wn,n-e,o.y-r+wn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class Bu{constructor(e){this.renderContext=e;const{displaySettings:n,upscale:o}=e;this.initFilters(e.colourised,e.room.color);const i=e.soundSettings.mute??et.soundSettings.mute?void 0:x.createGain();this.output={sound:i,graphics:new g({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})},(n?.showBoundingBoxes??et.displaySettings.showBoundingBoxes)!=="none"&&this.output.graphics.addChild(Ou(e.room.roomJson)),this.#s=Iu(e.room,this.output.graphics,o.gameEngineScreenSize)}#e=new g({label:"items"});#n=new g({label:"floorEdge"});output;#t=void 0;#r=new Map;#o=new Map;#s;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?za:se:new $(Ln(n).main.original)}#a(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of fe(n.items)){let i=this.#o.get(r.id);if(i===void 0){i=Cu({...this.renderContext,item:r}),this.#o.set(r.id,i);const s=r.type==="floorEdge"?this.#n:this.#e,{graphics:a,sound:l}=i.output;if(a&&(s.addChild(a),r.fixedZIndex&&(a.zIndex=r.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{i.tick(o)}catch(s){throw new Error(`room had an error while ticking item ${r.id}: ${s.message}`,{cause:s})}}for(const[r,i]of this.#o.entries())n.items[r]===void 0&&(i.destroy(),this.#o.delete(r))}#i(e){const{order:n}=pi(pc(this.renderContext.room.items,e.movedItems,this.#r),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#o.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}get#l(){return this.#t!==void 0}tick(e){const n=this.#l?e:{...e,movedItems:new Set(fe(this.renderContext.room.items))};this.#s(Ue(this.renderContext.gameState),e.deltaMS,!this.#l),this.#a(n),(!this.#l||n.movedItems.size>0)&&this.#i(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#o.forEach(e=>{e.destroy()})}}var Nt=`in vec2 aPosition;
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
`,Gt=`struct GlobalFilterUniforms {
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
}`,_u=`precision highp float;
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
`,Pu=`struct CRTUniforms {
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
}`,Fu=Object.defineProperty,Au=(t,e,n)=>e in t?Fu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,_t=(t,e,n)=>(Au(t,typeof e!="symbol"?e+"":e,n),n);const vi=class yi extends Z{constructor(e){e={...yi.DEFAULT_OPTIONS,...e};const n=we.from({vertex:{source:Gt,entryPoint:"mainVertex"},fragment:{source:Pu,entryPoint:"mainFragment"}}),o=H.from({vertex:Nt,fragment:_u,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),_t(this,"uniforms"),_t(this,"seed"),_t(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};_t(vi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Du=vi;var Mu=`
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
}`,zu=`struct KawaseBlurUniforms {
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
}`,Lu=`
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
`,Ru=`struct KawaseBlurUniforms {
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
}`,Eu=Object.defineProperty,Uu=(t,e,n)=>e in t?Eu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,me=(t,e,n)=>(Uu(t,typeof e!="symbol"?e+"":e,n),n);const xi=class wi extends Z{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ze("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...wi.DEFAULT_OPTIONS,...n};const o=we.from({vertex:{source:Gt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Ru:zu,entryPoint:"mainFragment"}}),r=H.from({vertex:Nt,fragment:n?.clamp?Lu:Mu,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),me(this,"uniforms"),me(this,"_pixelSize",{x:0,y:0}),me(this,"_clamp"),me(this,"_kernels",[]),me(this,"_blur"),me(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=De.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),De.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};me(xi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let $u=xi;var Nu=`in vec2 vTextureCoord;
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
`,Gu=`struct AdvancedBloomUniforms {
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
`,Hu=`
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
`,Vu=`struct ExtractBrightnessUniforms {
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
`,ju=Object.defineProperty,Xu=(t,e,n)=>e in t?ju(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ci=(t,e,n)=>(Xu(t,typeof e!="symbol"?e+"":e,n),n);const Si=class Ti extends Z{constructor(e){e={...Ti.DEFAULT_OPTIONS,...e};const n=we.from({vertex:{source:Gt,entryPoint:"mainVertex"},fragment:{source:Vu,entryPoint:"mainFragment"}}),o=H.from({vertex:Nt,fragment:Hu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Ci(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Ci(Si,"DEFAULT_OPTIONS",{threshold:.5});let qu=Si;var Wu=Object.defineProperty,Ju=(t,e,n)=>e in t?Wu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Fe=(t,e,n)=>(Ju(t,typeof e!="symbol"?e+"":e,n),n);const ki=class Ii extends Z{constructor(e){e={...Ii.DEFAULT_OPTIONS,...e};const n=we.from({vertex:{source:Gt,entryPoint:"mainVertex"},fragment:{source:Gu,entryPoint:"mainFragment"}}),o=H.from({vertex:Nt,fragment:Nu,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:be.WHITE}}),Fe(this,"uniforms"),Fe(this,"bloomScale",1),Fe(this,"brightness",1),Fe(this,"_extractFilter"),Fe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new qu({threshold:e.threshold}),this._blurFilter=new $u({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=De.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=De.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),De.returnTexture(s),De.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Fe(ki,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Yu=ki;const Zu=de,Ku=(t,e)=>(n,o)=>{const r=new Set;if(Vs(n)){const u=ve(n)?.items;if(u!==void 0){const d=ie(G(Tn(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const s=o*n.gameSpeed,a=Math.ceil(s/e),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)r.add(h)}const c=ve(n)?.items??Zu;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},jo=({crtFilter:t},e)=>[t?new Du({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Yu({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Qu{constructor(e,n){this.app=e,this.#a=e,this.#i=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#s.connect(x.destination),e.stage.addChild(this.#o),e.stage.scale=r,ve(n)===void 0)throw new Error("main loop with no starting room");this.#u()}catch(o){this.#c(o);return}}#e;#n;#t;#r;#o=new g({label:"MainLoop/world"});#s=x.createGain();#a;#i;#l=Ku(lc,Ys);#c(e){w.dispatch(js(Xs(e)))}#u(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=jo(e,!0),this.#n=jo(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#c(n)}};tick=({deltaMS:e})=>{const n=w.getState(),o=qs(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=w.getState(),a=!o&&!(r?.uncolourised??et.displaySettings.uncolourised),l=Ws(n),c=Js(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Ml({colourise:a,gameState:this.#i,inputDirectionMode:c,onScreenControls:l}),this.#a.stage.addChild(this.#t.output));const u=ve(this.#i);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=o?dr:this.#l(this.#i,e),h=ve(this.#i);(this.#r?.renderContext.room!==h||this.#r?.renderContext.upscale!==s||this.#r?.renderContext.displaySettings!==r||this.#r?.renderContext.soundSettings!==i||this.#r?.renderContext.paused!==o)&&(this.#r?.destroy(),h?(this.#r=new Bu({gameState:this.#i,room:h,paused:o,pixiRenderer:this.#a.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s}),this.#o.addChild(this.#r.output.graphics),this.#r.output.sound?.connect(this.#s),this.#i.events.emit("roomChange",h.id)):this.#r=void 0,this.#a.stage.scale=s.gameEngineUpscale,this.#u()),this.#r?.tick({progression:this.#i.progression,movedItems:d,deltaMS:e}),o?this.#a.stage.filters=this.#e:this.#a.stage.filters=this.#n};start(){return this.#a.ticker.add(this.tickAndCatch),this}stop(){this.#a.stage.removeChild(this.#o),this.#s.disconnect(),this.#r?.destroy(),this.#t?.destroy(),this.#a.ticker.remove(this.tickAndCatch)}}zt.add(gr,br,vr,yr,xr,wr,Cr,Sr,Tr,kr,Ir,Br,Or,_r,Pr,Fr,Ar,Dr,Mr,zr,Lr);Qs.defaultOptions.scaleMode="nearest";const Xo=async(t,e)=>{const n=new Vr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=Zs;const o=w.getState().gameMenus.currentGame,r=Zn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(Ks(o.store.gameMenus)):(w.dispatch(Kn(r.characterRooms.head.id)),w.dispatch(Kn(r.characterRooms.heels.id)));const i=new Qu(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Ue(r);a!==void 0&&Pn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return ve(r)},get gameState(){return r},reincarnateFrom(s){Zn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},id=Object.freeze(Object.defineProperty({__proto__:null,default:Xo,gameMain:Xo},Symbol.toStringTag,{value:"Module"}));export{$r as A,Rr as C,Z as F,Mn as R,ga as S,Nr as V,wa as a,id as g,ma as u};
