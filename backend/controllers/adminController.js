const User = require('../models/User');
const Order = require('../models/Order');

exports.getAdminStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" }
        }
      }
    ]);



    res.json({
      users: totalUsers,
      orders: totalOrders,
      revenue: totalRevenue[0]?.total || 0
    });

  } catch (error) {
    res.status(500).json(error);
  }
};