const Profile= require("../models/Profile");
const User= require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course=require("../models/Course");

exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber,firstName, gender} = req.body;
		const id = req.user.id;
    console.log(firstName);

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);


		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
    profile.gender=gender;
    userDetails.firstName=firstName;

    await userDetails.save();
   

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
      userDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

//delete profile
exports.deleteProfile= async(req,res)=>{
    try{
        //find id
        console.log("Printing ID: ", req.user.id);
        const id = req.user.id;
        
        const user = await User.findById({ _id: id });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        // TODO: Unenroll User From All the Enrolled Courses
        if (user.Courses && user.Courses.length > 0) {
          await Course.updateMany(
              { _id: { $in: user.Courses } }, 
              { $pull: { studentsEnrolled: id } } 
          );
      }
        // Now Delete User
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
}

//get all user details
exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
       console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
          { _id: userId },
          { Image: image.secure_url },
          { new: true }
        )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
 exports.getEnrolledCourses = async (req, res) => {
   try {
     const userId = req.user.id;
     const userDetails = await User.findOne({
       _id: userId,
     })
       .populate("Courses")
       .exec()
     if (!userDetails) {
       return res.status(400).json({
         success: false,
         message: `Could not find user with id: ${userDetails}`,
       })
     }
     return res.status(200).json({
       success: true,
       data: userDetails.Courses,
     })
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     })
   }
 };



// exports.getEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.user.id
//     let userDetails = await User.findOne({
//       _id: userId,
//     })
//       .populate({
//         path: "Courses",
//         populate: {
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//           },
//         },
//       })
//       .exec()
//     userDetails = userDetails.toObject()
//     var SubsectionLength = 0
//     for (var i = 0; i < userDetails.Courses.length; i++) {
//       let totalDurationInSeconds = 0
//       SubsectionLength = 0
//       for (var j = 0; j < userDetails.Courses[i].courseContent.length; j++) {
//         totalDurationInSeconds += userDetails.Courses[i].courseContent[
//           j
//         ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
//         userDetails.Courses[i].totalDuration = convertSecondsToDuration(
//           totalDurationInSeconds
//         )
//         SubsectionLength +=
//           userDetails.Courses[i].courseContent[j].subSection.length
//       }
//       let courseProgressCount = await CourseProgress.findOne({
//         courseID: userDetails.Courses[i]._id,
//         userId: userId,
//       })
//       courseProgressCount = courseProgressCount?.completedVideos.length
//       if (SubsectionLength === 0) {
//         userDetails.Courses[i].progressPercentage = 100
//       } else {
//         // To make it up to 2 decimal point
//         const multiplier = Math.pow(10, 2)
//         userDetails.Courses[i].progressPercentage =
//           Math.round(
//             (courseProgressCount / SubsectionLength) * 100 * multiplier
//           ) / multiplier
//       }
//     }

//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find user with id: ${userDetails}`,
//       })
//     }
//     return res.status(200).json({
//       success: true,
//       data: userDetails.Courses,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled?.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
