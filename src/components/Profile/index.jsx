//改个人信息
import React,{ useState,useEffect } from 'react'
import {Spin, Form, Input, Button,  Card,notification } from 'antd'
import { MailTwoTone, IdcardTwoTone,TabletTwoTone} from '@ant-design/icons';
import axios from 'axios'

import {useDispatch,useSelector} from 'react-redux'
import './index.css'

export default function Profile() {
  const [load, setload] = useState(false);
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const userstate = useSelector((state) => {
    return state
  })
  useEffect(() => {
    
    form.setFieldsValue({
      useremail:userstate.userinf.Email,
      name:userstate.userinf.Name,
      phone:userstate.userinf.Phone
    });
  });
  const openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
  const onFinish = (values) => {
    setload(true);
    
    axios.get(userstate.Backurl.url+'/IEEEbackend/upprofile.php?!='+values.useremail+'|'+values.name+'|'+values.phone).then(
      response => {
          
          if(response.data['success']===1){
            dispatch({
              type: 'login',
              data: {Name:values.name,Phone:values.phone}
            })
            setload(false);
            openmsg('success','','User profile is updated!');
              
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
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card className='ncenter' title="User Profile" bordered={false}>
        <div className='container'>
        <Card style={{ width:'100%' }}>
          <Spin spinning={load}>
          <Form
          form={form}
          name="Profile"
          onFinish={onFinish}

        >
          <Form.Item
              name="useremail"
              rules={[
                  {
                      required: true,
                      message: 'input your E-mail!',
                  },/*
                  //邮箱正则
                  { 
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: 'input right E-mail!',
                  },*/
              ]}
              
          >
        <Input prefix={<MailTwoTone className="site-form-item-icon" />}
        placeholder="E-mail" disabled={true} />
          </Form.Item>
          
          
          <Form.Item
              name="name"
              rules={[
                  {
                      required: true,
                      message: 'input your name!',
                  },
                  { 
                    pattern: /^[A-Za-z| ]+$/,
                    message: 'only letters and space!',
                  },
              ]}
          >
          <Input prefix={<IdcardTwoTone className="site-form-item-icon" />}
          placeholder="Name" />
          </Form.Item>
          <Form.Item
              name="phone"
              rules={[
                  {
                      required: false,
                      message: 'input your phone number!',
                  },
                  { 
                    pattern: /^[0-9]*$/,
                    message: 'only number!',
                  },
              ]}
          >
          <Input prefix={<TabletTwoTone className="site-form-item-icon" />}
          placeholder="Phone number (Not required)" />
          </Form.Item>
          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Change
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
