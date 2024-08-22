import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({ label, buttonText, to }) => {
    return (
        <>
         <div className='py-2 text-sm flex justify-center'>
            {label}

        </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
        
        </>
       
    )
}

export default BottomWarning