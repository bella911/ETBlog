import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/authSlice';

function Logout() {
  
  const dispatch = useDispatch();

  const handleLogout =  () =>{
    axios
        .post("/auth/logout", )
        .then(() => {
          dispatch(signOut())
        })
        .catch((error) => {console.log(error);})
      }

  return (
    <div className='max-w-screen-xl mx-auto mt-20 mb-64 pl-8 text-xl'>
      <button
       className='p-2 inline-block border-2 rounded-xl bg-red-500'
       type="submit" onClick={handleLogout} >Logout</button>
       {/* <Link to={"/login"} className='p-2 inline-block border-2 rounded-xl bg-red-500'>Logout</Link>  */}
    </div>
  )
}
export default Logout