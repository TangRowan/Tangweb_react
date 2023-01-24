import React,{useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import { Affix,Form, Input, Button,  Card, Space} from 'antd'
import './index.css'
import axios from 'axios'

import { DownloadOutlined ,RollbackOutlined} from '@ant-design/icons';
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
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!='+"1|"+params.PID).then(
      response => {
        if(response.data['success']===0) navigate("/admin/404");
          
          form.setFieldsValue({
            ...response.data
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
      <div  className='Bright' >
      
      <Space>
      <Affix offsetTop={10}>
          <Button type="dashed" onClick={() => { navigate(-1);}} icon={<RollbackOutlined />}>
          </Button>
          
        </Affix>
        <Affix offsetTop={10}>

        <Button type="dashed"onClick={() => { window.open(userstate.Backurl.url+'/IEEEbackend/download.php?aid='+params.PID);}} icon={<DownloadOutlined />}></Button>
        </Affix>
        
        </Space>
      </div>
      <Form.Item name="PID" >
      <Input bordered={false} />
      </Form.Item>
      <p>IEEE Systems, Man, and Cybernetics Society</p>
        <h1>Budget Request Form</h1>
        <div className='nleft'>
        <p>This Budget Request Form (BRF) is to be submitted by all members of SMCS Board of Governors with portfolio responsibilities for the budget. A separate BRF is to be used for each portfolio under their jurisdiction.</p>
        <p>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</p>
        </div>
      <Form.Item label="Name of submitter:" name="Name" wrapperCol={{ span: 8 }} rules={[{ required: true ,message: 'Input Name',}]}>
      <Input bordered={false} />
      </Form.Item>
      
      <Form.Item label="Position of submitter:" name="Position" wrapperCol={{ span: 8 }}  rules={[{ required: true,message: 'Input Position', }]}>
      <Input bordered={false} />
      </Form.Item>

      <Form.Item label="Amount requested:" name="Amount" wrapperCol={{ span: 6 }} rules={[{ required: true,message: 'Input Position', }]}>
      <Input prefix="$" suffix="USD" bordered={false} />
      </Form.Item>

      <Form.Item label="Requested year:" name="Requestedyear" wrapperCol={{ span: 4 }} rules={[{ required: true,message: 'Input Position', }]}>
      <Input  bordered={false}/>
      </Form.Item>

      <Form.Item label="Title of project:" name="Title" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Position', }]}>
      <TextArea bordered={false} style={{ height: 100 }} />
      </Form.Item>

      <Form.Item label="Funding from:" name="Fundfrom" wrapperCol={{ span: 6 }}rules={[{ required: true,message: 'Input Position', }]}>
      <Input bordered={false}/>
      </Form.Item>

      <Form.Item label="First year initiative:" name="FirstYear" wrapperCol={{ span: 6 }}>
      <Input bordered={false}/>
      </Form.Item>

      <div className='nleft'>Proposed New Initiative History and Planning</div>
      <div className='nleft'>

      </div>
      <Form.Item wrapperCol={{ span: 16}}>
        <Input.Group compact>
          <Form.Item
          label="Year"
          name="FY"
          style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
          >
            <Input bordered={false}  />
          </Form.Item>
          <Form.Item
          label="Requested Budget"
          name="FYB"
          style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          label="Actual"
          name="FYA"
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
          name="EY"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
          >
            <Input bordered={false}  />
          </Form.Item>
          <Form.Item
          name="EYB"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
          >
          <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
          <Form.Item
          name="EYA"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
          >
            <Input prefix="$" suffix="USD" bordered={false}  />
          </Form.Item>
         
        </Input.Group>
      </Form.Item>
      <Form.Item label="Proposed Activity Year:" name="AYear" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Position', }]}>
      <Input bordered={false}/>
      </Form.Item>
          
      <div className='nleft'>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</div>
      
      <Form.Item label="Goal:" name="Goal" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Position', }]}>
      <TextArea bordered={false}  style={{ height: 200 }}/>
      </Form.Item>

      <Form.Item label="Motivation:" name="Motivation" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Position', }]}>
      <TextArea bordered={false}  style={{ height: 200 }} />
      </Form.Item>

      <Form.Item label="Proposed activities and budget:" name="Proposal" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Position', }]}>
      <TextArea bordered={false}  style={{ height: 200 }}/>
      </Form.Item>

     <p/>
      <Row>
          <Col align='right'span={4}>Coordinator:&nbsp;
          </Col>
          <Col align='justify'span={4}><b>{datas.CName }</b></Col>
          <Col align='justify'span={10}><b>{datas.CEmail }</b></Col>
        </Row>

      <Form.Item label="Note:" name="Note" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Position', }]}>
      <TextArea bordered={false}   style={{ height: 100 }}/>
      </Form.Item>


      <Form.Item label="Apply Time:" name="Applytime" wrapperCol={{ span: 16 }} >
      <Input bordered={false}/>
      </Form.Item>

      <Form.Item label="Result:" name="Result" wrapperCol={{ span: 16 }} >
      <Input bordered={false}/>
      </Form.Item>

      <Form.Item label="Approved Budget:" name="ApprovedBudget" wrapperCol={{ span: 16 }} >
      <Input prefix="$" suffix="USD" bordered={false}  />
      </Form.Item>

      <Form.Item label="Remarks:" name="Remarks" wrapperCol={{ span: 16 }} >
      <TextArea bordered={false}  style={{ height: 100 }}/>
      </Form.Item>

      

      <Form.Item label="Approval Email:" name="ApprovalEmail" wrapperCol={{ span: 16 }} >
      <Input bordered={false}/>
      </Form.Item>

      <Form.Item label="Approval Time:" name="ApprovalTime" wrapperCol={{ span: 16 }} >
      <Input bordered={false}/>
      </Form.Item>

      <Space>
      <Button type="primary" className="login-form-button" onClick={()=>{
        navigate(-1);
      }} block>
        Back
      </Button>
      
      <Button type="primary"onClick={() => { window.open(userstate.Backurl.url+'/IEEEbackend/download.php?aid='+params.PID);}} icon={<DownloadOutlined />} block>DownLoad</Button>
      </Space>
      </Form>
      </Card>
      </div>
    </Card>
  </div>
  )
}
