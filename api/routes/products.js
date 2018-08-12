const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require("../controller/products")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    fileName: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage: storage});
router.get('/', ProductsController.product_get_all)

router.post('/', upload.single('productImage'), checkAuth, ProductsController.post_product_info)

router.get('/:productId', ProductsController.product_get_all);

router.put('/:productId', ProductsController.put_product_info)

router.patch('/:productId', ProductsController.patch_product_info);

router.delete('/:productId', ProductsController.delete_product_info);

module.exports = router;