//加载页面
import './index.css'

import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return <div id='loading'>
    <div className="dot"/>
    <div className="dot"/>
    <div className="dot"/>
    <div className="dot"/>
    <div className="dot"/>
  </div>;
  }
}
