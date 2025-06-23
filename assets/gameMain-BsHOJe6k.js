const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-DQAANPZT.js","assets/App-R6zCqoSX.js","assets/index-D4-LHlbt.js","assets/index-XGCAIna0.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-BbOIrzJW.js","assets/Graphics-DCJC-sXp.js","assets/changeCharacterRoom-DbbCVIwa.js","assets/WebGLRenderer-cLaS2v37.js"])))=>i.map(i=>d[i]);
import{b8 as Cs,b9 as ko,ba as Ts,an as ks,ar as Oe,as as U,af as Io,ao as oe,_ as T,a3 as qt,a1 as Is,a4 as v,d as je,v as ft,aH as y,a7 as Tn,az as be,$ as lt,a0 as Ps,ah as Os,bb as Ee,V as Po,bc as _s,a2 as kn,bd as Bs,be as Rs,ae as As,bf as W,bg as lr,S as w,bh as Fs,bi as se,bj as te,bk as En,f as Xe,bl as qe,O as C,o as Y,j as P,bm as Ms,bn as Ds,bo as zs,m as R,E as We,bp as Ls,bq as $n,br as Oo,bs as _o,bt as Bo,bu as Es,bv as Lt,P as J,bw as Un,bx as x,by as ue,bz as bt,p as Wt,bA as Et,bB as $s,bC as Us,bD as Ns,bE as cr,bF as Gs,bG as Vs,bH as Ro,n as ae,b as Yt,l as Jt,bI as de,bJ as _e,bK as vt,bL as ve,bM as yt,bN as Nn,q as G,bO as ye,bP as H,i as xt,bQ as Gn,B as Ao,bR as Vn,bS as He,bT as Fo,bU as ct,bV as Hn,bW as Hs,bX as js,b3 as ge,bY as Xs,bZ as qs,Q as pt,b_ as $t,k as Mo,r as F,b$ as xe,c0 as jn,c1 as Ws,c2 as Do,c3 as zo,c4 as Lo,c5 as Zt,c6 as ur,c7 as Eo,c8 as Ys,C as Ye,c9 as Be,ca as Ht,x as Re,cb as Js,cc as Zs,cd as Qs,ce as Ks,cf as $o,I as Je,cg as ea,ch as ta,ci as na,cj as In,ck as ra,cl as oa,cm as Ct,cn as ia,co as sa,cp as aa,t as Ae,cq as Uo,K as No,cr as dr,cs as Go,ct as Xn,y as Vo,g as Ho,w as la,b4 as Ze,cu as cn,cv as Tt,cw as ca,cx as ua,cy as nt,cz as hr,cA as da,cB as ha,cC as fa,cD as pa,cE as jo,cF as ma,cG as ga,cH as ba,cI as va,cJ as ya,cK as xa,cL as wa,cM as Sa,cN as fr,T as pr,A as Xo,cO as qo,b7 as Wo,M as Yo,N as Ca,J as mr,cP as Ta,cQ as ka,cR as Ia,cS as Pa,D as fe,cT as Oa,cU as S,cV as Pn,cW as wt,cX as un,R as gr,cY as _a,cZ as Ba,c_ as Ra,aT as Aa,ax as $e,c$ as Fa,d0 as Ma,d1 as Da,d2 as za,d3 as La,d4 as Ea,d5 as $a,d6 as Ua,d7 as Na,d8 as Ga,d9 as br,da as Va,U as vr,db as Ha}from"./App-R6zCqoSX.js";import{f as On,c as qn,m as Qt,a as Wn,b as Jo,r as ja,o as Xa}from"./changeCharacterRoom-DbbCVIwa.js";import{S as qa,G as ie}from"./Graphics-DCJC-sXp.js";import{g as Zo,_ as yr}from"./index-D4-LHlbt.js";var kt={},xr;function Wa(){if(xr)return kt;xr=1;var t=Cs(),e=t.mark(i),n=ko(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,h,f=arguments;return t.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){b.next=8;break}return h=d[u],b.delegateYield(o(h),"t0",5);case 5:u++,b.next=2;break;case 8:case"end":return b.stop()}},e)}kt.__concat=i;var s=r(i);return kt.concat=s,kt}var It={},wr;function Ya(){if(wr)return It;wr=1;var t=ko(),e=t.iterableCurry,n=Ts(),r=n.__firstOr,o=Symbol("none");function i(a){return r(a,o)===o}It.__isEmpty=i;var s=e(i,{reduces:!0});return It.isEmpty=s,It}var dn,Sr;function Ja(){return Sr||(Sr=1,dn=Wa().concat),dn}var Za=Ja();const Cr=Zo(Za);var hn,Tr;function Qa(){return Tr||(Tr=1,hn=Ya().isEmpty),hn}var Ka=Qa();const el=Zo(Ka),Qo=class _n extends ks{constructor(e){e={..._n.defaultOptions,...e},super(e),this.enabled=!0,this._state=qa.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=Oe.from(n)),r&&(s=U.from(r)),new _n({gpuProgram:i,glProgram:s,...o})}};Qo.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let j=Qo;var tl=`
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
`,nl=`in vec2 aPosition;
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
`,rl=`
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
}`;class O extends j{constructor(e){const n=e.gpu,r=kr({source:rl,...n}),o=Oe.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=kr({source:tl,...i}),a=U.from({vertex:nl,fragment:s}),l=new Io({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:oe.EMPTY}})}}function kr(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const Yn=`
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
    `,Jn=`
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
	`;class Ko extends O{constructor(){super({gl:{functions:`
                ${Yn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Jn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Ko.extension={name:"color",type:T.BlendMode};class ei extends O{constructor(){super({gl:{functions:`
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
            `}})}}ei.extension={name:"color-burn",type:T.BlendMode};class ti extends O{constructor(){super({gl:{functions:`
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
                `}})}}ti.extension={name:"color-dodge",type:T.BlendMode};class ni extends O{constructor(){super({gl:{functions:`
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
                `}})}}ni.extension={name:"darken",type:T.BlendMode};class ri extends O{constructor(){super({gl:{functions:`
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
            `}})}}ri.extension={name:"difference",type:T.BlendMode};class oi extends O{constructor(){super({gl:{functions:`
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
            `}})}}oi.extension={name:"divide",type:T.BlendMode};class ii extends O{constructor(){super({gl:{functions:`
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
            `}})}}ii.extension={name:"exclusion",type:T.BlendMode};class si extends O{constructor(){super({gl:{functions:`
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
                `}})}}si.extension={name:"hard-light",type:T.BlendMode};class ai extends O{constructor(){super({gl:{functions:`
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
            `}})}}ai.extension={name:"hard-mix",type:T.BlendMode};class li extends O{constructor(){super({gl:{functions:`
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
            `}})}}li.extension={name:"lighten",type:T.BlendMode};class ci extends O{constructor(){super({gl:{functions:`
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
                `}})}}ci.extension={name:"linear-burn",type:T.BlendMode};class ui extends O{constructor(){super({gl:{functions:`
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
            `}})}}ui.extension={name:"linear-dodge",type:T.BlendMode};class di extends O{constructor(){super({gl:{functions:`
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
            `}})}}di.extension={name:"linear-light",type:T.BlendMode};class hi extends O{constructor(){super({gl:{functions:`
                ${Yn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Jn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}hi.extension={name:"luminosity",type:T.BlendMode};class fi extends O{constructor(){super({gl:{functions:`
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
            `}})}}fi.extension={name:"negation",type:T.BlendMode};class pi extends O{constructor(){super({gl:{functions:`
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
                `}})}}pi.extension={name:"overlay",type:T.BlendMode};class mi extends O{constructor(){super({gl:{functions:`
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
                `}})}}mi.extension={name:"pin-light",type:T.BlendMode};class gi extends O{constructor(){super({gl:{functions:`
                ${Yn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Jn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}gi.extension={name:"saturation",type:T.BlendMode};class bi extends O{constructor(){super({gl:{functions:`
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
                `}})}}bi.extension={name:"soft-light",type:T.BlendMode};class vi extends O{constructor(){super({gl:{functions:`
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
                `}})}}vi.extension={name:"subtract",type:T.BlendMode};class yi extends O{constructor(){super({gl:{functions:`
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
                `}})}}yi.extension={name:"vivid-light",type:T.BlendMode};const Bn=[];qt.handleByNamedList(T.Environment,Bn);async function ol(t){if(!t)for(let e=0;e<Bn.length;e++){const n=Bn[e];if(n.value.test()){await n.value.load();return}}}let rt;function il(){if(typeof rt=="boolean")return rt;try{rt=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{rt=!1}return rt}var xi=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(xi||{});class sl{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,h=u.length;d<h;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const al=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],wi=class Si extends Is{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...al,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await ol(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Si.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof v&&(r={container:r},n&&(je(ft,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:y.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=xi.ALL);const{clear:r,clearColor:o,target:i}=e;y.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new sl(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!il())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};wi.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Ci=wi,Pt;function ll(t){return Pt!==void 0||(Pt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Ci.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Tn.get().getWebGLRenderingContext())return!1;let r=Tn.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),Pt}let Ot;async function cl(t={}){return Ot!==void 0||(Ot=await(async()=>{const e=Tn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),Ot}const Ir=["webgl","webgpu","canvas"];async function ul(t){let e=[];t.preference?(e.push(t.preference),Ir.forEach(i=>{i!==t.preference&&e.push(i)})):e=Ir.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await cl()){const{WebGPURenderer:a}=await yr(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-DQAANPZT.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&ll(t.failIfMajorPerformanceCaveat??Ci.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await yr(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-cLaS2v37.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Ti="8.8.1";class ki{static init(){globalThis.__PIXI_APP_INIT__?.(this,Ti)}static destroy(){}}ki.extension=T.Application;class dl{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Ti)}destroy(){this._renderer=null}}dl.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"initHook",priority:-10};const Ii=class Rn{constructor(...e){this.stage=new v,e[0]!==void 0&&je(ft,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await ul(e),Rn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return je(ft,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Rn._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Ii._plugins=[];let Pi=Ii;qt.handleByList(T.Application,Pi._plugins);qt.add(ki);var hl=`in vec2 aPosition;
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
`,fl=`
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
}`;const Oi=class _i extends j{constructor(e){e={..._i.defaultOptions,...e};const n=Oe.from({vertex:{source:Pr,entryPoint:"mainVertex"},fragment:{source:Pr,entryPoint:"mainFragment"}}),r=U.from({vertex:hl,fragment:fl,name:"alpha-filter"}),{alpha:o,...i}=e,s=new Io({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Oi.defaultOptions={alpha:1};let pl=Oi;class mt extends be{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=n,[f]=u;super({...h,texture:f instanceof oe?f:f.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(lt.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(lt.shared.add(this.update,this,Ps.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(oe.from(e[r]));return new mt(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(oe.from(e[r]));return new mt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof oe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(lt.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(lt.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ml{constructor({matrix:e,observer:n}={}){this.dirty=!0,this._matrix=e??new Os,this.observer=n,this.position=new Ee(this,0,0),this.scale=new Ee(this,1,1),this.pivot=new Ee(this,0,0),this.skew=new Ee(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const Bi=class Ut extends Po{constructor(...e){let n=e[0]||{};n instanceof oe&&(n={texture:n}),e.length>1&&(je(ft,"use new TilingSprite({ texture, width:100, height:100 }) instead"),n.width=e[1],n.height=e[2]),n={...Ut.defaultOptions,...n};const{texture:r,anchor:o,tilePosition:i,tileScale:s,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=n??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new Ee({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=r,this._width=l??r.width,this._height=c??r.height,this._tileTransform=new ml({observer:{_onUpdate:()=>this.onViewUpdate()}}),o&&(this.anchor=o),this.tilePosition=i,this.tileScale=s,this.tileRotation=a,this.roundPixels=d??!1}static from(e,n={}){return typeof e=="string"?new Ut({texture:_s.get(e),...n}):new Ut({texture:e,...n})}get uvRespectAnchor(){return kn("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){kn("uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=oe.EMPTY);const n=this._texture;n!==e&&(n&&n.dynamic&&n.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,n){typeof e=="object"&&(n=e.height??e.width,e=e.width),this._width=e,this._height=n??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,n=this._anchor,r=this._width,o=this._height;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*o,e.maxY=e.minY+o}containsPoint(e){const n=this._width,r=this._height,o=-n*this._anchor._x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this._anchor._y,e.y>=i&&e.y<=i+r)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const r=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(r)}this._texture=null}};Bi.defaultOptions={texture:oe.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let gl=Bi;class bl extends Po{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new Ee({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function vl(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(je(ft,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class yl extends bl{constructor(...e){const n=vl(e,"Text");super(n,Bs),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=Rs.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class Zn extends oe{static create(e){return new Zn({source:new As(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}const Ri=class Ai extends v{constructor(e={}){e={...Ai.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let n=0;n<e.length;n++){const r=e[n];if(r.parentRenderLayer){if(r.parentRenderLayer===this)continue;r.parentRenderLayer.detach(r)}this.renderLayerChildren.push(r),r.parentRenderLayer=this;const o=this.renderGroup||this.parentRenderGroup;o&&(o.structureDidChange=!0)}return e[0]}detach(...e){for(let n=0;n<e.length;n++){const r=e[n],o=this.renderLayerChildren.indexOf(r);o!==-1&&this.renderLayerChildren.splice(o,1),r.parentRenderLayer=null;const i=this.renderGroup||this.parentRenderGroup;i&&(i.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let n=0;n<e.length;n++)e[n].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,n,r){const o=this.renderLayerChildren,i=o.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let s=0;s<i;s++)o[s].parent||kn("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",o[s]),o[s].collectRenderables(e,n,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,n,r){if(!e)return;const o=this.renderLayerChildren;for(let i=0;i<o.length;i++)o[i]._getGlobalBoundsRecursive(!0,n,this)}};Ri.defaultOptions={sortableChildren:!1,sortFunction:(t,e)=>t.zIndex-e.zIndex};let xl=Ri;const wl=xl,p={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},Ie=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:r/2})},X={original:new y(W.zxWhite),basic:p.white,dimmed:p.lightGrey},q={original:new y(W.zxYellow),basic:p.midRed,dimmed:p.redShadow},Q={original:new y(W.zxMagenta),basic:p.pink,dimmed:Ie(p.pink)},B={original:new y(W.zxCyan),basic:p.pastelBlue,dimmed:Ie(p.pastelBlue)},K={original:new y(W.zxGreen),basic:p.moss,dimmed:Ie(p.moss)},Qn={white:{basic:{main:X,edges:{towards:B,right:q},hud:{lives:q,dimmed:Q,icons:B}},dimmed:{main:X,edges:{towards:K,right:B},hud:{lives:q,dimmed:Q,icons:B}}},yellow:{basic:{main:q,edges:{towards:K,right:X},hud:{lives:B,dimmed:Q,icons:K}},dimmed:{main:q,edges:{towards:B,right:B},hud:{lives:B,dimmed:Q,icons:K}}},magenta:{basic:{main:Q,edges:{towards:K,right:B},hud:{lives:X,dimmed:B,icons:q}},dimmed:{main:Q,edges:{towards:K,right:B},hud:{lives:X,dimmed:B,icons:q}}},cyan:{basic:{main:B,edges:{towards:Q,right:X},hud:{lives:X,dimmed:K,icons:q}},dimmed:{main:B,edges:{towards:Q,right:X},hud:{lives:X,dimmed:K,icons:q}}},green:{basic:{main:K,edges:{towards:B,right:q},hud:{lives:X,dimmed:Q,icons:B}},dimmed:{main:K,edges:{towards:B,right:q},hud:{lives:X,dimmed:Q,icons:B}}}},Kn=t=>Qn[t.hue][t.shade],Ue={head:p.pastelBlue,heels:p.pink},Nt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+lr>n?100-Math.ceil((n-e)/(lr/100)):0},Fi=t=>t.type==="headOverHeels"?Nt(t.state.head)>0||Nt(t.state.heels)>0:Nt(t.state)>0,er=t=>{const e=100*w.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/w.w):0},Sl={pureBlack:new y("#000000"),shadow:new y("#1B2D3B"),midGrey:new y("#505A55"),lightGrey:new y("#929981"),white:new y("#F8FEF8"),pastelBlue:new y("#4893FF"),metallicBlue:new y("#1D4E80"),pink:new y("#B973AF"),moss:new y("#6E7B00"),redShadow:new y("#513D40"),midRed:new y("#A7574B"),lightBeige:new y("#BF8E69"),highlightBeige:new y("#DBB269"),alpha:new y("#105A69"),replaceLight:new y("#048662"),replaceDark:new y("#052229")},Qe=`in vec2 aPosition;
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
`,Cl=`in vec2 vTextureCoord;
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
`;class le extends j{constructor(e){const n=Object.keys(e).length,r=U.from({vertex:Qe,fragment:Cl.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{p[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Tl=`precision mediump float;
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
`;class E extends j{uniforms;constructor(e="white"){const n=U.from({vertex:Qe,fragment:Tl,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const kl=`precision mediump float;
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
`;class Il extends j{constructor(){const e=U.from({vertex:Qe,fragment:kl,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Mi=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Di=t=>Mi(Qn[t.color.hue][t.color.shade].main),zi=t=>new le({lightBeige:p.lightGrey,redShadow:p.shadow,pink:p.lightGrey,moss:p.lightGrey,midRed:p.midGrey,highlightBeige:p.lightGrey,...t&&Di(t)}),Pl=new le({midGrey:p.midRed,lightGrey:p.lightBeige,white:p.highlightBeige,metallicBlue:p.redShadow,pink:p.midRed,moss:p.midRed,replaceDark:p.midRed,replaceLight:p.lightBeige}),Ol=t=>new le({replaceLight:t,replaceDark:Ie(t)}),Li=(t,e,n)=>n?new le(Mi(Qn[t.color.hue][t.color.shade].edges[e])):new E(Kn(t.color).edges[e].original),he=t=>new le(Di(t)),_l=t=>{switch(t.color.hue){case"white":return new le({replaceLight:p.lightGrey,replaceDark:p.midGrey});default:return he(t)}},Ei=t=>{switch(t.color.hue){case"white":return new le({replaceLight:p.lightBeige,replaceDark:p.midRed,shadow:p.redShadow});default:return he(t)}},Or=new Il,V=Fs,Bl=new le(Sl),_r={x:.5,y:1},Br=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),An=t=>{if(typeof t=="string")return An({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(Br(t)?c=Rl(t):c=new be(se().textures[t.textureId]),t.hasOwnProperty("times")){const u={x:1,y:1,z:1,...a},d=new v({label:l??"timesXyz"});for(let{x:h}=u;h>=1;h--)for(let{y:f}=u;f>=1;f--)for(let g=1;g<=u.z;g++){const b={...t,textureId:t.textureId??t.textureIdCallback?.(h-1,f-1,g-1),label:`(${h},${f},${g})`};delete b.times;const k=An(b),A=te({x:h-1,y:f-1,z:g-1});k.x+=A.x,k.y+=+A.y,d.addChild(k)}return d}if(e===void 0&&r===void 0)if(Br(t))c.anchor=_r;else{const u=se().data.frames[t.textureId];if(u===void 0)throw new Error(`no spritesheet entry for textureId "${t.textureId}"`);const d=u.frame;d.pivot!==void 0?c.pivot=d.pivot:c.anchor=_r}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}},m=An;function Rl({animationId:t,reverse:e,playOnce:n,paused:r,randomiseStartFrame:o}){const i=se().animations[t],a=(r?[i[0]]:i).map(c=>({texture:c,time:En}));e&&a.reverse();const l=new mt(a);return l.animationSpeed=Xe.animations[t].animationSpeed,l.gotoAndPlay(o?Math.floor(Math.random()*a.length):0),n!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),n==="and-destroy"&&(l.visible=!1)}),l}const Al=`#version 300 es

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
`;class Pe extends j{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=U.from({vertex:Qe,fragment:Al,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ne=new Pe({outlineColor:p.pureBlack,upscale:qe(C.getState()),lowRes:!0}),ut=new E,Rr=new E,tr=new E,Ar=new E(p.moss),dt=new E,ee=[ut,ne],Fl=[dt,ne],Ml=[ne,tr],_t={original:[ne,dt],colourised:{head:{active:[ne,new E(Ue.head)],inactive:[ne,new E(Ie(Ue.head))]},heels:{active:[ne,new E(Ue.heels)],inactive:[ne,new E(Ie(Ue.heels))]}}},Fe=14,Dl=2,zl=Math.cos(30*(Math.PI/180)),Ll=40;class El{constructor(e){this.renderContext=e;const{inputDirectionMode:n,general:{colourised:r}}=e;this.arrowSprites={away:m({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Fe,y:-14,filter:ee}),right:m({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Fe,y:Fe,filter:ee}),towards:m({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Fe,filter:ee}),left:m({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:ee}),...n!=="4-way"?{awayRight:m({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Fe*Math.SQRT2,filter:ee}),towardsRight:m({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Fe*Math.SQRT2,filter:ee}),towardsLeft:m({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:ee}),awayLeft:m({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:ee})}:{}},this.output.addChild(this.#e),this.output.addChild(new ie().circle(0,0,Ll).fill("#00000000"));for(const o of Y(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=r?V:ut}output=new v({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=m({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=P};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Ms(C.getState()),{x:r,y:o}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=Ds({x:-c,y:-u}),h=zs(d,zl),f=R(h,Dl);this.renderContext.inputStateTracker.hudInputState.directionVector=f};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(C.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const r=We(e)>Ls?$n(e):void 0;for(const[o,i]of Oo(this.arrowSprites))i.filters=o===r?Fl:ee}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const Fn={colourised:{jump:p.pastelBlue,fire:p.highlightBeige,carry:p.moss,carryAndJump:p.midRed,menu:p.lightGrey,map:p.lightGrey},zx:{jump:W.zxBlue,fire:W.zxYellow,carry:W.zxGreen,carryAndJump:W.zxRed,menu:W.zxWhite,map:W.zxWhite}};function Kt(t,e){const n=e||new v;for(const r of t)n.addChild(r);return n}function*$l(t){const e=typeof t=="string"?t==="infinite"?"":t:t.toString(),n=_o(e);let r=0;for(const o of e){const i=`hud.char.${Es(o)}`;try{Bo(i)}catch(s){throw new Error(`no texture id for char "${o}": ${s.message}`,{cause:s})}yield m({textureId:i,x:(r+.5-n/2)*Lt.w}),r++}}const re=(t,e)=>{t.removeChildren();try{Kt($l(e),t)}catch(n){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(n),window.invalid=e,new Error(`could not show text "${e}" in container because: "${n.message}"`,{cause:n})}return t},Ne=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new v({label:n,filters:e?Ml:tr,scale:{x:1,y:t?2:1}}),jt=Symbol(),$i=Symbol(),Ui=Symbol(),Bt=({colourised:t,button:{which:e}})=>{const n=new v({label:"depress"}),r=new v({label:"arcadeButton"});r.addChild(n);const o=m("button");t?o.filters=Ol(Fn.colourised[e]):r.filters=new E(Fn.zx[e]),n.addChild(o);const i=new v({label:"surface"}),s=m({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),r[$i]=o,r[jt]=i,r[Ui]=n,r},ot=(t,...e)=>{t[jt].removeChildren();for(const n of e)n!==void 0&&t[jt].addChild(n)},Rt=(t,e)=>{t[$i].texture=se().textures[e?"button.pressed":"button"],t[Ui].y=e?1:0},Fr=(t,e,n)=>{n&&(t[jt].filters=e?zi():V)},Mr=({which:t},e,n)=>{const r=re(new v,n);return r.filters=new le({white:e?Ie(Fn.colourised[t]):p.pureBlack}),r};class Ni{constructor(e,n){this.renderContext=e,this.appearance=n,this.output=new v({label:"AppearanceRenderer"})}#e;output;destroy(){this.output.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});n!=="no-update"&&(this.output.children.at(0)!==n.output&&(this.#e?.output&&this.output.removeChild(this.#e.output),n.output!==void 0&&this.output.addChild(n.output)),this.#e=n)}}const Ul=(t,e,n)=>{const o=se().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&se().textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},Gi=(t,e)=>{const n=e.getLocalBounds(),r=Zn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new be({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},en=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=m({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof be?o:Gi(t,o)},pe=t=>D(({renderContext:{item:e}})=>Un(e)?m({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):m(t)),N=t=>D(({renderContext:{item:e,general:{pixiRenderer:n}}})=>{if(Un(e))return en(n,t,e.config.times);{const r=m(t);return r instanceof be?r:Gi(n,r)}}),D=t=>({renderContext:e,currentRendering:n,tickContext:r})=>n===void 0?{output:t({renderContext:e,currentRendering:void 0,tickContext:r}),renderProps:J}:"no-update",Se=t=>({renderContext:{general:{pixiRenderer:e},item:n},currentRendering:r})=>{if(r===void 0){const o=Un(n)?n.config.times:void 0,i={output:en(e,t(n.config),o),renderProps:J};return o&&(i.output.y-=((o.z??1)-1)*w.h),i}else return"no-update"};function*Nl({config:{direction:t,inHiddenWall:e,height:n}},r){const o=bt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=m({textureId:`generic.door.floatingThreshold.${o}`,...Et(a,{y:-12*n})});l.filters=Li(r,o==="x"?"towards":"right",!0),yield l}}else{yield m({pivot:{x:i,y:9},textureId:`generic.door.legs.base.${o}`,...Et(a,{})});for(let l=1;l<n;l++)yield m({pivot:{x:i,y:9},textureId:`generic.door.legs.pillar.${o}`,...Et(a,{y:-l*w.h})})}}yield*s(te({...ue,[o]:1})),yield*s(ue),e||(yield m({pivot:{x:16,y:w.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...te({...ue,[o]:1})}))}const Vi=(t,e)=>{const n=bt(t),r=Wt(n),o=8;return t==="towards"||t==="right"?x({[r]:e[r]-o}):ue},Gl=D(({renderContext:{item:t,room:e}})=>Kt(Nl(t,e),new v({filters:he(e),...Vi(t.config.direction,t.aabb)}))),Vl=D(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:r},room:o,general:{gameState:i}}})=>{const s=bt(t),a=i===void 0?o:i.campaign.rooms[n];return m({textureId:Ul(o,s,e),filter:he(a),...Vi(t,r)})}),fn={animationId:"bubbles.cold"},Ge=({top:t,bottom:e="headlessBase",filter:n})=>{const r=new v({filters:n}),o=m(e);r.addChild(o);const i=m(t);return i.y=-12,r.addChild(i),r[tn]=i,r[nr]=o,r},tn=Symbol(),nr=Symbol(),Hl=({top:t,bottom:e})=>{const n=new v;return n.addChild(e),t.y=-12,n.addChild(t),n[tn]=t,n[nr]=e,n},jl=`#version 300 es

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
`;class Xt extends j{constructor(e){const n=U.from({vertex:Qe,fragment:jl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const ht=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<$s},nn=t=>t,Mn=.02,Xl=({name:t,action:e,facingXy8:n,teleportingPhase:r,gravityZ:o,paused:i})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:i};if(r==="out")return{animationId:`${t}.fadeOut`,paused:i};if(r==="in")return{animationId:`${t}.fadeOut`,paused:i};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:i};if(e==="jumping")return{textureId:o<Mn?`${t}.walking.${n}.2`:`${t}.walking.${n}.1`};if(e==="falling"){const a=`${t}.falling.${n}`;if(Vs(a))return{textureId:a}}const s=`${t}.idle.${n}`;return Ro(s)?{animationId:s,paused:i}:{textureId:`${t}.walking.${n}.2`}},Dn=Symbol(),zn=Symbol(),ql=(t,e)=>{t[Dn].removeChildren(),t[Dn].addChild(m(Xl(e)))},Hi=new le({pastelBlue:p.pink}),pn=(t,e,n)=>{const r=new v,o=new v;r[Dn]=o,r.addChild(o);const i=m({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?Hi:V,flipX:t==="heels"});return r[zn]=i,r},Dr=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+Ns>t,Wl=t=>{if(!ht(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%cr<cr*Gs},zr=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e].flat():t.filters=e},Lr=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?V:[...t.filters]},Yl=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?zr(o,new Pe({outlineColor:Ue[t],upscale:qe(C.getState()),lowRes:!1})):!e&&i&&Lr(o,Pe);const s=r?.flashing??!1;n&&!s?zr(o,new Xt(Ue[t])):!n&&s&&Lr(o,Xt)},Jl=(t,e,n)=>{e&&!n?t.addChild(t[zn]):!e&&n&&t.removeChild(t[zn])},mn=(t,e,n,r,o,i)=>{n&&ql(e,{name:t,...r,paused:o}),Yl(t,r,i,e),Jl(e,r.shining,i?.shining??!1)},Zl=({renderContext:{item:t,general:{gameState:e,paused:n}},currentRendering:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a,vels:{gravity:{z:l}}}}=t,c=r?.renderProps,u=r?.output,d=$n(s)??"towards",h=e!==void 0&&(t.type==="headOverHeels"?Dr(t.state.head,"headOverHeels","headOverHeels"):Dr(t.state,t.type,e.currentCharacterName)),f=Wl(t),g=Fi(t),b=We(s),k=a?.phase??null,A={action:i,facingXy8:d,teleportingPhase:k,flashing:f,highlighted:h,shining:g,gravityZ:l},I=c===void 0||c.action!==i||c.facingXy8!==d||c.teleportingPhase!==k||c?.gravityZ>Mn!=l>Mn;let M;if(o==="headOverHeels"){M=u??Hl({top:pn("head",!0,n),bottom:pn("heels",!0,n)});const _=M;mn("head",_[tn],I,A,n,c),mn("heels",_[nr],I,A,n,c)}else M=u??pn(o,!1,n),mn(o,M,I,A,n,c);return i==="moving"&&u instanceof mt&&(u.animationSpeed=b*Us),{output:M,renderProps:A}},gn=nn(Zl),Er=t=>t-Math.floor(t),Ql=({state:{position:t}},e)=>{const n=o=>o.config.direction==="away"||o.config.direction==="left";return Kt(ae(e.items).filter(o=>o.type==="wall"||o.type==="doorLegs").filter(n).map(o=>{const{id:i,config:{direction:s},state:{position:a}}=o;return m({textureId:"floorOverdraw.cornerNearWall",label:i,...x(Jt(a,t)),times:o.type==="wall"?o.config.times:{[Wt(Yt(s))]:2},anchor:{x:0,y:1},flipX:s==="away"})}),new v({label:"floorOverdraws"}))},Kl=`#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uColour;

void main(void) {
    finalColor = texture(uTexture, vTextureCoord);
}
`;class ec extends j{constructor(){const e=U.from({vertex:Qe,fragment:Kl,name:"null-filter"});super({glProgram:e,resources:{}})}}const $r=({colourised:t,direction:e,room:n,times:r,position:o})=>m({label:`floorEdge(${e})`,textureId:`floorEdge.${e}`,...x(o),times:r,filter:Li(n,e,t)}),tc=D(({renderContext:{room:t,item:e,general:{colourised:n},uncolourisedLayer:r}})=>{const{color:{shade:o}}=t,{config:i,state:{position:s},aabb:a}=e,{floorType:l,naturalFootprint:c}=i,u=new v({label:"floorAppearance"}),d=x({...a,y:0}),h=x({...a,x:0,y:0}),f=x({...a,x:0}),g=x(a);if(l!=="none"){const b=new v({label:"tiles"}),k=l==="deadly"?`generic${o==="dimmed"?".dark":""}.floor.deadly`:`${i.scenery}${o==="dimmed"?".dark":""}.floor`,A=se().textures[k];try{Bo(k)}catch(Ss){throw new Error(`no floor textureId for floorType: ${l}, shade: ${o}`,{cause:Ss})}const I=de(c.position,s),M={x:Er(I.x/w.w),y:Er(I.y/w.w)},_=8,Z={x:d.x,y:g.y-_,width:f.x-d.x,height:h.y-g.y+2*_},et=de(te(Et(M,{x:.5,y:.5})),{y:a.z},Z),sr=new gl({texture:A,tilePosition:et,...Z});b.addChild(sr),b.addChild(Ql(e,t));const we=new ie().moveTo(g.x,g.y).lineTo(f.x,f.y).lineTo(f.x,f.y+3).lineTo(h.x,h.y+3).lineTo(d.x,d.y+3).lineTo(d.x,d.y).fill({color:16711680,alpha:.5});b.addChild(we),b.mask=we,b.filters=[_l(t)];const ln=new v({children:[b]});ln.filters=new Pe({outlineColor:p.pureBlack,upscale:1,lowRes:!1});const tt=new v({children:[ln]}),ar=new ec;ar.enabled=!1,tt.filters=ar,tt.cacheAsTexture(!0),u.addChild(tt),u.addChild(m({textureId:"blank",x:f.x,y:h.y+8}))}{const b=new v({label:"edges"});l==="none"&&b.addChild(new ie().moveTo(f.x,f.y+8).lineTo(f.x,f.y+100).lineTo(d.x,d.y+100).lineTo(d.x,d.y+8).lineTo(h.x,h.y+8).fill(0)),i.skipRightEdge||b.addChild($r({colourised:n,direction:"right",room:t,times:{y:Math.ceil(a.y/w.w)},position:{z:a.z}})),i.skipTowardsEdge||b.addChild($r({colourised:n,direction:"towards",room:t,times:{x:Math.ceil(a.x/w.w)},position:{z:a.z}})),b.cacheAsTexture(!0),r.attach(b),u.addChild(b)}return u}),nc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],rc=t=>{let e=2166136261;const n=t.length;for(let r=Math.max(0,n-9);r<n;r++)e^=t.charCodeAt(r),e=Math.imul(e,1540483477),e^=e>>>15;return(e>>>0)/4294967295},oc=200,ic=1,sc=(t,e)=>{const n=rc(e);return Math.sin((t+n*2e4)/oc)*ic},Ur=({id:t,config:{which:e},state:n},r,o)=>{if((e==="cyberman"||e==="bubbleRobot")&&n.activated){const i=o;i[tn].y=-12+sc(r.roomTime,t)}},ac=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:r})=>{const{config:o,state:i}=t,s=r?.renderProps,{activated:a,busyLickingDoughnutsOffFace:l}=i,c=l?Pl:a?void 0:nc.includes(o.which)?zi(e):void 0;switch(o.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const u=vt(i.facing)??"towards";if(!(s===void 0||a!==s.activated||l!==s.busyLickingDoughnutsOffFace||u!==s.facingXy4))return Ur(t,e,r.output),"no-update";const h={facingXy4:u,activated:a,busyLickingDoughnutsOffFace:l};switch(o.which){case"skiHead":return{output:m({textureId:`${o.which}.${o.style}.${u}`,filter:c}),renderProps:h};case"elephantHead":return{output:m({textureId:`elephant.${u}`,filter:c}),renderProps:h};case"turtle":return{output:m(a&&!l?{animationId:`${o.which}.${u}`,filter:c,paused:n}:{textureId:`${o.which}.${u}.1`,filter:c}),renderProps:h};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ge({top:{textureId:`${o.which}.${u}`,filter:c||he(e)},bottom:{...fn,paused:n}}):m({textureId:`${o.which}.${u}`,filter:c}),renderProps:h};case"computerBot":case"elephant":case"monkey":return{output:Ge({top:`${o.which}.${u}`,bottom:{animationId:"headlessBase.flash",playOnce:"and-stop"},filter:c}),renderProps:h};default:throw new Error(`unexpected monster ${o}`)}break}case"homingBot":{const u=!_e(i.vels.walking,ue);return s===void 0||l!==s.busyLickingDoughnutsOffFace||a!==s.activated||u!==s.walking?{filter:c,output:m({animationId:u?"headlessBase.flash":"headlessBase.scan",filter:c}),renderProps:{activated:a,busyLickingDoughnutsOffFace:l,walking:u}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(s===void 0||l!==s.busyLickingDoughnutsOffFace||a!==s.activated))return Ur(t,e,r.output),"no-update";const d={activated:a,busyLickingDoughnutsOffFace:l};switch(o.which){case"helicopterBug":case"dalek":return{output:m(a&&!l?{animationId:o.which,filter:c,paused:n}:{textureId:`${o.which}.1`,filter:c}),renderProps:d};case"bubbleRobot":return{output:Ge({top:{...fn,paused:n},filter:c}),renderProps:d};case"emperorsGuardian":return{output:Ge({top:"ball",bottom:{...fn,paused:n},filter:c}),renderProps:d};case"emperor":return{output:m({animationId:"bubbles.cold",filter:c,paused:n}),renderProps:d};default:throw new Error(`unexpected monster ${o}`)}break}default:throw new Error(`unexpected monster ${o}`)}},lc=ve.floatingText,cc=12,Nr=w.h*3,Gr=[p.shadow,p.midGrey,p.redShadow,p.metallicBlue,p.midRed,p.moss,p.pink,p.lightBeige,p.pastelBlue,p.lightGrey,p.highlightBeige],Vr=[...Gr,...new Array(20).fill(p.white),...Gr.toReversed()],uc=({renderContext:{item:{config:{textLines:t,appearanceRoomTime:e}},room:{roomTime:n},general:{displaySettings:{uncolourised:r}}},currentRendering:o})=>{const i=o?.output;let s;const l=(n-e)*lc;if(i===void 0){s=new v({filters:new Pe({outlineColor:p.pureBlack,upscale:qe(C.getState()),lowRes:!1})});for(let c=0;c<t.length;c++){const u=t[c],d=re(new v({label:u,y:c*cc,filters:r?V:new E(p.pink)}),u.toUpperCase());s.addChild(d)}}else s=i;for(let c=0;c<t.length;c++){const u=s.children[c],[d]=u.filters,h=l+c*-12,f=h>0&&h<Nr;if(u.visible=f,f&&d){const g=Math.floor(h/Nr*Vr.length);d.targetColor=Vr[g]}}return s.y=-l,{output:s,renderProps:J}},St=t=>{for(const e in t)return!0;return!1},Hr=500,dc=Xe.animations["conveyor.x"].animationSpeed,jr=Xe.animations["conveyor.x"].length,hc=t=>1-(1-t)**2,fc=(t,e)=>{for(let n=0;n<t.children.length;n++){const r=t.children[n],o=n%jr;r.gotoAndStop(e?jr-o-1:o)}return t},pc=({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},room:{roomTime:r},general:{editor:o}},currentRendering:i})=>{const s=i?.renderProps,a=St(n)||o,l=(!a&&s?.moving?r:s?.roomTimeStoppedMoving)??yt,c=Yt(t),u=i?.output??fc(m({animationId:`conveyor.${c}`,reverse:t==="towards"||t==="right",times:e}),t==="towards"||t==="right"),d=a?0:Math.min(r-l,Hr),h=Math.max(0,1-d/Hr);for(const f of u.children)if(h===0)f.stop();else{const g=dc*hc(h);f.play(),f.animationSpeed=g}return{output:u,renderProps:{moving:a,roomTimeStoppedMoving:l}}},mc=nn(pc),$={movementType:"steady"},Ke=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Nn(C.getState(),t),gc=(t,e,n,r)=>{const{state:{teleporting:o,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&G("teleporter")(l)&&Ke(l);if(o===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:On}}}:$;const u=Math.max(o.timeRemaining-r,0);switch(o.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return qn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:o.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:On}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...o,timeRemaining:u}}}},bc=({renderContext:{item:t,room:e,general:{paused:n}},currentRendering:r})=>{const{state:{stoodOnBy:o},config:{times:i}}=t,s=r?.renderProps,a=Ke(t),l=a&&ye(o,e).some(H);return s===void 0||a!==s.activated||l!==s.flashing?{output:l?new v({children:[m({textureId:"teleporter",times:i}),m({animationId:"teleporter.flashing",times:i,paused:n})]}):m({textureId:a?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:a}}:"no-update"},vc=({renderContext:{item:{state:{facing:t,actedOnAt:{roomTime:e,by:n}}},room:{roomTime:r,items:o}},currentRendering:i})=>{const s=i?.renderProps,a=vt(t)??"towards",l=r===e&&xt(Gn(n)).some(u=>Ao(o[u]));return s===void 0||a!==s.facingXy4||l!==s.controlledByJoystick?{output:Ge({top:`charles.${a}`,bottom:l?"headlessBase.all":"headlessBase"}),renderProps:{facingXy4:a,controlledByJoystick:l}}:"no-update"},yc=({renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:e}},general:{paused:n}},tickContext:{lastRenderRoomTime:r},currentRendering:o})=>{const i=o?.renderProps,s=St(t);let a;return o?.output?a=o?.output:(a=m({animationId:"spring.bounce"}),a.loop=!1,a.gotoAndStop(0)),r!==void 0&&e>r&&!s&&!n?a.gotoAndPlay(0):s&&!(i?.compressed??!1)&&a.gotoAndStop(1),{output:a,renderProps:{compressed:s}}},xc=nn(yc),wc=({renderContext:{item:{config:{which:t,startDirection:e}}},currentRendering:n})=>n?.renderProps===void 0?{output:t==="headOverHeels"?Ge({top:{textureId:`head.walking.${e}.2`},bottom:{textureId:`heels.walking.${e}.2`}}):m({textureId:`${t}.walking.${e}.2`}),renderProps:J}:"no-update",Sc=({renderContext:{item:{state:{vels:{sliding:t}},config:{startingPhase:e}},general:{paused:n}},tickContext:{deltaMS:r},currentRendering:o})=>{const s=(o?.renderProps?.distanceTravelled??0)+Vn(t)*(n?0:r),l=o?.output??m("spikyBall.1"),u=(Math.floor(s*2/He.w)+e)%2+1;return l.texture=se().textures[`spikyBall.${u}`],{output:l,renderProps:{distanceTravelled:s}}},Cc=nn(Sc),Tc=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,kc=D(({renderContext:{item:{id:t,config:e},room:n}})=>{if(e.direction==="right"||e.direction==="towards")throw new Error(`wall is near: ${t}`);const{direction:r,tiles:o}=e,i=Wt(Yt(r)),s=new v({label:"wallTiles"});for(let a=0;a<e.tiles.length;a++){let l=m({textureId:Tc(n.planet,o[a],r,n.color.shade==="dimmed"),y:1,pivot:r==="away"?{x:He.w,y:He.h+1}:{x:0,y:He.h+1}});const c=te({[i]:a});if(n.planet==="moonbase"){const u=`moonbase.wall.screen.${o[a]}.away`;Ro(u)&&(l=new v({children:[l]}),l.addChild(m({animationId:u,randomiseStartFrame:!0,flipX:r==="left",x:r==="away"?-8:8,y:-23})))}l.x+=c.x,l.y+=c.y,s.addChild(l),s.filters=he(n)}return s}),Ic=({renderContext:{item:{state:{setting:t},config:e}},currentRendering:n})=>{const r=n?.renderProps,o=e.type==="in-store"?Nn(C.getState(),e.path)?"right":"left":t;return r===void 0||o!==r.setting?{output:m(`switch.${o}`),renderProps:{setting:o}}:"no-update"},Pc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Oc=({renderContext:{item:{config:{style:t,times:e},state:{disappearing:n}},room:r},currentRendering:o})=>{const i=o?.renderProps,s=n!==null;return i===void 0||i.isDissapearing!==s?{output:m({textureId:Pc(r.color.shade==="dimmed",t,s),filter:t==="organic"?he(r):t==="book"?Ei(r):void 0,times:e}),renderProps:{isDissapearing:s}}:"no-update"},_c=({state:{stoodOnBy:t,position:e},config:{times:n}},r)=>{const o=new Array(n?.x??1).fill(null).map(()=>new Array(n?.y??1));return ye(t,r).filter(Fo).forEach(({id:i,state:{position:s}})=>{const a=de(s,e),l={x:Math.floor(a.x/w.w),y:Math.floor(a.y/w.d)};l.x<0||l.x>=(n?.x??1)||l.y<0||l.y>=(n?.y??1)||(o[l.x][l.y]=i)}),o},Bc=(t,e)=>{let n=0,r=1;for(const o of e)for(const i of o)i!==void 0&&t.items[i]?.state.activated&&(n|=r),r<<=1;return n},Rc=({renderContext:{item:t,room:e},currentRendering:n})=>{const{config:{times:r}}=t,o=n===void 0?_c(t,e):n.renderProps.chargePositions,i=Bc(e,o);return i!==n?.renderProps.cybermanActivationBitmask?{output:m({textureIdCallback(a,l){const c=o[a][l];return c===void 0||e.items[c]?.state.everActivated?"toaster.off":"toaster.on"},times:r??J}),renderProps:{chargePositions:o,cybermanActivationBitmask:i}}:"no-update"},Ac={head:gn,heels:gn,headOverHeels:gn,doorFrame:Vl,doorLegs:Gl,monster:ac,floatingText:uc,barrier:D(({renderContext:{item:{config:{axis:t,times:e}}}})=>m({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({renderContext:{item:{config:t},room:e}})=>{switch(t.style){case"volcano":return m({animationId:"volcano",filter:he(e),times:t.times,randomiseStartFrame:!0});case"toaster":throw new Error("use the special toaster appearance instead");default:throw t.style,new Error("unknown deadly block style")}}),spikes:pe("spikes"),slidingDeadly:Cc,slidingBlock:D(({renderContext:{item:{config:{style:t}},room:e}})=>m(t==="book"?{textureId:"book.y",filter:Ei(e)}:t)),block:Oc,switch:Ic,conveyor:mc,lift:D(({renderContext:{general:{paused:t}}})=>{const e=new v,n={x:ct.w/2,y:ct.h};return e.addChild(m({animationId:"lift",pivot:n,paused:t})),e.addChild(m({textureId:"lift.static",pivot:n})),e}),teleporter:bc,sceneryCrown:D(({renderContext:{item:{config:{planet:t}}}})=>m({textureId:`crown.${t}`})),pickup:D(({renderContext:{item:{config:t},room:e,general:{paused:n,editor:r}}})=>{if(t.gives==="crown")return m({textureId:`crown.${t.planet}`});const i={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:he(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives],s=m(i);if(r&&i==="whiteRabbit"){const a={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"},l=re(Ne({outline:!0}),a[t.gives]);return l.y=-16,new v({children:[s,l]})}else return s}),moveableDeadly:pe("fish.1"),charles:vc,joystick:pe("joystick"),movingPlatform:pe("sandwich"),pushableBlock:pe("stepStool"),portableBlock:D(({renderContext:{item:{config:{style:t}}}})=>m(t)),spring:xc,sceneryPlayer:wc,hushPuppy:pe("hushPuppy"),bubbles:D(({renderContext:{item:{config:{style:t}},general:{paused:e}}})=>m({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:pe({animationId:"bubbles.doughnut"}),ball:pe("ball"),floor:tc,particle:D(({renderContext:{item:{config:{forCharacter:t}}}})=>m({animationId:"particle.fade",anchor:{x:.5,y:.5},filter:t==="heels"?Hi:V}))},ji=t=>{if(t.type==="wall"){const{direction:e}=t.config;return e==="right"||e==="towards"?void 0:kc}return t.type==="deadlyBlock"&&t.config.style==="toaster"?Rc:Ac[t.type]},Xi=(t,e,n)=>{const r=ji(t);if(!n.room)return;const o=r({renderContext:{general:e.general,item:t,room:n.room,uncolourisedLayer:void 0},tickContext:{lastRenderRoomTime:yt,movedItems:Hn,progression:0,deltaMS:1}});if(o==="no-update")throw new Error("no-update not supported in carried sprite");return o.output};function qi({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Fi(e)||ht(e)||(e.state.action="death",e.state.expires=t+On))}const me=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,gt=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Fc=3e3,Wi=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:o}=t,{id:i,config:s}=r,{id:a,roomJson:{items:l},roomTime:c}=o,{pickupsCollected:u}=e;if(u[a]?.[i]===!0)return;const d=()=>{l[i]&&(u[a]===void 0&&(u[a]={}),u[a][i]=!0)},h=(f,g=o)=>{const b=Mo(r),k={type:"floatingText",id:`floatingText-${i}`,...Do,fixedZIndex:Ws,aabb:P,state:{...jn(),position:F(b,{z:w.h/2}),expires:c+Fc},config:{textLines:f,appearanceRoomTime:c}};xe({room:g,item:k})};switch(s.gives){case"hooter":{const f=$t(n);if(f===void 0)return;f.hasHooter=!0,h(["hooter","collected"]),d();break}case"doughnuts":{const f=$t(n);if(f===void 0)return;f.doughnuts=me(f.doughnuts,6),h(["+6","doughnuts"]),d();break}case"bag":{const f=pt(n);if(f===void 0)return;f.hasBag=!0,h(["bag","collected"]),d();break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime,h(["🛡","shield"]),d();break}case"fast":{const f=$t(n);if(f===void 0)return;f.fastStepsStartedAtDistance=f.gameWalkDistance,h(["⚡","fast steps"]),d();break}case"jumps":{const f=pt(n);if(f===void 0)return;f.bigJumps+=10,h(["♨","10","big jumps"]),d();break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=me(n.state.head.lives,2),n.state.heels.lives=me(n.state.heels.lives,2),h(["+2","lives","each"])):(n.state.lives=me(n.state.lives,2),h(["+2","lives"])),d();break;case"scroll":C.dispatch(qs(s.page)),d();break;case"reincarnation":{const f=js(e,C.getState(),i),g=ge(f.gameState);if(!g)throw new Error("how are we saving from a pickup if there is no current room?");h(["reincarnation","point","restored"],g),C.dispatch(Xs(f)),h(["reincarnation","point","saved"]),d();break}case"crown":{C.dispatch(Hs(s.planet)),h([s.planet,"liberated!"]),d();break}}},Mc=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;zo(i,r)<=0||e.state.action!=="death"&&qn({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},Dc=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=bt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=F(t.state.position,s)};function zc({movingItem:t}){t.state.autoWalk=!1}const ce=(t,...e)=>G(...e)(t.touchedItem),it=(t,...e)=>G(...e)(t.movingItem),Yi=t=>H(t.movingItem),Lc=t=>H(t.touchedItem),Ec=t=>Lo(t.touchedItem),Xr=t=>{switch(!0){case ce(t,"stopAutowalk"):zc(t);break;case Ec(t):qi(t);break;case ce(t,"portal"):Mc(t);break;case ce(t,"pickup"):Wi(t);break;case ce(t,"doorFrame"):Dc(t);break}},rn=(t,e)=>{const{head:n,heels:r,headOverHeels:o}=Zt(e.items);if(o!==void 0)return ht(o)?void 0:o;const i=n===void 0||ht(n)||n.state.action==="death"?void 0:ur(n.state.position,t),s=r===void 0||ht(r)||r.state.action==="death"?void 0:ur(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},rr=t=>t[Math.floor(Math.random()*t.length)],qr=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular-or-reverse":case"perpendicular":{const r=rr([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},Ji=150,ke=Object.freeze({movementType:"vel",vels:{walking:P}}),on=t=>Eo(t)?ve[t.config.which]:ve[t.type],Wr=w.w/2,$c=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ve.homingBot;if(!_e(e,ue))return{movementType:"steady"};for(const s of Y(Zt(n.items))){if(s===void 0)continue;const a=de(s.state.position,t);if(Math.abs(a.y)<Wr)return{movementType:"vel",vels:{walking:{x:a.x>0?i:-.05,y:0,z:0}}};if(Math.abs(a.x)<Wr)return{movementType:"vel",vels:{walking:{x:0,y:a.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Uc=(t,e,n,r)=>{const{state:{position:o,facing:i}}=t,s=rn(o,e);if(s===void 0)return $;const a=de(s?.state.position,o),l=Ht[vt(a)];return _e(l,i)?$:{movementType:"steady",stateDelta:{facing:l}}},Nc=(t,e,n,r)=>{const{state:{position:o,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ke;const l=rn(o,e);if(l===void 0||s+Ji>e.roomTime)return $;const c=de(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>w.w/4?u:Wt(u),h=on(t),f={...P,[d]:c[d]>0?h:-h},g=Be(f),b=!_e(g,a);return{movementType:"vel",vels:{walking:f},stateDelta:{facing:g,...b?{timeOfLastDirectionChange:e.roomTime}:J}}},Yr=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ke;const a=rn(i,e);if(a===void 0)return ke;const l=a.state.position,c=w.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ke;const d=de(a?.state.position,i),h=on(t),f=(1+Math.sqrt(2))/2,g=h*f,b=R({...d,z:0},g/Vn(d)*(o?-1:1));return{movementType:"vel",vels:{walking:b},stateDelta:{facing:Be(b)}}},bn=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ke;if(!(Re(i,P)||Math.random()<r/1e3))return $;const l=rr(o),c=Ht[l];return{movementType:"vel",vels:{walking:R(c,on(t))},stateDelta:{facing:Ht[l]}}},Gc=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ke:_e(i,ue)?{movementType:"vel",vels:{walking:R(o,on(t))}}:$},At=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a,facing:l},aabb:c}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Ji))return;const u=Qt(i,c,e,n);if(u.x===0&&u.y===0)return;const d=qr(s,u,o);t.state.vels.walking=d;const h=o==="perpendicular-or-reverse"&&Math.random()>.66?-1:1;t.state.facing=R(_e(d,ue)?qr(l,u,o):Be(d),h),t.state.durationOfTouch=0},Vc=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=P)},Hc=(t,e,n,r)=>{if(!t.state.activated||Eo(t)&&t.state.busyLickingDoughnutsOffFace)return ke;switch(t.config.movement){case"patrol-randomly-diagonal":return bn(t,e,n,r,Qs);case"patrol-randomly-xy8":return bn(t,e,n,r,Zs);case"patrol-randomly-xy4":case"patrol-randomly-xy4-and-reverse":return bn(t,e,n,r,Js);case"towards-tripped-on-axis-xy4":return $c(t,e);case"towards-on-shortest-axis-xy4":return Nc(t,e);case"back-forth":case"clockwise":return Gc(t);case"turn-to-player":return Uc(t,e);case"towards-analogue":return Yr(t,e);case"towards-analogue-unless-planet-crowns":return Yr(t,e,n,r,Ys(C.getState()));default:throw t.config,new Error("this should be unreachable")}},jc=t=>{const{movingItem:e,touchedItem:n}=t;if(Ye(n,e))switch(e.config.movement){case"patrol-randomly-xy4":At(t,"perpendicular");break;case"patrol-randomly-xy4-and-reverse":At(t,"perpendicular-or-reverse");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":At(t,"opposite");break;case"clockwise":At(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Vc(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"turn-to-player":return;default:throw e.config,new Error("this should be unreachable")}},Xc=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:r,state:{setting:o,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(r.type){case"in-room":{const s=t.state.setting=o==="left"?"right":"left";qc(r,s,n.items,n.roomTime);break}case"in-store":{C.dispatch(Ks(r.path));break}}},qc=(t,e,n,r)=>{for(const o of t.modifies)for(const[i,s]of $o(o.newState))if(Object.hasOwn(s,e))for(const a of o.targets){const l=n[a];if(l===void 0)continue;if(l.type!==o.expectType)throw new Error(`item "${l.id}" is of type "${l.type}" - does not match expected type "${o.expectType}" from switch config ${JSON.stringify(t,null,2)}`);const c=l;c.state={...l.state,[i]:s[e],switchedAtRoomTime:r,switchedSetting:e}}},Wc=({movingItem:t,touchedItem:e})=>{if(!Ye(t))return;const{state:{position:n},aabb:r}=e,o=Qt(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=Be(o),s=R(i,-.05);return e.state.vels.sliding=s,!1},Yc=({movingItem:t,touchedItem:e})=>{if(!Ye(e))return;const n=t.state.vels.sliding;if(Re(n,P))return;const{state:{position:r},aabb:o}=t,i=Qt(e.state.position,e.aabb,r,o);return zo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=P),!1},Jc=({movingItem:t,room:e,touchedItem:n,deltaMS:r,gameState:o},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Qt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=Be(c);for(const d of s){const h=e.items[d],f=R(u,-.025*r);h.state.facing=f,Wn({room:e,subjectItem:h,gameState:o,pusher:n,posDelta:f,deltaMS:r,onTouch:i})}},Zc=1e3/12,Ft=t=>{const e=t-ra,r=e/oa*En;return(e+.5*In*r**2)/r},Qc={head:Ft(Ct.head),headOnSpring:Ft(Ct.head+w.h),heels:Ft(Ct.heels),heelsOnSpring:Ft(Ct.heels+w.h)},Jr=(t,e,n)=>{const r=t.type==="headOverHeels"||t.type==="heels"&&n?"head":t.type;return Qc[`${r}${e?"OnSpring":""}`]},Kc=t=>!(t===null||ta(t)&&Ke(t)||na(t)&&t.config.gives==="scroll"||H(t)&&t.state.standingOnItemId===null),eu=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+Zc>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),Zi=(t,e,n)=>{const{state:{standingOnItemId:r}}=t,{inputStateTracker:o}=n,i=Je(r,e);if(eu(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:Jr(t,!1,t.type==="heels"&&t.state.isBigJump)}},stateDelta:{}};if(!(t.state.action!=="death"&&o.currentActionPress("jump")!=="released"&&Kc(i)))return r!==null?{movementType:"steady",stateDelta:{jumped:!1,...t.type==="heels"?{isBigJump:!1}:{}}}:$;const a=t.type==="heels"&&t.state.bigJumps>0,l=ea(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Jr(t,l,a)}},stateDelta:{action:"moving",jumped:!0,...t.type==="heels"?a?{bigJumps:t.state.bigJumps-1,isBigJump:!0}:{isBigJump:!1}:{},jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},tu=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=We(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return R(n,l)},nu={movementType:"vel",vels:{walking:P}},Qi=(t,e,n,r)=>{const o=ru(t,e,n,r);if(o.movementType==="vel"&&o.vels.walking!==void 0){const i=We(o.vels.walking);o.stateDelta={...o.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*r},t.type==="head"&&t.state.standingOnItemId!==null&&(o.stateDelta={...o.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*r})}return t.state.action==="idle"&&o.movementType==="vel"&&o.vels.walking!==void 0&&!Re(o.vels.walking,P)&&(o.stateDelta={...o.stateDelta,walkStartFacing:t.state.facing}),o},ru=(t,e,{inputStateTracker:n,currentCharacterName:r},o)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:h,vels:{walking:f,gravity:g}}}=t,b=r===t.id,k=b?n.currentActionPress("jump"):"released",A=b?n.directionVector:P,I=l===null&&g.z<0,M=i==="head"&&er(t.state)>0&&l!==null,_=i==="headOverHeels"?I?"head":"heels":M?"heels":i,Z=a?c:A,et=ve[_];if(u!==null||s==="death")return nu;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Jt(f,R(f,ia*o))},stateDelta:{action:I?"falling":"jumping"}}:{movementType:"vel",vels:{walking:P},stateDelta:{action:"falling"}};if(k!=="released"){const we=Be(_e(Z,ue)?c:Z),tt=G("spring")(Je(l,e))?1:sa;return{movementType:"vel",vels:{walking:R({...we,z:0},et*tt)},stateDelta:{facing:we}}}}if(We(Z)!==0)return I?{movementType:"vel",vels:{walking:R({...Z,z:0},et)},stateDelta:{facing:Z,action:"falling"}}:{movementType:"vel",vels:{walking:tu({vel:f,acc:aa[_],deltaMS:o,maxSpeed:et,unitD:Z,minSpeed:0})},stateDelta:{facing:Z,action:"moving"}};if(d>0&&d<1){const we=Re(h,c)?1:0;return{movementType:"position",posDelta:R(c,we-d),stateDelta:{action:I?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:P},stateDelta:{action:I?"falling":"idle"}}},Zr=t=>Ae(t.movingItem)&&Uo(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Ki=(t,e)=>{let n=P;for(const r of e){if(r.movementType==="position"&&(n=F(n,r.posDelta)),r.movementType==="vel"&&(Ae(t)||G("lift")(t)))for(const[i,s]of Oo(r.vels)){const a={...P,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},Qr=t=>{if(t.touchedItem.type==="firedDoughnut"&&(t.movingItem.type==="head"||t.movingItem.type==="firedDoughnut"))return;const{touchedItem:{state:{disappearing:e}}}=t;if(e!==null&&(e.byType===void 0||e.byType.includes(t.movingItem.type))&&(e.on==="touch"||e.on==="stand"&&Zr(t))){if(Zr(t)&&Yi(t)){No({above:t.movingItem,below:t.touchedItem});const r=[Zi(t.movingItem,t.room,t.gameState,t.deltaMS),Qi(t.movingItem,t.room,t.gameState,t.deltaMS)];Ki(t.movingItem,r)}Jo(t)}};function ou(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const or=t=>{Yi(t)&&Xr(t),Lc(t)&&Xr({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ce(t,...dr)&&Wc(t),it(t,...dr)&&Yc(t),(it(t,"monster")&&ce(t,"firedDoughnut")||it(t,"firedDoughnut")&&ce(t,"monster"))&&ou(t),(it(t,"monster")||it(t,"movingPlatform"))&&jc(t),ce(t,"switch")&&Xc(t),ce(t,"joystick")&&Jc(t,or),t.touchedItem.state.disappearing&&Qr(t),t.movingItem.state.disappearing&&Ye(t.touchedItem,t.movingItem)&&Qr({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},iu=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ae(e.items).filter(Xn),u=s===null?es(t,e):void 0;for(const f of c)f.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=o.currentActionPress("carry");if(d==="tap"||o.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;su(e,i,u),o.actionsHandled.add("carry")}else{if(t.state.standingOnItemId===null||!ts(t,Vo(e.items)))return;s.state.position=l,xe({room:e,item:s}),Wn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:s.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:or}),i.carrying=null,o.actionsHandled.add("carry")}},su=(t,e,n)=>{e.carrying=n,n.state.wouldPickUpNext=!1,Ho({room:t,item:n})},es=(t,e)=>Go(t,ae(e.items).filter(Xn)),ts=(t,e)=>{const n={position:F(t.state.position,{z:w.h})},r=la({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(Ye(o,t)){if(!Ae(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!ts(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0},vn=-11,au={jump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},tickContext:{room:r,currentPlayable:o},currentRendering:i}){const s=i?.renderProps,a=i?.output,l=o?.state.standingOnItemId??null,c=l===null||r===void 0?null:r.items[l],u=c===null?!1:c.type==="teleporter"&&Ke(c),d=t.actions.every(f=>e.currentActionPress(f)!=="released"),h=a===void 0?Bt({colourised:n,button:t}):a;if(s?.pressed!==d&&Rt(h,d),u!==s?.standingOnTeleporter)if(u)ot(h,m({textureId:"teleporter",y:5}),m({animationId:"teleporter.flashing",y:5}));else{const f=Mr(t,n,"JUMP");f.y=vn,ot(h,f)}return{output:h,renderProps:{pressed:d,standingOnTeleporter:u,colourised:n}}},carry({renderContext:t,currentRendering:e,tickContext:n}){const{button:r,inputStateTracker:o,general:{colourised:i}}=t,{currentPlayable:s,room:a}=n,l=e?.renderProps,c=e?.output,u=s&&pt(s),d=u?.hasBag??!1,h=u?.carrying??null,f=h===null&&a!==void 0&&es(s,a)!==void 0,g=r.actions.every(I=>o.currentActionPress(I)!=="released"),b=d&&!f&&h===null,k=c===void 0?Bt({colourised:i,button:r}):c;if(k.visible=d,d&&(b!==l?.disabled&&Fr(k,b,i),k.visible=!0,l?.pressed!==g&&Rt(k,g),d!==l?.hasBag||h!==l?.carrying)){let I;h!==null?I=Xi(h,t,n):d&&(I=m({textureId:"bag",y:-2})),ot(k,I)}return{output:k,renderProps:{pressed:g,hasBag:d,colourised:i,carrying:h,disabled:b}}},fire({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:r,tickContext:{currentPlayable:o}}){const i=r?.renderProps,s=r?.output,a=o&&$t(o),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=s===void 0?Bt({colourised:n,button:t}):s,h=l||gt(c)>0;if(d.visible=h,h&&(i?.pressed!==u&&Rt(d,u),l!==i?.hasHooter||c!==i?.doughnuts)){let f;l?f=m({textureId:"hooter",y:-3}):gt(c)>0&&(f=m({textureId:"doughnuts",y:-2}));const g=re(new v,c);g.y=vn,g.filters=ne,ot(d,f,g),Fr(d,c===0,n)}return{output:d,renderProps:{pressed:u,colourised:n,doughnuts:c,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,general:{colourised:n}},currentRendering:r,tickContext:{currentPlayable:o}}){const i=r?.renderProps,s=r?.output,l=(o&&pt(o))?.hasBag??!1,c=t.actions.every(h=>e.currentActionPress(h)!=="released");if(!(i===void 0||c!==i.pressed||n!==i.colourised||l!==i.hasBag))return"no-update";let d;if(s===void 0){d=Bt({colourised:n,button:t});const h=Mr(t,n,"C+J");h.y=vn,ot(d,h)}else d=s;return l?(d.visible=!0,i?.pressed!==c&&Rt(d,c)):d.visible=!1,{output:d,renderProps:{pressed:c,hasBag:l,colourised:n}}},menu({currentRendering:t}){if(t!==void 0)return"no-update";const e=m("hud.char.Menu");return e.scale=2,e.filters=ee,{output:e,renderProps:J}},map({currentRendering:t}){if(t!==void 0)return"no-update";const e=Ne({label:"mapText",outline:!0});return re(e,"MAP"),{output:e,renderProps:J}}};class Me extends Ni{constructor(e){const n=au[e.button.which];super(e,n)}}const lu=30,cu=15,uu=42,du=36,hu=44,fu=20;class pu{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:n}},inputDirectionMode:r,general:o}=e;this.#n={mainButtonNest:new v({label:"mainButtonNest"}),buttons:{jump:new Me({button:{which:"jump",actions:["jump"],id:"jump"},general:o,inputStateTracker:n}),fire:new Me({button:{which:"fire",actions:["fire"],id:"fire"},general:o,inputStateTracker:n}),carry:new Me({button:{which:"carry",actions:["carry"],id:"carry"},general:o,inputStateTracker:n}),carryAndJump:new Me({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:o,inputStateTracker:n}),menu:new Me({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:o,inputStateTracker:n}),map:new Me({button:{which:"map",actions:["map"],id:"map"},general:o,inputStateTracker:n})},joystick:new El({inputStateTracker:n,inputDirectionMode:r,general:o})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of Y(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=cu,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=lu,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new v({label:"OnScreenControls"});#n;#t(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const n of Y(this.#n.buttons)){const{renderContext:{button:{actions:r}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const o of r)e.hudInputState[o]=!0}),n.output.on("pointerup",()=>{for(const o of r)e.hudInputState[o]=!1}),n.output.on("pointerleave",()=>{for(const o of r)e.hudInputState[o]=!1})}}#r(e){this.#n.mainButtonNest.x=e.x-hu,this.#n.mainButtonNest.y=e.y-fu,this.#n.joystick.output.x=uu,this.#n.joystick.output.y=e.y-du,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{general:{gameState:r}}=this.renderContext;this.#r(n);for(const o of Y(this.#n.buttons))o.tick({...e,currentPlayable:Ze(r)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Xe.frames.button.frame;const mu=250,gu=t=>t?48:24,bu=t=>t?68:56,vu=(t,e)=>t?e.x/2-24:80,yu=t=>t?72:24,xu=t=>t?88:0,Kr=112,st=t=>t==="heels"?1:-1;class wu{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const r of cn)this.#e.addChild(this.#t[r].sprite),this.#e.addChild(this.#t[r].livesText),this.#e.addChild(this.#t[r].shield.container),this.#e.addChild(this.#t[r].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[Ar],this.#t.fps.y=Lt.h,this.#r(),n&&(this.#n=new pu({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#n.output))}#e=new v({label:"HudRenderer",isRenderGroup:!0});#n=void 0;#t={head:{sprite:this.#i("head"),livesText:Ne({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#o({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#o({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#o({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#o({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#i("heels"),livesText:Ne({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#o({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#o({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#o({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new v({label:"heelsCarrying"})}},fps:Ne({label:"fps",outline:!0})};#r(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const n of cn){const{sprite:r,livesText:o}=this.#t[n];for(const i of[r,o])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#o({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new v({label:i});s.pivot={x:4,y:16};const a=new be({texture:se().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Rr,y:n?0:8});s.addChild(a);const l=Ne({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=Lt.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=ne),{text:l,icon:a,container:s}}#i(e){const n=new be(se().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#s({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+st("head")*Kr,this.#t.head.doughnuts.container.y=e.y-ct.h-8,this.#t.heels.carrying.container.y=e.y-ct.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+st("heels")*Kr,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Lt.w*2}#a(e,n){return e?n?V:dt:n?Or:ut}#l(e){const{renderContext:{general:{gameState:n,colourised:r}}}=this,o=Tt(n,"heels"),i=o?.hasBag??!1,s=o?.carrying??null,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(s===null&&l)for(const c of a.children)c.destroy();if(s!==null&&!l){const c=Xi(s,this.renderContext,e);c!==void 0&&a.addChild(c)}a.filters=this.#a(!0,r),this.#t.heels.bag.icon.filters=this.#a(i,r)}#c(e){const{renderContext:{general:{gameState:n,colourised:r}}}=this,o=Tt(n,"head"),i=o?.hasHooter??!1,s=o?.doughnuts??0;this.#t.head.hooter.icon.filters=this.#a(i,r),this.#t.head.doughnuts.icon.filters=this.#a(s!==0,r),re(this.#t.head.doughnuts.text,s)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:r,general:{gameState:o}}}=this,i=Tt(o,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=Nt(i),d=u>0||!r;a.visible=d,d&&(re(s,u),a.y=n.y-xu(r)),c.x=a.x=(n.x>>1)+st(e)*vu(r,n);const h=i===void 0?0:e==="head"?er(i):i.bigJumps,f=h>0||!r;c.visible=f,f&&(re(l,h),c.y=n.y-yu(r))}#u(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:r,general:{gameState:o,colourised:i}}}=this,s=this.#u(o,e),a=this.#t[e].sprite;s?a.filters=i?V:dt:a.filters=i?Or:ut,a.x=(n.x>>1)+st(e)*bu(r),a.y=n.y-ct.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:r,general:{gameState:o}}}=this,s=Tt(o,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+st(e)*gu(r),a.y=n.y,re(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const r=Kn(n.color),{general:{colourised:o,gameState:i}}=this.renderContext;ut.targetColor=r.hud.dimmed[o?"dimmed":"original"],tr.targetColor=r.hud.dimmed[o?"basic":"original"],Rr.targetColor=r.hud.icons[o?"basic":"original"],dt.targetColor=r.hud.lives.original,this.#t.head.livesText.filters=o?_t.colourised.head[this.#u(i,"head")?"active":"inactive"]:_t.original,this.#t.heels.livesText.filters=o?_t.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:_t.original}#d=yt;#g(){if(ca(C.getState())){if(performance.now()>this.#d+mu){const e=lt.shared.FPS;re(this.#t.fps,Math.round(e)),Ar.targetColor=e>100?p.white:e>58?p.moss:e>55?p.pastelBlue:e>50?p.metallicBlue:e>40?p.pink:p.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of cn)this.#p(n,e),this.#f(n,e),this.#h(n,e);this.#s(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const eo={movementType:"vel",vels:{gravity:P}},Su=(t,e,n,r)=>{if(!Ye(t))return eo;const{type:o,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=ua[(o==="headOverHeels"?"head":o)==="head"?"head":"others"];if(s!==null){const c=Je(s,e);return G("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-In*r,-l)}}}:eo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-In*r,-l)}}}},to=w.h,no=.001,Cu=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=hr**2/(2*nt);if(n==="up"){if(e<=r)return Math.max(no,Math.sqrt(2*nt*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(no,Math.sqrt(2*nt*o))}else return hr}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*nt*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*nt*Math.max(e,0))):-.036},Tu=({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}})=>{const o=t*to,i=e*to,s=Cu({currentAltitude:r-o,direction:n,totalDistance:i-o});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=r<=o?"up":r>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}},ro={movementType:"vel",vels:{movingFloor:P}},ku=(t,e,n,r)=>{if(H(t)&&t.state.teleporting!==null)return ro;const{state:{standingOnItemId:o}}=t,i=Je(o,e);if(i===null||!G("conveyor")(i))return ro;const{config:{direction:s}}=i,l=G("heels")(t)&&t.state.action==="moving"&&vt(t.state.facing)===da(s)?ve.heels:ha;return{movementType:"vel",vels:{movingFloor:R(Ht[s],l)}}};function*Iu(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Pu=w.w*.8,Ou=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a}=i,{state:{position:l,facing:c}}=t,u=Be(c);if(o.currentActionPress("fire")==="tap"&&a&&gt(s)>0){const d={type:"firedDoughnut",...Do,config:J,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{...jn(),position:F(l,R(u,Pu),t.type==="headOverHeels"?{z:w.h}:P),vels:{fired:R(u,ve.firedDoughnut)},disappearing:{on:"touch"}}};xe({room:e,item:d}),i.doughnuts=me(i.doughnuts,-1),o.actionsHandled.add("fire")}},ns=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),_u=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),Mt=w.w*3,Bu=(t,e)=>{const{state:{position:n}}=t,{state:{position:r}}=e;return n.x>r.x-Mt&&n.x<r.x+Mt&&n.y>r.y-Mt&&n.y<r.y+Mt},oo=(t,e,n,r,o)=>{if(o&&t.state.activated)return $;const i=rn(t.state.position,e);return i===void 0?$:Bu(t,i)?ns:_u},Ru=(t,e,n,r)=>t.state.activated?$:ye(t.state.stoodOnBy,e).some(H)?ns:$,Au=(t,e,n,r)=>{switch(t.config.activated){case"after-player-near":return oo(t,e,n,r,!0);case"while-player-near":return oo(t,e,n,r,!1);case"on-stand":return Ru(t,e);case"off":case"on":return $;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Fu=(t,e,n,r)=>{const{id:o,state:{lastEmittedAtRoomTime:i,quantityEmitted:s,position:a},config:{emits:l,period:c,maximum:u}}=t,{roomTime:d}=e;if(s!==u&&i+c<d){const h=fa(pa(`${o}-${s}`,{...l,position:P},e.roomJson));if(h===void 0)throw new Error("emitter failed to create a new item");h.state.position=Jt(a,R(h.aabb,.5)),xe({room:e,item:h}),t.state.lastEmittedAtRoomTime=e.roomTime+c,t.state.quantityEmitted++}},io=En*Xe.animations["particle.fade"].length*(1/Xe.animations["particle.fade"].animationSpeed),Mu=20,Du=38,zu=.5,Dt=w.w/2;let Lu=0;const rs=(t,e)=>Math.random()<t*(e/1e3),os=(t,e,n,r)=>({id:`particle.${t}.${Lu++}`,type:"particle",aabb:P,config:{forCharacter:e},state:{...jn(),expires:r+io+Math.random()*io,position:n}}),is=(t,e,n,r)=>{if(!rs(n,r))return;const o={...F(Mo(t),{x:Math.random()*Dt-Dt/2,y:Math.random()*Dt-Dt/2}),z:t.state.position.z};xe({room:e,item:os(t.id,t.type,o,e.roomTime)})},Eu=(t,e,n)=>{!(er(t.state)>0)||t.state.standingOnItemId===null||We(t.state.vels.walking)<ma||is(t,e,Mu,n)},$u=(t,e,n)=>{const{isBigJump:r}=t.state;r&&t.state.standingOnItemId===null&&(t.state.vels.gravity.z<=0||is(t,e,Du,n))},Uu=(t,e)=>{const{head:n,heels:r}=Zt(t.items);n!==void 0&&Eu(n,t,e),r!==void 0&&$u(r,t,e)},Nu=(t,e,n)=>{if(!rs(zu,n))return;const r=rr(jo),o=F(e.state.position,{x:r==="x"?0:Math.random()*w.w,y:r==="y"?0:Math.random()*w.d,z:r==="z"?w.h:Math.random()*w.h});xe({room:t,item:os(e.id,"crown",o,t.roomTime)})};function*Gu(t,e,n,r){Ae(t)&&(yield Su(t,e,n,r),yield ku(t,e),yield*Iu(t,e)),H(t)?(yield Qi(t,e,n,r),t.id===n.currentCharacterName&&(yield gc(t,e,n,r),yield Zi(t,e,n),ba(t)&&iu(t,e,n,r),va(t)&&Ou(t,e,n))):ya(t)?yield Tu(t):xa(t)?(yield Au(t,e,n,r),yield Hc(t,e,n,r)):wa(t)&&Fu(t,e)}const Vu=(t,e,n,r)=>{if(!Ae(t)||t.state.standingOnItemId===null)return;const o=Je(t.state.standingOnItemId,e);H(t)&&o.type==="pickup"&&Wi({gameState:n,movingItem:t,touchedItem:o,room:e});const{state:{disappearing:i}}=o;i!==null&&(i.byType===void 0||i.byType.includes(t.type))&&Jo({touchedItem:o,gameState:n,room:e})},Hu=(t,e,n,r)=>{if(H(t)&&t.state.standingOnItemId!==null){const s=Je(t.state.standingOnItemId,e);(Lo(s)||s.type==="spikes")&&qi({room:e,movingItem:t})}const o=[...Gu(t,e,n,r)];Vu(t,e,n);let i=Ki(t,o);(Ae(t)||G("lift")(t)||G("firedDoughnut")(t))&&(i=F(i,...xt(Y(t.state.vels)).map(s=>R(s,r)))),ga(t)&&Nu(e,t,r),Wn({subjectItem:t,posDelta:i,gameState:n,room:e,deltaMS:r,onTouch:or})},ju=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=me(e.state.head.lives,-1),e.state.heels.lives=me(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,me(e.state.head.lives,e.state.heels.lives)===0)return;const o=gt(e.state.head.lives)>0,i=gt(e.state.heels.lives)>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,Te(t,e);const u=fr(e)[c],d=Ve({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:pr(u)};return}if(t.entryState.headOverHeels!==void 0){Te(t,e);const c=Ve({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=fr(e);if(Te(t,c),Te(t,u),Xo(c,u)){const d=qo({head:c,heels:u});Te(t,d,"heels");const h=Ve({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:h},t.entryState={headOverHeels:pr(d)};return}else{const d=Ve({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Ve=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Ca({roomJson:r.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??J,scrollsRead:C.getState().gameMenus.scrollsRead});for(const i of e)xe({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ja(o,t);return o},Te=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOnItemId:null}},Xu=(t,e)=>{const n=Wo(t,Yo(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0){delete t.characterRooms[e.id],n!==void 0&&(t.currentCharacterName=n.type);return}else{const r=t.characterRooms[e.type];Te(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=qo({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});Te(t,a);const l=Ve({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}xe({room:r,item:e});return}else{const s=Ve({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},qu=(t,e)=>{e.type==="headOverHeels"?ju(t,e):Xu(t,e),Ze(t)===void 0&&C.dispatch(Sa({offerReincarnation:!0}))},Wu=t=>{for(const e of ae(t.items))try{for(const n of ye(e.state.stoodOnBy,t)){if(!t.items[n.id]){mr(n,t);continue}if(!Uo(n,e)){mr(n,t);const r=Go(n,Vo(t.items));r!==void 0&&No({above:n,below:r})}}}catch(n){throw new Error(`could not update standing on for item "${e.id}"`,{cause:n})}},Yu=2*Xa,Ju=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Yu,positionDelta:n})},Zu=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Jt(r.state.position,o),z:0};if(!Re(s,P))for(const a of ye(r.state.stoodOnBy,e))Ju(a,e,s)}},Qu=(t,e)=>{for(const n of ae(t.items))!Ae(n)||t.roomTime===n.state.actedOnAt.roomTime||Ta(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=ka(n.state.position),e.add(n))},Ku=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ed=t=>{for(const e of ae(t.items)){const n=e.state.position;e.state.position=Ia(n)}},td=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},nd=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Ze(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Wo(t,Yo(r.type));i!==void 0&&(i.state.gameTime+=n)}}},rd=(t,e)=>{const n=ge(t);if(n===void 0)return Hn;nd(t,n,e);const r=Object.fromEntries(Pa(n.items).map(([s,a])=>[s,a.state.position]));for(const s of Y(n.items))Ku(s,n)&&(Ho({room:n,item:s}),H(s)&&qu(t,s));const o=Object.values(n.items).sort(td);for(const s of o){const a=Ze(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Hu(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${s.id}"`,{cause:l})}}Uu(n,e),Wu(n),ed(n);const i=new Set(xt(Y(n.items)).filter(s=>r[s.id]===void 0||!Re(s.state.position,r[s.id])));return Zu(i,n,r),Qu(n,i),i},so=(t,e)=>{const n=x(t),r=x(F(t,{x:e.x,z:e.z})),o=x(F(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},yn=1e-5,ao=-1,at=(t,e,n,r,o)=>r-o>t&&n<e-o,od=0,ss=1,as=2,ls=3,id=(t,e,n,r)=>{const o=so(t,e),i=so(n,r),s=o.topRight.y-o.topRight.x/2,a=o.bottomCentre.y-o.bottomCentre.x/2,l=i.topRight.y-i.topRight.x/2,c=i.bottomCentre.y-i.bottomCentre.x/2,u=o.topLeft.y+o.topLeft.x/2,d=o.bottomCentre.y+o.bottomCentre.x/2,h=i.topLeft.y+i.topLeft.x/2,f=i.bottomCentre.y+i.bottomCentre.x/2,g=o.topLeft.x,b=o.topRight.x,k=i.topLeft.x,A=i.topRight.x,I=at(s,a,l,c,yn),M=at(u,d,h,f,yn),_=at(g,b,k,A,yn);return I&&M&&_?ss:M&&_&&at(s,a,l,c,ao)?as:I&&_&&at(u,d,h,f,ao)?ls:od},sd=(t,e,n,r)=>{for(const o of jo){const i=t[o],s=i+e[o],a=n[o],l=a+r[o];if(s<=a)return 1*(o==="z"?-1:1);if(i>=l)return-1*(o==="z"?-1:1)}return lo(n)-lo(t)},ad=(t,e)=>{if(t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.renderAabb||t.aabb,r=e.renderAabb||e.aabb,o=t.renderAabbOffset?F(t.state.position,t.renderAabbOffset):t.state.position,i=e.renderAabbOffset?F(e.state.position,e.renderAabbOffset):e.state.position;switch(id(o,n,i,r)){case ss:return sd(o,n,i,r);case as:return fe(o.y,i.y+r.y)&&fe(o.z,i.z+r.z)?1:fe(i.y,o.y+n.y)&&fe(i.z,o.z+n.z)?-1:0;case ls:return fe(o.x,i.x+r.x)&&fe(o.z,i.z+r.z)?1:fe(i.x,o.x+n.x)&&fe(i.z,o.z+n.z)?-1:0;default:return 0}},lo=t=>t.x+t.y-t.z;class Gt extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const ld=t=>{const e=cd(t);let n=e.length,r=n;const o=new Array(n),i={},s=ud(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Gt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,h=Array.from(d);if(c=h.length){u.add(l);do{const f=h[--c];try{a(f,s.get(f),u)}catch(g){throw g instanceof Gt?g.hasClosedCycle?g:new Gt([l,...g.cyclicDependency],g.cyclicDependency.includes(l)):g}}while(c);u.delete(l)}o[--n]=l}};function cd(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function ud(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const co=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},zt=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},dd=(t,e=new Set(Y(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||zt(n,o,s);for(const o of e)if(o.fixedZIndex===void 0)for(const i of Y(t)){if(i.fixedZIndex!==void 0||r.get(i)?.has(o)||o===i)continue;const s=ad(o,i);if(co(r,o,i),s===0){zt(n,o.id,i.id),zt(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;co(n,a,l),zt(n,l,a)}return n},cs=(t,e,n=3)=>{try{return{order:ld(t),impossible:!1}}catch(r){if(r instanceof Gt){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:cs(t,e,n-1).order,impossible:!0}}else throw r}};class us extends Ni{}const uo=(t,e)=>{e.poly([x({}),x({x:t.x}),x({x:t.x,y:t.y}),x({y:t.y})]).poly([x({}),x({z:t.z}),x({y:t.y,z:t.z}),x({y:t.y})]).poly([x({x:t.x}),x({x:t.x,z:t.z}),x(t),x({x:t.x,y:t.y})]).poly([x({z:t.z}),x({x:t.x,z:t.z}),x({x:t.x,y:t.y,z:t.z}),x({y:t.y,z:t.z})])},ho=(t,e)=>{const n=new ie;return uo(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),uo(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},hd={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class fd{constructor(e){this.renderContext=e;const{item:n}=e,r=hd[n.type]??"rgba(255,255,255)";if(this.#e=new v({label:`ItemBoundingBoxRenderer ${n.id}`}),G("portal")(n)){const i=x(n.config.relativePoint);this.#e.addChild(new ie().circle(i.x,i.y,5).stroke(r)),this.#e.addChild(new ie().circle(i.x,i.y,2).fill(r))}if(this.#e.addChild(new ie({label:"objectOrigin"}).circle(0,0,2).fill(r)),this.#e.addChild(ho(n.aabb,r)),n.renderAabb){const i="rgba(184, 184, 255)",s=ho(n.renderAabb,i);if(n.renderAabbOffset){const a=x(n.renderAabbOffset);s.position.set(a.x,a.y),s.circle(0,0,2).fill(i)}this.#e.addChild(s)}this.#e.eventMode="static";let o;this.#e.on("pointerenter",()=>{if(o!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(o=new yl({text:i,style:{fill:r,fontSize:6,fontFamily:"Menlo"}})),o.resolution=4}),this.#e.on("pointerleave",()=>{o!==void 0&&(this.#e.removeChild(o),o=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class pd{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new v({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=x(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const md=({renderContext:{general:{pixiRenderer:t},item:e,room:n},currentRendering:r})=>{const{state:{stoodOnBy:o},config:{times:i}}=e,s=r?.renderProps,a=Ke(e),l=a&&ye(o,n).find(H)!==void 0;return s===void 0||a!==s.activated||l!==s.flashing?{output:en(t,{textureId:l?"shadowMask.teleporter.flashing":a?"shadowMask.teleporter":"shadowMask.fullBlock"},i),renderProps:{flashing:l,activated:a}}:"no-update"},xn=(t,e=1)=>({renderContext:{item:{state:{facing:n}}},currentRendering:r})=>{const o=r?.renderProps,i=vt(n)??"towards";if(!(o===void 0||i!==o.facingXy4))return"no-update";const a=m(i==="left"||i==="away"?`shadowMask.${t}.away`:`shadowMask.${t}.right`);return a.y=-(w.h*(e-1)),a.scale.x=i==="away"||i==="right"?1:-1,{output:a,renderProps:{facingXy4:i}}},fo={lift:N("shadowMask.smallBlock"),conveyor:Se(({direction:t})=>({textureId:"shadowMask.conveyor",flipX:Yt(t)==="x"})),teleporter:md,floor:"no-mask",barrier:Se(({axis:t})=>({textureId:"shadowMask.barrier.y",flipX:t==="x"})),spring:N("shadowMask.smallRound"),block:Se(({style:t})=>t==="tower"?"shadowMask.tower":"shadowMask.fullBlock"),pushableBlock:N("shadowMask.stepStool"),movingPlatform:N("shadowMask.fullBlock"),hushPuppy:N("shadowMask.hushPuppy"),portableBlock:Se(({style:t})=>t==="drum"?"shadowMask.smallRound":"shadowMask.smallBlock"),slidingBlock:Se(({style:t})=>t==="book"?"shadowMask.fullBlock":"shadowMask.smallRound"),deadlyBlock:Se(({style:t})=>t==="volcano"?"shadowMask.volcano":"shadowMask.toaster"),spikes:N("shadowMask.spikes"),switch:N("shadowMask.switch"),pickup:Se(({gives:t})=>{switch(t){case"scroll":return"shadowMask.scroll";case"doughnuts":return"shadowMask.doughnuts";case"fast":case"extra-life":case"jumps":case"shield":return"shadowMask.whiteRabbit";default:return"blank"}}),slidingDeadly:N("shadowMask.smallRound"),ball:N("shadowMask.ball"),"monster.dalek":N("shadowMask.dalek"),"monster.turtle":xn("turtle"),"monster.skiHead":xn("skiHead"),"monster.homingBot":N("shadowMask.smallRound"),joystick:N("shadowMask.joystick"),charles:xn("charles",2)},gd=t=>{switch(t.type){case"monster":return fo[`monster.${t.config.which}`];case"floor":return t.config.floorType==="none"?void 0:"no-mask";default:return fo[t.type]}},bd=new pl({alpha:.66});class vd{constructor(e,n){this.renderContext=e,this.#e.filters=bd,n!=="no-mask"&&(this.#t=new us(e,n),this.#e.addChild(this.#t.output)),this.#e.addChild(this.#n)}#e=new v({label:"ItemShadowRenderer"});#n=new v({label:"shadows"});#t;#r={};get#o(){return C.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#i(e){if(this.#t===void 0)return;const n=this.#t.output.children.at(0);this.#t.tick(e);const r=this.#t.output.children.at(0);if(r===void 0||!(r instanceof be)){const{item:o}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${o.id}" of type "${o.type}". Have got ${r}`)}n!==r&&(this.#o||(this.#e.mask=r))}destroy(){this.#e.destroy(!0),this.#t?.destroy()}tick(e){if(this.#n.parent===null)throw new Error("shadow container not in scene graph");const{movedItems:n,progression:r}=e,{item:o,general:{pixiRenderer:i},room:s}=this.renderContext,a=n.has(o),l=o.state.position.z+o.aabb.z,c=ae(s.items).filter(function(g){return g.shadowCastTexture!==void 0}),u={id:o.id,state:{position:{...o.state.position,z:l}},aabb:{...o.aabb,z:Oa}},d=Object.groupBy(c,f=>{const g=this.#r[f.id]!==void 0,b=n.has(f);return!a&&!b?g?"keepUnchanged":"noShadow":Xo(u,f)?g?"update":"create":"noShadow"});for(const f of Cr(d.keepUnchanged,d.update))this.#r[f.id].renderedOnProgression=r;if(d.create)for(const f of d.create){const{times:g}=f.config,b=en(i,f.shadowCastTexture,g);b.label=f.id,this.#n.addChild(b),this.#r[f.id]={sprite:b,renderedOnProgression:r}}for(const f of Cr(d.create,d.update)){const{sprite:g}=this.#r[f.id],b=x({...de(f.state.position,o.state.position),z:o.aabb.z});g.x=b.x,g.y=b.y}for(const[f,{sprite:g,renderedOnProgression:b}]of $o(this.#r))b!==r&&(g.destroy(),delete this.#r[f]);const h=(d.keepUnchanged?.length??0)+(d.update?.length??0)+(d.create?.length??0)>0;this.#e.visible=h,h&&this.#i(e)}get output(){return this.#e}}const yd=t=>{const e=gd(t.item);return e===void 0?void 0:new vd(t,e)};class xd{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const z=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:r,connectTo:o,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=S.createBufferSource(),c=Pn()[r];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),o!==void 0&&l.connect(o),l},De=(t,e,n)=>{const r=S.createGain();return e!==void 0&&(r.gain.value=e),t.connect(r),r.connect(n),r},L=({start:t,change:e,loop:n,stop:r,startAndLoopTogether:o=!1,noStartOnFirstFrame:i=!0},s)=>{let a=!0,l,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(a&&i)?(l?.stop(),l=z({...t}),De(l,t.gain,s),n!==void 0&&(o?(l=z({...n,loop:!0}),De(l,n.gain,s)):l.onended=()=>{c&&(l=z({...n,loop:!0}),De(l,n.gain,s))})):n!==void 0&&(l=z({...n,loop:!0}),De(l,n.gain,s)):(l&&l.loop&&(l.stop(),l.onended=null),r!==void 0&&(l=z({...r}),De(l,r.gain,s)));else if(c!==u&&e!==void 0){const h=z({...e});De(h,e.gain,s)}a=!1,c=u}};class wd{constructor(e){this.renderContext=e,this.output.gain.value=4}output=S.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,r=(e.x!==0||e.y!==0)&&n!==null;this.#e(r)}destroy(){}}class Sd{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&z({soundId:"bonus",connectTo:this.output});break}case"disappearing":{z({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,z({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=S.createGain();tick(){}destroy(){}}class ir{constructor(e,n,r=1){this.renderContext=e,this.#e=L({start:n},this.output),this.output.gain.value=r}output=S.createGain();#e;tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{collidedWith:{roomTime:r,by:o}}}=n,i=r>(e??yt)&&!el(Gn(o));this.#e(i)}destroy(){}}class Cd{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#t=new ir(e,{soundId:"metalHit"},.3),this.#t.output.connect(this.output)}output=S.createGain();#e=S.createGain();#n=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#t;tick(e){const{renderContext:{item:n,room:{roomTime:r,items:o}}}=this,{state:{actedOnAt:{roomTime:i,by:s}}}=n,a=r===i&&xt(Gn(s)).some(l=>Ao(o[l]));this.#n(a),this.#t.tick(e)}destroy(){}}const wn=2;class Td{constructor(e){this.renderContext=e}output=S.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:wn},loop:{soundId:"conveyorLoop",playbackRate:wn},stop:{soundId:"conveyorEnd",playbackRate:wn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=St(e);this.#e(n)}destroy(){this.#e(!1)}}const kd=3;class Id{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=S.createGain();#e=z({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+kd*e)}destroy(){}}const po={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},mo={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},go={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},bo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Pd{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;po[n]!==void 0&&(this.#o=new ir(e,po[n]),this.#o.output.connect(this.output)),mo[n]!==void 0&&(this.#t=L({change:mo[n]},this.#e)),bo[n]!==void 0&&(this.#i=L(bo[n],this.#e)),go[n]!==void 0&&(this.#r=L({loop:go[n]},this.#n))}output=S.createGain();#e=S.createGain();#n=S.createGain();#t;#r;#o;#i;tick(e){const{renderContext:{item:n}}=this,{state:{facing:r,activated:o,busyLickingDoughnutsOffFace:i,vels:{walking:s}}}=n;if(this.#t){const a=$n(r);this.#t(a)}if(this.#o&&this.#o.tick(e),this.#r){const a=o&&!i;this.#r(a)}if(this.#i){const a=!Re(s,P);this.#i(a)}}destroy(){}}class Sn{constructor(e){this.renderContext=e;const{general:{soundSettings:n},item:{type:r}}=e,{noFootsteps:o}={...wt.soundSettings,...n};o||(this.#e=S.createGain(),this.#e.gain.value=2,this.#e.connect(this.output),this.#n=L({loop:{soundId:`${r==="headOverHeels"?"heels":r}Walk`}},this.#e)),this.#t.gain.value=.8,this.#t.connect(this.output),this.#a.gain.value=1.2,this.#a.connect(this.output),this.#i.connect(this.output),this.#r=L({start:{soundId:`${r==="headOverHeels"?"head":r}Jump`}},this.#t),this.#o=L({loop:{soundId:`${r==="headOverHeels"?"head":r}Fall`}},this.#t)}output=S.createGain();#e;#n;#t=S.createGain();#r;#o;#i=S.createGain();#s=L({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#i);#a=S.createGain();#l=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#a);#c={teleportingPhase:null,positionZ:0};tick({lastRenderRoomTime:e}){const{renderContext:{item:n}}=this,{state:{action:r,teleporting:o,jumpStartZ:i,jumped:s,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c}},collidedWith:{roomTime:u,by:d}}}=n,h=pt(n),{teleportingPhase:f,positionZ:g}=this.#c,b=o?o.phase:null,k=s&&l>i&&l>g&&c>0,A=l<g&&c<0&&a===null;this.#o(A),this.#r(k),this.#n!==void 0&&this.#n(!k&&!A&&r==="moving"),h!==void 0&&this.#l(h.carrying!==null);const I=a!==null&&u>(e??yt)&&d[a];if(this.#s(I),b!==null&&b!==f)if(b==="in"){const M=Pn().teleportIn,_=S.createBufferSource();_.buffer=M,_.connect(this.output),_.start()}else{const M=Pn().teleportOut,_=S.createBufferSource();_.buffer=M,_.connect(this.output),_.start()}this.#c={teleportingPhase:b,positionZ:l}}destroy(){}}class Od{constructor(e){this.renderContext=e}output=S.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const r=this.#e?.stoodOn??!1,o=St(e);!r&&o&&z({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class _d{constructor(e){this.renderContext=e,this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4}output=S.createGain();scrapeBracketed;tick({movedItems:e}){const{renderContext:{item:n,room:{roomTime:r}}}=this,{state:{actedOnAt:{roomTime:o},standingOnItemId:i}}=n,s=r===o&&i!==null&&e.has(n);this.scrapeBracketed(s)}destroy(){}}class Bd{constructor(e){this.renderContext=e}output=S.createGain();tick({lastRenderRoomTime:e}){const{renderContext:{item:{state:{stoodOnBy:n,stoodOnUntilRoomTime:r}}}}=this,o=St(n);e!==void 0&&r>e&&!o&&z({soundId:"springBoing",connectTo:this.output})}destroy(){}}class Rd{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=S.createGain();#e=S.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,r=n.type==="in-store"?Nn(C.getState(),n.path)?"right":"left":e,o=this.#n?.setting;o!==void 0&&o!==r&&z({soundId:"switchClick",playbackRate:r==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:r}}destroy(){}}class Ad{constructor(e){this.renderContext=e}output=S.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(Ke(e)&&ye(e.state.stoodOnBy,n).some(H))}destroy(){}}class Fd{constructor(e){this.renderContext=e,z({soundId:"hooter",connectTo:this.output})}output=S.createGain();tick(){}destroy(){}}class Md extends ir{constructor(e){super(e,{soundId:"glassClink",varyPlaybackRate:!0},.8),this.renderContext=e}}const Dd=(t,e)=>_o(ye(t.state.stoodOnBy,e).filter(Fo));class zd{constructor(e){this.renderContext=e,this.output.gain.value=2}output=S.createGain();#e=void 0;tick(e){const{renderContext:{item:n,room:r}}=this,o=Dd(n,r);this.#e!==void 0&&o<this.#e&&z({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=o}destroy(){}}const Ld={lift:Id,switch:Rd,bubbles:Sd,head:Sn,heels:Sn,headOverHeels:Sn,teleporter:Ad,monster:Pd,conveyor:Td,spring:Bd,portableBlock:Od,charles:Cd,ball:wd,pushableBlock:_d,firedDoughnut:Fd,slidingBlock:Md},Ed=t=>{if(t.item.type==="deadlyBlock"&&t.item.config.style==="toaster")return new zd(t);const e=Ld[t.item.type];if(e)return new e(t)},vo=w.h*_a,yo=w.h*-1,$d=w.w*16,Ud=0,Cn=(t,e,n)=>(t-e)/(n-e)*2-1;class Nd{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:r,x:o}}}=e;this.positionMinX=un(gr({x:0,y:r})),this.positionMaxX=un(gr({x:o,y:0}))}output=S.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,r=n.state,o=F(r.position,R(n.aabb,.5)),i=Cn(un(o),this.positionMaxX,this.positionMinX),s=Cn(o.z,yo,vo);if(!Number.isFinite(s))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${o.z},
          ${yo},
          ${vo},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(r.position)},
          scaleXyz(${JSON.stringify(n.aabb)}, 0.5),
        )`);const a=Cn(o.x+o.y,Ud,$d);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=a}destroy(){this.childRenderer.destroy()}}const Gd=[new Xt(p.midRed)],Vd=[new Xt(p.moss)],Hd=75;class jd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"ItemFlashOnSwitchedRenderer"});tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:n,switchedSetting:r}},room:{roomTime:o}}}=this;this.output.filters=o-n<Hd?r==="left"?Vd:Gd:V,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Xd=p.moss,qd=()=>new Pe({outlineColor:Xd,lowRes:!1,upscale:qe(C.getState())});class Wd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"PortableItemPickUpNextHighlightRenderer"});#e=!1;tick(e){const{wouldPickUpNext:n}=this.renderContext.item.state;n!==!this.#e&&(this.output.filters=n?[qd()]:V),this.#e=n,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Yd=(t,e,n)=>Xn(t)?new Wd(e,n):n,ds=p.pastelBlue,xo=new Pe({outlineColor:ds,upscale:qe(C.getState()),lowRes:!1}),wo=new E(ds);class Jd{constructor(e,n){this.renderContext=e,this.childRenderer=n,this.output.addChild(n.output)}output=new v({label:"EditorSelectedRenderer"});tick(e){const{renderContext:{item:{jsonItemId:n},room:{editor:r}}}=this,o=n&&r?.hoveredJsonItemId?.includes(n),i=n&&r?.selectedJsonItemId?.includes(n);this.output.filters=o&&i?[xo,wo]:o?xo:i?wo:V,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Zd=(t,e,n)=>e.general.editor?new Jd(e,n):n,Qd=(t,e)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{C.dispatch(Aa({item:t}))}))},Kd=t=>{const e=C.getState(),n=Ba(e),r=!Ra(e),{item:o}=t,i=n==="all"||n==="non-wall"&&t.item.type!=="wall",s=[],a=ji(o);if(a!==void 0){const h=new us(t,a),f=new jd(t,h);s.push(Zd(o,t,Yd(o,t,f))),i&&(f.output.alpha=.66)}if(r){const h=yd(t);h!==void 0&&s.push(h)}i&&s.push(new fd(t));let l;if(s.length===0)l=void 0;else{const h=s.length===1?s[0]:new eh(s,t);Qd(o,h.output),l=new pd(t,h)}const c=t.general.soundSettings.mute??wt.soundSettings.mute,u=t.general.paused||c?void 0:Ed(t),d=u===void 0?void 0:new Nd(t,u);return new xd(t,{graphics:l,sound:d})};class eh{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(r=>r.output))}#e;#n=new v({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const th=G("wall","doorFrame"),So=256;function*nh(t){const{left:e,right:n}=ae(t.items).filter(th).reduce((r,{aabb:o,renderAabb:i,renderAabbOffset:s,state:{position:a}})=>{const l=i??o,c=F(a,s??P),u=x(F(c,{x:l.x})).x,d=x(F(c,{y:l.y})).x;return{left:Math.min(r.left,u),right:Math.max(r.right,d)}},{left:Number.POSITIVE_INFINITY,right:Number.NEGATIVE_INFINITY});e!==Number.POSITIVE_INFINITY&&(yield new ie().rect(e-100,-256,100,So).fill(0)),n!==Number.NEGATIVE_INFINITY&&(yield new ie().rect(n,-256,100,So).fill(0))}class rh{constructor(e){this.renderContext=e;const{general:{colourised:n,soundSettings:r},room:o}=e;this.initFilters(n,e.room.color);const s=r.mute??wt.soundSettings.mute?void 0:S.createGain();Kt(nh(o),this.#r),this.output={sound:s,graphics:new v({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#n),this.output.graphics.addChild(this.#t),this.output.graphics.addChild(this.#r)}#e=!1;#n=new v({label:"items"});#t=new wl({sortableChildren:!1});#r=new v({label:"occlusion"});output;#o=void 0;#i=new Map;#s=new Map;initFilters(e,n){this.#n.filters=e?n.shade==="dimmed"?Bl:V:new E(Kn(n).main.original)}#a(e){const{room:n}=this.renderContext,r={...e,lastRenderRoomTime:this.#o};for(const i of ae(n.items)){let s=this.#s.get(i.id);if(s===void 0){s=Kd({...this.renderContext,uncolourisedLayer:this.#t,item:i}),this.#s.set(i.id,s);const{graphics:a,sound:l}=s.output;if(a&&(this.#n.addChild(a),i.fixedZIndex&&(a.zIndex=i.fixedZIndex)),l){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");l.connect(this.output.sound)}}try{s.tick(r)}catch(a){throw new Error(`RoomRenderer caught error while ticking Renderer for item "${i.id}" - item in play object is:
           ${JSON.stringify(i,null,2)}`,{cause:a})}}let o=!1;for(const[i,s]of this.#s.entries())n.items[i]===void 0&&(s.destroy(),this.#s.delete(i),o=!0);if(o)for(const i of this.#t.renderLayerChildren)i.parent===null&&this.#t.detach(i)}#l(e){const n=dd(this.renderContext.room.items,e.movedItems,this.#i),{order:r}=cs(n,this.renderContext.room.items);for(let o=0;o<r.length;o++){const i=this.#s.get(r[o]);if(i===void 0)throw new Error(`Item id=${r[o]} does not have a renderer - cannot assign a z-index`);const s=i.output.graphics;if(s)s.zIndex=r.length-o;else throw new Error(`order ${r[o]} was given a z-order by sorting, but item has no graphics`)}}get#c(){return this.#o!==void 0}tick(e){const n=this.#c?e:{...e,movedItems:new Set(ae(this.renderContext.room.items))};this.#a(n),(!this.#c||n.movedItems.size>0)&&this.#l(n),this.#o=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0}),this.output.sound?.disconnect(),this.#s.forEach(e=>{e.destroy()}),this.#e=!0}get destroyed(){return this.#e}}var sn=`in vec2 aPosition;
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
`,an=`struct GlobalFilterUniforms {
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
}`,oh=`precision highp float;
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
`,ih=`struct CRTUniforms {
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
}`,sh=Object.defineProperty,ah=(t,e,n)=>e in t?sh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Vt=(t,e,n)=>(ah(t,typeof e!="symbol"?e+"":e,n),n);const hs=class fs extends j{constructor(e){e={...fs.DEFAULT_OPTIONS,...e};const n=Oe.from({vertex:{source:an,entryPoint:"mainVertex"},fragment:{source:ih,entryPoint:"mainFragment"}}),r=U.from({vertex:sn,fragment:oh,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Vt(this,"uniforms"),Vt(this,"seed"),Vt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Vt(hs,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let lh=hs;var ch=`
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
}`,uh=`struct KawaseBlurUniforms {
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
}`,dh=`
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
`,hh=`struct KawaseBlurUniforms {
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
}`,fh=Object.defineProperty,ph=(t,e,n)=>e in t?fh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ce=(t,e,n)=>(ph(t,typeof e!="symbol"?e+"":e,n),n);const ps=class ms extends j{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(je("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...ms.DEFAULT_OPTIONS,...n};const r=Oe.from({vertex:{source:an,entryPoint:"mainVertex"},fragment:{source:n?.clamp?hh:uh,entryPoint:"mainFragment"}}),o=U.from({vertex:sn,fragment:n?.clamp?dh:ch,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ce(this,"uniforms"),Ce(this,"_pixelSize",{x:0,y:0}),Ce(this,"_clamp"),Ce(this,"_kernels",[]),Ce(this,"_blur"),Ce(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=$e.getSameSizeTexture(n);let c=n,u=l,d;const h=this._quality-1;for(let f=0;f<h;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),$e.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};Ce(ps,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let mh=ps;var gh=`in vec2 vTextureCoord;
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
`,bh=`struct AdvancedBloomUniforms {
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
`,vh=`
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
`,yh=`struct ExtractBrightnessUniforms {
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
`,xh=Object.defineProperty,wh=(t,e,n)=>e in t?xh(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,gs=(t,e,n)=>(wh(t,typeof e!="symbol"?e+"":e,n),n);const bs=class vs extends j{constructor(e){e={...vs.DEFAULT_OPTIONS,...e};const n=Oe.from({vertex:{source:an,entryPoint:"mainVertex"},fragment:{source:yh,entryPoint:"mainFragment"}}),r=U.from({vertex:sn,fragment:vh,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),gs(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};gs(bs,"DEFAULT_OPTIONS",{threshold:.5});let Sh=bs;var Ch=Object.defineProperty,Th=(t,e,n)=>e in t?Ch(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Le=(t,e,n)=>(Th(t,typeof e!="symbol"?e+"":e,n),n);const ys=class xs extends j{constructor(e){e={...xs.DEFAULT_OPTIONS,...e};const n=Oe.from({vertex:{source:an,entryPoint:"mainVertex"},fragment:{source:bh,entryPoint:"mainFragment"}}),r=U.from({vertex:sn,fragment:gh,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:oe.WHITE}}),Le(this,"uniforms"),Le(this,"bloomScale",1),Le(this,"brightness",1),Le(this,"_extractFilter"),Le(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Sh({threshold:e.threshold}),this._blurFilter=new mh({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=$e.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=$e.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),$e.returnTexture(s),$e.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Le(ys,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let kh=ys;const Ih=J,Ph=(t,e)=>(n,r)=>{const o=new Set;if(Fa(n)){const u=ge(n)?.items;if(u!==void 0){const d=xt(Y(Zt(u))).filter(h=>h!==void 0);for(const h of d)o.add(h)}}const s=r*n.gameSpeed,a=Math.max(1,Math.ceil(s/e)),l=s/a;for(let u=0;u<a;u++){const d=t(n,l);for(const h of d)o.add(h)}const c=ge(n)?.items??Ih;for(const u of o)c[u.id]===void 0&&o.delete(u);return o},Oh=t=>{const e={},n=Object.values(t.items).filter(r=>r.type==="door");for(const{config:{direction:r},position:{x:o,y:i}}of n)bt(r)==="x"?i===0?e.towards=!0:i===t.size.y&&(e.away=!0):o===0?e.right=!0:o===t.size.x&&(e.left=!0);return e},_h=t=>{const e=Oh(t),n=e.right?-.5:0,r=t.size.x+(e.left?.5:0),o=e.towards?-.5:0,i=t.size.y+(e.away?.5:0);return{blockXMin:n,blockXMax:r,blockYMin:o,blockYMax:i,sidesWithDoors:e}},ws=t=>{const{blockXMax:e,blockXMin:n,blockYMax:r,blockYMin:o,sidesWithDoors:i}=_h(t),s=te({x:t.size.x+(i.right?.5:0),y:-o}).x,a=te({x:-n,y:t.size.y+(i.towards?.5:0)}).x,l=te({x:t.size.x,y:t.size.y}).y,c=te({x:n,y:o}),u=te({x:e,y:r});return{blockXMin:n,blockXMax:e,blockYMin:o,blockYMax:r,edgeLeftX:s,edgeRightX:a,topEdgeY:l,frontSide:c,backSide:u,sidesWithDoors:i}},ze=.33,Bh=Ma()==="mobile"?-4:16,Ln=He.h-He.w/2,Rh=ve.heels;class Ah{constructor(e,n){this.renderContext=e,this.childRenderer=n;const{room:r,general:{upscale:{gameEngineScreenSize:o},displaySettings:i}}=e,{edgeLeftX:s,edgeRightX:a,frontSide:l,topEdgeY:c}=ws(r.roomJson);this.#o=s+l.x,this.#i=a+l.x;const u=(a+s)/2;this.#s={x:o.x/2-u,y:o.y-Bh-l.y-Math.abs(u/2)},this.#n=this.#s.x+this.#o<0,this.#t=this.#s.x+this.#i>o.x,this.#r=this.#s.y+c-Ln<0;const d=this.childRenderer.output.graphics;if(d===void 0)throw new Error("can't scroll a renderer without graphics");const h={sound:this.childRenderer.output.sound,graphics:new v({children:[d],label:`RoomScrollRenderer(${r.id})`})};(i?.showBoundingBoxes??wt.displaySettings.showBoundingBoxes)!=="none"&&h.graphics.addChild(Fh(e.room.roomJson)),this.output=h}#e=!1;#n;#t;#r;#o;#i;#s;output;tick(e){const{general:{upscale:{gameEngineScreenSize:n},gameState:r}}=this.renderContext,{deltaMS:o}=e,i=Ze(r);if(i===void 0)return;const s=x(i.state.position),a=F(s,this.#s),l={x:this.#n&&a.x<n.x*ze?Math.min(-this.#o,n.x*ze-s.x):this.#t&&a.x>n.x*(1-ze)?Math.max(n.x-this.#i,n.x*(1-ze)-s.x):this.#s.x,y:this.#r&&a.y<n.y*ze?n.y*ze-s.y:this.#s.y},c=this.output.graphics;if(!this.#e)c.x=l.x,c.y=l.y;else{const d=Rh*o,h=de(c,l),f=Vn(h);if(f>d){const g={x:h.x/f,y:h.y/f};c.x-=g.x*d,c.y-=g.y*d}else c.x=l.x,c.y=l.y}this.#e=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Fh=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=ws(t);return new ie().rect(e+r.x,o-Ln,n-e,r.y-o+Ln).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")},Co=({crtFilter:t},e)=>[t?new lh({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new kh({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Mh{constructor(e,n){this.app=e,this.gameState=n;try{const r=C.getState(),o=qe(r);if(this.#i.connect(S.destination),e.stage.addChild(this.#o),e.stage.scale=o,ge(n)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(r){this.#a(r);return}}#e;#n;#t;#r;#o=new v({label:"MainLoop/world"});#i=S.createGain();#s=Ph(rd,Na);#a(e){C.dispatch(Da(za(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}}}=C.getState();this.#e=Co(e,!0),this.#n=Co(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){const r=new Error("Error caught in main loop tick",{cause:n});console.error(r),this.#a(r)}};tick=({deltaMS:e})=>{const n=C.getState();if(La(n))return;const r=Ea(n),{gameMenus:{userSettings:{displaySettings:o,soundSettings:i}},upscale:{upscale:s}}=C.getState(),a=!r&&!(o?.uncolourised??wt.displaySettings.uncolourised),l=$a(n),c=Ua(n);(this.#t?.renderContext.general.colourised!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new wu({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:o,soundSettings:i,colourised:a,upscale:s,editor:!1},inputDirectionMode:c,onScreenControls:l}),this.app.stage.addChild(this.#t.output));const u=ge(this.gameState);this.#t.tick({screenSize:s.gameEngineScreenSize,room:u});const d=r?Hn:this.#s(this.gameState,e),h=ge(this.gameState);if(this.#r?.renderContext.room!==h||this.#r?.renderContext.general.upscale!==s||this.#r?.renderContext.general.displaySettings!==o||this.#r?.renderContext.general.soundSettings!==i||this.#r?.renderContext.general.paused!==r){if(this.#r?.destroy(),h){const f={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:o,soundSettings:i,colourised:a,upscale:s,editor:!1},room:h};this.#r=new Ah(f,new rh(f)),this.#o.addChild(this.#r.output.graphics),this.#r.output.sound?.connect(this.#i)}else this.#r=void 0;this.app.stage.scale=s.gameEngineUpscale,this.#l()}this.#r?.tick({progression:this.gameState.progression,movedItems:d,deltaMS:e}),r?this.app.stage.filters=this.#e:this.app.stage.filters=this.#n;try{this.app.render()}catch(f){throw new Error("Error in Pixi.js render",{cause:f})}};start(){return this.app.ticker.add(this.tickAndCatch),this}stop(){this.app.stage.removeChild(this.#o),this.#i.disconnect(),this.#r?.destroy(),this.#t?.destroy(),this.app.ticker.remove(this.tickAndCatch)}}qt.add(Ko,ei,ti,ni,ri,oi,ii,si,ai,li,ci,di,ui,hi,fi,pi,mi,gi,bi,vi,yi);const Dh=t=>{t.ticker.remove(t.render,t)};Ha.defaultOptions.scaleMode="nearest";const To=async(t,e)=>{const n=new Pi;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1}),Dh(n),n.ticker.maxFPS=Ga;const r=C.getState().gameMenus.currentGame,o=br({campaign:t,inputStateTracker:e,savedGame:r});r!==void 0?C.dispatch(Va(r.store.gameMenus)):(C.dispatch(vr(o.characterRooms.head.id)),C.dispatch(vr(o.characterRooms.heels.id)));const i=new Mh(n,o).start();return{campaign:t,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Ze(o);a!==void 0&&qn({playableItem:a,gameState:o,toRoomId:s,changeType:"level-select"})},get currentRoom(){return ge(o)},get gameState(){return o},reincarnateFrom(s){br({campaign:t,inputStateTracker:e,savedGame:s,writeInto:o})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Uh=Object.freeze(Object.defineProperty({__proto__:null,default:To,gameMain:To},Symbol.toStringTag,{value:"Module"}));export{Ci as A,xi as C,j as F,Zn as R,sl as S,Ti as V,dl as a,Uh as g,il as u};
