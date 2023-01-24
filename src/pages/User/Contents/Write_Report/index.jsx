import React ,{useState}from 'react';
import { Form, Input, Button,  Card,notification,Spin} from 'antd'
import { useNavigate,useParams } from "react-router-dom";
import qs from 'qs'
import './index.css'
import {useSelector} from 'react-redux'
import axios from 'axios'
export default function Wreport() {
  const { TextArea } = Input;
  const params = useParams();
  const [load, setload] = useState(false);
  const [form] = Form.useForm();
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

  const navigate = useNavigate();
  const onFinish = (values) => {
    values.YearlyTarget=values.YearlyTarget.replace(/[|]/g, " ")
    //values.YearlyTarget=values.YearlyTarget.replace(/[\n]/g, "\\n")
    values.YearlyTarget=values.YearlyTarget.replace(/[']/g, "''")
    values.Achievement=values.Achievement.replace(/[']/g, "''")
    //values.Achievement=values.Achievement.replace(/[\n]/g, "\\n")
    values.Achievement=values.Achievement.replace(/[|]/g, " ")
    values.Budgeting=values.Budgeting.replace(/[']/g, "''")
    //values.Budgeting=values.Budgeting.replace(/[\n]/g, "\\n")
    values.Budgeting=values.Budgeting.replace(/[|]/g, " ")
    values.Comments=values.Comments.replace(/[']/g, "''")
    //values.Comments=values.Comments.replace(/[\n]/g, "\\n")
    values.Comments=values.Comments.replace(/[|]/g, " ")
    console.log(values.YearlyTarget)
    setload(true);
    axios.post(userstate.Backurl.url+'/IEEEbackend/report.php',qs.stringify({ 
      data:'1|'+(params.ID)+'|'+(params.Pcode)+'|'+(params.Ptitle)+'|'+userstate.userinf.Name+'|'+values.YearlyTarget+'|'+values.Achievement+'|'+values.Budgeting+'|'+values.Comments+'|'+userstate.userinf.Email+'|'+(params.Year)+'|'+values.Actual+'|'+params.AYear
    })).then(
      response => {
        if(response.data['success']===1){
          navigate(-1)
          openmsg('success','','Your report is successfully saved.');
          setload(false);
        }
        else  if(response.data['error']===1){
          setload(false);
          openmsg('error','','report bug.');
        }
        
          
          },
      error => {
          openmsg('error','','Can not find server');setload(false);
          
      }
    )
  };


  return <div className="site-card-border-less-wrapper">
  <Card className='ncenter' title="Write Project Report" bordered={false}>
    <div >
      <Card>
        <p>IEEE Systems,man, and Cybemetics Society</p>
        <h1>New Initiative Status Report</h1>
        <Spin spinning={load}>
        <Form
          form={form}
          name="report"
          onFinish={onFinish}

          labelCol={{ span: 5 }}
          //wrapperCol={{ span: 8 }}
          layout="horizontal"

        >
          <Form.Item label="Project Code:" wrapperCol={{align: 'left'}} >
          {(params.Pcode)} 
          </Form.Item>
          
          <Form.Item label="Project Title:"wrapperCol={{align: 'left' }}  >
          {(params.Ptitle)} 
          </Form.Item>

          <Form.Item label="Reporter:" wrapperCol={{align: 'left' }} >
          {userstate.userinf.Name}
          </Form.Item>

          <Form.Item label="Report Year:" name="ReportYear"wrapperCol={{align: 'left',span: 4 }}>
          {params.Year}
          </Form.Item>

          <Form.Item label="Actual" name="Actual" wrapperCol={{align: 'left',span: 4 }} rules={[{ required: true,message: 'Input Actual', },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',}]}>
          <Input prefix="$" suffix="USD" />
          </Form.Item>

          <Form.Item label="Yearly Target:" name="YearlyTarget" rules={[{ required: true,message: 'Input Yearly Target', },]}>
          <TextArea showCount maxLength={2000} placeholder="What is planned to be done of the year." style={{ height: 150 }}/>
          </Form.Item>

          <Form.Item label="Achievement:" name="Achievement" rules={[{ required: true,message: 'Input Achievement', },]}>
          <TextArea showCount maxLength={2000} placeholder="Be specific and itemize the activities w/ details" style={{ height: 150 }}/>
          </Form.Item>

          <Form.Item label="Expenditures:" name="Budgeting" rules={[{ required: true,message: 'Input Expenditures', },]}>
          <TextArea showCount maxLength={2000} placeholder="Itemize the actual spending of the funds." style={{ height: 150 }}/>
          </Form.Item>

          <Form.Item label="Comments:" name="Comments" rules={[{ required: true,message: 'Input Comments', },]}>
          <TextArea showCount maxLength={2000} placeholder="Is everything on track? Any adjustment to the budget and activities if the project will be carried out in the future." style={{ height: 120 }}/>
          </Form.Item>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Save
              </Button>
          </Form.Item>
      </Form>
      </Spin>
      </Card>
      
    </div>
      
  </Card>
  </div>;
}
