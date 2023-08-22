import * as React from 'react';

import { Navigate } from 'react-router-dom';



export default function PrivateRoute ({children}:any) {
    //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"))
  return user?.user?.id ? children : <Navigate to="/"/>
}