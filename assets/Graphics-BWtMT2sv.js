import{V as p,G as l,d as r,v as s}from"./index-CSEpfbXx.js";const M={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},i=0,a=1,h=2,c=3,d=4,u=5,x=class _{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<i)}set blend(t){!!(this.data&1<<i)!==t&&(this.data^=1<<i)}get offsets(){return!!(this.data&1<<a)}set offsets(t){!!(this.data&1<<a)!==t&&(this.data^=1<<a)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<h)}set culling(t){!!(this.data&1<<h)!==t&&(this.data^=1<<h)}get depthTest(){return!!(this.data&1<<c)}set depthTest(t){!!(this.data&1<<c)!==t&&(this.data^=1<<c)}get depthMask(){return!!(this.data&1<<u)}set depthMask(t){!!(this.data&1<<u)!==t&&(this.data^=1<<u)}get clockwiseFrontFace(){return!!(this.data&1<<d)}set clockwiseFrontFace(t){!!(this.data&1<<d)!==t&&(this.data^=1<<d)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=M[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new _;return t.depthTest=!1,t.blend=!0,t}};x.default2d=x.for2d();let y=x;class f extends p{constructor(t){t instanceof l&&(t={context:t});const{context:e,roundPixels:o,...n}=t||{};super({label:"Graphics",...n}),this.renderPipeId="graphics",e?this._context=e:this._context=this._ownedContext=new l,this._context.on("update",this.onViewUpdate,this),this.allowChildren=!1,this.roundPixels=o??!1}set context(t){t!==this._context&&(this._context.off("update",this.onViewUpdate,this),this._context=t,this._context.on("update",this.onViewUpdate,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}updateBounds(){}containsPoint(t){return this._context.containsPoint(t)}destroy(t){this._ownedContext&&!t?this._ownedContext.destroy(t):(t===!0||t?.context===!0)&&this._context.destroy(t),this._ownedContext=null,this._context=null,super.destroy(t)}_callContextMethod(t,e){return this.context[t](...e),this}setFillStyle(...t){return this._callContextMethod("setFillStyle",t)}setStrokeStyle(...t){return this._callContextMethod("setStrokeStyle",t)}fill(...t){return this._callContextMethod("fill",t)}stroke(...t){return this._callContextMethod("stroke",t)}texture(...t){return this._callContextMethod("texture",t)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...t){return this._callContextMethod("arc",t)}arcTo(...t){return this._callContextMethod("arcTo",t)}arcToSvg(...t){return this._callContextMethod("arcToSvg",t)}bezierCurveTo(...t){return this._callContextMethod("bezierCurveTo",t)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...t){return this._callContextMethod("ellipse",t)}circle(...t){return this._callContextMethod("circle",t)}path(...t){return this._callContextMethod("path",t)}lineTo(...t){return this._callContextMethod("lineTo",t)}moveTo(...t){return this._callContextMethod("moveTo",t)}quadraticCurveTo(...t){return this._callContextMethod("quadraticCurveTo",t)}rect(...t){return this._callContextMethod("rect",t)}roundRect(...t){return this._callContextMethod("roundRect",t)}poly(...t){return this._callContextMethod("poly",t)}regularPoly(...t){return this._callContextMethod("regularPoly",t)}roundPoly(...t){return this._callContextMethod("roundPoly",t)}roundShape(...t){return this._callContextMethod("roundShape",t)}filletRect(...t){return this._callContextMethod("filletRect",t)}chamferRect(...t){return this._callContextMethod("chamferRect",t)}star(...t){return this._callContextMethod("star",t)}svg(...t){return this._callContextMethod("svg",t)}restore(...t){return this._callContextMethod("restore",t)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...t){return this._callContextMethod("rotate",t)}scaleTransform(...t){return this._callContextMethod("scale",t)}setTransform(...t){return this._callContextMethod("setTransform",t)}transform(...t){return this._callContextMethod("transform",t)}translateTransform(...t){return this._callContextMethod("translate",t)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(t){this._context.fillStyle=t}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(t){this._context.strokeStyle=t}clone(t=!1){return t?new f(this._context.clone()):(this._ownedContext=null,new f(this._context))}lineStyle(t,e,o){r(s,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const n={};return t&&(n.width=t),e&&(n.color=e),o&&(n.alpha=o),this.context.strokeStyle=n,this}beginFill(t,e){r(s,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const o={};return t!==void 0&&(o.color=t),e!==void 0&&(o.alpha=e),this.context.fillStyle=o,this}endFill(){r(s,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const t=this.context.strokeStyle;return(t.width!==l.defaultStrokeStyle.width||t.color!==l.defaultStrokeStyle.color||t.alpha!==l.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...t){return r(s,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",t)}drawEllipse(...t){return r(s,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",t)}drawPolygon(...t){return r(s,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",t)}drawRect(...t){return r(s,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",t)}drawRoundedRect(...t){return r(s,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",t)}drawStar(...t){return r(s,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",t)}}export{f as G,y as S};