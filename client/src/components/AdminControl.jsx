import React from 'react'
import {useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";

function AdminControl() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    currentUser? <Outlet /> : <Navigate to="/login"/>
  )
}

export default AdminControl