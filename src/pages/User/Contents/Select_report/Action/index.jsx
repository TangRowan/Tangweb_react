import React ,{useState}from 'react'
import {Button,Space,Modal,notification} from 'antd'
import { useNavigate } from "react-router-dom";

import {useSelector} from 'react-redux'
import axios from 'axios';
import {ExclamationCircleOutlined} from '@ant-design/icons';

export default function Action(props) {
    const [loadings, setLoadings] = useState(false);
    const userstate = useSelector((state) => {
        return state
    })
    const navigate = useNavigate();
    const openmsg = (type,title,inf,time)=> {
    time=10
    notification[type]({
      message: title,
      description:inf,
      duration: time,
    });
  };
    return (<Space>
        {
            props.state==='0'?<Button type="primary" size="small" onClick={()=>{
                navigate("/user/mreport/"+(props.reportID)+"/"+(props.ayear));
            }}  ghost >
               Modify
            </Button>
            :props.state==='1'?<Button type="primary" size="small" onClick={()=>{
               navigate("/user/breport/"+(props.reportID));
            }}  ghost >
                Browse
            </Button>
            
            :<Button type="primary" size="small" onClick={()=>{
                navigate("/user/write_report/"+(props.id)+"/"+(props.name)+"/"+(props.code)+"/"+(props.year)+"/"+(props.ayear));
                }}  ghost >
                    Write report
                </Button>

        }
        
        
        <Button type="primary" size="small" disabled={props.state==='0'?false:true} loading={loadings} onClick={()=>{
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to submit the report? Note that you cannot modify or delete the report after your submission.',
            okText: 'Yes',
            cancelText: 'No',
            onOk: ()=>{
                setLoadings(true)
                axios.get(userstate.Backurl.url+'/IEEEbackend/report.php?!=3|'+props.reportID+'|'+props.email+'|'+props.ProjectID+'|'+props.ProjectTitle).then(
                    response => {
                        console.log(response.data)
                        if(response.data['success']===1){
                            console.log(response.data)
                            openmsg('success','','The report is successfully submitted.');
                            navigate(0);
                            setLoadings(false);
                        }
                        else switch(response.data['error']){
                            case 1:openmsg('error','','Unknow error');setLoadings(false);break;
                            case 2:openmsg('error','','Fail to write to database.');setLoadings(false);break;
                            default:setLoadings(false);break;
                        }
                    },
                    error => {
                        openmsg('error','','Can not find server');setLoadings(false);
                        
                    }
                )
            },
          });
    }}  ghost >
       Submit
    </Button>
    </Space>
    
  )
}
