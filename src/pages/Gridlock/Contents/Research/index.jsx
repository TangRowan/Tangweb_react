//首页
import React from 'react'
import { Card ,Col, Row,Image } from 'antd'
import './index.css'

export default function Introduce() {
  return (
    <>
    <Card  >
    <Image
    width={1060}
      src={require('../../img/ping.png')}
    />
    </Card>
    <Card type="ncenter" style={{ marginTop: 16}}>
    Gridlock is the first successful implementation of the Personalized Instruction and Need-aware Gaming (PING) system, shown above. The PING system combines a serious game, a game/student model, and an AI decision-making module into one general-purpose system, designed for any adaptive educational serious game. For more information, see our recent publications.
    </Card>
    <Card  style={{ marginTop: 16}}>
    <iframe width="1060"height="300" src="https://www.youtube.com/embed/MEVNIUs9Nig" title="Gridlock Research Summary" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </Card>
    <Card  style={{ marginTop: 16}}>
    How it works: Within a PING-integrated serious game, various data collection measures are put in place to test and evaluate students' educational performance as they play. In Gridlock, these measures include webcam-based facial emotion recognition, recorded mouse movements and key presses, and test results from built-in content quizzes.
    <p/>
    When students reach various points in the game, the accumulated data is processed by the game and sent securely to our artificial intelligence (AI) server. Once there, the AI system selects a set of assistance actions to supply to the player. The game then modifies the structure and content of the virtual environment to fit the recommendations made by the AI.
    </Card>
    <Row gutter={16}>
      <Col span={12} >
      <Card  style={{ marginTop: 16, height : 340}}
      type="inner" >
   
        <Image
              src={require('../../img/rl.png')}
            />
      </Card>

      </Col>
      
      
    <Col span={12} >
      <Card  style={{ marginTop: 16 , height : 340}}
      type="inner" >
      The AI system uses reinforcement learning to automatically determine the best assistance to provide to each player. Whenever an instance of the game requests assistance for a player, that player's data is sent to the AI system, where the system uses its past experience to predict the assistance that will most likely help the player.
      <p/>
      Once that assistance is provided, the game sends an updated set of player data to the server. The server then uses the resulting change in the player's performance as a metric to predict assistance for future players.</Card>

      </Col>
      
      </Row>

    </>

  )
    
  
}
