import React from 'react'
import avatar from '../assets/avatar.png'
import quotationMark from '../assets/quotationMark.png'

const FeedBackCard = () => {
  return (
    <div className='bg-white p-6 border border-gray-200 rounded-2xl shadow-md mx-2 my-6'>
      <div className='flex justify-between items-start'>
        <div className='flex gap-4 items-center'>
          <img src={avatar} alt="avatar" className='w-14 h-14 rounded-full object-cover' />
          <div>
            <h2 className='text-lg font-semibold text-gray-800'>Jenny Wilson</h2>
            <p className='text-sm text-gray-500'>HR Manager</p>
          </div>
        </div>
        <img src={quotationMark} alt="quote" className='w-6 h-6 opacity-60' />
      </div>
      <p className='text-gray-600 mt-6 text-base leading-relaxed'>
        “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto praesentium distinctio 
        excepturi dolor, nihil unde exercitationem eligendi sit quam nemo cumque, tenetur hic, quasi atque.”
      </p>
    </div>
  )
}

export default FeedBackCard
