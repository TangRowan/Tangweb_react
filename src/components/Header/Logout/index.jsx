import React from 'react';
import { Button,Menu } from 'antd';
import {
    LogoutOutlined 
  } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'

export default function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    function sw() {
        dispatch({
          type: 'logout'
      })
        navigate("/login");
    }
  return<Button
    type="link"
    onClick={sw}
  >
                Log out
    </Button>
;
}
