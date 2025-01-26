import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import React from "react";

import { formattedDate } from "../../../utils/dateFormatter"
import { RiEditBoxLine } from "react-icons/ri"

 const MyProfile=()=>{
    const{user}=useSelector((state)=>state.profile);
    const navigate= useNavigate();

    return(
    <div>
      <div className="flex justify-between">
     <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex md:hidden h-10">
      <IconBtn
         text="Home"
         onclick={() => {
           navigate("/")
         }}
         >
          </IconBtn>
          </div>
      </div>

      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex items-center gap-x-4 flex-wrap sm:flex-nowrap">
  {/* Profile Image */}
  <img
    src={user?.Image}
    alt={`profile-${user?.firstName}`}
    className="aspect-square w-[50px] sm:w-[78px] rounded-full object-cover"
  />
  
  {/* User Info */}
  <div className="space-y-1 text-center sm:text-left w-full sm:w-auto">
    <p className="text-base sm:text-lg font-semibold text-richblack-5 truncate">
      {user?.firstName}
    </p>
    <p className="text-xs sm:text-sm text-richblack-300 truncate">
      {user?.email}
    </p>
  </div>
</div>
        <IconBtn
         text="Edit"
         onclick={() => {
           navigate("/dashboard/settings")
         }}
         >
         <RiEditBoxLine />
         </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
        </div>

        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Full Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Profession</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.accountType}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
        </div>

    </div>
    )
}

export default MyProfile;