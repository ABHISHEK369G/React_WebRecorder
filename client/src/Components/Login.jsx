import React, { useState } from 'react'
import axios from 'axios';
import './login.scss'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handlesubmit = async (e ) =>{
    e.preventDefault();
    try {
  
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
        email,password
      })
      
      if(res && res.data.success){
        
        localStorage.setItem('auth',JSON.stringify(res.data.jwttoken))
       
        navigate('/record');
        window.location.reload();
      }

    } catch (e) {
      return e.message;
    }
  }
  return (
  <>
   
        <div className="containerlogin">
          <div className="formdivlogin">
          <h1>Login Page</h1>

          <form className="formdivlogin" onSubmit={handlesubmit}>
          

            <div className="inputt">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="inputt">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className='forgetbtn'>Login</button>
            
          </form>
          <button onClick={()=>navigate('/register')}>Go to Register</button>
          </div>
        </div>
    
  </>
  )
}

export default Login
