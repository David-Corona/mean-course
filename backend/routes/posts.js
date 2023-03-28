const express = require("express");
const multer = require("multer");

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, "backend/images") // path where stores - relative to server.js
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});

router.post(
  "",
  checkAuth,
  multer({storage: storage}).single("image"),(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
      title: req.body.title, // body is the new field added by body-parser
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully!',
        post: {
          ...createdPost, // copy all properties
          id: createdPost._id // overwrite this one
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Post creation failed!"
      })
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({storage: storage}).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file) { //new uploaded
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.user.userId
    });
    // updateOne will filter same id and same creator id
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
      if (result.modifiedCount > 0) { //result will contain prop modifiedCount which indicates if post has been updated
        res.status(200).json({message: 'Updated successfully!'});
      } else {
        res.status(401).json({message: 'Not authorized!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Post update failed!"
      })
    });
  }
);

router.get('', (req, res, next) => {
  // url?page=2&test=david req.query => { page: '2', test: 'david' }
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) { // check if not undefined (if not passed)
    postQuery
      .skip(pageSize * (currentPage - 1)) // skips content previous pages
      .limit(pageSize);
  }
  postQuery // static method
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Post fetch failed!"
      })
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id) // params: Express property that gives access to parameters
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: "Post not found!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Post fetch failed!"
      })
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.deletedCount > 0) { //result will contain prop deletedCount which indicates if post has been deleted
      res.status(200).json({message: 'Deleted successfully!'});
    } else {
      res.status(401).json({message: 'Not authorized!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Post deletion failed!"
    })
  });
});

module.exports = router;
