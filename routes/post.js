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

const router = express.Router();
const multer = require("multer");
const path = require('path');

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../../코딩/Anonym Board/frontend/public/uploads"); // 파일이 저장될 경로
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // 파일명 설정
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("업로드가 불가능한 파일입니다");
  }
}


/* CREATE */
router.post("/:genre", upload.single("Image"), writePost);
router.post("/comment/:id", writeComment);
router.post("/check/:id", checkPostpassword);

/* READ */
router.get("/", HelloWorld);
router.get("/post/:id", getPostdetail);
router.get("/board", getBoard);
router.get("/allposts", getAllposts);

/* UPDATE */
router.put("/hits/:id", updatePostHits);
router.put("/:id", updatePost);

/* DELETE */
router.delete("/post/:id", deletePost);
router.delete("/comment/:id", deleteComment);

module.exports = router;
