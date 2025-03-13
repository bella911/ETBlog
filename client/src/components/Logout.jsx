import React from 'react'
import { Link } from 'react-router-dom'
import axios from "../axios"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/authSlice';

function Logout() {

  const dispatch = useDispatch();

  const handleLogout = () => {
    axios
      .post("/auth/logout", { withCredentials: true })
      .then((res) => {
        dispatch(signOut());
        navigate("/login");
      })
      .catch((error) => console.log(error.message))
  }



  return (
    <button onClick={handleLogout}>Sign out</button>
  )
}
export default Logout