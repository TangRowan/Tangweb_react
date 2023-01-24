//Admin路由配置页面
import React, { Component,lazy,Suspense } from 'react';
import { Layout,BackTop,Card} from 'antd';
import Footer from './Footer';
import Header from './Header';
import NotFound from '../NotFound'
import Loading from '../../components/Loading';
import Home from './Contents/Home';
import {
  Routes,
  Route,
} from 'react-router-dom'
import './index.css'


const About= lazy(()=> import('./Contents/About'))
const Research= lazy(()=> import('./Contents/Research'))
const Publications= lazy(()=> import('./Contents/Publications'))
const Help= lazy(()=> import('./Contents/Help'))

const { Content} = Layout;

export default class index extends Component {
    
  render() {
    return (
      <div  className="card">
<Card bordered={false} style={{
        width: 1200,
      }}>
    
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Header/>
          <Content  style={{ margin: ' 16px 16px' }}>
          <BackTop />
          <Suspense fallback={<Loading/>}>
          <Routes>
                <Route index element = {<Home/>}/> 
                <Route path="home"  element = {<Home/>}/> 
                <Route path="about"  element = {<About/>}/> 
                <Route path="research"  element = {<Research/>}/> 
                <Route path="publications"  element = {<Publications/>}/> 
                <Route path="help"  element = {<Help/>}/> 
                <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
      </Card>
      </div>
    );
  }
}