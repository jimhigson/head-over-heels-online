import{T as h,a as x,n as c}from"./index-Dg-CxzVH.js";let m=0;class f{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,o,t){const i=new h({...this.textureOptions,width:e,height:o,resolution:1,antialias:t,autoGarbageCollect:!0});return new x({source:i,label:`texturePool_${m++}`})}getOptimalTexture(e,o,t=1,i){let s=Math.ceil(e*t-1e-6),u=Math.ceil(o*t-1e-6);s=c(s),u=c(u);const n=(s<<17)+(u<<1)+(i?1:0);this._texturePool[n]||(this._texturePool[n]=[]);let r=this._texturePool[n].pop();return r||(r=this.createTexture(s,u,i)),r.source._resolution=t,r.source.width=s/t,r.source.height=u/t,r.source.pixelWidth=s,r.source.pixelHeight=u,r.frame.x=0,r.frame.y=0,r.frame.width=e,r.frame.height=o,r.updateUvs(),this._poolKeyHash[r.uid]=n,r}getSameSizeTexture(e,o=!1){const t=e.source;return this.getOptimalTexture(e.width,e.height,t._resolution,o)}returnTexture(e){const o=this._poolKeyHash[e.uid];this._texturePool[o].push(e)}clear(e){if(e=e!==!1,e)for(const o in this._texturePool){const t=this._texturePool[o];if(t)for(let i=0;i<t.length;i++)t[i].destroy(!0)}this._texturePool={}}}const p=new f,a={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},_={...a,vertex:{...a.vertex,header:a.vertex.header.replace("group(1)","group(2)")}},P={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class b{constructor(){this.batcherName="default",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}}function g(l,e,o){const t=(l>>24&255)/255;e[o++]=(l&255)/255*t,e[o++]=(l>>8&255)/255*t,e[o++]=(l>>16&255)/255*t,e[o++]=t}export{b as B,p as T,a,P as b,g as c,_ as l};
