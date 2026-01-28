
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect } from 'react';


export default function AccountInfo() {
    const {user} = useContext(AuthContext);
    
  return (
   <div className="text-center text-dark mt-20 flex flex-col items-center gap-6">
        
        <h1 className='text-3xl font-black'>{user.fullName}</h1>
        <div className='flex'>
           <h2>@{user.username} <span className='mx-1'>-</span> <span className='bg-accent w-full rounded-full px-2 text-dark cursor-pointer'>Basic<span className='font-semibold'></span> account</span></h2>
          
        </div>
      </div> 
  )
}
