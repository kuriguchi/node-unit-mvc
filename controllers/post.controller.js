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
    const postId = req.params._id;
    PostModel.updatePost(req.body, postId, (err, updatedPost) => {
        if (err) {
            return res.status(500).end();
        } else if (!updatedPost) {
            return res.status(404).end();
        } else {
            return res.json(updatedPost);
        }
    });
};

PostController.findPost = (req, res) => {
    const postId = req.params._id;

    PostModel.findPostById(postId, (err, post) => {
        if(err){
            return res.status(500).end();
        } else if(!post){
            return res.status(404).end();
        } else {
            return res.json(post);
        }
    });
};

PostController.getAllPost = (req, res) => {
    PostModel.getAllPost({}, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });
};

module.exports = PostController;