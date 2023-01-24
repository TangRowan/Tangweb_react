import React from 'react'
import { useParams } from 'react-router-dom';
import Project from './Project'

export default function Projected() {
    const params = useParams();

    return (
    <div>
        <Project PID={params.PID}/>

    </div>
  )
}