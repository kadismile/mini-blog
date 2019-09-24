var router = require('express').Router();
const BlogController = require('../Controllers/BlogController');


router.get('/get/:skip',BlogController.blog_get_all);

router.post('/create', BlogController.blog_create);

/*router.get('/:blogId', BlogController.blog_find_one);*/

router.get('/:slug', BlogController.blog_find_by_slug);

router.post('/:slug', BlogController.blog_update);

router.delete('/:blogId',BlogController.blog_delete);



module.exports = router;