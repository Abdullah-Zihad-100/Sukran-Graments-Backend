const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    console.log("📤 Lead Request:", req.body);

    const {
      customerName,
      phone,
      address,
      product,
      productName,
      quantity,
      totalPrice,
      orderItems,
    } = req.body;

    // ১. ফ্রন্টএন্ড থেকে পাঠানো product (ID)-কে productId হিসেবে ম্যাপ করা হলো
    const mappedProductId = product || req.body.productId;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // ২. একই ফোন এবং প্রোডাক্টের আন্ডারে কোনো Pending লিড আছে কি না চেক করা
    const exist = await Lead.findOne({
      phone: phone,
      productId: mappedProductId,
      status: "Pending",
    });

    if (exist) {
      console.log("🔄 Updating existing lead with new details...");
      exist.customerName = customerName || exist.customerName;
      exist.address = address || exist.address;
      exist.productName = productName || exist.productName;
      exist.quantity = quantity || exist.quantity;
      exist.totalPrice = totalPrice || exist.totalPrice;
      exist.orderItems = orderItems || exist.orderItems;

      const updatedLead = await exist.save();
      console.log("✅ Lead Updated Successfully");
      return res.status(200).json(updatedLead);
    }

    // ৩. ডুপ্লিকেট না থাকলে একদম নতুন লিড তৈরি হবে
    const newLead = await Lead.create({
      customerName,
      phone,
      address,
      productId: mappedProductId,
      productName,
      quantity,
      totalPrice,
      orderItems,
    });

    console.log("✅ New Lead Created");
    res.status(201).json(newLead);
  } catch (err) {
    console.error("❌ Lead Save Error:", err);
    res.status(500).json({
      message: "Lead Save Failed",
      error: err.message,
    });
  }
};

exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({
      createdAt: -1,
    });
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
