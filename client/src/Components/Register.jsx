import React, { useState } from "react"
import axios from 'axios';
import "./register.scss"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const navigate = useNavigate();

  const handlesubmit = async (e ) =>{
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_API)
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{
        name,email,password
      })
      
     if(res && res.data.success){
      const ress = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
        email,password
      })
      
      if(ress && ress.data.success){
        
        localStorage.setItem('auth',JSON.stringify(ress.data.jwttoken))
       
        navigate('/record');
        window.location.reload();
      }
     }
      

      
    } catch (e) {
    
      
    }
  
  }
  return (
    <>
        <div className="container">
          <div className="formdiv">
          <h1>REGISTER PAGE</h1>

          <form className="formdiv" onSubmit={handlesubmit}>
            <div className="inputt">
              <label htmlFor="name">Full Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
            <button>Register</button>
          </form>
          <button onClick={()=>navigate('/login')}>Go to Login</button>
          </div>
        </div>
     
    </>
  );
};

export default Register;
