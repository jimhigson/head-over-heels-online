const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/WebGPURenderer-E6wdZgHS.js","assets/index-QcYx0D2Q.js","assets/index-R289bh27.css","assets/colorToUniform-KTpA7KSL.js","assets/SharedSystems-fmtWczVq.js","assets/Graphics-AX8wDaE7.js","assets/changeCharacterRoom-Bzatz5Mt.js","assets/WebGLRenderer-D_eico0k.js"])))=>i.map(i=>d[i]);
import{af as Ar,aD as ve,aE as J,e as Xt,E as Ie,c as Dr,C as y,d as Ze,v as kt,aT as m,$ as _t,a$ as tn,a7 as Rr,aL as Ke,ag as Ce,T as Ee,U as Br,b0 as Er,ai as Mr,g as Ur,b1 as $r,b2 as Nr,b3 as ue,b4 as Un,aA as Lr,b5 as Xr,at as B,b6 as Oe,b7 as $n,b8 as Vr,an as F,ar as O,b9 as Pe,ba as Hr,aq as Vt,bb as xe,bc as Ht,ax as ce,bd as Qe,be as Gr,bf as qr,ao as _,am as Gt,bg as Ae,as as Nn,bh as Ln,ap as It,bi as nn,aB as De,bj as Wr,bk as jr,bl as Yr,bm as qt,aw as W,ay as I,bn as et,bo as Jr,au as Wt,bp as Zr,bq as Kr,br as Qr,bs as mt,bt as eo,bu as ke,av as to,bv as no,aI as fe,bw as ro,al as oo,bx as io}from"./index-QcYx0D2Q.js";import{l as Pt,f as tt,a as j,g as rn,e as U,h as on,s as le,j as Me,k as re,i as E,m as Ft,t as so,p as Ue,o as ao,n as lo,w as co,q as Y,r as uo,u as ho,v as fo,x as ye,y as gt,z as zt,A as sn,B as vt,c as jt,C as Z,D as Xn,E as Vn,F as it,G as H,H as st,I as Hn,J as an,K as Gn,L as po,M as At,N as mo,O as qn,d as go,P as Fe,Q as nt,R as me,S as vo,T as xo,U as yo,V as bo,W as ln,X as Dt,Y as Rt,Z as Bt,_ as wo,$ as ze,a0 as To,a1 as Co,b as at,a2 as C,a3 as V,a4 as lt,a5 as rt,a6 as Wn,a7 as So}from"./changeCharacterRoom-Bzatz5Mt.js";import{S as Oo,G as q}from"./Graphics-AX8wDaE7.js";const jn=class Et extends Ar{constructor(t){t={...Et.defaultOptions,...t},super(t),this.enabled=!0,this._state=Oo.for2d(),this.blendMode=t.blendMode,this.padding=t.padding,typeof t.antialias=="boolean"?this.antialias=t.antialias?"on":"off":this.antialias=t.antialias,this.resolution=t.resolution,this.blendRequired=t.blendRequired,this.clipToViewport=t.clipToViewport,this.addResource("uTexture",0,1)}apply(t,n,r,o){t.applyFilter(this,n,r,o)}get blendMode(){return this._state.blendMode}set blendMode(t){this._state.blendMode=t}static from(t){const{gpu:n,gl:r,...o}=t;let i,s;return n&&(i=ve.from(n)),r&&(s=J.from(r)),new Et({gpuProgram:i,glProgram:s,...o})}};jn.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"off",blendRequired:!1,clipToViewport:!0};let oe=jn;const Mt=[];Xt.handleByNamedList(Ie.Environment,Mt);async function ko(e){if(!e)for(let t=0;t<Mt.length;t++){const n=Mt[t];if(n.value.test()){await n.value.load();return}}}let be;function _o(){if(typeof be=="boolean")return be;try{be=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{be=!1}return be}var Yn=(e=>(e[e.NONE=0]="NONE",e[e.COLOR=16384]="COLOR",e[e.STENCIL=1024]="STENCIL",e[e.DEPTH=256]="DEPTH",e[e.COLOR_DEPTH=16640]="COLOR_DEPTH",e[e.COLOR_STENCIL=17408]="COLOR_STENCIL",e[e.DEPTH_STENCIL=1280]="DEPTH_STENCIL",e[e.ALL=17664]="ALL",e))(Yn||{});class Io{constructor(t){this.items=[],this._name=t}emit(t,n,r,o,i,s,a,l){const{name:c,items:u}=this;for(let d=0,p=u.length;d<p;d++)u[d][c](t,n,r,o,i,s,a,l);return this}add(t){return t[this._name]&&(this.remove(t),this.items.push(t)),this}remove(t){const n=this.items.indexOf(t);return n!==-1&&this.items.splice(n,1),this}contains(t){return this.items.indexOf(t)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}const Po=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],Jn=class Zn extends Dr{constructor(t){super(),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=t.type,this.name=t.name,this.config=t;const n=[...Po,...this.config.runners??[]];this._addRunners(...n),this._unsafeEvalCheck()}async init(t={}){const n=t.skipExtensionImports===!0?!0:t.manageImports===!1;await ko(n),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors);for(const r in this._systemsHash)t={...this._systemsHash[r].constructor.defaultOptions,...t};t={...Zn.defaultOptions,...t},this._roundPixels=t.roundPixels?1:0;for(let r=0;r<this.runners.init.items.length;r++)await this.runners.init.items[r].init(t);this._initOptions=t}render(t,n){let r=t;if(r instanceof y&&(r={container:r},n&&(Ze(kt,"passing a second argument is deprecated, please use render options instead"),r.target=n.renderTexture)),r.target||(r.target=this.view.renderTarget),r.target===this.view.renderTarget&&(this._lastObjectRendered=r.container,r.clearColor=this.background.colorRgba),r.clearColor){const o=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=o?r.clearColor:m.shared.setValue(r.clearColor).toArray()}r.transform||(r.container.updateLocalTransform(),r.transform=r.container.localTransform),r.container.enableRenderGroup(),this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(t,n,r){const o=this.view.resolution;this.view.resize(t,n,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),r!==void 0&&r!==o&&this.runners.resolutionChange.emit(r)}clear(t={}){const n=this;t.target||(t.target=n.renderTarget.renderTarget),t.clearColor||(t.clearColor=this.background.colorRgba),t.clear??(t.clear=Yn.ALL);const{clear:r,clearColor:o,target:i}=t;m.shared.setValue(o??this.background.colorRgba),n.renderTarget.clear(i,r,m.shared.toArray())}get resolution(){return this.view.resolution}set resolution(t){this.view.resolution=t,this.runners.resolutionChange.emit(t)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...t){t.forEach(n=>{this.runners[n]=new Io(n)})}_addSystems(t){let n;for(n in t){const r=t[n];this._addSystem(r.value,r.name)}}_addSystem(t,n){const r=new t(this);if(this[n])throw new Error(`Whoops! The name "${n}" is already in use`);this[n]=r,this._systemsHash[n]=r;for(const o in this.runners)this.runners[o].add(r);return this}_addPipes(t,n){const r=n.reduce((o,i)=>(o[i.name]=i.value,o),{});t.forEach(o=>{const i=o.value,s=o.name,a=r[s];this.renderPipes[s]=new i(this,a?new a:null)})}destroy(t=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(t),Object.values(this.runners).forEach(n=>{n.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(t){return this.textureGenerator.generateTexture(t)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!_o())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}};Jn.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};let Kn=Jn,$e;function Fo(e){return $e!==void 0||($e=(()=>{const t={stencil:!0,failIfMajorPerformanceCaveat:e??Kn.defaultOptions.failIfMajorPerformanceCaveat};try{if(!_t.get().getWebGLRenderingContext())return!1;let r=_t.get().createCanvas().getContext("webgl",t);const o=!!r?.getContextAttributes()?.stencil;if(r){const i=r.getExtension("WEBGL_lose_context");i&&i.loseContext()}return r=null,o}catch{return!1}})()),$e}let Ne;async function zo(e={}){return Ne!==void 0||(Ne=await(async()=>{const t=_t.get().getNavigator().gpu;if(!t)return!1;try{return await(await t.requestAdapter(e)).requestDevice(),!0}catch{return!1}})()),Ne}const cn=["webgl","webgpu","canvas"];async function Ao(e){let t=[];e.preference?(t.push(e.preference),cn.forEach(i=>{i!==e.preference&&t.push(i)})):t=cn.slice();let n,r={};for(let i=0;i<t.length;i++){const s=t[i];if(s==="webgpu"&&await zo()){const{WebGPURenderer:a}=await tn(async()=>{const{WebGPURenderer:l}=await import("./WebGPURenderer-E6wdZgHS.js");return{WebGPURenderer:l}},__vite__mapDeps([0,1,2,3,4,5,6]));n=a,r={...e,...e.webgpu};break}else if(s==="webgl"&&Fo(e.failIfMajorPerformanceCaveat??Kn.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:a}=await tn(async()=>{const{WebGLRenderer:l}=await import("./WebGLRenderer-D_eico0k.js");return{WebGLRenderer:l}},__vite__mapDeps([7,1,2,3,4,5,6]));n=a,r={...e,...e.webgl};break}else if(s==="canvas")throw r={...e},new Error("CanvasRenderer is not yet implemented")}if(delete r.webgpu,delete r.webgl,!n)throw new Error("No available renderer for the current environment");const o=new n;return await o.init(r),o}const Qn="8.6.6";class er{static init(){globalThis.__PIXI_APP_INIT__?.(this,Qn)}static destroy(){}}er.extension=Ie.Application;class Do{constructor(t){this._renderer=t}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,Qn)}destroy(){this._renderer=null}}Do.extension={type:[Ie.WebGLSystem,Ie.WebGPUSystem],name:"initHook",priority:-10};const tr=class Ut{constructor(...t){this.stage=new y,t[0]!==void 0&&Ze(kt,"Application constructor options are deprecated, please use Application.init() instead.")}async init(t){t={...t},this.renderer=await Ao(t),Ut._plugins.forEach(n=>{n.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return Ze(kt,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(t=!1,n=!1){const r=Ut._plugins.slice(0);r.reverse(),r.forEach(o=>{o.destroy.call(this)}),this.stage.destroy(n),this.stage=null,this.renderer.destroy(t),this.renderer=null}};tr._plugins=[];let nr=tr;Xt.handleByList(Ie.Application,nr._plugins);Xt.add(er);var Ro=`in vec2 aPosition;
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
`,Bo=`
in vec2 vTextureCoord;

out vec4 finalColor;

uniform float uAlpha;
uniform sampler2D uTexture;

void main()
{
    finalColor =  texture(uTexture, vTextureCoord) * uAlpha;
}
`,un=`struct GlobalFilterUniforms {
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
}`;const rr=class or extends oe{constructor(t){t={...or.defaultOptions,...t};const n=ve.from({vertex:{source:un,entryPoint:"mainVertex"},fragment:{source:un,entryPoint:"mainFragment"}}),r=J.from({vertex:Ro,fragment:Bo,name:"alpha-filter"}),{alpha:o,...i}=t,s=new Rr({uAlpha:{value:o,type:"f32"}});super({...i,gpuProgram:n,glProgram:r,resources:{alphaUniforms:s}})}get alpha(){return this.resources.alphaUniforms.uniforms.uAlpha}set alpha(t){this.resources.alphaUniforms.uniforms.uAlpha=t}};rr.defaultOptions={alpha:1};let Eo=rr;class ot extends Ke{constructor(...t){let n=t[0];Array.isArray(t[0])&&(n={textures:t[0],autoUpdate:t[1]});const{textures:r,autoUpdate:o,...i}=n,[s]=r;super({...i,texture:s instanceof Ce?s:s.texture}),this._textures=null,this._durations=null,this._autoUpdate=o??!0,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=r}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Ee.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Ee.shared.add(this.update,this,Br.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(t){this.stop(),this.currentFrame=t}gotoAndPlay(t){this.currentFrame=t,this.play()}update(t){if(!this._playing)return;const n=t.deltaTime,r=this.animationSpeed*n,o=this.currentFrame;if(this._durations!==null){let i=this._currentTime%1*this._durations[this.currentFrame];for(i+=r/60*1e3;i<0;)this._currentTime--,i+=this._durations[this.currentFrame];const s=Math.sign(this.animationSpeed*n);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*s,this._currentTime+=s;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=r;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):o!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<o||this.animationSpeed<0&&this.currentFrame>o)&&this.onLoop(),this._updateTexture())}_updateTexture(){const t=this.currentFrame;this._previousFrame!==t&&(this._previousFrame=t,this.texture=this._textures[t],this.updateAnchor&&this.anchor.copyFrom(this.texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(t){const n=[];for(let r=0;r<t.length;++r)n.push(Ce.from(t[r]));return new ot(n)}static fromImages(t){const n=[];for(let r=0;r<t.length;++r)n.push(Ce.from(t[r]));return new ot(n)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(t){if(t[0]instanceof Ce)this._textures=t,this._durations=null;else{this._textures=[],this._durations=[];for(let n=0;n<t.length;n++)this._textures.push(t[n].texture),this._durations.push(t[n].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let t=Math.floor(this._currentTime)%this._textures.length;return t<0&&(t+=this._textures.length),t}set currentFrame(t){if(t<0||t>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${t}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const n=this.currentFrame;this._currentTime=t,n!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,!this._autoUpdate&&this._isConnectedToTicker?(Ee.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Ee.shared.add(this.update,this),this._isConnectedToTicker=!0))}}var Le={},dn;function Mo(){if(dn)return Le;dn=1;var e=Er(),t=e.mark(i),n=Mr(),r=n.wrapWithIterableIterator,o=n.ensureIterable;function i(){var a,l,c,u,d,p,f=arguments;return e.wrap(function(g){for(;;)switch(g.prev=g.next){case 0:for(a=f.length,l=new Array(a),c=0;c<a;c++)l[c]=f[c];u=0,d=l;case 2:if(!(u<d.length)){g.next=8;break}return p=d[u],g.delegateYield(o(p),"t0",5);case 5:u++,g.next=2;break;case 8:case"end":return g.stop()}},t)}Le.__concat=i;var s=r(i);return Le.concat=s,Le}var xt,hn;function Uo(){return hn||(hn=1,xt=Mo().concat),xt}var $o=Uo();const je=Ur($o),No=e=>{const t={};for(const n of Object.values(e.rooms))for(const r of Object.values(n.items))if(r.type==="player"){const{which:o}=r.config;t[o]=n.id}if(t.head===void 0&&t.heels===void 0)throw new Error("couldn't find either head or heels in campaign");return t},Lo=({campaign:e,inputState:t})=>{const n=No(e),r=$r(Object.keys(e.rooms).map(s=>[s,{}])),o=n.head&&Pt(e.rooms[n.head],r[n.head],!0),i=n.heels===n.head?o:n.heels&&Pt(e.rooms[n.heels],r[n.heels],!0);return{currentCharacterName:n.head===void 0?"heels":"head",characterRooms:{head:o,heels:i},entryState:{head:o===void 0?void 0:tt(o.items.head),heels:i===void 0?void 0:tt(i.items.heels)},inputState:t,campaign:e,events:Nr(),pickupsCollected:r,gameTime:0,progression:0,gameSpeed:1}},b={pureBlack:new m("#000000"),lightBlack:new m("#2B463B"),shadow:new m("#325149"),midGrey:new m("#7F7773"),lightGrey:new m("#BBB1AB"),white:new m("#FBFEFB"),metallicBlue:new m("#366BAE"),pink:new m("#D68ED1"),moss:new m("#9E9600"),redShadow:new m("#805E50"),midRed:new m("#CA7463"),lightBeige:new m("#DAA78F"),highlightBeige:new m("#EBC690"),alpha:new m("#FBD042"),replaceLight:new m("#08A086"),replaceDark:new m("#187558")},Yt=`in vec2 aPosition;
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
`,Xo=`#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;

uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform vec3 uOutline;
uniform float uOutlineWidth;

void main(void) {
    vec4 c = texture(uTexture, vTextureCoord);

    if( c.a != 0.0 ) {
        finalColor = c;
        return;
    }

    vec2 texelSize = vec2(1.0) / vec2(textureSize(uTexture, 0));

    // right
    if( vTextureCoord.x + texelSize.x * uOutlineWidth >= 1.0 ) {
        finalColor = c;
        return;
    }
    vec4 cRight = texture(uTexture, vec2(vTextureCoord.x + texelSize.x * uOutlineWidth, vTextureCoord.y));

    if( cRight.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // left
    if( vTextureCoord.x - texelSize.x <= 0.0 ) {
        finalColor = c;
        return;
    }

    vec4 cLeft = texture(uTexture, vec2(vTextureCoord.x - texelSize.x * uOutlineWidth, vTextureCoord.y));

    if( cLeft.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }


    // down
    if( vTextureCoord.y + texelSize.y * uOutlineWidth > 1.0 ) {
        finalColor = c;
        return;
    }

    vec4 cDown = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y * uOutlineWidth));

    if( cDown.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }

    // up
    if( vTextureCoord.y - texelSize.y * uOutlineWidth < 0.0 ) {
        finalColor = c;
        return;
    }

    vec4 cUp = texture(uTexture, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y * uOutlineWidth));

    if( cUp.a != 0.0 ) {
        finalColor = vec4(uOutline, 1);
        return;
    }    

    finalColor = c;
}
`;class _e extends oe{constructor(t,n){const r=J.from({vertex:Yt,fragment:Xo,name:"outline-filter"});super({glProgram:r,padding:n,resources:{colorReplaceUniforms:{uOutline:{value:new Float32Array(3),type:"vec3<f32>"},uOutlineWidth:{value:new Float32Array(1),type:"f32"}}}});const o=this.resources.colorReplaceUniforms.uniforms,[i,s,a]=t.toArray();o.uOutline[0]=i,o.uOutline[1]=s,o.uOutline[2]=a,o.uOutlineWidth[0]=n}}const Vo=`precision mediump float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uSourceBlacks[2];
uniform vec3 uTargetColor;

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

    if ( colorsEffectivelyEqual(c.rgb, uSourceBlacks[0]) || colorsEffectivelyEqual(c.rgb, uSourceBlacks[1])) {
        finalColor = vec4(0,0,0, 1.0);
    } else {
        finalColor = vec4(uTargetColor, 1);    
    }
}
`,fn=[b.pureBlack,b.lightBlack];class Se extends oe{uniforms;constructor(t="white"){const n=J.from({vertex:Yt,fragment:Vo,name:"revert-colourise-filter"});super({glProgram:n,resources:{colorReplaceUniforms:{uSourceBlacks:{value:new Float32Array(6),type:"vec3<f32>",size:6},uTargetColor:{value:new Float32Array(3),type:"vec3<f32>"}}}}),this.uniforms=this.resources.colorReplaceUniforms.uniforms;const[r,o,i]=fn[0].toArray();this.uniforms.uSourceBlacks[0]=r,this.uniforms.uSourceBlacks[1]=o,this.uniforms.uSourceBlacks[2]=i;const[s,a,l]=fn[1].toArray();this.uniforms.uSourceBlacks[3]=s,this.uniforms.uSourceBlacks[4]=a,this.uniforms.uSourceBlacks[5]=l,this.targetColor=t}set targetColor(t){const[n,r,o]=new m(t).toArray();this.uniforms.uTargetColor[0]=n,this.uniforms.uTargetColor[1]=r,this.uniforms.uTargetColor[2]=o}}const $={original:new m("rgb(255, 255, 255)"),basic:new m("rgb(210, 210, 210)"),dimmed:new m("rgb(120, 120, 120)")},N={original:new m("rgb(255, 255, 0)"),basic:new m("hsl(50,65%,70%)"),dimmed:b.redShadow},L={original:new m("rgb(255, 0, 255)"),basic:b.pink,dimmed:new m("hsl(290,35%,38%)")},S={original:new m("rgb(0, 255, 255)"),basic:new m("hsl(183, 50%, 50%)"),dimmed:new m("hsl(183, 50%, 25%)")},X={original:new m("rgb(0, 255, 0)"),basic:b.moss,dimmed:new m("hsl(73,50%,25%)")},Jt={white:{basic:{main:$,edges:{towards:S,right:N},hud:{lives:N,dimmed:L,icons:S}},dimmed:{main:$,edges:{towards:X,right:S},hud:{lives:N,dimmed:L,icons:S}}},yellow:{basic:{main:N,edges:{towards:X,right:$},hud:{lives:S,dimmed:L,icons:X}},dimmed:{main:N,edges:{towards:S,right:S},hud:{lives:S,dimmed:L,icons:X}}},magenta:{basic:{main:L,edges:{towards:X,right:S},hud:{lives:$,dimmed:S,icons:N}},dimmed:{main:L,edges:{towards:X,right:S},hud:{lives:$,dimmed:S,icons:N}}},cyan:{basic:{main:S,edges:{towards:L,right:$},hud:{lives:$,dimmed:X,icons:N}},dimmed:{main:S,edges:{towards:L,right:$},hud:{lives:$,dimmed:X,icons:N}}},green:{basic:{main:X,edges:{towards:S,right:N},hud:{lives:$,dimmed:L,icons:S}},dimmed:{main:X,edges:{towards:S,right:N},hud:{lives:$,dimmed:L,icons:S}}}},ir=e=>Jt[e.hue][e.shade],sr=e=>{const t=j(e,"head"),n=j(e,"heels");return t!==void 0&&n!==void 0&&t.state.action==="idle"&&n.state.action==="idle"&&t.state.standingOn===n},ar=e=>{if(e===void 0)return 0;const{shieldCollectedAt:t,gameTime:n}=e;return t!==null&&t+rn>n?100-Math.ceil((n-t)/(rn/100)):0},lr=e=>{const t=100*U.w;return e.totalWalkDistance<=e.fastStepsStartedAtDistance+t?100-Math.ceil((e.totalWalkDistance-e.fastStepsStartedAtDistance)/U.w):0};function ct(e,t){const n=t||new y;for(const r of e)n.addChild(r);return n}const pn={x:.5,y:1},mn=e=>typeof e!="string"&&Object.hasOwn(e,"animationId"),h=e=>{if(typeof e=="string")return h({texture:e});{const{anchor:t,flipX:n,pivot:r,x:o,y:i,filter:s}=e;let a;if(mn(e)?a=Ho(e):a=new Ke(ue.textures[e.texture]),t===void 0&&r===void 0)if(mn(e))a.anchor=pn;else{const l=ue.data.frames[e.texture].frame;l.pivot!==void 0?a.pivot=l.pivot:a.anchor=pn}else t!==void 0&&(a.anchor=t),r!==void 0&&(a.pivot=r);return o!==void 0&&(a.x=o),i!==void 0&&(a.y=i),s!==void 0&&(a.filters=s),a.eventMode="static",n===!0&&(a.scale.x=-1),a}};function Ho({animationId:e,reverse:t,playOnce:n}){const o=ue.animations[e].map(s=>({texture:s,time:Un}));t&&o.reverse();const i=new ot(o);return i.animationSpeed=Lr.animations[e].animationSpeed,i.play(),n!==void 0&&(i.loop=!1,i.onComplete=()=>{i.stop(),n==="and-destroy"&&(i.visible=!1)}),i}const Go=`in vec2 vTextureCoord;
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
`;class ut extends oe{constructor(t){const n=Object.keys(t).length,r=J.from({vertex:Yt,fragment:Go.replace(/\$\{SWOP_COUNT\}/g,n.toFixed(0)),name:"palette-swop-filter"});super({glProgram:r,resources:{colorReplaceUniforms:{uOriginal:{value:new Float32Array(3*n),type:"vec3<f32>",size:n},uReplacement:{value:new Float32Array(3*n),type:"vec3<f32>",size:n}}}});const o=this.resources.colorReplaceUniforms.uniforms;Object.entries(t).forEach(([i,s],a)=>{b[i].toArray().forEach((l,c)=>{o.uOriginal[a*3+c]=l}),s.toArray().forEach((l,c)=>{o.uReplacement[a*3+c]=l})})}}const cr=({basic:e,dimmed:t})=>({replaceLight:e,replaceDark:t}),ur=e=>cr(Jt[e.color.hue][e.color.shade].main),qo=e=>new ut({lightBeige:b.lightGrey,redShadow:b.shadow,pink:b.lightGrey,moss:b.lightGrey,midRed:b.midGrey,highlightBeige:b.lightGrey,...ur(e)}),Wo=new ut({midGrey:b.midRed,lightGrey:b.lightBeige,white:b.highlightBeige,metallicBlue:b.redShadow,pink:b.midRed,moss:b.midRed,replaceDark:b.midRed,replaceLight:b.lightBeige}),$t=(e,t)=>new ut(cr(Jt[e.color.hue][e.color.shade].edges[t])),te=e=>new ut(ur(e)),Xe=Xr,jo=24,Yo=56,Jo=80,gn=112,we=e=>e==="heels"?1:-1;function*Zo(e){const t=Number.isFinite(e)?e.toString().split(""):"-",n=t.length;for(let r=0;r<n;r++){const o=`hud.char.${t[r]}`;Vr(o),yield h({texture:o,x:(r+.5-n/2)*$n.w})}}function Ve(e,t){for(const n of e.children)n.destroy();ct(Zo(t),e)}const Ko=e=>{const t=new Se,n=new Se,r=new _e(b.pureBlack,B.getState().upscale.gameEngineUpscale),o=new Se,i=new Se,s=({doubleHeight:u=!1,outline:d=!1,label:p="text"}={})=>new y({label:p,filters:d?[r,n]:n,scale:{x:1,y:u?2:1}}),a=u=>{const d=new Ke(ue.textures[`${u}.walking.${u==="head"?"right":"towards"}.2`]);return d.anchor={x:.5,y:0},d},l=({textureId:u,textOnTop:d=!1,noText:p=!1,outline:f=!1,label:v})=>{const g=new y({label:v});g.pivot={x:4,y:16};const z=new Ke({texture:ue.textures[u],anchor:d?{x:.5,y:0}:{x:.5,y:1},filters:t,y:d?0:8});g.addChild(z);const T=s({outline:f==="text-only"});return T.y=d?0:16,T.x=z.x=$n.w/2,g.addChild(T),p&&(T.visible=!1),f===!0&&(g.filters=r),{text:T,icon:z,container:g}},c={head:{sprite:a("head"),livesText:s({label:"headLives",doubleHeight:!0,outline:!0}),shield:l({label:"headShield",textureId:"hud.shield",outline:!0}),extraSkill:l({label:"headFastSteps",textureId:"hud.fastSteps",outline:!0}),doughnuts:l({label:"headDoughnuts",textureId:"doughnuts",textOnTop:!0,outline:"text-only"}),hooter:l({label:"headHooter",textureId:"hooter",textOnTop:!0,noText:!0})},heels:{sprite:a("heels"),livesText:s({label:"heelsLives",doubleHeight:!0,outline:!0}),shield:l({label:"heelsShield",textureId:"hud.shield",outline:!0}),extraSkill:l({label:"heelsBigJumps",textureId:"hud.bigJumps",outline:!0}),bag:l({label:"heelsBag",textureId:"bag",textOnTop:!0,noText:!0}),carrying:{container:new y({label:"heelsCarrying"})}}};for(const u of on)e.addChild(c[u].livesText),e.addChild(c[u].sprite),e.addChild(c[u].shield.container),e.addChild(c[u].extraSkill.container);return e.addChild(c.head.doughnuts.container),e.addChild(c.head.hooter.container),e.addChild(c.heels.bag.container),e.addChild(c.heels.carrying.container),(u,d)=>{const p=le(u),{hud:{dimmed:f,lives:v,icons:g}}=ir(p.color),z=x=>{const D=Me(u,x),{text:ee,container:P}=c[x].shield,{text:Qt,container:en}=c[x].extraSkill;en.x=P.x=(d.x>>1)+we(x)*Jo,Ve(ee,ar(D)),P.y=d.y,Ve(Qt,D===void 0?0:x==="head"?lr(D):D.bigJumps),en.y=d.y-24},T=x=>{const{currentCharacterName:D}=u,ee=D===x||D==="headOverHeels",P=c[x].sprite;ee?P.filters=Xe:sr(u)?(i.targetColor=f.basic,P.filters=i):P.filters=o,P.x=(d.x>>1)+we(x)*Yo,P.y=d.y-Oe.h},w=x=>{const ee=Me(u,x)?.lives??0,P=c[x].livesText;P.x=(d.x>>1)+we(x)*jo,P.y=d.y,P.tint=v.basic,Ve(P,ee??0)},k=x=>{const{container:D}=c.heels.carrying,ee=D.children.length>0;if(x===null&&ee)for(const P of D.children)P.destroy();x!==null&&!ee&&D.addChild(h(x.type==="spring"?"spring.released":x.type==="sceneryPlayer"?x.config.which==="head"?"head.walking.towards.2":"heels.walking.away.2":x.config.style))};o.targetColor=f.dimmed,n.targetColor=f.basic,t.targetColor=g.basic;for(const x of on)w(x),T(x),z(x);c.head.hooter.container.x=c.head.doughnuts.container.x=(d.x>>1)+we("head")*gn,c.head.doughnuts.container.y=d.y-Oe.h-8,c.heels.carrying.container.y=d.y-Oe.h,c.heels.carrying.container.x=c.heels.bag.container.x=(d.x>>1)+we("heels")*gn,c.heels.bag.container.y=c.head.hooter.container.y=d.y-8;const A=Me(u,"head"),M=A?.hasHooter??!1;c.head.hooter.icon.filters=M?Xe:o;const K=A?.doughnuts??0;c.head.doughnuts.icon.filters=K!==0?Xe:o,Ve(c.head.doughnuts.text,K);const Q=Me(u,"heels"),Be=Q?.hasBag??!1;k(Q?.carrying??null),c.heels.bag.icon.filters=Be?Xe:o}},vn={movementType:"vel",vels:{gravity:F}},Qo=(e,t,n)=>{if(!re(e))return vn;const{type:r,state:{vels:{gravity:{z:o}},standingOn:i}}=e,a=so[(r==="headOverHeels"?"head":r)==="head"?"head":"others"];return i!==null?E("lift")(i)&&i.state.vels.lift.z<0?{movementType:"vel",vels:{gravity:{z:Math.max(o-Ft*n,-a)}}}:vn:{movementType:"vel",vels:{gravity:{z:Math.max(o-Ft*n,-a)}}}},Re={movementType:"steady"},He=e=>{const n=e/ao*Un;return(e+.5*Ft*n**2)/n},ei={head:He(Ue.head),headOnSpring:He(Ue.head+U.h),heels:He(Ue.heels),heelsOnSpring:He(Ue.heels+U.h)},ti=(e,t)=>{const n=e.type==="headOverHeels"?"head":e.type==="heels"&&e.state.bigJumps>0?(e.state.bigJumps--,"head"):e.type;return ei[`${n}${t?"OnSpring":""}`]},dr=(e,t)=>{const{state:{standingOn:n}}=e,{inputState:{jump:r}}=t,o=n!==null&&E("teleporter")(n);if(!(r&&n!==null&&!o))return n!==null?{movementType:"steady",stateDelta:{jumped:!1}}:Re;const s=E("spring")(n);return{movementType:"vel",vels:{gravity:{x:0,y:0,z:ti(e,s)}},stateDelta:{action:"moving",jumped:!0}}},ni=({vel:e,acc:t,unitD:n,maxSpeed:r,deltaMS:o,minSpeed:i=0})=>{const s=Pe(e),a=Math.max(i,Math.min(r,s+t*o)),l=Math.min(a,r);return O(n,l)},xn={movementType:"vel",vels:{walking:F}},hr=(e,t,n)=>{const r=ri(e,t,n);if(r.movementType==="vel"&&r.vels.walking!==void 0){const o=Pe(r.vels.walking);r.stateDelta=Object.assign(r.stateDelta||{},{walkDistance:o===0?0:e.state.walkDistance+o*n}),e.type==="head"&&e.state.standingOn!==null&&(r.stateDelta=Object.assign(r.stateDelta||{},{totalWalkDistance:e.state.totalWalkDistance+o*n}))}return r},ri=(e,{inputState:t,currentCharacterName:n},r)=>{const{type:o,state:{action:i,autoWalk:s,standingOn:a,facing:l,teleporting:c,walkDistance:u,vels:{walking:d,gravity:p}}}=e,v=n===e.id?t:Hr,g=a===null&&p.z<0,z=o==="head"&&lr(e.state)>0&&a!==null,T=o==="headOverHeels"?g?"head":"heels":z?"heels":o,w=s?l:v.direction,k=Y[T];if(c!==null||i==="death")return xn;if(o==="heels"){if(a===null)return e.state.jumped?{movementType:"vel",vels:{walking:Vt(d,O(d,lo*r))}}:xn;if(v.jump){const Be=Ht(w,ce)?l:w,D=E("spring")(a)?1:uo;return{movementType:"vel",vels:{walking:O({...Be,z:0},k*D)},stateDelta:{facing:xe(Be)}}}}if(Pe(w)!==0)return g?{movementType:"vel",vels:{walking:O({...w,z:0},k)},stateDelta:{facing:w,action:"falling"}}:{movementType:"vel",vels:{walking:ni({vel:d,acc:ho[T],deltaMS:r,maxSpeed:k,unitD:w,minSpeed:0})},stateDelta:{facing:w,action:"moving"}};const M=Pe(d);if(u>0&&u<1)return{movementType:"position",posDelta:O(l,1-u),stateDelta:{action:g?"falling":"idle",walkDistance:0}};const K=M===0?F:O(d,1/M),Q=Math.max(M-fo[T]*r,0);return{movementType:"vel",vels:{walking:O(K,Q<co[T]?0:Q)},stateDelta:{action:g?"falling":"idle"}}},yn=U.h,Ge=.001,oi=({totalDistance:e,currentAltitude:t,direction:n})=>{const r=gt**2/(2*ye);if(n==="up"){if(t<=r)return Math.max(Ge,Math.sqrt(2*ye*Math.max(t,0)));if(t>=e-r){const o=Math.max(0,e-t);return Math.max(Ge,Math.sqrt(2*ye*o))}else return gt}else if(t>=e-r){const o=Math.max(0,e-t);return Math.min(-Ge,-Math.sqrt(2*ye*o))}else return t<=r?Math.min(-Ge,-Math.sqrt(2*ye*Math.max(t,0))):-gt};function ii({config:{bottom:e,top:t},state:{direction:n,position:{z:r}}},o,i){const s=e*yn,a=t*yn,l=oi({currentAltitude:r-s,direction:n,totalDistance:a-s});if(Number.isNaN(l))throw new Error("velocity is NaN");const c=r<=s?"up":r>=a?"down":n;return{movementType:"vel",vels:{lift:{x:0,y:0,z:l}},stateDelta:{direction:c}}}const si=.5,ge=(e,t,n,r)=>{const o=n.x+r.x-e.x,i=n.y+r.y-e.y,s=n.z+r.z-e.z,a=e.x+t.x-n.x,l=e.y+t.y-n.y,c=e.z+t.z-n.z,u=Math.abs(o)<Math.abs(a)?o:-a,d=Math.abs(i)<Math.abs(l)?i:-l,p=Math.abs(s)<Math.abs(c)?s:-c,f=Math.abs(u),v=Math.abs(d),g=Math.abs(p)*si;return f<v&&f<g?{x:u,y:0,z:0}:v<g?{x:0,y:d,z:0}:{x:0,y:0,z:p}},bn=(e,t)=>({x:e.x>0?t.state.position.x:t.state.position.x+t.aabb.x,y:e.y>0?t.state.position.y:t.state.position.y+t.aabb.y,z:e.z>0?t.state.position.z:t.state.position.z+t.aabb.z}),wn={stopAutowalk:0,portal:0,wall:0,doorLegs:0,sceneryPlayer:0,bubbles:0,block:1,barrier:1,floor:1,floorEdge:1,hushPuppy:1,teleporter:1,doorFrame:1,lift:2,movableBlock:2,portableBlock:2,slidingBlock:2,spring:2,ball:3,joystick:3,switch:3,charles:3,conveyor:3,head:4,heels:4,headOverHeels:4,pickup:8,firedDoughnut:9,slidingDeadly:10,moveableDeadly:10,deadlyBlock:10,monster:10},fr=(e,t)=>wn[e.type]-wn[t.type],ai=(e,t)=>t.toSorted((n,r)=>{const o=fr(n,r);if(o!==0)return o;const i=Qe(e,bn(e,n)),s=Qe(e,bn(e,r));return i-s});function pr({room:{roomTime:e},movingItem:t}){if(t.state.action==="death")return;const n=t.type==="headOverHeels"?t.state.head:t.state;ar(n)>0||(t.state.action="death",t.state.expires=e+zt)}const li=e=>{const{gameState:t,movingItem:n,touchedItem:r,room:{id:o}}=e;if(t.pickupsCollected[o][r.id]===!0)return;const i=t.pickupsCollected[o];switch(i[r.id]=!0,r.config.gives){case"hooter":{const s=vt(n);if(s!==void 0){s.hasHooter=!0;break}break}case"doughnuts":{const s=vt(n);s!==void 0&&(s.doughnuts+=6);break}case"bag":{const s=sn(n);if(s!==void 0){s.hasBag=!0;break}break}case"shield":{n.type==="headOverHeels"?(n.state.head.shieldCollectedAt=n.state.head.gameTime,n.state.heels.shieldCollectedAt=n.state.heels.gameTime):n.state.shieldCollectedAt=n.state.gameTime;break}case"fast":{const s=vt(n);s!==void 0&&(s.fastStepsStartedAtDistance=s.totalWalkDistance);break}case"jumps":{const s=sn(n);s!==void 0&&(s.bigJumps+=10);break}case"extra-life":if(n.type==="headOverHeels"){n.state.head.lives+=2,n.state.heels.lives+=2;break}else n.state.lives+=2;break;case"scroll":t.inputState.jump=!1,B.dispatch(qr(r.config.page));break;case"reincarnation":break;case"crown":{B.dispatch(Gr(r.config.planet));break}default:r.config}},ci=({gameState:e,movingItem:t,touchedItem:n,movementVector:r})=>{const{config:{toRoom:o,direction:i}}=n;Qe(i,r)<=0||jt({playableItem:t,gameState:e,toRoomId:o,sourceItem:n,changeType:"portal"})},ui=({movingItem:e,movementVector:t,touchedItem:n})=>{const{config:{direction:r,part:o}}=n,i=Gt(r);if(o==="top")return;const s=o==="far"?{x:i==="x"?-Math.abs(t.y):0,y:i==="y"?-Math.abs(t.x):0,z:0}:{x:i==="x"?Math.abs(t.y):0,y:i==="y"?Math.abs(t.x):0,z:0};e.state.position=_(e.state.position,s)};function di({movingItem:e}){e.state.autoWalk=!1}const G=(e,...t)=>E(...t)(e.touchedItem),Te=(e,...t)=>E(...t)(e.movingItem),mr=e=>Z(e.movingItem),hi=e=>Z(e.touchedItem),fi=e=>Xn(e.touchedItem),Tn=e=>{switch(!0){case G(e,"stopAutowalk"):di(e);break;case fi(e):pr(e);break;case G(e,"portal"):ci(e);break;case G(e,"pickup"):li(e);break;case G(e,"doorFrame"):ui(e);break}},gr=e=>e[Math.floor(Math.random()*e.length)],ne=Object.freeze({movementType:"vel",vels:{walking:F}}),dt=e=>Vn(e)?Y[e.config.which]:Y[e.type],pi=({state:{position:e,vels:{walking:t}}},n,r,o)=>{const i=Y.homingBot;if(!Ht(t,ce))return{movementType:"steady"};const{items:{head:s,heels:a}}=n;for(const l of[s,a]){if(l===void 0)continue;const c=Ae(l.state.position,e);if(Math.abs(c.y)<2)return{movementType:"vel",vels:{walking:{x:c.x>0?i:-i,y:0,z:0}}};if(Math.abs(c.x)<2)return{movementType:"vel",vels:{walking:{x:0,y:c.y>0?i:-i,z:0}}}}return{movementType:"steady"}},vr=(e,t)=>{const{items:{head:n,heels:r}}=t;if(t.items.headOverHeels!==void 0)return t.items.headOverHeels;const o=n===void 0?void 0:nn(n.state.position,e),i=r===void 0?void 0:nn(r.state.position,e);return o===void 0?r:i===void 0||o<i?n:r},mi=(e,t,n,r)=>{const{state:{position:o,standingOn:i}}=e;if(i===null)return ne;const s=vr(o,t);if(s===void 0)return Re;const a=Ae(s?.state.position,o),l=Math.abs(a.x)<Math.abs(a.y)?"x":"y",c=Math.abs(a[l])>1?l:Nn(l),u=dt(e),d={...F,[c]:a[c]>0?u:-u};return{movementType:"vel",vels:{walking:d},stateDelta:{facing:xe(d)}}},gi=(e,t,n,r)=>{const{state:{position:o,standingOn:i}}=e;if(i===null)return ne;const s=vr(o,t);if(s===void 0)return ne;const a=s.state.position,l=U.w*3;if(!(o.x>a.x-l&&o.x<a.x+l&&o.y>a.y-l&&o.y<a.y+l))return ne;const u=Ae(s?.state.position,o),d=dt(e),p=(1+Math.sqrt(2))/2,f=d*p,v=O({...u,z:0},f/Ln(u));return{movementType:"vel",vels:{walking:v},stateDelta:{facing:xe(v)}}},yt=(e,t,n,r,o)=>{const{state:{vels:{walking:i},standingOn:s}}=e;if(s===null)return ne;if(!(De(i,F)||Math.random()<r/1e3))return Re;const l=gr(o);return{movementType:"vel",vels:{walking:O(It[l],dt(e))},stateDelta:{facing:It[l]}}},vi=(e,t,n,r)=>{const{state:{facing:o,vels:{walking:i},standingOn:s}}=e;return s===null?ne:Ht(i,ce)?{movementType:"vel",vels:{walking:O(o,dt(e))}}:Re},xi=(e,t,n)=>{switch(n){case"opposite":return{x:t.x===0?e.x:-e.x,y:t.y===0?e.y:-e.y,z:0};case"clockwise":return{x:-e.y,y:e.x,z:0};case"perpendicular":{const r=gr([-1,1]);return{x:t.x===0?r*e.y:0,y:t.y===0?r*e.x:0,z:0}}}},bt=({movingItem:e,touchedItem:{state:{position:t},aabb:n},deltaMS:r},{touchDurationBeforeTurn:o,turnStrategy:i})=>{const{state:{position:s,vels:{walking:a},activated:l},aabb:c}=e;if(!l||(e.state.durationOfTouch+=r,e.state.durationOfTouch<o))return;const u=ge(s,c,t,n);if(u.x===0&&u.y===0)return;const d=xi(a,u,i);e.state.vels.walking=d,e.state.facing=xe(d),e.state.durationOfTouch=0},yi=({movingItem:e})=>{e.state.vels.walking=F},bi=(e,t,n,r)=>{if(!e.state.activated||Vn(e)&&e.state.busyLickingDoughnutsOffFace)return ne;switch(e.config.movement){case"patrol-randomly-diagonal":return yt(e,t,n,r,Yr);case"patrol-randomly-xy8":return yt(e,t,n,r,jr);case"patrol-randomly-xy4":return yt(e,t,n,r,Wr);case"towards-tripped-on-axis-xy4":return pi(e,t);case"towards-on-shortest-axis-xy4":return mi(e,t);case"back-forth":case"clockwise":return vi(e);case"unmoving":case"free":return ne;case"towards-when-in-square-xy8":return gi(e,t);default:throw e.config,new Error("this should be unreachable")}},wi=e=>{const{movingItem:t,touchedItem:n}=e;if(re(n,t))switch(t.config.movement){case"patrol-randomly-xy4":bt(e,{touchDurationBeforeTurn:150,turnStrategy:"perpendicular"});break;case"back-forth":case"patrol-randomly-diagonal":case"patrol-randomly-xy8":bt(e,{touchDurationBeforeTurn:150,turnStrategy:"opposite"});break;case"clockwise":bt(e,{touchDurationBeforeTurn:150,turnStrategy:"clockwise"});break;case"towards-tripped-on-axis-xy4":yi(e);break;case"towards-on-shortest-axis-xy4":case"towards-when-in-square-xy8":case"unmoving":case"free":return;default:throw t.config,new Error("this should be unreachable")}},Ti=({touchedItem:e,gameState:{progression:t},room:n})=>{const{config:{activates:r},state:{setting:o,touchedOnProgression:i}}=e;if(e.state.touchedOnProgression=t,t===i+1||t===i)return;const s=e.state.setting=o==="left"?"right":"left";for(const[a,l]of qt(r)){const c=n.items[a];c!==void 0&&(c.state={...c.state,...l[s]})}},Ci=({movingItem:e,touchedItem:t})=>{if(!re(e))return;const{state:{position:n},aabb:r}=t,o=ge(e.state.position,e.aabb,n,r);if(o.x===0&&o.y===0)return;const i=xe(o),s=O(i,-Y.ball);return t.state.vels.sliding=s,!1},Si=({movingItem:e,touchedItem:t})=>{if(!re(t))return;const n=e.state.vels.sliding;if(De(n,F))return;const{state:{position:r},aabb:o}=e,i=ge(t.state.position,t.aabb,r,o);return Qe(i,e.state.vels.sliding)>0&&(e.state.vels.sliding=F),!1},Oi=({gameState:e,movingItem:t,room:n,touchedItem:r,deltaMS:o})=>{const{config:{controls:i},state:{position:s},aabb:a}=r,l=ge(t.state.position,t.aabb,s,a);if(l.x===0&&l.y===0)return;const c=xe(l);for(const u of i){const d=n.items[u],p=O(c,-Y.charles*o);d.state.facing=p,ht({subjectItem:d,posDelta:p,gameState:e,room:n,pusher:r,deltaMS:o})}},ki=(e,t,n,r)=>{const o=Math.max(0,Math.min(e.x+t.x,n.x+r.x)-Math.max(e.x,n.x)),i=Math.max(0,Math.min(e.y+t.y,n.y+r.y)-Math.max(e.y,n.y));return o*i},Cn=({state:{position:e},aabb:t},{state:{position:n},aabb:r})=>ki(e,t,n,r),Sn=.001,Zt=(e,t,n=.001)=>{if(!re(t,e)||e.id===t.id)return!1;const{state:{vels:{gravity:{z:r}}}}=e;return r>0?!1:it({state:{position:_(e.state.position,{x:0,y:0,z:-Sn})},aabb:{...e.aabb,z:n+Sn},id:e.id},{state:{position:_(t.state.position,{x:0,y:0,z:t.aabb.z})},aabb:{...t.aabb,z:0},id:t.id})},xr=(e,t)=>{const r=[...W(t).filter(i=>Zt(e,i))];return r.length===0?void 0:r.reduce((i,s)=>{const a=fr(s,i);return a<0||a===0&&Cn(e,s)>Cn(e,i)?s:i})},On=e=>H(e.movingItem)&&Zt(e.movingItem,e.touchedItem,Math.abs(e.movementVector.z)),kn=e=>{if(e.touchedItem.state.disappear==="onTouch"||e.touchedItem.state.disappear==="onTouchByPlayer"&&Z(e.movingItem)||e.touchedItem.state.disappear==="onStand"&&On(e)){if(On(e)&&mr(e)){st({above:e.movingItem,below:e.touchedItem});const n=[dr(e.movingItem,e.gameState),hr(e.movingItem,e.gameState,e.deltaMS)];br(e.movingItem,n)}Hn(e)}};function _i(e){const t=e.movingItem.type==="monster"?e.movingItem:e.touchedItem;t.state.busyLickingDoughnutsOffFace=!0}const Ii=e=>{mr(e)&&Tn(e),hi(e)&&Tn({...e,movingItem:e.touchedItem,touchedItem:e.movingItem}),G(e,...an)&&Ci(e),Te(e,...an)&&Si(e),(Te(e,"monster")&&G(e,"firedDoughnut")||Te(e,"firedDoughnut")&&G(e,"monster"))&&_i(e),(Te(e,"monster")||Te(e,"movableBlock"))&&wi(e),G(e,"switch")&&Ti(e),G(e,"joystick")&&Oi(e),e.touchedItem.state.disappear&&kn(e),e.movingItem.state.disappear&&re(e.touchedItem,e.movingItem)&&kn({...e,movingItem:e.touchedItem,touchedItem:e.movingItem})},ht=({subjectItem:e,posDelta:t,gameState:n,room:r,pusher:o,deltaMS:i,forceful:s=E("lift")(e)&&o===void 0,recursionDepth:a=0})=>{if(De(t,F))return;if(a>16)throw new Error("this probably means a non-terminating issue");const{state:{position:l}}=e;e.state.position=_(l,t),H(e)&&(e.state.actedOnAt=r.roomTime);const c=ai(t,Gn(e,I(r.items)));for(const u of c){if(!it(e,u))continue;if(o!==u&&Ii({movingItem:e,touchedItem:u,movementVector:Vt(e.state.position,l),gameState:n,deltaMS:i,room:r}),r.items[e.id]===void 0)return;if(r.items[u.id]===void 0||!re(u,e)||!re(e))continue;const d=ge(e.state.position,e.aabb,u.state.position,u.aabb);if(H(u)&&u!==o){const p=s||po(u)?-1:-.5,f=O(d,p);if(e.state.position=_(e.state.position,d,f),ht({subjectItem:u,posDelta:f,pusher:e,gameState:n,room:r,deltaMS:i,forceful:s,recursionDepth:a+1}),r.items[u.id]===void 0)continue;e.state.position=_(e.state.position,ge(e.state.position,e.aabb,u.state.position,u.aabb))}else e.state.position=_(e.state.position,d);H(e)&&d.z>0&&(e.state.standingOn===null||!c.includes(e.state.standingOn))&&(At(e),st({above:e,below:u}))}};function Pi(e,t,n){const{state:{teleporting:r,standingOn:o}}=e,{inputState:{jump:i}}=t;if(r===null)return i&&o!==null&&E("teleporter")(o)?{movementType:"steady",stateDelta:{teleporting:{phase:"out",toRoom:o.config.toRoom,timeRemaining:zt}}}:Re;const s=Math.max(r.timeRemaining-n,0);switch(r.phase){case"out":if(s===0)return jt({changeType:"teleport",sourceItem:o,playableItem:e,gameState:t,toRoomId:r.toRoom}),{movementType:"steady",stateDelta:{teleporting:{phase:"in",timeRemaining:zt}}};break;case"in":if(s===0)return{movementType:"steady",stateDelta:{teleporting:null}};break}return{movementType:"steady",stateDelta:{teleporting:{...r,timeRemaining:s}}}}const _n={movementType:"vel",vels:{movingFloor:F}},Fi=(e,t,n)=>{if(Z(e)&&e.state.teleporting!==null)return _n;const{state:{standingOn:r}}=e;if(r===null||!E("conveyor")(r))return _n;const{config:{direction:o}}=r,s=E("heels")(e)&&e.state.action==="moving"&&et(e.state.facing)===Jr(o)?Y.heels:mo;return{movementType:"vel",vels:{movingFloor:O(It[o],s)}}},zi=(e,t,n,r)=>{const{inputState:o}=n,i=e.type==="heels"?e.state:e.state.heels,{carrying:s,hasBag:a}=i,{state:{position:l}}=e;if(!a)return;const c=W(I(t.items)).filter(qn),u=s===null?Di(e,t):void 0;for(const d of c)d.state.wouldPickUpNext=!1;if(u!==void 0&&(u.state.wouldPickUpNext=!0),o.carry){if(s===null){if(u===void 0){console.warn("nothing to pick up");return}Ai(t,i,u)}else{if(e.state.standingOn===null||!yr(e,I(t.items)))return;const d=go({gameState:n,room:t,itemType:s.type,config:s.config,position:l});ht({subjectItem:e,gameState:n,room:t,posDelta:{x:0,y:0,z:d.aabb.z},pusher:e,forceful:!0,deltaMS:r}),i.carrying=null}o.carry=!1}},Ai=(e,t,n)=>{const r={type:n.type,config:n.config};t.carrying=r,Fe({room:e,item:n})},Di=(e,t)=>xr(e,W(I(t.items)).filter(qn)),yr=(e,t)=>{const n={position:_(e.state.position,{z:U.h})},r=Gn({id:e.id,aabb:e.aabb,state:n},t);for(const o of r)if(!H(o)||!yr(o,t))return!1;return!0};function*Ri(e,t,n,r){for(;(e.state.latentMovement.at(0)?.moveAtRoomTime??Number.POSITIVE_INFINITY)<t.roomTime;){const{positionDelta:o}=e.state.latentMovement.shift();yield{movementType:"position",posDelta:o}}}const Bi=(e,t,n,r)=>{const{inputState:{fire:o}}=n,i=e.type==="head"?e.state:e.state.head,{doughnuts:s,hasHooter:a,doughnutLastFireTime:l,gameTime:c}=i,{state:{position:u,facing:d}}=e;if(o&&a&&s>0&&l+500<c){const f={type:"firedDoughnut",...nt,config:Wt,id:`firedDoughnut/${n.progression}`,shadowCastTexture:"shadow.smallRound",state:{position:_(u,O(d,U.w),e.type==="headOverHeels"?{z:U.h}:F),vels:{fired:O(d,Y.firedDoughnut)},disappear:"onTouch",expires:null,stoodOnBy:new Set}};me({room:t,item:f}),i.doughnuts-=1,i.doughnutLastFireTime=i.gameTime,n.inputState.fire=!1}},Ei=2;function*Mi(e,t,n,r){H(e)&&(yield Qo(e,n,r),yield Fi(e),yield*Ri(e,t)),Z(e)&&(yield hr(e,n,r),e.id===n.currentCharacterName&&(yield Pi(e,n,r),yield dr(e,n),vo(e)&&zi(e,t,n,r),xo(e)&&Bi(e,t,n))),yo(e)&&(yield ii(e)),bo(e)&&(yield bi(e,t,n,r))}const Ui=(e,t,n)=>{H(e)&&e.state.standingOn!==null&&e.state.standingOn.state.disappear==="onStand"&&Hn({touchedItem:e.state.standingOn,gameState:n,room:t}),Z(e)&&e.state.standingOn!==null&&e.state.standingOn.type==="movableBlock"&&e.state.standingOn.config.movement!=="free"&&e.state.standingOn.config.activated==="onStand"&&(e.state.standingOn.state.activated=!0)},$i=(e,t,n,r)=>{Z(e)&&e.state.standingOn!==null&&Xn(e.state.standingOn)&&pr({gameState:n,room:t,movingItem:e,touchedItem:e.state.standingOn,deltaMS:r,movementVector:{x:0,y:0,z:-1}});const o=[...Mi(e,t,n,r)];Ui(e,t,n);let i=br(e,o);(H(e)||E("lift")(e)||E("firedDoughnut")(e))&&(i=_(i,...W(I(e.state.vels)).map(l=>O(l,r))));const s=Math.ceil(Pe(i)/Ei),a=O(i,1/s);for(let l=0;l<s;l++)ht({subjectItem:e,posDelta:a,gameState:n,room:t,deltaMS:r})},br=(e,t)=>{let n=F;for(const r of t){if(r.movementType==="position"&&(n=_(n,r.posDelta)),r.movementType==="vel"&&(H(e)||E("lift")(e)))for(const[i,s]of qt(r.vels)){const a={...F,...s};e.state.vels[i]=a}const o=r.stateDelta;o!==void 0&&(e.state={...e.state,...o})}return n},In=(e,...t)=>{const n={};for(const r of t)n[r]=e[r];return n},Nt=e=>{const t={id:"head",type:"head",...nt,...ln,state:{...Dt(),...Rt(),...Bt(),...e.state.head,facing:e.state.facing,position:_(e.state.position,{z:U.h}),switchedToAt:Number.NEGATIVE_INFINITY,actedOnAt:e.state.actedOnAt}},n={id:"heels",type:"heels",...nt,...ln,state:{...Dt(),...Rt(),...Bt(),...e.state.heels,facing:e.state.facing,position:_(e.state.position),switchedToAt:Number.NEGATIVE_INFINITY,actedOnAt:e.state.actedOnAt}};return{head:t,heels:n}},Kt=({head:e,heels:t})=>({type:"headOverHeels",id:"headOverHeels",...nt,shadowCastTexture:t.shadowCastTexture,config:Wt,aabb:wo,state:{...Dt(),...Rt(),...Bt(),position:t.state.position,action:"idle",jumped:!1,teleporting:null,autoWalk:!1,facing:t.state.facing,actedOnAt:Math.max(t.state.actedOnAt,t.state.actedOnAt),head:{...In(e.state,"hasHooter","doughnuts","doughnutLastFireTime","fastStepsStartedAtDistance","totalWalkDistance","lives","gameTime","shieldCollectedAt"),switchedToAt:Number.NEGATIVE_INFINITY},heels:{...In(t.state,"hasBag","bigJumps","carrying","lives","gameTime","shieldCollectedAt"),switchedToAt:Number.NEGATIVE_INFINITY}}}),Ni=e=>{const t=e.characterRooms.head,n=j(e,"head"),r=j(e,"heels"),o=Kt({head:n,heels:r});Fe({room:t,item:"head"}),Fe({room:t,item:"heels"}),me({room:t,item:o}),e.previousPlayable=e.currentCharacterName,e.currentCharacterName="headOverHeels",e.characterRooms={head:void 0,heels:void 0,headOverHeels:t}},Li=e=>{const t=e.characterRooms.headOverHeels,n=j(e,"headOverHeels"),r=ze(e.previousPlayable),{head:o,heels:i}=Nt(n);Fe({room:t,item:"headOverHeels"}),me({room:t,item:o}),me({room:t,item:i}),st({above:o,below:i}),e.currentCharacterName=r,e.previousPlayable=void 0,e.characterRooms={head:t,heels:t,headOverHeels:void 0}},Xi=e=>{const t=j(e,e.currentCharacterName);t!==void 0&&(t.type==="headOverHeels"?(t.state.head.switchedToAt=t.state.head.gameTime,t.state.heels.switchedToAt=t.state.heels.gameTime):t.state.switchedToAt=t?.state.gameTime)},Vi=e=>{if(sr(e))Ni(e);else if(e.currentCharacterName==="headOverHeels")Li(e);else{if(j(e,ze(e.currentCharacterName))===void 0)return;e.currentCharacterName=ze(e.currentCharacterName)}Xi(e)},Hi=(e,t)=>{const n=e.characterRooms.headOverHeels;if(t.state.head.lives--,t.state.heels.lives--,t.state.head.lives+t.state.heels.lives===0){e.events.emit("gameOver");return}const o=t.state.head.lives>0,i=t.state.heels.lives>0;if(o&&!i||!o&&i){const c=o?"head":"heels";e.currentCharacterName=c,ae(e,t);const u=Nt(t)[c],d=pe({gameState:e,playableItems:[u],roomId:n.id});e.characterRooms={[c]:d},e.entryState={[c]:tt(u)};return}if(e.entryState.headOverHeels!==void 0){ae(e,t);const c=pe({gameState:e,playableItems:[t],roomId:n.id});e.characterRooms={headOverHeels:c};return}else{const{head:c,heels:u}=Nt(t);if(ae(e,c),ae(e,u),it(c,u)){const d=Kt({head:c,heels:u});ae(e,d,"heels");const p=pe({gameState:e,playableItems:[d],roomId:n.id});e.characterRooms={headOverHeels:p},e.entryState={headOverHeels:tt(d)};return}else{const d=pe({gameState:e,playableItems:[c,u],roomId:n.id});e.characterRooms={head:d,heels:d};return}}},pe=({gameState:e,playableItems:t,roomId:n})=>{const{campaign:r}=e,o=Pt(r.rooms[n],e.pickupsCollected[n]);for(const i of t)me({room:o,item:i}),(i.type==="head"||i.type==="headOverHeels")&&To(o,e);return o},ae=(e,t,n=t.id)=>{const r=e.entryState[n];t.state={...t.state,...r,expires:null,standingOn:null}},Gi=(e,t)=>{const n=j(e,ze(t.type));if(t.state.lives--,t.type==="heels"&&(t.state.carrying=null),t.state.lives===0)if(delete e.characterRooms[t.id],n!==void 0){e.currentCharacterName=n.type;return}else{e.events.emit("gameOver");return}else{const r=e.characterRooms[t.type];ae(e,t);const o=n===void 0?void 0:e.characterRooms[n.type];if(r===o){if(e.entryState.headOverHeels!==void 0){const a=Kt({head:t.id==="head"?t:r.items.head,heels:t.id==="heels"?t:r.items.heels});ae(e,a);const l=pe({gameState:e,playableItems:[a],roomId:r.id});e.characterRooms={headOverHeels:l},e.currentCharacterName="headOverHeels";return}me({room:r,item:t});return}else{const s=pe({gameState:e,playableItems:[t],roomId:r.id});e.characterRooms[t.id]=s;return}}},qi=(e,t)=>{t.type==="headOverHeels"?Hi(e,t):Gi(e,t)},Wi=e=>{for(const t of I(e.items))for(const n of t.state.stoodOnBy){if(!e.items[n.id]){At(n);continue}if(!Zt(n,t)){At(n);const r=xr(n,I(e.items));r!==void 0&&st({above:n,below:r})}}},ji=(e,t,n)=>{for(const r of e){const o=n[r.id];if(o===void 0)continue;const s={...Vt(r.state.position,o),z:0};if(!De(s,F))for(const a of r.state.stoodOnBy)a.state.latentMovement.push({moveAtRoomTime:t.roomTime+2*Co,positionDelta:s})}},Yi=(e,t)=>e.state.expires!==null&&e.state.expires<t.roomTime,Ji=(e,t,n)=>{for(const r of I(e.items))!H(r)||e.roomTime===r.state.actedOnAt||Zr(r.state.position)||(console.log(`snapping item ${r.id} to pixel grid (not acted on in tick)`),r.state.position=Kr(r.state.position),n.add(r))},Zi=(e,t)=>{const n={lift:-4,head:-3,heels:-3,monster:-2,block:1,deadlyBlock:1},r=n[e.type]??0,o=n[t.type]??0;return r-o},Ki=(e,t)=>{if(e.gameSpeed>1){let n=new Set;for(let r=0;r<e.gameSpeed;r++)n=new Set(je(n,Pn(e,t)));return n}return Pn(e,t*e.gameSpeed)},Pn=(e,t)=>{const{inputState:n}=e,r=le(e),o=Object.fromEntries(W(qt(r.items)).map(([a,l])=>[a,l.state.position]));n.swop&&(Vi(e),n.swop=!1);for(const a of I(r.items))Yi(a,r)&&(Fe({room:r,item:a}),Z(a)&&qi(e,a));const i=Object.values(r.items).sort(Zi);for(const a of i){if(at(e).state.action==="death")break;r.items[a.id]!==void 0&&$i(a,r,e,t)}Wi(r);const s=new Set(W(I(r.items)).filter(a=>o[a.id]===void 0||!De(a.state.position,o[a.id])));return ji(s,r,o),Ji(r,o,s),Qi(e,r,t),s},Qi=(e,t,n)=>{e.progression++,e.gameTime+=n,t.roomTime+=n;const r=at(e);if(r.type==="headOverHeels")r.state.head.gameTime+=n,r.state.heels.gameTime+=n;else if(r.state.gameTime+=n,e.characterRooms.head===e.characterRooms.heels){const i=j(e,ze(r.type));i!==void 0&&(i.state.gameTime+=n)}},Fn=(e,t)=>{const n=C(e),r=C(_(e,{x:t.x,z:t.z})),o=C(_(e,{y:t.y,z:t.z}));return{bottomCentre:n,topLeft:r,topRight:o}},wt=(e,t,n,r,o=1e-5)=>r-o>e&&n<t-o,es=(e,t,n,r)=>{const o=Fn(e,t),i=Fn(n,r),s=o.topLeft.x,a=o.topRight.x,l=i.topLeft.x,c=i.topRight.x,u=wt(s,a,l,c),d=o.topRight.y-o.topRight.x/2,p=o.bottomCentre.y-o.bottomCentre.x/2,f=i.topRight.y-i.topRight.x/2,v=i.bottomCentre.y-i.bottomCentre.x/2,g=wt(d,p,f,v),z=o.topLeft.y+o.topLeft.x/2,T=o.bottomCentre.y+o.bottomCentre.x/2,w=i.topLeft.y+i.topLeft.x/2,k=i.bottomCentre.y+i.bottomCentre.x/2,A=wt(z,T,w,k);return u&&g&&A},ts=(e,t)=>{if(e.renders===!1||t.renders===!1||e.fixedZIndex!==void 0||t.fixedZIndex!==void 0)return 0;const n=e.state.position,r=e.renderAabb||e.aabb,o=t.state.position,i=t.renderAabb||t.aabb;if(!es(n,r,o,i))return 0;for(const s of Qr){const a=e.state.position[s],l=a+r[s],c=t.state.position[s],u=c+i[s];if(l<=c)return 1*(s==="z"?-1:1);if(a>=u)return-1*(s==="z"?-1:1)}return zn(t)-zn(e)},zn=e=>e.state.position.x+e.state.position.y-e.state.position.z;class Ye extends Error{constructor(t,n,r){super(`CyclicDependencyError: .cyclicDependency property of this error has nodes as an array. ${t.join(" -> ")}`,r),this.cyclicDependency=t,this.hasClosedCycle=n}}const ns=e=>{const t=rs(e);let n=t.length,r=n;const o=new Array(n),i={},s=os(t);for(;r--;)i[r]||a(t[r],r,new Set);return o;function a(l,c,u){if(u.has(l))throw new Ye([l],!1);if(i[c])return;i[c]=!0;const d=e.get(l)||new Set,p=Array.from(d);if(c=p.length){u.add(l);do{const f=p[--c];try{a(f,s.get(f),u)}catch(v){throw v instanceof Ye?v.hasClosedCycle?v:new Ye([l,...v.cyclicDependency],v.cyclicDependency.includes(l)):v}}while(c);u.delete(l)}o[--n]=l}};function rs(e){const t=new Set;for(const[n,r]of e.entries()){t.add(n);for(const o of r)t.add(o)}return Array.from(t)}function os(e){const t=new Map;for(let n=0,r=e.length;n<r;n++)t.set(e[n],n);return t}const An=(e,t,n)=>{e.has(t)||e.set(t,new Set),e.get(t).add(n)},qe=(e,t,n)=>{const r=e.get(t);r!==void 0&&(r?.delete(n),r.size===0&&e.delete(t))},is=(e,t=new Set(I(e)),n=new Map)=>{const r=new Map;for(const[o,i]of n)if(!e[o])n.delete(o);else for(const s of i)e[s]||qe(n,o,s);for(const o of t)if(o.renders)for(const i of I(e)){if(!i.renders||r.get(i)?.has(o)||o===i)continue;const s=ts(o,i);if(An(r,o,i),s===0){qe(n,o.id,i.id),qe(n,i.id,o.id);continue}const a=s>0?o.id:i.id,l=s>0?i.id:o.id;An(n,a,l),qe(n,l,a)}return n},wr=(e,t,n=3)=>{try{return{order:ns(e),impossible:!1}}catch(r){if(r instanceof Ye){const o=r.cyclicDependency;return e.get(o[0])?.delete(o[1]),{order:wr(e,t,n-1).order,impossible:!0}}else throw r}},ss=(e,t,n,r)=>`${e}${r?".dark":""}.wall.${t}.${n}`,as=(e,t,n)=>{const o=ue.textures[`door.frame.${e.planet}.${t}.near`]!==void 0?e.planet:"generic",i=e.color.shade==="dimmed"&&ue.textures[`door.frame.${o}.dark.${t}.${n}`]!==void 0;return`door.frame.${o}${i?".dark":""}.${t}.${n}`},We=e=>R(()=>h(e)),R=e=>({item:t,room:n,currentlyRenderedProps:r,displaySettings:o})=>r===void 0?{container:e({item:t,room:n,displaySettings:o}),renderProps:Wt}:"no-update";function*ls({config:{direction:e,inHiddenWall:t,height:n}},r){const o=Gt(e),i=o==="y"?1:16;function*s(a){if(t){if(n!==0){const c=h({pivot:{x:o==="x"?18:8,y:12},texture:`generic.door.floatingThreshold.${o}`,...mt(a,{y:-U.h*n})});c.filters=$t(r,o==="x"?"towards":"right"),yield c}}else{yield h({pivot:{x:i,y:9},texture:"generic.door.legs.base",...mt(a,{})});for(let l=1;l<n;l++)yield h({pivot:{x:i,y:9},texture:"generic.door.legs.pillar",...mt(a,{y:-l*U.h})})}}yield*s(V({...ce,[o]:1})),yield*s(ce),t||(yield h({pivot:{x:16,y:U.h*n+13},texture:`generic.door.legs.threshold.double.${o}`,...V({...ce,[o]:1})}))}const cs=R(({item:e,room:t})=>ct(ls(e,t),new y({filters:te(t)})));function*us({config:{direction:e,part:t}},n){const r=Gt(e);yield h({texture:as(n,r,t),filter:te(n)})}const ds=R(({item:e,room:t})=>ct(us(e,t))),Tt={animationId:"bubbles.cold"},ie=({top:e,bottom:t="homingBot",filter:n})=>{const r=new y({filters:n});r.addChild(h(t));const o=h(e);return o.y=-12,r.addChild(o),r},Ct=({name:e,action:t,facingXy4:n,teleporting:r,highlighted:o})=>{if(t==="death")return{animationId:`${e}.fadeOut`};if(r!==null){if(r.phase==="out")return{animationId:`${e}.fadeOut`};if(r.phase==="in")return{animationId:`${e}.fadeOut`}}const i=o?new _e(e==="head"?b.metallicBlue:b.pink,B.getState().upscale.gameEngineUpscale):void 0;return t==="moving"?{animationId:`${e}.walking.${n}`,filter:i}:t==="falling"&&e==="head"&&(n==="towards"||n==="right")?{texture:`head.falling.${n}`,filter:i}:e==="head"&&(n==="towards"||n==="right")?{animationId:`head.idle.${n}`,filter:i}:{texture:`${e}.walking.${n}.2`,filter:i}},Dn=({gameTime:e,switchedToAt:t})=>t+500>e,St=({item:e,currentlyRenderedProps:t})=>{const{type:n,state:{action:r,facing:o,teleporting:i}}=e,s=et(o),a=e.type==="headOverHeels"?Dn(e.state.head):Dn(e.state);return t===void 0||t.action!==r||t.facingXy4!==s||t.teleportingPhase!==(i?.phase??null)||t.highlighted!==a?{container:n==="headOverHeels"?ie({top:Ct({name:"head",action:r,facingXy4:s,teleporting:i,highlighted:a}),bottom:Ct({name:"heels",action:r,facingXy4:s,teleporting:i,highlighted:a})}):h(Ct({name:n,action:r,facingXy4:s,teleporting:i,highlighted:a})),renderProps:{action:r,facingXy4:s,teleportingPhase:i?.phase??null,highlighted:a}}:"no-update"};function*hs(e,t,n){for(const r of eo){const o=Nn(r),i=r==="x"?"towards":"right",s=r==="x"?"away":"left";for(let a=0;a<=e.size[r];a++){let l;if(e.walls[s][a]==="none"){const c=W(I(e.roomJson.items)).find(u=>u.type==="door"&&u.config.direction===s&&(u.position[r]===a||u.position[r]+1===a)&&u.position[o]===e.size[o]);c===void 0?l="none":c.position.z===0?l="behind-door":l="corner-on-floor"}else l="corner-on-floor";l!=="none"&&(yield rt({[r]:a-t[r],[o]:e.size[o]+(n[i]?.5:0)+(l==="behind-door"?.5:0)},h(l==="behind-door"?{anchor:{x:0,y:1},texture:"generic.wall.overdraw",flipX:r==="x"}:{anchor:{x:0,y:1},texture:"generic.floor.overdraw",flipX:r==="x"})))}}}const Tr=(e,t,n)=>{const r=new y({label:"towards"});for(let i=0;i<=e;i+=.5)r.addChild(rt({x:i,y:0},h({pivot:{x:7,y:0},texture:`${n}.towards`})));const o=new y({label:"right"});for(let i=0;i<=t;i+=.5)o.addChild(rt({x:0,y:i},h({pivot:{x:0,y:0},texture:`${n}.right`})));return{right:o,towards:r}},fs=R(({item:e,room:t})=>{const{blockXMin:n,blockYMin:r,blockXMax:o,blockYMax:i,sidesWithDoors:s,edgeLeftX:a,edgeRightX:l}=lt(t.roomJson),c=o-n,u=i-r,{floor:d,color:{shade:p}}=t,f=new y({label:`floor(${t.id})`});if(d!=="none"){const T=d==="deadly"?`generic${p==="dimmed"?".dark":""}.floor.deadly`:`${d}${p==="dimmed"?".dark":""}.floor`,w=new y;for(let A=-1;A<=o+2;A++)for(let M=A%2-1;M<=i+2;M+=2)w.addChild(rt({x:A+(s.right?-.5:0),y:M+(s.towards?-.5:0)},h({texture:T})));ct(hs(t,{x:n,y:r},s),w);const k=new q().poly([ce,V({x:c,y:0}),V({x:c,y:u}),V({x:0,y:u})],!0).fill({color:16711680,alpha:.5}).stroke({width:8});w.addChild(k),w.filters=te(t),w.mask=k,f.addChild(w)}const{towards:v,right:g}=Tr(c,u,"floorOverdraw");f.addChild(v),f.addChild(g);const z=new q().poly([{x:a,y:16},{x:a,y:-999},{x:l,y:-999},{x:l,y:16}],!0).fill(16776960);return f.addChild(z),f.mask=z,f.y=-e.aabb.z,f.cacheAsTexture(!0),f}),ps=R(({room:e})=>{const{blockXMin:t,blockYMin:n,blockXMax:r,blockYMax:o,edgeLeftX:i,edgeRightX:s}=lt(e.roomJson),a=r-t,l=o-n,c=new y({label:"floorEdge"}),u=new q({label:"overDrawToHideFallenItems"}).poly([V({x:a,y:0}),V({x:0,y:0}),V({x:0,y:l}),{...V({x:0,y:l}),y:999},{...V({x:a,y:0}),y:999}],!0).fill(0);u.y=8,c.addChild(u);const{towards:d,right:p}=Tr(a,l,"floorEdge");d.filters=$t(e,"towards"),p.filters=$t(e,"right"),c.addChild(d),c.addChild(p);const f=new q({label:"floorMaskCutOffLeftAndRight"}).poly([{x:i,y:999},{x:i,y:-999},{x:s,y:-999},{x:s,y:999}],!0).fill(16776960);return c.addChild(f),c.mask=f,c.cacheAsTexture(!0),c}),ms=(e,t,n)=>t==="book"?"book.x":t==="organic"&&e?`block.organic.dark${n?".disappearing":""}`:`block.${t}${n?".disappearing":""}`,Ot=b.moss,Rn=R(({item:{config:{style:e}}})=>h(e==="book"?"book.y":e)),gs={head:St,heels:St,headOverHeels:St,doorFrame:ds,doorLegs:cs,stopAutowalk(){throw new Error("these should always be non-rendering")},portal(){throw new Error("these should always be non-rendering")},wall:R(({item:{config:{side:e,style:t}},room:n})=>{if(e==="right"||e==="towards")throw new Error("this wall should be non-rendering");return h({texture:ss(n.planet,t,e,n.color.shade==="dimmed"),y:1,pivot:e==="away"?{x:ke.w,y:ke.h+1}:{x:0,y:ke.h+1},filter:te(n)})}),barrier:R(({item:{config:{axis:e}}})=>h({texture:`barrier.${e}`})),deadlyBlock:R(({item:{config:{style:e}},room:t})=>h({texture:e,filter:e==="volcano"?te(t):void 0})),slidingDeadly:Rn,slidingBlock:Rn,block({item:{config:{style:e},state:{disappear:t}},room:n,currentlyRenderedProps:r}){return r===void 0||r.disappear!==t?{container:h({texture:ms(n.color.shade==="dimmed",e,t!==null),filter:e==="organic"?te(n):void 0}),renderProps:{disappear:t}}:"no-update"},switch({item:{state:{setting:e}},currentlyRenderedProps:t}){return t===void 0||e!==t.setting?{container:h(`switch.${e}`),renderProps:{setting:e}}:"no-update"},conveyor({item:{config:{direction:e},state:{stoodOnBy:t}},currentlyRenderedProps:n}){const r=t.size>0;if(!(n===void 0||n.moving!==r))return"no-update";const i=new y,s=to(e);return i.addChild(h(r?{animationId:`conveyor.${s}`,reverse:e==="towards"||e==="right"}:{texture:`conveyor.${s}.6`})),{container:i,renderProps:{moving:r}}},lift:R(()=>{const e=new y,t={x:Oe.w/2,y:Oe.h};return e.addChild(h({animationId:"lift",pivot:t})),e.addChild(h({texture:"lift.static",pivot:t})),e}),teleporter({item:{state:{stoodOnBy:e}},currentlyRenderedProps:t}){const n=W(e).find(Z)!==void 0;return t===void 0||n!==t.flashing?{container:n?new y({children:[h("teleporter"),h({animationId:"teleporter.flashing"})]}):h("teleporter"),renderProps:{flashing:n}}:"no-update"},pickup:R(({item:{config:e},room:t})=>{if(e.gives==="crown")return h({texture:`crown.${e.planet}`});const r={shield:"bunny",jumps:"bunny",fast:"bunny","extra-life":"bunny",bag:"bag",doughnuts:"doughnuts",hooter:"hooter",scroll:{texture:"scroll",filter:te(t)},reincarnation:{animationId:"fish"}}[e.gives];return h(r)}),moveableDeadly:R(({item:{config:{style:e}}})=>h(e==="deadFish"?"fish.1":"puck.deadly")),charles({item:{state:{facing:e}},currentlyRenderedProps:t}){const n=et(e);return t===void 0||n!==t.facingXy4?{container:ie({top:`charles.${n}`}),renderProps:{facingXy4:n}}:"no-update"},monster({item:{config:e,state:t},room:n,currentlyRenderedProps:r}){const{activated:o,busyLickingDoughnutsOffFace:i}=t,s=i?Wo:o?void 0:qo(n);switch(e.which){case"skiHead":case"turtle":case"cyberman":case"computerBot":case"elephant":case"elephantHead":case"monkey":{const a=et(t.facing);if(!(r===void 0||o!==r.activated||i!==r.busyLickingDoughnutsOffFace||a!==r.facingXy4))return"no-update";const c={facingXy4:a,activated:o,busyLickingDoughnutsOffFace:i};switch(e.which){case"skiHead":return{container:h({texture:`${e.which}.${e.style}.${a}`,filter:s}),renderProps:c};case"elephantHead":return{container:h({texture:`elephant.${a}`,filter:s}),renderProps:c};case"turtle":return{container:h(o&&!i?{animationId:`${e.which}.${a}`,filter:s}:{texture:`${e.which}.${a}.1`,filter:s}),renderProps:c};case"cyberman":return{container:t.activated||t.busyLickingDoughnutsOffFace?ie({top:{texture:`${e.which}.${a}`,filter:s||te(n)},bottom:Tt}):h({texture:`${e.which}.${a}`,filter:s}),renderProps:c};case"computerBot":case"elephant":case"monkey":return{container:ie({top:`${e.which}.${a}`,filter:s}),renderProps:c};default:throw new Error(`unexpected monster ${e}`)}break}case"helicopterBug":case"emperor":case"dalek":case"homingBot":case"bubbleRobot":case"emperorsGuardian":{if(!(r===void 0||i!==r.busyLickingDoughnutsOffFace||o!==r.activated))return"no-update";const l={activated:o,busyLickingDoughnutsOffFace:i};switch(e.which){case"helicopterBug":case"dalek":return{container:h(o&&!i?{animationId:e.which,filter:s}:{texture:`${e.which}.1`,filter:s}),renderProps:l};case"homingBot":return{filter:s,container:h({texture:e.which,filter:s}),renderProps:l};case"bubbleRobot":return{container:ie({top:Tt,filter:s}),renderProps:l};case"emperorsGuardian":return{container:ie({top:"ball",bottom:Tt,filter:s}),renderProps:l};case"emperor":return{container:h({animationId:"bubbles.cold",filter:s}),renderProps:l};default:throw new Error(`unexpected monster ${e}`)}break}default:throw new Error(`unexpected monster ${e}`)}},joystick:We("joystick"),movableBlock:R(({item:{config:{style:e}}})=>h(e)),portableBlock({item:{config:{style:e},state:{wouldPickUpNext:t}},currentlyRenderedProps:n}){if(!(n===void 0||t!==n.highlighted))return"no-update";const o=t?new _e(Ot,B.getState().upscale.gameEngineUpscale):void 0;return{container:h({texture:e,filter:o}),renderProps:{highlighted:t}}},spring({item:{state:{stoodOnBy:e,wouldPickUpNext:t}},currentlyRenderedProps:n}){const r=e.size>0;if(!(n===void 0||t!==n.highlighted||r!==n.compressed))return"no-update";const i=n?.compressed??!1,s=t?new _e(Ot,B.getState().upscale.gameEngineUpscale):void 0;return{container:h(!r&&i?{animationId:"spring.bounce",playOnce:"and-stop",filter:s}:{texture:r?"spring.compressed":"spring.released",filter:s}),renderProps:{compressed:r,highlighted:t}}},sceneryPlayer({item:{config:{which:e,startDirection:t},state:{wouldPickUpNext:n}},currentlyRenderedProps:r}){if(!(r===void 0||n!==r.highlighted))return"no-update";const i=n?new _e(Ot,B.getState().upscale.gameEngineUpscale):void 0;return{container:e==="headOverHeels"?ie({top:{texture:`head.walking.${t}.2`,filter:i},bottom:{texture:`heels.walking.${t}.2`,filter:i}}):h({texture:`${e}.walking.${t}.2`,filter:i}),renderProps:{highlighted:n}}},hushPuppy:We("hushPuppy"),bubbles:R(({item:{config:{style:e}}})=>h({animationId:`bubbles.${e}`})),firedDoughnut:We({animationId:"bubbles.doughnut"}),ball:We("ball"),floor:fs,floorEdge:ps};class vs{#e;#n;#o=void 0;#t;#s;constructor(t,n,r){this.#e=t,this.#n=n,this.#t=new y({label:`ItemAppearanceRenderer ${t.id}`}),Ts(t,this.#t,r),this.#s=gs[t.type]}destroy(){this.#t.destroy({children:!0})}tick(t){if(!this.#e.renders)throw new Error("should not have a renderer for non-rendering item");const n=this.#s({item:this.#e,room:this.#n,currentlyRenderedProps:this.#o,displaySettings:t.displaySettings});n!=="no-update"&&(this.#o=n.renderProps,this.#t.children.forEach(r=>r.destroy()),n.container!==null&&this.#t.addChild(n.container))}get container(){return this.#t}}const Bn=(e,t)=>{const n=new q().poly([C({}),C({x:e.x}),C({x:e.x,y:e.y}),C({y:e.y})]).poly([C({}),C({z:e.z}),C({y:e.y,z:e.z}),C({y:e.y})]).poly([C({x:e.x}),C({x:e.x,z:e.z}),C(e),C({x:e.x,y:e.y})]).poly([C({z:e.z}),C({x:e.x,z:e.z}),C({x:e.x,y:e.y,z:e.z}),C({y:e.y,z:e.z})]).stroke({width:.5,color:t,alpha:1});return n.eventMode="static",n.on("pointerenter",()=>{n.fill({color:t,alpha:.5})}),n.on("pointerleave",()=>{n.fill({color:"transparent"})}),n},xs={head:"rgba(255,184,0)",wall:"rgba(128,200,0)",portal:"rgba(255,0,255)",stopAutowalk:"rgba(255,128,128)"};class ys{#e;constructor(t){const n=xs[t.type]??"rgba(255,255,255)";if(this.#e=new y({label:`ItemBoundingBoxRenderer ${t.id}`}),E("portal")(t)){const r=C(t.config.relativePoint);this.#e.addChild(new q().circle(r.x,r.y,5).stroke(n)),this.#e.addChild(new q().circle(r.x,r.y,2).fill(n))}this.#e.addChild(new q().circle(0,0,2).fill(n)),this.#e.addChild(Bn(t.aabb,n)),t.renderAabb&&this.#e.addChild(Bn(t.renderAabb,"rgba(184, 184, 255)"))}tick(t){}destroy(){this.#e.destroy({children:!0})}get container(){return this.#e}}class bs{#e;#n;#o;constructor(t,n){this.#n=new y({label:`ItemPositionRenderer ${t.id}`,children:[n.container]}),this.#o=n,this.#e=t,this.#t()}#t(){const t=Wn(this.#e.state.position);this.#n.x=t.x,this.#n.y=t.y}tick(t){this.#o?.tick(t),t.movedItems.has(this.#e)&&this.#t()}destroy(){this.#n.destroy({children:!0}),this.#o?.destroy()}get container(){return this.#n}}class ws{constructor(t,n){this.item=t,this.room=n;const{userSettings:{displaySettings:{showShadowMasks:r}}}=B.getState();if(r||(this.#e.filters=new Eo({alpha:.5})),t.shadowMask.spriteOptions){const o=h(t.shadowMask.spriteOptions);t.shadowMask.relativeTo==="top"&&(o.y=-t.aabb.z),this.#e.addChild(o),r||(this.#e.mask=o)}this.#e.addChild(this.#n)}#e=new y({label:"ItemShadowRenderer"});#n=new y({label:"shadows"});#o={};destroy(){this.#e.destroy({children:!0})}tick({movedItems:t,progression:n}){const r=t.has(this.item),o=this.item.state.position.z+this.item.aabb.z,i=W(I(this.room.items)).filter(function(c){return c.shadowCastTexture!==void 0}),s={id:this.item.id,state:{position:{...this.item.state.position,z:o}},aabb:{...this.item.aabb,z:So}},a=Object.groupBy(i,l=>{const c=this.#o[l.id]!==void 0,u=t.has(l);return!r&&!u?c?"keepUnchanged":"noShadow":it(s,l)?c?"update":"create":"noShadow"});for(const l of je(a.keepUnchanged,a.update))this.#o[l.id].renderedOnProgression=n;for(const l of je(a.create)){const c=h(l.shadowCastTexture);c.label=l.id,this.#n.addChild(c),this.#o[l.id]={sprite:c,renderedOnProgression:n}}for(const l of je(a.create,a.update)){const{sprite:c}=this.#o[l.id],u=C({...Ae(l.state.position,this.item.state.position),z:this.item.aabb.z});c.x=u.x,c.y=u.y}for(const[l,{sprite:c,renderedOnProgression:u}]of no(this.#o))u!==n&&(c.destroy(),delete this.#o[l]);this.#e.visible=(a.keepUnchanged?.length??0)+(a.update?.length??0)+(a.create?.length??0)>0}get container(){return this.#e}}const Ts=(e,t,n)=>{t!==void 0&&(t.eventMode="static",t.on("pointertap",()=>{n.events.emit("itemClicked",{item:e,container:t})}))},Cs=e=>e.shadowMask!==void 0,Ss=(e,t,n)=>{const{userSettings:{displaySettings:{showBoundingBoxes:r}}}=B.getState(),o=r==="all"||r==="non-wall"&&e.type!=="wall",i=[];return e.renders&&(i.push(new vs(e,t,n)),Cs(e)&&i.push(new ws(e,t))),o&&i.push(new ys(e)),i.length===0?"not-needed":new bs(e,new Os(i))};class Os{#e;#n=new y({label:"CompositeRenderer"});constructor(t){this.#e=t,this.#n.addChild(...t.map(n=>n.container))}tick(t){for(const n of this.#e)n.tick(t)}destroy(){for(const t of this.#e)t.destroy()}get container(){return this.#n}}const de=.33,ks=16,Lt=ke.h-ke.w/2,_s=Y.heels,Is=(e,t,n)=>{const{edgeLeftX:r,edgeRightX:o,frontSide:i,topEdgeY:s}=lt(e.roomJson),a=r+i.x,l=o+i.x,c=(o+r)/2,u={x:n.x/2-c,y:n.y-ks-i.y-Math.abs(c/2)},d=u.x+a<0,p=u.x+l>n.x,f=u.y+s-Lt<0;return(v,g,z)=>{const T=Wn(v.state.position),w=_(T,u),k={x:d&&w.x<n.x*de?Math.min(-a,n.x*de-T.x):p&&w.x>n.x*(1-de)?Math.max(n.x-l,n.x*(1-de)-T.x):u.x,y:f&&w.y<n.y*de?n.y*de-T.y:u.y};if(z)t.x=k.x,t.y=k.y;else{const A=_s*g,M=Ae(t,k),K=Ln(M);if(K>A){const Q={x:M.x/K,y:M.y/K};t.x-=Q.x*A,t.y-=Q.y*A}else t.x=k.x,t.y=k.y}}},Ps=e=>{const{edgeLeftX:t,edgeRightX:n,frontSide:r,topEdgeY:o}=lt(e);return new q().rect(t+r.x,o-Lt,n-t,r.y-o+Lt).stroke("red").rect(t+r.x,o,n-t,r.y-o).stroke("blue")};class En{#e;#n=!1;#o=new Map;#t=new Map;#s;#a;#i;#r;#l;constructor(t,n){const{userSettings:{displaySettings:r},upscale:o}=B.getState();this.#a=r,this.#i=o,this.#r=n,this.#l=t,this.#e=new y({label:`RoomRenderer(${n.id})`}),r.showBoundingBoxes!=="none"&&this.#e.addChild(Ps(n.roomJson)),this.#s=Is(n,this.#e,o.gameEngineScreenSize)}#c(t){for(const n of I(this.#r.items)){let r=this.#t.get(n.id);if(r!==void 0){if(r==="not-needed")continue}else{if(r=Ss(n,this.#r,this.#l),r==="not-needed"){this.#t.set(n.id,"not-needed");continue}this.#t.set(n.id,r),this.#e.addChild(r.container),n.fixedZIndex&&(r.container.zIndex=n.fixedZIndex)}r.tick(t)}for(const[n,r]of this.#t.entries())this.#r.items[n]===void 0&&(r!=="not-needed"&&r.destroy(),this.#t.delete(n))}#u(t){const{order:n}=wr(is(this.#r.items,t.movedItems,this.#o),this.#r.items);for(let r=0;r<n.length;r++){const o=this.#t.get(n[r]);if(o===void 0||o==="not-needed")throw new Error(`Item id=${n[r]} does not have a renderer - cannot assign a z-index`);o.container.zIndex=n.length-r}}tick(t){const n=this.#n?t:{...t,movedItems:new Set(I(this.#r.items))};this.#s(at(this.#l),n.deltaMS,!this.#n),this.#c(n),(!this.#n||n.movedItems.size>0)&&this.#u(n),this.#n=!0}destroy(){this.#e.destroy({children:!0}),this.#t.forEach(t=>{t!=="not-needed"&&t.destroy()})}get displaySettings(){return this.#a}get upscale(){return this.#i}get everRendered(){return this.#n}get container(){return this.#e}get roomState(){return this.#r}}var ft=`in vec2 aPosition;
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
`,pt=`struct GlobalFilterUniforms {
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
}`,Fs=`precision highp float;
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
`,zs=`struct CRTUniforms {
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
}`,As=Object.defineProperty,Ds=(e,t,n)=>t in e?As(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Je=(e,t,n)=>(Ds(e,typeof t!="symbol"?t+"":t,n),n);const Cr=class Sr extends oe{constructor(t){t={...Sr.DEFAULT_OPTIONS,...t};const n=ve.from({vertex:{source:pt,entryPoint:"mainVertex"},fragment:{source:zs,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:Fs,name:"crt-filter"});super({gpuProgram:n,glProgram:r,resources:{crtUniforms:{uLine:{value:new Float32Array(4),type:"vec4<f32>"},uNoise:{value:new Float32Array(2),type:"vec2<f32>"},uVignette:{value:new Float32Array(3),type:"vec3<f32>"},uSeed:{value:t.seed,type:"f32"},uTime:{value:t.time,type:"f32"},uDimensions:{value:new Float32Array(2),type:"vec2<f32>"}}}}),Je(this,"uniforms"),Je(this,"seed"),Je(this,"time"),this.uniforms=this.resources.crtUniforms.uniforms,Object.assign(this,t)}apply(t,n,r,o){this.uniforms.uDimensions[0]=n.frame.width,this.uniforms.uDimensions[1]=n.frame.height,this.uniforms.uSeed=this.seed,this.uniforms.uTime=this.time,t.applyFilter(this,n,r,o)}get curvature(){return this.uniforms.uLine[0]}set curvature(t){this.uniforms.uLine[0]=t}get lineWidth(){return this.uniforms.uLine[1]}set lineWidth(t){this.uniforms.uLine[1]=t}get lineContrast(){return this.uniforms.uLine[2]}set lineContrast(t){this.uniforms.uLine[2]=t}get verticalLine(){return this.uniforms.uLine[3]>.5}set verticalLine(t){this.uniforms.uLine[3]=t?1:0}get noise(){return this.uniforms.uNoise[0]}set noise(t){this.uniforms.uNoise[0]=t}get noiseSize(){return this.uniforms.uNoise[1]}set noiseSize(t){this.uniforms.uNoise[1]=t}get vignetting(){return this.uniforms.uVignette[0]}set vignetting(t){this.uniforms.uVignette[0]=t}get vignettingAlpha(){return this.uniforms.uVignette[1]}set vignettingAlpha(t){this.uniforms.uVignette[1]=t}get vignettingBlur(){return this.uniforms.uVignette[2]}set vignettingBlur(t){this.uniforms.uVignette[2]=t}};Je(Cr,"DEFAULT_OPTIONS",{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0,seed:0});let Rs=Cr;var Bs=`
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
}`,Es=`struct KawaseBlurUniforms {
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
}`,Ms=`
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
`,Us=`struct KawaseBlurUniforms {
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
}`,$s=Object.defineProperty,Ns=(e,t,n)=>t in e?$s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,se=(e,t,n)=>(Ns(e,typeof t!="symbol"?t+"":t,n),n);const Or=class kr extends oe{constructor(...t){let n=t[0]??{};(typeof n=="number"||Array.isArray(n))&&(Ze("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),n={strength:n},t[1]!==void 0&&(n.quality=t[1]),t[2]!==void 0&&(n.clamp=t[2])),n={...kr.DEFAULT_OPTIONS,...n};const r=ve.from({vertex:{source:pt,entryPoint:"mainVertex"},fragment:{source:n?.clamp?Us:Es,entryPoint:"mainFragment"}}),o=J.from({vertex:ft,fragment:n?.clamp?Ms:Bs,name:"kawase-blur-filter"});super({gpuProgram:r,glProgram:o,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),se(this,"uniforms"),se(this,"_pixelSize",{x:0,y:0}),se(this,"_clamp"),se(this,"_kernels",[]),se(this,"_blur"),se(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=n.pixelSize??{x:1,y:1},Array.isArray(n.strength)?this.kernels=n.strength:typeof n.strength=="number"&&(this._blur=n.strength,this.quality=n.quality??3),this._clamp=!!n.clamp}apply(t,n,r,o){const i=this.pixelSizeX/n.source.width,s=this.pixelSizeY/n.source.height;let a;if(this._quality===1||this._blur===0)a=this._kernels[0]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,n,r,o);else{const l=fe.getSameSizeTexture(n);let c=n,u=l,d;const p=this._quality-1;for(let f=0;f<p;f++)a=this._kernels[f]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,c,u,!0),d=c,c=u,u=d;a=this._kernels[p]+.5,this.uniforms.uOffset[0]=a*i,this.uniforms.uOffset[1]=a*s,t.applyFilter(this,c,r,o),fe.returnTexture(l)}}get strength(){return this._blur}set strength(t){this._blur=t,this._generateKernels()}get quality(){return this._quality}set quality(t){this._quality=Math.max(1,Math.round(t)),this._generateKernels()}get kernels(){return this._kernels}set kernels(t){Array.isArray(t)&&t.length>0?(this._kernels=t,this._quality=t.length,this._blur=Math.max(...t)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(t){if(typeof t=="number"){this.pixelSizeX=this.pixelSizeY=t;return}if(Array.isArray(t)){this.pixelSizeX=t[0],this.pixelSizeY=t[1];return}this._pixelSize=t}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(t){this.pixelSize.x=t}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(t){this.pixelSize.y=t}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((t,n)=>t+n+.5,0))}_generateKernels(){const t=this._blur,n=this._quality,r=[t];if(t>0){let o=t;const i=t/n;for(let s=1;s<n;s++)o-=i,r.push(o)}this._kernels=r,this._updatePadding()}};se(Or,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});let Ls=Or;var Xs=`in vec2 vTextureCoord;
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
`,Vs=`struct AdvancedBloomUniforms {
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
`,Hs=`
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
`,Gs=`struct ExtractBrightnessUniforms {
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
`,qs=Object.defineProperty,Ws=(e,t,n)=>t in e?qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_r=(e,t,n)=>(Ws(e,typeof t!="symbol"?t+"":t,n),n);const Ir=class Pr extends oe{constructor(t){t={...Pr.DEFAULT_OPTIONS,...t};const n=ve.from({vertex:{source:pt,entryPoint:"mainVertex"},fragment:{source:Gs,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:Hs,name:"extract-brightness-filter"});super({gpuProgram:n,glProgram:r,resources:{extractBrightnessUniforms:{uThreshold:{value:t.threshold,type:"f32"}}}}),_r(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(t){this.uniforms.uThreshold=t}};_r(Ir,"DEFAULT_OPTIONS",{threshold:.5});let js=Ir;var Ys=Object.defineProperty,Js=(e,t,n)=>t in e?Ys(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,he=(e,t,n)=>(Js(e,typeof t!="symbol"?t+"":t,n),n);const Fr=class zr extends oe{constructor(t){t={...zr.DEFAULT_OPTIONS,...t};const n=ve.from({vertex:{source:pt,entryPoint:"mainVertex"},fragment:{source:Vs,entryPoint:"mainFragment"}}),r=J.from({vertex:ft,fragment:Xs,name:"advanced-bloom-filter"});super({gpuProgram:n,glProgram:r,resources:{advancedBloomUniforms:{uBloomScale:{value:t.bloomScale,type:"f32"},uBrightness:{value:t.brightness,type:"f32"}},uMapTexture:Ce.WHITE}}),he(this,"uniforms"),he(this,"bloomScale",1),he(this,"brightness",1),he(this,"_extractFilter"),he(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new js({threshold:t.threshold}),this._blurFilter=new Ls({strength:t.kernels??t.blur,quality:t.kernels?void 0:t.quality}),Object.assign(this,t)}apply(t,n,r,o){const i=fe.getSameSizeTexture(n);this._extractFilter.apply(t,n,i,!0);const s=fe.getSameSizeTexture(n);this._blurFilter.apply(t,i,s,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=s.source,t.applyFilter(this,n,r,o),fe.returnTexture(s),fe.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(t){this._extractFilter.threshold=t}get kernels(){return this._blurFilter.kernels}set kernels(t){this._blurFilter.kernels=t}get blur(){return this._blurFilter.strength}set blur(t){this._blurFilter.strength=t}get quality(){return this._blurFilter.quality}set quality(t){this._blurFilter.quality=t}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(t){typeof t=="number"&&(t={x:t,y:t}),Array.isArray(t)&&(t={x:t[0],y:t[1]}),this._blurFilter.pixelSize=t}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(t){this._blurFilter.pixelSizeX=t}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(t){this._blurFilter.pixelSizeY=t}};he(Fr,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});let Zs=Fr;const Mn=({crtFilter:e},t,n)=>[t?new Se(ir(n).main.original):void 0,e?new Rs({lineContrast:t?.3:0,vignetting:t?.5:.2}):void 0,e?new Zs({threshold:.7,brightness:.9,bloomScale:.6,blur:10}):void 0].filter(r=>r!==void 0);class Ks{#e;#n;#o;#t;#s=new y({label:"world"});#a=new y({label:"hud"});#i;#r;constructor(t,n){this.#i=t,this.#r=n;const{upscale:{gameEngineUpscale:r}}=B.getState();t.stage.addChild(this.#s),t.stage.addChild(this.#a),t.stage.scale=r,this.#t=new En(n,le(n)),this.#s.addChild(this.#t.container),this.#o=Ko(this.#a),this.#l()}#l(){const{userSettings:{displaySettings:t}}=B.getState();this.#e=Mn(t,!0,le(this.#r).color),this.#n=Mn(t,!1,le(this.#r).color)}tick=({deltaMS:t})=>{const n=B.getState(),r=ro(n),{userSettings:{displaySettings:o},upscale:i}=B.getState();this.#o(this.#r,i.gameEngineScreenSize);const s=le(this.#r);if((this.#t.roomState!==s||this.#t.upscale!==i||this.#t.displaySettings!==o)&&(this.#t.destroy(),this.#t=new En(this.#r,s),this.#s.addChild(this.#t.container),this.#r.events.emit("roomChange",s.id),this.#i.stage.scale=i.gameEngineUpscale,this.#l()),r)this.#i.stage.filters=this.#e,this.#t.everRendered||this.#t.tick({progression:this.#r.progression,movedItems:oo,deltaMS:t,displaySettings:o});else{this.#i.stage.filters=this.#n;const a=Ki(this.#r,t);this.#t.tick({progression:this.#r.progression,movedItems:a,deltaMS:t,displaySettings:o})}};start(){return this.#i.ticker.add(this.tick),this}stop(){this.#i.stage.removeChild(this.#s),this.#i.stage.removeChild(this.#a),this.#i.ticker.remove(this.tick)}}io.defaultOptions.scaleMode="nearest";const Qs=async(e,t)=>{const n=new nr;await n.init({background:"#000000"});const r=Lo({campaign:e,inputState:t}),o=new Ks(n,r).start();return{campaign:e,events:r.events,renderIn(i){i.appendChild(n.canvas)},resizeTo(i){console.log("explicitly setting app renderer size to",i),n.renderer?.resize(i.x,i.y)},changeRoom(i){jt({playableItem:at(r),gameState:r,toRoomId:i,changeType:"level-select"})},get currentRoom(){return le(r)},get gameState(){return r},stop(){console.warn("tearing down game"),n.canvas.parentNode?.removeChild(n.canvas),o.stop(),n.destroy()}}},ra=Object.freeze(Object.defineProperty({__proto__:null,gameMain:Qs},Symbol.toStringTag,{value:"Module"}));export{Kn as A,Yn as C,oe as F,Do as R,Io as S,Qn as V,ra as g,_o as u};
