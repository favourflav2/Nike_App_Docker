import React from 'react'
import {  Alert, AlertTitle } from "@mui/material";
import { Link } from 'react-router-dom';

export interface  ErrorPageProps {
}

export default function ErrorPage (props:  ErrorPageProps) {
  return (
    <div className='w-full h-screen p-4 bg-gray-200'>
      <Alert severity='error' variant='filled'>
            <AlertTitle>Error</AlertTitle>
            Sorry, there was an error {"-"}
           
                <br />
            <strong className=' mt-3'>Back to <Link to="/">Home!</Link></strong>
        </Alert>
    </div>
  );
}