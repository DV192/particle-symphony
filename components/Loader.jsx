import React from 'react'

const Loader = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center text-center z-40'>
      <div className="loader-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  )
}

export default Loader