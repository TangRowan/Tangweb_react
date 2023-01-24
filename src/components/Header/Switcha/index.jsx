import React from 'react';
import { Button ,notification} from 'antd';
import {
    UserSwitchOutlined
  } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const openmsg = (type,title,inf)=> {
  notification[type]({
    message: title,
    description:inf,
    duration: 10,
  });
};


export default function Switch() {
    const navigate = useNavigate();
    function sw() {
      openmsg('success','','Switch to Admin successfully! ');
        navigate("/admin");
    }
  return <Button
    type="primary"
    icon={<UserSwitchOutlined />}
    onClick={sw}
  >
  Switch To Admin
</Button>;
}
