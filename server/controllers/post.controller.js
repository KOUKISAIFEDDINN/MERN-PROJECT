const Post = require('../models/Post.models');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate('author', 'username');
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createPost: async (req, res) => {
        // const { userToken } = req.cookies

        try {
            console.log("cookiessss. ------", req.cookies);
            const { title, content, author } = req.body;
            // const token = jwt.verify(userToken, process.env.jwt)
            const newPost = await Post.create({ title, content, author });
            res.status(201).json(newPost);
            console.log("testtttttttttt");
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log("err ---------", error.message);
        }
    },

    updatePost: async (req, res) => {
        try {
            const { title, content } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deletePost: async (req, res) => {
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
