//首页
import React from 'react'
import { Card ,Col, Row,Carousel,Image} from 'antd'
import './index.css'
import {Link} from 'react-router-dom'

export default function Introduce() {
  return (<>
  <Card type="ncenter" >
  
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSePm5Ujy4GAfwgkgL_KFuy9hnOzRGY7iL7rA2dRD9o1C8sKNA/viewform">Download Gridlock here</a>
  </Card>

  
  
  <Row gutter={16}>
    <Col span={12} >
    
      <Card  style={{ marginTop: 16,height : 310}}
      type="inner" >
        <Image
        preview={false}
          src={require('../../img/gridlockAbout0.jpg')}
        />
     </Card>

      </Col>
      
      
    <Col span={12} >

      <Card  style={{ marginTop: 16,height : 310}}
      type="inner" >
      Interested in trying Gridlock? Gridlock is provided free-of-charge to educators who would like to use it in their own classrooms.
<p/>
When in use, the current version of Gridlock will connect to our servers to interface with our AI system. We are currently working to make the server software available.
<p/>
By downloading, you agree to use the provided software in an educational capacity only. You may not distribute the any part of the software without express permission from Dr. Gina Tang at Rowan University . All parts of the software, including but not limited to: code written in the software, designs for settings and menus, and models used in any of the software, is the property of Dr. Gina Tang and Rowan University and may not be redistributed in any capacity.</Card>

      </Col>
      
      </Row>
  
  
  </>

  )
    
  
}
