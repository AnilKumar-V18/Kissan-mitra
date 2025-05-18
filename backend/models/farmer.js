const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const farmerSchema=new mongoose.Schema({
    _id:{
        type: ObjectId,
        ref:"User"  
    },
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    }
},
{timestamps:true}
);
module.exports=mongoose.model("Farmer",farmerSchema);
