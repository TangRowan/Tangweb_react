//统一的header
import React, { Component } from 'react';
import { Header} from 'antd/lib/layout/layout';
import './index.css'
import {connect} from 'react-redux'
import { Menu ,Image,Col, Row,Card,Divider,Typography} from 'antd';

import {Link} from 'react-router-dom'
import {

  ProjectOutlined,
  FundViewOutlined,
  HomeOutlined,
  PhoneOutlined,
  PrinterOutlined,
  MailOutlined 
} from '@ant-design/icons';
const { Title } = Typography;
class UHeader extends Component {
 
  render() {
    return <Header className="ant-layout-header" style={{ padding: 0 ,height:320 }}> 
     <Title level={4}> </Title>
       <Row justify="center" align="middle">
        <Col span={6}offset={2}>
        <Image
          preview={false}
          width={200}
          src={require('../img/engineering_lake_day.jpg')}
        /></Col>
        <Col span={8}>
        <Title>Dr. Ying (Gina) Tang</Title>
        <Title level={4}> Professor & Associate Chair</Title>
        <Title level={5}> <a href='https://engineering.rowan.edu/'>Department of Electrical & Computer Engineering</a></Title>
        <Title level={5}> <PhoneOutlined /> Phone: <a href='tel:+18562565339'>(856) 256-5339 </a>/ <PrinterOutlined /> Fax: <a href='tel:+18562565241'>(856)-256-5241</a></Title>
        <Title level={5}> <MailOutlined /> E-mail: <a href='mailto:tang@rowan.edu'>tang@rowan.edu</a></Title>
        
        </Col>
        
        <Col span={6}offset={2}>
        <Image
          width={200}
          src={require('../img/tang_04-08.jpg')}
        /></Col>
        </Row>
        <Title level={4}> </Title>
      <Menu className="ant-layout-header2" mode="horizontal"  >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/tang/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FundViewOutlined />}>
          <Link to="/tang/teaching">Teaching</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ProjectOutlined />}>
          <Link to="/tang/projects">Projects</Link>
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

