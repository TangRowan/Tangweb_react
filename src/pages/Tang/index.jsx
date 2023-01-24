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


const Teach= lazy(()=> import('./Contents/Teach'))
const Projects= lazy(()=> import('./Contents/Projects'))



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
          <Header def='3'/>
          <Content  style={{ margin: ' 16px 16px' }}>
          <BackTop />
          <Suspense fallback={<Loading/>}>
          <Routes>
                <Route index element = {<Home/>}/> 
                <Route path="home"  element = {<Home/>}/> 
                <Route path="teaching"  element = {<Teach/>}/> 
                <Route path="projects"  element = {<Projects/>}/> 
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