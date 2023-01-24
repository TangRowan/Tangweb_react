//浏览proposal
import React,{useEffect,useState} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import { Affix,Form, Input, Button,  Card, Space,Row,Col} from 'antd'
import './index.css'
import axios from 'axios'

import { DownloadOutlined ,RollbackOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux'

export default function Browse() {
  const userstate = useSelector((state) => {
    return state
  })
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [datas, setdatas] = useState({});
  const [first, setfirst] = useState(1);
  useEffect(() => {
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!='+"1|"+params.PID).then(
      response => {
        if(response.data['success']===0) navigate("/admin/404");
          setdatas(response.data)
          console.log(datas)
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
    <Card className='ncenter' title="Browse proposal" bordered={false}>
      
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
      <Row>
        <Col align='right'span={5}>Result: &nbsp;
        </Col>
        <Col align='justify'span={19}><b>{datas.Result}</b>
        </Col>
      </Row>
      <p/>
      <Row>
        <Col align='right'span={5}>Approved Budget:  &nbsp;
        </Col>
        <Col align='justify'span={19}>$<b>{datas.ApprovedBudget}</b>USD
        </Col>
      </Row>
      <p/>
      <Row>
        <Col align='right'span={5}>Remarks:  &nbsp;
        </Col>
        <Col align='justify'span={19}><b>{datas.Remarks}</b>
        </Col>
      </Row>
      <p/>
      <Row>
        <Col align='right'span={5}>Approval Email:  &nbsp;
        </Col>
        <Col align='justify'span={19}><b>{datas.ApprovalEmail}</b>
        </Col>
      </Row>
      <p/>
      <Row>
        <Col align='right'span={5}>Aproval Time:  &nbsp;
        </Col>
        <Col align='justify'span={19}><b>{datas.ApprovalTime}</b>
        </Col>
      </Row>
       
      </div>


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
