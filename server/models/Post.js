const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    file:String,
    likes:{type:Number,default:0},
    comments:[{text:String}],
    date:{type:Date,default:Date.now}
});

const Post = mongoose.model('Post', postSchema);
export default Post;