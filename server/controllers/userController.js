const User = require('../models/User');

// @desc    Add product to wishlist
// @route   PUT /api/users/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();
    res.json({ message: 'Added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add product to compare list
// @route   PUT /api/users/compare
// @access  Private
const addToCompare = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user.compareList.includes(productId)) {
      return res.status(400).json({ message: 'Product already in compare list' });
    }

    // Limit comparison to 3 products for better UI
    if (user.compareList.length >= 3) {
      return res.status(400).json({ message: 'You can only compare up to 3 products' });
    }

    user.compareList.push(productId);
    await user.save();
    res.json({ message: 'Added to compare list', compareList: user.compareList });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user compare list
// @route   GET /api/users/compare
// @access  Private
const getCompareList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('compareList');
    res.json(user.compareList);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Remove from wishlist/compare
// @route   DELETE /api/users/:type/:id
// @access  Private
const removeFromList = async (req, res) => {
  try {
    const { type, id } = req.params;
    const user = await User.findById(req.user._id);

    if (type === 'wishlist') {
      user.wishlist = user.wishlist.filter(item => item.toString() !== id);
    } else {
      user.compareList = user.compareList.filter(item => item.toString() !== id);
    }

    await user.save();
    res.json({ message: 'Removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  addToWishlist,
  addToCompare,
  getWishlist,
  getCompareList,
  removeFromList
};
