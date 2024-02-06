const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req, res, error;

    beforeEach(() => {
        req = {
            body: {
                author: 'stswenguser',
                title: 'My first test post',
                content: 'Random content'
            },
            params: {
                _id: '507asdghajsdhjgasd'
            }
        };
        
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };

        error = new Error({ error: 'Some error message' });
    });

    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            createPostStub = sinon.stub(PostModel, 'createPost');
        });

        afterEach(() => {
            createPostStub.restore();
        });

        it('should return the created post object', () => {
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };
            
            createPostStub.yields(null, expectedResult);

            PostController.create(req, res);

            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });

        it('should return status 500 on server error', () => {
            createPostStub.yields(error);

            PostController.create(req, res);

            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub; 

        beforeEach(() => {
            createPostStub = sinon.stub(PostModel, 'createPost');
        });

        afterEach(() => {
            createPostStub.restore();
        });

        it('should return the updated post object', () => {
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub.yields(null, expectedResult);

            PostController.create(req, res);

            sinon.assert.calledWith(createPostStub, req.body);
            sinon.assert.calledWith(res.json, sinon.match(expectedResult));
        });

        if('should return status 404 for non-existing post id', () => {
            updatePostStub = sinon.stub(PostModel, 'findByIdAndUpdate').yields(null, null);

            PostController.update(req, res);

            sinon.assert.calledWith(PostModel.findByIdAndUpdate, req.params._id, req.body, {new: true});
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.status(404).end);
        });

        if('should return status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'findByIdAndUpdate').yields(error);

            PostController.update(req, res);

            sinon.assert.calledWith(PostModel.findByIdAndUpdate, req.params._id, req.body, {new: true});
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.status(500).end);
        }); 
    });

    describe('findPost', () => {
        let getPostByIdStub;

        beforeEach(() => {
            getPostByIdStub = sinon.stub(PostModel, 'getPostById');
        });
    
        afterEach(() => {
            getPostByIdStub.restore();
        });
    
        it('should return the found post object', () => {
            const expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };
    
            getPostByIdStub.yields(null, expectedResult);
    
            req.params.id = '507asdghajsdhjgasd';
    
            PostController.findPost(req, res);
    
            sinon.assert.calledWith(getPostByIdStub, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match(expectedResult));
        });
    
        it('should return status 404 for non-existing post id', () => {
            getPostByIdStub.yields(null, null);
    
            req.params.id = 'nonexistentid';
    
            PostController.findPost(req, res);
    
            sinon.assert.calledWith(getPostByIdStub, req.params.id);
            sinon.assert.calledWith(res.status(404));
            sinon.assert.calledOnce(res.status(404).end);
        });
    
        it('should return status 500 on server error', () => {
            getPostByIdStub.yields(error);
    
            req.params.id = '507asdghajsdhjgasd';
    
            PostController.findPost(req, res);
    
            sinon.assert.calledWith(getPostByIdStub, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });
});