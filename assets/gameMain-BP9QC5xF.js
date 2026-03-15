import{ag as ga,bY as xa,X as q,Z as Co,_ as Z,L as Lt,T as j,d as E,bZ as Le,C as re,b7 as ba,q as Se,v as Ye,B as Bn,b as ot,a5 as te,o as ut,U as ya,M as Ce,b_ as dt,c as va,P as Kt,m as wa,W as Sa,N as Ca,V as Ta,b9 as ka,bc as Ia,y as _a,A as Ts,af as Pa,b$ as Ma,R as Ra,l as Tt,c0 as ks,c1 as Ba,D as un,n as tr,ac as Et,j as To,F as gn,w as ko,E as Aa,u as Oa,c2 as rt,c3 as nr,c4 as or,c5 as Fa,a2 as La,a3 as Is,ab as zt,p as C,c6 as Ea,c7 as za,c8 as Je,c9 as bt,ca as rr,cb as An,cc as On,cd as Ua,ce as Be,aF as tt,ae as Ke,t as _s,cf as Ut,ao as de,cg as B,ch as Da,K as Ga,bA as se,aC as Ps,ci as Io,cj as Wa,ay as yn,ck as Qe,cl as Ms,cm as Rs,aG as Va,cn as $e,co as Bs,cp as As,cq as $a,bD as Os,cr as He,cs as _o,bP as Ht,ct as Nt,cu as to,cv as no,cw as oo,cx as Fs,aT as fe,aA as z,cy as Po,cz as Mo,bH as yt,cA as Ls,cB as ce,cC as Ro,cD as Es,cE as Ha,cF as zs,cG as Us,cH as vn,b1 as Bo,cI as Ds,cJ as Dt,aR as vt,cK as Gt,cL as Ao,cM as wn,cN as Na,cO as Wt,cP as jt,cQ as O,cR as Oo,aQ as Sn,cS as Fo,aP as ja,aS as Lo,ai as Xa,cT as Ae,f as ue,cU as dn,ar as he,cV as Ya,cW as qa,cX as Za,cY as Cn,cZ as Ja,c_ as Ka,c$ as Qa,d0 as el,d1 as sr,d2 as tl,d3 as Eo,d4 as zo,d5 as hn,d6 as Gs,d7 as Tn,d8 as nt,d9 as ke,da as Ws,db as nl,dc as Vs,dd as ht,de as wt,df as ol,dg as rl,dh as ro,di as $s,dj as sl,dk as il,b2 as Oe,dl as al,dm as ll,x as cl,a_ as qe,bM as Xt,dn as Qt,dp as en,dq as ul,dr as Hs,ds as M,dt as so,aX as Ns,du as et,dv as Re,aq as Uo,dw as js,dx as Xs,dy as dl,aM as ir,bG as hl,dz as pl,dA as fl,dB as ml,bF as gl,dC as ye,dD as xl,dE as Fn,dF as bl,dG as ar,dH as yl,dI as Do,dJ as Ys,aH as vl,dK as wl,dL as qs,dM as Zs,dN as Sl,bU as Cl,bQ as Tl,dO as kl,dP as Js,dQ as Il,dR as St,dS as _l,aL as Pl,dT as lr,dU as Ml,aJ as Rl,dV as Bl,dW as Al,bN as Ol,dX as kn,dY as Go,dZ as cr,d_ as Fl,d$ as _t,e0 as Ue,e1 as Ll,e2 as El,aV as zl,e3 as Ul,aY as Dl,e4 as Ks,e5 as Gl,e6 as Wl,e7 as Vl,e8 as $l,e9 as Hl,ea as Nl,eb as jl,ec as Xl,ed as Yl,ee as ql,ef as Zl,eg as Jl,eh as Kl,ei as Ql,ej as ec,ek as tc,el as nc,em as oc,bO as Ct,en as rc,eo as sc,ep as ic,eq as ac,er as lc,es as cc,et as uc,eu as dc,ev as hc,ew as pc,ex as fc,ey as mc,ez as gc,eA as xc,eB as bc,eC as ur,eD as yc,eE as dr,bS as vc}from"./App-D11STJbZ.js";import{s as S,a as In,g as Qs}from"./spritesheetPalette-XK6t3MT2.js";import{v as wc,b as Sc,h as Pe,s as Cc,A as Tc}from"./spectrumLut-CHyquqcj.js";import{r as K,g as io,p as ao,a as Wo,b as ei,c as hr,s as pr,d as kc,e as Ic,f as _c}from"./pixiContainerToString-DtVURv6Q.js";import{c as Pc}from"./canvasUtils-BfXQk3m4.js";import{a as Mc,b as Rc}from"./localUniformBit-BOGrcT1E.js";import{g as Bc}from"./index-CulgZJBd.js";import{C as fr}from"./CanvasPool-BAzQlgwx.js";import{B as Ac}from"./BatchableSprite-qOYjpB38.js";var tn={},mr;function Oc(){if(mr)return tn;mr=1;const{iterableCurry:o}=ga(),{__firstOr:e}=xa(),t=Symbol("none");function n(s){return e(s,t)===t}tn.__isEmpty=n;const r=o(n,{reduces:!0});return tn.isEmpty=r,tn}var Ln,gr;function Fc(){return gr||(gr=1,Ln=Oc().isEmpty),Ln}var Lc=Fc();const Vo=Bc(Lc);var Ec=`
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
`,zc=`in vec2 aPosition;
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
`,Uc=`
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
}`;class H extends q{constructor(e){const t=e.gpu,n=xr({source:Uc,...t}),r=Co.from({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,i=xr({source:Ec,...s}),a=Z.from({vertex:zc,fragment:i}),l=new Lt({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:j.EMPTY}})}}function xr(o){const{source:e,functions:t,main:n}=o;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const $o=`
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
    `,Ho=`
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
	`;class ti extends H{constructor(){super({gl:{functions:`
                ${$o}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ho}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}ti.extension={name:"color",type:E.BlendMode};class ni extends H{constructor(){super({gl:{functions:`
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
            `}})}}ni.extension={name:"color-burn",type:E.BlendMode};class oi extends H{constructor(){super({gl:{functions:`
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
                `}})}}oi.extension={name:"color-dodge",type:E.BlendMode};class ri extends H{constructor(){super({gl:{functions:`
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
                `}})}}ri.extension={name:"darken",type:E.BlendMode};class si extends H{constructor(){super({gl:{functions:`
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
            `}})}}si.extension={name:"difference",type:E.BlendMode};class ii extends H{constructor(){super({gl:{functions:`
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
            `}})}}ii.extension={name:"divide",type:E.BlendMode};class ai extends H{constructor(){super({gl:{functions:`
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
            `}})}}ai.extension={name:"exclusion",type:E.BlendMode};class li extends H{constructor(){super({gl:{functions:`
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
                `}})}}li.extension={name:"hard-light",type:E.BlendMode};class ci extends H{constructor(){super({gl:{functions:`
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
            `}})}}ci.extension={name:"hard-mix",type:E.BlendMode};class ui extends H{constructor(){super({gl:{functions:`
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
            `}})}}ui.extension={name:"lighten",type:E.BlendMode};class di extends H{constructor(){super({gl:{functions:`
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
                `}})}}di.extension={name:"linear-burn",type:E.BlendMode};class hi extends H{constructor(){super({gl:{functions:`
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
            `}})}}hi.extension={name:"linear-dodge",type:E.BlendMode};class pi extends H{constructor(){super({gl:{functions:`
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
            `}})}}pi.extension={name:"linear-light",type:E.BlendMode};class fi extends H{constructor(){super({gl:{functions:`
                ${$o}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Ho}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}fi.extension={name:"luminosity",type:E.BlendMode};class mi extends H{constructor(){super({gl:{functions:`
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
            `}})}}mi.extension={name:"negation",type:E.BlendMode};class gi extends H{constructor(){super({gl:{functions:`
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
                `}})}}gi.extension={name:"overlay",type:E.BlendMode};class xi extends H{constructor(){super({gl:{functions:`
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
                `}})}}xi.extension={name:"pin-light",type:E.BlendMode};class bi extends H{constructor(){super({gl:{functions:`
                ${$o}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Ho}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}bi.extension={name:"saturation",type:E.BlendMode};class yi extends H{constructor(){super({gl:{functions:`
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
                `}})}}yi.extension={name:"soft-light",type:E.BlendMode};class vi extends H{constructor(){super({gl:{functions:`
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
                `}})}}vi.extension={name:"subtract",type:E.BlendMode};class wi extends H{constructor(){super({gl:{functions:`
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
                `}})}}wi.extension={name:"vivid-light",type:E.BlendMode};var Dc=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,br=`struct GlobalFilterUniforms {
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
}`;const Si=class Ci extends q{constructor(e){e={...Ci.defaultOptions,...e};const t=Co.from({vertex:{source:br,entryPoint:"mainVertex"},fragment:{source:br,entryPoint:"mainFragment"}}),n=Z.from({vertex:Le,fragment:Dc,name:"alpha-filter"}),{alpha:r,...s}=e,i=new Lt({uAlpha:{value:r,type:"f32"}});super({...s,gpuProgram:t,glProgram:n,resources:{alphaUniforms:i}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Si.defaultOptions={alpha:1};let Gc=Si;var Wc=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 finalColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uTexture, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    if (uAlpha == 0.0) {
        finalColor = color;
        return;
    }

    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    vec4 result;

    result.r = (uColorMatrix[0] * color.r);
        result.r += (uColorMatrix[1] * color.g);
        result.r += (uColorMatrix[2] * color.b);
        result.r += (uColorMatrix[3] * color.a);
        result.r += uColorMatrix[4];

    result.g = (uColorMatrix[5] * color.r);
        result.g += (uColorMatrix[6] * color.g);
        result.g += (uColorMatrix[7] * color.b);
        result.g += (uColorMatrix[8] * color.a);
        result.g += uColorMatrix[9];

    result.b = (uColorMatrix[10] * color.r);
       result.b += (uColorMatrix[11] * color.g);
       result.b += (uColorMatrix[12] * color.b);
       result.b += (uColorMatrix[13] * color.a);
       result.b += uColorMatrix[14];

    result.a = (uColorMatrix[15] * color.r);
       result.a += (uColorMatrix[16] * color.g);
       result.a += (uColorMatrix[17] * color.b);
       result.a += (uColorMatrix[18] * color.a);
       result.a += uColorMatrix[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    finalColor = vec4(rgb, result.a);
}
`,yr=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
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

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uTexture, uSampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class Vc extends q{constructor(e={}){const t=new Lt({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"f32",size:20},uAlpha:{value:1,type:"f32"}}),n=Co.from({vertex:{source:yr,entryPoint:"mainVertex"},fragment:{source:yr,entryPoint:"mainFragment"}}),r=Z.from({vertex:Le,fragment:Wc,name:"color-matrix-filter"});super({...e,gpuProgram:n,glProgram:r,resources:{colorMatrixUniforms:t}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const[n,r,s]=re.shared.setValue(e).toArray(),i=[n,0,0,0,0,0,r,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(i,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),r=Math.sin(e),s=Math.sqrt,i=1/3,a=s(i),l=n+(1-n)*i,c=i*(1-n)-a*r,u=i*(1-n)+a*r,d=i*(1-n)+a*r,h=n+i*(1-n),p=i*(1-n)-a*r,f=i*(1-n)-a*r,m=i*(1-n)+a*r,x=n+i*(1-n),g=[l,c,u,0,0,d,h,p,0,0,f,m,x,0,0,0,0,0,1,0];this._loadMatrix(g,t)}contrast(e,t){const n=(e||0)+1,r=-.5*(n-1),s=[n,0,0,0,r,0,n,0,0,r,0,0,n,0,r,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,r=(n-1)*-.5,s=[n,r,r,0,0,r,n,r,0,0,r,r,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,r,s){e||(e=.2),t||(t=.15),n||(n=16770432),r||(r=3375104);const i=re.shared,[a,l,c]=i.setValue(n).toArray(),[u,d,h]=i.setValue(r).toArray(),p=[.3,.59,.11,0,0,a,l,c,e,0,u,d,h,t,0,a-u,l-d,c-h,0,0];this._loadMatrix(p,s)}night(e,t){e||(e=.1);const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}const Ti=class ki extends ba{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(Se(Ye,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...ki.defaultOptions,...t};const n=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let r=t.uvs;r||(t.positions?r=new Float32Array(n.length):r=new Float32Array([0,0,1,0,1,1,0,1]));const s=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,a=new Bn({data:n,label:"attribute-mesh-positions",shrinkToFit:i,usage:ot.VERTEX|ot.COPY_DST}),l=new Bn({data:r,label:"attribute-mesh-uvs",shrinkToFit:i,usage:ot.VERTEX|ot.COPY_DST}),c=new Bn({data:s,label:"index-mesh-buffer",shrinkToFit:i,usage:ot.INDEX|ot.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:c,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};Ti.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let Ii=Ti;class $c{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),n=t.data;let r=n;const s=this.texture.textureMatrix;return s.isSimple||(r=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!r||r.length<n.length)&&(r=this._transformedUvs=new Float32Array(n.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(n,r))),r}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class be extends te{constructor(...e){let t=e[0];Array.isArray(e[0])&&(t={textures:e[0],autoUpdate:e[1]});const{animationSpeed:n=1,autoPlay:r=!1,autoUpdate:s=!0,loop:i=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...h}=t,[p]=u;super({...h,texture:p instanceof j?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=s,this._isConnectedToTicker=!1,this.animationSpeed=n,this.loop=i,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ut.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ut.shared.add(this.update,this,ya.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,n=this.animationSpeed*t,r=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=n/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=n;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(e=!1){if(typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._textures.forEach(r=>{this.texture!==r&&r.destroy(n)})}this._textures=[],this._durations=null,this.stop(),super.destroy(e),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let n=0;n<e.length;++n)t.push(j.from(e[n]));return new be(t)}static fromImages(e){const t=[];for(let n=0;n<e.length;++n)t.push(j.from(e[n]));return new be(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof j)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ut.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ut.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Hc{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e??new Ce,this.observer=t,this.position=new dt(this,0,0),this.scale=new dt(this,1,1),this.pivot=new dt(this,0,0),this.skew=new dt(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}_onUpdate(e){this.dirty=!0,e===this.skew&&this.updateSkew(),this.observer?._onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}toString(){return`[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this._onUpdate(this.skew))}}const nn=new Ce,Pt=new Ce,ge=[new Kt,new Kt,new Kt,new Kt];class _i{constructor(e){this._renderer=e}validateRenderable(e){return!1}addRenderable(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}updateRenderable(e){}execute(e){const t=this._renderer,n=t.canvasContext,r=n.activeContext;r.save(),n.setBlendMode(e.groupBlendMode);const s=t.globalUniforms.globalUniformData?.worldColor??4294967295,i=e.groupColorAlpha,a=(s>>>24&255)/255,l=(i>>>24&255)/255,c=t.filter?.alphaMultiplier??1,u=a*l*c;if(u<=0){r.restore();return}r.globalAlpha=u;const d=s&16777215,h=i&16777215,p=va(wa(h,d)),f=e.texture,m=Pc.getTintedPattern(f,p),x=e.width,g=e.height,_=e.groupTransform,T=f.source._resolution??f.source.resolution??1;Pt.copyFrom(e._tileTransform.matrix),e.applyAnchorToTexture||Pt.translate(-e.anchor.x*x,-e.anchor.y*g),Pt.scale(1/T,1/T),nn.identity(),nn.prepend(Pt),nn.prepend(_);const y=t._roundPixels|e._roundPixels;n.setContextTransform(nn,y===1),r.fillStyle=m;const b=e.anchor.x*-x,w=e.anchor.y*-g;ge[0].set(b,w),ge[1].set(b+x,w),ge[2].set(b+x,w+g),ge[3].set(b,w+g);for(let k=0;k<4;k++)Pt.applyInverse(ge[k],ge[k]);r.beginPath(),r.moveTo(ge[0].x,ge[0].y);for(let k=1;k<4;k++)r.lineTo(ge[k].x,ge[k].y);r.closePath(),r.fill(),r.restore()}destroy(){this._renderer=null}}_i.extension={type:[E.CanvasPipes],name:"tilingSprite"};const Nc={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},jc={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let En,zn;class Xc extends Sa{constructor(){En??(En=Ca({name:"tiling-sprite-shader",bits:[Mc,Nc,Ta]})),zn??(zn=ka({name:"tiling-sprite-shader",bits:[Rc,jc,Ia]}));const e=new Lt({uMapCoord:{value:new Ce,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new Ce,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:zn,gpuProgram:En,resources:{localUniforms:new Lt({uTransformMatrix:{value:new Ce,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:j.EMPTY.source,uSampler:j.EMPTY.source.style}})}updateUniforms(e,t,n,r,s,i){const a=this.resources.tilingUniforms,l=i.width,c=i.height,u=i.textureMatrix,d=a.uniforms.uTextureTransform;d.set(n.a*l/e,n.b*l/t,n.c*c/e,n.d*c/t,n.tx/e,n.ty/t),d.invert(),a.uniforms.uMapCoord=u.mapCoord,a.uniforms.uClampFrame=u.uClampFrame,a.uniforms.uClampOffset=u.uClampOffset,a.uniforms.uTextureTransform=d,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=r,a.uniforms.uSizeAnchor[3]=s,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class Yc extends Ii{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function qc(o,e){const t=o.anchor.x,n=o.anchor.y;e[0]=-t*o.width,e[1]=-n*o.height,e[2]=(1-t)*o.width,e[3]=-n*o.height,e[4]=(1-t)*o.width,e[5]=(1-n)*o.height,e[6]=-t*o.width,e[7]=(1-n)*o.height}function Zc(o,e,t,n){let r=0;const s=o.length/e,i=n.a,a=n.b,l=n.c,c=n.d,u=n.tx,d=n.ty;for(t*=e;r<s;){const h=o[t],p=o[t+1];o[t]=i*h+l*p+u,o[t+1]=a*h+c*p+d,t+=e,r++}}function Jc(o,e){const t=o.texture,n=t.frame.width,r=t.frame.height;let s=0,i=0;o.applyAnchorToTexture&&(s=o.anchor.x,i=o.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-i,e[5]=e[7]=1-i;const a=Ce.shared;a.copyFrom(o._tileTransform.matrix),a.tx/=o.width,a.ty/=o.height,a.invert(),a.scale(o.width/n,o.height/r),Zc(e,2,0,a)}const pn=new Yc;class Kc{constructor(){this.canBatch=!0,this.geometry=new Ii({indices:pn.indices.slice(),positions:pn.positions.slice(),uvs:pn.uvs.slice()})}destroy(){this.geometry.destroy(),this.shader?.destroy()}}class Pi{constructor(e){this._state=_a.default2d,this._renderer=e,this._managedTilingSprites=new Ts({renderer:e,type:"renderable",name:"tilingSprite"})}validateRenderable(e){const t=this._getTilingSpriteData(e),n=t.canBatch;this._updateCanBatch(e);const r=t.canBatch;if(r&&r===n){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return n!==r}addRenderable(e,t){const n=this._renderer.renderPipes.batch;this._updateCanBatch(e);const r=this._getTilingSpriteData(e),{geometry:s,canBatch:i}=r;if(i){r.batchableMesh||(r.batchableMesh=new $c);const a=r.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=s,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,n.addToBatch(a,t)}else n.break(t),r.shader||(r.shader=new Xc),this.updateRenderable(e),t.add(e)}execute(e){const t=this._renderer,{shader:n}=this._getTilingSpriteData(e);n.groups[0]=t.globalUniforms.bindGroup;const r=n.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=t._roundPixels|e._roundPixels,Pa(e.groupColorAlpha,r.uColor,0),this._state.blendMode=Ma(e.groupBlendMode,e.texture._source),t.encoder.draw({geometry:pn,shader:n,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:n}=t;if(n){const{batchableMesh:r}=t;e.didViewUpdate&&this._updateBatchableMesh(e),r._batcher.updateElement(r)}else if(e.didViewUpdate){const{shader:r}=t;r.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Kc;return t.renderable=e,e._gpuData[this._renderer.uid]=t,this._managedTilingSprites.add(e),t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:n}=t,r=e.texture.source.style;r.addressMode!=="repeat"&&(r.addressMode="repeat",r.update()),Jc(e,n.uvs),qc(e,n.positions)}destroy(){this._managedTilingSprites.destroy(),this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),n=e.texture;let r=!0;return this._renderer.type===Ra.WEBGL&&(r=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=n.textureMatrix.isSimple&&(r||n.source.isPowerOfTwo),t.canBatch}}Pi.extension={type:[E.WebGLPipes,E.WebGPUPipes],name:"tilingSprite"};Tt.add(_i);Tt.add(Pi);const Mi=class fn extends ks{constructor(...e){let t=e[0]||{};t instanceof j&&(t={texture:t}),e.length>1&&(Se(Ye,"use new TilingSprite({ texture, width:100, height:100 }) instead"),t.width=e[1],t.height=e[2]),t={...fn.defaultOptions,...t};const{texture:n,anchor:r,tilePosition:s,tileScale:i,tileRotation:a,width:l,height:c,applyAnchorToTexture:u,roundPixels:d,...h}=t??{};super({label:"TilingSprite",...h}),this.renderPipeId="tilingSprite",this.batched=!0,this.allowChildren=!1,this._anchor=new dt({_onUpdate:()=>{this.onViewUpdate()}}),this.applyAnchorToTexture=u,this.texture=n,this._width=l??n.width,this._height=c??n.height,this._tileTransform=new Hc({observer:{_onUpdate:()=>this.onViewUpdate()}}),r&&(this.anchor=r),this.tilePosition=s,this.tileScale=i,this.tileRotation=a,this.roundPixels=d??!1}static from(e,t={}){return typeof e=="string"?new fn({texture:Ba.get(e),...t}):new fn({texture:e,...t})}get uvRespectAnchor(){return Se(Ye,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture}set uvRespectAnchor(e){Se(Ye,"uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"),this.applyAnchorToTexture=e}get clampMargin(){return this._texture.textureMatrix.clampMargin}set clampMargin(e){this._texture.textureMatrix.clampMargin=e}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}get tilePosition(){return this._tileTransform.position}set tilePosition(e){this._tileTransform.position.copyFrom(e)}get tileScale(){return this._tileTransform.scale}set tileScale(e){typeof e=="number"?this._tileTransform.scale.set(e):this._tileTransform.scale.copyFrom(e)}set tileRotation(e){this._tileTransform.rotation=e}get tileRotation(){return this._tileTransform.rotation}get tileTransform(){return this._tileTransform}set texture(e){e||(e=j.EMPTY);const t=this._texture;t!==e&&(t&&t.dynamic&&t.off("update",this.onViewUpdate,this),e.dynamic&&e.on("update",this.onViewUpdate,this),this._texture=e,this.onViewUpdate())}get texture(){return this._texture}set width(e){this._width=e,this.onViewUpdate()}get width(){return this._width}set height(e){this._height=e,this.onViewUpdate()}get height(){return this._height}setSize(e,t){typeof e=="object"&&(t=e.height??e.width,e=e.width),this._width=e,this._height=t??e,this.onViewUpdate()}getSize(e){return e||(e={}),e.width=this._width,e.height=this._height,e}updateBounds(){const e=this._bounds,t=this._anchor,n=this._width,r=this._height;e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}containsPoint(e){const t=this._width,n=this._height,r=-t*this._anchor._x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this._anchor._y,e.y>=s&&e.y<=s+n)}destroy(e=!1){if(super.destroy(e),this._anchor=null,this._tileTransform=null,this._bounds=null,typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._texture.destroy(n)}this._texture=null}};Mi.defaultOptions={texture:j.EMPTY,anchor:{x:0,y:0},tilePosition:{x:0,y:0},tileScale:{x:1,y:1},tileRotation:0,applyAnchorToTexture:!1};let Qc=Mi;class eu extends ks{constructor(e,t){const{text:n,resolution:r,style:s,anchor:i,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=t,this.text=n??"",this.style=s,this.resolution=r??null,this.allowChildren=!1,this._anchor=new dt({_onUpdate:()=>{this.onViewUpdate()}}),i&&(this.anchor=i),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,t){typeof e=="object"?(t=e.height??e.width,e=e.width):t??(t=e),e!==void 0&&this._setWidth(e,this.bounds.width),t!==void 0&&this._setHeight(t,this.bounds.height)}containsPoint(e){const t=this.bounds.width,n=this.bounds.height,r=-t*this.anchor.x;let s=0;return e.x>=r&&e.x<=r+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<=s+n)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}get styleKey(){return`${this._text}:${this._style.styleKey}:${this._resolution}`}}function tu(o,e){let t=o[0]??{};return(typeof t=="string"||o[1])&&(Se(Ye,`use new ${e}({ text: "hi!", style }) instead`),t={text:t,style:o[1]}),t}let De=null,we=null;function nu(o,e){De||(De=un.get().createCanvas(256,128),we=De.getContext("2d",{willReadFrequently:!0}),we.globalCompositeOperation="copy",we.globalAlpha=1),(De.width<o||De.height<e)&&(De.width=tr(o),De.height=tr(e))}function vr(o,e,t){for(let n=0,r=4*t*e;n<e;++n,r+=4)if(o[r+3]!==0)return!1;return!0}function wr(o,e,t,n,r){const s=4*e;for(let i=n,a=n*s+4*t;i<=r;++i,a+=s)if(o[a+3]!==0)return!1;return!0}function ou(...o){let e=o[0];e.canvas||(e={canvas:o[0],resolution:o[1]});const{canvas:t}=e,n=Math.min(e.resolution??1,1),r=e.width??t.width,s=e.height??t.height;let i=e.output;if(nu(r,s),!we)throw new TypeError("Failed to get canvas 2D context");we.drawImage(t,0,0,r,s,0,0,r*n,s*n);const l=we.getImageData(0,0,r,s).data;let c=0,u=0,d=r-1,h=s-1;for(;u<s&&vr(l,r,u);)++u;if(u===s)return Et.EMPTY;for(;vr(l,r,h);)--h;for(;wr(l,r,c,u,h);)++c;for(;wr(l,r,d,u,h);)--d;return++d,++h,we.globalCompositeOperation="source-over",we.strokeRect(c,u,d-c,h-u),we.globalCompositeOperation="copy",i??(i=new Et),i.set(c/n,u/n,(d-c)/n,(h-u)/n),i}class ru{constructor(e=0,t=0,n=!1){this.first=null,this.items=Object.create(null),this.last=null,this.max=e,this.resetTtl=n,this.size=0,this.ttl=t}clear(){return this.first=null,this.items=Object.create(null),this.last=null,this.size=0,this}delete(e){if(this.has(e)){const t=this.items[e];delete this.items[e],this.size--,t.prev!==null&&(t.prev.next=t.next),t.next!==null&&(t.next.prev=t.prev),this.first===t&&(this.first=t.next),this.last===t&&(this.last=t.prev)}return this}entries(e=this.keys()){const t=new Array(e.length);for(let n=0;n<e.length;n++){const r=e[n];t[n]=[r,this.get(r)]}return t}evict(e=!1){if(e||this.size>0){const t=this.first;delete this.items[t.key],--this.size===0?(this.first=null,this.last=null):(this.first=t.next,this.first.prev=null)}return this}expiresAt(e){let t;return this.has(e)&&(t=this.items[e].expiry),t}get(e){const t=this.items[e];if(t!==void 0){if(this.ttl>0&&t.expiry<=Date.now()){this.delete(e);return}return this.moveToEnd(t),t.value}}has(e){return e in this.items}moveToEnd(e){this.last!==e&&(e.prev!==null&&(e.prev.next=e.next),e.next!==null&&(e.next.prev=e.prev),this.first===e&&(this.first=e.next),e.prev=this.last,e.next=null,this.last!==null&&(this.last.next=e),this.last=e,this.first===null&&(this.first=e))}keys(){const e=new Array(this.size);let t=this.first,n=0;for(;t!==null;)e[n++]=t.key,t=t.next;return e}setWithEvicted(e,t,n=this.resetTtl){let r=null;if(this.has(e))this.set(e,t,!0,n);else{this.max>0&&this.size===this.max&&(r={...this.first},this.evict(!0));let s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t};++this.size===1?this.first=s:this.last.next=s,this.last=s}return r}set(e,t,n=!1,r=this.resetTtl){let s=this.items[e];return n||s!==void 0?(s.value=t,n===!1&&r&&(s.expiry=this.ttl>0?Date.now()+this.ttl:this.ttl),this.moveToEnd(s)):(this.max>0&&this.size===this.max&&this.evict(!0),s=this.items[e]={expiry:this.ttl>0?Date.now()+this.ttl:this.ttl,key:e,prev:this.last,next:null,value:t},++this.size===1?this.first=s:this.last.next=s,this.last=s),this}values(e=this.keys()){const t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=this.get(e[n]);return t}}function su(o=1e3,e=0,t=!1){if(isNaN(o)||o<0)throw new TypeError("Invalid max value");if(isNaN(e)||e<0)throw new TypeError("Invalid ttl value");if(typeof t!="boolean")throw new TypeError("Invalid resetTtl value");return new ru(o,e,t)}function Ri(o){return!!o.tagStyles&&Object.keys(o.tagStyles).length>0}function Bi(o){return o.includes("<")}function iu(o,e){return o.clone().assign(e)}function au(o,e){const t=[],n=e.tagStyles;if(!Ri(e)||!Bi(o))return t.push({text:o,style:e}),t;const r=[e],s=[];let i="",a=0;for(;a<o.length;){const l=o[a];if(l==="<"){const c=o.indexOf(">",a);if(c===-1){i+=l,a++;continue}const u=o.slice(a+1,c);if(u.startsWith("/")){const d=u.slice(1).trim();if(s.length>0&&s[s.length-1]===d){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i=""),r.pop(),s.pop(),a=c+1;continue}else{i+=o.slice(a,c+1),a=c+1;continue}}else{const d=u.trim();if(n[d]){i.length>0&&(t.push({text:i,style:r[r.length-1]}),i="");const h=r[r.length-1],p=iu(h,n[d]);r.push(p),s.push(d),a=c+1;continue}else{i+=o.slice(a,c+1),a=c+1;continue}}}else i+=l,a++}return i.length>0&&t.push({text:i,style:r[r.length-1]}),t}const lu=[10,13],cu=new Set(lu),uu=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],du=new Set(uu),hu=/(\r\n|\r|\n)/,pu=/(?:\r\n|\r|\n)/;function No(o){return typeof o!="string"?!1:cu.has(o.charCodeAt(0))}function pe(o,e){return typeof o!="string"?!1:du.has(o.charCodeAt(0))}function Ai(o){return o==="normal"||o==="pre-line"}function Oi(o){return o==="normal"}function ve(o){if(typeof o!="string")return"";let e=o.length-1;for(;e>=0&&pe(o[e]);)e--;return e<o.length-1?o.slice(0,e+1):o}function Fi(o){const e=[],t=[];if(typeof o!="string")return e;for(let n=0;n<o.length;n++){const r=o[n],s=o[n+1];if(pe(r)||No(r)){t.length>0&&(e.push(t.join("")),t.length=0),r==="\r"&&s===`
`?(e.push(`\r
`),n++):e.push(r);continue}t.push(r)}return t.length>0&&e.push(t.join("")),e}function Li(o,e,t,n){const r=t(o),s=[];for(let i=0;i<r.length;i++){let a=r[i],l=a,c=1;for(;r[i+c];){const u=r[i+c];if(!n(l,u,o,i,e))a+=u,l=u,c++;else break}i+=c-1,s.push(a)}return s}const fu=/\r\n|\r|\n/g;function mu(o,e,t,n,r,s,i,a){const l=au(o,e);if(Oi(e.whiteSpace))for(let U=0;U<l.length;U++){const $=l[U];l[U]={text:$.text.replace(fu," "),style:$.style}}const u=[];let d=[];for(const U of l){const $=U.text.split(hu);for(let J=0;J<$.length;J++){const W=$[J];W===`\r
`||W==="\r"||W===`
`?(u.push(d),d=[]):W.length>0&&d.push({text:W,style:U.style})}}(d.length>0||u.length===0)&&u.push(d);const h=t?gu(u,e,n,r,i,a):u,p=[],f=[],m=[],x=[],g=[];let _=0;const T=e._fontString,y=s(T);y.fontSize===0&&(y.fontSize=e.fontSize,y.ascent=e.fontSize);let b="",w=!!e.dropShadow;for(const U of h){let $=0,J=y.ascent,W=y.descent,V="";for(const X of U){const ne=X.style._fontString,ie=s(ne);ne!==b&&(n.font=ne,b=ne);const me=r(X.text,X.style.letterSpacing,n);$+=me,J=Math.max(J,ie.ascent),W=Math.max(W,ie.descent),V+=X.text,!w&&X.style.dropShadow&&(w=!0)}U.length===0&&(J=y.ascent,W=y.descent),p.push($),f.push(J),m.push(W),g.push(V);const A=e.lineHeight||J+W;x.push(A+e.leading),_=Math.max(_,$)}const k=e._stroke?.width||0,L=(t&&e.align!=="left"&&e.align!=="justify"?Math.max(_,e.wordWrapWidth):_)+k+(e.dropShadow?e.dropShadow.distance:0);let R=0;for(let U=0;U<x.length;U++)R+=x[U];R=Math.max(R,x[0]+k);const D=R+(e.dropShadow?e.dropShadow.distance:0),G=e.lineHeight||y.fontSize;return{width:L,height:D,lines:g,lineWidths:p,lineHeight:G+e.leading,maxLineWidth:_,fontProperties:y,runsByLine:h,lineAscents:f,lineDescents:m,lineHeights:x,hasDropShadow:w}}function gu(o,e,t,n,r,s){const{letterSpacing:i,whiteSpace:a,wordWrapWidth:l,breakWords:c}=e,u=Ai(a),d=l+i,h={};let p="";const f=(x,g)=>{const _=`${x}|${g.styleKey}`;let T=h[_];if(T===void 0){const y=g._fontString;y!==p&&(t.font=y,p=y),T=n(x,g.letterSpacing,t)+g.letterSpacing,h[_]=T}return T},m=[];for(const x of o){const g=xu(x),_=m.length,T=R=>{let D=0,G=R;do{const{token:U,style:$}=g[G];D+=f(U,$),G++}while(G<g.length&&g[G].continuesFromPrevious);return D},y=R=>{const D=[];let G=R;do D.push({token:g[G].token,style:g[G].style}),G++;while(G<g.length&&g[G].continuesFromPrevious);return D};let b=[],w=0,k=!u,I=null;const F=()=>{I&&I.text.length>0&&b.push(I),I=null},L=()=>{if(F(),b.length>0){const R=b[b.length-1];R.text=ve(R.text),R.text.length===0&&b.pop()}m.push(b),b=[],w=0,k=!1};for(let R=0;R<g.length;R++){const{token:D,style:G,continuesFromPrevious:U}=g[R],$=f(D,G);if(u){const V=pe(D),A=I?.text[I.text.length-1]??b[b.length-1]?.text.slice(-1)??"",X=A?pe(A):!1;if(V&&X)continue}const J=!U,W=J?T(R):$;if(W>d&&J)if(w>0&&L(),c){const V=y(R);for(let A=0;A<V.length;A++){const X=V[A].token,ne=V[A].style,ie=Li(X,c,s,r);for(const me of ie){const ze=f(me,ne);ze+w>d&&L(),!I||I.style!==ne?(F(),I={text:me,style:ne}):I.text+=me,w+=ze}}R+=V.length-1}else{const V=y(R);F(),m.push(V.map(A=>({text:A.token,style:A.style}))),k=!1,R+=V.length-1}else if(W+w>d&&J){if(pe(D)){k=!1;continue}L(),I={text:D,style:G},w=$}else if(U&&!c)!I||I.style!==G?(F(),I={text:D,style:G}):I.text+=D,w+=$;else{const V=pe(D);if(w===0&&V&&!k)continue;!I||I.style!==G?(F(),I={text:D,style:G}):I.text+=D,w+=$}}if(F(),b.length>0){const R=b[b.length-1];R.text=ve(R.text),R.text.length===0&&b.pop()}(b.length>0||m.length===_)&&m.push(b)}return m}function xu(o){const e=[];let t=!1;for(const n of o){const r=Fi(n.text);let s=!0;for(const i of r){const a=pe(i)||No(i),l=s&&t&&!a;e.push({token:i,style:n.style,continuesFromPrevious:l}),t=!a,s=!1}}return e}const bu={willReadFrequently:!0};function Sr(o,e,t,n,r){let s=t[o];return typeof s!="number"&&(s=r(o,e,n)+e,t[o]=s),s}function yu(o,e,t,n,r,s,i){const a=t.getContext("2d",bu);a.font=e._fontString;let l=0,c="";const u=[],d=Object.create(null),{letterSpacing:h,whiteSpace:p}=e,f=Ai(p),m=Oi(p);let x=!f;const g=e.wordWrapWidth+h,_=Fi(o);for(let y=0;y<_.length;y++){let b=_[y];if(No(b)){if(!m){u.push(ve(c)),x=!f,c="",l=0;continue}b=" "}if(f){const k=pe(b),I=pe(c[c.length-1]);if(k&&I)continue}const w=Sr(b,h,d,a,n);if(w>g)if(c!==""&&(u.push(ve(c)),c="",l=0),r(b,e.breakWords)){const k=Li(b,e.breakWords,i,s);for(const I of k){const F=Sr(I,h,d,a,n);F+l>g&&(u.push(ve(c)),x=!1,c="",l=0),c+=I,l+=F}}else c.length>0&&(u.push(ve(c)),c="",l=0),u.push(ve(b)),x=!1,c="",l=0;else w+l>g&&(x=!1,u.push(ve(c)),c="",l=0),(c.length>0||!pe(b)||x)&&(c+=b,l+=w)}const T=ve(c);return T.length>0&&u.push(T),u.join(`
`)}const Cr={willReadFrequently:!0},Ie=class P{static get experimentalLetterSpacingSupported(){let e=P._experimentalLetterSpacingSupported;if(e===void 0){const t=un.get().getCanvasRenderingContext2D().prototype;e=P._experimentalLetterSpacingSupported="letterSpacing"in t||"textLetterSpacing"in t}return e}constructor(e,t,n,r,s,i,a,l,c,u){this.text=e,this.style=t,this.width=n,this.height=r,this.lines=s,this.lineWidths=i,this.lineHeight=a,this.maxLineWidth=l,this.fontProperties=c,u&&(this.runsByLine=u.runsByLine,this.lineAscents=u.lineAscents,this.lineDescents=u.lineDescents,this.lineHeights=u.lineHeights,this.hasDropShadow=u.hasDropShadow)}static measureText(e=" ",t,n=P._canvas,r=t.wordWrap){const s=`${e}-${t.styleKey}-wordWrap-${r}`;if(P._measurementCache.has(s))return P._measurementCache.get(s);if(Ri(t)&&Bi(e)){const b=mu(e,t,r,P._context,P._measureText,P.measureFont,P.canBreakChars,P.wordWrapSplit),w=new P(e,t,b.width,b.height,b.lines,b.lineWidths,b.lineHeight,b.maxLineWidth,b.fontProperties,{runsByLine:b.runsByLine,lineAscents:b.lineAscents,lineDescents:b.lineDescents,lineHeights:b.lineHeights,hasDropShadow:b.hasDropShadow});return P._measurementCache.set(s,w),w}const a=t._fontString,l=P.measureFont(a);l.fontSize===0&&(l.fontSize=t.fontSize,l.ascent=t.fontSize,l.descent=0);const c=P._context;c.font=a;const d=(r?P._wordWrap(e,t,n):e).split(pu),h=new Array(d.length);let p=0;for(let b=0;b<d.length;b++){const w=P._measureText(d[b],t.letterSpacing,c);h[b]=w,p=Math.max(p,w)}const f=t._stroke?.width??0,m=t.lineHeight||l.fontSize,x=P._getAlignWidth(p,t,r),g=P._adjustWidthForStyle(x,t),_=Math.max(m,l.fontSize+f)+(d.length-1)*(m+t.leading),T=P._adjustHeightForStyle(_,t),y=new P(e,t,g,T,d,h,m+t.leading,p,l);return P._measurementCache.set(s,y),y}static _adjustWidthForStyle(e,t){const n=t._stroke?.width||0;let r=e+n;return t.dropShadow&&(r+=t.dropShadow.distance),r}static _adjustHeightForStyle(e,t){let n=e;return t.dropShadow&&(n+=t.dropShadow.distance),n}static _getAlignWidth(e,t,n){return n&&t.align!=="left"&&t.align!=="justify"?Math.max(e,t.wordWrapWidth):e}static _measureText(e,t,n){let r=!1;P.experimentalLetterSpacingSupported&&(P.experimentalLetterSpacing?(n.letterSpacing=`${t}px`,n.textLetterSpacing=`${t}px`,r=!0):(n.letterSpacing="0px",n.textLetterSpacing="0px"));const s=n.measureText(e);let i=s.width;const a=-(s.actualBoundingBoxLeft??0);let c=(s.actualBoundingBoxRight??0)-a;if(i>0)if(r)i-=t,c-=t;else{const u=(P.graphemeSegmenter(e).length-1)*t;i+=u,c+=u}return Math.max(i,c)}static _wordWrap(e,t,n=P._canvas){return yu(e,t,n,P._measureText,P.canBreakWords,P.canBreakChars,P.wordWrapSplit)}static isBreakingSpace(e,t){return pe(e)}static canBreakWords(e,t){return t}static canBreakChars(e,t,n,r,s){return!0}static wordWrapSplit(e){return P.graphemeSegmenter(e)}static measureFont(e){if(P._fonts[e])return P._fonts[e];const t=P._context;t.font=e;const n=t.measureText(P.METRICS_STRING+P.BASELINE_SYMBOL),r=n.actualBoundingBoxAscent??0,s=n.actualBoundingBoxDescent??0,i={ascent:r,descent:s,fontSize:r+s};return P._fonts[e]=i,i}static clearMetrics(e=""){e?delete P._fonts[e]:P._fonts={}}static get _canvas(){if(!P.__canvas){let e;try{const t=new OffscreenCanvas(0,0);if(t.getContext("2d",Cr)?.measureText)return P.__canvas=t,t;e=un.get().createCanvas()}catch{e=un.get().createCanvas()}e.width=e.height=10,P.__canvas=e}return P.__canvas}static get _context(){return P.__context||(P.__context=P._canvas.getContext("2d",Cr)),P.__context}};Ie.METRICS_STRING="|ÉqÅ";Ie.BASELINE_SYMBOL="M";Ie.BASELINE_MULTIPLIER=1.4;Ie.HEIGHT_MULTIPLIER=2;Ie.graphemeSegmenter=(()=>{if(typeof Intl?.Segmenter=="function"){const o=new Intl.Segmenter;return e=>{const t=o.segment(e),n=[];let r=0;for(const s of t)n[r++]=s.segment;return n}}return o=>[...o]})();Ie.experimentalLetterSpacing=!1;Ie._fonts={};Ie._measurementCache=su(1e3);let Me=Ie;const vu=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function lo(o){const e=typeof o.fontSize=="number"?`${o.fontSize}px`:o.fontSize;let t=o.fontFamily;Array.isArray(o.fontFamily)||(t=o.fontFamily.split(","));for(let n=t.length-1;n>=0;n--){let r=t[n].trim();!/([\"\'])[^\'\"]+\1/.test(r)&&!vu.includes(r)&&(r=`"${r}"`),t[n]=r}return`${o.fontStyle} ${o.fontVariant} ${o.fontWeight} ${e} ${t.join(",")}`}const Tr=1e5;function on(o,e,t,n=0,r=0,s=0){if(o.texture===j.WHITE&&!o.fill)return re.shared.setValue(o.color).setAlpha(o.alpha??1).toHexa();if(o.fill){if(o.fill instanceof To){const i=o.fill,a=e.createPattern(i.texture.source.resource,"repeat"),l=i.transform.copyTo(Ce.shared);return l.scale(i.texture.source.pixelWidth,i.texture.source.pixelHeight),a.setTransform(l),a}else if(o.fill instanceof gn){const i=o.fill,a=i.type==="linear",l=i.textureSpace==="local";let c=1,u=1;l&&t&&(c=t.width+n,u=t.height+n);let d,h=!1;if(a){const{start:p,end:f}=i;d=e.createLinearGradient(p.x*c+r,p.y*u+s,f.x*c+r,f.y*u+s),h=Math.abs(f.x-p.x)<Math.abs((f.y-p.y)*.1)}else{const{center:p,innerRadius:f,outerCenter:m,outerRadius:x}=i;d=e.createRadialGradient(p.x*c+r,p.y*u+s,f*c,m.x*c+r,m.y*u+s,x*c)}if(h&&l&&t){const p=t.lineHeight/u;for(let f=0;f<t.lines.length;f++){const m=(f*t.lineHeight+n/2)/u;i.colorStops.forEach(x=>{let g=m+x.offset*p;g=Math.max(0,Math.min(1,g)),d.addColorStop(Math.floor(g*Tr)/Tr,re.shared.setValue(x.color).toHex())})}}else i.colorStops.forEach(p=>{d.addColorStop(p.offset,re.shared.setValue(p.color).toHex())});return d}}else{const i=e.createPattern(o.texture.source.resource,"repeat"),a=o.matrix.copyTo(Ce.shared);return a.scale(o.texture.source.pixelWidth,o.texture.source.pixelHeight),i.setTransform(a),i}return ko("FillStyle not recognised",o),"red"}const kr=new Et;class wu{getCanvasAndContext(e){const{text:t,style:n,resolution:r=1}=e,s=n._getFinalPadding(),i=Me.measureText(t||" ",n),a=Math.ceil(Math.ceil(Math.max(1,i.width)+s*2)*r),l=Math.ceil(Math.ceil(Math.max(1,i.height)+s*2)*r),c=fr.getOptimalCanvasAndContext(a,l);this._renderTextToCanvas(n,s,r,c,i);const u=n.trim?ou({canvas:c.canvas,width:a,height:l,resolution:1,output:kr}):kr.set(0,0,a,l);return{canvasAndContext:c,frame:u}}returnCanvasAndContext(e){fr.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,n,r,s){if(s.runsByLine&&s.runsByLine.length>0){this._renderTaggedTextToCanvas(s,e,t,n,r);return}const{canvas:i,context:a}=r,l=lo(e),c=s.lines,u=s.lineHeight,d=s.lineWidths,h=s.maxLineWidth,p=s.fontProperties,f=i.height;if(a.resetTransform(),a.scale(n,n),a.textBaseline=e.textBaseline,e._stroke?.width){const w=e._stroke;a.lineWidth=w.width,a.miterLimit=w.miterLimit,a.lineJoin=w.join,a.lineCap=w.cap}a.font=l;let m,x;const g=e.dropShadow?2:1,_=e.wordWrap?e.wordWrapWidth:h,y=(e._stroke?.width??0)/2;let b=(u-p.fontSize)/2;u-p.fontSize<0&&(b=0);for(let w=0;w<g;++w){const k=e.dropShadow&&w===0,I=k?Math.ceil(Math.max(1,f)+t*2):0,F=I*n;if(k)this._setupDropShadow(a,e,n,F);else{const L=e._gradientBounds,R=e._gradientOffset;if(L){const D={width:L.width,height:L.height,lineHeight:L.height,lines:s.lines};this._setFillAndStrokeStyles(a,e,D,t,y,R?.x??0,R?.y??0)}else R?this._setFillAndStrokeStyles(a,e,s,t,y,R.x,R.y):this._setFillAndStrokeStyles(a,e,s,t,y);a.shadowColor="black"}for(let L=0;L<c.length;L++)m=y,x=y+L*u+p.ascent+b,m+=this._getAlignmentOffset(d[L],_,e.align),e._stroke?.width&&this._drawLetterSpacing(c[L],e,r,m+t,x+t-I,!0),e._fill!==void 0&&this._drawLetterSpacing(c[L],e,r,m+t,x+t-I)}}_renderTaggedTextToCanvas(e,t,n,r,s){const{canvas:i,context:a}=s,{runsByLine:l,lineWidths:c,maxLineWidth:u,lineAscents:d,lineHeights:h,hasDropShadow:p}=e,f=i.height;a.resetTransform(),a.scale(r,r),a.textBaseline=t.textBaseline;const m=p?2:1,x=t.wordWrap?t.wordWrapWidth:u,_=(t._stroke?.width??0)/2,T=[];for(let y=0;y<l.length;y++){const b=l[y],w=[];for(const k of b){const I=lo(k.style);a.font=I,w.push({width:Me._measureText(k.text,k.style.letterSpacing,a),font:I})}T.push(w)}for(let y=0;y<m;++y){const b=p&&y===0,w=b?Math.ceil(Math.max(1,f)+n*2):0,k=w*r;b||(a.shadowColor="black");let I=_;for(let F=0;F<l.length;F++){const L=l[F],R=c[F],D=d[F],G=h[F],U=T[F];let $=_;$+=this._getAlignmentOffset(R,x,t.align);const J=I+D;let W=$+n;for(let V=0;V<L.length;V++){const A=L[V],{width:X,font:ne}=U[V];if(a.font=ne,a.textBaseline=A.style.textBaseline,A.style._stroke?.width){const ie=A.style._stroke;if(a.lineWidth=ie.width,a.miterLimit=ie.miterLimit,a.lineJoin=ie.join,a.lineCap=ie.cap,b)if(A.style.dropShadow)this._setupDropShadow(a,A.style,r,k);else{W+=X;continue}else{const me=Me.measureFont(ne),ze=A.style.lineHeight||me.fontSize,ma={width:X,height:ze,lineHeight:ze,lines:[A.text]};a.strokeStyle=on(ie,a,ma,n*2,W-n,I)}this._drawLetterSpacing(A.text,A.style,s,W,J+n-w,!0)}W+=X}W=$+n;for(let V=0;V<L.length;V++){const A=L[V],{width:X,font:ne}=U[V];if(a.font=ne,a.textBaseline=A.style.textBaseline,A.style._fill!==void 0){if(b)if(A.style.dropShadow)this._setupDropShadow(a,A.style,r,k);else{W+=X;continue}else{const ie=Me.measureFont(ne),me=A.style.lineHeight||ie.fontSize,ze={width:X,height:me,lineHeight:me,lines:[A.text]};a.fillStyle=on(A.style._fill,a,ze,n*2,W-n,I)}this._drawLetterSpacing(A.text,A.style,s,W,J+n-w,!1)}W+=X}I+=G}}}_setFillAndStrokeStyles(e,t,n,r,s,i=0,a=0){if(e.fillStyle=t._fill?on(t._fill,e,n,r*2,i,a):null,t._stroke?.width){const l=s+r*2;e.strokeStyle=on(t._stroke,e,n,l,i,a)}}_setupDropShadow(e,t,n,r){e.fillStyle="black",e.strokeStyle="black";const s=t.dropShadow,i=s.color,a=s.alpha;e.shadowColor=re.shared.setValue(i).setAlpha(a).toRgbaString();const l=s.blur*n,c=s.distance*n;e.shadowBlur=l,e.shadowOffsetX=Math.cos(s.angle)*c,e.shadowOffsetY=Math.sin(s.angle)*c+r}_getAlignmentOffset(e,t,n){return n==="right"?t-e:n==="center"?(t-e)/2:0}_drawLetterSpacing(e,t,n,r,s,i=!1){const{context:a}=n,l=t.letterSpacing;let c=!1;if(Me.experimentalLetterSpacingSupported&&(Me.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,c=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||c){i?a.strokeText(e,r,s):a.fillText(e,r,s);return}let u=r;const d=Me.graphemeSegmenter(e);let h=a.measureText(e).width,p=0;for(let f=0;f<d.length;++f){const m=d[f];i?a.strokeText(m,u,s):a.fillText(m,u,s);let x="";for(let g=f+1;g<d.length;++g)x+=d[g];p=a.measureText(x).width,u+=h-p+l,h=p}}}const pt=new wu,jo=class We extends Aa{constructor(e={}){super(),this.uid=Oa("textStyle"),this._tick=0,this._cachedFontString=null,Su(e),e instanceof We&&(e=e._toObject());const r={...We.defaultTextStyle,...e};for(const s in r){const i=s;this[i]=r[s]}this._tagStyles=e.tagStyles??void 0,this.update(),this._tick=0}get align(){return this._align}set align(e){this._align!==e&&(this._align=e,this.update())}get breakWords(){return this._breakWords}set breakWords(e){this._breakWords!==e&&(this._breakWords=e,this.update())}get dropShadow(){return this._dropShadow}set dropShadow(e){this._dropShadow!==e&&(e!==null&&typeof e=="object"?this._dropShadow=this._createProxy({...We.defaultDropShadow,...e}):this._dropShadow=e?this._createProxy({...We.defaultDropShadow}):null,this.update())}get fontFamily(){return this._fontFamily}set fontFamily(e){this._fontFamily!==e&&(this._fontFamily=e,this.update())}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize!==e&&(typeof e=="string"?this._fontSize=parseInt(e,10):this._fontSize=e,this.update())}get fontStyle(){return this._fontStyle}set fontStyle(e){this._fontStyle!==e&&(this._fontStyle=e.toLowerCase(),this.update())}get fontVariant(){return this._fontVariant}set fontVariant(e){this._fontVariant!==e&&(this._fontVariant=e,this.update())}get fontWeight(){return this._fontWeight}set fontWeight(e){this._fontWeight!==e&&(this._fontWeight=e,this.update())}get leading(){return this._leading}set leading(e){this._leading!==e&&(this._leading=e,this.update())}get letterSpacing(){return this._letterSpacing}set letterSpacing(e){this._letterSpacing!==e&&(this._letterSpacing=e,this.update())}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight!==e&&(this._lineHeight=e,this.update())}get padding(){return this._padding}set padding(e){this._padding!==e&&(this._padding=e,this.update())}get filters(){return this._filters}set filters(e){this._filters!==e&&(this._filters=Object.freeze(e),this.update())}get trim(){return this._trim}set trim(e){this._trim!==e&&(this._trim=e,this.update())}get textBaseline(){return this._textBaseline}set textBaseline(e){this._textBaseline!==e&&(this._textBaseline=e,this.update())}get whiteSpace(){return this._whiteSpace}set whiteSpace(e){this._whiteSpace!==e&&(this._whiteSpace=e,this.update())}get wordWrap(){return this._wordWrap}set wordWrap(e){this._wordWrap!==e&&(this._wordWrap=e,this.update())}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(e){this._wordWrapWidth!==e&&(this._wordWrapWidth=e,this.update())}get fill(){return this._originalFill}set fill(e){e!==this._originalFill&&(this._originalFill=e,this._isFillStyle(e)&&(this._originalFill=this._createProxy({...rt.defaultFillStyle,...e},()=>{this._fill=nr({...this._originalFill},rt.defaultFillStyle)})),this._fill=nr(e===0?"black":e,rt.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(e){e!==this._originalStroke&&(this._originalStroke=e,this._isFillStyle(e)&&(this._originalStroke=this._createProxy({...rt.defaultStrokeStyle,...e},()=>{this._stroke=or({...this._originalStroke},rt.defaultStrokeStyle)})),this._stroke=or(e,rt.defaultStrokeStyle),this.update())}get tagStyles(){return this._tagStyles}set tagStyles(e){this._tagStyles!==e&&(this._tagStyles=e??void 0,this.update())}update(){this._tick++,this._cachedFontString=null,this.emit("update",this)}reset(){const e=We.defaultTextStyle;for(const t in e)this[t]=e[t]}assign(e){for(const t in e){const n=t;this[n]=e[t]}return this}get styleKey(){return`${this.uid}-${this._tick}`}get _fontString(){return this._cachedFontString===null&&(this._cachedFontString=lo(this)),this._cachedFontString}_toObject(){return{align:this.align,breakWords:this.breakWords,dropShadow:this._dropShadow?{...this._dropShadow}:null,fill:this._fill?{...this._fill}:void 0,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke?{...this._stroke}:void 0,textBaseline:this.textBaseline,trim:this.trim,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,filters:this._filters?[...this._filters]:void 0,tagStyles:this._tagStyles?{...this._tagStyles}:void 0}}clone(){return new We(this._toObject())}_getFinalPadding(){let e=0;if(this._filters)for(let t=0;t<this._filters.length;t++)e+=this._filters[t].padding;return Math.max(this._padding,e)}destroy(e=!1){if(this.removeAllListeners(),typeof e=="boolean"?e:e?.texture){const n=typeof e=="boolean"?e:e?.textureSource;this._fill?.texture&&this._fill.texture.destroy(n),this._originalFill?.texture&&this._originalFill.texture.destroy(n),this._stroke?.texture&&this._stroke.texture.destroy(n),this._originalStroke?.texture&&this._originalStroke.texture.destroy(n)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}_createProxy(e,t){return new Proxy(e,{set:(n,r,s)=>(n[r]===s||(n[r]=s,t?.(r,s),this.update()),!0)})}_isFillStyle(e){return(e??null)!==null&&!(re.isColorLike(e)||e instanceof gn||e instanceof To)}};jo.defaultDropShadow={alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5};jo.defaultTextStyle={align:"left",breakWords:!1,dropShadow:null,fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};let xn=jo;function Su(o){const e=o;if(typeof e.dropShadow=="boolean"&&e.dropShadow){const t=xn.defaultDropShadow;o.dropShadow={alpha:e.dropShadowAlpha??t.alpha,angle:e.dropShadowAngle??t.angle,blur:e.dropShadowBlur??t.blur,color:e.dropShadowColor??t.color,distance:e.dropShadowDistance??t.distance}}if(e.strokeThickness!==void 0){Se(Ye,"strokeThickness is now a part of stroke");const t=e.stroke;let n={};if(re.isColorLike(t))n.color=t;else if(t instanceof gn||t instanceof To)n.fill=t;else if(Object.hasOwnProperty.call(t,"color")||Object.hasOwnProperty.call(t,"fill"))n=t;else throw new Error("Invalid stroke value.");o.stroke={...n,width:e.strokeThickness}}if(Array.isArray(e.fillGradientStops)){if(Se(Ye,"gradient fill is now a fill pattern: `new FillGradient(...)`"),!Array.isArray(e.fill)||e.fill.length===0)throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");e.fill.length!==e.fillGradientStops.length&&ko("The number of fill colors must match the number of fill gradient stops.");const t=new gn({start:{x:0,y:0},end:{x:0,y:1},textureSpace:"local"}),n=e.fillGradientStops.slice(),r=e.fill.map(s=>re.shared.setValue(s).toNumber());n.forEach((s,i)=>{t.addColorStop(s,r[i])}),o.fill={fill:t}}}function Cu(o,e){const{texture:t,bounds:n}=o,r=e._style._getFinalPadding();Fa(n,e._anchor,t);const s=e._anchor._x*r*2,i=e._anchor._y*r*2;n.minX-=r-s,n.minY-=r-i,n.maxX-=r-s,n.maxY-=r-i}class Tu extends Ac{}class Ei{constructor(e){this._renderer=e,e.runners.resolutionChange.add(this),this._managedTexts=new Ts({renderer:e,type:"renderable",onUnload:this.onTextUnload.bind(this),name:"canvasText"})}resolutionChange(){for(const e in this._managedTexts.items){const t=this._managedTexts.items[e];t?._autoResolution&&t.onViewUpdate()}}validateRenderable(e){const t=this._getGpuText(e),n=e.styleKey;return t.currentKey!==n?!0:e._didTextUpdate}addRenderable(e,t){const n=this._getGpuText(e);if(e._didTextUpdate){const r=e._autoResolution?this._renderer.resolution:e.resolution;(n.currentKey!==e.styleKey||e._resolution!==r)&&this._updateGpuText(e),e._didTextUpdate=!1,Cu(n,e)}this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Tu;return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,this._managedTexts.add(e),t}onTextUnload(e){const t=e._gpuData[this._renderer.uid];if(!t)return;const{canvasText:n}=this._renderer;n.getReferenceCount(t.currentKey)>0?n.decreaseReferenceCount(t.currentKey):t.texture&&n.returnTexture(t.texture)}destroy(){this._managedTexts.destroy(),this._renderer=null}}Ei.extension={type:[E.WebGLPipes,E.WebGPUPipes,E.CanvasPipes],name:"text"};const ku=new La;function Iu(o,e,t,n){const r=ku;r.minX=0,r.minY=0,r.maxX=o.width/n|0,r.maxY=o.height/n|0;const s=Is.getOptimalTexture(r.width,r.height,n,!1);return s.source.uploadMethodId="image",s.source.resource=o,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/n,s.frame.height=t/n,s.source.emit("update",s.source),s.updateUvs(),s}class zi{constructor(e,t){this._activeTextures={},this._renderer=e,this._retainCanvasContext=t}getTexture(e,t,n,r){typeof e=="string"&&(Se("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:n,resolution:t}),e.style instanceof xn||(e.style=new xn(e.style)),e.textureStyle instanceof zt||(e.textureStyle=new zt(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:i,textureStyle:a}=e,l=e.resolution??this._renderer.resolution,{frame:c,canvasAndContext:u}=pt.getCanvasAndContext({text:s,style:i,resolution:l}),d=Iu(u.canvas,c.width,c.height,l);if(a&&(d.source.style=a),i.trim&&(c.pad(i.padding),d.frame.copyFrom(c),d.frame.scale(1/l),d.updateUvs()),i.filters){const h=this._applyFilters(d,i.filters);return this.returnTexture(d),pt.returnCanvasAndContext(u),h}return this._renderer.texture.initSource(d._source),this._retainCanvasContext||pt.returnCanvasAndContext(u),d}returnTexture(e){const t=e.source,n=t.resource;if(this._retainCanvasContext&&n?.getContext){const r=n.getContext("2d");r&&pt.returnCanvasAndContext({canvas:n,context:r})}t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",Is.returnTexture(e,!0)}renderTextToCanvas(){Se("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const n=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:n,usageCount:1},n}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null))}getReferenceCount(e){return this._activeTextures[e]?.usageCount??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const n=this._renderer.renderTarget.renderTarget,r=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(n,!1),r}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}class Ui extends zi{constructor(e){super(e,!0)}}Ui.extension={type:[E.CanvasSystem],name:"canvasText"};class Di extends zi{constructor(e){super(e,!1)}}Di.extension={type:[E.WebGLSystem,E.WebGPUSystem],name:"canvasText"};Tt.add(Ui);Tt.add(Di);Tt.add(Ei);class _u extends eu{constructor(...e){const t=tu(e,"Text");super(t,xn),this.renderPipeId="text",t.textureStyle&&(this.textureStyle=t.textureStyle instanceof zt?t.textureStyle:new zt(t.textureStyle))}updateBounds(){const e=this._bounds,t=this._anchor;let n=0,r=0;if(this._style.trim){const{frame:s,canvasAndContext:i}=pt.getCanvasAndContext({text:this.text,style:this._style,resolution:1});pt.returnCanvasAndContext(i),n=s.width,r=s.height}else{const s=Me.measureText(this._text,this._style);n=s.width,r=s.height}e.minX=-t._x*n,e.maxX=e.minX+n,e.minY=-t._y*r,e.maxY=e.minY+r}}const Gi=class Wi extends C{constructor(e={}){e={...Wi.defaultOptions,...e},super(),this.renderLayerChildren=[],this.sortableChildren=e.sortableChildren,this.sortFunction=e.sortFunction}attach(...e){for(let t=0;t<e.length;t++){const n=e[t];if(n.parentRenderLayer){if(n.parentRenderLayer===this)continue;n.parentRenderLayer.detach(n)}this.renderLayerChildren.push(n),n.parentRenderLayer=this;const r=this.renderGroup||this.parentRenderGroup;r&&(r.structureDidChange=!0)}return e[0]}detach(...e){for(let t=0;t<e.length;t++){const n=e[t],r=this.renderLayerChildren.indexOf(n);r!==-1&&this.renderLayerChildren.splice(r,1),n.parentRenderLayer=null;const s=this.renderGroup||this.parentRenderGroup;s&&(s.structureDidChange=!0)}return e[0]}detachAll(){const e=this.renderLayerChildren;for(let t=0;t<e.length;t++)e[t].parentRenderLayer=null;this.renderLayerChildren.length=0}collectRenderables(e,t,n){const r=this.renderLayerChildren,s=r.length;this.sortableChildren&&this.sortRenderLayerChildren();for(let i=0;i<s;i++)r[i].parent||ko("Container must be added to both layer and scene graph. Layers only handle render order - the scene graph is required for transforms (addChild)",r[i]),r[i].collectRenderables(e,t,this)}sortRenderLayerChildren(){this.renderLayerChildren.sort(this.sortFunction)}_getGlobalBoundsRecursive(e,t,n){if(!e)return;const r=this.renderLayerChildren;for(let s=0;s<r.length;s++)r[s]._getGlobalBoundsRecursive(!0,t,this)}getFastGlobalBounds(e,t){return super.getFastGlobalBounds(e,t)}addChild(...e){throw new Error("RenderLayer.addChild() is not available. Please use RenderLayer.attach()")}removeChild(...e){throw new Error("RenderLayer.removeChild() is not available. Please use RenderLayer.detach()")}removeChildren(e,t){throw new Error("RenderLayer.removeChildren() is not available. Please use RenderLayer.detach()")}removeChildAt(e){throw new Error("RenderLayer.removeChildAt() is not available")}getChildAt(e){throw new Error("RenderLayer.getChildAt() is not available")}setChildIndex(e,t){throw new Error("RenderLayer.setChildIndex() is not available")}getChildIndex(e){throw new Error("RenderLayer.getChildIndex() is not available")}addChildAt(e,t){throw new Error("RenderLayer.addChildAt() is not available")}swapChildren(e,t){throw new Error("RenderLayer.swapChildren() is not available")}reparentChild(...e){throw new Error("RenderLayer.reparentChild() is not available with the render layer")}reparentChildAt(e,t){throw new Error("RenderLayer.reparentChildAt() is not available with the render layer")}};Gi.defaultOptions={sortableChildren:!1,sortFunction:(o,e)=>o.zIndex-e.zIndex};let Ir=Gi;var Pu=`#version 300 es
precision highp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform sampler2D uLut;uniform sampler2D uMask;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}void main(void){vec4 c=texture(uTexture,vTextureCoord);float maskVal=texture(uMask,vTextureCoord).r;finalColor=mix(c,lutColourReplace(uLut,c),maskVal);}`;const Mu=Z.from({vertex:Le,fragment:Pu,name:"palette-swop-filter1"});class xt extends q{constructor({paletteSwaps:e,lutType:t},n=j.WHITE){const r=(t==="voronoi"?wc:Sc)(e);super({glProgram:Mu,resources:{colorReplaceUniforms:{},uLut:r.source,uMask:n.source}}),this.mask=n,this.#e=r}#e;destroy(e){const t=e===!0||typeof e=="object"&&e.destroyPrograms,n=e===!0||typeof e=="object"&&e.destroyLutTexture,r=this.lutTexture!==j.WHITE&&e===!0||typeof e=="object"&&e.destroyMask;n&&this.#e?.destroy(!0),this.#e=null,r&&this.mask?.destroy(!0),super.destroy(t)}get lutTexture(){return this.#e}}const Vi={ambient:[]},Ru=tt(Ut).filter(o=>o.startsWith("shadow.")||o.startsWith("shadowMask.")||o.startsWith("hud.")).toArray(),Bu=o=>typeof o=="function"?tt(Ut).filter(o):o,Au=(o,e)=>new xt({paletteSwaps:_s(S,([t])=>t==="replaceDark"||t==="replaceLight"?[t,o]:[t,e]),lutType:"sparse"}),Ou=(o,{ambient:e,textureSpecific:t=bt,noReplacePlaceholderTextures:n=bt},r=Ea())=>{const s=[];for(const{textureIds:u,paletteSwaps:d}of t){const h=rr(o,{rects:{textureIds:u,color:An},clearColour:On}),p=new xt({paletteSwaps:d,lutType:"sparse"},h);s.push(p)}const i=n.length>0?Au(On,An):void 0,a=rr(o,{clearColour:An,rects:{textureIds:Ua(Ru,tt(t).filter(({dodgeAmbient:u})=>u).flatMap(({textureIds:u})=>Bu(u))),color:On},placeholderColoursMasks:i?{textureIds:n,filter:i,originalSpritesheet:Be()}:void 0});i?.destroy({destroyLutTexture:!0,destroyMask:!0});for(const u of e){const d=new xt(u,a);s.push(d)}const l=new te(r);l.filters=s;const c=Ke.create({width:r.width,height:r.height});o.render({container:l,target:c}),l.destroy(!1),a.destroy();for(const u of s)u instanceof xt?u.destroy({destroyLutTexture:!0,destroyMask:!0,destroyPrograms:!1}):u.destroy(!1);return c},kt=(o,e,t)=>{const n=Ou(o,e,t),r=new za(n.source,structuredClone(Je));return r.parseSync(),r.textureSource.scaleMode="nearest",r},Xo={ambient:[{paletteSwaps:In,lutType:"sparse"}]},bn=(o,e,t)=>{const n=j.from(e.textureSource),r=kt(o,t,n);return n.destroy(),e.textureSource.destroy(),e.destroy(!0),r};let co;const Fu=o=>{co=kt(o,{ambient:[{lutType:"voronoi",paletteSwaps:{pureBlack:new re(0),shadow:new re(16777215),redShadow:new re(16777215)}}]})},Lu=()=>{if(co===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return co};Tt.add(ti,ni,oi,ri,si,ii,ai,li,ci,ui,di,pi,hi,fi,mi,gi,xi,bi,yi,vi,wi);const Eu=async(o,{forceRefetch:e}=de)=>await B.dispatch(Da.endpoints.getCampaign.initiate(o,{forceRefetch:e}));j.from;Ga.prototype.destroy;const zu=o=>{o.ticker.remove(o.render,o)},$i={white:{basic:{main:"white",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"white",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"yellow",dimmedHue:"magenta",icons:"cyan"}}},yellow:{basic:{main:"yellow",edges:{towards:{hue:"green",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}},dimmed:{main:"yellow",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!1}},hud:{brightHue:"cyan",dimmedHue:"magenta",icons:"green"}}},magenta:{basic:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}},dimmed:{main:"magenta",edges:{towards:{hue:"green",dimInOriginal:!0},right:{hue:"cyan",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"cyan",icons:"yellow"}}},cyan:{basic:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!1},right:{hue:"white",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}},dimmed:{main:"cyan",edges:{towards:{hue:"magenta",dimInOriginal:!0},right:{hue:"white",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"green",icons:"yellow"}}},green:{basic:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!1},right:{hue:"yellow",dimInOriginal:!1}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}},dimmed:{main:"green",edges:{towards:{hue:"cyan",dimInOriginal:!0},right:{hue:"yellow",dimInOriginal:!0}},hud:{brightHue:"white",dimmedHue:"magenta",icons:"cyan"}}}},Yt=o=>$i[o.hue][o.shade],uo={head:"pastelBlue",heels:"pink"},_r=(o,e)=>{const t=Yt(o.color).edges[e];return se(t.hue,t.dimInOriginal?"dimmed":"basic")},Uu=Ut.filter(o=>o.startsWith("door.")),ho=o=>/\.floor$/.test(o),po=o=>/\.wall\.[^.]+\.(away|left)$|door\.legs\.pillar/.test(o),Pr=o=>/door\.legs\.pillar/.test(o),Du=o=>/\.wall\.[^.]+\.left$/.test(o),Un=o=>ho(o)||po(o),Gu=(o,e,t)=>{if(o)return{ambient:[{lutType:"sparse",paletteSwaps:K(t.hue,t.shade==="dimmed")},t.shade==="basic"?Hi(e,t):{lutType:"sparse",paletteSwaps:{...In}}],textureSpecific:[...Vu(e,t),...Wu(e,t),...$u(t)],noReplacePlaceholderTextures:Uu}},Wu=(o,e)=>{const{edges:t}=$i[e.hue][e.shade],n=K(t.right.hue,e.shade==="dimmed","light-mid"),r=K(t.towards.hue,e.shade==="dimmed","mid-dark");return[{textureIds:["floorEdge.half.right","floorEdge.right","generic.door.floatingThreshold.y"],paletteSwaps:n},{textureIds:["floorEdge.half.towards","floorEdge.towards","generic.door.floatingThreshold.x"],paletteSwaps:r}]},Vu=(o,e)=>{if(o==="jail")return[{textureIds:Un,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];if(o==="blacktooth"&&e.shade==="dimmed")return[{textureIds:po,paletteSwaps:K(e.hue,!0,"light-mid")}];if(e.hue==="white"||e.hue==="yellow")switch(o){case"market":return[{textureIds:Un,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];case"egyptus":return[{textureIds:Pr,paletteSwaps:K(e.hue,e.shade==="dimmed","light-dark")},{textureIds:ho,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")},{textureIds:Du,paletteSwaps:K(e.hue,e.shade==="dimmed","light-mid")},{textureIds:po,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];case"moonbase":case"penitentiary":case"safari":case"bookworld":return[{textureIds:ho,paletteSwaps:K(e.hue,e.shade==="dimmed","mid-dark")}];case"blacktooth":return[{textureIds:Pr,paletteSwaps:K(e.hue,e.shade==="dimmed","light-dark")},{textureIds:Un,paletteSwaps:K(e.hue,e.shade==="dimmed","light-mid")}]}return bt},$u=o=>{const{hue:e,shade:t}=o;return e==="white"||e==="yellow"?[{textureIds:["book.x","book.y"],paletteSwaps:{...K(e,t==="dimmed","light-mid"),shadow:io(`swop_${e}Dim`,t==="dimmed")}}]:t==="dimmed"?[{textureIds:["book.x","book.y"],paletteSwaps:{...K(o.hue,!0,o.hue==="cyan"?"light-mid":"mid-dark")}}]:bt},Hu={blacktooth:{pureBlack:Pe(S.moss,.15)},safari:{pureBlack:Pe(S.moss,.17)},jail:{pureBlack:Pe(S.redShadow,.2)},egyptus:{pureBlack:Pe(S.redShadow)},moonbase:{shadow:S.shadow_greyBlue,pureBlack:Pe(S.metallicBlue,.2)},bookworld:{shadow:S.shadow_brown,pureBlack:Pe(S.highlightBeige,.1)},penitentiary:{pureBlack:Pe(S.midGrey,.2)}},Nu={yellow:{shadow:S.shadow_brown},white:{shadow:S.shadow_greyBlue},magenta:{shadow:S.shadow_magenta},cyan:{shadow:S.shadow_blue}},Hi=(o,e)=>({lutType:"sparse",paletteSwaps:{...Nu[e.hue]??de,...Hu[o]??de}});let ft,fo=Vi;const Ni=()=>{ft!==void 0&&(ft.textureSource.destroy(),ft.destroy(!0),ft=void 0)},ju=(o,e,t,n)=>{Ni(),fo=Gu(e,t,n)??Vi,ft=kt(o,fo)},Xu=()=>ft,mn=o=>{let e=S[o];for(const t of fo.ambient)e=t.paletteSwaps[o]??e;return e};let Ne;const Yo={lightBeige:S.lightGrey,redShadow:S.shadow,pink:S.lightGrey,moss:S.lightGrey,midRed:S.midGrey,highlightBeige:S.lightGrey,pastelBlue:S.lightGrey,metallicBlue:S.midGrey,replaceLight:S.lightGrey,replaceDark:S.midGrey},Yu=Ps(Yo,"metallicBlue","pastelBlue"),qu=Ps(Yo,"pink"),Zu={ambient:[{paletteSwaps:Yo,lutType:"sparse"}],textureSpecific:[{textureIds:Ut.filter(o=>o.startsWith("head.")),paletteSwaps:Yu,dodgeAmbient:!0},{textureIds:Ut.filter(o=>o.startsWith("heels.")),paletteSwaps:qu,dodgeAmbient:!0}]},Ju=()=>{Ne!==void 0&&(Ne.textureSource.destroy(),Ne.destroy(!0),Ne=void 0)},Ku=(o,e,t)=>{Ju();let n=kt(o,Zu);t.shade==="dimmed"?n=bn(o,n,Xo):n=bn(o,n,{ambient:[Hi(e,t)]}),Ne=n},Qu=()=>{if(Ne===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Ne};let je;const ed={midGrey:S.midRed,lightGrey:S.lightBeige,white:S.highlightBeige,metallicBlue:S.redShadow,shadow:S.redShadow,pastelBlue:S.lightBeige,pink:S.midRed,moss:S.midRed,replaceDark:S.midRed,replaceLight:S.lightBeige},td=()=>{je!==void 0&&(je.textureSource.destroy(),je.destroy(!0),je=void 0)},nd=(o,e)=>{td();let t=kt(o,{ambient:[{paletteSwaps:ed,lutType:"sparse"}]});e&&(t=bn(o,t,Xo)),je=t},od=()=>{if(je===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return je};let Xe;const rd={pastelBlue:S.moss,metallicBlue:S.moss,pink:S.moss},sd=()=>{Xe!==void 0&&(Xe.textureSource.destroy(),Xe.destroy(!0),Xe=void 0)},id=(o,e)=>{sd();let t=kt(o,{ambient:[{paletteSwaps:rd,lutType:"sparse"}]});e&&(t=bn(o,t,Xo)),Xe=t},ad=()=>{if(Xe===void 0)throw new Error("swopped spritesheet undefined - should only be called when we know for sure it is available");return Xe},Te=o=>{try{switch(o){case"original":return Be();case"deactivated":return Qu();case"doughnutted":return od();case"for-current-room":return Xu();case"sceneryPlayer":return ad();case"uncolourised":return Lu();default:return o}}catch(e){throw new Error(`could not get spritesheet variant "${o}"`,{cause:e})}},Ot=(o="for-current-room",e)=>Te(o).textures[e];var ld=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform vec2 uTextureSize;uniform sampler2D uTexture;uniform vec3 uOutline;uniform float uOutlineWidth;void main(void){vec2 scaledTexelSize=vec2(1.0f)/vec2(textureSize(uTexture,0))*uOutlineWidth;vec2 rightCoord=vec2(vTextureCoord.x+scaledTexelSize.x,vTextureCoord.y);vec2 leftCoord=vec2(vTextureCoord.x-scaledTexelSize.x,vTextureCoord.y);vec2 belowCoord=vec2(vTextureCoord.x,vTextureCoord.y+scaledTexelSize.y);vec2 aboveCoord=vec2(vTextureCoord.x,vTextureCoord.y-scaledTexelSize.y);vec4 colourToRight=texture(uTexture,rightCoord);vec4 colourToLeft=texture(uTexture,leftCoord);vec4 colourBelow=texture(uTexture,belowCoord);vec4 colourAbove=texture(uTexture,aboveCoord);float hasOpaqueNeighbor=max(max(colourToRight.a,colourToLeft.a),max(colourBelow.a,colourAbove.a));vec4 originalColour=texture(uTexture,vTextureCoord);finalColor=mix(originalColour,vec4(uOutline,1),(1.0-originalColour.a)*hasOpaqueNeighbor);}`;let mo=Io(B.getState());B.subscribe(()=>{mo=Io(B.getState())});const cd=Z.from({vertex:Le,fragment:ld,name:"outline-filter"});class Fe extends q{#e;constructor({color:e,width:t}){const n=t??mo;super({glProgram:cd,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}}),this.#e=t;const r=this.resources.colorReplaceUniforms.uniforms,[s,i,a]=e.toArray();r.uOutline[0]=s,r.uOutline[1]=i,r.uOutline[2]=a}apply(e,t,n,r){const s=this.resources.colorReplaceUniforms.uniforms,i=this.#e??mo;this.padding=i,s.uOutlineWidth[0]=i,super.apply(e,t,n,r)}}const qt={..._s(S,([o,e])=>[o,new Fe({color:e})]),black1pxFilter:new Fe({color:S.pureBlack,width:1})},Dn={x:.5,y:1},Mr=o=>typeof o!="string"&&Object.hasOwn(o,"animationId"),go=o=>{const{anchor:e,flipX:t,pivot:n,x:r,y:s,times:i,label:a}=o;if(o.times){const c=Wa(i);if(yn(c)>=2){const d=new C({label:a??"timesXyz"});for(let{x:h}=c;h>=1;h--)for(let{y:p}=c;p>=1;p--)for(let f=1;f<=c.z;f++){const m={...o,label:`(${h},${p},${f})`,...o.subSpriteVariations?.(h-1,p-1,f-1),subSpriteVariations:void 0};"randomiseStartFrame"in m&&(m.randomiseStartFrame=`${m.randomiseStartFrame}${h},${p},${f}`),delete m.times;const x=go(m),g=Qe({x:h-1,y:p-1,z:f-1});x.x+=g.x,x.y+=+g.y,d.addChild(x)}return d}}if(o.subSpriteVariations!==void 0)return go({...o,...o.subSpriteVariations(0,0,0),subSpriteVariations:void 0});let l;if(Mr(o))l=ud(o);else{const{textureId:c}=o,u=Te(o.spritesheetVariant??"original");l=new te(c!==void 0?u.textures[c]:j.EMPTY)}if(e===void 0&&n===void 0)if(Mr(o))l.anchor=Dn;else{const{textureId:c}=o,u=c!==void 0?Te(o.spritesheetVariant??"original").data.frames[c]:void 0;if(u!==void 0){const d=u.frame;d.pivot!==void 0?l.pivot=d.pivot:l.anchor=Dn}else l.anchor=Dn}else e!==void 0&&(l.anchor=e),n!==void 0&&(l.pivot=n);return r!==void 0&&(l.x=r),s!==void 0&&(l.y=s),a!==void 0&&(l.label=a),l.eventMode="static",t===!0&&(l.scale.x=-1),l},ji=(o,e=!1)=>{const t=ut.shared.speed,n=e||t===0?0:Math.sqrt(t)/t;return Je.animations[o].animationSpeed*n},qo=o=>o.map(e=>({texture:e,time:Ms}));function ud({animationId:o,reverse:e,playOnce:t,paused:n,randomiseStartFrame:r,spritesheetVariant:s}){const i=Te(s).animations[o],a=qo(i);e&&a.reverse();const l=new be(a);return l.animationSpeed=ji(o,n),l.gotoAndPlay(r!==void 0?Math.floor(Rs(r)*a.length):0),t!==void 0&&(l.loop=!1,l.onComplete=()=>{l.stop(),t==="and-destroy"&&(l.visible=!1)}),l}const v=go;class dd extends be{destroy(e){const t=this.textures.map(n=>"texture"in n?n.texture:n).filter(n=>n instanceof Ke);super.destroy(e);for(const n of t)n.destroy(!0)}}class hd extends te{constructor(...e){const[t]=e;super(t)}destroy(e){const t=this.texture!==null;typeof e=="boolean"?super.destroy({texture:t,textureSource:this.texture instanceof Ke,children:e}):super.destroy({...e,texture:t,textureSource:this.texture instanceof Ke})}}const Vt=(o,e,t)=>{const n=e.getLocalBounds(),r=Math.ceil(n.maxX-n.minX),s=Math.ceil(n.maxY-n.minY),i=t!==void 0?t.width===r&&t.height===s:!1,a=i?t:Ke.create({width:r,height:s,antialias:!1,autoGenerateMipmaps:!1});a.label=`renderTexture of ${e.label??"(anon)"}`,t&&!i&&t.destroy();const{x:l,y:c}=e;e.x-=n.minX,e.y-=n.minY;try{o.render({container:e,target:a,clear:i})}catch(u){throw new Error(`renderContainerToTexture: failed to render to texture. Container:
 ${ao(e)}`,{cause:u})}return e.x=l,e.y=c,a},xe=(o,e,t,n)=>{const r=e.getLocalBounds(),s=t?.texture&&t?.texture instanceof Ke?t.texture:void 0,i=Vt(o,e,s),a=t||new hd;return a.texture=i,a.label=n??`sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},Zo=(o,e,t,n)=>{if(e instanceof be||e instanceof te)return e;const r=e.getLocalBounds(),s=e.children.find(l=>l instanceof be)?.textures.length??1,i=tt(Va(0,s)).map(l=>{if(l>0)for(const c of e.children)c instanceof be&&c.gotoAndStop((c.currentFrame+1)%s);return Vt(o,e)}).toArray(),a=new dd(qo(i));return a.animationSpeed=ji(t,!1),a.gotoAndPlay(0),a.label=`animated sprite of container (${e.label})`,a.pivot={x:Math.floor(-r.minX),y:Math.floor(-r.minY)},a},It=(o,e)=>e instanceof te?e:xe(o,e),pd=o=>{const e=`hud.char.${$a(o)}`;try{As(e)}catch(t){throw new Error(`no texture id for char "${o}": ${t.message}`,{cause:t})}return e},fd=o=>typeof o=="string"?o==="infinite"?"":o:o.toString();class N extends C{#e;#t="";#o;#n;#r;#s;#i;constructor({pixiRenderer:e,doubleHeight:t=!1,doubleWidth:n=!1,outline:r=!1,label:s="text",x:i,y:a,tint:l,text:c}){super({label:s,x:i,y:a,tint:l}),this.#e=e,this.#s=t?2:1,this.#i=n?2:1,this.#o=new te,this.#o.y=-($e.h*this.#s+1),this.addChild(this.#o),this.#r=new C,this.addChild(this.#r),this.#n=new C,this.#n.scale={x:this.#i,y:this.#s},r&&(this.#n.filters=new Fe({color:S.pureBlack,width:1})),this.#r.addChild(this.#n),c!==void 0&&(this.text=c)}get text(){return this.#t}set text(e){const t=fd(e);this.#t!==t&&(this.#l(t),this.#r.visible=!0,this.#r.boundsArea=new Et(-1,-1,($e.w*t.length+2)*this.#i,($e.h+2)*this.#s),this.#o.texture&&this.#o.texture.destroy(!0),this.#o.texture=Vt(this.#e,this.#r),this.#o.x=-this.#o.texture.frame.width/2,this.#r.visible=!1,this.#t=t)}#l(e){const t=Bs(e),n=this.#n.children.length,r=t!==n;try{const s=Be().textures;let i=0;for(const a of e){const l=pd(a);let c;i<n?(c=this.#n.getChildAt(i),c.texture=s[l]):(c=new te(s[l]),this.#n.addChild(c)),i++}}catch(s){throw console.error("invalid string is",e,"and on window as window.invalid"),console.error(s),window.invalid=e,new Error(`could not show text "${e}" in container because: "${s.message}"`,{cause:s})}if(r){t<n&&this.#n.removeChildren(t);for(let s=0;s<t;s++){const i=this.#n.getChildAt(s);i.x=s*$e.w}}}destroy(e){this.#o.destroy({texture:!0,textureSource:!0}),super.destroy(e)}get characterSpriteContainer(){return this.#n}}function md(o){return{all:o=o||new Map,on:function(e,t){var n=o.get(e);n?n.push(t):o.set(e,[t])},off:function(e,t){var n=o.get(e);n&&(t?n.splice(n.indexOf(t)>>>0,1):o.set(e,[]))},emit:function(e,t){var n=o.get(e);n&&n.slice().map(function(r){r(t)}),(n=o.get("*"))&&n.slice().map(function(r){r(e,t)})}}}class Jo{constructor(e=2e3){this.reportIntervalMs=e}static instance=new Jo;#e={physics:{totalMs:0,count:0},hudUpdate:{totalMs:0,count:0},updateSceneGraph:{totalMs:0,count:0},pixiRender:{totalMs:0,count:0}};#t={};#o=performance.now();#n={frameCount:0,elapsedMs:0,fps:0,theoreticalFps:0,phases:{physics:{avgMs:0,percentage:0},hudUpdateSceneGraph:{avgMs:0,percentage:0},updateSceneGraph:{avgMs:0,percentage:0},pixiRender:{avgMs:0,percentage:0},total:{avgMs:0,percentage:0}}};#r=md();startPhysics(){this.#t.physicsStart=performance.now()}endPhysics(){if(this.#t.physicsStart===void 0){console.warn("endPhysics called without startPhysics");return}const e=performance.now()-this.#t.physicsStart;this.#e.physics.totalMs+=e,this.#e.physics.count++,this.#t.physicsStart=void 0}startHudUpdate(){this.#t.hudUpdateStart=performance.now()}endHudUpdate(){if(this.#t.hudUpdateStart===void 0){console.warn("endHudUpdate called without startHudUpdate");return}const e=performance.now()-this.#t.hudUpdateStart;this.#e.hudUpdate.totalMs+=e,this.#e.hudUpdate.count++,this.#t.hudUpdateStart=void 0}startUpdateSceneGraph(){this.#t.updateSceneGraphStart=performance.now()}endUpdateSceneGraph(){if(this.#t.updateSceneGraphStart===void 0){console.warn("endUpdateSceneGraph called without startUpdateSceneGraph");return}const e=performance.now()-this.#t.updateSceneGraphStart;this.#e.updateSceneGraph.totalMs+=e,this.#e.updateSceneGraph.count++,this.#t.updateSceneGraphStart=void 0}startPixiRender(){this.#t.pixiRenderStart=performance.now()}endPixiRender(){if(this.#t.pixiRenderStart===void 0){console.warn("endPixiRender called without startPixiRender");return}const e=performance.now()-this.#t.pixiRenderStart;this.#e.pixiRender.totalMs+=e,this.#e.pixiRender.count++,this.#t.pixiRenderStart=void 0}tickDone(){const e=performance.now();e-this.#o>=this.reportIntervalMs&&this.#s(e)}on(e){this.#r.on("stats",e)}off(e){this.#r.off("stats",e)}#s(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e;t.count===0&&n.count===0&&r.count===0&&s.count===0||(this.#i(e),this.#r.emit("stats",this.#n),this.reset(e))}#i(e){const{physics:t,hudUpdate:n,updateSceneGraph:r,pixiRender:s}=this.#e,i=t.count>0?t.totalMs/t.count:0,a=n.count>0?n.totalMs/n.count:0,l=r.count>0?r.totalMs/r.count:0,c=s.count>0?s.totalMs/s.count:0,u=i+a+l+c,d=Math.max(t.count,n.count,r.count,s.count),h=e-this.#o;this.#n.frameCount=d,this.#n.elapsedMs=h,this.#n.fps=d/h*1e3,this.#n.theoreticalFps=u>0?1e3/u:0,this.#n.phases.physics.avgMs=i,this.#n.phases.physics.percentage=i/u*100,this.#n.phases.hudUpdateSceneGraph.avgMs=a,this.#n.phases.hudUpdateSceneGraph.percentage=a/u*100,this.#n.phases.updateSceneGraph.avgMs=l,this.#n.phases.updateSceneGraph.percentage=l/u*100,this.#n.phases.pixiRender.avgMs=c,this.#n.phases.pixiRender.percentage=c/u*100,this.#n.phases.total.avgMs=u,this.#n.phases.total.percentage=100}reset(e=performance.now()){this.#e.physics.totalMs=0,this.#e.physics.count=0,this.#e.hudUpdate.totalMs=0,this.#e.hudUpdate.count=0,this.#e.updateSceneGraph.totalMs=0,this.#e.updateSceneGraph.count=0,this.#e.pixiRender.totalMs=0,this.#e.pixiRender.count=0,this.#o=e}}const $t=Jo.instance;Os({predicate(o,e,t){return He(e)!==He(t)},effect(o){$t.reset()}});class Rr{constructor(e){this.renderContext=e,this.#t=new N({pixiRenderer:e.general.pixiRenderer,label:"fps",outline:!0,y:$e.h,text:"..."}),this.#e.addChild(this.#t),$t.on(this.tick)}#e=new C({label:"FpsRenderer"});#t;#o=!1;#n;set isDark(e){this.#o!==e&&(this.#o=e,this.#s())}#r(e,t){const n=e/t;return n>1.95?"white":n>1.67?"highlightBeige":n>.97?"moss":n>.92?"pastelBlue":n>.83?"metallicBlue":n>.67?"pink":"midRed"}#s(){const e=this.#n;this.#t.text=e===void 0?"...":`${Math.round(e)} FPS`;const t=e===void 0?"white":this.#r(e,60),n=Qs(this.#o);this.#t.tint=n[t]}tick=e=>{this.#n=e.fps,this.#s()};get output(){return this.#e}destroy(){$t.off(this.tick),this.#e.destroy()}}const Gn={colourised:{jump:"pastelBlue",fire:"highlightBeige",carry:"moss",carryAndJump:"midRed",menu:"lightGrey",map:"lightGrey"},zx:{jump:"blue",fire:"yellow",carry:"green",carryAndJump:"red",menu:"white",map:"white"}};class _n extends C{constructor(e,t,n,r){super({label:`arcadeButton (${t})`}),this.colourised=e,this.which=t,this.pixiRenderer=n,this.#t=new C({label:"depress"}),this.addChild(this.#t),this.#n=new te({anchor:{x:.5,y:1}}),this.#r=new te({anchor:{x:.5,y:1}}),this.#r.visible=!1,this.#t.addChild(this.#n),this.#t.addChild(this.#r),this.#e=new C({label:"surface"});const s=v({textureId:"button.surfaceMask",label:"surfaceMask",spritesheetVariant:"original"});this.#t.addChild(s),this.#e.mask=s,this.#t.addChild(this.#e),this.shownOnSurface=r}#e;#t;#o;#n;#r;get shownOnSurface(){return this.#o}set shownOnSurface(e){this.#o!==void 0&&this.#o.destroy({children:!0}),this.#o=e,e!==void 0&&this.#e.addChild(e)}set pressed(e){this.#n.visible=!e,this.#r.visible=e,this.#t.y=e?1:0}generateButtonSpriteTextures(e){const{which:t,colourised:n}=this,r=v({textureId:"button",spritesheetVariant:"original"}),s=n?io(Gn.colourised[t],e.color.shade==="dimmed"):se(Gn.zx[t]),i=n?Pe(s,.66):se(Gn.zx[t],"dimmed"),a=n?io("pureBlack",e.color.shade==="dimmed"):se("black"),l=new xt({lutType:"sparse",paletteSwaps:{replaceLight:s,replaceDark:i,pureBlack:a}});r.filters=l;const c=Vt(this.pixiRenderer,r,this.#n.texture===j.EMPTY?void 0:this.#n.texture);r.texture=Be().textures["button.pressed"];const u=Vt(this.pixiRenderer,r,this.#r.texture===j.EMPTY?void 0:this.#r.texture);this.#n.texture=c,this.#r.texture=u,l.destroy({destroyLutTexture:!0}),r.destroy({children:!0})}}const xo=o=>{if(o instanceof te){const{texture:e}=o;e instanceof Ke&&e.destroy(!0)}for(const e of o.children)xo(e)};class Xi{constructor(e,t){this.renderContext=e,this.appearance=t}#e;output=new C({label:"AppearanceRenderer"});destroy(){this.#e?.output&&xo(this.#e.output),this.output.destroy({children:!0})}tick(e){const t=this.appearance({renderContext:this.renderContext,currentRendering:this.#e,tickContext:e});t!=="no-update"&&(this.output.children.at(0)!==t.output&&(this.#e?.output&&(this.output.removeChild(this.#e.output),xo(this.#e.output),this.#e.output.destroy({texture:!1,children:!0})),t.output!==void 0&&this.output.addChild(t.output)),this.#e=t)}}const Ko=-11;class st extends Xi{constructor(e,t){super(e,t)}}const Pn=(o,e)=>o.every(t=>e.currentActionPress(t,!0)!=="released"),gd=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=r?.renderProps,l=r?.output,u=(s&&_o(s))?.hasBag??!1,d=Pn(o.actions,e),h=a===void 0||d!==a.pressed||t!==a.colourised||u!==a.hasBag,p=i!==a?.renderedInRoom;if(!h&&!p)return"no-update";const f=l===void 0?new _n(t,o.which,n,new N({pixiRenderer:n,text:"C+J",y:Ko})):l;return p&&(f.generateButtonSpriteTextures(i),f.shownOnSurface.tint=Wo(t,i?.color.shade==="dimmed")),u?(f.visible=!0,a?.pressed!==d&&(f.pressed=d)):f.visible=!1,{output:f,renderProps:{pressed:d,hasBag:u,colourised:t,renderedInRoom:i}}},Yi=350,xd=(o,e,t,n)=>{const r=o.type==="heels"?o.state:o.state.heels,{carrying:s}=r;if(s===null)return;const{inputStateTracker:i}=t;if(!(i.currentActionPress("carry")!=="released")||o.state.standingOnItemId===null||!qi(o,e[Ht]))return;const{state:{position:c}}=o;Nt({room:e,item:s,atPosition:c}),to(o,e),r.carrying=null,no({subjectItem:o,gameState:t,room:e,posDelta:{x:0,y:0,z:s.aabb.z},forceful:!0,deltaMS:n,onTouch:oo,visited:new Set().add(o.id)}),Fs({above:o,below:s}),i.inputWasHandled("carry",Yi)},qi=(o,e)=>{const t={state:{position:fe(o.state.position,{z:z.z})},aabb:o.aabb,id:"item.id-proposedPutdownLocation"},n=Po(t,e,r=>Mo(r,o)&&r!==o);for(const r of n){if(!yt(r))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with non-free",r),!1;if(!qi(r,e))return console.log("carrying: cannot put down due to collision: item:",o,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},bd=(o,e,t)=>{const{inputStateTracker:n}=t,r=o.type==="heels"?o.state:o.state.heels,{carrying:s,hasBag:i}=r;if(!i)return;const a=ce(e.items).filter(Ro),l=s===null?Zi(o,e):void 0;for(const d of a)d.state.wouldPickUpNext=!1;l!==void 0&&(l.state.wouldPickUpNext=!0),n.currentActionPress("carry")!=="released"&&l!==void 0&&(yd(e,r,l),n.inputWasHandled("carry",Yi))},yd=(o,e,t)=>{e.carrying=t,t.state.wouldPickUpNext=!1,Us({room:o,item:t})},Zi=(o,e)=>{const t=Ls(o),n=l=>Ro(l)&&(t||!zs(l)),r=ce(e.items).filter(n),s=Es(o,r);if(s)return s;const i=Ha(e,o.state),a=i&&e.items[i];if(a&&n(a))return a},vd=(o,e,t,n)=>e==="tower"?n==="moonbase"?"tower.moonbase":"tower":e==="book"?"book.x":e==="organic"&&o?`block.organic.dark${t?".disappearing":""}`:`block.${e}${t?".disappearing":""}`,wd=({renderContext:{general:{pixiRenderer:o,colourised:e},item:{config:{style:t,times:n},state:{disappearing:r}},room:s},currentRendering:i})=>{const a=i?.renderProps,l=r!==null;return a===void 0||a.isDissapearing!==l?{output:It(o,v({textureId:vd(s.color.shade==="dimmed",t,l,s.planet),times:n,spritesheetVariant:e?"for-current-room":"uncolourised"})),renderProps:{isDissapearing:l}}:"no-update"},Sd=({renderContext:{item:{state:{pressed:o}},general:{colourised:e}},currentRendering:t})=>{const n=t?.renderProps;return n===void 0||o!==n.pressed?{output:v({textureId:o?"buttonInGame.pressed":"buttonInGame",spritesheetVariant:e?"for-current-room":"uncolourised"}),renderProps:{pressed:o}}:"no-update"},mt=({top:o,bottom:e})=>{const t=new C,n=v(e);t.addChild(n);const r=v(o);return r.y=-12,t.addChild(r),t[Mn]=r,t[Qo]=n,t},Mn=Symbol(),Qo=Symbol(),Cd=({top:o,bottom:e})=>{const t=new C;return t.addChild(e),o.y=-z.z,t.addChild(o),t[Mn]=o,t[Qo]=e,t},Td=({renderContext:{item:{state:{facing:o,actedOnAt:{roomTime:e,by:t},activated:n=!0}},room:{roomTime:r,items:s},general:{colourised:i}},currentRendering:a})=>{const l=a?.renderProps,c=vn(o)??"towards",u=r===e&&tt(Bo(t)).some(p=>Ds(s[p]));if(!(l===void 0||c!==l.facingXy4||u!==l.controlledByJoystick||n!==l.activated))return"no-update";const h=i?n?"for-current-room":"deactivated":"uncolourised";return{output:mt({top:{textureId:`charles.${c}`,spritesheetVariant:h},bottom:{textureId:u?"headlessBase.all":"headlessBase",spritesheetVariant:h}}),renderProps:{facingXy4:c,controlledByJoystick:u,activated:n}}},Zt=o=>{for(const e in o)return!0;return!1},Jt=o=>o,Br=250,kd=Je.animations["conveyor.x"].animationSpeed,Ar=Je.animations["conveyor.x"].length,Id=o=>1-(1-o)**2,_d=3,Pd=(o,e)=>{for(let t=0;t<o.children.length;t++){const n=o.children[t],r=t*_d%Ar;n.gotoAndStop(e?Ar-r-1:r)}},Md=(o,e,t)=>{const n=vt(o),r=v({animationId:`conveyor.${n}`,reverse:o==="towards"||o==="right",times:e,spritesheetVariant:t}),s=r instanceof be?new C({children:[r]}):r;return Pd(s,o==="towards"||o==="right"),s},Rd=({renderContext:{item:{config:{times:o},state:{stoodOnBy:e,direction:t}},room:{roomTime:n},general:{colourised:r,pixiRenderer:s}},currentRendering:i})=>{const a=i?.renderProps,l=Zt(e),c=!l&&(a?.moving??!1),u=c?n:a?.roomTimeStoppedMoving??Dt,d=l?0:Math.min(n-u,Br),h=i?.output,p=!h||t!==a?.direction,m=p?Zo(s,Md(t,o,r?"for-current-room":"uncolourised"),"conveyor.x"):h,x=Math.max(0,1-d/Br);if(x===0)m.stop();else{const g=kd*Id(x);m.play(),m.animationSpeed=g}return p||c||l!==a?.moving?{output:m,renderProps:{moving:l,roomTimeStoppedMoving:u,direction:t}}:"no-update"},Bd=Jt(Rd),rn=(o,e,t=!1)=>{if(t){const r=`${o}.dark.${e}`;if(Gt(r))return r}const n=`${o}.${e}`;return Gt(n)?n:`generic.${e}`};function Ji(o,e){const t=e||new C;for(const n of o)t.addChild(n);return t}const Rn=(o,e)=>{const t=e&&{x:e.x??1,y:e.y??1};return v({...o,times:t})},it=o=>Q(({renderContext:{item:e,general:{colourised:t}}})=>Ao(e)?v({...typeof o=="string"?{textureId:o}:o,times:wn(e),spritesheetVariant:t?"for-current-room":"uncolourised"}):v({...typeof o=="string"?{textureId:o}:o,spritesheetVariant:t?"for-current-room":"uncolourised"})),Ad=o=>Q(({renderContext:{item:e,general:{paused:t,colourised:n}}})=>Ao(e)?v({...o,times:wn(e),paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"}):v({...o,paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"})),ae=o=>Q(({renderContext:{item:e,general:{pixiRenderer:t}}})=>{if(Ao(e))return It(t,Rn(o,wn(e)));{const n=v(o);return n instanceof te?n:xe(t,n)}}),Q=o=>(({renderContext:e,currentRendering:t,tickContext:n})=>t===void 0?{output:o({renderContext:e,currentRendering:void 0,tickContext:n}),renderProps:de}:"no-update"),_e=o=>(({renderContext:{general:{pixiRenderer:e},item:t},currentRendering:n})=>{if(n===void 0){const r=wn(t),s={output:It(e,Rn(o(t.config),r)),renderProps:de};return r&&(s.output.y-=((r.z??1)-1)*z.z),s}else return"no-update"}),Od=(o,e,t)=>{const r=Be().textures[`door.frame.${o.planet}.${e}.near`]!==void 0?o.planet:"generic",s=o.color.shade==="dimmed"&&Be().textures[`door.frame.${r}.dark.${e}.${t}`]!==void 0;return`door.frame.${r}${s?".dark":""}.${e}.${t}`};function*Fd({config:{direction:o,inHiddenWall:e,height:t}},n,r,s){const i=Oo(o);if(e){if(t!==0)for(const a of[1,0])yield v({textureId:rn(r,`door.floatingThreshold.${i}`,s),...Wt(Qe({[i]:a}),{y:-z.z*t}),spritesheetVariant:n})}else{yield v({textureId:rn(r,`door.legs.base.${i}`,s),spritesheetVariant:n});const a=rn(r,`door.legs.pillar.${i}`,s);for(let l=1;l<t;l++)yield v({textureId:a,y:-l*z.z,spritesheetVariant:n})}e||(yield v({textureId:rn(r,`door.legs.threshold.${i}`,s),...Qe({...jt,z:t}),spritesheetVariant:n}))}const Ki=(o,e)=>{const t=Oo(o),n=Sn(t),r=8;return o==="towards"||o==="right"?O({[n]:e[n]-r}):jt},Ld=Q(({renderContext:{item:o,general:{pixiRenderer:e,colourised:t},room:{planet:n,color:{shade:r}}}})=>{const i=Ji(Fd(o,t?"for-current-room":"uncolourised",n,r==="dimmed")),a=xe(e,i),l=Ki(o.config.direction,o.aabb);return a.x=l.x,a.y=l.y,a}),Ed=Q(({renderContext:{item:{config:{direction:o,part:e,toRoom:t},aabb:n},room:r,general:{pixiRenderer:s,colourised:i}}})=>{const a=Na(B.getState())??B.getState().levelEditor?.campaignInProgress,l=Oo(o),c=a?.rooms[t]??r,u=new xt({paletteSwaps:K(c.color.hue,r.color.shade==="dimmed",r.planet==="moonbase"?"light-mid":"light-dark"),lutType:"sparse"}),{x:d,y:h}=Ki(o,n),p=v({textureId:Od(r,l,e),x:d,y:h,spritesheetVariant:i?"for-current-room":"uncolourised"});p.filters=u;const f=new C({children:[p]}),m=xe(s,f);return f.destroy({children:!0}),u.destroy({destroyLutTexture:!0,destroyMask:!0}),e==="top"&&(m.y=.5),m}),zd=Fo.floatingText,Or=12,Fr=z.z*3,Lr=[S.shadow,S.redShadow,S.midGrey,S.metallicBlue,S.midRed,S.moss,S.pink,S.lightBeige,S.pastelBlue,S.lightGrey,S.highlightBeige],Er=[...Lr,...new Array(20).fill(S.white),...Lr.toReversed()],Ud=({renderContext:{item:{config:{textLines:o,appearanceRoomTime:e}},room:{roomTime:t},general:{displaySettings:{uncolourised:n},pixiRenderer:r},frontLayer:s},currentRendering:i})=>{const a=i?.output;let l;const u=(t-e)*zd;if(a===void 0){l=new C,s?.attach(l);for(let h=0;h<o.length;h++){const p=o[h],f=new N({pixiRenderer:r,y:h*Or,outline:!0,text:p.toUpperCase()});l.addChild(f)}}else l=a;let d=!1;for(let h=0;h<o.length;h++){const p=l.children[h],f=u+h*-Or,m=f>0&&f<Fr;if(p.visible=m,d||=m,m&&!n){const x=Math.floor(f/Fr*Er.length);p.tint=Er[x]}}return l.visible=d,l.y=-u,{output:l,renderProps:de}},zr=(o,e)=>e===0?o:Math.round(o/e)*e,Ur=o=>o-Math.floor(o),Dd=(o,e,t,n)=>o<=n&&t<=e;var Gd=`#version 300 es
precision lowp float;out vec4 finalColor;in vec2 vTextureCoord;uniform sampler2D uBackTexture;uniform sampler2D uTexture;uniform vec4 uTintColour;vec4 transparent=vec4(0.0,0.0,0.0,0.0);vec4 black=vec4(0.0,0.0,0.0,1.0);void main(){vec4 fg=texture(uTexture,vTextureCoord);vec3 bg=texture(uBackTexture,vTextureCoord).rgb;float fgIsTransparent=step(fg.a,0.001f);float bgIsBlack=step(length(bg),0.001f);finalColor=mix(mix(uTintColour,black,bgIsBlack),transparent,fgIsTransparent);}`;const Wd=Z.from({vertex:Le,fragment:Gd,name:"colour-clash-filter"});class Dr extends q{constructor(e){super({glProgram:Wd,resources:{uBackTexture:j.EMPTY,colourClashUniforms:{uTintColour:{value:e,type:"vec4<f32>"}}},blendRequired:!0})}}const Vd=({state:{position:o}},e,t)=>{const n=s=>s.config.direction==="away"||s.config.direction==="left";return Ji(ce(e.items).filter(s=>s.type==="wall"||s.type==="doorLegs").filter(n).map(s=>{const{id:i,config:{direction:a},state:{position:l}}=s;return v({textureId:"floorOverdraw.cornerNearWall",label:i,...O(Lo(l,o)),times:s.type==="wall"?ja(s.config):{[Sn(vt(a))]:2},anchor:{x:0,y:1},flipX:a==="away",spritesheetVariant:t?"for-current-room":"uncolourised"})}),new C({label:"floorOverdraws"}))},$d=(o,e)=>{const{config:{naturalFootprint:{aabb:t,position:n}},state:{position:r}}=e,s=dn(Ae(he,r)),{left:i,right:a}=ce(o.items).filter(Ya).filter(l=>{const{state:{position:c},aabb:u}=l,d=l.config.direction,h=vt(d),p=Sn(h),f=d==="away"||d==="left",m=n[h]+(f?1:0)*t[h],x=c[h]+(f?0:1)*u[h];return m!==x?!1:Dd(c[p],c[p]+u[p],n[p],n[p]+t[p])}).reduce((l,{aabb:c,renderAabb:u,renderAabbOffset:d,state:{position:h},fixedZIndex:p})=>{const f=p===qa,m=f?c:u??c,x=fe(h,d??he),g=dn(fe(x,{x:m.x,y:f?m.y:0}))+s,_=dn(fe(x,{x:f?m.x:0,y:m.y}))+s;return{left:Math.min(l.left,g),right:Math.max(l.right,_)}},{left:9999,right:-9999});if(a>i)return new ue().rect(i,-500,a-i,500).fill("rgba(255, 0, 0)")},Gr=({direction:o,times:e,position:t,colourised:n})=>v({label:`floorEdge(${o})`,textureId:`floorEdge.${o}`,times:e,...O(t),spritesheetVariant:n?"for-current-room":"uncolourised"}),Hd=({room:o,xSize:e,ySize:t,y:n})=>{const r=new C({label:"floorColourClash"}),s=_r(o,"right"),i=new C({label:"floorColourClash.right",filters:[new Dr(s)]});for(let c=0;c<=t;c++){const u=Qe({x:0,y:c,z:0}),d=new ue().rect(u.x-(c===0?0:8),u.y,24,8).fill(s);i.addChild(d)}r.addChild(i);const a=_r(o,"towards"),l=new C({label:"floorColourClash.towards",filters:[new Dr(a)]});for(let c=0;c<=e;c++){const u=Qe({x:c,y:0,z:0}),d=new ue().rect(u.x-16,u.y,8*(c===0?2:3),8).fill(a);l.addChild(d)}return r.addChild(l),r.y=n,r},Nd=Q(({renderContext:{room:o,item:e,general:{colourised:t,pixiRenderer:n},colourClashLayer:r,frontLayer:s}})=>{const{color:{shade:i}}=o,{config:a,state:{position:l},aabb:c}=e,{floorType:u,naturalFootprint:d}=a,h=new C({label:"floorAppearance"}),p=new C({label:"sprites"}),f=O({...c,y:0}),m=O({...c,x:0,y:0}),x=O({...c,x:0}),g=O(c),_=new Fe({color:t?mn("pureBlack"):Xa.black,width:1});if(u!=="none"){const T=new C({label:"tiles"}),y=u==="deadly"?`generic${i==="dimmed"?".dark":""}.floor.deadly`:`${a.scenery}${i==="dimmed"?".dark":""}.floor`,b=Te(t?"for-current-room":"uncolourised").textures[y];try{As(y)}catch($){throw new Error(`no floor textureId for floorType: ${u}, shade: ${i}`,{cause:$})}const w=Ae(d.position,l),k={x:Ur(w.x/z.x),y:Ur(w.y/z.x)},I=8,F={x:f.x,y:g.y-I,width:x.x-f.x,height:m.y-g.y+2*I},L=Ae(Qe(Wt(k,{x:.5,y:.5})),{y:c.z},F),R=new Qc({texture:b,tilePosition:L,...F});T.addChild(R),T.addChild(Vd(e,o,t));const D=new ue().moveTo(g.x,g.y).lineTo(x.x,x.y).lineTo(x.x,x.y+3).lineTo(m.x,m.y+3).lineTo(f.x,f.y+3).lineTo(f.x,f.y).fill({color:16711680,alpha:1}),G=xe(n,D);D.destroy(),T.addChild(G),T.mask=G;const U=new C({children:[T]});U.filters=_,p.addChild(U)}{const T=new C({label:"edges"});if(u==="none"){const k=new ue().moveTo(x.x,x.y+10).lineTo(x.x,x.y+100).lineTo(f.x,f.y+100).lineTo(f.x,f.y+10).lineTo(m.x,m.y+10).fill(0),I=xe(n,k);h.addChild(I),s.attach(I),k.destroy()}const y=Math.ceil(c.y/z.x);T.addChild(Gr({direction:"right",times:{y},position:{z:c.z},colourised:t}));const b=Math.ceil(c.x/z.x);T.addChild(Gr({direction:"towards",times:{x:b},position:{z:c.z},colourised:t})),p.addChild(T);const w=$d(o,e);if(w!==void 0){const k=xe(n,w);p.addChild(k),p.mask=k,w.destroy()}if(h.addChild(xe(n,p)),p.destroy({children:!0}),_.destroy(!1),!t){const k=Hd({xSize:b,ySize:y,y:-c.z+1,room:o});h.addChild(k),r.attach(k)}}return h}),jd=o=>{const e=new C({label:"joystick"});return e.addChild(v({textureId:"joystick.stick",spritesheetVariant:o})),e.addChild(v({textureId:"joystick.ball",spritesheetVariant:o})),e},Xd=new Map([["towards",{x:-1,y:1}],["right",{x:1,y:1}],["left",{x:-1,y:0}],["away",{x:1,y:0}],[void 0,jt]]),Yd=({renderContext:{item:{state:{actedOnAt:o,lastPushDirection:e}},room:{roomTime:t},general:{colourised:n}},currentRendering:r})=>{const s=r?.renderProps,i=t===o.roomTime?e:void 0,a=s?.pushDirection;if(!(s===void 0||i!==a))return"no-update";const c=r?.output??jd(n?"for-current-room":"uncolourised"),u=c.getChildAt(1),d=Xd.get(i);return u.x=d?.x??0,u.y=d?.y??0,{output:c,renderProps:{pushDirection:i}}},qd=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle","homingBot"],Wr=(o,e,t,n)=>{const r=Rs(n);return Math.sin((o+r*2e4)/e)*t},Zd=50,Jd=200,Kd=.25,Qd=1,Ge=({id:o,config:{which:e},state:t},n,r)=>{const s=e==="emperorsGuardian"||e==="helicopterBug",i=e==="cyberman"||e==="bubbleRobot"||e==="computerBot"||e==="emperorsGuardian";if((i||e==="helicopterBug")&&t.activated||s){const l=e==="computerBot"||e==="helicopterBug",c=l?Zd:Jd,u=l?Kd:Qd;if(i){const d=r;d[Mn].y=-z.z+Wr(n.roomTime,c,u,o)}else r.y=Wr(n.roomTime,c,u,o)}return r},eh=({renderContext:{item:o,room:e,general:{paused:t,colourised:n}},currentRendering:r})=>{const{config:s,state:i,id:a}=o,l=r?.renderProps,{activated:c,busyLickingDoughnutsOffFace:u}=i,d=n?u?"doughnutted":!c&&qd.includes(s.which)?"deactivated":"for-current-room":"uncolourised";switch(s.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const h=vn(i.facing)??"towards";if(!(l===void 0||c!==l.activated||u!==l.busyLickingDoughnutsOffFace||h!==l.facingXy4))return Ge(o,e,r.output),"no-update";const f={facingXy4:h,activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"skiHead":return{output:v({textureId:`${s.which}.${s.style}.${h}`,spritesheetVariant:d}),renderProps:f};case"elephantHead":return{output:v({textureId:`elephant.${h}`,spritesheetVariant:d}),renderProps:f};case"turtle":return{output:v(c&&!u?{animationId:`${s.which}.${h}`,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.${h}.1`,spritesheetVariant:d}),renderProps:f};case"cyberman":return{output:i.activated||i.busyLickingDoughnutsOffFace?Ge(o,e,mt({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"bubbles.jetpack",paused:t,spritesheetVariant:d}})):v({textureId:`${s.which}.${h}`,spritesheetVariant:d}),renderProps:f};case"computerBot":case"elephant":case"monkey":return{output:Ge(o,e,mt({top:{textureId:`${s.which}.${h}`,spritesheetVariant:d},bottom:{animationId:"headlessBase.flash",playOnce:"and-stop",spritesheetVariant:d}})),renderProps:f};default:throw new Error(`unexpected monster ${s}`)}break}case"homingBot":{const h=!Za(i.vels.walking,jt);return l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated||h!==l.walking?{spritesheetVariant:d,output:v(c&&!u?{animationId:h?"headlessBase.flash":"headlessBase.scan",spritesheetVariant:d}:{textureId:"headlessBase",spritesheetVariant:d}),renderProps:{activated:c,busyLickingDoughnutsOffFace:u,walking:h}}:"no-update"}case"helicopterBug":case"emperor":case"dalek":case"bubbleRobot":case"emperorsGuardian":{if(!(l===void 0||u!==l.busyLickingDoughnutsOffFace||c!==l.activated))return Ge(o,e,r.output),"no-update";const p={activated:c,busyLickingDoughnutsOffFace:u};switch(s.which){case"helicopterBug":case"dalek":return{output:Ge(o,e,v(c&&!u?{animationId:s.which==="dalek"&&e.color.shade==="dimmed"&&(e.planet==="blacktooth"||e.planet==="egyptus"||e.planet==="moonbase")?"dalek.dark":s.which,spritesheetVariant:d,paused:t,randomiseStartFrame:a}:{textureId:`${s.which}.1`,spritesheetVariant:d})),renderProps:p};case"bubbleRobot":return{output:Ge(o,e,mt({top:{animationId:"bubbles.blueGreen",randomiseStartFrame:a,paused:t,spritesheetVariant:d},bottom:{textureId:"headlessBase",spritesheetVariant:d}})),renderProps:p};case"emperorsGuardian":return{output:Ge(o,e,mt({top:{textureId:"ball.blueGreen",spritesheetVariant:d},bottom:{animationId:"bubbles.cold",spritesheetVariant:d,paused:t}})),renderProps:p};case"emperor":return{output:v({animationId:"bubbles.cold",spritesheetVariant:d,paused:t}),renderProps:p};default:throw new Error(`unexpected monster ${s}`)}break}default:throw new Error(`unexpected monster ${s}`)}};var th=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uColour;void main(void){vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(c,vec4(uColour,1),c.a);}`;const nh=Z.from({vertex:Le,fragment:th,name:"oneColour-filter"});class bo extends q{constructor(e){super({glProgram:nh,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const t=this.resources.colorReplaceUniforms.uniforms,[n,r,s]=e.toArray();t.uColour[0]=n,t.uColour[1]=r,t.uColour[2]=s}}const yo=.02,oh=({name:o,action:e,facingXy8:t,teleportingPhase:n,gravityZ:r,paused:s,spritesheetVariant:i,isStoodOn:a})=>{if(e==="death")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(n==="out")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(n==="in")return{animationId:`${o}.fadeOut`,paused:s,spritesheetVariant:i};if(e==="moving")return{animationId:`${o}.walking.${t}`,paused:s,spritesheetVariant:i};if(e==="jumping")return{textureId:r<yo?`${o}.walking.${t}.2`:`${o}.walking.${t}.1`,spritesheetVariant:i};if(e==="falling"){const c=`${o}.falling.${t}`;if(Gt(c))return{textureId:c,spritesheetVariant:i}}if(o==="head"&&a){const c=`${o}.blinking.${t}`;if(Gt(c))return{textureId:c,spritesheetVariant:i}}const l=`${o}.idle.${t}`;return Eo(l)?{animationId:l,paused:s,spritesheetVariant:i}:{textureId:`${o}.walking.${t}.2`,spritesheetVariant:i}},vo=Symbol(),Qi=Symbol(),rh=(o,e)=>{o[vo].removeChildren(),o[vo].addChild(v(oh(e)))},Wn=(o,e,t,n,r)=>{const s=new C,i=new C;s[vo]=i,s.addChild(i);const a=v({animationId:e?`shine.${o}InSymbio`:`shine.${o}`,paused:t,flipX:o==="heels",spritesheetVariant:n?"for-current-room":"uncolourised"});s.addChild(a),s[Qi]=a,s.filters=[new Fe({color:r?se(r):mn(uo[o])}),new Fe({color:r?se(r):mn("midRed")}),new bo(r?se(r):mn(uo[o]))];for(const l of s.filters)l.enabled=!1;return s},Vr=({gameTime:o,switchedToAt:e},t,n)=>(t==="headOverHeels"||t===n)&&e+Qa>o,sh=o=>{if(!el(o))return!1;const{gameTime:e,lastDiedAt:t}=o.type==="headOverHeels"?o.state.head:o.state;return(e-t)%sr<sr*tl},ih=({highlighted:o,flashing:e,shining:t},n)=>{const[r,s,i]=n.filters;r.enabled=o,s.enabled=!o&&t,i.enabled=e},ah=(o,e)=>{o[Qi].visible=e},Vn=(o,e,t,n,r,s)=>{t&&rh(e,{name:o,...n,paused:r,spritesheetVariant:s}),ih(n,e),ah(e,n.shining)},lh=({renderContext:{item:o,general:{gameState:e,paused:t,colourised:n},room:r},currentRendering:s})=>{const{type:i,state:{action:a,facing:l,visualFacingVector:c,teleporting:u,vels:{gravity:{z:d}}}}=o,h=s?.renderProps,p=s?.output,f=Cn(c??l)??"towards",m=e!==void 0&&(o.type==="headOverHeels"?Vr(o.state.head,"headOverHeels","headOverHeels"):Vr(o.state,o.type,e.currentCharacterName)),x=sh(o),g=Ls(o),_=yn(l),T=u?.phase??null,y=i!=="heels"&&(!Ja(o.state.stoodOnBy)||o.state.stoodOnUntilRoomTime+300>r.roomTime),b={action:a,facingXy8:f,teleportingPhase:T,flashing:x,highlighted:m,shining:g,gravityZ:d,isStoodOn:y},w=h===void 0||h.action!==a||h.facingXy8!==f||h.teleportingPhase!==T||h?.gravityZ>yo!=d>yo||h.isStoodOn!==y;let k;const I=n?"for-current-room":"uncolourised",F=n?void 0:r.color;if(i==="headOverHeels"){k=p??Cd({top:Wn("head",!0,t,n,F),bottom:Wn("heels",!0,t,n,F)});const L=k;Vn("head",L[Mn],w,b,t,I),Vn("heels",L[Qo],w,b,t,I)}else k=p??Wn(i,!1,t,n,F),Vn(i,k,w,b,t,I);return a==="moving"&&p instanceof be&&(p.animationSpeed=_*Ka),{output:k,renderProps:b}},$n=Jt(lh),Hn=(o,e,t,n,r)=>{const s=`${o}.idle.${e}`,i=r?"sceneryPlayer":"uncolourised";return Eo(s)?{animationId:s,randomiseStartFrame:t,paused:n,spritesheetVariant:i}:{textureId:`${o}.walking.${e}.2`,spritesheetVariant:i}},ch=({renderContext:{item:{id:o,config:{which:e,startDirection:t}},general:{paused:n,colourised:r}},currentRendering:s})=>s?.renderProps===void 0?{output:e==="headOverHeels"?mt({top:Hn("head",t,o,n,r),bottom:Hn("heels",t,o,n,r)}):v(Hn(e,t,o,n,r)),renderProps:de}:"no-update",uh=({renderContext:{item:{state:{vels:{sliding:o}},config:{startingPhase:e}},general:{paused:t,colourised:n}},tickContext:{deltaMS:r},currentRendering:s})=>{const a=(s?.renderProps?.distanceTravelled??0)+zo(o)*(t?0:r),l=s?.output,c=n?"for-current-room":"uncolourised",u=l??v({textureId:"spikyBall.1",spritesheetVariant:c}),h=(Math.floor(a*2/hn.w)+e)%2+1;return u.texture=Te(c).textures[`spikyBall.${h}`],{output:u,renderProps:{distanceTravelled:a}}},dh=Jt(uh),ea=o=>({renderContext:{item:{state:{stoodOnBy:e,stoodOnUntilRoomTime:t}},general:{paused:n,colourised:r}},tickContext:{lastRenderRoomTime:s},currentRendering:i})=>{const a=i?.renderProps,l=Zt(e);let c;return i?.output?c=i?.output:(c=v({animationId:o?"shadowMask.spring.bounce":"spring.bounce",paused:n,spritesheetVariant:r?"for-current-room":"uncolourised"}),c.loop=!1,c.gotoAndStop(0)),s!==void 0&&t>s&&!l&&!n?c.gotoAndPlay(0):l!==(a?.compressed??!1)&&(l?c.gotoAndStop(1):c.gotoAndStop(0)),{output:c,renderProps:{compressed:l}}},hh=Jt(ea(!1)),ph=Jt(ea(!0)),fh=o=>{const{gameMenus:e}=B.getState();try{return Gs(e,o.path)?"right":"left"}catch(t){throw new Error(`Error getting switch setting from store for switch with path "${o.path}"

while store has: ${JSON.stringify(e,null,2)}`,{cause:t})}},mh=({renderContext:{item:{state:{setting:o},config:e},general:{colourised:t}},currentRendering:n})=>{const r=n?.renderProps,s=e.type==="in-store"?fh(e):o;return r===void 0||s!==r.setting?{output:v({textureId:`switch.${s}`,spritesheetVariant:t?"for-current-room":"uncolourised"}),renderProps:{setting:s}}:"no-update"},$r=({renderContext:{item:o,room:e,general:{paused:t,colourised:n}},currentRendering:r})=>{const{type:s,state:{stoodOnBy:i},config:{times:a}}=o,l=r?.renderProps,c=Tn(o),u=c&&nt(i,e).some(ke);if(!(l===void 0||c!==l.activated||u!==l.flashing))return"no-update";const h=n?"for-current-room":"uncolourised";return{output:v(u?{animationId:`${s}.flashing`,times:a,paused:t,spritesheetVariant:h}:{textureId:c?s:"block.artificial",times:a,spritesheetVariant:h}),renderProps:{flashing:u,activated:c}}},gh=({state:{stoodOnBy:o,position:e},config:{times:t}},n)=>{const r=new Array(t?.x??1).fill(null).map(()=>new Array(t?.y??1));return nt(o,n).filter(Ws).forEach(({id:s,state:{position:i}})=>{const a=Ae(i,e),l={x:Math.floor(a.x/z.x),y:Math.floor(a.y/z.y)};l.x<0||l.x>=(t?.x??1)||l.y<0||l.y>=(t?.y??1)||(r[l.x][l.y]=s)}),r},xh=(o,e)=>{let t=0,n=1;for(const r of e)for(const s of r)s!==void 0&&o.items[s]?.state.activated&&(t|=n),n<<=1;return t},bh=({renderContext:{item:o,room:e,general:{pixiRenderer:t,colourised:n}},currentRendering:r})=>{const{config:{times:s}}=o,i=r===void 0?gh(o,e):r.renderProps.chargePositions,a=xh(e,i);if(!(a!==r?.renderProps.cybermanActivationBitmask))return"no-update";const c=v({subSpriteVariations(d,h){const p=i[d][h];return p===void 0?{animationId:"toaster.off"}:e.items[p]?.state.everActivated?{animationId:"toaster.off"}:{textureId:"toaster.on"}},times:s??de,spritesheetVariant:n?"for-current-room":"uncolourised"});return{output:Zo(t,c,"toaster.off"),renderProps:{chargePositions:i,cybermanActivationBitmask:a}}},yh=(o,e,t,n)=>`${o}${n?".dark":""}.wall.${e}.${t}`,Nn={aabb:{x:1,y:1,z:Vs},id:"farWallAppearanceSampleBuffer",state:{position:{x:0,y:0,z:0}}},vh=Q(({renderContext:{general:{pixiRenderer:o,colourised:e},item:t,room:n}})=>{const{id:r,config:s}=t;if(s.direction==="right"||s.direction==="towards")throw new Error(`wall is near: ${r}`);const{direction:i,tiles:a}=s,l=Sn(vt(i)),c=new C({label:"wallTiles"}),u=new C({label:"wallAnimations"});for(let h=0;h<s.tiles.length;h++){const p=Qe({[l]:h}),f=i==="away"?{x:hn.w,y:hn.h}:{x:0,y:hn.h},m=v({textureId:yh(n.planet,a[h],i,n.color.shade==="dimmed"),...p,pivot:f,spritesheetVariant:e?"for-current-room":"uncolourised"});if(c.addChild(m),n.planet==="moonbase"){const x=`moonbase.wall.screen.${a[h]}.away`;if(Eo(x)&&u.addChild(v({animationId:x,randomiseStartFrame:`${r}${h}`,flipX:i==="left",x:p.x+(i==="away"?-8:8),y:p.y-23,spritesheetVariant:e?"for-current-room":"uncolourised"})),h===s.tiles.length-1&&s.tiles.at(-1)!=="coil"){const g=n[Ht];if(Nn.state.position.x=t.state.position.x+t.aabb.x,Nn.state.position.y=t.state.position.y+t.aabb.y,!Vo(Po(Nn,g,nl))){const T=n.color.shade==="dimmed"?".dark":"";c.addChild(v({textureId:`moonbase.wallDoorTransition.${i}${T}`,...p,pivot:f,spritesheetVariant:e?"for-current-room":"uncolourised"}));const y=v({textureId:`moonbase.wallDoorTransition.${i}.mask`,...p,pivot:f,spritesheetVariant:"original"});c.addChild(y),m.setMask({mask:y,inverse:!0})}}}}const d=new C({label:"wallAppearance"});return d.addChild(xe(o,c)),c.destroy({children:!0}),u.children.length>0&&d.addChild(u),d}),wh={head:$n,heels:$n,headOverHeels:$n,doorFrame:Ed,doorLegs:Ld,monster:eh,floatingText:Ud,barrier:Q(({renderContext:{item:{config:{axis:o,times:e,disappearing:t}},general:{colourised:n,pixiRenderer:r}}})=>It(r,v({textureId:`barrier.${o}${t?".disappearing":""}`,times:e,spritesheetVariant:n?"for-current-room":"uncolourised"}))),deadlyBlock:Q(({renderContext:{item:{config:o,id:e},general:{paused:t,colourised:n,pixiRenderer:r}}})=>{switch(o.style){case"volcano":{const s=v({animationId:"volcano",times:o.times,randomiseStartFrame:e,paused:t,spritesheetVariant:n?"for-current-room":"uncolourised"});return Zo(r,s,"volcano")}case"toaster":throw new Error("use the special toaster appearance instead");default:throw o.style,new Error("unknown deadly block style")}}),spikes:it("spikes"),slidingDeadly:dh,slidingBlock:Q(({renderContext:{item:{config:{style:o}},general:{colourised:e}}})=>{const t=e?"for-current-room":"uncolourised";return v(o==="book"?{textureId:"book.y",spritesheetVariant:t}:{textureId:o,spritesheetVariant:t})}),block:wd,switch:mh,button:Sd,conveyor:Bd,lift:Q(({renderContext:{general:{paused:o,colourised:e}}})=>{const t=new C,n=e?"for-current-room":"uncolourised",r={x:ht.w/2,y:ht.h};return t.addChild(v({animationId:"lift",pivot:r,paused:o,spritesheetVariant:n})),t.addChild(v({textureId:"lift.static",pivot:r,spritesheetVariant:n})),t}),teleporter:$r,portableTeleporter:$r,sceneryCrown:Q(({renderContext:{item:{config:{planet:o}},general:{colourised:e}}})=>v({textureId:`crown.${o}`,spritesheetVariant:e?"for-current-room":"uncolourised"})),pickup:Q(({renderContext:{item:{config:o},general:{paused:e,colourised:t}}})=>{const n=t?"for-current-room":"uncolourised";if(o.gives==="crown")return v({textureId:`crown.${o.planet}`,spritesheetVariant:n});const s={shield:{textureId:"whiteRabbit",spritesheetVariant:n},jumps:{textureId:"whiteRabbit",spritesheetVariant:n},fast:{textureId:"whiteRabbit",spritesheetVariant:n},"extra-life":{textureId:"whiteRabbit",spritesheetVariant:n},bag:{textureId:"bag",spritesheetVariant:n},doughnuts:{textureId:"doughnuts",spritesheetVariant:n},hooter:{textureId:"hooter",spritesheetVariant:n},scroll:{textureId:"scroll",spritesheetVariant:n},reincarnation:{animationId:"fish",paused:e,spritesheetVariant:n}}[o.gives];return v(s)}),moveableDeadly:it("fish.1"),charles:Td,joystick:Yd,movingPlatform:it("sandwich"),pushableBlock:it("stepStool"),portableBlock:Q(({renderContext:{item:{config:{style:o}},general:{colourised:e}}})=>v({textureId:o,spritesheetVariant:e?"for-current-room":"uncolourised"})),spring:hh,sceneryPlayer:ch,hushPuppy:it("hushPuppy"),bubbles:Q(({renderContext:{item:{id:o,config:{style:e}},general:{paused:t,colourised:n}}})=>v({animationId:`bubbles.bounce.${e}`,paused:t,randomiseStartFrame:o,spritesheetVariant:n?"for-current-room":"uncolourised"})),firedDoughnut:Ad({animationId:"bubbles.doughnut"}),ball:it("ball"),floor:Nd,particle:Q(({renderContext:{item:{config:{forCharacter:o}},general:{paused:e,colourised:t}}})=>v({animationId:`particle.${o==="head"?"head":"heels"}.fade`,anchor:{x:.5,y:.5},paused:e,spritesheetVariant:t?"for-current-room":"uncolourised"}))},ta=o=>{if(o.type==="wall"){const{direction:e}=o.config;return e==="right"||e==="towards"?void 0:vh}return o.type==="deadlyBlock"&&o.config.style==="toaster"?bh:wh[o.type]},na=(o,e,t)=>{const r=ta(o)({renderContext:{general:e.general,item:o,room:t,colourClashLayer:void 0,frontLayer:void 0,zEdges:ol,getItemRenderPipeline(){throw new Error("getOtherItemContainer not supported in carried sprite")}},tickContext:{lastRenderRoomTime:Dt,movedItems:wt,deltaMS:1}});if(r==="no-update")throw new Error("no-update not supported in carried sprite");return r.output},Sh=()=>{const o=v({label:"carriedItem"}),e=v({label:"bag",textureId:"bag",y:-2,spritesheetVariant:"original"});return new C({label:"carryButtonSurface",children:[o,e]})},Ch=({renderContext:o,currentRendering:e,tickContext:t})=>{const{button:n,inputStateTracker:r,general:{colourised:s,pixiRenderer:i}}=o,{currentPlayable:a,room:l}=t,c=e?.renderProps,u=e?.output,d=a&&_o(a),h=d?.hasBag??!1,p=d?.carrying??null,f=p===null&&l!==void 0&&Zi(a,l)!==void 0,m=Pn(n.actions,r),x=h&&!f&&p===null,g=u??new _n(s,n.which,i,Sh()),_=l!==c?.renderedInRoom;_&&g.generateButtonSpriteTextures(l),g.visible=h;const[T,y]=g.shownOnSurface.children;if(x!==c?.disabled||s!==c?.colourised||_){const b=Te(s?x?"deactivated":"for-current-room":"uncolourised");y.texture=b.textures.bag}return c?.pressed!==m&&(g.pressed=m),p!==c?.carrying&&(y.visible=p===null,T.visible=p!==null),(p!==c?.carrying||_)&&(T.removeChildren(),p!==null&&l!==void 0&&T.addChild(na(p,o,t.room))),{output:g,renderProps:{pressed:m,hasBag:h,colourised:s,carrying:p,disabled:x,renderedInRoom:l}}},Th=o=>{const e=v({textureId:"hooter",y:-3,spritesheetVariant:"original"}),t=v({textureId:"doughnuts",y:-2,spritesheetVariant:"original"}),n=new N({pixiRenderer:o,outline:!0,y:Ko});return new C({label:"fireButtonSurface",children:[e,t,n]})},kh=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n}},currentRendering:r,tickContext:{currentPlayable:s,room:i}})=>{const a=s&&rl(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=Pn(o.actions,e),d=c===0,h=l?"hooter":ro(c)>0?"doughnuts":"none",p=r?.renderProps,f=i!==p?.renderedInRoom,m=u!==p?.pressed,x=d!==p?.disabled,g=h!==p?.showingSprite;if(p!==void 0&&t===p.colourised&&g&&!x&&!m&&!f)return"no-update";const _=r?.output??new _n(t,o.which,n,Th(n));f&&_.generateButtonSpriteTextures(i),_.visible=h!=="none",m&&(_.pressed=u);const[T,y,b]=_.shownOnSurface.children;if(g&&(T.visible=h==="hooter",y.visible=h==="doughnuts"),x||f){const w=Te(t?d?"deactivated":"for-current-room":"uncolourised");T.texture=w.textures.hooter,y.texture=w.textures.doughnuts,b.tint=Wo(t,i.color.shade==="dimmed")}return c!==p?.doughnutsCount&&(b.text=ro(c)),{output:_,renderProps:{pressed:u,colourised:t,showingSprite:h,renderedInRoom:i,disabled:d,doughnutsCount:c}}},Ih=new re(16777215),gt=(o,e=!0)=>o?e?"for-current-room":"deactivated":"uncolourised",Mt=(o,e,t)=>o?Ih:se(Yt(e).hud[t?"brightHue":"dimmedHue"]),Ze=(o,e,t)=>{const n=Yt(e);return o?ei(n.hud[t?"brightHue":"dimmedHue"],!1,e.shade==="dimmed"):se(n.hud[t?"brightHue":"dimmedHue"])},Hr=(o,e)=>{const t=Yt(e);return o?ei(t.hud.icons,!1,e.shade==="dimmed"):se(t.hud.icons)},_h=(o,e)=>{const t=v({animationId:"teleporter.flashing",y:5,spritesheetVariant:gt(o)}),n=new N({pixiRenderer:e,text:"JUMP",y:Ko});return new C({label:"jumpButtonSurface",children:[n,t]})},Ph=({renderContext:{button:o,inputStateTracker:e,general:{colourised:t,pixiRenderer:n,paused:r}},tickContext:{room:s,currentPlayable:i},currentRendering:a})=>{const l=a?.renderProps,c=a?.output,u=i?.state.standingOnItemId??null,d=u===null||s===void 0?null:s.items[u],h=d===null?!1:d.type==="teleporter"&&Tn(d),p=Pn(o.actions,e),f=c??new _n(t,o.which,n,_h(t,n)),m=l?.pressed!==p;m&&(f.pressed=p);const x=s!==l?.renderedInRoom,g=h!==l?.isStandingOnActiveTeleporter,_=r!==l?.paused,[T,y]=f.shownOnSurface.children;if(_&&(r?y.gotoAndStop(0):y.gotoAndPlay(0)),!g&&!x&&!m)return"no-update";if(g&&(y.visible=h,T.visible=!h),x){const b=Te(gt(t));y.textures=qo(b.animations["teleporter.flashing"]),r||y.gotoAndPlay(0),T.tint=Wo(t,s?.color.shade==="dimmed"),f.generateButtonSpriteTextures(s)}return{output:f,renderProps:{pressed:p,isStandingOnActiveTeleporter:h,colourised:t,renderedInRoom:s,paused:r}}},Mh=({currentRendering:o,tickContext:e,renderContext:t})=>o!==void 0?(o.output.tint=Ze(t.general.colourised,e.room.color,!1),"no-update"):{output:new N({pixiRenderer:t.general.pixiRenderer,label:"mapText",outline:!0,text:"MAP"}),renderProps:de},Rh=({currentRendering:o,tickContext:e,renderContext:t})=>o!==void 0?(o.output.tint=Ze(t.general.colourised,e.room.color,!1),"no-update"):{output:new N({pixiRenderer:t.general.pixiRenderer,label:"menuText",outline:!0,doubleHeight:!0,doubleWidth:!0,text:"☰"}),renderProps:de},Bh=6e-4,Ah=1e-4,sn=.3,Oh=40;class Fh{#e={x:0,y:0};#t=0;#o=!1;startDrag(){this.#o=!0,this.#e={x:0,y:0},this.#t=performance.now()}stopDrag(){this.#o=!1}updateVelocity(e){const t=performance.now(),n=t-this.#t;if(n>0){const r=e.x/n,s=e.y/n;this.#e.x=this.#e.x*(1-sn)+r*sn,this.#e.y=this.#e.y*(1-sn)+s*sn}this.#t=t}checkStationaryDrag(){this.#o&&performance.now()-this.#t>Oh&&(this.#e={x:0,y:0})}applyInertia(e){const t={x:0,y:0};if(!this.#o){const n=Math.sqrt(this.#e.x*this.#e.x+this.#e.y*this.#e.y);if(n>Ah){t.x=this.#e.x*e,t.y=this.#e.y*e;const r=Bh*e,s=Math.max(0,n-r);if(s>0){const i=s/n;this.#e.x*=i,this.#e.y*=i}else this.#e.x=0,this.#e.y=0}else this.#e.x=0,this.#e.y=0}return t}reset(){this.#e={x:0,y:0},this.#o=!1,this.#t=0}get isDragging(){return this.#o}}const wo=(o,e,t)=>(e?(t.x=o.y,t.y=o.x):(t.x=o.x,t.y=o.y),t),Lh={x:-1,y:-1};class Eh{constructor(e){this.renderContext=e;const{x:t,y:n}=e.general.upscale.gameEngineScreenSize;this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer),this.output.rect(0,0,t,n).fill("#00000000")}output=new ue({label:"OnScreenLook",eventMode:"static"});#e;#t={x:-1,y:-1};#o;#n=new Fh;handleTouchStart=e=>{if(this.#e!==void 0&&this.stopCurrentPointer(),this.#o.curPointerId===e.pointerId)return;const t=this.renderContext.general.upscale.rotate90;this.#e=e.pointerId,wo(e,t,this.#t),this.#n.startDrag(),this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation)};stopCurrentPointer=()=>{this.#e=void 0,this.#n.stopDrag(),this.renderContext.inputStateTracker.hudInputState.directionVector=he,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#e)return;const t=this.renderContext.general.upscale.rotate90,n=this.#t,r=$s(B.getState()),{x:s,y:i}=wo(e,t,Lh),a=(n.x-s)/r;let l=(n.y-i)/r;t&&(l=-l),this.#n.updateVelocity({x:a,y:l});const{inputStateTracker:{hudInputState:c}}=this.renderContext;c.lookVector.x+=a,c.lookVector.y+=l,n.x=s,n.y=i};tick(e){if(B.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer(),this.#n.reset();return}const{deltaMS:n}=e,{inputStateTracker:{hudInputState:r}}=this.renderContext;this.#n.checkStationaryDrag();const s=this.#n.applyInertia(n);r.lookVector.x+=s.x,r.lookVector.y+=s.y}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}get curPointerId(){return this.#e}set joystickRenderer(e){this.#o=e}}const le=14,zh=2,Uh={x:-1,y:-1},Dh=Math.cos(30*(Math.PI/180)),Gh=55,Wh="#00000000";class Vh{constructor(e){this.renderContext=e;const{inputDirectionMode:t,general:{colourised:n,pixiRenderer:r}}=e;this.#t=v({textureId:"joystick.whole",anchor:{x:.5,y:.5},y:1,spritesheetVariant:n?"for-current-room":"uncolourised"}),this.#e={away:new N({pixiRenderer:r,outline:!0,x:le,y:-le,text:"↗"}),right:new N({pixiRenderer:r,outline:!0,x:le,y:le,text:"↘"}),towards:new N({pixiRenderer:r,outline:!0,x:-le,y:le,text:"↙"}),left:new N({pixiRenderer:r,outline:!0,x:-le,y:-le,text:"↖"}),...t!=="4-way"?{awayRight:new N({pixiRenderer:r,outline:!0,x:le*Math.SQRT2,text:"➡"}),towardsRight:new N({pixiRenderer:r,outline:!0,y:le*Math.SQRT2,text:"⬇"}),towardsLeft:new N({pixiRenderer:r,outline:!0,x:-le*Math.SQRT2,text:"⬅"}),awayLeft:new N({pixiRenderer:r,outline:!0,y:-le*Math.SQRT2,text:"⬆"})}:{}},this.output.addChild(this.#t),this.output.addChild(new ue().circle(0,0,Gh).fill(Wh)),this.output.addChild(new C({children:Object.values(this.#e),y:sl/2})),this.output.on("touchstart",this.handleTouchStart),this.output.on("mousedown",this.handleTouchStart),this.output.on("touchend",this.stopCurrentPointer),this.output.on("touchendoutside",this.stopCurrentPointer),this.output.on("mouseup",this.stopCurrentPointer),this.output.on("mouseupoutside",this.stopCurrentPointer)}output=new C({label:"OnScreenJoystick",eventMode:"static"});#e;#t;#o;#n;#r;handleTouchStart=e=>{this.#o!==void 0&&this.stopCurrentPointer(),this.#n.curPointerId!==e.pointerId&&(this.#o=e.pointerId,this.usePointerLocation(e),this.output.on("globalpointermove",this.usePointerLocation))};stopCurrentPointer=()=>{this.#o=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=he,this.output.off("globalpointermove",this.usePointerLocation)};usePointerLocation=e=>{if(e.pointerId!==this.#o)return;const{rotate90:t,gameEngineScreenSize:{y:n}}=this.renderContext.general.upscale,r=$s(B.getState()),{x:s,y:i}=this.output,a=s,l=t?n-i:i,{x:c,y:u}=wo(e,t,Uh),d=c/r,h=u/r,{width:p,height:f}=this.output.getLocalBounds(),m=(d-a)/(p/2),x=(h-l)/(f/2)*(t?-1:1),g=il({x:-m,y:-x});this.renderContext.inputStateTracker.hudInputState.directionVector=Oe(al(g,Dh),zh)};tick({room:e}){const{renderContext:{general:{colourised:t},inputStateTracker:{directionVector:n}}}=this;if(this.#r!==e&&(this.#t.texture=Ot(t?"for-current-room":"uncolourised","joystick.whole"),this.#r=e),B.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const s=yn(n)>ll?Cn(n):void 0,i=Ze(t,e.color,!0),a=Ze(t,e.color,!1);for(const[l,c]of cl(this.#e))c.tint=l===s?i:a}get curPointerId(){return this.#o}set lookRenderer(e){this.#n=e}destroy(){this.stopCurrentPointer(),this.output.off("touchstart",this.handleTouchStart),this.output.off("mousedown",this.handleTouchStart),this.output.off("touchend",this.stopCurrentPointer),this.output.off("touchendoutside",this.stopCurrentPointer),this.output.off("mouseup",this.stopCurrentPointer),this.output.off("mouseupoutside",this.stopCurrentPointer),this.output.destroy()}}const Nr=30,jr=15,$h=42,Hh=36,Nh=44,jh=20;class Xh{constructor(e){this.renderContext=e;const{general:{gameState:{inputStateTracker:t}},inputDirectionMode:n,general:r}=e;this.#t={mainButtonNest:new C({label:"mainButtonNest"}),buttons:{jump:new st({button:{which:"jump",actions:["jump"],id:"jump"},general:r,inputStateTracker:t},Ph),fire:new st({button:{which:"fire",actions:["fire"],id:"fire"},general:r,inputStateTracker:t},kh),carry:new st({button:{which:"carry",actions:["carry"],id:"carry"},general:r,inputStateTracker:t},Ch),carryAndJump:new st({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},general:r,inputStateTracker:t},gd),menu:new st({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},general:r,inputStateTracker:t},Rh),map:new st({button:{which:"map",actions:["map"],id:"map"},general:r,inputStateTracker:t},Mh)},joystick:new Vh({inputStateTracker:t,inputDirectionMode:n,general:r}),look:new Eh({inputStateTracker:t,general:r})},this.#t.look.joystickRenderer=this.#t.joystick,this.#t.joystick.lookRenderer=this.#t.look,this.#o(),this.#n()}#e=new C({label:"OnScreenControls"});#t;#o(){const{buttons:e}=this.#t,{mainButtonNest:t,joystick:n,look:r}=this.#t;this.#e.addChild(r.output);for(const{renderContext:{button:{which:s}},output:i}of qe(e))s==="menu"||s==="map"?this.#e.addChild(i):t.addChild(i);e.jump.output.y=jr,e.carry.output.x=-Nr,e.carryAndJump.output.y=-jr,e.fire.output.x=Nr,e.menu.output.x=24,e.menu.output.y=24,e.map.output.y=16,this.#e.addChild(t),this.#e.addChild(n.output)}#n(){const{renderContext:{general:{gameState:{inputStateTracker:e}}}}=this;for(const t of qe(this.#t.buttons)){const{renderContext:{button:{actions:n}}}=t;t.output.eventMode="static",t.output.on("pointerdown",()=>{for(const r of n)e.hudInputState[r]=!0}),t.output.on("pointerup",()=>{for(const r of n)e.hudInputState[r]=!1}),t.output.on("pointerleave",()=>{for(const r of n)e.hudInputState[r]=!1})}}#r(e){this.#t.mainButtonNest.x=e.x-Nh,this.#t.mainButtonNest.y=e.y-jh,this.#t.joystick.output.x=$h,this.#t.joystick.output.y=e.y-Hh,this.#t.buttons.map.output.x=e.x-24}tick(e){const{screenSize:t}=e,{general:{gameState:n}}=this.renderContext;this.#r(t);for(const r of qe(this.#t.buttons))r.tick({...e,currentPlayable:Xt(n)});this.#t.joystick.tick(e),this.#t.look.tick(e)}get output(){return this.#e}destroy(){this.#t.joystick.destroy(),this.#t.look.destroy(),this.#e.destroy({children:!0})}}Je.frames.button.frame;const Yh=o=>o.room!==void 0,qh=(o,e)=>o?e/2-24:24,Zh=(o,e)=>o?e/2-24:56,Jh=(o,e)=>o?Math.round(e.x/2)-80:80,Kh=(o,e)=>o?Math.round(e.x/2)-104:80,Qh=o=>o?0:24,ep=o=>0,Xr=112,at=o=>o==="heels"?1:-1,Yr="head.walking.right.2",qr="heels.standing.towards";class tp{constructor(e){this.renderContext=e;const{general:t}=e;this.#n={head:{sprite:this.#c("head"),livesText:new N({pixiRenderer:t.pixiRenderer,label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"headShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"headFastSteps",textureId:"hud.char.⚡",outline:!0}),doughnuts:this.#a({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#a({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#c("heels"),livesText:new N({pixiRenderer:t.pixiRenderer,label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#a({label:"heelsShield",textureId:"hud.char.🛡",outline:!0}),extraSkill:this.#a({label:"heelsBigJumps",textureId:"hud.char.♨",outline:!0}),bag:this.#a({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new C({label:"heelsCarrying"})}}};for(const r of Qt)this.#e.addChild(this.#n[r].shield.container),this.#e.addChild(this.#n[r].extraSkill.container);t.onScreenControls||(this.#e.addChild(this.#n.head.doughnuts.container),this.#e.addChild(this.#n.head.hooter.container),this.#e.addChild(this.#n.heels.bag.container),this.#e.addChild(this.#n.heels.carrying.container)),this.#l(),t.onScreenControls&&(this.#t=new Xh({general:e.general,inputDirectionMode:e.inputDirectionMode}),this.#e.addChild(this.#t.output));for(const r of Qt)this.#e.addChild(this.#n[r].livesText),this.#e.addChild(this.#n[r].sprite);this.#r=Os({predicate(r,s,i){return He(s)!==He(i)},effect:(r,{getState:s})=>{He(s())?(this.#o=new Rr(e),this.#i()):(this.#o?.destroy(),this.#o=void 0)}});const n=He(B.getState());this.#o=n?new Rr(e):void 0,this.#o&&this.#i()}#e=new C({label:"HudRenderer",isRenderGroup:!0});#t=void 0;#o;#n;#r;#s=void 0;#i(){this.#e.addChild(this.#o.output)}#l(){const{renderContext:{general:{gameState:{inputStateTracker:{hudInputState:e}}}}}=this;for(const t of Qt){const{sprite:n,livesText:r}=this.#n[t];for(const s of[n,r])s.eventMode="static",s.on("pointerdown",()=>{e[`swop.${t}`]=!0}),s.on("pointerup",()=>{e[`swop.${t}`]=!1}),s.on("pointerleave",()=>{e[`swop.${t}`]=!1})}}#a({textureId:e,textOnTop:t=!1,noText:n=!1,outline:r=!1,label:s}){const i=new C({label:s});i.pivot={x:4,y:16};const a=new te({texture:Be().textures[e],anchor:t?{x:.5,y:0}:{x:.5,y:1},y:t?0:8});i.addChild(a);const l=$e.w/2,c=new N({pixiRenderer:this.renderContext.general.pixiRenderer,outline:r==="text-only",y:t?0:16,x:l});return n&&(c.visible=!1),a.x=l,i.addChild(c),r===!0&&(i.filters=qt.pureBlack),{textContainer:c,icon:a,container:i}}#c(e){const t=new te(Be().textures[e==="head"?Yr:qr]);return t.anchor={x:.5,y:0},t}#u({screenSize:e}){this.#n.head.hooter.container.x=this.#n.head.doughnuts.container.x=(e.x>>1)+at("head")*Xr,this.#n.head.doughnuts.container.y=e.y-ht.h-8,this.#n.heels.carrying.container.y=e.y-ht.h,this.#n.heels.carrying.container.x=this.#n.heels.bag.container.x=(e.x>>1)+at("heels")*Xr,this.#n.heels.bag.container.y=this.#n.head.hooter.container.y=e.y-8,this.#o&&(this.#o.output.x=e.x/2-$e.w*1.5)}#h({room:e}){const{renderContext:{general:{gameState:t,colourised:n}}}=this,r=en(t,"heels"),s=r?.carrying??null,{container:i}=this.#n.heels.carrying,a=i.children.length>0;if(s===null&&a){for(const u of i.children)u.destroy();this.#s=void 0}if(s!==null&&(!a||e!==this.#s)){const u=na(s,this.renderContext,e);this.#s=e,i.removeChildren(),i.addChild(u),i.tint=Mt(n,e.color,!0)}const l=this.#n.heels.bag.icon,c=r?.hasBag;l.texture=Ot(gt(n,c??!1),"bag"),l.tint=Mt(n,e.color,c??!1)}#d({room:e}){const{renderContext:{general:{gameState:t,colourised:n}}}=this,r=en(t,"head"),s=r?.doughnuts??0,i=s!==0,a=r?.hasHooter,l=this.#n.head.hooter.icon,c=this.#n.head.doughnuts.icon,u=this.#n.head.doughnuts.textContainer;l.texture=Ot(gt(n,a??!1),"hooter"),c.texture=Ot(gt(n,i),"doughnuts"),this.#n.head.doughnuts.textContainer.text=s,u.tint=Ze(n,e.color,!1),l.tint=Mt(n,e.color,a??!1),c.tint=Mt(n,e.color,i)}#f(e,{screenSize:t,room:n}){const{renderContext:{general:{gameState:r,colourised:s,onScreenControls:i}}}=this,a=en(r,e),{textContainer:l,container:c,icon:u}=this.#n[e].shield,{textContainer:d,container:h,icon:p}=this.#n[e].extraSkill,f=ul(a),m=f>0||!i;c.visible=m,m&&(l.text=f,c.y=t.y-ep(i)),h.x=(t.x>>1)+at(e)*Jh(i,t),c.x=(t.x>>1)+at(e)*Kh(i,t);const x=a===void 0?0:e==="head"?Hs(a):a.bigJumps,g=x>0||!i;h.visible=g,g&&(d.text=x,h.y=t.y-Qh(i)),d.tint=Ze(s,n.color,!1),l.tint=Ze(s,n.color,!1),u.tint=Hr(s,n.color),p.tint=Hr(s,n.color)}#p(e,t){const{currentCharacterName:n}=e;return n===t||n==="headOverHeels"}#m(e,{screenSize:t,room:n}){const{renderContext:{general:{gameState:r,colourised:s,onScreenControls:i}}}=this,a=this.#n[e].sprite;let l;const c=this.#p(r,e),u=gt(s,c);try{l=Ot(u,e==="head"?Yr:qr)}catch(d){throw console.error(this.renderContext),new Error(`error getting texture for variant ${u}`,{cause:d})}a.texture=l,a.x=(t.x>>1)+at(e)*Zh(i,t.x),a.y=i?Math.round(t.y*.4)-ht.h+2:t.y-ht.h,a.tint=Mt(s,n.color,c)}#g(e,{screenSize:t,freeCharacters:n,room:r}){const{renderContext:{general:{gameState:s,colourised:i,onScreenControls:a}}}=this,c=n[e]??!1?"FREE":en(s,e)?.lives??0,u=this.#n[e].livesText;u.x=(t.x>>1)+at(e)*qh(a,t.x),u.y=a?Math.round(t.y*.4)+16:t.y,u.text=c;const d=this.#p(s,e),h=r.color.shade==="dimmed",p=i?Qs(h)[d?uo[e]:"midGrey"]:se(Yt(r.color).hud.brightHue);u.tint=p}tick(e){if(Yh(e)){for(const t of Qt)this.#g(t,e),this.#m(t,e),this.#f(t,e);this.#u(e),this.#d(e),this.#h(e),this.#t?.tick(e),this.#o&&(this.#o.isDark=e.room.color.shade==="dimmed")}}get output(){return this.#e}destroy(){this.#n.head.doughnuts.textContainer.destroy(),this.#n.head.hooter.textContainer.destroy(),this.#n.heels.bag.textContainer.destroy(),this.#e.destroy({children:!0}),this.#t?.destroy(),this.#o?.destroy(),this.#r()}}const np=(o,e,t,n,r)=>o===void 0||o.renderContext.general.colourised!==e||o.renderContext.general.onScreenControls!==t||o.renderContext.inputDirectionMode!==n||o.renderContext.general.upscale.rotate90!==r.rotate90,op=(o,e,t,n,r,s)=>o===void 0||e||o.renderContext.general.upscale!==t||o.renderContext.general.displaySettings!==n||o.renderContext.general.soundSettings!==r||o.renderContext.general.paused!==s,er=.1,Ft=(o,e)=>{const t=M.currentTime+er;e.gain.linearRampToValueAtTime(0,t),o.stop(t),o.onended=()=>{o.disconnect(),e.disconnect()}},Ve=(o,{gain:e,randomiseStartPoint:t},n)=>{const r=M.createGain(),s=e??r.gain.defaultValue;return t?(r.gain.setValueAtTime(0,M.currentTime),r.gain.linearRampToValueAtTime(s,M.currentTime+er)):e!==void 0&&(r.gain.value=e),o.connect(r),r.connect(n),r},Y=o=>{const e=typeof o=="string"?{soundId:o}:o,{playbackRate:t=1,soundId:n,connectTo:r,loop:s=!1,varyPlaybackRate:i=!1,randomiseStartPoint:a=!1}=e,l=M.createBufferSource(),c=so()[n];return l.buffer=c,l.loop=s,l.playbackRate.value=i?t-.05+Math.random()*.1:t,s&&a?l.start(0,c.duration*Math.random()):l.start(),r!==void 0&&l.connect(r),l},oe=({start:o,change:e,loop:t,stop:n,startAndLoopTogether:r=!1,noStartOnFirstFrame:s=!0},i)=>{let a=!0,l,c,u;return d=>{if(!!d!=!!u)d?o!==void 0&&!(a&&s)?(l&&c&&(l.onended=null,Ft(l,c)),l=Y({...o}),c=Ve(l,o,i),t!==void 0&&(r?(l=Y({...t,loop:!0}),c=Ve(l,t,i)):l.onended=()=>{u&&(l&&c&&(l.onended=null,Ft(l,c)),l=Y({...t,loop:!0}),c=Ve(l,t,i))})):t!==void 0&&(l=Y({...t,loop:!0}),c=Ve(l,t,i)):(l&&l.loop&&c&&(l.onended=null,Ft(l,c)),n!==void 0&&(l=Y({...n}),c=Ve(l,n,i)));else if(u!==d&&e!==void 0){const p=Y({...e});c=Ve(p,e,i)}a=!1,u=d}},rp={soundId:"fall"},sp={soundId:"woodScrape",gain:.8,randomiseStartPoint:!0,playbackRate:.8},ip={soundId:"softBump"},ap=(o,e)=>{let t=!1;for(const n in o){if(n!==e)return!0;t=!0}return!t};class ee{constructor(e,t){this.renderContext=e;const n=M.createGain();n.connect(this.output),this.#e=oe({loop:t?.fall??rp},n);const r=M.createGain();r.connect(this.output),this.#t=t?.standingOn===null?void 0:oe({start:t?.standingOn??ip,noStartOnFirstFrame:!0},r);const s=M.createGain();s.connect(this.output),this.#o=t?.collision&&oe({start:t.collision,noStartOnFirstFrame:!0},s);const i=M.createGain();i.connect(this.output),this.#n=t?.pushed===null?void 0:oe({loop:t?.pushed??sp},i)}output=M.createGain();#e;#t;#o;#n;currentPositionZ=0;tick({lastRenderRoomTime:e,movedItems:t},n=!1){const{renderContext:{item:r,room:{roomTime:s}}}=this,{state:{standingOnItemId:i,position:{z:a},vels:{gravity:{z:l}},actedOnAt:{roomTime:c,actedInXY:u,by:d},collidedWith:{roomTime:h,by:p}}}=r;if(this.#e!==void 0){const{currentPositionZ:f}=this,m=a<f&&l<0&&i===null;this.#e(m),this.currentPositionZ=a}if(this.#t!==void 0){const f=i!==null&&h>(e??Dt)&&p[i];this.#t(f)}if(this.#o!==void 0){const f=h>(e??Dt)&&!Vo(Bo(p));this.#o(f)}if(this.#n!==void 0){const f=!n&&s===c&&u&&i!==null&&ap(d,i)&&t.has(r);this.#n(f)}}destroy(){this.#e?.(!1),this.#n?.(!1)}}const Zr={soundId:"rollingBallLoop",playbackRate:.5,gain:4};class lp{constructor(e){this.renderContext=e,this.#t=new ee(e,{pushed:Zr,collision:{soundId:"ballHit",gain:.7,varyPlaybackRate:!0},standingOn:{soundId:"ballHit"}}),this.#t.output.connect(this.output)}output=M.createGain();#e=oe({loop:Zr},this.output);#t;tick(e){const{renderContext:{item:{state:{vels:{sliding:t},standingOnItemId:n}}}}=this,r=(t.x!==0||t.y!==0)&&n!==null;this.#e(r),this.#t.tick(e,r)}destroy(){this.#e(!1),this.#t.destroy()}}class cp{constructor(e){this.renderContext=e;const{item:{config:{was:t}}}=e;switch(t.type){case"pickup":{t.gives!=="scroll"&&Y({soundId:"bonus",connectTo:this.output});break}case"disappearing":{Y({soundId:"destroy",connectTo:this.output});break}case"hushPuppy":{this.output.gain.value=.5,Y({soundId:"hushPuppyVanish",connectTo:this.output});break}}}output=M.createGain();tick(){}destroy(){}}class up{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=M.createGain();#e=M.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{pressed:e}}}}=this;this.#t!==void 0&&this.#t!==e&&Y({soundId:"switchClick",playbackRate:e?.95:1.05,connectTo:this.#e}),this.#t=e}destroy(){}}class dp{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#o=new ee(e,{collision:{soundId:"metalHit",gain:.3},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#o.output.connect(this.output)}output=M.createGain();#e=M.createGain();#t=oe({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5}},this.#e);#o;tick(e){const{renderContext:{item:t,room:{roomTime:n,items:r}}}=this,{state:{actedOnAt:{roomTime:s,by:i}}}=t,a=n===s&&tt(Bo(i)).some(l=>Ds(r[l]));this.#t(a),this.#o.tick(e,a)}destroy(){this.#t(!1),this.#o.destroy()}}const jn=2;class hp{constructor(e){this.renderContext=e}output=M.createGain();#e=oe({start:{soundId:"conveyorStart",playbackRate:jn},loop:{soundId:"conveyorLoop",playbackRate:jn},stop:{soundId:"conveyorEnd",playbackRate:jn}},this.output);tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,t=Zt(e);this.#e(t)}destroy(){this.#e(!1)}}class pp{constructor(e){this.renderContext=e,this.#e=new ee(e,{standingOn:{soundId:"drum"}}),this.#e.output.connect(this.output)}output=M.createGain();#e;#t=!1;tick(e){const{renderContext:{item:{state:{stoodOnBy:t}}}}=this,n=Zt(t);!this.#t&&n&&Y({soundId:"drum",connectTo:this.output}),this.#t=n,this.#e.tick(e)}destroy(){this.#e.destroy()}}class fp{constructor(e){this.renderContext=e,Y({soundId:"hooter",connectTo:this.output})}output=M.createGain();tick(){}destroy(){}}const mp=3;class gp{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=M.createGain();#e=Y({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+mp*e)}destroy(){Ft(this.#e,this.output)}}const xp={skiHead:{soundId:"softBump"},turtle:{soundId:"softBump"},dalek:{soundId:"metalHit",gain:.1},homingBot:{soundId:"metalHit",gain:.2},computerBot:{soundId:"metalHit",gain:.2}},Jr={cyberman:{soundId:"jetpackTurnaround",gain:1.2},dalek:{soundId:"mojoTurn",gain:.3}},Kr={cyberman:{soundId:"jetpackLoop",gain:.7},emperorsGuardian:{soundId:"jetpackLoop"},dalek:{soundId:"mojoLoop",gain:.2},bubbleRobot:{soundId:"bubbleRobotLoop"},helicopterBug:{soundId:"helicopter"},homingBot:{soundId:"lowHum",randomiseStartPoint:!0}},Qr={homingBot:{start:{soundId:"detect"},loop:{soundId:"robotWhirLoop",gain:4},startAndLoopTogether:!0},computerBot:{loop:{soundId:"robotBeepingLoop",randomiseStartPoint:!0,varyPlaybackRate:!0}}};class bp{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#t.connect(this.output),this.#t.gain.value=.66;const{item:{config:{which:t}}}=e,n=xp[t];this.#r=new ee(e,n?{collision:n}:void 0),this.#r.output.connect(this.output),Jr[t]!==void 0&&(this.#o=oe({change:Jr[t]},this.#e)),Qr[t]!==void 0&&(this.#s=oe(Qr[t],this.#e)),Kr[t]!==void 0&&(this.#n=oe({loop:Kr[t]},this.#t))}output=M.createGain();#e=M.createGain();#t=M.createGain();#o;#n;#r;#s;tick(e){const{renderContext:{item:t}}=this,{state:{facing:n,activated:r,busyLickingDoughnutsOffFace:s,vels:{walking:i}}}=t;if(this.#o){const l=Cn(n);this.#o(l)}if(this.#n){const l=r&&!s;this.#n(l)}const a=!Ns(i,he);this.#s&&this.#s(a),this.#r.tick(e,a)}destroy(){this.#n?.(!1),this.#s?.(!1),this.#r.destroy()}}class yp{constructor(e){this.renderContext=e,this.#e=new ee(e,{pushed:null}),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const vp=.8,wp=1.2,Sp=.8;class Xn{constructor(e){this.renderContext=e;const{general:{soundSettings:t},item:{type:n}}=e;(t.noFootsteps??et.soundSettings.noFootsteps)||(this.#e=M.createGain(),this.#e.gain.value=vp,this.#e.connect(this.output),this.#t=oe({loop:{soundId:`${n==="headOverHeels"?"heels":n}Walk`}},this.#e)),this.#o.gain.value=Sp,this.#o.connect(this.output),this.#r.gain.value=wp,this.#r.connect(this.output),this.#n=oe({start:{soundId:`${n==="headOverHeels"?"head":n}Jump`}},this.#o),this.#i=new ee(e,{fall:n==="headOverHeels"||n==="head"?{soundId:"headFall"}:void 0,standingOn:{soundId:"softBump"},collision:{soundId:"softBump",gain:.5}}),this.#i.output.connect(this.output)}output=M.createGain();#e;#t;#o=M.createGain();#n;#r=M.createGain();#s=oe({start:{soundId:"carry",playbackRate:.95},stop:{soundId:"carry",playbackRate:1.05}},this.#r);#i;#l=null;tick(e){const{renderContext:{item:t}}=this,{state:{action:n,teleporting:r,jumpStartZ:s,jumped:i,standingOnItemId:a,position:{z:l},vels:{gravity:{z:c},walking:u}}}=t,d=_o(t),h=r?r.phase:null,p=i&&l>s&&l>this.#i.currentPositionZ&&c>0;this.#n(p);const f=l<this.#i.currentPositionZ&&c<0&&a===null,m=!p&&!f&&zo(u)>Re;if(this.#t!==void 0&&this.#t(m),d!==void 0&&this.#s(d.carrying!==null),h!==null&&h!==this.#l)if(h==="in"){const x=so().teleportIn,g=M.createBufferSource();g.buffer=x,g.connect(this.output),g.start()}else{const x=so().teleportOut,g=M.createBufferSource();g.buffer=x,g.connect(this.output),g.start()}this.#l=h,this.#i.tick(e,m||n==="falling")}destroy(){this.#t?.(!1),this.#n(!1),this.#s(!1),this.#i.destroy()}}class Cp{constructor(e){this.renderContext=e,this.#e=new ee(e,{standingOn:{soundId:"metalHit"},pushed:{soundId:"heavyMetalScraping",gain:.4}}),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}const Tp={collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8},pushed:{soundId:"iceScrape",varyPlaybackRate:!0,randomiseStartPoint:!0}};class kp{constructor(e){this.renderContext=e,this.#e=new ee(e,e.item.config.style==="puck"?Tp:void 0),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class Ip{constructor(e){this.renderContext=e,this.#e=new ee(e,{collision:{soundId:"glassClink",varyPlaybackRate:!0,gain:.8,playbackRate:1.5},pushed:{soundId:"glassClink",varyPlaybackRate:!0,playbackRate:1.5}}),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){this.#e.tick(e)}destroy(){this.#e.destroy()}}class _p{constructor(e){this.renderContext=e;const{item:{state:t}}=e;t.played===!1&&(this.#e=Y(e.item.config.soundOptions),Ve(this.#e,e.item.config.soundOptions,this.output),t.played=!0)}output=M.createGain();#e;tick(e){}destroy(){this.#e!==void 0&&Ft(this.#e,this.output)}}class Pp{constructor(e){this.renderContext=e,this.#e=new ee(e),this.#e.output.connect(this.output)}output=M.createGain();#e;tick(e){const{renderContext:{item:{state:{stoodOnBy:t,stoodOnUntilRoomTime:n}}}}=this,r=Zt(t);e.lastRenderRoomTime!==void 0&&n>e.lastRenderRoomTime&&!r&&Y({soundId:"springBoing",connectTo:this.output}),this.#e.tick(e)}destroy(){this.#e.destroy()}}class Mp{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=M.createGain();#e=M.createGain();#t=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:t}}}=this,n=t.type==="in-store"?Gs(B.getState().gameMenus,t.path)?"right":"left":e;this.#t!==void 0&&this.#t!==n&&Y({soundId:"switchClick",playbackRate:n==="right"?.95:1.05,connectTo:this.#e}),this.#t=n}destroy(){}}class es{constructor(e){this.renderContext=e,this.#e=oe({loop:{soundId:"teleportWarningSiren",playbackRate:e.item.type==="portableTeleporter"?1.25:1}},this.output)}output=M.createGain();#e;tick(){const{renderContext:{item:e,room:t}}=this;this.#e(Tn(e)&&nt(e.state.stoodOnBy,t).some(ke))}destroy(){this.#e(!1)}}const Rp=(o,e)=>Bs(nt(o.state.stoodOnBy,e).filter(Ws));class Bp{constructor(e){this.renderContext=e,this.output.gain.value=2}output=M.createGain();#e=void 0;tick(e){const{renderContext:{item:t,room:n}}=this,r=Rp(t,n);this.#e!==void 0&&r<this.#e&&Y({soundId:"toasterPopUpSoundUrl",connectTo:this.output}),this.#e=r}destroy(){}}const Ap={lift:gp,switch:Mp,button:up,bubbles:cp,head:Xn,heels:Xn,headOverHeels:Xn,teleporter:es,portableTeleporter:es,monster:bp,conveyor:hp,spring:Pp,portableBlock:ee,charles:dp,ball:lp,pushableBlock:Cp,firedDoughnut:fp,slidingBlock:kp,pickup:ee,movingPlatform:yp,moveableDeadly:ee,slidingDeadly:Ip,soundEffect:_p,sceneryPlayer:ee,sceneryCrown:ee},Op=o=>{if(o.item.type==="deadlyBlock"&&o.item.config.style==="toaster")return new Bp(o);if(o.item.type==="portableBlock"&&o.item.config.style==="drum")return new pp(o);const e=Ap[o.item.type];if(e)return new e(o)},ts=z.z*-1,ns=z.z*dl,Fp=0,Lp=z.x*16,Ep={x:0,y:0,z:0},Yn=(o,e,t)=>(o-e)/(t-e)*2-1,zp=.3,Up=.3;class Dp{constructor(e,t){this.renderContext=e,this.childRenderer=t,t.output.connect(this.output),this.output.rolloffFactor=2,this.output.maxDistance=5,this.output.distanceModel="exponential";const n=Uo(e.room).floors;this.#e=n.edgeLeftX,this.#t=n.edgeRightX}output=M.createPanner();#e;#t;tick(e){this.childRenderer.tick(e);const{item:t}=this.renderContext,n=t.state,r=js(Xs(Ep,t.aabb,.5),n.position),s=Yn(dn(r),this.#e,this.#t),i=Yn(r.z,ts,ns);if(!Number.isFinite(i))throw new Error(`y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${r.z},
          ${ts},
          ${ns},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(n.position)},
          scaleXyz(${JSON.stringify(t.aabb)}, 0.5),
        )`);const a=Yn(r.x+r.y,Fp,Lp);this.output.positionX.value=s*zp,this.output.positionY.value=i,this.output.positionZ.value=a*Up}destroy(){this.childRenderer.destroy()}}class Gp{constructor(e,t){this.renderContext=t,this.#e=e,this.#t.addChild(...e.map(n=>n.output))}#e;#t=new C({label:"CompositeRenderer"});tick(e){for(const t of this.#e)t.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#t}}var Wp=`#version 300 es
precision lowp float;in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform vec3 uTargetColor;const float blackThreshold=sqrt(3.0)*0.15;void main(void){vec4 c=texture(uTexture,vTextureCoord);float isBlack=step(length(c.rgb),blackThreshold);finalColor=mix(vec4(uTargetColor,1),c,max(isBlack,1.0-c.a));}`;const Vp=Z.from({vertex:Le,fragment:Wp,name:"revert-colourise-filter"});class $p extends q{uniforms;constructor(e="white"){super({glProgram:Vp,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[t,n,r]=new re(e).toArray();this.uniforms.uTargetColor[0]=t,this.uniforms.uTargetColor[1]=n,this.uniforms.uTargetColor[2]=r}}const oa=bt,Hp=S.pastelBlue,os=qt.highlightBeige,Np=S.lightBeige,jp=qt.lightBeige,rs=qt.midRed,Xp=qt.white,ss=new $p(Hp),qn=S.white,is=S.midRed,Yp=S.pastelBlue,as={left:"↖",away:"↗",right:"↘",towards:"↙"},ls=o=>o.type==="switch"&&o.config.type==="in-room"||o.type==="button",cs=(o,e)=>{switch(o){case"back-forth":switch(e){case"left":return"↖↘";case"right":return"↘↖";case"away":return"↗↙";case"towards":return"↙↗";default:throw new Error("Unexpected startDirection")}case"forwards":switch(e){case"left":return"↖";case"right":return"↘";case"away":return"↗";case"towards":return"↙";default:throw new Error("Unexpected startDirection")}case"clockwise":switch(e){case"left":return"↖↗↘↙";case"right":return"↘↙↖↗";case"away":return"↗↘↙↖";case"towards":return"↙↖↗↘";default:throw new Error("Unexpected startDirection")}case"anticlockwise":switch(e){case"left":return"↖↙↘↗";case"right":return"↘↗↖↙";case"away":return"↗↖↙↘";case"towards":return"↙↘↗↖";default:throw new Error("Unexpected startDirection")}case"towards-analogue":return"➡.⬅"}return""},qp=o=>o.type==="monster"&&o.config.activated==="after-player-near";class Zp{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output),this.#e()}output=new C({label:"EditorAnnotationsRenderer"});#e(){const e=this.renderContext.item;switch(e.type){case"pickup":if(e.config.gives==="shield"||e.config.gives==="extra-life"||e.config.gives==="jumps"||e.config.gives==="fast"){const t={shield:"🛡",jumps:"♨",fast:"⚡","extra-life":"+2"};this.#t({annotationText:t[e.config.gives],yAdj:-16})}break;case"doorFrame":if(e.config.part==="near"){const{rooms:t}=B.getState().levelEditor.campaignInProgress,{config:{toRoom:n,direction:r}}=e;if(n!==ir){const s=!!t[n],i=as[r],a=r==="away"||r==="right"?`${n}${i}`:`${i}${n}`;this.#t({annotationText:a,yAdj:r==="left"||r==="away"?-48:0,tint:s?qn:is,clickDispatch:s?()=>hr(n):void 0})}}break;case"teleporter":case"portableTeleporter":{const{rooms:t}=B.getState().levelEditor.campaignInProgress,n=e.config,{toRoom:r,toItemId:s,toPosition:i}=n,a=r===ir||r===void 0||!!t[r],l=`➡${r??"."}${s?`:${s}`:""}${i?`@(${i.x},${i.y},${i.z})`:""}`;this.#t({annotationText:l,yAdj:-12,tint:a?qn:is,clickDispatch:a?()=>hr(r):void 0})}break;case"conveyor":{const{config:{direction:t}}=e,n=as[t];this.#t({annotationText:n,yAdj:-12})}break;case"movingPlatform":{const{config:{movement:t,startDirection:n}}=e;this.#t({annotationText:cs(t,n),yAdj:-12})}break;case"monster":{const{config:t}=e;switch(!0){case(t.which==="cyberman"&&t.activated==="after-player-near"):this.#t({annotationText:"wake",tint:Np,yAdj:-12});break;case(t.which==="turtle"||t.which==="skiHead"):this.#t({annotationText:cs(t.movement,t.startDirection),yAdj:-12});break}}break}}#t({annotationText:e,yAdj:t=0,tint:n=qn,clickDispatch:r}){const{renderContext:{frontLayer:s,general:{pixiRenderer:i}}}=this,a=new N({pixiRenderer:i,label:"EditorAnnotationTextContainer",outline:!0,tint:n,text:e,y:t});r!==void 0&&(a.eventMode="static",a.on("click",()=>{B.dispatch(r())}),a.on("mouseover",()=>{B.getState().levelEditor.tool.type==="pointer"&&(B.dispatch(pr(!0)),a.tint=Yp)}),a.on("mouseout",()=>{B.dispatch(pr(!1)),a.tint=n}),a.cursor="pointer"),this.output.addChild(a),s.attach(a)}tick(e){this.#o(),this.childRenderer.tick(e)}#o(){const{renderContext:{room:e}}=this,t=this.renderContext.item,{clickableAnnotationHovered:n}=B.getState().levelEditor,{jsonItemId:r}=t,s=B.getState(),i=kc(s),a=Ic(s),l=_c(s),c=r&&i?.jsonItemId===r&&!n,u=r&&a.includes(r),d=()=>r!==void 0&&(ce(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&ls(h)&&h.config.modifies.some(p=>p.expectType===t.type&&(p.targets===void 0||p.targets.includes(r))))||ls(t)&&ce(e.items).some(({jsonItemId:h,type:p})=>h!==void 0&&h===i?.jsonItemId&&t.config.modifies.some(f=>f.expectType===p&&(f.targets===void 0||f.targets.includes(h))))||t.type==="charles"&&ce(e.items).some(h=>h.jsonItemId===i?.jsonItemId&&h.type==="joystick"&&h.config.controls.some(p=>p===r))||t.type==="joystick"&&t.config.controls.some(h=>i?.jsonItemId===h));this.output.filters=c&&u?[ss,l.type==="eyeDropper"?rs:os]:c?l.type==="eyeDropper"?rs:os:u?ss:d()?Xp:qp(t)?jp:oa}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const Jp=(o,e,t)=>e.general.editor?new Zp(e,t):t;class ra extends Xi{}const us=(o,e)=>{e.poly([O({}),O({x:o.x}),O({x:o.x,y:o.y}),O({y:o.y})]).poly([O({}),O({z:o.z}),O({y:o.y,z:o.z}),O({y:o.y})]).poly([O({x:o.x}),O({x:o.x,z:o.z}),O(o),O({x:o.x,y:o.y})]).poly([O({z:o.z}),O({x:o.x,z:o.z}),O({x:o.x,y:o.y,z:o.z}),O({y:o.y,z:o.z})])},ds=(o,e)=>{const t=new ue;return us(o,t),t.stroke({width:.5,color:e,alpha:1}),t.eventMode="static",t.on("pointerenter",()=>{t.fill({color:e,alpha:.5})}),t.on("pointerleave",()=>{t.clear(),us(o,t),t.stroke({width:.5,color:e,alpha:1})}),t},Kp={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",pickup:"rgba(0,196,255)",emitter:"rgba(0,255,255)",stopAutowalk:"rgba(255,128,128)",floatingText:"rgba(128,0,255)"};class Qp{constructor(e){this.renderContext=e;const{item:t}=e,n=Kp[t.type]??"rgba(255,255,255)";if(this.#e=new C({label:`ItemBoundingBoxRenderer ${t.id}`}),hl("portal")(t)){const s=O(t.config.relativePoint);this.#e.addChild(new ue().circle(s.x,s.y,5).stroke(n)),this.#e.addChild(new ue().circle(s.x,s.y,2).fill(n))}if(this.#e.addChild(new ue({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#e.addChild(ds(t.aabb,n)),t.renderAabb){const s="rgba(184, 184, 255)",i=ds(t.renderAabb,s);if(t.renderAabbOffset){const a=O(t.renderAabbOffset);i.position.set(a.x,a.y),i.circle(0,0,2).fill(s)}this.#e.addChild(i)}this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const s=`${t.id} ${t.type}
@(${t.state.position.x}, ${t.state.position.y}, ${t.state.position.z})}
#(${t.aabb.x}, ${t.aabb.y}, ${t.aabb.z})}`;this.#e.addChild(r=new _u({text:s,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)}),e.frontLayer.attach(this.#e)}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}const ef=75;class tf{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const n=e.room.color.shade==="dimmed"?In:S;this.#e=new bo(n.moss),this.#t=new bo(n.midRed),this.#o=new Fe({color:n.pureBlack}),this.#e.enabled=!1,this.#t.enabled=!1,this.#o.enabled=!1,this.output.filters=[this.#e,this.#t,this.#o]}output=new C({label:"ItemFlashOnSwitchedRenderer"});#e;#t;#o;tick(e){const{renderContext:{item:{state:{switchedAtRoomTime:t,switchedSetting:n}},room:{roomTime:r}}}=this,s=r-t<ef,i=n==="left";this.#e.enabled=s&&i,this.#t.enabled=s&&!i,this.#o.enabled=s,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const nf=(o,e)=>{const{item:t,room:{items:n}}=o;return ce(n).filter(pl).some(({config:{modifies:s}})=>s.some(i=>i.targets===void 0?i.expectType===t.type:i.targets.includes(t.id)))?new tf(o,e):e},sa=(o,e,t,n)=>{const r=1/n;o.x=zr(e,r),o.y=zr(t,r)},ia=new Vc;ia.matrix=[0,0,0,1,0,0,.3,0,0,0,0,0,.3,0,0,0,0,0,1,0];class of{constructor(e,t){this.renderContext=e,this.wrappedRenderer=t,this.output=new C({label:`ItemPositionRenderer ${e.item.id}`,children:[t.output]}),this.#t()}output;#e=new Map;#t(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=O(this.renderContext.item.state.position);sa(this.output,t.x,t.y,e)}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#t(),this.#s()}#o(){const e=this.renderContext.item.id,t=this.renderContext.zEdges.get(e);if(!t)return wt;let n;for(const[r,s]of t)s&&(n||(n=new Set),n.add(r));return n??wt}#n(e,t){const n=new C({label:`maskWith: ${e}`,children:[t,this.output.children[0]]});return this.output.addChild(n),n.setMask({mask:t,inverse:!0}),this.#e.set(e,n),n}#r(e,t){const[n,r]=t.children,s=t.parent;s.removeChild(t),s.addChild(r),t.mask=null,n.destroy(),t.destroy(),this.#e.delete(e)}#s(){const{pixiRenderer:e}=this.renderContext.general,t=this.#o();for(const n of this.#e.keys())if(!t.has(n)){const r=this.#e.get(n);if(r)try{this.#r(n,r)}catch(s){throw new Error(`error while destroying masking container ${ao(r)} 
              for our rendering: ${ao(this.output)}`,{cause:s})}}for(const n of t){const r=this.#e.get(n),s=r?.children[0],i=this.renderContext.getItemRenderPipeline(n)?.itemAppearanceRenderer?.output;if(i===void 0)throw new Error("nothing to use as a mask");const a=i.filters;i.filters=ia;const l=xe(e,i,s,`red mask: ${n}`);i.filters=a,r===void 0&&this.#n(n,l);const c=this.renderContext.room.items[n],u=Ae(O(c.state.position),O(this.renderContext.item.state.position));l.x=u.x,l.y=u.y}}destroy(){this.output.destroy({children:!0}),this.wrappedRenderer?.destroy()}}const Zn=(o,e=1)=>({renderContext:{item:{state:{facing:t}}},currentRendering:n})=>{const r=n?.renderProps,s=vn(t)??"towards";if(!(r===void 0||s!==r.facingXy4))return"no-update";const a=v({textureId:s==="left"||s==="away"?`shadowMask.${o}.away`:`shadowMask.${o}.right`,spritesheetVariant:"original"});return a.y=-(z.z*(e-1)),a.scale.x=s==="away"||s==="right"?1:-1,{output:a,renderProps:{facingXy4:s}}},rf={left:"away",towardsLeft:"awayRight",towards:"right"},sf=(o,e,t)=>{if(!e)return`shadowMask.${o}.${t}`;const n=`shadowMask.${o}.falling.${t}`;return Gt(n)?n:`shadowMask.${o}.${t}`},Jn=(o,e=1)=>({renderContext:{item:t},currentRendering:n})=>{const r=t.type==="sceneryPlayer"?"idle":t.state.action,s=n?.renderProps,i=t.type==="sceneryPlayer"?t.config.startDirection:Cn(t.state.visualFacingVector??t.state.facing)??"towards",a=r==="falling";if(!(s===void 0||i!==s.facingXy8||a!==s.falling))return"no-update";const c=rf[i],d=sf(o,a,c??i),h=v({textureId:d,spritesheetVariant:"original"});return h.y=-(z.z*(e-1)),h.scale.x=c===void 0?1:-1,{output:h,renderProps:{facingXy8:i,falling:a}}},hs=({renderContext:{general:{pixiRenderer:o},item:e,room:t},currentRendering:n})=>{const{type:r,state:{stoodOnBy:s},config:{times:i}}=e,a=n?.renderProps,l=Tn(e),c=l&&nt(s,t).find(ke)!==void 0;return a===void 0||l!==a.activated||c!==a.flashing?{output:It(o,Rn({textureId:c?`shadowMask.${r}.flashing`:l?`shadowMask.${r}`:"shadowMask.artificial",spritesheetVariant:"original"},i)),renderProps:{flashing:c,activated:l}}:"no-update"},Kn={lift:ae({textureId:"shadowMask.smallBlock",spritesheetVariant:"original"}),conveyor:_e(({direction:o})=>({textureId:"shadowMask.conveyor",flipX:vt(o)==="x",spritesheetVariant:"original"})),doorLegs:_e(({direction:o})=>({textureId:o==="right"||o==="towards"?"shadowMask.door.floatingThreshold.double.y":"shadowMask.door.legs.threshold.double.y",flipX:vt(o)==="y",spritesheetVariant:"original"})),teleporter:hs,portableTeleporter:hs,floor:"no-mask",barrier:_e(({axis:o})=>({textureId:"shadowMask.barrier.y",flipX:o==="x",y:-1,spritesheetVariant:"original"})),spring:ph,block:_e(({style:o})=>({textureId:`shadowMask.${o}`,spritesheetVariant:"original"})),pushableBlock:ae({textureId:"shadowMask.stepStool",spritesheetVariant:"original"}),movingPlatform:ae({textureId:"shadowMask.sandwich",spritesheetVariant:"original"}),hushPuppy:ae({textureId:"shadowMask.hushPuppy",spritesheetVariant:"original"}),portableBlock:_e(({style:o})=>({textureId:o==="drum"?"shadowMask.drum":"shadowMask.smallBlock",spritesheetVariant:"original"})),slidingBlock:_e(({style:o})=>o==="book"?{textureId:"shadowMask.book",flipX:!0,spritesheetVariant:"original"}:{textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),deadlyBlock:_e(({style:o})=>({textureId:o==="volcano"?"shadowMask.volcano":"shadowMask.toaster",spritesheetVariant:"original"})),spikes:ae({textureId:"shadowMask.spikes",spritesheetVariant:"original"}),switch:ae({textureId:"shadowMask.switch",spritesheetVariant:"original"}),button:ae({textureId:"shadowMask.buttonInGame",spritesheetVariant:"original"}),pickup:_e(({gives:o})=>{switch(o){case"scroll":return{textureId:"shadowMask.scroll",spritesheetVariant:"original"};case"doughnuts":return{textureId:"shadowMask.doughnuts",spritesheetVariant:"original"};case"fast":case"extra-life":case"jumps":case"shield":return{textureId:"shadowMask.whiteRabbit",spritesheetVariant:"original"};default:return{textureId:"blank",spritesheetVariant:"original"}}}),slidingDeadly:ae({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),ball:ae({textureId:"shadowMask.ball",spritesheetVariant:"original"}),"monster.dalek":ae({textureId:"shadowMask.dalek",spritesheetVariant:"original"}),"monster.turtle":Zn("turtle"),"monster.skiHead":Zn("skiHead"),"monster.homingBot":ae({textureId:"shadowMask.smallRound",spritesheetVariant:"original"}),joystick:ae({textureId:"shadowMask.joystick",spritesheetVariant:"original"}),charles:Zn("charles",2),head:Jn("head"),heels:Jn("heels"),headOverHeels:Jn("head",2)},af=o=>{switch(o.type){case"sceneryPlayer":return Kn[o.config.which];case"monster":return Kn[`monster.${o.config.which}`];case"floor":return o.config.floorType==="none"?void 0:"no-mask";default:return Kn[o.type]}},lf=.66,cf=o=>o.shadowCastTexture!==void 0,lt={id:"spaceAbove",state:{position:{x:0,y:0,z:0}},aabb:{x:0,y:0,z:Vs}};class uf{constructor(e,t){this.renderContext=e,this.appearance=t,this.#e.addChild(this.#t),this.#r||(this.#e.filters=new Gc({alpha:lf}))}#e=new C({label:"ItemShadowRenderer"});#t=new C({label:"shadows"});#o;#n=new Map;initShadowMaskRenderer(){const{renderContext:e,appearance:t}=this;if(t!=="no-mask")if(this.#o=new ra(e,t),e.item.shadowOffset===void 0)this.#e.addChild(this.#o.output);else{const n=new C({label:"shadowMaskOffset",children:[this.#o.output],...O(e.item.shadowOffset)});this.#e.addChild(n)}}get#r(){return B.getState().gameMenus.userSettings.displaySettings.showShadowMasks}#s(e){if(this.#o===void 0)return;const t=this.#o.output.children.at(0);this.#o.tick(e);const n=this.#o.output.children.at(0);if(n===void 0||!(n instanceof te)){const{item:r}=this.renderContext;throw new Error(`ItemShadowRenderer: this.#shadowMaskRenderer didn't create a sprite for item "${r.id}" of type "${r.type}". Have got ${n}`)}t!==n&&(this.#r?this.renderContext.frontLayer.attach(n):this.#e.mask=n)}destroy(){this.#e.destroy(!0),this.#o?.destroy();for(const e of Object.values(this.#n))e.sprite.destroy()}tick(e){const{movedItems:t}=e,{item:n,general:{pixiRenderer:r},room:s}=this.renderContext,i=t.has(n),a=n.state.position.z+n.aabb.z;lt.state.position.x=n.state.position.x,lt.state.position.y=n.state.position.y,lt.state.position.z=a,lt.aabb.x=n.aabb.x,lt.aabb.y=n.aabb.y;const l=new Set(Po(lt,s[Ht],u=>u!==n&&cf(u)&&(u.castsShadowWhileStoodOn||u.state.position.z>n.state.position.z+n.aabb.z)&&!u.noShadowCastOn?.includes(n.type)));let c=!1;for(const[u,d]of this.#n)l.has(u)||(this.#t.removeChild(d),d.destroy(),this.#n.delete(u));for(const u of l){c=!0;let d=this.#n.get(u),h=!1;if(!d){const{times:p}=u.config,{shadowCastTexture:f}=u,m=Rn(typeof f=="string"?{textureId:f}:f,p);d=It(r,m),d.label=u.id,this.#t.addChild(d),this.#n.set(u,d),h=!0}if(h||i||t.has(u)){const p=O({...Wt(Ae(u.state.position,n.state.position),u.shadowOffset??jt),z:n.aabb.z});d.x=p.x,d.y=p.y}}this.#e.visible=c,c?(this.#o===void 0&&this.initShadowMaskRenderer(),this.#s(e)):this.#o!==void 0&&(this.#o.destroy(),this.#o=void 0)}get output(){return this.#e}}const df=o=>{const e=af(o.item);return e===void 0?void 0:new uf(o,e)};class hf{constructor(e,t){this.renderContext=e,this.componentRenderers=t,this.output={graphics:t.graphics?.output,sound:t.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}class pf{constructor(e,t){this.renderContext=e,this.childRenderer=t,this.output.addChild(t.output);const{general:{colourised:n},room:r}=e;this.#e=new Fe({color:n?(r.color.shade==="dimmed"?In:S).moss:se(r.color)}),this.#e.enabled=!1,this.output.filters=this.#e}output=new C({label:"PortableItemPickUpNextHighlightRenderer"});#e;tick(e){const{wouldPickUpNext:t}=this.renderContext.item.state;this.#e.enabled=t,this.childRenderer.tick(e)}destroy(){this.output.destroy(),this.childRenderer.destroy()}}const ff=(o,e,t)=>Ro(o)?new pf(e,t):t,mf=(o,e)=>{const{gameMenus:{cheatsOn:t}}=B.getState();e!==void 0&&t&&(e.eventMode="static",e.on("pointertap",()=>{B.dispatch(gl({item:o,pixiContainer:e}))}))},gf=o=>{const e=B.getState(),t=fl(e),n=!ml(e),{general:{paused:r}}=o,{item:s}=o,i=t==="all"||t==="non-wall"&&o.item.type!=="wall",a=[],l=ta(s);let c;if(l!==void 0){c=new ra(o,l);const f=nf(o,c);a.push(Jp(s,o,ff(s,o,f)))}if(n&&!r){const f=df(o);f!==void 0&&a.push(f)}i&&a.push(new Qp(o));let u;if(a.length===0)u=void 0;else{const f=a.length===1?a[0]:new Gp(a,o);u=new of(o,f),mf(s,u.output)}const d=o.general.soundSettings.mute??et.soundSettings.mute,h=r||d?void 0:Op(o),p=h===void 0?void 0:s.noSoundPan?h:new Dp(o,h);return{top:new hf(o,{graphics:u,sound:p}),itemAppearanceRenderer:c}},xf=o=>{for(const[,l]of o)for(const[c]of l)l.set(c,!1);const e=Array.from(bf(o));let t=e.length,n=t;const r=new Array(t),s={},i=yf(e);for(;n--;)s[n]||a(e[n],n,new Set,null);return r;function a(l,c,u,d){if(u.has(l)){if(d!==null){const f=o.get(d);f?.has(l)&&(console.groupEnd(),f.set(l,!0))}return}if(s[c])return;s[c]=!0;const h=o.get(l),p=Array.from(h?.entries()??wt);if(c=p.length){u.add(l);do{const[f,m]=p[--c];m||a(f,i.get(f),u,l)}while(c);u.delete(l)}r[--t]=l}};function bf(o){const e=new Set;for(const[t,n]of o.entries()){e.add(t);for(const r of n.keys())e.add(r)}return e}function yf(o){const e=new Map;for(let t=0,n=o.length;t<n;t++)e.set(o[t],t);return e}const vf=(o,e,t,n)=>(o.has(e)||o.set(e,new Map),o.get(e).set(t,n),o),Rt=(o,e,t)=>{const n=o.get(e);return n!==void 0&&(n.delete(t),n.size===0&&o.delete(e)),o},Qn=1e-5,ps=-.1,Bt=(o,e,t,n,r)=>n-r>o&&t<e-r,wf=0,aa=1,la=2,ca=3,Sf=(o,e)=>{const t=Bt(o.zAxisProjectionMin,o.zAxisProjectionMax,e.zAxisProjectionMin,e.zAxisProjectionMax,Qn),n=Bt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,Qn),r=Bt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,Qn);return n&&r&&t?aa:r&&t&&Bt(o.xAxisProjectionMin,o.xAxisProjectionMax,e.xAxisProjectionMin,e.xAxisProjectionMax,ps)?la:n&&t&&Bt(o.yAxisProjectionMin,o.yAxisProjectionMax,e.yAxisProjectionMin,e.yAxisProjectionMax,ps)?ca:wf},So=2,fs=(o,e,t,n)=>{const r=o.x,s=r+e.x,i=t.x;if(s<=i)return 1;const a=i+n.x;if(r>=a)return-1;const l=o.y,c=l+e.y,u=t.y;if(c<=u)return 1;const d=t.y+n.y;if(l>=d)return-1;const h=o.z,p=h+e.z,f=t.z;if(p<=f)return-1;const m=t.z+n.z;return h>=m?1:So},Cf=(o,e,t,n)=>{const r=o.x,s=r+e.x,i=t.x,a=i+n.x,l=o.y,c=l+e.y,u=t.y,d=u+n.y,h=o.z,p=h+e.z,f=t.z,m=f+n.z,x=s-i,g=c-u,_=p-f,T=a-r,y=d-l,b=m-h,w=Math.abs(x)<Math.abs(T)?x:-T,k=Math.abs(g)<Math.abs(y)?g:-y,I=-(Math.abs(_)<Math.abs(b)?_:-b),F=Math.abs(w),L=Math.abs(k),R=Math.abs(I);return F<L?F<R?w:I:L<R?k:I},Tf=(o,e,t)=>{if(o.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=o.state.position,r=o.renderAabbOffset?fe(n,o.renderAabbOffset):n,s=o.renderAabb||o.aabb,i=e.state.position,a=e.renderAabbOffset?fe(i,e.renderAabbOffset):i,l=e.renderAabb||e.aabb;switch(Sf(t.getItemAxesProjections(o),t.getItemAxesProjections(e))){case aa:{let u=fs(r,s,a,l);return u===So&&(o.renderAabbOffset!==void 0||o.renderAabb!==void 0||e.renderAabbOffset!==void 0||e.renderAabb!==void 0)&&(u=fs(n,o.aabb,i,e.aabb)),u===So&&(u=Cf(r,s,a,l)),u}case la:return ye(r.y,a.y+l.y)&&ye(r.z,a.z+l.z)?1:ye(a.y,r.y+s.y)&&ye(a.z,r.z+s.z)?-1:a.y-a.z-(r.y-r.z);case ca:return ye(r.x,a.x+l.x)&&ye(r.z,a.z+l.z)?1:ye(a.x,r.x+s.x)&&ye(a.z,r.z+s.z)?-1:a.x-a.z-(r.x-r.z);default:return 0}},kf=(o,e=new xl(qe(o)),t=qe(o),n=new Map)=>{const r=new Map;for(const[s,i]of n)if(!o[s])n.delete(s);else for(const[a]of i)o[a]||Rt(n,s,a);for(const s of t)e.updateItemProjectedIndex(s);for(const s of t){if(s.fixedZIndex!==void 0)continue;const i=e.getItemProjectedNeighbourhood(s);{const a=n.get(s.id);a?.forEach((l,c)=>{i.has(o[c])||a.delete(c)}),n.forEach((l,c)=>{i.has(o[c])||Rt(n,c,s.id)})}for(const a of i){if(a.fixedZIndex!==void 0||r.get(a)?.has(s))continue;const l=Tf(s,a,e);if(r.has(s)||r.set(s,new Set),r.get(s).add(a),l===0){Rt(n,s.id,a.id),Rt(n,a.id,s.id);continue}const c=l>0?s.id:a.id,u=l>0?a.id:s.id;vf(n,u,c,!1),Rt(n,c,u)}}return n};class If{constructor(e){this.renderContext=e;const{general:{colourised:t,soundSettings:n},room:r}=e,i=n.mute??et.soundSettings.mute?void 0:M.createGain();this.output={sound:i,graphics:new C({label:`RoomRenderer(${e.room.id})`})},this.output.graphics.addChild(this.#t),t||(this.#o=new Ir({sortableChildren:!1}),this.output.graphics.addChild(this.#o)),this.output.graphics.addChild(this.#n),t||(this.#t.tint=se(r.color))}#e=!1;#t=new C({label:"items",cullableChildren:!0});#o;#n=new Ir({sortableChildren:!1});output;#r=void 0;#s=new Map;#i=new Map;#l=e=>this.#i.get(e);#a(e,t){let n=this.#i.get(t.id);if(n===void 0){n=gf({...this.renderContext,colourClashLayer:this.#o,frontLayer:this.#n,item:t,zEdges:this.#s,getItemRenderPipeline:this.#l}),this.#i.set(t.id,n);const{graphics:r,sound:s}=n.top.output;if(r&&(this.#t.addChild(r),t.fixedZIndex&&(r.zIndex=t.fixedZIndex)),s){if(!this.output.sound)throw new Error("item renderer has sound, but room renderer does not - this probably means that they disagree on if the user has sound muted");s.connect(this.output.sound)}}try{n.top.tick(e)}catch(r){throw new Error(`RoomRenderer: error while ticking item "${t.id}"
in room "${this.renderContext.room.id}"
item in play object is:
           
${JSON.stringify(t,null,2)}`,{cause:r})}}#c(e){const{room:t}=this.renderContext,n={...e,lastRenderRoomTime:this.#r},r=new Set,s=a=>{if(r.has(a))return;const l=this.#s.get(a);if(l)for(const[c,u]of l.entries())u&&s(c);this.#a(n,t.items[a]),r.add(a)};for(const a in t.items)s(a);let i=!1;for(const[a,l]of this.#i.entries())t.items[a]===void 0&&(l.top.destroy(),this.#i.delete(a),i=!0);i&&this.#u()}#u(){if(this.#o)for(const e of this.#o.renderLayerChildren)e.parent===null&&this.#o.detach(e);for(const e of this.#n.renderLayerChildren)e.parent===null&&this.#n.detach(e)}#h(e){for(let t=0;t<e.length;t++){const n=this.#i.get(e[t]);if(n===void 0)throw new Error(`Item id=${e[t]} does not have a renderer - cannot assign a z-index`);const r=n.top.output.graphics;if(!r)throw new Error(`order ${e[t]} was given a z-order by sorting, but item has no graphics`);r.zIndex=t}}get#d(){return this.#r!==void 0}tick(e){const t=this.#d?e:{...e,movedItems:new Set(ce(this.renderContext.room.items))},{renderContext:{room:n}}=this;kf(n.items,n[Ht],t.movedItems,this.#s);const r=xf(this.#s);this.#c(t),(!this.#d||t.movedItems.size>0)&&this.#h(r),this.#r=this.renderContext.room.roomTime}destroy(){this.output.graphics.label=this.output.graphics.label+"DESTROYED",this.output.graphics.destroy({children:!0});const{sound:e}=this.output;if(e){const t=er*1e3;setTimeout(()=>{e.disconnect()},t)}this.#i.forEach(t=>{t.top.destroy()}),this.#e=!0}get destroyed(){return this.#e}}const ct=.4,_f=300,Pf=36,Mf=.2,Rf=1250,ms=(o,e)=>bl(o,Math.min(1,e/_f)),eo=64;class Bf{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:n,general:{upscale:{gameEngineScreenSize:r},displaySettings:s}}=e,i=e.general.onScreenControls??et.onScreenControls,{floors:{edgeLeftX:a,edgeRightX:l,bottomEdgeY:c},allItems:{topEdgeY:u}}=Uo(n);this.#l=a,this.#a=l;let d=(l+a)/2;const h=l-a,p=c-u,f=r.y>=p,m=r.x>=h,x=f&&m;m&&!i&&(d/=2);const g=i?-4:f?16:0;this.#c={x:r.x/2-d,y:f&&i?Math.floor((r.y+p)/2)-4:r.y-g-c-(x&&!i?Math.abs(d/2):0)},this.#r=this.#c.x+this.#l<0,this.#s=this.#c.x+this.#a>r.x,this.#i=this.#c.y+u<0;const _=this.childRenderer.output.graphics;if(_===void 0)throw new Error("can't scroll a renderer without graphics");const T={sound:this.childRenderer.output.sound,graphics:new C({children:[_],label:`RoomScrollRenderer(${n.id})`})};(s?.showBoundingBoxes??et.displaySettings.showBoundingBoxes)!=="none"&&T.graphics.addChild(Af(e.room)),this.output=T}#e={x:0,y:0};#t={x:0,y:0};#o=Dt;#n=!1;#r;#s;#i;#l;#a;#c;output;#u(e){const{general:{upscale:{gameEngineScreenSize:t},onScreenControls:n}}=this.renderContext,r=O(e);let s,i;const a=n?eo:0,{x:l,y:c}=this.#c,u=Wt(r,this.#c);if(this.#r&&u.x<t.x*ct){const d=Math.max(r.x,n?this.#l+eo:Number.NEGATIVE_INFINITY),h=t.x*ct-d;s=Math.min(-this.#l+a,h)}else if(this.#s&&u.x>t.x*(1-ct)){const d=Math.min(r.x,n?this.#a-eo:Number.POSITIVE_INFINITY),h=t.x*(1-ct)-d;s=Math.max(t.x-this.#a-a,h)}else s=l;return this.#i&&u.y<t.y*ct?i=t.y*ct-r.y:i=c,{x:s,y:i}}#h(){const{general:{upscale:{gameEngineUpscale:e}}}=this.renderContext,t=this.#e,n=this.output.graphics,r=Wt(t,this.#t);sa(n,r.x,r.y,e)}#d(e){const{general:{gameState:t},room:{roomTime:n}}=this.renderContext,{deltaMS:r}=e,{inputStateTracker:{lookVector:s,hudInputState:{lookVector:i}}}=t;Fn(s)+Fn(i)<Re?this.#o<n-Rf&&(this.#t=Ae(this.#t,ms(this.#t,r))):(this.#o=n,this.#t=Lo(fe(this.#t,Oe(s,r*Mf)),i),i.x=0,i.y=0)}tick(e){const{general:{gameState:t}}=this.renderContext,{deltaMS:n}=e;this.#d(e);const r=Xt(t);if(r===void 0)return;const s=this.#u(r.state.position);if(!this.#n)this.#e=s;else{const a=Ae(this.#e,s);if(Fn(a)>Pf){const l=ms(a,n);this.#e={x:this.#e.x-l.x,y:this.#e.y-l.y}}}this.#h(),this.#n=!0,this.childRenderer.tick(e)}destroy(){this.output.graphics.destroy({children:!0}),this.childRenderer.destroy()}}const Af=o=>{const{floors:{edgeLeftX:e,edgeRightX:t,bottomEdgeY:n,topEdgeY:r},allItems:{topEdgeY:s}}=Uo(o);return new ue().rect(e,s,t-e,n-s).stroke("red").rect(e,r,t-e,n-r).stroke("blue")};var Of=`#version 300 es
precision highp float;const float lutW=512.0;ivec2 blockEncode(vec3 color){ivec3 c6=ivec3(floor(color*63.0+0.5));int blockX=(c6.b % 8)*64;int blockY=(c6.b/8)*64;int x=blockX+c6.r;int y=blockY+c6.g;return ivec2(x,y);}vec4 lutColourReplace(sampler2D lut,vec4 inputColour){ivec2 lutPos=blockEncode(inputColour.rgb);vec2 normalizedPos=vec2((float(lutPos.x)+0.5)/lutW,(float(lutPos.y)+0.5)/lutW);vec4 replacementColour=texture(lut,normalizedPos);float shouldReplace=step(0.99,inputColour.a)*step(0.004,replacementColour.a);vec4 replacement=vec4(replacementColour.rgb,inputColour.a);return mix(inputColour,replacement,shouldReplace);}const vec3 channelPerceptualBrightness=vec3(0.3,0.6,0.1);float luminance(vec3 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float luminance(vec4 color){return color.r*channelPerceptualBrightness.r+color.g*channelPerceptualBrightness.g+color.b*channelPerceptualBrightness.b;}float isNotBlack(vec4 color,float blackPoint){float lum=luminance(color.rgb);return step(blackPoint,lum);}const int sampleCount=4;const float dimmedAttributeLum=0.6;const float isDimThresh03=1.5;const float saturationThreshold=0.15;const vec3 channelStrengthModifier=vec3(0.8,1.0,1.1);const vec4 pureWhiteColour=vec4(1.0,1.0,1.0,1.0);const vec4 pureBlueColour=vec4(0.0,0.0,1.0,1.0);const vec4 pureBlackColour=vec4(0.0,0.0,0.0,1.0);vec2 attributeBlockPos(vec2 texSize,float blockSize,vec2 textureCoord){vec2 pixelPos=textureCoord*texSize;return(floor(pixelPos/blockSize)*blockSize)/texSize;}vec4 attributeClash(sampler2D inputTexture,sampler2D lut,float blockSize,float blackPoint,float inputDim,vec2 textureCoord){vec2 textureSize=vec2(textureSize(inputTexture,0));vec2 blockPos=attributeBlockPos(textureSize,blockSize,textureCoord);vec3 colorSum=vec3(0.0);float colouredSamplesCount=0.001;vec2 stepSize01=vec2(blockSize/float(sampleCount))/textureSize;vec2 samplePos01=blockPos;for(int y=0;y<sampleCount;y++){samplePos01.y+=stepSize01.y;samplePos01.x=blockPos.x;for(int x=0;x<sampleCount;x++){samplePos01.x+=stepSize01.x;vec4 sampleColor=lutColourReplace(lut,texture(inputTexture,samplePos01))*inputDim;float isInBounds=step(0.0,samplePos01.x)*step(samplePos01.x,1.0)*step(0.0,samplePos01.y)*step(samplePos01.y,1.0);float useSample=isNotBlack(sampleColor,blackPoint)*isInBounds;colorSum+=sampleColor.rgb*sampleColor.rgb*useSample;colouredSamplesCount+=useSample;}}vec3 avgColor=colorSum/colouredSamplesCount;float avgColorLum03=max(avgColor.r+avgColor.g+avgColor.b,0.01);vec3 channelsStrength=avgColor/avgColorLum03;vec4 quantisedColor=vec4(step(0.3,channelsStrength*channelStrengthModifier),0.1);float maxChannel=max(channelsStrength.r,max(channelsStrength.g,channelsStrength.b));float minChannel=min(channelsStrength.r,min(channelsStrength.g,channelsStrength.b));float sat=maxChannel-minChannel;float isSaturated01=step(saturationThreshold,sat);float isBright=step(isDimThresh03,avgColorLum03);float thresholdForUnsatToBeBlue=step(isDimThresh03*0.3,avgColorLum03);float thresholdForSaturatedToBeBlue=step(isDimThresh03*0.03,avgColorLum03);vec4 unsatOrQuantisedColor=mix(mix(pureBlueColour,pureWhiteColour,thresholdForUnsatToBeBlue),mix(pureBlueColour,quantisedColor,thresholdForSaturatedToBeBlue),isSaturated01);float dimMultiplier=mix(dimmedAttributeLum,1.0,isBright);vec4 dimmedColor=unsatOrQuantisedColor*dimMultiplier;vec4 c=lutColourReplace(lut,texture(inputTexture,textureCoord))*inputDim;float originalColorIsNotBlack=isNotBlack(c,blackPoint);return mix(pureBlackColour,dimmedColor,originalColorIsNotBlack);}in vec2 vTextureCoord;out vec4 finalColor;uniform sampler2D uTexture;uniform float uBlockSize;uniform float uBlackPoint;uniform float uProgress;uniform sampler2D uLut;uniform float uCentreX;uniform float uCentreY;uniform vec4 uInputClamp;const float blackCircleMinSize=0.33;const float blackCircleFeathering=0.4;const float fadeDuration=0.1;float fade(){return 1.0-smoothstep(1.0 - fadeDuration,1.0,uProgress);}float blockDistToCentre(float ellipticalFactor){float xCentreTrue=uInputClamp.x+(uInputClamp.z-uInputClamp.x)*uCentreX;float yCentreTrue=uInputClamp.y+(uInputClamp.w-uInputClamp.y)*uCentreY;vec2 trueCentre=vec2(xCentreTrue,yCentreTrue);vec2 texSize=vec2(textureSize(uTexture,0));float texAspect=texSize.x/texSize.y;vec2 blockPos=attributeBlockPos(texSize,uBlockSize,vTextureCoord);return length((blockPos-trueCentre)/vec2(1,texAspect*ellipticalFactor));}float isInCirc(float blockDistToCentre01,float feathering,float circleMinSize,float progress){return smoothstep(progress-feathering,progress+feathering,pow(1.0-blockDistToCentre01,3.0)+circleMinSize);}void main(void){float elipticalFactor=mix(1.0,0.5,uProgress);float blockDistToCentre=blockDistToCentre(elipticalFactor);float insideBlackCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,blackCircleMinSize,uProgress-0.2);float insideInnerCirc01=isInCirc(blockDistToCentre,blackCircleFeathering,0.0,uProgress*1.5-0.3);vec4 clashColour=attributeClash(uTexture,uLut,uBlockSize,uBlackPoint,max(insideBlackCirc01-pow(uProgress,4.0),0.0),vTextureCoord);vec4 c=texture(uTexture,vTextureCoord);finalColor=mix(clashColour,c,insideInnerCirc01*fade());}`;const Ff=Z.from({vertex:Le,fragment:Of,name:"attribute-block-filter"});class Lf extends q{uniforms;constructor({blockSize:e=8,blackPoint:t=.1,centreX:n=.5,centreY:r=.5}={}){super({glProgram:Ff,resources:{attributeBlockUniforms:{uBlockSize:{value:e,type:"f32"},uBlackPoint:{value:t,type:"f32"},uProgress:{value:0,type:"f32"},uCentreX:{value:n,type:"f32"},uCentreY:{value:r,type:"f32"}},uLut:Cc.source}}),this.uniforms=this.resources.attributeBlockUniforms.uniforms}set progress(e){this.resources.attributeBlockUniforms.uniforms.uProgress=e}set centreX(e){this.resources.attributeBlockUniforms.uniforms.uCentreX=e}set centreY(e){this.resources.attributeBlockUniforms.uniforms.uCentreY=e}}class Ef{constructor(e,t){this.renderContext=e,this.childRenderer=t;const{room:n}=e,r=this.childRenderer.output.graphics,s={sound:this.childRenderer.output.sound,graphics:new C({children:[r],label:`TeleportEffectRenderer(${n.id})`})};this.output=s,this.#o()}output;#e;#t(e){const t=fe(e.state.position,Oe(e.aabb,.5)),{renderContext:{general:{upscale:{rotate90:n}}}}=this,{x:r,y:s}=O(t),i=this.output.graphics.getLocalBounds();this.output.graphics.filterArea=i.rectangle;const a=(r-i.x)/i.width,l=(s-i.y)/i.height;n?(this.#e.centreX=1-l,this.#e.centreY=a):(this.#e.centreX=a,this.#e.centreY=l)}#o(){const{renderContext:{general:{gameState:{currentCharacterName:e}},room:{items:t,id:n}}}=this,r=t[e];if(r!==void 0){const{teleporting:s}=r.state,i=s!==null&&s.otherRoom!==n;if(this.#e!==void 0!==i)if(i){const{renderContext:{general:{upscale:{gameEngineUpscale:l}}}}=this;this.#e=new Lf({blockSize:l*8}),this.#t(r),this.output.graphics.filters=[this.#e]}else this.#e=void 0,this.output.graphics.filters=bt;else if(i){const{startRoomTime:l,phase:c}=s,d=Math.max(0,ar-(this.renderContext.room.roomTime-l))/ar,h=c==="in"?d:1-d;this.#e.progress=h,this.#t(r)}}}tick(e){this.childRenderer.tick(e),this.#o()}destroy(){this.output.graphics.destroy({children:!0}),this.#e?.destroy(),this.childRenderer.destroy()}}const At=o=>({avgMs:o.avgMs.toFixed(2),percentage:o.percentage.toFixed(1)+"%",fps:(1e3/o.avgMs).toLocaleString("en-GB",{maximumFractionDigits:0})}),zf=o=>{const{frameCount:e,fps:t,theoreticalFps:n,phases:r,elapsedMs:s}=o;console.log(`Frame timing (${e} frames in ${(s/1e3).toFixed(3)}s, ${t.toFixed(1)} fps, theoretical max: ${n.toLocaleString("en-GB",{minimumFractionDigits:1,maximumFractionDigits:1})} fps):`),console.table({physics:At(r.physics),hudUpdateSceneGraph:At(r.hudUpdateSceneGraph),updateSceneGraph:At(r.updateSceneGraph),"pixi.js app.render":At(r.pixiRender),total:{...At(r.total),percentage:"100%"}})},Uf=()=>{typeof window<"u"&&(window.detailedFps=()=>{$t.on(zf)},console.log("%cPerformance timing available:","color: #4CAF50; font-weight: bold"),console.log("call detailedFps() to log detailed frame timing stats to the console (and turn on FPS with F9 or in menus)"))},Df=o=>{for(const e of ce(o.items))try{for(const t of nt(e.state.stoodOnBy,o)){if(!o.items[t.id]){to(t,o);continue}if(!yl(t,e)){to(t,o);const n=Es(t,Do(o.items));n!==void 0&&Fs({above:t,below:n})}}}catch(t){throw new Error(`could not update standing on for item "${e.id}"`,{cause:t})}},gs=Ms*Je.animations["particle.head.fade"].length*(1/Je.animations["particle.head.fade"].animationSpeed),Gf=20,Wf=38,Vf=.5,an=z.x/2;let $f=0;const ua=(o,e)=>Math.random()<o*(e/1e3),da=(o,e,t,n)=>({...Zs,id:`particle.${o}.${$f++}`,type:"particle",aabb:he,config:{forCharacter:e},state:{...qs(),expires:n+gs+Math.random()*gs,position:t}}),ha=(o,e,t,n)=>{if(!ua(t,n))return;const r={...fe(Sl(o),{x:Math.random()*an-an/2,y:Math.random()*an-an/2}),z:o.state.position.z};Nt({room:e,item:da(o.id,o.type,r,e.roomTime)})},Hf=(o,e,t)=>{!(Hs(o.state)>0)||o.state.standingOnItemId===null||yn(o.state.vels.walking)<Re||ha(o,e,Gf,t)},Nf=(o,e,t)=>{const{isBigJump:n}=o.state;n&&o.state.standingOnItemId===null&&(o.state.vels.gravity.z<=0||ha(o,e,Wf,t))},jf=(o,e)=>{const{head:t,heels:n}=Ys(o.items);t!==void 0&&Hf(t,o,e),n!==void 0&&Nf(n,o,e)},Xf=(o,e,t)=>{if(!ua(Vf,t))return;const n=vl(wl),r=fe(e.state.position,{x:n==="x"?0:Math.random()*z.x,y:n==="y"?0:Math.random()*z.y,z:n==="z"?z.z:Math.random()*z.z});Nt({room:o,item:da(e.id,"crown",r,o.roomTime)})},Yf=(o,e,t)=>{o.gameTime+=t,e.roomTime+=t;const n=Xt(o);if(n!==void 0){if(n.type==="headOverHeels")n.state.head.gameTime+=t,n.state.heels.gameTime+=t;else if(n.state.gameTime+=t,o.characterRooms.head===o.characterRooms.heels){const s=Cl(o,Tl(n.type));s!==void 0&&(s.state.gameTime+=t)}}},qf=o=>{for(const e of ce(o.items)){const t=e.state.position,n=kl(t);n!==t&&Js(o,e,n)}},Zf=(o,e)=>o.state.expires!==null&&o.state.expires<e.roomTime,Jf=(o,e)=>{const t={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1,wall:1,floor:1},n=t[o.type]??0,r=t[e.type]??0;return n-r},Kf=(o,e)=>{const{actedOnAt:t}=o.state,n=e===t.roomTime;if(n&&t.actedInXY)return;const{position:r}=o.state,s=!Number.isInteger(r.x)||!Number.isInteger(r.y),i=!n||!t.actedInZ,a=i&&!Number.isInteger(r.z);if(!(!s&&!a))return{x:Math.round(r.x),y:Math.round(r.y),z:i?Math.round(r.z):r.z}},Qf=(o,e)=>{for(const t of ce(o.items)){if(!yt(t))continue;const n=Kf(t,o.roomTime);if(n===void 0)continue;const{id:r}=t,s=l=>l.id!==r&&Mo(l,t),i={id:r,aabb:t.aabb,state:{position:n}};Il(i,o[Ht],s)||(Js(o,t,n),e.add(t))}},pa=Object.freeze({movementType:"steady",stateDelta:{activated:!0,everActivated:!0}}),em=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),ln=z.x*3,tm=(o,e)=>{const{state:{position:t}}=o,{state:{position:n}}=e;return t.x>n.x-ln&&t.x<n.x+ln&&t.y>n.y-ln&&t.y<n.y+ln},xs=(o,e,t,n,r)=>{if(r&&o.state.activated)return St;const s=_l(o.state.position,e);return s===void 0?St:tm(o,s)?pa:em},nm=(o,e,t,n)=>o.state.activated?St:nt(o.state.stoodOnBy,e).some(ke)?pa:St,om=(o,e,t,n)=>{switch(o.config.activated){case"after-player-near":return xs(o,e,t,n,!0);case"while-player-near":return xs(o,e,t,n,!1);case"on-stand":return nm(o,e);case"off":case"on":return St;default:throw o.config,new Error(`unrecognised item.config.activation ${o.config.activated} in ${o.id}:
        ${JSON.stringify(o,null,2)}`)}},rm={movementType:"steady",stateDelta:{pressed:!0}},sm={movementType:"steady",stateDelta:{pressed:!1}},im=(o,e)=>{const{state:{stoodOnUntilRoomTime:t,stoodOnBy:n,pressed:r}}=o,s=t+Ml,{roomTime:i}=e,a=!Vo(Pl(n));return!a&&i>s&&r?(lr(o.config.modifies,"right",o,e),sm):!r&&a?(lr(o.config.modifies,"left",o,e),rm):St},am=(o,e,t,n)=>{const{id:r,state:s,config:i}=o,{roomTime:a}=e,{lastEmittedAtRoomTime:l,quantityEmitted:c,position:u}=s,d=s.emits??i.emits,h=s.period??i.period,p=s.maximum??i.maximum;if(c!==p&&l+h<a){const f=Rl(Bl(`${r}-${c}-${a}`,{...d,position:he},e.roomJson));if(f===void 0)throw new Error("emitter failed to create a new item");Nt({room:e,item:f,atPosition:Lo(u,Oe(f.aabb,.5))}),o.state.lastEmittedAtRoomTime=e.roomTime+h,o.state.quantityEmitted++}},lm=Object.freeze({textureId:"shadow.smallRound",spritesheetVariant:"original"}),cm=z.x*.75,um=500,dm=(o,e,t,n)=>{const{inputStateTracker:r}=t,s=o.type==="head"?o.state:o.state.head,{doughnuts:i,hasHooter:a}=s,{state:{position:l,facing:c}}=o,u=Al(c);if(r.currentActionPress("fire")!=="released"&&a&&ro(i)>0){const d={type:"firedDoughnut",...Zs,config:de,id:`firedDoughnut/${o.id}/${e.roomTime}`,shadowCastTexture:lm,state:{...qs(),position:fe(l,Oe(u,cm),o.type==="headOverHeels"?{z:z.z}:he),vels:{fired:Oe(u,Fo.firedDoughnut)},disappearing:{on:"touch"}}};Nt({room:e,item:d}),s.doughnuts=Ol(s.doughnuts,-1),r.inputWasHandled("fire",um)}},bs={movementType:"vel",vels:{gravity:he}},hm=(o,e,t,n)=>{if(!Mo(o))return bs;const{type:r,state:{vels:{gravity:{z:s}},standingOnItemId:i}}=o,l=Fl[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(i!==null){const c=kn(i,e);return Go(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-cr*n,-l)}}}:bs}else return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Math.max(s-cr*n,-l)}}}};function*pm(o,{roomTime:e},t,n){const r=e,s=e-n,i=[];for(let a=0;a<o.state.latentMovement.length;a++){const l=o.state.latentMovement[a];if(l.startAtRoomTime>r)continue;if(l.endAtRoomTime<=s){i.push(a);continue}if(l.fromStandingOn!==o.state.standingOnItemId){i.push(a);continue}const c=Math.max(l.startAtRoomTime,s),d=Math.min(l.endAtRoomTime,r)-c;d>0&&(yield{posDelta:Oe(l.velocity,d),movedBy:l.fromStandingOn}),l.endAtRoomTime<=r&&i.push(a)}for(let a=i.length-1;a>=0;a--)o.state.latentMovement.splice(i[a],1)}const ys=z.z,vs=.001,fm={movementType:"vel",vels:{lift:he}},mm=({z:o,lowestZ:e,highestZ:t,direction:n,currentVelocity:r,deltaMS:s})=>{const i=Ue**2/(2*_t);if(n==="up"){const a=t-o;if(a<=i){const l=Math.max(0,a);return Math.max(vs,Math.sqrt(2*_t*l))}return r<Ue?Math.min(Ue,r+_t*s):Ue}else{const a=o-e;if(a<=i){const l=Math.max(0,a);return Math.min(-vs,-Math.sqrt(2*_t*l))}return r>-Ue?Math.max(-Ue,r-_t*s):-Ue}},gm=({state:{direction:o,bottom:e,top:t,position:{z:n},vels:r}},s,i,a)=>{const l=e*ys,c=t*ys;if(l===c&&ye(n,l))return fm;const u=r?.lift?.z??0,d=mm({z:n,lowestZ:l,highestZ:c,direction:o,currentVelocity:u,deltaMS:a});if(Number.isNaN(d))throw new Error("velocity is NaN");const h=n<=l?"up":n>=c?"down":o;return{movementType:"vel",vels:{lift:{x:0,y:0,z:d}},stateDelta:{direction:h}}},ws={movementType:"vel",vels:{movingFloor:he}},xm=(o,e,t,n)=>{if(ke(o)&&o.state.teleporting!==null)return ws;const{state:{standingOnItemId:r}}=o,s=kn(r,e);if(s===null||!Ll(s))return ws;const{state:{direction:i}}=s,l=El(o)&&o.state.action==="moving"&&vn(o.state.facing)===zl(i)?Fo.heels:Ul,c=Oe(Dl[i],l);return Ks(s.id,o,e,!0,!1),{movementType:"vel",vels:{movingFloor:c}}},bm=(o,e,t,n)=>{const r=o.x*o.x+o.y*o.y,s=e.x*e.x+e.y*e.y;if(r<Re||s<Re)return o;const i=Math.atan2(o.x*e.y-o.y*e.x,o.x*e.x+o.y*e.y),a=Math.abs(i);if(a<Re)return e;const l=a>Math.PI-Re?a:i,c=t*n,u=Math.max(-c,Math.min(c,l)),d=Math.cos(u),h=Math.sin(u);return{x:o.x*d-o.y*h,y:o.x*h+o.y*d,z:o.z}},ym=.009,vm=(o,e,t,n)=>{const{state:{visualFacingVector:r,facing:s}}=o;return{movementType:"steady",stateDelta:{visualFacingVector:bm(r??s,s,ym,n)}}},wm=(o,e,t)=>{const n=Gl(o);if(n!==void 0){const r=n*Vl,s=zo(e)/Math.max(t,Re);s>r&&Wl(e,r/s)}};function*Sm(o,e,t,n){if(yt(o)&&(yield hm(o,e,t,n),yield xm(o,e)),ke(o)){if(yield Xl(o,e,t,n),yield vm(o,e,t,n),yield Yl(o,e,t),o.id===t.currentCharacterName){const r=ql(o);r&&xd(o,e,t,n),yield Zl(o,e,t),r&&bd(o,e,t),Jl(o)&&dm(o,e,t)}}else Go(o)?yield gm(o,e,t,n):Kl(o)?(yield om(o,e,t,n),yield Ql(o,e,t,n)):ec(o)?am(o,e):tc(o)&&(yield im(o,e))}const Cm=(o,e,t,n)=>{if(!yt(o)||o.state.standingOnItemId===null)return;const r=kn(o.state.standingOnItemId,e);ke(o)&&r.type==="pickup"&&nc({gameState:t,movingItem:o,touchedItem:r,room:e});const{state:{disappearing:s}}=r;s!==null&&(s.byType===void 0||s.byType.includes(o.type))&&oc({touchedItem:r,gameState:t,room:e})},cn={x:0,y:0,z:0},Tm={x:0,y:0,z:0},km=(o,e,t,n)=>{if(ke(o)&&o.state.standingOnItemId!==null){const a=kn(o.state.standingOnItemId,e);(zs(a)||a.type==="spikes")&&$l({room:e,movingItem:o})}const r=Sm(o,e,t,n).toArray();if(Cm(o,e,t),Hl(cn,o,r),yt(o)||Go(o)||Nl(o))for(const a of qe(o.state.vels))js(cn,Xs(Tm,{...he,...a},n));if(jl(o)&&Xf(e,o,n),r.find(a=>a.movementType==="position")!==void 0||wm(o,cn,n),no({subjectItem:o,posDelta:cn,gameState:t,room:e,deltaMS:n,onTouch:oo}),yt(o))for(const{movedBy:a,posDelta:l}of pm(o,e,t,n))Ks(a,o,e,l.x!==0||l.y!==0,l.z!==0),no({subjectItem:o,posDelta:l,gameState:t,room:e,deltaMS:n,onTouch:oo})},Im=(o,e)=>{const t=new Set;for(const n of Do(o)){const r=e[n.id];(r===void 0||!Ns(r,n.state.position))&&t.add(n)}return t},_m=(o,e)=>{const t=Ct(o);if(t===void 0)return wt;Yf(o,t,e);const n=Object.fromEntries(rc(t.items).map(([i,a])=>[i,a.state.position]));for(const i of Do(t.items))Zf(i,t)&&(Us({room:t,item:i}),ke(i)&&sc(o,i));const r=ic(t.items).sort(Jf);for(const i of r){const a=Xt(o);if(a===void 0||a.state.action==="death")break;if(t.items[i.id]!==void 0)try{km(i,t,o,e)}catch(l){throw console.error(l),new Error(`error caught while ticking item "${i.id}"`,{cause:l})}}jf(t,e),Df(t),qf(t);const s=Im(t.items,n);return ac(s,t,n,e),Qf(t,s),s},Pm=de,Mm=(o,e)=>(t,n)=>{const r=new Set;if(lc(t)){const u=Ct(t)?.items;if(u!==void 0){const d=tt(qe(Ys(u))).filter(h=>h!==void 0);for(const h of d)r.add(h)}}const a=ut.shared.speed===0?1:Math.max(1,Math.ceil(n/e)),l=n/a;for(let u=0;u<a;u++){const d=o(t,l);for(const h of d)r.add(h)}const c=Ct(t)?.items??Pm;for(const u of r)c[u.id]===void 0&&r.delete(u);return r},Rm=(o,e,t,n)=>{if(e){const r=n.shade==="dimmed";ju(o,e,t,n),Ku(o,t,n),nd(o,r),id(o,r)}else Ni()},Ee=`
in vec2 aPosition;
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
`,Bm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uRadius;      // Blur radius in pixels
uniform float uCutoff;      // Brightness cutoff (0.0 to 1.0)
uniform float uIntensity;   // Bloom intensity (0.0 to 1.0)
uniform vec2 uResolution;   // Screen resolution
uniform float uEdgeBlur;    // Edge blur multiplier (1.0 = uniform, 2.0 = edges 2x blurrier)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

// Configuration for the poisson disk sampling pattern
const float INNER_RING_RADIUS = 0.7;
const float OUTER_RING_RADIUS = 1.0;
const float CENTER_WEIGHT = 4.0;
const float INNER_WEIGHT = 3.5;
const float OUTER_WEIGHT = 0.1;

// Rotation angle for outer ring: 22.5° = π/8 radians
const float OUTER_ROTATION = 0.39269908169872414;
const float COS_OUTER_ROT = cos(OUTER_ROTATION);
const float SIN_OUTER_ROT = sin(OUTER_ROTATION);

// 13-tap pattern: center + 4-point inner ring + 8-point outer ring
// Inner ring on cardinal axes, outer ring rotated 22.5° between cardinal/diagonal
const int NUM_SAMPLES = 12;
const vec2 poissonOffsets[NUM_SAMPLES] = vec2[](

    // Inner ring (on cardinal axes)
    vec2(0.0, -INNER_RING_RADIUS),
    vec2(INNER_RING_RADIUS, 0.0),
    vec2(0.0, INNER_RING_RADIUS),
    vec2(-INNER_RING_RADIUS, 0.0),

    // Outer ring rotated 22.5° from top, going clockwise
    vec2(SIN_OUTER_ROT * OUTER_RING_RADIUS, -COS_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(COS_OUTER_ROT * OUTER_RING_RADIUS, -SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(COS_OUTER_ROT * OUTER_RING_RADIUS, SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(SIN_OUTER_ROT * OUTER_RING_RADIUS, COS_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-SIN_OUTER_ROT * OUTER_RING_RADIUS, COS_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-COS_OUTER_ROT * OUTER_RING_RADIUS, SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-COS_OUTER_ROT * OUTER_RING_RADIUS, -SIN_OUTER_ROT * OUTER_RING_RADIUS),
    vec2(-SIN_OUTER_ROT * OUTER_RING_RADIUS, -COS_OUTER_ROT * OUTER_RING_RADIUS)
);

// Weights for each sample - falloff from center to outer ring
const float poissonWeights[NUM_SAMPLES] = float[](
    // Inner ring
    INNER_WEIGHT, INNER_WEIGHT, INNER_WEIGHT, INNER_WEIGHT,

    // Outer ring
    OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT,
    OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT, OUTER_WEIGHT
);

void main() {
    vec3 originalColor = texture(uTexture, vTextureCoord).rgb;
    
    // Calculate pixel size
    vec2 pixelSize = 1.0 / uResolution;
    
    // Calculate distance from center using the same logic as vignette/curvature
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    vec2 visibleCenter = (uInputClamp.xy + uInputClamp.zw) * 0.5;
    vec2 centered = (vTextureCoord - visibleCenter) / visibleSize;
            
    // Accumulate bloom from neighboring pixels
    vec3 bloom = vec3(0.0);
    float totalWeight = 0.0;

    // Distance from center (0 at center, ~0.707 at corners for square aspect)
    float distFromCenter = length(centered);

    // transform edgeBlue from 0..1 to 1..2, raising initially slowly but
    // ramping up more sharply at the corners due to the square factor
    float blurCoefForEdge = (distFromCenter * distFromCenter + 1.0) * (uEdgeBlur + 1.0);
    
    // Sample using two-ring pattern for smoother bloom
    for (int i = 0; i < NUM_SAMPLES; i++) {
        vec2 offset = poissonOffsets[i] * pixelSize * uRadius * blurCoefForEdge;
        vec2 sampleCoord = vTextureCoord + offset;
        
        // Sample the neighbor
        vec3 sampleColor = texture(uTexture, sampleCoord).rgb;
        
        // Calculate brightness of the sample
        float sampleBrightness = max(max(sampleColor.r, sampleColor.g), sampleColor.b);
        
        // Apply smooth cutoff to determine contribution
        // Only bright pixels contribute to bloom
        float contribution = smoothstep(uCutoff * 0.5, uCutoff + 0.1, sampleBrightness);
        
        // Get weight for this sample
        float weight = poissonWeights[i] * contribution;
        
        bloom += sampleColor * weight;
        totalWeight += weight;
    }
    
    // Normalize the bloom (avoid divide by zero)
    bloom /= max(totalWeight, 0.001);        
    
    // Add bloom to original color
    vec3 result = originalColor + (bloom * uIntensity * blurCoefForEdge);
    
    finalColor = vec4(result, 1.0);
}`,Am={radius:1.2,cutoff:.88,intensity:.14,edgeBlur:.5};class Om extends q{uniforms;constructor(e={}){const t={...Am,...e},n=Z.from({vertex:Ee,fragment:Bm,name:"bloom-filter"});super({glProgram:n,resources:{bloomUniforms:{uRadius:{value:t.radius,type:"f32"},uCutoff:{value:t.cutoff,type:"f32"},uIntensity:{value:t.intensity,type:"f32"},uEdgeBlur:{value:t.edgeBlur,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.bloomUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Fm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uGamma;              // Gamma correction
uniform float uSaturation;         // Color saturation
uniform float uBrightness;         // Brightness (0.0 to 2.0)
uniform float uBrightnessBottom;   // Extra brightness at bottom of screen
uniform vec4 uInputClamp;          // Input clamp for calculating vertical position

out vec4 finalColor;

void main() {
    vec3 colour = texture(uTexture, vTextureCoord).rgb;

    // Calculate vertical position (0 at top, 1 at bottom) within visible area
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    float normalizedY = (vTextureCoord.y - uInputClamp.y) / visibleSize.y;

    // Apply brightness adjustment with gradient from top to bottom
    float brightnessAtPixel = uBrightness + (uBrightnessBottom * normalizedY);
    colour *= brightnessAtPixel;
    
    // Apply saturation adjustment
    float luminance = dot(colour, vec3(0.299, 0.587, 0.114));
    vec3 grayscale = vec3(luminance);
    colour = mix(grayscale, colour, uSaturation);
    
    // Apply gamma correction
    colour = pow(colour, vec3(1.0 / uGamma));
    
    finalColor = vec4(colour, 1.0);
}`,Lm={gamma:1,saturation:1,brightness:1,brightnessBottom:0};class Ss extends q{uniforms;constructor(e={}){const t={...Lm,...e},n=Z.from({vertex:Ee,fragment:Fm,name:"color-adjustment-filter"});super({glProgram:n,resources:{colorAdjustmentUniforms:{uGamma:{value:t.gamma,type:"f32"},uSaturation:{value:t.saturation,type:"f32"},uBrightness:{value:t.brightness,type:"f32"},uBrightnessBottom:{value:t.brightnessBottom,type:"f32"}}}}),this.uniforms=this.resources.colorAdjustmentUniforms.uniforms}}const fa=(o,e)=>o.replace(/\{\{(\w+)\}\}/g,(t,n)=>{if(n in e){const r=e[n];return typeof r=="boolean"?r?"1":"0":String(r)}return console.warn(`Shader placeholder {{${n}}} not found in values map`),t}),Em=`#version 300 es
precision mediump float;

// Injected define for multisampling
#define MULTISAMPLE {{MULTISAMPLE}}

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uCurvatureX;  // Screen curvature - horizontal
uniform float uCurvatureY;  // Screen curvature - vertical
uniform vec2 uResolution;   // Screen resolution for AA sampling

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

vec2 distort(vec2 coord) {
    vec2 curvatureDistortion = vec2(uCurvatureX, uCurvatureY);
    vec2 barrelScale = 1.0 - (0.23 * curvatureDistortion);
    
    // Map texture coords to normalized visible space (0-1)
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    vec2 visibleCenter = (uInputClamp.xy + uInputClamp.zw) * 0.5;
    
    // Normalize coord to visible area's 0-1 range
    vec2 normalizedCoord = (coord - uInputClamp.xy) / visibleSize;
    
    // Center normalized coordinates around 0,0
    normalizedCoord -= vec2(0.5, 0.5);
    
    // Apply barrel distortion
    float rsq = normalizedCoord.x * normalizedCoord.x + normalizedCoord.y * normalizedCoord.y;
    normalizedCoord += normalizedCoord * (curvatureDistortion * rsq);
    normalizedCoord *= barrelScale;
    
    // Re-center normalized coordinates
    normalizedCoord += vec2(0.5, 0.5);
    
    // Map back to texture coordinate space
    return normalizedCoord * visibleSize + uInputClamp.xy;
}

void main() {
    #if MULTISAMPLE
        // Calculate pixel size in texture coordinates for AA sampling
        vec2 pixelSize = 1.0 / uResolution;
        
        // Quincunx (X) pattern: center + 4 diagonal corners
        // Sample offsets at half-pixel distance diagonally
        vec2 offset = pixelSize * 0.5;
        
        // Take 5 samples with distortion applied to each
        vec2 coord0 = distort(vTextureCoord);                                    // Center
        vec2 coord1 = distort(vTextureCoord + vec2(-offset.x, -offset.y));      // Top-left
        vec2 coord2 = distort(vTextureCoord + vec2( offset.x, -offset.y));      // Top-right
        vec2 coord3 = distort(vTextureCoord + vec2(-offset.x,  offset.y));      // Bottom-left
        vec2 coord4 = distort(vTextureCoord + vec2( offset.x,  offset.y));      // Bottom-right
        
        // Branchless bounds check for each sample (check against visible bounds)
        float inBounds0 = step(uInputClamp.x, coord0.x) * step(coord0.x, uInputClamp.z) * step(uInputClamp.y, coord0.y) * step(coord0.y, uInputClamp.w);
        float inBounds1 = step(uInputClamp.x, coord1.x) * step(coord1.x, uInputClamp.z) * step(uInputClamp.y, coord1.y) * step(coord1.y, uInputClamp.w);
        float inBounds2 = step(uInputClamp.x, coord2.x) * step(coord2.x, uInputClamp.z) * step(uInputClamp.y, coord2.y) * step(coord2.y, uInputClamp.w);
        float inBounds3 = step(uInputClamp.x, coord3.x) * step(coord3.x, uInputClamp.z) * step(uInputClamp.y, coord3.y) * step(coord3.y, uInputClamp.w);
        float inBounds4 = step(uInputClamp.x, coord4.x) * step(coord4.x, uInputClamp.z) * step(uInputClamp.y, coord4.y) * step(coord4.y, uInputClamp.w);
        
        // Sample textures and apply bounds check
        vec3 sample0 = texture(uTexture, coord0).rgb * inBounds0;
        vec3 sample1 = texture(uTexture, coord1).rgb * inBounds1;
        vec3 sample2 = texture(uTexture, coord2).rgb * inBounds2;
        vec3 sample3 = texture(uTexture, coord3).rgb * inBounds3;
        vec3 sample4 = texture(uTexture, coord4).rgb * inBounds4;
        
        // Weighted average: center gets 50%, corners get 12.5% each
        vec3 colour = sample0 * 0.5 + (sample1 + sample2 + sample3 + sample4) * 0.125;
        
        finalColor = vec4(colour, 1.0);
    #else
        // Single sample - faster but may have aliasing at edges
        vec2 coord = distort(vTextureCoord);
        
        // Check if in bounds
        float inBounds = step(uInputClamp.x, coord.x) * step(coord.x, uInputClamp.z) * 
                         step(uInputClamp.y, coord.y) * step(coord.y, uInputClamp.w);
        
        vec3 colour = texture(uTexture, coord).rgb * inBounds;
        finalColor = vec4(colour, 1.0);
    #endif
}`,zm={curvatureX:.15,curvatureY:.15,multisampling:!0};class Um extends q{uniforms;constructor(e={}){const t={...zm,...e},n=fa(Em,{MULTISAMPLE:t.multisampling}),r=Z.from({vertex:Ee,fragment:n,name:"curvature-filter"});super({glProgram:r,resources:{curvatureUniforms:{uCurvatureX:{value:t.curvatureX,type:"f32"},uCurvatureY:{value:t.curvatureY,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"}}}}),this.uniforms=this.resources.curvatureUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Dm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uIntensity;
uniform float uScale;
uniform float uFPS;
uniform float uTime;

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

///  3 out, 2 in...
vec3 hash32(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy+p3.yzz)*p3.zyx);
}

void main() {
    float period = (1000.0/uFPS);
    float uFrameNumber = floor(uTime / period) * period;

    vec2 uv = vTextureCoord * (uInputClamp.zw - uInputClamp.xy); // Scale to texture size
    // adjust the scale uniform given to be half the size for every unit increase
    float scale10 = pow(0.5, (uScale + 7.0));
    // change the square pixels to be wider than they are tall (scanlines)
    vec2 scale10BiasedHoriz = vec2(scale10 * 16.0, scale10);
    // round the uv coords to the nearest "pixel" center. Adding fract(uTime) randomises
    // where the pixels start so it isn't on a strict grid:
    vec2 uvRounded = floor(uv / scale10BiasedHoriz + fract(uFrameNumber)) * scale10BiasedHoriz;

    vec3 rgbNoise = hash32( uvRounded * (uFrameNumber + 1000.0));

    // Keep original value if >= 0.7, otherwise set to 0 (not all pixels have noise in all channels)
    rgbNoise = rgbNoise * step(vec3(0.7), rgbNoise);

    // shift from [0,1] to [-0.5,0.5]
    // actually, don't, keep this additive only (positive noise only)
    //rgbNoise -= 0.5;
    // shift from [-0.5,0.5] to [-1,1]
    //rgbNoise *= 2.0;

    vec4 color = texture(uTexture, vTextureCoord);

    // Add noise and clamp to valid range [0.0, 1.0]
    vec3 noisyColor = clamp(color.rgb + rgbNoise * uIntensity, 0.0, 1.0);
    finalColor = vec4(noisyColor, color.a);
}`,Gm={intensity:.04,scale:6,fps:30};class Wm extends q{uniforms;startTime;constructor(e={}){const t={...Gm,...e},n=Z.from({vertex:Ee,fragment:Dm,name:"noise-filter"});super({glProgram:n,resources:{noiseUniforms:{uIntensity:{value:t.intensity,type:"f32"},uScale:{value:t.scale,type:"f32"},uFPS:{value:t.fps,type:"f32"},uTime:{value:0,type:"f32"}}}}),this.uniforms=this.resources.noiseUniforms.uniforms,this.startTime=performance.now()}apply(e,t,n,r){this.uniforms.uTime=performance.now()-this.startTime,super.apply(e,t,n,r)}}const Vm=`#version 300 es
precision mediump float;

// Injected number of samples for antialiasing
#define NUM_SAMPLES {{NUM_SAMPLES}}

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uPixelWidth;      // Width of virtual pixels in output pixels
uniform float uMaskBrightness;  // Shadow mask brightness (0.0 to 1.0)
uniform vec2 uResolution;        // Screen resolution
uniform float uTransitionWidth; // Width of transition zone between phosphors (0.0 to 1.0, 0 = hard edge, 1 = maximum smooth)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

void main() {
    vec3 colour = texture(uTexture, vTextureCoord).rgb;
    vec3 originalColour = colour;

    // Normalize transition width to actual proportion of phosphor width
    // Input is 0-1 for ease of use, convert to 0-0.166 (max sensible value)
    float transitionWidth = uTransitionWidth * 0.166666;

    // Convert to virtual pixel space for slot mask, accounting for visible area
    // Map texture coord to position within visible area (0-1), then to pixel position
    float normalizedX = (vTextureCoord.x - uInputClamp.x) / (uInputClamp.z - uInputClamp.x);

    // Mask will accumulate the phosphor value of our current pixel - eg, how much it is a r, g, b
    // sub-pixel:
    vec3 mask = vec3(0.0);
    float sampleWidth = 1.0 / uResolution.x; // Width of one output pixel in normalized coords

    for (int i = 0; i < NUM_SAMPLES; i++) {
         // Distribute samples across pixel - offset is the proportion we are into the pixel:
        float offset = (float(i) + 0.5) / float(NUM_SAMPLES) - 0.5;
        float sampleX = normalizedX + offset * sampleWidth * (uInputClamp.z - uInputClamp.x);
        float sampleVirtualX = sampleX * uResolution.x / uPixelWidth;
        float samplePos = fract(sampleVirtualX);

        // work out if we are in an R,G,or B sub-pixel
        // smooth transitions for each RGB sample:
        float isRed = 1.0 - smoothstep(0.333333 - transitionWidth, 0.333333 + transitionWidth, samplePos);
        float isGreen = smoothstep(0.333333 - transitionWidth, 0.333333 + transitionWidth, samplePos) *
                       (1.0 - smoothstep(0.666667 - transitionWidth, 0.666667 + transitionWidth, samplePos));
        float isBlue = smoothstep(0.666667 - transitionWidth, 0.666667 + transitionWidth, samplePos);

        // Accumulate mask values
        mask.r += mix(uMaskBrightness, 1.0, isRed);
        mask.g += mix(uMaskBrightness, 1.0, isGreen);
        mask.b += mix(uMaskBrightness, 1.0, isBlue);
    }

    mask /= float(NUM_SAMPLES); // Average the samples
    
    // the value of this pixel. However, if we left it here, we'd be trending darker overall - 
    // need to compensate for bright pixels to not bring down the overall appearance
    vec3 maskedColour = originalColour * mask;
        
    // boost for bright colours:
    float brightness = (originalColour.r + originalColour.g + originalColour.b) / 3.0;
    float brightBoost = smoothstep(0.5, 1.0, brightness);
    
    // Apply compensation
    float avgMaskEffect = (1.0 + 2.0 * uMaskBrightness) / 3.0;
    float compensation = 1.0 / max(avgMaskEffect, 0.001);
    vec3 compensatedColour = maskedColour * compensation;
    float maxChannel = max(max(compensatedColour.r, compensatedColour.g), compensatedColour.b);
    float clampScale = min(1.0, 1.0 / max(maxChannel, 0.001));
    vec3 maskedPath = compensatedColour * clampScale;
    
    colour = mix(maskedPath, originalColour, brightBoost);
    
    finalColor = vec4(colour, 1.0);
}`,$m={pixelWidth:4,maskBrightness:.7,numSamples:4,transitionWidth:.3};class Hm extends q{uniforms;constructor(e={}){const t={...$m,...e},n=fa(Vm,{NUM_SAMPLES:t.numSamples}),r=Z.from({vertex:Ee,fragment:n,name:"phosphor-mask-filter"});super({glProgram:r,resources:{phosphorMaskUniforms:{uPixelWidth:{value:t.pixelWidth,type:"f32"},uMaskBrightness:{value:t.maskBrightness,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uTransitionWidth:{value:t.transitionWidth,type:"f32"}}}}),this.uniforms=this.resources.phosphorMaskUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Nm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uPixelHeight;  // Height of virtual pixels in output pixels
uniform vec2 uResolution;    // Screen resolution
uniform float uGapBrightness;  // Brightness of dark bands (0.0 to 1.0)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

// Sample neighborhood in cross pattern to get average luminosity
float getNeighborhoodLuminosity(vec2 coord) {
    vec2 pixelSize = 1.0 / uResolution;
    
    // Sample in cross pattern: center + 4 cardinal directions
    vec3 centerSample = texture(uTexture, coord).rgb;
    vec3 leftSample = texture(uTexture, coord + vec2(-pixelSize.x, 0.0)).rgb;
    vec3 rightSample = texture(uTexture, coord + vec2(pixelSize.x, 0.0)).rgb;
    vec3 topSample = texture(uTexture, coord + vec2(0.0, -pixelSize.y)).rgb;
    vec3 bottomSample = texture(uTexture, coord + vec2(0.0, pixelSize.y)).rgb;
    
    // Calculate luminosity for each sample (simple average)
    float centerLum = (centerSample.r + centerSample.g + centerSample.b) / 3.0;
    float leftLum = (leftSample.r + leftSample.g + leftSample.b) / 3.0;
    float rightLum = (rightSample.r + rightSample.g + rightSample.b) / 3.0;
    float topLum = (topSample.r + topSample.g + topSample.b) / 3.0;
    float bottomLum = (bottomSample.r + bottomSample.g + bottomSample.b) / 3.0;
    
    // Weight center more heavily (0.5) and edges equally (0.125 each)
    return centerLum * 0.5 + (leftLum + rightLum + topLum + bottomLum) * 0.125;
}

void main() {
    // Get the color at this position (for final output mixing)
    vec3 color = texture(uTexture, vTextureCoord).rgb;
    
    // Get neighborhood luminosity for determining scanline thickness
    float luminosity = getNeighborhoodLuminosity(vTextureCoord);
    
    // Convert to virtual pixel space, accounting for visible area
    // Map texture coord to position within visible area (0-1), then to pixel position
    float normalizedY = (vTextureCoord.y - uInputClamp.y) / (uInputClamp.w - uInputClamp.y);
    float virtualPixelY = normalizedY * uResolution.y / uPixelHeight;
    
    // Calculate position within scanline period (0 to 2 for double height scanlines)
    float yInScanline = mod(virtualPixelY, 2.0);
    
    // Calculate distance to nearest dark band center
    // Dark band centers are at 0.5 and 1.5 in our 2-unit period
    // Use branchless selection: if yInScanline < 1.0, use 0.5, else use 1.5
    float darkCenter = mix(1.5, 0.5, step(yInScanline, 1.0));
    
    float distToDarkCenter = abs(yInScanline - darkCenter);
    
    // Calculate minimum line width in virtual pixel space
    // Each scanline period is 2 virtual pixels, and we need at least 1 real pixel
    float realPixInVirtual = 1.0 / uPixelHeight;
    
    // Calculate threshold based on luminosity - how close we need to be to the centre of
    // a dark band to be considered "in" the dark band.
    // Bright pixels = low threshold = thin dark bands (wide bright bands)
    // Dark pixels = high threshold = thick dark bands (narrow bright bands)
    // Range from 0.5 (black) to 0.0 (white) - allows dark bands to completely disappear
    float distanceThresh = 0.5 * (1.0 - luminosity); // Range from 0.5 to 0.0
    
    // Clamp threshold to ensure both dark and bright bands are at least 1 real pixel wide
    // Maximum threshold is 1.0 - realPixInVirtual (ensures bright band is at least 1 real pixel)
    // Minimum threshold is realPixInVirtual (ensures dark band is at least 1 real pixel)
    //distanceThresh = clamp(distanceThresh, realPixInVirtual, 1.0 - realPixInVirtual);
    
    // Calculate the ratio of dark to bright stripe widths
    // Dark stripe width = 2 * threshold (extends ±threshold from center)
    // Bright stripe width = 2 * (1.0 - threshold)
    float darkToBrightRatio = distanceThresh / (1.0 - distanceThresh);
    
    // Calculate boost factor to compensate for the darkening
    // Dark bands now contribute gap_brightness instead of 0
    // Average = (bright * boost + dark * gap_brightness) / (bright + dark)
    // To maintain original brightness of 1.0:
    // boost = 1 + darkToBrightRatio * (1.0 - uGapBrightness)
    float boostFactor = 1.0 + darkToBrightRatio * (1.0 - uGapBrightness);
    
    // Apply soft cutoff using smoothstep for anti-aliasing
    // Transition width is 1/4 of a virtual pixel for smooth edges
    float transitionWidth = 0.25;
    float innerBoundary = distanceThresh - transitionWidth * 0.5;
    float outerBoundary = distanceThresh + transitionWidth * 0.5;
    
    // Smoothstep gives us a gradual transition from dark (0) to bright (1)
    float inBrightBand = smoothstep(innerBoundary, outerBoundary, distToDarkCenter);
    
    // Output the boosted color for bright band, reduced brightness for dark band
    vec3 brightBandColor = color * boostFactor;
    vec3 darkBandColor = color * uGapBrightness;
    vec3 outputColor = mix(darkBandColor, brightBandColor, inBrightBand);
    
    finalColor = vec4(outputColor, 1.0);
}`,jm={pixelHeight:4,gapBrightness:.7};class Xm extends q{uniforms;constructor(e={}){const t={...jm,...e},n=Z.from({vertex:Ee,fragment:Nm,name:"scanlines-filter"});super({glProgram:n,resources:{scanlinesUniforms:{uPixelHeight:{value:t.pixelHeight,type:"f32"},uResolution:{value:new Float32Array(2),type:"vec2<f32>"},uGapBrightness:{value:t.gapBrightness,type:"f32"}}}}),this.uniforms=this.resources.scanlinesUniforms.uniforms}apply(e,t,n,r){this.uniforms.uResolution[0]=t.frame.width,this.uniforms.uResolution[1]=t.frame.height,super.apply(e,t,n,r)}}const Ym=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform sampler2D uTexture;

uniform float uIntensity; // Vignette effect (-1.0 to 1.0, negative = brighten center)
uniform float uRadius;    // Vignette radius (0.0 to 2.0)

// Pixi built-in uniforms (provided automatically)
uniform vec4 uInputClamp;  // xy: min texture coords, zw: max texture coords of visible area

out vec4 finalColor;

void main() {
    vec3 colour = texture(uTexture, vTextureCoord).rgb;
    
    // Calculate the center of the visible area using Pixi's input clamp
    vec2 visibleCenter = (uInputClamp.xy + uInputClamp.zw) * 0.5;
    
    // Calculate position relative to the actual visible center
    vec2 centered = vTextureCoord - visibleCenter;
    
    // Scale the distance calculation to account for the visible area size
    vec2 visibleSize = uInputClamp.zw - uInputClamp.xy;
    centered = centered / visibleSize;
    
    // Calculate distance from center (0 to ~1.414 at corners)
    float dist = length(centered) * 2.0;
    
    float falloff = dist / uRadius;

    float vignetteFactor = clamp(1.0 - falloff, 0.0, 1.0);
    
    // multiply the rgb colour by 0..1 to darken it
    colour *= mix(1.0 - uIntensity, 1.0, vignetteFactor);
    
    
    finalColor = vec4(colour, 1.0);
}`,qm={intensity:.4,radius:.8};class Zm extends q{uniforms;constructor(e={}){const t={...qm,...e},n=Z.from({vertex:Ee,fragment:Ym,name:"vignette-filter"});super({glProgram:n,resources:{vignetteUniforms:{uIntensity:{value:t.intensity,type:"f32"},uRadius:{value:t.radius,type:"f32"}}}}),this.uniforms=this.resources.vignetteUniforms.uniforms}}const Jm=`#version 300 es
precision mediump float;

in vec2 vTextureCoord;
uniform float uBlackPoint;
uniform sampler2D uTexture;

out vec4 finalColor;

void main() {
    vec4 colour = texture(uTexture, vTextureCoord);
    
    finalColor = (colour * (1.0-uBlackPoint)) + uBlackPoint;
}
`,Km={blackPoint:.04};class Qm extends q{uniforms;constructor(e={}){const t={...Km,...e},n=Z.from({vertex:Ee,fragment:Jm,name:"raise-black-point-filter"});super({glProgram:n,resources:{raiseBlackPointUniforms:{uBlackPoint:{value:t.blackPoint,type:"f32"}}}}),this.uniforms=this.resources.raiseBlackPointUniforms.uniforms}}const Cs=.8,eg=1.2,tg=({crtFilter:o},e)=>o??et.displaySettings.crtFilter?[new Ss({brightness:Cs}),new Wm({intensity:.03,fps:29.97,scale:5}),new Xm({pixelHeight:e.gameEngineUpscale,gapBrightness:.5}),new Hm({pixelWidth:e.gameEngineUpscale*1.1,maskBrightness:.6,numSamples:2,transitionWidth:.2}),new Om({radius:e.gameEngineUpscale/6,intensity:.1,cutoff:.8,edgeBlur:1}),new Zm({intensity:.4,radius:.7}),new Um({curvatureX:.13,curvatureY:.12,multisampling:!0}),new Qm({blackPoint:.03}),new Ss({gamma:1.1,saturation:1.35,brightness:1/Cs*eg,brightnessBottom:-.15})]:oa;Uf();const ng=Math.PI/2;class og{constructor(e,t){this.app=e,this.gameState=t;try{const n=B.getState(),r=Io(n);if(this.#n.connect(M.destination),e.stage.addChild(this.#s),e.stage.scale=r,Ct(t)===void 0)throw new Error("main loop with no starting room");this.#l()}catch(n){this.#i(n);return}}#e;#t;#o=new C({label:"MainLoop/worldContainer"});#n=M.createGain();#r=Mm(_m,gc);#s=new C({label:"MainLoop/mainContainer",children:[this.#o]});#i(e){console.error(e),B.dispatch(cc(uc(e)))}#l(){const{gameMenus:{userSettings:{displaySettings:e}},upscale:{upscale:t}}=B.getState();this.app.stage.filters=tg(e,t)}#a=e=>{try{this.#u(e)}catch(t){const n=new Error("Error caught in main loop tick",{cause:t});this.#i(n)}};#c({gameEngineUpscale:e,rotate90:t,gameEngineScreenSize:n}){const{app:{stage:r}}=this;r.scale=e,this.#s.rotation=t?ng:0,this.#s.position.x=t?n.y:0}#u=({deltaMS:e})=>{const t=B.getState(),n=He(t)?$t:void 0;if(dc(t))return;const r=hc(t),{gameMenus:{userSettings:{displaySettings:s,soundSettings:i},gameInPlay:{freeCharacters:a}},upscale:{upscale:l}}=B.getState(),c=!r&&!(s?.uncolourised??et.displaySettings.uncolourised);n?.startPhysics();const u=r?wt:this.#r(this.gameState,e);n?.endPhysics(),n?.startUpdateSceneGraph();const d=Ct(this.gameState),h=this.#t?.renderContext.room!==d;(h||c!==this.#t?.renderContext.general.colourised)&&d!==void 0&&Rm(this.app.renderer,c,d.planet,d.color),n?.startHudUpdate();const p=pc(t),f=fc(t);np(this.#e,c,p,f,l)&&(this.#e?.destroy(),this.#e=new tp({general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1,onScreenControls:p},inputDirectionMode:f}),this.#s.addChild(this.#e.output)),this.#e.tick({screenSize:l.gameEngineScreenSize,deltaMS:e,room:d,freeCharacters:a}),n?.endHudUpdate();const x=op(this.#t,h,l,s,i,r);if(x){if(this.#t?.destroy(),d){const g={general:{gameState:this.gameState,paused:r,pixiRenderer:this.app.renderer,displaySettings:s,soundSettings:i,colourised:c,upscale:l,editor:!1,onScreenControls:p},room:d};this.#t=new Bf(g,new Ef(g,new If(g))),this.#o.addChild(this.#t.output.graphics),this.#t.output.sound?.connect(this.#n)}else this.#t=void 0;this.#c(l),this.#l(),this.#s.boundsArea=new Et(0,0,l.rotate90?l.gameEngineScreenSize.y:l.gameEngineScreenSize.x,l.rotate90?l.gameEngineScreenSize.x:l.gameEngineScreenSize.y)}this.#t?.tick({movedItems:u,deltaMS:e}),n?.endUpdateSceneGraph();try{if(n?.startPixiRender(),this.app.render(),n?.endPixiRender(),x&&d){const g=new CustomEvent("firstRenderOfRoom",{detail:{roomId:d.id}});window.dispatchEvent(g)}}catch(g){throw new Error("Error in Pixi.js app.render()",{cause:g})}n?.tickDone(),this.app.ticker.maxFPS=r?10:mc};start(){return this.app.ticker.add(this.#a),this}stop(){this.app.stage.removeChild(this.#s),this.#n.disconnect(),this.#t?.destroy(),this.#e?.destroy(),this.app.ticker.remove(this.#a)}}zt.defaultOptions.scaleMode="nearest";const pg=async(o,e)=>{const t=new Tc,[n]=await Promise.all([Eu(o),t.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1},autoStart:!1,useBackBuffer:!0})]);if(t.renderer.gl.drawingBufferColorSpace="display-p3",n.error)throw new Error(`could not load campaign ${JSON.stringify(o)}`,{cause:n.error});const r=n.data;xc(t.renderer),Fu(t.renderer),zu(t),window._e2e_pixiApplication=t,globalThis.__PIXI_APP__=t;const s=bc(B.getState(),o),i=ur({campaign:r,inputStateTracker:e,savedGame:s});if(s!==void 0){const l=s.store.gameMenus.gameInPlay;B.dispatch(yc(l))}else i.characterRooms.head&&B.dispatch(dr(i.characterRooms.head.id)),i.characterRooms.heels&&B.dispatch(dr(i.characterRooms.heels.id));const a=new og(t,i).start();return{campaign:r,renderIn(l){l.appendChild(t.canvas)},resizeTo(l,c){c?t.renderer.resize(l.y,l.x):t.renderer.resize(l.x,l.y)},changeRoom(l){const c=Xt(i);c!==void 0&&vc({playableItem:c,gameState:i,toRoomId:l,changeType:"level-select"})},get currentRoom(){return Ct(i)},get gameState(){return i},reincarnateFrom(l){ur({campaign:r,inputStateTracker:e,savedGame:l,writeInto:i})},stop(){console.warn("tearing down game"),t.canvas.parentNode?.removeChild(t.canvas),a.stop(),t.destroy()}}};export{pg as default,pg as gameMain};
