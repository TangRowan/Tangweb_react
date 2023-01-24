import React from 'react'
import {Button} from 'antd'
import { useNavigate } from "react-router-dom";

export default function Action(props) {
    const navigate = useNavigate();
    return (
    <Button type="primary" size="small" onClick={()=>{
        navigate("/user/projectc/"+(props.id));
    }}  ghost >
        Continue
    </Button>
  )
}
