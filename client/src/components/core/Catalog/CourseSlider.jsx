import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules'; 

import Course_Card from './Course_Card';

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1} // Default to one slide on smaller screens
          spaceBetween={16} // Spacing between slides
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 1.5, // Show 1.5 slides on small tablets
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2, // Show 2 slides on tablets
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3, // Show 3 slides on desktops
              spaceBetween: 25,
            },
          }}
          className="max-h-[30rem] w-full"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[200px] sm:h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
