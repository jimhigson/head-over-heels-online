const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BcFCuVN7.js","assets/App-DEhF8LUF.js","assets/index-Dplx88Pg.js","assets/index-CGQ8pOyP.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-gCJIrJGC.js","assets/Graphics-DXT2aaXc.js","assets/swopCharacters-Dl9xXU9K.js","assets/WebGLRenderer-D5wgnrKu.js"])))=>i.map(i=>d[i]);
import{aN as pi,a8 as mi,I as gi,L as be,N as E,t as _o,J as fe,E as C,g as Bt,f as bi,C as b,d as We,v as It,a6 as w,D as en,_ as Ae,T as Ve,U as vi,V as yi,aO as xi,aP as wi,aQ as Ci,q as Si,aR as at,ae as ne,aS as Ti,aT as Z,aU as ki,aV as ae,aW as Bo,aq as Fo,ak as y,o as K,ac as O,aX as Ii,aY as Oi,aZ as Pi,ag as F,a_ as Me,a$ as _i,b0 as Ao,b1 as Mo,b2 as Bi,b3 as xt,ad as U,b4 as Fi,i as le,b5 as Ai,b6 as Mi,b7 as Di,b8 as zi,ar as Do,ah as Ft,b9 as _n,ba as Li,bb as nt,bc as zo,bd as ve,be as At,p as ot,as as ye,af as tn,am as ie,bf as Ri,bg as Ui,bh as Ei,bi as $i,a9 as Lo,bj as gn,bk as Xe,ai as Ni,bl as Vi,bm as bn,bn as Xi,bo as ji,bp as Ro,bq as Hi,br as Gi,bs as qi,an as Ot,bt as wt,bu as Wi,bv as Ji,bw as Yi,b as Je,bx as je,by as x,bz as ue,bA as Zi,bB as Qi,bC as Ki,bD as Uo,Y as Oe,bE as es,au as ts,bF as ns,bG as os,bH as rs,bI as is,at as Bn,bJ as ss}from"./App-DEhF8LUF.js";import{l as nn,j as Pt,g as Fn,k as An,h as M,p as T,m as xe,n as vn,q as as,r as ls,t as on,u as Ye,v as Ct,c as yn,w as L,i as H,x as Eo,y as $o,z as No,A as he,B as Mt,C as rt,D as cs,E as De,F as us,G as ds,H as fs,I as rn,J as hs,K as lt,L as ps,M as ms,N as gs,a as we,O as Vo,P as Xo,Q as Mn,R as pe,S as jo,T as Ho,f as bs,U as Go,V as qo,W as vs,b as ze,X as Et,Y as ct,Z as ys,_ as Le,$ as Dn,a0 as xs,a1 as xn,a2 as ws,a3 as Cs,a4 as Ss,a5 as Ts,a6 as ks,a7 as zn,a8 as Wo,e as Jo,o as Yo,a9 as Is,aa as Ln,s as Ze,ab as Os,ac as $t,ad as S,ae as Ps,af as _s,ag as Bs,ah as Rn,ai as Dt,aj as Fs,ak as Nt,al as Un}from"./swopCharacters-Dl9xXU9K.js";import{S as As,G as j}from"./Graphics-DXT2aaXc.js";import{g as Ms,_ as En}from"./index-Dplx88Pg.js";var ut={},$n;function Ds(){if($n)return ut;$n=1;var t=pi(),e=t.mark(i),n=mi(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return f=d[u],v.delegateYield(r(f),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}ut.__concat=i;var s=o(i);return ut.concat=s,ut}var Vt,Nn;function zs(){return Nn||(Nn=1,Vt=Ds().concat),Vt}var Ls=zs();const sn=Ms(Ls),Zo=class an extends gi{constructor(e){e={...an.defaultOptions,...e},super(e),this.enabled=!0,this._state=As.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=be.from(n)),o&&(s=E.from(o)),new an({gpuProgram:i,glProgram:s,...r})}};Zo.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let q=Zo;var Rs=`
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
`,Us=`in vec2 aPosition;
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
`,Es=`
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
}`;class k extends q{constructor(e){const n=e.gpu,o=Vn({source:Es,...n}),r=be.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Vn({source:Rs,...i}),a=E.from({vertex:Us,fragment:s}),l=new _o({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:fe.EMPTY}})}}function Vn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const wn=`
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
    `,Cn=`
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
	`;class Qo extends k{constructor(){super({gl:{functions:`
                ${wn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Cn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Qo.extension={name:"color",type:C.BlendMode};class Ko extends k{constructor(){super({gl:{functions:`
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
            `}})}}Ko.extension={name:"color-burn",type:C.BlendMode};class er extends k{constructor(){super({gl:{functions:`
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
                `}})}}er.extension={name:"color-dodge",type:C.BlendMode};class tr extends k{constructor(){super({gl:{functions:`
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
                `}})}}tr.extension={name:"darken",type:C.BlendMode};class nr extends k{constructor(){super({gl:{functions:`
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
            `}})}}nr.extension={name:"difference",type:C.BlendMode};class or extends k{constructor(){super({gl:{functions:`
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
            `}})}}or.extension={name:"divide",type:C.BlendMode};class rr extends k{constructor(){super({gl:{functions:`
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
            `}})}}rr.extension={name:"exclusion",type:C.BlendMode};class ir extends k{constructor(){super({gl:{functions:`
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
                `}})}}ir.extension={name:"hard-light",type:C.BlendMode};class sr extends k{constructor(){super({gl:{functions:`
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
            `}})}}sr.extension={name:"hard-mix",type:C.BlendMode};class ar extends k{constructor(){super({gl:{functions:`
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
            `}})}}ar.extension={name:"lighten",type:C.BlendMode};class lr extends k{constructor(){super({gl:{functions:`
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
                `}})}}lr.extension={name:"linear-burn",type:C.BlendMode};class cr extends k{constructor(){super({gl:{functions:`
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
            `}})}}cr.extension={name:"linear-dodge",type:C.BlendMode};class ur extends k{constructor(){super({gl:{functions:`
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
            `}})}}ur.extension={name:"linear-light",type:C.BlendMode};class dr extends k{constructor(){super({gl:{functions:`
                ${wn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${Cn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}dr.extension={name:"luminosity",type:C.BlendMode};class fr extends k{constructor(){super({gl:{functions:`
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
            `}})}}fr.extension={name:"negation",type:C.BlendMode};class hr extends k{constructor(){super({gl:{functions:`
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
                `}})}}hr.extension={name:"overlay",type:C.BlendMode};class pr extends k{constructor(){super({gl:{functions:`
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
                `}})}}pr.extension={name:"pin-light",type:C.BlendMode};class mr extends k{constructor(){super({gl:{functions:`
                ${wn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${Cn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}mr.extension={name:"saturation",type:C.BlendMode};class gr extends k{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"soft-light",type:C.BlendMode};class br extends k{constructor(){super({gl:{functions:`
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
                `}})}}br.extension={name:"subtract",type:C.BlendMode};class vr extends k{constructor(){super({gl:{functions:`
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
                `}})}}vr.extension={name:"vivid-light",type:C.BlendMode};const ln=[];Bt.handleByNamedList(C.Environment,ln);async function $s(t){if(!t)for(let e=0;e<ln.length;e++){const n=ln[e];if(n.value.test()){await n.value.load();return}}}let Re;function Ns(){if(typeof Re=="boolean")return Re;try{Re=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Re=!1}return Re}var yr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(yr||{});class Vs{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Xs=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],xr=class wr extends bi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...Xs,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await $s(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...wr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof b&&(o={container:o},n&&(We(It,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:w.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=yr.ALL);const{clear:o,clearColor:r,target:i}=e;w.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,w.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Vs(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Ns())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};xr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Cr=xr,dt;function js(t){return dt!==void 0||(dt=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Cr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!en.get().getWebGLRenderingContext())return!1;let o=en.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),dt}let ft;async function Hs(t={}){return ft!==void 0||(ft=await(async()=>{const e=en.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),ft}const Xn=["webgl","webgpu","canvas"];async function Gs(t){let e=[];t.preference?(e.push(t.preference),Xn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Xn.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Hs()){const{WebGPURenderer:a}=await En(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-BcFCuVN7.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&js(t.failIfMajorPerformanceCaveat??Cr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await En(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-D5wgnrKu.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Sr="8.8.1";class Tr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Sr)}static destroy(){}}Tr.extension=C.Application;class qs{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Sr)}destroy(){this._renderer=null}}qs.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const kr=class cn{constructor(...e){this.stage=new b,e[0]!==void 0&&We(It,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Gs(e),cn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return We(It,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=cn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};kr._plugins=[];let Ir=kr;Bt.handleByList(C.Application,Ir._plugins);Bt.add(Tr);var Ws=`in vec2 aPosition;
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
`,Js=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,jn=`struct GlobalFilterUniforms {
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
}`;const Or=class Pr extends q{constructor(e){e={...Pr.defaultOptions,...e};const n=be.from({vertex:{source:jn,entryPoint:"mainVertex"},fragment:{source:jn,entryPoint:"mainFragment"}}),o=E.from({vertex:Ws,fragment:Js,name:"alpha-filter"}),{alpha:r,...i}=e,s=new _o({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Or.defaultOptions={alpha:1};let Ys=Or;class Qe extends Ae{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof fe?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ve.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ve.shared.add(this.update,this,vi.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(fe.from(e[o]));return new Qe(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(fe.from(e[o]));return new Qe(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof fe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ve.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ve.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Zs extends yi{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new xi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Qs(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(We(It,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Ks extends Zs{constructor(...e){const n=Qs(e,"Text");super(n,wi),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Ci.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class Sn extends fe{static create(e){return new Sn({source:new Si(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}function ea(t){return{all:t=t||new Map,on:function(e,n){var o=t.get(e);o?o.push(n):t.set(e,[n])},off:function(e,n){var o=t.get(e);o&&(n?o.splice(o.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var o=t.get(e);o&&o.slice().map(function(r){r(n)}),(o=t.get("*"))&&o.slice().map(function(r){r(e,n)})}}}const ta=(t,e)=>{if(e)return Ti(e.gameState.characterRooms,([o,r])=>[o,r.id]);const n={};for(const o of Object.values(t.rooms))for(const r of Object.values(o.items))if(r.type==="player"){const{which:i}=r.config;n[i]=o.id}if(n.head===void 0&&n.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return n},Hn=({campaign:t,inputStateTracker:e,savedGame:n,writeInto:o={}})=>{const r=ta(t,n),i={},s=n?n.gameState.characterRooms.head&&at(n.gameState.characterRooms.head):r.head&&nn({roomJson:t.rooms[r.head],roomPickupsCollected:i[r.head]??ne,isNewGame:n===void 0}),a=r.heels===r.head?s:n?n.gameState.characterRooms.heels&&at(n.gameState.characterRooms.heels):r.heels&&nn({roomJson:t.rooms[r.heels],roomPickupsCollected:i[r.heels]??ne,isNewGame:n===void 0}),l=n?.gameState.characterRooms.headOverHeels&&at(n.gameState.characterRooms.headOverHeels),c={head:s,heels:a,headOverHeels:l};return Object.assign(o,{events:ea(),inputStateTracker:e,campaign:t,gameSpeed:1,...n?at(n?.gameState):{currentCharacterName:r.head===void 0?"heels":"head",entryState:{head:s===void 0?void 0:Pt(Fn("head",s?.items)),heels:a===void 0?void 0:Pt(Fn("heels",a?.items))},pickupsCollected:i,gameTime:0,progression:0},characterRooms:c})},g={pureBlack:new w("#000000"),shadow:new w("#325149"),midGrey:new w("#7F7773"),lightGrey:new w("#BBB1AB"),white:new w("#FBFEFB"),pastelBlue:new w("#75ACFF"),metallicBlue:new w("#366CAA"),pink:new w("#D68ED1"),moss:new w("#9E9600"),redShadow:new w("#805E50"),midRed:new w("#CA7463"),lightBeige:new w("#DAA78F"),highlightBeige:new w("#EBC690"),alpha:new w("#1E7790"),replaceLight:new w("#08A086"),replaceDark:new w("#0A4730")},me=t=>{const[e,n,o]=t.toUint8RgbArray();return new w({r:e/2,g:n/2,b:o/2})},V={original:new w(Z.zxWhite),basic:g.white,dimmed:g.lightGrey},X={original:new w(Z.zxYellow),basic:g.midRed,dimmed:g.redShadow},W={original:new w(Z.zxMagenta),basic:g.pink,dimmed:me(g.pink)},I={original:new w(Z.zxCyan),basic:g.pastelBlue,dimmed:me(g.pastelBlue)},J={original:new w(Z.zxGreen),basic:g.moss,dimmed:me(g.moss)},Tn={white:{basic:{main:V,edges:{towards:I,right:X},hud:{lives:X,dimmed:W,icons:I}},dimmed:{main:V,edges:{towards:J,right:I},hud:{lives:X,dimmed:W,icons:I}}},yellow:{basic:{main:X,edges:{towards:J,right:V},hud:{lives:I,dimmed:W,icons:J}},dimmed:{main:X,edges:{towards:I,right:I},hud:{lives:I,dimmed:W,icons:J}}},magenta:{basic:{main:W,edges:{towards:J,right:I},hud:{lives:V,dimmed:I,icons:X}},dimmed:{main:W,edges:{towards:J,right:I},hud:{lives:V,dimmed:I,icons:X}}},cyan:{basic:{main:I,edges:{towards:W,right:V},hud:{lives:V,dimmed:J,icons:X}},dimmed:{main:I,edges:{towards:W,right:V},hud:{lives:V,dimmed:J,icons:X}}},green:{basic:{main:J,edges:{towards:I,right:X},hud:{lives:V,dimmed:W,icons:I}},dimmed:{main:J,edges:{towards:I,right:X},hud:{lives:V,dimmed:W,icons:I}}}},kn=t=>Tn[t.hue][t.shade],Pe={head:g.pastelBlue,heels:g.pink},St=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+An>n?100-Math.ceil((n-e)/(An/100)):0},_r=t=>t.type==="headOverHeels"?St(t.state.head)>0||St(t.state.heels)>0:St(t.state)>0,Br=t=>{const e=100*M.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/M.w):0},it=`in vec2 aPosition;
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
`,na=`in vec2 vTextureCoord;
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
`;class Ce extends q{constructor(e){const n=Object.keys(e).length,o=E.from({vertex:it,fragment:na.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const oa=`precision mediump float;
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
`;class R extends q{uniforms;constructor(e="white"){const n=E.from({vertex:it,fragment:oa,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new w(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ra=`precision mediump float;
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
`;class ia extends q{constructor(){const e=E.from({vertex:it,fragment:ra,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Fr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Ar=t=>Fr(Tn[t.color.hue][t.color.shade].main),Mr=t=>new Ce({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&Ar(t)}),sa=new Ce({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),aa=t=>new Ce({replaceLight:t,replaceDark:me(t)}),un=(t,e,n)=>n?new Ce(Fr(Tn[t.color.hue][t.color.shade].edges[e])):new R(kn(t.color).edges[e].original),oe=t=>new Ce(Ar(t)),Gn=new ia,ge=ki,qn={x:.5,y:1},Wn=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(Wn(t)?c=la(t):c=new Ae(ae().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const v=p({...t,times:void 0,label:`(${f},${h},${m})`}),P=T({x:f-1,y:h-1,z:m-1});v.x+=P.x,v.y+=+P.y,d.addChild(v)}return d}if(e===void 0&&o===void 0)if(Wn(t))c.anchor=qn;else{const u=ae().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=qn}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function la({animationId:t,reverse:e,playOnce:n}){const r=ae().animations[t].map(s=>({texture:s,time:Bo}));e&&r.reverse();const i=new Qe(r);return i.animationSpeed=Fo.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const ca=`#version 300 es

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
`;class Fe extends q{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=E.from({vertex:it,fragment:ca,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const Q=new Fe({outlineColor:g.pureBlack,upscale:y.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),He=new R,Jn=new R,dn=new R,Yn=new R(g.moss),Ge=new R,Y=[He,Q],ua=[Ge,Q],da=[Q,dn],ht={original:[Q,Ge],colourised:{head:{active:[Q,new R(Pe.head)],inactive:[Q,new R(me(Pe.head))]},heels:{active:[Q,new R(Pe.heels)],inactive:[Q,new R(me(Pe.heels))]}}},Se=14,fa=2,ha=Math.cos(30*(Math.PI/180)),pa=40;class ma{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Se,y:-14,filter:Y}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Se,y:Se,filter:Y}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Se,filter:Y}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:Y}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Se*Math.SQRT2,filter:Y}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Se*Math.SQRT2,filter:Y}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:Y}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:Y})}:{}},this.output.addChild(this.#e),this.output.addChild(new j().circle(0,0,pa).fill("#00000000"));for(const o of K(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?ge:He}output=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=O};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Ii(y.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=Oi({x:-c,y:-u}),f=Pi(d,ha),h=F(f,fa);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(y.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Me(e)>_i?Ao(e):void 0;for(const[r,i]of Mo(this.arrowSprites))i.filters=r===o?ua:Y}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const fn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey},zx:{jump:Z.zxBlue,fire:Z.zxYellow,carry:Z.zxGreen,carryAndJump:Z.zxRed,menu:Z.zxWhite}};function Ke(t,e){const n=e||new b;for(const o of t)n.addChild(o);return n}function*Dr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${e[o]}`;Bi(r),yield p({textureId:r,x:(o+.5-n/2)*xt.w})}}function ke(t,e){return t.removeChildren(),Ke(Dr(e),t),t}function ga(t,e){return t.removeChildren(),Ke(Dr(e),t),t}const _t=Symbol(),zr=Symbol(),Lr=Symbol(),pt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),o=new b({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=aa(fn.colourised[e]):o.filters=new R(fn.zx[e]),n.addChild(r);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[zr]=r,o[_t]=i,o[Lr]=n,o},Ue=(t,...e)=>{t[_t].removeChildren();for(const n of e)n!==void 0&&t[_t].addChild(n)},mt=(t,e)=>{t[zr].texture=ae().textures[e?"button.pressed":"button"],t[Lr].y=e?1:0},Zn=(t,e,n)=>{n&&(t[_t].filters=e?Mr():ge)},Qn=({which:t},e,n)=>{const o=ga(new b,n);return o.filters=new Ce({white:e?me(fn.colourised[t]):g.pureBlack}),o};class Rr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const Ur=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),ba=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},Kn=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>ba(t,e,n,o),In=(t,e,n=.001)=>{if(!xe(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:vn({state:{position:U(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+Fi},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Er=(t,e)=>{const o=[...le(e).filter(i=>In(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=as(s,i);return a<0||a===0&&Kn(t,s)>Kn(t,i)?s:i})},qe=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<ls};function $r({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(_r(e)||qe(e)||(e.state.action="death",e.state.expires=t+on))}const re=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,et=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Nr=t=>{const{gameState:e,movingItem:n,touchedItem:{id:o,config:r},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:a}=e;if(a[i]?.[o]!==!0)switch(s[o]&&(a[i]===void 0&&(a[i]={}),a[i][o]=!0),r.gives){case"hooter":{const l=Ct(n);if(l!==void 0){l.hasHooter=!0;break}break}case"doughnuts":{const l=Ct(n);l!==void 0&&(l.doughnuts=re(l.doughnuts,6));break}case"bag":{const l=Ye(n);if(l!==void 0){l.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const l=Ct(n);l!==void 0&&(l.fastStepsStartedAtDistance=l.gameWalkDistance);break}case"jumps":{const l=Ye(n);l!==void 0&&(l.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=re(n.state.head.lives,2),n.state.heels.lives=re(n.state.heels.lives,2)):n.state.lives=re(n.state.lives,2);break;case"scroll":y.dispatch(zi(r.page));break;case"reincarnation":{y.dispatch(Mi(Di(e,y.getState())));break}case"crown":{y.dispatch(Ai(r.planet));break}}},va=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Do(i,o)<=0||e.state.action!=="death"&&yn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},ya=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Ft(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function xa({movingItem:t}){t.state.autoWalk=!1}const te=(t,...e)=>H(...e)(t.touchedItem),Ee=(t,...e)=>H(...e)(t.movingItem),Vr=t=>L(t.movingItem),wa=t=>L(t.touchedItem),Ca=t=>Eo(t.touchedItem),eo=t=>{switch(!0){case te(t,"stopAutowalk"):xa(t);break;case Ca(t):$r(t);break;case te(t,"portal"):va(t);break;case te(t,"pickup"):Nr(t);break;case te(t,"doorFrame"):ya(t);break}},G={movementType:"steady"},On=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=$o(e.items);if(r!==void 0)return qe(r)?void 0:r;const i=n===void 0||qe(n)||n.state.action==="death"?void 0:_n(n.state.position,t),s=o===void 0||qe(o)||o.state.action==="death"?void 0:_n(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},Xr=150,jr=t=>t[Math.floor(Math.random()*t.length)],se=Object.freeze({movementType:"vel",vels:{walking:O}}),zt=t=>No(t)?he[t.config.which]:he[t.type],to=M.w/2,Sa=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=he.homingBot;if(!At(e,ie))return{movementType:"steady"};const{head:s,heels:a}=$o(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=nt(l.state.position,t);if(Math.abs(c.y)<to)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<to)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Ta=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return se;const l=On(r,e);if(l===void 0||s+Xr>e.roomTime)return G;const c=nt(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>M.w/4?u:ot(u),f=zt(t),h={...O,[d]:c[d]>0?f:-f},m=ve(h),v=!At(m,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:ne}}},no=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return se;const a=On(i,e);if(a===void 0)return se;const l=a.state.position,c=M.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return se;const d=nt(a?.state.position,i),f=zt(t),h=(1+Math.sqrt(2))/2,m=f*h,v=F({...d,z:0},m/zo(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:ve(v)}}},Xt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return se;if(!(ye(i,O)||Math.random()<o/1e3))return G;const l=jr(r);return{movementType:"vel",vels:{walking:F(tn[l],zt(t))},stateDelta:{facing:tn[l]}}},ka=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?se:At(i,ie)?{movementType:"vel",vels:{walking:F(r,zt(t))}}:G},Ia=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=jr([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},jt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<Xr))return;const c=Mt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Ia(s,c,r);t.state.vels.walking=u,t.state.facing=ve(u),t.state.durationOfTouch=0},Oa=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},Pa=(t,e,n,o)=>{if(!t.state.activated||No(t)&&t.state.busyLickingDoughnutsOffFace)return se;switch(t.config.movement){case"patrol-randomly-diagonal":return Xt(t,e,n,o,Ei);case"patrol-randomly-xy8":return Xt(t,e,n,o,Ui);case"patrol-randomly-xy4":return Xt(t,e,n,o,Ri);case"towards-tripped-on-axis-xy4":return Sa(t,e);case"towards-on-shortest-axis-xy4":return Ta(t,e);case"back-forth":case"clockwise":return ka(t);case"unmoving":return se;case"towards-analogue":return no(t,e);case"towards-analogue-unless-planet-crowns":return no(t,e,n,o,Li(y.getState()));default:throw t.config,new Error("this should be unreachable")}},_a=t=>{const{movingItem:e,touchedItem:n}=t;if(xe(n,e))switch(e.config.movement){case"patrol-randomly-xy4":jt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":jt(t,"opposite");break;case"clockwise":jt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Oa(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},Ba=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s]})}break}case"in-store":{y.dispatch($i(o.path));break}}},Fa=({movingItem:t,touchedItem:e})=>{if(!xe(t))return;const{state:{position:n},aabb:o}=e,r=Mt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=ve(r),s=F(i,-.05);return e.state.vels.sliding=s,!1},Aa=({movingItem:t,touchedItem:e})=>{if(!xe(e))return;const n=t.state.vels.sliding;if(ye(n,O))return;const{state:{position:o},aabb:r}=t,i=Mt(e.state.position,e.aabb,o,r);return Do(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},Ma=2*cs,Hr=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Ma,positionDelta:n})},Da=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...Lo(o.state.position,r),z:0};if(!ye(s,O))for(const a of rt(o.state.stoodOnBy,e))Hr(a,e,s)}},za=({movingItem:t,room:e,touchedItem:n,deltaMS:o})=>{const{config:{controls:r},state:{position:i},aabb:s}=n,a=Mt(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=ve(a);for(const c of r){const u=e.items[c],d=F(l,-.025*o);u.state.facing=d,Hr(u,e,d)}},Pn=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:gn(y.getState(),t),La=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&H("teleporter")(l)&&Pn(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:on}}}:G;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return yn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:on}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},gt=t=>{const n=t/hs*Bo;return(t+.5*rn*n**2)/n},Ra={head:gt(lt.head),headOnSpring:gt(lt.head+M.h),heels:gt(lt.heels),heelsOnSpring:gt(lt.heels+M.h)},Ua=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ra[`${n}${e?"OnSpring":""}`]},Ea=t=>!(t===null||ds(t)&&Pn(t)||fs(t)&&t.config.gives==="scroll"||L(t)&&t.state.standingOnItemId===null),Gr=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=De(o,e);if(!(r.currentActionPress("jump")!=="released"&&Ea(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:G;const a=us(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Ua(t,a)}},stateDelta:{action:"moving",jumped:!0}}},$a=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Me(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return F(n,l)},oo={movementType:"vel",vels:{walking:O}},qr=(t,e,n,o)=>{const r=Na(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Me(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ye(r.vels.walking,O)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Na=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,v=o===t.id,P=v?n.currentActionPress("jump"):"released",D=v?n.directionVector:O,z=l===null&&m.z<0,_=i==="head"&&Br(t.state)>0&&l!==null,$=i==="headOverHeels"?z?"head":"heels":_?"heels":i,B=a?c:D,N=he[$];if(u!==null||s==="death")return oo;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Lo(h,F(h,ps*r))}}:oo;if(P!=="released"){const st=ve(At(B,ie)?c:B),hi=H("spring")(De(l,e))?1:ms;return{movementType:"vel",vels:{walking:F({...st,z:0},N*hi)},stateDelta:{facing:st}}}}if(Me(B)!==0)return z?{movementType:"vel",vels:{walking:F({...B,z:0},N)},stateDelta:{facing:B,action:"falling"}}:{movementType:"vel",vels:{walking:$a({vel:h,acc:gs[$],deltaMS:r,maxSpeed:N,unitD:B,minSpeed:0})},stateDelta:{facing:B,action:"moving"}};if(d>0&&d<1){const st=ye(f,c)?1:0;return{movementType:"position",posDelta:F(c,st-d),stateDelta:{action:z?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:z?"falling":"idle"}}},ro=t=>we(t.movingItem)&&In(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Wr=(t,e)=>{let n=O;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(we(t)||H("lift")(t)))for(const[i,s]of Mo(o.vels)){const a={...O,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},io=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&L(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&ro(t)){if(ro(t)&&Vr(t)){Vo({above:t.movingItem,below:t.touchedItem});const n=[Gr(t.movingItem,t.room,t.gameState),qr(t.movingItem,t.room,t.gameState,t.deltaMS)];Wr(t.movingItem,n)}Xo(t)}};function Va(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Jr=t=>{Vr(t)&&eo(t),wa(t)&&eo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),te(t,...Mn)&&Fa(t),Ee(t,...Mn)&&Aa(t),(Ee(t,"monster")&&te(t,"firedDoughnut")||Ee(t,"firedDoughnut")&&te(t,"monster"))&&Va(t),(Ee(t,"monster")||Ee(t,"movingPlatform"))&&_a(t),te(t,"switch")&&Ba(t),te(t,"joystick")&&za(t),t.touchedItem.state.disappear&&io(t),t.movingItem.state.disappear&&xe(t.touchedItem,t.movingItem)&&io({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Xa=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=pe(e.items).filter(jo),u=s===null?Yr(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;ja(e,i,u)}else{if(t.state.standingOnItemId===null||!Zr(t,Ho(e.items)))return;const h=bs({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Go({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Jr}),i.carrying=null}},ja=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,qo({room:t,item:n})},Yr=(t,e)=>Er(t,pe(e.items).filter(jo)),Zr=(t,e)=>{const n={position:U(t.state.position,{z:M.h})},o=vs({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(xe(r,t)){if(!we(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!Zr(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Ht=-11,Ha={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter",u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?pt({colourise:n,button:t}):r;if(o?.pressed!==u&&mt(d,u),c!==o?.standingOnTeleporter)if(c)Ue(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Qn(t,n,"JUMP");f.y=Ht,Ue(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const a=i&&Ye(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&Yr(i,s)!==void 0,d=t.actions.every(v=>e.currentActionPress(v)!=="released"),f=l&&!u&&c===null,h=r===null?pt({colourise:n,button:t}):r;if(h.visible=l,l&&(f!==o?.disabled&&Zn(h,f,n),h.visible=!0,o?.pressed!==d&&mt(h,d),l!==o?.hasBag||c!==o?.carrying)){let v;c!==null?v=Ur(c):l&&(v=p({textureId:"bag",y:-2})),Ue(h,v)}return{output:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&Ct(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?pt({colourise:n,button:t}):r,d=a||et(l)>0;if(u.visible=d,d&&(o?.pressed!==c&&mt(u,c),a!==o?.hasHooter||l!==o?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):et(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=ke(new b,l);h.y=Ht,h.filters=Q,Ue(u,f,h),Zn(u,l===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const a=(i&&Ye(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||l!==o.pressed||n!==o.colourise||a!==o.hasBag))return"no-update";let u;if(r===null){u=pt({colourise:n,button:t});const d=Qn(t,n,"C+J");d.y=Ht,Ue(u,d)}else u=r;return a?(u.visible=!0,o?.pressed!==l&&mt(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=Y,{output:e,renderProps:ne}}};class $e extends Rr{constructor(e){const n=Ha[e.button.which];super(e,n)}}const Ga=30,qa=15,Wa=42,Ja=36,Ya=44,Za=20;class Qa{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new $e({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new $e({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new $e({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new $e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new $e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n})},joystick:new ma({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const l of K(i))l.renderContext.button.which==="menu"?this.#e.addChild(i.menu.output):s.addChild(l.output);i.jump.output.y=qa,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=Ga,i.menu.output.x=24,i.menu.output.y=24,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of K(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Ya,this.#n.mainButtonNest.y=e.y-Za,this.#n.joystick.output.x=Wa,this.#n.joystick.output.y=e.y-Ja}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of K(this.#n.buttons))r.tick({...e,currentPlayable:ze(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}Fo.frames.button.frame;const Ka=250,el=t=>t?48:24,tl=t=>t?68:56,nl=(t,e)=>t?e.x/2-24:80,ol=t=>t?72:24,rl=t=>t?88:0,so=112,Ne=t=>t==="heels"?1:-1;class il{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Et)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[Yn],this.#t.fps.y=xt.h,this.#o(),n&&(this.#n=new Qa({...e}),this.#e.addChild(this.#n.output))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#l("head"),livesText:this.#r({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#i({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#i({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#i({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#i({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#l("heels"),livesText:this.#r({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#i({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#i({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#i({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#r({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Et){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#i({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new Ae({texture:ae().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Jn,y:n?0:8});s.addChild(a);const l=this.#r({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=xt.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=Q),{text:l,icon:a,container:s}}#l(e){const n=new Ae(ae().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#r({doubleHeight:e=!1,outline:n=!1,label:o="text"}={}){return new b({label:o,filters:n?da:dn,scale:{x:1,y:e?2:1}})}#s({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ne("head")*so,this.#t.head.doughnuts.container.y=e.y-Xe.h-8,this.#t.heels.carrying.container.y=e.y-Xe.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ne("heels")*so,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-xt.w*2}#a(e,n){return e?n?ge:Ge:n?Gn:He}#c(e){const{renderContext:{gameState:n}}=this,o=ct(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(Ur(i)),a.filters=this.#a(!0,s),this.#t.heels.bag.icon.filters=this.#a(r,s)}#f(e){const{renderContext:{gameState:n}}=this,o=ct(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#a(r,s),this.#t.head.doughnuts.icon.filters=this.#a(i!==0,s),ke(this.#t.head.doughnuts.text,i)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ct(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=St(i),d=u>0||!o;a.visible=d,d&&(ke(s,u),a.y=n.y-rl(o)),c.x=a.x=(n.x>>1)+Ne(e)*nl(o,n);const f=i===void 0?0:e==="head"?Br(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(ke(l,f),c.y=n.y-ol(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#u(r,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?ge:Ge:s.filters=a?Gn:He,s.x=(n.x>>1)+Ne(e)*tl(o),s.y=n.y-Xe.h}#m(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ct(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ne(e)*el(o),a.y=n.y,ke(a,s??0)}#g(e){const{room:n}=e;if(n===void 0)return;const o=kn(n.color),{colourise:r,gameState:i}=this.renderContext;He.targetColor=o.hud.dimmed[r?"dimmed":"original"],dn.targetColor=o.hud.dimmed[r?"basic":"original"],Jn.targetColor=o.hud.icons[r?"basic":"original"],Ge.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?ht.colourised.head[this.#u(i,"head")?"active":"inactive"]:ht.original,this.#t.heels.livesText.filters=r?ht.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:ht.original}#d=Ni;#b(){if(Vi(y.getState())){if(performance.now()>this.#d+Ka){const e=Ve.shared.FPS;ke(this.#t.fps,Math.round(e)),Yn.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#g(e);for(const n of Et)this.#m(n,e),this.#p(n,e),this.#h(n,e);this.#s(e),this.#f(e),this.#c(e),this.#b(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const ao={movementType:"vel",vels:{gravity:O}},sl=(t,e,n,o)=>{if(!xe(t))return ao;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=ys[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=De(s,e);return H("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-rn*o,-l)}}}:ao}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-rn*o,-l)}}}},lo=M.h,co=.001,al=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=Dn**2/(2*Le);if(n==="up"){if(e<=o)return Math.max(co,Math.sqrt(2*Le*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(co,Math.sqrt(2*Le*r))}else return Dn}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Le*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Le*Math.max(e,0))):-.036};function ll({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}}){const r=t*lo,i=e*lo,s=al({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}}const uo={movementType:"vel",vels:{movingFloor:O}},cl=(t,e,n,o)=>{if(L(t)&&t.state.teleporting!==null)return uo;const{state:{standingOnItemId:r}}=t,i=De(r,e);if(i===null||!H("conveyor")(i))return uo;const{config:{direction:s}}=i,l=H("heels")(t)&&t.state.action==="moving"&&bn(t.state.facing)===Xi(s)?he.heels:xs;return{movementType:"vel",vels:{movingFloor:F(tn[s],l)}}};function*ul(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const dl=M.w*Math.sqrt(2)+1,fl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=ve(d);if(r.currentActionPress("fire")==="tap"&&a&&et(s)>0&&l+f<c){const m={type:"firedDoughnut",...ws,config:ne,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,F(h,dl),t.type==="headOverHeels"?{z:M.h}:O),vels:{fired:F(h,he.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};xn({room:e,item:m}),i.doughnuts=re(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},Qr=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),hl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),bt=M.w*3,pl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-bt&&n.x<o.x+bt&&n.y>o.y-bt&&n.y<o.y+bt},fo=(t,e,n,o,r)=>{if(r&&t.state.activated)return G;const i=On(t.state.position,e);return i===void 0?G:pl(t,i)?Qr:hl},ml=(t,e,n,o)=>t.state.activated?G:rt(t.state.stoodOnBy,e).some(L)?Qr:G,gl=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return fo(t,e,n,o,!0);case"while-player-near":return fo(t,e,n,o,!1);case"on-stand":return ml(t,e);case"off":case"on":return G;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},bl=2;function*vl(t,e,n,o){we(t)&&(yield sl(t,e,n,o),yield cl(t,e),yield*ul(t,e)),L(t)&&(yield qr(t,e,n,o),t.id===n.currentCharacterName&&(yield La(t,e,n,o),yield Gr(t,e,n),Cs(t)&&Xa(t,e,n,o),Ss(t)&&fl(t,e,n))),Ts(t)&&(yield ll(t)),ks(t)&&(yield gl(t,e,n,o),yield Pa(t,e,n,o))}const yl=(t,e,n,o)=>{if(!we(t)||t.state.standingOnItemId===null)return;const r=De(t.state.standingOnItemId,e);L(t)&&r.type==="pickup"&&Nr({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||L(t)&&r.state.disappear==="onTouchByPlayer")&&Xo({touchedItem:r,gameState:n,room:e})},xl=(t,e,n,o)=>{if(L(t)&&t.state.standingOnItemId!==null){const l=De(t.state.standingOnItemId,e);Eo(l)&&$r({room:e,movingItem:t})}const r=[...vl(t,e,n,o)];yl(t,e,n);let i=Wr(t,r);(we(t)||H("lift")(t)||H("firedDoughnut")(t))&&(i=U(i,...le(K(t.state.vels)).map(l=>F(l,o))));const s=Math.ceil(Me(i)/bl),a=F(i,1/s);for(let l=0;l<s;l++)Go({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:o,onTouch:Jr})},wl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=re(e.state.head.lives,-1),e.state.heels.lives=re(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,re(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=et(e.state.head.lives)>0,i=et(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,de(t,e);const u=zn(e)[c],d=_e({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Pt(u)};return}if(t.entryState.headOverHeels!==void 0){de(t,e);const c=_e({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=zn(e);if(de(t,c),de(t,u),vn(c,u)){const d=Wo({head:c,heels:u});de(t,d,"heels");const f=_e({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Pt(d)};return}else{const d=_e({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},_e=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=nn({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??ne});for(const i of e)xn({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Is(r,t);return r},de=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Cl=(t,e)=>{const n=Jo(t,Yo(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];de(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=Wo({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});de(t,a);const l=_e({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}xn({room:o,item:e});return}else{const s=_e({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Sl=(t,e)=>{e.type==="headOverHeels"?wl(t,e):Cl(t,e),ze(t)===void 0&&y.dispatch(ji({offerReincarnation:!0}))},Tl=t=>{for(const e of pe(t.items))for(const n of rt(e.state.stoodOnBy,t)){if(!t.items[n.id]){Ln(n,t);continue}if(!In(n,e)){Ln(n,t);const o=Er(n,Ho(t.items));o!==void 0&&Vo({above:n,below:o})}}},kl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,Il=(t,e,n)=>{for(const o of pe(t.items))!we(o)||t.roomTime===o.state.actedOnAt||Hi(o.state.position)||(console.log(`snapping item ${o.id} to pixel grid (not acted on in tick)`),o.state.position=Gi(o.state.position),n.add(o))},Ol=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},Pl=ne,_l=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let o=0;o<t.gameSpeed;o++){const r=ho(t,e),i=Ze(t)?.items??Pl;n=new Set(le(sn(n,r)).filter(({id:s})=>i[s]!==void 0))}return n}return ho(t,e*t.gameSpeed)},ho=(t,e)=>{const{inputStateTracker:n}=t,o=Ze(t);if(o===void 0)return Ro;const r=Object.fromEntries(Os(o.items).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&$t(t),n.currentActionPress("swop.head")==="tap"&&$t(t,"head"),n.currentActionPress("swop.heels")==="tap"&&$t(t,"heels");for(const a of K(o.items))kl(a,o)&&(qo({room:o,item:a}),L(a)&&Sl(t,a));const i=Object.values(o.items).sort(Ol);for(const a of i){const l=ze(t);if(l===void 0||l.state.action==="death")break;o.items[a.id]!==void 0&&xl(a,o,t,e)}Tl(o);const s=new Set(le(K(o.items)).filter(a=>r[a.id]===void 0||!ye(a.state.position,r[a.id])));return Da(s,o,r),Il(o,r,s),Bl(t,o,e),s},Bl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=ze(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Jo(t,Yo(o.type));i!==void 0&&(i.state.gameTime+=n)}}},po=(t,e)=>{const n=S(t),o=S(U(t,{x:e.x,z:e.z})),r=S(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Gt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,Fl=(t,e,n,o)=>{const r=po(t,e),i=po(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Gt(s,a,l,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=Gt(d,f,h,m),P=r.topLeft.y+r.topLeft.x/2,D=r.bottomCentre.y+r.bottomCentre.x/2,z=i.topLeft.y+i.topLeft.x/2,_=i.bottomCentre.y+i.bottomCentre.x/2,$=Gt(P,D,z,_);return u&&v&&$},Al=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!Fl(n,o,r,i))return 0;for(const s of qi){const a=t.state.position[s],l=a+o[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return mo(e)-mo(t)},mo=t=>t.state.position.x+t.state.position.y-t.state.position.z;class Tt extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Ml=t=>{const e=Dl(t);let n=e.length,o=n;const r=new Array(n),i={},s=zl(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new Tt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(m){throw m instanceof Tt?m.hasClosedCycle?m:new Tt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}r[--n]=l}};function Dl(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function zl(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const go=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},vt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Ll=(t,e=new Set(K(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||vt(n,r,s);for(const r of e)if(r.renders)for(const i of K(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=Al(r,i);if(go(o,r,i),s===0){vt(n,r.id,i.id),vt(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;go(n,a,l),vt(n,l,a)}return n},Kr=(t,e,n=3)=>{try{return{order:Ml(t),impossible:!1}}catch(o){if(o instanceof Tt){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:Kr(t,e,n-1).order,impossible:!0}}else throw o}};class Rl extends Rr{}const bo=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},vo=(t,e)=>{const n=new j;return bo(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),bo(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Ul={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class El{constructor(e){this.renderContext=e;const{item:n}=e,o=Ul[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),H("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new j().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new j().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new j({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(vo(n.aabb,o)),n.renderAabb&&this.#e.addChild(vo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new Ks({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class $l{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const Nl=(t,e)=>{const n=e.getLocalBounds(),o=Sn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new Ae({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},yo=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof Ae?r:Nl(t,r)};class Vl{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=y.getState();n||(this.#e.filters=new Ys({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,a=yo(r,i,s);o.shadowMask.relativeTo==="top"&&(a.y-=o.aabb.z),s&&(a.y-=((s.z??1)-1)*M.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),a=o.state.position.z+o.aabb.z,l=pe(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:a}},aabb:{...o.aabb,z:Ps}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":vn(c,d)?f?"update":"create":"noShadow"});for(const d of sn(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=yo(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of sn(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...nt(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Ot(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const Xl=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,jl=(t,e,n)=>{const r=ae().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ae().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},yt=t=>A(({renderContext:{item:e}})=>_s(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),A=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:ne}:"no-update";function*Hl({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Ft(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...wt(a,{y:-12*n})});l.filters=un(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...wt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...wt(a,{y:-l*M.h})})}}yield*s(T({...ie,[r]:1})),yield*s(ie),e||(yield p({pivot:{x:16,y:M.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...T({...ie,[r]:1})}))}const ei=(t,e)=>{const n=Ft(t),o=ot(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):ie},Gl=A(({renderContext:{item:t,room:e}})=>Ke(Hl(t,e),new b({filters:oe(e),...ei(t.config.direction,t.aabb)}))),ql=A(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Ft(t),a=i.rooms[n];return p({textureId:jl(r,s,e),filter:oe(a),...ei(t,o)})}),qt={animationId:"bubbles.cold"},Be=({top:t,bottom:e="homingBot",filter:n})=>{const o=new b({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},ti=Symbol(),ni=Symbol(),Wl=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[ti]=t,n[ni]=e,n},Jl=`#version 300 es

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
`;class xo extends q{constructor(e){const n=E.from({vertex:it,fragment:Jl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const Yl=({name:t,action:e,facingXy8:n,teleportingPhase:o})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(o==="out")return{animationId:`${t}.fadeOut`};if(o==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(Ji(i))return{textureId:i}}const r=`${t}.idle.${n}`;return Yi(r)?{animationId:r}:{textureId:`${t}.walking.${n}.2`}},hn=Symbol(),pn=Symbol(),Zl=(t,e)=>{t[hn].removeChildren(),t[hn].addChild(p(Yl(e)))},Wt=(t,e)=>{const n=new b,o=new b;n[hn]=o,n.addChild(o);const r=p({animationId:e?`shine.${t}InSymbio`:"shine",filter:t==="heels"?new Ce({pastelBlue:g.pink}):ge,flipX:t==="heels"});return n[pn]=r,n},wo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Bs>t,Ql=t=>{if(!qe(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Rn<Rn*.15},Co=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},So=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?ge:t.filters},Kl=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Co(r,new Fe({outlineColor:Pe[t],upscale:y.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&So(r,Fe);const s=o?.flashing??!1;n&&!s?Co(r,new xo(Pe[t])):!n&&s&&So(r,xo)},ec=(t,e,n)=>{e&&!n?t.addChild(t[pn]):!e&&n&&t.removeChild(t[pn])},Jt=(t,e,n,o,r)=>{n&&Zl(e,{name:t,...o}),Kl(t,o,r,e),ec(e,o.shining,r?.shining??!1)},Yt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n},previousRendering:o})=>{const{type:r,state:{action:i,facing:s,teleporting:a}}=e,l=Ao(s)??"towards",c=e.type==="headOverHeels"?wo(e.state.head,"headOverHeels","headOverHeels"):wo(e.state,e.type,n.currentCharacterName),u=Ql(e),d=_r(e),f=Me(s),h=a?.phase??null,m={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c,shining:d},v=t===void 0||t.action!==i||t.facingXy8!==l||t.teleportingPhase!==h;let P;if(r==="headOverHeels"){P=o??Wl({top:Wt("head",!0),bottom:Wt("heels",!0)});const D=P;Jt("head",D[ti],v,m,t),Jt("heels",D[ni],v,m,t)}else P=o??Wt(r,!1),Jt(r,P,v,m,t);return i==="moving"&&o instanceof Qe&&(o.animationSpeed=f*Wi),{output:P,renderProps:m}},tc=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new b({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),r=Ke(le(Ot(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=Ke(le(Ot(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...T(wt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[ot(Je(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},nc=t=>[...le(K(t.items)).filter(e=>e.type==="wall").filter(e=>Je(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],oc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},rc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new j().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),ic=A(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Dt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const z=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,_=new b;for(let B=-1;B<=r+2;B++)for(let N=B%2-1;N<=i+2;N+=2)_.addChild(Fs({x:B+(s.right?-.5:0),y:N+(s.towards?-.5:0)},p({textureId:z})));_.addChild(tc(h,{x:n,y:o}));const $=new j().poly([ie,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});_.addChild($),_.filters=oe(t),_.mask=$,m.addChild(_)}const v=nc(h),P=new j().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(P);const D=oc(v);if(D!==void 0){const z=rc({extraWallRanges:D,blockXMin:n,blockYMin:o});m.addChild(z)}return m.mask=P,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),sc=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=T({x:-t,y:-e}),i={towards:new b({label:"towards",...r}),right:new b({label:"right",...r})};return le(Ot(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...T(f),times:a.type==="wall"?a.config.times:{[ot(Je(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(f,{x:-.5}))}))}),i},ac=A(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Dt(e.roomJson),l=r-n,c=i-o,u=new b({label:"floorEdge"}),d=new j({label:"overDrawToHideFallenItems"}).poly([T({x:l,y:0}),T({x:0,y:0}),T({x:0,y:c}),{...T({x:0,y:c}),y:999},{...T({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=sc({blockXMin:n,blockYMin:o},e.roomJson);f.filters=un(e,"towards",t),h.filters=un(e,"right",t),u.addChild(f),u.addChild(h);const m=new j({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),lc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],cc=({renderContext:{item:{config:t,state:e},room:n},currentlyRenderedProps:o})=>{const{activated:r,busyLickingDoughnutsOffFace:i}=e,s=i?sa:r?void 0:lc.includes(t.which)?Mr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=bn(e.facing)??"towards";if(!(o===void 0||r!==o.activated||i!==o.busyLickingDoughnutsOffFace||a!==o.facingXy4))return"no-update";const c={facingXy4:a,activated:r,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{output:p({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{output:p(r&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Be({top:{textureId:`${t.which}.${a}`,filter:s||oe(n)},bottom:qt}):p({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{output:Be({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(o===void 0||i!==o.busyLickingDoughnutsOffFace||r!==o.activated))return"no-update";const l={activated:r,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{output:p(r&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,output:p({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{output:Be({top:qt,filter:s}),renderProps:l};case"emperorsGuardian":return{output:Be({top:"ball",bottom:qt,filter:s}),renderProps:l};case"emperor":return{output:p({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},tt=t=>{for(const e in t)return!0;return!1},uc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Zt=g.moss,To=()=>A(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),dc={head:Yt,heels:Yt,headOverHeels:Yt,doorFrame:ql,doorLegs:Gl,monster:cc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:A(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=ot(Je(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:Xl(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:je.w,y:je.h+1}:{x:0,y:je.h+1},filter:oe(o)}),l=T({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:A(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:A(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?oe(n):void 0,times:e})),slidingDeadly:To(),slidingBlock:To(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:uc(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?oe(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?gn(y.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}}},currentlyRenderedProps:o}){const r=tt(n);if(!(o===void 0||o.moving!==r))return"no-update";const s=new b,a=Je(t);return s.addChild(p(r?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{output:s,renderProps:{moving:r}}},lift:A(()=>{const t=new b,e={x:Xe.w/2,y:Xe.h};return t.addChild(p({animationId:"lift",pivot:e})),t.addChild(p({textureId:"lift.static",pivot:e})),t}),teleporter({renderContext:{item:t,room:e},currentlyRenderedProps:n}){const{state:{stoodOnBy:o},config:{times:r}}=t,i=Pn(t),s=i&&rt(o,e).find(L)!==void 0;return n===void 0||i!==n.activated||s!==n.flashing?{output:s?new b({children:[p({textureId:"teleporter",times:r}),p({animationId:"teleporter.flashing",times:r})]}):p({textureId:i?"teleporter":"block.artificial",times:r}),renderProps:{flashing:s,activated:i}}:"no-update"},pickup:A(({renderContext:{item:{config:t},room:e}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const o={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:oe(e)},reincarnation:{animationId:"fish"}}[t.gives];return p(o)}),moveableDeadly:A(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=bn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Be({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:yt("joystick"),movingPlatform:A(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:A(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new Fe({outlineColor:Zt,lowRes:!1,upscale:y.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}}},currentlyRenderedProps:n}){const o=tt(t);if(!(n===void 0||e!==n.highlighted||o!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new Fe({outlineColor:Zt,lowRes:!1,upscale:y.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p(!o&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:o?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:o,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new Fe({outlineColor:Zt,upscale:y.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Be({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:yt("hushPuppy"),bubbles:A(({renderContext:{item:{config:{style:t}}}})=>p({animationId:`bubbles.${t}`})),firedDoughnut:yt({animationId:"bubbles.doughnut"}),ball:yt("ball"),floor:ic,floorEdge:ac};class fc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(ne)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const ee=({playbackRate:t=1,soundId:e,connectTo:n,loop:o=!1,varyPlaybackRate:r=!1})=>{const i=x.createBufferSource(),s=ue()[e];return i.buffer=s,i.loop=o,i.playbackRate.value=r?t-.05+Math.random()*.1:t,i.connect(n),o?i.start(s.duration*Math.random()):i.start(),i};class hc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;n.type==="pickup"&&n.gives!=="scroll"&&ee({soundId:"bonus",connectTo:this.output})}output=x.createGain();tick(){}destroy(){}}const oi=({start:t,loop:e,stop:n,connectTo:o})=>{let r,i=!1;return s=>{s!==i&&(s?(r?.stop(),r=ee({...t,connectTo:o}),r.onended=()=>{r=ee({...e,connectTo:o,loop:!0})}):(r!==void 0&&(r.stop(),r.onended=null),r=ee({...n,connectTo:o})),i=s)}};class pc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5}output=x.createGain();#e=x.createGain();#n=oi({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5},connectTo:this.#e});tick(){const{renderContext:{item:{state:{latentMovement:e}}}}=this,n=e.length>0;this.#n(n)}destroy(){}}const Qt=2;class mc{constructor(e){this.renderContext=e}output=x.createGain();#e=oi({start:{soundId:"conveyorStart",playbackRate:Qt},loop:{soundId:"conveyorLoop",playbackRate:Qt},stop:{soundId:"conveyorEnd",playbackRate:Qt},connectTo:this.output});tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=tt(e);this.#e(n)}destroy(){this.#e(!1)}}const gc=3;class bc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=x.createGain();#e=ee({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+gc*e)}destroy(){}}const ko={cyberman:"jetpackTurnaround",skiHead:"softBump",turtle:"softBump",dalek:"mojoTurn"},Io={cyberman:"jetpackLoop",emperorsGuardian:"jetpackLoop",dalek:"mojoLoop",bubbleRobot:"bubbleRobotLoop",helicopterBug:"helicopter"};class vc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66}output=x.createGain();#e=x.createGain();#n=x.createGain();#t=null;#o={facing:O,online:!1};tick(){const{renderContext:{item:e}}=this,{config:{which:n},state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i}}=e,s=r&&!i,{facing:a,online:l}=this.#o;if(!ye(o,a)&&ko[n]!==void 0){const c=ue()[ko[n]],u=x.createBufferSource();u.buffer=c,u.connect(this.#e),u.start()}s!==l&&Io[n]!==void 0&&(s?this.#t=ee({soundId:Io[n],playbackRate:1,varyPlaybackRate:!0,loop:!0,connectTo:this.#n}):(this.#t?.stop(),this.#t=null)),this.#o={facing:o,online:s}}destroy(){}}class Kt{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=1.2,this.#t.connect(this.output)}output=x.createGain();#e=x.createGain();#n=null;#t=x.createGain();#o={action:"idle",carrying:!1,teleportingPhase:null};tick(){const{renderContext:{item:e}}=this,{type:n,state:{action:o,teleporting:r}}=e,i=!!Ye(e)?.carrying,{action:s,carrying:a,teleportingPhase:l}=this.#o,c=r?r.phase:null;if(o==="moving"&&s!=="moving"){const u=ue()[n==="headOverHeels"?"heelsWalk":`${n}Walk`];this.#n=x.createBufferSource(),this.#n.buffer=u,this.#n.loop=!0,this.#n.connect(this.#e),this.#n.start()}if(o!=="moving"&&s==="moving"&&(this.#n.stop(),this.#n=null),a!==i)if(a){const u=ue().carry,d=x.createBufferSource();d.buffer=u,d.playbackRate.value=.95,d.connect(this.#t),d.start()}else{const u=ue().carry,d=x.createBufferSource();d.buffer=u,d.playbackRate.value=1.05,d.connect(this.#t),d.start()}if(c!==null&&c!==l)if(c==="in"){const u=ue().teleportIn,d=x.createBufferSource();d.buffer=u,d.connect(this.output),d.start()}else{const u=ue().teleportOut,d=x.createBufferSource();d.buffer=u,d.connect(this.output),d.start()}this.#o={action:o,carrying:i,teleportingPhase:c}}destroy(){}}class yc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=tt(e);!o&&r&&ee({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class xc{constructor(e){this.renderContext=e}output=x.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=tt(e);n&&!o&&ee({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class wc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?gn(y.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&(console.log("playing",r,o),ee({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e})),this.#n={setting:o}}destroy(){}}class Cc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=x.createGain();#e=x.createGain();#n=null;#t=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}},room:n}}=this,o=this.#t?.stoodOnByPlayer??!1,r=rt(e,n).some(L);r&&!o&&(this.#n=ee({soundId:"teleportWarningSiren",loop:!0,connectTo:this.#e})),!r&&o&&(this.#n?.stop(),this.#n=null),this.#t={stoodOnByPlayer:r}}destroy(){}}const Sc={lift:bc,switch:wc,bubbles:hc,head:Kt,heels:Kt,headOverHeels:Kt,teleporter:Cc,monster:vc,conveyor:mc,spring:xc,portableBlock:yc,charles:pc},Tc=t=>{const e=Sc[t.item.type];if(e)return new e(t)};class kc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output);const{room:{size:{y:o,x:r}}}=e;this.roomMaxProjectedX=Nt(Un({x:0,y:o})),this.roomMinProjectedX=Nt(Un({x:r,y:0}))}output=x.createStereoPanner();roomMaxProjectedX;roomMinProjectedX;tick(e){this.childRenderer.tick(e);const n=this.renderContext.item.state.position,o=Math.min(1,Math.max(-1,(Nt(n)-this.roomMinProjectedX)/(this.roomMaxProjectedX-this.roomMinProjectedX)*2-1));this.output.pan.value=o}destroy(){this.childRenderer.destroy()}}const Ic=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Oc=t=>t.item.shadowMask!==void 0,Pc=t=>{const e=y.getState(),n=Zi(e),o=Qi(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const d=dc[r.type],f=new Rl(t,d);a.push(f),s&&(f.output.alpha=.66),o&&Oc(t)&&a.push(new Vl(t))}s&&a.push(new El(t));let l;if(a.length===0)l=void 0;else{const d=a.length===1?a[0]:new _c(a,t);Ic(r,d.output,i),l=new $l(t,d)}const c=Tc(t),u=c===void 0?void 0:new kc(t,c);return new fc(t,{graphics:l,sound:u})};class _c{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Te=.33,Bc=Ki()==="mobile"?-4:16,mn=je.h-je.w/2,Fc=he.heels,Ac=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Dt(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-Bc-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-mn<0;return(m,v,P)=>{if(m===void 0)return;const D=S(m.state.position),z=U(D,u),_={x:d&&z.x<n.x*Te?Math.min(-a,n.x*Te-D.x):f&&z.x>n.x*(1-Te)?Math.max(n.x-l,n.x*(1-Te)-D.x):u.x,y:h&&z.y<n.y*Te?n.y*Te-D.y:u.y};if(P)e.x=_.x,e.y=_.y;else{const $=Fc*v,B=nt(e,_),N=zo(B);if(N>$){const Ut={x:B.x/N,y:B.y/N};e.x-=Ut.x*$,e.y-=Ut.y*$}else e.x=_.x,e.y=_.y}}},Mc=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Dt(t);return new j().rect(e+o.x,r-mn,n-e,o.y-r+mn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class Dc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=y.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??Uo.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(Mc(e.room.roomJson)),this.#s=Ac(e.room,this.#t,o.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=x.createGain();output={sound:this.#o,graphics:this.#t};#i=!1;#l=new Map;#r=new Map;#s;initFilters(e,n){this.#e.filters=e?ge:new R(kn(n).main.original)}#a(e){const{room:n}=this.renderContext;for(const o of pe(n.items)){let r=this.#r.get(o.id);if(r===void 0){r=Pc({...this.renderContext,item:o}),this.#r.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:a}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),a&&a.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#r.entries())n.items[o]===void 0&&(r.destroy(),this.#r.delete(o))}#c(e){const{order:n}=Kr(Ll(this.renderContext.room.items,e.movedItems,this.#l),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#i?e:{...e,movedItems:new Set(pe(this.renderContext.room.items))};this.#s(ze(this.renderContext.gameState),n.deltaMS,!this.#i),this.#a(n),(!this.#i||n.movedItems.size>0)&&this.#c(n),this.#i=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Lt=`in vec2 aPosition;
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
`,Rt=`struct GlobalFilterUniforms {
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
}`,zc=`precision highp float;
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
`,Lc=`struct CRTUniforms {
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
}`,Rc=Object.defineProperty,Uc=(t,e,n)=>e in t?Rc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,kt=(t,e,n)=>(Uc(t,typeof e!="symbol"?e+"":e,n),n);const ri=class ii extends q{constructor(e){e={...ii.DEFAULT_OPTIONS,...e};const n=be.from({vertex:{source:Rt,entryPoint:"mainVertex"},fragment:{source:Lc,entryPoint:"mainFragment"}}),o=E.from({vertex:Lt,fragment:zc,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),kt(this,"uniforms"),kt(this,"seed"),kt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};kt(ri,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Ec=ri;var $c=`
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
}`,Nc=`struct KawaseBlurUniforms {
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
}`,Vc=`
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
`,Xc=`struct KawaseBlurUniforms {
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
}`,jc=Object.defineProperty,Hc=(t,e,n)=>e in t?jc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ce=(t,e,n)=>(Hc(t,typeof e!="symbol"?e+"":e,n),n);const si=class ai extends q{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(We("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...ai.DEFAULT_OPTIONS,...n};const o=be.from({vertex:{source:Rt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Xc:Nc,entryPoint:"mainFragment"}}),r=E.from({vertex:Lt,fragment:n?.clamp?Vc:$c,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ce(this,"uniforms"),ce(this,"_pixelSize",{x:0,y:0}),ce(this,"_clamp"),ce(this,"_kernels",[]),ce(this,"_blur"),ce(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=Oe.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),Oe.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};ce(si,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Gc=si;var qc=`in vec2 vTextureCoord;
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
`,Wc=`struct AdvancedBloomUniforms {
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
`,Jc=`
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
`,Yc=`struct ExtractBrightnessUniforms {
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
`,Zc=Object.defineProperty,Qc=(t,e,n)=>e in t?Zc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,li=(t,e,n)=>(Qc(t,typeof e!="symbol"?e+"":e,n),n);const ci=class ui extends q{constructor(e){e={...ui.DEFAULT_OPTIONS,...e};const n=be.from({vertex:{source:Rt,entryPoint:"mainVertex"},fragment:{source:Yc,entryPoint:"mainFragment"}}),o=E.from({vertex:Lt,fragment:Jc,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),li(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};li(ci,"DEFAULT_OPTIONS",{threshold:.5});let Kc=ci;var eu=Object.defineProperty,tu=(t,e,n)=>e in t?eu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ie=(t,e,n)=>(tu(t,typeof e!="symbol"?e+"":e,n),n);const di=class fi extends q{constructor(e){e={...fi.DEFAULT_OPTIONS,...e};const n=be.from({vertex:{source:Rt,entryPoint:"mainVertex"},fragment:{source:Wc,entryPoint:"mainFragment"}}),o=E.from({vertex:Lt,fragment:qc,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:fe.WHITE}}),Ie(this,"uniforms"),Ie(this,"bloomScale",1),Ie(this,"brightness",1),Ie(this,"_extractFilter"),Ie(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Kc({threshold:e.threshold}),this._blurFilter=new Gc({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Oe.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Oe.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Oe.returnTexture(s),Oe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Ie(di,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let nu=di;const Oo=({crtFilter:t},e)=>[t?new Ec({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new nu({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class ou{constructor(e,n){this.app=e,this.#r=e,this.#s=n;try{const o=y.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#l.connect(x.destination),e.stage.addChild(this.#i),e.stage.scale=r,Ze(n)===void 0)throw new Error("main loop with no starting room");this.#c()}catch(o){this.#a(o);return}}#e;#n;#t;#o;#i=new b({label:"MainLoop/world"});#l=x.createGain();#r;#s;#a(e){console.error(e),y.dispatch(es(ts(e,"message","stack")))}#c(){const{gameMenus:{userSettings:{displaySettings:e}}}=y.getState();this.#e=Oo(e,!0),this.#n=Oo(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#a(n)}};tick=({deltaMS:e})=>{const n=y.getState(),o=ns(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=y.getState(),s=Ze(this.#s),a=!o&&!(r?.uncolourised??Uo.displaySettings.uncolourised),l=os(n),c=rs(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new il({colourise:a,gameState:this.#s,inputDirectionMode:c,onScreenControls:l}),this.#r.stage.addChild(this.#t.output)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const u=o?Ro:_l(this.#s,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),s?(this.#o=new Dc({gameState:this.#s,room:s,paused:o,pixiRenderer:this.#r.renderer,displaySettings:r,colourised:a,upscale:i}),this.#i.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#l),this.#s.events.emit("roomChange",s.id)):this.#o=void 0,this.#r.stage.scale=i.gameEngineUpscale,this.#c()),this.#o?.tick({progression:this.#s.progression,movedItems:u,deltaMS:e}),o?this.#r.stage.filters=this.#e:this.#r.stage.filters=this.#n};start(){return this.#r.ticker.add(this.tickAndCatch),this}stop(){this.#r.stage.removeChild(this.#i),this.#l.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#r.ticker.remove(this.tickAndCatch)}}Bt.add(Qo,Ko,er,tr,nr,or,rr,ir,sr,ar,lr,ur,cr,dr,fr,hr,pr,mr,gr,br,vr);ss.defaultOptions.scaleMode="nearest";const Po=async(t,e)=>{const n=new Ir;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const o=y.getState().gameMenus.currentGame,r=Hn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?y.dispatch(is(o.store.gameMenus)):(y.dispatch(Bn(r.characterRooms.head.id)),y.dispatch(Bn(r.characterRooms.heels.id)));const i=new ou(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=ze(r);a!==void 0&&yn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return Ze(r)},get gameState(){return r},reincarnateFrom(s){Hn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},cu=Object.freeze(Object.defineProperty({__proto__:null,default:Po,gameMain:Po},Symbol.toStringTag,{value:"Module"}));export{Cr as A,yr as C,q as F,Sn as R,Vs as S,Sr as V,qs as a,cu as g,Ns as u};
