const { createPost, updatePost, deletePost, getAllPosts } = require('../controllers/post.controller');

module.exports = app => {
    app.post('/api/posts', createPost);
    app.get('/api/postslist', getAllPosts); // Route to get all posts
    app.put('/api/posts/:id', updatePost);
    app.delete('/api/posts/:id', deletePost);
};
