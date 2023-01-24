import React,{useEffect,useState}  from 'react';
import { Form, Input, Button,  Card,notification,Spin} from 'antd'
import { useNavigate,useParams } from "react-router-dom";
import qs from 'qs'
import './index.css'
import {useSelector} from 'react-redux'
import axios from 'axios'

export default function Mreport() {
  const { TextArea } = Input;
  const params = useParams();
  const [form] = Form.useForm();
  const [load, setload] = useState(false);
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
  useEffect(() => {
    
    axios.get(userstate.Backurl.url+'/IEEEbackend/browse.php?!='+("3|"+(params.ID))).then(
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
    
  },[]);
  const navigate = useNavigate();
  const onFinish = (values) => {
    setload(true);
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
    axios.post(userstate.Backurl.url+'/IEEEbackend/report.php',qs.stringify({ 
      data:'2|'+(params.ID)+'|'+values.YearlyTarget+'|'+values.Achievement+'|'+values.Budgeting+'|'+values.Comments+'|'+values.ReportYear+'|'+values.Actual+'|'+values.ProjectCode+'|'+params.AYear
    })).then(
      response => {
        if(response.data['success']===1){
          setload(false);
          navigate(-1)
          openmsg('success','','Your report is successfully saved.');
          
        }
        else if(response.data['error']===1){ setload(false);

          openmsg('error','','You wrote the wrong year.');
        }else {openmsg('error','','Content has special characters.'); setload(false);}
        
        
          
          },
      error => {
        setload(false);
          openmsg('error','','Can not find server');
          
      }
    )
  };


  return <div className="site-card-border-less-wrapper">
  <Card className='ncenter' title="Modify Report" bordered={false}>
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
          
          <Form.Item label="Project Code:" name="ProjectCode">
          <Input bordered={false} />
          </Form.Item>
          
          <Form.Item label="Project Title:" name="ProjectTitle" >
          <Input bordered={false} />
          </Form.Item>

          <Form.Item label="Reporter:" name="Reporter" >
          <Input bordered={false} />
          </Form.Item>

          <Form.Item label="Report Year:" name="ReportYear"wrapperCol={{align: 'left',span: 4 }} >
          <Input bordered={false} />
          </Form.Item>

          <Form.Item label="Actual" name="Actual" wrapperCol={{align: 'left',span: 4 }} rules={[{ required: true,message: 'Input Position', },{ pattern: /^[0-9]+(.[0-9]{2})?$/,message: 'only number!If it is a decimal, keep 2 decimal places!',}]}>
          <Input prefix="$" suffix="USD" />
          </Form.Item>

          <Form.Item label="Yearly Target:" name="YearlyTarget" rules={[{ required: true,message: 'Input Position', },]}>
          <TextArea showCount maxLength={2000} placeholder="What is planned to be done of the year." style={{ height: 150 }}/>
          </Form.Item>

          <Form.Item label="Achievement:" name="Achievement" rules={[{ required: true,message: 'Input Position', },]}>
          <TextArea showCount maxLength={2000} placeholder="Be Specific and itemized For each event,state when and where and provide details." style={{ height: 150 }}/>
          </Form.Item>

          <Form.Item label="Budgeting:" name="Budgeting" rules={[{ required: true,message: 'Input Position', },]}>
          <TextArea showCount maxLength={2000} placeholder="Planned budget. Actual use." style={{ height: 150 }}/>
          </Form.Item>

          <Form.Item label="Comments:" name="Comments" rules={[{ required: true,message: 'Input Position', },]}>
          <TextArea showCount maxLength={2000} placeholder="Is Everything on track? Any adjustment of budgeting and or the remaining plan needed if the project will be camed out in the future? etc." style={{ height: 120 }}/>
          </Form.Item>

          <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Save
              </Button>
              
          </Form.Item>
          <Button type="primary" onClick={()=>{
            navigate(-1)
          } }  block>
               Back
          </Button>
      </Form>
      </Spin>
      </Card>
      
    </div>
      
  </Card>
  </div>;
}
