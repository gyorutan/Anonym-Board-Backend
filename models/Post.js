const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  genre: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  writer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  postPassword: {
    type: String,
    required: true,
  },
  postNumber: {
    type: Number,
    ref: "Counter",
    required: true,
  },
  postHits : {
    type: Number,
    default: 0
  },
  comments: [
    {
      comment: {
        type: String,
      },
      commentBy: {
        type: String,
        require: true,
      },
      commentPw: {
        type: String,
        require: true,
      },
      commentAt: {
        type: String,
        require: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
