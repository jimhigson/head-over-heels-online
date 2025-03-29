const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-DxyYYyQW.js","assets/App-CZuotTku.js","assets/index-Buu2lBH6.js","assets/index-dG3WBgIR.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-Cv6HjV-f.js","assets/Graphics-CUe49GiD.js","assets/swopCharacters-Bh4ZDx6z.js","assets/WebGLRenderer-CgDokW4V.js"])))=>i.map(i=>d[i]);
import{aO as Ci,a8 as Eo,I as Si,L as ge,N as $,t as Uo,J as fe,E as C,g as At,f as Ti,C as g,d as We,v as _t,a6 as w,D as on,_ as Ae,T as je,U as ki,V as Ii,aP as Oi,aQ as _i,aR as Pi,q as Bi,aS as lt,ae,aT as Fi,aU as Q,aj as $o,aV as le,aW as No,ar as jo,al as x,o as ee,ac as O,aX as Ai,aY as Mi,aZ as Di,ag as A,a_ as Me,a$ as zi,b0 as Vo,b1 as Xo,b2 as Li,b3 as Ct,ad as U,b4 as Ri,i as ne,b5 as Ei,b6 as Ui,b7 as $i,b8 as Ni,as as Ho,ah as Mt,b9 as Dn,ba as ji,bb as ot,bc as Go,bd as be,be as Dt,p as rt,at as ve,af as rn,an as ie,bf as Vi,bg as Xi,bh as Hi,bi as Gi,bj as yn,a9 as qo,bk as Ve,ai as qi,bl as Wi,bm as xn,bn as Ji,bo as Yi,bp as Wo,bq as Zi,br as Qi,bs as Ki,bt as es,ao as Pt,bu as St,bv as ts,bw as ns,bx as os,b as Je,by as Xe,bz as y,bA as Te,aq as zn,bB as rs,bC as is,bD as ss,bE as Jo,Y as Oe,bF as as,av as ls,bG as cs,bH as us,bI as ds,bJ as fs,au as Ln,bK as hs}from"./App-CZuotTku.js";import{r as ps,l as sn,j as Bt,g as Rn,k as En,h as z,p as T,m as ye,n as wn,q as ms,t as gs,u as an,v as Ye,w as Tt,c as Cn,x as L,i as G,y as Yo,z as Zo,A as Qo,B as he,C as zt,D as Sn,E as De,F as bs,G as vs,H as ys,I as ln,J as xs,K as ct,L as ws,M as Cs,N as Ss,a as xe,O as Ko,P as er,Q as Un,R as ce,S as tr,T as nr,f as Ts,U as or,V as ks,b as ze,W as Nt,X as ut,Y as Is,Z as Le,_ as $n,$ as Os,a0 as Tn,a1 as _s,a2 as it,a3 as Ps,a4 as Bs,a5 as Fs,a6 as As,a7 as Nn,a8 as rr,e as ir,o as sr,a9 as Ms,aa as jn,ab as Ds,s as Ze,ac as zs,ad as jt,ae as S,af as Ls,ag as Rs,ah as Es,ai as Vn,aj as Lt,ak as Us,al as $s,am as Vt,an as Xn}from"./swopCharacters-Bh4ZDx6z.js";import{S as Ns,G as H}from"./Graphics-CUe49GiD.js";import{g as ar,_ as Hn}from"./index-Buu2lBH6.js";var dt={},Gn;function js(){if(Gn)return dt;Gn=1;var t=Ci(),e=t.mark(i),n=Eo(),o=n.wrapWithIterableIterator,r=n.ensureIterable;function i(){var a,l,c,u,d,f,h=arguments;return t.wrap(function(v){for(;;)switch(v.prev=v.next){case 0:for(a=h.length,l=new Array(a),c=0;c<a;c++)l[c]=h[c];u=0,d=l;case 2:if(!(u<d.length)){v.next=8;break}return f=d[u],v.delegateYield(r(f),"t0",5);case 5:u++,v.next=2;break;case 8:case"end":return v.stop()}},e)}dt.__concat=i;var s=o(i);return dt.concat=s,dt}var ft={},qn;function Vs(){if(qn)return ft;qn=1;var t=Eo(),e=t.iterableCurry,n=ps(),o=n.__firstOr,r=Symbol("none");function i(a){return o(a,r)===r}ft.__isEmpty=i;var s=e(i,{reduces:!0});return ft.isEmpty=s,ft}var Xt,Wn;function Xs(){return Wn||(Wn=1,Xt=js().concat),Xt}var Hs=Xs();const cn=ar(Hs);var Ht,Jn;function Gs(){return Jn||(Jn=1,Ht=Vs().isEmpty),Ht}var qs=Gs();const Ws=ar(qs),lr=class un extends Si{constructor(e){e={...un.defaultOptions,...e},super(e),this.enabled=!0,this._state=Ns.for2d(),this.blendMode=e.blendMode,this.padding=e.padding,typeof e.antialias=="boolean"?this.antialias=e.antialias?"on":"off":this.antialias=e.antialias,this.resolution=e.resolution,this.blendRequired=e.blendRequired,this.clipToViewport=e.clipToViewport,this.addResource("uTexture",0,1)}apply(e,n,o,r){e.applyFilter(this,n,o,r)}get blendMode(){return this._state.blendMode}set blendMode(e){this._state.blendMode=e}static from(e){const{gpu:n,gl:o,...r}=e;let i,s;return n&&(i=ge.from(n)),o&&(s=$.from(o)),new un({gpuProgram:i,glProgram:s,...r})}};lr.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let W=lr;var Js=`
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
`,Ys=`in vec2 aPosition;
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
`,Zs=`
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
}`;class k extends W{constructor(e){const n=e.gpu,o=Yn({source:Zs,...n}),r=ge.from({vertex:{source:o,entryPoint:"mainVertex"},fragment:{source:o,entryPoint:"mainFragment"}}),i=e.gl,s=Yn({source:Js,...i}),a=$.from({vertex:Ys,fragment:s}),l=new Uo({uBlend:{value:1,type:"f32"}});super({gpuProgram:r,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,uBackTexture:fe.EMPTY}})}}function Yn(t){const{source:e,functions:n,main:o}=t;return e.replace("{FUNCTIONS}",n).replace("{MAIN}",o)}const kn=`
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
	`;class cr extends k{constructor(){super({gl:{functions:`
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
                `}})}}cr.extension={name:"color",type:C.BlendMode};class ur extends k{constructor(){super({gl:{functions:`
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
            `}})}}ur.extension={name:"color-burn",type:C.BlendMode};class dr extends k{constructor(){super({gl:{functions:`
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
                `}})}}dr.extension={name:"color-dodge",type:C.BlendMode};class fr extends k{constructor(){super({gl:{functions:`
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
                `}})}}fr.extension={name:"darken",type:C.BlendMode};class hr extends k{constructor(){super({gl:{functions:`
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
            `}})}}hr.extension={name:"difference",type:C.BlendMode};class pr extends k{constructor(){super({gl:{functions:`
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
            `}})}}pr.extension={name:"divide",type:C.BlendMode};class mr extends k{constructor(){super({gl:{functions:`
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
            `}})}}mr.extension={name:"exclusion",type:C.BlendMode};class gr extends k{constructor(){super({gl:{functions:`
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
                `}})}}gr.extension={name:"hard-light",type:C.BlendMode};class br extends k{constructor(){super({gl:{functions:`
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
            `}})}}br.extension={name:"hard-mix",type:C.BlendMode};class vr extends k{constructor(){super({gl:{functions:`
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
            `}})}}vr.extension={name:"lighten",type:C.BlendMode};class yr extends k{constructor(){super({gl:{functions:`
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
                `}})}}yr.extension={name:"linear-burn",type:C.BlendMode};class xr extends k{constructor(){super({gl:{functions:`
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
            `}})}}xr.extension={name:"linear-dodge",type:C.BlendMode};class wr extends k{constructor(){super({gl:{functions:`
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
            `}})}}wr.extension={name:"linear-light",type:C.BlendMode};class Cr extends k{constructor(){super({gl:{functions:`
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
            `}})}}Cr.extension={name:"luminosity",type:C.BlendMode};class Sr extends k{constructor(){super({gl:{functions:`
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
            `}})}}Sr.extension={name:"negation",type:C.BlendMode};class Tr extends k{constructor(){super({gl:{functions:`
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
                `}})}}Tr.extension={name:"overlay",type:C.BlendMode};class kr extends k{constructor(){super({gl:{functions:`
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
                `}})}}kr.extension={name:"pin-light",type:C.BlendMode};class Ir extends k{constructor(){super({gl:{functions:`
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
            `}})}}Ir.extension={name:"saturation",type:C.BlendMode};class Or extends k{constructor(){super({gl:{functions:`
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
                `}})}}Or.extension={name:"soft-light",type:C.BlendMode};class _r extends k{constructor(){super({gl:{functions:`
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
                `}})}}_r.extension={name:"subtract",type:C.BlendMode};class Pr extends k{constructor(){super({gl:{functions:`
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
                `}})}}Pr.extension={name:"vivid-light",type:C.BlendMode};const dn=[];At.handleByNamedList(C.Environment,dn);async function Qs(t){if(!t)for(let e=0;e<dn.length;e++){const n=dn[e];if(n.value.test()){await n.value.load();return}}}let Re;function Ks(){if(typeof Re=="boolean")return Re;try{Re=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{Re=!1}return Re}var Br=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(Br||{});class ea{constructor(e){this.items=[],this._name=e}emit(e,n,o,r,i,s,a,l){const{name:c,items:u}=this;for(let d=0,f=u.length;d<f;d++)u[d][c](e,n,o,r,i,s,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const n=this.items.indexOf(e);return n!==-1&&this.items.splice(n,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const ta=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],Fr=class Ar extends Ti{constructor(e){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const n=[...ta,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(e={}){const n=e.skipExtensionImports===!0?!0:e.manageImports===!1;await Qs(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const o in this._systemsHash)e={...this._systemsHash[o].constructor.defaultOptions,...e};e={...Ar.defaultOptions,...e},this._roundPixels=e.roundPixels?1:0;for(let o=0;o<this.runners.init.items.length;o++)await this.runners.init.items[o].init(e);this._initOptions=e}render(e,n){let o=e;if(o instanceof g&&(o={container:o},n&&(We(_t,"passing a second argument is deprecated, please use render options instead"),o.target=n.renderTexture)),o.target||(o.target=this.view.renderTarget),o.target===this.view.renderTarget&&(this._lastObjectRendered=o.container,o.clearColor??(o.clearColor=this.background.colorRgba),o.clear??(o.clear=this.background.clearBeforeRender)),o.clearColor){const r=Array.isArray(o.clearColor)&&o.clearColor.length===4;o.clearColor=r?o.clearColor:w.shared.setValue(o.clearColor).toArray()}o.transform||(o.container.updateLocalTransform(),o.transform=o.container.localTransform),o.container.enableRenderGroup(),this.runners.prerender.emit(o),this.runners.renderStart.emit(o),this.runners.render.emit(o),this.runners.renderEnd.emit(o),this.runners.postrender.emit(o)}resize(e,n,o){const r=this.view.resolution;this.view.resize(e,n,o),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),o!==void 0&&o!==r&&this.runners.resolutionChange.emit(o)}clear(e={}){const n=this;e.target||(e.target=n.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=Br.ALL);const{clear:o,clearColor:r,target:i}=e;w.shared.setValue(r??this.background.colorRgba),n.renderTarget.clear(i,o,w.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(n=>{this.runners[n]=new ea(n)})}_addSystems(e){let n;for(n in e){const o=e[n];this._addSystem(o.value,o.name)}}_addSystem(e,n){const o=new e(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=o,this._systemsHash[n]=o;for(const r in this.runners)this.runners[r].add(o);return this}_addPipes(e,n){const o=n.reduce((r,i)=>(r[i.name]=i.value,r),{});e.forEach(r=>{const i=r.value,s=r.name,a=o[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!Ks())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};Fr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Mr=Fr,ht;function na(t){return ht!==void 0||(ht=(()=>{const e={stencil:!0,failIfMajorPerformanceCaveat:t??Mr.defaultOptions.failIfMajorPerformanceCaveat};try{if(!on.get().getWebGLRenderingContext())return!1;let o=on.get().createCanvas().getContext("webgl",e);const r=!!o?.getContextAttributes()?.stencil;if(o){const i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,r}catch{return!1}})()),ht}let pt;async function oa(t={}){return pt!==void 0||(pt=await(async()=>{const e=on.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),pt}const Zn=["webgl","webgpu","canvas"];async function ra(t){let e=[];t.preference?(e.push(t.preference),Zn.forEach(i=>{i!==t.preference&&e.push(i)})):e=Zn.slice();let n,o={};for(let i=0;i<e.length;i++){const s=e[i];if(s==="webgpu"&&await oa()){const{WebGPURenderer:a}=await Hn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-DxyYYyQW.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgpu};break}else if(s==="webgl"&&na(t.failIfMajorPerformanceCaveat??Mr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await Hn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-CgDokW4V.js");return{WebGLRenderer:l}},__vite__mapDeps([8,1,2,3,4,5,6,7]));n=a,o={...t,...t.webgl};break}else if(s==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!n)throw new Error("No available renderer for the current environment");const r=new n;return await r.init(o),r}const Dr="8.8.1";class zr{static init(){globalThis.__PIXI_APP_INIT__?.(this,Dr)}static destroy(){}}zr.extension=C.Application;class ia{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Dr)}destroy(){this._renderer=null}}ia.extension={type:[C.WebGLSystem,C.WebGPUSystem],name:"initHook",priority:-10};const Lr=class fn{constructor(...e){this.stage=new g,e[0]!==void 0&&We(_t,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await ra(e),fn._plugins.forEach(n=>{n.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return We(_t,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,n=!1){const o=fn._plugins.slice(0);o.reverse(),o.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(e),this.renderer=null}};Lr._plugins=[];let Rr=Lr;At.handleByList(C.Application,Rr._plugins);At.add(zr);var sa=`in vec2 aPosition;
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
`,aa=`
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
}`;const Er=class Ur extends W{constructor(e){e={...Ur.defaultOptions,...e};const n=ge.from({vertex:{source:Qn,entryPoint:"mainVertex"},fragment:{source:Qn,entryPoint:"mainFragment"}}),o=$.from({vertex:sa,fragment:aa,name:"alpha-filter"}),{alpha:r,...i}=e,s=new Uo({uAlpha:{value:r,type:"f32"}});super({...i,gpuProgram:n,glProgram:o,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(e){this.resources.alphaUniforms.uniforms.uAlpha=e}};Er.defaultOptions={alpha:1};let la=Er;class Qe extends Ae{constructor(...e){let n=e[0];Array.isArray(e[0])&&(n={textures:e[0],autoUpdate:e[1]});const{animationSpeed:o=1,autoPlay:r=!1,autoUpdate:i=!0,loop:s=!0,onComplete:a=null,onFrameChange:l=null,onLoop:c=null,textures:u,updateAnchor:d=!1,...f}=n,[h]=u;super({...f,texture:h instanceof fe?h:h.texture}),this._textures=null,this._durations=null,this._autoUpdate=i,this._isConnectedToTicker=!1,this.animationSpeed=o,this.loop=s,this.updateAnchor=d,this.onComplete=a,this.onFrameChange=l,this.onLoop=c,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=u,r&&this.play()}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(je.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(je.shared.add(this.update,this,ki.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const n=e.deltaTime,o=this.animationSpeed*n,r=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=o/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=o;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.texture.defaultAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const n=[];for(let o=0;o<e.length;++o)n.push(fe.from(e[o]));return new Qe(n)}static fromImages(e){const n=[];for(let o=0;o<e.length;++o)n.push(fe.from(e[o]));return new Qe(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof fe)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<e.length;n++)this._textures.push(e[n].texture),this._durations.push(e[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=e,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(je.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(je.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class ca extends Ii{constructor(e,n){const{text:o,resolution:r,style:i,anchor:s,width:a,height:l,roundPixels:c,...u}=e;super({...u}),this.batched=!0,this._resolution=null,this._autoResolution=!0,this._didTextUpdate=!0,this._styleClass=n,this.text=o??"",this.style=i,this.resolution=r??null,this.allowChildren=!1,this._anchor=new Oi({_onUpdate:()=>{this.onViewUpdate()}}),s&&(this.anchor=s),this.roundPixels=c??!1,a!==void 0&&(this.width=a),l!==void 0&&(this.height=l)}get anchor(){return this._anchor}set anchor(e){typeof e=="number"?this._anchor.set(e):this._anchor.copyFrom(e)}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onViewUpdate())}get text(){return this._text}set resolution(e){this._autoResolution=e===null,this._resolution=e,this.onViewUpdate()}get resolution(){return this._resolution}get style(){return this._style}set style(e){e||(e={}),this._style?.off("update",this.onViewUpdate,this),e instanceof this._styleClass?this._style=e:this._style=new this._styleClass(e),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(e){this._setWidth(e,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(e){this._setHeight(e,this.bounds.height)}getSize(e){return e||(e={}),e.width=Math.abs(this.scale.x)*this.bounds.width,e.height=Math.abs(this.scale.y)*this.bounds.height,e}setSize(e,n){typeof e=="object"?(n=e.height??e.width,e=e.width):n??(n=e),e!==void 0&&this._setWidth(e,this.bounds.width),n!==void 0&&this._setHeight(n,this.bounds.height)}containsPoint(e){const n=this.bounds.width,o=this.bounds.height,r=-n*this.anchor.x;let i=0;return e.x>=r&&e.x<=r+n&&(i=-o*this.anchor.y,e.y>=i&&e.y<=i+o)}onViewUpdate(){this.didViewUpdate||(this._didTextUpdate=!0),super.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}:${this._resolution}`}destroy(e=!1){super.destroy(e),this.owner=null,this._bounds=null,this._anchor=null,(typeof e=="boolean"?e:e?.style)&&this._style.destroy(e),this._style=null,this._text=null}}function ua(t,e){let n=t[0]??{};return(typeof n=="string"||t[1])&&(We(_t,`use new ${e}({ text: "hi!", style }) instead`),n={text:n,style:t[1]}),n}class da extends ca{constructor(...e){const n=ua(e,"Text");super(n,_i),this.renderPipeId="text"}updateBounds(){const e=this._bounds,n=this._anchor,o=Pi.measureText(this._text,this._style),{width:r,height:i}=o;e.minX=-n._x*r,e.maxX=e.minX+r,e.minY=-n._y*i,e.maxY=e.minY+i}}class On extends fe{static create(e){return new On({source:new Bi(e)})}resize(e,n,o){return this.source.resize(e,n,o),this}}function fa(t){return{all:t=t||new Map,on:function(e,n){var o=t.get(e);o?o.push(n):t.set(e,[n])},off:function(e,n){var o=t.get(e);o&&(n?o.splice(o.indexOf(n)>>>0,1):t.set(e,[]))},emit:function(e,n){var o=t.get(e);o&&o.slice().map(function(r){r(n)}),(o=t.get("*"))&&o.slice().map(function(r){r(e,n)})}}}const ha=(t,e)=>{if(e)return Fi(e.gameState.characterRooms,([o,r])=>[o,r.id]);const n={};for(const o of Object.values(t.rooms))for(const r of Object.values(o.items))if(r.type==="player"){const{which:i}=r.config;n[i]=o.id}if(n.head===void 0&&n.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return n},Kn=({campaign:t,inputStateTracker:e,savedGame:n,writeInto:o={}})=>{const r=ha(t,n),i={},s=n?n.gameState.characterRooms.head&&lt(n.gameState.characterRooms.head):r.head&&sn({roomJson:t.rooms[r.head],roomPickupsCollected:i[r.head]??ae,isNewGame:n===void 0}),a=r.heels===r.head?s:n?n.gameState.characterRooms.heels&&lt(n.gameState.characterRooms.heels):r.heels&&sn({roomJson:t.rooms[r.heels],roomPickupsCollected:i[r.heels]??ae,isNewGame:n===void 0}),l=n?.gameState.characterRooms.headOverHeels&&lt(n.gameState.characterRooms.headOverHeels),c={head:s,heels:a,headOverHeels:l};return Object.assign(o,{events:fa(),inputStateTracker:e,campaign:t,gameSpeed:1,...n?lt(n?.gameState):{currentCharacterName:r.head===void 0?"heels":"head",entryState:{head:s===void 0?void 0:Bt(Rn("head",s?.items)),heels:a===void 0?void 0:Bt(Rn("heels",a?.items))},pickupsCollected:i,gameTime:0,progression:0},characterRooms:c})},m={pureBlack:new w("#000000"),shadow:new w("#325149"),midGrey:new w("#7F7773"),lightGrey:new w("#BBB1AB"),white:new w("#FBFEFB"),pastelBlue:new w("#75ACFF"),metallicBlue:new w("#366CAA"),pink:new w("#D68ED1"),moss:new w("#9E9600"),redShadow:new w("#805E50"),midRed:new w("#CA7463"),lightBeige:new w("#DAA78F"),highlightBeige:new w("#EBC690"),alpha:new w("#1E7790"),replaceLight:new w("#08A086"),replaceDark:new w("#0A4730")},pe=t=>{const[e,n,o]=t.toUint8RgbArray();return new w({r:e/2,g:n/2,b:o/2})},V={original:new w(Q.zxWhite),basic:m.white,dimmed:m.lightGrey},X={original:new w(Q.zxYellow),basic:m.midRed,dimmed:m.redShadow},J={original:new w(Q.zxMagenta),basic:m.pink,dimmed:pe(m.pink)},I={original:new w(Q.zxCyan),basic:m.pastelBlue,dimmed:pe(m.pastelBlue)},Y={original:new w(Q.zxGreen),basic:m.moss,dimmed:pe(m.moss)},_n={white:{basic:{main:V,edges:{towards:I,right:X},hud:{lives:X,dimmed:J,icons:I}},dimmed:{main:V,edges:{towards:Y,right:I},hud:{lives:X,dimmed:J,icons:I}}},yellow:{basic:{main:X,edges:{towards:Y,right:V},hud:{lives:I,dimmed:J,icons:Y}},dimmed:{main:X,edges:{towards:I,right:I},hud:{lives:I,dimmed:J,icons:Y}}},magenta:{basic:{main:J,edges:{towards:Y,right:I},hud:{lives:V,dimmed:I,icons:X}},dimmed:{main:J,edges:{towards:Y,right:I},hud:{lives:V,dimmed:I,icons:X}}},cyan:{basic:{main:I,edges:{towards:J,right:V},hud:{lives:V,dimmed:Y,icons:X}},dimmed:{main:I,edges:{towards:J,right:V},hud:{lives:V,dimmed:Y,icons:X}}},green:{basic:{main:Y,edges:{towards:I,right:X},hud:{lives:V,dimmed:J,icons:I}},dimmed:{main:Y,edges:{towards:I,right:X},hud:{lives:V,dimmed:J,icons:I}}}},Pn=t=>_n[t.hue][t.shade],_e={head:m.pastelBlue,heels:m.pink},kt=t=>{if(t===void 0)return 0;const{shieldCollectedAt:e,gameTime:n}=t;return e!==null&&e+En>n?100-Math.ceil((n-e)/(En/100)):0},$r=t=>t.type==="headOverHeels"?kt(t.state.head)>0||kt(t.state.heels)>0:kt(t.state)>0,Nr=t=>{const e=100*z.w;return t.gameWalkDistance<=t.fastStepsStartedAtDistance+e?100-Math.ceil((t.gameWalkDistance-t.fastStepsStartedAtDistance)/z.w):0},st=`in vec2 aPosition;
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
`,pa=`in vec2 vTextureCoord;
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
`;class we extends W{constructor(e){const n=Object.keys(e).length,o=$.from({vertex:st,fragment:pa.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:o,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const r=this.resources.colorReplaceUniforms.uniforms;Object.entries(e).forEach(([i,s],a)=>{m[i].toArray().forEach((l,c)=>{r.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{r.uReplacement[a*3+c]=l})})}}const ma=`precision mediump float;
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
`;class R extends W{uniforms;constructor(e="white"){const n=$.from({vertex:st,fragment:ma,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms,this.targetColor=e}set targetColor(e){const[n,o,r]=new w(e).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=o,this.uniforms.uTargetColor[2]=r}}const ga=`precision mediump float;
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
`;class ba extends W{constructor(){const e=$.from({vertex:st,fragment:ga,name:"halfbrite-filter"});super({glProgram:e,resources:{}})}}const jr=({basic:t,dimmed:e})=>({replaceLight:t,replaceDark:e}),Vr=t=>jr(_n[t.color.hue][t.color.shade].main),Xr=t=>new we({lightBeige:m.lightGrey,redShadow:m.shadow,pink:m.lightGrey,moss:m.lightGrey,midRed:m.midGrey,highlightBeige:m.lightGrey,...t&&Vr(t)}),va=new we({midGrey:m.midRed,lightGrey:m.lightBeige,white:m.highlightBeige,metallicBlue:m.redShadow,pink:m.midRed,moss:m.midRed,replaceDark:m.midRed,replaceLight:m.lightBeige}),ya=t=>new we({replaceLight:t,replaceDark:pe(t)}),hn=(t,e,n)=>n?new we(jr(_n[t.color.hue][t.color.shade].edges[e])):new R(Pn(t.color).edges[e].original),oe=t=>new we(Vr(t)),eo=new ba,me=$o,to={x:.5,y:1},no=t=>typeof t!="string"&&Object.hasOwn(t,"animationId"),p=t=>{if(typeof t=="string")return p({textureId:t});{const{anchor:e,flipX:n,pivot:o,x:r,y:i,filter:s,times:a,label:l}=t;let c;if(no(t)?c=xa(t):c=new Ae(le().textures[t.textureId]),a!==void 0){const u={x:1,y:1,z:1,...a},d=new g({label:l??"timesXyz"});for(let{x:f}=u;f>=1;f--)for(let{y:h}=u;h>=1;h--)for(let b=1;b<=u.z;b++){const v=p({...t,times:void 0,label:`(${f},${h},${b})`}),M=T({x:f-1,y:h-1,z:b-1});v.x+=M.x,v.y+=+M.y,d.addChild(v)}return d}if(e===void 0&&o===void 0)if(no(t))c.anchor=to;else{const u=le().data.frames[t.textureId].frame;u.pivot!==void 0?c.pivot=u.pivot:c.anchor=to}else e!==void 0&&(c.anchor=e),o!==void 0&&(c.pivot=o);return r!==void 0&&(c.x=r),i!==void 0&&(c.y=i),s!==void 0&&(c.filters=s),l!==void 0&&(c.label=l),c.eventMode="static",n===!0&&(c.scale.x=-1),c}};function xa({animationId:t,reverse:e,playOnce:n,paused:o}){const r=le().animations[t],s=(o?[r[0]]:r).map(l=>({texture:l,time:No}));e&&s.reverse();const a=new Qe(s);return a.animationSpeed=jo.animations[t].animationSpeed,a.play(),n!==void 0&&(a.loop=!1,a.onComplete=()=>{a.stop(),n==="and-destroy"&&(a.visible=!1)}),a}const wa=`#version 300 es

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
`;class Fe extends W{constructor({outlineColor:e,upscale:n,lowRes:o}){const r=$.from({vertex:st,fragment:wa,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const i=this.resources.colorReplaceUniforms.uniforms,[s,a,l]=e.toArray();i.uOutline[0]=s,i.uOutline[1]=a,i.uOutline[2]=l,i.uOutlineWidth[0]=n,o&&(this.resolution=1/n,this.padding=n,i.uOutlineWidth[0]=1)}}const K=new Fe({outlineColor:m.pureBlack,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!0}),He=new R,oo=new R,pn=new R,ro=new R(m.moss),Ge=new R,Z=[He,K],Ca=[Ge,K],Sa=[K,pn],mt={original:[K,Ge],colourised:{head:{active:[K,new R(_e.head)],inactive:[K,new R(pe(_e.head))]},heels:{active:[K,new R(_e.heels)],inactive:[K,new R(pe(_e.heels))]}}},Ce=14,Ta=2,ka=Math.cos(30*(Math.PI/180)),Ia=40;class Oa{constructor(e){this.renderContext=e;const{inputDirectionMode:n}=e;this.arrowSprites={away:p({textureId:"hud.char.↗",anchor:{x:.5,y:.5},x:Ce,y:-14,filter:Z}),right:p({textureId:"hud.char.↘",anchor:{x:.5,y:.5},x:Ce,y:Ce,filter:Z}),towards:p({textureId:"hud.char.↙",anchor:{x:.5,y:.5},x:-14,y:Ce,filter:Z}),left:p({textureId:"hud.char.↖",anchor:{x:.5,y:.5},x:-14,y:-14,filter:Z}),...n!=="4-way"?{awayRight:p({textureId:"hud.char.➡",anchor:{x:.5,y:.5},x:Ce*Math.SQRT2,filter:Z}),towardsRight:p({textureId:"hud.char.⬇",anchor:{x:.5,y:.5},y:Ce*Math.SQRT2,filter:Z}),towardsLeft:p({textureId:"hud.char.⬅",anchor:{x:.5,y:.5},x:-14*Math.SQRT2,filter:Z}),awayLeft:p({textureId:"hud.char.⬆",anchor:{x:.5,y:.5},y:-14*Math.SQRT2,filter:Z})}:{}},this.output.addChild(this.#e),this.output.addChild(new H().circle(0,0,Ia).fill("#00000000"));for(const o of ee(this.arrowSprites))this.output.addChild(o);this.output.on("pointerenter",this.handlePointerEnter),this.output.on("globalpointermove",this.usePointerLocation),this.output.on("pointerup",this.stopCurrentPointer),this.output.on("pointerupoutside",this.stopCurrentPointer),this.#e.filters=e.colourise?me:He}output=new g({label:"OnScreenJoystick",eventMode:"static"});arrowSprites;#e=p({textureId:"joystick",anchor:{x:.5,y:.5},y:1});#n;handlePointerEnter=e=>{this.#n!==void 0&&this.stopCurrentPointer(),this.#n=e.pointerId,this.usePointerLocation(e)};stopCurrentPointer=()=>{this.#n=void 0,this.renderContext.inputStateTracker.hudInputState.directionVector=O};usePointerLocation=e=>{if(e.pointerId!==this.#n)return;const n=Ai(x.getState()),{x:o,y:r}=this.output,{x:i,y:s}=e,{width:a,height:l}=this.output.getLocalBounds(),c=(i/n-o)/(a/2),u=(s/n-r)/(l/2),d=Mi({x:-c,y:-u}),f=Di(d,ka),h=A(f,Ta);this.renderContext.inputStateTracker.hudInputState.directionVector=h};tick(){const{renderContext:{inputStateTracker:{directionVector:e}}}=this;if(x.getState().gameMenus.openMenus.length>0){this.stopCurrentPointer();return}const o=Me(e)>zi?Vo(e):void 0;for(const[r,i]of Xo(this.arrowSprites))i.filters=r===o?Ca:Z}destroy(){this.stopCurrentPointer(),this.output.off("pointerenter",this.handlePointerEnter),this.output.off("globalpointermove",this.usePointerLocation),this.output.off("pointerup",this.stopCurrentPointer),this.output.off("pointerupoutside",this.stopCurrentPointer),this.output.destroy()}}const mn={colourised:{jump:m.pastelBlue,fire:m.highlightBeige,carry:m.moss,carryAndJump:m.midRed,menu:m.lightGrey},zx:{jump:Q.zxBlue,fire:Q.zxYellow,carry:Q.zxGreen,carryAndJump:Q.zxRed,menu:Q.zxWhite}};function Ke(t,e){const n=e||new g;for(const o of t)n.addChild(o);return n}function*Hr(t){const e=typeof t=="string"?t==="infinite"?"":t.split(""):t.toString().split(""),n=e.length;for(let o=0;o<n;o++){const r=`hud.char.${e[o]}`;Li(r),yield p({textureId:r,x:(o+.5-n/2)*Ct.w})}}function ke(t,e){return t.removeChildren(),Ke(Hr(e),t),t}function _a(t,e){return t.removeChildren(),Ke(Hr(e),t),t}const Ft=Symbol(),Gr=Symbol(),qr=Symbol(),gt=({colourise:t,button:{which:e}})=>{const n=new g({label:"depress"}),o=new g({label:"arcadeButton"});o.addChild(n);const r=p("button");t?r.filters=ya(mn.colourised[e]):o.filters=new R(mn.zx[e]),n.addChild(r);const i=new g({label:"surface"}),s=p({textureId:"button.surfaceMask",label:"surfaceMask"});return n.addChild(s),i.mask=s,n.addChild(i),o[Gr]=r,o[Ft]=i,o[qr]=n,o},Ee=(t,...e)=>{t[Ft].removeChildren();for(const n of e)n!==void 0&&t[Ft].addChild(n)},bt=(t,e)=>{t[Gr].texture=le().textures[e?"button.pressed":"button"],t[qr].y=e?1:0},io=(t,e,n)=>{n&&(t[Ft].filters=e?Xr():me)},so=({which:t},e,n)=>{const o=_a(new g,n);return o.filters=new we({white:e?pe(mn.colourised[t]):m.pureBlack}),o};class Wr{constructor(e,n){this.renderContext=e,this.appearance=n,this.#n=new g({label:"AppearanceRenderer"})}#e=void 0;#n;destroy(){this.#n.destroy({children:!0})}tick(e){const n=this.appearance({renderContext:this.renderContext,currentlyRenderedProps:this.#e,previousRendering:this.#n.children.at(0)??null,tickContext:e});n!=="no-update"&&(this.#e=n.renderProps,this.#n.children.at(0)!==n.output&&(this.#n.removeChildren(),n.output!==null&&this.#n.addChild(n.output)))}get output(){return this.#n}}const Jr=t=>p(t.type==="spring"?"spring.released":t.type==="sceneryPlayer"?t.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":t.config.style),Pa=(t,e,n,o)=>{const r=Math.max(0,Math.min(t.x+e.x,n.x+o.x)-Math.max(t.x,n.x)),i=Math.max(0,Math.min(t.y+e.y,n.y+o.y)-Math.max(t.y,n.y));return r*i},ao=({state:{position:t},aabb:e},{state:{position:n},aabb:o})=>Pa(t,e,n,o),Bn=(t,e,n=.001)=>{if(!ye(e,t)||t.id===e.id)return!1;const{state:{vels:{gravity:{z:o}}}}=t;return o>0?!1:wn({state:{position:U(t.state.position,{x:0,y:0,z:-1e-4})},aabb:{...t.aabb,z:n+Ri},id:t.id},{state:{position:U(e.state.position,{x:0,y:0,z:e.aabb.z})},aabb:{...e.aabb,z:0},id:e.id})},Yr=(t,e)=>{const o=[...ne(e).filter(i=>Bn(t,i))];return o.length===0?void 0:o.reduce((i,s)=>{const a=ms(s,i);return a<0||a===0&&ao(t,s)>ao(t,i)?s:i})},qe=t=>{const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return e-n<gs};function Zr({room:{roomTime:t},movingItem:e}){e.state.action!=="death"&&($r(e)||qe(e)||(e.state.action="death",e.state.expires=t+an))}const re=(t,e)=>t==="infinite"||e==="infinite"?"infinite":t+e,et=t=>t==="infinite"?Number.POSITIVE_INFINITY:t,Qr=t=>{const{gameState:e,movingItem:n,touchedItem:{id:o,config:r},room:{id:i,roomJson:{items:s}}}=t,{pickupsCollected:a}=e;if(a[i]?.[o]!==!0)switch(s[o]&&(a[i]===void 0&&(a[i]={}),a[i][o]=!0),r.gives){case"hooter":{const l=Tt(n);if(l!==void 0){l.hasHooter=!0;break}break}case"doughnuts":{const l=Tt(n);l!==void 0&&(l.doughnuts=re(l.doughnuts,6));break}case"bag":{const l=Ye(n);if(l!==void 0){l.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const l=Tt(n);l!==void 0&&(l.fastStepsStartedAtDistance=l.gameWalkDistance);break}case"jumps":{const l=Ye(n);l!==void 0&&(l.bigJumps+=10);break}case"extra-life":n.type==="headOverHeels"?(n.state.head.lives=re(n.state.head.lives,2),n.state.heels.lives=re(n.state.heels.lives,2)):n.state.lives=re(n.state.lives,2);break;case"scroll":x.dispatch(Ni(r.page));break;case"reincarnation":{x.dispatch(Ui($i(e,x.getState())));break}case"crown":{x.dispatch(Ei(r.planet));break}}},Ba=({gameState:t,movingItem:e,touchedItem:n,movementVector:o})=>{const{config:{toRoom:r,direction:i}}=n;Ho(i,o)<=0||e.state.action!=="death"&&Cn({playableItem:e,gameState:t,toRoomId:r,sourceItem:n,changeType:"portal"})},Fa=({movingItem:t,movementVector:e,touchedItem:n})=>{const{config:{direction:o,part:r}}=n,i=Mt(o);if(r==="top")return;const s=r==="far"?{x:i==="x"?-Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?-Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0}:{x:i==="x"?Math.abs(e.y):Math.abs(e.y)*(o==="left"?-1:1),y:i==="y"?Math.abs(e.x):Math.abs(e.x)*(o==="away"?-1:1),z:0};t.state.position=U(t.state.position,s)};function Aa({movingItem:t}){t.state.autoWalk=!1}const te=(t,...e)=>G(...e)(t.touchedItem),Ue=(t,...e)=>G(...e)(t.movingItem),Kr=t=>L(t.movingItem),Ma=t=>L(t.touchedItem),Da=t=>Yo(t.touchedItem),lo=t=>{switch(!0){case te(t,"stopAutowalk"):Aa(t);break;case Da(t):Zr(t);break;case te(t,"portal"):Ba(t);break;case te(t,"pickup"):Qr(t);break;case te(t,"doorFrame"):Fa(t);break}},q={movementType:"steady"},Fn=(t,e)=>{const{head:n,heels:o,headOverHeels:r}=Zo(e.items);if(r!==void 0)return qe(r)?void 0:r;const i=n===void 0||qe(n)||n.state.action==="death"?void 0:Dn(n.state.position,t),s=o===void 0||qe(o)||o.state.action==="death"?void 0:Dn(o.state.position,t);return i===void 0?o:s===void 0||i<s?n:o},ei=150,ti=t=>t[Math.floor(Math.random()*t.length)],se=Object.freeze({movementType:"vel",vels:{walking:O}}),Rt=t=>Qo(t)?he[t.config.which]:he[t.type],co=z.w/2,za=({state:{position:t,vels:{walking:e}}},n,o,r)=>{const i=he.homingBot;if(!Dt(e,ie))return{movementType:"steady"};const{head:s,heels:a}=Zo(n.items);for(const l of[s,a]){if(l===void 0)continue;const c=ot(l.state.position,t);if(Math.abs(c.y)<co)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-.05,y:0,z:0}}};if(Math.abs(c.x)<co)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-.05,z:0}}}}return{movementType:"steady"}},La=(t,e,n,o)=>{const{state:{position:r,standingOnItemId:i,timeOfLastDirectionChange:s,facing:a}}=t;if(i===null)return se;const l=Fn(r,e);if(l===void 0||s+ei>e.roomTime)return q;const c=ot(l?.state.position,r),u=Math.abs(c.x)<Math.abs(c.y)?"x":"y",d=Math.abs(c[u])>z.w/4?u:rt(u),f=Rt(t),h={...O,[d]:c[d]>0?f:-f},b=be(h),v=!Dt(b,a);return{movementType:"vel",vels:{walking:h},stateDelta:{facing:b,...v?{timeOfLastDirectionChange:e.roomTime}:ae}}},uo=(t,e,n,o,r=!1)=>{const{state:{position:i,standingOnItemId:s}}=t;if(s===null)return se;const a=Fn(i,e);if(a===void 0)return se;const l=a.state.position,c=z.w*3;if(!(i.x>l.x-c&&i.x<l.x+c&&i.y>l.y-c&&i.y<l.y+c))return se;const d=ot(a?.state.position,i),f=Rt(t),h=(1+Math.sqrt(2))/2,b=f*h,v=A({...d,z:0},b/Go(d)*(r?-1:1));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:be(v)}}},Gt=(t,e,n,o,r)=>{const{state:{vels:{walking:i},standingOnItemId:s}}=t;if(s===null)return se;if(!(ve(i,O)||Math.random()<o/1e3))return q;const l=ti(r);return{movementType:"vel",vels:{walking:A(rn[l],Rt(t))},stateDelta:{facing:rn[l]}}},Ra=(t,e,n,o)=>{const{state:{facing:r,vels:{walking:i},standingOnItemId:s}}=t;return s===null?se:Dt(i,ie)?{movementType:"vel",vels:{walking:A(r,Rt(t))}}:q},Ea=(t,e,n)=>{switch(n){case"opposite":return{x:e.x===0?t.x:-t.x,y:e.y===0?t.y:-t.y,z:0};case"clockwise":return{x:-t.y,y:t.x,z:0};case"perpendicular":{const o=ti([-1,1]);return{x:e.x===0?o*t.y:0,y:e.y===0?o*t.x:0,z:0}}}},qt=({movingItem:t,touchedItem:{state:{position:e},aabb:n},deltaMS:o},r)=>{const{state:{position:i,vels:{walking:s},activated:a},aabb:l}=t;if(!a||(t.state.durationOfTouch+=o,t.state.durationOfTouch<ei))return;const c=zt(i,l,e,n);if(c.x===0&&c.y===0)return;const u=Ea(s,c,r);t.state.vels.walking=u,t.state.facing=be(u),t.state.durationOfTouch=0},Ua=({movingItem:t,movementVector:e})=>{e.z<0||(t.state.vels.walking=O)},$a=(t,e,n,o)=>{if(!t.state.activated||Qo(t)&&t.state.busyLickingDoughnutsOffFace)return se;switch(t.config.movement){case"patrol-randomly-diagonal":return Gt(t,e,n,o,Hi);case"patrol-randomly-xy8":return Gt(t,e,n,o,Xi);case"patrol-randomly-xy4":return Gt(t,e,n,o,Vi);case"towards-tripped-on-axis-xy4":return za(t,e);case"towards-on-shortest-axis-xy4":return La(t,e);case"back-forth":case"clockwise":return Ra(t);case"unmoving":return se;case"towards-analogue":return uo(t,e);case"towards-analogue-unless-planet-crowns":return uo(t,e,n,o,ji(x.getState()));default:throw t.config,new Error("this should be unreachable")}},Na=t=>{const{movingItem:e,touchedItem:n}=t;if(ye(n,e))switch(e.config.movement){case"patrol-randomly-xy4":qt(t,"perpendicular");break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":qt(t,"opposite");break;case"clockwise":qt(t,"clockwise");break;case"towards-tripped-on-axis-xy4":Ua(t);break;case"towards-on-shortest-axis-xy4":case"towards-analogue":case"towards-analogue-unless-planet-crowns":case"unmoving":return;default:throw e.config,new Error("this should be unreachable")}},ja=({touchedItem:t,gameState:{progression:e},room:n})=>{const{config:o,state:{setting:r,touchedOnProgression:i}}=t;if(t.state.touchedOnProgression=e,!(e===i+1||e===i))switch(o.type){case"in-room":{const s=t.state.setting=r==="left"?"right":"left";for(const a of o.modifies){const l=n.items[a.target];l!==void 0&&(l.state={...l.state,[a.key]:a[s]})}break}case"in-store":{x.dispatch(Gi(o.path));break}}},Va=({movingItem:t,touchedItem:e})=>{if(!ye(t))return;const{state:{position:n},aabb:o}=e,r=zt(t.state.position,t.aabb,n,o);if(r.x===0&&r.y===0)return;const i=be(r),s=A(i,-.05);return e.state.vels.sliding=s,!1},Xa=({movingItem:t,touchedItem:e})=>{if(!ye(e))return;const n=t.state.vels.sliding;if(ve(n,O))return;const{state:{position:o},aabb:r}=t,i=zt(e.state.position,e.aabb,o,r);return Ho(i,t.state.vels.sliding)>0&&(t.state.vels.sliding=O),!1},Ha=({movingItem:t,room:e,touchedItem:n,deltaMS:o,gameState:r},i)=>{const{config:{controls:s},state:{position:a},aabb:l}=n,c=zt(t.state.position,t.aabb,a,l);if(c.x===0&&c.y===0)return;const u=be(c);for(const d of s){const f=e.items[d],h=A(u,-.025*o);f.state.facing=h,Sn({room:e,subjectItem:f,gameState:r,pusher:n,posDelta:h,deltaMS:o,onTouch:i})}},An=({config:{activatedOnStoreValue:t}})=>t===void 0?!0:yn(x.getState(),t),Ga=(t,e,n,o)=>{const{state:{teleporting:r,standingOnItemId:i}}=t,{inputStateTracker:s}=n,a=s.currentActionPress("jump"),l=i===null?null:e.items[i],c=l!==null&&G("teleporter")(l)&&An(l);if(r===null)return a!=="released"&&c?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:l.config.toRoom,timeRemaining:an}}}:q;const u=Math.max(r.timeRemaining-o,0);switch(r.phase){case"out":if(!c)return{movementType:"steady",stateDelta:{teleporting:null}};if(u===0)return Cn({changeType:"teleport",sourceItem:l,playableItem:t,gameState:n,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:an}}};break;case"in":if(u===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:u}}}},qa=1e3/12,vt=t=>{const n=t/xs*No;return(t+.5*ln*n**2)/n},Wa={head:vt(ct.head),headOnSpring:vt(ct.head+z.h),heels:vt(ct.heels),heelsOnSpring:vt(ct.heels+z.h)},fo=(t,e)=>{const n=t.type==="headOverHeels"?"head":t.type==="heels"&&t.state.bigJumps>0?(t.state.bigJumps--,"head"):t.type;return Wa[`${n}${e?"OnSpring":""}`]},Ja=t=>!(t===null||vs(t)&&An(t)||ys(t)&&t.config.gives==="scroll"||L(t)&&t.state.standingOnItemId===null),Ya=t=>t.state.jumped&&t.state.position.z===t.state.jumpStartZ&&t.state.jumpStartTime+qa>(t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime),ni=(t,e,n)=>{const{state:{standingOnItemId:o}}=t,{inputStateTracker:r}=n,i=De(o,e);if(Ya(t))return console.info("jump grace"),{movementType:"vel",vels:{gravity:{x:0,y:0,z:fo(t,!1)}},stateDelta:{}};if(!(r.currentActionPress("jump")!=="released"&&Ja(i)))return o!==null?{movementType:"steady",stateDelta:{jumped:!1}}:q;const a=bs(i);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:fo(t,a)}},stateDelta:{action:"moving",jumped:!0,jumpStartZ:t.state.position.z,jumpStartTime:t.type==="headOverHeels"?t.state.head.gameTime:t.state.gameTime}}},Za=({vel:t,acc:e,unitD:n,maxSpeed:o,deltaMS:r,minSpeed:i=0})=>{const s=Me(t),a=Math.max(i,Math.min(o,s+e*r)),l=Math.min(a,o);return A(n,l)},ho={movementType:"vel",vels:{walking:O}},oi=(t,e,n,o)=>{const r=Qa(t,e,n,o);if(r.movementType==="vel"&&r.vels.walking!==void 0){const i=Me(r.vels.walking);r.stateDelta={...r.stateDelta,walkDistance:i===0?0:t.state.walkDistance+i*o},t.type==="head"&&t.state.standingOnItemId!==null&&(r.stateDelta={...r.stateDelta,gameWalkDistance:t.state.gameWalkDistance+i*o})}return t.state.action==="idle"&&r.movementType==="vel"&&r.vels.walking!==void 0&&!ve(r.vels.walking,O)&&(r.stateDelta={...r.stateDelta,walkStartFacing:t.state.facing}),r},Qa=(t,e,{inputStateTracker:n,currentCharacterName:o},r)=>{const{type:i,state:{action:s,autoWalk:a,standingOnItemId:l,facing:c,teleporting:u,walkDistance:d,walkStartFacing:f,vels:{walking:h,gravity:b}}}=t,v=o===t.id,M=v?n.currentActionPress("jump"):"released",_=v?n.directionVector:O,P=l===null&&b.z<0,B=i==="head"&&Nr(t.state)>0&&l!==null,N=i==="headOverHeels"?P?"head":"heels":B?"heels":i,F=a?c:_,j=he[N];if(u!==null||s==="death")return ho;if(i==="heels"){if(l===null)return t.state.jumped?{movementType:"vel",vels:{walking:qo(h,A(h,ws*r))}}:ho;if(M!=="released"){const at=be(Dt(F,ie)?c:F),wi=G("spring")(De(l,e))?1:Cs;return{movementType:"vel",vels:{walking:A({...at,z:0},j*wi)},stateDelta:{facing:at}}}}if(Me(F)!==0)return P?{movementType:"vel",vels:{walking:A({...F,z:0},j)},stateDelta:{facing:F,action:"falling"}}:{movementType:"vel",vels:{walking:Za({vel:h,acc:Ss[N],deltaMS:r,maxSpeed:j,unitD:F,minSpeed:0})},stateDelta:{facing:F,action:"moving"}};if(d>0&&d<1){const at=ve(f,c)?1:0;return{movementType:"position",posDelta:A(c,at-d),stateDelta:{action:P?"falling":"idle",walkDistance:0}}}return{movementType:"vel",vels:{walking:O},stateDelta:{action:P?"falling":"idle"}}},po=t=>xe(t.movingItem)&&Bn(t.movingItem,t.touchedItem,Math.abs(t.movementVector.z)),ri=(t,e)=>{let n=O;for(const o of e){if(o.movementType==="position"&&(n=U(n,o.posDelta)),o.movementType==="vel"&&(xe(t)||G("lift")(t)))for(const[i,s]of Xo(o.vels)){const a={...O,...s};t.state.vels[i]=a}const r=o.stateDelta;r!==void 0&&(t.state={...t.state,...r})}return n},mo=t=>{if(t.touchedItem.state.disappear==="onTouch"||t.touchedItem.state.disappear==="onTouchByPlayer"&&L(t.movingItem)||t.touchedItem.state.disappear==="onStand"&&po(t)){if(po(t)&&Kr(t)){Ko({above:t.movingItem,below:t.touchedItem});const n=[ni(t.movingItem,t.room,t.gameState),oi(t.movingItem,t.room,t.gameState,t.deltaMS)];ri(t.movingItem,n)}er(t)}};function Ka(t){const e=t.movingItem.type==="monster"?t.movingItem:t.touchedItem;e.config.which!=="emperorsGuardian"&&(e.state.busyLickingDoughnutsOffFace=!0)}const Mn=t=>{Kr(t)&&lo(t),Ma(t)&&lo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem}),te(t,...Un)&&Va(t),Ue(t,...Un)&&Xa(t),(Ue(t,"monster")&&te(t,"firedDoughnut")||Ue(t,"firedDoughnut")&&te(t,"monster"))&&Ka(t),(Ue(t,"monster")||Ue(t,"movingPlatform"))&&Na(t),te(t,"switch")&&ja(t),te(t,"joystick")&&Ha(t,Mn),t.touchedItem.state.disappear&&mo(t),t.movingItem.state.disappear&&ye(t.touchedItem,t.movingItem)&&mo({...t,movingItem:t.touchedItem,touchedItem:t.movingItem})},el=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="heels"?t.state:t.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=t;if(!a)return;const c=ce(e.items).filter(tr),u=s===null?ii(t,e):void 0;for(const h of c)h.state.wouldPickUpNext=!1;u!==void 0&&(u.state.wouldPickUpNext=!0);const d=r.currentActionPress("carry");if(d==="tap"||r.currentActionPress("jump")==="hold"&&d==="hold")if(s===null){if(u===void 0)return;tl(e,i,u)}else{if(t.state.standingOnItemId===null||!si(t,nr(e.items)))return;const h=Ts({gameState:n,room:e,itemType:s.type,config:s.config,position:l});Sn({subjectItem:t,gameState:n,room:e,posDelta:{x:0,y:0,z:h.aabb.z},pusher:t,forceful:!0,deltaMS:o,onTouch:Mn}),i.carrying=null}},tl=(t,e,n)=>{const o={type:n.type,config:n.config};e.carrying=o,or({room:t,item:n})},ii=(t,e)=>Yr(t,ce(e.items).filter(tr)),si=(t,e)=>{const n={position:U(t.state.position,{z:z.h})},o=ks({id:t.id,aabb:t.aabb,state:n},e);for(const r of o)if(ye(r,t)){if(!xe(r))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with non-free",r),!1;if(!si(r,e))return console.log("carrying: cannot put down due to collision: item:",t,"can't move up because it would collide with free that has nowhere to go:",r),!1}return!0},Wt=-11,nl={jump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{room:i,currentPlayable:s}}){const a=s?.state.standingOnItemId??null,l=a===null||i===void 0?null:i.items[a],c=l===null?!1:l.type==="teleporter",u=t.actions.every(f=>e.currentActionPress(f)!=="released"),d=r===null?gt({colourise:n,button:t}):r;if(o?.pressed!==u&&bt(d,u),c!==o?.standingOnTeleporter)if(c)Ee(d,p({textureId:"teleporter",y:5}),p({animationId:"teleporter.flashing",y:5}));else{const f=so(t,n,"JUMP");f.y=Wt,Ee(d,f)}return{output:d,renderProps:{pressed:u,standingOnTeleporter:c,colourise:n}}},carry({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i,room:s}}){const a=i&&Ye(i),l=a?.hasBag??!1,c=a?.carrying??null,u=c===null&&s!==void 0&&ii(i,s)!==void 0,d=t.actions.every(v=>e.currentActionPress(v)!=="released"),f=l&&!u&&c===null,h=r===null?gt({colourise:n,button:t}):r;if(h.visible=l,l&&(f!==o?.disabled&&io(h,f,n),h.visible=!0,o?.pressed!==d&&bt(h,d),l!==o?.hasBag||c!==o?.carrying)){let v;c!==null?v=Jr(c):l&&(v=p({textureId:"bag",y:-2})),Ee(h,v)}return{output:h,renderProps:{pressed:d,hasBag:l,colourise:n,carrying:c,disabled:f}}},fire({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const s=i&&Tt(i),a=s?.hasHooter??!1,l=s?.doughnuts??0,c=t.actions.every(f=>e.currentActionPress(f)!=="released"),u=r===null?gt({colourise:n,button:t}):r,d=a||et(l)>0;if(u.visible=d,d&&(o?.pressed!==c&&bt(u,c),a!==o?.hasHooter||l!==o?.doughnuts)){let f;a?f=p({textureId:"hooter",y:-3}):et(l)>0&&(f=p({textureId:"doughnuts",y:-2}));const h=ke(new g,l);h.y=Wt,h.filters=K,Ee(u,f,h),io(u,l===0,n)}return{output:u,renderProps:{pressed:c,colourise:n,doughnuts:l,hasHooter:a}}},carryAndJump({renderContext:{button:t,inputStateTracker:e,colourise:n},currentlyRenderedProps:o,previousRendering:r,tickContext:{currentPlayable:i}}){const a=(i&&Ye(i))?.hasBag??!1,l=t.actions.every(d=>e.currentActionPress(d)!=="released");if(!(o===void 0||l!==o.pressed||n!==o.colourise||a!==o.hasBag))return"no-update";let u;if(r===null){u=gt({colourise:n,button:t});const d=so(t,n,"C+J");d.y=Wt,Ee(u,d)}else u=r;return a?(u.visible=!0,o?.pressed!==l&&bt(u,l)):u.visible=!1,{output:u,renderProps:{pressed:l,hasBag:a,colourise:n}}},menu({previousRendering:t}){if(t!==null)return"no-update";const e=p("hud.char.Menu");return e.scale=2,e.filters=Z,{output:e,renderProps:ae}}};class $e extends Wr{constructor(e){const n=nl[e.button.which];super(e,n)}}const ol=30,rl=15,il=42,sl=36,al=44,ll=20;class cl{constructor(e){this.renderContext=e;const{gameState:{inputStateTracker:n},inputDirectionMode:o,colourise:r}=e;this.#n={mainButtonNest:new g({label:"mainButtonNest"}),buttons:{jump:new $e({button:{which:"jump",actions:["jump"],id:"jump"},colourise:r,inputStateTracker:n}),fire:new $e({button:{which:"fire",actions:["fire"],id:"fire"},colourise:r,inputStateTracker:n}),carry:new $e({button:{which:"carry",actions:["carry"],id:"carry"},colourise:r,inputStateTracker:n}),carryAndJump:new $e({button:{which:"carryAndJump",actions:["carry","jump"],id:"carryAndJump"},colourise:r,inputStateTracker:n}),menu:new $e({button:{which:"menu",actions:["menu_openOrExit"],id:"menu"},colourise:r,inputStateTracker:n})},joystick:new Oa({inputStateTracker:n,inputDirectionMode:o,colourise:r})};const{buttons:i}=this.#n,{mainButtonNest:s,joystick:a}=this.#n;for(const l of ee(i))l.renderContext.button.which==="menu"?this.#e.addChild(i.menu.output):s.addChild(l.output);i.jump.output.y=rl,i.carry.output.x=-30,i.carryAndJump.output.y=-15,i.fire.output.x=ol,i.menu.output.x=24,i.menu.output.y=24,this.#e.addChild(s),this.#e.addChild(a.output),this.#t()}#e=new g({label:"OnScreenControls"});#n;#t(){const{renderContext:{gameState:{inputStateTracker:e}}}=this;for(const n of ee(this.#n.buttons)){const{renderContext:{button:{actions:o}}}=n;n.output.eventMode="static",n.output.on("pointerdown",()=>{for(const r of o)e.hudInputState[r]=!0}),n.output.on("pointerup",()=>{for(const r of o)e.hudInputState[r]=!1}),n.output.on("pointerleave",()=>{for(const r of o)e.hudInputState[r]=!1})}}#o(e){this.#n.mainButtonNest.x=e.x-al,this.#n.mainButtonNest.y=e.y-ll,this.#n.joystick.output.x=il,this.#n.joystick.output.y=e.y-sl}tick(e){const{screenSize:n}=e,{gameState:o}=this.renderContext;this.#o(n);for(const r of ee(this.#n.buttons))r.tick({...e,currentPlayable:ze(o)});this.#n.joystick.tick()}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n.joystick.destroy()}}jo.frames.button.frame;const ul=250,dl=t=>t?48:24,fl=t=>t?68:56,hl=(t,e)=>t?e.x/2-24:80,pl=t=>t?72:24,ml=t=>t?88:0,go=112,Ne=t=>t==="heels"?1:-1;class gl{constructor(e){this.renderContext=e;const{onScreenControls:n}=e;for(const o of Nt)this.#e.addChild(this.#t[o].sprite),this.#e.addChild(this.#t[o].livesText),this.#e.addChild(this.#t[o].shield.container),this.#e.addChild(this.#t[o].extraSkill.container);n||(this.#e.addChild(this.#t.head.doughnuts.container),this.#e.addChild(this.#t.head.hooter.container),this.#e.addChild(this.#t.heels.bag.container),this.#e.addChild(this.#t.heels.carrying.container)),this.#e.addChild(this.#t.fps),this.#t.fps.filters=[ro],this.#t.fps.y=Ct.h,this.#o(),n&&(this.#n=new cl({...e}),this.#e.addChild(this.#n.output))}#e=new g({label:"HudRenderer"});#n=void 0;#t={head:{sprite:this.#l("head"),livesText:this.#r({label:"headLives",doubleHeight:!0,outline:!0}),shield:this.#i({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#i({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:this.#i({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:this.#i({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:this.#l("heels"),livesText:this.#r({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:this.#i({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:this.#i({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:this.#i({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new g({label:"heelsCarrying"})}},fps:this.#r({label:"fps",outline:!0})};#o(){const{renderContext:{gameState:{inputStateTracker:{hudInputState:e}}}}=this;for(const n of Nt){const{sprite:o,livesText:r}=this.#t[n];for(const i of[o,r])i.eventMode="static",i.on("pointerdown",()=>{e[`swop.${n}`]=!0}),i.on("pointerup",()=>{e[`swop.${n}`]=!1}),i.on("pointerleave",()=>{e[`swop.${n}`]=!1})}}#i({textureId:e,textOnTop:n=!1,noText:o=!1,outline:r=!1,label:i}){const s=new g({label:i});s.pivot={x:4,y:16};const a=new Ae({texture:le().textures[e],anchor:n?{x:.5,y:0}:{x:.5,y:1},filters:oo,y:n?0:8});s.addChild(a);const l=this.#r({outline:r==="text-only"});return l.y=n?0:16,l.x=a.x=Ct.w/2,s.addChild(l),o&&(l.visible=!1),r===!0&&(s.filters=K),{text:l,icon:a,container:s}}#l(e){const n=new Ae(le().textures[`${e}.walking.${e==="head"?"right":"towards"}.2`]);return n.anchor={x:.5,y:0},n}#r({doubleHeight:e=!1,outline:n=!1,label:o="text"}={}){return new g({label:o,filters:n?Sa:pn,scale:{x:1,y:e?2:1}})}#s({screenSize:e}){this.#t.head.hooter.container.x=this.#t.head.doughnuts.container.x=(e.x>>1)+Ne("head")*go,this.#t.head.doughnuts.container.y=e.y-Ve.h-8,this.#t.heels.carrying.container.y=e.y-Ve.h,this.#t.heels.carrying.container.x=this.#t.heels.bag.container.x=(e.x>>1)+Ne("heels")*go,this.#t.heels.bag.container.y=this.#t.head.hooter.container.y=e.y-8,this.#t.fps.x=e.x-Ct.w*2}#a(e,n){return e?n?me:Ge:n?eo:He}#c(e){const{renderContext:{gameState:n}}=this,o=ut(n,"heels"),r=o?.hasBag??!1,i=o?.carrying??null,{renderContext:{colourise:s}}=this,{container:a}=this.#t.heels.carrying,l=a.children.length>0;if(i===null&&l)for(const c of a.children)c.destroy();i!==null&&!l&&a.addChild(Jr(i)),a.filters=this.#a(!0,s),this.#t.heels.bag.icon.filters=this.#a(r,s)}#f(e){const{renderContext:{gameState:n}}=this,o=ut(n,"head"),r=o?.hasHooter??!1,i=o?.doughnuts??0,{renderContext:{colourise:s}}=this;this.#t.head.hooter.icon.filters=this.#a(r,s),this.#t.head.doughnuts.icon.filters=this.#a(i!==0,s),ke(this.#t.head.doughnuts.text,i)}#h(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=ut(r,e),{text:s,container:a}=this.#t[e].shield,{text:l,container:c}=this.#t[e].extraSkill,u=kt(i),d=u>0||!o;a.visible=d,d&&(ke(s,u),a.y=n.y-ml(o)),c.x=a.x=(n.x>>1)+Ne(e)*hl(o,n);const f=i===void 0?0:e==="head"?Nr(i):i.bigJumps,h=f>0||!o;c.visible=h,h&&(ke(l,f),c.y=n.y-pl(o))}#u(e,n){const{currentCharacterName:o}=e;return o===n||o==="headOverHeels"}#p(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,i=this.#u(r,e),s=this.#t[e].sprite,{renderContext:{colourise:a}}=this;i?s.filters=a?me:Ge:s.filters=a?eo:He,s.x=(n.x>>1)+Ne(e)*fl(o),s.y=n.y-Ve.h}#m(e,{screenSize:n}){const{renderContext:{onScreenControls:o,gameState:r}}=this,s=ut(r,e)?.lives??0,a=this.#t[e].livesText;a.x=(n.x>>1)+Ne(e)*dl(o),a.y=n.y,ke(a,s??0)}#g(e){const{room:n}=e;if(n===void 0)return;const o=Pn(n.color),{colourise:r,gameState:i}=this.renderContext;He.targetColor=o.hud.dimmed[r?"dimmed":"original"],pn.targetColor=o.hud.dimmed[r?"basic":"original"],oo.targetColor=o.hud.icons[r?"basic":"original"],Ge.targetColor=o.hud.lives.original,this.#t.head.livesText.filters=r?mt.colourised.head[this.#u(i,"head")?"active":"inactive"]:mt.original,this.#t.heels.livesText.filters=r?mt.colourised.heels[this.#u(i,"heels")?"active":"inactive"]:mt.original}#d=qi;#b(){if(Wi(x.getState())){if(performance.now()>this.#d+ul){const e=je.shared.FPS;ke(this.#t.fps,Math.round(e)),ro.targetColor=e>100?m.white:e>58?m.moss:e>55?m.pastelBlue:e>50?m.metallicBlue:e>40?m.pink:m.midRed,this.#d=performance.now()}this.#t.fps.visible=!0}else this.#t.fps.visible=!1}tick(e){this.#g(e);for(const n of Nt)this.#m(n,e),this.#p(n,e),this.#h(n,e);this.#s(e),this.#f(e),this.#c(e),this.#b(),this.#n?.tick(e)}get output(){return this.#e}destroy(){this.#e.destroy(),this.#n?.destroy()}}const bo={movementType:"vel",vels:{gravity:O}},bl=(t,e,n,o)=>{if(!ye(t))return bo;const{type:r,state:{vels:{gravity:{z:i}},standingOnItemId:s}}=t,l=Is[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];if(s!==null){const c=De(s,e);return G("lift")(c)&&c.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(i-ln*o,-l)}}}:bo}else return{movementType:"vel",vels:{gravity:{z:Math.max(i-ln*o,-l)}}}},vo=z.h,yo=.001,vl=({totalDistance:t,currentAltitude:e,direction:n})=>{const o=$n**2/(2*Le);if(n==="up"){if(e<=o)return Math.max(yo,Math.sqrt(2*Le*Math.max(e,0)));if(e>=t-o){const r=Math.max(0,t-e);return Math.max(yo,Math.sqrt(2*Le*r))}else return $n}else if(e>=t-o){const r=Math.max(0,t-e);return Math.min(-.001,-Math.sqrt(2*Le*r))}else return e<=o?Math.min(-.001,-Math.sqrt(2*Le*Math.max(e,0))):-.036};function yl({config:{bottom:t,top:e},state:{direction:n,position:{z:o}}}){const r=t*vo,i=e*vo,s=vl({currentAltitude:o-r,direction:n,totalDistance:i-r});if(Number.isNaN(s))throw new Error("velocity is NaN");const a=o<=r?"up":o>=i?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:s}},stateDelta:{direction:a}}}const xo={movementType:"vel",vels:{movingFloor:O}},xl=(t,e,n,o)=>{if(L(t)&&t.state.teleporting!==null)return xo;const{state:{standingOnItemId:r}}=t,i=De(r,e);if(i===null||!G("conveyor")(i))return xo;const{config:{direction:s}}=i,l=G("heels")(t)&&t.state.action==="moving"&&xn(t.state.facing)===Ji(s)?he.heels:Os;return{movementType:"vel",vels:{movingFloor:A(rn[s],l)}}};function*wl(t,e,n,o){for(;(t.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<e.roomTime;){const{positionDelta:r}=t.state.latentMovement.shift();yield{movementType:"position",posDelta:r}}}const Cl=z.w*Math.sqrt(2)+1,Sl=(t,e,n,o)=>{const{inputStateTracker:r}=n,i=t.type==="head"?t.state:t.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=t,f=500,h=be(d);if(r.currentActionPress("fire")==="tap"&&a&&et(s)>0&&l+f<c){const b={type:"firedDoughnut",..._s,config:ae,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:U(u,A(h,Cl),t.type==="headOverHeels"?{z:z.h}:O),vels:{fired:A(h,he.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:{}}};Tn({room:e,item:b}),i.doughnuts=re(i.doughnuts,-1),i.doughnutLastFireTime=i.gameTime}},ai=Object.freeze({movementType:"steady",stateDelta:{activated:!0}}),Tl=Object.freeze({movementType:"steady",stateDelta:{activated:!1}}),yt=z.w*3,kl=(t,e)=>{const{state:{position:n}}=t,{state:{position:o}}=e;return n.x>o.x-yt&&n.x<o.x+yt&&n.y>o.y-yt&&n.y<o.y+yt},wo=(t,e,n,o,r)=>{if(r&&t.state.activated)return q;const i=Fn(t.state.position,e);return i===void 0?q:kl(t,i)?ai:Tl},Il=(t,e,n,o)=>t.state.activated?q:it(t.state.stoodOnBy,e).some(L)?ai:q,Ol=(t,e,n,o)=>{switch(t.config.activated){case"after-player-near":return wo(t,e,n,o,!0);case"while-player-near":return wo(t,e,n,o,!1);case"on-stand":return Il(t,e);case"off":case"on":return q;default:throw t.config,new Error(`unrecognised item.config.activation ${t.config.activated} in ${t.id}:
        ${JSON.stringify(t,null,2)}`)}},_l=2;function*Pl(t,e,n,o){xe(t)&&(yield bl(t,e,n,o),yield xl(t,e),yield*wl(t,e)),L(t)&&(yield oi(t,e,n,o),t.id===n.currentCharacterName&&(yield Ga(t,e,n,o),yield ni(t,e,n),Ps(t)&&el(t,e,n,o),Bs(t)&&Sl(t,e,n))),Fs(t)&&(yield yl(t)),As(t)&&(yield Ol(t,e,n,o),yield $a(t,e,n,o))}const Bl=(t,e,n,o)=>{if(!xe(t)||t.state.standingOnItemId===null)return;const r=De(t.state.standingOnItemId,e);L(t)&&r.type==="pickup"&&Qr({gameState:n,movingItem:t,touchedItem:r,room:e}),(r.state.disappear==="onStand"||r.state.disappear==="onTouch"||L(t)&&r.state.disappear==="onTouchByPlayer")&&er({touchedItem:r,gameState:n,room:e})},Fl=(t,e,n,o)=>{if(L(t)&&t.state.standingOnItemId!==null){const l=De(t.state.standingOnItemId,e);Yo(l)&&Zr({room:e,movingItem:t})}const r=[...Pl(t,e,n,o)];Bl(t,e,n);let i=ri(t,r);(xe(t)||G("lift")(t)||G("firedDoughnut")(t))&&(i=U(i,...ne(ee(t.state.vels)).map(l=>A(l,o))));const s=Math.ceil(Me(i)/_l),a=A(i,1/s);for(let l=0;l<s;l++)Sn({subjectItem:t,posDelta:a,gameState:n,room:e,deltaMS:o,onTouch:Mn})},Al=(t,e)=>{const n=t.characterRooms.headOverHeels;if(e.state.head.lives=re(e.state.head.lives,-1),e.state.heels.lives=re(e.state.heels.lives,-1),e.state.head.lastDiedAt=e.state.head.gameTime,e.state.heels.lastDiedAt=e.state.heels.gameTime,re(e.state.head.lives,e.state.heels.lives)===0){t.events.emit("gameOver");return}const r=et(e.state.head.lives)>0,i=et(e.state.heels.lives)>0;if(e.state.heels.carrying=null,r&&!i||!r&&i){const c=r?"head":"heels";t.currentCharacterName=c,de(t,e);const u=Nn(e)[c],d=Pe({gameState:t,playableItems:[u],roomId:n.id});t.characterRooms={[c]:d},t.entryState={[c]:Bt(u)};return}if(t.entryState.headOverHeels!==void 0){de(t,e);const c=Pe({gameState:t,playableItems:[e],roomId:n.id});t.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Nn(e);if(de(t,c),de(t,u),wn(c,u)){const d=rr({head:c,heels:u});de(t,d,"heels");const f=Pe({gameState:t,playableItems:[d],roomId:n.id});t.characterRooms={headOverHeels:f},t.entryState={headOverHeels:Bt(d)};return}else{const d=Pe({gameState:t,playableItems:[c,u],roomId:n.id});t.characterRooms={head:d,heels:d};return}}},Pe=({gameState:t,playableItems:e,roomId:n})=>{const{campaign:o}=t,r=sn({roomJson:o.rooms[n],roomPickupsCollected:t.pickupsCollected[n]??ae});for(const i of e)Tn({room:r,item:i}),(i.type==="head"||i.type==="headOverHeels")&&Ms(r,t);return r},de=(t,e,n=e.id)=>{const o=t.entryState[n];e.state={...e.state,...o,expires:null,standingOnItemId:null}},Ml=(t,e)=>{const n=ir(t,sr(e.type));if(e.state.lives!=="infinite"&&e.state.lives--,e.state.lastDiedAt=e.state.gameTime,e.type==="heels"&&(e.state.carrying=null),e.state.lives===0)if(delete t.characterRooms[e.id],n!==void 0){t.currentCharacterName=n.type;return}else{t.events.emit("gameOver");return}else{const o=t.characterRooms[e.type];de(t,e);const r=n===void 0?void 0:t.characterRooms[n.type];if(o===r){if(t.entryState.headOverHeels!==void 0){const a=rr({head:e.id==="head"?e:o.items.head,heels:e.id==="heels"?e:o.items.heels});de(t,a);const l=Pe({gameState:t,playableItems:[a],roomId:o.id});t.characterRooms={headOverHeels:l},t.currentCharacterName="headOverHeels";return}Tn({room:o,item:e});return}else{const s=Pe({gameState:t,playableItems:[e],roomId:o.id});t.characterRooms[e.id]=s;return}}},Dl=(t,e)=>{e.type==="headOverHeels"?Al(t,e):Ml(t,e),ze(t)===void 0&&x.dispatch(Yi({offerReincarnation:!0}))},zl=t=>{for(const e of ce(t.items))for(const n of it(e.state.stoodOnBy,t)){if(!t.items[n.id]){jn(n,t);continue}if(!Bn(n,e)){jn(n,t);const o=Yr(n,nr(t.items));o!==void 0&&Ko({above:n,below:o})}}},Ll=2*Ds,Rl=(t,e,n)=>{t.state.latentMovement.push({moveAtRoomTime:e.roomTime+Ll,positionDelta:n})},El=(t,e,n)=>{for(const o of t){const r=n[o.id];if(r===void 0)continue;const s={...qo(o.state.position,r),z:0};if(!ve(s,O))for(const a of it(o.state.stoodOnBy,e))Rl(a,e,s)}},Ul=(t,e)=>t.state.expires!==null&&t.state.expires<e.roomTime,$l=t=>{for(const e of ce(t.items)){const n=e.state.position;e.state.position=Zi(n)}},Nl=(t,e)=>{for(const n of ce(t.items))!xe(n)||t.roomTime===n.state.actedOnAt.roomTime||Qi(n.state.position)||(console.log(`snapping item ${n.id} to pixel grid (not acted on in tick)`),n.state.position=Ki(n.state.position),e.add(n))},jl=(t,e)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},o=n[t.type]??0,r=n[e.type]??0;return o-r},Vl=ae,Xl=(t,e)=>{if(t.gameSpeed>1){let n=new Set;for(let o=0;o<t.gameSpeed;o++){const r=Co(t,e),i=Ze(t)?.items??Vl;n=new Set(ne(cn(n,r)).filter(({id:s})=>i[s]!==void 0))}return n}return Co(t,e*t.gameSpeed)},Co=(t,e)=>{const{inputStateTracker:n}=t,o=Ze(t);if(o===void 0)return Wo;Hl(t,o,e);const r=Object.fromEntries(zs(o.items).map(([a,l])=>[a,l.state.position]));n.currentActionPress("swop")==="tap"&&jt(t),n.currentActionPress("swop.head")==="tap"&&jt(t,"head"),n.currentActionPress("swop.heels")==="tap"&&jt(t,"heels");for(const a of ee(o.items))Ul(a,o)&&(or({room:o,item:a}),L(a)&&Dl(t,a));const i=Object.values(o.items).sort(jl);for(const a of i){const l=ze(t);if(l===void 0||l.state.action==="death")break;if(o.items[a.id]!==void 0)try{Fl(a,o,t,e)}catch(c){throw console.error(c),new Error(`error caught while ticking item ${a.id}: ${c}`)}}zl(o),$l(o);const s=new Set(ne(ee(o.items)).filter(a=>r[a.id]===void 0||!ve(a.state.position,r[a.id])));return El(s,o,r),Nl(o,s),s},Hl=(t,e,n)=>{t.progression++,t.gameTime+=n,e.roomTime+=n;const o=ze(t);if(o!==void 0){if(o.type==="headOverHeels")o.state.head.gameTime+=n,o.state.heels.gameTime+=n;else if(o.state.gameTime+=n,t.characterRooms.head===t.characterRooms.heels){const i=ir(t,sr(o.type));i!==void 0&&(i.state.gameTime+=n)}}},So=(t,e)=>{const n=S(t),o=S(U(t,{x:e.x,z:e.z})),r=S(U(t,{y:e.y,z:e.z}));return{bottomCentre:n,topLeft:o,topRight:r}},Jt=(t,e,n,o,r=1e-5)=>o-r>t&&n<e-r,Gl=(t,e,n,o)=>{const r=So(t,e),i=So(n,o),s=r.topLeft.x,a=r.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=Jt(s,a,l,c),d=r.topRight.y-r.topRight.x/2,f=r.bottomCentre.y-r.bottomCentre.x/2,h=i.topRight.y-i.topRight.x/2,b=i.bottomCentre.y-i.bottomCentre.x/2,v=Jt(d,f,h,b),M=r.topLeft.y+r.topLeft.x/2,_=r.bottomCentre.y+r.bottomCentre.x/2,P=i.topLeft.y+i.topLeft.x/2,B=i.bottomCentre.y+i.bottomCentre.x/2,N=Jt(M,_,P,B);return u&&v&&N},ql=(t,e)=>{if(t.renders===!1||e.renders===!1||t.fixedZIndex!==void 0||e.fixedZIndex!==void 0)return 0;const n=t.state.position,o=t.renderAabb||t.aabb,r=e.state.position,i=e.renderAabb||e.aabb;if(!Gl(n,o,r,i))return 0;for(const s of es){const a=t.state.position[s],l=a+o[s],c=e.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return To(e)-To(t)},To=t=>t.state.position.x+t.state.position.y-t.state.position.z;class It extends Error{constructor(e,n,o){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${e.join(" -> ")}`,o),this.cyclicDependency=e,this.hasClosedCycle=n}}const Wl=t=>{const e=Jl(t);let n=e.length,o=n;const r=new Array(n),i={},s=Yl(e);for(;o--;)i[o]||a(e[o],o,new Set);return r;function a(l,c,u){if(u.has(l))throw new It([l],!1);if(i[c])return;i[c]=!0;const d=t.get(l)||new Set,f=Array.from(d);if(c=f.length){u.add(l);do{const h=f[--c];try{a(h,s.get(h),u)}catch(b){throw b instanceof It?b.hasClosedCycle?b:new It([l,...b.cyclicDependency],b.cyclicDependency.includes(l)):b}}while(c);u.delete(l)}r[--n]=l}};function Jl(t){const e=new Set;for(const[n,o]of t.entries()){e.add(n);for(const r of o)e.add(r)}return Array.from(e)}function Yl(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const ko=(t,e,n)=>{t.has(e)||t.set(e,new Set),t.get(e).add(n)},xt=(t,e,n)=>{const o=t.get(e);o!==void 0&&(o?.delete(n),o.size===0&&t.delete(e))},Zl=(t,e=new Set(ee(t)),n=new Map)=>{const o=new Map;for(const[r,i]of n)if(!t[r])n.delete(r);else for(const s of i)t[s]||xt(n,r,s);for(const r of e)if(r.renders)for(const i of ee(t)){if(!i.renders||o.get(i)?.has(r)||r===i)continue;const s=ql(r,i);if(ko(o,r,i),s===0){xt(n,r.id,i.id),xt(n,i.id,r.id);continue}const a=s>0?r.id:i.id,l=s>0?i.id:r.id;ko(n,a,l),xt(n,l,a)}return n},li=(t,e,n=3)=>{try{return{order:Wl(t),impossible:!1}}catch(o){if(o instanceof It){const r=o.cyclicDependency;return t.get(r[0])?.delete(r[1]),console.warn("cyclc dependency detected: ",r.join(" --front-of--> "),`breaking link ${r[0]} --front-of--> ${r[1]}`),{order:li(t,e,n-1).order,impossible:!0}}else throw o}};class Ql extends Wr{}const Io=(t,e)=>{e.poly([S({}),S({x:t.x}),S({x:t.x,y:t.y}),S({y:t.y})]).poly([S({}),S({z:t.z}),S({y:t.y,z:t.z}),S({y:t.y})]).poly([S({x:t.x}),S({x:t.x,z:t.z}),S(t),S({x:t.x,y:t.y})]).poly([S({z:t.z}),S({x:t.x,z:t.z}),S({x:t.x,y:t.y,z:t.z}),S({y:t.y,z:t.z})])},Oo=(t,e)=>{const n=new H;return Io(t,n),n.stroke({width:.5,color:e,alpha:1}),n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:e,alpha:.5})}),n.on("pointerleave",()=>{n.clear(),Io(t,n),n.stroke({width:.5,color:e,alpha:1})}),n},Kl={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class ec{constructor(e){this.renderContext=e;const{item:n}=e,o=Kl[n.type]??"rgba(255,255,255)";if(this.#e=new g({label:`ItemBoundingBoxRenderer ${n.id}`}),G("portal")(n)){const i=S(n.config.relativePoint);this.#e.addChild(new H().circle(i.x,i.y,5).stroke(o)),this.#e.addChild(new H().circle(i.x,i.y,2).fill(o))}this.#e.addChild(new H({label:"objectOrigin"}).circle(0,0,2).fill(o)),this.#e.addChild(Oo(n.aabb,o)),n.renderAabb&&this.#e.addChild(Oo(n.renderAabb,"rgba(184, 184, 255)")),this.#e.eventMode="static";let r;this.#e.on("pointerenter",()=>{if(r!==void 0)return;const i=`${n.id} ${n.type}
@(${n.state.position.x}, ${n.state.position.y}, ${n.state.position.z})}
#(${n.aabb.x}, ${n.aabb.y}, ${n.aabb.z})}`;this.#e.addChild(r=new da({text:i,style:{fill:o,fontSize:6,fontFamily:"Menlo"}})),r.resolution=4}),this.#e.on("pointerleave",()=>{r!==void 0&&(this.#e.removeChild(r),r=void 0)})}#e;tick(){}destroy(){this.#e.destroy({children:!0})}get output(){return this.#e}}class tc{constructor(e,n){this.renderContext=e,this.wrappedRenderer=n,this.#e=new g({label:`ItemPositionRenderer ${e.item.id}`,children:[n.output]}),this.#n()}#e;#n(){const e=S(this.renderContext.item.state.position);this.#e.x=e.x,this.#e.y=e.y}tick(e){this.wrappedRenderer?.tick(e),e.movedItems.has(this.renderContext.item)&&this.#n()}destroy(){this.#e.destroy({children:!0}),this.wrappedRenderer?.destroy()}get output(){return this.#e}}const nc=(t,e)=>{const n=e.getLocalBounds(),o=On.create({width:n.maxX-n.minX,height:n.maxY-n.minY});return e.x-=n.minX,e.y-=n.minY,t.render({container:e,target:o}),new Ae({texture:o,label:"shadowMaskSprite (of renderTexture)",pivot:{x:-n.minX,y:-n.minY}})},_o=(t,e,n)=>{const o=n&&{x:n.x??1,y:n.y??1},r=p({...typeof e=="string"?{textureId:e}:e,times:o});return r instanceof Ae?r:nc(t,r)};class oc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:{showShadowMasks:n}}}}=x.getState();n||(this.#e.filters=new la({alpha:.5}));const{item:o,pixiRenderer:r}=e,{shadowMask:{spriteOptions:i}}=o;if(i){const{times:s}=o.config,a=_o(r,i,s);o.shadowMask.relativeTo==="top"&&(a.y-=o.aabb.z),s&&(a.y-=((s.z??1)-1)*z.h),this.#e.addChild(a),n||(this.#e.mask=a)}this.#e.addChild(this.#n)}#e=new g({label:"ItemShadowRenderer"});#n=new g({label:"shadows"});#t={};destroy(){this.#e.destroy(!0)}tick({movedItems:e,progression:n}){const{item:o,pixiRenderer:r,room:i}=this.renderContext,s=e.has(o),a=o.state.position.z+o.aabb.z,l=ce(i.items).filter(function(f){return f.shadowCastTexture!==void 0}),c={id:o.id,state:{position:{...o.state.position,z:a}},aabb:{...o.aabb,z:Ls}},u=Object.groupBy(l,d=>{const f=this.#t[d.id]!==void 0,h=e.has(d);return!s&&!h?f?"keepUnchanged":"noShadow":wn(c,d)?f?"update":"create":"noShadow"});for(const d of cn(u.keepUnchanged,u.update))this.#t[d.id].renderedOnProgression=n;if(u.create)for(const d of u.create){const{times:f}=d.config,h=_o(r,d.shadowCastTexture,f);h.label=d.id,this.#n.addChild(h),this.#t[d.id]={sprite:h,renderedOnProgression:n}}for(const d of cn(u.create,u.update)){const{sprite:f}=this.#t[d.id],h=S({...ot(d.state.position,o.state.position),z:o.aabb.z});f.x=h.x,f.y=h.y}for(const[d,{sprite:f,renderedOnProgression:h}]of Pt(this.#t))h!==n&&(f.destroy(),delete this.#t[d]);this.#e.visible=(u.keepUnchanged?.length??0)+(u.update?.length??0)+(u.create?.length??0)>0}get output(){return this.#e}}const rc=(t,e,n,o)=>`${t}${o?".dark":""}.wall.${e}.${n}`,ic=(t,e,n)=>{const r=le().textures[`door.frame.${t.planet}.${e}.near`]!==void 0?t.planet:"generic",i=t.color.shade==="dimmed"&&le().textures[`door.frame.${r}.dark.${e}.${n}`]!==void 0;return`door.frame.${r}${i?".dark":""}.${e}.${n}`},wt=t=>D(({renderContext:{item:e}})=>Rs(e)?p({...typeof t=="string"?{textureId:t}:t,times:e.config.times}):p(t)),D=t=>({renderContext:e,currentlyRenderedProps:n,tickContext:o})=>n===void 0?{output:t({renderContext:e,previousRendering:null,tickContext:o}),renderProps:ae}:"no-update";function*sc({config:{direction:t,inHiddenWall:e,height:n}},o){const r=Mt(t),i=r==="y"?1:16;function*s(a){if(e){if(n!==0){const l=p({textureId:`generic.door.floatingThreshold.${r}`,...St(a,{y:-12*n})});l.filters=hn(o,r==="x"?"towards":"right",!0),yield l}}else{yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.base",...St(a,{})});for(let l=1;l<n;l++)yield p({pivot:{x:i,y:9},textureId:"generic.door.legs.pillar",...St(a,{y:-l*z.h})})}}yield*s(T({...ie,[r]:1})),yield*s(ie),e||(yield p({pivot:{x:16,y:z.h*n+13},textureId:`generic.door.legs.threshold.double.${r}`,...T({...ie,[r]:1})}))}const ci=(t,e)=>{const n=Mt(t),o=rt(n),r=8;return t==="towards"||t==="right"?S({[o]:e[o]-r}):ie},ac=D(({renderContext:{item:t,room:e}})=>Ke(sc(t,e),new g({filters:oe(e),...ci(t.config.direction,t.aabb)}))),lc=D(({renderContext:{item:{config:{direction:t,part:e,toRoom:n},aabb:o},room:r,gameState:{campaign:i}}})=>{const s=Mt(t),a=i.rooms[n];return p({textureId:ic(r,s,e),filter:oe(a),...ci(t,o)})}),Yt={animationId:"bubbles.cold"},Be=({top:t,bottom:e="homingBot",filter:n})=>{const o=new g({filters:n});o.addChild(p(e));const r=p(t);return r.y=-12,o.addChild(r),o},ui=Symbol(),di=Symbol(),cc=({top:t,bottom:e})=>{const n=new g;return n.addChild(e),t.y=-12,n.addChild(t),n[ui]=t,n[di]=e,n},uc=`#version 300 es

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
`;class Po extends W{constructor(e){const n=$.from({vertex:st,fragment:uc,name:"oneColour-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uColour:{value:new Float32Array(3),type:"vec3<f32>"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[r,i,s]=e.toArray();o.uColour[0]=r,o.uColour[1]=i,o.uColour[2]=s}}const dc=({name:t,action:e,facingXy8:n,teleportingPhase:o,paused:r})=>{if(e==="death")return{animationId:`${t}.fadeOut`,paused:r};if(o==="out")return{animationId:`${t}.fadeOut`,paused:r};if(o==="in")return{animationId:`${t}.fadeOut`,paused:r};if(e==="moving")return{animationId:`${t}.walking.${n}`,paused:r};if(e==="falling"){const s=`${t}.falling.${n}`;if(ns(s))return{textureId:s}}const i=`${t}.idle.${n}`;return os(i)?{animationId:i,paused:r}:{textureId:`${t}.walking.${n}.2`}},gn=Symbol(),bn=Symbol(),fc=(t,e)=>{t[gn].removeChildren(),t[gn].addChild(p(dc(e)))},Zt=(t,e,n)=>{const o=new g,r=new g;o[gn]=r,o.addChild(r);const i=p({animationId:e?`shine.${t}InSymbio`:"shine",paused:n,filter:t==="heels"?new we({pastelBlue:m.pink}):me,flipX:t==="heels"});return o[bn]=i,o},Bo=({gameTime:t,switchedToAt:e},n,o)=>(n==="headOverHeels"||n===o)&&e+Es>t,hc=t=>{if(!qe(t))return!1;const{gameTime:e,lastDiedAt:n}=t.type==="headOverHeels"?t.state.head:t.state;return(e-n)%Vn<Vn*.15},Fo=(t,e)=>{t.filters?Array.isArray(t.filters)?t.filters=[...t.filters,e]:t.filters=[t.filters,e]:t.filters=e},Ao=(t,e)=>{t.filters=Array.isArray(t.filters)?t.filters.filter(n=>!(n instanceof e)):t.filters instanceof e?me:t.filters},pc=(t,{highlighted:e,flashing:n},o,r)=>{const i=o?.highlighted??!1;e&&!i?Fo(r,new Fe({outlineColor:_e[t],upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1})):!e&&i&&Ao(r,Fe);const s=o?.flashing??!1;n&&!s?Fo(r,new Po(_e[t])):!n&&s&&Ao(r,Po)},mc=(t,e,n)=>{e&&!n?t.addChild(t[bn]):!e&&n&&t.removeChild(t[bn])},Qt=(t,e,n,o,r,i)=>{n&&fc(e,{name:t,...o,paused:r}),pc(t,o,i,e),mc(e,o.shining,i?.shining??!1)},Kt=({currentlyRenderedProps:t,renderContext:{item:e,gameState:n,paused:o},previousRendering:r})=>{const{type:i,state:{action:s,facing:a,teleporting:l}}=e,c=Vo(a)??"towards",u=e.type==="headOverHeels"?Bo(e.state.head,"headOverHeels","headOverHeels"):Bo(e.state,e.type,n.currentCharacterName),d=hc(e),f=$r(e),h=Me(a),b=l?.phase??null,v={action:s,facingXy8:c,teleportingPhase:b,flashing:d,highlighted:u,shining:f},M=t===void 0||t.action!==s||t.facingXy8!==c||t.teleportingPhase!==b;let _;if(i==="headOverHeels"){_=r??cc({top:Zt("head",!0,o),bottom:Zt("heels",!0,o)});const P=_;Qt("head",P[ui],M,v,o,t),Qt("heels",P[di],M,v,o,t)}else _=r??Zt(i,!1,o),Qt(i,_,M,v,o,t);return s==="moving"&&r instanceof Qe&&(r.animationSpeed=h*ts),{output:_,renderProps:v}},gc=(t,e)=>{const n=([s,a])=>a.config.direction==="away"||a.config.direction==="left",o=new g({label:"floorOverdraws",...T({x:-e.x,y:-e.y})}),r=Ke(ne(Pt(t.items)).filter(s=>s[1].type==="wall").filter(n).map(([s,{config:{times:a,direction:l},position:c}])=>p({textureId:"floorOverdraw.cornerNearWall",label:s,...T(c),times:a,anchor:{x:0,y:1},flipX:l==="away"})),new g({label:"floorOverdraws"})),i=Ke(ne(Pt(t.items)).filter(s=>s[1].type==="door").filter(n).map(([s,{config:{direction:a},position:l}])=>l.z===0?p({textureId:"floorOverdraw.behindDoor",label:s,...T(St(l,{x:.5,y:.5})),anchor:{x:0,y:1},flipX:a==="away"}):p({textureId:"floorOverdraw.cornerNearWall",label:s,...T({...l,z:0}),times:{[rt(Je(a))]:2},anchor:{x:0,y:1},flipX:a==="away"})),new g({label:"doorOverdraws"}));return o.addChild(r),o.addChild(i),o},bc=t=>[...ne(ee(t.items)).filter(e=>e.type==="wall").filter(e=>Je(e.config.direction)==="x"?e.position.x!==0&&e.position.x!==t.size.x:e.position.y!==0&&e.position.y!==t.size.y)],vc=t=>{if(t.length===0)return;const e={};for(const n of t){const{config:{direction:o,times:r},position:{x:i,y:s}}=n;o==="left"||o==="right"?(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],s),e[o][1]=Math.max(e[o][1],s+(r?.y??1)-1)):(o==="towards"||o==="away")&&(e[o]||(e[o]=[1/0,-1/0]),e[o][0]=Math.min(e[o][0],i),e[o][1]=Math.max(e[o][1],i+(r?.x??1)-1))}return e},yc=({extraWallRanges:t,blockXMin:e,blockYMin:n})=>new H().poly((t.towards?[{x:t.towards[0]-.5+e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[0]-.5+n},{x:t.towards[1]+.5-e,y:t.right[1]+.5-n},{x:t.towards[0]-.5+e,y:t.right[1]+.5-n}]:[{x:t.away[0]+1,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[0]+.5-n},{x:t.away[1]+2.5,y:t.left[1]+2.5-n},{x:t.away[0]+1,y:t.left[1]+2.5-n}]).map(T),!0).fill(0),xc=D(({renderContext:{room:t,item:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=Lt(t.roomJson),c=r-n,u=i-o,{floor:d,color:{shade:f},roomJson:h}=t,b=new g({label:`floor(${t.id})`});if(d!=="none"){const P=d==="deadly"?`generic${f==="dimmed"?".dark":""}.floor.deadly`:`${d}${f==="dimmed"?".dark":""}.floor`,B=new g;for(let F=-1;F<=r+2;F++)for(let j=F%2-1;j<=i+2;j+=2)B.addChild(Us({x:F+(s.right?-.5:0),y:j+(s.towards?-.5:0)},p({textureId:P})));B.addChild(gc(h,{x:n,y:o}));const N=new H().poly([ie,T({x:c,y:0}),T({x:c,y:u}),T({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});B.addChild(N),B.filters=oe(t),B.mask=N,b.addChild(B)}const v=bc(h),M=new H().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);b.addChild(M);const _=vc(v);if(_!==void 0){const P=yc({extraWallRanges:_,blockXMin:n,blockYMin:o});b.addChild(P)}return b.mask=M,b.y=-e.aabb.z,b.cacheAsTexture(!0),b}),wc=({blockXMin:t,blockYMin:e},n)=>{const o=s=>s[1].config.direction==="towards"||s[1].config.direction==="right",r=T({x:-t,y:-e}),i={towards:new g({label:"towards",...r}),right:new g({label:"right",...r})};return ne(Pt(n.items)).filter(s=>s[1].type==="wall"||s[1].type==="door").filter(o).forEach(([s,a])=>{const{config:{direction:l},position:c}=a,u=l==="right"&&c.x===0,d=l==="towards"&&c.y===0,f=u?{...c,x:t,z:0}:d?{...c,y:e,z:0}:{...c,z:0},h=p({label:s,textureId:`floorEdge.${l}`,...T(f),times:a.type==="wall"?a.config.times:{[rt(Je(l))]:2}});i[l].addChild(h),l==="right"&&c.y===0&&e<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(f,{y:-.5}))})),l==="towards"&&c.x===0&&t<0&&i[l].addChild(p({label:`${s}-wxtraHalf`,textureId:`floorEdge.half.${l}`,...T(U(f,{x:-.5}))}))}),i},Cc=D(({renderContext:{colourised:t,room:e}})=>{const{blockXMin:n,blockYMin:o,blockXMax:r,blockYMax:i,edgeLeftX:s,edgeRightX:a}=Lt(e.roomJson),l=r-n,c=i-o,u=new g({label:"floorEdge"}),d=new H({label:"overDrawToHideFallenItems"}).poly([T({x:l,y:0}),T({x:0,y:0}),T({x:0,y:c}),{...T({x:0,y:c}),y:999},{...T({x:l,y:0}),y:999}],!0).fill(0);d.y=8,u.addChild(d);const{towards:f,right:h}=wc({blockXMin:n,blockYMin:o},e.roomJson);f.filters=hn(e,"towards",t),h.filters=hn(e,"right",t),u.addChild(f),u.addChild(h);const b=new H({label:"floorMaskCutOffLeftAndRight"}).poly([{x:s,y:999},{x:s,y:-999},{x:a,y:-999},{x:a,y:999}],!0).fill(16776960);return u.addChild(b),u.mask=b,u.cacheAsTexture(!0),u}),Sc=["cyberman","dalek","skiHead","bubbleRobot","computerBot","turtle"],Tc=({renderContext:{item:{config:t,state:e},room:n,paused:o},currentlyRenderedProps:r})=>{const{activated:i,busyLickingDoughnutsOffFace:s}=e,a=s?va:i?void 0:Sc.includes(t.which)?Xr(n):void 0;switch(t.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const l=xn(e.facing)??"towards";if(!(r===void 0||i!==r.activated||s!==r.busyLickingDoughnutsOffFace||l!==r.facingXy4))return"no-update";const u={facingXy4:l,activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"skiHead":return{output:p({textureId:`${t.which}.${t.style}.${l}`,filter:a}),renderProps:u};case"elephantHead":return{output:p({textureId:`elephant.${l}`,filter:a}),renderProps:u};case"turtle":return{output:p(i&&!s?{animationId:`${t.which}.${l}`,filter:a}:{textureId:`${t.which}.${l}.1`,filter:a}),renderProps:u};case"cyberman":return{output:e.activated||e.busyLickingDoughnutsOffFace?Be({top:{textureId:`${t.which}.${l}`,filter:a||oe(n)},bottom:{...Yt,paused:o}}):p({textureId:`${t.which}.${l}`,filter:a}),renderProps:u};case"computerBot":case"elephant":case"monkey":return{output:Be({top:`${t.which}.${l}`,filter:a}),renderProps:u};default:throw new Error(`unexpected monster ${t}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||s!==r.busyLickingDoughnutsOffFace||i!==r.activated))return"no-update";const c={activated:i,busyLickingDoughnutsOffFace:s};switch(t.which){case"helicopterBug":case"dalek":return{output:p(i&&!s?{animationId:t.which,filter:a}:{textureId:`${t.which}.1`,filter:a}),renderProps:c};case"homingBot":return{filter:a,output:p({textureId:t.which,filter:a}),renderProps:c};case"bubbleRobot":return{output:Be({top:{...Yt,paused:o},filter:a}),renderProps:c};case"emperorsGuardian":return{output:Be({top:"ball",bottom:{...Yt,paused:o},filter:a}),renderProps:c};case"emperor":return{output:p({animationId:"bubbles.cold",filter:a,paused:o}),renderProps:c};default:throw new Error(`unexpected monster ${t}`)}break}default:throw new Error(`unexpected monster ${t}`)}},tt=t=>{for(const e in t)return!0;return!1},kc=(t,e,n)=>e==="tower"?"tower":e==="book"?"book.x":e==="organic"&&t?`block.organic.dark${n?".disappearing":""}`:`block.${e}${n?".disappearing":""}`,en=m.moss,Mo=()=>D(({renderContext:{item:{config:{style:t}}}})=>p(t==="book"?"book.y":t)),Ic={head:Kt,heels:Kt,headOverHeels:Kt,doorFrame:lc,doorLegs:ac,monster:Tc,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:D(({renderContext:{item:{id:t,config:{direction:e,tiles:n}},room:o}})=>{if(e==="right"||e==="towards")throw new Error(`this wall should be non-rendering ${t}`);const r=rt(Je(e)),i=new g({label:"wallTiles"});for(let s=0;s<n.length;s++){const a=p({textureId:rc(o.planet,n[s],e,o.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:Xe.w,y:Xe.h+1}:{x:0,y:Xe.h+1},filter:oe(o)}),l=T({[r]:s});a.x+=l.x,a.y+=l.y,i.addChild(a)}return i}),barrier:D(({renderContext:{item:{config:{axis:t,times:e}}}})=>p({textureId:`barrier.${t}`,times:e})),deadlyBlock:D(({renderContext:{item:{config:{style:t,times:e}},room:n}})=>p({textureId:t,filter:t==="volcano"?oe(n):void 0,times:e})),slidingDeadly:Mo(),slidingBlock:Mo(),block({renderContext:{item:{config:{style:t,times:e},state:{disappear:n}},room:o},currentlyRenderedProps:r}){return r===void 0||r.disappear!==n?{output:p({textureId:kc(o.color.shade==="dimmed",t,n!==null),filter:t==="organic"?oe(o):void 0,times:e}),renderProps:{disappear:n}}:"no-update"},switch({renderContext:{item:{state:{setting:t},config:e}},currentlyRenderedProps:n}){const o=e.type==="in-store"?yn(x.getState(),e.path)?"right":"left":t;return n===void 0||o!==n.setting?{output:p(`switch.${o}`),renderProps:{setting:o}}:"no-update"},conveyor({renderContext:{item:{config:{direction:t,times:e},state:{stoodOnBy:n}},paused:o},currentlyRenderedProps:r}){const i=tt(n);if(!(r===void 0||r.moving!==i))return"no-update";const a=new g,l=Je(t);return a.addChild(p(i?{animationId:`conveyor.${l}`,reverse:t==="towards"||t==="right",times:e,paused:o}:{textureId:`conveyor.${l}.6`,times:e})),{output:a,renderProps:{moving:i}}},lift:D(({renderContext:{paused:t}})=>{const e=new g,n={x:Ve.w/2,y:Ve.h};return e.addChild(p({animationId:"lift",pivot:n,paused:t})),e.addChild(p({textureId:"lift.static",pivot:n})),e}),teleporter({renderContext:{item:t,room:e,paused:n},currentlyRenderedProps:o}){const{state:{stoodOnBy:r},config:{times:i}}=t,s=An(t),a=s&&it(r,e).find(L)!==void 0;return o===void 0||s!==o.activated||a!==o.flashing?{output:a?new g({children:[p({textureId:"teleporter",times:i}),p({animationId:"teleporter.flashing",times:i,paused:n})]}):p({textureId:s?"teleporter":"block.artificial",times:i}),renderProps:{flashing:a,activated:s}}:"no-update"},pickup:D(({renderContext:{item:{config:t},room:e,paused:n}})=>{if(t.gives==="crown")return p({textureId:`crown.${t.planet}`});const r={shield:"whiteRabbit",jumps:"whiteRabbit",fast:"whiteRabbit","extra-life":"whiteRabbit",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{textureId:"scroll",filter:oe(e)},reincarnation:{animationId:"fish",paused:n}}[t.gives];return p(r)}),moveableDeadly:D(({renderContext:{item:{config:{style:t}}}})=>p(t==="deadFish"?"fish.1":"puck.deadly")),charles({renderContext:{item:{state:{facing:t}}},currentlyRenderedProps:e}){const n=xn(t)??"towards";return e===void 0||n!==e.facingXy4?{output:Be({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},joystick:wt("joystick"),movingPlatform:D(({renderContext:{item:{config:{style:t}}}})=>p(t)),pushableBlock:D(({renderContext:{item:{config:{style:t}}}})=>p(t)),portableBlock({renderContext:{item:{config:{style:t},state:{wouldPickUpNext:e}}},currentlyRenderedProps:n}){if(!(n===void 0||e!==n.highlighted))return"no-update";const r=e?new Fe({outlineColor:en,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0;return{output:p({textureId:t,filter:r}),renderProps:{highlighted:e}}},spring({renderContext:{item:{state:{stoodOnBy:t,wouldPickUpNext:e}},paused:n},currentlyRenderedProps:o,previousRendering:r}){const i=tt(t);if(!(o===void 0||e!==o.highlighted||i!==o.compressed))return"no-update";const a=o?.compressed??!1,l=e?new Fe({outlineColor:en,lowRes:!1,upscale:x.getState().gameMenus.upscale.gameEngineUpscale}):void 0,c=r!==null&&i===a&&e!==o?.highlighted;let u;return c?(r.filters=l??$o,u=r):u=p(!i&&a?{animationId:"spring.bounce",playOnce:"and-stop",filter:l,paused:n}:{textureId:i?"spring.compressed":"spring.released",filter:l}),{output:u,renderProps:{compressed:i,highlighted:e}}},sceneryPlayer({renderContext:{item:{config:{which:t,startDirection:e},state:{wouldPickUpNext:n}}},currentlyRenderedProps:o}){if(!(o===void 0||n!==o.highlighted))return"no-update";const i=n?new Fe({outlineColor:en,upscale:x.getState().gameMenus.upscale.gameEngineUpscale,lowRes:!1}):void 0;return{output:t==="headOverHeels"?Be({top:{textureId:`head.walking.${e}.2`,filter:i},bottom:{textureId:`heels.walking.${e}.2`,filter:i}}):p({textureId:`${t}.walking.${e}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:wt("hushPuppy"),bubbles:D(({renderContext:{item:{config:{style:t}},paused:e}})=>p({animationId:`bubbles.${t}`,paused:e})),firedDoughnut:wt({animationId:"bubbles.doughnut"}),ball:wt("ball"),floor:xc,floorEdge:Cc};class Oc{constructor(e,n){this.renderContext=e,this.componentRenderers=n,this.output={graphics:n.graphics?.output,sound:n.sound?.output}}output;tick(e){this.componentRenderers.graphics?.tick(e),this.componentRenderers.sound?.tick(e)}destroy(){this.componentRenderers.graphics?.destroy(),this.componentRenderers.sound?.destroy()}}const E=t=>{const e=typeof t=="string"?{soundId:t}:t,{playbackRate:n=1,soundId:o,connectTo:r,loop:i=!1,varyPlaybackRate:s=!1,gain:a=1}=e,l=y.createBufferSource(),c=Te()[o];if(l.buffer=c,l.loop=i,l.playbackRate.value=s?n-.05+Math.random()*.1:n,i?l.start(0,c.duration*Math.random()):l.start(),a!==1){const u=y.createGain();return u.gain.value=a,l.connect(u),r!==void 0&&u.connect(r),u}else return r!==void 0&&l.connect(r),l},nt=({start:t,loop:e,stop:n,connectTo:o})=>{let r,i=!1;return s=>{s!==i&&(s?t!==void 0?(r?.stop(),r=E({...t,connectTo:o}),e!==void 0&&(r.onended=()=>{r=E({...e,connectTo:o,loop:!0})})):e!==void 0&&(r=E({...e,connectTo:o,loop:!0})):(r!==void 0&&(r.stop(),r.onended=null),n!==void 0&&(r=E({...n,connectTo:o}))),i=!!s),r!==void 0&&typeof s=="number"&&s>0&&(r.playbackRate.value=s)}};class _c{constructor(e){this.renderContext=e,this.output.gain.value=4}output=y.createGain();#e=nt({loop:{soundId:"rollingBallLoop",playbackRate:.5},connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{sliding:e},standingOnItemId:n}}}}=this,o=(e.x!==0||e.y!==0)&&n!==null;this.#e(o)}destroy(){}}class Pc{constructor(e){this.renderContext=e;const{item:{config:{was:n}}}=e;n.type==="pickup"&&n.gives!=="scroll"&&E({soundId:"bonus",connectTo:this.output})}output=y.createGain();tick(){}destroy(){}}class Bc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#e.gain.value=.5,this.#n.connect(this.output),this.#n.gain.value=.3}output=y.createGain();#e=y.createGain();#n=y.createGain();#t=nt({start:{soundId:"servoStart",playbackRate:.5},loop:{soundId:"servoLoop",playbackRate:.5},stop:{soundId:"servoStop",playbackRate:.5},connectTo:this.#e});#o=nt({start:{soundId:"metalHit"},connectTo:this.#n});tick(){const{renderContext:{item:e,room:{roomTime:n,items:o}}}=this,{state:{actedOnAt:{roomTime:r,by:i},collidedWith:{roomTime:s,by:a}}}=e,l=n===r&&ne(zn(i)).some(u=>$s(o[u]));this.#t(l);const c=n===s&&!Ws(zn(a));this.#o(c)}destroy(){}}const tn=2;class Fc{constructor(e){this.renderContext=e}output=y.createGain();#e=nt({start:{soundId:"conveyorStart",playbackRate:tn},loop:{soundId:"conveyorLoop",playbackRate:tn},stop:{soundId:"conveyorEnd",playbackRate:tn},connectTo:this.output});tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=tt(e);this.#e(n)}destroy(){this.#e(!1)}}const Ac=3;class Mc{constructor(e){this.renderContext=e,this.output.gain.value=.7}output=y.createGain();#e=E({soundId:"helicopter",loop:!0,connectTo:this.output});tick(){const{renderContext:{item:{state:{vels:{lift:{z:e}}}}}}=this;this.#e.playbackRate.value=Math.max(.5,1+Ac*e)}destroy(){}}const Do={cyberman:{soundId:"jetpackTurnaround",gain:1.2},skiHead:"softBump",turtle:"softBump",dalek:{soundId:"mojoTurn",gain:.1}},zo={cyberman:"jetpackLoop",emperorsGuardian:"jetpackLoop",dalek:"mojoLoop",bubbleRobot:"bubbleRobotLoop",helicopterBug:"helicopter"};class Dc{constructor(e){this.renderContext=e,this.#e.connect(this.output),this.#n.connect(this.output),this.#n.gain.value=.66}output=y.createGain();#e=y.createGain();#n=y.createGain();#t=null;#o={facing:O,online:!1};tick(){const{renderContext:{item:e}}=this,{config:{which:n},state:{facing:o,activated:r,busyLickingDoughnutsOffFace:i}}=e,s=r&&!i,{facing:a,online:l}=this.#o;!ve(o,a)&&Do[n]!==void 0&&E(Do[n]).connect(this.#e),s!==l&&zo[n]!==void 0&&(s?this.#t=E({soundId:zo[n],playbackRate:1,varyPlaybackRate:!0,loop:!0,connectTo:this.#n}):(this.#t?.stop(),this.#t=null)),this.#o={facing:o,online:s}}destroy(){}}class nn{constructor(e){this.renderContext=e,this.#e.gain.value=2,this.#e.connect(this.output),this.#t.gain.value=1.2,this.#t.connect(this.output)}output=y.createGain();#e=y.createGain();#n=null;#t=y.createGain();#o={action:"idle",carrying:!1,teleportingPhase:null};tick(){const{renderContext:{item:e}}=this,{type:n,state:{action:o,teleporting:r}}=e,i=!!Ye(e)?.carrying,{action:s,carrying:a,teleportingPhase:l}=this.#o,c=r?r.phase:null;if(o==="moving"&&s!=="moving"){const u=Te()[n==="headOverHeels"?"heelsWalk":`${n}Walk`];this.#n=y.createBufferSource(),this.#n.buffer=u,this.#n.loop=!0,this.#n.connect(this.#e),this.#n.start()}if(o!=="moving"&&s==="moving"&&(this.#n.stop(),this.#n=null),a!==i)if(a){const u=Te().carry,d=y.createBufferSource();d.buffer=u,d.playbackRate.value=.95,d.connect(this.#t),d.start()}else{const u=Te().carry,d=y.createBufferSource();d.buffer=u,d.playbackRate.value=1.05,d.connect(this.#t),d.start()}if(c!==null&&c!==l)if(c==="in"){const u=Te().teleportIn,d=y.createBufferSource();d.buffer=u,d.connect(this.output),d.start()}else{const u=Te().teleportOut,d=y.createBufferSource();d.buffer=u,d.connect(this.output),d.start()}this.#o={action:o,carrying:i,teleportingPhase:c}}destroy(){}}class zc{constructor(e){this.renderContext=e}output=y.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e},config:{style:n}}}}=this;if(n!=="drum")return;const o=this.#e?.stoodOn??!1,r=tt(e);!o&&r&&E({soundId:"drum",connectTo:this.output}),this.#e={stoodOn:r}}destroy(){}}class Lc{constructor(e){this.renderContext=e,e.item.config.style==="stepStool"&&(this.scrapeBracketed=nt({loop:{soundId:"stepStoolScraping"},connectTo:this.output}),this.output.gain.value=.4)}output=y.createGain();scrapeBracketed;tick({movedItems:e}){if(this.scrapeBracketed!==void 0){const{renderContext:{item:n,room:{roomTime:o}}}=this,{state:{actedOnAt:{roomTime:r},standingOnItemId:i}}=n,s=o===r&&i!==null&&e.has(n);this.scrapeBracketed(s)}}destroy(){}}class Rc{constructor(e){this.renderContext=e}output=y.createGain();#e=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}}}}=this,n=this.#e?.stoodOn??!1,o=tt(e);n&&!o&&E({soundId:"springBoing",connectTo:this.output}),this.#e={stoodOn:o}}destroy(){}}class Ec{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=y.createGain();#e=y.createGain();#n=void 0;tick(){const{renderContext:{item:{state:{setting:e},config:n}}}=this,o=n.type==="in-store"?yn(x.getState(),n.path)?"right":"left":e,r=this.#n?.setting;r!==void 0&&r!==o&&E({soundId:"switchClick",playbackRate:o==="right"?.95:1.05,connectTo:this.#e}),this.#n={setting:o}}destroy(){}}class Uc{constructor(e){this.renderContext=e,this.#e.connect(this.output)}output=y.createGain();#e=y.createGain();#n=null;#t=void 0;tick(){const{renderContext:{item:{state:{stoodOnBy:e}},room:n}}=this,o=this.#t?.stoodOnByPlayer??!1,r=it(e,n).some(L);r&&!o&&(this.#n=E({soundId:"teleportWarningSiren",loop:!0,connectTo:this.#e})),!r&&o&&(this.#n?.stop(),this.#n=null),this.#t={stoodOnByPlayer:r}}destroy(){}}const $c={lift:Mc,switch:Ec,bubbles:Pc,head:nn,heels:nn,headOverHeels:nn,teleporter:Uc,monster:Dc,conveyor:Fc,spring:Rc,portableBlock:zc,charles:Bc,ball:_c,pushableBlock:Lc},Nc=t=>{const e=$c[t.item.type];if(e)return new e(t)};class jc{constructor(e,n){this.renderContext=e,this.childRenderer=n,n.output.connect(this.output);const{room:{size:{y:o,x:r}}}=e;this.roomMaxProjectedX=Vt(Xn({x:0,y:o})),this.roomMinProjectedX=Vt(Xn({x:r,y:0}))}output=y.createStereoPanner();roomMaxProjectedX;roomMinProjectedX;tick(e){this.childRenderer.tick(e);const n=this.renderContext.item.state.position,o=Math.min(1,Math.max(-1,(Vt(n)-this.roomMinProjectedX)/(this.roomMaxProjectedX-this.roomMinProjectedX)*2-1));this.output.pan.value=o}destroy(){this.childRenderer.destroy()}}const Vc=(t,e,n)=>{e!==void 0&&(e.eventMode="static",e.on("pointertap",()=>{n.events.emit("itemClicked",{item:t,container:e})}))},Xc=t=>t.item.shadowMask!==void 0,Hc=t=>{const e=x.getState(),n=rs(e),o=is(e),{item:r,gameState:i}=t,s=n==="all"||n==="non-wall"&&t.item.type!=="wall",a=[];if(t.item.renders){const d=Ic[r.type],f=new Ql(t,d);a.push(f),s&&(f.output.alpha=.66),o&&Xc(t)&&a.push(new oc(t))}s&&a.push(new ec(t));let l;if(a.length===0)l=void 0;else{const d=a.length===1?a[0]:new Gc(a,t);Vc(r,d.output,i),l=new tc(t,d)}const c=t.paused?void 0:Nc(t),u=c===void 0?void 0:new jc(t,c);return new Oc(t,{graphics:l,sound:u})};class Gc{constructor(e,n){this.renderContext=n,this.#e=e,this.#n.addChild(...e.map(o=>o.output))}#e;#n=new g({label:"CompositeRenderer"});tick(e){for(const n of this.#e)n.tick(e)}destroy(){for(const e of this.#e)e.destroy()}get output(){return this.#n}}const Se=.33,qc=ss()==="mobile"?-4:16,vn=Xe.h-Xe.w/2,Wc=he.heels,Jc=(t,e,n)=>{const{edgeLeftX:o,edgeRightX:r,frontSide:i,topEdgeY:s}=Lt(t.roomJson),a=o+i.x,l=r+i.x,c=(r+o)/2,u={x:n.x/2-c,y:n.y-qc-i.y-Math.abs(c/2)},d=u.x+a<0,f=u.x+l>n.x,h=u.y+s-vn<0;return(b,v,M)=>{if(b===void 0)return;const _=S(b.state.position),P=U(_,u),B={x:d&&P.x<n.x*Se?Math.min(-a,n.x*Se-_.x):f&&P.x>n.x*(1-Se)?Math.max(n.x-l,n.x*(1-Se)-_.x):u.x,y:h&&P.y<n.y*Se?n.y*Se-_.y:u.y};if(M)e.x=B.x,e.y=B.y;else{const N=Wc*v,F=ot(e,B),j=Go(F);if(j>N){const $t={x:F.x/j,y:F.y/j};e.x-=$t.x*N,e.y-=$t.y*N}else e.x=B.x,e.y=B.y}}},Yc=t=>{const{edgeLeftX:e,edgeRightX:n,frontSide:o,topEdgeY:r}=Lt(t);return new H().rect(e+o.x,r-vn,n-e,o.y-r+vn).stroke("red").rect(e+o.x,r,n-e,o.y-r).stroke("blue")};class Zc{constructor(e){this.renderContext=e;const{gameMenus:{userSettings:{displaySettings:n},upscale:o}}=x.getState();this.#t.label=`RoomRenderer(${e.room.id})`,this.initFilters(e.colourised,e.room.color),(n?.showBoundingBoxes??Jo.displaySettings.showBoundingBoxes)!=="none"&&this.#t.addChild(Yc(e.room.roomJson)),this.#s=Jc(e.room,this.#t,o.gameEngineScreenSize)}#e=new g({label:"items"});#n=new g({label:"floorEdge"});#t=new g({children:[this.#e,this.#n]});#o=y.createGain();output={sound:this.#o,graphics:this.#t};#i=!1;#l=new Map;#r=new Map;#s;initFilters(e,n){this.#e.filters=e?me:new R(Pn(n).main.original)}#a(e){const{room:n}=this.renderContext;for(const o of ce(n.items)){let r=this.#r.get(o.id);if(r===void 0){r=Hc({...this.renderContext,item:o}),this.#r.set(o.id,r);const i=o.type==="floorEdge"?this.#n:this.#e,{graphics:s,sound:a}=r.output;s&&(i.addChild(s),o.fixedZIndex&&(s.zIndex=o.fixedZIndex)),a&&a.connect(this.#o)}r.tick(e)}for(const[o,r]of this.#r.entries())n.items[o]===void 0&&(r.destroy(),this.#r.delete(o))}#c(e){const{order:n}=li(Zl(this.renderContext.room.items,e.movedItems,this.#l),this.renderContext.room.items);for(let o=0;o<n.length;o++){const r=this.#r.get(n[o]);if(r===void 0)throw new Error(`Item id=${n[o]} does not have a renderer - cannot assign a z-index`);r.output.graphics.zIndex=n.length-o}}tick(e){const n=this.#i?e:{...e,movedItems:new Set(ce(this.renderContext.room.items))};this.#s(ze(this.renderContext.gameState),n.deltaMS,!this.#i),this.#a(n),(!this.#i||n.movedItems.size>0)&&this.#c(n),this.#i=!0}destroy(){this.#t.destroy({children:!0}),this.#o.disconnect(),this.#r.forEach(e=>{e.destroy()})}}var Et=`in vec2 aPosition;
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
`,Kc=`struct CRTUniforms {
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
}`,eu=Object.defineProperty,tu=(t,e,n)=>e in t?eu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ot=(t,e,n)=>(tu(t,typeof e!="symbol"?e+"":e,n),n);const fi=class hi extends W{constructor(e){e={...hi.DEFAULT_OPTIONS,...e};const n=ge.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:Kc,entryPoint:"mainFragment"}}),o=$.from({vertex:Et,fragment:Qc,name:"crt-filter"});super({gpuProgram:n,glProgram:o,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:e.seed,type:"f32"},uTime:{value:e.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Ot(this,"uniforms"),Ot(this,"seed"),Ot(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,e)}apply(e,n,o,r){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,e.applyFilter(this,n,o,r)}get curvature(){return this.uniforms.uLine[0]}set curvature(e){this.uniforms.uLine[0]=e}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(e){this.uniforms.uLine[1]=e}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(e){this.uniforms.uLine[2]=e}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(e){this.uniforms.uLine[3]=e?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(e){this.uniforms.uNoise[0]=e}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(e){this.uniforms.uNoise[1]=e}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(e){this.uniforms.uVignette[0]=e}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(e){this.uniforms.uVignette[1]=e}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(e){this.uniforms.uVignette[2]=e}};Ot(fi,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let nu=fi;var ou=`
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
}`,ru=`struct KawaseBlurUniforms {
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
}`,iu=`
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
`,su=`struct KawaseBlurUniforms {
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
}`,au=Object.defineProperty,lu=(t,e,n)=>e in t?au(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,ue=(t,e,n)=>(lu(t,typeof e!="symbol"?e+"":e,n),n);const pi=class mi extends W{constructor(...e){let n=e[0]??{};(typeof n=="number"||Array.isArray(n))&&(We("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},e[1]!==void 0&&(n.quality=e[1]),e[2]!==void 0&&(n.clamp=e[2])),n={...mi.DEFAULT_OPTIONS,...n};const o=ge.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:n?.clamp?su:ru,entryPoint:"mainFragment"}}),r=$.from({vertex:Et,fragment:n?.clamp?iu:ou,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:r,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),ue(this,"uniforms"),ue(this,"_pixelSize",{x:0,y:0}),ue(this,"_clamp"),ue(this,"_kernels",[]),ue(this,"_blur"),ue(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(e,n,o,r){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,n,o,r);else{const l=Oe.getSameSizeTexture(n);let c=n,u=l,d;const f=this._quality-1;for(let h=0;h<f;h++)a=this._kernels[h]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,e.applyFilter(this,c,o,r),Oe.returnTexture(l)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,n)=>e+n+.5,0))}_generateKernels(){const e=this._blur,n=this._quality,o=[e];if(e>0){let r=e;const i=e/n;for(let s=1;s<n;s++)r-=i,o.push(r)}this._kernels=o,this._updatePadding()}};ue(pi,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let cu=pi;var uu=`in vec2 vTextureCoord;
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
`,du=`struct AdvancedBloomUniforms {
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
`,fu=`
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
`,hu=`struct ExtractBrightnessUniforms {
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
`,pu=Object.defineProperty,mu=(t,e,n)=>e in t?pu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,gi=(t,e,n)=>(mu(t,typeof e!="symbol"?e+"":e,n),n);const bi=class vi extends W{constructor(e){e={...vi.DEFAULT_OPTIONS,...e};const n=ge.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:hu,entryPoint:"mainFragment"}}),o=$.from({vertex:Et,fragment:fu,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),gi(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};gi(bi,"DEFAULT_OPTIONS",{threshold:.5});let gu=bi;var bu=Object.defineProperty,vu=(t,e,n)=>e in t?bu(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Ie=(t,e,n)=>(vu(t,typeof e!="symbol"?e+"":e,n),n);const yi=class xi extends W{constructor(e){e={...xi.DEFAULT_OPTIONS,...e};const n=ge.from({vertex:{source:Ut,entryPoint:"mainVertex"},fragment:{source:du,entryPoint:"mainFragment"}}),o=$.from({vertex:Et,fragment:uu,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:fe.WHITE}}),Ie(this,"uniforms"),Ie(this,"bloomScale",1),Ie(this,"brightness",1),Ie(this,"_extractFilter"),Ie(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new gu({threshold:e.threshold}),this._blurFilter=new cu({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,n,o,r){const i=Oe.getSameSizeTexture(n);this._extractFilter.apply(e,n,i,!0);const s=Oe.getSameSizeTexture(n);this._blurFilter.apply(e,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,e.applyFilter(this,n,o,r),Oe.returnTexture(s),Oe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};Ie(yi,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let yu=yi;const Lo=({crtFilter:t},e)=>[t?new nu({lineContrast:e?.3:0,vignetting:e?.4:.2}):void 0,t?new yu({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(n=>n!==void 0);class xu{constructor(e,n){this.app=e,this.#r=e,this.#s=n;try{const o=x.getState(),{gameMenus:{upscale:{gameEngineUpscale:r}}}=o;if(this.#l.connect(y.destination),e.stage.addChild(this.#i),e.stage.scale=r,Ze(n)===void 0)throw new Error("main loop with no starting room");this.#c()}catch(o){this.#a(o);return}}#e;#n;#t;#o;#i=new g({label:"MainLoop/world"});#l=y.createGain();#r;#s;#a(e){console.error(e),x.dispatch(as(ls(e,"message","stack")))}#c(){const{gameMenus:{userSettings:{displaySettings:e}}}=x.getState();this.#e=Lo(e,!0),this.#n=Lo(e,!1)}tickAndCatch=e=>{try{this.tick(e)}catch(n){this.#a(n)}};tick=({deltaMS:e})=>{const n=x.getState(),o=cs(n),{gameMenus:{userSettings:{displaySettings:r},upscale:i}}=x.getState(),s=Ze(this.#s),a=!o&&!(r?.uncolourised??Jo.displaySettings.uncolourised),l=us(n),c=ds(n);(this.#t?.renderContext.colourise!==a||this.#t?.renderContext.onScreenControls!==l||this.#t?.renderContext.inputDirectionMode!==c)&&(this.#t?.destroy(),this.#t=new gl({colourise:a,gameState:this.#s,inputDirectionMode:c,onScreenControls:l}),this.#r.stage.addChild(this.#t.output)),this.#t.tick({screenSize:i.gameEngineScreenSize,room:s});const u=o?Wo:Xl(this.#s,e);(this.#o?.renderContext.room!==s||this.#o?.renderContext.upscale!==i||this.#o?.renderContext.displaySettings!==r||this.#o?.renderContext.paused!==o)&&(this.#o?.destroy(),s?(this.#o=new Zc({gameState:this.#s,room:s,paused:o,pixiRenderer:this.#r.renderer,displaySettings:r,colourised:a,upscale:i}),this.#i.addChild(this.#o.output.graphics),this.#o.output.sound.connect(this.#l),this.#s.events.emit("roomChange",s.id)):this.#o=void 0,this.#r.stage.scale=i.gameEngineUpscale,this.#c()),this.#o?.tick({progression:this.#s.progression,movedItems:u,deltaMS:e}),o?this.#r.stage.filters=this.#e:this.#r.stage.filters=this.#n};start(){return this.#r.ticker.add(this.tickAndCatch),this}stop(){this.#r.stage.removeChild(this.#i),this.#l.disconnect(),this.#o?.destroy(),this.#t?.destroy(),this.#r.ticker.remove(this.tickAndCatch)}}At.add(cr,ur,dr,fr,hr,pr,mr,gr,br,vr,yr,wr,xr,Cr,Sr,Tr,kr,Ir,Or,_r,Pr);hs.defaultOptions.scaleMode="nearest";const Ro=async(t,e)=>{const n=new Rr;await n.init({background:"#000000",sharedTicker:!0,eventFeatures:{move:!0,globalMove:!0,click:!0,wheel:!1}});const o=x.getState().gameMenus.currentGame,r=Kn({campaign:t,inputStateTracker:e,savedGame:o});o!==void 0?x.dispatch(fs(o.store.gameMenus)):(x.dispatch(Ln(r.characterRooms.head.id)),x.dispatch(Ln(r.characterRooms.heels.id)));const i=new xu(n,r).start();return{campaign:t,events:r.events,renderIn(s){s.appendChild(n.canvas)},resizeTo(s){console.log("explicitly setting app renderer size to",s),n.renderer?.resize(s.x,s.y)},changeRoom(s){const a=ze(r);a!==void 0&&Cn({playableItem:a,gameState:r,toRoomId:s,changeType:"level-select"})},get currentRoom(){return Ze(r)},get gameState(){return r},reincarnateFrom(s){Kn({campaign:t,inputStateTracker:e,savedGame:s,writeInto:r})},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),i.stop(),n.destroy()}}},Iu=Object.freeze(Object.defineProperty({__proto__:null,default:Ro,gameMain:Ro},Symbol.toStringTag,{value:"Module"}));export{Mr as A,Br as C,W as F,On as R,ea as S,Dr as V,ia as a,Iu as g,Ks as u};
