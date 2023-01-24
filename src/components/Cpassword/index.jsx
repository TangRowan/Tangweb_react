//改密码
import React,{ useState } from 'react'
import {Spin, Form, Input, Button,  Card,notification } from 'antd'
import { LockTwoTone,LockOutlined} from '@ant-design/icons';

import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import './index.css'
import { useNavigate } from "react-router-dom";

export default function Cpassword() {
  const [load, setload] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userstate = useSelector((state) => {
    return state
  })
  const openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
  const sha1 = require('js-sha1');
  const onFinish = (values) => {
    setload(true);
    if(sha1(values.Opassword)===userstate.userinf.Password){
      if(values.Npassword===values.RNpassword){
        axios.get(userstate.Backurl.url+'/IEEEbackend/Cpsword.php?!='+(userstate.userinf.Email+'|'+sha1(values.Npassword))).then(
          response => {
              
              if(response.data['success']===1){
                dispatch({
                  type: 'logout',
               })
                setload(false);
                navigate("/login");
                openmsg('success','','Password is successfully changed. Please login again.');
                  
              }
              else switch(response.data['error']){
                  case 1:openmsg('error','','不应该有问题的问题');setload(false);break;
                  case 2:openmsg('error','','奇怪的问题');setload(false);break;
                  default:setload(false);break;
              }
          },
          error => {
              setload(false);
              openmsg('error','','Can not find server');
              
          }
        )
      }else {openmsg('error','','The two inputs are different .');setload(false);}
    }else {openmsg('error','','The old password is entered wrong! .');setload(false);}
    
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="Change Password" bordered={false}>
        <div className='container'>
        <Card style={{ width:'100%' }}>
          <Spin spinning={load}>
          <Form
          form={form}
          name="Profile"
          onFinish={onFinish}

        >
          <Form.Item
          name="Opassword"
          rules={[
              {
                  required: true,
                  message: 'Input your Old Password!',
              },
              { 
                pattern: /^\w+$/,
                message: 'only numbers, letters, underscores!',
               },
          ]}
          >
          <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Old Password"
          />
          </Form.Item>
          <Form.Item
          name="Npassword"
          rules={[
              {
                  required: true,
                  message: 'Input your New Password!',
              },
              { 
                pattern: /^\w{8,}$/,
                message: 'At least 8 characters, letters, underscores!',
               },
          ]}
          >
          <Input.Password 
              prefix={<LockTwoTone className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
          />
          </Form.Item>
          <Form.Item
          name="RNpassword"
          rules={[
              {
                  required: true,
                  message: 'Input your New Password!',
              },
              { 
                pattern: /^\w{8,}$/,
                message: 'At least 8 characters,only numbers, letters, underscores!',
               },
          ]}
          >
          <Input.Password 
              prefix={<LockTwoTone className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm New Password"
          />
          </Form.Item>
          
          
          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Change Password
              </Button>
          </Form.Item>
          </Form>
          </Spin>
          </Card>
          
        </div>
          
      </Card>
  </div>
  )
}
