import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen sm:flex-row">
        {/* Sidebar */}
        <VideoDetailsSidebar setReviewModal={setReviewModal} className="w-full bg-gray-800 " />

        {/* Main Content */}
        <div className="w-full h-auto sm:w-3/4 flex flex-col p-4 overflow-y-auto ">
          <Outlet />
        </div>
      </div>
      
      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
