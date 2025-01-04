const mongoose= require("mongoose");

const subSectionSchema =new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
    },
    videoUrl:{
        type:String,
    }

});

// module.exports = mongoose.model("SubSection", subSectionSchema);

 const SubSection = mongoose.models.subSection || mongoose.model('subSection', subSectionSchema);
 module.exports = SubSection;