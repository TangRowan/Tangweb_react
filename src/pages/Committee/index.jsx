//Committee路由
import React, { Component,lazy,Suspense } from 'react';
import { Layout,BackTop} from 'antd';
import ASider from './Sider';
import AFooter from './Footer';
import AHeader from '../../components/Header';
import NotFound from '../NotFound'
import Loading from '../../components/Loading';
import Evaluations  from './Contents/Evaluations'
import Introduce from './Contents/Introduce';
import {
  Routes,
  Route,
} from 'react-router-dom'



const Bproject = lazy(()=> import('./Contents/Bproject'))
const Breports = lazy(()=> import('./Contents/Breports'))
const GoEva = lazy(()=> import('./Contents/GoEva'))
const EditEva = lazy(()=> import('./Contents/EditEva'))

const Browse = lazy(()=> import('../../components/Browse_proposal'))
const Breport = lazy(()=> import('../../components/Browse_report'))
const Projectd = lazy(()=> import('./Contents/Projectd'))
const Profile = lazy(()=> import('../../components/Profile'))
const Cpassword = lazy(()=> import('../../components/Cpassword'))




const { Content} = Layout;

export default class Committee extends Component {
    
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <ASider/>
        <Layout className="site-layout">
          <AHeader def='2'/>
          <Content  style={{ margin: ' 16px 16px'}}>
          <BackTop />
          <Suspense fallback={<Loading/>}>
          <Routes>
          <Route index element = {<Introduce/>}/> 
                <Route path="home"  element = {<Introduce/>}/> 
                <Route path="evaluations" element = {<Evaluations/>}/>
                <Route exact path="browse/:PID" element = {<Browse/>}/>
                <Route exact path="breport/:ID" element = {<Breport/>}/>
                <Route exact path="projectd/:PID" element = {<Projectd/>}/>
                <Route exact path="goeva/:IID" element = {<GoEva/>}/>
                <Route exact path="editeva/:IID" element = {<EditEva/>}/>
                <Route path="bproject/:Year" element = {<Bproject/>}/>
                <Route path="breports" element = {<Breports/>}/>

                <Route path="profile" element = {<Profile/>}/>
                <Route path="change_password" element = {<Cpassword/>}/>
                <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </Content>
          <AFooter/>
        </Layout>
      </Layout>
    );
  }
}
