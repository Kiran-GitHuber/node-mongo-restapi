const  express = require("express");
const router = express.Router();

const OrdersController = require("../controller/orders")
router.get('/',OrdersController.order_get_all);

router.post('/',OrdersController.order_post_order)

router.get('/:orderId',OrdersController.order_get_order);

module.exports = router;