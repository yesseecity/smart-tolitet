import React from 'react';
import axios from 'axios';
import TWEEN from '@tweenjs/tween.js/dist/tween.esm.js';

import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {Floor} from '../floor/floor.jsx';



export class Building extends React.Component {
  constructor(props) {
    // console.log('Lifecycle - constructor')
    super(props);

    this.totalFloor = 8;
    this.floorArray = [];

    this.scene = new THREE.Scene();
    window.scene = this.scene;

    this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 2000 );
    window.camera = this.camera;
    
    this.rendererType = 'css2d';
    this.rendererType = 'css3d';
    // this.rendererType = 'WebGL';
    if (this.rendererType == 'css2d') {
      this.renderer = new CSS2DRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.renderer.domElement.style.position = 'absolute';
      this.renderer.domElement.style.top = '0px';
      
      this.camera.position.set(0, 100, 200);
      this.camera.lookAt(0, 0, 0);
    } else if (this.rendererType == 'css3d') {
      this.renderer = new CSS3DRenderer();
			this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.renderer.domElement.style.position = 'absolute';
      this.renderer.domElement.style.top = '0px';

      this.camera.position.set(140, 180, 260);
    } else {
      
      this.scene.background = new THREE.Color("rgb(255, 255, 255)");
      this.renderer = new THREE.WebGLRenderer();
      this.camera.position.set(7.8, 7.8, 7.8);
      this.camera.up = new THREE.Vector3( 0, 0, 1 );
      this.camera.lookAt(0, 0, 0);
    }
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    
    // const controls = new OrbitControls(this.camera, this.renderer.domElement );
    // controls.minDistance = 5;
    // controls.maxDistance = 10000;



    window.addEventListener( 'resize', ()=>{this.windowResize()}, false );

    // if (navigator.userAgent.indexOf("Firefox") > -1) {
    //   window.addEventListener('DOMMouseScroll', (e)=>{this.mouseScroll(e)}, false );
    // } else {
    //   window.addEventListener('mousewheel', (e)=>{this.mouseScroll(e)}, false );
    // }
  }
  componentDidMount() {
    console.log('Lifecycle - componentDidMount');
    window.sceneDom.appendChild( this.renderer.domElement );

    if (this.rendererType == 'css2d') {
      const floor2Obj = new CSS2DObject(document.getElementById('floor-2'));
      floor2Obj.position.set(0, 0, 0);
      this.scene.add(floor2Obj);
      window.floor2Obj = floor2Obj;
  
      const floor3Obj = new CSS2DObject(document.getElementById('floor-3'));
      floor3Obj.position.set(0.5, 0.5, -0.5);
      this.scene.add(floor3Obj);
      window.floor3Obj = floor3Obj;
  
      const floor4Obj = new CSS2DObject(document.getElementById('floor-4'));
      floor4Obj.position.set(1, 1, -1);
      this.scene.add(floor4Obj);
      window.floor4Obj = floor4Obj;
        
    } else if (this.rendererType == 'css3d') {
      var scaleRay = 0.2;
      this.createPath()
      
      for(let id = 0; id < this.totalFloor; id++) {
        const dom = document.getElementById('floor-'+id.toString())
        // dom.addEventListener('mouseover', (e)=>{console.log('hover: ', e)}, false)
        dom.addEventListener('mouseenter', (e)=>{this.mouseHover(e)}, false)
        dom.addEventListener('mouseleave', (e)=>{this.mouseHover(e)}, false)
        const floorObj = new CSS3DObject(dom);
        const pos = this.path.getPoint( 1/7*id );
        console.log(pos)
        floorObj.position.set(pos.x, pos.y, pos.z);
        floorObj.rotation.set(-3.14*0.5, 0, 0);
        floorObj.scale.set(scaleRay, scaleRay, scaleRay);
        
        this.scene.add(floorObj);
        this.floorArray.push({'obj': floorObj, 'oriPose': Object.assign({}, floorObj.position)});
        // this.floorArray.push(floorObj)
      }
      this.camera.lookAt(0, 50, 0);

    } else {
      this.drawAxesHelper();
      // this.drawArrowHelper();
      // this.drawCube();
      this.drawPath();
    }
    

    // this.renderer.render(this.scene, this.camera );
    this.animate();
  }
  componentDidUpdate() {
    // console.log('Lifecycle - componentDidUpdate');
  }
  animate() {
    // console.log('anime');
    this.renderer.render(this.scene, this.camera );
    
    TWEEN.update()

    // setTimeout(() => {
    //   requestAnimationFrame( ()=>{this.animate()} );
    // }, 200);

  }
  createPath() {
    var lineCurve3 = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0));
    const path = new THREE.CurvePath();
    path.add(lineCurve3);
    this.path = path;
  }
  drawCube () {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    window.cube = cube;
  }
  drawPath () {
    this.createPath()

    const points = path.getPoints( 10 );
    console.log(points)
    for(let i=0;i<9; i+=0.1) {
      console.log(path.getPoint( i ))
    }
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color: 0x000000 } );

    const line = new THREE.Line( geometry, material );
    this.scene.add( line );
  }
  drawArrowHelper() {
    const arrowHelper = new THREE.Group();

    const origin = new THREE.Vector3( 0, 0, 0 );
    const length = 1;

    const directionX = new THREE.Vector3( 1, 0, 0 );
    directionX.normalize();
    const arrowHelperX = new THREE.ArrowHelper( directionX, origin, length, 0xff0000 );
    arrowHelper.add(arrowHelperX);
    
    const directionY = new THREE.Vector3( 0, 1, 0 );
    directionY.normalize();
    const arrowHelperY = new THREE.ArrowHelper( directionY, origin, length, 0x00ff00 );
    arrowHelper.add(arrowHelperY);
    
    const directionZ = new THREE.Vector3( 0, 0, 1);
    directionY.normalize();
    const arrowHelperZ = new THREE.ArrowHelper( directionZ, origin, length, 0x0000ff );
    arrowHelper.add(arrowHelperZ);
    
    arrowHelper.position.set(-0.1, 0, 0);
    this.scene.add(arrowHelper);
  }
  drawAxesHelper() {
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
  }
  windowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    console.log('resize')
    this.animate();
  }
  mouseScroll(e) {
    let delta = 3;
    if (navigator.userAgent.indexOf("Firefox") > -1) {
      delta = event.detail*-40;
    } else {
      delta = event.wheelDelta;
    }
    console.log('mouse scroll: ', delta );
  }
  mouseHover(e) {
    e.stopPropagation();
    
    const targetIdx = parseInt(e.target.id.replace('floor-', ''));;
    const floorObj = this.floorArray[targetIdx].obj;

    let mode = "";
    if (targetIdx == this.floorArray.length-1) {
      // floor on the top
      mode = "top";
    } else if (targetIdx == 0) {
      // floor on the bottom
      mode = "bottom";
    } else {
      mode = "middle"
    }

    switch (e.type) {
      case 'mouseenter':
        console.log(mode)
        var delta = 0;
        delta = Math.abs(this.floorArray[0].obj.position.y - this.floorArray[1].obj.position.y);
        this.delta = delta;


        switch (mode) {
          case "top":
            this.tween(
              this.floorArray[targetIdx-1].obj.position, 
              {'y': this.floorArray[targetIdx-1].oriPose.y-delta*0.5},
              ()=>{
                if (this.floorArray[targetIdx-1].obj.position.y.toFixed(5) > (this.floorArray[targetIdx-1].oriPose.y-delta*0.5).toFixed(5)) {
                  setTimeout(() => {
                    this.animate()
                  }, 5);
                }
              }
            );
            break;
          case "middle":
            this.tween(
              this.floorArray[targetIdx-1].obj.position, 
              {'y': this.floorArray[targetIdx-1].oriPose.y-delta*0.5},
              ()=>{
                if (this.floorArray[targetIdx-1].obj.position.y.toFixed(5) > (this.floorArray[targetIdx-1].oriPose.y-delta*0.5).toFixed(5)) {
                  setTimeout(() => {
                    this.animate()
                  }, 5);
                }
              }
            );

            this.tween(
              this.floorArray[targetIdx+1].obj.position, 
              {'y': this.floorArray[targetIdx+1].oriPose.y+delta*0.5},
               ()=>{
              if (this.floorArray[targetIdx+1].obj.position.y.toFixed(5) < (this.floorArray[targetIdx+1].oriPose.y+delta*0.5).toFixed(5)) {
                setTimeout(() => {
                  this.animate()
                }, 0);
              }
            });
            break;
          case "bottom":
            this.tween(
              this.floorArray[targetIdx+1].obj.position, 
              {'y': this.floorArray[targetIdx+1].oriPose.y+delta*0.5},
               ()=>{
              if (this.floorArray[targetIdx+1].obj.position.y.toFixed(5) < (this.floorArray[targetIdx+1].oriPose.y+delta*0.5).toFixed(5)) {
                setTimeout(() => {
                  this.animate()
                }, 0);
              }
            });
        };

        this.animate()
        break;
      case 'mouseleave':
        switch (mode) {
          case "top":
            this.tween(this.floorArray[targetIdx-1].obj.position, this.floorArray[targetIdx-1].oriPose, ()=>{
              if (this.floorArray[targetIdx-1].obj.position.y.toFixed(5) < this.floorArray[targetIdx-1].oriPose.y.toFixed(5)) {
                setTimeout(() => {
                  this.animate()
                }, 0);
              }
            });
            break;
          case "middle":
            this.tween(this.floorArray[targetIdx-1].obj.position, this.floorArray[targetIdx-1].oriPose, ()=>{
              if (this.floorArray[targetIdx-1].obj.position.y.toFixed(5) < this.floorArray[targetIdx-1].oriPose.y.toFixed(5)) {
                setTimeout(() => {
                  this.animate()
                }, 0);
              }
            });
            this.tween(this.floorArray[targetIdx+1].obj.position, this.floorArray[targetIdx+1].oriPose, ()=>{
              if (this.floorArray[targetIdx+1].obj.position.y.toFixed(5) > this.floorArray[targetIdx+1].oriPose.y.toFixed(5)) {
                setTimeout(() => {
                  this.animate()
                }, 0);
              }
            });
            break;
          case "bottom":
            this.tween(this.floorArray[targetIdx+1].obj.position, this.floorArray[targetIdx+1].oriPose, ()=>{
              if (this.floorArray[targetIdx+1].obj.position.y.toFixed(5) > this.floorArray[targetIdx+1].oriPose.y.toFixed(5)) {
                setTimeout(() => {
                  this.animate()
                }, 0);
              }
            });
            break;
        }

        this.animate()
        break;
    }
  }
  tween(from, to, callback) {
    new TWEEN.Tween(from)
    .to(to, 200)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(()=>{
      callback()
    })
    .start();
  }
  renderFloor() {
    let domList = [];

    for(let floorId = 0; floorId < this.totalFloor; floorId++) {
      domList.push(<Floor id={floorId.toString()} key={"floor-"+floorId.toString()} />) ;
    }
    return domList;
  }
  render() {
    // console.log('Lifecycle - render')
    return (
      <div className="building" id="sceneDom">
        <div className="scene-elements">
          {this.renderFloor()}
        </div>
      </div>
    );
  }
}