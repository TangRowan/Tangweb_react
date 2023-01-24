import React from 'react'
import {Button,Space} from 'antd'
import { useNavigate } from "react-router-dom";

export default function Action(props) {
    const navigate = useNavigate();
    return (
    <Space>
        <Button type="primary" disabled={props.id==='N/A'?false:true} size="small" onClick={()=>{
        navigate("/user/old_prop/"+(props.pid));
    }}  ghost >
        Write 
    </Button>
    <Button type="primary" disabled={props.id==='N/A'?true:false} size="small" onClick={()=>{
        navigate("/user/browse/"+(props.id));
    }}  ghost >
        Browse  
    </Button>
    </Space>
  )
}
