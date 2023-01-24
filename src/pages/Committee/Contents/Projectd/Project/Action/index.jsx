import React from 'react'
import {Button} from 'antd'
import { useNavigate } from "react-router-dom";

export default function Action(props) {
    const navigate = useNavigate();
    return (
    <Button type="primary" disabled={props.id==='N/A'?true:false} size="small" onClick={()=>{
        navigate("/committee/browse/"+(props.id));
    }}  ghost >
        Browse
    </Button>
  )
}
