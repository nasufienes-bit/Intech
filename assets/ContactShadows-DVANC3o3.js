import{o as e,r as t}from"./index-COXjdkGf.js";import{_ as n,b as r,c as i,d as a,f as o,h as s,l as c,m as l,u,v as d,x as f,y as p}from"./Scene3D-DPzlA-6K.js";function m(e,t=Math.PI/3){let n=Math.cos(t),i=1.0000000001*100,o=[new r,new r,new r],s=new r,c=new r,l=new r,u=new r;function d(e){return`${~~(e.x*i)},${~~(e.y*i)},${~~(e.z*i)}`}let f=e.index?e.toNonIndexed():e,p=f.attributes.position,m={};for(let e=0,t=p.count/3;e<t;e++){let t=3*e,n=o[0].fromBufferAttribute(p,t+0),i=o[1].fromBufferAttribute(p,t+1),a=o[2].fromBufferAttribute(p,t+2);s.subVectors(a,i),c.subVectors(n,i);let l=new r().crossVectors(s,c).normalize();for(let e=0;e<3;e++){let t=o[e],n=d(t);n in m||(m[n]=[]),m[n].push(l)}}let h=new a(new Float32Array(p.count*3),3,!1);for(let e=0,t=p.count/3;e<t;e++){let t=3*e,r=o[0].fromBufferAttribute(p,t+0),i=o[1].fromBufferAttribute(p,t+1),a=o[2].fromBufferAttribute(p,t+2);s.subVectors(a,i),c.subVectors(r,i),l.crossVectors(s,c).normalize();for(let e=0;e<3;e++){let r=o[e],i=m[d(r)];u.set(0,0,0);for(let e=0,t=i.length;e<t;e++){let t=i[e];l.dot(t)>n&&u.add(t)}u.normalize(),h.setXYZ(t+e,u.x,u.y,u.z)}}return f.setAttribute(`normal`,h),f}var h={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},g={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},_=e(t()),v=1e-5;function y(e,t,n){let r=new p,i=n-v;return r.absarc(v,v,v,-Math.PI/2,-Math.PI,!0),r.absarc(v,t-i*2,v,Math.PI,Math.PI/2,!0),r.absarc(e-i*2,t-i*2,v,Math.PI/2,0,!0),r.absarc(e-i*2,v,v,0,-Math.PI/2,!0),r}var b=_.forwardRef(function({args:[e=1,t=1,n=1]=[],radius:r=.05,steps:a=1,smoothness:o=4,bevelSegments:s=4,creaseAngle:c=.4,children:l,...u},d){return _.createElement(`mesh`,i({ref:d},u),_.createElement(x,{args:[e,t,n],radius:r,steps:a,smoothness:o,bevelSegments:s,creaseAngle:c}),l)}),x=_.forwardRef(function({args:[e=1,t=1,n=1]=[],radius:r=.05,steps:a=1,smoothness:o=4,bevelSegments:s=4,creaseAngle:c=.4,...l},u){let d=_.useMemo(()=>y(e,t,r),[e,t,r]),f=_.useMemo(()=>({depth:n-r*2,bevelEnabled:!0,bevelSegments:s*2,steps:a,bevelSize:r-v,bevelThickness:r,curveSegments:o}),[n,r,o,s,a]),p=_.useRef(null);return _.useLayoutEffect(()=>{p.current&&(p.current.center(),m(p.current,c))},[d,f,c]),_.useImperativeHandle(u,()=>p.current),_.createElement(`extrudeGeometry`,i({ref:p,args:[d,f]},l))}),S=_.forwardRef(({scale:e=10,frames:t=1/0,opacity:r=1,width:a=1,height:p=1,blur:m=1,near:v=0,far:y=10,resolution:b=512,smooth:x=!0,color:S=`#000000`,depthWrite:C=!1,renderOrder:w,...T},E)=>{let D=_.useRef(null),O=u(e=>e.scene),k=u(e=>e.gl),A=_.useRef(null);a*=Array.isArray(e)?e[0]:e||1,p*=Array.isArray(e)?e[1]:e||1;let[j,M,N,P,F,I,L]=_.useMemo(()=>{let e=new f(b,b),t=new f(b,b);t.texture.generateMipmaps=e.texture.generateMipmaps=!1;let r=new n(a,p).rotateX(Math.PI/2),i=new l(r),c=new s;c.depthTest=c.depthWrite=!1,c.onBeforeCompile=e=>{e.uniforms={...e.uniforms,ucolor:{value:new o(S)}},e.fragmentShader=e.fragmentShader.replace(`void main() {`,`uniform vec3 ucolor;
           void main() {
          `),e.fragmentShader=e.fragmentShader.replace(`vec4( vec3( 1.0 - fragCoordZ ), opacity );`,`vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );`)};let u=new d(h),m=new d(g);return m.depthTest=u.depthTest=!1,[e,r,c,i,u,m,t]},[b,a,p,e,S]),R=e=>{P.visible=!0,P.material=F,F.uniforms.tDiffuse.value=j.texture,F.uniforms.h.value=e*1/256,k.setRenderTarget(L),k.render(P,A.current),P.material=I,I.uniforms.tDiffuse.value=L.texture,I.uniforms.v.value=e*1/256,k.setRenderTarget(j),k.render(P,A.current),P.visible=!1},z=0,B,V;return c(()=>{A.current&&(t===1/0||z<t)&&(z++,B=O.background,V=O.overrideMaterial,D.current.visible=!1,O.background=null,O.overrideMaterial=N,k.setRenderTarget(j),k.render(O,A.current),R(m),x&&R(m*.4),k.setRenderTarget(null),D.current.visible=!0,O.overrideMaterial=V,O.background=B)}),_.useImperativeHandle(E,()=>D.current,[]),_.createElement(`group`,i({"rotation-x":Math.PI/2},T,{ref:D}),_.createElement(`mesh`,{renderOrder:w,geometry:M,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},_.createElement(`meshBasicMaterial`,{transparent:!0,map:j.texture,opacity:r,depthWrite:C})),_.createElement(`orthographicCamera`,{ref:A,args:[-a/2,a/2,p/2,-p/2,v,y]}))});export{b as n,S as t};