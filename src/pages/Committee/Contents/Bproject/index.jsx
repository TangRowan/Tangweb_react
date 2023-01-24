import React,{useEffect} from 'react'
import Bproject from './mid'
import { useParams } from 'react-router-dom';

export default function Index() {
    const params = useParams();
    useEffect(() => {
        
    });
    
  return (  

   <div key={params.Year}>
    <Bproject year={params.Year}/></div>

    
  )
}
