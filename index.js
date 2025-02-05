require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000

const app = express();
app.use(bodyParser.json());

// Define Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profile: {
      firstName: String,
      lastName: String,
      bio: String,
      profilePicture: String,
      dateOfBirth: Date,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },{timestamps:true});
  
  const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    media: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },{timestamps:true});
  
  const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   },{timestamps:true});
  
  
  // Create Models
  const User = mongoose.model('User', userSchema);
  const Post = mongoose.model('Post', postSchema);
  const Comment = mongoose.model('Comment', commentSchema);
  
  
  
  
  // Create a new user
  app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send({success: true, user})
    } catch (error) {
      res.status(400).send({success: false, error});
    }
  });

  // Create a new post
app.post('/posts', async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.save();
      res.status(201).send({success: true, post})
    } catch (error) {
      res.status(400).send({success: false, error});
    }
  });
  
  // Add a comment to a post
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      const comment = new Comment({ ...req.body, postId: req.params.postId });
      await comment.save();
  
      
      const post = await Post.findById(req.params.postId);
      post.comments.push(comment._id);
      await post.save();
  
      res.status(201).send({success: true, comment})
    } catch (error) {
      res.status(400).send({success: false, error});
    }
  });
  
  // Like a post
  app.post('/posts/:postId/like', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      post.likes.push(req.body.userId);
      await post.save();
      res.status(200).send({success: true, post})
    } catch (error) {
      res.status(400).send({success: false, error});
      console.log(error)
    }
  });
  
  
  
  

  // Get all users
  app.get('/users', async (req, res) => {
    try {
      const user = await User.find()
      res.status(200).send({success: true, user})
    } catch (error) {
      res.status(400).send({success: false, error});
    }
  });

// Connect to MongoDB
const start = async ()=>{
    try {
        await mongoose.connect(process.env.dbString)
        app.listen(PORT, ()=>{
            console.log(`app is listing and connected on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);   
    }
} 
start ();  