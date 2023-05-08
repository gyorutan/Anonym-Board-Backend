const express = require("express");
const {
  HelloWorld,
  getBoard,
  getPostdetail,
  writePost,
  writeComment,
  deleteComment,
  getAllposts,
  updatePostHits,
  checkPostpassword,
  updatePost,
  deletePost,
} = require("../controllers/post");
const { getImage } = require("../controllers/upload.js");
const router = express.Router();

/* CREATE */
router.post("/:genre", writePost);
router.post("/comment/:id", writeComment);
router.post("/check/:id", checkPostpassword);

/* READ */
router.get("/", HelloWorld);
router.get("/post/:id", getPostdetail);
router.get("/board", getBoard);
router.get("/allposts", getAllposts);
router.get("/image", getImage);

/* UPDATE */
router.put("/hits/:id", updatePostHits);
router.put("/:id", updatePost);

/* DELETE */
router.delete("/post/:id", deletePost);
router.delete("/comment/:id", deleteComment);

module.exports = router;
