const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        default:''
    },
    languagesSpeaks:{
        type:Array,
        required:true
    },
    topic:{
        type:Array,
        required:true
    },
    onlineStatus:{
        type:String,
        default:"online"
    },
    solvedQuestionsCount:{
        type:Number,
        default:0
    },
    totalRatingPoints:{
        type:Number,
        default:0
    },
    totalSolutionsAttempted:{
        type:Number,
        default:0
    },
    totalRatingCount:{
        type:Number,
        default:0
    },
    totalQuestionerRating:{
        type:Number,
        default:0
    },
    questionerRatingPoint:{
        type:Number,
        default:0
    },
    country:{
        type:String,
        required:true
    },
    authUserId:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true
    }
},{timestamps:true})



module.exports = mongoose.model('User',userSchema);