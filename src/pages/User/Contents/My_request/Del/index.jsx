import React from 'react'
import {Button,Modal,notification} from 'antd'
import { useNavigate } from "react-router-dom";

import {useSelector} from 'react-redux'
import axios from 'axios'
import {ExclamationCircleOutlined} from '@ant-design/icons';
export default function Del(props) {
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
    return (
    <Button type="primary" size="small" disabled={props.delstate} onClick={()=>{
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to Delete this proposal?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: ()=>{
                axios.get(userstate.Backurl.url+'/IEEEbackend/delrequest.php?!='+(props.id)).then(
                    response => {
                        
                        if(response.data['success']===1){
                            openmsg('success','','Delete successfully!');
                            navigate('/user/new_prop');
                            navigate('/user/my_request')
                        }
                        else switch(response.data['error']){
                            case 1:openmsg('error','','Unknow error');break;
                            case 2:openmsg('error','','Fail to write to database.');break;
                            default:break;
                        }
                    },
                    error => {
                        openmsg('error','','Can not find server');
                        
                    }
                )
            },
          });
    }} danger ghost >
       Delete
    </Button>
  )
}
