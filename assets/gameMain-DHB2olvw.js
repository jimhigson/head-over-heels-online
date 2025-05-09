const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-Dc2b5OTh.js","assets/App-CPamZ9Ob.js","assets/index-1vgS4kYF.js","assets/index-C1vITvDU.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CtJfZ-WE.js","assets/Graphics-CJhbtG8H.js","assets/changeCharacterRoom-DdcZBUEW.js","assets/WebGLRenderer-C-xFFVYo.js"])))=>i.map(i=>d[i]);
import{b3 as Ui,b4 as sr,b5 as Ni,am as Hi,aq as Ce,ar as G,ae as ar,an as xe,Z as T,a2 as Et,a0 as Gi,a3 as b,d as nt,v as Rt,aG as y,a6 as pn,ay as fe,_ as Ze,$ as Vi,V as Xi,b6 as ji,b7 as qi,b8 as Wi,ad as Ji,b9 as q,ba as Zn,K as A,bb as Zi,bc as le,bd as B,be as lr,s as $t,M as w,o as H,c as _,bf as Yi,bg as Ki,bh as Qi,g as D,w as lt,bi as es,bj as Bn,bk as cr,bl as ts,bm as ns,bn as os,bo as Ot,H as ne,bp as _n,bq as I,br as de,bs as Ut,R as ct,bt as Pt,bu as rs,bv as is,bw as ss,bx as Yn,by as as,bz as ls,bA as cs,i as ce,bB as Mt,S as Ee,bC as Nt,bD as us,l as $,bE as Ht,bF as pe,bG as ut,bH as An,j as J,bI as $e,bJ as U,bK as Fn,bL as Le,bM as Ke,bN as Rn,t as Te,p as Mn,bO as ds,bP as hs,bQ as fs,bR as ps,bS as ms,I as ot,bT as Bt,e as gs,bU as Ue,bV as ur,bW as bs,bX as dr,k as hr,bY as fr,bZ as Dn,b_ as Kn,b$ as pr,c0 as vs,c1 as dt,c2 as Ne,c3 as Gt,x as ke,c4 as mn,c5 as ys,c6 as xs,c7 as ws,c8 as Ss,A as He,c9 as Cs,ca as Ts,cb as ks,cc as gn,cd as Is,ce as Os,cf as mt,f as zn,cg as Ps,ch as Bs,ci as _s,m as Ie,C as mr,cj as Qn,h as me,ck as Ln,r as gr,a as br,n as As,a$ as Ge,cl as Yt,cm as gt,cn as Fs,co as Rs,cp as Xe,cq as eo,cr as Ms,cs as Ds,ct as zs,cu as Ls,cv as Es,cw as $s,cx as Us,cy as Ns,cz as Hs,cA as Gs,cB as to,L as no,cC as vr,b2 as yr,E as xr,F as Vs,B as oo,cD as Xs,cE as js,cF as qs,a_ as we,cG as Ws,cH as Js,cI as Zs,cJ as x,cK as bn,cL as wr,q as Ys,cM as rt,cN as Kt,J as ro,cO as Ks,cP as Qs,cQ as ea,cR as ta,aw as Re,cS as na,cT as oa,cU as ra,cV as ia,cW as sa,cX as aa,cY as la,cZ as ca,c_ as io,c$ as ua,N as so,d0 as da}from"./App-CPamZ9Ob.js";import{f as vn,c as En,a as ha,m as Vt,b as $n,d as Sr,r as fa,o as pa}from"./changeCharacterRoom-DdcZBUEW.js";import{S as ma,G as W}from"./Graphics-CJhbtG8H.js";import{g as Cr,_ as ao}from"./index-1vgS4kYF.js";var bt={},lo;function ga(){if(lo)return bt;lo=1;var t=Ui(),e=t.mark(i),n=sr(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return h=d[u],v.delegateYield(r(h),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}bt.__concat=i;var s=o(i);return bt.concat=s,bt}var vt={},co;function ba(){if(co)return vt;co=1;var t=sr(),e=t.iterableCurry,n=Ni(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}vt.__isEmpty=i;var s=e(i,{reduces:!0});return vt.isEmpty=s,vt}var Qt,uo;function va(){return uo||(uo=1,Qt=ga().concat),Qt}var ya=va();const ho=Cr(ya);var en,fo;function xa(){return fo||(fo=1,en=ba().isEmpty),en}var wa=xa();const Sa=Cr(wa),Tr=class yn extends Hi{constructor(e){e={...yn.defaultOptions,...e},super(e),this.enabled=!0,this._state=ma.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=Ce.from(n)),o&&(s=G.from(o)),new yn({gpuProgram:i,glProgram:s,...r})}};Tr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=Tr;var Ca=`
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
`,Ta=`in vec2 aPosition;
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
`,ka=`
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
}`;class F extends Y{constructor(e){const n=e.gpu,o=po({source:ka,...n}),r=Ce.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=po({source:Ca,...i}),a=G.from({vertex:Ta,fragment:s}),l=new ar({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:xe.EMPTY}})}}function po(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const Un=`
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
    `,Nn=`
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
	`;class kr extends F{constructor(){super({gl:{functions:`
                ${Un}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Nn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}kr.extension={name:"color",type:T.BlendMode};class Ir extends F{constructor(){super({gl:{functions:`
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
            `}})}}Ir.extension={name:"color-burn",type:T.BlendMode};class Or extends F{constructor(){super({gl:{functions:`
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
                `}})}}Or.extension={name:"color-dodge",type:T.BlendMode};class Pr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"darken",type:T.BlendMode};class Br extends F{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"difference",type:T.BlendMode};class _r extends F{constructor(){super({gl:{functions:`
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
            `}})}}_r.extension={name:"divide",type:T.BlendMode};class Ar extends F{constructor(){super({gl:{functions:`
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
            `}})}}Ar.extension={name:"exclusion",type:T.BlendMode};class Fr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"hard-light",type:T.BlendMode};class Rr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Rr.extension={name:"hard-mix",type:T.BlendMode};class Mr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Mr.extension={name:"lighten",type:T.BlendMode};class Dr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Dr.extension={name:"linear-burn",type:T.BlendMode};class zr extends F{constructor(){super({gl:{functions:`
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
            `}})}}zr.extension={name:"linear-dodge",type:T.BlendMode};class Lr extends F{constructor(){super({gl:{functions:`
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
            `}})}}Lr.extension={name:"linear-light",type:T.BlendMode};class Er extends F{constructor(){super({gl:{functions:`
                ${Un}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Nn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Er.extension={name:"luminosity",type:T.BlendMode};class $r extends F{constructor(){super({gl:{functions:`
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
            `}})}}$r.extension={name:"negation",type:T.BlendMode};class Ur extends F{constructor(){super({gl:{functions:`
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
                `}})}}Ur.extension={name:"overlay",type:T.BlendMode};class Nr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Nr.extension={name:"pin-light",type:T.BlendMode};class Hr extends F{constructor(){super({gl:{functions:`
                ${Un}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Nn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Hr.extension={name:"saturation",type:T.BlendMode};class Gr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Gr.extension={name:"soft-light",type:T.BlendMode};class Vr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Vr.extension={name:"subtract",type:T.BlendMode};class Xr extends F{constructor(){super({gl:{functions:`
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
                `}})}}Xr.extension={name:"vivid-light",type:T.BlendMode};const xn=[];Et.handleByNamedList(T.Environment,xn);async function Ia(t){if(!t)for(let e=0;e<xn.length;e++){const n=xn[e];if(n.value.test()){await n.value.load();return}}}let je;function Oa(){if(typeof je=="boolean")return je;try{je=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{je=!1}return je}var jr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(jr||{});class Pa{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Ba=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],qr=class Wr extends Gi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Ba,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Ia(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Wr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(nt(Rt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:y.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=jr.ALL);const{clear:o,clearColor:r,target:i}=e;y.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Pa(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Oa())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};qr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Jr=qr,yt;function _a(t){return yt!==void 0||(yt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Jr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!pn.get().getWebGLRenderingContext())return!1;let o=pn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),yt}let xt;async function Aa(t={}){return xt!==void 0||(xt=await(async()=>{const e=pn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),xt}const mo=["webgl","webgpu","canvas"];async function Fa(t){let e=[];t.preference?(e.push(t.preference),mo.forEach(i=>{i!==t.preference&&e.push(i)})):e=mo.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Aa()){const{WebGPURenderer:a}=await ao(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-Dc2b5OTh.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&_a(t.failIfMajorPerformanceCaveat??Jr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await ao(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-C-xFFVYo.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Zr="8.8.1";class Yr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Zr)}static destroy(){}}Yr.extension=T.Application;class Ra{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Zr)}destroy(){this._renderer=null}}Ra.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"initHook",priority:-10};const Kr=class wn{constructor(...e){this.stage=new b,e[0]!==void 0&&nt(Rt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Fa(e),wn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return nt(Rt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=wn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Kr._plugins=[];let Qr=Kr;Et.handleByList(T.Application,Qr._plugins);Et.add(Yr);var Ma=`in vec2 aPosition;
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
`,Da=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,go=`struct GlobalFilterUniforms {
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
}`;const ei=class ti extends Y{constructor(e){e={...ti.defaultOptions,...e};const n=Ce.from({vertex:{source:go,entryPoint:"mainVertex"},fragment:{source:go,entryPoint:"mainFragment"}}),o=G.from({vertex:Ma,fragment:Da,name:"alpha-filter"}),{alpha:r,...i}=e,s=new ar({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ei.defaultOptions={alpha:1};let za=ei;class it extends fe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof xe?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ze.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ze.shared.add(this.update,this,Vi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(xe.from(e[o]));return new it(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(xe.from(e[o]));return new it(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof xe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ze.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ze.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class La extends Xi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new ji({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Ea(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(nt(Rt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class $a extends La{constructor(...e){const n=Ea(e,"Text");super(n,qi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Wi.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Hn extends xe{static create(e){return new Hn({source:new Ji(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Se=t=>{const[e,n,o]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:o/2})},X={original:new y(q.zxWhite),basic:g.white,dimmed:g.lightGrey},j={original:new y(q.zxYellow),basic:g.midRed,dimmed:g.redShadow},K={original:new y(q.zxMagenta),basic:g.pink,dimmed:Se(g.pink)},R={original:new y(q.zxCyan),basic:g.pastelBlue,dimmed:Se(g.pastelBlue)},Q={original:new y(q.zxGreen),basic:g.moss,dimmed:Se(g.moss)},Gn={white:{basic:{main:X,edges:{towards:R,right:j},hud:{lives:j,dimmed:K,icons:R}},dimmed:{main:X,edges:{towards:Q,right:R},hud:{lives:j,dimmed:K,icons:R}}},yellow:{basic:{main:j,edges:{towards:Q,right:X},hud:{lives:R,dimmed:K,icons:Q}},dimmed:{main:j,edges:{towards:R,right:R},hud:{lives:R,dimmed:K,icons:Q}}},magenta:{basic:{main:K,edges:{towards:Q,right:R},hud:{lives:X,dimmed:R,icons:j}},dimmed:{main:K,edges:{towards:Q,right:R},hud:{lives:X,dimmed:R,icons:j}}},cyan:{basic:{main:R,edges:{towards:K,right:X},hud:{lives:X,dimmed:Q,icons:j}},dimmed:{main:R,edges:{towards:K,right:X},hud:{lives:X,dimmed:Q,icons:j}}},green:{basic:{main:Q,edges:{towards:R,right:j},hud:{lives:X,dimmed:K,icons:R}},dimmed:{main:Q,edges:{towards:R,right:j},hud:{lives:X,dimmed:K,icons:R}}}},Vn=t=>Gn[t.hue][t.shade],Me={head:g.pastelBlue,heels:g.pink},_t=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Zn>n?100-Math.ceil((n-e)/(Zn/100)):0},ni=t=>t.type==="headOverHeels"?_t(t.state.head)>0||_t(t.state.heels)>0:_t(t.state)>0,oi=t=>{const e=100*A.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/A.w):0},Ua={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},ht=`in vec2 aPosition;
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
`,Na=`in vec2 vTextureCoord;
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
`;class be extends Y{constructor(e){const n=Object.keys(e).length,o=G.from({vertex:ht,fragment:Na.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const Ha=`precision mediump float;
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
`;class N extends Y{uniforms;constructor(e="white"){const n=G.from({vertex:ht,fragment:Ha,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const Ga=`precision mediump float;
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
`;class Va extends Y{constructor(){const e=G.from({vertex:ht,fragment:Ga,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const ri=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),ii=t=>ri(Gn[t.color.hue][t.color.shade].main),si=t=>new be({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&ii(t)}),Xa=new be({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),ja=t=>new be({replaceLight:t,replaceDark:Se(t)}),Sn=(t,e,n)=>n?new be(ri(Gn[t.color.hue][t.color.shade].edges[e])):new N(Vn(t.color).edges[e].original),ge=t=>new be(ii(t)),bo=new Va,oe=Zi,qa=new be(Ua),vo={x:.5,y:1},yo=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),Cn=t=>{if(typeof t=="string")return Cn({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(yo(t)?c=Wa(t):c=new fe(le().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let m=1;m<=u.z;m++){const v={...t,label:`(${h},${f},${m})`};delete v.times;const k=Cn(v),O=B({x:h-1,y:f-1,z:m-1});k.x+=O.x,k.y+=+O.y,d.addChild(k)}return d}if(e===void 0&&o===void 0)if(yo(t))c.anchor=vo;else{const u=le().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=vo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},p=Cn;function Wa({animationId:t,reverse:e,playOnce:n,paused:o}){const r=le().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:lr}));e&&s.reverse();const a=new it(s);return a.animationSpeed=$t.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Ja=`#version 300 es

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
`;class st extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=G.from({vertex:ht,fragment:Ja,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const te=new st({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),Qe=new N,xo=new N,Xn=new N,wo=new N(g.moss),et=new N,ee=[Qe,te],Za=[et,te],Ya=[te,Xn],wt={original:[te,et],colourised:{head:{active:[te,new N(Me.head)],inactive:[te,new N(Se(Me.head))]},heels:{active:[te,new N(Me.heels)],inactive:[te,new N(Se(Me.heels))]}}},Oe=14,Ka=2,Qa=Math.cos(30*(Math.PI/180)),el=40;class tl{constructor(e){this.renderContext=e;const{inputDirectionMode:n,general:{colourised:o}}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Oe,y:-14,filter:ee}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Oe,y:Oe,filter:ee}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Oe,filter:ee}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Oe*Math.SQRT2,filter:ee}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Oe*Math.SQRT2,filter:ee}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new W().circle(0,0,el).fill("#00000000"));for(const r of H(this.arrowSprites))this.output.addChild(r);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=o?oe:Qe}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=_};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Yi(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=Ki({x:-c,y:-u}),h=Qi(d,Qa),f=D(h,Ka);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=lt(e)>es?Bn(e):void 0;for(const[r,i]of cr(this.arrowSprites))i.filters=r===o?Za:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Tn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:q.zxBlue,fire:q.zxYellow,carry:q.zxGreen,carryAndJump:q.zxRed,menu:q.zxWhite,map:q.zxWhite}};function Dt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*nl(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=ts(e);let o=0;for(const r of e){const i=`hud.char.${os(r)}`;try{ns(i)}catch(s){throw new Error(`no texture id for char "${r}": ${s.message}`,{cause:s})}yield p({textureId:i,x:(o+.5-n/2)*Ot.w}),o++}}const se=(t,e)=>{t.removeChildren();try{Dt(nl(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Ye=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?Ya:Xn,scale:{x:1,y:t?2:1}}),zt=Symbol(),ai=Symbol(),li=Symbol(),St=({colourised:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=ja(Tn.colourised[e]):o.filters=new N(Tn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[ai]=r,o[zt]=i,o[li]=n,o},qe=(t,...e)=>{t[zt].removeChildren();for(const n of e)n!==void 0&&t[zt].addChild(n)},Ct=(t,e)=>{t[ai].texture=le().textures[e?"button.pressed":"button"],t[li].y=e?1:0},So=(t,e,n)=>{n&&(t[zt].filters=e?si():oe)},Co=({which:t},e,n)=>{const o=se(new b,n);return o.filters=new be({white:e?Se(Tn.colourised[t]):g.pureBlack}),o};class ci{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new b({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&this.output.removeChild(this.#e.output),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const ol=(t,e,n)=>{const r=le().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&le().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},ui=(t,e)=>{const n=e.getLocalBounds(),o=Hn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new fe({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Xt=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof fe?r:ui(t,r)},Pe=t=>M(({renderContext:{item:e}})=>_n(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),re=t=>M(({renderContext:{item:e,general:{pixiRenderer:n}}})=>{if(_n(e))return Xt(n,t,e.config.times);{const o=p(t);return o instanceof fe?o:ui(n,o)}}),M=t=>({renderContext:e,currentRendering:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:o}),renderProps:ne}:"no-update",ie=t=>({renderContext:{general:{pixiRenderer:e},item:n},currentRendering:o})=>{if(o===void 0){const r=_n(n)?n.config.times:void 0,i={output:Xt(e,t(n.config),r),renderProps:ne};return r&&(i.output.y-=((r.z??1)-1)*A.h),i}else return"no-update"};function*rl({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Ut(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...Pt(a,{y:-12*n})});l.filters=Sn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...Pt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...Pt(a,{y:-l*A.h})})}}yield*s(B({...de,[r]:1})),yield*s(de),e||(yield p({pivot:{x:16,y:A.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...B({...de,[r]:1})}))}const di=(t,e)=>{const n=Ut(t),o=ct(n),r=8;return t==="towards"||t==="right"?I({[o]:e[o]-r}):de},il=M(({renderContext:{item:t,room:e}})=>Dt(rl(t,e),new b({filters:ge(e),...di(t.config.direction,t.aabb)}))),sl=M(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,general:{gameState:{campaign:i}}}})=>{const s=Ut(t),a=i.rooms[n];return p({textureId:ol(r,s,e),filter:ge(a),...di(t,o)})}),tn={animationId:"bubbles.cold"},De=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},hi=Symbol(),fi=Symbol(),al=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[hi]=t,n[fi]=e,n},ll=`#version 300 es

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
`;class Lt extends Y{constructor(e){const n=G.from({vertex:ht,fragment:ll,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const tt=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<rs},jt=t=>t,kn=.02,cl=({name:t,action:e,facingXy8:n,teleportingPhase:o,gravityZ:r,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(o==="out")return{animationId:`${t}.fadeOut`,paused:i};if(o==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:r<kn?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`,paused:i};if(e==="falling"){const a=`${t}.falling.${n}`;if(ls(a))return{textureId:a}}const s=`${t}.idle.${n}`;return cs(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},In=Symbol(),On=Symbol(),ul=(t,e)=>{t[In].removeChildren(),t[In].addChild(p(cl(e)))},nn=(t,e,n)=>{const o=new b,r=new b;o[In]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new be({pastelBlue:g.pink}):oe,flipX:t==="heels"});return o[On]=i,o},To=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+ss>t,dl=t=>{if(!tt(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Yn<Yn*as},ko=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Io=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?oe:t.filters},hl=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?ko(r,new st({outlineColor:Me[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Io(r,st);const s=o?.flashing??!1;n&&!s?ko(r,new Lt(Me[t])):!n&&s&&Io(r,Lt)},fl=(t,e,n)=>{e&&!n?t.addChild(t[On]):!e&&n&&t.removeChild(t[On])},on=(t,e,n,o,r,i)=>{n&&ul(e,{name:t,...o,paused:r}),hl(t,o,i,e),fl(e,o.shining,i?.shining??!1)},pl=({renderContext:{item:t,general:{gameState:e,paused:n}},currentRendering:o})=>{const{type:r,state:{action:i,facing:s,teleporting:a,vels:{gravity:{z:l}}}}=t,c=o?.renderProps,u=o?.output,d=Bn(s)??"towards",h=t.type==="headOverHeels"?To(t.state.head,"headOverHeels","headOverHeels"):To(t.state,t.type,e.currentCharacterName),f=dl(t),m=ni(t),v=lt(s),k=a?.phase??null,O={action:i,facingXy8:d,teleportingPhase:k,flashing:f,highlighted:h,shining:m,gravityZ:l},S=c===void 0||c.action!==i||c.facingXy8!==d||c.teleportingPhase!==k||c?.gravityZ>kn!=l>kn;let C;if(r==="headOverHeels"){C=u??al({top:nn("head",!0,n),bottom:nn("heels",!0,n)});const P=C;on("head",P[hi],S,O,n,c),on("heels",P[fi],S,O,n,c)}else C=u??nn(r,!1,n),on(r,C,S,O,n,c);return i==="moving"&&u instanceof it&&(u.animationSpeed=v*is),{output:C,renderProps:O}},rn=jt(pl),ml=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...B({x:-e.x,y:-e.y})}),r=Dt(ce(Mt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...B(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=Dt(ce(Mt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...B(Pt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...B({...l,z:0}),times:{[ct(Ee(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},gl=t=>[...ce(H(t.items)).filter(e=>e.type==="wall").filter(e=>Ee(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],bl=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},vl=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new W().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(B),!0).fill(0),yl=M(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Nt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:h},roomJson:f}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const S=d==="deadly"?`generic${h==="dimmed"?".dark":""}.floor.deadly`:`${d}${h==="dimmed"?".dark":""}.floor`,C=new b;for(let z=-1;z<=r+2;z++)for(let V=z%2-1;V<=i+2;V+=2)C.addChild(us({x:z+(s.right?-.5:0),y:V+(s.towards?-.5:0)},p({textureId:S})));C.addChild(ml(f,{x:n,y:o}));const P=new W().poly([de,B({x:c,y:0}),B({x:c,y:u}),B({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});C.addChild(P),C.filters=ge(t),C.mask=P,m.addChild(C)}const v=gl(f),k=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(k);const O=bl(v);if(O!==void 0){const S=vl({extraWallRanges:O,blockXMin:n,blockYMin:o});m.addChild(S)}return m.mask=k,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),xl=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=B({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return ce(Mt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,h=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},f=p({label:s,textureId:`floorEdge.${l}`,...B(h),times:a.type==="wall"?a.config.times:{[ct(Ee(l))]:2}});i[l].addChild(f),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...B($(h,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...B($(h,{x:-.5}))}))}),i},wl=M(({renderContext:{general:{colourised:t},room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Nt(e.roomJson),l=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new W({label:"overDrawToHideFallenItems"}).poly([B({x:l,y:0}),B({x:0,y:0}),B({x:0,y:c}),{...B({x:0,y:c}),y:999},{...B({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:h,right:f}=xl({blockXMin:n,blockYMin:o},e.roomJson);h.filters=Sn(e,"towards",t),f.filters=Sn(e,"right",t),u.addChild(h),u.addChild(f);const m=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Sl=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Cl=({renderContext:{item:{config:t,state:e},room:n,general:{paused:o}},currentRendering:r})=>{const i=r?.renderProps,{activated:s,busyLickingDoughnutsOffFace:a}=e,l=a?Xa:s?void 0:Sl.includes(t.which)?si(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const c=Ht(e.facing)??"towards";if(!(i===void 0||s!==i.activated||a!==i.busyLickingDoughnutsOffFace||c!==i.facingXy4))return"no-update";const d={facingXy4:c,activated:s,busyLickingDoughnutsOffFace:a};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${c}`,filter:l}),renderProps:d};case"elephantHead":return{output:p({textureId:`elephant.${c}`,filter:l}),renderProps:d};case"turtle":return{output:p(s&&!a?{animationId:`${t.which}.${c}`,filter:l,paused:o}:{textureId:`${t.which}.${c}.1`,filter:l}),renderProps:d};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?De({top:{textureId:`${t.which}.${c}`,filter:l||ge(n)},bottom:{...tn,paused:o}}):p({textureId:`${t.which}.${c}`,filter:l}),renderProps:d};case"computerBot":case"elephant":case"monkey":return{output:De({top:`${t.which}.${c}`,filter:l}),renderProps:d};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(i===void 0||a!==i.busyLickingDoughnutsOffFace||s!==i.activated))return"no-update";const u={activated:s,busyLickingDoughnutsOffFace:a};switch(t.which){case"helicopterBug":case"dalek":return{output:p(s&&!a?{animationId:t.which,filter:l,paused:o}:{textureId:`${t.which}.1`,filter:l}),renderProps:u};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:u};case"bubbleRobot":return{output:De({top:{...tn,paused:o},filter:l}),renderProps:u};case"emperorsGuardian":return{output:De({top:"ball",bottom:{...tn,paused:o},filter:l}),renderProps:u};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},Tl=pe.floatingText,kl=12,Oo=A.h*3,Po=[g.shadow,g.midGrey,g.redShadow,g.metallicBlue,g.midRed,g.moss,g.pink,g.lightBeige,g.pastelBlue,g.lightGrey,g.highlightBeige],Bo=[...Po,...new Array(20).fill(g.white),...Po.toReversed()],Il=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},general:{displaySettings:{uncolourised:o}}},currentRendering:r})=>{const i=r?.output;let s;const l=(n-e)*Tl;if(i===void 0){s=new b({filters:new st({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=se(new b({label:u,y:c*kl,filters:o?oe:new N(g.pink)}),u.toUpperCase());s.addChild(d)}}else s=i;for(let c=0;c<t.length;c++){const u=s.children[c],[d]=u.filters,h=l+c*-12,f=h>0&&h<Oo;if(u.visible=f,f&&d){const m=Math.floor(h/Oo*Bo.length);d.targetColor=Bo[m]}}return s.y=-l,{output:s,renderProps:ne}},ft=t=>{for(const e in t)return!0;return!1},_o=500,Ol=$t.animations["conveyor.x"].animationSpeed,Ao=$t.animations["conveyor.x"].length,Pl=t=>1-(1-t)**2,Bl=(t,e)=>{for(let n=0;n<t.children.length;n++){const o=t.children[n],r=n%Ao;o.gotoAndStop(e?Ao-r-1:r)}return t},_l=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:o}},currentRendering:r})=>{const i=r?.renderProps,s=ft(n),a=(!s&&i?.moving?o:i?.roomTimeStoppedMoving)??ut,l=Ee(t),c=r?.output??Bl(p({animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),u=s?0:Math.min(o-a,_o),d=Math.max(0,1-u/_o);for(const h of c.children)if(d===0)h.stop();else{const f=Ol*Pl(d);h.play(),h.animationSpeed=f}return{output:c,renderProps:{moving:s,roomTimeStoppedMoving:a}}},Al=jt(_l),Z={movementType:"steady"},Ve=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:An(w.getState(),t),Fl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&J("teleporter")(l)&&Ve(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:vn}}}:Z;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return En({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:vn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Rl=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=t,s=o?.renderProps,a=Ve(t),l=a&&$e(r,e).find(U)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:l?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:a?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:a}}:"no-update"},Ml=({renderContext:{item:{state:{facing:t}}},currentRendering:e})=>{const n=e?.renderProps,o=Ht(t)??"towards";return n===void 0||o!==n.facingXy4?{output:De({top:`charles.${o}`}),renderProps:{facingXy4:o}}:"no-update"},Dl=({renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:e}},general:{paused:n}},tickContext:{lastRenderRoomTime:o},currentRendering:r})=>{const i=r?.renderProps,s=ft(t);let a;return r?.output?a=r?.output:(a=p({animationId:"spring.bounce"}),a.loop=!1,a.gotoAndStop(0)),o!==void 0&&e>o&&!s&&!n?a.gotoAndPlay(0):s&&!(i?.compressed??!1)&&a.gotoAndStop(1),{output:a,renderProps:{compressed:s}}},zl=jt(Dl),Ll=({renderContext:{item:{config:{which:t,startDirection:e}}},currentRendering:n})=>n?.renderProps===void 0?{output:t==="headOverHeels"?De({top:{textureId:`head.walking.${e}.2`},bottom:{textureId:`heels.walking.${e}.2`}}):p({textureId:`${t}.walking.${e}.2`}),renderProps:ne}:"no-update",El=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},general:{paused:n}},tickContext:{deltaMS:o},currentRendering:r})=>{const s=(r?.renderProps?.distanceTravelled??0)+Fn(t)*(n?0:o),l=r?.output??p("spikyBall.1"),u=(Math.floor(s*2/Le.w)+e)%2+1;return l.texture=le().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:s}}},$l=jt(El),Ul=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,Nl=M(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=ct(Ee(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:Ul(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Le.w,y:Le.h+1}:{x:0,y:Le.h+1},filter:ge(o)}),l=B({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),Hl=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const o=n?.renderProps,r=e.type==="in-store"?An(w.getState(),e.path)?"right":"left":t;return o===void 0||r!==o.setting?{output:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},Gl=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Vl=({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentRendering:r})=>{const i=r?.renderProps;return i===void 0||i.disappear!==n?{output:p({textureId:Gl(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ge(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},Xl=()=>M(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),jl={head:rn,heels:rn,headOverHeels:rn,doorFrame:sl,doorLegs:il,monster:Cl,floatingText:Il,wall:Nl,barrier:M(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:M(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ge(n):void 0,times:e})),spikes:Pe("spikes"),slidingDeadly:$l,slidingBlock:Xl(),block:Vl,switch:Hl,conveyor:Al,lift:M(({renderContext:{general:{paused:t}}})=>{const e=new b,n={x:Ke.w/2,y:Ke.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter:Rl,sceneryCrown:M(({renderContext:{item:{config:{planet:t}}}})=>p({textureId:`crown.${t}`})),pickup:M(({renderContext:{item:{config:t},room:e,general:{paused:n}}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ge(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:Pe("fish.1"),charles:Ml,joystick:Pe("joystick"),movingPlatform:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),spring:zl,sceneryPlayer:Ll,hushPuppy:Pe("hushPuppy"),bubbles:M(({renderContext:{item:{config:{style:t}},general:{paused:e}}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Pe({animationId:"bubbles.doughnut"}),ball:Pe("ball"),floor:yl,floorEdge:wl},pi=t=>{if(t.type==="wall"){const{direction:e}=t.config;if(e==="right"||e==="towards")return}return jl[t.type]},mi=(t,e,n)=>{const o=pi(t);if(!n.room)return;const r=o({renderContext:{general:e.general,item:t,room:n.room},tickContext:{lastRenderRoomTime:ut,movedItems:Rn,progression:0,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},ql=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},Fo=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>ql(t,e,n,o),jn=(t,e,n=.001)=>{if(!Te(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:Mn({state:{position:$(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+ds},id:t.id},{state:{position:$(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},gi=(t,e)=>{const o=[...ce(e).filter(i=>jn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=ha(s,i);return a<0||a===0&&Fo(t,s)>Fo(t,i)?s:i})};function bi({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(ni(e)||tt(e)||(e.state.action="death",e.state.expires=t+vn))}const ue=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,at=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Wl=3e3,vi=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0);const d=h=>{const f=gs(o),m={type:"floatingText",id:`floatingText-${i}`,...dr,fixedZIndex:bs,aabb:_,state:{...ur(),position:$(f,{z:A.h/2}),expires:c+Wl},config:{textLines:h,appearanceRoomTime:c}};Ue({room:r,item:m})};switch(s.gives){case"hooter":{const h=Bt(n);h!==void 0&&(h.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const h=Bt(n);h!==void 0&&(h.doughnuts=ue(h.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const h=ot(n);h!==void 0&&(h.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["🛡","shield"]);break}case"fast":{const h=Bt(n);h!==void 0&&(h.fastStepsStartedAtDistance=h.gameWalkDistance),d(["⚡","fast steps"]);break}case"jumps":{const h=ot(n);h!==void 0&&(h.bigJumps+=10),d(["♨","10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ue(n.state.head.lives,2),n.state.heels.lives=ue(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=ue(n.state.lives,2),d(["+2","lives"]));break;case"scroll":w.dispatch(ms(s.page));break;case"reincarnation":{w.dispatch(fs(ps(e,w.getState()))),d(["reincarnation","point","saved"]);break}case"crown":{w.dispatch(hs(s.planet)),d([s.planet,"liberated!"]);break}}},Jl=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;hr(i,o)<=0||e.state.action!=="death"&&En({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},Zl=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Ut(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=$(t.state.position,s)};function Yl({movingItem:t}){t.state.autoWalk=!1}const ae=(t,...e)=>J(...e)(t.touchedItem),We=(t,...e)=>J(...e)(t.movingItem),yi=t=>U(t.movingItem),Kl=t=>U(t.touchedItem),Ql=t=>fr(t.touchedItem),Ro=t=>{switch(!0){case ae(t,"stopAutowalk"):Yl(t);break;case Ql(t):bi(t);break;case ae(t,"portal"):Jl(t);break;case ae(t,"pickup"):vi(t);break;case ae(t,"doorFrame"):Zl(t);break}},qn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Dn(e.items);if(r!==void 0)return tt(r)?void 0:r;const i=n===void 0||tt(n)||n.state.action==="death"?void 0:Kn(n.state.position,t),s=o===void 0||tt(o)||o.state.action==="death"?void 0:Kn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},xi=150,wi=t=>t[Math.floor(Math.random()*t.length)],he=Object.freeze({movementType:"vel",vels:{walking:_}}),qt=t=>pr(t)?pe[t.config.which]:pe[t.type],Mo=A.w/2,ec=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=pe.homingBot;if(!Gt(e,de))return{movementType:"steady"};for(const s of H(Dn(n.items))){if(s===void 0)continue;const a=dt(s.state.position,t);if(Math.abs(a.y)<Mo)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Mo)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},tc=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return he;const l=qn(r,e);if(l===void 0||s+xi>e.roomTime)return Z;const c=dt(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>A.w/4?u:ct(u),h=qt(t),f={..._,[d]:c[d]>0?h:-h},m=Ne(f),v=!Gt(m,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:ne}}},Do=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return he;const a=qn(i,e);if(a===void 0)return he;const l=a.state.position,c=A.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return he;const d=dt(a?.state.position,i),h=qt(t),f=(1+Math.sqrt(2))/2,m=h*f,v=D({...d,z:0},m/Fn(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:Ne(v)}}},sn=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return he;if(!(ke(i,_)||Math.random()<o/1e3))return Z;const l=wi(r);return{movementType:"vel",vels:{walking:D(mn[l],qt(t))},stateDelta:{facing:mn[l]}}},nc=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?he:Gt(i,de)?{movementType:"vel",vels:{walking:D(r,qt(t))}}:Z},zo=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=wi([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},an=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<xi))return;const u=Vt(i,c,e,n);u.x===0&&u.y===0||(t.state.vels.walking=zo(s,u,r),t.state.facing=zo(l,u,r),t.state.durationOfTouch=0)},oc=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},rc=(t,e,n,o)=>{if(!t.state.activated||pr(t)&&t.state.busyLickingDoughnutsOffFace)return he;switch(t.config.movement){case"patrol-randomly-diagonal":return sn(t,e,n,o,ws);case"patrol-randomly-xy8":return sn(t,e,n,o,xs);case"patrol-randomly-xy4":return sn(t,e,n,o,ys);case"towards-tripped-on-axis-xy4":return ec(t,e);case"towards-on-shortest-axis-xy4":return tc(t,e);case"back-forth":case"clockwise":return nc(t);case"unmoving":return he;case"towards-analogue":return Do(t,e);case"towards-analogue-unless-planet-crowns":return Do(t,e,n,o,vs(w.getState()));default:throw t.config,new Error("this should be unreachable")}},ic=t=>{const{movingItem:e,touchedItem:n}=t;if(Te(n,e))switch(e.config.movement){case"patrol-randomly-xy4":an(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":an(t,"opposite");break;case"clockwise":an(t,"clockwise");break;case"towards-tripped-on-axis-xy4":oc(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},sc=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s],switchedAtRoomTime:n.roomTime,switchedSetting:s})}break}case"in-store":{w.dispatch(Ss(o.path));break}}},ac=({movingItem:t,touchedItem:e})=>{if(!Te(t))return;const{state:{position:n},aabb:o}=e,r=Vt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=Ne(r),s=D(i,-.05);return e.state.vels.sliding=s,!1},lc=({movingItem:t,touchedItem:e})=>{if(!Te(e))return;const n=t.state.vels.sliding;if(ke(n,_))return;const{state:{position:o},aabb:r}=t,i=Vt(e.state.position,e.aabb,o,r);return hr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},cc=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Vt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Ne(c);for(const d of s){const h=e.items[d],f=D(u,-.025*o);h.state.facing=f,$n({room:e,subjectItem:h,gameState:r,pusher:n,posDelta:f,deltaMS:o,onTouch:i})}},uc=1e3/12,Tt=t=>{const e=t-Is,o=e/Os*lr;return(e+.5*gn*o**2)/o},dc={head:Tt(mt.head),headOnSpring:Tt(mt.head+A.h),heels:Tt(mt.heels),heelsOnSpring:Tt(mt.heels+A.h)},Lo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return dc[`${n}${e?"OnSpring":""}`]},hc=t=>!(t===null||Ts(t)&&Ve(t)||ks(t)&&t.config.gives==="scroll"||U(t)&&t.state.standingOnItemId===null),fc=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+uc>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),Si=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=He(o,e);if(fc(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Lo(t,!1)}},stateDelta:{}};if(!(t.state.action!=="death"&&r.currentActionPress("jump")!=="released"&&hc(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Z;const a=Cs(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Lo(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},pc=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=lt(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return D(n,l)},mc={movementType:"vel",vels:{walking:_}},Ci=(t,e,n,o)=>{const r=gc(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=lt(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ke(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},gc=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:m}}}=t,v=o===t.id,k=v?n.currentActionPress("jump"):"released",O=v?n.directionVector:_,S=l===null&&m.z<0,C=i==="head"&&oi(t.state)>0&&l!==null,P=i==="headOverHeels"?S?"head":"heels":C?"heels":i,z=a?c:O,V=pe[P];if(u!==null||s==="death")return mc;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:zn(f,D(f,Ps*r))},stateDelta:{action:S?"falling":"jumping"}}:{movementType:"vel",vels:{walking:_},stateDelta:{action:"falling"}};if(k!=="released"){const pt=Ne(Gt(z,de)?c:z),$i=J("spring")(He(l,e))?1:Bs;return{movementType:"vel",vels:{walking:D({...pt,z:0},V*$i)},stateDelta:{facing:pt}}}}if(lt(z)!==0)return S?{movementType:"vel",vels:{walking:D({...z,z:0},V)},stateDelta:{facing:z,action:"falling"}}:{movementType:"vel",vels:{walking:pc({vel:f,acc:_s[P],deltaMS:r,maxSpeed:V,unitD:z,minSpeed:0})},stateDelta:{facing:z,action:"moving"}};if(d>0&&d<1){const pt=ke(h,c)?1:0;return{movementType:"position",posDelta:D(c,pt-d),stateDelta:{action:S?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:S?"falling":"idle"}}},Eo=t=>Ie(t.movingItem)&&jn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Ti=(t,e)=>{let n=_;for(const o of e){if(o.movementType==="position"&&(n=$(n,o.posDelta)),o.movementType==="vel"&&(Ie(t)||J("lift")(t)))for(const[i,s]of cr(o.vels)){const a={..._,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},$o=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&U(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Eo(t)){if(Eo(t)&&yi(t)){mr({above:t.movingItem,below:t.touchedItem});const n=[Si(t.movingItem,t.room,t.gameState,t.deltaMS),Ci(t.movingItem,t.room,t.gameState,t.deltaMS)];Ti(t.movingItem,n)}Sr(t)}};function bc(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Wn=t=>{yi(t)&&Ro(t),Kl(t)&&Ro({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ae(t,...Qn)&&ac(t),We(t,...Qn)&&lc(t),(We(t,"monster")&&ae(t,"firedDoughnut")||We(t,"firedDoughnut")&&ae(t,"monster"))&&bc(t),(We(t,"monster")||We(t,"movingPlatform"))&&ic(t),ae(t,"switch")&&sc(t),ae(t,"joystick")&&cc(t,Wn),t.touchedItem.state.disappear&&$o(t),t.movingItem.state.disappear&&Te(t.touchedItem,t.movingItem)&&$o({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},vc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=me(e.items).filter(Ln),u=s===null?ki(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;yc(e,i,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!Ii(t,gr(e.items)))return;s.state.position=l,Ue({room:e,item:s}),$n({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:s.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Wn}),i.carrying=null,r.actionsHandled.add("carry")}},yc=(t,e,n)=>{e.carrying=n,n.state.wouldPickUpNext=!1,br({room:t,item:n})},ki=(t,e)=>gi(t,me(e.items).filter(Ln)),Ii=(t,e)=>{const n={position:$(t.state.position,{z:A.h})},o=As({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(Te(r,t)){if(!Ie(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!Ii(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},ln=-11,xc={jump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},tickContext:{room:o,currentPlayable:r},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=r?.state.standingOnItemId??null,c=l===null||o===void 0?null:o.items[l],u=c===null?!1:c.type==="teleporter"&&Ve(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?St({colourised:n,button:t}):a;if(s?.pressed!==d&&Ct(h,d),u!==s?.standingOnTeleporter)if(u)qe(h,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Co(t,n,"JUMP");f.y=ln,qe(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourised:n}}},carry({renderContext:t,currentRendering:e,tickContext:n}){const{button:o,inputStateTracker:r,general:{colourised:i}}=t,{currentPlayable:s,room:a}=n,l=e?.renderProps,c=e?.output,u=s&&ot(s),d=u?.hasBag??!1,h=u?.carrying??null,f=h===null&&a!==void 0&&ki(s,a)!==void 0,m=o.actions.every(S=>r.currentActionPress(S)!=="released"),v=d&&!f&&h===null,k=c===void 0?St({colourised:i,button:o}):c;if(k.visible=d,d&&(v!==l?.disabled&&So(k,v,i),k.visible=!0,l?.pressed!==m&&Ct(k,m),d!==l?.hasBag||h!==l?.carrying)){let S;h!==null?S=mi(h,t,n):d&&(S=p({textureId:"bag",y:-2})),qe(k,S)}return{output:k,renderProps:{pressed:m,hasBag:d,colourised:i,carrying:h,disabled:v}}},fire({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,a=r&&Bt(r),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=s===void 0?St({colourised:n,button:t}):s,h=l||at(c)>0;if(d.visible=h,h&&(i?.pressed!==u&&Ct(d,u),l!==i?.hasHooter||c!==i?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):at(c)>0&&(f=p({textureId:"doughnuts",y:-2}));const m=se(new b,c);m.y=ln,m.filters=te,qe(d,f,m),So(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:o,tickContext:{currentPlayable:r}}){const i=o?.renderProps,s=o?.output,l=(r&&ot(r))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let d;if(s===void 0){d=St({colourised:n,button:t});const h=Co(t,n,"C+J");h.y=ln,qe(d,h)}else d=s;return l?(d.visible=!0,i?.pressed!==c&&Ct(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:t}){if(t!==void 0)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:ne}},map({currentRendering:t}){if(t!==void 0)return"no-update";const e=Ye({label:"mapText",outline:!0});return se(e,"MAP"),{output:e,renderProps:ne}}};class Be extends ci{constructor(e){const n=xc[e.button.which];super(e,n)}}const wc=30,Sc=15,Cc=42,Tc=36,kc=44,Ic=20;class Oc{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:o,general:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Be({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:n}),fire:new Be({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:n}),carry:new Be({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:n}),carryAndJump:new Be({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:n}),menu:new Be({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:n}),map:new Be({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:n})},joystick:new tl({inputStateTracker:n,inputDirectionMode:o,general:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of H(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=Sc,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=wc,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const n of H(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-kc,this.#n.mainButtonNest.y=e.y-Ic,this.#n.joystick.output.x=Cc,this.#n.joystick.output.y=e.y-Tc,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{general:{gameState:o}}=this.renderContext;this.#o(n);for(const r of H(this.#n.buttons))r.tick({...e,currentPlayable:Ge(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}$t.frames.button.frame;const Pc=250,Bc=t=>t?48:24,_c=t=>t?68:56,Ac=(t,e)=>t?e.x/2-24:80,Fc=t=>t?72:24,Rc=t=>t?88:0,Uo=112,Je=t=>t==="heels"?1:-1;class Mc{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Yt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[wo],this.#t.fps.y=Ot.h,this.#o(),n&&(this.#n=new Oc({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Ye({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Ye({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:Ye({label:"fps",outline:!0})};#o(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const n of Yt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new fe({texture:le().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:xo,y:n?0:8});s.addChild(a);const l=Ye({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=Ot.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=te),{text:l,icon:a,container:s}}#i(e){const n=new fe(le().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#l({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Je("head")*Uo,this.#t.head.doughnuts.container.y=e.y-Ke.h-8,this.#t.heels.carrying.container.y=e.y-Ke.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Je("heels")*Uo,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Ot.w*2}#s(e,n){return e?n?oe:et:n?bo:Qe}#a(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=gt(n,"heels"),i=r?.hasBag??!1,s=r?.carrying??null,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=mi(s,this.renderContext,e);c!==void 0&&a.addChild(c)}a.filters=this.#s(!0,o),this.#t.heels.bag.icon.filters=this.#s(i,o)}#c(e){const{renderContext:{general:{gameState:n,colourised:o}}}=this,r=gt(n,"head"),i=r?.hasHooter??!1,s=r?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#s(i,o),this.#t.head.doughnuts.icon.filters=this.#s(s!==0,o),se(this.#t.head.doughnuts.text,s)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,i=gt(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=_t(i),d=u>0||!o;a.visible=d,d&&(se(s,u),a.y=n.y-Rc(o)),c.x=a.x=(n.x>>1)+Je(e)*Ac(o,n);const h=i===void 0?0:e==="head"?oi(i):i.bigJumps,f=h>0||!o;c.visible=f,f&&(se(l,h),c.y=n.y-Fc(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r,colourised:i}}}=this,s=this.#u(r,e),a=this.#t[e].sprite;s?a.filters=i?oe:et:a.filters=i?bo:Qe,a.x=(n.x>>1)+Je(e)*_c(o),a.y=n.y-Ke.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,general:{gameState:r}}}=this,s=gt(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Je(e)*Bc(o),a.y=n.y,se(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Vn(n.color),{general:{colourised:r,gameState:i}}=this.renderContext;Qe.targetColor=o.hud.dimmed[r?"dimmed":"original"],Xn.targetColor=o.hud.dimmed[r?"basic":"original"],xo.targetColor=o.hud.icons[r?"basic":"original"],et.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?wt.colourised.head[this.#u(i,"head")?"active":"inactive"]:wt.original,this.#t.heels.livesText.filters=r?wt.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:wt.original}#d=ut;#g(){if(Fs(w.getState())){if(performance.now()>this.#d+Pc){const e=Ze.shared.FPS;se(this.#t.fps,Math.round(e)),wo.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Yt)this.#p(n,e),this.#f(n,e),this.#h(n,e);this.#l(e),this.#c(e),this.#a(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const No={movementType:"vel",vels:{gravity:_}},Dc=(t,e,n,o)=>{if(!Te(t))return No;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=Rs[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=He(s,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-gn*o,-l)}}}:No}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-gn*o,-l)}}}},Ho=A.h,Go=.001,zc=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=eo**2/(2*Xe);if(n==="up"){if(e<=o)return Math.max(Go,Math.sqrt(2*Xe*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(Go,Math.sqrt(2*Xe*r))}else return eo}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Xe*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Xe*Math.max(e,0))):-.036},Lc=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*Ho,i=e*Ho,s=zc({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Vo={movementType:"vel",vels:{movingFloor:_}},Ec=(t,e,n,o)=>{if(U(t)&&t.state.teleporting!==null)return Vo;const{state:{standingOnItemId:r}}=t,i=He(r,e);if(i===null||!J("conveyor")(i))return Vo;const{config:{direction:s}}=i,l=J("heels")(t)&&t.state.action==="moving"&&Ht(t.state.facing)===Ms(s)?pe.heels:Ds;return{movementType:"vel",vels:{movingFloor:D(mn[s],l)}}};function*$c(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Uc=A.w*.8,Nc=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Ne(c);if(r.currentActionPress("fire")==="tap"&&a&&at(s)>0){const d={type:"firedDoughnut",...dr,config:ne,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...ur(),position:$(l,D(u,Uc),t.type==="headOverHeels"?{z:A.h}:_),vels:{fired:D(u,pe.firedDoughnut)},disappear:"onTouch"}};Ue({room:e,item:d}),i.doughnuts=ue(i.doughnuts,-1),r.actionsHandled.add("fire")}},Oi=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Hc=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),kt=A.w*3,Gc=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-kt&&n.x<o.x+kt&&n.y>o.y-kt&&n.y<o.y+kt},Xo=(t,e,n,o,r)=>{if(r&&t.state.activated)return Z;const i=qn(t.state.position,e);return i===void 0?Z:Gc(t,i)?Oi:Hc},Vc=(t,e,n,o)=>t.state.activated?Z:$e(t.state.stoodOnBy,e).some(U)?Oi:Z,Xc=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return Xo(t,e,n,o,!0);case"while-player-near":return Xo(t,e,n,o,!1);case"on-stand":return Vc(t,e);case"off":case"on":return Z;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},jc=(t,e,n,o)=>{const{id:r,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=zs(Ls(`${r}-${s}`,{...l,position:_},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=zn(a,D(h.aabb,.5)),Ue({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}};function*qc(t,e,n,o){Ie(t)&&(yield Dc(t,e,n,o),yield Ec(t,e),yield*$c(t,e)),U(t)?(yield Ci(t,e,n,o),t.id===n.currentCharacterName&&(yield Fl(t,e,n,o),yield Si(t,e,n),Es(t)&&vc(t,e,n,o),$s(t)&&Nc(t,e,n))):Us(t)?yield Lc(t):Ns(t)?(yield Xc(t,e,n,o),yield rc(t,e,n,o)):Hs(t)&&jc(t,e)}const Wc=(t,e,n,o)=>{if(!Ie(t)||t.state.standingOnItemId===null)return;const r=He(t.state.standingOnItemId,e);U(t)&&r.type==="pickup"&&vi({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||U(t)&&r.state.disappear==="onTouchByPlayer")&&Sr({touchedItem:r,gameState:n,room:e})},Jc=(t,e,n,o)=>{if(U(t)&&t.state.standingOnItemId!==null){const s=He(t.state.standingOnItemId,e);(fr(s)||s.type==="spikes")&&bi({room:e,movingItem:t})}const r=[...qc(t,e,n,o)];Wc(t,e,n);let i=Ti(t,r);(Ie(t)||J("lift")(t)||J("firedDoughnut")(t))&&(i=$(i,...ce(H(t.state.vels)).map(s=>D(s,o)))),$n({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:o,onTouch:Wn})},Zc=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ue(e.state.head.lives,-1),e.state.heels.lives=ue(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ue(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=at(e.state.head.lives)>0,i=at(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,ye(t,e);const u=to(e)[c],d=ze({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:no(u)};return}if(t.entryState.headOverHeels!==void 0){ye(t,e);const c=ze({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=to(e);if(ye(t,c),ye(t,u),Mn(c,u)){const d=vr({head:c,heels:u});ye(t,d,"heels");const h=ze({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:no(d)};return}else{const d=ze({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},ze=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=Vs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??ne});for(const i of e)Ue({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&fa(r,t);return r},ye=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Yc=(t,e)=>{const n=yr(t,xr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];ye(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=vr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});ye(t,a);const l=ze({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Ue({room:o,item:e});return}else{const s=ze({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Kc=(t,e)=>{e.type==="headOverHeels"?Zc(t,e):Yc(t,e),Ge(t)===void 0&&w.dispatch(Gs({offerReincarnation:!0}))},Qc=t=>{for(const e of me(t.items))for(const n of $e(e.state.stoodOnBy,t)){if(!t.items[n.id]){oo(n,t);continue}if(!jn(n,e)){oo(n,t);const o=gi(n,gr(t.items));o!==void 0&&mr({above:n,below:o})}}},eu=2*pa,tu=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+eu,positionDelta:n})},nu=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...zn(o.state.position,r),z:0};if(!ke(s,_))for(const a of $e(o.state.stoodOnBy,e))tu(a,e,s)}},ou=(t,e)=>{for(const n of me(t.items))!Ie(n)||t.roomTime===n.state.actedOnAt.roomTime||Xs(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=js(n.state.position),e.add(n))},ru=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,iu=t=>{for(const e of me(t.items)){const n=e.state.position;e.state.position=qs(n)}},su=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},au=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Ge(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=yr(t,xr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},lu=(t,e)=>{const n=we(t);if(n===void 0)return Rn;au(t,n,e);const o=Object.fromEntries(Ws(n.items).map(([s,a])=>[s,a.state.position]));for(const s of H(n.items))ru(s,n)&&(br({room:n,item:s}),U(s)&&Kc(t,s));const r=Object.values(n.items).sort(su);for(const s of r){const a=Ge(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Jc(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}Qc(n),iu(n);const i=new Set(ce(H(n.items)).filter(s=>o[s.id]===void 0||!ke(s.state.position,o[s.id])));return nu(i,n,o),ou(n,i),i},jo=(t,e)=>{const n=I(t),o=I($(t,{x:e.x,z:e.z})),r=I($(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},cn=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,cu=(t,e,n,o)=>{const r=jo(t,e),i=jo(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=cn(s,a,l,c),d=r.topRight.y-r.topRight.x/2,h=r.bottomCentre.y-r.bottomCentre.x/2,f=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=cn(d,h,f,m),k=r.topLeft.y+r.topLeft.x/2,O=r.bottomCentre.y+r.bottomCentre.x/2,S=i.topLeft.y+i.topLeft.x/2,C=i.bottomCentre.y+i.bottomCentre.x/2,P=cn(k,O,S,C);return u&&v&&P},uu=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,o=e.renderAabb||e.aabb,r=t.state.position,i=e.state.position;if(!cu(r,n,i,o))return 0;for(const s of Js){const a=t.state.position[s],l=a+n[s],c=e.state.position[s],u=c+o[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return qo(e)-qo(t)},qo=t=>t.state.position.x+t.state.position.y-t.state.position.z;class At extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const du=t=>{const e=hu(t);let n=e.length,o=n;const r=new Array(n),i={},s=fu(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new At([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,s.get(f),u)}catch(m){throw m instanceof At?m.hasClosedCycle?m:new At([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function hu(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function fu(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Wo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},It=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},pu=(t,e=new Set(H(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||It(n,r,s);for(const r of e)if(r.fixedZIndex===void 0)for(const i of H(t)){if(i.fixedZIndex!==void 0||o.get(i)?.has(r)||r===i)continue;const s=uu(r,i);if(Wo(o,r,i),s===0){It(n,r.id,i.id),It(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;Wo(n,a,l),It(n,l,a)}return n},Pi=(t,e,n=3)=>{try{return{order:du(t),impossible:!1}}catch(o){if(o instanceof At){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:Pi(t,e,n-1).order,impossible:!0}}else throw o}};class Bi extends ci{}const Jo=(t,e)=>{e.poly([I({}),I({x:t.x}),I({x:t.x,y:t.y}),I({y:t.y})]).poly([I({}),I({z:t.z}),I({y:t.y,z:t.z}),I({y:t.y})]).poly([I({x:t.x}),I({x:t.x,z:t.z}),I(t),I({x:t.x,y:t.y})]).poly([I({z:t.z}),I({x:t.x,z:t.z}),I({x:t.x,y:t.y,z:t.z}),I({y:t.y,z:t.z})])},Zo=(t,e)=>{const n=new W;return Jo(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Jo(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},mu={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class gu{constructor(e){this.renderContext=e;const{item:n}=e,o=mu[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const i=I(n.config.relativePoint);this.#e.addChild(new W().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new W().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new W({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Zo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Zo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new $a({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class bu{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=I(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const vu=({renderContext:{general:{pixiRenderer:t},item:e,room:n},currentRendering:o})=>{const{state:{stoodOnBy:r},config:{times:i}}=e,s=o?.renderProps,a=Ve(e),l=a&&$e(r,n).find(U)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:Xt(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},i),renderProps:{flashing:l,activated:a}}:"no-update"},un=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:o})=>{const r=o?.renderProps,i=Ht(n)??"towards";if(!(r===void 0||i!==r.facingXy4))return"no-update";const a=p(i==="left"||i==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(A.h*(e-1)),a.scale.x=i==="away"||i==="right"?1:-1,{output:a,renderProps:{facingXy4:i}}},Yo={lift:re("shadowMask.smallBlock"),conveyor:ie(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:Ee(t)==="x"})),teleporter:vu,floor:"no-mask",barrier:ie(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:re("shadowMask.smallRound"),block:ie(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:ie(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),movingPlatform:ie(({style:t})=>t==="stepStool"?"shadowMask.stepStool":"shadowMask.fullBlock"),hushPuppy:re("shadowMask.hushPuppy"),portableBlock:ie(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:ie(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:ie(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.fullBlock"),spikes:re("shadowMask.spikes"),switch:re("shadowMask.switch"),pickup:ie(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:re("shadowMask.smallRound"),"monster.dalek":re("shadowMask.dalek"),"monster.turtle":un("turtle"),"monster.skiHead":un("skiHead"),"monster.homingBot":re("shadowMask.smallRound"),joystick:re("shadowMask.joystick"),charles:un("charles",2)},yu=t=>t.type==="monster"?Yo[`monster.${t.config.which}`]:Yo[t.type],xu=new za({alpha:.66});class wu{constructor(e,n){this.renderContext=e,this.#r||(this.#e.filters=xu),n!=="no-mask"&&(this.#t=new Bi(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t;#o={};get#r(){return w.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const o=this.#t.output.children.at(0);if(o===void 0||!(o instanceof fe)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${o}`)}n!==o&&(this.#r||(this.#e.mask=o))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:o}=e,{item:r,general:{pixiRenderer:i},room:s}=this.renderContext,a=n.has(r),l=r.state.position.z+r.aabb.z,c=me(s.items).filter(function(m){return m.shadowCastTexture!==void 0}),u={id:r.id,state:{position:{...r.state.position,z:l}},aabb:{...r.aabb,z:Zs}},d=Object.groupBy(c,f=>{const m=this.#o[f.id]!==void 0,v=n.has(f);return!a&&!v?m?"keepUnchanged":"noShadow":Mn(u,f)?m?"update":"create":"noShadow"});for(const f of ho(d.keepUnchanged,d.update))this.#o[f.id].renderedOnProgression=o;if(d.create)for(const f of d.create){const{times:m}=f.config,v=Xt(i,f.shadowCastTexture,m);v.label=f.id,this.#n.addChild(v),this.#o[f.id]={sprite:v,renderedOnProgression:o}}for(const f of ho(d.create,d.update)){const{sprite:m}=this.#o[f.id],v=I({...dt(f.state.position,r.state.position),z:r.aabb.z});m.x=v.x,m.y=v.y}for(const[f,{sprite:m,renderedOnProgression:v}]of Mt(this.#o))v!==o&&(m.destroy(),delete this.#o[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const Su=t=>{const e=yu(t.item);return e===void 0?void 0:new wu(t,e)};class Cu{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const L=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=x.createBufferSource(),c=bn()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},_e=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},E=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=L({...t}),_e(l,t.gain,s),n!==void 0&&(r?(l=L({...n,loop:!0}),_e(l,n.gain,s)):l.onended=()=>{c&&(l=L({...n,loop:!0}),_e(l,n.gain,s))})):n!==void 0&&(l=L({...n,loop:!0}),_e(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=L({...o}),_e(l,o.gain,s)));else if(c!==u&&e!==void 0){const h=L({...e});_e(h,e.gain,s)}a=!1,c=u}};class Tu{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=E({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class ku{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&L({soundId:"bonus",connectTo:this.output});break}case"disappearing":{L({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,L({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class Jn{constructor(e,n,o=1){this.renderContext=e,this.#e=E({start:n},this.output),this.output.gain.value=o}output=x.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:o,by:r}}}=n,i=o>(e??ut)&&!Sa(wr(r));this.#e(i)}destroy(){}}class Iu{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new Jn(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=x.createGain();#e=x.createGain();#n=E({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:o,items:r}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,a=o===i&&ce(wr(s)).some(l=>Ys(r[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const dn=2;class Ou{constructor(e){this.renderContext=e}output=x.createGain();#e=E({start:{soundId:"conveyorStart",playbackRate:dn},loop:{soundId:"conveyorLoop",playbackRate:dn},stop:{soundId:"conveyorEnd",playbackRate:dn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=ft(e);this.#e(n)}destroy(){this.#e(!1)}}const Pu=3;class Bu{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=L({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Pu*e)}destroy(){}}const Ko={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Qo={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},er={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},tr={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class _u{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Ko[n]!==void 0&&(this.#r=new Jn(e,Ko[n]),this.#r.output.connect(this.output)),Qo[n]!==void 0&&(this.#t=E({change:Qo[n]},this.#e)),tr[n]!==void 0&&(this.#i=E(tr[n],this.#e)),er[n]!==void 0&&(this.#o=E({loop:er[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const a=Bn(o);this.#t(a)}if(this.#r&&this.#r.tick(e),this.#o){const a=r&&!i;this.#o(a)}if(this.#i){const a=!ke(s,_);this.#i(a)}}destroy(){}}class hn{constructor(e){this.renderContext=e;const{general:{soundSettings:n},item:{type:o}}=e,{noFootsteps:r}={...rt.soundSettings,...n};r||(this.#e=x.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=E({loop:{soundId:`${o==="headOverHeels"?"heels":o}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#i.connect(this.output),this.#o=E({start:{soundId:`${o==="headOverHeels"?"head":o}Jump`}},this.#t),this.#r=E({loop:{soundId:`${o==="headOverHeels"?"head":o}Fall`}},this.#t)}output=x.createGain();#e;#n;#t=x.createGain();#o;#r;#i=x.createGain();#l=E({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#s=x.createGain();#a=E({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:o,teleporting:r,jumpStartZ:i,jumped:s,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=ot(n),{teleportingPhase:f,positionZ:m}=this.#c,v=r?r.phase:null,k=s&&l>i&&l>m&&c>0,O=l<m&&c<0&&a===null;this.#r(O),this.#o(k),this.#n!==void 0&&this.#n(!k&&!O&&o==="moving"),h!==void 0&&this.#a(h.carrying!==null);const S=a!==null&&u>(e??ut)&&d[a];if(this.#l(S),v!==null&&v!==f)if(v==="in"){const C=bn().teleportIn,P=x.createBufferSource();P.buffer=C,P.connect(this.output),P.start()}else{const C=bn().teleportOut,P=x.createBufferSource();P.buffer=C,P.connect(this.output),P.start()}this.#c={teleportingPhase:v,positionZ:l}}destroy(){}}class Au{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=ft(e);!o&&r&&L({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Fu{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=E({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Ru{constructor(e){this.renderContext=e}output=x.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:n,stoodOnUntilRoomTime:o}}}}=this,r=ft(n);e!==void 0&&o>e&&!r&&L({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Mu{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?An(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&L({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Du{constructor(e){this.renderContext=e}output=x.createGain();#e=E({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(Ve(e)&&$e(e.state.stoodOnBy,n).some(U))}destroy(){}}class zu{constructor(e){this.renderContext=e,L({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}class Lu extends Jn{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const Eu={lift:Bu,switch:Mu,bubbles:ku,head:hn,heels:hn,headOverHeels:hn,teleporter:Du,monster:_u,conveyor:Ou,spring:Ru,portableBlock:Au,charles:Iu,ball:Tu,pushableBlock:Fu,firedDoughnut:zu,slidingBlock:Lu},$u=t=>{const e=Eu[t.item.type];if(e)return new e(t)},nr=A.h*Ks,or=A.h*-1,Uu=A.w*16,Nu=0,fn=(t,e,n)=>(t-e)/(n-e)*2-1;class Hu{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Kt(ro({x:0,y:o})),this.positionMaxX=Kt(ro({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=$(o.position,D(n.aabb,.5)),i=fn(Kt(r),this.positionMaxX,this.positionMinX),s=fn(r.z,or,nr);if(!Number.isFinite(s))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${or},
          ${nr},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(o.position)},
          scaleXyz(${JSON.stringify(n.aabb)}, 0.5),
        )`);const a=fn(r.x+r.y,Nu,Uu);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const Gu=[new Lt(g.midRed)],Vu=[new Lt(g.moss)],Xu=75;class ju{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:o}},room:{roomTime:r}}}=this;this.output.filters=r-n<Xu?o==="left"?Vu:Gu:oe,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const qu=g.moss,Wu=()=>new st({outlineColor:qu,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale});class Ju{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new b({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:n}=this.renderContext.item.state;n!==!this.#e&&(this.output.filters=n?[Wu()]:oe),this.#e=n,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Zu=(t,e,n)=>Ln(t)?new Ju(e,n):n,Yu=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Ku=t=>{const e=w.getState(),n=Qs(e),o=!ea(e),{item:r,general:{gameState:i}}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[],l=pi(r);if(l!==void 0){const f=new Bi(t,l),m=new ju(t,f);a.push(Zu(r,t,m)),s&&(m.output.alpha=.66)}if(o){const f=Su(t);f!==void 0&&a.push(f)}s&&a.push(new gu(t));let c;if(a.length===0)c=void 0;else{const f=a.length===1?a[0]:new Qu(a,t);Yu(r,f.output,i),c=new bu(t,f)}const u=t.general.soundSettings.mute??rt.soundSettings.mute,d=t.general.paused||u?void 0:$u(t),h=d===void 0?void 0:new Hu(t,d);return new Cu(t,{graphics:c,sound:h})};class Qu{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Ae=.33,ed=ta()==="mobile"?-4:16,Pn=Le.h-Le.w/2,td=pe.heels,nd=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Nt(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-ed-i.y-Math.abs(c/2)},d=u.x+a<0,h=u.x+l>n.x,f=u.y+s-Pn<0;return(m,v,k)=>{if(m===void 0)return;const O=I(m.state.position),S=$(O,u),C={x:d&&S.x<n.x*Ae?Math.min(-a,n.x*Ae-O.x):h&&S.x>n.x*(1-Ae)?Math.max(n.x-l,n.x*(1-Ae)-O.x):u.x,y:f&&S.y<n.y*Ae?n.y*Ae-O.y:u.y};if(k)e.x=C.x,e.y=C.y;else{const P=td*v,z=dt(e,C),V=Fn(z);if(V>P){const Zt={x:z.x/V,y:z.y/V};e.x-=Zt.x*P,e.y-=Zt.y*P}else e.x=C.x,e.y=C.y}}},od=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Nt(t);return new W().rect(e+o.x,r-Pn,n-e,o.y-r+Pn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class rd{constructor(e){this.renderContext=e;const{general:{displaySettings:n,upscale:o,colourised:r,soundSettings:i}}=e;this.initFilters(r,e.room.color);const a=i.mute??rt.soundSettings.mute?void 0:x.createGain();this.output={sound:a,graphics:new b({children:[this.#e,this.#n],label:`RoomRenderer(${e.room.id})`})},(n?.showBoundingBoxes??rt.displaySettings.showBoundingBoxes)!=="none"&&this.output.graphics.addChild(od(e.room.roomJson)),this.#i=nd(e.room,this.output.graphics,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});output;#t=void 0;#o=new Map;#r=new Map;#i;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?qa:oe:new N(Vn(n).main.original)}#l(e){const{room:n}=this.renderContext,o={...e,lastRenderRoomTime:this.#t};for(const r of me(n.items)){let i=this.#r.get(r.id);if(i===void 0){i=Ku({...this.renderContext,item:r}),this.#r.set(r.id,i);const s=r.type==="floorEdge"?this.#n:this.#e,{graphics:a,sound:l}=i.output;if(a&&(s.addChild(a),r.fixedZIndex&&(a.zIndex=r.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{i.tick(o)}catch(s){throw new Error(`RoomRenderer caught error while ticking item "${r.id}" - item JSON is:
           ${JSON.stringify(r,null,2)}`,{cause:s})}}for(const[r,i]of this.#r.entries())n.items[r]===void 0&&(i.destroy(),this.#r.delete(r))}#s(e){const{order:n}=Pi(pu(this.renderContext.room.items,e.movedItems,this.#o),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);const i=r.output.graphics;if(i)i.zIndex=n.length-o;else throw new Error(`order ${n[o]} was given a z-order by sorting, but item has no graphics`)}}get#a(){return this.#t!==void 0}tick(e){const n=this.#a?e:{...e,movedItems:new Set(me(this.renderContext.room.items))};this.#i(Ge(this.renderContext.general.gameState),e.deltaMS,!this.#a),this.#l(n),(!this.#a||n.movedItems.size>0)&&this.#s(n),this.#t=this.renderContext.room.roomTime}destroy(){this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Wt=`in vec2 aPosition;
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
`,Jt=`struct GlobalFilterUniforms {
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
}`,id=`precision highp float;
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
`,sd=`struct CRTUniforms {
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
}`,ad=Object.defineProperty,ld=(t,e,n)=>e in t?ad(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ft=(t,e,n)=>(ld(t,typeof e!="symbol"?e+"":e,n),n);const _i=class Ai extends Y{constructor(e){e={...Ai.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Jt,entryPoint:"mainVertex"},fragment:{source:sd,entryPoint:"mainFragment"}}),o=G.from({vertex:Wt,fragment:id,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ft(this,"uniforms"),Ft(this,"seed"),Ft(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ft(_i,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let cd=_i;var ud=`
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
}`,dd=`struct KawaseBlurUniforms {
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
}`,hd=`
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
`,fd=`struct KawaseBlurUniforms {
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
}`,pd=Object.defineProperty,md=(t,e,n)=>e in t?pd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ve=(t,e,n)=>(md(t,typeof e!="symbol"?e+"":e,n),n);const Fi=class Ri extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(nt("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Ri.DEFAULT_OPTIONS,...n};const o=Ce.from({vertex:{source:Jt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?fd:dd,entryPoint:"mainFragment"}}),r=G.from({vertex:Wt,fragment:n?.clamp?hd:ud,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ve(this,"uniforms"),ve(this,"_pixelSize",{x:0,y:0}),ve(this,"_clamp"),ve(this,"_kernels",[]),ve(this,"_blur"),ve(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=Re.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),Re.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};ve(Fi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let gd=Fi;var bd=`in vec2 vTextureCoord;
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
`,vd=`struct AdvancedBloomUniforms {
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
`,yd=`
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
`,xd=`struct ExtractBrightnessUniforms {
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
`,wd=Object.defineProperty,Sd=(t,e,n)=>e in t?wd(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Mi=(t,e,n)=>(Sd(t,typeof e!="symbol"?e+"":e,n),n);const Di=class zi extends Y{constructor(e){e={...zi.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Jt,entryPoint:"mainVertex"},fragment:{source:xd,entryPoint:"mainFragment"}}),o=G.from({vertex:Wt,fragment:yd,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Mi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Mi(Di,"DEFAULT_OPTIONS",{threshold:.5});let Cd=Di;var Td=Object.defineProperty,kd=(t,e,n)=>e in t?Td(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Fe=(t,e,n)=>(kd(t,typeof e!="symbol"?e+"":e,n),n);const Li=class Ei extends Y{constructor(e){e={...Ei.DEFAULT_OPTIONS,...e};const n=Ce.from({vertex:{source:Jt,entryPoint:"mainVertex"},fragment:{source:vd,entryPoint:"mainFragment"}}),o=G.from({vertex:Wt,fragment:bd,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:xe.WHITE}}),Fe(this,"uniforms"),Fe(this,"bloomScale",1),Fe(this,"brightness",1),Fe(this,"_extractFilter"),Fe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Cd({threshold:e.threshold}),this._blurFilter=new gd({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Re.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Re.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Re.returnTexture(s),Re.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Fe(Li,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Id=Li;const Od=ne,Pd=(t,e)=>(n,o)=>{const r=new Set;if(na(n)){const u=we(n)?.items;if(u!==void 0){const d=ce(H(Dn(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const s=o*n.gameSpeed,a=Math.ceil(s/e),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)r.add(h)}const c=we(n)?.items??Od;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},rr=({crtFilter:t},e)=>[t?new cd({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Id({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Bd{constructor(e,n){this.app=e,this.gameState=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#i.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,we(n)===void 0)throw new Error("main loop with no starting room");this.#a()}catch(o){this.#s(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#i=x.createGain();#l=Pd(lu,la);#s(e){w.dispatch(oa(ra(e)))}#a(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=rr(e,!0),this.#n=rr(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const o=new Error("Error caught in main loop tick",{cause:n});console.error(o),this.#s(o)}};tick=({deltaMS:e})=>{const n=w.getState(),o=ia(n),{gameMenus:{userSettings:{displaySettings:r,soundSettings:i},upscale:s}}=w.getState(),a=!o&&!(r?.uncolourised??rt.displaySettings.uncolourised),l=sa(n),c=aa(n);(this.#t?.renderContext.general.colourised!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Mc({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#t.output));const u=we(this.gameState);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=o?Rn:this.#l(this.gameState,e),h=we(this.gameState);(this.#o?.renderContext.room!==h||this.#o?.renderContext.general.upscale!==s||this.#o?.renderContext.general.displaySettings!==r||this.#o?.renderContext.general.soundSettings!==i||this.#o?.renderContext.general.paused!==o)&&(this.#o?.destroy(),h?(this.#o=new rd({general:{gameState:this.gameState,paused:o,pixiRenderer:this.app.renderer,displaySettings:r,soundSettings:i,colourised:a,upscale:s},room:h}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound?.connect(this.#i),this.gameState.events.emit("roomChange",h.id)):this.#o=void 0,this.app.stage.scale=s.gameEngineUpscale,this.#a()),this.#o?.tick({progression:this.gameState.progression,movedItems:d,deltaMS:e}),o?this.app.stage.filters=this.#e:this.app.stage.filters=this.#n};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#r),this.#i.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Et.add(kr,Ir,Or,Pr,Br,_r,Ar,Fr,Rr,Mr,Dr,Lr,zr,Er,$r,Ur,Nr,Hr,Gr,Vr,Xr);da.defaultOptions.scaleMode="nearest";const ir=async(t,e)=>{const n=new Qr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=ca;const o=w.getState().gameMenus.currentGame,r=io({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(ua(o.store.gameMenus)):(w.dispatch(so(r.characterRooms.head.id)),w.dispatch(so(r.characterRooms.heels.id)));const i=new Bd(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Ge(r);a!==void 0&&En({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return we(r)},get gameState(){return r},reincarnateFrom(s){io({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Dd=Object.freeze(Object.defineProperty({__proto__:null,default:ir,gameMain:ir},Symbol.toStringTag,{value:"Module"}));export{Jr as A,jr as C,Y as F,Hn as R,Pa as S,Zr as V,Ra as a,Dd as g,Oa as u};
