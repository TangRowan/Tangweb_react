//首页
import React from 'react'
import { Card ,Col, Row,Image} from 'antd'
import './index.css'
import {Link} from 'react-router-dom'
export default function Introduce() {
  return (
    <Card type="ncenter" >
      
      <Row>
      <Card style={{ marginTop: 16}}
        type="inner" >
          
        <Row>
          <Col span={6}>
            <Image
          preview={false}
          src={require('../../img/gridlock.png')}
        />
        </Col>
          <Col span={17} offset={1}><h2><Link to="/gridlock">Gridlock</Link> </h2>
        <h1>Gridlock is a game-based learning environment designed to teach students the basics of digital logic design. In Gridlock, students are placed into the world and tasked with repairing a broken traffic light. Gridlock uses AI methods to automatically detect a player's areas of difficulty, providing adaptive, personalized assistance all within the game environment. The game is currently under continued development with support from NSF.</h1>
        </Col>
        </Row>
        </Card>
      </Row>

  </Card>

  )
    
  
}
