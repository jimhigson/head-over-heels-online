const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer--n7ROYSO.js","assets/App-BDSV-09u.js","assets/index-e-q1_gW8.js","assets/index-CGQ8pOyP.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-D7nB529n.js","assets/Graphics-uo-CRw7v.js","assets/swopCharacters-BWWpSCo_.js","assets/WebGLRenderer-B8q4oaJc.js"])))=>i.map(i=>d[i]);
import{aN as oi,a8 as ii,I as si,L as pe,N as U,t as vr,J as ce,E as w,g as It,f as ai,C as b,d as je,v as yt,a6 as y,D as qt,_ as _e,T as Ee,U as li,V as ci,aO as ui,aP as di,aQ as fi,q as hi,aR as tt,ae as oe,aS as pi,aT as Y,aU as mi,aV as ie,aW as xr,aq as yr,ak as x,o as Q,ac as O,aX as gi,aY as bi,aZ as vi,ag as B,a_ as Pe,a$ as xi,b0 as wr,b1 as Cr,b2 as yi,b3 as pt,ad as L,b4 as wi,i as se,b5 as Ci,b6 as Ti,b7 as Si,b8 as Ii,ar as Tr,ah as kt,b9 as wn,ba as ki,bb as Ze,bc as Sr,bd as me,be as Ot,p as Qe,as as Be,af as Wt,am as ne,bf as Oi,bg as _i,bh as Pi,bi as Bi,a9 as Ir,bj as kr,bk as $e,ai as Fi,bl as Ai,bm as cn,bn as Di,bo as Mi,bp as Or,bq as zi,br as Li,bs as Ri,an as wt,bt as mt,bu as Ui,bv as Ei,bw as $i,b as Ge,bx as Ni,by as Vi,bz as Ne,bA as Hi,bB as Xi,bC as ji,bD as _r,Y as Te,bE as Gi,au as qi,bF as Wi,bG as Ji,bH as Yi,bI as Zi,at as Cn,bJ as Qi}from"./App-BDSV-09u.js";import{l as Jt,j as Ct,g as Tn,k as Sn,h as A,p as T,m as ge,n as un,q as Ki,r as es,t as Yt,u as Tt,v as gt,c as dn,w as R,i as X,x as Pr,y as Br,z as Fr,A as ue,B as _t,C as Pt,D as ts,E as Fe,F as ns,G as rs,H as os,I as Zt,J as is,K as nt,L as ss,M as as,N as ls,a as be,O as Ar,P as Dr,Q as In,R as de,S as Mr,T as zr,f as cs,U as Lr,V as Rr,W as us,b as Ae,X as zt,Y as rt,Z as ds,_ as De,$ as kn,a0 as fs,a1 as fn,a2 as hs,a3 as ps,a4 as ms,a5 as gs,a6 as bs,a7 as On,a8 as Ur,e as Er,o as $r,a9 as vs,aa as _n,s as qe,ab as xs,ac as Lt,ad as C,ae as ys,af as ws,ag as Cs,ah as Pn,ai as Bt,aj as Ts}from"./swopCharacters-BWWpSCo_.js";import{S as Ss,G as H}from"./Graphics-uo-CRw7v.js";import{g as Is,_ as Bn}from"./index-e-q1_gW8.js";var ot={},Fn;function ks(){if(Fn)return ot;Fn=1;var t=oi(),e=t.mark(i),n=ii(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return f=d[u],v.delegateYield(o(f),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}ot.__concat=i;var s=r(i);return ot.concat=s,ot}var Rt,An;function Os(){return An||(An=1,Rt=ks().concat),Rt}var _s=Os();const Qt=Is(_s),Nr=class Kt extends si{constructor(e){e={...Kt.defaultOptions,...e},super(e),this.enabled=!0,this._state=Ss.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=pe.from(n)),r&&(s=U.from(r)),new Kt({gpuProgram:i,glProgram:s,...o})}};Nr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let G=Nr;var Ps=`
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
`,Bs=`in vec2 aPosition;
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
`,Fs=`
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
}`;class S extends G{constructor(e){const n=e.gpu,r=Dn({source:Fs,...n}),o=pe.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Dn({source:Ps,...i}),a=U.from({vertex:Bs,fragment:s}),l=new vr({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:ce.EMPTY}})}}function Dn(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const hn=`
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
	`;class Vr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Vr.extension={name:"color",type:w.BlendMode};class Hr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Hr.extension={name:"color-burn",type:w.BlendMode};class Xr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Xr.extension={name:"color-dodge",type:w.BlendMode};class jr extends S{constructor(){super({gl:{functions:`
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
                `}})}}jr.extension={name:"darken",type:w.BlendMode};class Gr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Gr.extension={name:"difference",type:w.BlendMode};class qr extends S{constructor(){super({gl:{functions:`
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
            `}})}}qr.extension={name:"divide",type:w.BlendMode};class Wr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Wr.extension={name:"exclusion",type:w.BlendMode};class Jr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Jr.extension={name:"hard-light",type:w.BlendMode};class Yr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Yr.extension={name:"hard-mix",type:w.BlendMode};class Zr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Zr.extension={name:"lighten",type:w.BlendMode};class Qr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Qr.extension={name:"linear-burn",type:w.BlendMode};class Kr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Kr.extension={name:"linear-dodge",type:w.BlendMode};class eo extends S{constructor(){super({gl:{functions:`
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
            `}})}}eo.extension={name:"linear-light",type:w.BlendMode};class to extends S{constructor(){super({gl:{functions:`
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
            `}})}}to.extension={name:"luminosity",type:w.BlendMode};class no extends S{constructor(){super({gl:{functions:`
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
            `}})}}no.extension={name:"negation",type:w.BlendMode};class ro extends S{constructor(){super({gl:{functions:`
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
                `}})}}ro.extension={name:"overlay",type:w.BlendMode};class oo extends S{constructor(){super({gl:{functions:`
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
                `}})}}oo.extension={name:"pin-light",type:w.BlendMode};class io extends S{constructor(){super({gl:{functions:`
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
            `}})}}io.extension={name:"saturation",type:w.BlendMode};class so extends S{constructor(){super({gl:{functions:`
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
                `}})}}so.extension={name:"soft-light",type:w.BlendMode};class ao extends S{constructor(){super({gl:{functions:`
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
                `}})}}ao.extension={name:"subtract",type:w.BlendMode};class lo extends S{constructor(){super({gl:{functions:`
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
                `}})}}lo.extension={name:"vivid-light",type:w.BlendMode};const en=[];It.handleByNamedList(w.Environment,en);async function As(t){if(!t)for(let e=0;e<en.length;e++){const n=en[e];if(n.value.test()){await n.value.load();return}}}let Me;function Ds(){if(typeof Me=="boolean")return Me;try{Me=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Me=!1}return Me}var co=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(co||{});class Ms{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const zs=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],uo=class fo extends ai{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...zs,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await As(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...fo.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof b&&(r={container:r},n&&(je(yt,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:y.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=co.ALL);const{clear:r,clearColor:o,target:i}=e;y.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new Ms(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Ds())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};uo.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let ho=uo,it;function Ls(t){return it!==void 0||(it=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??ho.defaultOptions.failIfMajorPerformanceCaveat};try{if(!qt.get().getWebGLRenderingContext())return!1;let r=qt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),it}let st;async function Rs(t={}){return st!==void 0||(st=await(async()=>{const e=qt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),st}const Mn=["webgl","webgpu","canvas"];async function Us(t){let e=[];t.preference?(e.push(t.preference),Mn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Mn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await Rs()){const{WebGPURenderer:a}=await Bn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer--n7ROYSO.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&Ls(t.failIfMajorPerformanceCaveat??ho.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Bn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-B8q4oaJc.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const po="8.8.1";class mo{static init(){globalThis.__PIXI_APP_INIT__?.(this,po)}static destroy(){}}mo.extension=w.Application;class Es{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,po)}destroy(){this._renderer=null}}Es.extension={type:[w.WebGLSystem,w.WebGPUSystem],name:"initHook",priority:-10};const go=class tn{constructor(...e){this.stage=new b,e[0]!==void 0&&je(yt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await Us(e),tn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return je(yt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=tn._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};go._plugins=[];let bo=go;It.handleByList(w.Application,bo._plugins);It.add(mo);var $s=`in vec2 aPosition;
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
`,Ns=`
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
}`;const vo=class xo extends G{constructor(e){e={...xo.defaultOptions,...e};const n=pe.from({vertex:{source:zn,entryPoint:"mainVertex"},fragment:{source:zn,entryPoint:"mainFragment"}}),r=U.from({vertex:$s,fragment:Ns,name:"alpha-filter"}),{alpha:o,...i}=e,s=new vr({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};vo.defaultOptions={alpha:1};let Vs=vo;class We extends _e{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof ce?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ee.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ee.shared.add(this.update,this,li.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(ce.from(e[r]));return new We(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(ce.from(e[r]));return new We(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof ce)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Ee.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ee.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class Hs extends ci{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new ui({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function Xs(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(je(yt,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class js extends Hs{constructor(...e){const n=Xs(e,"Text");super(n,di),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=fi.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class mn extends ce{static create(e){return new mn({source:new hi(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}function Gs(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const qs=(t,e)=>{if(e)return pi(e.gameState.characterRooms,([r,o])=>[r,o.id]);const n={};for(const r of Object.values(t.rooms))for(const o of Object.values(r.items))if(o.type==="player"){const{which:i}=o.config;n[i]=r.id}if(n.head===void 0&&n.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return n},Ln=({campaign:t,inputStateTracker:e,savedGame:n,writeInto:r={}})=>{const o=qs(t,n),i={},s=n?n.gameState.characterRooms.head&&tt(n.gameState.characterRooms.head):o.head&&Jt({roomJson:t.rooms[o.head],roomPickupsCollected:i[o.head]??oe,isNewGame:n===void 0}),a=o.heels===o.head?s:n?n.gameState.characterRooms.heels&&tt(n.gameState.characterRooms.heels):o.heels&&Jt({roomJson:t.rooms[o.heels],roomPickupsCollected:i[o.heels]??oe,isNewGame:n===void 0}),l=n?.gameState.characterRooms.headOverHeels&&tt(n.gameState.characterRooms.headOverHeels),c={head:s,heels:a,headOverHeels:l};return Object.assign(r,{events:Gs(),inputStateTracker:e,campaign:t,gameSpeed:1,...n?tt(n?.gameState):{currentCharacterName:o.head===void 0?"heels":"head",entryState:{head:s===void 0?void 0:Ct(Tn("head",s?.items)),heels:a===void 0?void 0:Ct(Tn("heels",a?.items))},pickupsCollected:i,gameTime:0,progression:0},characterRooms:c})},g={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},fe=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:r/2})},N={original:new y(Y.zxWhite),basic:g.white,dimmed:g.lightGrey},V={original:new y(Y.zxYellow),basic:g.midRed,dimmed:g.redShadow},q={original:new y(Y.zxMagenta),basic:g.pink,dimmed:fe(g.pink)},I={original:new y(Y.zxCyan),basic:g.pastelBlue,dimmed:fe(g.pastelBlue)},W={original:new y(Y.zxGreen),basic:g.moss,dimmed:fe(g.moss)},gn={white:{basic:{main:N,edges:{towards:I,right:V},hud:{lives:V,dimmed:q,icons:I}},dimmed:{main:N,edges:{towards:W,right:I},hud:{lives:V,dimmed:q,icons:I}}},yellow:{basic:{main:V,edges:{towards:W,right:N},hud:{lives:I,dimmed:q,icons:W}},dimmed:{main:V,edges:{towards:I,right:I},hud:{lives:I,dimmed:q,icons:W}}},magenta:{basic:{main:q,edges:{towards:W,right:I},hud:{lives:N,dimmed:I,icons:V}},dimmed:{main:q,edges:{towards:W,right:I},hud:{lives:N,dimmed:I,icons:V}}},cyan:{basic:{main:I,edges:{towards:q,right:N},hud:{lives:N,dimmed:W,icons:V}},dimmed:{main:I,edges:{towards:q,right:N},hud:{lives:N,dimmed:W,icons:V}}},green:{basic:{main:W,edges:{towards:I,right:V},hud:{lives:N,dimmed:q,icons:I}},dimmed:{main:W,edges:{towards:I,right:V},hud:{lives:N,dimmed:q,icons:I}}}},bn=t=>gn[t.hue][t.shade],Se={head:g.pastelBlue,heels:g.pink},bt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+Sn>n?100-Math.ceil((n-e)/(Sn/100)):0},yo=t=>t.type==="headOverHeels"?bt(t.state.head)>0||bt(t.state.heels)>0:bt(t.state)>0,wo=t=>{const e=100*A.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/A.w):0},Ke=`in vec2 aPosition;
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
`,Ws=`in vec2 vTextureCoord;
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
`;class ve extends G{constructor(e){const n=Object.keys(e).length,r=U.from({vertex:Ke,fragment:Ws.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{g[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Js=`precision mediump float;
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
`;class z extends G{uniforms;constructor(e="white"){const n=U.from({vertex:Ke,fragment:Js,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const Ys=`precision mediump float;
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
`;class Zs extends G{constructor(){const e=U.from({vertex:Ke,fragment:Ys,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const Co=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),To=t=>Co(gn[t.color.hue][t.color.shade].main),So=t=>new ve({lightBeige:g.lightGrey,redShadow:g.shadow,pink:g.lightGrey,moss:g.lightGrey,midRed:g.midGrey,highlightBeige:g.lightGrey,...t&&To(t)}),Qs=new ve({midGrey:g.midRed,lightGrey:g.lightBeige,white:g.highlightBeige,metallicBlue:g.redShadow,pink:g.midRed,moss:g.midRed,replaceDark:g.midRed,replaceLight:g.lightBeige}),Ks=t=>new ve({replaceLight:t,replaceDark:fe(t)}),nn=(t,e,n)=>n?new ve(Co(gn[t.color.hue][t.color.shade].edges[e])):new z(bn(t.color).edges[e].original),ee=t=>new ve(To(t)),Rn=new Zs,he=mi,Un={x:.5,y:1},En=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(En(t)?c=ea(t):c=new _e(ie().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new b({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let m=1;m<=u.z;m++){const v=p({...t,times:void 0,label:`(${f},${h},${m})`}),k=T({x:f-1,y:h-1,z:m-1});v.x+=k.x,v.y+=+k.y,d.addChild(v)}return d}if(e===void 0&&r===void 0)if(En(t))c.anchor=Un;else{const u=ie().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=Un}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function ea({animationId:t,reverse:e,playOnce:n}){const o=ie().animations[t].map(s=>({texture:s,time:xr}));e&&o.reverse();const i=new We(o);return i.animationSpeed=yr.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const ta=`#version 300 es

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
`;class Oe extends G{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=U.from({vertex:Ke,fragment:ta,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const Z=new Oe({outlineColor:g.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),Ve=new z,$n=new z,rn=new z,Nn=new z(g.moss),He=new z,J=[Ve,Z],na=[He,Z],ra=[Z,rn],at={original:[Z,He],colourised:{head:{active:[Z,new z(Se.head)],inactive:[Z,new z(fe(Se.head))]},heels:{active:[Z,new z(Se.heels)],inactive:[Z,new z(fe(Se.heels))]}}},xe=14,oa=2,ia=Math.cos(30*(Math.PI/180)),sa=40;class aa{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:xe,y:-14,filter:J}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:xe,y:xe,filter:J}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:xe,filter:J}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:J}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:xe*Math.SQRT2,filter:J}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:xe*Math.SQRT2,filter:J}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:J}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:J})}:{}},this.container.addChild(this.#e),this.container.addChild(new H().circle(0,0,sa).fill("#00000000"));for(const r of Q(this.arrowSprites))this.container.addChild(r);this.container.on("pointerenter",this.handlePointerEnter),this.container.on("globalpointermove",this.usePointerLocation),this.container.on("pointerup",this.stopCurrentPointer),this.container.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?he:Ve}container=new b({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=O};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=gi(x.getState()),{x:r,y:o}=this.container,{x:i,y:s}=e,{width:a,height:l}=this.container.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=bi({x:-c,y:-u}),f=vi(d,ia),h=B(f,oa);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(x.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const r=Pe(e)>xi?wr(e):void 0;for(const[o,i]of Cr(this.arrowSprites))i.filters=o===r?na:J}destroy(){this.stopCurrentPointer(),this.container.off("pointerenter",this.handlePointerEnter),this.container.off("globalpointermove",this.usePointerLocation),this.container.off("pointerup",this.stopCurrentPointer),this.container.off("pointerupoutside",this.stopCurrentPointer),this.container.destroy()}}const on={colourised:{jump:g.pastelBlue,fire:g.highlightBeige,carry:g.moss,carryAndJump:g.midRed,menu:g.lightGrey},zx:{jump:Y.zxBlue,fire:Y.zxYellow,carry:Y.zxGreen,carryAndJump:Y.zxRed,menu:Y.zxWhite}};function Je(t,e){const n=e||new b;for(const r of t)n.addChild(r);return n}function*Io(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;yi(o),yield p({textureId:o,x:(r+.5-n/2)*pt.w})}}function we(t,e){return t.removeChildren(),Je(Io(e),t),t}function la(t,e){return t.removeChildren(),Je(Io(e),t),t}const St=Symbol(),ko=Symbol(),Oo=Symbol(),lt=({colourise:t,button:{which:e}})=>{const n=new b({label:"depress"}),r=new b({label:"arcadeButton"});r.addChild(n);const o=p("button");t?o.filters=Ks(on.colourised[e]):r.filters=new z(on.zx[e]),n.addChild(o);const i=new b({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),r[ko]=o,r[St]=i,r[Oo]=n,r},ze=(t,...e)=>{t[St].removeChildren();for(const n of e)n!==void 0&&t[St].addChild(n)},ct=(t,e)=>{t[ko].texture=ie().textures[e?"button.pressed":"button"],t[Oo].y=e?1:0},Vn=(t,e,n)=>{n&&(t[St].filters=e?So():he)},Hn=({which:t},e,n)=>{const r=la(new b,n);return r.filters=new ve({white:e?fe(on.colourised[t]):g.pureBlack}),r};class _o{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new b({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.container&&(this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container)))}get container(){return this.#n}}const Po=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),ca=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},Xn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>ca(t,e,n,r),vn=(t,e,n=.001)=>{if(!ge(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:un({state:{position:L(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+wi},id:t.id},{state:{position:L(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Bo=(t,e)=>{const r=[...se(e).filter(i=>vn(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=Ki(s,i);return a<0||a===0&&Xn(t,s)>Xn(t,i)?s:i})},Xe=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<es};function Fo({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&(yo(e)||Xe(e)||(e.state.action="death",e.state.expires=t+Yt))}const te=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,Ye=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Ao=t=>{const{gameState:e,movingItem:n,touchedItem:{id:r,config:o},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:a}=e;if(a[i]?.[r]!==!0)switch(s[r]&&(a[i]===void 0&&(a[i]={}),a[i][r]=!0),o.gives){case"hooter":{const l=gt(n);if(l!==void 0){l.hasHooter=!0;break}break}case"doughnuts":{const l=gt(n);l!==void 0&&(l.doughnuts=te(l.doughnuts,6));break}case"bag":{const l=Tt(n);if(l!==void 0){l.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const l=gt(n);l!==void 0&&(l.fastStepsStartedAtDistance=l.gameWalkDistance);break}case"jumps":{const l=Tt(n);l!==void 0&&(l.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=te(n.state.head.lives,2),n.state.heels.lives=te(n.state.heels.lives,2)):n.state.lives=te(n.state.lives,2);break;case"scroll":x.dispatch(Ii(o.page));break;case"reincarnation":{x.dispatch(Ti(Si(e,x.getState())));break}case"crown":{x.dispatch(Ci(o.planet));break}}},ua=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Tr(i,r)<=0||e.state.action!=="death"&&dn({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},da=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=kt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=L(t.state.position,s)};function fa({movingItem:t}){t.state.autoWalk=!1}const K=(t,...e)=>X(...e)(t.touchedItem),Le=(t,...e)=>X(...e)(t.movingItem),Do=t=>R(t.movingItem),ha=t=>R(t.touchedItem),pa=t=>Pr(t.touchedItem),jn=t=>{switch(!0){case K(t,"stopAutowalk"):fa(t);break;case pa(t):Fo(t);break;case K(t,"portal"):ua(t);break;case K(t,"pickup"):Ao(t);break;case K(t,"doorFrame"):da(t);break}},j={movementType:"steady"},xn=(t,e)=>{const{head:n,heels:r,headOverHeels:o}=Br(e.items);if(o!==void 0)return Xe(o)?void 0:o;const i=n===void 0||Xe(n)||n.state.action==="death"?void 0:wn(n.state.position,t),s=r===void 0||Xe(r)||r.state.action==="death"?void 0:wn(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},Mo=150,zo=t=>t[Math.floor(Math.random()*t.length)],re=Object.freeze({movementType:"vel",vels:{walking:O}}),Ft=t=>Fr(t)?ue[t.config.which]:ue[t.type],Gn=A.w/2,ma=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ue.homingBot;if(!Ot(e,ne))return{movementType:"steady"};const{head:s,heels:a}=Br(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=Ze(l.state.position,t);if(Math.abs(c.y)<Gn)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<Gn)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},ga=(t,e,n,r)=>{const{state:{position:o,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return re;const l=xn(o,e);if(l===void 0||s+Mo>e.roomTime)return j;const c=Ze(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>A.w/4?u:Qe(u),f=Ft(t),h={...O,[d]:c[d]>0?f:-f},m=me(h),v=!Ot(m,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:oe}}},qn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return re;const a=xn(i,e);if(a===void 0)return re;const l=a.state.position,c=A.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return re;const d=Ze(a?.state.position,i),f=Ft(t),h=(1+Math.sqrt(2))/2,m=f*h,v=B({...d,z:0},m/Sr(d)*(o?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:me(v)}}},Ut=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return re;if(!(Be(i,O)||Math.random()<r/1e3))return j;const l=zo(o);return{movementType:"vel",vels:{walking:B(Wt[l],Ft(t))},stateDelta:{facing:Wt[l]}}},ba=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOnItemId:s}}=t;return s===null?re:Ot(i,ne)?{movementType:"vel",vels:{walking:B(o,Ft(t))}}:j},va=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=zo([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},Et=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<Mo))return;const c=_t(i,l,e,n);if(c.x===0&&c.y===0)return;const u=va(s,c,o);t.state.vels.walking=u,t.state.facing=me(u),t.state.durationOfTouch=0},xa=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},ya=(t,e,n,r)=>{if(!t.state.activated||Fr(t)&&t.state.busyLickingDoughnutsOffFace)return re;switch(t.config.movement){case"patrol-randomly-diagonal":return Ut(t,e,n,r,Pi);case"patrol-randomly-xy8":return Ut(t,e,n,r,_i);case"patrol-randomly-xy4":return Ut(t,e,n,r,Oi);case"towards-tripped-on-axis-xy4":return ma(t,e);case"towards-on-shortest-axis-xy4":return ga(t,e);case"back-forth":case"clockwise":return ba(t);case"unmoving":return re;case"towards-analogue":return qn(t,e);case"towards-analogue-unless-planet-crowns":return qn(t,e,n,r,ki(x.getState()));default:throw t.config,new Error("this should be unreachable")}},wa=t=>{const{movingItem:e,touchedItem:n}=t;if(ge(n,e))switch(e.config.movement){case"patrol-randomly-xy4":Et(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":Et(t,"opposite");break;case"clockwise":Et(t,"clockwise");break;case"towards-tripped-on-axis-xy4":xa(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},Ca=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:r,state:{setting:o,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(r.type){case"in-room":{const s=t.state.setting=o==="left"?"right":"left";for(const a of r.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s]})}break}case"in-store":{x.dispatch(Bi(r.path));break}}},Ta=({movingItem:t,touchedItem:e})=>{if(!ge(t))return;const{state:{position:n},aabb:r}=e,o=_t(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=me(o),s=B(i,-.05);return e.state.vels.sliding=s,!1},Sa=({movingItem:t,touchedItem:e})=>{if(!ge(e))return;const n=t.state.vels.sliding;if(Be(n,O))return;const{state:{position:r},aabb:o}=t,i=_t(e.state.position,e.aabb,r,o);return Tr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},Ia=2*ts,Lo=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Ia,positionDelta:n})},ka=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...Ir(r.state.position,o),z:0};if(!Be(s,O))for(const a of Pt(r.state.stoodOnBy,e))Lo(a,e,s)}},Oa=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=_t(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=me(a);for(const c of o){const u=e.items[c],d=B(l,-.025*r);u.state.facing=d,Lo(u,e,d)}},yn=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:kr(x.getState(),t),_a=(t,e,n,r)=>{const{state:{teleporting:o,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&X("teleporter")(l)&&yn(l);if(o===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:Yt}}}:j;const u=Math.max(o.timeRemaining-r,0);switch(o.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return dn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:o.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Yt}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...o,timeRemaining:u}}}},ut=t=>{const n=t/is*xr;return(t+.5*Zt*n**2)/n},Pa={head:ut(nt.head),headOnSpring:ut(nt.head+A.h),heels:ut(nt.heels),heelsOnSpring:ut(nt.heels+A.h)},Ba=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Pa[`${n}${e?"OnSpring":""}`]},Fa=t=>!(t===null||rs(t)&&yn(t)||os(t)&&t.config.gives==="scroll"||R(t)&&t.state.standingOnItemId===null),Ro=(t,e,n)=>{const{state:{standingOnItemId:r}}=t,{inputStateTracker:o}=n,i=Fe(r,e);if(!(o.currentActionPress("jump")!=="released"&&Fa(i)))return r!==null?{movementType:"steady",stateDelta:{jumped:!1}}:j;const a=ns(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:Ba(t,a)}},stateDelta:{action:"moving",jumped:!0}}},Aa=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Pe(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return B(n,l)},Wn={movementType:"vel",vels:{walking:O}},Uo=(t,e,n,r)=>{const o=Da(t,e,n,r);if(o.movementType==="vel"&&o.vels.walking!==void 0){const i=Pe(o.vels.walking);o.stateDelta={...o.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*r},t.type==="head"&&t.state.standingOnItemId!==null&&(o.stateDelta={...o.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*r})}return t.state.action==="idle"&&o.movementType==="vel"&&o.vels.walking!==void 0&&!Be(o.vels.walking,O)&&(o.stateDelta={...o.stateDelta,walkStartFacing:t.state.facing}),o},Da=(t,e,{inputStateTracker:n,currentCharacterName:r},o)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:m}}}=t,v=r===t.id,k=v?n.currentActionPress("jump"):"released",D=v?n.directionVector:O,M=l===null&&m.z<0,_=i==="head"&&wo(t.state)>0&&l!==null,E=i==="headOverHeels"?M?"head":"heels":_?"heels":i,P=a?c:D,$=ue[E];if(u!==null||s==="death")return Wn;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:Ir(h,B(h,ss*o))}}:Wn;if(k!=="released"){const et=me(Ot(P,ne)?c:P),ri=X("spring")(Fe(l,e))?1:as;return{movementType:"vel",vels:{walking:B({...et,z:0},$*ri)},stateDelta:{facing:et}}}}if(Pe(P)!==0)return M?{movementType:"vel",vels:{walking:B({...P,z:0},$)},stateDelta:{facing:P,action:"falling"}}:{movementType:"vel",vels:{walking:Aa({vel:h,acc:ls[E],deltaMS:o,maxSpeed:$,unitD:P,minSpeed:0})},stateDelta:{facing:P,action:"moving"}};if(d>0&&d<1){const et=Be(f,c)?1:0;return{movementType:"position",posDelta:B(c,et-d),stateDelta:{action:M?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:M?"falling":"idle"}}},Jn=t=>be(t.movingItem)&&vn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Eo=(t,e)=>{let n=O;for(const r of e){if(r.movementType==="position"&&(n=L(n,r.posDelta)),r.movementType==="vel"&&(be(t)||X("lift")(t)))for(const[i,s]of Cr(r.vels)){const a={...O,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},Yn=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&R(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Jn(t)){if(Jn(t)&&Do(t)){Ar({above:t.movingItem,below:t.touchedItem});const n=[Ro(t.movingItem,t.room,t.gameState),Uo(t.movingItem,t.room,t.gameState,t.deltaMS)];Eo(t.movingItem,n)}Dr(t)}};function Ma(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const $o=t=>{Do(t)&&jn(t),ha(t)&&jn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),K(t,...In)&&Ta(t),Le(t,...In)&&Sa(t),(Le(t,"monster")&&K(t,"firedDoughnut")||Le(t,"firedDoughnut")&&K(t,"monster"))&&Ma(t),(Le(t,"monster")||Le(t,"movingPlatform"))&&wa(t),K(t,"switch")&&Ca(t),K(t,"joystick")&&Oa(t),t.touchedItem.state.disappear&&Yn(t),t.movingItem.state.disappear&&ge(t.touchedItem,t.movingItem)&&Yn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},za=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=de(e.items).filter(Mr),u=s===null?No(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=o.currentActionPress("carry");if(d==="tap"||o.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;La(e,i,u)}else{if(t.state.standingOnItemId===null||!Vo(t,zr(e.items)))return;const h=cs({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Lr({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:$o}),i.carrying=null}},La=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Rr({room:t,item:n})},No=(t,e)=>Bo(t,de(e.items).filter(Mr)),Vo=(t,e)=>{const n={position:L(t.state.position,{z:A.h})},r=us({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(ge(o,t)){if(!be(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!Vo(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0},$t=-11,Ra={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter",u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=o===null?lt({colourise:n,button:t}):o;if(r?.pressed!==u&&ct(d,u),c!==r?.standingOnTeleporter)if(c)ze(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=Hn(t,n,"JUMP");f.y=$t,ze(d,f)}return{container:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{currentPlayable:i,room:s}}){const a=i&&Tt(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&No(i,s)!==void 0,d=t.actions.every(v=>e.currentActionPress(v)!=="released"),f=l&&!u&&c===null,h=o===null?lt({colourise:n,button:t}):o;if(h.visible=l,l&&(f!==r?.disabled&&Vn(h,f,n),h.visible=!0,r?.pressed!==d&&ct(h,d),l!==r?.hasBag||c!==r?.carrying)){let v;c!==null?v=Po(c):l&&(v=p({textureId:"bag",y:-2})),ze(h,v)}return{container:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{currentPlayable:i}}){const s=i&&gt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=o===null?lt({colourise:n,button:t}):o,d=a||Ye(l)>0;if(u.visible=d,d&&(r?.pressed!==c&&ct(u,c),a!==r?.hasHooter||l!==r?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):Ye(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=we(new b,l);h.y=$t,h.filters=Z,ze(u,f,h),Vn(u,l===0,n)}return{container:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:r,previousRendering:o,tickContext:{currentPlayable:i}}){const a=(i&&Tt(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(r===void 0||l!==r.pressed||n!==r.colourise||a!==r.hasBag))return"no-update";let u;if(o===null){u=lt({colourise:n,button:t});const d=Hn(t,n,"C+J");d.y=$t,ze(u,d)}else u=o;return a?(u.visible=!0,r?.pressed!==l&&ct(u,l)):u.visible=!1,{container:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=J,{container:e,renderProps:oe}}};class Re extends _o{constructor(e){const n=Ra[e.button.which];super(e,n)}}const Ua=30,Ea=15,$a=42,Na=36,Va=44,Ha=20;class Xa{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:r,colourise:o}=e;this.#n={mainButtonNest:new b({label:"mainButtonNest"}),buttons:{jump:new Re({button:{which:"jump",actions:["jump"],id:"jump"},colourise:o,inputStateTracker:n}),fire:new Re({button:{which:"fire",actions:["fire"],id:"fire"},colourise:o,inputStateTracker:n}),carry:new Re({button:{which:"carry",actions:["carry"],id:"carry"},colourise:o,inputStateTracker:n}),carryAndJump:new Re({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:o,inputStateTracker:n}),menu:new Re({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:o,inputStateTracker:n})},joystick:new aa({inputStateTracker:n,inputDirectionMode:r,colourise:o})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const l of Q(i))l.renderContext.button.which==="menu"?this.#e.addChild(i.menu.container):s.addChild(l.container);i.jump.container.y=Ea,i.carry.container.x=-30,i.carryAndJump.container.y=-15,i.fire.container.x=Ua,i.menu.container.x=24,i.menu.container.y=24,this.#e.addChild(s),this.#e.addChild(a.container),this.#t()}#e=new b({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of Q(this.#n.buttons)){const{renderContext:{button:{actions:r}}}=n;n.container.eventMode="static",n.container.on("pointerdown",()=>{for(const o of r)e.hudInputState[o]=!0}),n.container.on("pointerup",()=>{for(const o of r)e.hudInputState[o]=!1}),n.container.on("pointerleave",()=>{for(const o of r)e.hudInputState[o]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-Va,this.#n.mainButtonNest.y=e.y-Ha,this.#n.joystick.container.x=$a,this.#n.joystick.container.y=e.y-Na}tick(e){const{screenSize:n}=e,{gameState:r}=this.renderContext;this.#o(n);for(const o of Q(this.#n.buttons))o.tick({...e,currentPlayable:Ae(r)});this.#n.joystick.tick()}get container(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}yr.frames.button.frame;const ja=250,Ga=t=>t?48:24,qa=t=>t?68:56,Wa=(t,e)=>t?e.x/2-24:80,Ja=t=>t?72:24,Ya=t=>t?88:0,Zn=112,Ue=t=>t==="heels"?1:-1;class Za{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const r of zt)this.#e.addChild(this.#t[r].sprite),this.#e.addChild(this.#t[r].livesText),this.#e.addChild(this.#t[r].shield.container),this.#e.addChild(this.#t[r].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[Nn],this.#t.fps.y=pt.h,this.#o(),n&&(this.#n=new Xa({...e}),this.#e.addChild(this.#n.container))}#e=new b({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#r("head"),livesText:this.#i({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#s({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#s({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#r("heels"),livesText:this.#i({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#s({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new b({label:"heelsCarrying"})}},fps:this.#i({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of zt){const{sprite:r,livesText:o}=this.#t[n];for(const i of[r,o])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#s({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new b({label:i});s.pivot={x:4,y:16};const a=new _e({texture:ie().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:$n,y:n?0:8});s.addChild(a);const l=this.#i({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=pt.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=Z),{text:l,icon:a,container:s}}#r(e){const n=new _e(ie().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new b({label:r,filters:n?ra:rn,scale:{x:1,y:e?2:1}})}#l({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ue("head")*Zn,this.#t.head.doughnuts.container.y=e.y-$e.h-8,this.#t.heels.carrying.container.y=e.y-$e.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ue("heels")*Zn,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-pt.w*2}#a(e,n){return e?n?he:He:n?Rn:Ve}#d(e){const{renderContext:{gameState:n}}=this,r=rt(n,"heels"),o=r?.hasBag??!1,i=r?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(Po(i)),a.filters=this.#a(!0,s),this.#t.heels.bag.icon.filters=this.#a(o,s)}#f(e){const{renderContext:{gameState:n}}=this,r=rt(n,"head"),o=r?.hasHooter??!1,i=r?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#a(o,s),this.#t.head.doughnuts.icon.filters=this.#a(i!==0,s),we(this.#t.head.doughnuts.text,i)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:r,gameState:o}}=this,i=rt(o,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=bt(i),d=u>0||!r;a.visible=d,d&&(we(s,u),a.y=n.y-Ya(r)),c.x=a.x=(n.x>>1)+Ue(e)*Wa(r,n);const f=i===void 0?0:e==="head"?wo(i):i.bigJumps,h=f>0||!r;c.visible=h,h&&(we(l,f),c.y=n.y-Ja(r))}#c(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:r,gameState:o}}=this,i=this.#c(o,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?he:He:s.filters=a?Rn:Ve,s.x=(n.x>>1)+Ue(e)*qa(r),s.y=n.y-$e.h}#m(e,{screenSize:n}){const{renderContext:{onScreenControls:r,gameState:o}}=this,s=rt(o,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ue(e)*Ga(r),a.y=n.y,we(a,s??0)}#g(e){const{room:n}=e;if(n===void 0)return;const r=bn(n.color),{colourise:o,gameState:i}=this.renderContext;Ve.targetColor=r.hud.dimmed[o?"dimmed":"original"],rn.targetColor=r.hud.dimmed[o?"basic":"original"],$n.targetColor=r.hud.icons[o?"basic":"original"],He.targetColor=r.hud.lives.original,this.#t.head.livesText.filters=o?at.colourised.head[this.#c(i,"head")?"active":"inactive"]:at.original,this.#t.heels.livesText.filters=o?at.colourised.heels[this.#c(i,"heels")?"active":"inactive"]:at.original}#u=Fi;#b(){if(Ai(x.getState())){if(performance.now()>this.#u+ja){const e=Ee.shared.FPS;we(this.#t.fps,Math.round(e)),Nn.targetColor=e>100?g.white:e>58?g.moss:e>55?g.pastelBlue:e>50?g.metallicBlue:e>40?g.pink:g.midRed,this.#u=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#g(e);for(const n of zt)this.#m(n,e),this.#p(n,e),this.#h(n,e);this.#l(e),this.#f(e),this.#d(e),this.#b(),this.#n?.tick(e)}get container(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const Qn={movementType:"vel",vels:{gravity:O}},Qa=(t,e,n,r)=>{if(!ge(t))return Qn;const{type:o,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=ds[(o==="headOverHeels"?"head":o)==="head"?"head":"others"];if(s!==null){const c=Fe(s,e);return X("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-Zt*r,-l)}}}:Qn}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-Zt*r,-l)}}}},Kn=A.h,er=.001,Ka=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=kn**2/(2*De);if(n==="up"){if(e<=r)return Math.max(er,Math.sqrt(2*De*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(er,Math.sqrt(2*De*o))}else return kn}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*De*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*De*Math.max(e,0))):-.036};function el({config:{bottom:t,top:e},state:{direction:n,position:{z:r}}}){const o=t*Kn,i=e*Kn,s=Ka({currentAltitude:r-o,direction:n,totalDistance:i-o});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=r<=o?"up":r>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}}const tr={movementType:"vel",vels:{movingFloor:O}},tl=(t,e,n,r)=>{if(R(t)&&t.state.teleporting!==null)return tr;const{state:{standingOnItemId:o}}=t,i=Fe(o,e);if(i===null||!X("conveyor")(i))return tr;const{config:{direction:s}}=i,l=X("heels")(t)&&t.state.action==="moving"&&cn(t.state.facing)===Di(s)?ue.heels:fs;return{movementType:"vel",vels:{movingFloor:B(Wt[s],l)}}};function*nl(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const rl=A.w*Math.sqrt(2)+1,ol=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=me(d);if(o.currentActionPress("fire")==="tap"&&a&&Ye(s)>0&&l+f<c){const m={type:"firedDoughnut",...hs,config:oe,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:L(u,B(h,rl),t.type==="headOverHeels"?{z:A.h}:O),vels:{fired:B(h,ue.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};fn({room:e,item:m}),i.doughnuts=te(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},Ho=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),il=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),dt=A.w*3,sl=(t,e)=>{const{state:{position:n}}=t,{state:{position:r}}=e;return n.x>r.x-dt&&n.x<r.x+dt&&n.y>r.y-dt&&n.y<r.y+dt},nr=(t,e,n,r,o)=>{if(o&&t.state.activated)return j;const i=xn(t.state.position,e);return i===void 0?j:sl(t,i)?Ho:il},al=(t,e,n,r)=>t.state.activated?j:Pt(t.state.stoodOnBy,e).some(R)?Ho:j,ll=(t,e,n,r)=>{switch(t.config.activated){case"after-player-near":return nr(t,e,n,r,!0);case"while-player-near":return nr(t,e,n,r,!1);case"on-stand":return al(t,e);case"off":case"on":return j;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},cl=2;function*ul(t,e,n,r){be(t)&&(yield Qa(t,e,n,r),yield tl(t,e),yield*nl(t,e)),R(t)&&(yield Uo(t,e,n,r),t.id===n.currentCharacterName&&(yield _a(t,e,n,r),yield Ro(t,e,n),ps(t)&&za(t,e,n,r),ms(t)&&ol(t,e,n))),gs(t)&&(yield el(t)),bs(t)&&(yield ll(t,e,n,r),yield ya(t,e,n,r))}const dl=(t,e,n,r)=>{if(!be(t)||t.state.standingOnItemId===null)return;const o=Fe(t.state.standingOnItemId,e);R(t)&&o.type==="pickup"&&Ao({gameState:n,movingItem:t,touchedItem:o,room:e}),(o.state.disappear==="onStand"||o.state.disappear==="onTouch"||R(t)&&o.state.disappear==="onTouchByPlayer")&&Dr({touchedItem:o,gameState:n,room:e})},fl=(t,e,n,r)=>{if(R(t)&&t.state.standingOnItemId!==null){const l=Fe(t.state.standingOnItemId,e);Pr(l)&&Fo({room:e,movingItem:t})}const o=[...ul(t,e,n,r)];dl(t,e,n);let i=Eo(t,o);(be(t)||X("lift")(t)||X("firedDoughnut")(t))&&(i=L(i,...se(Q(t.state.vels)).map(l=>B(l,r))));const s=Math.ceil(Pe(i)/cl),a=B(i,1/s);for(let l=0;l<s;l++)Lr({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:$o})},hl=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=te(e.state.head.lives,-1),e.state.heels.lives=te(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,te(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const o=Ye(e.state.head.lives)>0,i=Ye(e.state.heels.lives)>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,le(t,e);const u=On(e)[c],d=Ie({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Ct(u)};return}if(t.entryState.headOverHeels!==void 0){le(t,e);const c=Ie({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=On(e);if(le(t,c),le(t,u),un(c,u)){const d=Ur({head:c,heels:u});le(t,d,"heels");const f=Ie({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Ct(d)};return}else{const d=Ie({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Ie=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Jt({roomJson:r.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??oe});for(const i of e)fn({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&vs(o,t);return o},le=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOnItemId:null}},pl=(t,e)=>{const n=Er(t,$r(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];le(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Ur({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});le(t,a);const l=Ie({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}fn({room:r,item:e});return}else{const s=Ie({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},ml=(t,e)=>{e.type==="headOverHeels"?hl(t,e):pl(t,e),Ae(t)===void 0&&x.dispatch(Mi({offerReincarnation:!0}))},gl=t=>{for(const e of de(t.items))for(const n of Pt(e.state.stoodOnBy,t)){if(!t.items[n.id]){_n(n,t);continue}if(!vn(n,e)){_n(n,t);const r=Bo(n,zr(t.items));r!==void 0&&Ar({above:n,below:r})}}},bl=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,vl=(t,e,n)=>{for(const r of de(t.items))!be(r)||t.roomTime===r.state.actedOnAt||zi(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=Li(r.state.position),n.add(r))},xl=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},yl=oe,wl=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=rr(t,e),i=qe(t)?.items??yl;n=new Set(se(Qt(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return rr(t,e*t.gameSpeed)},rr=(t,e)=>{const{inputStateTracker:n}=t,r=qe(t);if(r===void 0)return Or;const o=Object.fromEntries(xs(r.items).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&Lt(t),n.currentActionPress("swop.head")==="tap"&&Lt(t,"head"),n.currentActionPress("swop.heels")==="tap"&&Lt(t,"heels");for(const a of Q(r.items))bl(a,r)&&(Rr({room:r,item:a}),R(a)&&ml(t,a));const i=Object.values(r.items).sort(xl);for(const a of i){const l=Ae(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&fl(a,r,t,e)}gl(r);const s=new Set(se(Q(r.items)).filter(a=>o[a.id]===void 0||!Be(a.state.position,o[a.id])));return ka(s,r,o),vl(r,o,s),Cl(t,r,e),s},Cl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=Ae(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=Er(t,$r(r.type));i!==void 0&&(i.state.gameTime+=n)}}},or=(t,e)=>{const n=C(t),r=C(L(t,{x:e.x,z:e.z})),o=C(L(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},Nt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Tl=(t,e,n,r)=>{const o=or(t,e),i=or(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Nt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,f=o.bottomCentre.y-o.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=Nt(d,f,h,m),k=o.topLeft.y+o.topLeft.x/2,D=o.bottomCentre.y+o.bottomCentre.x/2,M=i.topLeft.y+i.topLeft.x/2,_=i.bottomCentre.y+i.bottomCentre.x/2,E=Nt(k,D,M,_);return u&&v&&E},Sl=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Tl(n,r,o,i))return 0;for(const s of Ri){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return ir(e)-ir(t)},ir=t=>t.state.position.x+t.state.position.y-t.state.position.z;class vt extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const Il=t=>{const e=kl(t);let n=e.length,r=n;const o=new Array(n),i={},s=Ol(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new vt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(m){throw m instanceof vt?m.hasClosedCycle?m:new vt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function kl(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function Ol(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const sr=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},ft=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},_l=(t,e=new Set(Q(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||ft(n,o,s);for(const o of e)if(o.renders)for(const i of Q(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=Sl(o,i);if(sr(r,o,i),s===0){ft(n,o.id,i.id),ft(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;sr(n,a,l),ft(n,l,a)}return n},Xo=(t,e,n=3)=>{try{return{order:Il(t),impossible:!1}}catch(r){if(r instanceof vt){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:Xo(t,e,n-1).order,impossible:!0}}else throw r}};class Pl extends _o{}const ar=(t,e)=>{e.poly([C({}),C({x:t.x}),C({x:t.x,y:t.y}),C({y:t.y})]).poly([C({}),C({z:t.z}),C({y:t.y,z:t.z}),C({y:t.y})]).poly([C({x:t.x}),C({x:t.x,z:t.z}),C(t),C({x:t.x,y:t.y})]).poly([C({z:t.z}),C({x:t.x,z:t.z}),C({x:t.x,y:t.y,z:t.z}),C({y:t.y,z:t.z})])},lr=(t,e)=>{const n=new H;return ar(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),ar(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Bl={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class Fl{constructor(e){this.renderContext=e;const{item:n}=e,r=Bl[n.type]??"rgba(255,255,255)";if(this.#e=new b({label:`ItemBoundingBoxRenderer ${n.id}`}),X("portal")(n)){const i=C(n.config.relativePoint);this.#e.addChild(new H().circle(i.x,i.y,5).stroke(r)),this.#e.addChild(new H().circle(i.x,i.y,2).fill(r))}this.#e.addChild(new H({label:"objectOrigin"}).circle(0,0,2).fill(r)),this.#e.addChild(lr(n.aabb,r)),n.renderAabb&&this.#e.addChild(lr(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let o;this.#e.on("pointerenter",()=>{if(o!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(o=new js({text:i,style:{fill:r,fontSize:6,fontFamily:"Menlo"}})),o.resolution=4}),this.#e.on("pointerleave",()=>{o!==void 0&&(this.#e.removeChild(o),o=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class Al{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new b({label:`ItemPositionRenderer ${e.item.id}`,children:[n.container]}),this.#n()}#e;#n(){const e=C(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get container(){return this.#e}}const Dl=(t,e)=>{const n=e.getLocalBounds(),r=mn.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new _e({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},cr=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=p({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof _e?o:Dl(t,o)};class Ml{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=x.getState();n||(this.#e.filters=new Vs({alpha:.5}));const{item:r,pixiRenderer:o}=e,{shadowMask:{spriteOptions:i}}=r;if(i){const{times:s}=r.config,a=cr(o,i,s);r.shadowMask.relativeTo==="top"&&(a.y-=r.aabb.z),s&&(a.y-=((s.z??1)-1)*A.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new b({label:"ItemShadowRenderer"});#n=new b({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:r,pixiRenderer:o,room:i}=this.renderContext,s=e.has(r),a=r.state.position.z+r.aabb.z,l=de(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:r.id,state:{position:{...r.state.position,z:a}},aabb:{...r.aabb,z:ys}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":un(c,d)?f?"update":"create":"noShadow"});for(const d of Qt(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=cr(o,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of Qt(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=C({...Ze(d.state.position,r.state.position),z:r.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of wt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get container(){return this.#e}}const zl=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Ll=(t,e,n)=>{const o=ie().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&ie().textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},ht=t=>F(({renderContext:{item:e}})=>ws(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),F=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:r})=>n===void 0?{container:t({renderContext:e,previousRendering:null,tickContext:r}),renderProps:oe}:"no-update";function*Rl({config:{direction:t,inHiddenWall:e,height:n}},r){const o=kt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${o}`,...mt(a,{y:-12*n})});l.filters=nn(r,o==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...mt(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...mt(a,{y:-l*A.h})})}}yield*s(T({...ne,[o]:1})),yield*s(ne),e||(yield p({pivot:{x:16,y:A.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...T({...ne,[o]:1})}))}const jo=(t,e)=>{const n=kt(t),r=Qe(n),o=8;return t==="towards"||t==="right"?C({[r]:e[r]-o}):ne},Ul=F(({renderContext:{item:t,room:e}})=>Je(Rl(t,e),new b({filters:ee(e),...jo(t.config.direction,t.aabb)}))),El=F(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:r},room:o,gameState:{campaign:i}}})=>{const s=kt(t),a=i.rooms[n];return p({textureId:Ll(o,s,e),filter:ee(a),...jo(t,r)})}),Vt={animationId:"bubbles.cold"},ke=({top:t,bottom:e="homingBot",filter:n})=>{const r=new b({filters:n});r.addChild(p(e));const o=p(t);return o.y=-12,r.addChild(o),r},Go=Symbol(),qo=Symbol(),$l=({top:t,bottom:e})=>{const n=new b;return n.addChild(e),t.y=-12,n.addChild(t),n[Go]=t,n[qo]=e,n},Nl=`#version 300 es

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
`;class ur extends G{constructor(e){const n=U.from({vertex:Ke,fragment:Nl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const Vl=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(Ei(i))return{textureId:i}}const o=`${t}.idle.${n}`;return $i(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},sn=Symbol(),an=Symbol(),Hl=(t,e)=>{t[sn].removeChildren(),t[sn].addChild(p(Vl(e)))},Ht=(t,e)=>{const n=new b,r=new b;n[sn]=r,n.addChild(r);const o=p({animationId:e?`shine.${t}InSymbio`:"shine",filter:t==="heels"?new ve({pastelBlue:g.pink}):he,flipX:t==="heels"});return n[an]=o,n},dr=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+Cs>t,Xl=t=>{if(!Xe(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Pn<Pn*.15},fr=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},hr=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?he:t.filters},jl=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?fr(o,new Oe({outlineColor:Se[t],upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&hr(o,Oe);const s=r?.flashing??!1;n&&!s?fr(o,new ur(Se[t])):!n&&s&&hr(o,ur)},Gl=(t,e,n)=>{e&&!n?t.addChild(t[an]):!e&&n&&t.removeChild(t[an])},Xt=(t,e,n,r,o)=>{n&&Hl(e,{name:t,...r}),jl(t,r,o,e),Gl(e,r.shining,o?.shining??!1)},jt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n},previousRendering:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=e,l=wr(s)??"towards",c=e.type==="headOverHeels"?dr(e.state.head,"headOverHeels","headOverHeels"):dr(e.state,e.type,n.currentCharacterName),u=Xl(e),d=yo(e),f=Pe(s),h=a?.phase??null,m={action:i,facingXy8:l,teleportingPhase:h,flashing:u,highlighted:c,shining:d},v=t===void 0||t.action!==i||t.facingXy8!==l||t.teleportingPhase!==h;let k;if(o==="headOverHeels"){k=r??$l({top:Ht("head",!0),bottom:Ht("heels",!0)});const D=k;Xt("head",D[Go],v,m,t),Xt("heels",D[qo],v,m,t)}else k=r??Ht(o,!1),Xt(o,k,v,m,t);return i==="moving"&&r instanceof We&&(r.animationSpeed=f*Ui),{container:k,renderProps:m}},ql=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new b({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),o=Je(se(wt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new b({label:"floorOverdraws"})),i=Je(se(wt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...T(mt(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[Qe(Ge(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new b({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},Wl=t=>[...se(Q(t.items)).filter(e=>e.type==="wall").filter(e=>Ge(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],Jl=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},Yl=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new H().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),Zl=F(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Bt(t.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:f},roomJson:h}=t,m=new b({label:`floor(${t.id})`});if(d!=="none"){const M=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,_=new b;for(let P=-1;P<=o+2;P++)for(let $=P%2-1;$<=i+2;$+=2)_.addChild(Ts({x:P+(s.right?-.5:0),y:$+(s.towards?-.5:0)},p({textureId:M})));_.addChild(ql(h,{x:n,y:r}));const E=new H().poly([ne,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});_.addChild(E),_.filters=ee(t),_.mask=E,m.addChild(_)}const v=Wl(h),k=new H().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(k);const D=Jl(v);if(D!==void 0){const M=Yl({extraWallRanges:D,blockXMin:n,blockYMin:r});m.addChild(M)}return m.mask=k,m.y=-e.aabb.z,m.cacheAsTexture(!0),m}),Ql=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=T({x:-t,y:-e}),i={towards:new b({label:"towards",...o}),right:new b({label:"right",...o})};return se(wt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...T(f),times:a.type==="wall"?a.config.times:{[Qe(Ge(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(L(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(L(f,{x:-.5}))}))}),i},Kl=F(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Bt(e.roomJson),l=o-n,c=i-r,u=new b({label:"floorEdge"}),d=new H({label:"overDrawToHideFallenItems"}).poly([T({x:l,y:0}),T({x:0,y:0}),T({x:0,y:c}),{...T({x:0,y:c}),y:999},{...T({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=Ql({blockXMin:n,blockYMin:r},e.roomJson);f.filters=nn(e,"towards",t),h.filters=nn(e,"right",t),u.addChild(f),u.addChild(h);const m=new H({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(m),u.mask=m,u.cacheAsTexture(!0),u}),ec=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],tc=({renderContext:{item:{config:t,state:e},room:n},currentlyRenderedProps:r})=>{const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?Qs:o?void 0:ec.includes(t.which)?So(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=cn(e.facing)??"towards";if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:p({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:p({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:p(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?ke({top:{textureId:`${t.which}.${a}`,filter:s||ee(n)},bottom:Vt}):p({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ke({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:p(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:p({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ke({top:Vt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ke({top:"ball",bottom:Vt,filter:s}),renderProps:l};case"emperor":return{container:p({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},pr=t=>Ni(Vi(t)),nc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Gt=g.moss,mr=()=>F(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),rc={head:jt,heels:jt,headOverHeels:jt,doorFrame:El,doorLegs:Ul,monster:tc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:F(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:r}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=Qe(Ge(e)),i=new b({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:zl(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ne.w,y:Ne.h+1}:{x:0,y:Ne.h+1},filter:ee(r)}),l=T({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:F(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:F(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?ee(n):void 0,times:e})),slidingDeadly:mr(),slidingBlock:mr(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:r},currentlyRenderedProps:o}){return o===void 0||o.disappear!==n?{container:p({textureId:nc(r.color.shade==="dimmed",t,n!==null),filter:t==="organic"?ee(r):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const r=e.type==="in-store"?kr(x.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:p(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}}},currentlyRenderedProps:r}){const o=pr(n)>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new b,a=Ge(t);return s.addChild(p(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:F(()=>{const t=new b,e={x:$e.w/2,y:$e.h};return t.addChild(p({animationId:"lift",pivot:e})),t.addChild(p({textureId:"lift.static",pivot:e})),t}),teleporter({renderContext:{item:t,room:e},currentlyRenderedProps:n}){const{state:{stoodOnBy:r},config:{times:o}}=t,i=yn(t),s=i&&Pt(r,e).find(R)!==void 0;return n===void 0||i!==n.activated||s!==n.flashing?{container:s?new b({children:[p({textureId:"teleporter",times:o}),p({animationId:"teleporter.flashing",times:o})]}):p({textureId:i?"teleporter":"block.artificial",times:o}),renderProps:{flashing:s,activated:i}}:"no-update"},pickup:F(({renderContext:{item:{config:t},room:e}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:ee(e)},reincarnation:{animationId:"fish"}}[t.gives];return p(r)}),moveableDeadly:F(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=cn(t)??"towards";return e===void 0||n!==e.facingXy4?{container:ke({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:ht("joystick"),movingPlatform:F(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:F(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new Oe({outlineColor:Gt,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{container:p({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}}},currentlyRenderedProps:n}){const r=pr(t)>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new Oe({outlineColor:Gt,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{container:p(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new Oe({outlineColor:Gt,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{container:t==="headOverHeels"?ke({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:ht("hushPuppy"),bubbles:F(({renderContext:{item:{config:{style:t}}}})=>p({animationId:`bubbles.${t}`})),firedDoughnut:ht({animationId:"bubbles.doughnut"}),ball:ht("ball"),floor:Zl,floorEdge:Kl},oc=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},ic=t=>t.item.shadowMask!==void 0,sc=t=>{const e=x.getState(),n=Hi(e),r=Xi(e),{item:o,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const c=rc[o.type],u=new Pl(t,c);a.push(u),s&&(u.container.alpha=.66),r&&ic(t)&&a.push(new Ml(t))}if(s&&a.push(new Fl(t)),a.length===0)return"not-needed";const l=a.length===1?a[0]:new ac(a,t);return oc(o,l.container,i),new Al(t,l)};class ac{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(r=>r.container))}#e;#n=new b({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get container(){return this.#n}}const ye=.33,lc=ji()==="mobile"?-4:16,ln=Ne.h-Ne.w/2,cc=ue.heels,uc=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=Bt(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-lc-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-ln<0;return(m,v,k)=>{if(m===void 0)return;const D=C(m.state.position),M=L(D,u),_={x:d&&M.x<n.x*ye?Math.min(-a,n.x*ye-D.x):f&&M.x>n.x*(1-ye)?Math.max(n.x-l,n.x*(1-ye)-D.x):u.x,y:h&&M.y<n.y*ye?n.y*ye-D.y:u.y};if(k)e.x=_.x,e.y=_.y;else{const E=cc*v,P=Ze(e,_),$=Sr(P);if($>E){const Mt={x:P.x/$,y:P.y/$};e.x-=Mt.x*E,e.y-=Mt.y*E}else e.x=_.x,e.y=_.y}}},dc=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=Bt(t);return new H().rect(e+r.x,o-ln,n-e,r.y-o+ln).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class fc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:r}}=x.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??_r.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(dc(e.room.roomJson)),this.#i=uc(e.room,this.#t,r.gameEngineScreenSize)}#e=new b({label:"items"});#n=new b({label:"floorEdge"});#t=new b({children:[this.#e,this.#n]});#o=!1;#s=new Map;#r=new Map;#i;initFilters(e,n){this.#e.filters=e?he:new z(bn(n).main.original)}#l(e){const{room:n}=this.renderContext;for(const r of de(n.items)){let o=this.#r.get(r.id);if(o!==void 0){if(o==="not-needed")continue}else{if(o=sc({...this.renderContext,item:r}),o==="not-needed"){this.#r.set(r.id,"not-needed");continue}this.#r.set(r.id,o),(r.type==="floorEdge"?this.#n:this.#e).addChild(o.container),r.fixedZIndex&&(o.container.zIndex=r.fixedZIndex)}o.tick(e)}for(const[r,o]of this.#r.entries())n.items[r]===void 0&&(o!=="not-needed"&&o.destroy(),this.#r.delete(r))}#a(e){const{order:n}=Xo(_l(this.renderContext.room.items,e.movedItems,this.#s),this.renderContext.room.items);for(let r=0;r<n.length;r++){const o=this.#r.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#o?e:{...e,movedItems:new Set(de(this.renderContext.room.items))};this.#i(Ae(this.renderContext.gameState),n.deltaMS,!this.#o),this.#l(n),(!this.#o||n.movedItems.size>0)&&this.#a(n),this.#o=!0}destroy(){this.#t.destroy({children:!0}),this.#r.forEach(e=>{e!=="not-needed"&&e.destroy()})}get container(){return this.#t}}var At=`in vec2 aPosition;
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
`,Dt=`struct GlobalFilterUniforms {
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
}`,hc=`precision highp float;
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
`,pc=`struct CRTUniforms {
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
}`,mc=Object.defineProperty,gc=(t,e,n)=>e in t?mc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,xt=(t,e,n)=>(gc(t,typeof e!="symbol"?e+"":e,n),n);const Wo=class Jo extends G{constructor(e){e={...Jo.DEFAULT_OPTIONS,...e};const n=pe.from({vertex:{source:Dt,entryPoint:"mainVertex"},fragment:{source:pc,entryPoint:"mainFragment"}}),r=U.from({vertex:At,fragment:hc,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),xt(this,"uniforms"),xt(this,"seed"),xt(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};xt(Wo,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let bc=Wo;var vc=`
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
}`,xc=`struct KawaseBlurUniforms {
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
}`,yc=`
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
`,wc=`struct KawaseBlurUniforms {
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
}`,Cc=Object.defineProperty,Tc=(t,e,n)=>e in t?Cc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ae=(t,e,n)=>(Tc(t,typeof e!="symbol"?e+"":e,n),n);const Yo=class Zo extends G{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(je("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Zo.DEFAULT_OPTIONS,...n};const r=pe.from({vertex:{source:Dt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?wc:xc,entryPoint:"mainFragment"}}),o=U.from({vertex:At,fragment:n?.clamp?yc:vc,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ae(this,"uniforms"),ae(this,"_pixelSize",{x:0,y:0}),ae(this,"_clamp"),ae(this,"_kernels",[]),ae(this,"_blur"),ae(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=Te.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),Te.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};ae(Yo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Sc=Yo;var Ic=`in vec2 vTextureCoord;
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
`,kc=`struct AdvancedBloomUniforms {
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
`,Oc=`
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
`,_c=`struct ExtractBrightnessUniforms {
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
`,Pc=Object.defineProperty,Bc=(t,e,n)=>e in t?Pc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Qo=(t,e,n)=>(Bc(t,typeof e!="symbol"?e+"":e,n),n);const Ko=class ei extends G{constructor(e){e={...ei.DEFAULT_OPTIONS,...e};const n=pe.from({vertex:{source:Dt,entryPoint:"mainVertex"},fragment:{source:_c,entryPoint:"mainFragment"}}),r=U.from({vertex:At,fragment:Oc,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Qo(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Qo(Ko,"DEFAULT_OPTIONS",{threshold:.5});let Fc=Ko;var Ac=Object.defineProperty,Dc=(t,e,n)=>e in t?Ac(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ce=(t,e,n)=>(Dc(t,typeof e!="symbol"?e+"":e,n),n);const ti=class ni extends G{constructor(e){e={...ni.DEFAULT_OPTIONS,...e};const n=pe.from({vertex:{source:Dt,entryPoint:"mainVertex"},fragment:{source:kc,entryPoint:"mainFragment"}}),r=U.from({vertex:At,fragment:Ic,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:ce.WHITE}}),Ce(this,"uniforms"),Ce(this,"bloomScale",1),Ce(this,"brightness",1),Ce(this,"_extractFilter"),Ce(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Fc({threshold:e.threshold}),this._blurFilter=new Sc({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=Te.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Te.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),Te.returnTexture(s),Te.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Ce(ti,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Mc=ti;const gr=({crtFilter:t},e)=>[t?new bc({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Mc({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class zc{constructor(e,n){this.app=e,this.#r=e,this.#i=n;try{const r=x.getState(),{gameMenus:{upscale:{gameEngineUpscale:o}}}=r;if(e.stage.addChild(this.#s),e.stage.scale=o,qe(n)===void 0)throw new Error("main loop with no starting room");this.#a()}catch(r){this.#l(r);return}}#e;#n;#t;#o;#s=new b({label:"MainLoop/world"});#r;#i;#l(e){console.error(e),x.dispatch(Gi(qi(e,"message","stack")))}#a(){const{gameMenus:{userSettings:{displaySettings:e}}}=x.getState();this.#e=gr(e,!0),this.#n=gr(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#l(n)}};tick=({deltaMS:e})=>{const n=x.getState(),r=Wi(n),{gameMenus:{userSettings:{displaySettings:o},upscale:i}}=x.getState(),s=qe(this.#i),a=!r&&!(o?.uncolourised??_r.displaySettings.uncolourised),l=Ji(n),c=Yi(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new Za({colourise:a,gameState:this.#i,inputDirectionMode:c,onScreenControls:l}),this.#r.stage.addChild(this.#t.container)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const u=r?Or:wl(this.#i,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==o||this.#o?.renderContext.paused!==r)&&(this.#o?.destroy(),s?(this.#o=new fc({gameState:this.#i,room:s,paused:r,pixiRenderer:this.#r.renderer,displaySettings:o,colourised:a,upscale:i}),this.#s.addChild(this.#o.container),this.#i.events.emit("roomChange",s.id)):this.#o=void 0,this.#r.stage.scale=i.gameEngineUpscale,this.#a()),this.#o?.tick({progression:this.#i.progression,movedItems:u,deltaMS:e}),r?this.#r.stage.filters=this.#e:this.#r.stage.filters=this.#n};start(){return this.#r.ticker.add(this.tickAndCatch),this}stop(){this.#r.stage.removeChild(this.#s),this.#o?.destroy(),this.#t?.destroy(),this.#r.ticker.remove(this.tickAndCatch)}}It.add(Vr,Hr,Xr,jr,Gr,qr,Wr,Jr,Yr,Zr,Qr,eo,Kr,to,no,ro,oo,io,so,ao,lo);Qi.defaultOptions.scaleMode="nearest";const br=async(t,e)=>{const n=new bo;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const r=x.getState().gameMenus.currentGame,o=Ln({campaign:t,inputStateTracker:e,savedGame:r});r!==void 0?x.dispatch(Zi(r.store.gameMenus)):(x.dispatch(Cn(o.characterRooms.head.id)),x.dispatch(Cn(o.characterRooms.heels.id)));const i=new zc(n,o).start();return{campaign:t,events:o.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=Ae(o);a!==void 0&&dn({playableItem:a,gameState:o,toRoomId:s,changeType:"level-select"})},get currentRoom(){return qe(o)},get gameState(){return o},reincarnateFrom(s){Ln({campaign:t,inputStateTracker:e,savedGame:s,writeInto:o})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Nc=Object.freeze(Object.defineProperty({__proto__:null,default:br,gameMain:br},Symbol.toStringTag,{value:"Module"}));export{ho as A,co as C,G as F,mn as R,Ms as S,po as V,Es as a,Nc as g,Ds as u};
