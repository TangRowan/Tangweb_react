import React, { Component } from 'react';
import {
    FileSearchOutlined,
    SlidersOutlined,
    ContainerOutlined,
    BookOutlined,
    SettingOutlined ,
    HomeOutlined 
  } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import {
  Link
} from 'react-router-dom'
import PubSub from 'pubsub-js';
import Logo from './logo-smc.png'
import {connect} from 'react-redux'
import axios from 'axios';
  const {  Sider } = Layout;
  const { SubMenu } = Menu;
  class ASider extends Component {
    
  state = {
    collapsed: false,
    years:[],
  };
  
  onCollapse = collapsed => {
    PubSub.publish('bcollapsed',{collapsed:collapsed})
    this.setState({ collapsed });
  };
  componentDidMount(){
    this.token = PubSub.subscribe('bcollapsed',(_,stateObj)=>{
      this.setState(stateObj)
    })
    axios.get(this.props.url+'/IEEEbackend/searchdata.php?!='+"16").then(
      response => {
          if(response.data.state['success']===1)
          this.setState({
           years: response.data.datas
          })
         
          },
      error => {
          this.openmsg('error','','Can not find server');
          
      }
    )
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }
  render() {
    const { collapsed } = this.state;
    return <Sider width='300' collapsible collapsed={collapsed} onCollapse={this.onCollapse} collapsedWidth='110'>
    <div className="logo" ><img src={Logo} width="270" height="72" alt=""/></div>
        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
            <Menu.Item key="0" icon={<HomeOutlined />}>
            <Link to="home">Home</Link>
            </Menu.Item>
            

            <Menu.Item key="1" icon={<FileSearchOutlined />}>
            <Link to="evaluations">Evaluate Proposals</Link>
            </Menu.Item>

            <SubMenu key="sub1" icon={<ContainerOutlined />} title="View Projects">
            {this.state.years.map(item => (
              item!=='2020'?<Menu.Item key={item+'2'}><Link to={"bproject/"+item}>{item}</Link></Menu.Item>:null
             ))
            }
            </SubMenu>
          
            <Menu.Item key="3" icon={<BookOutlined />}>
            <Link to="breports">View Project Reports</Link>
            </Menu.Item>
            
     
            
            <SubMenu key="sub2" icon={<SettingOutlined />} title="User Center">
            <Menu.Item key="5"><Link to="profile">User Profile</Link></Menu.Item>
            <Menu.Item key="6"><Link to="change_password">Change Password</Link></Menu.Item>
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
    Committeep:state.userinf.Committeepower,
    url:state.Backurl.url,
	}),
	{}
)(ASider)
