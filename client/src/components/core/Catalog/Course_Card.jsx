import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
     <Link to={`/courses/${course._id}`} className="block">
  <div className="rounded-lg bg-richblack-800  transition-shadow duration-300 overflow-hidden hover:shadow-[0px_20px_20px_10px_#ecc94b]">
    {/* Image Section */} 
    <div className="h-[250px] sm:h-[250px] rounded-t-lg ">
      <img
        src={course?.thumbnail}
        alt="course thumbnail"
        className="h-full w-full object-cover"
      />
    
    </div>
    {/* Content Section */}
    <div className="flex flex-col gap-2 p-3 sm:p-4">
      {/* Course Name */}
      <p className="text-base sm:text-lg font-semibold text-richblack-5">
        {course?.courseName}
      </p>
      {/* Instructor Name */}
      <p className="text-sm text-richblack-50">{course?.instructor?.firstName}</p>
      {/* Ratings and Reviews */}
      <div className="flex items-center gap-2">
        <span className="text-yellow-500 font-medium">{avgReviewCount || 0}</span>
        <RatingStars Review_Count={avgReviewCount} />
        <span className="text-sm text-richblack-400">
          {course?.ratingAndReviews?.length} Ratings
        </span>
      </div>
      {/* Price */}
      <p className="text-lg font-semibold text-yellow-50">Rs. {course?.price}</p>
    </div>
  </div>
</Link>

    </>
  )
}

export default Course_Card
