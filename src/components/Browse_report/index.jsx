//浏览报告
import React,{useEffect,useState}  from 'react';
import { Form, Input, Button,  Card,Row,Col} from 'antd'
import { useNavigate,useParams } from "react-router-dom";

import './index.css'
import {useSelector} from 'react-redux'
import axios from 'axios'
export default function Breport() {
  const { TextArea } = Input;
  const params = useParams();
  const [form] = Form.useForm();
  const [datas, setdatas] = useState({});
  const [first, setfirst] = useState(1);
  const userstate = useSelector((state) => {
    return state
  })
  useEffect(() => {
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!='+("3|"+(params.ID))).then(
      response => {
        if(response.data['success']===0) ;
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
  const navigate = useNavigate();
  


  return <div className="site-card-border-less-wrapper">
  <Card className='ncenter' title="Browse Report" bordered={false}>
    <div >
      <Card>
        <p>IEEE Systems,man, and Cybemetics Society</p>
        <h1>New Initiative Status Report</h1>
           
        <Form
          form={form}
          name="report"

          labelCol={{ span: 5 }}
          //wrapperCol={{ span: 8 }}
          layout="horizontal"

        >
          
          <Form.Item label="Project Code:" name="ProjectCode">
          <Input bordered={false} />
          </Form.Item>
          
          <Form.Item label="Project Title:" name="ProjectTitle" >
          <Input bordered={false} />
          </Form.Item>

          <Form.Item label="Reporter:" name="Reporter" >
          <Input bordered={false} />
          </Form.Item>
          <Form.Item>
          <Row>
          <Col align='right'span={5}>Report Year: 
          </Col>
          <Col align='left' ><b>&nbsp;&nbsp;{datas.ReportYear}</b>
          </Col>
          </Row>
          <p/><p/>
          <Row>
          <Col align='right'span={5}>Actual:  
          </Col>
          <Col align='left' >&nbsp;$<b>&nbsp;{datas.Actual}</b> USD
          </Col>
          </Row>
          <p/><p/>
          <Row>
          <Col align='right'span={5}>Yearly Target: 
          </Col>
          <Col align='justify' span={18}><b>&nbsp;{datas.YearlyTarget}</b>
          </Col>
          </Row>
          <p/><p/>
          <Row>
          <Col align='right'span={5}>Achievement: 
          </Col>
          <Col align='justify'span={18} ><b>&nbsp;{datas.Achievement}</b>
          </Col>
          </Row>
          <p/><p/>
          <Row>
          <Col align='right'span={5}>Budgeting: 
          </Col>
          <Col align='justify' span={18}><b>&nbsp;{datas.Budgeting}</b>
          </Col>
          </Row>
          <p/><p/>
          <Row>
          <Col align='right'span={5}>Comments: 
          </Col>
          <Col align='justify' span={18}><b>&nbsp;{datas.Comments}</b>
          </Col>
          </Row>
          <p/><p/>

          

         
          <Button type="primary" onClick={()=>{
            navigate(-1)
          } }  block>
               Back
          </Button>
          </Form.Item>
      </Form>
      </Card>
      
    </div>
      
  </Card>
  </div>;
}
