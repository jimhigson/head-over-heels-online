const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BDjOSoCP.js","assets/App-Da39NGAd.js","assets/index-CpYkwXLU.js","assets/index-l-KgxL7v.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-DOpDmUaW.js","assets/Graphics-4nCi64_m.js","assets/changeCharacterRoom-BPvQcTid.js","assets/WebGLRenderer-B7WOrHMQ.js"])))=>i.map(i=>d[i]);
import{b0 as ki,b1 as $o,b2 as Ii,aj as Oi,an as ve,ao as N,ab as No,ak as he,W as C,$ as At,Z as Bi,a0 as b,d as Ze,v as _t,aD as v,a3 as on,av as Me,X as Xe,Y as _i,V as Pi,b3 as Fi,b4 as Ai,b5 as Di,aa as Mi,b6 as j,b7 as zn,H as B,b8 as Go,b9 as le,ba as k,bb as Vo,s as Xo,J as w,o as te,c as _,bc as zi,bd as Li,be as Ri,f as A,bf as ze,bg as Ei,bh as yn,bi as Ho,bj as Ui,bk as St,q as ye,n as xn,e as E,bl as $i,i as oe,bm as Ni,bn as Gi,bo as Vi,bp as Xi,bq as Hi,E as Ke,br as Tt,k as jo,bs as Dt,bt as U,j as W,bu as qo,bv as Wo,bw as Ln,bx as Jo,by as ji,bz as it,bA as Yo,bB as xe,bC as Mt,O as st,D as pe,bD as me,x as we,bE as rn,bF as se,bG as qi,bH as Wi,bI as Ji,bJ as Yi,bK as wn,w as Le,bL as Zi,bM as Ki,bN as Qi,bO as sn,bP as es,bQ as dt,g as Zo,bR as ts,bS as ns,bT as os,l as Ce,z as Ko,bU as Rn,h as ce,bV as Qo,r as er,b as rs,a as tr,m as is,aY as Re,bW as Nt,bX as je,bY as ft,bZ as ss,b_ as as,b$ as ls,c0 as Ee,c1 as En,c2 as Cn,c3 as cs,c4 as us,c5 as Sn,c6 as ds,c7 as at,c8 as fs,c9 as hs,ca as ps,cb as ms,cc as gs,cd as Un,I as $n,ce as nr,a$ as or,B as rr,C as bs,y as Nn,aX as Qe,cf as ir,cg as vs,ch as ys,ci as xs,cj as ws,ck as Cs,cl as Ss,cm as S,cn as Ts,co as Pt,cp as ks,cq as kt,cr as Is,cs as Os,ct as Gn,cu as Bs,cv as _s,P as et,cw as zt,cx as Ps,cy as qe,cz as x,cA as an,cB as ln,p as Fs,cC as Gt,F as Vn,cD as As,cE as Ds,cF as Ms,cG as zs,cH as sr,at as _e,cI as Ls,cJ as Rs,cK as Es,cL as Us,cM as $s,cN as Xn,cO as Ns,K as Hn,cP as Gs}from"./App-Da39NGAd.js";import{a as Vs,f as cn,c as Tn,m as Lt,b as kn,d as ar,r as Xs,o as Hs}from"./changeCharacterRoom-BPvQcTid.js";import{S as js,G as q}from"./Graphics-4nCi64_m.js";import{g as lr,_ as jn}from"./index-CpYkwXLU.js";var ht={},qn;function qs(){if(qn)return ht;qn=1;var t=ki(),e=t.mark(i),n=$o(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var l,a,c,u,d,f,h=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(l=h.length,a=new Array(l),c=0;c<l;c++)a[c]=h[c];u=0,d=a;case 2:if(!(u<d.length)){y.next=8;break}return f=d[u],y.delegateYield(r(f),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}ht.__concat=i;var s=o(i);return ht.concat=s,ht}var pt={},Wn;function Ws(){if(Wn)return pt;Wn=1;var t=$o(),e=t.iterableCurry,n=Ii(),o=n.__firstOr,r=Symbol("none");function i(l){return o(l,r)===r}pt.__isEmpty=i;var s=e(i,{reduces:!0});return pt.isEmpty=s,pt}var Vt,Jn;function Js(){return Jn||(Jn=1,Vt=qs().concat),Vt}var Ys=Js();const un=lr(Ys);var Xt,Yn;function Zs(){return Yn||(Yn=1,Xt=Ws().isEmpty),Xt}var Ks=Zs();const cr=lr(Ks),ur=class dn extends Oi{constructor(e){e={...dn.defaultOptions,...e},super(e),this.enabled=!0,this._state=js.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=ve.from(n)),o&&(s=N.from(o)),new dn({gpuProgram:i,glProgram:s,...r})}};ur.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=ur;var Qs=`
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
`,ea=`in vec2 aPosition;
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
`,ta=`
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
}`;class I extends Y{constructor(e){const n=e.gpu,o=Zn({source:ta,...n}),r=ve.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Zn({source:Qs,...i}),l=N.from({vertex:ea,fragment:s}),a=new No({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:l,blendRequired:!0,resources:{blendUniforms:a,uBackTexture:he.EMPTY}})}}function Zn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const In=`
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
	`;class dr extends I{constructor(){super({gl:{functions:`
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
                `}})}}dr.extension={name:"color",type:C.BlendMode};class fr extends I{constructor(){super({gl:{functions:`
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
            `}})}}fr.extension={name:"color-burn",type:C.BlendMode};class hr extends I{constructor(){super({gl:{functions:`
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
                `}})}}hr.extension={name:"color-dodge",type:C.BlendMode};class pr extends I{constructor(){super({gl:{functions:`
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
                `}})}}pr.extension={name:"darken",type:C.BlendMode};class mr extends I{constructor(){super({gl:{functions:`
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
            `}})}}mr.extension={name:"difference",type:C.BlendMode};class gr extends I{constructor(){super({gl:{functions:`
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
            `}})}}gr.extension={name:"divide",type:C.BlendMode};class br extends I{constructor(){super({gl:{functions:`
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
            `}})}}br.extension={name:"exclusion",type:C.BlendMode};class vr extends I{constructor(){super({gl:{functions:`
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
                `}})}}vr.extension={name:"hard-light",type:C.BlendMode};class yr extends I{constructor(){super({gl:{functions:`
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
            `}})}}yr.extension={name:"hard-mix",type:C.BlendMode};class xr extends I{constructor(){super({gl:{functions:`
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
            `}})}}xr.extension={name:"lighten",type:C.BlendMode};class wr extends I{constructor(){super({gl:{functions:`
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
                `}})}}wr.extension={name:"linear-burn",type:C.BlendMode};class Cr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"linear-dodge",type:C.BlendMode};class Sr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Sr.extension={name:"linear-light",type:C.BlendMode};class Tr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Tr.extension={name:"luminosity",type:C.BlendMode};class kr extends I{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"negation",type:C.BlendMode};class Ir extends I{constructor(){super({gl:{functions:`
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
                `}})}}Ir.extension={name:"overlay",type:C.BlendMode};class Or extends I{constructor(){super({gl:{functions:`
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
                `}})}}Or.extension={name:"pin-light",type:C.BlendMode};class Br extends I{constructor(){super({gl:{functions:`
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
            `}})}}Br.extension={name:"saturation",type:C.BlendMode};class _r extends I{constructor(){super({gl:{functions:`
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
                `}})}}_r.extension={name:"soft-light",type:C.BlendMode};class Pr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"subtract",type:C.BlendMode};class Fr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"vivid-light",type:C.BlendMode};const fn=[];At.handleByNamedList(C.Environment,fn);async function na(t){if(!t)for(let e=0;e<fn.length;e++){const n=fn[e];if(n.value.test()){await n.value.load();return}}}let Ue;function oa(){if(typeof Ue=="boolean")return Ue;try{Ue=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Ue=!1}return Ue}var Ar=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Ar||{});class ra{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,l,a){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,l,a);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const ia=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Dr=class Mr extends Bi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...ia,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await na(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Mr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(Ze(_t,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:v.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Ar.ALL);const{clear:o,clearColor:r,target:i}=e;v.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ra(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,l=o[s];this.renderPipes[s]=new i(this,l?new l:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!oa())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Dr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let zr=Dr,mt;function sa(t){return mt!==void 0||(mt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??zr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!on.get().getWebGLRenderingContext())return!1;let o=on.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),mt}let gt;async function aa(t={}){return gt!==void 0||(gt=await(async()=>{const e=on.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),gt}const Kn=["webgl","webgpu","canvas"];async function la(t){let e=[];t.preference?(e.push(t.preference),Kn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Kn.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await aa()){const{WebGPURenderer:l}=await jn(async()=>{const{WebGPURenderer:a}=await import("./WebGPURenderer-BDjOSoCP.js");return{WebGPURenderer:a}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=l,o={...t,...t.webgpu};break}else if(s==="webgl"&&sa(t.failIfMajorPerformanceCaveat??zr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:l}=await jn(async()=>{const{WebGLRenderer:a}=await import("./WebGLRenderer-B7WOrHMQ.js");return{WebGLRenderer:a}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=l,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Lr="8.8.1";class Rr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Lr)}static destroy(){}}Rr.extension=C.Application;class ca{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Lr)}destroy(){this._renderer=null}}ca.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Er=class hn{constructor(...e){this.stage=new b,e[0]!==void 0&&Ze(_t,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await la(e),hn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ze(_t,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=hn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Er._plugins=[];let Ur=Er;At.handleByList(C.Application,Ur._plugins);At.add(Rr);var ua=`in vec2 aPosition;
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
`,da=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Qn=`struct GlobalFilterUniforms {
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
}`;const $r=class Nr extends Y{constructor(e){e={...Nr.defaultOptions,...e};const n=ve.from({vertex:{source:Qn,entryPoint:"mainVertex"},fragment:{source:Qn,entryPoint:"mainFragment"}}),o=N.from({vertex:ua,fragment:da,name:"alpha-filter"}),{alpha:r,...i}=e,s=new No({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};$r.defaultOptions={alpha:1};let fa=$r;class tt extends Me{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:l=null,onFrameChange:a=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof he?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=l,this.onFrameChange=a,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Xe.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Xe.shared.add(this.update,this,_i.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(he.from(e[o]));return new tt(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(he.from(e[o]));return new tt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof he)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Xe.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Xe.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ha extends Pi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:l,height:a,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Fi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,l!==void 0&&(this.width=l),a!==void 0&&(this.height=a)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function pa(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ze(_t,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class ma extends ha{constructor(...e){const n=pa(e,"Text");super(n,Ai),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Di.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Bn extends he{static create(e){return new Bn({source:new Mi(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new v("#000000"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),pastelBlue:new v("#75ACFF"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},ge=t=>{const[e,n,o]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:o/2})},X={original:new v(j.zxWhite),basic:g.white,dimmed:g.lightGrey},H={original:new v(j.zxYellow),basic:g.midRed,dimmed:g.redShadow},Z={original:new v(j.zxMagenta),basic:g.pink,dimmed:ge(g.pink)},O={original:new v(j.zxCyan),basic:g.pastelBlue,dimmed:ge(g.pastelBlue)},K={original:new v(j.zxGreen),basic:g.moss,dimmed:ge(g.moss)},_n={white:{basic:{main:X,edges:{towards:O,right:H},hud:{lives:H,dimmed:Z,icons:O}},dimmed:{main:X,edges:{towards:K,right:O},hud:{lives:H,dimmed:Z,icons:O}}},yellow:{basic:{main:H,edges:{towards:K,right:X},hud:{lives:O,dimmed:Z,icons:K}},dimmed:{main:H,edges:{towards:O,right:O},hud:{lives:O,dimmed:Z,icons:K}}},magenta:{basic:{main:Z,edges:{towards:K,right:O},hud:{lives:X,dimmed:O,icons:H}},dimmed:{main:Z,edges:{towards:K,right:O},hud:{lives:X,dimmed:O,icons:H}}},cyan:{basic:{main:O,edges:{towards:Z,right:X},hud:{lives:X,dimmed:K,icons:H}},dimmed:{main:O,edges:{towards:Z,right:X},hud:{lives:X,dimmed:K,icons:H}}},green:{basic:{main:K,edges:{towards:O,right:H},hud:{lives:X,dimmed:Z,icons:O}},dimmed:{main:K,edges:{towards:O,right:H},hud:{lives:X,dimmed:Z,icons:O}}}},Pn=t=>_n[t.hue][t.shade],Pe={head:g.pastelBlue,heels:g.pink},It=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+zn>n?100-Math.ceil((n-e)/(zn/100)):0},Gr=t=>t.type==="headOverHeels"?It(t.state.head)>0||It(t.state.heels)>0:It(t.state)>0,Vr=t=>{const e=100*B.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/B.w):0},ga={pureBlack:new v("#000000"),shadow:new v("#1B2D3B"),midGrey:new v("#505A55"),lightGrey:new v("#929981"),white:new v("#F8FEF8"),pastelBlue:new v("#4893FF"),metallicBlue:new v("#1D4E80"),pink:new v("#B973AF"),moss:new v("#6E7B00"),redShadow:new v("#513D40"),midRed:new v("#A7574B"),lightBeige:new v("#BF8E69"),highlightBeige:new v("#DBB269"),alpha:new v("#105A69"),replaceLight:new v("#048662"),replaceDark:new v("#052229")},lt=`in vec2 aPosition;
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
`,ba=`in vec2 vTextureCoord;
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
`;class ue extends Y{constructor(e){const n=Object.keys(e).length,o=N.from({vertex:lt,fragment:ba.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],l)=>{g[i].toArray().forEach((a,c)=>{r.uOriginal[l*3+c]=a}),s.toArray().forEach((a,c)=>{r.uReplacement[l*3+c]=a})})}}const va=`precision mediump float;
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
`;class $ extends Y{uniforms;constructor(e="white"){const n=N.from({vertex:lt,fragment:va,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ya=`precision mediump float;
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
`;class xa extends Y{constructor(){const e=N.from({vertex:lt,fragment:ya,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Xr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Hr=t=>Xr(_n[t.color.hue][t.color.shade].main),jr=t=>new ue({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&Hr(t)}),wa=new ue({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Ca=t=>new ue({replaceLight:t,replaceDark:ge(t)}),pn=(t,e,n)=>n?new ue(Xr(_n[t.color.hue][t.color.shade].edges[e])):new $(Pn(t.color).edges[e].original),re=t=>new ue(Hr(t)),eo=new xa,be=Go,Sa=new ue(ga),to={x:.5,y:1},no=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:l,label:a}=t;let c;if(no(t)?c=Ta(t):c=new Me(le().textures[t.textureId]),l!==void 0){const u={x:1,y:1,z:1,...l},d=new b({label:a??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const y=p({...t,times:void 0,label:`(${f},${h},${m})`}),T=k({x:f-1,y:h-1,z:m-1});y.x+=T.x,y.y+=+T.y,d.addChild(y)}return d}if(e===void 0&&o===void 0)if(no(t))c.anchor=to;else{const u=le().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=to}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),a!==void 0&&(c.label=a),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Ta({animationId:t,reverse:e,playOnce:n,paused:o}){const r=le().animations[t],s=(o?[r[0]]:r).map(a=>({texture:a,time:Vo}));e&&s.reverse();const l=new tt(s);return l.animationSpeed=Xo.animations[t].animationSpeed,l.play(),n!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),n==="and-destroy"&&(l.visible=!1)}),l}const ka=`#version 300 es

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
`;class De extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=N.from({vertex:lt,fragment:ka,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,l,a]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=l,i.uOutline[2]=a,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ee=new De({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),We=new $,oo=new $,Fn=new $,ro=new $(g.moss),Je=new $,Q=[We,ee],Ia=[Je,ee],Oa=[ee,Fn],bt={original:[ee,Je],colourised:{head:{active:[ee,new $(Pe.head)],inactive:[ee,new $(ge(Pe.head))]},heels:{active:[ee,new $(Pe.heels)],inactive:[ee,new $(ge(Pe.heels))]}}},Se=14,Ba=2,_a=Math.cos(30*(Math.PI/180)),Pa=40;class Fa{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Se,y:-14,filter:Q}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Se,y:Se,filter:Q}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Se,filter:Q}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:Q}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Se*Math.SQRT2,filter:Q}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Se*Math.SQRT2,filter:Q}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:Q}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:Q})}:{}},this.output.addChild(this.#e),this.output.addChild(new q().circle(0,0,Pa).fill("#00000000"));for(const o of te(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?be:We}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=_};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=zi(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:l,height:a}=this.output.getLocalBounds(),c=(i/n-o)/(l/2),u=(s/n-r)/(a/2),d=Li({x:-c,y:-u}),f=Ri(d,_a),h=A(f,Ba);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=ze(e)>Ei?yn(e):void 0;for(const[r,i]of Ho(this.arrowSprites))i.filters=r===o?Ia:Q}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const mn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:j.zxBlue,fire:j.zxYellow,carry:j.zxGreen,carryAndJump:j.zxRed,menu:j.zxWhite,map:j.zxWhite}};function nt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*qr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${e[o]}`;Ui(r),yield p({textureId:r,x:(o+.5-n/2)*St.w})}}function Oe(t,e){return t.removeChildren(),nt(qr(e),t),t}function Wr(t,e){return t.removeChildren(),nt(qr(e),t),t}const He=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?Oa:Fn,scale:{x:1,y:t?2:1}}),Ft=Symbol(),Jr=Symbol(),Yr=Symbol(),vt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Ca(mn.colourised[e]):o.filters=new $(mn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Jr]=r,o[Ft]=i,o[Yr]=n,o},$e=(t,...e)=>{t[Ft].removeChildren();for(const n of e)n!==void 0&&t[Ft].addChild(n)},yt=(t,e)=>{t[Jr].texture=le().textures[e?"button.pressed":"button"],t[Yr].y=e?1:0},io=(t,e,n)=>{n&&(t[Ft].filters=e?jr():be)},so=({which:t},e,n)=>{const o=Wr(new b,n);return o.filters=new ue({white:e?ge(mn.colourised[t]):g.pureBlack}),o};class Zr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const Kr=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Aa=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},ao=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Aa(t,e,n,o),An=(t,e,n=.001)=>{if(!ye(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:xn({state:{position:E(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+$i},id:t.id},{state:{position:E(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Qr=(t,e)=>{const o=[...oe(e).filter(i=>An(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const l=Vs(s,i);return l<0||l===0&&ao(t,s)>ao(t,i)?s:i})},Ye=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Ni};function ei({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Gr(e)||Ye(e)||(e.state.action="death",e.state.expires=t+cn))}const ie=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,ot=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,ti=t=>{const{gameState:e,movingItem:n,touchedItem:{id:o,config:r},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:l}=e;if(l[i]?.[o]!==!0)switch(s[o]&&(l[i]===void 0&&(l[i]={}),l[i][o]=!0),r.gives){case"hooter":{const a=Tt(n);if(a!==void 0){a.hasHooter=!0;break}break}case"doughnuts":{const a=Tt(n);a!==void 0&&(a.doughnuts=ie(a.doughnuts,6));break}case"bag":{const a=Ke(n);if(a!==void 0){a.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const a=Tt(n);a!==void 0&&(a.fastStepsStartedAtDistance=a.gameWalkDistance);break}case"jumps":{const a=Ke(n);a!==void 0&&(a.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ie(n.state.head.lives,2),n.state.heels.lives=ie(n.state.heels.lives,2)):n.state.lives=ie(n.state.lives,2);break;case"scroll":w.dispatch(Hi(r.page));break;case"reincarnation":{w.dispatch(Vi(Xi(e,w.getState())));break}case"crown":{w.dispatch(Gi(r.planet));break}}},Da=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;jo(i,o)<=0||e.state.action!=="death"&&Tn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},Ma=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Dt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=E(t.state.position,s)};function za({movingItem:t}){t.state.autoWalk=!1}const ne=(t,...e)=>W(...e)(t.touchedItem),Ne=(t,...e)=>W(...e)(t.movingItem),ni=t=>U(t.movingItem),La=t=>U(t.touchedItem),Ra=t=>qo(t.touchedItem),lo=t=>{switch(!0){case ne(t,"stopAutowalk"):za(t);break;case Ra(t):ei(t);break;case ne(t,"portal"):Da(t);break;case ne(t,"pickup"):ti(t);break;case ne(t,"doorFrame"):Ma(t);break}},J={movementType:"steady"},Dn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Wo(e.items);if(r!==void 0)return Ye(r)?void 0:r;const i=n===void 0||Ye(n)||n.state.action==="death"?void 0:Ln(n.state.position,t),s=o===void 0||Ye(o)||o.state.action==="death"?void 0:Ln(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},oi=150,ri=t=>t[Math.floor(Math.random()*t.length)],ae=Object.freeze({movementType:"vel",vels:{walking:_}}),Rt=t=>Jo(t)?me[t.config.which]:me[t.type],co=B.w/2,Ea=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=me.homingBot;if(!Mt(e,se))return{movementType:"steady"};const{head:s,heels:l}=Wo(n.items);for(const a of[s,l]){if(a===void 0)continue;const c=it(a.state.position,t);if(Math.abs(c.y)<co)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<co)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Ua=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:l}}=t;if(i===null)return ae;const a=Dn(r,e);if(a===void 0||s+oi>e.roomTime)return J;const c=it(a?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>B.w/4?u:st(u),f=Rt(t),h={..._,[d]:c[d]>0?f:-f},m=xe(h),y=!Mt(m,l);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...y?{timeOfLastDirectionChange:e.roomTime}:pe}}},uo=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ae;const l=Dn(i,e);if(l===void 0)return ae;const a=l.state.position,c=B.w*3;if(!(i.x>a.x-c&&i.x<a.x+c&&i.y>a.y-c&&i.y<a.y+c))return ae;const d=it(l?.state.position,i),f=Rt(t),h=(1+Math.sqrt(2))/2,m=f*h,y=A({...d,z:0},m/Yo(d)*(r?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:xe(y)}}},Ht=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ae;if(!(we(i,_)||Math.random()<o/1e3))return J;const a=ri(r);return{movementType:"vel",vels:{walking:A(rn[a],Rt(t))},stateDelta:{facing:rn[a]}}},$a=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ae:Mt(i,se)?{movementType:"vel",vels:{walking:A(r,Rt(t))}}:J},Na=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=ri([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},jt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:l},aabb:a}=t;if(!l||(t.state.durationOfTouch+=o,t.state.durationOfTouch<oi))return;const c=Lt(i,a,e,n);if(c.x===0&&c.y===0)return;const u=Na(s,c,r);t.state.vels.walking=u,t.state.facing=xe(u),t.state.durationOfTouch=0},Ga=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},Va=(t,e,n,o)=>{if(!t.state.activated||Jo(t)&&t.state.busyLickingDoughnutsOffFace)return ae;switch(t.config.movement){case"patrol-randomly-diagonal":return Ht(t,e,n,o,Ji);case"patrol-randomly-xy8":return Ht(t,e,n,o,Wi);case"patrol-randomly-xy4":return Ht(t,e,n,o,qi);case"towards-tripped-on-axis-xy4":return Ea(t,e);case"towards-on-shortest-axis-xy4":return Ua(t,e);case"back-forth":case"clockwise":return $a(t);case"unmoving":return ae;case"towards-analogue":return uo(t,e);case"towards-analogue-unless-planet-crowns":return uo(t,e,n,o,ji(w.getState()));default:throw t.config,new Error("this should be unreachable")}},Xa=t=>{const{movingItem:e,touchedItem:n}=t;if(ye(n,e))switch(e.config.movement){case"patrol-randomly-xy4":jt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":jt(t,"opposite");break;case"clockwise":jt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Ga(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},Ha=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const l of o.modifies){const a=n.items[l.target];a!==void 0&&(a.state={...a.state,[l.key]:l[s]})}break}case"in-store":{w.dispatch(Yi(o.path));break}}},ja=({movingItem:t,touchedItem:e})=>{if(!ye(t))return;const{state:{position:n},aabb:o}=e,r=Lt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=xe(r),s=A(i,-.05);return e.state.vels.sliding=s,!1},qa=({movingItem:t,touchedItem:e})=>{if(!ye(e))return;const n=t.state.vels.sliding;if(we(n,_))return;const{state:{position:o},aabb:r}=t,i=Lt(e.state.position,e.aabb,o,r);return jo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},Wa=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:l},aabb:a}=n,c=Lt(t.state.position,t.aabb,l,a);if(c.x===0&&c.y===0)return;const u=xe(c);for(const d of s){const f=e.items[d],h=A(u,-.025*o);f.state.facing=h,kn({room:e,subjectItem:f,gameState:r,pusher:n,posDelta:h,deltaMS:o,onTouch:i})}},ct=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:wn(w.getState(),t),Ja=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,l=s.currentActionPress("jump"),a=i===null?null:e.items[i],c=a!==null&&W("teleporter")(a)&&ct(a);if(r===null)return l!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:a.config.toRoom,timeRemaining:cn}}}:J;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Tn({changeType:"teleport",sourceItem:a,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:cn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Ya=1e3/12,xt=t=>{const n=t/es*Vo;return(t+.5*sn*n**2)/n},Za={head:xt(dt.head),headOnSpring:xt(dt.head+B.h),heels:xt(dt.heels),heelsOnSpring:xt(dt.heels+B.h)},fo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Za[`${n}${e?"OnSpring":""}`]},Ka=t=>!(t===null||Ki(t)&&ct(t)||Qi(t)&&t.config.gives==="scroll"||U(t)&&t.state.standingOnItemId===null),Qa=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+Ya>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),ii=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Le(o,e);if(Qa(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:fo(t,!1)}},stateDelta:{}};if(!(r.currentActionPress("jump")!=="released"&&Ka(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:J;const l=Zi(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:fo(t,l)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},el=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=ze(t),l=Math.max(i,Math.min(o,s+e*r)),a=Math.min(l,o);return A(n,a)},ho={movementType:"vel",vels:{walking:_}},si=(t,e,n,o)=>{const r=tl(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=ze(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!we(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},tl=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:l,standingOnItemId:a,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,y=o===t.id,T=y?n.currentActionPress("jump"):"released",P=y?n.directionVector:_,F=a===null&&m.z<0,D=i==="head"&&Vr(t.state)>0&&a!==null,G=i==="headOverHeels"?F?"head":"heels":D?"heels":i,M=l?c:P,V=me[G];if(u!==null||s==="death")return ho;if(i==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Zo(h,A(h,ts*r))}}:ho;if(T!=="released"){const ut=xe(Mt(M,se)?c:M),Ti=W("spring")(Le(a,e))?1:ns;return{movementType:"vel",vels:{walking:A({...ut,z:0},V*Ti)},stateDelta:{facing:ut}}}}if(ze(M)!==0)return F?{movementType:"vel",vels:{walking:A({...M,z:0},V)},stateDelta:{facing:M,action:"falling"}}:{movementType:"vel",vels:{walking:el({vel:h,acc:os[G],deltaMS:r,maxSpeed:V,unitD:M,minSpeed:0})},stateDelta:{facing:M,action:"moving"}};if(d>0&&d<1){const ut=we(f,c)?1:0;return{movementType:"position",posDelta:A(c,ut-d),stateDelta:{action:F?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:F?"falling":"idle"}}},po=t=>Ce(t.movingItem)&&An(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),ai=(t,e)=>{let n=_;for(const o of e){if(o.movementType==="position"&&(n=E(n,o.posDelta)),o.movementType==="vel"&&(Ce(t)||W("lift")(t)))for(const[i,s]of Ho(o.vels)){const l={..._,...s};t.state.vels[i]=l}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},mo=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&U(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&po(t)){if(po(t)&&ni(t)){Ko({above:t.movingItem,below:t.touchedItem});const n=[ii(t.movingItem,t.room,t.gameState),si(t.movingItem,t.room,t.gameState,t.deltaMS)];ai(t.movingItem,n)}ar(t)}};function nl(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Mn=t=>{ni(t)&&lo(t),La(t)&&lo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ne(t,...Rn)&&ja(t),Ne(t,...Rn)&&qa(t),(Ne(t,"monster")&&ne(t,"firedDoughnut")||Ne(t,"firedDoughnut")&&ne(t,"monster"))&&nl(t),(Ne(t,"monster")||Ne(t,"movingPlatform"))&&Xa(t),ne(t,"switch")&&Ha(t),ne(t,"joystick")&&Wa(t,Mn),t.touchedItem.state.disappear&&mo(t),t.movingItem.state.disappear&&ye(t.touchedItem,t.movingItem)&&mo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},ol=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:l}=i,{state:{position:a}}=t;if(!l)return;const c=ce(e.items).filter(Qo),u=s===null?li(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;rl(e,i,u)}else{if(t.state.standingOnItemId===null||!ci(t,er(e.items)))return;const h=rs({gameState:n,room:e,itemType:s.type,config:s.config,position:a});kn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Mn}),i.carrying=null}},rl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,tr({room:t,item:n})},li=(t,e)=>Qr(t,ce(e.items).filter(Qo)),ci=(t,e)=>{const n={position:E(t.state.position,{z:B.h})},o=is({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(ye(r,t)){if(!Ce(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!ci(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},qt=-11,il={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const l=s?.state.standingOnItemId??null,a=l===null||i===void 0?null:i.items[l],c=a===null?!1:a.type==="teleporter"&&ct(a),u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?vt({colourise:n,button:t}):r;if(o?.pressed!==u&&yt(d,u),c!==o?.standingOnTeleporter)if(c)$e(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=so(t,n,"JUMP");f.y=qt,$e(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const l=i&&Ke(i),a=l?.hasBag??!1,c=l?.carrying??null,u=c===null&&s!==void 0&&li(i,s)!==void 0,d=t.actions.every(y=>e.currentActionPress(y)!=="released"),f=a&&!u&&c===null,h=r===null?vt({colourise:n,button:t}):r;if(h.visible=a,a&&(f!==o?.disabled&&io(h,f,n),h.visible=!0,o?.pressed!==d&&yt(h,d),a!==o?.hasBag||c!==o?.carrying)){let y;c!==null?y=Kr(c):a&&(y=p({textureId:"bag",y:-2})),$e(h,y)}return{output:h,renderProps:{pressed:d,hasBag:a,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&Tt(i),l=s?.hasHooter??!1,a=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?vt({colourise:n,button:t}):r,d=l||ot(a)>0;if(u.visible=d,d&&(o?.pressed!==c&&yt(u,c),l!==o?.hasHooter||a!==o?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):ot(a)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=Oe(new b,a);h.y=qt,h.filters=ee,$e(u,f,h),io(u,a===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:a,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const l=(i&&Ke(i))?.hasBag??!1,a=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||a!==o.pressed||n!==o.colourise||l!==o.hasBag))return"no-update";let u;if(r===null){u=vt({colourise:n,button:t});const d=so(t,n,"C+J");d.y=qt,$e(u,d)}else u=r;return l?(u.visible=!0,o?.pressed!==a&&yt(u,a)):u.visible=!1,{output:u,renderProps:{pressed:a,hasBag:l,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=Q,{output:e,renderProps:pe}},map({previousRendering:t}){if(t!==null)return"no-update";const e=He({label:"mapText",outline:!0});return Wr(e,"MAP"),{output:e,renderProps:pe}}};class Te extends Zr{constructor(e){const n=il[e.button.which];super(e,n)}}const sl=30,al=15,ll=42,cl=36,ul=44,dl=20;class fl{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Te({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new Te({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new Te({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new Te({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new Te({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new Te({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new Fa({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:l}=this.#n;for(const{renderContext:{button:{which:a}},output:c}of te(i))a==="menu"||a==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=al,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=sl,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(l.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of te(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-ul,this.#n.mainButtonNest.y=e.y-dl,this.#n.joystick.output.x=ll,this.#n.joystick.output.y=e.y-cl,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of te(this.#n.buttons))r.tick({...e,currentPlayable:Re(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Xo.frames.button.frame;const hl=250,pl=t=>t?48:24,ml=t=>t?68:56,gl=(t,e)=>t?e.x/2-24:80,bl=t=>t?72:24,vl=t=>t?88:0,go=112,Ge=t=>t==="heels"?1:-1;class yl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Nt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[ro],this.#t.fps.y=St.h,this.#o(),n&&(this.#n=new fl({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#a("head"),livesText:He({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#a("heels"),livesText:He({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:He({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Nt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const l=new Me({texture:le().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:oo,y:n?0:8});s.addChild(l);const a=He({outline:r==="text-only"});return a.y=n?0:16,a.x=l.x=St.w/2,s.addChild(a),o&&(a.visible=!1),r===!0&&(s.filters=ee),{text:a,icon:l,container:s}}#a(e){const n=new Me(le().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ge("head")*go,this.#t.head.doughnuts.container.y=e.y-je.h-8,this.#t.heels.carrying.container.y=e.y-je.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ge("heels")*go,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-St.w*2}#s(e,n){return e?n?be:Je:n?eo:We}#c(e){const{renderContext:{gameState:n}}=this,o=ft(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:l}=this.#t.heels.carrying,a=l.children.length>0;if(i===null&&a)for(const c of l.children)c.destroy();i!==null&&!a&&l.addChild(Kr(i)),l.filters=this.#s(!0,s),this.#t.heels.bag.icon.filters=this.#s(r,s)}#l(e){const{renderContext:{gameState:n}}=this,o=ft(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#s(r,s),this.#t.head.doughnuts.icon.filters=this.#s(i!==0,s),Oe(this.#t.head.doughnuts.text,i)}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ft(r,e),{text:s,container:l}=this.#t[e].shield,{text:a,container:c}=this.#t[e].extraSkill,u=It(i),d=u>0||!o;l.visible=d,d&&(Oe(s,u),l.y=n.y-vl(o)),c.x=l.x=(n.x>>1)+Ge(e)*gl(o,n);const f=i===void 0?0:e==="head"?Vr(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(Oe(a,f),c.y=n.y-bl(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#u(r,e),s=this.#t[e].sprite,{renderContext:{colourise:l}}=this;i?s.filters=l?be:Je:s.filters=l?eo:We,s.x=(n.x>>1)+Ge(e)*ml(o),s.y=n.y-je.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ft(r,e)?.lives??0,l=this.#t[e].livesText;l.x=(n.x>>1)+Ge(e)*pl(o),l.y=n.y,Oe(l,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=Pn(n.color),{colourise:r,gameState:i}=this.renderContext;We.targetColor=o.hud.dimmed[r?"dimmed":"original"],Fn.targetColor=o.hud.dimmed[r?"basic":"original"],oo.targetColor=o.hud.icons[r?"basic":"original"],Je.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?bt.colourised.head[this.#u(i,"head")?"active":"inactive"]:bt.original,this.#t.heels.livesText.filters=r?bt.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:bt.original}#d=ss;#g(){if(as(w.getState())){if(performance.now()>this.#d+hl){const e=Xe.shared.FPS;Oe(this.#t.fps,Math.round(e)),ro.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Nt)this.#p(n,e),this.#h(n,e),this.#f(n,e);this.#i(e),this.#l(e),this.#c(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const bo={movementType:"vel",vels:{gravity:_}},xl=(t,e,n,o)=>{if(!ye(t))return bo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,a=ls[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Le(s,e);return W("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-sn*o,-a)}}}:bo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-sn*o,-a)}}}},vo=B.h,yo=.001,wl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=En**2/(2*Ee);if(n==="up"){if(e<=o)return Math.max(yo,Math.sqrt(2*Ee*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(yo,Math.sqrt(2*Ee*r))}else return En}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Ee*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Ee*Math.max(e,0))):-.036};function Cl({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}}){const r=t*vo,i=e*vo,s=wl({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const l=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:l}}}const xo={movementType:"vel",vels:{movingFloor:_}},Sl=(t,e,n,o)=>{if(U(t)&&t.state.teleporting!==null)return xo;const{state:{standingOnItemId:r}}=t,i=Le(r,e);if(i===null||!W("conveyor")(i))return xo;const{config:{direction:s}}=i,a=W("heels")(t)&&t.state.action==="moving"&&Cn(t.state.facing)===cs(s)?me.heels:us;return{movementType:"vel",vels:{movingFloor:A(rn[s],a)}}};function*Tl(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const kl=B.w*Math.sqrt(2)+1,Il=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:l,doughnutLastFireTime:a,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=xe(d);if(r.currentActionPress("fire")==="tap"&&l&&ot(s)>0&&a+f<c){const m={type:"firedDoughnut",...ds,config:pe,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:E(u,A(h,kl),t.type==="headOverHeels"?{z:B.h}:_),vels:{fired:A(h,me.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};Sn({room:e,item:m}),i.doughnuts=ie(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},ui=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Ol=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),wt=B.w*3,Bl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-wt&&n.x<o.x+wt&&n.y>o.y-wt&&n.y<o.y+wt},wo=(t,e,n,o,r)=>{if(r&&t.state.activated)return J;const i=Dn(t.state.position,e);return i===void 0?J:Bl(t,i)?ui:Ol},_l=(t,e,n,o)=>t.state.activated?J:at(t.state.stoodOnBy,e).some(U)?ui:J,Pl=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return wo(t,e,n,o,!0);case"while-player-near":return wo(t,e,n,o,!1);case"on-stand":return _l(t,e);case"off":case"on":return J;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Fl=2;function*Al(t,e,n,o){Ce(t)&&(yield xl(t,e,n,o),yield Sl(t,e),yield*Tl(t,e)),U(t)&&(yield si(t,e,n,o),t.id===n.currentCharacterName&&(yield Ja(t,e,n,o),yield ii(t,e,n),fs(t)&&ol(t,e,n,o),hs(t)&&Il(t,e,n))),ps(t)&&(yield Cl(t)),ms(t)&&(yield Pl(t,e,n,o),yield Va(t,e,n,o))}const Dl=(t,e,n,o)=>{if(!Ce(t)||t.state.standingOnItemId===null)return;const r=Le(t.state.standingOnItemId,e);U(t)&&r.type==="pickup"&&ti({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||U(t)&&r.state.disappear==="onTouchByPlayer")&&ar({touchedItem:r,gameState:n,room:e})},Ml=(t,e,n,o)=>{if(U(t)&&t.state.standingOnItemId!==null){const a=Le(t.state.standingOnItemId,e);(qo(a)||a.type==="spikes")&&ei({room:e,movingItem:t})}const r=[...Al(t,e,n,o)];Dl(t,e,n);let i=ai(t,r);(Ce(t)||W("lift")(t)||W("firedDoughnut")(t))&&(i=E(i,...oe(te(t.state.vels)).map(a=>A(a,o))));const s=Math.ceil(ze(i)/Fl),l=A(i,1/s);for(let a=0;a<s;a++)kn({subjectItem:t,posDelta:l,gameState:n,room:e,deltaMS:o,onTouch:Mn})},zl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ie(e.state.head.lives,-1),e.state.heels.lives=ie(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ie(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=ot(e.state.head.lives)>0,i=ot(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,fe(t,e);const u=Un(e)[c],d=Fe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:$n(u)};return}if(t.entryState.headOverHeels!==void 0){fe(t,e);const c=Fe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Un(e);if(fe(t,c),fe(t,u),xn(c,u)){const d=nr({head:c,heels:u});fe(t,d,"heels");const f=Fe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:$n(d)};return}else{const d=Fe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Fe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=bs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??pe});for(const i of e)Sn({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Xs(r,t);return r},fe=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Ll=(t,e)=>{const n=or(t,rr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];fe(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const l=nr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});fe(t,l);const a=Fe({gameState:t,playableItems:[l],roomId:o.id});t.characterRooms={headOverHeels:a},t.currentCharacterName="headOverHeels";return}Sn({room:o,item:e});return}else{const s=Fe({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Rl=(t,e)=>{e.type==="headOverHeels"?zl(t,e):Ll(t,e),Re(t)===void 0&&w.dispatch(gs({offerReincarnation:!0}))},El=t=>{for(const e of ce(t.items))for(const n of at(e.state.stoodOnBy,t)){if(!t.items[n.id]){Nn(n,t);continue}if(!An(n,e)){Nn(n,t);const o=Qr(n,er(t.items));o!==void 0&&Ko({above:n,below:o})}}},Ul=2*Hs,$l=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Ul,positionDelta:n})},Nl=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Zo(o.state.position,r),z:0};if(!we(s,_))for(const l of at(o.state.stoodOnBy,e))$l(l,e,s)}},Gl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Vl=t=>{for(const e of ce(t.items)){const n=e.state.position;e.state.position=xs(n)}},Xl=(t,e)=>{for(const n of ce(t.items))!Ce(n)||t.roomTime===n.state.actedOnAt.roomTime||ws(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Cs(n.state.position),e.add(n))},Hl=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},jl=pe,ql=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let o=0;o<t.gameSpeed;o++){const r=Co(t,e),i=Qe(t)?.items??jl;n=new Set(oe(un(n,r)).filter(({id:s})=>i[s]!==void 0))}return n}return Co(t,e*t.gameSpeed)},Co=(t,e)=>{const n=Qe(t);if(n===void 0)return ir;Wl(t,n,e);const o=Object.fromEntries(vs(n.items).map(([s,l])=>[s,l.state.position]));ys(t);for(const s of te(n.items))Gl(s,n)&&(tr({room:n,item:s}),U(s)&&Rl(t,s));const r=Object.values(n.items).sort(Hl);for(const s of r){const l=Re(t);if(l===void 0||l.state.action==="death")break;if(n.items[s.id]!==void 0)try{Ml(s,n,t,e)}catch(a){throw console.error(a),new Error(`error caught while ticking item ${s.id}: ${a}`)}}El(n),Vl(n);const i=new Set(oe(te(n.items)).filter(s=>o[s.id]===void 0||!we(s.state.position,o[s.id])));return Nl(i,n,o),Xl(n,i),i},Wl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Re(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=or(t,rr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},So=(t,e)=>{const n=S(t),o=S(E(t,{x:e.x,z:e.z})),r=S(E(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Wt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,Jl=(t,e,n,o)=>{const r=So(t,e),i=So(n,o),s=r.topLeft.x,l=r.topRight.x,a=i.topLeft.x,c=i.topRight.x,u=Wt(s,l,a,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,y=Wt(d,f,h,m),T=r.topLeft.y+r.topLeft.x/2,P=r.bottomCentre.y+r.bottomCentre.x/2,F=i.topLeft.y+i.topLeft.x/2,D=i.bottomCentre.y+i.bottomCentre.x/2,G=Wt(T,P,F,D);return u&&y&&G},Yl=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!Jl(n,o,r,i))return 0;for(const s of Ss){const l=t.state.position[s],a=l+o[s],c=e.state.position[s],u=c+i[s];if(a<=c)return 1*(s==="z"?-1:1);if(l>=u)return-1*(s==="z"?-1:1)}return To(e)-To(t)},To=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ot extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Zl=t=>{const e=Kl(t);let n=e.length,o=n;const r=new Array(n),i={},s=Ql(e);for(;o--;)i[o]||l(e[o],o,new Set);return r;function l(a,c,u){if(u.has(a))throw new Ot([a],!1);if(i[c])return;i[c]=!0;const d=t.get(a)||new Set,f=Array.from(d);if(c=f.length){u.add(a);do{const h=f[--c];try{l(h,s.get(h),u)}catch(m){throw m instanceof Ot?m.hasClosedCycle?m:new Ot([a,...m.cyclicDependency],m.cyclicDependency.includes(a)):m}}while(c);u.delete(a)}r[--n]=a}};function Kl(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Ql(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const ko=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ct=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},ec=(t,e=new Set(te(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Ct(n,r,s);for(const r of e)if(r.renders)for(const i of te(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=Yl(r,i);if(ko(o,r,i),s===0){Ct(n,r.id,i.id),Ct(n,i.id,r.id);continue}const l=s>0?r.id:i.id,a=s>0?i.id:r.id;ko(n,l,a),Ct(n,a,l)}return n},di=(t,e,n=3)=>{try{return{order:Zl(t),impossible:!1}}catch(o){if(o instanceof Ot){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:di(t,e,n-1).order,impossible:!0}}else throw o}};class tc extends Zr{}const Io=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Oo=(t,e)=>{const n=new q;return Io(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Io(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},nc={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class oc{constructor(e){this.renderContext=e;const{item:n}=e,o=nc[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),W("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new q().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new q().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new q({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Oo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Oo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new ma({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class rc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const ic=(t,e)=>{const n=e.getLocalBounds(),o=Bn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new Me({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Bo=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof Me?r:ic(t,r)};class sc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=w.getState();n||(this.#e.filters=new fa({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,l=Bo(r,i,s);o.shadowMask.relativeTo==="top"&&(l.y-=o.aabb.z),s&&(l.y-=((s.z??1)-1)*B.h),this.#e.addChild(l),n||(this.#e.mask=l)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),l=o.state.position.z+o.aabb.z,a=ce(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:l}},aabb:{...o.aabb,z:Ts}},u=Object.groupBy(a,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":xn(c,d)?f?"update":"create":"noShadow"});for(const d of un(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=Bo(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of un(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...it(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Pt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const ac=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,lc=(t,e,n)=>{const r=le().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&le().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},Ve=t=>z(({renderContext:{item:e}})=>ks(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),z=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:pe}:"no-update";function*cc({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Dt(t),i=r==="y"?1:16;function*s(l){if(e){if(n!==0){const a=p({textureId:`generic.door.floatingThreshold.${r}`,...kt(l,{y:-12*n})});a.filters=pn(o,r==="x"?"towards":"right",!0),yield a}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...kt(l,{})});for(let a=1;a<n;a++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...kt(l,{y:-a*B.h})})}}yield*s(k({...se,[r]:1})),yield*s(se),e||(yield p({pivot:{x:16,y:B.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...k({...se,[r]:1})}))}const fi=(t,e)=>{const n=Dt(t),o=st(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):se},uc=z(({renderContext:{item:t,room:e}})=>nt(cc(t,e),new b({filters:re(e),...fi(t.config.direction,t.aabb)}))),dc=z(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Dt(t),l=i.rooms[n];return p({textureId:lc(r,s,e),filter:re(l),...fi(t,o)})}),Jt={animationId:"bubbles.cold"},Ae=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},hi=Symbol(),pi=Symbol(),fc=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[hi]=t,n[pi]=e,n},hc=`#version 300 es

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
`;class _o extends Y{constructor(e){const n=N.from({vertex:lt,fragment:hc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const pc=({name:t,action:e,facingXy8:n,teleportingPhase:o,paused:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:r};if(o==="out")return{animationId:`${t}.fadeOut`,paused:r};if(o==="in")return{animationId:`${t}.fadeOut`,paused:r};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:r};if(e==="falling"){const s=`${t}.falling.${n}`;if(Bs(s))return{textureId:s}}const i=`${t}.idle.${n}`;return _s(i)?{animationId:i,paused:r}:{textureId:`${t}.walking.${n}.2`}},gn=Symbol(),bn=Symbol(),mc=(t,e)=>{t[gn].removeChildren(),t[gn].addChild(p(pc(e)))},Yt=(t,e,n)=>{const o=new b,r=new b;o[gn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new ue({pastelBlue:g.pink}):be,flipX:t==="heels"});return o[bn]=i,o},Po=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Os>t,gc=t=>{if(!Ye(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Gn<Gn*.15},Fo=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Ao=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?be:t.filters},bc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Fo(r,new De({outlineColor:Pe[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Ao(r,De);const s=o?.flashing??!1;n&&!s?Fo(r,new _o(Pe[t])):!n&&s&&Ao(r,_o)},vc=(t,e,n)=>{e&&!n?t.addChild(t[bn]):!e&&n&&t.removeChild(t[bn])},Zt=(t,e,n,o,r,i)=>{n&&mc(e,{name:t,...o,paused:r}),bc(t,o,i,e),vc(e,o.shining,i?.shining??!1)},Kt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:l,teleporting:a}}=e,c=yn(l)??"towards",u=e.type==="headOverHeels"?Po(e.state.head,"headOverHeels","headOverHeels"):Po(e.state,e.type,n.currentCharacterName),d=gc(e),f=Gr(e),h=ze(l),m=a?.phase??null,y={action:s,facingXy8:c,teleportingPhase:m,flashing:d,highlighted:u,shining:f},T=t===void 0||t.action!==s||t.facingXy8!==c||t.teleportingPhase!==m;let P;if(i==="headOverHeels"){P=r??fc({top:Yt("head",!0,o),bottom:Yt("heels",!0,o)});const F=P;Zt("head",F[hi],T,y,o,t),Zt("heels",F[pi],T,y,o,t)}else P=r??Yt(i,!1,o),Zt(i,P,T,y,o,t);return s==="moving"&&r instanceof tt&&(r.animationSpeed=h*Is),{output:P,renderProps:y}},yc=(t,e)=>{const n=([s,l])=>l.config.direction==="away"||l.config.direction==="left",o=new b({label:"floorOverdraws",...k({x:-e.x,y:-e.y})}),r=nt(oe(Pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:l,direction:a},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...k(c),times:l,anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"floorOverdraws"})),i=nt(oe(Pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:l},position:a}])=>a.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...k(kt(a,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:l==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...k({...a,z:0}),times:{[st(et(l))]:2},anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},xc=t=>[...oe(te(t.items)).filter(e=>e.type==="wall").filter(e=>et(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],wc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Cc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new q().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(k),!0).fill(0),Sc=z(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:l,edgeRightX:a}=zt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const F=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,D=new b;for(let M=-1;M<=r+2;M++)for(let V=M%2-1;V<=i+2;V+=2)D.addChild(Ps({x:M+(s.right?-.5:0),y:V+(s.towards?-.5:0)},p({textureId:F})));D.addChild(yc(h,{x:n,y:o}));const G=new q().poly([se,k({x:c,y:0}),k({x:c,y:u}),k({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});D.addChild(G),D.filters=re(t),D.mask=G,m.addChild(D)}const y=xc(h),T=new q().poly([{x:l,y:16},{x:l,y:-999},{x:a,y:-999},{x:a,y:16}],!0).fill(16776960);m.addChild(T);const P=wc(y);if(P!==void 0){const F=Cc({extraWallRanges:P,blockXMin:n,blockYMin:o});m.addChild(F)}return m.mask=T,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Tc=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=k({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return oe(Pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,l])=>{const{config:{direction:a},position:c}=l,u=a==="right"&&c.x===0,d=a==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${a}`,...k(f),times:l.type==="wall"?l.config.times:{[st(et(a))]:2}});i[a].addChild(h),a==="right"&&c.y===0&&e<0&&i[a].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${a}`,...k(E(f,{y:-.5}))})),a==="towards"&&c.x===0&&t<0&&i[a].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${a}`,...k(E(f,{x:-.5}))}))}),i},kc=z(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:l}=zt(e.roomJson),a=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new q({label:"overDrawToHideFallenItems"}).poly([k({x:a,y:0}),k({x:0,y:0}),k({x:0,y:c}),{...k({x:0,y:c}),y:999},{...k({x:a,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=Tc({blockXMin:n,blockYMin:o},e.roomJson);f.filters=pn(e,"towards",t),h.filters=pn(e,"right",t),u.addChild(f),u.addChild(h);const m=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Ic=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Oc=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,l=s?wa:i?void 0:Ic.includes(t.which)?jr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=Cn(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const u={facingXy4:a,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${a}`,filter:l}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${a}`,filter:l}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${a}`,filter:l}:{textureId:`${t.which}.${a}.1`,filter:l}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Ae({top:{textureId:`${t.which}.${a}`,filter:l||re(n)},bottom:{...Jt,paused:o}}):p({textureId:`${t.which}.${a}`,filter:l}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Ae({top:`${t.which}.${a}`,filter:l}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:l}:{textureId:`${t.which}.1`,filter:l}),renderProps:c};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:c};case"bubbleRobot":return{output:Ae({top:{...Jt,paused:o},filter:l}),renderProps:c};case"emperorsGuardian":return{output:Ae({top:"ball",bottom:{...Jt,paused:o},filter:l}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},rt=t=>{for(const e in t)return!0;return!1},Bc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Qt=g.moss,Do=()=>z(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),_c={head:Kt,heels:Kt,headOverHeels:Kt,doorFrame:dc,doorLegs:uc,monster:Oc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:z(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=st(et(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const l=p({textureId:ac(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:qe.w,y:qe.h+1}:{x:0,y:qe.h+1},filter:re(o)}),a=k({[r]:s});l.x+=a.x,l.y+=a.y,i.addChild(l)}return i}),barrier:z(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:z(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?re(n):void 0,times:e})),spikes:Ve("spikes"),slidingDeadly:Do(),slidingBlock:Do(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:Bc(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?re(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?wn(w.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=rt(n);if(!(r===void 0||r.moving!==i))return"no-update";const l=new b,a=et(t);return l.addChild(p(i?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${a}.6`,times:e})),{output:l,renderProps:{moving:i}}},lift:z(({renderContext:{paused:t}})=>{const e=new b,n={x:je.w/2,y:je.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=ct(t),l=s&&at(r,e).find(U)!==void 0;return o===void 0||s!==o.activated||l!==o.flashing?{output:l?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:s}}:"no-update"},pickup:z(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:re(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:z(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=Cn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Ae({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:Ve("joystick"),movingPlatform:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new De({outlineColor:Qt,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=rt(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const l=o?.compressed??!1,a=e?new De({outlineColor:Qt,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===l&&e!==o?.highlighted;let u;return c?(r.filters=a??Go,u=r):u=p(!i&&l?{animationId:"spring.bounce",playOnce:"and-stop",filter:a,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:a}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new De({outlineColor:Qt,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Ae({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Ve("hushPuppy"),bubbles:z(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Ve({animationId:"bubbles.doughnut"}),ball:Ve("ball"),floor:Sc,floorEdge:kc};class Pc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const R=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:l=!1}=e,a=x.createBufferSource(),c=an()[o];return a.buffer=c,a.loop=i,a.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&l?a.start(0,c.duration*Math.random()):a.start(),r!==void 0&&a.connect(r),a},ke=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},L=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let l=!0,a,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(l&&i)?(a?.stop(),a=R({...t}),ke(a,t.gain,s),n!==void 0&&(r?(a=R({...n,loop:!0}),ke(a,n.gain,s)):a.onended=()=>{c&&(a=R({...n,loop:!0}),ke(a,n.gain,s))})):n!==void 0&&(a=R({...n,loop:!0}),ke(a,n.gain,s)):(a&&a.loop&&(a.stop(),a.onended=null),o!==void 0&&(a=R({...o}),ke(a,o.gain,s)));else if(c!==u&&e!==void 0){const f=R({...e});ke(f,e.gain,s)}l=!1,c=u}};class Fc{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Ac{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&R({soundId:"bonus",connectTo:this.output});break}case"disappearing":R({soundId:"destroy",connectTo:this.output})}}output=x.createGain();tick(){}destroy(){}}class Dc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n.connect(this.output),this.#n.gain.value=.3}output=x.createGain();#e=x.createGain();#n=x.createGain();#t=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o=L({start:{soundId:"metalHit"}},this.#n);tick(){const{renderContext:{item:e,room:{roomTime:n,items:o}}}=this,{state:{actedOnAt:{roomTime:r,by:i},collidedWith:{roomTime:s,by:l}}}=e,a=n===r&&oe(ln(i)).some(u=>Fs(o[u]));this.#t(a);const c=n===s&&!cr(ln(l));this.#o(c)}destroy(){}}const en=2;class Mc{constructor(e){this.renderContext=e}output=x.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:en},loop:{soundId:"conveyorLoop",playbackRate:en},stop:{soundId:"conveyorEnd",playbackRate:en}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=rt(e);this.#e(n)}destroy(){this.#e(!1)}}const zc=3;class Lc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=R({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+zc*e)}destroy(){}}const Mo={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},zo={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Lo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Ro={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Rc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Mo[n]!==void 0&&(this.#r=L({start:Mo[n]},this.#e)),zo[n]!==void 0&&(this.#t=L({change:zo[n]},this.#e)),Ro[n]!==void 0&&(this.#a=L(Ro[n],this.#e)),Lo[n]!==void 0&&(this.#o=L({loop:Lo[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#a;tick(){const{renderContext:{item:e,room:{roomTime:n}}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,collidedWith:{roomTime:s,by:l},vels:{walking:a}}}=e;if(this.#t){const c=yn(o);this.#t(c)}if(this.#r){const c=n===s&&!cr(ln(l));this.#r(c)}if(this.#o){const c=r&&!i;this.#o(c)}if(this.#a){const c=!we(a,_);this.#a(c)}}destroy(){}}class tn{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#a.connect(this.output);const n=e.item.type;this.#n=L({loop:{soundId:`${n==="headOverHeels"?"heels":e.item.type}Walk`}},this.#e),this.#o=L({start:{soundId:`${n==="headOverHeels"?"head":e.item.type}Jump`}},this.#t),this.#r=L({loop:{soundId:`${n==="headOverHeels"?"head":e.item.type}Fall`}},this.#t)}output=x.createGain();#e=x.createGain();#n;#t=x.createGain();#o;#r;#a=x.createGain();#i=L({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#a);#s=x.createGain();#c=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#l={teleportingPhase:null,positionZ:0};tick(){const{renderContext:{item:e}}=this,{state:{action:n,teleporting:o,jumpStartZ:r,jumped:i,standingOnItemId:s,position:{z:l},vels:{gravity:{z:a}}}}=e,c=Ke(e),{teleportingPhase:u,positionZ:d}=this.#l,f=o?o.phase:null,h=i&&l>r&&l>d&&a>0,m=l<d&&a<0&&s===null;if(this.#r(m),this.#o(h),this.#n(!h&&!m&&n==="moving"),c!==void 0&&this.#c(c.carrying!==null),this.#i(s!==null),f!==null&&f!==u)if(f==="in"){const y=an().teleportIn,T=x.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}else{const y=an().teleportOut,T=x.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}this.#l={teleportingPhase:f,positionZ:l}}destroy(){}}class Ec{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=rt(e);!o&&r&&R({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Uc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class $c{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=rt(e);n&&!o&&R({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Nc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?wn(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&R({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Gc{constructor(e){this.renderContext=e}output=x.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(ct(e)&&at(e.state.stoodOnBy,n).some(U))}destroy(){}}class Vc{constructor(e){this.renderContext=e,R({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}const Xc={lift:Lc,switch:Nc,bubbles:Ac,head:tn,heels:tn,headOverHeels:tn,teleporter:Gc,monster:Rc,conveyor:Mc,spring:$c,portableBlock:Ec,charles:Dc,ball:Fc,pushableBlock:Uc,firedDoughnut:Vc},Hc=t=>{const e=Xc[t.item.type];if(e)return new e(t)},jc=B.h*As,qc=B.h*-1,Wc=B.w*16,Jc=0,nn=(t,e,n)=>(t-e)/(n-e)*2-1;class Yc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Gt(Vn({x:0,y:o})),this.positionMaxX=Gt(Vn({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=E(o.position,A(n.aabb,.5)),i=nn(Gt(r),this.positionMaxX,this.positionMinX),s=nn(r.z,qc,jc),l=nn(r.x+r.y,Jc,Wc);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=l}destroy(){this.childRenderer.destroy()}}const Zc=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Kc=t=>t.item.shadowMask!==void 0,Qc=t=>{const e=w.getState(),n=Ds(e),o=Ms(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",l=[];if(t.item.renders){const d=_c[r.type],f=new tc(t,d);l.push(f),s&&(f.output.alpha=.66),o&&Kc(t)&&l.push(new sc(t))}s&&l.push(new oc(t));let a;if(l.length===0)a=void 0;else{const d=l.length===1?l[0]:new eu(l,t);Zc(r,d.output,i),a=new rc(t,d)}const c=t.paused?void 0:Hc(t),u=c===void 0?void 0:new Yc(t,c);return new Pc(t,{graphics:a,sound:u})};class eu{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Ie=.33,tu=zs()==="mobile"?-4:16,vn=qe.h-qe.w/2,nu=me.heels,ou=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=zt(t.roomJson),l=o+i.x,a=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-tu-i.y-Math.abs(c/2)},d=u.x+l<0,f=u.x+a>n.x,h=u.y+s-vn<0;return(m,y,T)=>{if(m===void 0)return;const P=S(m.state.position),F=E(P,u),D={x:d&&F.x<n.x*Ie?Math.min(-l,n.x*Ie-P.x):f&&F.x>n.x*(1-Ie)?Math.max(n.x-a,n.x*(1-Ie)-P.x):u.x,y:h&&F.y<n.y*Ie?n.y*Ie-P.y:u.y};if(T)e.x=D.x,e.y=D.y;else{const G=nu*y,M=it(e,D),V=Yo(M);if(V>G){const $t={x:M.x/V,y:M.y/V};e.x-=$t.x*G,e.y-=$t.y*G}else e.x=D.x,e.y=D.y}}},ru=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=zt(t);return new q().rect(e+o.x,r-vn,n-e,o.y-r+vn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class iu{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=w.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??sr.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(ru(e.room.roomJson)),this.#s=ou(e.room,this.#t,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=x.createGain();output={sound:this.#o,graphics:this.#t};#r=!1;#a=new Map;#i=new Map;#s;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Sa:be:new $(Pn(n).main.original)}#c(e){const{room:n}=this.renderContext;for(const o of ce(n.items)){let r=this.#i.get(o.id);if(r===void 0){r=Qc({...this.renderContext,item:o}),this.#i.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:l}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),l&&l.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#i.entries())n.items[o]===void 0&&(r.destroy(),this.#i.delete(o))}#l(e){const{order:n}=di(ec(this.renderContext.room.items,e.movedItems,this.#a),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#i.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(ce(this.renderContext.room.items))};this.#s(Re(this.renderContext.gameState),n.deltaMS,!this.#r),this.#c(n),(!this.#r||n.movedItems.size>0)&&this.#l(n),this.#r=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#i.forEach(e=>{e.destroy()})}}var Et=`in vec2 aPosition;
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
`,Ut=`struct GlobalFilterUniforms {
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
}`,su=`precision highp float;
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
`,au=`struct CRTUniforms {
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
}`,lu=Object.defineProperty,cu=(t,e,n)=>e in t?lu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Bt=(t,e,n)=>(cu(t,typeof e!="symbol"?e+"":e,n),n);const mi=class gi extends Y{constructor(e){e={...gi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:au,entryPoint:"mainFragment"}}),o=N.from({vertex:Et,fragment:su,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Bt(this,"uniforms"),Bt(this,"seed"),Bt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Bt(mi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let uu=mi;var du=`
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
}`,fu=`struct KawaseBlurUniforms {
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
}`,hu=`
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
`,pu=`struct KawaseBlurUniforms {
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
}`,mu=Object.defineProperty,gu=(t,e,n)=>e in t?mu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>(gu(t,typeof e!="symbol"?e+"":e,n),n);const bi=class vi extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ze("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...vi.DEFAULT_OPTIONS,...n};const o=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:n?.clamp?pu:fu,entryPoint:"mainFragment"}}),r=N.from({vertex:Et,fragment:n?.clamp?hu:du,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),de(this,"uniforms"),de(this,"_pixelSize",{x:0,y:0}),de(this,"_clamp"),de(this,"_kernels",[]),de(this,"_blur"),de(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let l;if(this._quality===1||this._blur===0)l=this._kernels[0]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,n,o,r);else{const a=_e.getSameSizeTexture(n);let c=n,u=a,d;const f=this._quality-1;for(let h=0;h<f;h++)l=this._kernels[h]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;l=this._kernels[f]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,o,r),_e.returnTexture(a)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};de(bi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let bu=bi;var vu=`in vec2 vTextureCoord;
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
`,yu=`struct AdvancedBloomUniforms {
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
`,xu=`
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
`,wu=`struct ExtractBrightnessUniforms {
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
`,Cu=Object.defineProperty,Su=(t,e,n)=>e in t?Cu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,yi=(t,e,n)=>(Su(t,typeof e!="symbol"?e+"":e,n),n);const xi=class wi extends Y{constructor(e){e={...wi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:wu,entryPoint:"mainFragment"}}),o=N.from({vertex:Et,fragment:xu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),yi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};yi(xi,"DEFAULT_OPTIONS",{threshold:.5});let Tu=xi;var ku=Object.defineProperty,Iu=(t,e,n)=>e in t?ku(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Be=(t,e,n)=>(Iu(t,typeof e!="symbol"?e+"":e,n),n);const Ci=class Si extends Y{constructor(e){e={...Si.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:yu,entryPoint:"mainFragment"}}),o=N.from({vertex:Et,fragment:vu,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:he.WHITE}}),Be(this,"uniforms"),Be(this,"bloomScale",1),Be(this,"brightness",1),Be(this,"_extractFilter"),Be(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Tu({threshold:e.threshold}),this._blurFilter=new bu({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=_e.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=_e.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),_e.returnTexture(s),_e.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Be(Ci,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Ou=Ci;const Eo=({crtFilter:t},e)=>[t?new uu({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Ou({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Bu{constructor(e,n){this.app=e,this.#i=e,this.#s=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#a.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,Qe(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(o){this.#c(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#a=x.createGain();#i;#s;#c(e){console.error(e),w.dispatch(Ls(Rs(e,"message","stack")))}#l(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=Eo(e,!0),this.#n=Eo(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#c(n)}};tick=({deltaMS:e})=>{const n=w.getState(),o=Es(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=w.getState(),s=Qe(this.#s),l=!o&&!(r?.uncolourised??sr.displaySettings.uncolourised),a=Us(n),c=$s(n);(this.#t?.renderContext.colourise!==l||this.#t?.renderContext.onScreenControls!==a||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new yl({colourise:l,gameState:this.#s,inputDirectionMode:c,onScreenControls:a}),this.#i.stage.addChild(this.#t.output)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const u=o?ir:ql(this.#s,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),s?(this.#o=new iu({gameState:this.#s,room:s,paused:o,pixiRenderer:this.#i.renderer,displaySettings:r,colourised:l,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#a),this.#s.events.emit("roomChange",s.id)):this.#o=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#l()),this.#o?.tick({progression:this.#s.progression,movedItems:u,deltaMS:e}),o?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#n};start(){return this.#i.ticker.add(this.tickAndCatch),this}stop(){this.#i.stage.removeChild(this.#r),this.#a.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#i.ticker.remove(this.tickAndCatch)}}At.add(dr,fr,hr,pr,mr,gr,br,vr,yr,xr,wr,Sr,Cr,Tr,kr,Ir,Or,Br,_r,Pr,Fr);Gs.defaultOptions.scaleMode="nearest";const Uo=async(t,e)=>{const n=new Ur;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const o=w.getState().gameMenus.currentGame,r=Xn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(Ns(o.store.gameMenus)):(w.dispatch(Hn(r.characterRooms.head.id)),w.dispatch(Hn(r.characterRooms.heels.id)));const i=new Bu(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const l=Re(r);l!==void 0&&Tn({playableItem:l,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return Qe(r)},get gameState(){return r},reincarnateFrom(s){Xn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Mu=Object.freeze(Object.defineProperty({__proto__:null,default:Uo,gameMain:Uo},Symbol.toStringTag,{value:"Module"}));export{zr as A,Ar as C,Y as F,Bn as R,ra as S,Lr as V,ca as a,Mu as g,oa as u};
