//user路由配置页面
import React, { Component,lazy,Suspense } from 'react';
import { Layout,BackTop} from 'antd';
import USider from './Sider';
import UFooter from './Footer';
import UHeader from '../../components/Header';
import NotFound from '../NotFound'
import Introduce from './Contents/Introduce';
import Loading from '../../components/Loading';
import {
  Routes,
  Route,
} from 'react-router-dom'



const Nprop = lazy(()=> import('./Contents/New_Proposal'))
const Oprop = lazy(()=> import('./Contents/Continue_Proposal'))
const Wreport = lazy(()=> import('./Contents/Write_Report'))
const Myrequest = lazy(()=> import('./Contents/My_request'))
const Profile = lazy(()=> import('../../components/Profile'))
const Cpassword = lazy(()=> import('../../components/Cpassword'))
const Browse = lazy(()=> import('../../components/Browse_proposal'))
const Creport = lazy(()=> import('./Contents/Select_report'))
const Crequest = lazy(()=> import('./Contents/Select_Project_Continue'))
const Mreport = lazy(()=> import('./Contents/Modify_report'))
const Breport = lazy(()=> import('../../components/Browse_report'))
const Modify = lazy(()=> import('./Contents/Proposal_Modify'))
const RModify = lazy(()=> import('./Contents/Proposal_Return_Modify'))
const ProjectC = lazy(()=> import('./Contents/Select_Proposal_Continue'))



const { Content} = Layout;

export default class index extends Component {
    
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <USider/>
        <Layout className="site-layout">
          <UHeader def='1'/>
          <Content  style={{ margin: ' 16px 16px'}}>
          <BackTop/>
          <Suspense fallback={<Loading/>}>
          <Routes>
                <Route index element = {<Introduce/>}/> 
                <Route path="home"  element = {<Introduce/>}/> 
                <Route path="new_prop" element = {<Nprop/>}/>
                <Route exact path="old_prop/:PID" element = {<Oprop/>}/>
                <Route exact path="modify/:ID" element = {<Modify/>}/>
                <Route exact path="returnmodify/:ID" element = {<RModify/>}/>
                <Route exact path="browse/:PID" element = {<Browse/>}/>
                <Route exact path="write_report/:ID/:Ptitle/:Pcode/:Year/:AYear" element = {<Wreport/>}/>
                <Route exact path="mreport/:ID/:AYear" element = {<Mreport/>}/>
                <Route exact path="Breport/:ID" element = {<Breport/>}/>
                <Route path="Creport" element = {<Creport/>}/>
                <Route path="Crequest" element = {<Crequest/>}/>
                <Route path="my_request" element = {<Myrequest/>}/>
                <Route path="profile" element = {<Profile/>}/>
                <Route path="change_password" element = {<Cpassword/>}/>
                <Route exact path="projectc/:PID" element = {<ProjectC/>}/>
                <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </Content>
          <UFooter/>
        </Layout>
      </Layout>
    );
  }
}
