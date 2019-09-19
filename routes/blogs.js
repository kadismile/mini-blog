var router = require('express').Router();
const BlogController = require('../Controllers/BlogController');


router.get('/get/:skip',BlogController.blog_get_all);

router.post('/create', BlogController.blog_create);

router.get('/:blogId', BlogController.blog_find_one);

router.post('/:blogId', BlogController.blog_update);

router.delete('/:blogId',BlogController.blog_delete);



module.exports = router;