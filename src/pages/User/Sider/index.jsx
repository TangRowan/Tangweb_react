import React, { Component } from 'react';
import {
    FileSearchOutlined,
    EditOutlined,
    FileAddOutlined,
    SettingOutlined ,
    ReadOutlined,
    HomeOutlined
  } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import PubSub from 'pubsub-js';
import './index.css'
import Logo from './logo-smc.png'
import {connect} from 'react-redux'
  const {  Sider } = Layout;
  const { SubMenu } = Menu;
  
class USider extends Component {
  state = {
      collapsed: false,
    };
    
  onCollapse = collapsed => {
    PubSub.publish('bcollapsed',{collapsed:collapsed})
    this.setState({ collapsed });
  };
  componentDidMount(){
    this.token = PubSub.subscribe('bcollapsed',(_,stateObj)=>{
      this.setState(stateObj)
    })
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }
  render() {
    const { collapsed } = this.state;
    return <Sider width='300' collapsible collapsed={collapsed} onCollapse={this.onCollapse} collapsedWidth='110'>
        <div className="logo" ><img src={Logo} width="270" height="72" alt=""/></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="home">Home</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<EditOutlined />} title="Project Requests">
            <Menu.Item key="2"><Link to="new_prop">First-year Proposal</Link></Menu.Item>
            <Menu.Item key="3"><Link to="Crequest">Continuation Proposal</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<ReadOutlined/>}>
            <Link to="creport">Project Reports</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileSearchOutlined />}>
            <Link to="my_request">My Proposals</Link>
            </Menu.Item>
                      
            
            <SubMenu key="sub2" icon={<SettingOutlined />} title="User Center">
            <Menu.Item key="7"><Link to="profile">User Profile</Link></Menu.Item>
            <Menu.Item key="8"><Link to="change_password">Change Password</Link></Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>;
  }
}
export default connect(
	state => ({
		Email:state.userinf.Email,
    Admin:state.userinf.Admin,
    Name:state.userinf.Name,
    User:state.userinf.User,
    Committee:state.userinf.Committee,
    Userp:state.userinf.Userpower,
	}),
	{}
)(USider)
