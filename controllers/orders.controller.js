const Order = require("../models/order.model");
const User = require("../models/user.model");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  // console.log("addorder me dek rahe hain");
  // console.log(req);

  let userDocument;
  try {
    // console.log("Id se nikal raha hai");
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    // console.log("Id se nahi nikal paaya");
    return next(error);
  }
  const order = new Order(cart, userDocument);
  // console.log("new order le rahaa hai");
  // console.log(order);

  try {
    // console.log("save hogya");
    await order.save();
  } catch (error) {
    // console.log("save nhai hua");
    next(error);
    return;
  }
  // console.log("cart ko null hua aur redirct kar diya");
  req.session.cart = null;
  res.redirect("/orders");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
