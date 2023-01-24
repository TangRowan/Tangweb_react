//首页
import React from 'react'
import { Card ,Col, Row,Image } from 'antd'
import './index.css'

export default function Introduce() {
  return (
    <Card type="ncenter" >
      <Row>
      <Col span={24} offset={0}><Card  style={{ marginTop: 16}}
        type="inner" >

        <h2>Spring 19</h2>
        <h4>Introduction to Discrete Event Systems<p/>
        Clinic Consultant Module in Probability and Statistics
        </h4>
        <h2><p>Courses taught in the past</p></h2>
        <h4><p>Introduction to Discrete Event Systems</p>
        <p>•Frontiers</p>
        <p>•Introduction to Embedded Systems</p>
        <p>•Smart Imaging and Vision</p>
        <p>•Sophomore Clinic II: Center of Rocketry Excellence</p>
        <p>•(Introduction to) Digital Image Processing</p>
        <p>•Introduction to Discrete Event Systems</p>
        <p>•Principles and Applications of Electrical and Computer Engineering for Non-Major</p>
        <p>•Networks I</p>
        <p>•Freshman Clinic I</p>
        <p>•Freshman Clinic II</p>
        <p>•Digital I</p>
        <p>•Digital II</p>
        <p>•Computer Architecture I</p>
        <p>•Computer Architecture II</p>
        <p>•Computer Networks</p>
        <p>•Advanced Microprocessor Design and Programming</p>
        <p>•Computerized Information Systems</p>
        <p>•Assembly Language and Computer Organization</p>
        </h4>
       
        </Card></Col>
      </Row>
  </Card>

  )
    
  
}
