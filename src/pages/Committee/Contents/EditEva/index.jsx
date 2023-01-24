//编辑打分
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { Affix,Form, Input, Button,  Card, Space,Modal,notification,Spin,Select,Rate,Col,Row} from 'antd'
import './index.css'
import axios from 'axios'

import { useNavigate } from "react-router-dom";
import {ExclamationCircleOutlined,RollbackOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux'
export default function EditEva() {
  const [load, setload] = useState(false);
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
const [datas, setdatas] = useState({});
  const [first, setfirst] = useState(1);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const params = useParams();
  const navigate = useNavigate();
  const submit = () => {
    form.submit();
  };
  const onFinish = (values) => {
    setload(true);
    if(values.Reason!=null)
    {
    values.Reason=values.Reason.replace(/[|]/g, " ")
    values.Reason=values.Reason.replace(/[']/g, "''")
    values.Reason=values.Reason.replace(/[&]/g, " ")
    }
    //console.log('Success:', values);
        
        //console.log('Success:', values);
        axios.get(userstate.Backurl.url+'/IEEEbackend/rank.php?!=1|'+((params.IID)+'|'+values.ToFund+'|'+values.Reason+'|'+values.Rank+'|'+userstate.userinf.Email)).then(
            response => {
                
                if(response.data['success']===1){
                    setload(false);
                    openmsg('success','','The ranking has been submitted!');
                    navigate(-1);
                    
                }
                else switch(response.data['error']){
                    case 1:openmsg('error','','Unknow error');setload(false);break;
                    case 2:openmsg('error','','Fail to write to database.');setload(false);break;
                    default:setload(false);break;
                }
            },
            error => {
                setload(false);
                openmsg('error','','Can not find server');
                
            }
        )
    
};
  useEffect(() => {
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!=5|'+params.IID+'|'+userstate.userinf.Email).then(
      response => {
        if(response.data['success']===0) navigate("/404");
        setdatas(response.data)
          form.setFieldsValue({
            ...response.data
          });
          
          },
      error => {
          this.openmsg('error','','Can not find server');
          
      }
    )
    
  },[first]);
  return (
    <div className="site-card-border-less-wrapper">
    <Card className='ncenter' title="Ranking" bordered={false}>
      
      <div className='container'>
        
      <Card>
        
        
      <Spin spinning={load}>
    <Form
      form={form}
      name="Approval"
      onFinish={onFinish}
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
        
        </Space>
      </div>
      <b>Project code:    {datas.PID}    </b>
      <p>IEEE Systems, Man, and Cybernetics Society</p>
        <h1>Budget Request Form</h1>
        <div className='nleft'>
        <p>This Budget Request Form (BRF) is to be submitted by all members of SMCS Board of Governors with portfolio responsibilities for the budget. A separate BRF is to be used for each portfolio under their jurisdiction.</p>
        <p>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</p>
        </div>
        <Row>
          <Col align='right'span={5}>Name of submitter: 
          </Col>
          <Col align='left' ><b>&nbsp;{datas.Name}</b>
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>Position of submitter:
          </Col>
          <Col align='left' ><b>&nbsp;{datas.Position}</b>
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>Amount requested: 
          </Col>
          <Col align='left'>$<b>&nbsp;{datas.Amount}</b> USD
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>Requested year:
          </Col>
          <Col align='left'><b>&nbsp;{datas.Requestedyear}</b>
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>Title of project: 
          </Col>
          <Col align='left'><b>&nbsp;{datas.Title}</b>
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>First year initiative:
          </Col>
          <Col align='left'><b>&nbsp;{datas.FirstYear}</b>
          </Col>
        </Row>
        <p/>
        
<Row>
          <Col align='right'span={5}>Fund from:
          </Col>
          <Col align='left'><b>&nbsp;{datas.Fundfrom}</b>
          </Col>
        </Row>
<p/>
  
      <div className='nleft'>Proposed New Initiative History and Planning</div>
      <Row>
      <Col span={5}>
      </Col>
      <Col span={18}>
      <div>
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
          {
            datas.SY!=='N/A'?
            <><Form.Item
              name="SY"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
            >
              <Input bordered={false} />
            </Form.Item><Form.Item
              name="SYB"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
            >
                <Input prefix="$" suffix="USD" bordered={false} />
              </Form.Item><Form.Item
                name="SYA"
                rules={[{ required: true }]}
                style={{ display: 'inline-block', width: 'calc(32% - 8px)', margin: '0 8px' }}
              >
                <Input prefix="$" suffix="USD" bordered={false} />
              </Form.Item></>:''

          }
          {
            datas.TY!=='N/A'?
            <><Form.Item
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
            </Form.Item></>:''

          }
          {
            datas.EY!=='N/A'?
            <> <Form.Item
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
            </Form.Item></>:''

          }
          
         
        </Input.Group>
      </Form.Item>
      </div>
      </Col>
      </Row>
      <div className='nleft'>
        <Row>
          <Col align='right'span={5}>Goal:&nbsp;
          </Col>
          <Col align='justify' span={19}><b>{datas.Goal}</b>
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>Motivation: &nbsp;
          </Col>
          <Col align='justify'span={19}><b>{datas.Motivation}</b>
          </Col>
        </Row>
        <p/>
        <Row>
          <Col align='right'span={5}>Proposed activities and budget:&nbsp;
          </Col>
          <Col align='justify'span={19}><b>{datas.Proposal}</b>
          </Col>
        </Row>
        <p/>
      </div>
          
      <div className='nleft'>Provide a short description of the project, including the name of its coordinator, and a justification for the budgeted amount requested:</div>
      
     <p/>
      <Row>
          <Col align='right'span={5}>Coordinator:&nbsp;
          </Col>
          <Col align='justify'span={4}><b>{datas.CName }</b></Col>
          <Col align='justify'span={10}><b>{datas.CEmail }</b></Col>
        </Row>

      <div className='nleft'>
      <p/>
      <Row>
        <Col align='right'span={5}>Note: &nbsp;
        </Col>
        <Col align='justify'span={19}><b>{datas.Note}</b>
        </Col>
      </Row>
      <p/>
      <Row>
        <Col align='right'span={5}>Apply Time: &nbsp;
        </Col>
        <Col align='justify'span={19}><b>{datas.Applytime}</b>
        </Col>
      </Row>
      <p/>
      </div>

      <Form.Item label="To Fund:" name="ToFund" wrapperCol={{ span: 5 }}rules={[{ required: true,message: 'Choise Result', }]} >
      <Select >
            <Option value="0">YES</Option>
            <Option value="1">NO</Option>
      </Select>
      
      </Form.Item>
      <Form.Item label="Reason for No:" name="Reason" wrapperCol={{ span: 16 }} >
      <TextArea  style={{ height: 100 }} placeholder="IF you choise Yes don't need write it"/>
      </Form.Item>

      <Form.Item label="Rank:" name="Rank" wrapperCol={{ span: 5 }}rules={[{ required: true,message: 'Choise Rank', }]} >
      <Rate  allowHalf />
      </Form.Item>
      
      

      <Form.Item>
          <Button type="primary"  onClick={()=>{
              Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: 'Are you sure the information is correct?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: submit,
              });
          }} block>
            Submit
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
