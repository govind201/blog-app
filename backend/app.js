const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./model/Blog')
const cors = require('cors');
const multer = require('multer');

const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });


    

mongoose.set("strictQuery", false);
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/eqaim-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all blog posts
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific blog post
app.get('/blogs/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Create a new blog post
app.post('/blogs', upload.single('image'), async (req, res) => {
    const blogPost = new Blog({
        title: req.body.title,
        description: req.body.description,
        image: req.file.buffer
    });
    try {
        const newBlog = await blogPost.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a specific blog post
app.patch('/blogs/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.description != null) {
        res.blog.description = req.body.description;
    }
    if (req.body.image != null) {
        res.blog.image = req.body.image;
    }
    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a specific blog post
app.delete('/blogs/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Deleted Blog' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware function to get a blog post by ID
async function getBlog(req, res, next) {
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.blog = blog;
    next();
}

app.listen(5000, () => console.log("Server started on port 5000"));

