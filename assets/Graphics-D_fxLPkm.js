import{T as w,a as S,n as g,V as T,G as a,d as n,v as l}from"./index-CdgbSTDn.js";const m={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},d=0,u=1,x=2,f=3,_=4,p=5,C=class y{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<d)}set blend(t){!!(this.data&1<<d)!==t&&(this.data^=1<<d)}get offsets(){return!!(this.data&1<<u)}set offsets(t){!!(this.data&1<<u)!==t&&(this.data^=1<<u)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<x)}set culling(t){!!(this.data&1<<x)!==t&&(this.data^=1<<x)}get depthTest(){return!!(this.data&1<<f)}set depthTest(t){!!(this.data&1<<f)!==t&&(this.data^=1<<f)}get depthMask(){return!!(this.data&1<<p)}set depthMask(t){!!(this.data&1<<p)!==t&&(this.data^=1<<p)}get clockwiseFrontFace(){return!!(this.data&1<<_)}set clockwiseFrontFace(t){!!(this.data&1<<_)!==t&&(this.data^=1<<_)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=m[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new y;return t.depthTest=!1,t.blend=!0,t}};C.default2d=C.for2d();let F=C,b=0;class k{constructor(t){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,e,r){const o=new w({...this.textureOptions,width:t,height:e,resolution:1,antialias:r,autoGarbageCollect:!0});return new S({source:o,label:`texturePool_${b++}`})}getOptimalTexture(t,e,r=1,o){let i=Math.ceil(t*r-1e-6),h=Math.ceil(e*r-1e-6);i=g(i),h=g(h);const c=(i<<17)+(h<<1)+(o?1:0);this._texturePool[c]||(this._texturePool[c]=[]);let s=this._texturePool[c].pop();return s||(s=this.createTexture(i,h,o)),s.source._resolution=r,s.source.width=i/r,s.source.height=h/r,s.source.pixelWidth=i,s.source.pixelHeight=h,s.frame.x=0,s.frame.y=0,s.frame.width=t,s.frame.height=e,s.updateUvs(),this._poolKeyHash[s.uid]=c,s}getSameSizeTexture(t,e=!1){const r=t.source;return this.getOptimalTexture(t.width,t.height,r._resolution,e)}returnTexture(t){const e=this._poolKeyHash[t.uid];this._texturePool[e].push(t)}clear(t){if(t=t!==!1,t)for(const e in this._texturePool){const r=this._texturePool[e];if(r)for(let o=0;o<r.length;o++)r[o].destroy(!0)}this._texturePool={}}}const R=new k;class M extends T{constructor(t){t instanceof a&&(t={context:t});const{context:e,roundPixels:r,...o}=t||{};super({label:"Graphics",...o}),this.renderPipeId="graphics",e?this._context=e:this._context=this._ownedContext=new a,this._context.on("update",this.onViewUpdate,this),this.allowChildren=!1,this.roundPixels=r??!1}set context(t){t!==this._context&&(this._context.off("update",this.onViewUpdate,this),this._context=t,this._context.on("update",this.onViewUpdate,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}addBounds(t){t.addBounds(this._context.bounds)}containsPoint(t){return this._context.containsPoint(t)}onViewUpdate(){if(this._didViewChangeTick++,this._didGraphicsUpdate=!0,this.didViewUpdate)return;this.didViewUpdate=!0;const t=this.renderGroup||this.parentRenderGroup;t&&t.onChildViewUpdate(this)}destroy(t){this._ownedContext&&!t?this._ownedContext.destroy(t):(t===!0||t?.context===!0)&&this._context.destroy(t),this._ownedContext=null,this._context=null,super.destroy(t)}_callContextMethod(t,e){return this.context[t](...e),this}setFillStyle(...t){return this._callContextMethod("setFillStyle",t)}setStrokeStyle(...t){return this._callContextMethod("setStrokeStyle",t)}fill(...t){return this._callContextMethod("fill",t)}stroke(...t){return this._callContextMethod("stroke",t)}texture(...t){return this._callContextMethod("texture",t)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...t){return this._callContextMethod("arc",t)}arcTo(...t){return this._callContextMethod("arcTo",t)}arcToSvg(...t){return this._callContextMethod("arcToSvg",t)}bezierCurveTo(...t){return this._callContextMethod("bezierCurveTo",t)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...t){return this._callContextMethod("ellipse",t)}circle(...t){return this._callContextMethod("circle",t)}path(...t){return this._callContextMethod("path",t)}lineTo(...t){return this._callContextMethod("lineTo",t)}moveTo(...t){return this._callContextMethod("moveTo",t)}quadraticCurveTo(...t){return this._callContextMethod("quadraticCurveTo",t)}rect(...t){return this._callContextMethod("rect",t)}roundRect(...t){return this._callContextMethod("roundRect",t)}poly(...t){return this._callContextMethod("poly",t)}regularPoly(...t){return this._callContextMethod("regularPoly",t)}roundPoly(...t){return this._callContextMethod("roundPoly",t)}roundShape(...t){return this._callContextMethod("roundShape",t)}filletRect(...t){return this._callContextMethod("filletRect",t)}chamferRect(...t){return this._callContextMethod("chamferRect",t)}star(...t){return this._callContextMethod("star",t)}svg(...t){return this._callContextMethod("svg",t)}restore(...t){return this._callContextMethod("restore",t)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...t){return this._callContextMethod("rotate",t)}scaleTransform(...t){return this._callContextMethod("scale",t)}setTransform(...t){return this._callContextMethod("setTransform",t)}transform(...t){return this._callContextMethod("transform",t)}translateTransform(...t){return this._callContextMethod("translate",t)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(t){this._context.fillStyle=t}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(t){this._context.strokeStyle=t}clone(t=!1){return t?new M(this._context.clone()):(this._ownedContext=null,new M(this._context))}lineStyle(t,e,r){n(l,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const o={};return t&&(o.width=t),e&&(o.color=e),r&&(o.alpha=r),this.context.strokeStyle=o,this}beginFill(t,e){n(l,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const r={};return t&&(r.color=t),e&&(r.alpha=e),this.context.fillStyle=r,this}endFill(){n(l,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const t=this.context.strokeStyle;return(t.width!==a.defaultStrokeStyle.width||t.color!==a.defaultStrokeStyle.color||t.alpha!==a.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...t){return n(l,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",t)}drawEllipse(...t){return n(l,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",t)}drawPolygon(...t){return n(l,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",t)}drawRect(...t){return n(l,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",t)}drawRoundedRect(...t){return n(l,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",t)}drawStar(...t){return n(l,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",t)}}export{M as G,F as S,R as T};