import React,{useState} from 'react';
import { Form, Input, Button,  Card,notification,Select, Space,DatePicker,Spin,Row,Col,Tooltip } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './index.css'
import axios from 'axios';
import {useSelector} from 'react-redux'
import Up from './upload'
import qs from 'qs'

export default function Nprop() {
  const { TextArea } = Input;
  const { Option } = Select;
  const openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
  const userstate = useSelector((state) => {
    return state
  })
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
      setload(true);
      if(values.PYears){
        values.PYears.forEach(function(e){
          e.Year=e.Year.format('YYYY')
      })
      values.Requestedyear=values.Requestedyear.format('YYYY')
      /*处理年份 */
      values.Goal=values.Goal.replace(/[|]/g, " ")
      values.Goal=values.Goal.replace(/[']/g, "''")
      values.Goal=values.Goal.replace(/[&]/g, " ")
      
      values.Motivation=values.Motivation.replace(/[|]/g, " ")
      values.Motivation=values.Motivation.replace(/[']/g, "''")
      values.Motivation=values.Motivation.replace(/[&]/g, " ")
      
      values.Proposal=values.Proposal.replace(/[|]/g, " ")
      values.Proposal=values.Proposal.replace(/[']/g, "''")
      values.Proposal=values.Proposal.replace(/[&]/g, " ")
      
      values.Note=values.Note.replace(/[|]/g, " ")
      values.Note=values.Note.replace(/[']/g, "''")
      values.Note=values.Note.replace(/[&]/g, " ")
      
      /*处理|和‘ */
      console.log('Success:', values);
      axios.post(userstate.Backurl.url+'/IEEEbackend/propose.php',qs.stringify({ 
      data:'1|'+
      values.Email+'|'+values.Position+'|'+values.Amount+'|'+values.Requestedyear+'|'+values.Fundfrom+'|'+values.Goal+'|'+values.Motivation+'|'+values.Proposal+'|'+values.Note+'|'+
      values.Title+'|'+values.CName+'|'+values.CEmail+'|'+values.PYears.length+'|'+
      values.PYears[0].Year+'|'+values.PYears[0].Budget+'|0|'+
      (values.PYears.length>1?values.PYears[1].Year:'0')+'|'+(values.PYears.length>1?values.PYears[1].Budget:'0')+'|0|'+
      (values.PYears.length>2?values.PYears[2].Year:'0')+'|'+(values.PYears.length>2?values.PYears[2].Budget:'0')+'|0|'+
      (values.PYears.length>3?values.PYears[3].Year:'0')+'|'+(values.PYears.length>3?values.PYears[3].Budget:'0')+'|0|'+
      userstate.userinf.Email
      })).then(
        response => {
            
            if(response.data['success']===1){
              setload(false);
              openmsg('success','','Submit successfully!');
              navigate('/user/my_request');
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
            console.log('失败了',error);
        }
      )

      }else {openmsg('warning','','Add at least one year.');setload(false);}
      
  };
  const onFieldsChange = (changedFields) => {
    //console.log(changedFields);
    
    //console.log(changedFields[0].value.format('YYYY'));
    if(changedFields[0].name[0] ==="PYears"){
      console.log(changedFields[0].value.length);
      if(changedFields[0].value.length>3){
        changedFields[0].value.length=3
        openmsg('warning','','You cannot add more than 3 years.')
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
  return <div className="site-card-border-less-wrapper">
  <Card className='ncenter' title="First-year Proposal" bordered={false}>
    <div className='container'>
      <Card>
        
            <p>IEEE Systems, Man, and Cybernetics Society</p>
            <h1>Budget Request Form</h1>
            <div className='nleft'>
            <p>This Budget Request Form (BRF) is to be submitted by all members of SMCS Board of Governors with portfolio responsibilities for the budget. A separate BRF is to be used for each portfolio under their jurisdiction.</p>
            <p>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</p>
            </div>
            <Spin spinning={load}>
        <Form
          name="Nprop"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
          labelCol={{ span: 5 }}
          //wrapperCol={{ span: 8 }}
          layout="horizontal"

        ><Tooltip title="The system will find the account of the person according to the E-mail.">
          <Form.Item  wrapperCol={{ span: 8 } } rules={[{ required: true ,message: 'Input E-mail', }]} name="Email"   label="Email of submitter:" >
          
          
          <Input maxLength={200}/>
          
          
          </Form.Item></Tooltip>
          <Form.Item label="Position of submitter:" name="Position" wrapperCol={{ span: 8 }}  rules={[{ required: true,message: 'Input Position', },{ pattern: /^[\w\s?]+$/,message: 'only numbers, letters, space!',},]}>
          <Input maxLength={200}/>
          </Form.Item>

          <Form.Item label="Amount requested:" name="Amount" wrapperCol={{ span: 6 }} rules={[{ required: true,message: 'Input Amount', },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}>
          <Input prefix="$" suffix="USD" />
          </Form.Item>

          <Form.Item label="Requested year:" name="Requestedyear" wrapperCol={{align: 'left',span: 4 }} rules={[{ required: true,message: 'Input Requested year', }]}>
          <DatePicker picker="year" />
          </Form.Item>

          <Form.Item label="Title of project:" name="Title" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Title', },{ pattern: /^[a-zA-Z 0-9-_.':;,!/@$%^<>?"*()~`=+\n]+$/,message: "Do not enter special characters, Except -_.':;,!@$%^<>?\"*()~`=+ ",},]}>
          <TextArea maxLength={255} style={{ height: 60 }}/>
          </Form.Item>

          <Form.Item label="Funding from:" name="Fundfrom" wrapperCol={{ span: 6 }}rules={[{ required: true,message: 'Input Funding from', }]}>
          <Select >
            <Option value="0">Operating Budget</Option>
            <Option value="1">New Initiative</Option>
          </Select>
          </Form.Item>

          <div className='nleft'>Proposed New Initiative Budget Planning</div>
          <Row >
          <Col align='center' span={3}></Col><Col align='center' span={6}>Year</Col><Col align='left' span={3}>Requested Budget</Col>
          </Row>
          <Row >
            <Col align='center' span={19}>
          <div className='yearleft'>

          <Form.List name="PYears">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 1 }} align="baseline">
                    
                    <Form.Item
                      {...restField}
                      name={[name, 'Year']}
                      rules={[{ required: true, message: 'Missing Year' }]}
                    >
                      <DatePicker picker="year" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'Budget']}
                      rules={[{ required: true, message: 'Missing Budget' },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
                    >
                      <Input prefix="$" suffix="USD" placeholder="Budget" />
                    </Form.Item>
                   
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Year
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          </div>
          </Col>
          </Row>
          <div className='nleft'>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</div>
          
          <Form.Item label="Goal:" name="Goal" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Goal', },]}>
          <TextArea showCount maxLength={2000}  style={{ height: 120 }}/>
          </Form.Item>

          <Form.Item label="Motivation:" name="Motivation" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Motivation', },]}>
          <TextArea showCount maxLength={2000}  style={{ height: 120 }}/>
          </Form.Item>


          <Form.Item label="Proposed activities and budget:" name="Proposal" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Proposal', },]}>
          <TextArea showCount maxLength={2000}  style={{ height: 120 }}/>
          </Form.Item>

          <Form.Item label="Coordinator: " wrapperCol={{ span: 16}}>
            <Input.Group compact>
              <Form.Item
              name="CName"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
              name="CEmail"
              rules={[
                { required: true },/*
                { 
                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                message: 'input right E-mail!',
                },*/
             ]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
              >
                <Input placeholder="E-Mail" />
              </Form.Item>
             
            </Input.Group>
          </Form.Item>

          <Form.Item label="Note:" name="Note" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Note', }]}>
          <TextArea showCount maxLength={2000}  style={{ height: 120 }}/>
          </Form.Item>
          
          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Submit
              </Button>
          </Form.Item>
      </Form>
      </Spin>
      </Card>
      
    </div>
      
  </Card>
  </div>;
}
