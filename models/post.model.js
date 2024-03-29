const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.findPostById = (postId, next) => {
    Post.findById(postId, (err, post) => {
        next(err, post);
    });
};

exports.updatePost = (obj, postId, next) => {
    const updatedPost = new Post(obj);

    Post.updateOne({_id: postId}, updatedPost, (err, updatedPost) => {
        next(err, updatedPost);
    });
}

exports.getAllPost = (all, next) => {
    Post.find(all, (err, allPost) => {
        next(err, allPost);
    });
}