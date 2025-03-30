const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-CBTIpvKc.js","assets/App-CM7XnMd5.js","assets/index-BnhwGZOO.js","assets/index-dG3WBgIR.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CGpwrgdJ.js","assets/Graphics-DtABmyDz.js","assets/swopCharacters-_BYV6fZv.js","assets/WebGLRenderer-Ca0-xjqy.js"])))=>i.map(i=>d[i]);
import{aO as Ii,a8 as jo,I as Oi,L as ve,N as $,t as Vo,J as pe,E as C,g as Dt,f as _i,C as b,d as Ye,v as Bt,a6 as v,D as rn,_ as De,T as Xe,U as Bi,V as Pi,aP as Fi,aQ as Ai,aR as Di,q as Mi,aS as ut,ae as le,aT as zi,aU as K,aj as Xo,aV as ce,aW as Ho,ar as Go,al as x,o as te,ac as _,aX as Li,aY as Ri,aZ as Ei,ag as D,a_ as Me,a$ as Ui,b0 as Cn,b1 as qo,b2 as $i,b3 as St,ad as U,b4 as Ni,i as oe,b5 as ji,b6 as Vi,b7 as Xi,b8 as Hi,as as Wo,ah as Mt,b9 as Rn,ba as Gi,bb as rt,bc as Jo,bd as ye,be as zt,p as it,at as xe,af as sn,an as se,bf as qi,bg as Wi,bh as Ji,bi as Yi,bj as Sn,a9 as Yo,bk as He,ai as Zi,bl as Qi,bm as Tn,bn as Ki,bo as es,bp as Zo,bq as ts,br as ns,bs as os,bt as rs,ao as Pt,bu as Tt,bv as is,bw as ss,bx as as,b as Ze,by as Ge,bz as w,bA as an,aq as ln,bB as ls,bC as cs,bD as us,bE as Qo,Y as _e,bF as ds,av as fs,bG as hs,bH as ps,bI as ms,bJ as gs,au as En,bK as bs}from"./App-CM7XnMd5.js";import{r as vs,l as cn,j as Ft,g as Un,k as $n,h as z,p as k,m as we,n as kn,q as ys,t as xs,u as un,v as Qe,w as kt,c as In,x as R,i as q,y as Ko,z as er,A as tr,B as me,C as Lt,D as On,E as ze,F as ws,G as Cs,H as Ss,I as dn,J as Ts,K as dt,L as ks,M as Is,N as Os,a as Ce,O as nr,P as or,Q as Nn,R as ue,S as rr,T as ir,f as _s,U as sr,V as Bs,b as Le,W as jt,X as ft,Y as Ps,Z as Re,_ as jn,$ as Fs,a0 as _n,a1 as As,a2 as st,a3 as Ds,a4 as Ms,a5 as zs,a6 as Ls,a7 as Vn,a8 as ar,e as lr,o as cr,a9 as Rs,aa as Xn,ab as Es,s as Ke,ac as Us,ad as Vt,ae as S,af as $s,ag as Ns,ah as js,ai as Hn,aj as Rt,ak as Vs,al as Xs,am as Xt,an as Gn}from"./swopCharacters-_BYV6fZv.js";import{S as Hs,G}from"./Graphics-DtABmyDz.js";import{g as ur,_ as qn}from"./index-BnhwGZOO.js";var ht={},Wn;function Gs(){if(Wn)return ht;Wn=1;var t=Ii(),e=t.mark(i),n=jo(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return f=d[u],y.delegateYield(r(f),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}ht.__concat=i;var s=o(i);return ht.concat=s,ht}var pt={},Jn;function qs(){if(Jn)return pt;Jn=1;var t=jo(),e=t.iterableCurry,n=vs(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}pt.__isEmpty=i;var s=e(i,{reduces:!0});return pt.isEmpty=s,pt}var Ht,Yn;function Ws(){return Yn||(Yn=1,Ht=Gs().concat),Ht}var Js=Ws();const fn=ur(Js);var Gt,Zn;function Ys(){return Zn||(Zn=1,Gt=qs().isEmpty),Gt}var Zs=Ys();const dr=ur(Zs),fr=class hn extends Oi{constructor(e){e={...hn.defaultOptions,...e},super(e),this.enabled=!0,this._state=Hs.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=ve.from(n)),o&&(s=$.from(o)),new hn({gpuProgram:i,glProgram:s,...r})}};fr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let J=fr;var Qs=`
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
`,Ks=`in vec2 aPosition;
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
`,ea=`
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
}`;class I extends J{constructor(e){const n=e.gpu,o=Qn({source:ea,...n}),r=ve.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Qn({source:Qs,...i}),a=$.from({vertex:Ks,fragment:s}),l=new Vo({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:pe.EMPTY}})}}function Qn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const Bn=`
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
    `,Pn=`
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
	`;class hr extends I{constructor(){super({gl:{functions:`
                ${Bn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Pn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}hr.extension={name:"color",type:C.BlendMode};class pr extends I{constructor(){super({gl:{functions:`
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
            `}})}}pr.extension={name:"color-burn",type:C.BlendMode};class mr extends I{constructor(){super({gl:{functions:`
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
                `}})}}mr.extension={name:"color-dodge",type:C.BlendMode};class gr extends I{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"darken",type:C.BlendMode};class br extends I{constructor(){super({gl:{functions:`
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
            `}})}}br.extension={name:"difference",type:C.BlendMode};class vr extends I{constructor(){super({gl:{functions:`
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
            `}})}}vr.extension={name:"divide",type:C.BlendMode};class yr extends I{constructor(){super({gl:{functions:`
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
            `}})}}yr.extension={name:"exclusion",type:C.BlendMode};class xr extends I{constructor(){super({gl:{functions:`
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
                `}})}}xr.extension={name:"hard-light",type:C.BlendMode};class wr extends I{constructor(){super({gl:{functions:`
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
            `}})}}wr.extension={name:"hard-mix",type:C.BlendMode};class Cr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"lighten",type:C.BlendMode};class Sr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Sr.extension={name:"linear-burn",type:C.BlendMode};class Tr extends I{constructor(){super({gl:{functions:`
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
            `}})}}Tr.extension={name:"linear-dodge",type:C.BlendMode};class kr extends I{constructor(){super({gl:{functions:`
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
            `}})}}kr.extension={name:"linear-light",type:C.BlendMode};class Ir extends I{constructor(){super({gl:{functions:`
                ${Bn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Pn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Ir.extension={name:"luminosity",type:C.BlendMode};class Or extends I{constructor(){super({gl:{functions:`
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
            `}})}}Or.extension={name:"negation",type:C.BlendMode};class _r extends I{constructor(){super({gl:{functions:`
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
                `}})}}_r.extension={name:"overlay",type:C.BlendMode};class Br extends I{constructor(){super({gl:{functions:`
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
                `}})}}Br.extension={name:"pin-light",type:C.BlendMode};class Pr extends I{constructor(){super({gl:{functions:`
                ${Bn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Pn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Pr.extension={name:"saturation",type:C.BlendMode};class Fr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Fr.extension={name:"soft-light",type:C.BlendMode};class Ar extends I{constructor(){super({gl:{functions:`
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
                `}})}}Ar.extension={name:"subtract",type:C.BlendMode};class Dr extends I{constructor(){super({gl:{functions:`
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
                `}})}}Dr.extension={name:"vivid-light",type:C.BlendMode};const pn=[];Dt.handleByNamedList(C.Environment,pn);async function ta(t){if(!t)for(let e=0;e<pn.length;e++){const n=pn[e];if(n.value.test()){await n.value.load();return}}}let Ee;function na(){if(typeof Ee=="boolean")return Ee;try{Ee=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Ee=!1}return Ee}var Mr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Mr||{});class oa{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const ra=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],zr=class Lr extends _i{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...ra,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await ta(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Lr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(Ye(Bt,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:v.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Mr.ALL);const{clear:o,clearColor:r,target:i}=e;v.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new oa(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!na())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};zr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Rr=zr,mt;function ia(t){return mt!==void 0||(mt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Rr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!rn.get().getWebGLRenderingContext())return!1;let o=rn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),mt}let gt;async function sa(t={}){return gt!==void 0||(gt=await(async()=>{const e=rn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),gt}const Kn=["webgl","webgpu","canvas"];async function aa(t){let e=[];t.preference?(e.push(t.preference),Kn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Kn.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await sa()){const{WebGPURenderer:a}=await qn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-CBTIpvKc.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&ia(t.failIfMajorPerformanceCaveat??Rr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await qn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-Ca0-xjqy.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Er="8.8.1";class Ur{static init(){globalThis.__PIXI_APP_INIT__?.(this,Er)}static destroy(){}}Ur.extension=C.Application;class la{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Er)}destroy(){this._renderer=null}}la.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const $r=class mn{constructor(...e){this.stage=new b,e[0]!==void 0&&Ye(Bt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await aa(e),mn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ye(Bt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=mn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};$r._plugins=[];let Nr=$r;Dt.handleByList(C.Application,Nr._plugins);Dt.add(Ur);var ca=`in vec2 aPosition;
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
`,ua=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,eo=`struct GlobalFilterUniforms {
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
}`;const jr=class Vr extends J{constructor(e){e={...Vr.defaultOptions,...e};const n=ve.from({vertex:{source:eo,entryPoint:"mainVertex"},fragment:{source:eo,entryPoint:"mainFragment"}}),o=$.from({vertex:ca,fragment:ua,name:"alpha-filter"}),{alpha:r,...i}=e,s=new Vo({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};jr.defaultOptions={alpha:1};let da=jr;class et extends De{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof pe?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Xe.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Xe.shared.add(this.update,this,Bi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(pe.from(e[o]));return new et(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(pe.from(e[o]));return new et(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof pe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Xe.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Xe.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class fa extends Pi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Fi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function ha(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ye(Bt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class pa extends fa{constructor(...e){const n=ha(e,"Text");super(n,Ai),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Di.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Fn extends pe{static create(e){return new Fn({source:new Mi(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}function ma(t){return{all:t=t||new Map,on:function(e,n){var o=t.get(e);o?o.push(n):t.set(e,[n])},off:function(e,n){var o=t.get(e);o&&(n?o.splice(o.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var o=t.get(e);o&&o.slice().map(function(r){r(n)}),(o=t.get("*"))&&o.slice().map(function(r){r(e,n)})}}}const ga=(t,e)=>{if(e)return zi(e.gameState.characterRooms,([o,r])=>[o,r.id]);const n={};for(const o of Object.values(t.rooms))for(const r of Object.values(o.items))if(r.type==="player"){const{which:i}=r.config;n[i]=o.id}if(n.head===void 0&&n.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return n},to=({campaign:t,inputStateTracker:e,savedGame:n,writeInto:o={}})=>{const r=ga(t,n),i={},s=n?n.gameState.characterRooms.head&&ut(n.gameState.characterRooms.head):r.head&&cn({roomJson:t.rooms[r.head],roomPickupsCollected:i[r.head]??le,isNewGame:n===void 0}),a=r.heels===r.head?s:n?n.gameState.characterRooms.heels&&ut(n.gameState.characterRooms.heels):r.heels&&cn({roomJson:t.rooms[r.heels],roomPickupsCollected:i[r.heels]??le,isNewGame:n===void 0}),l=n?.gameState.characterRooms.headOverHeels&&ut(n.gameState.characterRooms.headOverHeels),c={head:s,heels:a,headOverHeels:l};return Object.assign(o,{events:ma(),inputStateTracker:e,campaign:t,gameSpeed:1,...n?ut(n?.gameState):{currentCharacterName:r.head===void 0?"heels":"head",entryState:{head:s===void 0?void 0:Ft(Un("head",s?.items)),heels:a===void 0?void 0:Ft(Un("heels",a?.items))},pickupsCollected:i,gameTime:0,progression:0},characterRooms:c})},g={pureBlack:new v("#000000"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),pastelBlue:new v("#75ACFF"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},ge=t=>{const[e,n,o]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:o/2})},V={original:new v(K.zxWhite),basic:g.white,dimmed:g.lightGrey},X={original:new v(K.zxYellow),basic:g.midRed,dimmed:g.redShadow},Y={original:new v(K.zxMagenta),basic:g.pink,dimmed:ge(g.pink)},O={original:new v(K.zxCyan),basic:g.pastelBlue,dimmed:ge(g.pastelBlue)},Z={original:new v(K.zxGreen),basic:g.moss,dimmed:ge(g.moss)},An={white:{basic:{main:V,edges:{towards:O,right:X},hud:{lives:X,dimmed:Y,icons:O}},dimmed:{main:V,edges:{towards:Z,right:O},hud:{lives:X,dimmed:Y,icons:O}}},yellow:{basic:{main:X,edges:{towards:Z,right:V},hud:{lives:O,dimmed:Y,icons:Z}},dimmed:{main:X,edges:{towards:O,right:O},hud:{lives:O,dimmed:Y,icons:Z}}},magenta:{basic:{main:Y,edges:{towards:Z,right:O},hud:{lives:V,dimmed:O,icons:X}},dimmed:{main:Y,edges:{towards:Z,right:O},hud:{lives:V,dimmed:O,icons:X}}},cyan:{basic:{main:O,edges:{towards:Y,right:V},hud:{lives:V,dimmed:Z,icons:X}},dimmed:{main:O,edges:{towards:Y,right:V},hud:{lives:V,dimmed:Z,icons:X}}},green:{basic:{main:Z,edges:{towards:O,right:X},hud:{lives:V,dimmed:Y,icons:O}},dimmed:{main:Z,edges:{towards:O,right:X},hud:{lives:V,dimmed:Y,icons:O}}}},Dn=t=>An[t.hue][t.shade],Be={head:g.pastelBlue,heels:g.pink},It=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+$n>n?100-Math.ceil((n-e)/($n/100)):0},Xr=t=>t.type==="headOverHeels"?It(t.state.head)>0||It(t.state.heels)>0:It(t.state)>0,Hr=t=>{const e=100*z.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/z.w):0},ba={pureBlack:new v("#000000"),shadow:new v("#1B2D3B"),midGrey:new v("#505A55"),lightGrey:new v("#929981"),white:new v("#F8FEF8"),pastelBlue:new v("#4893FF"),metallicBlue:new v("#1D4E80"),pink:new v("#B973AF"),moss:new v("#6E7B00"),redShadow:new v("#513D40"),midRed:new v("#A7574B"),lightBeige:new v("#BF8E69"),highlightBeige:new v("#DBB269"),alpha:new v("#105A69"),replaceLight:new v("#048662"),replaceDark:new v("#052229")},at=`in vec2 aPosition;
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
`,va=`in vec2 vTextureCoord;
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
`;class de extends J{constructor(e){const n=Object.keys(e).length,o=$.from({vertex:at,fragment:va.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const ya=`precision mediump float;
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
`;class E extends J{uniforms;constructor(e="white"){const n=$.from({vertex:at,fragment:ya,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const xa=`precision mediump float;
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
`;class wa extends J{constructor(){const e=$.from({vertex:at,fragment:xa,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Gr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),qr=t=>Gr(An[t.color.hue][t.color.shade].main),Wr=t=>new de({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&qr(t)}),Ca=new de({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Sa=t=>new de({replaceLight:t,replaceDark:ge(t)}),gn=(t,e,n)=>n?new de(Gr(An[t.color.hue][t.color.shade].edges[e])):new E(Dn(t.color).edges[e].original),re=t=>new de(qr(t)),no=new wa,be=Xo,Ta=new de(ba),oo={x:.5,y:1},ro=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(ro(t)?c=ka(t):c=new De(ce().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const y=p({...t,times:void 0,label:`(${f},${h},${m})`}),T=k({x:f-1,y:h-1,z:m-1});y.x+=T.x,y.y+=+T.y,d.addChild(y)}return d}if(e===void 0&&o===void 0)if(ro(t))c.anchor=oo;else{const u=ce().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=oo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function ka({animationId:t,reverse:e,playOnce:n,paused:o}){const r=ce().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:Ho}));e&&s.reverse();const a=new et(s);return a.animationSpeed=Go.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Ia=`#version 300 es

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
`;class Ae extends J{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=$.from({vertex:at,fragment:Ia,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ee=new Ae({outlineColor:g.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),qe=new E,io=new E,bn=new E,so=new E(g.moss),We=new E,Q=[qe,ee],Oa=[We,ee],_a=[ee,bn],bt={original:[ee,We],colourised:{head:{active:[ee,new E(Be.head)],inactive:[ee,new E(ge(Be.head))]},heels:{active:[ee,new E(Be.heels)],inactive:[ee,new E(ge(Be.heels))]}}},Se=14,Ba=2,Pa=Math.cos(30*(Math.PI/180)),Fa=40;class Aa{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Se,y:-14,filter:Q}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Se,y:Se,filter:Q}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Se,filter:Q}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:Q}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Se*Math.SQRT2,filter:Q}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Se*Math.SQRT2,filter:Q}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:Q}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:Q})}:{}},this.output.addChild(this.#e),this.output.addChild(new G().circle(0,0,Fa).fill("#00000000"));for(const o of te(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?be:qe}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=_};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Li(x.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=Ri({x:-c,y:-u}),f=Ei(d,Pa),h=D(f,Ba);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(x.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Me(e)>Ui?Cn(e):void 0;for(const[r,i]of qo(this.arrowSprites))i.filters=r===o?Oa:Q}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const vn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey},zx:{jump:K.zxBlue,fire:K.zxYellow,carry:K.zxGreen,carryAndJump:K.zxRed,menu:K.zxWhite}};function tt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*Jr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${e[o]}`;$i(r),yield p({textureId:r,x:(o+.5-n/2)*St.w})}}function Ie(t,e){return t.removeChildren(),tt(Jr(e),t),t}function Da(t,e){return t.removeChildren(),tt(Jr(e),t),t}const At=Symbol(),Yr=Symbol(),Zr=Symbol(),vt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=Sa(vn.colourised[e]):o.filters=new E(vn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Yr]=r,o[At]=i,o[Zr]=n,o},Ue=(t,...e)=>{t[At].removeChildren();for(const n of e)n!==void 0&&t[At].addChild(n)},yt=(t,e)=>{t[Yr].texture=ce().textures[e?"button.pressed":"button"],t[Zr].y=e?1:0},ao=(t,e,n)=>{n&&(t[At].filters=e?Wr():be)},lo=({which:t},e,n)=>{const o=Da(new b,n);return o.filters=new de({white:e?ge(vn.colourised[t]):g.pureBlack}),o};class Qr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const Kr=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Ma=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},co=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Ma(t,e,n,o),Mn=(t,e,n=.001)=>{if(!we(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:kn({state:{position:U(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+Ni},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},ei=(t,e)=>{const o=[...oe(e).filter(i=>Mn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=ys(s,i);return a<0||a===0&&co(t,s)>co(t,i)?s:i})},Je=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<xs};function ti({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Xr(e)||Je(e)||(e.state.action="death",e.state.expires=t+un))}const ie=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,nt=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,ni=t=>{const{gameState:e,movingItem:n,touchedItem:{id:o,config:r},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:a}=e;if(a[i]?.[o]!==!0)switch(s[o]&&(a[i]===void 0&&(a[i]={}),a[i][o]=!0),r.gives){case"hooter":{const l=kt(n);if(l!==void 0){l.hasHooter=!0;break}break}case"doughnuts":{const l=kt(n);l!==void 0&&(l.doughnuts=ie(l.doughnuts,6));break}case"bag":{const l=Qe(n);if(l!==void 0){l.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const l=kt(n);l!==void 0&&(l.fastStepsStartedAtDistance=l.gameWalkDistance);break}case"jumps":{const l=Qe(n);l!==void 0&&(l.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ie(n.state.head.lives,2),n.state.heels.lives=ie(n.state.heels.lives,2)):n.state.lives=ie(n.state.lives,2);break;case"scroll":x.dispatch(Hi(r.page));break;case"reincarnation":{x.dispatch(Vi(Xi(e,x.getState())));break}case"crown":{x.dispatch(ji(r.planet));break}}},za=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Wo(i,o)<=0||e.state.action!=="death"&&In({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},La=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Mt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Ra({movingItem:t}){t.state.autoWalk=!1}const ne=(t,...e)=>q(...e)(t.touchedItem),$e=(t,...e)=>q(...e)(t.movingItem),oi=t=>R(t.movingItem),Ea=t=>R(t.touchedItem),Ua=t=>Ko(t.touchedItem),uo=t=>{switch(!0){case ne(t,"stopAutowalk"):Ra(t);break;case Ua(t):ti(t);break;case ne(t,"portal"):za(t);break;case ne(t,"pickup"):ni(t);break;case ne(t,"doorFrame"):La(t);break}},W={movementType:"steady"},zn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=er(e.items);if(r!==void 0)return Je(r)?void 0:r;const i=n===void 0||Je(n)||n.state.action==="death"?void 0:Rn(n.state.position,t),s=o===void 0||Je(o)||o.state.action==="death"?void 0:Rn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ri=150,ii=t=>t[Math.floor(Math.random()*t.length)],ae=Object.freeze({movementType:"vel",vels:{walking:_}}),Et=t=>tr(t)?me[t.config.which]:me[t.type],fo=z.w/2,$a=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=me.homingBot;if(!zt(e,se))return{movementType:"steady"};const{head:s,heels:a}=er(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=rt(l.state.position,t);if(Math.abs(c.y)<fo)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<fo)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Na=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ae;const l=zn(r,e);if(l===void 0||s+ri>e.roomTime)return W;const c=rt(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>z.w/4?u:it(u),f=Et(t),h={..._,[d]:c[d]>0?f:-f},m=ye(h),y=!zt(m,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...y?{timeOfLastDirectionChange:e.roomTime}:le}}},ho=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ae;const a=zn(i,e);if(a===void 0)return ae;const l=a.state.position,c=z.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ae;const d=rt(a?.state.position,i),f=Et(t),h=(1+Math.sqrt(2))/2,m=f*h,y=D({...d,z:0},m/Jo(d)*(r?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:ye(y)}}},qt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ae;if(!(xe(i,_)||Math.random()<o/1e3))return W;const l=ii(r);return{movementType:"vel",vels:{walking:D(sn[l],Et(t))},stateDelta:{facing:sn[l]}}},ja=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ae:zt(i,se)?{movementType:"vel",vels:{walking:D(r,Et(t))}}:W},Va=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=ii([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},Wt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ri))return;const c=Lt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Va(s,c,r);t.state.vels.walking=u,t.state.facing=ye(u),t.state.durationOfTouch=0},Xa=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},Ha=(t,e,n,o)=>{if(!t.state.activated||tr(t)&&t.state.busyLickingDoughnutsOffFace)return ae;switch(t.config.movement){case"patrol-randomly-diagonal":return qt(t,e,n,o,Ji);case"patrol-randomly-xy8":return qt(t,e,n,o,Wi);case"patrol-randomly-xy4":return qt(t,e,n,o,qi);case"towards-tripped-on-axis-xy4":return $a(t,e);case"towards-on-shortest-axis-xy4":return Na(t,e);case"back-forth":case"clockwise":return ja(t);case"unmoving":return ae;case"towards-analogue":return ho(t,e);case"towards-analogue-unless-planet-crowns":return ho(t,e,n,o,Gi(x.getState()));default:throw t.config,new Error("this should be unreachable")}},Ga=t=>{const{movingItem:e,touchedItem:n}=t;if(we(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Wt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Wt(t,"opposite");break;case"clockwise":Wt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Xa(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},qa=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s]})}break}case"in-store":{x.dispatch(Yi(o.path));break}}},Wa=({movingItem:t,touchedItem:e})=>{if(!we(t))return;const{state:{position:n},aabb:o}=e,r=Lt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=ye(r),s=D(i,-.05);return e.state.vels.sliding=s,!1},Ja=({movingItem:t,touchedItem:e})=>{if(!we(e))return;const n=t.state.vels.sliding;if(xe(n,_))return;const{state:{position:o},aabb:r}=t,i=Lt(e.state.position,e.aabb,o,r);return Wo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},Ya=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Lt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=ye(c);for(const d of s){const f=e.items[d],h=D(u,-.025*o);f.state.facing=h,On({room:e,subjectItem:f,gameState:r,pusher:n,posDelta:h,deltaMS:o,onTouch:i})}},lt=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:Sn(x.getState(),t),Za=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&q("teleporter")(l)&&lt(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:un}}}:W;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return In({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:un}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Qa=1e3/12,xt=t=>{const n=t/Ts*Ho;return(t+.5*dn*n**2)/n},Ka={head:xt(dt.head),headOnSpring:xt(dt.head+z.h),heels:xt(dt.heels),heelsOnSpring:xt(dt.heels+z.h)},po=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ka[`${n}${e?"OnSpring":""}`]},el=t=>!(t===null||Cs(t)&&lt(t)||Ss(t)&&t.config.gives==="scroll"||R(t)&&t.state.standingOnItemId===null),tl=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+Qa>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),si=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=ze(o,e);if(tl(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:po(t,!1)}},stateDelta:{}};if(!(r.currentActionPress("jump")!=="released"&&el(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:W;const a=ws(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:po(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},nl=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Me(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return D(n,l)},mo={movementType:"vel",vels:{walking:_}},ai=(t,e,n,o)=>{const r=ol(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Me(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!xe(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},ol=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,y=o===t.id,T=y?n.currentActionPress("jump"):"released",B=y?n.directionVector:_,P=l===null&&m.z<0,F=i==="head"&&Hr(t.state)>0&&l!==null,N=i==="headOverHeels"?P?"head":"heels":F?"heels":i,A=a?c:B,j=me[N];if(u!==null||s==="death")return mo;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Yo(h,D(h,ks*r))}}:mo;if(T!=="released"){const ct=ye(zt(A,se)?c:A),ki=q("spring")(ze(l,e))?1:Is;return{movementType:"vel",vels:{walking:D({...ct,z:0},j*ki)},stateDelta:{facing:ct}}}}if(Me(A)!==0)return P?{movementType:"vel",vels:{walking:D({...A,z:0},j)},stateDelta:{facing:A,action:"falling"}}:{movementType:"vel",vels:{walking:nl({vel:h,acc:Os[N],deltaMS:r,maxSpeed:j,unitD:A,minSpeed:0})},stateDelta:{facing:A,action:"moving"}};if(d>0&&d<1){const ct=xe(f,c)?1:0;return{movementType:"position",posDelta:D(c,ct-d),stateDelta:{action:P?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:P?"falling":"idle"}}},go=t=>Ce(t.movingItem)&&Mn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),li=(t,e)=>{let n=_;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(Ce(t)||q("lift")(t)))for(const[i,s]of qo(o.vels)){const a={..._,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},bo=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&R(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&go(t)){if(go(t)&&oi(t)){nr({above:t.movingItem,below:t.touchedItem});const n=[si(t.movingItem,t.room,t.gameState),ai(t.movingItem,t.room,t.gameState,t.deltaMS)];li(t.movingItem,n)}or(t)}};function rl(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Ln=t=>{oi(t)&&uo(t),Ea(t)&&uo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ne(t,...Nn)&&Wa(t),$e(t,...Nn)&&Ja(t),($e(t,"monster")&&ne(t,"firedDoughnut")||$e(t,"firedDoughnut")&&ne(t,"monster"))&&rl(t),($e(t,"monster")||$e(t,"movingPlatform"))&&Ga(t),ne(t,"switch")&&qa(t),ne(t,"joystick")&&Ya(t,Ln),t.touchedItem.state.disappear&&bo(t),t.movingItem.state.disappear&&we(t.touchedItem,t.movingItem)&&bo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},il=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ue(e.items).filter(rr),u=s===null?ci(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;sl(e,i,u)}else{if(t.state.standingOnItemId===null||!ui(t,ir(e.items)))return;const h=_s({gameState:n,room:e,itemType:s.type,config:s.config,position:l});On({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Ln}),i.carrying=null}},sl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,sr({room:t,item:n})},ci=(t,e)=>ei(t,ue(e.items).filter(rr)),ui=(t,e)=>{const n={position:U(t.state.position,{z:z.h})},o=Bs({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(we(r,t)){if(!Ce(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!ui(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Jt=-11,al={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter"&&lt(l),u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?vt({colourise:n,button:t}):r;if(o?.pressed!==u&&yt(d,u),c!==o?.standingOnTeleporter)if(c)Ue(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=lo(t,n,"JUMP");f.y=Jt,Ue(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const a=i&&Qe(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&ci(i,s)!==void 0,d=t.actions.every(y=>e.currentActionPress(y)!=="released"),f=l&&!u&&c===null,h=r===null?vt({colourise:n,button:t}):r;if(h.visible=l,l&&(f!==o?.disabled&&ao(h,f,n),h.visible=!0,o?.pressed!==d&&yt(h,d),l!==o?.hasBag||c!==o?.carrying)){let y;c!==null?y=Kr(c):l&&(y=p({textureId:"bag",y:-2})),Ue(h,y)}return{output:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&kt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?vt({colourise:n,button:t}):r,d=a||nt(l)>0;if(u.visible=d,d&&(o?.pressed!==c&&yt(u,c),a!==o?.hasHooter||l!==o?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):nt(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=Ie(new b,l);h.y=Jt,h.filters=ee,Ue(u,f,h),ao(u,l===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const a=(i&&Qe(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||l!==o.pressed||n!==o.colourise||a!==o.hasBag))return"no-update";let u;if(r===null){u=vt({colourise:n,button:t});const d=lo(t,n,"C+J");d.y=Jt,Ue(u,d)}else u=r;return a?(u.visible=!0,o?.pressed!==l&&yt(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=Q,{output:e,renderProps:le}}};class Ne extends Qr{constructor(e){const n=al[e.button.which];super(e,n)}}const ll=30,cl=15,ul=42,dl=36,fl=44,hl=20;class pl{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Ne({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new Ne({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new Ne({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new Ne({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new Ne({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n})},joystick:new Aa({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const l of te(i))l.renderContext.button.which==="menu"?this.#e.addChild(i.menu.output):s.addChild(l.output);i.jump.output.y=cl,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=ll,i.menu.output.x=24,i.menu.output.y=24,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of te(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-fl,this.#n.mainButtonNest.y=e.y-hl,this.#n.joystick.output.x=ul,this.#n.joystick.output.y=e.y-dl}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of te(this.#n.buttons))r.tick({...e,currentPlayable:Le(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Go.frames.button.frame;const ml=250,gl=t=>t?48:24,bl=t=>t?68:56,vl=(t,e)=>t?e.x/2-24:80,yl=t=>t?72:24,xl=t=>t?88:0,vo=112,je=t=>t==="heels"?1:-1;class wl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of jt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[so],this.#t.fps.y=St.h,this.#o(),n&&(this.#n=new pl({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#s("head"),livesText:this.#i({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#s("heels"),livesText:this.#i({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#i({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of jt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new De({texture:ce().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:io,y:n?0:8});s.addChild(a);const l=this.#i({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=St.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=ee),{text:l,icon:a,container:s}}#s(e){const n=new De(ce().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({doubleHeight:e=!1,outline:n=!1,label:o="text"}={}){return new b({label:o,filters:n?_a:bn,scale:{x:1,y:e?2:1}})}#a({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+je("head")*vo,this.#t.head.doughnuts.container.y=e.y-He.h-8,this.#t.heels.carrying.container.y=e.y-He.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+je("heels")*vo,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-St.w*2}#l(e,n){return e?n?be:We:n?no:qe}#c(e){const{renderContext:{gameState:n}}=this,o=ft(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(Kr(i)),a.filters=this.#l(!0,s),this.#t.heels.bag.icon.filters=this.#l(r,s)}#f(e){const{renderContext:{gameState:n}}=this,o=ft(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#l(r,s),this.#t.head.doughnuts.icon.filters=this.#l(i!==0,s),Ie(this.#t.head.doughnuts.text,i)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ft(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=It(i),d=u>0||!o;a.visible=d,d&&(Ie(s,u),a.y=n.y-xl(o)),c.x=a.x=(n.x>>1)+je(e)*vl(o,n);const f=i===void 0?0:e==="head"?Hr(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(Ie(l,f),c.y=n.y-yl(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#u(r,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?be:We:s.filters=a?no:qe,s.x=(n.x>>1)+je(e)*bl(o),s.y=n.y-He.h}#m(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ft(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+je(e)*gl(o),a.y=n.y,Ie(a,s??0)}#g(e){const{room:n}=e;if(n===void 0)return;const o=Dn(n.color),{colourise:r,gameState:i}=this.renderContext;qe.targetColor=o.hud.dimmed[r?"dimmed":"original"],bn.targetColor=o.hud.dimmed[r?"basic":"original"],io.targetColor=o.hud.icons[r?"basic":"original"],We.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?bt.colourised.head[this.#u(i,"head")?"active":"inactive"]:bt.original,this.#t.heels.livesText.filters=r?bt.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:bt.original}#d=Zi;#b(){if(Qi(x.getState())){if(performance.now()>this.#d+ml){const e=Xe.shared.FPS;Ie(this.#t.fps,Math.round(e)),so.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#g(e);for(const n of jt)this.#m(n,e),this.#p(n,e),this.#h(n,e);this.#a(e),this.#f(e),this.#c(e),this.#b(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const yo={movementType:"vel",vels:{gravity:_}},Cl=(t,e,n,o)=>{if(!we(t))return yo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=Ps[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=ze(s,e);return q("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-dn*o,-l)}}}:yo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-dn*o,-l)}}}},xo=z.h,wo=.001,Sl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=jn**2/(2*Re);if(n==="up"){if(e<=o)return Math.max(wo,Math.sqrt(2*Re*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(wo,Math.sqrt(2*Re*r))}else return jn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Re*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Re*Math.max(e,0))):-.036};function Tl({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}}){const r=t*xo,i=e*xo,s=Sl({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}}const Co={movementType:"vel",vels:{movingFloor:_}},kl=(t,e,n,o)=>{if(R(t)&&t.state.teleporting!==null)return Co;const{state:{standingOnItemId:r}}=t,i=ze(r,e);if(i===null||!q("conveyor")(i))return Co;const{config:{direction:s}}=i,l=q("heels")(t)&&t.state.action==="moving"&&Tn(t.state.facing)===Ki(s)?me.heels:Fs;return{movementType:"vel",vels:{movingFloor:D(sn[s],l)}}};function*Il(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Ol=z.w*Math.sqrt(2)+1,_l=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=ye(d);if(r.currentActionPress("fire")==="tap"&&a&&nt(s)>0&&l+f<c){const m={type:"firedDoughnut",...As,config:le,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,D(h,Ol),t.type==="headOverHeels"?{z:z.h}:_),vels:{fired:D(h,me.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};_n({room:e,item:m}),i.doughnuts=ie(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},di=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Bl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),wt=z.w*3,Pl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-wt&&n.x<o.x+wt&&n.y>o.y-wt&&n.y<o.y+wt},So=(t,e,n,o,r)=>{if(r&&t.state.activated)return W;const i=zn(t.state.position,e);return i===void 0?W:Pl(t,i)?di:Bl},Fl=(t,e,n,o)=>t.state.activated?W:st(t.state.stoodOnBy,e).some(R)?di:W,Al=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return So(t,e,n,o,!0);case"while-player-near":return So(t,e,n,o,!1);case"on-stand":return Fl(t,e);case"off":case"on":return W;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},Dl=2;function*Ml(t,e,n,o){Ce(t)&&(yield Cl(t,e,n,o),yield kl(t,e),yield*Il(t,e)),R(t)&&(yield ai(t,e,n,o),t.id===n.currentCharacterName&&(yield Za(t,e,n,o),yield si(t,e,n),Ds(t)&&il(t,e,n,o),Ms(t)&&_l(t,e,n))),zs(t)&&(yield Tl(t)),Ls(t)&&(yield Al(t,e,n,o),yield Ha(t,e,n,o))}const zl=(t,e,n,o)=>{if(!Ce(t)||t.state.standingOnItemId===null)return;const r=ze(t.state.standingOnItemId,e);R(t)&&r.type==="pickup"&&ni({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||R(t)&&r.state.disappear==="onTouchByPlayer")&&or({touchedItem:r,gameState:n,room:e})},Ll=(t,e,n,o)=>{if(R(t)&&t.state.standingOnItemId!==null){const l=ze(t.state.standingOnItemId,e);(Ko(l)||l.type==="spikes")&&ti({room:e,movingItem:t})}const r=[...Ml(t,e,n,o)];zl(t,e,n);let i=li(t,r);(Ce(t)||q("lift")(t)||q("firedDoughnut")(t))&&(i=U(i,...oe(te(t.state.vels)).map(l=>D(l,o))));const s=Math.ceil(Me(i)/Dl),a=D(i,1/s);for(let l=0;l<s;l++)On({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:o,onTouch:Ln})},Rl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ie(e.state.head.lives,-1),e.state.heels.lives=ie(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ie(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=nt(e.state.head.lives)>0,i=nt(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,he(t,e);const u=Vn(e)[c],d=Pe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Ft(u)};return}if(t.entryState.headOverHeels!==void 0){he(t,e);const c=Pe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Vn(e);if(he(t,c),he(t,u),kn(c,u)){const d=ar({head:c,heels:u});he(t,d,"heels");const f=Pe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Ft(d)};return}else{const d=Pe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Pe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=cn({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??le});for(const i of e)_n({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Rs(r,t);return r},he=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},El=(t,e)=>{const n=lr(t,cr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];he(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=ar({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});he(t,a);const l=Pe({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}_n({room:o,item:e});return}else{const s=Pe({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Ul=(t,e)=>{e.type==="headOverHeels"?Rl(t,e):El(t,e),Le(t)===void 0&&x.dispatch(es({offerReincarnation:!0}))},$l=t=>{for(const e of ue(t.items))for(const n of st(e.state.stoodOnBy,t)){if(!t.items[n.id]){Xn(n,t);continue}if(!Mn(n,e)){Xn(n,t);const o=ei(n,ir(t.items));o!==void 0&&nr({above:n,below:o})}}},Nl=2*Es,jl=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Nl,positionDelta:n})},Vl=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Yo(o.state.position,r),z:0};if(!xe(s,_))for(const a of st(o.state.stoodOnBy,e))jl(a,e,s)}},Xl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Hl=t=>{for(const e of ue(t.items)){const n=e.state.position;e.state.position=ts(n)}},Gl=(t,e)=>{for(const n of ue(t.items))!Ce(n)||t.roomTime===n.state.actedOnAt.roomTime||ns(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=os(n.state.position),e.add(n))},ql=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},Wl=le,Jl=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let o=0;o<t.gameSpeed;o++){const r=To(t,e),i=Ke(t)?.items??Wl;n=new Set(oe(fn(n,r)).filter(({id:s})=>i[s]!==void 0))}return n}return To(t,e*t.gameSpeed)},To=(t,e)=>{const{inputStateTracker:n}=t,o=Ke(t);if(o===void 0)return Zo;Yl(t,o,e);const r=Object.fromEntries(Us(o.items).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Vt(t),n.currentActionPress("swop.head")==="tap"&&Vt(t,"head"),n.currentActionPress("swop.heels")==="tap"&&Vt(t,"heels");for(const a of te(o.items))Xl(a,o)&&(sr({room:o,item:a}),R(a)&&Ul(t,a));const i=Object.values(o.items).sort(ql);for(const a of i){const l=Le(t);if(l===void 0||l.state.action==="death")break;if(o.items[a.id]!==void 0)try{Ll(a,o,t,e)}catch(c){throw console.error(c),new Error(`error caught while ticking item ${a.id}: ${c}`)}}$l(o),Hl(o);const s=new Set(oe(te(o.items)).filter(a=>r[a.id]===void 0||!xe(a.state.position,r[a.id])));return Vl(s,o,r),Gl(o,s),s},Yl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Le(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=lr(t,cr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},ko=(t,e)=>{const n=S(t),o=S(U(t,{x:e.x,z:e.z})),r=S(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Yt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,Zl=(t,e,n,o)=>{const r=ko(t,e),i=ko(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Yt(s,a,l,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,y=Yt(d,f,h,m),T=r.topLeft.y+r.topLeft.x/2,B=r.bottomCentre.y+r.bottomCentre.x/2,P=i.topLeft.y+i.topLeft.x/2,F=i.bottomCentre.y+i.bottomCentre.x/2,N=Yt(T,B,P,F);return u&&y&&N},Ql=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!Zl(n,o,r,i))return 0;for(const s of rs){const a=t.state.position[s],l=a+o[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Io(e)-Io(t)},Io=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ot extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Kl=t=>{const e=ec(t);let n=e.length,o=n;const r=new Array(n),i={},s=tc(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new Ot([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(m){throw m instanceof Ot?m.hasClosedCycle?m:new Ot([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function ec(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function tc(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const Oo=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ct=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},nc=(t,e=new Set(te(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Ct(n,r,s);for(const r of e)if(r.renders)for(const i of te(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=Ql(r,i);if(Oo(o,r,i),s===0){Ct(n,r.id,i.id),Ct(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;Oo(n,a,l),Ct(n,l,a)}return n},fi=(t,e,n=3)=>{try{return{order:Kl(t),impossible:!1}}catch(o){if(o instanceof Ot){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:fi(t,e,n-1).order,impossible:!0}}else throw o}};class oc extends Qr{}const _o=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Bo=(t,e)=>{const n=new G;return _o(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),_o(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},rc={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class ic{constructor(e){this.renderContext=e;const{item:n}=e,o=rc[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),q("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new G().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new G().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new G({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Bo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Bo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new pa({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class sc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const ac=(t,e)=>{const n=e.getLocalBounds(),o=Fn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new De({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Po=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof De?r:ac(t,r)};class lc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=x.getState();n||(this.#e.filters=new da({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,a=Po(r,i,s);o.shadowMask.relativeTo==="top"&&(a.y-=o.aabb.z),s&&(a.y-=((s.z??1)-1)*z.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),a=o.state.position.z+o.aabb.z,l=ue(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:a}},aabb:{...o.aabb,z:$s}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":kn(c,d)?f?"update":"create":"noShadow"});for(const d of fn(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=Po(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of fn(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...rt(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Pt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const cc=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,uc=(t,e,n)=>{const r=ce().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ce().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},Ve=t=>M(({renderContext:{item:e}})=>Ns(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),M=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:le}:"no-update";function*dc({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Mt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...Tt(a,{y:-12*n})});l.filters=gn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...Tt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...Tt(a,{y:-l*z.h})})}}yield*s(k({...se,[r]:1})),yield*s(se),e||(yield p({pivot:{x:16,y:z.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...k({...se,[r]:1})}))}const hi=(t,e)=>{const n=Mt(t),o=it(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):se},fc=M(({renderContext:{item:t,room:e}})=>tt(dc(t,e),new b({filters:re(e),...hi(t.config.direction,t.aabb)}))),hc=M(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Mt(t),a=i.rooms[n];return p({textureId:uc(r,s,e),filter:re(a),...hi(t,o)})}),Zt={animationId:"bubbles.cold"},Fe=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},pi=Symbol(),mi=Symbol(),pc=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[pi]=t,n[mi]=e,n},mc=`#version 300 es

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
`;class Fo extends J{constructor(e){const n=$.from({vertex:at,fragment:mc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const gc=({name:t,action:e,facingXy8:n,teleportingPhase:o,paused:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:r};if(o==="out")return{animationId:`${t}.fadeOut`,paused:r};if(o==="in")return{animationId:`${t}.fadeOut`,paused:r};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:r};if(e==="falling"){const s=`${t}.falling.${n}`;if(ss(s))return{textureId:s}}const i=`${t}.idle.${n}`;return as(i)?{animationId:i,paused:r}:{textureId:`${t}.walking.${n}.2`}},yn=Symbol(),xn=Symbol(),bc=(t,e)=>{t[yn].removeChildren(),t[yn].addChild(p(gc(e)))},Qt=(t,e,n)=>{const o=new b,r=new b;o[yn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new de({pastelBlue:g.pink}):be,flipX:t==="heels"});return o[xn]=i,o},Ao=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+js>t,vc=t=>{if(!Je(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Hn<Hn*.15},Do=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Mo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?be:t.filters},yc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Do(r,new Ae({outlineColor:Be[t],upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Mo(r,Ae);const s=o?.flashing??!1;n&&!s?Do(r,new Fo(Be[t])):!n&&s&&Mo(r,Fo)},xc=(t,e,n)=>{e&&!n?t.addChild(t[xn]):!e&&n&&t.removeChild(t[xn])},Kt=(t,e,n,o,r,i)=>{n&&bc(e,{name:t,...o,paused:r}),yc(t,o,i,e),xc(e,o.shining,i?.shining??!1)},en=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:a,teleporting:l}}=e,c=Cn(a)??"towards",u=e.type==="headOverHeels"?Ao(e.state.head,"headOverHeels","headOverHeels"):Ao(e.state,e.type,n.currentCharacterName),d=vc(e),f=Xr(e),h=Me(a),m=l?.phase??null,y={action:s,facingXy8:c,teleportingPhase:m,flashing:d,highlighted:u,shining:f},T=t===void 0||t.action!==s||t.facingXy8!==c||t.teleportingPhase!==m;let B;if(i==="headOverHeels"){B=r??pc({top:Qt("head",!0,o),bottom:Qt("heels",!0,o)});const P=B;Kt("head",P[pi],T,y,o,t),Kt("heels",P[mi],T,y,o,t)}else B=r??Qt(i,!1,o),Kt(i,B,T,y,o,t);return s==="moving"&&r instanceof et&&(r.animationSpeed=h*is),{output:B,renderProps:y}},wc=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...k({x:-e.x,y:-e.y})}),r=tt(oe(Pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...k(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=tt(oe(Pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...k(Tt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...k({...l,z:0}),times:{[it(Ze(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},Cc=t=>[...oe(te(t.items)).filter(e=>e.type==="wall").filter(e=>Ze(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],Sc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},Tc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new G().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(k),!0).fill(0),kc=M(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Rt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const P=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,F=new b;for(let A=-1;A<=r+2;A++)for(let j=A%2-1;j<=i+2;j+=2)F.addChild(Vs({x:A+(s.right?-.5:0),y:j+(s.towards?-.5:0)},p({textureId:P})));F.addChild(wc(h,{x:n,y:o}));const N=new G().poly([se,k({x:c,y:0}),k({x:c,y:u}),k({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});F.addChild(N),F.filters=re(t),F.mask=N,m.addChild(F)}const y=Cc(h),T=new G().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(T);const B=Sc(y);if(B!==void 0){const P=Tc({extraWallRanges:B,blockXMin:n,blockYMin:o});m.addChild(P)}return m.mask=T,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Ic=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=k({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return oe(Pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...k(f),times:a.type==="wall"?a.config.times:{[it(Ze(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...k(U(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...k(U(f,{x:-.5}))}))}),i},Oc=M(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Rt(e.roomJson),l=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new G({label:"overDrawToHideFallenItems"}).poly([k({x:l,y:0}),k({x:0,y:0}),k({x:0,y:c}),{...k({x:0,y:c}),y:999},{...k({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=Ic({blockXMin:n,blockYMin:o},e.roomJson);f.filters=gn(e,"towards",t),h.filters=gn(e,"right",t),u.addChild(f),u.addChild(h);const m=new G({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),_c=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Bc=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,a=s?Ca:i?void 0:_c.includes(t.which)?Wr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const l=Tn(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||l!==r.facingXy4))return"no-update";const u={facingXy4:l,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${l}`,filter:a}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${l}`,filter:a}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${l}`,filter:a}:{textureId:`${t.which}.${l}.1`,filter:a}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Fe({top:{textureId:`${t.which}.${l}`,filter:a||re(n)},bottom:{...Zt,paused:o}}):p({textureId:`${t.which}.${l}`,filter:a}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Fe({top:`${t.which}.${l}`,filter:a}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:a}:{textureId:`${t.which}.1`,filter:a}),renderProps:c};case"homingBot":return{filter:a,output:p({textureId:t.which,filter:a}),renderProps:c};case"bubbleRobot":return{output:Fe({top:{...Zt,paused:o},filter:a}),renderProps:c};case"emperorsGuardian":return{output:Fe({top:"ball",bottom:{...Zt,paused:o},filter:a}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:a,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},ot=t=>{for(const e in t)return!0;return!1},Pc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,tn=g.moss,zo=()=>M(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Fc={head:en,heels:en,headOverHeels:en,doorFrame:hc,doorLegs:fc,monster:Bc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:M(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=it(Ze(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:cc(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ge.w,y:Ge.h+1}:{x:0,y:Ge.h+1},filter:re(o)}),l=k({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:M(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:M(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?re(n):void 0,times:e})),spikes:Ve("spikes"),slidingDeadly:zo(),slidingBlock:zo(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:Pc(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?re(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?Sn(x.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=ot(n);if(!(r===void 0||r.moving!==i))return"no-update";const a=new b,l=Ze(t);return a.addChild(p(i?{animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${l}.6`,times:e})),{output:a,renderProps:{moving:i}}},lift:M(({renderContext:{paused:t}})=>{const e=new b,n={x:He.w/2,y:He.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=lt(t),a=s&&st(r,e).find(R)!==void 0;return o===void 0||s!==o.activated||a!==o.flashing?{output:a?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:a,activated:s}}:"no-update"},pickup:M(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:re(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:M(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=Tn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Fe({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:Ve("joystick"),movingPlatform:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new Ae({outlineColor:tn,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=ot(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const a=o?.compressed??!1,l=e?new Ae({outlineColor:tn,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===a&&e!==o?.highlighted;let u;return c?(r.filters=l??Xo,u=r):u=p(!i&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:l}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new Ae({outlineColor:tn,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Fe({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:Ve("hushPuppy"),bubbles:M(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:Ve({animationId:"bubbles.doughnut"}),ball:Ve("ball"),floor:kc,floorEdge:Oc};class Ac{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const H=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=w.createBufferSource(),c=an()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},Te=(t,e,n)=>{const o=w.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},L=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1},i)=>{let s,a;return l=>{if(!!l!=!!a)l?t!==void 0?(s?.stop(),s=H({...t}),Te(s,t.gain,i),n!==void 0&&(r?(s=H({...n,loop:!0}),Te(s,n.gain,i)):s.onended=()=>{a&&(s=H({...n,loop:!0}),Te(s,n.gain,i))})):n!==void 0&&(s=H({...n,loop:!0}),Te(s,n.gain,i)):(s&&s.loop&&(s.stop(),s.onended=null),o!==void 0&&(s=H({...o}),Te(s,o.gain,i)));else if(a!==l&&e!==void 0){const u=H({...e});Te(u,e.gain,i)}a=l}};class Dc{constructor(e){this.renderContext=e,this.output.gain.value=4}output=w.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Mc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;n.type==="pickup"&&n.gives!=="scroll"&&H({soundId:"bonus",connectTo:this.output})}output=w.createGain();tick(){}destroy(){}}class zc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n.connect(this.output),this.#n.gain.value=.3}output=w.createGain();#e=w.createGain();#n=w.createGain();#t=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o=L({start:{soundId:"metalHit"}},this.#n);tick(){const{renderContext:{item:e,room:{roomTime:n,items:o}}}=this,{state:{actedOnAt:{roomTime:r,by:i},collidedWith:{roomTime:s,by:a}}}=e,l=n===r&&oe(ln(i)).some(u=>Xs(o[u]));this.#t(l);const c=n===s&&!dr(ln(a));this.#o(c)}destroy(){}}const nn=2;class Lc{constructor(e){this.renderContext=e}output=w.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:nn},loop:{soundId:"conveyorLoop",playbackRate:nn},stop:{soundId:"conveyorEnd",playbackRate:nn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=ot(e);this.#e(n)}destroy(){this.#e(!1)}}const Rc=3;class Ec{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=w.createGain();#e=H({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Rc*e)}destroy(){}}const Lo={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Ro={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.1}},Eo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Uo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class Uc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Lo[n]!==void 0&&(this.#r=L({start:Lo[n]},this.#e)),Ro[n]!==void 0&&(this.#t=L({change:Ro[n]},this.#e)),Uo[n]!==void 0&&(this.#s=L(Uo[n],this.#e)),Eo[n]!==void 0&&(this.#o=L({loop:Eo[n]},this.#n))}output=w.createGain();#e=w.createGain();#n=w.createGain();#t;#o;#r;#s;tick(){const{renderContext:{item:e,room:{roomTime:n}}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,collidedWith:{roomTime:s,by:a},vels:{walking:l}}}=e;if(this.#t){const c=Cn(o);this.#t(c)}if(this.#r){const c=n===s&&!dr(ln(a));this.#r(c)}if(this.#o){const c=r&&!i;this.#o(c)}if(this.#s){const c=!xe(l,_);this.#s(c)}}destroy(){}}class on{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=.8,this.#t.connect(this.output),this.#s.gain.value=1.2,this.#s.connect(this.output);const n=e.item.type;this.#n=L({loop:{soundId:`${n==="headOverHeels"?"heels":e.item.type}Walk`}},this.#e),this.#o=L({start:{soundId:`${n==="headOverHeels"?"head":e.item.type}Jump`}},this.#t),this.#r=L({loop:{soundId:`${n==="headOverHeels"?"head":e.item.type}Fall`}},this.#t)}output=w.createGain();#e=w.createGain();#n;#t=w.createGain();#o;#r;#s=w.createGain();#i=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#s);#a={teleportingPhase:null,positionZ:0};tick(){const{renderContext:{item:e}}=this,{state:{action:n,teleporting:o,jumpStartZ:r,jumped:i,standingOnItemId:s,position:{z:a},vels:{gravity:{z:l}}}}=e,c=Qe(e),{teleportingPhase:u,positionZ:d}=this.#a,f=o?o.phase:null,h=i&&a>r&&a>d&&l>0,m=a<d&&l<0&&s===null;if(this.#r(m),this.#o(h),this.#n(!h&&!m&&n==="moving"),c!==void 0&&this.#i(c.carrying!==null),f!==null&&f!==u)if(f==="in"){const y=an().teleportIn,T=w.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}else{const y=an().teleportOut,T=w.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}this.#a={teleportingPhase:f,positionZ:a}}destroy(){}}class $c{constructor(e){this.renderContext=e}output=w.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=ot(e);!o&&r&&H({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Nc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=w.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class jc{constructor(e){this.renderContext=e}output=w.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=ot(e);n&&!o&&H({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Vc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=w.createGain();#e=w.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?Sn(x.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&H({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Xc{constructor(e){this.renderContext=e}output=w.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(lt(e)&&st(e.state.stoodOnBy,n).some(R))}destroy(){}}const Hc={lift:Ec,switch:Vc,bubbles:Mc,head:on,heels:on,headOverHeels:on,teleporter:Xc,monster:Uc,conveyor:Lc,spring:jc,portableBlock:$c,charles:zc,ball:Dc,pushableBlock:Nc},Gc=t=>{const e=Hc[t.item.type];if(e)return new e(t)};class qc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output);const{room:{size:{y:o,x:r}}}=e;this.roomMaxProjectedX=Xt(Gn({x:0,y:o})),this.roomMinProjectedX=Xt(Gn({x:r,y:0}))}output=w.createStereoPanner();roomMaxProjectedX;roomMinProjectedX;tick(e){this.childRenderer.tick(e);const n=this.renderContext.item.state.position,o=Math.min(1,Math.max(-1,(Xt(n)-this.roomMinProjectedX)/(this.roomMaxProjectedX-this.roomMinProjectedX)*2-1));this.output.pan.value=o}destroy(){this.childRenderer.destroy()}}const Wc=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Jc=t=>t.item.shadowMask!==void 0,Yc=t=>{const e=x.getState(),n=ls(e),o=cs(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const d=Fc[r.type],f=new oc(t,d);a.push(f),s&&(f.output.alpha=.66),o&&Jc(t)&&a.push(new lc(t))}s&&a.push(new ic(t));let l;if(a.length===0)l=void 0;else{const d=a.length===1?a[0]:new Zc(a,t);Wc(r,d.output,i),l=new sc(t,d)}const c=t.paused?void 0:Gc(t),u=c===void 0?void 0:new qc(t,c);return new Ac(t,{graphics:l,sound:u})};class Zc{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const ke=.33,Qc=us()==="mobile"?-4:16,wn=Ge.h-Ge.w/2,Kc=me.heels,eu=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Rt(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-Qc-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-wn<0;return(m,y,T)=>{if(m===void 0)return;const B=S(m.state.position),P=U(B,u),F={x:d&&P.x<n.x*ke?Math.min(-a,n.x*ke-B.x):f&&P.x>n.x*(1-ke)?Math.max(n.x-l,n.x*(1-ke)-B.x):u.x,y:h&&P.y<n.y*ke?n.y*ke-B.y:u.y};if(T)e.x=F.x,e.y=F.y;else{const N=Kc*y,A=rt(e,F),j=Jo(A);if(j>N){const Nt={x:A.x/j,y:A.y/j};e.x-=Nt.x*N,e.y-=Nt.y*N}else e.x=F.x,e.y=F.y}}},tu=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Rt(t);return new G().rect(e+o.x,r-wn,n-e,o.y-r+wn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class nu{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=x.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??Qo.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(tu(e.room.roomJson)),this.#a=eu(e.room,this.#t,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=w.createGain();output={sound:this.#o,graphics:this.#t};#r=!1;#s=new Map;#i=new Map;#a;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?Ta:be:new E(Dn(n).main.original)}#l(e){const{room:n}=this.renderContext;for(const o of ue(n.items)){let r=this.#i.get(o.id);if(r===void 0){r=Yc({...this.renderContext,item:o}),this.#i.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:a}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),a&&a.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#i.entries())n.items[o]===void 0&&(r.destroy(),this.#i.delete(o))}#c(e){const{order:n}=fi(nc(this.renderContext.room.items,e.movedItems,this.#s),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#i.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(ue(this.renderContext.room.items))};this.#a(Le(this.renderContext.gameState),n.deltaMS,!this.#r),this.#l(n),(!this.#r||n.movedItems.size>0)&&this.#c(n),this.#r=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#i.forEach(e=>{e.destroy()})}}var Ut=`in vec2 aPosition;
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
}`,ou=`precision highp float;
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
`,ru=`struct CRTUniforms {
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
}`,iu=Object.defineProperty,su=(t,e,n)=>e in t?iu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,_t=(t,e,n)=>(su(t,typeof e!="symbol"?e+"":e,n),n);const gi=class bi extends J{constructor(e){e={...bi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:ru,entryPoint:"mainFragment"}}),o=$.from({vertex:Ut,fragment:ou,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),_t(this,"uniforms"),_t(this,"seed"),_t(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};_t(gi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let au=gi;var lu=`
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
}`,cu=`struct KawaseBlurUniforms {
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
}`,uu=`
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
`,du=`struct KawaseBlurUniforms {
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
}`,fu=Object.defineProperty,hu=(t,e,n)=>e in t?fu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,fe=(t,e,n)=>(hu(t,typeof e!="symbol"?e+"":e,n),n);const vi=class yi extends J{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ye("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...yi.DEFAULT_OPTIONS,...n};const o=ve.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:n?.clamp?du:cu,entryPoint:"mainFragment"}}),r=$.from({vertex:Ut,fragment:n?.clamp?uu:lu,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),fe(this,"uniforms"),fe(this,"_pixelSize",{x:0,y:0}),fe(this,"_clamp"),fe(this,"_kernels",[]),fe(this,"_blur"),fe(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=_e.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),_e.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};fe(vi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let pu=vi;var mu=`in vec2 vTextureCoord;
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
`,gu=`struct AdvancedBloomUniforms {
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
`,bu=`
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
`,vu=`struct ExtractBrightnessUniforms {
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
`,yu=Object.defineProperty,xu=(t,e,n)=>e in t?yu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,xi=(t,e,n)=>(xu(t,typeof e!="symbol"?e+"":e,n),n);const wi=class Ci extends J{constructor(e){e={...Ci.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:vu,entryPoint:"mainFragment"}}),o=$.from({vertex:Ut,fragment:bu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),xi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};xi(wi,"DEFAULT_OPTIONS",{threshold:.5});let wu=wi;var Cu=Object.defineProperty,Su=(t,e,n)=>e in t?Cu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Oe=(t,e,n)=>(Su(t,typeof e!="symbol"?e+"":e,n),n);const Si=class Ti extends J{constructor(e){e={...Ti.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:$t,entryPoint:"mainVertex"},fragment:{source:gu,entryPoint:"mainFragment"}}),o=$.from({vertex:Ut,fragment:mu,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:pe.WHITE}}),Oe(this,"uniforms"),Oe(this,"bloomScale",1),Oe(this,"brightness",1),Oe(this,"_extractFilter"),Oe(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new wu({threshold:e.threshold}),this._blurFilter=new pu({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=_e.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=_e.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),_e.returnTexture(s),_e.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Oe(Si,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Tu=Si;const $o=({crtFilter:t},e)=>[t?new au({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Tu({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class ku{constructor(e,n){this.app=e,this.#i=e,this.#a=n;try{const o=x.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#s.connect(w.destination),e.stage.addChild(this.#r),e.stage.scale=r,Ke(n)===void 0)throw new Error("main loop with no starting room");this.#c()}catch(o){this.#l(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#s=w.createGain();#i;#a;#l(e){console.error(e),x.dispatch(ds(fs(e,"message","stack")))}#c(){const{gameMenus:{userSettings:{displaySettings:e}}}=x.getState();this.#e=$o(e,!0),this.#n=$o(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#l(n)}};tick=({deltaMS:e})=>{const n=x.getState(),o=hs(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=x.getState(),s=Ke(this.#a),a=!o&&!(r?.uncolourised??Qo.displaySettings.uncolourised),l=ps(n),c=ms(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new wl({colourise:a,gameState:this.#a,inputDirectionMode:c,onScreenControls:l}),this.#i.stage.addChild(this.#t.output)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const u=o?Zo:Jl(this.#a,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),s?(this.#o=new nu({gameState:this.#a,room:s,paused:o,pixiRenderer:this.#i.renderer,displaySettings:r,colourised:a,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#s),this.#a.events.emit("roomChange",s.id)):this.#o=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#o?.tick({progression:this.#a.progression,movedItems:u,deltaMS:e}),o?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#n};start(){return this.#i.ticker.add(this.tickAndCatch),this}stop(){this.#i.stage.removeChild(this.#r),this.#s.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#i.ticker.remove(this.tickAndCatch)}}Dt.add(hr,pr,mr,gr,br,vr,yr,xr,wr,Cr,Sr,kr,Tr,Ir,Or,_r,Br,Pr,Fr,Ar,Dr);bs.defaultOptions.scaleMode="nearest";const No=async(t,e)=>{const n=new Nr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const o=x.getState().gameMenus.currentGame,r=to({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?x.dispatch(gs(o.store.gameMenus)):(x.dispatch(En(r.characterRooms.head.id)),x.dispatch(En(r.characterRooms.heels.id)));const i=new ku(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Le(r);a!==void 0&&In({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return Ke(r)},get gameState(){return r},reincarnateFrom(s){to({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Fu=Object.freeze(Object.defineProperty({__proto__:null,default:No,gameMain:No},Symbol.toStringTag,{value:"Module"}));export{Rr as A,Mr as C,J as F,Fn as R,oa as S,Er as V,la as a,Fu as g,na as u};
