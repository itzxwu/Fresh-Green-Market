const express =
require('express');

const router =
express.Router();

const {
getProducts,
addProduct,
getSingleProduct,
deleteProduct
}
=
require('../controllers/productController');

const { protect, admin } =
require('../middleware/authMiddleware');

router.get('/',
getProducts);

router.get(
'/:id',
getSingleProduct
);
router.delete(
'/:id', 
protect, 
admin, 
deleteProduct);

router.post(
  '/',
  protect,
  admin,
  addProduct
);


module.exports = router;