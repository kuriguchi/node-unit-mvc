const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    const postId = req.params.id; 
    PostModel.updatePost(postId, req.body, (err, updatedPost) => {
        if (err) {
            return res.status(500).end();
        } else if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        } else {
            return res.json(updatedPost);
        }
    });
};

PostController.findPost = (req, res) => {
    const postId = req.params.id; 

    PostModel.getPostById(postId, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else if (!postId) {
            return res.status(404).json({ error: 'Post not found' });
        } else {
            return res.json(post);
        }
    });
};

PostController.getAllPosts = (req, res) => {
    PostModel.getAllPosts((err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });
};

module.exports = PostController;