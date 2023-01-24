//首页
import React from 'react'
import { Card ,Col, Row} from 'antd'
import './index.css'

export default function Introduce() {
  return (
    <Card type="ncenter" >
      <Row>
      <Col span={24} offset={0}><Card  style={{ marginTop: 16}}
        type="inner" >
        <h2>Hello, Welcome to my homepage! </h2>
        <h4>I am currently a Professor of Electrical and Computer Engineering, at Rowan University. I received my B.S. and M.S. degrees from the Northeastern University, P. R. China, in 1996 and 1998, respectively, and Ph.D. degree from New Jersey Institute of Technology, Newark, NJ, in 2001. Prior to joining the faculty at Rowan in the Fall of 2002, I was an Assistant Professor in the Computer Science and Computer Engineering department at Pacific Lutheran University, Tacoma, WA.
        </h4>
        <h1><p>My research interests:</p></h1>
        <h4><p>•Discrete Event Systems</p>
        <p>•Petri nets</p>
        <p>•Virtual Reality/Augmented Reality</p>
        <p>•Intelligent Serious Game Systems</p>
        <p>•Artificial Intelligence</p></h4>
        </Card></Col>
      </Row>
  </Card>

  )
    
  
}
