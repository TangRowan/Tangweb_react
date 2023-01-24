import React, { Component ,lazy,Suspense} from 'react';
/*

import Rpsword from './pages/Rpsword';
import Singup from './pages/Singup';
import Admin from './pages/Admin';
import User from './pages/User';
import NotFound from './pages/NotFound';
*/
import {
  Routes,
  Route,
} from 'react-router-dom'
import Tang from './pages/Tang';
import NotFound from './pages/NotFound'
import Loading from './components/Loading';


const Gridlock = lazy(()=> import('./pages/Gridlock'))
//const NotFound= lazy(()=> import('./pages/NotFound'))





export default class App extends Component {
  render() {
    return <div>
      <Suspense fallback={<Loading/>}>
      <Routes>
        
        <Route index element = {<Tang/>}/> 
        <Route path="/tang/*" element = {<Tang/>}/>
        <Route path="/gridlock/*" element = {< Gridlock />}/>
        

        <Route path="*" element={<NotFound />} />

      </Routes>
      </Suspense>
    </div>;
  }
}
