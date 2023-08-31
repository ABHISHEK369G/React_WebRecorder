import React, { useEffect, useState } from 'react'
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import './index.scss'
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Home';
import Recorder from './Recorder';

// localStorage.setItem('auth',JSON.stringify(res.data.jwttoken))

 const App = () => {
   const [isauth,setIsauth] = useState(false);
   

  
   
useEffect(()=>{
   const getauth = () => {
      const auth = localStorage.getItem('auth');
     
      if(auth){
        setIsauth(true);
      }else{
         setIsauth(false);
      }
   }
    getauth()
 },[])

  return (
     <>
     <BrowserRouter>
      <Routes>
      {!isauth && <Route path='/*' element={ <Home/>} />}
      {isauth && (<Route path='/*'  element={<Recorder/>}/>) }
      {!isauth && <Route path='/login' element={<Login />}/>}
       {!isauth && <Route path='/register' element={<Register/>}/>}
       <Route path='/*' element={ <Home/>}/>
      </Routes>
     </BrowserRouter>
     </>  
  )
}

export default App;



