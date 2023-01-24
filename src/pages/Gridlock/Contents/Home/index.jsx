//首页
import React from 'react'
import { Card ,Col, Row,Carousel,Image} from 'antd'
import './index.css'
import {Link} from 'react-router-dom'
import {
  RightSquareTwoTone
} from '@ant-design/icons';
export default function Introduce() {
  return (<>
  <Card type="ncenter" >
  <Carousel  autoplay>
    <div>
    <Image
    width={1200}
    height={450}
          src={require('../../img/1.jpg')}
        />
    </div>
    <div>
    <Image
    width={1200}
    height={450}
          src={require('../../img/2.jpg')}
        />
    </div>
    <div>
    <Image
    width={1200}
    height={450}
          src={require('../../img/3.jpg')}
        />
    </div>
    <div>
    <Image
    width={1200}
    height={450}
          src={require('../../img/4.jpg')}
        />
    </div>
    <div>
    <Image
    width={1200}
    height={450}
          src={require('../../img/5.jpg')}
        />
    </div>
  </Carousel>
  Gridlock is an educational game that has been revamped over the past year and is undergoing continuing development. The game focuses on the principles of digital logic design, and is run in tandem with a lab assignment to code a traffic light in Verilog. Throughout Gridlock, students explore a virtual environment with the ultimate task of fixing a malfunctioning traffic light. The in-game support systems will identify any areas of difficulty and provide appropriate study materials, strengthening that student's knowledge.
  </Card>

  
  
  <Row gutter={16}>
    <Col span={12} >
    
      <Card  style={{ marginTop: 16}}
      type="inner" >
     <Image
     preview={false}
        width={500}
        height={375}
        src={require('../../img/compRoom.png')}
      />About: Gridlock is designed for implementation alongside a related lab assignment. In place of a standard lab, students instead would play through Gridlock to learn and complete the lab, all within the game environment.
      <p/><Link to="/gridlock/about">Read More <RightSquareTwoTone /></Link>
      </Card>
      
      </Col>
      
      
    <Col span={12} >

      <Card  style={{ marginTop: 16}}
      type="inner" >
      <Image
      preview={false}
        width={500}
        src={require('../../img/classroom2.jpg')}/>
        Research: Gridlock is the first successful implementation of our Personalized Instruction and Need-aware Gaming (PING) system. The PING system uses advanced AI methods to provide automated student assistance.
        <p/><Link to="/gridlock/research">Read More <RightSquareTwoTone /></Link>
      </Card>

      </Col>
      
      </Row>
  
  
  </>

  )
    
  
}
