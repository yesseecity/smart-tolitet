import React,{useEffect} from 'react';
import './charts.scss'

export class Charts extends React.Component {
  constructor(props) {
    // console.log('Lifecycle - constructor')
    super(props);

    this.floorId = 0;
    this.expanded = false;
    
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
      <>
        <div className={this.expanded ? 'charts': 'charts hidden'}>
          charts
          <div className="toilet-info">
            <div className="toilet-titile">{this.floorId+1}樓男廁</div>
          </div>
        </div>
      </>
    );
  }
}