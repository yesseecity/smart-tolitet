import React from 'react';

import './floor.scss'

export class Floor extends React.Component {
  constructor(props) {
    // console.log('Lifecycle - constructor')
    super(props);

    this.floorDom = React.createRef();
  }
  componentDidMount() {
    // console.log('Lifecycle - componentDidMount');
  }
  componentDidUpdate() {
    // console.log('Lifecycle - componentDidUpdate');
  }
  resetFloor(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.resetFloor(e);
  }
  render() {
    // console.log('Lifecycle - render')
    return (
      <div className="floor" id={"floor-"+ this.props.id} ref={this.floorDom}
        onClick={(e)=>{ this.props.expandFloor(e)} }
        >
          {/* <img src="./imgs/floor-12.jpg" alt="{this.props.id+’地圖’}"/> */}
          <div className="toilet-ladies ">
            <svg>
              <circle cx="50" cy="-1" r="47" stroke="red" strokeWidth="2" fillOpacity="0.0" />
              <circle cx="49" cy="-2" r="26" stroke="red" strokeWidth="2" fillOpacity="0.0" />
              <line x1="3"  y1="1"  x2="22" y2="1"  stroke="red" strokeWidth="2" />
              <line x1="51" x2="51" y1="25" y2="45" stroke="red" strokeWidth="2"></line>
            </svg>
          </div>
          <div className="toilet-gentlemen alert">
            <svg>
              <circle cx="3" cy="-11" r="45" stroke="red" strokeWidth="2" fillOpacity="0.0" />
              <line x1="0" y1="1" x2="46" y2="1" stroke="red" strokeWidth="2"/>
              <line x1="1" y1="0" x2="1" y2="33" stroke="red" strokeWidth="2"/>
            </svg>
          </div>
          <img src="./imgs/floor-12.png" alt="{this.props.id+’地圖’}"/>
          <div className="cross" onClick={(e)=>{ this.resetFloor(e) }}>
            <svg>
              <line x1="0" y1="0" x2="36" y2="36" stroke="black" strokeWidth="2"/>
              <line x1="0" y1="36" x2="36" y2="0" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
      </div>
    );
  }
}