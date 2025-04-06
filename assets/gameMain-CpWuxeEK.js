const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-CMVg6ab0.js","assets/App-DW3q4sbA.js","assets/index-BSePdHr0.js","assets/index-C-kHmM3y.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-hhvNkod3.js","assets/Graphics-CBNqvaTe.js","assets/changeCharacterRoom-Dyk4y13G.js","assets/WebGLRenderer-C4od9ILE.js"])))=>i.map(i=>d[i]);
import{b0 as Ti,b1 as Uo,b2 as ki,aj as Ii,an as ve,ao as $,ab as $o,ak as he,W as C,$ as At,Z as Oi,a0 as b,d as Ze,v as _t,aD as v,a3 as nn,av as Me,X as Ve,Y as Bi,V as _i,b3 as Pi,b4 as Fi,b5 as Ai,aa as Di,b6 as X,b7 as Mn,H as z,b8 as No,b9 as le,ba as k,bb as Go,s as jo,J as x,o as te,c as B,bc as Mi,bd as zi,be as Li,f as D,bf as ze,bg as Ri,bh as vn,bi as Vo,bj as Ei,bk as St,q as ye,n as yn,e as U,bl as Ui,i as oe,bm as $i,bn as Ni,bo as Gi,bp as ji,bq as Vi,E as Ke,br as Tt,k as Xo,bs as Dt,bt as R,j as W,bu as Ho,bv as qo,bw as zn,bx as Wo,by as Xi,bz as it,bA as Jo,bB as xe,bC as Mt,bD as se,O as st,D as pe,bE as me,x as we,bF as on,bG as Hi,bH as qi,bI as Wi,bJ as Ji,bK as xn,w as Le,bL as Yi,bM as Zi,bN as Ki,bO as rn,bP as Qi,bQ as dt,g as Yo,bR as es,bS as ts,bT as ns,l as Ce,z as Zo,bU as Ln,h as ce,bV as Ko,r as Qo,b as os,a as er,m as rs,aY as Re,bW as Nt,bX as He,bY as ft,bZ as is,b_ as ss,b$ as as,c0 as Ee,c1 as Rn,c2 as wn,c3 as ls,c4 as cs,c5 as Cn,c6 as us,c7 as at,c8 as ds,c9 as fs,ca as hs,cb as ps,cc as ms,cd as En,I as Un,ce as tr,a$ as nr,B as or,C as gs,y as $n,aX as Qe,cf as rr,cg as bs,ch as vs,ci as ys,cj as xs,ck as ws,cl as Cs,cm as S,cn as Ss,co as Pt,cp as Ts,cq as kt,cr as ks,cs as Is,ct as Nn,cu as Os,cv as Bs,P as et,cw as zt,cx as _s,cy as qe,cz as w,cA as sn,cB as an,p as Ps,cC as Gt,F as Gn,cD as Fs,cE as As,cF as Ds,cG as ir,at as _e,cH as Ms,cI as zs,cJ as Ls,cK as Rs,cL as Es,cM as jn,cN as Us,K as Vn,cO as $s}from"./App-DW3q4sbA.js";import{a as Ns,f as ln,c as Sn,m as Lt,b as Tn,d as sr,r as Gs,o as js}from"./changeCharacterRoom-Dyk4y13G.js";import{S as Vs,G as q}from"./Graphics-CBNqvaTe.js";import{g as ar,_ as Xn}from"./index-BSePdHr0.js";var ht={},Hn;function Xs(){if(Hn)return ht;Hn=1;var t=Ti(),e=t.mark(i),n=Uo(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(y){for(;;)switch(y.prev=y.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){y.next=8;break}return f=d[u],y.delegateYield(r(f),"t0",5);case 5:u++,y.next=2;break;case 8:case"end":return y.stop()}},e)}ht.__concat=i;var s=o(i);return ht.concat=s,ht}var pt={},qn;function Hs(){if(qn)return pt;qn=1;var t=Uo(),e=t.iterableCurry,n=ki(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}pt.__isEmpty=i;var s=e(i,{reduces:!0});return pt.isEmpty=s,pt}var jt,Wn;function qs(){return Wn||(Wn=1,jt=Xs().concat),jt}var Ws=qs();const cn=ar(Ws);var Vt,Jn;function Js(){return Jn||(Jn=1,Vt=Hs().isEmpty),Vt}var Ys=Js();const lr=ar(Ys),cr=class un extends Ii{constructor(e){e={...un.defaultOptions,...e},super(e),this.enabled=!0,this._state=Vs.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=ve.from(n)),o&&(s=$.from(o)),new un({gpuProgram:i,glProgram:s,...r})}};cr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let Y=cr;var Zs=`
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
`,Qs=`
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
}`;class I extends Y{constructor(e){const n=e.gpu,o=Yn({source:Qs,...n}),r=ve.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Yn({source:Zs,...i}),a=$.from({vertex:Ks,fragment:s}),l=new $o({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:he.EMPTY}})}}function Yn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const kn=`
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
                `}})}}Pr.extension={name:"vivid-light",type:C.BlendMode};const dn=[];At.handleByNamedList(C.Environment,dn);async function ea(t){if(!t)for(let e=0;e<dn.length;e++){const n=dn[e];if(n.value.test()){await n.value.load();return}}}let Ue;function ta(){if(typeof Ue=="boolean")return Ue;try{Ue=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Ue=!1}return Ue}var Fr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Fr||{});class na{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const oa=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Ar=class Dr extends Oi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...oa,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await ea(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Dr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(Ze(_t,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:v.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Fr.ALL);const{clear:o,clearColor:r,target:i}=e;v.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,v.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new na(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!ta())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Ar.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Mr=Ar,mt;function ra(t){return mt!==void 0||(mt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Mr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!nn.get().getWebGLRenderingContext())return!1;let o=nn.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),mt}let gt;async function ia(t={}){return gt!==void 0||(gt=await(async()=>{const e=nn.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),gt}const Zn=["webgl","webgpu","canvas"];async function sa(t){let e=[];t.preference?(e.push(t.preference),Zn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Zn.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await ia()){const{WebGPURenderer:a}=await Xn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-CMVg6ab0.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&ra(t.failIfMajorPerformanceCaveat??Mr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Xn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-C4od9ILE.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const zr="8.8.1";class Lr{static init(){globalThis.__PIXI_APP_INIT__?.(this,zr)}static destroy(){}}Lr.extension=C.Application;class aa{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,zr)}destroy(){this._renderer=null}}aa.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Rr=class fn{constructor(...e){this.stage=new b,e[0]!==void 0&&Ze(_t,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await sa(e),fn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ze(_t,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=fn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Rr._plugins=[];let Er=Rr;At.handleByList(C.Application,Er._plugins);At.add(Lr);var la=`in vec2 aPosition;
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
`,ca=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,Kn=`struct GlobalFilterUniforms {
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
}`;const Ur=class $r extends Y{constructor(e){e={...$r.defaultOptions,...e};const n=ve.from({vertex:{source:Kn,entryPoint:"mainVertex"},fragment:{source:Kn,entryPoint:"mainFragment"}}),o=$.from({vertex:la,fragment:ca,name:"alpha-filter"}),{alpha:r,...i}=e,s=new $o({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Ur.defaultOptions={alpha:1};let ua=Ur;class tt extends Me{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof he?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ve.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ve.shared.add(this.update,this,Bi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(he.from(e[o]));return new tt(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(he.from(e[o]));return new tt(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof he)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ve.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ve.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class da extends _i{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Pi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function fa(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(Ze(_t,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class ha extends da{constructor(...e){const n=fa(e,"Text");super(n,Fi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Ai.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class On extends he{static create(e){return new On({source:new Di(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}const g={pureBlack:new v("#000000"),shadow:new v("#325149"),midGrey:new v("#7F7773"),lightGrey:new v("#BBB1AB"),white:new v("#FBFEFB"),pastelBlue:new v("#75ACFF"),metallicBlue:new v("#366CAA"),pink:new v("#D68ED1"),moss:new v("#9E9600"),redShadow:new v("#805E50"),midRed:new v("#CA7463"),lightBeige:new v("#DAA78F"),highlightBeige:new v("#EBC690"),alpha:new v("#1E7790"),replaceLight:new v("#08A086"),replaceDark:new v("#0A4730")},ge=t=>{const[e,n,o]=t.toUint8RgbArray();return new v({r:e/2,g:n/2,b:o/2})},j={original:new v(X.zxWhite),basic:g.white,dimmed:g.lightGrey},V={original:new v(X.zxYellow),basic:g.midRed,dimmed:g.redShadow},Z={original:new v(X.zxMagenta),basic:g.pink,dimmed:ge(g.pink)},O={original:new v(X.zxCyan),basic:g.pastelBlue,dimmed:ge(g.pastelBlue)},K={original:new v(X.zxGreen),basic:g.moss,dimmed:ge(g.moss)},Bn={white:{basic:{main:j,edges:{towards:O,right:V},hud:{lives:V,dimmed:Z,icons:O}},dimmed:{main:j,edges:{towards:K,right:O},hud:{lives:V,dimmed:Z,icons:O}}},yellow:{basic:{main:V,edges:{towards:K,right:j},hud:{lives:O,dimmed:Z,icons:K}},dimmed:{main:V,edges:{towards:O,right:O},hud:{lives:O,dimmed:Z,icons:K}}},magenta:{basic:{main:Z,edges:{towards:K,right:O},hud:{lives:j,dimmed:O,icons:V}},dimmed:{main:Z,edges:{towards:K,right:O},hud:{lives:j,dimmed:O,icons:V}}},cyan:{basic:{main:O,edges:{towards:Z,right:j},hud:{lives:j,dimmed:K,icons:V}},dimmed:{main:O,edges:{towards:Z,right:j},hud:{lives:j,dimmed:K,icons:V}}},green:{basic:{main:K,edges:{towards:O,right:V},hud:{lives:j,dimmed:Z,icons:O}},dimmed:{main:K,edges:{towards:O,right:V},hud:{lives:j,dimmed:Z,icons:O}}}},_n=t=>Bn[t.hue][t.shade],Pe={head:g.pastelBlue,heels:g.pink},It=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Mn>n?100-Math.ceil((n-e)/(Mn/100)):0},Nr=t=>t.type==="headOverHeels"?It(t.state.head)>0||It(t.state.heels)>0:It(t.state)>0,Gr=t=>{const e=100*z.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/z.w):0},pa={pureBlack:new v("#000000"),shadow:new v("#1B2D3B"),midGrey:new v("#505A55"),lightGrey:new v("#929981"),white:new v("#F8FEF8"),pastelBlue:new v("#4893FF"),metallicBlue:new v("#1D4E80"),pink:new v("#B973AF"),moss:new v("#6E7B00"),redShadow:new v("#513D40"),midRed:new v("#A7574B"),lightBeige:new v("#BF8E69"),highlightBeige:new v("#DBB269"),alpha:new v("#105A69"),replaceLight:new v("#048662"),replaceDark:new v("#052229")},lt=`in vec2 aPosition;
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
`,ma=`in vec2 vTextureCoord;
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
`;class ue extends Y{constructor(e){const n=Object.keys(e).length,o=$.from({vertex:lt,fragment:ma.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const ga=`precision mediump float;
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
`;class E extends Y{uniforms;constructor(e="white"){const n=$.from({vertex:lt,fragment:ga,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new v(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ba=`precision mediump float;
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
`;class va extends Y{constructor(){const e=$.from({vertex:lt,fragment:ba,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const jr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Vr=t=>jr(Bn[t.color.hue][t.color.shade].main),Xr=t=>new ue({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&Vr(t)}),ya=new ue({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),xa=t=>new ue({replaceLight:t,replaceDark:ge(t)}),hn=(t,e,n)=>n?new ue(jr(Bn[t.color.hue][t.color.shade].edges[e])):new E(_n(t.color).edges[e].original),re=t=>new ue(Vr(t)),Qn=new va,be=No,wa=new ue(pa),eo={x:.5,y:1},to=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(to(t)?c=Ca(t):c=new Me(le().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const y=p({...t,times:void 0,label:`(${f},${h},${m})`}),T=k({x:f-1,y:h-1,z:m-1});y.x+=T.x,y.y+=+T.y,d.addChild(y)}return d}if(e===void 0&&o===void 0)if(to(t))c.anchor=eo;else{const u=le().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=eo}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Ca({animationId:t,reverse:e,playOnce:n,paused:o}){const r=le().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:Go}));e&&s.reverse();const a=new tt(s);return a.animationSpeed=jo.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const Sa=`#version 300 es

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
`;class De extends Y{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=$.from({vertex:lt,fragment:Sa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const ee=new De({outlineColor:g.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),We=new E,no=new E,Pn=new E,oo=new E(g.moss),Je=new E,Q=[We,ee],Ta=[Je,ee],ka=[ee,Pn],bt={original:[ee,Je],colourised:{head:{active:[ee,new E(Pe.head)],inactive:[ee,new E(ge(Pe.head))]},heels:{active:[ee,new E(Pe.heels)],inactive:[ee,new E(ge(Pe.heels))]}}},Se=14,Ia=2,Oa=Math.cos(30*(Math.PI/180)),Ba=40;class _a{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Se,y:-14,filter:Q}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Se,y:Se,filter:Q}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Se,filter:Q}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:Q}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Se*Math.SQRT2,filter:Q}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Se*Math.SQRT2,filter:Q}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:Q}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:Q})}:{}},this.output.addChild(this.#e),this.output.addChild(new q().circle(0,0,Ba).fill("#00000000"));for(const o of te(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?be:We}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=B};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Mi(x.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=zi({x:-c,y:-u}),f=Li(d,Oa),h=D(f,Ia);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(x.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=ze(e)>Ri?vn(e):void 0;for(const[r,i]of Vo(this.arrowSprites))i.filters=r===o?Ta:Q}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const pn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey,map:g.lightGrey},zx:{jump:X.zxBlue,fire:X.zxYellow,carry:X.zxGreen,carryAndJump:X.zxRed,menu:X.zxWhite,map:X.zxWhite}};function nt(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*Hr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${e[o]}`;Ei(r),yield p({textureId:r,x:(o+.5-n/2)*St.w})}}function Oe(t,e){return t.removeChildren(),nt(Hr(e),t),t}function qr(t,e){return t.removeChildren(),nt(Hr(e),t),t}const Xe=({doubleHeight:t=!1,outline:e=!1,label:n="text"}={})=>new b({label:n,filters:e?ka:Pn,scale:{x:1,y:t?2:1}}),Ft=Symbol(),Wr=Symbol(),Jr=Symbol(),vt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=xa(pn.colourised[e]):o.filters=new E(pn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Wr]=r,o[Ft]=i,o[Jr]=n,o},$e=(t,...e)=>{t[Ft].removeChildren();for(const n of e)n!==void 0&&t[Ft].addChild(n)},yt=(t,e)=>{t[Wr].texture=le().textures[e?"button.pressed":"button"],t[Jr].y=e?1:0},ro=(t,e,n)=>{n&&(t[Ft].filters=e?Xr():be)},io=({which:t},e,n)=>{const o=qr(new b,n);return o.filters=new ue({white:e?ge(pn.colourised[t]):g.pureBlack}),o};class Yr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const Zr=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Pa=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},so=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Pa(t,e,n,o),Fn=(t,e,n=.001)=>{if(!ye(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:yn({state:{position:U(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+Ui},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Kr=(t,e)=>{const o=[...oe(e).filter(i=>Fn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=Ns(s,i);return a<0||a===0&&so(t,s)>so(t,i)?s:i})},Ye=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<$i};function Qr({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(Nr(e)||Ye(e)||(e.state.action="death",e.state.expires=t+ln))}const ie=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,ot=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,ei=t=>{const{gameState:e,movingItem:n,touchedItem:{id:o,config:r},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:a}=e;if(a[i]?.[o]!==!0)switch(s[o]&&(a[i]===void 0&&(a[i]={}),a[i][o]=!0),r.gives){case"hooter":{const l=Tt(n);if(l!==void 0){l.hasHooter=!0;break}break}case"doughnuts":{const l=Tt(n);l!==void 0&&(l.doughnuts=ie(l.doughnuts,6));break}case"bag":{const l=Ke(n);if(l!==void 0){l.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const l=Tt(n);l!==void 0&&(l.fastStepsStartedAtDistance=l.gameWalkDistance);break}case"jumps":{const l=Ke(n);l!==void 0&&(l.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ie(n.state.head.lives,2),n.state.heels.lives=ie(n.state.heels.lives,2)):n.state.lives=ie(n.state.lives,2);break;case"scroll":x.dispatch(Vi(r.page));break;case"reincarnation":{x.dispatch(Gi(ji(e,x.getState())));break}case"crown":{x.dispatch(Ni(r.planet));break}}},Fa=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Xo(i,o)<=0||e.state.action!=="death"&&Sn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},Aa=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Dt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Da({movingItem:t}){t.state.autoWalk=!1}const ne=(t,...e)=>W(...e)(t.touchedItem),Ne=(t,...e)=>W(...e)(t.movingItem),ti=t=>R(t.movingItem),Ma=t=>R(t.touchedItem),za=t=>Ho(t.touchedItem),ao=t=>{switch(!0){case ne(t,"stopAutowalk"):Da(t);break;case za(t):Qr(t);break;case ne(t,"portal"):Fa(t);break;case ne(t,"pickup"):ei(t);break;case ne(t,"doorFrame"):Aa(t);break}},J={movementType:"steady"},An=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=qo(e.items);if(r!==void 0)return Ye(r)?void 0:r;const i=n===void 0||Ye(n)||n.state.action==="death"?void 0:zn(n.state.position,t),s=o===void 0||Ye(o)||o.state.action==="death"?void 0:zn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ni=150,oi=t=>t[Math.floor(Math.random()*t.length)],ae=Object.freeze({movementType:"vel",vels:{walking:B}}),Rt=t=>Wo(t)?me[t.config.which]:me[t.type],lo=z.w/2,La=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=me.homingBot;if(!Mt(e,se))return{movementType:"steady"};const{head:s,heels:a}=qo(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=it(l.state.position,t);if(Math.abs(c.y)<lo)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<lo)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Ra=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ae;const l=An(r,e);if(l===void 0||s+ni>e.roomTime)return J;const c=it(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>z.w/4?u:st(u),f=Rt(t),h={...B,[d]:c[d]>0?f:-f},m=xe(h),y=!Mt(m,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...y?{timeOfLastDirectionChange:e.roomTime}:pe}}},co=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ae;const a=An(i,e);if(a===void 0)return ae;const l=a.state.position,c=z.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ae;const d=it(a?.state.position,i),f=Rt(t),h=(1+Math.sqrt(2))/2,m=f*h,y=D({...d,z:0},m/Jo(d)*(r?-1:1));return{movementType:"vel",vels:{walking:y},stateDelta:{facing:xe(y)}}},Xt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ae;if(!(we(i,B)||Math.random()<o/1e3))return J;const l=oi(r);return{movementType:"vel",vels:{walking:D(on[l],Rt(t))},stateDelta:{facing:on[l]}}},Ea=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ae:Mt(i,se)?{movementType:"vel",vels:{walking:D(r,Rt(t))}}:J},Ua=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=oi([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},Ht=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ni))return;const c=Lt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Ua(s,c,r);t.state.vels.walking=u,t.state.facing=xe(u),t.state.durationOfTouch=0},$a=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=B)},Na=(t,e,n,o)=>{if(!t.state.activated||Wo(t)&&t.state.busyLickingDoughnutsOffFace)return ae;switch(t.config.movement){case"patrol-randomly-diagonal":return Xt(t,e,n,o,Wi);case"patrol-randomly-xy8":return Xt(t,e,n,o,qi);case"patrol-randomly-xy4":return Xt(t,e,n,o,Hi);case"towards-tripped-on-axis-xy4":return La(t,e);case"towards-on-shortest-axis-xy4":return Ra(t,e);case"back-forth":case"clockwise":return Ea(t);case"unmoving":return ae;case"towards-analogue":return co(t,e);case"towards-analogue-unless-planet-crowns":return co(t,e,n,o,Xi(x.getState()));default:throw t.config,new Error("this should be unreachable")}},Ga=t=>{const{movingItem:e,touchedItem:n}=t;if(ye(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Ht(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Ht(t,"opposite");break;case"clockwise":Ht(t,"clockwise");break;case"towards-tripped-on-axis-xy4":$a(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},ja=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s]})}break}case"in-store":{x.dispatch(Ji(o.path));break}}},Va=({movingItem:t,touchedItem:e})=>{if(!ye(t))return;const{state:{position:n},aabb:o}=e,r=Lt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=xe(r),s=D(i,-.05);return e.state.vels.sliding=s,!1},Xa=({movingItem:t,touchedItem:e})=>{if(!ye(e))return;const n=t.state.vels.sliding;if(we(n,B))return;const{state:{position:o},aabb:r}=t,i=Lt(e.state.position,e.aabb,o,r);return Xo(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=B),!1},Ha=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=Lt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=xe(c);for(const d of s){const f=e.items[d],h=D(u,-.025*o);f.state.facing=h,Tn({room:e,subjectItem:f,gameState:r,pusher:n,posDelta:h,deltaMS:o,onTouch:i})}},ct=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:xn(x.getState(),t),qa=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&W("teleporter")(l)&&ct(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:ln}}}:J;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Sn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:ln}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},Wa=1e3/12,xt=t=>{const n=t/Qi*Go;return(t+.5*rn*n**2)/n},Ja={head:xt(dt.head),headOnSpring:xt(dt.head+z.h),heels:xt(dt.heels),heelsOnSpring:xt(dt.heels+z.h)},uo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ja[`${n}${e?"OnSpring":""}`]},Ya=t=>!(t===null||Zi(t)&&ct(t)||Ki(t)&&t.config.gives==="scroll"||R(t)&&t.state.standingOnItemId===null),Za=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+Wa>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),ri=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=Le(o,e);if(Za(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:uo(t,!1)}},stateDelta:{}};if(!(r.currentActionPress("jump")!=="released"&&Ya(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:J;const a=Yi(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:uo(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},Ka=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=ze(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return D(n,l)},fo={movementType:"vel",vels:{walking:B}},ii=(t,e,n,o)=>{const r=Qa(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=ze(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!we(r.vels.walking,B)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Qa=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,y=o===t.id,T=y?n.currentActionPress("jump"):"released",_=y?n.directionVector:B,P=l===null&&m.z<0,F=i==="head"&&Gr(t.state)>0&&l!==null,N=i==="headOverHeels"?P?"head":"heels":F?"heels":i,A=a?c:_,G=me[N];if(u!==null||s==="death")return fo;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Yo(h,D(h,es*r))}}:fo;if(T!=="released"){const ut=xe(Mt(A,se)?c:A),Si=W("spring")(Le(l,e))?1:ts;return{movementType:"vel",vels:{walking:D({...ut,z:0},G*Si)},stateDelta:{facing:ut}}}}if(ze(A)!==0)return P?{movementType:"vel",vels:{walking:D({...A,z:0},G)},stateDelta:{facing:A,action:"falling"}}:{movementType:"vel",vels:{walking:Ka({vel:h,acc:ns[N],deltaMS:r,maxSpeed:G,unitD:A,minSpeed:0})},stateDelta:{facing:A,action:"moving"}};if(d>0&&d<1){const ut=we(f,c)?1:0;return{movementType:"position",posDelta:D(c,ut-d),stateDelta:{action:P?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:B},stateDelta:{action:P?"falling":"idle"}}},ho=t=>Ce(t.movingItem)&&Fn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),si=(t,e)=>{let n=B;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(Ce(t)||W("lift")(t)))for(const[i,s]of Vo(o.vels)){const a={...B,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},po=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&R(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&ho(t)){if(ho(t)&&ti(t)){Zo({above:t.movingItem,below:t.touchedItem});const n=[ri(t.movingItem,t.room,t.gameState),ii(t.movingItem,t.room,t.gameState,t.deltaMS)];si(t.movingItem,n)}sr(t)}};function el(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Dn=t=>{ti(t)&&ao(t),Ma(t)&&ao({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),ne(t,...Ln)&&Va(t),Ne(t,...Ln)&&Xa(t),(Ne(t,"monster")&&ne(t,"firedDoughnut")||Ne(t,"firedDoughnut")&&ne(t,"monster"))&&el(t),(Ne(t,"monster")||Ne(t,"movingPlatform"))&&Ga(t),ne(t,"switch")&&ja(t),ne(t,"joystick")&&Ha(t,Dn),t.touchedItem.state.disappear&&po(t),t.movingItem.state.disappear&&ye(t.touchedItem,t.movingItem)&&po({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},tl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ce(e.items).filter(Ko),u=s===null?ai(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;nl(e,i,u)}else{if(t.state.standingOnItemId===null||!li(t,Qo(e.items)))return;const h=os({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Tn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Dn}),i.carrying=null}},nl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,er({room:t,item:n})},ai=(t,e)=>Kr(t,ce(e.items).filter(Ko)),li=(t,e)=>{const n={position:U(t.state.position,{z:z.h})},o=rs({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(ye(r,t)){if(!Ce(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!li(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},qt=-11,ol={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter"&&ct(l),u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?vt({colourise:n,button:t}):r;if(o?.pressed!==u&&yt(d,u),c!==o?.standingOnTeleporter)if(c)$e(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=io(t,n,"JUMP");f.y=qt,$e(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const a=i&&Ke(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&ai(i,s)!==void 0,d=t.actions.every(y=>e.currentActionPress(y)!=="released"),f=l&&!u&&c===null,h=r===null?vt({colourise:n,button:t}):r;if(h.visible=l,l&&(f!==o?.disabled&&ro(h,f,n),h.visible=!0,o?.pressed!==d&&yt(h,d),l!==o?.hasBag||c!==o?.carrying)){let y;c!==null?y=Zr(c):l&&(y=p({textureId:"bag",y:-2})),$e(h,y)}return{output:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&Tt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?vt({colourise:n,button:t}):r,d=a||ot(l)>0;if(u.visible=d,d&&(o?.pressed!==c&&yt(u,c),a!==o?.hasHooter||l!==o?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):ot(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=Oe(new b,l);h.y=qt,h.filters=ee,$e(u,f,h),ro(u,l===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const a=(i&&Ke(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||l!==o.pressed||n!==o.colourise||a!==o.hasBag))return"no-update";let u;if(r===null){u=vt({colourise:n,button:t});const d=io(t,n,"C+J");d.y=qt,$e(u,d)}else u=r;return a?(u.visible=!0,o?.pressed!==l&&yt(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=Q,{output:e,renderProps:pe}},map({previousRendering:t}){if(t!==null)return"no-update";const e=Xe({label:"mapText",outline:!0});return qr(e,"MAP"),{output:e,renderProps:pe}}};class Te extends Yr{constructor(e){const n=ol[e.button.which];super(e,n)}}const rl=30,il=15,sl=42,al=36,ll=44,cl=20;class ul{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Te({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new Te({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new Te({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new Te({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new Te({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n}),map:new Te({button:{which:"map",actions:["map"],id:"map"},colourise:r,inputStateTracker:n})},joystick:new _a({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const{renderContext:{button:{which:l}},output:c}of te(i))l==="menu"||l==="map"?this.#e.addChild(c):s.addChild(c);i.jump.output.y=il,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=rl,i.menu.output.x=24,i.menu.output.y=24,i.map.output.y=16,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of te(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-ll,this.#n.mainButtonNest.y=e.y-cl,this.#n.joystick.output.x=sl,this.#n.joystick.output.y=e.y-al,this.#n.buttons.map.output.x=e.x-4*8}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of te(this.#n.buttons))r.tick({...e,currentPlayable:Re(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}jo.frames.button.frame;const dl=250,fl=t=>t?48:24,hl=t=>t?68:56,pl=(t,e)=>t?e.x/2-24:80,ml=t=>t?72:24,gl=t=>t?88:0,mo=112,Ge=t=>t==="heels"?1:-1;class bl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Nt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[oo],this.#t.fps.y=St.h,this.#o(),n&&(this.#n=new ul({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#a("head"),livesText:Xe({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#r({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#r({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#a("heels"),livesText:Xe({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#r({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#r({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#r({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:Xe({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Nt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#r({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new Me({texture:le().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:no,y:n?0:8});s.addChild(a);const l=Xe({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=St.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=ee),{text:l,icon:a,container:s}}#a(e){const n=new Me(le().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ge("head")*mo,this.#t.head.doughnuts.container.y=e.y-He.h-8,this.#t.heels.carrying.container.y=e.y-He.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ge("heels")*mo,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-St.w*2}#s(e,n){return e?n?be:Je:n?Qn:We}#l(e){const{renderContext:{gameState:n}}=this,o=ft(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(Zr(i)),a.filters=this.#s(!0,s),this.#t.heels.bag.icon.filters=this.#s(r,s)}#c(e){const{renderContext:{gameState:n}}=this,o=ft(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#s(r,s),this.#t.head.doughnuts.icon.filters=this.#s(i!==0,s),Oe(this.#t.head.doughnuts.text,i)}#f(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ft(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=It(i),d=u>0||!o;a.visible=d,d&&(Oe(s,u),a.y=n.y-gl(o)),c.x=a.x=(n.x>>1)+Ge(e)*pl(o,n);const f=i===void 0?0:e==="head"?Gr(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(Oe(l,f),c.y=n.y-ml(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#u(r,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?be:Je:s.filters=a?Qn:We,s.x=(n.x>>1)+Ge(e)*hl(o),s.y=n.y-He.h}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ft(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ge(e)*fl(o),a.y=n.y,Oe(a,s??0)}#m(e){const{room:n}=e;if(n===void 0)return;const o=_n(n.color),{colourise:r,gameState:i}=this.renderContext;We.targetColor=o.hud.dimmed[r?"dimmed":"original"],Pn.targetColor=o.hud.dimmed[r?"basic":"original"],no.targetColor=o.hud.icons[r?"basic":"original"],Je.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?bt.colourised.head[this.#u(i,"head")?"active":"inactive"]:bt.original,this.#t.heels.livesText.filters=r?bt.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:bt.original}#d=is;#g(){if(ss(x.getState())){if(performance.now()>this.#d+dl){const e=Ve.shared.FPS;Oe(this.#t.fps,Math.round(e)),oo.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#m(e);for(const n of Nt)this.#p(n,e),this.#h(n,e),this.#f(n,e);this.#i(e),this.#c(e),this.#l(e),this.#g(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const go={movementType:"vel",vels:{gravity:B}},vl=(t,e,n,o)=>{if(!ye(t))return go;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=as[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=Le(s,e);return W("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-rn*o,-l)}}}:go}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-rn*o,-l)}}}},bo=z.h,vo=.001,yl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=Rn**2/(2*Ee);if(n==="up"){if(e<=o)return Math.max(vo,Math.sqrt(2*Ee*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(vo,Math.sqrt(2*Ee*r))}else return Rn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Ee*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Ee*Math.max(e,0))):-.036};function xl({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}}){const r=t*bo,i=e*bo,s=yl({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}}const yo={movementType:"vel",vels:{movingFloor:B}},wl=(t,e,n,o)=>{if(R(t)&&t.state.teleporting!==null)return yo;const{state:{standingOnItemId:r}}=t,i=Le(r,e);if(i===null||!W("conveyor")(i))return yo;const{config:{direction:s}}=i,l=W("heels")(t)&&t.state.action==="moving"&&wn(t.state.facing)===ls(s)?me.heels:cs;return{movementType:"vel",vels:{movingFloor:D(on[s],l)}}};function*Cl(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Sl=z.w*Math.sqrt(2)+1,Tl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=xe(d);if(r.currentActionPress("fire")==="tap"&&a&&ot(s)>0&&l+f<c){const m={type:"firedDoughnut",...us,config:pe,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,D(h,Sl),t.type==="headOverHeels"?{z:z.h}:B),vels:{fired:D(h,me.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};Cn({room:e,item:m}),i.doughnuts=ie(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},ci=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),kl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),wt=z.w*3,Il=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-wt&&n.x<o.x+wt&&n.y>o.y-wt&&n.y<o.y+wt},xo=(t,e,n,o,r)=>{if(r&&t.state.activated)return J;const i=An(t.state.position,e);return i===void 0?J:Il(t,i)?ci:kl},Ol=(t,e,n,o)=>t.state.activated?J:at(t.state.stoodOnBy,e).some(R)?ci:J,Bl=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return xo(t,e,n,o,!0);case"while-player-near":return xo(t,e,n,o,!1);case"on-stand":return Ol(t,e);case"off":case"on":return J;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},_l=2;function*Pl(t,e,n,o){Ce(t)&&(yield vl(t,e,n,o),yield wl(t,e),yield*Cl(t,e)),R(t)&&(yield ii(t,e,n,o),t.id===n.currentCharacterName&&(yield qa(t,e,n,o),yield ri(t,e,n),ds(t)&&tl(t,e,n,o),fs(t)&&Tl(t,e,n))),hs(t)&&(yield xl(t)),ps(t)&&(yield Bl(t,e,n,o),yield Na(t,e,n,o))}const Fl=(t,e,n,o)=>{if(!Ce(t)||t.state.standingOnItemId===null)return;const r=Le(t.state.standingOnItemId,e);R(t)&&r.type==="pickup"&&ei({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||R(t)&&r.state.disappear==="onTouchByPlayer")&&sr({touchedItem:r,gameState:n,room:e})},Al=(t,e,n,o)=>{if(R(t)&&t.state.standingOnItemId!==null){const l=Le(t.state.standingOnItemId,e);(Ho(l)||l.type==="spikes")&&Qr({room:e,movingItem:t})}const r=[...Pl(t,e,n,o)];Fl(t,e,n);let i=si(t,r);(Ce(t)||W("lift")(t)||W("firedDoughnut")(t))&&(i=U(i,...oe(te(t.state.vels)).map(l=>D(l,o))));const s=Math.ceil(ze(i)/_l),a=D(i,1/s);for(let l=0;l<s;l++)Tn({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:o,onTouch:Dn})},Dl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ie(e.state.head.lives,-1),e.state.heels.lives=ie(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ie(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=ot(e.state.head.lives)>0,i=ot(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,fe(t,e);const u=En(e)[c],d=Fe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Un(u)};return}if(t.entryState.headOverHeels!==void 0){fe(t,e);const c=Fe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=En(e);if(fe(t,c),fe(t,u),yn(c,u)){const d=tr({head:c,heels:u});fe(t,d,"heels");const f=Fe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Un(d)};return}else{const d=Fe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Fe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=gs({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??pe});for(const i of e)Cn({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Gs(r,t);return r},fe=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Ml=(t,e)=>{const n=nr(t,or(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];fe(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=tr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});fe(t,a);const l=Fe({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Cn({room:o,item:e});return}else{const s=Fe({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},zl=(t,e)=>{e.type==="headOverHeels"?Dl(t,e):Ml(t,e),Re(t)===void 0&&x.dispatch(ms({offerReincarnation:!0}))},Ll=t=>{for(const e of ce(t.items))for(const n of at(e.state.stoodOnBy,t)){if(!t.items[n.id]){$n(n,t);continue}if(!Fn(n,e)){$n(n,t);const o=Kr(n,Qo(t.items));o!==void 0&&Zo({above:n,below:o})}}},Rl=2*js,El=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Rl,positionDelta:n})},Ul=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Yo(o.state.position,r),z:0};if(!we(s,B))for(const a of at(o.state.stoodOnBy,e))El(a,e,s)}},$l=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Nl=t=>{for(const e of ce(t.items)){const n=e.state.position;e.state.position=ys(n)}},Gl=(t,e)=>{for(const n of ce(t.items))!Ce(n)||t.roomTime===n.state.actedOnAt.roomTime||xs(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=ws(n.state.position),e.add(n))},jl=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},Vl=pe,Xl=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let o=0;o<t.gameSpeed;o++){const r=wo(t,e),i=Qe(t)?.items??Vl;n=new Set(oe(cn(n,r)).filter(({id:s})=>i[s]!==void 0))}return n}return wo(t,e*t.gameSpeed)},wo=(t,e)=>{const n=Qe(t);if(n===void 0)return rr;Hl(t,n,e);const o=Object.fromEntries(bs(n.items).map(([s,a])=>[s,a.state.position]));vs(t);for(const s of te(n.items))$l(s,n)&&(er({room:n,item:s}),R(s)&&zl(t,s));const r=Object.values(n.items).sort(jl);for(const s of r){const a=Re(t);if(a===void 0||a.state.action==="death")break;if(n.items[s.id]!==void 0)try{Al(s,n,t,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item ${s.id}: ${l}`)}}Ll(n),Nl(n);const i=new Set(oe(te(n.items)).filter(s=>o[s.id]===void 0||!we(s.state.position,o[s.id])));return Ul(i,n,o),Gl(n,i),i},Hl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=Re(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=nr(t,or(o.type));i!==void 0&&(i.state.gameTime+=n)}}},Co=(t,e)=>{const n=S(t),o=S(U(t,{x:e.x,z:e.z})),r=S(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Wt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,ql=(t,e,n,o)=>{const r=Co(t,e),i=Co(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Wt(s,a,l,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,y=Wt(d,f,h,m),T=r.topLeft.y+r.topLeft.x/2,_=r.bottomCentre.y+r.bottomCentre.x/2,P=i.topLeft.y+i.topLeft.x/2,F=i.bottomCentre.y+i.bottomCentre.x/2,N=Wt(T,_,P,F);return u&&y&&N},Wl=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!ql(n,o,r,i))return 0;for(const s of Cs){const a=t.state.position[s],l=a+o[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return So(e)-So(t)},So=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Ot extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Jl=t=>{const e=Yl(t);let n=e.length,o=n;const r=new Array(n),i={},s=Zl(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new Ot([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(m){throw m instanceof Ot?m.hasClosedCycle?m:new Ot([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function Yl(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Zl(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const To=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},Ct=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Kl=(t,e=new Set(te(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||Ct(n,r,s);for(const r of e)if(r.renders)for(const i of te(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=Wl(r,i);if(To(o,r,i),s===0){Ct(n,r.id,i.id),Ct(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;To(n,a,l),Ct(n,l,a)}return n},ui=(t,e,n=3)=>{try{return{order:Jl(t),impossible:!1}}catch(o){if(o instanceof Ot){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:ui(t,e,n-1).order,impossible:!0}}else throw o}};class Ql extends Yr{}const ko=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Io=(t,e)=>{const n=new q;return ko(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),ko(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},ec={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class tc{constructor(e){this.renderContext=e;const{item:n}=e,o=ec[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),W("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new q().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new q().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new q({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Io(n.aabb,o)),n.renderAabb&&this.#e.addChild(Io(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new ha({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class nc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const oc=(t,e)=>{const n=e.getLocalBounds(),o=On.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new Me({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Oo=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof Me?r:oc(t,r)};class rc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=x.getState();n||(this.#e.filters=new ua({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,a=Oo(r,i,s);o.shadowMask.relativeTo==="top"&&(a.y-=o.aabb.z),s&&(a.y-=((s.z??1)-1)*z.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),a=o.state.position.z+o.aabb.z,l=ce(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:a}},aabb:{...o.aabb,z:Ss}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":yn(c,d)?f?"update":"create":"noShadow"});for(const d of cn(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=Oo(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of cn(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...it(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Pt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const ic=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,sc=(t,e,n)=>{const r=le().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&le().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},je=t=>M(({renderContext:{item:e}})=>Ts(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),M=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:pe}:"no-update";function*ac({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Dt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...kt(a,{y:-12*n})});l.filters=hn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...kt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...kt(a,{y:-l*z.h})})}}yield*s(k({...se,[r]:1})),yield*s(se),e||(yield p({pivot:{x:16,y:z.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...k({...se,[r]:1})}))}const di=(t,e)=>{const n=Dt(t),o=st(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):se},lc=M(({renderContext:{item:t,room:e}})=>nt(ac(t,e),new b({filters:re(e),...di(t.config.direction,t.aabb)}))),cc=M(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Dt(t),a=i.rooms[n];return p({textureId:sc(r,s,e),filter:re(a),...di(t,o)})}),Jt={animationId:"bubbles.cold"},Ae=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},fi=Symbol(),hi=Symbol(),uc=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[fi]=t,n[hi]=e,n},dc=`#version 300 es

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
`;class Bo extends Y{constructor(e){const n=$.from({vertex:lt,fragment:dc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const fc=({name:t,action:e,facingXy8:n,teleportingPhase:o,paused:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:r};if(o==="out")return{animationId:`${t}.fadeOut`,paused:r};if(o==="in")return{animationId:`${t}.fadeOut`,paused:r};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:r};if(e==="falling"){const s=`${t}.falling.${n}`;if(Os(s))return{textureId:s}}const i=`${t}.idle.${n}`;return Bs(i)?{animationId:i,paused:r}:{textureId:`${t}.walking.${n}.2`}},mn=Symbol(),gn=Symbol(),hc=(t,e)=>{t[mn].removeChildren(),t[mn].addChild(p(fc(e)))},Yt=(t,e,n)=>{const o=new b,r=new b;o[mn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new ue({pastelBlue:g.pink}):be,flipX:t==="heels"});return o[gn]=i,o},_o=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Is>t,pc=t=>{if(!Ye(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Nn<Nn*.15},Po=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Fo=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?be:t.filters},mc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Po(r,new De({outlineColor:Pe[t],upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Fo(r,De);const s=o?.flashing??!1;n&&!s?Po(r,new Bo(Pe[t])):!n&&s&&Fo(r,Bo)},gc=(t,e,n)=>{e&&!n?t.addChild(t[gn]):!e&&n&&t.removeChild(t[gn])},Zt=(t,e,n,o,r,i)=>{n&&hc(e,{name:t,...o,paused:r}),mc(t,o,i,e),gc(e,o.shining,i?.shining??!1)},Kt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:a,teleporting:l}}=e,c=vn(a)??"towards",u=e.type==="headOverHeels"?_o(e.state.head,"headOverHeels","headOverHeels"):_o(e.state,e.type,n.currentCharacterName),d=pc(e),f=Nr(e),h=ze(a),m=l?.phase??null,y={action:s,facingXy8:c,teleportingPhase:m,flashing:d,highlighted:u,shining:f},T=t===void 0||t.action!==s||t.facingXy8!==c||t.teleportingPhase!==m;let _;if(i==="headOverHeels"){_=r??uc({top:Yt("head",!0,o),bottom:Yt("heels",!0,o)});const P=_;Zt("head",P[fi],T,y,o,t),Zt("heels",P[hi],T,y,o,t)}else _=r??Yt(i,!1,o),Zt(i,_,T,y,o,t);return s==="moving"&&r instanceof tt&&(r.animationSpeed=h*ks),{output:_,renderProps:y}},bc=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...k({x:-e.x,y:-e.y})}),r=nt(oe(Pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...k(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=nt(oe(Pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...k(kt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...k({...l,z:0}),times:{[st(et(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},vc=t=>[...oe(te(t.items)).filter(e=>e.type==="wall").filter(e=>et(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],yc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},xc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new q().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(k),!0).fill(0),wc=M(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=zt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const P=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,F=new b;for(let A=-1;A<=r+2;A++)for(let G=A%2-1;G<=i+2;G+=2)F.addChild(_s({x:A+(s.right?-.5:0),y:G+(s.towards?-.5:0)},p({textureId:P})));F.addChild(bc(h,{x:n,y:o}));const N=new q().poly([se,k({x:c,y:0}),k({x:c,y:u}),k({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});F.addChild(N),F.filters=re(t),F.mask=N,m.addChild(F)}const y=vc(h),T=new q().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(T);const _=yc(y);if(_!==void 0){const P=xc({extraWallRanges:_,blockXMin:n,blockYMin:o});m.addChild(P)}return m.mask=T,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Cc=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=k({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return oe(Pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...k(f),times:a.type==="wall"?a.config.times:{[st(et(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...k(U(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...k(U(f,{x:-.5}))}))}),i},Sc=M(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=zt(e.roomJson),l=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new q({label:"overDrawToHideFallenItems"}).poly([k({x:l,y:0}),k({x:0,y:0}),k({x:0,y:c}),{...k({x:0,y:c}),y:999},{...k({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=Cc({blockXMin:n,blockYMin:o},e.roomJson);f.filters=hn(e,"towards",t),h.filters=hn(e,"right",t),u.addChild(f),u.addChild(h);const m=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),Tc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],kc=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,a=s?ya:i?void 0:Tc.includes(t.which)?Xr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const l=wn(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||l!==r.facingXy4))return"no-update";const u={facingXy4:l,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${l}`,filter:a}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${l}`,filter:a}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${l}`,filter:a}:{textureId:`${t.which}.${l}.1`,filter:a}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Ae({top:{textureId:`${t.which}.${l}`,filter:a||re(n)},bottom:{...Jt,paused:o}}):p({textureId:`${t.which}.${l}`,filter:a}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Ae({top:`${t.which}.${l}`,filter:a}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:a}:{textureId:`${t.which}.1`,filter:a}),renderProps:c};case"homingBot":return{filter:a,output:p({textureId:t.which,filter:a}),renderProps:c};case"bubbleRobot":return{output:Ae({top:{...Jt,paused:o},filter:a}),renderProps:c};case"emperorsGuardian":return{output:Ae({top:"ball",bottom:{...Jt,paused:o},filter:a}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:a,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},rt=t=>{for(const e in t)return!0;return!1},Ic=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Qt=g.moss,Ao=()=>M(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Oc={head:Kt,heels:Kt,headOverHeels:Kt,doorFrame:cc,doorLegs:lc,monster:kc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:M(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=st(et(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:ic(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:qe.w,y:qe.h+1}:{x:0,y:qe.h+1},filter:re(o)}),l=k({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:M(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:M(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?re(n):void 0,times:e})),spikes:je("spikes"),slidingDeadly:Ao(),slidingBlock:Ao(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:Ic(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?re(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?xn(x.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=rt(n);if(!(r===void 0||r.moving!==i))return"no-update";const a=new b,l=et(t);return a.addChild(p(i?{animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${l}.6`,times:e})),{output:a,renderProps:{moving:i}}},lift:M(({renderContext:{paused:t}})=>{const e=new b,n={x:He.w/2,y:He.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=ct(t),a=s&&at(r,e).find(R)!==void 0;return o===void 0||s!==o.activated||a!==o.flashing?{output:a?new b({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:a,activated:s}}:"no-update"},pickup:M(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:re(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:M(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=wn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Ae({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:je("joystick"),movingPlatform:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:M(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new De({outlineColor:Qt,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=rt(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const a=o?.compressed??!1,l=e?new De({outlineColor:Qt,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===a&&e!==o?.highlighted;let u;return c?(r.filters=l??No,u=r):u=p(!i&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:l}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new De({outlineColor:Qt,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Ae({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:je("hushPuppy"),bubbles:M(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:je({animationId:"bubbles.doughnut"}),ball:je("ball"),floor:wc,floorEdge:Sc};class Bc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const H=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,randomiseStartPoint:a=!1}=e,l=w.createBufferSource(),c=sn()[o];return l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},ke=(t,e,n)=>{const o=w.createGain();return e!==void 0&&(o.gain.value=e),t.connect(o),o.connect(n),o},L=({start:t,change:e,loop:n,stop:o,startAndLoopTogether:r=!1},i)=>{let s,a;return l=>{if(!!l!=!!a)l?t!==void 0?(s?.stop(),s=H({...t}),ke(s,t.gain,i),n!==void 0&&(r?(s=H({...n,loop:!0}),ke(s,n.gain,i)):s.onended=()=>{a&&(s=H({...n,loop:!0}),ke(s,n.gain,i))})):n!==void 0&&(s=H({...n,loop:!0}),ke(s,n.gain,i)):(s&&s.loop&&(s.stop(),s.onended=null),o!==void 0&&(s=H({...o}),ke(s,o.gain,i)));else if(a!==l&&e!==void 0){const u=H({...e});ke(u,e.gain,i)}a=l}};class _c{constructor(e){this.renderContext=e,this.output.gain.value=4}output=w.createGain();#e=L({loop:{soundId:"rollingBallLoop",playbackRate:.5}},this.output);tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Pc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;n.type==="pickup"&&n.gives!=="scroll"&&H({soundId:"bonus",connectTo:this.output})}output=w.createGain();tick(){}destroy(){}}class Fc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n.connect(this.output),this.#n.gain.value=.3}output=w.createGain();#e=w.createGain();#n=w.createGain();#t=L({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o=L({start:{soundId:"metalHit"}},this.#n);tick(){const{renderContext:{item:e,room:{roomTime:n,items:o}}}=this,{state:{actedOnAt:{roomTime:r,by:i},collidedWith:{roomTime:s,by:a}}}=e,l=n===r&&oe(an(i)).some(u=>Ps(o[u]));this.#t(l);const c=n===s&&!lr(an(a));this.#o(c)}destroy(){}}const en=2;class Ac{constructor(e){this.renderContext=e}output=w.createGain();#e=L({start:{soundId:"conveyorStart",playbackRate:en},loop:{soundId:"conveyorLoop",playbackRate:en},stop:{soundId:"conveyorEnd",playbackRate:en}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=rt(e);this.#e(n)}destroy(){this.#e(!1)}}const Dc=3;class Mc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=w.createGain();#e=H({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Dc*e)}destroy(){}}const Do={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit"},homingBot:{soundId:"metalHit"},computerBot:{soundId:"metalHit"}},Mo={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},zo={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop"},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"}},Lo={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class zc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66;const{item:{config:{which:n}}}=e;Do[n]!==void 0&&(this.#r=L({start:Do[n]},this.#e)),Mo[n]!==void 0&&(this.#t=L({change:Mo[n]},this.#e)),Lo[n]!==void 0&&(this.#a=L(Lo[n],this.#e)),zo[n]!==void 0&&(this.#o=L({loop:zo[n]},this.#n))}output=w.createGain();#e=w.createGain();#n=w.createGain();#t;#o;#r;#a;tick(){const{renderContext:{item:e,room:{roomTime:n}}}=this,{state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i,collidedWith:{roomTime:s,by:a},vels:{walking:l}}}=e;if(this.#t){const c=vn(o);this.#t(c)}if(this.#r){const c=n===s&&!lr(an(a));this.#r(c)}if(this.#o){const c=r&&!i;this.#o(c)}if(this.#a){const c=!we(l,B);this.#a(c)}}destroy(){}}class tn{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=.8,this.#t.connect(this.output),this.#a.gain.value=1.2,this.#a.connect(this.output);const n=e.item.type;this.#n=L({loop:{soundId:`${n==="headOverHeels"?"heels":e.item.type}Walk`}},this.#e),this.#o=L({start:{soundId:`${n==="headOverHeels"?"head":e.item.type}Jump`}},this.#t),this.#r=L({loop:{soundId:`${n==="headOverHeels"?"head":e.item.type}Fall`}},this.#t)}output=w.createGain();#e=w.createGain();#n;#t=w.createGain();#o;#r;#a=w.createGain();#i=L({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#a);#s={teleportingPhase:null,positionZ:0};tick(){const{renderContext:{item:e}}=this,{state:{action:n,teleporting:o,jumpStartZ:r,jumped:i,standingOnItemId:s,position:{z:a},vels:{gravity:{z:l}}}}=e,c=Ke(e),{teleportingPhase:u,positionZ:d}=this.#s,f=o?o.phase:null,h=i&&a>r&&a>d&&l>0,m=a<d&&l<0&&s===null;if(this.#r(m),this.#o(h),this.#n(!h&&!m&&n==="moving"),c!==void 0&&this.#i(c.carrying!==null),f!==null&&f!==u)if(f==="in"){const y=sn().teleportIn,T=w.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}else{const y=sn().teleportOut,T=w.createBufferSource();T.buffer=y,T.connect(this.output),T.start()}this.#s={teleportingPhase:f,positionZ:a}}destroy(){}}class Lc{constructor(e){this.renderContext=e}output=w.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=rt(e);!o&&r&&H({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Rc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=L({loop:{soundId:"stepStoolScraping"}},this.output),this.output.gain.value=.4)}output=w.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Ec{constructor(e){this.renderContext=e}output=w.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=rt(e);n&&!o&&H({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Uc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=w.createGain();#e=w.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?xn(x.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&H({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class $c{constructor(e){this.renderContext=e}output=w.createGain();#e=L({loop:{soundId:"teleportWarningSiren"}},this.output);tick(){const{renderContext:{item:e,room:n}}=this;this.#e(ct(e)&&at(e.state.stoodOnBy,n).some(R))}destroy(){}}const Nc={lift:Mc,switch:Uc,bubbles:Pc,head:tn,heels:tn,headOverHeels:tn,teleporter:$c,monster:zc,conveyor:Ac,spring:Ec,portableBlock:Lc,charles:Fc,ball:_c,pushableBlock:Rc},Gc=t=>{const e=Nc[t.item.type];if(e)return new e(t)};class jc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output);const{room:{size:{y:o,x:r}}}=e;this.roomMaxProjectedX=Gt(Gn({x:0,y:o})),this.roomMinProjectedX=Gt(Gn({x:r,y:0}))}output=w.createStereoPanner();roomMaxProjectedX;roomMinProjectedX;tick(e){this.childRenderer.tick(e);const n=this.renderContext.item.state.position,o=Math.min(1,Math.max(-1,(Gt(n)-this.roomMinProjectedX)/(this.roomMaxProjectedX-this.roomMinProjectedX)*2-1));this.output.pan.value=o}destroy(){this.childRenderer.destroy()}}const Vc=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Xc=t=>t.item.shadowMask!==void 0,Hc=t=>{const e=x.getState(),n=Fs(e),o=As(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const d=Oc[r.type],f=new Ql(t,d);a.push(f),s&&(f.output.alpha=.66),o&&Xc(t)&&a.push(new rc(t))}s&&a.push(new tc(t));let l;if(a.length===0)l=void 0;else{const d=a.length===1?a[0]:new qc(a,t);Vc(r,d.output,i),l=new nc(t,d)}const c=t.paused?void 0:Gc(t),u=c===void 0?void 0:new jc(t,c);return new Bc(t,{graphics:l,sound:u})};class qc{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Ie=.33,Wc=Ds()==="mobile"?-4:16,bn=qe.h-qe.w/2,Jc=me.heels,Yc=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=zt(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-Wc-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-bn<0;return(m,y,T)=>{if(m===void 0)return;const _=S(m.state.position),P=U(_,u),F={x:d&&P.x<n.x*Ie?Math.min(-a,n.x*Ie-_.x):f&&P.x>n.x*(1-Ie)?Math.max(n.x-l,n.x*(1-Ie)-_.x):u.x,y:h&&P.y<n.y*Ie?n.y*Ie-_.y:u.y};if(T)e.x=F.x,e.y=F.y;else{const N=Jc*y,A=it(e,F),G=Jo(A);if(G>N){const $t={x:A.x/G,y:A.y/G};e.x-=$t.x*N,e.y-=$t.y*N}else e.x=F.x,e.y=F.y}}},Zc=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=zt(t);return new q().rect(e+o.x,r-bn,n-e,o.y-r+bn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class Kc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=x.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??ir.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(Zc(e.room.roomJson)),this.#s=Yc(e.room,this.#t,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=w.createGain();output={sound:this.#o,graphics:this.#t};#r=!1;#a=new Map;#i=new Map;#s;initFilters(e,n){this.#e.filters=e?n.shade==="dimmed"?wa:be:new E(_n(n).main.original)}#l(e){const{room:n}=this.renderContext;for(const o of ce(n.items)){let r=this.#i.get(o.id);if(r===void 0){r=Hc({...this.renderContext,item:o}),this.#i.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:a}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),a&&a.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#i.entries())n.items[o]===void 0&&(r.destroy(),this.#i.delete(o))}#c(e){const{order:n}=ui(Kl(this.renderContext.room.items,e.movedItems,this.#a),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#i.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(ce(this.renderContext.room.items))};this.#s(Re(this.renderContext.gameState),n.deltaMS,!this.#r),this.#l(n),(!this.#r||n.movedItems.size>0)&&this.#c(n),this.#r=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#i.forEach(e=>{e.destroy()})}}var Et=`in vec2 aPosition;
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
}`,Qc=`precision highp float;
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
`,eu=`struct CRTUniforms {
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
}`,tu=Object.defineProperty,nu=(t,e,n)=>e in t?tu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Bt=(t,e,n)=>(nu(t,typeof e!="symbol"?e+"":e,n),n);const pi=class mi extends Y{constructor(e){e={...mi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:eu,entryPoint:"mainFragment"}}),o=$.from({vertex:Et,fragment:Qc,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Bt(this,"uniforms"),Bt(this,"seed"),Bt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Bt(pi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let ou=pi;var ru=`
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
}`,iu=`struct KawaseBlurUniforms {
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
}`,su=`
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
`,au=`struct KawaseBlurUniforms {
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
}`,lu=Object.defineProperty,cu=(t,e,n)=>e in t?lu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>(cu(t,typeof e!="symbol"?e+"":e,n),n);const gi=class bi extends Y{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ze("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...bi.DEFAULT_OPTIONS,...n};const o=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:n?.clamp?au:iu,entryPoint:"mainFragment"}}),r=$.from({vertex:Et,fragment:n?.clamp?su:ru,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),de(this,"uniforms"),de(this,"_pixelSize",{x:0,y:0}),de(this,"_clamp"),de(this,"_kernels",[]),de(this,"_blur"),de(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=_e.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),_e.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};de(gi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let uu=gi;var du=`in vec2 vTextureCoord;
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
`,fu=`struct AdvancedBloomUniforms {
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
`,hu=`
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
`,pu=`struct ExtractBrightnessUniforms {
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
`,mu=Object.defineProperty,gu=(t,e,n)=>e in t?mu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,vi=(t,e,n)=>(gu(t,typeof e!="symbol"?e+"":e,n),n);const yi=class xi extends Y{constructor(e){e={...xi.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:pu,entryPoint:"mainFragment"}}),o=$.from({vertex:Et,fragment:hu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),vi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};vi(yi,"DEFAULT_OPTIONS",{threshold:.5});let bu=yi;var vu=Object.defineProperty,yu=(t,e,n)=>e in t?vu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Be=(t,e,n)=>(yu(t,typeof e!="symbol"?e+"":e,n),n);const wi=class Ci extends Y{constructor(e){e={...Ci.DEFAULT_OPTIONS,...e};const n=ve.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:fu,entryPoint:"mainFragment"}}),o=$.from({vertex:Et,fragment:du,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:he.WHITE}}),Be(this,"uniforms"),Be(this,"bloomScale",1),Be(this,"brightness",1),Be(this,"_extractFilter"),Be(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new bu({threshold:e.threshold}),this._blurFilter=new uu({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=_e.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=_e.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),_e.returnTexture(s),_e.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Be(wi,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let xu=wi;const Ro=({crtFilter:t},e)=>[t?new ou({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new xu({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class wu{constructor(e,n){this.app=e,this.#i=e,this.#s=n;try{const o=x.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#a.connect(w.destination),e.stage.addChild(this.#r),e.stage.scale=r,Qe(n)===void 0)throw new Error("main loop with no starting room");this.#c()}catch(o){this.#l(o);return}}#e;#n;#t;#o;#r=new b({label:"MainLoop/world"});#a=w.createGain();#i;#s;#l(e){console.error(e),x.dispatch(Ms(zs(e,"message","stack")))}#c(){const{gameMenus:{userSettings:{displaySettings:e}}}=x.getState();this.#e=Ro(e,!0),this.#n=Ro(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#l(n)}};tick=({deltaMS:e})=>{const n=x.getState(),o=Ls(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=x.getState(),s=Qe(this.#s),a=!o&&!(r?.uncolourised??ir.displaySettings.uncolourised),l=Rs(n),c=Es(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new bl({colourise:a,gameState:this.#s,inputDirectionMode:c,onScreenControls:l}),this.#i.stage.addChild(this.#t.output)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const u=o?rr:Xl(this.#s,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),s?(this.#o=new Kc({gameState:this.#s,room:s,paused:o,pixiRenderer:this.#i.renderer,displaySettings:r,colourised:a,upscale:i}),this.#r.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#a),this.#s.events.emit("roomChange",s.id)):this.#o=void 0,this.#i.stage.scale=i.gameEngineUpscale,this.#c()),this.#o?.tick({progression:this.#s.progression,movedItems:u,deltaMS:e}),o?this.#i.stage.filters=this.#e:this.#i.stage.filters=this.#n};start(){return this.#i.ticker.add(this.tickAndCatch),this}stop(){this.#i.stage.removeChild(this.#r),this.#a.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#i.ticker.remove(this.tickAndCatch)}}At.add(ur,dr,fr,hr,pr,mr,gr,br,vr,yr,xr,Cr,wr,Sr,Tr,kr,Ir,Or,Br,_r,Pr);$s.defaultOptions.scaleMode="nearest";const Eo=async(t,e)=>{const n=new Er;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const o=x.getState().gameMenus.currentGame,r=jn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?x.dispatch(Us(o.store.gameMenus)):(x.dispatch(Vn(r.characterRooms.head.id)),x.dispatch(Vn(r.characterRooms.heels.id)));const i=new wu(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Re(r);a!==void 0&&Sn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return Qe(r)},get gameState(){return r},reincarnateFrom(s){jn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Ou=Object.freeze(Object.defineProperty({__proto__:null,default:Eo,gameMain:Eo},Symbol.toStringTag,{value:"Module"}));export{Mr as A,Fr as C,Y as F,On as R,na as S,zr as V,aa as a,Ou as g,ta as u};
