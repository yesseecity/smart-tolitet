import React from 'react';
import axios from 'axios';
import TWEEN from '@tweenjs/tween.js';

import * as THREE from 'three';
// import {Scene} from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {Floor} from '../floor/floor.jsx';



export class Building extends React.Component {
  constructor(props) {
    // console.log('Lifecycle - constructor')
    super(props);
    
    this.floorArray = [...Array(8).keys()];

    this.scene = new THREE.Scene();
    window.scene = this.scene;

    this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 2000 );
    // this.camera = new THREE.OrthographicCamera( window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, 1, 1000 );
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
    
    const controls = new OrbitControls(this.camera, this.renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 10000;
    window.addEventListener( 'resize', ()=>{this.windowResize()}, false );
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

      this.floorObjArray = [];
      for(let id of this.floorArray) {
        const floorObj = new CSS3DObject(document.getElementById('floor-'+id.toString()));
        floorObj.position.set(0, 15*id, 0);
        floorObj.rotation.set(-3.14*0.5, 0, 0);
        floorObj.scale.set(scaleRay, scaleRay, scaleRay);
        this.scene.add(floorObj);
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
  windowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    console.log('resize')
    this.animate();
  }
  animate() {
    console.log('anime');
    this.renderer.render(this.scene, this.camera );

    setTimeout(() => {
      requestAnimationFrame( ()=>{this.animate()} );
      
    }, 100);

  }
  drawCube () {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
    window.cube = cube;
  }
  drawPath () {
    var lineCurve3 = new THREE.LineCurve3(new THREE.Vector3(0.2, 0.2, 0), new THREE.Vector3(0.2, 0.2, 10));

    const path = new THREE.CurvePath();
    path.add(lineCurve3);

    // const points = path.getPoints(4);
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
  apiAxiosGet() {
    axios.get('http://httpbin.org/get')
      .then((response)=>{
        console.log('response: ', response)
      })
      .catch((error)=>{
        console.error('error: ', error);
      });
  }
  apiAxiosPost() {
    var body = {
      firstName: 'testName',
      lastName: 'testLastName'
    };

    // for header Content-Type is application/json
    axios.post('http://httpbin.org/post', body)
      .then((response)=>{
        console.log('response: ', response);
      })
      .catch((error)=>{
        console.error('error: ', error);
      });

    // for header Content-Type is application/x-www-form-urlencoded
    var params = new URLSearchParams();
    params.append('user',JSON.stringify(body))
    axios.post('http://httpbin.org/post', params);
  }
  renderFloor() {
    let domList = [];
    for (let floorId of this.floorArray) {
      console.log('>>>>>', floorId)
      domList.push(<Floor id={floorId.toString()}/>) 
    }
    // console.log(domList)
    console.log(this.floorArray)
    return domList;
  }
  render() {
    // console.log('Lifecycle - render')
    return (
      <div className="building" id="sceneDom">
        {/* <h1>building</h1> */}
        
        <div className="scene-elements">
          {this.renderFloor()}
          {/* <Floor id="1" />
          <Floor id="2" />
          <Floor id="3" />
          <Floor id="4" /> */}
        </div>
      </div>
    );
  }
}