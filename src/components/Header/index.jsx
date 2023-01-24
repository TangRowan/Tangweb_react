//统一的header
import React, { Component } from 'react';
import { Header} from 'antd/lib/layout/layout';
import { Space ,Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons';
import PubSub from 'pubsub-js';

import './index.css'

import Logout from './Logout';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class UHeader extends Component {
    state = {
        collapsed: false,
      };
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
        PubSub.publish('bcollapsed',{collapsed:!this.state.collapsed})
      };
    componentDidMount(){
    
      this.token = PubSub.subscribe('collapsed',(_,stateObj)=>{
        this.setState(stateObj)
      })
    }
  
    componentWillUnmount(){
      PubSub.unsubscribe(this.token)
    }
    onClick
    
  render() {
    return <Header className="ant-layout-header" style={{ padding: 0 }}>
        <div className="hleft">
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
            })}
        </div>
        <div className="hright">
        &nbsp;Welcome, <b>{this.props.Name} </b>!<Logout/>
        </div>
         <div className="hright2">
           
             <Menu defaultSelectedKeys={this.props.def} mode="horizontal">
                <Menu.Item key="1">
                <Link to="/user">User</Link>
                </Menu.Item>
                <Menu.Item key="2">
                <Link to="/committee">Committee member</Link>  
                </Menu.Item>
                <Menu.Item key="3">
                <Link to="/admin">Administrator</Link>
                </Menu.Item>
              </Menu>
        
          </div>
  </Header>;
  }
}

export default connect(
	state => ({
		Email:state.userinf.Email,
    Admin:state.userinf.Admin,
    Name:state.userinf.Name,
    User:state.userinf.User,
    Committee:state.userinf.Committee,
	}),
	{}
)(UHeader)

