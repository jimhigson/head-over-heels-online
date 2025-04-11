const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-C4Mv1zQC.js","assets/App-EsJMziXT.js","assets/index-Dzpo5HOe.js","assets/index-CgvoYggz.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CCqwmFLB.js","assets/Graphics-CewduW3m.js","assets/changeCharacterRoom-jBfPcV0f.js","assets/WebGLRenderer-DIoNubYr.js"])))=>i.map(i=>d[i]);
import{b0 as Ti,b1 as Uo,b2 as ki,aj as Ii,an as ve,ao as N,ab as $o,ak as he,W as C,$ as At,Z as Oi,a0 as b,d as Ke,v as _t,aD as v,a3 as on,av as ze,X as je,Y as Bi,V as _i,b3 as Pi,b4 as Fi,b5 as Ai,aa as Di,b6 as H,b7 as Mn,H as B,b8 as No,b9 as ae,ba as k,bb as Go,s as Vo,J as w,o as te,c as _,bc as Mi,bd as zi,be as Li,f as A,bf as Le,bg as Ri,bh as vn,bi as Xo,bj as Ei,bk as St,i as le,q as ye,n as yn,e as E,bl as Ui,bm as $i,bn as Ni,bo as Gi,bp as Vi,bq as Xi,E as Qe,br as Tt,k as jo,bs as Dt,bt as U,j as W,bu as Ho,bv as qo,bw as zn,bx as Wo,by as ji,bz as it,bA as Jo,bB as xe,bC as Mt,bD as ie,O as st,D as pe,bE as me,x as we,bF as rn,bG as Hi,bH as qi,bI as Wi,bJ as Ji,bK as xn,w as Re,bL as Yi,bM as Zi,bN as Ki,bO as sn,bP as Qi,bQ as es,bR as dt,g as Yo,bS as ts,bT as ns,bU as os,l as Ce,z as Zo,bV as Ln,h as ce,bW as Ko,r as Qo,b as rs,a as er,m as is,aY as Ee,bX as Nt,bY as qe,bZ as ft,b_ as ss,b$ as as,c0 as ls,c1 as Ue,c2 as Rn,c3 as wn,c4 as cs,c5 as us,c6 as Cn,c7 as ds,c8 as at,c9 as fs,ca as hs,cb as ps,cc as ms,cd as gs,ce as En,I as Un,cf as tr,a$ as nr,B as or,C as bs,y as $n,cg as vs,ch as ys,ci as xs,aX as De,cj as rr,ck as ws,cl as Cs,cm as Ss,cn as S,co as Ts,cp as Pt,cq as ks,cr as kt,cs as Is,ct as Os,cu as Nn,cv as Bs,cw as _s,P as et,cx as zt,cy as Ps,cz as We,cA as x,cB as an,cC as ln,p as Fs,cD as Gt,F as Gn,cE as As,cF as Ds,cG as Ms,cH as zs,cI as ir,at as _e,cJ as Ls,cK as Rs,cL as Es,cM as Us,cN as $s,cO as Ns,cP as Gs,cQ as Vn,cR as Vs,K as Xn,cS as Xs}from"./App-EsJMziXT.js";import{a as js,f as cn,c as Sn,m as Lt,b as Tn,d as sr,r as Hs,o as qs}from"./changeCharacterRoom-jBfPcV0f.js";import{S as Ws,G as q}from"./Graphics-CewduW3m.js";import{g as ar,_ as jn}from"./index-Dzpo5HOe.js";var ht={},Hn;function Js(){if(Hn)return ht;Hn=1;var t=Ti(),e=t.mark(i),n=Uo(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var l,a,c,u,d,f,h=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(l=h.length,a=new Array(l),c=0;c<l;c++)a[c]=h[c];u=0,d=a;case 2:if(!(u<d.length)){y.next=8;break}return f=d[u],y.delegateYield(r(f),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}ht.__concat=i;var s=o(i);return ht.concat=s,ht}var pt={},qn;function Ys(){if(qn)return pt;qn=1;var t=Uo(),e=t.iterableCurry,n=ki(),o=n.__firstOr,r=Symbol("none");function i(l){return o(l,r)===r}pt.__isEmpty=i;var s=e(i,{reduces:!0});return pt.isEmpty=s,pt}var Vt,Wn;function Zs(){return Wn||(Wn=1,Vt=Js().concat),Vt}var Ks=Zs();const Jn=ar(Ks);var Xt,Yn;function Qs(){return Yn||(Yn=1,Xt=Ys().isEmpty),Xt}var ea=Qs();const lr=ar(ea),cr=class un extends Ii{constructor(e){e={...un.defaultOptions,...e},super(e),this.enabled=!0,this._state=Ws.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=ve.from(n)),o&&(s=N.from(o)),new un({gpuProgram:i,glProgram:s,...r})}};cr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=cr;var ta=`
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
`,na=`in vec2 aPosition;
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
`,oa=`
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
}`;class I extends Y{constructor(e){const n=e.gpu,o=Zn({source:oa,...n}),r=ve.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Zn({source:ta,...i}),l=N.from({vertex:na,fragment:s}),a=new $o({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:l,blendRequired:!0,resources:{blendUniforms:a,uBackTexture:he.EMPTY}})}}function Zn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const kn=`
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
    `,In=`
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
	`;class ur extends I{constructor(){super({gl:{functions:`
                ${kn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${In}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ur.extension={name:"color",type:C.BlendMode};class dr extends I{constructor(){super({gl:{functions:`
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
            `}})}}dr.extension={name:"color-burn",type:C.BlendMode};class fr extends I{constructor(){super({gl:{functions:`
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
                `}})}}fr.extension={name:"color-dodge",type:C.BlendMode};class hr extends I{constructor(){super({gl:{functions:`
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
                `}})}}hr.extension={name:"darken",type:C.BlendMode};class pr extends I{constructor(){super({gl:{functions:`
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
            `}})}}pr.extension={name:"difference",type:C.BlendMode};class mr extends I{constructor(){super({gl:{functions:`
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
            `}})}}mr.extension={name:"divide",type:C.BlendMode};class gr extends I{constructor(){super({gl:{functions:`
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
            `}})}}gr.extension={name:"exclusion",type:C.BlendMode};class br extends I{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"hard-light",type:C.BlendMode};class vr extends I{constructor(){super({gl:{functions:`
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
            `}})}}vr.extension={name:"hard-mix",type:C.BlendMode};class yr extends I{constructor(){super({gl:{functions:`
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
            `}})}}yr.extension={name:"lighten",type:C.BlendMode};class xr extends I{constructor(){super({gl:{functions:`
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
                `}})}}xr.extension={name:"linear-burn",type:C.BlendMode};class wr extends I{constructor(){super({gl:{functions:`
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
            `}})}}wr.extension={name:"linear-dodge",type:C.BlendMode};class Cr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"linear-light",type:C.BlendMode};class Sr extends I{constructor(){super({gl:{functions:`
                ${kn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${In}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Sr.extension={name:"luminosity",type:C.BlendMode};class Tr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Tr.extension={name:"negation",type:C.BlendMode};class kr extends I{constructor(){super({gl:{functions:`
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
                `}})}}kr.extension={name:"overlay",type:C.BlendMode};class Ir extends I{constructor(){super({gl:{functions:`
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
                `}})}}Ir.extension={name:"pin-light",type:C.BlendMode};class Or extends I{constructor(){super({gl:{functions:`
                ${kn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${In}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Or.extension={name:"saturation",type:C.BlendMode};class Br extends I{constructor(){super({gl:{functions:`
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
                `}})}}Br.extension={name:"soft-light",type:C.BlendMode};class _r extends I{constructor(){super({gl:{functions:`
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
                `}})}}_r.extension={name:"subtract",type:C.BlendMode};class Pr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"vivid-light",type:C.BlendMode};const dn=[];At.handleByNamedList(C.Environment,dn);async function ra(t){if(!t)for(let e=0;e<dn.length;e++){const n=dn[e];if(n.value.test()){await n.value.load();return}}}let $e;function ia(){if(typeof $e=="boolean")return $e;try{$e=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{$e=!1}return $e}var Fr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Fr||{});class sa{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,l,a){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,l,a);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const aa=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Ar=class Dr extends Oi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...aa,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await ra(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Dr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(Ke(_t,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:v.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Fr.ALL);const{clear:o,clearColor:r,target:i}=e;v.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new sa(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,l=o[s];this.renderPipes[s]=new i(this,l?new l:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!ia())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Ar.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Mr=Ar,mt;function la(t){return mt!==void 0||(mt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Mr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!on.get().getWebGLRenderingContext())return!1;let o=on.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),mt}let gt;async function ca(t={}){return gt!==void 0||(gt=await(async()=>{const e=on.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),gt}const Kn=["webgl","webgpu","canvas"];async function ua(t){let e=[];t.preference?(e.push(t.preference),Kn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Kn.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ca()){const{WebGPURenderer:l}=await jn(async()=>{const{WebGPURenderer:a}=await import("./WebGPURenderer-C4Mv1zQC.js");return{WebGPURenderer:a}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=l,o={...t,...t.webgpu};break}else if(s==="webgl"&&la(t.failIfMajorPerformanceCaveat??Mr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:l}=await jn(async()=>{const{WebGLRenderer:a}=await import("./WebGLRenderer-DIoNubYr.js");return{WebGLRenderer:a}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=l,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const zr="8.8.1";class Lr{static init(){globalThis.__PIXI_APP_INIT__?.(this,zr)}static destroy(){}}Lr.extension=C.Application;class da{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,zr)}destroy(){this._renderer=null}}da.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Rr=class fn{constructor(...e){this.stage=new b,e[0]!==void 0&&Ke(_t,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await ua(e),fn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ke(_t,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=fn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Rr._plugins=[];let Er=Rr;At.handleByList(C.Application,Er._plugins);At.add(Lr);var fa=`in vec2 aPosition;
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
`,ha=`
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
}`;const Ur=class $r extends Y{constructor(e){e={...$r.defaultOptions,...e};const n=ve.from({vertex:{source:Qn,entryPoint:"mainVertex"},fragment:{source:Qn,entryPoint:"mainFragment"}}),o=N.from({vertex:fa,fragment:ha,name:"alpha-filter"}),{alpha:r,...i}=e,s=new $o({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Ur.defaultOptions={alpha:1};let pa=Ur;class tt extends ze{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:l=null,onFrameChange:a=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof he?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=l,this.onFrameChange=a,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(je.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(je.shared.add(this.update,this,Bi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(he.from(e[o]));return new tt(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(he.from(e[o]));return new tt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof he)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(je.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(je.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ma extends _i{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:l,height:a,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Pi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,l!==void 0&&(this.width=l),a!==void 0&&(this.height=a)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function ga(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ke(_t,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class ba extends ma{constructor(...e){const n=ga(e,"Text");super(n,Fi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Ai.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class On extends he{static create(e){return new On({source:new Di(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new v("#000000"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),pastelBlue:new v("#75ACFF"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},ge=t=>{const[e,n,o]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:o/2})},X={original:new v(H.zxWhite),basic:g.white,dimmed:g.lightGrey},j={original:new v(H.zxYellow),basic:g.midRed,dimmed:g.redShadow},Z={original:new v(H.zxMagenta),basic:g.pink,dimmed:ge(g.pink)},O={original:new v(H.zxCyan),basic:g.pastelBlue,dimmed:ge(g.pastelBlue)},K={original:new v(H.zxGreen),basic:g.moss,dimmed:ge(g.moss)},Bn={white:{basic:{main:X,edges:{towards:O,right:j},hud:{lives:j,dimmed:Z,icons:O}},dimmed:{main:X,edges:{towards:K,right:O},hud:{lives:j,dimmed:Z,icons:O}}},yellow:{basic:{main:j,edges:{towards:K,right:X},hud:{lives:O,dimmed:Z,icons:K}},dimmed:{main:j,edges:{towards:O,right:O},hud:{lives:O,dimmed:Z,icons:K}}},magenta:{basic:{main:Z,edges:{towards:K,right:O},hud:{lives:X,dimmed:O,icons:j}},dimmed:{main:Z,edges:{towards:K,right:O},hud:{lives:X,dimmed:O,icons:j}}},cyan:{basic:{main:O,edges:{towards:Z,right:X},hud:{lives:X,dimmed:K,icons:j}},dimmed:{main:O,edges:{towards:Z,right:X},hud:{lives:X,dimmed:K,icons:j}}},green:{basic:{main:K,edges:{towards:O,right:j},hud:{lives:X,dimmed:Z,icons:O}},dimmed:{main:K,edges:{towards:O,right:j},hud:{lives:X,dimmed:Z,icons:O}}}},_n=t=>Bn[t.hue][t.shade],Pe={head:g.pastelBlue,heels:g.pink},It=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Mn>n?100-Math.ceil((n-e)/(Mn/100)):0},Nr=t=>t.type==="headOverHeels"?It(t.state.head)>0||It(t.state.heels)>0:It(t.state)>0,Gr=t=>{const e=100*B.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/B.w):0},va={pureBlack:new v("#000000"),shadow:new v("#1B2D3B"),midGrey:new v("#505A55"),lightGrey:new v("#929981"),white:new v("#F8FEF8"),pastelBlue:new v("#4893FF"),metallicBlue:new v("#1D4E80"),pink:new v("#B973AF"),moss:new v("#6E7B00"),redShadow:new v("#513D40"),midRed:new v("#A7574B"),lightBeige:new v("#BF8E69"),highlightBeige:new v("#DBB269"),alpha:new v("#105A69"),replaceLight:new v("#048662"),replaceDark:new v("#052229")},lt=`in vec2 aPosition;
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
`,ya=`in vec2 vTextureCoord;
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
`;class ue extends Y{constructor(e){const n=Object.keys(e).length,o=N.from({vertex:lt,fragment:ya.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],l)=>{g[i].toArray().forEach((a,c)=>{r.uOriginal[l*3+c]=a}),s.toArray().forEach((a,c)=>{r.uReplacement[l*3+c]=a})})}}const xa=`precision mediump float;
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
`;class $ extends Y{uniforms;constructor(e="white"){const n=N.from({vertex:lt,fragment:xa,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const wa=`precision mediump float;
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
`;class Ca extends Y{constructor(){const e=N.from({vertex:lt,fragment:wa,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Vr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Xr=t=>Vr(Bn[t.color.hue][t.color.shade].main),jr=t=>new ue({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&Xr(t)}),Sa=new ue({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Ta=t=>new ue({replaceLight:t,replaceDark:ge(t)}),hn=(t,e,n)=>n?new ue(Vr(Bn[t.color.hue][t.color.shade].edges[e])):new $(_n(t.color).edges[e].original),oe=t=>new ue(Xr(t)),eo=new Ca,be=No,ka=new ue(va),to={x:.5,y:1},no=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:l,label:a}=t;let c;if(no(t)?c=Ia(t):c=new ze(ae().textures[t.textureId]),l!==void 0){const u={x:1,y:1,z:1,...l},d=new b({label:a??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const y=p({...t,times:void 0,label:`(${f},${h},${m})`}),T=k({x:f-1,y:h-1,z:m-1});y.x+=T.x,y.y+=+T.y,d.addChild(y)}return d}if(e===void 0&&o===void 0)if(no(t))c.anchor=to;else{const u=ae().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=to}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),a!==void 0&&(c.label=a),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Ia({animationId:t,reverse:e,playOnce:n,paused:o}){const r=ae().animations[t],s=(o?[r[0]]:r).map(a=>({texture:a,time:Go}));e&&s.reverse();const l=new tt(s);return l.animationSpeed=Vo.animations[t].animationSpeed,l.play(),n!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),n==="and-destroy"&&(l.visible=!1)}),l}const Oa=`#version 300 es

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
`;class Me extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=N.from({vertex:lt,fragment:Oa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,l,a]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=l,i.uOutline[2]=a,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ee=new Me({outlineColor:g.pureBlack,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),Je=new $,oo=new $,Pn=new $,ro=new $(g.moss),Ye=new $,Q=[Je,ee],Ba=[Ye,ee],_a=[ee,Pn],bt={original:[ee,Ye],colourised:{head:{active:[ee,new $(Pe.head)],inactive:[ee,new $(ge(Pe.head))]},heels:{active:[ee,new $(Pe.heels)],inactive:[ee,new $(ge(Pe.heels))]}}},Se=14,Pa=2,Fa=Math.cos(30*(Math.PI/180)),Aa=40;class Da{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Se,y:-14,filter:Q}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Se,y:Se,filter:Q}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Se,filter:Q}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:Q}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Se*Math.SQRT2,filter:Q}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Se*Math.SQRT2,filter:Q}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:Q}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:Q})}:{}},this.output.addChild(this.#e),this.output.addChild(new q().circle(0,0,Aa).fill("#00000000"));for(const o of te(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?be:Je}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=_};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Mi(w.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:l,height:a}=this.output.getLocalBounds(),c=(i/n-o)/(l/2),u=(s/n-r)/(a/2),d=zi({x:-c,y:-u}),f=Li(d,Fa),h=A(f,Pa);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(w.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Le(e)>Ri?vn(e):void 0;for(const[r,i]of Xo(this.arrowSprites))i.filters=r===o?Ba:Q}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const pn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:H.zxBlue,fire:H.zxYellow,carry:H.zxGreen,carryAndJump:H.zxRed,menu:H.zxWhite,map:H.zxWhite}};function nt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*Hr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${e[o]}`;Ei(r),yield p({textureId:r,x:(o+.5-n/2)*St.w})}}function Oe(t,e){return t.removeChildren(),nt(Hr(e),t),t}function qr(t,e){return t.removeChildren(),nt(Hr(e),t),t}const He=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?_a:Pn,scale:{x:1,y:t?2:1}}),Ft=Symbol(),Wr=Symbol(),Jr=Symbol(),vt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Ta(pn.colourised[e]):o.filters=new $(pn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Wr]=r,o[Ft]=i,o[Jr]=n,o},Ne=(t,...e)=>{t[Ft].removeChildren();for(const n of e)n!==void 0&&t[Ft].addChild(n)},yt=(t,e)=>{t[Wr].texture=ae().textures[e?"button.pressed":"button"],t[Jr].y=e?1:0},io=(t,e,n)=>{n&&(t[Ft].filters=e?jr():be)},so=({which:t},e,n)=>{const o=qr(new b,n);return o.filters=new ue({white:e?ge(pn.colourised[t]):g.pureBlack}),o};class Yr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const Zr=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Ma=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},ao=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Ma(t,e,n,o),Fn=(t,e,n=.001)=>{if(!ye(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:yn({state:{position:E(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+Ui},id:t.id},{state:{position:E(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Kr=(t,e)=>{const o=[...le(e).filter(i=>Fn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const l=js(s,i);return l<0||l===0&&ao(t,s)>ao(t,i)?s:i})},Ze=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<$i};function Qr({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Nr(e)||Ze(e)||(e.state.action="death",e.state.expires=t+cn))}const re=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,ot=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,ei=t=>{const{gameState:e,movingItem:n,touchedItem:{id:o,config:r},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:l}=e;if(l[i]?.[o]!==!0)switch(s[o]&&(l[i]===void 0&&(l[i]={}),l[i][o]=!0),r.gives){case"hooter":{const a=Tt(n);if(a!==void 0){a.hasHooter=!0;break}break}case"doughnuts":{const a=Tt(n);a!==void 0&&(a.doughnuts=re(a.doughnuts,6));break}case"bag":{const a=Qe(n);if(a!==void 0){a.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const a=Tt(n);a!==void 0&&(a.fastStepsStartedAtDistance=a.gameWalkDistance);break}case"jumps":{const a=Qe(n);a!==void 0&&(a.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=re(n.state.head.lives,2),n.state.heels.lives=re(n.state.heels.lives,2)):n.state.lives=re(n.state.lives,2);break;case"scroll":w.dispatch(Xi(r.page));break;case"reincarnation":{w.dispatch(Gi(Vi(e,w.getState())));break}case"crown":{w.dispatch(Ni(r.planet));break}}},za=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;jo(i,o)<=0||e.state.action!=="death"&&Sn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},La=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Dt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=E(t.state.position,s)};function Ra({movingItem:t}){t.state.autoWalk=!1}const ne=(t,...e)=>W(...e)(t.touchedItem),Ge=(t,...e)=>W(...e)(t.movingItem),ti=t=>U(t.movingItem),Ea=t=>U(t.touchedItem),Ua=t=>Ho(t.touchedItem),lo=t=>{switch(!0){case ne(t,"stopAutowalk"):Ra(t);break;case Ua(t):Qr(t);break;case ne(t,"portal"):za(t);break;case ne(t,"pickup"):ei(t);break;case ne(t,"doorFrame"):La(t);break}},J={movementType:"steady"},An=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=qo(e.items);if(r!==void 0)return Ze(r)?void 0:r;const i=n===void 0||Ze(n)||n.state.action==="death"?void 0:zn(n.state.position,t),s=o===void 0||Ze(o)||o.state.action==="death"?void 0:zn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ni=150,oi=t=>t[Math.floor(Math.random()*t.length)],se=Object.freeze({movementType:"vel",vels:{walking:_}}),Rt=t=>Wo(t)?me[t.config.which]:me[t.type],co=B.w/2,$a=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=me.homingBot;if(!Mt(e,ie))return{movementType:"steady"};const{head:s,heels:l}=qo(n.items);for(const a of[s,l]){if(a===void 0)continue;const c=it(a.state.position,t);if(Math.abs(c.y)<co)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<co)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Na=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:l}}=t;if(i===null)return se;const a=An(r,e);if(a===void 0||s+ni>e.roomTime)return J;const c=it(a?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>B.w/4?u:st(u),f=Rt(t),h={..._,[d]:c[d]>0?f:-f},m=xe(h),y=!Mt(m,l);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...y?{timeOfLastDirectionChange:e.roomTime}:pe}}},uo=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return se;const l=An(i,e);if(l===void 0)return se;const a=l.state.position,c=B.w*3;if(!(i.x>a.x-c&&i.x<a.x+c&&i.y>a.y-c&&i.y<a.y+c))return se;const d=it(l?.state.position,i),f=Rt(t),h=(1+Math.sqrt(2))/2,m=f*h,y=A({...d,z:0},m/Jo(d)*(r?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:xe(y)}}},jt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return se;if(!(we(i,_)||Math.random()<o/1e3))return J;const a=oi(r);return{movementType:"vel",vels:{walking:A(rn[a],Rt(t))},stateDelta:{facing:rn[a]}}},Ga=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?se:Mt(i,ie)?{movementType:"vel",vels:{walking:A(r,Rt(t))}}:J},Va=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=oi([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},Ht=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:l},aabb:a}=t;if(!l||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ni))return;const c=Lt(i,a,e,n);if(c.x===0&&c.y===0)return;const u=Va(s,c,r);t.state.vels.walking=u,t.state.facing=xe(u),t.state.durationOfTouch=0},Xa=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},ja=(t,e,n,o)=>{if(!t.state.activated||Wo(t)&&t.state.busyLickingDoughnutsOffFace)return se;switch(t.config.movement){case"patrol-randomly-diagonal":return jt(t,e,n,o,Wi);case"patrol-randomly-xy8":return jt(t,e,n,o,qi);case"patrol-randomly-xy4":return jt(t,e,n,o,Hi);case"towards-tripped-on-axis-xy4":return $a(t,e);case"towards-on-shortest-axis-xy4":return Na(t,e);case"back-forth":case"clockwise":return Ga(t);case"unmoving":return se;case"towards-analogue":return uo(t,e);case"towards-analogue-unless-planet-crowns":return uo(t,e,n,o,ji(w.getState()));default:throw t.config,new Error("this should be unreachable")}},Ha=t=>{const{movingItem:e,touchedItem:n}=t;if(ye(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Ht(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Ht(t,"opposite");break;case"clockwise":Ht(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Xa(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},qa=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const l of o.modifies){const a=n.items[l.target];a!==void 0&&(a.state={...a.state,[l.key]:l[s]})}break}case"in-store":{w.dispatch(Ji(o.path));break}}},Wa=({movingItem:t,touchedItem:e})=>{if(!ye(t))return;const{state:{position:n},aabb:o}=e,r=Lt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=xe(r),s=A(i,-.05);return e.state.vels.sliding=s,!1},Ja=({movingItem:t,touchedItem:e})=>{if(!ye(e))return;const n=t.state.vels.sliding;if(we(n,_))return;const{state:{position:o},aabb:r}=t,i=Lt(e.state.position,e.aabb,o,r);return jo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},Ya=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:l},aabb:a}=n,c=Lt(t.state.position,t.aabb,l,a);if(c.x===0&&c.y===0)return;const u=xe(c);for(const d of s){const f=e.items[d],h=A(u,-.025*o);f.state.facing=h,Tn({room:e,subjectItem:f,gameState:r,pusher:n,posDelta:h,deltaMS:o,onTouch:i})}},ct=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:xn(w.getState(),t),Za=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,l=s.currentActionPress("jump"),a=i===null?null:e.items[i],c=a!==null&&W("teleporter")(a)&&ct(a);if(r===null)return l!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:a.config.toRoom,timeRemaining:cn}}}:J;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Sn({changeType:"teleport",sourceItem:a,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:cn}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Ka=1e3/12,xt=t=>{const e=t-Qi,o=e/es*Go;return(e+.5*sn*o**2)/o},Qa={head:xt(dt.head),headOnSpring:xt(dt.head+B.h),heels:xt(dt.heels),heelsOnSpring:xt(dt.heels+B.h)},fo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Qa[`${n}${e?"OnSpring":""}`]},el=t=>!(t===null||Zi(t)&&ct(t)||Ki(t)&&t.config.gives==="scroll"||U(t)&&t.state.standingOnItemId===null),tl=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+Ka>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),ri=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Re(o,e);if(tl(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:fo(t,!1)}},stateDelta:{}};if(!(r.currentActionPress("jump")!=="released"&&el(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:J;const l=Yi(i);return console.log("🌸🌸🌸 starting a jump - from spring?",l),{movementType:"vel",vels:{gravity:{x:0,y:0,z:fo(t,l)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},nl=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Le(t),l=Math.max(i,Math.min(o,s+e*r)),a=Math.min(l,o);return A(n,a)},ho={movementType:"vel",vels:{walking:_}},ii=(t,e,n,o)=>{const r=ol(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Le(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!we(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},ol=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:l,standingOnItemId:a,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,y=o===t.id,T=y?n.currentActionPress("jump"):"released",P=y?n.directionVector:_,F=a===null&&m.z<0,D=i==="head"&&Gr(t.state)>0&&a!==null,G=i==="headOverHeels"?F?"head":"heels":D?"heels":i,M=l?c:P,V=me[G];if(u!==null||s==="death")return ho;if(i==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:Yo(h,A(h,ts*r))}}:ho;if(T!=="released"){const ut=xe(Mt(M,ie)?c:M),Si=W("spring")(Re(a,e))?1:ns;return{movementType:"vel",vels:{walking:A({...ut,z:0},V*Si)},stateDelta:{facing:ut}}}}if(Le(M)!==0)return F?{movementType:"vel",vels:{walking:A({...M,z:0},V)},stateDelta:{facing:M,action:"falling"}}:{movementType:"vel",vels:{walking:nl({vel:h,acc:os[G],deltaMS:r,maxSpeed:V,unitD:M,minSpeed:0})},stateDelta:{facing:M,action:"moving"}};if(d>0&&d<1){const ut=we(f,c)?1:0;return{movementType:"position",posDelta:A(c,ut-d),stateDelta:{action:F?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:F?"falling":"idle"}}},po=t=>Ce(t.movingItem)&&Fn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),si=(t,e)=>{let n=_;for(const o of e){if(o.movementType==="position"&&(n=E(n,o.posDelta)),o.movementType==="vel"&&(Ce(t)||W("lift")(t)))for(const[i,s]of Xo(o.vels)){const l={..._,...s};t.state.vels[i]=l}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},mo=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&U(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&po(t)){if(po(t)&&ti(t)){Zo({above:t.movingItem,below:t.touchedItem});const n=[ri(t.movingItem,t.room,t.gameState),ii(t.movingItem,t.room,t.gameState,t.deltaMS)];si(t.movingItem,n)}sr(t)}};function rl(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Dn=t=>{ti(t)&&lo(t),Ea(t)&&lo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ne(t,...Ln)&&Wa(t),Ge(t,...Ln)&&Ja(t),(Ge(t,"monster")&&ne(t,"firedDoughnut")||Ge(t,"firedDoughnut")&&ne(t,"monster"))&&rl(t),(Ge(t,"monster")||Ge(t,"movingPlatform"))&&Ha(t),ne(t,"switch")&&qa(t),ne(t,"joystick")&&Ya(t,Dn),t.touchedItem.state.disappear&&mo(t),t.movingItem.state.disappear&&ye(t.touchedItem,t.movingItem)&&mo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},il=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:l}=i,{state:{position:a}}=t;if(!l)return;const c=ce(e.items).filter(Ko),u=s===null?ai(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;sl(e,i,u)}else{if(t.state.standingOnItemId===null||!li(t,Qo(e.items)))return;const h=rs({gameState:n,room:e,itemType:s.type,config:s.config,position:a});Tn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Dn}),i.carrying=null}},sl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,er({room:t,item:n})},ai=(t,e)=>Kr(t,ce(e.items).filter(Ko)),li=(t,e)=>{const n={position:E(t.state.position,{z:B.h})},o=is({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(ye(r,t)){if(!Ce(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!li(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},qt=-11,al={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const l=s?.state.standingOnItemId??null,a=l===null||i===void 0?null:i.items[l],c=a===null?!1:a.type==="teleporter"&&ct(a),u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?vt({colourise:n,button:t}):r;if(o?.pressed!==u&&yt(d,u),c!==o?.standingOnTeleporter)if(c)Ne(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=so(t,n,"JUMP");f.y=qt,Ne(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const l=i&&Qe(i),a=l?.hasBag??!1,c=l?.carrying??null,u=c===null&&s!==void 0&&ai(i,s)!==void 0,d=t.actions.every(y=>e.currentActionPress(y)!=="released"),f=a&&!u&&c===null,h=r===null?vt({colourise:n,button:t}):r;if(h.visible=a,a&&(f!==o?.disabled&&io(h,f,n),h.visible=!0,o?.pressed!==d&&yt(h,d),a!==o?.hasBag||c!==o?.carrying)){let y;c!==null?y=Zr(c):a&&(y=p({textureId:"bag",y:-2})),Ne(h,y)}return{output:h,renderProps:{pressed:d,hasBag:a,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&Tt(i),l=s?.hasHooter??!1,a=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?vt({colourise:n,button:t}):r,d=l||ot(a)>0;if(u.visible=d,d&&(o?.pressed!==c&&yt(u,c),l!==o?.hasHooter||a!==o?.doughnuts)){let f;l?f=p({textureId:"hooter",y:-3}):ot(a)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=Oe(new b,a);h.y=qt,h.filters=ee,Ne(u,f,h),io(u,a===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:a,hasHooter:l}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const l=(i&&Qe(i))?.hasBag??!1,a=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||a!==o.pressed||n!==o.colourise||l!==o.hasBag))return"no-update";let u;if(r===null){u=vt({colourise:n,button:t});const d=so(t,n,"C+J");d.y=qt,Ne(u,d)}else u=r;return l?(u.visible=!0,o?.pressed!==a&&yt(u,a)):u.visible=!1,{output:u,renderProps:{pressed:a,hasBag:l,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=Q,{output:e,renderProps:pe}},map({previousRendering:t}){if(t!==null)return"no-update";const e=He({label:"mapText",outline:!0});return qr(e,"MAP"),{output:e,renderProps:pe}}};class Te extends Yr{constructor(e){const n=al[e.button.which];super(e,n)}}const ll=30,cl=15,ul=42,dl=36,fl=44,hl=20;class pl{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Te({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new Te({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new Te({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new Te({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new Te({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new Te({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new Da({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:l}=this.#n;for(const{renderContext:{button:{which:a}},output:c}of te(i))a==="menu"||a==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=cl,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=ll,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(l.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of te(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-fl,this.#n.mainButtonNest.y=e.y-hl,this.#n.joystick.output.x=ul,this.#n.joystick.output.y=e.y-dl,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of te(this.#n.buttons))r.tick({...e,currentPlayable:Ee(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Vo.frames.button.frame;const ml=250,gl=t=>t?48:24,bl=t=>t?68:56,vl=(t,e)=>t?e.x/2-24:80,yl=t=>t?72:24,xl=t=>t?88:0,go=112,Ve=t=>t==="heels"?1:-1;class wl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Nt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[ro],this.#t.fps.y=St.h,this.#o(),n&&(this.#n=new pl({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#a("head"),livesText:He({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#a("heels"),livesText:He({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:He({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Nt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const l=new ze({texture:ae().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:oo,y:n?0:8});s.addChild(l);const a=He({outline:r==="text-only"});return a.y=n?0:16,a.x=l.x=St.w/2,s.addChild(a),o&&(a.visible=!1),r===!0&&(s.filters=ee),{text:a,icon:l,container:s}}#a(e){const n=new ze(ae().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ve("head")*go,this.#t.head.doughnuts.container.y=e.y-qe.h-8,this.#t.heels.carrying.container.y=e.y-qe.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ve("heels")*go,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-St.w*2}#s(e,n){return e?n?be:Ye:n?eo:Je}#c(e){const{renderContext:{gameState:n}}=this,o=ft(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:l}=this.#t.heels.carrying,a=l.children.length>0;if(i===null&&a)for(const c of l.children)c.destroy();i!==null&&!a&&l.addChild(Zr(i)),l.filters=this.#s(!0,s),this.#t.heels.bag.icon.filters=this.#s(r,s)}#l(e){const{renderContext:{gameState:n}}=this,o=ft(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#s(r,s),this.#t.head.doughnuts.icon.filters=this.#s(i!==0,s),Oe(this.#t.head.doughnuts.text,i)}#u(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ft(r,e),{text:s,container:l}=this.#t[e].shield,{text:a,container:c}=this.#t[e].extraSkill,u=It(i),d=u>0||!o;l.visible=d,d&&(Oe(s,u),l.y=n.y-xl(o)),c.x=l.x=(n.x>>1)+Ve(e)*vl(o,n);const f=i===void 0?0:e==="head"?Gr(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(Oe(a,f),c.y=n.y-yl(o))}#d(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#d(r,e),s=this.#t[e].sprite,{renderContext:{colourise:l}}=this;i?s.filters=l?be:Ye:s.filters=l?eo:Je,s.x=(n.x>>1)+Ve(e)*bl(o),s.y=n.y-qe.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ft(r,e)?.lives??0,l=this.#t[e].livesText;l.x=(n.x>>1)+Ve(e)*gl(o),l.y=n.y,Oe(l,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=_n(n.color),{colourise:r,gameState:i}=this.renderContext;Je.targetColor=o.hud.dimmed[r?"dimmed":"original"],Pn.targetColor=o.hud.dimmed[r?"basic":"original"],oo.targetColor=o.hud.icons[r?"basic":"original"],Ye.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?bt.colourised.head[this.#d(i,"head")?"active":"inactive"]:bt.original,this.#t.heels.livesText.filters=r?bt.colourised.heels[this.#d(i,"heels")?"active":"inactive"]:bt.original}#f=ss;#g(){if(as(w.getState())){if(performance.now()>this.#f+ml){const e=je.shared.FPS;Oe(this.#t.fps,Math.round(e)),ro.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#f=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Nt)this.#p(n,e),this.#h(n,e),this.#u(n,e);this.#i(e),this.#l(e),this.#c(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const bo={movementType:"vel",vels:{gravity:_}},Cl=(t,e,n,o)=>{if(!ye(t))return bo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,a=ls[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Re(s,e);return W("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-sn*o,-a)}}}:bo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-sn*o,-a)}}}},vo=B.h,yo=.001,Sl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=Rn**2/(2*Ue);if(n==="up"){if(e<=o)return Math.max(yo,Math.sqrt(2*Ue*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(yo,Math.sqrt(2*Ue*r))}else return Rn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Ue*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Ue*Math.max(e,0))):-.036};function Tl({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}}){const r=t*vo,i=e*vo,s=Sl({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const l=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:l}}}const xo={movementType:"vel",vels:{movingFloor:_}},kl=(t,e,n,o)=>{if(U(t)&&t.state.teleporting!==null)return xo;const{state:{standingOnItemId:r}}=t,i=Re(r,e);if(i===null||!W("conveyor")(i))return xo;const{config:{direction:s}}=i,a=W("heels")(t)&&t.state.action==="moving"&&wn(t.state.facing)===cs(s)?me.heels:us;return{movementType:"vel",vels:{movingFloor:A(rn[s],a)}}};function*Il(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Ol=B.w*Math.sqrt(2)+1,Bl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:l,doughnutLastFireTime:a,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=xe(d);if(r.currentActionPress("fire")==="tap"&&l&&ot(s)>0&&a+f<c){const m={type:"firedDoughnut",...ds,config:pe,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:E(u,A(h,Ol),t.type==="headOverHeels"?{z:B.h}:_),vels:{fired:A(h,me.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};Cn({room:e,item:m}),i.doughnuts=re(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},ci=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),_l=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),wt=B.w*3,Pl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-wt&&n.x<o.x+wt&&n.y>o.y-wt&&n.y<o.y+wt},wo=(t,e,n,o,r)=>{if(r&&t.state.activated)return J;const i=An(t.state.position,e);return i===void 0?J:Pl(t,i)?ci:_l},Fl=(t,e,n,o)=>t.state.activated?J:at(t.state.stoodOnBy,e).some(U)?ci:J,Al=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return wo(t,e,n,o,!0);case"while-player-near":return wo(t,e,n,o,!1);case"on-stand":return Fl(t,e);case"off":case"on":return J;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Dl=2;function*Ml(t,e,n,o){Ce(t)&&(yield Cl(t,e,n,o),yield kl(t,e),yield*Il(t,e)),U(t)&&(yield ii(t,e,n,o),t.id===n.currentCharacterName&&(yield Za(t,e,n,o),yield ri(t,e,n),fs(t)&&il(t,e,n,o),hs(t)&&Bl(t,e,n))),ps(t)&&(yield Tl(t)),ms(t)&&(yield Al(t,e,n,o),yield ja(t,e,n,o))}const zl=(t,e,n,o)=>{if(!Ce(t)||t.state.standingOnItemId===null)return;const r=Re(t.state.standingOnItemId,e);U(t)&&r.type==="pickup"&&ei({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||U(t)&&r.state.disappear==="onTouchByPlayer")&&sr({touchedItem:r,gameState:n,room:e})},Ll=(t,e,n,o)=>{if(U(t)&&t.state.standingOnItemId!==null){const a=Re(t.state.standingOnItemId,e);(Ho(a)||a.type==="spikes")&&Qr({room:e,movingItem:t})}const r=[...Ml(t,e,n,o)];zl(t,e,n);let i=si(t,r);(Ce(t)||W("lift")(t)||W("firedDoughnut")(t))&&(i=E(i,...le(te(t.state.vels)).map(a=>A(a,o))));const s=Math.ceil(Le(i)/Dl),l=A(i,1/s);for(let a=0;a<s;a++)Tn({subjectItem:t,posDelta:l,gameState:n,room:e,deltaMS:o,onTouch:Dn})},Rl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=re(e.state.head.lives,-1),e.state.heels.lives=re(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,re(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=ot(e.state.head.lives)>0,i=ot(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,fe(t,e);const u=En(e)[c],d=Fe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Un(u)};return}if(t.entryState.headOverHeels!==void 0){fe(t,e);const c=Fe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=En(e);if(fe(t,c),fe(t,u),yn(c,u)){const d=tr({head:c,heels:u});fe(t,d,"heels");const f=Fe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Un(d)};return}else{const d=Fe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Fe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=bs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??pe});for(const i of e)Cn({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Hs(r,t);return r},fe=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},El=(t,e)=>{const n=nr(t,or(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];fe(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const l=tr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});fe(t,l);const a=Fe({gameState:t,playableItems:[l],roomId:o.id});t.characterRooms={headOverHeels:a},t.currentCharacterName="headOverHeels";return}Cn({room:o,item:e});return}else{const s=Fe({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Ul=(t,e)=>{e.type==="headOverHeels"?Rl(t,e):El(t,e),Ee(t)===void 0&&w.dispatch(gs({offerReincarnation:!0}))},$l=t=>{for(const e of ce(t.items))for(const n of at(e.state.stoodOnBy,t)){if(!t.items[n.id]){$n(n,t);continue}if(!Fn(n,e)){$n(n,t);const o=Kr(n,Qo(t.items));o!==void 0&&Zo({above:n,below:o})}}},Nl=2*qs,Gl=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Nl,positionDelta:n})},Vl=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Yo(o.state.position,r),z:0};if(!we(s,_))for(const l of at(o.state.stoodOnBy,e))Gl(l,e,s)}},Xl=(t,e)=>{for(const n of ce(t.items))!Ce(n)||t.roomTime===n.state.actedOnAt.roomTime||vs(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=ys(n.state.position),e.add(n))},jl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Hl=t=>{for(const e of ce(t.items)){const n=e.state.position;e.state.position=xs(n)}},ql=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},Wl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Ee(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=nr(t,or(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Jl=(t,e)=>{const n=De(t);if(n===void 0)return rr;Wl(t,n,e);const o=Object.fromEntries(ws(n.items).map(([s,l])=>[s,l.state.position]));Cs(t);for(const s of te(n.items))jl(s,n)&&(er({room:n,item:s}),U(s)&&Ul(t,s));const r=Object.values(n.items).sort(ql);for(const s of r){const l=Ee(t);if(l===void 0||l.state.action==="death")break;if(n.items[s.id]!==void 0)try{Ll(s,n,t,e)}catch(a){throw console.error(a),new Error(`error caught while ticking item ${s.id}: ${a}`)}}$l(n),Hl(n);const i=new Set(le(te(n.items)).filter(s=>o[s.id]===void 0||!we(s.state.position,o[s.id])));return Vl(i,n,o),Xl(n,i),i},Co=(t,e)=>{const n=S(t),o=S(E(t,{x:e.x,z:e.z})),r=S(E(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Wt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,Yl=(t,e,n,o)=>{const r=Co(t,e),i=Co(n,o),s=r.topLeft.x,l=r.topRight.x,a=i.topLeft.x,c=i.topRight.x,u=Wt(s,l,a,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,y=Wt(d,f,h,m),T=r.topLeft.y+r.topLeft.x/2,P=r.bottomCentre.y+r.bottomCentre.x/2,F=i.topLeft.y+i.topLeft.x/2,D=i.bottomCentre.y+i.bottomCentre.x/2,G=Wt(T,P,F,D);return u&&y&&G},Zl=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!Yl(n,o,r,i))return 0;for(const s of Ss){const l=t.state.position[s],a=l+o[s],c=e.state.position[s],u=c+i[s];if(a<=c)return 1*(s==="z"?-1:1);if(l>=u)return-1*(s==="z"?-1:1)}return So(e)-So(t)},So=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ot extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Kl=t=>{const e=Ql(t);let n=e.length,o=n;const r=new Array(n),i={},s=ec(e);for(;o--;)i[o]||l(e[o],o,new Set);return r;function l(a,c,u){if(u.has(a))throw new Ot([a],!1);if(i[c])return;i[c]=!0;const d=t.get(a)||new Set,f=Array.from(d);if(c=f.length){u.add(a);do{const h=f[--c];try{l(h,s.get(h),u)}catch(m){throw m instanceof Ot?m.hasClosedCycle?m:new Ot([a,...m.cyclicDependency],m.cyclicDependency.includes(a)):m}}while(c);u.delete(a)}r[--n]=a}};function Ql(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function ec(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const To=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ct=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},tc=(t,e=new Set(te(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Ct(n,r,s);for(const r of e)if(r.renders)for(const i of te(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=Zl(r,i);if(To(o,r,i),s===0){Ct(n,r.id,i.id),Ct(n,i.id,r.id);continue}const l=s>0?r.id:i.id,a=s>0?i.id:r.id;To(n,l,a),Ct(n,a,l)}return n},ui=(t,e,n=3)=>{try{return{order:Kl(t),impossible:!1}}catch(o){if(o instanceof Ot){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:ui(t,e,n-1).order,impossible:!0}}else throw o}};class nc extends Yr{}const ko=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Io=(t,e)=>{const n=new q;return ko(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),ko(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},oc={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class rc{constructor(e){this.renderContext=e;const{item:n}=e,o=oc[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),W("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new q().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new q().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new q({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Io(n.aabb,o)),n.renderAabb&&this.#e.addChild(Io(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new ba({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class ic{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const sc=(t,e)=>{const n=e.getLocalBounds(),o=On.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new ze({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Oo=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof ze?r:sc(t,r)};class ac{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=w.getState();n||(this.#e.filters=new pa({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,l=Oo(r,i,s);o.shadowMask.relativeTo==="top"&&(l.y-=o.aabb.z),s&&(l.y-=((s.z??1)-1)*B.h),this.#e.addChild(l),n||(this.#e.mask=l)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),l=o.state.position.z+o.aabb.z,a=ce(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:l}},aabb:{...o.aabb,z:Ts}},u=Object.groupBy(a,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":yn(c,d)?f?"update":"create":"noShadow"});for(const d of Jn(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=Oo(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of Jn(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...it(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Pt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const lc=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,cc=(t,e,n)=>{const r=ae().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ae().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},Xe=t=>z(({renderContext:{item:e}})=>ks(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),z=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:pe}:"no-update";function*uc({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Dt(t),i=r==="y"?1:16;function*s(l){if(e){if(n!==0){const a=p({textureId:`generic.door.floatingThreshold.${r}`,...kt(l,{y:-12*n})});a.filters=hn(o,r==="x"?"towards":"right",!0),yield a}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...kt(l,{})});for(let a=1;a<n;a++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...kt(l,{y:-a*B.h})})}}yield*s(k({...ie,[r]:1})),yield*s(ie),e||(yield p({pivot:{x:16,y:B.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...k({...ie,[r]:1})}))}const di=(t,e)=>{const n=Dt(t),o=st(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):ie},dc=z(({renderContext:{item:t,room:e}})=>nt(uc(t,e),new b({filters:oe(e),...di(t.config.direction,t.aabb)}))),fc=z(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Dt(t),l=i.rooms[n];return p({textureId:cc(r,s,e),filter:oe(l),...di(t,o)})}),Jt={animationId:"bubbles.cold"},Ae=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},fi=Symbol(),hi=Symbol(),hc=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[fi]=t,n[hi]=e,n},pc=`#version 300 es

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
`;class Bo extends Y{constructor(e){const n=N.from({vertex:lt,fragment:pc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const mc=({name:t,action:e,facingXy8:n,teleportingPhase:o,paused:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:r};if(o==="out")return{animationId:`${t}.fadeOut`,paused:r};if(o==="in")return{animationId:`${t}.fadeOut`,paused:r};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:r};if(e==="falling"){const s=`${t}.falling.${n}`;if(Bs(s))return{textureId:s}}const i=`${t}.idle.${n}`;return _s(i)?{animationId:i,paused:r}:{textureId:`${t}.walking.${n}.2`}},mn=Symbol(),gn=Symbol(),gc=(t,e)=>{t[mn].removeChildren(),t[mn].addChild(p(mc(e)))},Yt=(t,e,n)=>{const o=new b,r=new b;o[mn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new ue({pastelBlue:g.pink}):be,flipX:t==="heels"});return o[gn]=i,o},_o=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Os>t,bc=t=>{if(!Ze(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Nn<Nn*.15},Po=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Fo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?be:t.filters},vc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Po(r,new Me({outlineColor:Pe[t],upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Fo(r,Me);const s=o?.flashing??!1;n&&!s?Po(r,new Bo(Pe[t])):!n&&s&&Fo(r,Bo)},yc=(t,e,n)=>{e&&!n?t.addChild(t[gn]):!e&&n&&t.removeChild(t[gn])},Zt=(t,e,n,o,r,i)=>{n&&gc(e,{name:t,...o,paused:r}),vc(t,o,i,e),yc(e,o.shining,i?.shining??!1)},Kt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:l,teleporting:a}}=e,c=vn(l)??"towards",u=e.type==="headOverHeels"?_o(e.state.head,"headOverHeels","headOverHeels"):_o(e.state,e.type,n.currentCharacterName),d=bc(e),f=Nr(e),h=Le(l),m=a?.phase??null,y={action:s,facingXy8:c,teleportingPhase:m,flashing:d,highlighted:u,shining:f},T=t===void 0||t.action!==s||t.facingXy8!==c||t.teleportingPhase!==m;let P;if(i==="headOverHeels"){P=r??hc({top:Yt("head",!0,o),bottom:Yt("heels",!0,o)});const F=P;Zt("head",F[fi],T,y,o,t),Zt("heels",F[hi],T,y,o,t)}else P=r??Yt(i,!1,o),Zt(i,P,T,y,o,t);return s==="moving"&&r instanceof tt&&(r.animationSpeed=h*Is),{output:P,renderProps:y}},xc=(t,e)=>{const n=([s,l])=>l.config.direction==="away"||l.config.direction==="left",o=new b({label:"floorOverdraws",...k({x:-e.x,y:-e.y})}),r=nt(le(Pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:l,direction:a},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...k(c),times:l,anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"floorOverdraws"})),i=nt(le(Pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:l},position:a}])=>a.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...k(kt(a,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:l==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...k({...a,z:0}),times:{[st(et(l))]:2},anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},wc=t=>[...le(te(t.items)).filter(e=>e.type==="wall").filter(e=>et(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],Cc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Sc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new q().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(k),!0).fill(0),Tc=z(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:l,edgeRightX:a}=zt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const F=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,D=new b;for(let M=-1;M<=r+2;M++)for(let V=M%2-1;V<=i+2;V+=2)D.addChild(Ps({x:M+(s.right?-.5:0),y:V+(s.towards?-.5:0)},p({textureId:F})));D.addChild(xc(h,{x:n,y:o}));const G=new q().poly([ie,k({x:c,y:0}),k({x:c,y:u}),k({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});D.addChild(G),D.filters=oe(t),D.mask=G,m.addChild(D)}const y=wc(h),T=new q().poly([{x:l,y:16},{x:l,y:-999},{x:a,y:-999},{x:a,y:16}],!0).fill(16776960);m.addChild(T);const P=Cc(y);if(P!==void 0){const F=Sc({extraWallRanges:P,blockXMin:n,blockYMin:o});m.addChild(F)}return m.mask=T,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),kc=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=k({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return le(Pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,l])=>{const{config:{direction:a},position:c}=l,u=a==="right"&&c.x===0,d=a==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${a}`,...k(f),times:l.type==="wall"?l.config.times:{[st(et(a))]:2}});i[a].addChild(h),a==="right"&&c.y===0&&e<0&&i[a].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${a}`,...k(E(f,{y:-.5}))})),a==="towards"&&c.x===0&&t<0&&i[a].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${a}`,...k(E(f,{x:-.5}))}))}),i},Ic=z(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:l}=zt(e.roomJson),a=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new q({label:"overDrawToHideFallenItems"}).poly([k({x:a,y:0}),k({x:0,y:0}),k({x:0,y:c}),{...k({x:0,y:c}),y:999},{...k({x:a,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=kc({blockXMin:n,blockYMin:o},e.roomJson);f.filters=hn(e,"towards",t),h.filters=hn(e,"right",t),u.addChild(f),u.addChild(h);const m=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Oc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Bc=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,l=s?Sa:i?void 0:Oc.includes(t.which)?jr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=wn(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const u={facingXy4:a,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${a}`,filter:l}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${a}`,filter:l}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${a}`,filter:l}:{textureId:`${t.which}.${a}.1`,filter:l}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Ae({top:{textureId:`${t.which}.${a}`,filter:l||oe(n)},bottom:{...Jt,paused:o}}):p({textureId:`${t.which}.${a}`,filter:l}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Ae({top:`${t.which}.${a}`,filter:l}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:l}:{textureId:`${t.which}.1`,filter:l}),renderProps:c};case"homingBot":return{filter:l,output:p({textureId:t.which,filter:l}),renderProps:c};case"bubbleRobot":return{output:Ae({top:{...Jt,paused:o},filter:l}),renderProps:c};case"emperorsGuardian":return{output:Ae({top:"ball",bottom:{...Jt,paused:o},filter:l}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:l,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},rt=t=>{for(const e in t)return!0;return!1},_c=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Qt=g.moss,Ao=()=>z(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Pc={head:Kt,heels:Kt,headOverHeels:Kt,doorFrame:fc,doorLegs:dc,monster:Bc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:z(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=st(et(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const l=p({textureId:lc(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:We.w,y:We.h+1}:{x:0,y:We.h+1},filter:oe(o)}),a=k({[r]:s});l.x+=a.x,l.y+=a.y,i.addChild(l)}return i}),barrier:z(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:z(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?oe(n):void 0,times:e})),spikes:Xe("spikes"),slidingDeadly:Ao(),slidingBlock:Ao(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:_c(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?oe(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?xn(w.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=rt(n);if(!(r===void 0||r.moving!==i))return"no-update";const l=new b,a=et(t);return l.addChild(p(i?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${a}.6`,times:e})),{output:l,renderProps:{moving:i}}},lift:z(({renderContext:{paused:t}})=>{const e=new b,n={x:qe.w/2,y:qe.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=ct(t),l=s&&at(r,e).find(U)!==void 0;return o===void 0||s!==o.activated||l!==o.flashing?{output:l?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:l,activated:s}}:"no-update"},pickup:z(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:oe(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:z(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=wn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Ae({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:Xe("joystick"),movingPlatform:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:z(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new Me({outlineColor:Qt,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=rt(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const l=o?.compressed??!1,a=e?new Me({outlineColor:Qt,lowRes:!1,upscale:w.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===l&&e!==o?.highlighted;let u;return c?(r.filters=a??No,u=r):u=p(!i&&l?{animationId:"spring.bounce",playOnce:"and-stop",filter:a,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:a}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new Me({outlineColor:Qt,upscale:w.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Ae({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Xe("hushPuppy"),bubbles:z(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Xe({animationId:"bubbles.doughnut"}),ball:Xe("ball"),floor:Tc,floorEdge:Ic};class Fc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const R=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:l=!1}=e,a=x.createBufferSource(),c=an()[o];return a.buffer=c,a.loop=i,a.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&l?a.start(0,c.duration*Math.random()):a.start(),r!==void 0&&a.connect(r),a},ke=(t,e,n)=>{const o=x.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},L=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1,noStartOnFirstFrame:i=!0},s)=>{let l=!0,a,c;return u=>{if(!!u!=!!c)u?t!==void 0&&!(l&&i)?(a?.stop(),a=R({...t}),ke(a,t.gain,s),n!==void 0&&(r?(a=R({...n,loop:!0}),ke(a,n.gain,s)):a.onended=()=>{c&&(a=R({...n,loop:!0}),ke(a,n.gain,s))})):n!==void 0&&(a=R({...n,loop:!0}),ke(a,n.gain,s)):(a&&a.loop&&(a.stop(),a.onended=null),o!==void 0&&(a=R({...o}),ke(a,o.gain,s)));else if(c!==u&&e!==void 0){const f=R({...e});ke(f,e.gain,s)}l=!1,c=u}};class Ac{constructor(e){this.renderContext=e,this.output.gain.value=4}output=x.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Dc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;switch(n.type){case"pickup":{n.gives!=="scroll"&&R({soundId:"bonus",connectTo:this.output});break}case"disappearing":{R({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,R({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=x.createGain();tick(){}destroy(){}}class Mc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n.connect(this.output),this.#n.gain.value=.3}output=x.createGain();#e=x.createGain();#n=x.createGain();#t=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o=L({start:{soundId:"metalHit"}},this.#n);tick(){const{renderContext:{item:e,room:{roomTime:n,items:o}}}=this,{state:{actedOnAt:{roomTime:r,by:i},collidedWith:{roomTime:s,by:l}}}=e,a=n===r&&le(ln(i)).some(u=>Fs(o[u]));this.#t(a);const c=n===s&&!lr(ln(l));this.#o(c)}destroy(){}}const en=2;class zc{constructor(e){this.renderContext=e}output=x.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:en},loop:{soundId:"conveyorLoop",playbackRate:en},stop:{soundId:"conveyorEnd",playbackRate:en}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=rt(e);this.#e(n)}destroy(){this.#e(!1)}}const Lc=3;class Rc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=R({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Lc*e)}destroy(){}}const Do={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Mo={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},zo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Lo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Ec{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Do[n]!==void 0&&(this.#r=L({start:Do[n]},this.#e)),Mo[n]!==void 0&&(this.#t=L({change:Mo[n]},this.#e)),Lo[n]!==void 0&&(this.#a=L(Lo[n],this.#e)),zo[n]!==void 0&&(this.#o=L({loop:zo[n]},this.#n))}output=x.createGain();#e=x.createGain();#n=x.createGain();#t;#o;#r;#a;tick(){const{renderContext:{item:e,room:{roomTime:n}}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,collidedWith:{roomTime:s,by:l},vels:{walking:a}}}=e;if(this.#t){const c=vn(o);this.#t(c)}if(this.#r){const c=n===s&&!lr(ln(l));this.#r(c)}if(this.#o){const c=r&&!i;this.#o(c)}if(this.#a){const c=!we(a,_);this.#a(c)}}destroy(){}}class tn{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output),this.#a.connect(this.output);const n=e.item.type;this.#n=L({loop:{soundId:`${n==="headOverHeels"?"heels":e.item.type}Walk`}},this.#e),this.#o=L({start:{soundId:`${n==="headOverHeels"?"head":e.item.type}Jump`}},this.#t),this.#r=L({loop:{soundId:`${n==="headOverHeels"?"head":e.item.type}Fall`}},this.#t)}output=x.createGain();#e=x.createGain();#n;#t=x.createGain();#o;#r;#a=x.createGain();#i=L({start:{soundId:"landing"},noStartOnFirstFrame:!0},this.#a);#s=x.createGain();#c=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#l={teleportingPhase:null,positionZ:0};tick(){const{renderContext:{item:e}}=this,{state:{action:n,teleporting:o,jumpStartZ:r,jumped:i,standingOnItemId:s,position:{z:l},vels:{gravity:{z:a}}}}=e,c=Qe(e),{teleportingPhase:u,positionZ:d}=this.#l,f=o?o.phase:null,h=i&&l>r&&l>d&&a>0,m=l<d&&a<0&&s===null;if(this.#r(m),this.#o(h),this.#n(!h&&!m&&n==="moving"),c!==void 0&&this.#c(c.carrying!==null),this.#i(s!==null),f!==null&&f!==u)if(f==="in"){const y=an().teleportIn,T=x.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}else{const y=an().teleportOut,T=x.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}this.#l={teleportingPhase:f,positionZ:l}}destroy(){}}class Uc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=rt(e);!o&&r&&R({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class $c{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=x.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Nc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=rt(e);n&&!o&&R({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Gc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?xn(w.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&R({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Vc{constructor(e){this.renderContext=e}output=x.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(ct(e)&&at(e.state.stoodOnBy,n).some(U))}destroy(){}}class Xc{constructor(e){this.renderContext=e,R({soundId:"hooter",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}const jc={lift:Rc,switch:Gc,bubbles:Dc,head:tn,heels:tn,headOverHeels:tn,teleporter:Vc,monster:Ec,conveyor:zc,spring:Nc,portableBlock:Uc,charles:Mc,ball:Ac,pushableBlock:$c,firedDoughnut:Xc},Hc=t=>{const e=jc[t.item.type];if(e)return new e(t)},qc=B.h*As,Wc=B.h*-1,Jc=B.w*16,Yc=0,nn=(t,e,n)=>(t-e)/(n-e)*2-1;class Zc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const{room:{size:{y:o,x:r}}}=e;this.positionMinX=Gt(Gn({x:0,y:o})),this.positionMaxX=Gt(Gn({x:r,y:0}))}output=x.createPanner();positionMinX;positionMaxX;tick(e){this.childRenderer.tick(e);const{item:n}=this.renderContext,o=n.state,r=E(o.position,A(n.aabb,.5)),i=nn(Gt(r),this.positionMaxX,this.positionMinX),s=nn(r.z,Wc,qc),l=nn(r.x+r.y,Yc,Jc);this.output.positionX.value=i,this.output.positionY.value=s,this.output.positionZ.value=l}destroy(){this.childRenderer.destroy()}}const Kc=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Qc=t=>t.item.shadowMask!==void 0,eu=t=>{const e=w.getState(),n=Ds(e),o=Ms(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",l=[];if(t.item.renders){const d=Pc[r.type],f=new nc(t,d);l.push(f),s&&(f.output.alpha=.66),o&&Qc(t)&&l.push(new ac(t))}s&&l.push(new rc(t));let a;if(l.length===0)a=void 0;else{const d=l.length===1?l[0]:new tu(l,t);Kc(r,d.output,i),a=new ic(t,d)}const c=t.paused?void 0:Hc(t),u=c===void 0?void 0:new Zc(t,c);return new Fc(t,{graphics:a,sound:u})};class tu{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Ie=.33,nu=zs()==="mobile"?-4:16,bn=We.h-We.w/2,ou=me.heels,ru=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=zt(t.roomJson),l=o+i.x,a=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-nu-i.y-Math.abs(c/2)},d=u.x+l<0,f=u.x+a>n.x,h=u.y+s-bn<0;return(m,y,T)=>{if(m===void 0)return;const P=S(m.state.position),F=E(P,u),D={x:d&&F.x<n.x*Ie?Math.min(-l,n.x*Ie-P.x):f&&F.x>n.x*(1-Ie)?Math.max(n.x-a,n.x*(1-Ie)-P.x):u.x,y:h&&F.y<n.y*Ie?n.y*Ie-P.y:u.y};if(T)e.x=D.x,e.y=D.y;else{const G=ou*y,M=it(e,D),V=Jo(M);if(V>G){const $t={x:M.x/V,y:M.y/V};e.x-=$t.x*G,e.y-=$t.y*G}else e.x=D.x,e.y=D.y}}},iu=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=zt(t);return new q().rect(e+o.x,r-bn,n-e,o.y-r+bn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class su{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=w.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??ir.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(iu(e.room.roomJson)),this.#s=ru(e.room,this.#t,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=x.createGain();output={sound:this.#o,graphics:this.#t};#r=!1;#a=new Map;#i=new Map;#s;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?ka:be:new $(_n(n).main.original)}#c(e){const{room:n}=this.renderContext;for(const o of ce(n.items)){let r=this.#i.get(o.id);if(r===void 0){r=eu({...this.renderContext,item:o}),this.#i.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:l}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),l&&l.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#i.entries())n.items[o]===void 0&&(r.destroy(),this.#i.delete(o))}#l(e){const{order:n}=ui(tc(this.renderContext.room.items,e.movedItems,this.#a),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#i.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(ce(this.renderContext.room.items))};this.#s(Ee(this.renderContext.gameState),n.deltaMS,!this.#r),this.#c(n),(!this.#r||n.movedItems.size>0)&&this.#l(n),this.#r=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#i.forEach(e=>{e.destroy()})}}var Et=`in vec2 aPosition;
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
}`,au=`precision highp float;
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
`,lu=`struct CRTUniforms {
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
}`,cu=Object.defineProperty,uu=(t,e,n)=>e in t?cu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Bt=(t,e,n)=>(uu(t,typeof e!="symbol"?e+"":e,n),n);const pi=class mi extends Y{constructor(e){e={...mi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:lu,entryPoint:"mainFragment"}}),o=N.from({vertex:Et,fragment:au,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Bt(this,"uniforms"),Bt(this,"seed"),Bt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Bt(pi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let du=pi;var fu=`
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
}`,hu=`struct KawaseBlurUniforms {
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
}`,pu=`
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
`,mu=`struct KawaseBlurUniforms {
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
}`,gu=Object.defineProperty,bu=(t,e,n)=>e in t?gu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>(bu(t,typeof e!="symbol"?e+"":e,n),n);const gi=class bi extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ke("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...bi.DEFAULT_OPTIONS,...n};const o=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:n?.clamp?mu:hu,entryPoint:"mainFragment"}}),r=N.from({vertex:Et,fragment:n?.clamp?pu:fu,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),de(this,"uniforms"),de(this,"_pixelSize",{x:0,y:0}),de(this,"_clamp"),de(this,"_kernels",[]),de(this,"_blur"),de(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let l;if(this._quality===1||this._blur===0)l=this._kernels[0]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,n,o,r);else{const a=_e.getSameSizeTexture(n);let c=n,u=a,d;const f=this._quality-1;for(let h=0;h<f;h++)l=this._kernels[h]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;l=this._kernels[f]+.5,this.uniforms.uOffset[0]=l*i,this.uniforms.uOffset[1]=l*s,e.applyFilter(this,c,o,r),_e.returnTexture(a)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};de(gi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let vu=gi;var yu=`in vec2 vTextureCoord;
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
`,xu=`struct AdvancedBloomUniforms {
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
`,wu=`
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
`,Cu=`struct ExtractBrightnessUniforms {
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
`,Su=Object.defineProperty,Tu=(t,e,n)=>e in t?Su(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,vi=(t,e,n)=>(Tu(t,typeof e!="symbol"?e+"":e,n),n);const yi=class xi extends Y{constructor(e){e={...xi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:Cu,entryPoint:"mainFragment"}}),o=N.from({vertex:Et,fragment:wu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),vi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};vi(yi,"DEFAULT_OPTIONS",{threshold:.5});let ku=yi;var Iu=Object.defineProperty,Ou=(t,e,n)=>e in t?Iu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Be=(t,e,n)=>(Ou(t,typeof e!="symbol"?e+"":e,n),n);const wi=class Ci extends Y{constructor(e){e={...Ci.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:xu,entryPoint:"mainFragment"}}),o=N.from({vertex:Et,fragment:yu,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:he.WHITE}}),Be(this,"uniforms"),Be(this,"bloomScale",1),Be(this,"brightness",1),Be(this,"_extractFilter"),Be(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new ku({threshold:e.threshold}),this._blurFilter=new vu({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=_e.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=_e.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),_e.returnTexture(s),_e.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Be(wi,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Bu=wi;const _u=pe,Pu=(t,e)=>(n,o)=>{const r=o*n.gameSpeed,i=Math.ceil(r/e);if(i===1)return t(n,r);const s=r/i,l=new Set;for(let c=0;c<i;c++){const u=t(n,s);for(const d of u)l.add(d)}const a=De(n)?.items??_u;for(const c of l)a[c.id]===void 0&&l.delete(c);return l},Ro=({crtFilter:t},e)=>[t?new du({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Bu({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Fu{constructor(e,n){this.app=e,this.#i=e,this.#s=n;try{const o=w.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#a.connect(x.destination),e.stage.addChild(this.#r),e.stage.scale=r,De(n)===void 0)throw new Error("main loop with no starting room");this.#u()}catch(o){this.#l(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#a=x.createGain();#i;#s;#c=Pu(Jl,Ns);#l(e){console.error(e),w.dispatch(Ls(Rs(e,"message","stack")))}#u(){const{gameMenus:{userSettings:{displaySettings:e}}}=w.getState();this.#e=Ro(e,!0),this.#n=Ro(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#l(n)}};tick=({deltaMS:e})=>{const n=w.getState(),o=Es(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=w.getState(),s=!o&&!(r?.uncolourised??ir.displaySettings.uncolourised),l=Us(n),a=$s(n);(this.#t?.renderContext.colourise!==s||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==a)&&(this.#t?.destroy(),this.#t=new wl({colourise:s,gameState:this.#s,inputDirectionMode:a,onScreenControls:l}),this.#i.stage.addChild(this.#t.output));const c=De(this.#s);this.#t.tick({screenSize:i.gameEngineScreenSize,room:c});const u=o?rr:this.#c(this.#s,e),d=De(this.#s);(this.#o?.renderContext.room!==d||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),d?(this.#o=new su({gameState:this.#s,room:d,paused:o,pixiRenderer:this.#i.renderer,displaySettings:r,colourised:s,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#a),this.#s.events.emit("roomChange",d.id)):this.#o=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#u()),this.#o?.tick({progression:this.#s.progression,movedItems:u,deltaMS:e}),o?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#n};start(){return this.#i.ticker.add(this.tickAndCatch),this}stop(){this.#i.stage.removeChild(this.#r),this.#a.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#i.ticker.remove(this.tickAndCatch)}}At.add(ur,dr,fr,hr,pr,mr,gr,br,vr,yr,xr,Cr,wr,Sr,Tr,kr,Ir,Or,Br,_r,Pr);Xs.defaultOptions.scaleMode="nearest";const Eo=async(t,e)=>{const n=new Er;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}}),n.ticker.maxFPS=Gs;const o=w.getState().gameMenus.currentGame,r=Vn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?w.dispatch(Vs(o.store.gameMenus)):(w.dispatch(Xn(r.characterRooms.head.id)),w.dispatch(Xn(r.characterRooms.heels.id)));const i=new Fu(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const l=Ee(r);l!==void 0&&Sn({playableItem:l,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return De(r)},get gameState(){return r},reincarnateFrom(s){Vn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Ru=Object.freeze(Object.defineProperty({__proto__:null,default:Eo,gameMain:Eo},Symbol.toStringTag,{value:"Module"}));export{Mr as A,Fr as C,Y as F,On as R,sa as S,zr as V,da as a,Ru as g,ia as u};
