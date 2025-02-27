const RatingAndReview= require("../models/RatingAndReview");
const Course= require("../models/Course");
const { mongo, default: mongoose } = require("mongoose");


//Carete Rating
exports.createRating=async(req,res)=>{
    try{
        //get User id
        const userId =req.user.id;
        console.log("user ",req.user);
        //fetch data from request body
        const{rating, review, courseId}=req.body;
        //chcek user is enrolled in course or not
        const courseDetails= await Course.findOne({_id:courseId,
            studentsEnrolled:{$elemMatch: {$eq: userId}},
        }
        );
        console.log("Userid courseId rating review",userId,courseId,rating,review);
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in Course"
            });
        }
        //check already reviewd or not
        const alreadyReviewed= await RatingAndReview.findOne(
           { user:userId,
            course:courseId
           },
        );

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"User is already reviewed "
            });
        }
        //create rating and review
        const ratingReview= await RatingAndReview.create({rating,review,
            course:courseId, user:userId}
        );
        //update course with rating and review
        const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{ratingAndReview: ratingReview._id}
            },
            {new:true}
        );
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//get Average Rating
exports.getAverageRating=async(req,res)=>{
    try{
        //get course id
        const courseId=req.body.courseId;
        //calculate avg rating
        const result= await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])
       
         //return rating
         if(result.length > 0) {

            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })

        }
        
        //if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//get All Rating
exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName  email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}