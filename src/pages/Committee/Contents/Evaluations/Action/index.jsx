import React from 'react'
import {Button} from 'antd'
import { useNavigate } from "react-router-dom";

export default function Action(props) {
    const navigate = useNavigate();
    return (
    <Button type="primary" size="small" onClick={()=>{
        if(props.name==='0')navigate("/committee/goeva/"+(props.id));
        else navigate("/committee/editeva/"+(props.id));
    }}  ghost >
        {props.name==='0'?'Go Evaluation':'Edit Evaluation'}
    </Button>
  )
}
