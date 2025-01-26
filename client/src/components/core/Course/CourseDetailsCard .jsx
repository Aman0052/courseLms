import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: thumbnailImage,
        price: CurrentPrice,
    } = course;

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy a course");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to add to cart",
            btn1text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    };

    return (
        <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
            {/* Course Image */}
            <img
                src={thumbnailImage}
                alt={course?.courseName}
                className="h-auto w-full max-h-[300px] min-h-[180px] rounded-2xl object-cover md:max-w-full"
            />

            <div className="px-2 md:px-4">
                {/* Price */}
                <div className="pb-4 text-lg md:text-3xl font-semibold">
                    Rs. {CurrentPrice}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4">
                    <button
                        className="bg-yellow-50 w-full px-4 py-2 text-richblack-900 rounded-md text-center"
                        onClick={
                            user && course?.studentsEnrolled.includes(user?._id)
                                ? () => navigate("/dashboard/enrolled-courses")
                                : handleBuyCourse
                        }
                    >
                        {user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"}
                    </button>

                    {!course?.studentsEnrolled.includes(user?._id) && (
                        <button
                            onClick={handleAddToCart}
                            className="bg-yellow-50 w-full px-4 py-2 text-richblack-900 rounded-md text-center"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>

                {/* Money-Back Guarantee */}
                <div>
                    <p className="pb-3 pt-4 text-center text-xs md:text-sm text-richblack-25">
                        30-Day Money-Back Guarantee
                    </p>
                </div>

                {/* Course Includes */}
                <div>
                    <p className="my-2 text-base md:text-xl font-semibold">
                        This Course Includes:
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-caribbeangreen-100">
                        {course?.instructions?.map((item, i) => (
                            <p className="flex gap-2" key={i}>
                                <BsFillCaretRightFill />
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>
                </div>

                {/* Share Button */}
                <div className="text-center">
                    <button
                        className="mx-auto flex items-center gap-2 py-2 md:py-4 text-yellow-100"
                        onClick={handleShare}
                    >
                        <FaShareSquare size={15} /> Share
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseDetailsCard;
