//统一的header
import React, { Component } from 'react';
import { Header} from 'antd/lib/layout/layout';
import './index.css'
import {connect} from 'react-redux'
import { Menu ,Image,Col, Row,Card,Divider,Typography} from 'antd';

import {Link} from 'react-router-dom'
import {

  ProjectOutlined,
  ReadOutlined,
  HomeOutlined,
  ExperimentOutlined,
  BookOutlined 
} from '@ant-design/icons';
const { Title } = Typography;
class UHeader extends Component {
 
  render() {
    return <Header className="ant-layout-header" style={{ padding: 0 ,height:180 }}> 
     <Title level={4}> </Title>
       <Row justify="center" align="middle">
        <Col span={7}offset={2}>
        <Image
          preview={false}
          width={180}
          src={require('../img/gridlocktext.png')}
        /></Col>
        <Col span={7}offset={4}>
        <Image
        preview={false}
          width={180}
          src={require('../img/logo.png')}
        /></Col>
        </Row>
        <Title level={4}> </Title>
      <Menu className="ant-layout-header2" mode="horizontal"  >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/gridlock/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined />}>
          <Link to="/gridlock/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <Link to="/gridlock/research">Research</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BookOutlined />}>
          <Link to="/gridlock/publications">Publications</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ExperimentOutlined />}>
          <Link to="/gridlock/help">Help Our Testing</Link>
        </Menu.Item>
      </Menu>
        
  </Header>;
  }
}

export default connect(
	state => ({
	}),
	{}
)(UHeader)

