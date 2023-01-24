//首页
import React from 'react'
import { Card ,Col, Row,Image,Carousel} from 'antd'
import './index.css'
import {Link} from 'react-router-dom'
export default function Introduce() {
  return (
    <>
    <Card type="ncenter" >
      <Carousel  autoplay>
        <div>
        <Image
              src={require('../../img/accident.png')}
            />
        </div>
        
      </Carousel>
       </Card>
      
       <Card type="ncenter" style={{ marginTop: 16}}>

      Gridlock is an educational game that has been revamped over the past year and is undergoing continuing development. The game focuses on the principles of digital logic design, and is run in tandem with a lab assignment to code a traffic light in Verilog. Throughout Gridlock, students explore a virtual environment with the ultimate task of fixing a malfunctioning traffic light. The in-game support systems will identify any areas of difficulty and provide appropriate study materials, strengthening that student's knowledge.
<p/>
Gridlock is the first full implementation of our general-purpose PING system that combines intelligent, adaptive tutoring with educational serious games. For more details, see the Research page.

       </Card>
      
      <Row gutter={16}>
      <Col span={12} >
      <Card  style={{ marginTop: 16}}
      type="inner" >
    <Carousel  autoplay>
        <div>
        <Image
        width={500}
        height={375}
              src={require('../../img/gridlockAbout1.png')}
            />
        </div>
        <div>
        <Image
        width={500}
        height={375}
 
              src={require('../../img/gridlockAbout2.png')}
            />
        </div>
        <div>
        <Image
        width={500}
        height={375}
              src={require('../../img/gridlockAbout3.png')}
            />
        </div>
        
      </Carousel>
      </Card>

      </Col>
      
      
    <Col span={12} >
      <Card  style={{ marginTop: 16}}
      type="inner" >Automatic traffic lights are a very common engineering invention, continuing to make the lives of common people safer and more convenient. Gridlock invites students to investigate solutions to automatic traffic light control to help traffic flow of a 4-way intersection. With students able to write and test Verilog code all from within the game, the game naturally transforms the digital logic fundamentals to lively concepts that students can associate. This game is devoted to sequential circuit design, finite state machines, state minimization for optimization, and design procedures.
      <p/>
      A traffic light which controls the traffic at an intersection with a North-South direction street and an East-West direction street is presented to the students as shown in the first image on the left. The sequence of lights turning green, yellow and red are given in a table as shown in the second image on the left. The traffic light also has a timing requirement of 16 clock cycles per light.
      <p/>
      As students play through Gridlock, they receive personalized in-game dialogue guiding them to review certain materials. Then, they are provided with helpful documentation to review, as shown on the left.
      </Card>
      </Col>
      
      </Row>
    
    

 
  </>

  )
    
  
}
