import React,{useState,useEffect} from 'react';
import { Form, Input, Button,  Card,notification,Select,Spin,Divider } from 'antd'
import { useNavigate,useParams } from "react-router-dom";
import './index.css'
import axios from 'axios';
import {useSelector} from 'react-redux'
import qs from 'qs'

export default function Retrunmodify() {
  const { TextArea } = Input;
  const params = useParams();
  const { Option } = Select;
  const [form] = Form.useForm();
  const openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
  useEffect(() => {
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!='+("2|"+(params.ID))).then(
      response => {
        if(response.data['success']===0) ;
          
          form.setFieldsValue({
            ...response.data
          });
          
          },
      error => {
          this.openmsg('error','','Can not find server');
          
      }
    )
    
  });
  const userstate = useSelector((state) => {
    return state
  })
  const [load, setload] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
      setload(true);
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
      //console.log('Success:', values);
      axios.post(userstate.Backurl.url+'/IEEEbackend/propose.php',qs.stringify({ 
      data: '4|'+
      values.Email+'|'+values.Position+'|'+values.Amount+'|'+values.Requestedyear+'|'+values.Fundfrom+'|'+values.Goal+'|'+values.Motivation+'|'+values.Proposal+'|'+values.Note+'|'+
      (params.ID)+'|'+values.Title+'|'+values.CName+'|'+values.CEmail+'|'+
      values.FY+'|'+values.FYB+'|'+values.FYA+'|'+
      values.SY+'|'+values.SYB+'|'+values.SYA+'|'+
      values.TY+'|'+values.TYB+'|'+values.TYA+'|'+
      values.EY+'|'+values.EYB+'|'+values.EYA+'|'
  })).then(
        response => {
            
            if(response.data['success']===1){
              console.log(response.data)
              setload(false);
              openmsg('success','','Report has been successfully submitted. You are allowed to modify it before it is approved.');
              navigate('/user/new_prop');
              navigate('/user/modify/'+params.ID);
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

      
  };
  const onFieldsChange = (changedFields) => {
    //console.log(changedFields);
    
    //console.log(changedFields[0].value.format('YYYY'));
    if(changedFields[0].name[0] ==="PYears"){
      console.log(changedFields[0].value.length);
      if(changedFields[0].value.length>4){
        changedFields[0].value.length=4
        openmsg('warning','','You cannot add more than 4 years.')
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
  return <div className="site-card-border-less-wrapper">
  <Card className='ncenter' title="First Year Proposed" bordered={false}>
    <div className='container'>
      <Card>
        <Spin spinning={load}>
        <Form
          name="Nprop"
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
          labelCol={{ span: 5 }}
          //wrapperCol={{ span: 8 }}
          layout="horizontal"

        > 
          <Divider></Divider>
          <Form.Item label="Project Code" name="PID" >
          <Input  bordered={false}/>
          </Form.Item>
          <Form.Item label="Remarks" name="Remarks" >
          <TextArea bordered={false} maxLength={255} style={{ height: 60 }}/>
          </Form.Item>
          <Divider></Divider>
          <p>IEEE Systems, Man, and Cybernetics Society</p>
            <h1>Budget Request Form</h1>
            <div className='nleft'>
            <p>This Budget Request Form (BRF) is to be submitted by all members of SMCS Board of Governors with portfolio responsibilities for the budget. A separate BRF is to be used for each portfolio under their jurisdiction.</p>
            <p>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</p>
            </div>
            <Form.Item label="Email of submitter:"name="Email" wrapperCol={{ span: 8 }}  rules={[{ required: true,message: 'Input Email', },{ pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,message: 'Please enter the correct email address',},]} >
          <Input maxLength={200}/>
          </Form.Item>
          
          <Form.Item label="Position of submitter:" name="Position" wrapperCol={{ span: 8 }}  rules={[{ required: true,message: 'Input Position', },{ pattern: /^[\w\s?]+$/,message: 'only numbers, letters, space!',},]}>
          <Input maxLength={200}/>
          </Form.Item>

          <Form.Item label="Amount requested:" name="Amount" wrapperCol={{ span: 6 }} rules={[{ required: true,message: 'Input Amount', },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}>
          <Input prefix="$" suffix="USD" />
          </Form.Item>

          <Form.Item label="Requested year:" name="Requestedyear" wrapperCol={{ span: 4 }} rules={[{ required: true,message: 'Input Requested year', },{ pattern: /^[0-9]*$/,message: 'only number!',},]}>
          <Input maxLength={4}/>
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

          <div className='nleft'>Proposed New Initiative History and Planning</div>
          <Form.Item wrapperCol={{ span: 16}}>
          <Input.Group compact>
            <Form.Item
            
            name="FY"
            rules={[{ required: true },{ pattern: /^[0-9]*$/,message: 'only number!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input maxLength={4}/>
            </Form.Item>
            <Form.Item
            name="FYB"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"   />
            </Form.Item>
            <Form.Item
            name="FYA"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"   />
            </Form.Item>
            <Form.Item
            name="SY"
            rules={[{ required: true },{ pattern: /^[0-9]*$/,message: 'only number!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input maxLength={4}/>
            </Form.Item>
            <Form.Item
            name="SYB"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"  />
            </Form.Item>
            <Form.Item
            name="SYA"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"  />
            </Form.Item><Form.Item
            name="TY"
            rules={[{ required: true },{ pattern: /^[0-9]*$/,message: 'only number!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input maxLength={4}/>
            </Form.Item>
            <Form.Item
            name="TYB"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"  />
            </Form.Item>
            <Form.Item
            name="TYA"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"   />
            </Form.Item>
            <Form.Item
            name="EY"
            rules={[{ required: true },{ pattern: /^[0-9]*$/,message: 'only number!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input maxLength={4}/>
            </Form.Item>
            <Form.Item
            name="EYB"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
            >
            <Input prefix="$" suffix="USD"  />
            </Form.Item>
            <Form.Item
            name="EYA"
            rules={[{ required: true },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',},]}
            style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
            >
              <Input prefix="$" suffix="USD"   />
            </Form.Item>
          
          </Input.Group>
        </Form.Item>
        
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

          <Form.Item label="Note:" name="Note" wrapperCol={{ span: 16 }} rules={[{ required: true,message: 'Input Note', },]}>
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
