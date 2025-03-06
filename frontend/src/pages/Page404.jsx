import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center h-screen bg-gray-100">
      <h1 className='text-3xl sm:text-5xl font-semibold'>404 - Page Not Found</h1>
      <Link to={'/'} className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-semibold cursor-pointer'>Go To Home</Link>
    </div>
  )
}

export default Page404