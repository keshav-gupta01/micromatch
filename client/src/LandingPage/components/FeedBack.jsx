import React from 'react'
import Slider from 'react-slick'
import FeedBackCard from './FeedBackCard'

const FeedBack = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <section className='w-full bg-white py-20 px-4'>
      <div className='max-w-[1100px] mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 text-center mb-4'>
          Students <span className='text-[#398ef7]'>Feedback</span>
        </h1>
        <p className='text-center text-[#6D737A] text-lg mb-10'>
          Various versions have evolved over the years, sometimes by accident.
        </p>
        <Slider {...settings}>
          <FeedBackCard />
          <FeedBackCard />
          <FeedBackCard />
          <FeedBackCard />
          <FeedBackCard />
        </Slider>
      </div>
    </section>
  )
}

export default FeedBack
