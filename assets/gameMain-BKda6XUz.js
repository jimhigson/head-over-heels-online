const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BsT-d7ih.js","assets/App-C3yXwgfw.js","assets/index-GhMPIVJi.js","assets/index-NsOBDBt9.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-Bn3RMHjg.js","assets/Graphics-BsBVkj54.js","assets/changeCharacterRoom-CiCImqyw.js","assets/WebGLRenderer-DfQAbZUE.js"])))=>i.map(i=>d[i]);
import{b8 as Os,b9 as _o,ba as Ps,an as _s,ar as Pe,as as $,af as Bo,ao as ie,_ as I,a3 as Yt,a1 as Bs,a4 as v,d as Xe,v as ft,aH as y,a7 as In,az as be,$ as lt,a0 as Rs,ah as As,bb as $e,V as Ro,bc as Fs,a2 as On,bd as Ms,be as zs,ae as Ds,bf as J,bg as cr,S as w,bh as Ls,bi as se,bj as V,bk as Un,e as qe,bl as We,O as C,o as Z,h as O,bm as Es,bn as $s,bo as Us,l as A,E as Ye,bp as Ns,bq as Nn,br as Ao,bs as Fo,bt as Mo,bu as Gs,bv as Et,P as Q,bw as Gn,bx as x,by as ue,bz as vt,p as Jt,bA as $t,bB as Vs,bC as Hs,bD as js,bE as ur,bF as Xs,bG as qs,bH as zo,m as ae,b as Zt,k as Qt,bI as de,bJ as _e,bK as yt,bL as ve,bM as xt,bN as Vn,n as j,bO as ye,bP as q,i as wt,bQ as Hn,B as Do,bR as jn,bS as je,bT as Lo,bU as ct,bV as Xn,bW as Ws,bX as Ys,b3 as ge,bY as Js,bZ as Zs,Q as pt,b_ as Ut,j as Eo,q as F,b$ as xe,c0 as qn,c1 as Qs,c2 as $o,c3 as Uo,c4 as No,c5 as Kt,c6 as dr,c7 as Go,c8 as Ks,C as Je,c9 as Be,ca as Xt,x as Re,cb as ea,cc as ta,cd as na,ce as ra,cf as Vo,I as Ze,cg as oa,ch as ia,ci as sa,cj as Pn,ck as aa,cl as la,cm as Tt,cn as ca,co as ua,cp as da,r as Ae,cq as Ho,K as jo,cr as hr,cs as Xo,ct as Wn,y as qo,f as Wo,u as ha,b4 as Qe,cu as dn,cv as kt,cw as fa,cx as pa,cy as nt,cz as fr,cA as ma,cB as ga,cC as ba,cD as va,cE as Yo,cF as ya,cG as xa,cH as wa,cI as Sa,cJ as Ca,cK as Ta,cL as ka,cM as Ia,cN as pr,T as mr,A as Jo,cO as Zo,b7 as Qo,M as Ko,N as Oa,J as gr,cP as Pa,cQ as _a,cR as Ba,cS as Ra,D as fe,cT as Aa,cU as S,cV as _n,cW as St,cX as hn,R as br,cY as Fa,cZ as Ma,c_ as za,aT as Da,ax as Ue,c$ as La,d0 as Ea,d1 as $a,d2 as Ua,d3 as Na,d4 as Ga,d5 as Va,d6 as Ha,d7 as ja,d8 as Xa,d9 as vr,da as qa,U as yr,db as Wa}from"./App-C3yXwgfw.js";import{f as Bn,c as Yn,m as en,a as Jn,b as ei,r as Ya,o as Ja}from"./changeCharacterRoom-CiCImqyw.js";import{S as Za,G as H}from"./Graphics-BsBVkj54.js";import{g as ti,_ as xr}from"./index-GhMPIVJi.js";var It={},wr;function Qa(){if(wr)return It;wr=1;var t=Os(),e=t.mark(i),n=_o(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){b.next=8;break}return h=d[u],b.delegateYield(o(h),"t0",5);case 5:u++,b.next=2;break;case 8:case"end":return b.stop()}},e)}It.__concat=i;var s=r(i);return It.concat=s,It}var Ot={},Sr;function Ka(){if(Sr)return Ot;Sr=1;var t=_o(),e=t.iterableCurry,n=Ps(),r=n.__firstOr,o=Symbol("none");function i(a){return r(a,o)===o}Ot.__isEmpty=i;var s=e(i,{reduces:!0});return Ot.isEmpty=s,Ot}var fn,Cr;function el(){return Cr||(Cr=1,fn=Qa().concat),fn}var tl=el();const Tr=ti(tl);var pn,kr;function nl(){return kr||(kr=1,pn=Ka().isEmpty),pn}var rl=nl();const ol=ti(rl),ni=class Rn extends _s{constructor(e){e={...Rn.defaultOptions,...e},super(e),this.enabled=!0,this._state=Za.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=Pe.from(n)),r&&(s=$.from(r)),new Rn({gpuProgram:i,glProgram:s,...o})}};ni.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let N=ni;var il=`
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
`,sl=`in vec2 aPosition;
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
`,al=`
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
}`;class P extends N{constructor(e){const n=e.gpu,r=Ir({source:al,...n}),o=Pe.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Ir({source:il,...i}),a=$.from({vertex:sl,fragment:s}),l=new Bo({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:ie.EMPTY}})}}function Ir(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Zn=`
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
    `,Qn=`
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
	`;class ri extends P{constructor(){super({gl:{functions:`
                ${Zn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Qn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ri.extension={name:"color",type:I.BlendMode};class oi extends P{constructor(){super({gl:{functions:`
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
            `}})}}oi.extension={name:"color-burn",type:I.BlendMode};class ii extends P{constructor(){super({gl:{functions:`
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
                `}})}}ii.extension={name:"color-dodge",type:I.BlendMode};class si extends P{constructor(){super({gl:{functions:`
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
                `}})}}si.extension={name:"darken",type:I.BlendMode};class ai extends P{constructor(){super({gl:{functions:`
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
            `}})}}ai.extension={name:"difference",type:I.BlendMode};class li extends P{constructor(){super({gl:{functions:`
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
            `}})}}li.extension={name:"divide",type:I.BlendMode};class ci extends P{constructor(){super({gl:{functions:`
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
            `}})}}ci.extension={name:"exclusion",type:I.BlendMode};class ui extends P{constructor(){super({gl:{functions:`
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
                `}})}}ui.extension={name:"hard-light",type:I.BlendMode};class di extends P{constructor(){super({gl:{functions:`
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
            `}})}}di.extension={name:"hard-mix",type:I.BlendMode};class hi extends P{constructor(){super({gl:{functions:`
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
            `}})}}hi.extension={name:"lighten",type:I.BlendMode};class fi extends P{constructor(){super({gl:{functions:`
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
                `}})}}fi.extension={name:"linear-burn",type:I.BlendMode};class pi extends P{constructor(){super({gl:{functions:`
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
            `}})}}pi.extension={name:"linear-dodge",type:I.BlendMode};class mi extends P{constructor(){super({gl:{functions:`
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
            `}})}}mi.extension={name:"linear-light",type:I.BlendMode};class gi extends P{constructor(){super({gl:{functions:`
                ${Zn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Qn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}gi.extension={name:"luminosity",type:I.BlendMode};class bi extends P{constructor(){super({gl:{functions:`
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
            `}})}}bi.extension={name:"negation",type:I.BlendMode};class vi extends P{constructor(){super({gl:{functions:`
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
                `}})}}vi.extension={name:"overlay",type:I.BlendMode};class yi extends P{constructor(){super({gl:{functions:`
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
                `}})}}yi.extension={name:"pin-light",type:I.BlendMode};class xi extends P{constructor(){super({gl:{functions:`
                ${Zn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Qn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}xi.extension={name:"saturation",type:I.BlendMode};class wi extends P{constructor(){super({gl:{functions:`
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
                `}})}}wi.extension={name:"soft-light",type:I.BlendMode};class Si extends P{constructor(){super({gl:{functions:`
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
                `}})}}Si.extension={name:"subtract",type:I.BlendMode};class Ci extends P{constructor(){super({gl:{functions:`
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
                `}})}}Ci.extension={name:"vivid-light",type:I.BlendMode};const An=[];Yt.handleByNamedList(I.Environment,An);async function ll(t){if(!t)for(let e=0;e<An.length;e++){const n=An[e];if(n.value.test()){await n.value.load();return}}}let rt;function cl(){if(typeof rt=="boolean")return rt;try{rt=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{rt=!1}return rt}var Ti=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Ti||{});class ul{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const dl=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],ki=class Ii extends Bs{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...dl,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await ll(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Ii.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof v&&(r={container:r},n&&(Xe(ft,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:y.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Ti.ALL);const{clear:r,clearColor:o,target:i}=e;y.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ul(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!cl())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};ki.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Oi=ki,Pt;function hl(t){return Pt!==void 0||(Pt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Oi.defaultOptions.failIfMajorPerformanceCaveat};try{if(!In.get().getWebGLRenderingContext())return!1;let r=In.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Pt}let _t;async function fl(t={}){return _t!==void 0||(_t=await(async()=>{const e=In.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),_t}const Or=["webgl","webgpu","canvas"];async function pl(t){let e=[];t.preference?(e.push(t.preference),Or.forEach(i=>{i!==t.preference&&e.push(i)})):e=Or.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await fl()){const{WebGPURenderer:a}=await xr(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-BsT-d7ih.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&hl(t.failIfMajorPerformanceCaveat??Oi.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await xr(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-DfQAbZUE.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Pi="8.8.1";class _i{static init(){globalThis.__PIXI_APP_INIT__?.(this,Pi)}static destroy(){}}_i.extension=I.Application;class ml{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Pi)}destroy(){this._renderer=null}}ml.extension={type:[I.WebGLSystem,I.WebGPUSystem],name:"initHook",priority:-10};const Bi=class Fn{constructor(...e){this.stage=new v,e[0]!==void 0&&Xe(ft,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await pl(e),Fn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Xe(ft,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Fn._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Bi._plugins=[];let Ri=Bi;Yt.handleByList(I.Application,Ri._plugins);Yt.add(_i);var gl=`in vec2 aPosition;
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
`,bl=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Pr=`struct GlobalFilterUniforms {
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
}`;const Ai=class Fi extends N{constructor(e){e={...Fi.defaultOptions,...e};const n=Pe.from({vertex:{source:Pr,entryPoint:"mainVertex"},fragment:{source:Pr,entryPoint:"mainFragment"}}),r=$.from({vertex:gl,fragment:bl,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Bo({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Ai.defaultOptions={alpha:1};let vl=Ai;class mt extends be{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof ie?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(lt.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(lt.shared.add(this.update,this,Rs.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(ie.from(e[r]));return new mt(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(ie.from(e[r]));return new mt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof ie)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(lt.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(lt.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class yl{constructor({matrix:e,observer:n}={}){this.dirty=!0,this._matrix=e??new As,this.observer=n,this.position=new $e(this,0,0),this.scale=new $e(this,1,1),this.pivot=new $e(this,0,0),this.skew=new $e(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const Mi=class Nt extends Ro{constructor(...e){let n=e[0]||{};n instanceof ie&&(n={texture:n}),e.length>1&&(Xe(ft,"use new TilingSprite({ texture, width:100, height:100 }) instead"),n.width=e[1],n.height=e[2]),n={...Nt.defaultOptions,...n};const{texture:r,anchor:o,tilePosition:i,tileScale:s,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=n??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new $e({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=r,this._width=l??r.width,this._height=c??r.height,this._tileTransform=new yl({observer:{_onUpdate:()=>this.onViewUpdate()}}),o&&(this.anchor=o),this.tilePosition=i,this.tileScale=s,this.tileRotation=a,this.roundPixels=d??!1}static from(e,n={}){return typeof e=="string"?new Nt({texture:Fs.get(e),...n}):new Nt({texture:e,...n})}get uvRespectAnchor(){return On("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){On("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=ie.EMPTY);const n=this._texture;n!==e&&(n&&n.dynamic&&n.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,n){typeof e=="object"&&(n=e.height??e.width,e=e.width),this._width=e,this._height=n??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,n=this._anchor,r=this._width,o=this._height;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*o,e.maxY=e.minY+o}containsPoint(e){const n=this._width,r=this._height,o=-n*this._anchor._x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this._anchor._y,e.y>=i&&e.y<=i+r)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const r=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(r)}this._texture=null}};Mi.defaultOptions={texture:ie.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let xl=Mi;class wl extends Ro{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new $e({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Sl(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Xe(ft,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Cl extends wl{constructor(...e){const n=Sl(e,"Text");super(n,Ms),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=zs.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class Kn extends ie{static create(e){return new Kn({source:new Ds(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}const zi=class Di extends v{constructor(e={}){e={...Di.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let n=0;n<e.length;n++){const r=e[n];if(r.parentRenderLayer){if(r.parentRenderLayer===this)continue;r.parentRenderLayer.detach(r)}this.renderLayerChildren.push(r),r.parentRenderLayer=this;const o=this.renderGroup||this.parentRenderGroup;o&&(o.structureDidChange=!0)}return e[0]}detach(...e){for(let n=0;n<e.length;n++){const r=e[n],o=this.renderLayerChildren.indexOf(r);o!==-1&&this.renderLayerChildren.splice(o,1),r.parentRenderLayer=null;const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let n=0;n<e.length;n++)e[n].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,n,r){const o=this.renderLayerChildren,i=o.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let s=0;s<i;s++)o[s].parent||On("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",o[s]),o[s].collectRenderables(e,n,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,n,r){if(!e)return;const o=this.renderLayerChildren;for(let i=0;i<o.length;i++)o[i]._getGlobalBoundsRecursive(!0,n,this)}};zi.defaultOptions={sortableChildren:!1,sortFunction:(t,e)=>t.zIndex-e.zIndex};let Tl=zi;const _r=Tl,p={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Gt=.33,Li=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e*.75,g:n*.75,b:r*.75})},Ie=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e*Gt,g:n*Gt,b:r*Gt})},W={original:new y(J.zxWhite),basic:p.white,dimmed:p.lightGrey},Y={original:new y(J.zxYellow),basic:p.midRed,dimmed:p.redShadow},ee={original:new y(J.zxMagenta),basic:p.pink,dimmed:Ie(p.pink)},R={original:new y(J.zxCyan),basic:p.pastelBlue,dimmed:Ie(p.pastelBlue)},te={original:new y(J.zxGreen),basic:p.moss,dimmed:Ie(p.moss)},er={white:{basic:{main:W,edges:{towards:{...R,dimInOriginal:!1},right:{...Y,dimInOriginal:!0}},hud:{lives:Y,dimmed:ee,icons:R}},dimmed:{main:W,edges:{towards:{...te,dimInOriginal:!1},right:{...R,dimInOriginal:!0}},hud:{lives:Y,dimmed:ee,icons:R}}},yellow:{basic:{main:Y,edges:{towards:{...te,dimInOriginal:!1},right:{...W,dimInOriginal:!0}},hud:{lives:R,dimmed:ee,icons:te}},dimmed:{main:Y,edges:{towards:{...R,dimInOriginal:!0},right:{...R,dimInOriginal:!1}},hud:{lives:R,dimmed:ee,icons:te}}},magenta:{basic:{main:ee,edges:{towards:{...te,dimInOriginal:!0},right:{...R,dimInOriginal:!0}},hud:{lives:W,dimmed:R,icons:Y}},dimmed:{main:ee,edges:{towards:{...te,dimInOriginal:!0},right:{...R,dimInOriginal:!0}},hud:{lives:W,dimmed:R,icons:Y}}},cyan:{basic:{main:R,edges:{towards:{...ee,dimInOriginal:!1},right:{...W,dimInOriginal:!1}},hud:{lives:W,dimmed:te,icons:Y}},dimmed:{main:R,edges:{towards:{...ee,dimInOriginal:!0},right:{...W,dimInOriginal:!0}},hud:{lives:W,dimmed:te,icons:Y}}},green:{basic:{main:te,edges:{towards:{...R,dimInOriginal:!1},right:{...Y,dimInOriginal:!1}},hud:{lives:W,dimmed:ee,icons:R}},dimmed:{main:te,edges:{towards:{...R,dimInOriginal:!0},right:{...Y,dimInOriginal:!0}},hud:{lives:W,dimmed:ee,icons:R}}}},gt=t=>er[t.hue][t.shade],Ne={head:p.pastelBlue,heels:p.pink},Vt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+cr>n?100-Math.ceil((n-e)/(cr/100)):0},Ei=t=>t.type==="headOverHeels"?Vt(t.state.head)>0||Vt(t.state.heels)>0:Vt(t.state)>0,tr=t=>{const e=100*w.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/w.w):0},kl={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},Fe=`in vec2 aPosition;
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
`,Il=`in vec2 vTextureCoord;
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
`;class le extends N{constructor(e){const n=Object.keys(e).length,r=$.from({vertex:Fe,fragment:Il.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{p[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Ol=`precision mediump float;
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
`;class E extends N{uniforms;constructor(e="white"){const n=$.from({vertex:Fe,fragment:Ol,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const Pl=`precision mediump float;
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
`;class _l extends N{constructor(){const e=$.from({vertex:Fe,fragment:Pl,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const $i=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Ui=t=>$i(er[t.color.hue][t.color.shade].main),Ni=t=>new le({lightBeige:p.lightGrey,redShadow:p.shadow,pink:p.lightGrey,moss:p.lightGrey,midRed:p.midGrey,highlightBeige:p.lightGrey,...t&&Ui(t)}),Bl=new le({midGrey:p.midRed,lightGrey:p.lightBeige,white:p.highlightBeige,metallicBlue:p.redShadow,pink:p.midRed,moss:p.midRed,replaceDark:p.midRed,replaceLight:p.lightBeige}),Rl=t=>new le({replaceLight:t,replaceDark:Ie(t)}),Br=(t,e)=>{const n=gt(t.color).edges[e],r=n.original;return n.dimInOriginal?Li(r):r},Gi=(t,e,n)=>n?new le($i(er[t.color.hue][t.color.shade].edges[e])):new E(gt(t.color).edges[e].original),he=t=>new le(Ui(t)),Al=t=>{switch(t.color.hue){case"white":return new le({replaceLight:p.lightGrey,replaceDark:p.midGrey});default:return he(t)}},Vi=t=>{switch(t.color.hue){case"white":return new le({replaceLight:p.lightBeige,replaceDark:p.midRed,shadow:p.redShadow});default:return he(t)}},Rr=new _l,X=Ls,Fl=new le(kl),Ar={x:.5,y:1},Fr=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),Mn=t=>{if(typeof t=="string")return Mn({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(Fr(t)?c=Ml(t):c=new be(se().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...a},d=new v({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let g=1;g<=u.z;g++){const b={...t,textureId:t.textureId??t.textureIdCallback?.(h-1,f-1,g-1),label:`(${h},${f},${g})`};delete b.times;const T=Mn(b),_=V({x:h-1,y:f-1,z:g-1});T.x+=_.x,T.y+=+_.y,d.addChild(T)}return d}if(e===void 0&&r===void 0)if(Fr(t))c.anchor=Ar;else{const u=se().data.frames[t.textureId];if(u===void 0)throw new Error(`no spritesheet entry for textureId "${t.textureId}"`);const d=u.frame;d.pivot!==void 0?c.pivot=d.pivot:c.anchor=Ar}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},m=Mn;function Ml({animationId:t,reverse:e,playOnce:n,paused:r,randomiseStartFrame:o}){const i=se().animations[t],a=(r?[i[0]]:i).map(c=>({texture:c,time:Un}));e&&a.reverse();const l=new mt(a);return l.animationSpeed=qe.animations[t].animationSpeed,l.gotoAndPlay(o?Math.floor(Math.random()*a.length):0),n!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),n==="and-destroy"&&(l.visible=!1)}),l}const zl=`#version 300 es

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
`;class Oe extends N{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=$.from({vertex:Fe,fragment:zl,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const re=new Oe({outlineColor:p.pureBlack,upscale:We(C.getState()),lowRes:!0}),ut=new E,Mr=new E,nr=new E,zr=new E(p.moss),dt=new E,ne=[ut,re],Dl=[dt,re],Ll=[re,nr],Bt={original:[re,dt],colourised:{head:{active:[re,new E(Ne.head)],inactive:[re,new E(Ie(Ne.head))]},heels:{active:[re,new E(Ne.heels)],inactive:[re,new E(Ie(Ne.heels))]}}},Me=14,El=2,$l=Math.cos(30*(Math.PI/180)),Ul=40;class Nl{constructor(e){this.renderContext=e;const{inputDirectionMode:n,general:{colourised:r}}=e;this.arrowSprites={away:m({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Me,y:-14,filter:ne}),right:m({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Me,y:Me,filter:ne}),towards:m({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Me,filter:ne}),left:m({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ne}),...n!=="4-way"?{awayRight:m({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Me*Math.SQRT2,filter:ne}),towardsRight:m({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Me*Math.SQRT2,filter:ne}),towardsLeft:m({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ne}),awayLeft:m({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ne})}:{}},this.output.addChild(this.#e),this.output.addChild(new H().circle(0,0,Ul).fill("#00000000"));for(const o of Z(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=r?X:ut}output=new v({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=m({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=O};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Es(C.getState()),{x:r,y:o}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=$s({x:-c,y:-u}),h=Us(d,$l),f=A(h,El);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(C.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const r=Ye(e)>Ns?Nn(e):void 0;for(const[o,i]of Ao(this.arrowSprites))i.filters=o===r?Dl:ne}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const zn={colourised:{jump:p.pastelBlue,fire:p.highlightBeige,carry:p.moss,carryAndJump:p.midRed,menu:p.lightGrey,map:p.lightGrey},zx:{jump:J.zxBlue,fire:J.zxYellow,carry:J.zxGreen,carryAndJump:J.zxRed,menu:J.zxWhite,map:J.zxWhite}};function tn(t,e){const n=e||new v;for(const r of t)n.addChild(r);return n}function*Gl(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=Fo(e);let r=0;for(const o of e){const i=`hud.char.${Gs(o)}`;try{Mo(i)}catch(s){throw new Error(`no texture id for char "${o}": ${s.message}`,{cause:s})}yield m({textureId:i,x:(r+.5-n/2)*Et.w}),r++}}const oe=(t,e)=>{t.removeChildren();try{tn(Gl(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Ge=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new v({label:n,filters:e?Ll:nr,scale:{x:1,y:t?2:1}}),qt=Symbol(),Hi=Symbol(),ji=Symbol(),Rt=({colourised:t,button:{which:e}})=>{const n=new v({label:"depress"}),r=new v({label:"arcadeButton"});r.addChild(n);const o=m("button");t?o.filters=Rl(zn.colourised[e]):r.filters=new E(zn.zx[e]),n.addChild(o);const i=new v({label:"surface"}),s=m({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),r[Hi]=o,r[qt]=i,r[ji]=n,r},ot=(t,...e)=>{t[qt].removeChildren();for(const n of e)n!==void 0&&t[qt].addChild(n)},At=(t,e)=>{t[Hi].texture=se().textures[e?"button.pressed":"button"],t[ji].y=e?1:0},Dr=(t,e,n)=>{n&&(t[qt].filters=e?Ni():X)},Lr=({which:t},e,n)=>{const r=oe(new v,n);return r.filters=new le({white:e?Ie(zn.colourised[t]):p.pureBlack}),r};class Xi{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new v({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&this.output.removeChild(this.#e.output),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const Vl=(t,e,n)=>{const o=se().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&se().textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},qi=(t,e)=>{const n=e.getLocalBounds(),r=Kn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new be({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},nn=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=m({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof be?o:qi(t,o)},pe=t=>z(({renderContext:{item:e}})=>Gn(e)?m({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):m(t)),G=t=>z(({renderContext:{item:e,general:{pixiRenderer:n}}})=>{if(Gn(e))return nn(n,t,e.config.times);{const r=m(t);return r instanceof be?r:qi(n,r)}}),z=t=>({renderContext:e,currentRendering:n,tickContext:r})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:r}),renderProps:Q}:"no-update",Se=t=>({renderContext:{general:{pixiRenderer:e},item:n},currentRendering:r})=>{if(r===void 0){const o=Gn(n)?n.config.times:void 0,i={output:nn(e,t(n.config),o),renderProps:Q};return o&&(i.output.y-=((o.z??1)-1)*w.h),i}else return"no-update"};function*Hl({config:{direction:t,inHiddenWall:e,height:n}},r){const o=vt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=m({textureId:`generic.door.floatingThreshold.${o}`,...$t(a,{y:-12*n})});l.filters=Gi(r,o==="x"?"towards":"right",!0),yield l}}else{yield m({pivot:{x:i,y:9},textureId:`generic.door.legs.base.${o}`,...$t(a,{})});for(let l=1;l<n;l++)yield m({pivot:{x:i,y:9},textureId:`generic.door.legs.pillar.${o}`,...$t(a,{y:-l*w.h})})}}yield*s(V({...ue,[o]:1})),yield*s(ue),e||(yield m({pivot:{x:16,y:w.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...V({...ue,[o]:1})}))}const Wi=(t,e)=>{const n=vt(t),r=Jt(n),o=8;return t==="towards"||t==="right"?x({[r]:e[r]-o}):ue},jl=z(({renderContext:{item:t,room:e}})=>tn(Hl(t,e),new v({filters:he(e),...Wi(t.config.direction,t.aabb)}))),Xl=z(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:r},room:o,general:{gameState:i}}})=>{const s=vt(t),a=i===void 0?o:i.campaign.rooms[n];return m({textureId:Vl(o,s,e),filter:he(a),...Wi(t,r)})}),mn={animationId:"bubbles.cold"},Ve=({top:t,bottom:e="headlessBase",filter:n})=>{const r=new v({filters:n}),o=m(e);r.addChild(o);const i=m(t);return i.y=-12,r.addChild(i),r[rn]=i,r[rr]=o,r},rn=Symbol(),rr=Symbol(),ql=({top:t,bottom:e})=>{const n=new v;return n.addChild(e),t.y=-12,n.addChild(t),n[rn]=t,n[rr]=e,n},Wl=`#version 300 es

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
`;class Wt extends N{constructor(e){const n=$.from({vertex:Fe,fragment:Wl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const ht=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Vs},on=t=>t,Dn=.02,Yl=({name:t,action:e,facingXy8:n,teleportingPhase:r,gravityZ:o,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(r==="out")return{animationId:`${t}.fadeOut`,paused:i};if(r==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:o<Dn?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`};if(e==="falling"){const a=`${t}.falling.${n}`;if(qs(a))return{textureId:a}}const s=`${t}.idle.${n}`;return zo(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},Ln=Symbol(),En=Symbol(),Jl=(t,e)=>{t[Ln].removeChildren(),t[Ln].addChild(m(Yl(e)))},Yi=new le({pastelBlue:p.pink}),gn=(t,e,n)=>{const r=new v,o=new v;r[Ln]=o,r.addChild(o);const i=m({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?Yi:X,flipX:t==="heels"});return r[En]=i,r},Er=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+js>t,Zl=t=>{if(!ht(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%ur<ur*Xs},$r=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e].flat():t.filters=e},Ur=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?X:[...t.filters]},Ql=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?$r(o,new Oe({outlineColor:Ne[t],upscale:We(C.getState()),lowRes:!1})):!e&&i&&Ur(o,Oe);const s=r?.flashing??!1;n&&!s?$r(o,new Wt(Ne[t])):!n&&s&&Ur(o,Wt)},Kl=(t,e,n)=>{e&&!n?t.addChild(t[En]):!e&&n&&t.removeChild(t[En])},bn=(t,e,n,r,o,i)=>{n&&Jl(e,{name:t,...r,paused:o}),Ql(t,r,i,e),Kl(e,r.shining,i?.shining??!1)},ec=({renderContext:{item:t,general:{gameState:e,paused:n}},currentRendering:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a,vels:{gravity:{z:l}}}}=t,c=r?.renderProps,u=r?.output,d=Nn(s)??"towards",h=e!==void 0&&(t.type==="headOverHeels"?Er(t.state.head,"headOverHeels","headOverHeels"):Er(t.state,t.type,e.currentCharacterName)),f=Zl(t),g=Ei(t),b=Ye(s),T=a?.phase??null,_={action:i,facingXy8:d,teleportingPhase:T,flashing:f,highlighted:h,shining:g,gravityZ:l},k=c===void 0||c.action!==i||c.facingXy8!==d||c.teleportingPhase!==T||c?.gravityZ>Dn!=l>Dn;let M;if(o==="headOverHeels"){M=u??ql({top:gn("head",!0,n),bottom:gn("heels",!0,n)});const B=M;bn("head",B[rn],k,_,n,c),bn("heels",B[rr],k,_,n,c)}else M=u??gn(o,!1,n),bn(o,M,k,_,n,c);return i==="moving"&&u instanceof mt&&(u.animationSpeed=b*Hs),{output:M,renderProps:_}},vn=on(ec),Nr=t=>t-Math.floor(t),tc=({state:{position:t}},e)=>{const n=o=>o.config.direction==="away"||o.config.direction==="left";return tn(ae(e.items).filter(o=>o.type==="wall"||o.type==="doorLegs").filter(n).map(o=>{const{id:i,config:{direction:s},state:{position:a}}=o;return m({textureId:"floorOverdraw.cornerNearWall",label:i,...x(Qt(a,t)),times:o.type==="wall"?o.config.times:{[Jt(Zt(s))]:2},anchor:{x:0,y:1},flipX:s==="away"})}),new v({label:"floorOverdraws"}))},nc=`#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uColour;

void main(void) {
    finalColor = texture(uTexture, vTextureCoord);
}
`;class rc extends N{constructor(){const e=$.from({vertex:Fe,fragment:nc,name:"null-filter"});super({glProgram:e,resources:{}})}}const oc=`#version 300 es

precision lowp float;
out vec4 finalColor;

in vec2 vTextureCoord;
uniform sampler2D uBackBuffer;
uniform vec3 uTargetColor;
// do not use uTexture in this frag - for some reason it causes pixi's render pipeline
// to take away the backbuffer, which we rely on sampling from

void main() {
    vec3 bg = texture(uBackBuffer, vTextureCoord).rgb;

    float isBlack = step(length(bg), 0.001f); // 1 if black, 0 otherwise
    finalColor = mix(vec4(uTargetColor, 1.0f), vec4(0, 0, 0, 0), isBlack);

}`;class Gr extends N{uniforms;constructor(e="white"){const n=$.from({vertex:Fe,fragment:oc,name:"colour-clash-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}},blendRequired:!0}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const Vr=({colourised:t,direction:e,room:n,times:r,position:o,colourSwap:i})=>m({label:`floorEdge(${e})`,textureId:`floorEdge.${e}`,times:r,filter:i?Gi(n,e,t):void 0,...x(o)}),ic=({room:t,xSize:e,ySize:n,y:r})=>{const o=new v({label:"floorColourClash"}),i=Br(t,"right");for(let a=0;a<=n;a++){const l=V({x:0,y:a,z:0}),c=new H().rect(l.x-(a===0?0:8),l.y,8*3,8).fill(i);c.filters=new Gr(i),o.addChild(c)}const s=Br(t,"towards");for(let a=0;a<=e;a++){const l=V({x:a,y:0,z:0}),c=new H().rect(l.x-16,l.y,8*(a===0?2:3),8).fill(s);c.filters=new Gr(s),o.addChild(c)}return o.y=r,o},sc=z(({renderContext:{room:t,item:e,general:{colourised:n},colourClashLayer:r}})=>{const{color:{shade:o}}=t,{config:i,state:{position:s},aabb:a}=e,{floorType:l,naturalFootprint:c}=i,u=new v({label:"floorAppearance"}),d=x({...a,y:0}),h=x({...a,x:0,y:0}),f=x({...a,x:0}),g=x(a);if(l!=="none"){const b=new v({label:"tiles"}),T=l==="deadly"?`generic${o==="dimmed"?".dark":""}.floor.deadly`:`${i.scenery}${o==="dimmed"?".dark":""}.floor`,_=se().textures[T];try{Mo(T)}catch(Is){throw new Error(`no floor textureId for floorType: ${l}, shade: ${o}`,{cause:Is})}const k=de(c.position,s),M={x:Nr(k.x/w.w),y:Nr(k.y/w.w)},B=8,K={x:d.x,y:g.y-B,width:f.x-d.x,height:h.y-g.y+2*B},et=de(V($t(M,{x:.5,y:.5})),{y:a.z},K),ar=new xl({texture:_,tilePosition:et,...K});b.addChild(ar),b.addChild(tc(e,t));const we=new H().moveTo(g.x,g.y).lineTo(f.x,f.y).lineTo(f.x,f.y+3).lineTo(h.x,h.y+3).lineTo(d.x,d.y+3).lineTo(d.x,d.y).fill({color:16711680,alpha:.5});b.addChild(we),b.mask=we,b.filters=[Al(t)];const un=new v({children:[b]});un.filters=new Oe({outlineColor:p.pureBlack,upscale:1,lowRes:!1});const tt=new v({children:[un]}),lr=new rc;lr.enabled=!1,tt.filters=lr,tt.cacheAsTexture(!0),u.addChild(tt),u.addChild(m({textureId:"blank",x:f.x,y:h.y+8}))}{const b=new v({label:"edges"});l==="none"&&b.addChild(new H().moveTo(f.x,f.y+8).lineTo(f.x,f.y+100).lineTo(d.x,d.y+100).lineTo(d.x,d.y+8).lineTo(h.x,h.y+8).fill(0));const T=Math.ceil(a.y/w.w);b.addChild(Vr({colourised:n,direction:"right",room:t,times:{y:T},position:{z:a.z},colourSwap:n}));const _=Math.ceil(a.x/w.w);if(b.addChild(Vr({colourised:n,direction:"towards",room:t,times:{x:_},position:{z:a.z},colourSwap:n})),u.addChild(b),!n){const k=ic({xSize:_,ySize:T,y:-a.z+1,room:t});u.addChild(k),r.attach(k)}}return u}),ac=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],lc=t=>{let e=2166136261;const n=t.length;for(let r=Math.max(0,n-9);r<n;r++)e^=t.charCodeAt(r),e=Math.imul(e,1540483477),e^=e>>>15;return(e>>>0)/4294967295},cc=200,uc=1,dc=(t,e)=>{const n=lc(e);return Math.sin((t+n*2e4)/cc)*uc},Hr=({id:t,config:{which:e},state:n},r,o)=>{if((e==="cyberman"||e==="bubbleRobot")&&n.activated){const i=o;i[rn].y=-12+dc(r.roomTime,t)}},hc=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:r})=>{const{config:o,state:i}=t,s=r?.renderProps,{activated:a,busyLickingDoughnutsOffFace:l}=i,c=l?Bl:a?void 0:ac.includes(o.which)?Ni(e):void 0;switch(o.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const u=yt(i.facing)??"towards";if(!(s===void 0||a!==s.activated||l!==s.busyLickingDoughnutsOffFace||u!==s.facingXy4))return Hr(t,e,r.output),"no-update";const h={facingXy4:u,activated:a,busyLickingDoughnutsOffFace:l};switch(o.which){case"skiHead":return{output:m({textureId:`${o.which}.${o.style}.${u}`,filter:c}),renderProps:h};case"elephantHead":return{output:m({textureId:`elephant.${u}`,filter:c}),renderProps:h};case"turtle":return{output:m(a&&!l?{animationId:`${o.which}.${u}`,filter:c,paused:n}:{textureId:`${o.which}.${u}.1`,filter:c}),renderProps:h};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ve({top:{textureId:`${o.which}.${u}`,filter:c||he(e)},bottom:{...mn,paused:n}}):m({textureId:`${o.which}.${u}`,filter:c}),renderProps:h};case"computerBot":case"elephant":case"monkey":return{output:Ve({top:`${o.which}.${u}`,bottom:{animationId:"headlessBase.flash",playOnce:"and-stop"},filter:c}),renderProps:h};default:throw new Error(`unexpected monster ${o}`)}break}case"homingBot":{const u=!_e(i.vels.walking,ue);return s===void 0||l!==s.busyLickingDoughnutsOffFace||a!==s.activated||u!==s.walking?{filter:c,output:m({animationId:u?"headlessBase.flash":"headlessBase.scan",filter:c}),renderProps:{activated:a,busyLickingDoughnutsOffFace:l,walking:u}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(s===void 0||l!==s.busyLickingDoughnutsOffFace||a!==s.activated))return Hr(t,e,r.output),"no-update";const d={activated:a,busyLickingDoughnutsOffFace:l};switch(o.which){case"helicopterBug":case"dalek":return{output:m(a&&!l?{animationId:o.which,filter:c,paused:n}:{textureId:`${o.which}.1`,filter:c}),renderProps:d};case"bubbleRobot":return{output:Ve({top:{...mn,paused:n},filter:c}),renderProps:d};case"emperorsGuardian":return{output:Ve({top:"ball",bottom:{...mn,paused:n},filter:c}),renderProps:d};case"emperor":return{output:m({animationId:"bubbles.cold",filter:c,paused:n}),renderProps:d};default:throw new Error(`unexpected monster ${o}`)}break}default:throw new Error(`unexpected monster ${o}`)}},fc=ve.floatingText,pc=12,jr=w.h*3,Xr=[p.shadow,p.midGrey,p.redShadow,p.metallicBlue,p.midRed,p.moss,p.pink,p.lightBeige,p.pastelBlue,p.lightGrey,p.highlightBeige],qr=[...Xr,...new Array(20).fill(p.white),...Xr.toReversed()],mc=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},general:{displaySettings:{uncolourised:r}},frontLayer:o},currentRendering:i})=>{const s=i?.output;let a;const c=(n-e)*fc;if(s===void 0){a=new v({filters:new Oe({outlineColor:p.pureBlack,upscale:We(C.getState()),lowRes:!1})}),o?.attach(a);for(let u=0;u<t.length;u++){const d=t[u],h=oe(new v({label:d,y:u*pc,filters:r?X:new E(p.pink)}),d.toUpperCase());a.addChild(h)}}else a=s;for(let u=0;u<t.length;u++){const d=a.children[u],[h]=d.filters,f=c+u*-12,g=f>0&&f<jr;if(d.visible=g,g&&h){const b=Math.floor(f/jr*qr.length);h.targetColor=qr[b]}}return a.y=-c,{output:a,renderProps:Q}},Ct=t=>{for(const e in t)return!0;return!1},Wr=500,gc=qe.animations["conveyor.x"].animationSpeed,Yr=qe.animations["conveyor.x"].length,bc=t=>1-(1-t)**2,vc=(t,e)=>{for(let n=0;n<t.children.length;n++){const r=t.children[n],o=n%Yr;r.gotoAndStop(e?Yr-o-1:o)}return t},yc=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:r},general:{editor:o}},currentRendering:i})=>{const s=i?.renderProps,a=Ct(n)||o,l=(!a&&s?.moving?r:s?.roomTimeStoppedMoving)??xt,c=Zt(t),u=i?.output??vc(m({animationId:`conveyor.${c}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),d=a?0:Math.min(r-l,Wr),h=Math.max(0,1-d/Wr);for(const f of u.children)if(h===0)f.stop();else{const g=gc*bc(h);f.play(),f.animationSpeed=g}return{output:u,renderProps:{moving:a,roomTimeStoppedMoving:l}}},xc=on(yc),U={movementType:"steady"},Ke=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Vn(C.getState(),t),wc=(t,e,n,r)=>{const{state:{teleporting:o,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&j("teleporter")(l)&&Ke(l);if(o===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:Bn}}}:U;const u=Math.max(o.timeRemaining-r,0);switch(o.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Yn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:o.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Bn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...o,timeRemaining:u}}}},Sc=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:r})=>{const{state:{stoodOnBy:o},config:{times:i}}=t,s=r?.renderProps,a=Ke(t),l=a&&ye(o,e).some(q);return s===void 0||a!==s.activated||l!==s.flashing?{output:l?new v({children:[m({textureId:"teleporter",times:i}),m({animationId:"teleporter.flashing",times:i,paused:n})]}):m({textureId:a?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:a}}:"no-update"},Cc=({renderContext:{item:{state:{facing:t,actedOnAt:{roomTime:e,by:n}}},room:{roomTime:r,items:o}},currentRendering:i})=>{const s=i?.renderProps,a=yt(t)??"towards",l=r===e&&wt(Hn(n)).some(u=>Do(o[u]));return s===void 0||a!==s.facingXy4||l!==s.controlledByJoystick?{output:Ve({top:`charles.${a}`,bottom:l?"headlessBase.all":"headlessBase"}),renderProps:{facingXy4:a,controlledByJoystick:l}}:"no-update"},Tc=({renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:e}},general:{paused:n}},tickContext:{lastRenderRoomTime:r},currentRendering:o})=>{const i=o?.renderProps,s=Ct(t);let a;return o?.output?a=o?.output:(a=m({animationId:"spring.bounce"}),a.loop=!1,a.gotoAndStop(0)),r!==void 0&&e>r&&!s&&!n?a.gotoAndPlay(0):s&&!(i?.compressed??!1)&&a.gotoAndStop(1),{output:a,renderProps:{compressed:s}}},kc=on(Tc),Ic=({renderContext:{item:{config:{which:t,startDirection:e}}},currentRendering:n})=>n?.renderProps===void 0?{output:t==="headOverHeels"?Ve({top:{textureId:`head.walking.${e}.2`},bottom:{textureId:`heels.walking.${e}.2`}}):m({textureId:`${t}.walking.${e}.2`}),renderProps:Q}:"no-update",Oc=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},general:{paused:n}},tickContext:{deltaMS:r},currentRendering:o})=>{const s=(o?.renderProps?.distanceTravelled??0)+jn(t)*(n?0:r),l=o?.output??m("spikyBall.1"),u=(Math.floor(s*2/je.w)+e)%2+1;return l.texture=se().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:s}}},Pc=on(Oc),_c=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Bc=z(({renderContext:{item:{id:t,config:e},room:n}})=>{if(e.direction==="right"||e.direction==="towards")throw new Error(`wall is near: ${t}`);const{direction:r,tiles:o}=e,i=Jt(Zt(r)),s=new v({label:"wallTiles"});for(let a=0;a<e.tiles.length;a++){let l=m({textureId:_c(n.planet,o[a],r,n.color.shade==="dimmed"),y:1,pivot:r==="away"?{x:je.w,y:je.h+1}:{x:0,y:je.h+1}});const c=V({[i]:a});if(n.planet==="moonbase"){const u=`moonbase.wall.screen.${o[a]}.away`;zo(u)&&(l=new v({children:[l]}),l.addChild(m({animationId:u,randomiseStartFrame:!0,flipX:r==="left",x:r==="away"?-8:8,y:-23})))}l.x+=c.x,l.y+=c.y,s.addChild(l),s.filters=he(n)}return s}),Rc=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const r=n?.renderProps,o=e.type==="in-store"?Vn(C.getState(),e.path)?"right":"left":t;return r===void 0||o!==r.setting?{output:m(`switch.${o}`),renderProps:{setting:o}}:"no-update"},Ac=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Fc=({renderContext:{item:{config:{style:t,times:e},state:{disappearing:n}},room:r},currentRendering:o})=>{const i=o?.renderProps,s=n!==null;return i===void 0||i.isDissapearing!==s?{output:m({textureId:Ac(r.color.shade==="dimmed",t,s),filter:t==="organic"?he(r):t==="book"?Vi(r):void 0,times:e}),renderProps:{isDissapearing:s}}:"no-update"},Mc=({state:{stoodOnBy:t,position:e},config:{times:n}},r)=>{const o=new Array(n?.x??1).fill(null).map(()=>new Array(n?.y??1));return ye(t,r).filter(Lo).forEach(({id:i,state:{position:s}})=>{const a=de(s,e),l={x:Math.floor(a.x/w.w),y:Math.floor(a.y/w.d)};l.x<0||l.x>=(n?.x??1)||l.y<0||l.y>=(n?.y??1)||(o[l.x][l.y]=i)}),o},zc=(t,e)=>{let n=0,r=1;for(const o of e)for(const i of o)i!==void 0&&t.items[i]?.state.activated&&(n|=r),r<<=1;return n},Dc=({renderContext:{item:t,room:e},currentRendering:n})=>{const{config:{times:r}}=t,o=n===void 0?Mc(t,e):n.renderProps.chargePositions,i=zc(e,o);return i!==n?.renderProps.cybermanActivationBitmask?{output:m({textureIdCallback(a,l){const c=o[a][l];return c===void 0||e.items[c]?.state.everActivated?"toaster.off":"toaster.on"},times:r??Q}),renderProps:{chargePositions:o,cybermanActivationBitmask:i}}:"no-update"},Lc={head:vn,heels:vn,headOverHeels:vn,doorFrame:Xl,doorLegs:jl,monster:hc,floatingText:mc,barrier:z(({renderContext:{item:{config:{axis:t,times:e}}}})=>m({textureId:`barrier.${t}`,times:e})),deadlyBlock:z(({renderContext:{item:{config:t},room:e}})=>{switch(t.style){case"volcano":return m({animationId:"volcano",filter:he(e),times:t.times,randomiseStartFrame:!0});case"toaster":throw new Error("use the special toaster appearance instead");default:throw t.style,new Error("unknown deadly block style")}}),spikes:pe("spikes"),slidingDeadly:Pc,slidingBlock:z(({renderContext:{item:{config:{style:t}},room:e}})=>m(t==="book"?{textureId:"book.y",filter:Vi(e)}:t)),block:Fc,switch:Rc,conveyor:xc,lift:z(({renderContext:{general:{paused:t}}})=>{const e=new v,n={x:ct.w/2,y:ct.h};return e.addChild(m({animationId:"lift",pivot:n,paused:t})),e.addChild(m({textureId:"lift.static",pivot:n})),e}),teleporter:Sc,sceneryCrown:z(({renderContext:{item:{config:{planet:t}}}})=>m({textureId:`crown.${t}`})),pickup:z(({renderContext:{item:{config:t},room:e,general:{paused:n,editor:r}}})=>{if(t.gives==="crown")return m({textureId:`crown.${t.planet}`});const i={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:he(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives],s=m(i);if(r&&i==="whiteRabbit"){const a={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"},l=oe(Ge({outline:!0}),a[t.gives]);return l.y=-16,new v({children:[s,l]})}else return s}),moveableDeadly:pe("fish.1"),charles:Cc,joystick:pe("joystick"),movingPlatform:pe("sandwich"),pushableBlock:pe("stepStool"),portableBlock:z(({renderContext:{item:{config:{style:t}}}})=>m(t)),spring:kc,sceneryPlayer:Ic,hushPuppy:pe("hushPuppy"),bubbles:z(({renderContext:{item:{config:{style:t}},general:{paused:e}}})=>m({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:pe({animationId:"bubbles.doughnut"}),ball:pe("ball"),floor:sc,particle:z(({renderContext:{item:{config:{forCharacter:t}}}})=>m({animationId:"particle.fade",anchor:{x:.5,y:.5},filter:t==="heels"?Yi:X}))},Ji=t=>{if(t.type==="wall"){const{direction:e}=t.config;return e==="right"||e==="towards"?void 0:Bc}return t.type==="deadlyBlock"&&t.config.style==="toaster"?Dc:Lc[t.type]},Zi=(t,e,n)=>{const r=Ji(t);if(!n.room)return;const o=r({renderContext:{general:e.general,item:t,room:n.room,colourClashLayer:void 0,frontLayer:void 0},tickContext:{lastRenderRoomTime:xt,movedItems:Xn,progression:0,deltaMS:1}});if(o==="no-update")throw new Error("no-update not supported in carried sprite");return o.output};function Qi({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Ei(e)||ht(e)||(e.state.action="death",e.state.expires=t+Bn))}const me=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,bt=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Ec=3e3,Ki=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:o}=t,{id:i,config:s}=r,{id:a,roomJson:{items:l},roomTime:c}=o,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;const d=()=>{l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0)},h=(f,g=o)=>{const b=Eo(r),T={type:"floatingText",id:`floatingText-${i}`,...$o,fixedZIndex:Qs,aabb:O,state:{...qn(),position:F(b,{z:w.h/2}),expires:c+Ec},config:{textLines:f,appearanceRoomTime:c}};xe({room:g,item:T})};switch(s.gives){case"hooter":{const f=Ut(n);if(f===void 0)return;f.hasHooter=!0,h(["hooter","collected"]),d();break}case"doughnuts":{const f=Ut(n);if(f===void 0)return;f.doughnuts=me(f.doughnuts,6),h(["+6","doughnuts"]),d();break}case"bag":{const f=pt(n);if(f===void 0)return;f.hasBag=!0,h(["bag","collected"]),d();break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,h(["🛡","shield"]),d();break}case"fast":{const f=Ut(n);if(f===void 0)return;f.fastStepsStartedAtDistance=f.gameWalkDistance,h(["⚡","fast steps"]),d();break}case"jumps":{const f=pt(n);if(f===void 0)return;f.bigJumps+=10,h(["♨","10","big jumps"]),d();break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=me(n.state.head.lives,2),n.state.heels.lives=me(n.state.heels.lives,2),h(["+2","lives","each"])):(n.state.lives=me(n.state.lives,2),h(["+2","lives"])),d();break;case"scroll":C.dispatch(Zs(s.page)),d();break;case"reincarnation":{const f=Ys(e,C.getState(),i),g=ge(f.gameState);if(!g)throw new Error("how are we saving from a pickup if there is no current room?");h(["reincarnation","point","restored"],g),C.dispatch(Js(f)),h(["reincarnation","point","saved"]),d();break}case"crown":{C.dispatch(Ws(s.planet)),h([s.planet,"liberated!"]),d();break}}},$c=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Uo(i,r)<=0||e.state.action!=="death"&&Yn({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},Uc=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=vt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=F(t.state.position,s)};function Nc({movingItem:t}){t.state.autoWalk=!1}const ce=(t,...e)=>j(...e)(t.touchedItem),it=(t,...e)=>j(...e)(t.movingItem),es=t=>q(t.movingItem),Gc=t=>q(t.touchedItem),Vc=t=>No(t.touchedItem),Jr=t=>{switch(!0){case ce(t,"stopAutowalk"):Nc(t);break;case Vc(t):Qi(t);break;case ce(t,"portal"):$c(t);break;case ce(t,"pickup"):Ki(t);break;case ce(t,"doorFrame"):Uc(t);break}},sn=(t,e)=>{const{head:n,heels:r,headOverHeels:o}=Kt(e.items);if(o!==void 0)return ht(o)?void 0:o;const i=n===void 0||ht(n)||n.state.action==="death"?void 0:dr(n.state.position,t),s=r===void 0||ht(r)||r.state.action==="death"?void 0:dr(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},or=t=>t[Math.floor(Math.random()*t.length)],Zr=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const r=or([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},ts=150,ke=Object.freeze({movementType:"vel",vels:{walking:O}}),an=t=>Go(t)?ve[t.config.which]:ve[t.type],Qr=w.w/2,Hc=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ve.homingBot;if(!_e(e,ue))return{movementType:"steady"};for(const s of Z(Kt(n.items))){if(s===void 0)continue;const a=de(s.state.position,t);if(Math.abs(a.y)<Qr)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Qr)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},jc=(t,e,n,r)=>{const{state:{position:o,facing:i}}=t,s=sn(o,e);if(s===void 0)return U;const a=de(s?.state.position,o),l=Xt[yt(a)];return _e(l,i)?U:{movementType:"steady",stateDelta:{facing:l}}},Xc=(t,e,n,r)=>{const{state:{position:o,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ke;const l=sn(o,e);if(l===void 0||s+ts>e.roomTime)return U;const c=de(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>w.w/4?u:Jt(u),h=an(t),f={...O,[d]:c[d]>0?h:-h},g=Be(f),b=!_e(g,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:g,...b?{timeOfLastDirectionChange:e.roomTime}:Q}}},Kr=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ke;const a=sn(i,e);if(a===void 0)return ke;const l=a.state.position,c=w.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ke;const d=de(a?.state.position,i),h=an(t),f=(1+Math.sqrt(2))/2,g=h*f,b=A({...d,z:0},g/jn(d)*(o?-1:1));return{movementType:"vel",vels:{walking:b},stateDelta:{facing:Be(b)}}},yn=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ke;if(!(Re(i,O)||Math.random()<r/1e3))return U;const l=or(o),c=Xt[l];return{movementType:"vel",vels:{walking:A(c,an(t))},stateDelta:{facing:Xt[l]}}},qc=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ke:_e(i,ue)?{movementType:"vel",vels:{walking:A(o,an(t))}}:U},Ft=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<ts))return;const u=en(i,c,e,n);if(u.x===0&&u.y===0)return;const d=Zr(s,u,o);t.state.vels.walking=d;const h=o==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;t.state.facing=A(_e(d,ue)?Zr(l,u,o):Be(d),h),t.state.durationOfTouch=0},Wc=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},Yc=(t,e,n,r)=>{if(!t.state.activated||Go(t)&&t.state.busyLickingDoughnutsOffFace)return ke;switch(t.config.movement){case"patrol-randomly-diagonal":return yn(t,e,n,r,na);case"patrol-randomly-xy8":return yn(t,e,n,r,ta);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return yn(t,e,n,r,ea);case"towards-tripped-on-axis-xy4":return Hc(t,e);case"towards-on-shortest-axis-xy4":return Xc(t,e);case"back-forth":case"clockwise":return qc(t);case"turn-to-player":return jc(t,e);case"towards-analogue":return Kr(t,e);case"towards-analogue-unless-planet-crowns":return Kr(t,e,n,r,Ks(C.getState()));default:throw t.config,new Error("this should be unreachable")}},Jc=t=>{const{movingItem:e,touchedItem:n}=t;if(Je(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Ft(t,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":Ft(t,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Ft(t,"opposite");break;case"clockwise":Ft(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Wc(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":return;default:throw e.config,new Error("this should be unreachable")}},Zc=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:r,state:{setting:o,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(r.type){case"in-room":{const s=t.state.setting=o==="left"?"right":"left";Qc(r,s,n.items,n.roomTime);break}case"in-store":{C.dispatch(ra(r.path));break}}},Qc=(t,e,n,r)=>{for(const o of t.modifies)for(const[i,s]of Vo(o.newState))if(Object.hasOwn(s,e))for(const a of o.targets){const l=n[a];if(l===void 0)continue;if(l.type!==o.expectType)throw new Error(`item "${l.id}" is of type "${l.type}" - does not match expected type "${o.expectType}" from switch config ${JSON.stringify(t,null,2)}`);const c=l;c.state={...l.state,[i]:s[e],switchedAtRoomTime:r,switchedSetting:e}}},Kc=({movingItem:t,touchedItem:e})=>{if(!Je(t))return;const{state:{position:n},aabb:r}=e,o=en(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=Be(o),s=A(i,-.05);return e.state.vels.sliding=s,!1},eu=({movingItem:t,touchedItem:e})=>{if(!Je(e))return;const n=t.state.vels.sliding;if(Re(n,O))return;const{state:{position:r},aabb:o}=t,i=en(e.state.position,e.aabb,r,o);return Uo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},tu=({movingItem:t,room:e,touchedItem:n,deltaMS:r,gameState:o},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=en(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Be(c);for(const d of s){const h=e.items[d],f=A(u,-.025*r);h.state.facing=f,Jn({room:e,subjectItem:h,gameState:o,pusher:n,posDelta:f,deltaMS:r,onTouch:i})}},nu=1e3/12,Mt=t=>{const e=t-aa,r=e/la*Un;return(e+.5*Pn*r**2)/r},ru={head:Mt(Tt.head),headOnSpring:Mt(Tt.head+w.h),heels:Mt(Tt.heels),heelsOnSpring:Mt(Tt.heels+w.h)},eo=(t,e,n)=>{const r=t.type==="headOverHeels"||t.type==="heels"&&n?"head":t.type;return ru[`${r}${e?"OnSpring":""}`]},ou=t=>!(t===null||ia(t)&&Ke(t)||sa(t)&&t.config.gives==="scroll"||q(t)&&t.state.standingOnItemId===null),iu=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+nu>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),ns=(t,e,n)=>{const{state:{standingOnItemId:r}}=t,{inputStateTracker:o}=n,i=Ze(r,e);if(iu(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:eo(t,!1,t.type==="heels"&&t.state.isBigJump)}},stateDelta:{}};if(!(t.state.action!=="death"&&o.currentActionPress("jump")!=="released"&&ou(i)))return r!==null?{movementType:"steady",stateDelta:{jumped:!1,...t.type==="heels"?{isBigJump:!1}:{}}}:U;const a=t.type==="heels"&&t.state.bigJumps>0,l=oa(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:eo(t,l,a)}},stateDelta:{action:"moving",jumped:!0,...t.type==="heels"?a?{bigJumps:t.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},su=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Ye(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return A(n,l)},au={movementType:"vel",vels:{walking:O}},rs=(t,e,n,r)=>{const o=lu(t,e,n,r);if(o.movementType==="vel"&&o.vels.walking!==void 0){const i=Ye(o.vels.walking);o.stateDelta={...o.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*r},t.type==="head"&&t.state.standingOnItemId!==null&&(o.stateDelta={...o.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*r})}return t.state.action==="idle"&&o.movementType==="vel"&&o.vels.walking!==void 0&&!Re(o.vels.walking,O)&&(o.stateDelta={...o.stateDelta,walkStartFacing:t.state.facing}),o},lu=(t,e,{inputStateTracker:n,currentCharacterName:r},o)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:g}}}=t,b=r===t.id,T=b?n.currentActionPress("jump"):"released",_=b?n.directionVector:O,k=l===null&&g.z<0,M=i==="head"&&tr(t.state)>0&&l!==null,B=i==="headOverHeels"?k?"head":"heels":M?"heels":i,K=a?c:_,et=ve[B];if(u!==null||s==="death")return au;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Qt(f,A(f,ca*o))},stateDelta:{action:k?"falling":"jumping"}}:{movementType:"vel",vels:{walking:O},stateDelta:{action:"falling"}};if(T!=="released"){const we=Be(_e(K,ue)?c:K),tt=j("spring")(Ze(l,e))?1:ua;return{movementType:"vel",vels:{walking:A({...we,z:0},et*tt)},stateDelta:{facing:we}}}}if(Ye(K)!==0)return k?{movementType:"vel",vels:{walking:A({...K,z:0},et)},stateDelta:{facing:K,action:"falling"}}:{movementType:"vel",vels:{walking:su({vel:f,acc:da[B],deltaMS:o,maxSpeed:et,unitD:K,minSpeed:0})},stateDelta:{facing:K,action:"moving"}};if(d>0&&d<1){const we=Re(h,c)?1:0;return{movementType:"position",posDelta:A(c,we-d),stateDelta:{action:k?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:k?"falling":"idle"}}},to=t=>Ae(t.movingItem)&&Ho(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),os=(t,e)=>{let n=O;for(const r of e){if(r.movementType==="position"&&(n=F(n,r.posDelta)),r.movementType==="vel"&&(Ae(t)||j("lift")(t)))for(const[i,s]of Ao(r.vels)){const a={...O,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},no=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;const{touchedItem:{state:{disappearing:e}}}=t;if(e!==null&&(e.byType===void 0||e.byType.includes(t.movingItem.type))&&(e.on==="touch"||e.on==="stand"&&to(t))){if(to(t)&&es(t)){jo({above:t.movingItem,below:t.touchedItem});const r=[ns(t.movingItem,t.room,t.gameState,t.deltaMS),rs(t.movingItem,t.room,t.gameState,t.deltaMS)];os(t.movingItem,r)}ei(t)}};function cu(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const ir=t=>{es(t)&&Jr(t),Gc(t)&&Jr({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ce(t,...hr)&&Kc(t),it(t,...hr)&&eu(t),(it(t,"monster")&&ce(t,"firedDoughnut")||it(t,"firedDoughnut")&&ce(t,"monster"))&&cu(t),(it(t,"monster")||it(t,"movingPlatform"))&&Jc(t),ce(t,"switch")&&Zc(t),ce(t,"joystick")&&tu(t,ir),t.touchedItem.state.disappearing&&no(t),t.movingItem.state.disappearing&&Je(t.touchedItem,t.movingItem)&&no({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},uu=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ae(e.items).filter(Wn),u=s===null?is(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=o.currentActionPress("carry");if(d==="tap"||o.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;du(e,i,u),o.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!ss(t,qo(e.items)))return;s.state.position=l,xe({room:e,item:s}),Jn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:s.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:ir}),i.carrying=null,o.actionsHandled.add("carry")}},du=(t,e,n)=>{e.carrying=n,n.state.wouldPickUpNext=!1,Wo({room:t,item:n})},is=(t,e)=>Xo(t,ae(e.items).filter(Wn)),ss=(t,e)=>{const n={position:F(t.state.position,{z:w.h})},r=ha({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(Je(o,t)){if(!Ae(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!ss(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0},xn=-11,hu={jump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},tickContext:{room:r,currentPlayable:o},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=o?.state.standingOnItemId??null,c=l===null||r===void 0?null:r.items[l],u=c===null?!1:c.type==="teleporter"&&Ke(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?Rt({colourised:n,button:t}):a;if(s?.pressed!==d&&At(h,d),u!==s?.standingOnTeleporter)if(u)ot(h,m({textureId:"teleporter",y:5}),m({animationId:"teleporter.flashing",y:5}));else{const f=Lr(t,n,"JUMP");f.y=xn,ot(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourised:n}}},carry({renderContext:t,currentRendering:e,tickContext:n}){const{button:r,inputStateTracker:o,general:{colourised:i}}=t,{currentPlayable:s,room:a}=n,l=e?.renderProps,c=e?.output,u=s&&pt(s),d=u?.hasBag??!1,h=u?.carrying??null,f=h===null&&a!==void 0&&is(s,a)!==void 0,g=r.actions.every(k=>o.currentActionPress(k)!=="released"),b=d&&!f&&h===null,T=c===void 0?Rt({colourised:i,button:r}):c;if(T.visible=d,d&&(b!==l?.disabled&&Dr(T,b,i),T.visible=!0,l?.pressed!==g&&At(T,g),d!==l?.hasBag||h!==l?.carrying)){let k;h!==null?k=Zi(h,t,n):d&&(k=m({textureId:"bag",y:-2})),ot(T,k)}return{output:T,renderProps:{pressed:g,hasBag:d,colourised:i,carrying:h,disabled:b}}},fire({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:r,tickContext:{currentPlayable:o}}){const i=r?.renderProps,s=r?.output,a=o&&Ut(o),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=s===void 0?Rt({colourised:n,button:t}):s,h=l||bt(c)>0;if(d.visible=h,h&&(i?.pressed!==u&&At(d,u),l!==i?.hasHooter||c!==i?.doughnuts)){let f;l?f=m({textureId:"hooter",y:-3}):bt(c)>0&&(f=m({textureId:"doughnuts",y:-2}));const g=oe(new v,c);g.y=xn,g.filters=re,ot(d,f,g),Dr(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:r,tickContext:{currentPlayable:o}}){const i=r?.renderProps,s=r?.output,l=(o&&pt(o))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let d;if(s===void 0){d=Rt({colourised:n,button:t});const h=Lr(t,n,"C+J");h.y=xn,ot(d,h)}else d=s;return l?(d.visible=!0,i?.pressed!==c&&At(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:t}){if(t!==void 0)return"no-update";const e=m("hud.char.Menu");return e.scale=2,e.filters=ne,{output:e,renderProps:Q}},map({currentRendering:t}){if(t!==void 0)return"no-update";const e=Ge({label:"mapText",outline:!0});return oe(e,"MAP"),{output:e,renderProps:Q}}};class ze extends Xi{constructor(e){const n=hu[e.button.which];super(e,n)}}const fu=30,pu=15,mu=42,gu=36,bu=44,vu=20;class yu{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:r,general:o}=e;this.#n={mainButtonNest:new v({label:"mainButtonNest"}),buttons:{jump:new ze({button:{which:"jump",actions:["jump"],id:"jump"},general:o,inputStateTracker:n}),fire:new ze({button:{which:"fire",actions:["fire"],id:"fire"},general:o,inputStateTracker:n}),carry:new ze({button:{which:"carry",actions:["carry"],id:"carry"},general:o,inputStateTracker:n}),carryAndJump:new ze({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:o,inputStateTracker:n}),menu:new ze({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:o,inputStateTracker:n}),map:new ze({button:{which:"map",actions:["map"],id:"map"},general:o,inputStateTracker:n})},joystick:new Nl({inputStateTracker:n,inputDirectionMode:r,general:o})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of Z(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=pu,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=fu,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new v({label:"OnScreenControls"});#n;#t(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const n of Z(this.#n.buttons)){const{renderContext:{button:{actions:r}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const o of r)e.hudInputState[o]=!0}),n.output.on("pointerup",()=>{for(const o of r)e.hudInputState[o]=!1}),n.output.on("pointerleave",()=>{for(const o of r)e.hudInputState[o]=!1})}}#r(e){this.#n.mainButtonNest.x=e.x-bu,this.#n.mainButtonNest.y=e.y-vu,this.#n.joystick.output.x=mu,this.#n.joystick.output.y=e.y-gu,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{general:{gameState:r}}=this.renderContext;this.#r(n);for(const o of Z(this.#n.buttons))o.tick({...e,currentPlayable:Qe(r)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}qe.frames.button.frame;const xu=250,wu=t=>t?48:24,Su=t=>t?68:56,Cu=(t,e)=>t?e.x/2-24:80,Tu=t=>t?72:24,ku=t=>t?88:0,ro=112,st=t=>t==="heels"?1:-1;class Iu{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const r of dn)this.#e.addChild(this.#t[r].sprite),this.#e.addChild(this.#t[r].livesText),this.#e.addChild(this.#t[r].shield.container),this.#e.addChild(this.#t[r].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[zr],this.#t.fps.y=Et.h,this.#r(),n&&(this.#n=new yu({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#n.output))}#e=new v({label:"HudRenderer",isRenderGroup:!0});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Ge({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#o({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#o({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#o({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#o({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Ge({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#o({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#o({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#o({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new v({label:"heelsCarrying"})}},fps:Ge({label:"fps",outline:!0})};#r(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const n of dn){const{sprite:r,livesText:o}=this.#t[n];for(const i of[r,o])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#o({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new v({label:i});s.pivot={x:4,y:16};const a=new be({texture:se().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Mr,y:n?0:8});s.addChild(a);const l=Ge({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Et.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=re),{text:l,icon:a,container:s}}#i(e){const n=new be(se().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#a({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+st("head")*ro,this.#t.head.doughnuts.container.y=e.y-ct.h-8,this.#t.heels.carrying.container.y=e.y-ct.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+st("heels")*ro,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Et.w*2}#s(e,n){return e?n?X:dt:n?Rr:ut}#l(e){const{renderContext:{general:{gameState:n,colourised:r}}}=this,o=kt(n,"heels"),i=o?.hasBag??!1,s=o?.carrying??null,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=Zi(s,this.renderContext,e);c!==void 0&&a.addChild(c)}a.filters=this.#s(!0,r),this.#t.heels.bag.icon.filters=this.#s(i,r)}#c(e){const{renderContext:{general:{gameState:n,colourised:r}}}=this,o=kt(n,"head"),i=o?.hasHooter??!1,s=o?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#s(i,r),this.#t.head.doughnuts.icon.filters=this.#s(s!==0,r),oe(this.#t.head.doughnuts.text,s)}#d(e,{screenSize:n}){const{renderContext:{onScreenControls:r,general:{gameState:o}}}=this,i=kt(o,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=Vt(i),d=u>0||!r;a.visible=d,d&&(oe(s,u),a.y=n.y-ku(r)),c.x=a.x=(n.x>>1)+st(e)*Cu(r,n);const h=i===void 0?0:e==="head"?tr(i):i.bigJumps,f=h>0||!r;c.visible=f,f&&(oe(l,h),c.y=n.y-Tu(r))}#u(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:r,general:{gameState:o,colourised:i}}}=this,s=this.#u(o,e),a=this.#t[e].sprite;s?a.filters=i?X:dt:a.filters=i?Rr:ut,a.x=(n.x>>1)+st(e)*Su(r),a.y=n.y-ct.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:r,general:{gameState:o}}}=this,s=kt(o,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+st(e)*wu(r),a.y=n.y,oe(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const r=gt(n.color),{general:{colourised:o,gameState:i}}=this.renderContext;ut.targetColor=r.hud.dimmed[o?"dimmed":"original"],nr.targetColor=r.hud.dimmed[o?"basic":"original"],Mr.targetColor=r.hud.icons[o?"basic":"original"],dt.targetColor=r.hud.lives.original,this.#t.head.livesText.filters=o?Bt.colourised.head[this.#u(i,"head")?"active":"inactive"]:Bt.original,this.#t.heels.livesText.filters=o?Bt.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:Bt.original}#h=xt;#g(){if(fa(C.getState())){if(performance.now()>this.#h+xu){const e=lt.shared.FPS;oe(this.#t.fps,Math.round(e)),zr.targetColor=e>100?p.white:e>58?p.moss:e>55?p.pastelBlue:e>50?p.metallicBlue:e>40?p.pink:p.midRed,this.#h=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of dn)this.#p(n,e),this.#f(n,e),this.#d(n,e);this.#a(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const oo={movementType:"vel",vels:{gravity:O}},Ou=(t,e,n,r)=>{if(!Je(t))return oo;const{type:o,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=pa[(o==="headOverHeels"?"head":o)==="head"?"head":"others"];if(s!==null){const c=Ze(s,e);return j("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-Pn*r,-l)}}}:oo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-Pn*r,-l)}}}},io=w.h,so=.001,Pu=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=fr**2/(2*nt);if(n==="up"){if(e<=r)return Math.max(so,Math.sqrt(2*nt*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(so,Math.sqrt(2*nt*o))}else return fr}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*nt*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*nt*Math.max(e,0))):-.036},_u=({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}})=>{const o=t*io,i=e*io,s=Pu({currentAltitude:r-o,direction:n,totalDistance:i-o});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=r<=o?"up":r>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},ao={movementType:"vel",vels:{movingFloor:O}},Bu=(t,e,n,r)=>{if(q(t)&&t.state.teleporting!==null)return ao;const{state:{standingOnItemId:o}}=t,i=Ze(o,e);if(i===null||!j("conveyor")(i))return ao;const{config:{direction:s}}=i,l=j("heels")(t)&&t.state.action==="moving"&&yt(t.state.facing)===ma(s)?ve.heels:ga;return{movementType:"vel",vels:{movingFloor:A(Xt[s],l)}}};function*Ru(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Au=w.w*.8,Fu=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Be(c);if(o.currentActionPress("fire")==="tap"&&a&&bt(s)>0){const d={type:"firedDoughnut",...$o,config:Q,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...qn(),position:F(l,A(u,Au),t.type==="headOverHeels"?{z:w.h}:O),vels:{fired:A(u,ve.firedDoughnut)},disappearing:{on:"touch"}}};xe({room:e,item:d}),i.doughnuts=me(i.doughnuts,-1),o.actionsHandled.add("fire")}},as=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),Mu=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),zt=w.w*3,zu=(t,e)=>{const{state:{position:n}}=t,{state:{position:r}}=e;return n.x>r.x-zt&&n.x<r.x+zt&&n.y>r.y-zt&&n.y<r.y+zt},lo=(t,e,n,r,o)=>{if(o&&t.state.activated)return U;const i=sn(t.state.position,e);return i===void 0?U:zu(t,i)?as:Mu},Du=(t,e,n,r)=>t.state.activated?U:ye(t.state.stoodOnBy,e).some(q)?as:U,Lu=(t,e,n,r)=>{switch(t.config.activated){case"after-player-near":return lo(t,e,n,r,!0);case"while-player-near":return lo(t,e,n,r,!1);case"on-stand":return Du(t,e);case"off":case"on":return U;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Eu=(t,e,n,r)=>{const{id:o,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=ba(va(`${o}-${s}`,{...l,position:O},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=Qt(a,A(h.aabb,.5)),xe({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}},co=Un*qe.animations["particle.fade"].length*(1/qe.animations["particle.fade"].animationSpeed),$u=20,Uu=38,Nu=.5,Dt=w.w/2;let Gu=0;const ls=(t,e)=>Math.random()<t*(e/1e3),cs=(t,e,n,r)=>({id:`particle.${t}.${Gu++}`,type:"particle",aabb:O,config:{forCharacter:e},state:{...qn(),expires:r+co+Math.random()*co,position:n}}),us=(t,e,n,r)=>{if(!ls(n,r))return;const o={...F(Eo(t),{x:Math.random()*Dt-Dt/2,y:Math.random()*Dt-Dt/2}),z:t.state.position.z};xe({room:e,item:cs(t.id,t.type,o,e.roomTime)})},Vu=(t,e,n)=>{!(tr(t.state)>0)||t.state.standingOnItemId===null||Ye(t.state.vels.walking)<ya||us(t,e,$u,n)},Hu=(t,e,n)=>{const{isBigJump:r}=t.state;r&&t.state.standingOnItemId===null&&(t.state.vels.gravity.z<=0||us(t,e,Uu,n))},ju=(t,e)=>{const{head:n,heels:r}=Kt(t.items);n!==void 0&&Vu(n,t,e),r!==void 0&&Hu(r,t,e)},Xu=(t,e,n)=>{if(!ls(Nu,n))return;const r=or(Yo),o=F(e.state.position,{x:r==="x"?0:Math.random()*w.w,y:r==="y"?0:Math.random()*w.d,z:r==="z"?w.h:Math.random()*w.h});xe({room:t,item:cs(e.id,"crown",o,t.roomTime)})};function*qu(t,e,n,r){Ae(t)&&(yield Ou(t,e,n,r),yield Bu(t,e),yield*Ru(t,e)),q(t)?(yield rs(t,e,n,r),t.id===n.currentCharacterName&&(yield wc(t,e,n,r),yield ns(t,e,n),wa(t)&&uu(t,e,n,r),Sa(t)&&Fu(t,e,n))):Ca(t)?yield _u(t):Ta(t)?(yield Lu(t,e,n,r),yield Yc(t,e,n,r)):ka(t)&&Eu(t,e)}const Wu=(t,e,n,r)=>{if(!Ae(t)||t.state.standingOnItemId===null)return;const o=Ze(t.state.standingOnItemId,e);q(t)&&o.type==="pickup"&&Ki({gameState:n,movingItem:t,touchedItem:o,room:e});const{state:{disappearing:i}}=o;i!==null&&(i.byType===void 0||i.byType.includes(t.type))&&ei({touchedItem:o,gameState:n,room:e})},Yu=(t,e,n,r)=>{if(q(t)&&t.state.standingOnItemId!==null){const s=Ze(t.state.standingOnItemId,e);(No(s)||s.type==="spikes")&&Qi({room:e,movingItem:t})}const o=[...qu(t,e,n,r)];Wu(t,e,n);let i=os(t,o);(Ae(t)||j("lift")(t)||j("firedDoughnut")(t))&&(i=F(i,...wt(Z(t.state.vels)).map(s=>A(s,r)))),xa(t)&&Xu(e,t,r),Jn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:r,onTouch:ir})},Ju=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=me(e.state.head.lives,-1),e.state.heels.lives=me(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,me(e.state.head.lives,e.state.heels.lives)===0)return;const o=bt(e.state.head.lives)>0,i=bt(e.state.heels.lives)>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,Te(t,e);const u=pr(e)[c],d=He({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:mr(u)};return}if(t.entryState.headOverHeels!==void 0){Te(t,e);const c=He({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=pr(e);if(Te(t,c),Te(t,u),Jo(c,u)){const d=Zo({head:c,heels:u});Te(t,d,"heels");const h=He({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:mr(d)};return}else{const d=He({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},He=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Oa({roomJson:r.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??Q,scrollsRead:C.getState().gameMenus.scrollsRead});for(const i of e)xe({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Ya(o,t);return o},Te=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOnItemId:null}},Zu=(t,e)=>{const n=Qo(t,Ko(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0){delete t.characterRooms[e.id],n!==void 0&&(t.currentCharacterName=n.type);return}else{const r=t.characterRooms[e.type];Te(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Zo({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});Te(t,a);const l=He({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}xe({room:r,item:e});return}else{const s=He({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Qu=(t,e)=>{e.type==="headOverHeels"?Ju(t,e):Zu(t,e),Qe(t)===void 0&&C.dispatch(Ia({offerReincarnation:!0}))},Ku=t=>{for(const e of ae(t.items))try{for(const n of ye(e.state.stoodOnBy,t)){if(!t.items[n.id]){gr(n,t);continue}if(!Ho(n,e)){gr(n,t);const r=Xo(n,qo(t.items));r!==void 0&&jo({above:n,below:r})}}}catch(n){throw new Error(`could not update standing on for item "${e.id}"`,{cause:n})}},ed=2*Ja,td=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ed,positionDelta:n})},nd=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Qt(r.state.position,o),z:0};if(!Re(s,O))for(const a of ye(r.state.stoodOnBy,e))td(a,e,s)}},rd=(t,e)=>{for(const n of ae(t.items))!Ae(n)||t.roomTime===n.state.actedOnAt.roomTime||Pa(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=_a(n.state.position),e.add(n))},od=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,id=t=>{for(const e of ae(t.items)){const n=e.state.position;e.state.position=Ba(n)}},sd=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},ad=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Qe(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Qo(t,Ko(r.type));i!==void 0&&(i.state.gameTime+=n)}}},ld=(t,e)=>{const n=ge(t);if(n===void 0)return Xn;ad(t,n,e);const r=Object.fromEntries(Ra(n.items).map(([s,a])=>[s,a.state.position]));for(const s of Z(n.items))od(s,n)&&(Wo({room:n,item:s}),q(s)&&Qu(t,s));const o=Object.values(n.items).sort(sd);for(const s of o){const a=Qe(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Yu(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}ju(n,e),Ku(n),id(n);const i=new Set(wt(Z(n.items)).filter(s=>r[s.id]===void 0||!Re(s.state.position,r[s.id])));return nd(i,n,r),rd(n,i),i},uo=(t,e)=>{const n=x(t),r=x(F(t,{x:e.x,z:e.z})),o=x(F(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},wn=1e-5,ho=-1,at=(t,e,n,r,o)=>r-o>t&&n<e-o,cd=0,ds=1,hs=2,fs=3,ud=(t,e,n,r)=>{const o=uo(t,e),i=uo(n,r),s=o.topRight.y-o.topRight.x/2,a=o.bottomCentre.y-o.bottomCentre.x/2,l=i.topRight.y-i.topRight.x/2,c=i.bottomCentre.y-i.bottomCentre.x/2,u=o.topLeft.y+o.topLeft.x/2,d=o.bottomCentre.y+o.bottomCentre.x/2,h=i.topLeft.y+i.topLeft.x/2,f=i.bottomCentre.y+i.bottomCentre.x/2,g=o.topLeft.x,b=o.topRight.x,T=i.topLeft.x,_=i.topRight.x,k=at(s,a,l,c,wn),M=at(u,d,h,f,wn),B=at(g,b,T,_,wn);return k&&M&&B?ds:M&&B&&at(s,a,l,c,ho)?hs:k&&B&&at(u,d,h,f,ho)?fs:cd},dd=(t,e,n,r)=>{for(const o of Yo){const i=t[o],s=i+e[o],a=n[o],l=a+r[o];if(s<=a)return 1*(o==="z"?-1:1);if(i>=l)return-1*(o==="z"?-1:1)}return fo(n)-fo(t)},hd=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,r=e.renderAabb||e.aabb,o=t.renderAabbOffset?F(t.state.position,t.renderAabbOffset):t.state.position,i=e.renderAabbOffset?F(e.state.position,e.renderAabbOffset):e.state.position;switch(ud(o,n,i,r)){case ds:return dd(o,n,i,r);case hs:return fe(o.y,i.y+r.y)&&fe(o.z,i.z+r.z)?1:fe(i.y,o.y+n.y)&&fe(i.z,o.z+n.z)?-1:0;case fs:return fe(o.x,i.x+r.x)&&fe(o.z,i.z+r.z)?1:fe(i.x,o.x+n.x)&&fe(i.z,o.z+n.z)?-1:0;default:return 0}},fo=t=>t.x+t.y-t.z;class Ht extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const fd=t=>{const e=pd(t);let n=e.length,r=n;const o=new Array(n),i={},s=md(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Ht([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,s.get(f),u)}catch(g){throw g instanceof Ht?g.hasClosedCycle?g:new Ht([l,...g.cyclicDependency],g.cyclicDependency.includes(l)):g}}while(c);u.delete(l)}o[--n]=l}};function pd(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function md(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const po=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Lt=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},gd=(t,e=new Set(Z(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||Lt(n,o,s);for(const o of e)if(o.fixedZIndex===void 0)for(const i of Z(t)){if(i.fixedZIndex!==void 0||r.get(i)?.has(o)||o===i)continue;const s=hd(o,i);if(po(r,o,i),s===0){Lt(n,o.id,i.id),Lt(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;po(n,a,l),Lt(n,l,a)}return n},ps=(t,e,n=3)=>{try{return{order:fd(t),impossible:!1}}catch(r){if(r instanceof Ht){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:ps(t,e,n-1).order,impossible:!0}}else throw r}};class ms extends Xi{}const mo=(t,e)=>{e.poly([x({}),x({x:t.x}),x({x:t.x,y:t.y}),x({y:t.y})]).poly([x({}),x({z:t.z}),x({y:t.y,z:t.z}),x({y:t.y})]).poly([x({x:t.x}),x({x:t.x,z:t.z}),x(t),x({x:t.x,y:t.y})]).poly([x({z:t.z}),x({x:t.x,z:t.z}),x({x:t.x,y:t.y,z:t.z}),x({y:t.y,z:t.z})])},go=(t,e)=>{const n=new H;return mo(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),mo(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},bd={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class vd{constructor(e){this.renderContext=e;const{item:n}=e,r=bd[n.type]??"rgba(255,255,255)";if(this.#e=new v({label:`ItemBoundingBoxRenderer ${n.id}`}),j("portal")(n)){const i=x(n.config.relativePoint);this.#e.addChild(new H().circle(i.x,i.y,5).stroke(r)),this.#e.addChild(new H().circle(i.x,i.y,2).fill(r))}if(this.#e.addChild(new H({label:"objectOrigin"}).circle(0,0,2).fill(r)),this.#e.addChild(go(n.aabb,r)),n.renderAabb){const i="rgba(184, 184, 255)",s=go(n.renderAabb,i);if(n.renderAabbOffset){const a=x(n.renderAabbOffset);s.position.set(a.x,a.y),s.circle(0,0,2).fill(i)}this.#e.addChild(s)}this.#e.eventMode="static";let o;this.#e.on("pointerenter",()=>{if(o!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(o=new Cl({text:i,style:{fill:r,fontSize:6,fontFamily:"Menlo"}})),o.resolution=4}),this.#e.on("pointerleave",()=>{o!==void 0&&(this.#e.removeChild(o),o=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class yd{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new v({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=x(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const xd=({renderContext:{general:{pixiRenderer:t},item:e,room:n},currentRendering:r})=>{const{state:{stoodOnBy:o},config:{times:i}}=e,s=r?.renderProps,a=Ke(e),l=a&&ye(o,n).find(q)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:nn(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},i),renderProps:{flashing:l,activated:a}}:"no-update"},Sn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:r})=>{const o=r?.renderProps,i=yt(n)??"towards";if(!(o===void 0||i!==o.facingXy4))return"no-update";const a=m(i==="left"||i==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(w.h*(e-1)),a.scale.x=i==="away"||i==="right"?1:-1,{output:a,renderProps:{facingXy4:i}}},bo={lift:G("shadowMask.smallBlock"),conveyor:Se(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:Zt(t)==="x"})),teleporter:xd,floor:"no-mask",barrier:Se(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:G("shadowMask.smallRound"),block:Se(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:G("shadowMask.stepStool"),movingPlatform:G("shadowMask.fullBlock"),hushPuppy:G("shadowMask.hushPuppy"),portableBlock:Se(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:Se(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:Se(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.toaster"),spikes:G("shadowMask.spikes"),switch:G("shadowMask.switch"),pickup:Se(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:G("shadowMask.smallRound"),ball:G("shadowMask.ball"),"monster.dalek":G("shadowMask.dalek"),"monster.turtle":Sn("turtle"),"monster.skiHead":Sn("skiHead"),"monster.homingBot":G("shadowMask.smallRound"),joystick:G("shadowMask.joystick"),charles:Sn("charles",2)},wd=t=>{switch(t.type){case"monster":return bo[`monster.${t.config.which}`];case"floor":return t.config.floorType==="none"?void 0:"no-mask";default:return bo[t.type]}},Sd=new vl({alpha:1-Gt});class Cd{constructor(e,n){this.renderContext=e,this.#e.filters=Sd,n!=="no-mask"&&(this.#t=new ms(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new v({label:"ItemShadowRenderer"});#n=new v({label:"shadows"});#t;#r={};get#o(){return C.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const r=this.#t.output.children.at(0);if(r===void 0||!(r instanceof be)){const{item:o}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${o.id}" of type "${o.type}". Have got ${r}`)}n!==r&&(this.#o||(this.#e.mask=r))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:r}=e,{item:o,general:{pixiRenderer:i},room:s}=this.renderContext,a=n.has(o),l=o.state.position.z+o.aabb.z,c=ae(s.items).filter(function(g){return g.shadowCastTexture!==void 0}),u={id:o.id,state:{position:{...o.state.position,z:l}},aabb:{...o.aabb,z:Aa}},d=Object.groupBy(c,f=>{const g=this.#r[f.id]!==void 0,b=n.has(f);return!a&&!b?g?"keepUnchanged":"noShadow":Jo(u,f)?g?"update":"create":"noShadow"});for(const f of Tr(d.keepUnchanged,d.update))this.#r[f.id].renderedOnProgression=r;if(d.create)for(const f of d.create){const{times:g}=f.config,b=nn(i,f.shadowCastTexture,g);b.label=f.id,this.#n.addChild(b),this.#r[f.id]={sprite:b,renderedOnProgression:r}}for(const f of Tr(d.create,d.update)){const{sprite:g}=this.#r[f.id],b=x({...de(f.state.position,o.state.position),z:o.aabb.z});g.x=b.x,g.y=b.y}for(const[f,{sprite:g,renderedOnProgression:b}]of Vo(this.#r))b!==r&&(g.destroy(),delete this.#r[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const Td=t=>{const e=wd(t.item);return e===void 0?void 0:new Cd(t,e)};class kd{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const D=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:r,connectTo:o,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=S.createBufferSource(),c=_n()[r];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),o!==void 0&&l.connect(o),l},De=(t,e,n)=>{const r=S.createGain();return e!==void 0&&(r.gain.value=e),t.connect(r),r.connect(n),r},L=({start:t,change:e,loop:n,stop:r,startAndLoopTogether:o=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=D({...t}),De(l,t.gain,s),n!==void 0&&(o?(l=D({...n,loop:!0}),De(l,n.gain,s)):l.onended=()=>{c&&(l=D({...n,loop:!0}),De(l,n.gain,s))})):n!==void 0&&(l=D({...n,loop:!0}),De(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),r!==void 0&&(l=D({...r}),De(l,r.gain,s)));else if(c!==u&&e!==void 0){const h=D({...e});De(h,e.gain,s)}a=!1,c=u}};class Id{constructor(e){this.renderContext=e,this.output.gain.value=4}output=S.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,r=(e.x!==0||e.y!==0)&&n!==null;this.#e(r)}destroy(){}}class Od{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&D({soundId:"bonus",connectTo:this.output});break}case"disappearing":{D({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,D({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=S.createGain();tick(){}destroy(){}}class sr{constructor(e,n,r=1){this.renderContext=e,this.#e=L({start:n},this.output),this.output.gain.value=r}output=S.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:r,by:o}}}=n,i=r>(e??xt)&&!ol(Hn(o));this.#e(i)}destroy(){}}class Pd{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new sr(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=S.createGain();#e=S.createGain();#n=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:r,items:o}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,a=r===i&&wt(Hn(s)).some(l=>Do(o[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const Cn=2;class _d{constructor(e){this.renderContext=e}output=S.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:Cn},loop:{soundId:"conveyorLoop",playbackRate:Cn},stop:{soundId:"conveyorEnd",playbackRate:Cn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=Ct(e);this.#e(n)}destroy(){this.#e(!1)}}const Bd=3;class Rd{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=S.createGain();#e=D({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Bd*e)}destroy(){}}const vo={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},yo={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},xo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},wo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Ad{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;vo[n]!==void 0&&(this.#o=new sr(e,vo[n]),this.#o.output.connect(this.output)),yo[n]!==void 0&&(this.#t=L({change:yo[n]},this.#e)),wo[n]!==void 0&&(this.#i=L(wo[n],this.#e)),xo[n]!==void 0&&(this.#r=L({loop:xo[n]},this.#n))}output=S.createGain();#e=S.createGain();#n=S.createGain();#t;#r;#o;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:r,activated:o,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const a=Nn(r);this.#t(a)}if(this.#o&&this.#o.tick(e),this.#r){const a=o&&!i;this.#r(a)}if(this.#i){const a=!Re(s,O);this.#i(a)}}destroy(){}}class Tn{constructor(e){this.renderContext=e;const{general:{soundSettings:n},item:{type:r}}=e,{noFootsteps:o}={...St.soundSettings,...n};o||(this.#e=S.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=L({loop:{soundId:`${r==="headOverHeels"?"heels":r}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#i.connect(this.output),this.#r=L({start:{soundId:`${r==="headOverHeels"?"head":r}Jump`}},this.#t),this.#o=L({loop:{soundId:`${r==="headOverHeels"?"head":r}Fall`}},this.#t)}output=S.createGain();#e;#n;#t=S.createGain();#r;#o;#i=S.createGain();#a=L({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#s=S.createGain();#l=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:r,teleporting:o,jumpStartZ:i,jumped:s,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=pt(n),{teleportingPhase:f,positionZ:g}=this.#c,b=o?o.phase:null,T=s&&l>i&&l>g&&c>0,_=l<g&&c<0&&a===null;this.#o(_),this.#r(T),this.#n!==void 0&&this.#n(!T&&!_&&r==="moving"),h!==void 0&&this.#l(h.carrying!==null);const k=a!==null&&u>(e??xt)&&d[a];if(this.#a(k),b!==null&&b!==f)if(b==="in"){const M=_n().teleportIn,B=S.createBufferSource();B.buffer=M,B.connect(this.output),B.start()}else{const M=_n().teleportOut,B=S.createBufferSource();B.buffer=M,B.connect(this.output),B.start()}this.#c={teleportingPhase:b,positionZ:l}}destroy(){}}class Fd{constructor(e){this.renderContext=e}output=S.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const r=this.#e?.stoodOn??!1,o=Ct(e);!r&&o&&D({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Md{constructor(e){this.renderContext=e,this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4}output=S.createGain();scrapeBracketed;tick({movedItems:e}){const{renderContext:{item:n,room:{roomTime:r}}}=this,{state:{actedOnAt:{roomTime:o},standingOnItemId:i}}=n,s=r===o&&i!==null&&e.has(n);this.scrapeBracketed(s)}destroy(){}}class zd{constructor(e){this.renderContext=e}output=S.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:n,stoodOnUntilRoomTime:r}}}}=this,o=Ct(n);e!==void 0&&r>e&&!o&&D({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Dd{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=S.createGain();#e=S.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,r=n.type==="in-store"?Vn(C.getState(),n.path)?"right":"left":e,o=this.#n?.setting;o!==void 0&&o!==r&&D({soundId:"switchClick",playbackRate:r==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:r}}destroy(){}}class Ld{constructor(e){this.renderContext=e}output=S.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(Ke(e)&&ye(e.state.stoodOnBy,n).some(q))}destroy(){}}class Ed{constructor(e){this.renderContext=e,D({soundId:"hooter",connectTo:this.output})}output=S.createGain();tick(){}destroy(){}}class $d extends sr{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const Ud=(t,e)=>Fo(ye(t.state.stoodOnBy,e).filter(Lo));class Nd{constructor(e){this.renderContext=e,this.output.gain.value=2}output=S.createGain();#e=void 0;tick(e){const{renderContext:{item:n,room:r}}=this,o=Ud(n,r);this.#e!==void 0&&o<this.#e&&D({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=o}destroy(){}}const Gd={lift:Rd,switch:Dd,bubbles:Od,head:Tn,heels:Tn,headOverHeels:Tn,teleporter:Ld,monster:Ad,conveyor:_d,spring:zd,portableBlock:Fd,charles:Pd,ball:Id,pushableBlock:Md,firedDoughnut:Ed,slidingBlock:$d},Vd=t=>{if(t.item.type==="deadlyBlock"&&t.item.config.style==="toaster")return new Nd(t);const e=Gd[t.item.type];if(e)return new e(t)},So=w.h*Fa,Co=w.h*-1,Hd=w.w*16,jd=0,kn=(t,e,n)=>(t-e)/(n-e)*2-1;class Xd{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:r,x:o}}}=e;this.positionMinX=hn(br({x:0,y:r})),this.positionMaxX=hn(br({x:o,y:0}))}output=S.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,r=n.state,o=F(r.position,A(n.aabb,.5)),i=kn(hn(o),this.positionMaxX,this.positionMinX),s=kn(o.z,Co,So);if(!Number.isFinite(s))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${o.z},
          ${Co},
          ${So},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(r.position)},
          scaleXyz(${JSON.stringify(n.aabb)}, 0.5),
        )`);const a=kn(o.x+o.y,jd,Hd);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const qd=[new Wt(p.midRed)],Wd=[new Wt(p.moss)],Yd=75;class Jd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:r}},room:{roomTime:o}}}=this;this.output.filters=o-n<Yd?r==="left"?Wd:qd:X,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Zd=p.moss,Qd=()=>new Oe({outlineColor:Zd,lowRes:!1,upscale:We(C.getState())});class Kd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:n}=this.renderContext.item.state;n!==!this.#e&&(this.output.filters=n?[Qd()]:X),this.#e=n,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const eh=(t,e,n)=>Wn(t)?new Kd(e,n):n,th=p.pastelBlue,nh=p.highlightBeige,To=new Oe({outlineColor:nh,upscale:We(C.getState()),lowRes:!1}),ko=new E(th);class rh{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"EditorSelectedRenderer"});tick(e){const{renderContext:{item:{jsonItemId:n},room:{editor:r}}}=this,o=n&&r?.hoveredJsonItemId?.includes(n),i=n&&r?.selectedJsonItemId?.includes(n);this.output.filters=o&&i?[ko,To]:o?To:i?ko:X,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const oh=(t,e,n)=>e.general.editor?new rh(e,n):n,ih=(t,e)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{C.dispatch(Da({item:t}))}))},sh=t=>{const e=C.getState(),n=Ma(e),r=!za(e),{item:o}=t,i=n==="all"||n==="non-wall"&&t.item.type!=="wall",s=[],a=Ji(o);if(a!==void 0){const h=new ms(t,a),f=new Jd(t,h);s.push(oh(o,t,eh(o,t,f))),i&&(f.output.alpha=.66)}if(r){const h=Td(t);h!==void 0&&s.push(h)}i&&s.push(new vd(t));let l;if(s.length===0)l=void 0;else{const h=s.length===1?s[0]:new ah(s,t);ih(o,h.output),l=new yd(t,h)}const c=t.general.soundSettings.mute??St.soundSettings.mute,u=t.general.paused||c?void 0:Vd(t),d=u===void 0?void 0:new Xd(t,u);return new kd(t,{graphics:l,sound:d})};class ah{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(r=>r.output))}#e;#n=new v({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const lh=j("wall","doorFrame"),Io=256;function*ch(t){const{left:e,right:n}=ae(t.items).filter(lh).reduce((r,{aabb:o,renderAabb:i,renderAabbOffset:s,state:{position:a}})=>{const l=i??o,c=F(a,s??O),u=x(F(c,{x:l.x})).x,d=x(F(c,{y:l.y})).x;return{left:Math.min(r.left,u),right:Math.max(r.right,d)}},{left:Number.POSITIVE_INFINITY,right:Number.NEGATIVE_INFINITY});e!==Number.POSITIVE_INFINITY&&(yield new H().rect(e-100,-256,100,Io).fill(0)),n!==Number.NEGATIVE_INFINITY&&(yield new H().rect(n,-256,100,Io).fill(0))}class uh{constructor(e){this.renderContext=e;const{general:{colourised:n,soundSettings:r},room:o}=e;this.initFilters(n,e.room.color);const s=r.mute??St.soundSettings.mute?void 0:S.createGain();tn(ch(o),this.#o),this.output={sound:s,graphics:new v({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#n),n||(this.#t=new _r({sortableChildren:!1}),this.output.graphics.addChild(this.#t)),this.output.graphics.addChild(this.#o),this.output.graphics.addChild(this.#r)}#e=!1;#n=new v({label:"items"});#t;#r=new _r({sortableChildren:!1});#o=new v({label:"occlusion"});output;#i=void 0;#a=new Map;#s=new Map;initFilters(e,n){this.#n.filters=e?n.shade==="dimmed"?Fl:X:new E(n.shade==="dimmed"?Li(gt(n).main.original):gt(n).main.original)}#l(e){const{room:n}=this.renderContext,r={...e,lastRenderRoomTime:this.#i};for(const i of ae(n.items)){let s=this.#s.get(i.id);if(s===void 0){s=sh({...this.renderContext,colourClashLayer:this.#t,frontLayer:this.#r,item:i}),this.#s.set(i.id,s);const{graphics:a,sound:l}=s.output;if(a&&(this.#n.addChild(a),i.fixedZIndex&&(a.zIndex=i.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{s.tick(r)}catch(a){throw new Error(`RoomRenderer caught error while ticking Renderer for item "${i.id}" - item in play object is:
           ${JSON.stringify(i,null,2)}`,{cause:a})}}let o=!1;for(const[i,s]of this.#s.entries())n.items[i]===void 0&&(s.destroy(),this.#s.delete(i),o=!0);o&&this.#c()}#c(){if(this.#t)for(const e of this.#t.renderLayerChildren)e.parent===null&&this.#t.detach(e);for(const e of this.#r.renderLayerChildren)e.parent===null&&this.#r.detach(e)}#d(e){const n=gd(this.renderContext.room.items,e.movedItems,this.#a),{order:r}=ps(n,this.renderContext.room.items);for(let o=0;o<r.length;o++){const i=this.#s.get(r[o]);if(i===void 0)throw new Error(`Item id=${r[o]} does not have a renderer - cannot assign a z-index`);const s=i.output.graphics;if(s)s.zIndex=r.length-o;else throw new Error(`order ${r[o]} was given a z-order by sorting, but item has no graphics`)}}get#u(){return this.#i!==void 0}tick(e){const n=this.#u?e:{...e,movedItems:new Set(ae(this.renderContext.room.items))};this.#l(n),(!this.#u||n.movedItems.size>0)&&this.#d(n),this.#i=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#s.forEach(e=>{e.destroy()}),this.#e=!0}get destroyed(){return this.#e}}var ln=`in vec2 aPosition;
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
`,cn=`struct GlobalFilterUniforms {
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
}`,dh=`precision highp float;
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
`,hh=`struct CRTUniforms {
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
}`,fh=Object.defineProperty,ph=(t,e,n)=>e in t?fh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,jt=(t,e,n)=>(ph(t,typeof e!="symbol"?e+"":e,n),n);const gs=class bs extends N{constructor(e){e={...bs.DEFAULT_OPTIONS,...e};const n=Pe.from({vertex:{source:cn,entryPoint:"mainVertex"},fragment:{source:hh,entryPoint:"mainFragment"}}),r=$.from({vertex:ln,fragment:dh,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),jt(this,"uniforms"),jt(this,"seed"),jt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};jt(gs,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let mh=gs;var gh=`
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
}`,bh=`struct KawaseBlurUniforms {
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
}`,vh=`
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
`,yh=`struct KawaseBlurUniforms {
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
}`,xh=Object.defineProperty,wh=(t,e,n)=>e in t?xh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ce=(t,e,n)=>(wh(t,typeof e!="symbol"?e+"":e,n),n);const vs=class ys extends N{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Xe("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...ys.DEFAULT_OPTIONS,...n};const r=Pe.from({vertex:{source:cn,entryPoint:"mainVertex"},fragment:{source:n?.clamp?yh:bh,entryPoint:"mainFragment"}}),o=$.from({vertex:ln,fragment:n?.clamp?vh:gh,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ce(this,"uniforms"),Ce(this,"_pixelSize",{x:0,y:0}),Ce(this,"_clamp"),Ce(this,"_kernels",[]),Ce(this,"_blur"),Ce(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=Ue.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),Ue.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};Ce(vs,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Sh=vs;var Ch=`in vec2 vTextureCoord;
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
`,Th=`struct AdvancedBloomUniforms {
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
`,kh=`
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
`,Ih=`struct ExtractBrightnessUniforms {
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
`,Oh=Object.defineProperty,Ph=(t,e,n)=>e in t?Oh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,xs=(t,e,n)=>(Ph(t,typeof e!="symbol"?e+"":e,n),n);const ws=class Ss extends N{constructor(e){e={...Ss.DEFAULT_OPTIONS,...e};const n=Pe.from({vertex:{source:cn,entryPoint:"mainVertex"},fragment:{source:Ih,entryPoint:"mainFragment"}}),r=$.from({vertex:ln,fragment:kh,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),xs(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};xs(ws,"DEFAULT_OPTIONS",{threshold:.5});let _h=ws;var Bh=Object.defineProperty,Rh=(t,e,n)=>e in t?Bh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ee=(t,e,n)=>(Rh(t,typeof e!="symbol"?e+"":e,n),n);const Cs=class Ts extends N{constructor(e){e={...Ts.DEFAULT_OPTIONS,...e};const n=Pe.from({vertex:{source:cn,entryPoint:"mainVertex"},fragment:{source:Th,entryPoint:"mainFragment"}}),r=$.from({vertex:ln,fragment:Ch,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:ie.WHITE}}),Ee(this,"uniforms"),Ee(this,"bloomScale",1),Ee(this,"brightness",1),Ee(this,"_extractFilter"),Ee(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new _h({threshold:e.threshold}),this._blurFilter=new Sh({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=Ue.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Ue.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),Ue.returnTexture(s),Ue.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Ee(Cs,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ah=Cs;const Fh=Q,Mh=(t,e)=>(n,r)=>{const o=new Set;if(La(n)){const u=ge(n)?.items;if(u!==void 0){const d=wt(Z(Kt(u))).filter(h=>h!==void 0);for(const h of d)o.add(h)}}const s=r*n.gameSpeed,a=Math.max(1,Math.ceil(s/e)),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)o.add(h)}const c=ge(n)?.items??Fh;for(const u of o)c[u.id]===void 0&&o.delete(u);return o},zh=t=>{const e={},n=Object.values(t.items).filter(r=>r.type==="door");for(const{config:{direction:r},position:{x:o,y:i}}of n)vt(r)==="x"?i===0?e.towards=!0:i===t.size.y&&(e.away=!0):o===0?e.right=!0:o===t.size.x&&(e.left=!0);return e},Dh=t=>{const e=zh(t),n=e.right?-.5:0,r=t.size.x+(e.left?.5:0),o=e.towards?-.5:0,i=t.size.y+(e.away?.5:0);return{blockXMin:n,blockXMax:r,blockYMin:o,blockYMax:i,sidesWithDoors:e}},ks=t=>{const{blockXMax:e,blockXMin:n,blockYMax:r,blockYMin:o,sidesWithDoors:i}=Dh(t),s=V({x:t.size.x+(i.right?.5:0),y:-o}).x,a=V({x:-n,y:t.size.y+(i.towards?.5:0)}).x,l=V({x:t.size.x,y:t.size.y}).y,c=V({x:n,y:o}),u=V({x:e,y:r});return{blockXMin:n,blockXMax:e,blockYMin:o,blockYMax:r,edgeLeftX:s,edgeRightX:a,topEdgeY:l,frontSide:c,backSide:u,sidesWithDoors:i}},Le=.33,Lh=Ea()==="mobile"?-4:16,$n=je.h-je.w/2,Eh=ve.heels;class $h{constructor(e,n){this.renderContext=e,this.childRenderer=n;const{room:r,general:{upscale:{gameEngineScreenSize:o},displaySettings:i}}=e,{edgeLeftX:s,edgeRightX:a,frontSide:l,topEdgeY:c}=ks(r.roomJson);this.#o=s+l.x,this.#i=a+l.x;const u=(a+s)/2;this.#a={x:o.x/2-u,y:o.y-Lh-l.y-Math.abs(u/2)},this.#n=this.#a.x+this.#o<0,this.#t=this.#a.x+this.#i>o.x,this.#r=this.#a.y+c-$n<0;const d=this.childRenderer.output.graphics;if(d===void 0)throw new Error("can't scroll a renderer without graphics");const h={sound:this.childRenderer.output.sound,graphics:new v({children:[d],label:`RoomScrollRenderer(${r.id})`})};(i?.showBoundingBoxes??St.displaySettings.showBoundingBoxes)!=="none"&&h.graphics.addChild(Uh(e.room.roomJson)),this.output=h}#e=!1;#n;#t;#r;#o;#i;#a;output;tick(e){const{general:{upscale:{gameEngineScreenSize:n},gameState:r}}=this.renderContext,{deltaMS:o}=e,i=Qe(r);if(i===void 0)return;const s=x(i.state.position),a=F(s,this.#a),l={x:this.#n&&a.x<n.x*Le?Math.min(-this.#o,n.x*Le-s.x):this.#t&&a.x>n.x*(1-Le)?Math.max(n.x-this.#i,n.x*(1-Le)-s.x):this.#a.x,y:this.#r&&a.y<n.y*Le?n.y*Le-s.y:this.#a.y},c=this.output.graphics;if(!this.#e)c.x=l.x,c.y=l.y;else{const d=Eh*o,h=de(c,l),f=jn(h);if(f>d){const g={x:h.x/f,y:h.y/f};c.x-=g.x*d,c.y-=g.y*d}else c.x=l.x,c.y=l.y}this.#e=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Uh=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=ks(t);return new H().rect(e+r.x,o-$n,n-e,r.y-o+$n).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")},Oo=({crtFilter:t},e)=>[t?new mh({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Ah({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Nh{constructor(e,n){this.app=e,this.gameState=n;try{const r=C.getState(),o=We(r);if(this.#i.connect(S.destination),e.stage.addChild(this.#o),e.stage.scale=o,ge(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(r){this.#s(r);return}}#e;#n;#t;#r;#o=new v({label:"MainLoop/world"});#i=S.createGain();#a=Mh(ld,ja);#s(e){C.dispatch($a(Ua(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}}}=C.getState();this.#e=Oo(e,!0),this.#n=Oo(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const r=new Error("Error caught in main loop tick",{cause:n});console.error(r),this.#s(r)}};tick=({deltaMS:e})=>{const n=C.getState();if(Na(n))return;const r=Ga(n),{gameMenus:{userSettings:{displaySettings:o,soundSettings:i}},upscale:{upscale:s}}=C.getState(),a=!r&&!(o?.uncolourised??St.displaySettings.uncolourised),l=Va(n),c=Ha(n);(this.#t?.renderContext.general.colourised!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Iu({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:o,soundSettings:i,colourised:a,upscale:s,editor:!1},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#t.output));const u=ge(this.gameState);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=r?Xn:this.#a(this.gameState,e),h=ge(this.gameState);if(this.#r?.renderContext.room!==h||this.#r?.renderContext.general.upscale!==s||this.#r?.renderContext.general.displaySettings!==o||this.#r?.renderContext.general.soundSettings!==i||this.#r?.renderContext.general.paused!==r){if(this.#r?.destroy(),h){const f={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:o,soundSettings:i,colourised:a,upscale:s,editor:!1},room:h};this.#r=new $h(f,new uh(f)),this.#o.addChild(this.#r.output.graphics),this.#r.output.sound?.connect(this.#i)}else this.#r=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#r?.tick({progression:this.gameState.progression,movedItems:d,deltaMS:e}),r?this.app.stage.filters=this.#e:this.app.stage.filters=this.#n;try{this.app.render()}catch(f){throw new Error("Error in Pixi.js render",{cause:f})}};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#o),this.#i.disconnect(),this.#r?.destroy(),this.#t?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}Yt.add(ri,oi,ii,si,ai,li,ci,ui,di,hi,fi,mi,pi,gi,bi,vi,yi,xi,wi,Si,Ci);const Gh=t=>{t.ticker.remove(t.render,t)};Wa.defaultOptions.scaleMode="nearest";const Po=async(t,e)=>{const n=new Ri;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0}),Gh(n),n.ticker.maxFPS=Xa;const r=C.getState().gameMenus.currentGame,o=vr({campaign:t,inputStateTracker:e,savedGame:r});r!==void 0?C.dispatch(qa(r.store.gameMenus)):(C.dispatch(yr(o.characterRooms.head.id)),C.dispatch(yr(o.characterRooms.heels.id)));const i=new Nh(n,o).start();return{campaign:t,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Qe(o);a!==void 0&&Yn({playableItem:a,gameState:o,toRoomId:s,changeType:"level-select"})},get currentRoom(){return ge(o)},get gameState(){return o},reincarnateFrom(s){vr({campaign:t,inputStateTracker:e,savedGame:s,writeInto:o})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},qh=Object.freeze(Object.defineProperty({__proto__:null,default:Po,gameMain:Po},Symbol.toStringTag,{value:"Module"}));export{Oi as A,Ti as C,N as F,Kn as R,ul as S,Pi as V,ml as a,qh as g,cl as u};
