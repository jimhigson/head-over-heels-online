const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-O1xOe8r7.js","assets/App-CXnqZkXc.js","assets/index-CdtY4W7t.js","assets/index-CO-lN70x.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-CphFZemo.js","assets/Graphics-hJFXYOGB.js","assets/swopCharacters-BQxv3Fqn.js","assets/WebGLRenderer-BL15eXsl.js"])))=>i.map(i=>d[i]);
import{aM as ti,a7 as ni,H as ri,K as he,L as R,q as br,I as le,E as w,f as St,e as oi,C as b,d as je,v as xt,a5 as y,D as jt,Z as Oe,T as Ee,U as ii,V as si,aN as ai,aO as li,aP as ci,n as ui,aQ as tt,ad as re,aR as di,aS as J,aT as fi,aU as oe,aV as vr,ap as xr,aj as x,o as Z,ab as O,aW as hi,aX as pi,aY as mi,af as B,aZ as Pe,a_ as gi,a$ as yr,b0 as an,b1 as bi,b2 as ht,ac as L,b3 as vi,i as ie,b4 as xi,b5 as yi,b6 as wi,b7 as Ci,aq as wr,ag as It,b8 as Ti,b9 as Ze,ba as Cr,bb as pe,bc as kt,p as Ke,ar as Be,ae as qt,bd as xn,al as te,be as Si,bf as Ii,bg as ki,bh as Oi,a8 as Tr,bi as $e,ah as _i,bj as Pi,bk as ln,bl as Bi,bm as Ai,bn as Sr,bo as Fi,bp as Di,bq as Mi,am as yt,br as pt,bs as zi,bt as Li,bu as Ri,a as qe,bv as Ui,bw as Ei,bx as $i,by as Ne,bz as Ni,bA as Vi,bB as Hi,bC as Ir,X as Ce,bD as Xi,at as ji,bE as qi,bF as yn,bG as wn,bH as Gi,as as Cn,bI as Wi}from"./App-CXnqZkXc.js";import{l as Gt,j as wt,g as Tn,k as Sn,h as M,p as T,m as me,n as cn,q as Ji,r as Yi,t as Wt,u as Ct,v as mt,c as un,w as H,i as X,x as kr,y as Or,z as _r,A as ce,B as Ot,C as dn,D as Zi,E as Ae,F as Ki,G as Qi,H as es,I as Jt,J as ts,K as nt,L as ns,M as rs,N as os,a as ge,O as Pr,P as Br,Q as In,R as ue,S as Ar,T as Fr,f as is,U as Dr,V as Mr,W as ss,b as Fe,X as Dt,Y as rt,Z as as,_ as De,$ as kn,a0 as ls,a1 as fn,a2 as cs,a3 as us,a4 as ds,a5 as fs,a6 as hs,a7 as On,a8 as zr,e as Lr,o as Rr,a9 as ps,aa as _n,s as Ge,ab as ms,ac as Mt,ad as C,ae as gs,af as bs,ag as vs,ah as Pn,ai as _t,aj as xs}from"./swopCharacters-BQxv3Fqn.js";import{S as ys,G as V}from"./Graphics-hJFXYOGB.js";import{g as ws,_ as Bn}from"./index-CdtY4W7t.js";var ot={},An;function Cs(){if(An)return ot;An=1;var t=ti(),e=t.mark(i),n=ni(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return f=d[u],v.delegateYield(o(f),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}ot.__concat=i;var s=r(i);return ot.concat=s,ot}var zt,Fn;function Ts(){return Fn||(Fn=1,zt=Cs().concat),zt}var Ss=Ts();const Yt=ws(Ss),Ur=class Zt extends ri{constructor(e){e={...Zt.defaultOptions,...e},super(e),this.enabled=!0,this._state=ys.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=he.from(n)),r&&(s=R.from(r)),new Zt({gpuProgram:i,glProgram:s,...o})}};Ur.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let j=Ur;var Is=`
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
`,ks=`in vec2 aPosition;
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
`,Os=`
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
}`;class S extends j{constructor(e){const n=e.gpu,r=Dn({source:Os,...n}),o=he.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Dn({source:Is,...i}),a=R.from({vertex:ks,fragment:s}),l=new br({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:le.EMPTY}})}}function Dn(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const hn=`
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
    `,pn=`
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
	`;class Er extends S{constructor(){super({gl:{functions:`
                ${hn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${pn}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}Er.extension={name:"color",type:w.BlendMode};class $r extends S{constructor(){super({gl:{functions:`
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
            `}})}}$r.extension={name:"color-burn",type:w.BlendMode};class Nr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Nr.extension={name:"color-dodge",type:w.BlendMode};class Vr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Vr.extension={name:"darken",type:w.BlendMode};class Hr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Hr.extension={name:"difference",type:w.BlendMode};class Xr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Xr.extension={name:"divide",type:w.BlendMode};class jr extends S{constructor(){super({gl:{functions:`
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
            `}})}}jr.extension={name:"exclusion",type:w.BlendMode};class qr extends S{constructor(){super({gl:{functions:`
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
                `}})}}qr.extension={name:"hard-light",type:w.BlendMode};class Gr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Gr.extension={name:"hard-mix",type:w.BlendMode};class Wr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Wr.extension={name:"lighten",type:w.BlendMode};class Jr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Jr.extension={name:"linear-burn",type:w.BlendMode};class Yr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Yr.extension={name:"linear-dodge",type:w.BlendMode};class Zr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Zr.extension={name:"linear-light",type:w.BlendMode};class Kr extends S{constructor(){super({gl:{functions:`
                ${hn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${pn}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Kr.extension={name:"luminosity",type:w.BlendMode};class Qr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Qr.extension={name:"negation",type:w.BlendMode};class eo extends S{constructor(){super({gl:{functions:`
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
                `}})}}eo.extension={name:"overlay",type:w.BlendMode};class to extends S{constructor(){super({gl:{functions:`
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
                `}})}}to.extension={name:"pin-light",type:w.BlendMode};class no extends S{constructor(){super({gl:{functions:`
                ${hn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${pn}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}no.extension={name:"saturation",type:w.BlendMode};class ro extends S{constructor(){super({gl:{functions:`
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
                `}})}}ro.extension={name:"soft-light",type:w.BlendMode};class oo extends S{constructor(){super({gl:{functions:`
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
                `}})}}oo.extension={name:"subtract",type:w.BlendMode};class io extends S{constructor(){super({gl:{functions:`
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
                `}})}}io.extension={name:"vivid-light",type:w.BlendMode};const Kt=[];St.handleByNamedList(w.Environment,Kt);async function _s(t){if(!t)for(let e=0;e<Kt.length;e++){const n=Kt[e];if(n.value.test()){await n.value.load();return}}}let Me;function Ps(){if(typeof Me=="boolean")return Me;try{Me=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Me=!1}return Me}var so=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(so||{});class Bs{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const As=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],ao=class lo extends oi{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...As,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await _s(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...lo.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(je(xt,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:y.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=so.ALL);const{clear:r,clearColor:o,target:i}=e;y.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Bs(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Ps())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};ao.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let co=ao,it;function Fs(t){return it!==void 0||(it=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??co.defaultOptions.failIfMajorPerformanceCaveat};try{if(!jt.get().getWebGLRenderingContext())return!1;let r=jt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),it}let st;async function Ds(t={}){return st!==void 0||(st=await(async()=>{const e=jt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),st}const Mn=["webgl","webgpu","canvas"];async function Ms(t){let e=[];t.preference?(e.push(t.preference),Mn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Mn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Ds()){const{WebGPURenderer:a}=await Bn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-O1xOe8r7.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&Fs(t.failIfMajorPerformanceCaveat??co.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Bn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-BL15eXsl.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const uo="8.8.1";class fo{static init(){globalThis.__PIXI_APP_INIT__?.(this,uo)}static destroy(){}}fo.extension=w.Application;class zs{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,uo)}destroy(){this._renderer=null}}zs.extension={type:[w.WebGLSystem,w.WebGPUSystem],name:"initHook",priority:-10};const ho=class Qt{constructor(...e){this.stage=new b,e[0]!==void 0&&je(xt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Ms(e),Qt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return je(xt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Qt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};ho._plugins=[];let po=ho;St.handleByList(w.Application,po._plugins);St.add(fo);var Ls=`in vec2 aPosition;
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
`,Rs=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,zn=`struct GlobalFilterUniforms {
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
}`;const mo=class go extends j{constructor(e){e={...go.defaultOptions,...e};const n=he.from({vertex:{source:zn,entryPoint:"mainVertex"},fragment:{source:zn,entryPoint:"mainFragment"}}),r=R.from({vertex:Ls,fragment:Rs,name:"alpha-filter"}),{alpha:o,...i}=e,s=new br({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};mo.defaultOptions={alpha:1};let Us=mo;class We extends Oe{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof le?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ee.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ee.shared.add(this.update,this,ii.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(le.from(e[r]));return new We(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(le.from(e[r]));return new We(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof le)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ee.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ee.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Es extends si{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new ai({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function $s(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(je(xt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class Ns extends Es{constructor(...e){const n=$s(e,"Text");super(n,li),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=ci.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class mn extends le{static create(e){return new mn({source:new ui(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}function Vs(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const Hs=(t,e)=>{if(e)return di(e.gameState.characterRooms,([r,o])=>[r,o.id]);const n={};for(const r of Object.values(t.rooms))for(const o of Object.values(r.items))if(o.type==="player"){const{which:i}=o.config;n[i]=r.id}if(n.head===void 0&&n.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return n},Ln=({campaign:t,inputStateTracker:e,savedGame:n,writeInto:r={}})=>{const o=Hs(t,n),i={},s=n?n.gameState.characterRooms.head&&tt(n.gameState.characterRooms.head):o.head&&Gt({roomJson:t.rooms[o.head],roomPickupsCollected:i[o.head]??re,isNewGame:n===void 0}),a=o.heels===o.head?s:n?n.gameState.characterRooms.heels&&tt(n.gameState.characterRooms.heels):o.heels&&Gt({roomJson:t.rooms[o.heels],roomPickupsCollected:i[o.heels]??re,isNewGame:n===void 0}),l=n?.gameState.characterRooms.headOverHeels&&tt(n.gameState.characterRooms.headOverHeels),c={head:s,heels:a,headOverHeels:l};return Object.assign(r,{events:Vs(),inputStateTracker:e,campaign:t,gameSpeed:1,...n?tt(n?.gameState):{currentCharacterName:o.head===void 0?"heels":"head",entryState:{head:s===void 0?void 0:wt(Tn("head",s?.items)),heels:a===void 0?void 0:wt(Tn("heels",a?.items))},pickupsCollected:i,gameTime:0,progression:0},characterRooms:c})},g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},de=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:r/2})},$={original:new y(J.zxWhite),basic:g.white,dimmed:g.lightGrey},N={original:new y(J.zxYellow),basic:g.midRed,dimmed:g.redShadow},q={original:new y(J.zxMagenta),basic:g.pink,dimmed:de(g.pink)},I={original:new y(J.zxCyan),basic:g.pastelBlue,dimmed:de(g.pastelBlue)},G={original:new y(J.zxGreen),basic:g.moss,dimmed:de(g.moss)},gn={white:{basic:{main:$,edges:{towards:I,right:N},hud:{lives:N,dimmed:q,icons:I}},dimmed:{main:$,edges:{towards:G,right:I},hud:{lives:N,dimmed:q,icons:I}}},yellow:{basic:{main:N,edges:{towards:G,right:$},hud:{lives:I,dimmed:q,icons:G}},dimmed:{main:N,edges:{towards:I,right:I},hud:{lives:I,dimmed:q,icons:G}}},magenta:{basic:{main:q,edges:{towards:G,right:I},hud:{lives:$,dimmed:I,icons:N}},dimmed:{main:q,edges:{towards:G,right:I},hud:{lives:$,dimmed:I,icons:N}}},cyan:{basic:{main:I,edges:{towards:q,right:$},hud:{lives:$,dimmed:G,icons:N}},dimmed:{main:I,edges:{towards:q,right:$},hud:{lives:$,dimmed:G,icons:N}}},green:{basic:{main:G,edges:{towards:I,right:N},hud:{lives:$,dimmed:q,icons:I}},dimmed:{main:G,edges:{towards:I,right:N},hud:{lives:$,dimmed:q,icons:I}}}},bn=t=>gn[t.hue][t.shade],Te={head:g.pastelBlue,heels:g.pink},gt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Sn>n?100-Math.ceil((n-e)/(Sn/100)):0},bo=t=>t.type==="headOverHeels"?gt(t.state.head)>0||gt(t.state.heels)>0:gt(t.state)>0,vo=t=>{const e=100*M.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/M.w):0},Qe=`in vec2 aPosition;
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
`,Xs=`in vec2 vTextureCoord;
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
`;class be extends j{constructor(e){const n=Object.keys(e).length,r=R.from({vertex:Qe,fragment:Xs.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const js=`precision mediump float;
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
`;class z extends j{uniforms;constructor(e="white"){const n=R.from({vertex:Qe,fragment:js,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const qs=`precision mediump float;
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
`;class Gs extends j{constructor(){const e=R.from({vertex:Qe,fragment:qs,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const xo=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),yo=t=>xo(gn[t.color.hue][t.color.shade].main),wo=t=>new be({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&yo(t)}),Ws=new be({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Js=t=>new be({replaceLight:t,replaceDark:de(t)}),en=(t,e,n)=>n?new be(xo(gn[t.color.hue][t.color.shade].edges[e])):new z(bn(t.color).edges[e].original),Q=t=>new be(yo(t)),Rn=new Gs,fe=fi,Un={x:.5,y:1},En=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(En(t)?c=Ys(t):c=new Oe(oe().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const v=p({...t,times:void 0,label:`(${f},${h},${m})`}),k=T({x:f-1,y:h-1,z:m-1});v.x+=k.x,v.y+=+k.y,d.addChild(v)}return d}if(e===void 0&&r===void 0)if(En(t))c.anchor=Un;else{const u=oe().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=Un}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Ys({animationId:t,reverse:e,playOnce:n}){const o=oe().animations[t].map(s=>({texture:s,time:vr}));e&&o.reverse();const i=new We(o);return i.animationSpeed=xr.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const Zs=`#version 300 es

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
`;class ke extends j{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=R.from({vertex:Qe,fragment:Zs,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const Y=new ke({outlineColor:g.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),Ve=new z,$n=new z,tn=new z,Nn=new z(g.moss),He=new z,W=[Ve,Y],Ks=[He,Y],Qs=[Y,tn],at={original:[Y,He],colourised:{head:{active:[Y,new z(Te.head)],inactive:[Y,new z(de(Te.head))]},heels:{active:[Y,new z(Te.heels)],inactive:[Y,new z(de(Te.heels))]}}},ve=13,ea=2,ta=Math.cos(30*(Math.PI/180));class na{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:ve,y:-13,filter:W}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:ve,y:ve,filter:W}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-13,y:ve,filter:W}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-13,y:-13,filter:W}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:ve*Math.SQRT2,filter:W}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:ve*Math.SQRT2,filter:W}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-13*Math.SQRT2,filter:W}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-13*Math.SQRT2,filter:W})}:{}},this.container.addChild(this.#e),this.container.addChild(new V().circle(0,0,32).fill("#00000000"));for(const r of Z(this.arrowSprites))this.container.addChild(r);this.container.on("pointerenter",this.handlePointerEnter),this.container.on("globalpointermove",this.usePointerLocation),this.container.on("pointerup",this.stopCurrentPointer),this.container.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?fe:Ve}container=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=O};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=hi(x.getState()),{x:r,y:o}=this.container,{x:i,y:s}=e,{width:a,height:l}=this.container.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=pi({x:-c,y:-u}),f=mi(d,ta),h=B(f,ea);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(x.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const r=Pe(e)>gi?yr(e):void 0;for(const[o,i]of an(this.arrowSprites))i.filters=o===r?Ks:W}destroy(){this.stopCurrentPointer(),this.container.off("pointerenter",this.handlePointerEnter),this.container.off("globalpointermove",this.usePointerLocation),this.container.off("pointerup",this.stopCurrentPointer),this.container.off("pointerupoutside",this.stopCurrentPointer),this.container.destroy()}}const nn={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey},zx:{jump:J.zxBlue,fire:J.zxYellow,carry:J.zxGreen,carryAndJump:J.zxRed,menu:J.zxWhite}};function Je(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}function*Co(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;bi(o),yield p({textureId:o,x:(r+.5-n/2)*ht.w})}}function ye(t,e){return t.removeChildren(),Je(Co(e),t),t}function ra(t,e){return t.removeChildren(),Je(Co(e),t),t}const Tt=Symbol(),To=Symbol(),So=Symbol(),lt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),r=new b({label:"arcadeButton"});r.addChild(n);const o=p("button");t?o.filters=Js(nn.colourised[e]):r.filters=new z(nn.zx[e]),n.addChild(o);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),r[To]=o,r[Tt]=i,r[So]=n,r},ze=(t,...e)=>{t[Tt].removeChildren();for(const n of e)n!==void 0&&t[Tt].addChild(n)},ct=(t,e)=>{t[To].texture=oe().textures[e?"button.pressed":"button"],t[So].y=e?1:0},Vn=(t,e,n)=>{n&&(t[Tt].filters=e?wo():fe)},Hn=({which:t},e,n)=>{const r=ra(new b,n);return r.filters=new be({white:e?de(nn.colourised[t]):g.pureBlack}),r};class Io{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.container&&(this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container)))}get container(){return this.#n}}const ko=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),oa=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},Xn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>oa(t,e,n,r),vn=(t,e,n=.001)=>{if(!me(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:cn({state:{position:L(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+vi},id:t.id},{state:{position:L(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Oo=(t,e)=>{const r=[...ie(e).filter(i=>vn(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Ji(s,i);return a<0||a===0&&Xn(t,s)>Xn(t,i)?s:i})},Xe=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Yi};function _o({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(bo(e)||Xe(e)||(e.state.action="death",e.state.expires=t+Wt))}const ee=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,Ye=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Po=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t,{pickupsCollected:i}=e;if(i[o]?.[r.id]!==!0)switch(i[o]===void 0&&(i[o]={}),i[o][r.id]=!0,r.config.gives){case"hooter":{const s=mt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=mt(n);s!==void 0&&(s.doughnuts=ee(s.doughnuts,6));break}case"bag":{const s=Ct(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=mt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=Ct(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=ee(n.state.head.lives,2),n.state.heels.lives=ee(n.state.heels.lives,2)):n.state.lives=ee(n.state.lives,2);break;case"scroll":x.dispatch(Ci(r.config.page));break;case"reincarnation":{x.dispatch(yi(wi(e,x.getState())));break}case"crown":{x.dispatch(xi(r.config.planet));break}default:r.config}},ia=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;wr(i,r)<=0||e.state.action!=="death"&&un({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},sa=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=It(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=L(t.state.position,s)};function aa({movingItem:t}){t.state.autoWalk=!1}const K=(t,...e)=>X(...e)(t.touchedItem),Le=(t,...e)=>X(...e)(t.movingItem),Bo=t=>H(t.movingItem),la=t=>H(t.touchedItem),ca=t=>kr(t.touchedItem),jn=t=>{switch(!0){case K(t,"stopAutowalk"):aa(t);break;case ca(t):_o(t);break;case K(t,"portal"):ia(t);break;case K(t,"pickup"):Po(t);break;case K(t,"doorFrame"):sa(t);break}},_e={movementType:"steady"},Ao=150,Fo=t=>t[Math.floor(Math.random()*t.length)],ne=Object.freeze({movementType:"vel",vels:{walking:O}}),Pt=t=>Or(t)?ce[t.config.which]:ce[t.type],qn=M.w/2,ua=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ce.homingBot;if(!kt(e,te))return{movementType:"steady"};const{head:s,heels:a}=_r(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=Ze(l.state.position,t);if(Math.abs(c.y)<qn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<qn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Do=(t,e)=>{const{head:n,heels:r,headOverHeels:o}=_r(e.items);if(o!==void 0)return Xe(o)?void 0:o;const i=n===void 0||Xe(n)||n.state.action==="death"?void 0:xn(n.state.position,t),s=r===void 0||Xe(r)||r.state.action==="death"?void 0:xn(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},da=(t,e,n,r)=>{const{state:{position:o,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return ne;const l=Do(o,e);if(l===void 0||s+Ao>e.roomTime)return _e;const c=Ze(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>M.w/4?u:Ke(u),f=Pt(t),h={...O,[d]:c[d]>0?f:-f},m=pe(h),v=!kt(m,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:re}}},Gn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return ne;const a=Do(i,e);if(a===void 0)return ne;const l=a.state.position,c=M.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return ne;const d=Ze(a?.state.position,i),f=Pt(t),h=(1+Math.sqrt(2))/2,m=f*h,v=B({...d,z:0},m/Cr(d)*(o?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:pe(v)}}},Lt=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return ne;if(!(Be(i,O)||Math.random()<r/1e3))return _e;const l=Fo(o);return{movementType:"vel",vels:{walking:B(qt[l],Pt(t))},stateDelta:{facing:qt[l]}}},fa=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOnItemId:s}}=t;return s===null?ne:kt(i,te)?{movementType:"vel",vels:{walking:B(o,Pt(t))}}:_e},ha=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=Fo([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},Rt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Ao))return;const c=Ot(i,l,e,n);if(c.x===0&&c.y===0)return;const u=ha(s,c,o);t.state.vels.walking=u,t.state.facing=pe(u),t.state.durationOfTouch=0},pa=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},ma=(t,e,n,r)=>{if(!t.state.activated||Or(t)&&t.state.busyLickingDoughnutsOffFace)return ne;switch(t.config.movement){case"patrol-randomly-diagonal":return Lt(t,e,n,r,ki);case"patrol-randomly-xy8":return Lt(t,e,n,r,Ii);case"patrol-randomly-xy4":return Lt(t,e,n,r,Si);case"towards-tripped-on-axis-xy4":return ua(t,e);case"towards-on-shortest-axis-xy4":return da(t,e);case"back-forth":case"clockwise":return fa(t);case"unmoving":case"free":return ne;case"towards-when-in-square-xy8":return Gn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return Gn(t,e,n,r,Ti(x.getState()));default:throw t.config,new Error("this should be unreachable")}},ga=t=>{const{movingItem:e,touchedItem:n}=t;if(me(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Rt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Rt(t,"opposite");break;case"clockwise":Rt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":pa(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},ba=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of an(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&x.dispatch(Oi(o.path))}},va=({movingItem:t,touchedItem:e})=>{if(!me(t))return;const{state:{position:n},aabb:r}=e,o=Ot(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=pe(o),s=B(i,-.05);return e.state.vels.sliding=s,!1},xa=({movingItem:t,touchedItem:e})=>{if(!me(e))return;const n=t.state.vels.sliding;if(Be(n,O))return;const{state:{position:r},aabb:o}=t,i=Ot(e.state.position,e.aabb,r,o);return wr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},ya=2*Zi,Mo=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+ya,positionDelta:n})},wa=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Tr(r.state.position,o),z:0};if(!Be(s,O))for(const a of dn(r.state.stoodOnBy,e))Mo(a,e,s)}},Ca=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=Ot(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=pe(a);for(const c of o){const u=e.items[c],d=B(l,-.025*r);u.state.facing=d,Mo(u,e,d)}},ut=t=>{const n=t/ts*vr;return(t+.5*Jt*n**2)/n},Ta={head:ut(nt.head),headOnSpring:ut(nt.head+M.h),heels:ut(nt.heels),heelsOnSpring:ut(nt.heels+M.h)},Sa=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ta[`${n}${e?"OnSpring":""}`]},Ia=t=>!(t===null||Qi(t)||es(t)&&t.config.gives==="scroll"||H(t)&&t.state.standingOnItemId===null),zo=(t,e,n)=>{const{state:{standingOnItemId:r}}=t,{inputStateTracker:o}=n,i=Ae(r,e);if(!(o.currentActionPress("jump")!=="released"&&Ia(i)))return r!==null?{movementType:"steady",stateDelta:{jumped:!1}}:_e;const a=Ki(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Sa(t,a)}},stateDelta:{action:"moving",jumped:!0}}},ka=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Pe(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return B(n,l)},Wn={movementType:"vel",vels:{walking:O}},Lo=(t,e,n,r)=>{const o=Oa(t,e,n,r);if(o.movementType==="vel"&&o.vels.walking!==void 0){const i=Pe(o.vels.walking);o.stateDelta={...o.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*r},t.type==="head"&&t.state.standingOnItemId!==null&&(o.stateDelta={...o.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*r})}return t.state.action==="idle"&&o.movementType==="vel"&&o.vels.walking!==void 0&&!Be(o.vels.walking,O)&&(o.stateDelta={...o.stateDelta,walkStartFacing:t.state.facing}),o},Oa=(t,e,{inputStateTracker:n,currentCharacterName:r},o)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,v=r===t.id,k=v?n.currentActionPress("jump"):"released",A=v?n.directionVector:O,F=l===null&&m.z<0,_=i==="head"&&vo(t.state)>0&&l!==null,U=i==="headOverHeels"?F?"head":"heels":_?"heels":i,P=a?c:A,E=ce[U];if(u!==null||s==="death")return Wn;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Tr(h,B(h,ns*o))}}:Wn;if(k!=="released"){const et=pe(kt(P,te)?c:P),ei=X("spring")(Ae(l,e))?1:rs;return{movementType:"vel",vels:{walking:B({...et,z:0},E*ei)},stateDelta:{facing:et}}}}if(Pe(P)!==0)return F?{movementType:"vel",vels:{walking:B({...P,z:0},E)},stateDelta:{facing:P,action:"falling"}}:{movementType:"vel",vels:{walking:ka({vel:h,acc:os[U],deltaMS:o,maxSpeed:E,unitD:P,minSpeed:0})},stateDelta:{facing:P,action:"moving"}};if(d>0&&d<1){const et=Be(f,c)?1:0;return{movementType:"position",posDelta:B(c,et-d),stateDelta:{action:F?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:F?"falling":"idle"}}},Jn=t=>ge(t.movingItem)&&vn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Ro=(t,e)=>{let n=O;for(const r of e){if(r.movementType==="position"&&(n=L(n,r.posDelta)),r.movementType==="vel"&&(ge(t)||X("lift")(t)))for(const[i,s]of an(r.vels)){const a={...O,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},Yn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&H(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Jn(t)){if(Jn(t)&&Bo(t)){Pr({above:t.movingItem,below:t.touchedItem});const n=[zo(t.movingItem,t.room,t.gameState),Lo(t.movingItem,t.room,t.gameState,t.deltaMS)];Ro(t.movingItem,n)}Br(t)}};function _a(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Uo=t=>{Bo(t)&&jn(t),la(t)&&jn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),K(t,...In)&&va(t),Le(t,...In)&&xa(t),(Le(t,"monster")&&K(t,"firedDoughnut")||Le(t,"firedDoughnut")&&K(t,"monster"))&&_a(t),(Le(t,"monster")||Le(t,"movableBlock"))&&ga(t),K(t,"switch")&&ba(t),K(t,"joystick")&&Ca(t),t.touchedItem.state.disappear&&Yn(t),t.movingItem.state.disappear&&me(t.touchedItem,t.movingItem)&&Yn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},Pa=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ue(e.items).filter(Ar),u=s===null?Eo(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}Ba(e,i,u)}else{if(t.state.standingOnItemId===null||!$o(t,Fr(e.items)))return;const d=is({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Dr({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:Uo}),i.carrying=null}},Ba=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Mr({room:t,item:n})},Eo=(t,e)=>Oo(t,ue(e.items).filter(Ar)),$o=(t,e)=>{const n={position:L(t.state.position,{z:M.h})},r=ss({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(me(o,t)){if(!ge(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!$o(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0},Ut=-11,Aa={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter",u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=o===null?lt({colourise:n,button:t}):o;if(r?.pressed!==u&&ct(d,u),c!==r?.standingOnTeleporter)if(c)ze(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Hn(t,n,"JUMP");f.y=Ut,ze(d,f)}return{container:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{currentPlayable:i,room:s}}){const a=i&&Ct(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&Eo(i,s)!==void 0,d=t.actions.every(v=>e.currentActionPress(v)!=="released"),f=l&&!u&&c===null,h=o===null?lt({colourise:n,button:t}):o;if(h.visible=l,l&&(f!==r?.disabled&&Vn(h,f,n),h.visible=!0,r?.pressed!==d&&ct(h,d),l!==r?.hasBag||c!==r?.carrying)){let v;c!==null?v=ko(c):l&&(v=p({textureId:"bag",y:-2})),ze(h,v)}return{container:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{currentPlayable:i}}){const s=i&&mt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=o===null?lt({colourise:n,button:t}):o,d=a||Ye(l)>0;if(u.visible=d,d&&(r?.pressed!==c&&ct(u,c),a!==r?.hasHooter||l!==r?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):Ye(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=ye(new b,l);h.y=Ut,h.filters=Y,ze(u,f,h),Vn(u,l===0,n)}return{container:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{currentPlayable:i}}){const a=(i&&Ct(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(r===void 0||l!==r.pressed||n!==r.colourise||a!==r.hasBag))return"no-update";let u;if(o===null){u=lt({colourise:n,button:t});const d=Hn(t,n,"C+J");d.y=Ut,ze(u,d)}else u=o;return a?(u.visible=!0,r?.pressed!==l&&ct(u,l)):u.visible=!1,{container:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=W,{container:e,renderProps:re}}};class Re extends Io{constructor(e){const n=Aa[e.button.which];super(e,n)}}const Fa=30,Da=15;class Ma{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:r,colourise:o}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Re({button:{which:"jump",actions:["jump"],id:"jump"},colourise:o,inputStateTracker:n}),fire:new Re({button:{which:"fire",actions:["fire"],id:"fire"},colourise:o,inputStateTracker:n}),carry:new Re({button:{which:"carry",actions:["carry"],id:"carry"},colourise:o,inputStateTracker:n}),carryAndJump:new Re({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:o,inputStateTracker:n}),menu:new Re({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:o,inputStateTracker:n})},joystick:new na({inputStateTracker:n,inputDirectionMode:r,colourise:o})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const l of Z(i))l.renderContext.button.which==="menu"?this.#e.addChild(i.menu.container):s.addChild(l.container);i.jump.container.y=Da,i.carry.container.x=-30,i.carryAndJump.container.y=-15,i.fire.container.x=Fa,i.menu.container.x=24,i.menu.container.y=24,this.#e.addChild(s),this.#e.addChild(a.container),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of Z(this.#n.buttons)){const{renderContext:{button:{actions:r}}}=n;n.container.eventMode="static",n.container.on("pointerdown",()=>{for(const o of r)e.hudInputState[o]=!0}),n.container.on("pointerup",()=>{for(const o of r)e.hudInputState[o]=!1}),n.container.on("pointerleave",()=>{for(const o of r)e.hudInputState[o]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-44,this.#n.mainButtonNest.y=e.y-16,this.#n.joystick.container.x=34,this.#n.joystick.container.y=e.y-30}tick(e){const{screenSize:n}=e,{gameState:r}=this.renderContext;this.#o(n);for(const o of Z(this.#n.buttons))o.tick({...e,currentPlayable:Fe(r)});this.#n.joystick.tick()}get container(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}xr.frames.button.frame;const za=250,La=t=>t?12:24,Ra=t=>t?32:56,Ua=t=>t?40:80,Ea=t=>t?18:24,Zn=112,Ue=t=>t==="heels"?1:-1;class $a{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const r of Dt)this.#e.addChild(this.#t[r].livesText),this.#e.addChild(this.#t[r].sprite),this.#e.addChild(this.#t[r].shield.container),this.#e.addChild(this.#t[r].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[Nn],this.#t.fps.y=ht.h,this.#o(),n&&(this.#n=new Ma({...e}),this.#e.addChild(this.#n.container))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#r("head"),livesText:this.#i({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#s({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#s({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#r("heels"),livesText:this.#i({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#s({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#i({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Dt){const{sprite:r}=this.#t[n];r.eventMode="static",r.on("pointerdown",()=>{e[`swop.${n}`]=!0}),r.on("pointerup",()=>{e[`swop.${n}`]=!1}),r.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#s({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new Oe({texture:oe().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:$n,y:n?0:8});s.addChild(a);const l=this.#i({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=ht.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=Y),{text:l,icon:a,container:s}}#r(e){const n=new Oe(oe().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?Qs:tn,scale:{x:1,y:e?2:1}})}#l({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ue("head")*Zn,this.#t.head.doughnuts.container.y=e.y-$e.h-8,this.#t.heels.carrying.container.y=e.y-$e.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ue("heels")*Zn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-ht.w*2}#a(e,n){return e?n?fe:He:n?Rn:Ve}#d(e){const{renderContext:{gameState:n}}=this,r=rt(n,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(ko(i)),a.filters=this.#a(!0,s),this.#t.heels.bag.icon.filters=this.#a(o,s)}#f(e){const{renderContext:{gameState:n}}=this,r=rt(n,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#a(o,s),this.#t.head.doughnuts.icon.filters=this.#a(i!==0,s),ye(this.#t.head.doughnuts.text,i)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:r,gameState:o}}=this,i=rt(o,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=gt(i),d=u>0||!r;a.visible=d,d&&(ye(s,u),a.y=n.y),c.x=a.x=(n.x>>1)+Ue(e)*Ua(r);const f=i===void 0?0:e==="head"?vo(i):i.bigJumps,h=f>0||!r;c.visible=h,h&&(ye(l,f),c.y=n.y-Ea(r))}#c(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:r,gameState:o}}=this,i=this.#c(o,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?fe:He:s.filters=a?Rn:Ve,s.x=(n.x>>1)+Ue(e)*Ra(r),s.y=n.y-$e.h}#m(e,{screenSize:n}){const{renderContext:{onScreenControls:r,gameState:o}}=this,s=rt(o,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ue(e)*La(r),a.y=n.y,ye(a,s??0)}#g(e){const{room:n}=e;if(n===void 0)return;const r=bn(n.color),{colourise:o,gameState:i}=this.renderContext;Ve.targetColor=r.hud.dimmed[o?"dimmed":"original"],tn.targetColor=r.hud.dimmed[o?"basic":"original"],$n.targetColor=r.hud.icons[o?"basic":"original"],He.targetColor=r.hud.lives.original,this.#t.head.livesText.filters=o?at.colourised.head[this.#c(i,"head")?"active":"inactive"]:at.original,this.#t.heels.livesText.filters=o?at.colourised.heels[this.#c(i,"heels")?"active":"inactive"]:at.original}#u=_i;#b(){if(Pi(x.getState())){if(performance.now()>this.#u+za){const e=Ee.shared.FPS;ye(this.#t.fps,Math.round(e)),Nn.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#u=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#g(e);for(const n of Dt)this.#m(n,e),this.#p(n,e),this.#h(n,e);this.#l(e),this.#f(e),this.#d(e),this.#b(),this.#n?.tick(e)}get container(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const Kn={movementType:"vel",vels:{gravity:O}},Na=(t,e,n,r)=>{if(!me(t))return Kn;const{type:o,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=as[(o==="headOverHeels"?"head":o)==="head"?"head":"others"];if(s!==null){const c=Ae(s,e);return X("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-Jt*r,-l)}}}:Kn}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-Jt*r,-l)}}}},Qn=M.h,er=.001,Va=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=kn**2/(2*De);if(n==="up"){if(e<=r)return Math.max(er,Math.sqrt(2*De*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(er,Math.sqrt(2*De*o))}else return kn}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*De*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*De*Math.max(e,0))):-.036};function Ha({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}}){const o=t*Qn,i=e*Qn,s=Va({currentAltitude:r-o,direction:n,totalDistance:i-o});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=r<=o?"up":r>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}}function Xa(t,e,n,r){const{state:{teleporting:o,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&X("teleporter")(l);if(o===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:Wt}}}:_e;const u=Math.max(o.timeRemaining-r,0);switch(o.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return un({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:o.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Wt}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...o,timeRemaining:u}}}}const tr={movementType:"vel",vels:{movingFloor:O}},ja=(t,e,n,r)=>{if(H(t)&&t.state.teleporting!==null)return tr;const{state:{standingOnItemId:o}}=t,i=Ae(o,e);if(i===null||!X("conveyor")(i))return tr;const{config:{direction:s}}=i,l=X("heels")(t)&&t.state.action==="moving"&&ln(t.state.facing)===Bi(s)?ce.heels:ls;return{movementType:"vel",vels:{movingFloor:B(qt[s],l)}}};function*qa(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Ga=M.w*Math.sqrt(2)+1,Wa=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=pe(d);if(o.currentActionPress("fire")==="tap"&&a&&Ye(s)>0&&l+f<c){const m={type:"firedDoughnut",...cs,config:re,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:L(u,B(h,Ga),t.type==="headOverHeels"?{z:M.h}:O),vels:{fired:B(h,ce.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};fn({room:e,item:m}),i.doughnuts=ee(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},Ja=2;function*Ya(t,e,n,r){ge(t)&&(yield Na(t,e,n,r),yield ja(t,e),yield*qa(t,e)),H(t)&&(yield Lo(t,e,n,r),t.id===n.currentCharacterName&&(yield Xa(t,e,n,r),yield zo(t,e,n),us(t)&&Pa(t,e,n,r),ds(t)&&Wa(t,e,n))),fs(t)&&(yield Ha(t)),hs(t)&&(yield ma(t,e,n,r))}const Za=(t,e,n,r)=>{if(!ge(t)||t.state.standingOnItemId===null)return;const o=Ae(t.state.standingOnItemId,e);H(t)&&(o.type==="movableBlock"&&o.config.movement!=="free"&&o.config.activated==="onStand"&&(o.state.activated=!0),o.type==="pickup"&&Po({gameState:n,movingItem:t,touchedItem:o,room:e})),(o.state.disappear==="onStand"||o.state.disappear==="onTouch"||H(t)&&o.state.disappear==="onTouchByPlayer")&&Br({touchedItem:o,gameState:n,room:e})},Ka=(t,e,n,r)=>{if(H(t)&&t.state.standingOnItemId!==null){const l=Ae(t.state.standingOnItemId,e);kr(l)&&_o({room:e,movingItem:t})}const o=[...Ya(t,e,n,r)];Za(t,e,n);let i=Ro(t,o);(ge(t)||X("lift")(t)||X("firedDoughnut")(t))&&(i=L(i,...ie(Z(t.state.vels)).map(l=>B(l,r))));const s=Math.ceil(Pe(i)/Ja),a=B(i,1/s);for(let l=0;l<s;l++)Dr({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:Uo})},Qa=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=ee(e.state.head.lives,-1),e.state.heels.lives=ee(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,ee(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const o=Ye(e.state.head.lives)>0,i=Ye(e.state.heels.lives)>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,ae(t,e);const u=On(e)[c],d=Se({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:wt(u)};return}if(t.entryState.headOverHeels!==void 0){ae(t,e);const c=Se({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=On(e);if(ae(t,c),ae(t,u),cn(c,u)){const d=zr({head:c,heels:u});ae(t,d,"heels");const f=Se({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:wt(d)};return}else{const d=Se({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Se=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Gt({roomJson:r.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??re});for(const i of e)fn({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&ps(o,t);return o},ae=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOnItemId:null}},el=(t,e)=>{const n=Lr(t,Rr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];ae(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=zr({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});ae(t,a);const l=Se({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}fn({room:r,item:e});return}else{const s=Se({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},tl=(t,e)=>{e.type==="headOverHeels"?Qa(t,e):el(t,e),Fe(t)===void 0&&x.dispatch(Ai({offerReincarnation:!0}))},nl=t=>{for(const e of ue(t.items))for(const n of dn(e.state.stoodOnBy,t)){if(!t.items[n.id]){_n(n,t);continue}if(!vn(n,e)){_n(n,t);const r=Oo(n,Fr(t.items));r!==void 0&&Pr({above:n,below:r})}}},rl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,ol=(t,e,n)=>{for(const r of ue(t.items))!ge(r)||t.roomTime===r.state.actedOnAt||Fi(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=Di(r.state.position),n.add(r))},il=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},sl=re,al=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=nr(t,e),i=Ge(t)?.items??sl;n=new Set(ie(Yt(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return nr(t,e*t.gameSpeed)},nr=(t,e)=>{const{inputStateTracker:n}=t,r=Ge(t);if(r===void 0)return Sr;const o=Object.fromEntries(ms(r.items).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Mt(t),n.currentActionPress("swop.head")==="tap"&&Mt(t,"head"),n.currentActionPress("swop.heels")==="tap"&&Mt(t,"heels");for(const a of Z(r.items))rl(a,r)&&(Mr({room:r,item:a}),H(a)&&tl(t,a));const i=Object.values(r.items).sort(il);for(const a of i){const l=Fe(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&Ka(a,r,t,e)}nl(r);const s=new Set(ie(Z(r.items)).filter(a=>o[a.id]===void 0||!Be(a.state.position,o[a.id])));return wa(s,r,o),ol(r,o,s),ll(t,r,e),s},ll=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Fe(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Lr(t,Rr(r.type));i!==void 0&&(i.state.gameTime+=n)}}},rr=(t,e)=>{const n=C(t),r=C(L(t,{x:e.x,z:e.z})),o=C(L(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},Et=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,cl=(t,e,n,r)=>{const o=rr(t,e),i=rr(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Et(s,a,l,c),d=o.topRight.y-o.topRight.x/2,f=o.bottomCentre.y-o.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=Et(d,f,h,m),k=o.topLeft.y+o.topLeft.x/2,A=o.bottomCentre.y+o.bottomCentre.x/2,F=i.topLeft.y+i.topLeft.x/2,_=i.bottomCentre.y+i.bottomCentre.x/2,U=Et(k,A,F,_);return u&&v&&U},ul=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!cl(n,r,o,i))return 0;for(const s of Mi){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return or(e)-or(t)},or=t=>t.state.position.x+t.state.position.y-t.state.position.z;class bt extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const dl=t=>{const e=fl(t);let n=e.length,r=n;const o=new Array(n),i={},s=hl(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new bt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(m){throw m instanceof bt?m.hasClosedCycle?m:new bt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function fl(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function hl(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const ir=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},dt=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},pl=(t,e=new Set(Z(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||dt(n,o,s);for(const o of e)if(o.renders)for(const i of Z(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=ul(o,i);if(ir(r,o,i),s===0){dt(n,o.id,i.id),dt(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;ir(n,a,l),dt(n,l,a)}return n},No=(t,e,n=3)=>{try{return{order:dl(t),impossible:!1}}catch(r){if(r instanceof bt){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:No(t,e,n-1).order,impossible:!0}}else throw r}};class ml extends Io{}const sr=(t,e)=>{e.poly([C({}),C({x:t.x}),C({x:t.x,y:t.y}),C({y:t.y})]).poly([C({}),C({z:t.z}),C({y:t.y,z:t.z}),C({y:t.y})]).poly([C({x:t.x}),C({x:t.x,z:t.z}),C(t),C({x:t.x,y:t.y})]).poly([C({z:t.z}),C({x:t.x,z:t.z}),C({x:t.x,y:t.y,z:t.z}),C({y:t.y,z:t.z})])},ar=(t,e)=>{const n=new V;return sr(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),sr(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},gl={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class bl{constructor(e){this.renderContext=e;const{item:n}=e,r=gl[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),X("portal")(n)){const i=C(n.config.relativePoint);this.#e.addChild(new V().circle(i.x,i.y,5).stroke(r)),this.#e.addChild(new V().circle(i.x,i.y,2).fill(r))}this.#e.addChild(new V({label:"objectOrigin"}).circle(0,0,2).fill(r)),this.#e.addChild(ar(n.aabb,r)),n.renderAabb&&this.#e.addChild(ar(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let o;this.#e.on("pointerenter",()=>{if(o!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(o=new Ns({text:i,style:{fill:r,fontSize:6,fontFamily:"Menlo"}})),o.resolution=4}),this.#e.on("pointerleave",()=>{o!==void 0&&(this.#e.removeChild(o),o=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class vl{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.container]}),this.#n()}#e;#n(){const e=C(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get container(){return this.#e}}const xl=(t,e)=>{const n=e.getLocalBounds(),r=mn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new Oe({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},lr=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=p({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof Oe?o:xl(t,o)};class yl{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=x.getState();n||(this.#e.filters=new Us({alpha:.5}));const{item:r,pixiRenderer:o}=e,{shadowMask:{spriteOptions:i}}=r;if(i){const{times:s}=r.config,a=lr(o,i,s);r.shadowMask.relativeTo==="top"&&(a.y-=r.aabb.z),s&&(a.y-=((s.z??1)-1)*M.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:r,pixiRenderer:o,room:i}=this.renderContext,s=e.has(r),a=r.state.position.z+r.aabb.z,l=ue(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:r.id,state:{position:{...r.state.position,z:a}},aabb:{...r.aabb,z:gs}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":cn(c,d)?f?"update":"create":"noShadow"});for(const d of Yt(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=lr(o,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of Yt(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=C({...Ze(d.state.position,r.state.position),z:r.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of yt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get container(){return this.#e}}const wl=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Cl=(t,e,n)=>{const o=oe().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&oe().textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},ft=t=>D(({renderContext:{item:e}})=>bs(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),D=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:r})=>n===void 0?{container:t({renderContext:e,previousRendering:null,tickContext:r}),renderProps:re}:"no-update";function*Tl({config:{direction:t,inHiddenWall:e,height:n}},r){const o=It(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${o}`,...pt(a,{y:-12*n})});l.filters=en(r,o==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...pt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...pt(a,{y:-l*M.h})})}}yield*s(T({...te,[o]:1})),yield*s(te),e||(yield p({pivot:{x:16,y:M.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...T({...te,[o]:1})}))}const Vo=(t,e)=>{const n=It(t),r=Ke(n),o=8;return t==="towards"||t==="right"?C({[r]:e[r]-o}):te},Sl=D(({renderContext:{item:t,room:e}})=>Je(Tl(t,e),new b({filters:Q(e),...Vo(t.config.direction,t.aabb)}))),Il=D(({renderContext:{item:{config:{direction:t,part:e},aabb:n},room:r}})=>{const o=It(t);return p({textureId:Cl(r,o,e),filter:Q(r),...Vo(t,n)})}),$t={animationId:"bubbles.cold"},Ie=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(p(e));const o=p(t);return o.y=-12,r.addChild(o),r},Ho=Symbol(),Xo=Symbol(),kl=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[Ho]=t,n[Xo]=e,n},Ol=`#version 300 es

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
`;class cr extends j{constructor(e){const n=R.from({vertex:Qe,fragment:Ol,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const _l=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(Li(i))return{textureId:i}}const o=`${t}.idle.${n}`;return Ri(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},rn=Symbol(),on=Symbol(),Pl=(t,e)=>{t[rn].removeChildren(),t[rn].addChild(p(_l(e)))},Nt=(t,e)=>{const n=new b,r=new b;n[rn]=r,n.addChild(r);const o=p({animationId:e?`shine.${t}InSymbio`:"shine",filter:t==="heels"?new be({pastelBlue:g.pink}):fe,flipX:t==="heels"});return n[on]=o,n},ur=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+vs>t,Bl=t=>{if(!Xe(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Pn<Pn*.15},dr=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},fr=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?fe:t.filters},Al=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?dr(o,new ke({outlineColor:Te[t],upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&fr(o,ke);const s=r?.flashing??!1;n&&!s?dr(o,new cr(Te[t])):!n&&s&&fr(o,cr)},Fl=(t,e,n)=>{e&&!n?t.addChild(t[on]):!e&&n&&t.removeChild(t[on])},Vt=(t,e,n,r,o)=>{n&&Pl(e,{name:t,...r}),Al(t,r,o,e),Fl(e,r.shining,o?.shining??!1)},Ht=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n},previousRendering:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=e,l=yr(s)??"towards",c=e.type==="headOverHeels"?ur(e.state.head,"headOverHeels","headOverHeels"):ur(e.state,e.type,n.currentCharacterName),u=Bl(e),d=bo(e),f=Pe(s),h=a?.phase??null,m={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c,shining:d},v=t===void 0||t.action!==i||t.facingXy8!==l||t.teleportingPhase!==h;let k;if(o==="headOverHeels"){k=r??kl({top:Nt("head",!0),bottom:Nt("heels",!0)});const A=k;Vt("head",A[Ho],v,m,t),Vt("heels",A[Xo],v,m,t)}else k=r??Nt(o,!1),Vt(o,k,v,m,t);return i==="moving"&&r instanceof We&&(r.animationSpeed=f*zi),{container:k,renderProps:m}},Dl=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new b({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),o=Je(ie(yt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=Je(ie(yt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...T(pt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[Ke(qe(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},Ml=t=>[...ie(Z(t.items)).filter(e=>e.type==="wall").filter(e=>qe(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],zl=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},Ll=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new V().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),Rl=D(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=_t(t.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const F=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,_=new b;for(let P=-1;P<=o+2;P++)for(let E=P%2-1;E<=i+2;E+=2)_.addChild(xs({x:P+(s.right?-.5:0),y:E+(s.towards?-.5:0)},p({textureId:F})));_.addChild(Dl(h,{x:n,y:r}));const U=new V().poly([te,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});_.addChild(U),_.filters=Q(t),_.mask=U,m.addChild(_)}const v=Ml(h),k=new V().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(k);const A=zl(v);if(A!==void 0){const F=Ll({extraWallRanges:A,blockXMin:n,blockYMin:r});m.addChild(F)}return m.mask=k,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Ul=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=T({x:-t,y:-e}),i={towards:new b({label:"towards",...o}),right:new b({label:"right",...o})};return ie(yt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...T(f),times:a.type==="wall"?a.config.times:{[Ke(qe(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(L(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(L(f,{x:-.5}))}))}),i},El=D(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,edgeLeftX:s,edgeRightX:a}=_t(e.roomJson),l=o-n,c=i-r,u=new b({label:"floorEdge"}),d=new V({label:"overDrawToHideFallenItems"}).poly([T({x:l,y:0}),T({x:0,y:0}),T({x:0,y:c}),{...T({x:0,y:c}),y:999},{...T({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=Ul({blockXMin:n,blockYMin:r},e.roomJson);f.filters=en(e,"towards",t),h.filters=en(e,"right",t),u.addChild(f),u.addChild(h);const m=new V({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),$l=({renderContext:{item:{config:t,state:e},room:n},currentlyRenderedProps:r})=>{const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?Ws:o?void 0:wo(n);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=ln(e.facing)??"towards";if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:p({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:p({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:p(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?Ie({top:{textureId:`${t.which}.${a}`,filter:s||Q(n)},bottom:$t}):p({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:Ie({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:p(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:p({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:Ie({top:$t,filter:s}),renderProps:l};case"emperorsGuardian":return{container:Ie({top:"ball",bottom:$t,filter:s}),renderProps:l};case"emperor":return{container:p({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},hr=t=>Ui(Ei(t)),Nl=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Xt=g.moss,pr=()=>D(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Vl={head:Ht,heels:Ht,headOverHeels:Ht,doorFrame:Il,doorLegs:Sl,monster:$l,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:D(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:r}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=Ke(qe(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:wl(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ne.w,y:Ne.h+1}:{x:0,y:Ne.h+1},filter:Q(r)}),l=T({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:D(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?Q(n):void 0,times:e})),slidingDeadly:pr(),slidingBlock:pr(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:r},currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:p({textureId:Nl(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?Q(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:{store:e}}},currentlyRenderedProps:n}){const r=e?$i(x.getState().gameMenus,e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}}},currentlyRenderedProps:r}){const o=hr(n)>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new b,a=qe(t);return s.addChild(p(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:D(()=>{const t=new b,e={x:$e.w/2,y:$e.h};return t.addChild(p({animationId:"lift",pivot:e})),t.addChild(p({textureId:"lift.static",pivot:e})),t}),teleporter({renderContext:{item:{state:{stoodOnBy:t}},room:e},currentlyRenderedProps:n}){const r=dn(t,e).find(H)!==void 0;return n===void 0||r!==n.flashing?{container:r?new b({children:[p("teleporter"),p({animationId:"teleporter.flashing"})]}):p("teleporter"),renderProps:{flashing:r}}:"no-update"},pickup:D(({renderContext:{item:{config:t},room:e}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:Q(e)},reincarnation:{animationId:"fish"}}[t.gives];return p(r)}),moveableDeadly:D(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=ln(t)??"towards";return e===void 0||n!==e.facingXy4?{container:Ie({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:ft("joystick"),movableBlock:D(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new ke({outlineColor:Xt,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{container:p({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}}},currentlyRenderedProps:n}){const r=hr(t)>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new ke({outlineColor:Xt,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{container:p(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new ke({outlineColor:Xt,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{container:t==="headOverHeels"?Ie({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:ft("hushPuppy"),bubbles:D(({renderContext:{item:{config:{style:t}}}})=>p({animationId:`bubbles.${t}`})),firedDoughnut:ft({animationId:"bubbles.doughnut"}),ball:ft("ball"),floor:Rl,floorEdge:El},Hl=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Xl=t=>t.item.shadowMask!==void 0,jl=t=>{const e=x.getState(),n=Ni(e),r=Vi(e),{item:o,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const c=Vl[o.type],u=new ml(t,c);a.push(u),s&&(u.container.alpha=.66),r&&Xl(t)&&a.push(new yl(t))}if(s&&a.push(new bl(t)),a.length===0)return"not-needed";const l=a.length===1?a[0]:new ql(a,t);return Hl(o,l.container,i),new vl(t,l)};class ql{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(r=>r.container))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#n}}const xe=.33,Gl=Hi()==="mobile"?-4:16,sn=Ne.h-Ne.w/2,Wl=ce.heels,Jl=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=_t(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-Gl-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-sn<0;return(m,v,k)=>{if(m===void 0)return;const A=C(m.state.position),F=L(A,u),_={x:d&&F.x<n.x*xe?Math.min(-a,n.x*xe-A.x):f&&F.x>n.x*(1-xe)?Math.max(n.x-l,n.x*(1-xe)-A.x):u.x,y:h&&F.y<n.y*xe?n.y*xe-A.y:u.y};if(k)e.x=_.x,e.y=_.y;else{const U=Wl*v,P=Ze(e,_),E=Cr(P);if(E>U){const Ft={x:P.x/E,y:P.y/E};e.x-=Ft.x*U,e.y-=Ft.y*U}else e.x=_.x,e.y=_.y}}},Yl=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=_t(t);return new V().rect(e+r.x,o-sn,n-e,r.y-o+sn).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class Zl{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:r}}=x.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??Ir.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(Yl(e.room.roomJson)),this.#i=Jl(e.room,this.#t,r.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=!1;#s=new Map;#r=new Map;#i;initFilters(e,n){this.#e.filters=e?fe:new z(bn(n).main.original)}#l(e){const{room:n}=this.renderContext;for(const r of ue(n.items)){let o=this.#r.get(r.id);if(o!==void 0){if(o==="not-needed")continue}else{if(o=jl({...this.renderContext,item:r}),o==="not-needed"){this.#r.set(r.id,"not-needed");continue}this.#r.set(r.id,o),(r.type==="floorEdge"?this.#n:this.#e).addChild(o.container),r.fixedZIndex&&(o.container.zIndex=r.fixedZIndex)}o.tick(e)}for(const[r,o]of this.#r.entries())n.items[r]===void 0&&(o!=="not-needed"&&o.destroy(),this.#r.delete(r))}#a(e){const{order:n}=No(pl(this.renderContext.room.items,e.movedItems,this.#s),this.renderContext.room.items);for(let r=0;r<n.length;r++){const o=this.#r.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#o?e:{...e,movedItems:new Set(ue(this.renderContext.room.items))};this.#i(Fe(this.renderContext.gameState),n.deltaMS,!this.#o),this.#l(n),(!this.#o||n.movedItems.size>0)&&this.#a(n),this.#o=!0}destroy(){this.#t.destroy({children:!0}),this.#r.forEach(e=>{e!=="not-needed"&&e.destroy()})}get container(){return this.#t}}var Bt=`in vec2 aPosition;
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
`,At=`struct GlobalFilterUniforms {
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
}`,Kl=`precision highp float;
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
`,Ql=`struct CRTUniforms {
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
}`,ec=Object.defineProperty,tc=(t,e,n)=>e in t?ec(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,vt=(t,e,n)=>(tc(t,typeof e!="symbol"?e+"":e,n),n);const jo=class qo extends j{constructor(e){e={...qo.DEFAULT_OPTIONS,...e};const n=he.from({vertex:{source:At,entryPoint:"mainVertex"},fragment:{source:Ql,entryPoint:"mainFragment"}}),r=R.from({vertex:Bt,fragment:Kl,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),vt(this,"uniforms"),vt(this,"seed"),vt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};vt(jo,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let nc=jo;var rc=`
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
}`,oc=`struct KawaseBlurUniforms {
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
}`,ic=`
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
`,sc=`struct KawaseBlurUniforms {
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
}`,ac=Object.defineProperty,lc=(t,e,n)=>e in t?ac(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,se=(t,e,n)=>(lc(t,typeof e!="symbol"?e+"":e,n),n);const Go=class Wo extends j{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(je("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Wo.DEFAULT_OPTIONS,...n};const r=he.from({vertex:{source:At,entryPoint:"mainVertex"},fragment:{source:n?.clamp?sc:oc,entryPoint:"mainFragment"}}),o=R.from({vertex:Bt,fragment:n?.clamp?ic:rc,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),se(this,"uniforms"),se(this,"_pixelSize",{x:0,y:0}),se(this,"_clamp"),se(this,"_kernels",[]),se(this,"_blur"),se(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=Ce.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),Ce.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};se(Go,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let cc=Go;var uc=`in vec2 vTextureCoord;
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
`,dc=`struct AdvancedBloomUniforms {
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
`,fc=`
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
`,hc=`struct ExtractBrightnessUniforms {
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
`,pc=Object.defineProperty,mc=(t,e,n)=>e in t?pc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Jo=(t,e,n)=>(mc(t,typeof e!="symbol"?e+"":e,n),n);const Yo=class Zo extends j{constructor(e){e={...Zo.DEFAULT_OPTIONS,...e};const n=he.from({vertex:{source:At,entryPoint:"mainVertex"},fragment:{source:hc,entryPoint:"mainFragment"}}),r=R.from({vertex:Bt,fragment:fc,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Jo(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Jo(Yo,"DEFAULT_OPTIONS",{threshold:.5});let gc=Yo;var bc=Object.defineProperty,vc=(t,e,n)=>e in t?bc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,we=(t,e,n)=>(vc(t,typeof e!="symbol"?e+"":e,n),n);const Ko=class Qo extends j{constructor(e){e={...Qo.DEFAULT_OPTIONS,...e};const n=he.from({vertex:{source:At,entryPoint:"mainVertex"},fragment:{source:dc,entryPoint:"mainFragment"}}),r=R.from({vertex:Bt,fragment:uc,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:le.WHITE}}),we(this,"uniforms"),we(this,"bloomScale",1),we(this,"brightness",1),we(this,"_extractFilter"),we(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new gc({threshold:e.threshold}),this._blurFilter=new cc({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=Ce.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Ce.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),Ce.returnTexture(s),Ce.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};we(Ko,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let xc=Ko;const mr=({crtFilter:t},e)=>[t?new nc({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new xc({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class yc{constructor(e,n){this.app=e,this.#r=e,this.#i=n;try{const r=x.getState(),{gameMenus:{upscale:{gameEngineUpscale:o}}}=r;if(e.stage.addChild(this.#s),e.stage.scale=o,Ge(n)===void 0)throw new Error("main loop with no starting room");this.#a()}catch(r){this.#l(r);return}}#e;#n;#t;#o;#s=new b({label:"MainLoop/world"});#r;#i;#l(e){console.error(e),x.dispatch(Xi(ji(e,"message","stack")))}#a(){const{gameMenus:{userSettings:{displaySettings:e}}}=x.getState();this.#e=mr(e,!0),this.#n=mr(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#l(n)}};tick=({deltaMS:e})=>{const n=x.getState(),r=qi(n),{gameMenus:{userSettings:{displaySettings:o},upscale:i}}=x.getState(),s=Ge(this.#i),a=!r&&!(o?.uncolourised??Ir.displaySettings.uncolourised);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==yn(n)||this.#t?.renderContext.inputDirectionMode!==wn(n))&&(this.#t?.destroy(),this.#t=new $a({colourise:a,gameState:this.#i,inputDirectionMode:wn(n),onScreenControls:yn(n)}),this.#r.stage.addChild(this.#t.container)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const l=r?Sr:al(this.#i,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==o||this.#o?.renderContext.paused!==r)&&(this.#o?.destroy(),s?(this.#o=new Zl({gameState:this.#i,room:s,paused:r,pixiRenderer:this.#r.renderer,displaySettings:o,colourised:a,upscale:i}),this.#s.addChild(this.#o.container),this.#i.events.emit("roomChange",s.id)):this.#o=void 0,this.#r.stage.scale=i.gameEngineUpscale,this.#a()),this.#o?.tick({progression:this.#i.progression,movedItems:l,deltaMS:e}),r?this.#r.stage.filters=this.#e:this.#r.stage.filters=this.#n};start(){return this.#r.ticker.add(this.tickAndCatch),this}stop(){this.#r.stage.removeChild(this.#s),this.#o?.destroy(),this.#t?.destroy(),this.#r.ticker.remove(this.tickAndCatch)}}St.add(Er,$r,Nr,Vr,Hr,Xr,jr,qr,Gr,Wr,Jr,Zr,Yr,Kr,Qr,eo,to,no,ro,oo,io);Wi.defaultOptions.scaleMode="nearest";const gr=async(t,e)=>{const n=new po;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const r=x.getState().gameMenus.currentGame,o=Ln({campaign:t,inputStateTracker:e,savedGame:r});r!==void 0?x.dispatch(Gi(r.store.gameMenus)):(x.dispatch(Cn(o.characterRooms.head.id)),x.dispatch(Cn(o.characterRooms.heels.id)));const i=new yc(n,o).start();return{campaign:t,events:o.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Fe(o);a!==void 0&&un({playableItem:a,gameState:o,toRoomId:s,changeType:"level-select"})},get currentRoom(){return Ge(o)},get gameState(){return o},reincarnateFrom(s){Ln({campaign:t,inputStateTracker:e,savedGame:s,writeInto:o})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},kc=Object.freeze(Object.defineProperty({__proto__:null,default:gr,gameMain:gr},Symbol.toStringTag,{value:"Module"}));export{co as A,so as C,j as F,mn as R,Bs as S,uo as V,zs as a,kc as g,Ps as u};
