var router = require('express').Router();
const BlogController = require('../Controllers/BlogController');
const AppController = require('../Controllers/AppController');
const authorize = require('../helpers/authorize');

router.get('/authenticate', authorize('Admin'), AppController.authenticate);

router.get('/get/:skip', BlogController.blog_get_all);

router.post('/create', authorize('Admin'), BlogController.blog_create);

/*router.get('/:blogId', BlogController.blog_find_one);*/

router.get('/:slug', BlogController.blog_find_by_slug);

router.post('/:slug', authorize('Admin'), BlogController.blog_update);

router.delete('/:blogId',BlogController.blog_delete);


module.exports = router;