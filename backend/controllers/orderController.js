const Order =
require('../models/Order');


exports.createOrder = async (req, res) => {

try {

const order = await Order.create({
  user: req.user._id,   // 👈 IMPORTANT FIX
  products: req.body.products,
  totalPrice: req.body.totalPrice
});

res.status(201).json(order);

} catch (error) {

res.status(500).json(error);

}

};



exports.getOrders = async (req, res) => {

try {

const orders = await Order.find({
  user: req.user._id
});

res.json(orders);

} catch (error) {

res.status(500).json(error);

}

};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    order.status = req.body.status;

    const updated = await order.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json(error);
  }
};