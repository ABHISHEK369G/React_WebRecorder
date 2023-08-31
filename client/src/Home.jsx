import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="containerr">
        <div className="title">
          <h1>WEB RECORDER</h1>
        </div>

        <div className="COLUMN">
        <div className="homebtn">
        <Link  to='/login'>
        <button className="lbtn">Login</button>
        </Link>
           <Link  to="/register" >
            <button className='rbtn' >Register</button>
           </Link>
        </div>
        </div>
        <div className="myname">
          <h4> &copy; Abhishek Gupta</h4>
        </div>
      </div>
    </div>
  )
}

export default Home
