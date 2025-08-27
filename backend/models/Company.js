import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 

    industry : {
        type : String,
        index: true
    },

    description : {
        type : String,

    },

    employees : {
        type : Number,
        default : 0 , 
        index : true
    },

    founded : {
        type : Number
    },

    location : {
        type : String,
        index : true
    },

    website : {
        type : String,
    },

    createAt : {
        type : Date,
        default : Date.now
    }
});

// text index for flexible search across name and description
CompanySchema.index({ name: "text", description: "text" });

export default mongoose.model("Company", CompanySchema);