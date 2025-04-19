const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BwPLy8fz.js","assets/App-CdWqa5Fv.js","assets/index-BRuOppgk.js","assets/index-QfFzygc-.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-C0ogJFJo.js","assets/Graphics-BwdOpXv4.js","assets/changeCharacterRoom-DpDP3HtD.js","assets/WebGLRenderer-DQkFn0kd.js"])))=>i.map(i=>d[i]);
import{b1 as Oi,b2 as Go,b3 as Bi,ak as _i,ao as xe,ap as G,ac as Ho,al as ge,X as C,a0 as At,_ as Pi,a1 as b,d as Ze,v as _t,aE as v,a4 as rn,aw as ze,Y as Ve,Z as Fi,V as Ai,b4 as Di,b5 as Mi,b6 as zi,ab as Li,b7 as P,b8 as Ln,I as O,b9 as Vo,ba as ce,bb as k,bc as Xo,s as jo,K as x,o as q,c as B,bd as Ri,be as Ei,bf as Ui,g as z,bg as rt,bh as $i,bi as yn,bj as qo,bk as Ni,bl as Gi,bm as St,i as oe,t as we,p as xn,l as U,bn as Hi,bo as Vi,bp as Xi,bq as ji,br as qi,bs as Wi,F as Qe,bt as Tt,e as Ji,bu as Dt,bv as Yi,bw as Wo,k as Jo,bx as Mt,by as N,j as J,bz as Yo,bA as wn,bB as Rn,bC as Zo,bD as Zi,bE as it,bF as Qo,bG as Ce,bH as zt,bI as ae,P as st,E as ue,bJ as de,x as Se,bK as sn,bL as Qi,bM as Ki,bN as es,bO as ts,bP as Cn,y as Le,bQ as ns,bR as os,bS as rs,bT as an,bU as is,bV as ss,bW as dt,f as Ko,bX as as,bY as ls,bZ as cs,m as Te,A as er,b_ as En,h as fe,b$ as tr,r as nr,b as us,a as or,n as ds,aZ as Re,c0 as Gt,c1 as je,c2 as ft,c3 as fs,c4 as hs,c5 as ps,c6 as Ee,c7 as Un,c8 as Sn,c9 as ms,ca as gs,cb as at,cc as bs,cd as vs,ce as ys,cf as xs,cg as ws,ch as $n,J as Nn,ci as rr,b0 as ir,C as sr,D as Cs,z as Gn,cj as Ss,ck as Ts,cl as ks,aY as be,cm as ar,cn as Is,co as Os,cp as S,cq as Bs,cr as Pt,cs as _s,ct as kt,cu as Ps,cv as Fs,cw as Hn,cx as As,cy as Ds,Q as Ke,cz as Lt,cA as Ms,cB as lr,cC as qe,cD as w,cE as ln,cF as cn,q as zs,cG as Ht,H as Vn,cH as Ls,cI as Rs,cJ as Es,cK as cr,au as Fe,cL as Us,cM as $s,cN as Ns,cO as Gs,cP as Hs,cQ as Vs,cR as Xs,cS as js,cT as Xn,cU as qs,L as jn,cV as Ws}from"./App-CdWqa5Fv.js";import{a as Js,f as un,c as Tn,m as Rt,b as kn,d as ur,r as Ys,o as Zs}from"./changeCharacterRoom-DpDP3HtD.js";import{S as Qs,G as W}from"./Graphics-BwdOpXv4.js";import{g as dr,_ as qn}from"./index-BRuOppgk.js";var ht={},Wn;function Ks(){if(Wn)return ht;Wn=1;var t=Oi(),e=t.mark(i),n=Go(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return f=d[u],y.delegateYield(r(f),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}ht.__concat=i;var s=o(i);return ht.concat=s,ht}var pt={},Jn;function ea(){if(Jn)return pt;Jn=1;var t=Go(),e=t.iterableCurry,n=Bi(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}pt.__isEmpty=i;var s=e(i,{reduces:!0});return pt.isEmpty=s,pt}var Vt,Yn;function ta(){return Yn||(Yn=1,Vt=Ks().concat),Vt}var na=ta();const Zn=dr(na);var Xt,Qn;function oa(){return Qn||(Qn=1,Xt=ea().isEmpty),Xt}var ra=oa();const fr=dr(ra),hr=class dn extends _i{constructor(e){e={...dn.defaultOptions,...e},super(e),this.enabled=!0,this._state=Qs.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=xe.from(n)),o&&(s=G.from(o)),new dn({gpuProgram:i,glProgram:s,...r})}};hr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Z=hr;var ia=`
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
`,sa=`in vec2 aPosition;
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
`,aa=`
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
}`;class I extends Z{constructor(e){const n=e.gpu,o=Kn({source:aa,...n}),r=xe.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Kn({source:ia,...i}),a=G.from({vertex:sa,fragment:s}),l=new Ho({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:ge.EMPTY}})}}function Kn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const In=`
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
    `,On=`
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
	`;class pr extends I{constructor(){super({gl:{functions:`
                ${In}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${On}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}pr.extension={name:"color",type:C.BlendMode};class mr extends I{constructor(){super({gl:{functions:`
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
            `}})}}mr.extension={name:"color-burn",type:C.BlendMode};class gr extends I{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"color-dodge",type:C.BlendMode};class br extends I{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"darken",type:C.BlendMode};class vr extends I{constructor(){super({gl:{functions:`
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
            `}})}}vr.extension={name:"difference",type:C.BlendMode};class yr extends I{constructor(){super({gl:{functions:`
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
            `}})}}yr.extension={name:"divide",type:C.BlendMode};class xr extends I{constructor(){super({gl:{functions:`
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
            `}})}}xr.extension={name:"exclusion",type:C.BlendMode};class wr extends I{constructor(){super({gl:{functions:`
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
                `}})}}wr.extension={name:"hard-light",type:C.BlendMode};class Cr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"hard-mix",type:C.BlendMode};class Sr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Sr.extension={name:"lighten",type:C.BlendMode};class Tr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Tr.extension={name:"linear-burn",type:C.BlendMode};class kr extends I{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"linear-dodge",type:C.BlendMode};class Ir extends I{constructor(){super({gl:{functions:`
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
            `}})}}Ir.extension={name:"linear-light",type:C.BlendMode};class Or extends I{constructor(){super({gl:{functions:`
                ${In}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${On}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Or.extension={name:"luminosity",type:C.BlendMode};class Br extends I{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"negation",type:C.BlendMode};class _r extends I{constructor(){super({gl:{functions:`
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
                `}})}}_r.extension={name:"overlay",type:C.BlendMode};class Pr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"pin-light",type:C.BlendMode};class Fr extends I{constructor(){super({gl:{functions:`
                ${In}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${On}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Fr.extension={name:"saturation",type:C.BlendMode};class Ar extends I{constructor(){super({gl:{functions:`
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
                `}})}}Ar.extension={name:"soft-light",type:C.BlendMode};class Dr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Dr.extension={name:"subtract",type:C.BlendMode};class Mr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Mr.extension={name:"vivid-light",type:C.BlendMode};const fn=[];At.handleByNamedList(C.Environment,fn);async function la(t){if(!t)for(let e=0;e<fn.length;e++){const n=fn[e];if(n.value.test()){await n.value.load();return}}}let Ue;function ca(){if(typeof Ue=="boolean")return Ue;try{Ue=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Ue=!1}return Ue}var zr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(zr||{});class ua{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const da=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Lr=class Rr extends Pi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...da,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await la(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Rr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(Ze(_t,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:v.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=zr.ALL);const{clear:o,clearColor:r,target:i}=e;v.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ua(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!ca())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Lr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Er=Lr,mt;function fa(t){return mt!==void 0||(mt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Er.defaultOptions.failIfMajorPerformanceCaveat};try{if(!rn.get().getWebGLRenderingContext())return!1;let o=rn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),mt}let gt;async function ha(t={}){return gt!==void 0||(gt=await(async()=>{const e=rn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),gt}const eo=["webgl","webgpu","canvas"];async function pa(t){let e=[];t.preference?(e.push(t.preference),eo.forEach(i=>{i!==t.preference&&e.push(i)})):e=eo.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ha()){const{WebGPURenderer:a}=await qn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-BwPLy8fz.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&fa(t.failIfMajorPerformanceCaveat??Er.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await qn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-DQkFn0kd.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Ur="8.8.1";class $r{static init(){globalThis.__PIXI_APP_INIT__?.(this,Ur)}static destroy(){}}$r.extension=C.Application;class ma{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Ur)}destroy(){this._renderer=null}}ma.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Nr=class hn{constructor(...e){this.stage=new b,e[0]!==void 0&&Ze(_t,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await pa(e),hn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ze(_t,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=hn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Nr._plugins=[];let Gr=Nr;At.handleByList(C.Application,Gr._plugins);At.add($r);var ga=`in vec2 aPosition;
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
`,ba=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,to=`struct GlobalFilterUniforms {
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
}`;const Hr=class Vr extends Z{constructor(e){e={...Vr.defaultOptions,...e};const n=xe.from({vertex:{source:to,entryPoint:"mainVertex"},fragment:{source:to,entryPoint:"mainFragment"}}),o=G.from({vertex:ga,fragment:ba,name:"alpha-filter"}),{alpha:r,...i}=e,s=new Ho({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Hr.defaultOptions={alpha:1};let va=Hr;class et extends ze{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof ge?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ve.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ve.shared.add(this.update,this,Fi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(ge.from(e[o]));return new et(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(ge.from(e[o]));return new et(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof ge)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ve.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ve.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ya extends Ai{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Di({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function xa(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ze(_t,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class wa extends ya{constructor(...e){const n=xa(e,"Text");super(n,Mi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=zi.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Bn extends ge{static create(e){return new Bn({source:new Li(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const m={pureBlack:new v("#000000"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),pastelBlue:new v("#75ACFF"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},re=t=>{const[e,n,o]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:o/2})},X={original:new v(P.zxWhite),basic:m.white,dimmed:m.lightGrey},j={original:new v(P.zxYellow),basic:m.midRed,dimmed:m.redShadow},Q={original:new v(P.zxMagenta),basic:m.pink,dimmed:re(m.pink)},_={original:new v(P.zxCyan),basic:m.pastelBlue,dimmed:re(m.pastelBlue)},K={original:new v(P.zxGreen),basic:m.moss,dimmed:re(m.moss)},_n={white:{basic:{main:X,edges:{towards:_,right:j},hud:{lives:j,dimmed:Q,icons:_}},dimmed:{main:X,edges:{towards:K,right:_},hud:{lives:j,dimmed:Q,icons:_}}},yellow:{basic:{main:j,edges:{towards:K,right:X},hud:{lives:_,dimmed:Q,icons:K}},dimmed:{main:j,edges:{towards:_,right:_},hud:{lives:_,dimmed:Q,icons:K}}},magenta:{basic:{main:Q,edges:{towards:K,right:_},hud:{lives:X,dimmed:_,icons:j}},dimmed:{main:Q,edges:{towards:K,right:_},hud:{lives:X,dimmed:_,icons:j}}},cyan:{basic:{main:_,edges:{towards:Q,right:X},hud:{lives:X,dimmed:K,icons:j}},dimmed:{main:_,edges:{towards:Q,right:X},hud:{lives:X,dimmed:K,icons:j}}},green:{basic:{main:K,edges:{towards:_,right:j},hud:{lives:X,dimmed:Q,icons:_}},dimmed:{main:K,edges:{towards:_,right:j},hud:{lives:X,dimmed:Q,icons:_}}}},Pn=t=>_n[t.hue][t.shade],Ae={head:m.pastelBlue,heels:m.pink},It=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Ln>n?100-Math.ceil((n-e)/(Ln/100)):0},Xr=t=>t.type==="headOverHeels"?It(t.state.head)>0||It(t.state.heels)>0:It(t.state)>0,jr=t=>{const e=100*O.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/O.w):0},Ca={pureBlack:new v("#000000"),shadow:new v("#1B2D3B"),midGrey:new v("#505A55"),lightGrey:new v("#929981"),white:new v("#F8FEF8"),pastelBlue:new v("#4893FF"),metallicBlue:new v("#1D4E80"),pink:new v("#B973AF"),moss:new v("#6E7B00"),redShadow:new v("#513D40"),midRed:new v("#A7574B"),lightBeige:new v("#BF8E69"),highlightBeige:new v("#DBB269"),alpha:new v("#105A69"),replaceLight:new v("#048662"),replaceDark:new v("#052229")},lt=`in vec2 aPosition;
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
`,Sa=`in vec2 vTextureCoord;
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
`;class he extends Z{constructor(e){const n=Object.keys(e).length,o=G.from({vertex:lt,fragment:Sa.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{m[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const Ta=`precision mediump float;
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
`;class $ extends Z{uniforms;constructor(e="white"){const n=G.from({vertex:lt,fragment:Ta,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ka=`precision mediump float;
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
`;class Ia extends Z{constructor(){const e=G.from({vertex:lt,fragment:ka,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const qr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Wr=t=>qr(_n[t.color.hue][t.color.shade].main),Jr=t=>new he({lightBeige:m.lightGrey,redShadow:m.shadow,pink:m.lightGrey,moss:m.lightGrey,midRed:m.midGrey,highlightBeige:m.lightGrey,...t&&Wr(t)}),Oa=new he({midGrey:m.midRed,lightGrey:m.lightBeige,white:m.highlightBeige,metallicBlue:m.redShadow,pink:m.midRed,moss:m.midRed,replaceDark:m.midRed,replaceLight:m.lightBeige}),Ba=t=>new he({replaceLight:t,replaceDark:re(t)}),pn=(t,e,n)=>n?new he(qr(_n[t.color.hue][t.color.shade].edges[e])):new $(Pn(t.color).edges[e].original),ie=t=>new he(Wr(t)),no=new Ia,ye=Vo,_a=new he(Ca),oo={x:.5,y:1},ro=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(ro(t)?c=Pa(t):c=new ze(ce().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let g=1;g<=u.z;g++){const y=p({...t,times:void 0,label:`(${f},${h},${g})`}),T=k({x:f-1,y:h-1,z:g-1});y.x+=T.x,y.y+=+T.y,d.addChild(y)}return d}if(e===void 0&&o===void 0)if(ro(t))c.anchor=oo;else{const u=ce().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=oo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Pa({animationId:t,reverse:e,playOnce:n,paused:o}){const r=ce().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:Xo}));e&&s.reverse();const a=new et(s);return a.animationSpeed=jo.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Fa=`#version 300 es

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
`;class ve extends Z{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=G.from({vertex:lt,fragment:Fa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const te=new ve({outlineColor:m.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),We=new $,io=new $,Fn=new $,so=new $(m.moss),Je=new $,ee=[We,te],Aa=[Je,te],Da=[te,Fn],bt={original:[te,Je],colourised:{head:{active:[te,new $(Ae.head)],inactive:[te,new $(re(Ae.head))]},heels:{active:[te,new $(Ae.heels)],inactive:[te,new $(re(Ae.heels))]}}},ke=14,Ma=2,za=Math.cos(30*(Math.PI/180)),La=40;class Ra{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:ke,y:-14,filter:ee}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:ke,y:ke,filter:ee}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:ke,filter:ee}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:ke*Math.SQRT2,filter:ee}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:ke*Math.SQRT2,filter:ee}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new W().circle(0,0,La).fill("#00000000"));for(const o of q(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?ye:We}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=B};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Ri(x.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=Ei({x:-c,y:-u}),f=Ui(d,za),h=z(f,Ma);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(x.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=rt(e)>$i?yn(e):void 0;for(const[r,i]of qo(this.arrowSprites))i.filters=r===o?Aa:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const mn={colourised:{jump:m.pastelBlue,fire:m.highlightBeige,carry:m.moss,carryAndJump:m.midRed,menu:m.lightGrey,map:m.lightGrey},zx:{jump:P.zxBlue,fire:P.zxYellow,carry:P.zxGreen,carryAndJump:P.zxRed,menu:P.zxWhite,map:P.zxWhite}};function tt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*Yr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${Ni(e[o])}`;try{Gi(r)}catch(i){throw new Error(`invalid texture id at index ${o} - char code is ${e[o].charCodeAt(0)} : ${i.message}`,{cause:i})}yield p({textureId:r,x:(o+.5-n/2)*St.w})}}function _e(t,e){return t.removeChildren(),tt(Yr(e),t),t}function An(t,e){t.removeChildren();try{tt(Yr(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t}const Xe=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?Da:Fn,scale:{x:1,y:t?2:1}}),Ft=Symbol(),Zr=Symbol(),Qr=Symbol(),vt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Ba(mn.colourised[e]):o.filters=new $(mn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Zr]=r,o[Ft]=i,o[Qr]=n,o},$e=(t,...e)=>{t[Ft].removeChildren();for(const n of e)n!==void 0&&t[Ft].addChild(n)},yt=(t,e)=>{t[Zr].texture=ce().textures[e?"button.pressed":"button"],t[Qr].y=e?1:0},ao=(t,e,n)=>{n&&(t[Ft].filters=e?Jr():ye)},lo=({which:t},e,n)=>{const o=An(new b,n);return o.filters=new he({white:e?re(mn.colourised[t]):m.pureBlack}),o};class Kr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const ei=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Ea=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},co=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Ea(t,e,n,o),Dn=(t,e,n=.001)=>{if(!we(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:xn({state:{position:U(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+Hi},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},ti=(t,e)=>{const o=[...oe(e).filter(i=>Dn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=Js(s,i);return a<0||a===0&&co(t,s)>co(t,i)?s:i})},Ye=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Vi};function ni({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Xr(e)||Ye(e)||(e.state.action="death",e.state.expires=t+un))}const se=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,nt=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Ua=3e3,oi=t=>{const{gameState:e,movingItem:n,touchedItem:o,room:r}=t,{id:i,config:s}=o,{id:a,roomJson:{items:l},roomTime:c}=r,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0);const d=f=>{const h=Ji(o),g={type:"floatingText",id:`floatingText-${i}`,...Wo,fixedZIndex:999,aabb:B,state:{...Yi(),position:U(h,{z:O.h/2}),expires:c+Ua},config:{textLines:f,appearanceRoomTime:c}};Dt({room:r,item:g})};switch(s.gives){case"hooter":{const f=Tt(n);f!==void 0&&(f.hasHooter=!0),d(["hooter","collected"]);break}case"doughnuts":{const f=Tt(n);f!==void 0&&(f.doughnuts=se(f.doughnuts,6)),d(["+6","doughnuts"]);break}case"bag":{const f=Qe(n);f!==void 0&&(f.hasBag=!0),d(["bag","collected"]);break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,d(["99","shield"]);break}case"fast":{const f=Tt(n);f!==void 0&&(f.fastStepsStartedAtDistance=f.gameWalkDistance),d(["99","fast steps"]);break}case"jumps":{const f=Qe(n);f!==void 0&&(f.bigJumps+=10),d(["10","big jumps"]);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=se(n.state.head.lives,2),n.state.heels.lives=se(n.state.heels.lives,2),d(["+2","lives","each"])):(n.state.lives=se(n.state.lives,2),d(["+2","lives"]));break;case"scroll":x.dispatch(Wi(s.page));break;case"reincarnation":{x.dispatch(ji(qi(e,x.getState()))),d(["reincarnation","point","saved"]);break}case"crown":{x.dispatch(Xi(s.planet)),d([s.planet,"liberated!"]);break}}},$a=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Jo(i,o)<=0||e.state.action!=="death"&&Tn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},Na=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Mt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Ga({movingItem:t}){t.state.autoWalk=!1}const ne=(t,...e)=>J(...e)(t.touchedItem),Ne=(t,...e)=>J(...e)(t.movingItem),ri=t=>N(t.movingItem),Ha=t=>N(t.touchedItem),Va=t=>Yo(t.touchedItem),uo=t=>{switch(!0){case ne(t,"stopAutowalk"):Ga(t);break;case Va(t):ni(t);break;case ne(t,"portal"):$a(t);break;case ne(t,"pickup"):oi(t);break;case ne(t,"doorFrame"):Na(t);break}},Y={movementType:"steady"},Mn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=wn(e.items);if(r!==void 0)return Ye(r)?void 0:r;const i=n===void 0||Ye(n)||n.state.action==="death"?void 0:Rn(n.state.position,t),s=o===void 0||Ye(o)||o.state.action==="death"?void 0:Rn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ii=150,si=t=>t[Math.floor(Math.random()*t.length)],le=Object.freeze({movementType:"vel",vels:{walking:B}}),Et=t=>Zo(t)?de[t.config.which]:de[t.type],fo=O.w/2,Xa=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=de.homingBot;if(!zt(e,ae))return{movementType:"steady"};const{head:s,heels:a}=wn(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=it(l.state.position,t);if(Math.abs(c.y)<fo)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<fo)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ja=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return le;const l=Mn(r,e);if(l===void 0||s+ii>e.roomTime)return Y;const c=it(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>O.w/4?u:st(u),f=Et(t),h={...B,[d]:c[d]>0?f:-f},g=Ce(h),y=!zt(g,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:g,...y?{timeOfLastDirectionChange:e.roomTime}:ue}}},ho=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return le;const a=Mn(i,e);if(a===void 0)return le;const l=a.state.position,c=O.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return le;const d=it(a?.state.position,i),f=Et(t),h=(1+Math.sqrt(2))/2,g=f*h,y=z({...d,z:0},g/Qo(d)*(r?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:Ce(y)}}},jt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return le;if(!(Se(i,B)||Math.random()<o/1e3))return Y;const l=si(r);return{movementType:"vel",vels:{walking:z(sn[l],Et(t))},stateDelta:{facing:sn[l]}}},qa=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?le:zt(i,ae)?{movementType:"vel",vels:{walking:z(r,Et(t))}}:Y},Wa=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=si([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},qt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ii))return;const c=Rt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Wa(s,c,r);t.state.vels.walking=u,t.state.facing=Ce(u),t.state.durationOfTouch=0},Ja=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=B)},Ya=(t,e,n,o)=>{if(!t.state.activated||Zo(t)&&t.state.busyLickingDoughnutsOffFace)return le;switch(t.config.movement){case"patrol-randomly-diagonal":return jt(t,e,n,o,es);case"patrol-randomly-xy8":return jt(t,e,n,o,Ki);case"patrol-randomly-xy4":return jt(t,e,n,o,Qi);case"towards-tripped-on-axis-xy4":return Xa(t,e);case"towards-on-shortest-axis-xy4":return ja(t,e);case"back-forth":case"clockwise":return qa(t);case"unmoving":return le;case"towards-analogue":return ho(t,e);case"towards-analogue-unless-planet-crowns":return ho(t,e,n,o,Zi(x.getState()));default:throw t.config,new Error("this should be unreachable")}},Za=t=>{const{movingItem:e,touchedItem:n}=t;if(we(n,e))switch(e.config.movement){case"patrol-randomly-xy4":qt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":qt(t,"opposite");break;case"clockwise":qt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Ja(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},Qa=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s]})}break}case"in-store":{x.dispatch(ts(o.path));break}}},Ka=({movingItem:t,touchedItem:e})=>{if(!we(t))return;const{state:{position:n},aabb:o}=e,r=Rt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=Ce(r),s=z(i,-.05);return e.state.vels.sliding=s,!1},el=({movingItem:t,touchedItem:e})=>{if(!we(e))return;const n=t.state.vels.sliding;if(Se(n,B))return;const{state:{position:o},aabb:r}=t,i=Rt(e.state.position,e.aabb,o,r);return Jo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=B),!1},tl=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Rt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Ce(c);for(const d of s){const f=e.items[d],h=z(u,-.025*o);f.state.facing=h,kn({room:e,subjectItem:f,gameState:r,pusher:n,posDelta:h,deltaMS:o,onTouch:i})}},ct=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Cn(x.getState(),t),nl=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&J("teleporter")(l)&&ct(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:un}}}:Y;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Tn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:un}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},ol=1e3/12,xt=t=>{const e=t-is,o=e/ss*Xo;return(e+.5*an*o**2)/o},rl={head:xt(dt.head),headOnSpring:xt(dt.head+O.h),heels:xt(dt.heels),heelsOnSpring:xt(dt.heels+O.h)},po=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return rl[`${n}${e?"OnSpring":""}`]},il=t=>!(t===null||os(t)&&ct(t)||rs(t)&&t.config.gives==="scroll"||N(t)&&t.state.standingOnItemId===null),sl=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+ol>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),ai=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Le(o,e);if(sl(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:po(t,!1)}},stateDelta:{}};if(!(r.currentActionPress("jump")!=="released"&&il(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Y;const a=ns(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:po(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},al=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=rt(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return z(n,l)},mo={movementType:"vel",vels:{walking:B}},li=(t,e,n,o)=>{const r=ll(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=rt(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Se(r.vels.walking,B)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},ll=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:g}}}=t,y=o===t.id,T=y?n.currentActionPress("jump"):"released",F=y?n.directionVector:B,A=l===null&&g.z<0,D=i==="head"&&jr(t.state)>0&&l!==null,H=i==="headOverHeels"?A?"head":"heels":D?"heels":i,M=a?c:F,V=de[H];if(u!==null||s==="death")return mo;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Ko(h,z(h,as*r))}}:mo;if(T!=="released"){const ut=Ce(zt(M,ae)?c:M),Ii=J("spring")(Le(l,e))?1:ls;return{movementType:"vel",vels:{walking:z({...ut,z:0},V*Ii)},stateDelta:{facing:ut}}}}if(rt(M)!==0)return A?{movementType:"vel",vels:{walking:z({...M,z:0},V)},stateDelta:{facing:M,action:"falling"}}:{movementType:"vel",vels:{walking:al({vel:h,acc:cs[H],deltaMS:r,maxSpeed:V,unitD:M,minSpeed:0})},stateDelta:{facing:M,action:"moving"}};if(d>0&&d<1){const ut=Se(f,c)?1:0;return{movementType:"position",posDelta:z(c,ut-d),stateDelta:{action:A?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:B},stateDelta:{action:A?"falling":"idle"}}},go=t=>Te(t.movingItem)&&Dn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),ci=(t,e)=>{let n=B;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(Te(t)||J("lift")(t)))for(const[i,s]of qo(o.vels)){const a={...B,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},bo=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&N(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&go(t)){if(go(t)&&ri(t)){er({above:t.movingItem,below:t.touchedItem});const n=[ai(t.movingItem,t.room,t.gameState,t.deltaMS),li(t.movingItem,t.room,t.gameState,t.deltaMS)];ci(t.movingItem,n)}ur(t)}};function cl(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const zn=t=>{ri(t)&&uo(t),Ha(t)&&uo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ne(t,...En)&&Ka(t),Ne(t,...En)&&el(t),(Ne(t,"monster")&&ne(t,"firedDoughnut")||Ne(t,"firedDoughnut")&&ne(t,"monster"))&&cl(t),(Ne(t,"monster")||Ne(t,"movingPlatform"))&&Za(t),ne(t,"switch")&&Qa(t),ne(t,"joystick")&&tl(t,zn),t.touchedItem.state.disappear&&bo(t),t.movingItem.state.disappear&&we(t.touchedItem,t.movingItem)&&bo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},ul=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=fe(e.items).filter(tr),u=s===null?ui(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;dl(e,i,u),r.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!di(t,nr(e.items)))return;const h=us({gameState:n,room:e,itemType:s.type,config:s.config,position:l});kn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:zn}),i.carrying=null,r.actionsHandled.add("carry")}},dl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,or({room:t,item:n})},ui=(t,e)=>ti(t,fe(e.items).filter(tr)),di=(t,e)=>{const n={position:U(t.state.position,{z:O.h})},o=ds({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(we(r,t)){if(!Te(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!di(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Wt=-11,fl={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter"&&ct(l),u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?vt({colourise:n,button:t}):r;if(o?.pressed!==u&&yt(d,u),c!==o?.standingOnTeleporter)if(c)$e(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=lo(t,n,"JUMP");f.y=Wt,$e(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const a=i&&Qe(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&ui(i,s)!==void 0,d=t.actions.every(y=>e.currentActionPress(y)!=="released"),f=l&&!u&&c===null,h=r===null?vt({colourise:n,button:t}):r;if(h.visible=l,l&&(f!==o?.disabled&&ao(h,f,n),h.visible=!0,o?.pressed!==d&&yt(h,d),l!==o?.hasBag||c!==o?.carrying)){let y;c!==null?y=ei(c):l&&(y=p({textureId:"bag",y:-2})),$e(h,y)}return{output:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&Tt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?vt({colourise:n,button:t}):r,d=a||nt(l)>0;if(u.visible=d,d&&(o?.pressed!==c&&yt(u,c),a!==o?.hasHooter||l!==o?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):nt(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=_e(new b,l);h.y=Wt,h.filters=te,$e(u,f,h),ao(u,l===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const a=(i&&Qe(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||l!==o.pressed||n!==o.colourise||a!==o.hasBag))return"no-update";let u;if(r===null){u=vt({colourise:n,button:t});const d=lo(t,n,"C+J");d.y=Wt,$e(u,d)}else u=r;return a?(u.visible=!0,o?.pressed!==l&&yt(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:ue}},map({previousRendering:t}){if(t!==null)return"no-update";const e=Xe({label:"mapText",outline:!0});return An(e,"MAP"),{output:e,renderProps:ue}}};class Ie extends Kr{constructor(e){const n=fl[e.button.which];super(e,n)}}const hl=30,pl=15,ml=42,gl=36,bl=44,vl=20;class yl{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Ie({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new Ie({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new Ie({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new Ie({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new Ie({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new Ie({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new Ra({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of q(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=pl,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=hl,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of q(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-bl,this.#n.mainButtonNest.y=e.y-vl,this.#n.joystick.output.x=ml,this.#n.joystick.output.y=e.y-gl,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of q(this.#n.buttons))r.tick({...e,currentPlayable:Re(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}jo.frames.button.frame;const xl=250,wl=t=>t?48:24,Cl=t=>t?68:56,Sl=(t,e)=>t?e.x/2-24:80,Tl=t=>t?72:24,kl=t=>t?88:0,vo=112,Ge=t=>t==="heels"?1:-1;class Il{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Gt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[so],this.#t.fps.y=St.h,this.#o(),n&&(this.#n=new yl({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#a("head"),livesText:Xe({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.char.🛡️",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.char.⚡️",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#a("heels"),livesText:Xe({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.char.🛡️",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:Xe({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Gt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new ze({texture:ce().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:io,y:n?0:8});s.addChild(a);const l=Xe({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=St.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=te),{text:l,icon:a,container:s}}#a(e){const n=new ze(ce().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ge("head")*vo,this.#t.head.doughnuts.container.y=e.y-je.h-8,this.#t.heels.carrying.container.y=e.y-je.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ge("heels")*vo,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-St.w*2}#s(e,n){return e?n?ye:Je:n?no:We}#c(e){const{renderContext:{gameState:n}}=this,o=ft(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(ei(i)),a.filters=this.#s(!0,s),this.#t.heels.bag.icon.filters=this.#s(r,s)}#l(e){const{renderContext:{gameState:n}}=this,o=ft(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#s(r,s),this.#t.head.doughnuts.icon.filters=this.#s(i!==0,s),_e(this.#t.head.doughnuts.text,i)}#u(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ft(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=It(i),d=u>0||!o;a.visible=d,d&&(_e(s,u),a.y=n.y-kl(o)),c.x=a.x=(n.x>>1)+Ge(e)*Sl(o,n);const f=i===void 0?0:e==="head"?jr(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(_e(l,f),c.y=n.y-Tl(o))}#d(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#d(r,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?ye:Je:s.filters=a?no:We,s.x=(n.x>>1)+Ge(e)*Cl(o),s.y=n.y-je.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ft(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ge(e)*wl(o),a.y=n.y,_e(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Pn(n.color),{colourise:r,gameState:i}=this.renderContext;We.targetColor=o.hud.dimmed[r?"dimmed":"original"],Fn.targetColor=o.hud.dimmed[r?"basic":"original"],io.targetColor=o.hud.icons[r?"basic":"original"],Je.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?bt.colourised.head[this.#d(i,"head")?"active":"inactive"]:bt.original,this.#t.heels.livesText.filters=r?bt.colourised.heels[this.#d(i,"heels")?"active":"inactive"]:bt.original}#f=fs;#g(){if(hs(x.getState())){if(performance.now()>this.#f+xl){const e=Ve.shared.FPS;_e(this.#t.fps,Math.round(e)),so.targetColor=e>100?m.white:e>58?m.moss:e>55?m.pastelBlue:e>50?m.metallicBlue:e>40?m.pink:m.midRed,this.#f=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Gt)this.#p(n,e),this.#h(n,e),this.#u(n,e);this.#i(e),this.#l(e),this.#c(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const yo={movementType:"vel",vels:{gravity:B}},Ol=(t,e,n,o)=>{if(!we(t))return yo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=ps[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Le(s,e);return J("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-an*o,-l)}}}:yo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-an*o,-l)}}}},xo=O.h,wo=.001,Bl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=Un**2/(2*Ee);if(n==="up"){if(e<=o)return Math.max(wo,Math.sqrt(2*Ee*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(wo,Math.sqrt(2*Ee*r))}else return Un}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Ee*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Ee*Math.max(e,0))):-.036},_l=({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}})=>{const r=t*xo,i=e*xo,s=Bl({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},Co={movementType:"vel",vels:{movingFloor:B}},Pl=(t,e,n,o)=>{if(N(t)&&t.state.teleporting!==null)return Co;const{state:{standingOnItemId:r}}=t,i=Le(r,e);if(i===null||!J("conveyor")(i))return Co;const{config:{direction:s}}=i,l=J("heels")(t)&&t.state.action==="moving"&&Sn(t.state.facing)===ms(s)?de.heels:gs;return{movementType:"vel",vels:{movingFloor:z(sn[s],l)}}};function*Fl(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Al=O.w*.8,Dl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Ce(c);if(r.currentActionPress("fire")==="tap"&&a&&nt(s)>0){const d={type:"firedDoughnut",...Wo,config:ue,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(l,z(u,Al),t.type==="headOverHeels"?{z:O.h}:B),vels:{fired:z(u,de.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};Dt({room:e,item:d}),i.doughnuts=se(i.doughnuts,-1),r.actionsHandled.add("fire")}},fi=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Ml=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),wt=O.w*3,zl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-wt&&n.x<o.x+wt&&n.y>o.y-wt&&n.y<o.y+wt},So=(t,e,n,o,r)=>{if(r&&t.state.activated)return Y;const i=Mn(t.state.position,e);return i===void 0?Y:zl(t,i)?fi:Ml},Ll=(t,e,n,o)=>t.state.activated?Y:at(t.state.stoodOnBy,e).some(N)?fi:Y,Rl=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return So(t,e,n,o,!0);case"while-player-near":return So(t,e,n,o,!1);case"on-stand":return Ll(t,e);case"off":case"on":return Y;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}};function*El(t,e,n,o){Te(t)&&(yield Ol(t,e,n,o),yield Pl(t,e),yield*Fl(t,e)),N(t)&&(yield li(t,e,n,o),t.id===n.currentCharacterName&&(yield nl(t,e,n,o),yield ai(t,e,n),bs(t)&&ul(t,e,n,o),vs(t)&&Dl(t,e,n))),ys(t)&&(yield _l(t)),xs(t)&&(yield Rl(t,e,n,o),yield Ya(t,e,n,o))}const Ul=(t,e,n,o)=>{if(!Te(t)||t.state.standingOnItemId===null)return;const r=Le(t.state.standingOnItemId,e);N(t)&&r.type==="pickup"&&oi({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||N(t)&&r.state.disappear==="onTouchByPlayer")&&ur({touchedItem:r,gameState:n,room:e})},$l=(t,e,n,o)=>{if(N(t)&&t.state.standingOnItemId!==null){const s=Le(t.state.standingOnItemId,e);(Yo(s)||s.type==="spikes")&&ni({room:e,movingItem:t})}const r=[...El(t,e,n,o)];Ul(t,e,n);let i=ci(t,r);(Te(t)||J("lift")(t)||J("firedDoughnut")(t))&&(i=U(i,...oe(q(t.state.vels)).map(s=>z(s,o)))),kn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:o,onTouch:zn})},Nl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=se(e.state.head.lives,-1),e.state.heels.lives=se(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,se(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=nt(e.state.head.lives)>0,i=nt(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,me(t,e);const u=$n(e)[c],d=De({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Nn(u)};return}if(t.entryState.headOverHeels!==void 0){me(t,e);const c=De({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=$n(e);if(me(t,c),me(t,u),xn(c,u)){const d=rr({head:c,heels:u});me(t,d,"heels");const f=De({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Nn(d)};return}else{const d=De({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},De=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=Cs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??ue});for(const i of e)Dt({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Ys(r,t);return r},me=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Gl=(t,e)=>{const n=ir(t,sr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];me(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=rr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});me(t,a);const l=De({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Dt({room:o,item:e});return}else{const s=De({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Hl=(t,e)=>{e.type==="headOverHeels"?Nl(t,e):Gl(t,e),Re(t)===void 0&&x.dispatch(ws({offerReincarnation:!0}))},Vl=t=>{for(const e of fe(t.items))for(const n of at(e.state.stoodOnBy,t)){if(!t.items[n.id]){Gn(n,t);continue}if(!Dn(n,e)){Gn(n,t);const o=ti(n,nr(t.items));o!==void 0&&er({above:n,below:o})}}},Xl=2*Zs,jl=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Xl,positionDelta:n})},ql=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Ko(o.state.position,r),z:0};if(!Se(s,B))for(const a of at(o.state.stoodOnBy,e))jl(a,e,s)}},Wl=(t,e)=>{for(const n of fe(t.items))!Te(n)||t.roomTime===n.state.actedOnAt.roomTime||Ss(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Ts(n.state.position),e.add(n))},Jl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Yl=t=>{for(const e of fe(t.items)){const n=e.state.position;e.state.position=ks(n)}},Zl=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},Ql=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Re(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=ir(t,sr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Kl=(t,e)=>{const n=be(t);if(n===void 0)return ar;Ql(t,n,e);const o=Object.fromEntries(Is(n.items).map(([s,a])=>[s,a.state.position]));for(const s of q(n.items))Jl(s,n)&&(or({room:n,item:s}),N(s)&&Hl(t,s));const r=Object.values(n.items).sort(Zl);for(const s of r){const a=Re(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{$l(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item ${s.id}: ${l}`)}}Vl(n),Yl(n);const i=new Set(oe(q(n.items)).filter(s=>o[s.id]===void 0||!Se(s.state.position,o[s.id])));return ql(i,n,o),Wl(n,i),i},To=(t,e)=>{const n=S(t),o=S(U(t,{x:e.x,z:e.z})),r=S(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Jt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,ec=(t,e,n,o)=>{const r=To(t,e),i=To(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Jt(s,a,l,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,g=i.bottomCentre.y-i.bottomCentre.x/2,y=Jt(d,f,h,g),T=r.topLeft.y+r.topLeft.x/2,F=r.bottomCentre.y+r.bottomCentre.x/2,A=i.topLeft.y+i.topLeft.x/2,D=i.bottomCentre.y+i.bottomCentre.x/2,H=Jt(T,F,A,D);return u&&y&&H},tc=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!ec(n,o,r,i))return 0;for(const s of Os){const a=t.state.position[s],l=a+o[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return ko(e)-ko(t)},ko=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ot extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const nc=t=>{const e=oc(t);let n=e.length,o=n;const r=new Array(n),i={},s=rc(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new Ot([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(g){throw g instanceof Ot?g.hasClosedCycle?g:new Ot([l,...g.cyclicDependency],g.cyclicDependency.includes(l)):g}}while(c);u.delete(l)}r[--n]=l}};function oc(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function rc(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Io=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ct=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},ic=(t,e=new Set(q(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Ct(n,r,s);for(const r of e)if(r.renders)for(const i of q(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=tc(r,i);if(Io(o,r,i),s===0){Ct(n,r.id,i.id),Ct(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;Io(n,a,l),Ct(n,l,a)}return n},hi=(t,e,n=3)=>{try{return{order:nc(t),impossible:!1}}catch(o){if(o instanceof Ot){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:hi(t,e,n-1).order,impossible:!0}}else throw o}};class sc extends Kr{}const Oo=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Bo=(t,e)=>{const n=new W;return Oo(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Oo(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},ac={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class lc{constructor(e){this.renderContext=e;const{item:n}=e,o=ac[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),J("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new W().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new W().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new W({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Bo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Bo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new wa({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class cc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const uc=(t,e)=>{const n=e.getLocalBounds(),o=Bn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new ze({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},_o=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof ze?r:uc(t,r)};class dc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=x.getState();n||(this.#e.filters=new va({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,a=_o(r,i,s);o.shadowMask.relativeTo==="top"&&(a.y-=o.aabb.z),s&&(a.y-=((s.z??1)-1)*O.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),a=o.state.position.z+o.aabb.z,l=fe(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:a}},aabb:{...o.aabb,z:Bs}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":xn(c,d)?f?"update":"create":"noShadow"});for(const d of Zn(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=_o(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of Zn(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...it(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Pt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const fc=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,hc=(t,e,n)=>{const r=ce().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ce().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},He=t=>L(({renderContext:{item:e}})=>_s(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),L=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:ue}:"no-update";function*pc({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Mt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...kt(a,{y:-12*n})});l.filters=pn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...kt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...kt(a,{y:-l*O.h})})}}yield*s(k({...ae,[r]:1})),yield*s(ae),e||(yield p({pivot:{x:16,y:O.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...k({...ae,[r]:1})}))}const pi=(t,e)=>{const n=Mt(t),o=st(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):ae},mc=L(({renderContext:{item:t,room:e}})=>tt(pc(t,e),new b({filters:ie(e),...pi(t.config.direction,t.aabb)}))),gc=L(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Mt(t),a=i.rooms[n];return p({textureId:hc(r,s,e),filter:ie(a),...pi(t,o)})}),Yt={animationId:"bubbles.cold"},Me=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},mi=Symbol(),gi=Symbol(),bc=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[mi]=t,n[gi]=e,n},vc=`#version 300 es

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
`;class Po extends Z{constructor(e){const n=G.from({vertex:lt,fragment:vc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const yc=({name:t,action:e,facingXy8:n,teleportingPhase:o,paused:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:r};if(o==="out")return{animationId:`${t}.fadeOut`,paused:r};if(o==="in")return{animationId:`${t}.fadeOut`,paused:r};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:r};if(e==="falling"){const s=`${t}.falling.${n}`;if(As(s))return{textureId:s}}const i=`${t}.idle.${n}`;return Ds(i)?{animationId:i,paused:r}:{textureId:`${t}.walking.${n}.2`}},gn=Symbol(),bn=Symbol(),xc=(t,e)=>{t[gn].removeChildren(),t[gn].addChild(p(yc(e)))},Zt=(t,e,n)=>{const o=new b,r=new b;o[gn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new he({pastelBlue:m.pink}):ye,flipX:t==="heels"});return o[bn]=i,o},Fo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Fs>t,wc=t=>{if(!Ye(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Hn<Hn*.15},Ao=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Do=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?ye:t.filters},Cc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Ao(r,new ve({outlineColor:Ae[t],upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Do(r,ve);const s=o?.flashing??!1;n&&!s?Ao(r,new Po(Ae[t])):!n&&s&&Do(r,Po)},Sc=(t,e,n)=>{e&&!n?t.addChild(t[bn]):!e&&n&&t.removeChild(t[bn])},Qt=(t,e,n,o,r,i)=>{n&&xc(e,{name:t,...o,paused:r}),Cc(t,o,i,e),Sc(e,o.shining,i?.shining??!1)},Kt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:a,teleporting:l}}=e,c=yn(a)??"towards",u=e.type==="headOverHeels"?Fo(e.state.head,"headOverHeels","headOverHeels"):Fo(e.state,e.type,n.currentCharacterName),d=wc(e),f=Xr(e),h=rt(a),g=l?.phase??null,y={action:s,facingXy8:c,teleportingPhase:g,flashing:d,highlighted:u,shining:f},T=t===void 0||t.action!==s||t.facingXy8!==c||t.teleportingPhase!==g;let F;if(i==="headOverHeels"){F=r??bc({top:Zt("head",!0,o),bottom:Zt("heels",!0,o)});const A=F;Qt("head",A[mi],T,y,o,t),Qt("heels",A[gi],T,y,o,t)}else F=r??Zt(i,!1,o),Qt(i,F,T,y,o,t);return s==="moving"&&r instanceof et&&(r.animationSpeed=h*Ps),{output:F,renderProps:y}},Tc=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...k({x:-e.x,y:-e.y})}),r=tt(oe(Pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...k(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=tt(oe(Pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...k(kt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...k({...l,z:0}),times:{[st(Ke(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},kc=t=>[...oe(q(t.items)).filter(e=>e.type==="wall").filter(e=>Ke(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],Ic=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Oc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new W().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(k),!0).fill(0),Bc=L(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Lt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,g=new b({label:`floor(${t.id})`});if(d!=="none"){const A=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,D=new b;for(let M=-1;M<=r+2;M++)for(let V=M%2-1;V<=i+2;V+=2)D.addChild(Ms({x:M+(s.right?-.5:0),y:V+(s.towards?-.5:0)},p({textureId:A})));D.addChild(Tc(h,{x:n,y:o}));const H=new W().poly([ae,k({x:c,y:0}),k({x:c,y:u}),k({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});D.addChild(H),D.filters=ie(t),D.mask=H,g.addChild(D)}const y=kc(h),T=new W().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);g.addChild(T);const F=Ic(y);if(F!==void 0){const A=Oc({extraWallRanges:F,blockXMin:n,blockYMin:o});g.addChild(A)}return g.mask=T,g.y=-e.aabb.z,g.cacheAsTexture(!0),g}),_c=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=k({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return oe(Pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...k(f),times:a.type==="wall"?a.config.times:{[st(Ke(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...k(U(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...k(U(f,{x:-.5}))}))}),i},Pc=L(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Lt(e.roomJson),l=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new W({label:"overDrawToHideFallenItems"}).poly([k({x:l,y:0}),k({x:0,y:0}),k({x:0,y:c}),{...k({x:0,y:c}),y:999},{...k({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=_c({blockXMin:n,blockYMin:o},e.roomJson);f.filters=pn(e,"towards",t),h.filters=pn(e,"right",t),u.addChild(f),u.addChild(h);const g=new W({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(g),u.mask=g,u.cacheAsTexture(!0),u}),Fc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Ac=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,a=s?Oa:i?void 0:Fc.includes(t.which)?Jr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const l=Sn(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||l!==r.facingXy4))return"no-update";const u={facingXy4:l,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${l}`,filter:a}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${l}`,filter:a}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${l}`,filter:a}:{textureId:`${t.which}.${l}.1`,filter:a}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Me({top:{textureId:`${t.which}.${l}`,filter:a||ie(n)},bottom:{...Yt,paused:o}}):p({textureId:`${t.which}.${l}`,filter:a}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Me({top:`${t.which}.${l}`,filter:a}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:a}:{textureId:`${t.which}.1`,filter:a}),renderProps:c};case"homingBot":return{filter:a,output:p({textureId:t.which,filter:a}),renderProps:c};case"bubbleRobot":return{output:Me({top:{...Yt,paused:o},filter:a}),renderProps:c};case"emperorsGuardian":return{output:Me({top:"ball",bottom:{...Yt,paused:o},filter:a}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:a,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},ot=t=>{for(const e in t)return!0;return!1},Dc=de.floatingText,Mc=12,Mo=O.h*3,zc=[m.white,m.pastelBlue,m.metallicBlue,re(m.pastelBlue),re(m.metallicBlue)],Lc=[P.zxWhite,P.zxYellow,P.zxCyan,P.zxGreen,P.zxRed,P.zxMagenta,P.zxBlue],Rc=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n}},previousRendering:o})=>{let r;const s=(n-e)*Dc;if(o===null){r=new b({filters:new ve({outlineColor:m.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=An(new b({label:u,y:c*Mc,filters:new $(m.pink)}),u.toUpperCase());r.addChild(d)}}else r=o;const l=lr(x.getState())?zc:Lc;for(let c=0;c<t.length;c++){const u=r.children[c],[d]=u.filters,f=s+c*-12,h=f>0&&f<Mo;if(u.visible=h,h){const g=Math.floor(f/Mo*l.length);d.targetColor=l[g]}}return r.y=-s,{output:r,renderProps:ue}},Ec=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,en=m.moss,zo=()=>L(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Uc={head:Kt,heels:Kt,headOverHeels:Kt,doorFrame:gc,doorLegs:mc,monster:Ac,floatingText:Rc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:L(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=st(Ke(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:fc(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:qe.w,y:qe.h+1}:{x:0,y:qe.h+1},filter:ie(o)}),l=k({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:L(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:L(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ie(n):void 0,times:e})),spikes:He("spikes"),slidingDeadly:zo(),slidingBlock:zo(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:Ec(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ie(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?Cn(x.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=ot(n);if(!(r===void 0||r.moving!==i))return"no-update";const a=new b,l=Ke(t);return a.addChild(p(i?{animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${l}.6`,times:e})),{output:a,renderProps:{moving:i}}},lift:L(({renderContext:{paused:t}})=>{const e=new b,n={x:je.w/2,y:je.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=ct(t),a=s&&at(r,e).find(N)!==void 0;return o===void 0||s!==o.activated||a!==o.flashing?{output:a?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:a,activated:s}}:"no-update"},pickup:L(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ie(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:L(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=Sn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Me({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:He("joystick"),movingPlatform:L(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:L(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new ve({outlineColor:en,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=ot(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const a=o?.compressed??!1,l=e?new ve({outlineColor:en,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===a&&e!==o?.highlighted;let u;return c?(r.filters=l??Vo,u=r):u=p(!i&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:l}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new ve({outlineColor:en,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Me({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:He("hushPuppy"),bubbles:L(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:He({animationId:"bubbles.doughnut"}),ball:He("ball"),floor:Bc,floorEdge:Pc};class $c{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const E=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=w.createBufferSource(),c=ln()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Oe=(t,e,n)=>{const o=w.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},R=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=E({...t}),Oe(l,t.gain,s),n!==void 0&&(r?(l=E({...n,loop:!0}),Oe(l,n.gain,s)):l.onended=()=>{c&&(l=E({...n,loop:!0}),Oe(l,n.gain,s))})):n!==void 0&&(l=E({...n,loop:!0}),Oe(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),o!==void 0&&(l=E({...o}),Oe(l,o.gain,s)));else if(c!==u&&e!==void 0){const f=E({...e});Oe(f,e.gain,s)}a=!1,c=u}};class Nc{constructor(e){this.renderContext=e,this.output.gain.value=4}output=w.createGain();#e=R({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Gc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&E({soundId:"bonus",connectTo:this.output});break}case"disappearing":{E({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,E({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=w.createGain();tick(){}destroy(){}}class Hc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n.connect(this.output),this.#n.gain.value=.3}output=w.createGain();#e=w.createGain();#n=w.createGain();#t=R({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o=R({start:{soundId:"metalHit"}},this.#n);tick(){const{renderContext:{item:e,room:{roomTime:n,items:o}}}=this,{state:{actedOnAt:{roomTime:r,by:i},collidedWith:{roomTime:s,by:a}}}=e,l=n===r&&oe(cn(i)).some(u=>zs(o[u]));this.#t(l);const c=n===s&&!fr(cn(a));this.#o(c)}destroy(){}}const tn=2;class Vc{constructor(e){this.renderContext=e}output=w.createGain();#e=R({start:{soundId:"conveyorStart",playbackRate:tn},loop:{soundId:"conveyorLoop",playbackRate:tn},stop:{soundId:"conveyorEnd",playbackRate:tn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=ot(e);this.#e(n)}destroy(){this.#e(!1)}}const Xc=3;class jc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=w.createGain();#e=E({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Xc*e)}destroy(){}}const Lo={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Ro={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Eo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Uo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class qc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Lo[n]!==void 0&&(this.#r=R({start:Lo[n]},this.#e)),Ro[n]!==void 0&&(this.#t=R({change:Ro[n]},this.#e)),Uo[n]!==void 0&&(this.#a=R(Uo[n],this.#e)),Eo[n]!==void 0&&(this.#o=R({loop:Eo[n]},this.#n))}output=w.createGain();#e=w.createGain();#n=w.createGain();#t;#o;#r;#a;tick(){const{renderContext:{item:e,room:{roomTime:n}}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,collidedWith:{roomTime:s,by:a},vels:{walking:l}}}=e;if(this.#t){const c=yn(o);this.#t(c)}if(this.#r){const c=n===s&&!fr(cn(a));this.#r(c)}if(this.#o){const c=r&&!i;this.#o(c)}if(this.#a){const c=!Se(l,B);this.#a(c)}}destroy(){}}class nn{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#a.connect(this.output);const n=e.item.type;this.#n=R({loop:{soundId:`${n==="headOverHeels"?"heels":e.item.type}Walk`}},this.#e),this.#o=R({start:{soundId:`${n==="headOverHeels"?"head":e.item.type}Jump`}},this.#t),this.#r=R({loop:{soundId:`${n==="headOverHeels"?"head":e.item.type}Fall`}},this.#t)}output=w.createGain();#e=w.createGain();#n;#t=w.createGain();#o;#r;#a=w.createGain();#i=R({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#a);#s=w.createGain();#c=R({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#l={teleportingPhase:null,positionZ:0};tick(){const{renderContext:{item:e}}=this,{state:{action:n,teleporting:o,jumpStartZ:r,jumped:i,standingOnItemId:s,position:{z:a},vels:{gravity:{z:l}}}}=e,c=Qe(e),{teleportingPhase:u,positionZ:d}=this.#l,f=o?o.phase:null,h=i&&a>r&&a>d&&l>0,g=a<d&&l<0&&s===null;if(this.#r(g),this.#o(h),this.#n(!h&&!g&&n==="moving"),c!==void 0&&this.#c(c.carrying!==null),this.#i(s!==null),f!==null&&f!==u)if(f==="in"){const y=ln().teleportIn,T=w.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}else{const y=ln().teleportOut,T=w.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}this.#l={teleportingPhase:f,positionZ:a}}destroy(){}}class Wc{constructor(e){this.renderContext=e}output=w.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=ot(e);!o&&r&&E({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Jc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=R({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=w.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Yc{constructor(e){this.renderContext=e}output=w.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=ot(e);n&&!o&&E({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Zc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=w.createGain();#e=w.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?Cn(x.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&E({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Qc{constructor(e){this.renderContext=e}output=w.createGain();#e=R({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(ct(e)&&at(e.state.stoodOnBy,n).some(N))}destroy(){}}class Kc{constructor(e){this.renderContext=e,E({soundId:"hooter",connectTo:this.output})}output=w.createGain();tick(){}destroy(){}}const eu={lift:jc,switch:Zc,bubbles:Gc,head:nn,heels:nn,headOverHeels:nn,teleporter:Qc,monster:qc,conveyor:Vc,spring:Yc,portableBlock:Wc,charles:Hc,ball:Nc,pushableBlock:Jc,firedDoughnut:Kc},tu=t=>{const e=eu[t.item.type];if(e)return new e(t)},nu=O.h*Ls,ou=O.h*-1,ru=O.w*16,iu=0,on=(t,e,n)=>(t-e)/(n-e)*2-1;class su{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Ht(Vn({x:0,y:o})),this.positionMaxX=Ht(Vn({x:r,y:0}))}output=w.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=U(o.position,z(n.aabb,.5)),i=on(Ht(r),this.positionMaxX,this.positionMinX),s=on(r.z,ou,nu),a=on(r.x+r.y,iu,ru);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const au=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},lu=t=>t.item.shadowMask!==void 0,cu=t=>{const e=x.getState(),n=Rs(e),o=lr(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const d=Uc[r.type],f=new sc(t,d);a.push(f),s&&(f.output.alpha=.66),o&&lu(t)&&a.push(new dc(t))}s&&a.push(new lc(t));let l;if(a.length===0)l=void 0;else{const d=a.length===1?a[0]:new uu(a,t);au(r,d.output,i),l=new cc(t,d)}const c=t.paused?void 0:tu(t),u=c===void 0?void 0:new su(t,c);return new $c(t,{graphics:l,sound:u})};class uu{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Be=.33,du=Es()==="mobile"?-4:16,vn=qe.h-qe.w/2,fu=de.heels,hu=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Lt(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-du-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-vn<0;return(g,y,T)=>{if(g===void 0)return;const F=S(g.state.position),A=U(F,u),D={x:d&&A.x<n.x*Be?Math.min(-a,n.x*Be-F.x):f&&A.x>n.x*(1-Be)?Math.max(n.x-l,n.x*(1-Be)-F.x):u.x,y:h&&A.y<n.y*Be?n.y*Be-F.y:u.y};if(T)e.x=D.x,e.y=D.y;else{const H=fu*y,M=it(e,D),V=Qo(M);if(V>H){const Nt={x:M.x/V,y:M.y/V};e.x-=Nt.x*H,e.y-=Nt.y*H}else e.x=D.x,e.y=D.y}}},pu=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Lt(t);return new W().rect(e+o.x,r-vn,n-e,o.y-r+vn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class mu{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=x.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??cr.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(pu(e.room.roomJson)),this.#s=hu(e.room,this.#t,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=w.createGain();output={sound:this.#o,graphics:this.#t};#r=!1;#a=new Map;#i=new Map;#s;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?_a:ye:new $(Pn(n).main.original)}#c(e){const{room:n}=this.renderContext;for(const o of fe(n.items)){let r=this.#i.get(o.id);if(r===void 0){r=cu({...this.renderContext,item:o}),this.#i.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:a}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),a&&a.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#i.entries())n.items[o]===void 0&&(r.destroy(),this.#i.delete(o))}#l(e){const{order:n}=hi(ic(this.renderContext.room.items,e.movedItems,this.#a),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#i.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(fe(this.renderContext.room.items))};this.#s(Re(this.renderContext.gameState),n.deltaMS,!this.#r),this.#c(n),(!this.#r||n.movedItems.size>0)&&this.#l(n),this.#r=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#i.forEach(e=>{e.destroy()})}}var Ut=`in vec2 aPosition;
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
`,$t=`struct GlobalFilterUniforms {
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
}`,gu=`precision highp float;
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
`,bu=`struct CRTUniforms {
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
}`,vu=Object.defineProperty,yu=(t,e,n)=>e in t?vu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Bt=(t,e,n)=>(yu(t,typeof e!="symbol"?e+"":e,n),n);const bi=class vi extends Z{constructor(e){e={...vi.DEFAULT_OPTIONS,...e};const n=xe.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:bu,entryPoint:"mainFragment"}}),o=G.from({vertex:Ut,fragment:gu,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Bt(this,"uniforms"),Bt(this,"seed"),Bt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Bt(bi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let xu=bi;var wu=`
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
}`,Cu=`struct KawaseBlurUniforms {
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
}`,Su=`
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
`,Tu=`struct KawaseBlurUniforms {
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
}`,ku=Object.defineProperty,Iu=(t,e,n)=>e in t?ku(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,pe=(t,e,n)=>(Iu(t,typeof e!="symbol"?e+"":e,n),n);const yi=class xi extends Z{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ze("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...xi.DEFAULT_OPTIONS,...n};const o=xe.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Tu:Cu,entryPoint:"mainFragment"}}),r=G.from({vertex:Ut,fragment:n?.clamp?Su:wu,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),pe(this,"uniforms"),pe(this,"_pixelSize",{x:0,y:0}),pe(this,"_clamp"),pe(this,"_kernels",[]),pe(this,"_blur"),pe(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=Fe.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),Fe.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};pe(yi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Ou=yi;var Bu=`in vec2 vTextureCoord;
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
`,_u=`struct AdvancedBloomUniforms {
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
`,Pu=`
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
`,Fu=`struct ExtractBrightnessUniforms {
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
`,Au=Object.defineProperty,Du=(t,e,n)=>e in t?Au(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,wi=(t,e,n)=>(Du(t,typeof e!="symbol"?e+"":e,n),n);const Ci=class Si extends Z{constructor(e){e={...Si.DEFAULT_OPTIONS,...e};const n=xe.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:Fu,entryPoint:"mainFragment"}}),o=G.from({vertex:Ut,fragment:Pu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),wi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};wi(Ci,"DEFAULT_OPTIONS",{threshold:.5});let Mu=Ci;var zu=Object.defineProperty,Lu=(t,e,n)=>e in t?zu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Pe=(t,e,n)=>(Lu(t,typeof e!="symbol"?e+"":e,n),n);const Ti=class ki extends Z{constructor(e){e={...ki.DEFAULT_OPTIONS,...e};const n=xe.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:_u,entryPoint:"mainFragment"}}),o=G.from({vertex:Ut,fragment:Bu,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:ge.WHITE}}),Pe(this,"uniforms"),Pe(this,"bloomScale",1),Pe(this,"brightness",1),Pe(this,"_extractFilter"),Pe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Mu({threshold:e.threshold}),this._blurFilter=new Ou({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Fe.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Fe.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Fe.returnTexture(s),Fe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Pe(Ti,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ru=Ti;const Eu=ue,Uu=(t,e)=>(n,o)=>{const r=new Set;if(Us(n)){const u=be(n)?.items;if(u!==void 0){const d=oe(q(wn(u))).filter(f=>f!==void 0);for(const f of d)r.add(f)}}const s=o*n.gameSpeed,a=Math.ceil(s/e),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const f of d)r.add(f)}const c=be(n)?.items??Eu;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},$o=({crtFilter:t},e)=>[t?new xu({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Ru({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class $u{constructor(e,n){this.app=e,this.#i=e,this.#s=n;try{const o=x.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#a.connect(w.destination),e.stage.addChild(this.#r),e.stage.scale=r,be(n)===void 0)throw new Error("main loop with no starting room");this.#u()}catch(o){this.#l(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#a=w.createGain();#i;#s;#c=Uu(Kl,Xs);#l(e){console.error(e),x.dispatch($s(Ns(e,"message","stack")))}#u(){const{gameMenus:{userSettings:{displaySettings:e}}}=x.getState();this.#e=$o(e,!0),this.#n=$o(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#l(n)}};tick=({deltaMS:e})=>{const n=x.getState(),o=Gs(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=x.getState(),s=!o&&!(r?.uncolourised??cr.displaySettings.uncolourised),a=Hs(n),l=Vs(n);(this.#t?.renderContext.colourise!==s||this.#t?.renderContext.onScreenControls!==a||this.#t?.renderContext.inputDirectionMode!==l)&&(this.#t?.destroy(),this.#t=new Il({colourise:s,gameState:this.#s,inputDirectionMode:l,onScreenControls:a}),this.#i.stage.addChild(this.#t.output));const c=be(this.#s);this.#t.tick({screenSize:i.gameEngineScreenSize,room:c});const u=o?ar:this.#c(this.#s,e),d=be(this.#s);(this.#o?.renderContext.room!==d||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),d?(this.#o=new mu({gameState:this.#s,room:d,paused:o,pixiRenderer:this.#i.renderer,displaySettings:r,colourised:s,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#a),this.#s.events.emit("roomChange",d.id)):this.#o=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#u()),this.#o?.tick({progression:this.#s.progression,movedItems:u,deltaMS:e}),o?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#n};start(){return this.#i.ticker.add(this.tickAndCatch),this}stop(){this.#i.stage.removeChild(this.#r),this.#a.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#i.ticker.remove(this.tickAndCatch)}}At.add(pr,mr,gr,br,vr,yr,xr,wr,Cr,Sr,Tr,Ir,kr,Or,Br,_r,Pr,Fr,Ar,Dr,Mr);Ws.defaultOptions.scaleMode="nearest";const No=async(t,e)=>{const n=new Gr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=js;const o=x.getState().gameMenus.currentGame,r=Xn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?x.dispatch(qs(o.store.gameMenus)):(x.dispatch(jn(r.characterRooms.head.id)),x.dispatch(jn(r.characterRooms.heels.id)));const i=new $u(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Re(r);a!==void 0&&Tn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return be(r)},get gameState(){return r},reincarnateFrom(s){Xn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},ju=Object.freeze(Object.defineProperty({__proto__:null,default:No,gameMain:No},Symbol.toStringTag,{value:"Module"}));export{Er as A,zr as C,Z as F,Bn as R,ua as S,Ur as V,ma as a,ju as g,ca as u};
