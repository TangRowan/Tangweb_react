import React,{useEffect} from 'react'
import { useParams,useNavigate  } from 'react-router-dom';
import { Form, Input, Button,  Card, Space} from 'antd'
import './index.css'
import axios from 'axios'

import {useSelector} from 'react-redux'

export default function Browse() {
  const userstate = useSelector((state) => {
    return state
  })
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!='+("1|"+(params.PID))).then(
      response => {
        
          
          form.setFieldsValue({
            //...response.data
          });
          
          },
      error => {
          this.openmsg('error','','Can not find server');
          
      }
    )
    
  });
  return (
    <div className="site-card-border-less-wrapper">
    <Card className='ncenter' title="Browse Project" bordered={false}>
      
      <div className='container'>
        
      <Card>
        
        
       
    <Form
      form={form}
      name="Browse"
      labelCol={{ span: 5 }}
      //wrapperCol={{ span: 8 }}
      layout="horizontal"

    >


      <Form.Item label="Title of project:" name="Title"  rules={[{ required: true,message: 'Input Position', }]}>
      <TextArea bordered={false} style={{ height:60 }} />
      </Form.Item>

      <Form.Item label="Project code:" name="Fundfrom" rules={[{ required: true,message: 'Input Position', }]}>
      <Input bordered={false}/>
      </Form.Item>


      <div className='nleft'>Proposed New Initiative History and Planning</div>
      <Form.Item wrapperCol={{ span: 16}}>
        <Input.Group compact>
          <Form.Item
          
          name="FY"
          label='Year'
          style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
          >
            <Input bordered={false}  />
          </Form.Item>
          <Form.Item
          name="FYB"
          label='Requested Budget'
          style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          name="FYA"
          label='Actual'
          style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          
          <Form.Item
          name="FYA"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>


          <Form.Item
          name="SY"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
          >
            <Input bordered={false}  />
          </Form.Item>
          <Form.Item
          name="SYB"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          name="SYA"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item><Form.Item
          name="TY"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
          >
            <Input bordered={false}  />
          </Form.Item>
          <Form.Item
          name="TYB"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          name="TYA"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          name="FY"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
          >
            <Input bordered={false}  />
          </Form.Item>
          <Form.Item
          name="FYB"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
          >
          <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          name="FYA"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
         
        </Input.Group>
      </Form.Item>

     <p/>
      <Row>
          <Col align='right'span={4}>Coordinator:&nbsp;
          </Col>
          <Col align='justify'span={4}><b>{datas.CName }</b></Col>
          <Col align='justify'span={10}><b>{datas.CEmail }</b></Col>
        </Row>

      </Form>
      </Card>
      </div>
    </Card>
  </div>
  )
}
