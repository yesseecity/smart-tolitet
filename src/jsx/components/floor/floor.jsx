import React from 'react';

import './floor.scss'

export class Floor extends React.Component {
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
      <div className="floor" id={"floor-"+ this.props.id}>
          {/* <img src="./imgs/floor-12.jpg" alt="{this.props.id+’地圖’}"/> */}
          <div className="toilet-ladies alert">
            <svg height="210" width="200">
              <circle cx="41" cy="-1" r="40" stroke="red" strokeWidth="2" fillOpacity="0.0" />
              <circle cx="42" cy="-2" r="24" stroke="red" strokeWidth="2" fillOpacity="0.0" />
              <line x1="0"  y1="1"  x2="18" y2="1"  stroke="red" strokeWidth="2" />
              <line x1="41" x2="41" y1="21" y2="38" stroke="red" strokeWidth="2"></line>
            </svg>
          </div>
          <div className="toilet-gentlemen ">
            <svg height="210" width="200">
              <circle cx="0" cy="-11" r="40" stroke="red" strokeWidth="2" fillOpacity="0.0" />
              <line x1="0" y1="1" x2="38" y2="1" stroke="red" strokeWidth="2"/>
              <line x1="1" y1="0" x2="1" y2="29" stroke="red" strokeWidth="2"/>
            </svg>
          </div>
          <img src="./imgs/floor-12.png" alt="{this.props.id+’地圖’}"/>
      </div>
    );
  }
}