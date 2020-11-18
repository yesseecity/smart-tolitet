import React,{useEffect} from 'react';
import './main.scss'

import {Building} from '../building/building.jsx';

export class Main extends React.Component {
  constructor(props) {
    // console.log('Lifecycle - constructor')
    super(props);

  }
  componentDidMount() {
    // console.log('Lifecycle - componentDidMount');

  }
  componentDidUpdate() {
    // console.log('Lifecycle - componentDidUpdate');
    
  }

  render() {
    // console.log('Lifecycle - render')
    return (
      <div className="main">
          <Building />
      </div>
    );
  }
}