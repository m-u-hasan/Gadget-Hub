const express = require('express');
const router = express.Router();
const { 
  addToWishlist, 
  addToCompare, 
  getWishlist, 
  getCompareList, 
  removeFromList 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/wishlist').put(protect, addToWishlist).get(protect, getWishlist);
router.route('/compare').put(protect, addToCompare).get(protect, getCompareList);
router.delete('/:type/:id', protect, removeFromList);

module.exports = router;
