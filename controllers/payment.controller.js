const Razorpay = require("razorpay");
// const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_ID_KEY,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

var razorpayInstance = new Razorpay({
  key_id: "rzp_test_EJ2HIeLF9gCun7",
  key_secret: "S5blqcAsFKdQO0QPPIqN8ZiN",
});

// razorpayInstance.orders.create({
//   amount: 50000,
//   currency: "INR",
//   receipt: "receipt#1",
//   notes: {
//     key1: "value3",
//     key2: "value2",
//   },
// });

const renderProductPage = async (req, res) => {
  try {
    res.render("product");
  } catch (error) {
    console.log(error.message);
  }
};

const createOrder = async (req, res) => {
  // console.log(req.body.cart.totalPrice);
  // console.log(locals.cart.totalPrice);

  try {
    const amount = 500 * 100;
    const options = {
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    };
    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          id: "order_IluGWxBm9U8zJ8",
          entity: "order",
          amount: 5000,
          amount_paid: 0,
          amount_due: 5000,
          currency: "INR",
          receipt: "rcptid_11",
          offer_id: null,
          status: "created",
          attempts: 0,
          notes: [],
          created_at: 1642662092,
        });
      } else {
        res.status(400).send({ success: false, msg: "Something went wrong!" });
        // error: {
        //   code: "BAD_REQUEST_ERROR",
        //   description: "Order amount less than minimum amount allowed",
        //     source: "business",
        //       step: "payment_initiation",
        //   "reason": "input_validation_failed",
        //   "metadata": {},
        //   "field": "amount"
        // }
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  renderProductPage,
  createOrder,
};
