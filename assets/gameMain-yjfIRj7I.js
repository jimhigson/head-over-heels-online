const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-BeTSgdRu.js","assets/App-DSJ8vdGJ.js","assets/index-CoX3zJ24.js","assets/index-MLXqbjEv.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-BCRKXttm.js","assets/Graphics-CakzBOIp.js","assets/swopCharacters-CxrCml1B.js","assets/WebGLRenderer-DOWkea-C.js"])))=>i.map(i=>d[i]);
import{aJ as Vo,H as jo,A as Ho,a9 as fe,aa as E,n as ar,F as le,E as x,f as yt,e as Xo,C as g,d as je,v as ht,ap as y,D as Vt,ah as ke,T as Re,U as Go,V as qo,aK as Wo,aL as Yo,aM as Jo,m as Zo,aN as Qo,aO as J,aP as Ko,aQ as oe,aR as lr,a4 as cr,Z as C,a2 as k,L as _,aS as ei,aT as ti,W as B,aU as _e,aV as ni,aW as ur,aX as xt,aY as ri,aZ as lt,N as U,a_ as oi,a0 as z,a$ as ii,b0 as si,a5 as dr,X as wt,b1 as ai,b2 as qe,b3 as fr,b4 as he,b5 as Ct,p as We,$ as Ye,a6 as Pe,Q as jt,b6 as fn,a1 as ne,b7 as li,b8 as ci,b9 as ui,ba as di,I as hr,bb as Ue,bc as fi,bd as tn,be as hi,bf as pi,O as pr,bg as mi,bh as bi,bi as gi,bj as pt,bk as ct,bl as vi,bm as yi,bn as xi,a as He,bo as mt,bp as wi,bq as Ee,br as Ci,bs as mr,bt as br,bu as Ti,af as xe,bv as _t,bw as Pt,a7 as hn,bx as Si}from"./App-DSJ8vdGJ.js";import{l as Ht,h as bt,j as pn,g as L,p as T,k as pe,m as nn,n as ki,q as Oi,r as Xt,t as gt,u as ut,c as rn,v as H,i as X,w as gr,x as vr,y as ce,z as Tt,A as Ii,B as _i,C as Pi,D as Bi,E as Gt,F as Ai,G as Ze,H as Fi,I as Di,J as zi,a as me,K as yr,L as xr,M as mn,N as wr,f as Li,O as Cr,P as Tr,Q as Mi,b as K,s as ue,R as Bt,S as Qe,T as Ri,U as Ui,V as Ae,W as bn,X as Ei,Y as on,Z as $i,_ as Ni,$ as Vi,a0 as ji,a1 as Hi,a2 as gn,a3 as Sr,e as kr,o as Or,a4 as Xi,a5 as vn,a6 as At,a7 as w,a8 as Gi,a9 as qi,aa as Wi,ab as yn,ac as St,ad as Yi}from"./swopCharacters-CxrCml1B.js";import{S as Ji,G as j}from"./Graphics-CakzBOIp.js";import{g as Zi,_ as xn}from"./index-CoX3zJ24.js";var Ke={},wn;function Qi(){if(wn)return Ke;wn=1;var t=Vo(),e=t.mark(i),n=jo(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,f,p=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=p.length,l=new Array(a),c=0;c<a;c++)l[c]=p[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return f=d[u],v.delegateYield(o(f),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}Ke.__concat=i;var s=r(i);return Ke.concat=s,Ke}var Ft,Cn;function Ki(){return Cn||(Cn=1,Ft=Qi().concat),Ft}var es=Ki();const qt=Zi(es),Ir=class Wt extends Ho{constructor(e){e={...Wt.defaultOptions,...e},super(e),this.enabled=!0,this._state=Ji.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,r,o){e.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:r,...o}=e;let i,s;return n&&(i=fe.from(n)),r&&(s=E.from(r)),new Wt({gpuProgram:i,glProgram:s,...o})}};Ir.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let G=Ir;var ts=`
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
`,ns=`in vec2 aPosition;
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
`,rs=`
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
}`;class S extends G{constructor(e){const n=e.gpu,r=Tn({source:rs,...n}),o=fe.from({vertex:{source:r,entryPoint:"mainVertex"},fragment:{source:r,entryPoint:"mainFragment"}}),i=e.gl,s=Tn({source:ts,...i}),a=E.from({vertex:ns,fragment:s}),l=new ar({uBlend:{value:1,type:"f32"}});super({gpuProgram:o,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:le.EMPTY}})}}function Tn(t){const{source:e,functions:n,main:r}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",r)}const sn=`
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
    `,an=`
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
	`;class _r extends S{constructor(){super({gl:{functions:`
                ${sn}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendColor(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${an}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
                `}})}}_r.extension={name:"color",type:x.BlendMode};class Pr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Pr.extension={name:"color-burn",type:x.BlendMode};class Br extends S{constructor(){super({gl:{functions:`
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
                `}})}}Br.extension={name:"color-dodge",type:x.BlendMode};class Ar extends S{constructor(){super({gl:{functions:`
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
                `}})}}Ar.extension={name:"darken",type:x.BlendMode};class Fr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Fr.extension={name:"difference",type:x.BlendMode};class Dr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Dr.extension={name:"divide",type:x.BlendMode};class zr extends S{constructor(){super({gl:{functions:`
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
            `}})}}zr.extension={name:"exclusion",type:x.BlendMode};class Lr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Lr.extension={name:"hard-light",type:x.BlendMode};class Mr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Mr.extension={name:"hard-mix",type:x.BlendMode};class Rr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Rr.extension={name:"lighten",type:x.BlendMode};class Ur extends S{constructor(){super({gl:{functions:`
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
                `}})}}Ur.extension={name:"linear-burn",type:x.BlendMode};class Er extends S{constructor(){super({gl:{functions:`
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
            `}})}}Er.extension={name:"linear-dodge",type:x.BlendMode};class $r extends S{constructor(){super({gl:{functions:`
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
            `}})}}$r.extension={name:"linear-light",type:x.BlendMode};class Nr extends S{constructor(){super({gl:{functions:`
                ${sn}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                finalColor = vec4(blendLuminosity(back.rgb, front.rgb,front.a), blendedAlpha) * uBlend;
                `},gpu:{functions:`
                ${an}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Nr.extension={name:"luminosity",type:x.BlendMode};class Vr extends S{constructor(){super({gl:{functions:`
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
            `}})}}Vr.extension={name:"negation",type:x.BlendMode};class jr extends S{constructor(){super({gl:{functions:`
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
                `}})}}jr.extension={name:"overlay",type:x.BlendMode};class Hr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Hr.extension={name:"pin-light",type:x.BlendMode};class Xr extends S{constructor(){super({gl:{functions:`
                ${sn}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                finalColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * uBlend;
            `},gpu:{functions:`
                ${an}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendedAlpha) * blendUniforms.uBlend;
            `}})}}Xr.extension={name:"saturation",type:x.BlendMode};class Gr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Gr.extension={name:"soft-light",type:x.BlendMode};class qr extends S{constructor(){super({gl:{functions:`
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
                `}})}}qr.extension={name:"subtract",type:x.BlendMode};class Wr extends S{constructor(){super({gl:{functions:`
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
                `}})}}Wr.extension={name:"vivid-light",type:x.BlendMode};const Yt=[];yt.handleByNamedList(x.Environment,Yt);async function os(t){if(!t)for(let e=0;e<Yt.length;e++){const n=Yt[e];if(n.value.test()){await n.value.load();return}}}let Fe;function is(){if(typeof Fe=="boolean")return Fe;try{Fe=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Fe=!1}return Fe}var Yr=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Yr||{});class ss{constructor(e){this.items=[],this._name=e}emit(e,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,r,o,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const as=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Jr=class Zr extends Xo{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...as,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await os(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)e={...this._systemsHash[r].constructor.defaultOptions,...e};e={...Zr.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(e);this._initOptions=e}render(e,n){let r=e;if(r instanceof g&&(r={container:r},n&&(je(ht,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor??(r.clearColor=this.background.colorRgba),r.clear??(r.clear=this.background.clearBeforeRender)),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:y.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(e,n,r){const o=this.view.resolution;this.view.resize(e,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Yr.ALL);const{clear:r,clearColor:o,target:i}=e;y.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,y.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ss(n)})}_addSystems(e){let n;for(n in e){const r=e[n];this._addSystem(r.value,r.name)}}_addSystem(e,n){const r=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(e,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});e.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!is())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Jr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Qr=Jr,et;function ls(t){return et!==void 0||(et=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Qr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!Vt.get().getWebGLRenderingContext())return!1;let r=Vt.get().createCanvas().getContext("webgl",e);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),et}let tt;async function cs(t={}){return tt!==void 0||(tt=await(async()=>{const e=Vt.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),tt}const Sn=["webgl","webgpu","canvas"];async function us(t){let e=[];t.preference?(e.push(t.preference),Sn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Sn.slice();let n,r={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await cs()){const{WebGPURenderer:a}=await xn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-BeTSgdRu.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgpu};break}else if(s==="webgl"&&ls(t.failIfMajorPerformanceCaveat??Qr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await xn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-DOWkea-C.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,r={...t,...t.webgl};break}else if(s==="canvas")throw r={...t},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Kr="8.8.1";class eo{static init(){globalThis.__PIXI_APP_INIT__?.(this,Kr)}static destroy(){}}eo.extension=x.Application;class ds{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Kr)}destroy(){this._renderer=null}}ds.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"initHook",priority:-10};const to=class Jt{constructor(...e){this.stage=new g,e[0]!==void 0&&je(ht,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await us(e),Jt._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return je(ht,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const r=Jt._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};to._plugins=[];let no=to;yt.handleByList(x.Application,no._plugins);yt.add(eo);var fs=`in vec2 aPosition;
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
`,hs=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,kn=`struct GlobalFilterUniforms {
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
}`;const ro=class oo extends G{constructor(e){e={...oo.defaultOptions,...e};const n=fe.from({vertex:{source:kn,entryPoint:"mainVertex"},fragment:{source:kn,entryPoint:"mainFragment"}}),r=E.from({vertex:fs,fragment:hs,name:"alpha-filter"}),{alpha:o,...i}=e,s=new ar({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};ro.defaultOptions={alpha:1};let ps=ro;class Xe extends ke{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:r=1,autoPlay:o=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[p]=u;super({...f,texture:p instanceof le?p:p.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=r,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,o&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Re.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Re.shared.add(this.update,this,Go.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let r=0;r<e.length;++r)n.push(le.from(e[r]));return new Xe(n)}static fromImages(e){const n=[];for(let r=0;r<e.length;++r)n.push(le.from(e[r]));return new Xe(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof le)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Re.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Re.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ms extends qo{constructor(e,n){const{text:r,resolution:o,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=r??"",this.style=i,this.resolution=o??null,this.allowChildren=!1,this._anchor=new Wo({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,r=this.bounds.height,o=-n*this.anchor.x;let i=0;return e.x>=o&&e.x<=o+n&&(i=-r*this.anchor.y,e.y>=i&&e.y<=i+r)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function bs(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(je(ht,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class gs extends ms{constructor(...e){const n=bs(e,"Text");super(n,Yo),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,r=Jo.measureText(this._text,this._style),{width:o,height:i}=r;e.minX=-n._x*o,e.maxX=e.minX+o,e.minY=-n._y*i,e.maxY=e.minY+i}}class ln extends le{static create(e){return new ln({source:new Zo(e)})}resize(e,n,r){return this.source.resize(e,n,r),this}}function vs(t){return{all:t=t||new Map,on:function(e,n){var r=t.get(e);r?r.push(n):t.set(e,[n])},off:function(e,n){var r=t.get(e);r&&(n?r.splice(r.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var r=t.get(e);r&&r.slice().map(function(o){o(n)}),(r=t.get("*"))&&r.slice().map(function(o){o(e,n)})}}}const ys=t=>{const e={};for(const n of Object.values(t.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;e[o]=n.id}if(e.head===void 0&&e.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return e},xs=({campaign:t,inputStateTracker:e})=>{const n=ys(t),r=Qo(Object.keys(t.rooms).map(s=>[s,{}])),o=n.head&&Ht(t.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&Ht(t.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:bt(o.items.head),heels:i===void 0?void 0:bt(i.items.heels)},inputStateTracker:e,campaign:t,events:vs(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},b={pureBlack:new y("#000000"),shadow:new y("#325149"),midGrey:new y("#7F7773"),lightGrey:new y("#BBB1AB"),white:new y("#FBFEFB"),pastelBlue:new y("#75ACFF"),metallicBlue:new y("#366CAA"),pink:new y("#D68ED1"),moss:new y("#9E9600"),redShadow:new y("#805E50"),midRed:new y("#CA7463"),lightBeige:new y("#DAA78F"),highlightBeige:new y("#EBC690"),alpha:new y("#1E7790"),replaceLight:new y("#08A086"),replaceDark:new y("#0A4730")},de=t=>{const[e,n,r]=t.toUint8RgbArray();return new y({r:e/2,g:n/2,b:r/2})},N={original:new y(J.zxWhite),basic:b.white,dimmed:b.lightGrey},V={original:new y(J.zxYellow),basic:b.midRed,dimmed:b.redShadow},q={original:new y(J.zxMagenta),basic:b.pink,dimmed:de(b.pink)},O={original:new y(J.zxCyan),basic:b.pastelBlue,dimmed:de(b.pastelBlue)},W={original:new y(J.zxGreen),basic:b.moss,dimmed:de(b.moss)},cn={white:{basic:{main:N,edges:{towards:O,right:V},hud:{lives:V,dimmed:q,icons:O}},dimmed:{main:N,edges:{towards:W,right:O},hud:{lives:V,dimmed:q,icons:O}}},yellow:{basic:{main:V,edges:{towards:W,right:N},hud:{lives:O,dimmed:q,icons:W}},dimmed:{main:V,edges:{towards:O,right:O},hud:{lives:O,dimmed:q,icons:W}}},magenta:{basic:{main:q,edges:{towards:W,right:O},hud:{lives:N,dimmed:O,icons:V}},dimmed:{main:q,edges:{towards:W,right:O},hud:{lives:N,dimmed:O,icons:V}}},cyan:{basic:{main:O,edges:{towards:q,right:N},hud:{lives:N,dimmed:W,icons:V}},dimmed:{main:O,edges:{towards:q,right:N},hud:{lives:N,dimmed:W,icons:V}}},green:{basic:{main:W,edges:{towards:O,right:V},hud:{lives:N,dimmed:q,icons:O}},dimmed:{main:W,edges:{towards:O,right:V},hud:{lives:N,dimmed:q,icons:O}}}},un=t=>cn[t.hue][t.shade],we={head:b.pastelBlue,heels:b.pink},io=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+pn>n?100-Math.ceil((n-e)/(pn/100)):0},so=t=>{const e=100*L.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/L.w):0},Je=`in vec2 aPosition;
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
`,ws=`in vec2 vTextureCoord;
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
`;class Be extends G{constructor(e){const n=Object.keys(e).length,r=E.from({vertex:Je,fragment:ws.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{b[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const Cs=`precision mediump float;
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
`;class R extends G{uniforms;constructor(e="white"){const n=E.from({vertex:Je,fragment:Cs,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,r,o]=new y(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const Ts=`precision mediump float;
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
`;class Ss extends G{constructor(){const e=E.from({vertex:Je,fragment:Ts,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const ao=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),lo=t=>ao(cn[t.color.hue][t.color.shade].main),co=t=>new Be({lightBeige:b.lightGrey,redShadow:b.shadow,pink:b.lightGrey,moss:b.lightGrey,midRed:b.midGrey,highlightBeige:b.lightGrey,...t&&lo(t)}),ks=new Be({midGrey:b.midRed,lightGrey:b.lightBeige,white:b.highlightBeige,metallicBlue:b.redShadow,pink:b.midRed,moss:b.midRed,replaceDark:b.midRed,replaceLight:b.lightBeige}),Os=t=>new Be({replaceLight:t,replaceDark:de(t)}),Zt=(t,e,n)=>n?new Be(ao(cn[t.color.hue][t.color.shade].edges[e])):new R(un(t.color).edges[e].original),te=t=>new Be(lo(t)),On=new Ss,Oe=Ko,In={x:.5,y:1},_n=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),h=t=>{if(typeof t=="string")return h({textureId:t});{const{anchor:e,flipX:n,pivot:r,x:o,y:i,filter:s,times:a,label:l}=t;let c;if(_n(t)?c=Is(t):c=new ke(oe().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new g({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:p}=u;p>=1;p--)for(let m=1;m<=u.z;m++){const v=h({...t,times:void 0,label:`(${f},${p},${m})`}),A=T({x:f-1,y:p-1,z:m-1});v.x+=A.x,v.y+=+A.y,d.addChild(v)}return d}if(e===void 0&&r===void 0)if(_n(t))c.anchor=In;else{const u=oe().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=In}else e!==void 0&&(c.anchor=e),r!==void 0&&(c.pivot=r);return o!==void 0&&(c.x=o),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function Is({animationId:t,reverse:e,playOnce:n}){const o=oe().animations[t].map(s=>({texture:s,time:lr}));e&&o.reverse();const i=new Xe(o);return i.animationSpeed=cr.animations[t].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const _s=`#version 300 es

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
`;class Se extends G{constructor({outlineColor:e,upscale:n,lowRes:r}){const o=E.from({vertex:Je,fragment:_s,name:"outline-filter"});super({glProgram:o,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,r&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const Z=new Se({outlineColor:b.pureBlack,upscale:C.getState().upscale.gameEngineUpscale,lowRes:!0}),$e=new R,Pn=new R,Qt=new R,Bn=new R(b.moss),Ne=new R,Y=[$e,Z],Ps=[Ne,Z],Bs=[Z,Qt],nt={original:[Z,Ne],colourised:{head:{active:[Z,new R(we.head)],inactive:[Z,new R(de(we.head))]},heels:{active:[Z,new R(we.heels)],inactive:[Z,new R(de(we.heels))]}}},be=13,As=2;class Fs{constructor(e,n){this.inputStateTracker=e,this.inputDirectionMode=n,this.arrowSprites={away:h({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:be,y:-13,filter:Y}),right:h({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:be,y:be,filter:Y}),towards:h({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-13,y:be,filter:Y}),left:h({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-13,y:-13,filter:Y}),...n!=="4-way"?{awayRight:h({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:be*Math.SQRT2,filter:Y}),towardsRight:h({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:be*Math.SQRT2,filter:Y}),towardsLeft:h({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-13*Math.SQRT2,filter:Y}),awayLeft:h({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-13*Math.SQRT2,filter:Y})}:{}},this.container.addChild(this.#t),this.container.addChild(new j().circle(0,0,24).fill("#00000000"));for(const r of k(this.arrowSprites))this.container.addChild(r);this.container.on("pointerenter",this.handlePointerEnter),this.container.on("globalpointermove",this.usePointerLocation),this.container.on("pointerup",this.stopCurrentPointer),this.container.on("pointerupoutside",this.stopCurrentPointer)}container=new g({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#t=h({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.inputStateTracker.hudInputState.directionVector=_};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=ei(C.getState()),{x:r,y:o}=this.container,{x:i,y:s}=e,{width:a,height:l}=this.container.getLocalBounds(),c=(i/n-r)/(a/2),u=(s/n-o)/(l/2),d=ti({x:-c,y:-u}),f=B(d,As);this.inputStateTracker.hudInputState.directionVector=f};tick(e){const{directionVector:n}=this.inputStateTracker;if(C.getState().openMenus.length>0){this.stopCurrentPointer();return}const o=_e(n)>ni?ur(n):void 0;for(const[i,s]of xt(this.arrowSprites))s.filters=i===o?Ps:Y;this.#t.filters=e?Oe:$e}destroy(){this.stopCurrentPointer(),this.container.off("pointerenter",this.handlePointerEnter),this.container.off("globalpointermove",this.usePointerLocation),this.container.off("pointerup",this.stopCurrentPointer),this.container.off("pointerupoutside",this.stopCurrentPointer),this.container.destroy()}}const Kt={colourised:{jump:b.pastelBlue,fire:b.highlightBeige,carry:b.moss,carryAndJump:b.midRed,menu:b.lightGrey},zx:{jump:J.zxBlue,fire:J.zxYellow,carry:J.zxGreen,carryAndJump:J.zxRed,menu:J.zxWhite}};function Ge(t,e){const n=e||new g;for(const r of t)n.addChild(r);return n}function*uo(t){const e=typeof t=="string"?t.split(""):Number.isFinite(t)?t.toString().split(""):"",n=e.length;for(let r=0;r<n;r++){const o=`hud.char.${e[r]}`;ri(o),yield h({textureId:o,x:(r+.5-n/2)*lt.w})}}function ve(t,e){return t.removeChildren(),Ge(uo(e),t),t}function Ds(t,e){return t.removeChildren(),Ge(uo(e),t),t}const vt=Symbol(),fo=Symbol(),ho=Symbol(),rt=({colourise:t,button:{which:e}})=>{const n=new g({label:"depress"}),r=new g({label:"arcadeButton"});r.addChild(n);const o=h("button");t?o.filters=Os(Kt.colourised[e]):r.filters=new R(Kt.zx[e]),n.addChild(o);const i=new g({label:"surface"}),s=h({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),r[fo]=o,r[vt]=i,r[ho]=n,r},De=(t,...e)=>{t[vt].removeChildren();for(const n of e)n!==void 0&&t[vt].addChild(n)},ot=(t,e)=>{t[fo].texture=oe().textures[e?"button.pressed":"button"],t[ho].y=e?1:0},An=(t,e,n)=>{n&&(t[vt].filters=e?co():Oe)},Fn=({which:t},e,n)=>{const r=Ds(new g,n);return r.filters=new Be({white:e?de(Kt.colourised[t]):b.pureBlack}),r};class po{constructor(e,n,r){this.subject=e,this.gameState=n,this.appearance=r,this.#n=new g({label:`AppearanceRenderer ${e.id}`})}#t=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({subject:this.subject,currentlyRenderedProps:this.#t,previousRendering:this.#n.children.at(0)??null,renderContext:e,gameState:this.gameState});n!=="no-update"&&(this.#t=n.renderProps,this.#n.children.at(0)!==n.container&&(this.#n.removeChildren(),n.container!==null&&this.#n.addChild(n.container)))}get container(){return this.#n}}const mo=t=>h(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),zs=(t,e,n,r)=>{const o=Math.max(0,Math.min(t.x+e.x,n.x+r.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+r.y)-Math.max(t.y,n.y));return o*i},Dn=({state:{position:t},aabb:e},{state:{position:n},aabb:r})=>zs(t,e,n,r),dn=(t,e,n=.001)=>{if(!pe(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:r}}}}=t;return r>0?!1:nn({state:{position:U(t.state.position,{x:0,y:0,z:-.001})},aabb:{...t.aabb,z:n+oi},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},bo=(t,e)=>{const r=[...z(e).filter(i=>dn(t,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=ki(s,i);return a<0||a===0&&Dn(t,s)>Dn(t,i)?s:i})},Ve=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<Oi};function go({room:{roomTime:t},movingItem:e}){if(e.state.action==="death")return;const n=e.type==="headOverHeels"?e.state.head:e.state;io(n)>0||Ve(e)||(e.state.action="death",e.state.expires=t+Xt)}const vo=t=>{const{gameState:e,movingItem:n,touchedItem:r,room:{id:o}}=t;if(e.pickupsCollected[o][r.id]===!0)return;const i=e.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=ut(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=ut(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=gt(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=ut(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.gameWalkDistance);break}case"jumps":{const s=gt(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":C.dispatch(si(r.config.page));break;case"reincarnation":break;case"crown":{C.dispatch(ii(r.config.planet));break}default:r.config}},Ls=({gameState:t,movingItem:e,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;dr(i,r)<=0||e.state.action!=="death"&&rn({playableItem:e,gameState:t,toRoomId:o,sourceItem:n,changeType:"portal"})},Ms=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=wt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(r==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(r==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Rs({movingItem:t}){t.state.autoWalk=!1}const Q=(t,...e)=>X(...e)(t.touchedItem),ze=(t,...e)=>X(...e)(t.movingItem),yo=t=>H(t.movingItem),Us=t=>H(t.touchedItem),Es=t=>gr(t.touchedItem),zn=t=>{switch(!0){case Q(t,"stopAutowalk"):Rs(t);break;case Es(t):go(t);break;case Q(t,"portal"):Ls(t);break;case Q(t,"pickup"):vo(t);break;case Q(t,"doorFrame"):Ms(t);break}},Ie={movementType:"steady"},xo=150,wo=t=>t[Math.floor(Math.random()*t.length)],re=Object.freeze({movementType:"vel",vels:{walking:_}}),kt=t=>vr(t)?ce[t.config.which]:ce[t.type],Ln=L.w/2,$s=({state:{position:t,vels:{walking:e}}},n,r,o)=>{const i=ce.homingBot;if(!Ct(e,ne))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=qe(l.state.position,t);if(Math.abs(c.y)<Ln)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<Ln)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},Co=(t,e)=>{const{items:{head:n,heels:r,headOverHeels:o}}=e;if(o!==void 0)return Ve(o)?void 0:e.items.headOverHeels;const i=n===void 0||Ve(n)||n.state.action==="death"?void 0:fn(n.state.position,t),s=r===void 0||Ve(r)||r.state.action==="death"?void 0:fn(r.state.position,t);return i===void 0?r:s===void 0||i<s?n:r},Ns=(t,e,n,r)=>{const{state:{position:o,standingOn:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return re;const l=Co(o,e);if(l===void 0||s+xo>e.roomTime)return Ie;const c=qe(l?.state.position,o),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>L.w/4?u:We(u),f=kt(t),p={..._,[d]:c[d]>0?f:-f},m=he(p),v=!Ct(m,a);return{movementType:"vel",vels:{walking:p},stateDelta:{facing:m,...v?{timeOfLastDirectionChange:e.roomTime}:Ye}}},Mn=(t,e,n,r,o=!1)=>{const{state:{position:i,standingOn:s}}=t;if(s===null)return re;const a=Co(i,e);if(a===void 0)return re;const l=a.state.position,c=L.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return re;const d=qe(a?.state.position,i),f=kt(t),p=(1+Math.sqrt(2))/2,m=f*p,v=B({...d,z:0},m/fr(d)*(o?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:he(v)}}},Dt=(t,e,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=t;if(s===null)return re;if(!(Pe(i,_)||Math.random()<r/1e3))return Ie;const l=wo(o);return{movementType:"vel",vels:{walking:B(jt[l],kt(t))},stateDelta:{facing:jt[l]}}},Vs=(t,e,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=t;return s===null?re:Ct(i,ne)?{movementType:"vel",vels:{walking:B(o,kt(t))}}:Ie},js=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const r=wo([-1,1]);return{x:e.x===0?r*t.y:0,y:e.y===0?r*t.x:0,z:0}}}},zt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:r},o)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=r,t.state.durationOfTouch<xo))return;const c=Tt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=js(s,c,o);t.state.vels.walking=u,t.state.facing=he(u),t.state.durationOfTouch=0},Hs=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=_)},Xs=(t,e,n,r)=>{if(!t.state.activated||vr(t)&&t.state.busyLickingDoughnutsOffFace)return re;switch(t.config.movement){case"patrol-randomly-diagonal":return Dt(t,e,n,r,ui);case"patrol-randomly-xy8":return Dt(t,e,n,r,ci);case"patrol-randomly-xy4":return Dt(t,e,n,r,li);case"towards-tripped-on-axis-xy4":return $s(t,e);case"towards-on-shortest-axis-xy4":return Ns(t,e);case"back-forth":case"clockwise":return Vs(t);case"unmoving":case"free":return re;case"towards-when-in-square-xy8":return Mn(t,e);case"towards-when-in-square-xy8-unless-planet-crowns":return Mn(t,e,n,r,ai(C.getState()));default:throw t.config,new Error("this should be unreachable")}},Gs=t=>{const{movingItem:e,touchedItem:n}=t;if(pe(n,e))switch(e.config.movement){case"patrol-randomly-xy4":zt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":zt(t,"opposite");break;case"clockwise":zt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Hs(t);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"towards-when-in-square-xy8-unless-planet-crowns":case"unmoving":case"free":return;default:throw e.config,new Error("this should be unreachable")}},qs=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:{activates:r,store:o},state:{setting:i,touchedOnProgression:s}}=t;if(t.state.touchedOnProgression=e,!(e===s+1||e===s)){if(r){const a=t.state.setting=i==="left"?"right":"left";for(const[l,c]of xt(r)){const u=n.items[l];u!==void 0&&(u.state={...u.state,...c[a]})}}o&&C.dispatch(di(o.path))}},Ws=({movingItem:t,touchedItem:e})=>{if(!pe(t))return;const{state:{position:n},aabb:r}=e,o=Tt(t.state.position,t.aabb,n,r);if(o.x===0&&o.y===0)return;const i=he(o),s=B(i,-.05);return e.state.vels.sliding=s,!1},Ys=({movingItem:t,touchedItem:e})=>{if(!pe(e))return;const n=t.state.vels.sliding;if(Pe(n,_))return;const{state:{position:r},aabb:o}=t,i=Tt(e.state.position,e.aabb,r,o);return dr(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=_),!1},Js=2*Ii,To=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Js,positionDelta:n})},Zs=(t,e,n)=>{for(const r of t){const o=n[r.id];if(o===void 0)continue;const s={...hr(r.state.position,o),z:0};if(!Pe(s,_))for(const a of r.state.stoodOnBy)To(a,e,s)}},Qs=({movingItem:t,room:e,touchedItem:n,deltaMS:r})=>{const{config:{controls:o},state:{position:i},aabb:s}=n,a=Tt(t.state.position,t.aabb,i,s);if(a.x===0&&a.y===0)return;const l=he(a);for(const c of o){const u=e.items[c],d=B(l,-.025*r);u.state.facing=d,To(u,e,d)}},it=t=>{const n=t/Ai*lr;return(t+.5*Gt*n**2)/n},Ks={head:it(Ze.head),headOnSpring:it(Ze.head+L.h),heels:it(Ze.heels),heelsOnSpring:it(Ze.heels+L.h)},ea=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Ks[`${n}${e?"OnSpring":""}`]},ta=t=>!(t===null||Pi(t)||Bi(t)&&t.config.gives==="scroll"||H(t)&&t.state.standingOn===null),So=(t,e)=>{const{state:{standingOn:n}}=t,{inputStateTracker:r}=e,o=r.currentActionPress("jump")!=="released"&&ta(n);if(o&&console.log("starting a jump!"),!o)return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Ie;const i=_i(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:ea(t,i)}},stateDelta:{action:"moving",jumped:!0}}},na=({vel:t,acc:e,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=_e(t),a=Math.max(i,Math.min(r,s+e*o)),l=Math.min(a,r);return B(n,l)},Rn={movementType:"vel",vels:{walking:_}},ko=(t,e,n)=>{const r=ra(t,e,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=_e(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:o===0?0:t.state.walkDistance+o*n},t.type==="head"&&t.state.standingOn!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+o*n})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!Pe(r.vels.walking,_)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},ra=(t,{inputStateTracker:e,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,walkStartFacing:d,vels:{walking:f,gravity:p}}}=t,m=n===t.id,v=m?e.currentActionPress("jump"):"released",A=m?e.directionVector:_,F=a===null&&p.z<0,$=o==="head"&&so(t.state)>0&&a!==null,I=o==="headOverHeels"?F?"head":"heels":$?"heels":o,P=s?l:A,M=ce[I];if(c!==null||i==="death")return Rn;if(o==="heels"){if(a===null)return t.state.jumped?{movementType:"vel",vels:{walking:hr(f,B(f,Fi*r))}}:Rn;if(v!=="released"){const ie=he(Ct(P,ne)?l:P),No=X("spring")(a)?1:Di;return{movementType:"vel",vels:{walking:B({...ie,z:0},M*No)},stateDelta:{facing:ie}}}}if(_e(P)!==0)return F?{movementType:"vel",vels:{walking:B({...P,z:0},M)},stateDelta:{facing:P,action:"falling"}}:{movementType:"vel",vels:{walking:na({vel:f,acc:zi[I],deltaMS:r,maxSpeed:M,unitD:P,minSpeed:0})},stateDelta:{facing:P,action:"moving"}};if(u>0&&u<1){const ie=Pe(d,l)?1:0;return{movementType:"position",posDelta:B(l,ie-u),stateDelta:{action:F?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:_},stateDelta:{action:F?"falling":"idle"}}},Un=t=>me(t.movingItem)&&dn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),Oo=(t,e)=>{let n=_;for(const r of e){if(r.movementType==="position"&&(n=U(n,r.posDelta)),r.movementType==="vel"&&(me(t)||X("lift")(t)))for(const[i,s]of xt(r.vels)){const a={..._,...s};t.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(t.state={...t.state,...o})}return n},En=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&H(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&Un(t)){if(Un(t)&&yo(t)){yr({above:t.movingItem,below:t.touchedItem});const n=[So(t.movingItem,t.gameState),ko(t.movingItem,t.gameState,t.deltaMS)];Oo(t.movingItem,n)}xr(t)}};function oa(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Io=t=>{yo(t)&&zn(t),Us(t)&&zn({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),Q(t,...mn)&&Ws(t),ze(t,...mn)&&Ys(t),(ze(t,"monster")&&Q(t,"firedDoughnut")||ze(t,"firedDoughnut")&&Q(t,"monster"))&&oa(t),(ze(t,"monster")||ze(t,"movableBlock"))&&Gs(t),Q(t,"switch")&&qs(t),Q(t,"joystick")&&Qs(t),t.touchedItem.state.disappear&&En(t),t.movingItem.state.disappear&&pe(t.touchedItem,t.movingItem)&&En({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},ia=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=z(k(e.items)).filter(wr),u=s===null?_o(t,e):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.currentActionPress("carry")==="tap")if(s===null){if(u===void 0){console.warn("nothing to pick up");return}sa(e,i,u)}else{if(t.state.standingOn===null||!Po(t,k(e.items)))return;const d=Li({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Cr({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:d.aabb.z},pusher:t,forceful:!0,deltaMS:r,onTouch:Io}),i.carrying=null}},sa=(t,e,n)=>{const r={type:n.type,config:n.config};e.carrying=r,Tr({room:t,item:n})},_o=(t,e)=>bo(t,z(k(e.items)).filter(wr)),Po=(t,e)=>{const n={position:U(t.state.position,{z:L.h})},r=Mi({id:t.id,aabb:t.aabb,state:n},e);for(const o of r)if(pe(o,t)){if(!me(o))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",o),!1;if(!Po(o,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",o),!1}return!0},Lt=-11,aa={jump({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,a=K(e)?.state.standingOn?.type==="teleporter",l=t.actions.every(u=>i.currentActionPress(u)!=="released"),c=r===null?rt({colourise:o,button:t}):r;if(n?.pressed!==l&&ot(c,l),a!==n?.standingOnTeleporter)if(a)De(c,h({textureId:"teleporter",y:5}),h({animationId:"teleporter.flashing",y:5}));else{const u=Fn(t,o,"JUMP");u.y=Lt,De(c,u)}return{container:c,renderProps:{pressed:l,standingOnTeleporter:a,colourise:o}}},carry({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,s=K(e),a=gt(s),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&_o(s,ue(e))!==void 0,d=t.actions.every(v=>i.currentActionPress(v)!=="released"),f=l&&!u&&c===null,p=r===null?rt({colourise:o,button:t}):r;if(p.visible=l,l&&(f!==n?.disabled&&An(p,f,o),p.visible=!0,n?.pressed!==d&&ot(p,d),l!==n?.hasBag||c!==n?.carrying)){let v;c!==null?v=mo(c):l&&(v=h({textureId:"bag",y:-2})),De(p,v)}return{container:p,renderProps:{pressed:d,hasBag:l,colourise:o,carrying:c,disabled:f}}},fire({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,s=K(e),a=ut(s),l=a?.hasHooter??!1,c=a?.doughnuts??0,u=t.actions.every(p=>i.currentActionPress(p)!=="released"),d=r===null?rt({colourise:o,button:t}):r,f=l||c>0;if(d.visible=f,f&&(n?.pressed!==u&&ot(d,u),l!==n?.hasHooter||c!==n?.doughnuts)){let p;l?p=h({textureId:"hooter",y:-3}):c>0&&(p=h({textureId:"doughnuts",y:-2}));const m=ve(new g,c);m.y=Lt,m.filters=Z,De(d,p,m),An(d,c===0,o)}return{container:d,renderProps:{pressed:u,colourise:o,doughnuts:c,hasHooter:l}}},carryAndJump({subject:t,gameState:e,currentlyRenderedProps:n,previousRendering:r,renderContext:{colourise:o}}){const{inputStateTracker:i}=e,s=K(e),l=gt(s)?.hasBag??!1,c=t.actions.every(f=>i.currentActionPress(f)!=="released");if(!(n===void 0||c!==n.pressed||o!==n.colourise||l!==n.hasBag))return"no-update";let d;if(r===null){d=rt({colourise:o,button:t});const f=Fn(t,o,"C+J");f.y=Lt,De(d,f)}else d=r;return l?(d.visible=!0,n?.pressed!==c&&ot(d,c)):d.visible=!1,{container:d,renderProps:{pressed:c,hasBag:l,colourise:o}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=h("hud.char.Menu");return e.scale=2,e.filters=Y,{container:e,renderProps:Ye}}};class Le extends po{constructor(e,n){super(e,n,aa[e.which]),this.button=e}}const la=26,ca=13;class ua{constructor(e,n,r){this.gameState=e,this.colourise=n,this.inputDirectionMode=r,this.#n={mainButtonNest:new g({label:"mainButtonNest"}),buttons:{jump:new Le({which:"jump",actions:["jump"],id:"jump"},e),fire:new Le({which:"fire",actions:["fire"],id:"fire"},e),carry:new Le({which:"carry",actions:["carry"],id:"carry"},e),carryAndJump:new Le({which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},e),menu:new Le({which:"menu",actions:["menu_openOrExit"],id:"menu"},e)},joystick:new Fs(e.inputStateTracker,r)};const{buttons:o}=this.#n,{mainButtonNest:i,joystick:s}=this.#n;for(const a of k(o))a.button.which==="menu"?this.#t.addChild(o.menu.container):i.addChild(a.container);o.jump.container.y=ca,o.carry.container.x=-26,o.carryAndJump.container.y=-13,o.fire.container.x=la,o.menu.container.x=24,o.menu.container.y=24,this.#t.addChild(i),this.#t.addChild(s.container),this.#e()}#t=new g({label:"OnScreenControls"});#n;#e(){const{gameState:{inputStateTracker:e}}=this;for(const n of k(this.#n.buttons)){const{button:{actions:r}}=n;n.container.eventMode="static",n.container.on("pointerdown",()=>{for(const o of r)e.hudInputState[o]=!0}),n.container.on("pointerup",()=>{for(const o of r)e.hudInputState[o]=!1}),n.container.on("pointerleave",()=>{for(const o of r)e.hudInputState[o]=!1})}}#r(e){this.#n.mainButtonNest.x=e.x-40,this.#n.mainButtonNest.y=e.y-14,this.#n.joystick.container.x=32,this.#n.joystick.container.y=e.y-28}tick({screenSize:e}){this.#r(e);for(const n of k(this.#n.buttons))n.tick({colourise:this.colourise});this.#n.joystick.tick(this.colourise)}get container(){return this.#t}destroy(){this.#t.destroy(),this.#n.joystick.destroy()}}cr.frames.button.frame;const da=250,fa=t=>t?12:24,ha=t=>t?32:56,pa=t=>t?40:80,ma=t=>t?18:24,$n=112,Me=t=>t==="heels"?1:-1;class Nn{constructor(e,n,r,o){this.gameState=e,this.onScreenControls=n,this.colourise=r,this.inputDirectionMode=o;for(const i of Bt)this.#t.addChild(this.#e[i].livesText),this.#t.addChild(this.#e[i].sprite),this.#t.addChild(this.#e[i].shield.container),this.#t.addChild(this.#e[i].extraSkill.container);n||(this.#t.addChild(this.#e.head.doughnuts.container),this.#t.addChild(this.#e.head.hooter.container),this.#t.addChild(this.#e.heels.bag.container),this.#t.addChild(this.#e.heels.carrying.container)),this.#t.addChild(this.#e.fps),this.#e.fps.filters=[Bn],this.#e.fps.y=lt.h,this.#r(),n&&(this.#n=new ua(e,this.colourise,o),this.#t.addChild(this.#n.container))}#t=new g({label:"HudRenderer"});#n=void 0;#e={head:{sprite:this.#o("head"),livesText:this.#i({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#s({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#s({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#o("heels"),livesText:this.#i({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#s({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#s({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#s({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new g({label:"heelsCarrying"})}},fps:this.#i({label:"fps",outline:!0})};#r(){const{inputStateTracker:{hudInputState:e}}=this.gameState;for(const n of Bt){const{sprite:r}=this.#e[n];r.eventMode="static",r.on("pointerdown",()=>{e[`swop.${n}`]=!0}),r.on("pointerup",()=>{e[`swop.${n}`]=!1}),r.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#s({textureId:e,textOnTop:n=!1,noText:r=!1,outline:o=!1,label:i}){const s=new g({label:i});s.pivot={x:4,y:16};const a=new ke({texture:oe().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:Pn,y:n?0:8});s.addChild(a);const l=this.#i({outline:o==="text-only"});return l.y=n?0:16,l.x=a.x=lt.w/2,s.addChild(l),r&&(l.visible=!1),o===!0&&(s.filters=Z),{text:l,icon:a,container:s}}#o(e){const n=new ke(oe().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#i({doubleHeight:e=!1,outline:n=!1,label:r="text"}={}){return new g({label:r,filters:n?Bs:Qt,scale:{x:1,y:e?2:1}})}#l(e){this.#e.head.hooter.container.x=this.#e.head.doughnuts.container.x=(e.x>>1)+Me("head")*$n,this.#e.head.doughnuts.container.y=e.y-Ue.h-8,this.#e.heels.carrying.container.y=e.y-Ue.h,this.#e.heels.carrying.container.x=this.#e.heels.bag.container.x=(e.x>>1)+Me("heels")*$n,this.#e.heels.bag.container.y=this.#e.head.hooter.container.y=e.y-8,this.#e.fps.x=e.x-lt.w*2}#c(e,n){return e?n?Oe:Ne:n?On:$e}#a(e){const n=Qe(e,"heels"),r=n?.hasBag??!1,o=n?.carrying??null,{container:i}=this.#e.heels.carrying,s=i.children.length>0;if(o===null&&s)for(const a of i.children)a.destroy();o!==null&&!s&&i.addChild(mo(o)),i.filters=this.#c(!0,this.colourise),this.#e.heels.bag.icon.filters=this.#c(r,this.colourise)}#d(e){const n=Qe(e,"head"),r=n?.hasHooter??!1,o=n?.doughnuts??0;this.#e.head.hooter.icon.filters=this.#c(r,this.colourise),this.#e.head.doughnuts.icon.filters=this.#c(o!==0,this.colourise),ve(this.#e.head.doughnuts.text,o)}#f(e,n,r){const o=Qe(e,r),{text:i,container:s}=this.#e[r].shield,{text:a,container:l}=this.#e[r].extraSkill,c=io(o),u=c>0||!this.onScreenControls;s.visible=u,u&&(ve(i,c),s.y=n.y),l.x=s.x=(n.x>>1)+Me(r)*pa(this.onScreenControls);const d=o===void 0?0:r==="head"?so(o):o.bigJumps,f=d>0||!this.onScreenControls;l.visible=f,f&&(ve(a,d),l.y=n.y-ma(this.onScreenControls))}#u(e,n){const{currentCharacterName:r}=e;return r===n||r==="headOverHeels"}#h(e,n,r){const o=this.#u(e,r),i=this.#e[r].sprite;o?i.filters=this.colourise?Oe:Ne:i.filters=this.colourise?On:$e,i.x=(n.x>>1)+Me(r)*ha(this.onScreenControls),i.y=n.y-Ue.h}#p(e,n,r){const i=Qe(e,r)?.lives??0,s=this.#e[r].livesText;s.x=(n.x>>1)+Me(r)*fa(this.onScreenControls),s.y=n.y,ve(s,i??0)}#b(e){const n=ue(e);if(n===void 0)return;const r=un(n.color);$e.targetColor=r.hud.dimmed[this.colourise?"dimmed":"original"],Qt.targetColor=r.hud.dimmed[this.colourise?"basic":"original"],Pn.targetColor=r.hud.icons[this.colourise?"basic":"original"],Ne.targetColor=r.hud.lives.original,this.#e.head.livesText.filters=this.colourise?nt.colourised.head[this.#u(e,"head")?"active":"inactive"]:nt.original,this.#e.heels.livesText.filters=this.colourise?nt.colourised.heels[this.#u(e,"heels")?"active":"inactive"]:nt.original}#m=Number.NEGATIVE_INFINITY;#g(){if(fi(C.getState())){if(performance.now()>this.#m+da){const e=Re.shared.FPS;ve(this.#e.fps,Math.round(e)),Bn.targetColor=e>100?b.white:e>58?b.moss:e>55?b.pastelBlue:e>50?b.metallicBlue:e>40?b.pink:b.midRed,this.#m=performance.now()}this.#e.fps.visible=!0}else this.#e.fps.visible=!1}tick(e){const{gameState:n,screenSize:r}=e;this.#b(n);for(const o of Bt)this.#p(n,r,o),this.#h(n,r,o),this.#f(n,r,o);this.#l(r),this.#d(n),this.#a(n),this.#g(),this.#n?.tick(e)}get container(){return this.#t}destroy(){this.#t.destroy(),this.#n?.destroy()}}const Vn={movementType:"vel",vels:{gravity:_}},ba=(t,e,n)=>{if(!pe(t))return Vn;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=t,a=Ri[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?X("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Gt*n,-a)}}}:Vn:{movementType:"vel",vels:{gravity:{z:Math.max(o-Gt*n,-a)}}}},jn=L.h,Hn=.001,ga=({totalDistance:t,currentAltitude:e,direction:n})=>{const r=bn**2/(2*Ae);if(n==="up"){if(e<=r)return Math.max(Hn,Math.sqrt(2*Ae*Math.max(e,0)));if(e>=t-r){const o=Math.max(0,t-e);return Math.max(Hn,Math.sqrt(2*Ae*o))}else return bn}else if(e>=t-r){const o=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Ae*o))}else return e<=r?Math.min(-.001,-Math.sqrt(2*Ae*Math.max(e,0))):-.036},va={movementType:"vel",vels:{lift:{x:0,y:0,z:0}}};function ya({config:{bottom:t,top:e},state:{direction:n,position:{z:r},stoodOnBy:o}},i,s){if(z(o).some(f=>Ui(f)&&f.config.style==="stepStool"))return va;const l=t*jn,c=e*jn,u=ga({currentAltitude:r-l,direction:n,totalDistance:c-l});if(Number.isNaN(u))throw new Error("velocity is NaN");const d=r<=l?"up":r>=c?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:u}},stateDelta:{direction:d}}}function xa(t,e,n){const{state:{teleporting:r,standingOn:o}}=t,{inputStateTracker:i}=e,s=i.currentActionPress("jump");if(r===null)return s!=="released"&&o!==null&&X("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:Xt}}}:Ie;const a=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(a===0)return rn({changeType:"teleport",sourceItem:o,playableItem:t,gameState:e,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:Xt}}};break;case"in":if(a===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:a}}}}const Xn={movementType:"vel",vels:{movingFloor:_}},wa=(t,e,n)=>{if(H(t)&&t.state.teleporting!==null)return Xn;const{state:{standingOn:r}}=t;if(r===null||!X("conveyor")(r))return Xn;const{config:{direction:o}}=r,s=X("heels")(t)&&t.state.action==="moving"&&tn(t.state.facing)===hi(o)?ce.heels:Ei;return{movementType:"vel",vels:{movingFloor:B(jt[o],s)}}};function*Ca(t,e,n,r){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:o}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Ta=L.w*Math.sqrt(2)+1,Sa=(t,e,n,r)=>{const{inputStateTracker:o}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,p=he(d);if(o.currentActionPress("fire")==="tap"&&a&&s>0&&l+f<c){const m={type:"firedDoughnut",...$i,config:Ye,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,B(p,Ta),t.type==="headOverHeels"?{z:L.h}:_),vels:{fired:B(p,ce.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};on({room:e,item:m}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime}},ka=2;function*Oa(t,e,n,r){me(t)&&(yield ba(t,n,r),yield wa(t),yield*Ca(t,e)),H(t)&&(yield ko(t,n,r),t.id===n.currentCharacterName&&(yield xa(t,n,r),yield So(t,n),Ni(t)&&ia(t,e,n,r),Vi(t)&&Sa(t,e,n))),ji(t)&&(yield ya(t)),Hi(t)&&(yield Xs(t,e,n,r))}const Ia=(t,e,n,r)=>{!me(t)||t.state.standingOn===null||(H(t)&&(t.state.standingOn.type==="movableBlock"&&t.state.standingOn.config.movement!=="free"&&t.state.standingOn.config.activated==="onStand"&&(t.state.standingOn.state.activated=!0),t.state.standingOn.type==="pickup"&&vo({gameState:n,movingItem:t,touchedItem:t.state.standingOn,room:e})),(t.state.standingOn.state.disappear==="onStand"||t.state.standingOn.state.disappear==="onTouch"||H(t)&&t.state.standingOn.state.disappear==="onTouchByPlayer")&&xr({touchedItem:t.state.standingOn,gameState:n,room:e}))},_a=(t,e,n,r)=>{H(t)&&t.state.standingOn!==null&&gr(t.state.standingOn)&&go({room:e,movingItem:t,touchedItem:t.state.standingOn});const o=[...Oa(t,e,n,r)];Ia(t,e,n);let i=Oo(t,o);(me(t)||X("lift")(t)||X("firedDoughnut")(t))&&(i=U(i,...z(k(t.state.vels)).map(l=>B(l,r))));const s=Math.ceil(_e(i)/ka),a=B(i,1/s);for(let l=0;l<s;l++)Cr({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:r,onTouch:Io})},Pa=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives--,e.state.heels.lives--,e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,e.state.head.lives+e.state.heels.lives===0){t.events.emit("gameOver");return}const o=e.state.head.lives>0,i=e.state.heels.lives>0;if(e.state.heels.carrying=null,o&&!i||!o&&i){const c=o?"head":"heels";t.currentCharacterName=c,ae(t,e);const u=gn(e)[c],d=Ce({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:bt(u)};return}if(t.entryState.headOverHeels!==void 0){ae(t,e);const c=Ce({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=gn(e);if(ae(t,c),ae(t,u),nn(c,u)){const d=Sr({head:c,heels:u});ae(t,d,"heels");const f=Ce({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:bt(d)};return}else{const d=Ce({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Ce=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:r}=t,o=Ht(r.rooms[n],t.pickupsCollected[n]);for(const i of e)on({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Xi(o,t);return o},ae=(t,e,n=e.id)=>{const r=t.entryState[n];e.state={...e.state,...r,expires:null,standingOn:null}},Ba=(t,e)=>{const n=kr(t,Or(e.type));if(e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const r=t.characterRooms[e.type];ae(t,e);const o=n===void 0?void 0:t.characterRooms[n.type];if(r===o){if(t.entryState.headOverHeels!==void 0){const a=Sr({head:e.id==="head"?e:r.items.head,heels:e.id==="heels"?e:r.items.heels});ae(t,a);const l=Ce({gameState:t,playableItems:[a],roomId:r.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}on({room:r,item:e});return}else{const s=Ce({gameState:t,playableItems:[e],roomId:r.id});t.characterRooms[e.id]=s;return}}},Aa=(t,e)=>{e.type==="headOverHeels"?Pa(t,e):Ba(t,e),K(t)===void 0&&C.dispatch(pi())},Fa=t=>{for(const e of k(t.items))for(const n of e.state.stoodOnBy){if(!t.items[n.id]){vn(n);continue}if(!dn(n,e)){vn(n);const r=bo(n,k(t.items));r!==void 0&&yr({above:n,below:r})}}},Da=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,za=(t,e,n)=>{for(const r of k(t.items))!me(r)||t.roomTime===r.state.actedOnAt||mi(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=bi(r.state.position),n.add(r))},La=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[t.type]??0,o=n[e.type]??0;return r-o},Ma=Ye,Ra=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let r=0;r<t.gameSpeed;r++){const o=Gn(t,e),i=ue(t)?.items??Ma;n=new Set(z(qt(n,o)).filter(({id:s})=>i[s]!==void 0))}return n}return Gn(t,e*t.gameSpeed)},Gn=(t,e)=>{const{inputStateTracker:n}=t,r=ue(t);if(r===void 0)return pr;const o=Object.fromEntries(z(xt(r.items)).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&At(t),n.currentActionPress("swop.head")==="tap"&&At(t,"head"),n.currentActionPress("swop.heels")==="tap"&&At(t,"heels");for(const a of k(r.items))Da(a,r)&&(Tr({room:r,item:a}),H(a)&&Aa(t,a));const i=Object.values(r.items).sort(La);for(const a of i){const l=K(t);if(l===void 0||l.state.action==="death")break;r.items[a.id]!==void 0&&_a(a,r,t,e)}Fa(r);const s=new Set(z(k(r.items)).filter(a=>o[a.id]===void 0||!Pe(a.state.position,o[a.id])));return Zs(s,r,o),za(r,o,s),Ua(t,r,e),s},Ua=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const r=K(t);if(r!==void 0){if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=kr(t,Or(r.type));i!==void 0&&(i.state.gameTime+=n)}}},qn=(t,e)=>{const n=w(t),r=w(U(t,{x:e.x,z:e.z})),o=w(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:r,topRight:o}},Mt=(t,e,n,r,o=1e-5)=>r-o>t&&n<e-o,Ea=(t,e,n,r)=>{const o=qn(t,e),i=qn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Mt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,f=o.bottomCentre.y-o.bottomCentre.x/2,p=i.topRight.y-i.topRight.x/2,m=i.bottomCentre.y-i.bottomCentre.x/2,v=Mt(d,f,p,m),A=o.topLeft.y+o.topLeft.x/2,F=o.bottomCentre.y+o.bottomCentre.x/2,$=i.topLeft.y+i.topLeft.x/2,I=i.bottomCentre.y+i.bottomCentre.x/2,P=Mt(A,F,$,I);return u&&v&&P},$a=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,r=t.renderAabb||t.aabb,o=e.state.position,i=e.renderAabb||e.aabb;if(!Ea(n,r,o,i))return 0;for(const s of gi){const a=t.state.position[s],l=a+r[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return Wn(e)-Wn(t)},Wn=t=>t.state.position.x+t.state.position.y-t.state.position.z;class dt extends Error{constructor(e,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,r),this.cyclicDependency=e,this.hasClosedCycle=n}}const Na=t=>{const e=Va(t);let n=e.length,r=n;const o=new Array(n),i={},s=ja(e);for(;r--;)i[r]||a(e[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new dt([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const p=f[--c];try{a(p,s.get(p),u)}catch(m){throw m instanceof dt?m.hasClosedCycle?m:new dt([l,...m.cyclicDependency],m.cyclicDependency.includes(l)):m}}while(c);u.delete(l)}o[--n]=l}};function Va(t){const e=new Set;for(const[n,r]of t.entries()){e.add(n);for(const o of r)e.add(o)}return Array.from(e)}function ja(t){const e=new Map;for(let n=0,r=t.length;n<r;n++)e.set(t[n],n);return e}const Yn=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},st=(t,e,n)=>{const r=t.get(e);r!==void 0&&(r?.delete(n),r.size===0&&t.delete(e))},Ha=(t,e=new Set(k(t)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!t[o])n.delete(o);else for(const s of i)t[s]||st(n,o,s);for(const o of e)if(o.renders)for(const i of k(t)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=$a(o,i);if(Yn(r,o,i),s===0){st(n,o.id,i.id),st(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;Yn(n,a,l),st(n,l,a)}return n},Bo=(t,e,n=3)=>{try{return{order:Na(t),impossible:!1}}catch(r){if(r instanceof dt){const o=r.cyclicDependency;return t.get(o[0])?.delete(o[1]),console.warn("cyclc dependency detected: ",o.join(" --front-of--> "),`breaking link ${o[0]} --front-of--> ${o[1]}`),{order:Bo(t,e,n-1).order,impossible:!0}}else throw r}};class Xa extends po{}const Jn=(t,e)=>{e.poly([w({}),w({x:t.x}),w({x:t.x,y:t.y}),w({y:t.y})]).poly([w({}),w({z:t.z}),w({y:t.y,z:t.z}),w({y:t.y})]).poly([w({x:t.x}),w({x:t.x,z:t.z}),w(t),w({x:t.x,y:t.y})]).poly([w({z:t.z}),w({x:t.x,z:t.z}),w({x:t.x,y:t.y,z:t.z}),w({y:t.y,z:t.z})])},Zn=(t,e)=>{const n=new j;return Jn(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Jn(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Ga={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class qa{#t;constructor(e){const n=Ga[e.type]??"rgba(255,255,255)";if(this.#t=new g({label:`ItemBoundingBoxRenderer ${e.id}`}),X("portal")(e)){const o=w(e.config.relativePoint);this.#t.addChild(new j().circle(o.x,o.y,5).stroke(n)),this.#t.addChild(new j().circle(o.x,o.y,2).fill(n))}this.#t.addChild(new j({label:"objectOrigin"}).circle(0,0,2).fill(n)),this.#t.addChild(Zn(e.aabb,n)),e.renderAabb&&this.#t.addChild(Zn(e.renderAabb,"rgba(184, 184, 255)")),this.#t.eventMode="static";let r;this.#t.on("pointerenter",()=>{if(r!==void 0)return;const o=`${e.id} ${e.type}
@(${e.state.position.x}, ${e.state.position.y}, ${e.state.position.z})}
#(${e.aabb.x}, ${e.aabb.y}, ${e.aabb.z})}`;this.#t.addChild(r=new gs({text:o,style:{fill:n,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#t.on("pointerleave",()=>{r!==void 0&&(this.#t.removeChild(r),r=void 0)})}tick(e){}destroy(){this.#t.destroy({children:!0})}get container(){return this.#t}}class Wa{#t;#n;#e;constructor(e,n){this.#n=new g({label:`ItemPositionRenderer ${e.id}`,children:[n.container]}),this.#e=n,this.#t=e,this.#r()}#r(){const e=w(this.#t.state.position);this.#n.x=e.x,this.#n.y=e.y}tick(e){this.#e?.tick(e),e.movedItems.has(this.#t)&&this.#r()}destroy(){this.#n.destroy({children:!0}),this.#e?.destroy()}get container(){return this.#n}}const Ya=(t,e)=>{const n=e.getLocalBounds(),r=ln.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:r}),new ke({texture:r,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},Qn=(t,e,n)=>{const r=n&&{x:n.x??1,y:n.y??1},o=h({...typeof e=="string"?{textureId:e}:e,times:r});return o instanceof ke?o:Ya(t,o)};class Ja{constructor(e,n,r){this.item=e,this.room=n,this.pixiRenderer=r;const{userSettings:{displaySettings:{showShadowMasks:o}}}=C.getState();o||(this.#t.filters=new ps({alpha:.5}));const{shadowMask:{spriteOptions:i}}=e;if(i){const{times:s}=e.config,a=Qn(r,i,s);e.shadowMask.relativeTo==="top"&&(a.y-=e.aabb.z),s&&(a.y-=((s.z??1)-1)*L.h),this.#t.addChild(a),o||(this.#t.mask=a)}this.#t.addChild(this.#n)}#t=new g({label:"ItemShadowRenderer"});#n=new g({label:"shadows"});#e={};destroy(){this.#t.destroy(!0)}tick({movedItems:e,progression:n}){const r=e.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=z(k(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:Gi}},a=Object.groupBy(i,l=>{const c=this.#e[l.id]!==void 0,u=e.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":nn(s,l)?c?"update":"create":"noShadow"});for(const l of qt(a.keepUnchanged,a.update))this.#e[l.id].renderedOnProgression=n;if(a.create)for(const l of a.create){const{times:c}=l.config,u=Qn(this.pixiRenderer,l.shadowCastTexture,c);u.label=l.id,this.#n.addChild(u),this.#e[l.id]={sprite:u,renderedOnProgression:n}}for(const l of qt(a.create,a.update)){const{sprite:c}=this.#e[l.id],u=w({...qe(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of pt(this.#e))u!==n&&(c.destroy(),delete this.#e[l]);this.#t.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#t}}const Za=(t,e,n,r)=>`${t}${r?".dark":""}.wall.${e}.${n}`,Qa=(t,e,n)=>{const o=oe().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&oe().textures[`door.frame.${o}.dark.${e}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${e}.${n}`},at=t=>D(({subject:e})=>qi(e)?h({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):h(t)),D=t=>({subject:e,currentlyRenderedProps:n,gameState:r,renderContext:o})=>n===void 0?{container:t({subject:e,gameState:r,previousRendering:null,renderContext:o}),renderProps:Ye}:"no-update";function*Ka({config:{direction:t,inHiddenWall:e,height:n}},r){const o=wt(t),i=o==="y"?1:16;function*s(a){if(e){if(n!==0){const l=h({textureId:`generic.door.floatingThreshold.${o}`,...ct(a,{y:-12*n})});l.filters=Zt(r,o==="x"?"towards":"right",!0),yield l}}else{yield h({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...ct(a,{})});for(let l=1;l<n;l++)yield h({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...ct(a,{y:-l*L.h})})}}yield*s(T({...ne,[o]:1})),yield*s(ne),e||(yield h({pivot:{x:16,y:L.h*n+13},textureId:`generic.door.legs.threshold.double.${o}`,...T({...ne,[o]:1})}))}const Ao=(t,e)=>{const n=wt(t),r=We(n),o=8;return t==="towards"||t==="right"?w({[r]:e[r]-o}):ne},el=D(({subject:t,renderContext:{room:e}})=>Ge(Ka(t,e),new g({filters:te(e),...Ao(t.config.direction,t.aabb)}))),tl=D(({subject:{config:{direction:t,part:e},aabb:n},renderContext:{room:r}})=>{const o=wt(t);return h({textureId:Qa(r,o,e),filter:te(r),...Ao(t,n)})}),Rt={animationId:"bubbles.cold"},Te=({top:t,bottom:e="homingBot",filter:n})=>{const r=new g({filters:n});r.addChild(h(e));const o=h(t);return o.y=-12,r.addChild(o),r},nl=({top:t,bottom:e})=>{const n=new g;return n.addChild(e),t.y=-12,n.addChild(t),n},rl=`#version 300 es

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
`;class Kn extends G{constructor(e){const n=E.from({vertex:Je,fragment:rl,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const r=this.resources.colorReplaceUniforms.uniforms,[o,i,s]=e.toArray();r.uColour[0]=o,r.uColour[1]=i,r.uColour[2]=s}}const Ut=({name:t,action:e,facingXy8:n,teleportingPhase:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`};if(r==="out")return{animationId:`${t}.fadeOut`};if(r==="in")return{animationId:`${t}.fadeOut`};if(e==="moving")return{animationId:`${t}.walking.${n}`};if(e==="falling"){const i=`${t}.falling.${n}`;if(yi(i))return{textureId:i}}const o=`${t}.idle.${n}`;return xi(o)?{animationId:o}:{textureId:`${t}.walking.${n}.2`}},er=({gameTime:t,switchedToAt:e},n,r)=>(n==="headOverHeels"||n===r)&&e+Wi>t,ol=t=>{if(!Ve(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%yn<yn*.15},tr=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},nr=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?Oe:t.filters},Et=(t,{highlighted:e,flashing:n},r,o)=>{const i=r?.highlighted??!1;e&&!i?tr(o,new Se({outlineColor:we[t],upscale:C.getState().upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&nr(o,Se);const s=r?.flashing??!1;n&&!s?tr(o,new Kn(we[t])):!n&&s&&nr(o,Kn)},$t=({subject:t,currentlyRenderedProps:e,previousRendering:n,gameState:r})=>{const{type:o,state:{action:i,facing:s,teleporting:a}}=t,l=ur(s)??"towards",c=t.type==="headOverHeels"?er(t.state.head,"headOverHeels","headOverHeels"):er(t.state,t.type,r.currentCharacterName),u=ol(t),d=_e(s),f=a?.phase??null,p={action:i,facingXy8:l,teleportingPhase:f,flashing:u,highlighted:c},m=e===void 0||e.action!==i||e.facingXy8!==l||e.teleportingPhase!==f,v=m?o==="headOverHeels"?nl({top:h(Ut({name:"head",...p})),bottom:h(Ut({name:"heels",...p}))}):h(Ut({name:o,...p})):n;return o==="headOverHeels"?(Et("head",p,m?void 0:e,v.getChildAt(1)),Et("heels",p,m?void 0:e,v.getChildAt(0))):Et(o,p,m?void 0:e,v),i==="moving"&&n instanceof Xe&&(n.animationSpeed=d*vi),{container:v,renderProps:p}},il=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",r=new g({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),o=Ge(z(pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>h({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new g({label:"floorOverdraws"})),i=Ge(z(pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?h({textureId:"floorOverdraw.behindDoor",label:s,...T(ct(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):h({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[We(He(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new g({label:"doorOverdraws"}));return r.addChild(o),r.addChild(i),r},sl=t=>[...z(k(t.items)).filter(e=>e.type==="wall").filter(e=>He(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],al=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:r,times:o},position:{x:i,y:s}}=n;r==="left"||r==="right"?(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],s),e[r][1]=Math.max(e[r][1],s+(o?.y??1)-1)):(r==="towards"||r==="away")&&(e[r]||(e[r]=[1/0,-1/0]),e[r][0]=Math.min(e[r][0],i),e[r][1]=Math.max(e[r][1],i+(o?.x??1)-1))}return e},ll=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new j().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),cl=D(({subject:t,renderContext:{room:e}})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=St(e.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:f},roomJson:p}=e,m=new g({label:`floor(${e.id})`});if(d!=="none"){const $=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,I=new g;for(let M=-1;M<=o+2;M++)for(let ee=M%2-1;ee<=i+2;ee+=2)I.addChild(Yi({x:M+(s.right?-.5:0),y:ee+(s.towards?-.5:0)},h({textureId:$})));I.addChild(il(p,{x:n,y:r}));const P=new j().poly([ne,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});I.addChild(P),I.filters=te(e),I.mask=P,m.addChild(I)}const v=sl(p),A=new j().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);m.addChild(A);const F=al(v);if(F!==void 0){const $=ll({extraWallRanges:F,blockXMin:n,blockYMin:r});m.addChild($)}return m.mask=A,m.y=-t.aabb.z,m.cacheAsTexture(!0),m}),ul=({blockXMin:t,blockYMin:e},n)=>{const r=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",o=T({x:-t,y:-e}),i={towards:new g({label:"towards",...o}),right:new g({label:"right",...o})};return z(pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(r).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},p=h({label:s,textureId:`floorEdge.${l}`,...T(f),times:a.type==="wall"?a.config.times:{[We(He(l))]:2}});i[l].addChild(p),l==="right"&&c.y===0&&e<0&&i[l].addChild(h({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(h({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(f,{x:-.5}))}))}),i},dl=D(({renderContext:{displaySettings:t,onHold:e,room:n}})=>{const{blockXMin:r,blockYMin:o,blockXMax:i,blockYMax:s,edgeLeftX:a,edgeRightX:l}=St(n.roomJson),c=i-r,u=s-o,d=new g({label:"floorEdge"}),f=new j({label:"overDrawToHideFallenItems"}).poly([T({x:c,y:0}),T({x:0,y:0}),T({x:0,y:u}),{...T({x:0,y:u}),y:999},{...T({x:c,y:0}),y:999}],!0).fill(0);f.y=8,d.addChild(f);const{towards:p,right:m}=ul({blockXMin:r,blockYMin:o},n.roomJson),v=!e&&!(t.uncolourised??mt.displaySettings.uncolourised);p.filters=Zt(n,"towards",v),m.filters=Zt(n,"right",v),d.addChild(p),d.addChild(m);const A=new j({label:"floorMaskCutOffLeftAndRight"}).poly([{x:a,y:999},{x:a,y:-999},{x:l,y:-999},{x:l,y:999}],!0).fill(16776960);return d.addChild(A),d.mask=A,d.cacheAsTexture(!0),d}),fl=({subject:{config:t,state:e},currentlyRenderedProps:n,renderContext:{room:r}})=>{const{activated:o,busyLickingDoughnutsOffFace:i}=e,s=i?ks:o?void 0:co(r);switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=tn(e.facing)??"towards";if(!(n===void 0||o!==n.activated||i!==n.busyLickingDoughnutsOffFace||a!==n.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"skiHead":return{container:h({textureId:`${t.which}.${t.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:h({textureId:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:h(o&&!i?{animationId:`${t.which}.${a}`,filter:s}:{textureId:`${t.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:e.activated||e.busyLickingDoughnutsOffFace?Te({top:{textureId:`${t.which}.${a}`,filter:s||te(r)},bottom:Rt}):h({textureId:`${t.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:Te({top:`${t.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(n===void 0||i!==n.busyLickingDoughnutsOffFace||o!==n.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(t.which){case"helicopterBug":case"dalek":return{container:h(o&&!i?{animationId:t.which,filter:s}:{textureId:`${t.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:h({textureId:t.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:Te({top:Rt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:Te({top:"ball",bottom:Rt,filter:s}),renderProps:l};case"emperor":return{container:h({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},hl=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,Nt=b.moss,rr=()=>D(({subject:{config:{style:t}}})=>h(t==="book"?"book.y":t)),pl={head:$t,heels:$t,headOverHeels:$t,doorFrame:tl,doorLegs:el,monster:fl,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:D(({subject:{id:t,config:{direction:e,tiles:n}},renderContext:{room:r}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const o=We(He(e)),i=new g({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=h({textureId:Za(r.planet,n[s],e,r.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Ee.w,y:Ee.h+1}:{x:0,y:Ee.h+1},filter:te(r)}),l=T({[o]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:D(({subject:{config:{axis:t,times:e}}})=>h({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({subject:{config:{style:t,times:e}},renderContext:{room:n}})=>h({textureId:t,filter:t==="volcano"?te(n):void 0,times:e})),slidingDeadly:rr(),slidingBlock:rr(),block({subject:{config:{style:t,times:e},state:{disappear:n}},currentlyRenderedProps:r,renderContext:{room:o}}){return r===void 0||r.disappear!==n?{container:h({textureId:hl(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?te(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({subject:{state:{setting:t},config:{store:e}},currentlyRenderedProps:n}){const r=e?wi(C.getState(),e.path)?"right":"left":t;return n===void 0||r!==n.setting?{container:h(`switch.${r}`),renderProps:{setting:r}}:"no-update"},conveyor({subject:{config:{direction:t,times:e},state:{stoodOnBy:n}},currentlyRenderedProps:r}){const o=n.size>0;if(!(r===void 0||r.moving!==o))return"no-update";const s=new g,a=He(t);return s.addChild(h(o?{animationId:`conveyor.${a}`,reverse:t==="towards"||t==="right",times:e}:{textureId:`conveyor.${a}.6`,times:e})),{container:s,renderProps:{moving:o}}},lift:D(()=>{const t=new g,e={x:Ue.w/2,y:Ue.h};return t.addChild(h({animationId:"lift",pivot:e})),t.addChild(h({textureId:"lift.static",pivot:e})),t}),teleporter({subject:{state:{stoodOnBy:t}},currentlyRenderedProps:e}){const n=z(t).find(H)!==void 0;return e===void 0||n!==e.flashing?{container:n?new g({children:[h("teleporter"),h({animationId:"teleporter.flashing"})]}):h("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:D(({subject:{config:t},renderContext:{room:e}})=>{if(t.gives==="crown")return h({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:te(e)},reincarnation:{animationId:"fish"}}[t.gives];return h(r)}),moveableDeadly:D(({subject:{config:{style:t}}})=>h(t==="deadFish"?"fish.1":"puck.deadly")),charles({subject:{state:{facing:t}},currentlyRenderedProps:e}){const n=tn(t)??"towards";return e===void 0||n!==e.facingXy4?{container:Te({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:at("joystick"),movableBlock:D(({subject:{config:{style:t}}})=>h(t)),portableBlock({subject:{config:{style:t},state:{wouldPickUpNext:e}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const o=e?new Se({outlineColor:Nt,lowRes:!1,upscale:C.getState().upscale.gameEngineUpscale}):void 0;return{container:h({textureId:t,filter:o}),renderProps:{highlighted:e}}},spring({subject:{state:{stoodOnBy:t,wouldPickUpNext:e}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||e!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=e?new Se({outlineColor:Nt,lowRes:!1,upscale:C.getState().upscale.gameEngineUpscale}):void 0;return{container:h(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{textureId:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:e}}},sceneryPlayer({subject:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new Se({outlineColor:Nt,upscale:C.getState().upscale.gameEngineUpscale,lowRes:!1}):void 0;return{container:t==="headOverHeels"?Te({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):h({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:at("hushPuppy"),bubbles:D(({subject:{config:{style:t}}})=>h({animationId:`bubbles.${t}`})),firedDoughnut:at({animationId:"bubbles.doughnut"}),ball:at("ball"),floor:cl,floorEdge:dl},ml=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},bl=t=>t.shadowMask!==void 0,gl=({item:t,room:e,gameState:n,pixiRenderer:r})=>{const o=C.getState(),i=Ci(o),s=mr(o),a=br(o),l=i==="all"||i==="non-wall"&&t.type!=="wall",c=[];if(t.renders){const d=pl[t.type],f=new Xa(t,n,d);c.push(f),l&&(f.container.alpha=.66),!a&&s&&bl(t)&&c.push(new Ja(t,e,r))}if(l&&c.push(new qa(t)),c.length===0)return"not-needed";const u=c.length===1?c[0]:new vl(c);return ml(t,u.container,n),new Wa(t,u)};class vl{#t;#n=new g({label:"CompositeRenderer"});constructor(e){this.#t=e,this.#n.addChild(...e.map(n=>n.container))}tick(e){for(const n of this.#t)n.tick(e)}destroy(){for(const e of this.#t)e.destroy()}get container(){return this.#n}}const ge=.33,yl=Ti()==="mobile"?-4:16,en=Ee.h-Ee.w/2,xl=ce.heels,wl=(t,e,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=St(t.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-yl-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,p=u.y+s-en<0;return(m,v,A)=>{if(m===void 0)return;const F=w(m.state.position),$=U(F,u),I={x:d&&$.x<n.x*ge?Math.min(-a,n.x*ge-F.x):f&&$.x>n.x*(1-ge)?Math.max(n.x-l,n.x*(1-ge)-F.x):u.x,y:p&&$.y<n.y*ge?n.y*ge-F.y:u.y};if(A)e.x=I.x,e.y=I.y;else{const P=xl*v,M=qe(e,I),ee=fr(M);if(ee>P){const ie={x:M.x/ee,y:M.y/ee};e.x-=ie.x*P,e.y-=ie.y*P}else e.x=I.x,e.y=I.y}}},Cl=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:r,topEdgeY:o}=St(t);return new j().rect(e+r.x,o-en,n-e,r.y-o+en).stroke("red").rect(e+r.x,o,n-e,r.y-o).stroke("blue")};class or{#t=new g({label:"items"});#n=new g({label:"floorEdge"});#e=new g({children:[this.#t,this.#n]});#r=!1;#s=new Map;#o=new Map;#i;#l;#c;#a;#d;#f;#u;constructor({gameState:e,roomState:n,paused:r,pixiRenderer:o}){const{userSettings:{displaySettings:i},upscale:s}=C.getState();this.#l=i,this.#c=s,this.#a=n,this.#d=e,this.#f=r,this.#u=o,this.#e.label=`RoomRenderer(${n.id})`;const a=!(i?.uncolourised??mt.displaySettings.uncolourised);this.initFilters(!r&&a,n.color),(i?.showBoundingBoxes??mt.displaySettings.showBoundingBoxes)!=="none"&&this.#e.addChild(Cl(n.roomJson)),this.#i=wl(n,this.#e,s.gameEngineScreenSize)}initFilters(e,n){this.#t.filters=e?Oe:new R(un(n).main.original)}#h(e){for(const n of k(this.#a.items)){let r=this.#o.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=gl({item:n,room:this.#a,gameState:this.#d,pixiRenderer:this.#u}),r==="not-needed"){this.#o.set(n.id,"not-needed");continue}this.#o.set(n.id,r),(n.type==="floorEdge"?this.#n:this.#t).addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(e)}for(const[n,r]of this.#o.entries())this.#a.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#o.delete(n))}#p(e){const{order:n}=Bo(Ha(this.#a.items,e.movedItems,this.#s),this.#a.items);for(let r=0;r<n.length;r++){const o=this.#o.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(e){const n=this.#r?e:{...e,movedItems:new Set(k(this.#a.items))};this.#i(K(this.#d),n.deltaMS,!this.#r);const r={...n,room:this.#a};this.#h(r),(!this.#r||n.movedItems.size>0)&&this.#p(r),this.#r=!0}destroy(){this.#e.destroy({children:!0}),this.#o.forEach(e=>{e!=="not-needed"&&e.destroy()})}get displaySettings(){return this.#l}get upscale(){return this.#c}get everRendered(){return this.#r}get container(){return this.#e}get roomState(){return this.#a}get paused(){return this.#f}}var Ot=`in vec2 aPosition;
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
`,It=`struct GlobalFilterUniforms {
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
}`,Tl=`precision highp float;
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
`,Sl=`struct CRTUniforms {
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
}`,kl=Object.defineProperty,Ol=(t,e,n)=>e in t?kl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ft=(t,e,n)=>(Ol(t,typeof e!="symbol"?e+"":e,n),n);const Fo=class Do extends G{constructor(e){e={...Do.DEFAULT_OPTIONS,...e};const n=fe.from({vertex:{source:It,entryPoint:"mainVertex"},fragment:{source:Sl,entryPoint:"mainFragment"}}),r=E.from({vertex:Ot,fragment:Tl,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ft(this,"uniforms"),ft(this,"seed"),ft(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};ft(Fo,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Il=Fo;var _l=`
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
}`,Pl=`struct KawaseBlurUniforms {
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
}`,Bl=`
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
`,Al=`struct KawaseBlurUniforms {
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
}`,Fl=Object.defineProperty,Dl=(t,e,n)=>e in t?Fl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,se=(t,e,n)=>(Dl(t,typeof e!="symbol"?e+"":e,n),n);const zo=class Lo extends G{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(je("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...Lo.DEFAULT_OPTIONS,...n};const r=fe.from({vertex:{source:It,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Al:Pl,entryPoint:"mainFragment"}}),o=E.from({vertex:Ot,fragment:n?.clamp?Bl:_l,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),se(this,"uniforms"),se(this,"_pixelSize",{x:0,y:0}),se(this,"_clamp"),se(this,"_kernels",[]),se(this,"_blur"),se(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,r,o);else{const l=xe.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let p=0;p<f;p++)a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,r,o),xe.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,r=[e];if(e>0){let o=e;const i=e/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};se(zo,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let zl=zo;var Ll=`in vec2 vTextureCoord;
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
`,Ml=`struct AdvancedBloomUniforms {
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
`,Rl=`
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
`,Ul=`struct ExtractBrightnessUniforms {
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
`,El=Object.defineProperty,$l=(t,e,n)=>e in t?El(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Mo=(t,e,n)=>($l(t,typeof e!="symbol"?e+"":e,n),n);const Ro=class Uo extends G{constructor(e){e={...Uo.DEFAULT_OPTIONS,...e};const n=fe.from({vertex:{source:It,entryPoint:"mainVertex"},fragment:{source:Ul,entryPoint:"mainFragment"}}),r=E.from({vertex:Ot,fragment:Rl,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),Mo(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};Mo(Ro,"DEFAULT_OPTIONS",{threshold:.5});let Nl=Ro;var Vl=Object.defineProperty,jl=(t,e,n)=>e in t?Vl(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ye=(t,e,n)=>(jl(t,typeof e!="symbol"?e+"":e,n),n);const Eo=class $o extends G{constructor(e){e={...$o.DEFAULT_OPTIONS,...e};const n=fe.from({vertex:{source:It,entryPoint:"mainVertex"},fragment:{source:Ml,entryPoint:"mainFragment"}}),r=E.from({vertex:Ot,fragment:Ll,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:le.WHITE}}),ye(this,"uniforms"),ye(this,"bloomScale",1),ye(this,"brightness",1),ye(this,"_extractFilter"),ye(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new Nl({threshold:e.threshold}),this._blurFilter=new zl({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,r,o){const i=xe.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=xe.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,r,o),xe.returnTexture(s),xe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};ye(Eo,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Hl=Eo;const ir=({crtFilter:t},e)=>[t?new Il({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new Hl({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class Xl{constructor(e,n){this.app=e,this.#o=e,this.#i=n;const r=C.getState(),{upscale:{gameEngineUpscale:o}}=r;e.stage.addChild(this.#s),e.stage.scale=o;const i=ue(n);if(i===void 0)throw new Error("main loop with no starting room");this.#r=new or({gameState:n,roomState:i,paused:!1,pixiRenderer:e.renderer}),this.#s.addChild(this.#r.container),this.#e=new Nn(n,_t(r),mr(r),Pt(r)),e.stage.addChild(this.#e.container),this.#l()}#t;#n;#e;#r;#s=new g({label:"MainLoop/world"});#o;#i;#l(){const{userSettings:{displaySettings:e}}=C.getState();this.#t=ir(e,!0),this.#n=ir(e,!1)}tick=({deltaMS:e})=>{const n=C.getState(),r=br(n),{userSettings:{displaySettings:o},upscale:i}=C.getState(),s=!r&&!(o?.uncolourised??mt.displaySettings.uncolourised);(this.#e.colourise!==s||this.#e.onScreenControls!==_t(n)||this.#e.inputDirectionMode!==Pt(n))&&(this.#e.destroy(),this.#e=new Nn(this.#i,_t(n),s,Pt(n)),this.#o.stage.addChild(this.#e.container)),this.#e.tick({gameState:this.#i,screenSize:i.gameEngineScreenSize});const a=r?pr:Ra(this.#i,e),l=ue(this.#i);(this.#r?.roomState!==l||this.#r?.upscale!==i||this.#r?.displaySettings!==o||this.#r?.paused!==r)&&(this.#r?.destroy(),l?(this.#r=new or({gameState:this.#i,roomState:l,paused:r,pixiRenderer:this.#o.renderer}),this.#s.addChild(this.#r.container),this.#i.events.emit("roomChange",l.id)):this.#r=void 0,this.#o.stage.scale=i.gameEngineUpscale,this.#l()),this.#r?.tick({progression:this.#i.progression,movedItems:a,deltaMS:e,displaySettings:o,onHold:!1}),r?this.#o.stage.filters=this.#t:this.#o.stage.filters=this.#n};start(){return this.#o.ticker.add(this.tick),this}stop(){this.#o.stage.removeChild(this.#s),this.#r?.destroy(),this.#e.destroy(),this.#o.ticker.remove(this.tick)}}yt.add(_r,Pr,Br,Ar,Fr,Dr,zr,Lr,Mr,Rr,Ur,$r,Er,Nr,Vr,jr,Hr,Xr,Gr,qr,Wr);Si.defaultOptions.scaleMode="nearest";const sr=async(t,e)=>{const n=new no;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const r=xs({campaign:t,inputStateTracker:e});C.dispatch(hn(r.characterRooms.head.id)),C.dispatch(hn(r.characterRooms.heels.id));const o=new Xl(n,r).start();return{campaign:t,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){const s=K(r);s!==void 0&&rn({playableItem:s,gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return ue(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},Zl=Object.freeze(Object.defineProperty({__proto__:null,default:sr,gameMain:sr},Symbol.toStringTag,{value:"Module"}));export{Qr as A,Yr as C,G as F,ln as R,ss as S,Kr as V,ds as a,Zl as g,is as u};
