const Order = require("../models/Order");
const Lead = require("../models/Lead"); // 👈 লিড মডেলটি এখানে ইমপোর্ট করা হয়েছে

// অর্ডার করা (এবং সাথে সাথে পেন্ডিং লিড ডিলেট করা)
exports.createOrder = async (req, res) => {
  try {
    // ১. নতুন অর্ডার তৈরি ও সেভ করা
    const order = new Order(req.body);
    await order.save();

    // ২. অর্ডার সফল হলে ওই কাস্টমারের পেন্ডিং লিডটি ডাটাবেজ থেকে ডিলেট করে দেওয়া
    // ফ্রন্টএন্ড থেকে 'product' এবং 'phone' পাঠানো হচ্ছে, তাই সেগুলোর সাথে মিলিয়ে লিড ডিলিট করা হবে
    if (req.body.phone) {
      const deletedLead = await Lead.findOneAndDelete({
        phone: req.body.phone,
        productId: req.body.product, // ফ্রন্টএন্ডের product আইডি
        status: "Pending",
      });

      if (deletedLead) {
        console.log(
          "🗑️ Pending Lead deleted automatically after successful order!",
        );
      }
    }

    res.status(201).json({ message: "অর্ডার সফল হয়েছে ✅", order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// সব অর্ডার দেখা
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product", "name price")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// অর্ডার স্ট্যাটাস আপডেট
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    if (!order)
      return res.status(404).json({ message: "অর্ডার পাওয়া যায়নি" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// অর্ডার ট্র্যাক করা
exports.trackOrder = async (req, res) => {
  try {
    const { phone, orderId } = req.query;
    let orders;
    if (phone) {
      orders = await Order.find({ phone })
        .populate("product", "name images")
        .sort({ createdAt: -1 });
    } else if (orderId) {
      const order = await Order.findById(orderId).populate(
        "product",
        "name images",
      );
      orders = order ? [order] : [];
    } else {
      return res.status(400).json({ message: "phone বা orderId দিন" });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
