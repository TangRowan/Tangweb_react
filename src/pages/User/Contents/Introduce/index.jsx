import React from 'react'
import { Card } from 'antd'
import './index.css'

export default function Introduce() {
  return (
    <Card type="ncenter" >

    <Card  style={{ marginTop: 16 }}
    type="inner" >
    <h2>Welcome to IEEE SMCS Project Management System! </h2>
    <h1>The system allows SMCS officers to :</h1>
    <p>• Submit requests for both operating budget and New Initiative budget</p>
    <p>&nbsp;&nbsp;★ You can modify the proposal Before the proposal approved</p>
    <p>• Evaluate New Initiative proposals</p>
    <p>• Submit annual reports for approved SMCS projects</p>
    </Card>
    

  </Card>

  )
    
  
}
