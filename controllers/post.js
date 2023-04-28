const bcrypt = require("bcrypt");
const Post = require("../models/Post.js");
const Counter = require("../models/Counter.js");

exports.HelloWorld = async (req, res) => {
  try {
    res.status(200).send(" Hello Node.js ");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllposts = async (req, res) => {
  try {
    const allposts = await Post.find().sort({ postNumber: -1 });
    res.status(200).json(allposts);
  } catch (error) {
    console.log(error);
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await Post.find().sort({ postNumber: -1 });
    res.status(200).json(board);
  } catch (error) {
    console.log(error);
  }
};

exports.getPostdetail = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePostHits = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    post.postHits = (post.postHits || 0) + 1;
    await post.save();
    return res.status(200).json(post.postHits);
  } catch (error) {
    console.log(error);
  }
};

exports.writePost = async (req, res) => {
  try {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    };
    const createdAt = date.toLocaleString("ko-KR", options);
    const { title, content, writer, postPassword } = req.body;
    const imageInfo = req.file;
    const { genre } = req.params;
    hashedPassword = await bcrypt.hash(postPassword, 10);
    const postCount = await Counter.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true }
    );
    const postNumber = postCount.count;

    const post = new Post({
      genre,
      title,
      content,
      writer,
      postPassword: hashedPassword,
      createdAt,
      postNumber,
      imageInfo,
    });
    await post.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.writeComment = async (req, res) => {
  try {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    };
    const commentAt = date.toLocaleString("ko-KR", options);
    const { comment, commentBy, commentPw } = req.body;
    const { id } = req.params;
    hashedPassword = await bcrypt.hash(commentPw, 10);
    const post = await Post.findById(id);

    const newComment = {
      comment: comment,
      commentBy: commentBy,
      commentPw: hashedPassword,
      commentAt: commentAt,
    };

    post.comments.push(newComment);
    await post.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { postId, inputcommentPw } = req.body;
    const post = await Post.findById(postId);
    const comment = post.comments.find((comment) => comment._id == id);
    const match = await bcrypt.compare(inputcommentPw, comment.commentPw);
    if (match) {
      post.comments = post.comments.filter((comment) => comment._id != id);
      await post.save();
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkPostpassword = async (req, res) => {
  try {
    const { postId, postpassword } = req.body;
  
    const post = await Post.findById(postId);
    const match = await bcrypt.compare(postpassword, post.postPassword);
    if (match) {
      await post.save();
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    };
    const updatedAt = date.toLocaleString("ko-KR", options);
    const { title, content, writer, postPassword } = req.body;
    const { id } = req.params;
    hashedPassword = await bcrypt.hash(postPassword, 10);

    const updatePost = {
      title,
      writer,
      content,
      postPassword: hashedPassword,
      createdAt : updatedAt,
    };
    await Post.findByIdAndUpdate(id, updatePost, { new : true });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId, postpassword } = req.body;
  
    const post = await Post.findById(postId);
    const match = await bcrypt.compare(postpassword, post.postPassword);
    console.log(post.postPassword);
    if (match) {
      await Post.findByIdAndRemove(postId);
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
}
