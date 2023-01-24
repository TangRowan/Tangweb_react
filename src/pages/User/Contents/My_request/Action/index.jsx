import React from 'react'
import {Button} from 'antd'
import { useNavigate } from "react-router-dom";


export default function Action(props) {
    const navigate = useNavigate();
    return (
    <Button type="primary" size="small" onClick={()=>{
        if(props.name==='0')navigate("/user/modify/"+(props.id));
        else if(props.name==='3')navigate("/user/returnmodify/"+(props.id));
        else navigate("/user/browse/"+(props.id));
    }}  ghost >
        {props.name==='0'||props.name==='3'?'Modify':'Browse'}
    </Button>
  )
}
