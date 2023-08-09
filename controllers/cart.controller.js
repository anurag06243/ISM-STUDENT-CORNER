const Product = require("../models/product.model");
const Razorpay = require("razorpay");
const sessionFlash = require("../util/session-flash");
const User = require("../models/user.model");

async function getCart(req, res) {
  res.render("customer/cart/cart");
}
async function readycart(req, res) {
  // let sessionData = sessionFlash.getSessionData(req);
  // console.log(sessionData);
  // console.log(req.body);
  // client --> server
  // server will compute the amount
  // client --> request (data --> compute )
  // A --> product1 , product2
  // A (cart)
  // A --> email, password
  // --> authenticate ?
  // A --> cart (database)
  // console.log(req.session.uid);
  const user = await User.findById(req.session.uid);
  // console.log(user);

  var instance = new Razorpay({
    key_id: "rzp_test_EJ2HIeLF9gCun7",
    key_secret: "S5blqcAsFKdQO0QPPIqN8ZiN",
  });
  const cart = res.locals.cart;
  // console.log(res.locals);
  // console.log(cart);
  let amountt = cart.totalPrice;
  // console.log(cart);
  // console.log(amountt);

  // const user = res.locals.user;
  // console.log(req.csrfToken);
  // console.log("a");
  // console.log(res);
  let cToken = res.locals.csrfToken;
  // console.log(cToken);

  const order = instance.orders.create({
    amount: amountt,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });
  // let email = "anuragkumar06243@gmail.com";
  res.status(201).json({
    success: true,
    order,
    amountt,
    user,
    cToken,
    // email,
  });

  // res.redirect("/orders");
  // res.render("http://localhost:3000/orders");
}

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );

  req.session.cart = cart;

  res.json({
    message: "Item updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
  readycart: readycart,
};
