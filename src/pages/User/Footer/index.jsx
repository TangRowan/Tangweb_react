//user footer 检测权限在这。
import React ,{ useEffect ,useState} from 'react'
import { Footer } from 'antd/lib/layout/layout';
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {notification ,Button,Drawer,Form,Input,Tooltip} from 'antd'
import { MessageOutlined  } from '@ant-design/icons';
import axios from 'axios';

export default function UFooter() {
  const openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const userstate = useSelector((state) => {
    return state
  })
  useEffect(() => {
    if(userstate.userinf.Email==='-1'){
      openmsg('error','','Please login!');
       navigate("/login");
     }
     if(userstate.userinf.Password==='40bd001563085fc35165329ea1ff5c5ecbdbbeef'){
      openmsg('warning','','Your password is not secured. Please reset your password!');
       navigate("/user/change_password");
     }
  },[]);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.get('https://plato.monmouth.edu/~s1317086/IEEEbackend/bug.php?!='+values.content).then(
      response => {
        onClose()
        values.content='';
        openmsg('success','','Thank you');
      },
      error => {
        openmsg('error','','Can not find server');
      }
    )
  };
  const { TextArea } = Input;
  return (
    <div><Footer style={{ textAlign: 'center' }}>© Copyright IEEE SMCS Project Management System
    <div style={{ textAlign: 'right' }}>
    <Tooltip title="submit technical issues">
    <Button size='large' type="primary" shape="circle" onClick={showDrawer} icon={<MessageOutlined />} >
    </Button>
    </Tooltip>
    <Drawer title="Report Bugs" placement="right" onClose={onClose} visible={visible}>
    <p>I am sorry to hear that you ran into some technical issues with the system.</p>
    <p>Please report here and we will fix it ASAP.</p>
        <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="content"
          rules={[{ required: true, message: 'Please input your problem!' }]}
          
        >
         <TextArea rows={10}placeholder="Please Write your problem here." />
        </Form.Item>


        <Form.Item >
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Drawer>
</div></Footer>
    
    
    
    </div>
  )
}
